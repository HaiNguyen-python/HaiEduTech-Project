/**
 * @file WeeklyPlanList.tsx
 * @description This week's tasks for one subject, with check-off and total time.
 */
import { Link } from "react-router-dom";
import { BookOpen, Check, Mic, PenLine, RefreshCw, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import type { PlanStep } from "@/lib/personalization/pathModel";
import type { PathView } from "@/hooks/useLearningPath";

const KIND_ICON = {
  lesson: BookOpen,
  practice: PenLine,
  vocab: Sparkles,
  review: RefreshCw,
  speaking: Mic,
} as const;

interface Props {
  view: PathView;
  isStepDone: (step: PlanStep) => boolean;
  onToggle: (step: PlanStep, done: boolean) => void;
}

const WeeklyPlanList = ({ view, isStepDone, onToggle }: Props) => {
  const { t } = useLanguage();
  const def = SUBJECTS[view.path.subject];
  const total = view.plan.reduce((s, x) => s + x.minutes, 0);
  const doneMinutes = view.plan.filter(isStepDone).reduce((s, x) => s + x.minutes, 0);

  return (
    <Card className="border-2">
      <CardContent className="pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 className="text-base font-bold">
            {def.emoji} {t("Kế hoạch tuần này", "This week's plan")} - {t(def.labelVi, def.labelEn)}
          </h3>
          <Badge variant="outline" className="text-xs">
            {Math.round(doneMinutes / 60 * 10) / 10}h / {Math.round(total / 60 * 10) / 10}h
          </Badge>
        </div>

        {view.plan.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t("Hãy tăng số giờ học mỗi tuần để nhận kế hoạch.", "Increase your weekly hours to get a plan.")}
          </p>
        )}

        <ul className="space-y-2">
          {view.plan.map((step) => {
            const Icon = KIND_ICON[step.kind] ?? BookOpen;
            const done = isStepDone(step);
            return (
              <li
                key={step.trackId}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                  done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border hover:border-primary/40"
                }`}
              >
                <button
                  onClick={() => onToggle(step, !done)}
                  aria-label={t("Đánh dấu hoàn thành", "Mark as done")}
                  className={`w-6 h-6 shrink-0 rounded-md border flex items-center justify-center ${
                    done ? "bg-emerald-500 border-emerald-500 text-primary-foreground" : "border-muted-foreground/40"
                  }`}
                >
                  {done && <Check className="w-4 h-4" />}
                </button>
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <Link to={step.route} className="min-w-0 flex-1 hover:text-primary transition-colors">
                  <span className={`text-sm font-medium ${done ? "line-through text-muted-foreground" : ""}`}>
                    {t(step.titleVi, step.titleEn)}
                  </span>
                </Link>
                <span className="text-xs text-muted-foreground shrink-0">{step.minutes}'</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WeeklyPlanList;
