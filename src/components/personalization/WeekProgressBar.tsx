/**
 * @file WeekProgressBar.tsx
 * @description Weekly load: minutes completed against the hours the student
 *   committed to, with a gentle nudge when the week is running behind.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { AlertTriangle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import type { WeeklyLoad } from "@/lib/personalization/pathModel";

const WeekProgressBar = ({ load }: { load: WeeklyLoad }) => {
  const { t } = useLanguage();
  const h = (m: number) => Math.round((m / 60) * 10) / 10;

  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5 text-primary" />
          {t("Nhịp học tuần này", "This week's pace")}
        </span>
        <span className="text-muted-foreground">
          {h(load.doneMinutes)}h / {h(load.targetMinutes)}h ({load.donePct}%)
        </span>
      </div>
      <Progress value={load.donePct} className="h-2" />
      {load.behind && (
        <p className="flex items-start gap-1 text-xs text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          {t(
            `Tuần đã đi ${load.elapsedPct}% nhưng bạn mới hoàn thành ${load.donePct}%. Hãy làm một việc ngắn ngay hôm nay.`,
            `The week is ${load.elapsedPct}% through but you are at ${load.donePct}%. Pick one short task today.`,
          )}
        </p>
      )}
    </div>
  );
};

export default WeekProgressBar;
