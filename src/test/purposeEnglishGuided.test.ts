import { describe, expect, it } from "vitest";
import { businessTopicsPart1 } from "@/data/businessEnglishLessons";
import { businessTopicsPart2 } from "@/data/businessEnglishLessons2";
import { academicTopicsPart1 } from "@/data/academicEnglishLessons";
import { academicTopicsPart2 } from "@/data/academicEnglishLessons2";
import { businessEnglishModelRoles } from "@/data/businessEnglishModelRoles";
import { buildGuidedActivities, purposeGap } from "@/lib/purposeEnglishLearning";

const business = [...businessTopicsPart1, ...businessTopicsPart2].flatMap((topic) => topic.lessons);
const academic = [...academicTopicsPart1, ...academicTopicsPart2].flatMap((topic) => topic.lessons);

describe("Purpose English grounded guided questions", () => {
  it("fills the reported trend sentence with its actual past-tense form", () => {
    expect(purposeGap("Orders rose sharply in the second quarter.", "to rise sharply")).toEqual({
      sentence: "Orders ______ in the second quarter.", answer: "rose sharply",
    });
  });
  it("never invents a leading blank for an absent phrase", () => {
    expect(purposeGap("Orders rose sharply.", "unrelated phrase")).toBeNull();
  });
  it("handles the British spelling levelled", () => {
    expect(purposeGap("Growth levelled off in November.", "to level off")?.answer).toBe("levelled off");
  });
  for (const lesson of [...business, ...academic]) {
    it(`${lesson.id}: unique options and a gap answer that restores the source sentence`, () => {
      const activities = buildGuidedActivities(lesson, lesson.id.startsWith("biz-") ? "business" : "academic");
      expect(activities).toHaveLength(3);
      for (const activity of activities) {
        expect(activity.options).toHaveLength(4);
        expect(new Set(activity.options.map((option) => option.toLowerCase())).size).toBe(4);
        expect(activity.answer).toBeGreaterThanOrEqual(0);
        expect(activity.answer).toBeLessThan(4);
        if (activity.kind === "gap") {
          const sentence = activity.prompt.match(/: "([\s\S]*)"$/)?.[1];
          expect(sentence).toBeDefined();
          const restored = sentence?.replace("______", activity.options[activity.answer]);
          expect(lesson.vocab.some((item) => item.example === restored)).toBe(true);
        }
      }
    });
  }
  for (const lesson of business) {
    it(`${lesson.id}: function answer matches the authored role`, () => {
      const activity = buildGuidedActivities(lesson, "business").find((item) => item.kind === "function");
      expect(activity).toBeDefined();
      if (!activity) return;
      const index = lesson.model.lines.indexOf(activity.options[activity.answer]);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(activity.prompt).toContain(businessEnglishModelRoles[lesson.id][index].en);
    });
  }
});