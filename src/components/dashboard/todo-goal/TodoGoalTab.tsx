// Main container for the Goals & To-do dashboard tab.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Target, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStudyGoalsTasks } from "./useStudyGoalsTasks";
import GoalCard from "./GoalCard";
import GoalFormDialog from "./GoalFormDialog";
import TaskList from "./TaskList";
import TaskComposer from "./TaskComposer";
import AnalyticsPanel from "./AnalyticsPanel";
import AICoachWidget from "./AICoachWidget";
import type { StudyGoal } from "./types";
import { todaysTasks } from "./studyGoalMath";

interface Props { userId: string | null; }

export default function TodoGoalTab({ userId }: Props) {
  const { t } = useLanguage();
  const { goals, tasks, loading, createGoal, updateGoal, deleteGoal, createTask, toggleTask, deleteTask } = useStudyGoalsTasks(userId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editGoal, setEditGoal] = useState<StudyGoal | null>(null);

  const today = todaysTasks(tasks);
  const upcoming = tasks.filter((t) => {
    const iso = new Date().toISOString().slice(0, 10);
    return !t.completed_at && (t.due_date ?? iso) > iso;
  }).slice(0, 20);

  if (!userId) {
    return <div className="text-center py-10 text-muted-foreground">{t("Vui lòng đăng nhập.", "Please sign in.")}</div>;
  }

  if (loading) {
    return <div className="text-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Goals section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">{t("Mục tiêu lâu dài", "Study Goals")}</h2>
          </div>
          <Button size="sm" onClick={() => { setEditGoal(null); setDialogOpen(true); }} className="gap-1.5">
            <Plus className="w-4 h-4" />{t("Thêm mục tiêu", "New goal")}
          </Button>
        </div>
        {goals.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-xl bg-card/40">
            {t("Đặt mục tiêu đầu tiên để AI Coach cá nhân hoá lộ trình học.", "Set your first goal to unlock AI Coach recommendations.")}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {goals.map((g) => (
              <GoalCard
                key={g.id}
                goal={g}
                tasks={tasks}
                onEdit={() => { setEditGoal(g); setDialogOpen(true); }}
                onDelete={() => deleteGoal(g.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Tasks + AI coach */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <TaskComposer goals={goals} onCreate={createTask} />
          <div>
            <h3 className="text-sm font-semibold mb-2">{t("Hôm nay", "Today")} <span className="text-muted-foreground font-normal">({today.length})</span></h3>
            <TaskList tasks={today} goals={goals} onToggle={toggleTask} onDelete={deleteTask} />
          </div>
          {upcoming.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2 mt-4">{t("Sắp tới", "Upcoming")}</h3>
              <TaskList tasks={upcoming} goals={goals} onToggle={toggleTask} onDelete={deleteTask} />
            </div>
          )}
        </div>
        <div>
          <AICoachWidget goals={goals} tasks={tasks} onAdd={createTask} />
        </div>
      </section>

      {/* Analytics */}
      <section>
        <h2 className="text-lg font-bold mb-3">{t("Phân tích hiệu suất", "Performance Analytics")}</h2>
        <AnalyticsPanel goals={goals} tasks={tasks} />
      </section>

      <GoalFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editGoal}
        onSubmit={(v) => editGoal ? updateGoal(editGoal.id, v) : createGoal(v)}
      />
    </div>
  );
}
