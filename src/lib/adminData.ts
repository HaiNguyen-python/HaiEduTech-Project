import type { PostgrestError } from "@supabase/supabase-js";

type PageResult = PromiseLike<{ data: unknown[] | null; error: PostgrestError | null }>;

export const SYSTEM_ACTIVITY_TYPES = new Set(["session_heartbeat", "daily_login"]);

export const SPEAKING_ACTIVITY_TYPES = [
  "ielts_speaking",
  "pte_speaking",
  "speaking_coach_en",
  "speaking_coach_zh",
  "speaking_coach_fi",
  "speaking_coach_vi",
  "conv_english",
  "conv_chinese",
  "conv_english_exercise",
  "conv_chinese_exercise",
];

export const WRITING_ACTIVITY_TYPES = [
  "ielts_writing",
  "pte_writing_essay",
  "pte_writing_summary",
];

export function isLearningActivity(activityType?: string | null) {
  return !!activityType && !SYSTEM_ACTIVITY_TYPES.has(activityType);
}

export function sumActivityTypeCounts(
  skillBreakdown: Record<string, { count: number }>,
  activityTypes: string[],
) {
  return activityTypes.reduce((total, type) => total + (skillBreakdown[type]?.count || 0), 0);
}

// Strip Vietnamese diacritics for case/diacritic-insensitive search.
export function normalizeForSearch(input: string): string {
  return (input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim();
}

// Safe CSV value escaping (RFC 4180): wrap in quotes, double inner quotes.
export function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return '""';
  const s = typeof value === "object" ? JSON.stringify(value) : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PageResult,
  batchSize = 1000,
) {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const to = from + batchSize - 1;
    const { data, error } = await fetchPage(from, to);

    if (error) throw error;

    const batch = ((data || []) as T[]);
    rows.push(...batch);

    if (batch.length < batchSize) break;
    from += batchSize;
  }

  return rows;
}