/**
 * apps/cms/lib/kodik/genres.ts
 *
 * Резолвинг жанров Kodik в id записей коллекции Genres (ТЗ §8.2).
 * Сделано одним batched-запросом на материал вместо find-запроса на
 * каждый жанр отдельно — при среднем материале с 3–5 жанрами это в
 * несколько раз меньше обращений к БД при массовом импорте.
 */

import type { Payload } from 'payload'
import { slugify } from './mappers'

export async function resolveGenreIds(payload: Payload, genreNames: string[] = []): Promise<string[]> {
  const uniqueNames = Array.from(new Set(genreNames.map((name) => name.trim()).filter(Boolean)))
  if (uniqueNames.length === 0) return []

  const slugToName = new Map(uniqueNames.map((name) => [slugify(name), name]))
  const slugs = Array.from(slugToName.keys())

  // 1. Одним запросом находим все уже существующие жанры из списка.
  const existing = await payload.find({
    collection: 'genres',
    where: { slug: { in: slugs } },
    limit: slugs.length,
  })

  const foundSlugs = new Set(existing.docs.map((doc: any) => doc.slug))
  const missingSlugs = slugs.filter((slug) => !foundSlugs.has(slug))

  // 2. Создаём только те жанры, которых ещё нет — параллельно, их обычно немного.
  const created = await Promise.all(
    missingSlugs.map((slug) =>
      payload.create({
        collection: 'genres',
        data: { title: slugToName.get(slug)!, slug },
      }),
    ),
  )

  return [...existing.docs, ...created].map((doc: any) => doc.id)
}
