import type { ConvLesson } from "@/data/conversationalCurriculum";
import type { PurposeTopic } from "@/data/purposeEnglishTypes";

export type ReadinessTrack = "business" | "academic";
export type ReadinessStage = "foundation" | "developing" | "nearly-ready" | "ready";

export interface SavedQuizScore {
  score: number;
  maxScore: number;
}

export interface ReadinessScores {
  core: Record<string, SavedQuizScore>;
  lab: Record<string, SavedQuizScore>;
}

export interface ReadinessAxis {
  id: string;
  labelEn: string;
  labelVi: string;
  shortEn: string;
  shortVi: string;
  value: number;
  coreCompleted: number;
  coreTotal: number;
  quizRecorded: number;
  phrasePractised: number;
  phraseTotal: number;
  labCompleted: number;
  labTotal: number;
  labScored: number;
}

export interface ReadinessSnapshot {
  overall: number;
  stage: ReadinessStage;
  axes: ReadinessAxis[];
  weakest: ReadinessAxis;
  hasEvidence: boolean;
  hasLegacyScoreGap: boolean;
}

interface AxisDefinition {
  id: string;
  labelEn: string;
  labelVi: string;
  labIds: string[];
}

const DEFINITIONS: Record<ReadinessTrack, AxisDefinition[]> = {
  business: [
    { id: "biz-email", labelEn: "Professional email", labelVi: "Email chuyên nghiệp", labIds: ["pro-05-emails", "pro-08-remote-work"] },
    { id: "biz-meetings", labelEn: "Meetings", labelVi: "Họp và thảo luận", labIds: ["pro-03-meetings", "pro-06-conflict", "pro-10-leadership", "pro-20-mentoring", "pro-22-difficult-coworkers"] },
    { id: "biz-presenting", labelEn: "Presenting data", labelVi: "Trình bày dữ liệu", labIds: ["pro-04-presentations", "pro-16-startup-pitch", "pro-18-public-speaking", "pro-21-product-demos"] },
    { id: "biz-calls", labelEn: "Calls & rapport", labelVi: "Gọi điện và tạo quan hệ", labIds: ["pro-02-networking", "pro-11-onboarding", "pro-13-workplace-culture", "pro-17-cross-cultural"] },
    { id: "biz-negotiation", labelEn: "Negotiation", labelVi: "Đàm phán và khiếu nại", labIds: ["pro-07-negotiation", "pro-09-customer-service", "pro-12-freelancing", "pro-19-salary-negotiation"] },
    { id: "biz-career", labelEn: "CV & interviews", labelVi: "CV và phỏng vấn", labIds: ["pro-01-interviews", "pro-14-job-search", "pro-15-performance-review", "pro-23-quitting-job"] },
  ],
  academic: [
    { id: "aca-vocab", labelEn: "Academic vocabulary", labelVi: "Từ vựng học thuật", labIds: ["acad-05-environment", "acad-06-technology", "acad-08-global-issues", "acad-13-ai-future"] },
    { id: "aca-style", labelEn: "Style & precision", labelVi: "Văn phong và chính xác", labIds: ["acad-01-debates", "acad-02-opinions", "acad-04-culture"] },
    { id: "aca-writing", labelEn: "Academic writing", labelVi: "Viết học thuật", labIds: ["acad-07-academic-writing", "acad-18-essays"] },
    { id: "aca-reading", labelEn: "Reading & analysis", labelVi: "Đọc và phân tích", labIds: ["acad-09-media-literacy", "acad-11-research"] },
    { id: "aca-listening", labelEn: "Lectures & notes", labelVi: "Nghe giảng và ghi chú", labIds: ["acad-03-study-abroad", "acad-10-personal-development", "acad-12-class-discussions", "acad-14-mental-health"] },
    { id: "aca-integrity", labelEn: "Citation & seminars", labelVi: "Trích dẫn và seminar", labIds: ["acad-15-volunteering", "acad-16-presentations", "acad-17-group-projects", "acad-19-internships", "acad-20-life-after-graduation"] },
  ],
};

export const emptyReadinessScores = (): ReadinessScores => ({ core: {}, lab: {} });

export const keepBestQuizScore = (
  scores: ReadinessScores,
  section: keyof ReadinessScores,
  lessonId: string,
  score: number,
  maxScore: number,
): ReadinessScores => {
  if (maxScore <= 0) return scores;
  const previous = scores[section][lessonId];
  if (previous && previous.score / previous.maxScore >= score / maxScore) return scores;
  return { ...scores, [section]: { ...scores[section], [lessonId]: { score, maxScore } } };
};

export const readinessStage = (score: number): ReadinessStage => {
  if (score >= 80) return "ready";
  if (score >= 60) return "nearly-ready";
  if (score >= 30) return "developing";
  return "foundation";
};

export const getReadinessDefinitions = (track: ReadinessTrack) => DEFINITIONS[track];

export const buildReadinessSnapshot = ({
  track,
  topics,
  labs,
  coreDone,
  labDone,
  practised,
  scores,
}: {
  track: ReadinessTrack;
  topics: PurposeTopic[];
  labs: ConvLesson[];
  coreDone: string[];
  labDone: string[];
  practised: string[];
  scores: ReadinessScores;
}): ReadinessSnapshot => {
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const labIds = new Set(labs.map((lesson) => lesson.id));
  const axes = DEFINITIONS[track].map((definition) => {
    const topic = topicById.get(definition.id);
    const lessons = topic?.lessons ?? [];
    const relevantLabIds = definition.labIds.filter((id) => labIds.has(id));
    const coreCompleted = lessons.filter((lesson) => coreDone.includes(lesson.id)).length;
    const phraseKeys = lessons.flatMap((lesson) => lesson.vocab.map((item) => `${lesson.id}:${item.term}`));
    const phrasePractised = phraseKeys.filter((key) => practised.includes(key)).length;
    const quizRecorded = lessons.filter((lesson) => scores.core[lesson.id]).length;
    const quizRatio = lessons.reduce((sum, lesson) => {
      const result = scores.core[lesson.id];
      return sum + (result && result.maxScore > 0 ? result.score / result.maxScore : 0);
    }, 0) / Math.max(lessons.length, 1);
    const labCompleted = relevantLabIds.filter((id) => labDone.includes(id)).length;
    const completionRatio = coreCompleted / Math.max(lessons.length, 1);
    const phraseRatio = phrasePractised / Math.max(phraseKeys.length, 1);
    const labRatio = labCompleted / Math.max(relevantLabIds.length, 1);
    const value = Math.round((completionRatio * 45) + (quizRatio * 25) + (phraseRatio * 10) + (labRatio * 20));

    return {
      ...definition,
      value,
      coreCompleted,
      coreTotal: lessons.length,
      quizRecorded,
      phrasePractised,
      phraseTotal: phraseKeys.length,
      labCompleted,
      labTotal: relevantLabIds.length,
    };
  });
  const overall = Math.round(axes.reduce((sum, axis) => sum + axis.value, 0) / Math.max(axes.length, 1));
  const weakest = axes.reduce((lowest, axis) => axis.value < lowest.value ? axis : lowest, axes[0]);
  const hasEvidence = coreDone.length > 0 || labDone.length > 0 || practised.length > 0
    || Object.keys(scores.core).length > 0 || Object.keys(scores.lab).length > 0;
  const completedCoreIds = new Set(coreDone);
  const hasLegacyScoreGap = topics.some((topic) => topic.lessons.some((lesson) => completedCoreIds.has(lesson.id) && !scores.core[lesson.id]));
  return { overall, stage: readinessStage(overall), axes, weakest, hasEvidence, hasLegacyScoreGap };
};

export const validateReadinessMapping = (track: ReadinessTrack, topics: PurposeTopic[], labs: ConvLesson[]) => {
  const definitions = DEFINITIONS[track];
  const mappedTopics = new Set(definitions.map((item) => item.id));
  const mappedLabs = definitions.flatMap((item) => item.labIds);
  return {
    missingTopics: topics.map((topic) => topic.id).filter((id) => !mappedTopics.has(id)),
    missingLabs: labs.map((lesson) => lesson.id).filter((id) => !mappedLabs.includes(id)),
    duplicateLabs: mappedLabs.filter((id, index) => mappedLabs.indexOf(id) !== index),
    unknownLabs: mappedLabs.filter((id) => !labs.some((lesson) => lesson.id === id)),
  };
};