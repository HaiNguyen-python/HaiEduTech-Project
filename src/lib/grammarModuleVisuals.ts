import tenses from "@/assets/grammar/grammar-tenses.jpg";
import conditionals from "@/assets/grammar/grammar-conditionals.jpg";
import passive from "@/assets/grammar/grammar-passive.jpg";
import reportedSpeech from "@/assets/grammar/grammar-reported-speech.jpg";
import relativeClauses from "@/assets/grammar/grammar-relative-clauses.jpg";
import articlesPrepositions from "@/assets/grammar/grammar-articles-prepositions.jpg";
import modals from "@/assets/grammar/grammar-modals.jpg";
import gerunds from "@/assets/grammar/grammar-gerunds.jpg";
import comparisons from "@/assets/grammar/grammar-comparisons.jpg";
import articlesAdvanced from "@/assets/grammar/grammar-articles-advanced.jpg";
import svAgreement from "@/assets/grammar/grammar-sv-agreement.jpg";
import punctuation from "@/assets/grammar/grammar-punctuation-boundaries.jpg";
import inversion from "@/assets/grammar/grammar-inversion.jpg";
import subjunctive from "@/assets/grammar/grammar-subjunctive.jpg";
import cleft from "@/assets/grammar/grammar-cleft.jpg";
import participle from "@/assets/grammar/grammar-participle.jpg";
import phrasalVerbs from "@/assets/grammar/grammar-phrasal-verbs.jpg";
import questionsTags from "@/assets/grammar/grammar-questions-tags.jpg";
import linkingWords from "@/assets/grammar/grammar-linking-words.jpg";
import wordOrder from "@/assets/grammar/grammar-word-order.jpg";
import confusingPairs from "@/assets/grammar/grammar-confusing-pairs.jpg";
import nounClauses from "@/assets/grammar/grammar-noun-clauses.jpg";
import prepositionPatterns from "@/assets/grammar/grammar-prepositions-patterns.jpg";
import sentencePatterns from "@/assets/grammar/grammar-sentence-patterns.jpg";
import { resolveGrammarModuleId } from "@/data/languageCurriculum/grammarModuleMerge";

const GRAMMAR_MODULE_IMAGES: Record<string, string> = {
  "grammar-tenses": tenses,
  "grammar-conditionals": conditionals,
  "grammar-passive": passive,
  "grammar-reported-speech": reportedSpeech,
  "grammar-relative-clauses": relativeClauses,
  "grammar-articles-prepositions": articlesPrepositions,
  "grammar-modals": modals,
  "grammar-gerunds": gerunds,
  "grammar-comparisons": comparisons,
  "grammar-articles-advanced": articlesAdvanced,
  "grammar-sv-agreement": svAgreement,
  "grammar-punctuation-boundaries": punctuation,
  "grammar-inversion": inversion,
  "grammar-subjunctive": subjunctive,
  "grammar-cleft": cleft,
  "grammar-participle": participle,
  "grammar-phrasal-verbs": phrasalVerbs,
  "grammar-questions-tags": questionsTags,
  "grammar-linking-words": linkingWords,
  "grammar-word-order": wordOrder,
  "grammar-confusing-pairs": confusingPairs,
  "grammar-noun-clauses": nounClauses,
  "grammar-prepositions-patterns": prepositionPatterns,
  "grammar-sentence-patterns": sentencePatterns,
};

const FALLBACK_IMAGE = sentencePatterns;

export interface GrammarModuleVisual {
  src: string;
  altVi: string;
  altEn: string;
}

export const getGrammarModuleVisual = (
  moduleId: string,
  titleVi: string,
  titleEn: string,
): GrammarModuleVisual => {
  const key = resolveGrammarModuleId(moduleId);
  return {
    src: GRAMMAR_MODULE_IMAGES[key] ?? FALLBACK_IMAGE,
    altVi: `Hình minh họa chuyên đề ${titleVi}`,
    altEn: `Illustration for the ${titleEn} grammar topic`,
  };
};

export const hasGrammarModuleVisual = (moduleId: string) =>
  Boolean(GRAMMAR_MODULE_IMAGES[resolveGrammarModuleId(moduleId)]);
