import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordClient } from "@/components/pages/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Новый пароль",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  // useSearchParams() внутри ResetPasswordClient требует Suspense-границу,
  // иначе `next build` откажется собирать страницу как статическую.
  return (
    <Suspense fallback={null}>
      <ResetPasswordClient />
    </Suspense>
  );
}
