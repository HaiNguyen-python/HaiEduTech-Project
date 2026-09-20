/**
 * @file AssignmentReminderModal.tsx
 * @description Single daily briefing popup shown once per day for students:
 *              assignment summary (pending / done / progress), nearest
 *              deadline, a compact recap of recent activity and a contextual
 *              Vietnamese motivation line. Replaces the old pair of stacked
 *              popups (reminder + last-session recap) that blocked clicks.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Trophy, Target, Clock, Sparkles, ArrowRight, BookOpen, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDisplayName } from "@/hooks/useDisplayName";
import { useUserRole } from "@/hooks/useUserRole";
import {
  activityLabel,
  pickMotivation,
  timeAgoVi,
  type BriefingMood,
} from "@/lib/dailyBriefing";

interface NotifRow {
  id: string;
  title: string;
  route: string | null;
  is_read: boolean;
  assignment_id: string | null;
  created_at: string;
}

interface ActivityRow {
  activity_type: string;
  score: number | null;
  max_score: number | null;
  created_at: string;
}

const monthLabel = (d: Date) => `${d.getMonth() + 1}/${d.getFullYear()}`;

const DEADLINE_SOON_MS = 1000 * 60 * 60 * 48;

const AssignmentReminderModal = () => {
  const { user, isAdmin, isTeacher, loading: roleLoading } = useUserRole();
  const resolvedName = useDisplayName(user, "bạn");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<NotifRow[]>([]);
  const [monthlyDone, setMonthlyDone] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [nextDeadline, setNextDeadline] = useState<{ title: string; deadline: string; route: string | null } | null>(null);
  const [recent, setRecent] = useState<ActivityRow[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    if (roleLoading || !user) return;
    if (isAdmin || isTeacher) return;

    const today = new Date().toISOString().slice(0, 10);
    const seenKey = `daily_briefing_seen_${user.id}_${today}`;
    if (sessionStorage.getItem(seenKey)) return;
    sessionStorage.setItem(seenKey, "1");

    let cancelled = false;

    const load = async () => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Assignment data first: the popup opens as soon as this resolves so the
      // buttons are clickable immediately.
      const [notifRes, assignRes] = await Promise.all([
        supabase
          .from("assignment_notifications")
          .select("id, title, route, is_read, assignment_id, created_at")
          .eq("user_id", user.id)
          .not("assignment_id", "is", null)
          .gte("created_at", monthStart)
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("assignments")
          .select("id, title, deadline, source_ref")
          .contains("target_student_ids", [user.id])
          .not("deadline", "is", null)
          .gte("deadline", now.toISOString())
          .order("deadline", { ascending: true })
          .limit(1),
      ]);

      if (cancelled) return;

      const list = (notifRes.data as NotifRow[] | null) ?? [];
      const a = (assignRes.data as { title: string; deadline: string | null; source_ref: string | null }[] | null)?.[0];

      setPending(list.filter((n) => !n.is_read));
      setMonthlyDone(list.filter((n) => n.is_read).length);
      setMonthlyTotal(list.length);
      setNextDeadline(
        a?.deadline ? { title: a.title, deadline: a.deadline, route: a.source_ref ?? null } : null,
      );
      setOpen(true);

      const { data: acts } = await supabase
        .from("student_activity_log")
        .select("activity_type, score, max_score, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(4);

      if (cancelled) return;
      setRecent((acts as ActivityRow[] | null) ?? []);
      setRecentLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user, isAdmin, isTeacher, roleLoading]);

  const close = useCallback(() => setOpen(false), []);

  // Esc closes the popup.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const completionPct = monthlyTotal > 0 ? Math.round((monthlyDone / monthlyTotal) * 100) : 0;
  const allDone = monthlyTotal > 0 && pending.length === 0;

  const mood: BriefingMood = useMemo(() => {
    if (allDone) return "allDone";
    if (
      nextDeadline &&
      new Date(nextDeadline.deadline).getTime() - Date.now() <= DEADLINE_SOON_MS
    ) {
      return "deadline";
    }
    if (pending.length > 0) return "pending";
    return "empty";
  }, [allDone, nextDeadline, pending.length]);

  const motivation = useMemo(() => pickMotivation(mood), [mood]);

  // Small celebration when the month is fully cleared.
  useEffect(() => {
    if (!open || !allDone) return;
    confetti({
      particleCount: 60,
      spread: 70,
      startVelocity: 26,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.35 },
      colors: ["#3B82F6", "#10B981", "#F59E0B"],
      disableForReducedMotion: true,
    });
  }, [open, allDone]);

  const handleStart = () => {
    const target = pending[0]?.route ?? nextDeadline?.route ?? "/dashboard";
    close();
    navigate(target);
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Nhắc nhở hôm nay"
        >
          <motion.div
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/95 via-primary to-emerald-600 text-primary-foreground shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Đóng"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/20 transition-colors hover:bg-background/30"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-background/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-emerald-300/30 blur-2xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-80">
                <Sparkles className="h-4 w-4" />
                Nhắc nhở hôm nay
              </div>

              <h2 className="mt-2 font-sora text-2xl font-extrabold leading-tight sm:text-3xl">
                Chào {resolvedName.split(" ").slice(-1)[0] || "bạn"}, sẵn sàng bứt phá chưa?
              </h2>
              <p className="mt-1 text-sm opacity-80">
                Tổng kết bài tập của bạn trong tháng {monthLabel(new Date())}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-background/20 bg-background/15 p-3 backdrop-blur sm:p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-80 sm:text-xs">
                    <Target className="h-3.5 w-3.5" /> Đang chờ
                  </div>
                  <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{pending.length}</p>
                  <p className="text-[10px] opacity-70 sm:text-xs">bài tập</p>
                </div>
                <div className="rounded-2xl border border-background/20 bg-background/15 p-3 backdrop-blur sm:p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-80 sm:text-xs">
                    <Trophy className="h-3.5 w-3.5" /> Hoàn thành
                  </div>
                  <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{monthlyDone}</p>
                  <p className="text-[10px] opacity-70 sm:text-xs">/ {monthlyTotal} bài</p>
                </div>
                <div className="rounded-2xl border border-background/20 bg-background/15 p-3 backdrop-blur sm:p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-80 sm:text-xs">
                    <Sparkles className="h-3.5 w-3.5" /> Tiến độ
                  </div>
                  <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{completionPct}%</p>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-background/20">
                    <div
                      className="h-full bg-gradient-to-r from-amber-300 to-emerald-300"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {nextDeadline && (
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-background/20 bg-background/10 p-3 sm:p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/90 text-amber-950">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                      Hạn nộp gần nhất
                    </p>
                    <p className="truncate text-sm font-bold">{nextDeadline.title}</p>
                    <p className="text-xs opacity-80">
                      {new Date(nextDeadline.deadline).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {pending.length > 0 && (
                <div className="mt-4 rounded-2xl border border-background/20 bg-background/10 p-3 sm:p-4">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    <BookOpen className="h-3.5 w-3.5" /> Bài tập đang chờ
                  </p>
                  <ul className="mt-2 max-h-28 space-y-1.5 overflow-y-auto">
                    {pending.slice(0, 3).map((p) => (
                      <li key={p.id} className="flex items-center gap-2 truncate text-sm font-medium">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                        {p.title}
                      </li>
                    ))}
                    {pending.length > 3 && (
                      <li className="text-xs opacity-70">+ {pending.length - 3} bài khác...</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Recap of recent learning - replaces the old second popup */}
              <div className="mt-4 rounded-2xl border border-background/20 bg-background/10 p-3 sm:p-4">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-70">
                  <History className="h-3.5 w-3.5" /> Hoạt động gần đây
                </p>
                {recentLoading ? (
                  <div className="mt-2 space-y-1.5">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-background/20" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-background/20" />
                  </div>
                ) : recent.length > 0 ? (
                  <ul className="mt-2 space-y-1.5">
                    {recent.map((a, i) => (
                      <li key={`${a.activity_type}-${a.created_at}-${i}`} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-200" />
                        <span className="truncate font-medium">{activityLabel(a.activity_type)}</span>
                        {a.score != null && a.max_score ? (
                          <span className="shrink-0 text-xs opacity-80">
                            {a.score}/{a.max_score}
                          </span>
                        ) : null}
                        <span className="ml-auto shrink-0 text-xs opacity-70">{timeAgoVi(a.created_at)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm opacity-80">
                    Chưa có hoạt động nào được ghi lại. Hôm nay là ngày tuyệt vời để bắt đầu!
                  </p>
                )}
                <button
                  onClick={() => {
                    close();
                    navigate("/activity-log");
                  }}
                  className="mt-2 text-xs font-semibold underline underline-offset-2 opacity-90 transition-opacity hover:opacity-100"
                >
                  Xem toàn bộ lịch sử học
                </button>
              </div>

              <p className="mt-5 text-sm italic opacity-90">"{motivation}"</p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={handleStart}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-background px-4 py-3 font-bold text-primary shadow-lg transition-colors hover:bg-background/90"
                >
                  {pending.length > 0 ? "Bắt đầu học ngay" : "Vào trang cá nhân"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={close}
                  className="rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-sm font-semibold transition-colors hover:bg-background/20"
                >
                  Để sau
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignmentReminderModal;
