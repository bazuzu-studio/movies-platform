import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getContentList,
  getSimilarContent,
} from "@/lib/api";
import { MovieDetailClient } from "@/components/pages/MovieDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { items } = await getContentList(1, 100);

  return items
    .filter((content) => content.type === "movie")
    .map((content) => ({
      slug: content.slug,
    }));
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

  return {
    title: movie.titleRu,
    description,

    openGraph: {
      title: `${movie.titleRu} (${movie.releaseYear})`,
      description,

      // Не передаём битую ссылку, если backdrop отсутствует.
      images: movie.backdrop.url
        ? [{ url: movie.backdrop.url }]
        : undefined,

      // Ссылка на плеер (Kodik playerLink) — только для фильмов, где она есть.
      videos: movie.playerLink
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
    <MovieDetailClient
      movie={movie}
      similar={similar}
    />
  );
}