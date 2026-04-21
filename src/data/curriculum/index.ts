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
import { rlModules } from "./rlLessons";
import { softwareEngModules } from "./softwareEngLessons";
import { webDevModules } from "./webDevLessons";
import type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase } from "./types";

export type { ExtendedProgrammingModule, ExtendedProgrammingLesson, TestCase };
export { sqlModules, aiFoundationModules, dataEngModules, mlModules, programmingExpansionModules, cloudModules, cloudExpansionModules, dlModules, nlpModules, rlModules, softwareEngModules, webDevModules };

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
  ...rlModules,
  ...programmingExpansionModules,
];
