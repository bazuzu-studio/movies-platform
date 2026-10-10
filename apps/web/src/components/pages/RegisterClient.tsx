"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { useAuth } from "@/components/providers/AuthContext";
import { PASSWORD_HINT, validatePassword } from "@/lib/validation";

export function RegisterClient() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { label: "Имя", val: name, set: setName, type: "text", placeholder: "Алексей Морозов" },
          { label: "Email", val: email, set: setEmail, type: "email", placeholder: "you@example.com" },
        ].map(({ label, val, set, type, placeholder }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">{label}</label>
            <input
              type={type}
              required
              value={val}
              onChange={(e) => {
                set(e.target.value);
                setError("");
              }}
              placeholder={placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors"
            />
          </div>
        ))}

        <div>
          <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Пароль</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
              placeholder={PASSWORD_HINT}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pr-11 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#8E8E98] hover:text-white"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Повтор пароля</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setError("");
            }}
            placeholder="Повторите пароль"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-[#EF4A4F] text-xs p-3 rounded-lg bg-[#EF4A4F]/10 border border-[#EF4A4F]/20">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        <Btn type="submit" size="lg" className="w-full justify-center mt-1" disabled={isSubmitting}>
          {isSubmitting ? "Создаём..." : "Зарегистрироваться"}
        </Btn>

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
