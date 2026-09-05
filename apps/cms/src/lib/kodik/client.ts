/**
 * apps/cms/lib/kodik/client.ts
 *
 * Тонкий HTTP-клиент к Kodik API. Отдельно от логики импорта, чтобы:
 *  - в одном месте жили таймаут и повторные попытки при сетевых сбоях;
 *  - логику маппинга/апсерта можно было тестировать без реальных запросов.
 */

import type { KodikListResponse } from './types'

const KODIK_BASE_URL = 'https://kodik-api.com'

const REQUEST_TIMEOUT_MS = 15_000
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 500

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * fetch с таймаутом и повторными попытками при временных сбоях (5xx, обрыв сети).
 * 4xx (неверный токен, неверные параметры) не ретраятся — это не временная проблема.
 */
async function fetchWithRetry(url: string): Promise<KodikListResponse> {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)

      if (res.ok) return res.json()

      const body = await res.text()
      if (res.status >= 400 && res.status < 500) {
        // Ошибка запроса (например, невалидный токен) — повтор бессмыслен.
        throw new Error(`Kodik ответил ${res.status}: ${body}`)
      }
      lastError = new Error(`Kodik ответил ${res.status}: ${body}`)
    } catch (err) {
      clearTimeout(timeout)
      lastError = err as Error
    }

    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS * attempt) // линейный backoff
    }
  }

  throw lastError ?? new Error('Kodik request failed for an unknown reason')
}

function buildUrl(path: string, params: Record<string, string>): string {
  const url = new URL(`${KODIK_BASE_URL}${path}`)
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  return url.toString()
}

export function fetchKodikList(params: Record<string, string>): Promise<KodikListResponse> {
  return fetchWithRetry(buildUrl('/list', params))
}

export function fetchKodikSearch(params: Record<string, string>): Promise<KodikListResponse> {
  return fetchWithRetry(buildUrl('/search', params))
}

/**
 * next_page уже содержит все нужные query-параметры — Kodik просит не собирать
 * его вручную, потому что формат курсора может измениться (Kodik doc §6.2).
 */
export function fetchKodikNextPage(nextPageUrl: string): Promise<KodikListResponse> {
  return fetchWithRetry(nextPageUrl)
}
