// ============================================================
// HSK Vocabulary Shared Types & Constants
// ============================================================

export interface HskWord {
  character: string;
  pinyin: string;
  level: string;
  definition: { vi: string; en: string };
  example: string;
  examplePinyin: string;
  category: string;
}

export const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"] as const;

export const HSK_CATEGORIES = [
  "Daily Life",
  "Greetings",
  "Family",
  "Food & Drink",
  "Numbers",
  "Time",
  "Travel",
  "Shopping",
  "Education",
  "Work & Business",
  "Health",
  "Nature",
  "Technology",
  "Culture",
  "Emotions",
  "Actions",
  "Descriptions",
  "Society",
  "Abstract",
  "Academic",
] as const;
