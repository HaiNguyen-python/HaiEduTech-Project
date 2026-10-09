import { useRef, useState } from "react";
import type { ChangeEvent, CompositionEvent, KeyboardEvent } from "react";

/** Keep IME draft text in the input, but compare only committed text. */
export function useChineseTypingInput(onCommitted?: (value: string, viaEnter: boolean) => void) {
  const [typed, setTyped] = useState("");
  const [committed, setCommitted] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [draft, setDraft] = useState("");
  const composing = useRef(false);
  const endedAt = useRef(-Infinity);
  const enterWhileComposing = useRef(false);
  const reset = () => {
    composing.current = false;
    enterWhileComposing.current = false;
    endedAt.current = -Infinity;
    setIsComposing(false);
    setTyped("");
    setCommitted("");
    setDraft("");
  };
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setTyped(value);
    if (!composing.current && !(event.nativeEvent as InputEvent).isComposing) setCommitted(value);
  };
  const onCompositionStart = () => {
    composing.current = true;
    enterWhileComposing.current = false;
    setIsComposing(true);
    setDraft("");
  };
  const onCompositionUpdate = (event: CompositionEvent<HTMLTextAreaElement>) => setDraft(event.data);
  const onCompositionEnd = (event: CompositionEvent<HTMLTextAreaElement>) => {
    composing.current = false;
    endedAt.current = Date.now();
    setIsComposing(false);
    setDraft("");
    setTyped(event.currentTarget.value);
    setCommitted(event.currentTarget.value);
    const viaEnter = enterWhileComposing.current;
    enterWhileComposing.current = false;
    onCommitted?.(event.currentTarget.value, viaEnter);
  };
  /** IME keys never grade directly; an Enter that commits the IME is reported via onCommitted. */
  const isImeKey = (event: KeyboardEvent) => {
    const enter = event.key === "Enter" || event.code === "Enter" || event.code === "NumpadEnter";
    if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229) {
      if (enter) enterWhileComposing.current = true;
      return true;
    }
    return event.key === "Enter" && Date.now() - endedAt.current < 100;
  };
  return { typed, committed, draft, isComposing, reset, onChange, onCompositionStart, onCompositionUpdate, onCompositionEnd, isImeKey };
}
