import { describe, expect, it } from "vitest";
import { buildClassColorMap, classColor, classColorKey } from "@/lib/classScheduleColors";

const CURRENT_CLASSES = [
  { subject: "ielts", class_name: "IELTS Foundation Course (em Ngọc Hân, 1–1)" },
  { subject: "ielts", class_name: "IELTS Foundation Course (Vietnam & Finland)" },
  { subject: "english", class_name: "Business English (Vietnam & Finland)" },
  { subject: "ielts", class_name: "IELTS Advanced Course (Vietnam & Finland)" },
  { subject: "ielts", class_name: "IELTS Foundation Course (US & Finland)" },
  { subject: "chinese", class_name: "Chinese Foundation Course (Vietnam – Finland)" },
  { subject: "programming", class_name: "AI Foundation Course (Vietnam – Finland)" },
  { subject: "english", class_name: "Cambridge Flyers – KET A2/B1 (Vietnam)" },
  { subject: "english", class_name: "Cambridge Starters – Movers A1 (Finland)" },
];

describe("Per-class schedule colours", () => {
  it("gives every current class its own colour", () => {
    const map = buildClassColorMap(CURRENT_CLASSES);
    const colours = CURRENT_CLASSES.map(c => classColor(map, c));
    expect(colours).toHaveLength(9);
    expect(new Set(colours).size).toBe(9);
    expect(colours.every(hex => /^#[0-9A-F]{6}$/.test(hex))).toBe(true);
  });

  it("does not depend on the order classes are loaded", () => {
    const forward = buildClassColorMap(CURRENT_CLASSES);
    const reversed = buildClassColorMap([...CURRENT_CLASSES].reverse());
    expect(reversed).toEqual(forward);
  });

  it("keeps a class colour identical across weeks and views", () => {
    const map = buildClassColorMap(CURRENT_CLASSES);
    const key = classColorKey(CURRENT_CLASSES[0]);
    expect(map[key]).toBe(classColor(map, CURRENT_CLASSES[0]));
    expect(map[key]).toBe(classColor(buildClassColorMap([CURRENT_CLASSES[0]]), CURRENT_CLASSES[0]));
  });

  it("separates two classes that share a name but teach different subjects", () => {
    const map = buildClassColorMap([
      { subject: "ielts", class_name: "Foundation" },
      { subject: "chinese", class_name: "Foundation" },
    ]);
    expect(classColorKey({ subject: "ielts", class_name: "Foundation" }))
      .not.toBe(classColorKey({ subject: "chinese", class_name: "Foundation" }));
  });

  it("still gives a colour to a class that was never registered", () => {
    const map = buildClassColorMap(CURRENT_CLASSES);
    expect(classColor(map, { subject: "pte", class_name: "PTE Intensive 79+" })).toMatch(/^#[0-9A-F]{6}$/);
  });
});
