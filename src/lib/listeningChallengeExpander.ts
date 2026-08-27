/**
 * @file listeningChallengeExpander.ts
 * @description Runtime upgrade for ConvLesson.listeningChallenge.
 *  - Lengthens the spoken transcript to a realistic recording length by weaving
 *    in extra on topic turns taken from the lesson's own
 *    keySituations.sampleDialogue, with a short bridge line when the scene
 *    changes. Any line that would reveal a wrong option as a fact is skipped.
 *  - Tops the question list up with questions that can only be answered from
 *    the recording itself (a figure that is spoken, a detail that is mentioned,
 *    or the meaning of a phrase the listener actually hears). No question is
 *    generated from material outside the transcript.
 *
 * Pure function. No side effects on the original lesson object.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ConvLesson, ListeningChallenge } from "@/data/conversationalCurriculum";

type Question = ListeningChallenge["questions"][number];

const MIN_QUESTIONS = 5;
/** Words of spoken text a recording should reach (roughly 50 to 70 seconds). */
const TARGET_WORDS = 150;
const MAX_WORDS = 220;

const wordCount = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

const norm = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9%$£. ]/g, " ").replace(/\s+/g, " ").trim();

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const shuffleStable = <T,>(arr: T[], seed: number): T[] => {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Every wrong option of the existing questions, so appended lines never state one. */
const wrongOptionTexts = (questions: Question[]): string[] =>
  questions.flatMap((q) => q.options.filter((_, i) => i !== q.answer)).map(norm).filter((o) => o.length >= 3);

function extendTranscript(lesson: ConvLesson, base: string, questions: Question[]): string {
  const situations = lesson.keySituations || [];
  if (!situations.length) return base;

  let result = base.trim();
  if (wordCount(result) >= TARGET_WORDS) return result;

  const forbidden = wrongOptionTexts(questions);
  const safe = (line: string): boolean => {
    const plain = norm(line);
    return !forbidden.some((bad) => plain.includes(bad));
  };

  // Prefer the situation whose dialogue already overlaps the recording, so the
  // extra turns continue the same scene.
  const scored = situations
    .map((sit) => {
      let score = 0;
      for (const turn of sit.sampleDialogue || []) {
        const line = turn.line?.trim();
        if (line && result.includes(line)) score += line.length;
      }
      return { sit, score };
    })
    .sort((a, b) => b.score - a.score);

  scored.forEach(({ sit, score }, sitIndex) => {
    if (wordCount(result) >= TARGET_WORDS) return;
    const lines = (sit.sampleDialogue || [])
      .map((turn) => ({ speaker: turn.speaker?.trim() || "Speaker", line: turn.line?.trim() || "" }))
      .filter((turn) => turn.line && !result.includes(turn.line) && safe(turn.line));
    if (!lines.length) return;

    // A new scene needs a bridge so the recording still sounds continuous.
    if (score === 0 || sitIndex > 0) {
      result += `\nNarrator: Later in the same recording, at ${lesson.title.toLowerCase()} time.`;
    }
    for (const turn of lines) {
      if (wordCount(result) >= MAX_WORDS) break;
      result += `\n${turn.speaker}: ${turn.line}`;
      if (wordCount(result) >= TARGET_WORDS) break;
    }
  });

  return result;
}

/** A figure that is actually spoken in the recording. */
function buildFigureQuestion(transcript: string, existing: Question[], seed: number): Question | null {
  const spoken = transcript.match(/[£$]?\d+(?:[.,]\d+)?%?/g) ?? [];
  const used = new Set(existing.flatMap((q) => q.options.map(norm)));
  const figure = spoken.find((f) => !used.has(norm(f)) && /\d/.test(f));
  if (!figure) return null;

  const value = Number(figure.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(value)) return null;
  const prefix = figure.startsWith("£") ? "£" : figure.startsWith("$") ? "$" : "";
  const suffix = figure.endsWith("%") ? "%" : "";
  const shape = (n: number) => `${prefix}${Number.isInteger(value) ? n : n.toFixed(2)}${suffix}`;
  const plain = norm(transcript);
  const deltas = [1, 2, 3, 5, 10, 4];
  const distractors: string[] = [];
  for (const d of deltas) {
    for (const candidate of [shape(value + d), shape(Math.max(0, value - d))]) {
      if (
        distractors.length < 3 &&
        candidate !== figure &&
        !distractors.includes(candidate) &&
        !plain.includes(norm(candidate))
      ) {
        distractors.push(candidate);
      }
    }
  }
  if (distractors.length < 3) return null;

  const options = shuffleStable([figure, ...distractors], seed);
  return {
    q: "Which figure do you hear in the recording?",
    qVi: "Bạn nghe thấy con số nào trong bài nghe?",
    options,
    answer: options.indexOf(figure),
  };
}

const DETAIL_STOP = new Set([
  "narrator", "speaker", "later", "recording", "please", "thank", "thanks", "hello",
  "would", "could", "should", "there", "their", "about", "because", "really",
]);

const DETAIL_DECOYS = [
  "a free parking voucher", "a printed paper map", "a swimming pool pass",
  "a second-hand bicycle", "a birthday cake order", "a train ticket refund",
  "a library membership card", "a winter coat discount", "a taxi receipt",
  "a hotel breakfast coupon", "a phone insurance plan", "a gym locker key",
];

/** A concrete detail that is mentioned, with decoys that are never spoken. */
function buildDetailQuestion(transcript: string, existing: Question[], seed: number): Question | null {
  const plain = norm(transcript);
  const used = new Set(existing.flatMap((q) => q.options.map(norm)));
  const candidates: string[] = [];
  const sentences = transcript.split(/[\n.!?]+/).map((s) => s.replace(/^[A-Za-z ]+:\s*/, "").trim());
  for (const sentence of sentences) {
    const words = sentence.split(/\s+/).filter(Boolean);
    for (let i = 0; i + 1 < words.length; i++) {
      const pair = `${words[i]} ${words[i + 1]}`.replace(/[^A-Za-z0-9 '-]/g, "").trim();
      const parts = pair.toLowerCase().split(" ");
      if (parts.length !== 2) continue;
      if (parts.some((w) => w.length < 4 || DETAIL_STOP.has(w))) continue;
      if (used.has(norm(pair))) continue;
      candidates.push(pair);
    }
  }
  const detail = shuffleStable(candidates, seed)[0];
  if (!detail) return null;

  const decoys = DETAIL_DECOYS.filter((d) => !plain.includes(norm(d)));
  const pool = shuffleStable(decoys, seed + 3).slice(0, 3);
  if (pool.length < 3) return null;

  const options = shuffleStable([detail, ...pool], seed + 11);
  return {
    q: "Which detail is mentioned in the recording?",
    qVi: "Chi tiết nào được nhắc đến trong bài nghe?",
    options,
    answer: options.indexOf(detail),
  };
}

/** Meaning of a phrase the listener really hears, so it stays a listening task. */
function buildHeardVocabQuestion(
  lesson: ConvLesson,
  transcript: string,
  existing: Question[],
  seed: number,
): Question | null {
  const plain = norm(transcript);
  const vocab = (lesson.vocabulary || []).filter(
    (v) => v.term && v.meaningEn && plain.includes(norm(v.term)),
  );
  const asked = new Set(existing.map((q) => q.q));
  const entry = shuffleStable(vocab, seed).find((v) => !asked.has(`What does "${v.term}" mean in the recording?`));
  if (!entry) return null;

  const distractors = (lesson.vocabulary || [])
    .filter((v) => v.term !== entry.term && v.meaningEn)
    .map((v) => v.meaningEn);
  const pool = shuffleStable(distractors, seed + 5).slice(0, 3);
  if (pool.length < 3) return null;

  const options = shuffleStable([entry.meaningEn, ...pool], seed + 9);
  return {
    q: `What does "${entry.term}" mean in the recording?`,
    qVi: `Trong bài nghe, "${entry.term}" có nghĩa là gì?`,
    options,
    answer: options.indexOf(entry.meaningEn),
  };
}

const SENTENCE_DECOYS = [
  "The office will stay closed for the whole month",
  "Everyone has to bring their own lunch box",
  "The training video is only in French",
  "We are moving the whole team to another city",
  "The wifi password changes every single hour",
  "Parking is free for the rest of the year",
];

/** A sentence the listener really hears, against decoys that are never spoken. */
function buildSentenceQuestion(transcript: string, existing: Question[], seed: number): Question | null {
  const plain = norm(transcript);
  const asked = new Set(existing.map((q) => q.q));
  if (asked.has("Which sentence do you hear in the recording?")) return null;
  const sentences = transcript
    .split(/[\n.!?]+/)
    .map((s) => s.replace(/^[A-Za-z ]+:\s*/, "").trim())
    .filter((s) => {
      const wc = s.split(/\s+/).filter(Boolean).length;
      return wc >= 5 && wc <= 14 && !/^Narrator/i.test(s);
    });
  const heard = shuffleStable(sentences, seed)[0];
  if (!heard) return null;
  const decoys = shuffleStable(SENTENCE_DECOYS.filter((d) => !plain.includes(norm(d))), seed + 2).slice(0, 3);
  if (decoys.length < 3) return null;
  const options = shuffleStable([heard, ...decoys], seed + 4);
  return {
    q: "Which sentence do you hear in the recording?",
    qVi: "Câu nào xuất hiện trong bài nghe?",
    options,
    answer: options.indexOf(heard),
  };
}

export function expandListeningChallenge(lesson: ConvLesson): ListeningChallenge {
  const original = lesson.listeningChallenge;
  if (!original) return original;


  const base = original.transcript || "";
  const questions: Question[] = original.questions ? original.questions.slice() : [];
  const transcript = extendTranscript(lesson, base, questions);
  const seed = hash(lesson.id);

  const generators = [buildFigureQuestion, buildDetailQuestion, buildSentenceQuestion] as const;
  let guard = 0;
  while (questions.length < MIN_QUESTIONS && guard < 12) {
    const before = questions.length;
    const heard = buildHeardVocabQuestion(lesson, transcript, questions, seed + guard);
    if (heard && questions.length < MIN_QUESTIONS) questions.push(heard);
    for (const fn of generators) {
      if (questions.length >= MIN_QUESTIONS) break;
      const q = fn(transcript, questions, seed + guard * 13);
      if (q && !questions.some((e) => e.q === q.q)) questions.push(q);
    }
    guard++;
    if (questions.length === before) break;
  }

  return { ...original, transcript, questions };
}
