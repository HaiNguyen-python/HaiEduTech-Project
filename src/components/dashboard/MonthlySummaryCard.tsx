/**
 * MonthlySummaryCard
 * Tổng kết hoạt động học tập (tuần / tháng / tất cả) cho học sinh.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, BookOpen, Activity, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";

type Period = "week" | "month" | "all";

interface Summary {
  period: Period;
  online_seconds: number;
  online_minutes: number;
  login_days: number;
  mastered_words_total: number;
  mastered_words_period: number;
  mastered_by_subject: Record<string, number>;
  activities_total: number;
  activities_by_type: Record<string, number>;
  last_active_at: string | null;
  monthly_rank: number | null;
}

const ACTIVITY_LABEL_VI: Record<string, string> = {
  ielts_writing: "IELTS Writing",
  ielts_speaking: "IELTS Speaking",
  language_lesson_quiz: "Quiz bài học",
  toeic_lecture_quiz: "TOEIC Quiz",
  speaking_coach_english: "Speaking Coach",
  speaking_coach_chinese: "Speaking Coach 中",
  speaking_coach_finnish: "Speaking Coach FI",
  python_pathway_lesson: "Python Lesson",
};

const labelFor = (key: string, lang: "vi" | "en") => {
  if (lang === "vi" && ACTIVITY_LABEL_VI[key]) return ACTIVITY_LABEL_VI[key];
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatMinutes = (mins: number, t: (vi: string, en: string) => string) => {
  if (mins < 60) return `${mins}${t("p", "m")}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}${t("g", "h")} ${m}${t("p", "m")}`;
};

interface Props {
  userId: string;
}

const MonthlySummaryCard = ({ userId }: Props) => {
  const { t, lang } = useLanguage();
  const [period, setPeriod] = useState<Period>("month");
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const { data: result, error } = await supabase.rpc("get_student_summary", {
        _user_id: userId,
        _period: period,
      });
      if (cancelled) return;
      if (!error && result) setData(result as unknown as Summary);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, period]);

  const topTypes = data
    ? Object.entries(data.activities_by_type || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];
  const topSubjects = data
    ? Object.entries(data.mastered_by_subject || {})
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-5 sm:p-6 mb-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
          📊 {t("Tổng kết học tập", "Learning Summary")}
        </h3>
        <div className="flex gap-1 p-1 rounded-lg bg-secondary">
          {(["week", "month", "all"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                period === p
                  ? "bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "week" ? t("Tuần", "Week") : p === "month" ? t("Tháng", "Month") : t("Tất cả", "All")}
            </button>
          ))}
        </div>
      </div>

      {loading || !data ? (
        <div className="flex justify-center py-6">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <Metric icon={Clock} color="text-sky-500" label={t("Thời gian online", "Online time")} value={formatMinutes(data.online_minutes, t)} />
            <Metric icon={Calendar} color="text-orange-500" label={t("Ngày học", "Active days")} value={String(data.login_days)} />
            <Metric
              icon={BookOpen}
              color="text-emerald-500"
              label={t("Từ đã thuộc", "Mastered words")}
              value={`${data.mastered_words_period}/${data.mastered_words_total}`}
            />
            <Metric icon={Activity} color="text-primary" label={t("Bài hoàn thành", "Activities")} value={String(data.activities_total)} />
          </div>

          {period === "month" && data.monthly_rank && (
            <div className="mb-5 p-3 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-50/60 to-transparent dark:from-amber-950/30 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="text-sm text-foreground">
                {t(
                  `Em đang đứng hạng #${data.monthly_rank} trên Bảng Tuyên Dương tháng này. Cố lên!`,
                  `You're #${data.monthly_rank} on this month's Honor Roll. Keep going!`
                )}
              </div>
            </div>
          )}

          {topTypes.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {t("Loại bài đã làm", "Activity breakdown")}
              </div>
              <div className="space-y-1.5">
                {topTypes.map(([key, cnt]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="flex-1 truncate text-foreground">{labelFor(key, lang)}</span>
                    <span className="font-bold text-primary tabular-nums">{cnt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topSubjects.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {t("Từ vựng theo môn (tích lũy)", "Words by subject (lifetime)")}
              </div>
              <div className="flex flex-wrap gap-2">
                {topSubjects.map(([subj, cnt]) => (
                  <span key={subj} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                    {subj} · <strong className="text-primary">{cnt}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.activities_total === 0 && data.online_minutes === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              {t("Chưa có hoạt động trong khoảng thời gian này.", "No activity in this period yet.")}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
};

const Metric = ({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: typeof Clock;
  color: string;
  label: string;
  value: string;
}) => (
  <div className="p-3 rounded-xl bg-card/60 border border-border/60">
    <Icon className={`w-4 h-4 ${color} mb-1.5`} />
    <div className="text-[11px] text-muted-foreground leading-tight">{label}</div>
    <div className="text-lg font-display font-bold text-foreground tabular-nums">{value}</div>
  </div>
);

export default MonthlySummaryCard;
