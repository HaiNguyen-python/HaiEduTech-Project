import { SWEDISH_SAMPLE_ESSAYS } from "./swedishSampleEssays";
import { SWEDISH_WRITING_PROMPTS, type SwedishLevel } from "./swedishWritingPrompts";

/** Typing sentences taken from the model answers of the Swedish YKI Writing prompts. */
export interface SwedishYkiTypingSentence {
  id: string;
  level: SwedishLevel;
  sv: string;
  vi: string;
  promptId: string;
  promptTitleVi: string;
  promptTitleEn: string;
  taskSv: string;
}

export function splitSwedishSentences(text: string): string[] {
  return text.split(/\n+/).flatMap(line => line.match(/[^.!?]+(?:[.!?]+["”]?|$)/g) ?? []).map(s => s.trim().normalize("NFC")).filter(Boolean);
}

export const SWEDISH_YKI_TYPING_SENTENCES: SwedishYkiTypingSentence[] = SWEDISH_SAMPLE_ESSAYS.flatMap(essay => {
  const prompt = SWEDISH_WRITING_PROMPTS.find(p => p.id === essay.id);
  if (!prompt) return [];
  const sv = splitSwedishSentences(essay.essaySv);
  const vi = splitSwedishSentences(essay.essayVi);
  const aligned = sv.length === vi.length;
  return sv.flatMap((sentence, i) => sentence.split(/\s+/).length < 3 ? [] : [{
    id: `sv-yki-typing-${essay.id}-${i + 1}`,
    level: essay.level,
    sv: sentence,
    vi: aligned ? vi[i] : "",
    promptId: prompt.id,
    promptTitleVi: prompt.titleVi,
    promptTitleEn: prompt.titleEn,
    taskSv: prompt.taskSv,
  }]);
});
