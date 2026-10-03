"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Btn } from "@/components/ui/Btn";
import { isAgeGated } from "@/lib/age";
import { confirmAge, useAgeConfirmed } from "@/lib/age-client";

/**
 * Age-gate для материалов 18+.
 *
 * Пока возраст не подтверждён, `children` НЕ рендерятся вообще (ни постер,
 * ни описание, ни iframe плеера — так видео не грузится и не играет «под»
 * заглушкой). Начальное состояние всегда «не подтверждено», чтобы серверный
 * и клиентский HTML совпадали; подтверждение читается из localStorage после
 * монтирования.
 *
 * Ограничение: это клиентская проверка «я совершеннолетний» без верификации
 * личности — сервер о подтверждении не знает.
 */
export function AgeGate({
  ageRating,
  children,
}: {
  ageRating: number | null | undefined;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const confirmed = useAgeConfirmed();

  if (!isAgeGated(ageRating) || confirmed) return <>{children}</>;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#121214] p-8 text-center"
      >
        <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-[#EF4A4F]" />
        <h1 id="age-gate-title" className="mb-2 text-xl font-bold text-white">
          Материал 18+
        </h1>
        <p className="mb-6 text-sm text-[#A1A1AA]">
          Этот материал предназначен только для совершеннолетних. Подтвердите,
          что вам исполнилось 18 лет.
        </p>
        <div className="flex flex-col gap-2">
          <Btn size="lg" className="w-full" onClick={confirmAge}>
            Мне есть 18 лет
          </Btn>
          <Btn size="lg" variant="outline" className="w-full" onClick={() => router.push("/")}>
            Мне нет 18 — уйти
          </Btn>
        </div>
      </div>
    </div>
  );
}
