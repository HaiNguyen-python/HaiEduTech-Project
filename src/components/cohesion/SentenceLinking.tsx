/**
 * SentenceLinking - Join two separate sentences into one cohesive sentence.
 * Reuses grade-phrase-sentence (passes "join the pair using cohesive device" as target).
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Loader2, CheckCircle2, RotateCcw, Sparkles, ArrowUp,
  BookmarkPlus, BookmarkCheck, Eye, Shuffle, Lightbulb, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { recordPracticeSignal } from "@/lib/writingPracticeSignals";
import { LINKING_PAIRS, LinkingPair } from "@/data/ieltsCohesionBank";
import { appendCohesionNotebook, escapeCohesionHtml } from "./cohesionNotebook";

interface Props {
  taskType: 1 | 2;
}

interface GradeResult {
  score: number;
  phraseUsedCorrectly: boolean;
  grammarFeedback: string;
  phraseFeedback: string;
  upgradedVersion: string;
  tips: string[];
}

const scoreColor = (s: number) =>
  s >= 8 ? "text-emerald-500" : s >= 6 ? "text-blue-500" : s >= 4 ? "text-amber-500" : "text-red-500";

const renderBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-primary font-semibold">{p.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const SentenceLinking = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const pool = useMemo(
    () => LINKING_PAIRS.filter((p) => p.taskType === taskType),
    [taskType]
  );
  const [idx, setIdx] = useState(0);
  const [combined, setCombined] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const current: LinkingPair | undefined = pool[idx];

  if (!current) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          {t("Chưa có cặp câu cho task này.", "No pairs for this task yet.")}
        </CardContent>
      </Card>
    );
  }

  const goNext = () => {
    setIdx((idx + 1) % pool.length);
    setCombined("");
    setShowModel(false);
    setResult(null);
    setSaved(false);
  };

  const handleSubmit = async () => {
    if (combined.trim().length < 10) {
      toast.error(t("Câu của bạn quá ngắn", "Your combined sentence is too short"));
      return;
    }
    setGrading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-phrase-sentence", {
        body: {
          phrase: `cohesive combination of: "${current.sentenceA}" + "${current.sentenceB}"`,
          phraseMeaning: `Suggested linkers: ${current.suggestedLinkers.join(", ")} | Model answers: ${current.modelAnswers.join(" || ")}`,
          userSentence: combined.trim(),
          taskType,
        },
      });
      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 429) toast.error(t("Quá nhiều yêu cầu. Thử lại sau.", "Rate limit exceeded."));
        else if (status === 402) toast.error(t("AI hết tín dụng.", "AI credits exhausted."));
        else toast.error(t("Chấm điểm thất bại.", "Grading failed."));
        return;
      }
      const graded = data as GradeResult;
      setResult(graded);
      setSaved(false);
      recordPracticeSignal({ crit: "CC", score10: graded?.score, taskType });
    } catch (e) {
      console.error(e);
      toast.error(t("Đã có lỗi xảy ra", "Something went wrong"));
    } finally {
      setGrading(false);
    }
  };

  const handleExportPdf = () => {
    if (!result) return;
    openWritingPdf({
      title: `IELTS Writing Task ${taskType} - Sentence Linking`,
      subtitle: current.topic,
      meta: [{ label: "Score", value: `${result.score}/10` }],
      sections: [
        {
          heading: "Source sentences",
          kind: "list",
          items: [`A: ${current.sentenceA}`, `B: ${current.sentenceB}`],
        },
        {
          heading: "Suggested linkers",
          kind: "list",
          items: current.suggestedLinkers || [],
        },
        { heading: "Your combined sentence", kind: "text", text: combined.trim() },
        { heading: "Cohesion feedback", kind: "text", text: result.phraseFeedback },
        { heading: "Grammar feedback", kind: "text", text: result.grammarFeedback },
        { heading: "Band 7.5+ upgrade", kind: "text", text: result.upgradedVersion },
        { heading: "Model answers", kind: "list", items: current.modelAnswers || [] },
        { heading: "Tips to improve", kind: "list", items: result.tips || [] },
      ],
      fileName: `ielts-sentence-linking-task${taskType}`,
    });
  };

  const handleSave = async () => {
    if (!result || saved || saving) return;
    setSaving(true);
    const ts = new Date().toLocaleString();
    const block =
      `<p><strong>🔗 Sentence Linking: ${escapeCohesionHtml(current.topic)}</strong> <em>(${ts})</em></p>` +
      `<p><em>A:</em> ${escapeCohesionHtml(current.sentenceA)}<br/><em>B:</em> ${escapeCohesionHtml(current.sentenceB)}</p>` +
      `<p><strong>My combined:</strong> ${escapeCohesionHtml(combined.trim())}</p>` +
      `<p><strong>Band 7.5+ Upgrade:</strong> ${escapeCohesionHtml(result.upgradedVersion || "")}</p>` +
      `<p><strong>Model answer:</strong> ${escapeCohesionHtml(current.modelAnswers[0] || "")}</p>`;
    const ok = await appendCohesionNotebook(block, taskType, {
      success: (m) => toast.success(t("Đã lưu vào Sổ tay ghi chú", m)),
      error: (m) => toast.error(m),
      info: (m) => toast.message(t("Đăng nhập để lưu vào sổ tay", m)),
    });
    if (ok) setSaved(true);
    setSaving(false);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("Nối 2 câu thành 1 câu mạch lạc", "Combine two sentences into one cohesive sentence")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{idx + 1} / {pool.length}</Badge>
              <Badge variant="outline">{current.topic}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-blue-500">
            <p className="text-xs text-muted-foreground font-medium mb-1">A</p>
            <p className="text-[15px] text-foreground italic">{current.sentenceA}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-emerald-500">
            <p className="text-xs text-muted-foreground font-medium mb-1">B</p>
            <p className="text-[15px] text-foreground italic">{current.sentenceB}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-xs text-muted-foreground mr-1">{t("Gợi ý liên từ:", "Suggested linkers:")}</span>
            {current.suggestedLinkers.map((l) => (
              <Badge key={l} variant="outline" className="text-[10px] bg-primary/5">{l}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {t("Viết lại thành 1 câu mạch lạc Band 7+", "Rewrite as one cohesive Band 7+ sentence")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={combined}
            onChange={(e) => setCombined(e.target.value)}
            placeholder={t("Viết câu kết hợp của bạn ở đây...", "Write your combined sentence here...")}
            className="min-h-[100px] text-base"
            disabled={grading}
          />
          {showModel && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                {t("Đáp án mẫu Band 7+:", "Model answers (Band 7+):")}
              </p>
              {current.modelAnswers.map((m, i) => (
                <p key={i} className="text-sm text-foreground italic">• {m}</p>
              ))}
            </div>
          )}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSubmit} disabled={grading || !combined.trim()}>
              {grading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("Đang chấm...", "Grading...")}</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />{t("Nộp bài chấm", "Submit for Grading")}</>
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowModel((v) => !v)}>
              <Eye className="w-4 h-4 mr-2" />
              {showModel ? t("Ẩn đáp án", "Hide Model") : t("Xem đáp án", "Show Model")}
            </Button>
            <Button variant="outline" onClick={() => { setCombined(""); setResult(null); setSaved(false); }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("Viết lại", "Reset")}
            </Button>
            <Button variant="secondary" onClick={goNext}>
              <Shuffle className="w-4 h-4 mr-2" />
              {t("Cặp câu khác", "Next Pair")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {t("Kết quả AI", "AI Feedback")}
                  </CardTitle>
                  <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>
                    {result.score}/10
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant={saved ? "outline" : "default"}
                    onClick={handleSave}
                    disabled={saved || saving}
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />{t("Đang lưu...", "Saving...")}</>
                    ) : saved ? (
                      <><BookmarkCheck className="w-4 h-4 mr-1.5 text-emerald-600" />{t("Đã lưu vào Sổ tay", "Saved to Notebook")}</>
                    ) : (
                      <><BookmarkPlus className="w-4 h-4 mr-1.5" />{t("Lưu vào Sổ tay", "Save to Notebook")}</>
                    )}
                  </Button>
                </div>

                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="font-medium text-sm mb-1 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    {t("Phản hồi cohesion", "Cohesion Feedback")}
                  </p>
                  <p className="text-sm text-foreground/80">{result.phraseFeedback}</p>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="font-medium text-sm mb-2 flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-primary" />
                    {t("Phiên bản nâng cấp Band 7.5+", "Band 7.5+ Upgrade")}
                  </p>
                  <p className="text-[15px] leading-relaxed text-foreground">
                    {renderBold(result.upgradedVersion)}
                  </p>
                </div>

                {result.tips?.length > 0 && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm mb-2">{t("Mẹo cải thiện", "Tips to improve")}</p>
                    <ul className="space-y-1.5">
                      {result.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SentenceLinking;
