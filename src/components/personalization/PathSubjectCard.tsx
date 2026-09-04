/**
 * @file PathSubjectCard.tsx
 * @description One subject card on "Lộ trình của tôi": level, target, progress
 *   ring, readiness estimate and the single next action.
 */
import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, ClipboardCheck, Flame, Target, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import type { PathView } from "@/hooks/useLearningPath";

interface Props {
  view: PathView;
  onEdit: () => void;
  onRemove: () => void;
}

const PathSubjectCard = ({ view, onEdit, onRemove }: Props) => {
  const { t } = useLanguage();
  const def = SUBJECTS[view.path.subject];
  const next = view.plan[0];

  return (
    <Card className="border-2 border-primary/20 h-full">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-lg font-bold truncate">
              {def.emoji} {t(def.labelVi, def.labelEn)}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {view.path.goal_label || t("Chưa đặt mục tiêu", "No goal set yet")}
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <Button size="sm" variant="ghost" onClick={onEdit} className="h-8 px-2 text-xs">
              {t("Sửa", "Edit")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onRemove}
              aria-label={t("Xóa lộ trình", "Remove path")}
              className="h-8 px-2 text-muted-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {t("Hiện tại", "Now")}: {view.currentLevel}
          </Badge>
          {view.path.target_level && (
            <Badge className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-xs">
              <Target className="w-3 h-3 mr-1" />
              {view.path.target_level}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            <Flame className="w-3 h-3 mr-1" />
            {view.activeDays30} {t("ngày/30", "days/30")}
          </Badge>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">{t("Tiến tới mục tiêu", "Towards target")}</span>
            <span className="font-semibold">{view.readiness.progressPct}%</span>
          </div>
          <Progress value={view.readiness.progressPct} className="h-2" />
        </div>

        <div className="rounded-lg bg-secondary/40 p-3 text-xs space-y-1">
          <div className="flex items-center gap-2 font-medium">
            <CalendarClock className="w-4 h-4 text-primary" />
            {view.readiness.weeks === 0
              ? t("Bạn đã đạt mục tiêu", "You have reached the target")
              : t(
                  `Khoảng ${view.readiness.weeks} tuần nữa (~${view.readiness.date})`,
                  `About ${view.readiness.weeks} weeks to go (~${view.readiness.date})`,
                )}
          </div>
          <div className="text-muted-foreground">
            {t("Độ tin cậy", "Confidence")}:{" "}
            {view.readiness.confidence === "high"
              ? t("cao", "high")
              : view.readiness.confidence === "medium"
                ? t("trung bình", "medium")
                : t("thấp - hãy làm thêm bài để dự đoán chính xác hơn", "low - do more practice for a better estimate")}
          </div>
        </div>

        {next && (
          <Link
            to={next.route}
            className="group flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3 hover:bg-primary/10 transition-colors"
          >
            <div className="min-w-0">
              <div className="text-xs font-semibold text-primary">{t("Học tiếp ngay", "Continue now")}</div>
              <div className="text-sm font-medium truncate">{t(next.titleVi, next.titleEn)}</div>
              <div className="text-xs text-muted-foreground">{next.minutes} {t("phút", "min")}</div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        {def.placement && (
          <Link
            to={`/placement-test?subject=${def.placement}`}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            {t("Làm lại kiểm tra trình độ", "Retake the placement test")}
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default PathSubjectCard;
