/**
 * @file RichTheoryText.tsx
 * @description Renders IELTS lecture theory text with automatic bullet/numbered
 * list detection. Supports:
 *   - Explicit markdown bullets: lines starting with "- ", "• ", "* "
 *   - Numbered lists: lines starting with "1.", "1)", "(1)"
 *   - Inline enumerations: "1) ... 2) ... 3) ..." or "(1) ... (2) ..."
 *   - Semicolon-separated enumerations of 3+ items
 * Falls back to a plain paragraph when no list pattern is detected.
 */
import React from "react";

interface Props {
  text: string;
  className?: string;
  listClassName?: string;
}

const splitInlineEnum = (text: string): string[] | null => {
  // Matches "1) ... 2) ... 3) ..." or "(1) ... (2) ..." with 3+ items
  const re = /\s*(?:\(?\d+[\).])\s+/g;
  const matches = text.match(re);
  if (!matches || matches.length < 3) return null;
  const parts = text.split(re).map((s) => s.trim()).filter(Boolean);
  return parts.length >= 3 ? parts : null;
};

const splitSemicolons = (text: string): string[] | null => {
  if (!text.includes(";")) return null;
  const parts = text.split(/\s*;\s*/).map((s) => s.trim()).filter(Boolean);
  return parts.length >= 3 ? parts : null;
};

export const RichTheoryText: React.FC<Props> = ({
  text,
  className = "text-[16px] leading-relaxed text-muted-foreground",
  listClassName = "list-disc pl-5 space-y-1.5",
}) => {
  if (!text) return null;

  // 1) Multi-line with explicit bullet/number markers
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1) {
    const bulletRe = /^([-•*]\s+|\d+[.)]\s+|\(\d+\)\s+)/;
    const allBullets = lines.every((l) => bulletRe.test(l));
    if (allBullets) {
      const isNumbered = lines.every((l) => /^(\d+[.)]\s+|\(\d+\)\s+)/.test(l));
      const items = lines.map((l) => l.replace(bulletRe, ""));
      const ListTag = isNumbered ? "ol" : "ul";
      return (
        <ListTag className={`${className} ${listClassName} ${isNumbered ? "list-decimal" : ""}`}>
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ListTag>
      );
    }
    // Mixed multi-line, render as paragraphs
    return (
      <div className={`${className} space-y-2`}>
        {lines.map((l, i) => (
          <p key={i}>{l.replace(/^([-•*]\s+)/, "")}</p>
        ))}
      </div>
    );
  }

  // 2) Inline numbered enumeration
  const numbered = splitInlineEnum(text);
  if (numbered) {
    return (
      <ol className={`${className} list-decimal pl-5 space-y-1.5`}>
        {numbered.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ol>
    );
  }

  // 3) Semicolon-separated long enumeration
  const semi = splitSemicolons(text);
  if (semi) {
    return (
      <ul className={`${className} ${listClassName}`}>
        {semi.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    );
  }

  return <p className={className}>{text}</p>;
};

export default RichTheoryText;
