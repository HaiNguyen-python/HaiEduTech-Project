/**
 * EdTechArchDiagram - clean, responsive architecture diagram for EdTech.
 * 4-column grid (wraps to 2 / 1) with a base "Analytics" row underneath.
 */
import { Monitor, Server, Database, Sparkles, BarChart3, ArrowDown } from "lucide-react";

interface LayerProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  items: string[];
  tint: string;
  border: string;
  iconBg: string;
  accent: string;
}

const Layer = ({ icon, step, title, items, tint, border, iconBg, accent }: LayerProps) => (
  <div className={`relative rounded-2xl border ${border} ${tint} p-5 shadow-sm overflow-hidden`}>
    <div className={`absolute top-0 left-0 right-0 h-1 ${accent}`} />
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {step}
      </span>
    </div>
    <h4 className="font-bold text-base text-foreground mb-3 leading-tight">{title}</h4>
    <ul className="space-y-1.5">
      {items.map((i) => (
        <li
          key={i}
          className="text-[13px] text-muted-foreground leading-snug flex gap-1.5 break-words"
        >
          <span className="text-primary shrink-0">›</span>
          <span className="min-w-0">{i}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EdTechArchDiagram = () => {
  const layers: LayerProps[] = [
    {
      step: "Step 01",
      icon: <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Frontend",
      items: ["React / React Native", "PWA · Offline-ready", "Mobile-first UI"],
      tint: "bg-blue-500/5",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/15",
      accent: "bg-gradient-to-r from-blue-500 to-blue-400",
    },
    {
      step: "Step 02",
      icon: <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "API Layer",
      items: ["REST / RPC", "Edge Functions", "Auth + Rate limit"],
      tint: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/15",
      accent: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    },
    {
      step: "Step 03",
      icon: <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: "Database",
      items: ["Postgres", "Vector (pgvector)", "Row-level security"],
      tint: "bg-amber-500/5",
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/15",
      accent: "bg-gradient-to-r from-amber-500 to-amber-400",
    },
    {
      step: "Step 04",
      icon: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "AI Services",
      items: ["LLM (chat · grading)", "TTS / STT", "Embeddings"],
      tint: "bg-purple-500/5",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/15",
      accent: "bg-gradient-to-r from-purple-500 to-purple-400",
    },
  ];

  return (
    <div className="not-prose my-6 rounded-2xl border border-border/60 bg-card/60 p-5 md:p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">🏗️</span>
        <p className="text-xs uppercase tracking-[0.18em] text-foreground font-bold">
          EdTech Platform Architecture
        </p>
      </div>

      {/* Four-layer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {layers.map((l) => (
          <Layer key={l.title} {...l} />
        ))}
      </div>

      {/* Connector */}
      <div className="flex justify-center my-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-4 bg-border" />
          <ArrowDown className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Analytics base */}
      <div className="relative rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-base text-foreground">Analytics & Mastery</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Cross-cutting
              </span>
            </div>
            <p className="text-[13px] text-muted-foreground mt-1 leading-snug break-words">
              Events · Cohorts · A/B testing · Mastery tracking · Retention
            </p>
          </div>
        </div>
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
