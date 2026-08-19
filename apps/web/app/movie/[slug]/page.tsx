import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContentList, getSimilarContent } from "@/lib/api";
import { MovieDetailClient } from "@/components/pages/MovieDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getContentList();
  return items.filter((c) => c.type === "movie").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getContentBySlug(slug);
  if (!movie || movie.type !== "movie") return {};

  return {
    title: movie.titleRu,
    description: movie.description,
    openGraph: {
      title: `${movie.titleRu} (${movie.releaseYear})`,
      description: movie.description,
      images: [{ url: movie.backdrop }],
      type: "video.movie",
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { slug } = await params;
  const movie = await getContentBySlug(slug);
  if (!movie || movie.type !== "movie") notFound();

  const similar = await getSimilarContent(movie);

  return <MovieDetailClient movie={movie} similar={similar} />;
}
