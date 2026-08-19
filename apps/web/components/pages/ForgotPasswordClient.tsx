"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Check } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: заменить на вызов эндпоинта восстановления пароля (ТЗ, п.3.1)
    if (email) setSent(true);
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Восстановление пароля</h1>
      <p className="text-sm text-[#71717A] mb-6">Введите email и мы отправим ссылку</p>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-white">Ссылка отправлена!</p>
            <p className="text-sm text-[#71717A] mt-1">Проверьте почту {email}</p>
          </div>
          <Link href="/login">
            <Btn variant="outline" size="sm">
              Вернуться к входу
            </Btn>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#EF4A4F]/50 transition-colors"
              />
            </div>
          </div>
          <Btn type="submit" size="lg" className="w-full justify-center">
            Отправить ссылку
          </Btn>
          <Link href="/login" className="text-sm text-center text-[#71717A] hover:text-white transition-colors">
            Вернуться к входу
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
