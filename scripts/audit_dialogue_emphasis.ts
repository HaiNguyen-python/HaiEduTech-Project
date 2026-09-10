/**
 * @file audit_dialogue_emphasis.ts
 * @description Checks that every Communication Lab conversation shows bold key
 *   phrases (B1+ functional chunks), so emphasis is consistent across lessons.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import {
  academicCommunicationLessons,
  allConversationalLessons,
  professionalCommunicationLessons,
} from "../src/data/conversationalCurriculum";
import type { ConvLesson } from "../src/data/conversationalCurriculum";
import { resolveDialogueKeyPhrases } from "../src/lib/dialogueKeyPhrases";

const audit = (label: string, lessons: ConvLesson[]) => {
  const issues: string[] = [];
  let conversations = 0;
  let totalPhrases = 0;

  for (const lesson of lessons) {
    for (const situation of lesson.keySituations) {
      conversations += 1;
      const lines = situation.sampleDialogue.map((turn) => turn.line);
      const phrases = resolveDialogueKeyPhrases(lines, lesson.vocabulary.map((item) => item.term));
      totalPhrases += phrases.length;
      const minimum = lines.length >= 6 ? 3 : 2;
      if (phrases.length < minimum) {
        issues.push(`${lesson.id} / ${situation.title}: ${phrases.length}/${minimum} quality phrase highlights`);
      }
      const invalid = phrases.filter((phrase) => phrase.trim().split(/\s+/).length < 2 || phrase.trim().length < 4);
      if (invalid.length) issues.push(`${lesson.id} / ${situation.title}: low-value phrase(s): ${invalid.join(", ")}`);
    }
  }

  console.log(`${label}: ${lessons.length} lessons, ${conversations} conversations, ${totalPhrases} bold phrase hits`);
  return issues;
};

const issues = [
  ...audit("Business Lab", professionalCommunicationLessons),
  ...audit("Academic Lab", academicCommunicationLessons),
  ...audit(
    "Conversational English",
    allConversationalLessons.filter(
      (lesson) => !lesson.id.startsWith("pro-") && !lesson.id.startsWith("acad-"),
    ),
  ),
];

if (issues.length) {
  console.log(`\n${issues.length} issues:`);
  issues.forEach((issue) => console.log(` - ${issue}`));
  process.exit(1);
}
console.log("\n0 issues");
