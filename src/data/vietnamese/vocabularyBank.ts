// Aggregated Vietnamese Vocabulary Bank
// Flattens all VietnameseVocabEntry items from grammar / vocabulary / reading /
// folklore / lessons-expansion modules into a single searchable bank — mirrors
// the IELTS vocabulary structure (word + meaning + example + level + category).
import { grammarModules } from "./grammarLessons";
import { vocabularyModules } from "./vocabularyLessons";
import { readingModules } from "./readingLessons";
import { folkloreLanguageModules } from "./folkloreLessons";
import { vietnameseLessonsExpansionModules } from "./lessonsExpansion";
import { vocabularyExtrasModules } from "./vocabularyExtras";
import { vocabularyMegaModules } from "./vocabularyMega";
import { vocabularyMega2Modules } from "./vocabularyMega2";
import type { VietnameseVocabEntry } from "./types";

export type VietnameseBankLevel = "beginner" | "intermediate" | "advanced";

export interface VietnameseBankWord extends VietnameseVocabEntry {
  level: VietnameseBankLevel;
  category: string;          // module title (vi)
  categoryEn: string;        // module title (en)
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
}

const allModules = [
  ...grammarModules,
  ...vocabularyModules,
  ...readingModules,
  ...folkloreLanguageModules,
  ...vietnameseLessonsExpansionModules,
  ...vocabularyExtrasModules,
  ...vocabularyMegaModules,
];

const seen = new Set<string>();
const bank: VietnameseBankWord[] = [];

for (const mod of allModules) {
  for (const lesson of mod.lessons || []) {
    if (!lesson.vocabulary || lesson.vocabulary.length === 0) continue;
    for (const v of lesson.vocabulary) {
      const key = `${v.word.toLowerCase()}__${mod.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      bank.push({
        ...v,
        level: (lesson.level as VietnameseBankLevel) || "beginner",
        category: mod.title,
        categoryEn: mod.titleEn,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        moduleId: mod.id,
      });
    }
  }
}

export const vietnameseVocabBank: VietnameseBankWord[] = bank;

export const VIETNAMESE_BANK_LEVELS: VietnameseBankLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export const VIETNAMESE_BANK_CATEGORIES: string[] = Array.from(
  new Set(bank.map(w => w.category))
).sort((a, b) => a.localeCompare(b, "vi"));
