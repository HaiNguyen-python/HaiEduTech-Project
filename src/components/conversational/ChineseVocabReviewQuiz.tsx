// Auto-generated Chinese vocabulary review quiz with multiple exercise types.
// Builds 4 activities from a lesson's vocabulary list:
//   1) Meaning MCQ (Hanzi → English/Vietnamese)
//   2) Pinyin MCQ (Hanzi → Pinyin)
//   3) Hanzi from Pinyin (typing)
//   4) Fill-in-the-blank using the example sentence
import { useMemo, useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { speakChinese } from "@/lib/chineseTts";

interface VocabItem {
  hanzi: string;
  pinyin: string;
  meaningEn: string;
  meaningVi?: string;
  example: string;
  examplePinyin?: string;
  exampleEn?: string;
  type?: string;
}

interface Props {
  vocabulary: VocabItem[];
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

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const normalizePinyin = (s: string) =>
  s.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const ChineseVocabReviewQuiz = ({ vocabulary }: Props) => {
  const { t } = useLanguage();
  const [mcqAns, setMcqAns] = useState<Record<number, number>>({});
  const [pinyinAns, setPinyinAns] = useState<Record<number, number>>({});
  const [hanziAns, setHanziAns] = useState<Record<number, string>>({});
  const [fillAns, setFillAns] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const items = useMemo(
    () => vocabulary.filter((v) => v?.hanzi && v?.pinyin && v?.meaningEn),
    [vocabulary]
  );

  const mcq = useMemo(() => {
    const picks = items.slice(0, Math.min(5, items.length));
    return picks.map((v, idx) => {
      const distractors = shuffle(items.filter((x) => x.hanzi !== v.hanzi), idx + 7)
        .slice(0, 3)
        .map((x) => x.meaningEn);
      const options = shuffle([v.meaningEn, ...distractors], idx + 3);
      return { hanzi: v.hanzi, pinyin: v.pinyin, options, answer: options.indexOf(v.meaningEn) };
    });
  }, [items]);

  const pinyinMcq = useMemo(() => {
    const picks = items.slice(0, Math.min(4, items.length));
    return picks.map((v, idx) => {
      const distractors = shuffle(items.filter((x) => x.hanzi !== v.hanzi), idx + 13)
        .slice(0, 3)
        .map((x) => x.pinyin);
      const options = shuffle([v.pinyin, ...distractors], idx + 5);
      return { hanzi: v.hanzi, options, answer: options.indexOf(v.pinyin) };
    });
  }, [items]);

  const hanziFills = useMemo(() => {
    return items.slice(0, Math.min(4, items.length)).map((v) => ({
      pinyin: v.pinyin,
      meaning: v.meaningEn,
      answer: v.hanzi,
    }));
  }, [items]);

  const fills = useMemo(() => {
    return items
      .filter((v) => v.example?.includes(v.hanzi))
      .slice(0, 4)
      .map((v) => ({
        sentence: v.example.replace(new RegExp(esc(v.hanzi)), "＿＿"),
        pinyin: v.examplePinyin,
        answer: v.hanzi,
        hint: v.meaningEn,
      }));
  }, [items]);

  if (items.length < 4) return null;

  const score =
    mcq.reduce((a, q, i) => a + (mcqAns[i] === q.answer ? 1 : 0), 0) +
    pinyinMcq.reduce((a, q, i) => a + (pinyinAns[i] === q.answer ? 1 : 0), 0) +
    hanziFills.reduce(
      (a, q, i) => a + ((hanziAns[i] || "").trim() === q.answer ? 1 : 0),
      0
    ) +
    fills.reduce(
      (a, q, i) =>
        a + ((fillAns[i] || "").trim() === q.answer ? 1 : 0),
      0
    );
  const total = mcq.length + pinyinMcq.length + hanziFills.length + fills.length;

  const reset = () => {
    setMcqAns({});
    setPinyinAns({});
    setHanziAns({});
    setFillAns({});
    setSubmitted(false);
  };

  return (
    <Card className="border-red-500/30 bg-gradient-to-br from-red-500/5 to-amber-500/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2 text-base">
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-red-500" />
            {t("Củng cố từ vựng tiếng Trung", "Chinese Vocabulary Review")}
          </span>
          {submitted && (
            <span
              className={cn(
                "text-sm font-bold",
                score === total
                  ? "text-green-500"
                  : score >= total / 2
                  ? "text-yellow-500"
                  : "text-destructive"
              )}
            >
              {score}/{total} {t("đúng", "correct")}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        {/* 1. Meaning MCQ */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("1. Chọn nghĩa đúng cho mỗi từ:", "1. Choose the correct meaning:")}
          </p>
          {mcq.map((q, qi) => (
            <div key={qi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
              <div className="flex items-center gap-2">
                <button onClick={() => speakChinese(q.hanzi)} className="text-red-500 hover:text-red-600">
                  <Volume2 className="h-4 w-4" />
                </button>
                <span className="font-bold text-xl text-red-600">{q.hanzi}</span>
                <span className="text-xs text-muted-foreground">{q.pinyin}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const selected = mcqAns[qi] === oi;
                  const isCorrect = q.answer === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setMcqAns((p) => ({ ...p, [qi]: oi }))}
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
                      {submitted && selected && !isCorrect && (
                        <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      )}
                      <span>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Pinyin MCQ */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">
            {t("2. Chọn phiên âm pinyin đúng:", "2. Choose the correct pinyin:")}
          </p>
          {pinyinMcq.map((q, qi) => (
            <div key={qi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
              <span className="font-bold text-xl text-red-600">{q.hanzi}</span>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const selected = pinyinAns[qi] === oi;
                  const isCorrect = q.answer === oi;
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setPinyinAns((p) => ({ ...p, [qi]: oi }))}
                      className={cn(
                        "text-left text-sm px-3 py-2 rounded-md border transition-all italic",
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
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Hanzi from Pinyin */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">
            {t(
              "3. Gõ chữ Hán (汉字) phù hợp với pinyin và nghĩa:",
              "3. Type the Hanzi (汉字) matching the pinyin and meaning:"
            )}
          </p>
          {hanziFills.map((q, qi) => {
            const val = hanziAns[qi] || "";
            const ok = submitted && val.trim() === q.answer;
            return (
              <div key={qi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
                <p className="text-sm">
                  <span className="italic text-primary">{q.pinyin}</span>{" "}
                  <span className="text-muted-foreground">— {q.meaning}</span>
                </p>
                <input
                  type="text"
                  value={val}
                  onChange={(e) =>
                    !submitted && setHanziAns((p) => ({ ...p, [qi]: e.target.value }))
                  }
                  disabled={submitted}
                  placeholder={t("Gõ chữ Hán…", "Type Hanzi…")}
                  className={cn(
                    "w-full px-3 py-2 rounded-md border bg-background text-lg",
                    submitted
                      ? ok
                        ? "border-green-500"
                        : "border-destructive"
                      : "border-border focus:border-primary outline-none"
                  )}
                />
                {submitted && !ok && (
                  <p className="text-xs text-destructive">
                    {t("Đáp án", "Answer")}: <span className="font-bold">{q.answer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* 4. Fill in the blank */}
        {fills.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">
              {t(
                "4. Điền chữ Hán phù hợp vào chỗ trống:",
                "4. Fill the blank with the correct Hanzi:"
              )}
            </p>
            {fills.map((q, fi) => {
              const val = fillAns[fi] || "";
              const ok = submitted && val.trim() === q.answer;
              return (
                <div key={fi} className="space-y-2 rounded-lg border border-border bg-card/60 p-3">
                  <p className="text-base leading-relaxed">
                    {fi + 1}. {q.sentence}
                  </p>
                  {q.pinyin && <p className="text-xs italic text-primary/80">{q.pinyin}</p>}
                  <input
                    type="text"
                    value={val}
                    onChange={(e) =>
                      !submitted && setFillAns((p) => ({ ...p, [fi]: e.target.value }))
                    }
                    disabled={submitted}
                    placeholder={t("Điền chữ Hán…", "Fill Hanzi…")}
                    className={cn(
                      "w-full px-3 py-2 rounded-md border bg-background text-lg",
                      submitted
                        ? ok
                          ? "border-green-500"
                          : "border-destructive"
                        : "border-border focus:border-primary outline-none"
                    )}
                  />
                  {submitted && (
                    <p
                      className={cn(
                        "text-xs",
                        ok ? "text-green-600 dark:text-green-400" : "text-destructive"
                      )}
                    >
                      {ok
                        ? t("Chính xác!", "Correct!")
                        : `${t("Đáp án", "Answer")}: ${q.answer}`}
                      <span className="text-muted-foreground">
                        {" "}
                        • {t("Gợi ý", "Hint")}: {q.hint}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          {submitted ? (
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-1" /> {t("Làm lại", "Retry")}
            </Button>
          ) : (
            <Button size="sm" onClick={() => setSubmitted(true)}>
              {t("Nộp bài", "Submit")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChineseVocabReviewQuiz;
