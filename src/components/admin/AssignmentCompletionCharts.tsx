/**
 * Completion analytics for Assignment Management: per-assignment completion,
 * per-student ranking and an overall done / pending / overdue breakdown.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList,
} from "recharts";
import type { AssignmentRow } from "@/lib/assignmentMetrics";
import { buildStudentCompletion } from "@/lib/assignmentMetrics";

const DONE = "#10b981";
const PENDING = "#f59e0b";
const OVERDUE = "#f43f5e";
const BRAND = "#3b82f6";

interface Props {
  rows: AssignmentRow[];
  studentName: (id: string) => string;
}

const AssignmentCompletionCharts = ({ rows, studentName }: Props) => {
  const byAssignment = useMemo(
    () => rows.slice(0, 12).map((r) => ({
      name: r.title.length > 22 ? `${r.title.slice(0, 21)}…` : r.title,
      pct: Math.round(r.progressPct),
    })).reverse(),
    [rows],
  );

  const byStudent = useMemo(
    () => buildStudentCompletion(rows)
      .sort((a, b) => b.done - a.done || b.assigned - a.assigned)
      .slice(0, 10)
      .map((s) => ({
        name: studentName(s.studentId),
        done: s.done,
        remaining: Math.max(0, s.assigned - s.done),
      })),
    [rows, studentName],
  );

  const totals = useMemo(() => {
    let done = 0, pending = 0, overdue = 0;
    const now = Date.now();
    rows.forEach((r) => {
      const late = r.deadline ? new Date(r.deadline).getTime() < now : false;
      r.target_student_ids.forEach((sid) => {
        const sub = r.submissions.find((s) => s.student_id === sid);
        if (sub?.status === "completed") done += 1;
        else if (late) overdue += 1;
        else pending += 1;
      });
    });
    return [
      { name: "Đã làm", value: done, color: DONE },
      { name: "Chưa làm", value: pending, color: PENDING },
      { name: "Quá hạn", value: overdue, color: OVERDUE },
    ];
  }, [rows]);

  const hasData = rows.length > 0 && totals.some((t) => t.value > 0);

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 sm:p-5 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Thống kê hoàn thành</h2>
        <p className="text-sm text-slate-500">Cập nhật ngay khi học viên tick bài trong sổ tay.</p>
      </div>

      {!hasData ? (
        <p className="py-8 text-center text-sm text-slate-400">Chưa có dữ liệu để vẽ biểu đồ.</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Tỉ lệ hoàn thành theo bài</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byAssignment} layout="vertical" margin={{ left: 8, right: 44 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Hoàn thành"]} />
                  <Bar dataKey="pct" fill={BRAND} radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="pct" position="right" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fill: "#475569" }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Học viên làm nhiều nhất</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byStudent} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="done" name="Đã làm" stackId="a" fill={DONE} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="remaining" name="Còn lại" stackId="a" fill={PENDING} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Tổng quan bài giao</p>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={totals} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={2}>
                    {totals.map((t) => <Cell key={t.name} fill={t.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentCompletionCharts;
