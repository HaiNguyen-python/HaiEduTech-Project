/**
 * @file VFFGrammarReference.tsx
 * @description Reference of 25 core Vietnamese grammar points (A1-B1).
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Volume2, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { grammarByLevel } from "@/data/vietnamese/vffGrammarPoints";
import { playVietnameseTts } from "@/lib/vietnameseTts";

const speak = (text: string) => playVietnameseTts(text, { playbackRate: 0.85 }).catch(() => {});

const VFFGrammarReference = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<"A1" | "A2" | "B1">("A1");
  const points = grammarByLevel[level];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Vietnamese Grammar Reference (A1-B1) | HaiEduTech" description="25 core Vietnamese grammar points with formulas, examples, and common mistakes." path="/learn-vietnamese/for-foreigners/lab/grammar" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/15 to-primary/15 border border-blue-500/30 p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <Badge className="bg-blue-500 text-white">Grammar Reference</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-1">{t("25 điểm ngữ pháp cốt lõi", "25 Core Grammar Points")}</h1>
              <p className="text-muted-foreground">{t("Toàn bộ ngữ pháp cần cho A1 đến B1 - công thức + ví dụ + lỗi thường gặp.", "Every grammar you need from A1 to B1 - formulas, examples, and common mistakes.")}</p>
            </div>
          </motion.div>

          <Tabs value={level} onValueChange={(v) => setLevel(v as "A1" | "A2" | "B1")}>
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="A1">A1 ({grammarByLevel.A1.length})</TabsTrigger>
              <TabsTrigger value="A2">A2 ({grammarByLevel.A2.length})</TabsTrigger>
              <TabsTrigger value="B1">B1 ({grammarByLevel.B1.length})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {points.map((g, i) => (
              <Card key={g.id} className="border-primary/20">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="text-xs text-muted-foreground">#{i + 1} · {g.level}</div>
                      <h3 className="font-bold text-lg">{t(g.title, g.titleEn)}</h3>
                    </div>
                  </div>
                  <div className="rounded-md bg-muted p-2 font-mono text-sm mb-2">{g.formula}</div>
                  <p className="text-sm mb-3">{g.explanationEn}</p>
                  <div className="space-y-1.5">
                    {g.examples.map((e, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span className="font-medium">{e.vi}</span>
                        <span className="text-muted-foreground">- {e.en}</span>
                        <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto" onClick={() => speak(e.vi)}><Volume2 className="w-3 h-3" /></Button>
                      </div>
                    ))}
                  </div>
                  {g.commonMistakeEn && (
                    <div className="mt-3 p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs">
                      <div className="font-bold text-amber-700 dark:text-amber-400 mb-0.5 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5" /> Common mistake
                      </div>
                      {g.commonMistakeEn}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFGrammarReference;
