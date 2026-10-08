"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "lucide-react";

import type { ContentItem } from "@/lib/types";
import { formatCountdown, formatMskTime, type NextEpisode } from "@/lib/next-episode";
import { cn } from "@/lib/utils";
import { isAgeGated } from "@/lib/age";
import { useAgeConfirmed } from "@/lib/age-client";

interface ScheduleCardProps {
  item: ContentItem;
  next: NextEpisode;
  /** Серия уже вышла в эфир. */
  aired?: boolean;
  /** list — карточка на странице расписания; poster — постер для ленты на главной. */
  variant?: "list" | "poster";
  /** Подпись дня на карточке ленты («сегодня», «завтра», «пт»). */
  dayLabel?: string;
  /** Текущее время, мс (для «через 40 мин»). */
  nowMs?: number;
}

/** Карточка эфира: постер, название, номер серии и статус (вышла / через N). */
export function ScheduleCard({
  item,
  next,
  aired = false,
  variant = "list",
  dayLabel,
  nowMs = 0,
}: ScheduleCardProps) {
  const ageConfirmed = useAgeConfirmed();
  const hidePoster = isAgeGated(item.ageRating) && !ageConfirmed;
  const href = `/series/${item.slug}`;

  const poster = (
    <Image
      src={item.poster?.url || "/default-poster.jpg"}
      alt={item.titleRu}
      fill
      sizes={variant === "list" ? "72px" : "(max-width: 640px) 45vw, 184px"}
      className={cn("object-cover", hidePoster && "scale-125 blur-xl")}
    />
  );

  if (variant === "poster") {
    return (
      <Link href={href} className="group block">
        <div
          className={cn(
            "relative aspect-[2/3] overflow-hidden rounded-xl bg-[#121214] ring-1 ring-white/[0.06] transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-sky-400/40",
            aired && "opacity-80 group-hover:opacity-100",
          )}
        >
          {poster}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/65 to-transparent px-2.5 pb-2.5 pt-10">
            <p
              className={cn(
                "flex items-center gap-1 text-[11px] font-bold",
                aired ? "text-emerald-300" : "text-sky-300",
              )}
            >
              {aired ? (
                <>
                  <Check aria-hidden className="h-3 w-3" /> Вышла в эфир
                </>
              ) : (
                [dayLabel, formatMskTime(next.airingAt)].filter(Boolean).join(" · ")
              )}
            </p>
            <p className="text-xs font-semibold text-white">Серия {next.number}</p>
          </div>
        </div>
        <p className="mt-2.5 line-clamp-1 px-0.5 text-sm font-semibold text-white transition-colors group-hover:text-[#FF8A8D]">
          {item.titleRu}
        </p>
      </Link>
    );
  }

  const countdown = aired ? null : formatCountdown(next.airingAt, nowMs);

  return (
    <Link
      href={href}
      className={cn(
        "group flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-2.5 ring-1 transition-all duration-200 sm:gap-4 sm:p-3",
        aired
          ? "bg-white/[0.02] opacity-75 ring-white/[0.05] hover:opacity-100 hover:ring-emerald-400/25"
          : "bg-white/[0.05] ring-white/[0.08] hover:-translate-y-0.5 hover:bg-white/[0.08] hover:ring-sky-400/35",
      )}
    >
      <span className="relative h-[88px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-[#121214] shadow-lg sm:h-[104px] sm:w-[72px]">
        {poster}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-white transition-colors group-hover:text-[#FF8A8D] sm:text-base">
          {item.titleRu}
        </span>
        {(item.titleEn || item.originalTitle) && (
          <span className="mt-0.5 block truncate text-xs text-[#8E8E98]">
            {item.titleEn || item.originalTitle}
          </span>
        )}

        <span className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <span className="rounded-md border border-sky-400/30 bg-sky-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-sky-300">
            Серия {next.number}
          </span>

          {aired ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
              <Check aria-hidden className="h-3.5 w-3.5" /> Вышла в эфир
            </span>
          ) : (
            countdown && (
              <span suppressHydrationWarning className="text-xs font-semibold text-sky-200/90">
                {countdown}
              </span>
            )
          )}

          {item.rating > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-[#A1A1AA]">
              <Star aria-hidden className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {item.rating.toFixed(1)}
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}
