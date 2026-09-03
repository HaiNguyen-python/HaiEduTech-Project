/**
 * @file PresentationProgressChart.tsx
 * @description Practice-progress visualisation for the Presentation & Public Speaking Studio.
 * Reads the locally stored session history (newest first) and charts overall score,
 * pacing (WPM), fillers and eye contact so learners can see improvement over time.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ReferenceLine, ReferenceArea, ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Activity, LineChart as LineChartIcon, Target, Trophy, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface PresentationSessionPoint {
  at: number;
  scenario: string;
  overall: number;
  wpm: number;
  durationSec: number;
  fillers: number;
  eyeContact: number;
  confidence: number;
}

const RANGES = [5, 10, 0] as const;
type Range = (typeof RANGES)[number];

const fmtDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const PresentationProgressChart: React.FC<{ history: PresentationSessionPoint[] }> = ({ history }) => {
  const { t } = useLanguage();
  const [range, setRange] = useState<Range>(10);

  // history arrives newest-first; charts read oldest -> newest
  const ordered = useMemo(() => [...history].sort((a, b) => a.at - b.at), [history]);
  const sliced = useMemo(
    () => (range === 0 ? ordered : ordered.slice(-range)),
    [ordered, range],
  );

  const data = useMemo(
    () => sliced.map((s, i) => ({
      label: `${i + 1}. ${fmtDate(s.at)}`,
      scenario: s.scenario,
      overall: s.overall,
      wpm: s.wpm,
      fillers: s.fillers,
      eye: s.eyeContact,
      confidence: s.confidence,
    })),
    [sliced],
  );

  const stats = useMemo(() => {
    if (!ordered.length) return null;
    const best = Math.max(...ordered.map((s) => s.overall));
    const avg = Math.round(ordered.reduce((a, s) => a + s.overall, 0) / ordered.length);
    const delta = ordered[ordered.length - 1].overall - ordered[0].overall;
    return { sessions: ordered.length, best, avg, delta };
  }, [ordered]);

  if (!ordered.length) {
    return (
      <div className="glass-card rounded-2xl p-4 border border-dashed border-border/60">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-2">
          <LineChartIcon className="w-4 h-4 text-primary" />
          {t("Tiến bộ luyện tập", "Practice progress")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t(
            "Hoàn thành 1 buổi luyện thuyết trình để xem biểu đồ tiến bộ của bạn.",
            "Finish one rehearsal to unlock your progress chart.",
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 border border-border/60 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <LineChartIcon className="w-4 h-4 text-primary" />
          {t("Tiến bộ luyện tập", "Practice progress")}
        </h2>
        <div className="flex items-center gap-1">
          {RANGES.map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? "secondary" : "ghost"}
              className="h-6 px-2 text-[11px]"
              onClick={() => setRange(r)}
            >
              {r === 0 ? t("Tất cả", "All") : t(`${r} buổi`, `Last ${r}`)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Kpi icon={<Activity className="w-3.5 h-3.5" />} label={t("Buổi tập", "Sessions")} value={String(stats!.sessions)} />
        <Kpi icon={<Trophy className="w-3.5 h-3.5" />} label={t("Điểm cao nhất", "Best score")} value={String(stats!.best)} accent />
        <Kpi icon={<Target className="w-3.5 h-3.5" />} label={t("Điểm trung bình", "Average")} value={String(stats!.avg)} />
        <Kpi
          icon={<TrendingUp className="w-3.5 h-3.5" />}
          label={t("Thay đổi", "Change")}
          value={`${stats!.delta >= 0 ? "+" : ""}${stats!.delta}`}
          accent={stats!.delta > 0}
        />
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="label" fontSize={10} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <YAxis yAxisId="score" domain={[0, 100]} width={28} fontSize={10} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <YAxis yAxisId="wpm" orientation="right" domain={[0, 220]} width={32} fontSize={10} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <ReferenceArea yAxisId="wpm" y1={120} y2={150} fill="hsl(160 84% 39%)" fillOpacity={0.08} />
            <ReferenceLine yAxisId="score" y={80} stroke="hsl(var(--primary))" strokeDasharray="4 4" opacity={0.35} />
            <Line yAxisId="score" type="monotone" dataKey="overall" name={t("Điểm tổng", "Overall") as string} stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="wpm" type="monotone" dataKey="wpm" name="WPM" stroke="hsl(160 84% 39%)" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="label" fontSize={10} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <YAxis yAxisId="fillers" width={24} fontSize={10} allowDecimals={false} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <YAxis yAxisId="eye" orientation="right" domain={[0, 100]} width={30} fontSize={10} tick={{ fill: "currentColor", opacity: 0.7 }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar yAxisId="fillers" dataKey="fillers" name={t("Từ đệm", "Fillers") as string} fill="hsl(var(--destructive))" fillOpacity={0.55} radius={[4, 4, 0, 0]} />
            <Line yAxisId="eye" type="monotone" dataKey="eye" name={t("Giao tiếp mắt %", "Eye contact %") as string} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-muted-foreground">
        {t(
          "Vùng xanh nhạt = nhịp nói lý tưởng 120-150 WPM. Vạch mờ = mục tiêu 80 điểm. Từ đệm càng giảm càng tốt.",
          "Green band = ideal 120-150 WPM pace. Faded line = 80-point target. Fewer fillers is better.",
        )}
      </p>
    </div>
  );
};

const Kpi: React.FC<{ icon: React.ReactNode; label: string; value: string; accent?: boolean }> = ({ icon, label, value, accent }) => (
  <div className={`rounded-lg border px-2.5 py-2 ${accent ? "bg-primary/10 border-primary/30" : "bg-card"}`}>
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
      {icon} {label}
    </div>
    <div className="text-lg font-bold text-foreground leading-tight">{value}</div>
  </div>
);

export default PresentationProgressChart;
