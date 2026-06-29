/**
 * Runtime expander for ChineseConvLesson.listeningChallenge.
 * Mirrors listeningChallengeExpander.ts but preserves Pinyin alignment.
 */
import type {
  ChineseConvLesson,
  ChineseListeningChallenge,
} from "@/data/chineseConversationalCurriculum";

const MIN_QUESTIONS = 5;
const MIN_TRANSCRIPT_CHARS = 220; // Chinese is more dense per char

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const shuffleStable = <T,>(arr: T[], seed: number): T[] => {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

function extendChineseTranscript(
  lesson: ChineseConvLesson,
  base: { zh: string; pinyin: string; en?: string },
): { zh: string; pinyin: string; en?: string } {
  if (base.zh.length >= MIN_TRANSCRIPT_CHARS) return base;
  const situations = lesson.keySituations || [];
  if (!situations.length) return base;

  // Pick the situation whose sampleDialogue best matches the base transcript
  // so appended lines stay within the same coherent conversation.
  let bestSit = situations[0];
  let bestScore = -1;
  for (const sit of situations) {
    let score = 0;
    for (const turn of sit.sampleDialogue || []) {
      if (turn.line && base.zh.includes(turn.line)) score += turn.line.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestSit = sit;
    }
  }
  if (bestScore <= 0) {
    bestSit = situations[hash(lesson.id) % situations.length];
  }

  let zh = base.zh.trim();
  let pinyin = base.pinyin.trim();
  let en = (base.en || "").trim();
  for (const turn of bestSit.sampleDialogue || []) {
    if (zh.length >= MIN_TRANSCRIPT_CHARS) break;
    if (!turn.line || !turn.pinyin) continue;
    if (zh.includes(turn.line)) continue;
    const speaker = turn.speaker || "Speaker";
    zh += `\n${speaker}:${turn.line}`;
    pinyin += `\n${speaker}: ${turn.pinyin}`;
    const enLine = turn.translationEn || turn.translationVi;
    if (enLine) en += `\n${speaker}: ${enLine}`;
  }
  return { zh, pinyin, en: en || base.en };
}


function buildVocabQuestion(lesson: ChineseConvLesson, idx: number) {
  const vocab = lesson.vocabulary || [];
  if (!vocab.length) return null;
  const entry = vocab[idx % vocab.length];
  if (!entry?.hanzi || !entry.meaningEn) return null;
  const distractors = vocab
    .filter((v) => v.hanzi !== entry.hanzi && v.meaningEn)
    .map((v) => v.meaningEn)
    .slice(0, 6);
  const seed = hash(lesson.id + entry.hanzi);
  const pool = shuffleStable(distractors, seed).slice(0, 3);
  while (pool.length < 3) pool.push("None of the above");
  const options = shuffleStable([entry.meaningEn, ...pool], seed + 7);
  return {
    q: `What does "${entry.hanzi}" (${entry.pinyin}) mean?`,
    qVi: `"${entry.hanzi}" (${entry.pinyin}) nghĩa là gì?`,
    options,
    answer: Math.max(0, options.indexOf(entry.meaningEn)),
  };
}

function buildSituationQuestion(lesson: ChineseConvLesson, idx: number) {
  const sits = lesson.keySituations || [];
  if (!sits.length) return null;
  const sit = sits[idx % sits.length];
  if (!sit?.title) return null;
  const distractors = sits.filter((s) => s.title !== sit.title).map((s) => s.title);
  const fallback = ["Casual chat with friends", "Filling out a form", "Reading the news"];
  const pool = [...distractors, ...fallback].slice(0, 3);
  const seed = hash(lesson.id + sit.title + idx);
  const options = shuffleStable([sit.title, ...pool], seed);
  return {
    q: `Which situation is the conversation about?`,
    qVi: `Đoạn hội thoại nói về tình huống nào?`,
    options,
    answer: Math.max(0, options.indexOf(sit.title)),
  };
}

export function expandChineseListeningChallenge(
  lesson: ChineseConvLesson,
): ChineseListeningChallenge {
  const original = lesson.listeningChallenge;
  if (!original) return original;

  const extended = extendChineseTranscript(lesson, {
    zh: original.transcript || "",
    pinyin: original.transcriptPinyin || "",
    en: original.transcriptEn,
  });

  const questions = original.questions ? original.questions.slice() : [];
  const generators = [buildVocabQuestion, buildSituationQuestion, buildVocabQuestion, buildVocabQuestion];
  let gi = 0;
  while (questions.length < MIN_QUESTIONS && gi < generators.length * 3) {
    const q = generators[gi % generators.length](lesson, gi);
    if (q && !questions.some((existing) => existing.q === q.q)) questions.push(q);
    gi++;
  }

  return {
    ...original,
    transcript: extended.zh,
    transcriptPinyin: extended.pinyin,
    transcriptEn: extended.en,
    questions,
  };
}
