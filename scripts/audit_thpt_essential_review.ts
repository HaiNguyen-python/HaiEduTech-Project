import { thptGrammarTopics, thptVocabThemes } from "../src/data/thptEssentialReview";
import { thptGrammarTopicsExpansion, thptVocabThemesExpansion, thptExerciseSets } from "../src/data/thptEssentialReviewExpansion";
import { thptVocabThemesExpansion2, thptExerciseSetsExpansion2 } from "../src/data/thptEssentialReviewExpansion2";
import { thptVocabPracticeByTheme } from "../src/data/thptVocabPractice";
import { thptCollocationsExtraSets } from "../src/data/thptCollocationsExtra";
import { thptCollocationsExtraSets2 } from "../src/data/thptCollocationsExtra2";
import { thptMixedFinalExtraSets, thptWordFormationExtraSets } from "../src/data/thptWordFormationMixedExtra";
import { thptGrammarStudyGuides } from "../src/data/thptEssentialStudyGuides";
import { balanceExerciseOptions } from "../src/lib/balanceExerciseOptions";

const errors: string[] = [];
const warnings: string[] = [];
const grammar = [...thptGrammarTopics, ...thptGrammarTopicsExpansion];
const themes = [...thptVocabThemes, ...thptVocabThemesExpansion, ...thptVocabThemesExpansion2];
const sets = [...thptExerciseSets, ...thptExerciseSetsExpansion2, ...thptCollocationsExtraSets, ...thptCollocationsExtraSets2, ...thptWordFormationExtraSets, ...thptMixedFinalExtraSets];

function duplicates(values: string[]) {
  const seen = new Set<string>();
  return [...new Set(values.filter((value) => seen.size === seen.add(value).size))];
}

for (const id of duplicates(grammar.map((item) => item.id))) errors.push(`Duplicate grammar ID: ${id}`);
for (const id of duplicates(themes.map((item) => item.id))) warnings.push(`Merged vocabulary theme ID: ${id}`);
for (const id of duplicates(sets.map((item) => item.id))) errors.push(`Duplicate exercise set ID: ${id}`);

for (const topic of grammar) {
  if (!topic.titleVi || !topic.titleEn || !topic.detailVi || !topic.detailEn) errors.push(`Incomplete bilingual grammar content: ${topic.id}`);
  if (!topic.formulas?.length || !topic.rules?.length || topic.examples.length < 3 || !topic.mistakes?.length) errors.push(`Incomplete grammar sections: ${topic.id}`);
  if (!thptGrammarStudyGuides[topic.id]) errors.push(`Missing structured study guide: ${topic.id}`);
}

const uniqueSets = Array.from(new Map(sets.map((set) => [set.id, set])).values());
const questionLocations = new Map<string, string[]>();
const answerCounts = [0, 0, 0, 0];
for (const set of uniqueSets) {
  balanceExerciseOptions(set.exercises).forEach((exercise, index) => {
    const location = `${set.id} question ${index + 1}`;
    if (exercise.answer < 0 || exercise.answer >= exercise.options.length) errors.push(`Answer outside options: ${location}`);
    if (new Set(exercise.options.map((option) => option.trim().toLowerCase())).size !== exercise.options.length) errors.push(`Duplicate options: ${location}`);
    if (!exercise.explanation.trim()) errors.push(`Missing explanation: ${location}`);
    answerCounts[exercise.answer] += 1;
    const normalized = exercise.q.trim().toLowerCase().replace(/\s+/g, " ");
    questionLocations.set(normalized, [...(questionLocations.get(normalized) ?? []), location]);
  });
}
for (const [, locations] of questionLocations) if (locations.length > 1) warnings.push(`Repeated question: ${locations.join(", ")}`);

const vocabQuizCount = Object.values(thptVocabPracticeByTheme).reduce((sum, item) => sum + item.quiz.length, 0);
const exerciseCount = uniqueSets.reduce((sum, set) => sum + set.exercises.length, 0);
const expected = { grammar: 18, themes: 16, sets: 36, exercises: 347, vocabQuiz: 113 };
const actual = { grammar: grammar.length, themes: new Set(themes.map((item) => item.id)).size, sets: uniqueSets.length, exercises: exerciseCount, vocabQuiz: vocabQuizCount };
for (const key of Object.keys(expected) as (keyof typeof expected)[]) if (actual[key] !== expected[key]) errors.push(`Count mismatch for ${key}: expected ${expected[key]}, received ${actual[key]}`);

const minAnswers = Math.min(...answerCounts);
const maxAnswers = Math.max(...answerCounts);
if (maxAnswers - minAnswers > uniqueSets.length) warnings.push(`Answer positions may be uneven: ${answerCounts.join("/")}`);

if (warnings.length) process.stdout.write(`Warnings (${warnings.length}):\n${warnings.map((item) => `- ${item}`).join("\n")}\n`);
if (errors.length) {
  process.stderr.write(`Errors (${errors.length}):\n${errors.map((item) => `- ${item}`).join("\n")}\n`);
  process.exit(1);
}
process.stdout.write(`Essential Review audit passed: ${actual.grammar} grammar topics, ${actual.themes} vocabulary themes, ${actual.sets} exercise sets, ${actual.exercises} general questions, ${actual.vocabQuiz} vocabulary quizzes. Answer distribution: ${answerCounts.join("/")}.\n`);