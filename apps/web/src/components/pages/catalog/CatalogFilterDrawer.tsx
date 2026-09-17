"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import {
  YEAR_OPTIONS,
  AGE_OPTIONS,
  type YearOption,
  type AgeOption,
} from "@/hooks/useCatalogFilters";

type Props = {
  open: boolean;
  onClose: () => void;

  genreOptions: string[];
  genre: string;
  onGenreChange: (value: string) => void;

  year: YearOption;
  onYearChange: (value: YearOption) => void;

  age: AgeOption;
  onAgeChange: (value: AgeOption) => void;
};

export function CatalogFilterDrawer({
  open,
  onClose,
  genreOptions,
  genre,
  onGenreChange,
  year,
  onYearChange,
  age,
  onAgeChange,
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-filter-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрыть фильтры"
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex max-h-[85vh] flex-col gap-5 overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[#121214] p-6 pb-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            id="catalog-filter-title"
            className="text-lg font-bold text-white"
          >
            Фильтры
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#71717A] transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF4A4F]/30"
            aria-label="Закрыть фильтры"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        {/* Жанр */}
        <FilterSection label="Жанр">
          <div className="flex flex-wrap gap-2">
            {genreOptions.map((option) => {
              const active = genre === option;

              return (
                <FilterButton
                  key={option}
                  active={active}
                  onClick={() => onGenreChange(option)}
                >
                  {option}
                </FilterButton>
              );
            })}
          </div>
        </FilterSection>

        {/* Год */}
        <FilterSection label="Год">
          <div className="flex flex-wrap gap-2">
            {YEAR_OPTIONS.map((option) => {
              const active = year === option;

              return (
                <FilterButton
                  key={option}
                  active={active}
                  onClick={() => onYearChange(option)}
                >
                  {option}
                </FilterButton>
              );
            })}
          </div>
        </FilterSection>

        {/* Возраст */}
        <FilterSection label="Возрастное ограничение">
          <div className="flex flex-wrap gap-2">
            {AGE_OPTIONS.map((option) => {
              const active = age === option;

              return (
                <FilterButton
                  key={option}
                  active={active}
                  onClick={() => onAgeChange(option)}
                >
                  {option}
                </FilterButton>
              );
            })}
          </div>
        </FilterSection>

        {/* Apply */}
        <Btn className="mt-2 w-full" onClick={onClose}>
          Применить
        </Btn>
      </div>
    </div>
  );
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#71717A]">
        {label}
      </p>

      {children}
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#EF4A4F]/30",
        active
          ? "border-[#EF4A4F]/40 bg-[#EF4A4F]/20 text-[#EF4A4F]"
          : "border-white/8 text-[#71717A] hover:border-white/16 hover:bg-white/5 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}