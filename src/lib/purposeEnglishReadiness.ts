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
  shortEn: string;
  shortVi: string;
  labIds: string[];
}

const DEFINITIONS: Record<ReadinessTrack, AxisDefinition[]> = {
  business: [
    { id: "biz-email", labelEn: "Professional email", labelVi: "Email chuyên nghiệp", shortEn: "Email", shortVi: "Email", labIds: ["pro-05-emails", "pro-08-remote-work"] },
    { id: "biz-meetings", labelEn: "Meetings", labelVi: "Họp và thảo luận", shortEn: "Meetings", shortVi: "Họp", labIds: ["pro-03-meetings", "pro-06-conflict", "pro-10-leadership", "pro-20-mentoring", "pro-22-difficult-coworkers"] },
    { id: "biz-presenting", labelEn: "Presenting data", labelVi: "Trình bày dữ liệu", shortEn: "Presenting", shortVi: "Trình bày", labIds: ["pro-04-presentations", "pro-16-startup-pitch", "pro-18-public-speaking", "pro-21-product-demos"] },
    { id: "biz-calls", labelEn: "Calls & rapport", labelVi: "Gọi điện và tạo quan hệ", shortEn: "Calls", shortVi: "Gọi điện", labIds: ["pro-02-networking", "pro-11-onboarding", "pro-13-workplace-culture", "pro-17-cross-cultural"] },
    { id: "biz-negotiation", labelEn: "Negotiation", labelVi: "Đàm phán và khiếu nại", shortEn: "Negotiation", shortVi: "Đàm phán", labIds: ["pro-07-negotiation", "pro-09-customer-service", "pro-12-freelancing", "pro-19-salary-negotiation"] },
    { id: "biz-career", labelEn: "CV & interviews", labelVi: "CV và phỏng vấn", shortEn: "Interviews", shortVi: "Phỏng vấn", labIds: ["pro-01-interviews", "pro-14-job-search", "pro-15-performance-review", "pro-23-quitting-job"] },
  ],
  academic: [
    { id: "aca-vocab", labelEn: "Academic vocabulary", labelVi: "Từ vựng học thuật", shortEn: "Vocabulary", shortVi: "Từ vựng", labIds: ["acad-05-environment", "acad-06-technology", "acad-08-global-issues", "acad-13-ai-future"] },
    { id: "aca-style", labelEn: "Style & precision", labelVi: "Văn phong và chính xác", shortEn: "Style", shortVi: "Văn phong", labIds: ["acad-01-debates", "acad-02-opinions", "acad-04-culture"] },
    { id: "aca-writing", labelEn: "Academic writing", labelVi: "Viết học thuật", shortEn: "Writing", shortVi: "Viết", labIds: ["acad-07-academic-writing", "acad-18-essays"] },
    { id: "aca-reading", labelEn: "Reading & analysis", labelVi: "Đọc và phân tích", shortEn: "Reading", shortVi: "Đọc", labIds: ["acad-09-media-literacy", "acad-11-research"] },
    { id: "aca-listening", labelEn: "Lectures & notes", labelVi: "Nghe giảng và ghi chú", shortEn: "Lectures", shortVi: "Nghe giảng", labIds: ["acad-03-study-abroad", "acad-10-personal-development", "acad-12-class-discussions", "acad-14-mental-health"] },
    { id: "aca-integrity", labelEn: "Citation & seminars", labelVi: "Trích dẫn và seminar", shortEn: "Seminars", shortVi: "Seminar", labIds: ["acad-15-volunteering", "acad-16-presentations", "acad-17-group-projects", "acad-19-internships", "acad-20-life-after-graduation"] },
  ],
};

export const READINESS_CERTIFICATE_MIN = 70;

export interface CertificateStatus {
  eligible: boolean;
  coreCompleted: number;
  coreTotal: number;
  labCompleted: number;
  labTotal: number;
  overall: number;
  required: number;
  missingCore: number;
  missingLab: number;
  missingPoints: number;
}

export const buildCertificateStatus = ({
  topics,
  labs,
  coreDone,
  labDone,
  overall,
}: {
  topics: PurposeTopic[];
  labs: ConvLesson[];
  coreDone: string[];
  labDone: string[];
  overall: number;
}): CertificateStatus => {
  const coreIds = topics.flatMap((topic) => topic.lessons.map((lesson) => lesson.id));
  const labIds = labs.map((lesson) => lesson.id);
  const coreCompleted = coreIds.filter((id) => coreDone.includes(id)).length;
  const labCompleted = labIds.filter((id) => labDone.includes(id)).length;
  const missingCore = coreIds.length - coreCompleted;
  const missingLab = labIds.length - labCompleted;
  const missingPoints = Math.max(READINESS_CERTIFICATE_MIN - overall, 0);
  return {
    eligible: missingCore === 0 && missingLab === 0 && missingPoints === 0 && coreIds.length > 0,
    coreCompleted,
    coreTotal: coreIds.length,
    labCompleted,
    labTotal: labIds.length,
    overall,
    required: READINESS_CERTIFICATE_MIN,
    missingCore,
    missingLab,
    missingPoints,
  };
};

/** Deterministic, human-readable certificate code for a track + learner name. */
export const certificateCode = (track: ReadinessTrack, name: string): string => {
  const seed = `${track}|${name.trim().toLowerCase()}`;
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const suffix = (hash >>> 0).toString(36).toUpperCase().padStart(7, "0");
  return `HET-${track === "business" ? "BUS" : "ACA"}-${suffix}`;
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
    const labScored = relevantLabIds.filter((id) => scores.lab[id]).length;
    const labScoreRatio = relevantLabIds.reduce((sum, id) => {
      const result = scores.lab[id];
      return sum + (result && result.maxScore > 0 ? result.score / result.maxScore : 0);
    }, 0) / Math.max(relevantLabIds.length, 1);
    const completionRatio = coreCompleted / Math.max(lessons.length, 1);
    const phraseRatio = phrasePractised / Math.max(phraseKeys.length, 1);
    const labRatio = labCompleted / Math.max(relevantLabIds.length, 1);
    const value = Math.min(
      100,
      Math.round((completionRatio * 45) + (quizRatio * 25) + (phraseRatio * 10) + (labRatio * 10) + (labScoreRatio * 10)),
    );

    return {
      id: definition.id,
      labelEn: definition.labelEn,
      labelVi: definition.labelVi,
      shortEn: definition.shortEn,
      shortVi: definition.shortVi,
      value,
      coreCompleted,
      coreTotal: lessons.length,
      quizRecorded,
      phrasePractised,
      phraseTotal: phraseKeys.length,
      labCompleted,
      labTotal: relevantLabIds.length,
      labScored,
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