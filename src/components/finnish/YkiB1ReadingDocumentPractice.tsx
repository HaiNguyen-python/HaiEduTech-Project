import { useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClickableFinnishText from "@/components/ClickableFinnishText";
import { useLanguage } from "@/contexts/LanguageContext";
import { YKI_B1_READING_DOCUMENT_SETS } from "@/data/ykiB1ReadingDocuments";

export default function YkiB1ReadingDocumentPractice({ translateMode }: { translateMode: boolean }) {
  const { t } = useLanguage();
  const [setIndex, setSetIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const set = YKI_B1_READING_DOCUMENT_SETS[setIndex];
  const passage = set.passages[taskIndex];
  const submitted = checked[passage.id] ?? false;
  const choices = passage.questions.filter((q) => q.kind === "choice");
  const correct = passage.questions.reduce((total, q, i) => total + (q.kind === "choice" && answers[`${passage.id}-${i}`] === q.answer ? 1 : 0), 0);
  const complete = passage.questions.every((_, i) => String(answers[`${passage.id}-${i}`] ?? "").trim().length > 0);
  const reset = () => {
    setChecked((old) => ({ ...old, [passage.id]: false }));
    setAnswers((old) => Object.fromEntries(Object.entries(old).filter(([key]) => !key.startsWith(`${passage.id}-`))));
  };
  return (
    <section className="space-y-4 border-y border-border py-6" aria-label="Uploaded YKI reading exams">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{t("Bộ đề đọc hiểu YKI B1", "YKI B1 Reading exam sets")}</h2>
        <Badge variant="secondary">3 sets · 15 texts · 79 questions</Badge>
      </div>
      <Tabs value={String(setIndex)} onValueChange={(value) => { setSetIndex(Number(value)); setTaskIndex(0); }}>
        <TabsList className="h-auto flex-wrap">
          {YKI_B1_READING_DOCUMENT_SETS.map((item, i) => <TabsTrigger key={item.id} value={String(i)}>{t("Bộ đề", "Set")} {item.number}</TabsTrigger>)}
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap gap-2">
        {set.passages.map((item, i) => <Button key={item.id} size="sm" variant={i === taskIndex ? "default" : "outline"} onClick={() => setTaskIndex(i)}>Tehtävä {item.task}</Button>)}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h3 className="text-lg font-bold">{passage.title}</h3><p className="mt-1 text-sm text-muted-foreground">Tekstin Ymmärtämisen Harjoitus {set.number} · Tehtävä {passage.task}</p></div>
        <Button variant="outline" size="sm" onClick={() => setTaskIndex((i) => (i + 1) % set.passages.length)}>{t("Tiếp theo", "Next")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
      </div>
      <div className="rounded-lg bg-muted/60 p-4 text-base leading-relaxed" lang="fi">
        {translateMode ? <ClickableFinnishText text={passage.textFi} /> : <p className="whitespace-pre-wrap">{passage.textFi}</p>}
      </div>
      <div className="space-y-5">
        {passage.questions.map((question, i) => {
          const key = `${passage.id}-${i}`;
          return <div key={key} className="space-y-2">
            <p className="text-base font-semibold" lang="fi">{i + 1}. {question.q}</p>
            {question.kind === "choice" ? <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option, oi) => <Button key={option} variant={answers[key] === oi ? "default" : "outline"} disabled={submitted} onClick={() => setAnswers((old) => ({ ...old, [key]: oi }))} className="h-auto min-h-11 justify-start whitespace-normal py-3 text-left font-normal" aria-pressed={answers[key] === oi}>{question.options.length > 2 ? `${String.fromCharCode(65 + oi)}. ` : ""}{option}</Button>)}
            </div> : <Textarea aria-label={`${i + 1}. ${question.q}`} lang="fi" value={String(answers[key] ?? "")} disabled={submitted} onChange={(event) => setAnswers((old) => ({ ...old, [key]: event.target.value }))} className="min-h-24 text-base" />}
            {submitted && <div className="border-l-2 border-primary pl-3 text-base">
              {question.kind === "choice" ? <p className="font-semibold text-primary">{answers[key] === question.answer ? t("Đúng", "Correct") : t("Chưa đúng", "Incorrect")} · {question.options[question.answer]}</p> : <><p className="font-semibold" lang="fi">{question.modelFi}</p><p className="mt-1 text-muted-foreground" lang="en">EN: {question.modelEn}</p></>}
              {question.kind === "choice" && <p className="mt-1 text-muted-foreground" lang="fi">{question.evidenceFi}</p>}
            </div>}
          </div>;
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={submitted || !complete} onClick={() => setChecked((old) => ({ ...old, [passage.id]: true }))}>{t("Kiểm tra đáp án", "Check answers")}</Button>
        <Button variant="outline" size="icon" aria-label="Reset answers" title="Reset answers" onClick={reset}><RotateCcw className="h-4 w-4" /></Button>
        {submitted && choices.length > 0 && <Badge variant="secondary">{correct} / {choices.length} {t("câu trắc nghiệm đúng", "correct choices")}</Badge>}
      </div>
      {submitted && <p className="text-sm text-muted-foreground">{t("Đáp án tham khảo được soạn từ bài đọc, không phải đáp án chính thức. Câu trả lời ngắn: tự đối chiếu các ý chính, không chấm theo cách viết giống hệt.", "Reference answers are prepared from the passages, not an official answer key. Short answers: compare the key ideas; they are not scored by exact wording.")}</p>}
    </section>
  );
}