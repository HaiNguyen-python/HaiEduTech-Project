/**
 * @file highlightKeywords.ts
 * @description Marks up dialogue lines so learners can see what to study:
 *   lesson vocabulary is underlined, and high value functional chunks
 *   (see dialogueKeyPhrases.ts) are printed in bold.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import React from "react";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

  // Longest match wins, so phrases and vocabulary never overlap awkwardly.
  const all = [...phrases, ...vocab].sort((a, b) => b.length - a.length);
  const phraseSet = new Set(phrases.map((p) => p.toLowerCase()));
  const pattern = new RegExp(`(?<![\\p{L}])(${all.map(escape).join("|")})(?![\\p{L}])`, "giu");

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const hit = match[0];
    const isPhrase = phraseSet.has(hit.toLowerCase());
    parts.push(
      React.createElement(
        "span",
        {
          key: key++,
          className: isPhrase
            ? "font-bold rounded px-0.5 bg-primary/15 text-inherit"
            : "underline decoration-2 decoration-amber-300 underline-offset-4 font-semibold",
        },
        hit,
      ),
    );
    lastIndex = match.index + hit.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
