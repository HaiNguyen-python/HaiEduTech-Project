/**
 * @file RLInterventionsTab.tsx
 * @description Admin tab for the RL Intervention Dispatcher. Provides
 *   manual dry-run / force-run buttons, shows the last 30 days of
 *   interventions with reward outcomes, and visualizes the agent's
 *   effectiveness with Recharts.
 */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, PlayCircle, FlaskConical, Bell, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

interface InterventionRow {
  id: string;
  student_id: string;
  action: string;
  status: string;
  reward: number | null;
  state: any;
  action_details: any;
  created_at: string;
  updated_at: string;
}

const STATUS_LABEL: Record<string, { vi: string; cls: string }> = {
  pending: { vi: "Đang chờ phản hồi", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  rewarded: { vi: "Có cải thiện ✓", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  confirmed: { vi: "Duy trì phong độ", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  escalated: { vi: "Cần can thiệp trực tiếp", cls: "bg-red-500/15 text-red-700 dark:text-red-300" },
  closed: { vi: "Đã đóng", cls: "bg-muted text-muted-foreground" },
  expired: { vi: "Hết hạn", cls: "bg-muted text-muted-foreground" },
};

const ACTION_LABEL: Record<string, string> = {
  top_recognition: "🌟 Khen thưởng",
  struggle_intervention: "💙 Can thiệp",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default function RLInterventionsTab() {
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState<"idle" | "dry" | "real">("idle");
  const [rows, setRows] = useState<InterventionRow[]>([]);
  const [lastResult, setLastResult] = useState<any>(null);

  const fetchRows = async () => {
    setLoading(true);
    const since = new Date(Date.now() - 30 * 86400_000).toISOString();
    const { data, error } = await supabase
      .from("rl_interventions")
      .select("id, student_id, action, status, reward, state, action_details, created_at, updated_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) toast.error("Không tải được dữ liệu can thiệp");
    setRows((data as InterventionRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchRows(); }, []);

  const runDispatcher = async (dryRun: boolean) => {
    setRunning(dryRun ? "dry" : "real");
    try {
      const { data, error } = await supabase.functions.invoke("rl-intervention-dispatcher", {
        body: { dryRun, force: !dryRun },
      });
      if (error) throw error;
      setLastResult(data);
      if (dryRun) toast.success(`Dry-run: ${data?.notified ?? 0} thông báo sẽ được gửi`);
      else toast.success(`Đã gửi ${data?.notified ?? 0} thông báo qua chuông`);
      await fetchRows();
    } catch (e: any) {
      toast.error(e?.message || "Lỗi khi chạy dispatcher");
    } finally {
      setRunning("idle");
    }
  };

  // --- Aggregates for charts ---
  const dailyCounts = useMemo(() => {
    const map = new Map<string, { date: string; top: number; struggle: number }>();
    for (const r of rows) {
      const d = new Date(r.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
      const ent = map.get(d) ?? { date: d, top: 0, struggle: 0 };
      if (r.action === "top_recognition") ent.top += 1;
      else if (r.action === "struggle_intervention") ent.struggle += 1;
      map.set(d, ent);
    }
    return Array.from(map.values()).reverse().slice(-14);
  }, [rows]);

  const outcomeSplit = useMemo(() => {
    const buckets: Record<string, number> = {};
    for (const r of rows) buckets[r.status] = (buckets[r.status] ?? 0) + 1;
    const colors: Record<string, string> = {
      rewarded: "hsl(160, 70%, 45%)",
      confirmed: "hsl(160, 70%, 35%)",
      pending: "hsl(38, 92%, 50%)",
      escalated: "hsl(0, 84%, 60%)",
      closed: "hsl(220, 10%, 60%)",
      expired: "hsl(220, 10%, 50%)",
    };
    return Object.entries(buckets).map(([k, v]) => ({
      name: STATUS_LABEL[k]?.vi || k,
      value: v,
      color: colors[k] || "hsl(220, 10%, 50%)",
    }));
  }, [rows]);

  const effectiveness = useMemo(() => {
    const struggle = rows.filter((r) => r.action === "struggle_intervention" && r.status !== "pending");
    if (struggle.length === 0) return 0;
    const wins = struggle.filter((r) => r.status === "rewarded").length;
    return Math.round((wins / struggle.length) * 100);
  }, [rows]);

  return (
    <div className="space-y-6">
      {/* Header + actions */}
      <Card className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" /> RL Intervention Dispatcher
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Tự động rà soát dữ liệu học tập 14 ngày gần nhất, khen thưởng học viên xuất sắc và gửi
              báo cáo + động viên cho học viên cần can thiệp. Lịch chạy tự động: <strong>Thứ 2 & Thứ 5, 19:00 (giờ VN)</strong>.
              Dedup 72h để tránh trùng lặp thông báo.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => runDispatcher(true)}
              disabled={running !== "idle"}
            >
              {running === "dry" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FlaskConical className="w-4 h-4 mr-2" />}
              Dry-run (xem trước)
            </Button>
            <Button
              onClick={() => runDispatcher(false)}
              disabled={running !== "idle"}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
            >
              {running === "real" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
              Chạy quét & gửi chuông ngay
            </Button>
          </div>
        </div>

        {lastResult && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <Stat label="Quét" value={lastResult.scanned} />
            <Stat label="Khen thưởng" value={lastResult.top} tone="emerald" />
            <Stat label="Cần can thiệp" value={lastResult.struggle} tone="red" />
            <Stat label="Đã gửi chuông" value={lastResult.notified} tone="blue" />
            <Stat label="Bỏ qua (dedup)" value={lastResult.skipped_dedup} />
          </div>
        )}
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Can thiệp 14 ngày gần nhất
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyCounts}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="top" name="Khen thưởng" fill="hsl(160, 70%, 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="struggle" name="Can thiệp" fill="hsl(0, 75%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Hiệu quả RL — {effectiveness}% cải thiện
          </h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={outcomeSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
                  {outcomeSplit.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Lịch sử can thiệp (30 ngày · {rows.length} bản ghi)</h3>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>Học viên</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Lý do</TableHead>
                <TableHead className="text-right">Điểm TB</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Phần thưởng</TableHead>
                <TableHead>Thời điểm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    Chưa có can thiệp nào. Bấm "Chạy quét" để bắt đầu.
                  </TableCell>
                </TableRow>
              )}
              {rows.map((r) => {
                const status = STATUS_LABEL[r.status] ?? { vi: r.status, cls: "" };
                const isEscalated = r.status === "escalated";
                return (
                  <TableRow key={r.id} className={isEscalated ? "bg-red-50/50 dark:bg-red-950/20" : ""}>
                    <TableCell className="font-medium">
                      {isEscalated && <AlertTriangle className="inline w-3.5 h-3.5 mr-1 text-red-500" />}
                      {r.state?.full_name || r.student_id.slice(0, 8)}
                    </TableCell>
                    <TableCell>{ACTION_LABEL[r.action] || r.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[260px] truncate" title={r.action_details?.reason_vi}>
                      {r.action_details?.reason_vi || "—"}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.state?.avg_score != null ? `${Math.round(Number(r.state.avg_score) * 100)}%` : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.cls}>{status.vi}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {r.reward != null ? (Number(r.reward) > 0 ? `+${r.reward}` : r.reward) : "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{fmtDate(r.created_at)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | undefined; tone?: "emerald" | "red" | "blue" }) {
  const toneCls = tone === "emerald"
    ? "text-emerald-600 dark:text-emerald-400"
    : tone === "red"
    ? "text-red-600 dark:text-red-400"
    : tone === "blue"
    ? "text-blue-600 dark:text-blue-400"
    : "text-foreground";
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-xl font-bold tabular-nums ${toneCls}`}>{value ?? 0}</div>
    </div>
  );
}
