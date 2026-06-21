import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export type Mentionable = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
};

interface Props {
  value: string;
  onChange: (v: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mentionables: Mentionable[];
}

export type MentionInputHandle = { focus: () => void };

/**
 * Textarea with inline @mention autocomplete.
 * Triggers when user types `@` and shows matching mentionables.
 */
const MentionInput = forwardRef<MentionInputHandle, Props>(function MentionInput(
  { value, onChange, onKeyDown, onFocus, placeholder, className, maxLength, mentionables },
  ref
) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useImperativeHandle(ref, () => ({ focus: () => taRef.current?.focus() }));

  const updateTrigger = (text: string, caret: number) => {
    const before = text.slice(0, caret);
    const m = before.match(/(?:^|\s)@([\p{L}0-9_]*)$/u);
    if (m) {
      setQuery(m[1].toLowerCase());
      setActive(0);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const matches = open
    ? mentionables
        .filter((u) => (u.full_name ?? "").toLowerCase().includes(query))
        .slice(0, 6)
    : [];

  useEffect(() => {
    if (matches.length === 0) setOpen(false);
  }, [matches.length]);

  const insertMention = (u: Mentionable) => {
    const ta = taRef.current;
    if (!ta) return;
    const caret = ta.selectionStart ?? value.length;
    const before = value.slice(0, caret);
    const after = value.slice(caret);
    const replaced = before.replace(/@([\p{L}0-9_]*)$/u, `@${(u.full_name ?? "user").replace(/\s+/g, "_")} `);
    const next = replaced + after;
    onChange(next);
    setOpen(false);
    requestAnimationFrame(() => {
      const pos = replaced.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="relative w-full">
      <Textarea
        ref={taRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          updateTrigger(e.target.value, e.target.selectionStart ?? e.target.value.length);
        }}
        onKeyDown={(e) => {
          if (open && matches.length > 0) {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % matches.length);
              return;
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + matches.length) % matches.length);
              return;
            }
            if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              insertMention(matches[active]);
              return;
            }
            if (e.key === "Escape") {
              setOpen(false);
              return;
            }
          }
          onKeyDown?.(e);
        }}
        onFocus={onFocus}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
      />

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-md border bg-popover shadow-lg overflow-hidden">
          <div className="px-2 py-1 text-[10px] text-muted-foreground bg-muted/50">Tag bạn bè</div>
          {matches.map((u, i) => {
            const n = u.full_name?.trim() || "Học viên";
            const ini = n.split(/\s+/).slice(-1)[0]?.[0]?.toUpperCase() || "?";
            return (
              <button
                type="button"
                key={u.user_id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertMention(u);
                }}
                onMouseEnter={() => setActive(i)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm ${
                  active === i ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <div className="h-7 w-7 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {u.avatar_url ? <img src={u.avatar_url} alt={n} className="w-full h-full object-cover" /> : ini}
                </div>
                <span className="truncate">{n}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default MentionInput;
