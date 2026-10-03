
"use client";

import type { ContentItem } from "@/lib/types";

import { HeroSection } from "@/components/content/HeroSection";
import { ContentRow } from "@/components/content/ContentRow";
import { ContinueWatching } from "@/components/content/ContinueWatching";

interface HomeClientProps {
  heroItem?: ContentItem;
  popular: ContentItem[];
  movies: ContentItem[];
  series: ContentItem[];
  /** Сериалы со статусом «выходит». */
  ongoing?: ContentItem[];
  newArrivals: ContentItem[];
}

export function HomeClient({
  heroItem,
  popular,
  movies,
  series,
  ongoing = [],
  newArrivals,
}: HomeClientProps) {
  if (
    !heroItem &&
    popular.length === 0 &&
    movies.length === 0 &&
    series.length === 0 &&
    newArrivals.length === 0
  ) {
    return null;
  }

  return (
    <div className="pb-20 md:pb-0">
      {heroItem && (
        <HeroSection item={heroItem} />
      )}

      <div className="mt-10 space-y-2">
        <ContinueWatching />

        {ongoing.length > 0 && (
          <ContentRow
            title="Сейчас выходит"
            items={ongoing}
            href="/catalog?type=series&status=ongoing"
          />
        )}

        {popular.length > 0 && (
          <ContentRow
            title="Популярное"
            items={popular}
          />
        )}

        {movies.length > 0 && (
          <ContentRow
            title="Фильмы"
            items={movies}
          />
        )}

        {series.length > 0 && (
          <ContentRow
            title="Сериалы"
            items={series}
          />
        )}

        {newArrivals.length > 0 && (
          <ContentRow
            title="Новые поступления"
            items={newArrivals}
          />
        )}
      </div>
    </div>
  );
}

