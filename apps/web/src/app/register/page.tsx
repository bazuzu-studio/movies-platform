import type { Metadata } from "next";
import { RegisterClient } from "@/components/pages/RegisterClient";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Создайте аккаунт otakuum, чтобы сохранять избранное.",
  robots: { index: false },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
