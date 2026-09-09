/**
 * @file cambridgeSpeakingSanitize.ts
 * @description Cleans the Cambridge speaking task bank before it reaches the UI:
 *   removes duplicated prompts, makes every task id unique, and merges topic
 *   labels that only differ by an article/preposition ("The classroom" vs
 *   "In the classroom") so the topic picker stays short and logical.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeSpeakingTask } from "./cambridgeSpeakingTasks";
import {
  FOLLOW_UP_POOLS,
  GENERIC_FOLLOW_UPS,
  USEFUL_LANGUAGE_FILLERS,
  FRAME_POOLS,

  type FollowUpPool,
} from "./cambridgeSpeakingQuestionFix";


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


/**
 * Keyword buckets: any topic mentioning these words joins one clean theme, so the
 * topic picker stays short instead of listing 50+ near-identical labels.
 * Order matters - the first match wins.
 */
const TOPIC_BUCKETS: { key: string; label: string; re: RegExp }[] = [
  { key: "animals and pets", label: "Animals and pets", re: /animal|pet|zoo|farm|bird|cat|dog|fish|insect|puppy|kitten/i },
  { key: "school life", label: "School life", re: /school|class|lesson|teacher|homework|subject|study|exam|library|learning/i },
  { key: "food and meals", label: "Food and meals", re: /food|meal|eat|breakfast|lunch|dinner|cook|fruit|vegetable|snack|restaurant|cafe|drink/i },
  { key: "family and friends", label: "Family and friends", re: /family|friend|parent|brother|sister|grandparent|cousin|people i/i },
  { key: "sport and exercise", label: "Sport and exercise", re: /sport|exercise|football|swim|run|game of|fit|match|team|bike ride|cycling/i },
  { key: "holidays and travel", label: "Holidays and travel", re: /holiday|travel|trip|journey|beach|camp|airport|train|tourist|visit/i },
  { key: "hobbies and free time", label: "Hobbies and free time", re: /hobb|free time|weekend|relax|collect|club|activit|playing|toys|game/i },
  { key: "home and my room", label: "Home and my room", re: /home|house|room|bedroom|kitchen|flat|garden|living/i },
  { key: "my town", label: "My town", re: /town|city|village|street|neighbour|place i live|park|shop|market|building/i },
  { key: "technology and the internet", label: "Technology and the internet", re: /technolog|computer|internet|phone|online|app|social media|robot|ai\b|video game/i },
  { key: "music and films", label: "Music and films", re: /music|song|film|movie|tv|cinema|dance|concert|show/i },
  { key: "books and reading", label: "Books and reading", re: /book|read|story|magazine|comic/i },
  { key: "clothes and colours", label: "Clothes and colours", re: /clothes|colour|wear|shoes|dress|shirt|uniform/i },
  { key: "weather and seasons", label: "Weather and seasons", re: /weather|season|rain|sun|winter|summer|autumn|spring|snow/i },
  { key: "health and daily routine", label: "Health and daily routine", re: /health|routine|sleep|morning|day|doctor|hospital|body|feeling|emotion/i },
  { key: "jobs and future plans", label: "Jobs and future plans", re: /job|work|career|future|plan|university|money|business/i },
  { key: "nature and the environment", label: "Nature and the environment", re: /nature|environment|tree|plant|sea|mountain|river|recycl|weather change|climate/i },
  { key: "celebrations", label: "Celebrations", re: /birthday|party|festival|tet|celebrat|new year|present|gift/i },
  { key: "transport", label: "Transport", re: /transport|bus|car|bike|traffic|plane|boat|getting to/i },
  { key: "people and appearance", label: "People and appearance", re: /appearance|hair|face|describ.*person|hero|famous/i },
];

const canonicalTopicKey = (topic: string) => {
  const k = topicKey(topic);
  if (TOPIC_ALIASES[k]) return TOPIC_ALIASES[k];
  const bucket = TOPIC_BUCKETS.find((b) => b.re.test(topic));
  return bucket ? bucket.key : k;
};

/** Preferred display label for a canonical topic key (falls back to the first label seen). */
const bucketLabel = (key: string) => TOPIC_BUCKETS.find((b) => b.key === key)?.label;


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
      .replace(/\b(three|four|five|six|seven|eight)\b\s+differences/gi, "the differences")
      .replace(/the differences you can see you can see/gi, "the differences you can see");
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

/** Content words used to spot prompts that are near-copies of each other. */
const contentWords = (s: string) =>
  new Set(s.toLowerCase().replace(/[^a-z ]/g, "").split(/\s+/).filter((w) => w.length > 3));

const similarity = (a: Set<string>, b: Set<string>) => {
  if (!a.size || !b.size) return 0;
  let hit = 0;
  a.forEach((w) => { if (b.has(w)) hit++; });
  return hit / Math.max(a.size, b.size);
};

/**
 * Deduplicate tasks, unify topic labels and correct exam part labels.
 * The first occurrence of a prompt wins; later copies (including near-copies that
 * only swap a word or two inside the same level and part) are dropped.
 * The first label seen for a topic key becomes the display label for all of them.
 */
export const sanitizeSpeakingTasks = (tasks: CambridgeSpeakingTask[]): CambridgeSpeakingTask[] => {
  const seenPrompt = new Set<string>();
  const seenId = new Set<string>();
  const labelByKey = new Map<string, string>();
  const wordsByBucket = new Map<string, Set<string>[]>();
  const out: CambridgeSpeakingTask[] = [];

  for (const task of tasks) {
    const pk = promptKey(task);
    if (seenPrompt.has(pk)) continue;
    seenPrompt.add(pk);

    const key = canonicalTopicKey(task.topic);
    if (!labelByKey.has(key)) labelByKey.set(key, bucketLabel(key) ?? task.topic.trim());
    const topic = labelByKey.get(key)!;

    const level = normalizeLevel(task);
    const prompt = normalizePrompt(level, task.prompt);
    const part = normalizePart(level, task.part, prompt);

    // Drop near-identical cards so students do not answer the same question twice.
    const bucket = `${level}|${part}`;
    const words = contentWords(prompt);
    const seenWords = wordsByBucket.get(bucket) ?? [];
    if (seenWords.some((w) => similarity(words, w) >= 0.78)) continue;
    seenWords.push(words);
    wordsByBucket.set(bucket, seenWords);

    // Keep ids unique so per-id lookups (images, progress) never collide.
    let id = task.id;
    let n = 2;
    while (seenId.has(id)) id = `${task.id}-${n++}`;
    seenId.add(id);

    out.push({ ...task, id, level, topic, prompt, part });
  }

  return dedupeFollowUpQuestions(out);
};

/* ------------------------------------------------------------------ *
 * Follow-up question dedupe
 * Topic buckets merge cards written in different files, so the same
 * examiner question can appear several times inside one level + topic.
 * Repeated questions are replaced with an unused question from the
 * matching pool so every card still has at least three follow-ups.
 * ------------------------------------------------------------------ */

const questionKey = (q: string) =>
  q.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();

const MIN_FOLLOW_UPS = 3;
const MIN_PHRASES = 4;
const MIN_FRAMES = 2;


const poolFor = (level: LevelKey, topic: string): string[] => {
  const tier: keyof FollowUpPool = level === "ket" || level === "pet" ? "older" : "young";
  const topical = FOLLOW_UP_POOLS[canonicalTopicKey(topic)]?.[tier] ?? [];
  return [...topical, ...GENERIC_FOLLOW_UPS[tier]];
};

const dedupeFollowUpQuestions = (tasks: CambridgeSpeakingTask[]): CambridgeSpeakingTask[] => {
  // used question keys per `${level}|${canonical topic}`
  const used = new Map<string, Set<string>>();
  const usedWords = new Map<string, Set<string>[]>();

  const claim = (scope: string, question: string): boolean => {
    const key = questionKey(question);
    if (!key) return false;
    const seen = used.get(scope) ?? new Set<string>();
    if (seen.has(key)) return false;
    const words = contentWords(question);
    const seenWords = usedWords.get(scope) ?? [];
    // A question that only swaps one word is still a repeat for the student.
    if (words.size > 2 && seenWords.some((w) => similarity(words, w) >= 0.85)) return false;
    seen.add(key);
    used.set(scope, seen);
    seenWords.push(words);
    usedWords.set(scope, seenWords);
    return true;
  };

  return tasks.map((task) => {
    const scope = `${task.level}|${canonicalTopicKey(task.topic)}`;
    const examiner: string[] = [];

    for (const q of task.examiner ?? []) {
      if (claim(scope, q)) examiner.push(q.trim());
    }

    if (examiner.length < MIN_FOLLOW_UPS) {
      for (const candidate of poolFor(task.level, task.topic)) {
        if (examiner.length >= MIN_FOLLOW_UPS) break;
        if (claim(scope, candidate)) examiner.push(candidate);
      }
    }

    const tier: keyof FollowUpPool = task.level === "ket" || task.level === "pet" ? "older" : "young";
    const usefulLanguage = [...(task.usefulLanguage ?? [])];
    for (const phrase of USEFUL_LANGUAGE_FILLERS[tier]) {
      if (usefulLanguage.length >= MIN_PHRASES) break;
      if (!usefulLanguage.some((p) => questionKey(p) === questionKey(phrase))) usefulLanguage.push(phrase);
    }
    // Guarantee at least two ready-made sentence frames, graded by level, so the
    // "Sentence frames you can say now" row is never empty or too thin.
    const isFrame = (s: string) => s.trim().split(/\s+/).length >= 3 || /\.\.\.$/.test(s.trim());
    for (const frame of FRAME_POOLS[task.level] ?? []) {
      if (usefulLanguage.filter(isFrame).length >= MIN_FRAMES) break;
      if (!usefulLanguage.some((p) => questionKey(p) === questionKey(frame))) usefulLanguage.push(frame);
    }
    if (usefulLanguage.length !== (task.usefulLanguage?.length ?? 0)) {
      return { ...task, examiner, usefulLanguage };
    }


    return examiner.length === (task.examiner?.length ?? 0) &&
      examiner.every((q, i) => q === task.examiner[i])
      ? task
      : { ...task, examiner };
  });
};



