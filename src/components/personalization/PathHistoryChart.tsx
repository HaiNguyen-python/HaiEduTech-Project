/**
 * @file PathHistoryChart.tsx
 * @description Eight-week history of completed plan steps and study minutes.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { WeekPoint } from "@/hooks/useLearningPath";

const PathHistoryChart = ({ history }: { history: WeekPoint[] }) => {
  const { t } = useLanguage();
  const data = history.map((p) => ({
    week: p.week.slice(5),
    steps: p.doneSteps,
    minutes: p.doneMinutes,
  }));

  return (
    <Card className="border-2">
      <CardContent className="pt-5">
        <h3 className="text-base font-bold mb-3">
          {t("8 tuần gần nhất", "Last 8 weeks")}
        </h3>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t(
              "Chưa có tuần nào hoàn thành. Tick xong việc đầu tiên để bắt đầu lịch sử.",
              "No completed week yet. Check off your first task to start the history.",
            )}
          </p>
        ) : (
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="steps"
                  name={t("Việc hoàn thành", "Tasks done") as string}
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="minutes"
                  name={t("Phút học", "Minutes") as string}
                  fill="hsl(160 84% 39%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PathHistoryChart;
