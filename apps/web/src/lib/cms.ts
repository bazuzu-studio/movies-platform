/**
 * Базовый URL CMS для серверных (Next route handlers) запросов к её
 * REST-endpoint'ам. Берётся из GRAPHQL_API_URL (внутренний адрес в
 * docker-сети) или NEXT_PUBLIC_GRAPHQL_API_URL — просто отрезаем
 * окончание `/api/graphql`.
 *
 * Браузер к CMS напрямую не обращается: все клиентские запросы идут через
 * /api/graphql и /api/contact этого же сайта. Модуль нельзя импортировать
 * из клиентских компонентов.
 */

const GRAPHQL_SUFFIX_RE = /\/api\/graphql\/?$/;

const graphqlEndpoint =
  process.env.GRAPHQL_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
  "http://localhost:4000/api/graphql";

export const cmsBaseUrl = graphqlEndpoint.replace(GRAPHQL_SUFFIX_RE, "");

/** Полный URL endpoint'а формы обратной связи на CMS. */
export const contactMessageEndpointUrl = `${cmsBaseUrl}/api/contact-message`;
