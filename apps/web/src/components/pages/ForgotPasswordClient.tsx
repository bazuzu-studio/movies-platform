"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Check } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { AuthField } from "@/components/ui/AuthField";
import { gqlClient } from "@/lib/graphql-client";
import { ForgotPasswordUserDocument } from "@/generated/graphql";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      await gqlClient.request(ForgotPasswordUserDocument, { email });
    } catch {
      // Намеренно игнорируем ошибку: ответ не должен раскрывать,
      // зарегистрирован ли такой email (user enumeration).
    } finally {
      setSubmitting(false);
      // Показываем "успех" в любом случае — той же причине.
      setSent(true);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Восстановление пароля</h1>
      <p className="text-sm text-[#8E8E98] mb-6">Введите email и мы отправим ссылку</p>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-white">Ссылка отправлена!</p>
            <p className="text-sm text-[#8E8E98] mt-1">Проверьте почту {email}</p>
          </div>
          <Link href="/login">
            <Btn variant="outline" size="sm">
              Вернуться к входу
            </Btn>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AuthField
            id="email"
            label="Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={setEmail}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={submitting}
          />
          <Btn type="submit" size="lg" className="w-full justify-center" disabled={submitting}>
            {submitting ? "Отправка..." : "Отправить ссылку"}
          </Btn>
          <Link href="/login" className="text-sm text-center text-[#8E8E98] hover:text-white transition-colors">
            Вернуться к входу
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
