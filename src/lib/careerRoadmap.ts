import { z } from "zod";

export const CAREER_ROADMAP_STORAGE_KEY = "career-roadmap:v1";

export const careerRoadmapInputSchema = z.object({
  role: z.string().trim().min(1).max(80),
  currentLevel: z.string().trim().min(1).max(60),
  background: z.string().trim().max(800),
  hoursPerWeek: z.number().int().min(1).max(80),
  targetMonths: z.number().int().min(1).max(36),
  language: z.enum(["vi", "en"]),
});

const resourceSchema = z.object({
  name: z.string().trim().min(1).max(160),
  type: z.enum(["course", "book", "docs", "youtube"]).catch("docs"),
  url: z.string().trim().max(500).catch(""),
  free: z.boolean().catch(false),
});

const practiceProjectSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(800).catch(""),
  difficulty: z.enum(["easy", "medium", "hard"]).catch("medium"),
  skillsApplied: z.array(z.string().trim().min(1).max(80)).max(20).catch([]),
});

const phaseSchema = z.object({
  phase: z.string().trim().min(1).max(160),
  durationWeeks: z.number().int().min(1).max(260).optional(),
  goals: z.array(z.string().trim().min(1).max(500)).max(20).catch([]),
  topics: z.array(z.string().trim().min(1).max(100)).max(30).catch([]),
  resources: z.array(resourceSchema).max(20).catch([]),
  practiceProjects: z.array(practiceProjectSchema).max(20).catch([]),
  milestone: z.string().trim().max(800).catch(""),
});

export const careerRoadmapSchema = z.object({
  roleSummary: z.string().trim().min(1).max(2400),
  coreSkills: z.array(z.object({
    skill: z.string().trim().min(1).max(120),
    importance: z.enum(["must-have", "nice-to-have"]).catch("nice-to-have"),
    why: z.string().trim().max(500).catch(""),
  })).max(30).catch([]),
  phases: z.array(phaseSchema).min(1).max(16),
  certifications: z.array(z.object({
    name: z.string().trim().min(1).max(180),
    provider: z.string().trim().max(120).catch(""),
    priority: z.enum(["high", "medium", "low"]).catch("low"),
    costUsd: z.number().min(0).max(100000).catch(0),
    whenToTake: z.string().trim().max(300).catch(""),
  })).max(20).catch([]),
  portfolioProjects: z.array(z.object({
    title: z.string().trim().min(1).max(180),
    description: z.string().trim().max(1200).catch(""),
    techStack: z.array(z.string().trim().min(1).max(80)).max(30).catch([]),
    showcaseTip: z.string().trim().max(800).catch(""),
  })).max(20).catch([]),
  interviewPrep: z.object({
    topicsToReview: z.array(z.string().trim().min(1).max(120)).max(30).catch([]),
    commonQuestions: z.array(z.string().trim().min(1).max(500)).max(20).catch([]),
    behavioralTips: z.string().trim().max(1200).catch(""),
  }).optional(),
  jobSearchStrategy: z.object({
    targetCompanies: z.array(z.string().trim().min(1).max(160)).max(20).catch([]),
    platformsToUse: z.array(z.string().trim().min(1).max(120)).max(20).catch([]),
    cvHighlights: z.array(z.string().trim().min(1).max(500)).max(20).catch([]),
  }).optional(),
  weeklySchedule: z.object({
    weekdays: z.string().trim().max(1000).catch(""),
    weekends: z.string().trim().max(1000).catch(""),
    dailyHabits: z.array(z.string().trim().min(1).max(300)).max(20).catch([]),
  }).optional(),
  warningTraps: z.array(z.string().trim().min(1).max(500)).max(20).catch([]),
  haiEduRecommendation: z.string().trim().max(1600).catch(""),
});

export type CareerRoadmapInput = z.infer<typeof careerRoadmapInputSchema>;
export type CareerRoadmapData = z.infer<typeof careerRoadmapSchema>;

export interface StoredCareerRoadmap {
  version: 1;
  form: {
    role: string;
    customRole: string;
    currentLevel: string;
    hoursPerWeek: number;
    targetMonths: number;
  };
  roadmap: CareerRoadmapData | null;
  citations: string[];
  completedProjects: Record<string, boolean>;
}

export const clampInteger = (value: number, min: number, max: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, Math.round(value))) : fallback;

export const safeExternalUrl = (value: unknown): string | null => {
  if (typeof value !== "string" || value.length > 500) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
};

export const projectProgressId = (phase: string, title: string) =>
  `${phase.trim().toLowerCase()}::${title.trim().toLowerCase()}`;

export const parseCareerRoadmap = (value: unknown): CareerRoadmapData | null => {
  const result = careerRoadmapSchema.safeParse(value);
  return result.success ? result.data : null;
};

export const parseStoredCareerRoadmap = (value: unknown): StoredCareerRoadmap | null => {
  if (!value || typeof value !== "object") return null;
  const stored = value as Partial<StoredCareerRoadmap>;
  if (stored.version !== 1 || !stored.form) return null;
  const roadmap = stored.roadmap ? parseCareerRoadmap(stored.roadmap) : null;
  return {
    version: 1,
    form: {
      role: typeof stored.form.role === "string" ? stored.form.role : "data-engineer",
      customRole: typeof stored.form.customRole === "string" ? stored.form.customRole.slice(0, 80) : "",
      currentLevel: typeof stored.form.currentLevel === "string" ? stored.form.currentLevel : "complete-beginner",
      hoursPerWeek: clampInteger(Number(stored.form.hoursPerWeek), 1, 80, 10),
      targetMonths: clampInteger(Number(stored.form.targetMonths), 1, 36, 6),
    },
    roadmap,
    citations: Array.isArray(stored.citations)
      ? stored.citations.map(safeExternalUrl).filter((url): url is string => Boolean(url)).slice(0, 8)
      : [],
    completedProjects: stored.completedProjects && typeof stored.completedProjects === "object"
      ? Object.fromEntries(Object.entries(stored.completedProjects).filter(([, done]) => done === true).slice(0, 100))
      : {},
  };
};