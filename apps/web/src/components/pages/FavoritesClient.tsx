"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Heart, LogIn } from "lucide-react";
import { EmptyState } from "@/components/ui/States";
import { ContentGrid } from "@/components/content/ContentGrid";
import { useFavorites } from "@/components/providers/FavoritesContext";
import { useAuth } from "@/components/providers/AuthContext";
import { gqlClient } from "@/lib/graphql-client";
import { GetFavoriteItemsDocument } from "@/generated/graphql";
import { mapContentToItem, type RawContent } from "@/lib/content-mapper";

export const FAVORITE_ITEMS_KEY = "favorite-items";

export function FavoritesClient() {
  const router = useRouter();
  const { ready, isLoggedIn, user } = useAuth();
  const { favorites } = useFavorites();

  // Карточки приходят прямо из списка избранного пользователя: тайтл не
  // пропадает, даже если он давно выпал из первых страниц каталога.
  const { data, isLoading } = useQuery({
    queryKey: [FAVORITE_ITEMS_KEY, user?.id],
    queryFn: () =>
      gqlClient.request(GetFavoriteItemsDocument, {
        where: { user: { equals: Number(user!.id) } },
      }),
    enabled: isLoggedIn && !!user?.id,
  });

  // Фильтр по актуальному набору избранного — удаление с этой страницы
  // исчезает сразу, не дожидаясь повторного запроса.
  const items = useMemo(
    () =>
      (data?.Favorites?.docs ?? [])
        .map((doc) => doc.content)
        .filter((content): content is NonNullable<typeof content> => Boolean(content))
        .map((content) => mapContentToItem(content as unknown as RawContent))
        .filter((item) => favorites.has(Number(item.id))),
    [data, favorites],
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Избранное</h1>
        <p className="text-[#8E8E98] mt-1">Фильмы и сериалы, которые вы сохранили</p>
      </div>

      {!ready ? null : !isLoggedIn ? (
        <EmptyState
          icon={LogIn}
          title="Войдите, чтобы увидеть избранное"
          subtitle="Список избранного привязан к аккаунту и доступен после входа."
          action={{ label: "Войти", onClick: () => router.push("/login") }}
        />
      ) : isLoading ? (
        <ContentGrid items={[]} loading />
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
