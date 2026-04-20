// Mermaid diagram renderer with light/dark theme support, per-type tuning,
// and post-render SVG normalization for consistent, sharp, readable output.
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2, AlertTriangle } from "lucide-react";

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
      padding: 22,
      nodeSpacing: 70,
      rankSpacing: 95,
      // htmlLabels=true lets each node auto-grow its height to fit wrapped text via foreignObject.
      htmlLabels: true,
      useMaxWidth: false,
      diagramPadding: 28,
      wrappingWidth: 180,
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

      /* HTML-label flowchart nodes: allow wrap, center, padding */
      .nodeLabel, .nodeLabel p, foreignObject div {
        white-space: normal !important;
        word-break: break-word !important;
        overflow-wrap: anywhere !important;
        text-align: center !important;
        line-height: 1.4 !important;
        padding: 2px 4px !important;
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
    if (parts.length === 4 && !Number.isNaN(parts[2])) {
      const naturalW = Math.ceil(parts[2]);
      const existingStyle = root.getAttribute("style") || "";
      root.setAttribute(
        "style",
        `${existingStyle}; max-width: 100%; height: auto; min-width: min(100%, ${naturalW}px);`,
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
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
    <div
      className="mermaid-diagram not-prose my-7 min-h-[180px] overflow-x-auto rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-5 sm:p-6 shadow-sm"
      data-kind={kind}
    >
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
  );
};

export default MermaidDiagram;
