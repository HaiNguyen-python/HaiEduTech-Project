/**
 * @file InterviewQuestions.tsx
 * @description Interview questions hub for AI Engineer & Data Engineer roles.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase, Search, ChevronLeft, Check, Copy, BookmarkCheck, Bookmark,
  BookOpen, Lightbulb, ListChecks, AlertTriangle, Code2, Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVClinic from "@/components/CVClinic";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  interviewQuestions,
  interviewCategories,
  type InterviewRole,
  type InterviewDifficulty,
} from "@/data/interviewQuestions";
import { toast } from "sonner";

const STORAGE_KEY = "haiedu_interview_reviewed";

const difficultyStyle: Record<InterviewDifficulty, string> = {
  Junior: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  Mid: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Senior: "bg-rose-500/10 text-rose-600 border-rose-500/30",
};

const InterviewQuestions = () => {
  const { t } = useLanguage();
  const [role, setRole] = useState<InterviewRole>("ai-engineer");
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | "all">("all");
  const [search, setSearch] = useState("");
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReviewed(new Set(JSON.parse(raw)));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: Set<string>) => {
    setReviewed(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))); } catch { /* ignore */ }
  };

  const toggleReviewed = (id: string) => {
    const next = new Set(reviewed);
    if (next.has(id)) next.delete(id); else next.add(id);
    persist(next);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return interviewQuestions.filter(qst =>
      qst.role === role &&
      (category === "all" || qst.category === category) &&
      (difficulty === "all" || qst.difficulty === difficulty) &&
      (!q || qst.question.toLowerCase().includes(q) || qst.answer.toLowerCase().includes(q) ||
       qst.tags?.some(tag => tag.toLowerCase().includes(q)))
    );
  }, [role, category, difficulty, search]);

  const roleQs = useMemo(() => interviewQuestions.filter(q => q.role === role), [role]);
  const totalForRole = roleQs.length;
  const reviewedForRole = roleQs.filter(q => reviewed.has(q.id)).length;
  const juniorCount = roleQs.filter(q => q.difficulty === "Junior").length;
  const midCount = roleQs.filter(q => q.difficulty === "Mid").length;
  const seniorCount = roleQs.filter(q => q.difficulty === "Senior").length;
  const categoriesCount = interviewCategories[role]?.length ?? 0;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(t("Đã sao chép code", "Code copied"));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <Link to="/programming" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft className="w-4 h-4" /> {t("Quay lại Lập trình", "Back to Programming")}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Briefcase className="w-3 h-3" /> {t("Phỏng vấn việc làm", "Job Interview Prep")}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">
              Interview <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              {t(
                "Bộ câu hỏi phỏng vấn thực tế cho AI Engineer và Data Engineer kèm câu trả lời chi tiết, mã ví dụ và điểm mấu chốt.",
                "Curated real-world interview questions for AI Engineer and Data Engineer roles, with in-depth answers, code examples and key talking points."
              )}
            </p>
          </motion.div>

          {/* Role tabs */}
          <Tabs value={role} onValueChange={(v) => { if (v !== "cv-clinic") { setRole(v as InterviewRole); setCategory("all"); } else { setRole(v as any); } }}>
            <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto mb-6">
              <TabsTrigger value="ai-engineer">🧠 AI Engineer</TabsTrigger>
              <TabsTrigger value="data-engineer">🔄 Data Engineer</TabsTrigger>
              <TabsTrigger value="cv-clinic">🩺 CV Clinic</TabsTrigger>
            </TabsList>

            <TabsContent value="cv-clinic">
              <CVClinic />
            </TabsContent>

            {(["ai-engineer", "data-engineer"] as InterviewRole[]).map(r => (
              <TabsContent key={r} value={r}>
                {/* Quick Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
                  <div className="glass-card rounded-lg p-3 border border-primary/20 text-center">
                    <div className="text-xl font-bold text-primary">{totalForRole}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("Tổng câu", "Total Q's")}</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-emerald-500/20 text-center">
                    <div className="text-xl font-bold text-emerald-600">{juniorCount}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Junior</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-amber-500/20 text-center">
                    <div className="text-xl font-bold text-amber-600">{midCount}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Mid</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-rose-500/20 text-center">
                    <div className="text-xl font-bold text-rose-600">{seniorCount}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Senior</div>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-border text-center col-span-2 sm:col-span-1">
                    <div className="text-xl font-bold text-foreground">{categoriesCount}</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{t("Chủ đề", "Topics")}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>
                    {t("Đã ôn", "Reviewed")}: <span className="font-semibold text-primary">{reviewedForRole}/{totalForRole}</span>
                  </span>
                  <span>
                    {t("Hiển thị", "Showing")}: <span className="font-semibold text-foreground">{filtered.length}</span>
                  </span>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t("Tìm theo từ khóa, tag...", "Search by keyword, tag...")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button
                    size="sm"
                    variant={category === "all" ? "default" : "outline"}
                    onClick={() => setCategory("all")}
                  >
                    {t("Tất cả chủ đề", "All Topics")}
                  </Button>
                  {interviewCategories[r].map(cat => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={category === cat ? "default" : "outline"}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(["all", "Junior", "Mid", "Senior"] as const).map(d => (
                    <Button
                      key={d}
                      size="sm"
                      variant={difficulty === d ? "default" : "outline"}
                      onClick={() => setDifficulty(d)}
                    >
                      {d === "all" ? t("Tất cả cấp độ", "All Levels") : d}
                    </Button>
                  ))}
                </div>

                {/* Questions */}
                {filtered.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    {t("Không có câu hỏi phù hợp.", "No matching questions.")}
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-3">
                    {filtered.map((q, idx) => {
                      const isReviewed = reviewed.has(q.id);
                      return (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.25 }}
                        >
                          <AccordionItem
                            value={q.id}
                            className="glass-card rounded-xl border border-border px-4 data-[state=open]:border-primary/40"
                          >
                            <AccordionTrigger className="hover:no-underline py-4">
                              <div className="flex items-start gap-3 text-left flex-1">
                                <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                                  <span className="text-xs font-bold text-muted-foreground">#{idx + 1}</span>
                                  {isReviewed && <Check className="w-3 h-3 text-emerald-600" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-foreground text-sm sm:text-base leading-snug">
                                    {q.question}
                                  </p>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    <Badge variant="outline" className={`text-[10px] ${difficultyStyle[q.difficulty]}`}>
                                      {q.difficulty}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px]">
                                      {q.category}
                                    </Badge>
                                    {q.tags?.slice(0, 3).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-5">
                              <div className="space-y-4 pt-3 border-t border-border">

                                {/* TL;DR */}
                                {q.tldr && (
                                  <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <BookOpen className="w-4 h-4 text-primary" />
                                      <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
                                        TL;DR
                                      </h4>
                                    </div>
                                    <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                                      {q.tldr}
                                    </p>
                                  </div>
                                )}

                                {/* Detailed Explanation */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                    <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
                                      {t("Giải thích chi tiết", "Detailed Explanation")}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                    {q.answer}
                                  </p>
                                </div>

                                {/* Key Points */}
                                {q.keyPoints?.length > 0 && (
                                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <ListChecks className="w-4 h-4 text-emerald-600" />
                                      <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-500">
                                        {t("Điểm mấu chốt", "Key Points")}
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {q.keyPoints.map((kp, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                                          <span>{kp}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Pitfalls */}
                                {q.pitfalls && q.pitfalls.length > 0 && (
                                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                                      <h4 className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-500">
                                        {t("Sai lầm thường gặp", "Common Pitfalls")}
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {q.pitfalls.map((p, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                                          <span className="text-amber-600 mt-0.5 shrink-0">⚠</span>
                                          <span>{p}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Code Example */}
                                {q.codeExample && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <Code2 className="w-4 h-4 text-primary" />
                                        <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
                                          {t("Ví dụ code", "Code Example")}
                                        </h4>
                                        <span className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded bg-muted">
                                          {q.codeExample.language}
                                        </span>
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 text-xs"
                                        onClick={() => copyCode(q.codeExample!.code)}
                                      >
                                        <Copy className="w-3 h-3 mr-1" /> {t("Sao chép", "Copy")}
                                      </Button>
                                    </div>
                                    <div className="rounded-lg bg-slate-950 dark:bg-slate-900 border border-border p-3 overflow-x-auto">
                                      <pre className="text-xs font-mono text-slate-100 leading-relaxed">
                                        <code>{q.codeExample.code}</code>
                                      </pre>
                                    </div>
                                  </div>
                                )}

                                {/* Interview Tip */}
                                {q.interviewTip && (
                                  <div className="rounded-lg border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Target className="w-4 h-4 text-emerald-600" />
                                      <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-500">
                                        {t("Mẹo phỏng vấn", "Interview Tip")}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-foreground/90 leading-relaxed italic">
                                      {q.interviewTip}
                                    </p>
                                  </div>
                                )}

                                <div className="flex justify-end pt-2">
                                  <Button
                                    size="sm"
                                    variant={isReviewed ? "default" : "outline"}
                                    onClick={() => toggleReviewed(q.id)}
                                  >
                                    {isReviewed
                                      ? <><BookmarkCheck className="w-4 h-4 mr-1.5" /> {t("Đã ôn", "Reviewed")}</>
                                      : <><Bookmark className="w-4 h-4 mr-1.5" /> {t("Đánh dấu đã ôn", "Mark as Reviewed")}</>
                                    }
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      );
                    })}
                  </Accordion>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InterviewQuestions;
