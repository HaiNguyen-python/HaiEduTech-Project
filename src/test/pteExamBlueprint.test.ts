import { describe, expect, it } from "vitest";
import { PTE_EXAM_BLUEPRINT, PTE_SCORED_ITEM_TYPES, PTE_SECTION_TIMINGS } from "@/data/pteExamBlueprint";

describe("PTE Academic blueprint", () => {
  it("contains 22 scored item types plus the unscored personal introduction", () => {
    expect(PTE_SCORED_ITEM_TYPES).toHaveLength(22);
    expect(PTE_EXAM_BLUEPRINT).toHaveLength(23);
    expect(PTE_EXAM_BLUEPRINT.filter(item => item.scoring === "unscored").map(item => item.id)).toEqual(["personal-introduction"]);
  });

  it("uses unique IDs and defines scoring and skill attribution for every scored type", () => {
    expect(new Set(PTE_EXAM_BLUEPRINT.map(item => item.id)).size).toBe(PTE_EXAM_BLUEPRINT.length);
    for (const item of PTE_SCORED_ITEM_TYPES) {
      expect(item.contributesTo.length).toBeGreaterThan(0);
      expect(["objective", "rubric"]).toContain(item.scoring);
    }
  });

  it("keeps the current three-section structure", () => {
    expect(PTE_SECTION_TIMINGS.map(section => section.section)).toEqual(["Speaking & Writing", "Reading", "Listening"]);
    expect(PTE_SECTION_TIMINGS.map(section => section.itemTypes)).toEqual([10, 5, 8]);
  });

  it("includes both item types introduced in the 2025 enhancement", () => {
    const ids = PTE_EXAM_BLUEPRINT.map(item => item.id);
    expect(ids).toContain("respond-to-situation");
    expect(ids).toContain("summarize-group-discussion");
  });
});