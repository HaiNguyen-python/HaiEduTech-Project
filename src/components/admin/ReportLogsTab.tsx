import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { ClipboardList, Loader2, Mail, Play, RefreshCw } from "lucide-react";

interface ReportLogRow {
  id: string;
  period_start: string;
  period_end: string;
  user_id: string;
  recipient_email: string;
  student_name: string | null;
  status: string;
  error_message: string | null;
  metrics: Record<string, any>;
  created_at: string;
}

const STATUS_STYLE: Record<string, string> = {
  queued: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  sent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  skipped: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  dry_run: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function ReportLogsTab() {
  const [rows, setRows] = useState<ReportLogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("monthly_report_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error("Không tải được Report Logs: " + error.message);
    } else {
      setRows((data || []) as ReportLogRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const runNow = async (dryRun: boolean) => {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("monthly-progress-report", {
        body: { dryRun },
      });
      if (error) throw error;
      const r = data as any;
      toast.success(
        `${dryRun ? "Dry-run" : "Đã chạy"}: xử lý ${r.processed} · gửi ${r.sent} · bỏ qua ${r.skipped} · lỗi ${r.failed}`
      );
      await fetchLogs();
    } catch (e) {
      toast.error("Không chạy được report: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setRunning(false);
    }
  };

  // Group by period for summary
  const periods = Array.from(
    rows.reduce((map, r) => {
      const k = r.period_start;
      const cur = map.get(k) || { period: k, total: 0, queued: 0, sent: 0, failed: 0, skipped: 0 };
      cur.total += 1;
      if (r.status === "queued" || r.status === "sent") cur.sent += 1;
      else if (r.status === "failed") cur.failed += 1;
      else if (r.status === "skipped") cur.skipped += 1;
      map.set(k, cur);
      return map;
    }, new Map<string, { period: string; total: number; queued: number; sent: number; failed: number; skipped: number }>()).values()
  ).sort((a, b) => b.period.localeCompare(a.period)).slice(0, 6);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Monthly Report Logs
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={() => runNow(true)} disabled={running}>
                <Play className="w-4 h-4 mr-2" /> Dry-run
              </Button>
              <Button size="sm" onClick={() => runNow(false)} disabled={running}>
                {running ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Mail className="w-4 h-4 mr-2" />}
                Gửi báo cáo ngay
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Cron tự động chạy 00:00 ngày 1 hàng tháng. Báo cáo gửi từ{" "}
            <strong>contact@haiedutech.com</strong> dưới tên hiển thị "HaiEduTech Smart Learning Platform".
          </p>

          {/* Per-period summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {periods.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-full">
                Chưa có kỳ báo cáo nào — bấm "Gửi báo cáo ngay" hoặc chờ cron job.
              </p>
            )}
            {periods.map((p) => (
              <div key={p.period} className="border border-border rounded-lg p-3 bg-secondary/30">
                <div className="text-xs text-muted-foreground">{p.period}</div>
                <div className="text-lg font-bold">{p.sent}/{p.total}</div>
                <div className="text-[11px] text-muted-foreground">
                  ✅ {p.sent} · ⚠️ {p.skipped} · ❌ {p.failed}
                </div>
              </div>
            ))}
          </div>

          <ScrollArea className="w-full">
            <div className="min-w-[900px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kỳ</TableHead>
                    <TableHead>Học viên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Giờ học</TableHead>
                    <TableHead className="text-right">Streak</TableHead>
                    <TableHead className="text-right">Stars</TableHead>
                    <TableHead className="text-right">Pet Lv.</TableHead>
                    <TableHead>Gửi lúc</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && (
                    <TableRow><TableCell colSpan={9} className="text-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin inline" />
                    </TableCell></TableRow>
                  )}
                  {!loading && rows.length === 0 && (
                    <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Chưa có log nào.
                    </TableCell></TableRow>
                  )}
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.period_start}</TableCell>
                      <TableCell>{r.student_name || "-"}</TableCell>
                      <TableCell className="font-mono text-xs">{r.recipient_email || "—"}</TableCell>
                      <TableCell>
                        <Badge className={STATUS_STYLE[r.status] || ""} variant="secondary">
                          {r.status}
                        </Badge>
                        {r.error_message && (
                          <div className="text-[10px] text-red-500 mt-1 max-w-[180px] truncate" title={r.error_message}>
                            {r.error_message}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{r.metrics?.totalHours?.toFixed?.(1) ?? "0"}h</TableCell>
                      <TableCell className="text-right">{r.metrics?.streakDays ?? 0}</TableCell>
                      <TableCell className="text-right">⭐ {r.metrics?.totalStars ?? 0}</TableCell>
                      <TableCell className="text-right">{r.metrics?.petEmoji || ""} {r.metrics?.petLevel ?? 1}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("vi-VN")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
