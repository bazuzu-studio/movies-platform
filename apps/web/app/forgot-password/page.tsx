import type { Metadata } from "next";
import { ForgotPasswordClient } from "@/components/pages/ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Восстановление пароля",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
