/**
 * SuspiciousActivityCard
 * Surfaces students whose vocab-mastery count is heavily inflated by spam clicks.
 * Calls public.get_suspicious_vocab_activity (staff-gated).
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Loader2, ShieldAlert } from "lucide-react";

interface Row {
  user_id: string;
  display_name: string;
  raw_count: number;
  fair_count: number;
  inflation_ratio: number | null;
  peak_per_minute: number;
}

const SuspiciousActivityCard = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc("get_suspicious_vocab_activity", {
        _days: 30,
        _limit: 30,
      });
      if (cancelled) return;
      if (!error && Array.isArray(data)) setRows(data as Row[]);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <Card className="border-amber-300/60 dark:border-amber-700/40">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          {t("Phát hiện spam dấu sao (30 ngày)", "Suspicious star-spam (last 30 days)")}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {t(
            "Học viên có số từ thô gấp ≥2 lần số từ học thật (sau khi cap 8/phút - 200/ngày).",
            "Students whose raw vocab marks are ≥2× the fair count (after capping 8/min - 200/day).",
          )}
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("Đang phân tích...", "Analyzing...")}
          </div>
        ) : rows.length === 0 ? (
          <div className="text-sm text-emerald-600 dark:text-emerald-400 py-3">
            ✅ {t("Không phát hiện hành vi spam nào.", "No suspicious activity detected.")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="py-2 pr-2">{t("Học viên", "Student")}</th>
                  <th className="py-2 px-2 text-right">{t("Thô", "Raw")}</th>
                  <th className="py-2 px-2 text-right">{t("Hợp lệ", "Fair")}</th>
                  <th className="py-2 px-2 text-right">{t("Đỉnh/phút", "Peak/min")}</th>
                  <th className="py-2 pl-2 text-right">{t("Mức thổi phồng", "Inflation")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const ratio = r.inflation_ratio ?? 0;
                  const severity =
                    ratio >= 10 ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    : ratio >= 4 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
                  return (
                    <tr key={r.user_id} className="border-b border-border/40">
                      <td className="py-2 pr-2 font-medium text-foreground">{r.display_name}</td>
                      <td className="py-2 px-2 text-right tabular-nums text-muted-foreground">{r.raw_count}</td>
                      <td className="py-2 px-2 text-right tabular-nums font-semibold text-foreground">{r.fair_count}</td>
                      <td className="py-2 px-2 text-right tabular-nums">
                        {r.peak_per_minute > 30 ? (
                          <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                            <AlertTriangle className="w-3 h-3" /> {r.peak_per_minute}
                          </span>
                        ) : r.peak_per_minute}
                      </td>
                      <td className="py-2 pl-2 text-right">
                        <Badge className={severity}>×{ratio?.toFixed(1) ?? "—"}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuspiciousActivityCard;
