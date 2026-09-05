/**
 * apps/cms/lib/kodik/seasons.ts
 *
 * Апсерт Seasons/Episodes (ТЗ §8.4, §8.5) из поля seasons ответа Kodik
 * (доступно при with_seasons / with_episodes / with_episodes_data,
 * см. Kodik doc §3, §4.2).
 */

import type { Payload } from 'payload'
import type { KodikEpisodeEntry, KodikSeasonEntry } from './types'

async function findOrCreateSeason(payload: Payload, contentId: string, seasonNumber: number, fallbackYear?: number) {
  const existing = await payload.find({
    collection: 'seasons',
    where: { and: [{ content: { equals: contentId } }, { seasonNumber: { equals: seasonNumber } }] },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0]

  return payload.create({
    collection: 'seasons',
    data: { content: contentId, seasonNumber, releaseYear: fallbackYear },
  })
}

/**
 * Создаёт недостающие эпизоды сезона. Существующие номера эпизодов
 * запрашиваются одним find на весь сезон (а не по одному на эпизод) —
 * при сериале на 100+ серий это заметно быстрее.
 */
async function createMissingEpisodes(
  payload: Payload,
  seasonId: string,
  episodes: Record<string, string | KodikEpisodeEntry>,
) {
  const episodeEntries = Object.entries(episodes)
  if (episodeEntries.length === 0) return

  const existing = await payload.find({
    collection: 'episodes',
    where: { season: { equals: seasonId } },
    limit: episodeEntries.length,
  })
  const existingNumbers = new Set(existing.docs.map((doc: any) => doc.episodeNumber))

  const toCreate = episodeEntries.filter(([numberStr]) => !existingNumbers.has(Number(numberStr)))
  if (toCreate.length === 0) return

  await Promise.all(
    toCreate.map(([numberStr, entry]) => {
      const episodeNumber = Number(numberStr)
      const title = typeof entry === 'string' ? undefined : entry.title
      return payload.create({
        collection: 'episodes',
        data: {
          season: seasonId,
          episodeNumber,
          title: title || `Серия ${episodeNumber}`,
        },
      })
    }),
  )
}

export async function upsertSeasons(
  payload: Payload,
  contentId: string,
  seasons: Record<string, KodikSeasonEntry>,
  fallbackYear?: number,
) {
  for (const [seasonNumberStr, seasonData] of Object.entries(seasons)) {
    const season = await findOrCreateSeason(payload, contentId, Number(seasonNumberStr), fallbackYear)
    if (seasonData.episodes) {
      await createMissingEpisodes(payload, season.id, seasonData.episodes)
    }
  }
}
