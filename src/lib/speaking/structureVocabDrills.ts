/**
 * @file structureVocabDrills.ts
 * @description Builds vocabulary and structure drills for the IELTS Speaking
 * "Structure & Vocabulary Practice" mode. All content is generated from the
 * existing topic banks (no new content files) and follows the vocabulary
 * fairness rules: the answer is never visible in the prompt, distractors come
 * from the same bank, and options are deduplicated.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface VocabEntry {
  phrase: string;
  vietnamese: string;
}

export type VocabDrillKind =
  | "meaningEn2Vi"
  | "meaningVi2En"
  | "gapFill"
  | "listenChoose"
  | "orderWords"
  | "sayIt";

export interface VocabDrill {
  id: string;
  kind: VocabDrillKind;
  phrase: string;
  vietnamese: string;
  /** Instruction shown above the item. */
  prompt: string;
  /** Sentence with the target masked (gapFill only). */
  sentence?: string;
  options?: string[];
  tokens?: string[];
  answer: string;
  /** Text that should be spoken/heard for audio buttons. */
  audioText: string;
  explanation: string;
}

export type StructureFn =
  | "opinion"
  | "hedging"
  | "comparing"
  | "exemplifying"
  | "concluding"
  | "cause"
  | "describing";

export const STRUCTURE_FN_LABEL: Record<StructureFn, { en: string; vi: string }> = {
  opinion: { en: "Giving an opinion", vi: "Nêu quan điểm" },
  hedging: { en: "Hedging / softening", vi: "Nói giảm, dè dặt" },
  comparing: { en: "Comparing or contrasting", vi: "So sánh, đối chiếu" },
  exemplifying: { en: "Giving an example or detail", vi: "Cho ví dụ, chi tiết" },
  concluding: { en: "Concluding or summarising", vi: "Kết luận, tóm lại" },
  cause: { en: "Explaining a cause or result", vi: "Giải thích nguyên nhân, kết quả" },
  describing: { en: "Describing a habit or fact", vi: "Miêu tả thói quen, sự việc" },
};

export type StructureDrillKind = "completeFrame" | "functionMatch" | "rebuild" | "applyIt";

export interface StructureDrill {
  id: string;
  kind: StructureDrillKind;
  structure: string;
  fn: StructureFn;
  prompt: string;
  /** Visible part of the frame (completeFrame). */
  head?: string;
  options?: string[];
  tokens?: string[];
  answer: string;
  /** Keywords that must appear when the learner applies the structure. */
  requiredWords?: string[];
  audioText: string;
  explanation: string;
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const hashSeed = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const shuffle = <T,>(arr: T[], rnd: () => number): T[] => {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const uniq = (list: string[]): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of list) {
    const key = item.toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
};

/** Core words of a phrase, used for masking and "did the learner use it" checks. */
export const phraseCoreWords = (phrase: string): string[] =>
  phrase
    .toLowerCase()
    .replace(/[^a-z' ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["your", "ones", "something", "someone", "with", "that", "this", "have", "been", "very", "into", "from", "would", "could"].includes(w));

const escapeRx = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Split model answers into clean sentences we can mine for example contexts. */
export const buildSentenceCorpus = (texts: string[]): string[] => {
  const out: string[] = [];
  for (const text of texts) {
    const clean = (text || "").replace(/\*\*/g, "");
    for (const raw of clean.split(/(?<=[.!?])\s+/)) {
      const s = raw.trim();
      if (s.length >= 40 && s.length <= 220) out.push(s);
    }
  }
  return out;
};

/** Find a sentence containing the phrase (or its core words) and mask the target. */
const findMaskedSentence = (phrase: string, corpus: string[]): string | null => {
  const core = phrase.replace(/^(to|a|an|the)\s+/i, "").trim();
  const direct = new RegExp(escapeRx(core), "i");
  for (const s of corpus) {
    if (direct.test(s)) return s.replace(direct, "______");
  }
  const words = phraseCoreWords(phrase);
  if (words.length >= 2) {
    const pair = new RegExp(`${escapeRx(words[0])}[a-z' ]{0,24}${escapeRx(words[1])}`, "i");
    for (const s of corpus) {
      if (pair.test(s)) return s.replace(pair, "______");
    }
  }
  return null;
};

const pickDistractors = (
  correct: string,
  pool: string[],
  rnd: () => number,
  count = 3,
): string[] => {
  const target = correct.toLowerCase().trim();
  const candidates = uniq(pool).filter((p) => p.toLowerCase().trim() !== target);
  return shuffle(candidates, rnd).slice(0, count);
};

/* ------------------------------------------------------------------ */
/* vocabulary drills                                                   */
/* ------------------------------------------------------------------ */

const VOCAB_ROTATION: VocabDrillKind[] = [
  "meaningEn2Vi",
  "gapFill",
  "listenChoose",
  "meaningVi2En",
  "orderWords",
  "sayIt",
];

export interface BuildVocabOptions {
  part: 1 | 2 | 3;
  topic: string;
  items: VocabEntry[];
  corpus: string[];
  size?: number;
  seed?: number;
  /** Phrases the learner already answered correctly twice - shown last. */
  mastered?: string[];
}

export const buildVocabRound = ({
  part,
  topic,
  items,
  corpus,
  size = 10,
  seed = 1,
  mastered = [],
}: BuildVocabOptions): VocabDrill[] => {
  const rnd = mulberry32(seed + hashSeed(`${part}:${topic}`));
  const masteredSet = new Set(mastered.map((m) => m.toLowerCase()));
  const usable = items.filter((i) => i.phrase && i.vietnamese);
  const fresh = usable.filter((i) => !masteredSet.has(i.phrase.toLowerCase()));
  const ordered = [...shuffle(fresh, rnd), ...shuffle(usable.filter((i) => masteredSet.has(i.phrase.toLowerCase())), rnd)];
  const chosen = ordered.slice(0, Math.max(1, Math.min(size, ordered.length)));

  const phrasePool = usable.map((i) => i.phrase);
  const glossPool = usable.map((i) => i.vietnamese);

  return chosen.map((entry, idx) => {
    let kind = VOCAB_ROTATION[idx % VOCAB_ROTATION.length];
    const words = entry.phrase.split(/\s+/).filter(Boolean);
    const masked = kind === "gapFill" ? findMaskedSentence(entry.phrase, corpus) : null;
    if (kind === "gapFill" && !masked) kind = "meaningEn2Vi";
    if (kind === "orderWords" && words.length < 3) kind = "meaningVi2En";

    const id = `v-${part}-${idx}-${hashSeed(entry.phrase).toString(36)}`;
    const base = {
      id,
      phrase: entry.phrase,
      vietnamese: entry.vietnamese,
      audioText: entry.phrase,
    };

    switch (kind) {
      case "meaningVi2En":
        return {
          ...base,
          kind,
          prompt: entry.vietnamese,
          options: shuffle(uniq([entry.phrase, ...pickDistractors(entry.phrase, phrasePool, rnd)]), rnd),
          answer: entry.phrase,
          explanation: `"${entry.phrase}" = ${entry.vietnamese}`,
        };
      case "gapFill":
        return {
          ...base,
          kind,
          prompt: entry.vietnamese,
          sentence: masked as string,
          options: shuffle(uniq([entry.phrase, ...pickDistractors(entry.phrase, phrasePool, rnd)]), rnd),
          answer: entry.phrase,
          explanation: `"${entry.phrase}" (${entry.vietnamese}) fits this context.`,
        };
      case "listenChoose":
        return {
          ...base,
          kind,
          prompt: "",
          options: shuffle(uniq([entry.phrase, ...pickDistractors(entry.phrase, phrasePool, rnd)]), rnd),
          answer: entry.phrase,
          explanation: `You heard "${entry.phrase}" - ${entry.vietnamese}`,
        };
      case "orderWords":
        return {
          ...base,
          kind,
          prompt: entry.vietnamese,
          tokens: shuffle(words, rnd),
          answer: entry.phrase,
          explanation: `Correct order: "${entry.phrase}" (${entry.vietnamese})`,
        };
      case "sayIt":
        return {
          ...base,
          kind,
          prompt: entry.phrase,
          answer: entry.phrase,
          explanation: `${entry.phrase} - ${entry.vietnamese}`,
        };
      default:
        return {
          ...base,
          kind: "meaningEn2Vi" as VocabDrillKind,
          prompt: entry.phrase,
          options: shuffle(uniq([entry.vietnamese, ...pickDistractors(entry.vietnamese, glossPool, rnd)]), rnd),
          answer: entry.vietnamese,
          explanation: `"${entry.phrase}" = ${entry.vietnamese}`,
        };
    }
  });
};

/* ------------------------------------------------------------------ */
/* structure drills                                                    */
/* ------------------------------------------------------------------ */

const FN_RULES: Array<{ fn: StructureFn; rx: RegExp }> = [
  { fn: "hedging", rx: /\b(to be (perfectly |quite |totally |completely )?honest|i must admit|i suppose|tend to|may well|it seems|to some extent|arguably|more or less|generally speaking|perhaps|i'd say (?:it|that)? ?probably)\b/i },
  { fn: "opinion", rx: /\b(i think|in my (view|opinion)|personally|i('| a)m convinced|i believe|i'd argue|i would say|i'd say|from my perspective|if you ask me|what i (enjoy|love|like) most)\b/i },
  { fn: "comparing", rx: /\b(compared (to|with)|whereas|while|unlike|on the other hand|in contrast|the difference|more .* than|less .* than)\b/i },
  { fn: "exemplifying", rx: /\b(for (example|instance)|such as|a good example|to give you an idea|take .* for example|like when)\b/i },
  { fn: "concluding", rx: /\b(all in all|overall|to sum up|in conclusion|at the end of the day|that('| i)s why|ultimately|looking back)\b/i },
  { fn: "cause", rx: /\b(because|due to|as a result|which means|leads to|the (main )?reason|this is why|thanks to|owing to)\b/i },
];

export const classifyStructure = (structure: string): StructureFn => {
  for (const rule of FN_RULES) if (rule.rx.test(structure)) return rule.fn;
  return "describing";
};

/** Split a frame into a visible head and the hidden continuation. */
const splitFrame = (structure: string): { head: string; tail: string } | null => {
  const clean = structure.replace(/\s+/g, " ").trim();
  const words = clean.split(" ");
  if (words.length < 6) return null;
  const cut = Math.max(3, Math.round(words.length * 0.55));
  return { head: words.slice(0, cut).join(" "), tail: words.slice(cut).join(" ") };
};

const STRUCTURE_ROTATION: StructureDrillKind[] = ["functionMatch", "completeFrame", "rebuild", "applyIt"];

export interface BuildStructureOptions {
  part: 1 | 2 | 3;
  topic: string;
  structures: string[];
  size?: number;
  seed?: number;
}

export const buildStructureRound = ({
  part,
  topic,
  structures,
  size = 8,
  seed = 1,
}: BuildStructureOptions): StructureDrill[] => {
  const rnd = mulberry32(seed + hashSeed(`s:${part}:${topic}`));
  const pool = uniq(structures).filter((s) => s.split(/\s+/).length >= 5);
  const chosen = shuffle(pool, rnd).slice(0, Math.max(1, Math.min(size, pool.length)));
  const fnLabels = Object.keys(STRUCTURE_FN_LABEL) as StructureFn[];

  return chosen.map((structure, idx) => {
    const fn = classifyStructure(structure);
    let kind = STRUCTURE_ROTATION[idx % STRUCTURE_ROTATION.length];
    const frame = splitFrame(structure);
    if (kind === "completeFrame" && !frame) kind = "functionMatch";

    const id = `s-${part}-${idx}-${hashSeed(structure).toString(36)}`;
    const base = { id, structure, fn, audioText: structure.replace(/\.\.\./g, "") };

    if (kind === "functionMatch") {
      const wrong = shuffle(fnLabels.filter((f) => f !== fn), rnd).slice(0, 3);
      return {
        ...base,
        kind,
        prompt: structure,
        options: shuffle([fn, ...wrong], rnd),
        answer: fn,
        explanation: structure,
      };
    }

    if (kind === "completeFrame") {
      const others = shuffle(pool.filter((s) => s !== structure), rnd)
        .map((s) => splitFrame(s)?.tail)
        .filter((tail): tail is string => Boolean(tail) && tail !== frame!.tail)
        .slice(0, 3);
      return {
        ...base,
        kind,
        prompt: structure,
        head: frame!.head,
        options: shuffle(uniq([frame!.tail, ...others]), rnd),
        answer: frame!.tail,
        explanation: structure,
      };
    }

    if (kind === "rebuild") {
      const chunks = structure.replace(/\s+/g, " ").trim().split(" ");
      const groupSize = chunks.length > 14 ? 3 : 2;
      const groups: string[] = [];
      for (let i = 0; i < chunks.length; i += groupSize) groups.push(chunks.slice(i, i + groupSize).join(" "));
      return {
        ...base,
        kind,
        prompt: STRUCTURE_FN_LABEL[fn].en,
        tokens: shuffle(groups, rnd),
        answer: groups.join(" | "),
        explanation: structure,
      };
    }

    return {
      ...base,
      kind: "applyIt" as StructureDrillKind,
      prompt: structure,
      answer: structure,
      requiredWords: phraseCoreWords(structure.replace(/\.\.\.$/, "")).slice(0, 3),
      explanation: structure,
    };
  });
};

/** Did the learner's sentence actually use the structure? */
export const usedStructure = (attempt: string, required: string[]): boolean => {
  if (!required.length) return attempt.trim().split(/\s+/).length >= 8;
  const lower = attempt.toLowerCase();
  const hits = required.filter((w) => lower.includes(w)).length;
  return hits >= Math.max(1, Math.ceil(required.length * 0.6));
};
