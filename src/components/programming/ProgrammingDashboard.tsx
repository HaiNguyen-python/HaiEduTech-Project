/**
 * @file ProgrammingDashboard.tsx
 * @description Hành trình của tôi — XP/Level/Streak/Badges/Pillar progress.
 * Mounted on the `/programming` page so students see their progress immediately.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { Flame, Trophy, Sparkles, Star, RotateCcw } from "lucide-react";
import { useProgrammingXP, BADGE_DEFS, type BadgeId } from "@/hooks/useProgrammingXP";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";

const ProgrammingDashboard = () => {
  const { lang: language, t: tx } = useLanguage();
  const t = (vi: string, en: string) => (language === "vi" ? vi : en);
  const { state, levelInfo, reset } = useProgrammingXP();

  const allBadgeIds = Object.keys(BADGE_DEFS) as BadgeId[];

  return (
    <section
      aria-labelledby="programming-dashboard-title"
      className="max-w-5xl mx-auto mb-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-emerald-500/5 p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2
            id="programming-dashboard-title"
            className="text-lg sm:text-xl font-display font-bold text-foreground flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            {t("Hành trình của tôi", "My learning journey")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t(
              "Theo dõi XP, streak, badge và tiến độ qua các pillar.",
              "Track your XP, streak, badges and per-pillar progress.",
            )}
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm(t("Reset tiến trình Programming?", "Reset programming progress?"))) {
              reset();
            }
          }}
          className="text-[11px] text-muted-foreground hover:text-destructive inline-flex items-center gap-1 transition-colors"
          aria-label={t("Đặt lại tiến trình", "Reset progress")}
        >
          <RotateCcw className="w-3 h-3" />
          {t("Reset", "Reset")}
        </button>
      </div>

      {/* XP + level + streak */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        {/* Level card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4 bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden>
              {levelInfo.current.emoji}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {t("Cấp độ", "Level")} {levelInfo.current.level}
              </div>
              <div className="font-display font-bold text-sm text-foreground truncate">
                {levelInfo.current.name}
              </div>
            </div>
          </div>
          <Progress value={levelInfo.pct} className="h-2" />
          <div className="text-[11px] text-muted-foreground mt-1.5">
            {state.xp} XP
            {levelInfo.next
              ? ` · ${levelInfo.next.xpRequired - state.xp} ${t("XP đến", "XP to")} ${levelInfo.next.emoji} ${levelInfo.next.name}`
              : ` · ${t("Đã đạt cấp tối đa", "Max level reached")}`}
          </div>
        </motion.div>

        {/* Streak card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl p-4 bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame
              className={`w-6 h-6 ${state.streak > 0 ? "text-orange-500" : "text-muted-foreground"}`}
              aria-hidden
            />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {t("Chuỗi học", "Learning streak")}
              </div>
              <div className="font-display font-bold text-foreground">
                {state.streak} {t("ngày", "days")}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {state.streak === 0
              ? t("Học hôm nay để bắt đầu chuỗi!", "Learn today to start a streak!")
              : state.streak >= 30
                ? t("Bạn không thể bị cản!", "You are unstoppable!")
                : state.streak >= 7
                  ? t("Đang bừng cháy 🔥", "On fire 🔥")
                  : t("Tiếp tục mỗi ngày nhé!", "Keep going daily!")}
          </p>
        </motion.div>

        {/* Challenges card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl p-4 bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-amber-500" aria-hidden />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {t("Thử thách đã pass", "Challenges passed")}
              </div>
              <div className="font-display font-bold text-foreground">{state.challengesPassed}</div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {t(
              "+100 XP cho mỗi thử thách hằng ngày.",
              "+100 XP for every daily challenge.",
            )}
          </p>
        </motion.div>
      </div>

      {/* Badges */}
      <div className="rounded-xl p-4 bg-card border border-border">
        <h3 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" />
          {t("Huy hiệu", "Badges")}
          <span className="text-xs font-normal text-muted-foreground">
            ({state.badges.length}/{allBadgeIds.length})
          </span>
        </h3>
        <ul
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2"
          aria-label={t("Danh sách huy hiệu", "Badge list")}
        >
          {allBadgeIds.map((id) => {
            const def = BADGE_DEFS[id];
            const earned = state.badges.includes(id);
            return (
              <li
                key={id}
                title={`${language === "vi" ? def.nameVi : def.name} — ${language === "vi" ? def.descriptionVi : def.description}`}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-center p-1.5 border transition-all ${
                  earned
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/40 shadow-sm"
                    : "bg-muted/30 border-border opacity-40 grayscale"
                }`}
                aria-label={`${language === "vi" ? def.nameVi : def.name} — ${earned ? t("đã đạt", "earned") : t("chưa đạt", "locked")}`}
              >
                <span className="text-xl sm:text-2xl" aria-hidden>
                  {def.emoji}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-foreground mt-0.5 leading-tight line-clamp-2">
                  {language === "vi" ? def.nameVi : def.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ProgrammingDashboard;
