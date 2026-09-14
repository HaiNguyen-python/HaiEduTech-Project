import { describe, expect, it } from "vitest";
import { interviewCategories, interviewQuestions } from "@/data/interviewQuestions";
import { emphasizeInterviewTerms, filterInterviewQuestions, groupInterviewQuestions, parseReviewedQuestionIds, splitNumberedText } from "@/lib/interviewQuestionUtils";

describe("interview question bank", () => {
  it("has unique IDs and valid categories", () => {
    const ids = interviewQuestions.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const question of interviewQuestions) {
      expect(interviewCategories[question.role]).toContain(question.category);
      expect(question.question.trim().length).toBeGreaterThan(10);
      expect(question.answer.trim().length).toBeGreaterThan(80);
      expect(question.keyPoints.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("provides meaningful Junior coverage for both roles", () => {
    for (const role of ["ai-engineer", "data-engineer"] as const) {
      expect(interviewQuestions.filter((question) => question.role === role && question.difficulty === "Junior").length).toBeGreaterThanOrEqual(8);
    }
  });

  it("filters search, difficulty, and reviewed state together", () => {
    const reviewed = new Set(["ai-llm-1"]);
    const results = filterInterviewQuestions(interviewQuestions, {
      role: "ai-engineer", category: "LLMs & Prompt Engineering", difficulty: "Junior",
      search: "token", unreviewedOnly: true,
    }, reviewed);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((question) => question.role === "ai-engineer" && !reviewed.has(question.id))).toBe(true);
  });

  it("groups results in declared category order", () => {
    const roleQuestions = interviewQuestions.filter((question) => question.role === "data-engineer");
    const groups = groupInterviewQuestions(roleQuestions, interviewCategories["data-engineer"]);
    expect(groups.map((group) => group.category)).toEqual(interviewCategories["data-engineer"]);
  });

  it("migrates only valid reviewed IDs", () => {
    const valid = new Set(["one", "two"]);
    expect([...parseReviewedQuestionIds('["one","missing",4]', valid)]).toEqual(["one"]);
    expect(parseReviewedQuestionIds("broken", valid).size).toBe(0);
  });

  it("turns inline numbered explanations into separate readable rows", () => {
    expect(splitNumberedText("Mitigations: (1) use RAG, (2) verify output, (3) monitor quality")).toEqual([
      { text: "Mitigations:" },
      { number: 1, text: "use RAG" },
      { number: 2, text: "verify output" },
      { number: 3, text: "monitor quality" },
    ]);
    expect(splitNumberedText("One normal sentence.")).toEqual([{ text: "One normal sentence." }]);
  });

  it("identifies important technical phrases without producing HTML", () => {
    const parts = emphasizeInterviewTerms("Use RAG with schema validation and monitor latency.");
    expect(parts.filter((part) => part.important).map((part) => part.text)).toEqual(["RAG", "schema validation", "latency"]);
    expect(parts.map((part) => part.text).join("")).toBe("Use RAG with schema validation and monitor latency.");
  });
});
