import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Award, BookOpen, BriefcaseBusiness, CheckCircle2,
  Clock3, Coffee, GraduationCap, Loader2, Lock, MessageCircle, Search, Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chineseConversationalPillars, type ChineseConvPillar, type ChineseConvLesson } from "@/data/chineseConversationalCurriculum";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CHINESE_CURRICULUM_PROGRESS_EVENT, estimateChineseLessonMinutes, flattenChineseLessons,
  getNextChineseLesson, matchesChineseLessonFilter, readChineseProgress, type ChineseLessonFilter,
} from "@/lib/chineseCurriculumProgress";

const PILLAR_ICONS = [Coffee, BriefcaseBusiness, MessageCircle];
const FILTERS: { id: ChineseLessonFilter; vi: string; en: string }[] = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "current", vi: "Đang học", en: "In progress" },
  { id: "complete", vi: "Hoàn thành", en: "Completed" },
  { id: "not-started", vi: "Chưa học", en: "Not started" },
];

const ChineseConversationalDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const allLessons = useMemo(() => flattenChineseLessons(chineseConversationalPillars), []);
  const [completed, setCompleted] = useState<string[]>([]);
  const [filter, setFilter] = useState<ChineseLessonFilter>("all");
  const [search, setSearch] = useState("");
  const [activePillar, setActivePillar] = useState(chineseConversationalPillars[0]?.id ?? "");
  const { hasAccess, loading: accessLoading } = useCourseAccess("conversational-chinese");
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    const sync = () => setCompleted(readChineseProgress(allLessons));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CHINESE_CURRICULUM_PROGRESS_EVENT, sync);
    };
  }, [allLessons]);

  useEffect(() => {
    if (!accessLoading && !hasAccess) setShowAccessModal(true);
  }, [accessLoading, hasAccess]);

  const nextLesson = getNextChineseLesson(chineseConversationalPillars, completed);
  const currentPillar = chineseConversationalPillars.find((pillar) => pillar.lessons.some((lesson) => lesson.id === nextLesson?.id));
  const progress = Math.round((completed.length / Math.max(allLessons.length, 1)) * 100);

  const matchesSearch = (lesson: ChineseConvLesson) => {
    const query = search.trim().toLowerCase();
    return !query || `${lesson.title} ${lesson.titleVi} ${lesson.titleZh} ${lesson.description} ${lesson.descriptionVi}`.toLowerCase().includes(query);
  };

  if (accessLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <Lock className="mx-auto mb-4 h-16 w-16 text-muted-foreground opacity-40" />
          <h1 className="mb-2 text-2xl font-bold">{t("Nội dung bị khóa", "Content Locked")}</h1>
          <p className="mb-4 text-muted-foreground">{t("Bạn chưa có quyền truy cập chương trình này.", "You don't have access to this curriculum.")}</p>
          <Button onClick={() => setShowAccessModal(true)}>{t("Xem hướng dẫn đăng ký", "Learn how to enroll")}</Button>
          <AccessDeniedModal open={showAccessModal} onOpenChange={(open) => { setShowAccessModal(open); if (!open) navigate("/chinese/conversational"); }} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="chinese-learning-path min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto max-w-6xl px-4 py-8 lg:py-11">
            <Link to="/chinese/conversational" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> {t("Tiếng Trung Nền tảng", "Chinese Foundation")}
            </Link>
            <div className="grid gap-7 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase text-primary">
                  <GraduationCap className="h-5 w-5" /> {t("Lộ trình giao tiếp", "Professional learning path")}
                </div>
                <h1 className="text-3xl font-extrabold sm:text-5xl">Interactive <span className="text-primary">中文</span> Curriculum</h1>
                <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-muted-foreground">
                  {t(`${allLessons.length} bài học tương tác theo 3 trụ cột: Đời sống, Công việc và Giao tiếp xã hội.`, `${allLessons.length} interactive lessons across Daily Life, Business and Social communication.`)}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {nextLesson && <Button asChild className="gap-2"><Link to={`/chinese/conversational/learn/${nextLesson.id}`}><ArrowRight className="h-4 w-4" />{t("Tiếp tục học", "Continue learning")}</Link></Button>}
                  <Badge variant="outline" className="min-h-10 px-4 text-sm"><Award className="mr-2 h-4 w-4 text-accent" />{completed.length} {t("bài hoàn thành", "lessons completed")}</Badge>
                </div>
              </motion.div>
              <div className="border-l-4 border-primary bg-background p-5 shadow-sm">
                <div className="flex items-end justify-between gap-4">
                  <div><p className="text-sm font-bold text-muted-foreground">{t("Tiến độ tổng", "Overall progress")}</p><p className="mt-1 text-4xl font-extrabold">{progress}%</p></div>
                  <div className="text-right"><p className="text-sm font-bold text-primary">{t("Chặng hiện tại", "Current pillar")}</p><p className="mt-1 text-sm font-semibold">{currentPillar ? t(currentPillar.titleVi, currentPillar.title) : t("Đã hoàn thành", "Completed")}</p></div>
                </div>
                <Progress value={progress} className="mt-4 h-2.5" />
                <p className="mt-3 text-sm font-medium text-muted-foreground">{nextLesson ? `${t("Tiếp theo", "Next")}: ${nextLesson.title} (${nextLesson.titleZh})` : t("Bạn đã hoàn thành lộ trình.", "You have completed the path.")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-8 lg:py-10">
          <Tabs value={activePillar} onValueChange={setActivePillar}>
            <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1.5">
              {chineseConversationalPillars.map((pillar, index) => {
                const Icon = PILLAR_ICONS[index] ?? Target;
                const done = pillar.lessons.filter((lesson) => completed.includes(lesson.id)).length;
                return (
                  <TabsTrigger key={pillar.id} value={pillar.id} className="min-h-14 gap-2 whitespace-normal px-2 py-2 text-xs sm:text-sm">
                    <Icon className="h-4 w-4 shrink-0" /><span className="hidden md:inline">{t(pillar.titleVi, pillar.title)}</span><span className="md:hidden">{index + 1}</span><span className="text-xs opacity-70">{done}/{pillar.lessons.length}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-7 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("Tìm bài học, Hán tự hoặc kỹ năng...", "Search lessons, Hanzi or skills...")} className="h-11 pl-10" /></div>
              <div className="flex gap-2 overflow-x-auto pb-1" aria-label={t("Lọc bài học", "Lesson filters")}>
                {FILTERS.map((item) => <Button key={item.id} type="button" size="sm" variant={filter === item.id ? "default" : "outline"} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} className="shrink-0">{t(item.vi, item.en)}</Button>)}
              </div>
            </div>

            {chineseConversationalPillars.map((pillar, pillarIndex) => {
              const visibleLessons = pillar.lessons.filter((lesson) => matchesSearch(lesson) && matchesChineseLessonFilter(lesson, filter, completed, nextLesson?.id));
              return (
                <TabsContent key={pillar.id} value={pillar.id} className="mt-6">
                  <PillarContent pillar={pillar} pillarNumber={pillarIndex + 1} completed={completed} visibleLessons={visibleLessons} currentLessonId={nextLesson?.id} />
                </TabsContent>
              );
            })}
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const PillarContent = ({ pillar, pillarNumber, completed, visibleLessons, currentLessonId }: { pillar: ChineseConvPillar; pillarNumber: number; completed: string[]; visibleLessons: ChineseConvLesson[]; currentLessonId?: string }) => {
  const { t } = useLanguage();
  const done = pillar.lessons.filter((lesson) => completed.includes(lesson.id)).length;
  const progress = Math.round((done / Math.max(pillar.lessons.length, 1)) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <header className="mb-5 border-l-4 border-primary bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-sm font-extrabold uppercase text-primary">{t("Chặng", "Pillar")} {pillarNumber}</p><h2 className="mt-1 text-2xl font-extrabold">{t(pillar.titleVi, pillar.title)} · {pillar.titleZh}</h2><p className="mt-2 max-w-3xl font-medium leading-7 text-muted-foreground">{t(pillar.descriptionVi, pillar.description)}</p></div>
          <div className="min-w-36 text-right"><p className="font-extrabold">{done}/{pillar.lessons.length}</p><p className="text-xs font-semibold text-muted-foreground">{progress}% {t("hoàn thành", "complete")}</p></div>
        </div>
        <Progress value={progress} className="mt-4 h-2" />
      </header>

      {visibleLessons.length === 0 ? <div className="border border-dashed border-border bg-card p-10 text-center font-medium text-muted-foreground">{t("Không có bài học phù hợp.", "No lessons match these filters.")}</div> : (
        <Accordion type="single" collapsible className="overflow-hidden rounded-lg border border-border bg-card shadow-md">
          {visibleLessons.map((lesson) => {
            const globalIndex = flattenChineseLessons(chineseConversationalPillars).findIndex((item) => item.id === lesson.id) + 1;
            const isCompleted = completed.includes(lesson.id);
            const isCurrent = currentLessonId === lesson.id;
            return (
              <AccordionItem key={lesson.id} value={lesson.id} className={`border-b border-border last:border-b-0 ${isCurrent ? "border-l-4 border-l-primary bg-primary/5" : "border-l-4 border-l-transparent"}`}>
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline hover:bg-muted/50 sm:px-5">
                  <div className="flex min-w-0 flex-1 items-start gap-3 pr-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold ${isCompleted ? "border-primary/25 bg-primary/10 text-primary" : isCurrent ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-foreground/70"}`}>{isCompleted ? <CheckCircle2 className="h-5 w-5" /> : globalIndex}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><h3 className="text-base font-extrabold leading-6">{lesson.title} <span className="font-bold text-muted-foreground">({lesson.titleZh})</span></h3>{isCurrent && <Badge>{t("Đang học", "In progress")}</Badge>}{isCompleted && <Badge variant="secondary">{t("Hoàn thành", "Completed")}</Badge>}</div>
                      <p className="mt-1 text-sm font-medium leading-6 text-muted-foreground">{lesson.description}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold text-foreground/65"><span>HSK {lesson.hskLevel}</span><span>{lesson.vocabulary.length} {t("từ", "words")}</span><span>{lesson.commonStructures.length} {t("cấu trúc", "structures")}</span><span><Clock3 className="mr-1 inline h-3.5 w-3.5" />{estimateChineseLessonMinutes(lesson)} min</span></div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-5">
                  <div className="ml-0 border-t border-border pt-4 sm:ml-14">
                    <p className="text-sm font-extrabold uppercase text-primary">{t("Bạn sẽ luyện", "What you will practise")}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3"><LessonMetric label={t("Tình huống", "Situations")} value={lesson.keySituations.length} /><LessonMetric label={t("Từ vựng", "Vocabulary")} value={lesson.vocabulary.length} /><LessonMetric label={t("Bài nghe", "Listening check")} value={lesson.listeningChallenge.questions.length} /></div>
                    <div className="mt-4 flex flex-wrap gap-2"><Button asChild><Link to={`/chinese/conversational/learn/${lesson.id}`}><BookOpen className="mr-2 h-4 w-4" />{isCompleted ? t("Học lại", "Review lesson") : isCurrent ? t("Tiếp tục", "Continue") : t("Bắt đầu bài", "Start lesson")}</Link></Button><Button asChild variant="outline"><Link to={`/chinese/conversational/learn/${lesson.id}?tab=roleplay`}><MessageCircle className="mr-2 h-4 w-4" />Roleplay</Link></Button></div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </motion.div>
  );
};

const LessonMetric = ({ label, value }: { label: string; value: number }) => <div className="border border-border bg-background p-3"><p className="text-lg font-extrabold text-primary">{value}</p><p className="text-xs font-semibold text-muted-foreground">{label}</p></div>;

export default ChineseConversationalDashboard;