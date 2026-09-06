import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  Mic2,
  RotateCcw,
  Sparkles,
  Users,
  Volume2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConversationalRoleplay from "@/components/ConversationalRoleplay";
import DialogAudioPlayer from "@/components/DialogAudioPlayer";
import VocabReviewQuiz from "@/components/conversational/VocabReviewQuiz";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ConvLesson } from "@/data/conversationalCurriculum";
import { bannerImageFor, protagonistFor } from "@/lib/conversationalSituationVisuals";
import { resolveDialogueKeyPhrases } from "@/lib/dialogueKeyPhrases";
import { dialogueAvatarFor } from "@/lib/dialogueAvatars";
import { highlightKeywords } from "@/lib/highlightKeywords";

import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { cn } from "@/lib/utils";

const PARTNER_NAMES = ["Daniel", "Emma", "Lucas", "Maya", "Oliver", "Nora", "Ethan", "Clara"];

interface Props {
  lesson: ConvLesson;
  isComplete: boolean;
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

const PurposeCommunicationLab = ({
  lesson,
  isComplete,
  onBack,
  onComplete,
  onPrevious,
  onNext,
}: Props) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState("learn");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showTranscript, setShowTranscript] = useState(false);
  const heroName = protagonistFor(lesson.id);
  const partnerName = PARTNER_NAMES[
    Math.abs(Array.from(lesson.id).reduce((sum, char) => sum + char.charCodeAt(0), 0)) % PARTNER_NAMES.length
  ];
  const challenge = lesson.listeningChallenge;

  useEffect(() => {
    setTab("learn");
    setAnswers({});
    setShowTranscript(false);
    return () => stopEnglishTts();
  }, [lesson.id]);

  const score = useMemo(
    () => challenge.questions.filter((question, index) => answers[index] === question.answer).length,
    [answers, challenge.questions],
  );
  const finished = Object.keys(answers).length === challenge.questions.length;

  const tabs = [
    { value: "learn", labelVi: "Học", labelEn: "Learn", icon: BookOpen },
    { value: "listen", labelVi: "Hội thoại", labelEn: "Conversation", icon: MessageCircle },
    { value: "speak", labelVi: "Nói", labelEn: "Speak", icon: Mic2 },
    { value: "challenge", labelVi: "Thử thách", labelEn: "Challenge", icon: Sparkles },
  ];


  const goTo = (next: string) => {
    stopEnglishTts();
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("Về lộ trình", "Back to roadmap")}
        </Button>
        <div className="flex items-center gap-2">
          {onPrevious && (
            <Button variant="ghost" onClick={onPrevious} aria-label={t("Bài trước", "Previous lesson")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <span className="text-sm font-semibold text-muted-foreground">
            {isComplete ? t("Đã hoàn thành", "Completed") : t("Communication Lab", "Communication Lab")}
          </span>
          {onNext && (
            <Button variant="ghost" onClick={onNext} aria-label={t("Bài tiếp theo", "Next lesson")}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <header className="relative mb-6 min-h-[280px] overflow-hidden rounded-lg border border-border bg-card">
        <img
          src={bannerImageFor(lesson.title, lesson.descriptionVi, lesson.description)}
          alt={t(lesson.titleVi, lesson.title)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-background sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground">
              {t("Tình huống thực tế", "Real-world scenario")}
            </span>
            <span className="rounded-md border border-background/40 px-2.5 py-1 text-xs font-semibold">
              {lesson.badge}
            </span>
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">{t(lesson.titleVi, lesson.title)}</h1>
          <p className="mt-2 max-w-2xl text-base leading-7 text-background/85">
            {t(lesson.descriptionVi, lesson.description)}
          </p>
        </div>
      </header>

      <Tabs value={tab} onValueChange={goTo}>
        <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4">
          {tabs.map(({ value, labelVi, labelEn, icon: Icon }, index) => (
            <TabsTrigger key={value} value={value} className="min-h-11 gap-2 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {index + 1}
              </span>
              <Icon className="h-4 w-4" /> {t(labelVi, labelEn)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">{t("Mục tiêu bài học", "Lesson mission")}</p>
                <h2 className="mt-1 text-xl font-bold text-foreground">
                  {t("Giao tiếp tự nhiên trong các tình huống thật", "Communicate naturally in real situations")}
                </h2>
              </div>
              <Award className="h-7 w-7 shrink-0 text-secondary" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {lesson.keySituations.map((situation, index) => (
                <div key={situation.title} className="rounded-lg border border-border bg-background p-4">
                  <span className="text-xs font-bold text-primary">{t("TÌNH HUỐNG", "SCENARIO")} {index + 1}</span>
                  <h3 className="mt-1 font-bold text-foreground">{t(situation.titleVi, situation.title)}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {t(situation.descriptionVi, situation.description)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">{t("Cụm từ mang đi", "Takeaway phrases")}</p>
                <h2 className="text-xl font-bold text-foreground">{t("Nghe, ghi nhớ, sử dụng", "Listen, remember, use")}</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => void playEnglishTts(lesson.vocabulary.map((item) => `${item.term}. ${item.example}`).join(" "))}
              >
                <Volume2 className="h-4 w-4" /> {t("Nghe tất cả", "Listen all")}
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {lesson.vocabulary.map((item) => (
                <motion.div
                  key={item.term}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-primary">{item.term}</h3>
                      <p className="text-sm text-muted-foreground">{t(item.meaning, item.meaningEn)}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={t("Nghe cụm từ", "Listen to phrase")}
                      onClick={() => void playEnglishTts(`${item.term}. ${item.example}`)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-3 text-base leading-7 text-foreground">{item.example}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <VocabReviewQuiz vocabulary={lesson.vocabulary} />
          <div className="flex justify-end">
            <Button onClick={() => goTo("listen")} className="gap-2">
              {t("Tiếp tục phần hội thoại", "Continue to the conversation")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="listen" className="space-y-6">
          {lesson.keySituations.map((situation, situationIndex) => {
            const transcript = situation.sampleDialogue.map((line) => `${line.speaker}: ${line.line}`).join("\n");
            const speakers = Array.from(new Set(situation.sampleDialogue.map((line) => line.speaker)));
            const partners = speakers.filter((speaker) => speaker !== "You");
            const partnerLabel = (speaker: string) => (speaker === "Speaker" ? partnerName : speaker);
            const cast = [heroName, ...partners.map(partnerLabel)];
            const vocabTerms = lesson.vocabulary.map((item) => item.term);
            const keyPhrases = resolveDialogueKeyPhrases(
              situation.sampleDialogue.map((line) => line.line),
              vocabTerms,
            );
            return (
              <section key={situation.title} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="sticky top-0 z-10 border-b border-border bg-card/95 p-5 backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    {t("Hội thoại", "Conversation")} {situationIndex + 1}
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-foreground">{t(situation.titleVi, situation.title)}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 shrink-0" />
                    {t("Người nói", "Speakers")}: {cast.join(" · ")}
                  </p>
                  <div className="mt-4"><DialogAudioPlayer transcript={transcript} lang="en" /></div>
                </div>
                <div className="space-y-3 bg-muted/20 p-4 sm:p-6">
                  {situation.sampleDialogue.map((line, index) => {
                    const speakerIndex = speakers.indexOf(line.speaker);
                    const rightAligned = line.speaker === "You" || (line.speaker !== speakers[0] && speakerIndex % 2 === 1);
                    const name = line.speaker === "You" ? heroName : partnerLabel(line.speaker);
                    const avatar = dialogueAvatarFor(`${lesson.id}::${name}`, rightAligned);
                    return (
                      <div
                        key={`${line.speaker}-${index}`}
                        className={cn("group flex items-end gap-2", rightAligned ? "flex-row-reverse" : "flex-row")}
                      >
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 bg-background sm:h-11 sm:w-11",
                            rightAligned ? "border-primary/50" : "border-border",
                          )}
                        >
                          <img
                            src={avatar}
                            alt={name}
                            width={44}
                            height={44}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        </span>
                        <div className={cn("min-w-0 max-w-[82%] sm:max-w-[70%]", rightAligned ? "text-right" : "text-left")}>
                          <div
                            className={cn(
                              "mb-1 flex items-center gap-1.5",
                              rightAligned ? "flex-row-reverse" : "flex-row",
                            )}
                          >
                            <span className="text-xs font-bold text-muted-foreground">{name}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 text-primary opacity-0 transition-opacity hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
                              aria-label={t(`Nghe câu của ${name}`, `Play line from ${name}`)}
                              onClick={() => void playEnglishTts(line.line)}
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <p
                            className={cn(
                              "inline-block rounded-2xl border px-4 py-2.5 text-left text-base leading-7 [&_span]:decoration-1",
                               rightAligned
                                ? "rounded-br-sm border-primary/25 bg-primary/10 text-foreground"
                                : "rounded-bl-sm border-border bg-background text-foreground",
                            )}
                          >
                            {highlightKeywords(line.line, vocabTerms, keyPhrases)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <div className="flex justify-end">
            <Button onClick={() => goTo("speak")} className="gap-2">
              {t("Đến phần luyện nói", "Continue to speaking")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>


        <TabsContent value="speak">
          <ConversationalRoleplay
            lessonTitle={lesson.title}
            pillar={lesson.id.startsWith("pro-") ? "Business English" : "Academic English"}
            speakingTopics={lesson.speakingTopics}
            keySituationTitles={lesson.keySituations.map((situation) => situation.title)}
          />
          <div className="mt-6 flex justify-end">
            <Button onClick={() => goTo("challenge")} className="gap-2">
              {t("Làm thử thách", "Take the challenge")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="challenge" className="space-y-6">
          <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-primary">{t("Mini challenge", "Mini challenge")}</p>
                <h2 className="text-xl font-bold">{t(challenge.titleVi, challenge.title)}</h2>
              </div>
              <DialogAudioPlayer transcript={challenge.transcript} lang="en" />
            </div>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 hover:text-primary" onClick={() => setShowTranscript((current) => !current)}>
              {showTranscript ? t("Ẩn transcript", "Hide transcript") : t("Hiện transcript", "Show transcript")}
            </Button>
            {showTranscript && (
              <p className="mt-3 whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-base leading-7">
                {challenge.transcript}
              </p>
            )}
          </section>

          <section className="space-y-4">
            {challenge.questions.map((question, questionIndex) => {
              const selected = answers[questionIndex];
              const answered = selected !== undefined;
              return (
                <div key={question.q} className="rounded-lg border border-border bg-card p-4 sm:p-5">
                  <p className="font-bold leading-7">{questionIndex + 1}. {t(question.qVi, question.q)}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => {
                      const correct = optionIndex === question.answer;
                      return (
                        <Button
                          key={option}
                          type="button"
                          variant="outline"
                          disabled={answered}
                          onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                          className={cn(
                            "h-auto min-h-11 justify-start whitespace-normal py-2.5 text-left",
                            answered && correct && "border-primary bg-primary/10",
                            answered && selected === optionIndex && !correct && "border-destructive bg-destructive/10",
                          )}
                        >
                          <span className="mr-2 font-bold">{String.fromCharCode(65 + optionIndex)}.</span>
                          {option}
                          {answered && correct && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                          {answered && selected === optionIndex && !correct && <XCircle className="ml-auto h-4 w-4 shrink-0 text-destructive" />}
                        </Button>
                      );
                    })}
                  </div>
                  {answered && (
                    <p className="mt-3 rounded-md border-l-4 border-primary bg-primary/5 p-3 text-sm leading-6">
                      {t("Đáp án dựa trực tiếp vào thông tin trong đoạn nghe.", "The answer is stated directly in the listening passage.")}
                    </p>
                  )}
                </div>
              );
            })}
          </section>

          {finished && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-primary/30 bg-primary/5 p-5 text-center">
              <Award className="mx-auto h-9 w-9 text-primary" />
              <h2 className="mt-2 text-xl font-bold">{score}/{challenge.questions.length}</h2>
              <p className="mt-1 text-muted-foreground">
                {score === challenge.questions.length
                  ? t("Xuất sắc! Bạn đã làm chủ tình huống này.", "Excellent! You have mastered this scenario.")
                  : t("Nghe lại hội thoại rồi thử thêm một lần nữa nhé.", "Listen again, then give it another try.")}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAnswers({});
                    setShowTranscript(false);
                  }}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" /> {t("Thử lại", "Retry")}
                </Button>
                <Button onClick={() => onComplete(score, challenge.questions.length)} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {isComplete ? t("Đã hoàn thành", "Completed") : t("Hoàn thành bài", "Complete lesson")}
                </Button>
                {onNext && (
                  <Button variant="secondary" onClick={onNext} className="gap-2">
                    {t("Bài tiếp theo", "Next lesson")} <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.section>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PurposeCommunicationLab;