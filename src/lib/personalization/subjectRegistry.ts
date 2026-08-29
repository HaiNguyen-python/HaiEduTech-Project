/**
 * @file subjectRegistry.ts
 * @description Declarative catalogue of every learnable subject on HaiEduTech.
 *   Personalization (level ladder, weekly plan, weakness ranking) reads only
 *   from here, so adding a subject never requires touching the model code.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SubjectId =
  | "ielts" | "cambridge" | "toeic" | "sat" | "pte" | "thpt" | "english"
  | "chinese" | "japanese" | "vietnamese" | "finnish" | "swedish" | "programming";

export type StepKind = "lesson" | "practice" | "vocab" | "review" | "speaking";

export interface SubjectTrack {
  /** Stable id used for weakness matching and de-duplication. */
  id: string;
  kind: StepKind;
  titleVi: string;
  titleEn: string;
  route: string;
  /** Suggested minutes for one sitting. */
  minutes: number;
  /** Skill this track trains: listening | reading | writing | speaking | vocab | grammar | logic. */
  skill: string;
}

export interface SubjectDef {
  id: SubjectId;
  labelVi: string;
  labelEn: string;
  emoji: string;
  hub: string;
  /** Ordered level ladder, lowest first. */
  ladder: string[];
  /** Placement bank slug on /placement-test, when one exists. */
  placement?: string;
  /** activity_type prefixes in student_activity_log that belong to this subject. */
  activityPrefixes: string[];
  /** user_vocab_mastered.subject values that belong here. */
  vocabSubjects: string[];
  tracks: SubjectTrack[];
}

const T = (
  id: string, kind: StepKind, titleVi: string, titleEn: string,
  route: string, minutes: number, skill: string,
): SubjectTrack => ({ id, kind, titleVi, titleEn, route, minutes, skill });

export const SUBJECTS: Record<SubjectId, SubjectDef> = {
  ielts: {
    id: "ielts", labelVi: "IELTS", labelEn: "IELTS", emoji: "🎯",
    hub: "/ielts-skills-practice",
    ladder: ["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0"],
    placement: "english",
    activityPrefixes: ["ielts"],
    vocabSubjects: ["ielts"],
    tracks: [
      T("ielts-listening", "practice", "Luyện nghe IELTS (1 phần)", "IELTS Listening drill", "/ielts-listening-practice", 25, "listening"),
      T("ielts-reading", "practice", "Luyện đọc IELTS (1 passage)", "IELTS Reading passage", "/ielts-reading-practice", 30, "reading"),
      T("ielts-writing", "practice", "Viết Task 1 hoặc Task 2", "Write Task 1 or Task 2", "/ielts-writing-practice", 40, "writing"),
      T("ielts-speaking", "speaking", "Luyện nói theo chủ đề", "Speaking topic practice", "/ielts-speaking-practice", 20, "speaking"),
      T("ielts-vocab", "vocab", "Học 15 từ vựng IELTS", "Learn 15 IELTS words", "/ielts-vocabulary", 15, "vocab"),
      T("ielts-lecture", "lesson", "Học 1 bài giảng chiến lược", "Study one strategy lecture", "/ielts-lectures", 20, "grammar"),
      T("ielts-perf", "review", "Xem lại phân tích năng lực", "Review your performance", "/ielts-performance", 10, "review"),
    ],
  },
  cambridge: {
    id: "cambridge", labelVi: "Cambridge YLE", labelEn: "Cambridge YLE", emoji: "🎓",
    hub: "/cambridge-yle-test-prep",
    ladder: ["Pre-A1", "Starters", "Movers", "Flyers", "KET", "PET"],
    placement: "english",
    activityPrefixes: ["cambridge"],
    vocabSubjects: ["cambridge", "cambridge-yle"],
    tracks: [
      T("cam-exam", "practice", "Làm 1 đề mock Cambridge", "Take one Cambridge mock test", "/cambridge-yle-test-prep", 35, "reading"),
      T("cam-lecture", "lesson", "Học 1 bài giảng Cambridge", "Study one Cambridge lecture", "/cambridge-lectures", 20, "grammar"),
      T("cam-vocab", "vocab", "Học 15 từ vựng YLE", "Learn 15 YLE words", "/cambridge-yle-vocabulary", 15, "vocab"),
      T("cam-speaking", "speaking", "Luyện nói Cambridge", "Cambridge speaking practice", "/cambridge-speaking-practice", 20, "speaking"),
      T("cam-fun", "practice", "Fun Zone luyện phản xạ", "Fun Zone quick drills", "/cambridge/arcade", 15, "listening"),
    ],
  },
  toeic: {
    id: "toeic", labelVi: "TOEIC", labelEn: "TOEIC", emoji: "💼",
    hub: "/toeic",
    ladder: ["300", "400", "500", "600", "700", "800", "900"],
    placement: "english",
    activityPrefixes: ["toeic"],
    vocabSubjects: ["toeic"],
    tracks: [
      T("toeic-exam", "practice", "Làm 1 đề TOEIC", "Take one TOEIC test", "/toeic-exams", 40, "listening"),
      T("toeic-lecture", "lesson", "Học 1 bài giảng Part", "Study one Part lecture", "/toeic-lectures", 20, "reading"),
      T("toeic-vocab", "vocab", "Học 20 từ vựng TOEIC", "Learn 20 TOEIC words", "/toeic-vocabulary", 15, "vocab"),
    ],
  },
  sat: {
    id: "sat", labelVi: "SAT", labelEn: "SAT", emoji: "📐",
    hub: "/sat-curriculum",
    ladder: ["1000", "1100", "1200", "1300", "1400", "1500"],
    placement: "english",
    activityPrefixes: ["sat"],
    vocabSubjects: ["sat"],
    tracks: [
      T("sat-warmup", "practice", "Daily Warm-up SAT", "SAT daily warm-up", "/sat/daily-warmup", 15, "logic"),
      T("sat-exam", "practice", "Làm 1 module SAT", "Take one SAT module", "/sat-exams", 35, "reading"),
      T("sat-vocab", "vocab", "Học 20 từ vựng SAT", "Learn 20 SAT words", "/sat-vocabulary", 15, "vocab"),
      T("sat-errors", "review", "Xem lại Error Log", "Review your error log", "/sat/error-log", 15, "review"),
      T("sat-pace", "practice", "Luyện tốc độ đọc", "Reading pace drill", "/sat/reading-pace", 20, "reading"),
    ],
  },
  pte: {
    id: "pte", labelVi: "PTE", labelEn: "PTE", emoji: "🗂️",
    hub: "/pte",
    ladder: ["30", "40", "50", "60", "70", "80"],
    placement: "english",
    activityPrefixes: ["pte"],
    vocabSubjects: ["pte"],
    tracks: [
      T("pte-speaking", "speaking", "Luyện Speaking PTE", "PTE Speaking practice", "/pte/speaking", 25, "speaking"),
      T("pte-writing", "practice", "Luyện Writing PTE", "PTE Writing practice", "/pte/writing", 30, "writing"),
      T("pte-reading", "practice", "Luyện Reading PTE", "PTE Reading practice", "/pte/reading", 25, "reading"),
      T("pte-listening", "practice", "Luyện Listening PTE", "PTE Listening practice", "/pte/listening", 25, "listening"),
      T("pte-vocab", "vocab", "Học 15 từ vựng PTE", "Learn 15 PTE words", "/pte/vocabulary", 15, "vocab"),
    ],
  },
  thpt: {
    id: "thpt", labelVi: "Thi THPT Quốc gia", labelEn: "National THPT Exam", emoji: "🇻🇳",
    hub: "/national-exam",
    ladder: ["5.0", "6.0", "7.0", "8.0", "9.0", "10"],
    activityPrefixes: ["thpt", "national_exam"],
    vocabSubjects: ["thpt"],
    tracks: [
      T("thpt-exam", "practice", "Làm 1 đề THPT", "Take one THPT exam", "/national-exam", 45, "reading"),
      T("thpt-review", "lesson", "Ôn kiến thức trọng tâm", "Essential review module", "/national-exam/essential-review", 25, "grammar"),
    ],
  },
  english: {
    id: "english", labelVi: "Tiếng Anh tổng quát", labelEn: "General English", emoji: "🇬🇧",
    hub: "/english",
    ladder: ["A1", "A2", "B1", "B2", "C1"],
    placement: "english",
    activityPrefixes: ["conv_english", "language_lesson", "speaking_coach_english", "grammar_"],
    vocabSubjects: ["english"],
    tracks: [
      T("en-conv", "lesson", "Học 1 bài hội thoại", "Study one conversation lesson", "/english/conversational/curriculum", 25, "speaking"),
      T("en-grammar", "practice", "Làm bài tập ngữ pháp", "Grammar exercise set", "/english/grammar", 25, "grammar"),
      T("en-pron", "speaking", "Luyện phát âm", "Pronunciation drill", "/english/pronunciation", 15, "speaking"),
      T("en-coach", "speaking", "AI Speaking Coach", "AI Speaking Coach", "/speaking-coach/english", 20, "speaking"),
      T("en-idioms", "vocab", "Học thành ngữ", "Learn idioms", "/english/idioms", 15, "vocab"),
    ],
  },
  chinese: {
    id: "chinese", labelVi: "Tiếng Trung / HSK", labelEn: "Chinese / HSK", emoji: "🇨🇳",
    hub: "/chinese",
    ladder: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"],
    placement: "chinese",
    activityPrefixes: ["hsk", "hskk", "conv_chinese", "speaking_coach_chinese", "pinyin", "hanzi", "tone_"],
    vocabSubjects: ["hsk", "chinese"],
    tracks: [
      T("zh-vocab", "vocab", "Học 20 từ HSK", "Learn 20 HSK words", "/chinese/hsk/vocabulary", 20, "vocab"),
      T("zh-grammar", "lesson", "Học 1 điểm ngữ pháp HSK", "Study one HSK grammar point", "/chinese/hsk-grammar", 20, "grammar"),
      T("zh-test", "practice", "Làm 1 đề HSK", "Take one HSK test", "/chinese/hsk/test", 35, "reading"),
      T("zh-listening", "practice", "Luyện nghe tiếng Trung", "Chinese listening practice", "/chinese/listening", 20, "listening"),
      T("zh-speaking", "speaking", "Luyện HSKK / khẩu ngữ", "HSKK speaking practice", "/chinese/hskk", 20, "speaking"),
      T("zh-tone", "speaking", "Luyện thanh điệu", "Tone drill", "/chinese/tone-drill", 15, "speaking"),
    ],
  },
  japanese: {
    id: "japanese", labelVi: "Tiếng Nhật", labelEn: "Japanese", emoji: "🇯🇵",
    hub: "/japanese",
    ladder: ["N5", "N4", "N3", "N2", "N1"],
    activityPrefixes: ["japanese", "jlpt", "speaking_coach_japanese"],
    vocabSubjects: ["japanese"],
    tracks: [
      T("ja-lesson", "lesson", "Học 1 bài tiếng Nhật", "Study one Japanese lesson", "/japanese", 25, "grammar"),
      T("ja-speaking", "speaking", "Shadowing tiếng Nhật", "Japanese shadowing", "/speaking-coach/japanese", 20, "speaking"),
    ],
  },
  vietnamese: {
    id: "vietnamese", labelVi: "Tiếng Việt", labelEn: "Vietnamese", emoji: "🇻🇳",
    hub: "/learn-vietnamese",
    ladder: ["A1", "A2", "B1", "B2", "C1"],
    placement: "vietnamese",
    activityPrefixes: ["vietnamese", "vff", "dictation"],
    vocabSubjects: ["vietnamese", "vff"],
    tracks: [
      T("vi-lesson", "lesson", "Học 1 bài tiếng Việt", "Study one Vietnamese lesson", "/learn-vietnamese", 25, "reading"),
      T("vi-vocab", "vocab", "Học 15 từ tiếng Việt", "Learn 15 Vietnamese words", "/learn-vietnamese/vocabulary", 15, "vocab"),
      T("vi-listening", "practice", "Luyện nghe chính tả", "Dictation practice", "/learn-vietnamese/dictation", 20, "listening"),
      T("vi-speaking", "speaking", "Luyện phát âm", "Pronunciation lab", "/learn-vietnamese/for-foreigners/lab/pronunciation", 20, "speaking"),
    ],
  },
  finnish: {
    id: "finnish", labelVi: "Tiếng Phần Lan / YKI", labelEn: "Finnish / YKI", emoji: "🇫🇮",
    hub: "/finnish",
    ladder: ["A1", "A2", "B1", "B2"],
    placement: "finnish",
    activityPrefixes: ["finnish", "yki", "speaking_coach_finnish"],
    vocabSubjects: ["finnish"],
    tracks: [
      T("fi-yki", "lesson", "Học 1 phần YKI", "Study one YKI section", "/finnish/yki-dashboard", 25, "reading"),
      T("fi-vocab", "vocab", "Học 15 từ tiếng Phần Lan", "Learn 15 Finnish words", "/finnish-vocabulary", 15, "vocab"),
      T("fi-speaking", "speaking", "Luyện nói tiếng Phần Lan", "Finnish speaking practice", "/speaking-coach/finnish", 20, "speaking"),
      T("fi-beginner", "lesson", "Bài học cơ bản", "Beginner lesson", "/finnish/beginner", 20, "grammar"),
    ],
  },
  swedish: {
    id: "swedish", labelVi: "Tiếng Thụy Điển", labelEn: "Swedish", emoji: "🇸🇪",
    hub: "/swedish",
    ladder: ["A1", "A2", "B1", "B2"],
    activityPrefixes: ["swedish"],
    vocabSubjects: ["swedish"],
    tracks: [
      T("sv-lesson", "lesson", "Học 1 bài Thụy Điển", "Study one Swedish lesson", "/swedish/curriculum", 25, "grammar"),
      T("sv-vocab", "vocab", "Học 15 từ Thụy Điển", "Learn 15 Swedish words", "/swedish/vocabulary", 15, "vocab"),
      T("sv-listening", "practice", "Luyện nghe", "Listening lab", "/swedish/listening", 20, "listening"),
      T("sv-reading", "practice", "Luyện đọc", "Reading lab", "/swedish/reading", 20, "reading"),
      T("sv-writing", "practice", "Luyện viết", "Writing lab", "/swedish/writing", 25, "writing"),
      T("sv-speaking", "speaking", "Luyện nói", "Speaking lab", "/swedish/speaking", 20, "speaking"),
    ],
  },
  programming: {
    id: "programming", labelVi: "Lập trình & AI", labelEn: "Programming & AI", emoji: "💻",
    hub: "/programming",
    ladder: ["Nhập môn", "Cơ bản", "Trung cấp", "Nâng cao", "Chuyên sâu"],
    placement: "programming",
    activityPrefixes: ["python", "sql", "coding", "programming", "ai_academy", "startup_", "scratch", "ml_", "spark"],
    vocabSubjects: ["programming"],
    tracks: [
      T("pg-python", "lesson", "Học 1 bài Python", "Study one Python lesson", "/programming/python-pathway", 30, "logic"),
      T("pg-challenge", "practice", "Giải 2 challenge code", "Solve 2 coding challenges", "/programming/python-challenges", 30, "logic"),
      T("pg-ai", "lesson", "Học 1 bài AI Academy", "Study one AI Academy lesson", "/programming/ai-academy", 25, "logic"),
      T("pg-startup", "lesson", "Học 1 bài Startup", "Study one Startup lesson", "/programming/startup/roadmap", 20, "logic"),
    ],
  },
};

export const SUBJECT_IDS = Object.keys(SUBJECTS) as SubjectId[];

/** Maps an activity_type to the subject it belongs to, or null. */
export function subjectOfActivity(activityType: string): SubjectId | null {
  const t = (activityType || "").toLowerCase();
  for (const id of SUBJECT_IDS) {
    if (SUBJECTS[id].activityPrefixes.some((p) => t.startsWith(p) || t.includes(p))) return id;
  }
  return null;
}

/** Maps a user_vocab_mastered.subject value to a subject id, or null. */
export function subjectOfVocab(vocabSubject: string): SubjectId | null {
  const s = (vocabSubject || "").toLowerCase();
  for (const id of SUBJECT_IDS) {
    if (SUBJECTS[id].vocabSubjects.includes(s)) return id;
  }
  return null;
}

/** Skill of an activity, inferred from its type. */
export function skillOfActivity(activityType: string): string {
  const t = (activityType || "").toLowerCase();
  if (t.includes("listening") || t.includes("listen")) return "listening";
  if (t.includes("reading") || t.includes("read")) return "reading";
  if (t.includes("writing") || t.includes("write") || t.includes("essay")) return "writing";
  if (t.includes("speaking") || t.includes("speech") || t.includes("hskk") || t.includes("pronun")) return "speaking";
  if (t.includes("vocab")) return "vocab";
  if (t.includes("grammar")) return "grammar";
  if (t.includes("python") || t.includes("sql") || t.includes("coding") || t.includes("challenge")) return "logic";
  return "practice";
}

export const SKILL_LABEL: Record<string, { vi: string; en: string }> = {
  listening: { vi: "Nghe", en: "Listening" },
  reading: { vi: "Đọc", en: "Reading" },
  writing: { vi: "Viết", en: "Writing" },
  speaking: { vi: "Nói", en: "Speaking" },
  vocab: { vi: "Từ vựng", en: "Vocabulary" },
  grammar: { vi: "Ngữ pháp", en: "Grammar" },
  logic: { vi: "Tư duy lập trình", en: "Coding logic" },
  practice: { vi: "Luyện tập chung", en: "General practice" },
  review: { vi: "Ôn tập", en: "Review" },
};
