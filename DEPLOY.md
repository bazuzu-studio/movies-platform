# Деплой в Dokploy: web и cms по отдельности

Один репозиторий — два независимых сервиса Dokploy. У каждого свой Dockerfile, lock-файл и compose,
собираются из своей папки и не знают друг о друге на этапе сборки.

| | CMS | Web |
|---|---|---|
| Папка | `apps/cms` | `apps/web` |
| Compose Path | `./apps/cms/docker-compose.yml` | `./apps/web/docker-compose.yml` |
| Watch Paths | `apps/cms/**` | `apps/web/**` |
| Домен | `cms.otakuum.ru` (лейблы Traefik в compose) | `otakuum.ru` (+ `www`), вкладка Domains: Service Name `web`, порт `3000` |
| Внутреннее имя в сети | `movhub-cms:3000` | `movhub-web:3000` |
| Переменные | `apps/cms/dokploy.env.example` | `apps/web/dokploy.env.example` |

Зависимости: PostgreSQL и MinIO — отдельные сервисы того же проекта Dokploy (в стек не входят).

## Первая выкладка (порядок важен)

1. **CMS.** Create Service → **Compose** → Provider GitHub, ветка `master`, Compose Path `./apps/cms/docker-compose.yml`.
   Вкладка Environment — по `apps/cms/dokploy.env.example`. Домен в UI **не добавлять** (он в лейблах).
   Deploy. Миграции применятся сами; откройте `/admin` и создайте администратора.
2. **Web.** Create Service → **Compose** → Compose Path `./apps/web/docker-compose.yml`.
   Environment — по `apps/web/dokploy.env.example`. Вкладка Domains: `otakuum.ru`, Service Name `web`, Port `3000`, HTTPS.
   Deploy. Сайт собирается без CMS (при её недоступности страницы дорисуются по запросу), но поля данных он берёт из CMS —
   поэтому CMS должна быть выложена первой.
3. **Связка.** Один и тот же `REVALIDATE_SECRET` в обоих сервисах (`openssl rand -hex 32`),
   в CMS `REVALIDATE_URL=http://movhub-web:3000`. После правки контента в админке сайт обновляется сразу, а не через 60 секунд.
4. По желанию: в web `GRAPHQL_API_URL=http://movhub-cms:3000/api/graphql` — SSR ходит в CMS внутри сети, а не через интернет.

## Дальше: каждый сервис деплоится сам

Watch Paths (Advanced у Git-провайдера) — пуш, затронувший только `apps/web/**`, пересобирает только сайт, и наоборот.
Изменения, которые нужны обоим (контракт GraphQL), выкладывайте так: **сначала CMS, потом web**.

## Вместо Compose — Application

Create Service → Application → GitHub, Build Type **Dockerfile**:

- CMS: Dockerfile Path `apps/cms/Dockerfile`, Docker Context Path `apps/cms`, домен `cms.otakuum.ru`, порт `3000` — в UI.
- Web: Dockerfile Path `apps/web/Dockerfile`, Docker Context Path `apps/web`, домен `otakuum.ru`, порт `3000` — в UI.
  `NEXT_PUBLIC_*` и `S3_PUBLIC_URL` передавайте как **Build-time arguments** (по умолчанию в Dockerfile — боевые значения).

Если в вашей версии Dokploy пути к Dockerfile считаются от Build Path, поставьте Build Path `/apps/web` (или `/apps/cms`),
Dockerfile Path `Dockerfile`, Context `.`. В Application нет alias `movhub-*`: внутренний адрес — имя сервиса из карточки (App Name).

## Если что-то не так

- **Постеры не грузятся / 400 на `/_next/image`** — `S3_PUBLIC_URL` менялся без пересборки web: он вшивается при сборке (нужен Rebuild).
- **После входа выкидывает на /login** — не задан `COOKIE_DOMAIN=.otakuum.ru` в CMS.
- **Правки в админке видны через минуту** — не совпадают `REVALIDATE_SECRET` или неверен `REVALIDATE_URL` (смотрите `[revalidate]` в логах CMS).
- **Два сервиса с одним именем `web`/`cms` в dokploy-network** — обращайтесь по alias `movhub-web` / `movhub-cms`, а не по имени сервиса.
- **Не выкатывайте корневой `docker-compose.yml`** — он только для локальной разработки.
