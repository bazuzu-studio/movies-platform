import { NextRequest, NextResponse } from "next/server";

import {
  getContentList,
  type ContentListFilters,
  type ContentSort,
} from "@/lib/api";

const SORT_VALUES: ContentSort[] = [
  "popular",
  "newest",
  // "rating",  // убрали, так как больше не используется
  "alphabetical",
];

const YEAR_VALUES = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021-or-earlier",
] as const;

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

    const year = getOptionalValue(
      searchParams.get("year"),
      YEAR_VALUES,
    );

    // Возраст приходит как строка "12" (без плюса), валидируем по списку
    const age = getOptionalValue(
      searchParams.get("age"),
      AGE_VALUES,
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
      age,          // добавили
      // rating,     // убрали
      search,
      sort,
    };

    const result = await getContentList(
      page,
      limit,
      filters,
    );

    return NextResponse.json(result);
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
