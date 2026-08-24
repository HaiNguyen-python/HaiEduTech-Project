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
    setIds: ["form-gym-membership", "mcq-museum", "discussion-research-project", "lecture-volcanoes"],
  },
  {
    id: "flt-4",
    title: "Full Listening Test 4",
    titleVi: "Đề nghe đầy đủ 4",
    durationMinutes: 30,
    setIds: ["form-hotel-booking", "monologue-museum-tour", "discussion-research-project-2", "lecture-urban-trees"],
  },
  {
    id: "flt-5",
    title: "Full Listening Test 5",
    titleVi: "Đề nghe đầy đủ 5",
    durationMinutes: 30,
    setIds: ["form-gym-membership-2", "monologue-museum-tour-2", "discussion-presentation-feedback", "lecture-urban-trees-2"],
  },
  {
    id: "flt-6",
    title: "Full Listening Test 6",
    titleVi: "Đề nghe đầy đủ 6",
    durationMinutes: 30,
    setIds: ["form-driving-school", "monologue-community-radio", "discussion-field-trip-plan", "lecture-sleep-science"],
  },
  {
    id: "flt-7",
    title: "Full Listening Test 7",
    titleVi: "Đề nghe đầy đủ 7",
    durationMinutes: 30,
    setIds: ["form-language-course", "monologue-park-tour", "discussion-dissertation-topic", "lecture-honeybee-decline"],
  },
  {
    id: "flt-8",
    title: "Full Listening Test 8",
    titleVi: "Đề nghe đầy đủ 8",
    durationMinutes: 30,
    setIds: ["form-apartment-rental", "monologue-volunteer-briefing", "discussion-lab-experiment", "lecture-volcanoes-2"],
  },
  {
    id: "flt-9",
    title: "Full Listening Test 9",
    titleVi: "Đề nghe đầy đủ 9",
    durationMinutes: 30,
    setIds: ["form-travel-insurance", "monologue-art-gallery", "discussion-internship-options", "lecture-printing-press"],
  },
  {
    id: "flt-10",
    title: "Full Listening Test 10",
    titleVi: "Đề nghe đầy đủ 10",
    durationMinutes: 30,
    setIds: ["form-summer-camp", "monologue-festival-info", "discussion-thesis-edits", "lecture-ocean-plastics"],
  },
  {
    id: "flt-11",
    title: "Full Listening Test 11",
    titleVi: "Đề nghe đầy đủ 11",
    durationMinutes: 30,
    setIds: ["form-library-membership", "monologue-community-garden", "discussion-history-project", "lecture-bees-decline"],
  },
  {
    id: "flt-12",
    title: "Full Listening Test 12",
    titleVi: "Đề nghe đầy đủ 12",
    durationMinutes: 30,
    setIds: ["form-cooking-class", "monologue-art-gallery-v2", "discussion-marketing-pitch", "lecture-microplastics"],
  },
  {
    id: "flt-13",
    title: "Full Listening Test 13",
    titleVi: "Đề nghe đầy đủ 13",
    durationMinutes: 30,
    setIds: ["form-photography-workshop", "monologue-farmers-market", "discussion-video-project", "lecture-coral-reefs"],
  },
  {
    id: "flt-14",
    title: "Full Listening Test 14",
    titleVi: "Đề nghe đầy đủ 14",
    durationMinutes: 30,
    setIds: ["form-clinic-appointment", "monologue-campus-tour", "discussion-literature-review", "lecture-memory-sleep"],
  },
  {
    id: "flt-15",
    title: "Full Listening Test 15",
    titleVi: "Đề nghe đầy đủ 15",
    durationMinutes: 30,
    setIds: ["form-bike-rental", "monologue-recycling-centre", "discussion-questionnaire-design", "lecture-urban-heat"],
  },
  {
    id: "flt-16",
    title: "Full Listening Test 16",
    titleVi: "Đề nghe đầy đủ 16",
    durationMinutes: 30,
    setIds: ["form-catering-order", "monologue-theatre-backstage", "discussion-group-presentation-split", "lecture-bird-migration"],
  },
  {
    id: "flt-17",
    title: "Full Listening Test 17",
    titleVi: "Đề nghe đầy đủ 17",
    durationMinutes: 30,
    setIds: ["form-removals-quote", "monologue-nature-reserve", "discussion-lab-report-rewrite", "lecture-food-security"],
  },
  {
    id: "flt-18",
    title: "Full Listening Test 18",
    titleVi: "Đề nghe đầy đủ 18",
    durationMinutes: 30,
    setIds: ["form-sports-club", "monologue-bus-network", "discussion-placement-choice", "lecture-hydro-power"],
  },
  {
    id: "flt-19",
    title: "Full Listening Test 19",
    titleVi: "Đề nghe đầy đủ 19",
    durationMinutes: 30,
    setIds: ["form-ferry-tickets", "monologue-new-library", "discussion-data-analysis-problems", "lecture-language-endangerment"],
  },
  {
    id: "flt-20",
    title: "Full Listening Test 20",
    titleVi: "Đề nghe đầy đủ 20",
    durationMinutes: 30,
    setIds: ["form-evening-class", "monologue-safety-briefing", "discussion-module-selection", "lecture-glass-recycling"],
  },
  {
    id: "flt-21",
    title: "Full Listening Test 21",
    titleVi: "Đề nghe đầy đủ 21",
    durationMinutes: 30,
    setIds: ["form-lost-property", "monologue-hostel-rules", "discussion-poster-session", "lecture-antibiotic-resistance"],
  },
  {
    id: "flt-22",
    title: "Full Listening Test 22",
    titleVi: "Đề nghe đầy đủ 22",
    durationMinutes: 30,
    setIds: ["form-bank-account", "map-botanical-garden", "discussion-ethics-approval", "lecture-soil-carbon"],
  },
  {
    id: "flt-23",
    title: "Full Listening Test 23",
    titleVi: "Đề nghe đầy đủ 23",
    durationMinutes: 30,
    setIds: ["form-dentist-registration", "monologue-sports-centre-plan", "discussion-case-study", "lecture-animal-navigation"],
  },
  {
    id: "flt-24",
    title: "Full Listening Test 24",
    titleVi: "Đề nghe đầy đủ 24",
    durationMinutes: 30,
    setIds: ["form-car-service", "monologue-traffic-report", "discussion-field-survey", "lecture-trade-routes"],
  },
  {
    id: "flt-25",
    title: "Full Listening Test 25",
    titleVi: "Đề nghe đầy đủ 25",
    durationMinutes: 30,
    setIds: ["form-festival-stall", "monologue-wildlife-park", "discussion-dissertation-timeline", "lecture-noise-pollution"],
  },
  {
    id: "flt-26",
    title: "Full Listening Test 26",
    titleVi: "Đề nghe đầy đủ 26",
    durationMinutes: 30,
    setIds: ["form-homestay-booking", "monologue-town-regeneration", "discussion-coding-project", "lecture-agri-robotics"],
  },
  {
    id: "flt-27",
    title: "Full Listening Test 27",
    titleVi: "Đề nghe đầy đủ 27",
    durationMinutes: 30,
    setIds: ["form-museum-group-booking", "monologue-boat-trip", "discussion-interview-transcripts", "lecture-tidal-energy"],
  },
  {
    id: "flt-28",
    title: "Full Listening Test 28",
    titleVi: "Đề nghe đầy đủ 28",
    durationMinutes: 30,
    setIds: ["form-gym-induction", "monologue-science-fair", "discussion-exchange-semester", "lecture-volcanic-ash-aviation"],
  },
  {
    id: "flt-29",
    title: "Full Listening Test 29",
    titleVi: "Đề nghe đầy đủ 29",
    durationMinutes: 30,
    setIds: ["form-laundry-service", "monologue-staff-orientation", "discussion-group-conflict", "lecture-biodiversity-corridors"],
  },
  {
    id: "flt-30",
    title: "Full Listening Test 30",
    titleVi: "Đề nghe đầy đủ 30",
    durationMinutes: 30,
    setIds: ["form-conference-registration", "monologue-arts-festival", "discussion-viva-preparation", "lecture-museum-conservation"],
  },
];
