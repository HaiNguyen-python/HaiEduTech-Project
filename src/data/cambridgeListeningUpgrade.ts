/**
 * @file cambridgeListeningUpgrade.ts
 * @description Turns each authored listening line into a short, natural
 *              recording. It never invents facts: it only adds the exam
 *              instruction, a lead-in question built from the question stem and
 *              the speaker roles. Speaker roles follow the pronouns of the
 *              question, so "How does the woman travel?" is answered by a woman.
 *              Listening explanations are rebuilt here from the final script so
 *              the review screen quotes the real evidence line.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";
import { isAnswerSupported } from "./cambridgeListeningSupport";
import { findEvidenceSentence } from "@/lib/cambridgeEvidence";

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
  return text.replace(/\s+/g, " ").replace(/\s*&\s*/g, " and ");
};

const sentencesOf = (text: string): string[] =>
  (text.match(/[^.!?]+[.!?]*/g) ?? [text]).map(sentence => sentence.trim()).filter(Boolean);

const REPLY_START =
  /^(yes|no|yeah|sure|certainly|of course|ok|okay|right|well|thanks|thank you|sorry|i'd like|i would like|i'll|i will|that's|that is|good (morning|afternoon|evening)|hello|hi)\b/i;

const SPEAKER_NAMES = "Narrator|Teacher|Student|Woman|Man|Girl|Boy|Presenter|Guest|Expert|Interviewer";

/** Preserve speaker roles already authored in newer dialogue-based papers. */
const explicitTurnsOf = (core: string): Array<{ speaker: string; text: string }> => {
  const pattern = new RegExp(`(?:^|\\s)(${SPEAKER_NAMES}):\\s*([\\s\\S]*?)(?=\\s+(?:${SPEAKER_NAMES}):|$)`, "g");
  return [...core.matchAll(pattern)]
    .map(match => ({ speaker: match[1], text: match[2].trim() }))
    .filter(turn => Boolean(turn.text));
};

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

/** Paper titles that name a skill, not a subject a person can talk about. */
const SKILL_TITLE = /reading|writing|listening|speaking|grammar|vocabulary|conversation|mixed|review|test|exam|practice/i;

/** "Movers Mock Test 3 - Daily Life & Hobbies" -> "daily life and hobbies". */
const topicOf = (exam: CambridgeMockExam): string | null => {
  const tail = exam.title.split(/\s[-–]\s/)[1];
  if (!tail || SKILL_TITLE.test(tail)) return null;
  return tail.replace(/\s*&\s*/g, " and ").trim().toLowerCase();
};


const FEMALE = /\b(she|her|hers|woman|women|girl|mother|mum|mrs|miss|sister|aunt|grandmother|lady)\b/i;
const MALE = /\b(he|his|him|man|men|boy|father|dad|mr|brother|uncle|grandfather)\b/i;

/**
 * Voices for a recording. The speaker that gives the answer matches the gender
 * used in the question, so the item is never self contradictory.
 */
const speakersFor = (
  exam: CambridgeMockExam,
  question: CambridgeMockQuestion,
  core: string
): { key: string; other: string } => {
  const childLevel = exam.level === "starters" || exam.level === "movers" || exam.level === "flyers";
  const female = childLevel ? "Girl" : "Woman";
  const male = childLevel ? "Boy" : "Man";
  if (FEMALE.test(question.question)) return { key: female, other: male };
  if (MALE.test(question.question)) return { key: male, other: female };
  const seed = hash(`${exam.id}:${question.id}:${core}`);
  return seed % 2 === 0 ? { key: female, other: male } : { key: male, other: female };
};

/** "What pet does the speaker have?" -> "What pet do you have?" */
const leadInQuestion = (stem: string): string | null => {
  if (!/^(what|which|where|when|why|how|who|whose)\b/i.test(stem.trim())) return null;
  let text = stem.trim().replace(/\?+$/, "");
  const PERSON = "the speaker|the woman|the man|the girl|the boy|the student|the teacher|she|he|they|we";
  text = text.replace(
    new RegExp(`\\b(do|does|did)\\s+(?:${PERSON})\\b`, "i"),
    (_m, aux: string) => `${/did/i.test(aux) ? "did" : "do"} you`
  );
  text = text.replace(new RegExp(`\\b(has|have|had)\\s+(?:${PERSON})\\b`, "i"), (_m, aux: string) =>
    /had/i.test(aux) ? "had you" : "have you"
  );
  text = text.replace(new RegExp(`\\b(is|was|are|were)\\s+(?:${PERSON})\\b`, "i"), (_m, aux: string) =>
    /is|was/i.test(aux) ? "are you" : `${aux} it`
  );
  text = text.replace(/\bthe (speaker|woman|man|girl|boy|student)\b/gi, "you");
  text = text.replace(/\bhis\b|\bher\b/gi, "your");
  text = text.replace(/\bhe\b|\bshe\b/gi, "you");
  text = text.replace(/\s+/g, " ").trim();
  // Any leftover third person agreement means the rewrite is not safe to speak.
  if (/\b(does|has|is|was) you\b/i.test(text)) return null;
  if (!/\byou\b/i.test(text) && !/^(what|which|where|when|why|how)\s+(is|are|was|were)\b/i.test(text)) return null;
  if (text.split(/\s+/).length > 12) return null;
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}?`;
};

const buildScript = (exam: CambridgeMockExam, question: CambridgeMockQuestion): string => {
  const core = coreLine(question.passage ?? "");
  if (!core) return question.passage ?? "";

  const topic = topicOf(exam);
  const opener = topic ? `You will hear people talking about ${topic}. ${INSTRUCTIONS[exam.level]}` : INSTRUCTIONS[exam.level];


  const explicitTurns = explicitTurnsOf(core);
  if (explicitTurns.length > 0) {
    return `Listen:\nNarrator: ${opener}\n${explicitTurns
      .filter(turn => turn.speaker !== "Narrator")
      .map(turn => `${turn.speaker}: ${turn.text}`)
      .join("\n")}`;
  }

  const turns = sceneTurns(core);
  const { key: keySpeaker, other } = speakersFor(exam, question, core);
  const answer = question.options[question.correctAnswer] ?? "";
  const lines = [`Narrator: ${opener}`];

  if (turns.length === 1) {
    const lead = leadInQuestion(question.question);
    if (lead) lines.push(`${other}: ${lead}`);
    lines.push(`${keySpeaker}: ${turns[0]}`);
  } else {
    // Put the voice that states the key on the turn that actually contains it.
    const keyIndex = Math.max(
      0,
      turns.findIndex(turn => answer && isAnswerSupported(turn, answer))
    );
    turns.forEach((turn, index) => {
      const isKeyParity = index % 2 === keyIndex % 2;
      lines.push(`${isKeyParity ? keySpeaker : other}: ${turn}`);
    });
  }

  return `Listen:\n${lines.join("\n")}`;
};

/** Drop the generic listening hint and quote the real evidence line instead. */
const GENERIC_EN = /\s*In Listening, the answer is the exact word or number the speaker says[\s\S]*?similar\./;
const GENERIC_VI = /\s*Ở phần Nghe, đáp án là đúng từ hoặc số người nói phát âm[\s\S]*?na ná\./;

const withEvidence = (question: CambridgeMockQuestion, script: string): CambridgeMockQuestion => {
  const answer = question.options[question.correctAnswer] ?? "";
  const spoken = script
    .replace(/^\s*Listen:\s*/i, "")
    .split("\n")
    .filter(line => !/^Narrator:/i.test(line.trim()))
    .map(line => line.replace(/^[A-Za-z ]{1,20}:\s*/, "").trim())
    .join(" ");

  const evidence = findEvidenceSentence(spoken, question.question, answer);
  const base = (question.explanation ?? "").replace(GENERIC_EN, "").trim();
  const baseVi = (question.explanationVi ?? "").replace(GENERIC_VI, "").trim();
  const quoted = evidence ? `"${evidence.replace(/\s*[.?!]$/, "")}"` : null;

  const explanation = quoted
    ? base.includes(quoted)
      ? base
      : `${base} The recording says ${quoted}, which gives the answer "${answer}".`.trim()
    : `${base} The answer "${answer}" is what the speaker says in the recording.`.trim();

  const explanationVi = quoted
    ? baseVi.includes(quoted)
      ? baseVi
      : `${baseVi} Câu dẫn chứng trong bài nghe: ${quoted}. Vì vậy đáp án là "${answer}".`.trim()
    : `${baseVi} Đáp án "${answer}" chính là điều người nói nhắc tới trong bài nghe.`.trim();

  return { ...question, explanation, explanationVi };
};

export const upgradeCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(question => {
    if (question.section !== "Listening" || !question.passage) return question;
    const passage = buildScript(exam, question);
    return { ...withEvidence(question, passage), passage };
  }),
});
