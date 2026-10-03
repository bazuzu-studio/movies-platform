"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { MovieCard } from "./MovieCard";

export function ContentRow({
  title,
  items,
  href,
}: {
  title: string;
  items: ContentItem[];
  /** Ссылка «Смотреть все» (например, на каталог с фильтром). */
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  if (items.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-12 mx-auto max-w-[1440px]">
      <div className="flex items-center justify-between mb-3 sm:mb-5 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
        {href && (
          <Link
            href={href}
            className="ml-auto mr-3 text-sm text-[#8E8E98] transition-colors hover:text-white"
          >
            Смотреть все
          </Link>
        )}
        <div className="hidden sm:flex gap-1">
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
      <div ref={ref} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2 pt-2 snap-x snap-proximity scroll-px-4 sm:scroll-px-6 lg:scroll-px-8">
        {items.map((item) => (
          <div key={item.id} className="w-[132px] sm:w-[164px] lg:w-[184px] shrink-0 snap-start">
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
