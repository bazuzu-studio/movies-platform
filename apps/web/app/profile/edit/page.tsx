import type { Metadata } from "next";
import { EditProfileClient } from "@/components/pages/EditProfileClient";
import { RequireAuth } from "@/components/pages/RequireAuth";

export const metadata: Metadata = {
  title: "Редактировать профиль",
  robots: { index: false },
};

export default function EditProfilePage() {
  return (
    <RequireAuth>
      <EditProfileClient />
    </RequireAuth>
  );
}
