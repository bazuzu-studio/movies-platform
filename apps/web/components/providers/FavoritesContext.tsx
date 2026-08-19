"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Временное хранилище избранного на localStorage.
 *
 * По ТЗ (п.3.3) избранное должно храниться на backend (коллекция Favorites,
 * п.8.6), привязываться к пользователю и быть доступным на любых устройствах —
 * НЕ в localStorage. Здесь это допущение для чисто фронтенд-прототипа.
 * При подключении Payload CMS toggle()/isFavorite() меняются на вызовы
 * GET/POST/DELETE /api/favorites (см. lib/api.ts), а состояние можно
 * подгружать через React Query/SWR вместо localStorage.
 */

interface FavoritesContextValue {
  favorites: Set<number>;
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "cinehub:favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch {
      // игнорируем
    }
  }, []);

  const persist = (next: Set<number>) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  };

  const toggle = (id: number) => {
    const next = new Set(favorites);
    if (next.has(id)) {
      next.delete(id);
      toast("Удалено из избранного", { icon: "🗑️" });
    } else {
      next.add(id);
      toast.success("Добавлено в избранное");
    }
    persist(next);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite: (id) => favorites.has(id), toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
