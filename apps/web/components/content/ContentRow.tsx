"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { MovieCard } from "./MovieCard";

export function ContentRow({ title, items }: { title: string; items: ContentItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  if (items.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-1">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 rounded-lg bg-white/6 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Прокрутить назад"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 rounded-lg bg-white/6 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Прокрутить вперёд"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2">
        {items.map((item) => (
          <div key={item.id} className="w-[140px] sm:w-[160px] shrink-0">
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
