import { GraphQLClient } from "graphql-request";

import {
  GetContentDocument,
  GetContentBySlugDocument,
  GetEpisodeSourcesDocument,
  GetGenresDocument,
  GetHeroContentDocument,
  GetAiredEpisodesDocument,
  GetNextEpisodesDocument,
  GetScheduleDocument,
  GetSeasonEpisodeIdsDocument,
  GetSeriesFranchiseDocument,
  GetSimilarContentDocument,
  GetSitemapEntriesDocument,
  type Content_Where,
  type Episode_Where,
  type EpisodeSource_Where,
} from "@/generated/graphql";

import {
  mapContentToItem,
  NEW_ARRIVAL_YEARS_WINDOW,
  POPULAR_RATING_THRESHOLD,
  type RawContent,
} from "./content-mapper";
import type { ContentItem, Genre, Season } from "./types";
import { parseReleaseStatus, type ReleaseStatus } from "./release-status";
import { episodeReleaseDate, episodeTitle } from "./episode";
import { normalizeImageUrl } from "./image-url";
import { richTextToPlainText } from "./richtext";
import { dedupeSeasonsBySlug, labelSeasons, pickLatestSeason } from "./seasons";
import { mskDayStartSec, parseNextEpisode, type NextEpisode } from "./next-episode";
import { groupSources, type SeasonSources, type SourceRow } from "./voiceovers";

const endpoint =
  process.env.GRAPHQL_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
  "http://localhost:4000/api/graphql";

/**
 * Клиент для серверных запросов публичного контента. Ответы кэшируются в Next
 * (revalidate 60 с) и сбрасываются по тегу "content" (POST /api/revalidate).
 */
const serverClient = new GraphQLClient(endpoint, {
  fetch: (url, init) =>
    fetch(url, {
      ...init,
      next: { revalidate: 60, tags: ["content"] },
    }),
});

/** Достаёт docs[] из ответа Payload/GraphQL. */
function docsOf<T>(field: { docs?: T[] | null } | null | undefined): T[] {
  return field?.docs ?? [];
}

/** Применяет подмену адреса картинки к вложенному media-объекту. */
function withNormalizedUrl<T extends { url?: string | null } | null | undefined>(media: T): T {
  if (media?.url) media.url = normalizeImageUrl(media.url);
  return media;
}

/* -------------------------------------------------------------------------- */
/*                                  Content                                   */
/* -------------------------------------------------------------------------- */

export type ContentSort = "popular" | "newest" | "alphabetical";

/** Фильтр по году: конкретный год ("2025") или "<год>-or-earlier". */
export type YearFilter = string;

export interface ContentListFilters {
  type?: "movie" | "series";
  genre?: string;
  year?: YearFilter;
  age?: "0" | "6" | "12" | "16" | "18";
  status?: ReleaseStatus;
  search?: string;
  sort?: ContentSort;
}

export interface ContentListResult {
  items: ContentItem[];
  totalDocs: number;
  hasNextPage: boolean;
}

const SEARCH_MAX_LENGTH = 100;

/**
 * Поисковая строка для оператора `like`: убираем символы-шаблоны LIKE
 * (% _ \), которые иначе превращают запрос в тяжёлый шаблон, схлопываем
 * пробелы и ограничиваем длину.
 */
export function sanitizeSearch(raw: string | undefined): string {
  return (raw ?? "")
    .replace(/[%_\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, SEARCH_MAX_LENGTH);
}

const EARLIER_RE = /^(\d{4})-or-earlier$/;

/** Допустимое значение ?year=: четыре цифры или "<год>-or-earlier". */
export function isValidYearFilter(value: string): boolean {
  const match = /^(\d{4})(?:-or-earlier)?$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  return year >= 1900 && year <= new Date().getFullYear() + 1;
}

function buildContentWhere(filters: ContentListFilters = {}, genreId?: number): Content_Where | undefined {
  const AND: Record<string, unknown>[] = [];

  if (filters.sort === "popular") AND.push({ rating: { greater_than: 0 } });

  if (filters.type === "movie" || filters.type === "series") {
    AND.push({ type: { equals: filters.type } });
  }

  if (genreId !== undefined) AND.push({ genres: { in: [genreId] } });

  if (filters.year) {
    const earlier = EARLIER_RE.exec(filters.year);
    if (earlier) AND.push({ releaseYear: { less_than_equal: Number(earlier[1]) } });
    else if (isValidYearFilter(filters.year)) AND.push({ releaseYear: { equals: Number(filters.year) } });
  }

  if (filters.age) AND.push({ ageRating: { greater_than_equal: Number(filters.age) } });

  if (filters.status) AND.push({ releaseStatus: { equals: filters.status } });

  const search = sanitizeSearch(filters.search);
  if (search) {
    AND.push({
      OR: [
        { titleRu: { like: search } },
        { titleEn: { like: search } },
        { originalTitle: { like: search } },
      ],
    });
  }

  return AND.length === 0 ? undefined : ({ AND } as Content_Where);
}

function getContentSort(sort: ContentSort = "newest"): string {
  switch (sort) {
    case "popular":
      return "-rating,-updatedAt";
    case "alphabetical":
      return "titleRu,-updatedAt";
    case "newest":
    default:
      return "-releaseYear,-createdAt";
  }
}

/**
 * Поиск: названия, начинающиеся с запроса, — выше тех, где он просто
 * встречается. Сортировка устойчивая, порядок внутри групп не меняется.
 */
function rankBySearch(items: ContentItem[], query: string): ContentItem[] {
  const q = query.toLowerCase();
  const score = (item: ContentItem): number => {
    const titles = [item.titleRu, item.titleEn, item.originalTitle ?? ""].map((t) => t.toLowerCase());
    if (titles.some((t) => t === q)) return 0;
    if (titles.some((t) => t.startsWith(q))) return 1;
    return 2;
  };
  return items
    .map((item, index) => ({ item, index, rank: score(item) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((entry) => entry.item);
}

async function getGenreIdByTitle(title: string): Promise<number | undefined> {
  const normalized = title.trim().toLowerCase();
  if (!normalized) return undefined;

  // Список жанров кэшируется Next (revalidate 60), лишнего запроса к CMS нет.
  const data = await serverClient.request(GetGenresDocument);
  const genre = docsOf(data.Genres).find(
    (item) =>
      item.title.trim().toLowerCase() === normalized || item.slug.trim().toLowerCase() === normalized,
  );

  if (!genre) {
    console.warn(`Genre not found: "${title}"`);
    return undefined;
  }
  return Number.isInteger(genre.id) ? genre.id : undefined;
}

export async function getContentList(
  page = 1,
  limit = 24,
  filtersOrType?: ContentListFilters | "movie" | "series",
): Promise<ContentListResult> {
  const filters: ContentListFilters =
    typeof filtersOrType === "string" ? { type: filtersOrType } : (filtersOrType ?? {});

  try {
    const genreId = filters.genre?.trim() ? await getGenreIdByTitle(filters.genre) : undefined;

    // Жанр запрошен, но не найден: пустой результат, а не весь каталог.
    if (filters.genre?.trim() && genreId === undefined) {
      return { items: [], totalDocs: 0, hasNextPage: false };
    }

    const data = await serverClient.request(GetContentDocument, {
      limit,
      page,
      sort: getContentSort(filters.sort),
      where: buildContentWhere(filters, genreId),
    });

    const content = data.Contents;
    let items = docsOf(content).map((doc) => {
      const raw = doc as unknown as RawContent;
      withNormalizedUrl(raw.poster);
      return mapContentToItem(raw);
    });

    const search = sanitizeSearch(filters.search);
    if (search) items = rankBySearch(items, search);

    return {
      items,
      totalDocs: content?.totalDocs ?? 0,
      hasNextPage: content?.hasNextPage ?? false,
    };
  } catch (error) {
    console.error("getContentList failed", error);
    throw error;
  }
}

/**
 * Тайтл для hero-блока главной: свежий, с рейтингом и обязательно с фоном
 * (с заглушкой вместо backdrop hero выглядит пустым). Если таких нет —
 * любой сериал/фильм с фоном.
 */
export async function getHeroItem(): Promise<ContentItem | undefined> {
  const currentYear = new Date().getFullYear();

  const attempts: Content_Where[] = [
    {
      AND: [
        { type: { equals: "series" } },
        { backdrop: { exists: true } },
        { rating: { greater_than_equal: 7 } },
        { releaseYear: { greater_than_equal: currentYear - 1 } },
      ],
    } as Content_Where,
    { backdrop: { exists: true } } as Content_Where,
  ];

  for (const where of attempts) {
    const data = await serverClient.request(GetHeroContentDocument, { where });
    const doc = docsOf(data.Contents)[0];
    if (doc) {
      const raw = doc as unknown as RawContent;
      withNormalizedUrl(raw.poster);
      withNormalizedUrl(raw.backdrop);
      return mapContentToItem(raw);
    }
  }
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*                              Content by slug                               */
/* -------------------------------------------------------------------------- */

type RawContentWithFranchise = RawContent & { franchiseId?: string | null };

/** Какие записи Content считаются сезонами одного сериала. */
function franchiseWhere(raw: RawContentWithFranchise): Content_Where {
  if (raw.franchiseId) return { franchiseId: { equals: raw.franchiseId } };
  if (raw.kinopoiskId) return { kinopoiskId: { equals: raw.kinopoiskId } };
  return { id: { equals: raw.id } };
}

/** Сезоны и серии всей франшизы — одним запросом (см. get-series-franchise.graphql). */
async function getFranchiseSeasons(raw: RawContentWithFranchise): Promise<Season[]> {
  const data = await serverClient.request(GetSeriesFranchiseDocument, {
    where: franchiseWhere(raw),
  });

  const seasons: Season[] = [];

  for (const content of docsOf(data.Contents)) {
    const poster = withNormalizedUrl(content.poster);
    const backdrop = withNormalizedUrl(content.backdrop);
    const description = richTextToPlainText(content.description ?? "") || undefined;

    for (const season of docsOf(content.seasons)) {
      if (typeof season.seasonNumber !== "number" || Number.isNaN(season.seasonNumber)) continue;

      seasons.push({
        id: season.id,
        seasonNumber: season.seasonNumber,
        title: season.title ?? `Сезон ${season.seasonNumber}`,
        contentTitle: content.titleRu ?? undefined,
        // Год сезона: у строки сезона, а если пусто — у его Content.
        releaseYear: season.releaseYear ?? content.releaseYear ?? 0,
        slug: content.slug ?? "",
        releaseStatus: parseReleaseStatus(content.releaseStatus),
        poster: poster?.url ? { id: content.id, url: poster.url } : undefined,
        backdrop: backdrop?.url ? { id: content.id, url: backdrop.url } : undefined,
        description,
        rating: content.rating ?? undefined,
        ageRating: content.ageRating ?? undefined,
        episodes: docsOf(season.episodes)
          .map((episode) => ({
            id: episode.id,
            episodeNumber: episode.episodeNumber ?? 0,
            title: episodeTitle(episode.title, episode.episodeNumber ?? 0),
            // description в CMS — richText (Lexical JSON), а не строка.
            description: richTextToPlainText(episode.description),
            releaseDate: episodeReleaseDate(episode.airingAt),
            duration: episode.duration ?? 0,
            embedUrl: episode.playerLink ?? undefined,
          }))
          .sort((a, b) => a.episodeNumber - b.episodeNumber),
      });
    }
  }

  // Номер сезона, затем год: «Часть 1» и «Часть 2» одного сезона идут подряд
  // в порядке выхода. Затем убираем дубли строк одного тайтла (остаются в БД
  // после перенумерации франшизы старой версией пайплайна) и считаем части.
  seasons.sort(
    (a, b) =>
      a.seasonNumber - b.seasonNumber ||
      a.releaseYear - b.releaseYear ||
      String(a.id).localeCompare(String(b.id), undefined, { numeric: true }),
  );

  return labelSeasons(dedupeSeasonsBySlug(seasons));
}

/* -------------------------------------------------------------------------- */
/*                         Расписание эфира (/schedule)                       */
/* -------------------------------------------------------------------------- */

export interface ScheduleEntry {
  /** Карточка сериала (как в каталоге). */
  item: ContentItem;
  next: NextEpisode;
}

/**
 * Расписание на сегодня и дальше (по Москве): будущие серии из
 * content.nextEpisode*, плюс уже вышедшие СЕГОДНЯ серии из episodes.airingAt
 * (в content.nextEpisode* после выхода серии стоит уже следующая, поэтому без
 * них сегодняшний вечер пропадал бы из списка). Дубли (тайтл + номер серии)
 * схлопываются; по времени эфира.
 *
 * Бросает ошибку, если в CMS нет полей nextEpisode* — вызывающий код решает,
 * что показывать (страница — сообщение, главная — нет блока). Запрос вышедших
 * серий необязателен: при сбое остаётся только будущее расписание.
 */
export async function getSchedule(limit = 200): Promise<ScheduleEntry[]> {
  const nowMs = Date.now();
  const startSec = mskDayStartSec(nowMs);

  const where = {
    AND: [{ type: { equals: "series" } }, { nextEpisodeAt: { greater_than_equal: startSec } }],
  } as unknown as Content_Where;

  const [upcoming, aired] = await Promise.all([
    serverClient.request(GetScheduleDocument, { where, limit }),
    serverClient
      .request(GetAiredEpisodesDocument, {
        where: {
          AND: [
            { airingAt: { greater_than_equal: startSec } },
            { airingAt: { less_than_equal: Math.floor(nowMs / 1000) } },
          ],
        } as unknown as Episode_Where,
        limit,
      })
      .catch((error) => {
        console.warn("getSchedule: вышедшие серии недоступны", error);
        return undefined;
      }),
  ]);

  const entries = new Map<string, ScheduleEntry>();
  const add = (doc: unknown, next: NextEpisode | undefined) => {
    const raw = doc as RawContent | null | undefined;
    if (!raw || !next || raw.type !== "series" || !raw.slug) return;
    const key = `${raw.id}:${next.number}`;
    if (entries.has(key)) return;
    withNormalizedUrl(raw.poster);
    entries.set(key, { item: mapContentToItem(raw), next });
  };

  for (const doc of docsOf(upcoming.Contents)) {
    add(doc, parseNextEpisode(doc.nextEpisodeNumber, doc.nextEpisodeAt));
  }
  for (const episode of docsOf(aired?.Episodes)) {
    add(episode.season?.content, parseNextEpisode(episode.episodeNumber, episode.airingAt));
  }

  return [...entries.values()].sort((a, b) => a.next.airingAt - b.next.airingAt);
}

/**
 * Расписание: дописывает сезонам ближайшую невышедшую серию (по slug записи
 * Content). Отдельный запрос с перехватом ошибки: пока CMS не получила поля
 * nextEpisode*, сайт работает как раньше, просто без расписания.
 */
async function attachNextEpisodes(seasons: Season[], where: Content_Where): Promise<void> {
  try {
    const data = await serverClient.request(GetNextEpisodesDocument, { where });
    const bySlug = new Map<string, NonNullable<ReturnType<typeof parseNextEpisode>>>();
    for (const doc of docsOf(data.Contents)) {
      const next = parseNextEpisode(doc.nextEpisodeNumber, doc.nextEpisodeAt);
      if (next && doc.slug) bySlug.set(doc.slug, next);
    }
    for (const season of seasons) {
      const next = bySlug.get(season.slug);
      if (next) season.nextEpisode = next;
    }
  } catch (error) {
    console.warn("attachNextEpisodes: расписание недоступно (нет полей в CMS?)", error);
  }
}

export async function getContentBySlug(slug: string): Promise<ContentItem | undefined> {
  try {
    const data = await serverClient.request(GetContentBySlugDocument, { slug });
    const raw = docsOf(data.Contents)[0] as unknown as RawContentWithFranchise | undefined;
    if (!raw) return undefined;

    // Для внешних потребителей (OG) картинка из SEO-полей остаётся публичной —
    // подменяем только то, что рендерит сам сайт через next/image.
    withNormalizedUrl(raw.poster);
    withNormalizedUrl(raw.backdrop);

    const item = mapContentToItem(raw);

    if (item.type === "series") {
      try {
        item.seasons = await getFranchiseSeasons(raw);
        await attachNextEpisodes(item.seasons, franchiseWhere(raw));

        // Шапка страницы и SEO описывают ПОСЛЕДНИЙ вышедший сезон, а не тот,
        // чей slug открыт (иначе у франшизы с 2013 года был бы 2013-й).
        const latest = pickLatestSeason(item.seasons);
        if (latest) {
          if (latest.releaseYear) item.releaseYear = latest.releaseYear;
          if (latest.releaseStatus) item.releaseStatus = latest.releaseStatus;
          if (latest.rating) item.rating = latest.rating;
          if (latest.ageRating != null) item.ageRating = latest.ageRating;
          if (latest.description) item.description = latest.description;
          if (latest.poster?.url) item.poster = latest.poster;
          if (latest.backdrop?.url) item.backdrop = latest.backdrop;
          if (latest.releaseYear) {
            item.isNew = new Date().getFullYear() - latest.releaseYear <= NEW_ARRIVAL_YEARS_WINDOW;
          }
          if (latest.rating) item.isPopular = latest.rating >= POPULAR_RATING_THRESHOLD;
        }
      } catch (error) {
        console.error(`getContentBySlug: не удалось получить сезоны (slug=${slug})`, error);
        item.seasons = [];
      }
    }

    return item;
  } catch (error) {
    console.error(`getContentBySlug(${slug}) failed`, error);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                         Озвучки серий (episode-sources)                    */
/* -------------------------------------------------------------------------- */

/**
 * Ссылки на плеер всех озвучек для серий одного сезона, по номеру серии.
 *
 * Основная озвучка серии берётся из episodes.playerLink (см. getFranchiseSeasons),
 * остальные — из коллекции CMS episode-sources. Два запроса: id серий сезона,
 * затем источники этих серий (фильтр по связи `episode` с вложенным полем
 * сезона в GraphQL Payload недоступен). Оба кэшируются Next (revalidate 60).
 * Если коллекции в CMS ещё нет, запрос выбросит ошибку — вызывающий код
 * показывает серию без выбора озвучки.
 */
export async function getSeasonSources(seasonId: number): Promise<SeasonSources> {
  const episodes = await serverClient.request(GetSeasonEpisodeIdsDocument, {
    where: { season: { equals: seasonId } } as Episode_Where,
  });

  const numberById = new Map<number, number>();
  for (const episode of docsOf(episodes.Episodes)) numberById.set(episode.id, episode.episodeNumber);
  if (numberById.size === 0) return {};

  const data = await serverClient.request(GetEpisodeSourcesDocument, {
    where: { episode: { in: [...numberById.keys()] } } as EpisodeSource_Where,
  });

  const rows: SourceRow[] = [];
  for (const source of docsOf(data.EpisodeSources)) {
    const episodeNumber = source.episode ? numberById.get(source.episode.id) : undefined;
    if (episodeNumber === undefined || !source.voiceover?.slug || !source.playerLink) continue;
    rows.push({
      episodeNumber,
      slug: source.voiceover.slug,
      title: source.voiceover.title,
      url: source.playerLink,
    });
  }
  return groupSources(rows);
}

/* -------------------------------------------------------------------------- */
/*                                   Genres                                   */
/* -------------------------------------------------------------------------- */

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await serverClient.request(GetGenresDocument);
    return docsOf(data.Genres) as Genre[];
  } catch (error) {
    console.error("getGenres failed", error);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Similar content                              */
/* -------------------------------------------------------------------------- */

/**
 * Похожий контент: тот же тип, общий жанр, без самого тайтла и без других
 * сезонов той же франшизы (они уже есть в переключателе сезонов).
 */
export async function getSimilarContent(item: ContentItem, limit = 12): Promise<ContentItem[]> {
  if (!item.genreIds?.length) return [];

  const baseAnd: Record<string, unknown>[] = [
    { genres: { in: item.genreIds } },
    { id: { not_equals: Number(item.id) } },
    { type: { equals: item.type } },
  ];

  if (item.franchiseId) baseAnd.push({ franchiseId: { not_equals: item.franchiseId } });
  if (item.kinopoiskId) baseAnd.push({ kinopoiskId: { not_equals: item.kinopoiskId } });

  const fetchSimilar = async (and: Record<string, unknown>[], count: number): Promise<ContentItem[]> => {
    const data = await serverClient.request(GetSimilarContentDocument, {
      where: { AND: and } as Content_Where,
      limit: count,
      sort: "-rating",
    });

    return docsOf(data.Contents).map((doc) => {
      const raw = doc as unknown as RawContent;
      withNormalizedUrl(raw.poster);
      return mapContentToItem(raw);
    });
  };

  try {
    // Сначала с рейтингом: в Postgres NULL при сортировке по убыванию идёт
    // первым, поэтому без фильтра тайтлы без рейтинга вытеснили бы остальные.
    const rated = await fetchSimilar([...baseAnd, { rating: { greater_than: 0 } }], limit);
    if (rated.length >= limit) return rated;

    const ratedIds = rated.map((entry) => Number(entry.id));
    const rest = await fetchSimilar(
      [...baseAnd, ...(ratedIds.length > 0 ? [{ id: { not_in: ratedIds } }] : [])],
      limit - rated.length,
    );

    return [...rated, ...rest];
  } catch (error) {
    console.error(`getSimilarContent(${item.id}) failed`, error);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Sitemap                                   */
/* -------------------------------------------------------------------------- */

export interface SitemapEntry {
  slug: string;
  type: "movie" | "series";
  updatedAt?: string;
}

/**
 * Лёгкий список для sitemap.xml: только slug, тип и дата изменения.
 * Забирает страницами по 1000, максимум 20 страниц.
 */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  for (let page = 1; page <= 20; page += 1) {
    const data = await serverClient.request(GetSitemapEntriesDocument, { limit: 1000, page });

    for (const doc of docsOf(data.Contents)) {
      if (doc.slug && (doc.type === "movie" || doc.type === "series")) {
        entries.push({
          slug: doc.slug,
          type: doc.type,
          updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : undefined,
        });
      }
    }

    if (!data.Contents?.hasNextPage) break;
  }

  return entries;
}
