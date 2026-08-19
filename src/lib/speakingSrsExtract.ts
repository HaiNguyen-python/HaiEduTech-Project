/**
 * @file speakingSrsExtract.ts
 * @description Pure helpers that turn an IELTS Speaking grading result into
 *   spaced-repetition (SRS) review items. Items are the sentences / phrases the
 *   student mispronounced, used incorrectly, or delivered without fluency.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SpeakingSrsType = "pronunciation" | "fluency" | "grammar" | "vocabulary";

export interface SpeakingSrsDraft {
  itemType: SpeakingSrsType;
  content: string;
  contentKey: string;
  target?: string;
  tip?: string;
  part?: number;
  topic?: string;
  questionId?: string;
}

/** Minimal shape needed from the grading result (kept loose on purpose). */
export interface GradedSpeakingLike {
  overall: number;
  criteria: { label: string; score: number; feedback: string }[];
  transcript?: string;
  vocabularyUpgrades?: { basic: string; advanced: string; example: string }[];
  pronunciationFocus?: { sound: string; words: string[]; tip: string }[];
  highlightedErrors?: { text: string; type: string; correction: string; explanation: string }[];
  upgradedAnswer?: string;
}

export const normalizeSrsKey = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, " ").replace(/[^\p{L}\p{N} ]/gu, "").trim();

const MAX_ITEMS_PER_GRADING = 8;

const isUsable = (text?: string) => {
  const value = (text || "").trim();
  return value.length >= 2 && value.length <= 240;
};

const criterionScore = (result: GradedSpeakingLike, needle: string): number | undefined =>
  result.criteria?.find((c) => c.label.toLowerCase().includes(needle))?.score;

/** Pick the first sentences of a transcript so fluency drills stay short. */
const firstSentences = (transcript: string, count = 2): string[] =>
  (transcript.match(/[^.!?]+[.!?]*/g) || [transcript])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 4)
    .slice(0, count);

export function extractSpeakingSrsDrafts(
  result: GradedSpeakingLike,
  ctx: { part?: number; topic?: string; questionId?: string } = {}
): SpeakingSrsDraft[] {
  const drafts: SpeakingSrsDraft[] = [];
  const seen = new Set<string>();

  const push = (draft: Omit<SpeakingSrsDraft, "contentKey">) => {
    if (!isUsable(draft.content)) return;
    const contentKey = normalizeSrsKey(draft.content);
    if (!contentKey || seen.has(`${draft.itemType}:${contentKey}`)) return;
    seen.add(`${draft.itemType}:${contentKey}`);
    drafts.push({
      ...draft,
      content: draft.content.trim(),
      contentKey,
      part: ctx.part,
      topic: ctx.topic,
      questionId: ctx.questionId,
    });
  };

  // 1) Pronunciation focus - each flagged word becomes a drill item.
  for (const focus of result.pronunciationFocus || []) {
    for (const word of focus.words || []) {
      push({
        itemType: "pronunciation",
        content: word,
        target: word,
        tip: [focus.sound ? `/${focus.sound}/` : "", focus.tip].filter(Boolean).join(" - "),
      });
    }
  }

  // 2) Highlighted errors from the AI feedback.
  for (const err of result.highlightedErrors || []) {
    const type: SpeakingSrsType =
      err.type === "pronunciation" ? "pronunciation" : err.type === "vocabulary" ? "vocabulary" : "grammar";
    push({
      itemType: type,
      content: err.text,
      target: err.correction,
      tip: err.explanation,
    });
  }

  // 3) Vocabulary upgrades - practise the advanced version in a real sentence.
  for (const up of result.vocabularyUpgrades || []) {
    push({
      itemType: "vocabulary",
      content: up.basic,
      target: up.advanced,
      tip: up.example,
    });
  }

  // 4) Fluency - only when the fluency band is still weak.
  const fluency = criterionScore(result, "fluency");
  if (typeof fluency === "number" && fluency < 6.5 && result.transcript) {
    for (const sentence of firstSentences(result.transcript)) {
      push({
        itemType: "fluency",
        content: sentence,
        target: sentence,
        tip: "Read it aloud smoothly, no long pauses, link the words together.",
      });
    }
  }

  return drafts.slice(0, MAX_ITEMS_PER_GRADING);
}

/** Interval ladder: stage 0 -> 1 day, 1 -> 3 days, 2 -> 7 days, 3 -> mastered. */
export const SRS_INTERVAL_DAYS = [1, 3, 7] as const;

export function nextDueAt(stage: number, from = new Date()): string {
  const days = SRS_INTERVAL_DAYS[Math.min(stage, SRS_INTERVAL_DAYS.length - 1)];
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}
