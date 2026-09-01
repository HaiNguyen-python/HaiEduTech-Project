/**
 * @file cambridgeListeningClarity.ts
 * @description Makes every Cambridge listening item answerable from the
 *              recording alone. Some authored scripts only implied the key
 *              ("small and brown, likes to run in the garden" for "A dog") or
 *              expected the child to convert a number the speaker never said.
 *              This pass adds ONE natural spoken sentence that states the key.
 *
 *              The sentence is built from the grammar of the question stem, not
 *              from a fixed frame, so the recording never says things like
 *              "The reason is reads news online." When no natural sentence can
 *              be produced, the item is left alone and the manual override in
 *              `cambridgeListeningFixes.ts` supplies the wording instead.
 *
 *              It runs before the script upgrade, so the added sentence becomes
 *              part of the key line that the upgrade keeps verbatim.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";
import { isAnswerSupported, isNegativeQuestion } from "./cambridgeListeningSupport";
import { listeningFixFor } from "./cambridgeListeningFixes";

/** Strip the "Listen:" wrapper and the surrounding quotes of an authored line. */
export const listeningCoreLine = (passage: string): string => {
  let text = passage.replace(/^\s*Listen:\s*/i, "").trim();
  text = text.replace(/\n+/g, " ").trim();
  const quoted = text.match(/^['"“](.*)['"”]$/s);
  if (quoted) text = quoted[1].trim();
  return text.replace(/\s+/g, " ").replace(/\s*&\s*/g, " and ");
};

const lower = (text: string): string =>
  /^[A-Z]{2,}|^£|^\$|^\d/.test(text) ? text : text.charAt(0).toLowerCase() + text.slice(1);

const isTimeLike = (t: string): boolean => /^\d{1,2}([:.]\d{2})?\s*(a\.?m\.?|p\.?m\.?|o'clock)?$/i.test(t.trim());
const isPriceLike = (t: string): boolean => /^[£$]\d/.test(t.trim());
const isNumberLike = (t: string): boolean => /^\d+([.,]\d+)?(\s*[a-z.]+)?$/i.test(t.trim());
const DAYS_MONTHS =
  /\b(january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;
const isDateLike = (t: string): boolean => DAYS_MONTHS.test(t);
const TIME_NOUNS = /^(morning|afternoon|evening|night|weekend|holidays?|summer|winter|spring|autumn)\b/i;
const isClause = (t: string): boolean => /^(i|you|he|she|it|they|we|there)\b/i.test(t.trim());
const isIng = (t: string): boolean => /^[a-z]+ing\b/i.test(t.trim());
const BASE_VERBS =
  /^(write|read|buy|take|use|go|cook|play|walk|cycle|swim|call|ask|visit|postpone|cancel|book|bring|wear|study|join|help|meet|send|wait|start|finish|change|recycle|save|plant|paint|draw|watch|listen|clean|wash|ride|run|sing|dance|sleep|eat|drink|drive|fly|climb|share|check|print|pay|order|collect|return)\b/i;
/** Third person verb phrase such as "reads news online" or "takes the bus". */
const THIRD_PERSON =
  /^(reads|writes|takes|goes|buys|plays|walks|cycles|swims|calls|asks|visits|cooks|studies|joins|helps|meets|sends|waits|starts|finishes|changes|recycles|saves|plants|paints|draws|watches|listens|cleans|washes|rides|runs|sings|dances|sleeps|eats|drinks|drives|flies|climbs|shares|checks|prints|pays|orders|collects|returns)\b/;
const THIRD_TO_BASE: Record<string, string> = {
  reads: "read", writes: "write", takes: "take", goes: "go", buys: "buy", plays: "play",
  walks: "walk", cycles: "cycle", swims: "swim", calls: "call", asks: "ask", visits: "visit",
  cooks: "cook", studies: "study", joins: "join", helps: "help", meets: "meet", sends: "send",
  waits: "wait", starts: "start", finishes: "finish", changes: "change", recycles: "recycle",
  saves: "save", plants: "plant", paints: "paint", draws: "draw", watches: "watch",
  listens: "listen", cleans: "clean", washes: "wash", rides: "ride", runs: "run",
  sings: "sing", dances: "dance", sleeps: "sleep", eats: "eat", drinks: "drink",
  drives: "drive", flies: "fly", climbs: "climb", shares: "share", checks: "check",
  prints: "print", pays: "pay", orders: "order", collects: "collect", returns: "return",
};

/** Keep proper nouns capitalised, lower case ordinary noun phrases mid sentence. */
const midSentence = (text: string): string =>
  isDateLike(text) || /^[A-Z]{2,}|^£|^\$|^\d|^Mr|^Mrs|^Miss/.test(text) ? text : lower(text);

const hasDeterminer = (text: string): boolean =>
  /^(a|an|the|my|your|his|her|our|their|some|any|this|that|these|those|two|three|four|five|no)\b/i.test(text.trim());

/** "dog" -> "a dog", "apple" -> "an apple". Plurals and lists stay unchanged. */
const withArticle = (text: string): string => {
  const t = text.trim();
  if (hasDeterminer(t) || /\band\b|,/.test(t) || /s$/i.test(t) || /^[£$\d]/.test(t)) return t;
  if (t.split(/\s+/).length > 2) return t;
  return `${/^[aeiou]/i.test(t) ? "an" : "a"} ${t}`;
};

/** "write in diary" -> "write in my diary", "postpone meeting" -> "postpone the meeting". */
const naturaliseVerbPhrase = (text: string): string => {
  let t = text.trim();
  t = t.replace(/\b(in|on|at|with|to|for|from)\s+([a-z]+)$/i, (_m, prep: string, noun: string) =>
    /^(school|home|work|bed|class|town|hospital|it|them|me|us|you|him|her)$/i.test(noun)
      ? `${prep} ${noun}`
      : `${prep} my ${noun}`
  );
  t = t.replace(
    /^([a-z]+)\s+(?!(the|a|an|my|your|his|her|our|their|some|any|this|that|to|it|in|on|at|with|for|from)\b)([a-z]+)$/i,
    "$1 the $3"
  );
  return t;
};

/** The main verb of the stem, so "What does she study?" answers with "I study ...". */
const stemVerb = (question: string): string | null => {
  const m = question
    .toLowerCase()
    .match(/\b(?:do|does|did)\s+(?:the\s+[a-z]+\s+)?(?:the\s+[a-z]+|he|she|they|it|you|we)\s+([a-z]+)\b/);
  if (!m) return null;
  const verb = m[1];
  if (/^(not|have|has|had|be|is|are|was|were|do|does|did)$/.test(verb)) return null;
  return verb;
};

/** The noun counted by a "how many ..." stem, so the reply can name it. */
const countedNoun = (question: string): string | null => {
  const m = question.toLowerCase().match(/how many\s+([a-z ]+?)\s+(are|is|does|do|did|has|have|can|will|\?|$)/);
  const noun = m?.[1]?.trim();
  return noun && noun.split(/\s+/).length <= 3 ? noun : null;
};

/**
 * A spoken sentence that states the key naturally. Returns null when no
 * grammatical sentence can be built, so nothing robotic ever reaches a child.
 */
export const listeningSupportSentence = (question: string, key: string): string | null => {
  const q = question.toLowerCase();
  const raw = key.trim().replace(/\.$/, "").replace(/\s*&\s*/g, " and ");
  if (!raw) return null;
  const said = midSentence(raw);
  const bare = said.replace(/^(a|an|the)\s+/i, "");

  if (isPriceLike(raw)) return /how much/.test(q) ? `It costs ${raw}.` : `The price is ${raw}.`;
  if (/how much (is|are|does|do|was)/.test(q) && isNumberLike(raw)) return `It costs ${raw}.`;

  if (isTimeLike(raw)) {
    if (/how long/.test(q)) return `It lasts ${bare}.`;
    return /what time|when/.test(q) ? `That is at ${raw}.` : `The time is ${raw}.`;
  }
  if (isDateLike(raw) && /when|what day|which day|what date/.test(q)) return `That is on ${said}.`;

  if (/how long/.test(q)) return `It lasts ${bare}.`;
  if (/how many|how much/.test(q) && isNumberLike(raw)) {
    const noun = countedNoun(question);
    return noun ? `There are ${raw} ${noun} in total.` : `There are ${raw} in total.`;
  }

  if (/how (does|did|do|is|was|are) .*(feel)/.test(q)) return `I feel ${bare} about it, to be honest.`;
  if (/how sure|how certain|how likely/.test(q)) return `I would say that is ${bare}.`;

  if (/\bwhy\b/.test(q)) {
    if (isClause(raw)) return `That is because ${said}.`;
    const third = raw.match(THIRD_PERSON);
    if (third) {
      const rest = raw.slice(third[0].length).trim();
      return `That is because I ${THIRD_TO_BASE[third[1]]}${rest ? ` ${naturaliseVerbPhrase(rest)}` : ""}.`;
    }
    if (BASE_VERBS.test(raw)) return `That is because I ${naturaliseVerbPhrase(said)}.`;
    if (isIng(raw)) return `That is because of the ${said}.`;
    return `That is because of ${withArticle(said)}.`;
  }

  const verb = stemVerb(question);
  if (verb && !isClause(raw) && !isIng(raw)) {
    if (BASE_VERBS.test(raw) || THIRD_PERSON.test(raw)) {
      const third = raw.match(THIRD_PERSON);
      const phrase = third
        ? `${THIRD_TO_BASE[third[1]]} ${naturaliseVerbPhrase(raw.slice(third[0].length).trim())}`.trim()
        : naturaliseVerbPhrase(said);
      return `I ${phrase}.`;
    }
    if (TIME_NOUNS.test(raw)) return `I ${verb} in the ${said}.`;
    if (/^(in|on|at|near|next|under|behind|opposite|between|beside|by|from|to)\b/i.test(said)) {
      return `I ${verb} ${said}.`;
    }
    return `I ${verb} ${withArticle(said)}.`;
  }

  if (isClause(raw)) return `Yes, ${said}.`;
  if (isIng(raw)) return `We are ${said}.`;
  if (TIME_NOUNS.test(raw)) return `I do that in the ${said}.`;
  if (BASE_VERBS.test(raw)) return `Yes, I ${naturaliseVerbPhrase(said)}.`;
  const third = raw.match(THIRD_PERSON);
  if (third) {
    const rest = raw.slice(third[0].length).trim();
    return `Yes, I ${THIRD_TO_BASE[third[1]]}${rest ? ` ${naturaliseVerbPhrase(rest)}` : ""}.`;
  }
  if (/^(in|on|at|near|next|under|behind|opposite|between|beside|by|from|to)\b/i.test(said)) {
    return `It is ${said}.`;
  }
  if (/^[a-z' -]+$/i.test(said) || isDateLike(said) || /^[£$\d]/.test(said)) {
    return `It is ${withArticle(said)}.`;
  }
  return null;
};

/** Add the missing key sentence to every listening item that needs one. */
export const clarifyCambridgeListening = (exam: CambridgeMockExam): CambridgeMockExam => ({
  ...exam,
  questions: exam.questions.map(q => {
    if (q.section !== "Listening" || !q.passage) return q;
    const core = listeningCoreLine(q.passage);
    const key = q.options[q.correctAnswer] ?? "";

    const override = listeningFixFor(exam.id, q.id, key);
    if (override) return { ...q, passage: `Listen: '${override}'` };

    if (!core) return q;
    // Negative stems ("what should tourists NOT do?") are answered by what the
    // script rules out, so stating the key as a fact would break them.
    if (isNegativeQuestion(q.question)) return { ...q, passage: `Listen: '${core}'` };
    if (!key || isAnswerSupported(core, key)) return { ...q, passage: `Listen: '${core}'` };

    const sentence = listeningSupportSentence(q.question, key);
    if (!sentence) return { ...q, passage: `Listen: '${core}'` };
    return { ...q, passage: `Listen: '${core} ${sentence}'` };
  }),
});
