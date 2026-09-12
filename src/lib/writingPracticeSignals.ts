/**
 * Writing practice signals - lightweight per-criterion scores collected from the
 * micro-practice tabs of IELTS Writing Practice (Phrase, Grammar, Translation,
 * Cohesion...). They are blended into the Writing Skill Chart so practising any
 * tab moves the chart, while graded essays remain the primary source.
 */
import { logStudentActivity } from "@/hooks/useActivityLogger";

export type PracticeCritKey = "TR" | "CC" | "LR" | "GR";

export const WRITING_PRACTICE_EVENT = "haiedu:writing-attempt-saved";

const STORAGE_KEY = "ielts-writing-practice-signals-v1";
const MAX_PER_CRIT = 40;
const RECENT_WINDOW = 5;

interface Signal {
  taskType: 1 | 2 | null;
  score10: number;
  at: string;
}

type Store = Partial<Record<PracticeCritKey, Signal[]>>;

function readStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage full / unavailable - practice still works */
  }
}

function clean10(raw: unknown): number | null {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n)) return null;
  return Math.min(10, Math.max(0, Math.round(n * 10) / 10));
}

/** Record a 0-10 practice score for one IELTS Writing criterion. */
export function recordPracticeSignal(input: {
  crit: PracticeCritKey;
  score10: unknown;
  taskType?: 1 | 2 | null;
  activityId?: string;
}) {
  const score10 = clean10(input.score10);
  if (score10 === null) return;
  const taskType = input.taskType === 1 || input.taskType === 2 ? input.taskType : null;

  const store = readStore();
  const list = Array.isArray(store[input.crit]) ? store[input.crit]! : [];
  list.unshift({ taskType, score10, at: new Date().toISOString() });
  store[input.crit] = list.slice(0, MAX_PER_CRIT);
  writeStore(store);

  void logStudentActivity({
    activityType: "ielts_writing_practice",
    activityId: input.activityId,
    score: score10,
    maxScore: 10,
    metadata: { criterion: input.crit, taskType },
  });

  try {
    window.dispatchEvent(new Event(WRITING_PRACTICE_EVENT));
  } catch {
    /* SSR / no window */
  }
}

/** Record a practice result already expressed on the IELTS band scale (0-9). */
export function recordPracticeBandSignal(input: {
  crit: PracticeCritKey;
  band: unknown;
  taskType?: 1 | 2 | null;
  activityId?: string;
}) {
  const n = typeof input.band === "number" ? input.band : Number(input.band);
  if (!Number.isFinite(n)) return;
  const band = Math.min(9, Math.max(0, n));
  recordPracticeSignal({
    crit: input.crit,
    score10: Math.min(10, Math.max(0, (band - 4) * 2)),
    taskType: input.taskType,
    activityId: input.activityId,
  });
}

const snapHalf = (n: number) => Math.round(n * 2) / 2;

/** Average of the most recent practice signals per criterion, on the band scale. */
export function practiceBands(taskType: 1 | 2 | "all" = "all"):
  Partial<Record<PracticeCritKey, { band: number; count: number }>> {
  const store = readStore();
  const out: Partial<Record<PracticeCritKey, { band: number; count: number }>> = {};
  (Object.keys(store) as PracticeCritKey[]).forEach(crit => {
    const list = (store[crit] || []).filter(s => {
      if (!s || typeof s.score10 !== "number") return false;
      if (taskType === "all") return true;
      return s.taskType === taskType || s.taskType === null;
    });
    const recent = list.slice(0, RECENT_WINDOW);
    if (!recent.length) return;
    const avg10 = recent.reduce((s, r) => s + r.score10, 0) / recent.length;
    const band = snapHalf(Math.min(9, Math.max(4, 4 + avg10 * 0.5)));
    out[crit] = { band, count: list.length };
  });
  return out;
}
