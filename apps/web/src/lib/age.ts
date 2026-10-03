/** Возраст, начиная с которого показ материала требует подтверждения. */
export const AGE_GATE_MIN = 18;

/** Ключ localStorage с подтверждением возраста (общий для всего сайта). */
export const AGE_CONFIRMED_KEY = "age18-confirmed";

export function isAgeGated(ageRating: number | null | undefined): boolean {
  return typeof ageRating === "number" && ageRating >= AGE_GATE_MIN;
}

export function formatAge(ageRating: number | null | undefined): string | null {
  return typeof ageRating === "number" ? `${ageRating}+` : null;
}
