import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { buildSentenceGradePrompt, clampGrade, parseSentenceGradeInput } from "./logic.ts";

Deno.test("validates and normalizes sentence grade input", () => {
  const parsed = parseSentenceGradeInput({ part: 2, topic: " Work & Study ", phrase: "To meet deadlines", meaning: "Đúng hạn", example: "I plan carefully.", transcript: "  I meet deadlines at work.  " });
  assertEquals(parsed?.part, 2);
  assertEquals(parsed?.transcript, "I meet deadlines at work.");
  assertEquals(parseSentenceGradeInput({ phrase: "test" }), null);
  assertEquals(parseSentenceGradeInput({ part: 1, topic: "Work", phrase: "meet deadlines", meaning: "", example: "I meet deadlines.", transcript: "I meet deadlines" }), null);
  assertEquals(parseSentenceGradeInput({ part: 1, topic: "Work", phrase: "meet deadlines", meaning: "đúng hạn", example: "I meet deadlines.", transcript: "only two" }), null);
});

Deno.test("builds a grounded grading prompt", () => {
  const parsed = parseSentenceGradeInput({ part: 1, topic: "Work", phrase: "meet deadlines", meaning: "đúng hạn", example: "I meet deadlines.", transcript: "I meet deadlines at school" });
  if (!parsed) throw new Error("Expected valid input");
  const prompt = buildSentenceGradePrompt(parsed);
  assertStringIncludes(prompt, "Target phrase: meet deadlines");
  assertStringIncludes(prompt, "Do not claim to hear audio");
  assertStringIncludes(prompt, "Return exactly four criteria");
});

Deno.test("clamps generated scores", () => {
  assertEquals(clampGrade(109), 100);
  assertEquals(clampGrade(-2), 0);
  assertEquals(clampGrade("76.4"), 76);
});
