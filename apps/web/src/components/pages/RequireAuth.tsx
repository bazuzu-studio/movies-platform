"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthContext";

/**
 * Клиентская защита приватных страниц (ТЗ, п.3.1): редирект на /login,
 * если пользователь не авторизован. Это временное решение для
 * фронтенд-прототипа без backend — сессия проверяется в браузере.
 *
 * После подключения Payload CMS Auth правильнее перенести проверку на
 * сервер: читать httpOnly JWT-cookie в middleware.ts и редиректить ДО
 * рендера страницы, чтобы приватный контент не попадал в HTML для гостя.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Сюда доходим, только если middleware пропустил (cookie есть), а
    // meUser вернул гостя — т.е. сессия устарела. expired=1 говорит
    // middleware не гнать со страницы входа обратно (см. middleware.ts).
    if (ready && !isLoggedIn) {
      router.replace(`/login?expired=1&next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, isLoggedIn, router, pathname]);

  if (!ready || !isLoggedIn) return null;
  return <>{children}</>;
}
