
import type { Metadata } from "next";

import { getContentList, type ContentListResult } from "@/lib/api";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Главная",
};

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
  ]);

  const popular = popularContent.items;
  const newArrivals = newestContent.items;
  const movies = moviesContent.items;
  const series = seriesContent.items;
  const ongoing = ongoingContent.items;

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
      ongoing={ongoing}
      newArrivals={newArrivals}
    />
  );
}

