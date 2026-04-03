import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, BookOpen, Lightbulb, Globe, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { vietnamesePoems } from "@/data/vietnamese/poetryData";
import { cn } from "@/lib/utils";

const VietnamesePoetry = () => {
  const { t } = useLanguage();
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedPoem = selectedPoemId ? vietnamesePoems.find(p => p.id === selectedPoemId) : null;

  const speakPoem = useCallback((text: string) => {
    speechSynthesis.cancel();
    const paragraphs = text.split("\n").filter(p => p.trim());
    let i = 0;
    const speakNext = () => {
      if (i >= paragraphs.length) { setIsSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(paragraphs[i]);
      u.lang = "vi-VN";
      u.rate = 0.5;
      u.pitch = 1.15 + (i % 2 === 0 ? 0.05 : -0.05);
      u.onend = () => { i++; setTimeout(speakNext, 600); };
      u.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(u);
    };
    setIsSpeaking(true);
    speakNext();
  }, []);

  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const handleQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  if (selectedPoem) {
    const exercises = selectedPoem.exercises || [];
    const quizScore = exercises.reduce((acc, ex, i) => acc + (quizAnswers[i] === ex.correctIndex ? 1 : 0), 0);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-6 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <button onClick={() => { stopSpeech(); setSelectedPoemId(null); resetQuiz(); }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t("Quay lại danh sách", "Back to list")}
            </button>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline">{t(selectedPoem.period, selectedPoem.periodEn)}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">{t(selectedPoem.author, selectedPoem.authorEn)}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t(selectedPoem.title, selectedPoem.titleEn)}</h1>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => isSpeaking ? stopSpeech() : speakPoem(selectedPoem.text)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  {isSpeaking ? t("Dừng đọc", "Stop") : t("Nghe đọc thơ", "Listen")}
                </button>
              </div>

              {/* Poem text — use div instead of pre to fix Vietnamese diacritics */}
              <Card className="p-6 md:p-8 mb-6">
                <div className="whitespace-pre-wrap font-sans text-lg md:text-xl leading-loose text-foreground">{selectedPoem.text}</div>
                <hr className="my-4 border-border/60" />
                <div className="whitespace-pre-wrap font-sans text-base leading-loose text-muted-foreground italic">{selectedPoem.textEn}</div>
              </Card>

              {/* Analysis */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    {t("Phân tích", "Analysis")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedPoem.analysis, selectedPoem.analysisEn)}</p>
                </Card>
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    {t("Bối cảnh văn hóa", "Cultural Context")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(selectedPoem.culturalNote, selectedPoem.culturalNoteEn)}</p>
                </Card>
              </div>

              {/* Vocabulary */}
              <Card className="p-5 mb-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  {t("Từ vựng", "Vocabulary")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedPoem.vocabulary.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                      <span className="font-bold text-primary text-sm">{v.word}</span>
                      <span className="text-sm text-muted-foreground">— {t(v.meaning, v.meaningEn)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Exercises / Quiz */}
              {exercises.length > 0 && (
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      ✏️ {t("Bài tập", "Exercises")}
                    </h3>
                    {quizSubmitted && (
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-sm font-bold",
                          quizScore === exercises.length ? "text-green-500" : quizScore >= exercises.length / 2 ? "text-yellow-500" : "text-destructive"
                        )}>
                          {quizScore}/{exercises.length} {t("đúng", "correct")}
                        </span>
                        <button onClick={resetQuiz} className="text-sm text-primary hover:underline flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" /> {t("Làm lại", "Retry")}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-5">
                    {exercises.map((ex, qi) => (
                      <motion.div key={qi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.08 }} className="space-y-2">
                        <p className="text-sm font-medium text-foreground">{qi + 1}. {t(ex.question, ex.questionEn)}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ex.options.map((opt, oi) => {
                            const selected = quizAnswers[qi] === oi;
                            const isCorrectOpt = ex.correctIndex === oi;
                            return (
                              <button
                                key={oi}
                                onClick={() => handleQuizAnswer(qi, oi)}
                                className={cn(
                                  "px-3 py-2 rounded-lg text-sm text-left transition-all border flex items-center gap-2",
                                  quizSubmitted
                                    ? isCorrectOpt
                                      ? "border-green-500 bg-green-500/10 text-green-700"
                                      : selected
                                        ? "border-destructive bg-destructive/10 text-destructive"
                                        : "border-border text-muted-foreground"
                                    : selected
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/5"
                                )}
                              >
                                {quizSubmitted && isCorrectOpt && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                                {quizSubmitted && selected && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 shrink-0" />}
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {t(ex.explanation, ex.explanationEn)}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {!quizSubmitted && Object.keys(quizAnswers).length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setQuizSubmitted(true)}
                      className="mt-4 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
                    >
                      {t("Nộp bài", "Submit")}
                    </motion.button>
                  )}
                </Card>
              )}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Go back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              📜 {t("Thơ Hay Việt Nam", "Vietnamese Poetry")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("Khám phá những bài thơ kinh điển của văn học Việt Nam", "Discover classic poems of Vietnamese literature")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {vietnamesePoems.map((poem, idx) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="p-5 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all h-full"
                  onClick={() => setSelectedPoemId(poem.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{t(poem.period, poem.periodEn)}</Badge>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{t(poem.title, poem.titleEn)}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{t(poem.author, poem.authorEn)}</p>
                  <p className="text-xs text-muted-foreground line-clamp-3 italic">{poem.text.split("\n").slice(0, 2).join(" / ")}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnamesePoetry;
