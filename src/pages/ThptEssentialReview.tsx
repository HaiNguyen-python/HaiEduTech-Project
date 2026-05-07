/**
 * @file ThptEssentialReview.tsx
 * @description Essential Grammar & Vocabulary review for Vietnamese THPT National Exam.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { thptGrammarTopics, thptVocabThemes } from "@/data/thptEssentialReview";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Sparkles, AlertTriangle, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "en-US";
  utt.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utt);
};

const ThptEssentialReview = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"grammar" | "vocabulary">("grammar");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Ôn tập Ngữ pháp & Từ vựng THPT Quốc gia | HaiEduTech"
        description="Hệ thống 12 chuyên đề ngữ pháp trọng tâm và 8 chủ đề từ vựng cao tần chuẩn bị cho kỳ thi THPT Quốc gia môn tiếng Anh."
        path="/national-exam/essential-review"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" size="sm" onClick={() => navigate("/national-exam")} className="mb-4 gap-1">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại Phòng luyện thi", "Back to Practice Room")}
        </Button>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-4 h-4 mr-2 inline" /> {t("Ôn tập trọng tâm", "Essential Review")}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            Essential Grammar & Vocabulary
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "12 chuyên đề ngữ pháp trọng tâm và 8 chủ đề từ vựng cao tần - bám sát cấu trúc đề thi THPT Quốc gia môn tiếng Anh.",
              "12 core grammar topics and 8 high-frequency vocabulary themes — aligned with the THPT National Exam structure."
            )}
          </p>
        </motion.div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-3xl mx-auto">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{thptGrammarTopics.length}</div>
            <div className="text-xs text-muted-foreground">{t("Chuyên đề", "Grammar topics")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{thptVocabThemes.length}</div>
            <div className="text-xs text-muted-foreground">{t("Chủ đề từ vựng", "Vocab themes")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {thptVocabThemes.reduce((s, v) => s + v.words.length, 0)}+
            </div>
            <div className="text-xs text-muted-foreground">{t("Từ cao tần", "Key words")}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">8.0+</div>
            <div className="text-xs text-muted-foreground">{t("Điểm mục tiêu", "Target score")}</div>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "grammar" | "vocabulary")}>
          <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="grammar">📘 {t("Ngữ pháp", "Grammar")}</TabsTrigger>
            <TabsTrigger value="vocabulary">📚 {t("Từ vựng", "Vocabulary")}</TabsTrigger>
          </TabsList>

          {/* Grammar */}
          <TabsContent value="grammar" className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {thptGrammarTopics.map((g, i) => (
                <AccordionItem
                  key={g.id}
                  value={g.id}
                  className="rounded-xl border-2 border-border bg-card px-4 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{g.icon}</span>
                      <div>
                        <div className="font-bold text-base md:text-lg">
                          {String(i + 1).padStart(2, "0")}. {lang === "vi" ? g.titleVi : g.titleEn}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground font-normal mt-0.5">
                          {lang === "vi" ? g.summaryVi : g.summaryEn}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 space-y-4">
                    {/* Rules */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-primary mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> {t("Quy tắc cốt lõi", "Core Rules")}
                      </h4>
                      <ul className="space-y-1.5 text-sm">
                        {g.rules.map((r, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-primary font-bold">▸</span>
                            <span>{lang === "vi" ? r.vi : r.en}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-600 mb-2">
                        {t("Ví dụ", "Examples")}
                      </h4>
                      <div className="space-y-2">
                        {g.examples.map((ex, k) => (
                          <div key={k} className="flex items-start gap-2 text-sm">
                            <button
                              type="button"
                              onClick={() => speak(ex.en)}
                              className="shrink-0 p-1 rounded hover:bg-emerald-500/20 transition"
                              aria-label="Listen"
                            >
                              <Volume2 className="w-4 h-4 text-emerald-600" />
                            </button>
                            <div>
                              <div className="font-medium">{ex.en}</div>
                              <div className="text-xs text-muted-foreground italic">→ {ex.vi}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trap */}
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                      <h4 className="font-bold text-sm uppercase tracking-wide text-amber-600 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> {t("Bẫy thường gặp", "Common Trap")}
                      </h4>
                      <p className="text-sm leading-relaxed">{lang === "vi" ? g.trapVi : g.trapEn}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Vocabulary */}
          <TabsContent value="vocabulary" className="space-y-4">
            <Accordion type="single" collapsible className="space-y-3">
              {thptVocabThemes.map((v) => (
                <AccordionItem
                  key={v.id}
                  value={v.id}
                  className="rounded-xl border-2 border-border bg-card px-4 data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-3xl">{v.icon}</span>
                      <div>
                        <div className="font-bold text-base md:text-lg">
                          {lang === "vi" ? v.titleVi : v.titleEn}
                        </div>
                        <div className="text-xs text-muted-foreground font-normal mt-0.5">
                          {v.words.length} {t("từ vựng", "words")}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="grid sm:grid-cols-2 gap-3">
                      {v.words.map((w) => (
                        <div
                          key={w.en}
                          className="rounded-lg border border-border bg-secondary/30 p-3 hover:border-primary/40 hover:bg-primary/5 transition"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="font-bold text-base">{w.en}</div>
                            <button
                              type="button"
                              onClick={() => speak(w.en)}
                              className="shrink-0 p-1 rounded hover:bg-primary/15 transition"
                              aria-label="Listen"
                            >
                              <Volume2 className="w-4 h-4 text-primary" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary mr-1">{w.pos}</span>
                            {w.vi}
                          </div>
                          <div className="text-sm italic text-foreground/80">"{w.example}"</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ThptEssentialReview;
