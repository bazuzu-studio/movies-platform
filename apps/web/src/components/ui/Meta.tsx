import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { RELEASE_STATUS_LABEL, type ReleaseStatus } from "@/lib/release-status";

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-[#F0B33D] text-[#F0B33D]" />
      <span className="text-sm font-semibold text-[#F0B33D] tabular-nums">{rating !== null && rating !== undefined ? rating.toFixed(1) : 'N/A'}
</span>
    </span>
  );
}

export function GenreChip({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-[#B8B8BF] border border-white/10 backdrop-blur-sm transition-colors hover:text-white hover:border-white/20">
      {label}
    </span>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "series" | "new" | "age" | "ongoing" | "anons";
}) {
  const styles = {
    default: "bg-black/55 text-white border border-white/15 backdrop-blur-md",
    series: "bg-blue-500/15 text-blue-300 border border-blue-400/30 backdrop-blur-md",
    age: "bg-black/70 text-white border border-white/25 backdrop-blur-md",
    ongoing: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 backdrop-blur-md",
    anons: "bg-amber-500/15 text-amber-300 border border-amber-400/30 backdrop-blur-md",
    new: "text-white bg-[linear-gradient(135deg,#FF6A5A,#EF4A4F)] shadow-[0_4px_14px_-4px_rgba(239,74,79,0.7)] border border-white/10",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase", styles[variant])}>
      {children}
    </span>
  );
}

/**
 * Бейдж статуса релиза.
 *
 * По умолчанию показывает только «Выходит» и «Анонс» — «Вышло» это обычное
 * состояние каталога, и на карточках оно только шумит. Для страницы
 * контента можно передать `showReleased`.
 */
export function ReleaseStatusBadge({
  status,
  showReleased = false,
}: {
  status?: ReleaseStatus;
  showReleased?: boolean;
}) {
  if (!status || (status === "released" && !showReleased)) return null;

  const variant = status === "ongoing" ? "ongoing" : status === "anons" ? "anons" : "default";

  return (
    <Badge variant={variant}>
      {status === "ongoing" && (
        <span aria-hidden className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
      )}
      {RELEASE_STATUS_LABEL[status]}
    </Badge>
  );
}
