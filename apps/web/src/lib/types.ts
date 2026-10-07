// Типы приближены к будущим коллекциям Payload CMS (ТЗ, раздел 8),
// чтобы замена мок-данных на реальный API прошла без переписывания компонентов.

/* -------------------------------------------------------------------------- */
/*                                  Общие типы                               */
/* -------------------------------------------------------------------------- */

import type { ReleaseStatus } from "./release-status";

export type ContentType = "movie" | "series";


export type UserRole = "admin" | "editor" | "user";

/* -------------------------------------------------------------------------- */
/*                                   Media                                    */
/* -------------------------------------------------------------------------- */

export interface Media {
  id: number | string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

/* -------------------------------------------------------------------------- */
/*                                   Genre                                    */
/* -------------------------------------------------------------------------- */

export interface Genre {
  title: string;
  slug: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Episode                                   */
/* -------------------------------------------------------------------------- */

export interface Episode {
  id?: number | string;
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;

  /** Ссылка на встраиваемый плеер серии. */
  embedUrl?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Season                                   */
/* -------------------------------------------------------------------------- */

export interface Season {
  id: number | string;
  seasonNumber: number;
  releaseYear: number;

  /** Название сезона. */
  title?: string;

  /** Slug связанного Content. */
  slug: string;

  /** Постер связанного Content. */
  poster?: Media;

  /** Статус релиза связанного Content (у каждого сезона своя запись в CMS). */
  releaseStatus?: ReleaseStatus;

  /** Русское название Content сезона — по нему определяется «Часть N». */
  contentTitle?: string;

  /** Номер части внутри сезона («Часть 1», «Часть 2»), если сезон разбит. */
  part?: number;

  /** Готовая подпись: «Сезон 2» или «Сезон 2 · Часть 1». */
  label?: string;

  /** Данные записи Content этого сезона — для шапки страницы. */
  description?: string;
  rating?: number;
  ageRating?: number | null;
  backdrop?: Media;

  episodes: Episode[];
}

/* -------------------------------------------------------------------------- */
/*                                Base Content                                */
/* -------------------------------------------------------------------------- */

/** Мета-данные страницы, заданные в CMS (content.meta). */
export interface SeoMeta {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface BaseContent {
  id: number | string;

  titleRu: string;
  titleEn: string;
  originalTitle?: string;

  slug: string;
  description: string;

  releaseYear: number;

  genres: string[];
  genreIds?: number[];

  /**
   * Возрастное ограничение:
   * 0 / 6 / 12 / 16 / 18.
   */
  ageRating?: number | null;

  /**
   * Статус релиза: anons / ongoing / released.
   * undefined — статус неизвестен (например, в результатах поиска).
   */
  releaseStatus?: ReleaseStatus;

  playerLink:string;
  rating: number;

  /** Идентификатор франшизы: записи с одинаковым значением — сезоны одного сериала. */
  franchiseId?: string;

  poster: Media;
  backdrop: Media;

  /** SEO-поля из CMS (плагин SEO): заголовок, описание, картинка. Могут быть пустыми. */
  seo?: SeoMeta;


  director?: string;
  cast?: string[];

  isNew?: boolean;
  isPopular?: boolean;

  /** ID фильма в Кинопоиске. */
  kinopoiskId?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Movie                                   */
/* -------------------------------------------------------------------------- */

export interface Movie extends BaseContent {
  type: "movie";

  /** Продолжительность фильма в минутах. */
  duration: number;

  /**
   * Ссылка на встраиваемый плеер.
   * Источник в CMS — поле `playerLink`.
   */
  embedUrl?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Series                                   */
/* -------------------------------------------------------------------------- */

export interface Series extends BaseContent {
  type: "series";

  seasons: Season[];
}

/* -------------------------------------------------------------------------- */
/*                                Content Item                                */
/* -------------------------------------------------------------------------- */

export type ContentItem = Movie | Series;

/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

/**
 * Соответствует коллекции Users в Payload CMS.
 *
 * `roles` — массив, так как в Payload поле roles может быть hasMany.
 */
export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
}