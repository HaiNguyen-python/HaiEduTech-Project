import { allGrammarModules } from "@/data/languageCurriculum";

interface GrammarActivityRecord {
  activity_type: string;
  activity_id: string | null;
  score: number | null;
  max_score: number | null;
  created_at: string;
  metadata?: Record<string, any> | null;
}

export interface GrammarLessonProgress {
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  accuracy: number;
  attempts: number;
  lastPracticedAt: string;
  href: string;
}

export interface GrammarRecommendation {
  lessonId: string;
  lessonTitle: string;
  moduleId: string;
  moduleTitle: string;
  href: string;
  reason: string;
  reasonVi: string;
}

export interface GrammarProgressSnapshot {
  totalLessons: number;
  practicedLessons: number;
  averageAccuracy: number;
  practicedModules: number;
  perLesson: GrammarLessonProgress[];
  nextRecommendation: GrammarRecommendation | null;
}

const grammarLessons = allGrammarModules.flatMap((module) =>
  module.lessons.map((lesson, lessonIndex) => ({
    lessonId: lesson.id,
    lessonTitle: lesson.titleEn || lesson.title,
    moduleId: module.id,
    moduleTitle: module.titleEn || module.title,
    href: `/english/learn/${module.id}/${lesson.id}`,
    level: lesson.level,
    difficulty: lesson.difficulty,
    order: lessonIndex,
  }))
);

const grammarLessonMap = new Map(grammarLessons.map((lesson) => [lesson.lessonId, lesson]));

export const isGrammarQuizActivity = (activity: GrammarActivityRecord) =>
  activity.activity_type === "language_lesson_quiz" && !!activity.activity_id && grammarLessonMap.has(activity.activity_id);

export function buildGrammarProgressSnapshot(
  activities: GrammarActivityRecord[]
): GrammarProgressSnapshot {
  const grammarActivities = activities.filter(isGrammarQuizActivity);
  const perLessonMap = new Map<string, { totalPct: number; attempts: number; lastPracticedAt: string }>();

  for (const activity of grammarActivities) {
    if (!activity.activity_id || activity.score === null || !activity.max_score) continue;
    const pct = Math.max(0, Math.min(100, (activity.score / activity.max_score) * 100));
    const current = perLessonMap.get(activity.activity_id);

    if (!current) {
      perLessonMap.set(activity.activity_id, {
        totalPct: pct,
        attempts: 1,
        lastPracticedAt: activity.created_at,
      });
      continue;
    }

    current.totalPct += pct;
    current.attempts += 1;
    if (new Date(activity.created_at).getTime() > new Date(current.lastPracticedAt).getTime()) {
      current.lastPracticedAt = activity.created_at;
    }
  }

  const perLesson: GrammarLessonProgress[] = Array.from(perLessonMap.entries())
    .map(([lessonId, record]) => {
      const lesson = grammarLessonMap.get(lessonId)!;
      return {
        lessonId,
        lessonTitle: lesson.lessonTitle,
        moduleId: lesson.moduleId,
        moduleTitle: lesson.moduleTitle,
        accuracy: Math.round((record.totalPct / record.attempts) * 10) / 10,
        attempts: record.attempts,
        lastPracticedAt: record.lastPracticedAt,
        href: lesson.href,
      };
    })
    .sort((a, b) => new Date(b.lastPracticedAt).getTime() - new Date(a.lastPracticedAt).getTime());

  const practicedModules = new Set(perLesson.map((item) => item.moduleId)).size;
  const averageAccuracy = perLesson.length
    ? Math.round((perLesson.reduce((sum, item) => sum + item.accuracy, 0) / perLesson.length) * 10) / 10
    : 0;

  const weakestLesson = [...perLesson].sort((a, b) => a.accuracy - b.accuracy || a.attempts - b.attempts)[0];
  const firstUnpracticed = grammarLessons
    .slice()
    .sort((a, b) => a.level - b.level || a.order - b.order)
    .find((lesson) => !perLessonMap.has(lesson.lessonId));

  const nextRecommendation: GrammarRecommendation | null = weakestLesson && weakestLesson.accuracy < 80
    ? {
        lessonId: weakestLesson.lessonId,
        lessonTitle: weakestLesson.lessonTitle,
        moduleId: weakestLesson.moduleId,
        moduleTitle: weakestLesson.moduleTitle,
        href: weakestLesson.href,
        reason: weakestLesson.accuracy < 60
          ? "Rebuild this grammar rule before moving on."
          : "A quick review here will strengthen your accuracy.",
        reasonVi: weakestLesson.accuracy < 60
          ? "Nên củng cố lại quy tắc này trước khi học tiếp."
          : "Ôn nhanh bài này sẽ giúp tăng độ chính xác rõ rệt.",
      }
    : firstUnpracticed
      ? {
          lessonId: firstUnpracticed.lessonId,
          lessonTitle: firstUnpracticed.lessonTitle,
          moduleId: firstUnpracticed.moduleId,
          moduleTitle: firstUnpracticed.moduleTitle,
          href: firstUnpracticed.href,
          reason: "This is the clearest next grammar lesson you have not practiced yet.",
          reasonVi: "Đây là bài ngữ pháp tiếp theo rõ ràng nhất mà bạn chưa luyện.",
        }
      : weakestLesson
        ? {
            lessonId: weakestLesson.lessonId,
            lessonTitle: weakestLesson.lessonTitle,
            moduleId: weakestLesson.moduleId,
            moduleTitle: weakestLesson.moduleTitle,
            href: weakestLesson.href,
            reason: "Keep sharpening this rule to maintain strong accuracy.",
            reasonVi: "Tiếp tục mài sắc quy tắc này để giữ độ chính xác cao.",
          }
        : grammarLessons[0]
          ? {
              lessonId: grammarLessons[0].lessonId,
              lessonTitle: grammarLessons[0].lessonTitle,
              moduleId: grammarLessons[0].moduleId,
              moduleTitle: grammarLessons[0].moduleTitle,
              href: grammarLessons[0].href,
              reason: "Start here to build your grammar foundation.",
              reasonVi: "Hãy bắt đầu từ đây để xây nền ngữ pháp vững chắc.",
            }
          : null;

  return {
    totalLessons: grammarLessons.length,
    practicedLessons: perLesson.length,
    averageAccuracy,
    practicedModules,
    perLesson,
    nextRecommendation,
  };
}