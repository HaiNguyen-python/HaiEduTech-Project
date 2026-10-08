import { describe, expect, it } from "vitest";
import { normalizeTypingNumbers } from "@/lib/codeTypingNumbers";

describe("Code Typing Race numeric formatting", () => {
  it("removes separators from decimal numbers in complete examples", () => {
    expect(normalizeTypingNumbers("limit = 1_000_000\nprice = 1_000.25\nratio = 1.2e1_0"))
      .toBe("limit = 1000000\nprice = 1000.25\nratio = 1.2e10");
  });
  it("preserves identifiers and quoted data", () => {
    const source = 'sales_2026_10 = 1_000\nname = "file_1_000.csv"\nlabel = \'1_000\'\ndef sum_1_000():\n    return sales_2026_10';
    expect(normalizeTypingNumbers(source)).toBe(source.replace("= 1_000\n", "= 1000\n"));
  });
});