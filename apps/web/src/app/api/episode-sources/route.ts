import { NextRequest, NextResponse } from "next/server";

import { getSeasonSources } from "@/lib/api";

/**
 * GET /api/episode-sources?season=<id сезона>
 *
 * Ссылки на плеер всех озвучек для серий сезона: { "<номер серии>": [{ slug, title, url }] }.
 * Страница сериала запрашивает их лениво, для открытого сезона, чтобы не
 * раздувать HTML франшизы с сотнями серий. Ошибка здесь не ломает страницу:
 * без ответа сайт просто не показывает выбор озвучки.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("season") ?? "";
  const seasonId = Number(raw);

  if (!/^\d{1,9}$/.test(raw) || !Number.isInteger(seasonId) || seasonId <= 0) {
    return NextResponse.json({ message: "Некорректный сезон" }, { status: 400 });
  }

  try {
    const sources = await getSeasonSources(seasonId);
    return NextResponse.json(sources, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error(`GET /api/episode-sources (season=${seasonId}) failed`, error);
    return NextResponse.json({ message: "Не удалось загрузить озвучки" }, { status: 502 });
  }
}
