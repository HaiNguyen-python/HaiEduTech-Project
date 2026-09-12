// Shared IELTS writing grading result panel.
// Used by both the prompt-bank grader (IeltsWritingPractice) and the free
// Smart Grading tab so both views stay visually identical.
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2, Copy, Check, RefreshCw, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CriteriaDetail {
  score: number;
  label: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

export interface GradingResult {
  overall: number;
  criteria: CriteriaDetail[];
  errors: { error: string; correction: string; category: string }[];
  upgraded: string;
  advice: string;
}

export const getScoreColor = (score: number) => {
  if (score >= 7) return "text-green-500";
  if (score >= 6) return "text-yellow-500";
  return "text-red-500";
};

interface Props {
  result: GradingResult;
  upgradeLoading: boolean;
  onRetryUpgrade?: () => void;
  /** When provided, a "Download PDF" button appears under the overall band. */
  onExportPdf?: () => void;
}

const WritingResultPanel = ({ result, upgradeLoading, onRetryUpgrade, onExportPdf }: Props) => {
  const { t } = useLanguage();
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyUpgraded = () => {
    if (!result.upgraded) return;
    navigator.clipboard.writeText(result.upgraded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Overall Score */}
      <Card className="border-primary/30">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">{t("Điểm tổng", "Overall Band Score")}</p>
          <p className={`text-5xl font-bold ${getScoreColor(result.overall)}`}>{result.overall}</p>
          {onExportPdf && (
            <Button size="sm" variant="outline" className="mt-4" onClick={onExportPdf}>
              <Download className="w-4 h-4 mr-1.5" /> {t("Tải PDF", "Download PDF")}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Criteria */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📊 {t("Phân tích chi tiết", "Detailed Analysis")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {result.criteria.map((c, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedCriteria(expandedCriteria === i ? null : i)}
              >
                <span className="text-sm font-medium text-left">{c.label}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-sm font-bold ${getScoreColor(c.score)}`}>{c.score}</span>
                  {expandedCriteria === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>
              {expandedCriteria === i && (
                <div className="p-3 border-t text-sm space-y-3">
                  <div>
                    <p className="font-medium text-green-600 mb-1">✅ {t("Điểm mạnh", "Strengths")}</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {c.strengths.map((s, j) => <li key={j}>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-500 mb-1">⚠️ {t("Điểm yếu", "Weaknesses")}</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {c.weaknesses.map((w, j) => <li key={j}>{w}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-primary mb-1">💡 {t("Gợi ý", "Suggestions")}</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {c.suggestions.map((s, j) => <li key={j}>{s}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Errors */}
      {result.errors.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">🔍 {t("Lỗi cần sửa", "Error Highlights")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {result.errors.map((e, i) => (
              <div key={i} className="flex flex-col gap-1 p-2 bg-destructive/5 rounded-lg text-sm">
                <span><s className="text-destructive">{e.error}</s> → <strong className="text-green-600">{e.correction}</strong></span>
                <span className="text-xs text-muted-foreground">{e.category}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upgraded Version */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-base flex items-center gap-2">
              🌟 {t("Phiên bản Band 8.0+", "Band 8.0+ Version")}
              {upgradeLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
            </CardTitle>
            {result.upgraded && !upgradeLoading && (
              <Button variant="ghost" size="sm" onClick={handleCopyUpgraded}>
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? t("Đã sao chép", "Copied") : t("Sao chép", "Copy")}
              </Button>
            )}
            {!result.upgraded && !upgradeLoading && onRetryUpgrade && (
              <Button variant="outline" size="sm" onClick={onRetryUpgrade}>
                <RefreshCw className="w-4 h-4 mr-1" /> {t("Thử lại", "Retry")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {result.upgraded ? (
            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-4 rounded-lg">
              <ReactMarkdown>{result.upgraded}</ReactMarkdown>
            </div>
          ) : upgradeLoading ? (
            <p className="text-sm text-muted-foreground italic">
              {t("AI đang nâng cấp bài viết lên Band 8.0+...", "AI is upgrading your essay to Band 8.0+...")}
            </p>
          ) : (
            <p className="text-sm text-destructive">
              {t("Chưa tạo được bài mẫu Band 8.0+. Hãy bấm Thử lại.", "The Band 8.0+ version could not be generated. Press Retry.")}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Advice */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">📈 {t("Lời khuyên", "Advice")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.advice}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WritingResultPanel;
