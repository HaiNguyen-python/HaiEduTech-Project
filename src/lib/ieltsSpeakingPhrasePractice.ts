import { safeStorage } from "@/lib/safeStorage";

export interface PhraseCriterion {
  label: string;
  score: number;
  feedback: string;
}

export interface PhraseSpeakingGrade {
  overall: number;
  phraseUsedCorrectly: boolean;
  criteria: PhraseCriterion[];
  feedback: string;
  correction: string;
  upgradedSentence: string;
}

export interface PhraseSpeakingProgress {
  bestScore: number;
  attempts: number;
  lastPracticed: string;
}

export type PhraseSpeakingProgressStore = Record<string, PhraseSpeakingProgress>;

export const PHRASE_SPEAKING_STORAGE_KEY = "ielts-speaking-phrase-practice:v1";

const EXAMPLE_OVERRIDES: Record<string, string> = {
  "to pursue a career in": "I hope to pursue a career in educational technology after graduation.",
  "a steep learning curve": "My first month at the company involved a steep learning curve.",
  "to juggle responsibilities": "University students often have to juggle responsibilities at home and at school.",
  "a rewarding experience": "Teaching younger learners has been a rewarding experience for me.",
  "to be snowed under with work": "I was snowed under with work before the final deadline.",
  "to climb the career ladder": "Many graduates move abroad to climb the career ladder more quickly.",
  "a nine-to-five job": "A nine-to-five job gives some people a predictable daily routine.",
  "to work under pressure": "Doctors need to work under pressure without losing concentration.",
  "job satisfaction": "A supportive manager can significantly improve job satisfaction.",
  "to meet deadlines": "I use a weekly planner to meet deadlines without feeling overwhelmed.",
  "a hands-on approach": "Our teacher uses a hands-on approach to make science easier to understand.",
  "to broaden one's horizons": "Travelling abroad can broaden my horizons and challenge my assumptions.",
  "an internship opportunity": "An internship opportunity would help me understand the industry better.",
  "to specialize in": "I would like to specialize in data engineering after university.",
  "a fulfilling career": "Helping children learn can lead to a fulfilling career.",
  "to gain practical experience": "Students should volunteer to gain practical experience before graduating.",
  "work-life balance": "Flexible working hours can create a healthier work-life balance.",
  "to develop transferable skills": "Group projects help students to develop transferable skills such as teamwork.",
  "a competitive job market": "Graduates need relevant experience to succeed in a competitive job market.",
  "to take initiative": "Employees who take initiative often earn greater responsibility.",
  "professional development": "Regular training is essential for professional development.",
  "to multitask effectively": "Working parents often learn to multitask effectively.",
};

const cleanPhrase = (phrase: string) => phrase
  .normalize("NFC")
  .replace(/\.{2,}$/g, "")
  .replace(/\bone's\b/gi, "my")
  .replace(/\bsomeone's\b/gi, "a person's")
  .replace(/\bsomeone\b/gi, "people")
  .trim();

const lowerFirst = (value: string) => value ? `${value[0].toLowerCase()}${value.slice(1)}` : value;

export function getPhraseExample(phrase: string, topic: string, part: 1 | 2 | 3): string {
  const key = phrase.trim().toLowerCase().replace(/\.{2,}$/g, "");
  if (EXAMPLE_OVERRIDES[key]) return EXAMPLE_OVERRIDES[key];

  const cleaned = cleanPhrase(phrase).replace(/\s*\/\s*/g, " or ");
  const topicText = topic.toLowerCase().replace(/\s*&\s*/g, " and ");
  if (/^to\s+/i.test(cleaned)) {
    const infinitive = lowerFirst(cleaned);
    if (part === 1) return `In my everyday life, I often try ${infinitive} whenever I can.`;
    if (part === 2) return `That experience taught me how important it is ${infinitive}.`;
    return `Governments and individuals should work together ${infinitive}.`;
  }
  if (/^(a|an)\s+/i.test(cleaned)) {
    if (part === 1) return `${cleaned} has had a positive influence on my daily life.`;
    if (part === 2) return `${cleaned} made the occasion especially memorable for me.`;
    return `${cleaned} can have a significant impact on modern society.`;
  }
  if (/^(in|on|at|from|by|with|without|despite|although|while)\b/i.test(cleaned)) {
    return `${cleaned}, people can make more thoughtful decisions about ${topicText}.`;
  }
  if (/\b(is|are|has|have|plays?|affects?|creates?|helps?|allows?|means?|requires?)\b/i.test(cleaned)) {
    return `${cleaned.charAt(0).toUpperCase()}${cleaned.slice(1)} in many situations related to ${topicText}.`;
  }
  if (part === 1) return `${cleaned} is an important part of my experience with ${topicText}.`;
  if (part === 2) return `${cleaned} was one of the most memorable aspects of the experience.`;
  return `${cleaned} is increasingly important when discussing ${topicText}.`;
}

export const phrasePracticeId = (part: number, topic: string, phrase: string) =>
  `${part}|${topic.trim().toLowerCase()}|${phrase.trim().toLowerCase()}`;

const text = (value: unknown, max = 600) => typeof value === "string" ? value.normalize("NFC").trim().slice(0, max) : "";
const score = (value: unknown) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

export function normalizePhraseSpeakingGrade(value: unknown): PhraseSpeakingGrade | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const upgradedSentence = text(raw.upgradedSentence);
  if (!upgradedSentence) return null;
  const criteria = Array.isArray(raw.criteria)
    ? raw.criteria.slice(0, 4).map((item) => {
      const criterion = item && typeof item === "object" ? item as Record<string, unknown> : {};
      return { label: text(criterion.label, 80), score: score(criterion.score), feedback: text(criterion.feedback) };
    }).filter((item) => item.label && item.feedback)
    : [];
  return {
    overall: score(raw.overall),
    phraseUsedCorrectly: raw.phraseUsedCorrectly === true,
    criteria,
    feedback: text(raw.feedback),
    correction: text(raw.correction),
    upgradedSentence,
  };
}

export function savePhraseSpeakingResult(id: string, overall: number): PhraseSpeakingProgress {
  const store = safeStorage.get<PhraseSpeakingProgressStore>(PHRASE_SPEAKING_STORAGE_KEY, {}) ?? {};
  const previous = store[id];
  const next = {
    bestScore: Math.max(previous?.bestScore ?? 0, score(overall)),
    attempts: (previous?.attempts ?? 0) + 1,
    lastPracticed: new Date().toUTCString(),
  };
  safeStorage.set(PHRASE_SPEAKING_STORAGE_KEY, { ...store, [id]: next });
  return next;
}
