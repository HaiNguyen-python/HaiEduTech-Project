// Mermaid diagram renderer with light/dark theme support
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2, AlertTriangle } from "lucide-react";

interface MermaidDiagramProps {
  code: string;
  id?: string;
}

let mermaidInited = false;

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
      padding: 32,
      nodeSpacing: 110,
      rankSpacing: 120,
      htmlLabels: false,
      useMaxWidth: false,
      diagramPadding: 28,
      wrappingWidth: 260,
    },
    sequence: {
      useMaxWidth: false,
      wrap: true,
      messageFontSize: 14,
      noteFontSize: 14,
      actorFontSize: 14,
    },
    themeCSS: `
      .node rect, .node polygon, .node circle, .node ellipse, .node path {
        rx: 10;
        ry: 10;
        stroke-width: 1.5px !important;
      }

      .edgeLabel, .messageText, .noteText, text.actor {
        font-size: 14px !important;
      }

      .edgeLabel {
        background-color: ${isDark ? "hsl(222 47% 11%)" : "hsl(0 0% 100%)"} !important;
        color: ${isDark ? "hsl(210 40% 98%)" : "hsl(222 47% 11%)"} !important;
        padding: 2px 6px !important;
      }

      .cluster rect {
        rx: 12;
        ry: 12;
      }

      .flowchart-link {
        stroke-width: 1.5px !important;
      }
    `,
    themeVariables: isDark
      ? {
          primaryColor: "hsl(217 60% 25%)",
          primaryTextColor: "hsl(210 40% 98%)",
          primaryBorderColor: "hsl(217 91% 60%)",
          lineColor: "hsl(215 20% 65%)",
          secondaryColor: "hsl(222 47% 11%)",
          tertiaryColor: "hsl(217 33% 17%)",
          background: "hsl(222 47% 11%)",
          mainBkg: "hsl(217 60% 25%)",
          nodeBorder: "hsl(217 91% 60%)",
          clusterBkg: "hsl(217 33% 17%)",
          clusterBorder: "hsl(217 91% 60%)",
          titleColor: "hsl(210 40% 98%)",
          fontSize: "14px",
        }
      : {
          primaryColor: "hsl(214 100% 93%)",
          primaryTextColor: "hsl(222 47% 11%)",
          primaryBorderColor: "hsl(217 91% 60%)",
          lineColor: "hsl(215 16% 47%)",
          secondaryColor: "hsl(210 40% 96%)",
          tertiaryColor: "hsl(210 40% 98%)",
          background: "hsl(0 0% 100%)",
          mainBkg: "hsl(214 100% 93%)",
          nodeBorder: "hsl(217 91% 60%)",
          clusterBkg: "hsl(210 40% 98%)",
          clusterBorder: "hsl(217 91% 60%)",
          titleColor: "hsl(222 47% 11%)",
          fontSize: "14px",
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
        await waitForFonts();
        const normalized = normalizeMermaidCode(code);
        await mermaid.parse(normalized);
        const { svg } = await mermaid.render(safeId, normalized);

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
    return (
      <div className="not-prose my-4 flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" />
        <span>Diagram could not be rendered.</span>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 min-h-[180px] overflow-x-auto rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6 shadow-sm">
      {loading && (
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Rendering diagram…
        </div>
      )}
      <div
        ref={ref}
        className="flex justify-center [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-auto [&_svg]:min-w-max [&_.node]:drop-shadow-sm"
      />
    </div>
  );
};

export default MermaidDiagram;
