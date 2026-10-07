import type { ContentItem } from "@/lib/types";
import { formatAge, isAgeGated } from "@/lib/age";
import { toPublicImageUrl } from "@/lib/image-url";

/** Безопасно вставляемый в <script> JSON (экранируем "<", чтобы нельзя было закрыть тег). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Микроразметка schema.org для страницы фильма/сериала. Для 18+ картинку не отдаём. */
export function contentJsonLd(item: ContentItem) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const path = item.type === "movie" ? "movie" : "series";
  const image = !isAgeGated(item.ageRating) ? toPublicImageUrl(item.poster?.url) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": item.type === "movie" ? "Movie" : "TVSeries",
    name: item.titleRu,
    alternateName: item.titleEn || undefined,
    url: `${base}/${path}/${item.slug}`,
    description: item.description || undefined,
    image,
    datePublished: item.releaseYear ? String(item.releaseYear) : undefined,
    genre: item.genres?.length ? item.genres : undefined,
    contentRating: formatAge(item.ageRating) ?? undefined,
    // aggregateRating намеренно не выводим: у нас нет настоящего числа оценок
    // (прежний ratingCount: 1 был выдуманным, а Google считает такую разметку
    // недостоверной и может наказать сайт).
  };
}
