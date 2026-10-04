"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

import type { Season } from "@/lib/types";
import { cn } from "@/lib/utils";
import { plural } from "@/lib/plural";


interface SeasonSwitcherProps {
  seasons: Season[];
  /** Номер сезона, который сейчас открыт. */
  activeSeason: number;
  /**
   * Переключение сезона без перехода на другую страницу: серии всех сезонов
   * франшизы уже загружены вместе с текущей страницей. Если не передан —
   * карточки работают как обычные ссылки.
   */
  onSelect?: (season: Season) => void;
}

/**
 * Переключатель связанных сезонов.
 *
 * Каждый сезон — отдельная запись Content со своим slug и постером, поэтому
 * показываем компактные карточки с миниатюрой: год, число серий и статус
 * («Выходит»). Лента прокручивается по горизонтали; открытый сезон
 * автоматически центрируется, чтобы на телефоне он не терялся за краем.
 */
export function SeasonSwitcher({ seasons, activeSeason, onSelect }: SeasonSwitcherProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active) return;

    // Прокручиваем только саму ленту, а не всю страницу (scrollIntoView дёргал бы её).
    const target = active.offsetLeft - (list.clientWidth - active.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "auto" });
  }, [activeSeason]);

  if (seasons.length < 2) return null;

  return (
    <nav aria-label="Сезоны" className="mb-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-base font-bold text-white">Сезоны</h3>
        <span className="text-xs text-[#8E8E98]">
          {seasons.length} {plural(seasons.length, ["сезон", "сезона", "сезонов"])}
        </span>
      </div>

      <ul
        ref={listRef}
        className="scrollbar-hide relative -mx-4 flex snap-x snap-proximity gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
      >
        {seasons.map((season) => {
          const number = typeof season.seasonNumber === "number" ? season.seasonNumber : 1;
          const isActive = number === activeSeason;
          const episodeCount = season.episodes?.length ?? 0;
          const href = season.slug ? `/series/${season.slug}` : "#";
          const label = `Сезон ${number}`;
          const hasCustomTitle = Boolean(season.title && season.title !== label);
          

          return (
            <li
              key={`${number}-${season.id}`}
              ref={isActive ? activeRef : undefined}
              className="w-[212px] shrink-0 snap-start sm:w-[236px]"
            >
              <Link
                href={href}
                scroll={false}
                onClick={(event) => {
                  // href остаётся для поисковиков, «открыть в новой вкладке» и
                  // средней кнопки; обычный клик переключает сезон на месте —
                  // без загрузки страницы, скелетона и прыжка наверх.
                  if (!onSelect || !season.slug) return;
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  if (!isActive) onSelect(season);
                }}
                aria-current={isActive ? "true" : undefined}
                title={hasCustomTitle ? season.title : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border p-2 pr-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4A4F]/50",
                  isActive
                    ? "border-[#EF4A4F]/50 bg-[#EF4A4F]/10 shadow-[0_0_0_1px_rgba(239,74,79,0.15)]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]",
                )}
              >
                <span className="relative h-[60px] w-10 shrink-0 overflow-hidden rounded-md bg-[#121214] ring-1 ring-white/10">
                  <Image
                    src={season.poster?.url || "/default-poster.jpg"}
                    alt=""
                    fill
                    sizes="40px"
                    className={cn(
                      "object-cover transition-transform duration-300 group-hover:scale-110",
                      !isActive && "opacity-80 group-hover:opacity-100",
                    )}
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-semibold",
                      isActive ? "text-white" : "text-[#D4D4D8] group-hover:text-white",
                    )}
                  >
                    <span className="truncate">{label}</span>
                    {isActive && (
                      <Play aria-hidden className="h-3 w-3 shrink-0 fill-[#EF4A4F] text-[#EF4A4F]" />
                    )}
                  </span>

                  <span className="mt-0.5 block truncate text-xs text-[#8E8E98]">
                    {[
                      season.releaseYear ? String(season.releaseYear) : null,
                      episodeCount > 0
                        ? `${episodeCount} ${plural(episodeCount, ["серия", "серии", "серий"])}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </span>

                  {season.releaseStatus === "ongoing" && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Выходит
                    </span>
                  )}
                  {season.releaseStatus === "anons" && (
                    <span className="mt-1 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Анонс
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
