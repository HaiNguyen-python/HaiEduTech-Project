/**
 * @file swedishReadingReview.ts
 * @description Builds a deterministic post-reading review quiz for a Swedish
 *              passage. Mixes several task types so learners consolidate both
 *              vocabulary and grammar right after reading:
 *                - vocab-en2sv : pick the Swedish word for an English meaning
 *                - vocab-sv2en : pick the English meaning of a Swedish word
 *                - gapfill     : type the missing word in a passage sentence
 *                - wordorder   : rebuild a scrambled passage sentence
 *                - grammar     : pick the sentence that uses a given structure
 *              Pure client-side, no AI calls - stable output for a given text.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { buildGrammarNotes, buildHardWords, type HardWord } from "@/lib/swedishReadingNotes";

export type ReviewTaskKind = "vocab-en2sv" | "vocab-sv2en" | "gapfill" | "wordorder" | "grammar";

export interface ReviewTask {
  id: string;
  kind: ReviewTaskKind;
  /** Swedish instruction (primary, YKI style). */
  promptSv: string;
  promptVi: string;
  promptEn: string;
  /** Extra line: the sentence with a blank, the English meaning, etc. */
  hint?: string;
  /** MCQ options (absent for gapfill / wordorder). */
  options?: string[];
  /** Index of the correct option for MCQ tasks. */
  correctIndex?: number;
  /** Expected free-text answer (gapfill / wordorder). */
  answerText?: string;
  /** Scrambled tokens for wordorder tasks. */
  tokens?: string[];
  explanationSv?: string;
  explanationVi: string;
  explanationEn: string;
}

/* ── deterministic RNG ─────────────────────────────────────────── */

const hash = (key: string): number => {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const rng = (key: string) => {
  let seed = hash(key) || 1;
  return () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
};

const shuffle = <T,>(arr: T[], key: string): T[] => {
  const next = rng(key);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Build 4 options around a correct value, then shuffle deterministically. */
const buildOptions = (
  correct: string,
  pool: string[],
  key: string,
): { options: string[]; correctIndex: number } => {
  const distractors: string[] = [];
  for (const cand of shuffle(pool.filter((p) => p && p !== correct), key + "d")) {
    if (distractors.includes(cand)) continue;
    distractors.push(cand);
    if (distractors.length >= 3) break;
  }
  const options = shuffle([correct, ...distractors], key + "o");
  return { options, correctIndex: options.indexOf(correct) };
};

const splitSentences = (text: string): string[] =>
  text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?:])\s+/))
    .map((s) => s.trim().replace(/^[-•]\s*/, ""))
    .filter((s) => s.split(/\s+/).length >= 4);

/* ── task builders ─────────────────────────────────────────────── */

const vocabTasks = (words: HardWord[], seed: string): ReviewTask[] => {
  const usable = words.filter((w) => w.en && w.sv);
  if (usable.length < 4) return [];
  const picked = shuffle(usable, seed + "v").slice(0, 6);
  const svPool = usable.map((w) => w.sv);
  const enPool = usable.map((w) => w.en as string);

  return picked.map((w, i) => {
    const en2sv = i % 2 === 0;
    const key = `${seed}-v${i}-${w.sv}`;
    if (en2sv) {
      const { options, correctIndex } = buildOptions(w.sv, svPool, key);
      return {
        id: key,
        kind: "vocab-en2sv",
        promptSv: `Vilket svenskt ord betyder "${w.en}"?`,
        promptVi: `Từ tiếng Thụy Điển nào có nghĩa "${w.en}"?`,
        promptEn: `Which Swedish word means "${w.en}"?`,
        options,
        correctIndex,
        explanationSv: `${w.sv} = ${w.en}`,
        explanationVi: `${w.sv} = ${w.vi} (${w.en})`,
        explanationEn: `${w.sv} = ${w.en}`,
      } satisfies ReviewTask;
    }
    const { options, correctIndex } = buildOptions(w.en as string, enPool, key);
    return {
      id: key,
      kind: "vocab-sv2en",
      promptSv: `Vad betyder "${w.sv}"?`,
      promptVi: `"${w.sv}" nghĩa là gì?`,
      promptEn: `What does "${w.sv}" mean?`,
      options,
      correctIndex,
      explanationSv: `${w.sv} = ${w.en}`,
      explanationVi: `${w.sv} = ${w.vi} (${w.en})`,
      explanationEn: `${w.sv} = ${w.en}`,
    } satisfies ReviewTask;
  });
};

const gapfillTasks = (
  sentences: string[],
  words: HardWord[],
  seed: string,
): ReviewTask[] => {
  const out: ReviewTask[] = [];
  const used = new Set<string>();
  for (const w of shuffle(words, seed + "g")) {
    if (out.length >= 3) break;
    const re = new RegExp(`(^|[^a-zåäöA-ZÅÄÖ])(${w.sv})([^a-zåäöA-ZÅÄÖ]|$)`, "i");
    const hit = sentences.find((s) => re.test(s) && !used.has(s));
    if (!hit) continue;
    used.add(hit);
    const match = hit.match(re);
    const surface = match?.[2] ?? w.sv;
    const blanked = hit.replace(re, (_m, a, _b, c) => `${a}______${c}`);
    out.push({
      id: `${seed}-g${out.length}`,
      kind: "gapfill",
      promptSv: "Skriv det ord som saknas i meningen.",
      promptVi: "Điền từ còn thiếu vào câu.",
      promptEn: "Type the missing word in the sentence.",
      hint: blanked,
      answerText: surface,
      explanationSv: `Rätt svar: ${surface}. ${w.sv} = ${w.en ?? ""}`.trim(),
      explanationVi: `Đáp án: ${surface} - ${w.vi}`,
      explanationEn: `Answer: ${surface} - ${w.en ?? w.vi}`,
    });
  }
  return out;
};

const wordOrderTasks = (sentences: string[], seed: string): ReviewTask[] => {
  const candidates = sentences.filter((s) => {
    const n = s.split(/\s+/).length;
    return n >= 5 && n <= 11;
  });
  return shuffle(candidates, seed + "w")
    .slice(0, 2)
    .map((s, i) => {
      const clean = s.replace(/\s+/g, " ").trim();
      const tokens = clean.split(" ");
      return {
        id: `${seed}-w${i}`,
        kind: "wordorder" as const,
        promptSv: "Sätt orden i rätt ordning.",
        promptVi: "Sắp xếp các từ thành câu đúng.",
        promptEn: "Put the words in the correct order.",
        tokens: shuffle(tokens, `${seed}-w${i}-t`),
        answerText: clean,
        explanationSv: clean,
        explanationVi: `Câu đúng: ${clean}`,
        explanationEn: `Correct sentence: ${clean}`,
      };
    });
};

const grammarTasks = (textSv: string, sentences: string[], seed: string): ReviewTask[] => {
  const notes = buildGrammarNotes(textSv, 6);
  const out: ReviewTask[] = [];
  notes.slice(0, 3).forEach((g, i) => {
    const pool = sentences.filter((s) => s !== g.exampleSv);
    if (pool.length < 3) return;
    const key = `${seed}-gr${i}`;
    const { options, correctIndex } = buildOptions(g.exampleSv, pool, key);
    out.push({
      id: key,
      kind: "grammar",
      promptSv: `Vilken mening använder strukturen "${g.labelSv}"?`,
      promptVi: `Câu nào dùng cấu trúc "${g.labelSv}"?`,
      promptEn: `Which sentence uses the structure "${g.labelSv}"?`,
      options,
      correctIndex,
      explanationSv: `${g.labelSv}: ${g.exampleSv}`,
      explanationVi: `${g.titleVi} - ${g.explainVi}`,
      explanationEn: `${g.titleEn} - ${g.explainEn}`,
    });
  });
  return out;
};

/**
 * Build the mixed review quiz for a passage. Order alternates task types so the
 * learner never gets a long run of the same exercise.
 */
export const buildReadingReviewQuiz = (
  passageId: string,
  textSv: string,
  keyVocab: { sv: string; vi: string }[] = [],
): ReviewTask[] => {
  const sentences = splitSentences(textSv);
  const words = buildHardWords(textSv, keyVocab, 16);
  const groups = [
    vocabTasks(words, passageId),
    grammarTasks(textSv, sentences, passageId),
    gapfillTasks(sentences, words, passageId),
    wordOrderTasks(sentences, passageId),
  ];

  // Round-robin interleave so kinds alternate.
  const mixed: ReviewTask[] = [];
  let idx = 0;
  while (mixed.length < 12) {
    const before = mixed.length;
    for (const g of groups) if (g[idx]) mixed.push(g[idx]);
    idx++;
    if (mixed.length === before) break;
  }
  return mixed.slice(0, 12);
};

/** Loose comparison for typed answers (case / punctuation insensitive). */
export const normalizeAnswer = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[.,!?;:"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
