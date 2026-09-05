/**
 * apps/cms/lib/kodik/content.ts
 *
 * Апсерт одной записи Content (ТЗ §8.3) из материала Kodik, плюс запуск
 * импорта сезонов/эпизодов для сериалов. Это единственное место, где
 * пересекаются все остальные модули (mappers, genres, media, seasons).
 */

import type { Payload } from 'payload'
import type { ImportOptions, ImportReport, KodikMaterial } from './types'
import { mapContentType, pickTitleEn } from './mappers'
import { resolveGenreIds } from './genres'
import { attachPosterMedia } from './media'
import { upsertSeasons } from './seasons'

/** Находит существующую запись Content для апсерта: по kinopoiskId, если он есть, иначе по titleEn. */
async function findExistingContent(payload: Payload, material: KodikMaterial, titleEn: string) {
  const where = material.shikimori_id
    ? { shikimoriId: { equals: material.shikimori_id } }
    : { titleEn: { equals: titleEn } }

  const result = await payload.find({ collection: 'content', where, limit: 1 })
  return result.docs[0]
}

export async function upsertContentFromMaterial(
  payload: Payload,
  material: KodikMaterial,
  options: ImportOptions,
  report: ImportReport,
): Promise<void> {
  const contentType = mapContentType(material.type)
  if (!contentType) {
    report.skipped++
    return
  }

  const titleEn = pickTitleEn(material)
  const titleRu = material.material_data?.title || material.title
  const materialData = material.material_data

  const [existing, genreIds] = await Promise.all([
    findExistingContent(payload, material, titleEn),
    resolveGenreIds(payload, materialData?.genres || materialData?.all_genres),
  ])

  const data: Record<string, unknown> = {
    type: contentType,
    titleEn,
    titleRu,
    originalTitle: material.title_orig && material.title_orig !== titleEn ? material.title_orig : undefined,
    description: materialData?.description,
    releaseYear: materialData?.year || material.year,
    duration: contentType === 'movie' ? materialData?.duration : undefined,
    genres: genreIds,
    rating: materialData?.kinopoisk_rating || materialData?.imdb_rating || materialData?.shikimori_rating,
    shikimoriId: material.shikimori_id,
    kodikId: material.id,
    // Импортированный контент остаётся черновиком до проверки редактором —
    // гости и обычные пользователи видят только status: published (ТЗ §8.8).
    status: 'draft',
  }

  if (options.downloadImages && materialData?.poster_url) {
    data.poster = await attachPosterMedia(payload, materialData.poster_url)
  }

  if (options.dryRun) {
    existing ? report.updated++ : report.created++
    return
  }

  let contentDoc
  try {
    contentDoc = existing
      ? await payload.update({ collection: 'content', id: existing.id, data })
      : await payload.create({ collection: 'content', data })
    existing ? report.updated++ : report.created++
  } catch (err) {
    report.errors.push({ material: titleEn, error: (err as Error).message })
    return
  }

  if (contentType === 'series' && options.importEpisodes && material.seasons) {
    await upsertSeasons(payload, contentDoc.id, material.seasons, material.year)
  }
}
