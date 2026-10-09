import { describe, expect, it } from "vitest";
import type { ReadingExam } from "@/data/ieltsFullReadingExams";
import { shuffleHeadingsInExam } from "@/lib/ieltsReadingShuffle";
import { expandReadingAnswerSlots, selectReadingSlots, allocateReadingCounts, readingTaskGroups, readingTaskInstruction } from "@/lib/ieltsReadingTasks";
import { isReadingAnswerCorrect } from "@/lib/ieltsReadingAnswer";
import { IELTS_FULL_TESTS } from "@/data/ieltsFullTests";
import { READING_QUESTION_EXTENSIONS } from "@/data/ieltsReadingQuestionExtensions";
import { READING_NOT_GIVEN_EXTENSIONS } from "@/data/ieltsReadingNotGivenExtensions";
import { READING_HEADING_OVERRIDES } from "@/data/ieltsReadingHeadingDistractors";
import { READING_PASSAGE_EXTENSIONS as ext1 } from "@/data/ieltsReadingPassageExtensions";
import { READING_PASSAGE_EXTENSIONS_2 as ext2 } from "@/data/ieltsReadingPassageExtensions2";
import { READING_PASSAGE_EXTENSIONS_3 as ext3 } from "@/data/ieltsReadingPassageExtensions3";
import { READING_PASSAGE_EXTENSIONS_4 as ext4 } from "@/data/ieltsReadingPassageExtensions4";

const modules = import.meta.glob("../data/ieltsFullReadingExams*.ts", { eager: true });
const exams = Object.values(modules).flatMap(m => Object.values(m as Record<string, unknown>).filter(Array.isArray).flat()) as ReadingExam[];
const prepared = exams.map(e => ({ ...shuffleHeadingsInExam(e), questions: expandReadingAnswerSlots(shuffleHeadingsInExam({ ...e, questions: [...e.questions, ...(READING_QUESTION_EXTENSIONS[e.id] ?? []), ...(READING_NOT_GIVEN_EXTENSIONS[e.id] ?? [])] }).questions) }));

describe("IELTS Reading paper integrity", () => {
  it("shares one word-limit instruction per task and separates different limits", () => {
    const base = { number: 1, type: "fill-blank" as const, prompt: "Complete", answer: "coral", instruction: "Write ONE WORD only." };
    const groups = readingTaskGroups([base, { ...base, number: 2 }, { ...base, number: 3, instruction: "Write TWO WORDS only." }]);
    expect(groups.map(group => group.length)).toEqual([2, 1]);
    expect(readingTaskInstruction(groups[0][0])).toBe("Write ONE WORD only.");
  });
  it("uses unambiguous paragraph labels and distinct passage titles", () => {
    expect(new Set(exams.map(e => e.passageTitle)).size).toBe(exams.length);
    for (const e of exams) {
      const text = e.passage + (ext1[e.id] ?? "") + (ext2[e.id] ?? "") + (ext3[e.id] ?? "") + (ext4[e.id] ?? "");
      const labels = [...text.matchAll(/(?:^|\n)([A-Z])\. /g)].map(m => m[1]);
      expect(new Set(labels).size, e.id).toBe(labels.length);
      e.questions.filter(q => q.type === "matching-headings").forEach(q => expect(labels, e.id).toContain(q.prompt.match(/Paragraph\s+([A-Z])/i)?.[1]));
    }
  });
  it("keeps a shared compact heading list, all correct meanings and no reused key", () => {
    expect(exams).toHaveLength(45);
    for (const e of exams) {
      const result = shuffleHeadingsInExam(e);
      const questions = result.questions.filter(q => q.type === "matching-headings");
      if (!questions.length) continue;
      const list = questions[0].headings ?? [];
      expect(list.length, e.id).toBeGreaterThan(questions.length);
      expect(list.length, e.id).toBeLessThanOrEqual(questions.length + 3);
      expect(new Set(questions.map(q => q.answer)).size, e.id).toBe(questions.length);
      questions.forEach(q => {
        expect(q.headings).toEqual(list);
        const original = e.questions.find(old => old.number === q.number);
        const paragraph = q.prompt.match(/Paragraph\s+([A-Z])/i)?.[1] ?? "";
        expect(list.find(h => h.label === q.answer)?.text).toBe(READING_HEADING_OVERRIDES[e.id]?.byParagraph[paragraph] ?? original?.headings?.find(h => h.label === original.answer)?.text);
      });
      expect(result.questions.map(q => q.number)).toEqual(e.questions.map(q => q.number));
    }
  });
  it("counts choose TWO as two marks with one mark for a single correct choice", () => {
    const pair = expandReadingAnswerSlots([{ number: 1, type: "mcq-multi", prompt: "Which TWO?", answer: "A", answers: ["A", "C"] }]);
    expect(pair).toHaveLength(2);
    expect(pair.map(q => q.number)).toEqual([1, 2]);
    expect(isReadingAnswerCorrect(pair[0], "C")).toBe(true);
    expect(isReadingAnswerCorrect(pair[1], "B")).toBe(false);
    expect(isReadingAnswerCorrect({ ...pair[0], pairIndex: undefined }, "AC")).toBe(true);
    expect(isReadingAnswerCorrect({ ...pair[0], pairIndex: undefined }, "AB")).toBe(false);
  });
  it("keeps 40 numbered answer slots and intact choose-TWO pairs in every full test", () => {
    for (const test of IELTS_FULL_TESTS) {
      const counts = allocateReadingCounts(test.passageIds.map(id => prepared.find(e => e.id === id)?.questions.length ?? 0));
      const selected = test.passageIds.flatMap((id, index) => {
        const exam = prepared.find(e => e.id === id);
        expect(exam, id).toBeDefined();
        const slots = selectReadingSlots(exam?.questions ?? [], counts[index]);
        slots.filter(q => q.pairIndex === 0).forEach(q => expect(slots.some(other => other.pairStart === q.pairStart && other.pairIndex === 1), id).toBe(true));
        return slots;
      });
      expect(selected, test.id).toHaveLength(40);
    }
  });
});