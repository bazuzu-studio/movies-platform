# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────
# Base: установка Node.js и pnpm
# ─────────────────────────────────────────────
FROM node:22-alpine AS base
ARG PNPM_VERSION=10.34.5

RUN npm install -g pnpm@${PNPM_VERSION}
ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────
# Builder: сборка проекта
# ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Копируем основные файлы для установки зависимостей
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Монтируем кеш pnpm
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prefer-offline

# Копируем весь проект
COPY . .

# Создаём публичную папку (если её нет)
RUN mkdir -p public

# Сборка Next.js с лимитом памяти
ARG BUILD_MEMORY_MB=4096
RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
    pnpm exec cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=${BUILD_MEMORY_MB}" next build

# ─────────────────────────────────────────────
# Runner: финальный образ для запуска
# ─────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Монтируем кеш для статических файлов
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Копируем standalone сборку и статические файлы
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/health" || exit 1

# Запуск сервера
CMD ["node", "server.js"]
