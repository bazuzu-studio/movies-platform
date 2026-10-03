"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isAgeGated } from "@/lib/age";
import { useAgeConfirmed } from "@/lib/age-client";
import { readContinue, removeContinue, type ContinueEntry } from "@/lib/continue-watching";

/** Лента «Продолжить просмотр» — из localStorage, без запросов к серверу. */
export function ContinueWatching() {
  const [items, setItems] = useState<ContinueEntry[]>([]);
  const ageConfirmed = useAgeConfirmed();

  useEffect(() => setItems(readContinue()), []);

  if (items.length === 0) return null;

  return (
    <section className="mb-8 sm:mb-12 mx-auto max-w-[1440px]" aria-label="Продолжить просмотр">
      <h2 className="mb-3 px-4 text-lg font-bold text-white sm:mb-5 sm:px-6 sm:text-xl lg:px-8">
        Продолжить просмотр
      </h2>
      <div className="scrollbar-hide flex snap-x snap-proximity gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-6 lg:px-8">
        {items.map((e) => {
          const hide = isAgeGated(e.ageRating) && !ageConfirmed;
          return (
            <div key={e.slug} className="group relative w-[220px] shrink-0 snap-start sm:w-[260px]">
              <Link href={`/series/${e.slug}?episode=${e.episode}`} className="block">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-[#121214] ring-1 ring-white/[0.06]">
                  <Image
                    src={e.posterUrl ?? "/default-poster.jpg"}
                    alt={e.titleRu}
                    fill
                    sizes="260px"
                    className={cn("object-cover", hide && "scale-125 blur-2xl")}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/10">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EF4A4F] text-white shadow-lg">
                      <Play className="h-5 w-5 translate-x-px" />
                    </span>
                  </div>
                </div>
                <p className="mt-2 truncate text-sm font-semibold text-white">{e.titleRu}</p>
                <p className="text-xs text-[#8E8E98]">Серия {e.episode}</p>
              </Link>
              <button
                type="button"
                aria-label={`Убрать «${e.titleRu}» из списка`}
                onClick={() => {
                  removeContinue(e.slug);
                  setItems(readContinue());
                }}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-md hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
