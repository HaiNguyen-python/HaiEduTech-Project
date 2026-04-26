import React from "react";
import { ArrowRight, ArrowDown, RefreshCw } from "lucide-react";

/**
 * Visual renderer for IELTS Task 1 Map (before/after) and Process diagrams.
 * Used when chartType is "map" or "process" — renders semantic diagrams
 * instead of a placeholder description.
 */

export interface MapFeature {
  icon: string; // emoji
  label: string;
  position?: string; // optional position description (north, center, etc.)
}

export interface MapDiagramData {
  before: { title: string; features: MapFeature[] };
  after: { title: string; features: MapFeature[] };
}

export interface ProcessStep {
  icon: string; // emoji
  title: string;
  detail?: string;
}

export interface ProcessDiagramData {
  title: string;
  cyclical?: boolean;
  steps: ProcessStep[];
}

/* ---------------- Map Diagram ---------------- */

const MapPanel: React.FC<{ title: string; features: MapFeature[]; tone: "before" | "after" }> = ({
  title,
  features,
  tone,
}) => (
  <div
    className={`flex-1 rounded-lg border-2 p-4 ${
      tone === "before"
        ? "border-amber-400/40 bg-amber-50/40 dark:bg-amber-950/20"
        : "border-emerald-400/40 bg-emerald-50/40 dark:bg-emerald-950/20"
    }`}
  >
    <h5 className="text-xs font-bold text-center mb-3 uppercase tracking-wide text-foreground/80">
      {title}
    </h5>
    <div className="grid grid-cols-2 gap-2">
      {features.map((f, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center bg-card/70 backdrop-blur-sm rounded-md p-2 border border-border/50"
        >
          <span className="text-2xl mb-1" role="img" aria-label={f.label}>
            {f.icon}
          </span>
          <span className="text-[11px] font-medium leading-tight">{f.label}</span>
          {f.position && (
            <span className="text-[10px] text-muted-foreground italic mt-0.5">{f.position}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const MapDiagram: React.FC<{ data: MapDiagramData }> = ({ data }) => (
  <div className="rounded-lg border bg-card p-4 space-y-3">
    <h4 className="text-sm font-semibold text-foreground text-center">🗺️ Map Comparison</h4>
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <MapPanel title={data.before.title} features={data.before.features} tone="before" />
      <div className="flex md:flex-col items-center justify-center text-primary">
        <ArrowRight className="w-6 h-6 hidden md:block" />
        <ArrowDown className="w-6 h-6 md:hidden" />
      </div>
      <MapPanel title={data.after.title} features={data.after.features} tone="after" />
    </div>
  </div>
);

/* ---------------- Process Diagram ---------------- */

export const ProcessDiagram: React.FC<{ data: ProcessDiagramData }> = ({ data }) => {
  const { steps, cyclical, title } = data;

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <h4 className="text-sm font-semibold text-foreground text-center flex items-center justify-center gap-2">
        ⚙️ {title}
        {cyclical && (
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Cyclical
          </span>
        )}
      </h4>
      <div className="flex flex-wrap gap-2 justify-center">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-primary/5 to-emerald-500/10 border border-primary/20 rounded-md px-3 py-2 min-w-[110px] max-w-[140px]">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 inline-flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-xl" role="img" aria-label={s.title}>
                  {s.icon}
                </span>
              </div>
              <span className="text-[11px] font-semibold leading-tight">{s.title}</span>
              {s.detail && (
                <span className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                  {s.detail}
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center text-primary">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
            {i === steps.length - 1 && cyclical && (
              <div className="flex items-center text-primary/70">
                <RefreshCw className="w-4 h-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
