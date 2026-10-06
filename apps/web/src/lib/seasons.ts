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
      title.match(/(\d{1,2})\s*-?\s*(?:я\s+)?(?:част[ьи]|part|cour)/i);
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
 * Проставляет seasons[].part и seasons[].label.
 * Ждёт список, отсортированный по номеру сезона, затем по году выхода.
 *
 *  - несколько записей с одним номером сезона → «Сезон 2 · Часть 1/2»;
 *  - одна запись, но в названии есть «Часть N» → «Сезон 2 · Часть N»;
 *  - иначе просто «Сезон 2».
 */
export function labelSeasons(seasons: Season[]): Season[] {
  const groupSize = new Map<number, number>();
  for (const season of seasons) {
    groupSize.set(season.seasonNumber, (groupSize.get(season.seasonNumber) ?? 0) + 1);
  }

  const seen = new Map<number, number>();

  return seasons.map((season) => {
    const index = (seen.get(season.seasonNumber) ?? 0) + 1;
    seen.set(season.seasonNumber, index);

    const detected = parsePartNumber(season.title);
    const isSplit = (groupSize.get(season.seasonNumber) ?? 1) > 1;
    const part = detected ?? (isSplit ? index : undefined);

    return {
      ...season,
      part,
      label: part
        ? `Сезон ${season.seasonNumber} · Часть ${part}`
        : `Сезон ${season.seasonNumber}`,
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
