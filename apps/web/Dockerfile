# syntax=docker/dockerfile:1
FROM node:22-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
ARG PNPM_VERSION=10.34.5
RUN npm install -g pnpm@${PNPM_VERSION}
WORKDIR /app

# ---------- зависимости ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
# --frozen-lockfile: сборка образа ставит ровно те версии, что проверил CI.
RUN --mount=type=cache,id=pnpm-store-web,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---------- сборка ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* вшиваются в клиентский бандл при сборке — их нужно передать как build args
# Значения по умолчанию — боевые, чтобы сервис типа Application собирался и без
# Build-аргументов; для другого домена переопределите их в Dokploy.
ARG NEXT_PUBLIC_SITE_URL=https://otakuum.ru
ARG NEXT_PUBLIC_GRAPHQL_API_URL=https://cms.otakuum.ru/api/graphql
# S3_PUBLIC_URL / S3_INTERNAL_URL нужны именно при сборке: из них next.config.mjs
# собирает images.remotePatterns, а они вшиваются в образ.
ARG S3_PUBLIC_URL=https://s3.otakuum.ru/media
ARG S3_INTERNAL_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GRAPHQL_API_URL=$NEXT_PUBLIC_GRAPHQL_API_URL \
    S3_PUBLIC_URL=$S3_PUBLIC_URL \
    S3_INTERNAL_URL=$S3_INTERNAL_URL

# Типы GraphQL: лучше закоммитить src/generated/graphql.ts (pnpm codegen локально
# против запущенной локально CMS). Если файла нет, пробуем сгенерировать из CMS,
# но в production интроспекция в CMS выключена по умолчанию (включается
# переменной GRAPHQL_INTROSPECTION=true), поэтому это только запасной вариант.
RUN if [ ! -f src/generated/graphql.ts ]; then \
      echo "src/generated/graphql.ts не найден — запускаю codegen"; \
      pnpm codegen || { echo "ОШИБКА: codegen не сработал (интроспекция в CMS выключена?). Выполните 'pnpm codegen' локально и закоммитьте src/generated/graphql.ts"; exit 1; }; \
    fi
RUN pnpm build

# ---------- рантайм ----------
FROM node:22-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
RUN useradd --create-home --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000

# Нужен и для сервиса типа Application (там compose-healthcheck не действует).
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
