"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, MessageSquare, Check } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "./AuthLayout";
import { Btn } from "@/components/ui/Btn";
import { contactMessageEndpointUrl } from "@/lib/cms";

const MESSAGE_MIN = 10;

export function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: обычный пользователь это поле не видит и не заполняет.
  // Если оно пришло непустым — значит форму отправил бот.
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Заполните все поля");
      return;
    }

    if (message.trim().length < MESSAGE_MIN) {
      setError(`Сообщение должно быть не короче ${MESSAGE_MIN} символов`);
      return;
    }

    setSubmitting(true);
    try {
      // Шлём напрямую в CMS (см. apps/cms/src/endpoints/contact-message.ts),
      // без прокси через сервер фронтенда — как и остальные формы через
      // gqlClient. Адрес CMS и так публичный (NEXT_PUBLIC_GRAPHQL_API_URL),
      // а всю валидацию, rate-limit и honeypot endpoint проверяет сам,
      // ровно потому что он публичный и может быть вызван и в обход этой формы.
      const res = await fetch(contactMessageEndpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await res.json().catch(() => null)) as { message?: string } | null;

      if (!res.ok) {
        throw new Error(data?.message || "Не удалось отправить сообщение");
      }

      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Не удалось отправить сообщение";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-white mb-1">Связаться с нами</h1>
      <p className="text-sm text-[#8E8E98] mb-6">
        Вопрос, жалоба на контент или предложение — напишите нам, ответим на почту
      </p>

      {sent ? (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <Check className="w-7 h-7 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-white">Сообщение отправлено!</p>
            <p className="text-sm text-[#8E8E98] mt-1">Мы ответим на {email}</p>
          </div>
          <Link href="/">
            <Btn variant="outline" size="sm">
              На главную
            </Btn>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Имя</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E98]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E98]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">Сообщение</label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8E8E98]" />
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setError("");
                }}
                placeholder="Опишите ваш вопрос или предложение"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#6B6B75] outline-none focus:border-[#EF4A4F]/50 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Honeypot-поле: скрыто от людей через CSS, но видно ботам,
              заполняющим все поля формы подряд. Не используем display:none
              на самом input — некоторые боты его тоже пропускают, поэтому
              прячем через невидимый offscreen-контейнер. */}
          <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Оставьте это поле пустым</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-[#EF4A4F] text-xs p-3 rounded-lg bg-[#EF4A4F]/10 border border-[#EF4A4F]/20">
              {error}
            </div>
          )}

          <Btn type="submit" size="lg" className="w-full justify-center mt-1" disabled={submitting}>
            {submitting ? "Отправка..." : "Отправить"}
          </Btn>
        </form>
      )}
    </AuthLayout>
  );
}
