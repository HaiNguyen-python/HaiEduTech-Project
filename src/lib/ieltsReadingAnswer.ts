/**
 * @file ieltsReadingAnswer.ts
 * @description Single source of truth for grading an IELTS Reading answer.
 * Handles the extended question types (TFNG, YNNG, matching features /
 * endings, summary completion, multi-select MCQ) and the tolerant
 * normalisation real IELTS marking allows.
 * @copyright 2026 HaiEduTech
 */
import type { ReadingQuestion } from "@/data/ieltsFullReadingExams";

/** Lowercase, strip punctuation and collapse whitespace. */
const norm = (s: string): string =>
  (s || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Canonical form for True/False/Not Given and Yes/No/Not Given answers. */
const normTf = (s: string): string => {
  const v = norm(s).replace(/-/g, " ");
  if (v === "t" || v === "true") return "true";
  if (v === "f" || v === "false") return "false";
  if (v === "y" || v === "yes") return "yes";
  if (v === "n" || v === "no") return "no";
  if (v === "ng" || v === "not given" || v === "notgiven") return "not given";
  return v;
};

/** Sorted upper-case letter set, e.g. "b,a" and "A B" both become "A|B". */
const normLetterSet = (s: string): string =>
  (s || "")
    .toUpperCase()
    .split(/[^A-Z]+/)
    .filter(Boolean)
    .sort()
    .join("|");

/** Strip a leading article so "the kiln" matches "kiln" where allowed. */
const stripArticle = (s: string): string => norm(s).replace(/^(a|an|the)\s+/, "");

export const isReadingAnswerCorrect = (q: ReadingQuestion, value: string): boolean => {
  const user = (value || "").trim();
  if (!user) return false;

  switch (q.type) {
    case "tfng":
    case "ynng":
      return normTf(user) === normTf(q.answer);

    case "mcq-multi": {
      const expected = q.answers?.length ? q.answers.join("|") : q.answer;
      return normLetterSet(user) === normLetterSet(expected);
    }

    case "matching-headings":
    case "matching-features":
    case "matching-endings":
    case "summary-completion":
      // Label-based answers (roman numerals or letters) - case-insensitive.
      return norm(user).replace(/[^a-z0-9]/g, "") === norm(q.answer).replace(/[^a-z0-9]/g, "");

    case "fill-blank":
      return norm(user) === norm(q.answer) || stripArticle(user) === stripArticle(q.answer);

    default:
      return norm(user) === norm(q.answer);
  }
};

/** Human-readable correct answer for the review panel. */
export const readingAnswerLabel = (q: ReadingQuestion): string => {
  if (q.type === "mcq-multi" && q.answers?.length) return q.answers.join(" + ");
  return q.answer;
};
