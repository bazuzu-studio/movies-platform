/**
 * Озвучки серий: сборка вариантов для выбора в плеере.
 *
 * Основная ссылка серии — episodes.playerLink (Episode.embedUrl). Остальные
 * озвучки лежат в коллекции CMS episode-sources (по строке на пару «серия —
 * озвучка»), туда же пайплайн (`sync-dubs`) кладёт и основную озвучку.
 */

/** Одна ссылка озвучки для серии (как приходит с /api/episode-sources). */
export interface SourceLink {
  slug: string;
  title: string;
  url: string;
}

/** Ссылки по номеру серии одного сезона. */
export type SeasonSources = Record<number, SourceLink[]>;

export interface VoiceoverOption {
  /** slug озвучки; null — у основной ссылки нет записи в справочнике. */
  slug: string | null;
  title: string;
  url: string;
  /** Озвучка, которой соответствует основная ссылка серии. */
  isDefault: boolean;
}

export interface SourceRow {
  episodeNumber: number;
  slug: string;
  title: string;
  url: string;
}

export const DEFAULT_VOICEOVER_TITLE = "Основная";

/** Ссылки Kodik приходят как «//kodikplayer.com/…» и «https://…» — сравниваем без схемы. */
function linkKey(url: string): string {
  return url.trim().replace(/^https?:/i, "").replace(/^\/\//, "").toLowerCase();
}

/** Группирует строки episode-sources по номеру серии; повтор озвучки у серии отбрасывается. */
export function groupSources(rows: SourceRow[]): SeasonSources {
  const result: SeasonSources = {};
  for (const row of rows) {
    if (!row.url || !row.slug || !Number.isFinite(row.episodeNumber)) continue;
    const list = (result[row.episodeNumber] ??= []);
    if (list.some((item) => item.slug === row.slug)) continue;
    list.push({ slug: row.slug, title: row.title || row.slug, url: row.url });
  }
  return result;
}

/**
 * Варианты озвучки для серии: основная первой, остальные по алфавиту.
 * Основная ссылка, которой нет среди источников, добавляется как «Основная».
 */
export function buildOptions(
  defaultUrl: string | null | undefined,
  links: SourceLink[] | null | undefined,
): VoiceoverOption[] {
  const defaultKey = defaultUrl ? linkKey(defaultUrl) : null;
  const options: VoiceoverOption[] = (links ?? []).map((link) => ({
    slug: link.slug,
    title: link.title,
    url: link.url,
    isDefault: defaultKey !== null && linkKey(link.url) === defaultKey,
  }));

  if (defaultUrl && !options.some((option) => option.isDefault)) {
    options.push({ slug: null, title: DEFAULT_VOICEOVER_TITLE, url: defaultUrl, isDefault: true });
  }

  return options.sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault) || a.title.localeCompare(b.title, "ru"),
  );
}

/**
 * Какой вариант играть: выбранный зрителем (по slug), если он есть у этой
 * серии; иначе основной; иначе первый.
 */
export function chooseOption(
  options: VoiceoverOption[],
  preferredSlug: string | null | undefined,
): VoiceoverOption | undefined {
  if (preferredSlug) {
    const preferred = options.find((option) => option.slug === preferredSlug);
    if (preferred) return preferred;
  }
  return options.find((option) => option.isDefault) ?? options[0];
}

/** slug допустимого вида (из ?voiceover= или localStorage) — иначе null. */
export function parseVoiceoverSlug(value: string | null | undefined): string | null {
  const slug = value?.trim() ?? "";
  return /^[a-z0-9][a-z0-9-]{0,63}$/i.test(slug) ? slug : null;
}
