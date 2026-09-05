/**
 * apps/cms/endpoints/kodik-import.ts
 *
 * POST /api/import/kodik — импорт аниме-каталога из Kodik API в
 * коллекции Content / Genres / Seasons / Episodes (ТЗ §8).
 *
 * Сам файл — только HTTP-обвязка: разбор запроса, проверка доступа,
 * обход страниц Kodik и сборка отчёта. Вся бизнес-логика вынесена в
 * apps/cms/lib/kodik/* — см. эти файлы для деталей.
 *
 * Подключение и примеры запросов — в KODIK_IMPORT.md.
 */

import type { Endpoint, PayloadRequest } from 'payload'
import { checkRole } from '../access/checkRole' // используется во всех коллекциях, см. ТЗ §8.8
import { fetchKodikList, fetchKodikNextPage, fetchKodikSearch } from '../lib/kodik/client'
import { DEFAULT_KODIK_TYPES } from '../lib/kodik/mappers'
import { upsertContentFromMaterial } from '../lib/kodik/content'
import { createEmptyReport, type ImportOptions, type KodikImportRequestBody } from '../lib/kodik/types'

const KODIK_TOKEN = process.env.KODIK_API_TOKEN

async function runListImport(payload: any, body: KodikImportRequestBody, options: ImportOptions) {
  const report = createEmptyReport()

  const params: Record<string, string> = {
    token: KODIK_TOKEN!,
    limit: '100',
    with_material_data: 'true',
    // По умолчанию просим у Kodik только аниме — без этого пришлось бы
    // пролистывать весь каталог и на каждой странице отбрасывать лишнее.
    types: body.types || DEFAULT_KODIK_TYPES,
  }
  if (body.year) params.year = String(body.year)
  if (options.importEpisodes) params.with_episodes_data = 'true'

  const maxPages = body.maxPages ?? 1 // защита от случайного обхода всей базы за один вызов
  let response = await fetchKodikList(params)
  let page = 1

  while (true) {
    for (const material of response.results) {
      await upsertContentFromMaterial(payload, material, options, report)
    }
    if (!response.next_page || page >= maxPages) break
    response = await fetchKodikNextPage(response.next_page)
    page++
  }

  return report
}

async function runSearchImport(payload: any, body: KodikImportRequestBody, options: ImportOptions) {
  if (!body.title && !body.shikimoriId) {
    throw new BadRequestError('mode=search requires "title" or "shikimoriId"')
  }

  const report = createEmptyReport()
  const params: Record<string, string> = { token: KODIK_TOKEN!, with_material_data: 'true' }
  if (body.title) params.title = body.title
  if (body.shikimoriId) params.shikimori_id = body.shikimoriId
  if (options.importEpisodes) params.with_episodes_data = 'true'

  const response = await fetchKodikSearch(params)
  for (const material of response.results) {
    await upsertContentFromMaterial(payload, material, options, report)
  }

  return report
}

class BadRequestError extends Error {}

export const kodikImportEndpoint: Endpoint = {
  path: '/import/kodik',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    // Импорт доступен тем же ролям, что и CRUD каталога (ТЗ §8.8).
    if (!checkRole(['admin', 'editor'], req.user)) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (!KODIK_TOKEN) {
      return Response.json({ error: 'KODIK_API_TOKEN is not configured on the server' }, { status: 500 })
    }

    const body = ((await req.json?.()) || {}) as KodikImportRequestBody
    const options: ImportOptions = {
      downloadImages: body.downloadImages ?? false,
      importEpisodes: body.importEpisodes ?? true,
      dryRun: body.dryRun ?? false,
    }

    try {
      const report =
        body.mode === 'search'
          ? await runSearchImport(req.payload, body, options)
          : await runListImport(req.payload, body, options)

      return Response.json({ ok: true, report })
    } catch (err) {
      if (err instanceof BadRequestError) {
        return Response.json({ error: err.message }, { status: 400 })
      }
      return Response.json({ error: 'Import failed', message: (err as Error).message }, { status: 502 })
    }
  },
}
