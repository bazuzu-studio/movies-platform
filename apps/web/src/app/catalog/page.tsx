
import type { Metadata } from "next";
import { Suspense } from "react";

import {
  getContentList,
  getGenres,
} from "@/lib/api";
import { CatalogClient } from "@/components/pages/CatalogClient";
import { parseReleaseStatus } from "@/lib/release-status";

export const metadata: Metadata = {
  title: "Каталог фильмов и сериалов",
  description:
    "Все фильмы и сериалы otakuum с фильтрами по жанру, году, возрасту и статусу выхода.",
};

interface Props {
  searchParams: Promise<{
    type?: string;
    /** anons / ongoing / released */
    status?: string;
  }>;
}

export default async function CatalogPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const type =
    params.type === "movie" ||
    params.type === "series"
      ? params.type
      : undefined;

  const status = parseReleaseStatus(params.status);

  const [content, genres] =
    await Promise.all([
      getContentList(1, 50, {
        type,
        status,
        sort: "newest",
      }),
      getGenres(),
    ]);

  return (
    <Suspense fallback={null}>
      <CatalogClient
        items={content.items}
        totalDocs={content.totalDocs}
        hasNextPage={content.hasNextPage}
        genres={genres}
        type={type}
        status={status}
      />
    </Suspense>
  );
}

