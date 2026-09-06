"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Meta";
import { StarRating } from "@/components/ui/Meta";
import { useFavorites } from "@/components/providers/FavoritesContext";

export function MovieCard({ item }: { item: ContentItem }) {
  const { isFavorite, toggle } = useFavorites();
  const isFav = isFavorite(item.id);
  const href = item.type === "movie" ? `/movie/${item.slug}` : `/series/${item.slug}`;



  return (
    <Link href={href} className="group relative block">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-[#121214] ring-1 ring-white/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:ring-[#EF4A4F]/40 group-hover:shadow-[var(--shadow-glow)]">
        {/* next/image даёт lazy-загрузку, responsive srcset и WebP/AVIF
            "из коробки" (ТЗ, п.4.1) — карточка встречается десятками на
            странице каталога, поэтому корректный sizes важен для реальной
            экономии трафика. */}

        <Image
          src={item.poster?.url ?? "/default-poster.jpg"}
          alt={item.titleRu}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {item.isNew && (
          <div className="absolute top-2 left-2">
            <Badge variant="new">НОВИНКА</Badge>
          </div>
        )}
        {item.type === "series" && (
          <div className="absolute top-2 right-2">
            <Badge variant="series">СЕРИАЛ</Badge>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(item.id);
          }}
          className={cn(
            "absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 backdrop-blur-md",
            isFav
              ? "bg-[#EF4A4F] text-white shadow-[0_4px_14px_-2px_rgba(239,74,79,0.7)]"
              : "bg-black/50 text-white/70 hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          )}
          aria-label={isFav ? "Убрать из избранного" : "В избранное"}
        >
          <Heart className={cn("w-4 h-4", isFav && "fill-white")} />
        </button>
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="text-sm font-semibold text-white line-clamp-1 transition-colors group-hover:text-[#FF8A8D]">
          {item.titleRu}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={item.rating} />
          <span className="text-xs text-[#71717A]">{item.releaseYear}</span>
        </div>
      </div>
    </Link>
  );
}
