// Vietnamese Language & History Curriculum Data
// Re-exports from modular files for backward compatibility

// Re-export types
export type {
  VietnameseVocabEntry,
  VietnameseQuizQuestion,
  VietnameseLesson,
  VietnameseModule,
  HistoryEvent,
  HistoryLesson,
  HistoryMonth,
  FactOrMythItem,
  FolkloreItem,
} from "./vietnamese/types";

// Import modular data
import { grammarModules } from "./vietnamese/grammarLessons";
import { vocabularyModules } from "./vietnamese/vocabularyLessons";
import { readingModules } from "./vietnamese/readingLessons";
import { folkloreLanguageModules } from "./vietnamese/folkloreLessons";
import { vietnameseLessonsExpansionModules } from "./vietnamese/lessonsExpansion";
import { historyTimeline as _historyTimeline, historyMonths as _historyMonths } from "./vietnamese/historyData";
import { factOrMythItems as _factOrMythItems, folkloreItems as _folkloreItems } from "./vietnamese/gameData";

// Combine all language modules into a single array (backward compatible)
export const vietnameseLanguageModules = [
  ...grammarModules,
  ...vocabularyModules,
  ...readingModules,
  ...folkloreLanguageModules,
  ...vietnameseLessonsExpansionModules,
];

// Re-export history, game, and folklore data
export const historyTimeline = _historyTimeline;
export const historyMonths = _historyMonths;
export const factOrMythItems = _factOrMythItems;
export const folkloreItems = _folkloreItems;
