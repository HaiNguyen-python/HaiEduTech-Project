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
import { satModules as rawSatModules } from "./englishSat";
import { satExpansionModules as rawSatExpansionModules } from "./englishSatExpansion";
import { satExpansionModules2 as rawSatExpansionModules2 } from "./englishSatExpansion2";
import { satExpansionModules3 as rawSatExpansionModules3 } from "./englishSatExpansion3";
import { satExpansionModules4 as rawSatExpansionModules4 } from "./englishSatExpansion4";
import { satExpansionModules5 as rawSatExpansionModules5 } from "./englishSatExpansion5";
import { satExpansionModules6 as rawSatExpansionModules6 } from "./englishSatExpansion6";
import { satExpansionModules7 as rawSatExpansionModules7 } from "./englishSatExpansion7";
import { satExpansionModules8 as rawSatExpansionModules8 } from "./englishSatExpansion8";
import { satExpansionModules9 as rawSatExpansionModules9 } from "./englishSatExpansion9";
import { satExpansionModules10 as rawSatExpansionModules10 } from "./englishSatExpansion10";
import { enhanceSatModulesWithQuizDepth } from "@/lib/satQuizBuilder";

// Pad every SAT lesson so each quiz has at least 5 questions.
export const satModules = enhanceSatModulesWithQuizDepth(rawSatModules);
export const satExpansionModules = enhanceSatModulesWithQuizDepth(rawSatExpansionModules);
export const satExpansionModules2 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules2);
export const satExpansionModules3 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules3);
export const satExpansionModules4 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules4);
export const satExpansionModules5 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules5);
export const satExpansionModules6 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules6);
export const satExpansionModules7 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules7);
export const satExpansionModules8 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules8);
export const satExpansionModules9 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules9);
export const satExpansionModules10 = enhanceSatModulesWithQuizDepth(rawSatExpansionModules10);
import { grammarExpansionModules2 } from "./englishGrammarExpansion2";
import { grammarExpansionModules3 } from "./englishGrammarExpansion3";
import { grammarExtraLessons4, grammarExpansionModules4 } from "./englishGrammarExpansion4";
import { grammarExpansionModules5 } from "./englishGrammarExpansion5";
import { enhanceGrammarModulesWithQuizDepth } from "@/lib/grammarQuizBuilder";
import type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry } from "./types";

export type { LanguageModule, LanguageLesson, InteractiveExercise, FillInBlankExercise, SentenceReorderExercise, DictationExercise, MCQExercise, VocabEntry };

export { ieltsModules, toeicModules, cambridgeModules, nationalExamModules, hskModules, chineseConvModules, grammarModules };

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
export const allGrammarModules: LanguageModule[] = enhanceGrammarModulesWithQuizDepth([
  ...expandedGrammarModules,
  ...grammarExpansionModules,
  ...grammarExpansionModules2,
  ...grammarExpansionModules3,
  ...grammarExpansionModules4,
  ...grammarExpansionModules5,
]);

// All English modules combined
export const allEnglishModules: LanguageModule[] = [
  ...ieltsModules,
  ...toeicModules,
  ...cambridgeModules,
  ...nationalExamModules,
  ...allGrammarModules,
  ...englishExpansion3Modules,
  ...englishExpansion4Modules,
  ...satModules,
  ...satExpansionModules,
  ...satExpansionModules2,
  ...satExpansionModules3,
  ...satExpansionModules4,
  ...satExpansionModules5,
  ...satExpansionModules6,
  ...satExpansionModules7,
  ...satExpansionModules8,
  ...satExpansionModules9,
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
