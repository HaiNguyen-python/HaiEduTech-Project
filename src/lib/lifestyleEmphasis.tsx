/**
 * @file lifestyleEmphasis.tsx
 * @description Bolds the key terms, named models, authors and numeric rules
 *              inside Lifestyle Academy lesson prose so learners can scan and
 *              memorise the important parts. Pure string splitting, no HTML
 *              injection.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { ReactNode } from "react";

/**
 * Terms worth emphasising. Order does not matter: the matcher builds one
 * alternation regex and always prefers the longest match at a position.
 */
const TERMS: string[] = [
  // Named frameworks and models
  "BATNA", "SBI", "BLUF", "NVC", "HEAR", "IKIGAI", "MBTI",
  "Atkinson-Shiffrin", "Cornell", "Feynman", "Pomodoro", "Zeigarnik",
  "Eisenhower", "Pareto", "Zone 2", "VO2 max", "Habit Stacking",
  "habit stacking", "Exercise Snacking", "exercise snacking",
  "Energy Management", "energy management", "Deep Work", "deep work",
  "active recall", "spaced repetition", "interleaving", "chunking",
  "Active Recall", "Spaced Repetition", "Interleaving",
  "focused mode", "diffuse mode", "retrieval practice",
  "compound interest", "lãi kép", "luỹ tiến", "progressive",
  "nhớ lại chủ động", "lặp lại giãn cách", "xen kẽ", "phân khối",
  "chế độ tập trung", "chế độ khuếch tán",
  "vận động xen kẽ", "quản lý năng lượng", "tập trung sâu",
  // People
  "Barbara Oakley", "George Miller", "Nelson Cowan", "Martin Seligman",
  "BJ Fogg", "James Clear", "Cal Newport", "Peter Attia", "Nedra Tawwab",
  "Stone", "Heen", "Fisher", "Ury", "Loehr", "Schwartz", "Seneca",
  "Dalton-Smith", "Anders Ericsson", "Hermann Ebbinghaus", "Ebbinghaus",
  // Concepts frequently referenced
  "Situation", "Behaviour", "Impact", "Target", "Acceptable", "Walk-away",
  "Urgency", "Authority", "Secrecy",
  "gấp gáp", "quyền lực", "bí mật",
  "xác thực hai lớp", "two-factor authentication",
  "lương gộp", "lương thực nhận", "gross pay", "net pay",
  "thu nhập chịu thuế", "taxable income",
  "giới hạn", "boundary", "boundaries",
];

// Numeric rules such as 20-20-20, 1-3-7-21, 4-4-4-4, 45/2, 20/80.
const NUMERIC_RULE = String.raw`\b\d{1,3}(?:[-/]\d{1,3}){1,4}\b`;

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest terms first so "Zone 2" wins over "Zone", "Active Recall" over "recall".
const sortedTerms = [...new Set(TERMS)].sort((a, b) => b.length - a.length);

const MATCHER = new RegExp(
  `(${NUMERIC_RULE}|${sortedTerms.map(escapeRegExp).join("|")})`,
  "g",
);

/**
 * Split a paragraph into plain strings and <strong> segments.
 * Returns an array of ReactNode so callers can render it directly.
 */
export const emphasize = (text: string | undefined | null): ReactNode => {
  if (!text) return null;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Reset because MATCHER is a module-level global regex.
  MATCHER.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = MATCHER.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <strong key={`em-${key++}`} className="font-bold text-slate-900 dark:text-white">
        {match[0]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
    // Guard against zero-length matches.
    if (match[0].length === 0) MATCHER.lastIndex += 1;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};
