/**
 * @file MatchScoreRing.tsx
 * @description Circular progress ring displaying a 0-100 match score with band color.
 */
import { motion } from "framer-motion";
import type { MatchResult } from "@/lib/scholarshipMatcher";
import { BAND_COLOR, BAND_LABEL } from "@/lib/scholarshipMatcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface MatchScoreRingProps {
  result: MatchResult;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

const MatchScoreRing = ({
  result,
  size = 88,
  strokeWidth = 8,
  showLabel = true,
}: MatchScoreRingProps) => {
  const { t } = useLanguage();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (result.score / 100) * circumference;
  const colorClass = BAND_COLOR[result.band];
  const label = BAND_LABEL[result.band];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-muted/30 fill-none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={`fill-none ${colorClass}`}
            style={{ strokeDasharray: circumference }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-extrabold ${colorClass.split(" ")[0]}`}>
            {result.score}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={`text-[11px] font-semibold uppercase tracking-wide ${colorClass.split(" ")[0]}`}>
          {t(label.vi, label.en)}
        </span>
      )}
    </div>
  );
};

export default MatchScoreRing;
