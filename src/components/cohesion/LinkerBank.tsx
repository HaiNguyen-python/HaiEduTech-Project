/**
 * LinkerBank - Practise IELTS linking devices by writing sentences.
 * Reuses grade-phrase-sentence edge function (passes the linker as "phrase").
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, Send, Loader2, CheckCircle2, XCircle, Lightbulb, ArrowUp,
  RotateCcw, AlertTriangle, BookmarkPlus, BookmarkCheck, Sparkles, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { recordPracticeSignal } from "@/lib/writingPracticeSignals";
import { LINKERS, LINKER_CATEGORIES, LinkerItem } from "@/data/ieltsCohesionBank";
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

const categoryColor = (cat: string) => {
  const map: Record<string, string> = {
    adding: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30",
    contrasting: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30",
    "cause-effect": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
    exemplifying: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30",
    sequencing: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30",
    summarising: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30",
    emphasising: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30",
    conceding: "bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30",
    comparing: "bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30",
    referencing: "bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30",
  };
  return map[cat] || "bg-muted text-foreground border-border";
};

const scoreColor = (s: number) =>
  s >= 8 ? "text-emerald-500" : s >= 6 ? "text-blue-500" : s >= 4 ? "text-amber-500" : "text-red-500";

const LinkerBank = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selected, setSelected] = useState<LinkerItem | null>(null);
  const [sentence, setSentence] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const list = LINKERS.filter((l) => l.task === "both" || l.task === taskType);
    if (activeCategory === "all") return list;
    return list.filter((l) => l.category === activeCategory);
  }, [taskType, activeCategory]);

  const handleSelect = (l: LinkerItem) => {
    setSelected(l);
    setSentence("");
    setResult(null);
    setSaved(false);
  };

  const handleSubmit = async () => {
    if (!selected) {
      toast.error(t("Chọn 1 liên từ trước", "Select a linker first"));
      return;
    }
    if (sentence.trim().length < 5) {
      toast.error(t("Câu của bạn quá ngắn", "Your sentence is too short"));
      return;
    }
    setGrading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-phrase-sentence", {
        body: {
          phrase: selected.linker,
          phraseMeaning: `${selected.meaning} | Model example: ${selected.example}${selected.warning ? " | Warning: " + selected.warning : ""}`,
          userSentence: sentence.trim(),
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

  const handleSave = async () => {
    if (!selected || !result || saved || saving) return;
    setSaving(true);
    const ts = new Date().toLocaleString();
    const block =
      `<p><strong>🔗 "${escapeCohesionHtml(selected.linker)}"</strong> <em>(${ts})</em></p>` +
      `<p><strong>My sentence:</strong> ${escapeCohesionHtml(sentence.trim())}</p>` +
      `<p><strong>Band 7.5+ Upgrade:</strong> ${escapeCohesionHtml(result.upgradedVersion || "")}</p>`;
    const ok = await appendCohesionNotebook(block, taskType, {
      success: (m) => toast.success(t("Đã lưu vào Sổ tay ghi chú", m)),
      error: (m) => toast.error(m),
      info: (m) => toast.message(t("Đăng nhập để lưu vào sổ tay", m)),
    });
    if (ok) setSaved(true);
    setSaving(false);
  };

  const handleExportPdf = () => {
    if (!selected || !result) return;
    openWritingPdf({
      title: `IELTS Writing Task ${taskType} - Linker Bank`,
      subtitle: selected.linker,
      meta: [
        { label: "Score", value: `${result.score}/10` },
        { label: "Category", value: String(selected.category ?? "") },
        { label: "Level", value: String(selected.level ?? "") },
      ],
      sections: [
        {
          heading: "Linker",
          kind: "text",
          text: `${selected.linker}\n\n${selected.meaning}\n\nModel example: ${selected.example}${selected.warning ? `\n\nWarning: ${selected.warning}` : ""}`,
        },
        { heading: "Your sentence", kind: "text", text: sentence.trim() },
        { heading: "Linker usage feedback", kind: "text", text: result.phraseFeedback },
        { heading: "Grammar feedback", kind: "text", text: result.grammarFeedback },
        { heading: "Band 7.5+ upgrade", kind: "text", text: result.upgradedVersion },
        { heading: "Tips to improve", kind: "list", items: result.tips || [] },
      ],
      fileName: `ielts-linker-bank-task${taskType}`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* LEFT: Linker list */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              {t("Ngân hàng liên từ", "Linker Bank")}
              <Badge variant="secondary" className="ml-auto">
                {filtered.length} {t("liên từ", "linkers")}
              </Badge>
            </CardTitle>
            <div className="flex gap-1.5 pt-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
              {LINKER_CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveCategory(c.value)}
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-colors whitespace-nowrap ${
                    activeCategory === c.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 border-border hover:bg-muted"
                  }`}
                >
                  {t(c.label, c.labelEn)}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto space-y-2">
            {filtered.map((l) => {
              const active = selected?.id === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => handleSelect(l)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-foreground text-[14px] leading-snug">
                      {l.linker}
                    </span>
                    <Badge variant="outline" className={`shrink-0 text-[10px] capitalize ${categoryColor(l.category)}`}>
                      {l.category.replace("-", " / ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{l.meaning}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Practice area */}
      <div className="lg:col-span-3 space-y-4">
        {!selected ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center text-muted-foreground">
              <Link2 className="w-12 h-12 mx-auto mb-3 text-primary/50" />
              <p className="text-base">
                {t("Chọn 1 liên từ bên trái để bắt đầu luyện", "Select a linker on the left to start practising")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-foreground">"{selected.linker}"</h3>
                  <Badge variant="outline" className={categoryColor(selected.category)}>
                    {selected.level}
                  </Badge>
                  <Badge variant="outline" className={`capitalize ${categoryColor(selected.category)}`}>
                    {selected.category.replace("-", " / ")}
                  </Badge>
                </div>
                <p className="text-sm">
                  <span className="font-medium text-muted-foreground">{t("Nghĩa:", "Meaning:")} </span>
                  <span className="text-foreground">{selected.meaning}</span>
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    {t("Ví dụ Band 7+:", "Band 7+ Example:")}
                  </p>
                  <p className="text-[15px] text-foreground italic leading-relaxed">
                    {renderBold(selected.example)}
                  </p>
                </div>
                {selected.warning && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">{selected.warning}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {t("Viết câu của bạn dùng liên từ trên", "Write your own sentence using the linker above")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  placeholder={t("Gõ câu của bạn ở đây...", "Type your sentence here...")}
                  className="min-h-[120px] text-base"
                  disabled={grading}
                />
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={handleSubmit} disabled={grading || !sentence.trim()}>
                    {grading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("Đang chấm...", "Grading...")}</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" />{t("Nộp bài chấm", "Submit for Grading")}</>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => { setSentence(""); setResult(null); setSaved(false); }} disabled={grading}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("Viết lại", "Reset")}
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
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{t("Điểm:", "Score:")}</span>
                          <span className={`text-3xl font-bold ${scoreColor(result.score)}`}>
                            {result.score}/10
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-end flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={handleExportPdf}>
                          <Download className="w-4 h-4 mr-1.5" />{t("Tải PDF", "Download PDF")}
                        </Button>
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

                      <div className={`flex items-start gap-2 p-3 rounded-lg ${
                        result.phraseUsedCorrectly ? "bg-emerald-500/10" : "bg-amber-500/10"
                      }`}>
                        {result.phraseUsedCorrectly ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-sm mb-1">
                            {result.phraseUsedCorrectly
                              ? t("Liên từ dùng đúng cách", "Linker used correctly")
                              : t("Liên từ cần điều chỉnh", "Linker needs adjustment")}
                          </p>
                          <p className="text-sm text-foreground/80">{result.phraseFeedback}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="font-medium text-sm mb-1 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                          {t("Phản hồi ngữ pháp", "Grammar Feedback")}
                        </p>
                        <p className="text-sm text-foreground/80">{result.grammarFeedback}</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default LinkerBank;
