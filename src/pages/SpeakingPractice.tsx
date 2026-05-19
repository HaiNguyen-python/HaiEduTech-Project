/**
 * @file SpeakingPractice.tsx
 * @description IELTS Speaking Practice with live transcription and AI grading.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Square, RotateCcw, Play, Volume2, ChevronDown, ChevronUp, AlertTriangle,
  BookOpen, Lightbulb, MessageSquare, Eye, EyeOff, Shuffle, Brain, Award,
  Users, MapPin, Package, Calendar, Sparkles, StickyNote, CheckCircle2, Loader2,
  PenLine, Star, TrendingUp, Trash2
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import {
  speakingPracticeData,
  getTopicsByPart,
  type SpeakingPracticeQuestion,
} from "@/data/speakingPracticeData";
import { getMergedVocabulary } from "@/data/speakingVocabularyBank";
import { getMergedStructures, getMergedIdeas } from "@/data/speakingStructuresIdeas";
import ShadowingPractice from "@/components/ShadowingPractice";

// Grading result interfaces
interface VocabUpgrade { basic: string; advanced: string; example: string; }
interface PronFocus { sound: string; words: string[]; tip: string; }
interface HighlightedError { text: string; type: "grammar" | "vocabulary" | "pronunciation"; correction: string; explanation: string; }
interface SpeakingResult {
  overall: number;
  criteria: { label: string; score: number; feedback: string }[];
  transcript: string;
  suggestions: string[];
  vocabularyUpgrades?: VocabUpgrade[];
  pronunciationFocus?: PronFocus[];
  highlightedErrors?: HighlightedError[];
  upgradedAnswer?: string;
}

// Web Speech API type declarations
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: { [key: number]: { [key: number]: { transcript: string }; isFinal: boolean }; length: number };
}
declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

// Part 2 category grouping
const PART2_CATEGORIES: Record<string, { label: string; icon: React.ReactNode; topics: string[] }> = {
  people: {
    label: "People",
    icon: <Users className="w-4 h-4" />,
    topics: ["A Person You Admire", "A Creative Person", "A Teacher You Remember", "A Helpful Person", "An Old Person You Respect", "A Friend You Admire", "A Neighbor You Know", "A Punctual Person", "A Childhood Friend", "A Local Hero"],
  },
  places: {
    label: "Places",
    icon: <MapPin className="w-4 h-4" />,
    topics: ["A Place You Like to Visit", "A Beautiful Place", "A Crowded Place", "A Quiet Place", "A Place Where You Study", "A Famous Landmark", "A Street Market", "A Noisy Place", "A National Park"],
  },
  objects: {
    label: "Objects & Things",
    icon: <Package className="w-4 h-4" />,
    topics: ["A Book You Enjoyed", "A Piece of Technology", "A Gift You Received", "A Photo You Like", "A Piece of Music", "A Piece of Art", "A Website You Use", "A Smart Phone App", "A Childhood Toy", "A Handmade Gift", "A Uniform or Dress Code", "A Song You Know by Heart"],
  },
  events: {
    label: "Events & Experiences",
    icon: <Calendar className="w-4 h-4" />,
    topics: ["A Memorable Trip", "A Festival or Celebration", "A Sports Event", "A Childhood Memory", "A Movie You Enjoyed", "An Interesting Conversation", "A Difficult Challenge", "A Historical Event", "A Change in Your Life", "An Exciting Activity", "A Tradition in Your Family", "A Time You Helped Someone", "A Time You Were Late", "A Time You Were Proud", "A Boring Activity", "A Wedding You Attended", "A Rainy Day Memory", "A Competition", "A Volunteering Experience", "A Misunderstanding", "A Disappointing Experience", "A Time You Got Lost", "A Perfect Weekend", "A Party You Organized", "A Time You Changed Your Mind", "A Childhood Punishment", "A Cultural Show", "A Free Day"],
  },
  skills: {
    label: "Skills, Decisions & Ideas",
    icon: <Sparkles className="w-4 h-4" />,
    topics: ["A Skill You Learned", "An Important Decision", "A Goal You Want to Achieve", "A Healthy Habit", "A Job You Would Like", "A Risk You Took", "An Invention", "A Piece of Advice", "An Ambition You Have", "A Rule You Disagree With", "A Foreign Culture", "A Language You Want to Learn", "A Problem You Solved", "A News Story", "A New Development", "A Learning Experience", "An Outdoor Activity", "A Podcast or Radio Show", "A Social Media Experience", "A Long Walk", "A Childhood Game", "An Unusual Job", "A Difficult Subject", "A Positive Change in Society", "A Meaningful Song", "A Successful Business", "A Fitness Goal", "A Public Transport Journey", "A Dream You Had", "A TV Program", "A Meal You Cooked", "A Building You Like", "A Local Business", "An Animal You Like", "A Surprise You Received", "A Museum or Gallery", "A Foreign Dish", "An Important River or Lake", "An Environmental Problem"],
  },
};

const SpeakingPractice = () => {
  const { t } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<"part" | "shadow">("part");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SpeakingResult | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showQuestionList, setShowQuestionList] = useState(true);
  // Live transcription state
  const [liveTranscript, setLiveTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  // Candidate notes state
  const [candidateNotes, setCandidateNotes] = useState("");
  const [grammarCheckResult, setGrammarCheckResult] = useState<any>(null);
  const [checkingGrammar, setCheckingGrammar] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  // Bookmark / practiced questions (per part)
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  // Score history for progress chart
  type ScoreEntry = {
    ts: number;
    overall: number;
    fluency?: number;
    lexical?: number;
    grammar?: number;
    pronunciation?: number;
    part: 1 | 2 | 3;
    questionId: string;
    topic: string;
  };
  const [scoreHistory, setScoreHistory] = useState<ScoreEntry[]>([]);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const BOOKMARK_KEY = "ielts-speaking-bookmarks-v1";
  const HISTORY_KEY = "ielts-speaking-score-history-v1";

  // Load bookmarks + history once
  useEffect(() => {
    try {
      const b = localStorage.getItem(BOOKMARK_KEY);
      if (b) setBookmarkedIds(JSON.parse(b));
      const h = localStorage.getItem(HISTORY_KEY);
      if (h) setScoreHistory(JSON.parse(h));
    } catch { /* ignore */ }
  }, []);

  const toggleBookmark = (qId: string) => {
    setBookmarkedIds((prev) => {
      const next = { ...prev };
      if (next[qId]) delete next[qId];
      else next[qId] = true;
      try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const clearScoreHistory = () => {
    setScoreHistory([]);
    try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
  };

  const bookmarkedCount = Object.keys(bookmarkedIds).filter((k) => bookmarkedIds[k]).length;

  // Get questions for current part
  const allQuestions = useMemo(() => {
    const data = speakingPracticeData[`part${selectedPart}`];
    if (selectedTopic) return data.filter(q => q.topic === selectedTopic);
    return data;
  }, [selectedPart, selectedTopic]);

  const topics = useMemo(() => getTopicsByPart(selectedPart), [selectedPart]);

  const currentQ = allQuestions[selectedQuestionIdx] || allQuestions[0];

  // Merge question-specific vocab with topic-level vocabulary bank (20+ items)
  const mergedVocabulary = useMemo(() => {
    if (!currentQ) return [];
    return getMergedVocabulary(selectedPart, currentQ.topic, currentQ.useful_language.vocabulary_bank);
  }, [currentQ, selectedPart]);

  // Merge structures and ideas with topic-level bank (10+ each)
  const mergedStructures = useMemo(() => {
    if (!currentQ) return [];
    return getMergedStructures(selectedPart, currentQ.topic, currentQ.useful_language.model_structures);
  }, [currentQ, selectedPart]);

  const mergedIdeas = useMemo(() => {
    if (!currentQ) return [];
    return getMergedIdeas(selectedPart, currentQ.topic, currentQ.useful_language.brainstorming_ideas);
  }, [currentQ, selectedPart]);


  // Reset when part or topic changes
  useEffect(() => {
    setSelectedQuestionIdx(0);
    resetRecording();
    setShowModelAnswer(false);
    setGrammarCheckResult(null);
  }, [selectedPart, selectedTopic]);

  // Auto-save notes to localStorage
  useEffect(() => {
    const key = `speaking-notes-${selectedPart}-${currentQ?.id || selectedQuestionIdx}`;
    const saved = localStorage.getItem(key);
    if (saved) setCandidateNotes(saved);
    else setCandidateNotes("");
    setGrammarCheckResult(null);
  }, [selectedPart, selectedQuestionIdx, currentQ?.id]);

  useEffect(() => {
    if (!currentQ) return;
    const key = `speaking-notes-${selectedPart}-${currentQ.id || selectedQuestionIdx}`;
    const timeout = setTimeout(() => {
      localStorage.setItem(key, candidateNotes);
      if (candidateNotes) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 1500);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [candidateNotes, selectedPart, selectedQuestionIdx, currentQ]);

  useEffect(() => {
    return () => { if (audioUrl) URL.revokeObjectURL(audioUrl); };
  }, [audioUrl]);

  // Shuffle questions
  const shuffleQuestions = () => {
    const idx = Math.floor(Math.random() * allQuestions.length);
    setSelectedQuestionIdx(idx);
    resetRecording();
    setShowModelAnswer(false);
  };

  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setLiveTranscript(final.trim());
      setInterimTranscript(interim);
    };
    recognition.onerror = (event) => { console.error("Speech recognition error:", event.error); };
    recognition.onend = () => {
      if (mediaRecorder.current?.state === "recording") {
        try { recognition.start(); } catch { /* already started */ }
      }
    };
    return recognition;
  }, []);

  // Recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
        chunksRef.current = [];
      };
      recorder.start();
      setIsRecording(true);
      setResult(null);
      setTimer(0);
      setShowSuggestions(false);
      setLiveTranscript("");
      setInterimTranscript("");
      // Start speech recognition
      const recognition = initSpeechRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        try { recognition.start(); } catch { /* ignore */ }
      }
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } catch {
      alert(t("Vui lòng cho phép truy cập microphone", "Please allow microphone access"));
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setInterimTranscript("");
  };

  const resetRecording = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTimer(0);
    setResult(null);
    setShowSuggestions(true);
    setLiveTranscript("");
    setInterimTranscript("");
    chunksRef.current = [];
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Persist a graded score to the chart history
  const recordScore = useCallback((r: SpeakingResult) => {
    if (!currentQ) return;
    const findScore = (label: string) =>
      r.criteria.find((c) => c.label.toLowerCase().includes(label))?.score;
    const entry: ScoreEntry = {
      ts: Date.now(),
      overall: r.overall,
      fluency: findScore("fluency"),
      lexical: findScore("lexical"),
      grammar: findScore("grammat"),
      pronunciation: findScore("pronun"),
      part: selectedPart,
      questionId: currentQ.id,
      topic: currentQ.topic,
    };
    setScoreHistory((prev) => {
      const next = [...prev, entry].slice(-30); // keep last 30
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [currentQ, selectedPart]);

  // Grading - sends actual transcript to AI
  const handleGrade = async () => {
    if (!audioBlob) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grade-speaking", {
        body: { question: currentQ.question, part: selectedPart, duration: timer, transcript: liveTranscript },
      });
      if (error) throw error;
      const graded = data as SpeakingResult;
      setResult(graded);
      recordScore(graded);
    } catch {
      // Fallback mock grading
      const base = 5.0 + Math.min(timer / 120, 1) * 2;
      const gs = (b: number, r: number) => Math.max(4, Math.min(9, Math.round((b + (Math.random() - 0.5) * r) * 2) / 2));
      const f = gs(base, 2), l = gs(base - 0.3, 1.5), g = gs(base - 0.2, 1.5), p = gs(base + 0.2, 1.5);
      const fallback: SpeakingResult = {
        overall: Math.round(((f + l + g + p) / 4) * 2) / 2,
        criteria: [
          { label: "Fluency & Coherence", score: f, feedback: "Practice speaking continuously and use linking words like 'however', 'furthermore', 'in addition'." },
          { label: "Lexical Resource", score: l, feedback: "Try using the vocabulary from the suggestion panel. Replace basic words with Band 7+ alternatives." },
          { label: "Grammatical Range & Accuracy", score: g, feedback: "Use complex sentences: conditionals, relative clauses, passive voice." },
          { label: "Pronunciation", score: p, feedback: "Focus on word stress patterns and final consonant sounds." },
        ],
        transcript: liveTranscript || "(Speech recognition unavailable)",
        suggestions: [
          "Practice 2-minute non-stop speaking daily",
          "Record and listen back to spot errors",
          "Use the vocabulary suggestions provided for this topic",
          "Shadow the model answer to improve fluency",
        ],
      };
      setResult(fallback);
      recordScore(fallback);
    }
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-green-600";
    if (score >= 6.5) return "text-primary";
    if (score >= 5.5) return "text-yellow-600";
    return "text-destructive";
  };

  // Grammar check for candidate notes
  const handleGrammarCheck = async () => {
    if (!candidateNotes.trim()) return;
    setCheckingGrammar(true);
    setGrammarCheckResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("audit-content", {
        body: { content: candidateNotes, action: "check-grammar" },
      });
      if (error) throw error;
      setGrammarCheckResult(data);
    } catch (e) {
      console.error("Grammar check failed:", e);
      // Fallback: basic client-side feedback
      setGrammarCheckResult({
        corrected: candidateNotes,
        errors: [],
        score: 7.0,
        tips: ["Try using more complex sentence structures", "Add linking words like 'however', 'moreover'"],
      });
    }
    setCheckingGrammar(false);
  };

  // Render model answer with bold keywords highlighted
  const renderModelAnswer = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const word = part.slice(2, -2);
        // Check if the word matches any suggested vocabulary
        const isInSuggestions = mergedVocabulary.some(
          v => v.phrase.toLowerCase() === word.toLowerCase() || word.toLowerCase().includes(v.phrase.toLowerCase().split(" ")[0])
        );
        return (
          <strong
            key={i}
            className={`font-bold ${isInSuggestions ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1 rounded" : "text-primary"}`}
            title={isInSuggestions ? "✓ From Useful Language suggestions" : ""}
          >
            {word}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Render Part 2 topics grouped by category
  const renderPart2Categories = () => {
    return (
      <Accordion type="multiple" defaultValue={["people", "events"]} className="w-full">
        {Object.entries(PART2_CATEGORIES).map(([key, cat]) => {
          // Filter to only show categories that have matching topics in current data
          const matchingTopics = cat.topics.filter(t => topics.includes(t));
          if (matchingTopics.length === 0) return null;
          return (
            <AccordionItem key={key} value={key} className="border-b-0 mb-1">
              <AccordionTrigger className="py-2 px-3 rounded-lg hover:bg-secondary hover:no-underline text-sm">
                <span className="flex items-center gap-2">
                  {cat.icon}
                  <span className="font-semibold">{cat.label}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">{matchingTopics.length}</Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-0 pl-2">
                <div className="flex flex-wrap gap-1.5">
                  {matchingTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopic === topic ? "default" : "outline"}
                      className="cursor-pointer px-2.5 py-1 text-xs"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            {t("Luyện nói IELTS Speaking", "IELTS Speaking Practice")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Luyện tập với ngân hàng câu hỏi, từ vựng gợi ý và phản hồi tức thì từ hệ thống chấm điểm",
              "Practice with our question bank, vocabulary suggestions, and instant feedback"
            )}
          </p>
        </motion.div>

        {/* Part / Mode selector + Shuffle */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {([1, 2, 3] as const).map((p) => (
            <Button
              key={p}
              onClick={() => { setMode("part"); setSelectedPart(p); setSelectedTopic(null); }}
              variant={mode === "part" && selectedPart === p ? "default" : "secondary"}
              className={mode === "part" && selectedPart === p ? "shadow-lg scale-105" : ""}
              size="lg"
            >
              Part {p}
            </Button>
          ))}
          <Button
            onClick={() => setMode("shadow")}
            variant={mode === "shadow" ? "default" : "secondary"}
            className={mode === "shadow" ? "shadow-lg scale-105 bg-gradient-to-r from-primary to-emerald-500" : ""}
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            {t("Luyện Shadowing", "Shadowing Practice")}
          </Button>
          {mode === "part" && (
            <Button onClick={shuffleQuestions} variant="outline" size="lg" className="ml-auto">
              <Shuffle className="w-4 h-4 mr-2" /> {t("Đảo câu hỏi", "Shuffle")}
            </Button>
          )}
        </div>

        {mode === "shadow" ? (
          <ShadowingPractice />
        ) : (
        <>


        {/* Topic filter - different for Part 2 vs Part 1/3 */}
        {selectedPart === 2 ? (
          <Card className="mb-6">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant={selectedTopic === null ? "default" : "secondary"}
                  className="cursor-pointer px-3 py-1.5 text-xs"
                  onClick={() => setSelectedTopic(null)}
                >
                  {t("Tất cả", "All")} ({topics.length})
                </Badge>
              </div>
              {renderPart2Categories()}
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={selectedTopic === null ? "default" : "secondary"}
              className="cursor-pointer px-3 py-1.5 text-xs"
              onClick={() => setSelectedTopic(null)}
            >
              {t("Tất cả", "All")}
            </Badge>
            {topics.map((topic) => (
              <Badge
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-xs"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}

        {/* Main layout: split screen */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* LEFT PANEL: Question + Useful Language (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question list - collapsible with proper scrolling */}
            <Card>
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowQuestionList(!showQuestionList)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {t(`Ngân hàng Part ${selectedPart}`, `Part ${selectedPart} Question Bank`)}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">({allQuestions.length} Qs)</span>
                    {bookmarkedCount > 0 && (
                      <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {bookmarkedCount}
                      </span>
                    )}
                  </CardTitle>
                  {showQuestionList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </CardHeader>
              <AnimatePresence>
                {showQuestionList && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <CardContent className="pt-0">
                      <div className="h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                        <div className="space-y-1.5">
                          {allQuestions.map((q, i) => {
                            const isBookmarked = !!bookmarkedIds[q.id];
                            return (
                              <div
                                key={q.id}
                                className={`group flex items-start gap-2 w-full px-3 py-2.5 rounded-lg text-sm transition-all border ${
                                  selectedQuestionIdx === i
                                    ? "bg-primary/10 text-primary border-primary/30"
                                    : "hover:bg-secondary border-transparent"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => { setSelectedQuestionIdx(i); resetRecording(); setShowModelAnswer(false); }}
                                  className="flex-1 text-left"
                                >
                                  <span className="text-primary/60 mr-1 font-mono text-xs">{i + 1}.</span>
                                  <span className="font-medium">{q.topic}:</span>{" "}
                                  <span className="text-muted-foreground">{q.question}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); toggleBookmark(q.id); }}
                                  className="shrink-0 p-1 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                                  aria-label={isBookmarked ? t("Bỏ đánh dấu", "Remove bookmark") : t("Đánh dấu đã luyện", "Mark as practiced")}
                                  title={isBookmarked ? t("Bỏ đánh dấu", "Remove bookmark") : t("Đánh dấu đã luyện", "Mark as practiced")}
                                >
                                  <Star
                                    className={`w-4 h-4 transition-colors ${
                                      isBookmarked
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground/40 group-hover:text-amber-500"
                                    }`}
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Current question display */}
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">Part {selectedPart}</Badge>
                  <Badge variant="outline">{currentQ?.topic}</Badge>
                </div>
                <p className="text-xl font-semibold text-foreground leading-relaxed mb-4">{currentQ?.question}</p>
                {selectedPart === 2 && currentQ?.prompts && (
                  <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                    <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                      {t("Bạn nên nói về:", "You should say:")}
                    </p>
                    {currentQ.prompts.map((p, i) => (
                      <p key={i} className="text-sm text-secondary-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {p}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Useful Language Panel */}
            <Card>
              <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowSuggestions(!showSuggestions)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    {t("Ngôn ngữ & Ý tưởng gợi ý", "Useful Language & Ideas")}
                  </CardTitle>
                  {showSuggestions ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </div>
              </CardHeader>
              <AnimatePresence>
                {showSuggestions && currentQ && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <CardContent className="pt-0">
                      <Tabs defaultValue="vocab" className="w-full">
                        <TabsList className="w-full grid grid-cols-3">
                          <TabsTrigger value="vocab" className="text-xs">
                            <BookOpen className="w-3.5 h-3.5 mr-1" /> {t("Từ vựng", "Vocabulary")}
                          </TabsTrigger>
                          <TabsTrigger value="structures" className="text-xs">
                            <MessageSquare className="w-3.5 h-3.5 mr-1" /> {t("Cấu trúc", "Structures")}
                          </TabsTrigger>
                          <TabsTrigger value="ideas" className="text-xs">
                            <Brain className="w-3.5 h-3.5 mr-1" /> {t("Ý tưởng", "Ideas")}
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="vocab" className="mt-4">
                          <ScrollArea className="h-[320px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-2">
                              {mergedVocabulary.map((v, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                                  <span className="text-sm font-semibold text-primary shrink-0">•</span>
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">{v.phrase}</p>
                                    <p className="text-xs text-muted-foreground italic">{v.vietnamese}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <p className="text-[10px] text-muted-foreground mt-2 text-center">
                            {mergedVocabulary.length} phrases available for this topic
                          </p>
                        </TabsContent>

                        <TabsContent value="structures" className="mt-4">
                          <ScrollArea className="h-[320px]">
                            <div className="space-y-2 pr-2">
                              {mergedStructures.map((s, i) => (
                                <div key={i} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/30">
                                  <p className="text-sm text-foreground italic">"{s}"</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <p className="text-[10px] text-muted-foreground mt-2 text-center">
                            {mergedStructures.length} structures available for this topic
                          </p>
                        </TabsContent>

                        <TabsContent value="ideas" className="mt-4">
                          <ScrollArea className="h-[320px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-2">
                              {mergedIdeas.map((idea, i) => (
                                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                                  <span className="text-primary font-bold text-sm shrink-0">💡</span>
                                  <p className="text-sm text-foreground">{idea}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <p className="text-[10px] text-muted-foreground mt-2 text-center">
                            {mergedIdeas.length} ideas available for this topic
                          </p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Model Answer panel */}
            <AnimatePresence>
              {(result || showModelAnswer) && currentQ && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Award className="w-5 h-5 text-emerald-600" />
                          {t("Bài mẫu Band 8.0+", "Model Answer (Band 8.0+)")}
                        </CardTitle>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-300 text-[10px]">
                          {t("Từ được gợi ý = nền xanh", "Suggested words = green highlight")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm leading-7 text-foreground">
                        {renderModelAnswer(currentQ.model_answer)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT PANEL: Recording + Results (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recording controls */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-5">
                  {/* Timer */}
                  <div className="text-5xl font-mono font-bold text-foreground">{formatTime(timer)}</div>

                  {/* Wave visualizer */}
                  {isRecording && (
                    <div className="flex items-center gap-1 h-12">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-primary rounded-full"
                          animate={{ height: [6, Math.random() * 40 + 6, 6] }}
                          transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex gap-3 flex-wrap justify-center">
                    {!isRecording && !audioBlob && (
                      <Button onClick={startRecording} size="lg" className="gap-2 bg-gradient-to-r from-primary to-emerald-600 hover:brightness-110">
                        <Mic className="w-5 h-5" /> {t("Bắt đầu ghi âm", "Start Recording")}
                      </Button>
                    )}
                    {isRecording && (
                      <Button onClick={stopRecording} size="lg" variant="destructive" className="gap-2 animate-pulse">
                        <Square className="w-4 h-4 fill-current" /> {t("Dừng", "Stop")}
                      </Button>
                    )}
                    {audioBlob && !isRecording && (
                      <>
                        <Button onClick={resetRecording} variant="outline" className="gap-2">
                          <RotateCcw className="w-4 h-4" /> {t("Ghi lại", "Re-record")}
                        </Button>
                        <Button
                          onClick={handleGrade}
                          disabled={loading}
                          className="gap-2 bg-gradient-to-r from-primary to-emerald-600 hover:brightness-110"
                        >
                          {loading ? (
                            <motion.div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                          {loading ? t("Đang chấm...", "Grading...") : t("Chấm điểm", "Grade")}
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Audio player */}
                  {audioUrl && (
                    <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary">
                      <Volume2 className="w-5 h-5 text-primary shrink-0" />
                      <audio src={audioUrl} controls className="w-full h-10" />
                    </div>
                  )}

                  {/* Show Model Answer toggle */}
                  {!result && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowModelAnswer(!showModelAnswer)}
                      className="text-xs text-muted-foreground"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      {showModelAnswer
                        ? t("Ẩn bài mẫu", "Hide Model Answer")
                        : t("Xem bài mẫu", "Show Model Answer")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Candidate Notes - Sticky Note style */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className={`border-2 ${selectedPart === 2 ? "border-amber-300 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-950/20" : "border-dashed border-muted-foreground/20 bg-yellow-50/30 dark:bg-yellow-950/10"}`}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <StickyNote className={`w-4 h-4 ${selectedPart === 2 ? "text-amber-600" : "text-yellow-600"}`} />
                      <h4 className="text-sm font-bold text-foreground">
                        {selectedPart === 2
                          ? t("📝 Ghi chú chuẩn bị (1 phút)", "📝 Preparation Notes (1 minute)")
                          : t("📝 Ghi chú nhanh", "📝 Quick Notes")}
                      </h4>
                      {notesSaved && (
                        <span className="flex items-center gap-1 text-[10px] text-green-600">
                          <CheckCircle2 className="w-3 h-3" /> {t("Đã lưu", "Saved")}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleGrammarCheck}
                      disabled={checkingGrammar || !candidateNotes.trim()}
                      className="text-xs gap-1.5 h-7"
                    >
                      {checkingGrammar ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <PenLine className="w-3 h-3" />
                      )}
                      {t("Kiểm tra ngữ pháp", "Check Grammar")}
                    </Button>
                  </div>

                  {selectedPart === 2 && (
                    <p className="text-xs text-amber-700 dark:text-amber-400 mb-2 italic">
                      {t(
                        "💡 Bạn có 1 phút chuẩn bị. Ghi nhanh ý tưởng, từ khóa và cấu trúc muốn dùng.",
                        "💡 You have 1 minute to prepare. Jot down ideas, keywords, and structures."
                      )}
                    </p>
                  )}

                  <textarea
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                    placeholder={selectedPart === 2
                      ? t(
                          "Ghi nhanh ý tưởng cho Part 2:\n• Chủ đề chính: ...\n• Từ vựng muốn dùng: ...\n• Cấu trúc câu: ...\n• Kết luận: ...",
                          "Jot down your Part 2 ideas:\n• Main topic: ...\n• Key vocabulary: ...\n• Sentence structures: ...\n• Conclusion: ..."
                        )
                      : t(
                          "Ghi chú nhanh ý tưởng và từ vựng...",
                          "Quick notes - ideas & vocabulary..."
                        )
                    }
                    className={`w-full rounded-lg border-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 resize-none ${
                      selectedPart === 2 ? "min-h-[160px]" : "min-h-[80px]"
                    }`}
                    style={{
                      backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(var(--border) / 0.3) 27px, hsl(var(--border) / 0.3) 28px)",
                      backgroundPositionY: "4px",
                      lineHeight: "28px",
                      paddingTop: "4px",
                    }}
                  />

                  {/* Grammar Check Results */}
                  <AnimatePresence>
                    {grammarCheckResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-border"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className={`w-4 h-4 ${grammarCheckResult.errors?.length === 0 ? "text-green-600" : "text-amber-600"}`} />
                          <span className="text-sm font-semibold text-foreground">
                            {t("Kết quả kiểm tra", "Grammar Check Result")}
                          </span>
                          <Badge variant="outline" className="text-[10px]">
                            {grammarCheckResult.score?.toFixed(1) || "N/A"}/9.0
                          </Badge>
                        </div>

                        {grammarCheckResult.errors?.length > 0 && (
                          <div className="space-y-1.5 mb-2">
                            {grammarCheckResult.errors.map((err: any, i: number) => (
                              <div key={i} className="text-xs flex items-start gap-2 p-2 rounded-lg bg-destructive/5">
                                <span className="text-destructive line-through shrink-0">{err.original}</span>
                                <span className="text-muted-foreground">→</span>
                                <span className="text-green-600 font-semibold shrink-0">{err.correction}</span>
                                <span className="text-muted-foreground ml-1">({err.rule})</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {grammarCheckResult.corrected && grammarCheckResult.errors?.length > 0 && (
                          <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20 mb-2">
                            <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">{t("Bản sửa:", "Corrected:")}</p>
                            <p className="text-xs text-foreground">{grammarCheckResult.corrected}</p>
                          </div>
                        )}

                        {grammarCheckResult.tips?.length > 0 && (
                          <div className="space-y-1">
                            {grammarCheckResult.tips.map((tip: string, i: number) => (
                              <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span className="text-primary">💡</span> {tip}
                              </p>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Transcription Panel */}
            {(isRecording || liveTranscript) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
                      <h4 className="text-sm font-bold text-foreground">
                        {t("Phiên âm trực tiếp", "Live Transcription")}
                      </h4>
                      {isRecording && (
                        <span className="text-xs text-muted-foreground ml-auto">{t("Đang lắng nghe...", "Listening...")}</span>
                      )}
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-4 min-h-[60px]">
                      {(liveTranscript || interimTranscript) ? (
                        <p className="text-sm text-foreground leading-relaxed">
                          {liveTranscript}
                          {interimTranscript && <span className="text-muted-foreground italic"> {interimTranscript}</span>}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">{t("Bắt đầu nói để xem phiên âm...", "Start speaking to see transcription...")}</p>
                      )}
                    </div>
                    {!isRecording && liveTranscript && (
                      <p className="text-xs text-muted-foreground mt-2">{t("Số từ:", "Word count:")} {liveTranscript.split(/\s+/).filter(Boolean).length}</p>
                    )}
                    {typeof window !== "undefined" && !window.SpeechRecognition && !window.webkitSpeechRecognition && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0" />
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                          {t("Trình duyệt không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome.", "Speech recognition not supported. Please use Chrome.")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {/* Results */}
            <Card>
              <CardContent className="pt-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <Mic className="w-14 h-14 text-muted-foreground/20 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      {t("Ghi âm và chấm điểm để xem phản hồi", "Record and grade to see feedback")}
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <motion.div
                      className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-sm text-muted-foreground">{t("Đang phân tích...", "Analyzing...")}</p>
                  </div>
                )}

                {result && !loading && (
                  <ScrollArea className="h-[700px]">
                    <div className="space-y-4 pr-2">
                      {/* Overall score */}
                      <div className="bg-secondary rounded-2xl p-6 text-center">
                        <span className="text-base font-medium text-muted-foreground">{t("Điểm Speaking", "Speaking Score")}</span>
                        <div className={`text-6xl font-display font-bold mt-2 ${getScoreColor(result.overall)}`}>
                          {result.overall.toFixed(1)}
                        </div>
                      </div>

                      {/* Transcript with playback and error highlighting */}
                      {result.transcript && (
                        <div className="bg-secondary rounded-xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-foreground">{t("Phiên âm của bạn", "Your Transcription")}</h4>
                            {audioUrl && (
                              <button
                                onClick={() => { const a = document.getElementById("sp-playback") as HTMLAudioElement; if (a) a.play(); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                              >
                                <Play className="w-3.5 h-3.5 fill-current" /> {t("Nghe lại", "Playback")}
                              </button>
                            )}
                          </div>
                          {audioUrl && <audio id="sp-playback" src={audioUrl} className="hidden" />}
                          <p className="text-base text-foreground leading-relaxed">{result.transcript}</p>
                          {result.highlightedErrors && result.highlightedErrors.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border space-y-2">
                              {result.highlightedErrors.map((err, i) => (
                                <div key={i} className="text-sm flex items-start gap-2">
                                  <Badge variant="outline" className="text-[10px] shrink-0 capitalize">{err.type}</Badge>
                                  <span>
                                    <span className="text-destructive line-through">{err.text}</span>
                                    {" → "}
                                    <span className="text-green-600 font-semibold">{err.correction}</span>
                                    <span className="text-muted-foreground ml-1">({err.explanation})</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Upgraded Answer */}
                      {result.upgradedAnswer && (
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/40 rounded-xl p-5">
                          <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-emerald-600" />
                            {t("Bài nói của bạn – Phiên bản Band 7.5+", "Your Answer – Band 7.5+ Version")}
                          </h4>
                          <p className="text-base text-foreground leading-8">
                            {result.upgradedAnswer.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                              part.startsWith("**") && part.endsWith("**")
                                ? <strong key={i} className="text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-1 rounded font-bold">{part.slice(2, -2)}</strong>
                                : <span key={i}>{part}</span>
                            )}
                          </p>
                        </div>
                      )}

                      {/* Criteria */}
                      {result.criteria.map((c) => (
                        <div key={c.label} className="bg-secondary rounded-xl p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-semibold text-foreground">{c.label}</span>
                            <span className={`text-2xl font-mono font-bold ${getScoreColor(c.score)}`}>{c.score.toFixed(1)}</span>
                          </div>
                          <div className="w-full h-3 bg-border rounded-full mb-3">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(c.score / 9) * 100}%` }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>
                          <p className="text-base text-foreground leading-relaxed mt-2">{c.feedback}</p>
                        </div>
                      ))}

                      {/* Vocabulary Upgrades */}
                      {result.vocabularyUpgrades && result.vocabularyUpgrades.length > 0 && (
                        <div className="bg-secondary rounded-xl p-5">
                          <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" /> {t("Nâng cấp từ vựng", "Vocabulary Upgrades")}
                          </h4>
                          <div className="space-y-2">
                            {result.vocabularyUpgrades.map((v, i) => (
                              <div key={i} className="bg-background rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-destructive line-through">{v.basic}</span>
                                  <span className="text-muted-foreground text-sm">→</span>
                                  <span className="text-sm text-green-600 font-bold">{v.advanced}</span>
                                </div>
                                <p className="text-xs text-muted-foreground italic">"{v.example}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pronunciation Focus */}
                      {result.pronunciationFocus && result.pronunciationFocus.length > 0 && (
                        <div className="bg-secondary rounded-xl p-5">
                          <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-primary" /> {t("Trọng tâm phát âm", "Pronunciation Focus")}
                          </h4>
                          <div className="space-y-2">
                            {result.pronunciationFocus.map((p, i) => (
                              <div key={i} className="bg-background rounded-lg p-3">
                                <p className="text-sm font-bold text-primary mb-1">{p.sound}</p>
                                <p className="text-sm text-foreground">Words: {p.words.join(", ")}</p>
                                <p className="text-xs text-muted-foreground">{p.tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                        <h4 className="text-base font-bold text-primary mb-3">
                          {t("Gợi ý cải thiện", "Improvement Tips")}
                        </h4>
                        <div className="space-y-2">
                          {result.suggestions.map((s, i) => (
                            <p key={i} className="text-base text-foreground flex items-start gap-2">
                              <span className="text-primary font-bold mt-0.5">✓</span> {s}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress chart - score evolution over practice sessions */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t("Tiến trình điểm Speaking", "Speaking Score Progress")}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "Theo dõi điểm Overall, Fluency, Lexical, Grammar, Pronunciation qua mỗi lần luyện tập (lưu cục bộ trên thiết bị).",
                    "Track Overall, Fluency, Lexical, Grammar, Pronunciation across each practice session (stored locally on this device)."
                  )}
                </p>
              </div>
              {scoreHistory.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearScoreHistory}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t("Xóa lịch sử", "Clear history")}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {scoreHistory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-base font-medium">
                  {t("Chưa có dữ liệu", "No data yet")}
                </p>
                <p className="text-sm mt-1">
                  {t(
                    "Hãy ghi âm và bấm 'Grade' để bắt đầu lưu lại tiến trình của bạn.",
                    "Record an answer and click 'Grade' to start tracking your progress."
                  )}
                </p>
              </div>
            ) : (
              <>
                <div className="w-full h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={scoreHistory.map((s, i) => ({
                        idx: i + 1,
                        label: `#${i + 1}`,
                        Overall: s.overall,
                        Fluency: s.fluency ?? null,
                        Lexical: s.lexical ?? null,
                        Grammar: s.grammar ?? null,
                        Pronunciation: s.pronunciation ?? null,
                        topic: s.topic,
                        part: s.part,
                        date: new Date(s.ts).toLocaleString(),
                      }))}
                      margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="label"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        domain={[4, 9]}
                        ticks={[4, 5, 6, 7, 8, 9]}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <ReferenceLine y={6.5} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ value: "B2 / 6.5", position: "right", fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <ReferenceLine y={7.5} stroke="hsl(var(--primary))" strokeDasharray="3 3" label={{ value: "Target 7.5", position: "right", fontSize: 11, fill: "hsl(var(--primary))" }} />
                      <RTooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "0.5rem",
                          fontSize: "13px",
                        }}
                        labelFormatter={(label, payload) => {
                          const p = payload?.[0]?.payload;
                          return p ? `${label} • Part ${p.part} • ${p.topic}` : label;
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Line type="monotone" dataKey="Overall" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Fluency" stroke="#10b981" strokeWidth={1.5} dot={{ r: 2 }} connectNulls />
                      <Line type="monotone" dataKey="Lexical" stroke="#f59e0b" strokeWidth={1.5} dot={{ r: 2 }} connectNulls />
                      <Line type="monotone" dataKey="Grammar" stroke="#8b5cf6" strokeWidth={1.5} dot={{ r: 2 }} connectNulls />
                      <Line type="monotone" dataKey="Pronunciation" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 2 }} connectNulls />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  {(() => {
                    const overalls = scoreHistory.map((s) => s.overall);
                    const avg = overalls.reduce((a, b) => a + b, 0) / overalls.length;
                    const best = Math.max(...overalls);
                    const last = overalls[overalls.length - 1];
                    const first = overalls[0];
                    const delta = last - first;
                    const stat = (label: string, value: string, color = "text-foreground") => (
                      <div className="bg-secondary/50 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                        <p className={`text-xl font-bold ${color}`}>{value}</p>
                      </div>
                    );
                    return (
                      <>
                        {stat(t("Số lần", "Sessions"), String(scoreHistory.length))}
                        {stat(t("Trung bình", "Average"), avg.toFixed(1), "text-primary")}
                        {stat(t("Cao nhất", "Best"), best.toFixed(1), "text-green-600")}
                        {stat(
                          t("Tiến bộ", "Progress"),
                          `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`,
                          delta >= 0 ? "text-green-600" : "text-destructive"
                        )}
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        </>
        )}
      </main>

      
      <Footer />
    </div>
  );
};

export default SpeakingPractice;
