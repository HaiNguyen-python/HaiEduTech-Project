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


/** Placeholder used while quoted spans are protected from sentence splitting. */
const Q_OPEN = "\uE000";
const Q_CLOSE = "\uE001";

/** Hide sentence-ending punctuation inside quotes so quotes stay in one bullet. */
const maskQuotes = (s: string) =>
  s.replace(/["“”'']([^"“”]{0,300}?)["“”'']/g, (m) =>
    m.replace(/\./g, Q_OPEN).replace(/\?/g, Q_CLOSE)
  );

const unmaskQuotes = (s: string) =>
  s.split(Q_OPEN).join(".").split(Q_CLOSE).join("?");

/** Split a paragraph into short readable chunks. */
export const splitToBullets = (raw: string, minSplitLength = 110): string[] => {
  const text = (raw || "").trim();
  if (!text) return [];
  if (text.length < minSplitLength) return [text];

  const masked = maskQuotes(text);

  // 1) Split on existing separators authors already use.
  let parts = masked
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

  // 3) Merge very short fragments back into the previous bullet so children
  //    never see a dangling half-sentence on its own line.
  const merged: string[] = [];
  for (const part of parts) {
    const clean = unmaskQuotes(part);
    const prev = merged[merged.length - 1];
    const tooShort = clean.replace(/[^A-Za-zÀ-ỹ0-9]/g, "").length < 18;
    const opensQuote = prev ? (prev.match(/["“”]/g)?.length ?? 0) % 2 === 1 : false;
    if (prev && (tooShort || opensQuote)) {
      merged[merged.length - 1] = `${prev} ${clean}`.replace(/\s{2,}/g, " ");
    } else {
      merged.push(clean);
    }
  }

  return merged.length ? merged : [text];
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
