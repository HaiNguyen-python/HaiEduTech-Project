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
 * - The stroke list is mirrored to localStorage so switching tabs or closing
 *   the notebook does not lose the drawing.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Eraser, Undo2, Redo2, Trash2, Download, ImagePlus, Pen, Highlighter } from "lucide-react";

type BoardBg = "white" | "grid" | "chalk";

interface Stroke {
  color: string;
  width: number;
  alpha: number;
  /** Normalized points (0..1) so the drawing scales with the panel. */
  points: { x: number; y: number }[];
}

const PEN_COLORS = ["#0f172a", "#dc2626", "#3B82F6", "#10B981", "#ea580c", "#9333ea"];
const CHALK_COLORS = ["#ffffff", "#fde68a", "#fca5a5", "#93c5fd", "#86efac", "#f9a8d4"];
const WIDTHS = [2, 4, 8];

const STORAGE_KEY = "notebook-whiteboard-strokes";
const BG_KEY = "notebook-whiteboard-bg";

interface Props {
  /** Insert the board as a PNG into the note editor. */
  onInsert: (dataUrl: string) => void;
}

const NotebookWhiteboard = ({ onInsert }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const current = useRef<Stroke | null>(null);

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
    setColor(bg === "chalk" ? CHALK_COLORS[0] : PEN_COLORS[0]);
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

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, s: Stroke, w: number, h: number) => {
    if (s.points.length === 0) return;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.width;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(s.points[0].x * w, s.points[0].y * h);
    if (s.points.length === 1) {
      ctx.lineTo(s.points[0].x * w + 0.1, s.points[0].y * h + 0.1);
    } else {
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x * w, s.points[i].y * h);
      }
    }
    ctx.stroke();
    ctx.restore();
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    paintBackground(ctx, w, h);
    for (const s of strokes) drawStroke(ctx, s, w, h);
    if (current.current) drawStroke(ctx, current.current, w, h);
  }, [strokes, paintBackground, drawStroke]);

  // Size the canvas to its wrapper with DPR scaling, then repaint.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
      render();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [render]);

  useEffect(() => {
    render();
  }, [render]);

  const pointOf = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / Math.max(1, rect.width),
      y: (e.clientY - rect.top) / Math.max(1, rect.height),
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    drawing.current = true;
    const pressure = e.pressure > 0 && e.pressure < 1 ? 0.6 + e.pressure * 0.8 : 1;
    current.current = {
      color: tool === "eraser" ? (bg === "chalk" ? "#14532d" : "#ffffff") : color,
      width: tool === "eraser" ? width * 5 : tool === "highlight" ? width * 4 : width * pressure,
      alpha: tool === "highlight" ? 0.3 : 1,
      points: [pointOf(e)],
    };
    render();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawing.current || !current.current) return;
    current.current.points.push(pointOf(e));
    render();
  };

  const endStroke = () => {
    if (!drawing.current) return;
    drawing.current = false;
    const s = current.current;
    current.current = null;
    if (s && s.points.length > 0) {
      setStrokes((prev) => [...prev, s]);
      setRedoStack([]);
    } else {
      render();
    }
  };

  const undo = () => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack((r) => [...r, last]);
      return prev.slice(0, -1);
    });
  };

  const redo = () => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes((s) => [...s, last]);
      return prev.slice(0, -1);
    });
  };

  const clearAll = () => {
    setStrokes([]);
    setRedoStack([]);
  };

  const exportPng = () => canvasRef.current?.toDataURL("image/png") || "";

  const download = () => {
    const url = exportPng();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `bang-trang-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
  };

  const btn = "p-1.5 rounded-md text-muted-foreground hover:bg-accent disabled:opacity-40";
  const btnActive = "p-1.5 rounded-md bg-primary/20 text-primary";

  return (
    <div className="flex flex-col h-full min-h-0 gap-2">
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
          <button type="button" onClick={undo} disabled={strokes.length === 0} className={btn} title="Hoàn tác">
            <Undo2 size={14} />
          </button>
          <button type="button" onClick={redo} disabled={redoStack.length === 0} className={btn} title="Làm lại">
            <Redo2 size={14} />
          </button>
          <button type="button" onClick={clearAll} disabled={strokes.length === 0} className={btn} title="Xóa tất cả">
            <Trash2 size={14} />
          </button>
          <button type="button" onClick={download} className={btn} title="Tải PNG">
            <Download size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = exportPng();
              if (url) onInsert(url);
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium"
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
          className="block cursor-crosshair"
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
