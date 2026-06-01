/**
 * MonthlyTopStudents
 * Top 3 học sinh tiêu biểu của tháng – tuyên dương từ thầy Hải.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Trophy, Sparkles, BookOpen, Clock, Flame, Crown, CalendarCheck, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";

interface TopStudent {
  rank: number;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  mastered_words: number;
  activities: number;
  online_minutes: number;
  login_days: number;
  total_score: number;
}

const MEDALS = ["🥇", "🥈", "🥉"];
const ORDER_DESKTOP = [1, 0, 2]; // hạng 2 trái, hạng 1 giữa, hạng 3 phải

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

const MonthlyTopStudents = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc("get_monthly_top_students", { _limit: 3 });
      if (cancelled) return;
      if (!error && Array.isArray(data)) {
        setStudents(data as TopStudent[]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const now = new Date();
  // Display the previous (already completed) month's standings throughout the
  // current month. Only switch to the current month on its very last day —
  // mirrors the SQL window in get_monthly_top_students.
  const totalDays = daysInMonth(now);
  const isLastDayOfMonth = now.getDate() === totalDays;
  const displayedMonthDate = isLastDayOfMonth
    ? now
    : new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const monthLabel = `${displayedMonthDate.getMonth() + 1}/${displayedMonthDate.getFullYear()}`;
  const displayedTotalDays = daysInMonth(displayedMonthDate);
  const lastDayLabel = `${totalDays}/${now.getMonth() + 1}/${now.getFullYear()}`;


  return (
    <section className="py-14 sm:py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-amber-300/20 via-primary/10 to-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-10 left-6 text-amber-300/30 text-5xl select-none">✦</div>
        <div className="absolute top-32 right-10 text-primary/20 text-4xl select-none">✧</div>
        <div className="absolute bottom-20 left-20 text-emerald-400/20 text-3xl select-none">✦</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-primary/10 to-emerald-100 dark:from-amber-950/40 dark:via-primary/15 dark:to-emerald-950/40 border border-amber-300/50 dark:border-amber-700/40 shadow-sm mb-4"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-amber-600 via-primary to-emerald-600 bg-clip-text text-transparent">
              {t(`Tuyên dương tháng ${monthLabel}`, `Honor Roll • ${monthLabel}`)}
            </span>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="inline-block mr-2">🏆</span>
            <span className="bg-gradient-to-r from-amber-500 via-primary to-emerald-500 bg-clip-text text-transparent">
              {t("Học sinh tiêu biểu của tháng", "Student of the Month")}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t(
              "Thầy Hải tự hào tuyên dương 3 học sinh xuất sắc nhất tháng này - vì sự chuyên cần, kiên trì và tiến bộ vượt bậc.",
              "Mr. Hai proudly honors the top 3 students this month - for their attendance, perseverance, and outstanding progress."
            )}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full" />
          </div>
        ) : students.length === 0 ? (
          <div className="text-center max-w-md mx-auto p-8 rounded-2xl border border-dashed border-border bg-card/50">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="text-foreground font-semibold mb-1">
              {t("Hãy là người đầu tiên!", "Be the first one!")}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "Bắt đầu học mỗi ngày để có tên trên Bảng Tuyên Dương tháng tới.",
                "Start learning daily to appear on next month's Honor Roll."
              )}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              {t("Vào Dashboard", "Go to Dashboard")}
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop podium */}
            <div className="hidden md:grid grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              {ORDER_DESKTOP.map((idx) => {
                const s = students[idx];
                if (!s) return <div key={idx} />;
                return <PodiumCard key={s.user_id} student={s} totalDays={displayedTotalDays} t={t} />;
              })}
            </div>

            {/* Mobile stack */}
            <div className="md:hidden flex flex-col gap-4 max-w-md mx-auto">
              {students.map((s) => (
                <PodiumCard key={s.user_id} student={s} totalDays={displayedTotalDays} t={t} />
              ))}
            </div>

            <div className="mt-10 max-w-2xl mx-auto flex flex-col items-center gap-2 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-border backdrop-blur-sm">
                <CalendarClock className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {t(
                    `Bảng xếp hạng được chốt và cập nhật vào ngày cuối tháng (${lastDayLabel}).`,
                    `Rankings are finalized and updated on the last day of each month (${lastDayLabel}).`
                  )}
                </span>
              </div>
              <p className="text-xs text-muted-foreground italic">
                {t(
                  "Tiêu chí: chuyên cần (số ngày học), từ vựng đã thuộc, bài học hoàn thành và thời gian học.",
                  "Criteria: attendance (study days), words mastered, lessons completed, and study time."
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const PodiumCard = ({
  student,
  totalDays,
  t,
}: {
  student: TopStudent;
  totalDays: number;
  t: (vi: string, en: string) => string;
}) => {
  const medal = MEDALS[student.rank - 1] || "🏅";
  const isFirst = student.rank === 1;
  const isSecond = student.rank === 2;

  const cardGradient = isFirst
    ? "bg-gradient-to-b from-amber-50 via-amber-50/40 to-card dark:from-amber-950/40 dark:via-amber-950/10 dark:to-card border-amber-300/60 dark:border-amber-700/40 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.45)]"
    : isSecond
      ? "bg-gradient-to-b from-slate-50 to-card dark:from-slate-900/40 dark:to-card border-slate-300/60 dark:border-slate-700/40"
      : "bg-gradient-to-b from-orange-50 to-card dark:from-orange-950/30 dark:to-card border-orange-300/50 dark:border-orange-800/40";

  const ringClass = isFirst
    ? "ring-4 ring-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.55)]"
    : isSecond
      ? "ring-4 ring-slate-300 dark:ring-slate-400"
      : "ring-4 ring-orange-400/80";

  const attendancePct = Math.min(100, Math.round((student.login_days / Math.max(totalDays, 1)) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: student.rank * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`relative rounded-3xl p-6 sm:p-7 text-center border overflow-hidden transition-shadow ${cardGradient} ${
        isFirst ? "md:-mt-10 md:pb-9" : ""
      }`}
    >
      {/* Sparkle glow for #1 */}
      {isFirst && (
        <>
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
        </>
      )}

      {/* Medal corner */}
      <div className="absolute top-3 left-3 text-3xl drop-shadow-md select-none">{medal}</div>
      <div className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-background/80 backdrop-blur border border-border text-foreground">
        #{student.rank}
      </div>

      <div className="flex flex-col items-center pt-5 relative">
        {/* Crown for #1 */}
        {isFirst && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: [0, -4, 0], opacity: 1 }}
            transition={{ y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
            className="absolute -top-1 z-10"
          >
            <Crown className="w-9 h-9 text-amber-500 drop-shadow-[0_4px_8px_rgba(251,191,36,0.6)] fill-amber-400" />
          </motion.div>
        )}

        <div
          className={`relative ${isFirst ? "w-28 h-28 sm:w-32 sm:h-32" : "w-24 h-24"} rounded-full overflow-hidden bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-2xl font-bold text-white ${ringClass}`}
        >
          {student.avatar_url ? (
            <img
              src={student.avatar_url}
              alt={student.display_name}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{getInitials(student.display_name)}</span>
          )}
        </div>

        <h3 className={`mt-4 font-display font-bold text-foreground line-clamp-2 ${isFirst ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
          {student.display_name}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground italic leading-relaxed px-2 min-h-[40px]">
          {isFirst
            ? t(`Quán quân tháng! Thầy Hải vô cùng tự hào về em.`, `Champion of the month! Mr. Hai is incredibly proud of you.`)
            : isSecond
              ? t(`Á quân xuất sắc - tiếp tục bứt phá em nhé!`, `Outstanding runner-up - keep pushing forward!`)
              : t(`Hạng ba ấn tượng - em đang đi đúng hướng!`, `Impressive third place - you're on the right track!`)}
        </p>

        {/* Attendance bar */}
        <div className="mt-4 w-full px-1">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-500" />
              {t("Chuyên cần", "Attendance")}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {student.login_days}/{totalDays} {t("ngày", "days")} · {attendancePct}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${attendancePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-400 via-primary to-amber-400 rounded-full"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 w-full text-xs">
          <Stat icon={BookOpen} value={student.mastered_words} label={t("từ", "words")} />
          <Stat icon={Clock} value={`${student.online_minutes}'`} label={t("phút", "min")} />
          <Stat icon={Flame} value={student.activities} label={t("hoạt động", "tasks")} />
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon: Icon, value, label }: { icon: typeof BookOpen; value: number | string; label: string }) => (
  <div className="flex flex-col items-center gap-0.5 p-2.5 rounded-xl bg-background/70 backdrop-blur-sm border border-border/50">
    <Icon className="w-3.5 h-3.5 text-primary" />
    <div className="font-bold text-foreground text-sm">{value}</div>
    <div className="text-[10px] text-muted-foreground">{label}</div>
  </div>
);

export default MonthlyTopStudents;
