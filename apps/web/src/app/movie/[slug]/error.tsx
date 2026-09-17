"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MovieError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[MovieError]", error.message, error.digest, error.stack);
  }, [error]);

  return (
    <div className="bg-[#08080A] min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#EF4A4F]/10 border border-[#EF4A4F]/20 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4A4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <path d="M7 3v18M17 3v18" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-white mb-2">Не удалось загрузить контент</h1>
        <p className="text-sm text-[#71717A] mb-6">
          Возможно, сервер временно недоступен. Попробуйте ещё раз.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-[#EF4A4F] text-white text-sm font-semibold hover:bg-[#EF4A4F]/90 transition-colors"
          >
            Повторить
          </button>
          <button
            onClick={() => router.push("/catalog")}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#A1A1AA] text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
          >
            В каталог
          </button>
        </div>
      </div>
    </div>
  );
}
