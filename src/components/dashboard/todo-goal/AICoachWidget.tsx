// AI Coach: fetches 2-3 recommended micro-tasks and lets user one-click add.
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";
import { avgDailyGoalVelocity } from "./studyGoalMath";

interface Suggestion {
  title: string;
  priority: "high" | "medium" | "low";
  difficulty: number;
  goal_id: string | null;
  contribution_pct: number;
  reason: string;
}

interface Props {
  goals: StudyGoal[];
  tasks: StudyTask[];
  onAdd: (task: Partial<StudyTask>) => Promise<StudyTask | null>;
}

export default function AICoachWidget({ goals, tasks, onAdd }: Props) {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const active = goals.filter((g) => g.status === "active");

  const fetchSuggestions = async () => {
    if (active.length === 0) return;
    setLoading(true);
    setError(null);
    const cutoff = Date.now() - 14 * 86400000;
    const completedLast14d = tasks.filter((t) => t.completed_at && new Date(t.completed_at).getTime() >= cutoff).length;
    const avgDailyPct = active.reduce((s, g) => s + avgDailyGoalVelocity(g, tasks), 0);
    try {
      const { data, error } = await supabase.functions.invoke("recommend-study-tasks", {
        body: {
          goals: active.map((g) => ({
            id: g.id, title: g.title, category: g.category, target_date: g.target_date, progress_pct: g.progress_pct,
          })),
          recentStats: { completedLast14d, avgDailyPct },
          lang,
        },
      });
      if (error) throw error;
      setSuggestions(data?.tasks ?? []);
      if ((data?.tasks ?? []).length === 0) setError(t("Không có gợi ý phù hợp lúc này.", "No suggestions right now."));
    } catch (e: any) {
      setError(e?.message ?? "AI error");
    } finally {
      setLoading(false);
    }
  };

  const add = async (s: Suggestion) => {
    await onAdd({
      title: s.title,
      priority: s.priority,
      difficulty: s.difficulty,
      goal_id: s.goal_id,
      contribution_pct: s.contribution_pct,
      is_ai_suggested: true,
      ai_rationale: s.reason,
    });
    setSuggestions((prev) => prev.filter((x) => x.title !== s.title));
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/30 backdrop-blur">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t("AI Coach", "AI Coach")}</h3>
              <p className="text-[11px] text-muted-foreground">{t("Gợi ý task hôm nay", "Today's smart picks")}</p>
            </div>
          </div>
          <Button size="sm" onClick={fetchSuggestions} disabled={loading || active.length === 0} className="gap-1.5">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            {t("Gợi ý", "Get plan")}
          </Button>
        </div>

        {active.length === 0 && (
          <p className="text-xs text-muted-foreground">{t("Tạo mục tiêu trước để nhận gợi ý cá nhân hoá.", "Create a goal first to unlock personalized picks.")}</p>
        )}

        {error && <p className="text-xs text-amber-600">{error}</p>}

        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((s, i) => {
              const g = goals.find((x) => x.id === s.goal_id);
              return (
                <div key={i} className="p-2.5 rounded-lg bg-background/60 border border-indigo-500/20 flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{s.title}</div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px]">
                      <Badge variant="outline" className="py-0 px-1.5">{s.priority}</Badge>
                      {g && <Badge variant="secondary" className="py-0 px-1.5">{g.title.slice(0, 20)} +{s.contribution_pct.toFixed(1)}%</Badge>}
                    </div>
                    {s.reason && <p className="text-[10px] text-muted-foreground mt-1">{s.reason}</p>}
                  </div>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-indigo-600 hover:bg-indigo-500/10" onClick={() => add(s)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
