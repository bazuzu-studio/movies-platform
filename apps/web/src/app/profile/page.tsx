import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { ProfileClient } from "@/components/pages/ProfileClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
  title: "Профиль",
  robots: { index: false },
};

export default async function ProfilePage() {
  const all = await getContentList();
  return (
    <RequireAuth>
      <ProfileClient all={all} />
    </RequireAuth>
  );
}
