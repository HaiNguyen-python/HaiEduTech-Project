// RL-inspired next-step recommendation component
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, ChevronRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { ExtendedProgrammingModule } from "@/data/curriculum/types";

interface Props {
  modules: ExtendedProgrammingModule[];
  currentModuleId: string;
  className?: string;
}

// Simple RL-inspired logic: recommend next lesson based on completion + weakness
function getRecommendation(modules: ExtendedProgrammingModule[], currentModuleId: string) {
  const scores: { moduleId: string; score: number; completed: boolean; level: number }[] = [];

  for (const mod of modules) {
    const stored = localStorage.getItem(`haiedu_skill_${mod.id}`);
    const score = stored ? parseInt(stored, 10) : 0;
    const level = mod.lessons[0]?.level || 1;
    scores.push({ moduleId: mod.id, score, completed: score >= 70, level });
  }

  // Priority 1: Find incomplete modules at current or lower level
  const currentIdx = scores.findIndex(s => s.moduleId === currentModuleId);
  const currentLevel = currentIdx >= 0 ? scores[currentIdx].level : 1;

  // Find weakest area (lowest score, not yet completed)
  const incomplete = scores
    .filter(s => !s.completed && s.moduleId !== currentModuleId && s.level <= currentLevel + 1)
    .sort((a, b) => a.score - b.score);

  if (incomplete.length > 0) {
    const target = incomplete[0];
    const mod = modules.find(m => m.id === target.moduleId);
    if (mod) {
      const reason = target.score === 0
        ? "Chưa bắt đầu"
        : `Điểm hiện tại: ${target.score}% — cần cải thiện`;
      const reasonEn = target.score === 0
        ? "Not started yet"
        : `Current score: ${target.score}% — needs improvement`;
      return { module: mod, reason, reasonEn, type: "weakness" as const };
    }
  }

  // Priority 2: Next level unlock
  const nextLevel = scores
    .filter(s => s.level === currentLevel + 1 && !s.completed)
    .sort((a, b) => a.score - b.score);

  if (nextLevel.length > 0) {
    const target = nextLevel[0];
    const mod = modules.find(m => m.id === target.moduleId);
    if (mod) {
      return {
        module: mod,
        reason: "Đã sẵn sàng cho cấp độ tiếp theo!",
        reasonEn: "Ready for the next level!",
        type: "advancement" as const,
      };
    }
  }

  // Priority 3: Review lowest score
  const lowest = scores
    .filter(s => s.moduleId !== currentModuleId)
    .sort((a, b) => a.score - b.score)[0];

  if (lowest) {
    const mod = modules.find(m => m.id === lowest.moduleId);
    if (mod) {
      return {
        module: mod,
        reason: "Ôn tập để củng cố kiến thức",
        reasonEn: "Review to strengthen knowledge",
        type: "review" as const,
      };
    }
  }

  return null;
}

const LearningRecommendation = ({ modules, currentModuleId, className = "" }: Props) => {
  const { t } = useLanguage();
  const rec = getRecommendation(modules, currentModuleId);

  if (!rec) return null;

  const typeConfig = {
    weakness: { icon: "🎯", color: "border-amber-500/30 bg-amber-500/5" },
    advancement: { icon: "🚀", color: "border-green-500/30 bg-green-500/5" },
    review: { icon: "📖", color: "border-blue-500/30 bg-blue-500/5" },
  };

  const config = typeConfig[rec.type];

  return (
    <div className={`glass-card rounded-xl p-4 border ${config.color} ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary">
          {t("Gợi ý tiếp theo", "Next Recommendation")}
        </span>
        <TrendingUp className="w-3 h-3 text-muted-foreground" />
      </div>
      <Link
        to={`/programming/${rec.module.id}`}
        className="group flex items-center justify-between hover:bg-secondary/50 rounded-lg p-2 -m-1 transition-colors"
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {config.icon} {t(rec.module.title, rec.module.titleEn)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t(rec.reason, rec.reasonEn)}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
      </Link>
    </div>
  );
};

export default LearningRecommendation;
