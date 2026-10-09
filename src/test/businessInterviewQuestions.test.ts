import { describe, expect, it } from "vitest";
import { businessInterviewCategories, businessInterviewQuestions, highlightPhrases } from "@/data/businessInterviewQuestions";

describe("Business English interview questions", () => {
  it("has unique ids and covers every topic", () => {
    expect(new Set(businessInterviewQuestions.map((q) => q.id)).size).toBe(businessInterviewQuestions.length);
    for (const c of businessInterviewCategories) expect(businessInterviewQuestions.some((q) => q.category === c)).toBe(true);
  });

  it("every highlight appears in its sample answer", () => {
    for (const q of businessInterviewQuestions) for (const h of q.highlights) expect(q.sampleAnswer).toContain(h);
  });

  it("highlights phrases without changing the text", () => {
    const parts = highlightPhrases("I stay calm and listen.", ["stay calm"]);
    expect(parts.filter((p) => p.important).map((p) => p.text)).toEqual(["stay calm"]);
    expect(parts.map((p) => p.text).join("")).toBe("I stay calm and listen.");
  });
});
