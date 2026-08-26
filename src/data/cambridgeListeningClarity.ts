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

const stripArticle = (text: string): string => text.replace(/^(A|An|The)\s+/i, "");
const isTimeLike = (text: string): boolean => /^\d{1,2}(:\d{2})?\s*(am|pm)?$/i.test(text.trim());
const isPriceLike = (text: string): boolean => /^[£$]\d/.test(text.trim());
const isNumberLike = (text: string): boolean => /^\d+$/.test(text.trim());

/**
 * A spoken sentence that states the key naturally, chosen from the question
 * stem so the recording still sounds like a conversation and not a coaching cue.
 */
const supportSentence = (question: string, key: string): string => {
  const q = question.toLowerCase();
  const plain = stripArticle(key.trim()).replace(/\.$/, "");

  if (/how many|how much/.test(q) && isNumberLike(plain)) return `That makes ${plain} altogether.`;
  if (/how much/.test(q) || isPriceLike(plain)) return `The price is ${plain}.`;
  if (/what time|when/.test(q) && isTimeLike(plain)) return `That is at ${plain}.`;
  if (/what time|when/.test(q)) return `That is ${lower(plain)}.`;
  if (/^where|\bwhere\b/.test(q)) return `It is ${lower(plain)}.`;
  if (/\bwhy\b/.test(q)) return `That is because ${lower(plain)}.`;
  if (/how (does|did|do) .*(feel)/.test(q)) return `I feel ${lower(plain)} about it, to be honest.`;
  if (/how sure|how certain/.test(q)) return `I would say that is ${lower(plain)}.`;
  if (/what .*(want|suggest|ask|need)/.test(q)) return `What I would like is to ${lower(plain)}.`;
  if (/who\b/.test(q)) return `It is ${lower(plain)}.`;
  if (/what .*(doing|do)\b/.test(q)) return `I am ${lower(plain)} right now.`;
  return `So it is ${lower(plain)}.`;
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
