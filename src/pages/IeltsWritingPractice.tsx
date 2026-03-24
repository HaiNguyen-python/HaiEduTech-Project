import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WritingHistory from "@/components/WritingHistory";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  BookOpen, Send, Loader2, ChevronDown, ChevronUp,
  Download, Copy, Check, Timer, TimerOff, RefreshCw, AlertCircle,
  BookMarked, Search, ExternalLink, Volume2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { WritingPrompt, getRandomPrompt } from "@/data/ieltsWritingPrompts";
import Task1Chart from "@/components/Task1Chart";

// Grading result types (shared with AIGrading)
interface CriteriaDetail {
  score: number;
  label: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}
interface GradingResult {
  overall: number;
  criteria: CriteriaDetail[];
  errors: { error: string; correction: string; category: string }[];
  upgraded: string;
  advice: string;
}

const TASK1_TIME = 20 * 60; // 20 minutes
const TASK2_TIME = 40 * 60; // 40 minutes

const IeltsWritingPractice = () => {
  const { t } = useLanguage();

  // Prompt state
  const [taskType, setTaskType] = useState<1 | 2>(2);
  const [subType, setSubType] = useState<string>("");
  const [currentPrompt, setCurrentPrompt] = useState<WritingPrompt | null>(null);
  const [promptLoading, setPromptLoading] = useState(false);

  // Writing state
  const [essay, setEssay] = useState("");
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TASK2_TIME);

  // Collapsible sections
  const [guideOpen, setGuideOpen] = useState(true);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);
  const [dictSearchWord, setDictSearchWord] = useState("");
  const [dictResult, setDictResult] = useState<any>(null);
  const [dictViTranslations, setDictViTranslations] = useState<Record<string, string>>({});
  const [dictLoading, setDictLoading] = useState(false);
  const [thesaurusWord, setThesaurusWord] = useState("");
  const [thesaurusResult, setThesaurusResult] = useState<{ word: string; score: number }[]>([]);
  const [thesaurusLoading, setThesaurusLoading] = useState(false);
  const [collocationWord, setCollocationWord] = useState("");
  const [collocationResult, setCollocationResult] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
  const [collocationLoading, setCollocationLoading] = useState(false);

  // Word count
  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  const targetWords = taskType === 1 ? 150 : 250;

  // Initialize with a random static prompt
  useEffect(() => {
    handleStaticPrompt();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Reset timer when task type changes
  useEffect(() => {
    setTimeLeft(taskType === 1 ? TASK1_TIME : TASK2_TIME);
    setTimerActive(false);
  }, [taskType]);

  // Translate a text to Vietnamese using MyMemory API
  const translateToVi = async (text: string): Promise<string> => {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`);
      if (res.ok) {
        const data = await res.json();
        return data.responseData?.translatedText || "";
      }
    } catch { /* silent */ }
    return "";
  };

  // Inline dictionary lookup with Vietnamese translations
  const handleDictLookup = async (word: string) => {
    if (!word.trim()) return;
    setDictLoading(true);
    setDictResult(null);
    setDictViTranslations({});
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim().toLowerCase()}`);
      if (res.ok) {
        const data = await res.json();
        const entry = data[0];
        setDictResult(entry);
        // Translate definitions and examples to Vietnamese in background
        const translations: Record<string, string> = {};
        const toTranslate: { key: string; text: string }[] = [];
        entry.meanings?.forEach((m: any, mIdx: number) => {
          m.definitions?.slice(0, 3).forEach((def: any, dIdx: number) => {
            toTranslate.push({ key: `def-${mIdx}-${dIdx}`, text: def.definition });
            if (def.example) {
              toTranslate.push({ key: `ex-${mIdx}-${dIdx}`, text: def.example });
            }
          });
        });
        // Batch translate (parallel, max 6 at a time)
        const chunks = toTranslate.slice(0, 6);
        const results = await Promise.allSettled(
          chunks.map(async (item) => {
            const viText = await translateToVi(item.text);
            return { key: item.key, vi: viText };
          })
        );
        results.forEach((r) => {
          if (r.status === "fulfilled" && r.value.vi) {
            translations[r.value.key] = r.value.vi;
          }
        });
        setDictViTranslations(translations);
      } else {
        setDictResult({ error: true });
      }
    } catch {
      setDictResult({ error: true });
    }
    setDictLoading(false);
  };

  // Inline collocation lookup using Datamuse API (multiple strategies)
  const handleCollocationLookup = async (word: string) => {
    if (!word.trim()) return;
    setCollocationLoading(true);
    setCollocationResult({ left: [], right: [] });
    try {
      const w = word.trim().toLowerCase();
      // lc=word → words that follow 'word' (word + ___)
      // rc=word → words that precede 'word' (___ + word)
      // rel_jja=word → adjectives for noun, rel_jjb=word → nouns for adjective
      const [followRes, precedeRes, adjRes, trigRes] = await Promise.all([
        fetch(`https://api.datamuse.com/words?lc=${w}&max=10`),
        fetch(`https://api.datamuse.com/words?rc=${w}&max=10`),
        fetch(`https://api.datamuse.com/words?rel_jja=${w}&max=8`),
        fetch(`https://api.datamuse.com/words?rel_trg=${w}&max=8`),
      ]);
      const followData = followRes.ok ? await followRes.json() : [];
      const precedeData = precedeRes.ok ? await precedeRes.json() : [];
      const adjData = adjRes.ok ? await adjRes.json() : [];
      const trigData = trigRes.ok ? await trigRes.json() : [];

      // Combine precede + adjectives for "left" collocations (___ + word)
      const leftWords = [...new Set([
        ...precedeData.map((d: any) => d.word),
        ...adjData.map((d: any) => d.word),
      ])].slice(0, 12);

      // Combine follow + triggered for "right" collocations (word + ___)
      const rightWords = [...new Set([
        ...followData.map((d: any) => d.word),
        ...trigData.map((d: any) => d.word),
      ])].slice(0, 12);

      setCollocationResult({ left: leftWords, right: rightWords });
    } catch {
      setCollocationResult({ left: [], right: [] });
    }
    setCollocationLoading(false);
  };

  // Inline thesaurus lookup with scores for color grading
  const handleThesaurusLookup = async (word: string) => {
    if (!word.trim()) return;
    setThesaurusLoading(true);
    setThesaurusResult([]);
    try {
      const res = await fetch(`https://api.datamuse.com/words?rel_syn=${word.trim().toLowerCase()}&max=20`);
      if (res.ok) {
        const data = await res.json();
        setThesaurusResult(data.map((d: any) => ({ word: d.word, score: d.score || 0 })));
      }
    } catch {
      setThesaurusResult([]);
    }
    setThesaurusLoading(false);
  };

  // Get opacity class based on synonym relevance score
  const getSynonymStyle = (score: number, maxScore: number) => {
    if (maxScore === 0) return { opacity: 1 };
    const ratio = score / maxScore;
    // Map ratio to opacity: highest score = 1.0, lowest = 0.35
    return { opacity: 0.35 + ratio * 0.65 };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStaticPrompt = () => {
    const prompt = getRandomPrompt(taskType, subType || undefined);
    setCurrentPrompt(prompt);
    setResult(null);
    setEssay("");
  };

  const handleAIPrompt = async () => {
    setPromptLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-writing-prompt", {
        body: { taskType, essayType: taskType === 2 ? (subType || "opinion") : undefined, chartType: taskType === 1 ? (subType || "bar") : undefined },
      });
      if (error) throw error;
      setCurrentPrompt({
        id: `ai-${Date.now()}`,
        taskType,
        ...(taskType === 2 ? { essayType: data.essayType } : { chartType: data.chartType }),
        prompt: data.prompt,
        writingGuide: data.writingGuide || [],
        vocabularyBank: data.vocabularyBank || [],
        brainstormingIdeas: data.brainstormingIdeas || [],
        imageDescription: data.imageDescription,
      } as WritingPrompt);
      setResult(null);
      setEssay("");
    } catch (e) {
      console.error("Error generating prompt:", e);
      // Fallback to static
      handleStaticPrompt();
    } finally {
      setPromptLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!essay.trim() || !currentPrompt) return;
    setGrading(true);
    setTimerActive(false);

    try {
      const { data, error } = await supabase.functions.invoke("grade-writing", {
        body: { essay },
      });
      if (error) throw error;
      setResult(data as GradingResult);

      // Save to history if user is logged in
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from("writing_attempts").insert({
            user_id: user.id,
            task_type: taskType,
            prompt: currentPrompt.prompt,
            essay,
            word_count: wordCount,
            result: data,
            overall_score: data.overall,
          });
        }
      } catch (saveErr) {
        console.error("Error saving attempt:", saveErr);
      }
    } catch (e) {
      console.error("Grading error:", e);
    } finally {
      setGrading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!result || !currentPrompt) return;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>IELTS Writing Report</title>
    <style>body{font-family:Georgia,serif;max-width:800px;margin:0 auto;padding:40px;color:#222}
    h1{color:#1a365d;border-bottom:3px solid #2563eb;padding-bottom:10px}
    h2{color:#2563eb;margin-top:30px}
    .score{font-size:48px;color:#2563eb;text-align:center;margin:20px 0}
    .criteria{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
    .criteria-item{background:#f0f4ff;padding:16px;border-radius:8px}
    .error-item{background:#fef2f2;padding:12px;border-radius:8px;margin:8px 0}
    .upgraded{background:#f0fdf4;padding:20px;border-radius:8px;line-height:1.8}
    @media print{body{padding:20px}}</style></head>
    <body>
    <h1>📝 IELTS Writing Practice Report</h1>
    <h2>Prompt</h2><p>${currentPrompt.prompt}</p>
    <h2>Your Essay (${wordCount} words)</h2><p style="white-space:pre-wrap">${essay}</p>
    <div class="score">Band ${result.overall}</div>
    <h2>Criteria Breakdown</h2>
    <div class="criteria">${result.criteria.map(c => `<div class="criteria-item"><strong>${c.label}: ${c.score}</strong></div>`).join("")}</div>
    <h2>Error Highlights</h2>
    ${result.errors.map(e => `<div class="error-item"><s>${e.error}</s> → <strong>${e.correction}</strong> <em>(${e.category})</em></div>`).join("")}
    <h2>Band 8.0+ Version</h2>
    <div class="upgraded">${result.upgraded}</div>
    <h2>Advice</h2><p>${result.advice}</p>
    </body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  };

  const handleCopyUpgraded = () => {
    if (result?.upgraded) {
      navigator.clipboard.writeText(result.upgraded);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  const task2Types = [
    { value: "opinion", label: "Opinion" },
    { value: "discussion", label: "Discussion" },
    { value: "advantage-disadvantage", label: "Advantage/Disadvantage" },
    { value: "problem-solution", label: "Problem/Solution" },
    { value: "direct-question", label: "Direct Question" },
  ];
  const task1Types = [
    { value: "bar", label: "Bar Chart" },
    { value: "line", label: "Line Graph" },
    { value: "pie", label: "Pie Chart" },
    { value: "table", label: "Table" },
    { value: "map", label: "Map" },
    { value: "process", label: "Process" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            {t("Luyện viết IELTS", "IELTS Writing Practice")}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t("Luyện viết Task 1 & Task 2 với hệ thống chấm điểm theo tiêu chí IELTS chính thức", "Practice Task 1 & Task 2 with scoring system based on official IELTS criteria")}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-muted/30 rounded-xl border">
          {/* Task Type */}
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            <button onClick={() => { setTaskType(1); setSubType(""); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${taskType === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Task 1
            </button>
            <button onClick={() => { setTaskType(2); setSubType(""); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${taskType === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Task 2
            </button>
          </div>

          {/* Sub-type */}
          <Select value={subType} onValueChange={setSubType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t("Loại bài", "Essay Type")} />
            </SelectTrigger>
            <SelectContent>
              {(taskType === 2 ? task2Types : task1Types).map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Generate buttons */}
          <Button variant="outline" size="sm" onClick={handleStaticPrompt}>
            <RefreshCw className="w-4 h-4 mr-1" /> {t("Đề ngẫu nhiên", "Random Prompt")}
          </Button>
          <Button size="sm" onClick={handleAIPrompt} disabled={promptLoading}>
            {promptLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
            {t("Tạo đề mới", "Generate New")}
          </Button>

          {/* Timer */}
          <div className="flex items-center gap-2 ml-auto">
            <span className={`font-mono text-lg ${timeLeft < 300 && timerActive ? "text-destructive animate-pulse" : "text-foreground"}`}>
              {formatTime(timeLeft)}
            </span>
            <Button variant="ghost" size="icon" onClick={() => setTimerActive(!timerActive)}>
              {timerActive ? <TimerOff className="w-4 h-4" /> : <Timer className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Main workspace */}
        {currentPrompt && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Prompt & Guides */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    📝 {t("Đề bài", "Writing Prompt")}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Task {currentPrompt.taskType}
                      {currentPrompt.essayType && ` — ${currentPrompt.essayType}`}
                      {currentPrompt.chartType && ` — ${currentPrompt.chartType}`}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{currentPrompt.prompt}</p>
                  {/* Dynamic chart for Task 1 prompts */}
                  {currentPrompt.chartData && (
                    <div className="mt-4">
                      <Task1Chart config={currentPrompt.chartData} />
                    </div>
                  )}
                  {/* Fallback description for map/process types without chart data */}
                  {!currentPrompt.chartData && currentPrompt.imageDescription && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border-2 border-dashed">
                      <p className="text-xs text-muted-foreground font-medium mb-1">📊 {t("Mô tả biểu đồ:", "Chart Description:")}</p>
                      <p className="text-xs text-muted-foreground">{currentPrompt.imageDescription}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Writing Guide */}
              <Collapsible open={guideOpen} onOpenChange={setGuideOpen}>
                <Card>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                      <CardTitle className="text-base">📋 {t("Hướng dẫn viết", "Writing Guide")}</CardTitle>
                      {guideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <ol className="space-y-2 text-sm">
                        {currentPrompt.writingGuide.map((step, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Vocabulary Bank */}
              <Collapsible open={vocabOpen} onOpenChange={setVocabOpen}>
                <Card>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                      <CardTitle className="text-base">📚 {t("Ngân hàng từ vựng", "Vocabulary Bank")}</CardTitle>
                      {vocabOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {currentPrompt.vocabularyBank.map((word, i) => (
                          <span key={i} className="bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium">{word}</span>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Brainstorming Ideas */}
              <Collapsible open={ideasOpen} onOpenChange={setIdeasOpen}>
                <Card>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                      <CardTitle className="text-base">💡 {t("Gợi ý ý tưởng", "Brainstorming Ideas")}</CardTitle>
                      {ideasOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {currentPrompt.brainstormingIdeas.map((idea, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-primary">•</span>
                            <span>{idea}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Writing History (for logged-in users) */}
              <WritingHistory />
            </motion.div>

            {/* RIGHT: Editor & Results */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="space-y-4">
              {/* Editor */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>✍️ {t("Bài viết của bạn", "Your Essay")}</span>
                    <span className={`text-sm font-mono ${wordCount >= targetWords ? "text-green-500" : "text-muted-foreground"}`}>
                      {wordCount} / {targetWords}+ {t("từ", "words")}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder={t(
                      `Viết bài Task ${taskType} của bạn tại đây... (tối thiểu ${targetWords} từ)`,
                      `Write your Task ${taskType} essay here... (minimum ${targetWords} words)`
                    )}
                    className="min-h-[350px] text-sm leading-relaxed resize-y"
                  />
                  <div className="flex gap-2 mt-3">
                    <Button onClick={handleSubmit} disabled={grading || wordCount < 50} className="flex-1">
                      {grading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                      {grading ? t("Đang chấm...", "Grading...") : t("Nộp bài & Chấm điểm", "Submit & Grade")}
                    </Button>
                    {result && (
                      <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>
                    )}
                  </div>
                  {wordCount > 0 && wordCount < 50 && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {t("Cần ít nhất 50 từ để chấm điểm", "Need at least 50 words to grade")}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Results */}
              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Overall Score */}
                  <Card className="border-primary/30">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">{t("Điểm tổng", "Overall Band Score")}</p>
                      <p className={`text-5xl font-bold ${getScoreColor(result.overall)}`}>{result.overall}</p>
                    </CardContent>
                  </Card>

                  {/* Criteria */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">📊 {t("Phân tích chi tiết", "Detailed Analysis")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {result.criteria.map((c, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                          <button
                            className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
                            onClick={() => setExpandedCriteria(expandedCriteria === i ? null : i)}
                          >
                            <span className="text-sm font-medium">{c.label}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${getScoreColor(c.score)}`}>{c.score}</span>
                              {expandedCriteria === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </button>
                          {expandedCriteria === i && (
                            <div className="p-3 border-t text-sm space-y-3">
                              <div>
                                <p className="font-medium text-green-600 mb-1">✅ {t("Điểm mạnh", "Strengths")}</p>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  {c.strengths.map((s, j) => <li key={j}>{s}</li>)}
                                </ul>
                              </div>
                              <div>
                                <p className="font-medium text-red-500 mb-1">⚠️ {t("Điểm yếu", "Weaknesses")}</p>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  {c.weaknesses.map((w, j) => <li key={j}>{w}</li>)}
                                </ul>
                              </div>
                              <div>
                                <p className="font-medium text-primary mb-1">💡 {t("Gợi ý", "Suggestions")}</p>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  {c.suggestions.map((s, j) => <li key={j}>{s}</li>)}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Errors */}
                  {result.errors.length > 0 && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">🔍 {t("Lỗi cần sửa", "Error Highlights")}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {result.errors.map((e, i) => (
                          <div key={i} className="flex flex-col gap-1 p-2 bg-destructive/5 rounded-lg text-sm">
                            <span><s className="text-destructive">{e.error}</s> → <strong className="text-green-600">{e.correction}</strong></span>
                            <span className="text-xs text-muted-foreground">{e.category}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Upgraded Version */}
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">🌟 {t("Phiên bản Band 8.0+", "Band 8.0+ Version")}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={handleCopyUpgraded}>
                          {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                          {copied ? t("Đã sao chép", "Copied") : t("Sao chép", "Copy")}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-4 rounded-lg">
                        <ReactMarkdown>{result.upgraded}</ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advice */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">📈 {t("Lời khuyên", "Advice")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{result.advice}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* Reference Toolbox - Floating Button + Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="fixed bottom-6 left-6 z-40 rounded-full shadow-lg px-4 h-12 gap-2"
              variant="default"
            >
              <BookMarked className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">{t("Tra cứu", "Lookup")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] sm:w-[450px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-primary" />
                {t("Công cụ tra cứu", "Reference Toolbox")}
              </SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="dictionary" className="mt-4">
              <TabsList className="w-full">
                <TabsTrigger value="dictionary" className="flex-1 text-xs">📖 Dictionary</TabsTrigger>
                <TabsTrigger value="ozdic" className="flex-1 text-xs">🔗 Ozdic</TabsTrigger>
                <TabsTrigger value="thesaurus" className="flex-1 text-xs">📚 Thesaurus</TabsTrigger>
              </TabsList>

              {/* Cambridge Dictionary Tab - with Vietnamese translations */}
              <TabsContent value="dictionary" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("Tra cứu định nghĩa, phát âm, ví dụ (EN/VI) ngay tại đây.", "Look up definitions, pronunciation, examples (EN/VI) right here.")}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={dictSearchWord}
                    onChange={(e) => setDictSearchWord(e.target.value)}
                    placeholder={t("Nhập từ cần tra...", "Enter a word...")}
                    onKeyDown={(e) => { if (e.key === "Enter") handleDictLookup(dictSearchWord); }}
                  />
                  <Button size="sm" onClick={() => handleDictLookup(dictSearchWord)} disabled={dictLoading}>
                    {dictLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                {dictResult && !dictResult.error && (
                  <div className="rounded-lg border bg-card p-3 space-y-3 max-h-[400px] overflow-y-auto">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground text-base">{dictResult.word}</h4>
                      {dictResult.phonetic && <span className="text-xs text-muted-foreground">{dictResult.phonetic}</span>}
                      {dictResult.phonetics?.find((p: any) => p.audio) && (
                        <button onClick={() => { const a = new Audio(dictResult.phonetics.find((p: any) => p.audio)?.audio); a.play(); }} className="text-primary hover:text-primary/80">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {dictResult.meanings?.map((meaning: any, mIdx: number) => (
                      <div key={mIdx} className="space-y-2">
                        <span className="text-xs font-medium text-primary italic">{meaning.partOfSpeech}</span>
                        {meaning.definitions?.slice(0, 3).map((def: any, dIdx: number) => (
                          <div key={dIdx} className="pl-2 border-l-2 border-primary/20 space-y-0.5">
                            <p className="text-sm text-foreground">{dIdx + 1}. {def.definition}</p>
                            {dictViTranslations[`def-${mIdx}-${dIdx}`] && (
                              <p className="text-xs text-muted-foreground ml-2">🇻🇳 {dictViTranslations[`def-${mIdx}-${dIdx}`]}</p>
                            )}
                            {def.example && (
                              <>
                                <p className="text-xs text-foreground/80 italic ml-2">{`📝 "${def.example}"`}</p>
                                {dictViTranslations[`ex-${mIdx}-${dIdx}`] && (
                                  <p className="text-xs text-muted-foreground ml-2">{`🇻🇳 "${dictViTranslations[`ex-${mIdx}-${dIdx}`]}"`}</p>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                        {meaning.synonyms?.length > 0 && (
                          <p className="text-xs text-muted-foreground"><strong>Synonyms:</strong> {meaning.synonyms.slice(0, 5).join(", ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {dictResult?.error && (
                  <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                    {t("Không tìm thấy từ này. Hãy thử từ khác.", "Word not found. Try another word.")}
                  </div>
                )}
                <a href={`https://dictionary.cambridge.org/dictionary/english/${dictSearchWord.trim().toLowerCase() || ""}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  {t("Xem thêm trên Cambridge Dictionary", "See more on Cambridge Dictionary")}
                </a>
              </TabsContent>

              {/* Collocation Tab - Inline via Datamuse */}
              <TabsContent value="ozdic" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("Tìm cụm từ kết hợp tự nhiên (collocations) ngay tại đây.", "Find natural word combinations (collocations) right here.")}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={collocationWord}
                    onChange={(e) => setCollocationWord(e.target.value)}
                    placeholder={t("Nhập từ cần tìm collocation...", "Enter word for collocations...")}
                    onKeyDown={(e) => { if (e.key === "Enter") handleCollocationLookup(collocationWord); }}
                  />
                  <Button size="sm" onClick={() => handleCollocationLookup(collocationWord)} disabled={collocationLoading}>
                    {collocationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                {!collocationLoading && collocationWord && collocationResult.left.length === 0 && collocationResult.right.length === 0 && (
                  <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground text-center">
                    {t("Không tìm thấy collocation. Hãy thử từ khác.", "No collocations found. Try another word.")}
                  </div>
                )}
                {(collocationResult.left.length > 0 || collocationResult.right.length > 0) && (
                  <div className="rounded-lg border bg-card p-3 space-y-3 max-h-[350px] overflow-y-auto">
                    <p className="text-xs font-medium text-foreground">
                      {t("Kết quả collocation cho", "Collocations for")} "<strong>{collocationWord}</strong>":
                    </p>
                    {collocationResult.left.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">___ + {collocationWord}:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {collocationResult.left.map((w) => (
                            <span key={w} className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                              {w} <span className="text-foreground">{collocationWord}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {collocationResult.right.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-primary mb-1">{collocationWord} + ___:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {collocationResult.right.map((w) => (
                            <span key={w} className="rounded-md bg-accent/60 text-accent-foreground px-2 py-0.5 text-xs font-medium">
                              <span className="text-foreground">{collocationWord}</span> {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-2">{t("Ví dụ collocations hữu ích:", "Useful collocation examples:")}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>make</strong> a decision (đưa ra quyết định)</li>
                    <li>• <strong>exert</strong> pressure on (gây áp lực lên)</li>
                    <li>• <strong>pose</strong> a threat to (đe dọa)</li>
                    <li>• <strong>draw</strong> a conclusion (rút ra kết luận)</li>
                    <li>• <strong>raise</strong> awareness (nâng cao nhận thức)</li>
                  </ul>
                </div>
              </TabsContent>

              {/* Thesaurus Tab - Color-coded by relevance */}
              <TabsContent value="thesaurus" className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {t("Tìm từ đồng nghĩa — màu đậm = sát nghĩa nhất, nhạt = ít sát hơn.", "Find synonyms — darker = most relevant, lighter = less relevant.")}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={thesaurusWord}
                    onChange={(e) => setThesaurusWord(e.target.value)}
                    placeholder={t("Nhập từ cần tìm đồng nghĩa...", "Enter word for synonyms...")}
                    onKeyDown={(e) => { if (e.key === "Enter") handleThesaurusLookup(thesaurusWord); }}
                  />
                  <Button size="sm" onClick={() => handleThesaurusLookup(thesaurusWord)} disabled={thesaurusLoading}>
                    {thesaurusLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>
                {thesaurusResult.length > 0 && (
                  <div className="rounded-lg border bg-card p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-foreground">
                        {t("Từ đồng nghĩa của", "Synonyms of")} "<strong>{thesaurusWord}</strong>":
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="inline-block w-3 h-3 rounded bg-primary" style={{ opacity: 1 }} />
                        {t("Sát nghĩa", "Closest")}
                        <span className="inline-block w-3 h-3 rounded bg-primary ml-1" style={{ opacity: 0.35 }} />
                        {t("Ít sát", "Less")}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {thesaurusResult.map((syn) => {
                        const maxScore = thesaurusResult[0]?.score || 1;
                        return (
                          <span
                            key={syn.word}
                            className="rounded-md bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium"
                            style={getSynonymStyle(syn.score, maxScore)}
                          >
                            {syn.word}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-2">{t("Thay thế từ phổ biến:", "Common word replacements:")}</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• good → beneficial, advantageous, favorable</li>
                    <li>• bad → detrimental, adverse, harmful</li>
                    <li>• important → crucial, vital, significant</li>
                    <li>• many → numerous, a plethora of, countless</li>
                    <li>• think → argue, contend, maintain, assert</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsWritingPractice;
