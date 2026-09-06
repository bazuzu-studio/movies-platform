import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContentList, getSimilarContent } from "@/lib/api";
import { SeriesDetailClient } from "@/components/pages/SeriesDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getContentList();
  return items.filter((c) => c.type === "series").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getContentBySlug(slug);
  if (!series || series.type !== "series") return {};

  return {
    title: series.titleRu,
    description: series.description,
    openGraph: {
      title: `${series.titleRu} (${series.releaseYear})`,
      description: series.description,
      images: [{ url: series.backdrop?.url }],
      type: "video.tv_show",
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getContentBySlug(slug);
  if (!series || series.type !== "series") notFound();

  const similar = await getSimilarContent(series);

  return <SeriesDetailClient series={series} similar={similar} />;
}
