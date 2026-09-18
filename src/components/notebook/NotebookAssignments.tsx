/**
 * Assignment checklist inside the floating notebook. Students tick a task when
 * they finish it; the tick writes straight to the shared progress table so the
 * teacher dashboard updates live.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ExternalLink, CalendarClock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import NotebookTeacherAssignments from "@/components/notebook/NotebookTeacherAssignments";
import { SUBJECT_LABELS } from "@/lib/assignmentMetrics";
import {
  fetchMyAssignments,
  setAssignmentDone,
  formatDeadlineShort,
  type StudentAssignmentItem,
} from "@/lib/assignmentTracking";

interface Props {
  userId: string | null;
  onCountChange?: (pending: number) => void;
  onNavigate?: () => void;
}

const NotebookAssignments = ({ userId, onCountChange, onNavigate }: Props) => {
  const { toast } = useToast();
  const [items, setItems] = useState<StudentAssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!userId) { setItems([]); setLoading(false); return; }
    setLoading(true);
    try {
      const rows = await fetchMyAssignments(userId);
      setItems(rows);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được bài tập");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  // Report the pending count upward from one place so the badge cannot drift.
  useEffect(() => {
    onCountChange?.(items.filter((i) => !i.done).length);
  }, [items, onCountChange]);

  // New tasks and teacher edits appear without a reload.
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`notebook_assignments_${userId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "assignments" }, () => load())
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "student_submissions", filter: `student_id=eq.${userId}` },
        () => load(),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [userId, load]);

  const toggle = async (item: StudentAssignmentItem) => {
    if (!userId || savingId) return;
    const next = !item.done;
    setSavingId(item.assignmentId);
    // Optimistic tick, rolled back on failure so the box never lies.
    setItems((cur) => cur.map((i) => i.assignmentId === item.assignmentId
      ? { ...i, done: next, overdue: next ? false : i.overdue, submittedAt: next ? new Date().toISOString() : null }
      : i));
    try {
      await setAssignmentDone(userId, item.assignmentId, next);
      if (next) toast({ title: "Đã đánh dấu hoàn thành", description: item.title });
    } catch (e) {
      setItems((cur) => cur.map((i) => i.assignmentId === item.assignmentId ? item : i));
      toast({
        title: "Chưa lưu được",
        description: e instanceof Error ? e.message : "Vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setSavingId(null);
    }
  };

  if (!userId) {
    return <p className="p-4 text-center text-xs text-muted-foreground">Đăng nhập để xem bài tập thầy giao nhé.</p>;
  }
  if (loading) {
    return <div className="p-6 grid place-items-center text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /></div>;
  }
  if (error) {
    return (
      <div className="p-4 text-center space-y-2">
        <p className="text-xs text-destructive">{error}</p>
        <button onClick={load} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Tải lại</button>
      </div>
    );
  }
  if (items.length === 0) {
    return <p className="p-4 text-center text-xs text-muted-foreground">Hiện chưa có bài tập nào. Cứ học tiếp nhé!</p>;
  }

  const doneCount = items.filter((i) => i.done).length;
  const pct = Math.round((doneCount / items.length) * 100);

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-border bg-muted/40 px-3 py-2">
        <div className="flex items-center justify-between text-xs font-medium text-foreground">
          <span>Đã làm {doneCount}/{items.length} bài</span>
          <span className="text-primary">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item.assignmentId}
            className={`rounded-md border px-3 py-2 transition-colors ${
              item.done ? "border-emerald-200 bg-emerald-50/60" : item.overdue ? "border-rose-200 bg-rose-50/50" : "border-border bg-background"
            }`}
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={item.done}
                disabled={savingId === item.assignmentId}
                onChange={() => toggle(item)}
                aria-label={`Đánh dấu đã làm: ${item.title}`}
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600 cursor-pointer disabled:opacity-50"
              />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium break-words ${item.done ? "text-emerald-800 line-through" : "text-foreground"}`}>
                  {item.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="rounded-full border border-border px-1.5 py-0.5">
                    {SUBJECT_LABELS[item.subject] ?? item.subject}{item.level ? ` · ${item.level}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock size={11} /> {formatDeadlineShort(item.deadline)}
                  </span>
                  {item.overdue && (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-medium">
                      <AlertTriangle size={11} /> Quá hạn
                    </span>
                  )}
                  {item.done && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 size={11} /> Đã làm
                    </span>
                  )}
                  {item.route && (
                    <Link
                      to={item.route}
                      onClick={onNavigate}
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink size={11} /> Mở bài học
                    </Link>
                  )}
                </div>
              </div>
              {savingId === item.assignmentId && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotebookAssignments;
