"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, LogOut, Heart } from "lucide-react";
import { toast } from "sonner";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { useAuth } from "@/components/providers/AuthContext";
import { useFavorites } from "@/components/providers/FavoritesContext";

export function ProfileClient({ all }: { all: ContentItem[] }) {
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const [activeTab, setActiveTab] = useState<"profile" | "favorites">("profile");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const favItems = all.filter((c) => favorites.has(c.id));


  /**
   * Редирект вынесен в useEffect, а не в тело рендера — вызов router.push
   * напрямую во время рендера считается побочным эффектом и может приводить
   * к предупреждениям/некорректному порядку обновлений в React.
   */
  useEffect(() => {
    if (ready && !user) {
      router.push("/login");
    }
  }, [ready, user, router]);

  // Пока идёт проверка сессии (meUser) или сессии нет — ничего не рендерим.
  if (!ready || !user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast("Вы вышли из аккаунта");
      router.push("/");
    } catch {
      toast.error("Не удалось выйти из аккаунта, попробуйте ещё раз");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <h1 className="text-3xl font-black tracking-tight text-white mb-8">Профиль</h1>

      <div className="flex gap-1 p-1 bg-white/4 rounded-xl w-fit mb-8">
        {([["profile", "Профиль"], ["favorites", "Избранное"]] as const).map(([v, l]) => (
          <button
            key={v}
            onClick={() => setActiveTab(v)}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === v ? "bg-white text-[#08080A] shadow-sm" : "text-[#71717A] hover:text-white"
            )}
          >
            {l}
          </button>
        ))}
      </div>

      {activeTab === "profile" ? (
        <div className="max-w-md">
          <div className="flex items-center gap-5 mb-8 p-6 rounded-2xl bg-white/3 border border-white/6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EF4A4F] to-[#C73237] flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold text-white">{user.name}</p>
              <p className="text-sm text-[#71717A]">{user.email}</p>
              <p className="text-xs text-[#3f3f46] mt-1">
                {favoritesLoading ? "..." : `${favItems.length} в избранном`}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Btn variant="outline" className="w-full justify-center gap-2" onClick={() => router.push("/profile/edit")}>
              <Edit3 className="w-4 h-4" /> Редактировать профиль
            </Btn>
            <Btn
              variant="ghost"
              className="w-full justify-center gap-2 text-[#EF4A4F] hover:bg-[#EF4A4F]/10"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="w-4 h-4" /> {isLoggingOut ? "Выходим..." : "Выйти"}
            </Btn>
          </div>
        </div>
      ) : favoritesLoading ? (
        <p className="text-sm text-[#71717A]">Загрузка избранного...</p>
      ) : favItems.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Избранное пусто"
          subtitle="Добавляйте фильмы и сериалы в избранное"
          action={{ label: "Перейти в каталог", onClick: () => router.push("/catalog") }}
        />
      ) : (
        <ContentGrid items={favItems} />
      )}
    </div>
  );
}