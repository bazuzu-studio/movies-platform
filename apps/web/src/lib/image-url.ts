/**
 * Адреса картинок из S3/MinIO.
 *
 * CMS отдаёт публичные URL (S3_PUBLIC_URL). Если задан S3_INTERNAL_URL
 * (локальная разработка в docker-сети, где `localhost:9000` из контейнера
 * недоступен), серверный код подменяет их на внутренние, чтобы next/image мог
 * скачать файл. Для внешних потребителей (Open Graph, JSON-LD, соцсети)
 * внутренний адрес бесполезен — для них используйте toPublicImageUrl().
 */

const trimSlash = (value: string) => value.replace(/\/+$/, "");

/** Публичный URL -> внутренний (только если задан S3_INTERNAL_URL). */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("/")) return url; // относительные пути не трогаем

  const internal = process.env.S3_INTERNAL_URL?.trim();
  const publicUrl = process.env.S3_PUBLIC_URL?.trim();
  if (!internal) return url;

  if (publicUrl) {
    const fromBase = trimSlash(publicUrl);
    if (url.startsWith(fromBase)) return trimSlash(internal) + url.slice(fromBase.length);
  }

  try {
    const parsed = new URL(url);
    const internalParsed = new URL(internal);
    parsed.protocol = internalParsed.protocol;
    parsed.hostname = internalParsed.hostname;
    parsed.port = internalParsed.port;
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Внутренний URL -> публичный: для OG-метатегов и микроразметки. */
export function toPublicImageUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;

  const internal = process.env.S3_INTERNAL_URL?.trim();
  const publicUrl = process.env.S3_PUBLIC_URL?.trim();
  if (internal && publicUrl) {
    const fromBase = trimSlash(internal);
    if (url.startsWith(fromBase)) return trimSlash(publicUrl) + url.slice(fromBase.length);
  }
  return url;
}
