/**
 * @file DailyCodeChallenge.tsx
 * @description Daily seeded Python challenge widget - encourages return visits.
 * Picks one challenge per day (seeded by date so it's stable per user/day),
 * tracks completion + timing, awards +100 XP and badges on success.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { pythonChallenges } from "@/data/pythonChallenges";
import { useProgrammingXP, BADGE_DEFS } from "@/hooks/useProgrammingXP";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const todayKey = () => new Date().toISOString().slice(0, 10);

/** Deterministic hash so the same date yields the same challenge for everyone. */
const dateSeed = (d: string) => {
  let h = 0;
  for (let i = 0; i < d.length; i++) h = (h * 31 + d.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const DailyCodeChallenge = () => {
  const { lang, t } = useLanguage();
  const { state, startDailyChallenge, completeDailyChallenge } = useProgrammingXP();
  const [today, setToday] = useState(todayKey);

  // Recompute at midnight if the page is left open.
  useEffect(() => {
    const tick = setInterval(() => {
      const now = todayKey();
      if (now !== today) setToday(now);
    }, 60_000);
    return () => clearInterval(tick);
  }, [today]);

  const challenge = useMemo(() => {
    if (pythonChallenges.length === 0) return null;
    const idx = dateSeed(today) % pythonChallenges.length;
    return pythonChallenges[idx];
  }, [today]);

  if (!challenge) return null;

  const alreadyPassedToday = state.daily?.date === today && state.daily.passed;

  const handleStart = () => {
    startDailyChallenge(challenge.id);
  };

  // Called by the challenge page when student passes - exposed for future hook.
  // (Currently students can self-confirm with this button after solving inside
  // the challenge page; future enhancement: deep-link callback.)
  const handleConfirm = () => {
    if (alreadyPassedToday) return;
    const { newBadges, bonusXP } = completeDailyChallenge(challenge.id);
    toast.success(t(`🎉 +${bonusXP} XP! Thử thách hôm nay đã hoàn thành.`, `🎉 +${bonusXP} XP! Today's challenge complete.`));
    newBadges.forEach((b) => {
      const def = BADGE_DEFS[b];
      toast(`${def.emoji} ${lang === "vi" ? def.nameVi : def.name}`, {
        description: lang === "vi" ? def.descriptionVi : def.description,
      });
    });
  };

  return (
    <motion.section
      aria-labelledby="daily-challenge-title"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto mb-10 rounded-2xl border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-yellow-500/10 p-5 sm:p-6 shadow-md relative overflow-hidden"
    >
      {/* Decorative flame */}
      <Flame
        className="absolute -right-4 -top-4 w-24 h-24 text-orange-500/10 rotate-12 pointer-events-none"
        aria-hidden
      />

      <div className="flex items-start gap-3 mb-3 flex-wrap">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl shadow-md shrink-0">
          🔥
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-orange-700 dark:text-orange-400 font-bold mb-0.5">
            {t("Thử thách hôm nay", "Today's challenge")} · +100 XP
          </div>
          <h2
            id="daily-challenge-title"
            className="font-display font-bold text-lg sm:text-xl text-foreground leading-tight"
          >
            {lang === "vi" ? challenge.titleVi : challenge.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
            {lang === "vi" ? challenge.descriptionVi : challenge.description}
          </p>
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
            challenge.difficulty === "easy"
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
              : challenge.difficulty === "medium"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                : "bg-rose-500/15 text-rose-700 dark:text-rose-400"
          }`}
        >
          {challenge.difficulty}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap mt-4">
        {alreadyPassedToday ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            {t("Đã hoàn thành hôm nay - quay lại ngày mai!", "Done for today - come back tomorrow!")}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">
            {t(
              "Hoàn thành dưới 2 phút để mở khoá huy hiệu Speed Coder ⚡",
              "Finish in under 2 minutes to unlock the Speed Coder badge ⚡",
            )}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {!alreadyPassedToday && (
            <button
              onClick={handleConfirm}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 transition-all inline-flex items-center gap-1.5"
              aria-label={t("Đánh dấu đã hoàn thành thử thách", "Mark challenge as complete")}
            >
              <CheckCircle2 className="w-4 h-4" />
              {t("Đã làm xong", "I finished it")}
            </button>
          )}
          <Link
            to={`/python-challenges/${challenge.id}`}
            onClick={handleStart}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-orange-500 to-red-600 text-white hover:brightness-110 active:scale-95 transition-all shadow-md inline-flex items-center gap-1.5"
            aria-label={t("Bắt đầu thử thách hôm nay", "Start today's challenge")}
          >
            <Zap className="w-4 h-4" />
            {alreadyPassedToday ? t("Làm lại", "Try again") : t("Bắt đầu ngay", "Start now")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DailyCodeChallenge;
