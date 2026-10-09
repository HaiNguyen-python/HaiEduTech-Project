import { useRef, useState } from "react";
import type { ChangeEvent, CompositionEvent, KeyboardEvent } from "react";

/** Keep IME draft text in the input, but compare only committed text. */
export function useChineseTypingInput() {
  const [typed, setTyped] = useState("");
  const [committed, setCommitted] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const composing = useRef(false);
  const endedAt = useRef(-Infinity);
  const reset = () => {
    composing.current = false;
    endedAt.current = -Infinity;
    setIsComposing(false);
    setTyped("");
    setCommitted("");
  };
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setTyped(value);
    if (!composing.current && !(event.nativeEvent as InputEvent).isComposing) setCommitted(value);
  };
  const onCompositionStart = () => {
    composing.current = true;
    setIsComposing(true);
  };
  const onCompositionEnd = (event: CompositionEvent<HTMLTextAreaElement>) => {
    composing.current = false;
    endedAt.current = Date.now();
    setIsComposing(false);
    setTyped(event.currentTarget.value);
    setCommitted(event.currentTarget.value);
  };
  const isImeKey = (event: KeyboardEvent) =>
    composing.current || event.nativeEvent.isComposing || event.keyCode === 229 ||
    (event.key === "Enter" && Date.now() - endedAt.current < 100);
  return { typed, committed, isComposing, reset, onChange, onCompositionStart, onCompositionEnd, isImeKey };
}
