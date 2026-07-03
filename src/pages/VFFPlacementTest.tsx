/**
 * @file VFFPlacementTest.tsx
 * @description 15-question placement wizard - recommends A1/A2/B1.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Sparkles, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { vffPlacementTest, scorePlacement } from "@/data/vietnamese/vffPlacementTest";
import { useVFFProgress } from "@/hooks/useVFFProgress";

const VFFPlacementTest = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { recordPlacement } = useVFFProgress();

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(vffPlacementTest.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const q = vffPlacementTest[idx];
  const isLast = idx === vffPlacementTest.length - 1;
  const answered = answers[idx] !== null;

  const setAns = (n: number) => {
    const next = [...answers];
    next[idx] = n;
    setAnswers(next);
  };

  const submit = () => {
    const result = scorePlacement(answers);
    recordPlacement(result.score, result.recommendedLevel);
    setSubmitted(true);
  };

  if (submitted) {
    const r = scorePlacement(answers);
    const levelPath = r.recommendedLevel === "A1" ? "/learn-vietnamese/for-foreigners/a1"
      : r.recommendedLevel === "A2" ? "/learn-vietnamese/for-foreigners/a2"
      : "/learn-vietnamese/for-foreigners/b1";

    return (
      <div className="min-h-screen bg-background">
        <SEO title="Placement Result | HaiEduTech" description="Your Vietnamese placement result" path="/learn-vietnamese/for-foreigners/placement" />
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-2 border-primary/30">
                <CardContent className="pt-8 pb-8 text-center">
                  <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4" />
                  <h1 className="text-3xl font-bold mb-2">{t("Kết quả xếp lớp", "Placement Result")}</h1>
                  <div className="text-5xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent my-4">
                    {r.score} / {r.total}
                  </div>
                  <div className="flex justify-center gap-2 mb-6">
                    <Badge variant="outline">A1: {r.a1}/5</Badge>
                    <Badge variant="outline">A2: {r.a2}/5</Badge>
                    <Badge variant="outline">B1: {r.b1}/5</Badge>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 p-5 mb-6">
                    <div className="text-sm text-muted-foreground mb-1">{t("Cấp độ đề xuất", "Recommended level")}</div>
                    <div className="text-3xl font-bold text-primary mb-2">{r.recommendedLevel}</div>
                    <p className="text-sm">{r.rationaleEn}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" onClick={() => navigate(levelPath)} className="bg-gradient-to-r from-primary to-emerald-500 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t(`Bắt đầu học ${r.recommendedLevel}`, `Start ${r.recommendedLevel}`)}
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate("/learn-vietnamese/for-foreigners")}>
                      {t("Về trang chính", "Back to Hub")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Placement Test | Vietnamese for Foreigners | HaiEduTech" description="15-question adaptive placement test to find your Vietnamese CEFR level" path="/learn-vietnamese/for-foreigners/placement" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{t("Câu", "Question")} {idx + 1} / {vffPlacementTest.length}</span>
              <Badge variant="outline">{q.level} · {q.skill}</Badge>
            </div>
            <Progress value={((idx + 1) / vffPlacementTest.length) * 100} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <Card className="border-2 border-primary/25">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-1">{q.question}</h2>
                  <p className="text-sm text-muted-foreground italic mb-5">{q.questionEn}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, i) => {
                      const selected = answers[idx] === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setAns(i)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                            selected
                              ? "border-primary bg-primary/10 font-semibold"
                              : "border-muted hover:border-primary/40"
                          }`}
                        >
                          <span className="inline-block w-6 h-6 rounded-full bg-muted text-center text-sm mr-2">{String.fromCharCode(65 + i)}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(i => i - 1)}>
                      {t("Trước", "Prev")}
                    </Button>
                    {isLast ? (
                      <Button disabled={!answered} onClick={submit} className="bg-gradient-to-r from-primary to-emerald-500 text-white">
                        {t("Nộp bài", "Submit")}
                        <CheckCircle2 className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button disabled={!answered} onClick={() => setIdx(i => i + 1)}>
                        {t("Tiếp", "Next")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("Bài kiểm tra 15 câu · 5 câu mỗi cấp độ A1/A2/B1", "15 questions · 5 per level A1/A2/B1")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFPlacementTest;
