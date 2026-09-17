"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Check } from "lucide-react";
import { ClientError } from "graphql-request";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { gqlClient } from "@/lib/graphql-client";
import { ResetPasswordUserDocument } from "@/generated/graphql";

function extractGraphQLErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ClientError) {
    return error.response.errors?.[0]?.message ?? fallback;
  }
  return fallback;
}

export function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <AuthLayout>
        <p className="text-sm text-[#A1A1AA] text-center">
          Ссылка недействительна или устарела. Запросите восстановление пароля ещё раз.
        </p>
        <Link href="/forgot-password" className="block mt-6 text-center">
          <Btn variant="outline" size="sm">
            Запросить новую ссылку
          </Btn>
        </Link>
      </AuthLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await gqlClient.request(ResetPasswordUserDocument, { token, password });
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(extractGraphQLErrorMessage(err, "Не удалось обновить пароль. Ссылка могла устареть."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Новый пароль</h1>
      <p className="text-sm text-[#71717A] mb-6">Придумайте новый пароль для входа</p>

      {done ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-400" />
          </div>
          <p className="font-semibold text-white">Пароль обновлён! Переходим ко входу...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Новый пароль</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 8 символов"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#3f3f46] outline-none focus:border-[#EF4A4F]/50 transition-colors"
              />
            </div>
          </div>
          {error && <p className="text-sm text-[#FF7A7D]">{error}</p>}
          <Btn type="submit" size="lg" className="w-full justify-center" disabled={submitting}>
            {submitting ? "Сохранение..." : "Сохранить пароль"}
          </Btn>
          <Link href="/login" className="text-sm text-center text-[#71717A] hover:text-white transition-colors">
            Вернуться к входу
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
