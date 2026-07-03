/**
 * @file VFFPlacementAdaptive.tsx
 * @description Adaptive placement test - branches on correctness, stops at 12 items.
 */
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VFF_PLACEMENT_BANK, scoreToLevel, VFFPlacementItem } from "@/data/vietnamese/vffPlacementBank";
import { useVFFProgress } from "@/hooks/useVFFProgress";

const MAX_Q = 12;

const pickNext = (currentDiff: number, asked: Set<string>): VFFPlacementItem | null => {
  const pool = VFF_PLACEMENT_BANK.filter(i => !asked.has(i.id));
  if (pool.length === 0) return null;
  // Prefer exact diff, else nearest.
  for (const d of [currentDiff, currentDiff - 1, currentDiff + 1, currentDiff - 2, currentDiff + 2, 1, 5]) {
    const found = pool.find(i => i.difficulty === d);
    if (found) return found;
  }
  return pool[0];
};

const VFFPlacementAdaptive = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { recordPlacement } = useVFFProgress();

  const [diff, setDiff] = useState<number>(2);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const [correctByDiff, setCorrectByDiff] = useState<Record<number, number>>({});
  const [wrongByDiff, setWrongByDiff] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState<VFFPlacementItem | null>(() => VFF_PLACEMENT_BANK.find(i => i.difficulty === 2)!);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const totalAsked = asked.size + (current ? 1 : 0);
  const level = useMemo(() => scoreToLevel(correctByDiff), [correctByDiff]);

  const submit = () => {
    if (picked === null || !current) return;
    const correct = picked === current.answerIndex;
    const nextAsked = new Set(asked); nextAsked.add(current.id);
    const nextCorrect = { ...correctByDiff };
    const nextWrong = { ...wrongByDiff };
    if (correct) nextCorrect[current.difficulty] = (nextCorrect[current.difficulty] || 0) + 1;
    else nextWrong[current.difficulty] = (nextWrong[current.difficulty] || 0) + 1;

    let newDiff = current.difficulty + (correct ? 1 : -1);
    if (newDiff < 1) newDiff = 1; if (newDiff > 5) newDiff = 5;

    if (nextAsked.size >= MAX_Q) {
      setAsked(nextAsked); setCorrectByDiff(nextCorrect); setWrongByDiff(nextWrong);
      const lvl = scoreToLevel(nextCorrect);
      const totalCorrect = Object.values(nextCorrect).reduce((a, b) => a + b, 0);
      const scorePct = Math.round((totalCorrect / MAX_Q) * 100);
      recordPlacement(scorePct, lvl);
      setDone(true);
      return;
    }
    const next = pickNext(newDiff, nextAsked);
    setAsked(nextAsked); setCorrectByDiff(nextCorrect); setWrongByDiff(nextWrong); setDiff(newDiff);
    setCurrent(next); setPicked(null);
  };

  if (done) {
    const totalCorrect = Object.values(correctByDiff).reduce((a, b) => a + b, 0);
    const scorePct = Math.round((totalCorrect / MAX_Q) * 100);
    const path = level === "A1" ? "/learn-vietnamese/for-foreigners/a1" : level === "A2" ? "/learn-vietnamese/for-foreigners/a2" : "/learn-vietnamese/for-foreigners/b1";
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Placement Result | HaiEduTech" description="Your Vietnamese CEFR level result." path="/learn-vietnamese/for-foreigners/placement-adaptive" />
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-2xl">
            <Card className="border-2 border-primary/25">
              <CardContent className="pt-10 pb-10 text-center">
                <Trophy className="w-14 h-14 mx-auto text-amber-500 mb-3" />
                <div className="text-sm text-muted-foreground">{t("Cấp độ đề xuất", "Recommended level")}</div>
                <div className="text-6xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent my-3">{level}</div>
                <div className="text-sm">{totalCorrect}/{MAX_Q} {t("câu đúng", "correct")} · {scorePct}%</div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <Button onClick={() => navigate(path)} className="bg-gradient-to-r from-primary to-emerald-500 text-white">{t("Bắt đầu học", "Start learning")}</Button>
                  <Button variant="outline" onClick={() => navigate("/learn-vietnamese/for-foreigners")}>{t("Về hub", "Back to hub")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!current) return null;
  const pct = Math.round((totalAsked / MAX_Q) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Adaptive Placement | HaiEduTech" description="Adaptive Vietnamese placement test - stops at 12 questions." path="/learn-vietnamese/for-foreigners/placement-adaptive" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-5 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold">{t("Kiểm tra thích ứng", "Adaptive Placement")}</h1>
            </div>
            <p className="text-xs text-muted-foreground">{t("Câu hỏi khó dần theo đáp án của bạn. Tối đa 12 câu.", "Questions adapt to your answers. Max 12 items.")}</p>
          </div>
          <div className="mb-3 flex items-center justify-between text-xs">
            <span>{totalAsked}/{MAX_Q}</span>
            <Badge variant="outline">{t("Độ khó", "Difficulty")}: {current.difficulty}/5</Badge>
          </div>
          <Progress value={pct} className="h-1.5 mb-4" />
          <Card className="border-2">
            <CardContent className="pt-5">
              <div className="text-lg font-semibold mb-4">{current.prompt}</div>
              <div className="space-y-2">
                {current.choices.map((c, i) => (
                  <button key={i} onClick={() => setPicked(i)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition ${picked === i ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"}`}>
                    {c}
                  </button>
                ))}
              </div>
              <Button onClick={submit} disabled={picked === null} className="w-full mt-4">{t("Câu tiếp theo", "Next question")}</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFPlacementAdaptive;
