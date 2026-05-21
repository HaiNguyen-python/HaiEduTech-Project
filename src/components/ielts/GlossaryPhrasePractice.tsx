/**
 * @file GlossaryPhrasePractice.tsx
 * @description Inline per-glossary-row writing practice. The student writes a
 *   sentence using the target IELTS phrase, then the existing
 *   `grade-phrase-sentence` Perplexity-powered edge function scores it for
 *   grammar + correct use of the phrase, and shows an upgraded Band 7.5+ version.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2, AlertCircle, Lightbulb, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GradeResult {
  score: number;
  phraseUsedCorrectly: boolean;
  grammarFeedback: string;
  phraseFeedback: string;
  upgradedVersion: string;
  tips?: string[];
}

interface Props {
  phrase: string;
  phraseMeaning?: string;
  taskType: 1 | 2;
}

const GlossaryPhrasePractice: React.FC<Props> = ({ phrase, phraseMeaning, taskType }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  const handleGrade = async () => {
    const trimmed = sentence.trim();
    if (trimmed.length < 5) {
      toast.error(t("Viết câu của bạn (ít nhất 5 ký tự).", "Write your sentence (at least 5 characters)."));
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-phrase-sentence", {
        body: { phrase, phraseMeaning, userSentence: trimmed, taskType },
      });
      if (error) throw error;
      setResult(data as GradeResult);
    } catch (e) {
      console.error("Glossary grade error", e);
      toast.error(t("Không thể chấm điểm lúc này. Thử lại sau.", "Could not grade right now. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <Button
        size="sm"
        variant="ghost"
        className="h-7 px-2 text-xs text-primary hover:bg-primary/5"
        onClick={() => setOpen((o) => !o)}
      >
        <Sparkles className="w-3 h-3 mr-1" />
        {open
          ? t("Đóng phần luyện viết", "Close practice")
          : t("Viết câu với cụm này & chấm điểm", "Use this phrase in a sentence → grade")}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-lg border bg-muted/30 p-3 space-y-3">
              <Textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder={t(
                  `Viết một câu sử dụng "${phrase}"...`,
                  `Write a sentence using "${phrase}"...`
                )}
                className="min-h-[70px] text-sm bg-background"
              />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleGrade} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                      {t("Đang chấm...", "Grading...")}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      {t("Chấm điểm", "Grade")}
                    </>
                  )}
                </Button>
                {result && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setSentence("");
                      setResult(null);
                    }}
                  >
                    {t("Viết lại", "Try again")}
                  </Button>
                )}
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 rounded-md bg-background border p-3"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={result.score >= 7 ? "default" : result.score >= 5 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      Band ~ {result.score}/9
                    </Badge>
                    {result.phraseUsedCorrectly ? (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t("Dùng cụm từ đúng", "Phrase used correctly")}
                      </span>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400 inline-flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {t("Cần dùng cụm từ tự nhiên hơn", "Phrase usage needs work")}
                      </span>
                    )}
                  </div>

                  <div className="text-xs space-y-1.5">
                    <p>
                      <span className="font-semibold text-foreground">
                        {t("Ngữ pháp: ", "Grammar: ")}
                      </span>
                      <span className="text-foreground/80">{result.grammarFeedback}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-foreground">
                        {t("Cách dùng cụm: ", "Phrase usage: ")}
                      </span>
                      <span className="text-foreground/80">{result.phraseFeedback}</span>
                    </p>
                  </div>

                  {result.upgradedVersion && (
                    <div className="rounded-md bg-gradient-to-r from-primary/5 to-emerald-500/5 border border-primary/20 p-2.5">
                      <p className="text-[11px] font-semibold text-primary mb-1 inline-flex items-center gap-1">
                        <Wand2 className="w-3 h-3" />
                        {t("Phiên bản Band 7.5+", "Band 7.5+ upgrade")}
                      </p>
                      <p className="text-xs italic text-foreground">{result.upgradedVersion}</p>
                    </div>
                  )}

                  {result.tips && result.tips.length > 0 && (
                    <div className="text-[11px] text-muted-foreground">
                      <p className="font-semibold inline-flex items-center gap-1 mb-0.5">
                        <Lightbulb className="w-3 h-3" />
                        {t("Mẹo:", "Tips:")}
                      </p>
                      <ul className="list-disc list-inside space-y-0.5">
                        {result.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlossaryPhrasePractice;
