"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ClientError } from "graphql-request";
import { gqlClient } from "@/lib/graphql-client";
import {
  LoginUserDocument,
  RegisterUserDocument,
  LogoutUserDocument,
  MeUserDocument,
  UpdateUserDocument,
} from "@/generated/graphql";
import type { AuthUser, UserRole } from "@/lib/types";

/**
 * GraphQL-схема Payload делает почти все поля nullable по умолчанию
 * (name/email могут быть null для ещё не полностью заполненной записи,
 * roles — null, если поле не задано). AuthUser на фронте описывает
 * "чистую" модель без null, поэтому любой ответ сервера нормализуем
 * через эту функцию, а не полагаемся на то, что сервер всегда пришлёт
 * непустые значения.
 */
function toAuthUser(
  raw: { id: number | string; name?: string | null; email?: unknown; roles?: readonly UserRole[] | null } | null | undefined
): AuthUser | null {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name ?? "",
    email: typeof raw.email === "string" ? raw.email : "",
    roles: raw.roles ? [...raw.roles] : [],
  };
}

/**
 * Аутентификация через Payload CMS GraphQL API.
 *
 * Сессия хранится в httpOnly JWT-cookie, которую выставляет Payload
 * при успешном loginUser / createUser (ТЗ, п.3.1, 6.1, 9).
 * localStorage больше НЕ используется — cookie httpOnly недоступна из JS,
 * поэтому единственный способ узнать, авторизован ли пользователь,
 * это спросить сервер (meUser) при монтировании провайдера.
 *
 * Серверная защита приватных роутов (/profile, /favorites) дополнительно
 * реализована в middleware.ts — этот контекст покрывает только клиент.
 */

interface AuthContextValue {
  isLoggedIn: boolean;
  ready: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * Обновляет имя/email и, опционально, пароль через мутацию updateUser.
   * Пустая строка/undefined у password означает "не менять пароль".
   */
  updateProfile: (data: { name: string; email: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Достаём человекочитаемое сообщение об ошибке из ответа GraphQL.
 * Payload обычно кладёт текст в errors[0].message.
 */
function extractGraphQLErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ClientError) {
    return error.response.errors?.[0]?.message ?? fallback;
  }
  return fallback;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  /**
   * При монтировании спрашиваем у сервера, есть ли активная сессия
   * (cookie отправляется автоматически благодаря credentials: 'include').
   */
useEffect(() => {
  let cancelled = false;

  async function checkSession() {
    try {
      const data = await gqlClient.request(MeUserDocument);
      if (!cancelled) {
        setUser(toAuthUser(data.meUser?.user));
      }
    } catch {
      // Нет активной сессии — это ожидаемый случай для гостя, не ошибка.
      if (!cancelled) setUser(null);
    } finally {
      if (!cancelled) setReady(true);
    }
  }

  checkSession();
  return () => {
    cancelled = true;
  };
}, []);

const login = useCallback(async (email: string, password: string) => {
  try {
    const data = await gqlClient.request(LoginUserDocument, {
      email,
      password,
    });
    if (!data.loginUser) {
      throw new Error("Неверный email или пароль");
    }
    setUser(toAuthUser(data.loginUser.user));
  } catch (error) {
    throw new Error(
      extractGraphQLErrorMessage(error, "Неверный email или пароль")
    );
  }
}, []);

  /**
   * Регистрация всегда создаёт пользователя с ролью "user" —
   * роль зашита в GraphQL-мутации (RegisterUserDocument), а не приходит
   * из формы. Даже если кто-то попытается передать role напрямую
   * через API в обход этой функции — сервер (Payload access control)
   * должен это отклонять или игнорировать.
   */
  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const data = await gqlClient.request(RegisterUserDocument, {
        name,
        email,
        password,
      });
      // После регистрации Payload обычно сразу логинит пользователя
      // и ставит cookie — если это не так в вашей схеме, здесь нужно
      // дополнительно вызвать login(email, password).
      setUser(toAuthUser(data.createUser));
    } catch (error) {
      throw new Error(
        extractGraphQLErrorMessage(error, "Не удалось создать аккаунт")
      );
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await gqlClient.request(LogoutUserDocument);
    } finally {
      // Даже если запрос не удался, сбрасываем локальное состояние —
      // cookie в худшем случае протухнет по exp.
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(
    async (data: { name: string; email: string; password?: string }) => {
      if (!user) return;
      try {
        const result = await gqlClient.request(UpdateUserDocument, {
          id: Number(user.id),
          name: data.name,
          email: data.email,
          // Пустую строку не отправляем — это означало бы "стереть пароль".
          password: data.password ? data.password : undefined,
        });
        setUser((prev) => {
          if (!prev) return prev;
          const updated = toAuthUser({ ...prev, ...result.updateUser });
          return updated ?? prev;
        });
      } catch (error) {
        throw new Error(
          extractGraphQLErrorMessage(error, "Не удалось обновить профиль")
        );
      }
    },
    [user]
  );

  // Мемоизация: без неё объект value пересоздаётся на каждый рендер
  // AuthProvider, и все потребители useAuth() (Header, MovieCard,
  // HeroSection и т. д. — их десятки на странице) ре-рендерятся вхолостую.
  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: ready && !!user,
      ready,
      user,
      login,
      register,
      logout,
      updateProfile,
    }),
    [ready, user, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}