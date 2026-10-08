"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarClock } from "lucide-react";

import type { ScheduleEntry } from "@/lib/api";
import { formatMskTime, groupSchedule, type ScheduleGroup } from "@/lib/next-episode";
import { ScheduleCard } from "@/components/content/ScheduleCard";
import { EmptyState } from "@/components/ui/States";
import { cn } from "@/lib/utils";

/** Текущее время: стартует с серверного (без расхождения при гидратации), дальше — раз в минуту. */
function useNow(serverNow: number): number {
  const [now, setNow] = useState(serverNow);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

interface ScheduleClientProps {
  entries: ScheduleEntry[];
  /** Время рендера на сервере, мс. */
  serverNow: number;
  /** Расписание недоступно (в CMS нет полей / ошибка запроса). */
  unavailable?: boolean;
}

type Group = ScheduleGroup<ScheduleEntry>;

/** Точка и линия таймлайна. */
function Rail({ tone }: { tone: "aired" | "soon" | "now" }) {
  return (
    <span aria-hidden className="relative w-4 shrink-0">
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
      <span
        className={cn(
          "absolute left-1/2 top-[22px] h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-[#08080A]",
          tone === "aired" && "bg-emerald-400/70",
          tone === "soon" && "bg-sky-400",
          tone === "now" && "bg-[#EF4A4F] shadow-[0_0_12px_2px_rgba(239,74,79,0.6)]",
        )}
      />
    </span>
  );
}

function DaySection({ group, now, isToday }: { group: Group; now: number; isToday: boolean }) {
  const airedCount = group.entries.filter((e) => e.next.airingAt * 1000 <= now).length;
  const showNow = isToday && airedCount > 0 && airedCount < group.entries.length;

  return (
    <section id={`day-${group.day}`} aria-label={group.heading} className="scroll-mt-36">
      <h2 className="mb-4 flex items-baseline gap-3">
        <span className="text-xl font-black tracking-tight text-white sm:text-2xl">{group.heading}</span>
        <span className="text-xs font-medium text-[#8E8E98]">
          {isToday && airedCount > 0
            ? `вышло ${airedCount} из ${group.entries.length}`
            : group.entries.length}
        </span>
      </h2>

      <ul>
        {group.entries.map(({ item, next }, index) => {
          const aired = next.airingAt * 1000 <= now;
          const prevAired = index > 0 && group.entries[index - 1].next.airingAt * 1000 <= now;
          return (
            <React.Fragment key={`${item.id}-${next.number}`}>
              {showNow && !aired && prevAired && (
                <li className="flex items-center gap-2 pb-3" aria-label="Сейчас">
                  <span className="w-12 shrink-0 text-right text-xs font-bold tabular-nums text-[#EF4A4F] sm:w-14" suppressHydrationWarning>
                    {formatMskTime(now / 1000)}
                  </span>
                  <Rail tone="now" />
                  <span className="flex flex-1 items-center gap-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-[#EF4A4F]/70 to-transparent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#EF4A4F]">Сейчас</span>
                  </span>
                </li>
              )}
              <li className="flex gap-2 pb-3">
                <span
                  className={cn(
                    "w-12 shrink-0 pt-[17px] text-right text-base font-bold tabular-nums sm:w-14 sm:text-lg",
                    aired ? "text-[#6B6B75]" : "text-white",
                  )}
                >
                  {formatMskTime(next.airingAt)}
                </span>
                <Rail tone={aired ? "aired" : "soon"} />
                <ScheduleCard item={item} next={next} aired={aired} nowMs={now} />
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
}

export function ScheduleClient({ entries, serverNow, unavailable = false }: ScheduleClientProps) {
  const now = useNow(serverNow);
  const groups = groupSchedule(entries, now);
  const todayDay = groups.find((g) => g.heading === "Сегодня")?.day;

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Подсветка вкладки по тому, какой день сейчас на экране.
  useEffect(() => {
    if (groups.length < 2) return;
    const observer = new IntersectionObserver(
      (items) => {
        const visible = items.filter((i) => i.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveDay(Number(visible.target.id.replace("day-", "")));
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    groups.forEach((g) => {
      const el = document.getElementById(`day-${g.day}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // Список дней меняется редко; пересоздаём наблюдатель по их набору.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.map((g) => g.day).join(",")]);

  // Активная вкладка остаётся в поле зрения ленты.
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const list = tabsRef.current;
    if (!tab || !list) return;
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2, behavior: "smooth" });
  }, [activeDay]);

  const total = groups.reduce((sum, g) => sum + g.entries.length, 0);

  return (
    <div className="pb-24 md:pb-12">
      {/* Шапка */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_15%_0%,rgba(56,189,248,0.16),transparent),radial-gradient(50%_100%_at_90%_0%,rgba(239,74,79,0.14),transparent)]"
        />
        <div className="relative mx-auto max-w-[900px] px-4 pb-6 pt-24 sm:px-6 sm:pb-8 sm:pt-20 lg:px-8">
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-white sm:text-5xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-sky-400/30 sm:h-14 sm:w-14">
              <CalendarClock aria-hidden className="h-6 w-6 text-sky-300 sm:h-8 sm:w-8" />
            </span>
            Расписание эфира
          </h1>
          <p className="mt-3 max-w-xl text-sm text-[#A1A1AA] sm:text-base">
            Когда выйдет новая серия. Время — эфир в Японии, по Москве; озвучка на сайте появляется позже.
          </p>
          {!unavailable && total > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#8E8E98]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> Скоро в эфире
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" /> Уже вышла
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Вкладки дней (липкие под шапкой сайта) */}
      {!unavailable && groups.length > 1 && (
        <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-[#08080A]/90 backdrop-blur-xl">
          <div
            ref={tabsRef}
            className="scrollbar-hide mx-auto flex max-w-[900px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8"
          >
            {groups.map((g) => {
              const active = (activeDay ?? groups[0].day) === g.day;
              return (
                <button
                  key={g.day}
                  type="button"
                  aria-current={active}
                  onClick={() => {
                    setActiveDay(g.day);
                    document.getElementById(`day-${g.day}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-white text-black"
                      : "bg-white/[0.06] text-[#A1A1AA] hover:bg-white/10 hover:text-white",
                  )}
                >
                  {g.tab}
                  <span className={cn("ml-1.5 text-xs font-medium", active ? "text-black/55" : "text-[#6B6B75]")}>
                    {g.entries.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[900px] px-4 pt-8 sm:px-6 lg:px-8">
        {unavailable ? (
          <EmptyState
            icon={CalendarClock}
            title="Расписание временно недоступно"
            subtitle="Загляните чуть позже — мы уже работаем над этим."
          />
        ) : groups.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="Ближайших эфиров пока нет"
            subtitle="Расписание обновляется несколько раз в сутки."
          />
        ) : (
          <div className="space-y-10">
            {groups.map((group) => (
              <DaySection key={group.day} group={group} now={now} isToday={group.day === todayDay} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
