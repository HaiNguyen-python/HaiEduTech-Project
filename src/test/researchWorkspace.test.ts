import { describe, expect, it } from "vitest";
import { moveTool, normalizeToolOrder } from "@/lib/adminToolOrder";
import { EMPTY_RESEARCH_BRIEF, hasResearchBrief, parseResearchBrief, researchBriefContext } from "@/lib/phdResearchBrief";

describe("Personal admin tool ordering", () => {
  const defaults = { research: ["phd", "sources"], tools: ["income", "schedule"] };
  it("moves a tool vertically without losing any tool", () => {
    expect(moveTool(defaults, "sources", "phd").research).toEqual(["sources", "phd"]);
  });
  it("allows movement across groups while preserving every item", () => {
    expect(moveTool(defaults, "phd", "income")).toEqual({ research: ["sources"], tools: ["phd", "income", "schedule"] });
  });
  it("removes obsolete and duplicate IDs and restores new tools", () => {
    expect(normalizeToolOrder({ research: ["sources", "sources", "obsolete"], tools: ["phd"] }, defaults)).toEqual({ research: ["sources"], tools: ["phd", "income", "schedule"] });
  });
});
describe("Personal research brief", () => {
  it("requires topic, keywords and research problem", () => {
    expect(hasResearchBrief({ ...EMPTY_RESEARCH_BRIEF, topic: "Memory", keywords: "EEG" })).toBe(false);
    expect(hasResearchBrief({ ...EMPTY_RESEARCH_BRIEF, topic: "Memory", keywords: "EEG", problem: "Retention gap" })).toBe(true);
  });
  it("preserves topic keywords and problem in AI guidance context", () => {
    const brief = parseResearchBrief(JSON.stringify({ ...EMPTY_RESEARCH_BRIEF, topic: "Memory", keywords: "EEG", problem: "Retention gap" }));
    expect(researchBriefContext(brief)).toBe("TOPIC: Memory\nKEYWORDS: EEG\nPROBLEM: Retention gap");
  });
  it("rejects corrupt saved brief values", () => {
    expect(parseResearchBrief('{"topic":23}')).toEqual(EMPTY_RESEARCH_BRIEF);
  });
});