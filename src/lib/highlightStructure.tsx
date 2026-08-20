/**
 * @file highlightStructure.tsx
 * @description Bolds the target grammar chunks inside a model sentence so the
 *   structure being trained stands out in the Template Lab drills and in the
 *   annotated worked example.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReactNode } from "react";

export const renderHighlighted = (sentence: string, highlight?: string[]): ReactNode => {
  if (!highlight?.length) return sentence;
  const chunks = highlight.filter(Boolean);
  const escaped = chunks
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  if (!escaped.length) return sentence;
  const parts = sentence.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return parts.map((part, i) =>
    chunks.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-bold text-primary">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};
