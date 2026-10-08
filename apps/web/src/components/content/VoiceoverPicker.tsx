"use client";

import React from "react";
import { Mic } from "lucide-react";
import type { VoiceoverOption } from "@/lib/voiceovers";
import { cn } from "@/lib/utils";

interface VoiceoverPickerProps {
  options: VoiceoverOption[];
  /** Играющий сейчас вариант. */
  active: VoiceoverOption | undefined;
  onSelect: (option: VoiceoverOption) => void;
}

/**
 * Выбор озвучки текущей серии: горизонтальный ряд кнопок (на телефоне
 * прокручивается). Показывается, только если у серии больше одной озвучки.
 */
export function VoiceoverPicker({ options, active, onSelect }: VoiceoverPickerProps) {
  if (options.length < 2) return null;

  return (
    <div className="mb-3 mt-1">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#8E8E98]">
        <Mic className="h-3.5 w-3.5" aria-hidden />
        Озвучка
      </p>
      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((option) => {
          const isActive = option === active || (!!active && option.url === active.url);
          return (
            <button
              key={`${option.slug ?? "default"}-${option.url}`}
              type="button"
              onClick={() => onSelect(option)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                isActive
                  ? "border-[#EF4A4F]/50 bg-[#EF4A4F]/15 text-[#FF7A7D]"
                  : "border-white/10 bg-white/5 text-[#A1A1AA] hover:text-white",
              )}
            >
              {option.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
