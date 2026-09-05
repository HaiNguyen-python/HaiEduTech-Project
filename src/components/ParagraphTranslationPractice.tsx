/**
 * Paragraph Translation Practice - learners translate a whole IELTS-style Vietnamese
 * paragraph into English, then get local + AI feedback with a Band 7.5+ model paragraph.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlignLeft, Send, Loader2, Lightbulb, RotateCcw, Shuffle, ArrowRight,
  CheckCircle2, Eye, BookmarkPlus, BookmarkCheck, Sparkles, Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  PARAGRAPH_CATEGORIES,
  getParagraphItems,
  countWords,
  type ParagraphTranslationItem,
} from "@/data/ieltsParagraphTranslationBank";
import { matchStructures, normaliseForMatch } from "@/lib/ieltsTranslationCheck";

interface Props {
  taskType: 1 | 2;
}

interface AiResult {
  score: number;
  accuracy: number;
  grammar: number;
  vocabulary: number;
  cohesion: number;
  style: number;
  verdict: string;
  feedback: { vi: string; en: string }[];
  sentences: { vi: string; en: string }[];
  corrected: string;
  upgraded: string;
}

const STORAGE_KEY = "ielts-paragraph-translation-progress";

type ProgressMap = Record<string, number>;

const loadProgress = (): ProgressMap => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as ProgressMap;
  } catch {
    return {};
  }
};

const saveProgress = (map: ProgressMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore quota errors */
  }
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sentenceCount = (s: string) =>
  s.split(/(?<=[.!?])\s+/).filter((x) => x.trim().length > 2).length;

/** Local pre-check so the learner always gets feedback, even if AI fails. */
function localCheck(item: ParagraphTranslationItem, answer: string) {
  const m = matchStructures(item.structures, answer, item.en);
  const words = countWords(answer);
  const lengthOk = words >= item.minWords && words <= item.maxWords;
  const srcSentences = sentenceCount(item.vi);
  const mySentences = sentenceCount(answer);
  const sentencesOk = Math.abs(srcSentences - mySentences) <= 1;
  const base = 3.5 + m.coverage * 3.5 + (lengthOk ? 1.5 : 0) + (sentencesOk ? 1.5 : 0);
  return {
    score: Math.max(2, Math.min(10, Math.round(base * 10) / 10)),
    missing: m.missing,
    used: m.used,
    words,
    lengthOk,
    srcSentences,
    mySentences,
    sentencesOk,
    modelWords: normaliseForMatch(item.en).split(" ").filter(Boolean).length,
  };
}

const bandColor = (band: string) =>
  band === "7.5+"
    ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30"
    : band === "6.5-7.0"
      ? "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30"
      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30";

const scoreColor = (s: number) =>
  s >= 8 ? "text-emerald-500" : s >= 6.5 ? "text-blue-500" : s >= 5 ? "text-amber-500" : "text-red-500";

const ParagraphTranslationPractice = ({ taskType }: Props) => {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [local, setLocal] = useState<ReturnType<typeof localCheck> | null>(null);
  const [ai, setAi] = useState<AiResult | null>(null);
  const [progress, setProgress] = useState<ProgressMap>(loadProgress);
  const [saved, setSaved] = useState(false);

  const items = useMemo(() => getParagraphItems(taskType, category), [taskType, category]);
  const item = items[Math.min(index, Math.max(0, items.length - 1))];

  const reset = () => {
    setAnswer("");
    setShowHint(false);
    setRevealed(false);
    setLocal(null);
    setAi(null);
    setSaved(false);
  };

  useEffect(() => {
    setIndex(0);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskType, category]);

  const done = useMemo(
    () => items.filter((i) => (progress[i.id] ?? 0) > 0).length,
    [items, progress],
  );

  const speak = (text: string) => {
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.9;
      window.speechSynthesis?.speak(u);
    } catch {
      /* ignore */
    }
  };

  const goTo = (next: number) => {
    if (!items.length) return;
    setIndex(((next % items.length) + items.length) % items.length);
    reset();
  };

  const handleSubmit = async () => {
    if (!item) return;
    const trimmed = answer.trim();
    if (countWords(trimmed) < 15) {
      toast.error(t("Bản dịch đoạn văn còn quá ngắn (tối thiểu 15 từ).", "Your paragraph is too short (at least 15 words)."));
      return;
    }
    const lc = localCheck(item, trimmed);
    setLocal(lc);
    setRevealed(true);
    setGrading(true);
    setAi(null);
    let aiResult: AiResult | null = null;
    try {
      const { data, error } = await supabase.functions.invoke("grade-paragraph-translation", {
        body: {
          vi: item.vi,
          model: item.en,
          userAnswer: trimmed,
          task: item.task,
          category: item.category,
          structures: item.structures,
        },
      });
      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 429) toast.error(t("Quá nhiều yêu cầu, thử lại sau nhé.", "Too many requests, please retry shortly."));
        else if (status === 402) toast.error(t("Hệ thống AI đã hết tín dụng.", "AI credits exhausted."));
        else toast.message(t("AI chưa chấm được, đang hiển thị nhận xét cơ bản.", "AI grading unavailable, showing the basic check."));
      } else if (data) {
        aiResult = data as AiResult;
        setAi(aiResult);
      }
    } catch (e) {
      console.error("paragraph translation grading error", e);
      toast.message(t("AI chưa chấm được, đang hiển thị nhận xét cơ bản.", "AI grading unavailable, showing the basic check."));
    } finally {
      setGrading(false);
      const finalScore = aiResult?.score ?? lc.score;
      const best = Math.max(progress[item.id] ?? 0, finalScore);
      const next = { ...progress, [item.id]: best };
      setProgress(next);
      saveProgress(next);
      void logStudentActivity({
        activityType: "ielts_paragraph_translation",
        activityId: item.id,
        score: finalScore,
        maxScore: 10,
        metadata: { task: item.task, category: item.category, band: item.band },
      });
    }
  };

  const handleSaveNotebook = async () => {
    if (!item || saved) return;
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        toast.message(t("Đăng nhập để lưu vào sổ tay", "Sign in to save to your notebook"));
        return;
      }
      const title = `IELTS Paragraph Translation Task ${taskType}`;
      const block =
        `<p><strong>🇻🇳 ${escapeHtml(item.vi)}</strong></p>` +
        `<p><strong>My translation:</strong> ${escapeHtml(answer.trim())}</p>` +
        `<p><strong>Model:</strong> ${escapeHtml(item.en)}</p>` +
        (ai?.upgraded ? `<p><strong>Band 7.5+:</strong> ${escapeHtml(ai.upgraded)}</p>` : "");
      const { data: rows } = await supabase
        .from("student_notebooks")
        .select("id, content")
        .eq("user_id", userData.user.id)
        .eq("title", title)
        .order("updated_at", { ascending: false })
        .limit(1);
      const existing = rows && rows.length > 0 ? rows[0] : null;
      if (existing) {
        const { error } = await supabase
          .from("student_notebooks")
          .update({ content: `${existing.content || ""}<hr/>${block}`, updated_at: new Date().toISOString() })
          .eq("id", existing.id)
          .eq("user_id", userData.user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("student_notebooks").insert({
          user_id: userData.user.id,
          title,
          subject: "ielts",
          content: block,
          is_public: false,
        });
        if (error) throw error;
      }
      window.dispatchEvent(new CustomEvent("notebook:updated"));
      setSaved(true);
      toast.success(t("Đã lưu vào Sổ tay ghi chú", "Saved to your Notebook"));
    } catch (e) {
      console.error("paragraph notebook save error", e);
      toast.error(t("Không thể lưu sổ tay", "Could not save to notebook"));
    }
  };

  if (!item) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("Chưa có đoạn văn nào cho mục này.", "No paragraphs available for this category yet.")}
      </p>
    );
  }

  const displayScore = ai?.score ?? local?.score ?? 0;
  const cats = PARAGRAPH_CATEGORIES[taskType];
  const myWords = countWords(answer);

  return (
    <div className="space-y-4">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors ${
              category === c.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            {lang === "vi" ? c.labelVi : c.labelEn}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <Progress value={items.length ? (done / items.length) * 100 : 0} className="h-2 flex-1" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {done}/{items.length} {t("đoạn đã luyện", "practised")}
        </span>
      </div>

      {/* Question card */}
      <Card className="border-primary/30">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <AlignLeft className="w-5 h-5 text-primary" />
              {t("Dịch cả đoạn văn sau sang tiếng Anh", "Translate this whole paragraph into English")}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={bandColor(item.band)}>Band {item.band}</Badge>
              <Badge variant="outline">
                {lang === "vi"
                  ? cats.find((c) => c.value === item.category)?.labelVi ?? item.category
                  : cats.find((c) => c.value === item.category)?.labelEn ?? item.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.minWords}-{item.maxWords} {t("từ", "words")}
              </Badge>
              <span className="text-xs text-muted-foreground">{index + 1}/{items.length}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/40 border">
            <p className="text-base md:text-lg font-medium text-foreground whitespace-pre-wrap leading-relaxed">
              🇻🇳 {item.vi}
            </p>
          </div>

          {/* Hint */}
          <div>
            {!showHint ? (
              <Button variant="outline" size="sm" onClick={() => setShowHint(true)} className="gap-1.5">
                <Lightbulb className="w-4 h-4" />
                {t("Gợi ý cấu trúc", "Structure hints")}
              </Button>
            ) : (
              <div className="flex flex-wrap gap-2">
                {item.structures.map((k) => (
                  <Badge key={k} variant="secondary" className="text-xs">{k}</Badge>
                ))}
              </div>
            )}
          </div>

          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
            }}
            placeholder={t("Viết bản dịch tiếng Anh cả đoạn...", "Write your English translation of the whole paragraph...")}
            className="min-h-[190px] text-base leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {myWords} {t("từ", "words")}{" "}
              <span className={myWords >= item.minWords && myWords <= item.maxWords ? "text-emerald-500" : ""}>
                ({t("mục tiêu", "target")} {item.minWords}-{item.maxWords})
              </span>
            </span>
            <span className="hidden md:inline">Ctrl / Cmd + Enter</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleSubmit} disabled={grading} className="gap-1.5">
              {grading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {t("Chấm đoạn dịch", "Check paragraph")}
            </Button>
            <Button variant="outline" onClick={() => goTo(index + 1)} className="gap-1.5">
              {t("Đoạn tiếp theo", "Next")} <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" onClick={() => goTo(Math.floor(Math.random() * items.length))} className="gap-1.5">
              <Shuffle className="w-4 h-4" /> {t("Ngẫu nhiên", "Random")}
            </Button>
            <Button variant="ghost" onClick={reset} className="gap-1.5">
              <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Retry")}
            </Button>
            {!revealed && (
              <Button variant="ghost" onClick={() => setRevealed(true)} className="gap-1.5">
                <Eye className="w-4 h-4" /> {t("Xem đáp án", "Show answer")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {local && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {t("Kết quả", "Result")}
                    <span className={`ml-auto text-2xl font-bold ${scoreColor(displayScore)}`}>
                      {displayScore}/10
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {grading && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("AI đang phân tích đoạn dịch...", "AI is analysing your paragraph...")}
                    </p>
                  )}

                  {ai && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { k: t("Chính xác nghĩa", "Accuracy"), v: ai.accuracy },
                        { k: t("Ngữ pháp", "Grammar"), v: ai.grammar },
                        { k: t("Từ vựng", "Vocabulary"), v: ai.vocabulary },
                        { k: t("Liên kết câu", "Cohesion"), v: ai.cohesion },
                        { k: t("Văn phong", "Style"), v: ai.style },
                      ].map((c) => (
                        <div key={c.k} className="p-2 rounded-lg bg-muted/40 border">
                          <p className="text-xs text-muted-foreground">{c.k}</p>
                          <p className={`text-lg font-semibold ${scoreColor(c.v)}`}>{c.v}/10</p>
                          <Progress value={c.v * 10} className="h-1.5 mt-1" />
                        </div>
                      ))}
                    </div>
                  )}

                  {ai?.feedback?.length ? (
                    <ul className="space-y-2">
                      {ai.feedback.map((f, i) => (
                        <li key={i} className="text-sm">
                          <span className="text-foreground">• {lang === "vi" ? f.vi : f.en}</span>
                          <span className="block text-xs text-muted-foreground pl-3">
                            {lang === "vi" ? f.en : f.vi}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {local.missing.length > 0 && (
                        <li className="text-amber-600 dark:text-amber-400">
                          • {t("Chưa dùng cấu trúc gợi ý:", "Target structures not used:")}{" "}
                          {local.missing.join(", ")}
                        </li>
                      )}
                      {!local.lengthOk && (
                        <li className="text-amber-600 dark:text-amber-400">
                          • {t(
                            `Độ dài ${local.words} từ, nên trong khoảng ${item.minWords}-${item.maxWords} từ.`,
                            `Your paragraph has ${local.words} words; aim for ${item.minWords}-${item.maxWords}.`,
                          )}
                        </li>
                      )}
                      {!local.sentencesOk && (
                        <li className="text-amber-600 dark:text-amber-400">
                          • {t(
                            `Đoạn gốc có ${local.srcSentences} câu, bản dịch của bạn có ${local.mySentences} câu.`,
                            `The source has ${local.srcSentences} sentences but yours has ${local.mySentences}.`,
                          )}
                        </li>
                      )}
                      {local.missing.length === 0 && local.lengthOk && local.sentencesOk && (
                        <li className="text-emerald-600 dark:text-emerald-400">
                          • {t("Đoạn dịch cân đối và dùng đủ cấu trúc trọng tâm.", "Well balanced, and you used all the target structures.")}
                        </li>
                      )}
                    </ul>
                  )}

                  {ai?.sentences?.length ? (
                    <div className="p-3 rounded-lg bg-muted/40 border space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">
                        {t("Nhận xét từng câu", "Sentence by sentence")}
                      </p>
                      {ai.sentences.map((s, i) => (
                        <p key={i} className="text-sm">
                          <span className="font-semibold text-primary mr-1">{i + 1}.</span>
                          {lang === "vi" ? s.vi : s.en}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {ai?.corrected && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 mb-1">
                        {t("Bản sửa của bạn", "Your corrected paragraph")}
                      </p>
                      <p className="text-sm whitespace-pre-wrap">{ai.corrected}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-emerald-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  {t("Đoạn mẫu chuẩn IELTS", "Model IELTS paragraph")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <p className="text-base font-medium flex-1 whitespace-pre-wrap leading-relaxed">{item.en}</p>
                  <Button variant="ghost" size="icon" onClick={() => speak(item.en)} aria-label="Play model paragraph">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                {ai?.upgraded && (
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-300 mb-1">
                      {t("Nâng cấp Band 7.5+", "Band 7.5+ upgrade")}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{ai.upgraded}</p>
                  </div>
                )}
                <div className="p-3 rounded-lg bg-muted/40 border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {t("Mẹo của thầy Hải", "Teacher Hai's tip")}
                  </p>
                  <p className="text-sm">{lang === "vi" ? item.noteVi : item.noteEn}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveNotebook} disabled={saved} className="gap-1.5">
                    {saved ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                    {saved ? t("Đã lưu", "Saved") : t("Lưu vào sổ tay", "Save to notebook")}
                  </Button>
                  <Button size="sm" onClick={() => goTo(index + 1)} className="gap-1.5">
                    {t("Đoạn tiếp theo", "Next paragraph")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParagraphTranslationPractice;
