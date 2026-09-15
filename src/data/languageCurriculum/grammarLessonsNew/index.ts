import type { LanguageLesson, LanguageModule } from "../types";
import { newGrammarLessonsPart1 } from "./part1";
import { newGrammarLessonsPart2 } from "./part2";
import { newGrammarLessonsPart3 } from "./part3";

const mergeSources = (): Record<string, LanguageLesson[]> => {
  const out: Record<string, LanguageLesson[]> = {};
  for (const source of [newGrammarLessonsPart1, newGrammarLessonsPart2, newGrammarLessonsPart3]) {
    for (const [moduleId, lessons] of Object.entries(source)) {
      out[moduleId] = [...(out[moduleId] ?? []), ...lessons];
    }
  }
  return out;
};

export const newGrammarLessons = mergeSources();

/** Appends the newly authored lessons to their modules without touching existing lesson IDs. */
export const applyNewGrammarLessons = (modules: LanguageModule[]): LanguageModule[] =>
  modules.map((mod) => {
    const extra = newGrammarLessons[mod.id];
    if (!extra || extra.length === 0) return mod;
    const existing = new Set(mod.lessons.map((l) => l.id));
    const additions = extra.filter((l) => !existing.has(l.id));
    if (additions.length === 0) return mod;
    return { ...mod, lessons: [...mod.lessons, ...additions] };
  });
