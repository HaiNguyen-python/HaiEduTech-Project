// Smart Grading for essays written against the student's OWN prompt
// (school topics, books, real exam questions) - no prompt bank involved.
import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, AlertCircle, Trash2, NotebookPen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { fetchUpgradedEssay } from "@/lib/upgradeWriting";
import { handleAiError } from "@/lib/aiResponseHandler";
import WritingResultPanel, { type GradingResult } from "@/components/ielts/WritingResultPanel";
import { WRITING_ATTEMPT_EVENT } from "@/components/WritingSkillChart";

const MAX_PROMPT = 2000;
const MAX_ESSAY = 6000;

const countWords = (value: string) => (value.trim() ? value.trim().split(/\s+/).length : 0);

const FreeWritingGrader = forwardRef<HTMLDivElement>((_props, ref) => {
  const { t } = useLanguage();
  const [taskType, setTaskType] = useState<1 | 2>(2);
  const [prompt, setPrompt] = useState("");
  const [chartDescription, setChartDescription] = useState("");
  const [essay, setEssay] = useState("");
  const [grading, setGrading] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [savingNote, setSavingNote] = useState(false);

  const promptWords = countWords(prompt);
  const wordCount = countWords(essay);
  const targetWords = taskType === 1 ? 150 : 250;

  const retryUpgrade = async () => {
    if (!essay.trim()) return;
    setUpgradeLoading(true);
    const { upgraded, error } = await fetchUpgradedEssay(essay, taskType);
    setUpgradeLoading(false);
    if (upgraded) {
      setResult((prev) => (prev ? { ...prev, upgraded } : prev));
    } else {
      toast({
        title: t("Chưa tạo được bài mẫu Band 8.0+", "Band 8.0+ version not ready"),
        description: error || t("Hãy thử lại sau ít phút.", "Please try again in a moment."),
        variant: "destructive",
      });
    }
  };

  const handleGrade = async () => {
    if (promptWords < 10) {
      toast({
        title: t("Thiếu đề bài", "Prompt missing"),
        description: t("Hãy dán đề bài (tối thiểu 10 từ) để AI chấm đúng yêu cầu.", "Paste the prompt (at least 10 words) so the AI grades against it."),
        variant: "destructive",
      });
      return;
    }
    if (wordCount < 50) {
      toast({
        title: t("Bài viết quá ngắn", "Essay too short"),
        description: t("Cần ít nhất 50 từ để chấm điểm.", "At least 50 words are needed to grade."),
        variant: "destructive",
      });
      return;
    }

    setGrading(true);
    setUpgradeLoading(false);
    setResult(null);

    const clientTimeout = new Promise<{ data: null; error: { message: string } }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: { message: "Grading timed out. Please try again." } }), 90_000),
    );
    const upgradePromise = fetchUpgradedEssay(essay, taskType);

    try {
      const raced = await Promise.race([
        supabase.functions.invoke("grade-writing", {
          body: {
            essay,
            prompt: prompt.slice(0, MAX_PROMPT),
            taskType,
            chartDescription: taskType === 1 ? chartDescription.slice(0, MAX_PROMPT) : "",
          },
        }),
        clientTimeout,
      ]);
      const { data, error } = raced as { data: GradingResult | null; error: { message?: string } | null };
      if (error || !data) {
        const handled = handleAiError(error, { context: t("chấm bài", "grading") });
        if (!handled.handled) {
          toast({
            title: t("Chấm bài thất bại", "Grading failed"),
            description: error?.message || t("Hệ thống chấm đang bận. Hãy thử lại.", "The grading service is busy. Please try again."),
            variant: "destructive",
          });
        }
        setGrading(false);
        return;
      }

      const graded = { ...(data as GradingResult), upgraded: "" };
      setResult(graded);
      setGrading(false);
      setUpgradeLoading(true);

      const { upgraded, error: upgradeError } = await upgradePromise;
      setResult((prev) => (prev ? { ...prev, upgraded } : prev));
      setUpgradeLoading(false);
      if (!upgraded) {
        toast({
          title: t("Chưa tạo được bài mẫu Band 8.0+", "Band 8.0+ version not ready"),
          description: upgradeError || t("Hãy bấm Thử lại.", "Press Retry."),
          variant: "destructive",
        });
      }

      // Persist to history + analytics for logged-in students
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("writing_attempts").insert({
            user_id: user.id,
            task_type: taskType,
            prompt: prompt.slice(0, MAX_PROMPT),
            essay,
            word_count: wordCount,
            result: { ...graded, upgraded } as unknown as Record<string, unknown>,
            overall_score: graded.overall,
          } as never);
          // Tell the skill chart (and history) to reload from the database
          window.dispatchEvent(new Event(WRITING_ATTEMPT_EVENT));
          logStudentActivity({
            activityType: "ielts_writing",
            score: graded.overall,
            maxScore: 9,
            domain: "english",
            metadata: { taskType, wordCount, mode: "free_prompt", criteria: graded.criteria },
          });
        }
      } catch (saveErr) {
        console.error("Error saving free-prompt attempt:", saveErr);
      }
    } catch (e) {
      const handled = handleAiError(e, { context: t("chấm bài", "grading") });
      if (!handled.handled) {
        toast({
          title: t("Chấm bài thất bại", "Grading failed"),
          description: t("Không thể kết nối tới hệ thống chấm. Hãy thử lại.", "Could not reach the grading service. Please try again."),
          variant: "destructive",
        });
      }
      setGrading(false);
      setUpgradeLoading(false);
    }
  };

  const handleSaveToNotebook = async () => {
    if (!result) return;
    setSavingNote(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: t("Cần đăng nhập", "Sign in required"),
          description: t("Hãy đăng nhập để lưu bài chấm vào Sổ tay.", "Sign in to save this report to your notebook."),
          variant: "destructive",
        });
        return;
      }
      const content = [
        `Task ${taskType} - Band ${result.overall}`,
        "",
        `PROMPT: ${prompt}`,
        "",
        `MY ESSAY (${wordCount} words):`,
        essay,
        "",
        "CRITERIA:",
        ...result.criteria.map((c) => `- ${c.label}: ${c.score}`),
        "",
        "ERRORS:",
        ...result.errors.map((e) => `- ${e.error} -> ${e.correction} (${e.category})`),
        "",
        `ADVICE: ${result.advice}`,
        "",
        result.upgraded ? `BAND 8.0+ VERSION:\n${result.upgraded}` : "",
      ].join("\n");

      const { error } = await supabase.from("student_notebooks").insert({
        user_id: user.id,
        title: `IELTS Writing Task ${taskType} - Band ${result.overall}`,
        content,
        subject: "IELTS Writing",
      } as never);
      if (error) throw error;
      toast({ title: t("Đã lưu vào Sổ tay", "Saved to notebook") });
    } catch (e) {
      toast({
        title: t("Lưu thất bại", "Save failed"),
        description: e instanceof Error ? e.message : undefined,
        variant: "destructive",
      });
    } finally {
      setSavingNote(false);
    }
  };

  const handleClear = () => {
    setPrompt("");
    setChartDescription("");
    setEssay("");
    setResult(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
      {/* LEFT: input */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("Chấm bài tự do (đề bên ngoài)", "Smart Grading (your own prompt)")}
            </CardTitle>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t(
                "Dán đề bài của bạn (đề ở trường, sách, đề thi thật) và bài viết đã hoàn thành, AI sẽ chấm ngay theo 4 tiêu chí IELTS.",
                "Paste your own prompt (school, book or real exam) plus your finished essay - the AI grades it against the 4 official IELTS criteria.",
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Task switch */}
            <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
              {[1, 2].map((n) => (
                <button
                  key={n}
                  onClick={() => setTaskType(n as 1 | 2)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    taskType === n ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Task {n}
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                📋 {t("Đề bài", "Writing prompt")} <span className="text-destructive">*</span>
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT))}
                placeholder={t(
                  taskType === 1
                    ? "Ví dụ: The chart below shows the number of visitors to three museums between 2010 and 2020..."
                    : "Ví dụ: Some people think that governments should invest more in public transport. To what extent do you agree?",
                  taskType === 1
                    ? "e.g. The chart below shows the number of visitors to three museums between 2010 and 2020..."
                    : "e.g. Some people think that governments should invest more in public transport. To what extent do you agree?",
                )}
                className="min-h-[110px] text-sm leading-relaxed resize-y"
              />
              {promptWords > 0 && promptWords < 10 && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {t("Đề bài cần ít nhất 10 từ", "The prompt needs at least 10 words")}
                </p>
              )}
            </div>

            {taskType === 1 && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  📈 {t("Mô tả số liệu / biểu đồ (tuỳ chọn)", "Chart or data description (optional)")}
                </label>
                <Textarea
                  value={chartDescription}
                  onChange={(e) => setChartDescription(e.target.value.slice(0, MAX_PROMPT))}
                  placeholder={t(
                    "AI không xem được hình. Hãy gõ các số liệu chính để AI kiểm tra bài viết chính xác hơn.",
                    "The AI cannot see images. Type the key figures so it can check your data accuracy.",
                  )}
                  className="min-h-[80px] text-sm leading-relaxed resize-y"
                />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">✍️ {t("Bài viết của bạn", "Your essay")}</label>
                <span className={`text-sm font-mono ${wordCount >= targetWords ? "text-green-500" : "text-muted-foreground"}`}>
                  {wordCount} / {targetWords}+ {t("từ", "words")}
                </span>
              </div>
              <Textarea
                value={essay}
                onChange={(e) => setEssay(e.target.value.slice(0, MAX_ESSAY))}
                placeholder={t(
                  `Dán hoặc viết bài Task ${taskType} của bạn tại đây... (tối thiểu ${targetWords} từ)`,
                  `Paste or write your Task ${taskType} essay here... (minimum ${targetWords} words)`,
                )}
                className="min-h-[320px] text-sm leading-relaxed resize-y"
              />
              {wordCount > 0 && wordCount < 50 && (
                <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {t("Cần ít nhất 50 từ để chấm điểm", "Need at least 50 words to grade")}
                </p>
              )}
              {wordCount >= 50 && wordCount < targetWords && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {t(
                    `Bài dưới ${targetWords} từ sẽ bị trừ điểm Task Achievement`,
                    `Under ${targetWords} words costs marks on Task Achievement`,
                  )}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleGrade} disabled={grading} className="flex-1 min-w-[160px]">
                {grading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                {grading ? t("Đang chấm...", "Grading...") : t("Chấm bài ngay", "Grade now")}
              </Button>
              {result && (
                <Button variant="outline" onClick={handleSaveToNotebook} disabled={savingNote}>
                  {savingNote ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <NotebookPen className="w-4 h-4 mr-1" />}
                  {t("Lưu vào Sổ tay", "Save to notebook")}
                </Button>
              )}
              <Button variant="ghost" onClick={handleClear} disabled={grading}>
                <Trash2 className="w-4 h-4 mr-1" /> {t("Xoá", "Clear")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* RIGHT: results */}
      <div className="space-y-4">
        {result ? (
          <WritingResultPanel result={result} upgradeLoading={upgradeLoading} onRetryUpgrade={retryUpgrade} />
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              {grading
                ? t("AI đang chấm bài của bạn theo 4 tiêu chí IELTS...", "The AI is grading your essay on the 4 IELTS criteria...")
                : t(
                    "Kết quả chấm (band tổng, 4 tiêu chí, lỗi cần sửa, lời khuyên và bản nâng cấp Band 8.0+) sẽ hiện ở đây.",
                    "Your report (overall band, 4 criteria, errors, advice and the Band 8.0+ rewrite) will appear here.",
                  )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FreeWritingGrader;
