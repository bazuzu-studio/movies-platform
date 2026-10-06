# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
ARG PNPM_VERSION=10.34.5

# ─────────────────────────────────────────────
# base
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION
RUN apk add --no-cache libc6-compat \
  && npm install -g pnpm@${PNPM_VERSION}
ENV NEXT_TELEMETRY_DISABLED=1

# ─────────────────────────────────────────────
# builder
# ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile --prefer-offline

COPY . .
RUN mkdir -p public

ARG BUILD_MEMORY_MB=4096
RUN --mount=type=cache,id=next-cache-cms,target=/app/.next/cache \
  pnpm exec cross-env NODE_OPTIONS="--no-deprecation --max-old-space-size=${BUILD_MEMORY_MB}" next build

# ─────────────────────────────────────────────
# runner
# ─────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

WORKDIR /app

# Копируем standalone целиком — в монорепозитории внутри будет apps/cms/server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Статику и public кладём туда, где их ищет server.js — в apps/cms/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./apps/cms/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./apps/cms/public

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/api/health" || exit 1

# В монорепозитории server.js лежит в apps/cms/
WORKDIR /app/apps/cms
CMD ["node", "server.js"]
