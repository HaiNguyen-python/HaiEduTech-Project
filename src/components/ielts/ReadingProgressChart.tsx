/**
 * @file ReadingProgressChart.tsx
 * @description Visualizes the student's IELTS Reading progress over time
 * (band score + accuracy) and shows KPI cards for attempts, best band,
 * average accuracy and best streak. Data is read from localStorage so the
 * feature works for guests and signed-in students alike.
 */
import { useEffect, useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Trophy, Target, TrendingUp, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { readHistory, clearHistory, type ReadingAttempt } from "@/lib/ieltsReadingHistory";

const fmtDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

const ReadingProgressChart: React.FC<{ refreshKey?: number }> = ({ refreshKey = 0 }) => {
  const { t } = useLanguage();
  const [history, setHistory] = useState<ReadingAttempt[]>([]);
  useEffect(() => { setHistory(readHistory()); }, [refreshKey]);

  const stats = useMemo(() => {
    if (!history.length) return null;
    const attempts = history.length;
    const bestBand = Math.max(...history.map(h => h.band));
    const avgPercent = Math.round(history.reduce((a, h) => a + h.percent, 0) / attempts);
    const last = history[history.length - 1];
    const first = history[0];
    const delta = last.band - first.band;
    return { attempts, bestBand, avgPercent, delta };
  }, [history]);

  const chartData = useMemo(() => history.slice(-20).map((h, i) => ({
    idx: i + 1,
    label: fmtDate(h.at),
    band: h.band,
    percent: h.percent,
  })), [history]);

  if (!history.length) {
    return (
      <Card className="mb-4 border-dashed">
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          <Activity className="w-6 h-6 mx-auto mb-2 opacity-60" />
          {t(
            "Hoàn thành 1 đề để xem biểu đồ tiến bộ Reading của bạn.",
            "Finish one exam to unlock your Reading progress chart."
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-primary/20 bg-gradient-to-br from-primary/[0.03] to-emerald-500/[0.03]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("📈 Tiến bộ Reading của bạn", "📈 Your Reading Progress")}
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs text-muted-foreground"
            onClick={() => { clearHistory(); setHistory([]); }}
          >
            <Trash2 className="w-3 h-3 mr-1" /> {t("Xóa lịch sử", "Reset")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Kpi icon={<Activity className="w-4 h-4" />} label={t("Lượt luyện", "Attempts")} value={String(stats!.attempts)} />
          <Kpi icon={<Trophy className="w-4 h-4" />} label={t("Band cao nhất", "Best Band")} value={stats!.bestBand.toFixed(1)} accent />
          <Kpi icon={<Target className="w-4 h-4" />} label={t("Chính xác TB", "Avg Accuracy")} value={`${stats!.avgPercent}%`} />
          <Kpi
            icon={<TrendingUp className="w-4 h-4" />}
            label={t("Tiến bộ", "Progress")}
            value={`${stats!.delta >= 0 ? "+" : ""}${stats!.delta.toFixed(1)}`}
            accent={stats!.delta > 0}
          />
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
              <XAxis dataKey="label" fontSize={11} tick={{ fill: "currentColor", opacity: 0.7 }} />
              <YAxis yAxisId="band" domain={[2, 9]} fontSize={11} tick={{ fill: "currentColor", opacity: 0.7 }} width={28} />
              <YAxis yAxisId="pct" orientation="right" domain={[0, 100]} fontSize={11} tick={{ fill: "currentColor", opacity: 0.7 }} width={32} />
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine yAxisId="band" y={7} stroke="hsl(var(--primary))" strokeDasharray="4 4" opacity={0.35} />
              <Line yAxisId="band" type="monotone" dataKey="band" name={t("Band", "Band")} stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line yAxisId="pct" type="monotone" dataKey="percent" name={t("Chính xác %", "Accuracy %")} stroke="#10b981" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="text-[11px] text-muted-foreground">
          {t(
            "Đường liền: band ước tính. Đường đứt: % câu đúng. Vạch mờ = mục tiêu Band 7.",
            "Solid line: estimated band. Dashed line: accuracy %. Faded line marks the Band 7 target."
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Kpi: React.FC<{ icon: React.ReactNode; label: string; value: string; accent?: boolean }> = ({ icon, label, value, accent }) => (
  <div className={`rounded-lg border px-3 py-2 ${accent ? "bg-primary/10 border-primary/30" : "bg-card"}`}>
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground flex items-center gap-1">
      {icon} {label}
    </div>
    <div className="text-lg font-bold text-foreground leading-tight">{value}</div>
  </div>
);

export default ReadingProgressChart;
