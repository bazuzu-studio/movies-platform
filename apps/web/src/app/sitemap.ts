import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/catalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/copyright`, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    // Только slug/type/updatedAt и постранично: sitemap должен включать весь
    // каталог, но без загрузки постеров и жанров каждого тайтла.
    const entries = await getSitemapEntries();

    const contentRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
      url: `${base}/${entry.type === "movie" ? "movie" : "series"}/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...contentRoutes];
  } catch (error) {
    // Если CMS недоступен в момент `next build` — не роняем всю сборку
    // из-за sitemap, отдаём хотя бы статические маршруты.
    console.error("sitemap: getSitemapEntries failed, falling back to static routes", error);
    return staticRoutes;
  }
}
