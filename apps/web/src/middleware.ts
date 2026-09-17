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
 * Проверяем здесь только ФАКТ наличия httpOnly JWT-cookie, которую
 * выставляет Payload при loginUser/createUser (имя по умолчанию —
 * payload-token; если в apps/cms/src/collections/users/config.ts задан
 * auth.cookies.name, поменяйте константу ниже соответственно).
 * Middleware не может провалидировать сам JWT (нет доступа к
 * PAYLOAD_SECRET в Edge-рантайме без лишних зависимостей), поэтому
 * это первый, быстрый фильтр — окончательную проверку прав всё равно
 * делает Payload при каждом GraphQL-запросе (access control в коллекциях).
 */

const AUTH_COOKIE_NAME = "payload-token";

const PROTECTED_PATHS = ["/profile", "/favorites"];

// Залогиненным незачем снова видеть формы входа/регистрации.
const GUEST_ONLY_PATHS = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isGuestOnly = GUEST_ONLY_PATHS.some((path) => pathname === path);
  if (isGuestOnly && hasSession) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/favorites/:path*", "/login", "/register"],
};
