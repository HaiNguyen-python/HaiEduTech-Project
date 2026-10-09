import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent, CompositionEvent, KeyboardEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { useChineseTypingInput } from "../hooks/useChineseTypingInput";
import { activePinyinIndex, liveChineseTyping, normalizeLetterTyping, resolveChineseTyping } from "../lib/chineseLetterTyping";

const change = (value: string, isComposing = false) => ({ currentTarget: { value }, nativeEvent: { isComposing } }) as unknown as ChangeEvent<HTMLTextAreaElement>;
const end = (value: string) => ({ currentTarget: { value } }) as CompositionEvent<HTMLTextAreaElement>;
const enter = (keyCode = 13) => ({ key: "Enter", keyCode, nativeEvent: { isComposing: false } }) as KeyboardEvent;

describe("Chinese IME input", () => {
  it("maps the current Pinyin syllable to exactly one Hanzi", () => {
    const target = "我先在家学习，后来去了图书馆。";
    expect(activePinyinIndex(target, "w")).toBe(0);
    expect(activePinyinIndex(target, "wo")).toBe(0);
    expect(activePinyinIndex(target, "wox")).toBe(1);
    expect(activePinyinIndex(target, "woxian")).toBe(1);
    expect(activePinyinIndex(target, "我先zai")).toBe(2);
    expect(activePinyinIndex(target, "我先zaijia")).toBe(3);
    expect(activePinyinIndex(target, "我先", "zai")).toBe(2);
    expect(activePinyinIndex(target, "我先在家")).toBeNull();
    expect(activePinyinIndex(target, "我先在家学习，hòu")).toBe(6);
  });
  it("does not compare Pinyin drafts before Hanzi is committed", () => {
    const { result } = renderHook(useChineseTypingInput);
    act(() => result.current.onCompositionStart());
    act(() => result.current.onChange(change("woxian", true)));
    expect(result.current.typed).toBe("woxian");
    expect(result.current.committed).toBe("");
    expect(result.current.isImeKey(enter())).toBe(true);
    act(() => result.current.onCompositionEnd(end("我先")));
    expect(result.current.committed).toBe("我先");
  });
  it("preserves committed prefix while the next word is composed", () => {
    const { result } = renderHook(useChineseTypingInput);
    act(() => result.current.onChange(change("我先")));
    act(() => result.current.onCompositionStart());
    act(() => result.current.onChange(change("我先zaijia", true)));
    expect(result.current.committed).toBe("我先");
    act(() => result.current.onCompositionEnd(end("我先在家")));
    expect(result.current.committed).toBe("我先在家");
    act(() => result.current.onChange(change("我先在")));
    expect(result.current.committed).toBe("我先在");
  });
  it("blocks IME Enter, including the post-composition browser event", () => {
    vi.spyOn(Date, "now").mockReturnValue(1000);
    const { result } = renderHook(useChineseTypingInput);
    act(() => result.current.onCompositionEnd(end("我")));
    expect(result.current.isImeKey(enter())).toBe(true);
    vi.spyOn(Date, "now").mockReturnValue(1200);
    expect(result.current.isImeKey(enter())).toBe(false);
    expect(result.current.isImeKey(enter(229))).toBe(true);
    vi.restoreAllMocks();
  });
  it("handles cancellation and resets drafts between exercises", () => {
    const { result } = renderHook(useChineseTypingInput);
    act(() => result.current.onChange(change("我")));
    act(() => result.current.onCompositionStart());
    act(() => result.current.onChange(change("我xian", true)));
    act(() => result.current.onCompositionEnd(end("我")));
    expect(result.current.committed).toBe("我");
    act(() => result.current.reset());
    expect(result.current.typed).toBe("");
    expect(result.current.committed).toBe("");
    expect(result.current.isComposing).toBe(false);
  });
  it("ignores trailing Pinyin without composition events but preserves scoring", () => {
    expect(liveChineseTyping("woxian")).toBe("");
    expect(liveChineseTyping("我先，zaijia")).toBe("我先");
    expect(liveChineseTyping("我先在家。")).toBe("我先在家");
    expect(liveChineseTyping("我先túshūguǎn")).toBe("我先");
    expect(normalizeLetterTyping("我先，zaijia")).toBe("我先zaijia");
  });
});

describe("Chinese typing resolution", () => {
  const target = "她跑得很快。";
  it("colors every Hanzi already typed as Pinyin, not only the current one", () => {
    const r = resolveChineseTyping(target, "ta'pao'de'hen'kuai");
    expect(r.chars.join("")).toBe("她跑得很快");
    expect(r.active).toBe(4);
    expect(r.complete).toBe(true);
  });
  it("keeps the partial syllable active without coloring later Hanzi", () => {
    const r = resolveChineseTyping(target, "tapaod");
    expect(r.chars.join("")).toBe("她跑");
    expect(r.active).toBe(2);
    expect(r.pendingError).toBe(false);
  });
  it("flags a Pinyin typo on the current Hanzi only", () => {
    const r = resolveChineseTyping(target, "taq");
    expect(r.chars.join("")).toBe("她");
    expect(r.active).toBe(1);
    expect(r.pendingError).toBe(true);
  });
  it("mixes committed Hanzi with pending Pinyin and keeps wrong Hanzi for scoring", () => {
    expect(resolveChineseTyping(target, "他跑dehen").chars.join("")).toBe("他跑得很");
  });
  it("submits once composition commits the full sentence", () => {
    const committed: string[] = [];
    const { result } = renderHook(() => useChineseTypingInput((v) => committed.push(v)));
    act(() => result.current.onCompositionStart());
    act(() => result.current.onCompositionEnd(end("tapaodehenkuai")));
    expect(committed).toEqual(["tapaodehenkuai"]);
    expect(resolveChineseTyping(target, committed[0]).complete).toBe(true);
  });
});
