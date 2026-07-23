// Quick task composer: title + priority; AI aligns to a goal on submit.
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal, StudyTask } from "./types";

interface Props {
  goals: StudyGoal[];
  onCreate: (t: Partial<StudyTask>) => Promise<StudyTask | null>;
}

export default function TaskComposer({ goals, onCreate }: Props) {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!title.trim() || loading) return;
    setLoading(true);
    // Best-effort AI alignment; falls back to unaligned if it fails.
    let goal_id: string | null = null;
    let contribution_pct = 0;
    let ai_rationale: string | null = null;
    try {
      if (goals.length > 0) {
        const { data } = await supabase.functions.invoke("align-study-task", {
          body: {
            taskTitle: title.trim(),
            goals: goals.map((g) => ({ id: g.id, title: g.title, category: g.category })),
          },
        });
        if (data) {
          goal_id = data.goal_id ?? null;
          contribution_pct = Number(data.contribution_pct) || 0;
          ai_rationale = data.rationale ?? null;
        }
      }
    } catch { /* ignore, insert anyway */ }

    await onCreate({ title: title.trim(), priority, goal_id, contribution_pct, ai_rationale });
    setTitle("");
    setLoading(false);
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
        <SelectTrigger className="w-full sm:w-28"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="high">{t("Cao", "High")}</SelectItem>
          <SelectItem value="medium">{t("Vừa", "Medium")}</SelectItem>
          <SelectItem value="low">{t("Thấp", "Low")}</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={submit} disabled={!title.trim() || loading} className="gap-1.5">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        {goals.length > 0 && <Sparkles className="w-3.5 h-3.5" />}
        {t("Thêm", "Add")}
      </Button>
    </div>
  );
}
