import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { REACTIONS, reactionMap, type ReactionType } from "@/lib/yourCornerReactions";

interface Props {
  myReaction: ReactionType | null;
  pop?: boolean;
  onSelect: (type: ReactionType) => void;
}

const CLOSE_DELAY = 400;
const LONG_PRESS = 320;

/**
 * Facebook-style reaction trigger with forgiving hover intent:
 * - closes 400ms after the cursor leaves (cancelled if it comes back)
 * - an invisible bridge covers the gap between button and panel
 * - long-press opens it on touch, arrows/Escape drive it from the keyboard
 */
export default function ReactionPicker({ myReaction, pop, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useEffect(() => () => {
    cancelClose();
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
  }, []);

  // Close when tapping/clicking outside (mobile + desktop).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const pick = (type: ReactionType) => {
    cancelClose();
    setOpen(false);
    onSelect(type);
  };

  const startPress = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    longPressed.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      setOpen(true);
      setFocusIdx(Math.max(0, REACTIONS.findIndex((r) => r.key === myReaction)));
    }, LONG_PRESS);
  };
  const endPress = () => {
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const current = myReaction ? reactionMap.get(myReaction) : null;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          return;
        }
        if (!open && (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp")) {
          setOpen(true);
          return;
        }
        if (!open) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setFocusIdx((i) => (i + 1) % REACTIONS.length);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setFocusIdx((i) => (i - 1 + REACTIONS.length) % REACTIONS.length);
        } else if (e.key === "Enter" || e.key === " ") {
          if (document.activeElement?.getAttribute("data-reaction-item") === "true") return;
        }
      }}
    >
      {open && (
        <>
          {/* Invisible bridge so the cursor never crosses dead space */}
          <div className="absolute bottom-full left-0 h-3 w-56 max-w-[80vw]" aria-hidden="true" />
          <div
            role="menu"
            aria-label="Chọn cảm xúc"
            className="absolute bottom-full left-0 mb-2 z-30 flex items-center gap-1 rounded-full border bg-popover px-2 py-1.5 shadow-xl animate-fade-in"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {REACTIONS.map((r, i) => (
              <button
                key={r.key}
                type="button"
                data-reaction-item="true"
                role="menuitem"
                title={r.label}
                aria-label={r.label}
                onClick={() => pick(r.key)}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none transition-transform hover:-translate-y-1 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  myReaction === r.key || focusIdx === i ? "scale-110 bg-muted" : ""
                }`}
              >
                {r.emoji}
                <span className="pointer-events-none absolute -top-7 hidden whitespace-nowrap rounded bg-foreground px-2 py-0.5 text-[11px] text-background group-hover:block">
                  {r.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <Button
        variant="ghost"
        size="sm"
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerCancel={endPress}
        onClick={() => {
          if (longPressed.current) {
            longPressed.current = false;
            return;
          }
          onSelect(myReaction ?? "like");
        }}
        onFocus={() => setOpen(true)}
        onBlur={scheduleClose}
        className={`select-none ${current ? current.color : "text-muted-foreground"}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {current ? (
          <span className={`mr-2 text-base leading-none transition-transform ${pop ? "scale-150" : "scale-100"}`}>
            {current.emoji}
          </span>
        ) : (
          <ThumbsUp className="w-4 h-4 mr-2" />
        )}
        {current ? current.label : "Thích"}
      </Button>
    </div>
  );
}
