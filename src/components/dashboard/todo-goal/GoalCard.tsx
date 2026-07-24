// Goal card with combined task + activity progress, ETA, motivational nudge, and impact dialog.
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Target, TrendingUp, Pencil, Trash2, Sparkles, Activity, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";
import { estimatedCompletionDate, isLagging } from "./studyGoalMath";
import { useGoalActivityProgress } from "./useGoalActivityProgress";
import GoalImpactDialog from "./GoalImpactDialog";

interface Props {
  goal: StudyGoal;
  tasks: StudyTask[];
  userId: string | null;
  onEdit: () => void;
  onDelete: () => void;
}

const MOTIVATION_VI = [
  "Cố lên! Mỗi bước nhỏ hôm nay là chiến thắng lớn ngày mai.",
  "Hành trình vạn dặm bắt đầu từ một bước chân - bạn đang đi đúng hướng!",
  "Không sao cả, hãy tiếp tục - kỷ luật đánh bại động lực.",
  "Mỗi phút học hôm nay là một khoản đầu tư cho tương lai.",
  "Hít thở sâu, làm 1 task nhỏ - động lượng sẽ theo sau.",
  "Bạn giỏi hơn bạn nghĩ. Bắt đầu từ việc dễ nhất nào!",
];
const MOTIVATION_EN = [
  "Keep going - small steps today build big wins tomorrow.",
  "The journey of a thousand miles starts with one step. You're on it!",
  "It's okay - discipline beats motivation. Just start.",
  "Every minute of learning today is an investment in your future.",
  "Take a breath, do one small task - momentum will follow.",
  "You're stronger than you think. Start with the easiest one!",
];

function hashPick<T>(seed: string, arr: T[]): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return arr[Math.abs(h) % arr.length];
}

export default function GoalCard({ goal, tasks, userId, onEdit, onDelete }: Props) {
  const { t, lang } = useLanguage();
  const activity = useGoalActivityProgress(userId, goal);
  const taskPct = Math.round(Number(goal.progress_pct || 0));
  const totalPct = Math.min(100, taskPct + Math.round(activity.activityPct));

  const eta = estimatedCompletionDate({ ...goal, progress_pct: totalPct } as StudyGoal, tasks);
  const lagging = isLagging({ ...goal, progress_pct: totalPct } as StudyGoal, tasks);
  const daysToTarget = goal.target_date
    ? Math.ceil((new Date(goal.target_date).getTime() - Date.now()) / 86400000)
    : null;

  const motivation = hashPick(goal.id + new Date().toISOString().slice(0, 10), lang === "vi" ? MOTIVATION_VI : MOTIVATION_EN);

  return (
    <Card className="relative overflow-hidden bg-card/60 backdrop-blur border-border/60 hover:border-primary/40 transition-all group">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${lagging ? "from-indigo-500 to-purple-500" : "from-emerald-500 to-teal-500"}`} />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-primary shrink-0" />
              <h3 className="font-semibold text-sm truncate">{goal.title}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
              <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{goal.category}</Badge>
              {goal.target_metric && <span className="truncate">{goal.target_metric}</span>}
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={onEdit}><Pencil className="w-3.5 h-3.5" /></Button>
            <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive" onClick={onDelete}><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">{t("Tiến độ tổng", "Total progress")}</span>
            <span className="font-semibold">{totalPct}%</span>
          </div>
          <Progress value={totalPct} className="h-2" />
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t("Task", "Tasks")} {taskPct}%
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-emerald-500" />
              {t("Hoạt động", "Activity")} {Math.round(activity.activityPct)}%
              {(activity.activityCount + activity.masteredCount) > 0 && (
                <span className="opacity-70">({activity.activityCount} + {activity.masteredCount} từ)</span>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {goal.target_date ? (
              <span className={daysToTarget !== null && daysToTarget < 30 ? "text-amber-600 font-medium" : ""}>
                {daysToTarget !== null && daysToTarget >= 0 ? `${daysToTarget}d ${t("còn lại", "left")}` : t("Đã qua hạn", "Overdue")}
              </span>
            ) : <span>{t("Chưa đặt hạn", "No deadline")}</span>}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            {eta ? <span>ETA {eta.toISOString().slice(5, 10)}</span> : <span>{t("Cần thêm data", "Need data")}</span>}
          </div>
        </div>

        {lagging && (
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 rounded-md px-2 py-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="leading-snug">{motivation}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
