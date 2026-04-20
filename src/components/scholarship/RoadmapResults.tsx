import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, ExternalLink, CheckCircle2, FileText, Award, AlertTriangle,
  Sparkles, MessageSquare, RotateCcw, UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export interface ScholarshipResult {
  name: string;
  host: string;
  deadline: string;
  deadlineUrgency?: "tight" | "normal" | "rolling";
  fundingType: string;
  eligibility: string;
  eligibilityMatch?: "high" | "medium" | "low";
  documents: string[];
  motivationLetterOutline: string[];
  applyUrl?: string;
  whyMatch?: string;
}

export interface AdvisorResponse {
  summary: string;
  scholarships: ScholarshipResult[];
  citations?: string[];
}

interface RoadmapResultsProps {
  data: AdvisorResponse;
  onReset: () => void;
}

const URGENCY_COLOR: Record<string, string> = {
  tight: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30",
  normal: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  rolling: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
};

const MATCH_COLOR: Record<string, string> = {
  high: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  medium: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  low: "bg-slate-500/15 text-slate-700 dark:text-slate-400",
};

const ScholarshipCard = ({
  s,
  index,
}: {
  s: ScholarshipResult;
  index: number;
}) => {
  const { t } = useLanguage();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const docCount = s.documents?.length ?? 0;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = docCount ? Math.round((checkedCount / docCount) * 100) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-1">
            {s.name}
          </h3>
          <p className="text-sm text-muted-foreground">{s.host}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {s.eligibilityMatch && (
            <Badge variant="secondary" className={`text-xs ${MATCH_COLOR[s.eligibilityMatch]}`}>
              {s.eligibilityMatch === "high"
                ? t("✓ Phù hợp cao", "✓ High match")
                : s.eligibilityMatch === "medium"
                  ? t("Phù hợp", "Match")
                  : t("Cần kiểm tra", "Verify")}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-violet-500/15 text-violet-700 dark:text-violet-400">
            {s.fundingType}
          </Badge>
        </div>
      </div>

      {/* Why match */}
      {s.whyMatch && (
        <div className="mb-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
            <span className="font-semibold">💚 {t("Vì sao phù hợp:", "Why it matches:")}</span> {s.whyMatch}
          </p>
        </div>
      )}

      {/* Deadline + eligibility */}
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div
          className={`rounded-lg border px-3 py-2 text-xs sm:text-sm flex items-center gap-2 ${
            s.deadlineUrgency ? URGENCY_COLOR[s.deadlineUrgency] : "bg-muted border-border"
          }`}
        >
          {s.deadlineUrgency === "tight" ? (
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <Calendar className="h-4 w-4 flex-shrink-0" />
          )}
          <span className="font-medium">{s.deadline}</span>
        </div>
        <div className="rounded-lg bg-muted px-3 py-2 text-xs sm:text-sm">
          <span className="font-semibold text-foreground">{t("Yêu cầu: ", "Eligibility: ")}</span>
          <span className="text-muted-foreground">{s.eligibility}</span>
        </div>
      </div>

      {/* Application checklist */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {t("Checklist hồ sơ", "Application Checklist")}
          </h4>
          <span className="text-xs text-muted-foreground">
            {checkedCount}/{docCount} • {progress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-emerald-500"
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-1.5">
          {s.documents?.map((doc, i) => {
            const isMotivation = /motivation|personal statement|sop/i.test(doc);
            const isRecommendation = /recommendation|reference letter/i.test(doc);
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  checked={!!checked[i]}
                  onCheckedChange={(v) => setChecked((p) => ({ ...p, [i]: !!v }))}
                  id={`doc-${index}-${i}`}
                />
                <label
                  htmlFor={`doc-${index}-${i}`}
                  className={`flex-1 text-xs sm:text-sm cursor-pointer ${
                    checked[i] ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {doc}
                </label>
                {isMotivation && (
                  <Link
                    to="/ielts-writing-practice"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline px-2 py-0.5 rounded-md bg-primary/10"
                  >
                    <Sparkles className="h-3 w-3" />
                    {t("Mr. Hai viết", "Mr. Hai writes")}
                  </Link>
                )}
                {isRecommendation && (
                  <Link
                    to="/ai-grading"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline px-2 py-0.5 rounded-md bg-primary/10"
                  >
                    <Sparkles className="h-3 w-3" />
                    {t("Mr. Hai mẫu", "Mr. Hai drafts")}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation letter outline */}
      {s.motivationLetterOutline?.length > 0 && (
        <details className="mb-4 rounded-lg border border-border bg-muted/30 p-3 group">
          <summary className="cursor-pointer text-sm font-semibold text-foreground flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-primary" />
            {t("Cấu trúc Motivation Letter gợi ý", "Suggested Motivation Letter Outline")}
          </summary>
          <ol className="mt-3 space-y-1.5 text-xs sm:text-sm text-muted-foreground list-decimal list-inside">
            {s.motivationLetterOutline.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </details>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
        {s.applyUrl && (
          <a
            href={s.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t("Nộp hồ sơ", "Apply Now")} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs sm:text-sm font-semibold hover:bg-muted"
        >
          <UserCheck className="h-3.5 w-3.5" />
          {t("Yêu cầu Thầy Hải review", "Request Teacher Hai Review")}
        </Link>
      </div>
    </motion.article>
  );
};

const RoadmapResults = ({ data, onReset }: RoadmapResultsProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Summary banner */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-1">
              {t("🎯 Lộ trình học bổng cá nhân hóa", "🎯 My Personalized Roadmap")}
            </h2>
            <p className="text-sm text-muted-foreground">{data.summary}</p>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t("Tư vấn lại", "Restart")}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {data.scholarships.map((s, i) => (
          <ScholarshipCard key={i} s={s} index={i} />
        ))}
      </div>

      {/* Citations */}
      {data.citations && data.citations.length > 0 && (
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            {t("Nguồn Mr. Hai tham khảo:", "Mr. Hai's sources:")}
          </h4>
          <ul className="space-y-1">
            {data.citations.slice(0, 8).map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-primary hover:underline break-all"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default RoadmapResults;
