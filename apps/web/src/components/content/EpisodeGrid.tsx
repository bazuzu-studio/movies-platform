"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Episode } from "@/lib/types";
import { formatEpisodeDateLong, formatEpisodeDateShort } from "@/lib/episode";
import { formatNextEpisode, type NextEpisode } from "@/lib/next-episode";
import { isFresh, type SeasonAvailability } from "@/lib/availability";
import { cn } from "@/lib/utils";

const GROUP_SIZE = 24;

interface EpisodeGridProps {
  episodes: Episode[];
  activeNumber: number | null;
  watched: ReadonlySet<number>;
  onSelect: (episode: Episode) => void;
  /**
   * Ближайшая серия по расписанию эфира. Если её ещё нет среди серий (нет
   * озвучки), показывается неактивной плиткой «скоро» с датой.
   */
  upcoming?: NextEpisode;
  /**
   * Когда серии появились на сайте (episodes.firstAvailableAt), по номеру серии.
   * Свежие (за последние 48 ч) помечаются зелёной точкой, время — в подсказке.
   * Не передан или пуст (поля в CMS нет / серия загружена раньше) — без отметок.
   */
  availability?: SeasonAvailability;
}

/**
 * Компактный выбор серии: сетка плиток с номерами вместо длинного списка
 * карточек. На телефоне 5 колонок, помещается 20+ серий на экран. Если серий
 * больше 24 — сверху вкладки-диапазоны («1–24», «25–48»…).
 */
export function EpisodeGrid({ episodes, activeNumber, watched, onSelect, upcoming, availability }: EpisodeGridProps) {
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

  const lastIndex = Math.max(groups.length - 1, 0);
  const visible = groups[Math.min(group, lastIndex)] ?? [];

  // Плитка «скоро» — в конце последней вкладки, пока такой серии нет в списке.
  const upcomingText =
    upcoming && !sorted.some((e) => e.episodeNumber === upcoming.number)
      ? formatNextEpisode(upcoming, Date.now())
      : null;
  // Одинаковая высота плиток, если хотя бы у одной серии есть дата.
  const anyDate = visible.some((e) => Boolean(e.releaseDate));
  const showUpcoming = Boolean(upcoming && upcomingText) && Math.min(group, lastIndex) === lastIndex;
  // availability приходит уже после гидратации (клиентский fetch), поэтому Date.now() здесь безопасен.
  const nowMs = Date.now();

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
          const date = formatEpisodeDateShort(ep.releaseDate);
          const full = formatEpisodeDateLong(ep.releaseDate);
          const availableAt = availability?.[ep.episodeNumber];
          const availableFull = availableAt ? formatEpisodeDateLong(availableAt) : "";
          const fresh = isFresh(availableAt, nowMs);
          const hint = [
            full ? `эфир в Японии ${full}` : "",
            availableFull ? `на сайте с ${availableFull}` : "",
          ].filter(Boolean).join(" · ");
          return (
            <button
              key={ep.id ?? ep.episodeNumber}
              type="button"
              onClick={() => onSelect(ep)}
              aria-current={isActive ? "true" : undefined}
              title={hint ? `Серия ${ep.episodeNumber} — ${hint}` : undefined}
              aria-label={`Серия ${ep.episodeNumber}${ep.title ? `: ${ep.title}` : ""}${full ? `, эфир ${full}` : ""}${fresh ? ", новая серия" : ""}${isWatched ? " (просмотрена)" : ""}`}
              className={cn(
                "relative flex flex-col items-center justify-center rounded-xl border text-sm font-bold tabular-nums transition-all active:scale-95",
                anyDate ? "h-14" : "h-12",
                isActive
                  ? "border-[#EF4A4F] bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] text-white shadow-[0_6px_18px_-6px_rgba(239,74,79,0.8)]"
                  : isWatched
                    ? "border-white/8 bg-white/[0.03] text-[#8E8E98] hover:border-white/20 hover:text-white"
                    : "border-white/10 bg-white/[0.06] text-white hover:border-[#EF4A4F]/40 hover:bg-white/10",
              )}
            >
              <span>{ep.episodeNumber}</span>
              {date && (
                <span
                  className={cn(
                    "mt-0.5 text-[10px] font-medium leading-none tabular-nums",
                    isActive ? "text-white/80" : "text-[#8E8E98]",
                  )}
                >
                  {date}
                </span>
              )}
              {fresh && (
                <span
                  className={cn(
                    "absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
                    isActive ? "bg-white" : "bg-emerald-400",
                  )}
                  aria-hidden
                />
              )}
              {isWatched && !isActive && (
                <Check className="absolute right-1 top-1 h-3 w-3 text-[#EF4A4F]" aria-hidden />
              )}
            </button>
          );
        })}

        {showUpcoming && upcoming && upcomingText && (
          <div
            title={`Серия ${upcoming.number} — эфир ${upcomingText.when}${upcomingText.aired ? "" : " МСК"}. Озвучка появится позже.`}
            aria-label={`Серия ${upcoming.number}: ${upcomingText.aired ? "вышла в эфир" : `эфир ${upcomingText.when}`}, ждёт озвучку`}
            className="flex h-14 cursor-default flex-col items-center justify-center rounded-xl border border-dashed border-sky-400/40 bg-sky-500/[0.06] text-sm font-bold tabular-nums text-sky-200"
          >
            <span>{upcoming.number}</span>
            <span suppressHydrationWarning className="mt-0.5 text-[10px] font-medium leading-none text-sky-300/90">
              {upcomingText.aired ? "эфир" : formatEpisodeDateShort(new Date(upcoming.airingAt * 1000).toISOString())}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
