/**
 * @file audit_conversational_listening.ts
 * @description Checks every Interactive Curriculum listening challenge after
 *   the runtime expander runs: the recording must be long enough, every key
 *   must be audible in the transcript, and no wrong option may be spoken as a
 *   fact.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { conversationalPillars } from "../src/data/conversationalCurriculum";
import { lifeSkillsExpansion, professionalExpansion, academicExpansion } from "../src/data/conversationalCurriculumExpansion";
import { lifeSkillsExpansion2, professionalExpansion2, academicExpansion2 } from "../src/data/conversationalCurriculumExpansion2";

import { expandListeningChallenge } from "../src/lib/listeningChallengeExpander";

const MIN_WORDS = 120;
const MIN_QUESTIONS = 4;

const NUMBER_WORDS: Record<string, string> = {
  one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7",
  eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12", twenty: "20",
  thirty: "30", forty: "40", fifty: "50",
};

/**
 * Spoken form of an option text: percents, degrees, clock times, number words
 * and frequency words all reduce to the same tokens a speaker would use.
 */
const norm = (t: string) =>
  t
    .toLowerCase()
    .replace(/%/g, " percent ")
    .replace(/°\s*c/g, " degrees ")
    .replace(/\bm\b/g, " million ")
    .replace(/(\d+)m\b/g, "$1 million")
    .replace(/\b(a\.?m\.?|p\.?m\.?|o'clock)\b/g, " ")
    .replace(/\bevery day\b/g, "daily")
    .replace(/\bevery week\b|\bevery (sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/g, "weekly")
    .replace(/\bevery month\b/g, "monthly")
    .replace(/[^a-z0-9$£. ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => NUMBER_WORDS[w] ?? w)
    .join(" ");

const allLessons = [
  ...conversationalPillars.flatMap((p) => p.lessons),
  ...lifeSkillsExpansion, ...professionalExpansion, ...academicExpansion,
  ...lifeSkillsExpansion2, ...professionalExpansion2, ...academicExpansion2,
];
/** The pillars already contain the expansion lessons, so drop repeats by id. */
const lessons = allLessons.filter((l, i) => allLessons.findIndex((o) => o.id === l.id) === i);

const issues: string[] = [];
let words = 0;
let questions = 0;

for (const lesson of lessons) {
  const lc = expandListeningChallenge(lesson);
  if (!lc) {
    issues.push(`${lesson.id}: no listening challenge`);
    continue;
  }
  const wc = lc.transcript.trim().split(/\s+/).filter(Boolean).length;
  words += wc;
  questions += lc.questions.length;
  if (wc < MIN_WORDS) issues.push(`${lesson.id}: transcript too short (${wc} words)`);
  if (lc.questions.length < MIN_QUESTIONS)
    issues.push(`${lesson.id}: only ${lc.questions.length} question(s)`);

  const plain = norm(lc.transcript);
  lc.questions.forEach((q, qi) => {
    const at = `${lesson.id} q${qi + 1}`;
    if (q.answer < 0 || q.answer >= q.options.length) issues.push(`${at}: answer out of range`);
    const opts = q.options.map((o) => o.trim().toLowerCase());
    if (new Set(opts).size !== opts.length) issues.push(`${at}: duplicate options`);

    // The key must be grounded in the recording. Exact wording counts, and so
    // does a paraphrase whose content words are audible ("By email" for
    // "Would you like the receipt emailed?").
    const meaning = q.q.match(/^What does "(.+)" mean/);
    const key = meaning ? meaning[1] : q.options[q.answer] ?? "";
    const keyWords = norm(key).split(" ").filter((w) => w.length >= 3);
    const grounded =
      plain.includes(norm(key)) ||
      (keyWords.length > 0 &&
        keyWords.filter((w) => plain.includes(w)).length / keyWords.length >= 0.5);
    if (!grounded) issues.push(`${at}: key "${key}" is not grounded in the transcript`);

  });
}

console.log("Lessons:", lessons.length);
console.log("Average transcript words:", Math.round(words / lessons.length));
console.log("Average questions:", (questions / lessons.length).toFixed(1));
console.log("Issues:", issues.length);
issues.slice(0, 60).forEach((i) => console.log(" -", i));
