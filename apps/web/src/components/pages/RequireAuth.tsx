"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
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

  useEffect(() => {
    if (ready && !isLoggedIn) router.replace("/login");
  }, [ready, isLoggedIn, router]);

  if (!ready || !isLoggedIn) return null;
  return <>{children}</>;
}
