
// app/page.tsx

import type { Metadata } from 'next'
import { GraphQLClient } from 'graphql-request'
import { GetContentDocument } from '@/generated/graphql'
import { HomeClient } from '@/components/pages/HomeClient'

/**
 * Metadata страницы.
 *
 * TODO:
 * - Добавить description
 * - Добавить Open Graph / Twitter metadata
 * - В будущем можно сделать динамический title
 */
export const metadata: Metadata = {
  title: 'Главная',
}

/**
 * GraphQL client для связи Next.js → Payload CMS.
 *
 * Сейчас URL указан напрямую для локальной разработки.
 *
 * TODO:
 * - Перенести URL в NEXT_PUBLIC_API_URL
 * - Вынести GraphQLClient в отдельный файл
 *   (например: lib/graphql/client.ts)
 * - В production использовать переменную окружения
 */
const client = new GraphQLClient(
  'http://localhost:4000/api/graphql'
)

export default async function HomePage() {
  /**
   * Запрос к Payload CMS через GraphQL.
   *
   * GetContentDocument генерируется GraphQL Code Generator
   * на основе .graphql-запроса.
   *
   * Цепочка:
   *
   * GraphQL schema
   *      ↓
   * Codegen
   *      ↓
   * GetContentDocument
   *      ↓
   * GraphQLClient
   *      ↓
   * Payload CMS
   */
  const data = await client.request(GetContentDocument)

  /**
   * Временный лог для проверки подключения.
   *
   * TODO:
   * - Удалить после завершения интеграции
   * - Не логировать большие ответы API в production
   */
  // console.log(
  //   'GraphQL:',
  //   JSON.stringify(data, null, 2)
  // )

  /**
   * Получаем список контента из Payload.
   *
   * TODO:
   * - Добавить обработку ошибок
   * - Добавить loading/error state при необходимости
   * - Проверить типизацию Contents.docs после настройки
   *   всех GraphQL-полей
   */
  const all = data.Contents.docs

  /**
   * Выбираем контент для Hero-блока.
   *
   * Сейчас в качестве Hero приоритетно используется сериал.
   * Если сериалов нет — берём первый элемент.
   *
   * TODO:
   * - Лучше добавить отдельное поле для Hero в CMS
   * - Или использовать rating / popularity / featured
   * - Убрать `any` после полной настройки GraphQL-типов
   */
  const heroItem =
    all.find(
      (content: any) => content.type === 'series'
    ) ?? all[0]

  /**
   * Передаём данные в клиентский компонент.
   *
   * Page остаётся Server Component:
   * - получает данные с CMS на сервере
   * - не отправляет GraphQL client в браузер
   * - передаёт готовые данные в HomeClient
   */
  return (
    <HomeClient
      heroItem={heroItem}
      all={all}
    />
  )
}

