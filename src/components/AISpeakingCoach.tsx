// AI Speaking Coach — pronunciation practice with Web Speech API and real-time color-coded feedback
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, RotateCcw, ChevronRight, ChevronLeft, CheckCircle, XCircle, AlertTriangle, Info, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages, pronunciationTips, type SpeakingSentence, type SpeakingTheme } from "@/data/speakingCoachData";
import { playFinnishTts } from "@/lib/finnishTts";

// Word comparison result
interface WordResult {
  word: string;
  expected: string;
  status: "correct" | "close" | "wrong" | "missing";
}

interface AISpeakingCoachProps {
  language: "english" | "finnish" | "chinese";
  onScoreUpdate?: (score: number) => void;
}

// Normalize text for comparison — strip punctuation & lowercase
const normalize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[.,!?;:'"()（）。，！？、""''—…·\-]/g, "")
    .split(/\s+/)
    .filter(Boolean);

// Levenshtein distance for fuzzy matching
const levenshtein = (a: string, b: string): number => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
  return dp[a.length][b.length];
};

// Compare spoken words with target — produce color-coded results
const compareWords = (target: string, spoken: string): WordResult[] => {
  const targetWords = normalize(target);
  const spokenWords = normalize(spoken);

  return targetWords.map((expected, i) => {
    const spokenWord = spokenWords[i];
    if (!spokenWord) return { word: expected, expected, status: "missing" as const };

    if (spokenWord === expected) return { word: spokenWord, expected, status: "correct" as const };

    // Fuzzy match — allow 1-2 char difference based on word length
    const dist = levenshtein(spokenWord, expected);
    const threshold = expected.length <= 3 ? 1 : expected.length <= 6 ? 2 : 3;
    if (dist <= threshold) return { word: spokenWord, expected, status: "close" as const };

    return { word: spokenWord, expected, status: "wrong" as const };
  });
};

// Calculate accuracy percentage
const calcAccuracy = (results: WordResult[]): number => {
  if (results.length === 0) return 0;
  const score = results.reduce((acc, r) => {
    if (r.status === "correct") return acc + 1;
    if (r.status === "close") return acc + 0.5;
    return acc;
  }, 0);
  return Math.round((score / results.length) * 100);
};

const AISpeakingCoach = ({ language, onScoreUpdate }: AISpeakingCoachProps) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];

  // State
  const [selectedTheme, setSelectedTheme] = useState<SpeakingTheme | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState<WordResult[] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [totalPracticed, setTotalPracticed] = useState(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioVisualizerRef = useRef<number>(0);

  const currentSentence = useMemo(
    () => selectedTheme?.sentences[currentIndex] ?? null,
    [selectedTheme, currentIndex]
  );

  // Check browser support
  const speechSupported = useMemo(() => {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }, []);

  // Initialize speech recognition
  const startRecognition = useCallback(() => {
    if (!speechSupported || !currentSentence) return;

    setMicError(null);
    setTranscript("");
    setResults(null);
    setAccuracy(null);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = config.speechLang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setMicError(t("Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt.", "Please allow microphone access in your browser settings."));
      } else if (event.error === "no-speech") {
        setMicError(t("Không nghe thấy giọng nói. Hãy nói rõ hơn.", "No speech detected. Please speak more clearly."));
      } else {
        setMicError(t(`Lỗi nhận dạng giọng nói: ${event.error}`, `Speech recognition error: ${event.error}`));
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [speechSupported, currentSentence, config.speechLang, t]);

  // Stop recording and process results
  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsListening(false);
  }, []);

  // Process transcript when recording stops
  useEffect(() => {
    if (!isRecording && transcript && currentSentence) {
      const wordResults = compareWords(currentSentence.text, transcript);
      const acc = calcAccuracy(wordResults);
      setResults(wordResults);
      setAccuracy(acc);
      setTotalPracticed((p) => p + 1);

      if (acc >= 90) {
        setPerfectStreak((s) => s + 1);
        onScoreUpdate?.(acc);
        toast.success(
          acc === 100
            ? t("🎯 Hoàn hảo! Phát âm chuẩn tuyệt đối!", "🎯 Perfect! Flawless pronunciation!")
            : t("🌟 Tuyệt vời! Phát âm rất tốt!", "🌟 Excellent pronunciation!"),
          { duration: 3000 }
        );
      } else if (acc >= 70) {
        setPerfectStreak(0);
        toast.info(t("👍 Khá tốt! Hãy thử lại để cải thiện.", "👍 Good! Try again to improve."), { duration: 3000 });
      } else {
        setPerfectStreak(0);
        toast.warning(t("💪 Cần luyện thêm. Nghe mẫu và thử lại!", "💪 Keep practicing. Listen to the demo and try again!"), { duration: 3000 });
      }
    }
  }, [isRecording, transcript, currentSentence, onScoreUpdate, t]);

  // Play demo audio (TTS)
  const playDemo = useCallback(async () => {
    if (!currentSentence || isPlayingDemo) return;
    setIsPlayingDemo(true);

    try {
      if (language === "finnish") {
        await playFinnishTts(currentSentence.text);
      } else {
        const utterance = new SpeechSynthesisUtterance(currentSentence.text);
        utterance.lang = config.speechLang;
        utterance.rate = 0.85;
        utterance.onend = () => setIsPlayingDemo(false);
        utterance.onerror = () => setIsPlayingDemo(false);
        window.speechSynthesis.speak(utterance);
        return; // onend will handle setIsPlayingDemo
      }
    } catch {
      toast.error(t("Không thể phát âm thanh.", "Could not play audio."));
    }
    setIsPlayingDemo(false);
  }, [currentSentence, language, config.speechLang, isPlayingDemo, t]);

  // Navigate sentences
  const goNext = () => {
    if (selectedTheme && currentIndex < selectedTheme.sentences.length - 1) {
      setCurrentIndex((i) => i + 1);
      resetState();
    }
  };
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      resetState();
    }
  };
  const resetState = () => {
    setTranscript("");
    setResults(null);
    setAccuracy(null);
    setMicError(null);
  };

  // Color for word status
  const wordColor = (status: WordResult["status"]) => {
    switch (status) {
      case "correct": return "text-emerald-600 dark:text-emerald-400";
      case "close": return "text-amber-600 dark:text-amber-400";
      case "wrong": return "text-red-600 dark:text-red-400";
      case "missing": return "text-red-400 dark:text-red-500 opacity-60";
    }
  };

  const wordBg = (status: WordResult["status"]) => {
    switch (status) {
      case "correct": return "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800";
      case "close": return "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800";
      case "wrong": return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
      case "missing": return "bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-800/50";
    }
  };

  const statusIcon = (status: WordResult["status"]) => {
    switch (status) {
      case "correct": return <CheckCircle className="w-3 h-3 text-emerald-500" />;
      case "close": return <AlertTriangle className="w-3 h-3 text-amber-500" />;
      case "wrong": return <XCircle className="w-3 h-3 text-red-500" />;
      case "missing": return <XCircle className="w-3 h-3 text-red-400 opacity-60" />;
    }
  };

  // Accuracy bar color
  const accColor = (acc: number) => {
    if (acc >= 90) return "bg-emerald-500";
    if (acc >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  // Theme selection view
  if (!selectedTheme) {
    return (
      <div className="space-y-6">
        {/* Stats bar */}
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-sm px-3 py-1.5">
            <Trophy className="w-3.5 h-3.5 mr-1.5" />
            {t("Đã luyện", "Practiced")}: {totalPracticed}
          </Badge>
          {perfectStreak >= 3 && (
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-sm px-3 py-1.5">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              🔥 {t("Chuỗi hoàn hảo", "Perfect streak")}: {perfectStreak}
            </Badge>
          )}
        </div>

        {/* Theme cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.themes.map((theme) => (
            <motion.div
              key={theme.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all h-full"
                onClick={() => {
                  setSelectedTheme(theme);
                  setCurrentIndex(0);
                  resetState();
                }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-xl">{theme.icon}</span>
                    {theme.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{theme.nameVi}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {theme.sentences.length} {t("câu luyện tập", "sentences")}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {["easy", "medium", "hard"].map((d) => {
                      const count = theme.sentences.filter((s) => s.difficulty === d).length;
                      if (!count) return null;
                      return (
                        <Badge key={d} variant="outline" className="text-xs">
                          {d === "easy" ? "🟢" : d === "medium" ? "🟡" : "🔴"} {count}
                        </Badge>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Practice view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedTheme(null);
            resetState();
          }}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("Chọn chủ đề", "Choose theme")}
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            {selectedTheme.icon} {selectedTheme.name}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {currentIndex + 1} / {selectedTheme.sentences.length}
          </Badge>
        </div>
      </div>

      {/* Main practice card */}
      {currentSentence && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSentence.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2">
              <CardContent className="pt-6 space-y-6">
                {/* Target sentence */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={
                        currentSentence.difficulty === "easy"
                          ? "border-emerald-300 text-emerald-700 dark:text-emerald-400"
                          : currentSentence.difficulty === "medium"
                          ? "border-amber-300 text-amber-700 dark:text-amber-400"
                          : "border-red-300 text-red-700 dark:text-red-400"
                      }
                    >
                      {currentSentence.difficulty === "easy"
                        ? t("Dễ", "Easy")
                        : currentSentence.difficulty === "medium"
                        ? t("Trung bình", "Medium")
                        : t("Khó", "Hard")}
                    </Badge>
                  </div>

                  {/* Display sentence — color-coded if results available */}
                  <div className="min-h-[4rem] flex items-center justify-center">
                    {results ? (
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {results.map((r, i) => (
                          <Popover key={i}>
                            <PopoverTrigger asChild>
                              <button
                                className={`px-2 py-1 rounded-lg border text-lg font-medium transition-all hover:scale-105 ${wordBg(r.status)} ${wordColor(r.status)}`}
                                style={{ fontSize: "1.35rem" }}
                              >
                                <span className="flex items-center gap-1">
                                  {statusIcon(r.status)}
                                  {r.expected}
                                </span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-4" align="center">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-base">{r.expected}</span>
                                  <Badge className={r.status === "correct" ? "bg-emerald-100 text-emerald-800" : r.status === "close" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}>
                                    {r.status === "correct" ? "✓ Correct" : r.status === "close" ? "~ Close" : "✗ Wrong"}
                                  </Badge>
                                </div>
                                {r.status !== "correct" && (
                                  <p className="text-sm text-muted-foreground">
                                    {t("Bạn nói", "You said")}: <span className="font-medium text-foreground">{r.word || "—"}</span>
                                  </p>
                                )}
                                {currentSentence.ipa && (
                                  <div className="mt-2 p-2 bg-secondary rounded-lg">
                                    <p className="text-xs text-muted-foreground font-medium mb-1">
                                      {language === "chinese" ? "Pinyin" : "IPA"}
                                    </p>
                                    <p className="text-sm text-primary font-mono">{currentSentence.ipa}</p>
                                  </div>
                                )}
                                {r.status === "wrong" && (
                                  <div className="mt-2 p-2 bg-primary/5 rounded-lg">
                                    <p className="text-xs font-medium text-primary mb-1">💡 {t("Mẹo phát âm", "Pronunciation tip")}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {t(
                                        "Nghe lại mẫu và chú ý đến âm tiết. Hãy nói chậm và rõ ràng.",
                                        "Listen to the demo again and pay attention to syllables. Speak slowly and clearly."
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    ) : (
                      <p className="text-foreground font-semibold leading-relaxed" style={{ fontSize: "1.5rem" }}>
                        {currentSentence.text}
                      </p>
                    )}
                  </div>

                  {/* Translation */}
                  <p className="text-sm text-muted-foreground italic">{currentSentence.translation}</p>

                  {/* IPA / Pinyin */}
                  {currentSentence.ipa && (
                    <p className="text-xs text-primary font-mono">{currentSentence.ipa}</p>
                  )}
                </div>

                {/* Accuracy bar */}
                {accuracy !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {t("Độ chính xác", "Accuracy")}
                      </span>
                      <span className={`text-lg font-bold ${accuracy >= 90 ? "text-emerald-600" : accuracy >= 70 ? "text-amber-600" : "text-red-600"}`}>
                        {accuracy}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${accColor(accuracy)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${accuracy}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    {accuracy >= 90 && perfectStreak >= 3 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl"
                      >
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                          🏆 Perfect Pitch Badge! Streak: {perfectStreak}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Mic error */}
                {micError && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-xl text-sm text-red-700 dark:text-red-400"
                  >
                    <Info className="w-4 h-4 shrink-0" />
                    {micError}
                  </motion.div>
                )}

                {/* Browser not supported warning */}
                {!speechSupported && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl text-sm text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {t(
                      "Trình duyệt không hỗ trợ nhận dạng giọng nói. Vui lòng sử dụng Chrome hoặc Edge.",
                      "Browser does not support speech recognition. Please use Chrome or Edge."
                    )}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {/* Listen to Teacher */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={playDemo}
                    disabled={isPlayingDemo}
                    className="gap-2"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlayingDemo ? "animate-pulse text-primary" : ""}`} />
                    {t("Nghe mẫu", "Listen")}
                  </Button>

                  {/* Record / Stop */}
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      onClick={isRecording ? stopRecognition : startRecognition}
                      disabled={!speechSupported}
                      className={`gap-2 min-w-[160px] ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {isRecording ? (
                        <>
                          {/* Waveform animation */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div
                                key={i}
                                className="w-0.5 bg-white rounded-full"
                                animate={{
                                  height: [4, 16, 8, 20, 6],
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.1,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                          {t("Dừng", "Stop")}
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          {t("Ghi âm", "Record")}
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Retry */}
                  {results && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        resetState();
                        startRecognition();
                      }}
                      className="gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      {t("Thử lại", "Retry")}
                    </Button>
                  )}
                </div>

                {/* Transcript display */}
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-secondary/50 rounded-xl"
                  >
                    <p className="text-xs text-muted-foreground mb-1 font-medium">
                      {t("Bạn đã nói", "You said")}:
                    </p>
                    <p className="text-sm text-foreground">{transcript}</p>
                  </motion.div>
                )}

                {/* Legend */}
                {results && (
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      {t("Đúng", "Correct")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      {t("Gần đúng", "Close")}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      {t("Sai", "Wrong")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {t("Trước", "Prev")}
        </Button>

        {/* Sentence dots */}
        <div className="flex gap-1.5">
          {selectedTheme.sentences.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                resetState();
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={goNext}
          disabled={selectedTheme && currentIndex >= selectedTheme.sentences.length - 1}
          className="gap-1"
        >
          {t("Tiếp", "Next")}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AISpeakingCoach;
