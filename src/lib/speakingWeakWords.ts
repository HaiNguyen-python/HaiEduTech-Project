// Local weak-word queue for the Speaking Coach. Every word or sound the
// learner missed is stored per language and scheduled for review; a word
// leaves the queue after CLEAN_STREAK clean attempts.
import { safeStorage } from "@/lib/safeStorage";
import { recordAttempt, recordMisses } from "@/lib/speaking/pronunciationStats";

export interface WeakWord {
  word: string;
  ipa?: string;
  misses: number;
  clean: number;
  lastSeen: string; // ISO date
  dueOn: string; // ISO date
  source: "sentence" | "shadow" | "drill" | "freetalk";
}

export type WeakWordStore = Record<string, WeakWord>;

export const CLEAN_STREAK = 3;
export const SPEAKING_PROGRESS_EVENT = "speaking-progress-updated";
const LADDER = [0, 1, 3];

const key = (language: string) => `speaking-weak-words-${language}`;
const todayISO = (d = new Date()) => d.toISOString().slice(0, 10);
const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export const normalizeWord = (word: string): string =>
  word.toLowerCase().replace(/[.,!?;:"'()¿¡…]/g, "").trim();

export const loadWeakWords = (language: string): WeakWordStore =>
  safeStorage.get<WeakWordStore>(key(language), {}) ?? {};

export const saveWeakWords = (language: string, store: WeakWordStore) => {
  safeStorage.set(key(language), store);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SPEAKING_PROGRESS_EVENT, { detail: { language } }));
  }
};

/**
 * Turn per-unit comparison results into weak-word entries. Chinese/Japanese
 * compare per character, so consecutive missed characters are grouped into
 * one word instead of flooding the queue with single characters.
 */
export function missedWordsFromResults(
  results: { word: string; status: string }[],
  language: string,
): { word: string }[] {
  const isMissed = (status: string) => status === "wrong" || status === "missing";
  if (language !== "chinese" && language !== "japanese") {
    // Tiny function words are usually recognition noise, not pronunciation problems.
    const skip = new Set(["a", "an", "the", "to", "of", "and", "is", "it", "in", "on", "at", "i", "or"]);
    return results
      .filter((r) => isMissed(r.status) && !skip.has(normalizeWord(r.word)))
      .map((r) => ({ word: r.word }))
      .slice(0, 6);
  }
  const out: { word: string }[] = [];
  let run = "";
  for (const r of results) {
    if (isMissed(r.status) && /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(r.word)) run += r.word;
    else { if (run) out.push({ word: run }); run = ""; }
  }
  if (run) out.push({ word: run });
  return out.slice(0, 6);
}

/** Record misses coming out of any practice mode. */
export function addWeakWords(
  language: string,
  words: { word: string; ipa?: string }[],
  source: WeakWord["source"] = "sentence"
): WeakWordStore {
  const store = loadWeakWords(language);
  const today = todayISO();
  for (const entry of words) {
    const norm = normalizeWord(entry.word);
    const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(norm);
    if (!norm || (!cjk && norm.length < 2)) continue;
    const prev = store[norm];
    store[norm] = {
      word: entry.word.trim(),
      ipa: entry.ipa || prev?.ipa,
      misses: (prev?.misses ?? 0) + 1,
      clean: 0,
      lastSeen: today,
      dueOn: today,
      source,
    };
  }
  recordMisses(language, words, source);
  saveWeakWords(language, store);
  return store;
}

/** Grade a review attempt. Returns the updated store. */
export function reviewWeakWord(language: string, word: string, correct: boolean): WeakWordStore {
  const store = loadWeakWords(language);
  const norm = normalizeWord(word);
  const card = store[norm];
  if (!card) return store;
  const today = todayISO();
  let mastered = false;
  if (!correct) {
    store[norm] = { ...card, clean: 0, misses: card.misses + 1, lastSeen: today, dueOn: today };
  } else {
    const clean = card.clean + 1;
    if (clean >= CLEAN_STREAK) {
      delete store[norm];
      mastered = true;
    } else {
      store[norm] = { ...card, clean, lastSeen: today, dueOn: addDays(today, LADDER[clean] ?? 3) };
    }
  }
  saveWeakWords(language, store);
  recordAttempt(language, card.word, correct, mastered);
  return store;
}

export const dueWeakWords = (store: WeakWordStore, today = todayISO()): WeakWord[] =>
  Object.values(store)
    .filter((w) => w.dueOn <= today)
    .sort((a, b) => b.misses - a.misses);

export const countWeakWords = (language: string): number => Object.keys(loadWeakWords(language)).length;
