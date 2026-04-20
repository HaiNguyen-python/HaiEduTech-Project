// Mermaid diagram renderer with light/dark theme support
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2, AlertTriangle } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  id?: string;
}

let mermaidInited = false;
function initMermaid() {
  if (mermaidInited) return;
  mermaidInited = true;
  const isDark = document.documentElement.classList.contains("dark");
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? "dark" : "default",
    securityLevel: "loose",
    suppressErrorRendering: true, // ⬅ stops the bomb-icon SVG injection
    fontFamily: "Inter, system-ui, sans-serif",
    flowchart: {
      curve: "basis",
      padding: 24,
      nodeSpacing: 70,
      rankSpacing: 70,
      htmlLabels: true,
      useMaxWidth: true,
      diagramPadding: 16,
    },
    themeCSS: `
      .node rect, .node polygon, .node circle, .node ellipse {
        rx: 10; ry: 10;
        stroke-width: 1.5px !important;
      }
      .nodeLabel, .edgeLabel, .label {
        white-space: nowrap !important;
        font-size: 15px !important;
        font-weight: 500 !important;
        line-height: 1.5 !important;
        padding: 4px 10px !important;
        letter-spacing: 0.01em;
      }
      .edgeLabel {
        background-color: ${isDark ? "#0f172a" : "#ffffff"} !important;
        color: ${isDark ? "#f1f5f9" : "#0f172a"} !important;
      }
      foreignObject { overflow: visible !important; }
      foreignObject div {
        white-space: nowrap !important;
        overflow: visible !important;
        display: inline-block !important;
        text-align: center !important;
      }
      .cluster rect { rx: 12; ry: 12; }
      .flowchart-link { stroke-width: 1.5px !important; }
    `,
    themeVariables: isDark
      ? {
          primaryColor: "#1e3a8a",
          primaryTextColor: "#f1f5f9",
          primaryBorderColor: "#3b82f6",
          lineColor: "#94a3b8",
          secondaryColor: "#0f172a",
          tertiaryColor: "#1e293b",
          background: "#0f172a",
          mainBkg: "#1e3a8a",
          nodeBorder: "#3b82f6",
        }
      : {
          primaryColor: "#dbeafe",
          primaryTextColor: "#0f172a",
          primaryBorderColor: "#3b82f6",
          lineColor: "#475569",
          secondaryColor: "#f1f5f9",
          tertiaryColor: "#f8fafc",
          background: "#ffffff",
          mainBkg: "#dbeafe",
          nodeBorder: "#3b82f6",
        },
  });
}

// Remove any orphan error nodes Mermaid may have appended to <body>
function cleanupOrphan(safeId: string) {
  if (typeof document === "undefined") return;
  const orphan = document.getElementById(`d${safeId}`);
  if (orphan && orphan.parentElement === document.body) {
    orphan.remove();
  }
  // Also clean up any stray temp svg nodes mermaid leaves behind
  document.querySelectorAll(`body > svg[id^="d${safeId}"]`).forEach((el) => el.remove());
}

const MermaidDiagram = ({ code, id }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const safeId = id || `mmd${Math.random().toString(36).slice(2, 10)}`;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        initMermaid();
        const trimmed = code.trim();
        // Pre-validate; mermaid.parse throws on syntax errors WITHOUT side-effects
        await mermaid.parse(trimmed);
        const { svg } = await mermaid.render(safeId, trimmed);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
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
    // Silent fallback: show a small inline note instead of the loud bomb icon
    return (
      <div className="not-prose my-4 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 opacity-60" />
        <span>Diagram could not be rendered.</span>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 overflow-x-auto shadow-sm">
      {loading && (
        <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Rendering diagram…
        </div>
      )}
      <div
        ref={ref}
        className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto [&_foreignObject]:!overflow-visible [&_.nodeLabel]:!whitespace-nowrap [&_.label]:!whitespace-nowrap [&_.node]:drop-shadow-sm"
      />
    </div>
  );
};

export default MermaidDiagram;
