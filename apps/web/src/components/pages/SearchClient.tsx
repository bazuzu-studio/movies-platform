"use client";

import React, { useMemo, useState } from "react";
import { Search as SearchIcon, X, Inbox } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";

export function SearchClient({ items, initialQuery }: { items: ContentItem[]; initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return items.filter(
      (c) =>
        c.titleRu.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.genres.some((g) => g.toLowerCase().includes(q))
    );
  }, [items, query]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <h1 className="text-3xl font-black tracking-tight text-white mb-6">Поиск</h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов и сериалов..."
          className="w-full bg-white/5 border border-white/8 rounded-2xl pl-12 pr-5 py-4 text-base text-white placeholder:text-[#71717A] outline-none focus:border-[#EF4A4F]/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#71717A] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {query ? (
        <>
          <p className="text-sm text-[#71717A] mb-5">
            По запросу <span className="text-white font-semibold">«{query}»</span> найдено:{" "}
            <span className="text-white font-semibold">{results.length}</span>
          </p>
          {results.length === 0 ? (
            <EmptyState icon={Inbox} title="Ничего не найдено" subtitle="Попробуйте изменить запрос или параметры фильтрации" />
          ) : (
            <ContentGrid items={results} />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <SearchIcon className="w-12 h-12 text-[#3f3f46]" />
          <p className="text-[#71717A]">Введите название фильма или сериала</p>
        </div>
      )}
    </div>
  );
}
