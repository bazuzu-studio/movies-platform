// lib/query-client.ts
import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 минута
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  // `isServer` — официальный экспорт @tanstack/react-query (замена
  // несуществующего `environmentManager.isServer()`, который ломал сборку:
  // "Module '@tanstack/react-query' has no exported member 'environmentManager'").
  if (isServer) {
    // На сервере: всегда новый клиент (иначе утечка данных между запросами)
    return makeQueryClient()
  } else {
    // В браузере: создаём один раз и переиспользуем
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}