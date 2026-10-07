import { describe, expect, it } from "vitest";
import { YKI_B1_SPEAKING_EXAM_SETS, YKI_B1_SPEAKING_SECTIONS } from "@/data/ykiB1SpeakingExamSets";

describe("uploaded Finnish YKI B1 speaking sets", () => {
  it("contains nine complete four-part exam sets", () => {
    expect(YKI_B1_SPEAKING_EXAM_SETS).toHaveLength(9);
    for (const set of YKI_B1_SPEAKING_EXAM_SETS) {
      expect(set.sections.map((item) => item.part)).toEqual(["narration", "dialogue", "situations", "opinion"]);
    }
    expect(YKI_B1_SPEAKING_SECTIONS).toHaveLength(36);
    expect(new Set(YKI_B1_SPEAKING_SECTIONS.map((item) => item.id)).size).toBe(36);
  });

  it("keeps every section trilingual and ready for guided practice", () => {
    for (const item of YKI_B1_SPEAKING_SECTIONS) {
      expect(item.promptFi.length).toBeGreaterThan(35);
      expect(item.promptEn.length).toBeGreaterThan(35);
      expect(item.promptVi.length).toBeGreaterThan(25);
      expect(item.hintsFi.length).toBeGreaterThanOrEqual(3);
      expect(item.modelFi.length).toBeGreaterThan(180);
      expect(item.modelEn.length).toBeGreaterThan(180);
      expect(item.modelVi.length).toBeGreaterThan(100);
      expect(item.timeSeconds).toBeGreaterThanOrEqual(30);
    }
  });
});