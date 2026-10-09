import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent, CompositionEvent, KeyboardEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { useChineseTypingInput } from "../hooks/useChineseTypingInput";
import { liveChineseTyping, normalizeLetterTyping } from "../lib/chineseLetterTyping";

const change = (value: string, isComposing = false) => ({ currentTarget: { value }, nativeEvent: { isComposing } }) as ChangeEvent<HTMLTextAreaElement>;
const end = (value: string) => ({ currentTarget: { value } }) as CompositionEvent<HTMLTextAreaElement>;
const enter = (keyCode = 13) => ({ key: "Enter", keyCode, nativeEvent: { isComposing: false } }) as KeyboardEvent;

describe("Chinese IME input", () => {
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
