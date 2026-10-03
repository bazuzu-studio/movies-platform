import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getContentList,
  getSimilarContent,
} from "@/lib/api";
import { MovieDetailClient } from "@/components/pages/MovieDetailClient";
import { formatAge, isAgeGated } from "@/lib/age";
import { contentJsonLd, jsonLdString } from "@/lib/jsonld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Сборка не должна зависеть от доступности CMS: при ошибке страницы
  // просто рендерятся по запросу (dynamicParams по умолчанию включён).
  try {
    const { items } = await getContentList(1, 100);

    return items
      .filter((content) => content.type === "movie")
      .map((content) => ({
        slug: content.slug,
      }));
  } catch (error) {
    console.error("generateStaticParams(movie): CMS недоступен, пропускаем", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getContentBySlug(slug);

  if (!movie || movie.type !== "movie") {
    return {};
  }

  // Description приходит из richText-поля CMS
  // и может быть пустым или слишком длинным.
  const description = movie.description
    ? movie.description.slice(0, 200)
    : undefined;

  const gated = isAgeGated(movie.ageRating);
  const age = formatAge(movie.ageRating);

  return {
    title: movie.titleRu,
    description,
    // Возрастная маркировка в метаданных страницы.
    other: age ? { rating: age } : undefined,

    openGraph: {
      title: `${movie.titleRu} (${movie.releaseYear})`,
      description,

      // Не передаём битую ссылку, если backdrop отсутствует.
      // Для 18+ не отдаём превью и ссылку на плеер в соцсети/краулерам.
      images: !gated && movie.backdrop.url
        ? [{ url: movie.backdrop.url }]
        : undefined,

      // Ссылка на плеер (Kodik playerLink) — только для фильмов, где она есть.
      videos: !gated && movie.playerLink
        ? [{ url: movie.playerLink }]
        : undefined,

      type: "video.movie",
    },
  };
}

export default async function MoviePage({
  params,
}: Props) {
  const { slug } = await params;
  const movie = await getContentBySlug(slug);

  if (!movie || movie.type !== "movie") {
    notFound();
  }

  const similar = await getSimilarContent(movie);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(contentJsonLd(movie)) }}
      />
      <MovieDetailClient
        movie={movie}
        similar={similar}
      />
    </>
  );
}