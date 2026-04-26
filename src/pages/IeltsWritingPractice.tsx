import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WritingHistory from "@/components/WritingHistory";
import WritingDraftsPanel, { type WritingDraft } from "@/components/WritingDraftsPanel";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  BookOpen, Send, Loader2, ChevronDown, ChevronUp,
  Download, Copy, Check, Timer, TimerOff, RefreshCw, AlertCircle, Save, FolderOpen
} from "lucide-react";

import WritingGuidePanel from "@/components/WritingGuidePanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { WritingPrompt, getRandomPrompt } from "@/data/ieltsWritingPrompts";
import Task1Chart from "@/components/Task1Chart";
import { MapDiagram, ProcessDiagram } from "@/components/Task1Visual";
import { useUserRole } from "@/hooks/useUserRole";
import PhrasePractice from "@/components/PhrasePractice";
import { Sparkles, PenLine } from "lucide-react";

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
  const { isTeacher } = useUserRole();

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

  // Drafts state
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftsReloadKey, setDraftsReloadKey] = useState(0);

  // Collapsible sections
  const [guideOpen, setGuideOpen] = useState(true);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [ideasOpen, setIdeasOpen] = useState(false);

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
    setCurrentDraftId(null);
  };

  const handleSaveDraft = async () => {
    if (!currentPrompt || !essay.trim()) {
      toast({ title: t("Chưa có gì để lưu", "Nothing to save"), description: t("Hãy viết vài câu rồi lưu nháp.", "Write something first, then save the draft."), variant: "destructive" });
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: t("Cần đăng nhập", "Sign in required"), description: t("Đăng nhập để lưu bản nháp và quay lại viết tiếp.", "Sign in to save drafts and resume later."), variant: "destructive" });
      return;
    }
    setSavingDraft(true);
    const firstLine = essay.trim().split("\n")[0].slice(0, 60) || `Task ${taskType} draft`;
    const payload = {
      user_id: user.id,
      task_type: taskType,
      sub_type: subType || null,
      prompt: currentPrompt.prompt,
      prompt_meta: {
        id: currentPrompt.id,
        essayType: currentPrompt.essayType ?? null,
        chartType: currentPrompt.chartType ?? null,
      } as never,
      essay,
      word_count: wordCount,
      title: firstLine,
      time_left_seconds: timeLeft,
    };
    if (currentDraftId) {
      const { error } = await supabase.from("writing_drafts").update(payload).eq("id", currentDraftId);
      if (error) {
        toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      } else {
        toast({ title: t("Đã cập nhật bản nháp ✅", "Draft updated ✅") });
        setDraftsReloadKey(k => k + 1);
      }
    } else {
      const { data, error } = await supabase.from("writing_drafts").insert(payload).select("id").maybeSingle();
      if (error) {
        toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      } else {
        if (data?.id) setCurrentDraftId(data.id);
        toast({ title: t("Đã lưu nháp ✅", "Draft saved ✅"), description: t("Bạn có thể quay lại viết tiếp bất cứ lúc nào.", "You can resume anytime.") });
        setDraftsReloadKey(k => k + 1);
      }
    }
    setSavingDraft(false);
  };

  const handleResumeDraft = (draft: WritingDraft) => {
    setTaskType(draft.task_type as 1 | 2);
    setSubType(draft.sub_type || "");
    const meta = (draft.prompt_meta || {}) as { id?: string; essayType?: string; chartType?: string };
    setCurrentPrompt({
      id: meta.id || `draft-${draft.id}`,
      taskType: draft.task_type as 1 | 2,
      ...(draft.task_type === 2 ? { essayType: meta.essayType } : { chartType: meta.chartType }),
      prompt: draft.prompt,
      writingGuide: [],
      vocabularyBank: [],
      brainstormingIdeas: [],
    } as WritingPrompt);
    setEssay(draft.essay);
    setResult(null);
    setCurrentDraftId(draft.id);
    if (typeof draft.time_left_seconds === "number") setTimeLeft(draft.time_left_seconds);
    setTimerActive(false);
    toast({ title: t("Đã tải bản nháp 📂", "Draft loaded 📂"), description: t("Tiếp tục viết và bấm Lưu nháp khi muốn dừng.", "Keep writing and click Save Draft when you pause.") });
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
      setCurrentDraftId(null);
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
          // Log activity for admin analytics
          logStudentActivity({
            activityType: "ielts_writing",
            score: data.overall,
            maxScore: 9,
            domain: "english",
            metadata: { taskType, wordCount, criteria: data.criteria },
          });
          // Remove the draft now that the essay has been graded
          if (currentDraftId) {
            await supabase.from("writing_drafts").delete().eq("id", currentDraftId);
            setCurrentDraftId(null);
            setDraftsReloadKey(k => k + 1);
          }
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

  const mdToHtml = (md: string) => {
    if (!md) return "";
    // Escape HTML first
    let s = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    // Headings
    s = s.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    s = s.replace(/^##\s+(.+)$/gm, "<h3>$1</h3>");
    s = s.replace(/^#\s+(.+)$/gm, "<h3>$1</h3>");
    // Bold **text** and __text__
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__(.+?)__/g, "<strong>$1</strong>");
    // Italic *text* and _text_ (avoid matching list bullets)
    s = s.replace(/(^|[^*])\*(?!\s)([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>");
    s = s.replace(/(^|[^_])_(?!\s)([^_\n]+?)_(?!_)/g, "$1<em>$2</em>");
    // Inline code
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Bullet lists
    s = s.replace(/^\s*[-*]\s+(.+)$/gm, "<li>$1</li>");
    s = s.replace(/(<li>[\s\S]+?<\/li>)(?!\s*<li>)/g, "<ul>$1</ul>");
    // Paragraphs from blank lines
    s = s
      .split(/\n{2,}/)
      .map((block) =>
        block.match(/^\s*<(h\d|ul|ol|li|p|div|blockquote)/) ? block : `<p>${block.replace(/\n/g, "<br/>")}</p>`
      )
      .join("\n");
    return s;
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
    <div class="upgraded">${mdToHtml(result.upgraded)}</div>
    <h2>Advice</h2><div>${mdToHtml(result.advice)}</div>
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
      <SEO title="Luyện IELTS Writing Task 1 & 2 với AI Chấm Bài | HaiEduTech" description="Luyện Writing Task 1 & 2 với AI chấm điểm theo 4 tiêu chí IELTS chuẩn. Outline Builder, ngân hàng đề, biểu đồ Recharts, lưu draft tự động." path="/ielts-writing-practice" />
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

        {/* Mode Tabs: Essay Writing vs Phrase Practice */}
        <Tabs defaultValue="essay" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="essay" className="gap-2">
              <PenLine className="w-4 h-4" />
              {t("Viết bài luận", "Essay Writing")}
            </TabsTrigger>
            <TabsTrigger value="phrase" className="gap-2">
              <Sparkles className="w-4 h-4" />
              {t("Luyện cụm từ", "Phrase Practice")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="phrase" className="space-y-4">
            <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-4">
              <button onClick={() => setTaskType(1)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${taskType === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                Task 1
              </button>
              <button onClick={() => setTaskType(2)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${taskType === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                Task 2
              </button>
            </div>
            <PhrasePractice taskType={taskType} />
          </TabsContent>

          <TabsContent value="essay">
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
            <RefreshCw className="w-4 h-4 mr-1" /> {t("Đề ngẫu nhiên", "Random Topic")}
          </Button>
          {/* Generate New Topic - only visible for teachers/admins to save API costs */}
          {isTeacher && (
            <Button size="sm" onClick={handleAIPrompt} disabled={promptLoading}>
              {promptLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
              {t("Tạo đề mới", "Generate New Topic")}
            </Button>
          )}

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
                      {currentPrompt.essayType && ` - ${currentPrompt.essayType}`}
                      {currentPrompt.chartType && ` - ${currentPrompt.chartType}`}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{currentPrompt.prompt}</p>
                  {/* Dynamic chart for Task 1 prompts */}
                  {currentPrompt.chartData && (
                    <div className="mt-4 space-y-4">
                      <Task1Chart config={currentPrompt.chartData} />
                      {currentPrompt.chartData2 && (
                        <Task1Chart config={currentPrompt.chartData2} />
                      )}
                    </div>
                  )}
                  {/* Map diagram (before/after) */}
                  {currentPrompt.mapData && (
                    <div className="mt-4">
                      <MapDiagram data={currentPrompt.mapData} />
                    </div>
                  )}
                  {/* Process diagram (step flow) */}
                  {currentPrompt.processData && (
                    <div className="mt-4">
                      <ProcessDiagram data={currentPrompt.processData} />
                    </div>
                  )}
                  {/* Fallback description for prompts without any visual */}
                  {!currentPrompt.chartData && !currentPrompt.mapData && !currentPrompt.processData && currentPrompt.imageDescription && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border-2 border-dashed">
                      <p className="text-xs text-muted-foreground font-medium mb-1">📊 {t("Mô tả biểu đồ:", "Chart Description:")}</p>
                      <p className="text-xs text-muted-foreground">{currentPrompt.imageDescription}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Writing Guide - Interactive Outline */}
              <WritingGuidePanel prompt={currentPrompt} open={guideOpen} onOpenChange={setGuideOpen} />

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
                      {/* Two-column layout to save space */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                        {currentPrompt.brainstormingIdeas.map((idea, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                            <span>{idea}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Saved Drafts (resume unfinished essays) */}
              <WritingDraftsPanel onResume={handleResumeDraft} reloadKey={draftsReloadKey} />

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
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button onClick={handleSubmit} disabled={grading || wordCount < 50} className="flex-1 min-w-[160px]">
                      {grading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />}
                      {grading ? t("Đang chấm...", "Grading...") : t("Nộp bài & Chấm điểm", "Submit & Grade")}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSaveDraft}
                      disabled={savingDraft || !essay.trim()}
                      title={t("Lưu lại để viết tiếp sau", "Save and resume later")}
                    >
                      {savingDraft ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                      {currentDraftId ? t("Cập nhật nháp", "Update Draft") : t("Lưu nháp", "Save Draft")}
                    </Button>
                    {result && (
                      <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>
                    )}
                  </div>
                  {currentDraftId && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <FolderOpen className="w-3 h-3" /> {t("Đang chỉnh sửa bản nháp đã lưu", "Editing a saved draft")}
                    </p>
                  )}
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
          </TabsContent>
        </Tabs>

      </main>
      <Footer />
    </div>
  );
};

export default IeltsWritingPractice;
