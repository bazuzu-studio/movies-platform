import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getContentList,
  getSimilarContent,
} from "@/lib/api";
import { SeriesDetailClient } from "@/components/pages/SeriesDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { items } = await getContentList(1, 100);

  return items
    .filter((content) => content.type === "series")
    .map((content) => ({
      slug: content.slug,
    }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getContentBySlug(slug);

  if (!series || series.type !== "series") {
    return {};
  }

  return {
    title: series.titleRu,
    description: series.description,
    openGraph: {
      title: `${series.titleRu} (${series.releaseYear})`,
      description: series.description,
      images: series.backdrop?.url
        ? [{ url: series.backdrop.url }]
        : [],
      type: "video.tv_show",
    },
  };
}

export default async function SeriesPage({
  params,
}: Props) {
  const { slug } = await params;
  const series = await getContentBySlug(slug);

  if (!series || series.type !== "series") {
    notFound();
  }

  const normalizedSeries = {
    ...series,
    seasons: Array.isArray(series.seasons)
      ? series.seasons
      : [],
  };

  const similar = await getSimilarContent(normalizedSeries);

  return (
    <SeriesDetailClient
      series={normalizedSeries}
      similar={similar}
    />
  );
}
