// Timeline of on-site learning activities and how they contribute to active goals.
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Mic, Headphones, PenLine, GraduationCap, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudyGoal } from "./types";

interface Props { userId: string | null; goals: StudyGoal[]; }

interface Row { date: string; type: string; count: number; category: string; contribution: number; goalTitle: string | null; }

const CATEGORY_MAP: Record<string, string> = {
  ielts_: "ielts", toeic_: "ielts", pte_: "ielts",
  hsk: "hsk", hskk: "hsk", conv_chinese: "hsk",
  conv_finnish: "yki", speaking_coach_finnish: "yki",
  python: "programming", sql: "programming", coding_quiz: "programming",
};
function categoryOf(activityType: string): string | null {
  const t = (activityType || "").toLowerCase();
  for (const [prefix, cat] of Object.entries(CATEGORY_MAP)) {
    if (t.startsWith(prefix)) return cat;
  }
  return null;
}
function iconOf(t: string) {
  if (t.includes("speaking") || t.includes("hskk")) return Mic;
  if (t.includes("listening")) return Headphones;
  if (t.includes("writing")) return PenLine;
  if (t.includes("lecture") || t.includes("lesson")) return GraduationCap;
  return BookOpen;
}

export default function ActivityContributionFeed({ userId, goals }: Props) {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const since = new Date(Date.now() - 14 * 86400000).toISOString();
      const { data } = await supabase
        .from("student_activity_log")
        .select("activity_type, created_at")
        .eq("user_id", userId)
        .gte("created_at", since)
        .not("activity_type", "in", "(session_heartbeat,daily_login)")
        .limit(500);

      const byKey = new Map<string, Row>();
      for (const r of data ?? []) {
        const cat = categoryOf(r.activity_type);
        if (!cat) continue;
        const goal = goals.find((g) => g.category === cat && g.status === "active");
        const day = (r.created_at as string).slice(0, 10);
        const key = `${day}|${r.activity_type}|${cat}`;
        const prev = byKey.get(key);
        if (prev) prev.count += 1;
        else byKey.set(key, {
          date: day, type: r.activity_type, count: 1, category: cat,
          contribution: 0, goalTitle: goal?.title ?? null,
        });
      }
      const list = Array.from(byKey.values())
        .map((row) => ({ ...row, contribution: Number((row.count * 0.5).toFixed(1)) }))
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 12);
      setRows(list);
    })();
  }, [userId, goals.length]);

  if (rows.length === 0) {
    return (
      <Card className="bg-card/60 backdrop-blur">
        <CardContent className="p-4 text-sm text-muted-foreground text-center">
          {t("Chưa có hoạt động học 14 ngày qua. Bắt đầu 1 bài học để thấy đóng góp cho mục tiêu!",
             "No learning activity in the last 14 days. Start a lesson to see contributions here!")}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 backdrop-blur border-emerald-500/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <h3 className="font-semibold text-sm">{t("Hoạt động học -> Mục tiêu", "Learning -> Goals feed")}</h3>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {rows.map((r, i) => {
            const Icon = iconOf(r.type);
            return (
              <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-background/50 border border-border/40">
                <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-medium">{r.count}x {r.type.replace(/_/g, " ")}</span>
                    <Badge variant="outline" className="py-0 px-1.5 text-[10px]">+{r.contribution}%</Badge>
                  </div>
                  <div className="text-muted-foreground mt-0.5 truncate">
                    {r.date} {r.goalTitle && <>-&gt; <span className="text-emerald-600">{r.goalTitle}</span></>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
