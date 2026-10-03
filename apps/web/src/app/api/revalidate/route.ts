import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate — сброс кэша контента по запросу.
 *
 * Вызывается:
 *  - CMS из хуков afterChange/afterDelete (apps/cms/src/lib/revalidate.ts);
 *  - пайплайном после sync / update-ongoing (его прямые вставки в БД хуки
 *    Payload не запускают):
 *      curl -X POST -H "x-revalidate-secret: $REVALIDATE_SECRET" \
 *        https://otakuum.ru/api/revalidate
 *
 * Защита — общий секрет REVALIDATE_SECRET в заголовке x-revalidate-secret.
 * Если переменная не задана, роут отключён (503).
 */

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET?.trim();

  if (!expected) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 503 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? "";
  if (!secretsMatch(provided, expected)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Next 15: revalidateTag принимает один аргумент. Все серверные запросы
  // контента помечены тегом "content" (см. serverClient в src/lib/api.ts).
  revalidateTag("content");

  return NextResponse.json({ revalidated: true, tag: "content" });
}
