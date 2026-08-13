/**
 * @file SwedishReadingReviewQuiz.tsx
 * @description Post-reading review quiz shown at the end of the comprehension
 *              questions: mixed vocabulary + grammar drills (MCQ both
 *              directions, gap-fill typing, sentence word order, grammar
 *              structure spotting) built from the passage itself.
 *              Collapsible, auto-scored, retry gives a fresh selection.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Dumbbell, ChevronDown, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from "@/contexts/LanguageContext";
import { SwedishAudioButton } from "@/components/swedish/SwedishAudioButton";
import { buildReadingReviewQuiz, normalizeAnswer, type ReviewTask } from "@/lib/swedishReadingReview";
import { cn } from "@/lib/utils";

interface Props {
  passageId: string;
  textSv: string;
  keyVocab: { sv: string; vi: string }[];
}

const KIND_LABEL: Record<ReviewTask["kind"], [string, string]> = {
  "vocab-en2sv": ["Từ vựng", "Ordförråd"],
  "vocab-sv2en": ["Nghĩa từ", "Betydelse"],
  gapfill: ["Điền từ", "Lucktext"],
  wordorder: ["Sắp xếp câu", "Ordföljd"],
  grammar: ["Ngữ pháp", "Grammatik"],
};

const SwedishReadingReviewQuiz = ({ passageId, textSv, keyVocab }: Props) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [built, setBuilt] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const tasks = useMemo(
    () => buildReadingReviewQuiz(`${passageId}#${round}`, textSv, keyVocab),
    [passageId, textSv, keyVocab, round],
  );

  const reset = (nextRound: boolean) => {
    setPicks({});
    setTyped({});
    setBuilt({});
    setSubmitted(false);
    if (nextRound) setRound((r) => r + 1);
  };

  const isCorrect = (task: ReviewTask): boolean => {
    if (task.kind === "wordorder") {
      return normalizeAnswer((built[task.id] || []).join(" ")) === normalizeAnswer(task.answerText || "");
    }
    if (task.kind === "gapfill") {
      return normalizeAnswer(typed[task.id] || "") === normalizeAnswer(task.answerText || "");
    }
    return picks[task.id] === task.correctIndex;
  };

  const answeredAll = tasks.every((task) => {
    if (task.kind === "wordorder") return (built[task.id] || []).length === (task.tokens || []).length;
    if (task.kind === "gapfill") return (typed[task.id] || "").trim().length > 0;
    return typeof picks[task.id] === "number";
  });

  const score = tasks.filter(isCorrect).length;

  if (tasks.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-6">
      <Card className="border-amber-500/30 bg-amber-500/[0.04]">
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-amber-600 dark:text-amber-300" />
              {t("Ôn tập từ vựng & ngữ pháp", "Vocabulary & grammar review")}
              <Badge variant="outline" className="ml-auto text-[10px]">
                {tasks.length} {t("bài tập", "tasks")}
              </Badge>
              <ChevronDown
                className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-5">
            {tasks.map((task, ti) => {
              const label = KIND_LABEL[task.kind];
              const ok = submitted && isCorrect(task);
              return (
                <div key={task.id} className="space-y-2 rounded-lg border bg-card/60 p-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                      {t(label[0], label[1])}
                    </Badge>
                    <div className="text-sm font-semibold text-foreground">
                      {ti + 1}. {task.promptSv}
                      <span className="block text-xs font-normal text-muted-foreground italic">
                        {t(task.promptVi, task.promptEn)}
                      </span>
                    </div>
                  </div>

                  {task.hint && (
                    <p className="rounded-md bg-muted/60 p-2.5 text-sm text-foreground whitespace-pre-wrap">
                      {task.hint}
                    </p>
                  )}

                  {task.options && (
                    <div className="grid gap-2">
                      {task.options.map((opt, oi) => {
                        const picked = picks[task.id] === oi;
                        const correctOpt = submitted && oi === task.correctIndex;
                        let cls = "border-border hover:border-primary/40";
                        if (submitted && correctOpt) cls = "border-emerald-500 bg-emerald-500/10";
                        else if (submitted && picked && !correctOpt) cls = "border-rose-500 bg-rose-500/10";
                        else if (!submitted && picked) cls = "border-primary bg-primary/5";
                        return (
                          <button
                            key={oi}
                            disabled={submitted}
                            onClick={() => setPicks((p) => ({ ...p, [task.id]: oi }))}
                            className={`text-left rounded-lg border p-2.5 text-sm transition ${cls}`}
                          >
                            <span className="font-semibold mr-2 text-primary">
                              {String.fromCharCode(65 + oi)}.
                            </span>
                            <span className="text-foreground">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {task.kind === "gapfill" && (
                    <Input
                      value={typed[task.id] || ""}
                      disabled={submitted}
                      onChange={(e) => setTyped((v) => ({ ...v, [task.id]: e.target.value }))}
                      placeholder={t("Nhập từ...", "Skriv ordet...")}
                      className="max-w-xs"
                    />
                  )}

                  {task.kind === "wordorder" && (
                    <div className="space-y-2">
                      <div className="min-h-11 rounded-lg border border-dashed p-2 flex flex-wrap gap-1.5">
                        {(built[task.id] || []).map((tk, i) => (
                          <button
                            key={`${tk}-${i}`}
                            disabled={submitted}
                            onClick={() =>
                              setBuilt((b) => ({
                                ...b,
                                [task.id]: (b[task.id] || []).filter((_, idx) => idx !== i),
                              }))
                            }
                            className="rounded-md bg-primary/10 border border-primary/30 px-2 py-1 text-sm"
                          >
                            {tk}
                          </button>
                        ))}
                        {(built[task.id] || []).length === 0 && (
                          <span className="text-xs text-muted-foreground self-center px-1">
                            {t("Bấm các từ bên dưới", "Tryck på orden nedan")}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(task.tokens || []).map((tk, i) => {
                          const usedCount = (built[task.id] || []).filter((x) => x === tk).length;
                          const totalCount = (task.tokens || []).filter((x) => x === tk).length;
                          const exhausted = usedCount >= totalCount;
                          return (
                            <button
                              key={`${tk}-src-${i}`}
                              disabled={submitted || exhausted}
                              onClick={() =>
                                setBuilt((b) => ({ ...b, [task.id]: [...(b[task.id] || []), tk] }))
                              }
                              className={cn(
                                "rounded-md border px-2 py-1 text-sm transition",
                                exhausted
                                  ? "opacity-30 border-border"
                                  : "border-border hover:border-primary/50 hover:bg-primary/5",
                              )}
                            >
                              {tk}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {submitted && (
                    <div
                      className={cn(
                        "flex items-start gap-2 rounded-md p-2 text-xs",
                        ok
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "bg-rose-500/10 text-rose-700 dark:text-rose-300",
                      )}
                    >
                      {ok ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 shrink-0" />
                      )}
                      <div className="space-y-1">
                        {task.explanationSv && (
                          <div className="flex items-center gap-1.5 font-medium">
                            <span>{task.explanationSv}</span>
                            <SwedishAudioButton text={task.explanationSv} />
                          </div>
                        )}
                        <div>{t(task.explanationVi, task.explanationEn)}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {!submitted ? (
              <Button
                className="w-full"
                disabled={!answeredAll}
                onClick={() => {
                  setSubmitted(true);
                  // Feed the Learning DNA dashboard with a real graded attempt.
                  void logStudentActivity({
                    activityType: "swedish_reading_review",
                    activityId: passageId,
                    score,
                    maxScore: tasks.length,
                    metadata: { passageId, round, taskKinds: tasks.map((k) => k.kind) },
                  });
                }}
              >

                {answeredAll
                  ? t("Kiểm tra đáp án", "Check answers")
                  : t("Hãy làm hết các bài tập", "Complete all tasks first")}
              </Button>
            ) : (
              <div className="rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-4 text-center">
                <div className="text-sm text-muted-foreground">{t("Điểm ôn tập", "Review score")}</div>
                <div className="text-3xl font-bold text-amber-600">
                  {score} / {tasks.length}
                </div>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => reset(false)}>
                    <RotateCcw className="w-4 h-4" />
                    {t("Làm lại", "Retry")}
                  </Button>
                  <Button size="sm" className="gap-2" onClick={() => reset(true)}>
                    ✨ {t("Bài tập mới", "New tasks")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default SwedishReadingReviewQuiz;
