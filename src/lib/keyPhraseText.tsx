/**
 * @file keyPhraseText.tsx
 * @description Renders text with its key phrases (IELTS Writing Practice
 *   phrase targets / translation keywords) highlighted in bold, reusing the
 *   natural-language matcher from highlightKeywords so dictionary-style
 *   entries like "to rise sharply" also match inflected forms in examples.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import React from "react";
import { findKeyPhraseRanges } from "@/lib/highlightKeywords";

const BOLD_CLASS = "font-bold rounded px-0.5 bg-primary/15 text-inherit";

/** React node with every matched key phrase wrapped in a bold chip. */
export const renderKeyPhrases = (text: string, phrases: string[]): React.ReactNode => {
  if (!text) return text;
  const ranges = findKeyPhraseRanges(text, phrases);
  if (!ranges.length) return text;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const range of ranges) {
    if (range.start < last) continue;
    if (range.start > last) parts.push(text.slice(last, range.start));
    parts.push(
      <span key={key++} className={BOLD_CLASS}>
        {text.slice(range.start, range.end)}
      </span>,
    );
    last = range.end;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

/** Plain-string variant that wraps matched key phrases in **bold** markers,
 * so PDF export (which converts ** to <strong>) shows them bolded too. */
export const markKeyPhrases = (text: string, phrases: string[]): string => {
  if (!text) return text;
  const ranges = findKeyPhraseRanges(text, phrases);
  if (!ranges.length) return text;
  let result = "";
  let last = 0;
  for (const range of ranges) {
    if (range.start < last) continue;
    result += text.slice(last, range.start) + `**${text.slice(range.start, range.end)}**`;
    last = range.end;
  }
  return result + text.slice(last);
};
