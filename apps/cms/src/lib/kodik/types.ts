/**
 * apps/cms/lib/kodik/types.ts
 *
 * Типы ответов Kodik API (см. Kodik API Documentation §3–5) — только те
 * поля, которые реально используются при импорте. Полная структура
 * материала в документации значительно шире.
 */

export interface KodikTranslation {
  id: number
  title: string
  type: 'voice' | 'subtitles'
}

/** Раздел material_data — данные с КиноПоиска/Shikimori (Kodik doc §3.1). Есть только при with_material_data=true. */
export interface KodikMaterialData {
  title?: string
  title_en?: string
  description?: string
  poster_url?: string
  duration?: number
  genres?: string[]
  all_genres?: string[]
  kinopoisk_rating?: number
  imdb_rating?: number
  shikimori_rating?: number
  year?: number
}

export interface KodikEpisodeEntry {
  link: string
  title?: string
}

export interface KodikSeasonEntry {
  link: string
  title?: string
  /** Ключ — номер серии (строка). Значение — либо просто ссылка, либо объект с with_episodes_data. */
  episodes?: Record<string, string | KodikEpisodeEntry>
}

/** Один материал из results в ответе /list или /search (Kodik doc §3). */
export interface KodikMaterial {
  id: string
  type: string
  title: string
  title_orig?: string
  year?: number
  kinopoisk_id?: string
  imdb_id?: string
  shikimori_id?: string
  translation?: KodikTranslation
  last_season?: number
  last_episode?: number
  episodes_count?: number
  /** Есть только при with_seasons / with_episodes / with_episodes_data. */
  seasons?: Record<string, KodikSeasonEntry>
  material_data?: KodikMaterialData
  screenshots?: string[]
}

export interface KodikListResponse {
  time: string
  total: number
  prev_page: string | null
  next_page: string | null
  results: KodikMaterial[]
}

/** Параметры, которые понимает наш /api/import/kodik (тело POST-запроса). */
export interface KodikImportRequestBody {
  mode?: 'list' | 'search'
  /** Типы Kodik через запятую — по умолчанию ограничено аниме, см. mappers.ts. */
  types?: string
  title?: string
  shikimoriId?: string
  year?: number
  /** Сколько страниц /list обойти за один вызов (next_page). Защита от случайного обхода всей базы. */
  maxPages?: number
  /** Скачивать poster_url и грузить в Media (MinIO). */
  downloadImages?: boolean
  /** Разбирать seasons/episodes и создавать Seasons/Episodes. */
  importEpisodes?: boolean
  /** Ничего не писать в БД, только посчитать, что было бы сделано. */
  dryRun?: boolean
}

export interface ImportOptions {
  downloadImages: boolean
  importEpisodes: boolean
  dryRun: boolean
}

export interface ImportReport {
  created: number
  updated: number
  /** Материалы с типом Kodik, который мы не импортируем (см. mappers.ts). */
  skipped: number
  errors: { material: string; error: string }[]
}

export function createEmptyReport(): ImportReport {
  return { created: 0, updated: 0, skipped: 0, errors: [] }
}
