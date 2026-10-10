/** Shared sequential access: existing completed lessons remain available for review. */
export function isCurriculumLessonUnlocked(ids: string[], id: string, completed: string[]): boolean {
  const index = ids.indexOf(id);
  if (index < 0) return false;
  return completed.includes(id) || ids.slice(0, index).every(previous => completed.includes(previous));
}

export function isCurriculumComplete(ids: string[], completed: string[]): boolean {
  return ids.length > 0 && ids.every(id => completed.includes(id));
}