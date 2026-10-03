"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MovieCard } from "./MovieCard";

interface SimilarContentProps {
  title: string;
  items: ContentItem[];
  className?: string;
}

/**
 * Блок «Похожее» на страницах фильма и сериала.
 *
 * Раньше это была сетка на 2–5 колонок внутри контейнера в 1400px, из-за чего
 * постеры получались огромными (по ~300px в ширину). Теперь — горизонтальная
 * лента карточек фиксированной небольшой ширины (как ряды на главной):
 * на телефоне листается свайпом, на десктопе — стрелками.
 */
export function SimilarContent({ title, items, className }: SimilarContentProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows, items.length]);

  const scroll = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className={cn("mt-12 sm:mt-14", className)} aria-label={title}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>

        <div className="hidden gap-1 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Прокрутить назад"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            aria-label="Прокрутить вперёд"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        onScroll={updateArrows}
        className="scrollbar-hide -mx-4 flex snap-x snap-proximity gap-3 overflow-x-auto px-4 pb-2 pt-1 sm:mx-0 sm:gap-4 sm:px-0"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[124px] shrink-0 snap-start sm:w-[148px] lg:w-[164px]"
          >
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
