import { richTextToPlainText } from "./richtext";
import type {
ContentItem,
Episode,
Movie,
Season,
Series,
} from "./types";

export interface RawContent {
id: number;
type: "movie" | "series";

titleEn: string;
titleRu: string;
originalTitle?: string | null;

slug: string;
description?: unknown;

releaseYear: number;
duration?: number | null;
rating?: number | null;

/** Возрастное ограничение (0/6/12/16/18). Источник: Kodik material_data.minimal_age. */
ageRating?: number | null;


kinopoiskId?: string | null;

/** Эмбед-ссылка на плеер фильма. Есть только у type: "movie". */
playerLink?: string | null;

poster?: {
id: number | string;
url?: string | null;
} | null;

backdrop?: {
id: number | string;
url?: string | null;
} | null;

genres?: {
id: number;
title: string;
slug: string;
}[] | null;

seasons?: {
docs: {
id: number;


  /** Может быть null из GraphQL/Payload. */
  seasonNumber: number | null;

  title?: string | null;
  releaseYear?: number | null;

  content?: {
    id: number | string;
    slug: string;
    poster?: {
      id: number | string;
      url?: string | null;
    } | null;
  } | null;

  poster?: {
    id: number | string;
    url?: string | null;
  } | null;

  episodes?: {
    docs: {
      id: number;
      episodeNumber: number;
      title: string;
      description?: unknown;
      releaseDate?: string | null;
      duration?: number | null;

      /** Эмбед-ссылка на плеер конкретной серии. */
      playerLink?: string | null;
    }[];
  } | null;
}[];


} | null;
}

const EMPTY_MEDIA = {
id: 0,
url: "",
};

type RawSeason = NonNullable<
NonNullable<RawContent["seasons"]>["docs"]

> [number];

type RawEpisode = NonNullable<
NonNullable<RawSeason["episodes"]>["docs"]

> [number];

function mapMedia(
raw:
| {
id: number | string;
url?: string | null;
}
| null
| undefined,
) {
if (!raw) {
return EMPTY_MEDIA;
}

return {
id: raw.id,
url: raw.url ?? "",
};
}

function mapEpisode(raw: RawEpisode): Episode {
return {
id: raw.id,
episodeNumber: raw.episodeNumber,
title: raw.title ?? `Серия ${raw.episodeNumber}`,
description: richTextToPlainText(raw.description),
releaseDate: raw.releaseDate ?? "",
duration: raw.duration ?? 0,
embedUrl: raw.playerLink ?? undefined,
};
}

function mapSeason(raw: RawSeason): Season {
// GraphQL может вернуть null, но приложение ожидает number.
const seasonNumber =
typeof raw.seasonNumber === "number"
? raw.seasonNumber
: 1;

return {
id: raw.id,
seasonNumber,
title: raw.title ?? undefined,
releaseYear: raw.releaseYear ?? 0,
slug: raw.content?.slug ?? "",
poster: raw.content?.poster
? mapMedia(raw.content.poster)
: undefined,
episodes: (raw.episodes?.docs ?? []).map(mapEpisode),
};
}

/**

* Порог рейтинга, начиная с которого контент считается
* популярным на главной.
  */
  const POPULAR_RATING_THRESHOLD = 7.5;

/**

* Сколько последних лет считаем новыми поступлениями.
*
* Например, при текущем 2026 году:
* 2026 и 2025 считаются новыми.
  */
  const NEW_ARRIVAL_YEARS_WINDOW = 1;

function mapBaseFields(raw: RawContent) {
  const currentYear = new Date().getFullYear();

  return {
    id: Number(raw.id), // Приводим к number, чтобы соответствовать типу ContentItem['id']
    titleRu: raw.titleRu ?? "",
    titleEn: raw.titleEn ?? "",
    originalTitle: raw.originalTitle ?? undefined,
    slug: raw.slug ?? "",
    description: richTextToPlainText(raw.description ?? ""),
    releaseYear: raw.releaseYear ?? 0,
    genres: (raw.genres ?? []).map((genre) => genre.title ?? ""),
    genreIds: (raw.genres ?? []).map((genre) => Number(genre.id)),
    rating: raw.rating ?? 0,
    ageRating: raw.ageRating ?? undefined,
    isNew:
      typeof raw.releaseYear === "number"
        ? currentYear - raw.releaseYear <= NEW_ARRIVAL_YEARS_WINDOW
        : false,
    isPopular: (raw.rating ?? 0) >= POPULAR_RATING_THRESHOLD,
    poster: mapMedia(raw.poster),
    backdrop: mapMedia(raw.backdrop),
    kinopoiskId: raw.kinopoiskId ?? undefined,
    // Это поле теперь обязательно в типах Movie/Series — добавляем его сюда,
    // чтобы не дублировать в каждой ветке маппера.
    playerLink: raw.playerLink ?? "",
  };
}


/**

* Форма документа из коллекции search-results
* (@payloadcms/plugin-search) отличается от Content:
*
* * title вместо titleRu
* * могут отсутствовать genres
* * могут отсутствовать backdrop/status
* * могут отсутствовать ageRating  и другие поля
*
/**
 * Поэтому SearchResult сначала приводится к безопасной
 * форме ContentItem.
 */
export interface RawSearchResult {
  id: number | string;

  title?: string | null;
  titleEn?: string | null;

  slug?: string | null;
  type?: string | null;

  releaseYear?: number | null;
  rating?: number | null;

  // Поле, которое стало обязательным в типах Series — добавляем в сырой результат
  playerLink?: string | null;

  poster?: {
    id: number | string;
    url?: string | null;
  } | null;
}


export function mapSearchResultToItem(
raw: RawSearchResult,
): ContentItem {
const base = {
  id: Number(raw.id),
  titleRu: raw.title ?? "",
  titleEn: raw.titleEn ?? "",
  slug: raw.slug ?? "",
  description: "",
  releaseYear: raw.releaseYear ?? 0,
  genres: [],
  genreIds: [],
  rating: raw.rating ?? 0,
  ageRating: undefined,
  poster: mapMedia(raw.poster),
  backdrop: EMPTY_MEDIA,
  // Добавляем обязательное поле playerLink (берём из raw, если есть, иначе пустая строка)
  playerLink: raw.playerLink ?? "",
};

if (raw.type === "series") {
  return {
    ...base,
    type: "series",
    seasons: [],
    // Теперь playerLink уже есть в base, можно не дублировать.
    // Если логика требует переопределения — оставьте явное присваивание здесь.
  };
}

return {
...base,
type: "movie",
duration: 0,
};
}

export function mapContentToItem(
  raw: RawContent,
): ContentItem {
  const base = mapBaseFields(raw);

  if (raw.type === "movie") {
    const movie: Movie = {
      ...base,
      type: "movie",
      duration: raw.duration ?? 0,
      // ВАЖНО: embedUrl берём из raw.embedUrl, а не из playerLink
      embedUrl: raw.playerLink ?? undefined,
      // playerLink уже есть внутри base (там: playerLink: raw.playerLink ?? "")
      // поэтому явно добавлять его сюда не нужно, но TypeScript будет доволен,
      // так как поле обязательное и оно уже присутствует через spread-оператор.
    };
    return movie;
  }

  if (raw.type === "series") {
    const series: Series = {
      ...base,
      type: "series",
      seasons: (raw.seasons?.docs ?? []).map(mapSeason),
      // playerLink тоже уже есть в base
    };
    return series;
  }

  // fallback, если type не распознан (чтобы функция всегда возвращала ContentItem)
  return base as ContentItem;
}


