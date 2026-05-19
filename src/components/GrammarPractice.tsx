/**
 * Grammar Practice - learners write sentences using advanced IELTS grammar
 * structures (cleft, inversion, mixed conditionals, participle clauses, ...)
 * to target Band 7+ Grammatical Range & Accuracy.
 *
 * Reuses the existing `grade-phrase-sentence` edge function, passing the
 * target structure formula as the "phrase" so the AI checks whether the
 * learner deployed that structure correctly.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Send, Loader2, CheckCircle2, XCircle, Lightbulb,
  ArrowUp, RotateCcw, Sparkles, GraduationCap, Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  IELTS_GRAMMAR,
  GRAMMAR_CATEGORIES,
  IELTSGrammarItem,
} from "@/data/ieltsGrammarBank";

interface GradeResult {
  score: number;
  phraseUsedCorrectly: boolean;   // -> structure used correctly
  grammarFeedback: string;
  phraseFeedback: string;          // -> structure feedback
  upgradedVersion: string;
  tips: string[];
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

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const GrammarPractice = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selected, setSelected] = useState<IELTSGrammarItem | null>(null);
  const [sentence, setSentence] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const filtered = useMemo(() => {
    if (activeCategory === "all") return IELTS_GRAMMAR;
    return IELTS_GRAMMAR.filter((g) => g.category === activeCategory);
  }, [activeCategory]);

  const handleSelect = (g: IELTSGrammarItem) => {
    setSelected(g);
    setSentence("");
    setResult(null);
  };

  const appendToNotebook = async (block: string) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;
      const title = `IELTS Grammar Practice Task ${taskType}`;
      const { data: rows } = await supabase
        .from("student_notebooks")
        .select("id, content")
        .eq("user_id", userData.user.id)
        .eq("title", title)
        .order("updated_at", { ascending: false })
        .limit(1);
      const existing = rows && rows.length > 0 ? rows[0] : null;
      const nowIso = new Date().toISOString();
      if (existing) {
        await supabase
          .from("student_notebooks")
          .update({ content: `${existing.content || ""}<hr/>${block}`, updated_at: nowIso })
          .eq("id", existing.id)
          .eq("user_id", userData.user.id);
      } else {
        await supabase.from("student_notebooks").insert({
          user_id: userData.user.id,
          title,
          subject: "ielts",
          content: block,
          is_public: false,
        });
      }
      window.dispatchEvent(new CustomEvent("notebook:updated"));
    } catch (e) {
      console.error("Grammar notebook save error:", e);
    }
  };

  const handleSubmit = async () => {
    if (!selected) {
      toast.error(t("Hãy chọn 1 cấu trúc ngữ pháp", "Please select a grammar structure"));
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
          phrase: selected.structure,
          phraseMeaning: `${selected.meaning} | Model example: ${selected.example}`,
          userSentence: sentence.trim(),
          taskType,
        },
      });
      if (error) {
        const status = (error as any)?.context?.status;
        if (status === 429) toast.error(t("Quá nhiều yêu cầu. Vui lòng thử lại sau.", "Rate limit exceeded. Please retry shortly."));
        else if (status === 402) toast.error(t("Hệ thống AI đã hết tín dụng.", "AI credits exhausted."));
        else toast.error(t("Không thể chấm điểm. Thử lại nhé.", "Grading failed. Please try again."));
        return;
      }
      const r = data as GradeResult;
      setResult(r);

      const ts = new Date().toLocaleString();
      const block =
        `<p><strong>🎯 ${escapeHtml(selected.structure)}</strong> <em>(${ts})</em></p>` +
        `<p><strong>My sentence:</strong> ${escapeHtml(sentence.trim())}</p>` +
        `<p><strong>Band 7.5+ Upgrade:</strong> ${escapeHtml(r.upgradedVersion || "")}</p>`;
      appendToNotebook(block);
    } catch (e) {
      console.error(e);
      toast.error(t("Đã có lỗi xảy ra", "Something went wrong"));
    } finally {
      setGrading(false);
    }
  };

  const scoreColor = (s: number) =>
    s >= 8 ? "text-emerald-500" : s >= 6 ? "text-blue-500" : s >= 4 ? "text-amber-500" : "text-red-500";

  const categoryColor = (cat: string) => {
    const map: Record<string, string> = {
      conditionals: "bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30",
      inversion: "bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30",
      cleft: "bg-pink-500/15 text-pink-600 dark:text-pink-300 border-pink-500/30",
      relative: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30",
      participle: "bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30",
      passive: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30",
      nominalisation: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30",
      comparison: "bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30",
      modals: "bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30",
      linking: "bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30",
    };
    return map[cat] || "bg-muted text-foreground border-border";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* LEFT: Structure list */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              {t("Ngân hàng cấu trúc nâng cao", "Advanced Structure Bank")}
              <Badge variant="secondary" className="ml-auto">
                {filtered.length} {t("cấu trúc", "items")}
              </Badge>
            </CardTitle>
            <div className="flex gap-1.5 pt-2 overflow-x-auto pb-1 -mx-1 px-1">
              {GRAMMAR_CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveCategory(c.value)}
                  className={`shrink-0 text-xs px-2.5 py-1 rounded-full border transition-colors whitespace-nowrap ${
                    activeCategory === c.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 border-border hover:bg-muted"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto space-y-2">
            {filtered.map((g) => {
              const active = selected?.id === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => handleSelect(g)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-foreground text-[14px] leading-snug">
                      {g.structure}
                    </span>
                    <Badge variant="outline" className={`shrink-0 text-[10px] capitalize ${categoryColor(g.category)}`}>
                      {g.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{g.meaning}</p>
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
              <GraduationCap className="w-12 h-12 mx-auto mb-3 text-primary/50" />
              <p className="text-base">
                {t(
                  "Chọn 1 cấu trúc bên trái để bắt đầu luyện viết câu Band 7+",
                  "Select a structure on the left to start practising Band 7+ sentences"
                )}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Selected structure card */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{selected.structure}</h3>
                  <Badge variant="outline" className={`capitalize ${categoryColor(selected.category)}`}>
                    {selected.category}
                  </Badge>
                </div>
                <p className="text-sm">
                  <span className="font-medium text-muted-foreground">{t("Giải thích:", "Meaning:")} </span>
                  <span className="text-foreground">{selected.meaning}</span>
                </p>
                {selected.hint && (
                  <p className="text-sm text-muted-foreground">
                    <Lightbulb className="inline w-3.5 h-3.5 mr-1 text-amber-500" />
                    {selected.hint}
                  </p>
                )}
                <div className="bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
                  <p className="text-xs text-muted-foreground mb-1 font-medium flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    {t("Ví dụ Band 7.5+:", "Band 7.5+ Example:")}
                  </p>
                  <p className="text-[15px] text-foreground italic leading-relaxed">
                    {renderBold(selected.example)}
                  </p>
                </div>
                )}
              </CardContent>
            </Card>

            {/* Writing area */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  {t(
                    "Viết câu của bạn dùng cấu trúc trên",
                    "Write your own sentence using the structure above"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  placeholder={t(
                    "Gõ câu của bạn ở đây... (tránh xem ví dụ trước nhé)",
                    "Type your sentence here... (try without peeking at the example)"
                  )}
                  className="min-h-[120px] text-base"
                  disabled={grading}
                />
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={handleSubmit} disabled={grading || !sentence.trim()}>
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
                  <Button
                    variant="outline"
                    onClick={() => { setSentence(""); setResult(null); }}
                    disabled={grading}
                  >
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
                              ? t("Cấu trúc được dùng đúng", "Structure used correctly")
                              : t("Cấu trúc cần điều chỉnh", "Structure needs adjustment")}
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

export default GrammarPractice;
