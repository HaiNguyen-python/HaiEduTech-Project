import { describe, expect, it } from "vitest";
import {
  ladderLevelFrom, nextTarget, subjectsForBank, weaknessLinks,
} from "@/lib/personalization/placementBridge";

describe("placementBridge", () => {
  it("maps every bank to at least one subject", () => {
    for (const bank of ["english", "chinese", "vietnamese", "finnish", "japanese", "swedish", "programming"]) {
      expect(subjectsForBank(bank).length).toBeGreaterThan(0);
    }
    expect(subjectsForBank("unknown")).toEqual(["english"]);
  });

  it("places a beginner low and an advanced student high on the ladder", () => {
    expect(ladderLevelFrom("vietnamese", "A1", 20)).toBe("A1");
    expect(ladderLevelFrom("vietnamese", "C1", 90)).toBe("C1");
    expect(ladderLevelFrom("chinese", "A1", 15)).toBe("HSK 1");
    expect(ladderLevelFrom("japanese", "B2", 72)).toBe("N3");
  });

  it("targets one rung above the current level and never past the top", () => {
    expect(nextTarget("finnish", "A2")).toBe("B1");
    expect(nextTarget("finnish", "B2")).toBe("B2");
    expect(nextTarget("swedish", "A1")).toBe("A2");
  });

  it("links the weakest skills to a practice route", () => {
    const links = weaknessLinks("swedish", {
      listening: 30, reading: 80, writing: 45, speaking: 60,
    });
    expect(links).toHaveLength(3);
    expect(links[0].skill).toBe("listening");
    expect(links[0].route.startsWith("/")).toBe(true);
  });
});
