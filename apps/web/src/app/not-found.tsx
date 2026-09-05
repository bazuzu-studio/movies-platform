"use client";

import React from "react";
import Link from "next/link";
import { Btn } from "@/components/ui/Btn";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[120px] font-black text-white/5 leading-none select-none">404</p>
        <h1 className="text-2xl font-bold text-white -mt-4 mb-2">Страница не найдена</h1>
        <p className="text-[#71717A] mb-8">Возможно, она была перемещена или удалена</p>
        <Link href="/catalog">
          <Btn size="lg">Вернуться в каталог</Btn>
        </Link>
      </div>
    </div>
  );
}
