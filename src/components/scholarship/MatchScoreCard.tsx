/**
 * @file MatchScoreCard.tsx
 * @description Combined ring + reasons + improvement tips for a single scholarship.
 */
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MatchScoreRing from "./MatchScoreRing";
import type { MatchResult } from "@/lib/scholarshipMatcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface MatchScoreCardProps {
  result: MatchResult;
  scholarshipName: string;
}

const MatchScoreCard = ({ result, scholarshipName }: MatchScoreCardProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-4 flex-wrap">
            <MatchScoreRing result={result} />
            <div className="flex-1 min-w-[200px] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">
                  {t("Mức độ phù hợp với", "Match for")} {scholarshipName}
                </span>
              </div>
              {result.reasons.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {t("Điểm mạnh", "Your strengths")}
                  </div>
                  <ul className="text-xs space-y-0.5 text-muted-foreground">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span className="text-emerald-500">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.improvements.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {t("Cách cải thiện", "How to improve")}
                  </div>
                  <ul className="text-xs space-y-0.5 text-muted-foreground">
                    {result.improvements.map((r, i) => (
                      <li key={i} className="flex gap-1.5">
                        <span className="text-amber-500">→</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchScoreCard;
