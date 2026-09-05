"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Tv, Bookmark, BookmarkCheck } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { Btn } from "@/components/ui/Btn";
import { Badge, GenreChip, StarRating } from "@/components/ui/Meta";
import { useFavorites } from "@/components/providers/FavoritesContext";
import { formatDuration } from "@/lib/utils";

export function HeroSection({ item }: { item: ContentItem }) {
  const { isFavorite, toggle } = useFavorites();
  const isFav = isFavorite(item.id);
  const href = item.type === "movie" ? `/movie/${item.slug}` : `/series/${item.slug}`;

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden">
      {/* Это изображение — LCP-элемент главной страницы (ТЗ, п.4.1: LCP ≤ 2.5с),
          поэтому используем next/image с priority (без lazy-загрузки и с
          автоматическими WebP/AVIF + responsive sizes) вместо обычного <img>. */}
      <Image
        src={item.backdrop}
        alt={item.titleRu}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080A] via-[#08080A]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]/40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
      <div className="pointer-events-none absolute -left-20 bottom-0 w-[420px] h-[420px] rounded-full bg-[#EF4A4F]/[0.12] blur-[100px]" />

      <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 lg:pb-14">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {item.type === "series" && <Badge variant="series">СЕРИАЛ</Badge>}
            {item.isNew && <Badge variant="new">НОВИНКА</Badge>}
            {/* {item.genres.slice(0, 2).map((g) => (
              <GenreChip key={g} label={g} />
            ))} */}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.02] mb-2 [text-wrap:balance] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            {item.titleRu}
          </h1>
          <p className="text-sm text-[#A1A1AA] font-medium mb-3">{item.titleEn}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#A1A1AA]">
            <StarRating rating={item.rating} />
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {item.releaseYear}
            </span>
            {item.type === "movie" && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(item.duration)}
              </span>
            )}
            {item.type === "series" && (
              <span className="flex items-center gap-1">
                <Tv className="w-3.5 h-3.5" />
                {/* {item.seasons.length} сезона */}
              </span>
            )}
          </div>

          <p className="text-sm text-[#A1A1AA] line-clamp-2 mb-6 max-w-md">{item.description}</p>

          <div className="flex flex-wrap gap-3">
            <Link href={href}>
              <Btn size="lg">Подробнее</Btn>
            </Link>
            <Btn variant={isFav ? "danger" : "outline"} size="lg" onClick={() => toggle(item.id)}>
              {isFav ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              {isFav ? "В избранном" : "В избранное"}
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
