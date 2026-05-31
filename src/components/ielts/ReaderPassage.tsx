/**
 * @file ReaderPassage.tsx
 * @description Immersive reading passage renderer for IELTS Reading Practice.
 *
 * Features:
 *  - Multi-color highlighting (yellow / green / pink). Select text → floating
 *    toolbar appears near the selection. Click an existing highlight to remove.
 *  - "📖 Dict" button - opens the global Super Dictionary via the custom event
 *    `super-dict:lookup` (handled in src/components/SuperDictionary.tsx).
 *  - Highlights persist in localStorage per `passageId`.
 *
 * The component is intentionally self-contained so both ExamEngine and
 * FullTestEngine can drop it in without re-implementing selection logic.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Highlighter, BookOpen, Trash2 } from "lucide-react";

type HLColor = "yellow" | "green" | "pink";

interface Highlight {
  id: string;
  text: string;
  color: HLColor;
}

const COLOR_BG: Record<HLColor, string> = {
  yellow: "bg-yellow-300/70 dark:bg-yellow-400/40",
  green: "bg-emerald-300/70 dark:bg-emerald-400/40",
  pink: "bg-pink-300/70 dark:bg-pink-400/40",
};

const COLOR_SWATCH: Record<HLColor, string> = {
  yellow: "bg-yellow-400",
  green: "bg-emerald-400",
  pink: "bg-pink-400",
};

const storageKey = (passageId: string) => `ielts-reading-hl::${passageId}`;

const loadHighlights = (passageId: string): Highlight[] => {
  try {
    const raw = localStorage.getItem(storageKey(passageId));
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const saveHighlights = (passageId: string, hls: Highlight[]) => {
  try {
    localStorage.setItem(storageKey(passageId), JSON.stringify(hls));
  } catch { /* quota */ }
};

interface Span {
  text: string;
  hlId?: string;
  color?: HLColor;
}

/** Build non-overlapping segments for a paragraph given current highlights. */
const segmentParagraph = (text: string, hls: Highlight[]): Span[] => {
  if (!hls.length) return [{ text }];
  // Collect all match ranges (insertion order priority).
  type Range = { start: number; end: number; hlId: string; color: HLColor };
  const ranges: Range[] = [];
  for (const hl of hls) {
    if (!hl.text) continue;
    let from = 0;
    while (from <= text.length) {
      const idx = text.indexOf(hl.text, from);
      if (idx === -1) break;
      const end = idx + hl.text.length;
      const overlaps = ranges.some(r => !(end <= r.start || idx >= r.end));
      if (!overlaps) ranges.push({ start: idx, end, hlId: hl.id, color: hl.color });
      from = idx + Math.max(1, hl.text.length);
    }
  }
  if (!ranges.length) return [{ text }];
  ranges.sort((a, b) => a.start - b.start);
  const out: Span[] = [];
  let cursor = 0;
  for (const r of ranges) {
    if (r.start > cursor) out.push({ text: text.slice(cursor, r.start) });
    out.push({ text: text.slice(r.start, r.end), hlId: r.hlId, color: r.color });
    cursor = r.end;
  }
  if (cursor < text.length) out.push({ text: text.slice(cursor) });
  return out;
};

interface ToolbarState {
  visible: boolean;
  x: number;
  y: number;
  selectedText: string;
}

interface Props {
  passageId: string;
  passage: string;
  fontSize: number;
  paperTheme: "light" | "dark";
}

export const ReaderPassage: React.FC<Props> = ({ passageId, passage, fontSize, paperTheme }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>(() => loadHighlights(passageId));
  const [toolbar, setToolbar] = useState<ToolbarState>({ visible: false, x: 0, y: 0, selectedText: "" });

  // Reset on passage change
  useEffect(() => {
    setHighlights(loadHighlights(passageId));
    setToolbar(t => ({ ...t, visible: false }));
  }, [passageId]);

  useEffect(() => { saveHighlights(passageId, highlights); }, [passageId, highlights]);

  const paragraphs = useMemo(() => passage.split("\n\n"), [passage]);

  const closeToolbar = useCallback(() => setToolbar(t => ({ ...t, visible: false })), []);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { closeToolbar(); return; }
    const text = sel.toString().trim();
    if (!text || text.length > 240) { closeToolbar(); return; }
    // Selection must be inside the container
    if (!containerRef.current) return;
    const anchor = sel.anchorNode;
    if (!anchor || !containerRef.current.contains(anchor)) { closeToolbar(); return; }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setToolbar({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      selectedText: text,
    });
  }, [closeToolbar]);

  // Dismiss toolbar on outside click / scroll / Esc
  useEffect(() => {
    const onScroll = () => closeToolbar();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeToolbar(); };
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const target = e.target as Node;
      // Allow clicks on the toolbar itself
      const tb = document.getElementById("reader-toolbar");
      if (tb && tb.contains(target)) return;
      if (!containerRef.current.contains(target)) closeToolbar();
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [closeToolbar]);

  const addHighlight = (color: HLColor) => {
    const text = toolbar.selectedText;
    if (!text) return;
    setHighlights(hs => [...hs, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text, color }]);
    window.getSelection()?.removeAllRanges();
    closeToolbar();
  };

  const removeOverlapping = () => {
    const text = toolbar.selectedText;
    if (!text) return;
    setHighlights(hs => hs.filter(h => !text.includes(h.text) && !h.text.includes(text)));
    window.getSelection()?.removeAllRanges();
    closeToolbar();
  };

  const removeById = (id: string) => {
    setHighlights(hs => hs.filter(h => h.id !== id));
  };

  const openDict = () => {
    const text = toolbar.selectedText;
    if (!text) return;
    // Take first word for dictionary lookup
    const word = text.split(/\s+/)[0].replace(/[^A-Za-z'-]/g, "");
    if (word) {
      window.dispatchEvent(new CustomEvent("super-dict:lookup", { detail: { word } }));
    }
    closeToolbar();
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseUp={handleMouseUp}
        className="max-w-none font-['Georgia',_'Merriweather',_serif] leading-[1.85] select-text"
        style={{ fontSize: `${fontSize}px` }}
      >
        {paragraphs.map((para, i) => {
          const segs = segmentParagraph(para, highlights);
          return (
            <p key={i} className="mb-4 break-inside-avoid">
              {segs.map((s, j) =>
                s.hlId ? (
                  <span
                    key={j}
                    className={cn(
                      "rounded-sm px-0.5 cursor-pointer transition-opacity hover:opacity-70",
                      s.color && COLOR_BG[s.color]
                    )}
                    title="Click to remove highlight"
                    onClick={(e) => { e.stopPropagation(); removeById(s.hlId!); }}
                  >
                    {s.text}
                  </span>
                ) : (
                  <span key={j}>{s.text}</span>
                )
              )}
            </p>
          );
        })}
      </div>

      {toolbar.visible && (
        <div
          id="reader-toolbar"
          role="toolbar"
          aria-label="Reading toolbar"
          className="fixed z-[75] flex items-center gap-0.5 rounded-full border bg-card px-1.5 py-1 shadow-xl -translate-x-1/2 -translate-y-full"
          style={{ left: toolbar.x, top: toolbar.y }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {(["yellow", "green", "pink"] as HLColor[]).map(c => (
            <button
              key={c}
              onClick={() => addHighlight(c)}
              className={cn(
                "w-6 h-6 rounded-full border border-border/60 hover:scale-110 transition-transform",
                COLOR_SWATCH[c]
              )}
              title={`Highlight ${c}`}
              aria-label={`Highlight ${c}`}
            >
              <Highlighter className="w-3 h-3 mx-auto text-black/50" />
            </button>
          ))}
          <span className="w-px h-4 bg-border mx-1" />
          <button
            onClick={openDict}
            className="inline-flex items-center gap-1 px-2 h-7 rounded-full text-xs font-semibold text-primary hover:bg-primary/10"
            title="Look up in Dictionary"
          >
            <BookOpen className="w-3.5 h-3.5" /> Dict
          </button>
          <button
            onClick={removeOverlapping}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            title="Remove highlight"
            aria-label="Remove highlight"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hint */}
      <p className={cn(
        "text-[11px] mt-3 italic",
        paperTheme === "light" ? "text-slate-500" : "text-slate-400"
      )}>
        💡 Select text to highlight (3 colors) or look up in the Dictionary. Click a highlight to remove.
      </p>
    </>
  );
};

export default ReaderPassage;
