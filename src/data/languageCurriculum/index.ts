// Barrel export for language curriculum
import { ieltsModules } from "./englishIelts";
import { toeicModules } from "./englishToeic";
import { cambridgeModules, nationalExamModules } from "./englishOther";
import { hskModules, chineseConvModules } from "./chineseLessons";
import { grammarModules } from "./englishGrammar";
import { grammarExtraLessons, grammarExpansionModules } from "./englishGrammarExpansion";
import { englishExpansion3Modules } from "./englishExpansion3";
import { englishExpansion4Modules } from "./englishExpansion4";
import { chineseExpansionModules } from "./chineseExpansion";
import { satModules } from "./englishSat";
import type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry } from "./types";

export type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry };

export { ieltsModules, toeicModules, cambridgeModules, nationalExamModules, hskModules, chineseConvModules, grammarModules, satModules };

// Merge extra lessons into existing grammar modules
const expandedGrammarModules: LanguageModule[] = grammarModules.map(mod => {
  const extraLessons = grammarExtraLessons
    .filter(l => l.moduleId === mod.id)
    .map(({ moduleId, ...lesson }) => lesson);
  if (extraLessons.length === 0) return mod;
  return { ...mod, lessons: [...mod.lessons, ...extraLessons] };
});

// All English modules combined
export const allEnglishModules: LanguageModule[] = [
  ...ieltsModules,
  ...toeicModules,
  ...cambridgeModules,
  ...nationalExamModules,
  ...expandedGrammarModules,
  ...grammarExpansionModules,
  ...englishExpansion3Modules,
  ...englishExpansion4Modules,
  ...satModules,
];

// All Chinese modules combined
export const allChineseModules: LanguageModule[] = [
  ...hskModules,
  ...chineseConvModules,
  ...chineseExpansionModules,
];

// Everything combined
export const allLanguageModules: LanguageModule[] = [
  ...allEnglishModules,
  ...allChineseModules,
];
