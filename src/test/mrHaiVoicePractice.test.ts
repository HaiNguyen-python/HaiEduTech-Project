import { describe, expect, it } from "vitest";
import {
  countSpokenWords,
  normalizeMrHaiResponse,
  speakingText,
  type MrHaiMessage,
} from "@/lib/mrHaiVoicePractice";

describe("Mr. Hai voice practice helpers", () => {
  it("normalizes a valid AI response and limits feedback lists", () => {
    const response = normalizeMrHaiResponse({
      reply: "  Hello!  ",
      correction: "Try: I went to school.",
      encouragement: "Good effort!",
      strengths: ["Clear answer", "Good vocabulary", "Natural tone", "Extra item"],
      corrections: ["Use the past tense"],
      modelSentences: ["I went to school this morning."],
    });

    expect(response?.reply).toBe("Hello!");
    expect(response?.strengths).toHaveLength(3);
  });

  it("rejects responses without spoken reply text", () => {
    expect(normalizeMrHaiResponse({ reply: "   " })).toBeNull();
    expect(normalizeMrHaiResponse(null)).toBeNull();
  });

  it("removes markdown before text-to-speech", () => {
    expect(speakingText("**Hello** [note] `friend`\n> Welcome!")).toBe("Hello friend Welcome!");
  });

  it("counts learner words without counting Mr. Hai messages", () => {
    const messages: MrHaiMessage[] = [
      { id: "1", role: "assistant", content: "How are you?" },
      { id: "2", role: "user", content: "I am very well today." },
    ];
    expect(countSpokenWords(messages, "english")).toBe(5);
  });

  it("counts Chinese and Japanese characters", () => {
    const messages: MrHaiMessage[] = [{ id: "1", role: "user", content: "今天 很好" }];
    expect(countSpokenWords(messages, "chinese")).toBe(4);
  });
});