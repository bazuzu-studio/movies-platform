/**
 * Базовый URL CMS (apps/cms) для запросов к её REST-endpoint'ам напрямую
 * из браузера (в отличие от GraphQL-клиента в graphql-client.ts).
 *
 * Только NEXT_PUBLIC_GRAPHQL_API_URL: код исполняется на клиенте, поэтому
 * внутренний GRAPHQL_API_URL (адрес CMS в приватной docker-сети, недоступный
 * из браузера) здесь не подходит — в отличие от src/lib/api.ts, который
 * ходит в CMS с сервера при SSR.
 *
 * Намеренно не заводим отдельную переменную окружения под сам origin:
 * NEXT_PUBLIC_GRAPHQL_API_URL и так уже указывает на `<cms>/api/graphql` —
 * просто отрезаем это окончание.
 */

const GRAPHQL_SUFFIX_RE = /\/api\/graphql\/?$/;

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? "http://localhost:4000/api/graphql";

export const cmsBaseUrl = graphqlEndpoint.replace(GRAPHQL_SUFFIX_RE, "");

/** Полный URL endpoint'а формы обратной связи на CMS (см. ContactClient.tsx). */
export const contactMessageEndpointUrl = `${cmsBaseUrl}/api/contact-message`;
