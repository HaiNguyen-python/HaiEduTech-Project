/**
 * ChatComposer - isolated input row for the AI Study Pet chatbot.
 *
 * The draft text lives in this small component instead of the 1800-line
 * ChatBot shell, so a keystroke only re-renders the textarea row - not the
 * whole transcript, markdown bubbles, drag layer and pet artwork. This is
 * what removes the typing lag on long conversations.
 */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Mic, MicOff, Paperclip, Send } from "lucide-react";

export type ChatComposerHandle = {
  setText: (text: string) => void;
  focus: () => void;
  clear: () => void;
};

type Props = {
  disabled: boolean;
  locked: boolean;
  isRecording: boolean;
  hasAttachment: boolean;
  onToggleRecording: () => void;
  onAttachClick: () => void;
  onSend: (text: string) => void;
  t: (vi: string, en: string) => string;
};

const ChatComposer = forwardRef<ChatComposerHandle, Props>(function ChatComposer(
  { disabled, locked, isRecording, hasAttachment, onToggleRecording, onAttachClick, onSend, t },
  ref,
) {
  const [text, setText] = useState("");
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    setText: (value: string) => setText(value),
    clear: () => setText(""),
    focus: () => areaRef.current?.focus(),
  }));

  const submit = () => {
    const value = text.trim();
    if (!value && !hasAttachment) return;
    if (disabled || locked) return;
    setText("");
    onSend(value);
    // Keep the caret in the box so students can keep typing straight away.
    requestAnimationFrame(() => areaRef.current?.focus());
  };

  return (
    <div className="flex items-center gap-1.5">
      {/* Microphone - Vietnamese-first voice input with English phrase support */}
      <div className="flex shrink-0 items-center gap-1 rounded-xl bg-secondary/60 p-1">
        <button
          type="button"
          onClick={onToggleRecording}
          disabled={disabled || locked}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
            isRecording
              ? "animate-pulse bg-destructive text-destructive-foreground"
              : "bg-card text-muted-foreground hover:text-primary"
          } disabled:opacity-50`}
          title={
            isRecording
              ? t("Dừng ghi âm", "Stop recording")
              : t("Nói tiếng Việt hoặc tiếng Anh", "Speak Vietnamese or English")
          }
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
      </div>

      <button
        type="button"
        onClick={onAttachClick}
        disabled={disabled || locked}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 disabled:opacity-50"
        title={t("Đính kèm file hoặc ảnh", "Attach file or image")}
      >
        <Paperclip className="h-4 w-4" />
      </button>

      <textarea
        ref={areaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        rows={1}
        placeholder={
          locked
            ? t("Chat đã bị khóa...", "Chat is locked...")
            : t("Hỏi thầy Hải...", "Ask Teacher Hai...")
        }
        className="min-w-0 flex-1 max-h-32 resize-none rounded-xl border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none disabled:opacity-50"
        disabled={disabled || locked}
      />

      <button
        type="button"
        onClick={submit}
        disabled={disabled || locked || (!text.trim() && !hasAttachment)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
        aria-label={t("Gửi", "Send")}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
});

export default ChatComposer;
