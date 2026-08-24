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
    title: "Full Test 1 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-1", "rx-2", "rx-3"],
  },
  {
    id: "ft-2",
    title: "Full Test 2 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-4", "rx-5", "rx-cam-1"],
  },
  {
    id: "ft-3",
    title: "Full Test 3 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-2", "rx-1", "rx-3"],
  },
  {
    id: "ft-4",
    title: "Full Test 4 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-7", "rx-cam-3", "rx-cam-8"],
  },
  {
    id: "ft-5",
    title: "Full Test 5 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-9", "rx-cam-4", "rx-cam-10"],
  },
  {
    id: "ft-6",
    title: "Full Test 6 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-11", "rx-cam-5", "rx-cam-6"],
  },
  {
    id: "ft-7",
    title: "Full Test 7 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-8", "rx-cam-10", "rx-cam-11"],
  },
  {
    id: "ft-8",
    title: "Full Test 8 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-7", "rx-cam-9", "rx-2"],
  },
  // ============ Wave 5 - 10 new full tests ============
  {
    id: "ft-9",
    title: "Full Test 9 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-12", "rx-cam-13", "rx-cam-14"],
  },
  {
    id: "ft-10",
    title: "Full Test 10 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-15", "rx-cam-16", "rx-cam-17"],
  },
  {
    id: "ft-11",
    title: "Full Test 11 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-18", "rx-cam-19", "rx-cam-20"],
  },
  {
    id: "ft-12",
    title: "Full Test 12 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-21", "rx-cam-22", "rx-cam-23"],
  },
  {
    id: "ft-13",
    title: "Full Test 13 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-24", "rx-cam-25", "rx-cam-26"],
  },
  {
    id: "ft-14",
    title: "Full Test 14 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-12", "rx-cam-15", "rx-cam-18"],
  },
  {
    id: "ft-15",
    title: "Full Test 15 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-13", "rx-cam-16", "rx-cam-22"],
  },
  {
    id: "ft-16",
    title: "Full Test 16 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-14", "rx-cam-17", "rx-cam-26"],
  },
  {
    id: "ft-17",
    title: "Full Test 17 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-19", "rx-cam-23", "rx-cam-25"],
  },
  {
    id: "ft-18",
    title: "Full Test 18 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-20", "rx-cam-21", "rx-cam-24"],
  },
  // ============ Wave 6 - high-difficulty full tests ============
  {
    id: "ft-19",
    title: "Full Test 19 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-hard-1", "rx-hard-2", "rx-hard-3"],
  },
  {
    id: "ft-20",
    title: "Full Test 20 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-hard-4", "rx-hard-5", "rx-hard-6"],
  },
  {
    id: "ft-21",
    title: "Full Test 21 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-hard-2", "rx-hard-4", "rx-hard-6"],
  },
  {
    id: "ft-22",
    title: "Full Test 22 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-hard-3", "rx-hard-5", "rx-hard-1"],
  },
  {
    id: "ft-23",
    title: "Full Test 23 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-1", "rx-hard-2", "rx-hard-7"],
  },
  {
    id: "ft-24",
    title: "Full Test 24 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-3", "rx-hard-4", "rx-hard-8"],
  },
  {
    id: "ft-25",
    title: "Full Test 25 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-5", "rx-hard-6", "rx-hard-9"],
  },
  {
    id: "ft-26",
    title: "Full Test 26 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-7", "rx-hard-1", "rx-hard-10"],
  },
  {
    id: "ft-27",
    title: "Full Test 27 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-9", "rx-hard-3", "rx-hard-11"],
  },
  {
    id: "ft-28",
    title: "Full Test 28 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-cam-11", "rx-hard-5", "rx-hard-12"],
  },
  {
    id: "ft-29",
    title: "Full Test 29 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-1", "rx-hard-2", "rx-hard-13"],
  },
  {
    id: "ft-30",
    title: "Full Test 30 - Academic (60 minutes)",
    durationMinutes: 60,
    passageIds: ["rx-3", "rx-hard-4", "rx-hard-14"],
  },
];
