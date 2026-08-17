/**
 * @file cambridgeEvidence.ts
 * @description Finds the sentence inside a Cambridge reading text (or listening
 *              script) that proves the correct answer, so the review screen can
 *              point students to the exact line instead of only naming the key.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be", "been", "am",
  "do", "does", "did", "to", "of", "in", "on", "at", "for", "with", "that", "this", "these",
  "those", "it", "its", "as", "by", "from", "what", "which", "who", "whom", "whose", "how",
  "why", "when", "where", "there", "here", "not", "no", "yes", "you", "your", "he", "she",
  "they", "we", "i", "his", "her", "their", "our", "my", "me", "him", "them", "us", "will",
  "can", "could", "would", "should", "may", "might", "must", "have", "has", "had", "about",
  "says", "say", "said", "listen", "text", "passage", "following", "true", "best", "most",
]);

/** Split a text into readable sentences, keeping punctuation. */
export const splitSentences = (text: string): string[] =>
  text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z"'\u2018\u201c])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);

const tokens = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

/** Loose stem so "travelled" matches "travel" and "buildings" matches "building". */
const stem = (word: string) => word.replace(/(ing|ed|es|s)$/, "");

/**
 * Return the sentence of `text` that best supports `answer` for `question`.
 * Returns null when no sentence shares meaningful words with the answer/question.
 */
export const findEvidenceSentence = (
  text: string | undefined,
  question: string,
  answer: string
): string | null => {
  if (!text) return null;
  const sentences = splitSentences(text);
  if (sentences.length === 0) return null;

  const answerWords = tokens(answer).map(stem);
  const questionWords = tokens(question).map(stem);
  if (answerWords.length === 0 && questionWords.length === 0) return null;

  let best: { sentence: string; score: number } | null = null;
  for (const sentence of sentences) {
    const words = new Set(tokens(sentence).map(stem));
    let score = 0;
    for (const w of answerWords) if (words.has(w)) score += 3;
    for (const w of questionWords) if (words.has(w)) score += 1;
    if (!best || score > best.score) best = { sentence, score };
  }
  if (!best || best.score < 3) return null;
  return best.sentence;
};
