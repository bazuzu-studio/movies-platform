import type { Metadata } from "next";
import { getContentList } from "@/lib/api";
import { HomeClient } from "@/components/pages/HomeClient";

export const metadata: Metadata = {
  title: "Главная",
};

export default async function HomePage() {
  const all = await getContentList();
  const heroItem = all.find((c) => c.type === "series") ?? all[0];

  return <HomeClient heroItem={heroItem} all={all} />;
}
