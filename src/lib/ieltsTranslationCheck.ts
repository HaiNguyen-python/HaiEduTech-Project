/**
 * @file ieltsTranslationCheck.ts
 * @description Structure matching for IELTS Translation Practice.
 * Hint keywords in the translation bank are teaching labels, not literal text:
 * some are patterns ("between ... and", "from ... to") and some are pure grammar
 * labels ("passive", "before + V-ing"). This helper decides which hints can be
 * checked against a learner sentence and matches them tolerantly (inflections,
 * gaps, punctuation) so a correct paraphrase is never punished.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface StructureCheck {
  /** Original hint as written in the bank (shown to the learner). */
  hint: string;
  /** True when the hint can be verified inside a learner sentence. */
  checkable: boolean;
  /** Regex used when checkable. */
  re?: RegExp;
}

/** Grammar-label hints that describe a form rather than words to reuse. */
const META_HINT = /(^|\s)(passive|active voice|inversion|relative clause|participle|gerund|conditional)(\s|$)/i;
/** Hints containing a slot marker such as "+ V-ing" or "such + adj + noun". */
const SLOT_HINT = /\+\s*(v-?ing|v[0-9]?|verb|adj|adjective|noun|n\b|clause|s\b|inf)/i;

/** Irregular verb families used in Writing Task 1 / Task 2 sentences. */
const IRREGULAR: string[][] = [
  ["rise", "rises", "rising", "rose", "risen"],
  ["fall", "falls", "falling", "fell", "fallen"],
  ["grow", "grows", "growing", "grew", "grown"],
  ["begin", "begins", "beginning", "began", "begun"],
  ["become", "becomes", "becoming", "became"],
  ["go", "goes", "going", "went", "gone"],
  ["see", "sees", "seeing", "saw", "seen"],
  ["take", "takes", "taking", "took", "taken"],
  ["make", "makes", "making", "made"],
  ["give", "gives", "giving", "gave", "given"],
  ["lead", "leads", "leading", "led"],
  ["spend", "spends", "spending", "spent"],
  ["hold", "holds", "holding", "held"],
  ["keep", "keeps", "keeping", "kept"],
  ["build", "builds", "building", "built"],
  ["be", "is", "are", "was", "were", "been", "being", "am"],
  ["have", "has", "having", "had"],
  ["do", "does", "doing", "did", "done"],
  ["bring", "brings", "bringing", "brought"],
  ["find", "finds", "finding", "found"],
  ["lose", "loses", "losing", "lost"],
  ["put", "puts", "putting"],
  ["send", "sends", "sending", "sent"],
  ["overtake", "overtakes", "overtaking", "overtook", "overtaken"],
  ["outnumber", "outnumbers", "outnumbering", "outnumbered"],
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Placeholder tokens in hints such as "encourage somebody to". */
const PLACEHOLDER = /^(somebody|someone|sb|something|sth|oneself|x|y)$/;

/** Strip punctuation so commas and quotes never block a match. */
export const normaliseForMatch = (s: string) =>
  s.toLowerCase().replace(/[\u2019]/g, "'").replace(/[^a-z0-9%\s'-]/g, " ").replace(/\s+/g, " ").trim();

/** Regex fragment matching a single hint word plus its usual inflections. */
function wordPattern(word: string): string {
  const w = word.toLowerCase();
  if (w === "a" || w === "an" || w === "the") return "(?:a|an|the)";
  const family = IRREGULAR.find((f) => f.includes(w));
  if (family) return `(?:${family.map(escapeRe).join("|")})`;
  if (/^\d/.test(w) || w.length <= 2) return escapeRe(w);
  // Reduce to a stem, then allow the common English endings.
  // "difficulties" -> "difficult(?:y|ies|ied)"; "rises" -> "ris[a-z]{0,4}".
  if (/ies$/.test(w)) {
    const base = w.slice(0, -3);
    if (base.length >= 3) return `${escapeRe(base)}(?:y|ies|ied|ying)`;
  }
  let stem = w;
  if (/(ing|ed|es|s)$/.test(stem)) stem = stem.replace(/(ing|ed|es|s)$/, "");
  if (stem.length < 3) stem = w;
  return `${escapeRe(stem)}[a-z]{0,4}`;
}

/** Build a tolerant regex for one literal hint fragment (no "..." gaps). */
function fragmentPattern(fragment: string): string {
  const words = fragment
    .toLowerCase()
    .replace(/[^a-z0-9%\s'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "";
  // Allow a few filler words (articles, adverbs, an inserted noun phrase)
  // between the hint words so real IELTS sentences still match.
  return words
    .map((w) => (PLACEHOLDER.test(w) ? "[a-z'-]+" : wordPattern(w)))
    .join("(?:\\s+[a-z0-9%'-]+){0,4}\\s+");
}

/** Turn one bank hint into a check descriptor. */
export function buildCheck(hint: string): StructureCheck {
  const trimmed = hint.trim();
  if (!trimmed) return { hint, checkable: false };
  if (META_HINT.test(trimmed) || SLOT_HINT.test(trimmed)) return { hint, checkable: false };

  // "A ... B" / "A … B" -> A anywhere before B.
  const parts = trimmed.split(/\s*(?:\.\.\.|…)\s*/).filter((p) => p.trim().length > 0);
  const fragments = parts.map(fragmentPattern).filter(Boolean);
  if (!fragments.length) return { hint, checkable: false };
  const source = fragments.join("[\\s\\S]{0,60}?");
  try {
    return { hint, checkable: true, re: new RegExp(source, "i") };
  } catch {
    return { hint, checkable: false };
  }
}

export function buildChecks(hints: string[]): StructureCheck[] {
  return hints.map(buildCheck);
}

/** Structures that can actually be verified in a learner sentence. */
export function checkableHints(hints: string[], model?: string): string[] {
  return buildChecks(hints)
    .filter((c) => c.checkable && c.re && (!model || c.re.test(normaliseForMatch(model))))
    .map((c) => c.hint);
}

/** True when a hint appears in the model sentence or in one of the alternatives. */
export function hintIsGrounded(hint: string, model: string, alts: string[]): boolean {
  const c = buildCheck(hint);
  if (!c.checkable || !c.re) return true;
  return [model, ...alts].some((s) => c.re!.test(normaliseForMatch(s)));
}

export interface StructureMatchResult {
  used: string[];
  missing: string[];
  /** Hints shown for teaching only, never scored. */
  informational: string[];
  /** 0-1 coverage of the checkable hints (1 when none are checkable). */
  coverage: number;
}

/**
 * Match a learner answer against the hints of a translation item.
 * When the model sentence is supplied, only hints that the model itself uses are
 * scored: several banks list a hint that belongs to an alternative version, and
 * a learner following the model must not lose marks for it.
 */
export function matchStructures(hints: string[], answer: string, model?: string): StructureMatchResult {
  const text = normaliseForMatch(answer);
  const checks = buildChecks(hints);
  const used: string[] = [];
  const missing: string[] = [];
  const informational: string[] = [];
  for (const c of checks) {
    const scored = c.checkable && c.re && (!model || c.re.test(normaliseForMatch(model)));
    if (!scored || !c.re) {
      if (c.re && c.re.test(text)) used.push(c.hint);
      else informational.push(c.hint);
      continue;
    }
    if (c.re.test(text)) used.push(c.hint);
    else missing.push(c.hint);
  }
  const total = used.length + missing.length;
  return { used, missing, informational, coverage: total ? used.length / total : 1 };
}

/** True when the model sentence itself satisfies a hint (used by the audit). */
export function modelSatisfies(hint: string, model: string): boolean {
  const c = buildCheck(hint);
  if (!c.checkable || !c.re) return true;
  return c.re.test(normaliseForMatch(model));
}
