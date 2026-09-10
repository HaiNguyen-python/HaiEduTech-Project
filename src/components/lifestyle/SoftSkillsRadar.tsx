/**
 * @file SoftSkillsRadar.tsx
 * @description Soft-skills radar for Lifestyle Academy. Each axis is one
 *              pillar, scored by lesson coverage weighted with quiz accuracy.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Sparkles, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LifestylePillarKey } from "@/data/lifestyleAcademyLessons";
import type { PillarScore } from "@/hooks/useLifestyleProgress";

const PILLAR_LABELS: Record<LifestylePillarKey, { vi: string; en: string }> = {
  finance: { vi: "Tài chính", en: "Finance" },
  etiquette: { vi: "Ứng xử", en: "Etiquette" },
  presence: { vi: "Khí chất", en: "Presence" },
  wellness: { vi: "Thân thể", en: "Wellness" },
  selfstudy: { vi: "Tự học", en: "Self-Study" },
  partying: { vi: "Sự kiện", en: "Events" },
};

interface SoftSkillsRadarProps {
  pillarScores: PillarScore[];
  stats: { attempted: number; completed: number; accuracy: number; totalLessons: number };
  compact?: boolean;
}

const SoftSkillsRadar = ({ pillarScores, stats, compact = false }: SoftSkillsRadarProps) => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";

  const data = pillarScores.map((p) => ({
    skill: vi ? PILLAR_LABELS[p.pillar].vi : PILLAR_LABELS[p.pillar].en,
    value: p.value,
  }));

  const weakest = [...pillarScores].sort((a, b) => a.value - b.value)[0];
  // Only lessons passed at 75%+ count, so an attempt below that keeps the radar empty.
  const empty = stats.completed === 0;


  return (
    <Card className="border-2 border-primary/20">
      <CardContent className={compact ? "pt-5" : "pt-6"}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="inline-flex items-center gap-2 text-base font-bold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            {t("Biểu đồ kỹ năng mềm", "Soft Skills Radar")}
          </h3>
          <span className="text-sm text-muted-foreground">
            {t(
              `${stats.completed}/${stats.totalLessons} bài đạt (từ 75% quiz)`,
              `${stats.completed}/${stats.totalLessons} lessons passed (75%+ quiz)`,
            )}
          </span>

        </div>

        <div className={compact ? "h-60" : "h-72 sm:h-80"}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 13 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Radar
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {empty ? (
          <p className="rounded-lg bg-muted px-3 py-3 text-sm leading-relaxed text-muted-foreground">
            {t(
              "Chưa có bài nào đạt. Hãy mở một bài học và trả lời đúng ít nhất 3/4 câu quiz - biểu đồ sẽ hiện ngay.",
              "No lesson passed yet. Open a lesson and get at least 3 of 4 quiz questions right - your radar fills in.",

            )}
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-muted px-3 py-2.5 text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                {t("Điểm quiz trung bình", "Average quiz score")}
              </span>
              <div className="mt-1 text-2xl font-bold text-foreground">{stats.accuracy}%</div>
            </div>
            {weakest && (
              <div className="rounded-lg bg-muted px-3 py-2.5 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Target className="h-4 w-4 text-amber-600" />
                  {t("Nhóm nên học tiếp", "Focus next")}
                </span>
                <div className="mt-1 text-base font-bold text-foreground">
                  {vi ? PILLAR_LABELS[weakest.pillar].vi : PILLAR_LABELS[weakest.pillar].en} ·{" "}
                  {weakest.completed}/{weakest.total}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SoftSkillsRadar;
