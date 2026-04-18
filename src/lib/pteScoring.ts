/**
 * @file pteScoring.ts
 * @description String similarity, content match, and PTE band conversion utilities.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

// Normalize text for comparison: lowercase, strip punctuation, collapse whitespace
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"'`()\[\]{}—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// Tokenize into words (filter empties)
export const tokenize = (text: string): string[] =>
  normalizeText(text).split(" ").filter(Boolean);

// Levenshtein distance — used for word-level fuzzy matching
const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp: number[] = Array(b.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const cur = Math.min(dp[j] + 1, prev + 1, dp[j - 1] + cost);
      dp[j - 1] = prev;
      prev = cur;
    }
    dp[b.length] = prev;
  }
  return dp[b.length];
};

// Word equality with small typo tolerance (1 edit on words >= 5 chars)
const wordsMatch = (a: string, b: string): boolean => {
  if (a === b) return true;
  if (Math.min(a.length, b.length) >= 5 && Math.abs(a.length - b.length) <= 2) {
    return levenshtein(a, b) <= 1;
  }
  return false;
};

// Returns similarity ratio 0..1 between expected and actual using token overlap
export const stringSimilarity = (expected: string, actual: string): number => {
  const e = tokenize(expected);
  const a = tokenize(actual);
  if (e.length === 0) return 0;
  let matched = 0;
  const used = new Array(a.length).fill(false);
  for (const token of e) {
    const idx = a.findIndex((w, i) => !used[i] && wordsMatch(w, token));
    if (idx >= 0) {
      used[idx] = true;
      matched++;
    }
  }
  return matched / e.length;
};

// Detailed word-by-word comparison for dictation/repeat sentence
export interface WordDiff {
  word: string;
  status: "correct" | "wrong" | "missing" | "extra";
}
export const diffWords = (expected: string, actual: string): WordDiff[] => {
  const e = tokenize(expected);
  const a = tokenize(actual);
  const result: WordDiff[] = [];
  const usedActual = new Array(a.length).fill(false);
  for (const token of e) {
    const idx = a.findIndex((w, i) => !usedActual[i] && wordsMatch(w, token));
    if (idx >= 0) {
      usedActual[idx] = true;
      result.push({ word: token, status: "correct" });
    } else {
      result.push({ word: token, status: "missing" });
    }
  }
  a.forEach((w, i) => {
    if (!usedActual[i]) result.push({ word: w, status: "extra" });
  });
  return result;
};

// Keyword coverage — for Describe Image / Summarize tasks
export const keywordCoverage = (response: string, keywords: string[]): { hits: string[]; coverage: number } => {
  const normalized = normalizeText(response);
  const hits = keywords.filter(kw => {
    const kwTokens = tokenize(kw);
    return kwTokens.every(t => normalized.includes(t));
  });
  return { hits, coverage: keywords.length === 0 ? 1 : hits.length / keywords.length };
};

// Convert similarity 0..1 to PTE band 10..90
export const similarityToBand = (similarity: number): number => {
  // Floor at 10, ceiling at 90, scaled
  const band = Math.round(10 + similarity * 80);
  return Math.max(10, Math.min(90, band));
};

// Band feedback message
export const bandLabel = (band: number): { label: string; color: string } => {
  if (band >= 79) return { label: "Excellent (Expert User)", color: "text-emerald-600" };
  if (band >= 65) return { label: "Very Good (Competent)", color: "text-blue-600" };
  if (band >= 50) return { label: "Good (Modest)", color: "text-amber-600" };
  if (band >= 30) return { label: "Limited", color: "text-orange-600" };
  return { label: "Beginner", color: "text-red-600" };
};
