// lib/graphql-client.ts
import { GraphQLClient } from "graphql-request";

/**
 * Браузерные запросы (вход, регистрация, профиль, избранное) идут на тот же
 * origin — /api/graphql (см. src/app/api/graphql/route.ts), а оттуда
 * проксируются в CMS. Поэтому:
 *  - адрес CMS не светится в браузере и не нужен в клиентском бандле;
 *  - cookie сессии выставляется для самого сайта (otakuum.ru), без CORS и
 *    зависимости от COOKIE_DOMAIN.
 *
 * Абсолютный URL нужен graphql-request, если клиент вдруг вызовут на сервере.
 */
const endpoint =
  typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/graphql`
    : `${window.location.origin}/api/graphql`;

export const gqlClient = new GraphQLClient(endpoint, {
  credentials: "same-origin",
});
