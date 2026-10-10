"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Episode } from "@/lib/types";
import { cn } from "@/lib/utils";

const GROUP_SIZE = 24;

interface EpisodeGridProps {
  episodes: Episode[];
  activeNumber: number | null;
  watched: ReadonlySet<number>;
  onSelect: (episode: Episode) => void;
}

/**
 * Компактный выбор серии: сетка плиток с номерами вместо длинного списка
 * карточек. На телефоне 5 колонок, помещается 20+ серий на экран. Если серий
 * больше 24 — сверху вкладки-диапазоны («1–24», «25–48»…).
 */
export function EpisodeGrid({ episodes, activeNumber, watched, onSelect }: EpisodeGridProps) {
  const sorted = useMemo(
    () => [...episodes].sort((a, b) => a.episodeNumber - b.episodeNumber),
    [episodes],
  );

  const groups = useMemo(() => {
    const result: Episode[][] = [];
    for (let i = 0; i < sorted.length; i += GROUP_SIZE) result.push(sorted.slice(i, i + GROUP_SIZE));
    return result;
  }, [sorted]);

  const activeGroup = useMemo(() => {
    const idx = groups.findIndex((g) => g.some((e) => e.episodeNumber === activeNumber));
    return idx === -1 ? 0 : idx;
  }, [groups, activeNumber]);

  const [group, setGroup] = useState(activeGroup);

  // Выбрали серию из другого диапазона (кнопки «след./пред.», ссылка) —
  // переключаем вкладку вслед за ней.
  useEffect(() => setGroup(activeGroup), [activeGroup]);

  const visible = groups[Math.min(group, groups.length - 1)] ?? [];

  return (
    <div>
      {groups.length > 1 && (
        <div className="scrollbar-hide -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {groups.map((g, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setGroup(i)}
              aria-pressed={i === group}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold tabular-nums transition-colors",
                i === group
                  ? "border-[#EF4A4F]/50 bg-[#EF4A4F]/15 text-[#FF7A7D]"
                  : "border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white",
              )}
            >
              {g[0].episodeNumber}–{g[g.length - 1].episodeNumber}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
        {visible.map((ep) => {
          const isActive = ep.episodeNumber === activeNumber;
          const isWatched = watched.has(ep.episodeNumber);
          return (
            <button
              key={ep.id ?? ep.episodeNumber}
              type="button"
              onClick={() => onSelect(ep)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Серия ${ep.episodeNumber}${ep.title ? `: ${ep.title}` : ""}${isWatched ? " (просмотрена)" : ""}`}
              className={cn(
                "relative flex h-12 items-center justify-center rounded-xl border text-sm font-bold tabular-nums transition-all active:scale-95",
                isActive
                  ? "border-[#EF4A4F] bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] text-white shadow-[0_6px_18px_-6px_rgba(239,74,79,0.8)]"
                  : isWatched
                    ? "border-white/8 bg-white/[0.03] text-[#8E8E98] hover:border-white/20 hover:text-white"
                    : "border-white/10 bg-white/[0.06] text-white hover:border-[#EF4A4F]/40 hover:bg-white/10",
              )}
            >
              {ep.episodeNumber}
              {isWatched && !isActive && (
                <Check className="absolute right-1 top-1 h-3 w-3 text-[#EF4A4F]" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
