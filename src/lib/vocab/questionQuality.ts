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
