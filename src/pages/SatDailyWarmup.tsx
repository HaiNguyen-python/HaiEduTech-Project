/**
 * @file SatDailyWarmup.tsx
 * @description 5 SAT questions per day pulled from the existing SAT lesson
 * quizzes (2 R&W, 2 Math, 1 vocab). Completion logs to `sat_daily_log` and
 * awards a SAT Star.
 */
import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Sparkles, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { allEnglishModules } from "@/data/languageCurriculum";
import { satVocabExpansion4 } from "@/data/satVocabExpansion4";
import { supabase } from "@/integrations/supabase/client";
import { recordSatMistake } from "@/hooks/useSatMistakes";
import { cn } from "@/lib/utils";

interface Q {
  section: "reading-writing" | "math" | "vocab";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  moduleId: string;
  lessonId: string;
}

const todayKey = () => new Date().toISOString().slice(0, 10);

// Deterministic-per-day RNG so the same student sees the same 5 questions.
const seededShuffle = <T,>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildDailyPool = (): Q[] => {
  const satMods = allEnglishModules.filter((m) => m.category === "sat");
  const rw: Q[] = [];
  const math: Q[] = [];
  for (const m of satMods) {
    const sec: "reading-writing" | "math" = /math/i.test(m.id + m.title) ? "math" : "reading-writing";
    for (const l of m.lessons) {
      for (const q of l.quiz ?? []) {
        const item: Q = {
          section: sec,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          moduleId: m.id,
          lessonId: l.id,
        };
        (sec === "math" ? math : rw).push(item);
      }
    }
  }
  // Vocab questions: simple "Which word means …?" from satVocabExpansion4
  const vocab: Q[] = satVocabExpansion4.slice(0, 60).map((w, i, all) => {
    const distractors = all.filter((_, j) => j !== i).slice(0, 30);
    const picks = seededShuffle(distractors, i * 7 + 3).slice(0, 3).map((d) => d.word);
    const options = seededShuffle([w.word, ...picks], i * 11 + 5);
    return {
      section: "vocab",
      question: `Which word means "${w.definition.vi}"?`,
      options,
      answer: options.indexOf(w.word),
      explanation: `${w.word} - ${w.example}`,
      moduleId: "sat-vocab",
      lessonId: "expansion",
    } as Q;
  });
  return [...rw, ...math, ...vocab];
};

const SatDailyWarmup = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [savedToday, setSavedToday] = useState<{ correct: number; total: number } | null>(null);

  const seed = useMemo(() => {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }, []);

  const todays = useMemo<Q[]>(() => {
    const pool = buildDailyPool();
    const rw = pool.filter((q) => q.section === "reading-writing");
    const math = pool.filter((q) => q.section === "math");
    const vocab = pool.filter((q) => q.section === "vocab");
    return [
      ...seededShuffle(rw, seed).slice(0, 2),
      ...seededShuffle(math, seed + 1).slice(0, 2),
      ...seededShuffle(vocab, seed + 2).slice(0, 1),
    ];
  }, [seed]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase
        .from("sat_daily_log")
        .select("correct,total")
        .eq("user_id", u.user.id)
        .eq("day", todayKey())
        .maybeSingle();
      if (data) {
        setSavedToday({ correct: data.correct, total: data.total });
        setSubmitted(true);
      }
    })();
  }, []);

  const score = todays.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);

  const handleSubmit = async () => {
    setSubmitted(true);
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      await supabase.from("sat_daily_log").upsert({
        user_id: u.user.id,
        day: todayKey(),
        correct: score,
        total: todays.length,
      }, { onConflict: "user_id,day" });
      // Save mistakes for review
      todays.forEach((q, i) => {
        if (answers[i] !== undefined && answers[i] !== q.answer) {
          recordSatMistake({
            source: "daily",
            moduleId: q.moduleId,
            lessonId: q.lessonId,
            section: q.section === "math" ? "math" : "reading-writing",
            questionType: q.section,
            question: q.question,
            options: q.options,
            chosenIndex: answers[i],
            correctIndex: q.answer,
            explanation: q.explanation,
          });
        }
      });
      setSavedToday({ correct: score, total: todays.length });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Helmet>
        <title>{t("Khởi động SAT mỗi ngày - HaiEduTech", "SAT Daily Warm-up - HaiEduTech")}</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <button onClick={() => navigate("/sat-curriculum")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại SAT Curriculum", "Back to SAT Curriculum")}
        </button>
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t("☀️ Khởi động SAT 5 câu/ngày", "☀️ Daily 5-Question SAT Warm-up")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("2 Reading & Writing · 2 Math · 1 Vocab. Đổi mỗi ngày, giữ chuỗi streak.", "2 Reading & Writing · 2 Math · 1 Vocab. Refreshes daily - keep your streak alive.")}
          </p>
          {savedToday && (
            <p className="mt-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {t(`Hôm nay bạn đã làm: ${savedToday.correct}/${savedToday.total} đúng ✓`, `Today's result: ${savedToday.correct}/${savedToday.total} ✓`)}
            </p>
          )}
        </header>

        <div className="space-y-5">
          {todays.map((q, i) => (
            <div key={i} className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {q.section === "math" ? "Math" : q.section === "vocab" ? "Vocab" : "R&W"}
                </span>
                <span className="text-xs text-muted-foreground">{i + 1}/{todays.length}</span>
              </div>
              <p className="text-[15px] leading-7 text-foreground font-medium mb-3">{q.question}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const picked = answers[i] === oi;
                  const isCorrect = q.answer === oi;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((p) => ({ ...p, [i]: oi }))}
                      className={cn(
                        "text-left text-sm px-3 py-2 rounded-lg border transition-all flex items-start gap-2",
                        submitted
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                            : picked
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-border text-muted-foreground"
                          : picked
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                      )}
                    >
                      {submitted && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                      {submitted && picked && !isCorrect && <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                      <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="text-xs mt-3 text-muted-foreground p-2 rounded-lg bg-muted/50">💬 {q.explanation}</p>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            disabled={Object.keys(answers).length < todays.length}
            onClick={handleSubmit}
            className="mt-6 w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-50"
          >
            {t("Nộp bài", "Submit")}
          </button>
        ) : (
          <div className="mt-6 flex items-center gap-3">
            <div className="text-lg font-bold">
              {t(`Kết quả: ${score}/${todays.length}`, `Score: ${score}/${todays.length}`)}
            </div>
            <button
              onClick={() => { setAnswers({}); setSubmitted(false); }}
              className="px-4 py-2 rounded-lg border border-border text-sm font-semibold inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> {t("Làm lại để luyện", "Practice again")}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SatDailyWarmup;
