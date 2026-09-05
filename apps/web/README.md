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
│   │   ├── page.tsx            # Главная
│   │   ├── catalog/            # Каталог фильмов/сериалов
│   │   ├── movie/[slug]/       # Страница фильма
│   │   ├── series/[slug]/      # Страница сериала
│   │   ├── search/              # Поиск
│   │   ├── favorites/           # Избранное
│   │   ├── login/, register/,   # Аутентификация
│   │   │   forgot-password/
│   │   ├── profile/, profile/edit/  # Личный кабинет
│   │   ├── sitemap.ts, robots.ts    # SEO
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── chrome/            # Общий "каркас" (header/footer/навигация)
│   │   ├── content/            # Компоненты для отображения контента (карточки и т.п.)
│   │   ├── pages/               # Композиция компонентов под конкретные страницы
│   │   ├── providers/            # React Query Provider и т.п.
│   │   └── ui/                    # Переиспользуемые UI-примитивы
│   ├── graphql/
│   │   ├── queries/            # GraphQL-запросы
│   │   ├── mutations/           # GraphQL-мутации
│   │   └── contents/             # Фрагменты/операции по контенту
│   ├── generated/graphql.ts   # Автогенерируемые типы (см. `pnpm codegen`, не редактировать вручную)
│   └── lib/
│       ├── api.ts             # Слой доступа к данным (сейчас частично на моках, см. ниже)
│       ├── data.ts             # Мок-данные для страниц/функций, ещё не подключённых к API
│       ├── graphql-client.ts    # GraphQL-клиент с credentials: 'include' (для авторизованных запросов)
│       ├── query-client.ts       # Конфигурация React Query
│       ├── types.ts               # Общие типы
│       └── utils.ts                # Утилиты
├── codegen.ts               # Конфигурация graphql-codegen
├── next.config.mjs           # Конфигурация Next.js (в т.ч. remotePatterns для картинок)
└── tsconfig.json
```

## Данные и API

Слой доступа к данным собран в `src/lib/api.ts`:

- `getContentList()` — уже ходит в `apps/cms` по GraphQL (`GetContentDocument`).
- `getContentBySlug()`, `getGenres()` — пока читают из мок-данных `src/lib/data.ts` и помечены `TODO` на подключение к API `apps/cms` (REST/GraphQL по slug и списку жанров).
- Авторизованные запросы (профиль, избранное) идут через `gqlClient` из `src/lib/graphql-client.ts` с `credentials: 'include'`, чтобы браузер отправлял httpOnly JWT-cookie, которую ставит Payload при логине/регистрации.

При появлении новых GraphQL-операций: добавьте `.graphql`-файл в `src/graphql/**`, запустите `pnpm codegen`, импортируйте сгенерированный документ из `src/generated/graphql.ts`.

## Изображения

`next.config.mjs` разрешает загрузку изображений с `images.unsplash.com` и с локального MinIO (`localhost:9000`). При деплое в продакшн добавьте туда домен вашего S3/CDN-хранилища.