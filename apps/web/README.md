# apps/web — Frontend

Публичный фронтенд онлайн-кинотеатра на [Next.js 15](https://nextjs.org/) (React 19, App Router). Отображает каталог фильмов и сериалов, страницы карточек контента, поиск, избранное и личный кабинет пользователя. Данные получает от [`apps/cms`](../cms) по GraphQL.

## Стек

- **Next.js 15** / **React 19** — App Router, SSR
- **Tailwind CSS 4** — стилизация
- **@tanstack/react-query** — управление серверным состоянием и кешем на клиенте
- **graphql-request** — GraphQL-клиент
- **@graphql-codegen** — генерация TypeScript-типов и типизированных документов из `.graphql`-файлов и схемы `apps/cms`
- **lucide-react** — иконки
- **sonner** — тосты/уведомления

## Требования

- Node.js `^18.20.2` или `>=20.9.0`
- pnpm `10.x`
- Запущенный [`apps/cms`](../cms) (для GraphQL API — по умолчанию `http://localhost:4000/api/graphql`)

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и при необходимости отредактируйте:

```bash
cp .env.example .env.local
```

| Переменная | Обязательна | Описание |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | да | URL сайта, используется в `metadata`, `sitemap.xml` и `robots.txt`. По умолчанию `http://localhost:3000` |
| `NEXT_PUBLIC_GRAPHQL_API_URL` | нет | URL GraphQL API `apps/cms`. По умолчанию `http://localhost:4000/api/graphql` (см. `src/lib/api.ts`, `src/lib/graphql-client.ts`) |

## Установка и запуск

Из корня монорепо (рекомендуется, поднимет и `web`, и `cms` через Turborepo):

```bash
pnpm install
pnpm dev
```

Либо только это приложение:

```bash
cd apps/web
pnpm install
pnpm dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000).

> Для полноценной работы (реальные данные, а не заглушки) должен быть запущен `apps/cms` на `http://localhost:4000`.

## Деплой в Dokploy

1. Один раз локально сгенерируйте типы и **закоммитьте** результат (сборка не должна зависеть от CMS, а в продакшене у Payload обычно отключена интроспекция GraphQL):
   ```bash
   pnpm install
   pnpm codegen        # нужен запущенный apps/cms
   git add src/generated/graphql.ts pnpm-lock.yaml
   ```
2. Создайте сервис **Compose** в проекте Dokploy: репозиторий с этим кодом, ветка `main`, Compose Path `./docker-compose.yml`.
3. Во вкладке **Environment** задайте `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GRAPHQL_API_URL`, `S3_PUBLIC_URL` (см. `.env.example`). `NEXT_PUBLIC_*` вшиваются в бандл при сборке, поэтому после их изменения нужен **Deploy** (пересборка), а не Reload.
4. Во вкладке **Domains**: Host `otakuum.ru`, Service Name `web`, Port `3000`, HTTPS + Let's Encrypt (то же для `www`, если нужно).
5. Авторизация (cookie `payload-token` + `credentials: 'include'`): в `apps/cms` cookie должна быть доступна сайту, то есть `auth.cookies.domain = '.otakuum.ru'`, `secure: true`, `sameSite: 'Lax'`, а `cors` и `csrf` содержат `https://otakuum.ru`.

## Скрипты

| Команда | Описание |
| --- | --- |
| `pnpm dev` | Запуск dev-сервера Next.js |
| `pnpm build` | Продакшн-сборка |
| `pnpm start` | Запуск собранного приложения |
| `pnpm lint` | Линтинг (`next lint`) |
| `pnpm codegen` | Генерация типов/документов GraphQL (`@graphql-codegen`) из схемы `apps/cms` и файлов `src/**/*.graphql` |

`codegen` читает схему по адресу, заданному в `codegen.ts` (`http://localhost:4000/api/graphql`) — перед запуском убедитесь, что `apps/cms` запущен.

## Структура проекта

```
apps/web/
├── src/
│   ├── app/                  # Роуты Next.js App Router
│   │   ├── page.tsx            # Главная (в т.ч. ряд «Сейчас выходит»)
│   │   ├── catalog/            # Каталог с фильтрами (жанр, год, возраст, статус релиза)
│   │   ├── movie/[slug]/       # Страница фильма
│   │   ├── series/[slug]/      # Страница сериала
│   │   ├── search/, favorites/, profile/, contact/, login/, register/, ...
│   │   ├── api/content/        # REST-роут каталога для клиентских фильтров
│   │   └── sitemap.ts, robots.ts, manifest.ts
│   ├── components/
│   │   ├── chrome/             # Каркас: header, footer
│   │   ├── content/            # Карточки, hero, плеер, эпизоды, SeasonSwitcher, SimilarContent
│   │   ├── pages/              # Клиентские части страниц (+ pages/catalog/ — фильтры)
│   │   ├── providers/          # Auth, Favorites, React Query
│   │   └── ui/                 # Примитивы (Btn, Meta/бейджи, состояния, скелетоны)
│   ├── graphql/{auth,content,favorites,seasons}/   # .graphql-операции
│   ├── generated/graphql.ts    # Автогенерация (`pnpm codegen`), не редактировать вручную
│   ├── hooks/                  # useCatalogFilters и др.
│   └── lib/
│       ├── api.ts              # Серверный слой данных (GraphQL → ContentItem)
│       ├── content-mapper.ts   # Сырой ответ CMS → типы приложения
│       ├── release-status.ts   # Статусы релиза: значения, подписи, парсинг
│       ├── graphql-client.ts   # Клиент с credentials: 'include' (авторизованные запросы)
│       └── cms.ts, types.ts, utils.ts, age*.ts, jsonld.ts, ...
├── codegen.ts                # Конфигурация graphql-codegen
├── next.config.mjs           # Next.js (remotePatterns, CSP frame-src)
└── tsconfig.json
```

## Данные и API

Слой доступа к данным — `src/lib/api.ts`. Все публичные запросы идут в CMS по GraphQL (`GRAPHQL_API_URL` для SSR, иначе `NEXT_PUBLIC_GRAPHQL_API_URL`) с ревалидацией 60 секунд:

- `getContentList(page, limit, filters)` — каталог с серверной фильтрацией (тип, жанр, год, возраст, **статус релиза**, поиск) и сортировкой;
- `getContentBySlug()` — карточка контента; для сериала собирает сезоны всех записей франшизы с тем же `kinopoiskId`;
- `getGenres()`;
- `getSimilarContent()` — тот же тип и общий жанр, без самого тайтла и без других сезонов его франшизы (одинаковый `kinopoiskId`).

Авторизованные запросы (профиль, избранное) идут через `gqlClient` из `src/lib/graphql-client.ts` с `credentials: 'include'`, чтобы браузер отправлял httpOnly JWT-cookie Payload.

Новые GraphQL-операции: добавьте `.graphql`-файл в `src/graphql/**`, выполните `pnpm codegen` (нужна запущенная CMS) и закоммитьте `src/generated/graphql.ts`.

## Статус релиза (анонс / выходит / вышло)

Поле `releaseStatus` коллекции Content (`anons` / `ongoing` / `released`) заполняет пайплайн kodik-pipeline (`sync` и `update-ongoing`). На сайте оно используется так:

- **Карточки, hero** — бейдж «Выходит» (с индикатором) или «Анонс»; для «Вышло» бейдж не показывается — это обычное состояние каталога.
- **Страница сериала/фильма** — бейдж статуса, для выходящего сериала — подсказка, что новые серии появляются по мере выхода.
- **Каталог** — фильтр «Статус» (десктоп: выпадающий список, телефон: панель фильтров). Ссылка вида `/catalog?type=series&status=ongoing` открывает каталог сразу с фильтром. REST: `GET /api/content?status=ongoing` (неизвестные значения игнорируются).
- **Главная** — ряд «Сейчас выходит» (сериалы со статусом `ongoing`, сортировка по `updatedAt`: `update-ongoing` обновляет его при появлении новой серии, поэтому свежие — первыми). Сбой этого ряда не роняет главную.

⚠ **Порядок выкладки.** Поле `releaseStatus` входит в GraphQL-запросы каталога и карточек. Если фронтенд выкатить раньше CMS с миграцией `add_release_status`, CMS ответит ошибкой валидации и каталог не загрузится. Сначала деплой CMS (миграция применится при старте), затем фронтенд. Типы `src/generated/graphql.ts` уже содержат поле.

## Страница сериала: сезоны и похожее

- **`SeasonSwitcher`** — связанные сезоны (каждый сезон франшизы — отдельная запись Content со своим slug) в виде карточек: миниатюра постера, номер сезона, год, число серий, метка «Выходит»/«Анонс». Открытый сезон подсвечен и автоматически центрируется в ленте.
- **`SimilarContent`** — горизонтальная лента небольших карточек (124/148/164px) вместо сетки, где постеры растягивались на всю ширину контейнера. Свайп на телефоне, стрелки на десктопе; используется и на странице фильма.

## Форма обратной связи

Страница `/contact` (`src/components/pages/ContactClient.tsx`) отправляет `POST` прямо из браузера в CMS — `<cms>/api/contact-message` (`apps/cms/src/endpoints/contact-message.ts`), без прокси через сервер фронтенда, так же как авторизованные запросы идут напрямую через `gqlClient`. Адрес CMS вычисляется в `src/lib/cms.ts` из `NEXT_PUBLIC_GRAPHQL_API_URL` (единственной переменной, видимой браузеру). Письмо реально отправляется на стороне CMS через уже настроенный там email-адаптер (Nodemailer); apps/web не хранит собственных SMTP-учётных данных.

Вся валидация (имя/email/длина сообщения), honeypot-поле `website` и in-memory rate-limit (5 писем/час с IP) — на стороне CMS, так как её endpoint публичный и в любом случае может быть вызван напрямую, в обход этого фронтенда. Статус и сообщение от CMS (`400` — некорректные данные, `429` — превышен лимит, `503` — SMTP не настроен, `502` — не удалось отправить) `ContactClient.tsx` показывает пользователю как есть.

## Изображения

`next.config.mjs` разрешает загрузку изображений с `images.unsplash.com`, `localhost` (dev) и с домена из переменной `S3_PUBLIC_URL` (публичный адрес S3/MinIO, задаётся при сборке — см. `.env.example`).


---

## Обновление 2026-10-03: связка с CMS

Порядок выкатки: **сначала CMS** (миграция добавляет `content.franchiseId`,
который теперь запрашивает фронтенд), затем этот проект.

- **Сезоны франшизы** группируются по `franchiseId` (если не задан — по
  `kinopoiskId`, как раньше). Серии всех сезонов приходят с сервера одним
  запросом, поэтому переключение сезонов в `SeasonSwitcher` теперь происходит
  на месте, без загрузки страницы и скелетона; URL меняется на `/series/<slug сезона>`
  через `history.replaceState`.
- **Дата выхода серии** берётся из `episodes.airingAt` (Unix-секунды), а
  служебное название «Эпизод» (значение по умолчанию в CMS) заменяется на
  «Серия N» — см. `src/lib/episode.ts`.
- **Поиск** больше не использует индекс `search-results`: `SearchClient`
  ходит в `/api/content?search=…` (поиск по `Content`), результаты кэшируются
  Next. Прямые вставки пайплайна в БД теперь находятся сразу.
- **Сортировки**: «Популярные» исключают тайтлы без рейтинга (Postgres ставит
  NULL первыми при DESC), «Новинки» — `-releaseYear,-createdAt` вместо
  `-updatedAt` (см. `getContentSort` в `src/lib/api.ts`). «Похожие» сначала
  берут тайтлы с рейтингом, остаток добирают без него.
- **Кэш**: `POST /api/revalidate` с заголовком `x-revalidate-secret` сбрасывает
  тег `content`. Задайте `REVALIDATE_SECRET` здесь и в CMS (там же
  `REVALIDATE_URL`). Пайплайну после `sync` / `update-ongoing`:
  `curl -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" https://otakuum.ru/api/revalidate`.
- **sitemap.xml** запрашивает только `slug`/`type`/`updatedAt` постранично
  (`getSitemapEntries`) и отдаёт `lastModified`.
- **Вход**: после логина возвращает на страницу из `?next=`; при устаревшей
  cookie `RequireAuth` ведёт на `/login?expired=1`, и middleware не зацикливает
  редиректы между `/login` и `/profile`.
- **Избранное**: ответ CMS «уже добавлен» (теперь ValidationError) считается
  успехом — состояние синхронизируется, кнопка не откатывается.
- **Заголовки безопасности** в `next.config.mjs`: `frame-ancestors`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`.

### Нужно сделать вручную

1. `pnpm codegen` (при запущенной локально новой CMS) и закоммитить
   `src/generated/graphql.ts`. В этой версии файл поправлен вручную под два
   изменённых запроса (`GetContentBySlug`, `GetSeasonsByContentIds`), а
   `GetContentIdsByFranchise` и `GetSitemapEntries` описаны через `gql` в
   `src/lib/api.ts` и от кодогенерации не зависят.
2. Если файл `src/graphql/content/search-content.graphql` больше не нужен —
   удалите его и перегенерируйте типы (поиск его не использует).

