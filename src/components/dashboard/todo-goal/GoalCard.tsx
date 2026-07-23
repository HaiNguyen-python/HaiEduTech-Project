// Goal card with progress, ETA, deadline, and edit/delete actions.
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Target, TrendingUp, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";
import { estimatedCompletionDate, isLagging } from "./studyGoalMath";

interface Props {
  goal: StudyGoal;
  tasks: StudyTask[];
  onEdit: () => void;
  onDelete: () => void;
}

export default function GoalCard({ goal, tasks, onEdit, onDelete }: Props) {
  const { t } = useLanguage();
  const eta = estimatedCompletionDate(goal, tasks);
  const lagging = isLagging(goal, tasks);
  const daysToTarget = goal.target_date
    ? Math.ceil((new Date(goal.target_date).getTime() - Date.now()) / 86400000)
    : null;
  const pct = Math.round(Number(goal.progress_pct || 0));

  return (
    <Card className="relative overflow-hidden bg-card/60 backdrop-blur border-border/60 hover:border-primary/40 transition-all group">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${lagging ? "from-amber-500 to-orange-500" : "from-emerald-500 to-teal-500"}`} />
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
            <span className="text-muted-foreground">{t("Tiến độ", "Progress")}</span>
            <span className="font-semibold">{pct}%</span>
          </div>
          <Progress value={pct} className="h-2" />
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
          <div className="flex items-center gap-1.5 text-[11px] text-amber-600 bg-amber-500/10 rounded-md px-2 py-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {t("Đang chậm tiến độ - hãy thêm task hôm nay", "Behind schedule - add tasks today")}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
