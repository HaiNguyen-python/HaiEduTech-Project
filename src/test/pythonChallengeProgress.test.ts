import { describe, expect, it } from "vitest";
import { completionIds, programmingSkills, weeklyPythonProgress, isPythonChallengeUnlocked } from "@/lib/pythonChallengeProgress";

describe("Python progress evidence", () => {
  it("unlocks sequentially, preserves old passes and rejects unknown exercises", () => {
    expect(isPythonChallengeUnlocked("001", new Set())).toBe(true);
    expect(isPythonChallengeUnlocked("002", new Set())).toBe(false);
    expect(isPythonChallengeUnlocked("002", new Set(["001"]))).toBe(true);
    expect(isPythonChallengeUnlocked("004", new Set(["003"]))).toBe(false);
    expect(isPythonChallengeUnlocked("013", new Set(["013"]))).toBe(true);
    expect(isPythonChallengeUnlocked("999", new Set())).toBe(false);
    expect(isPythonChallengeUnlocked("150", new Set(Array.from({ length: 149 }, (_, i) => String(i + 1).padStart(3, "0"))))).toBe(true);
  });
  it("merges local and cloud completions without duplicates or unknown IDs", () => {
    const ids = completionIds([{ activity_id: "001", created_at: "2026-10-01" }, { activity_id: "999", created_at: "2026-10-01" }], ["001", "002"]);
    expect([...ids].sort()).toEqual(["001", "002"]);
  });
  it("covers all 150 exercises once across six skills", () => {
    const skills = programmingSkills(new Set(["001", "139", "150"]));
    expect(skills.reduce((sum, s) => sum + s.total, 0)).toBe(150);
    expect(skills.reduce((sum, s) => sum + s.completed, 0)).toBe(3);
    expect(skills[0].value).toBe(3);
  });
  it("counts earliest dated pass, never repeat or future entries", () => {
    const trend = weeklyPythonProgress([
      { activity_id: "001", created_at: "2026-09-01" },
      { activity_id: "001", created_at: "2026-10-01" },
      { activity_id: "002", created_at: "2026-10-01" },
      { activity_id: "003", created_at: "2027-01-01" },
    ], new Date("2026-10-05T12:00:00Z"));
    expect(trend).toHaveLength(8);
    expect(trend[0].completed).toBe(0);
    expect(trend[7].completed).toBe(2);
  });
});