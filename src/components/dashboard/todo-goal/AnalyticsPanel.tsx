// Analytics panel: daily completion gauge, 30-day heatmap, goal bridge chart.
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadialBarChart, RadialBar, ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";
import { dailyCompletionPct, heatmap30, goalBridgeSeries } from "./studyGoalMath";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  goals: StudyGoal[];
  tasks: StudyTask[];
}

export default function AnalyticsPanel({ goals, tasks }: Props) {
  const { t } = useLanguage();
  const [selectedGoal, setSelectedGoal] = useState<string>(goals[0]?.id ?? "");

  const dailyPct = useMemo(() => dailyCompletionPct(tasks), [tasks]);
  const heatmap = useMemo(() => heatmap30(tasks), [tasks]);
  const bridgeGoal = goals.find((g) => g.id === selectedGoal) ?? goals[0];
  const bridge = useMemo(
    () => (bridgeGoal ? goalBridgeSeries(bridgeGoal, tasks) : []),
    [bridgeGoal, tasks]
  );

  const gaugeData = [{ name: "done", value: dailyPct, fill: dailyPct >= 80 ? "hsl(160 84% 45%)" : dailyPct >= 40 ? "hsl(45 93% 55%)" : "hsl(0 84% 60%)" }];

  const heatCell = (ratio: number, planned: number): string => {
    if (planned === 0) return "bg-muted/40";
    if (ratio >= 1) return "bg-emerald-500";
    if (ratio >= 0.7) return "bg-emerald-500/75";
    if (ratio >= 0.4) return "bg-emerald-500/50";
    if (ratio > 0) return "bg-emerald-500/25";
    return "bg-rose-500/25";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Daily completion gauge */}
      <Card className="bg-card/60 backdrop-blur">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-2">{t("Hiệu quả hôm nay", "Today's Efficiency")}</h4>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={gaugeData} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-3xl font-bold">{dailyPct}%</div>
              <div className="text-[11px] text-muted-foreground">{t("hoàn thành", "completed")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 30-day heatmap */}
      <Card className="bg-card/60 backdrop-blur lg:col-span-2">
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-2">{t("Độ đều đặn 30 ngày", "30-Day Consistency")}</h4>
          <div className="grid grid-cols-15 gap-1" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}>
            {heatmap.map((d) => (
              <div
                key={d.date}
                title={`${d.date}: ${d.done}/${d.planned}`}
                className={`aspect-square rounded ${heatCell(d.ratio, d.planned)} transition-colors`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted/40" />{t("Không có task", "No tasks")}</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/25" />&lt;40%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/50" />40-70%</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500" />100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Goal progress bridge */}
      {goals.length > 0 && bridgeGoal && (
        <Card className="bg-card/60 backdrop-blur lg:col-span-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">{t("Đóng góp hàng ngày -> Tiến độ mục tiêu (14 ngày)", "Daily contribution -> Goal progress (14 days)")}</h4>
              <Select value={selectedGoal || bridgeGoal.id} onValueChange={setSelectedGoal}>
                <SelectTrigger className="w-48 h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {goals.map((g) => <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={bridge}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  <Bar dataKey="contribution" fill="hsl(160 84% 45%)" radius={[4, 4, 0, 0]} name={t("Đóng góp %", "Contribution %")} />
                  <Line type="monotone" dataKey="cumulative" stroke="hsl(220 84% 55%)" strokeWidth={2} dot={false} name={t("Luỹ kế %", "Cumulative %")} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
