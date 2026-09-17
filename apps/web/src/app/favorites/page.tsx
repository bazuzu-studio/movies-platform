import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { FavoritesClient } from "@/components/pages/FavoritesClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
title: "Избранное",
robots: { index: false },
};

export default async function FavoritesPage() {
const { items } = await getContentList(1, 100);

// Избранное — приватная страница (ТЗ, п.3.1, 3.3):
// доступ только для авторизованного пользователя.
return ( <RequireAuth> <FavoritesClient all={items} /> </RequireAuth>
);
}
