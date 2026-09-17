import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { ProfileClient } from "@/components/pages/ProfileClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
title: "Профиль",
robots: { index: false },
};

export default async function ProfilePage() {
const { items } = await getContentList(1, 100);

return ( <RequireAuth> <ProfileClient all={items} /> </RequireAuth>
);
}
