// Skill radar chart for tracking learning progress across sub-domains
import { useLanguage } from "@/contexts/LanguageContext";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip
} from "recharts";

interface SkillData {
  subject: string;
  score: number;
  fullMark: number;
}

interface Props {
  pillarId: string;
  className?: string;
}

// Skill domains per pillar
const skillDomains: Record<string, { name: string; nameEn: string; key: string }[]> = {
  "ai-foundation": [
    { name: "Lý thuyết AI", nameEn: "AI Theory", key: "ai-history" },
    { name: "Neural Networks", nameEn: "Neural Networks", key: "ai-neural-basics" },
    { name: "Activation & Loss", nameEn: "Activation & Loss", key: "ai-activation" },
    { name: "CNN/RNN", nameEn: "CNN/RNN", key: "ai-cnn" },
    { name: "Transformer", nameEn: "Transformer", key: "ai-transformer" },
    { name: "Prompt Engineering", nameEn: "Prompt Engineering", key: "ai-llm-prompt" },
  ],
  sql: [
    { name: "SELECT cơ bản", nameEn: "Basic SELECT", key: "sql-select-basics" },
    { name: "WHERE & Filter", nameEn: "WHERE & Filter", key: "sql-where-filter" },
    { name: "Aggregate", nameEn: "Aggregate", key: "sql-aggregate" },
    { name: "JOINs", nameEn: "JOINs", key: "sql-joins" },
    { name: "Window Functions", nameEn: "Window Functions", key: "sql-window-func" },
    { name: "Optimization", nameEn: "Optimization", key: "sql-query-opt" },
  ],
  "data-eng": [
    { name: "Pandas", nameEn: "Pandas", key: "de-pandas-basics" },
    { name: "Data Cleaning", nameEn: "Data Cleaning", key: "de-data-cleaning" },
    { name: "ETL Pipeline", nameEn: "ETL Pipeline", key: "de-etl" },
    { name: "Data Modeling", nameEn: "Data Modeling", key: "de-data-modeling" },
    { name: "Orchestration", nameEn: "Orchestration", key: "de-orchestration" },
    { name: "Production", nameEn: "Production", key: "de-production" },
  ],
  ml: [
    { name: "Regression", nameEn: "Regression", key: "ml-linear-reg" },
    { name: "Classification", nameEn: "Classification", key: "ml-logistic-reg" },
    { name: "Trees & Ensemble", nameEn: "Trees & Ensemble", key: "ml-random-forest" },
    { name: "Clustering", nameEn: "Clustering", key: "ml-kmeans" },
    { name: "Feature Eng.", nameEn: "Feature Eng.", key: "ml-feature-eng" },
    { name: "MLOps", nameEn: "MLOps", key: "ml-mlops" },
  ],
};

// Read completion scores from localStorage
function getSkillScores(pillarId: string): SkillData[] {
  const domains = skillDomains[pillarId] || [];
  return domains.map(d => {
    const stored = localStorage.getItem(`haiedu_skill_${d.key}`);
    return {
      subject: d.nameEn,
      score: stored ? Math.min(parseInt(stored, 10), 100) : 0,
      fullMark: 100,
    };
  });
}

const SkillRadarChart = ({ pillarId, className = "" }: Props) => {
  const { t } = useLanguage();
  const data = getSkillScores(pillarId);
  const domains = skillDomains[pillarId];

  if (!domains || domains.length === 0) return null;

  const totalScore = data.reduce((s, d) => s + d.score, 0);
  const maxTotal = data.length * 100;
  const pct = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;

  return (
    <div className={`glass-card rounded-xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground text-sm">
          📊 {t("Biểu đồ kỹ năng", "Skill Radar")}
        </h3>
        <span className="text-xs font-bold text-primary">{pct}%</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      {pct === 0 && (
        <p className="text-xs text-muted-foreground text-center mt-1">
          {t("Hoàn thành bài học để xem tiến trình!", "Complete lessons to see progress!")}
        </p>
      )}
    </div>
  );
};

export default SkillRadarChart;

// Utility: update skill score when a quiz is completed
export function updateSkillScore(moduleId: string, quizScore: number, totalQuestions: number) {
  const key = `haiedu_skill_${moduleId}`;
  const current = parseInt(localStorage.getItem(key) || "0", 10);
  const newScore = Math.round((quizScore / totalQuestions) * 100);
  // Keep highest score
  if (newScore > current) {
    localStorage.setItem(key, String(newScore));
  }
}
