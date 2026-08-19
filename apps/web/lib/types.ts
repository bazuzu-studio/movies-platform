// Типы приближены к будущим коллекциям Payload CMS (ТЗ, раздел 8),
// чтобы замена мок-данных на реальный API прошла без переписывания компонентов.

export type ContentType = "movie" | "series";
export type PublishStatus = "draft" | "published";

export interface Genre {
  title: string;
  slug: string;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number; // минуты
}

export interface Season {
  seasonNumber: number;
  releaseYear: number;
  title?: string;
  episodes: Episode[];
}

interface BaseContent {
  id: number;
  titleRu: string;
  titleEn: string;
  originalTitle?: string;
  slug: string;
  description: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  poster: string;
  backdrop: string;
  status: PublishStatus;
  director?: string;
  cast?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Movie extends BaseContent {
  type: "movie";
  duration: number; // минуты
}

export interface Series extends BaseContent {
  type: "series";
  seasons: Season[];
}

export type ContentItem = Movie | Series;

export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
}
