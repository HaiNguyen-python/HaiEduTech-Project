/**
 * @file ieltsSpeakingHeroImages.ts
 * @description Maps each IELTS Speaking lecture to a thematic hero
 * illustration. Used by IeltsLectureView to render an editorial image
 * banner at the top of every speaking lesson.
 */
import part1 from "@/assets/ielts-speaking/part1-smalltalk.jpg";
import part2 from "@/assets/ielts-speaking/part2-cuecard.jpg";
import part3 from "@/assets/ielts-speaking/part3-discussion.jpg";
import pronunciation from "@/assets/ielts-speaking/pronunciation.jpg";
import fluency from "@/assets/ielts-speaking/fluency.jpg";
import vocabulary from "@/assets/ielts-speaking/vocabulary.jpg";
import examDay from "@/assets/ielts-speaking/exam-day.jpg";
import grammar from "@/assets/ielts-speaking/grammar.jpg";

import type { IeltsLecture } from "@/data/ieltsLecturesData";

const matchesAny = (haystack: string, needles: string[]) =>
  needles.some(n => haystack.includes(n));

/** Returns a hero illustration URL for a speaking lecture, by topic heuristic. */
export function getSpeakingHeroImage(lecture: Pick<IeltsLecture, "id" | "title" | "skill">): string | null {
  if (lecture.skill !== "speaking") return null;
  const key = `${lecture.id} ${lecture.title}`.toLowerCase();

  if (matchesAny(key, ["part1", "part 1", "small-talk", "small talk", "introduction"])) return part1;
  if (matchesAny(key, ["part2", "part 2", "cue-card", "cue card", "long turn", "storytelling", "describe"])) return part2;
  if (matchesAny(key, ["part3", "part 3", "discussion", "abstract", "opinion", "debate", "speculat"])) return part3;
  if (matchesAny(key, ["pronunciation", "intonation", "stress", "accent", "phonetic", "sound"])) return pronunciation;
  if (matchesAny(key, ["fluency", "coherence", "filler", "pause", "hesitation", "flow"])) return fluency;
  if (matchesAny(key, ["vocabulary", "lexical", "collocation", "idiom", "phrase"])) return vocabulary;
  if (matchesAny(key, ["grammar", "tense", "conditional", "inversion", "structure"])) return grammar;
  if (matchesAny(key, ["exam", "test day", "nerves", "confidence", "anxiety", "mindset"])) return examDay;

  // Fallback by id prefix for any uncategorised speaking lecture
  return fluency;
}
