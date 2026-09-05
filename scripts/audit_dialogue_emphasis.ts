/**
 * @file audit_dialogue_emphasis.ts
 * @description Checks that every Communication Lab conversation shows bold key
 *   phrases (B1+ functional chunks), so emphasis is consistent across lessons.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { professionalCommunicationLessons, academicCommunicationLessons } from "../src/data/conversationalCurriculum";
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
      if (phrases.length === 0) issues.push(`${lesson.id} / ${situation.title}: no bold key phrases found`);
    }
  }

  console.log(`${label}: ${lessons.length} lessons, ${conversations} conversations, ${totalPhrases} bold phrase hits`);
  return issues;
};

const issues = [
  ...audit("Business Lab", professionalCommunicationLessons),
  ...audit("Academic Lab", academicCommunicationLessons),
];

if (issues.length) {
  console.log(`\n${issues.length} issues:`);
  issues.forEach((issue) => console.log(` - ${issue}`));
  process.exit(1);
}
console.log("\n0 issues");
