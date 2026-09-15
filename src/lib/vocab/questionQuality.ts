// Shared helpers that keep generated vocabulary questions genuinely challenging.
// Used by the IELTS vocabulary practice generator (and reusable by the HSK /
// Finnish / Swedish / Vietnamese vocabulary pages).

export const shuffleArr = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Replace every form of `word` (and simple inflections) with a blank. */
export const maskWord = (text: string, word: string, blank = "_____"): string => {
  if (!text || !word) return text;
  // JavaScript's \b and \w boundaries are ASCII-only. Use a literal replacement
  // for scripts such as Hanzi and Kana so the answer is never left visible.
  if (/[^\x00-\x7F]/u.test(word)) {
    return text.split(word).join(blank);
  }
  const stem = word.length > 5 ? word.slice(0, Math.max(4, word.length - 2)) : word;
  const re = new RegExp(`\\b${escapeRe(stem)}\\w*\\b`, "gi");
  const out = text.replace(re, blank);
  return out;
};

export interface DistractorOpts<T> {
  getText: (x: T) => string | undefined;
  getPos?: (x: T) => string | undefined;
  getTopic?: (x: T) => string | undefined;
  getLevel?: (x: T) => string | undefined;
}

/**
 * Pick `count` distractors that look plausible next to the target: same part of
 * speech first, then same topic, then similar level, then similar text length.
 * Falls back to random items so a question is always produced.
 */
export function pickSmartDistractors<T>(
  pool: T[],
  target: T,
  count: number,
  opts: DistractorOpts<T>,
): T[] {
  const { getText, getPos, getTopic, getLevel } = opts;
  const targetText = (getText(target) || "").trim();
  const targetLen = targetText.length;
  const tPos = getPos?.(target);
  const tTopic = getTopic?.(target);
  const tLevel = getLevel?.(target);

  const candidates = pool.filter(x => {
    if (x === target) return false;
    const txt = (getText(x) || "").trim();
    return txt.length > 0 && txt.toLowerCase() !== targetText.toLowerCase();
  });

  const scored = candidates.map(x => {
    let score = 0;
    if (tPos && getPos?.(x) === tPos) score += 6;
    if (tTopic && getTopic?.(x) === tTopic) score += 4;
    if (tLevel && getLevel?.(x) === tLevel) score += 2;
    const len = (getText(x) || "").length;
    const diff = Math.abs(len - targetLen) / Math.max(targetLen, 1);
    score += Math.max(0, 3 - diff * 4);
    return { x, score: score + Math.random() * 0.9 };
  });

  scored.sort((a, b) => b.score - a.score);

  const out: T[] = [];
  const seen = new Set<string>([targetText.toLowerCase()]);
  for (const s of scored) {
    const txt = (getText(s.x) || "").trim().toLowerCase();
    if (seen.has(txt)) continue;
    seen.add(txt);
    out.push(s.x);
    if (out.length >= count) break;
  }
  return out;
}

/** Rough syllable count used to keep IPA distractors comparable. */
export const syllableCount = (word: string): number => {
  const m = word.toLowerCase().replace(/[^a-z]/g, "").match(/[aeiouy]+/g);
  return m ? Math.max(1, m.length) : 1;
};

export const ipaSyllables = (ipa: string): number => {
  const m = ipa.replace(/[/ˈˌ]/g, "").match(/[aeiouɪʊɛæɑɒɔəʌiuɜ]+/gi);
  return m ? Math.max(1, m.length) : 1;
};

export interface QualityCheckInput {
  options: string[];
  correct: number;
}

/**
 * Reject a question when the correct option can be spotted without knowing the
 * word: duplicated options, the only option containing a blank, or an extreme
 * length outlier.
 */
export function isQuestionFair({ options, correct }: QualityCheckInput): boolean {
  if (!options || options.length < 2) return false;
  if (correct < 0 || correct >= options.length) return false;

  const norm = options.map(o => (o || "").trim().toLowerCase());
  if (norm.some(o => o.length === 0)) return false;
  if (new Set(norm).size !== norm.length) return false;

  // Blank tell: only the answer (or only the wrong ones) carries a gap marker.
  const withBlank = norm.filter(o => o.includes("___")).length;
  if (withBlank > 0 && withBlank < norm.length) return false;

  // Length outlier: correct option far longer/shorter than every distractor.
  const lens = norm.map(o => o.length);
  const correctLen = lens[correct];
  const others = lens.filter((_, i) => i !== correct);
  const maxOther = Math.max(...others);
  const minOther = Math.min(...others);
  if (correctLen > maxOther * 2.2) return false;
  if (correctLen * 2.2 < minOther) return false;

  return true;
}

/** Keyword-overlap grading for free typed definitions. */
export function gradeWrittenDefinition(answer: string, reference: string): { ok: boolean; matched: string[]; keywords: string[] } {
  const STOP = new Set(["the", "a", "an", "of", "to", "in", "or", "and", "that", "is", "for", "with", "on", "by", "as", "be", "it", "something", "someone"]);
  const keywords = reference
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP.has(w))
    .slice(0, 8);
  const typed = answer.toLowerCase();
  const matched = keywords.filter(k => typed.includes(k.slice(0, Math.max(4, k.length - 2))));
  const need = Math.max(1, Math.ceil(keywords.length * 0.34));
  return { ok: keywords.length > 0 && matched.length >= need, matched, keywords };
}

/* ────────────────────────────────────────────────────────────────────────────
 * Subject-agnostic multiple-choice builder
 * Used by every vocabulary Practice tab (English/IELTS, Vietnamese, HSK,
 * Japanese, Finnish, Swedish) so all subjects share one fairness standard.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Lowercase, strip accents/punctuation so "Ăn" and "an!" compare equal. */
export const normForCompare = (s: string): string =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Mask every surface form of the answer inside a prompt sentence, including
 * accented and inflected variants, so the answer can never be read off the
 * prompt. Pass extra forms (plural, conjugated, hanzi + pinyin, ...) too.
 */
/**
 * Finnish consonant-gradation stems: `pöytä -> pöyd`, `matto -> mat`,
 * `lukko -> luk`, `mökki -> mök`, `vesi -> vete/vede`. Used so an inflected
 * form inside an example sentence is still recognised as the answer.
 */
export const gradationStems = (word: string): string[] => {
  const w = word.toLowerCase();
  const out = new Set<string>();
  const add = (s: string) => { if (s.length >= 3) out.add(s); };

  // -si nouns keep a -te-/-de- stem (vesi -> vettä, uusi -> uutta)
  if (/si$/.test(w)) { add(`${w.slice(0, -2)}te`); add(`${w.slice(0, -2)}de`); add(w.slice(0, -2)); }
  // -nen nouns (nainen -> naise)
  if (/nen$/.test(w)) add(`${w.slice(0, -3)}se`);

  const trimmed = /[aeiouyäö]$/.test(w) ? w.slice(0, -1) : w;
  const bases = [trimmed, w];
  const rules: [RegExp, string][] = [
    [/kk$/, "k"], [/pp$/, "p"], [/tt$/, "t"],
    [/nk$/, "ng"], [/mp$/, "mm"], [/lt$/, "ll"], [/nt$/, "nn"], [/rt$/, "rr"],
    [/t$/, "d"], [/p$/, "v"], [/k$/, ""],
  ];
  for (const base of bases) {
    add(base);
    for (const [re, to] of rules) {
      if (re.test(base)) add(base.replace(re, to));
    }
  }
  return [...out];
};

export interface MaskOpts {
  /** Apply Finnish consonant-gradation stems when matching inflected forms. */
  gradation?: boolean;
}

/**
 * Mask every surface form of the answer inside a prompt sentence, including
 * accented and inflected variants, so the answer can never be read off the
 * prompt. Pass extra forms (plural, conjugated, hanzi + pinyin, ...) too.
 */
export const maskAnswerForms = (
  text: string,
  forms: (string | undefined)[],
  blank = "_____",
  opts: MaskOpts = {},
): string => {
  let out = text || "";
  const uniq = Array.from(
    new Set(forms.filter((f): f is string => !!f && f.trim().length > 1)),
  ).sort((a, b) => b.length - a.length);

  for (const form of uniq) {
    // 1. literal (accent-sensitive) match
    out = out.replace(new RegExp(escapeRe(form), "gi"), blank);
    // 2. stem match for inflected languages (Finnish cases, verb endings)
    if (form.length > 4) {
      const stem = form.slice(0, Math.max(4, form.length - 2));
      out = out.replace(new RegExp(`\\p{L}*${escapeRe(stem)}\\p{L}*`, "giu"), blank);
    }
    // 2b. consonant gradation (Finnish): pöytä -> pöydällä, matto -> maton
    if (opts.gradation) {
      for (const stem of gradationStems(form)) {
        out = out.replace(new RegExp(`\\b${escapeRe(stem)}\\p{L}*`, "giu"), blank);
      }
    }
    // 3. accent-insensitive pass: rebuild word by word
    const target = normForCompare(form);
    if (target.length > 1) {
      out = out
        .split(/(\s+)/)
        .map(tok => (normForCompare(tok) === target ? blank : tok))
        .join("");
    }
  }
  // swallow leftover inflection endings glued to a blank ("______ni" -> "______")
  out = out.replace(new RegExp(`${escapeRe(blank)}\\p{L}+`, "gu"), blank);
  // collapse "_____ _____" runs created by multi-form masking
  return out.replace(new RegExp(`(?:${escapeRe(blank)}[\\s]*){2,}`, "g"), `${blank} `).trim();
};

export interface McqSpec<T> {
  /** The item being tested. */
  target: T;
  /** Everything available as a source of wrong answers. */
  pool: T[];
  /** Text of the correct option. */
  answer: string;
  /** Option text for a pool item (return undefined to skip the item). */
  optionOf: (x: T) => string | undefined;
  /**
   * Other strings that mean the same thing as an item's option. Any pool item
   * whose alias collides with the answer is dropped, which is what stops two
   * different words with an identical gloss from both appearing.
   */
  aliasesOf?: (x: T) => (string | undefined)[];
  /** Aliases of the answer itself (synonyms, alternate glosses). */
  answerAliases?: (string | undefined)[];
  /** Similarity signals so distractors look plausible. */
  posOf?: (x: T) => string | undefined;
  topicOf?: (x: T) => string | undefined;
  levelOf?: (x: T) => string | undefined;
  /** How many options in total (default 4). */
  optionCount?: number;
  /** Extra ready-made distractor strings (synonym/collocation banks). */
  extraDistractors?: (string | undefined)[];
}

export interface McqResult {
  options: string[];
  correct: number;
}

/**
 * Build a fair MCQ or return null. Returning null is intentional: a caller
 * should skip the item rather than render an ambiguous question.
 */
export function buildMcq<T>(spec: McqSpec<T>): McqResult | null {
  const {
    target, pool, answer, optionOf, aliasesOf, answerAliases = [],
    posOf, topicOf, levelOf, optionCount = 4, extraDistractors = [],
  } = spec;

  const answerText = (answer || "").trim();
  if (!answerText) return null;

  // Everything that must never appear as a wrong answer.
  const banned = new Set<string>([normForCompare(answerText)]);
  for (const a of answerAliases) if (a) banned.add(normForCompare(a));

  const isBanned = (txt: string) => {
    const n = normForCompare(txt);
    if (!n || banned.has(n)) return true;
    // substring collision either way: "study" vs "to study"
    for (const b of banned) {
      if (b.length > 2 && (n === b || n.includes(b) || b.includes(n))) return true;
    }
    return false;
  };

  const chosen: string[] = [];
  const seen = new Set<string>([normForCompare(answerText)]);

  const push = (raw?: string) => {
    if (!raw) return;
    const txt = raw.trim();
    if (!txt || chosen.length >= optionCount - 1) return;
    const n = normForCompare(txt);
    if (!n || seen.has(n) || isBanned(txt)) return;
    seen.add(n);
    chosen.push(txt);
  };

  // 1. explicit extras (synonym / collocation banks) come first
  for (const e of shuffleArr(extraDistractors)) push(e || undefined);

  // 2. smart distractors from the pool, dropping alias collisions
  if (chosen.length < optionCount - 1) {
    const safePool = pool.filter(x => {
      if (x === target) return false;
      const txt = optionOf(x);
      if (!txt || isBanned(txt)) return false;
      const aliases = aliasesOf?.(x) ?? [];
      return !aliases.some(a => a && isBanned(a));
    });
    const picked = pickSmartDistractors(safePool, target, (optionCount - 1) * 3, {
      getText: optionOf,
      getPos: posOf,
      getTopic: topicOf,
      getLevel: levelOf,
    });
    for (const p of picked) push(optionOf(p));
  }

  if (chosen.length < optionCount - 1) return null;

  const options = shuffleArr([answerText, ...chosen]);
  const correct = options.indexOf(answerText);
  if (correct < 0) return null;
  if (!isQuestionFair({ options, correct })) return null;
  return { options, correct };
}

export interface McqIssue {
  code: "too-few" | "duplicate" | "answer-in-prompt" | "bad-index" | "empty-option";
  detail: string;
}

/** Static fairness audit used by scripts/audit_vocab_practice.ts. */
export function validateMcq(input: {
  prompt?: string;
  options: string[];
  correct: number;
  answerForms?: (string | undefined)[];
}): McqIssue[] {
  const issues: McqIssue[] = [];
  const { prompt = "", options, correct, answerForms = [] } = input;

  if (!options || options.length < 4) {
    issues.push({ code: "too-few", detail: `${options?.length ?? 0} options` });
  }
  if (correct < 0 || correct >= (options?.length ?? 0)) {
    issues.push({ code: "bad-index", detail: `correct=${correct}` });
    return issues;
  }
  const norm = (options || []).map(normForCompare);
  if (norm.some(o => !o)) issues.push({ code: "empty-option", detail: "blank option text" });
  if (new Set(norm).size !== norm.length) {
    issues.push({ code: "duplicate", detail: options.join(" | ") });
  }

  const answerText = options[correct];
  const forms = [answerText, ...answerForms].filter((f): f is string => !!f && f.length > 1);
  const promptNorm = ` ${normForCompare(prompt)} `;
  for (const f of forms) {
    const fn = normForCompare(f);
    if (fn.length > 2 && promptNorm.includes(` ${fn} `)) {
      issues.push({ code: "answer-in-prompt", detail: `"${f}" visible in prompt` });
      break;
    }
  }
  return issues;
}
