/**
 * @file PlacementHistoryCard.tsx
 * @description Shows the student their placement history: the class a teacher
 *   approved, the teacher's notes, and every previous run so progress between
 *   attempts is visible. Read-only - nothing here changes a placement.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { ClipboardCheck, Loader2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

interface Run {
  id: string;
  subject: string | null;
  cefr_band: string | null;
  total_score: number;
  assigned_class: string | null;
  teacher_notes: string | null;
  status: string | null;
  created_at: string;
}

const STATUS_TONE: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-800",
  interview: "bg-amber-100 text-amber-900",
  pending: "bg-slate-100 text-slate-700",
};

const PlacementHistoryCard = () => {
  const { t } = useLanguage();
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { if (active) setLoading(false); return; }
      const { data } = await supabase
        .from("placement_test_results")
        .select("id, subject, cefr_band, total_score, assigned_class, teacher_notes, status, created_at")
        .eq("user_id", auth.user.id)
        .order("created_at", { ascending: false })
        .limit(12);
      if (!active) return;
      setRuns((data ?? []) as Run[]);
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <Card><CardContent className="p-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        {t("Đang tải kết quả xếp lớp…", "Loading placement results…")}
      </CardContent></Card>
    );
  }
  if (runs.length === 0) return null;

  const latest = runs[0];
  const previous = runs[1];
  const delta = previous ? latest.total_score - previous.total_score : null;

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start gap-2">
          <ClipboardCheck className="w-5 h-5 text-primary mt-0.5" />
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">
              {t("Kết quả xếp lớp của bạn", "Your placement results")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(
                "Giáo viên duyệt lớp sau khi xem bài của bạn.",
                "A teacher approves your class after reviewing your test.",
              )}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{latest.subject ?? "english"}</Badge>
            <span className="font-semibold text-foreground">{latest.cefr_band ?? "-"}</span>
            <span className="text-sm text-muted-foreground">
              {latest.total_score}/100
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_TONE[latest.status ?? "pending"] ?? STATUS_TONE.pending}`}>
              {latest.status === "approved"
                ? t("Đã duyệt", "Approved")
                : latest.status === "interview"
                  ? t("Cần phỏng vấn ngắn", "Short interview needed")
                  : t("Đang chờ giáo viên", "Waiting for teacher")}
            </span>
            {delta !== null && delta !== 0 && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${delta > 0 ? "text-emerald-700" : "text-rose-700"}`}>
                <TrendingUp className="w-3 h-3" />
                {delta > 0 ? "+" : ""}{delta} {t("so với lần trước", "vs previous run")}
              </span>
            )}
          </div>
          {latest.assigned_class && (
            <p className="text-sm text-foreground">
              <span className="font-semibold">{t("Lớp được xếp:", "Assigned class:")}</span>{" "}
              {latest.assigned_class}
            </p>
          )}
          {latest.teacher_notes && (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              <span className="font-semibold text-foreground">{t("Ghi chú của giáo viên:", "Teacher notes:")}</span>{" "}
              {latest.teacher_notes}
            </p>
          )}
        </div>

        {runs.length > 1 && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              {t("Lịch sử", "History")}
            </p>
            {runs.slice(1).map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 text-sm border-b border-border/60 py-1.5">
                <span className="text-foreground">
                  {new Date(r.created_at).toLocaleDateString()} · {r.subject ?? "english"}
                </span>
                <span className="text-muted-foreground">
                  {r.cefr_band ?? "-"} · {r.total_score}/100
                  {r.assigned_class ? ` · ${r.assigned_class}` : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlacementHistoryCard;
