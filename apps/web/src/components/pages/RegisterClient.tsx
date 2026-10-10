"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { AuthField } from "@/components/ui/AuthField";
import { useAuth } from "@/components/providers/AuthContext";
import { PASSWORD_HINT, PASSWORD_MAX_LENGTH, validatePassword } from "@/lib/validation";

export function RegisterClient() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email || !pass || !confirm) {
    setError("Заполните все поля");
    return;
  }
  if (pass !== confirm) {
    setError("Пароли не совпадают");
    return;
  }
  const passwordError = validatePassword(pass);
  if (passwordError) {
    setError(passwordError);
    return;
  }

  setIsSubmitting(true);
  try {
    // Роль не передаётся отсюда — регистрация всегда создаёт "user",
    // это зашито в GraphQL-мутации RegisterUserDocument (см. AuthContext).
    await register(name.trim(), email.trim(), pass);
    toast.success("Аккаунт создан!");
    router.push("/");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Не удалось создать аккаунт");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Создайте аккаунт</h1>
      <p className="text-sm text-[#8E8E98] mb-6">Присоединяйтесь к otakuum</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-label="Регистрация">
        <AuthField
          id="name"
          label="Имя"
          icon={User}
          value={name}
          onChange={(v) => {
            setName(v);
            setError("");
          }}
          autoComplete="name"
          placeholder="Как к вам обращаться"
          maxLength={80}
          disabled={isSubmitting}
        />
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
          autoComplete="email"
          placeholder="you@example.com"
          disabled={isSubmitting}
        />
        <AuthField
          id="new-password"
          label="Пароль"
          type="password"
          icon={Lock}
          value={pass}
          onChange={(v) => {
            setPass(v);
            setError("");
          }}
          autoComplete="new-password"
          hint={PASSWORD_HINT}
          maxLength={PASSWORD_MAX_LENGTH}
          disabled={isSubmitting}
        />
        <AuthField
          id="confirm-password"
          label="Повтор пароля"
          type="password"
          icon={Lock}
          value={confirm}
          onChange={(v) => {
            setConfirm(v);
            setError("");
          }}
          autoComplete="new-password"
          maxLength={PASSWORD_MAX_LENGTH}
          disabled={isSubmitting}
        />

        {error && (
          <div role="alert" className="flex items-center gap-2 text-[#EF4A4F] text-xs p-3 rounded-lg bg-[#EF4A4F]/10 border border-[#EF4A4F]/20">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        <Btn type="submit" size="lg" className="w-full justify-center mt-1" disabled={isSubmitting}>
          {isSubmitting ? "Создаём..." : "Зарегистрироваться"}
        </Btn>

        <p className="text-xs text-[#6B6B75] text-center leading-relaxed">
          Создавая аккаунт, вы принимаете{" "}
          <Link href="/terms" className="underline hover:text-white">условия использования</Link> и{" "}
          <Link href="/privacy" className="underline hover:text-white">политику конфиденциальности</Link>.
        </p>

        <div className="text-center text-sm text-[#8E8E98]">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="text-[#EF4A4F] hover:text-[#EF4A4F]/80 font-medium">
            Войти
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
