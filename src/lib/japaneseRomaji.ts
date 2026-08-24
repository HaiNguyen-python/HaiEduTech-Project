/**
 * @file japaneseRomaji.ts
 * @description Japanese text normalisation helpers used to grade speech
 *  recognition results. Japanese has no word spacing and the recogniser may
 *  return kana where the target uses kanji, so comparison happens on a
 *  normalised kana/plain-text form.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

/** Katakana -> hiragana so カタカナ and かたかな compare equal. */
export const katakanaToHiragana = (text: string) =>
  text.replace(/[\u30A1-\u30F6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));

/**
 * Strips punctuation and spacing, folds full-width forms and katakana so two
 * spellings of the same utterance match.
 */
export const normalizeJapanese = (text: string) =>
  katakanaToHiragana(
    text
      .normalize("NFKC")
      .replace(/[。、，．,.!?！？「」『』（）()~〜ー・:;]/g, "")
      .replace(/\s+/g, "")
  ).toLowerCase();

/** Splits a sentence into learner-friendly chunks (spaces first, else kana runs). */
export const japaneseChunks = (text: string): string[] => {
  const spaced = text.trim().split(/\s+/).filter(Boolean);
  if (spaced.length > 1) return spaced;
  return text.replace(/\s+/g, "").split(/(?<=[。、！？])/).filter(Boolean);
};

/** Character-level similarity (0-100) between the target and what was said. */
export function japaneseAccuracy(target: string, actual: string): number {
  const a = [...normalizeJapanese(target)];
  const b = [...normalizeJapanese(actual)];
  if (a.length === 0) return 0;
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return Math.max(0, Math.round(((a.length - dp[a.length][b.length]) / a.length) * 100));
}

/** Per-chunk grading so learners see exactly which part was missed. */
export function gradeJapaneseChunks(target: string, actual: string) {
  const said = normalizeJapanese(actual);
  return japaneseChunks(target).map((chunk) => {
    const key = normalizeJapanese(chunk);
    if (!key) return { chunk, status: "correct" as const };
    if (said.includes(key)) return { chunk, status: "correct" as const };
    const partial = [...key].filter((c) => said.includes(c)).length / [...key].length;
    return { chunk, status: partial >= 0.6 ? ("close" as const) : ("wrong" as const) };
  });
}
