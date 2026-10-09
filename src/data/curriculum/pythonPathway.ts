import { pythonLessons as legacyLessons, pythonModules as legacyModules } from "./pythonPathwayLegacy";
import { pythonBookLessons, pythonBookModules, getBookChapter } from "./pythonBookTheory";

export type { PythonLesson, PythonModule, QuizQuestion } from "./pythonPathwayLegacy";
export { getBookChapter, getChapterForChallenge, pythonBookChapters } from "./pythonBookTheory";

export const pythonLessons = pythonBookLessons;
export const pythonModules = pythonBookModules;
export const supplementaryPythonLessons = legacyLessons.filter(lesson => !getBookChapter(lesson.id));
export const getLessonById = (id: string) => pythonLessons.find(lesson => lesson.id === id) ?? legacyLessons.find(lesson => lesson.id === id);
export const getModuleById = (id: string, supplementary = false) => (supplementary ? legacyModules : pythonModules).find(module => module.id === id);
export const getLessonsByModule = (moduleId: string, supplementary = false) =>
  (supplementary ? supplementaryPythonLessons : pythonLessons).filter(lesson => lesson.moduleId === moduleId).sort((a, b) => a.order - b.order);
export const getPathwaySequence = (id: string) => getBookChapter(id) ? pythonLessons : supplementaryPythonLessons;