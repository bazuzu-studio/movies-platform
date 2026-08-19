import type { Metadata } from "next";
import { RegisterClient } from "@/components/pages/RegisterClient";

export const metadata: Metadata = {
  title: "Регистрация",
  robots: { index: false },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
