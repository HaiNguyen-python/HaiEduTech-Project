import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Wallet } from "lucide-react";

interface Aggregated {
  user_id: string;
  name: string;
  entries: number;
  totalHours: number;
  totalSalary: number;
}

const fmtVnd = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

const PayrollSummary = () => {
  const [rows, setRows] = useState<Aggregated[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [{ data: logs }, { data: profiles }, { data: assistantRoles }] = await Promise.all([
        supabase
          .from("time_logs")
          .select("user_id, duration_hours, calculated_salary, status")
          .eq("status", "completed")
          .gte("clock_in", monthStart.toISOString()),
        supabase.from("profiles").select("id, full_name"),
        supabase.from("user_roles").select("user_id").eq("role", "assistant"),
      ]);

      const nameMap = new Map<string, string>();
      for (const p of profiles || []) nameMap.set((p as any).id, (p as any).full_name || "Cộng tác viên");

      const assistantIds = new Set((assistantRoles || []).map((r: any) => r.user_id));

      const agg = new Map<string, Aggregated>();
      // Seed all assistants so 0-hour ones still show
      for (const uid of assistantIds) {
        agg.set(uid, { user_id: uid, name: nameMap.get(uid) || "Cộng tác viên", entries: 0, totalHours: 0, totalSalary: 0 });
      }
      for (const l of logs || []) {
        const uid = (l as any).user_id;
        const cur = agg.get(uid) || { user_id: uid, name: nameMap.get(uid) || "Cộng tác viên", entries: 0, totalHours: 0, totalSalary: 0 };
        cur.entries += 1;
        cur.totalHours += Number((l as any).duration_hours) || 0;
        cur.totalSalary += Number((l as any).calculated_salary) || 0;
        agg.set(uid, cur);
      }

      const arr = Array.from(agg.values()).sort((a, b) => b.totalSalary - a.totalSalary);
      setRows(arr);
      setLoading(false);
    };
    load();
  }, []);

  const grandHours = rows.reduce((s, r) => s + r.totalHours, 0);
  const grandSalary = rows.reduce((s, r) => s + r.totalSalary, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-600" />
          Tổng kết lương tháng này (50.000 VND/giờ)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">Chưa có cộng tác viên nào.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cộng tác viên</TableHead>
                    <TableHead className="text-right">Số phiên</TableHead>
                    <TableHead className="text-right">Tổng giờ</TableHead>
                    <TableHead className="text-right">Lương tháng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.user_id}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.entries}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.totalHours.toFixed(2)}</TableCell>
                      <TableCell className="text-right tabular-nums text-emerald-600 font-semibold">{fmtVnd(r.totalSalary)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm border-t pt-3">
              <span className="text-muted-foreground">Tổng cộng</span>
              <span className="font-bold">
                {grandHours.toFixed(2)}h · <span className="text-emerald-600">{fmtVnd(grandSalary)}</span>
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PayrollSummary;
