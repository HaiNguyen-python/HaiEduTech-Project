import { describe, expect, it } from "vitest";
import { bestTargetAccuracy, matchCandidate } from "@/lib/speakingModeShared";
import { missedWordsFromResults } from "@/lib/speakingWeakWords";

describe("sound drill matching", () => {
  it("uses recogniser alternatives for English", () => {
    expect(matchCandidate(["she", "sheep"], "ship", "sheep", "english")).toBe("b");
    expect(matchCandidate("the ship", "ship", "sheep", "english")).toBe("a");
  });
  it("accepts Chinese homophones and digits via Pinyin", () => {
    expect(matchCandidate("4", "是", "四", "chinese")).toBe("b");
    expect(matchCandidate("事", "是", "四", "chinese")).toBe("a");
    expect(matchCandidate("马", "麻", "马", "chinese")).toBe("b");
  });
  it("scores weak-word review across alternatives", () => {
    expect(bestTargetAccuracy("谢谢", ["写写", "谢谢"], "chinese")).toBe(100);
    expect(bestTargetAccuracy("thought", ["taught", "thought"], "english")).toBe(100);
  });
  it("groups missed Chinese characters into words", () => {
    const r = [{ word: "我", status: "correct" }, { word: "喜", status: "wrong" }, { word: "欢", status: "wrong" }, { word: "你", status: "correct" }];
    expect(missedWordsFromResults(r, "chinese")).toEqual([{ word: "喜欢" }]);
    expect(missedWordsFromResults([{ word: "the", status: "wrong" }, { word: "thought", status: "wrong" }], "english")).toEqual([{ word: "thought" }]);
  });
});
