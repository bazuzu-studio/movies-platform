import type { Metadata } from "next";

import { getSchedule, type ScheduleEntry } from "@/lib/api";
import { ScheduleClient } from "@/components/pages/ScheduleClient";

export const metadata: Metadata = {
  title: "Расписание выхода серий аниме",
  description:
    "Когда выйдет следующая серия: расписание эфира онгоингов по дням, время по Москве.",
};

// Зависит от CMS: не пререндерим при сборке (данные кэшируются на 60 с).
export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  let entries: ScheduleEntry[] = [];
  let unavailable = false;

  try {
    entries = await getSchedule();
  } catch (error) {
    // Например, CMS ещё без полей nextEpisode*.
    console.error("SchedulePage: не удалось загрузить расписание", error);
    unavailable = true;
  }

  return <ScheduleClient entries={entries} serverNow={Date.now()} unavailable={unavailable} />;
}
