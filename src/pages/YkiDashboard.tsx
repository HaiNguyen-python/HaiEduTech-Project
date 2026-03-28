// YKI Finnish Prep Dashboard — Vocabulary, Grammar, Mock Exams with progress tracking
import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  BookOpen, ChevronRight, ChevronLeft, Volume2, VolumeX,
  Clock, CheckCircle, Timer, Snowflake,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  finnishVocabModules,
  finnishLessonModules,
  finnishMockExamModules,
  type FinnishModule,
  type FinnishLesson,
  type FinnishVocabEntry,
} from "@/data/finnishCurriculum";

// Verb conjugation helper data
const VERB_CONJUGATIONS: Record<string, { present: string[]; past: string[] }> = {
  puhua: {
    present: ["puhun", "puhut", "puhuu", "puhumme", "puhutte", "puhuvat"],
    past: ["puhuin", "puhuit", "puhui", "puhuimme", "puhuitte", "puhuivat"],
  },
  syödä: {
    present: ["syön", "syöt", "syö", "syömme", "syötte", "syövät"],
    past: ["söin", "söit", "söi", "söimme", "söitte", "söivät"],
  },
  olla: {
    present: ["olen", "olet", "on", "olemme", "olette", "ovat"],
    past: ["olin", "olit", "oli", "olimme", "olitte", "olivat"],
  },
  mennä: {
    present: ["menen", "menet", "menee", "menemme", "menette", "menevät"],
    past: ["menin", "menit", "meni", "menimme", "menitte", "menivät"],
  },
  tulla: {
    present: ["tulen", "tulet", "tulee", "tulemme", "tulette", "tulevat"],
    past: ["tulin", "tulit", "tuli", "tulimme", "tulitte", "tulivat"],
  },
};

const PERSONS = ["minä", "sinä", "hän", "me", "te", "he"];

// Speak Finnish using SpeechSynthesis
const speakFinnish = (text: string) => {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fi-FI";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
};

// Vocabulary Card Component
const VocabCard = ({ vocab, index }: { vocab: FinnishVocabEntry; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const u = new SpeechSynthesisUtterance(vocab.word);
    u.lang = "fi-FI";
    u.rate = 0.8;
    u.onend = () => setIsPlaying(false);
    u.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const posColors: Record<string, string> = {
    noun: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    verb: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    adjective: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-card/80 backdrop-blur-sm border border-[#003580]/10 rounded-xl p-5 hover:shadow-md hover:border-[#003580]/25 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-xl font-bold text-foreground">{vocab.word}</h3>
        <Badge className={`text-xs ${posColors[vocab.partOfSpeech] || posColors.noun}`}>
          {vocab.partOfSpeech}
        </Badge>
        <button
          onClick={playAudio}
          className="ml-auto w-7 h-7 rounded-full bg-[#003580]/10 hover:bg-[#003580]/20 flex items-center justify-center transition-colors shrink-0"
          aria-label={`Play pronunciation for ${vocab.word}`}
        >
          {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-[#003580]" /> : <Volume2 className="w-3.5 h-3.5 text-[#003580]" />}
        </button>
      </div>

      {vocab.ipa && <p className="text-xs text-muted-foreground mb-1">{vocab.ipa}</p>}

      <p className="text-primary font-semibold mb-1">{vocab.meaningEn}</p>
      <p className="text-sm text-muted-foreground mb-2">{vocab.meaningVi}</p>

      {/* Puhekieli vs Kirjakieli */}
      {vocab.puhekieli && vocab.puhekieli !== vocab.word && (
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 dark:text-orange-300">
            🗣️ Puhekieli: {vocab.puhekieli}
          </Badge>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-border/60">
        <p className="text-foreground font-medium text-sm">{vocab.example}</p>
        <p className="text-xs text-muted-foreground italic mt-1">{vocab.exampleEn}</p>
      </div>

      {/* Conjugation pop-up for verbs */}
      {vocab.partOfSpeech === "verb" && VERB_CONJUGATIONS[vocab.word] && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="mt-3 text-xs gap-1 border-[#003580]/20 text-[#003580]">
              🔄 Check Conjugation
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <h4 className="font-bold mb-2 text-sm">Conjugation: {vocab.word}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-primary mb-1">Present</p>
                {VERB_CONJUGATIONS[vocab.word].present.map((form, i) => (
                  <p key={i} className="text-muted-foreground">{PERSONS[i]}: <span className="text-foreground font-medium">{form}</span></p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">Past</p>
                {VERB_CONJUGATIONS[vocab.word].past.map((form, i) => (
                  <p key={i} className="text-muted-foreground">{PERSONS[i]}: <span className="text-foreground font-medium">{form}</span></p>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </motion.div>
  );
};

// Quiz Component with Timer
const QuizSection = ({ quiz, timerEnabled = false }: { quiz: { question: string; options: string[]; answer: number; explanation: string }[]; timerEnabled?: boolean }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerEnabled ? quiz.length * 30 : 0); // 30s per question
  const [timerActive, setTimerActive] = useState(false);

  const startTimer = useCallback(() => {
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const score = Object.entries(answers).filter(([i, a]) => quiz[Number(i)].answer === a).length;

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(timerEnabled ? quiz.length * 30 : 0);
    setTimerActive(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" /> Quiz
        </h3>
        {timerEnabled && (
          <div className="flex items-center gap-2">
            {!timerActive && !submitted && (
              <Button size="sm" variant="outline" onClick={startTimer} className="gap-1">
                <Timer className="w-4 h-4" /> Start Timer
              </Button>
            )}
            {timerActive && (
              <Badge variant="destructive" className="text-sm gap-1">
                <Clock className="w-3.5 h-3.5" />
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </Badge>
            )}
          </div>
        )}
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-2xl font-bold text-primary">{score}/{quiz.length}</span>
          <span className="text-sm text-muted-foreground">correct</span>
          <Button size="sm" variant="ghost" onClick={handleReset} className="ml-auto">Retry</Button>
        </div>
      )}

      {quiz.map((q, qi) => (
        <div key={qi} className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="font-medium text-foreground mb-3">{qi + 1}. {q.question}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = q.answer === oi;
              let cls = "p-2.5 rounded-lg border text-sm cursor-pointer transition-all text-left w-full ";
              if (submitted) {
                if (isCorrect) cls += "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700";
                else if (isSelected) cls += "bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700";
                else cls += "bg-card border-border text-muted-foreground";
              } else {
                cls += isSelected
                  ? "bg-primary/10 border-primary text-foreground"
                  : "bg-card border-border text-foreground hover:border-primary/40";
              }
              return (
                <button
                  key={oi}
                  className={cls}
                  onClick={() => !submitted && setAnswers((a) => ({ ...a, [qi]: oi }))}
                  disabled={submitted}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-2 text-xs text-muted-foreground italic">💡 {q.explanation}</p>
          )}
        </div>
      ))}

      {!submitted && Object.keys(answers).length > 0 && (
        <Button onClick={() => setSubmitted(true)} className="w-full">
          Submit Answers
        </Button>
      )}
    </div>
  );
};

// Main Dashboard Component
const YkiDashboard = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialModule = searchParams.get("module");

  const [activePillar, setActivePillar] = useState<"vocabulary" | "lessons" | "mock-exams">("vocabulary");
  const [selectedModule, setSelectedModule] = useState<FinnishModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<FinnishLesson | null>(null);

  // Initialize from URL param
  useMemo(() => {
    if (initialModule) {
      const allMods = [...finnishVocabModules, ...finnishLessonModules, ...finnishMockExamModules];
      const found = allMods.find((m) => m.id === initialModule);
      if (found) {
        setActivePillar(found.pillar);
        setSelectedModule(found);
        if (found.lessons.length > 0) setSelectedLesson(found.lessons[0]);
      }
    }
  }, [initialModule]);

  const currentModules = activePillar === "vocabulary"
    ? finnishVocabModules
    : activePillar === "lessons"
    ? finnishLessonModules
    : finnishMockExamModules;

  const handleSelectModule = (mod: FinnishModule) => {
    setSelectedModule(mod);
    setSelectedLesson(mod.lessons[0] || null);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedModule(null);
    }
  };

  // Progress checklist (stored in localStorage)
  const getProgress = () => {
    try {
      return JSON.parse(localStorage.getItem("yki-progress") || "{}");
    } catch { return {}; }
  };

  const progress = getProgress();
  const totalLessons = [...finnishVocabModules, ...finnishLessonModules, ...finnishMockExamModules]
    .reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = Object.keys(progress).filter((k) => progress[k]).length;
  const vocabCompleted = finnishVocabModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const vocabTotal = finnishVocabModules.flatMap(m => m.lessons).length;
  const grammarCompleted = finnishLessonModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const grammarTotal = finnishLessonModules.flatMap(m => m.lessons).length;
  const mockCompleted = finnishMockExamModules.flatMap(m => m.lessons).filter(l => progress[l.id]).length;
  const mockTotal = finnishMockExamModules.flatMap(m => m.lessons).length;

  const markComplete = (lessonId: string) => {
    const p = getProgress();
    p[lessonId] = true;
    localStorage.setItem("yki-progress", JSON.stringify(p));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🇫🇮</span>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  YKI Finnish Prep Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("Perustaso — Trình độ A2", "Perustaso — Level A2")}
                </p>
              </div>
            </div>

            {/* YKI Checklist Progress */}
            <Card className="mt-4 border-[#003580]/15">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Snowflake className="w-5 h-5 text-[#003580]" />
                  <h3 className="font-semibold text-foreground text-sm">YKI Progress Checklist</h3>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {completedLessons}/{totalLessons}
                  </Badge>
                </div>
                <Progress value={totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0} className="h-2 mb-3" />
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground">Vocabulary</p>
                    <p className="font-bold text-foreground">{Math.round((vocabTotal > 0 ? vocabCompleted / vocabTotal : 0) * 100)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Grammar</p>
                    <p className="font-bold text-foreground">{Math.round((grammarTotal > 0 ? grammarCompleted / grammarTotal : 0) * 100)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Mock Exams</p>
                    <p className="font-bold text-foreground">{mockCompleted}/{mockTotal} completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pillar Tabs */}
          <Tabs value={activePillar} onValueChange={(v) => { setActivePillar(v as any); setSelectedModule(null); setSelectedLesson(null); }}>
            <TabsList className="w-full max-w-lg grid grid-cols-3 h-11 mb-6">
              <TabsTrigger value="vocabulary" className="text-xs sm:text-sm">📖 Vocabulary</TabsTrigger>
              <TabsTrigger value="lessons" className="text-xs sm:text-sm">🎓 Lessons</TabsTrigger>
              <TabsTrigger value="mock-exams" className="text-xs sm:text-sm">📝 Mock Exams</TabsTrigger>
            </TabsList>

            <TabsContent value={activePillar}>
              {/* Module detail view */}
              {selectedModule && selectedLesson ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </Button>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{selectedLesson.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedLesson.titleEn}</h2>
                      <p className="text-sm text-muted-foreground">{selectedLesson.title}</p>
                    </div>
                    <Badge className="ml-auto" variant="outline">{selectedLesson.level}</Badge>
                  </div>

                  {/* Lesson sidebar if module has multiple lessons */}
                  {selectedModule.lessons.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedModule.lessons.map((l) => (
                        <Button
                          key={l.id}
                          size="sm"
                          variant={selectedLesson.id === l.id ? "default" : "outline"}
                          onClick={() => setSelectedLesson(l)}
                          className="text-xs"
                        >
                          {l.icon} {l.titleEn}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Theory/Grammar */}
                  {selectedLesson.theory && (
                    <Card className="mb-6 border-[#003580]/10">
                      <CardContent className="p-6 prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{selectedLesson.theoryEn || selectedLesson.theory}</ReactMarkdown>
                      </CardContent>
                    </Card>
                  )}

                  {/* Grammar Points */}
                  {selectedLesson.grammar && selectedLesson.grammar.length > 0 && (
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-bold text-foreground">📐 Grammar Points</h3>
                      {selectedLesson.grammar.map((gp, i) => (
                        <Card key={i} className="border-[#003580]/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{gp.titleEn || gp.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">{gp.explanationEn || gp.explanation}</p>
                            <div className="space-y-1.5">
                              {gp.examples.map((ex, j) => (
                                <div key={j} className="flex items-start gap-2 text-sm">
                                  <button onClick={() => speakFinnish(ex.finnish)} className="shrink-0 mt-0.5">
                                    <Volume2 className="w-3.5 h-3.5 text-[#003580]" />
                                  </button>
                                  <span className="font-medium text-foreground">{ex.finnish}</span>
                                  <span className="text-muted-foreground">— {ex.english}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Dialogues */}
                  {selectedLesson.dialogues && selectedLesson.dialogues.length > 0 && (
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-bold text-foreground">💬 Dialogues</h3>
                      {selectedLesson.dialogues.map((d, i) => (
                        <Card key={i} className="border-[#003580]/10">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{d.situationEn}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {d.lines.map((line, j) => (
                              <div key={j} className={`flex items-start gap-2 text-sm p-2 rounded-lg ${line.speaker === "Sinä" ? "bg-primary/5" : "bg-muted/50"}`}>
                                <Badge variant="outline" className="text-xs shrink-0">{line.speaker}</Badge>
                                <div>
                                  <button onClick={() => speakFinnish(line.finnish)} className="inline mr-1">
                                    <Volume2 className="w-3 h-3 text-[#003580] inline" />
                                  </button>
                                  <span className="font-medium text-foreground">{line.finnish}</span>
                                  <p className="text-xs text-muted-foreground italic">{line.english}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Vocabulary */}
                  {selectedLesson.vocabulary && selectedLesson.vocabulary.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-foreground mb-4">📖 Vocabulary</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {selectedLesson.vocabulary.map((v, i) => (
                          <VocabCard key={v.word} vocab={v} index={i} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quiz */}
                  {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                    <div className="mb-6">
                      <QuizSection
                        quiz={selectedLesson.quiz}
                        timerEnabled={selectedModule.pillar === "mock-exams"}
                      />
                    </div>
                  )}

                  {/* Mark Complete */}
                  <div className="text-center mt-8">
                    {progress[selectedLesson.id] ? (
                      <Badge className="bg-emerald-100 text-emerald-800 text-sm py-2 px-4">
                        ✅ Completed
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => {
                          markComplete(selectedLesson.id);
                          window.location.reload();
                        }}
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : selectedModule ? (
                // Module lesson list
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Back to Modules
                  </Button>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{selectedModule.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{selectedModule.titleEn}</h2>
                      <p className="text-sm text-muted-foreground">{selectedModule.descriptionEn}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedModule.lessons.map((lesson, i) => (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <button
                          onClick={() => setSelectedLesson(lesson)}
                          className="w-full text-left rounded-xl border border-[#003580]/15 bg-card/80 backdrop-blur-sm p-5 hover:shadow-md hover:border-[#003580]/30 transition-all"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{lesson.icon}</span>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-foreground truncate">{lesson.titleEn}</h3>
                              <p className="text-xs text-muted-foreground">{lesson.title}</p>
                            </div>
                            {progress[lesson.id] && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">{lesson.level}</Badge>
                            {lesson.vocabulary && <Badge variant="secondary" className="text-xs">{lesson.vocabulary.length} words</Badge>}
                            {lesson.quiz && <Badge variant="secondary" className="text-xs">{lesson.quiz.length} quiz</Badge>}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Module grid
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentModules.map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => handleSelectModule(mod)}
                        className="w-full text-left rounded-2xl border-2 border-[#003580]/15 bg-card p-6 hover:shadow-lg hover:border-[#003580]/30 transition-all group"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white text-2xl mb-4`}>
                          {mod.icon}
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-[#003580] transition-colors mb-1">
                          {mod.titleEn}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{mod.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{mod.descriptionEn}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-[#003580]/20">
                            {mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-[#003580] transition-colors" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default YkiDashboard;
