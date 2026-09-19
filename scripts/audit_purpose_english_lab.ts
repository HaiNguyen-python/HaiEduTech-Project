/**
 * @file audit_purpose_english_lab.ts
 * @description Content audit for the Communication Lab lessons used by
 *   Business English (Professional) and Academic English (Academic).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { professionalCommunicationLessons, academicCommunicationLessons } from "../src/data/conversationalCurriculum";
import type { ConvLesson } from "../src/data/conversationalCurriculum";
import { findKeyPhraseRanges } from "../src/lib/highlightKeywords";

const normalise = (value: string) => value.trim().toLowerCase();

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero", "1": "one", "2": "two", "3": "three", "4": "four", "5": "five",
  "6": "six", "7": "seven", "8": "eight", "9": "nine", "10": "ten", "12": "twelve",
  "15": "fifteen", "20": "twenty", "30": "thirty", "40": "forty", "50": "fifty",
};

const digitInTranscript = (digit: string, transcript: string) =>
  transcript.includes(digit) || (NUMBER_WORDS[digit] ? transcript.includes(NUMBER_WORDS[digit]) : false);

const audit = (label: string, lessons: ConvLesson[], expected: number) => {
  const issues: string[] = [];
  const ids = new Set<string>();
  let dialogueLines = 0;
  let questions = 0;
  let vocab = 0;

  if (lessons.length !== expected) issues.push(`${label}: expected ${expected} lessons, found ${lessons.length}`);

  for (const lesson of lessons) {
    if (ids.has(lesson.id)) issues.push(`${lesson.id}: duplicate id`);
    ids.add(lesson.id);
    if (!lesson.title || !lesson.titleVi || !lesson.description || !lesson.descriptionVi) issues.push(`${lesson.id}: missing bilingual lesson content`);
    if (!lesson.badge || !lesson.badgeVi) issues.push(`${lesson.id}: missing badge labels`);
    if (`${lesson.title}${lesson.description}${lesson.descriptionVi}`.includes("—")) issues.push(`${lesson.id}: uses em dash`);

    if (lesson.keySituations.length < 1) issues.push(`${lesson.id}: no key situations`);
    const multiSpeaker = lesson.keySituations.some((situation) => new Set(situation.sampleDialogue.map((turn) => normalise(turn.speaker))).size >= 2);
    if (!multiSpeaker) issues.push(`${lesson.id}: no situation with two or more speakers`);
    for (const [index, situation] of lesson.keySituations.entries()) {
      const tag = `${lesson.id} situation ${index + 1}`;
      if (!situation.title || !situation.titleVi || !situation.description || !situation.descriptionVi) issues.push(`${tag}: missing bilingual situation content`);
      if (situation.sampleDialogue.length < 4) issues.push(`${tag}: dialogue shorter than 4 turns`);
      dialogueLines += situation.sampleDialogue.length;
      for (const turn of situation.sampleDialogue) {
        if (!turn.speaker.trim()) issues.push(`${tag}: dialogue turn without a speaker`);
        if (turn.line.trim().length < 8) issues.push(`${tag}: dialogue line too short ("${turn.line}")`);
      }
    }

    if (lesson.vocabulary.length < 5) issues.push(`${lesson.id}: fewer than 5 vocabulary entries`);
    vocab += lesson.vocabulary.length;
    const terms = new Set<string>();
    for (const entry of lesson.vocabulary) {
      if (terms.has(normalise(entry.term))) issues.push(`${lesson.id}: duplicate term "${entry.term}"`);
      terms.add(normalise(entry.term));
      if (!entry.meaning || !entry.meaningEn) issues.push(`${lesson.id} / ${entry.term}: missing bilingual meaning`);
      if (!entry.example || !entry.exampleVi) issues.push(`${lesson.id} / ${entry.term}: missing bilingual example`);
      if (entry.example && findKeyPhraseRanges(entry.example, [entry.term]).length === 0) {
        issues.push(`${lesson.id} / ${entry.term}: phrase is not highlighted in example "${entry.example}"`);
      }
    }

    const challenge = lesson.listeningChallenge;
    if (!challenge?.transcript || challenge.transcript.trim().length < 120) issues.push(`${lesson.id}: listening transcript missing or too short`);
    if (!challenge?.title || !challenge?.titleVi) issues.push(`${lesson.id}: listening challenge missing bilingual title`);
    const transcript = normalise(challenge?.transcript ?? "");
    if (!challenge?.questions?.length) issues.push(`${lesson.id}: listening challenge has no questions`);
    for (const [index, question] of (challenge?.questions ?? []).entries()) {
      const tag = `${lesson.id} q${index + 1}`;
      questions += 1;
      if (!question.q || !question.qVi) issues.push(`${tag}: missing bilingual question`);
      if (question.options.length !== 4) issues.push(`${tag}: requires A/B/C/D`);
      if (question.answer < 0 || question.answer >= question.options.length) issues.push(`${tag}: answer out of range`);
      if (new Set(question.options.map(normalise)).size !== question.options.length) issues.push(`${tag}: duplicate options`);
      for (const option of question.options) if (!option.trim()) issues.push(`${tag}: empty option`);
      const correct = question.options[question.answer];
      // Short answers such as a name, a number or "Yes" are valid when every option is short.
      const shortSet = question.options.every((option) => option.trim().length <= 12);
      const digits = (correct ?? "").match(/\d+/g) ?? [];
      if (transcript && digits.length && !digits.some((digit) => digitInTranscript(digit, transcript))) {
        issues.push(`${tag}: numeric answer "${correct}" is not in the transcript`);
      }
      if (transcript && correct && !shortSet) {
        const words = normalise(correct).split(/[^a-z0-9']+/).filter((word) => word.length > 3);
        const grounded = words.length === 0 || words.some((word) => transcript.includes(word));
        if (!grounded) issues.push(`${tag}: correct answer not grounded in the transcript ("${correct}")`);
      }
    }

    if (lesson.speakingTopics.length < 2) issues.push(`${lesson.id}: fewer than 2 speaking topics`);
  }

  console.info(`${label}: ${lessons.length} lessons, ${dialogueLines} dialogue turns, ${vocab} vocabulary entries, ${questions} listening questions`);
  return issues;
};

const issues = [
  ...audit("Business Communication Lab", professionalCommunicationLessons, 23),
  ...audit("Academic Communication Lab", academicCommunicationLessons, 20),
];

if (issues.length) {
  console.error(`\n${issues.length} issue(s):`);
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.info("Purpose English Communication Lab audit: 0 issues");
}
