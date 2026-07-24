// Four-KPI health strip: on-track goals, at-risk goals, week minutes, active tasks.
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, Clock, ListChecks } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";
import { computeHealth } from "./smartRecommender";

interface Props { goals: StudyGoal[]; tasks: StudyTask[]; userId: string | null; }

export default function GoalHealthStrip({ goals, tasks, userId }: Props) {
  const { t } = useLanguage();
  const [weekMinutes, setWeekMinutes] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
    supabase
      .from("student_activity_log")
      .select("time_spent_seconds")
      .eq("user_id", userId)
      .gte("created_at", weekAgo)
      .limit(5000)
      .then(({ data }) => {
        const secs = (data ?? []).reduce((s: number, r: any) => s + (Number(r.time_spent_seconds) || 0), 0);
        setWeekMinutes(Math.round(secs / 60));
      });
  }, [userId]);

  const health = computeHealth(goals, weekMinutes);
  const openTasks = tasks.filter((x) => !x.completed_at).length;

  const kpis = [
    { label: t("Đúng tiến độ", "On-track"), value: health.onTrack, icon: TrendingUp, color: "text-emerald-600 bg-emerald-500/10" },
    { label: t("Cần chú ý", "At-risk"), value: health.atRisk + health.overdue, icon: AlertTriangle, color: "text-amber-600 bg-amber-500/10" },
    { label: t("Phút học/tuần", "Study min/wk"), value: weekMinutes, icon: Clock, color: "text-blue-600 bg-blue-500/10" },
    { label: t("Task đang mở", "Open tasks"), value: openTasks, icon: ListChecks, color: "text-purple-600 bg-purple-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <Card key={k.label} className="bg-card/60 backdrop-blur border-border/60">
          <CardContent className="p-3 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.color}`}>
              <k.icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-bold leading-none">{k.value}</div>
              <div className="text-[11px] text-muted-foreground mt-1 truncate">{k.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
