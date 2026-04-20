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
    fontFamily: "Inter, system-ui, sans-serif",
    flowchart: { curve: "basis", padding: 12 },
    themeVariables: isDark
      ? { primaryColor: "#3b82f6", primaryTextColor: "#f1f5f9", lineColor: "#64748b" }
      : { primaryColor: "#3b82f6", primaryTextColor: "#0f172a", lineColor: "#64748b" },
  });
}

const MermaidDiagram = ({ code, id }: MermaidDiagramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const safeId = id || `mmd-${Math.random().toString(36).slice(2, 10)}`;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        initMermaid();
        const { svg } = await mermaid.render(safeId, code.trim());
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [code, safeId]);

  if (error) {
    return (
      <div className="not-prose my-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold mb-1">Diagram render error</div>
          <code className="text-xs opacity-80">{error}</code>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-5 rounded-xl border border-border bg-card p-4 overflow-x-auto">
      {loading && (
        <div className="flex items-center justify-center py-6 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Rendering diagram…
        </div>
      )}
      <div ref={ref} className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" />
    </div>
  );
};

export default MermaidDiagram;
