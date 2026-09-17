// Типы приближены к будущим коллекциям Payload CMS (ТЗ, раздел 8),
// чтобы замена мок-данных на реальный API прошла без переписывания компонентов.

/* -------------------------------------------------------------------------- */
/*                                  Общие типы                               */
/* -------------------------------------------------------------------------- */

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

  episodes: Episode[];
}

/* -------------------------------------------------------------------------- */
/*                                Base Content                                */
/* -------------------------------------------------------------------------- */

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
  playerLink:string;
  rating: number;

  poster: Media;
  backdrop: Media;


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