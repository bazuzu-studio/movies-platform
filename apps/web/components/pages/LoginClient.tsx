"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { useAuth } from "@/components/providers/AuthContext";

export function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) {
      setError("Заполните все поля");
      return;
    }
    // TODO: заменить на POST /api/users/login (ТЗ, раздел 9)
    login(email, pass);
    toast.success("Добро пожаловать!");
    router.push("/");
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">С возвращением</h1>
      <p className="text-sm text-[#71717A] mb-6">Войдите, чтобы продолжить</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#EF4A4F]/50 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Пароль</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#EF4A4F]/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#71717A] hover:text-white"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-[#EF4A4F] text-xs p-3 rounded-lg bg-[#EF4A4F]/10 border border-[#EF4A4F]/20">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </div>
        )}

        <Link href="/forgot-password" className="text-xs text-[#71717A] hover:text-white text-left transition-colors -mt-1">
          Забыли пароль?
        </Link>

        <Btn type="submit" size="lg" className="w-full justify-center mt-1">
          Войти
        </Btn>

        <div className="text-center text-sm text-[#71717A] mt-1">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-[#EF4A4F] hover:text-[#EF4A4F]/80 font-medium">
            Создать аккаунт
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
