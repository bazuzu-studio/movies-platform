import { NextRequest, NextResponse } from "next/server";

import {
  getContentList,
  type ContentListFilters,
  type ContentSort,
} from "@/lib/api";
import { RELEASE_STATUSES } from "@/lib/release-status";
import { isValidYearFilter } from "@/lib/api";

const SORT_VALUES: ContentSort[] = [
  "popular",
  "newest",
  "alphabetical",
];

// Возраст передаётся как число без плюса: 0, 6, 12, 16, 18
const AGE_VALUES = ["0", "6", "12", "16", "18"] as const;

function getPositiveInt(
  value: string | null,
  fallback: number,
) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0
    ? parsed
    : fallback;
}

function getOptionalValue<T extends string>(
  value: string | null,
  values: readonly T[],
): T | undefined {
  if (!value) {
    return undefined;
  }

  return values.includes(value as T)
    ? (value as T)
    : undefined;
}

function getOptionalString(
  value: string | null,
): string | undefined {
  const normalized = value?.trim();

  return normalized || undefined;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = getPositiveInt(
      searchParams.get("page"),
      1,
    );

    const limit = Math.min(
      getPositiveInt(
        searchParams.get("limit"),
        50,
      ),
      50,
    );

    const typeParam = searchParams.get("type");

    const type =
      typeParam === "movie" || typeParam === "series"
        ? typeParam
        : undefined;

    /*
     * Жанр передаётся как строка (title или slug).
     * Преобразование в relationship ID выполняется внутри getContentList().
     */
    const genre = getOptionalString(
      searchParams.get("genre"),
    );

    const search = getOptionalString(
      searchParams.get("search"),
    );

    // "2025" или "2021-or-earlier"; всё остальное игнорируется.
    const yearParam = getOptionalString(searchParams.get("year"));
    const year =
      yearParam && isValidYearFilter(yearParam) ? yearParam : undefined;

    // Возраст приходит как строка "12" (без плюса), валидируем по списку
    const age = getOptionalValue(
      searchParams.get("age"),
      AGE_VALUES,
    );

    const status = getOptionalValue(
      searchParams.get("status"),
      RELEASE_STATUSES,
    );

    const sort =
      getOptionalValue(
        searchParams.get("sort"),
        SORT_VALUES,
      ) ?? "newest";

    const filters: ContentListFilters = {
      type,
      genre,
      year,
      age,
      status,
      search,
      sort,
    };

    const result = await getContentList(
      page,
      limit,
      filters,
    );

    return NextResponse.json(result, {
      headers: {
        // Данные и так кэшируются в Next (revalidate 60 + тег content);
        // даём то же самое CDN/браузеру.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error(
      "GET /api/content failed",
      error,
    );

    return NextResponse.json(
      {
        message: "Не удалось загрузить каталог",
      },
      {
        status: 500,
      },
    );
  }
}
