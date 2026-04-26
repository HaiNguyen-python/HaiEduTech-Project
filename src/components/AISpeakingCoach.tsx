// AI Speaking Coach - pronunciation practice with Web Speech API and real-time color-coded feedback
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, RotateCcw, ChevronRight, ChevronLeft, CheckCircle, XCircle, AlertTriangle, Info, Trophy, Star, Award, Flame, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages, pronunciationTips, type SpeakingSentence, type SpeakingTheme } from "@/data/speakingCoachData";
import { playFinnishTts } from "@/lib/finnishTts";
import { supabase } from "@/integrations/supabase/client";
import GameLeaderboard from "@/components/games/GameLeaderboard";

// Badge definitions for Speaking Coach gamification
interface SpeakingBadge {
  id: string;
  name: string;
  nameVi: string;
  icon: string;
  description: string;
  descriptionVi: string;
  condition: (stats: SpeakingStats) => boolean;
}

interface SpeakingStats {
  totalPracticed: number;
  perfectCount: number; // accuracy >= 95%
  excellentCount: number; // accuracy >= 90%
  maxStreak: number;
  themesCompleted: number;
  perfectThemes: number; // themes with all sentences >= 90%
}

const SPEAKING_BADGES: SpeakingBadge[] = [
  { id: "first-word", name: "First Steps", nameVi: "Bước đầu tiên", icon: "🎤", description: "Complete your first sentence", descriptionVi: "Hoàn thành câu đầu tiên", condition: (s) => s.totalPracticed >= 1 },
  { id: "perfect-pitch", name: "Perfect Pitch", nameVi: "Phát âm hoàn hảo", icon: "🎯", description: "Get 100% accuracy on a sentence", descriptionVi: "Đạt 100% chính xác", condition: (s) => s.perfectCount >= 1 },
  { id: "streak-3", name: "Hat Trick", nameVi: "Chuỗi 3", icon: "🔥", description: "3 excellent scores in a row", descriptionVi: "3 lần xuất sắc liên tiếp", condition: (s) => s.maxStreak >= 3 },
  { id: "streak-5", name: "On Fire", nameVi: "Đang cháy", icon: "⚡", description: "5 excellent scores in a row", descriptionVi: "5 lần xuất sắc liên tiếp", condition: (s) => s.maxStreak >= 5 },
  { id: "practice-10", name: "Dedicated", nameVi: "Tận tâm", icon: "📚", description: "Practice 10 sentences", descriptionVi: "Luyện 10 câu", condition: (s) => s.totalPracticed >= 10 },
  { id: "practice-25", name: "Committed", nameVi: "Cam kết", icon: "💪", description: "Practice 25 sentences", descriptionVi: "Luyện 25 câu", condition: (s) => s.totalPracticed >= 25 },
  { id: "practice-50", name: "Speaking Master", nameVi: "Bậc thầy nói", icon: "🏆", description: "Practice 50 sentences", descriptionVi: "Luyện 50 câu", condition: (s) => s.totalPracticed >= 50 },
  { id: "perfect-5", name: "Precision Pro", nameVi: "Chính xác tuyệt đối", icon: "💎", description: "Get 5 perfect scores", descriptionVi: "Đạt 5 lần điểm tuyệt đối", condition: (s) => s.perfectCount >= 5 },
  { id: "streak-10", name: "Unstoppable", nameVi: "Không thể ngăn cản", icon: "🌟", description: "10 excellent scores in a row", descriptionVi: "10 lần xuất sắc liên tiếp", condition: (s) => s.maxStreak >= 10 },
  { id: "theme-master", name: "Theme Master", nameVi: "Bậc thầy chủ đề", icon: "👑", description: "Complete all sentences in a theme with 90%+", descriptionVi: "Hoàn thành tất cả câu trong chủ đề với 90%+", condition: (s) => s.perfectThemes >= 1 },
];

const SPEAKING_STATS_KEY = "speaking-coach-stats";
const SPEAKING_BADGES_KEY = "speaking-coach-badges";
const SPEAKING_THEME_SCORES_KEY = "speaking-coach-theme-scores";

const loadStats = (lang: string): SpeakingStats => {
  try {
    const raw = localStorage.getItem(`${SPEAKING_STATS_KEY}-${lang}`);
    return raw ? JSON.parse(raw) : { totalPracticed: 0, perfectCount: 0, excellentCount: 0, maxStreak: 0, themesCompleted: 0, perfectThemes: 0 };
  } catch { return { totalPracticed: 0, perfectCount: 0, excellentCount: 0, maxStreak: 0, themesCompleted: 0, perfectThemes: 0 }; }
};
const saveStats = (lang: string, stats: SpeakingStats) => localStorage.setItem(`${SPEAKING_STATS_KEY}-${lang}`, JSON.stringify(stats));

const loadBadges = (lang: string): string[] => {
  try { const raw = localStorage.getItem(`${SPEAKING_BADGES_KEY}-${lang}`); return raw ? JSON.parse(raw) : []; } catch { return []; }
};
const saveBadges = (lang: string, badges: string[]) => localStorage.setItem(`${SPEAKING_BADGES_KEY}-${lang}`, JSON.stringify(badges));

const loadThemeScores = (lang: string): Record<string, Record<string, number>> => {
  try { const raw = localStorage.getItem(`${SPEAKING_THEME_SCORES_KEY}-${lang}`); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
};
const saveThemeScores = (lang: string, scores: Record<string, Record<string, number>>) => localStorage.setItem(`${SPEAKING_THEME_SCORES_KEY}-${lang}`, JSON.stringify(scores));

// Word comparison result
interface WordResult {
  word: string;
  expected: string;
  status: "correct" | "close" | "wrong" | "missing";
}

interface AISpeakingCoachProps {
  language: "english" | "finnish" | "chinese" | "vietnamese";
  onScoreUpdate?: (score: number) => void;
  onPerfectScore?: () => void; // callback for gamification integration (flying stars etc.)
}

// Number word ↔ digit mapping for comparison tolerance
const numberWordMap: Record<string, string> = {
  // English
  zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
  eleven: "11", twelve: "12", thirteen: "13", fourteen: "14", fifteen: "15",
  sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20",
  thirty: "30", forty: "40", fifty: "50", sixty: "60", seventy: "70",
  eighty: "80", ninety: "90", hundred: "100", thousand: "1000", million: "1000000",
  // Finnish
  nolla: "0", yksi: "1", kaksi: "2", kolme: "3", neljä: "4", viisi: "5",
  kuusi: "6", seitsemän: "7", kahdeksan: "8", yhdeksän: "9", kymmenen: "10",
  // Chinese (pinyin number words spoken)
  yī: "1", èr: "2", sān: "3", sì: "4", wǔ: "5",
  liù: "6", qī: "7", bā: "8", jiǔ: "9", shí: "10",
  // Vietnamese
  không: "0", một: "1", hai: "2", ba: "3", bốn: "4", năm: "5",
  sáu: "6", bảy: "7", tám: "8", chín: "9", mười: "10",
};
const digitToWords: Record<string, string[]> = {};
Object.entries(numberWordMap).forEach(([w, d]) => {
  if (!digitToWords[d]) digitToWords[d] = [];
  digitToWords[d].push(w);
});

// Check if two tokens represent the same number (word vs digit)
const isNumberEquivalent = (a: string, b: string): boolean => {
  if (a === b) return true;
  // a is word, b is digit (or vice versa)
  const aDigit = numberWordMap[a] ?? a;
  const bDigit = numberWordMap[b] ?? b;
  if (aDigit === bDigit) return true;
  // Also handle ordinals: "first" == "1st", "third" == "3rd" etc.
  const ordinalMap: Record<string, string> = {
    first: "1st", second: "2nd", third: "3rd", fourth: "4th", fifth: "5th",
    sixth: "6th", seventh: "7th", eighth: "8th", ninth: "9th", tenth: "10th",
  };
  if (ordinalMap[a] === b || ordinalMap[b] === a) return true;
  return false;
};

// Common contractions & spoken equivalents
const spokenEquivalents: Record<string, string[]> = {
  "i'm": ["im", "i am"], "don't": ["dont", "do not"], "doesn't": ["doesnt", "does not"],
  "can't": ["cant", "cannot"], "won't": ["wont", "will not"], "it's": ["its", "it is"],
  "i've": ["ive", "i have"], "i'll": ["ill", "i will"], "we're": ["were", "we are"],
  "they're": ["theyre", "they are"], "you're": ["youre", "you are"],
  "isn't": ["isnt", "is not"], "aren't": ["arent", "are not"],
  "wasn't": ["wasnt", "was not"], "weren't": ["werent", "were not"],
  "that's": ["thats", "that is"], "there's": ["theres", "there is"],
  "what's": ["whats", "what is"], "who's": ["whos", "who is"],
  "let's": ["lets", "let us"], "he's": ["hes", "he is"], "she's": ["shes", "she is"],
};

const isSpokenEquivalent = (a: string, b: string): boolean => {
  if (a === b) return true;
  for (const [key, alts] of Object.entries(spokenEquivalents)) {
    const all = [key, ...alts];
    if (all.includes(a) && all.includes(b)) return true;
  }
  return false;
};

// Normalize text for comparison - strip punctuation & lowercase
const normalize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[.,!?;:'"()（）。，！？、""''-…·\-]/g, "")
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

// Compare spoken words with target - produce color-coded results
const compareWords = (target: string, spoken: string): WordResult[] => {
  const targetWords = normalize(target);
  const spokenWords = normalize(spoken);

  return targetWords.map((expected, i) => {
    const spokenWord = spokenWords[i];
    if (!spokenWord) return { word: expected, expected, status: "missing" as const };

    // Exact match
    if (spokenWord === expected) return { word: spokenWord, expected, status: "correct" as const };

    // Number equivalence (e.g., "three" == "3")
    if (isNumberEquivalent(spokenWord, expected)) return { word: spokenWord, expected, status: "correct" as const };

    // Contraction / spoken equivalence (e.g., "I'm" == "I am")
    if (isSpokenEquivalent(spokenWord, expected)) return { word: spokenWord, expected, status: "correct" as const };

    // Fuzzy match - allow 1-2 char difference based on word length
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

const AISpeakingCoach = ({ language, onScoreUpdate, onPerfectScore }: AISpeakingCoachProps) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];

  // Guard ref to prevent processing same transcript twice (infinite loop fix)
  const lastProcessedTranscriptRef = useRef<string>("");

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
  
  // Gamification state
  const [stats, setStats] = useState<SpeakingStats>(() => loadStats(language));
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => loadBadges(language));
  const [themeScores, setThemeScores] = useState<Record<string, Record<string, number>>>(() => loadThemeScores(language));
  const [showBadgePanel, setShowBadgePanel] = useState(false);
  const [newBadge, setNewBadge] = useState<SpeakingBadge | null>(null);
  const [sessionScore, setSessionScore] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioVisualizerRef = useRef<number>(0);
  const manualStopRef = useRef(false);
  const accumulatedTranscriptRef = useRef("");

  // Reset all state when language changes
  useEffect(() => {
    setSelectedTheme(null);
    setCurrentIndex(0);
    setTranscript("");
    setResults(null);
    setAccuracy(null);
    setIsRecording(false);
    setIsListening(false);
    setMicError(null);
    setPerfectStreak(0);
    setTotalPracticed(0);
    setIsPlayingDemo(false);
    setSessionScore(0);
    setStats(loadStats(language));
    setEarnedBadges(loadBadges(language));
    setThemeScores(loadThemeScores(language));
    lastProcessedTranscriptRef.current = "";
    manualStopRef.current = false;
    accumulatedTranscriptRef.current = "";
    // Stop any active recognition
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch {}
      recognitionRef.current = null;
    }
  }, [language]);

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
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    accumulatedTranscriptRef.current = "";
    manualStopRef.current = false;

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

      accumulatedTranscriptRef.current = finalTranscript;
      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Only grade if user manually stopped
      if (manualStopRef.current) {
        // Use accumulated transcript if current transcript is interim
        if (accumulatedTranscriptRef.current) {
          setTranscript(accumulatedTranscriptRef.current);
        }
        setIsRecording(false);
      } else {
        // Auto-ended (e.g. silence) - restart if still recording
        // This keeps listening until user clicks Stop
        try { recognition.start(); } catch {}
      }
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
    manualStopRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsListening(false);
  }, []);

  // Check and award new badges
  const checkBadges = useCallback((newStats: SpeakingStats) => {
    const currentBadges = loadBadges(language);
    for (const badge of SPEAKING_BADGES) {
      if (!currentBadges.includes(badge.id) && badge.condition(newStats)) {
        currentBadges.push(badge.id);
        setNewBadge(badge);
        // Celebration confetti for new badge
        confetti({ particleCount: 60, spread: 80, origin: { x: 0.5, y: 0.4 }, colors: ["#facc15", "#f59e0b", "#8b5cf6", "#06b6d4"], disableForReducedMotion: true });
        toast.success(`${badge.icon} ${t(badge.nameVi, badge.name)}!`, {
          description: t(badge.descriptionVi, badge.description),
          duration: 5000,
          style: { fontSize: "18px", fontWeight: 700, padding: "16px 20px" },
        });
        setTimeout(() => setNewBadge(null), 5000);
      }
    }
    saveBadges(language, currentBadges);
    setEarnedBadges(currentBadges);
  }, [language, t]);

  // Process transcript when recording stops
  useEffect(() => {
    if (!isRecording && transcript && currentSentence && selectedTheme) {
      // Guard: skip if we already processed this exact transcript
      if (lastProcessedTranscriptRef.current === transcript) return;

      // Defensive: skip grading if target sentence text is missing.
      // This prevents 0% scores from being saved when the data hasn't loaded yet.
      const targetText = (currentSentence.text || "").trim();
      if (!targetText) {
        console.warn("[AISpeakingCoach] Skipping grading: target sentence text is empty", currentSentence);
        return;
      }

      lastProcessedTranscriptRef.current = transcript;

      const wordResults = compareWords(targetText, transcript);
      const acc = calcAccuracy(wordResults);
      setResults(wordResults);
      setAccuracy(acc);
      setTotalPracticed((p) => p + 1);

      // Update theme scores
      setThemeScores(prev => {
        const newThemeScores = { ...prev };
        if (!newThemeScores[selectedTheme.id]) newThemeScores[selectedTheme.id] = {};
        const prevBest = newThemeScores[selectedTheme.id][currentSentence.id] || 0;
        if (acc > prevBest) newThemeScores[selectedTheme.id][currentSentence.id] = acc;
        saveThemeScores(language, newThemeScores);

        // Check theme completion & update stats
        setStats(prevStats => {
          const newStats = { ...prevStats };
          newStats.totalPracticed += 1;
          if (acc >= 95) newStats.perfectCount += 1;
          if (acc >= 90) newStats.excellentCount += 1;

          if (acc >= 90) {
            setPerfectStreak(ps => {
              const newStreak = ps + 1;
              if (newStreak > newStats.maxStreak) newStats.maxStreak = newStreak;
              return newStreak;
            });
            onScoreUpdate?.(acc);
            onPerfectScore?.();
            confetti({ particleCount: 25, spread: 50, startVelocity: 18, gravity: 1.3, scalar: 0.6, origin: { x: 0.5, y: 0.5 }, colors: ["#10b981", "#34d399", "#6ee7b7"], ticks: 60, disableForReducedMotion: true });
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

          newStats.perfectThemes = Object.keys(newThemeScores).filter(
            (tid) => {
              const theme = config.themes.find((th) => th.id === tid);
              return theme && theme.sentences.every((s) => (newThemeScores[tid]?.[s.id] || 0) >= 90);
            }
          ).length;

          saveStats(language, newStats);
          checkBadges(newStats);
          return newStats;
        });

        return newThemeScores;
      });

      // Save score to database for leaderboard
      setSessionScore(prev => {
        const newSessionScore = prev + (acc >= 90 ? 10 : acc >= 70 ? 5 : 1);
        (async () => {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              await (supabase as any).from("game_scores").insert({
                user_id: user.id,
                game_type: `speaking_${language}`,
                score: newSessionScore,
                max_streak: 0,
                accuracy: acc,
                metadata: {},
              });
            }
          } catch (e) {
            console.error("Failed to save speaking score:", e);
          }
        })();
        return newSessionScore;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, transcript, currentSentence, selectedTheme]);

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

  // Total sentence count
  const totalSentences = useMemo(() => config.themes.reduce((sum, th) => sum + th.sentences.length, 0), [config.themes]);

  // Theme selection view
  if (!selectedTheme) {
    return (
      <div className="space-y-6">
        {/* Sentence count & Stats bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 text-sm px-3 py-1.5">
            📝 {totalSentences} {t("câu luyện tập", "sentences available")}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1.5">
            <Trophy className="w-3.5 h-3.5 mr-1.5" />
            {t("Đã luyện", "Practiced")}: {stats.totalPracticed}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1.5">
            <Target className="w-3.5 h-3.5 mr-1.5" />
            {t("Hoàn hảo", "Perfect")}: {stats.perfectCount}
          </Badge>
          {stats.maxStreak >= 3 && (
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 text-sm px-3 py-1.5">
              <Flame className="w-3.5 h-3.5 mr-1.5" />
              🔥 {t("Kỷ lục chuỗi", "Best streak")}: {stats.maxStreak}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBadgePanel(!showBadgePanel)}
            className="gap-1.5 ml-auto"
          >
            <Award className="w-4 h-4" />
            {t("Huy hiệu", "Badges")} ({earnedBadges.length}/{SPEAKING_BADGES.length})
          </Button>
        </div>

        {/* Badge Panel */}
        <AnimatePresence>
          {showBadgePanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="border-2 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {t("Bộ sưu tập huy hiệu", "Badge Collection")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {SPEAKING_BADGES.map((badge) => {
                      const earned = earnedBadges.includes(badge.id);
                      return (
                        <div
                          key={badge.id}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all ${
                            earned
                              ? "bg-primary/5 border-primary/20 shadow-sm"
                              : "bg-muted/30 border-muted opacity-50 grayscale"
                          }`}
                        >
                          <span className="text-2xl">{badge.icon}</span>
                          <span className="text-xs font-bold">{t(badge.nameVi, badge.name)}</span>
                          <span className="text-[10px] text-muted-foreground leading-tight">{t(badge.descriptionVi, badge.description)}</span>
                          {earned && <span className="text-[10px] text-emerald-600 font-medium">✓ {t("Đã đạt", "Earned")}</span>}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New badge popup */}
        <AnimatePresence>
          {newBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/80 dark:to-orange-950/80 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-6 shadow-2xl text-center max-w-xs"
            >
              <span className="text-5xl block mb-2">{newBadge.icon}</span>
              <p className="text-lg font-bold text-foreground">{t("Huy hiệu mới!", "New Badge!")}</p>
              <p className="text-base font-semibold text-primary">{t(newBadge.nameVi, newBadge.name)}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(newBadge.descriptionVi, newBadge.description)}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leaderboard + Theme cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Theme cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.themes.map((theme) => {
            const scores = themeScores[theme.id] || {};
            const completedCount = theme.sentences.filter((s) => (scores[s.id] || 0) >= 90).length;
            const themeProgress = theme.sentences.length > 0 ? Math.round((completedCount / theme.sentences.length) * 100) : 0;
            return (
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
                      {themeProgress === 100 && <span className="text-emerald-500 text-sm">✓</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{theme.nameVi}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {theme.sentences.length} {t("câu luyện tập", "sentences")}
                    </p>
                    {/* Theme progress bar */}
                    {completedCount > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{completedCount}/{theme.sentences.length} {t("xuất sắc", "excellent")}</span>
                          <span>{themeProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${themeProgress}%` }} />
                        </div>
                      </div>
                    )}
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
            );
          })}
          </div>

          {/* Leaderboard sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="pt-4">
                <GameLeaderboard gameType={`speaking_${language}`} currentScore={sessionScore} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Practice view
  return (
    <div className="space-y-4">
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

      {/* Navigation - moved up for convenience */}
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

                  {/* Display sentence - color-coded if results available */}
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
                                    {t("Bạn nói", "You said")}: <span className="font-medium text-foreground">{r.word || "-"}</span>
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

    </div>
  );
};

export default AISpeakingCoach;
