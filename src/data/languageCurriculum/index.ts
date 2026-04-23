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
import { satExpansionModules } from "./englishSatExpansion";
import { satExpansionModules2 } from "./englishSatExpansion2";
import { satExpansionModules3 } from "./englishSatExpansion3";
import { satExpansionModules4 } from "./englishSatExpansion4";
import { satExpansionModules5 } from "./englishSatExpansion5";
import { grammarExpansionModules2 } from "./englishGrammarExpansion2";
import { grammarExpansionModules3 } from "./englishGrammarExpansion3";
import { grammarExtraLessons4, grammarExpansionModules4 } from "./englishGrammarExpansion4";
import { grammarExpansionModules5 } from "./englishGrammarExpansion5";
import type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry } from "./types";

export type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry };

export { ieltsModules, toeicModules, cambridgeModules, nationalExamModules, hskModules, chineseConvModules, grammarModules, satModules };

// Merge extra lessons (from both expansion files) into existing grammar modules
const allGrammarExtras = [
  ...grammarExtraLessons.map(l => ({ ...l })),
  ...grammarExtraLessons4.map(l => ({ ...l })),
];
const expandedGrammarModules: LanguageModule[] = grammarModules.map(mod => {
  const extraLessons = allGrammarExtras
    .filter(l => l.moduleId === mod.id)
    .map(({ moduleId, ...lesson }) => lesson);
  if (extraLessons.length === 0) return mod;
  return { ...mod, lessons: [...mod.lessons, ...extraLessons] };
});

// Combined list of all grammar modules (base + every expansion) for the
// English Grammar landing page.
export const allGrammarModules: LanguageModule[] = [
  ...expandedGrammarModules,
  ...grammarExpansionModules,
  ...grammarExpansionModules2,
  ...grammarExpansionModules3,
  ...grammarExpansionModules4,
  ...grammarExpansionModules5,
];

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
  ...satExpansionModules,
  ...satExpansionModules2,
  ...satExpansionModules3,
  ...satExpansionModules4,
  ...satExpansionModules5,
  ...grammarExpansionModules2,
  ...grammarExpansionModules3,
  ...grammarExpansionModules4,
  ...grammarExpansionModules5,
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
