import { richTextToPlainText } from "./richtext";
import { parseReleaseStatus } from "./release-status";
import { episodeReleaseDate, episodeTitle } from "./episode";
import type { ContentItem, Episode, Movie, Season, SeoMeta, Series } from "./types";

export interface RawContent {
  id: number;

  /** SEO-плагин CMS: content.meta. */
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: { url?: string | null } | null;
  } | null;

  type: "movie" | "series";

  titleEn: string;
  titleRu: string;
  originalTitle?: string | null;

  slug: string;
  description?: unknown;

  releaseYear: number;
  duration?: number | null;
  rating?: number | null;

  /** Возрастное ограничение (0/6/12/16/18). Источник: Kodik material_data.minimal_age. */
  ageRating?: number | null;

  /** Статус релиза из CMS (enum anons/ongoing/released). */
  releaseStatus?: string | null;

  kinopoiskId?: string | null;

  /** Идентификатор франшизы (см. CMS: content.franchiseId). */
  franchiseId?: string | null;

  /** Эмбед-ссылка на плеер фильма. Есть только у type: "movie". */
  playerLink?: string | null;

  poster?: {
    id: number | string;
    url?: string | null;
  } | null;

  backdrop?: {
    id: number | string;
    url?: string | null;
  } | null;

  genres?:
    | {
        id: number;
        title: string;
        slug: string;
      }[]
    | null;

  seasons?: {
    docs: {
      id: number;

      /** Может быть null из GraphQL/Payload. */
      seasonNumber: number | null;

      title?: string | null;
      releaseYear?: number | null;

      content?: {
        id: number | string;
        slug: string;
        releaseStatus?: string | null;
        poster?: {
          id: number | string;
          url?: string | null;
        } | null;
      } | null;

      poster?: {
        id: number | string;
        url?: string | null;
      } | null;

      episodes?: {
        docs: {
          id: number;
          episodeNumber: number;
          title: string;
          description?: unknown;
          releaseDate?: string | null;
          /** Время выхода серии, Unix-секунды (поле CMS episodes.airingAt). */
          airingAt?: number | null;
          duration?: number | null;

          /** Эмбед-ссылка на плеер конкретной серии. */
          playerLink?: string | null;
        }[];
      } | null;
    }[];
  } | null;
}

const EMPTY_MEDIA = {
  id: 0,
  url: "",
};

type RawSeason = NonNullable<NonNullable<RawContent["seasons"]>["docs"]>[number];

type RawEpisode = NonNullable<NonNullable<RawSeason["episodes"]>["docs"]>[number];

function mapMedia(
  raw:
    | {
        id: number | string;
        url?: string | null;
      }
    | null
    | undefined,
) {
  if (!raw) {
    return EMPTY_MEDIA;
  }

  return {
    id: raw.id,
    url: raw.url ?? "",
  };
}

function mapEpisode(raw: RawEpisode): Episode {
  return {
    id: raw.id,
    episodeNumber: raw.episodeNumber,
    title: episodeTitle(raw.title, raw.episodeNumber),
    description: richTextToPlainText(raw.description),
    releaseDate: episodeReleaseDate(raw.airingAt, raw.releaseDate),
    duration: raw.duration ?? 0,
    embedUrl: raw.playerLink ?? undefined,
  };
}

function mapSeason(raw: RawSeason): Season {
  // GraphQL может вернуть null, но приложение ожидает number.
  const seasonNumber = typeof raw.seasonNumber === "number" ? raw.seasonNumber : 1;

  return {
    id: raw.id,
    seasonNumber,
    title: raw.title ?? undefined,
    releaseYear: raw.releaseYear ?? 0,
    slug: raw.content?.slug ?? "",
    releaseStatus: parseReleaseStatus(raw.content?.releaseStatus),
    poster: raw.content?.poster ? mapMedia(raw.content.poster) : undefined,
    episodes: (raw.episodes?.docs ?? []).map(mapEpisode),
  };
}

/** Порог рейтинга, начиная с которого контент считается популярным. */
export const POPULAR_RATING_THRESHOLD = 7.5;

/** Сколько последних лет считаем новинками (при 2026: 2026 и 2025). */
export const NEW_ARRIVAL_YEARS_WINDOW = 1;

function mapSeo(meta: RawContent["meta"]): SeoMeta | undefined {
  const title = meta?.title?.trim() || undefined;
  const description = meta?.description?.trim() || undefined;
  const imageUrl = meta?.image?.url || undefined;
  return title || description || imageUrl ? { title, description, imageUrl } : undefined;
}

function mapBaseFields(raw: RawContent) {
  const currentYear = new Date().getFullYear();

  return {
    id: Number(raw.id), // Приводим к number, чтобы соответствовать типу ContentItem['id']
    titleRu: raw.titleRu ?? "",
    titleEn: raw.titleEn ?? "",
    originalTitle: raw.originalTitle ?? undefined,
    slug: raw.slug ?? "",
    description: richTextToPlainText(raw.description ?? ""),
    releaseYear: raw.releaseYear ?? 0,
    genres: (raw.genres ?? []).map((genre) => genre.title ?? ""),
    genreIds: (raw.genres ?? []).map((genre) => Number(genre.id)),
    rating: raw.rating ?? 0,
    ageRating: raw.ageRating ?? undefined,
    releaseStatus: parseReleaseStatus(raw.releaseStatus),
    isNew:
      typeof raw.releaseYear === "number"
        ? currentYear - raw.releaseYear <= NEW_ARRIVAL_YEARS_WINDOW
        : false,
    isPopular: (raw.rating ?? 0) >= POPULAR_RATING_THRESHOLD,
    poster: mapMedia(raw.poster),
    backdrop: mapMedia(raw.backdrop),
    seo: mapSeo(raw.meta),
    kinopoiskId: raw.kinopoiskId ?? undefined,
    franchiseId: raw.franchiseId ?? undefined,
    // Это поле теперь обязательно в типах Movie/Series — добавляем его сюда,
    // чтобы не дублировать в каждой ветке маппера.
    playerLink: raw.playerLink ?? "",
  };
}

export function mapContentToItem(raw: RawContent): ContentItem {
  const base = mapBaseFields(raw);

  if (raw.type === "movie") {
    const movie: Movie = {
      ...base,
      type: "movie",
      duration: raw.duration ?? 0,
      embedUrl: raw.playerLink ?? undefined,
    };
    return movie;
  }

  if (raw.type === "series") {
    const series: Series = {
      ...base,
      type: "series",
      seasons: (raw.seasons?.docs ?? []).map(mapSeason),
    };
    return series;
  }

  // fallback, если type не распознан (чтобы функция всегда возвращала ContentItem)
  return base as ContentItem;
}
