import { afterEach, describe, expect, it, vi } from "vitest";
import { playFinnishTts, stopFinnishTts } from "@/lib/finnishTts";

vi.mock("@/lib/ttsFunctionFetch", () => ({
  invokeTtsFunction: vi.fn().mockRejectedValue(new Error("offline")),
  waitForAudioForeground: vi.fn().mockResolvedValue(undefined),
}));

afterEach(() => { stopFinnishTts(); vi.unstubAllGlobals(); });

const setup = (voiceLanguage: string) => {
  const voice = { lang: voiceLanguage, name: "Test voice" };
  const speak = vi.fn(utterance => utterance.onend?.());
  vi.stubGlobal("speechSynthesis", {
    cancel: vi.fn(), resume: vi.fn(), getVoices: () => [voice], speak,
  });
  vi.stubGlobal("SpeechSynthesisUtterance", class {
    constructor(public text: string) {}
  });
  vi.stubGlobal("Audio", class {
    onerror?: () => void;
    constructor() { queueMicrotask(() => this.onerror?.()); }
    pause() {}
    play() { return Promise.reject(new Error("offline")); }
  });
  return { voice, speak };
};

describe("Finnish arcade pronunciation fallback", () => {
  it("never reads Finnish with the available English voice", async () => {
    const { speak } = setup("en-US");
    expect(await playFinnishTts("Hyvää huomenta")).toBe(false);
    expect(speak).not.toHaveBeenCalled();
  });
  it("explicitly binds a Finnish voice when network audio fails", async () => {
    const { voice, speak } = setup("fi-FI");
    expect(await playFinnishTts("Hyvää huomenta")).toBe(true);
    expect(speak).toHaveBeenCalledWith(expect.objectContaining({ lang: "fi-FI", voice }));
  });
});