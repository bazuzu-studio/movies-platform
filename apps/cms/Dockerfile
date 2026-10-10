# syntax=docker/dockerfile:1
#
# [Dokploy] Production-образ Payload CMS (Next.js standalone) для Dokploy.
# Требует `output: 'standalone'` в next.config.ts (уже включено).
# Основан на https://github.com

ARG NODE_VERSION=22
ARG PNPM_VERSION=10.34.5

# ─────────────────────────────────────────────
# base: общая основа (Node + pnpm)
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION

# Переключаемся на официальное зеркало Yandex для обхода проблем с TLS
RUN sed -i 's/dl-cdn.alpinelinux.org/mirror.yandex.ru/g' /etc/apk/repositories \
  && apk add --no-cache libc6-compat \
  && npm install -g pnpm@\${PNPM_VERSION}

ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────
# builder: зависимости + сборка Next.js
# ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --prefer-offline

COPY . .
# Папка public может отсутствовать в репозитории — runner копирует её целиком.
RUN mkdir -p public

# Лимит heap для сборки.
ARG BUILD_MEMORY_MB=4096
# Сборщик: turbopack или webpack.
ARG NEXT_BUNDLER=turbopack
# SKIP_TYPECHECK=true пропускает проверку типов в `next build`
ARG SKIP_TYPECHECK=false
ENV SKIP_TYPECHECK=\${SKIP_TYPECHECK}

# Кэш Next/Turbopack между деплоями: повторная сборка заметно быстрее.
RUN --mount=type=cache,id=next-cache-cms,target=/app/.next/cache \
  sh -c 'start=\$(date +%s); \
    flag=""; [ "\$NEXT_BUNDLER" = "webpack" ] && flag="--webpack"; \
    pnpm exec cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=\${BUILD_MEMORY_MB}" next build \$flag \
    && echo "build took \$(( \((date +\%s) - start ))s (bundler:\)NEXT_BUNDLER)"'

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

# standalone-сборка + статика.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# start-period с запасом: при первом старте применяются миграции.
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:\${PORT}/api/health" || exit 1

# server.js создаётся `next build` (output: 'standalone')
CMD ["node", "server.js"]
