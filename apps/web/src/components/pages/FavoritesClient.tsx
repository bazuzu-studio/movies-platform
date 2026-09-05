"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Heart, LogIn } from "lucide-react";
import type { ContentItem } from "@/lib/types";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { useFavorites } from "@/components/providers/FavoritesContext";
import { useAuth } from "@/components/providers/AuthContext";

export function FavoritesClient({ all }: { all: ContentItem[] }) {
  const router = useRouter();
  const { ready, isLoggedIn } = useAuth();
  const { favorites, isLoading } = useFavorites();
  const items = all.filter((c) => favorites.has(c.id));

  

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Избранное</h1>
        <p className="text-[#71717A] mt-1">Фильмы и сериалы, которые вы сохранили</p>
      </div>

      {!ready ? (
        // Идёт проверка сессии (meUser) — ничего не показываем,
        // чтобы не мигнуть "Войдите" для тех, кто на самом деле авторизован.
        null
      ) : !isLoggedIn ? (
        <EmptyState
          icon={LogIn}
          title="Войдите, чтобы увидеть избранное"
          subtitle="Список избранного привязан к аккаунту и доступен после входа."
          action={{ label: "Войти", onClick: () => router.push("/login") }}
        />
      ) : isLoading ? (
        <p className="text-sm text-[#71717A]">Загрузка избранного...</p>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Здесь пока ничего нет"
          subtitle="Добавляйте фильмы и сериалы в избранное, чтобы не потерять их."
          action={{ label: "Перейти в каталог", onClick: () => router.push("/catalog") }}
        />
      ) : (
        <ContentGrid items={items} />
      )}
    </div>
  );
}