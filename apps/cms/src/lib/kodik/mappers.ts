/**
 * apps/cms/lib/kodik/mappers.ts
 *
 * Чистые функции преобразования данных Kodik → наша модель (ТЗ §8.3).
 * Без обращений к сети и БД — легко покрыть unit-тестами отдельно от
 * upsert-логики.
 */

import type { KodikMaterial } from './types'

/**
 * Какие типы Kodik мы вообще импортируем. Проект интересует только аниме —
 * остальные типы (фильмы, обычные сериалы, дорамы и т.д.) сознательно не
 * включены и будут посчитаны в report.skipped.
 */
export const MOVIE_TYPES = new Set(['anime'])
export const SERIES_TYPES = new Set(['anime-serial'])

/** Значение по умолчанию для параметра types в запросе к /list — просим у Kodik только то, что импортируем. */
export const DEFAULT_KODIK_TYPES = 'anime,anime-serial'

export function mapContentType(kodikType: string): 'movie' | 'series' | null {
  if (MOVIE_TYPES.has(kodikType)) return 'movie'
  if (SERIES_TYPES.has(kodikType)) return 'series'
  return null
}

function isLatin(str: string): boolean {
  return /^[\x00-\x7F]+$/.test(str)
}

/**
 * Content.titleEn уникален и обязателен (ТЗ §8.3). Kodik не всегда даёт
 * латинское название, поэтому порядок приоритета:
 *   1. material_data.title_en — специально англоязычное поле с Shikimori/КиноПоиска;
 *   2. title_orig — но только если он действительно латиницей (для аниме там
 *      обычно ромадзи/английский, но не всегда);
 *   3. fallback — русское название + id Kodik, чтобы гарантировать уникальность.
 *      Такие записи стоит проверить вручную в CMS после импорта.
 */
export function pickTitleEn(material: KodikMaterial): string {
  const candidate =
    material.material_data?.title_en ||
    (material.title_orig && isLatin(material.title_orig) ? material.title_orig : undefined)

  return candidate || `${material.title} (${material.id})`
}

/** slug для Genres.slug (ТЗ §8.2) — латиница, без диакритики, только [a-z0-9-]. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // убрать диакритические знаки после normalize
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
