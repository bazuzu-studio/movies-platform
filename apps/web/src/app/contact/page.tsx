import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Связаться с нами",
  description: "Вопрос, жалоба на контент или предложение — напишите нам",
};

export default function ContactPage() {
  return <ContactClient />;
}
