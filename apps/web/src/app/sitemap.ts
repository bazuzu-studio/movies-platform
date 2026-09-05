import type { MetadataRoute } from "next";
import { getContentList } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const items = await getContentList();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/catalog`, changeFrequency: "daily", priority: 0.9 },
  ];

  const contentRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${base}/${item.type === "movie" ? "movie" : "series"}/${item.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...contentRoutes];
}
