// Chinese Conversational interactive dashboard with accordion timeline and pillar tabs
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { icons, ArrowLeft, Award, CheckCircle, BookOpen, Mic, ChevronDown, ChevronRight, Lock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chineseConversationalPillars, type ChineseConvPillar, type ChineseConvLesson } from "@/data/chineseConversationalCurriculum";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCourseAccess } from "@/hooks/useCourseAccess";
import AccessDeniedModal from "@/components/AccessDeniedModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const getIcon = (name: string) => (icons as Record<string, any>)[name] ?? BookOpen;

// Track completed lessons in localStorage
const STORAGE_KEY = "conv-cn-progress";

const getCompletedLessons = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
};

const ChineseConversationalDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<string[]>(getCompletedLessons);
  const { hasAccess, loading: accessLoading } = useCourseAccess("conversational-chinese");
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    const handler = () => setCompleted(getCompletedLessons());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    if (!accessLoading && !hasAccess) {
      setShowAccessModal(true);
    }
  }, [accessLoading, hasAccess]);

  const totalLessons = chineseConversationalPillars.reduce((s, p) => s + p.lessons.length, 0);
  const overallProgress = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;

  if (accessLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-40" />
          <h1 className="text-2xl font-bold mb-2">{t("Nội dung bị khóa", "Content Locked")}</h1>
          <p className="text-muted-foreground mb-4">{t("Bạn chưa có quyền truy cập chương trình này.", "You don't have access to this curriculum.")}</p>
          <Button onClick={() => setShowAccessModal(true)}>{t("Xem hướng dẫn đăng ký", "Learn how to enroll")}</Button>
          <AccessDeniedModal open={showAccessModal} onOpenChange={(open) => { setShowAccessModal(open); if (!open) navigate("/chinese/conversational"); }} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Link to="/chinese/conversational" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          {t("Tiếng Trung Giao tiếp", "Conversational Chinese")}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {t("Chương trình ", "Interactive ")}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {t("Tương tác 中文", "中文 Curriculum")}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            {t(
              `${totalLessons} bài học tương tác chia thành 3 trụ cột: Đời sống, Công sở, Xã hội. Hoàn thành mỗi bài để nhận huy hiệu!`,
              `${totalLessons} interactive lessons across 3 pillars: Daily Life, Business, Social. Complete each lesson to earn badges!`
            )}
          </p>

          <div className="mt-6 p-4 rounded-xl bg-card border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("Tiến trình tổng thể", "Overall Progress")}</span>
              <span className="text-sm font-bold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completed.length}/{totalLessons} {t("bài hoàn thành", "lessons completed")}
            </p>
          </div>
        </motion.div>

        <Tabs defaultValue="daily-life">
          <TabsList className="w-full flex mb-8 h-auto flex-wrap gap-1">
            {chineseConversationalPillars.map((pillar) => {
              const PIcon = getIcon(pillar.icon);
              const pillarCompleted = pillar.lessons.filter(l => completed.includes(l.id)).length;
              return (
                <TabsTrigger key={pillar.id} value={pillar.id} className="flex-1 min-w-[120px] text-xs sm:text-sm py-2.5 gap-1.5">
                  <PIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t(pillar.titleVi, pillar.title)}</span>
                  <span className="sm:hidden">{t(pillar.titleVi.split(" ")[0], pillar.title.split(" ")[0])}</span>
                  <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                    {pillarCompleted}/{pillar.lessons.length}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {chineseConversationalPillars.map((pillar) => (
            <TabsContent key={pillar.id} value={pillar.id}>
              <PillarContent pillar={pillar} completed={completed} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

// Pillar content with accordion timeline
const PillarContent = ({ pillar, completed }: { pillar: ChineseConvPillar; completed: string[] }) => {
  const { t } = useLanguage();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className={`rounded-xl p-5 mb-6 bg-gradient-to-r ${pillar.color} text-white`}>
        <h2 className="text-xl font-bold mb-1">{t(pillar.titleVi, pillar.title)} · {pillar.titleZh}</h2>
        <p className="text-white/80 text-sm">{t(pillar.descriptionVi, pillar.description)}</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {pillar.lessons.map((lesson, index) => {
          const isCompleted = completed.includes(lesson.id);
          const LIcon = getIcon(lesson.icon);

          return (
            <AccordionItem key={lesson.id} value={lesson.id} className="border rounded-xl px-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 w-full pr-2">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <LIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base truncate">
                      {t(lesson.titleVi, lesson.title)} <span className="text-muted-foreground text-xs">({lesson.titleZh})</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{t(lesson.descriptionVi, lesson.description)}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] flex-shrink-0">HSK {lesson.hskLevel}</Badge>
                  {isCompleted && (
                    <Badge className="bg-red-100 text-red-700 border-red-200 text-[10px] flex-shrink-0">
                      <Award className="h-3 w-3 mr-1" />{t(lesson.badgeVi, lesson.badge)}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LessonPreview lesson={lesson} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
};

// Lesson preview inside accordion
const LessonPreview = ({ lesson }: { lesson: ChineseConvLesson }) => {
  const { t } = useLanguage();

  return (
    <div className="pb-4 space-y-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-lg font-bold text-red-500">{lesson.keySituations.length}</p>
          <p className="text-[10px] text-muted-foreground">{t("Tình huống", "Situations")}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-lg font-bold text-red-500">{lesson.vocabulary.length}</p>
          <p className="text-[10px] text-muted-foreground">{t("Từ vựng", "Vocabulary")}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-lg font-bold text-red-500">{lesson.commonStructures.length}</p>
          <p className="text-[10px] text-muted-foreground">{t("Cấu trúc", "Structures")}</p>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("Tình huống chính", "Key Situations")}</h4>
        <div className="space-y-1.5">
          {lesson.keySituations.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <ChevronRight className="h-3.5 w-3.5 text-red-500" />
              <span>{t(s.titleVi, s.title)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("Từ vựng", "Vocabulary")}</h4>
        <div className="flex flex-wrap gap-1.5">
          {lesson.vocabulary.slice(0, 4).map((v, i) => (
            <Badge key={i} variant="outline" className="text-xs">{v.hanzi} ({v.pinyin})</Badge>
          ))}
          {lesson.vocabulary.length > 4 && <Badge variant="secondary" className="text-xs">+{lesson.vocabulary.length - 4}</Badge>}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button asChild className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
          <Link to={`/chinese/conversational/learn/${lesson.id}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            {t("Bắt đầu Học", "Start Lesson")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/chinese/conversational/learn/${lesson.id}?tab=roleplay`}>
            <Mic className="h-4 w-4 mr-2" />
            {t("Luyện Nói AI", "AI Roleplay")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ChineseConversationalDashboard;
