import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { FavoritesClient } from "@/components/pages/FavoritesClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
  title: "Избранное",
  robots: { index: false },
};

export default async function FavoritesPage() {
  const all = await getContentList();
  // Избранное — приватная страница (ТЗ, п.3.1, 3.3): привязано к пользователю
  // и должно быть защищено так же, как /profile, а не быть публичным роутом.
  return (
    <RequireAuth>
      <FavoritesClient all={all} />
    </RequireAuth>
  );
}
