import type { Metadata } from "next";
import { SearchClient } from "@/components/pages/SearchClient";

export const metadata: Metadata = {
  title: "Поиск",
  robots: { index: false },
};

/**
 * Поиск теперь идёт через коллекцию search-results
 * (плагин @payloadcms/plugin-search) прямо на клиенте —
 * SearchClient сам делает GraphQL-запрос по мере ввода (с debounce),
 * а не получает весь каталог заранее.
 *
 * getContentList() здесь больше не нужен: раньше он тянул ВЕСЬ
 * список контента на сервере ради последующей фильтрации в памяти
 * на клиенте — при росте каталога это не масштабируется и лишний
 * раз раздувает HTML при первой загрузке страницы поиска.
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return <SearchClient initialQuery={q ?? ""} />;
}