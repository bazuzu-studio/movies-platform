"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ClientError } from "graphql-request";
import { gqlClient } from "@/lib/graphql-client";
import {
  LoginUserDocument,
  RegisterUserDocument,
  LogoutUserDocument,
  MeUserDocument,
} from "@/generated/graphql";
import type { AuthUser } from "@/lib/types";

/**
 * Аутентификация через Payload CMS GraphQL API.
 *
 * Сессия хранится в httpOnly JWT-cookie, которую выставляет Payload
 * при успешном loginUser / createUser (ТЗ, п.3.1, 6.1, 9).
 * localStorage больше НЕ используется — cookie httpOnly недоступна из JS,
 * поэтому единственный способ узнать, авторизован ли пользователь,
 * это спросить сервер (meUser) при монтировании провайдера.
 *
 * TODO:
 * - Проверить точные имена мутаций/запроса под вашу схему Payload
 *   (loginUser / createUser / logoutUser / meUser могут отличаться).
 * - Middleware (middleware.ts) для защиты серверных роутов должен
 *   проверять ту же cookie отдельно — этот контекст покрывает только клиент.
 * - Добавить refresh токена, если Payload его использует (refreshTokenUser).
 */

interface AuthContextValue {
  isLoggedIn: boolean;
  ready: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /**
   * TODO: обновление профиля должно идти через отдельную мутацию
   * (например, updateUser). Сейчас не реализовано на GraphQL —
   * заглушка оставлена для совместимости с существующими компонентами.
   */
  updateProfile: (data: { name: string; email: string }) => void;
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
          setUser(data.meUser?.user ?? null);
        }
      } catch {
        // Нет активной сессии — считаем пользователя неавторизованным.
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

  const login = async (email: string, password: string) => {
    try {
      const data = await gqlClient.request(LoginUserDocument, {
        email,
        password,
      });
      setUser(data.loginUser.user);
    } catch (error) {
      throw new Error(
        extractGraphQLErrorMessage(error, "Неверный email или пароль")
      );
    }
  };

  /**
   * Регистрация всегда создаёт пользователя с ролью "user" —
   * роль зашита в GraphQL-мутации (RegisterUserDocument), а не приходит
   * из формы. Даже если кто-то попытается передать role напрямую
   * через API в обход этой функции — сервер (Payload access control)
   * должен это отклонять или игнорировать.
   */
  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await gqlClient.request(RegisterUserDocument, {
        name,
        email,
        password,
      });
      // После регистрации Payload обычно сразу логинит пользователя
      // и ставит cookie — если это не так в вашей схеме, здесь нужно
      // дополнительно вызвать login(email, password).
      setUser(data.createUser);
    } catch (error) {
      throw new Error(
        extractGraphQLErrorMessage(error, "Не удалось создать аккаунт")
      );
    }
  };

  const logout = async () => {
    try {
      await gqlClient.request(LogoutUserDocument);
    } finally {
      // Даже если запрос не удался, сбрасываем локальное состояние —
      // cookie в худшем случае протухнет по exp.
      setUser(null);
    }
  };

  const updateProfile = (data: { name: string; email: string }) => {
    // TODO: заменить на GraphQL-мутацию updateUser, когда появится в схеме.
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const value: AuthContextValue = {
    isLoggedIn: ready && !!user,
    ready,
    user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}