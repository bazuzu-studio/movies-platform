"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Отправка в error-tracking (Sentry/похожее), когда будет подключён
    console.error("[GlobalError]", error.message, error.digest, error.stack);
  }, [error]);

  return (
    <div className="bg-[#08080A] min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#EF4A4F]/10 border border-[#EF4A4F]/20 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4A4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Что-то пошло не так</h1>
        <p className="text-sm text-[#71717A] mb-8">
          Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-[#EF4A4F] text-white text-sm font-semibold hover:bg-[#EF4A4F]/90 transition-colors"
          >
            Повторить
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#A1A1AA] text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
}
