"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { gqlClient } from "@/lib/graphql-client";
import {
  GetFavoritesDocument,
  AddFavoriteDocument,
  RemoveFavoriteDocument,
} from "@/generated/graphql";
import { useAuth } from "./AuthContext";

/**
 * Избранное на backend (Payload CMS, коллекция Favorites, ТЗ п.3.3, 8.6).
 *
 * Список привязан к пользователю и доступен с любых устройств.
 * Для гостя (не залогинен) избранное недоступно — toggle() показывает
 * уведомление и ничего не отправляет на сервер.
 *
 * ВАЖНО про типы id:
 * GraphQL-скаляр ID по спецификации сериализуется как строка в JSON,
 * даже если в БД это integer. В разных запросах (GetContentDocument
 * vs GetFavoritesDocument) это проявляется непоследовательно — где-то
 * приходит number, где-то string. Поэтому ЛЮБОЙ id, прежде чем попасть
 * в favoritesMap или сравниться с ним, приводится через Number()
 * ЗДЕСЬ — в единственном месте, а не в каждом компоненте по отдельности.
 */

interface FavoritesContextValue {
  favorites: Set<number>;
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () =>
      gqlClient.request(GetFavoritesDocument, {
        where: { user: { equals: Number(user!.id) } },
      }),
    enabled: isLoggedIn && !!user?.id,
  });

  // contentId -> favoriteRecordId, оба нормализованы через Number()
  const [favoritesMap, setFavoritesMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    if (!data) {
      setFavoritesMap(new Map());
      return;
    }
    const next = new Map<number, number>();
    for (const doc of data.Favorites.docs) {
      if (doc.content) {
        next.set(Number(doc.content.id), Number(doc.id));
      }
    }
    setFavoritesMap(next);
  }, [data]);

  const addMutation = useMutation({
    mutationFn: (contentId: number) =>
      gqlClient.request(AddFavoriteDocument, {
        userId: Number(user!.id),
        contentId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: number) =>
      gqlClient.request(RemoveFavoriteDocument, { id: favoriteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", user?.id] });
    },
  });

  /**
   * contentId уже нормализован (см. value ниже, где toggle оборачивается
   * в Number()) — здесь можно спокойно работать с favoritesMap напрямую.
   */
  const toggle = (contentId: number) => {
    if (!isLoggedIn || !user) {
      toast("Войдите, чтобы добавлять в избранное");
      return;
    }

    const existingFavoriteId = favoritesMap.get(contentId);

    if (existingFavoriteId) {
      setFavoritesMap((prev) => {
        const next = new Map(prev);
        next.delete(contentId);
        return next;
      });

      removeMutation.mutate(existingFavoriteId, {
        onSuccess: () => toast("Удалено из избранного", { icon: "🗑️" }),
        onError: () => {
          setFavoritesMap((prev) => new Map(prev).set(contentId, existingFavoriteId));
          toast.error("Не удалось удалить из избранного");
        },
      });
    } else {
      // Временный отрицательный id — не пересечётся с реальными Int-id из БД
      const optimisticId = -contentId;
      setFavoritesMap((prev) => new Map(prev).set(contentId, optimisticId));

      addMutation.mutate(contentId, {
        onSuccess: () => toast.success("Добавлено в избранное"),
        onError: (error) => {
          setFavoritesMap((prev) => {
            const next = new Map(prev);
            next.delete(contentId);
            return next;
          });
          const message =
            error instanceof Error && error.message.includes("уже добавлен")
              ? "Этот контент уже в избранном"
              : "Не удалось добавить в избранное";
          toast.error(message);
        },
      });
    }
  };

  const favorites = useMemo(() => new Set(favoritesMap.keys()), [favoritesMap]);

  const value: FavoritesContextValue = {
    favorites,
    // Единственное место, где входящий id приводится к number —
    // компоненты (MovieCard и т.д.) могут не думать об этом нюансе.
    isFavorite: (id) => favorites.has(Number(id)),
    toggle: (id) => toggle(Number(id)),
    isLoading,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}