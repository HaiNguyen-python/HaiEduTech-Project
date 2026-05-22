/**
 * @file ieltsFullTests.ts
 * @description Groups individual reading passages into full 60-minute
 * IELTS Academic Reading Tests (3 passages × ~13 questions = ~40 Qs).
 * Each FullTest references existing ReadingExam objects by id.
 */

export interface FullTest {
  id: string;
  title: string;
  /** Total duration in minutes (real IELTS = 60). */
  durationMinutes: number;
  /** IDs from IELTS_FULL_READING_EXAMS (in order: Passage 1, 2, 3). */
  passageIds: [string, string, string];
}

export const IELTS_FULL_TESTS: FullTest[] = [
  {
    id: "ft-1",
    title: "Full Test 1 — Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-1", "rx-2", "rx-3"],
  },
  {
    id: "ft-2",
    title: "Full Test 2 — Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-4", "rx-5", "rx-cam-1"],
  },
  {
    id: "ft-3",
    title: "Full Test 3 — Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-2", "rx-1", "rx-3"],
  },
];
