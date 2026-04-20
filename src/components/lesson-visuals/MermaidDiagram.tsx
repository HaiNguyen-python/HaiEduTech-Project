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
    fontSize: 15,
    flowchart: {
      curve: "basis",
      padding: 20,
      nodeSpacing: 80,
      rankSpacing: 90,
      // Use SVG text labels so Mermaid measures text correctly and never clips
      htmlLabels: false,
      useMaxWidth: true,
      diagramPadding: 20,
      wrappingWidth: 220,
    },
    sequence: {
      useMaxWidth: true,
      wrap: true,
      messageFontSize: 15,
      noteFontSize: 14,
      actorFontSize: 15,
    },
    themeCSS: `
      .node rect, .node polygon, .node circle, .node ellipse, .node path {
        rx: 10; ry: 10;
        stroke-width: 1.5px !important;
      }
      /* Allow text to wrap naturally — never force nowrap */
      .nodeLabel, .edgeLabel, .label, text.actor, .messageText, .loopText, .noteText {
        font-size: 15px !important;
        font-weight: 600 !important;
        line-height: 1.45 !important;
        letter-spacing: 0.005em;
      }
      .edgeLabel {
        background-color: ${isDark ? "#0f172a" : "#ffffff"} !important;
        color: ${isDark ? "#f1f5f9" : "#0f172a"} !important;
        padding: 2px 6px !important;
      }
      /* Make sure the text node never gets clipped by its rect */
      .node text { dominant-baseline: middle; }
      .cluster rect { rx: 12; ry: 12; }
      .flowchart-link { stroke-width: 1.5px !important; }
      /* Timeline + sequence subtle polish */
      .timeline .section-0, .timeline .section-1 { font-weight: 600 !important; }
    `,
    themeVariables: isDark
      ? {
          primaryColor: "#1e3a8a",
          primaryTextColor: "#f8fafc",
          primaryBorderColor: "#3b82f6",
          lineColor: "#94a3b8",
          secondaryColor: "#0f172a",
          tertiaryColor: "#1e293b",
          background: "#0f172a",
          mainBkg: "#1e3a8a",
          nodeBorder: "#3b82f6",
          clusterBkg: "#1e293b",
          clusterBorder: "#3b82f6",
          titleColor: "#f8fafc",
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
          clusterBkg: "#f8fafc",
          clusterBorder: "#3b82f6",
          titleColor: "#0f172a",
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
    <div className="not-prose my-6 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 overflow-x-auto shadow-sm min-h-[160px]">
      {loading && (
        <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Rendering diagram…
        </div>
      )}
      <div
        ref={ref}
        className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto [&_.node]:drop-shadow-sm"
      />
    </div>
  );
};

export default MermaidDiagram;
