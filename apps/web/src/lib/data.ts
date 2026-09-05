// АВТОГЕНЕРИРОВАНО из прототипа CineHub. Мок-данные имитируют форму
// коллекции Content (ТЗ п.8.3) — при подключении Payload CMS этот файл
// заменяется на fetch-запросы к /api/content, /api/genres и т.д. (см. lib/api.ts).
import type { Movie, Series, ContentItem, Genre } from "./types";

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

export const GENRES: Genre[] = [
  { title: "Триллер", slug: "thriller" },
  { title: "Драма", slug: "drama" },
  { title: "Фантастика", slug: "sci-fi" },
  { title: "Мистика", slug: "mystery" },
  { title: "Хоррор", slug: "horror" },
  { title: "Боевик", slug: "action" },
  { title: "Приключения", slug: "adventure" },
  { title: "Криминал", slug: "crime" },
];

export const MOVIES: Movie[] = [
  {
    id: 1, type: "movie",
    titleRu: "Тёмный Горизонт", titleEn: "Dark Horizon", slug: "dark-horizon",
    releaseYear: 2024, rating: 8.4, duration: 137,
    genres: ["Триллер", "Драма"], status: "published",
    description: "Детектив Кай Вестер расследует серию загадочных исчезновений в ночном городе. Каждый след ведёт к организации, которой не должно существовать. Между правдой и выживанием — только один выбор.",
    director: "Алекс Форбс", cast: ["Натан Вест", "Айра Коэн", "Мари Лоран", "Дэн Хёрт"],
    poster: img("1534809032296-c54cdd62e9a4", 300, 450),
    backdrop: img("1536440136628-849c177e76a1", 1400, 700), isPopular: true,
  },
  {
    id: 2, type: "movie",
    titleRu: "Последний Рассвет", titleEn: "Last Dawn", slug: "last-dawn",
    releaseYear: 2023, rating: 7.9, duration: 118,
    genres: ["Фантастика", "Драма"], status: "published",
    description: "На краю обитаемой галактики небольшой экипаж обнаруживает сигнал из мёртвой звёздной системы. То, что они находят там, меняет всё, что человечество знало о своём происхождении.",
    director: "Юна Такахаши", cast: ["Кай Нортон", "Зара Эллис", "Рейс Дэниелс"],
    poster: img("1500648767791-00dcc994a43e", 300, 450),
    backdrop: img("1478720568477-152d9b164e26", 1400, 700), isPopular: true,
  },
  {
    id: 3, type: "movie",
    titleRu: "Осколки", titleEn: "Fragments", slug: "fragments",
    releaseYear: 2024, rating: 8.1, duration: 125,
    genres: ["Драма", "Мистика"], status: "published",
    description: "После трагической аварии художница Нова начинает видеть воспоминания, которые ей не принадлежат. Каждый фрагмент — чужая жизнь, чужая боль, чужая тайна.",
    director: "Мария Соуза", cast: ["Нова Кейн", "Рейс Дэниелс", "Оли Грэм"],
    poster: img("1494790108377-be9c29b29330", 300, 450),
    backdrop: img("1517604931442-7e0c8ed2963c", 1400, 700), isPopular: true, isNew: true,
  },
  {
    id: 4, type: "movie",
    titleRu: "Пустота", titleEn: "Void", slug: "void",
    releaseYear: 2023, rating: 7.6, duration: 108,
    genres: ["Хоррор", "Триллер"], status: "published",
    description: "Группа учёных в арктической исследовательской станции обнаруживает нечто подо льдом. Сигнал без источника. Присутствие без формы. Страх без имени.",
    director: "Адам Блэк", cast: ["Сара Нолан", "Лео Чен", "Кара Уотсон"],
    poster: img("1507003211169-0a1dd7228f2d", 300, 450),
    backdrop: img("1574267432553-4a4628b0c3b4", 1400, 700),
  },
  {
    id: 5, type: "movie",
    titleRu: "Небесный Вор", titleEn: "Sky Thief", slug: "sky-thief",
    releaseYear: 2024, rating: 7.2, duration: 123,
    genres: ["Боевик", "Приключения"], status: "published",
    description: "Бывший военный пилот берётся за последнее задание: похитить прототип сверхсекретного самолёта прямо из охраняемого ангара. Но цена, которую с него потребуют, куда выше денег.",
    director: "Кара Уотсон", cast: ["Дэн Мур", "Эми Тан", "Рик Харт"],
    poster: img("1472099645785-5658abf4ff4e", 300, 450),
    backdrop: img("1440404653325-ab127d49abc1", 1400, 700), isNew: true,
  },
  {
    id: 6, type: "movie",
    titleRu: "Молчание Глубин", titleEn: "Silence of the Deep", slug: "silence-of-the-deep",
    releaseYear: 2022, rating: 8.7, duration: 151,
    genres: ["Драма"], status: "published",
    description: "Одинокий смотритель маяка на необитаемом острове начинает получать радиосигналы от корабля, затонувшего тридцать лет назад. История о вине, памяти и принятии неизбежного.",
    director: "Ив Леклер", cast: ["Хосе Риос", "Мила Дрейк"],
    poster: img("1542909168-82c3e7fdba80", 300, 450),
    backdrop: img("1485846234645-a62644f84728", 1400, 700),
  },
  {
    id: 7, type: "movie",
    titleRu: "Красная Зима", titleEn: "Red Winter", slug: "red-winter",
    releaseYear: 2023, rating: 8.0, duration: 129,
    genres: ["Триллер", "Криминал"], status: "published",
    description: "Следователь Зоя Прайс приезжает в маленький заснеженный город, где исчезли несколько человек. Местные молчат. Метель надвигается. Правда глубже, чем снег.",
    director: "Том Барнс", cast: ["Зоя Прайс", "Ник Харт", "Эд Коул"],
    poster: img("1517841905240-472988babdf9", 300, 450),
    backdrop: img("1518644730709-0835105d9daa", 1400, 700), isPopular: true,
  },
  {
    id: 8, type: "movie",
    titleRu: "Эхо", titleEn: "Echo", slug: "echo",
    releaseYear: 2024, rating: 7.8, duration: 112,
    genres: ["Фантастика"], status: "published",
    description: "В 2087 году человечество научилось сохранять сознание. Сэм Фокс — копия человека, который умер год назад. Он помнит всё. Но он не совсем он.",
    director: "Джина Парк", cast: ["Сэм Фокс", "Тара Хилл", "Лин Чжоу"],
    poster: img("1521119989659-a83eee488004", 300, 450),
    backdrop: img("1555399153-2d1e3d6b4a82", 1400, 700), isNew: true,
  },
  {
    id: 9, type: "movie",
    titleRu: "Алый Прилив", titleEn: "Crimson Tide", slug: "crimson-tide",
    releaseYear: 2023, rating: 7.5, duration: 132,
    genres: ["Боевик", "Драма"], status: "published",
    description: "Команда морских пехотинцев попадает в засаду на острове, который должен был быть эвакуирован. Выживание превращается в нечто большее, когда они узнают, почему остров изолирован.",
    director: "Рэй Стоун", cast: ["Кол Вейд", "Ная Сандерс", "Тай Бёрнс"],
    poster: img("1539571696357-5a69c17a67c6", 300, 450),
    backdrop: img("1414609245224-aea2f9184e2b", 1400, 700),
  },
  {
    id: 10, type: "movie",
    titleRu: "Призрак Города", titleEn: "City Ghost", slug: "city-ghost",
    releaseYear: 2024, rating: 8.2, duration: 120,
    genres: ["Мистика", "Триллер"], status: "published",
    description: "Журналист Эван Росс начинает расследовать легенды о городе, который появляется на картах только ночью. Чем глубже он копает, тем менее реальным становится мир вокруг него.",
    director: "Олив Грэй", cast: ["Эван Росс", "Сия Луна", "Перси Блейк"],
    poster: img("1488161628813-04466f872be2", 300, 450),
    backdrop: img("1542204165-65bf26472b9b", 1400, 700), isNew: true,
  },
  {
    id: 11, type: "movie",
    titleRu: "Железные Крылья", titleEn: "Iron Wings", slug: "iron-wings",
    releaseYear: 2022, rating: 7.3, duration: 138,
    genres: ["Боевик", "Приключения"], status: "published",
    description: "В мире, где власть принадлежит воздушным флотилиям, один механик решает бросить вызов самой мощной из них — используя обломки списанных машин и отчаянную храбрость.",
    director: "Хал Бёрнс", cast: ["Трэй Уолш", "Лина Кросс", "Вик Рид"],
    poster: img("1463453091185-61582044d556", 300, 450),
    backdrop: img("1446941611757-91d2c3bd3d45", 1400, 700),
  },
  {
    id: 12, type: "movie",
    titleRu: "Белый Шум", titleEn: "White Noise", slug: "white-noise",
    releaseYear: 2023, rating: 7.9, duration: 126,
    genres: ["Драма", "Мистика"], status: "published",
    description: "Семья переезжает в старый загородный дом. Дочь начинает слышать голоса из старого радиоприёмника. Голоса знают их имена. Голоса говорят правду.",
    director: "Ана Рейес", cast: ["Дон Чейз", "Мей Уонг", "Лу Харт"],
    poster: img("1558618666-fcd25c85cd64", 300, 450),
    backdrop: img("1516912481808-3406841bd33c", 1400, 700),
  },
];

const makeEpisodes = (count: number, year: number) =>
  Array.from({ length: count }, (_, i) => ({
    episodeNumber: i + 1,
    title: ["Пилот", "Тени прошлого", "Двойная игра", "Под давлением", "Точка невозврата", "Красная линия", "Осколки доверия", "Финал"][i] ?? `Эпизод ${i + 1}`,
    description: "Напряжение нарастает, когда главные герои оказываются перед выбором, который изменит всё.",
    releaseDate: `${year}-${String(Math.min(i + 1, 12)).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    duration: 42 + (i % 3) * 5,
  }));

export const SERIES: Series[] = [
  {
    id: 101, type: "series",
    titleRu: "Теневой Синдикат", titleEn: "Shadow Syndicate", slug: "shadow-syndicate",
    releaseYear: 2022, rating: 9.1,
    genres: ["Криминал", "Триллер"], status: "published",
    description: "Макс Барон — следователь, который сам принадлежит к тени. Три сезона охоты, предательств и жестокой правды о системе, которую он поклялся разрушить.",
    director: "Пол Дарен", cast: ["Макс Барон", "Ива Стерн", "Рэй Холм", "Вэй Чжоу"],
    poster: img("1506794778202-cad84cf45f1d", 300, 450),
    backdrop: img("1489599849927-2ee91cede3ba", 1400, 700), isPopular: true,
    seasons: [{ seasonNumber: 1, releaseYear: 2022, episodes: makeEpisodes(8, 2022) }, { seasonNumber: 2, releaseYear: 2023, episodes: makeEpisodes(8, 2023) }, { seasonNumber: 3, releaseYear: 2024, episodes: makeEpisodes(6, 2024) }],
  },
  {
    id: 102, type: "series",
    titleRu: "Последняя Граница", titleEn: "Last Frontier", slug: "last-frontier",
    releaseYear: 2023, rating: 8.6,
    genres: ["Фантастика", "Драма"], status: "published",
    description: "Колониальный корабль достигает планеты, объявленной необитаемой. Но кто-то уже здесь. Два сезона о первом контакте, выживании и цене открытия.",
    director: "Нао Ли", cast: ["Кирра Энн", "Дэвид Тэнн", "Сол Рэй"],
    poster: img("1529068755536-a5ade0dcb4e8", 300, 450),
    backdrop: img("1509347528160-9a9e33742cdb", 1400, 700), isPopular: true, isNew: true,
    seasons: [{ seasonNumber: 1, releaseYear: 2023, episodes: makeEpisodes(8, 2023) }, { seasonNumber: 2, releaseYear: 2024, episodes: makeEpisodes(8, 2024) }],
  },
  {
    id: 103, type: "series",
    titleRu: "Ночные Хищники", titleEn: "Night Predators", slug: "night-predators",
    releaseYear: 2024, rating: 8.3,
    genres: ["Триллер", "Хоррор"], status: "published",
    description: "В небольшом приморском городе люди начинают исчезать после захода солнца. Полицейский и местный биолог объединяются, чтобы остановить то, чему нет научного объяснения.",
    director: "Лора Фин", cast: ["Рекс Коул", "Яна Мид", "Том Пирс"],
    poster: img("1531746020798-e6953c6e8e04", 300, 450),
    backdrop: img("1507608616759-54f48f0af0ee", 1400, 700), isNew: true,
    seasons: [{ seasonNumber: 1, releaseYear: 2024, episodes: makeEpisodes(6, 2024) }],
  },
  {
    id: 104, type: "series",
    titleRu: "Код Судьбы", titleEn: "Fate Code", slug: "fate-code",
    releaseYear: 2024, rating: 8.5,
    genres: ["Мистика", "Драма"], status: "published",
    description: "Программист находит в старом коде алгоритм, предсказывающий смерть. Первые жертвы — его близкие. У него есть 72 часа, чтобы изменить то, что система называет неизбежным.",
    director: "Сон Ву", cast: ["Ли Джин", "Паркер Блю", "Нора Кейн"],
    poster: img("1532074205216-d0e1f4b87368", 300, 450),
    backdrop: img("1518770660439-4636190af475", 1400, 700), isPopular: true, isNew: true,
    seasons: [{ seasonNumber: 1, releaseYear: 2024, episodes: makeEpisodes(8, 2024) }],
  },
  {
    id: 105, type: "series",
    titleRu: "Стальные Узы", titleEn: "Steel Bonds", slug: "steel-bonds",
    releaseYear: 2022, rating: 8.8,
    genres: ["Драма", "Криминал"], status: "published",
    description: "Две семьи. Два поколения. Одна улица. История о том, как страх, гордость и любовь переплетаются в нечто неразрывное — и смертоносное.",
    director: "Фин О'Коннор", cast: ["Дэш Рид", "Эмми Лорд", "Лукас Бейн"],
    poster: img("1523824921871-d6f3ea5a52fd", 300, 450),
    backdrop: img("1550745165-9bc0b252726f", 1400, 700), isPopular: true,
    seasons: [{ seasonNumber: 1, releaseYear: 2022, episodes: makeEpisodes(8, 2022) }, { seasonNumber: 2, releaseYear: 2023, episodes: makeEpisodes(8, 2023) }],
  },
  {
    id: 106, type: "series",
    titleRu: "Эфир", titleEn: "Ether", slug: "ether",
    releaseYear: 2023, rating: 8.4,
    genres: ["Фантастика", "Триллер"], status: "published",
    description: "Засекреченный правительственный эксперимент открывает канал связи между нашим миром и чем-то за его пределами. Оказалось, они давно нас слушают.",
    director: "Вэй Чжан", cast: ["Ши Лун", "Нова Кейн", "Джо Марш"],
    poster: img("1547425220-1d4e54b3f5df", 300, 450),
    backdrop: img("1531297484001-80022131f5a1", 1400, 700),
    seasons: [{ seasonNumber: 1, releaseYear: 2023, episodes: makeEpisodes(6, 2023) }],
  },
];

export const ALL_CONTENT: ContentItem[] = [...MOVIES, ...SERIES];

export function getContentBySlug(slug: string): ContentItem | undefined {
  return ALL_CONTENT.find((c) => c.slug === slug);
}

export function getSimilar(item: ContentItem, limit = 5): ContentItem[] {
  const pool = item.type === "movie" ? MOVIES : SERIES;
  return pool.filter((c) => c.id !== item.id && c.genres.some((g) => item.genres.includes(g))).slice(0, limit);
}