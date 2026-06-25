/**
 * LessonModuleRadar - radar chart showing the learner's mastery across every
 * lesson in the current module. Each axis is a lesson; the score comes from
 * localStorage keys written when the lesson quiz is submitted:
 *   haiedu_lesson_score_{moduleId}_{lessonId}  (0-100)
 *
 * Renders at the end of every programming lesson so learners get a clear,
 * visual picture of where they are strong / weak inside the pillar.
 */
import { useMemo } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProgrammingModule } from "@/data/programmingLessonData";

interface Props {
  module: ProgrammingModule;
  currentLessonId?: string;
  className?: string;
}

export function readLessonScore(moduleId: string, lessonId: string): number {
  try {
    const v = parseInt(localStorage.getItem(`haiedu_lesson_score_${moduleId}_${lessonId}`) || "0", 10);
    return Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0;
  } catch {
    return 0;
  }
}

export function writeLessonScore(moduleId: string, lessonId: string, score: number) {
  try {
    const key = `haiedu_lesson_score_${moduleId}_${lessonId}`;
    const prev = readLessonScore(moduleId, lessonId);
    if (score > prev) localStorage.setItem(key, String(Math.round(score)));
  } catch {
    /* ignore */
  }
}

const shortLabel = (s: string, max = 18) =>
  s.length > max ? s.slice(0, max - 1) + "…" : s;

const LessonModuleRadar = ({ module, currentLessonId, className = "" }: Props) => {
  const { t, lang } = useLanguage();

  const data = useMemo(() => {
    return module.lessons.map((l) => {
      const title = lang === "vi" ? l.title : (l.titleEn || l.title);
      const score = readLessonScore(module.id, l.id);
      const isCurrent = l.id === currentLessonId;
      return {
        subject: shortLabel(title) + (isCurrent ? " ★" : ""),
        fullTitle: title,
        score,
        fullMark: 100,
      };
    });
  }, [module, currentLessonId, lang]);

  const totalScore = data.reduce((s, d) => s + d.score, 0);
  const maxTotal = data.length * 100;
  const pct = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;
  const mastered = data.filter((d) => d.score >= 80).length;

  if (data.length < 3) {
    // Radar needs at least 3 axes to look meaningful.
    return null;
  }

  return (
    <div className={`glass-card rounded-xl p-5 border-l-4 border-violet-500 ${className}`}>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <h3 className="font-display font-semibold text-foreground text-sm flex items-center gap-2">
          🕸️ {t("Năng lực lập trình theo bài", "Programming Skill Map")}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300 font-mono">
            {pct}%
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-mono">
            {mastered}/{data.length} {t("đạt", "mastered")}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx="50%" cy="52%" outerRadius="72%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={t("Điểm", "Score")}
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(v: number) => [`${v}/100`, t("Điểm", "Score")]}
            labelFormatter={(_, payload) => (payload?.[0] as any)?.payload?.fullTitle || ""}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      {pct === 0 ? (
        <p className="text-xs text-muted-foreground text-center mt-1">
          {t(
            "Hoàn thành quiz các bài học để biểu đồ phản ánh năng lực của bạn.",
            "Submit lesson quizzes to grow your skill web.",
          )}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground text-center mt-1">
          {t(
            "★ là bài bạn đang học. Mỗi trục là 1 bài trong module.",
            "★ marks the current lesson. Each axis is a lesson in this module.",
          )}
        </p>
      )}
    </div>
  );
};

export default LessonModuleRadar;
