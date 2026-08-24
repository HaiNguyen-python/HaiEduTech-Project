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
import { playJapaneseTts } from "@/lib/japaneseTts";
import { japaneseSoundTipsFor } from "@/lib/japaneseSoundTips";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages, pronunciationTips, type SpeakingSentence, type SpeakingTheme } from "@/data/speakingCoachData";
import { playFinnishTts } from "@/lib/finnishTts";
import { playSwedishTts } from "@/lib/swedishTts";
import { transcribeSwedishSentence, swedishSoundTipsFor } from "@/lib/swedishSentenceIpa";
import { swedishSentenceEn } from "@/data/swedishSpeakingEnglishIndex";

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
  language: "english" | "finnish" | "swedish" | "chinese" | "vietnamese" | "japanese";
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

// Contractions WITH an apostrophe. These are always safe to expand because the
// apostrophe removes the ambiguity ("it's" is never the possessive "its").
const apostropheContractions: Record<string, string> = {
  "i'm": "i am", "i've": "i have", "i'll": "i will", "i'd": "i would",
  "don't": "do not", "doesn't": "does not", "didn't": "did not",
  "can't": "cannot", "couldn't": "could not", "won't": "will not", "wouldn't": "would not",
  "shouldn't": "should not", "mustn't": "must not", "shan't": "shall not",
  "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
  "haven't": "have not", "hasn't": "has not", "hadn't": "had not",
  "it's": "it is", "that's": "that is", "there's": "there is", "here's": "here is",
  "what's": "what is", "who's": "who is", "how's": "how is", "where's": "where is",
  "let's": "let us", "he's": "he is", "she's": "she is",
  "we're": "we are", "they're": "they are", "you're": "you are",
  "we've": "we have", "they've": "they have", "you've": "you have",
  "we'll": "we will", "they'll": "they will", "you'll": "you will",
  "he'll": "he will", "she'll": "she will", "it'll": "it will",
  "we'd": "we would", "they'd": "they would", "you'd": "you would",
  "he'd": "he would", "she'd": "she would",
  "would've": "would have", "could've": "could have", "should've": "should have",
};

// Bare (apostrophe-less) spellings that ASR sometimes returns. Only forms with
// NO valid non-contraction meaning are listed here — "its", "were", "ill",
// "lets", "hes", "shes", "wed" are deliberately excluded because expanding them
// would corrupt legitimate words.
const bareContractions: Record<string, string> = {
  im: "i am", ive: "i have", dont: "do not", doesnt: "does not", didnt: "did not",
  cant: "cannot", couldnt: "could not", wont: "will not", wouldnt: "would not",
  shouldnt: "should not", mustnt: "must not",
  isnt: "is not", arent: "are not", wasnt: "was not", werent: "were not",
  havent: "have not", hasnt: "has not", hadnt: "had not",
  thats: "that is", theres: "there is", whats: "what is", whos: "who is",
  theyre: "they are", youre: "you are", theyve: "they have", youve: "you have",
  youll: "you will", theyll: "they will",
};

// Symbols ASR renders as words (and vice versa) — expanded so "50%" and
// "fifty percent" grade the same.
const symbolWords: Array<[RegExp, string]> = [
  [/%/g, " percent "],
  [/\$/g, " dollars "],
  [/€/g, " euros "],
  [/£/g, " pounds "],
  [/&/g, " and "],
  [/°/g, " degrees "],
  [/\+/g, " plus "],
  [/=/g, " equals "],
  [/@/g, " at "],
];

// Normalize text for comparison.
// For CJK (Chinese/Japanese/Korean) we split per Han character because the text
// has no spaces — splitting by whitespace caused "100% correct speech" to grade 0%.
const CJK_RANGE = /[\u3400-\u9fff\uf900-\ufaff]/;
const normalize = (text: string): string[] => {
  let cleaned = text.toLowerCase().replace(/[’`]/g, "'");
  for (const [variant, expansion] of Object.entries(apostropheContractions)) {
    cleaned = cleaned.replace(new RegExp(`\\b${variant.replace("'", "['’]")}\\b`, "g"), expansion);
  }
  for (const [variant, expansion] of Object.entries(bareContractions)) {
    cleaned = cleaned.replace(new RegExp(`\\b${variant}\\b`, "g"), expansion);
  }
  for (const [pattern, word] of symbolWords) {
    cleaned = cleaned.replace(pattern, word);
  }
  cleaned = cleaned
    .replace(/[.,!?;:"()（）。，！？、""''…·\[\]{}]/g, " ")
    .replace(/[\-–-]/g, " ");
  // Detect CJK; if present, split per Han char (ignoring spaces, latin, digits separately).
  if (CJK_RANGE.test(cleaned)) {
    const out: string[] = [];
    for (const ch of cleaned) {
      if (CJK_RANGE.test(ch)) out.push(ch);
      // Skip non-CJK noise (whitespace/punct/latin) — Chinese speech recognition
      // sometimes inserts spaces or transliterations we don't want to grade.
    }
    return out;
  }
  return cleaned.split(/\s+/).filter(Boolean);
};

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

// Fold Nordic / Latin diacritics so ASR (which occasionally drops umlauts on
// fi-FI / sv-SE, especially on mobile Chrome) still matches the expected word.
// Example: ASR "hyva" ↔ target "hyvä", or "hor" ↔ "hör".
const foldDiacritics = (s: string): string =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o").replace(/æ/g, "a").replace(/ß/g, "ss");

const matchStatus = (spokenWord: string, expected: string): WordResult["status"] | null => {
  if (spokenWord === expected || isNumberEquivalent(spokenWord, expected)) return "correct";
  // Diacritic-insensitive exact match (Finnish ä/ö, Swedish å/ä/ö, etc.)
  const sf = foldDiacritics(spokenWord);
  const ef = foldDiacritics(expected);
  if (sf === ef) return "correct";
  // Substring/prefix tolerance - handles plural, tense, particles, agglutination.
  if (expected.length >= 4 && (spokenWord.startsWith(expected.slice(0, Math.max(3, expected.length - 2))) || expected.startsWith(spokenWord.slice(0, Math.max(3, spokenWord.length - 2))))) return "close";
  if (ef.length >= 4 && (sf.startsWith(ef.slice(0, Math.max(3, ef.length - 2))) || ef.startsWith(sf.slice(0, Math.max(3, sf.length - 2))))) return "close";
  // Compare on folded forms so ä/ö differences don't inflate distance.
  const dist = Math.min(levenshtein(spokenWord, expected), levenshtein(sf, ef));
  // More forgiving thresholds so learners aren't punished for minor mispronunciations
  const threshold = expected.length <= 3 ? 1 : expected.length <= 5 ? 2 : expected.length <= 8 ? 3 : 4;
  return dist <= threshold ? "close" : null;
};

// Compare spoken words with target - searches forward so inserted words do not shift the whole sentence to 0%.
const compareWords = (target: string, spoken: string): WordResult[] => {
  const targetWords = normalize(target);
  const spokenWords = normalize(spoken);
  let spokenIndex = 0;

  return targetWords.map((expected) => {
    let bestIndex = -1;
    let bestStatus: WordResult["status"] | null = null;

    for (let i = spokenIndex; i < spokenWords.length; i++) {
      const status = matchStatus(spokenWords[i], expected);
      if (status) {
        bestIndex = i;
        bestStatus = status;
        if (status === "correct") break;
      }
    }

    if (bestIndex >= 0 && bestStatus === "correct") {
      spokenIndex = bestIndex + 1;
      return { word: spokenWords[bestIndex], expected, status: bestStatus };
    }

    // Compound tolerance: Swedish/Finnish compounds ("tunnelbanestation") are often
    // returned by ASR as 2-3 separate words, which used to score as wrong.
    if (expected.length >= 8) {
      for (let span = 2; span <= 3; span++) {
        for (let i = spokenIndex; i + span <= spokenWords.length; i++) {
          const joined = spokenWords.slice(i, i + span).join("");
          const status = matchStatus(joined, expected);
          if (status === "correct" || (status === "close" && !bestStatus)) {
            spokenIndex = i + span;
            return { word: joined, expected, status };
          }
        }
      }
    }

    if (bestIndex >= 0 && bestStatus) {
      const word = spokenWords[bestIndex];
      spokenIndex = bestIndex + 1;
      return { word, expected, status: bestStatus };
    }

    const fallbackWord = spokenWords[spokenIndex];
    if (fallbackWord) spokenIndex += 1;
    return { word: fallbackWord || expected, expected, status: fallbackWord ? "wrong" : "missing" };
  });
};


// Calculate accuracy percentage - gentler: "close" counts as 0.75 (was 0.5)
const calcAccuracy = (results: WordResult[]): number => {
  if (results.length === 0) return 0;
  const score = results.reduce((acc, r) => {
    if (r.status === "correct") return acc + 1;
    if (r.status === "close") return acc + 0.75;
    return acc;
  }, 0);
  // Small generosity bonus so near-perfect rounding feels rewarding
  const raw = (score / results.length) * 100;
  return Math.min(100, Math.round(raw + (raw >= 80 ? 3 : raw >= 50 ? 2 : 0)));
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
  const [levelFilter, setLevelFilter] = useState<"all" | "A1" | "A2" | "B1" | "B2" | "C1">(() => {
    try { return (localStorage.getItem(`speaking-coach-level-${language}`) as any) || "all"; } catch { return "all"; }
  });
  useEffect(() => { try { localStorage.setItem(`speaking-coach-level-${language}`, levelFilter); } catch {} }, [language, levelFilter]);
  
  // Gamification state
  const [stats, setStats] = useState<SpeakingStats>(() => loadStats(language));
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => loadBadges(language));
  const [themeScores, setThemeScores] = useState<Record<string, Record<string, number>>>(() => loadThemeScores(language));
  const [showBadgePanel, setShowBadgePanel] = useState(false);
  const [newBadge, setNewBadge] = useState<SpeakingBadge | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  // Elapsed listening time (seconds) so the learner can see the mic is live.
  const [listenSeconds, setListenSeconds] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioVisualizerRef = useRef<number>(0);
  const manualStopRef = useRef(false);
  const accumulatedTranscriptRef = useRef("");
  // Wall-clock start of the current recording, used for the hard 60s ceiling.
  const recordStartedAtRef = useRef(0);

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

  // iOS / Safari cannot keep a continuous session alive reliably: the auto
  // restart loop drops audio there, so we run a single-shot session instead.
  const isAppleWebkit = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && (navigator as any).maxTouchPoints > 1);
    const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
    return isIOS || isSafari;
  }, []);

  // Verify the microphone can actually be opened before starting recognition.
  // Without this, a denied permission or a missing device surfaces as a generic
  // "recognition unavailable" message that students cannot act on.
  const ensureMicrophoneAccess = useCallback(async (): Promise<boolean> => {
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setMicError(t(
        "Trang cần chạy trên HTTPS để dùng microphone.",
        "The page must run over HTTPS to use the microphone."
      ));
      return false;
    }
    if (!navigator.mediaDevices?.getUserMedia) return true; // Let recognition try anyway
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Release immediately: SpeechRecognition opens its own capture stream.
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (err: any) {
      const name = err?.name || "";
      if (name === "NotAllowedError" || name === "SecurityError") {
        setMicError(t(
          "Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt.",
          "Please allow microphone access in your browser settings."
        ));
      } else if (name === "NotFoundError" || name === "OverconstrainedError") {
        setMicError(t(
          "Không tìm thấy microphone. Kiểm tra thiết bị và thử lại.",
          "No microphone found. Please check your device and try again."
        ));
      } else {
        setMicError(t(
          "Không mở được microphone. Đóng các ứng dụng đang dùng mic rồi thử lại.",
          "Could not open the microphone. Close other apps using it and try again."
        ));
      }
      return false;
    }
  }, [t]);

  // Initialize speech recognition
  const startRecognition = useCallback(async () => {
    if (!speechSupported || !currentSentence) return;

    setMicError(null);
    setTranscript("");
    setResults(null);
    setAccuracy(null);
    setListenSeconds(0);
    // Allow the same sentence to be graded again on a repeat attempt: without
    // this reset an identical transcript is silently skipped and the learner
    // sees no feedback at all.
    lastProcessedTranscriptRef.current = "";

    const micReady = await ensureMicrophoneAccess();
    if (!micReady) return;

    // Ensure any prior recognition instance is fully aborted before starting a
    // new one. Failing to do so is the #1 cause of the "aborted" / "already
    // started" errors students report on mobile Safari / Chrome.
    if (recognitionRef.current) {
      try { recognitionRef.current.onend = null; } catch { /* noop */ }
      try { recognitionRef.current.onerror = null; } catch { /* noop */ }
      try { recognitionRef.current.abort(); } catch { /* noop */ }
      recognitionRef.current = null;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = config.speechLang;
    // Continuous sessions are unreliable on Apple WebKit: keep a single shot
    // there so audio is not dropped between restarts.
    recognition.continuous = !isAppleWebkit;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    accumulatedTranscriptRef.current = "";
    manualStopRef.current = false;
    recordStartedAtRef.current = Date.now();
    let hadError = false;
    let restartAttempts = 0;

    recognition.onstart = () => {
      setIsRecording(true);
      setIsListening(true);
    };

    // Text captured & finalized in PRIOR recognition sessions (before an
    // auto-restart). Kept here so long Chinese sentences that trigger a
    // silence-driven onend mid-sentence don't lose the first half when the
    // recognizer restarts with a fresh event.results array.
    let committedFromPriorSessions = "";

    // Count of consecutive silent restarts (no new speech since last restart).
    // Reset whenever fresh speech comes in so a learner speaking a long
    // sentence in chunks never runs out of retries mid-utterance.
    let silentRestarts = 0;
    let lastSpeechAt = Date.now();

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

      // Combine anything committed in previous sessions with what we have
      // captured so far in this session (final + interim). Doing it this way
      // is critical for long CJK sentences where zh-CN ASR silence timeouts
      // are aggressive and fire multiple onend / onstart cycles per utterance.
      const sessionTranscript = finalTranscript + (interimTranscript ? (finalTranscript ? " " : "") + interimTranscript : "");
      const combined = (committedFromPriorSessions + (committedFromPriorSessions && sessionTranscript ? " " : "") + sessionTranscript).trim();
      if (combined) {
        accumulatedTranscriptRef.current = combined;
        // Any incoming speech clears a transient "no speech" warning.
        setMicError(null);
        // Fresh speech: reset silent-restart budget so the learner has the
        // full retry window again for the remainder of the sentence.
        silentRestarts = 0;
        lastSpeechAt = Date.now();
      }
      setTranscript(combined);
    };

    recognition.onspeechstart = () => {
      lastSpeechAt = Date.now();
      silentRestarts = 0;
    };

    recognition.onend = () => {
      setIsListening(false);
      // Preserve whatever this session captured before restarting, so the
      // next onresult can prepend it to the fresh results array.
      if (accumulatedTranscriptRef.current) {
        committedFromPriorSessions = accumulatedTranscriptRef.current;
      }
      // Only grade if user manually stopped OR a hard error occurred
      if (manualStopRef.current || hadError) {
        if (accumulatedTranscriptRef.current) {
          setTranscript(accumulatedTranscriptRef.current);
        }
        setIsRecording(false);
        return;
      }
      // Apple WebKit: single-shot session, so an auto end means the utterance
      // is finished. Commit it and grade instead of restarting.
      if (isAppleWebkit) {
        if (accumulatedTranscriptRef.current) setTranscript(accumulatedTranscriptRef.current);
        setIsRecording(false);
        return;
      }
      // Hard 60s ceiling: never leave the mic open indefinitely.
      if (Date.now() - recordStartedAtRef.current > 60000) {
        if (accumulatedTranscriptRef.current) setTranscript(accumulatedTranscriptRef.current);
        setIsRecording(false);
        return;
      }
      // Auto-ended (silence). Give up only after many *consecutive* silent
      // restarts with no fresh speech, OR after a hard wall-clock ceiling.
      // Consecutive silent onend cycles usually fire ~1s apart on Chrome,
      // so ~15 restarts is roughly 15s of true silence before we stop.
      const totalSilentMs = Date.now() - lastSpeechAt;
      if (silentRestarts >= 15 && totalSilentMs > 12000) {
        if (accumulatedTranscriptRef.current) setTranscript(accumulatedTranscriptRef.current);
        setIsRecording(false);
        return;
      }
      silentRestarts += 1;
      restartAttempts += 1;
      try { recognition.start(); } catch { setIsRecording(false); }
    };

    recognition.onerror = (event: any) => {
      const err = event?.error;
      // "aborted" is almost always benign: it fires when we call .abort()
      // (navigation, re-init, unmount) or when the browser preempts the
      // session. Suppress it silently — surfacing it as a red error confuses
      // students who see it after tapping Stop or switching sentence.
      if (err === "aborted") {
        setIsListening(false);
        return;
      }
      // "no-speech" is soft: if we already captured something, keep it;
      // otherwise show a friendly hint. Do NOT terminate the recording — let
      // onend decide whether to retry.
      if (err === "no-speech") {
        if (!accumulatedTranscriptRef.current) {
          setMicError(t("Chưa nghe được. Em nói to hơn hoặc lại gần mic nhé.", "Didn't catch that. Speak a bit louder or move closer to the mic."));
        }
        return;
      }
      hadError = true;
      setIsRecording(false);
      setIsListening(false);
      if (err === "not-allowed" || err === "service-not-allowed") {
        setMicError(t("Vui lòng cho phép truy cập microphone trong cài đặt trình duyệt.", "Please allow microphone access in your browser settings."));
      } else if (err === "audio-capture") {
        setMicError(t("Không tìm thấy microphone. Kiểm tra thiết bị và thử lại.", "No microphone found. Please check your device and try again."));
      } else if (err === "network") {
        setMicError(t("Mất kết nối tới dịch vụ nhận dạng. Kiểm tra internet rồi thử lại.", "Lost connection to the recognition service. Check your internet and try again."));
      } else {
        setMicError(t("Không thể nhận dạng lúc này. Em thử lại nhé.", "Speech recognition is unavailable right now. Please try again."));
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      // Some browsers throw if start() is called too quickly after abort().
      // Retry once on the next tick.
      setTimeout(() => {
        try { recognition.start(); } catch { setIsRecording(false); }
      }, 120);
    }
  }, [speechSupported, currentSentence, config.speechLang, t, isAppleWebkit, ensureMicrophoneAccess]);

  // Stop recording and process results.
  // We DO NOT flip isRecording=false here - we wait for `onend` so the latest
  // transcript (final or interim) is committed before the grading useEffect runs.
  // Otherwise the effect can fire with a stale/empty transcript and produce 0%.
  const stopRecognition = useCallback(() => {
    manualStopRef.current = true;
    setIsListening(false);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    } else {
      // Fallback if recognition was never started
      setIsRecording(false);
    }
  }, []);

  // Visible listening timer + hard stop at 60s so the mic is never left open.
  useEffect(() => {
    if (!isRecording) return;
    const id = window.setInterval(() => {
      setListenSeconds((s) => {
        const next = s + 1;
        if (next >= 60) stopRecognition();
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [isRecording, stopRecognition]);

  // Release the microphone when the component unmounts. Without this the
  // recognizer keeps auto-restarting after the student navigates away.
  useEffect(() => {
    return () => {
      const rec = recognitionRef.current;
      if (!rec) return;
      manualStopRef.current = true;
      try { rec.onend = null; } catch { /* noop */ }
      try { rec.onerror = null; } catch { /* noop */ }
      try { rec.onresult = null; } catch { /* noop */ }
      try { rec.abort(); } catch { /* noop */ }
      recognitionRef.current = null;
    };
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

        // Log EVERY attempt to admin dashboard so teacher sees real practice frequency
        (async () => {
          try {
            const { logStudentActivity } = await import("@/hooks/useActivityLogger");
            const domain = language === "chinese" ? "chinese" : "english";
            await logStudentActivity({
              activityType: `speaking_coach_${language}`,
              activityId: currentSentence?.id,
              score: Math.round(acc / 10), // 0-10 scale
              maxScore: 10,
              domain,
              metadata: { language, accuracy: acc, themeId: selectedTheme?.id },
            });
          } catch {}
        })();

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

  // Play demo audio (TTS). `slow` gives learners a syllable-by-syllable pace.
  const playDemo = useCallback(async (slow = false) => {
    if (!currentSentence || isPlayingDemo) return;
    setIsPlayingDemo(true);

    try {
      if (language === "japanese") {
        const ok = await playJapaneseTts(currentSentence.text, { playbackRate: slow ? 0.6 : 0.9, speechRate: slow ? 0.6 : 0.85 });
        if (!ok) {
          toast.error(t("Không thể phát âm thanh tiếng Nhật. Hãy thử lại.", "Could not play Japanese audio. Please try again."));
        }
      } else if (language === "finnish") {
        await playFinnishTts(currentSentence.text);
      } else if (language === "swedish") {
        // playSwedishTts resolves false when every engine in the chain fails -
        // without this check the button looked like it worked but stayed silent.
        const ok = await playSwedishTts(currentSentence.text, { playbackRate: slow ? 0.6 : 0.9 });
        if (!ok) {
          toast.error(t("Không thể phát âm thanh tiếng Thụy Điển. Hãy thử lại.", "Could not play Swedish audio. Please try again."));
        }
      } else {
        const utterance = new SpeechSynthesisUtterance(currentSentence.text);
        utterance.lang = config.speechLang;
        utterance.rate = slow ? 0.6 : 0.85;
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

  // Total sentence count - level filter applies to ALL languages now
  const visibleThemes = useMemo(() => {
    if (levelFilter === "all") return config.themes;
    return config.themes.filter((th) => th.level === levelFilter);
  }, [config.themes, levelFilter]);
  const totalSentences = useMemo(() => visibleThemes.reduce((sum, th) => sum + th.sentences.length, 0), [visibleThemes]);


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

        {/* CEFR level filter (all languages) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">
            {t("Cấp độ", "Level")}:
          </span>
          {(["all", "A1", "A2", "B1", "B2", "C1"] as const).map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(lv)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                levelFilter === lv
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {lv === "all" ? t("Tất cả", "All") : lv}
            </button>
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({visibleThemes.length} {t("chủ đề", "themes")} · {totalSentences} {t("câu", "sentences")})
          </span>
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
          {visibleThemes.map((theme) => {
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
                                      {language === "chinese" ? "Pinyin" : language === "japanese" ? "Romaji" : "IPA"}
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

                  {/* Translation: VI when UI is Vietnamese, EN when UI is English */}
                  <p className="text-sm text-muted-foreground italic">
                    {language === "swedish"
                      ? t(currentSentence.translation, swedishSentenceEn(currentSentence.id) || currentSentence.translation)
                      : currentSentence.translation}
                  </p>


                  {/* IPA / Pinyin + Swedish pronunciation coaching */}
                  {(() => {
                    const ipa = currentSentence.ipa
                      || (language === "swedish" ? transcribeSwedishSentence(currentSentence.text) : "");
                    const tips = language === "swedish"
                      ? swedishSoundTipsFor(currentSentence.text, 2)
                      : language === "japanese"
                        ? japaneseSoundTipsFor(currentSentence.text, 2)
                        : [];
                    if (!ipa && tips.length === 0) return null;
                    return (
                      <div className="space-y-2">
                        {ipa && <p className="text-xs text-primary font-mono break-words">{ipa}</p>}
                        {tips.length > 0 && (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {tips.map((tip) => (
                              <div
                                key={tip.id}
                                className="rounded-xl border border-border bg-muted/40 p-2.5 text-left"
                              >
                                <p className="text-xs font-semibold text-foreground">
                                  {t(tip.labelVi, tip.labelEn)}{" "}
                                  <span className="font-mono text-primary">{tip.symbol}</span>
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                  {t(tip.tipVi, tip.tipEn)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

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

                {/* Recognition tip: all languages need Chrome/Edge + internet;
                    Apple WebKit runs single-shot so the hint differs there. */}
                {speechSupported && (
                  <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl text-xs text-blue-700 dark:text-blue-300">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {isAppleWebkit
                        ? t(
                            `Mẹo: Trên Safari/iOS, mic chỉ ghi 1 lượt mỗi lần bấm — nói cả câu rồi bấm Dừng. Để chính xác nhất, dùng Chrome/Edge trên máy tính.`,
                            `Tip: On Safari/iOS the mic records one take per tap - say the whole sentence, then tap Stop. For best accuracy use Chrome/Edge on desktop.`
                          )
                        : t(
                            `Mẹo: Nhận dạng ${config.speechLang} hoạt động tốt nhất trên Chrome/Edge (máy tính) khi có internet. Nói rõ, gần mic, tránh tiếng ồn. Hệ thống tự bỏ qua khác biệt dấu và dạng viết tắt (I'm / I am) khi chấm.`,
                            `Tip: ${config.speechLang} recognition works best on desktop Chrome/Edge with internet. Speak clearly and close to the mic. Diacritics and contractions (I'm / I am) are auto-tolerated when scoring.`
                          )}
                    </span>
                  </div>
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
                    onClick={() => playDemo(false)}
                    disabled={isPlayingDemo}
                    className="gap-2"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlayingDemo ? "animate-pulse text-primary" : ""}`} />
                    {t("Nghe mẫu", "Listen")}
                  </Button>

                  {/* Slow playback - helps with Swedish sj-/tj- clusters and long vowels */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => playDemo(true)}
                    disabled={isPlayingDemo}
                    className="gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    {t("Nghe chậm", "Slow")}
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
                          {t("Dừng", "Stop")} {listenSeconds > 0 && `· ${listenSeconds}s`}
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
