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
 * Deduplicate tasks and unify topic labels.
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

    out.push({ ...task, id, topic });
  }

  return out;
};
