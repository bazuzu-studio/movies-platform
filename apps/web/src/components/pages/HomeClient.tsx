import React from "react";
import type { ContentItem, Movie, Series } from "@/lib/types";
import { HeroSection } from "@/components/content/HeroSection";
import { ContentRow } from "@/components/content/ContentRow";
import { ContentGrid } from "@/components/content/ContentGrid";

export function HomeClient({ heroItem, all }: { heroItem: ContentItem; all: ContentItem[] }) {
  const popular = all.filter((c) => c.isPopular);
  const movies = (all.filter((c) => c.type === "movie") as Movie[]).slice(0, 8);
  const series = (all.filter((c) => c.type === "series") as Series[]).slice(0, 6);
  const newArrivals = all.filter((c) => c.isNew);


  

  return (
    <div className="pb-20 md:pb-0">
      <HeroSection item={heroItem} />

      <div className="mt-10">
        <ContentRow title="Популярное" items={popular} />

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <h2 className="text-xl font-bold text-white mb-5">Фильмы</h2>
          <ContentGrid items={movies} />
        </section>

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <h2 className="text-xl font-bold text-white mb-5">Сериалы</h2>
          <ContentGrid items={series} />
        </section>

        <ContentRow title="Новые поступления" items={newArrivals} />
      </div>
    </div>
  );
}
