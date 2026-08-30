/**
 * @file NextStepHero.tsx
 * @description The single most useful next action across every subject, shown
 *   at the top of "Lộ trình của tôi" so a student always knows where to start.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Check, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import type { PlanStep } from "@/lib/personalization/pathModel";
import type { PathView } from "@/hooks/useLearningPath";

interface Props {
  view: PathView;
  step: PlanStep;
  done: boolean;
  onToggle: (done: boolean) => void;
}

const NextStepHero = ({ view, step, done, onToggle }: Props) => {
  const { t } = useLanguage();
  const def = SUBJECTS[view.path.subject];

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-emerald-500/10 mb-6">
      <CardContent className="pt-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
              <Rocket className="w-4 h-4" />
              {t("Học tiếp ngay", "Continue now")}
            </div>
            <div className="text-base sm:text-lg font-bold truncate">
              {def.emoji} {t(step.titleVi, step.titleEn)}
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-xs">
              <Badge variant="secondary">{t(def.labelVi, def.labelEn)}</Badge>
              <Badge variant="outline">{step.minutes} {t("phút", "min")}</Badge>
              {view.dueReviews > 0 && (
                <Badge variant="outline">
                  {t("Cần ôn", "Due reviews")}: {view.dueReviews}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={done ? "secondary" : "outline"}
              size="sm"
              onClick={() => onToggle(!done)}
            >
              <Check className="w-4 h-4 mr-1" />
              {done ? t("Đã xong", "Done") : t("Xong rồi", "Mark done")}
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground">
              <Link to={step.route}>
                {t("Vào học", "Start")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepHero;
