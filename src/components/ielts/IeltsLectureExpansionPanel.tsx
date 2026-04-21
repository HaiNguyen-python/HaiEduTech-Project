/**
 * @file IeltsLectureExpansionPanel.tsx
 * @description Render expanded theory: Band descriptors, common mistakes,
 * paraphrase bank, sample sentences, and Mr. Hai's golden tips.
 */
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, AlertTriangle, ArrowRightLeft, Sparkles, Crown } from "lucide-react";
import { lectureExpansions } from "@/data/ieltsLectureExpansion";

const bandColors: Record<string, string> = {
  rose: "border-rose-400/60 bg-rose-500/5",
  amber: "border-amber-400/60 bg-amber-500/5",
  emerald: "border-emerald-400/60 bg-emerald-500/5",
  purple: "border-purple-400/60 bg-purple-500/5",
};

const bandTextColors: Record<string, string> = {
  rose: "text-rose-600 dark:text-rose-400",
  amber: "text-amber-600 dark:text-amber-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  purple: "text-purple-600 dark:text-purple-400",
};

const IeltsLectureExpansionPanel = ({ lectureId }: { lectureId: string }) => {
  const { t, language } = useLanguage();
  const exp = lectureExpansions[lectureId];

  if (!exp) return null;

  return (
    <div className="space-y-8 mt-2">
      {/* === BAND DESCRIPTORS === */}
      {exp.bandDescriptors && exp.bandDescriptors.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            {t("Tiêu chí từng Band (5.0 → 8.0+)", "Band Descriptors (5.0 → 8.0+)")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              "Hiểu rõ examiner đánh giá thế nào ở mỗi band để biết cần nâng cấp gì.",
              "Understand exactly how examiners assess each band, so you know what to upgrade."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exp.bandDescriptors.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`border-l-4 ${bandColors[b.color]}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-bold ${bandTextColors[b.color]}`}>{b.band}</h3>
                      <Badge variant="outline" className="text-xs">
                        {t(b.labelVi, b.label)}
                      </Badge>
                    </div>
                    <ul className="space-y-1.5 text-[15px] text-foreground">
                      {(language === "vi" ? b.criteriaVi : b.criteria).map((c, j) => (
                        <li key={j} className="flex gap-2">
                          <span className={`shrink-0 ${bandTextColors[b.color]}`}>•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* === COMMON MISTAKES — VN learners === */}
      {exp.commonMistakes && exp.commonMistakes.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            {t("Lỗi điển hình của học viên Việt Nam", "Common Mistakes by Vietnamese Learners")}
          </h2>
          <div className="space-y-4">
            {exp.commonMistakes.map((m, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 bg-destructive/5 border-r border-border">
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-destructive uppercase tracking-wide">
                        ❌ {t("Sai", "Wrong")}
                      </div>
                      <p className="text-[15px] text-foreground italic leading-relaxed">"{m.wrong}"</p>
                    </div>
                    <div className="p-4 bg-emerald-500/5">
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                        ✅ {t("Đúng", "Right")}
                      </div>
                      <p className="text-[15px] text-foreground italic leading-relaxed">"{m.right}"</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/40 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      💡 {t(m.explanationVi, m.explanation)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* === PARAPHRASE BANK === */}
      {exp.paraphraseBank && exp.paraphraseBank.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            {t("Ngân hàng Paraphrase", "Paraphrase Bank")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              "Nâng cấp từ vựng cơ bản → Band 7+ ngay lập tức.",
              "Upgrade basic vocabulary to Band 7+ instantly."
            )}
          </p>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ minWidth: 600 }}>
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide w-1/3">
                        {t("Cơ bản", "Basic")}
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        {t("Nâng cấp", "Upgraded")}
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        {t("Band", "Band")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exp.paraphraseBank.map((p, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground italic">"{p.basic}"</td>
                        <td className="px-4 py-3 text-foreground font-medium">{p.upgraded}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="outline" className="text-xs">{p.band}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* === SAMPLE SENTENCES === */}
      {exp.sampleSentences && exp.sampleSentences.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            {t("Câu mẫu Band 7.5+", "Band 7.5+ Sample Sentences")}
          </h2>
          <div className="space-y-4">
            {exp.sampleSentences.map((s, i) => (
              <Card key={i} className="border-l-4 border-l-purple-400/60">
                <CardContent className="p-5">
                  <Badge variant="outline" className="mb-2 text-xs text-purple-600 dark:text-purple-400 border-purple-400/40">
                    {t(s.categoryVi, s.category)}
                  </Badge>
                  <blockquote className="text-[16px] text-foreground leading-relaxed font-medium border-l-2 border-purple-300 pl-4 italic mb-3">
                    "{s.sentence}"
                  </blockquote>
                  <div className="text-sm text-muted-foreground bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
                    <span className="font-semibold text-purple-700 dark:text-purple-300">
                      🎯 {t("Vì sao hiệu quả: ", "Why it works: ")}
                    </span>
                    {t(s.whyItWorksVi, s.whyItWorks)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* === MR HAI GOLDEN TIPS === */}
      {exp.mrHaiTips && exp.mrHaiTips.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            {t("Mẹo vàng của Thầy Hải", "Mr. Hai's Golden Tips")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exp.mrHaiTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-amber-300/60 dark:border-amber-700/60 h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl shrink-0">{tip.emoji}</span>
                      <div>
                        <h3 className="text-base font-bold text-amber-800 dark:text-amber-300 mb-2">
                          {t(tip.titleVi, tip.title)}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-amber-900 dark:text-amber-100">
                          {t(tip.contentVi, tip.content)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default IeltsLectureExpansionPanel;
