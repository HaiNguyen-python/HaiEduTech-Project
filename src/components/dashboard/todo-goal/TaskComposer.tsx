// Quick task composer: optimistic insert, then background AI alignment.
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { estimateContribution } from "./estimateContribution";
import type { StudyGoal, StudyTask } from "./types";

interface Props {
  goals: StudyGoal[];
  onCreate: (t: Partial<StudyTask>) => Promise<StudyTask | null>;
  onPatch?: (id: string, patch: Partial<StudyTask>) => void;
}

export default function TaskComposer({ goals, onCreate, onPatch }: Props) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [loading, setLoading] = useState(false);

  // Live estimate so users see the linked main goal and % as they type.
  const estimate = estimateContribution(title, goals);
  const estimatedGoal = estimate.goalId ? goals.find((g) => g.id === estimate.goalId) : null;

  const submit = async () => {
    const value = title.trim();
    if (!value || loading) return;
    setLoading(true);
    // Insert immediately with the client-side estimate so the % is visible right away.
    const created = await onCreate({
      title: value,
      priority,
      goal_id: estimate.goalId,
      contribution_pct: estimate.pct,
    });
    setTitle("");
    setLoading(false);

    // Fire-and-forget AI alignment refines the estimate in the background.
    if (created && goals.length > 0 && onPatch) {
      supabase.functions
        .invoke("align-study-task", {
          body: {
            taskTitle: value,
            goals: goals.map((g) => ({ id: g.id, title: g.title, category: g.category })),
          },
        })
        .then(({ data }) => {
          if (!data) return;
          const patch: Partial<StudyTask> = {
            goal_id: data.goal_id ?? estimate.goalId,
            contribution_pct: Number(data.contribution_pct) || estimate.pct,
            ai_rationale: data.rationale ?? null,
          };
          onPatch(created.id, patch);
        })
        .catch(() => { /* silent - task already saved with estimate */ });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 p-3 bg-card/60 backdrop-blur border rounded-xl">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder={t("Thêm việc cần làm hôm nay...", "Add today's task...")}
        className="flex-1"
        disabled={loading}
      />
      <Select value={priority} onValueChange={(v) => setPriority(v as any)} disabled={loading}>
        <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="low">{t("Dễ", "Easy Task")}</SelectItem>
          <SelectItem value="medium">{t("Vừa", "Medium Task")}</SelectItem>
          <SelectItem value="high">{t("Khó", "Difficult Task")}</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={submit} disabled={!title.trim() || loading} className="gap-1.5">
        <Plus className="w-4 h-4" />
        {t("Thêm", "Add")}
      </Button>
      {estimatedGoal && (
        <div className="w-full text-[11px] text-muted-foreground sm:pl-1">
          {t("Liên kết mục tiêu", "Linked to")}: <span className="font-medium text-foreground">{estimatedGoal.title.slice(0, 40)}</span>
          <span className="ml-1 text-emerald-600 font-semibold">+{estimate.pct.toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
