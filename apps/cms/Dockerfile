# syntax=docker/dockerfile:1
#
# [Dokploy] Production-образ Payload CMS (Next.js standalone) для Dokploy.
# Требует `output: 'standalone'` в next.config.ts (уже включено).
#
# Контекст сборки — apps/cms/ (Dockerfile лежит рядом с next.config.ts).
# Все COPY копируют файлы из apps/cms/ в /app/ — пути плоские.
#
# Сборка через --webpack: turbopack.root в next.config.ts (path.resolve(__dirname, '../../'))
# ломает поиск src/app/ внутри Docker — Turbopack ищет относительно монорепо-root.
# Webpack игнорирует turbopack.root и корректно находит src/app/ автоматически.

ARG NODE_VERSION=22
ARG PNPM_VERSION=10.34.5

# ─────────────────────────────────────────────
# base: общая основа (Node + pnpm)
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
# libc6-compat нужен нативным зависимостям (sharp и др.) на Alpine (musl).
RUN apk add --no-cache libc6-compat \
  && npm install -g pnpm@${PNPM_VERSION}
ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────
# builder: зависимости + сборка Next.js
#
# Зависимости ставятся В ЭТОЙ ЖЕ стадии (а не копируются из отдельной `deps`):
# node_modules у Payload — десятки тысяч файлов-симлинков, и COPY --from между
# стадиями занимал ~18 с на каждой сборке. Слой с install по-прежнему кэшируется,
# пока не менялись package.json / pnpm-lock.yaml / pnpm-workspace.yaml.
#
# Runtime-переменные (DATABASE_URL, S3_*, PAYLOAD_SECRET, ...) для сборки
# НЕ нужны: на этом этапе к БД никто не обращается, а S3-конфиг использует
# заглушки (см. src/lib/storage/s3.ts). Они подставляются при запуске контейнера.
# ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Копируем файлы для установки зависимостей.
# pnpm-lock.yaml и pnpm-workspace.yaml лежат в apps/cms/ (в контексте сборки).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --prefer-offline

# Копируем весь исходный код приложения (src/app/, src/payload.config.ts, и т.д.)
COPY . .

# Папка public может отсутствовать в репозитории — runner копирует её целиком.
RUN mkdir -p ./public

# Лимит heap для сборки. 8192 в package.json рассчитан на сервер с 8+ ГБ RAM;
# на меньшем сборка уходит в swap и «зависает» — уменьшите (например, 3072).
ARG BUILD_MEMORY_MB=4096
# --webpack: обходим Turbopack, у которого turbopack.root ломает пути в Docker.
# Кэш Next.js между деплоями: повторная сборка заметно быстрее.
RUN --mount=type=cache,id=next-cache-cms,target=/app/.next/cache \
  pnpm exec cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=${BUILD_MEMORY_MB}" next build --webpack

# ─────────────────────────────────────────────
# runner: минимальный образ для запуска
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

WORKDIR /app

# standalone-сборка целиком. Контекст — apps/cms/, поэтому server.js
# оказывается в /app/.next/standalone/server.js (без вложенности apps/cms/).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Статика и public — рядом с server.js.
# Next.js ищет .next/static и public относительно server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# start-period с запасом: при первом старте применяются миграции.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/health" || exit 1

# server.js создаётся next build (output: 'standalone') и лежит в /app/server.js
# после COPY --from=builder /app/.next/standalone ./
CMD ["node", "server.js"]
