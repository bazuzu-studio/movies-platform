import { GraphQLClient } from "graphql-request";

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
      return "-updatedAt,-rating";
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

  console.log(
    `Genre ${title} resolved to ID ${id}`,
  );

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
}

interface RawSeason {
  id: string | number;
  seasonNumber: number | null;
  title?: string | null;
  releaseYear?: number | null;

  content?: {
    id: string | number;
    slug: string;
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
 * GetContentBySlugDocument сейчас типизирован без playerLink
 * (поле появилось в content только для type === "movie", см.
 * content.player_link в БД / kodik_pipeline.load).
 * Пока сгенерированный RawContent не обновлён кодогеном GraphQL,
 * читаем его через это узкое расширение типа, а не через `any`.
 */
type RawContentWithPlayerLink = RawContent & {
  playerLink?: string | null;
};

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

        if (raw.kinopoiskId) {
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

                title:
                  episode.title ??
                  `Серия ${episode.episodeNumber}`,

                description:
                  episode.description ??
                  "",

                releaseDate:
                  episode.releaseDate ??
                  "",

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

export async function getSimilarContent(
  item: ContentItem,
  limit = 5,
): Promise<ContentItem[]> {
  if (!item.genreIds?.length) {
    return [];
  }

  try {
    const data =
      await serverClient.request(
        GetSimilarContentDocument,
        {
          genreIds: item.genreIds,
          excludeId: Number(item.id),
          limit,
        },
      );

    return docsOf(
      data.Contents,
    ).map((doc) =>
      mapContentToItem(
        doc as RawContent,
      ),
    );
  } catch (error) {
    console.error(
      `getSimilarContent(${item.id}) failed`,
      error,
    );

    throw error;
  }
}