/**
 * @file AssignmentReminderModal.tsx
 * @description Motivational assignment summary that pops up once per login
 * session for students. Inspired by gamified leaderboard cards: shows
 * pending count, completed-this-month count, and the next upcoming deadline,
 * with a CTA that deep-links to the first pending lesson.
 */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Target, Clock, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";

interface NotifRow {
  id: string;
  title: string;
  body: string;
  route: string | null;
  is_read: boolean;
  created_at: string;
}

interface AssignmentRow {
  id: string;
  title: string;
  subject: string;
  deadline: string | null;
  source_ref: string | null;
  assigned_at: string;
  target_student_ids: string[];
}

const monthLabel = (d: Date) => `${d.getMonth() + 1}/${d.getFullYear()}`;

const motivationLines = [
  "Mỗi bài hôm nay là một bước gần hơn tới mục tiêu của bạn!",
  "Học đều mỗi ngày — kết quả sẽ tự đến.",
  "Thầy Hải tin bạn làm được. Cùng chinh phục nhé!",
  "Kỷ luật hôm nay, tự do ngày mai. Bắt đầu nào!",
];

const AssignmentReminderModal = () => {
  const { user, role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<NotifRow[]>([]);
  const [monthlyDone, setMonthlyDone] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [nextDeadline, setNextDeadline] = useState<{ title: string; deadline: string; route: string | null } | null>(null);

  // Pick a stable motivation line per day
  const motivation = useMemo(() => {
    const idx = new Date().getDate() % motivationLines.length;
    return motivationLines[idx];
  }, []);

  useEffect(() => {
    if (roleLoading || !user) return;
    // Skip for admin/teacher
    if (role === "admin" || role === "teacher") return;

    const today = new Date().toISOString().slice(0, 10);
    const seenKey = `assignment_reminder_seen_${user.id}_${today}`;
    if (sessionStorage.getItem(seenKey)) return;

    const load = async () => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // 1) All notifications this month for user
      const { data: notifs } = await supabase
        .from("assignment_notifications")
        .select("id, title, body, route, is_read, created_at")
        .eq("user_id", user.id)
        .gte("created_at", monthStart)
        .order("created_at", { ascending: false })
        .limit(50);

      const list = (notifs as NotifRow[]) ?? [];
      const pendingList = list.filter((n) => !n.is_read);
      const doneList = list.filter((n) => n.is_read);

      // 2) Upcoming deadline among assignments targeting user
      const { data: assigns } = await supabase
        .from("assignments")
        .select("id, title, subject, deadline, source_ref, assigned_at, target_student_ids")
        .contains("target_student_ids", [user.id])
        .not("deadline", "is", null)
        .gte("deadline", now.toISOString())
        .order("deadline", { ascending: true })
        .limit(1);

      const a = (assigns as AssignmentRow[] | null)?.[0];
      setNextDeadline(
        a
          ? { title: a.title, deadline: a.deadline!, route: a.source_ref ?? null }
          : null,
      );

      setPending(pendingList);
      setMonthlyDone(doneList.length);
      setMonthlyTotal(list.length);

      // Only show when there's something meaningful
      if (list.length > 0) {
        setOpen(true);
        sessionStorage.setItem(seenKey, "1");
      }
    };

    load();
  }, [user, role, roleLoading]);

  const close = () => setOpen(false);

  const handleStart = () => {
    const target = pending[0]?.route ?? nextDeadline?.route ?? "/dashboard";
    close();
    navigate(target);
  };

  if (!user) return null;

  const completionPct = monthlyTotal > 0 ? Math.round((monthlyDone / monthlyTotal) * 100) : 0;
  const displayName =
    (user.user_metadata?.full_name as string | undefined)?.split(" ").slice(-1)[0] ||
    user.email?.split("@")[0] ||
    "bạn";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/95 via-primary to-emerald-600 text-white shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Đóng"
              className="absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative sparkles */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-emerald-300/30 blur-2xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 font-semibold">
                <Sparkles className="w-4 h-4" />
                Nhắc nhở hôm nay
              </div>

              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                Chào {displayName}, sẵn sàng bứt phá chưa?
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Tổng kết bài tập của bạn trong tháng {monthLabel(new Date())}
              </p>

              {/* Stats grid */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/15 backdrop-blur p-3 sm:p-4 border border-white/20">
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5" /> Đang chờ
                  </div>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold">{pending.length}</p>
                  <p className="text-[10px] sm:text-xs text-white/70">bài tập</p>
                </div>
                <div className="rounded-2xl bg-white/15 backdrop-blur p-3 sm:p-4 border border-white/20">
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" /> Hoàn thành
                  </div>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold">{monthlyDone}</p>
                  <p className="text-[10px] sm:text-xs text-white/70">/ {monthlyTotal} bài</p>
                </div>
                <div className="rounded-2xl bg-white/15 backdrop-blur p-3 sm:p-4 border border-white/20">
                  <div className="flex items-center gap-1.5 text-white/80 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Tiến độ
                  </div>
                  <p className="mt-1 text-2xl sm:text-3xl font-extrabold">{completionPct}%</p>
                  <div className="mt-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-300 to-emerald-300"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Next deadline */}
              {nextDeadline && (
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/10 border border-white/20 p-3 sm:p-4">
                  <div className="grid place-items-center w-10 h-10 rounded-xl bg-amber-400/90 text-amber-950 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                      Hạn nộp gần nhất
                    </p>
                    <p className="text-sm font-bold truncate">{nextDeadline.title}</p>
                    <p className="text-xs text-white/80">
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

              {/* Pending preview */}
              {pending.length > 0 && (
                <div className="mt-4 rounded-2xl bg-white/10 border border-white/20 p-3 sm:p-4">
                  <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Bài tập đang chờ
                  </p>
                  <ul className="mt-2 space-y-1.5 max-h-28 overflow-y-auto">
                    {pending.slice(0, 3).map((p) => (
                      <li key={p.id} className="text-sm font-medium truncate flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                        {p.title}
                      </li>
                    ))}
                    {pending.length > 3 && (
                      <li className="text-xs text-white/70">+ {pending.length - 3} bài khác…</li>
                    )}
                  </ul>
                </div>
              )}

              <p className="mt-5 text-sm italic text-white/90">"{motivation}"</p>

              {/* CTAs */}
              <div className="mt-5 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleStart}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary font-bold py-3 px-4 hover:bg-white/90 transition-colors shadow-lg"
                >
                  {pending.length > 0 ? "Bắt đầu học ngay" : "Vào Dashboard"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={close}
                  className="rounded-xl bg-white/10 hover:bg-white/20 transition-colors px-4 py-3 text-sm font-semibold border border-white/20"
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
