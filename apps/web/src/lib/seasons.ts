import type { Season } from "./types";

/**
 * Номер «части» из названия: «Часть 2», «2 часть», «Part 2», «Cour 2».
 * В CMS отдельного поля для части нет — часть записывается в названии сезона
 * или самого Content.
 */
export function parsePartNumber(...titles: Array<string | null | undefined>): number | undefined {
  for (const title of titles) {
    if (!title) continue;
    const match =
      title.match(/(?:част[ьи]|part|cour|кур)\s*[-:№#]?\s*(\d{1,2})/i) ??
      title.match(/(\d{1,2})\s*-?\s*(?:я\s+|-?й\s+)?(?:част[ьи]|part|cour)/i);
    if (match) {
      const value = Number(match[1]);
      if (Number.isInteger(value) && value > 0) return value;
    }
  }
  return undefined;
}

/** Явный номер сезона из названия: «2 сезон», «Сезон 3», «Season 4», «2nd Season». */
export function parseSeasonMarker(...titles: Array<string | null | undefined>): number | undefined {
  for (const title of titles) {
    if (!title) continue;
    const match =
      title.match(/(?:сезон|season)\s*[-:№#]?\s*(\d{1,2})(?!\d)/i) ??
      title.match(/(\d{1,2})\s*-?\s*(?:й|ой|ый|я|st|nd|rd|th)?\s*(?:сезон|season)/i);
    if (match) {
      const value = Number(match[1]);
      if (Number.isInteger(value) && value > 0) return value;
    }
  }
  return undefined;
}

/** Ключ сезона. seasonNumber не уникален (у «Части 1» и «Части 2» он один). */
export function seasonKey(season: Pick<Season, "id" | "slug">): string {
  return String(season.slug || season.id);
}

/**
 * Убирает дубли: несколько строк сезона, ведущих на ОДИН и тот же тайтл
 * (slug). Такие строки остаются в БД после перенумерации франшизы старой
 * версией пайплайна — на сайте это «Сезон 1 · Часть 2» и «Сезон 5» с одной
 * ссылкой и одинаковыми сериями. Оставляем строку с наибольшим числом серий,
 * при равенстве — с большим номером сезона (новая нумерация).
 */
export function dedupeSeasonsBySlug(seasons: Season[]): Season[] {
  const best = new Map<string, Season>();
  for (const season of seasons) {
    if (!season.slug) continue;
    const current = best.get(season.slug);
    if (!current) {
      best.set(season.slug, season);
      continue;
    }
    const a = [season.episodes.length, season.seasonNumber];
    const b = [current.episodes.length, current.seasonNumber];
    if (a[0] > b[0] || (a[0] === b[0] && a[1] > b[1])) best.set(season.slug, season);
  }
  return seasons.filter((season) => !season.slug || best.get(season.slug) === season);
}

type Unit = {
  season: Season;
  stored: number;
  part?: number;
  marker?: number;
  display: number;
};

/** «Часть N» этого сезона продолжает предыдущую запись (тот же сезон)? */
function continuesPrevious(unit: Unit, prev: Unit): boolean {
  if (!unit.part || unit.part < 2) return false;
  // Явный номер сезона у «части» должен совпадать; если его нет («… 2. Часть 2») — не мешает.
  if (unit.marker !== undefined && unit.marker !== prev.marker) return false;
  if (prev.part === undefined) return unit.part === 2;
  return prev.part === unit.part - 1;
}

/**
 * Пересчитывает номера сезонов и проставляет seasons[].part / label.
 * Ждёт список, отсортированный по номеру сезона, затем по году выхода.
 *
 *  - «Часть 2» продолжает предыдущую запись и получает её номер; все
 *    следующие сезоны сдвигаются (раньше часть считалась отдельным сезоном,
 *    и «Re:Zero 3» превращался в «Сезон 4»);
 *  - несколько записей с одним номером сезона → «Сезон 2 · Часть 1/2»;
 *  - сезон «0» (спецвыпуски) в нумерации не участвует.
 *
 * Хорошо пронумерованные данные (части уже с одним номером) не меняются.
 */
export function labelSeasons(seasons: Season[]): Season[] {
  const units: Unit[] = seasons.map((season) => {
    const titles = [season.title, season.contentTitle];
    return {
      season,
      stored: season.seasonNumber,
      part: parsePartNumber(...titles),
      marker: parseSeasonMarker(...titles),
      display: season.seasonNumber,
    };
  });

  let offset = 0;
  let prev: Unit | undefined;
  for (const unit of units) {
    if (unit.stored === 0) continue;
    if (prev && continuesPrevious(unit, prev)) {
      offset = prev.display - unit.stored;
      if (prev.part === undefined) prev.part = 1;
    }
    unit.display = unit.stored + offset;
    prev = unit;
  }

  const groupSize = new Map<number, number>();
  for (const unit of units) groupSize.set(unit.display, (groupSize.get(unit.display) ?? 0) + 1);
  const seen = new Map<number, number>();

  return units.map((unit) => {
    const index = (seen.get(unit.display) ?? 0) + 1;
    seen.set(unit.display, index);
    const isSplit = (groupSize.get(unit.display) ?? 1) > 1;
    const part = unit.part ?? (isSplit ? index : undefined);

    const base = unit.display === 0 ? "Спецвыпуски" : `Сезон ${unit.display}`;
    return {
      ...unit.season,
      seasonNumber: unit.display,
      part,
      label: part && unit.display !== 0 ? `${base} · Часть ${part}` : base,
    };
  });
}

/**
 * Последний вышедший сезон (или часть): самый поздний год, затем наибольший
 * номер сезона и части. Анонсы пропускаем, пока есть хотя бы один вышедший —
 * у анонса ещё нет серий.
 */
export function pickLatestSeason(seasons: Season[]): Season | undefined {
  if (seasons.length === 0) return undefined;

  const released = seasons.filter((season) => season.releaseStatus !== "anons");
  const pool = released.length > 0 ? released : seasons;

  return pool.reduce((best, season) => {
    if (season.releaseYear !== best.releaseYear) {
      return season.releaseYear > best.releaseYear ? season : best;
    }
    if (season.seasonNumber !== best.seasonNumber) {
      return season.seasonNumber > best.seasonNumber ? season : best;
    }
    return (season.part ?? 0) >= (best.part ?? 0) ? season : best;
  });
}
