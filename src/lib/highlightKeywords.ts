// Underline/highlight vocabulary keywords inside dialogue lines.
import React from "react";

export function highlightKeywords(text: string, terms: string[]): React.ReactNode {
  if (!text || !terms || terms.length === 0) return text;
  // Normalize terms: trim, dedupe, sort longest first to match phrases before single words
  const cleaned = Array.from(
    new Set(
      terms
        .map((t) => t.trim())
        .filter((t) => t.length >= 2)
    )
  ).sort((a, b) => b.length - a.length);
  if (cleaned.length === 0) return text;

  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\b(${cleaned.map(escape).join("|")})\\b`, "gi");

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      React.createElement(
        "span",
        {
          key: key++,
          className:
            "underline decoration-2 decoration-amber-300 underline-offset-4 font-semibold",
        },
        match[0]
      )
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
