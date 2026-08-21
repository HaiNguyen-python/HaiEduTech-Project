/**
 * @file NotebookWhiteboard.tsx
 * @description Live whiteboard surface inside the floating notebook so the
 * teacher can draw/explain like on a real classroom board, then insert the
 * drawing into the current note.
 *
 * Notes:
 * - Pointer Events + touch-action:none so pen/finger/mouse all work.
 * - Strokes are kept as data (not just pixels) so Undo/Redo and background
 *   changes can re-render losslessly, and resizing never wipes the board.
 * - Ink is composited on an offscreen layer so the eraser truly removes ink
 *   (instead of painting over the grid / chalk background).
 * - The stroke list is mirrored to localStorage so switching tabs or closing
 *   the notebook does not lose the drawing.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Eraser, Undo2, Redo2, Trash2, Download, ImagePlus, Pen, Highlighter } from "lucide-react";

type BoardBg = "white" | "grid" | "chalk";

interface Point {
  x: number;
  y: number;
  /** Pen pressure factor (1 = default) for variable stroke width. */
  p?: number;
}

interface Stroke {
  color: string;
  width: number;
  alpha: number;
  /** true = removes ink instead of adding it. */
  erase?: boolean;
  /** Normalized points (0..1) so the drawing scales with the panel. */
  points: Point[];
}

// Rich palettes so a lesson can colour-code freely on either board style.
const PEN_COLORS = [
  "#0f172a", "#475569", "#dc2626", "#ea580c", "#f59e0b", "#facc15",
  "#10B981", "#059669", "#3B82F6", "#1d4ed8", "#9333ea", "#db2777",
];
const CHALK_COLORS = [
  "#ffffff", "#e2e8f0", "#fde68a", "#fca5a5", "#f9a8d4", "#c4b5fd",
  "#93c5fd", "#67e8f9", "#86efac", "#bef264", "#fdba74", "#f0abfc",
];
const WIDTHS = [2, 4, 8];
const MAX_STROKES = 4000;

/** Pen-shaped SVG cursor (hotspot at the nib) so drawing feels precise. */
const penCursor = (hex: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
<path d="M3 25l1.6-5.4L18.2 6a2.6 2.6 0 013.7 0l1.1 1.1a2.6 2.6 0 010 3.7L9.4 24.4 4 26z" fill="${hex}" stroke="#ffffff" stroke-width="1.4"/>
<path d="M18 6.4l3.6 3.6" stroke="#ffffff" stroke-width="1.4"/>
<path d="M3 25l2.6.9L4 26z" fill="#ffffff"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 2 26, crosshair`;
};

/** Highlighter cursor. */
const markerCursor = (hex: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
<path d="M4 24h8l1.5-3H6z" fill="${hex}" stroke="#ffffff" stroke-width="1.2"/>
<path d="M8 20l9.5-13a2.4 2.4 0 013.6-.3l1.6 1.6a2.4 2.4 0 01-.2 3.5L13 20z" fill="${hex}" opacity="0.75" stroke="#ffffff" stroke-width="1.2"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 4 24, crosshair`;
};

/** Eraser cursor. */
const eraserCursor = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
<rect x="4" y="12" width="18" height="10" rx="2" transform="rotate(-30 13 17)" fill="#f8fafc" stroke="#0f172a" stroke-width="1.6"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 14 14, cell`;
};

const STORAGE_KEY = "notebook-whiteboard-strokes";
const BG_KEY = "notebook-whiteboard-bg";

interface Props {
  /** Insert the board as a PNG into the note editor. */
  onInsert: (dataUrl: string) => void;
}

const NotebookWhiteboard = ({ onInsert }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inkRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const current = useRef<Stroke | null>(null);
  const renderRef = useRef<() => void>(() => {});

  const [strokes, setStrokes] = useState<Stroke[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? (parsed as Stroke[]) : [];
    } catch {
      return [];
    }
  });
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [bg, setBg] = useState<BoardBg>(() => {
    const raw = localStorage.getItem(BG_KEY);
    return raw === "grid" || raw === "chalk" ? raw : "white";
  });
  const [tool, setTool] = useState<"pen" | "highlight" | "eraser">("pen");
  const [width, setWidth] = useState(4);
  const [color, setColor] = useState(PEN_COLORS[0]);

  const palette = bg === "chalk" ? CHALK_COLORS : PEN_COLORS;

  useEffect(() => {
    // Keep the active ink readable when the board style changes.
    setColor((prev) => {
      const next = bg === "chalk" ? CHALK_COLORS : PEN_COLORS;
      return next.includes(prev) ? prev : next[0];
    });
    localStorage.setItem(BG_KEY, bg);
  }, [bg]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(strokes));
    } catch {
      /* quota - ignore */
    }
  }, [strokes]);

  const paintBackground = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = bg === "chalk" ? "#14532d" : "#ffffff";
      ctx.fillRect(0, 0, w, h);
      if (bg === "grid") {
        ctx.strokeStyle = "#dbeafe";
        ctx.lineWidth = 1;
        const step = 28;
        for (let x = step; x < w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = step; y < h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    },
    [bg],
  );

  /** Draw one stroke onto the ink layer, segment by segment for pressure. */
  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, s: Stroke, w: number, h: number) => {
    if (s.points.length === 0) return;
    ctx.save();
    ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
    ctx.globalAlpha = s.erase ? 1 : s.alpha;
    ctx.strokeStyle = s.color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    if (s.points.length === 1) {
      const p = s.points[0];
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, Math.max(0.6, (s.width * (p.p ?? 1)) / 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    for (let i = 1; i < s.points.length; i++) {
      const a = s.points[i - 1];
      const b = s.points[i];
      ctx.lineWidth = Math.max(0.5, s.width * ((a.p ?? 1) + (b.p ?? 1)) * 0.5);
      ctx.beginPath();
      ctx.moveTo(a.x * w, a.y * h);
      ctx.lineTo(b.x * w, b.y * h);
      ctx.stroke();
    }
    ctx.restore();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    // Ink layer (same pixel size as the visible canvas).
    let ink = inkRef.current;
    if (!ink) {
      ink = document.createElement("canvas");
      inkRef.current = ink;
    }
    if (ink.width !== canvas.width || ink.height !== canvas.height) {
      ink.width = canvas.width;
      ink.height = canvas.height;
    }
    const ictx = ink.getContext("2d");
    if (!ictx) return;
    ictx.setTransform(1, 0, 0, 1, 0, 0);
    ictx.clearRect(0, 0, ink.width, ink.height);
    ictx.scale(dpr, dpr);

    for (const s of strokes) drawStroke(ictx, s, w, h);
    if (current.current) drawStroke(ictx, current.current, w, h);

    paintBackground(ctx, w, h);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(ink, 0, 0);
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }, [strokes, paintBackground, drawStroke]);

  renderRef.current = render;

  // Size the canvas to its wrapper with DPR scaling, then repaint.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrap.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      renderRef.current();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    render();
  }, [render]);

  const pointOf = (e: React.PointerEvent): Point => {
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const pressure = e.pointerType === "pen" && e.pressure > 0 && e.pressure < 1 ? 0.5 + e.pressure : 1;
    return {
      x: (e.clientX - rect.left) / Math.max(1, rect.width),
      y: (e.clientY - rect.top) / Math.max(1, rect.height),
      p: pressure,
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    drawing.current = true;
    current.current = {
      color: tool === "eraser" ? "#000000" : color,
      width: tool === "eraser" ? width * 5 : tool === "highlight" ? width * 4 : width,
      alpha: tool === "highlight" ? 0.3 : 1,
      erase: tool === "eraser",
      points: [pointOf(e)],
    };
    render();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || !current.current) return;
    const pts = current.current.points;
    const next = pointOf(e);
    const last = pts[pts.length - 1];
    // Skip micro-moves to keep stroke data light without visible loss.
    if (last && Math.abs(next.x - last.x) < 0.0008 && Math.abs(next.y - last.y) < 0.0008) return;
    pts.push(next);
    render();
  };

  const endStroke = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const s = current.current;
    current.current = null;
    if (s && s.points.length > 0) {
      setStrokes((prev) => {
        const next = [...prev, s];
        return next.length > MAX_STROKES ? next.slice(next.length - MAX_STROKES) : next;
      });
      setRedoStack([]);
    } else {
      render();
    }
  };

  const undo = useCallback(() => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((r) => [...r, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  /** Quick clear: wipes the board instantly, still undoable via Ctrl+Z. */
  const clearAll = useCallback(() => {
    drawing.current = false;
    current.current = null;
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      setRedoStack([...prev]);
      return [];
    });
  }, []);

  /** Restore the last cleared board (redo of a quick clear). */
  const restoreCleared = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      setStrokes((s) => (s.length === 0 ? [...prev] : [...s, ...prev]));
      return [];
    });
  }, []);

  // Keyboard shortcuts while the board is focused/hovered.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const target = e.target as HTMLElement | null;
      const typing = !!target?.closest?.("input, textarea, [contenteditable='true']");
      if (typing) return;
      const inBoard = !!target?.closest?.("[data-whiteboard-root='1']");
      if (!inBoard) return;
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        clearAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo, clearAll]);

  const exportPng = () => {
    render();
    return canvasRef.current?.toDataURL("image/png") || "";
  };

  const download = () => {
    const url = exportPng();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `bang-trang-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const btn = "p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40";
  const btnActive = "p-1.5 rounded-md bg-primary/20 text-primary";

  return (
    <div className="flex flex-col h-full min-h-0 gap-2" data-whiteboard-root="1" tabIndex={-1}>
      {/* Board toolbar */}
      <div className="flex items-center gap-1 flex-wrap px-1">
        <button type="button" title="Bút" onClick={() => setTool("pen")} className={tool === "pen" ? btnActive : btn}>
          <Pen size={14} />
        </button>
        <button type="button" title="Bút dạ quang" onClick={() => setTool("highlight")} className={tool === "highlight" ? btnActive : btn}>
          <Highlighter size={14} />
        </button>
        <button type="button" title="Gôm" onClick={() => setTool("eraser")} className={tool === "eraser" ? btnActive : btn}>
          <Eraser size={14} />
        </button>

        <span className="w-px h-5 bg-border mx-1" />

        <div className="flex items-center gap-1 flex-wrap max-w-[220px]">
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setColor(c);
                if (tool === "eraser") setTool("pen");
              }}
              className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${color === c && tool !== "eraser" ? "ring-2 ring-primary ring-offset-1" : ""}`}
              style={{ backgroundColor: c, borderColor: "hsl(var(--border))" }}
              title="Màu bút"
            />
          ))}
          {/* Free colour picker for anything outside the presets */}
          <label
            className="w-5 h-5 rounded-full border border-border overflow-hidden cursor-pointer relative"
            title="Chọn màu tự do"
            style={{
              background:
                "conic-gradient(#dc2626,#f59e0b,#facc15,#10B981,#3B82F6,#9333ea,#dc2626)",
            }}
          >
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                if (tool === "eraser") setTool("pen");
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <span className="w-px h-5 bg-border mx-1" />

        {WIDTHS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWidth(w)}
            className={`w-6 h-6 rounded-md flex items-center justify-center ${width === w ? "bg-primary/20" : "hover:bg-accent"}`}
            title={`Độ dày ${w}`}
          >
            <span className="rounded-full bg-foreground" style={{ width: w + 2, height: w + 2 }} />
          </button>
        ))}

        <span className="w-px h-5 bg-border mx-1" />

        <select
          value={bg}
          onChange={(e) => setBg(e.target.value as BoardBg)}
          className="text-xs border border-border rounded-md px-1.5 py-1 bg-background text-foreground"
          title="Kiểu bảng"
        >
          <option value="white">Bảng trắng</option>
          <option value="grid">Giấy kẻ ô</option>
          <option value="chalk">Bảng xanh</option>
        </select>

        <div className="flex items-center gap-1 ml-auto">
          <button type="button" onClick={undo} disabled={strokes.length === 0} className={btn} title="Hoàn tác (Ctrl+Z)">
            <Undo2 size={14} />
          </button>
          <button type="button" onClick={redo} disabled={redoStack.length === 0} className={btn} title="Làm lại (Ctrl+Shift+Z)">
            <Redo2 size={14} />
          </button>

          {/* Quick clear - one tap wipes the board (Delete), with instant restore */}
          <button
            type="button"
            onClick={clearAll}
            disabled={strokes.length === 0}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 disabled:opacity-40"
            title="Xóa bảng nhanh (Delete)"
          >
            <Trash2 size={14} /> Xóa bảng
          </button>
          {strokes.length === 0 && redoStack.length > 0 && (
            <button
              type="button"
              onClick={restoreCleared}
              className="px-2 py-1.5 rounded-md border border-border text-xs font-medium hover:bg-accent"
              title="Khôi phục bảng vừa xóa"
            >
              Khôi phục
            </button>
          )}

          <button type="button" onClick={download} className={btn} title="Tải PNG">
            <Download size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = exportPng();
              if (url) onInsert(url);
            }}
            disabled={strokes.length === 0}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium disabled:opacity-40"
            title="Chèn bản vẽ vào ghi chú"
          >
            <ImagePlus size={14} /> Chèn vào ghi chú
          </button>
        </div>
      </div>

      {/* Drawing surface */}
      <div ref={wrapRef} className="flex-1 min-h-[220px] rounded-md overflow-hidden border border-border">
        <canvas
          ref={canvasRef}
          className="block cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          onPointerCancel={endStroke}
        />
      </div>
    </div>
  );
};

export default NotebookWhiteboard;
