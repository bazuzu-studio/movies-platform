/**
 * Статус релиза контента: анонс / выходит / вышло.
 *
 * Источник — поле `releaseStatus` коллекции Content в CMS (enum). Значения
 * совпадают со значениями Kodik и заполняются пайплайном kodik-pipeline
 * (`sync` и `update-ongoing`).
 */

export const RELEASE_STATUSES = ["anons", "ongoing", "released"] as const;

export type ReleaseStatus = (typeof RELEASE_STATUSES)[number];

export const RELEASE_STATUS_LABEL: Record<ReleaseStatus, string> = {
  anons: "Анонс",
  ongoing: "Выходит",
  released: "Вышло",
};

/** Безопасно приводит значение из API/URL к ReleaseStatus (неизвестное -> undefined). */
export function parseReleaseStatus(value: unknown): ReleaseStatus | undefined {
  return typeof value === "string" && (RELEASE_STATUSES as readonly string[]).includes(value)
    ? (value as ReleaseStatus)
    : undefined;
}

export function isOngoing(status: ReleaseStatus | undefined): boolean {
  return status === "ongoing";
}
