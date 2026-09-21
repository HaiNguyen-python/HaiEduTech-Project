import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Briefcase, Check, Clock3, Code2, Download, GraduationCap, HardHat, Hotel, Languages, Loader2, Plane, RotateCcw, Save, Scale, Sparkles, Stethoscope, Target, Trash2, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SpecializedLessonView from "@/components/specialized/SpecializedLessonView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { safeStorage } from "@/lib/safeStorage";
import type { Json } from "@/integrations/supabase/types";
import type { LearnerLevel, SpecializedCurriculum, SpecializedLang, SpecializedProgress } from "@/lib/specializedLanguage";
import { LESSON_COUNT_OPTIONS, curriculumToMarkdown, emptySpecializedProgress, isSpecializedLang, validateCurriculum } from "@/lib/specializedLanguage";
import specializedHero from "@/assets/specialized-language-professionals.jpg";

const STORAGE_KEY = "specialized-learning-path-v2";
const storageKeyFor = (lang: string) => `${STORAGE_KEY}-${lang}`;

const LANG_OPTIONS: { key: SpecializedLang; label: string; code: string }[] = [
  { key: "english", label: "English", code: "EN" },
  { key: "chinese", label: "中文 Chinese", code: "ZH" },
  { key: "vietnamese", label: "Tiếng Việt", code: "VI" },
  { key: "finnish", label: "Suomi Finnish", code: "FI" },
  { key: "swedish", label: "Svenska Swedish", code: "SV" },
  { key: "japanese", label: "日本語 Japanese", code: "JA" },
];

const FIELD_PRESETS = [
  { label: "Medical / Healthcare", icon: Stethoscope },
  { label: "Information Technology", icon: Code2 },
  { label: "Construction & Engineering", icon: HardHat },
  { label: "Hospitality & Tourism", icon: Hotel },
  { label: "Business & Finance", icon: Briefcase },
  { label: "Education", icon: GraduationCap },
  { label: "Logistics & Transport", icon: Truck },
  { label: "Legal", icon: Scale },
  { label: "Aviation", icon: Plane },
];

const GOALS = ["Job interview preparation", "Writing daily reports", "Communicating with customers", "Understanding technical documentation", "Leading team meetings", "Networking at conferences"];

interface StoredPath {
  pathId?: string;
  curriculum: SpecializedCurriculum;
  citations: string[];
  progress: SpecializedProgress;
  form: { language: SpecializedLang; field: string; jobRole: string; goal: string; learnerLevel: LearnerLevel; dailyMinutes: number; lessonCount: number; notes: string };
}

const parseProgress = (value: Json | null): SpecializedProgress => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return emptySpecializedProgress();
  const progress = value as Record<string, unknown>;
  return {
    currentLesson: typeof progress.currentLesson === "number" ? progress.currentLesson : 0,
    bestScores: progress.bestScores && typeof progress.bestScores === "object" && !Array.isArray(progress.bestScores) ? progress.bestScores as Record<string, number> : {},
    completedLessons: Array.isArray(progress.completedLessons) ? progress.completedLessons.filter((item): item is string => typeof item === "string") : [],
  };
};

export default function SpecializedLanguage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const requestedLanguage = searchParams.get("lang");
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<SpecializedLang>(isSpecializedLang(requestedLanguage) ? requestedLanguage : "english");
  const [learnerLevel, setLearnerLevel] = useState<LearnerLevel>("elementary");
  const [field, setField] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [goal, setGoal] = useState("");
  const [dailyMinutes, setDailyMinutes] = useState(20);
  const [lessonCount, setLessonCount] = useState(5);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [pathId, setPathId] = useState<string>();
  const [curriculum, setCurriculum] = useState<SpecializedCurriculum | null>(null);
  const [citations, setCitations] = useState<string[]>([]);
  const [progress, setProgress] = useState<SpecializedProgress>(emptySpecializedProgress);
  const resultRef = useRef<HTMLDivElement>(null);

  const langMeta = LANG_OPTIONS.find((option) => option.key === language) ?? LANG_OPTIONS[0];
  const totalSteps = 5;
  const canProceed = (step === 1 && !!language && !!learnerLevel) || (step === 2 && field.trim().length >= 2) || (step === 3 && jobRole.trim().length >= 2) || (step === 4 && goal.trim().length >= 3) || step === 5;

  const form = useMemo(() => ({ language, field, jobRole, goal, learnerLevel, dailyMinutes, lessonCount, notes }), [language, field, jobRole, goal, learnerLevel, dailyMinutes, lessonCount, notes]);

  const targetLanguage: SpecializedLang | null = isSpecializedLang(requestedLanguage) ? requestedLanguage : null;

  useEffect(() => {
    let active = true;
    const restore = async () => {
      setRestoring(true);
      setPathId(undefined); setCurriculum(null); setCitations([]); setProgress(emptySpecializedProgress()); setStep(1);
      if (targetLanguage) setLanguage(targetLanguage);
      const { data: authData } = await supabase.auth.getUser();
      if (authData.user) {
        let query = supabase.from("specialized_learning_paths").select("*").eq("user_id", authData.user.id);
        if (targetLanguage) query = query.eq("language", targetLanguage);
        const { data } = await query.order("updated_at", { ascending: false }).limit(1).maybeSingle();
        if (active && data && validateCurriculum(data.curriculum)) {
          setPathId(data.id); setCurriculum(data.curriculum); setCitations(data.citations); setProgress(parseProgress(data.progress));
          setLanguage(isSpecializedLang(data.language) ? data.language : targetLanguage ?? "english"); setField(data.field); setJobRole(data.job_role); setGoal(data.goal);
          setLearnerLevel(data.learner_level as LearnerLevel); setDailyMinutes(data.daily_minutes); setNotes(data.notes); setLessonCount(data.curriculum.lessons.length);
        }
      } else {
        const saved = safeStorage.get<StoredPath>(storageKeyFor(targetLanguage ?? "english")) ?? (targetLanguage ? null : safeStorage.get<StoredPath>(STORAGE_KEY));
        const matchesLanguage = !targetLanguage || saved?.form?.language === targetLanguage;
        if (active && saved && matchesLanguage && validateCurriculum(saved.curriculum)) {
          setPathId(saved.pathId); setCurriculum(saved.curriculum); setCitations(saved.citations); setProgress(saved.progress); setLanguage(saved.form.language);
          setField(saved.form.field); setJobRole(saved.form.jobRole); setGoal(saved.form.goal); setLearnerLevel(saved.form.learnerLevel); setDailyMinutes(saved.form.dailyMinutes); setNotes(saved.form.notes); setLessonCount(saved.curriculum.lessons.length);
        }
      }
      if (active) setRestoring(false);
    };
    void restore();
    return () => { active = false; };
  }, [targetLanguage]);


  const persist = async (nextCurriculum: SpecializedCurriculum, nextProgress: SpecializedProgress, nextCitations = citations) => {
    const stored: StoredPath = { pathId, curriculum: nextCurriculum, citations: nextCitations, progress: nextProgress, form };
    const { data: authData } = await supabase.auth.getUser();
    if (!authData.user) { safeStorage.set(STORAGE_KEY, stored); return; }
    const payload = {
      user_id: authData.user.id, language, field, job_role: jobRole, goal, learner_level: learnerLevel, daily_minutes: dailyMinutes, notes,
      curriculum: nextCurriculum as unknown as Json, progress: nextProgress as unknown as Json, citations: nextCitations,
    };
    if (pathId) await supabase.from("specialized_learning_paths").update(payload).eq("id", pathId);
    else {
      const { data, error } = await supabase.from("specialized_learning_paths").insert(payload).select("id").single();
      if (!error && data) setPathId(data.id);
    }
  };

  const generate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-specialized-lesson", { body: form });
      if (error) throw error;
      if (!validateCurriculum(data?.curriculum)) throw new Error(data?.error || t("Lộ trình chưa đầy đủ. Vui lòng thử lại.", "The pathway was incomplete. Please try again."));
      const nextProgress = emptySpecializedProgress();
      setPathId(undefined); setCurriculum(data.curriculum); setCitations(data.citations ?? []); setProgress(nextProgress);
      await persist(data.curriculum, nextProgress, data.citations ?? []);
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      toast({ title: t(`Lộ trình ${data.curriculum.lessons.length} bài đã sẵn sàng`, `Your ${data.curriculum.lessons.length}-lesson pathway is ready`) });
    } catch (error) {
      const message = error instanceof Error ? error.message : t("Không thể tạo lộ trình.", "Could not generate the pathway.");
      toast({ title: t("Tạo lộ trình thất bại", "Generation failed"), description: message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const updateScore = async (lessonIndex: number, score: number) => {
    if (!curriculum) return;
    const lessonId = curriculum.lessons[lessonIndex].id;
    const best = Math.max(progress.bestScores[lessonId] ?? 0, score);
    const completedLessons = best >= 75 ? [...new Set([...progress.completedLessons, lessonId])] : progress.completedLessons;
    const nextProgress = { currentLesson: best >= 75 ? Math.min(lessonIndex + 1, curriculum.lessons.length - 1) : lessonIndex, bestScores: { ...progress.bestScores, [lessonId]: best }, completedLessons };
    setProgress(nextProgress);
    await persist(curriculum, nextProgress);
    toast({ title: best >= 75 ? t("Đã mở bài tiếp theo", "Next lesson unlocked") : t("Chưa đạt 75%", "Below 75%"), description: best >= 75 ? t("Tiến độ đã được lưu.", "Your progress has been saved.") : t("Hãy xem giải thích và làm lại.", "Review the explanations and try again.") });
  };

  const removePath = async () => {
    if (pathId) await supabase.from("specialized_learning_paths").delete().eq("id", pathId);
    safeStorage.remove(STORAGE_KEY); setPathId(undefined); setCurriculum(null); setProgress(emptySpecializedProgress()); setStep(1);
    toast({ title: t("Đã xóa lộ trình", "Pathway deleted") });
  };

  const saveNotebook = async () => {
    if (!curriculum) return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) { toast({ title: t("Vui lòng đăng nhập", "Please sign in"), variant: "destructive" }); navigate("/login"); return; }
    const title = `[${langMeta.label}] ${curriculum.title}`;
    const content = curriculumToMarkdown(curriculum, citations);
    const { data: existing } = await supabase.from("student_notebooks").select("id").eq("user_id", data.user.id).eq("title", title).maybeSingle();
    const result = existing ? await supabase.from("student_notebooks").update({ content, subject: `Specialized ${language}` }).eq("id", existing.id) : await supabase.from("student_notebooks").insert({ user_id: data.user.id, title, subject: `Specialized ${language}`, content });
    toast({ title: result.error ? t("Không thể lưu", "Save failed") : t("Đã lưu vào Notebook", "Saved to Notebook"), description: result.error?.message, variant: result.error ? "destructive" : "default" });
  };

  const printPath = () => window.print();
  const startNew = () => { setCurriculum(null); setPathId(undefined); setProgress(emptySpecializedProgress()); setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <div className="min-h-screen bg-background">
    <SEO title="Specialized Language Pathways | HaiEduTech" description="Build a 3 to 12 lesson professional language pathway in English, Chinese, Vietnamese, Finnish, Swedish or Japanese." />
    <Navbar />
    <section className="relative overflow-hidden border-b bg-primary text-primary-foreground">
      <img src={specializedHero} alt="International professionals learning workplace languages" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-primary/60" />
      <div className="container relative mx-auto grid min-h-[360px] items-end gap-8 px-4 pb-10 pt-28 lg:grid-cols-[1fr_360px] lg:items-center lg:pb-12">
        <div><Badge className="mb-4 bg-background text-foreground">{langMeta.code} · {langMeta.label}</Badge><h1 className="max-w-3xl text-3xl font-bold sm:text-5xl">Specialized Language Hub</h1><p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">{t("Lộ trình chuyên ngành 3-12 bài do bạn chọn, kết hợp từ vựng, hội thoại, phát âm, luyện nói và kiểm tra tiến độ.", "A professional pathway you can size from 3 to 12 lessons, combining vocabulary, dialogue, pronunciation, speaking and progress checks.")}</p></div>
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-primary-foreground/30 bg-background/10 p-3 backdrop-blur-sm">{LANG_OPTIONS.map((option) => <div key={option.key} className="text-center"><span className="inline-flex h-8 min-w-10 items-center justify-center rounded border border-primary-foreground/40 bg-background/15 px-2 text-sm font-bold">{option.code}</span><p className="mt-1 text-xs font-medium">{option.label.split(" ").at(-1)}</p></div>)}</div>
      </div>
    </section>

    <main className="container mx-auto max-w-6xl px-4 py-8">
      {restoring ? <div className="flex min-h-52 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div> : !curriculum ? <Card className="border-2 shadow-lg"><CardContent className="p-5 sm:p-8">
        <div className="mb-7 flex items-center justify-between gap-4"><div><Badge variant="outline">{t("Bước", "Step")} {step}/{totalSteps}</Badge><p className="mt-2 text-sm text-muted-foreground">{t("Khảo sát nhu cầu học", "Learning needs assessment")}</p></div><Progress value={(step / totalSteps) * 100} className="max-w-44" /></div>
        <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
          {step === 1 && <div><h2 className="mb-5 text-xl font-bold">{t("Chọn ngôn ngữ và trình độ", "Choose your language and level")}</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{LANG_OPTIONS.map((option) => <Button key={option.key} type="button" variant="outline" className={`h-24 flex-col gap-2 whitespace-normal ${language === option.key ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20" : ""}`} onClick={() => setLanguage(option.key)}><span className="inline-flex h-9 min-w-11 items-center justify-center rounded border bg-muted px-2 text-sm font-bold">{option.code}</span><span>{option.label}</span></Button>)}</div><div className="mt-5 max-w-sm"><Label>{t("Trình độ hiện tại", "Current level")}</Label><Select value={learnerLevel} onValueChange={(value) => setLearnerLevel(value as LearnerLevel)}><SelectTrigger className="mt-2"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="beginner">Beginner</SelectItem><SelectItem value="elementary">Elementary</SelectItem><SelectItem value="intermediate">Intermediate</SelectItem><SelectItem value="advanced">Advanced</SelectItem></SelectContent></Select></div></div>}
          {step === 2 && <div><h2 className="mb-5 text-xl font-bold">{t("Lĩnh vực chuyên ngành", "Your professional field")}</h2><div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-3">{FIELD_PRESETS.map(({ label, icon: Icon }) => <Button key={label} type="button" variant="outline" className={`h-auto min-h-14 justify-start whitespace-normal text-left ${field === label ? "border-primary bg-primary/10 text-foreground" : ""}`} onClick={() => setField(label)}><Icon className="mr-2 h-4 w-4 shrink-0 text-primary" />{label}</Button>)}</div><Label htmlFor="custom-field">{t("Hoặc nhập lĩnh vực riêng", "Or enter your own field")}</Label><Input id="custom-field" className="mt-2" value={field} onChange={(event) => setField(event.target.value)} maxLength={200} placeholder="Cybersecurity, Renewable Energy..." /></div>}
          {step === 3 && <div><h2 className="mb-5 text-xl font-bold">{t("Vai trò và tình huống công việc", "Your role and work situations")}</h2><Label htmlFor="job-role">{t("Vai trò cụ thể", "Specific job role")}</Label><Input id="job-role" className="mt-2" value={jobRole} onChange={(event) => setJobRole(event.target.value)} maxLength={200} placeholder="Registered Nurse, Backend Developer..." /><p className="mt-2 text-sm text-muted-foreground">{t("Mô tả càng cụ thể, lộ trình càng sát thực tế.", "A specific role produces a more relevant pathway.")}</p></div>}
          {step === 4 && <div className="space-y-5"><div><h2 className="mb-4 text-xl font-bold">{t("Mục tiêu và thời lượng học", "Goal and study time")}</h2><div className="mb-3 flex flex-wrap gap-2">{GOALS.map((item) => <Button key={item} type="button" size="sm" variant="outline" className={goal === item ? "border-primary bg-primary/10 text-foreground" : ""} onClick={() => setGoal(item)}>{item}</Button>)}</div><Input value={goal} onChange={(event) => setGoal(event.target.value)} maxLength={500} placeholder={t("Mô tả mục tiêu của bạn", "Describe your goal")} /></div><div className="max-w-xs"><Label>{t("Thời lượng mỗi ngày", "Daily study time")}</Label><Select value={String(dailyMinutes)} onValueChange={(value) => setDailyMinutes(Number(value))}><SelectTrigger className="mt-2"><SelectValue /></SelectTrigger><SelectContent>{[10, 15, 20, 30, 45, 60].map((minutes) => <SelectItem key={minutes} value={String(minutes)}>{minutes} {t("phút", "minutes")}</SelectItem>)}</SelectContent></Select></div><div className="max-w-xs"><Label>{t("Số lượng bài học", "Number of lessons")}</Label><Select value={String(lessonCount)} onValueChange={(value) => setLessonCount(Number(value))}><SelectTrigger className="mt-2"><SelectValue /></SelectTrigger><SelectContent>{LESSON_COUNT_OPTIONS.map((count) => <SelectItem key={count} value={String(count)}>{count} {t("bài học", "lessons")}</SelectItem>)}</SelectContent></Select><p className="mt-2 text-xs text-muted-foreground">{t("Lộ trình dài hơn sẽ mất nhiều thời gian tạo hơn.", "Longer pathways take more time to generate.")}</p></div><div><Label htmlFor="notes">{t("Yêu cầu riêng", "Special requirements")} ({t("không bắt buộc", "optional")})</Label><Textarea id="notes" className="mt-2" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={1000} /></div></div>}
          {step === 5 && <div><h2 className="mb-5 text-xl font-bold">{t("Xác nhận lộ trình", "Confirm your pathway")}</h2><div className="grid gap-3 sm:grid-cols-2">{[[t("Ngôn ngữ", "Language"), `${langMeta.code} · ${langMeta.label}`], [t("Trình độ", "Level"), learnerLevel], [t("Lĩnh vực", "Field"), field], [t("Vai trò", "Role"), jobRole], [t("Mục tiêu", "Goal"), goal], [t("Thời lượng", "Study time"), `${dailyMinutes} ${t("phút/ngày", "minutes/day")}`], [t("Số bài học", "Lessons"), `${lessonCount} ${t("bài", "lessons")}`]].map(([label, value]) => <div key={label} className="rounded-lg border bg-muted/30 p-4"><p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p><p className="mt-1 font-medium">{value}</p></div>)}</div></div>}
        </motion.div></AnimatePresence>
        <div className="mt-8 flex justify-between"><Button variant="outline" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1 || loading}><ArrowLeft className="mr-2 h-4 w-4" />{t("Quay lại", "Back")}</Button>{step < totalSteps ? <Button onClick={() => setStep((current) => current + 1)} disabled={!canProceed}>{t("Tiếp tục", "Next")}<ArrowRight className="ml-2 h-4 w-4" /></Button> : <Button onClick={generate} disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}{loading ? t(`Đang tạo ${lessonCount} bài...`, `Creating ${lessonCount} lessons...`) : t(`Tạo lộ trình ${lessonCount} bài`, `Create ${lessonCount}-lesson pathway`)}</Button>}</div>
      </CardContent></Card> : <div ref={resultRef} className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start"><Card><CardContent className="p-4"><div className="mb-4"><p className="text-sm font-bold">{curriculum.title}</p><p className="mt-1 text-xs text-muted-foreground">{curriculum.subtitle}</p></div><Progress value={(progress.completedLessons.length / curriculum.lessons.length) * 100} /><p className="mb-4 mt-2 text-xs text-muted-foreground">{progress.completedLessons.length}/{curriculum.lessons.length} {t("bài đã qua", "lessons passed")}</p><nav className="space-y-2">{curriculum.lessons.map((lesson, index) => {
          const active = progress.currentLesson === index;
          return <Button key={lesson.id} type="button" variant="outline" className={`h-auto w-full items-start justify-start whitespace-normal break-words px-3 py-3 text-left leading-snug ${active ? "border-primary bg-primary/10 text-foreground" : "text-foreground"}`} onClick={() => setProgress((current) => ({ ...current, currentLesson: index }))}><span className={`mr-2 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${progress.completedLessons.includes(lesson.id) ? "bg-emerald-600 text-primary-foreground" : "bg-muted text-foreground"}`}>{progress.completedLessons.includes(lesson.id) ? <Check className="h-4 w-4" /> : index + 1}</span><span className="min-w-0 flex-1 text-sm">{lesson.title}</span></Button>;
        })}</nav><div className="mt-5 grid gap-2"><Button variant="outline" size="sm" onClick={saveNotebook}><Save className="mr-2 h-4 w-4" />Notebook</Button><Button variant="outline" size="sm" onClick={printPath}><Download className="mr-2 h-4 w-4" />{t("In / PDF", "Print / PDF")}</Button><Button variant="ghost" size="sm" onClick={startNew}><RotateCcw className="mr-2 h-4 w-4" />{t("Tạo mới", "New pathway")}</Button><Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={removePath}><Trash2 className="mr-2 h-4 w-4" />{t("Xóa", "Delete")}</Button></div></CardContent></Card></aside>
        <div className="min-w-0"><Card><CardContent className="p-5 sm:p-7"><div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b pb-4"><div className="flex items-center gap-2"><Badge variant="outline">{langMeta.code} · {langMeta.label}</Badge><Badge variant="secondary"><Clock3 className="mr-1 h-3.5 w-3.5" />{curriculum.totalMinutes} min</Badge></div><Badge>{learnerLevel}</Badge></div><SpecializedLessonView lesson={curriculum.lessons[progress.currentLesson]} language={language} lessonNumber={progress.currentLesson + 1} bestScore={progress.bestScores[curriculum.lessons[progress.currentLesson].id] ?? 0} isPassed={progress.completedLessons.includes(curriculum.lessons[progress.currentLesson].id)} t={t} onQuizComplete={(score) => updateScore(progress.currentLesson, score)} /><div className="mt-7 flex justify-between border-t pt-5"><Button variant="outline" disabled={progress.currentLesson === 0} onClick={() => setProgress((current) => ({ ...current, currentLesson: current.currentLesson - 1 }))}><ArrowLeft className="mr-2 h-4 w-4" />{t("Bài trước", "Previous")}</Button><Button disabled={progress.currentLesson >= curriculum.lessons.length - 1} onClick={() => setProgress((current) => ({ ...current, currentLesson: current.currentLesson + 1 }))}>{t("Bài tiếp theo", "Next lesson")}<ArrowRight className="ml-2 h-4 w-4" /></Button></div></CardContent></Card>{citations.length > 0 && <div className="mt-5 border-t pt-4 text-xs text-muted-foreground"><p className="mb-2 font-semibold">{t("Nguồn tham khảo", "Sources")}</p>{citations.slice(0, 8).map((source) => <a key={source} href={source} target="_blank" rel="noopener noreferrer" className="mb-1 block break-all hover:text-foreground hover:underline">{source}</a>)}</div>}<div className="mt-5"><Link to="/dashboard"><Button variant="ghost"><BookOpen className="mr-2 h-4 w-4" />{t("Về bảng học tập", "Back to dashboard")}</Button></Link></div></div>
      </div>}
    </main><Footer />
  </div>;
}