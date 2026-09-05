/**
 * @file PurposeEnglishHub.tsx
 * @description Shared lesson hub used by Business English and Academic English.
 *   Collapsible topic cards, lesson view with bilingual teaching notes, vocabulary
 *   with normal/slow audio, a model text and a 5-question practice set that only
 *   reveals the answer + explanation after the learner chooses.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ListChecks,
  Volume2,
  Turtle,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { safeStorage } from "@/lib/safeStorage";
import type { PurposeLesson, PurposeTopic } from "@/data/purposeEnglishTypes";

interface Props {
  /** localStorage namespace, e.g. "haiedu-business-english-v1". */
  storageKey: string;
  /** Activity type recorded for the learning dashboard. */
  activityType: string;
  emoji: string;
  title: string;
  titleVi: string;
  tagline: string;
  taglineVi: string;
  topics: PurposeTopic[];
}

const PurposeEnglishHub = ({
  storageKey,
  activityType,
  emoji,
  title,
  titleVi,
  tagline,
  taglineVi,
  topics,
}: Props) => {
  const { t } = useLanguage();
  const [openTopic, setOpenTopic] = useState<string | null>(topics[0]?.id ?? null);
  const [active, setActive] = useState<{ topic: PurposeTopic; lesson: PurposeLesson } | null>(null);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [done, setDone] = useState<string[]>([]);

  const allLessons = useMemo(() => topics.flatMap((tp) => tp.lessons), [topics]);

  useEffect(() => {
    const parsed = safeStorage.get<string[]>(storageKey, []);
    if (Array.isArray(parsed)) setDone(parsed.filter((x) => typeof x === "string"));
  }, [storageKey]);

  useEffect(() => () => stopEnglishTts(), []);

  const persist = (next: string[]) => {
    setDone(next);
    safeStorage.set(storageKey, next);
  };

  const speak = (text: string, slow = false) => {
    void playEnglishTts(text, slow ? { speechRate: 0.62, playbackRate: 0.75 } : {});
  };

  const openLesson = (topic: PurposeTopic, lesson: PurposeLesson) => {
    stopEnglishTts();
    setActive({ topic, lesson });
    setPicked({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choose = (qIndex: number, optIndex: number) => {
    if (picked[qIndex] !== undefined || !active) return;
    const next = { ...picked, [qIndex]: optIndex };
    setPicked(next);
    const lesson = active.lesson;
    if (Object.keys(next).length === lesson.questions.length) {
      const correct = lesson.questions.filter((q, i) => next[i] === q.answer).length;
      if (!done.includes(lesson.id)) persist([...done, lesson.id]);
      void logStudentActivity({
        activityType,
        activityId: lesson.id,
        score: correct,
        maxScore: lesson.questions.length,
        metadata: { topic: active.topic.id, lessonTitle: lesson.title },
      });
    }
  };

  const progress = Math.round((done.length / Math.max(allLessons.length, 1)) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container relative z-10 mx-auto px-4 py-10 lg:py-14">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/15 via-background to-secondary/15 p-6 text-center sm:p-9"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            {emoji} {allLessons.length} {t("bài học", "lessons")} · {topics.length} {t("chủ đề", "topics")}
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text font-display text-3xl font-bold text-transparent lg:text-5xl">
            {t(titleVi, title)}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground">
            {t(taglineVi, tagline)}
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <div className="mb-1 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("Tiến độ của bạn", "Your progress")}</span>
              <span>
                {done.length}/{allLessons.length}
              </span>
            </div>
            <Progress value={progress} className="h-2.5" />
          </div>
        </motion.header>

        {!active && (
          <div className="mx-auto max-w-4xl space-y-4">
            {topics.map((topic) => {
              const isOpen = openTopic === topic.id;
              const topicDone = topic.lessons.filter((l) => done.includes(l.id)).length;
              return (
                <div
                  key={topic.id}
                  className="overflow-hidden rounded-2xl border-2 border-border bg-card shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                    className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-primary/5"
                    aria-expanded={isOpen}
                  >
                    <span className="text-2xl" aria-hidden>
                      {topic.emoji}
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-bold text-foreground sm:text-lg">
                        {t(topic.titleVi, topic.title)}
                      </span>
                      <span className="block text-sm leading-6 text-muted-foreground">
                        {t(topic.descriptionVi, topic.description)}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                      {topicDone}/{topic.lessons.length}
                    </span>
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {isOpen && (
                    <ul className="divide-y divide-border border-t border-border">
                      {topic.lessons.map((lesson, i) => (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => openLesson(topic, lesson)}
                            className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-primary/5"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 text-sm font-bold text-primary">
                              {i + 1}
                            </span>
                            <span className="flex-1">
                              <span className="block text-base font-semibold text-foreground">
                                {t(lesson.titleVi, lesson.title)}
                              </span>
                              <span className="block text-sm leading-6 text-muted-foreground">
                                {t(lesson.gistVi, lesson.gist)}
                              </span>
                            </span>
                            {done.includes(lesson.id) && (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {active && (
          <div className="mx-auto max-w-3xl">
            <Button
              variant="outline"
              onClick={() => {
                stopEnglishTts();
                setActive(null);
              }}
              className="mb-5 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("Quay lại danh sách chủ đề", "Back to topics")}
            </Button>

            <article className="space-y-6">
              <div className="rounded-2xl border-2 border-primary/30 bg-card p-5 sm:p-6">
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">
                  {active.topic.emoji} {t(active.topic.titleVi, active.topic.title)}
                </p>
                <h2 className="mb-2 font-display text-2xl font-bold text-foreground">
                  {t(active.lesson.titleVi, active.lesson.title)}
                </h2>
                <p className="text-base leading-7 text-muted-foreground">
                  {t(active.lesson.gistVi, active.lesson.gist)}
                </p>
              </div>

              <section className="rounded-2xl border-2 border-border bg-card p-5 sm:p-6">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
                  <BookOpen className="h-5 w-5 text-primary" />
                  {t("Cách dùng", "How it works")}
                </h3>
                <p className="whitespace-pre-wrap text-base leading-8 text-foreground/90">
                  {t(active.lesson.teachingVi, active.lesson.teaching)}
                </p>
              </section>

              <section className="rounded-2xl border-2 border-border bg-card p-5 sm:p-6">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  {t("Từ và cụm từ chính", "Key words and phrases")}
                </h3>
                <ul className="space-y-3">
                  {active.lesson.vocab.map((v) => (
                    <li key={v.term} className="rounded-xl border border-border bg-background p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold text-foreground">{v.term}</span>
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                          {v.pos}
                        </span>
                        <span className="text-sm text-muted-foreground">{v.vi}</span>
                        <span className="ml-auto flex gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("Nghe", "Listen")}
                            onClick={() => speak(`${v.term}. ${v.example}`)}
                          >
                            <Volume2 className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={t("Nghe chậm", "Listen slowly")}
                            onClick={() => speak(`${v.term}. ${v.example}`, true)}
                          >
                            <Turtle className="h-4 w-4 text-primary" />
                          </Button>
                        </span>
                      </div>
                      <p className="mt-2 text-base leading-7 text-foreground/90">{v.example}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{v.exampleVi}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-2xl border-2 border-primary/25 bg-primary/5 p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {t(active.lesson.model.labelVi, active.lesson.model.label)}
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    onClick={() => speak(active.lesson.model.lines.join(" "))}
                  >
                    <Volume2 className="h-4 w-4" />
                    {t("Nghe", "Listen")}
                  </Button>
                </div>
                <div className="space-y-2">
                  {active.lesson.model.lines.map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap text-base leading-8 text-foreground/90">
                      {line}
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border-2 border-border bg-card p-5 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                  <ListChecks className="h-5 w-5 text-primary" />
                  {t("Luyện tập", "Practice")}
                </h3>
                <ol className="space-y-5">
                  {active.lesson.questions.map((q, qi) => {
                    const chosen = picked[qi];
                    const answered = chosen !== undefined;
                    return (
                      <li key={qi} className="rounded-xl border border-border bg-background p-4">
                        <p className="mb-1 text-base font-semibold leading-7 text-foreground">
                          {qi + 1}. {q.question}
                        </p>
                        <p className="mb-3 text-sm leading-6 text-muted-foreground">{q.questionVi}</p>
                        <div className="grid gap-2">
                          {q.options.map((opt, oi) => {
                            const isRight = oi === q.answer;
                            const state = !answered
                              ? "border-border hover:border-primary/60 hover:bg-primary/5"
                              : isRight
                                ? "border-primary bg-primary/10"
                                : oi === chosen
                                  ? "border-destructive bg-destructive/10"
                                  : "border-border opacity-70";
                            return (
                              <button
                                key={oi}
                                type="button"
                                disabled={answered}
                                onClick={() => choose(qi, oi)}
                                className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-left text-base leading-7 transition-colors ${state}`}
                              >
                                <span className="font-bold text-primary">
                                  {String.fromCharCode(65 + oi)}.
                                </span>
                                <span className="flex-1 text-foreground">{opt}</span>
                                {answered && isRight && (
                                  <CheckCircle2 className="h-4 w-4 text-primary" />
                                )}
                                {answered && !isRight && oi === chosen && (
                                  <XCircle className="h-4 w-4 text-destructive" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        {answered && (
                          <div className="mt-3 rounded-lg border-l-4 border-primary bg-primary/5 p-3">
                            <p className="text-base font-semibold text-foreground">
                              {t("Đáp án", "Answer")}: {String.fromCharCode(65 + q.answer)}.{" "}
                              {q.options[q.answer]}
                            </p>
                            <p className="mt-1 text-base leading-7 text-foreground/90">
                              {q.explanation}
                            </p>
                            <p className="text-sm leading-6 text-muted-foreground">
                              {q.explanationVi}
                            </p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>

              <div className="flex flex-wrap gap-3">
                {(() => {
                  const idx = allLessons.findIndex((l) => l.id === active.lesson.id);
                  const nextLesson = allLessons[idx + 1];
                  const nextTopic = nextLesson
                    ? topics.find((tp) => tp.lessons.some((l) => l.id === nextLesson.id))
                    : undefined;
                  return nextLesson && nextTopic ? (
                    <Button className="gap-2" onClick={() => openLesson(nextTopic, nextLesson)}>
                      {t("Bài tiếp theo", "Next lesson")}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : null;
                })()}
                <Button
                  variant="outline"
                  onClick={() => {
                    stopEnglishTts();
                    setActive(null);
                  }}
                >
                  {t("Về danh sách chủ đề", "Back to topics")}
                </Button>
              </div>
            </article>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PurposeEnglishHub;
