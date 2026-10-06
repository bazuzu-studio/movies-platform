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
  Season,
} from "./types";

import { parseReleaseStatus, type ReleaseStatus } from "./release-status";
import { episodeReleaseDate, episodeTitle } from "./episode";
import { richTextToPlainText } from "./richtext";
import { labelSeasons, pickLatestSeason } from "./seasons";

const endpoint =
  process.env.GRAPHQL_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
  "http://localhost:4000/api/graphql";

/**
 * Отдельный клиент для server-side запросов публичного контента.
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

// --------------------------------------------------------------------------
// НОВАЯ: нормализация URL картинок (подмена localhost → minio)
// --------------------------------------------------------------------------

function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("/")) return url; // относительные пути не трогаем

  const internal = process.env.S3_INTERNAL_URL; // http://minio:9000/media
  const publicUrl = process.env.S3_PUBLIC_URL;  // http://localhost:9000/media

  if (!internal) return url;

  // Если есть публичный URL — заменяем его целиком на внутренний
  if (publicUrl) {
    const fromBase = publicUrl.replace(/\/+$/, "");
    const toBase = internal.replace(/\/+$/, "");

    if (url.startsWith(fromBase)) {
      return toBase + url.slice(fromBase.length);
    }
  }

  // Фолбэк: меняем хост/порт через URL, сохраняя путь
  try {
    const parsed = new URL(url);
    const internalParsed = new URL(internal);

    parsed.hostname = internalParsed.hostname;
    parsed.port = internalParsed.port;

    return parsed.toString();
  } catch {
    return url;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Content                                   */
/* -------------------------------------------------------------------------- */

export type ContentSort =
  | "popular"
  | "newest"
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
  status?: ReleaseStatus;
  search?: string;
  sort?: ContentSort;
}

export interface ContentListResult {
  items: ContentItem[];
  totalDocs: number;
  hasNextPage: boolean;
}

function buildContentWhere(
  filters: ContentListFilters = {},
  genreId?: number,
) {
  const AND: Record<string, unknown>[] = [];

  if (filters.sort === "popular") {
    AND.push({ rating: { greater_than: 0 } });
  }

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

  if (genreId !== undefined) {
    AND.push({
      genres: {
        in: [genreId],
      },
    });
  }

  if (filters.year) {
    if (filters.year === "2021-or-earlier") {
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

  if (filters.age) {
    const minAge = Number(filters.age);
    AND.push({
      ageRating: {
        greater_than_equal: minAge,
      },
    });
  }

  if (filters.status) {
    AND.push({
      releaseStatus: {
        equals: filters.status,
      },
    });
  }

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
    case "alphabetical":
      return "titleRu,-updatedAt";
    case "newest":
    default:
      return "-releaseYear,-createdAt";
  }
}

async function getGenreIdByTitle(
  title: string,
): Promise<number | undefined> {
  const normalizedTitle = title.trim().toLowerCase();

  if (!normalizedTitle) {
    return undefined;
  }

  const data = await serverClient.request(GetGenresDocument);
  const genres = docsOf(data.Genres) as Array<Genre & { id: number | string }>;

  const genre = genres.find(
    (item) =>
      item.title.trim().toLowerCase() === normalizedTitle ||
      item.slug.trim().toLowerCase() === normalizedTitle,
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

    if (typeof filters.genre === "string" && filters.genre.trim()) {
      genreId = await getGenreIdByTitle(filters.genre);
    }

    const data = await serverClient.request(
      GetContentDocument,
      {
        limit,
        page,
        sort: getContentSort(filters.sort),
        where: buildContentWhere(filters, genreId),
      },
    );

    const content = data.Contents;

    // --- НОВАЯ: нормализуем картинки ДО маппинга ---
    const docs = docsOf(content);
    const items = docs.map((doc) => {
      const raw = doc as RawContent;
      if (raw.poster?.url) {
        raw.poster.url = normalizeImageUrl(raw.poster.url);
      }
      return mapContentToItem(raw);
    });

    return {
      items,
      totalDocs: content?.totalDocs ?? 0,
      hasNextPage: content?.hasNextPage ?? false,
    };
  } catch (error) {
    console.error("getContentList failed", error);
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
  playerLink?: string | null;
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
    titleRu?: string | null;
    releaseYear?: number | null;
    releaseStatus?: string | null;
    rating?: number | null;
    ageRating?: number | null;
    description?: unknown;
    poster?: {
      id?: string | number;
      url?: string | null;
    } | null;
    backdrop?: {
      id?: string | number;
      url?: string | null;
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

type RawContentWithPlayerLink = RawContent & {
  playerLink?: string | null;
  franchiseId?: string | null;
};

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
): Promise<ContentItem | undefined> {
  try {
    const data = await serverClient.request(
      GetContentBySlugDocument,
      { slug },
    );

    const raw = docsOf(data.Contents)[0] as RawContentWithPlayerLink | undefined;

    if (!raw) {
      return undefined;
    }

    // --- НОВАЯ: нормализуем постер основного контента ---
    if (raw.poster?.url) {
      raw.poster.url = normalizeImageUrl(raw.poster.url);
    }

    if (raw.meta?.image?.url) {
      raw.meta.image.url = normalizeImageUrl(raw.meta.image.url);
    }

    const item = mapContentToItem(raw);

    if (item?.type === "series") {
      try {
        let contentIds: (string | number)[] = [];

        if (raw.franchiseId) {
          const franchiseData = await serverClient.request<ContentIdsResponse>(
            GetContentIdsByFranchiseQuery,
            { franchiseId: raw.franchiseId },
          );
          contentIds = (franchiseData.Contents?.docs ?? []).map((doc) => doc.id);
        } else if (raw.kinopoiskId) {
          const kinopoiskData = await serverClient.request(
            GetContentIdsByKinopoiskDocument,
            { kinopoiskId: raw.kinopoiskId },
          );
          const kinopoiskDocs = (kinopoiskData.Contents?.docs ?? []) as RawContentId[];
          contentIds = kinopoiskDocs.map((doc) => doc.id);
        }

        if (contentIds.length === 0 && raw.id) {
          contentIds = [raw.id];
        }

        const seasonsData = await serverClient.request(
          GetSeasonsByContentIdsDocument,
          { contentIds },
        );

        const seasonDocs = (seasonsData.Seasons?.docs ?? []) as RawSeason[];

        const mapped = seasonDocs
          .filter(
            (season) =>
              typeof season.seasonNumber === "number" &&
              !Number.isNaN(season.seasonNumber),
          )
          .map((season) => {
            const content = season.content;

            // Нормализуем картинки сезона (localhost → minio)
            if (content?.poster?.url) {
              content.poster.url = normalizeImageUrl(content.poster.url);
            }
            if (content?.backdrop?.url) {
              content.backdrop.url = normalizeImageUrl(content.backdrop.url);
            }

            return {
              id: season.id,
              seasonNumber: season.seasonNumber as number,
              title: season.title ?? undefined,
              // Год сезона: у записи сезона, а если пусто — у его Content.
              releaseYear: season.releaseYear ?? content?.releaseYear ?? 0,
              slug: content?.slug ?? "",
              releaseStatus: parseReleaseStatus(content?.releaseStatus),
              poster: content?.poster?.url
                ? { id: content.poster.id ?? 0, url: content.poster.url }
                : undefined,
              backdrop: content?.backdrop?.url
                ? { id: content.backdrop.id ?? 0, url: content.backdrop.url }
                : undefined,
              description: richTextToPlainText(content?.description ?? "") || undefined,
              rating: content?.rating ?? undefined,
              ageRating: content?.ageRating ?? undefined,
              episodes: (
                (season.episodes?.docs ?? []) as RawEpisode[]
              )
                .map((episode) => ({
                  id: episode.id,
                  episodeNumber: episode.episodeNumber ?? 0,
                  title: episodeTitle(episode.title, episode.episodeNumber ?? 0),
                  description: episode.description ?? "",
                  releaseDate: episodeReleaseDate(episode.airingAt, episode.releaseDate),
                  duration: episode.duration ?? 0,
                  embedUrl: episode.playerLink ?? undefined,
                }))
                .sort((a, b) => a.episodeNumber - b.episodeNumber),
            };
          })
          // Сначала номер сезона, затем год выхода: «Часть 1» и «Часть 2»
          // одного сезона идут подряд в порядке выхода.
          .sort(
            (a, b) =>
              a.seasonNumber - b.seasonNumber ||
              a.releaseYear - b.releaseYear ||
              a.id.toString().localeCompare(b.id.toString(), undefined, { numeric: true }),
          );

        item.seasons = labelSeasons(mapped as Season[]);

        // Шапка страницы и SEO описывают ПОСЛЕДНИЙ вышедший сезон, а не тот,
        // чей slug открыт (иначе у франшизы с 2013 года показывался бы 2013-й).
        const latest = pickLatestSeason(item.seasons);
        if (latest) {
          if (latest.releaseYear) item.releaseYear = latest.releaseYear;
          if (latest.releaseStatus) item.releaseStatus = latest.releaseStatus;
          if (latest.rating) item.rating = latest.rating;
          if (latest.ageRating != null) item.ageRating = latest.ageRating;
          if (latest.description) item.description = latest.description;
          if (latest.poster?.url) item.poster = latest.poster;
          if (latest.backdrop?.url) item.backdrop = latest.backdrop;
          if (latest.releaseYear) {
            item.isNew = new Date().getFullYear() - latest.releaseYear <= 1;
          }
          if (latest.rating) item.isPopular = latest.rating >= 7.5;
        }
      } catch (seasonsError) {
        console.error(
          `getContentBySlug: не удалось получить сезоны (kinopoiskId=${raw.kinopoiskId})`,
          seasonsError,
        );
        item.seasons = [];
      }
    } else if (item?.type === "movie") {
      item.playerLink = raw.playerLink ?? "";
    }

    return item;
  } catch (error) {
    console.error(`getContentBySlug(${slug}) failed`, error);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Genres                                   */
/* -------------------------------------------------------------------------- */

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await serverClient.request(GetGenresDocument);
    return docsOf(data.Genres) as Genre[];
  } catch (error) {
    console.error("getGenres failed", error);
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
    const data = await serverClient.request(
      GetSimilarContentDocument,
      {
        where: { AND: and },
        limit: count,
        sort: "-rating",
      },
    );

    return docsOf(data.Contents).map((doc) => {
      const raw = doc as RawContent;
      if (raw.poster?.url) {
        raw.poster.url = normalizeImageUrl(raw.poster.url);
      }
      return mapContentToItem(raw);
    });
  };

  try {
    // Сначала тайтлы с рейтингом
    const rated = await fetchSimilar(
      [...baseAnd, { rating: { greater_than: 0 } }],
      limit,
    );

    if (rated.length >= limit) {
      return rated;
    }

    // Добираем без рейтинга — БЕЗ not_in в запросе
    const rest = await fetchSimilar(baseAnd, limit - rated.length);

    // Фильтруем уже полученные результаты, чтобы не дублировать те, что были в rated
    const ratedIdsSet = new Set(rated.map((entry) => Number(entry.id)));
    const filteredRest = rest.filter((entry) => !ratedIdsSet.has(Number(entry.id)));

    return [...rated, ...filteredRest].slice(0, limit);
  } catch (error) {
    console.error(`getSimilarContent(${item.id}) failed`, error);
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
