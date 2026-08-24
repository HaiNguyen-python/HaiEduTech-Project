/**
 * @file ieltsListeningAllSets.ts
 * @description Single source of truth for every IELTS Listening practice set.
 * Waves 1-11 combined: 30 sets per section (120 sets in total), each with
 * exactly 10 questions, which supports 30 unique full tests of 40 questions.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";
import { ieltsListeningPracticeSets } from "./ieltsListeningPractice";
import { ieltsListeningPracticeSetsExpansion } from "./ieltsListeningPracticeExpansion";
import { ieltsListeningPracticeSetsExpansion2 } from "./ieltsListeningPracticeExpansion2";
import { ieltsListeningPracticeSetsExpansion3 } from "./ieltsListeningPracticeExpansion3";
import { ieltsListeningPracticeSetsExpansion4 } from "./ieltsListeningPracticeExpansion4";
import { ieltsListeningPracticeSetsExpansion5 } from "./ieltsListeningPracticeExpansion5";
import { ieltsListeningPracticeSetsExpansion6 } from "./ieltsListeningPracticeExpansion6";
import { ieltsListeningPracticeSetsExpansion7 } from "./ieltsListeningPracticeExpansion7";
import { ieltsListeningPracticeSetsExpansion8 } from "./ieltsListeningPracticeExpansion8";
import { ieltsListeningPracticeSetsExpansion9 } from "./ieltsListeningPracticeExpansion9";
import { ieltsListeningPracticeSetsExpansion10 } from "./ieltsListeningPracticeExpansion10";
import { ieltsListeningPracticeSetsExpansion11 } from "./ieltsListeningPracticeExpansion11";

export const ALL_LISTENING_SETS: ListeningPracticeSet[] = [
  ...ieltsListeningPracticeSets,
  ...ieltsListeningPracticeSetsExpansion,
  ...ieltsListeningPracticeSetsExpansion2,
  ...ieltsListeningPracticeSetsExpansion3,
  ...ieltsListeningPracticeSetsExpansion4,
  ...ieltsListeningPracticeSetsExpansion5,
  ...ieltsListeningPracticeSetsExpansion6,
  ...ieltsListeningPracticeSetsExpansion7,
  ...ieltsListeningPracticeSetsExpansion8,
  ...ieltsListeningPracticeSetsExpansion9,
  ...ieltsListeningPracticeSetsExpansion10,
  ...ieltsListeningPracticeSetsExpansion11,
];

export const listeningSetById = new Map(ALL_LISTENING_SETS.map(s => [s.id, s]));
