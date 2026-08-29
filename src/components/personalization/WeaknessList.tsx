/**
 * @file WeaknessList.tsx
 * @description Ranked skill gaps for one subject with a practice link each.
 */
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { SKILL_LABEL, SUBJECTS } from "@/lib/personalization/subjectRegistry";
import type { PathView } from "@/hooks/useLearningPath";

const WeaknessList = ({ view }: { view: PathView }) => {
  const { t } = useLanguage();
  const def = SUBJECTS[view.path.subject];

  return (
    <Card className="border-2">
      <CardContent className="pt-5">
        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          {t("Cần cải thiện", "Needs improvement")} - {t(def.labelVi, def.labelEn)}
        </h3>
        <ul className="space-y-3">
          {view.weaknesses.slice(0, 5).map((w) => {
            const label = SKILL_LABEL[w.skill] ?? { vi: w.skill, en: w.skill };
            const track = def.tracks.find((x) => x.skill === w.skill);
            return (
              <li key={w.skill}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{t(label.vi, label.en)}</span>
                  <span className="text-xs text-muted-foreground">
                    {w.pct === null
                      ? t("chưa luyện", "not practised")
                      : `${Math.round(w.pct)}% · ${w.attempts} ${t("lần", "attempts")}`}
                  </span>
                </div>
                <Progress value={w.pct ?? 0} className="h-1.5" />
                {track && (
                  <Link
                    to={track.route}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {t(track.titleVi, track.titleEn)}
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WeaknessList;
