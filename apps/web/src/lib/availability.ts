/**
 * Когда серия появилась на сайте и насколько полно она озвучена.
 *
 * `episodes.airingAt` — время ЭФИРА в Японии; озвучка у студий появляется позже и
 * в разное время. Поле `episodes.firstAvailableAt` (kodik-pipeline v2.9) хранит,
 * когда пайплайн впервые увидел серию с озвучкой. У серий, загруженных до этого,
 * оно пусто: реальное время неизвестно, и подставлять «сейчас» было бы неправдой.
 */
import type { SeasonSources } from "./voiceovers";

/** ISO-время появления серии по её номеру (серии без даты в объекте отсутствуют). */
export type SeasonAvailability = Record<number, string>;

/** Серия считается новой, если появилась на сайте не раньше этого числа часов назад. */
export const FRESH_HOURS = 48;

export interface AvailabilityRow {
  episodeNumber: number;
  /**
   * Скаляр DateTime в схеме, сгенерированной `pnpm codegen`, — `unknown`
   * (в ручном блоке generated/graphql.ts он был string), поэтому принимаем любой тип
   * и разбираем сами: строка ISO, миллисекунды или Date.
   */
  firstAvailableAt: unknown;
}

/** Время в миллисекундах из значения поля DateTime; NaN, если даты нет или она некорректна. */
function toTime(value: unknown): number {
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string" && value.trim()) return new Date(value).getTime();
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return new Date(value).getTime();
  return Number.NaN;
}

/** Строки CMS → { номер серии: ISO }. Пустые и некорректные даты отбрасываются. */
export function groupAvailability(rows: AvailabilityRow[]): SeasonAvailability {
  const result: SeasonAvailability = {};
  for (const row of rows) {
    if (!Number.isFinite(row.episodeNumber)) continue;
    const time = toTime(row.firstAvailableAt);
    if (Number.isNaN(time)) continue;
    result[row.episodeNumber] = new Date(time).toISOString();
  }
  return result;
}

/** Появилась ли серия на сайте в последние `hours` часов (будущая дата — тоже «новая»). */
export function isFresh(iso: string | null | undefined, nowMs: number, hours: number = FRESH_HOURS): boolean {
  if (!iso) return false;
  const time = new Date(iso).getTime();
  return !Number.isNaN(time) && nowMs - time < hours * 3_600_000;
}

/** Сколько серий сезона озвучено каждой студией: { slug озвучки: число серий }. */
export function dubCoverage(sources: SeasonSources | null | undefined): Record<string, number> {
  const result: Record<string, number> = {};
  for (const links of Object.values(sources ?? {})) {
    for (const link of links) result[link.slug] = (result[link.slug] ?? 0) + 1;
  }
  return result;
}
