/**
 * @file ieltsLectureQuizPadder.ts
 * @description Guarantees every IELTS lecture exposes ≥5 quiz questions.
 *
 * Many legacy lectures were authored with only 1–4 questions. Instead of
 * hand-editing 190+ records, we derive additional questions from existing
 * lecture fields (goldenSecret, cheatSheetPoints, strategySteps,
 * mistakesToAvoid, practicalExamples, vocabHighlights). The result is a
 * lecture-specific, never-empty quiz tail.
 */
import type { IeltsLecture, LectureQuizQuestion } from "./ieltsLecturesData";

const TARGET = 5;

const truncate = (s: string, n = 140) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s);

function generic(distractorSet: string[][]): string[] {
  // Pick 3 distractors deterministically – first option from each row.
  return distractorSet.slice(0, 3).map(row => row[0]);
}

function buildExtras(l: IeltsLecture, need: number): LectureQuizQuestion[] {
  const out: LectureQuizQuestion[] = [];

  if (l.goldenSecret && out.length < need) {
    out.push({
      question: `What does the Golden Secret of the lecture "${l.title}" emphasise?`,
      options: [
        truncate(l.goldenSecret),
        "Memorise one model answer and reuse it for every prompt.",
        "Skip the outlining step to gain more writing/speaking time.",
        "Copy the question prompt word-for-word into your answer.",
      ],
      answer: 0,
      explanation: l.goldenSecret,
    });
  }

  if (l.cheatSheetPoints?.length && out.length < need) {
    out.push({
      question: "Which point is highlighted in the Cheat Sheet of this lecture?",
      options: [
        truncate(l.cheatSheetPoints[0]),
        "Cram as many idioms as possible, even when they don't fit the context.",
        "Keep answers extremely short to avoid all grammar mistakes.",
        "Avoid giving concrete examples because they waste time.",
      ],
      answer: 0,
      explanation: "This point is listed directly in the lecture's Cheat Sheet section.",
    });
  }

  if (l.mistakesToAvoid?.length && out.length < need) {
    const m = l.mistakesToAvoid[0];
    out.push({
      question: "Which of the following is a MISTAKE to avoid according to this lecture?",
      options: [
        truncate(m.mistake),
        "Plan a quick 60-90 second outline before writing or speaking.",
        "Use a variety of linking words between sentences to boost coherence.",
        "Give concrete examples to illustrate your point.",
      ],
      answer: 0,
      explanation: m.why || m.whyVi || "",
    });
  }

  if (l.strategySteps?.length && out.length < need) {
    const s = l.strategySteps[0];
    out.push({
      question: "What is the FIRST strategy step recommended in this lecture?",
      options: [
        truncate(`${s.title} - ${s.description}`),
        "Start writing or speaking immediately to save time.",
        "Memorise one fixed model answer for every prompt.",
        "Ignore the prompt and answer based on gut feeling.",
      ],
      answer: 0,
      explanation: s.description || s.descriptionVi || "",
    });
  }

  if (l.vocabHighlights?.length && out.length < need) {
    const v = l.vocabHighlights[0];
    out.push({
      question: `In this lecture, the word "${v.word}" is used to mean:`,
      options: [
        truncate(v.definition),
        "A slang word used only in very casual everyday conversation.",
        "A specialised medical term that is inappropriate for IELTS.",
        "An interjection expressing surprise.",
      ],
      answer: 0,
      explanation: `${v.word} - ${v.definition} (Band ${v.band || "7.0+"}).`,
    });
  }

  if (l.practicalExamples?.length && out.length < need) {
    const e = l.practicalExamples[0];
    out.push({
      question: "In which context is the practical example in this lecture set?",
      options: [
        truncate(e.context),
        "It only applies to candidates who have already scored Band 9.0.",
        "It only applies to Listening Section 1.",
        "It only applies to high-school students, not IELTS candidates.",
      ],
      answer: 0,
      explanation: e.explanation || "The real-world context helps you picture how to apply the technique.",
    });
  }

  // Final safety filler – ensure we always reach TARGET.
  while (out.length < need) {
    out.push({
      question: `According to the lecture "${l.title}", which approach is the most effective?`,
      options: [
        "Apply the framework and process taught in the lecture combined with deliberate practice.",
        "Rote-memorise a model answer and reuse it for every prompt.",
        "Ignore the strategy and rely purely on personal instinct.",
        "Focus only on vocabulary and ignore the other skills.",
      ],
      answer: 0,
      explanation:
        l.goldenSecret ||
        l.goldenSecretVi ||
        "Applying the lecture's framework plus deliberate practice is the most sustainable path to a higher band.",
    });
  }

  return out.slice(0, need);
}

export function padLectureQuizzes(lectures: IeltsLecture[]): IeltsLecture[] {
  return lectures.map(l => {
    const current = l.quiz?.length || 0;
    if (current >= TARGET) return l;
    const need = TARGET - current;
    const seenQ = new Set((l.quiz || []).map(q => q.question));
    const extras = buildExtras(l, need + 2).filter(q => !seenQ.has(q.question)).slice(0, need);
    return { ...l, quiz: [...(l.quiz || []), ...extras] };
  });
}
