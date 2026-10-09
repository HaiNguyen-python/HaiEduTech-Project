import { describe, expect, it } from "vitest";
import { ieltsModules } from "@/data/languageCurriculum/englishIelts";
const reading = ieltsModules.find(m => m.id === "ielts-reading")?.lessons ?? [];
const listening = ieltsModules.find(m => m.id === "ielts-listening")?.lessons ?? [];
const lesson = (id: string) => [...reading, ...listening].find(l => l.id === id);
describe("IELTS lesson logic", () => {
  it("keeps every lesson and valid grading indices", () => {
    expect(reading).toHaveLength(24);
    expect(listening).toHaveLength(21);
    for (const l of [...reading, ...listening]) {
      expect(l.theoryEn?.length, l.id).toBeGreaterThan(100);
      for (const q of l.quiz) {
        expect(q.answer, l.id).toBeGreaterThanOrEqual(0);
        expect(q.answer, l.id).toBeLessThan(q.options.length);
      }
    }
  });
  it("accepts absolute wording when the text supports every participant", () => {
    const q = lesson("ielts-reading-16")?.quiz.find(q => q.question.includes("Every participant"));
    expect(q?.options[q.answer]).toBe("YES");
  });
  it("grades conditional wet-weather evidence rather than rejecting if", () => {
    const q = lesson("ielts-listening-9")?.quiz.find(q => q.question.includes("wet weather"));
    expect(q?.options[q.answer]).toBe("The hall");
  });
  it("distinguishes current price from last year's price", () => {
    const q = lesson("ielts-listening-9")?.quiz.find(q => q.question.includes("current price"));
    expect(q?.options[q.answer]).toBe("£45");
    const ex = lesson("ielts-listening-12")?.exercises.find(e => e.type === "fill-in-blank");
    if (!ex || ex.type !== "fill-in-blank") throw new Error("Missing numeric practice");
    expect(ex.sentences.find(s => s.text.includes("Reference"))?.answer).toBe("7742");
    expect(ex.sentences.find(s => s.text.includes("Current fee"))?.answer).toBe("30");
  });
  it("supplies source evidence in the English starter form exercise", () => {
    const ex = lesson("ielts-listening-1")?.exercises[0];
    expect(ex?.instructionEn).toContain("T-H-O-M-P-S-O-N");
    expect(ex?.instructionEn).toContain("42 Oak Street");
    expect(ex?.instructionEn).toContain("07845 392 617");
  });
});
