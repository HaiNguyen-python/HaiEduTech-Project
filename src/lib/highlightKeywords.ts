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

const DETERMINER = String.raw`(?:a|an|the|this|that|my|your|our|their)`;
const SLOT = String.raw`(?:[^\s,.!?;]+(?:\s+[^\s,.!?;]+){0,5})`;
const REPLACEABLE = new Set(["someone", "somebody", "something"]);

/** Build natural-language matchers from dictionary-style entries such as
 * "to chair a meeting", "Would ... suit you?" or "by end of day (EOD)". */
export const keyPhraseSources = (phrase: string): string[] => {
  const trimmed = phrase.trim();
  if (!trimmed) return [];
  const sources = [escape(trimmed.replace(/[?.!]$/u, ""))];
  const parentheticals = Array.from(trimmed.matchAll(/\(([^)]+)\)/g), (match) => match[1]?.trim()).filter(Boolean) as string[];
  sources.push(...parentheticals.map(escape));

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
    if (token === "..." || REPLACEABLE.has(lower) || token === "A" || token === "B") return "__SLOT__";
    if (["a", "an", "the"].includes(lower)) return DETERMINER;
    if (leadingInfinitive && firstLexical) {
      firstLexical = false;
      return verbSource(token);
    }
    firstLexical = false;
    return escape(token);
  });
  if (parts.length) {
    const source = parts
      .join(String.raw`\s+`)
      .replace(/__SLOT__/g, SLOT);
    sources.push(source);
  }
  if (tokens.length === 1 && tokens[0]) sources.push(verbSource(tokens[0]));
  if (tokens.length > 1 && tokens.at(-1)) {
    sources.push([...tokens.slice(0, -1).map(escape), verbSource(tokens.at(-1) ?? "")].join(String.raw`\s+`));
  }
  if (/^to\s+be\s+/i.test(trimmed)) {
    const complement = tokens.slice(1).map((token) => ["a", "an", "the"].includes(token.toLowerCase()) ? DETERMINER : escape(token));
    sources.push(complement.join(String.raw`\s+`));
  }

  // A safe fallback for dictionary infinitives whose example replaces the
  // object ("to park an issue" -> "park pricing"). It highlights the lexical
  // verb or phrasal verb rather than silently leaving the example unmarked.
  if (leadingInfinitive && tokens[0]) {
    const particles = new Set(["about", "across", "along", "around", "at", "away", "back", "down", "for", "forward", "in", "into", "off", "on", "out", "over", "through", "to", "up", "with"]);
    const core = [verbSource(tokens[0])];
    for (const token of tokens.slice(1)) {
      if (!particles.has(token.toLowerCase())) break;
      core.push(String.raw`(?:\s+${WORD}){0,3}\s+${escape(token)}`);
    }
    sources.push(core.join(""));
  }
  return Array.from(new Set(sources.filter(Boolean))).sort((a, b) => b.length - a.length);
};

export interface KeywordRange {
  start: number;
  end: number;
  kind: "phrase" | "vocab";
}

export const findKeyPhraseRanges = (text: string, phrases: string[]): KeywordRange[] => {
  const candidates: KeywordRange[] = [];
  for (const phrase of clean(phrases)) {
    for (const source of keyPhraseSources(phrase)) {
      const matcher = new RegExp(`(?<![\\p{L}\\p{N}])(${source})(?![\\p{L}\\p{N}])`, "giu");
      let match: RegExpExecArray | null;
      while ((match = matcher.exec(text)) !== null) {
        candidates.push({ start: match.index, end: match.index + match[0].length, kind: "phrase" });
        if (!match[0].length) matcher.lastIndex += 1;
      }
    }
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
