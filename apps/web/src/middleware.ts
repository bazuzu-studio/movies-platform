import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Серверная защита приватных роутов.
 *
 * AuthContext (см. components/providers/AuthContext.tsx) проверяет сессию
 * только на клиенте — этого достаточно для UI, но не для защиты самого
 * роута: без middleware страница /profile какое-то время рендерится
 * пустой/с флэшем контента до ответа meUser, а прямой SSR-запрос вообще
 * не видит авторизацию.
 *
 * Здесь проверяется только ПРАВДОПОДОБНОСТЬ сессии: наличие cookie с
 * JWT-структурой и непросроченным `exp`. Подпись НЕ проверяется (нет доступа
 * к PAYLOAD_SECRET в Edge-рантайме), поэтому это быстрый фильтр, а не
 * граница безопасности — окончательную проверку прав всё равно делает
 * Payload при каждом GraphQL-запросе (access control в коллекциях).
 *
 * Имя cookie — payload-token (по умолчанию в Payload); если в
 * apps/cms/src/collections/users/config.ts задан auth.cookies.name,
 * поменяйте константу ниже и в src/app/api/graphql/route.ts.
 *
 * ВАЖНО: оставьте только ЭТОТ файл (apps/web/src/middleware.ts). Копию
 * apps/web/middleware.ts удалите — при наличии src/ Next её не читает.
 */

const AUTH_COOKIE_NAME = "payload-token";

const PROTECTED_PATHS = ["/profile", "/favorites"];

// Залогиненным незачем снова видеть формы входа/регистрации.
const GUEST_ONLY_PATHS = ["/login", "/register"];

/**
 * Cookie похожа на живой JWT: три base64url-сегмента, в payload число `exp`
 * в будущем. Мусор вроде "x" или истёкший токен не считается сессией —
 * пользователь сразу уходит на /login, без «мигания» защищённой страницы.
 */
function hasPlausibleSession(token: string | undefined): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3 || parts.some((p) => p.length === 0)) return false;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded)) as { exp?: unknown };

    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = hasPlausibleSession(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (isProtected && !hasSession) {
    // clone() вместо new URL(..., request.url): за reverse proxy host в
    // request.url может оказаться внутренним (0.0.0.0:3000).
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    // Относительный путь (+query); на клиенте его дополнительно чистит safeNextPath.
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const isGuestOnly = GUEST_ONLY_PATHS.some((path) => pathname === path);
  // ?expired=1 ставит RequireAuth, когда cookie есть, а сервер сессию не
  // признал (токен отозван или сменился PAYLOAD_SECRET). Без этого исключения
  // /login → /profile → /login?… зацикливались бы бесконечно.
  const sessionExpired = request.nextUrl.searchParams.has("expired");
  if (isGuestOnly && hasSession && !sessionExpired) {
    const profileUrl = request.nextUrl.clone();
    profileUrl.pathname = "/profile";
    profileUrl.search = "";
    return NextResponse.redirect(profileUrl);
  }

  const response = NextResponse.next();
  if (isProtected) {
    // Страницы с данными пользователя не должны оседать в общих кэшах.
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/favorites/:path*", "/login", "/register"],
};