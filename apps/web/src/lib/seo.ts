import type { Metadata } from "next";
import { formatAge, isAgeGated } from "@/lib/age";
import { toPublicImageUrl } from "@/lib/image-url";
import type { ContentItem } from "@/lib/types";

const DESCRIPTION_MAX = 200;

/**
 * Metadata страницы фильма/сериала. Приоритет — SEO-поля из CMS (content.meta,
 * заполняются пайплайном и редакторами), затем данные самого тайтла.
 *
 * Для 18+ картинку и ссылку на плеер в метаданные не отдаём.
 */
export function buildContentMetadata(item: ContentItem): Metadata {
  const path = item.type === "movie" ? "movie" : "series";
  const gated = isAgeGated(item.ageRating);
  const age = formatAge(item.ageRating);

  const title = item.seo?.title || item.titleRu;
  const description =
    item.seo?.description || (item.description ? item.description.slice(0, DESCRIPTION_MAX) : undefined);
  // OG-картинка должна быть публичной: внутренний адрес MinIO краулеры не откроют.
  const imageUrl = toPublicImageUrl(item.seo?.imageUrl || item.backdrop?.url || item.poster?.url || undefined);
  const images = !gated && imageUrl ? [{ url: imageUrl }] : undefined;
  const ogTitle = item.seo?.title || `${item.titleRu} (${item.releaseYear})`;

  return {
    title,
    description,
    // Относительный путь: metadataBase задан в корневом layout.
    alternates: { canonical: `/${path}/${item.slug}` },
    other: age ? { rating: age } : undefined,
    openGraph: {
      title: ogTitle,
      description,
      url: `/${path}/${item.slug}`,
      images,
      type: item.type === "movie" ? "video.movie" : "video.tv_show",
      videos:
        !gated && item.type === "movie" && item.playerLink ? [{ url: item.playerLink }] : undefined,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      images: images?.map((i) => i.url),
    },
  };
}
