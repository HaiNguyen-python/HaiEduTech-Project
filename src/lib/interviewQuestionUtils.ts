import type { InterviewDifficulty, InterviewQuestion, InterviewRole } from "@/data/interviewQuestions";

export const INTERVIEW_REVIEWED_STORAGE_KEY = "haiedu_interview_reviewed_v2";
export const LEGACY_INTERVIEW_REVIEWED_STORAGE_KEY = "haiedu_interview_reviewed";

export type InterviewFilters = {
  role: InterviewRole;
  category: string;
  difficulty: InterviewDifficulty | "all";
  search: string;
  unreviewedOnly: boolean;
};

export const filterInterviewQuestions = (
  questions: InterviewQuestion[],
  filters: InterviewFilters,
  reviewed: Set<string>,
) => {
  const query = filters.search.trim().toLocaleLowerCase();

  return questions.filter((item) => {
    if (item.role !== filters.role) return false;
    if (filters.category !== "all" && item.category !== filters.category) return false;
    if (filters.difficulty !== "all" && item.difficulty !== filters.difficulty) return false;
    if (filters.unreviewedOnly && reviewed.has(item.id)) return false;
    if (!query) return true;

    return [item.question, item.answer, item.tldr, ...(item.tags ?? [])]
      .filter((value): value is string => typeof value === "string")
      .some((value) => value.toLocaleLowerCase().includes(query));
  });
};

export const groupInterviewQuestions = (questions: InterviewQuestion[], categories: string[]) =>
  categories
    .map((category) => ({ category, questions: questions.filter((item) => item.category === category) }))
    .filter((group) => group.questions.length > 0);

export const parseReviewedQuestionIds = (raw: string | null, validIds: Set<string>) => {
  if (!raw) return new Set<string>();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set<string>();
    return new Set(parsed.filter((id): id is string => typeof id === "string" && validIds.has(id)));
  } catch {
    return new Set<string>();
  }
};
