import { describe, expect, it } from "vitest";
import { YKI_B1_READING_DOCUMENT_SETS } from "@/data/ykiB1ReadingDocuments";

describe("uploaded YKI B1 Reading", () => {
  it("preserves three five-task documents and all 79 questions", () => {
    expect(YKI_B1_READING_DOCUMENT_SETS).toHaveLength(3);
    const ids: string[] = [];
    let count = 0;
    for (const set of YKI_B1_READING_DOCUMENT_SETS) {
      expect(set.passages.map((p) => p.task)).toEqual([1, 2, 3, 4, 5]);
      for (const passage of set.passages) {
        ids.push(passage.id);
        expect(passage.textFi.length).toBeGreaterThan(250);
        expect(passage.textFi).not.toMatch(/_{4,}|Tehtävä [1-5]/);
        for (const q of passage.questions) {
          count += 1;
          expect(q.q.length).toBeGreaterThan(10);
          expect(q.evidenceFi.length).toBeGreaterThan(5);
          if (q.kind === "choice") {
            expect(q.answer).toBeGreaterThanOrEqual(0);
            expect(q.answer).toBeLessThan(q.options.length);
            expect(new Set(q.options).size).toBe(q.options.length);
          } else {
            expect(q.modelFi.length).toBeGreaterThan(4);
            expect(q.modelEn.length).toBeGreaterThan(5);
          }
        }
      }
    }
    expect(new Set(ids).size).toBe(15);
    expect(count).toBe(79);
  });
});