// src/lib/content-mapper.ts
import { richTextToPlainText } from "./richtext";
import type { ContentItem, Episode, Movie, PublishStatus, Season, Series } from "./types";

export interface RawContent {
  id: number;
  type: "movie" | "series";
  titleEn: string;
  titleRu: string;
  originalTitle?: string | null;
  slug: string;
  description?: unknown;
  releaseYear: number;
  duration?: number | null;
  rating?: number | null;
  status?: "draft" | "published" | null;
  poster?: { id: number | string; url?: string | null } | null;
  backdrop?: { id: number | string; url?: string | null } | null;
  genres?: { id: number; title: string; slug: string }[] | null;
  seasons?: {
    docs: {
      id: number;
      seasonNumber: number;
      title?: string | null;
      releaseYear?: number | null;
      episodes?: {
        docs: {
          episodeNumber: number;
          title: string;
          description?: unknown;
          releaseDate?: string | null;
          duration?: number | null;
        }[];
      } | null;
    }[];
  } | null;
}

/**
 * Заглушка для отсутствующего медиа — нужна, потому что Media.url
 * обязателен по типу, а на практике poster/backdrop могут быть null
 * (документ ещё не полностью заполнен в CMS).
 */
const EMPTY_MEDIA = { id: 0, url: "" };

function mapMedia(raw: RawContent["poster"]): { id: number | string; url: string } {
  if (!raw) return EMPTY_MEDIA;
  return { id: raw.id, url: raw.url ?? "" };
}

function mapEpisode(
  raw: NonNullable<NonNullable<RawContent["seasons"]>["docs"][number]["episodes"]>["docs"][number]
): Episode {
  return {
    episodeNumber: raw.episodeNumber,
    title: raw.title,
    description: richTextToPlainText(raw.description),
    releaseDate: raw.releaseDate ?? "",
    duration: raw.duration ?? 0,
  };
}

function mapSeason(raw: NonNullable<RawContent["seasons"]>["docs"][number]): Season {
  return {
    seasonNumber: raw.seasonNumber,
    title: raw.title ?? undefined,
    releaseYear: raw.releaseYear ?? 0,
    episodes: (raw.episodes?.docs ?? []).map(mapEpisode),
  };
}

function mapBaseFields(raw: RawContent) {
  const status: PublishStatus = raw.status ?? "draft";

  return {
    id: raw.id,
    titleRu: raw.titleRu,
    titleEn: raw.titleEn,
    originalTitle: raw.originalTitle ?? undefined,
    slug: raw.slug,
    description: richTextToPlainText(raw.description),
    releaseYear: raw.releaseYear,
    genres: (raw.genres ?? []).map((g) => g.title),
    genreIds: (raw.genres ?? []).map((g) => g.id),
    rating: raw.rating ?? 0,
    poster: mapMedia(raw.poster),
    backdrop: mapMedia(raw.backdrop),
    status,
  };
}

export function mapContentToItem(raw: RawContent): ContentItem {
  const base = mapBaseFields(raw);

  if (raw.type === "movie") {
    const movie: Movie = {
      ...base,
      type: "movie",
      duration: raw.duration ?? 0,
    };
    return movie;
  }

  const series: Series = {
    ...base,
    type: "series",
    seasons: (raw.seasons?.docs ?? []).map(mapSeason),
  };
  return series;
}