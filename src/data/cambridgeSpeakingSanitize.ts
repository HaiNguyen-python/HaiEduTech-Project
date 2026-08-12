/**
 * @file cambridgeSpeakingSanitize.ts
 * @description Cleans the Cambridge speaking task bank before it reaches the UI:
 *   removes duplicated prompts, makes every task id unique, and merges topic
 *   labels that only differ by an article/preposition ("The classroom" vs
 *   "In the classroom") so the topic picker stays short and logical.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeSpeakingTask } from "./cambridgeSpeakingTasks";

/** Normalised prompt used to spot duplicates written in different files. */
const promptKey = (t: CambridgeSpeakingTask) =>
  `${t.level}|${t.prompt.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.?!,;:'"]/g, "")}`;

/** Topic key ignoring leading articles/prepositions and plural noise. */
const topicKey = (topic: string) =>
  topic
    .trim()
    .toLowerCase()
    .replace(/[.!?]/g, "")
    .replace(/^(in|at|on|about)\s+(the|my|our)\s+/, "")
    .replace(/^(the|my|our|a|an)\s+/, "")
    .replace(/\s+/g, " ")
    .trim();

/** Explicit merges where wording differs more than an article. */
const TOPIC_ALIASES: Record<string, string> = {
  "toys": "toys and games",
  "toys and games": "toys and games",
  "games": "toys and games",
  "fruit basket": "fruit",
  "favourite things": "my favourite things",
  "house": "home",
  "bedroom": "my bedroom",
};

const canonicalTopicKey = (topic: string) => {
  const k = topicKey(topic);
  return TOPIC_ALIASES[k] || k;
};

/**
 * Official Cambridge speaking parts for each level. Any label outside this list
 * is remapped so the exam structure shown to students is always correct.
 *   Starters : 1 Scene card | 2 Object cards | 3 Personal questions
 *   Movers   : 1 Find the differences | 2 Picture story | 3 Odd one out | 4 Personal questions
 *   Flyers   : 1 Find the differences | 2 Information exchange | 3 Picture story | 4 Personal questions
 *   A2 Key   : 1 Interview | 2 Discussion
 *   B1 Prelim: 1 Interview | 2 Long turn | 3 Collaborative task | 4 Discussion
 */
const normalizePart = (level: string, part: string, prompt: string): string => {
  const p = part.toLowerCase();
  const q = prompt.toLowerCase();
  const isStory = /picture story|story/.test(p) || /\bstory\b/.test(q);
  const isDiff = /differen/.test(p) || /differen/.test(q);
  const isOdd = /odd one out/.test(p);
  const isPersonal = /personal|interview/.test(p);
  const isInfo = /information exchange/.test(p);
  const isDescribe = /describe|scene description|photo descri|photo discussion|discussion/.test(p);

  if (level === "starters") {
    if (isPersonal) return "Part 3 - Personal questions";
    if (/object|card/.test(p)) return "Part 2 - Object cards";
    return "Part 1 - Scene card";
  }
  if (level === "movers") {
    if (isDiff) return "Part 1 - Find the differences";
    if (isStory) return "Part 2 - Picture story";
    if (isOdd) return "Part 3 - Odd one out";
    if (isPersonal) return "Part 4 - Personal questions";
    return "Warm-up - Describe the picture";
  }
  if (level === "flyers") {
    if (isDiff) return "Part 1 - Find the differences";
    if (isInfo) return "Part 2 - Information exchange";
    if (isStory) return "Part 3 - Picture story";
    if (isOdd) return "Warm-up - Odd one out";
    if (isPersonal) return "Part 4 - Personal questions";
    return "Warm-up - Describe the picture";
  }
  if (level === "ket") {
    if (isPersonal) return "Part 1 - Interview";
    return "Part 2 - Discussion";
  }
  // pet
  if (/long turn/.test(p)) return "Part 2 - Long turn";
  if (/collaborative/.test(p)) return "Part 3 - Collaborative task";
  if (/discussion/.test(p) && !/photo/.test(p)) return "Part 4 - Discussion";
  if (isPersonal) return "Part 1 - Interview";
  if (isDescribe) return "Part 2 - Long turn";
  return part;
};

/**
 * Deduplicate tasks, unify topic labels and correct exam part labels.
 * The first occurrence of a prompt wins; later copies are dropped.
 * The first label seen for a topic key becomes the display label for all of them.
 */
export const sanitizeSpeakingTasks = (tasks: CambridgeSpeakingTask[]): CambridgeSpeakingTask[] => {
  const seenPrompt = new Set<string>();
  const seenId = new Set<string>();
  const labelByKey = new Map<string, string>();
  const out: CambridgeSpeakingTask[] = [];


  for (const task of tasks) {
    const pk = promptKey(task);
    if (seenPrompt.has(pk)) continue;
    seenPrompt.add(pk);

    // Keep ids unique so per-id lookups (images, progress) never collide.
    let id = task.id;
    let n = 2;
    while (seenId.has(id)) id = `${task.id}-${n++}`;
    seenId.add(id);

    const key = canonicalTopicKey(task.topic);
    if (!labelByKey.has(key)) labelByKey.set(key, task.topic.trim());
    const topic = labelByKey.get(key)!;

    const part = normalizePart(task.level, task.part, task.prompt);

    out.push({ ...task, id, topic, part });
  }

  return out;
};
