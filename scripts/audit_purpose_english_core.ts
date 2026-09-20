import { businessTopicsPart1 } from "../src/data/businessEnglishLessons";
import { businessTopicsPart2 } from "../src/data/businessEnglishLessons2";
import { academicTopicsPart1 } from "../src/data/academicEnglishLessons";
import { academicTopicsPart2 } from "../src/data/academicEnglishLessons2";
import type { PurposeTopic } from "../src/data/purposeEnglishTypes";
import { findKeyPhraseRanges } from "../src/lib/highlightKeywords";
import { businessEnglishModelRoles } from "../src/data/businessEnglishModelRoles";

const audit = (label: string, topics: PurposeTopic[]) => {
  const issues: string[] = [];
  const lessons = topics.flatMap((topic) => topic.lessons);
  const ids = new Set<string>();
  if (topics.length !== 6) issues.push(`${label}: expected 6 topics, found ${topics.length}`);
  if (lessons.length !== 24) issues.push(`${label}: expected 24 lessons, found ${lessons.length}`);
  for (const topic of topics) {
    if (topic.lessons.length !== 4) issues.push(`${topic.id}: expected 4 lessons`);
    if (!topic.title || !topic.titleVi || !topic.description || !topic.descriptionVi) issues.push(`${topic.id}: missing bilingual topic content`);
    for (const lesson of topic.lessons) {
      if (ids.has(lesson.id)) issues.push(`${lesson.id}: duplicate id`);
      ids.add(lesson.id);
      if (!lesson.title || !lesson.titleVi || !lesson.gist || !lesson.gistVi || !lesson.teaching || !lesson.teachingVi) issues.push(`${lesson.id}: missing bilingual lesson content`);
      if (lesson.teaching.length < 180 || lesson.teachingVi.length < 160) issues.push(`${lesson.id}: teaching text too short`);
      if (lesson.vocab.length < 10) issues.push(`${lesson.id}: fewer than 10 phrases`);
      for (const item of lesson.vocab) {
        if (findKeyPhraseRanges(item.example, [item.term]).length === 0) {
          issues.push(`${lesson.id} / ${item.term}: phrase is not highlighted in example "${item.example}"`);
        }
      }
      if (lesson.model.lines.length < 3) issues.push(`${lesson.id}: model too short`);
      if (label === "Business English") {
        const roles = businessEnglishModelRoles[lesson.id];
        if (!roles) issues.push(`${lesson.id}: missing model line roles`);
        else if (roles.length !== lesson.model.lines.length) issues.push(`${lesson.id}: expected ${lesson.model.lines.length} model line roles, found ${roles.length}`);
        else if (roles.some((role) => !role.en.trim() || !role.vi.trim())) issues.push(`${lesson.id}: incomplete bilingual model line role`);
      }
      if (lesson.questions.length < 5) issues.push(`${lesson.id}: fewer than 5 questions`);
      for (const [index, question] of lesson.questions.entries()) {
        if (question.options.length !== 4) issues.push(`${lesson.id} q${index + 1}: requires A/B/C/D`);
        if (question.answer < 0 || question.answer >= question.options.length) issues.push(`${lesson.id} q${index + 1}: answer out of range`);
        if (new Set(question.options.map((option) => option.trim().toLowerCase())).size !== question.options.length) issues.push(`${lesson.id} q${index + 1}: duplicate options`);
        if (!question.explanation || !question.explanationVi) issues.push(`${lesson.id} q${index + 1}: missing explanation`);
      }
    }
  }
  console.info(`${label}: ${topics.length} topics, ${lessons.length} lessons, ${lessons.reduce((sum, lesson) => sum + lesson.vocab.length, 0)} phrases, ${lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0)} questions`);
  return issues;
};

const issues = [
  ...audit("Business English", [...businessTopicsPart1, ...businessTopicsPart2]),
  ...audit("Academic English", [...academicTopicsPart1, ...academicTopicsPart2]),
];
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else {
  console.info("Purpose English Core audit: 0 issues");
}