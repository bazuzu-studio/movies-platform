import { useCallback, useEffect, useState } from "react";

import {
  RELEASE_STATUS_LABEL,
  parseReleaseStatus,
  type ReleaseStatus,
} from "@/lib/release-status";

// «По рейтингу» убран: API такой сортировки не поддерживает, а «Популярные»
// и так сортируются по рейтингу — пункт молча превращался в «Новинки».
export const SORT_OPTIONS = [
  "Популярные",
  "Новинки",
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

export const STATUS_OPTIONS = [
  "Все",
  RELEASE_STATUS_LABEL.ongoing,
  RELEASE_STATUS_LABEL.anons,
  RELEASE_STATUS_LABEL.released,
] as const;

export type StatusOption = (typeof STATUS_OPTIONS)[number];

/** Подпись фильтра -> значение release_status в API (undefined = без фильтра). */
export const STATUS_TO_API: Record<StatusOption, ReleaseStatus | undefined> = {
  Все: undefined,
  [RELEASE_STATUS_LABEL.ongoing]: "ongoing",
  [RELEASE_STATUS_LABEL.anons]: "anons",
  [RELEASE_STATUS_LABEL.released]: "released",
};

export const DEFAULT_YEAR: YearOption = "Все";
export const DEFAULT_AGE: AgeOption = "Все";
export const DEFAULT_STATUS: StatusOption = "Все";
export const DEFAULT_SORT: SortOption = "Новинки";

/** Значение ?status= из URL -> подпись фильтра. Неизвестное -> «Все». */
export const statusOptionFromUrl = (value: string | null): StatusOption => {
  const status = parseReleaseStatus(value);
  return status ? RELEASE_STATUS_LABEL[status] : DEFAULT_STATUS;
};

/** Подпись фильтра -> значение для ?status= (undefined = параметр не нужен). */
export const statusUrlValue = (option: StatusOption): ReleaseStatus | undefined =>
  STATUS_TO_API[option];

const SEARCH_DEBOUNCE_MS = 300;

const normalizeType = (value: string | null): TypeFilter => {
  if (value === "movie" || value === "series") {
    return value;
  }

  return "all";
};

interface UseCatalogFiltersOptions {
  initialType?: string | null;
  initialStatus?: string | null;
  hasNextPage?: boolean;
}

export function useCatalogFilters({
  initialType,
  initialStatus,
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
  const [status, setStatusState] = useState<StatusOption>(
    statusOptionFromUrl(initialStatus ?? null),
  );
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
   * Синхронизация статуса с URL (?status=ongoing).
   */
  useEffect(() => {
    setStatusState(statusOptionFromUrl(initialStatus ?? null));
  }, [initialStatus]);

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
    status !== DEFAULT_STATUS,
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

  const setStatus = useCallback(
    (value: StatusOption) => {
      setStatusState(value);
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
    setStatusState(DEFAULT_STATUS);
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

    status,
    setStatus,

    sort,
    setSort,

    searchVal,
    setSearch,

    resetFilters,

    hasNextPage,

    activeFilterCount,
  };
}
