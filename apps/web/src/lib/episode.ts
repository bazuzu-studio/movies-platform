/**
 * Нормализация полей серии, пришедших из CMS.
 */

/** Заглушки, которые CMS подставляет вместо настоящего названия серии. */
const GENERIC_TITLES = new Set(["эпизод", "episode"]);

/**
 * Название серии. Пустое или служебное («Эпизод» — значение по умолчанию в
 * CMS) заменяется на «Серия N», чтобы в плеере не появлялось «Серия 5 — Эпизод».
 */
export function episodeTitle(title: string | null | undefined, episodeNumber: number): string {
  const trimmed = title?.trim() ?? "";
  if (!trimmed || GENERIC_TITLES.has(trimmed.toLowerCase())) return `Серия ${episodeNumber}`;
  return trimmed;
}

/**
 * Дата выхода серии (ISO-строка). В CMS её хранит поле airingAt (Unix-секунды);
 * поля releaseDate там нет, поэтому прежний код всегда получал пустую строку.
 */
export function episodeReleaseDate(
  airingAt: number | null | undefined,
  legacyReleaseDate?: string | null,
): string {
  if (typeof airingAt === "number" && Number.isFinite(airingAt) && airingAt > 0) {
    const date = new Date(airingAt * 1000);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return legacyReleaseDate ?? "";
}
