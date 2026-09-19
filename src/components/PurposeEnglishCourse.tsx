import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lock,
  MessageSquareMore,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PurposeCoreLearningPath from "@/components/PurposeCoreLearningPath";
import PurposeCommunicationLab from "@/components/PurposeCommunicationLab";
import PurposeEnglishReadiness from "@/components/PurposeEnglishReadiness";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PurposeTopic } from "@/data/purposeEnglishTypes";
import type { ConvLesson } from "@/data/conversationalCurriculum";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { bannerImageFor } from "@/lib/conversationalSituationVisuals";
import { sequentialUnlockedIds } from "@/lib/purposeEnglishLearning";
import { emptyReadinessScores, keepBestQuizScore, type ReadinessScores } from "@/lib/purposeEnglishReadiness";
import { safeStorage } from "@/lib/safeStorage";

type Track = "business" | "academic";

interface Props {
  track: Track;
  storageKey: string;
  activityType: string;
  title: string;
  titleVi: string;
  tagline: string;
  taglineVi: string;
  coreTopics: PurposeTopic[];
  communicationLessons: ConvLesson[];
}

const BUSINESS_GROUPS = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "career", vi: "Sự nghiệp", en: "Career" },
  { id: "team", vi: "Họp & đội nhóm", en: "Meetings & teams" },
  { id: "leadership", vi: "Lãnh đạo", en: "Leadership" },
  { id: "client", vi: "Khách hàng & bán hàng", en: "Clients & sales" },
];

const ACADEMIC_GROUPS = [
  { id: "all", vi: "Tất cả", en: "All" },
  { id: "discussion", vi: "Thảo luận", en: "Discussion" },
  { id: "research", vi: "Nghiên cứu", en: "Research" },
  { id: "presentation", vi: "Thuyết trình", en: "Presentations" },
  { id: "campus", vi: "Đời sống học thuật", en: "Academic life" },
];

const groupForLesson = (track: Track, lesson: ConvLesson): string => {
  const haystack = `${lesson.id} ${lesson.title} ${lesson.description}`.toLowerCase();
  if (track === "business") {
    if (/interview|network|job|career|resign|onboard|freelanc/.test(haystack)) return "career";
    if (/lead|manager|feedback|delegate|motivat/.test(haystack)) return "leadership";
    if (/sales|customer|client|negotiat|pitch|demo/.test(haystack)) return "client";
    return "team";
  }
  if (/research|source|writ|citation|essay|thesis/.test(haystack)) return "research";
  if (/present|conference|public speak/.test(haystack)) return "presentation";
  if (/debate|discussion|critical|global|technology|environment/.test(haystack)) return "discussion";
  return "campus";
};

const readLegacyProgress = (): string[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem("conv-eng-progress") || "[]");
    return Array.isArray(parsed) ? parsed.filter((value) => typeof value === "string") : [];
  } catch {
    return [];
  }
};

const PurposeEnglishCourse = ({
  track,
  storageKey,
  activityType,
  title,
  titleVi,
  tagline,
  taglineVi,
  coreTopics,
  communicationLessons,
}: Props) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isTeacher, isAdmin } = useUserRole();
  const unlockAll = isTeacher || isAdmin;
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedLesson = searchParams.get("lesson");
  const initialView = searchParams.get("view") === "lab" || requestedLesson ? "lab" : "overview";
  const [view, setView] = useState(initialView);
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [coreDone, setCoreDone] = useState<string[]>([]);
  const [labDone, setLabDone] = useState<string[]>([]);
  const [practised, setPractised] = useState<string[]>([]);
  const [readinessScores, setReadinessScores] = useState<ReadinessScores>(emptyReadinessScores);
  const [hydrated, setHydrated] = useState(false);

  const labStorageKey = `${storageKey}-communication`;
  const groups = track === "business" ? BUSINESS_GROUPS : ACADEMIC_GROUPS;
  const allCoreLessons = useMemo(() => coreTopics.flatMap((topic) => topic.lessons), [coreTopics]);

  useEffect(() => {
    setCoreDone(safeStorage.get<string[]>(storageKey, []));
    setPractised(safeStorage.get<string[]>(`${storageKey}-phrases`, []) ?? []);
    setReadinessScores(safeStorage.get<ReadinessScores>(`${storageKey}-readiness-scores`, emptyReadinessScores()) ?? emptyReadinessScores());
    const current = safeStorage.get<string[]>(labStorageKey, []);
    const eligible = new Set(communicationLessons.map((lesson) => lesson.id));
    const migrated = Array.from(new Set([...current, ...readLegacyProgress().filter((id) => eligible.has(id))]));
    setLabDone(migrated);
    safeStorage.set(labStorageKey, migrated);
    setHydrated(true);

    const sync = () => {
      setCoreDone(safeStorage.get<string[]>(storageKey, []) ?? []);
      setPractised(safeStorage.get<string[]>(`${storageKey}-phrases`, []) ?? []);
    };
    window.addEventListener("purpose-progress", sync);
    return () => window.removeEventListener("purpose-progress", sync);
  }, [communicationLessons, labStorageKey, storageKey]);

  const labUnlockedIds = useMemo(
    () => sequentialUnlockedIds(communicationLessons.map((lesson) => lesson.id), labDone),
    [communicationLessons, labDone],
  );
  const isLabUnlocked = (lessonId: string) => unlockAll || labUnlockedIds.has(lessonId);

  const lockedToast = () => toast({
    title: t("Bài này chưa mở", "This lesson is locked"),
    description: t("Hãy hoàn thành bài trước để mở bài này.", "Finish the previous lesson to unlock this one."),
    variant: "destructive",
  });

  useEffect(() => {
    if (!requestedLesson || !hydrated) return;
    if (!communicationLessons.some((lesson) => lesson.id === requestedLesson)) return;
    if (!(unlockAll || labUnlockedIds.has(requestedLesson))) {
      setActiveLabId(null);
      setView("lab");
      lockedToast();
      return;
    }
    setActiveLabId(requestedLesson);
    setView("lab");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communicationLessons, requestedLesson, hydrated, unlockAll, labUnlockedIds]);

  const activeLab = communicationLessons.find((lesson) => lesson.id === activeLabId) ?? null;
  const total = allCoreLessons.length + communicationLessons.length;
  const completed = coreDone.filter((id) => allCoreLessons.some((lesson) => lesson.id === id)).length
    + labDone.filter((id) => communicationLessons.some((lesson) => lesson.id === id)).length;
  const progress = Math.round((completed / Math.max(total, 1)) * 100);
  const nextLab = communicationLessons.find((lesson) => !labDone.includes(lesson.id)) ?? communicationLessons[0];

  const filteredLabs = communicationLessons.filter((lesson) => {
    const matchesGroup = filter === "all" || groupForLesson(track, lesson) === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${lesson.title} ${lesson.titleVi} ${lesson.description} ${lesson.descriptionVi}`.toLowerCase().includes(query);
    return matchesGroup && matchesSearch;
  });

  const openView = (nextView: string) => {
    setActiveLabId(null);
    setView(nextView);
    setSearchParams(nextView === "lab" ? { view: "lab" } : {});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openLab = (lesson: ConvLesson) => {
    if (!isLabUnlocked(lesson.id)) {
      lockedToast();
      return;
    }
    setActiveLabId(lesson.id);
    setView("lab");
    setSearchParams({ view: "lab", lesson: lesson.id });
    safeStorage.set(`${storageKey}-last-lesson`, { type: "lab", id: lesson.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeLab = (score: number, maxScore: number) => {
    if (!activeLab) return;
    const next = labDone.includes(activeLab.id) ? labDone : [...labDone, activeLab.id];
    setLabDone(next);
    safeStorage.set(labStorageKey, next);
    saveQuizScore("lab", activeLab.id, score, maxScore);
    void logStudentActivity({
      activityType,
      activityId: activeLab.id,
      score,
      maxScore,
      metadata: { track, lessonTitle: activeLab.title, mode: "communication_lab" },
    });
  };

  const saveQuizScore = (section: keyof ReadinessScores, lessonId: string, score: number, maxScore: number) => {
    setReadinessScores((current) => {
      const next = keepBestQuizScore(current, section, lessonId, score, maxScore);
      if (next !== current) safeStorage.set(`${storageKey}-readiness-scores`, next);
      return next;
    });
  };

  const heroIcon = track === "business" ? BriefcaseBusiness : GraduationCap;
  const HeroIcon = heroIcon;

  if (activeLab) {
    const index = communicationLessons.findIndex((lesson) => lesson.id === activeLab.id);
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 lg:py-12">
          <PurposeCommunicationLab
            lesson={activeLab}
            isComplete={labDone.includes(activeLab.id)}
            onBack={() => openView("lab")}
            onComplete={completeLab}
            onPrevious={index > 0 ? () => openLab(communicationLessons[index - 1]) : undefined}
            onNext={index < communicationLessons.length - 1 ? () => openLab(communicationLessons[index + 1]) : undefined}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid gap-8 px-4 py-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:py-12">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HeroIcon className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold uppercase text-primary">
                  {t("Lộ trình thực hành", "Applied learning track")}
                </span>
              </div>
              <h1 className="max-w-3xl text-3xl font-bold text-foreground sm:text-5xl">{t(titleVi, title)}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{t(taglineVi, tagline)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => nextLab && openLab(nextLab)} className="gap-2">
                  <ArrowRight className="h-4 w-4" /> {t("Tiếp tục học", "Continue learning")}
                </Button>
                <Button variant="outline" onClick={() => openView("lab")} className="gap-2">
                  <MessageSquareMore className="h-4 w-4" /> Communication Lab
                </Button>
              </div>
            </motion.div>

            <div className="border-l-4 border-primary bg-background p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{t("Tiến độ tổng", "Overall progress")}</p>
                  <p className="mt-1 text-4xl font-bold text-foreground">{progress}%</p>
                </div>
                <Trophy className="h-8 w-8 text-secondary" />
              </div>
              <Progress value={progress} className="mt-4 h-2.5" />
               <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                <div><p className="text-lg font-bold">{completed}</p><p className="text-xs text-muted-foreground">{t("Đã xong", "Done")}</p></div>
                 <div><p className="text-lg font-bold">{total}</p><p className="text-xs text-muted-foreground">{t("Tổng hoạt động", "Total activities")}</p></div>
                 <div><p className="text-lg font-bold">{allCoreLessons.length}</p><p className="text-xs text-muted-foreground">{t("Bài nền tảng", "Core lessons")}</p></div>
                <div><p className="text-lg font-bold">{communicationLessons.length}</p><p className="text-xs text-muted-foreground">Labs</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 lg:py-10">
          <Tabs value={view} onValueChange={openView}>
            <TabsList className="grid h-auto w-full grid-cols-3 p-1 sm:max-w-2xl">
              <TabsTrigger value="overview" className="min-h-11 gap-2"><Target className="h-4 w-4" /> {t("Lộ trình", "Roadmap")}</TabsTrigger>
              <TabsTrigger value="core" className="min-h-11 gap-2"><BookOpen className="h-4 w-4" /> {t("Bài nền tảng", "Core Lessons")}</TabsTrigger>
              <TabsTrigger value="lab" className="min-h-11 gap-2"><MessageSquareMore className="h-4 w-4" /> Lab</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-7">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase text-primary">{t("Hai chặng học", "Two learning stages")}</p>
                <h2 className="mt-1 text-2xl font-bold">{t("Học kiến thức, rồi dùng ngay", "Learn it, then use it")}</h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <button type="button" onClick={() => openView("core")} className="group border-l-4 border-secondary bg-card p-6 text-left shadow-sm transition-transform hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <BookOpen className="h-7 w-7 text-secondary" />
                    <span className="text-sm font-bold text-muted-foreground">{coreDone.length}/{allCoreLessons.length}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold group-hover:text-primary">01. {t("Bài học nền tảng", "Core Lessons")}</h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {t("Nắm chắc cách dùng, từ khóa, mẫu câu và bài mẫu trước khi bước vào tình huống thật.", "Build the language, phrases and models you need before entering real situations.")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">{t("Mở bài học", "Open lessons")} <ArrowRight className="h-4 w-4" /></span>
                </button>
                <button type="button" onClick={() => openView("lab")} className="group border-l-4 border-primary bg-card p-6 text-left shadow-sm transition-transform hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <MessageSquareMore className="h-7 w-7 text-primary" />
                    <span className="text-sm font-bold text-muted-foreground">{labDone.length}/{communicationLessons.length}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold group-hover:text-primary">02. Communication Lab</h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {t("Nghe hội thoại nhiều giọng, luyện nói theo vai và xử lý các thử thách giao tiếp thực tế.", "Listen to multi-voice dialogues, roleplay and solve real communication challenges.")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">{t("Vào phòng lab", "Enter the lab")} <ArrowRight className="h-4 w-4" /></span>
                </button>
              </div>

              <PurposeEnglishReadiness
                track={track}
                topics={coreTopics}
                labs={communicationLessons}
                coreDone={coreDone}
                labDone={labDone}
                practised={practised}
                scores={readinessScores}
                onFocus={openView}
              />

              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                {[
                  [Clock3, t("Học theo nhịp của bạn", "Learn at your pace"), t("Tiến độ được lưu tự động", "Progress saves automatically")],
                  [Sparkles, t("Tình huống thực tế", "Real situations"), t("Từ lớp học đến nơi làm việc", "From classroom to workplace")],
                  [CheckCircle2, t("Phản hồi tức thì", "Instant feedback"), t("Chỉ hiện đáp án sau khi chọn", "Answers reveal after your choice")],
                ].map(([Icon, heading, copy]) => {
                  const FeatureIcon = Icon as typeof Clock3;
                  return (
                    <div key={String(heading)} className="bg-card p-5">
                      <FeatureIcon className="h-5 w-5 text-primary" />
                      <h3 className="mt-3 font-bold">{String(heading)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{String(copy)}</p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="core" className="mt-4">
              <PurposeCoreLearningPath
                track={track}
                storageKey={storageKey}
                activityType={activityType}
                topics={coreTopics}
                unlockAll={unlockAll}
                onQuizComplete={(lessonId, score, maxScore) => saveQuizScore("core", lessonId, score, maxScore)}
              />
            </TabsContent>

            <TabsContent value="lab" className="mt-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase text-primary">Communication Lab</p>
                  <h2 className="mt-1 text-2xl font-bold">{t("Chọn một tình huống để bắt đầu", "Choose a situation to begin")}</h2>
                  <p className="mt-2 max-w-2xl text-muted-foreground">
                    {t("Mỗi bài đi qua 4 bước: học cụm từ, nghe hội thoại, luyện nói và hoàn thành thử thách.", "Every lab follows four steps: learn phrases, listen, speak and complete a challenge.")}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70">
                    {unlockAll ? <ShieldCheck className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-primary" />}
                    {unlockAll
                      ? t("Chế độ quản trị: xem toàn bộ bài", "Admin mode: all lessons unlocked")
                      : t("Hoàn thành bài trước để mở bài sau", "Finish each lesson to unlock the next one")}
                  </p>
                </div>
                <div className="relative w-full lg:max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("Tìm tình huống...", "Find a situation...")} className="pl-9" />
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {groups.map((group) => (
                  <Button key={group.id} variant={filter === group.id ? "default" : "outline"} size="sm" onClick={() => setFilter(group.id)} className="shrink-0">
                    {t(group.vi, group.en)}
                  </Button>
                ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredLabs.map((lesson, index) => {
                  const done = labDone.includes(lesson.id);
                  const locked = !isLabUnlocked(lesson.id);
                  return (
                    <motion.button
                      key={lesson.id}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.025, 0.25) }}
                      onClick={() => openLab(lesson)}
                      disabled={locked}
                      aria-disabled={locked}
                      className={`group overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition-all ${locked ? "cursor-not-allowed opacity-70" : "hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"}`}
                    >
                      <div className="relative aspect-[16/8] overflow-hidden bg-muted">
                        <img src={bannerImageFor(lesson.title, lesson.descriptionVi, lesson.description)} alt="" loading="lazy" className={`h-full w-full object-cover transition-transform duration-500 ${locked ? "grayscale" : "group-hover:scale-105"}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 to-transparent" />
                        <span className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-1 text-xs font-bold text-foreground">
                          {t(groups.find((group) => group.id === groupForLesson(track, lesson))?.vi ?? "", groups.find((group) => group.id === groupForLesson(track, lesson))?.en ?? "")}
                        </span>
                        {done && <CheckCircle2 className="absolute right-3 top-3 h-6 w-6 rounded-full bg-background text-primary" />}
                        {!done && locked && <Lock className="absolute right-3 top-3 h-6 w-6 rounded-full bg-background p-1 text-foreground/70" />}
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-bold text-primary">LAB {String(index + 1).padStart(2, "0")}</p>
                        <h3 className={`mt-1 text-lg font-bold text-foreground ${locked ? "" : "group-hover:text-primary"}`}>{t(lesson.titleVi, lesson.title)}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{t(lesson.descriptionVi, lesson.description)}</p>
                        {locked && (
                          <p className="mt-2 text-sm font-bold text-foreground/70">
                            {t("Hoàn thành bài trước để mở bài này", "Complete the previous lesson to unlock")}
                          </p>
                        )}
                        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                          <span>{lesson.keySituations.length} {t("tình huống", "scenarios")}</span>
                          <span>{lesson.vocabulary.length} {t("cụm từ", "phrases")}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              {filteredLabs.length === 0 && (
                <div className="py-16 text-center text-muted-foreground">{t("Không tìm thấy bài phù hợp.", "No matching lessons found.")}</div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PurposeEnglishCourse;