// Barrel export for language curriculum
import { ieltsModules } from "./englishIelts";
import { toeicModules } from "./englishToeic";
import { cambridgeModules, nationalExamModules } from "./englishOther";
import { hskModules, chineseConvModules } from "./chineseLessons";
import type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry } from "./types";

export type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry };

export { ieltsModules, toeicModules, cambridgeModules, nationalExamModules, hskModules, chineseConvModules };

// All English modules combined
export const allEnglishModules: LanguageModule[] = [
  ...ieltsModules,
  ...toeicModules,
  ...cambridgeModules,
  ...nationalExamModules,
];

// All Chinese modules combined
export const allChineseModules: LanguageModule[] = [
  ...hskModules,
  ...chineseConvModules,
];

// Everything combined
export const allLanguageModules: LanguageModule[] = [
  ...allEnglishModules,
  ...allChineseModules,
];
