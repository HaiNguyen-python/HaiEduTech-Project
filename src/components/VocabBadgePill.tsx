/**
 * @file VocabBadgePill.tsx
 * @description Small milestone badge shown next to a learner's name on the
 *              vocabulary leaderboards. Icon-only on mobile to avoid wrapping.
 */
import { getBadgeForScore, getNextBadge } from "@/lib/vocabBadges";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  score: number;
  className?: string;
  /** Show the tier name on every breakpoint (used on bigger cards) */
  alwaysShowLabel?: boolean;
}

const VocabBadgePill = ({ score, className = "", alwaysShowLabel = false }: Props) => {
  const { t } = useLanguage();
  const badge = getBadgeForScore(score);
  if (!badge) return null;
  const next = getNextBadge(score);
  const title = next
    ? t(
        `Đã thuộc ${score} từ - còn ${next.threshold - score} từ nữa lên bậc ${next.nameVi}`,
        `${score} words mastered - ${next.threshold - score} more to reach ${next.name}`,
      )
    : t(`Đã thuộc ${score} từ - bậc cao nhất!`, `${score} words mastered - top tier!`);

  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-bold align-middle ${badge.pill} ${
        badge.glow ? "shadow-[0_0_10px_hsl(var(--primary)/0.45)]" : ""
      } ${className}`}
    >
      <span aria-hidden="true">{badge.emoji}</span>
      <span className={alwaysShowLabel ? "" : "hidden sm:inline"}>
        {t(badge.nameVi, badge.name)}
      </span>
    </span>
  );
};

export default VocabBadgePill;
