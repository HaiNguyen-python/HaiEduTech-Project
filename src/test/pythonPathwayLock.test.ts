import { describe, it, expect } from "vitest";
import { pythonLessons } from "@/data/curriculum/pythonPathway";
import { isPathwayLessonUnlocked, isPythonProgramComplete } from "@/lib/pythonPathwayLock";

describe("python pathway lock", () => {
  it("first chapter is open, second locked until first done", () => {
    const [a, b] = pythonLessons;
    expect(isPathwayLessonUnlocked(a.id, {})).toBe(true);
    expect(isPathwayLessonUnlocked(b.id, {})).toBe(false);
    expect(isPathwayLessonUnlocked(b.id, { [a.id]: true })).toBe(true);
  });
  it("certificate needs all chapters and 150 challenges", () => {
    const all = Object.fromEntries(pythonLessons.map(l => [l.id, true]));
    expect(isPythonProgramComplete(all, 149)).toBe(false);
    expect(isPythonProgramComplete(all, 150)).toBe(true);
    expect(isPythonProgramComplete({}, 150)).toBe(false);
  });
});
