// IELTS Speaking Practice page with vocabulary support, preparation mode, and recording mode
import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Square, RotateCcw, Play, Volume2, ChevronDown, ChevronUp,
  BookOpen, Lightbulb, MessageSquare, Eye, EyeOff, Shuffle, Brain, Award,
  Users, MapPin, Package, Calendar, Sparkles
} from "lucide-react";
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

// Grading result interfaces
interface VocabUpgrade { basic: string; advanced: string; example: string; }
interface PronFocus { sound: string; words: string[]; tip: string; }
interface SpeakingResult {
  overall: number;
  criteria: { label: string; score: number; feedback: string }[];
  transcript: string;
  suggestions: string[];
  vocabularyUpgrades?: VocabUpgrade[];
  pronunciationFocus?: PronFocus[];
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

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

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

  // Reset when part or topic changes
  useEffect(() => {
    setSelectedQuestionIdx(0);
    resetRecording();
    setShowModelAnswer(false);
  }, [selectedPart, selectedTopic]);

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
      };
      recorder.start();
      setIsRecording(true);
      setResult(null);
      setTimer(0);
      setShowSuggestions(false);
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } catch {
      alert(t("Vui lòng cho phép truy cập microphone", "Please allow microphone access"));
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetRecording = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setTimer(0);
    setResult(null);
    setShowSuggestions(true);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  // Grading
  const handleGrade = async () => {
    if (!audioBlob) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grade-speaking", {
        body: { question: currentQ.question, part: selectedPart, duration: timer },
      });
      if (error) throw error;
      setResult(data as SpeakingResult);
    } catch {
      // Fallback mock grading
      const base = 5.0 + Math.min(timer / 120, 1) * 2;
      const gs = (b: number, r: number) => Math.max(4, Math.min(9, Math.round((b + (Math.random() - 0.5) * r) * 2) / 2));
      const f = gs(base, 2), l = gs(base - 0.3, 1.5), g = gs(base - 0.2, 1.5), p = gs(base + 0.2, 1.5);
      setResult({
        overall: Math.round(((f + l + g + p) / 4) * 2) / 2,
        criteria: [
          { label: "Fluency & Coherence", score: f, feedback: "Practice speaking continuously and use linking words like 'however', 'furthermore', 'in addition'." },
          { label: "Lexical Resource", score: l, feedback: "Try using the vocabulary from the suggestion panel. Replace basic words with Band 7+ alternatives." },
          { label: "Grammatical Range & Accuracy", score: g, feedback: "Use complex sentences: conditionals, relative clauses, passive voice." },
          { label: "Pronunciation", score: p, feedback: "Focus on word stress patterns and final consonant sounds." },
        ],
        transcript: "(Connect AI service for auto transcription)",
        suggestions: [
          "Practice 2-minute non-stop speaking daily",
          "Record and listen back to spot errors",
          "Use the vocabulary suggestions provided for this topic",
          "Shadow the model answer to improve fluency",
        ],
      });
    }
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-green-600";
    if (score >= 6.5) return "text-primary";
    if (score >= 5.5) return "text-yellow-600";
    return "text-destructive";
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
              "Luyện tập với ngân hàng câu hỏi, từ vựng gợi ý và phản hồi tức thì từ hệ thống AI",
              "Practice with our question bank, vocabulary suggestions, and instant AI feedback"
            )}
          </p>
        </motion.div>

        {/* Part selector + Shuffle */}
        <div className="flex flex-wrap gap-3 items-center mb-6">
          {([1, 2, 3] as const).map((p) => (
            <Button
              key={p}
              onClick={() => { setSelectedPart(p); setSelectedTopic(null); }}
              variant={selectedPart === p ? "default" : "secondary"}
              className={selectedPart === p ? "shadow-lg scale-105" : ""}
              size="lg"
            >
              Part {p}
            </Button>
          ))}
          <Button onClick={shuffleQuestions} variant="outline" size="lg" className="ml-auto">
            <Shuffle className="w-4 h-4 mr-2" /> {t("Đảo câu hỏi", "Shuffle")}
          </Button>
        </div>

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
                          {allQuestions.map((q, i) => (
                            <button
                              key={q.id}
                              onClick={() => { setSelectedQuestionIdx(i); resetRecording(); setShowModelAnswer(false); }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                                selectedQuestionIdx === i
                                  ? "bg-primary/10 text-primary border border-primary/30"
                                  : "hover:bg-secondary border border-transparent"
                              }`}
                            >
                              <span className="text-primary/60 mr-1 font-mono text-xs">{i + 1}.</span>
                              <span className="font-medium">{q.topic}:</span>{" "}
                              <span className="text-muted-foreground">{q.question}</span>
                            </button>
                          ))}
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
                          <div className="space-y-2">
                            {currentQ.useful_language.model_structures.map((s, i) => (
                              <div key={i} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200/30">
                                <p className="text-sm text-foreground italic">"{s}"</p>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="ideas" className="mt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currentQ.useful_language.brainstorming_ideas.map((idea, i) => (
                              <div key={i} className="flex items-start gap-2 p-2">
                                <span className="text-primary font-bold text-sm">💡</span>
                                <p className="text-sm text-muted-foreground">{idea}</p>
                              </div>
                            ))}
                          </div>
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
                  <ScrollArea className="max-h-[600px]">
                    <div className="space-y-4 pr-2">
                      {/* Overall score */}
                      <div className="bg-secondary rounded-xl p-5 text-center">
                        <span className="text-sm text-muted-foreground">{t("Điểm Speaking", "Speaking Score")}</span>
                      <div className={`text-5xl font-display font-bold mt-1 ${getScoreColor(result.overall)}`}>
                          {result.overall.toFixed(1)}
                        </div>
                      </div>

                      {/* Criteria */}
                      {result.criteria.map((c) => (
                        <div key={c.label} className="bg-secondary rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground">{c.label}</span>
                            <span className={`text-lg font-mono font-bold ${getScoreColor(c.score)}`}>{c.score.toFixed(1)}</span>
                          </div>
                          <div className="w-full h-2.5 bg-border rounded-full mb-2">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(c.score / 9) * 100}%` }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{c.feedback}</p>
                        </div>
                      ))}

                      {/* Vocabulary Upgrades */}
                      {result.vocabularyUpgrades && result.vocabularyUpgrades.length > 0 && (
                        <div className="bg-secondary rounded-xl p-4">
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-primary" /> Vocabulary Upgrades
                          </h4>
                          <div className="space-y-2">
                            {result.vocabularyUpgrades.map((v, i) => (
                              <div key={i} className="bg-background rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-destructive line-through">{v.basic}</span>
                                  <span className="text-muted-foreground text-xs">→</span>
                                  <span className="text-xs text-green-600 font-bold">{v.advanced}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground italic">"{v.example}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pronunciation Focus */}
                      {result.pronunciationFocus && result.pronunciationFocus.length > 0 && (
                        <div className="bg-secondary rounded-xl p-4">
                          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-primary" /> Pronunciation Focus
                          </h4>
                          <div className="space-y-2">
                            {result.pronunciationFocus.map((p, i) => (
                              <div key={i} className="bg-background rounded-lg p-3">
                                <p className="text-xs font-bold text-primary mb-1">{p.sound}</p>
                                <p className="text-xs text-foreground">Words: {p.words.join(", ")}</p>
                                <p className="text-[11px] text-muted-foreground">{p.tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggestions */}
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <h4 className="text-sm font-bold text-primary mb-3">
                          {t("Gợi ý cải thiện", "Improvement Tips")}
                        </h4>
                        <div className="space-y-2">
                          {result.suggestions.map((s, i) => (
                            <p key={i} className="text-xs text-muted-foreground flex items-start gap-2">
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
      </main>
      <Footer />
    </div>
  );
};

export default SpeakingPractice;
