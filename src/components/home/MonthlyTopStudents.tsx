/**
 * MonthlyTopStudents
 * Top 3 học sinh tiêu biểu của tháng – tuyên dương từ thầy Hải.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Trophy, Sparkles, BookOpen, Clock, Flame } from "lucide-react";
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
  const monthLabel = `${now.getMonth() + 1}/${now.getFullYear()}`;

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/15 to-emerald-500/15 border border-primary/30 mb-4">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-foreground">
              {t(`Tuyên dương tháng ${monthLabel}`, `Honor Roll • ${monthLabel}`)}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            🏆 {t("Học sinh tiêu biểu của tháng", "Student of the Month")}
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
            {t(
              "Thầy Hải tự hào tuyên dương 3 học sinh xuất sắc nhất tháng này — vì sự chăm chỉ, kiên trì và tiến bộ vượt bậc.",
              "Mr. Hai proudly honors the top 3 students this month — for their dedication, perseverance, and outstanding progress."
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
            <div className="hidden md:grid grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
              {ORDER_DESKTOP.map((idx) => {
                const s = students[idx];
                if (!s) return <div key={idx} />;
                return <PodiumCard key={s.user_id} student={s} elevated={s.rank === 1} t={t} />;
              })}
            </div>

            {/* Mobile stack */}
            <div className="md:hidden flex flex-col gap-4 max-w-md mx-auto">
              {students.map((s) => (
                <PodiumCard key={s.user_id} student={s} elevated={s.rank === 1} t={t} />
              ))}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 italic">
              {t(
                "Bảng xếp hạng được cập nhật theo thời gian thực, dựa trên từ vựng đã thuộc, bài học hoàn thành, thời gian học và sự đều đặn.",
                "Ranking updates in real time based on words mastered, lessons completed, study time, and consistency."
              )}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

const PodiumCard = ({
  student,
  elevated,
  t,
}: {
  student: TopStudent;
  elevated: boolean;
  t: (vi: string, en: string) => string;
}) => {
  const medal = MEDALS[student.rank - 1] || "🏅";
  const ringClass =
    student.rank === 1
      ? "ring-4 ring-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
      : student.rank === 2
        ? "ring-2 ring-slate-300/60"
        : "ring-2 ring-amber-700/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: student.rank * 0.08 }}
      className={`relative rounded-2xl p-6 text-center bg-card border border-border overflow-hidden ${
        elevated ? "md:-mt-6 md:pb-8 bg-gradient-to-b from-amber-50/50 to-card dark:from-amber-950/20" : ""
      }`}
    >
      <div className="absolute top-3 left-3 text-3xl">{medal}</div>
      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
        #{student.rank}
      </div>

      <div className="flex flex-col items-center pt-4">
        <div className={`relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-2xl font-bold text-white ${ringClass}`}>
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

        <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-foreground line-clamp-2">
          {student.display_name}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-muted-foreground italic leading-relaxed px-2">
          {student.rank === 1
            ? t(
                `Quán quân tháng! Thầy Hải vô cùng tự hào về em.`,
                `Champion of the month! Mr. Hai is incredibly proud of you.`
              )
            : student.rank === 2
              ? t(`Á quân xuất sắc — tiếp tục bứt phá em nhé!`, `Outstanding runner-up — keep pushing forward!`)
              : t(`Hạng ba ấn tượng — em đang đi đúng hướng!`, `Impressive third place — you're on the right track!`)}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 w-full text-xs">
          <Stat icon={BookOpen} value={student.mastered_words} label={t("từ", "words")} />
          <Stat icon={Clock} value={`${student.online_minutes}'`} label={t("phút", "min")} />
          <Stat icon={Flame} value={student.login_days} label={t("ngày", "days")} />
        </div>
      </div>
    </motion.div>
  );
};

const Stat = ({ icon: Icon, value, label }: { icon: typeof BookOpen; value: number | string; label: string }) => (
  <div className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-secondary/50">
    <Icon className="w-3.5 h-3.5 text-primary" />
    <div className="font-bold text-foreground text-sm">{value}</div>
    <div className="text-[10px] text-muted-foreground">{label}</div>
  </div>
);

export default MonthlyTopStudents;
