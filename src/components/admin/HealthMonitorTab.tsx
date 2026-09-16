/**
 * HealthMonitorTab — admin-only system health dashboard.
 * Shows latest run, lets staff run an on-demand check, and visualizes
 * 30-day failure history.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Activity, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import DataIntegrityCard from "@/components/admin/DataIntegrityCard";

type Status = "ok" | "fail" | "warn";
type Category = "edge" | "db" | "rpc" | "route" | "ai";

interface CheckResult {
  category: Category;
  name: string;
  status: Status;
  http_status?: number;
  latency_ms: number;
  error?: string;
  auto_recovered?: boolean;
  suggested_fix?: string;
}

interface RunRow {
  id: string;
  created_at: string;
  triggered_by: string;
  total: number;
  passed: number;
  warned: number;
  failed: number;
  auto_recovered?: number;
  duration_ms: number;
  results: CheckResult[];
}

const CATEGORY_LABEL: Record<Category, string> = {
  edge: "Edge Function",
  db: "Database",
  rpc: "RPC",
  route: "Route",
  ai: "AI Provider",
};

const HealthMonitorTab = () => {
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [latest, setLatest] = useState<RunRow | null>(null);
  const [history, setHistory] = useState<RunRow[]>([]);
  const [filterCat, setFilterCat] = useState<Category | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("health_check_runs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) {
      toast.error("Không tải được dữ liệu health check", { description: error.message });
    } else if (data) {
      const rows = (data as unknown) as RunRow[];
      setHistory(rows);
      setLatest(rows[0] ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const runNow = async () => {
    setRunning(true);
    toast.info("Đang chạy kiểm tra toàn hệ thống...", { description: "Có thể mất 15-30 giây" });
    try {
      const { error } = await supabase.functions.invoke("daily-health-check", {
        body: { triggered_by: "manual" },
      });
      if (error) throw error;
      toast.success("Hoàn tất! Đang tải kết quả mới...");
      await fetchData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error("Lỗi khi chạy kiểm tra", { description: msg });
    } finally {
      setRunning(false);
    }
  };

  const filtered = useMemo(() => {
    if (!latest) return [] as CheckResult[];
    return latest.results.filter((r) => {
      if (filterCat !== "all" && r.category !== filterCat) return false;
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      return true;
    });
  }, [latest, filterCat, filterStatus]);

  const chartData = useMemo(() => {
    return [...history].reverse().map((r) => ({
      time: new Date(r.created_at).toLocaleString("vi-VN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      failed: r.failed,
      warned: r.warned,
      passed: r.passed,
      recovered: r.auto_recovered ?? 0,
    }));
  }, [history]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Health Monitor
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tự động kiểm tra toàn bộ chức năng website lúc 06:00 và 18:00 mỗi ngày. Báo qua chuông khi có lỗi.
          </p>
        </div>
        <Button onClick={runNow} disabled={running} className="gap-2">
          {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {running ? "Đang chạy..." : "Chạy kiểm tra ngay"}
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard label="Tổng số chức năng" value={latest?.total ?? 0} icon={<Activity className="w-4 h-4" />} color="text-primary" />
        <StatCard label="Hoạt động bình thường" value={latest?.passed ?? 0} icon={<CheckCircle2 className="w-4 h-4" />} color="text-emerald-600" />
        <StatCard label="Tự phục hồi" value={latest?.auto_recovered ?? 0} icon={<RefreshCw className="w-4 h-4" />} color="text-blue-600" />
        <StatCard label="Cảnh báo" value={latest?.warned ?? 0} icon={<AlertTriangle className="w-4 h-4" />} color="text-amber-600" />
        <StatCard label="Bị lỗi" value={latest?.failed ?? 0} icon={<XCircle className="w-4 h-4" />} color="text-red-600" />
      </div>

      <DataIntegrityCard />

      {latest && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Lần kiểm tra gần nhất: <span className="font-semibold text-foreground">{new Date(latest.created_at).toLocaleString("vi-VN")}</span>
          · {latest.triggered_by === "manual" ? "Thủ công" : "Tự động"}
          · {(latest.duration_ms / 1000).toFixed(1)}s
        </div>
      )}

      {/* History chart */}
      {chartData.length > 1 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Lịch sử 30 lần gần nhất</CardTitle></CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Line type="monotone" dataKey="failed" stroke="#dc2626" strokeWidth={2} name="Lỗi" />
                  <Line type="monotone" dataKey="warned" stroke="#d97706" strokeWidth={2} name="Cảnh báo" />
                  <Line type="monotone" dataKey="recovered" stroke="#2563eb" strokeWidth={2} name="Tự phục hồi" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">Nhóm:</span>
        {(["all", "edge", "db", "rpc", "route", "ai"] as const).map((c) => (
          <Button key={c} size="sm" variant={filterCat === c ? "default" : "outline"} onClick={() => setFilterCat(c)}>
            {c === "all" ? "Tất cả" : CATEGORY_LABEL[c as Category]}
          </Button>
        ))}
        <span className="text-sm font-medium ml-2">Trạng thái:</span>
        {(["all", "ok", "warn", "fail"] as const).map((s) => (
          <Button key={s} size="sm" variant={filterStatus === s ? "default" : "outline"} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "Tất cả" : s === "ok" ? "OK" : s === "warn" ? "Cảnh báo" : "Lỗi"}
          </Button>
        ))}
      </div>

      {/* Results table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Kết quả chi tiết ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
          ) : !latest ? (
            <div className="p-8 text-center text-muted-foreground">Chưa có lần kiểm tra nào. Hãy bấm "Chạy kiểm tra ngay".</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Nhóm</th>
                    <th className="px-3 py-2 font-semibold">Tên</th>
                    <th className="px-3 py-2 font-semibold">Trạng thái</th>
                    <th className="px-3 py-2 font-semibold text-right">Độ trễ</th>
                    <th className="px-3 py-2 font-semibold">Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={`${r.category}-${r.name}-${i}`} className="border-t border-border hover:bg-muted/30">
                      <td className="px-3 py-2 text-xs text-muted-foreground">{CATEGORY_LABEL[r.category]}</td>
                      <td className="px-3 py-2 font-mono text-xs">{r.name}</td>
                      <td className="px-3 py-2">
                        {r.auto_recovered
                          ? <Badge className="bg-blue-600 hover:bg-blue-600 text-white" title="Pass sau khi retry — không cần xử lý">🔄 Tự phục hồi</Badge>
                          : <StatusBadge status={r.status} />}
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-xs">{r.latency_ms}ms</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground max-w-md">
                        <div className="truncate">
                          {r.http_status ? `HTTP ${r.http_status}` : ""}{r.error ? ` · ${r.error}` : ""}
                        </div>
                        {r.suggested_fix && (
                          <div className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 truncate">💡 {r.suggested_fix}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) => (
  <Card>
    <CardContent className="p-4">
      <div className={`flex items-center gap-2 text-xs font-medium ${color}`}>{icon}{label}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }: { status: Status }) => {
  if (status === "ok") return <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">OK</Badge>;
  if (status === "warn") return <Badge className="bg-amber-500 hover:bg-amber-500 text-white">Cảnh báo</Badge>;
  return <Badge className="bg-red-600 hover:bg-red-600 text-white">Lỗi</Badge>;
};

export default HealthMonitorTab;
