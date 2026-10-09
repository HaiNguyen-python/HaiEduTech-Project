import { describe, expect, it } from "vitest";
import { computeStudentState, generateRecommendations, needsStudentIntervention } from "@/lib/rlEngine";
import { classifyStudent } from "@/lib/classroom3d";

const rows = (scores: Array<number | null>, type = "quiz") => scores.map((score, i) => ({
  score, max_score: 10, activity_type: type, metadata: {}, domain: "english",
  created_at: new Date(Date.UTC(2026, 9, i + 1)).toISOString(),
}));
const state = (scores: Array<number | null>) => computeStudentState("student", "Student", rows(scores));

describe("Student intervention evidence", () => {
  it("does not flag high scores after a small decline", () => {
    expect(needsStudentIntervention(state([10, 10, 10, 9, 9, 9]))).toBe(false);
  });
  it("requires three scored attempts, not three unscored visits", () => {
    const s = state([2, null, null, null]);
    expect(s.scoredActivities).toBe(1);
    expect(needsStudentIntervention(s)).toBe(false);
    expect(generateRecommendations(s).some(r => r.category === "difficulty")).toBe(false);
  });
  it("flags average strictly below 50% with three scored attempts", () => {
    expect(needsStudentIntervention(state([4, 4, 4]))).toBe(true);
    expect(needsStudentIntervention(state([5, 5, 5]))).toBe(false);
  });
  it("flags sustained recent same-skill scores below 50%", () => {
    const s = state([9, 9, 9, 4, 4, 4]);
    expect(s.avgScore).toBe(6.5);
    expect(s.interventionReasons).toEqual(["recent-low-score"]);
  });
  it("does not treat different skills as a decline", () => {
    const s = computeStudentState("s", "S", [...rows([9, 9, 9]), ...rows([4, 4, 4], "writing").map(a => ({ ...a, created_at: "2026-10-09T00:00:00Z" }))]);
    expect(s.recentTrend).toBe("stable");
    expect(needsStudentIntervention(s)).toBe(false);
  });
  it("sorts chronological evidence regardless of response order", () => {
    const s = computeStudentState("s", "S", rows([9, 9, 9, 4, 4, 4]).reverse());
    expect(s.recentTrend).toBe("declining");
    expect(s.lastActive).toBe("2026-10-06T00:00:00.000Z");
  });
  it("does not infer poor results from stale speaking/writing", () => {
    expect(classifyStudent(state([9, 9, 9]), { lastSpeak: 1, lastWrite: 1 }, Date.UTC(2026, 9, 9))).toBe("stable");
  });
  it("ignores missing/invalid scores and legacy opening markers", () => {
    const s = computeStudentState("s", "S", [...rows([null, NaN, -1, 20]), { ...rows([0])[0], max_score: 1 }]);
    expect(s.scoredActivities).toBe(0);
    expect(needsStudentIntervention(s)).toBe(false);
  });
  it("keeps classroom flags consistent with the shared rule", () => {
    expect(classifyStudent(state([4, 4, 4]))).toBe("alert");
  });
});