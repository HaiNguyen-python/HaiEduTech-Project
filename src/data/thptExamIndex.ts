// Lightweight exam metadata index - NO question data loaded here
// Used by the listing page to avoid loading 800+ questions into memory at once

export interface ExamMeta {
  id: string;
  title: string;
  titleEn: string;
  code: string;
  duration: number;
  totalQuestions: number;
}

// Metadata for all 20 exams
export const examIndex: ExamMeta[] = [
  { id: "thpt-01", title: "Đề thi thử số 01", titleEn: "Practice Test 01", code: "101", duration: 50, totalQuestions: 40 },
  { id: "thpt-02", title: "Đề thi thử số 02", titleEn: "Practice Test 02", code: "102", duration: 50, totalQuestions: 40 },
  { id: "thpt-03", title: "Đề thi thử số 03", titleEn: "Practice Test 03", code: "103", duration: 50, totalQuestions: 40 },
  { id: "thpt-04", title: "Đề thi thử số 04", titleEn: "Practice Test 04", code: "104", duration: 50, totalQuestions: 40 },
  { id: "thpt-05", title: "Đề thi thử số 05", titleEn: "Practice Test 05", code: "105", duration: 50, totalQuestions: 40 },
  { id: "thpt-06", title: "Đề thi thử số 06", titleEn: "Practice Test 06", code: "106", duration: 50, totalQuestions: 40 },
  { id: "thpt-07", title: "Đề thi thử số 07", titleEn: "Practice Test 07", code: "107", duration: 50, totalQuestions: 40 },
  { id: "thpt-08", title: "Đề thi thử số 08", titleEn: "Practice Test 08", code: "108", duration: 50, totalQuestions: 40 },
  { id: "thpt-09", title: "Đề thi thử số 09", titleEn: "Practice Test 09", code: "109", duration: 50, totalQuestions: 40 },
  { id: "thpt-10", title: "Đề thi thử số 10", titleEn: "Practice Test 10", code: "110", duration: 50, totalQuestions: 40 },
  { id: "thpt-11", title: "Đề thi thử số 11", titleEn: "Practice Test 11", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-12", title: "Đề thi thử số 12", titleEn: "Practice Test 12", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-13", title: "Đề thi thử số 13", titleEn: "Practice Test 13", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-14", title: "Đề thi thử số 14", titleEn: "Practice Test 14", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-15", title: "Đề thi thử số 15", titleEn: "Practice Test 15", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-16", title: "Đề thi thử số 16", titleEn: "Practice Test 16", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-17", title: "Đề thi thử số 17", titleEn: "Practice Test 17", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-18", title: "Đề thi thử số 18", titleEn: "Practice Test 18", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-19", title: "Đề thi thử số 19", titleEn: "Practice Test 19", code: "1126", duration: 50, totalQuestions: 40 },
  { id: "thpt-20", title: "Đề thi thử số 20", titleEn: "Practice Test 20", code: "1126", duration: 50, totalQuestions: 40 },
];

// Dynamic loader - fetches full exam data only when a student starts a specific exam
const examCache = new Map<string, any>();

export async function loadExamById(examId: string) {
  if (examCache.has(examId)) return examCache.get(examId);

  const num = parseInt(examId.replace("thpt-", ""), 10);

  let allExams;
  if (num <= 10) {
    const mod = await import("./thptExamData");
    allExams = mod.thptExams;
  } else {
    const mod = await import("./thptExamData2");
    allExams = mod.thptExams2;
  }

  const exam = allExams.find((e: any) => e.id === examId);
  if (exam) examCache.set(examId, exam);
  return exam ?? null;
}
