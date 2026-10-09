"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { AuthField } from "@/components/ui/AuthField";
import { useAuth } from "@/components/providers/AuthContext";
import { safeNextPath } from "@/lib/safe-redirect";

export function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) {
      setError("Заполните все поля");
      return;
    }

    setIsSubmitting(true);
    try {
      // login() ходит в GraphQL (loginUser) и выставляет httpOnly cookie
      // на стороне Payload — см. AuthContext.tsx
      await login(email.trim(), pass);
      toast.success("Добро пожаловать!");
      // Возвращаем на страницу, с которой выбросило на вход (?next=…).
      // Принимаем только относительный путь на этом же сайте.
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неверный email или пароль");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">С возвращением</h1>
      <p className="text-sm text-[#8E8E98] mb-6">Войдите, чтобы продолжить</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Вход в аккаунт">
        <AuthField
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(v) => {
            setEmail(v);
            setError("");
          }}
          autoComplete="username"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />
        <AuthField
          id="password"
          label="Пароль"
          type="password"
          icon={Lock}
          value={pass}
          onChange={(v) => {
            setPass(v);
            setError("");
          }}
          autoComplete="current-password"
          placeholder="••••••••"
          disabled={isSubmitting}
        />

        {error && (
          <div role="alert" className="flex items-center gap-2 text-[#EF4A4F] text-xs p-3 rounded-lg bg-[#EF4A4F]/10 border border-[#EF4A4F]/20">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        <Link href="/forgot-password" className="text-xs text-[#8E8E98] hover:text-white text-left transition-colors -mt-1">
          Забыли пароль?
        </Link>

        <Btn type="submit" size="lg" className="w-full justify-center mt-1" disabled={isSubmitting}>
          {isSubmitting ? "Входим..." : "Войти"}
        </Btn>

        <div className="text-center text-sm text-[#8E8E98] mt-1">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-[#EF4A4F] hover:text-[#EF4A4F]/80 font-medium">
            Создать аккаунт
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}