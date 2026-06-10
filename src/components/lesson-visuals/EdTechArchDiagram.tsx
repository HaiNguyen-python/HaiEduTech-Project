/**
 * EdTechArchDiagram - clean, responsive architecture diagram for EdTech
 * platform layers. Replaces a brittle ASCII diagram that broke under
 * proportional fonts and syntax highlighting.
 */
import { Monitor, Server, Database, Sparkles, BarChart3, ArrowRight, ArrowDown } from "lucide-react";

interface LayerProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  tint: string;
  border: string;
  iconBg: string;
}

const Layer = ({ icon, title, items, tint, border, iconBg }: LayerProps) => (
  <div className={`flex-1 min-w-0 rounded-xl border ${border} ${tint} p-4 shadow-sm`}>
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <h4 className="font-semibold text-sm text-foreground leading-tight">{title}</h4>
    </div>
    <div className="space-y-1.5">
      {items.map((i) => (
        <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground leading-snug">
          <span className="text-primary mt-0.5">›</span>
          <span>{i}</span>
        </div>
      ))}
    </div>
  </div>
);

const EdTechArchDiagram = () => {
  const layers: LayerProps[] = [
    {
      icon: <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      title: "Frontend",
      items: ["React / React Native", "PWA · Offline-ready", "Mobile-first UI"],
      tint: "bg-blue-500/5",
      border: "border-blue-500/30",
      iconBg: "bg-blue-500/15",
    },
    {
      icon: <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      title: "API Layer",
      items: ["REST / RPC", "Edge Functions", "Auth + Rate limit"],
      tint: "bg-emerald-500/5",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/15",
    },
    {
      icon: <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      title: "Database",
      items: ["Postgres", "Vector (pgvector)", "Row-level security"],
      tint: "bg-amber-500/5",
      border: "border-amber-500/30",
      iconBg: "bg-amber-500/15",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      title: "AI Services",
      items: ["LLM (chat · grading)", "TTS / STT", "Embeddings"],
      tint: "bg-purple-500/5",
      border: "border-purple-500/30",
      iconBg: "bg-purple-500/15",
    },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-border/60 bg-card/60 p-5 md:p-6 backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4 font-semibold flex items-center gap-2">
        <span>🏗️</span> EdTech Platform Architecture
      </p>

      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-stretch">
        <Layer {...layers[0]} />
        <div className="hidden lg:flex items-center justify-center text-primary">
          <ArrowRight className="w-5 h-5" />
        </div>
        <Layer {...layers[1]} />
        <div className="hidden lg:flex items-center justify-center text-primary">
          <ArrowRight className="w-5 h-5" />
        </div>
        <Layer {...layers[2]} />
        <div className="hidden lg:flex items-center justify-center text-primary">
          <ArrowRight className="w-5 h-5" />
        </div>
        <Layer {...layers[3]} />
      </div>

      {/* Connector */}
      <div className="flex justify-center my-3">
        <ArrowDown className="w-5 h-5 text-primary" />
      </div>

      {/* Analytics */}
      <div className="rounded-xl border border-pink-500/30 bg-pink-500/5 p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-9 h-9 rounded-lg bg-pink-500/15 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-pink-600 dark:text-pink-400" />
          </div>
          <h4 className="font-semibold text-sm text-foreground">Analytics & Mastery</h4>
        </div>
        <p className="text-xs text-muted-foreground ml-11">
          Events · Cohorts · A/B testing · Mastery tracking · Retention
        </p>
      </div>

      <p className="mt-4 text-xs text-muted-foreground italic">
        Every layer is{" "}
        <span className="font-semibold text-foreground not-italic">versioned + instrumented</span>{" "}
        so you can experiment and roll back safely.
      </p>
    </div>
  );
};

export default EdTechArchDiagram;
