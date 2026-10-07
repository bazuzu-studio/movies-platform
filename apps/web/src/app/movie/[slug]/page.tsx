import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getContentList,
  getSimilarContent,
} from "@/lib/api";
import { MovieDetailClient } from "@/components/pages/MovieDetailClient";
import { contentJsonLd, jsonLdString } from "@/lib/jsonld";
import { buildContentMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Сборка не должна зависеть от доступности CMS: при ошибке страницы
  // просто рендерятся по запросу (dynamicParams по умолчанию включён).
  try {
    const { items } = await getContentList(1, 100, "movie");

    return items.map((content) => ({
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

  // SEO-поля из CMS (content.meta) с fallback на данные тайтла.
  return buildContentMetadata(movie);
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