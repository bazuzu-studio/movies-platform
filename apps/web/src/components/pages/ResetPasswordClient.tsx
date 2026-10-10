"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Check } from "lucide-react";
import { ClientError } from "graphql-request";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { AuthField } from "@/components/ui/AuthField";
import { gqlClient } from "@/lib/graphql-client";
import { PASSWORD_HINT, PASSWORD_MAX_LENGTH, validatePassword } from "@/lib/validation";
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
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
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
      <p className="text-sm text-[#8E8E98] mb-6">Придумайте новый пароль для входа</p>

      {done ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-400" />
          </div>
          <p className="font-semibold text-white">Пароль обновлён! Переходим ко входу...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AuthField
            id="new-password"
            label="Новый пароль"
            type="password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            hint={PASSWORD_HINT}
            maxLength={PASSWORD_MAX_LENGTH}
            disabled={submitting}
          />
          {error && <p role="alert" className="text-sm text-[#FF7A7D]">{error}</p>}
          <Btn type="submit" size="lg" className="w-full justify-center" disabled={submitting}>
            {submitting ? "Сохранение..." : "Сохранить пароль"}
          </Btn>
          <Link href="/login" className="text-sm text-center text-[#8E8E98] hover:text-white transition-colors">
            Вернуться к входу
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
