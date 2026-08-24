/**
 * @file ieltsFullListeningTests.ts
 * @description Groups individual listening sets into full 30-minute IELTS
 * Listening Tests (Section 1 + 2 + 3 + 4 = 40 questions), mirroring the
 * Full Test structure already used by IELTS Reading Practice.
 *
 * Only sets with exactly 10 questions are used here so that every full test
 * totals exactly 40 questions, as in the real exam.
 */

export interface FullListeningTest {
  id: string;
  title: string;
  titleVi: string;
  /** Real IELTS Listening = 30 minutes (+10 min transfer time). */
  durationMinutes: number;
  /** Set ids in order: Section 1, 2, 3, 4. */
  setIds: [string, string, string, string];
}

export const IELTS_FULL_LISTENING_TESTS: FullListeningTest[] = [
  {
    id: "flt-1",
    title: "Full Listening Test 1",
    titleVi: "Đề nghe đầy đủ 1",
    durationMinutes: 30,
    setIds: ["form-completion-s1", "mcq-s2", "matching-s3", "sentence-completion-s4"],
  },
  {
    id: "flt-2",
    title: "Full Listening Test 2",
    titleVi: "Đề nghe đầy đủ 2",
    durationMinutes: 30,
    setIds: ["form-completion-bank", "map-labelling-s2", "matching-research", "note-completion-s4"],
  },
  {
    id: "flt-3",
    title: "Full Listening Test 3",
    titleVi: "Đề nghe đầy đủ 3",
    durationMinutes: 30,
    setIds: ["form-gym-membership", "mcq-museum", "discussion-research-project-2", "lecture-volcanoes"],
  },
  {
    id: "flt-4",
    title: "Full Listening Test 4",
    titleVi: "Đề nghe đầy đủ 4",
    durationMinutes: 30,
    setIds: ["form-hotel-booking", "monologue-museum-tour-2", "discussion-presentation-feedback", "lecture-urban-trees-2"],
  },
  {
    id: "flt-5",
    title: "Full Listening Test 5",
    titleVi: "Đề nghe đầy đủ 5",
    durationMinutes: 30,
    setIds: ["form-gym-membership-2", "monologue-community-radio", "discussion-field-trip-plan", "lecture-sleep-science"],
  },
  {
    id: "flt-6",
    title: "Full Listening Test 6",
    titleVi: "Đề nghe đầy đủ 6",
    durationMinutes: 30,
    setIds: ["form-driving-school", "monologue-park-tour", "discussion-dissertation-topic", "lecture-honeybee-decline"],
  },
  {
    id: "flt-7",
    title: "Full Listening Test 7",
    titleVi: "Đề nghe đầy đủ 7",
    durationMinutes: 30,
    setIds: ["form-language-course", "monologue-volunteer-briefing", "discussion-lab-experiment", "lecture-volcanoes-2"],
  },
  {
    id: "flt-8",
    title: "Full Listening Test 8",
    titleVi: "Đề nghe đầy đủ 8",
    durationMinutes: 30,
    setIds: ["form-apartment-rental", "monologue-art-gallery", "discussion-internship-options", "lecture-printing-press"],
  },
  {
    id: "flt-9",
    title: "Full Listening Test 9",
    titleVi: "Đề nghe đầy đủ 9",
    durationMinutes: 30,
    setIds: ["form-travel-insurance", "monologue-festival-info", "discussion-thesis-edits", "lecture-ocean-plastics"],
  },
  // Tests 10-13 re-mix the same high-quality sets with different Section 1
  // openers, the same way Reading full tests re-use passages.
  {
    id: "flt-10",
    title: "Full Listening Test 10",
    titleVi: "Đề nghe đầy đủ 10",
    durationMinutes: 30,
    setIds: ["form-summer-camp", "mcq-museum", "discussion-dissertation-topic", "lecture-sleep-science"],
  },
  {
    id: "flt-11",
    title: "Full Listening Test 11",
    titleVi: "Đề nghe đầy đủ 11",
    durationMinutes: 30,
    setIds: ["form-library-membership", "monologue-festival-info", "matching-research", "lecture-ocean-plastics"],
  },
  {
    id: "flt-12",
    title: "Full Listening Test 12",
    titleVi: "Đề nghe đầy đủ 12",
    durationMinutes: 30,
    setIds: ["form-cooking-class", "monologue-park-tour", "discussion-lab-experiment", "lecture-printing-press"],
  },
  {
    id: "flt-13",
    title: "Full Listening Test 13",
    titleVi: "Đề nghe đầy đủ 13",
    durationMinutes: 30,
    setIds: ["form-photography-workshop", "map-labelling-s2", "discussion-internship-options", "lecture-volcanoes-2"],
  },
];
