# syntax=docker/dockerfile:1
#
# [Dokploy] Production-образ Payload CMS (Next.js standalone) для Dokploy.
# Требует `output: 'standalone'` в next.config.ts (уже включено).
# Основан на https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

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

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --prefer-offline

COPY . .
# Папка public может отсутствовать в репозитории — runner копирует её целиком.
RUN mkdir -p public

# Лимит heap для сборки. 8192 в package.json рассчитан на сервер с 8+ ГБ RAM;
# на меньшем сборка уходит в swap и «зависает» — уменьшите (например, 3072).
ARG BUILD_MEMORY_MB=4096
# Кэш Next/Turbopack между деплоями: повторная сборка заметно быстрее.
RUN --mount=type=cache,id=next-cache-cms,target=/app/.next/cache \
  pnpm exec cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=${BUILD_MEMORY_MB}" next build

# ─────────────────────────────────────────────
# runner: минимальный образ для запуска
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Каталог для кэша Next.js (пререндер, оптимизация изображений)
RUN mkdir .next && chown nextjs:nodejs .next

# standalone-сборка + статика. Миграции БД применяются самим приложением
# при старте (prodMigrations в src/payload.config.ts).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# start-period с запасом: при первом старте применяются миграции.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/health" || exit 1

# server.js создаётся `next build` (output: 'standalone')
CMD ["node", "server.js"]
