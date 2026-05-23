/**
 * @file HskTestRoom.tsx - Single HSK mock exam runner.
 * Renders Listening (with TTS playback), Reading, and Writing sections
 * with a section-aware navigator, timer, and auto-grading + per-question
 * explanation panel.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Headphones, Volume2, XCircle, RotateCcw, ClipboardCheck, BookOpen, PenLine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { HSK_TESTS, totalQuestions, type HskQuestion } from "@/data/hskTests";
import { inferReadingEmoji } from "@/lib/hskReadingIllustration";

const speakZh = (text: string, rate = 0.85) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = rate;
  window.speechSynthesis.speak(u);
};

const SectionIcon = ({ id }: { id: string }) =>
  id === "listening" ? <Headphones className="w-4 h-4" /> :
  id === "reading" ? <BookOpen className="w-4 h-4" /> :
  <PenLine className="w-4 h-4" />;

const HskTestRoom = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const lv = Number(level);
  const test = HSK_TESTS[lv];

  // Flatten with section tagging for linear navigation
  const flat = useMemo(() => {
    if (!test) return [] as { q: HskQuestion; secIdx: number; qIdx: number }[];
    const list: { q: HskQuestion; secIdx: number; qIdx: number }[] = [];
    test.sections.forEach((s, secIdx) => {
      s.questions.forEach((q, qIdx) => list.push({ q, secIdx, qIdx }));
    });
    return list;
  }, [test]);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState((test?.durationMin ?? 30) * 60);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!test || submitted) return;
    if (!startedRef.current) startedRef.current = true;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(id); setSubmitted(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [test, submitted]);

  if (!test) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-foreground mb-4">{t("Không tìm thấy đề thi này.", "Test not found.")}</p>
          <Button onClick={() => navigate("/chinese/hsk/test")}>{t("Quay lại danh sách", "Back to list")}</Button>
        </div>
      </div>
    );
  }

  const total = totalQuestions(test);
  const item = flat[current];
  const section = test.sections[item?.secIdx ?? 0];
  const answered = Object.keys(answers).length;

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const pick = (idx: number) => {
    if (submitted) return;
    setAnswers(a => ({ ...a, [item.q.id]: idx }));
  };

  const score = useMemo(() => {
    let correct = 0;
    flat.forEach(({ q }) => {
      if (answers[q.id] === q.correct) correct++;
    });
    return { correct, total, percent: Math.round((correct / total) * 100) };
  }, [answers, flat, total]);

  const reset = () => {
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setSecondsLeft(test.durationMin * 60);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${test.title} | HSK Test | HaiEduTech`} description={test.intro} path={`/chinese/hsk/test/${lv}`} />
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/chinese/hsk/test")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại", "Back")}
          </Button>
          <div className="flex items-center gap-3 text-sm">
            <Badge variant="secondary" className="text-base"><ClipboardCheck className="w-4 h-4 mr-1" /> HSK {lv}</Badge>
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-mono text-base font-bold ${secondsLeft < 60 ? "bg-rose-500 text-white" : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40"}`}>
              <Clock className="w-4 h-4" /> {mm}:{ss}
            </span>
          </div>
        </div>

        {/* Section header */}
        <div className="mb-4 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 text-sm font-bold text-primary mb-1">
            <SectionIcon id={section.id} /> {section.nameVi}
          </div>
          <p className="text-xs text-muted-foreground">{section.description}</p>
        </div>

        {/* Question navigator */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {flat.map(({ q }, i) => {
            const isCurrent = i === current;
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = submitted && answers[q.id] === q.correct;
            const isWrong = submitted && answers[q.id] !== undefined && answers[q.id] !== q.correct;
            return (
              <button
                key={q.id}
                onClick={() => setCurrent(i)}
                className={`w-9 h-9 rounded-md text-xs font-mono font-bold border-2 transition-all ${
                  isCurrent ? "border-primary ring-2 ring-primary/30" :
                  isCorrect ? "bg-emerald-500 text-white border-emerald-600" :
                  isWrong ? "bg-rose-500 text-white border-rose-600" :
                  isAnswered ? "bg-primary/15 border-primary/40 text-foreground" :
                  "bg-card border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question card */}
        {item && (
          <motion.div
            key={item.q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border-2 border-border bg-card p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {t("Câu", "Question")} {current + 1} / {total}
              </span>
              <Badge variant="outline" className="text-xs uppercase">{item.q.type}</Badge>
            </div>

            {/* Listening: only TTS button visible (hide Chinese unless submitted) */}
            {item.q.section === "listening" && item.q.audio && (
              <div className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/30">
                <div className="flex items-center gap-3 mb-2">
                  <Button onClick={() => speakZh(item.q.audio!, 0.85)} size="sm" className="gap-2">
                    <Volume2 className="w-4 h-4" /> {t("Phát lần thường", "Play")}
                  </Button>
                  <Button onClick={() => speakZh(item.q.audio!, 0.6)} size="sm" variant="outline" className="gap-2">
                    <Volume2 className="w-4 h-4" /> {t("Phát chậm", "Slow")}
                  </Button>
                </div>
                {submitted && (
                  <div className="mt-2 text-sm">
                    <p className="font-bold text-foreground text-lg">{item.q.audio}</p>
                    {item.q.audioPinyin && <p className="text-muted-foreground italic">{item.q.audioPinyin}</p>}
                  </div>
                )}
              </div>
            )}

            {/* Reading prompt + optional pinyin */}
            {item.q.prompt && (
              <div className="mb-5">
                {/* Make picture-style prompts (emoji-heavy) much larger so they read as illustrations */}
                {(() => {
                  const raw = item.q.prompt || "";
                  // Picture-style prompt: only pictographs (flags, emoji, symbols), digits, punctuation.
                  const isPicPrompt =
                    item.q.type === "listen-tf" ||
                    /^[\p{Extended_Pictographic}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}\s\d:°✓✗\u200d\uFE0F]+$/u.test(raw);

                  // Auto-illustration for reading questions that ship without a picture
                  const autoEmoji =
                    item.q.section === "reading" && !isPicPrompt
                      ? inferReadingEmoji(raw)
                      : "";

                  return (
                    <>
                      {autoEmoji && (
                        <div className="mb-3 flex justify-center">
                          <div className="px-6 py-3 rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-500/15 dark:to-rose-500/15 border-2 border-amber-400/50 dark:border-amber-400/30 text-6xl sm:text-7xl leading-none">
                            {autoEmoji}
                          </div>
                        </div>
                      )}
                      <p className={`text-foreground leading-relaxed whitespace-pre-wrap font-bold ${isPicPrompt ? "text-5xl sm:text-7xl text-center py-4" : "text-2xl sm:text-3xl"}`}>
                        {item.q.prompt}
                      </p>
                    </>
                  );
                })()}

                {(test.showPinyin || submitted) && item.q.promptPinyin && (
                  <p className="text-base text-muted-foreground italic mt-1">{item.q.promptPinyin}</p>
                )}
                {submitted && item.q.promptVi && (
                  <p className="text-base text-primary mt-1">↳ {item.q.promptVi}</p>
                )}
              </div>
            )}

            {/* Scrambled words for write-order */}
            {item.q.scrambled && (
              <div className="mb-5 p-4 rounded-lg bg-secondary border border-border flex flex-wrap gap-2 justify-center">
                {item.q.scrambled.map((w, i) => (
                  <span key={i} className="px-4 py-2 rounded-md bg-card border border-border text-foreground text-2xl sm:text-3xl font-bold">{w}</span>
                ))}
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.q.options.map((opt, i) => {
                const picked = answers[item.q.id] === i;
                const isRight = submitted && i === item.q.correct;
                const isWrong = submitted && picked && i !== item.q.correct;
                // If the option label is purely emoji/picture content, render it much larger like real HSK 1-3 papers.
                const isPicOption = /^[\p{Extended_Pictographic}\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Component}\s\d:°✓✗\u200d\uFE0F]+$/u.test(opt.label);
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={submitted}
                    className={`text-left p-5 rounded-xl border-2 transition-all min-h-[88px] ${
                      isRight ? "border-emerald-500 bg-emerald-500/10" :
                      isWrong ? "border-rose-500 bg-rose-500/10" :
                      picked ? "border-primary bg-primary/10" :
                      "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
                        isRight ? "bg-emerald-500 text-white" :
                        isWrong ? "bg-rose-500 text-white" :
                        picked ? "bg-primary text-primary-foreground" :
                        "bg-secondary text-foreground"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <div className="flex-1">
                        <p className={`text-foreground font-bold leading-snug ${isPicOption ? "text-5xl sm:text-6xl text-center py-2" : "text-xl sm:text-2xl"}`}>{opt.label}</p>
                        {(test.showPinyin || submitted) && opt.pinyin && (
                          <p className="text-sm text-muted-foreground italic mt-1">{opt.pinyin}</p>
                        )}
                        {submitted && opt.vi && (
                          <p className="text-sm text-primary mt-1 font-semibold">↳ {opt.vi}</p>
                        )}
                      </div>
                      {isRight && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {isWrong && <XCircle className="w-5 h-5 text-rose-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation panel */}
            {submitted && item.q.explanation && (
              <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/40 text-sm text-foreground">
                💡 <strong>{t("Giải thích:", "Explanation:")}</strong> {item.q.explanation}
              </div>
            )}
            {submitted && item.q.answerSentence && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-sm">
                ✓ <strong>{t("Câu đúng:", "Correct sentence:")}</strong>{" "}
                <span className="text-lg font-bold text-foreground">{item.q.answerSentence}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Nav */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Button variant="outline" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> {t("Câu trước", "Prev")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t("Đã trả lời", "Answered")}: <strong className="text-foreground">{answered}/{total}</strong>
          </span>
          <Button onClick={() => setCurrent(c => Math.min(total - 1, c + 1))} disabled={current === total - 1} className="gap-1">
            {t("Câu sau", "Next")} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Submit / results */}
        {!submitted ? (
          <Button
            onClick={() => { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            size="lg"
            className="w-full bg-gradient-to-r from-red-500 to-amber-500 text-white font-bold"
          >
            <ClipboardCheck className="w-5 h-5 mr-2" /> {t("Nộp bài & xem điểm", "Submit & view score")}
          </Button>
        ) : (
          <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-6 text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              {t("Kết quả", "Result")}: {score.correct}/{score.total} ({score.percent}%)
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {score.percent >= test.passScore
                ? `🎉 ${t("Chúc mừng! Bạn đã đạt mức yêu cầu của", "Passed the threshold for")} HSK ${lv}.`
                : `📚 ${t("Cần", "Need")} ${test.passScore}% ${t("để đạt. Hãy ôn lại và thử lần nữa nhé!", "to pass. Review the explanations and try again!")}`}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={reset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Retry")}
              </Button>
              <Button onClick={() => navigate("/chinese/hsk/test")} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> {t("Chọn đề khác", "Pick another test")}
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HskTestRoom;
