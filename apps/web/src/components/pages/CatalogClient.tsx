"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, Check, Inbox, X } from "lucide-react";
import type { ContentItem, Genre } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";

const SORT_OPTIONS = ["Популярные", "Новинки", "По рейтингу", "По алфавиту"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];
const YEAR_OPTIONS = ["Все", "2024", "2023", "2022", "2021 и раньше"];
const RATING_OPTIONS = ["Все", "9+", "8+", "7+"];
const PER_PAGE = 15;

export function CatalogClient({ items, genres }: { items: ContentItem[]; genres: Genre[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");

  const [typeFilter, setTypeFilter] = useState<"all" | "movie" | "series">(
    initialType === "movie" ? "movie" : initialType === "series" ? "series" : "all"
  );
  const [genre, setGenre] = useState("Все");
  const [year, setYear] = useState("Все");
  const [rating, setRating] = useState("Все");
  const [sort, setSort] = useState<SortOption>("Популярные");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const filtered = useMemo(() => {
    let list = items.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (genre !== "Все" && !c.genres.includes(genre)) return false;
      if (year !== "Все") {
        if (year === "2021 и раньше" && c.releaseYear > 2021) return false;
        if (year !== "2021 и раньше" && c.releaseYear !== parseInt(year)) return false;
      }
      if (rating !== "Все" && c.rating < parseFloat(rating)) return false;
      if (
        searchVal &&
        !c.titleRu.toLowerCase().includes(searchVal.toLowerCase()) &&
        !c.titleEn.toLowerCase().includes(searchVal.toLowerCase())
      )
        return false;
      return true;
    });
    if (sort === "По рейтингу") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "По алфавиту") list = [...list].sort((a, b) => a.titleRu.localeCompare(b.titleRu));
    else if (sort === "Новинки") list = [...list].sort((a, b) => b.releaseYear - a.releaseYear);
    else list = [...list].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    return list;
  }, [items, typeFilter, genre, year, rating, sort, searchVal]);

  const paged = filtered.slice(0, page * PER_PAGE);
  const hasMore = paged.length < filtered.length;

  const setType = (v: "all" | "movie" | "series") => {
    setTypeFilter(v);
    setPage(1);
    router.replace(v === "all" ? "/catalog" : `/catalog?type=${v}`, { scroll: false });
  };

  const genreOptions = ["Все", ...genres.map((g) => g.title)];

  const FilterPanel = () => (
    <div className="flex flex-wrap gap-3">
      <div className="relative group">
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-[#A1A1AA] hover:border-white/16 hover:text-white transition-colors">
          <span>{genre === "Все" ? "Жанр" : genre}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="absolute top-full mt-1 left-0 bg-[#1A1A1D] border border-white/10 rounded-xl p-1.5 hidden group-focus-within:flex flex-col min-w-[140px] shadow-2xl z-30">
          {genreOptions.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                genre === g ? "text-white bg-white/8" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              )}
            >
              {g}
              {genre === g && <Check className="w-3.5 h-3.5 text-[#EF4A4F]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-[#A1A1AA] hover:border-white/16 hover:text-white transition-colors">
          <span>{year === "Все" ? "Год" : year}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="absolute top-full mt-1 left-0 bg-[#1A1A1D] border border-white/10 rounded-xl p-1.5 hidden group-focus-within:flex flex-col min-w-[160px] shadow-2xl z-30">
          {YEAR_OPTIONS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                year === y ? "text-white bg-white/8" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              )}
            >
              {y}
              {year === y && <Check className="w-3.5 h-3.5 text-[#EF4A4F]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group">
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-[#A1A1AA] hover:border-white/16 hover:text-white transition-colors">
          <span>{rating === "Все" ? "Рейтинг" : `от ${rating}`}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="absolute top-full mt-1 left-0 bg-[#1A1A1D] border border-white/10 rounded-xl p-1.5 hidden group-focus-within:flex flex-col min-w-[140px] shadow-2xl z-30">
          {RATING_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRating(r)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                rating === r ? "text-white bg-white/8" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              )}
            >
              {r === "Все" ? "Все" : `от ${r}`}
              {rating === r && <Check className="w-3.5 h-3.5 text-[#EF4A4F]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="relative group ml-auto">
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-[#A1A1AA] hover:border-white/16 hover:text-white transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{sort}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="absolute top-full mt-1 right-0 bg-[#1A1A1D] border border-white/10 rounded-xl p-1.5 hidden group-focus-within:flex flex-col min-w-[180px] shadow-2xl z-30">
          {SORT_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                sort === s ? "text-white bg-white/8" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
              )}
            >
              {s}
              {sort === s && <Check className="w-3.5 h-3.5 text-[#EF4A4F]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-6">Каталог</h1>

        <div className="relative mb-5">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] hidden" />
          <input
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              setPage(1);
            }}
            placeholder="Поиск фильмов и сериалов..."
            className="w-full bg-white/5 border border-white/8 rounded-xl pl-4 pr-4 py-3 text-sm text-white placeholder:text-[#71717A] outline-none focus:border-[#EF4A4F]/40 transition-colors"
          />
        </div>

        <div className="flex gap-1 p-1 bg-white/4 rounded-xl w-fit mb-5">
          {([["all", "Все"], ["movie", "Фильмы"], ["series", "Сериалы"]] as const).map(([v, l]) => (
            <button
              key={v}
              onClick={() => setType(v)}
              className={cn(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all",
                typeFilter === v ? "bg-white text-[#08080A] shadow-sm" : "text-[#71717A] hover:text-white"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="hidden sm:block">
          <FilterPanel />
        </div>

        <div className="sm:hidden">
          <Btn variant="outline" size="sm" onClick={() => setDrawerOpen(true)}>
            <SlidersHorizontal className="w-4 h-4" /> Фильтры
          </Btn>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-[#71717A]">
          Найдено: <span className="text-white font-semibold">{filtered.length}</span>
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Ничего не найдено"
          subtitle="Попробуйте изменить запрос или параметры фильтрации"
          action={{
            label: "Сбросить фильтры",
            onClick: () => {
              setGenre("Все");
              setYear("Все");
              setRating("Все");
              setSearchVal("");
            },
          }}
        />
      ) : (
        <>
          <ContentGrid items={paged} />
          {hasMore && (
            <div className="mt-10 text-center">
              <Btn variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
                Показать ещё
              </Btn>
            </div>
          )}
        </>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative bg-[#121214] rounded-t-2xl border-t border-white/10 p-6 pb-10 flex flex-col gap-5">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-white text-lg">Фильтры</p>
              <button onClick={() => setDrawerOpen(false)} className="p-1 text-[#71717A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            {["Жанр", "Год", "Рейтинг"].map((label, li) => {
              const options = li === 0 ? genreOptions : li === 1 ? YEAR_OPTIONS : RATING_OPTIONS;
              const current = li === 0 ? genre : li === 1 ? year : rating;
              const setter = li === 0 ? setGenre : li === 1 ? setYear : setRating;
              return (
                <div key={label}>
                  <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setter(opt)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                          current === opt
                            ? "bg-[#EF4A4F]/20 border-[#EF4A4F]/40 text-[#EF4A4F]"
                            : "border-white/8 text-[#71717A] hover:text-white"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <Btn className="mt-2" onClick={() => setDrawerOpen(false)}>
              Применить
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}
