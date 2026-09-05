/**
 * Заглушка API-слоя.
 *
 * Сейчас все функции читают из мок-данных (lib/data.ts) синхронно/асинхронно —
 * так же, как позже они будут читать из Payload CMS. Когда backend (apps/cms)
 * будет готов, меняется только тело функций в этом файле; компоненты и
 * страницы, которые их вызывают, трогать не нужно.
 *
 * Соответствие функций эндпоинтам из ТЗ (раздел 9):
 *   getContentList()     → GET /api/content
 *   getContentBySlug()   → GET /api/content/:id (или ?where[slug][equals])
 *   getGenres()          → GET /api/genres
 *   login()/register()   → POST /api/users/login, POST /api/users
 *   getFavorites()       → GET /api/favorites
 *   toggleFavorite()     → POST/DELETE /api/favorites
 */

import { ALL_CONTENT, GENRES, getContentBySlug as findBySlug, getSimilar } from "./data";
import type { ContentItem, Genre } from "./types";

import { GraphQLClient } from 'graphql-request'
import { GetContentDocument } from '@/generated/graphql'


const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL ?? 'http://localhost:4000/api/graphql'

/**
 * Отдельный клиент для server-side запросов публичного контента.
 * credentials здесь не нужны — GetContentDocument не требует авторизации,
 * в отличие от избранного/профиля, которые идут через gqlClient
 * из lib/graphql-client.ts (с credentials: 'include' для браузера).
 */
const serverClient = new GraphQLClient(endpoint)

export async function getContentList(): Promise<ContentItem[]> {
  const data = await serverClient.request(GetContentDocument)
  return data.Contents.docs as ContentItem[]
}

export async function getContentBySlug(slug: string): Promise<ContentItem | undefined> {
  // TODO: заменить на fetch(`${API_BASE}/api/content?where[slug][equals]=${slug}`)
  return findBySlug(slug);
}

export async function getGenres(): Promise<Genre[]> {
  // TODO: заменить на fetch(`${API_BASE}/api/genres`)
  return GENRES;
}

export async function getSimilarContent(item: ContentItem, limit = 5): Promise<ContentItem[]> {
  return getSimilar(item, limit);
}

export { endpoint };
