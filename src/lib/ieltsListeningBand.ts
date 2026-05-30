// IELTS Listening band score conversion (Cambridge official chart, Academic).
// Input: raw correct count out of total questions; we normalize to 40 first.
export const ieltsListeningBand = (correct: number, total: number): number => {
  if (total <= 0) return 0;
  const normalized = Math.round((correct / total) * 40);
  if (normalized >= 39) return 9.0;
  if (normalized >= 37) return 8.5;
  if (normalized >= 35) return 8.0;
  if (normalized >= 33) return 7.5;
  if (normalized >= 30) return 7.0;
  if (normalized >= 27) return 6.5;
  if (normalized >= 23) return 6.0;
  if (normalized >= 19) return 5.5;
  if (normalized >= 15) return 5.0;
  if (normalized >= 13) return 4.5;
  if (normalized >= 10) return 4.0;
  if (normalized >= 8)  return 3.5;
  if (normalized >= 6)  return 3.0;
  if (normalized >= 4)  return 2.5;
  return 2.0;
};

export const bandColor = (b: number): string => {
  if (b >= 7.5) return "text-emerald-600 dark:text-emerald-400";
  if (b >= 6.5) return "text-blue-600 dark:text-blue-400";
  if (b >= 5.5) return "text-amber-600 dark:text-amber-400";
  return "text-rose-600 dark:text-rose-400";
};
