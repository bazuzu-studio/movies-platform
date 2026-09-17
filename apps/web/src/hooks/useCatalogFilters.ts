import { useCallback, useEffect, useState } from "react";

export const SORT_OPTIONS = [
  "Популярные",
  "Новинки",
  "По рейтингу",
  "По алфавиту",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const YEAR_OPTIONS = [
  "Все",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021 и раньше",
] as const;

export type YearOption = (typeof YEAR_OPTIONS)[number];

export const AGE_OPTIONS = [
  "Все",
  "0+",
  "6+",
  "12+",
  "16+",
  "18+",
] as const;

export type AgeOption = (typeof AGE_OPTIONS)[number];

export type TypeFilter = "all" | "movie" | "series";

const DEFAULT_YEAR: YearOption = "Все";
const DEFAULT_AGE: AgeOption = "Все";
const DEFAULT_SORT: SortOption = "Новинки";

const SEARCH_DEBOUNCE_MS = 300;

const normalizeType = (value: string | null): TypeFilter => {
  if (value === "movie" || value === "series") {
    return value;
  }

  return "all";
};

interface UseCatalogFiltersOptions {
  initialType?: string | null;
  hasNextPage?: boolean;
}

export function useCatalogFilters({
  initialType,
  hasNextPage = false,
}: UseCatalogFiltersOptions = {}) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(
    normalizeType(initialType ?? null),
  );

  const [genre, setGenreState] = useState("Все");
  const [year, setYearState] =
    useState<YearOption>(DEFAULT_YEAR);
  const [age, setAgeState] =
    useState<AgeOption>(DEFAULT_AGE);
  const [sort, setSortState] =
    useState<SortOption>(DEFAULT_SORT);

  const [searchInput, setSearchInput] = useState("");
  const [searchVal, setSearchVal] = useState("");

  /**
   * Синхронизация типа с URL.
   */
  useEffect(() => {
    setTypeFilter(normalizeType(initialType ?? null));
  }, [initialType]);

  /**
   * Debounce поиска.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearchVal(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchInput]);

  const activeFilterCount = [
    genre !== "Все",
    year !== "Все",
    age !== "Все",
    typeFilter !== "all",
  ].filter(Boolean).length;

  const setType = useCallback(
    (value: TypeFilter) => {
      setTypeFilter(value);
    },
    [],
  );

  const setGenre = useCallback(
    (value: string) => {
      setGenreState(value);
    },
    [],
  );

  const setYear = useCallback(
    (value: YearOption) => {
      setYearState(value);
    },
    [],
  );

  const setAge = useCallback(
    (value: AgeOption) => {
      setAgeState(value);
    },
    [],
  );

  const setSort = useCallback(
    (value: SortOption) => {
      setSortState(value);
    },
    [],
  );

  const setSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setTypeFilter("all");
    setGenreState("Все");
    setYearState(DEFAULT_YEAR);
    setAgeState(DEFAULT_AGE);
    setSortState(DEFAULT_SORT);
    setSearchInput("");
    setSearchVal("");
  }, []);

  return {
    typeFilter,
    setType,

    genre,
    setGenre,

    year,
    setYear,

    age,
    setAge,

    sort,
    setSort,

    searchVal,
    setSearch,

    resetFilters,

    hasNextPage,

    activeFilterCount,
  };
}
