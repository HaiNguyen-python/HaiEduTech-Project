/**
 * @file vocabAdapter.ts
 * @description Normalises every vocabulary bank of the site (IELTS, Vietnamese,
 * HSK, Japanese, Finnish, Swedish) into one shape so the shared learning modes
 * (Word Quest + Daily Word Mission) work on any subject without duplication.
 */
import type { IeltsWord } from "@/data/ieltsVocabData";

/**
 * A learnable item. It stays structurally compatible with `IeltsWord` so the
 * shared question helpers keep working, and adds the few fields that differ per
 * language (mastery key, TTS text, what the learner is asked to type).
 */
export interface QuestItem extends IeltsWord {
  /** Key used for mastery + SRS storage (usually the word itself). */
  key: string;
  /** Text sent to the text-to-speech engine. */
  speakText: string;
  /** What the learner types in the typing steps (romanised for zh / ja). */
  typeAnswer: string;
  /** Extra line under the word: pinyin, romaji, article... */
  subtitle?: string;
  /** Translation of the example sentence, shown after answering. */
  exampleTranslation?: string;
}

const clean = (s?: string) => (s || "").trim();

/** IELTS / TOEIC / SAT style English words - already the target shape. */
export const englishToQuest = (w: IeltsWord): QuestItem => ({
  ...w,
  key: w.word,
  speakText: w.word,
  typeAnswer: w.word,
});

/** Vietnamese vocabulary bank (word + meaning + meaningEn). */
export const vietnameseToQuest = (w: {
  word: string; meaning: string; meaningEn: string; example?: string;
  exampleEn?: string; ipa?: string; partOfSpeech?: string; level?: string; category?: string;
}): QuestItem => ({
  word: w.word,
  key: w.word,
  ipa: clean(w.ipa),
  level: w.level || "beginner",
  definition: { vi: w.meaning, en: w.meaningEn },
  example: clean(w.example),
  exampleTranslation: clean(w.exampleEn),
  category: w.category || "Tiếng Việt",
  partOfSpeech: w.partOfSpeech,
  speakText: w.word,
  typeAnswer: w.word,
});

/** HSK words: show the characters, type the pinyin. */
export const hskToQuest = (w: {
  character: string; pinyin: string; level: string; definition: { vi: string; en: string };
  example: string; examplePinyin?: string; category: string;
}): QuestItem => ({
  word: w.character,
  key: w.character,
  ipa: w.pinyin,
  level: w.level,
  definition: w.definition,
  example: clean(w.example),
  exampleTranslation: clean(w.examplePinyin),
  category: w.category,
  speakText: w.character,
  typeAnswer: w.pinyin,
  subtitle: w.pinyin,
});

/** Japanese phrases: show kana/kanji, type the romaji. */
export const japaneseToQuest = (
  p: { jp: string; romaji: string; vi: string; en: string },
  extra?: { level?: string; category?: string },
): QuestItem => ({
  word: p.jp,
  key: p.jp,
  ipa: p.romaji,
  level: extra?.level || "N5",
  definition: { vi: p.vi, en: p.en },
  example: "",
  category: extra?.category || "Vocabulary",
  speakText: p.jp,
  typeAnswer: p.romaji,
  subtitle: p.romaji,
});

/** Finnish vocabulary bank - same field names as IELTS plus exampleEn. */
export const finnishToQuest = (w: {
  word: string; ipa: string; level: string; definition: { en: string; vi: string };
  example: string; exampleEn?: string; category: string; partOfSpeech?: string;
  synonyms?: string[]; collocations?: string[];
}): QuestItem => ({
  ...w,
  key: w.word,
  exampleTranslation: clean(w.exampleEn),
  speakText: w.word,
  typeAnswer: w.word,
});

/** Swedish bank: mastery is tracked by id, not by the word itself. */
export const swedishToQuest = (w: {
  id: string; sv: string; ipa?: string; pos: string; article?: string;
  vi: string; en: string; example: string; exampleVi?: string; exampleEn?: string;
  level: string; category: string;
}): QuestItem => ({
  word: w.sv,
  key: w.id,
  ipa: clean(w.ipa),
  level: w.level,
  definition: { vi: w.vi, en: w.en },
  example: clean(w.example),
  exampleTranslation: clean(w.exampleVi) || clean(w.exampleEn),
  category: w.category,
  partOfSpeech: w.pos,
  subtitle: w.article ? `${w.article} ${w.sv}` : undefined,
  speakText: w.sv,
  typeAnswer: w.sv,
});
