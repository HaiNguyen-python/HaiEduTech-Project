/**
 * @file index.ts
 * @description Merges the English Grammar content upgrades into the base
 *              curriculum modules without editing legacy data files.
 */
import type { LanguageModule } from "../types";
import type { GrammarUpgradeMap } from "./types";
import { GRAMMAR_UPGRADE_PART1 } from "./part1";
import { GRAMMAR_UPGRADE_PART2 } from "./part2";
import { GRAMMAR_UPGRADE_PART3 } from "./part3";
import { GRAMMAR_UPGRADE_PART4 } from "./part4";
import { GRAMMAR_UPGRADE_PART5 } from "./part5";

export const GRAMMAR_UPGRADES: GrammarUpgradeMap = {
  ...GRAMMAR_UPGRADE_PART1,
  ...GRAMMAR_UPGRADE_PART2,
  ...GRAMMAR_UPGRADE_PART3,
  ...GRAMMAR_UPGRADE_PART4,
  ...GRAMMAR_UPGRADE_PART5,
};

/** Apply theory / tips / vocabulary upgrades keyed by lesson id. */
export const enhanceGrammarModulesWithTheoryUpgrade = (
  modules: LanguageModule[]
): LanguageModule[] =>
  modules.map((mod) => ({
    ...mod,
    lessons: mod.lessons.map((lesson) => {
      const upgrade = GRAMMAR_UPGRADES[lesson.id];
      if (!upgrade) return lesson;
      return {
        ...lesson,
        theory: upgrade.theory ?? lesson.theory,
        theoryEn: upgrade.theoryEn ?? lesson.theoryEn,
        proTips: upgrade.proTips ?? lesson.proTips,
        proTipsEn: upgrade.proTipsEn ?? lesson.proTipsEn,
        vocabulary:
          upgrade.vocabulary && upgrade.vocabulary.length > 0
            ? [...(lesson.vocabulary ?? []), ...upgrade.vocabulary].filter(
                (entry, index, list) =>
                  list.findIndex((item) => item.word.toLowerCase() === entry.word.toLowerCase()) === index
              )
            : lesson.vocabulary,
        exercises:
          upgrade.exercises && upgrade.exercises.length > 0
            ? [...lesson.exercises, ...upgrade.exercises]
            : lesson.exercises,
      };
    }),
  }));
