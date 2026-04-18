import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Loader2, CheckCircle2, XCircle, Lightbulb, ArrowUp, RotateCcw, BookOpen, PenLine, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  IELTS_PHRASES,
  TASK1_CATEGORIES,
  TASK2_CATEGORIES,
  IELTSPhrase,
} from "@/data/ieltsPhraseBank";

interface GradeResult {
  score: number;
  phraseUsedCorrectly: boolean;
  grammarFeedback: string;
  phraseFeedback: string;
  upgradedVersion: string;
  tips: string[];
  error?: string;
}

interface Props {
  taskType: 1 | 2;
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

const PhrasePractice = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhrase, setSelectedPhrase] = useState<IELTSPhrase | null>(null);
  const [userSentence, setUserSentence] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [rewriteText, setRewriteText] = useState("");
  const [rewriteResult, setRewriteResult] = useState<{
    accuracy: number;
    diffHtml: string;
    message: string;
    tone: "success" | "warn" | "error";
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = taskType === 1 ? TASK1_CATEGORIES : TASK2_CATEGORIES;

  const filteredPhrases = useMemo(() => {
    const list = IELTS_PHRASES.filter((p) => p.taskType === taskType);
    if (activeCategory === "all") return list;
    return list.filter((p) => p.category === activeCategory);
  }, [taskType, activeCategory]);

  const handleSelectPhrase = (phrase: IELTSPhrase) => {
    setSelectedPhrase(phrase);
    setUserSentence("");
    setResult(null);
    setRewriteText("");
    setRewriteResult(null);
    setShowAnswer(false);
  };

  const handleSubmit = async () => {
    if (!selectedPhrase) {
      toast.error(t("Vui lòng chọn 1 cụm từ", "Please select a phrase first"));
      return;
    }
    if (userSentence.trim().length < 5) {
      toast.error(t("Câu của bạn quá ngắn", "Your sentence is too short"));
      return;
    }

    setGrading(true);
    setResult(null);
    setRewriteText("");
    setRewriteResult(null);
    setShowAnswer(false);
    try {
      const { data, error } = await supabase.functions.invoke("grade-phrase-sentence", {
        body: {
          phrase: selectedPhrase.phrase,
          phraseMeaning: selectedPhrase.meaning,
          userSentence: userSentence.trim(),
          taskType,
        },
      });

      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 429) {
          toast.error(t("Quá nhiều yêu cầu. Vui lòng thử lại sau.", "Rate limit exceeded. Please retry shortly."));
        } else if (status === 402) {
          toast.error(t("Hệ thống AI đã hết tín dụng. Vui lòng liên hệ admin.", "AI credits exhausted. Please contact admin."));
        } else {
          toast.error(t("Không thể chấm điểm. Vui lòng thử lại.", "Grading failed. Please try again."));
        }
        return;
      }

      const result = data as GradeResult;
      setResult(result);

      // Save attempt to localStorage
      try {
        const key = "phrase-practice-attempts";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.unshift({
          phrase: selectedPhrase.phrase,
          sentence: userSentence,
          score: result.score,
          taskType,
          timestamp: Date.now(),
        });
        localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
      } catch {}

      // Save to Notebook (student_notebooks) — append mode, 1 entry per task
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const title = `IELTS Writing Practice Task ${taskType}`;
          const escapeHtml = (s: string) =>
            s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const timestamp = new Date().toLocaleString();
          const newBlock =
            `<p><strong>📝 "${escapeHtml(selectedPhrase.phrase)}"</strong> <em>(${timestamp})</em></p>` +
            `<p><strong>My sentence:</strong> ${escapeHtml(userSentence.trim())}</p>` +
            `<p><strong>Band 7.5+ Upgrade:</strong> ${escapeHtml(result.upgradedVersion || "")}</p>`;

          // Find existing entry — use limit(1) instead of maybeSingle()
          // to avoid errors when duplicate rows exist (race conditions)
          const { data: existingRows, error: fetchErr } = await supabase
            .from("student_notebooks")
            .select("id, content")
            .eq("user_id", userData.user.id)
            .eq("title", title)
            .order("updated_at", { ascending: false })
            .limit(1);

          if (fetchErr) console.error("Notebook fetch failed:", fetchErr);

          const existing = existingRows && existingRows.length > 0 ? existingRows[0] : null;

          let saveErr: any = null;
          if (existing) {
            const merged = `${existing.content}<hr/>${newBlock}`;
            const { error } = await supabase
              .from("student_notebooks")
              .update({ content: merged, updated_at: new Date().toISOString() })
              .eq("id", existing.id);
            saveErr = error;
          } else {
            const { error } = await supabase.from("student_notebooks").insert({
              user_id: userData.user.id,
              title,
              subject: "ielts",
              content: newBlock,
              is_public: false,
            });
            saveErr = error;
          }
          if (saveErr) {
            console.error("Notebook save failed:", saveErr);
            toast.error(t(`Lưu sổ tay thất bại: ${saveErr.message}`, `Save failed: ${saveErr.message}`));
          } else {
            toast.success(t("Đã lưu vào Sổ tay ghi chú", "Saved to your Notebook"));
          }
        } else {
          toast.message(t("Đăng nhập để lưu vào sổ tay", "Sign in to save to your notebook"));
        }
      } catch (e) {
        console.error("Notebook save failed", e);
      }
    } catch (e) {
      console.error(e);
      toast.error(t("Đã có lỗi xảy ra", "Something went wrong"));
    } finally {
      setGrading(false);
    }
  };

  const handleReset = () => {
    setUserSentence("");
    setResult(null);
    setRewriteText("");
    setRewriteResult(null);
    setShowAnswer(false);
  };

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const compareRewrite = (original: string, attempt: string) => {
    const norm = (s: string) =>
      s.toLowerCase().replace(/[.,!?;:"'""''()\[\]]/g, "").replace(/\s+/g, " ").trim();
    const oWords = norm(original).split(" ").filter(Boolean);
    const aWordsRaw = attempt.trim().split(/\s+/).filter(Boolean);
    const aWords = norm(attempt).split(" ").filter(Boolean);

    let correct = 0;
    const diffParts: string[] = [];
    const max = Math.max(oWords.length, aWords.length);
    for (let i = 0; i < max; i++) {
      const o = oWords[i];
      const a = aWords[i];
      const display = aWordsRaw[i];
      if (a && o && a === o) {
        correct++;
        diffParts.push(`<span class="text-emerald-600 dark:text-emerald-400">${escapeHtml(display)}</span>`);
      } else if (a) {
        diffParts.push(`<span class="text-red-600 dark:text-red-400 underline decoration-wavy">${escapeHtml(display)}</span>`);
      } else if (o) {
        diffParts.push(`<span class="text-amber-600 dark:text-amber-400 italic">[${escapeHtml(o)}]</span>`);
      }
    }
    const accuracy = max === 0 ? 0 : Math.round((correct / max) * 100);
    return { accuracy, diffHtml: diffParts.join(" ") };
  };

  const handleCheckRewrite = () => {
    if (!result?.upgradedVersion) return;
    if (rewriteText.trim().length < 3) {
      toast.error(t("Vui lòng viết lại câu", "Please write the sentence first"));
      return;
    }
    // strip markdown bold from upgraded version for comparison
    const cleanUpgraded = result.upgradedVersion.replace(/\*\*/g, "");
    const { accuracy, diffHtml } = compareRewrite(cleanUpgraded, rewriteText);
    let message = "";
    let tone: "success" | "warn" | "error" = "error";
    if (accuracy >= 95) {
      message = t("Hoàn hảo! Bạn đã ghi nhớ cấu trúc.", "Perfect! You've mastered the structure.");
      tone = "success";
      toast.success(t("Tuyệt vời! ✨", "Excellent! ✨"));
    } else if (accuracy >= 80) {
      message = t(
        "Gần đúng — kiểm tra các từ được tô đỏ.",
        "Almost there — check the words highlighted in red."
      );
      tone = "warn";
    } else {
      message = t("Hãy thử lại — đọc kỹ câu mẫu.", "Try again — read the model sentence carefully.");
      tone = "error";
    }
    setRewriteResult({ accuracy, diffHtml, message, tone });
  };

  const handleResetRewrite = () => {
    setRewriteText("");
    setRewriteResult(null);
    setShowAnswer(false);
  };

  const scoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-500";
    if (score >= 6) return "text-blue-500";
    if (score >= 4) return "text-amber-500";
    return "text-red-500";
  };

  const levelColor = (lvl: string) => {
    if (lvl === "C1") return "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30";
    if (lvl === "B2") return "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30";
    return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* LEFT: Phrase list */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {t("Ngân hàng cụm từ", "Phrase Bank")}
              <Badge variant="secondary" className="ml-auto">
                {filteredPhrases.length} {t("cụm", "phrases")}
              </Badge>
            </CardTitle>
            <div className="flex gap-1.5 pt-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
              <button
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-colors whitespace-nowrap ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 border-border hover:bg-muted"
                }`}
              >
                {t("Tất cả", "All")}
              </button>
              {categories.map((c) => (
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
            {filteredPhrases.map((p) => {
              const active = selectedPhrase?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectPhrase(p)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-foreground text-[15px] leading-tight">
                      {p.phrase}
                    </span>
                    <Badge variant="outline" className={`shrink-0 text-[10px] ${levelColor(p.level)}`}>
                      {p.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{p.meaning}</p>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Practice area */}
      <div className="lg:col-span-3 space-y-4">
        {!selectedPhrase ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center text-muted-foreground">
              <Sparkles className="w-12 h-12 mx-auto mb-3 text-primary/50" />
              <p className="text-base">
                {t("Chọn 1 cụm từ bên trái để bắt đầu luyện tập", "Select a phrase on the left to start practising")}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Selected phrase card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-foreground">"{selectedPhrase.phrase}"</h3>
                  <Badge variant="outline" className={levelColor(selectedPhrase.level)}>
                    {selectedPhrase.level}
                  </Badge>
                </div>
                <p className="text-sm">
                  <span className="font-medium text-muted-foreground">{t("Nghĩa:", "Meaning:")} </span>
                  <span className="text-foreground">{selectedPhrase.meaning}</span>
                  <span className="text-muted-foreground"> — {selectedPhrase.meaningEn}</span>
                </p>
                <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    {t("Ví dụ Band 7+:", "Band 7+ Example:")}
                  </p>
                  <p className="text-[15px] text-foreground italic leading-relaxed">
                    {selectedPhrase.example}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Writing area */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {t("Viết câu của bạn dùng cụm từ trên", "Write your own sentence using the phrase above")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={userSentence}
                  onChange={(e) => setUserSentence(e.target.value)}
                  placeholder={t("Ví dụ: The number of...", "e.g. The number of...")}
                  className="min-h-[120px] text-base"
                  disabled={grading}
                />
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={handleSubmit} disabled={grading || !userSentence.trim()}>
                    {grading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("Đang chấm...", "Grading...")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t("Nộp bài chấm", "Submit for Grading")}
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset} disabled={grading}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("Viết lại", "Reset")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
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
                      {/* Phrase usage */}
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
                              ? t("Cụm từ dùng đúng cách", "Phrase used correctly")
                              : t("Cụm từ cần điều chỉnh", "Phrase needs adjustment")}
                          </p>
                          <p className="text-sm text-foreground/80">{result.phraseFeedback}</p>
                        </div>
                      </div>

                      {/* Grammar */}
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="font-medium text-sm mb-1 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                          {t("Phản hồi ngữ pháp", "Grammar Feedback")}
                        </p>
                        <p className="text-sm text-foreground/80">{result.grammarFeedback}</p>
                      </div>

                      {/* Upgraded version */}
                      <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                        <p className="font-medium text-sm mb-2 flex items-center gap-2">
                          <ArrowUp className="w-4 h-4 text-primary" />
                          {t("Phiên bản nâng cấp Band 7.5+", "Band 7.5+ Upgrade")}
                        </p>
                        <p className="text-[15px] leading-relaxed text-foreground">
                          {renderBold(result.upgradedVersion)}
                        </p>
                      </div>

                      {/* Rewrite Practice */}
                      <div className="p-4 rounded-lg border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 to-transparent space-y-3">
                        <div className="flex items-center gap-2">
                          <PenLine className="w-4 h-4 text-primary" />
                          <p className="font-semibold text-sm text-foreground">
                            {t("Luyện viết lại câu nâng cấp", "Rewrite the Upgraded Sentence")}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t(
                            "Gõ lại chính xác câu Band 7.5+ ở trên để ghi nhớ cấu trúc ngữ pháp bậc cao.",
                            "Type the Band 7.5+ sentence above to memorise the advanced grammar structure."
                          )}
                        </p>
                        <Textarea
                          value={rewriteText}
                          onChange={(e) => setRewriteText(e.target.value)}
                          placeholder={t("Viết lại câu nâng cấp ở đây...", "Rewrite the upgraded sentence here...")}
                          className="min-h-[100px] text-base"
                        />
                        {showAnswer && (
                          <div className="p-2 rounded bg-muted/60 border border-border text-sm text-foreground italic">
                            {result.upgradedVersion.replace(/\*\*/g, "")}
                          </div>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          <Button size="sm" onClick={handleCheckRewrite} disabled={!rewriteText.trim()}>
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            {t("Kiểm tra", "Check My Rewrite")}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAnswer((v) => !v)}>
                            <Eye className="w-4 h-4 mr-1.5" />
                            {showAnswer ? t("Ẩn đáp án", "Hide Answer") : t("Xem đáp án", "Show Answer")}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleResetRewrite}>
                            <RotateCcw className="w-4 h-4 mr-1.5" />
                            {t("Thử lại", "Try Again")}
                          </Button>
                        </div>
                        {rewriteResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-3 rounded-lg border ${
                              rewriteResult.tone === "success"
                                ? "bg-emerald-500/10 border-emerald-500/40"
                                : rewriteResult.tone === "warn"
                                  ? "bg-amber-500/10 border-amber-500/40"
                                  : "bg-red-500/10 border-red-500/40"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                                {rewriteResult.tone === "success" ? (
                                  <Sparkles className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Lightbulb className="w-4 h-4 text-amber-600" />
                                )}
                                {rewriteResult.message}
                              </p>
                              <span className="text-sm font-bold text-foreground">
                                {rewriteResult.accuracy}%
                              </span>
                            </div>
                            <div
                              className="text-sm leading-relaxed bg-background/60 p-2 rounded"
                              dangerouslySetInnerHTML={{ __html: rewriteResult.diffHtml }}
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Tips */}
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

export default PhrasePractice;
