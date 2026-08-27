/**
 * @file cambridgeListeningUpgrade.ts
 * @description Keeps Cambridge listening recordings short and faithful to the
 *              authored material. It adds only a brief exam instruction and
 *              speaker turns. It never pads a recording with invented chat or
 *              distractors, because those additions can change the meaning of
 *              the question.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

const hash = (text: string): number => {
  let value = 0;
  for (let index = 0; index < text.length; index += 1) {
    value = (value * 31 + text.charCodeAt(index)) % 100000;
  }
  return value;
};

/** Remove the data wrapper while preserving the exact authored information. */
const coreLine = (passage: string): string => {
  let text = passage.replace(/^\s*Listen:\s*/i, "").trim();
  text = text.replace(/\n+/g, " ").trim();
  const quoted = text.match(/^[\s'"“](.*)['"”]$/s);
  if (quoted) text = quoted[1].trim();
  return text.replace(/\s+/g, " ");
};

const sentencesOf = (text: string): string[] =>
  (text.match(/[^.!?]+[.!?]*/g) ?? [text]).map(sentence => sentence.trim()).filter(Boolean);

const REPLY_START =
  /^(yes|no|yeah|sure|certainly|of course|ok|okay|right|well|thanks|thank you|sorry|i'd like|i would like|i'll|i will|that's|that is|good (morning|afternoon|evening)|hello|hi)\b/i;

/** Only split text that clearly contains both a prompt and a reply. */
const sceneTurns = (core: string): string[] => {
  const sentences = sentencesOf(core);
  if (sentences.length < 2 || (!core.includes("?") && !sentences.slice(1).some(sentence => REPLY_START.test(sentence)))) {
    return [core];
  }

  const turns: string[] = [];
  let current: string[] = [];
  let previousWasQuestion = false;
  sentences.forEach(sentence => {
    if (current.length && (previousWasQuestion || REPLY_START.test(sentence))) {
      turns.push(current.join(" "));
      current = [];
    }
    current.push(sentence);
    previousWasQuestion = sentence.endsWith("?");
  });
  if (current.length) turns.push(current.join(" "));
  return turns;
};

const INSTRUCTIONS: Record<CambridgeMockExam["level"], string> = {
  starters: "Listen carefully.",
  movers: "Listen carefully. You will hear the recording twice.",
  flyers: "Listen carefully. You will hear the recording twice.",
  ket: "You will hear the recording twice.",
  pet: "You will hear the recording twice.",
};

const CHILD_PAIRS: Array<[string, string]> = [["Girl", "Boy"], ["Boy", "Girl"]];
const ADULT_PAIRS: Array<[string, string]> = [["Woman", "Man"], ["Man", "Woman"]];

const speakersFor = (exam: CambridgeMockExam, question: CambridgeMockQuestion, core: string): [string, string] => {
  const seed = hash(`${exam.id}:${question.id}:${core}`);
  const childLevel = exam.level === "starters" || exam.level === "movers" || exam.level === "flyers";
  const pairs = childLevel ? CHILD_PAIRS : ADULT_PAIRS;
  return pairs[seed % pairs.length];
};

const buildScript = (exam: CambridgeMockExam, question: CambridgeMockQuestion): string => {
  const core = coreLine(question.passage ?? "");
  if (!core) return question.passage ?? "";

  const turns = sceneTurns(core);
  const [firstSpeaker, secondSpeaker] = speakersFor(exam, question, core);
  const lines = [`Narrator: ${INSTRUCTIONS[exam.level]}`];

  if (turns.length === 1) {
    lines.push(`${firstSpeaker}: ${turns[0]}`);
  } else {
    turns.forEach((turn, index) => {
      lines.push(`${index % 2 === 0 ? firstSpeaker : secondSpeaker}: ${turn}`);
    });
  }

  return `Listen:\n${lines.join("\n")}`;
};

export const upgradeCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(question =>
    question.section === "Listening" && question.passage
      ? { ...question, passage: buildScript(exam, question) }
      : question
  ),
});