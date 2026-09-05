import React from "react";
import { Clock } from "lucide-react";
import type { Episode } from "@/lib/types";

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 hover:border-white/10 transition-colors cursor-pointer group">
      <div className="w-12 h-12 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center shrink-0 group-hover:border-[#EF4A4F]/30 transition-colors">
        <span className="text-lg font-bold text-[#71717A] group-hover:text-[#EF4A4F] transition-colors">
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
    </div>
  );
}
