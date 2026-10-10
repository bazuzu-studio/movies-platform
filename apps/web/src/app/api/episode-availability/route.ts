import { NextRequest, NextResponse } from "next/server";

import { getSeasonAvailability } from "@/lib/api";

/**
 * GET /api/episode-availability?season=<id сезона>
 *
 * Когда серии сезона впервые появились на сайте: { "<номер серии>": "<ISO-время>" }.
 * Серии без даты (загружены до появления поля) в ответ не попадают. Как и
 * /api/episode-sources, грузится лениво для открытого сезона, а ошибка (например,
 * в CMS ещё нет поля) не ломает страницу: отметки «новая» просто не показываются.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("season") ?? "";
  const seasonId = Number(raw);

  if (!/^\d{1,9}$/.test(raw) || !Number.isInteger(seasonId) || seasonId <= 0) {
    return NextResponse.json({ message: "Некорректный сезон" }, { status: 400 });
  }

  try {
    const availability = await getSeasonAvailability(seasonId);
    return NextResponse.json(availability, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error(`GET /api/episode-availability (season=${seasonId}) failed`, error);
    return NextResponse.json({ message: "Не удалось загрузить даты серий" }, { status: 502 });
  }
}
