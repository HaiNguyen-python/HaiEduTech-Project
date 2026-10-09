import { describe, expect, it } from "vitest";
import { safeResearchUrl, researchCsv } from "@/lib/phdResearch";
describe("research references", () => {
  it("rejects executable source links", () => {
    expect(safeResearchUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeResearchUrl("data:text/html,test")).toBeUndefined();
    expect(safeResearchUrl("https://doi.org/10.1234/example")).toBe("https://doi.org/10.1234/example");
  });
  it("quotes evidence and neutralises spreadsheet formulas", () => {
    expect(researchCsv([["=1+1", 'Study "A"', "method\nlimitation"]])).toBe('\uFEFF"\'=1+1","Study ""A""","method\nlimitation"');
  });
});