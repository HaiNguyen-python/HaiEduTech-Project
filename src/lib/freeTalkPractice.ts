import { safeStorage } from "@/lib/safeStorage";
import type { SpeakingLang } from "@/lib/speakingModeShared";

export interface FreeTalkQuickReport {
  words: number;
  durationSec: number;
  wpm: number;
  fillers: string[];
  uniqueRatio: number;
  score: number;
}

export interface FreeTalkSession {
  date: string;
  level: string;
  durationSec: number;
  words: number;
  wpm: number;
  fillers: number;
  score: number;
  aiScore?: number;
}

const HISTORY_LIMIT = 12;
const historyKey = (language: string) => `speaking-free-talk-history-${language}`;

export function buildFreeTalkQuickReport(
  transcript: string,
  language: SpeakingLang,
  durationMs: number,
  patterns: Record<string, string[]>
): FreeTalkQuickReport {
  const units = transcript.match(/\S+/g) ?? [];
  const words = units.length || transcript.length;
  const durationSec = Math.max(1, Math.round(durationMs / 1000));
  const wpm = Math.round(words / (durationSec / 60));
  const lower = transcript.toLocaleLowerCase();
  const fillers = (patterns[language] ?? []).filter((filler) => lower.includes(filler.toLocaleLowerCase()));
  const uniqueRatio = words ? Math.round((new Set(units.map((unit) => unit.toLocaleLowerCase())).size / words) * 100) : 0;
  const paceScore = wpm >= 90 && wpm <= 160 ? 100 : wpm < 90 ? Math.max(30, wpm) : Math.max(40, 200 - wpm);
  const score = Math.max(0, Math.min(100, Math.round(paceScore * 0.4 + uniqueRatio * 0.4 + Math.max(0, 100 - fillers.length * 12) * 0.2)));
  return { words, durationSec, wpm, fillers, uniqueRatio, score };
}

export const loadFreeTalkHistory = (language: string): FreeTalkSession[] =>
  safeStorage.get<FreeTalkSession[]>(historyKey(language), []) ?? [];

export function saveFreeTalkSession(language: string, session: FreeTalkSession): FreeTalkSession[] {
  const next = [session, ...loadFreeTalkHistory(language)].slice(0, HISTORY_LIMIT);
  safeStorage.set(historyKey(language), next);
  return next;
}

export function updateLatestFreeTalkAiScore(language: string, aiScore: number): FreeTalkSession[] {
  const history = loadFreeTalkHistory(language);
  if (!history.length) return history;
  const next = [{ ...history[0], aiScore }, ...history.slice(1)];
  safeStorage.set(historyKey(language), next);
  return next;
}

export function splitGrammarFix(value: string): { original: string; improved: string } | null {
  const parts = value.split(/\s*(?:->|→)\s*/);
  if (parts.length < 2 || !parts[0].trim() || !parts.slice(1).join(" -> ").trim()) return null;
  return { original: parts[0].trim(), improved: parts.slice(1).join(" -> ").trim() };
}