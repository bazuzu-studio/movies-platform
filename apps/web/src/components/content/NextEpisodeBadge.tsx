"use client";

import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";

import { formatNextEpisode, type NextEpisode } from "@/lib/next-episode";
import { cn } from "@/lib/utils";

interface NextEpisodeBadgeProps {
  next?: NextEpisode;
  /**
   * chip   — плашка в ряду бейджей шапки;
   * inline — компактная строка в карточке сезона;
   * note   — пояснение над плеером.
   */
  variant?: "chip" | "inline" | "note";
  className?: string;
}

/** Текущее время, обновляется раз в минуту (подпись «сегодня/завтра» не устаревает). */
function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/**
 * Ближайшая серия по расписанию эфира. Время — МСК и именно ЭФИРА (в Японии):
 * озвучка на сайте появляется позже, поэтому слово «эфир» обязательно.
 */
export function NextEpisodeBadge({ next, variant = "chip", className }: NextEpisodeBadgeProps) {
  const now = useNow();
  if (!next) return null;
  const text = formatNextEpisode(next, now);
  if (!text) return null;

  // Серверный и клиентский «сейчас» могут разойтись на границе суток.
  const wrap = { suppressHydrationWarning: true } as const;

  if (variant === "inline") {
    return (
      <span
        {...wrap}
        className={cn("mt-1 block truncate text-[10px] font-semibold text-sky-300", className)}
      >
        {text.label} · {text.aired ? text.when : text.when.replace(/ в (\d)/, ", $1")}
      </span>
    );
  }

  if (variant === "note") {
    return (
      <p {...wrap} className={cn("mb-4 text-sm text-[#A1A1AA]", className)}>
        <span className="font-semibold text-sky-300">{text.label}</span>
        {text.aired ? " — вышла в эфир." : ` — эфир ${text.when} МСК.`} Озвучка на сайте появляется позже эфира.
      </p>
    );
  }

  return (
    <span
      {...wrap}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-300 backdrop-blur-md",
        className,
      )}
    >
      <CalendarClock aria-hidden className="h-3 w-3" />
      {text.label} — {text.aired ? text.when : `эфир ${text.when} МСК`}
    </span>
  );
}
