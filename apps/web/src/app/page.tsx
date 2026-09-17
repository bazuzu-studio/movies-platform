
import type { Metadata } from "next";

import { getContentList } from "@/lib/api";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function HomePage() {
  const [
    popularContent,
    newestContent,
    moviesContent,
    seriesContent,
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
  ]);

  const popular = popularContent.items;
  const newArrivals = newestContent.items;
  const movies = moviesContent.items;
  const series = seriesContent.items;

  // Для Hero-блока приоритетно берём сериал.
  // Если сериалов нет — первый доступный элемент.
  // TODO: заменить на отдельное поле "featured"/"isHero"
  // в CMS, когда оно появится.
  const heroItem =
    series[0] ??
    popular[0] ??
    newArrivals[0] ??
    movies[0];

  return (
    <HomeClient
      heroItem={heroItem}
      popular={popular}
      movies={movies}
      series={series}
      newArrivals={newArrivals}
    />
  );
}

