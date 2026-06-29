/**
 * Runtime expander for ConvLesson.listeningChallenge:
 *  - Lengthens the spoken transcript by weaving in extra contextual lines
 *    drawn from the lesson's own keySituations.sampleDialogue (real, on-topic
 *    content — not random filler).
 *  - Tops the question list up to MIN_QUESTIONS (5) by generating extra
 *    comprehension questions from the lesson vocabulary and situation titles.
 *
 * Pure function. No side effects on the original lesson object.
 */
import type { ConvLesson, ListeningChallenge } from "@/data/conversationalCurriculum";

const MIN_QUESTIONS = 5;
const MIN_TRANSCRIPT_CHARS = 520; // ~ 90-110s of slow TTS

const shuffleStable = <T,>(arr: T[], seed: number): T[] => {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

function extendTranscript(lesson: ConvLesson, base: string): string {
  if (base.length >= MIN_TRANSCRIPT_CHARS) return base;
  const situations = lesson.keySituations || [];
  if (!situations.length) return base;

  // Pick the ONE situation whose sampleDialogue best matches the base
  // transcript, so the appended lines belong to the same scene/conversation
  // (no mixing "elevator pitch" with "post-presentation chat", etc).
  let bestSit = situations[0];
  let bestScore = -1;
  for (const sit of situations) {
    let score = 0;
    for (const turn of sit.sampleDialogue || []) {
      const line = turn.line?.trim();
      if (line && base.includes(line)) score += line.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestSit = sit;
    }
  }

  // Fallback: if no situation overlaps, pick deterministically by lesson id.
  if (bestScore <= 0) {
    const seed = hash(lesson.id) % situations.length;
    bestSit = situations[seed];
  }

  let result = base.trim();
  for (const turn of bestSit.sampleDialogue || []) {
    if (result.length >= MIN_TRANSCRIPT_CHARS) break;
    const line = turn.line?.trim();
    if (!line || result.includes(line)) continue;
    const speaker = turn.speaker?.trim() || "Speaker";
    result += `\n${speaker}: ${line}`;
  }
  return result;
}


function buildVocabQuestion(
  lesson: ConvLesson,
  idx: number,
): ListeningChallenge["questions"][number] | null {
  const vocab = lesson.vocabulary || [];
  if (!vocab.length) return null;
  const entry = vocab[idx % vocab.length];
  if (!entry?.term || !entry.meaningEn) return null;

  const distractors = vocab
    .filter((v) => v.term !== entry.term && v.meaningEn)
    .slice(0, 6)
    .map((v) => v.meaningEn);
  const seed = hash(lesson.id + entry.term);
  const pool = shuffleStable(distractors, seed).slice(0, 3);
  while (pool.length < 3) pool.push("None of the above");

  const options = shuffleStable([entry.meaningEn, ...pool], seed + 7);
  const answer = options.indexOf(entry.meaningEn);
  return {
    q: `What does "${entry.term}" mean?`,
    qVi: `"${entry.term}" có nghĩa là gì?`,
    options,
    answer: Math.max(0, answer),
  };
}

function buildSituationQuestion(
  lesson: ConvLesson,
  idx: number,
): ListeningChallenge["questions"][number] | null {
  const sits = lesson.keySituations || [];
  if (!sits.length) return null;
  const sit = sits[idx % sits.length];
  if (!sit?.title) return null;

  const distractors = sits.filter((s) => s.title !== sit.title).map((s) => s.title);
  const fallback = ["Casual chat with friends", "Filling out a form", "Reading the news"];
  const pool = [...distractors, ...fallback].slice(0, 3);
  const seed = hash(lesson.id + sit.title + idx);
  const options = shuffleStable([sit.title, ...pool], seed);
  const answer = options.indexOf(sit.title);
  return {
    q: `Which situation is the conversation about?`,
    qVi: `Đoạn hội thoại nói về tình huống nào?`,
    options,
    answer: Math.max(0, answer),
  };
}

export function expandListeningChallenge(lesson: ConvLesson): ListeningChallenge {
  const original = lesson.listeningChallenge;
  if (!original) return original;

  const transcript = extendTranscript(lesson, original.transcript || "");
  const questions = original.questions ? original.questions.slice() : [];

  let generatorIdx = 0;
  const generators = [buildVocabQuestion, buildSituationQuestion, buildVocabQuestion, buildVocabQuestion];

  while (questions.length < MIN_QUESTIONS && generatorIdx < generators.length * 3) {
    const fn = generators[generatorIdx % generators.length];
    const q = fn(lesson, generatorIdx);
    if (q && !questions.some((existing) => existing.q === q.q)) {
      questions.push(q);
    }
    generatorIdx++;
  }

  return {
    ...original,
    transcript,
    questions,
  };
}
