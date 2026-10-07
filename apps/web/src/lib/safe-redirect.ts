/**
 * Безопасный путь для редиректа после входа (?next=…): только относительный
 * путь на этом же сайте. Отсекает `//host`, `/\host` (браузеры трактуют
 * обратный слэш как прямой), схемы и управляющие символы.
 */
export function safeNextPath(value: string | null | undefined, fallback = "/"): string {
  if (!value || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.includes("\\")) return fallback;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f]/.test(value)) return fallback;
  return value;
}
