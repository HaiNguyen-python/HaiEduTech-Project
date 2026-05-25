// Attendance Analytics Tab — visualizes daily Present/Absent check-ins per student.
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, CalendarX, Users, TrendingUp } from "lucide-react";
import { fetchAllRows } from "@/lib/adminData";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface AttendanceRow {
  id: string;
  user_id: string;
  lesson_id: string;
  lesson_title: string | null;
  lesson_type: string | null;
  status: "present" | "absent";
  attendance_date: string;
  created_at: string;
}

const AttendanceAnalyticsTab = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await fetchAllRows<AttendanceRow>((from, to) =>
        supabase
          .from("lesson_attendance")
          .select("*")
          .order("attendance_date", { ascending: false })
          .range(from, to)
      );
      setRows(list);

      const ids = Array.from(new Set(list.map((r) => r.user_id)));
      if (ids.length > 0) {
        const { data: profs } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", ids);
        const map: Record<string, string> = {};
        ((profs as Array<{ id: string; full_name: string | null }> | null) || []).forEach((p) => {
          map[p.id] = p.full_name || p.id.slice(0, 8);
        });
        setNames(map);
      }
      setLoading(false);
    })();
  }, []);

  // Aggregate per student
  const perStudent = useMemo(() => {
    const map = new Map<string, { present: number; absent: number; lastDate: string }>();
    for (const r of rows) {
      const cur = map.get(r.user_id) || { present: 0, absent: 0, lastDate: r.attendance_date };
      if (r.status === "present") cur.present += 1;
      else cur.absent += 1;
      if (r.attendance_date > cur.lastDate) cur.lastDate = r.attendance_date;
      map.set(r.user_id, cur);
    }
    return Array.from(map.entries())
      .map(([uid, v]) => ({
        userId: uid,
        name: names[uid] || uid.slice(0, 8),
        present: v.present,
        absent: v.absent,
        total: v.present + v.absent,
        rate: v.present + v.absent === 0 ? 0 : Math.round((v.present / (v.present + v.absent)) * 100),
        lastDate: v.lastDate,
      }))
      .sort((a, b) => b.total - a.total);
  }, [rows, names]);

  // Daily trend (last 14 days)
  const dailyTrend = useMemo(() => {
    const days: Record<string, { date: string; present: number; absent: number }> = {};
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = { date: key.slice(5), present: 0, absent: 0 };
    }
    for (const r of rows) {
      const k = r.attendance_date;
      if (days[k]) {
        if (r.status === "present") days[k].present += 1;
        else days[k].absent += 1;
      }
    }
    return Object.values(days);
  }, [rows]);

  const totals = useMemo(
    () => ({
      present: rows.filter((r) => r.status === "present").length,
      absent: rows.filter((r) => r.status === "absent").length,
      students: new Set(rows.map((r) => r.user_id)).size,
    }),
    [rows],
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/15 text-green-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">{t("Tổng lượt có mặt", "Total Present")}</p>
              <p className="text-2xl font-bold text-foreground">{totals.present}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/15 text-orange-600">
              <CalendarX className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">{t("Tổng lượt vắng", "Total Absent")}</p>
              <p className="text-2xl font-bold text-foreground">{totals.absent}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/15 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">{t("Số học sinh điểm danh", "Active Students")}</p>
              <p className="text-2xl font-bold text-foreground">{totals.students}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily trend chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4" />
            {t("Điểm danh 14 ngày gần nhất", "Attendance — last 14 days")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {t("Chưa có dữ liệu điểm danh.", "No attendance data yet.")}
            </p>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="hsl(142 76% 45%)" name={t("Có mặt", "Present")} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="absent" stackId="a" fill="hsl(25 95% 55%)" name={t("Vắng", "Absent")} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Per-student table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4" />
            {t("Mức độ đi học của từng học sinh", "Per-student attendance")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {perStudent.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {t("Chưa có học sinh nào điểm danh.", "No students have checked in yet.")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Học sinh", "Student")}</TableHead>
                    <TableHead className="text-right">{t("Có mặt", "Present")}</TableHead>
                    <TableHead className="text-right">{t("Vắng", "Absent")}</TableHead>
                    <TableHead className="text-right">{t("Tổng", "Total")}</TableHead>
                    <TableHead className="text-right">{t("Tỉ lệ đi học", "Rate")}</TableHead>
                    <TableHead>{t("Lần cuối", "Last")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perStudent.map((s) => (
                    <TableRow key={s.userId}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">{s.present}</TableCell>
                      <TableCell className="text-right text-orange-600 font-semibold">{s.absent}</TableCell>
                      <TableCell className="text-right">{s.total}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            s.rate >= 80
                              ? "border-green-500/40 text-green-600"
                              : s.rate >= 50
                                ? "border-amber-500/40 text-amber-600"
                                : "border-red-500/40 text-red-600"
                          }
                        >
                          {s.rate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{s.lastDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceAnalyticsTab;
