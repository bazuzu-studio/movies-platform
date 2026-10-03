const KEY = "continue-watching";
const MAX = 12;

export interface ContinueEntry {
  slug: string;
  titleRu: string;
  posterUrl?: string;
  ageRating?: number | null;
  episode: number;
  ts: number;
}

export function readContinue(): ContinueEntry[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(raw)) return [];
    return raw.filter(
      (e): e is ContinueEntry =>
        e && typeof e.slug === "string" && typeof e.titleRu === "string" && typeof e.episode === "number",
    );
  } catch {
    return [];
  }
}

function write(list: ContinueEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    // localStorage недоступен — «продолжить» просто не запомнится.
  }
}

export function saveContinue(entry: Omit<ContinueEntry, "ts">) {
  const rest = readContinue().filter((e) => e.slug !== entry.slug);
  write([{ ...entry, ts: Date.now() }, ...rest]);
}

export function removeContinue(slug: string) {
  write(readContinue().filter((e) => e.slug !== slug));
}
