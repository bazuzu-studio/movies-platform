import { NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/client-ip";

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
 * Защита:
 *  - принимаем только same-origin запросы (Sec-Fetch-Site / Origin): прокси
 *    сам подставляет Origin сайта для CSRF-проверки CMS, поэтому без этой
 *    проверки «чужой» Origin от браузера терялся бы;
 *  - пробрасываем только cookie payload-token (не весь заголовок Cookie),
 *    Content-Type и IP клиента (x-forwarded-for);
 *  - размер тела ограничен в БАЙТАХ и проверяется до полного чтения.
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

// Должно совпадать с AUTH_COOKIE_NAME в middleware.ts.
const AUTH_COOKIE_NAME = "payload-token";

const MAX_BODY_BYTES = 64 * 1024;
const TIMEOUT_MS = 15_000;

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Запрос пришёл с нашего же сайта (а не с чужой страницы / сторонним клиентом из браузера). */
function isSameOrigin(request: NextRequest): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";

  // Старые браузеры без Sec-Fetch-*: сверяем хост Origin с хостом запроса
  // (так работает и www.otakuum.ru, если он обслуживается тем же сервисом).
  const origin = request.headers.get("origin");
  if (!origin) return true; // не браузерный клиент (curl, SSR) — cookie-CSRF невозможен

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Читает тело с жёстким лимитом в байтах; null — лимит превышен. */
async function readBodyLimited(request: NextRequest, maxBytes: number): Promise<string | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }

  return Buffer.concat(chunks).toString("utf8");
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ errors: [{ message: "Forbidden" }] }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ errors: [{ message: "Unsupported Media Type" }] }, 415);
  }

  const body = await readBodyLimited(request, MAX_BODY_BYTES);
  if (body === null) {
    return json({ errors: [{ message: "Payload Too Large" }] }, 413);
  }

  const headers: Record<string, string> = {
    "content-type": "application/json",
    // Настоящий IP посетителя (для логов/лимитов на стороне CMS).
    "x-forwarded-for": getClientIp(request),
  };

  // Только сессионная cookie: остальные cookie сайта в CMS не нужны.
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (token) headers.cookie = `${AUTH_COOKIE_NAME}=${token}`;
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