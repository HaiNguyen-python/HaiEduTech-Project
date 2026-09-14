// Mermaid diagram renderer with light/dark theme support, per-type tuning,
// and post-render SVG normalization for consistent, sharp, readable output.
import { useCallback, useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2, AlertTriangle, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MermaidDiagramProps {
  code: string;
  id?: string;
}

let mermaidInited = false;

type DiagramKind = "flowchart" | "sequence" | "timeline" | "classDiagram" | "stateDiagram" | "erDiagram" | "gantt" | "mindmap" | "other";

function detectKind(rawCode: string): DiagramKind {
  const head = rawCode.trim().split("\n")[0]?.trim().toLowerCase() ?? "";
  if (head.startsWith("flowchart") || head.startsWith("graph")) return "flowchart";
  if (head.startsWith("sequencediagram")) return "sequence";
  if (head.startsWith("timeline")) return "timeline";
  if (head.startsWith("classdiagram")) return "classDiagram";
  if (head.startsWith("statediagram")) return "stateDiagram";
  if (head.startsWith("erdiagram")) return "erDiagram";
  if (head.startsWith("gantt")) return "gantt";
  if (head.startsWith("mindmap")) return "mindmap";
  return "other";
}

function normalizeMermaidCode(rawCode: string) {
  const trimmed = rawCode.trim();

  // Normalize HTML line breaks so Mermaid handles multiline node labels
  // consistently across AI-generated diagrams.
  if (/^(flowchart|graph)\b/m.test(trimmed)) {
    return trimmed.replace(/<br\s*\/?>/gi, "<br>");
  }

  return trimmed;
}

async function waitForFonts() {
  if (typeof document === "undefined") return;
  try {
    await document.fonts?.ready;
  } catch {
    // Ignore font-loading issues and render with fallback fonts.
  }
}

function initMermaid() {
  if (mermaidInited) return;
  mermaidInited = true;

  const isDark = document.documentElement.classList.contains("dark");

  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? "dark" : "default",
    securityLevel: "loose",
    suppressErrorRendering: true,
    // Use stable system fonts to avoid post-render font swaps changing label width.
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 20,
    flowchart: {
      curve: "linear",
      padding: 38,
      nodeSpacing: 100,
      rankSpacing: 130,
      htmlLabels: true,
      useMaxWidth: false,
      diagramPadding: 40,
      wrappingWidth: 360,
    },
    sequence: {
      useMaxWidth: false,
      wrap: true,
      messageFontSize: 18,
      noteFontSize: 17,
      actorFontSize: 18,
      boxMargin: 16,
      boxTextMargin: 10,
      noteMargin: 14,
      messageMargin: 46,
      mirrorActors: true,
    },
    gantt: {
      useMaxWidth: false,
      fontSize: 16,
      barHeight: 26,
      barGap: 8,
      topPadding: 42,
      leftPadding: 90,
    },
    er: {
      useMaxWidth: false,
      fontSize: 16,
      diagramPadding: 28,
    },
    themeCSS: `
      /* SVG-side text rendering for crispness */
      .nodeLabel, .edgeLabel, .messageText, .noteText, text, text.actor, text.actor-man, .titleText, .loopText, .labelText {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        font-size: 19px !important;
        font-weight: 600 !important;
        line-height: 1.45 !important;
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
      }

      /* HTML-label flowchart nodes: wrap only on real word boundaries, never split short words */
      .nodeLabel, .nodeLabel p, foreignObject div, foreignObject span {
        white-space: normal !important;
        word-break: keep-all !important;
        overflow-wrap: normal !important;
        text-align: center !important;
        line-height: 1.45 !important;
        padding: 6px 12px !important;
        max-width: 360px !important;
        font-size: 19px !important;
      }

      foreignObject {
        overflow: visible !important;
      }

      .node rect, .node polygon, .node circle, .node ellipse, .node path {
        rx: 10;
        ry: 10;
        stroke-width: 1.8px !important;
      }

      .edgeLabel {
        background-color: ${isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)"} !important;
        color: ${isDark ? "hsl(210 40% 98%)" : "hsl(222 47% 11%)"} !important;
        padding: 4px 8px !important;
        border-radius: 4px !important;
        font-size: 17px !important;
      }

      .edgeLabel rect, .edgeLabel foreignObject div {
        fill: ${isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)"} !important;
        background-color: ${isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)"} !important;
      }

      .cluster rect {
        rx: 12;
        ry: 12;
        stroke-width: 1.5px !important;
      }

      .cluster .cluster-label, .cluster text {
        font-weight: 700 !important;
      }

      .flowchart-link, .messageLine0, .messageLine1 {
        stroke-width: 1.6px !important;
      }

      /* Sequence diagram polish */
      .actor {
        stroke-width: 1.5px !important;
      }
      .actor-line {
        stroke-width: 1px !important;
        stroke-dasharray: 3 3 !important;
      }

      /* Timeline / mindmap node text */
      .section, .task-text, .timeline-section {
        font-weight: 600 !important;
      }
    `,
    themeVariables: isDark
      ? {
          // Warm amber/emerald palette - replaces hard-to-read blue tones.
          primaryColor: "hsl(28 80% 32%)",
          primaryTextColor: "hsl(40 100% 96%)",
          primaryBorderColor: "hsl(28 95% 60%)",
          lineColor: "hsl(40 30% 75%)",
          secondaryColor: "hsl(160 60% 22%)",
          tertiaryColor: "hsl(280 50% 28%)",
          background: "hsl(222 47% 11%)",
          mainBkg: "hsl(28 80% 32%)",
          nodeBorder: "hsl(28 95% 60%)",
          clusterBkg: "hsl(160 40% 15%)",
          clusterBorder: "hsl(160 84% 50%)",
          titleColor: "hsl(40 100% 96%)",
          fontSize: "18px",
        }
      : {
          primaryColor: "hsl(35 100% 90%)",
          primaryTextColor: "hsl(20 80% 18%)",
          primaryBorderColor: "hsl(25 95% 53%)",
          lineColor: "hsl(20 30% 35%)",
          secondaryColor: "hsl(155 75% 88%)",
          tertiaryColor: "hsl(280 70% 92%)",
          background: "hsl(0 0% 100%)",
          mainBkg: "hsl(35 100% 90%)",
          nodeBorder: "hsl(25 95% 53%)",
          clusterBkg: "hsl(155 75% 95%)",
          clusterBorder: "hsl(160 84% 39%)",
          titleColor: "hsl(20 80% 18%)",
          fontSize: "18px",
        },
  });
}

function cleanupOrphan(safeId: string) {
  if (typeof document === "undefined") return;
  const orphan = document.getElementById(`d${safeId}`);
  if (orphan && orphan.parentElement === document.body) {
    orphan.remove();
  }
  document.querySelectorAll(`body > svg[id^="d${safeId}"]`).forEach((el) => el.remove());
}

/**
 * Post-process the SVG string Mermaid produced so it scrolls cleanly,
 * scales without blur, and keeps text readable.
 */
function postProcessSvg(svg: string): string {
  // Parse the SVG so we can mutate it safely
  if (typeof DOMParser === "undefined") return svg;
  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  } catch {
    return svg;
  }
  const root = doc.documentElement;
  if (!root || root.nodeName.toLowerCase() !== "svg") return svg;

  // 1. Enforce viewBox-driven layout - drop fixed width/height that cause shrinking.
  const widthAttr = root.getAttribute("width");
  const heightAttr = root.getAttribute("height");
  const viewBox = root.getAttribute("viewBox");

  // If Mermaid only set width/height (no viewBox), synthesize one.
  if (!viewBox && widthAttr && heightAttr) {
    const w = parseFloat(widthAttr);
    const h = parseFloat(heightAttr);
    if (!Number.isNaN(w) && !Number.isNaN(h)) {
      root.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
  }

  // Remove fixed sizing so CSS controls layout.
  root.removeAttribute("width");
  root.removeAttribute("height");
  root.setAttribute("preserveAspectRatio", "xMidYMid meet");
  // Provide a baseline natural width via inline style so wide diagrams scroll, not shrink.
  const vb = root.getAttribute("viewBox");
  if (vb) {
    const parts = vb.split(/\s+/).map(Number);
    if (parts.length === 4 && !Number.isNaN(parts[2]) && !Number.isNaN(parts[3])) {
      const naturalW = Math.ceil(parts[2]);
      const naturalH = Math.ceil(parts[3]);
      // Consistent rendering band:
      //  - Tiny diagrams (<480px) get scaled UP to a comfortable 520px floor so they
      //    don't look like postage stamps next to dense theory text.
      //  - Huge diagrams (>1100px) keep their natural width but become horizontally
      //    scrollable rather than shrinking until labels are unreadable.
      // Bigger minimum so labels stay legible without zooming.
      const MIN_TARGET = 760;
      const MAX_TARGET = 1280;
      const targetW = Math.min(MAX_TARGET, Math.max(MIN_TARGET, naturalW));
      const existingStyle = root.getAttribute("style") || "";
      root.setAttribute(
        "style",
        `${existingStyle}; display: block; width: 100%; max-width: ${targetW}px; height: auto; min-width: min(100%, ${Math.min(targetW, naturalW)}px); aspect-ratio: ${naturalW} / ${naturalH};`,
      );
    }
  }

  // 2. Add crisp text rendering hints to all SVG text nodes (sequence/gantt/etc).
  doc.querySelectorAll("text, tspan").forEach((el) => {
    el.setAttribute("text-rendering", "geometricPrecision");
  });

  // 3. Serialize back
  try {
    return new XMLSerializer().serializeToString(doc);
  } catch {
    return svg;
  }
}

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 8;
const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

const MermaidDiagram = ({ code, id }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageNode, setStageNode] = useState<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const generatedIdRef = useRef(`mmd${Math.random().toString(36).slice(2, 10)}`);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const safeId = id || generatedIdRef.current;
  const kind = detectKind(code);

  // Mirrors of the transform state so the native wheel listener never reads stale values.
  const zoomRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: 0, height: 0 });
  zoomRef.current = zoom;
  offsetRef.current = offset;
  sizeRef.current = svgSize;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        initMermaid();
        await waitForFonts();
        const normalized = normalizeMermaidCode(code);
        await mermaid.parse(normalized);
        const { svg } = await mermaid.render(safeId, normalized);
        const polished = postProcessSvg(svg);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = polished;
          setSvgMarkup(polished);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message.split("\n")[0] : "Render error");
        }
      } finally {
        cleanupOrphan(safeId);
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
      cleanupOrphan(safeId);
    };
  }, [code, safeId]);

  // Fit the whole diagram into the viewport and centre it.
  const fitToView = useCallback(() => {
    const vp = viewportRef.current;
    const { width, height } = sizeRef.current;
    if (!vp || !width || !height) return;
    const pad = 48;
    const scale = clampZoom(
      Math.min((vp.clientWidth - pad) / width, (vp.clientHeight - pad) / height, 1.6),
    );
    setZoom(scale);
    setOffset({
      x: (vp.clientWidth - width * scale) / 2,
      y: Math.max(12, (vp.clientHeight - height * scale) / 2),
    });
  }, []);

  // Zoom around a point inside the viewport (cursor position, or its centre).
  const zoomAt = useCallback((nextZoomRaw: number, px: number, py: number) => {
    const next = clampZoom(nextZoomRaw);
    const current = zoomRef.current;
    if (next === current) return;
    const k = next / current;
    const o = offsetRef.current;
    setOffset({ x: px - (px - o.x) * k, y: py - (py - o.y) * k });
    setZoom(next);
  }, []);

  const zoomByCentre = useCallback(
    (factor: number) => {
      const vp = viewportRef.current;
      if (!vp) return;
      zoomAt(zoomRef.current * factor, vp.clientWidth / 2, vp.clientHeight / 2);
    },
    [zoomAt],
  );

  // Inject the SVG at its natural pixel size, then fit it to the viewport.
  useEffect(() => {
    if (!isFullscreen || !stageNode || !svgMarkup) return;
    stageNode.innerHTML = svgMarkup;
    const svg = stageNode.querySelector("svg");
    if (!svg) return;
    const vb = svg.getAttribute("viewBox")?.split(/\s+/).map(Number) ?? [];
    const w = vb.length === 4 && Number.isFinite(vb[2]) ? vb[2] : svg.clientWidth || 800;
    const h = vb.length === 4 && Number.isFinite(vb[3]) ? vb[3] : svg.clientHeight || 600;
    svg.style.maxWidth = "none";
    svg.style.minWidth = "0";
    svg.style.width = `${w}px`;
    svg.style.height = `${h}px`;
    svg.style.aspectRatio = "auto";
    sizeRef.current = { width: w, height: h };
    setSvgSize({ width: w, height: h });
  }, [isFullscreen, svgMarkup, stageNode]);

  useEffect(() => {
    if (!isFullscreen || !svgSize.width) return;
    fitToView();
    const vp = viewportRef.current;
    if (!vp) return;
    const observer = new ResizeObserver(() => fitToView());
    observer.observe(vp);
    return () => observer.disconnect();
  }, [isFullscreen, svgSize.width, svgSize.height, fitToView]);

  // Wheel + trackpad pinch zoom. React's onWheel is passive, so attach natively.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!isFullscreen || !vp) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      zoomAt(
        zoomRef.current * Math.exp(-dy * 0.0018),
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => vp.removeEventListener("wheel", onWheel);
  }, [isFullscreen, zoomAt]);

  // Reset when closing.
  useEffect(() => {
    if (!isFullscreen) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setSvgSize({ width: 0, height: 0 });
    }
  }, [isFullscreen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const start = { x: e.clientX, y: e.clientY };
    const base = { ...offsetRef.current };
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    setIsPanning(true);
    const move = (ev: PointerEvent) => {
      setOffset({ x: base.x + (ev.clientX - start.x), y: base.y + (ev.clientY - start.y) });
    };
    const up = () => {
      setIsPanning(false);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  };

  if (error) {
    return (
      <div className="not-prose my-4 flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
        <span>Diagram could not be rendered.</span>
      </div>
    );
  }

  // For sequence/gantt diagrams, default-align left so they don't get awkwardly centered when wide.
  const alignmentClass =
    kind === "sequence" || kind === "gantt" || kind === "timeline"
      ? "justify-start"
      : "justify-center";

  return (
    <>
      <div
        className="mermaid-diagram not-prose group relative my-7 overflow-x-auto rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-5 sm:p-6 shadow-sm"
        style={{ minHeight: loading ? 360 : undefined }}
        data-kind={kind}
      >
        {!loading && !error && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="absolute right-2 top-2 z-10 inline-flex h-9 min-h-9 items-center gap-1.5 rounded-md border border-border/60 bg-background/90 px-2.5 text-xs font-medium text-muted-foreground shadow-sm transition hover:bg-primary hover:text-primary-foreground"
            aria-label="Open diagram fullscreen and zoom"
            title="Open fullscreen"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Zoom</span>
          </button>
        )}
        {loading && (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Rendering diagram…
          </div>
        )}
        <div
          ref={ref}
          className={`mermaid-stage flex ${alignmentClass} [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none [&_.node]:drop-shadow-sm`}
        />
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="flex h-[95vh] max-h-[95vh] w-[98vw] max-w-[98vw] flex-col gap-0 overflow-hidden border-border bg-background p-0 sm:rounded-xl">
          <VisuallyHidden>
            <DialogTitle>Diagram fullscreen view</DialogTitle>
          </VisuallyHidden>

          <div className="flex items-center justify-between gap-2 border-b border-border bg-card/60 px-4 py-2 backdrop-blur">
            <div className="text-sm font-medium text-muted-foreground">
              Diagram · {Math.round(zoom * 100)}%
              <span className="ml-2 hidden text-xs opacity-70 sm:inline">
                Scroll to zoom · drag to move
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="min-h-11"
                onClick={() => zoomByCentre(1 / 1.25)}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="min-h-11"
                onClick={fitToView}
                aria-label="Fit diagram to view"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="min-h-11"
                onClick={() => zoomByCentre(1.25)}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="w-8" aria-hidden="true" />
            </div>
          </div>

          <div
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            className={`relative flex-1 touch-none overflow-hidden bg-gradient-to-br from-card/40 to-muted/20 ${
              isPanning ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div
              ref={(node) => {
                stageRef.current = node;
                setStageNode(node);
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: svgSize.width ? `${svgSize.width}px` : undefined,
                height: svgSize.height ? `${svgSize.height}px` : undefined,
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
              }}
              className="mermaid-fullscreen-stage"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MermaidDiagram;

