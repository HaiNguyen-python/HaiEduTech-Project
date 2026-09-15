import { describe, expect, it } from "vitest";
import {
  careerRoadmapInputSchema,
  clampInteger,
  parseCareerRoadmap,
  parseStoredCareerRoadmap,
  projectProgressId,
  safeExternalUrl,
} from "@/lib/careerRoadmap";

const validRoadmap = {
  roleSummary: "A practical role overview.",
  phases: [{ phase: "Foundation", goals: ["Learn Python"] }],
};

describe("Career Roadmap safeguards", () => {
  it("validates bounded input", () => {
    expect(careerRoadmapInputSchema.safeParse({ role: "Data Engineer", currentLevel: "Beginner", background: "", hoursPerWeek: 10, targetMonths: 6, language: "en" }).success).toBe(true);
    expect(careerRoadmapInputSchema.safeParse({ role: "", currentLevel: "Beginner", background: "", hoursPerWeek: 0, targetMonths: 99, language: "en" }).success).toBe(false);
  });

  it("normalizes a valid partial response and rejects an invalid one", () => {
    const parsed = parseCareerRoadmap(validRoadmap);
    expect(parsed?.phases[0].resources).toEqual([]);
    expect(parseCareerRoadmap({ roleSummary: "Missing phases" })).toBeNull();
  });

  it("accepts only web resource links", () => {
    expect(safeExternalUrl("https://roadmap.sh/")).toContain("https://roadmap.sh/");
    expect(safeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(safeExternalUrl("not-a-url")).toBeNull();
  });

  it("clamps numeric fields and creates stable project IDs", () => {
    expect(clampInteger(0, 1, 80, 10)).toBe(1);
    expect(clampInteger(Number.NaN, 1, 80, 10)).toBe(10);
    expect(projectProgressId("Phase 1", "CSV Tool")).toBe("phase 1::csv tool");
  });

  it("restores only versioned valid data", () => {
    expect(parseStoredCareerRoadmap({ version: 2 })).toBeNull();
    const restored = parseStoredCareerRoadmap({
      version: 1,
      form: { role: "data-engineer", customRole: "", currentLevel: "complete-beginner", hoursPerWeek: 100, targetMonths: 0 },
      roadmap: validRoadmap,
      citations: ["https://example.com", "javascript:alert(1)"],
      completedProjects: { "foundation::csv tool": true, ignored: false },
    });
    expect(restored?.form.hoursPerWeek).toBe(80);
    expect(restored?.form.targetMonths).toBe(1);
    expect(restored?.citations).toHaveLength(1);
    expect(restored?.completedProjects).toEqual({ "foundation::csv tool": true });
  });
});