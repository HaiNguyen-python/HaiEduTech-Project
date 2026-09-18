import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpenCheck, Check, CheckCircle2, ChevronDown, ChevronRight,
  Clock3, FileText, Headphones, Lightbulb, ListChecks, MessageSquareText, RotateCcw,
  Search, ShieldAlert, Sparkles, Target, Turtle, Volume2, XCircle,
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
  buildGuidedActivities, getNextCoreLesson, lessonMinutes, lessonOutcome, modelLineRole,
  purposeTrackLabel, splitTeaching, topicLearningMeta, type PurposeTrack,
} from "@/lib/purposeEnglishLearning";


type Filter = "all" | "current" | "complete" | "not-started";

interface Props {
  track: PurposeTrack;
  storageKey: string;
  activityType: string;
  topics: PurposeTopic[];
}

const PurposeCoreLearningPath = ({ track, storageKey, activityType, topics }: Props) => {
  const { lang, t } = useLanguage();
  const vi = lang === "vi";
  const [done, setDone] = useState<string[]>([]);
  const [active, setActive] = useState<{ topic: PurposeTopic; lesson: PurposeLesson } | null>(null);
  const [openTopic, setOpenTopic] = useState(topics[0]?.id ?? "");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [guidedPicks, setGuidedPicks] = useState<Record<string, number>>({});
  const [step, setStep] = useState(1);

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
    setGuidedPicks({});
    setStep(1);

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
      || (filter === "current" && (topic.id === currentTopic?.id || (topicDone > 0 && topicDone < topic.lessons.length)))
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
    const guidedActivities = buildGuidedActivities(active.lesson, track);
    const guidedDone = guidedActivities.length > 0 && guidedActivities.every((activity) => guidedPicks[activity.id] !== undefined);
    const guidedCorrect = guidedActivities.filter((activity) => guidedPicks[activity.id] === activity.answer).length;
    const stagePercent = Math.round((step / 5) * 100);
    return (
      <div className="purpose-course mx-auto max-w-6xl py-5 text-foreground">
        <div className="sticky top-0 z-20 mb-6 border-b border-border bg-background/95 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" onClick={() => { stopEnglishTts(); setActive(null); }} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> {t("Về lộ trình", "Back to path")}
            </Button>
            <div className="min-w-[180px] flex-1 sm:max-w-sm">
              <div className="mb-1 flex justify-between text-sm font-bold text-foreground/80">
                <span>{t("Bước", "Step")} {step}/5</span><span>{stagePercent}%</span>
              </div>
              <Progress value={stagePercent} className="h-2" />
            </div>
          </div>
        </div>

        <header className="overflow-hidden rounded-lg border border-border border-l-4 border-l-primary bg-card shadow-md">
          <div className="border-b border-border bg-primary/5 px-5 py-3 sm:px-8">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-primary">
              <span>{active.topic.emoji}</span><span>{t(active.topic.titleVi, active.topic.title)}</span><span className="text-foreground/50">/</span>
              <span className="text-foreground/75">{t("Bài", "Lesson")} {lessonIndex + 1}</span>
            </div>
          </div>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{t(active.lesson.titleVi, active.lesson.title)}</h2>
            <p className="mt-3 max-w-3xl text-base font-medium leading-8 text-foreground/80">{t(active.lesson.gistVi, active.lesson.gist)}</p>
            <div className="mt-6 grid gap-4 rounded-md border border-primary/20 bg-primary/5 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex gap-3"><Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="font-bold leading-7 text-foreground">{lessonOutcome(active.lesson, vi)}</p></div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground/75"><Clock3 className="h-4 w-4 text-primary" /> {lessonMinutes(active.lesson)} {t("phút", "min")}</span>
            </div>
          </div>
        </header>

        <nav className="my-5 flex gap-2 overflow-x-auto pb-2" aria-label={t("Các bước bài học", "Lesson stages")}>
          {[t("Hiểu", "Understand"), t("Cụm từ", "Phrases"), t("Bài mẫu", "Model"), t("Luyện tập", "Guided"), t("Kiểm tra", "Check")].map((label, index) => (
            <button
              key={label}
              type="button"
              aria-current={step === index + 1}
              onClick={() => {
                stopEnglishTts();
                setStep((current) => Math.max(current, index + 1));
                document.getElementById(`core-step-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${step >= index + 1 ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground/75 hover:border-primary hover:bg-primary/5 hover:text-primary"}`}
            >
              {index + 1}. {label}
            </button>
          ))}
        </nav>


        <div className="space-y-8">
          <section id="core-step-1" className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4 sm:px-7"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">1</span><div><p className="text-sm font-extrabold uppercase text-primary">{t("Nền tảng", "Foundation")}</p><h3 className="text-xl font-extrabold text-foreground">{t("Hiểu cách dùng", "Understand how it works")}</h3></div></div>
            <div className={`grid gap-5 p-5 sm:p-7 ${teachingBlocks.length === 1 ? "grid-cols-1" : teachingBlocks.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
              {teachingBlocks.map((block, index) => (
                <div key={block.paragraphs.join(" ")} className="rounded-md border border-border bg-background p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    {index === 0 ? <FileText className="h-5 w-5" /> : index === 1 ? <MessageSquareText className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                    <p className="text-sm font-extrabold uppercase">{index === 0 ? t("Nguyên tắc", "Core rule") : index === 1 ? t("Cách áp dụng", "How to apply") : t("Lưu ý", "Watch out")}</p>
                  </div>
                  <div className="max-w-[70ch] space-y-3">
                    {block.paragraphs.map((paragraph) => <p key={paragraph} className="whitespace-pre-wrap text-base font-medium leading-8 text-foreground">{paragraph}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="core-step-2" className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4 sm:px-7"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">2</span><div><p className="text-sm font-extrabold uppercase text-secondary-foreground">{t("Ngôn ngữ đầu vào", "Language input")}</p><h3 className="text-xl font-extrabold text-foreground">{t("Cụm từ trọng tâm", "Essential phrases")}</h3></div></div>
            <div className="divide-y divide-border p-5 sm:p-7">
              {active.lesson.vocab.map((item) => {
                const practiceKey = `${active.lesson.id}:${item.term}`;
                return (
                  <div key={item.term} className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(190px,0.7fr)_1.3fr_auto] md:items-center">
                    <div><p className="text-base font-extrabold text-foreground">{item.term}</p><p className="mt-1 text-sm font-semibold text-foreground/70">{item.pos} · {item.vi}</p></div>
                     <div className="max-w-[65ch]"><p className="text-base font-medium leading-7 text-foreground">{item.example}</p></div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary" onClick={() => speak(`${item.term}. ${item.example}`)} aria-label={t("Nghe", "Listen")}><Volume2 className="h-4 w-4" /></Button>
                      <Button size="icon" variant="outline" className="text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary" onClick={() => speak(`${item.term}. ${item.example}`, true)} aria-label={t("Nghe chậm", "Listen slowly")}><Turtle className="h-4 w-4" /></Button>
                       <Button size="icon" variant={practised.includes(practiceKey) ? "default" : "outline"} onClick={() => togglePractised(item.term)} aria-label={t("Đánh dấu đã luyện", "Mark practised")} aria-pressed={practised.includes(practiceKey)}><Check className="h-4 w-4" /></Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="core-step-3" className="scroll-mt-24 overflow-hidden rounded-lg border border-primary/30 bg-card shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/20 bg-primary/5 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">3</span><div><p className="text-sm font-extrabold uppercase text-primary">{t("Học từ mẫu chuẩn", "Learn from a model")}</p><h3 className="text-xl font-extrabold text-foreground">{t(active.lesson.model.labelVi, active.lesson.model.label)}</h3></div></div>
              <Button variant="outline" onClick={() => speak(active.lesson.model.lines.join(" "))} className="gap-2"><Headphones className="h-4 w-4" />{t("Nghe toàn bài", "Listen all")}</Button>
            </div>
            <div className="m-5 border-l-4 border-primary/40 bg-background px-4 py-2 sm:m-7 sm:px-6">
              {active.lesson.model.lines.map((line, index) => (
                <div key={`${line}-${index}`} className="grid gap-1 border-b border-primary/15 py-3 last:border-0 sm:grid-cols-[150px_1fr]">
                  <span className="text-sm font-extrabold uppercase text-primary">{modelLineRole(line, index, active.lesson.model.lines.length, track)}</span>
                  <p className="max-w-[70ch] whitespace-pre-wrap text-base font-medium leading-8 text-foreground">{line}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="core-step-4" className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex items-center gap-3 border-b border-border bg-secondary px-5 py-4 sm:px-7"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">4</span><div><p className="text-sm font-extrabold uppercase text-secondary-foreground">{t("Thử trước khi kiểm tra", "Try before the quiz")}</p><h3 className="text-xl font-extrabold text-foreground">{t("Luyện tập có hướng dẫn", "Guided practice")}</h3></div></div>
            <div className="p-5 sm:p-7">
            <p className="mb-6 max-w-3xl text-base font-medium leading-7 text-foreground/80">{t("Ba hoạt động ngắn lấy trực tiếp từ cụm từ và bài mẫu của bài học này. Chỉ hiện đáp án sau khi bạn chọn.", "Three short activities built from this lesson's phrases and model text. The answer appears only after you choose.")}</p>
            {guidedActivities.length === 0 && <p className="font-medium text-foreground/75">{t("Bài này luyện trực tiếp ở phần kiểm tra bên dưới.", "This lesson practises directly in the check below.")}</p>}
            <ol className="space-y-7">
              {guidedActivities.map((activity, activityIndex) => {
                const chosen = guidedPicks[activity.id];
                const answered = chosen !== undefined;
                return (
                  <li key={activity.id} className="rounded-md border border-border bg-background p-4 sm:p-5">
                     <p className="text-base font-bold leading-7 text-foreground">{activityIndex + 1}. {t(activity.promptVi, activity.prompt)}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {activity.options.map((option, optionIndex) => {
                        const right = optionIndex === activity.answer;
                        const selectedWrong = answered && optionIndex === chosen && !right;
                        return (
                          <Button
                            key={option}
                            variant="outline"
                            disabled={answered}
                            onClick={() => setGuidedPicks((current) => ({ ...current, [activity.id]: optionIndex }))}
                            className={`h-auto min-h-12 justify-start whitespace-normal py-3 text-left text-base ${answered && right ? "border-primary bg-primary/10" : ""} ${selectedWrong ? "border-destructive bg-destructive/10" : ""}`}
                          >
                            <span className="mr-2 font-bold text-primary">{String.fromCharCode(65 + optionIndex)}.</span>
                            <span className="flex-1">{option}</span>
                            {answered && right && <CheckCircle2 className="h-4 w-4 text-primary" />}
                            {selectedWrong && <XCircle className="h-4 w-4 text-destructive" />}
                          </Button>
                        );
                      })}
                    </div>
                    {answered && (
                      <div className="mt-3 border-l-4 border-primary bg-primary/5 p-4">
                        <p className="font-bold">{t("Đáp án", "Answer")}: {String.fromCharCode(65 + activity.answer)}. {activity.options[activity.answer]}</p>
                         <p className="mt-1 text-base">{t(activity.explanationVi, activity.explanation)}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
            {guidedActivities.length > 0 && guidedDone && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-primary/30 bg-primary/5 p-4">
                <p className="font-bold text-foreground">{t("Luyện tập", "Guided practice")}: {guidedCorrect}/{guidedActivities.length}</p>
                <Button variant="outline" className="gap-2" onClick={() => setGuidedPicks({})}><RotateCcw className="h-4 w-4" />{t("Làm lại", "Try again")}</Button>
              </div>
            )}
            </div>
          </section>


          <section id="core-step-5" className="scroll-mt-24 overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-5 py-4 sm:px-7"><span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">5</span><div><p className="text-sm font-extrabold uppercase text-primary">{t("Kiểm tra ứng dụng", "Application check")}</p><h3 className="text-xl font-extrabold text-foreground">{t("Chọn đáp án trước khi xem giải thích", "Choose before revealing the explanation")}</h3></div></div>
            <ol className="space-y-6 p-5 sm:p-7">
              {active.lesson.questions.map((question, questionIndex) => {
                const chosen = picked[questionIndex];
                const answered = chosen !== undefined;
                return (
                  <li key={question.question} className="rounded-md border border-border bg-background p-4 sm:p-5">
                     <p className="mb-4 text-base font-extrabold leading-7 text-foreground">{questionIndex + 1}. {t(question.questionVi, question.question)}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, optionIndex) => {
                        const right = optionIndex === question.answer;
                        const selectedWrong = answered && optionIndex === chosen && !right;
                        return <Button key={option} variant="outline" disabled={answered} onClick={() => choose(questionIndex, optionIndex)} className={`h-auto min-h-12 justify-start whitespace-normal py-3 text-left ${answered && right ? "border-primary bg-primary/10" : ""} ${selectedWrong ? "border-destructive bg-destructive/10" : ""}`}><span className="mr-2 font-bold text-primary">{String.fromCharCode(65 + optionIndex)}.</span><span className="flex-1">{option}</span>{answered && right && <CheckCircle2 className="h-4 w-4 text-primary" />}{selectedWrong && <XCircle className="h-4 w-4 text-destructive" />}</Button>;
                      })}
                    </div>
                     {answered && <div className="mt-4 border-l-4 border-primary bg-primary/5 p-4"><p className="font-extrabold text-foreground">{t("Đáp án", "Answer")}: {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}</p><p className="mt-2 font-medium leading-7 text-foreground">{t(question.explanationVi, question.explanation)}</p></div>}
                  </li>
                );
              })}
            </ol>
            {quizFinished && <div className="mx-5 mb-5 border border-primary/30 bg-primary/5 p-5 sm:mx-7 sm:mb-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase text-primary">{t("Kết quả bài học", "Lesson result")}</p><p className="text-2xl font-bold">{correctCount}/{active.lesson.questions.length}</p><p className="font-medium text-foreground/75">{correctCount === active.lesson.questions.length ? t("Rất tốt. Bạn đã sẵn sàng sang bài tiếp theo.", "Excellent. You are ready for the next lesson.") : t(`Hãy xem lại ${active.lesson.questions.length - correctCount} câu trước khi tiếp tục.`, `Review ${active.lesson.questions.length - correctCount} item(s) before continuing.`)}</p></div><Button variant="outline" onClick={() => setPicked({})} className="gap-2"><RotateCcw className="h-4 w-4" />{t("Làm lại", "Try again")}</Button></div></div>}
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
    <div className="purpose-course mx-auto max-w-6xl py-5 text-foreground">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="text-sm font-extrabold uppercase text-primary">{purposeTrackLabel(track, vi)}</p><h2 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">{t("Lộ trình Core Lessons", "Core Lessons learning path")}</h2><p className="mt-2 text-base font-medium text-foreground/75">{t("Đi từng chặng, luyện từng kỹ năng và áp dụng ngay.", "Build each skill step by step and apply it immediately.")}</p></div>
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
          return <div key={String(label)} className="flex items-center gap-3 rounded-md border border-border bg-card p-4 shadow-sm"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><StatIcon className="h-5 w-5" /></span><div><p className="text-sm font-extrabold uppercase text-foreground/70">{String(label)}</p><p className="text-xl font-extrabold text-foreground">{String(value)} <span className="text-sm font-semibold text-foreground/65">{String(note)}</span></p></div></div>;
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
                <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background font-extrabold shadow-sm sm:h-16 sm:w-16 ${isComplete ? "bg-primary text-primary-foreground" : isCurrent ? "bg-secondary text-secondary-foreground ring-4 ring-primary/15" : "bg-muted text-foreground/70"}`}>{isComplete ? <Check className="h-6 w-6" /> : String(topicIndex + 1).padStart(2, "0")}</div>
                <div className={`min-w-0 flex-1 overflow-hidden rounded-lg border border-border border-l-4 bg-card shadow-sm transition-shadow hover:shadow-md ${isComplete ? "border-l-primary" : isCurrent ? "border-l-secondary" : "border-l-border"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenTopic(isOpen ? "" : topic.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-3 p-5 text-left text-foreground transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2"><span className={`rounded-md px-2 py-1 text-sm font-extrabold uppercase ${isComplete ? "bg-primary/10 text-primary" : isCurrent ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground/70"}`}>{isComplete ? t("Hoàn thành", "Complete") : isCurrent ? t("Đang học", "Current stage") : t("Sẵn sàng", "Ready")}</span><span className="text-sm font-bold text-foreground/65">{t("Chặng", "Stage")} {String(topicIndex + 1).padStart(2, "0")}</span></div>
                      <h3 className="mt-3 text-lg font-extrabold text-foreground sm:text-xl">{topic.emoji} {t(topic.titleVi, topic.title)}</h3>
                      <p className="mt-2 max-w-3xl whitespace-normal text-base font-medium leading-7 text-foreground/75">{t(topic.descriptionVi, topic.description)}</p>
                      <div className="mt-4 flex flex-wrap gap-2">{(vi ? meta.vi : meta.en).map((skill) => <span key={skill} className="rounded-md border border-border bg-background px-2.5 py-1 text-sm font-semibold text-foreground/70">{skill}</span>)}</div>
                      <div className="mt-4 flex flex-wrap items-center gap-3"><Progress value={(topicDone / topic.lessons.length) * 100} className="h-2 w-full max-w-xs" /><span className="shrink-0 text-sm font-extrabold text-primary">{topicDone}/{topic.lessons.length}</span><span className="hidden items-center gap-1 text-sm font-semibold text-foreground/65 sm:flex"><Clock3 className="h-4 w-4" /> {meta.minutes} {t("phút", "min")}</span></div>
                    </div>
                    {isOpen ? <ChevronDown className="ml-3 mt-1 h-5 w-5 shrink-0 text-muted-foreground" /> : <ChevronRight className="ml-3 mt-1 h-5 w-5 shrink-0 text-muted-foreground" />}
                  </button>
                  {isOpen && (
                    <div className="border-t border-border">
                      {topic.lessons.map((lesson, lessonIndex) => (
                        <button
                          type="button"
                          key={lesson.id}
                          onClick={() => openLesson(topic, lesson)}
                          className="group flex w-full items-start gap-3 border-b border-border px-5 py-4 text-left text-foreground transition-colors last:border-0 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-6"
                        >
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${done.includes(lesson.id) ? "bg-primary text-primary-foreground" : "border border-primary/30 text-primary"}`}>{done.includes(lesson.id) ? <Check className="h-4 w-4" /> : lessonIndex + 1}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block whitespace-normal font-bold text-foreground">{t(lesson.titleVi, lesson.title)}</span>
                            <span className="mt-1 block max-w-3xl whitespace-normal text-base font-medium leading-7 text-foreground/75">{lessonOutcome(lesson, vi)}</span>
                            <span className="mt-2 block text-sm font-bold text-foreground/60">{lesson.vocab.length} {t("cụm từ", "phrases")} · {lesson.questions.length + 1} {t("hoạt động", "activities")} · {lessonMinutes(lesson)} {t("phút", "min")}</span>
                          </span>
                          <ArrowRight className="ml-2 mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {visibleTopics.length === 0 && (
        <div className="border border-dashed border-border bg-card py-14 text-center">
          <Lightbulb className="mx-auto h-8 w-8 text-foreground/65" />
          <p className="mt-3 text-base font-semibold text-foreground">{t("Không tìm thấy nội dung phù hợp.", "No matching lessons found.")}</p>
          <p className="mt-1 text-sm font-medium text-foreground/70">{t("Hãy thử từ khóa khác hoặc xóa bộ lọc.", "Try another keyword or clear the filters.")}</p>
          <Button variant="outline" className="mt-4 gap-2" onClick={() => { setSearch(""); setFilter("all"); }}>
            <RotateCcw className="h-4 w-4" />{t("Xóa bộ lọc", "Clear filters")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PurposeCoreLearningPath;