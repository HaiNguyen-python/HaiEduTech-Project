import { describe, expect, it } from "vitest";
import { findKeyPhraseRanges } from "@/lib/highlightKeywords";

const highlighted = (text: string, phrase: string) =>
  findKeyPhraseRanges(text, [phrase]).map((range) => text.slice(range.start, range.end));

describe("natural key phrase highlighting", () => {
  it.each([
    ["Linh will chair the meeting while I am away.", "to chair a meeting", "chair the meeting"],
    ["Orders rose sharply in the second quarter.", "to rise sharply", "rose sharply"],
    ["Costs fell steadily after the audit.", "to fall steadily", "fell steadily"],
    ["Would Tuesday at 10:00 suit you?", "Would ... suit you?", "Would Tuesday at 10:00 suit you"],
    ["Would you mind sharing the raw data?", "Would you mind + V-ing", "Would you mind"],
    ["The ROI is positive after five months.", "return on investment (ROI)", "ROI"],
    ["I will put you through to accounts.", "to put someone through", "put you through"],
    ["Let us park pricing and return to it later.", "to park an issue", "park"],
  ])("matches %s from %s", (text, phrase, expected) => {
    expect(highlighted(text, phrase)).toContain(expected);
  });

  it("does not match a phrase inside another word", () => {
    expect(highlighted("The target was rebuilt.", "get")).toEqual([]);
  });
});