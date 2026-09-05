# Movies Platform

Монорепозиторий онлайн-кинотеатра: каталог фильмов и сериалов (в том числе аниме, импортируемое из [Kodik API](https://kodikapi.com/)), избранное, аутентификация пользователей.

Состоит из двух приложений:

| Приложение | Папка | Стек | Порт |
| --- | --- | --- | --- |
| **web** | [`apps/web`](./apps/web) | Next.js 15 (React 19) + GraphQL Client, публичный фронтенд | `3000` |
| **cms** | [`apps/cms`](./apps/cms) | Payload CMS 3 (Next.js) + PostgreSQL, админка и API | `4000` |

Подробности по каждому приложению — в их собственных README:
- [apps/web/README.md](./apps/web/README.md)
- [apps/cms/README.md](./apps/cms/README.md)

## Архитектура

```
                ┌────────────────────┐
   браузер ───▶ │   apps/web (3000)  │   Next.js — публичная витрина
                └─────────┬──────────┘
                          │ GraphQL (http://localhost:4000/api/graphql)
                          ▼
                ┌────────────────────┐
                │   apps/cms (4000)  │   Payload CMS — API + Admin Panel
                └─────────┬──────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
      PostgreSQL        Redis          MinIO (S3)
      (данные)        (кеш/очереди)   (медиафайлы)
```

- **apps/cms** — источник истины: коллекции `Content` (фильмы/сериалы), `Genres`, `Seasons`, `Episodes`, `Media`, `Users`, `Favorites`; отдаёт данные через REST и GraphQL API Payload, а также содержит эндпоинт `/api/import/kodik` для импорта каталога из Kodik.
- **apps/web** — публичное SSR-приложение на Next.js, ходит в `apps/cms` по GraphQL (`graphql-request` + сгенерированные через `graphql-codegen` типы/документы).
- Инфраструктура (**PostgreSQL**, **Redis**, **MinIO**) поднимается через корневой `docker-compose.yml`.

## Требования

- Node.js `^18.20.2` или `>=20.9.0`
- [pnpm](https://pnpm.io/) `10.x` (см. `packageManager` в `package.json`)
- Docker и Docker Compose (для локальной инфраструктуры)

## Быстрый старт

1. Установить зависимости во всём монорепо:

   ```bash
   pnpm install
   ```

2. Поднять инфраструктуру (PostgreSQL, Redis, MinIO):

   ```bash
   docker-compose up -d
   ```

   Переменные для сервисов читаются из `.env.local` в корне репозитория (уже содержит рабочие значения для локальной разработки — БД `movies2`, пользователь `admin`, MinIO-бакет `media` и т.д.). При необходимости скорректируйте их под себя.

3. Настроить `.env` для каждого приложения — см. соответствующие README:
   - [apps/cms/README.md](./apps/cms/README.md#переменные-окружения)
   - [apps/web/README.md](./apps/web/README.md#переменные-окружения)

4. Запустить оба приложения одновременно из корня (через [Turborepo](https://turbo.build/)):

   ```bash
   pnpm dev
   ```

   Это выполнит `dev`-скрипт в `apps/cms` (`http://localhost:4000`) и `apps/web` (`http://localhost:3000`) параллельно.

   Приложения можно запускать и по отдельности — см. README каждого из них.

## Скрипты монорепо

Все команды выполняются из корня и раскладываются Turborepo по пакетам (`apps/*`):

| Команда | Описание |
| --- | --- |
| `pnpm dev` | Запуск `web` и `cms` в режиме разработки |
| `pnpm build` | Сборка всех приложений (`^build` — сначала зависимости) |
| `pnpm lint` | Линт всех приложений |
| `pnpm typecheck` | Проверка типов во всех приложениях |

## Структура репозитория

```
movies-platform/
├── apps/
│   ├── web/               # Next.js фронтенд
│   └── cms/               # Payload CMS backend
├── docker-compose.yml      # PostgreSQL, Redis, MinIO
├── .env.local               # env для docker-compose (инфраструктура)
├── turbo.json                # конфигурация Turborepo
└── pnpm-workspace.yaml        # workspace-пакеты (apps/*, packages/*)
```

## Инфраструктура (docker-compose)

| Сервис | Образ | Порт | Назначение |
| --- | --- | --- | --- |
| `postgres` | `postgres:16-alpine` | `5432` | Основная БД для `apps/cms` |
| `redis` | `redis:7-alpine` | `6379` | Кеш / очереди |
| `minio` | `minio/minio` | `9000` (API), `9001` (Console) | S3-совместимое хранилище для медиафайлов |
| `minio-init` | `minio/mc` | — | Одноразовый сервис: создаёт бакет из `S3_BUCKET` и открывает его на публичное чтение |

Остановить контейнеры с сохранением данных:

```bash
docker-compose down
```

Полностью очистить данные (volumes):

```bash
docker-compose down -v
```