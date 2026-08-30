/**
 * @file WeeklyPlanList.tsx
 * @description This week's tasks for one subject, spread over the days the
 *   student is free, with check-off, weekly pace and a push into the existing
 *   To-do & Study Goal module.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Check, ListPlus, Mic, PenLine, RefreshCw, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { SUBJECTS } from "@/lib/personalization/subjectRegistry";
import {
  DAY_LABELS, distributePlanByDays, todayCode, weeklyLoadSummary, type PlanStep,
} from "@/lib/personalization/pathModel";
import type { PathView } from "@/hooks/useLearningPath";
import WeekProgressBar from "./WeekProgressBar";

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
  onPushToTodo?: (step: PlanStep) => Promise<boolean>;
}

const WeeklyPlanList = ({ view, isStepDone, onToggle, onPushToTodo }: Props) => {
  const { t } = useLanguage();
  const [pushing, setPushing] = useState<string | null>(null);
  const def = SUBJECTS[view.path.subject];
  const load = weeklyLoadSummary(view.plan, isStepDone, view.path.hours_per_week);
  const buckets = distributePlanByDays(view.plan, view.path.available_days ?? []);
  const today = todayCode();

  const pushAll = async () => {
    if (!onPushToTodo) return;
    setPushing("all");
    let ok = 0;
    for (const step of view.plan) {
      if (await onPushToTodo(step)) ok += 1;
    }
    setPushing(null);
    toast({
      title: t("Đã thêm vào To-do", "Added to your to-do list"),
      description: t(`${ok} việc đã được thêm.`, `${ok} tasks added.`),
    });
  };

  return (
    <Card className="border-2">
      <CardContent className="pt-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold">
            {def.emoji} {t("Kế hoạch tuần này", "This week's plan")} - {t(def.labelVi, def.labelEn)}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {Math.round((load.plannedMinutes / 60) * 10) / 10}h {t("kế hoạch", "planned")}
            </Badge>
            {onPushToTodo && view.plan.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => void pushAll()} disabled={pushing !== null}>
                <ListPlus className="w-4 h-4 mr-1" />
                {t("Đưa cả tuần vào To-do", "Send week to to-do")}
              </Button>
            )}
          </div>
        </div>

        <WeekProgressBar load={load} />

        {view.plan.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t("Hãy tăng số giờ học mỗi tuần để nhận kế hoạch.", "Increase your weekly hours to get a plan.")}
          </p>
        )}

        <div className="space-y-4">
          {buckets.filter((b) => b.steps.length > 0).map((bucket) => (
            <div key={bucket.day}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold">
                  {t(DAY_LABELS[bucket.day].vi, DAY_LABELS[bucket.day].en)}
                </span>
                {bucket.day === today && (
                  <Badge className="bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-[10px] px-1.5 py-0">
                    {t("Hôm nay", "Today")}
                  </Badge>
                )}
              </div>
              <ul className="space-y-2">
                {bucket.steps.map((step) => {
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
                      {onPushToTodo && (
                        <button
                          onClick={async () => {
                            setPushing(step.trackId);
                            const ok = await onPushToTodo(step);
                            setPushing(null);
                            toast({
                              title: ok
                                ? t("Đã thêm vào To-do", "Added to your to-do list")
                                : t("Cần đăng nhập", "Sign in required"),
                            });
                          }}
                          disabled={pushing !== null}
                          aria-label={t("Đưa vào To-do", "Add to to-do")}
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                        >
                          <ListPlus className="w-4 h-4" />
                        </button>
                      )}
                      <span className="text-xs text-muted-foreground shrink-0">{step.minutes}'</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyPlanList;
