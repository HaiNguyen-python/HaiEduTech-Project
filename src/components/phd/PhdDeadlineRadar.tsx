/**
 * @file PhdDeadlineRadar.tsx
 * @description 12-month heatmap of PhD funding deadlines + click-to-filter.
 */
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FUNDING_WITH_MONTHS, countDeadlinesInMonth } from "@/lib/phdFundingHelpers";

const MONTHS_VI = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface Props {
  selectedMonth: number | null;
  onSelect: (month: number | null) => void;
}

const PhdDeadlineRadar = ({ selectedMonth, onSelect }: Props) => {
  const { t, lang } = useLanguage();
  const labels = lang === "vi" ? MONTHS_VI : MONTHS_EN;
  const currentMonth = new Date().getMonth() + 1;

  const counts = useMemo(() => Array.from({ length: 12 }, (_, i) => countDeadlinesInMonth(i + 1)), []);
  const max = Math.max(1, ...counts);
  const rollingCount = useMemo(() => FUNDING_WITH_MONTHS.filter((f) => f.rolling).length, []);

  return (
    <Card className="mb-5 border-fuchsia-200/60 dark:border-fuchsia-800/40 bg-gradient-to-br from-fuchsia-50/60 to-rose-50/60 dark:from-fuchsia-950/20 dark:to-rose-950/20">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-bold text-sm md:text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-fuchsia-500" />
            🗓️ {t("Deadline Radar 12 tháng", "12-Month Deadline Radar")}
          </h3>
          <div className="flex items-center gap-2">
            {rollingCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {rollingCount} {t("rolling", "rolling")}
              </Badge>
            )}
            {selectedMonth !== null && (
              <button
                onClick={() => onSelect(null)}
                className="text-xs underline text-muted-foreground hover:text-foreground"
              >
                {t("Xoá lọc", "Clear filter")}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto -mx-1 px-1">
          <div className="grid grid-cols-12 gap-1.5 min-w-[600px]">
            {counts.map((c, i) => {
              const month = i + 1;
              const active = selectedMonth === month;
              const isCurrent = month === currentMonth;
              const intensity = c / max;
              const bg = c === 0
                ? "bg-muted/40 text-muted-foreground"
                : intensity > 0.66 ? "bg-fuchsia-500 text-white"
                : intensity > 0.33 ? "bg-fuchsia-400 text-white"
                : "bg-fuchsia-200 text-fuchsia-900 dark:bg-fuchsia-900/50 dark:text-fuchsia-100";
              return (
                <button
                  key={month}
                  onClick={() => onSelect(active ? null : month)}
                  className={`relative aspect-square rounded-md flex flex-col items-center justify-center transition-all hover:scale-105 ${bg} ${active ? "ring-2 ring-offset-2 ring-fuchsia-600" : ""} ${isCurrent ? "outline outline-2 outline-amber-400" : ""}`}
                  aria-label={`${labels[i]} - ${c} ${t("học bổng", "funding")}`}
                >
                  <span className="text-[10px] font-semibold leading-none">{labels[i]}</span>
                  <span className="text-sm font-bold leading-tight">{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          {t(
            "Tháng đậm = nhiều deadline. Viền vàng = tháng hiện tại. Click 1 ô để lọc bảng học bổng theo tháng đó.",
            "Darker tile = more deadlines. Yellow outline = current month. Click a tile to filter the funding list by that month.",
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default PhdDeadlineRadar;
