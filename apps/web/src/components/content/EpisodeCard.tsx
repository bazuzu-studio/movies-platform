import React from "react";
import { Clock } from "lucide-react";
import type { Episode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
  isSelected?: boolean;
}

export function EpisodeCard({ episode, onClick, isSelected = false }: EpisodeCardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl border transition-all group",
        onClick && "cursor-pointer",
        !onClick && "cursor-default opacity-60",
        isSelected
          ? "bg-[#EF4A4F]/10 border-[#EF4A4F] ring-1 ring-[#EF4A4F]/30"
          : onClick
            ? "bg-white/3 border-white/6 hover:bg-white/5 hover:border-white/10"
            : "bg-white/3 border-white/6"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors border",
          isSelected
            ? "bg-[#EF4A4F]/20 border-[#EF4A4F]"
            : "bg-white/6 border-white/8 group-hover:border-[#EF4A4F]/30"
        )}
      >
        <span
          className={cn(
            "text-lg font-bold transition-colors",
            isSelected ? "text-[#EF4A4F]" : "text-[#71717A] group-hover:text-[#EF4A4F]"
          )}
        >
          {episode.episodeNumber}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{episode.title}</p>
        <p className="text-xs text-[#71717A] mt-0.5 line-clamp-2">{episode.description}</p>

        <div className="flex items-center gap-3 mt-1.5 text-xs text-[#3f3f46]">
          <span>{episode.releaseDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {episode.duration}м
          </span>
        </div>
      </div>

      {isSelected && (
        <div className="shrink-0 self-center">
          <span className="flex h-2 w-2 rounded-full bg-[#EF4A4F]" />
        </div>
      )}
    </div>
  );
}
