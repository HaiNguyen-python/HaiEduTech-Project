import { LIFESTYLE_LESSONS } from "@/data/lifestyleAcademyLessons";
import { isPassed, type LifestyleLessonResult } from "@/hooks/useLifestyleProgress";

const PILLAR_ORDER = ["finance", "etiquette", "presence", "wellness", "selfstudy", "partying", "publicspeaking"];
export const interpersonalLessons = PILLAR_ORDER.flatMap(pillar => LIFESTYLE_LESSONS.filter(lesson => lesson.pillar === pillar));
export const interpersonalLessonIds = interpersonalLessons.map(lesson => lesson.id);
export const passedInterpersonalIds = (results: Record<string, LifestyleLessonResult>) =>
  interpersonalLessonIds.filter(id => isPassed(results[id]));