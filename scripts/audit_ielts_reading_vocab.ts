/**
 * @file audit_ielts_reading_vocab.ts
 * @description Checks that every IELTS reading exam ends with a usable key
 *   vocabulary list: at least 8 unique items, Vietnamese meaning present,
 *   the word actually occurring in the passage, and no em/en dashes.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { IELTS_FULL_READING_EXAMS } from "../src/data/ieltsFullReadingExams";
import { IELTS_FULL_READING_EXAMS_EXPANSION } from "../src/data/ieltsFullReadingExamsExpansion";
import { IELTS_FULL_READING_EXAMS_EXPANSION2 } from "../src/data/ieltsFullReadingExamsExpansion2";
import { IELTS_FULL_READING_EXAMS_EXPANSION3 } from "../src/data/ieltsFullReadingExamsExpansion3";
import { IELTS_FULL_READING_EXAMS_EXPANSION4 } from "../src/data/ieltsFullReadingExamsExpansion4";
import { IELTS_FULL_READING_EXAMS_EXPANSION5 } from "../src/data/ieltsFullReadingExamsExpansion5";
import { IELTS_FULL_READING_EXAMS_HARD } from "../src/data/ieltsFullReadingExamsHard";
import { IELTS_FULL_READING_EXAMS_HARD2 } from "../src/data/ieltsFullReadingExamsHard2";
import { IELTS_FULL_READING_EXAMS_HARD3 } from "../src/data/ieltsFullReadingExamsHard3";
import { IELTS_FULL_READING_EXAMS_HARD4 } from "../src/data/ieltsFullReadingExamsHard4";
import { READING_VOCAB } from "../src/data/ieltsReadingVocab";
import { READING_VOCAB_EXPANSION } from "../src/data/ieltsReadingVocabExpansion";
import { READING_VOCAB_EXPANSION_2 } from "../src/data/ieltsReadingVocabExpansion2";

const exams = [
  ...IELTS_FULL_READING_EXAMS, ...IELTS_FULL_READING_EXAMS_EXPANSION,
  ...IELTS_FULL_READING_EXAMS_EXPANSION2, ...IELTS_FULL_READING_EXAMS_EXPANSION3,
  ...IELTS_FULL_READING_EXAMS_EXPANSION4, ...IELTS_FULL_READING_EXAMS_EXPANSION5,
  ...IELTS_FULL_READING_EXAMS_HARD, ...IELTS_FULL_READING_EXAMS_HARD2,
  ...IELTS_FULL_READING_EXAMS_HARD3, ...IELTS_FULL_READING_EXAMS_HARD4,
];

const issues: string[] = [];
const base = (w: string) => w.toLowerCase().replace(/\(.*?\)/g, "").trim().split(/[\s/]+/)[0].replace(/[^a-z-]/g, "");

for (const exam of exams) {
  const list = [
    ...(READING_VOCAB[exam.id] ?? []),
    ...(READING_VOCAB_EXPANSION[exam.id] ?? []),
    ...(READING_VOCAB_EXPANSION_2[exam.id] ?? []),
  ];
  const seen = new Set<string>();
  const unique = list.filter((v) => {
    const k = v.word.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  if (unique.length < 8) issues.push(`${exam.id}: only ${unique.length} vocabulary items`);
  const passage = exam.passage.toLowerCase();
  for (const v of unique) {
    const at = `${exam.id} "${v.word}"`;
    if (!v.meaningVi?.trim()) issues.push(`${at}: missing Vietnamese meaning`);
    const stem = base(v.word);
    if (stem.length > 3 && !passage.includes(stem.slice(0, Math.max(5, stem.length - 2))))
      issues.push(`${at}: word not found in the passage`);
    const text = `${v.word} ${v.meaningVi} ${v.exampleEn ?? ""}`;
    if (/[—–]/.test(text)) issues.push(`${at}: contains em/en dash`);
  }
}

console.log("Exams:", exams.length);
console.log("Issues:", issues.length);
issues.slice(0, 80).forEach((i) => console.log(" -", i));
