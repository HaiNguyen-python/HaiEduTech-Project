export type SentenceGradeInput = {
  mode: "vocabulary" | "structure";
  part: 1 | 2 | 3;
  topic: string;
  phrase: string;
  meaning: string;
  example: string;
  transcript: string;
};

export const normalizeText = (value: unknown, max: number): string =>
  typeof value === "string"
    ? [...value.normalize("NFC")]
      .map((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 ? " " : character)
      .join("")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, max)
    : "";

export function parseSentenceGradeInput(value: unknown): SentenceGradeInput | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const part = Number(raw.part);
  const input = {
    mode: raw.mode === "structure" ? "structure" : "vocabulary",
    part: part === 2 || part === 3 ? part : 1,
    topic: normalizeText(raw.topic, 120),
    phrase: normalizeText(raw.phrase, 160),
    meaning: normalizeText(raw.meaning, 220),
    example: normalizeText(raw.example, 320),
    transcript: normalizeText(raw.transcript, 800),
  } as SentenceGradeInput;
  const transcriptWords = input.transcript.split(/\s+/).filter(Boolean);
  return input.topic && input.phrase && input.meaning && input.example && transcriptWords.length >= 3 ? input : null;
}

export function buildSentenceGradePrompt(input: SentenceGradeInput): string {
  const targetLabel = input.mode === "structure" ? "Target structure" : "Target phrase";
  const firstCriterion = input.mode === "structure" ? "Structure use" : "Phrase use";
  return `Grade one short spoken IELTS sentence. The text is an automatic speech-recognition transcript, so ignore punctuation and capitalization.

IELTS Part: ${input.part}
Topic: ${input.topic}
Practice type: ${input.mode}
${targetLabel}: ${input.phrase}
Meaning or function: ${input.meaning}
Reference example: ${input.example}
Learner transcript: ${input.transcript}

Return exactly four criteria in this order and with these labels: ${firstCriterion}, Grammar, Naturalness and collocation, Recognition clarity. Score each criterion from 0 to 100. Infer recognition clarity only from the transcript. Do not claim to hear audio. Give credit for valid grammatical variations and naturally completed slots. The overall score is the rounded average of exactly these four scores. Feedback must be concise, specific, supportive, and written in English. If the target is missing or misused, state that clearly. Correction is the smallest natural correction. Upgraded sentence is one polished IELTS-ready sentence preserving the learner's meaning.`;
}

export const clampGrade = (value: unknown) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
