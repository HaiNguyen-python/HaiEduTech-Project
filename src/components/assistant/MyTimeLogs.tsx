import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface Row {
  id: string;
  clock_in: string;
  clock_out: string | null;
  duration_hours: number | null;
  calculated_salary: number | null;
  status: string;
}

const fmtVnd = (n: number | null) =>
  n == null ? "—" : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

interface Props {
  userId: string;
  refreshKey?: number;
}

const MyTimeLogs = ({ userId, refreshKey }: Props) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // Current month range
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const { data } = await supabase
        .from("time_logs")
        .select("id, clock_in, clock_out, duration_hours, calculated_salary, status")
        .eq("user_id", userId)
        .gte("clock_in", monthStart.toISOString())
        .order("clock_in", { ascending: false });
      setRows((data as Row[]) || []);
      setLoading(false);
    };
    load();
  }, [userId, refreshKey]);

  const totalHours = rows.reduce((s, r) => s + (Number(r.duration_hours) || 0), 0);
  const totalSalary = rows.reduce((s, r) => s + (Number(r.calculated_salary) || 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span>Lịch sử chấm công tháng này</span>
          <span className="text-sm font-normal text-muted-foreground">
            Tổng: <b className="text-foreground">{totalHours.toFixed(2)}h</b> · <b className="text-emerald-600">{fmtVnd(totalSalary)}</b>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Chưa có phiên làm việc nào trong tháng.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Bắt đầu</TableHead>
                  <TableHead>Kết thúc</TableHead>
                  <TableHead className="text-right">Số giờ</TableHead>
                  <TableHead className="text-right">Lương</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const d = new Date(r.clock_in);
                  return (
                    <TableRow key={r.id}>
                      <TableCell>{d.toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell className="font-mono text-xs">{d.toLocaleTimeString("vi-VN")}</TableCell>
                      <TableCell className="font-mono text-xs">{r.clock_out ? new Date(r.clock_out).toLocaleTimeString("vi-VN") : "—"}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.duration_hours != null ? Number(r.duration_hours).toFixed(2) : "—"}</TableCell>
                      <TableCell className="text-right tabular-nums text-emerald-600 font-medium">{fmtVnd(r.calculated_salary)}</TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "active" ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                          {r.status === "active" ? "Đang làm" : "Hoàn tất"}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyTimeLogs;
