// Auto-generated review quiz from a lesson's vocabulary list.
// Builds 2 activities: meaning-match MCQ and fill-in-the-blank from examples.
import { useMemo, useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface VocabItem {
  term: string;
  meaning: string;
  meaningEn?: string;
  example: string;
  exampleVi?: string;
  type?: string;
}

interface Props {
  vocabulary: VocabItem[];
  storageKey?: string;
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const escapeReg = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const VocabReviewQuiz = ({ vocabulary }: Props) => {
  const { t, lang: language } = useLanguage();
  const [mcqAns, setMcqAns] = useState<Record<number, number>>({});
  const [fillAns, setFillAns] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const items = useMemo(() => vocabulary.filter(v => v?.term && v?.example), [vocabulary]);

  const mcq = useMemo(() => {
    const picks = items.slice(0, Math.min(6, items.length));
    return picks.map((v, idx) => {
      const distractors = shuffle(items.filter(x => x.term !== v.term), idx + 7)
        .slice(0, 3)
        .map(x => language === "vi" ? x.meaning : (x.meaningEn || x.meaning));
      const correct = language === "vi" ? v.meaning : (v.meaningEn || v.meaning);
      const options = shuffle([correct, ...distractors], idx + 3);
      return { term: v.term, options, answer: options.indexOf(correct) };
    });
  }, [items, language]);

  const fills = useMemo(() => {
    const picks = items.slice(0, Math.min(5, items.length));
    return picks.map(v => {
      const re = new RegExp(escapeReg(v.term), "i");
      const blanked = v.example.replace(re, "_____");
      return { sentence: blanked, answer: v.term, hint: language === "vi" ? v.meaning : (v.meaningEn || v.meaning) };
    });
  }, [items, language]);

  if (items.length < 4) return null;

  const mcqScore = mcq.reduce((acc, q, i) => acc + (mcqAns[i] === q.answer ? 1 : 0), 0);
  const fillScore = fills.reduce((acc, q, i) => {
    const v = (fillAns[i] || "").trim().toLowerCase();
    return acc + (v && v === q.answer.toLowerCase() ? 1 : 0);
  }, 0);
  const total = mcq.length + fills.length;
  const score = mcqScore + fillScore;

  const reset = () => { setMcqAns({}); setFillAns({}); setSubmitted(false); };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base">
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t("Củng cố từ vựng", "Vocabulary Review")}
          </span>
          {submitted && (
            <span className={cn(
              "text-sm font-bold",
              score === total ? "text-green-500" : score >= total / 2 ? "text-yellow-500" : "text-destructive"
            )}>
              {score}/{total} {t("đúng", "correct")}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* MCQ */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("1. Chọn nghĩa đúng cho mỗi từ/cụm từ:", "1. Choose the correct meaning for each term:")}
          </p>
          {mcq.map((q, qi) => (
            <div key={qi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
              <p className="font-medium text-foreground">
                {qi + 1}. <span className="text-primary">{q.term}</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const selected = mcqAns[qi] === oi;
                  const isCorrect = q.answer === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setMcqAns(p => ({ ...p, [qi]: oi }))}
                      className={cn(
                        "text-left text-sm px-3 py-2 rounded-md border transition-all flex items-start gap-2",
                        submitted
                          ? isCorrect
                            ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-300"
                            : selected
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-border text-muted-foreground"
                          : selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                      )}
                    >
                      {submitted && isCorrect && <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                      {submitted && selected && !isCorrect && <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
                      <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Fill in the blank */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("2. Điền từ/cụm từ phù hợp vào chỗ trống:", "2. Fill in the blank with the correct term:")}
          </p>
          {fills.map((q, fi) => {
            const val = fillAns[fi] || "";
            const correct = submitted && val.trim().toLowerCase() === q.answer.toLowerCase();
            return (
              <div key={fi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
                <p className="text-sm leading-relaxed">{fi + 1}. {q.sentence}</p>
                <input
                  type="text"
                  value={val}
                  onChange={e => !submitted && setFillAns(p => ({ ...p, [fi]: e.target.value }))}
                  disabled={submitted}
                  placeholder={t("Gõ câu trả lời…", "Type your answer…")}
                  className={cn(
                    "w-full px-3 py-2 rounded-md border bg-background text-sm",
                    submitted
                      ? correct ? "border-green-500" : "border-destructive"
                      : "border-border focus:border-primary outline-none"
                  )}
                />
                {submitted && (
                  <p className={cn("text-xs", correct ? "text-green-600 dark:text-green-400" : "text-destructive")}>
                    {correct
                      ? t("Chính xác!", "Correct!")
                      : t(`Đáp án: ${q.answer}`, `Answer: ${q.answer}`)}
                    <span className="text-muted-foreground"> • {t("Gợi ý", "Hint")}: {q.hint}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {submitted ? (
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-1" /> {t("Làm lại", "Retry")}
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={Object.keys(mcqAns).length + Object.keys(fillAns).length === 0}
              onClick={() => setSubmitted(true)}
            >
              {t("Nộp bài", "Submit")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabReviewQuiz;
