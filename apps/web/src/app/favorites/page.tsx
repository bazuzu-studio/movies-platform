import type { Metadata } from "next";
import { FavoritesClient } from "@/components/pages/FavoritesClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
  title: "Избранное",
  robots: { index: false },
};

// Избранное — приватная страница: доступ только авторизованному пользователю
// (middleware.ts + RequireAuth). Карточки загружает сам клиент по списку
// избранного пользователя, а не фильтрует первые N тайтлов каталога.
export default function FavoritesPage() {
  return (
    <RequireAuth>
      <FavoritesClient />
    </RequireAuth>
  );
}
