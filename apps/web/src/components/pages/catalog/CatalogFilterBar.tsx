"use client";

import { useState, type ReactNode } from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  AgeOption,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  YEAR_OPTIONS,
  type SortOption,
  type StatusOption,
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

  status: StatusOption;
  onStatusChange: (value: StatusOption) => void;

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
  searchable?: boolean; // если true — добавляем поиск
};

function SearchableDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  align = "left",
  icon,
  searchable = false,
}: DropdownProps<T>) {
  const [query, setQuery] = useState("");

  // Фильтруем опции по запросу (регистронезависимо)
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  const selected = value === "Все" ? "Все" : value;

  return (
    <div
      className={cn("group relative", align === "right" && "ml-auto")}
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
          align === "right" ? "right-0" : "left-0",
        )}
        role="listbox"
        aria-label={label}
      >
        {searchable && (
          <div className="w-full px-1">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full rounded-lg bg-white/5 py-1.5 px-2.5 text-xs text-[#A1A1AA] border border-white/8 focus:border-[#EF4A4F] focus:outline-none"
                aria-label="Поиск по списку"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <XCircle
                    aria-hidden
                    className="h-3 w-3 text-[#A1A1AA]"
                  />
                </button>
              )}
            </div>
          </div>
        )}

        <div
          className={cn(
            "max-h-[240px] overflow-y-auto",
            !searchable && "max-h-[320px]",
          )}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-xs text-[#6B6B72]">Ничего не найдено</div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setQuery(""); // сбрасываем поиск после выбора
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-white/8 text-white"
                      : "text-[#A1A1AA] hover:bg-white/5 hover:text-white",
                  )}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <Check
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 text-[#EF4A4F]"
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Панель фильтров каталога для десктопа.
 *
 * - жанр (теперь с поиском)
 * - год
 * - возраст
 * - статус релиза
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
  status,
  onStatusChange,
  sort,
  onSortChange,
}: Props) {
  const ageOptions = ["Все", "0+", "6+", "12+", "16+", "18+"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {/* Жанр — самый длинный список, включаем поиск */}
      <SearchableDropdown
        label={genre === "Все" ? "Жанр" : genre}
        value={genre}
        options={genreOptions}
        onChange={onGenreChange}
        searchable={true}
      />

      {/* Год — обычно не очень длинный, можно без поиска */}
      <SearchableDropdown
        label={year === "Все" ? "Год" : year}
        value={year}
        options={YEAR_OPTIONS}
        onChange={onYearChange}
      />

      {/* Возраст — короткий список, без поиска */}
      <SearchableDropdown
        label={age === "Все" ? "Возраст" : `от ${age}`}
        value={age}
        options={ageOptions}
        onChange={onAgeChange}
      />

      {/* Статус — короткий список */}
      <SearchableDropdown
        label={status === "Все" ? "Статус" : status}
        value={status}
        options={STATUS_OPTIONS}
        onChange={onStatusChange}
      />

      {/* Сортировка — короткий список, справа, с иконкой */}
      <SearchableDropdown
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
