/**
 * @file ChinesePronunciation.tsx
 * @description Chinese pinyin pronunciation lessons - initials, finals, tones,
 * tone sandhi and Vietnamese-specific traps, with audio and per-lesson quizzes.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle2, XCircle, RefreshCw, ArrowRight, Mic, Target, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import { chinesePronunciationLessons, type PronLesson } from "@/data/chinesePronunciation";
import { safeStorage } from "@/lib/safeStorage";

const STORAGE_KEY = "chinese-pronunciation-progress";

const speak = (text: string, slow = false) => {
  stopChineseTts();
  void playChineseTts(text, { playbackRate: slow ? 0.7 : 0.9, speechRate: slow ? 0.45 : 0.7 });
};

const SoundRow = ({ item }: { item: PronLesson["groups"][number]["items"][number] }) => {
  const { t } = useLanguage();
  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-primary/5 transition-colors">
      <td className="py-3 pr-3 align-top">
        <span className="text-base font-bold text-primary whitespace-nowrap">{item.sound}</span>
      </td>
      <td className="py-3 pr-3 align-top text-base text-muted-foreground min-w-[180px]">
        {t(item.howVi, item.howEn)}
      </td>
      <td className="py-3 pr-3 align-top">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground whitespace-nowrap">{item.hanzi}</span>
          <button
            onClick={() => speak(item.hanzi)}
            aria-label={t("Nghe", "Listen")}
            className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-primary" />
          </button>
        </div>
        <p className="text-sm text-primary/80 mt-0.5">{item.pinyin}</p>
      </td>
      <td className="py-3 align-top text-base text-foreground min-w-[140px]">
        {t(item.meaningVi, item.meaningEn)}
      </td>
    </tr>
  );
};

const LessonQuiz = ({ lesson, onDone }: { lesson: PronLesson; onDone: (score: number, total: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = lesson.quiz[idx];

  const reset = () => { setIdx(0); setPicked(null); setScore(0); setFinished(false); };

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (idx + 1 >= lesson.quiz.length) {
      setFinished(true);
      onDone(score + (picked === q.answer ? 0 : 0), lesson.quiz.length);
      return;
    }
    setIdx(i => i + 1);
    setPicked(null);
  };

  useEffect(() => {
    if (finished) onDone(score, lesson.quiz.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  if (finished) {
    const pct = Math.round((score / lesson.quiz.length) * 100);
    return (
      <div className="rounded-xl border border-border bg-secondary/40 p-6 text-center">
        <p className="text-2xl font-bold text-primary mb-1">{score}/{lesson.quiz.length} - {pct}%</p>
        <p className="text-base text-muted-foreground mb-4">
          {pct >= 80
            ? t("Xuất sắc! Bạn đã nắm phần này.", "Excellent - you have got this section.")
            : t("Hãy nghe lại bảng âm phía trên rồi làm lại nhé.", "Replay the sound table above, then try again.")}
        </p>
        <Button onClick={reset} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> {t("Làm lại", "Try again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">
          {t("Câu", "Question")} {idx + 1}/{lesson.quiz.length}
        </span>
        <span className="text-sm text-primary font-semibold">{t("Điểm", "Score")}: {score}</span>
      </div>

      <p className="text-base sm:text-lg font-semibold text-foreground mb-3">{t(q.promptVi, q.promptEn)}</p>

      {q.audio && (
        <Button onClick={() => speak(q.audio!)} variant="outline" size="sm" className="gap-2 mb-4">
          <Volume2 className="w-4 h-4" /> {t("Nghe lại", "Play audio")}
        </Button>
      )}

      <div className="grid sm:grid-cols-2 gap-2">
        {q.options.map((opt, i) => {
          const isRight = i === q.answer;
          const state = picked === null
            ? "border-border bg-card hover:border-primary/50"
            : isRight
              ? "border-emerald-500 bg-emerald-500/10"
              : picked === i
                ? "border-red-500 bg-red-500/10"
                : "border-border bg-card opacity-60";
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              className={`flex items-center gap-2 text-left px-4 py-3 rounded-lg border-2 transition-all text-base text-foreground ${state}`}
            >
              {picked !== null && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
              {picked === i && !isRight && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 mb-3">
            <p className="text-base text-foreground">{t(q.explainVi, q.explainEn)}</p>
          </div>
          <Button onClick={next} className="gap-2">
            {idx + 1 >= lesson.quiz.length ? t("Xem kết quả", "See result") : t("Câu tiếp", "Next")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const LessonCard = ({ lesson, open, onToggle, best, onScore }: {
  lesson: PronLesson;
  open: boolean;
  onToggle: () => void;
  best?: number;
  onScore: (pct: number) => void;
}) => {
  const { t, lang } = useLanguage();
  const theory = lang === "vi" ? lesson.theoryVi : lesson.theoryEn;

  return (
    <div className="glass-card rounded-2xl border border-border overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-5 text-left hover:bg-primary/5 transition-colors">
        <span className="text-2xl">{lesson.emoji}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-foreground">{t(lesson.titleVi, lesson.titleEn)}</h2>
          <p className="text-base text-muted-foreground mt-0.5">{t(lesson.summaryVi, lesson.summaryEn)}</p>
        </div>
        {typeof best === "number" && (
          <Badge className="bg-emerald-500/20 text-emerald-500 shrink-0">{best}%</Badge>
        )}
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 space-y-6">
              {/* Theory */}
              <div className="space-y-3">
                {theory.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">{p}</p>
                ))}
              </div>

              {/* Sound tables */}
              {lesson.groups.map((g, gi) => (
                <div key={gi}>
                  <h3 className="text-base font-bold text-primary mb-1">{t(g.titleVi, g.titleEn)}</h3>
                  {g.noteVi && (
                    <p className="text-sm text-muted-foreground mb-2">{t(g.noteVi, g.noteEn || g.noteVi)}</p>
                  )}
                  <div className="overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full min-w-[600px] text-left">
                      <thead className="bg-secondary/60">
                        <tr className="text-sm text-muted-foreground">
                          <th className="py-2 px-3 font-semibold">{t("Âm", "Sound")}</th>
                          <th className="py-2 px-3 font-semibold">{t("Cách đọc", "How to say it")}</th>
                          <th className="py-2 px-3 font-semibold">{t("Ví dụ", "Example")}</th>
                          <th className="py-2 px-3 font-semibold">{t("Nghĩa", "Meaning")}</th>
                        </tr>
                      </thead>
                      <tbody className="px-3">
                        {g.items.map((item, i) => <SoundRow key={i} item={item} />)}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-primary"
                      onClick={() => speak(g.items.map(i => i.hanzi).join("，"), true)}
                    >
                      <Volume2 className="w-4 h-4" /> {t("Nghe chậm cả nhóm", "Play whole group slowly")}
                    </Button>
                  </div>
                </div>
              ))}

              {/* Teacher tip */}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
                <p className="text-base text-foreground">{t(lesson.tipVi, lesson.tipEn)}</p>
              </div>

              {/* Quiz */}
              <div>
                <h3 className="text-base font-bold text-primary mb-2">
                  {t("Kiểm tra cuối bài", "End-of-lesson quiz")} ({lesson.quiz.length} {t("câu", "questions")})
                </h3>
                <LessonQuiz
                  lesson={lesson}
                  onDone={(score, total) => onScore(Math.round((score / total) * 100))}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChinesePronunciation = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(chinesePronunciationLessons[0]?.id ?? null);
  const [scores, setScores] = useState<Record<string, number>>(() => {
    return safeStorage.get<Record<string, number>>(STORAGE_KEY, {}) ?? {};
  });

  useEffect(() => () => stopChineseTts(), []);

  const saveScore = useCallback((id: string, pct: number) => {
    setScores(prev => {
      if ((prev[id] ?? -1) >= pct) return prev;
      const next = { ...prev, [id]: pct };
      safeStorage.set(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const totalQuestions = useMemo(
    () => chinesePronunciationLessons.reduce((n, l) => n + l.quiz.length, 0),
    [],
  );
  const done = Object.keys(scores).length;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Chinese Pronunciation - Pinyin, Initials, Finals & Tones | HaiEduTech"
        description="Learn Mandarin pronunciation step by step: pinyin structure, 21 initials, all finals, the four tones, tone sandhi and the sound pairs Vietnamese learners confuse most."
      />
      <Navbar />

      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                🔊 {t("Phát âm tiếng Trung", "Chinese Pronunciation")}{" "}
                <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                  Pinyin
                </span>
              </h1>
              <p className="text-base text-muted-foreground mb-4">
                {t(
                  `${chinesePronunciationLessons.length} bài học - thanh mẫu, vận mẫu, thanh điệu, biến điệu và các cặp âm người Việt hay sai. ${totalQuestions} câu kiểm tra kèm âm thanh.`,
                  `${chinesePronunciationLessons.length} lessons - initials, finals, tones, tone sandhi and the pairs Vietnamese learners confuse. ${totalQuestions} quiz questions with audio.`,
                )}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Badge className="bg-primary/15 text-primary text-sm">
                  {t("Đã làm", "Completed")}: {done}/{chinesePronunciationLessons.length}
                </Badge>
                <Link to="/chinese/tone-drill">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Target className="w-4 h-4" /> {t("Luyện 四声 Tone Drill", "Tone Drill 四声")}
                  </Button>
                </Link>
                <Link to="/speaking-coach/chinese">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mic className="w-4 h-4" /> {t("Speaking Coach tiếng Trung", "Chinese Speaking Coach")}
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {chinesePronunciationLessons.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    open={openId === lesson.id}
                    onToggle={() => setOpenId(openId === lesson.id ? null : lesson.id)}
                    best={scores[lesson.id]}
                    onScore={pct => saveScore(lesson.id, pct)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChinesePronunciation;
