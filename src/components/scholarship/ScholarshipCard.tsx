import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import MatchScoreRing from "@/components/scholarship/MatchScoreRing";
import { computeMatchScore } from "@/lib/scholarshipMatcher";
import type { Scholarship } from "@/data/globalScholarshipData";

const LEVEL_COLORS: Record<string, string> = {
  Bachelor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Master: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  PhD: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

interface Props {
  scholarship: Scholarship;
  index: number;
  profile?: any;
}

const ScholarshipCard = ({ scholarship: s, index, profile }: Props) => {
  const { t, lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const matchResult = profile && (profile.gpa || profile.ielts_score || profile.target_country)
    ? computeMatchScore(profile, s)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
    >
      <Card className="group hover:shadow-md transition-all h-full flex flex-col">
        <CardContent className="p-5 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{s.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">{t(s.countryVi, s.country)}</p>
              {s.isFeatured && (
                <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                  ⭐ {t("Nổi bật", "Featured")}
                </Badge>
              )}
            </div>
            {matchResult && (
              <div className="flex-shrink-0">
                <MatchScoreRing result={matchResult} size={56} strokeWidth={6} showLabel={false} />
              </div>
            )}
          </div>

          {matchResult && matchResult.improvements.length > 0 && (
            <div className="mb-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-2">
              <div className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 mb-0.5">
                💡 {t("Cách cải thiện", "How to improve")}
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-2">
                {matchResult.improvements[0]}
              </p>
            </div>
          )}

          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {t(s.nameVi, s.name)}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {t(s.summaryVi, s.summaryEn)}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {s.levels.map((level) => (
              <Badge key={level} variant="secondary" className={`text-xs ${LEVEL_COLORS[level]}`}>
                {level}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3" />
            <span>{t("Hạn nộp: ", "Deadline: ")}{s.deadline}</span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-medium text-primary mb-2 hover:underline"
          >
            {isExpanded ? (
              <>{t("Thu gọn", "Collapse")} <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>{t("Xem chi tiết", "View details")} <ChevronDown className="h-3 w-3" /></>
            )}
          </button>

          {isExpanded && (
            <div className="text-xs space-y-3 mb-3 animate-in fade-in slide-in-from-top-2">
              <div>
                <p className="font-semibold text-foreground mb-1">{t("Quyền lợi:", "Benefits:")}</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                  {(lang === "vi" ? s.benefitsVi : s.benefitsEn).map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">{t("Điều kiện:", "Requirements:")}</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                  {(lang === "vi" ? s.requirementsVi : s.requirementsEn).map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="mt-auto pt-2">
            <a
              href={s.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {t("Nộp hồ sơ", "Apply Now")} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScholarshipCard;
