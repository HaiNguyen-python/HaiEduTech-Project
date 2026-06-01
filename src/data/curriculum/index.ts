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
import { edtechModules } from "./edtechLessons";
import { edtechExpansionModules } from "./edtechExpansion";
import { nlpProductionModules } from "./nlpProduction";
import { nlpAdvancedModules } from "./nlpAdvanced";
import { edtechAdvancedModules } from "./edtechAdvanced";
import { edtechGlobalResearchModules } from "./edtechGlobalResearch";
import type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase } from "./types";

export type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase };
export { sqlModules, aiFoundationModules, dataEngModules, mlModules, programmingExpansionModules, cloudModules, cloudExpansionModules, dlModules, nlpModules, nlpExpansionModules, nlpProductionModules, nlpAdvancedModules, rlModules, softwareEngModules, webDevModules, edtechModules, edtechExpansionModules, edtechAdvancedModules };

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
];
