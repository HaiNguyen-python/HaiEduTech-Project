/**
 * @file MyPathDashboardCard.tsx
 * @description Compact "Lộ trình của tôi" card for the student Dashboard: the
 *   next action, weekly pace and a link into the full path page.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLearningPath } from "@/hooks/useLearningPath";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import { nextStep, weeklyLoadSummary } from "@/lib/personalization/pathModel";

const MyPathDashboardCard = () => {
  const { t } = useLanguage();
  const { views, loading, isStepDone } = useLearningPath();

  if (loading) return null;

  if (views.length === 0) {
    return (
      <div className="glass-card rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Compass className="w-4 h-4 text-primary" />
          {t(
            "Tạo lộ trình học cá nhân hóa cho từng môn trong 2 phút.",
            "Build a personalized path for each subject in two minutes.",
          )}
        </div>
        <Button asChild size="sm" className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground">
          <Link to="/my-path/start">{t("Bắt đầu", "Start")}</Link>
        </Button>
      </div>
    );
  }

  const candidates = views
    .map((v) => ({ view: v, step: nextStep(v.plan.filter((s) => !isStepDone(s))) }))
    .filter((c) => c.step !== null)
    .sort((a, b) => a.view.readiness.progressPct - b.view.readiness.progressPct);
  const pick = candidates[0];
  const focus = pick?.view ?? views[0];
  const load = weeklyLoadSummary(focus.plan, isStepDone, focus.path.hours_per_week);
  const def = SUBJECTS[focus.path.subject];

  return (
    <div className="glass-card rounded-xl p-4 mb-6 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-bold">
          <Compass className="w-4 h-4 text-primary" />
          {t("Lộ trình của tôi", "My Learning Path")}
        </span>
        <Button asChild size="sm" variant="outline">
          <Link to="/my-path">
            {t("Xem lộ trình", "Open path")}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
      <div className="text-sm">
        {pick?.step ? (
          <Link to={pick.step.route} className="font-medium hover:text-primary transition-colors">
            {def.emoji} {t(pick.step.titleVi, pick.step.titleEn)} - {pick.step.minutes}
            {t(" phút", " min")}
          </Link>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {t("Bạn đã hoàn thành kế hoạch tuần này.", "You finished this week's plan.")}
          </span>
        )}
      </div>
      <div>
        <Progress value={load.donePct} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {t(def.labelVi, def.labelEn)} - {load.donePct}%{" "}
          {t("kế hoạch tuần", "of this week's plan")}
        </p>
      </div>
    </div>
  );
};

export default MyPathDashboardCard;
