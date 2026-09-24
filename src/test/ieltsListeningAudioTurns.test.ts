import { describe, expect, it } from "vitest";
import { buildListeningAudioTurnPlan, LISTENING_TTS_MAX_CHARS } from "@/lib/ieltsListeningAudioTurns";

describe("IELTS listening audio turns", () => {
  it("merges consecutive lines by the same speaker", () => {
    const plan = buildListeningAudioTurnPlan(
      "Guide: Welcome to the park.\nGuide: We begin beside the lake.\nVisitor: Is the cafe open?",
    );

    expect(plan.turns).toHaveLength(2);
    expect(plan.turns[0]).toMatchObject({ speaker: "Guide", text: "Welcome to the park. We begin beside the lake." });
    expect(plan.chunkTurn).toEqual([0, 0, 1]);
    expect(plan.turnFirstChunk).toEqual([0, 2]);
  });

  it("keeps generated turns within the speech request budget", () => {
    const sentence = "This sentence carries enough context for a natural recording. ";
    const plan = buildListeningAudioTurnPlan(`Lecturer: ${sentence.repeat(40)}`);

    expect(plan.turns.length).toBeGreaterThan(1);
    expect(plan.turns.every((turn) => turn.text.length <= LISTENING_TTS_MAX_CHARS)).toBe(true);
  });
});