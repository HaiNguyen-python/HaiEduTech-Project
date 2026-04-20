// Mermaid diagram renderer with light/dark theme support, per-type tuning,
// and post-render SVG normalization for consistent, sharp, readable output.
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2, AlertTriangle, Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";
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
    fontSize: 14,
    flowchart: {
      curve: "basis",
      padding: 28,
      nodeSpacing: 80,
      rankSpacing: 110,
      // htmlLabels=true lets each node auto-grow its height to fit wrapped text via foreignObject.
      htmlLabels: true,
      useMaxWidth: false,
      diagramPadding: 32,
      // Large enough that short labels (Workload, Public?, Yes, No, Hybrid) never wrap mid-word.
      wrappingWidth: 320,
    },
    sequence: {
      useMaxWidth: false,
      wrap: true,
      messageFontSize: 15,
      noteFontSize: 14,
      actorFontSize: 15,
      boxMargin: 14,
      boxTextMargin: 8,
      noteMargin: 12,
      messageMargin: 42,
      mirrorActors: true,
    },
    gantt: {
      useMaxWidth: false,
      fontSize: 14,
      barHeight: 22,
      barGap: 6,
      topPadding: 38,
      leftPadding: 80,
    },
    er: {
      useMaxWidth: false,
      fontSize: 14,
      diagramPadding: 24,
    },
    themeCSS: `
      /* SVG-side text rendering for crispness */
      .nodeLabel, .edgeLabel, .messageText, .noteText, text, text.actor, text.actor-man, .titleText, .loopText, .labelText {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        line-height: 1.4 !important;
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
        padding: 4px 10px !important;
        max-width: 320px !important;
      }

      foreignObject {
        overflow: visible !important;
      }

      .node rect, .node polygon, .node circle, .node ellipse, .node path {
        rx: 10;
        ry: 10;
        stroke-width: 1.6px !important;
      }

      .edgeLabel {
        background-color: ${isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)"} !important;
        color: ${isDark ? "hsl(210 40% 98%)" : "hsl(222 47% 11%)"} !important;
        padding: 3px 7px !important;
        border-radius: 4px !important;
        font-size: 13px !important;
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
          primaryColor: "hsl(217 60% 25%)",
          primaryTextColor: "hsl(210 40% 98%)",
          primaryBorderColor: "hsl(217 91% 60%)",
          lineColor: "hsl(215 20% 70%)",
          secondaryColor: "hsl(222 47% 14%)",
          tertiaryColor: "hsl(217 33% 17%)",
          background: "hsl(222 47% 11%)",
          mainBkg: "hsl(217 60% 25%)",
          nodeBorder: "hsl(217 91% 60%)",
          clusterBkg: "hsl(217 33% 17%)",
          clusterBorder: "hsl(217 91% 60%)",
          titleColor: "hsl(210 40% 98%)",
          fontSize: "15px",
        }
      : {
          primaryColor: "hsl(214 100% 94%)",
          primaryTextColor: "hsl(222 47% 11%)",
          primaryBorderColor: "hsl(217 91% 55%)",
          lineColor: "hsl(215 18% 42%)",
          secondaryColor: "hsl(210 40% 96%)",
          tertiaryColor: "hsl(210 40% 98%)",
          background: "hsl(0 0% 100%)",
          mainBkg: "hsl(214 100% 94%)",
          nodeBorder: "hsl(217 91% 55%)",
          clusterBkg: "hsl(210 40% 98%)",
          clusterBorder: "hsl(217 91% 55%)",
          titleColor: "hsl(222 47% 11%)",
          fontSize: "15px",
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

  // 1. Enforce viewBox-driven layout — drop fixed width/height that cause shrinking.
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
      const MIN_TARGET = 520;
      const MAX_TARGET = 1100;
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

const MermaidDiagram = ({ code, id }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [fitZoom, setFitZoom] = useState(1);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [autoFit, setAutoFit] = useState(true);
  const safeId = id || `mmd${Math.random().toString(36).slice(2, 10)}`;
  const kind = detectKind(code);

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

  // Inject the SVG into the fullscreen container and preserve its natural aspect ratio.
  useEffect(() => {
    if (isFullscreen && fullscreenRef.current && svgMarkup) {
      fullscreenRef.current.innerHTML = svgMarkup;
      const svg = fullscreenRef.current.querySelector("svg");
      if (svg) {
        const viewBox = svg.getAttribute("viewBox")?.split(/\s+/).map(Number) ?? [];
        if (viewBox.length === 4 && Number.isFinite(viewBox[2]) && Number.isFinite(viewBox[3])) {
          setSvgSize({ width: viewBox[2], height: viewBox[3] });
        }
        svg.style.maxWidth = "none";
        svg.style.width = `${Math.max(viewBox[2] || 0, 1)}px`;
        svg.style.height = `${Math.max(viewBox[3] || 0, 1)}px`;
      }
    }
  }, [isFullscreen, svgMarkup]);

  // Start fullscreen in fit-to-view mode so students see the whole diagram first.
  useEffect(() => {
    if (!isFullscreen || !autoFit || !viewportRef.current || !svgSize.width || !svgSize.height) return;

    const updateFitZoom = () => {
      const containerWidth = viewportRef.current?.clientWidth ?? 0;
      const containerHeight = viewportRef.current?.clientHeight ?? 0;
      if (!containerWidth || !containerHeight) return;

      const horizontalPadding = 48;
      const verticalPadding = 48;
      const widthScale = (containerWidth - horizontalPadding) / svgSize.width;
      const heightScale = (containerHeight - verticalPadding) / svgSize.height;
      const nextFitZoom = Math.max(0.35, Math.min(1, widthScale, heightScale));

      setFitZoom(nextFitZoom);
      setZoom(nextFitZoom);
    };

    updateFitZoom();
    const resizeObserver = new ResizeObserver(updateFitZoom);
    resizeObserver.observe(viewportRef.current);

    return () => resizeObserver.disconnect();
  }, [isFullscreen, svgSize, autoFit]);

  // Reset zoom when closing the dialog.
  useEffect(() => {
    if (!isFullscreen) {
      setZoom(1);
      setFitZoom(1);
      setSvgSize({ width: 0, height: 0 });
      setAutoFit(true);
    }
  }, [isFullscreen]);

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
        style={{
          // Reserve a stable height while the diagram is rendering so the page
          // doesn't shift down (and the scrollbar doesn't shake) when the SVG
          // finally appears. Once rendered, aspect-ratio on the SVG keeps the
          // box stable across reflows.
          minHeight: loading ? 360 : undefined,
        }}
        data-kind={kind}
      >
        {/* Fullscreen trigger — sticky to top-right so it stays visible when the diagram scrolls horizontally. */}
        {!loading && !error && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-background/90 text-muted-foreground opacity-0 shadow-sm transition hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 focus:opacity-100"
            aria-label="Open diagram fullscreen"
            title="Open fullscreen"
          >
            <Maximize2 className="h-3.5 w-3.5" />
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

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-2 border-b border-border bg-card/60 px-4 py-2 backdrop-blur">
            <div className="text-sm font-medium text-muted-foreground">
              Diagram · zoom {Math.round(zoom * 100)}%
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoFit(false);
                  setZoom((z) => Math.max(Math.min(fitZoom, 0.35), +(z - 0.15).toFixed(2)));
                }}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoFit(true);
                  setZoom(fitZoom);
                }}
                aria-label="Reset zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoFit(false);
                  setZoom((z) => Math.min(3, +(z + 0.15).toFixed(2)));
                }}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              {/* Spacer keeps zoom controls clear of the Dialog's built-in close (X) button at top-right. */}
              <div className="w-8" aria-hidden="true" />
            </div>
          </div>

          {/* Scrollable canvas — pan via native scrollbars when the diagram is zoomed in. */}
          <div ref={viewportRef} className="flex-1 overflow-auto bg-gradient-to-br from-card/40 to-muted/20 p-6">
            <div
              style={{
                width: svgSize.width ? `${svgSize.width * zoom}px` : "100%",
                height: svgSize.height ? `${svgSize.height * zoom}px` : "100%",
              }}
              className="mx-auto min-h-full min-w-fit transition-[width,height] duration-100"
            >
              <div
                ref={fullscreenRef}
                style={{
                  width: svgSize.width ? `${svgSize.width}px` : undefined,
                  height: svgSize.height ? `${svgSize.height}px` : undefined,
                  transform: `scale(${zoom})`,
                  transformOrigin: "top left",
                }}
                className="mermaid-fullscreen-stage flex justify-center [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-none"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MermaidDiagram;
