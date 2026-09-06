"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, X, Inbox } from "lucide-react";
import { gqlClient } from "@/lib/graphql-client";
import { SearchContentDocument } from "@/generated/graphql";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

/**
 * Поиск через коллекцию search-results (плагин @payloadcms/plugin-search),
 * а не через фильтрацию всего каталога на клиенте (прошлая версия получала
 * ВЕСЬ список items пропом и фильтровала в памяти — не масштабируется).
 *
 * Debounce 400мс — не долбим сервер запросом на каждое нажатие клавиши.
 * Текущий запрос синхронизируется с URL (?q=...) через router.replace,
 * чтобы результаты поиска можно было передать по ссылке и работала
 * кнопка "назад" в браузере.
 *
 * TODO:
 * - На Postgres plugin-search не даёт полнотекстового ранжирования
 *   "из коробки" — это по сути contains-фильтр по денормализованной
 *   коллекции. Если понадобится релевантность/опечатки — потребуется
 *   отдельный tsvector + GIN-индекс поверх search-results.
 */
export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
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
    router.replace(`/search?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const trimmedQuery = debouncedQuery.trim();

const { data, isLoading, isFetching } = useQuery({
  queryKey: ["search-content", trimmedQuery],
  queryFn: () =>
    gqlClient.request(SearchContentDocument, {
      where: {
        OR: [
          { title: { contains: trimmedQuery } },
          { titleEn: { contains: trimmedQuery } },
        ],
      },
    }),
  enabled: trimmedQuery.length > 0,
  staleTime: 10_000,
});
console.log(data);


  const results = data?.SearchResults.docs ?? [];
  const showLoading = isLoading || (isFetching && trimmedQuery !== query.trim());

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

      {trimmedQuery ? (
        showLoading ? (
          <p className="text-sm text-[#71717A]">Ищем...</p>
        ) : (
          <>
            <p className="text-sm text-[#71717A] mb-5">
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
          <SearchIcon className="w-12 h-12 text-[#3f3f46]" />
          <p className="text-[#71717A]">Введите название фильма или сериала</p>
        </div>
      )}
    </div>
  );
}