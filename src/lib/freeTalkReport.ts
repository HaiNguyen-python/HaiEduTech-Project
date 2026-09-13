export interface SafeFreeTalkReport {
  score: number;
  fluency: string;
  vocabulary: string;
  grammarFixes: string[];
  strengths: string[];
  modelAnswer: string;
  followUps: string[];
}

const strings = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];

export function normalizeFreeTalkReport(value: unknown): SafeFreeTalkReport | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const numericScore = typeof raw.score === "number" ? raw.score : Number(raw.score);
  return {
    score: Number.isFinite(numericScore) ? Math.max(0, Math.min(100, Math.round(numericScore))) : 0,
    fluency: typeof raw.fluency === "string" ? raw.fluency : "",
    vocabulary: typeof raw.vocabulary === "string" ? raw.vocabulary : "",
    grammarFixes: strings(raw.grammarFixes),
    strengths: strings(raw.strengths),
    modelAnswer: typeof raw.modelAnswer === "string" ? raw.modelAnswer : "",
    followUps: strings(raw.followUps),
  };
}