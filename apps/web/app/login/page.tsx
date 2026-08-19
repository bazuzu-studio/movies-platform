import type { Metadata } from "next";
import { LoginClient } from "@/components/pages/LoginClient";

export const metadata: Metadata = {
  title: "Вход",
  robots: { index: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
