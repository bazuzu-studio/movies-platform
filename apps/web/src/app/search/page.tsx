import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { SearchClient } from "@/components/pages/SearchClient";

export const metadata: Metadata = {
  title: "Поиск",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const items = await getContentList();

  return <SearchClient items={items} initialQuery={q ?? ""} />;
}
