/**
 * @file pronunciationStats.ts
 * @description Cumulative pronunciation-error log for the Speaking Coach.
 * Unlike the weak-word review queue (which deletes a word once mastered),
 * this log keeps the full history so the learner can see which words they
 * mispronounce most often and whether they are improving over time.
 * Stored locally per language - no backend, no personal data.
 */
import { safeStorage } from "@/lib/safeStorage";

export type PronSource = "sentence" | "shadow" | "drill" | "freetalk";

export interface PronWordStat {
  word: string;
  ipa?: string;
  misses: number;
  attempts: number;
  firstSeen: string; // ISO date
  lastSeen: string; // ISO date
  sources: Partial<Record<PronSource, number>>;
  fixed: boolean; // cleared from the review queue at least once
}

export interface PronStatsStore {
  words: Record<string, PronWordStat>;
  daily: Record<string, number>; // ISO date -> misses that day
}

const KEY = (language: string) => `speaking-pron-stats-${language}`;
const EMPTY: PronStatsStore = { words: {}, daily: {} };

export const todayISO = (d = new Date()) => d.toISOString().slice(0, 10);

const normalize = (word: string): string =>
  word.toLowerCase().replace(/[.,!?;:"'()¿¡…]/g, "").trim();

export function loadPronStats(language: string): PronStatsStore {
  const raw = safeStorage.get<PronStatsStore>(KEY(language), EMPTY) ?? EMPTY;
  return { words: raw.words ?? {}, daily: raw.daily ?? {} };
}

export function savePronStats(language: string, store: PronStatsStore) {
  // Keep the daily trend bounded to the last 60 days.
  const keys = Object.keys(store.daily).sort();
  if (keys.length > 60) {
    for (const k of keys.slice(0, keys.length - 60)) delete store.daily[k];
  }
  safeStorage.set(KEY(language), store);
}

/** Record one or more mispronounced words coming out of any practice mode. */
export function recordMisses(
  language: string,
  words: { word: string; ipa?: string }[],
  source: PronSource = "sentence"
): PronStatsStore {
  const store = loadPronStats(language);
  const day = todayISO();
  let counted = 0;
  for (const entry of words) {
    const norm = normalize(entry.word);
    if (!norm || norm.length < 2) continue;
    const prev = store.words[norm];
    store.words[norm] = {
      word: entry.word.trim(),
      ipa: entry.ipa || prev?.ipa,
      misses: (prev?.misses ?? 0) + 1,
      attempts: (prev?.attempts ?? 0) + 1,
      firstSeen: prev?.firstSeen ?? day,
      lastSeen: day,
      sources: { ...(prev?.sources ?? {}), [source]: (prev?.sources?.[source] ?? 0) + 1 },
      fixed: false,
    };
    counted += 1;
  }
  if (counted > 0) store.daily[day] = (store.daily[day] ?? 0) + counted;
  savePronStats(language, store);
  return store;
}

/** Record a review attempt on a known word (correct or not). */
export function recordAttempt(
  language: string,
  word: string,
  correct: boolean,
  mastered = false
): PronStatsStore {
  const store = loadPronStats(language);
  const norm = normalize(word);
  const prev = store.words[norm];
  const day = todayISO();
  store.words[norm] = {
    word: prev?.word ?? word.trim(),
    ipa: prev?.ipa,
    misses: (prev?.misses ?? 0) + (correct ? 0 : 1),
    attempts: (prev?.attempts ?? 0) + 1,
    firstSeen: prev?.firstSeen ?? day,
    lastSeen: day,
    sources: prev?.sources ?? {},
    fixed: mastered ? true : (prev?.fixed ?? false) && correct,
  };
  if (!correct) store.daily[day] = (store.daily[day] ?? 0) + 1;
  savePronStats(language, store);
  return store;
}

export const allPronWords = (store: PronStatsStore): PronWordStat[] => Object.values(store.words);

export const topMissedWords = (store: PronStatsStore, limit = 10): PronWordStat[] =>
  allPronWords(store)
    .slice()
    .sort((a, b) => b.misses - a.misses || b.attempts - a.attempts)
    .slice(0, limit);

export const errorRate = (w: PronWordStat): number =>
  w.attempts > 0 ? Math.round((w.misses / w.attempts) * 100) : 100;

export function dailyTrend(store: PronStatsStore, days = 14): { date: string; label: string; misses: number }[] {
  const out: { date: string; label: string; misses: number }[] = [];
  const base = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setUTCDate(d.getUTCDate() - i);
    const iso = d.toISOString().slice(0, 10);
    out.push({ date: iso, label: iso.slice(5), misses: store.daily[iso] ?? 0 });
  }
  return out;
}

export function sourceBreakdown(store: PronStatsStore): { source: PronSource; count: number }[] {
  const totals: Record<PronSource, number> = { sentence: 0, shadow: 0, drill: 0, freetalk: 0 };
  for (const w of allPronWords(store)) {
    for (const [src, n] of Object.entries(w.sources)) {
      totals[src as PronSource] += n ?? 0;
    }
  }
  return (Object.keys(totals) as PronSource[])
    .map((source) => ({ source, count: totals[source] }))
    .filter((s) => s.count > 0);
}

export interface PronSummary {
  totalWords: number;
  fixedWords: number;
  activeWords: number;
  totalMisses: number;
  accuracy: number; // % of attempts that were correct
}

export function summarize(store: PronStatsStore): PronSummary {
  const words = allPronWords(store);
  const totalMisses = words.reduce((s, w) => s + w.misses, 0);
  const totalAttempts = words.reduce((s, w) => s + w.attempts, 0);
  const fixedWords = words.filter((w) => w.fixed).length;
  return {
    totalWords: words.length,
    fixedWords,
    activeWords: words.length - fixedWords,
    totalMisses,
    accuracy: totalAttempts > 0 ? Math.round(((totalAttempts - totalMisses) / totalAttempts) * 100) : 0,
  };
}

export function resetPronStats(language: string) {
  safeStorage.set(KEY(language), { words: {}, daily: {} });
}

export function pronStatsCsv(store: PronStatsStore): string {
  const rows = [["word", "ipa", "misses", "attempts", "error_rate", "first_seen", "last_seen", "status"]];
  for (const w of allPronWords(store).sort((a, b) => b.misses - a.misses)) {
    rows.push([
      w.word,
      w.ipa ?? "",
      String(w.misses),
      String(w.attempts),
      `${errorRate(w)}%`,
      w.firstSeen,
      w.lastSeen,
      w.fixed ? "fixed" : "practising",
    ]);
  }
  return rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
}
