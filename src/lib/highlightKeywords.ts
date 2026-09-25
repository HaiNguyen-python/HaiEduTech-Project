/**
 * @file highlightKeywords.ts
 * @description Marks up dialogue lines so learners can see what to study:
 *   lesson vocabulary is underlined, and high value functional chunks
 *   (see dialogueKeyPhrases.ts) are printed in bold.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import React from "react";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const WORD = String.raw`[\p{L}\p{N}'’-]+`;
const IRREGULAR_VERBS: Record<string, string[]> = {
  be: ["am", "is", "are", "was", "were", "been", "being"],
  bear: ["bears", "bore", "borne", "bearing"],
  break: ["breaks", "broke", "broken", "breaking"],
  bring: ["brings", "brought", "bringing"],
  build: ["builds", "built", "building"],
  fall: ["falls", "fell", "fallen", "falling"],
  get: ["gets", "got", "gotten", "getting"],
  go: ["goes", "went", "gone", "going"],
  have: ["has", "had", "having"],
  keep: ["keeps", "kept", "keeping"],
  lead: ["leads", "led", "leading"],
  meet: ["meets", "met", "meeting"],
  put: ["puts", "putting"],
  reach: ["reaches", "reached", "reaching"],
  rise: ["rises", "rose", "risen", "rising"],
  speak: ["speaks", "spoke", "spoken", "speaking"],
  take: ["takes", "took", "taken", "taking"],
  write: ["writes", "wrote", "written", "writing"],
};

const PHRASE_ALIASES: Record<string, string[]> = {
  "take away": ["takeaway", "takeaways"],
};

const regularVerbForms = (word: string): string[] => {
  const forms = [word, `${word}s`];
  if (/e$/i.test(word)) forms.push(`${word}d`, `${word.slice(0, -1)}ing`);
  else if (/[^aeiou]y$/i.test(word)) forms.push(`${word.slice(0, -1)}ies`, `${word.slice(0, -1)}ied`, `${word}ing`);
  else forms.push(`${word}s`, `${word}ed`, `${word}ing`);
  if (/(?:s|x|z|ch|sh)$/i.test(word)) forms.push(`${word}es`);
  if (/^[a-z]*[aeiou][^aeiouwxy]$/i.test(word)) forms.push(`${word}${word.at(-1)}ed`, `${word}${word.at(-1)}ing`);
  return forms;
};

const verbSource = (word: string) => {
  const forms = [...regularVerbForms(word), ...(IRREGULAR_VERBS[word.toLowerCase()] ?? [])];
  return `(?:${Array.from(new Set(forms)).sort((a, b) => b.length - a.length).map(escape).join("|")})`;
};

const IRREGULAR_FORM_TO_BASE: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [base, forms] of Object.entries(IRREGULAR_VERBS)) {
    for (const form of forms) {
      const key = form.toLowerCase();
      if (!(key in map)) map[key] = base;
    }
  }
  return map;
})();

/** Verb entries may appear in any natural form ("takes" written as "take"),
 * so collect every plausible base plus its inflections before matching. */
const verbBases = (word: string): string[] => {
  const bases = new Set<string>([word]);
  const irregular = IRREGULAR_FORM_TO_BASE[word.toLowerCase()];
  if (irregular) bases.add(irregular);
  if (/ies$/i.test(word)) bases.add(word.replace(/ies$/i, "y"));
  if (/s$/i.test(word)) bases.add(word.slice(0, -1));
  return Array.from(bases);
};

const verbSourceFor = (word: string): string => {
  const sources = verbBases(word).map(verbSource);
  return sources.length === 1 ? sources[0] : `(?:${Array.from(new Set(sources)).join("|")})`;
};

const DETERMINER = String.raw`(?:a|an|the|this|that|my|your|our|their)`;
const SLOT = String.raw`(?:[^\s,.!?;]+(?:\s+[^\s,.!?;]+){0,5})`;
const REFLEXIVE = String.raw`(?:oneself|myself|yourself|himself|herself|itself|ourselves|themselves)`;
const POSSESSIVE = String.raw`(?:one['’]s|my|your|his|her|its|our|their)`;
const isReplaceable = (token: string) => /^(?:someone|somebody|something)(?:['’]s)?$/i.test(token);

/** Relaxed separator: up to three inserted words between phrase tokens
 * ("cut carbon footprints" -> "cut household carbon footprints"). */
const GAP = String.raw`(?:\s+[\p{L}\p{N}'’-]+){0,3}\s+`;
const slotSep = String.raw`(?:\s+|\s*[,;:]\s*)`;
const wordSep = String.raw`\s+`;

type PhraseSources = { exact: string[]; relaxed: string[] };

/** Build natural-language matchers from dictionary-style entries such as
 * "to chair a meeting", "Would ... suit you?" or "by end of day (EOD)".
 * Relaxed variants tolerate inserted words and unlisted verb forms and are
 * consumed only through findKeyPhraseRanges(..., { flexible: true }). */
const buildPhraseSources = (phrase: string): PhraseSources => {
  const exact: string[] = [];
  const relaxed: string[] = [];
  const trimmed = phrase.trim();
  if (!trimmed) return { exact, relaxed };
  exact.push(escape(trimmed.replace(/[?.!]$/u, "")));
  exact.push(...(PHRASE_ALIASES[trimmed.toLowerCase()] ?? []).map(escape));
  const parentheticals = Array.from(trimmed.matchAll(/\(([^)]+)\)/g), (match) => match[1]?.trim()).filter(Boolean) as string[];
  exact.push(...parentheticals.map(escape));

  let template = trimmed
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*\+\s*V(?:-ing|ing|ed)?\b/gi, "")
    .replace(/[?.!]$/u, "")
    .trim();
  const leadingInfinitive = /^to\s+/i.test(template);
  if (leadingInfinitive) template = template.replace(/^to\s+/i, "");

  const tokens = template.match(/\.\.\.|[\p{L}\p{N}'’-]+/gu) ?? [];
  let firstLexical = true;
  const parts = tokens.map((token) => {
    const lower = token.toLowerCase();
    if (token === "..." || isReplaceable(token) || token === "A" || token === "B") return "__SLOT__";
    if (lower === "oneself") return REFLEXIVE;
    if (lower === "one's" || lower === "one’s") return POSSESSIVE;
    if (["a", "an", "the"].includes(lower)) return DETERMINER;
    if (leadingInfinitive && firstLexical) {
      firstLexical = false;
      return verbSourceFor(token);
    }
    firstLexical = false;
    return escape(token);
  });
  const strictSep = (part: string, previous: string) => (part === "__SLOT__" || previous === "__SLOT__" ? slotSep : wordSep);
  const join = (head: string, rest: string[], separator: (part: string, previous: string) => string) =>
    rest.reduce((result, part, index) => {
      const previous = index === 0 ? head : rest[index - 1];
      return `${result}${separator(part, previous)}${part}`;
    }, head).replace(/__SLOT__/g, SLOT);

  if (parts.length) {
    exact.push(join(parts[0], parts.slice(1), strictSep));
  }
  if (!leadingInfinitive && tokens[0]) {
    exact.push(join(verbSourceFor(tokens[0]), parts.slice(1), strictSep));
  }
  if (tokens.length === 1 && tokens[0]) exact.push(verbSourceFor(tokens[0]));
  if (/^to\s+be\s+/i.test(trimmed)) {
    const complement = tokens.slice(1).map((token) => ["a", "an", "the"].includes(token.toLowerCase()) ? DETERMINER : escape(token));
    exact.push(complement.join(wordSep));
  }

  // A safe fallback for dictionary infinitives whose example replaces the
  // object ("to park an issue" -> "park pricing"). It highlights the lexical
  // verb or phrasal verb rather than silently leaving the example unmarked.
  if (leadingInfinitive && tokens[0]) {
    const particles = new Set(["about", "across", "along", "around", "at", "away", "back", "down", "for", "forward", "in", "into", "off", "on", "out", "over", "through", "to", "up", "with"]);
    const core = [verbSourceFor(tokens[0])];
    for (const token of tokens.slice(1)) {
      if (!particles.has(token.toLowerCase())) break;
      core.push(String.raw`(?:\s+${WORD}){0,3}\s+${escape(token)}`);
    }
    exact.push(core.join(""));
  }

  if (parts.length > 1) {
    const gapped = (head: string, rest: string[]) => join(head, rest, (part, previous) => (part === "__SLOT__" || previous === "__SLOT__" ? slotSep : GAP));
    relaxed.push(gapped(parts[0], parts.slice(1)));
    if (!leadingInfinitive && tokens[0]) relaxed.push(gapped(verbSourceFor(tokens[0]), parts.slice(1)));
    if (parts.length > 2) relaxed.push(gapped(parts[1], parts.slice(2)));
  }

  return { exact, relaxed };
};

export const keyPhraseSources = (phrase: string): string[] =>
  buildPhraseSources(phrase).exact.filter(Boolean);

/** Relaxed variants used only in flexible highlighting mode. */
export const keyPhraseRelaxedSources = (phrase: string): string[] =>
  buildPhraseSources(phrase).relaxed.filter(Boolean);

export interface KeywordRange {
  start: number;
  end: number;
  kind: "phrase" | "vocab";
}

export interface FindKeyPhraseOptions {
  /** Tolerate inserted words and unlisted verb forms (Writing Practice examples). */
  flexible?: boolean;
}

export const findKeyPhraseRanges = (
  text: string,
  phrases: string[],
  opts: FindKeyPhraseOptions = {},
): KeywordRange[] => {
  const candidates: KeywordRange[] = [];
  const collect = (source: string, blockers: KeywordRange[]) => {
    if (!source) return;
    const matcher = new RegExp(`(?<![\\p{L}\\p{N}])(${source})(?![\\p{L}\\p{N}])`, "giu");
    let match: RegExpExecArray | null;
    while ((match = matcher.exec(text)) !== null) {
      const candidate: KeywordRange = { start: match.index, end: match.index + match[0].length, kind: "phrase" };
      if (!blockers.some((kept) => candidate.start < kept.end && candidate.end > kept.start)) {
        candidates.push(candidate);
      }
      if (!match[0].length) matcher.lastIndex += 1;
    }
  };
  for (const phrase of clean(phrases)) {
    for (const source of keyPhraseSources(phrase)) collect(source, []);
    if (opts.flexible) {
      for (const source of keyPhraseRelaxedSources(phrase)) collect(source, candidates);
    }
    // Do not fall back to an arbitrary word from a missing phrase. That would
    // mark low-value fragments such as "I", "to", "of" or "your".
  }
  return candidates
    .sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start))
    .filter((candidate, index, all) => !all.slice(0, index).some((kept) => candidate.start < kept.end && candidate.end > kept.start));
};

const clean = (terms: string[]): string[] =>
  Array.from(new Set(terms.map((t) => t.trim()).filter((t) => t.length >= 2))).sort(
    (a, b) => b.length - a.length,
  );

/**
 * @param text dialogue line
 * @param terms lesson vocabulary terms (underlined)
 * @param keyPhrases functional chunks worth memorising (bold)
 */
export function highlightKeywords(
  text: string,
  terms: string[],
  keyPhrases: string[] = [],
): React.ReactNode {
  if (!text) return text;
  const vocab = clean(terms || []);
  const phrases = clean(keyPhrases || []);
  if (!vocab.length && !phrases.length) return text;

  // Vocabulary is matched with light inflection support (plurals, -ed, -ing),
  // so "campaign" also highlights "campaigns" and "analyse" -> "analysing".
  const vocabSource = (term: string) => {
    const base = escape(term);
    if (/\s/.test(term)) return base;
    const stem = term.length > 3 && /e$/i.test(term) ? escape(term.slice(0, -1)) : null;
    const forms = [`${base}(?:s|es|ed|ing|d|er|ers|ly)?`];
    if (stem) forms.push(`${stem}(?:ing|ed|es)`);
    if (/y$/i.test(term) && term.length > 3) forms.push(`${escape(term.slice(0, -1))}ies`);
    return `(?:${forms.join("|")})`;
  };
  const ranges = findKeyPhraseRanges(text, phrases);
  if (vocab.length) {
    const pattern = new RegExp(`(?<![\\p{L}])(${vocab.map(vocabSource).join("|")})(?![\\p{L}])`, "giu");
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const candidate: KeywordRange = { start: match.index, end: match.index + match[0].length, kind: "vocab" };
      if (!ranges.some((range) => candidate.start < range.end && candidate.end > range.start)) ranges.push(candidate);
    }
  }
  ranges.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  for (const range of ranges) {
    if (range.start < lastIndex) continue;
    if (range.start > lastIndex) parts.push(text.slice(lastIndex, range.start));
    const hit = text.slice(range.start, range.end);
    parts.push(
      React.createElement(
        "span",
        {
          key: key++,
          className: range.kind === "phrase"
            ? "font-bold rounded px-0.5 bg-primary/15 text-inherit"
            : "underline decoration-2 decoration-amber-300 underline-offset-4 font-semibold",
        },
        hit,
      ),
    );
    lastIndex = range.end;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
