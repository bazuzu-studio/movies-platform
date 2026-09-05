/**
 * apps/cms/lib/kodik/media.ts
 *
 * Скачивание постера по poster_url из material_data и загрузка его в
 * коллекцию Media (файлы уходят в MinIO S3 через встроенный upload
 * Payload — см. ТЗ §6.3, §8.7).
 */

import type { Payload } from 'payload'

const MAX_POSTER_SIZE_BYTES = 10 * 1024 * 1024 // 10 МБ — разумный предел для постера

/**
 * Возвращает id созданной записи Media, либо undefined, если постер
 * недоступен или не прошёл проверки — ошибка здесь не должна прерывать
 * импорт самого материала, постер всегда можно добавить вручную позже.
 */
export async function attachPosterMedia(payload: Payload, posterUrl?: string): Promise<string | undefined> {
  if (!posterUrl) return undefined

  try {
    const res = await fetch(posterUrl)
    if (!res.ok) return undefined

    const contentLength = Number(res.headers.get('content-length') ?? 0)
    if (contentLength > MAX_POSTER_SIZE_BYTES) return undefined

    const arrayBuffer = await res.arrayBuffer()
    if (arrayBuffer.byteLength > MAX_POSTER_SIZE_BYTES) return undefined

    const filename = posterUrl.split('/').pop()?.split('?')[0] || `poster-${Date.now()}.jpg`

    const media = await payload.create({
      collection: 'media',
      data: { alt: filename },
      file: {
        data: Buffer.from(arrayBuffer),
        mimetype: res.headers.get('content-type') || 'image/jpeg',
        name: filename,
        size: arrayBuffer.byteLength,
      },
    })

    return media.id
  } catch {
    // Сеть недоступна, битая ссылка и т.д. — не фатально для импорта материала.
    return undefined
  }
}
