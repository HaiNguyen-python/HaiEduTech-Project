/**
 * KidBullets - presentation helper for Cambridge lectures.
 * Splits a long paragraph into short, kid-friendly bullet lines so that
 * young learners never face a wall of text.
 */
import { ReactNode } from "react";
import { kidSpeak } from "@/lib/cambridgeKidSpeak";

interface KidBulletsProps {
  text: string;
  /** Bullet marker shown in front of each line */
  marker?: ReactNode;
  /** Tailwind classes for the text */
  className?: string;
  /** Inline style (font size / line height) */
  style?: React.CSSProperties;
  /** Below this length the text renders as a single paragraph */
  minSplitLength?: number;
  /** Optional prefix rendered before the first bullet (e.g. an emoji) */
  leading?: string;
  /** Cambridge level - drives how strongly the wording is simplified */
  level?: string;
}


/** Split a paragraph into short readable chunks. */
export const splitToBullets = (raw: string, minSplitLength = 110): string[] => {
  const text = (raw || "").trim();
  if (!text) return [];
  if (text.length < minSplitLength) return [text];

  // 1) Split on existing separators authors already use.
  let parts = text
    .split(/\s+(?:→|->|·|•)\s+/g)
    .flatMap((chunk) => chunk.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ0-9"“(])/g))
    .map((s) => s.trim())
    .filter(Boolean);

  // 2) Any chunk that is still very long gets split on semicolons / " - ".
  parts = parts.flatMap((chunk) =>
    chunk.length > 160
      ? chunk
          .split(/\s*;\s*|\s+-\s+/g)
          .map((s) => s.trim())
          .filter(Boolean)
      : [chunk]
  );

  return parts.length ? parts : [text];
};

const KidBullets = ({
  text,
  marker = "•",
  className = "text-slate-700",
  style = { fontSize: "17px", lineHeight: "1.75" },
  minSplitLength = 110,
  leading,
  level,
}: KidBulletsProps) => {
  const bullets = splitToBullets(kidSpeak(text, level), minSplitLength);

  if (bullets.length === 0) return null;

  if (bullets.length === 1) {
    return (
      <p className={className} style={style}>
        {leading ? `${leading} ` : ""}
        {bullets[0]}
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-[3px] flex-shrink-0 text-sm opacity-80 select-none">{marker}</span>
          <span className={className} style={style}>
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default KidBullets;
