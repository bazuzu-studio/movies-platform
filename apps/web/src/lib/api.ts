import { GraphQLClient, gql } from "graphql-request";

import {
  GetContentDocument,
  GetContentBySlugDocument,
  GetSimilarContentDocument,
  GetGenresDocument,
  GetContentIdsByKinopoiskDocument,
  GetSeasonsByContentIdsDocument,
} from "@/generated/graphql";

import {
  mapContentToItem,
  type RawContent,
} from "./content-mapper";

import type {
  ContentItem,
  Genre,
} from "./types";

import { parseReleaseStatus, type ReleaseStatus } from "./release-status";
import { episodeReleaseDate, episodeTitle } from "./episode";

const endpoint =
  process.env.GRAPHQL_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
  "http://localhost:4000/api/graphql";

/**
 * Отдельный клиент для server-side запросов публичного контента.
 *
 * Публичные запросы не требуют авторизации.
 * Избранное/профиль используют gqlClient из
 * lib/graphql-client.ts с credentials: "include".
 */
const serverClient = new GraphQLClient(
  endpoint,
  {
    fetch: (url, init) =>
      fetch(url, {
        ...init,
        next: {
          revalidate: 60,
          tags: ["content"],
        },
      }),
  },
);

/** Достаёт docs[] из ответа Payload/GraphQL. */
function docsOf<
  T extends
    | { docs?: unknown[] | null }
    | null
    | undefined,
>(
  field: T,
): NonNullable<T>["docs"] extends
  | (infer U)[]
  | null
  | undefined
  ? U[]
  : never {
  return (field?.docs ?? []) as never;
}

/* -------------------------------------------------------------------------- */
/*                                  Content                                   */
/* -------------------------------------------------------------------------- */

export type ContentSort =
  | "popular"
  | "newest"
  // "rating" убран, так как больше не используется
  | "alphabetical";

export interface ContentListFilters {
  type?: "movie" | "series";
  genre?: string;
  year?:
    | "2026"
    | "2025"
    | "2024"
    | "2023"
    | "2022"
    | "2021-or-earlier";
  age?: "0" | "6" | "12" | "16" | "18";
  /** Статус релиза: anons / ongoing / released. */
  status?: ReleaseStatus;
  search?: string;
  sort?: ContentSort;
}

export interface ContentListResult {
  items: ContentItem[];
  totalDocs: number;
  hasNextPage: boolean;
}

/**
 * Строит Payload GraphQL where.
 *
 * Важно:
 * - Payload использует AND / OR в верхнем регистре.
 * - relationship genres фильтруется через ID,
 *   а не через "genres.title".
 */
function buildContentWhere(
  filters: ContentListFilters = {},
  genreId?: number,
) {
  const AND: Record<string, unknown>[] = [];

  /* ------------------------------- Popular --------------------------------- */

  // Postgres при DESC ставит NULL первыми: тайтлы без рейтинга оказывались
  // бы в начале «Популярных». Исключаем их из этой выдачи.
  if (filters.sort === "popular") {
    AND.push({ rating: { greater_than: 0 } });
  }

  /* ---------------------------------- Type --------------------------------- */

  if (
    filters.type === "movie" ||
    filters.type === "series"
  ) {
    AND.push({
      type: {
        equals: filters.type,
      },
    });
  }

  /* --------------------------------- Genre -------------------------------- */

  if (genreId !== undefined) {
    AND.push({
      genres: {
        in: [genreId],
      },
    });
  }

  /* ---------------------------------- Year --------------------------------- */

  if (filters.year) {
    if (
      filters.year ===
      "2021-or-earlier"
    ) {
      AND.push({
        releaseYear: {
          less_than_equal: 2021,
        },
      });
    } else {
      AND.push({
        releaseYear: {
          equals: Number(filters.year),
        },
      });
    }
  }

  /* -------------------------------- Age (вместо Rating) -------------------------------- */

  if (filters.age) {
    const minAge = Number(filters.age);
    AND.push({
      ageRating: {
        greater_than_equal: minAge,
      },
    });
  }

  /* ------------------------------ Release status ---------------------------- */

  if (filters.status) {
    AND.push({
      releaseStatus: {
        equals: filters.status,
      },
    });
  }

  /* -------------------------------- Search -------------------------------- */

  const search =
    typeof filters.search === "string"
      ? filters.search.trim()
      : "";

  if (search) {
    AND.push({
      OR: [
        {
          titleRu: {
            like: search,
          },
        },
        {
          titleEn: {
            like: search,
          },
        },
        {
          originalTitle: {
            like: search,
          },
        },
      ],
    });
  }

  if (AND.length === 0) {
    return undefined;
  }

  return {
    AND,
  };
}

function getContentSort(
  sort: ContentSort = "newest",
): string {
  switch (sort) {
    case "popular":
      return "-rating,-updatedAt";

    // случай "rating" удалён, так как опция больше не существует
    case "alphabetical":
      return "titleRu,-updatedAt";

    case "newest":
    default:
      // Раньше сортировали по -updatedAt, но пайплайн обновляет записи
      // (update-ongoing, перезаливка метаданных), и порядок «Новинок»
      // менялся без появления новых тайтлов. Теперь: свежие по году выхода,
      // внутри года — недавно добавленные.
      return "-releaseYear,-createdAt";
  }
}

/**
 * Получает ID жанра по его названию.
 *
 * CatalogClient передаёт название жанра,
 * например "Военное", поэтому перед GraphQL-запросом
 * нужно преобразовать его в relationship ID.
 */
async function getGenreIdByTitle(
  title: string,
): Promise<number | undefined> {
  const normalizedTitle =
    title.trim().toLowerCase();

  if (!normalizedTitle) {
    return undefined;
  }

  const data =
    await serverClient.request(
      GetGenresDocument,
    );

  const genres = docsOf(
    data.Genres,
  ) as Array<Genre & { id: number | string }>;

  const genre = genres.find(
    (item) =>
      item.title.trim().toLowerCase() ===
      normalizedTitle ||
      item.slug.trim().toLowerCase() ===
      normalizedTitle,
  );

  if (!genre) {
    console.warn(`Genre not found: "${title}"`);
    return undefined;
  }

  const id = Number(genre.id);

  if (!Number.isInteger(id)) {
    console.warn(`Invalid genre ID for ${title}:`, genre.id);
    return undefined;
  }

  return id;
}

/**
 * Получает список контента с server-side фильтрацией
 * и пагинацией.
 *
 * Поддерживает оба варианта:
 *
 * getContentList(1, 50, {
 *   type: "movie",
 * })
 *
 * и старый:
 *
 * getContentList(1, 50, "movie")
 */
export async function getContentList(
  page = 1,
  limit = 24,
  filtersOrType?:
    | ContentListFilters
    | "movie"
    | "series",
): Promise<ContentListResult> {
  const filters: ContentListFilters =
    typeof filtersOrType === "string"
      ? {
          type: filtersOrType,
        }
      : filtersOrType ?? {};

  try {
    let genreId: number | undefined;

    if (
      typeof filters.genre === "string" &&
      filters.genre.trim()
    ) {
      genreId =
        await getGenreIdByTitle(
          filters.genre,
        );
    }

    const data =
      await serverClient.request(
        GetContentDocument,
        {
          limit,
          page,
          sort: getContentSort(
            filters.sort,
          ),
          where: buildContentWhere(
            filters,
            genreId,
          ),
        },
      );

    const content = data.Contents;

    return {
      items: docsOf(content).map(
        (doc) =>
          mapContentToItem(
            doc as RawContent,
          ),
      ),
      totalDocs:
        content?.totalDocs ?? 0,
      hasNextPage:
        content?.hasNextPage ?? false,
    };
  } catch (error) {
    console.error(
      "getContentList failed",
      error,
    );

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Content by slug                               */
/* -------------------------------------------------------------------------- */

interface RawEpisode {
  id: string | number;
  episodeNumber: number | null;
  title?: string | null;
  description?: string | null;
  releaseDate?: string | null;
  duration?: number | null;

  /** Эмбед-ссылка на плеер серии. */
  playerLink?: string | null;

  /** Время выхода серии, Unix-секунды (CMS: episodes.airingAt). */
  airingAt?: number | null;
}

interface RawSeason {
  id: string | number;
  seasonNumber: number | null;
  title?: string | null;
  releaseYear?: number | null;

  content?: {
    id: string | number;
    slug: string;
    releaseStatus?: string | null;
    poster?: {
      id: string | number;
      url: string;
    } | null;
  } | null;

  poster?: {
    id: string | number;
    url: string;
  } | null;

  episodes?: {
    docs?: RawEpisode[];
  } | null;
}

interface RawContentId {
  id: string | number;
}

/**
 * RawContent описывает «общую» форму документа Content из CMS. playerLink
 * (только у фильмов) и franchiseId читаем через это узкое расширение типа,
 * а не через `any`.
 */
type RawContentWithPlayerLink = RawContent & {
  playerLink?: string | null;
  franchiseId?: string | null;
};

/**
 * Запрос id всех записей франшизы. Описан здесь (а не в .graphql), чтобы не
 * требовать перегенерации src/generated/graphql.ts: поле franchiseId появилось
 * в CMS позже сгенерированной схемы.
 */
const GetContentIdsByFranchiseQuery = gql`
  query GetContentIdsByFranchise($franchiseId: String!) {
    Contents(where: { franchiseId: { equals: $franchiseId } }, limit: 50) {
      docs {
        id
      }
    }
  }
`;

interface ContentIdsResponse {
  Contents?: { docs?: RawContentId[] | null } | null;
}

export async function getContentBySlug(
  slug: string,
): Promise<
  ContentItem | undefined
> {
  try {
    const data =
      await serverClient.request(
        GetContentBySlugDocument,
        {
          slug,
        },
      );

    const raw = docsOf(
      data.Contents,
    )[0] as
      | RawContentWithPlayerLink
      | undefined;

    if (!raw) {
      return undefined;
    }

    const item =
      mapContentToItem(raw);

    if (item?.type === "series") {
      try {
        let contentIds:
          | (string | number)[]
          = [];

        // Сезоны франшизы — отдельные записи Content. Группируем по franchiseId;
        // если он не задан, откатываемся на kinopoiskId (как раньше).
        if (raw.franchiseId) {
          const franchiseData =
            await serverClient.request<ContentIdsResponse>(
              GetContentIdsByFranchiseQuery,
              { franchiseId: raw.franchiseId },
            );

          contentIds = (franchiseData.Contents?.docs ?? []).map(
            (doc) => doc.id,
          );
        } else if (raw.kinopoiskId) {
          const kinopoiskData =
            await serverClient.request(
              GetContentIdsByKinopoiskDocument,
              {
                kinopoiskId:
                  raw.kinopoiskId,
              },
            );

          const kinopoiskDocs =
            (kinopoiskData.Contents?.docs ??
              []) as RawContentId[];

          contentIds =
            kinopoiskDocs.map(
              (doc) => doc.id,
            );
        }

        // Если kinopoiskId нет —
        // ищем сезоны только текущего content.
        if (
          contentIds.length === 0 &&
          raw.id
        ) {
          contentIds = [raw.id];
        }

        const seasonsData =
          await serverClient.request(
            GetSeasonsByContentIdsDocument,
            {
              contentIds,
            },
          );

        const seasonDocs =
          (seasonsData.Seasons?.docs ??
            []) as RawSeason[];

        item.seasons = seasonDocs
          .filter(
            (season) =>
              typeof season.seasonNumber ===
                "number" &&
              !Number.isNaN(
                season.seasonNumber,
              ),
          )
          .map((season) => ({
            id: season.id,

            seasonNumber:
              season.seasonNumber as number,

            title:
              season.title ??
              `Сезон ${season.seasonNumber}`,

            releaseYear:
              season.releaseYear ?? 0,

            slug:
              season.content?.slug ?? "",

            releaseStatus:
              parseReleaseStatus(
                season.content?.releaseStatus,
              ),

            poster:
              season.content?.poster ??
              undefined,

            episodes: (
              (season.episodes?.docs ??
                []) as RawEpisode[]
            )
              .map((episode) => ({
                id: episode.id,

                episodeNumber:
                  episode.episodeNumber ??
                  0,

                title: episodeTitle(
                  episode.title,
                  episode.episodeNumber ?? 0,
                ),

                description:
                  episode.description ??
                  "",

                releaseDate: episodeReleaseDate(
                  episode.airingAt,
                  episode.releaseDate,
                ),

                duration:
                  episode.duration ?? 0,

                embedUrl:
                  episode.playerLink ??
                  undefined,
              }))
              .sort(
                (a, b) =>
                  a.episodeNumber -
                  b.episodeNumber,
              ),
          }))
          .sort(
            (a, b) =>
              a.seasonNumber -
              b.seasonNumber,
          );
      } catch (seasonsError) {
        console.error(
          `getContentBySlug: не удалось получить сезоны (kinopoiskId=${raw.kinopoiskId})`,
          seasonsError,
        );

        item.seasons = [];
      }
    } else if (item?.type === "movie") {
      // playerLink — прямая ссылка на плеер, есть только у фильмов
      // (content.player_link в БД). У сериалов ссылка на плеер живёт
      // по эпизодам (episode.playerLink → embedUrl выше).
      // BaseContent.playerLink типизирован как обязательный string,
      // поэтому при отсутствии ссылки подставляем "", а не undefined
      // (проверка на плеер в компонентах идёт через Boolean(...)).
      item.playerLink = raw.playerLink ?? "";
    }

    return item;
  } catch (error) {
    console.error(
      `getContentBySlug(${slug}) failed`,
      error,
    );

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Genres                                   */
/* -------------------------------------------------------------------------- */

export async function getGenres(): Promise<
  Genre[]
> {
  try {
    const data =
      await serverClient.request(
        GetGenresDocument,
      );

    return docsOf(
      data.Genres,
    ) as Genre[];
  } catch (error) {
    console.error(
      "getGenres failed",
      error,
    );

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Similar content                              */
/* -------------------------------------------------------------------------- */

/**
 * Похожий контент: тот же тип (сериал → сериалы), общий жанр, без самого
 * тайтла и без других сезонов той же франшизы (они и так показаны в
 * переключателе сезонов).
 */
export async function getSimilarContent(
  item: ContentItem,
  limit = 12,
): Promise<ContentItem[]> {
  if (!item.genreIds?.length) {
    return [];
  }

  const baseAnd: Record<string, unknown>[] = [
    { genres: { in: item.genreIds } },
    { id: { not_equals: Number(item.id) } },
    { type: { equals: item.type } },
  ];

  // Другие сезоны той же франшизы уже показаны в переключателе сезонов.
  if (item.franchiseId) {
    baseAnd.push({ franchiseId: { not_equals: item.franchiseId } });
  }

  if (item.kinopoiskId) {
    baseAnd.push({ kinopoiskId: { not_equals: item.kinopoiskId } });
  }

  const fetchSimilar = async (
    and: Record<string, unknown>[],
    count: number,
  ): Promise<ContentItem[]> => {
    const data =
      await serverClient.request(
        GetSimilarContentDocument,
        {
          where: { AND: and },
          limit: count,
          sort: "-rating",
        },
      );

    return docsOf(
      data.Contents,
    ).map((doc) =>
      mapContentToItem(
        doc as RawContent,
      ),
    );
  };

  try {
    // Сначала тайтлы с рейтингом: при сортировке по убыванию Postgres ставит
    // записи без рейтинга (NULL) в начало, и «похожие» состояли бы из них.
    const rated = await fetchSimilar(
      [...baseAnd, { rating: { greater_than: 0 } }],
      limit,
    );

    if (rated.length >= limit) {
      return rated;
    }

    // Не хватило — добираем тайтлы без рейтинга.
    const ratedIds = rated.map((entry) => Number(entry.id));
    const rest = await fetchSimilar(
      [
        ...baseAnd,
        ...(ratedIds.length > 0
          ? [{ id: { not_in: ratedIds } }]
          : []),
      ],
      limit - rated.length,
    );

    return [...rated, ...rest];
  } catch (error) {
    console.error(
      `getSimilarContent(${item.id}) failed`,
      error,
    );

    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Sitemap                                   */
/* -------------------------------------------------------------------------- */

const GetSitemapEntriesQuery = gql`
  query GetSitemapEntries($limit: Int!, $page: Int!) {
    Contents(limit: $limit, page: $page, sort: "-updatedAt") {
      docs {
        slug
        type
        updatedAt
      }
      hasNextPage
    }
  }
`;

interface SitemapEntriesResponse {
  Contents?: {
    docs?: Array<{
      slug?: string | null;
      type?: "movie" | "series" | null;
      updatedAt?: string | null;
    }> | null;
    hasNextPage?: boolean | null;
  } | null;
}

export interface SitemapEntry {
  slug: string;
  type: "movie" | "series";
  updatedAt?: string;
}

/**
 * Лёгкий список для sitemap.xml: только slug, тип и дата изменения —
 * без постеров, жанров и описаний, которые тянул getContentList.
 * Забирает страницами по 1000, максимум 20 страниц.
 */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  for (let page = 1; page <= 20; page += 1) {
    const data =
      await serverClient.request<SitemapEntriesResponse>(
        GetSitemapEntriesQuery,
        { limit: 1000, page },
      );

    for (const doc of data.Contents?.docs ?? []) {
      if (doc.slug && (doc.type === "movie" || doc.type === "series")) {
        entries.push({
          slug: doc.slug,
          type: doc.type,
          updatedAt: doc.updatedAt ?? undefined,
        });
      }
    }

    if (!data.Contents?.hasNextPage) break;
  }

  return entries;
}
