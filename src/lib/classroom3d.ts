/**
 * @file classroom3d.ts
 * @description Pure helpers for the 3D classroom view in the Admin Dashboard.
 *   Classifies each student into a colour tier and builds the desk layout.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { StudentState } from "@/lib/rlEngine";

export type ClassroomTier = "alert" | "progress" | "stable" | "average" | "idle";

export interface LastActivity {
  lastSpeak: number;
  lastWrite: number;
}

export interface ClassroomSeat {
  student: StudentState;
  tier: ClassroomTier;
  /** Desk position in world space. */
  x: number;
  z: number;
  row: number;
  col: number;
  /** 1-based academic rank inside the class. */
  rank: number;
  /** 0.55 - 1.35, scales with activity volume. */
  height: number;
  /** 0 - 1, scales with average score (floor ring size / glow). */
  glow: number;
  activeThisWeek: boolean;
  lastActiveMs: number;
  /** Deterministic 0-999 variant seed for cosmetic differences. */
  seed: number;
}

export type SeatingMode = "rank" | "attention";


export const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const TIER_META: Record<
  ClassroomTier,
  { color: string; emissive: string; vi: string; en: string; order: number }
> = {
  alert: { color: "#ef4444", emissive: "#7f1d1d", vi: "Cần chú ý", en: "Needs attention", order: 0 },
  progress: { color: "#22c55e", emissive: "#14532d", vi: "Đang tiến bộ", en: "Improving", order: 1 },
  stable: { color: "#3b82f6", emissive: "#1e3a8a", vi: "Ổn định / tốt", en: "Stable / strong", order: 2 },
  average: { color: "#f59e0b", emissive: "#78350f", vi: "Trung bình", en: "Average", order: 3 },
  idle: { color: "#94a3b8", emissive: "#1e293b", vi: "Chưa hoạt động", en: "Inactive", order: 4 },
};

export const TIER_ORDER: ClassroomTier[] = ["alert", "progress", "stable", "average", "idle"];

/** Most recent speaking/writing timestamp we know about (0 when unknown). */
export function lastActiveMs(state: StudentState, last?: LastActivity): number {
  const fromMap = Math.max(last?.lastSpeak || 0, last?.lastWrite || 0);
  const fromState = state.lastActive ? new Date(state.lastActive).getTime() : 0;
  return Math.max(fromMap, Number.isFinite(fromState) ? fromState : 0);
}

/**
 * Tier rules (mirrors the dashboard's intervention banner):
 *  - alert    : >=3 activities with avg < 5, declining trend, or silent >14 days
 *  - progress : improving trend
 *  - stable   : avg >= 7
 *  - average  : avg 5-7
 *  - idle     : no activity recorded
 */
export function classifyStudent(
  state: StudentState,
  last?: LastActivity,
  now = Date.now(),
): ClassroomTier {
  const silentSpeak = !!last && last.lastSpeak > 0 && now - last.lastSpeak > FOURTEEN_DAYS;
  const silentWrite = !!last && last.lastWrite > 0 && now - last.lastWrite > FOURTEEN_DAYS;
  const needsIntervention =
    (state.totalActivities >= 3 && (state.avgScore < 5 || state.recentTrend === "declining")) ||
    silentSpeak ||
    silentWrite;

  if (needsIntervention) return "alert";
  if (state.totalActivities === 0) return "idle";
  if (state.recentTrend === "improving") return "progress";
  if (state.avgScore >= 7) return "stable";
  if (state.avgScore >= 5) return "average";
  return "average";
}

/** Grid spacing in world units. */
export const DESK_GAP_X = 2.1;
export const DESK_GAP_Z = 2.3;

/**
 * Build the seating chart. Students needing attention are seated in the front
 * rows (closest to the whiteboard) so the teacher notices them first.
 */
export function buildClassroomLayout(
  students: StudentState[],
  lastMap: Map<string, LastActivity>,
  now = Date.now(),
): { seats: ClassroomSeat[]; cols: number; rows: number } {
  const maxActivities = students.reduce((m, s) => Math.max(m, s.totalActivities), 0) || 1;

  const enriched = students.map((student) => {
    const last = lastMap.get(student.userId);
    const tier = classifyStudent(student, last, now);
    const lastMs = lastActiveMs(student, last);
    return {
      student,
      tier,
      lastActiveMs: lastMs,
      activeThisWeek: lastMs > 0 && now - lastMs <= SEVEN_DAYS,
      height: 0.55 + Math.min(1, Math.sqrt(student.totalActivities / maxActivities)) * 0.8,
      glow: Math.max(0, Math.min(1, student.avgScore / 10)),
    };
  });

  enriched.sort((a, b) => {
    const t = TIER_META[a.tier].order - TIER_META[b.tier].order;
    if (t !== 0) return t;
    return b.student.totalActivities - a.student.totalActivities;
  });

  const cols = Math.max(4, Math.min(10, Math.ceil(Math.sqrt(enriched.length * 1.35)) || 4));
  const rows = Math.ceil(enriched.length / cols) || 1;
  const offsetX = ((cols - 1) * DESK_GAP_X) / 2;
  const offsetZ = ((rows - 1) * DESK_GAP_Z) / 2;

  const seats: ClassroomSeat[] = enriched.map((e, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      ...e,
      row,
      col,
      x: col * DESK_GAP_X - offsetX,
      z: row * DESK_GAP_Z - offsetZ,
    };
  });

  return { seats, cols, rows };
}

export function tierCounts(seats: ClassroomSeat[]): Record<ClassroomTier, number> {
  const counts: Record<ClassroomTier, number> = {
    alert: 0,
    progress: 0,
    stable: 0,
    average: 0,
    idle: 0,
  };
  for (const s of seats) counts[s.tier] += 1;
  return counts;
}

/** "3 ngày trước" style helper, bilingual. */
export function formatLastActive(ms: number, vi: boolean, now = Date.now()): string {
  if (!ms) return vi ? "Chưa có dữ liệu" : "No data";
  const days = Math.floor((now - ms) / (24 * 60 * 60 * 1000));
  if (days <= 0) return vi ? "Hôm nay" : "Today";
  if (days === 1) return vi ? "Hôm qua" : "Yesterday";
  return vi ? `${days} ngày trước` : `${days} days ago`;
}
