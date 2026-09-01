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
  "playing": "toys and games",
  "fruit basket": "fruit",
  "fruit and vegetables": "fruit",
  "favourite things": "my favourite things",
  "favourite toy": "toys and games",
  "house": "home",
  "my house": "home",
  "flat": "home",
  "bedroom": "my bedroom",
  "my room": "my bedroom",
  "pets": "animals and pets",
  "pet": "animals and pets",
  "animals": "animals and pets",
  "wild animals": "animals and pets",
  "farm animals": "animals and pets",
  "zoo": "animals and pets",
  "school": "school life",
  "my school": "school life",
  "classroom": "school life",
  "lessons": "school life",
  "school subjects": "school life",
  "food": "food and meals",
  "food i like": "food and meals",
  "meals": "food and meals",
  "breakfast": "food and meals",
  "lunch": "food and meals",
  "dinner": "food and meals",
  "eating out": "food and meals",
  "family": "family and friends",
  "my family": "family and friends",
  "friends": "family and friends",
  "best friend": "family and friends",
  "sport": "sport and exercise",
  "sports": "sport and exercise",
  "exercise": "sport and exercise",
  "keeping fit": "sport and exercise",
  "holiday": "holidays and travel",
  "holidays": "holidays and travel",
  "travel": "holidays and travel",
  "travelling": "holidays and travel",
  "trips": "holidays and travel",
  "weather": "weather and seasons",
  "seasons": "weather and seasons",
  "clothes": "clothes and colours",
  "colours": "clothes and colours",
  "hobbies": "hobbies and free time",
  "free time": "hobbies and free time",
  "free time activities": "hobbies and free time",
  "weekend": "hobbies and free time",
  "weekends": "hobbies and free time",
  "town": "my town",
  "city": "my town",
  "neighbourhood": "my town",
  "places in town": "my town",
  "shopping": "shops and shopping",
  "shops": "shops and shopping",
  "market": "shops and shopping",
  "technology": "technology and the internet",
  "computers": "technology and the internet",
  "internet": "technology and the internet",
  "phones": "technology and the internet",
  "social media": "technology and the internet",
  "music": "music and films",
  "films": "music and films",
  "tv": "music and films",
  "books": "books and reading",
  "reading": "books and reading",
  "jobs": "jobs and future plans",
  "work": "jobs and future plans",
  "future plans": "jobs and future plans",
  "environment": "nature and the environment",
  "nature": "nature and the environment",
  "health": "health and food habits",
  "healthy eating": "health and food habits",
  "daily routine": "my daily routine",
  "routine": "my daily routine",
  "my day": "my daily routine",
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
 * "Odd one out" only exists at Movers, so a Flyers task written in that format
 * is re-levelled to Movers instead of being shown under a made-up warm-up part.
 */
export const OFFICIAL_PARTS: Record<string, string[]> = {
  starters: ["Part 1 - Scene card", "Part 2 - Object cards", "Part 3 - Personal questions"],
  movers: ["Part 1 - Find the differences", "Part 2 - Picture story", "Part 3 - Odd one out", "Part 4 - Personal questions"],
  flyers: ["Part 1 - Find the differences", "Part 2 - Information exchange", "Part 3 - Picture story", "Part 4 - Personal questions"],
  ket: ["Part 1 - Interview", "Part 2 - Discussion"],
  pet: ["Part 1 - Interview", "Part 2 - Long turn", "Part 3 - Collaborative task", "Part 4 - Discussion"],
};

/** True when the prompt is an "odd one out" word set (items listed in the text). */
const isOddPrompt = (part: string, prompt: string) =>
  /odd one out/i.test(part) || /which one is different|which one does not belong|odd one out/i.test(prompt);

type LevelKey = CambridgeSpeakingTask["level"];

/** Re-level tasks whose format does not exist at the level they were written for. */
const normalizeLevel = (task: CambridgeSpeakingTask): LevelKey => {
  if (task.level === "flyers" && isOddPrompt(task.part, task.prompt)) return "movers";
  return task.level;
};

const normalizePart = (level: string, part: string, prompt: string): string => {
  const p = part.toLowerCase();
  const q = prompt.toLowerCase();
  const isOdd = isOddPrompt(part, prompt);
  const isStory = /picture story/.test(p) || (!isOdd && /\bstory\b/.test(q));
  const isDiff = /differen/.test(p) || (!isOdd && !isStory && /(my picture|your picture).*differen|differences/.test(q));
  const isPersonal = /personal|interview/.test(p);
  const isInfo = /information exchange/.test(p) || /ask me (questions )?about/.test(q);
  const isDescribe = /describe|scene description|photo descri|photo discussion|discussion/.test(p);

  if (level === "starters") {
    if (isPersonal) return "Part 3 - Personal questions";
    if (/object/.test(p)) return "Part 2 - Object cards";
    return "Part 1 - Scene card";
  }
  if (level === "movers") {
    if (isOdd) return "Part 3 - Odd one out";
    if (isDiff) return "Part 1 - Find the differences";
    if (isStory) return "Part 2 - Picture story";
    // Everything else at Movers is an examiner-led personal exchange.
    return "Part 4 - Personal questions";
  }
  if (level === "flyers") {
    if (isDiff) return "Part 1 - Find the differences";
    if (isInfo) return "Part 2 - Information exchange";
    if (isStory) return "Part 3 - Picture story";
    return "Part 4 - Personal questions";
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
  return "Part 4 - Discussion";
};

const NUMBER_WORD = /\b(three|four|five|six|seven|eight)\b\s+(differences|things that are different)/i;

/**
 * Clean the examiner prompt so a child can always answer it from what is on screen:
 *  - never ask for a fixed number of differences the shared picture may not have
 *  - keep Starters/Movers cards to one instruction plus at most two questions
 */
const normalizePrompt = (level: string, prompt: string): string => {
  let p = prompt.trim().replace(/\s+/g, " ");

  if (NUMBER_WORD.test(p)) {
    p = p
      .replace(/\b(three|four|five|six|seven|eight)\b\s+things that are different/gi, "the things that are different")
      .replace(/\b(three|four|five|six|seven|eight)\b\s+differences/gi, "the differences you can see");
  }

  if (level === "starters" || level === "movers") {
    const sentences = p.split(/(?<=[.?!])\s+/).filter(Boolean);
    const questions = sentences.filter((s) => s.trim().endsWith("?"));
    if (questions.length > 2) {
      const statements = sentences.filter((s) => !s.trim().endsWith("?"));
      p = [...statements, ...questions.slice(0, 2)].join(" ");
    }
  }

  return p;
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

    const level = normalizeLevel(task);
    const prompt = normalizePrompt(level, task.prompt);
    const part = normalizePart(level, task.part, prompt);

    out.push({ ...task, id, level, topic, prompt, part });
  }

  return out;
};

