/**
 * @file VFFLevelPage.tsx
 * @description Reusable A1/B1 level page - lesson list + lesson detail + checkpoint.
 */
import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, CheckCircle2, XCircle, ChevronRight, GraduationCap, Sparkles, Trophy, Lightbulb, BookOpen, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vffLevelA1, vffLevelB1, VFFLevel, VFFLevelLesson } from "@/data/vietnamese/vffLevels";
import { vffLevelA2 } from "@/data/vietnamese/vffLevelA2";
import { useVFFProgress } from "@/hooks/useVFFProgress";
import { playVietnameseTts } from "@/lib/vietnameseTts";

type LevelKey = "a1" | "a2" | "b1";


const speak = (text: string, rate = 0.9) => {
  playVietnameseTts(text, { playbackRate: rate, speechRate: rate * 0.85 }).catch(() => { /* ignore */ });
};

function SpeakButton({ text, className }: { text: string; className?: string }) {
  return (
    <Button size="icon" variant="ghost" className={`h-7 w-7 shrink-0 ${className ?? ""}`} onClick={() => speak(text)}>
      <Volume2 className="w-3.5 h-3.5" />
    </Button>
  );
}

function LessonView({ lesson, level, onDone }: { lesson: VFFLevelLesson; level: VFFLevel; onDone: (scorePct: number) => void }) {
  const { t } = useLanguage();
  const [quizAns, setQuizAns] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState(false);

  const quizScore = useMemo(() => {
    let s = 0;
    lesson.quiz.forEach((q, i) => { if (quizAns[i] === q.answer) s++; });
    return Math.round((s / lesson.quiz.length) * 100);
  }, [quizAns, lesson.quiz]);

  const checkQuiz = () => {
    setQuizChecked(true);
    onDone(quizScore);
  };

  return (
    <div className="space-y-6">
      {/* Goal */}
      <div className="rounded-xl p-5 bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20">
        <div className="text-xs font-bold uppercase tracking-wide text-primary mb-1">{t("Mục tiêu bài học", "Learning goal")} · {lesson.minutes} min</div>
        <p className="font-semibold">{t(lesson.goal, lesson.goalEn)}</p>
      </div>

      <Tabs defaultValue="vocab" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vocab">{t("Từ vựng", "Vocab")}</TabsTrigger>
          <TabsTrigger value="dialogue">{t("Hội thoại", "Dialogue")}</TabsTrigger>
          <TabsTrigger value="grammar">{t("Ngữ pháp", "Grammar")}</TabsTrigger>
          <TabsTrigger value="drill">{t("Phát âm", "Drills")}</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        {/* Vocab */}
        <TabsContent value="vocab" className="mt-4">
          <div className="grid md:grid-cols-2 gap-3">
            {lesson.vocab.map((v, i) => (
              <Card key={i} className="border-primary/15">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-lg font-bold text-primary">{v.word}</div>
                      <div className="text-xs text-muted-foreground font-mono">{v.ipa}</div>
                      <div className="text-sm mt-1">{v.meaning}</div>
                      <div className="text-xs text-muted-foreground italic mt-1">"{v.example}" - {v.exampleEn}</div>
                    </div>
                    <SpeakButton text={v.word} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Dialogue */}
        <TabsContent value="dialogue" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <Button size="sm" variant="outline" onClick={() => lesson.dialogue.forEach((d, i) => setTimeout(() => speak(d.vi), i * 2500))}>
                <Volume2 className="w-4 h-4 mr-2" />
                {t("Phát toàn bộ hội thoại", "Play full dialogue")}
              </Button>
              {lesson.dialogue.map((line, i) => (
                <div key={i} className={`p-3 rounded-lg ${i % 2 === 0 ? "bg-primary/5" : "bg-emerald-500/5"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-muted-foreground">{line.speaker}</div>
                    <SpeakButton text={line.vi} />
                  </div>
                  <div className="font-semibold mt-1">{line.vi}</div>
                  <div className="text-sm text-muted-foreground italic">{line.en}</div>
                  {line.note && <div className="text-xs text-amber-600 mt-1">💡 {line.note}</div>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grammar */}
        <TabsContent value="grammar" className="mt-4 space-y-4">
          {lesson.grammar.map((g, i) => (
            <Card key={i} className="border-primary/20">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h4 className="font-bold">{t(g.title, g.titleEn)}</h4>
                </div>
                <div className="rounded-md bg-muted p-2 font-mono text-sm mb-2">{g.formula}</div>
                <p className="text-sm mb-3">{t(g.explanation, g.explanationEn)}</p>
                <div className="space-y-1.5">
                  {g.examples.map((e, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">•</span>
                      <span className="font-medium">{e.vi}</span>
                      <span className="text-muted-foreground">- {e.en}</span>
                      <SpeakButton text={e.vi} className="ml-auto" />
                    </div>
                  ))}
                </div>
                {g.commonMistake && (
                  <div className="mt-3 p-3 rounded-md bg-amber-500/10 border border-amber-500/30 text-sm">
                    <div className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> {t("Lỗi thường gặp", "Common mistake")}
                    </div>
                    <div><span className="text-red-500">✗</span> {g.commonMistake.wrong}</div>
                    <div><span className="text-emerald-500">✓</span> {g.commonMistake.right}</div>
                    <div className="text-xs text-muted-foreground italic mt-1">{g.commonMistake.noteEn}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Pronunciation Drill */}
        <TabsContent value="drill" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-3">
              {lesson.pronunciationDrill.map((d, i) => (
                <div key={i} className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-xl font-bold text-primary">{d.word}</div>
                    <SpeakButton text={d.word} />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{d.ipa}</div>
                  <div className="text-sm mt-2 text-amber-600 dark:text-amber-400">💡 {d.tip}</div>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/learn-vietnamese/for-foreigners/lab/pronunciation">
                  <Button variant="outline" className="w-full">
                    <Mic className="w-4 h-4 mr-2" />
                    {t("Vào Pronunciation Lab để chấm điểm", "Open Pronunciation Lab for scoring")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz */}
        <TabsContent value="quiz" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-4">
              {lesson.quiz.map((q, i) => (
                <div key={i}>
                  <div className="font-semibold mb-1">{i + 1}. {q.question}</div>
                  <div className="text-xs text-muted-foreground italic mb-2">{q.questionEn}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const chosen = quizAns[i] === oi;
                      const correct = quizChecked && oi === q.answer;
                      const wrong = quizChecked && chosen && oi !== q.answer;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizChecked && setQuizAns(a => ({ ...a, [i]: oi }))}
                          className={`p-2 rounded-md border-2 text-sm text-left transition ${
                            correct ? "border-emerald-500 bg-emerald-500/10" :
                            wrong ? "border-red-500 bg-red-500/10" :
                            chosen ? "border-primary bg-primary/10" :
                            "border-muted hover:border-primary/40"
                          }`}
                        >
                          {opt}
                          {correct && <CheckCircle2 className="w-3.5 h-3.5 inline ml-1 text-emerald-500" />}
                          {wrong && <XCircle className="w-3.5 h-3.5 inline ml-1 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>
                  {quizChecked && (
                    <div className="text-xs text-muted-foreground italic mt-1">💡 {t(q.explanation ?? q.explanationEn, q.explanationEn)}</div>
                  )}
                </div>
              ))}
              {!quizChecked ? (
                <Button onClick={checkQuiz} disabled={Object.keys(quizAns).length !== lesson.quiz.length} className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white">
                  {t("Chấm điểm", "Check answers")}
                </Button>
              ) : (
                <div className="text-center py-3">
                  <div className="text-3xl font-bold text-primary">{quizScore}%</div>
                  <p className="text-sm text-muted-foreground">{quizScore >= 80 ? t("Xuất sắc!", "Excellent!") : t("Ôn lại và thử lại nhé.", "Review and try again.")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cultural tip */}
      <div className="rounded-xl p-4 bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">{t("Mẹo văn hóa", "Cultural tip")}</span>
        </div>
        <p className="text-sm">{t(lesson.culturalTip.vi, lesson.culturalTip.en)}</p>
      </div>
    </div>
  );
}

function CheckpointView({ level, onDone }: { level: VFFLevel; onDone: (pct: number) => void }) {
  const { t } = useLanguage();
  const [ans, setAns] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let s = 0;
    level.checkpoint.forEach((q, i) => { if (ans[i] === q.answer) s++; });
    return Math.round((s / level.checkpoint.length) * 100);
  }, [ans, level.checkpoint]);

  const submit = () => { setSubmitted(true); onDone(score); };

  return (
    <Card className="border-2 border-primary/30">
      <CardContent className="pt-6">
        <div className="text-center mb-5">
          <Trophy className="w-10 h-10 mx-auto text-amber-500 mb-2" />
          <h3 className="text-xl font-bold">{t(`Bài kiểm tra cấp ${level.cefr}`, `${level.cefr} Checkpoint Test`)}</h3>
          <p className="text-sm text-muted-foreground">{t("Đạt ≥80% để mở cấp tiếp theo và nhận chứng chỉ.", "Score ≥80% to unlock the next level and earn a certificate.")}</p>
        </div>

        <div className="space-y-4">
          {level.checkpoint.map((q, i) => (
            <div key={i}>
              <div className="font-semibold mb-1">{i + 1}. {q.question}</div>
              <div className="text-xs text-muted-foreground italic mb-2">{q.questionEn}</div>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, oi) => {
                  const chosen = ans[i] === oi;
                  const correct = submitted && oi === q.answer;
                  const wrong = submitted && chosen && oi !== q.answer;
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && setAns(a => ({ ...a, [i]: oi }))}
                      className={`p-2 rounded-md border-2 text-sm text-left transition ${
                        correct ? "border-emerald-500 bg-emerald-500/10" :
                        wrong ? "border-red-500 bg-red-500/10" :
                        chosen ? "border-primary bg-primary/10" :
                        "border-muted hover:border-primary/40"
                      }`}
                    >{opt}</button>
                  );
                })}
              </div>
              {submitted && <div className="text-xs text-muted-foreground italic mt-1">💡 {t(q.explanation ?? q.explanationEn, q.explanationEn)}</div>}
            </div>
          ))}
        </div>

        {!submitted ? (
          <Button onClick={submit} disabled={Object.keys(ans).length !== level.checkpoint.length} className="w-full mt-5 bg-gradient-to-r from-primary to-emerald-500 text-white">
            {t("Nộp bài", "Submit checkpoint")}
          </Button>
        ) : (
          <div className="text-center mt-5">
            <div className="text-4xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">{score}%</div>
            <p className={`text-sm mt-1 ${score >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
              {score >= 80 ? t("🎉 Vượt qua! Cấp tiếp theo đã mở khoá.", "🎉 Passed! Next level unlocked.") : t("Chưa đạt 80% - ôn tập và thử lại.", "Not 80% yet - review and retry.")}
            </p>
            {score >= 80 && (
              <Link to="/learn-vietnamese/for-foreigners/certificate">
                <Button variant="outline" className="mt-3">
                  <Trophy className="w-4 h-4 mr-2" />
                  {t("Xem chứng chỉ", "View Certificate")}
                </Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const VFFLevelPage = ({ levelKey }: { levelKey: LevelKey }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { progress, recordLesson, recordCheckpoint } = useVFFProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showCheckpoint, setShowCheckpoint] = useState(false);

  const level = levelKey === "a1" ? vffLevelA1 : levelKey === "a2" ? vffLevelA2 : vffLevelB1;
  const unlocked = true;

  const activeLesson = level.lessons.find(l => l.id === activeLessonId);

  const doneCount = level.lessons.filter(l => (progress.lessonsCompleted[l.id] ?? 0) >= 80).length;
  const pct = Math.round((doneCount / level.lessons.length) * 100);

  return (
    <div className="vietnamese-readable min-h-screen bg-background">
      <SEO title={`${level.titleEn} - Vietnamese for Foreigners | HaiEduTech`} description={level.taglineEn} path={`/learn-vietnamese/for-foreigners/${levelKey}`} />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về roadmap", "Back to roadmap")}
          </Link>

          {!unlocked ? (
            <Card className="border-2 border-amber-500/30">
              <CardContent className="pt-8 pb-8 text-center">
                <GraduationCap className="mx-auto mb-3 h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold mb-2">{t("Bắt đầu cấp độ này", "Start this level")}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("Nội dung học luôn mở. Bài kiểm tra đầu vào giúp gợi ý điểm bắt đầu phù hợp.", "Learning content stays open. The placement test can suggest a suitable starting point.")}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => navigate("/learn-vietnamese/for-foreigners/placement")}>{t("Placement Test", "Placement Test")}</Button>
                  <Button variant="outline" onClick={() => setActiveLessonId(level.lessons[0]?.id ?? null)}>{t("Học ngay", "Start learning")}</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className={`rounded-2xl p-6 bg-gradient-to-br ${level.color} text-white`}>
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">{level.cefr} · CEFR</Badge>
                  <h1 className="text-3xl font-bold mb-1">{t(level.title, level.titleEn)}</h1>
                  <p className="opacity-95">{t(level.tagline, level.taglineEn)}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span>{level.hours}h</span>
                    <span>·</span>
                    <span>{level.lessons.length} {t("bài học", "lessons")}</span>
                    <span>·</span>
                    <span>{doneCount}/{level.lessons.length} {t("hoàn thành", "done")}</span>
                  </div>
                  <Progress value={pct} className="mt-3 h-2 bg-white/20" />
                </div>
              </motion.div>

              {!activeLesson && !showCheckpoint && (
                <div className="grid md:grid-cols-2 gap-3">
                  {level.lessons.map((l, i) => {
                    const s = progress.lessonsCompleted[l.id] ?? 0;
                    return (
                      <Card key={l.id} className="cursor-pointer hover:shadow-lg hover:border-primary/40 transition-all" onClick={() => setActiveLessonId(l.id)}>
                        <CardContent className="pt-5">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl">{l.icon}</div>
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground">{t("Bài", "Lesson")} {l.order}</div>
                              <h3 className="font-bold">{t(l.title, l.titleEn)}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{t(l.goal, l.goalEn)}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-[10px]">{l.minutes} min</Badge>
                                {s >= 80 && <Badge className="text-[10px] bg-emerald-500 text-white">✓ {s}%</Badge>}
                                {s > 0 && s < 80 && <Badge variant="secondary" className="text-[10px]">{s}%</Badge>}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  <Card className="cursor-pointer hover:shadow-lg hover:border-amber-400 transition-all col-span-full border-amber-500/30" onClick={() => setShowCheckpoint(true)}>
                    <CardContent className="pt-5">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-amber-500" />
                        <div className="flex-1">
                          <h3 className="font-bold">{t(`Bài kiểm tra ${level.cefr}`, `${level.cefr} Checkpoint`)}</h3>
                          <p className="text-xs text-muted-foreground">{t(`${level.checkpoint.length} câu · Đạt 80% để ghi nhận checkpoint và nhận chứng chỉ.`, `${level.checkpoint.length} questions · Score 80% to record the checkpoint and earn a certificate.`)}</p>
                        </div>
                        {progress.checkpointsPassed[level.cefr] && <Badge className="bg-emerald-500 text-white">✓ {progress.checkpointsPassed[level.cefr]}%</Badge>}
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeLesson && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setActiveLessonId(null)} className="mb-3">
                    <ArrowLeft className="w-4 h-4 mr-1" />{t("Tất cả bài học", "All lessons")}
                  </Button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{activeLesson.icon}</div>
                    <div>
                      <div className="text-xs text-muted-foreground">{t("Bài", "Lesson")} {activeLesson.order} · {level.cefr}</div>
                      <h2 className="text-xl font-bold">{t(activeLesson.title, activeLesson.titleEn)}</h2>
                    </div>
                  </div>
                  <LessonView lesson={activeLesson} level={level} onDone={(s) => recordLesson(activeLesson.id, s)} />
                </>
              )}

              {showCheckpoint && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setShowCheckpoint(false)} className="mb-3">
                    <ArrowLeft className="w-4 h-4 mr-1" />{t("Tất cả bài học", "All lessons")}
                  </Button>
                  <CheckpointView level={level} onDone={(s) => recordCheckpoint(level.cefr, s)} />
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFLevelPage;
