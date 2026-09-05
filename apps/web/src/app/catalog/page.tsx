import type { Metadata } from "next";
import { Suspense } from "react";
import { getContentList, getGenres } from "@/lib/api";
import { CatalogClient } from "@/components/pages/CatalogClient";

export const metadata: Metadata = {
  title: "Каталог фильмов и сериалов",
  description: "Все фильмы и сериалы CineHub с фильтрами по жанру, году и рейтингу.",
};

export default async function CatalogPage() {
  const [items, genres] = await Promise.all([getContentList(), getGenres()]);

  return (
    <Suspense>
      <CatalogClient items={items} genres={genres} />
    </Suspense>
  );
}
