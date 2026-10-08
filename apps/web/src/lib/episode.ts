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

/* -------------------------------------------------------------------------- */
/*                         Отображение даты эфира серии                       */
/* -------------------------------------------------------------------------- */

const TIME_ZONE = "Europe/Moscow";

const shortFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
});
const shortYearFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});
const longFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "long",
  year: "numeric",
});
const timeFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const yearFmt = new Intl.DateTimeFormat("en", { timeZone: TIME_ZONE, year: "numeric" });

function parseIso(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** «12.10» (для текущего года) или «12.10.25»; пусто, если даты нет. По Москве. */
export function formatEpisodeDateShort(iso: string | null | undefined, nowMs: number = Date.now()): string {
  const date = parseIso(iso);
  if (!date) return "";
  const sameYear = yearFmt.format(date) === yearFmt.format(nowMs);
  return (sameYear ? shortFmt : shortYearFmt).format(date).replace(/\//g, ".");
}

/** «12 октября 2026, 18:26 МСК»; пусто, если даты нет. Это время ЭФИРА в Японии. */
export function formatEpisodeDateLong(iso: string | null | undefined): string {
  const date = parseIso(iso);
  if (!date) return "";
  return `${longFmt.format(date).replace(" г.", "")}, ${timeFmt.format(date)} МСК`;
}
