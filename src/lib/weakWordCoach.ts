import type { WeakWord } from "@/lib/speakingWeakWords";

export type WeakWordFilter = "due" | "missed" | WeakWord["source"];

export function sortWeakWords(words: WeakWord[], filter: WeakWordFilter = "due"): WeakWord[] {
  const filtered = filter === "due" || filter === "missed" ? words : words.filter((word) => word.source === filter);
  return filtered.slice().sort((a, b) => {
    if (filter === "missed") return b.misses - a.misses || a.dueOn.localeCompare(b.dueOn);
    return a.dueOn.localeCompare(b.dueOn) || b.misses - a.misses;
  });
}

export const sourceLabel = (source: WeakWord["source"]): { vi: string; en: string } => ({
  sentence: { vi: "Câu mẫu", en: "Sentences" },
  shadow: { vi: "Nói theo", en: "Shadowing" },
  drill: { vi: "Luyện âm", en: "Sound Lab" },
  freetalk: { vi: "Nói tự do", en: "Free Talk" },
}[source]);