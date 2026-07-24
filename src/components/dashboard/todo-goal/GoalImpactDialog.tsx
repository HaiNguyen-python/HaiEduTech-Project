// Dialog: sources breakdown (tasks vs activities) + forecast simulator.
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGoalActivityProgress } from "./useGoalActivityProgress";
import { forecastCompletion } from "./smartRecommender";
import { estimatedCompletionDate } from "./studyGoalMath";
import type { StudyGoal, StudyTask } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  goal: StudyGoal | null;
  tasks: StudyTask[];
  userId: string | null;
}

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6"];

export default function GoalImpactDialog({ open, onOpenChange, goal, tasks, userId }: Props) {
  const { t } = useLanguage();
  const [minutes, setMinutes] = useState(30);
  const activity = useGoalActivityProgress(userId, goal);

  const taskPct = goal ? Math.round(Number(goal.progress_pct || 0)) : 0;
  const activityPct = Math.round(activity.activityPct);

  const sources = useMemo(() => [
    { name: t("Task hoàn thành", "Completed tasks"), value: taskPct },
    { name: t("Hoạt động học trên trang", "On-site learning"), value: activityPct },
    { name: t("Còn lại", "Remaining"), value: Math.max(0, 100 - taskPct - activityPct) },
  ], [taskPct, activityPct, t]);

  const baselineEta = goal ? estimatedCompletionDate(goal, tasks) : null;
  const forecast = goal ? forecastCompletion(goal, tasks, minutes) : null;
  const daysDiff = baselineEta && forecast
    ? Math.round((baselineEta.getTime() - forecast.getTime()) / 86400000)
    : 0;

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {t("Tác động lên mục tiêu", "Goal impact")}
            <Badge variant="secondary" className="text-[10px]">{goal.title}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sources */}
          <div>
            <h4 className="text-sm font-semibold mb-2">{t("Nguồn đóng góp", "Contribution sources")}</h4>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sources} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {sources.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" />{sources[0].name}: <b>{taskPct}%</b></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" />{sources[1].name}: <b>{activityPct}%</b> ({activity.activityCount} activities, {activity.masteredCount} từ)</div>
            </div>
          </div>

          {/* Forecast */}
          <div>
            <h4 className="text-sm font-semibold mb-2">{t("Mô phỏng tốc độ", "Study pace forecast")}</h4>
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
              <div className="text-xs text-muted-foreground">{t("Nếu bạn học mỗi ngày", "If you study every day")}</div>
              <div className="text-3xl font-bold text-indigo-600 my-1">{minutes} {t("phút", "min")}</div>
              <Slider value={[minutes]} min={5} max={120} step={5} onValueChange={(v) => setMinutes(v[0])} className="my-3" />
              <div className="text-sm">
                {forecast ? (
                  <>
                    {t("Bạn sẽ đạt mục tiêu vào", "You'll reach the goal on")}{" "}
                    <b className="text-indigo-600">{forecast.toISOString().slice(0, 10)}</b>
                    {daysDiff !== 0 && baselineEta && (
                      <div className="text-[11px] text-muted-foreground mt-1">
                        {daysDiff > 0
                          ? t(`Sớm hơn ${daysDiff} ngày so với hiện tại`, `${daysDiff} days earlier than current pace`)
                          : t(`Chậm hơn ${Math.abs(daysDiff)} ngày`, `${Math.abs(daysDiff)} days slower`)}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">{t("Cần thêm dữ liệu", "Need more data")}</span>
                )}
              </div>
            </div>
            {goal.target_date && (
              <div className="text-xs mt-2 text-muted-foreground">
                {t("Hạn mục tiêu", "Target deadline")}: <b>{goal.target_date}</b>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
