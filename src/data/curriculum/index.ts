// Barrel export for expanded curriculum
import { sqlModules } from "./sqlLessons";
import { aiFoundationModules } from "./aiFoundationLessons";
import { dataEngModules } from "./dataEngLessons";
import { mlModules } from "./mlLessons";
import { programmingExpansionModules } from "./programmingExpansion";
import { cloudModules } from "./cloudLessons";
import { cloudExpansionModules } from "./cloudExpansion";
import { dlModules } from "./dlLessons";
import { nlpModules } from "./nlpLessons";
import { nlpExpansionModules } from "./nlpExpansion";
import { rlModules } from "./rlLessons";
import { softwareEngModules } from "./softwareEngLessons";
import { webDevModules } from "./webDevLessons";
import { edtechModules as raw_edtechModules } from "./edtechLessons";
import { edtechExpansionModules as raw_edtechExpansionModules } from "./edtechExpansion";
import { nlpProductionModules } from "./nlpProduction";
import { nlpAdvancedModules } from "./nlpAdvanced";
import { edtechAdvancedModules as raw_edtechAdvancedModules } from "./edtechAdvanced";
import { edtechGlobalResearchModules as raw_edtechGlobalResearchModules } from "./edtechGlobalResearch";
import { edtechAiInEdtechModules as raw_edtechAiInEdtechModules } from "./edtechAiInEdtech";
import { edtechResearchMethodsModules as raw_edtechResearchMethodsModules } from "./edtechResearchMethods";
import { edtechPracticumModules as raw_edtechPracticumModules } from "./edtechPracticum";
import { edtechProductLandscapeModules as raw_edtechProductLandscapeModules } from "./edtechProductLandscape";
import { programmingInteractiveLabsModules } from "./programmingInteractiveLabs";
import { programmingMasteryLabsModules } from "./programmingMasteryLabs";
import { cybersecurityModules } from "./cybersecurityLessons";
import { startupModules } from "./startupLessons";
import type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase } from "./types";

import { applyEdtechClarity } from "./edtechClarity";

// Every EdTech module passes through the clarity layer (one-sentence gist,
// glossary, concrete example, common mistake) before it is exported.
export const edtechModules = applyEdtechClarity(raw_edtechModules);
export const edtechExpansionModules = applyEdtechClarity(raw_edtechExpansionModules);
export const edtechAdvancedModules = applyEdtechClarity(raw_edtechAdvancedModules);
export const edtechGlobalResearchModules = applyEdtechClarity(raw_edtechGlobalResearchModules);
export const edtechAiInEdtechModules = applyEdtechClarity(raw_edtechAiInEdtechModules);
export const edtechResearchMethodsModules = applyEdtechClarity(raw_edtechResearchMethodsModules);
export const edtechPracticumModules = applyEdtechClarity(raw_edtechPracticumModules);
export const edtechProductLandscapeModules = applyEdtechClarity(raw_edtechProductLandscapeModules);

export type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase };
export { sqlModules, aiFoundationModules, dataEngModules, mlModules, programmingExpansionModules, cloudModules, cloudExpansionModules, dlModules, nlpModules, nlpExpansionModules, nlpProductionModules, nlpAdvancedModules, rlModules, softwareEngModules, webDevModules, programmingInteractiveLabsModules, programmingMasteryLabsModules, cybersecurityModules, startupModules };

// Combined expanded modules array
export const expandedModules: ExtendedProgrammingModule[] = [
  ...aiFoundationModules,
  ...softwareEngModules,
  ...webDevModules,
  ...sqlModules,
  ...dataEngModules,
  ...mlModules,
  ...cloudModules,
  ...cloudExpansionModules,
  ...dlModules,
  ...nlpModules,
  ...nlpExpansionModules,
  ...nlpProductionModules,
  ...nlpAdvancedModules,
  ...rlModules,
  ...programmingExpansionModules,
  ...edtechModules,
  ...edtechExpansionModules,
  ...edtechAdvancedModules,
  ...edtechGlobalResearchModules,
  ...edtechAiInEdtechModules,
  ...edtechResearchMethodsModules,
  ...edtechPracticumModules,
  ...edtechProductLandscapeModules,
  ...programmingInteractiveLabsModules,
  ...programmingMasteryLabsModules,
  ...cybersecurityModules,
  ...startupModules,
];
