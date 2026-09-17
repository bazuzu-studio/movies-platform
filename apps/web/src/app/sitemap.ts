import type { MetadataRoute } from "next";
import { getContentList } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/catalog`, changeFrequency: "daily", priority: 0.9 },
  ];

  try {
    // limit намеренно большой: sitemap должен включать весь каталог,
    // а не первую страницу (getContentList по умолчанию возвращает 24).
    const { items } = await getContentList(1, 5000);

    const contentRoutes: MetadataRoute.Sitemap = items.map((item) => ({
      url: `${base}/${item.type === "movie" ? "movie" : "series"}/${item.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...contentRoutes];
  } catch (error) {
    // Если CMS недоступен в момент `next build` — не роняем всю сборку
    // из-за sitemap, отдаём хотя бы статические маршруты.
    console.error("sitemap: getContentList failed, falling back to static routes", error);
    return staticRoutes;
  }
}