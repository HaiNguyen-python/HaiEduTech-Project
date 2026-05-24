// Dynamic chart component for IELTS Task 1 essays
// Renders Line, Bar, Pie, Table, Map/Process, and Mixed charts using Recharts

import { useMemo } from "react";
import type { ChartConfig } from "@/data/ieltsSampleEssays";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Area,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Cog, Database, Shield, Server } from "lucide-react";

// Brand gradient palette (Blue → Emerald spectrum)
const BRAND_COLORS = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
  "#EF4444", // red-500
  "#8B5CF6", // violet-500
  "#06B6D4", // cyan-500
  "#F97316", // orange-500
  "#EC4899", // pink-500
];

interface Props {
  config: ChartConfig;
}

// Custom tooltip with clean styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

// Renders a line chart
const RenderLineChart = ({ config }: Props) => {
  const colors = config.colors || BRAND_COLORS;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={config.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey={config.xKey || "year"} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} label={config.yLabel ? { value: config.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11 } } : undefined} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {(config.yKeys || []).map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2.5}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// Renders a bar chart
const RenderBarChart = ({ config }: Props) => {
  const colors = config.colors || BRAND_COLORS;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={config.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey={config.xKey || "category"} tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 12 }} label={config.yLabel ? { value: config.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11 } } : undefined} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {(config.yKeys || []).map((key, i) => (
          <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// Renders dual pie charts (2010 vs 2020 style)
const RenderPieChart = ({ config }: Props) => {
  const colors = config.colors || BRAND_COLORS;
  const nameKey = config.pieNameKey || "name";
  const valueKey = config.pieValueKey || "value";
  const hasDual = !!config.data2;

  const renderSinglePie = (data: any[], label: string) => (
    <div className="flex-1 min-w-[200px]">
      <p className="text-center text-sm font-semibold text-foreground mb-2">{label}</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey={valueKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={85}
            innerRadius={30}
            paddingAngle={2}
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={{ strokeWidth: 1 }}
            style={{ fontSize: 10 }}
          >
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {renderSinglePie(config.data, config.labels?.[0] || "Chart")}
      {hasDual && renderSinglePie(config.data2!, config.labels?.[1] || "Chart 2")}
    </div>
  );
};

// Renders a data table
const RenderTable = ({ config }: Props) => (
  <div className="overflow-auto">
    <Table>
      <TableHeader>
        <TableRow>
          {(config.columns || []).map((col, i) => (
            <TableHead key={i} className="font-semibold text-xs">{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {(config.rows || []).map((row, ri) => (
          <TableRow key={ri}>
            {row.map((cell, ci) => (
              <TableCell key={ci} className={`text-xs ${ci === 0 ? "font-medium text-primary" : ""}`}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Renders a process/map diagram as a step-flow (fallback when no mapLayouts)
const RenderProcessMap = ({ config }: Props) => {
  const iconMap: Record<string, any> = {
    map: MapPin, cog: Cog, database: Database, shield: Shield, server: Server,
  };
  return (
    <div className="flex flex-col gap-3">
      {(config.stages || []).map((stage, i) => {
        const Icon = iconMap[stage.icon || "cog"] || Cog;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {i + 1}
              </div>
              {i < (config.stages?.length || 0) - 1 && (
                <div className="w-0.5 h-6 bg-gradient-to-b from-primary/40 to-emerald-500/40" />
              )}
            </div>
            <div className="pt-1">
              <p className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-primary" /> {stage.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Renders a single before/after map as labeled SVG
const RenderMapLayout = ({ layout }: { layout: NonNullable<ChartConfig["mapLayouts"]>[number] }) => {
  // viewBox 0..100 with 4-unit padding
  return (
    <div className="flex-1 min-w-[260px]">
      <p className="text-center text-sm font-semibold text-foreground mb-2">{layout.title}</p>
      <div className="rounded-lg border border-border/60 bg-gradient-to-br from-emerald-50/40 to-blue-50/40 dark:from-emerald-950/20 dark:to-blue-950/20 overflow-hidden p-2">
        {/* viewBox padded so labels at edges (Ring Road, River bottom, etc.) never clip */}
        <svg
          viewBox="-8 -6 116 116"
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          {/* compass — placed in the padded right gutter so it never overlaps roads */}
          <g transform="translate(108,2)" className="opacity-80">
            <circle r="4.5" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.4" />
            <text textAnchor="middle" y="0.6" fontSize="3" fill="hsl(var(--foreground))" fontWeight="700">N</text>
            <path d="M0,-3.6 L0.9,-0.6 L-0.9,-0.6 Z" fill="#EF4444" />
          </g>
          {layout.zones.map((z, i) => {
            const color = z.color || "#3B82F6";
            const cx = z.x + z.w / 2;
            const cy = z.y + z.h / 2;
            // Slightly smaller font + icon so they fit inside thin/short zones
            const fontSize = Math.min(2.8, Math.max(2.0, Math.min(z.w, z.h * 1.6) / 7));
            const iconSize = Math.min(4.2, Math.max(2.4, Math.min(z.w, z.h) / 3.2));
            const fillOpacity = z.shape === "road" || z.shape === "river" ? 1 : 0.28;
            let shapeEl: JSX.Element;
            if (z.shape === "circle") {
              const r = Math.min(z.w, z.h) / 2;
              shapeEl = <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="0.4" />;
            } else if (z.shape === "road") {
              shapeEl = <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="#6B7280" rx="0.4" stroke="#374151" strokeWidth="0.2" strokeDasharray="1.2 0.6" />;
            } else if (z.shape === "river") {
              shapeEl = <rect x={z.x} y={z.y} width={z.w} height={z.h} fill="#60A5FA" rx={Math.min(z.w, z.h) / 2} />;
            } else if (z.shape === "tree") {
              const r = Math.min(z.w, z.h) / 2;
              shapeEl = <circle cx={cx} cy={cy} r={r} fill="#10B981" fillOpacity="0.55" />;
            } else {
              shapeEl = <rect x={z.x} y={z.y} width={z.w} height={z.h} fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="0.5" rx="1" />;
            }

            // Decide where the text label sits:
            // - Roads/rivers: above the shape; vertical roads use right side.
            // - Thin/short zones (w<14 or h<10): place below the shape so it doesn't overlap the icon.
            // - Otherwise: centered below the icon, clamped so it never falls outside the viewBox.
            const isLine = z.shape === "road" || z.shape === "river";
            const isVerticalLine = isLine && z.h > z.w * 2;
            const isThin = !isLine && (z.w < 14 || z.h < 10);

            let labelX = cx;
            let labelY: number;
            let labelAnchor: "start" | "middle" | "end" = "middle";

            if (isVerticalLine) {
              // Place label to the right (or left if too close to right edge)
              const onRight = z.x + z.w + 1 + fontSize * z.label.length * 0.55 < 100;
              labelX = onRight ? z.x + z.w + 1 : z.x - 1;
              labelAnchor = onRight ? "start" : "end";
              labelY = cy + fontSize * 0.35;
            } else if (isLine) {
              // Horizontal road/river: above if room, else below
              const above = z.y - 0.6 > 0;
              labelY = above ? z.y - 0.8 : z.y + z.h + fontSize + 0.2;
            } else if (isThin) {
              // Below the shape, clamped to viewBox
              labelY = Math.min(108, z.y + z.h + fontSize + 0.4);
            } else {
              // Inside-ish: below the centered icon
              labelY = cy + iconSize / 1.6 + fontSize * 0.9;
              // If that overflows the shape, push to just below the shape
              if (labelY > z.y + z.h - 0.4) labelY = z.y + z.h + fontSize + 0.2;
              // Final clamp inside padded viewBox
              labelY = Math.min(109, Math.max(2, labelY));
            }

            return (
              <g key={i}>
                {shapeEl}
                {z.icon && !isLine && (
                  <text
                    x={cx}
                    y={isThin ? cy + iconSize / 3 : cy - 0.2}
                    textAnchor="middle"
                    fontSize={iconSize}
                    dominantBaseline="middle"
                  >
                    {z.icon}
                  </text>
                )}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={labelAnchor}
                  fontSize={fontSize}
                  fill="hsl(var(--foreground))"
                  fontWeight="700"
                  style={{ paintOrder: "stroke" }}
                  stroke="hsl(var(--background))"
                  strokeWidth="0.7"
                  strokeLinejoin="round"
                >
                  {z.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const RenderBeforeAfterMap = ({ config }: Props) => (
  <div className="space-y-4">
    <div className="flex flex-col md:flex-row gap-4">
      {(config.mapLayouts || []).map((layout, i) => (
        <RenderMapLayout key={i} layout={layout} />
      ))}
    </div>
    {/* compact change list below maps */}
    {config.stages && config.stages.length > 0 && (
      <div className="grid sm:grid-cols-2 gap-2 text-xs">
        {config.stages.map((s, i) => (
          <div key={i} className="flex items-start gap-2 rounded-md bg-muted/40 px-2.5 py-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">{i + 1}</span>
            <div>
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Renders a mixed chart (bars + line)
const RenderMixedChart = ({ config }: Props) => {
  const colors = config.colors || BRAND_COLORS;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={config.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey={config.xKey || "year"} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} label={config.yLabel ? { value: config.yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11 } } : undefined} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {(config.barKeys || []).map((key, i) => (
          <Bar key={key} dataKey={key} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} barSize={30} />
        ))}
        {config.lineKey && (
          <Line type="monotone" dataKey={config.lineKey} stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

// Main chart component - routes to the correct renderer
const IELTSChart = ({ config }: Props) => {
  const renderer = useMemo(() => {
    switch (config.type) {
      case "line": return <RenderLineChart config={config} />;
      case "bar": return <RenderBarChart config={config} />;
      case "pie": return <RenderPieChart config={config} />;
      case "table": return <RenderTable config={config} />;
      case "map":
        return config.mapLayouts && config.mapLayouts.length > 0
          ? <RenderBeforeAfterMap config={config} />
          : <RenderProcessMap config={config} />;
      case "process": return <RenderProcessMap config={config} />;
      case "mixed": return <RenderMixedChart config={config} />;
      default: return null;
    }
  }, [config]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-5 md:p-6"
    >
      <h2 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
        📊 Visual Data - {config.type === "map" || config.type === "process" ? "Diagram" : "Chart"}
      </h2>
      {renderer}
    </motion.div>
  );
};

export default IELTSChart;
