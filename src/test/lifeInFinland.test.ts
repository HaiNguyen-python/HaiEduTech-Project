import { describe, expect, it } from "vitest";
import { FIRST_30_DAYS_CHECKLIST, NEWCOMER_CATEGORIES } from "@/data/lifeInFinlandData";

const guides = NEWCOMER_CATEGORIES.flatMap(category => category.guides);
describe("Life in Finland reviewed content", () => {
  it("preserves all 28 guides with complete bilingual content and sources", () => {
    expect(guides).toHaveLength(28);
    expect(new Set(guides.map(guide => guide.id)).size).toBe(28);
    for (const guide of guides) {
      expect(guide.sources.length, guide.id).toBeGreaterThan(0);
      expect(guide.steps.length, guide.id).toBeGreaterThan(2);
      for (const source of guide.sources) expect(source.url).toMatch(/^https:\/\//);
      for (const item of [...guide.steps, ...guide.phrases, ...guide.keyTerms]) {
        expect(item.vi.trim(), guide.id).not.toBe("");
        expect(item.en.trim(), guide.id).not.toBe("");
      }
    }
  });
  it("keeps checklist keys unique and removes retired instructions", () => {
    expect(new Set(FIRST_30_DAYS_CHECKLIST.map(item => item.key)).size).toBe(FIRST_30_DAYS_CHECKLIST.length);
    const text = FIRST_30_DAYS_CHECKLIST.map(item => `${item.vi} ${item.en}`).join(" ");
    expect(text).not.toMatch(/Self\.fi|TE-palvelut\.fi|50–100µg|free Welcome SIM|before Dec 1|Form Y77/);
  });
  it("uses current student fees and separates healthcare booking from MyKanta", () => {
    const student = guides.find(guide => guide.id === "student-life-hacks-2026");
    expect(student?.steps.map(step => step.en).join(" ")).toContain("EUR 35.35 per term");
    expect(student?.steps.map(step => step.en).join(" ")).toContain("EUR 3.10");
    const healthcare = guides.find(guide => guide.id === "health-center");
    expect(healthcare?.steps.map(step => step.en).join(" ")).toContain("not general appointment booking");
    const winter = guides.find(guide => guide.id === "winter-driving");
    expect(winter?.summaryEn).toContain("November through March");
  });
});