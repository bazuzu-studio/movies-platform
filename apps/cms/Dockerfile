
ARG NODE_VERSION=22
ARG PNPM_VERSION=10.34.5

# ─────────────────────────────────────────────
# base
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Установка libc6-compat и pnpm одной командой для уменьшения количества слоев
RUN apk add --no-cache libc6-compat && npm install -g pnpm@\${PNPM_VERSION}

# ─────────────────────────────────────────────
# builder
# ─────────────────────────────────────────────
FROM base AS builder
# Next.js может требовать наличие public даже если папка пустая
RUN mkdir -p public

# Копируем конфигурационные файлы для установки зависимостей
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

# В pnpm v10+ для `--frozen-lockfile` в CI/Docker рекомендуется использовать pnpm fetch или правильный путь к кэшу
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Память для Next.js build
ARG BUILD_MEMORY_MB=4096

# Production standalone build с использованием кэша Next.js
RUN --mount=type=cache,id=next-cache-cms,target=/app/.next/cache \
    NODE_OPTIONS="--no-deprecation --max-old-space-size=\${BUILD_MEMORY_MB}" pnpm exec next build

# Критическая проверка генерации standalone режима
RUN test -f /app/.next/standalone/server.js || (echo "ERROR: .next/standalone/server.js was not generated" && echo "Check next.config.ts: output must be 'standalone'" && exit 1)

# ─────────────────────────────────────────────
# runner
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
WORKDIR /app

# Копируем standalone сборку (она уже содержит node_modules внутри себя)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# Исправлен синтаксис URL (удалена разметка ссылки из Markdown)
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD wget -q -O /dev/null "http://127.0.0.1:\${PORT}/" || exit 1

CMD ["node", "server.js"]
