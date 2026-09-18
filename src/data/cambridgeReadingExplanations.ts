/**
 * @file cambridgeReadingExplanations.ts
 * @description Builds evidence based feedback for the Reading & Writing items of
 *              the Cambridge mock papers. Instead of appending one pasted hint to
 *              every question, each item quotes the sentence of its own text that
 *              proves the key, or explains the language rule for standalone
 *              vocabulary and grammar items.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockQuestion } from "./cambridgeMockExamData";
import { findEvidenceSentence, splitSentences } from "@/lib/cambridgeEvidence";

const NUMBER_WORDS: Record<string, string> = {
  one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7",
  eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12", twenty: "20", thirty: "30",
};

/** Words and number variants that must appear in a sentence that proves the key. */
const keyForms = (key: string): string[] => {
  const raw = key
    .toLowerCase()
    .replace(/[^a-z0-9\s.:']/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !/^(the|a|an|and|for|with|about|from|that|this|his|her|not|nothing)$/.test(w));
  const forms = new Set<string>();
  raw.forEach(w => {
    forms.add(w);
    forms.add(w.replace(/(ing|ed|es|s)$/, ""));
    if (NUMBER_WORDS[w]) forms.add(NUMBER_WORDS[w]);
    const asWord = Object.entries(NUMBER_WORDS).find(([, digit]) => digit === w);
    if (asWord) forms.add(asWord[0]);
  });
  return [...forms].filter(Boolean);
};

/** The sentence of the text that actually contains the key (not just question words). */
const sentenceContainingKey = (passage: string | undefined, key: string): string | null => {
  if (!passage) return null;
  const forms = keyForms(key);
  if (!forms.length) return null;
  let best: { sentence: string; hits: number } | null = null;
  for (const sentence of splitSentences(passage)) {
    const lower = sentence.toLowerCase();
    const hits = forms.filter(f => new RegExp(`(^|[^a-z0-9])${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(lower)).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { sentence, hits };
  }
  return best ? best.sentence : null;
};

/** Strip the printed layout cues so a quote reads like a normal sentence. */
const cleanQuote = (sentence: string): string =>
  sentence
    .replace(/^\s*(Notice|Email|Note|Message|Text|Sign|Advert|Advertisement|Poster)\s*:\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

/** Wording that suits the question stem, so the feedback is not one fixed frame. */
const stemFrame = (question: string): { en: string; vi: string } => {
  const q = question.toLowerCase();
  if (/^why\b/.test(q)) return { en: "gives the reason", vi: "nêu lý do" };
  if (/^(when|what time|how long|how often)\b/.test(q)) return { en: "gives the time", vi: "cho biết thời gian" };
  if (/^where\b/.test(q)) return { en: "gives the place", vi: "cho biết địa điểm" };
  if (/^(who|whose)\b/.test(q)) return { en: "names the person", vi: "cho biết người được hỏi" };
  if (/^how (much|many)\b/.test(q)) return { en: "gives the number", vi: "cho biết con số" };
  if (/^how\b/.test(q)) return { en: "explains the way it happens", vi: "cho biết cách thức" };
  if (/\bmust|\bshould|\bhave to\b/.test(q)) return { en: "states the rule", vi: "nêu quy định" };
  return { en: "states it directly", vi: "nói trực tiếp điều đó" };
};

/** Word class of the key, used for standalone vocabulary and grammar items. */
const grammarNote = (question: string, key: string): { en: string; vi: string } | null => {
  const k = key.toLowerCase().trim();
  if (/\b(is|are|am|was|were)\s+___|___\s+(is|are|was|were)\b/i.test(question)) {
    return {
      en: `"${key}" is the word that agrees with the subject and the tense of the sentence.`,
      vi: `"${key}" là từ hợp với chủ ngữ và thời của câu.`,
    };
  }
  if (/^(in|on|at|under|behind|next to|between|near|opposite|beside|above|below)$/i.test(k)) {
    return {
      en: `The preposition "${key}" is the one that matches this place or time expression.`,
      vi: `Giới từ "${key}" là giới từ đi đúng với cách nói về nơi chốn hoặc thời gian này.`,
    };
  }
  if (/^(a|an|the|some|any|much|many|a lot of)$/i.test(k)) {
    return {
      en: `"${key}" is the correct determiner for this noun, so the other options do not fit.`,
      vi: `"${key}" là từ hạn định đúng cho danh từ này, các phương án còn lại không phù hợp.`,
    };
  }
  if (question.includes("___") && (/^(more|most|-er|better|best)/.test(k) || /\bthan\b/i.test(question))) {
    return {
      en: `The comparison in this sentence needs the form "${key}".`,
      vi: `Phép so sánh trong câu này cần dạng "${key}".`,
    };
  }
  return null;
};

/**
 * Feedback for one Reading & Writing item. Returns null when the authored
 * explanation is already specific enough to keep unchanged.
 */
export const buildReadingExplanation = (
  q: CambridgeMockQuestion
): { explanation: string; explanationVi: string } => {
  const key = q.options[q.correctAnswer] ?? "";
  const authored = (q.explanation || "").trim().replace(/\s+/g, " ");
  const authoredVi = (q.explanationVi || "").trim().replace(/\s+/g, " ");

  // Prefer a sentence that really contains the key. Only when the key is a
  // paraphrase of the text do we quote the closest sentence, and we say so.
  const direct = sentenceContainingKey(q.passage, key);
  const evidenceRaw = direct ?? findEvidenceSentence(q.passage, q.question, key);
  const evidence = evidenceRaw ? cleanQuote(evidenceRaw) : null;

  if (evidence) {
    const frame = stemFrame(q.question);
    const alreadyQuoted = authored.length >= 40 && authored.toLowerCase().includes(evidence.slice(0, 24).toLowerCase());
    const en = direct
      ? `The text ${frame.en}: "${evidence}" So the answer is "${key}", and the other options are details the text never gives.`
      : `The answer is a paraphrase: the text says "${evidence}" which means "${key}". The other options are not supported by the text.`;
    const vi = direct
      ? `Bài đọc ${frame.vi}: "${evidence}" Vì vậy đáp án là "${key}"; các phương án khác không có trong bài.`
      : `Đáp án là cách diễn đạt lại: bài đọc viết "${evidence}", nghĩa là "${key}". Các phương án khác không được bài đọc xác nhận.`;
    return {
      explanation: alreadyQuoted ? authored : en,
      explanationVi: authoredVi.length >= 25 ? authoredVi : vi,
    };
  }

  const note = grammarNote(q.question, key);
  if (note) {
    return {
      explanation: authored.length >= 40 ? authored : `${authored ? `${authored} ` : ""}${note.en}`,
      explanationVi: authoredVi.length >= 25 ? authoredVi : note.vi,
    };
  }

  const explanation =
    authored.length >= 40
      ? authored
      : `${authored ? `${authored} ` : ""}Only "${key}" completes this item correctly: the other options change the meaning or do not fit the sentence.`;
  const explanationVi =
    authoredVi.length >= 25
      ? authoredVi
      : `Chỉ "${key}" là đáp án đúng cho câu này; các phương án khác làm sai nghĩa hoặc không hợp với câu.`;
  return { explanation, explanationVi };
};
