
import type { Metadata } from "next";

import { getContentList, getHeroItem, type ContentListResult } from "@/lib/api";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Главная",
};

// Страница зависит от CMS: не пререндерим её при `next build` (CMS в этот
// момент может быть недоступна, например при первой выкладке). Данные всё
// равно кэшируются на 60 с через fetch (см. serverClient в lib/api.ts).
export const dynamic = "force-dynamic";

const EMPTY_LIST: ContentListResult = {
  items: [],
  totalDocs: 0,
  hasNextPage: false,
};

export default async function HomePage() {
  const [
    popularContent,
    newestContent,
    moviesContent,
    seriesContent,
    ongoingContent,
    heroItem,
  ] = await Promise.all([
    // Популярное
    getContentList(1, 12, {
      sort: "popular",
    }),

    // Новые поступления
    getContentList(1, 12, {
      sort: "newest",
    }),

    // Фильмы
    getContentList(1, 12, {
      type: "movie",
      sort: "newest",
    }),

    // Сериалы
    getContentList(1, 12, {
      type: "series",
      sort: "newest",
    }),

    // Сейчас выходит. Сортировка по updatedAt: пайплайн update-ongoing
    // обновляет его при появлении новой серии, поэтому свежие серии — сверху.
    // Сбой этого блока не должен ронять главную (например, если CMS ещё не
    // обновлена до версии с полем releaseStatus).
    getContentList(1, 12, {
      type: "series",
      status: "ongoing",
      sort: "newest",
    }).catch((error) => {
      console.error("HomePage: не удалось загрузить онгоинги", error);
      return EMPTY_LIST;
    }),

    // Hero: тайтл с фоном и описанием (в списках их нет). Сбой не роняет главную.
    getHeroItem().catch((error) => {
      console.error("HomePage: не удалось загрузить hero", error);
      return undefined;
    }),
  ]);

  const popular = popularContent.items;
  const newArrivals = newestContent.items;
  const movies = moviesContent.items;
  const series = seriesContent.items;
  const ongoing = ongoingContent.items;

  return (
    <HomeClient
      heroItem={heroItem ?? series[0] ?? popular[0] ?? newArrivals[0] ?? movies[0]}
      popular={popular}
      movies={movies}
      series={series}
      ongoing={ongoing}
      newArrivals={newArrivals}
    />
  );
}

