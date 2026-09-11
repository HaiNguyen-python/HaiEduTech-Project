import { useMemo, useState } from "react";
import { CheckCircle2, Mic, MicOff, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { compareDrillWords, drillAccuracy } from "@/lib/speakingDrillScore";
import type { SpecializedLesson, SpecializedLang } from "@/lib/specializedLanguage";
import { speechCodeFor } from "@/lib/specializedLanguage";

interface Props {
  lesson: SpecializedLesson;
  language: SpecializedLang;
  lessonNumber: number;
  bestScore: number;
  isPassed: boolean;
  t: (vi: string, en: string) => string;
  onQuizComplete: (score: number) => void;
}

const highlightPhrases = (line: string, phrases: string[] = []) => {
  if (!phrases.length) return line;
  const escaped = phrases.filter(Boolean).map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return line;
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  return line.split(regex).map((part, index) =>
    phrases.some((phrase) => phrase.toLocaleLowerCase() === part.toLocaleLowerCase())
      ? <strong key={`${part}-${index}`} className="rounded bg-primary/15 px-1 font-bold text-primary">{part}</strong>
      : part,
  );
};

const normalizeText = (value: string) => value.toLocaleLowerCase().replace(/[\s.,!?;:'"“”‘’()\-…]/g, "");

// AI sometimes returns a translation identical to the source line (e.g. English pathways).
// Only show the translation when it adds real information.
const isMeaningfulTranslation = (source: string, translation?: string) => {
  if (!translation) return false;
  const a = normalizeText(source);
  const b = normalizeText(translation);
  return b.length > 0 && a !== b;
};

const ShadowingPractice = ({ target, language, t }: { target: string; language: SpecializedLang; t: Props["t"] }) => {
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const recognizer = useSpeechRecognizer({
    speechLang: speechCodeFor(language),
    maxSeconds: 30,
    onFinal: (transcript) => setAccuracy(drillAccuracy(compareDrillWords(target, transcript))),
  });

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="mb-2 text-sm font-semibold">{t("Luyện nói lại câu mẫu", "Say the model sentence")}</p>
      <p className="mb-3 text-base leading-relaxed">{target}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" variant={recognizer.isRecording ? "destructive" : "outline"} onClick={recognizer.isRecording ? recognizer.stop : recognizer.start} disabled={!recognizer.supported}>
          {recognizer.isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {recognizer.isRecording ? t("Dừng", "Stop") : t("Bắt đầu nói", "Start speaking")}
        </Button>
        {recognizer.isRecording && <span className="text-sm text-muted-foreground">{recognizer.seconds}s</span>}
        {accuracy !== null && <Badge variant={accuracy >= 75 ? "default" : "secondary"}>{t("Độ chính xác", "Accuracy")}: {accuracy}%</Badge>}
      </div>
      {!recognizer.supported && <p className="mt-2 text-sm text-muted-foreground">{t("Trình duyệt này không hỗ trợ micro. Bạn vẫn có thể đọc thành tiếng và tiếp tục bài học.", "This browser does not support microphone practice. You can still read aloud and continue.")}</p>}
      {recognizer.transcript && <p className="mt-2 text-sm text-muted-foreground">{t("Đã nghe", "Heard")}: {recognizer.transcript}</p>}
    </div>
  );
};

export default function SpecializedLessonView({ lesson, language, lessonNumber, bestScore, isPassed, t, onQuizComplete }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const score = useMemo(() => Math.round((lesson.quiz.reduce((sum, question, index) => sum + (answers[index] === question.correctIndex ? 1 : 0), 0) / lesson.quiz.length) * 100), [answers, lesson.quiz]);

  const speak = (text: string, key: string) => {
    window.speechSynthesis.cancel();
    if (speakingKey === key) { setSpeakingKey(null); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechCodeFor(language);
    utterance.rate = 0.86;
    utterance.onend = () => setSpeakingKey(null);
    utterance.onerror = () => setSpeakingKey(null);
    setSpeakingKey(key);
    window.speechSynthesis.speak(utterance);
  };

  const submit = () => {
    setSubmitted(true);
    onQuizComplete(score);
  };

  const retry = () => { setAnswers({}); setSubmitted(false); };

  return (
    <article className="space-y-7">
      <header className="border-b pb-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge>{t("Bài", "Lesson")} {lessonNumber}</Badge>
          <Badge variant="outline">{lesson.estimatedMinutes} {t("phút", "min")}</Badge>
          {isPassed && <Badge className="bg-emerald-600"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />{t("Đã qua", "Passed")}</Badge>}
        </div>
        <h2 className="text-2xl font-bold sm:text-3xl">{lesson.title}</h2>
        <p className="mt-1 text-muted-foreground">{lesson.subtitle}</p>
        <p className="mt-4 rounded-lg border-l-4 border-primary bg-primary/5 p-4 leading-relaxed"><strong>{t("Mục tiêu", "Objective")}:</strong> {lesson.objective}</p>
      </header>

      <section>
        <h3 className="mb-4 text-xl font-bold">{t("Từ và cụm từ cốt lõi", "Core vocabulary")}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {lesson.vocabulary.map((word, index) => {
            const key = `word-${index}`;
            return <Card key={`${word.term}-${index}`}><CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div><p className="text-lg font-bold">{word.term}</p>{word.pronunciation && <p className="text-sm font-medium text-primary">{word.pronunciation}</p>}</div>
                <Button type="button" size="icon" variant="ghost" aria-label={t("Nghe từ", "Listen to word")} onClick={() => speak(word.term, key)}>{speakingKey === key ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}</Button>
              </div>
              <p className="mt-1 text-sm"><Badge variant="secondary" className="mr-2">{word.partOfSpeech}</Badge>{isMeaningfulTranslation(word.term, word.translation) ? word.translation : ""}</p>
              <div className="mt-3 rounded-md bg-muted/50 p-3 text-sm leading-relaxed">
                <div className="flex gap-2"><p className="flex-1">{word.example}</p><Button type="button" size="icon" variant="ghost" className="h-7 w-7" aria-label={t("Nghe ví dụ", "Listen to example")} onClick={() => speak(word.example, `example-${index}`)}><Play className="h-3.5 w-3.5" /></Button></div>
                {isMeaningfulTranslation(word.example, word.exampleTranslation) && <p className="mt-1 text-muted-foreground">{word.exampleTranslation}</p>}
              </div>
            </CardContent></Card>;
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-xl font-bold">{lesson.scenario.title}</h3>
        <p className="mb-3 text-muted-foreground">{lesson.scenario.context}</p>
        <div className="space-y-2">
          {lesson.scenario.dialogue.map((line, index) => <div key={`${line.speaker}-${index}`} className="rounded-lg border bg-card p-4">
            <div className="flex items-start gap-2"><p className="min-w-0 flex-1 leading-relaxed"><strong className="text-primary">{line.speaker}:</strong> {highlightPhrases(line.line, line.keyPhrases)}</p><Button type="button" size="icon" variant="ghost" aria-label={t("Nghe câu", "Listen to line")} onClick={() => speak(line.line, `line-${index}`)}><Volume2 className="h-4 w-4" /></Button></div>
            {isMeaningfulTranslation(line.line, line.translation) && <p className="mt-1 text-sm italic text-muted-foreground">{line.translation}</p>}
          </div>)}
        </div>
      </section>

      <ShadowingPractice target={lesson.scenario.dialogue[0]?.line ?? lesson.title} language={language} t={t} />

      <section className="grid gap-4 md:grid-cols-2">
        <Card><CardContent className="p-5"><h3 className="mb-2 text-lg font-bold">{lesson.languageFocus.title}</h3><p className="text-sm leading-relaxed">{lesson.languageFocus.explanation}</p><ul className="mt-3 space-y-2 text-sm">{lesson.languageFocus.examples.map((example, index) => <li key={index} className="rounded bg-muted/50 p-2">{example}</li>)}</ul></CardContent></Card>
        <Card><CardContent className="p-5"><h3 className="mb-2 text-lg font-bold">{t("Phát âm và văn hóa", "Pronunciation and culture")}</h3><ul className="space-y-2 text-sm">{lesson.pronunciationTips.map((tip, index) => <li key={index}>• {tip}</li>)}</ul><p className="mt-4 border-t pt-3 text-sm leading-relaxed">{lesson.culturalNote}</p></CardContent></Card>
      </section>

      <section className="rounded-lg border bg-primary/5 p-5"><h3 className="mb-3 text-lg font-bold">{t("Luyện tập", "Practice")}</h3><ol className="space-y-2">{lesson.practiceTasks.map((task, index) => <li key={index}><strong>{index + 1}.</strong> {task}</li>)}</ol></section>

      <section className="rounded-lg border-2 p-5" data-testid="specialized-quiz">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-bold">{t("Kiểm tra kiến thức", "Knowledge check")}</h3><p className="text-sm text-muted-foreground">{t("Cần ít nhất 75% để mở bài tiếp theo.", "Score at least 75% to unlock the next lesson.")}</p></div>{bestScore > 0 && <Badge variant="outline">{t("Điểm tốt nhất", "Best")}: {bestScore}%</Badge>}</div>
        <Progress value={(Object.keys(answers).length / lesson.quiz.length) * 100} className="mb-5" />
        <div className="space-y-6">{lesson.quiz.map((question, questionIndex) => <fieldset key={questionIndex} disabled={submitted}><legend className="mb-3 font-semibold">{questionIndex + 1}. {question.question}</legend><div className="grid gap-2 sm:grid-cols-2">{question.options.map((option, optionIndex) => {
          const selected = answers[questionIndex] === optionIndex;
          const correct = submitted && optionIndex === question.correctIndex;
          const incorrect = submitted && selected && !correct;
          return <Button key={optionIndex} type="button" variant="outline" className={`h-auto min-h-11 justify-start whitespace-normal text-left ${selected ? "border-primary bg-primary/10 text-foreground" : ""} ${correct ? "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" : ""} ${incorrect ? "border-destructive bg-destructive/10 text-foreground" : ""}`} onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}>{option}</Button>;
        })}</div>{submitted && <p className="mt-2 text-sm text-muted-foreground">{question.explanation}</p>}</fieldset>)}</div>
        <div className="mt-6 flex flex-wrap items-center gap-3">{!submitted ? <Button onClick={submit} disabled={Object.keys(answers).length !== lesson.quiz.length}>{t("Nộp bài", "Submit quiz")}</Button> : <><Badge className={score >= 75 ? "bg-emerald-600" : "bg-destructive"}>{score}%</Badge>{score < 75 && <Button variant="outline" onClick={retry}><RotateCcw className="mr-2 h-4 w-4" />{t("Làm lại", "Try again")}</Button>}</> }</div>
      </section>

      <p className="rounded-lg bg-muted p-4 font-medium"><strong>{t("Ghi nhớ", "Takeaway")}:</strong> {lesson.takeaway}</p>
    </article>
  );
}