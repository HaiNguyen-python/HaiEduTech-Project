/**
 * @file HskGrammar.tsx
 * @description HSK Grammar review hub for HSK 1-6.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { HSK_GRAMMAR } from "@/data/hskGrammar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, GraduationCap, Lightbulb, Volume2 } from "lucide-react";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const HskGrammar = () => {
  const { t, lang } = useLanguage();
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  const level = useMemo(
    () => HSK_GRAMMAR.find((l) => l.level === activeLevel)!,
    [activeLevel]
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HSK Grammar 1-6: Ngữ Pháp Tiếng Trung Đầy Đủ | HaiEduTech"
        description="Tổng hợp các điểm ngữ pháp HSK từ HSK 1 đến HSK 6: cấu trúc, giải thích song ngữ, ví dụ Hán tự + Pinyin, mẹo làm bài."
        path="/chinese/hsk-grammar"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge variant="secondary" className="mb-4 text-sm">
            <GraduationCap className="w-4 h-4 mr-2 inline" />
            {t("Ngữ pháp HSK 1-6", "HSK Grammar 1-6")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            {t("HSK Grammar - Toàn bộ điểm ngữ pháp", "HSK Grammar - All Key Points")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Mỗi cấp độ tổng hợp các cấu trúc trọng tâm, giải thích song ngữ và ví dụ Hán tự + Pinyin có audio.",
              "Each level groups core patterns with bilingual explanations and Hanzi + Pinyin examples with audio."
            )}
          </p>
        </motion.div>

        {/* Level switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {HSK_GRAMMAR.map((l) => (
            <Button
              key={l.level}
              variant={activeLevel === l.level ? "default" : "outline"}
              onClick={() => setActiveLevel(l.level as 1 | 2 | 3 | 4 | 5 | 6)}
              className="font-semibold"
            >
              <span className="mr-1">{l.badge}</span> HSK {l.level}
            </Button>
          ))}
        </div>

        {/* Level summary */}
        <motion.div
          key={level.level}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-6"
        >
          <div className="flex items-start gap-3">
            <BookOpen className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                {lang === "vi" ? level.titleVi : level.titleEn}
              </h2>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {lang === "vi" ? level.summaryVi : level.summaryEn}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {level.points.length} {t("điểm ngữ pháp", "grammar points")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Grammar points */}
        <Accordion type="multiple" className="space-y-3">
          {level.points.map((p, idx) => (
            <AccordionItem
              key={p.id}
              value={p.id}
              className="border border-border/60 rounded-xl px-4 bg-card/40"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/15 text-red-500 font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-base md:text-lg">
                      {lang === "vi" ? p.title : p.titleEn}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {p.pattern}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {lang === "vi" ? p.explanationVi : p.explanationEn}
                  </p>

                  <div className="space-y-2">
                    {p.examples.map((ex, i) => (
                      <Card
                        key={i}
                        className="p-3 md:p-4 bg-background/60 border-border/40"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-lg md:text-xl font-bold text-foreground">
                              {ex.hanzi}
                            </p>
                            <p className="text-sm text-amber-600 dark:text-amber-400 italic mt-0.5">
                              {ex.pinyin}
                            </p>
                            <p className="text-sm text-foreground/85 mt-1">
                              {lang === "vi" ? ex.vi : ex.en}
                            </p>
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => speak(ex.hanzi)}
                            aria-label="Play audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {(p.tipVi || p.tipEn) && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/90">
                        <span className="font-semibold text-emerald-600 mr-1">
                          {t("Mẹo:", "Tip:")}
                        </span>
                        {lang === "vi" ? p.tipVi : p.tipEn}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
};

export default HskGrammar;
