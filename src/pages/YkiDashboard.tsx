// YKI Finnish Prep Dashboard — Vocabulary, Grammar, Mock Exams with progress tracking
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  BookOpen, ChevronRight, ChevronLeft, Volume2, VolumeX,
  Clock, CheckCircle, Timer, Snowflake, Star, Mic, Square,
  Languages, Trophy, Flag,
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
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import FinnishSkier from "@/components/FinnishSkier";
import FloatingFinnishDictionary from "@/components/FloatingFinnishDictionary";
import {
  finnishVocabModules,
  finnishVocabExpansionModules,
  finnishLessonModules,
  finnishMockExamModules,
  finnishMockExamExpansionModules,
  type FinnishModule,
  type FinnishLesson,
  type FinnishVocabEntry,
} from "@/data/finnishCurriculum";

// Merge original + expansion data
const allVocabModules = [...finnishVocabModules, ...finnishVocabExpansionModules];
const allMockExamModules = [...finnishMockExamModules, ...finnishMockExamExpansionModules];

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
const VocabCard = ({ vocab, index, isMastered, onMaster }: { vocab: FinnishVocabEntry; index: number; isMastered?: boolean; onMaster?: (word: string, e: React.MouseEvent) => void }) => {
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

      {/* Mastered star button */}
      {onMaster && (
        <button
          onClick={(e) => onMaster(vocab.word, e)}
          className={`mt-3 flex items-center gap-1.5 text-xs font-semibold transition-colors ${isMastered ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"}`}
        >
          <Star className={`w-4 h-4 ${isMastered ? "fill-amber-500" : ""}`} />
          {isMastered ? "Mastered!" : "Mark as Mastered"}
        </button>
      )}
    </motion.div>
  );
};

// Quiz Component with 15-minute skill timer and Finnish-first display
const QuizSection = ({
  quiz,
  timerEnabled = false,
  showFinnishOnly = false,
  onExamComplete,
}: {
  quiz: { question: string; options: string[]; answer: number; explanation: string }[];
  timerEnabled?: boolean;
  showFinnishOnly?: boolean;
  onExamComplete?: (score: number, total: number) => void;
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerEnabled ? 15 * 60 : 0); // 15 minutes per skill
  const [timerActive, setTimerActive] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setSubmitted(true);
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const score = Object.entries(answers).filter(([i, a]) => quiz[Number(i)].answer === a).length;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    onExamComplete?.(score, quiz.length);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(timerEnabled ? 15 * 60 : 0);
    setTimerActive(false);
    setShowTranslation(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          {showFinnishOnly ? "Valitse oikea vaihtoehto" : "Quiz"}
        </h3>
        <div className="flex items-center gap-2">
          {showFinnishOnly && (
            <Button
              size="sm"
              variant={showTranslation ? "default" : "outline"}
              onClick={() => setShowTranslation(!showTranslation)}
              className="gap-1 text-xs"
            >
              <Languages className="w-3.5 h-3.5" />
              {showTranslation ? "Piilota käännös" : "Näytä käännös"}
            </Button>
          )}
          {timerEnabled && (
            <>
              {!timerActive && !submitted && (
                <Button size="sm" variant="outline" onClick={startTimer} className="gap-1">
                  <Timer className="w-4 h-4" /> Aloita (15 min)
                </Button>
              )}
              {timerActive && (
                <Badge variant="destructive" className="text-sm gap-1 px-3 py-1">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </Badge>
              )}
            </>
          )}
        </div>
      </div>

      {submitted && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-3xl font-bold text-primary">{score}/{quiz.length}</span>
          <div>
            <span className="text-sm text-foreground font-medium">
              {score >= quiz.length * 0.8 ? "Erinomainen! 🌟" : score >= quiz.length * 0.6 ? "Hyvä työ! 👍" : "Harjoittele lisää! 💪"}
            </span>
            {showTranslation && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {score >= quiz.length * 0.8 ? "Excellent!" : score >= quiz.length * 0.6 ? "Good job!" : "Keep practicing!"}
              </p>
            )}
          </div>
          <Button size="sm" variant="ghost" onClick={handleReset} className="ml-auto">Yritä uudelleen</Button>
        </div>
      )}

      {quiz.map((q, qi) => (
        <div key={qi} className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="font-medium text-foreground mb-3 text-[20px] leading-relaxed">{qi + 1}. {q.question}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = q.answer === oi;
              let cls = "p-3 rounded-lg border text-[18px] cursor-pointer transition-all text-left w-full ";
              if (submitted) {
                if (isCorrect) cls += "bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700 font-semibold";
                else if (isSelected) cls += "bg-rose-50 border-rose-300 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700";
                else cls += "bg-card border-border text-muted-foreground";
              } else {
                cls += isSelected
                  ? "bg-primary/10 border-primary text-foreground font-medium"
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
            <p className="mt-2 text-sm text-muted-foreground italic">
              💡 {q.explanation}
              {showTranslation && q.explanation && (
                <span className="block mt-1 text-xs text-muted-foreground/70">
                  (Translation available)
                </span>
              )}
            </p>
          )}
        </div>
      ))}

      {!submitted && Object.keys(answers).length > 0 && (
        <Button onClick={handleSubmit} className="w-full text-lg py-6 font-bold">
          Lähetä vastaukset ✓
        </Button>
      )}
    </div>
  );
};

// Writing Section with word counter
const WritingSection = ({ lesson }: { lesson: FinnishLesson }) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const startTimer = () => {
    setTimerActive(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimerActive(false);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          ✍️ Kirjoitustehtävä
        </h3>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={showTranslation ? "default" : "outline"}
            onClick={() => setShowTranslation(!showTranslation)}
            className="gap-1 text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            {showTranslation ? "Piilota käännös" : "Näytä käännös"}
          </Button>
          {!timerActive && !submitted && (
            <Button size="sm" variant="outline" onClick={startTimer} className="gap-1">
              <Timer className="w-4 h-4" /> Aloita (15 min)
            </Button>
          )}
          {timerActive && (
            <Badge variant="destructive" className="text-sm gap-1 px-3 py-1">
              <Clock className="w-3.5 h-3.5" />
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </Badge>
          )}
        </div>
      </div>

      {/* Task instructions in Finnish */}
      <Card className="border-[#003580]/10">
        <CardContent className="p-5 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{lesson.theory || ""}</ReactMarkdown>
          {showTranslation && lesson.theoryEn && (
            <div className="mt-4 pt-4 border-t border-border">
              <Badge variant="outline" className="mb-2 text-xs">🌐 Translation</Badge>
              <ReactMarkdown>{lesson.theoryEn}</ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Writing area */}
      <div className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kirjoita vastauksesi tähän..."
          className="min-h-[200px] text-[18px] leading-relaxed border-[#003580]/15 focus:border-[#003580]/30"
          disabled={submitted}
        />
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${wordCount > 80 ? "text-rose-500" : wordCount >= 20 ? "text-emerald-600" : "text-muted-foreground"}`}>
            📝 Sanamäärä: {wordCount} / 50–80 sanaa
          </span>
          {!submitted && text.trim().length > 0 && (
            <Button onClick={() => { setSubmitted(true); if (timerRef.current) clearInterval(timerRef.current); setTimerActive(false); }} className="text-lg px-8 py-3 font-bold">
              Lähetä ✓
            </Button>
          )}
        </div>
      </div>

      {submitted && (
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-900/20 dark:border-emerald-800">
          <CardContent className="p-4">
            <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">✅ Vastauksesi on lähetetty!</p>
            <p className="text-sm text-muted-foreground">Sanamäärä: {wordCount}. Tarkista vastauksesi ja vertaa tehtävänantoon.</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => { setSubmitted(false); setText(""); setTimeLeft(15 * 60); }}>
              Kirjoita uudelleen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Speaking Recorder Component for mock exams with situation prompt
const SpeakingRecorder = ({ lesson }: { lesson?: FinnishLesson }) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const [showTranslation, setShowTranslation] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setTimeLeft(40);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            recorder.stop();
            setRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch { toast.error("Microphone access denied."); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          🎤 Puhumistehtävä
        </h3>
        {lesson && (
          <Button
            size="sm"
            variant={showTranslation ? "default" : "outline"}
            onClick={() => setShowTranslation(!showTranslation)}
            className="gap-1 text-xs"
          >
            <Languages className="w-3.5 h-3.5" />
            {showTranslation ? "Piilota käännös" : "Näytä käännös"}
          </Button>
        )}
      </div>

      {/* Situation prompt in Finnish */}
      {lesson?.theory && (
        <Card className="border-[#003580]/10">
          <CardContent className="p-5 prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{lesson.theory}</ReactMarkdown>
            {showTranslation && lesson.theoryEn && (
              <div className="mt-4 pt-4 border-t border-border">
                <Badge variant="outline" className="mb-2 text-xs">🌐 Translation</Badge>
                <ReactMarkdown>{lesson.theoryEn}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recording controls */}
      <Card className="border-[#003580]/15">
        <CardContent className="p-4">
          <h4 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4 text-rose-500" /> Nauhoita vastauksesi (40 sekuntia)
          </h4>
          <div className="flex items-center gap-3">
            {!recording ? (
              <Button size="lg" onClick={startRecording} className="gap-2 bg-rose-500 hover:bg-rose-600 text-lg px-6 font-bold">
                <Mic className="w-5 h-5" /> Aloita nauhoitus
              </Button>
            ) : (
              <Button size="lg" variant="destructive" onClick={stopRecording} className="gap-2 text-lg px-6 font-bold">
                <Square className="w-5 h-5" /> Lopeta ({timeLeft}s)
              </Button>
            )}
          </div>
          {audioUrl && (
            <div className="mt-4 flex items-center gap-3">
              <audio controls src={audioUrl} className="h-10 flex-1" />
              <Button variant="outline" size="sm" onClick={() => { setAudioUrl(null); }}>
                Nauhoita uudelleen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Finnish motivational quotes for mastered words
const FINNISH_QUOTES = [
  "Hienoa työtä! 🎿", "Jatka samaan malliin! ❄️", "Olet todella taitava! 🌟",
  "Mahtavaa! 🏔️", "Loistavaa! 🇫🇮", "Sisu! 💪", "Upea suoritus! ✨",
];

// YKI A2 Ready Badge Dialog
const YkiReadyBadge = ({ show, onClose }: { show: boolean; onClose: () => void }) => (
  <Dialog open={show} onOpenChange={onClose}>
    <DialogContent className="text-center max-w-sm">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">🇫🇮 YKI A2 Ready!</DialogTitle>
      </DialogHeader>
      <div className="py-6 space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#003580] to-[#0066cc] flex items-center justify-center shadow-xl">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <p className="text-lg font-bold text-foreground">Onneksi olkoon! 🎉</p>
        <p className="text-sm text-muted-foreground">
          Olet suorittanut kaikki neljä YKI-taitoaluetta! Olet valmis Perustaso-kokeeseen.
        </p>
        <Badge className="text-sm px-4 py-2 bg-[#003580]">
          <Flag className="w-4 h-4 mr-1 inline" /> YKI A2 Certified Ready
        </Badge>
      </div>
    </DialogContent>
  </Dialog>
);

// Main Dashboard Component
const YkiDashboard = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialModule = searchParams.get("module");

  const [activePillar, setActivePillar] = useState<"vocabulary" | "lessons" | "mock-exams">("vocabulary");
  const [selectedModule, setSelectedModule] = useState<FinnishModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<FinnishLesson | null>(null);
  const [showBadge, setShowBadge] = useState(false);

  // Mastered words state for Skier gamification
  const getMasteredWords = (): string[] => {
    try { return JSON.parse(localStorage.getItem("yki-mastered-words") || "[]"); } catch { return []; }
  };
  const [masteredWords, setMasteredWords] = useState<string[]>(getMasteredWords());
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const skierContainerRef = useRef<HTMLDivElement | null>(null);

  // Exam scores for skier integration
  const getExamScores = (): Record<string, { score: number; total: number }> => {
    try { return JSON.parse(localStorage.getItem("yki-exam-scores") || "{}"); } catch { return {}; }
  };
  const [examScores, setExamScores] = useState<Record<string, { score: number; total: number }>>(getExamScores());

  const allVocabWords = useMemo(() =>
    allVocabModules.flatMap(m => m.lessons.flatMap(l => l.vocabulary || [])),
  []);

  const handleMasterWord = (word: string, event: React.MouseEvent) => {
    if (masteredWords.includes(word)) return;
    const newMastered = [...masteredWords, word];
    setMasteredWords(newMastered);
    localStorage.setItem("yki-mastered-words", JSON.stringify(newMastered));

    // Flying star animation
    const rect = skierContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setFlyingStars((prev) => [...prev, {
        id: Date.now(),
        startX: event.clientX - rect.left,
        startY: event.clientY - rect.top,
      }]);
    }

    // Motivational toast
    const quote = FINNISH_QUOTES[Math.floor(Math.random() * FINNISH_QUOTES.length)];
    toast.success(quote, { style: { fontSize: "18px", fontWeight: "bold" } });
  };

  const handleStarLanded = (id: number) => {
    setFlyingStars((prev) => prev.filter((s) => s.id !== id));
  };

  // Handle exam completion — link to skier progress
  const handleExamComplete = (lessonId: string, score: number, total: number) => {
    const newScores = { ...examScores, [lessonId]: { score, total } };
    setExamScores(newScores);
    localStorage.setItem("yki-exam-scores", JSON.stringify(newScores));

    // If score >= 80%, move skier up by adding "exam words"
    if (score >= total * 0.8) {
      toast.success("Erinomainen tulos! Hiihtäjäsi etenee vuorella! ⛷️🏔️");
    }

    // Check if all 4 skill modules are completed
    const skillModuleIds = ["yki-mock-reading", "yki-mock-listening", "yki-mock-writing", "yki-mock-speaking"];
    const allSkillsDone = skillModuleIds.every(moduleId => {
      const mod = allMockExamModules.find(m => m.id === moduleId);
      if (!mod) return false;
      return mod.lessons.some(l => {
        const s = newScores[l.id];
        return s && s.score >= s.total * 0.8;
      });
    });

    if (allSkillsDone) {
      setTimeout(() => setShowBadge(true), 1000);
    }
  };

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
    try { return JSON.parse(localStorage.getItem("yki-progress") || "{}"); } catch { return {}; }
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

  // Determine if current lesson is a writing or speaking exam
  const isWritingExam = selectedModule?.id === "yki-mock-writing";
  const isSpeakingExam = selectedModule?.id === "yki-mock-speaking";
  const isMockExam = selectedModule?.pillar === "mock-exams";

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

            {/* Finnish Skier Progress */}
            <div className="mt-4">
              <FinnishSkier
                mastered={masteredWords.length}
                total={allVocabWords.length}
                flyingStars={flyingStars}
                onStarLanded={handleStarLanded}
                containerRef={skierContainerRef}
              />
            </div>
          </div>

          {/* Pillar Tabs */}
          <Tabs value={activePillar} onValueChange={(v) => { setActivePillar(v as any); setSelectedModule(null); setSelectedLesson(null); }}>
            <TabsList className="w-full max-w-lg grid grid-cols-3 h-11 mb-6">
              <TabsTrigger value="vocabulary" className="text-xs sm:text-sm">📖 Sanasto</TabsTrigger>
              <TabsTrigger value="lessons" className="text-xs sm:text-sm">🎓 Oppitunnit</TabsTrigger>
              <TabsTrigger value="mock-exams" className="text-xs sm:text-sm">📝 Kokeet</TabsTrigger>
            </TabsList>

            <TabsContent value={activePillar}>
              {/* Module detail view */}
              {selectedModule && selectedLesson ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Takaisin
                  </Button>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{selectedLesson.icon}</span>
                    <div>
                      {/* Show Finnish title first for mock exams */}
                      <h2 className="text-xl font-bold text-foreground">
                        {isMockExam ? selectedLesson.title : selectedLesson.titleEn}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {isMockExam ? selectedLesson.titleEn : selectedLesson.title}
                      </p>
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
                          {l.icon} {isMockExam ? l.title : l.titleEn}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Writing Exam — show writing section */}
                  {isWritingExam ? (
                    <WritingSection lesson={selectedLesson} />
                  ) : isSpeakingExam ? (
                    /* Speaking Exam — show speaking recorder */
                    <SpeakingRecorder lesson={selectedLesson} />
                  ) : (
                    <>
                      {/* Theory/Grammar — show Finnish for exams */}
                      {selectedLesson.theory && !isWritingExam && !isSpeakingExam && (
                        <Card className="mb-6 border-[#003580]/10">
                          <CardContent className="p-6 prose prose-sm dark:prose-invert max-w-none text-[18px]">
                            <ReactMarkdown>
                              {isMockExam ? selectedLesson.theory : (selectedLesson.theoryEn || selectedLesson.theory)}
                            </ReactMarkdown>
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
                          <h3 className="text-lg font-bold text-foreground mb-4">📖 Sanasto</h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedLesson.vocabulary.map((v, i) => (
                              <VocabCard
                                key={v.word}
                                vocab={v}
                                index={i}
                                isMastered={masteredWords.includes(v.word)}
                                onMaster={handleMasterWord}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quiz — Finnish-first for mock exams */}
                      {selectedLesson.quiz && selectedLesson.quiz.length > 0 && (
                        <div className="mb-6">
                          <QuizSection
                            quiz={selectedLesson.quiz}
                            timerEnabled={isMockExam}
                            showFinnishOnly={isMockExam}
                            onExamComplete={(score, total) => handleExamComplete(selectedLesson.id, score, total)}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Speaking recorder for reading/listening exams */}
                  {isMockExam && !isWritingExam && !isSpeakingExam && (
                    <div className="mt-6">
                      <SpeakingRecorder />
                    </div>
                  )}

                  {/* Mark Complete */}
                  <div className="text-center mt-8">
                    {progress[selectedLesson.id] ? (
                      <Badge className="bg-emerald-100 text-emerald-800 text-sm py-2 px-4">
                        ✅ Suoritettu
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => {
                          markComplete(selectedLesson.id);
                          window.location.reload();
                        }}
                        className="gap-2 text-lg px-8 py-3 font-bold"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Merkitse valmiiksi
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : selectedModule ? (
                // Module lesson list
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4 gap-1">
                    <ChevronLeft className="w-4 h-4" /> Takaisin
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
                              <h3 className="font-semibold text-foreground truncate">
                                {isMockExam ? lesson.title : lesson.titleEn}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {isMockExam ? lesson.titleEn : lesson.title}
                              </p>
                            </div>
                            {progress[lesson.id] && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto shrink-0" />}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">{lesson.level}</Badge>
                            {lesson.vocabulary && <Badge variant="secondary" className="text-xs">{lesson.vocabulary.length} sanaa</Badge>}
                            {lesson.quiz && <Badge variant="secondary" className="text-xs">{lesson.quiz.length} kysymystä</Badge>}
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

      {/* Floating Finnish Dictionary */}
      <FloatingFinnishDictionary />

      {/* YKI A2 Ready Badge */}
      <YkiReadyBadge show={showBadge} onClose={() => setShowBadge(false)} />
    </div>
  );
};

export default YkiDashboard;
