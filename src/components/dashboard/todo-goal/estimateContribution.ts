// Immediate client-side estimator for how much a new task contributes to a goal.
// Runs synchronously so the user sees a % right away; AI alignment can refine later.
import type { StudyGoal } from "./types";

const STOP = new Set([
  "the","a","an","and","or","to","of","in","on","for","with","my","your","is","are","be",
  "học","làm","và","cho","của","về","một","các","những","ở","để","tôi","bạn","luyện","ôn","tập",
]);

function tokens(s: string): Set<string> {
  return new Set(
    (s || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\s]+/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 2 && !STOP.has(w))
  );
}

/** Returns { goalId, pct } picking the goal with best keyword overlap. */
export function estimateContribution(title: string, goals: StudyGoal[]): { goalId: string | null; pct: number } {
  const active = goals.filter((g) => g.status === "active");
  if (active.length === 0 || !title.trim()) return { goalId: null, pct: 0 };
  const tt = tokens(title);
  let best: { id: string; overlap: number } | null = null;
  for (const g of active) {
    const gt = tokens(`${g.title} ${g.description ?? ""} ${g.category ?? ""}`);
    let overlap = 0;
    tt.forEach((w) => { if (gt.has(w)) overlap++; });
    if (!best || overlap > best.overlap) best = { id: g.id, overlap };
  }
  if (!best || best.overlap === 0) return { goalId: null, pct: 0 };
  // Map overlap 1..4+ -> 0.4%..1.5% (typical micro-task contribution).
  const pct = Math.min(1.5, 0.3 + best.overlap * 0.3);
  return { goalId: best.id, pct: Number(pct.toFixed(2)) };
}
