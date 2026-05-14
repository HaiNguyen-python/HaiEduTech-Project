// Additional TOEIC LR practice exams (batch 3): 10 new tests.
// Base entries only — toeicFullExamBuilder regenerates the full 200-question
// exam from each base, using examIndex to drive unique content per test.

import type { ToeicLRExam } from "./toeicExams";

const blank: ToeicLRExam["questions"] = [];

const make = (id: string, title: string): ToeicLRExam => ({
  id,
  title,
  series: "HaiEdu Series 2025",
  durationSec: 7200,
  questions: blank,
});

export const TOEIC_LR_EXTRA3: ToeicLRExam[] = [
  make("lr-09", "TOEIC LR Practice Test 09 — Healthcare & Wellness"),
  make("lr-10", "TOEIC LR Practice Test 10 — Real Estate & Property"),
  make("lr-11", "TOEIC LR Practice Test 11 — Hospitality & Restaurant"),
  make("lr-12", "TOEIC LR Practice Test 12 — Energy & Utilities"),
  make("lr-13", "TOEIC LR Practice Test 13 — Legal & Consulting"),
  make("lr-14", "TOEIC LR Practice Test 14 — Pharmaceutical & Research"),
  make("lr-15", "TOEIC LR Practice Test 15 — Automotive & Transport"),
  make("lr-16", "TOEIC LR Practice Test 16 — Banking & Insurance"),
  make("lr-17", "TOEIC LR Practice Test 17 — Sports & Recreation"),
  make("lr-18", "TOEIC LR Practice Test 18 — Aviation & Travel Tech"),
];
