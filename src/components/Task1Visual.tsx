import React from "react";
import { ArrowRight, ArrowDown, RefreshCw } from "lucide-react";

/**
 * Visual renderer for IELTS Task 1 Map (before/after) and Process diagrams.
 * - Map: top-down SVG layouts (roads, river, buildings) — IELTS-style
 * - Process: large iconic step cards in a responsive grid with directional arrows
 */

/* ============================================================
 * Map Diagram — proper IELTS-style top-down SVG layout
 * ============================================================ */

export type MapElementType =
  | "building"      // rectangle with optional label, e.g., houses, shops
  | "field"         // pale-green block, e.g., farmland, park
  | "water"         // blue block (river / lake)
  | "road"          // grey strip (horizontal or vertical road)
  | "roundabout"    // circle ring
  | "trees"         // small tree cluster icon
  | "carpark"       // hatched block
  | "label";        // text only

export interface MapElement {
  type: MapElementType;
  x: number;       // 0-100 percent of viewBox width
  y: number;       // 0-100 percent of viewBox height
  w?: number;      // width 0-100 (default depends on type)
  h?: number;      // height 0-100
  label?: string;
  variant?: "shop" | "house" | "office" | "school" | "bus" | "default";
  orientation?: "h" | "v"; // for roads
}

export interface MapScene {
  title: string;
  elements: MapElement[];
}

export interface MapDiagramData {
  before: MapScene;
  after: MapScene;
}

/* ---------- SVG element renderers ---------- */

const VIEW_W = 400;
const VIEW_H = 260;

const px = (v: number, total: number) => (v / 100) * total;

const Element: React.FC<{ el: MapElement }> = ({ el }) => {
  const x = px(el.x, VIEW_W);
  const y = px(el.y, VIEW_H);
  const w = px(el.w ?? 16, VIEW_W);
  const h = px(el.h ?? 14, VIEW_H);

  switch (el.type) {
    case "water":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={3} fill="hsl(205 80% 75%)" stroke="hsl(205 60% 55%)" strokeWidth={1} />
          {el.label && (
            <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={9} fontStyle="italic" fill="hsl(205 60% 30%)">
              {el.label}
            </text>
          )}
        </g>
      );
    case "field":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={2} fill="hsl(95 50% 80%)" stroke="hsl(95 45% 50%)" strokeWidth={1} strokeDasharray="3 2" />
          {el.label && (
            <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={9} fill="hsl(95 50% 25%)">
              {el.label}
            </text>
          )}
        </g>
      );
    case "road": {
      const isV = el.orientation === "v";
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} fill="hsl(0 0% 75%)" stroke="hsl(0 0% 55%)" strokeWidth={0.5} />
          {/* dashed centre line */}
          {isV ? (
            <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="white" strokeWidth={1} strokeDasharray="4 3" />
          ) : (
            <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="white" strokeWidth={1} strokeDasharray="4 3" />
          )}
          {el.label && (
            <text x={x + w / 2} y={y - 2} textAnchor="middle" fontSize={8} fill="hsl(0 0% 30%)">
              {el.label}
            </text>
          )}
        </g>
      );
    }
    case "roundabout":
      return (
        <g>
          <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) / 2} fill="hsl(0 0% 75%)" stroke="hsl(0 0% 50%)" strokeWidth={1} />
          <circle cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) / 4} fill="hsl(95 50% 80%)" stroke="hsl(95 45% 50%)" strokeWidth={0.5} />
          {el.label && (
            <text x={x + w / 2} y={y + h + 8} textAnchor="middle" fontSize={8} fill="hsl(0 0% 30%)">
              {el.label}
            </text>
          )}
        </g>
      );
    case "trees":
      return (
        <g>
          <circle cx={x + 4} cy={y + 4} r={3} fill="hsl(140 50% 45%)" />
          <circle cx={x + 10} cy={y + 6} r={3.5} fill="hsl(140 55% 40%)" />
          <circle cx={x + 16} cy={y + 4} r={3} fill="hsl(140 50% 45%)" />
        </g>
      );
    case "carpark":
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} fill="hsl(0 0% 88%)" stroke="hsl(0 0% 50%)" strokeWidth={1} />
          {/* parking lines */}
          {[0.25, 0.5, 0.75].map((p, i) => (
            <line key={i} x1={x + w * p} y1={y + 2} x2={x + w * p} y2={y + h - 2} stroke="hsl(0 0% 60%)" strokeWidth={0.5} />
          ))}
          {el.label && (
            <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={8} fill="hsl(0 0% 30%)">
              {el.label}
            </text>
          )}
        </g>
      );
    case "label":
      return (
        <text x={x} y={y} fontSize={9} fill="hsl(var(--foreground))" fontWeight={600}>
          {el.label}
        </text>
      );
    case "building":
    default: {
      const palette: Record<string, { fill: string; stroke: string; text: string }> = {
        shop:    { fill: "hsl(35 85% 78%)",  stroke: "hsl(35 75% 50%)",  text: "hsl(35 70% 25%)" },
        house:   { fill: "hsl(15 70% 80%)",  stroke: "hsl(15 60% 50%)",  text: "hsl(15 60% 25%)" },
        office:  { fill: "hsl(220 50% 80%)", stroke: "hsl(220 45% 50%)", text: "hsl(220 45% 25%)" },
        school:  { fill: "hsl(280 50% 82%)", stroke: "hsl(280 40% 55%)", text: "hsl(280 40% 25%)" },
        bus:     { fill: "hsl(50 90% 78%)",  stroke: "hsl(40 70% 45%)",  text: "hsl(40 70% 25%)" },
        default: { fill: "hsl(0 0% 88%)",    stroke: "hsl(0 0% 55%)",    text: "hsl(0 0% 25%)" },
      };
      const c = palette[el.variant ?? "default"] ?? palette.default;
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={2} fill={c.fill} stroke={c.stroke} strokeWidth={1} />
          {/* roof line for houses */}
          {el.variant === "house" && (
            <polyline
              points={`${x},${y + 2} ${x + w / 2},${y - 4} ${x + w},${y + 2}`}
              fill="hsl(15 60% 45%)"
              stroke="hsl(15 60% 35%)"
              strokeWidth={0.5}
            />
          )}
          {el.label && (
            <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize={8} fontWeight={600} fill={c.text}>
              {el.label}
            </text>
          )}
        </g>
      );
    }
  }
};

const Compass: React.FC = () => (
  <g transform={`translate(${VIEW_W - 30}, 22)`}>
    <circle r={12} fill="white" stroke="hsl(0 0% 60%)" strokeWidth={0.5} opacity={0.9} />
    <polygon points="0,-9 3,0 0,9 -3,0" fill="hsl(0 70% 50%)" />
    <text x={0} y={-13} textAnchor="middle" fontSize={7} fontWeight={700} fill="hsl(0 0% 25%)">N</text>
  </g>
);

const MapScenePanel: React.FC<{ scene: MapScene; tone: "before" | "after" }> = ({ scene, tone }) => (
  <div
    className={`flex-1 rounded-lg border-2 p-2 ${
      tone === "before"
        ? "border-amber-400/40 bg-amber-50/30 dark:bg-amber-950/10"
        : "border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/10"
    }`}
  >
    <h5 className="text-xs font-bold text-center mb-2 uppercase tracking-wide text-foreground/80">
      {scene.title}
    </h5>
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-auto bg-[hsl(60_30%_96%)] dark:bg-[hsl(60_10%_18%)] rounded-md border border-border/50">
      {scene.elements.map((el, i) => (
        <Element key={i} el={el} />
      ))}
      <Compass />
    </svg>
  </div>
);

export const MapDiagram: React.FC<{ data: MapDiagramData }> = ({ data }) => (
  <div className="rounded-lg border bg-card p-4 space-y-3">
    <h4 className="text-sm font-semibold text-foreground text-center">🗺️ Map Comparison (Top-down view)</h4>
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <MapScenePanel scene={data.before} tone="before" />
      <div className="flex md:flex-col items-center justify-center text-primary shrink-0">
        <ArrowRight className="w-7 h-7 hidden md:block" />
        <ArrowDown className="w-7 h-7 md:hidden" />
      </div>
      <MapScenePanel scene={data.after} tone="after" />
    </div>
  </div>
);

/* ============================================================
 * Process Diagram — larger cards with grid layout + arrows
 * ============================================================ */

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

export const ProcessDiagram: React.FC<{ data: ProcessDiagramData }> = ({ data }) => {
  const { steps, cyclical, title } = data;

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <h4 className="text-base font-semibold text-foreground text-center flex items-center justify-center gap-2">
        ⚙️ {title}
        {cyclical && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Cyclical
          </span>
        )}
      </h4>

      {/* Responsive grid: 2 cols mobile, 4 cols desktop. Arrows render inline between cards. */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {steps.map((s, i) => (
          <div key={i} className="relative">
            <div className="flex flex-col items-center text-center bg-gradient-to-br from-primary/5 to-emerald-500/10 border-2 border-primary/30 rounded-xl px-3 py-4 h-full shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute -top-2 -left-2 text-xs font-bold bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center shadow">
                {i + 1}
              </span>
              <span className="text-4xl mb-2 leading-none" role="img" aria-label={s.title}>
                {s.icon}
              </span>
              <span className="text-sm font-semibold leading-tight text-foreground">{s.title}</span>
              {s.detail && (
                <span className="text-xs text-muted-foreground mt-1 leading-tight">
                  {s.detail}
                </span>
              )}
            </div>
            {/* Inline arrow to next step (hidden on the last item or end-of-row) */}
            {i < steps.length - 1 && (
              <ArrowRight className="hidden md:block w-5 h-5 text-primary absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 bg-card rounded-full p-0.5" />
            )}
          </div>
        ))}
      </div>

      {cyclical && (
        <div className="flex items-center justify-center gap-2 text-xs text-primary/80 italic">
          <RefreshCw className="w-3.5 h-3.5" />
          The cycle repeats from step {steps.length} back to step 1
        </div>
      )}
    </div>
  );
};
