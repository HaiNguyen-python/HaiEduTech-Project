/**
 * @file cambridgeListeningClarity.ts
 * @description Makes every Cambridge listening item answerable from the
 *              recording alone. Some authored scripts only implied the key
 *              ("small and brown, likes to run in the garden" for "A dog") or
 *              expected the child to convert a number or a clock time that the
 *              speaker never actually said. This pass adds one natural spoken
 *              sentence that states the key, phrased from the question stem, and
 *              appends the evidence line to the bilingual explanation.
 *
 *              It runs before the script upgrade, so the added sentence becomes
 *              part of the key line that the upgrade keeps verbatim.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";
import { isAnswerSupported, isNegativeQuestion } from "./cambridgeListeningSupport";

/** Strip the "Listen:" wrapper and the surrounding quotes of an authored line. */
const coreLine = (passage: string): string => {
  let text = passage.replace(/^\s*Listen:\s*/i, "").trim();
  text = text.replace(/\n+/g, " ").trim();
  const quoted = text.match(/^['"“](.*)['"”]$/s);
  if (quoted) text = quoted[1].trim();
  return text.replace(/\s+/g, " ");
};

const lower = (text: string): string =>
  /^[A-Z]{2,}|^£|^\$|^\d/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1);

const isTimeLike = (text: string): boolean => /^\d{1,2}([:.]\d{2})?\s*(a\.?m\.?|p\.?m\.?|o'clock)?$/i.test(text.trim());
const isPriceLike = (text: string): boolean => /^[£$]\d/.test(text.trim());
const isNumberLike = (text: string): boolean => /^\d+([.,]\d+)?(\s*[a-z.]+)?$/i.test(text.trim());
const MONTHS = /\b(january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;
const isDateLike = (text: string): boolean => MONTHS.test(text);
/** Clause keys already have a subject, so they read well after "Yes,". */
const isClause = (text: string): boolean => /^(i|you|he|she|it|they|we|there)\b/i.test(text.trim());
/** Base or -ing verb keys need "to" or a progressive frame. */
const BASE_VERBS = /^(write|read|buy|take|use|go|cook|play|walk|cycle|swim|call|ask|visit|postpone|cancel|book|bring|wear|study|join|help|meet|send|wait|start|finish|change|recycle|save|plant)\b/i;
const isIng = (text: string): boolean => /^[a-z]+ing\b/i.test(text.trim());

/** Keep proper nouns capitalised, lower case ordinary noun phrases mid sentence. */
const midSentence = (text: string): string =>
  isDateLike(text) || /^[A-Z]{2,}|^£|^\$|^\d|^Mr|^Mrs|^Miss/.test(text) ? text : lower(text);

/**
 * A spoken sentence that states the key naturally, chosen from the question
 * stem and the shape of the option so the recording still sounds like a
 * conversation and not a coaching cue.
 */
const supportSentence = (question: string, key: string): string => {
  const q = question.toLowerCase();
  const raw = key.trim().replace(/\.$/, "");
  const said = midSentence(raw);
  const bare = said.replace(/^(a|an|the)\s+/i, "");

  if (isPriceLike(raw) || /how much (is|are|does|do)/.test(q)) return `The price is ${raw}.`;
  if (/how many|how long/.test(q) && isNumberLike(raw)) return `That makes ${raw} altogether.`;
  if (/what time|when/.test(q) && isTimeLike(raw)) return `That is at ${raw}.`;
  if (/what time|when/.test(q) && isDateLike(raw)) return `That is on ${raw}.`;
  if (/how (does|did|do|is|was) .*(feel)/.test(q)) return `I feel ${bare} about it, to be honest.`;
  if (/how sure|how certain|how likely/.test(q)) return `I would say that is ${bare}.`;
  if (isClause(raw)) return `Yes, ${said}.`;
  if (isIng(raw)) return `The plan is ${said}.`;
  if (BASE_VERBS.test(raw)) return `The plan is to ${said}.`;
  if (/\bwhy\b/.test(q)) return `The reason is ${said}.`;
  if (/how many|how long/.test(q)) return `That is ${said} in total.`;
  if (/what time|when/.test(q)) return `That happens ${said}.`;
  return `It is ${said}.`;
};


const withEvidence = (q: CambridgeMockQuestion, sentence: string): CambridgeMockQuestion => {
  const quoted = `"${sentence.replace(/\.$/, "")}"`;
  const explanation = q.explanation?.includes(quoted)
    ? q.explanation
    : `${(q.explanation ?? "").trim()} The speaker says ${quoted}.`.trim();
  const explanationVi = q.explanationVi?.includes(quoted)
    ? q.explanationVi
    : `${(q.explanationVi ?? "").trim()} Câu dẫn chứng trong bài nghe: ${quoted}.`.trim();
  return { ...q, explanation, explanationVi };
};

/** Add the missing key sentence to every listening item that needs one. */
export const clarifyCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(q => {
    if (q.section !== "Listening" || !q.passage) return q;
    // Negative stems ("what should tourists NOT do?") are answered by what the
    // script rules out, so stating the key as a fact would break them.
    if (isNegativeQuestion(q.question)) return q;
    const core = coreLine(q.passage);
    const key = q.options[q.correctAnswer] ?? "";
    if (!core || !key) return q;
    if (isAnswerSupported(core, key)) return q;

    const sentence = supportSentence(q.question, key);
    const updated = withEvidence(q, sentence);
    return { ...updated, passage: `Listen: '${core} ${sentence}'` };
  }),
});
