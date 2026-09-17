"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge, StarRating } from "@/components/ui/Meta";
import { useFavorites } from "@/components/providers/FavoritesContext";

function MovieCardComponent({
item,
}: {
item: ContentItem;
}) {
const { isFavorite, toggle } = useFavorites();

// ContentItem.id может быть string | number,
// а FavoritesContext сейчас принимает number.
const numericId = Number(item.id);

const isFav = isFavorite(numericId);

const href =
item.type === "movie"
? `/movie/${item.slug}`
: `/series/${item.slug}`;

return ( <Link href={href} className="group relative block"> <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#121214] ring-1 ring-white/[0.06] shadow-[var(--shadow-card)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:ring-[#EF4A4F]/40 group-hover:shadow-[var(--shadow-glow)]">
<Image
src={item.poster?.url ?? "/default-poster.jpg"}
alt={item.titleRu}
fill
sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 180px"
className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
/>


    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {item.isNew && (
      <div className="absolute left-2 top-2">
        <Badge variant="new">НОВИНКА</Badge>
      </div>
    )}

    {item.type === "series" && (
      <div className="absolute right-2 top-2">
        <Badge variant="series">СЕРИАЛ</Badge>
      </div>
    )}

    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(numericId);
      }}
      className={cn(
        "absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all duration-200",
        isFav
          ? "bg-[#EF4A4F] text-white shadow-[0_4px_14px_-2px_rgba(239,74,79,0.7)]"
          : "bg-black/50 text-white/70 opacity-0 hover:bg-black/70 hover:text-white group-hover:translate-y-0 group-hover:opacity-100",
      )}
      aria-label={
        isFav
          ? "Убрать из избранного"
          : "В избранное"
      }
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isFav && "fill-white",
        )}
      />
    </button>
  </div>

  <div className="mt-2.5 px-0.5">
    <p className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-[#FF8A8D]">
      {item.titleRu}
    </p>

    <div className="mt-1 flex items-center gap-2">
      <StarRating rating={item.rating} />
      <span className="text-xs text-[#71717A]">
        {item.releaseYear}
      </span>
    </div>
  </div>
</Link>


);
}

export const MovieCard = React.memo(
MovieCardComponent,
);
