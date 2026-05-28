/**
 * @file MotivationLetterSanityCheck.tsx
 * @description Inline client-side Sanity Check: word count, cliché detection,
 *   numeric-evidence audit. Used inside MotivationLetterGuide.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Sparkles, Lightbulb, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { analyzeMotivationLetter, OPENER_SAMPLES } from "@/data/motivationLetterOpeners";

const MotivationLetterSanityCheck = () => {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const report = useMemo(() => analyzeMotivationLetter(text), [text]);

  const scoreColor = report.score >= 80
    ? "from-emerald-500 to-teal-600"
    : report.score >= 60
      ? "from-amber-500 to-orange-600"
      : "from-rose-500 to-red-600";

  return (
    <div className="space-y-6">
      {/* Inspiration Gallery */}
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          {t("Thư viện mở bài cảm hứng", "Inspiration Gallery")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t(
            "6 đoạn hook mẫu cho 6 lĩnh vực - kèm phân tích vì sao chúng hiệu quả.",
            "6 sample opener hooks across 6 fields — each with a why-it-works deconstruction.",
          )}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {OPENER_SAMPLES.map((o) => (
            <Card key={o.id} className="overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${o.gradient}`} />
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{o.emoji}</span>
                  <Badge variant="outline" className="text-[10px]">{t(o.fieldVi, o.fieldEn)}</Badge>
                </div>
                <p className="text-xs italic leading-relaxed mb-3 text-foreground">
                  "{t(o.openerVi, o.openerEn)}"
                </p>
                <div className="rounded-md bg-amber-500/10 border border-amber-500/20 p-2.5">
                  <div className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {t("Vì sao hiệu quả", "Why it works")}
                  </div>
                  <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    {t(o.whyItWorksVi, o.whyItWorksEn)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sanity Check */}
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-50/60 to-orange-50/60 dark:from-amber-950/20 dark:to-orange-950/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">{t("Sanity Check tức thì", "Instant Sanity Check")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("Dán letter của bạn - kiểm tra cliché, độ dài, số liệu ngay tại trình duyệt.", "Paste your letter — check clichés, length, and numeric evidence locally in your browser.")}
              </p>
            </div>
          </div>

          <Textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t(
              "Dán toàn văn Motivation Letter của bạn vào đây…",
              "Paste your full Motivation Letter here…",
            )}
            className="bg-background"
          />

          {text.trim().length > 0 && (
            <div className="mt-4 space-y-3">
              {/* Score */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-br ${scoreColor} text-white font-bold text-sm shadow`}>
                    {report.score}/100
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{report.wordCount}</span> {t("từ", "words")} ·
                    {" "}
                    {t("mục tiêu", "target")} {report.targetMin}-{report.targetMax}
                  </div>
                </div>
                {report.issues.length === 0 && (
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t("Sạch sẽ!", "Clean!")}
                  </span>
                )}
              </div>
              <Progress value={report.score} className="h-2" />

              {/* Issues */}
              {report.issues.length > 0 && (
                <ul className="space-y-2">
                  {report.issues.map((i, idx) => (
                    <li
                      key={idx}
                      className="rounded-lg bg-background/80 border border-amber-500/30 p-3 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-foreground">{t(i.messageVi, i.messageEn)}</div>
                          {i.matchedText && (
                            <div className="mt-1 font-mono text-[11px] text-rose-600 dark:text-rose-400 truncate">
                              "{i.matchedText}"
                            </div>
                          )}
                          {(i.suggestionVi || i.suggestionEn) && (
                            <div className="mt-1 text-muted-foreground">
                              💡 {t(i.suggestionVi || "", i.suggestionEn || "")}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationLetterSanityCheck;
