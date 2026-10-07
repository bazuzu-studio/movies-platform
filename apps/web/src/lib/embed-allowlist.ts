/**
 * Список разрешённых хостов для iframe-эмбедов.
 * Любой домен, не входящий в список, рендерить нельзя.
 */
// ВАЖНО: этот список должен совпадать со списком доменов в директиве
// frame-src в next.config.mjs (CSP) — иначе браузер заблокирует iframe
// даже для домена, прошедшего проверку здесь.
export const ALLOWED_EMBED_HOSTS: readonly string[] = [
  'kodikplayer.com',
  'embed.kinobox.ru',
  'video.collabs.ru',
  // добавляйте по мере подключения провайдеров — и синхронно
  // обновляйте frame-src в app/web/next.config.mjs
];

/**
 * Безопасно парсит URL и проверяет домен по allowlist.
 * Возвращает null, если URL некорректен или домен не разрешён.
 *
 * Поддерживает:
 * - protocol-relative: //kodikplayer.com/seria/...
 * - без схемы: kodikplayer.com/seria/...
 * - со схемой http/https (http поднимается до https); остальные схемы отклоняются
 */
export function getSafeEmbedUrl(rawUrl: string | undefined | null): string | null {
  if (!rawUrl) return null;

  try {
    let urlString = rawUrl.trim();

    // Protocol-relative: //kodikplayer.com/seria/... → https://kodikplayer.com/seria/...
    if (urlString.startsWith('//')) {
      urlString = 'https:' + urlString;
    }

    // Если нет схемы вообще (kodikplayer.com/...), добавляем https://
    if (!/^[a-z]+:\/\//i.test(urlString)) {
      urlString = 'https://' + urlString;
    }

    const url = new URL(urlString);

    // Только http(s). Без этой проверки `javascript://kodikplayer.com/%0aalert(1)`
    // проходил по hostname и попадал в src iframe (sandbox с allow-same-origin
    // исполнил бы код в контексте сайта). http принудительно поднимаем до https:
    // иначе плеер блокируется как mixed content.
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    url.protocol = 'https:';

    // Точное совпадение hostname
    if (!ALLOWED_EMBED_HOSTS.includes(url.hostname)) return null;

    return url.toString();
  } catch {
    return null;
  }
}
