"use client";

import type { ReactNode } from "react";
import {
  Check,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AgeOption,
  SORT_OPTIONS,
  YEAR_OPTIONS,
  type SortOption,
  type YearOption,
} from "@/hooks/useCatalogFilters";



type Props = {
  genreOptions: string[];
  genre: string;
  onGenreChange: (value: string) => void;

  year: YearOption;
  onYearChange: (value: YearOption) => void;

  age: AgeOption;
  onAgeChange: (value: AgeOption) => void;

  sort: SortOption;
  onSortChange: (value: SortOption) => void;
};

type DropdownProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  align?: "left" | "right";
  icon?: ReactNode;
};

function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  align = "left",
  icon,
}: DropdownProps<T>) {
  return (
    <div
      className={cn(
        "group relative",
        align === "right" && "ml-auto",
      )}
    >
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/5 px-3.5 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/16 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF4A4F]/30"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        {icon}

        <span>{label}</span>

        <ChevronDown
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-200 group-focus-within:rotate-180"
        />
      </button>

      <div
        className={cn(
          "absolute top-full z-30 mt-1 hidden min-w-[140px] flex-col rounded-xl border border-white/10 bg-[#1A1A1D] p-1.5 shadow-2xl group-focus-within:flex",
          align === "right"
            ? "right-0"
            : "left-0",
        )}
        role="listbox"
        aria-label={label}
      >
        {options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onChange(option)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                selected
                  ? "bg-white/8 text-white"
                  : "text-[#A1A1AA] hover:bg-white/5 hover:text-white",
              )}
            >
              <span>{option}</span>

              {selected && (
                <Check
                  aria-hidden
                  className="h-3.5 w-3.5 shrink-0 text-[#EF4A4F]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Панель фильтров каталога для десктопа:
 *
 * - жанр
 * - год
 * - возраст
 * - сортировка
 *
 * Компонент не фильтрует данные самостоятельно.
 * Он только передаёт выбранные значения наверх,
 * где они отправляются в API.
 */
export function CatalogFilterBar({
  genreOptions,
  genre,
  onGenreChange,
  year,
  onYearChange,
  age,
  onAgeChange,
  sort,
  onSortChange,
}: Props) {
  const ageOptions = ["Все", "0+", "6+", "12+", "16+", "18+"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      <Dropdown
        label={genre === "Все" ? "Жанр" : genre}
        value={genre}
        options={genreOptions}
        onChange={onGenreChange}
      />

      <Dropdown
        label={year === "Все" ? "Год" : year}
        value={year}
        options={YEAR_OPTIONS}
        onChange={onYearChange}
      />

      <Dropdown
        label={age === "Все" ? "Возраст" : `от ${age}`}
        value={age}
        options={ageOptions}
        onChange={onAgeChange}
      />

      <Dropdown
        label={sort}
        value={sort}
        options={SORT_OPTIONS}
        onChange={onSortChange}
        align="right"
        icon={
          <SlidersHorizontal
            aria-hidden
            className="h-3.5 w-3.5"
          />
        }
      />
    </div>
  );
}
