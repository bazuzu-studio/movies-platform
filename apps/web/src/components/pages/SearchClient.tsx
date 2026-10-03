"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, X, Inbox } from "lucide-react";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { ContentItem } from "@/lib/types";

/**
 * Поиск по коллекции Content через /api/content?search=… (серверный роут
 * фронтенда, см. src/app/api/content/route.ts). Раньше искали в индексе
 * search-results плагина @payloadcms/plugin-search и добирали полные записи
 * вторым запросом; но прямые вставки пайплайна в БД обходят хуки плагина, и
 * импортированные тайтлы в индекс не попадали. Теперь поиск не зависит от
 * индекса, идёт одним запросом, а ответ кэшируется на стороне Next.
 *
 * Debounce 400мс — не долбим сервер запросом на каждое нажатие клавиши.
 * Текущий запрос синхронизируется с URL (?q=...), чтобы результаты поиска
 * можно было передать по ссылке и работала кнопка "назад" в браузере.
 */
interface SearchApiResponse {
  items: ContentItem[];
  totalDocs: number;
}

async function fetchSearch(query: string, signal?: AbortSignal): Promise<SearchApiResponse> {
  const params = new URLSearchParams({ search: query, limit: "50" });
  const response = await fetch(`/api/content?${params.toString()}`, { signal });
  if (!response.ok) throw new Error(`Search request failed: ${response.status}`);
  return (await response.json()) as SearchApiResponse;
}

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebouncedValue(query, 400);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    // history.replaceState вместо router.replace: тот заново запрашивал
    // страницу у сервера на каждый ввод и мигал скелетоном загрузки.
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/search?${qs}` : "/search");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const trimmedQuery = debouncedQuery.trim();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search-content", trimmedQuery],
    queryFn: ({ signal }) => fetchSearch(trimmedQuery, signal),
    enabled: trimmedQuery.length > 0,
    staleTime: 30_000,
  });

  const results = useMemo(() => data?.items ?? [], [data]);
  const showLoading = isLoading || (isFetching && trimmedQuery !== query.trim());

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <h1 className="text-3xl font-black tracking-tight text-white mb-6">Поиск</h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E98]" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск фильмов и сериалов..."
          className="w-full bg-white/5 border border-white/8 rounded-2xl pl-12 pr-5 py-4 text-base text-white placeholder:text-[#8E8E98] outline-none focus:border-[#EF4A4F]/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#8E8E98] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {trimmedQuery ? (
        showLoading ? (
          <p className="text-sm text-[#8E8E98]">Ищем...</p>
        ) : (
          <>
            <p className="text-sm text-[#8E8E98] mb-5">
              По запросу <span className="text-white font-semibold">«{trimmedQuery}»</span> найдено:{" "}
              <span className="text-white font-semibold">{results.length}</span>
            </p>
            {results.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="Ничего не найдено"
                subtitle="Попробуйте изменить запрос или параметры фильтрации"
              />
            ) : (
              <ContentGrid items={results} />
            )}
          </>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
          <SearchIcon className="w-12 h-12 text-[#6B6B75]" />
          <p className="text-[#8E8E98]">Введите название фильма или сериала</p>
        </div>
      )}
    </div>
  );
}