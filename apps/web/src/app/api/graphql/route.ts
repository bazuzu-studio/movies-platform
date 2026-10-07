import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/graphql — прокси к GraphQL CMS для браузерных запросов
 * (вход/регистрация/профиль/избранное).
 *
 * Зачем: браузер общается только с otakuum.ru. Адрес CMS не виден клиенту,
 * не нужны CORS и third-party cookie, а cookie сессии (payload-token),
 * которую CMS присылает в Set-Cookie, сохраняется для самого сайта — её же
 * читает middleware.ts. Публичный каталог по-прежнему запрашивается
 * сервером напрямую (src/lib/api.ts).
 *
 * Пробрасываем только cookie и Content-Type; Origin подставляем свой — он
 * входит в CSRF-список CMS (FRONTEND_URL). Размер тела ограничен.
 */

export const dynamic = "force-dynamic";

const upstream =
  process.env.GRAPHQL_API_URL ??
  process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
  "http://localhost:4000/api/graphql";

const siteOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").origin;
  } catch {
    return undefined;
  }
})();

const MAX_BODY_BYTES = 64 * 1024;
const TIMEOUT_MS = 15_000;

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ errors: [{ message: "Unsupported Media Type" }] }, 415);
  }

  const body = await request.text();
  if (body.length > MAX_BODY_BYTES) {
    return json({ errors: [{ message: "Payload Too Large" }] }, 413);
  }

  const headers: Record<string, string> = { "content-type": "application/json" };
  const cookie = request.headers.get("cookie");
  if (cookie) headers.cookie = cookie;
  if (siteOrigin) headers.origin = siteOrigin;

  let response: Response;
  try {
    response = await fetch(upstream, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    console.error("POST /api/graphql: CMS недоступна", error);
    return json({ errors: [{ message: "Сервис временно недоступен, попробуйте позже" }] }, 502);
  }

  const out = new NextResponse(await response.text(), {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });

  // Несколько Set-Cookie (токен, сброс при выходе) нельзя склеивать в один заголовок.
  for (const setCookie of response.headers.getSetCookie()) {
    out.headers.append("set-cookie", setCookie);
  }

  return out;
}

// GET (в том числе GraphiQL/интроспекция) через прокси не отдаём.
export function GET() {
  return json({ errors: [{ message: "Method Not Allowed" }] }, 405);
}
