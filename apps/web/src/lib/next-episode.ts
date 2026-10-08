/**
 * «Следующая серия»: номер и время ЭФИРА (Unix-секунды). Источник — поля CMS
 * content.nextEpisodeNumber / nextEpisodeAt, которые заполняет
 * `python pipeline.py sync-schedule` по расписанию AniList.
 *
 * Это время выхода в Японии, а не появления серии на сайте: озвучка приходит
 * позже, поэтому в интерфейсе пишем «эфир».
 */

export interface NextEpisode {
  number: number;
  /** Unix-секунды (UTC). */
  airingAt: number;
}

/** Серия, вышедшая в эфир раньше этого срока, уже не «следующая» — не показываем. */
const STALE_AFTER_MS = 48 * 3600 * 1000;

const TIME_ZONE = "Europe/Moscow";
const DAY_MS = 86_400_000;

const WEEKDAY_ACC = [
  "в воскресенье",
  "в понедельник",
  "во вторник",
  "в среду",
  "в четверг",
  "в пятницу",
  "в субботу",
];

export function parseNextEpisode(
  number: number | null | undefined,
  airingAt: number | null | undefined,
): NextEpisode | undefined {
  if (typeof number !== "number" || !Number.isFinite(number) || number <= 0) return undefined;
  if (typeof airingAt !== "number" || !Number.isFinite(airingAt) || airingAt <= 0) return undefined;
  return { number: Math.trunc(number), airingAt };
}

const timeFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const dateFmt = new Intl.DateTimeFormat("ru-RU", { timeZone: TIME_ZONE, day: "numeric", month: "long" });
const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Номер календарного дня по московскому времени (для сравнения «сегодня/завтра»). */
function mskDayNumber(ms: number): number {
  const [y, m, d] = dayKeyFmt.format(ms).split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS);
}

export interface NextEpisodeText {
  /** «Серия 15». */
  label: string;
  /** «сегодня в 18:26», «в пятницу в 18:26», «15 октября в 18:26» или «вышла в эфир». */
  when: string;
  /** Серия уже вышла в эфир (расписание ещё не обновилось). */
  aired: boolean;
}

/** Подпись для интерфейса; null — показывать нечего (серия давно вышла). */
export function formatNextEpisode(next: NextEpisode, nowMs: number): NextEpisodeText | null {
  const atMs = next.airingAt * 1000;
  const label = `Серия ${next.number}`;

  if (atMs <= nowMs) {
    return nowMs - atMs > STALE_AFTER_MS ? null : { label, when: "вышла в эфир", aired: true };
  }

  const time = timeFmt.format(atMs);
  const diffDays = mskDayNumber(atMs) - mskDayNumber(nowMs);

  let day: string;
  if (diffDays <= 0) day = "сегодня";
  else if (diffDays === 1) day = "завтра";
  else if (diffDays <= 6) {
    // 1 января 1970 — четверг (день 0): 0 = воскресенье.
    const weekday = (4 + mskDayNumber(atMs)) % 7;
    day = WEEKDAY_ACC[weekday];
  } else day = dateFmt.format(atMs);

  return { label, when: `${day} в ${time}`, aired: false };
}

/* -------------------------------------------------------------------------- */
/*                         Страница и блок «Расписание»                       */
/* -------------------------------------------------------------------------- */

/** Номер календарного дня по Москве (экспорт для группировки расписания по дням). */
export function mskDay(ms: number): number {
  return mskDayNumber(ms);
}

/** Время эфира «18:26» по Москве. */
export function formatMskTime(airingAt: number): string {
  return timeFmt.format(airingAt * 1000);
}

const headingFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** Заголовок дня: «Сегодня», «Завтра» или «Пятница, 10 октября». */
export function formatDayHeading(dayNumber: number, todayNumber: number): string {
  const diff = dayNumber - todayNumber;
  if (diff === 0) return "Сегодня";
  if (diff === 1) return "Завтра";
  const text = headingFmt.format(dayNumber * DAY_MS);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Начало текущих суток по Москве, Unix-секунды (МСК = UTC+3 без перехода на летнее время). */
export function mskDayStartSec(nowMs: number): number {
  return mskDayNumber(nowMs) * 86400 - 3 * 3600;
}

const tabFmt = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "UTC",
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** Короткая подпись дня для вкладок: «Сегодня», «Завтра», «Пн, 12 окт». */
export function formatDayTab(dayNumber: number, todayNumber: number): string {
  const diff = dayNumber - todayNumber;
  if (diff === 0) return "Сегодня";
  if (diff === 1) return "Завтра";
  const text = tabFmt.format(dayNumber * DAY_MS).replace(/\./g, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** «через 40 мин», «через 2 ч 15 мин»; null — серия уже вышла или до неё больше суток. */
export function formatCountdown(airingAt: number, nowMs: number): string | null {
  const diffMin = Math.ceil((airingAt * 1000 - nowMs) / 60_000);
  if (diffMin <= 0) return null;
  if (diffMin < 1) return "менее минуты";
  if (diffMin < 60) return `через ${diffMin} мин`;
  if (diffMin >= 24 * 60) return null;
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return m === 0 ? `через ${h} ч` : `через ${h} ч ${m} мин`;
}

export interface ScheduleGroup<T extends { next: NextEpisode }> {
  /** Номер дня по Москве. */
  day: number;
  /** «Сегодня», «Завтра», «Пятница, 10 октября». */
  heading: string;
  /** Короткая подпись для вкладок. */
  tab: string;
  entries: T[];
}

/**
 * Раскладывает расписание по дням (МСК), начиная с сегодняшнего: сегодня
 * остаются и уже вышедшие в эфир серии (вместе с будущими, по времени), более
 * ранние дни не показываются.
 */
export function groupSchedule<T extends { next: NextEpisode }>(
  entries: T[],
  nowMs: number,
): ScheduleGroup<T>[] {
  const today = mskDayNumber(nowMs);
  const byDay = new Map<number, T[]>();

  for (const entry of [...entries].sort((a, b) => a.next.airingAt - b.next.airingAt)) {
    const day = mskDayNumber(entry.next.airingAt * 1000);
    if (day < today) continue;
    const list = byDay.get(day);
    if (list) list.push(entry);
    else byDay.set(day, [entry]);
  }

  return [...byDay.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([day, list]) => ({
      day,
      heading: formatDayHeading(day, today),
      tab: formatDayTab(day, today),
      entries: list,
    }));
}
