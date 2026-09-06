import React from "react";
import type { ContentItem } from "@/lib/types";
import { MovieCard } from "./MovieCard";
import { SkeletonCard } from "@/components/ui/States";

export function ContentGrid({ items, loading }: { items: ContentItem[]; loading?: boolean }) {
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} />
      ))}
    </div>
  );
}
