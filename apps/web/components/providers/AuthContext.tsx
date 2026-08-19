"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthUser } from "@/lib/types";

/**
 * Временная реализация аутентификации на localStorage.
 *
 * Это ТОЛЬКО фронтенд-заглушка для прототипа. В боевой версии (ТЗ, п.3.1, 6.1, 9)
 * сессия хранится в httpOnly JWT-cookie, которую выставляет Payload CMS через
 * POST /api/users/login, а не в localStorage. Когда backend будет готов:
 *   - login()/register()/logout() → fetch к /api/users/login, /api/users, /api/users/logout;
 *   - isLoggedIn нужно будет проверять на сервере (например, в middleware.ts
 *     или через чтение cookie в Server Component), а не только на клиенте.
 */

interface AuthContextValue {
  isLoggedIn: boolean;
  ready: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (data: { name: string; email: string }) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "cinehub:auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // игнорируем — считаем пользователя не авторизованным
    }
    setHydrated(true);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextValue = {
    isLoggedIn: hydrated && !!user,
    ready: hydrated,
    user,
    login: (email) => persist({ name: "Алексей Морозов", email }),
    register: (name, email) => persist({ name, email }),
    logout: () => persist(null),
    updateProfile: (data) => persist({ ...(user as AuthUser), ...data }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
