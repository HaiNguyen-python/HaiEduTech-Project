/**
 * @file InterviewQuestions.tsx
 * @description Professional interview preparation workspace for AI and Data Engineer roles.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle, BookOpen, Bookmark, BookmarkCheck, BriefcaseBusiness, Check,
  ChevronLeft, CircleHelp, Code2, Copy, Filter, Lightbulb, ListChecks,
  PanelLeftClose, PanelLeftOpen, RotateCcw, Search, Stethoscope, Target, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CVClinic from "@/components/CVClinic";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  interviewCategories, interviewQuestions, type InterviewDifficulty, type InterviewQuestion,
  type InterviewRole,
} from "@/data/interviewQuestions";
import {
  filterInterviewQuestions, groupInterviewQuestions, INTERVIEW_REVIEWED_STORAGE_KEY,
  LEGACY_INTERVIEW_REVIEWED_STORAGE_KEY, parseReviewedQuestionIds, splitNumberedText,
  emphasizeInterviewTerms,
} from "@/lib/interviewQuestionUtils";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const difficultyClass: Record<InterviewDifficulty, string> = {
  Junior: "interview-badge interview-badge--junior",
  Mid: "interview-badge interview-badge--mid",
  Senior: "interview-badge interview-badge--senior",
};

const EmphasizedText = ({ text }: { text: string }) => (
  <>{emphasizeInterviewTerms(text).map((part, index) => part.important
    ? <strong key={`${part.text}-${index}`} className="font-bold text-foreground">{part.text}</strong>
    : <span key={`${part.text}-${index}`}>{part.text}</span>)}</>
);

const StructuredAnswer = ({ text }: { text: string }) => {
  const parts = splitNumberedText(text);
  const hasNumbering = parts.some((part) => part.number !== undefined);
  if (!hasNumbering) return <p className="whitespace-pre-wrap leading-7 text-foreground/90"><EmphasizedText text={text} /></p>;

  return (
    <div className="space-y-2 leading-7 text-foreground/90">
      {parts.map((part, index) => part.number === undefined ? (
        <p key={`intro-${index}`}><EmphasizedText text={part.text} /></p>
      ) : (
        <div key={`${part.number}-${index}`} className="interview-numbered-row">
          <span className="interview-number-marker" aria-hidden="true">{part.number}</span>
          <p><EmphasizedText text={part.text} /></p>
        </div>
      ))}
    </div>
  );
};

type ViewMode = InterviewRole | "cv-clinic";

type FilterPanelProps = {
  role: InterviewRole;
  category: string;
  difficulty: InterviewDifficulty | "all";
  reviewed: number;
  total: number;
  counts: Record<InterviewDifficulty, number>;
  unreviewedOnly: boolean;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: InterviewDifficulty | "all") => void;
  onUnreviewedChange: (value: boolean) => void;
  onReset: () => void;
  t: (vi: string, en: string) => string;
};

const FilterPanel = ({
  role, category, difficulty, reviewed, total, counts, unreviewedOnly,
  onCategoryChange, onDifficultyChange, onUnreviewedChange, onReset, t,
}: FilterPanelProps) => {
  const percent = total ? Math.round((reviewed / total) * 100) : 0;
  const hasFilters = category !== "all" || difficulty !== "all" || unreviewedOnly;

  return (
    <div className="space-y-7">
      <section aria-labelledby="interview-progress-heading">
        <h2 id="interview-progress-heading" className="interview-kicker mb-3">{t("Tiến độ của bạn", "Your journey")}</h2>
        <div className="interview-progress-panel">
          <div className="mb-2 flex items-end justify-between gap-3">
            <strong className="font-sora text-2xl text-foreground">{percent}%</strong>
            <span className="text-sm font-semibold text-muted-foreground">{reviewed}/{total}</span>
          </div>
          <Progress value={percent} className="h-2 bg-secondary [&>div]:bg-accent" aria-label={`${percent}% reviewed`} />
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("Đã hoàn thành", "Reviewed")} <strong className="text-primary">{reviewed}</strong> {t("câu hỏi", "questions")}
          </p>
        </div>
      </section>

      <section aria-labelledby="interview-level-heading">
        <h2 id="interview-level-heading" className="interview-kicker mb-3">{t("Cấp độ", "Difficulty")}</h2>
        <div className="space-y-1" role="group" aria-label={t("Lọc theo cấp độ", "Filter by difficulty")}>
          {(["all", "Junior", "Mid", "Senior"] as const).map((level) => (
            <Button
              key={level}
              variant="ghost"
              className={`interview-filter-row ${difficulty === level ? "interview-filter-row--active" : ""}`}
              aria-pressed={difficulty === level}
              onClick={() => onDifficultyChange(level)}
            >
              <span>{level === "all" ? t("Tất cả cấp độ", "All levels") : level}</span>
              <span className="interview-count">{level === "all" ? total : counts[level]}</span>
            </Button>
          ))}
        </div>
      </section>

      <section aria-labelledby="interview-topic-heading">
        <h2 id="interview-topic-heading" className="interview-kicker mb-3">{t("Chủ đề", "Topics")}</h2>
        <div className="space-y-1" role="group" aria-label={t("Lọc theo chủ đề", "Filter by topic")}>
          <Button
            variant="ghost"
            className={`interview-filter-row ${category === "all" ? "interview-filter-row--active" : ""}`}
            aria-pressed={category === "all"}
            onClick={() => onCategoryChange("all")}
          >
            <span>{t("Tất cả chủ đề", "All topics")}</span>
          </Button>
          {interviewCategories[role].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className={`interview-filter-row ${category === item ? "interview-filter-row--active" : ""}`}
              aria-pressed={category === item}
              onClick={() => onCategoryChange(item)}
            >
              <span className="whitespace-normal text-left leading-snug">{item}</span>
            </Button>
          ))}
        </div>
      </section>

      <section className="border-t border-border pt-5">
        <Button
          variant={unreviewedOnly ? "secondary" : "outline"}
          className="w-full justify-start"
          aria-pressed={unreviewedOnly}
          onClick={() => onUnreviewedChange(!unreviewedOnly)}
        >
          <Bookmark className="mr-2 h-4 w-4" aria-hidden="true" />
          {t("Chỉ câu chưa ôn", "Unreviewed only")}
        </Button>
        {hasFilters && (
          <Button variant="ghost" className="mt-2 w-full justify-start text-muted-foreground" onClick={onReset}>
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Đặt lại bộ lọc", "Reset filters")}
          </Button>
        )}
      </section>
    </div>
  );
};

const InterviewQuestionsPage = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [view, setView] = useState<ViewMode>("ai-engineer");
  const [role, setRole] = useState<InterviewRole>("ai-engineer");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | "all">("all");
  const [search, setSearch] = useState("");
  const [unreviewedOnly, setUnreviewedOnly] = useState(false);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const validIds = useMemo(() => new Set(interviewQuestions.map((item) => item.id)), []);

  useEffect(() => {
    const load = () => {
      const current = localStorage.getItem(INTERVIEW_REVIEWED_STORAGE_KEY);
      const legacy = localStorage.getItem(LEGACY_INTERVIEW_REVIEWED_STORAGE_KEY);
      const next = parseReviewedQuestionIds(current ?? legacy, validIds);
      setReviewed(next);
      if (!current && legacy) localStorage.setItem(INTERVIEW_REVIEWED_STORAGE_KEY, JSON.stringify([...next]));
    };
    load();
    const sync = (event: StorageEvent) => {
      if (event.key === INTERVIEW_REVIEWED_STORAGE_KEY) setReviewed(parseReviewedQuestionIds(event.newValue, validIds));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [validIds]);

  const roleQuestions = useMemo(() => interviewQuestions.filter((item) => item.role === role), [role]);
  const filtered = useMemo(() => filterInterviewQuestions(interviewQuestions, {
    role, category, difficulty, search, unreviewedOnly,
  }, reviewed), [role, category, difficulty, search, unreviewedOnly, reviewed]);
  const grouped = useMemo(() => groupInterviewQuestions(filtered, interviewCategories[role]), [filtered, role]);
  const reviewedForRole = roleQuestions.filter((item) => reviewed.has(item.id)).length;
  const counts = useMemo(() => ({
    Junior: roleQuestions.filter((item) => item.difficulty === "Junior").length,
    Mid: roleQuestions.filter((item) => item.difficulty === "Mid").length,
    Senior: roleQuestions.filter((item) => item.difficulty === "Senior").length,
  }), [roleQuestions]);

  const persistReviewed = (next: Set<string>) => {
    setReviewed(next);
    try {
      localStorage.setItem(INTERVIEW_REVIEWED_STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      toast.error(t("Không thể lưu tiến độ trên thiết bị này", "Progress could not be saved on this device"));
    }
  };

  const toggleReviewed = (id: string) => {
    const next = new Set(reviewed);
    if (next.has(id)) next.delete(id); else next.add(id);
    persistReviewed(next);
  };

  const selectView = (next: ViewMode) => {
    setView(next);
    if (next !== "cv-clinic") {
      setRole(next);
      setCategory("all");
      setDifficulty("all");
      setSearch("");
      setUnreviewedOnly(false);
    }
  };

  const resetFilters = () => {
    setCategory("all");
    setDifficulty("all");
    setUnreviewedOnly(false);
    setSearch("");
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(t("Đã sao chép code", "Code copied"));
    } catch {
      toast.error(t("Không thể sao chép code", "Could not copy code"));
    }
  };

  const filters = (
    <FilterPanel
      role={role}
      category={category}
      difficulty={difficulty}
      reviewed={reviewedForRole}
      total={roleQuestions.length}
      counts={counts}
      unreviewedOnly={unreviewedOnly}
      onCategoryChange={setCategory}
      onDifficultyChange={setDifficulty}
      onUnreviewedChange={setUnreviewedOnly}
      onReset={resetFilters}
      t={t}
    />
  );

  const renderQuestion = (question: InterviewQuestion, index: number) => {
    const isReviewed = reviewed.has(question.id);
    return (
      <motion.div
        key={question.id}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: reduceMotion ? 0 : Math.min(index * 0.02, 0.18) }}
      >
        <AccordionItem value={question.id} className={`interview-question ${isReviewed ? "interview-question--reviewed" : ""}`}>
          <AccordionTrigger className="px-4 py-4 hover:no-underline sm:px-5">
            <div className="min-w-0 flex-1 text-left">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className={difficultyClass[question.difficulty]}>{question.difficulty}</span>
                <Badge variant="secondary" className="text-xs font-semibold">{question.category}</Badge>
                {isReviewed && (
                  <span className="interview-reviewed-label"><Check className="h-3.5 w-3.5" aria-hidden="true" />{t("Đã ôn", "Reviewed")}</span>
                )}
              </div>
              <h3 className="font-sora text-base font-semibold leading-relaxed text-foreground sm:text-lg">
                <span className="mr-2 text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                {question.question}
              </h3>
              <span className="sr-only">{isReviewed ? t("Câu hỏi đã ôn", "Reviewed question") : t("Câu hỏi chưa ôn", "Unreviewed question")}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-5 sm:px-5">
            <div className="interview-answer space-y-5 border-t border-border pt-5">
              {question.tldr && (
                <section className="interview-callout interview-callout--primary">
                  <div className="interview-section-title"><BookOpen aria-hidden="true" />{t("Câu trả lời nhanh", "Quick answer")}</div>
                  <p className="font-semibold text-foreground"><EmphasizedText text={question.tldr} /></p>
                </section>
              )}
              <section>
                <div className="interview-section-title"><Lightbulb aria-hidden="true" />{t("Giải thích chi tiết", "Detailed explanation")}</div>
                <StructuredAnswer text={question.answer} />
              </section>
              {question.keyPoints.length > 0 && (
                <section className="interview-callout interview-callout--success">
                  <div className="interview-section-title"><ListChecks aria-hidden="true" />{t("Điểm nhà tuyển dụng muốn nghe", "What interviewers want to hear")}</div>
                  <ul className="space-y-2">
                    {question.keyPoints.map((point) => <li key={point} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden="true" /><span><EmphasizedText text={point} /></span></li>)}
                  </ul>
                </section>
              )}
              {question.pitfalls && question.pitfalls.length > 0 && (
                <section className="interview-callout interview-callout--warning">
                  <div className="interview-section-title"><AlertTriangle aria-hidden="true" />{t("Lỗi thường gặp", "Common pitfalls")}</div>
                  <ul className="list-disc space-y-2 pl-5">{question.pitfalls.map((item) => <li key={item}><EmphasizedText text={item} /></li>)}</ul>
                </section>
              )}
              {question.codeExample && (
                <section>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="interview-section-title mb-0"><Code2 aria-hidden="true" />{t("Ví dụ code", "Code example")} <span className="font-mono text-xs normal-case text-muted-foreground">{question.codeExample.language}</span></div>
                    <Button size="sm" variant="ghost" onClick={() => copyCode(question.codeExample?.code ?? "")}>
                      <Copy className="mr-1.5 h-4 w-4" aria-hidden="true" />{t("Sao chép", "Copy")}
                    </Button>
                  </div>
                  <CodeBlock code={question.codeExample.code} language={question.codeExample.language || "python"} showHeader={false} className="!my-0" />
                </section>
              )}
              {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                <section>
                  <div className="interview-section-title"><CircleHelp aria-hidden="true" />{t("Câu hỏi nối tiếp", "Follow-up questions")}</div>
                  <ul className="space-y-2">{question.followUpQuestions.map((item) => <li key={item} className="border-l-2 border-primary/30 pl-3">{item}</li>)}</ul>
                </section>
              )}
              {question.interviewTip && (
                <section className="interview-callout interview-callout--tip">
                  <div className="interview-section-title"><Target aria-hidden="true" />{t("Mẹo trả lời", "Interview tip")}</div>
                  <p><EmphasizedText text={question.interviewTip} /></p>
                </section>
              )}
              <div className="flex justify-end border-t border-border pt-4">
                <Button size="sm" variant={isReviewed ? "default" : "outline"} onClick={() => toggleReviewed(question.id)}>
                  {isReviewed ? <BookmarkCheck className="mr-2 h-4 w-4" aria-hidden="true" /> : <Bookmark className="mr-2 h-4 w-4" aria-hidden="true" />}
                  {isReviewed ? t("Đã ôn", "Reviewed") : t("Đánh dấu đã ôn", "Mark as reviewed")}
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </motion.div>
    );
  };

  return (
    <div className="interview-page min-h-screen bg-background">
      <SEO title="AI & Data Engineer Interview Questions" description="Professional AI Engineer and Data Engineer interview questions with structured answers, code examples, and study progress." path="/programming/interview-questions" jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: interviewQuestions.slice(0, 30).map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: (item.tldr || item.answer).slice(0, 500) } })) }} />
      <Navbar />
      <main className="pb-16 pt-5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <Link to="/programming" className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />{t("Quay lại Lập trình", "Back to Programming")}
          </Link>

          <section className="interview-shell">
            {view !== "cv-clinic" && sidebarOpen && <aside className="interview-sidebar hidden lg:block">{filters}</aside>}
            <div className="min-w-0 flex-1">
              <header className="interview-header">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="interview-role-switch" role="tablist" aria-label={t("Khu vực luyện phỏng vấn", "Interview preparation areas")}>
                      <Button size="sm" variant={view === "ai-engineer" ? "default" : "ghost"} role="tab" aria-selected={view === "ai-engineer"} onClick={() => selectView("ai-engineer")}>AI Engineer</Button>
                      <Button size="sm" variant={view === "data-engineer" ? "default" : "ghost"} role="tab" aria-selected={view === "data-engineer"} onClick={() => selectView("data-engineer")}>Data Engineer</Button>
                      <Button size="sm" variant={view === "cv-clinic" ? "default" : "ghost"} role="tab" aria-selected={view === "cv-clinic"} onClick={() => selectView("cv-clinic")}><Stethoscope className="mr-1.5 h-4 w-4" aria-hidden="true" />CV Clinic</Button>
                    </div>
                    {view !== "cv-clinic" && (
                      <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setSidebarOpen((open) => !open)} aria-label={sidebarOpen ? t("Thu gọn bộ lọc", "Collapse filters") : t("Mở bộ lọc", "Open filters")}>
                        {sidebarOpen ? <PanelLeftClose aria-hidden="true" /> : <PanelLeftOpen aria-hidden="true" />}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 text-sm font-bold text-primary"><BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />{t("Luyện phỏng vấn nghề nghiệp", "Career interview practice")}</div>
                      <h1 className="font-sora text-3xl font-bold text-foreground sm:text-4xl">Interview Questions</h1>
                      <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {view === "cv-clinic" ? t("Đánh giá CV theo vị trí mục tiêu và nhận gợi ý cải thiện cụ thể.", "Review your CV against a target role and get specific improvements.") : t("Luyện câu trả lời có cấu trúc, nắm điểm mấu chốt và theo dõi tiến độ của bạn.", "Practice structured answers, master key talking points, and track your progress.")}
                      </p>
                    </div>
                    {view !== "cv-clinic" && <div className="shrink-0 text-sm text-muted-foreground"><strong className="font-sora text-2xl text-foreground">{filtered.length}</strong> {t("câu phù hợp", "matching questions")}</div>}
                  </div>

                  {view !== "cv-clinic" && (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <label htmlFor="interview-search" className="sr-only">{t("Tìm câu hỏi", "Search questions")}</label>
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <Input id="interview-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("Tìm khái niệm, công nghệ hoặc từ khóa...", "Search a concept, technology, or keyword...")} className="h-11 bg-secondary/60 pl-10 pr-10 text-base" />
                        {search && <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2" onClick={() => setSearch("")} aria-label={t("Xóa tìm kiếm", "Clear search")}><X className="h-4 w-4" /></Button>}
                      </div>
                      <Sheet>
                        <SheetTrigger asChild><Button variant="outline" className="h-11 lg:hidden"><Filter className="mr-2 h-4 w-4" />{t("Bộ lọc", "Filters")}</Button></SheetTrigger>
                        <SheetContent side="left" className="overflow-y-auto">
                          <SheetHeader className="mb-6"><SheetTitle className="font-sora">{t("Bộ lọc học tập", "Study filters")}</SheetTitle></SheetHeader>
                          {filters}
                        </SheetContent>
                      </Sheet>
                    </div>
                  )}
                </div>
              </header>

              <div className="interview-content">
                {view === "cv-clinic" ? <CVClinic /> : filtered.length === 0 ? (
                  <div className="interview-empty">
                    <Search className="h-9 w-9 text-muted-foreground" aria-hidden="true" />
                    <h2 className="font-sora text-xl font-bold">{t("Không tìm thấy câu hỏi", "No questions found")}</h2>
                    <p className="text-muted-foreground">{t("Hãy thử từ khóa khác hoặc đặt lại bộ lọc.", "Try another keyword or reset your filters.")}</p>
                    <Button variant="outline" onClick={resetFilters}><RotateCcw className="mr-2 h-4 w-4" />{t("Đặt lại", "Reset")}</Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {grouped.map((group) => (
                      <section key={group.category} aria-labelledby={`group-${group.category.replace(/\W+/g, "-")}`}>
                        <div className="interview-group-heading">
                          <h2 id={`group-${group.category.replace(/\W+/g, "-")}`} className="font-sora text-lg font-bold text-foreground">{group.category}</h2>
                          <Badge variant="outline">{group.questions.length}</Badge>
                        </div>
                        <Accordion type="multiple" className="space-y-3">
                          {group.questions.map((question, index) => renderQuestion(question, filtered.indexOf(question)))}
                        </Accordion>
                      </section>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewQuestionsPage;
