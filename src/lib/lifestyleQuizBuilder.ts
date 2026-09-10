/**
 * @file lifestyleQuizBuilder.ts
 * @description Builds a deterministic 4-question bilingual quiz for every
 *              Lifestyle Academy lesson. Correct answers come from the
 *              lesson itself (framework, takeaways, drill); distractors are
 *              borrowed from sibling lessons in other pillars so they read
 *              plausibly but are clearly not this lesson's content.
 *              Deterministic: the same lesson always yields the same quiz.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { LIFESTYLE_LESSONS, type LifestyleLesson } from "@/data/lifestyleAcademyLessons";
import { LIFESTYLE_QUIZ_OVERRIDES } from "@/data/lifestyleQuizzes";

export interface LifestyleQuizOption {
  vi: string;
  en: string;
}

export interface LifestyleQuizQuestion {
  questionVi: string;
  questionEn: string;
  options: LifestyleQuizOption[];
  answer: number;
  explanationVi: string;
  explanationEn: string;
}

const trim = (s: string, n = 170) => {
  const clean = (s || "").trim().replace(/\s+/g, " ");
  if (clean.length <= n) return clean;
  const cut = clean.slice(0, n);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut) + "...";
};

/** Small stable string hash so option order never changes between renders. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Deterministic rotation of an option list; returns options + answer index. */
function arrange(correct: LifestyleQuizOption, distractors: LifestyleQuizOption[], seed: string) {
  const opts = [correct, ...distractors].slice(0, 4);
  const shift = hash(seed) % opts.length;
  const rotated = [...opts.slice(shift), ...opts.slice(0, shift)];
  return { options: rotated, answer: rotated.indexOf(correct) };
}

type Extractor = (l: LifestyleLesson) => LifestyleQuizOption | null;

/** Picks distractor texts from lessons that are NOT the current lesson. */
function pickDistractors(
  lesson: LifestyleLesson,
  pool: LifestyleLesson[],
  extract: Extractor,
  seed: string,
  taken: Set<string>,
): LifestyleQuizOption[] {
  const out: LifestyleQuizOption[] = [];
  const start = hash(seed) % Math.max(pool.length, 1);
  for (let step = 0; step < pool.length && out.length < 3; step++) {
    const candidate = pool[(start + step * 7 + 1) % pool.length];
    if (!candidate || candidate.id === lesson.id) continue;
    const value = extract(candidate);
    if (!value) continue;
    const key = value.en.toLowerCase();
    if (taken.has(key)) continue;
    taken.add(key);
    out.push(value);
  }
  return out;
}

const frameworkOf: Extractor = (l) =>
  l.frameworkVi && l.frameworkEn ? { vi: trim(l.frameworkVi), en: trim(l.frameworkEn) } : null;

const drillOf: Extractor = (l) =>
  l.drillVi && l.drillEn ? { vi: trim(l.drillVi), en: trim(l.drillEn) } : null;

const takeawayOf = (index: number): Extractor => (l) => {
  const tk = l.takeaways?.[index % Math.max(l.takeaways.length, 1)];
  return tk ? { vi: trim(tk.vi), en: trim(tk.en) } : null;
};

function buildQuiz(lesson: LifestyleLesson): LifestyleQuizQuestion[] {
  const pool = LIFESTYLE_LESSONS;
  const questions: LifestyleQuizQuestion[] = [];
  const titleVi = lesson.titleVi;
  const titleEn = lesson.titleEn;

  // 1. Framework
  const fw = frameworkOf(lesson);
  if (fw) {
    const taken = new Set([fw.en.toLowerCase()]);
    const { options, answer } = arrange(
      fw,
      pickDistractors(lesson, pool, frameworkOf, lesson.id + "fw", taken),
      lesson.id + "-fw",
    );
    questions.push({
      questionVi: `Khung tư duy chính của bài "${titleVi}" là gì?`,
      questionEn: `Which framework does the lesson "${titleEn}" actually teach?`,
      options,
      answer,
      explanationVi: lesson.frameworkVi,
      explanationEn: lesson.frameworkEn,
    });
  }

  // 2 & 3. Takeaways
  for (let k = 0; k < 2; k++) {
    const tk = lesson.takeaways?.[k];
    if (!tk) break;
    const correct = { vi: trim(tk.vi), en: trim(tk.en) };
    const taken = new Set<string>([
      correct.en.toLowerCase(),
      ...lesson.takeaways.map((x) => trim(x.en).toLowerCase()),
    ]);
    const { options, answer } = arrange(
      correct,
      pickDistractors(lesson, pool, takeawayOf(k), lesson.id + "tk" + k, taken),
      lesson.id + "-tk" + k,
    );
    questions.push({
      questionVi:
        k === 0
          ? `Điều nào sau đây là một điểm cốt lõi của bài "${titleVi}"?`
          : `Còn điểm cốt lõi nào nữa thuộc bài "${titleVi}"?`,
      questionEn:
        k === 0
          ? `Which of these is a core takeaway of "${titleEn}"?`
          : `Which is another core takeaway of "${titleEn}"?`,
      options,
      answer,
      explanationVi: tk.vi,
      explanationEn: tk.en,
    });
  }

  // 4. Practical drill
  const dr = drillOf(lesson);
  if (dr) {
    const taken = new Set([dr.en.toLowerCase()]);
    const { options, answer } = arrange(
      dr,
      pickDistractors(lesson, pool, drillOf, lesson.id + "dr", taken),
      lesson.id + "-dr",
    );
    questions.push({
      questionVi: `Bài tập thực hành mà bài học này đề xuất là gì?`,
      questionEn: `Which practical drill does this lesson prescribe?`,
      options,
      answer,
      explanationVi: lesson.drillVi,
      explanationEn: lesson.drillEn,
    });
  }

  // Safety filler so every lesson always exposes 4 questions.
  while (questions.length < 4) {
    const correct: LifestyleQuizOption = {
      vi: trim(lesson.whyItMattersVi || lesson.subtitleVi),
      en: trim(lesson.whyItMattersEn || lesson.subtitleEn),
    };
    const taken = new Set([correct.en.toLowerCase()]);
    const { options, answer } = arrange(
      correct,
      pickDistractors(
        lesson,
        pool,
        (l) => ({ vi: trim(l.subtitleVi), en: trim(l.subtitleEn) }),
        lesson.id + "why" + questions.length,
        taken,
      ),
      lesson.id + "-why" + questions.length,
    );
    questions.push({
      questionVi: `Vì sao bài "${titleVi}" quan trọng với bạn?`,
      questionEn: `Why does the lesson "${titleEn}" matter?`,
      options,
      answer,
      explanationVi: lesson.whyItMattersVi || lesson.subtitleVi,
      explanationEn: lesson.whyItMattersEn || lesson.subtitleEn,
    });
  }

  return questions.slice(0, 4);
}

const cache = new Map<string, LifestyleQuizQuestion[]>();

export function getLessonQuiz(lesson: LifestyleLesson): LifestyleQuizQuestion[] {
  const override = LIFESTYLE_QUIZ_OVERRIDES[lesson.id];
  if (override) return override;
  const cached = cache.get(lesson.id);
  if (cached) return cached;
  const built = buildQuiz(lesson);
  cache.set(lesson.id, built);
  return built;
}

/** Pass mark: 3 of 4 correct (75%). */
export const LIFESTYLE_QUIZ_PASS_RATIO = 0.75;
