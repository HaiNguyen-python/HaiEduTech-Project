// Task list with checkbox, priority pill, linked-goal chip.
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";

interface Props {
  tasks: StudyTask[];
  goals: StudyGoal[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyLabel?: string;
}

const PRIO_STYLES: Record<string, string> = {
  high: "bg-rose-500/15 text-rose-600 border-rose-500/30",
  medium: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  low: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const PRIO_LABEL_VI: Record<string, string> = { high: "Khó", medium: "Vừa", low: "Dễ" };
const PRIO_LABEL_EN: Record<string, string> = { high: "Difficult", medium: "Medium", low: "Easy" };

export default function TaskList({ tasks, goals, onToggle, onDelete, emptyLabel }: Props) {
  const { t, lang } = useLanguage();
  const goalMap = new Map(goals.map((g) => [g.id, g]));

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
        {emptyLabel ?? t("Chưa có việc nào - hãy thêm task đầu tiên", "No tasks yet - add your first one")}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const g = task.goal_id ? goalMap.get(task.goal_id) : null;
        const done = !!task.completed_at;
        return (
          <div
            key={task.id}
            className={`group flex items-start gap-3 p-3 rounded-lg border transition-all ${
              done ? "bg-muted/40 border-border/40 opacity-70" : "bg-card border-border hover:border-primary/40"
            }`}
          >
            <Checkbox checked={done} onCheckedChange={() => onToggle(task.id)} className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className={`text-sm ${done ? "line-through" : "font-medium"}`}>{task.title}</div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <Badge variant="outline" className={`text-[10px] py-0 px-1.5 ${PRIO_STYLES[task.priority]}`}>
                  {lang === "vi" ? PRIO_LABEL_VI[task.priority] : PRIO_LABEL_EN[task.priority]}
                </Badge>
                {g && (
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 gap-1">
                    <Target className="w-2.5 h-2.5" />
                    {g.title.slice(0, 24)}
                    {task.contribution_pct > 0 && <span className="text-emerald-600 font-semibold">+{Number(task.contribution_pct).toFixed(1)}%</span>}
                  </Badge>
                )}
                {task.is_ai_suggested && (
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5 gap-1 border-indigo-500/40 text-indigo-600">
                    <Sparkles className="w-2.5 h-2.5" />AI
                  </Badge>
                )}
              </div>
            </div>
            <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:text-destructive" onClick={() => onDelete(task.id)}>
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
