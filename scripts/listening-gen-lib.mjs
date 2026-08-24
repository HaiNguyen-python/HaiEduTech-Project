/**
 * Shared helpers for generating IELTS Listening practice sets.
 * @copyright 2026 HaiEduTech
 */

const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

export function numWords(n) {
  n = Number(n);
  if (n < 20) return ONES[n];
  if (n < 100) {
    const t = TENS[Math.floor(n / 10)];
    const r = n % 10;
    return r ? `${t}-${ONES[r]}` : t;
  }
  if (n === 100) return "one hundred";
  if (n < 1000) {
    const h = `${ONES[Math.floor(n / 100)]} hundred`;
    const r = n % 100;
    return r ? `${h} and ${numWords(r)}` : h;
  }
  return String(n);
}

export function yearWords(y) {
  y = Number(y);
  if (y >= 2000 && y < 2010) return `two thousand and ${ONES[y - 2000]}`;
  if (y >= 2010 && y < 2100) return `twenty ${numWords(y - 2000)}`;
  const a = Math.floor(y / 100);
  const b = y % 100;
  return `${numWords(a)} ${b < 10 ? `oh ${ONES[b]}` : numWords(b)}`;
}

const ORDINALS = {
  1: "first", 2: "second", 3: "third", 4: "fourth", 5: "fifth", 6: "sixth",
  7: "seventh", 8: "eighth", 9: "ninth", 10: "tenth", 11: "eleventh",
  12: "twelfth", 13: "thirteenth", 14: "fourteenth", 15: "fifteenth",
  16: "sixteenth", 17: "seventeenth", 18: "eighteenth", 19: "nineteenth",
  20: "twentieth", 21: "twenty-first", 22: "twenty-second", 23: "twenty-third",
  24: "twenty-fourth", 25: "twenty-fifth", 26: "twenty-sixth",
  27: "twenty-seventh", 28: "twenty-eighth", 29: "twenty-ninth", 30: "thirtieth",
};
export function dayWords(d) {
  return ORDINALS[Number(d)] ?? numWords(d);
}

/** "Bennett" -> "B-E-N-N-E-T-T" (clear, slow TTS spelling). */
export function spell(word) {
  return word.toUpperCase().split("").join("-");
}

/** "GF3 4NY" -> "G-F-three, four-N-Y" so TTS reads it clearly. */
export function spellPostcode(pc) {
  return pc
    .split(" ")
    .map(part =>
      part
        .split("")
        .map(ch => (/[0-9]/.test(ch) ? numWords(ch) : ch))
        .join("-")
    )
    .join(", ");
}

/** "07712" -> "0-7-7-1-2"; handles doubles for naturalness. */
export function spellDigits(digits) {
  return digits.split("").map(d => (d === "0" ? "oh" : ONES[Number(d)])).join("-");
}

/** Escape for a TS double-quoted string literal. */
export function q(str) {
  return `"${String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
}

/** Render a transcript array as concatenated TS string lines. */
export function transcriptLiteral(lines) {
  return lines
    .map((l, i) => `      ${q(l + (i === lines.length - 1 ? "" : "\n"))}`)
    .join(" +\n");
}

/** Answers longer than 2 words are not allowed by IELTS conventions. */
export function wordsIn(answer) {
  return String(answer).trim().split(/\s+/).length;
}

export function fileHeader(name, description) {
  return `/**
 * @file ${name}
 * @description ${description}
 *
 * Generated content, hand-curated topics. Every fill-in answer appears
 * verbatim in the transcript; MCQ keys and matching letters are balanced.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";
`;
}
