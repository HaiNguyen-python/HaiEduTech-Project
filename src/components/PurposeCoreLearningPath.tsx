import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Check, CheckCircle2, ChevronDown, ChevronRight,
  Clock3, Headphones, Lightbulb, ListChecks, RotateCcw, Search, Sparkles, Target,
  Turtle, Volume2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PurposeLesson, PurposeTopic } from "@/data/purposeEnglishTypes";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { safeStorage } from "@/lib/safeStorage";
import {
  getNextCoreLesson, lessonMinutes, lessonOutcome, modelLineRole, purposeTrackLabel,
  splitTeaching, topicLearningMeta, type PurposeTrack,
} from "@/lib/purposeEnglishLearning";

type Filter = "all" | "current" | "complete" | "not-started";

interface Props {
  track: PurposeTrack;
  storageKey: string;
  activityType: string;
  topics: PurposeTopic[];
}

const PurposeCoreLearningPath = ({ track, storageKey, activityType, topics }: Props) => {
  const { language, t } = useLanguage();
  const vi = language === "vi";
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState<{ topic: PurposeTopic; lesson: PurposeLesson } | null>(null);
  const [openTopic, setOpenTopic] = useState(topics[0]?.id ?? "");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [guidedChoice, setGuidedChoice] = useState<number | null>(null);
  const [practised, setPractised] = useState<string[]>([]);

  const allLessons = useMemo(() => topics.flatMap((topic) => topic.lessons), [topics]);
  const totalPhrases = allLessons.reduce((sum, lesson) => sum + lesson.vocab.length, 0);
  const next = getNextCoreLesson(topics, done);
  const currentTopic = next?.topic ?? topics[0];
  const completedTopics = topics.filter((topic) => topic.lessons.every((lesson) => done.includes(lesson.id))).length;
  const progress = Math.round((done.length / Math.max(allLessons.length, 1)) * 100);

  useEffect(() => {
    setDone(safeStorage.get<string[]>(storageKey, []) ?? []);
    setPractised(safeStorage.get<string[]>(`${storageKey}-phrases`, []) ?? []);
  }, [storageKey]);
  useEffect(() => () => stopEnglishTts(), []);

  const persistDone = (nextDone: string[]) => {
    setDone(nextDone);
    safeStorage.set(storageKey, nextDone);
    window.dispatchEvent(new Event("purpose-progress"));
  };

  const openLesson = (topic: PurposeTopic, lesson: PurposeLesson) => {
    stopEnglishTts();
    setActive({ topic, lesson });
    setOpenTopic(topic.id);
    setPicked({});
    setGuidedChoice(null);
    safeStorage.set(`${storageKey}-last-core`, lesson.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choose = (index: number, option: number) => {
    if (!active || picked[index] !== undefined) return;
    const nextPicked = { ...picked, [index]: option };
    setPicked(nextPicked);
    if (Object.keys(nextPicked).length !== active.lesson.questions.length) return;
    const score = active.lesson.questions.filter((question, questionIndex) => nextPicked[questionIndex] === question.answer).length;
    const nextDone = done.includes(active.lesson.id) ? done : [...done, active.lesson.id];
    persistDone(nextDone);
    void logStudentActivity({
      activityType,
      activityId: active.lesson.id,
      score,
      maxScore: active.lesson.questions.length,
      metadata: { topic: active.topic.id, lessonTitle: active.lesson.title, mode: "core_path" },
    });
  };

  const speak = (text: string, slow = false) => {
    void playEnglishTts(text, slow ? { speechRate: 0.62, playbackRate: 0.75 } : {});
  };

  const togglePractised = (term: string) => {
    const key = active ? `${active.lesson.id}:${term}` : term;
    const nextPractised = practised.includes(key) ? practised.filter((item) => item !== key) : [...practised, key];
    setPractised(nextPractised);
    safeStorage.set(`${storageKey}-phrases`, nextPractised);
  };

  const visibleTopics = topics.filter((topic) => {
    const topicDone = topic.lessons.filter((lesson) => done.includes(lesson.id)).length;
    const matchesFilter = filter === "all"
      || (filter === "complete" && topicDone === topic.lessons.length)
      || (filter === "current" && topic.id === currentTopic?.id)
      || (filter === "not-started" && topicDone === 0);
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${topic.title} ${topic.titleVi} ${topic.description} ${topic.descriptionVi} ${topic.lessons.map((lesson) => `${lesson.title} ${lesson.titleVi}`).join(" ")}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (active) {
    const lessonIndex = allLessons.findIndex((lesson) => lesson.id === active.lesson.id);
    const teachingBlocks = splitTeaching(vi ? active.lesson.teachingVi : active.lesson.teaching);
    const correctCount = active.lesson.questions.filter((question, index) => picked[index] === question.answer).length;
    const quizFinished = Object.keys(picked).length === active.lesson.questions.length;
    const guidedOptions = [active.lesson.vocab[0]?.example, active.lesson.vocab[1]?.example, active.lesson.vocab[2]?.example].filter((value): value is string => Boolean(value));
    return (
      <div className="purpose-course mx-auto max-w-5xl py-5">
        <div className="sticky top-0 z-20 mb-5 border-b border-border bg-background/95 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" onClick={() => { stopEnglishTts(); setActive(null); }} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> {t("Về lộ trình", "Back to path")}
            </Button>
            <div className="min-w-[180px] flex-1 sm:max-w-sm">
              <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
                <span>{t("Tiến trình bài học", "Lesson progress")}</span><span>{quizFinished ? 100 : 75}%</span>
              </div>
              <Progress value={quizFinished ? 100 : 75} className="h-2" />
            </div>
          </div>
        </div>

        <header className="border-l-4 border-primary bg-card px-5 py-6 shadow-sm sm:px-7">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-primary">
            <span>{active.topic.emoji}</span><span>{t(active.topic.titleVi, active.topic.title)}</span><span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{t("Bài", "Lesson")} {lessonIndex + 1}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">{t(active.lesson.titleVi, active.lesson.title)}</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">{t(active.lesson.gistVi, active.lesson.gist)}</p>
          <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex gap-3"><Target className="mt-0.5 h-5 w-5 shrink-0 text-secondary-foreground" /><p className="font-semibold text-foreground">{lessonOutcome(active.lesson, vi)}</p></div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><Clock3 className="h-4 w-4" /> {lessonMinutes(active.lesson)} {t("phút", "min")}</span>
          </div>
        </header>

        <nav className="my-5 flex gap-2 overflow-x-auto pb-2" aria-label={t("Các bước bài học", "Lesson stages")}>
          {[t("Hiểu", "Understand"), t("Cụm từ", "Phrases"), t("Bài mẫu", "Model"), t("Luyện tập", "Guided"), t("Kiểm tra", "Check")].map((label, index) => (
            <a key={label} href={`#core-step-${index + 1}`} className="shrink-0 rounded-md border border-border bg-card px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              {index + 1}. {label}
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          <section id="core-step-1" className="scroll-mt-24 border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 font-bold text-primary">1</span><div><p className="text-xs font-bold uppercase text-primary">{t("Nền tảng", "Foundation")}</p><h3 className="text-xl font-bold">{t("Hiểu cách dùng", "Understand how it works")}</h3></div></div>
            <div className="grid gap-5 lg:grid-cols-3">
              {teachingBlocks.map((block, index) => (
                <div key={block} className="border-t-2 border-primary/40 pt-4">
                  <p className="mb-2 text-sm font-bold text-primary">{index === 0 ? t("Nguyên tắc", "Core rule") : index === 1 ? t("Cách áp dụng", "How to apply") : t("Lưu ý", "Watch out")}</p>
                  <p className="whitespace-pre-wrap text-base leading-8 text-foreground/90">{block}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="core-step-2" className="scroll-mt-24 border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary font-bold text-secondary-foreground">2</span><div><p className="text-xs font-bold uppercase text-secondary-foreground">{t("Ngôn ngữ đầu vào", "Language input")}</p><h3 className="text-xl font-bold">{t("Cụm từ trọng tâm", "Essential phrases")}</h3></div></div>
            <div className="divide-y divide-border border-y border-border">
              {active.lesson.vocab.map((item) => {
                const practiceKey = `${active.lesson.id}:${item.term}`;
                return (
                  <div key={item.term} className="grid gap-3 py-4 md:grid-cols-[minmax(190px,0.7fr)_1.3fr_auto] md:items-center">
                    <div><p className="font-bold text-foreground">{item.term}</p><p className="text-sm text-muted-foreground">{item.pos} · {item.vi}</p></div>
                    <div><p className="text-base text-foreground/90">{item.example}</p><p className="text-sm text-muted-foreground">{item.exampleVi}</p></div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => speak(`${item.term}. ${item.example}`)} aria-label={t("Nghe", "Listen")}><Volume2 className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => speak(`${item.term}. ${item.example}`, true)} aria-label={t("Nghe chậm", "Listen slowly")}><Turtle className="h-4 w-4" /></Button>
                      <Button size="icon" variant={practised.includes(practiceKey) ? "default" : "outline"} onClick={() => togglePractised(item.term)} aria-label={t("Đánh dấu đã luyện", "Mark practised")}><Check className="h-4 w-4" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="core-step-3" className="scroll-mt-24 border border-primary/30 bg-primary/5 p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">3</span><div><p className="text-xs font-bold uppercase text-primary">{t("Học từ mẫu chuẩn", "Learn from a model")}</p><h3 className="text-xl font-bold">{t(active.lesson.model.labelVi, active.lesson.model.label)}</h3></div></div>
              <Button variant="outline" onClick={() => speak(active.lesson.model.lines.join(" "))} className="gap-2"><Headphones className="h-4 w-4" />{t("Nghe toàn bài", "Listen all")}</Button>
            </div>
            <div className="border-l-2 border-primary/30 pl-4 sm:pl-6">
              {active.lesson.model.lines.map((line, index) => (
                <div key={`${line}-${index}`} className="grid gap-1 border-b border-primary/15 py-3 last:border-0 sm:grid-cols-[150px_1fr]">
                  <span className="text-xs font-bold uppercase text-primary">{modelLineRole(line, index, active.lesson.model.lines.length, track)}</span>
                  <p className="whitespace-pre-wrap text-base leading-8 text-foreground">{line}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="core-step-4" className="scroll-mt-24 border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 font-bold text-accent-foreground">4</span><div><p className="text-xs font-bold uppercase text-accent-foreground">{t("Thử trước khi kiểm tra", "Try before the quiz")}</p><h3 className="text-xl font-bold">{t("Chọn câu phù hợp nhất với mục tiêu bài học", "Choose the sentence that best fits this lesson goal")}</h3></div></div>
            <p className="mb-4 text-muted-foreground">{t("Hãy ưu tiên câu tự nhiên, cụ thể và đúng ngữ cảnh.", "Prioritise language that is natural, specific and appropriate for the context.")}</p>
            <div className="grid gap-3">
              {guidedOptions.map((option, index) => (
                <Button key={option} variant={guidedChoice === index ? (index === 0 ? "default" : "destructive") : "outline"} className="h-auto min-h-12 justify-start whitespace-normal py-3 text-left" onClick={() => setGuidedChoice(index)}>
                  <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>{option}
                </Button>
              ))}
            </div>
            {guidedChoice !== null && <div className="mt-4 border-l-4 border-primary bg-primary/5 p-4"><p className="font-semibold">{guidedChoice === 0 ? t("Đúng hướng. Câu này thể hiện trực tiếp ngôn ngữ trọng tâm của bài.", "Good choice. This sentence directly demonstrates the lesson's target language.") : t("Hãy xem lại cụm từ đầu tiên và mục tiêu bài học. Câu A là mẫu trực tiếp nhất.", "Review the first key phrase and the lesson goal. Option A is the most direct model.")}</p></div>}
          </section>

          <section id="core-step-5" className="scroll-mt-24 border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary font-bold text-secondary-foreground">5</span><div><p className="text-xs font-bold uppercase text-secondary-foreground">{t("Kiểm tra ứng dụng", "Application check")}</p><h3 className="text-xl font-bold">{t("Chọn đáp án trước khi xem giải thích", "Choose before revealing the explanation")}</h3></div></div>
            <ol className="space-y-5">
              {active.lesson.questions.map((question, questionIndex) => {
                const chosen = picked[questionIndex];
                const answered = chosen !== undefined;
                return (
                  <li key={question.question} className="border-t border-border pt-5 first:border-0 first:pt-0">
                    <p className="font-bold leading-7">{questionIndex + 1}. {question.question}</p>
                    <p className="mb-3 text-sm text-muted-foreground">{question.questionVi}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => {
                        const right = optionIndex === question.answer;
                        const selectedWrong = answered && optionIndex === chosen && !right;
                        return <Button key={option} variant="outline" disabled={answered} onClick={() => choose(questionIndex, optionIndex)} className={`h-auto min-h-12 justify-start whitespace-normal py-3 text-left ${answered && right ? "border-primary bg-primary/10" : ""} ${selectedWrong ? "border-destructive bg-destructive/10" : ""}`}><span className="mr-2 font-bold text-primary">{String.fromCharCode(65 + optionIndex)}.</span><span className="flex-1">{option}</span>{answered && right && <CheckCircle2 className="h-4 w-4 text-primary" />}{selectedWrong && <XCircle className="h-4 w-4 text-destructive" />}</Button>;
                      })}
                    </div>
                    {answered && <div className="mt-3 border-l-4 border-primary bg-primary/5 p-4"><p className="font-bold">{t("Đáp án", "Answer")}: {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}</p><p className="mt-1">{question.explanation}</p><p className="text-sm text-muted-foreground">{question.explanationVi}</p></div>}
                  </li>
                );
              })}
            </ol>
            {quizFinished && <div className="mt-6 border border-primary/30 bg-primary/5 p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase text-primary">{t("Kết quả bài học", "Lesson result")}</p><p className="text-2xl font-bold">{correctCount}/{active.lesson.questions.length}</p><p className="text-muted-foreground">{correctCount === active.lesson.questions.length ? t("Rất tốt. Bạn đã sẵn sàng sang bài tiếp theo.", "Excellent. You are ready for the next lesson.") : t(`Hãy xem lại ${active.lesson.questions.length - correctCount} câu trước khi tiếp tục.`, `Review ${active.lesson.questions.length - correctCount} item(s) before continuing.`)}</p></div><Button variant="outline" onClick={() => setPicked({})} className="gap-2"><RotateCcw className="h-4 w-4" />{t("Làm lại", "Try again")}</Button></div></div>}
          </section>
        </div>

        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-border pt-5">
          <Button variant="outline" disabled={lessonIndex <= 0} onClick={() => {
            const lesson = allLessons[lessonIndex - 1]; const topic = topics.find((item) => item.lessons.some((candidate) => candidate.id === lesson?.id)); if (lesson && topic) openLesson(topic, lesson);
          }} className="gap-2"><ArrowLeft className="h-4 w-4" />{t("Bài trước", "Previous")}</Button>
          <Button disabled={lessonIndex >= allLessons.length - 1} onClick={() => {
            const lesson = allLessons[lessonIndex + 1]; const topic = topics.find((item) => item.lessons.some((candidate) => candidate.id === lesson?.id)); if (lesson && topic) openLesson(topic, lesson);
          }} className="gap-2">{t("Bài tiếp theo", "Next lesson")}<ArrowRight className="h-4 w-4" /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="purpose-course mx-auto max-w-5xl py-5">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="text-sm font-bold uppercase text-primary">{purposeTrackLabel(track, vi)}</p><h2 className="mt-1 text-2xl font-bold sm:text-3xl">{t("Lộ trình Core Lessons", "Core Lessons learning path")}</h2><p className="mt-1 text-muted-foreground">{t("Đi từng chặng, luyện từng kỹ năng và áp dụng ngay.", "Build each skill step by step and apply it immediately.")}</p></div>
        {next && <Button onClick={() => openLesson(next.topic, next.lesson)} className="gap-2"><ArrowRight className="h-4 w-4" />{t("Tiếp tục học", "Continue learning")}</Button>}
      </div>

      <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [BookOpenCheck, t("Tiến độ", "Progress"), `${done.length}/${allLessons.length}`, `${progress}%`],
          [Target, t("Chặng hoàn thành", "Stages complete"), `${completedTopics}/${topics.length}`, t("theo lộ trình", "on the path")],
          [Sparkles, t("Cụm từ trọng tâm", "Key phrases"), String(totalPhrases), `${practised.length} ${t("đã luyện", "practised")}`],
          [ListChecks, t("Bài kiểm tra", "Checks completed"), String(done.length), t("lưu tự động", "saved automatically")],
        ].map(([Icon, label, value, note]) => {
          const StatIcon = Icon as typeof Target;
          return <div key={String(label)} className="flex items-center gap-3 border border-border bg-card p-4 shadow-sm"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><StatIcon className="h-5 w-5" /></span><div><p className="text-xs font-bold uppercase text-muted-foreground">{String(label)}</p><p className="text-xl font-bold">{String(value)} <span className="text-xs font-medium text-muted-foreground">{String(note)}</span></p></div></div>;
        })}
      </div>

      <div className="mb-8 border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("Tìm chủ đề hoặc bài học...", "Find a topic or lesson...")} className="pl-9" /></div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {(["all", "current", "complete", "not-started"] as Filter[]).map((value) => <Button key={value} variant={filter === value ? "default" : "outline"} size="sm" onClick={() => setFilter(value)} className="shrink-0">{{ all: t("Tất cả", "All"), current: t("Đang học", "Current"), complete: t("Hoàn thành", "Complete"), "not-started": t("Chưa học", "Not started") }[value]}</Button>)}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute bottom-8 left-6 top-8 w-0.5 bg-border sm:left-8" aria-hidden />
        <div className="relative space-y-7">
          {visibleTopics.map((topic, topicIndex) => {
            const meta = topicLearningMeta(topic);
            const topicDone = topic.lessons.filter((lesson) => done.includes(lesson.id)).length;
            const isComplete = topicDone === topic.lessons.length;
            const isCurrent = topic.id === currentTopic?.id;
            const isOpen = openTopic === topic.id;
            return (
              <motion.div key={topic.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(topicIndex * 0.04, 0.2) }} className="flex gap-4 sm:gap-7">
                <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background font-bold shadow-sm sm:h-16 sm:w-16 ${isComplete ? "bg-primary text-primary-foreground" : isCurrent ? "bg-secondary text-secondary-foreground ring-4 ring-primary/15" : "bg-muted text-muted-foreground"}`}>{isComplete ? <Check className="h-6 w-6" /> : String(topicIndex + 1).padStart(2, "0")}</div>
                <div className={`min-w-0 flex-1 border-l-4 bg-card shadow-sm transition-transform hover:translate-x-1 ${isComplete ? "border-primary" : isCurrent ? "border-secondary" : "border-border"}`}>
                  <Button variant="ghost" onClick={() => setOpenTopic(isOpen ? "" : topic.id)} className="h-auto w-full justify-start rounded-none p-5 text-left hover:bg-primary/5 sm:p-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><span className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase ${isComplete ? "bg-primary/10 text-primary" : isCurrent ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>{isComplete ? t("Hoàn thành", "Complete") : isCurrent ? t("Đang học", "Current stage") : t("Sẵn sàng", "Ready")}</span><span className="text-xs font-semibold text-muted-foreground">{t("Chặng", "Stage")} {String(topicIndex + 1).padStart(2, "0")}</span></div>
                      <h3 className="mt-2 text-lg font-bold sm:text-xl">{topic.emoji} {t(topic.titleVi, topic.title)}</h3>
                      <p className="mt-1 whitespace-normal text-sm text-muted-foreground sm:text-base">{t(topic.descriptionVi, topic.description)}</p>
                      <div className="mt-4 flex flex-wrap gap-2">{(vi ? meta.vi : meta.en).map((skill) => <span key={skill} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">{skill}</span>)}</div>
                      <div className="mt-4 flex items-center gap-3"><Progress value={(topicDone / topic.lessons.length) * 100} className="h-2 max-w-xs" /><span className="shrink-0 text-sm font-bold text-primary">{topicDone}/{topic.lessons.length}</span><span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex"><Clock3 className="h-4 w-4" /> {meta.minutes} {t("phút", "min")}</span></div>
                    </div>
                    {isOpen ? <ChevronDown className="ml-3 h-5 w-5 shrink-0" /> : <ChevronRight className="ml-3 h-5 w-5 shrink-0" />}
                  </Button>
                  {isOpen && <div className="border-t border-border px-4 py-2 sm:px-6">{topic.lessons.map((lesson, lessonIndex) => <Button key={lesson.id} variant="ghost" onClick={() => openLesson(topic, lesson)} className="h-auto w-full justify-start rounded-none border-b border-border px-1 py-4 text-left last:border-0 hover:bg-primary/5"><span className={`mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${done.includes(lesson.id) ? "bg-primary text-primary-foreground" : "border border-primary/30 text-primary"}`}>{done.includes(lesson.id) ? <Check className="h-4 w-4" /> : lessonIndex + 1}</span><span className="min-w-0 flex-1"><span className="block whitespace-normal font-bold">{t(lesson.titleVi, lesson.title)}</span><span className="block whitespace-normal text-sm font-normal text-muted-foreground">{lessonOutcome(lesson, vi)}</span><span className="mt-1 block text-xs font-semibold text-muted-foreground">{lesson.vocab.length} {t("cụm từ", "phrases")} · {lesson.questions.length + 1} {t("hoạt động", "activities")} · {lessonMinutes(lesson)} {t("phút", "min")}</span></span><ArrowRight className="ml-2 h-4 w-4 shrink-0 text-primary" /></Button>)}</div>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {visibleTopics.length === 0 && <div className="py-16 text-center"><Lightbulb className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-3 font-semibold text-muted-foreground">{t("Không tìm thấy nội dung phù hợp.", "No matching lessons found.")}</p></div>}
    </div>
  );
};

export default PurposeCoreLearningPath;