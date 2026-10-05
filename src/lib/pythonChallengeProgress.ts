import { pythonChallenges } from "@/data/pythonChallenges";

export interface PythonCompletion { activity_id: string | null; created_at: string; }
export const PYTHON_SKILLS = [
  { vi: "Nền tảng", en: "Fundamentals", start: 1, end: 34 },
  { vi: "Logic & vòng lặp", en: "Logic & loops", start: 35, end: 59 },
  { vi: "Cấu trúc dữ liệu", en: "Data structures", start: 69, end: 104 },
  { vi: "Tệp & dữ liệu", en: "Files & SQL", start: 105, end: 117, extraStart: 139, extraEnd: 145 },
  { vi: "Hàm & dự án", en: "Functions & projects", start: 118, end: 123, extraStart: 146, extraEnd: 150 },
  { vi: "Đồ họa & giao diện", en: "Graphics & UI", start: 60, end: 68, extraStart: 124, extraEnd: 138 },
];

export function completionIds(rows: PythonCompletion[], localIds: string[] = []) {
  const valid = new Set(pythonChallenges.map(c => c.id));
  return new Set([...localIds, ...rows.map(r => r.activity_id)].filter((id): id is string => typeof id === "string" && valid.has(id)));
}

export function programmingSkills(ids: Set<string>) {
  return PYTHON_SKILLS.map(skill => {
    const challenges = pythonChallenges.filter(c => (c.number >= skill.start && c.number <= skill.end) ||
      (skill.extraStart !== undefined && skill.extraEnd !== undefined && c.number >= skill.extraStart && c.number <= skill.extraEnd));
    const completed = challenges.filter(c => ids.has(c.id)).length;
    return { ...skill, completed, total: challenges.length, value: Math.round(completed / challenges.length * 100) };
  });
}

// The earliest logged pass is the only dated evidence; legacy local flags have no date.
export function weeklyPythonProgress(rows: PythonCompletion[], now = new Date()) {
  const firstPass = new Map<string, number>();
  const valid = new Set(pythonChallenges.map(c => c.id));
  for (const row of rows) {
    if (!row.activity_id || !valid.has(row.activity_id)) continue;
    const date = Date.parse(row.created_at);
    if (!Number.isFinite(date) || date > now.getTime()) continue;
    firstPass.set(row.activity_id, Math.min(firstPass.get(row.activity_id) ?? Infinity, date));
  }
  return Array.from({ length: 8 }, (_, i) => {
    const end = new Date(now);
    end.setDate(end.getDate() - (7 - i) * 7);
    return { date: end.toISOString(), completed: [...firstPass.values()].filter(date => date <= end.getTime()).length };
  });
}