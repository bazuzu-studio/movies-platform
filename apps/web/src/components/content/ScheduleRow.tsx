"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { ScheduleEntry } from "@/lib/api";
import { groupSchedule, mskDay } from "@/lib/next-episode";
import { ScheduleCard } from "./ScheduleCard";

const SHORT_DAY = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

/** Лента «Расписание эфира» на главной: ближайшие серии по времени, со ссылкой на всю страницу. */
export function ScheduleRow({ entries, serverNow }: { entries: ScheduleEntry[]; serverNow: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const scroll = (dir: -1 | 1) => ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  // Плоский список по времени: последние вышедшие сегодня (до 4), затем будущие.
  const today = mskDay(now);
  const all = groupSchedule(entries, now).flatMap((group) => group.entries);
  const isAired = (e: ScheduleEntry) => e.next.airingAt * 1000 <= now;
  const flat = [...all.filter(isAired).slice(-4), ...all.filter((e) => !isAired(e))]
    .slice(0, 14)
    .map((entry) => ({ ...entry, aired: isAired(entry) }));

  if (flat.length === 0) return null;

  const dayLabel = (airingAt: number): string => {
    const diff = mskDay(airingAt * 1000) - today;
    if (diff <= 0) return "сегодня";
    if (diff === 1) return "завтра";
    return SHORT_DAY[(4 + mskDay(airingAt * 1000)) % 7];
  };

  return (
    <section className="mx-auto mb-8 max-w-[1440px] sm:mb-12">
      <div className="mb-3 flex items-center justify-between px-4 sm:mb-5 sm:px-6 lg:px-8">
        <h2 className="text-lg font-bold text-white sm:text-xl">Расписание эфира</h2>
        <Link
          href="/schedule"
          className="ml-auto mr-3 text-sm text-[#8E8E98] transition-colors hover:text-white"
        >
          Всё расписание
        </Link>
        <div className="hidden gap-1 sm:flex">
          <button
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/6 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Прокрутить назад"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/6 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Прокрутить вперёд"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="scrollbar-hide flex snap-x snap-proximity scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 pt-2 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:scroll-px-8 lg:px-8"
      >
        {flat.map(({ item, next, aired }) => (
          <div key={item.id} className="w-[132px] shrink-0 snap-start sm:w-[164px] lg:w-[184px]">
            <ScheduleCard
              item={item}
              next={next}
              aired={aired}
              variant="poster"
              dayLabel={dayLabel(next.airingAt)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
