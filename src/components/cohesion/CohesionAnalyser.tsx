/**
 * CohesionAnalyser - Paste a paragraph, get IELTS C&C band + full analysis.
 * Calls the analyse-cohesion edge function.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Loader2, RotateCcw, Sparkles, ArrowUp, BookmarkPlus,
  BookmarkCheck, CheckCircle2, XCircle, AlertTriangle, Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { recordPracticeBandSignal } from "@/lib/writingPracticeSignals";
import { appendCohesionNotebook, escapeCohesionHtml } from "./cohesionNotebook";

interface Props {
  taskType: 1 | 2;
}

type Usage = "good" | "overused" | "mechanical" | "misused" | "missing";

interface AnalysisResult {
  score: number;
  scoreLabel: string;
  linkersFound: { device: string; usage: Usage; note: string }[];
  referenceAnalysis: string;
  paragraphStructure: {
    hasTopicSentence: boolean;
    hasSupporting: boolean;
    hasConcluding: boolean;
    note: string;
  };
  strengths: string[];
  weaknesses: string[];
  rewrite: string;
  tips: string[];
}

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

const usageStyle: Record<Usage, string> = {
  good: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40",
  overused: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40",
  mechanical: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/40",
  misused: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40",
  missing: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/40",
};

const scoreColor = (s: number) =>
  s >= 8 ? "text-emerald-500" : s >= 6.5 ? "text-blue-500" : s >= 5 ? "text-amber-500" : "text-red-500";

const CohesionAnalyser = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const [paragraph, setParagraph] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const wordCount = paragraph.trim() ? paragraph.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (wordCount < 30) {
      toast.error(t("Đoạn văn cần ít nhất 30 từ", "Paragraph must be at least 30 words"));
      return;
    }
    if (paragraph.length > 3000) {
      toast.error(t("Đoạn văn quá dài (tối đa 3000 ký tự)", "Paragraph too long (max 3000 chars)"));
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyse-cohesion", {
        body: { paragraph: paragraph.trim(), taskType },
      });
      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 429) toast.error(t("Quá nhiều yêu cầu. Thử lại sau.", "Rate limit exceeded."));
        else if (status === 402) toast.error(t("AI hết tín dụng.", "AI credits exhausted."));
        else toast.error(t("Phân tích thất bại.", "Analysis failed."));
        return;
      }
      const analysed = data as AnalysisResult;
      setResult(analysed);
      setSaved(false);
      recordPracticeBandSignal({ crit: "CC", band: analysed?.score, taskType });
    } catch (e) {
      console.error(e);
      toast.error(t("Đã có lỗi xảy ra", "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result || saved || saving) return;
    setSaving(true);
    const ts = new Date().toLocaleString();
    const linkersHtml = (result.linkersFound || [])
      .map((l) => `<li><em>${escapeCohesionHtml(l.device)}</em> - <strong>${l.usage}</strong>: ${escapeCohesionHtml(l.note)}</li>`)
      .join("");
    const block =
      `<p><strong>🧠 Cohesion Analysis</strong> <em>(${ts})</em> - Band ${result.score}</p>` +
      `<p><strong>My paragraph:</strong> ${escapeCohesionHtml(paragraph.trim())}</p>` +
      (linkersHtml ? `<p><strong>Cohesive devices found:</strong></p><ul>${linkersHtml}</ul>` : "") +
      `<p><strong>Reference chain:</strong> ${escapeCohesionHtml(result.referenceAnalysis || "")}</p>` +
      `<p><strong>Band 8+ Rewrite:</strong> ${escapeCohesionHtml(result.rewrite || "")}</p>`;
    const ok = await appendCohesionNotebook(block, taskType, {
      success: (m) => toast.success(t("Đã lưu vào Sổ tay ghi chú", m)),
      error: (m) => toast.error(m),
      info: (m) => toast.message(t("Đăng nhập để lưu vào sổ tay", m)),
    });
    if (ok) setSaved(true);
    setSaving(false);
  };

  const structure = result?.paragraphStructure;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-primary" />
            {t("Phân tích Coherence & Cohesion đoạn văn của bạn", "Analyse your paragraph for Coherence & Cohesion")}
          </CardTitle>
          <p className="text-xs text-muted-foreground pt-1">
            {t(
              "Dán 1 đoạn 30-250 từ. AI sẽ chấm Band C&C, liệt kê cohesive devices, kiểm tra chuỗi tham chiếu và viết lại Band 8+.",
              "Paste a 30-250 word paragraph. AI will score C&C band, list cohesive devices, check reference chains, and rewrite at Band 8+."
            )}
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <Textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder={t("Dán đoạn văn của bạn ở đây...", "Paste your paragraph here...")}
            className="min-h-[180px] text-base"
            disabled={loading}
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className={`text-xs ${wordCount < 30 ? "text-amber-500" : wordCount > 250 ? "text-red-500" : "text-muted-foreground"}`}>
              {wordCount} {t("từ", "words")} {wordCount < 30 && t("(tối thiểu 30)", "(min 30)")}
            </span>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={loading || wordCount < 30}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("Đang phân tích...", "Analysing...")}</>
                ) : (
                  <><Send className="w-4 h-4 mr-2" />{t("Phân tích Cohesion", "Analyse Cohesion")}</>
                )}
              </Button>
              <Button variant="outline" onClick={() => { setParagraph(""); setResult(null); setSaved(false); }} disabled={loading}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {t("Xóa", "Clear")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {t("Kết quả phân tích Cohesion", "Cohesion Analysis Result")}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{t("Band C&C:", "C&C Band:")}</span>
                    <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>
                      {result.score}
                    </span>
                  </div>
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

                {/* Cohesive devices found */}
                {result.linkersFound?.length > 0 && (
                  <div className="p-3 bg-muted/40 rounded-lg">
                    <p className="font-medium text-sm mb-3">{t("Bản đồ cohesive devices", "Cohesive devices map")}</p>
                    <div className="space-y-2">
                      {result.linkersFound.map((l, i) => (
                        <div key={i} className={`p-2.5 rounded-md border text-sm ${usageStyle[l.usage] || usageStyle.good}`}>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold">"{l.device}"</span>
                            <Badge variant="outline" className="text-[10px] capitalize">{l.usage}</Badge>
                          </div>
                          <p className="text-xs opacity-90">{l.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reference analysis */}
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="font-medium text-sm mb-1">{t("Phân tích chuỗi tham chiếu", "Reference chain analysis")}</p>
                  <p className="text-sm text-foreground/80">{result.referenceAnalysis}</p>
                </div>

                {/* Structure */}
                {structure && (
                  <div className="p-3 bg-muted/40 rounded-lg space-y-2">
                    <p className="font-medium text-sm">{t("Cấu trúc đoạn văn", "Paragraph structure")}</p>
                    <div className="flex flex-wrap gap-2">
                      <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${structure.hasTopicSentence ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-red-500/15 text-red-700 dark:text-red-300"}`}>
                        {structure.hasTopicSentence ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {t("Câu chủ đề", "Topic sentence")}
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${structure.hasSupporting ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-red-500/15 text-red-700 dark:text-red-300"}`}>
                        {structure.hasSupporting ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {t("Câu bổ trợ", "Supporting")}
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${structure.hasConcluding ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-red-500/15 text-red-700 dark:text-red-300"}`}>
                        {structure.hasConcluding ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {t("Câu kết", "Concluding")}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 pt-1">{structure.note}</p>
                  </div>
                )}

                {/* Strengths / Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.strengths?.length > 0 && (
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="font-medium text-sm mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {t("Điểm mạnh", "Strengths")}
                      </p>
                      <ul className="space-y-1">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-foreground/80 flex gap-1.5"><span className="text-emerald-600">•</span>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.weaknesses?.length > 0 && (
                    <div className="p-3 bg-amber-500/10 rounded-lg">
                      <p className="font-medium text-sm mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        {t("Điểm yếu", "Weaknesses")}
                      </p>
                      <ul className="space-y-1">
                        {result.weaknesses.map((s, i) => (
                          <li key={i} className="text-sm text-foreground/80 flex gap-1.5"><span className="text-amber-600">•</span>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Rewrite */}
                {result.rewrite && (
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                    <p className="font-medium text-sm mb-2 flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-primary" />
                      {t("Phiên bản Band 8+ (cohesive devices được bôi đậm)", "Band 8+ Rewrite (cohesive devices bolded)")}
                    </p>
                    <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
                      {renderBold(result.rewrite)}
                    </p>
                  </div>
                )}

                {result.tips?.length > 0 && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm mb-2">{t("Mẹo cải thiện Cohesion", "Tips to improve Cohesion")}</p>
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

export default CohesionAnalyser;
