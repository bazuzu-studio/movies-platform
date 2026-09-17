"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  Inbox,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type { ContentItem, Genre } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { CatalogFilterBar } from "@/components/pages/catalog/CatalogFilterBar";
import { CatalogFilterDrawer } from "@/components/pages/catalog/CatalogFilterDrawer";
import {
  SORT_OPTIONS,
  YEAR_OPTIONS,
  type SortOption,
  type TypeFilter,
  type YearOption,
  useCatalogFilters,
} from "@/hooks/useCatalogFilters";
import { useCountUp } from "@/hooks/useCountUp";

const TYPE_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "movie", label: "Фильмы" },
  { value: "series", label: "Сериалы" },
] as const satisfies ReadonlyArray<{
  value: TypeFilter;
  label: string;
}>;

const SORT_MAP: Record<SortOption, string> = {
  Популярные: "popular",
  Новинки: "newest",
  "По рейтингу": "rating",
  "По алфавиту": "alphabetical",
};

const YEAR_MAP: Record<YearOption, string | undefined> = {
  Все: undefined,
  "2026": "2026",
  "2025": "2025",
  "2024": "2024",
  "2023": "2023",
  "2022": "2022",
  "2021 и раньше": "2021-or-earlier",
};

interface CatalogClientProps {
  items: ContentItem[];
  genres: Genre[];
  totalDocs?: number;
  hasNextPage?: boolean;
  type?: "movie" | "series";
}

interface ContentApiResponse {
  items: ContentItem[];
  totalDocs: number;
  hasNextPage: boolean;
}




export function CatalogClient({
  items: initialItems,
  genres,
  totalDocs: initialTotalDocs = initialItems.length,
  hasNextPage: initialHasNextPage = false,
  type: initialType,
}: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(initialTotalDocs);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const requestIdRef = useRef(0);

  const urlType = searchParams.get("type");

  const normalizedUrlType: TypeFilter =
    urlType === "movie" || urlType === "series" ? urlType : "all";

  const genreOptions = useMemo(
    () => ["Все", ...genres.map((item) => item.title)],
    [genres],
  );

  

  // Используем обновлённый hook: без items, без onLoadMore, без rating
  const {
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

    activeFilterCount,
  } = useCatalogFilters({
    initialType: urlType,
    hasNextPage,
  });

  /*
   * Серверные фильтры.
   * При любом изменении фильтра — сбрасываем на page 1 и полностью заменяем каталог.
   */
  useEffect(() => {
    const requestId = ++requestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("limit", "50");

        if (typeFilter === "movie" || typeFilter === "series") {
          params.set("type", typeFilter);
        }

        if (genre !== "Все") {
          params.set("genre", genre);
        }

        const apiYear = YEAR_MAP[year];
        if (apiYear) {
          params.set("year", apiYear);
        }

        // Возраст передаётся как ?age=12 (число без плюса)
        if (age !== "Все") {
          // Убираем '+' из значения (например, "12+" → "12")
          const ageValue = age.replace("+", "");
          params.set("age", ageValue);
        }

        params.set("sort", SORT_MAP[sort]);

        if (searchVal) {
          params.set("search", searchVal);
        }

        const response = await fetch(`/api/content?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Content request failed: ${response.status}`);
        }

        const data = (await response.json()) as ContentApiResponse;

        // Не применяем результат устаревшего запроса
        if (requestId !== requestIdRef.current) {
          return;
        }

        setItems(data.items);
        setCurrentPage(1);
        setTotalDocs(data.totalDocs);
        setHasNextPage(data.hasNextPage);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.error("CatalogClient: failed to load filtered content", error);
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [typeFilter, genre, year, age, sort, searchVal]);

  /*
   * Синхронизация первоначальных props при смене type через URL.
   */
  const previousInitialTypeRef = useRef(initialType);

  useEffect(() => {
    if (previousInitialTypeRef.current === initialType) {
      return;
    }

    previousInitialTypeRef.current = initialType;

    setItems(initialItems);
    setCurrentPage(1);
    setTotalDocs(initialTotalDocs);
    setHasNextPage(initialHasNextPage);
  }, [initialItems, initialTotalDocs, initialHasNextPage, initialType]);

  /*
   * Загрузка следующей страницы с текущими фильтрами.
   */
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || loading || !hasNextPage) {
      return;
    }

    const nextPage = currentPage + 1;
    const requestId = requestIdRef.current;

    try {
      setLoadingMore(true);

      const params = new URLSearchParams();
      params.set("page", String(nextPage));
      params.set("limit", "50");

      if (typeFilter === "movie" || typeFilter === "series") {
        params.set("type", typeFilter);
      }

      if (genre !== "Все") {
        params.set("genre", genre);
      }

      const apiYear = YEAR_MAP[year];
      if (apiYear) {
        params.set("year", apiYear);
      }

      if (age !== "Все") {
        const ageValue = age.replace("+", "");
        params.set("age", ageValue);
      }

      params.set("sort", SORT_MAP[sort]);

      if (searchVal) {
        params.set("search", searchVal);
      }

      const response = await fetch(`/api/content?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Content request failed: ${response.status}`);
      }

      const data = (await response.json()) as ContentApiResponse;

      if (requestId !== requestIdRef.current) {
        return;
      }

      setItems((currentItems) => {
        const existingIds = new Set(currentItems.map((item) => String(item.id)));
        const newItems = data.items.filter((item) => !existingIds.has(String(item.id)));

        return [...currentItems, ...newItems];
      });

      setCurrentPage(nextPage);
      setTotalDocs(data.totalDocs);
      setHasNextPage(data.hasNextPage);
    } catch (error) {
      console.error("CatalogClient: failed to load more", error);
    } finally {
      setLoadingMore(false);
    }
  }, [
    currentPage,
    genre,
    hasNextPage,
    loading,
    loadingMore,
    searchVal,
    sort,
    typeFilter,
    year,
    age,
  ]);

  const updateTypeInUrl = useCallback(
    (value: TypeFilter) => {
      setType(value);
      setCurrentPage(1);

      const params = new URLSearchParams(searchParams.toString());

      if (value === "all") {
        params.delete("type");
      } else {
        params.set("type", value);
      }

      const query = params.toString();

      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams, setType],
  );

  const handleReset = useCallback(() => {
    resetFilters();
    setType("all");
    setCurrentPage(1);

    router.push(pathname, { scroll: false });
  }, [pathname, resetFilters, router, setType]);

  const visibleItems = items;
  const hasMore = hasNextPage && !loading;

  const prevTotalDocsRef = React.useRef<number | null>(null);

  // Если totalDocs обновился — сбрасываем prevRef, чтобы анимация пошла от старого к новому
  React.useEffect(() => {
    prevTotalDocsRef.current = totalDocs;
  }, [totalDocs]);

  const from = prevTotalDocsRef.current ?? 0;
  const displayedTotal = useCountUp(from, totalDocs, 600);
  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-24 pb-24 sm:px-6 lg:px-8 md:pb-8">
      <div className="mb-6">
        <h1 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Каталог
        </h1>

        {/* Поиск */}
        <div className="relative mb-5">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]"
          />

          <input
            value={searchVal}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск фильмов и сериалов..."
            aria-label="Поиск фильмов и сериалов"
            className="w-full rounded-xl border border-white/8 bg-white/5 py-3 pl-11 pr-10 text-sm text-white outline-none transition-colors placeholder:text-[#71717A] focus:border-[#EF4A4F]/40 focus:bg-white/[0.07]"
          />

          {searchVal && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#71717A] transition-colors hover:text-white"
              aria-label="Очистить поиск"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Тип */}
        <div
          className="mb-5 inline-flex gap-1 rounded-xl bg-white/[0.04] p-1"
          role="tablist"
          aria-label="Тип контента"
        >
          {TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={typeFilter === option.value}
              onClick={() => updateTypeInUrl(option.value)}
              className={cn(
                "rounded-lg px-5 py-2 text-sm font-medium transition-all duration-200",
                typeFilter === option.value
                  ? "bg-white text-[#08080A] shadow-sm"
                  : "text-[#71717A] hover:text-white",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Desktop filters */}
        <div className="hidden sm:block">
          <CatalogFilterBar
            genreOptions={genreOptions}
            genre={genre}
            onGenreChange={setGenre}
            year={year}
            onYearChange={setYear}
            age={age}
            onAgeChange={setAge}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        {/* Mobile filters */}
        <div className="flex items-center gap-3 sm:hidden">
          <Btn
            variant="outline"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Фильтры
          </Btn>

          {activeFilterCount > 0 && (
            <span
              className="h-2 w-2 animate-pulse rounded-full bg-[#EF4A4F]"
              aria-label={`Активных фильтров: ${activeFilterCount}`}
            />
          )}
        </div>
      </div>

      {/* Results count totalDocs*/}
      <div className="mb-5 flex items-center justify-between">
    <p className="text-sm text-[#71717A]">
      Найдено:{" "}
      <span className="font-semibold text-white">{displayedTotal}</span>
    </p>


        {(searchVal || activeFilterCount > 0) && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-[#A1A1AA] transition-colors hover:text-white"
          >
            Сбросить
          </button>
        )}
      </div>

      {/* Results */}
      {loading && visibleItems.length === 0 ? (
        <ContentGrid items={[]} loading />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Ничего не найдено"
          subtitle="Попробуйте изменить запрос или параметры фильтрации"
          action={{
            label: "Сбросить фильтры",
            onClick: handleReset,
          }}
        />
      ) : (
        <>
          <ContentGrid items={visibleItems} />

          {hasMore && (
            <div className="mt-10 text-center">
              <Btn
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? "Загрузка..." : "Показать ещё"}
              </Btn>
            </div>
          )}
        </>
      )}

      {/* Mobile drawer */}
      <CatalogFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        genreOptions={genreOptions}
        genre={genre}
        onGenreChange={setGenre}
        year={year}
        onYearChange={setYear}
        age={age}
        onAgeChange={setAge}
      />
    </div>
  );
}
