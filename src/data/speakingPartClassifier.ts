/**
 * IELTS Speaking - part classifier & deduplicator.
 * Guarantees every question sits in the correct part:
 *  - Part 2 = cue cards ("Describe / Talk about / Tell me about ..." or with prompt bullets)
 *  - Part 1 = short personal questions
 *  - Part 3 = abstract discussion questions
 * Also removes duplicate ids / duplicate question texts so the UI list
 * never renders duplicate React keys (which used to leave a stale Part 2
 * row visible inside the Part 1 and Part 3 lists).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion } from "./speakingPracticeData";

const CUE_CARD = /^(describe|talk about|tell me about)\b/i;
const CUE_ISH = /\b(you should say|a time when|an occasion when)\b/i;

/** True when a question follows the Part 2 long-turn cue-card format. */
export const isCueCard = (q: SpeakingPracticeQuestion): boolean => {
  const s = (q.question || "").trim();
  if (CUE_CARD.test(s) || CUE_ISH.test(s)) return true;
  // Prompt bullets ("What it was / Why you liked it ...") only exist on cue cards.
  return Boolean(q.prompts && q.prompts.length >= 3 && !/\?$/.test(s));
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

interface Banks {
  part1: SpeakingPracticeQuestion[];
  part2: SpeakingPracticeQuestion[];
  part3: SpeakingPracticeQuestion[];
}

/**
 * Re-files misplaced cue cards into Part 2 and drops duplicates.
 * Order inside each part is preserved.
 */
export const classifySpeakingBanks = (banks: Banks): Banks => {
  const out: Banks = { part1: [], part2: [], part3: [] };
  const seenId = new Set<string>();
  const seenText = new Set<string>();

  const push = (part: 1 | 2 | 3, q: SpeakingPracticeQuestion) => {
    const text = norm(q.question);
    if (!text) return;
    if (seenText.has(text)) return;
    let id = q.id;
    while (seenId.has(id)) id = `${id}-b`;
    seenId.add(id);
    seenText.add(text);
    out[`part${part}`].push({ ...q, id, part });
  };

  // Cue cards first so Part 2 keeps its canonical order.
  const all: Array<[1 | 2 | 3, SpeakingPracticeQuestion]> = [
    ...banks.part2.map((q) => [2, q] as [2, SpeakingPracticeQuestion]),
    ...banks.part1.map((q) => [1, q] as [1, SpeakingPracticeQuestion]),
    ...banks.part3.map((q) => [3, q] as [3, SpeakingPracticeQuestion]),
  ];

  for (const [part, q] of all) {
    const target: 1 | 2 | 3 = isCueCard(q) ? 2 : part === 2 ? 3 : part;
    push(target, q);
  }

  return out;
};
