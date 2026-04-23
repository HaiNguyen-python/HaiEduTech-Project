import { useMemo, useState } from "react";
import type { LanguageLesson, LanguageModule } from "@/data/languageCurriculum";
import { BadgeCheck, PencilLine, Rows3, SpellCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pickEnglishGrammarCopy } from "@/lib/englishGrammarCopy";

interface GrammarExtraPracticeProps {
  lesson: LanguageLesson;
  module: LanguageModule;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[.,!?;:()"'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const GrammarExtraPractice = ({ lesson, module }: GrammarExtraPracticeProps) => {
  const isGrammarLesson = module.category === "grammar" && module.language === "english";

  const typingPrompts = useMemo(
    () =>
      lesson.exercises
        .filter((exercise) => exercise.type === "fill-in-blank")
        .flatMap((exercise) =>
            exercise.sentences.map((sentence, index) => ({
            id: `${lesson.id}-typing-${index}`,
            prompt: sentence.textEn || sentence.text,
            answer: sentence.answer,
              hint: pickEnglishGrammarCopy(sentence.hint, undefined, "Focus on the grammar signal in the sentence."),
          }))
        )
        .slice(0, 3),
    [lesson]
  );

  const sentencePrompts = useMemo(
    () =>
      lesson.exercises
        .filter((exercise) => exercise.type === "sentence-reorder")
        .flatMap((exercise) =>
          exercise.items.map((item, index) => ({
            id: `${lesson.id}-sentence-${index}`,
            scrambled: item.scrambled.join(" · "),
            answer: item.correctEn || item.correct,
          }))
        )
        .slice(0, 2),
    [lesson]
  );

  const vocabPrompts = useMemo(() => {
    if (!lesson.vocabulary?.length) return [];

    return lesson.vocabulary.slice(0, 4).map((entry, index) => ({
      id: `${lesson.id}-vocab-${index}`,
      clue: entry.meaningEn || entry.meaning,
      answer: entry.word,
      example: entry.exampleEn || entry.example,
    }));
  }, [lesson]);

  const [typingAnswers, setTypingAnswers] = useState<Record<string, string>>({});
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<string, string>>({});
  const [vocabAnswers, setVocabAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totalItems = typingPrompts.length + sentencePrompts.length + vocabPrompts.length;

  if (!isGrammarLesson || totalItems === 0) return null;

  const checkAnswer = (id: string, value: string, answer: string) => {
    const isCorrect = normalize(value) === normalize(answer);
    setChecked((prev) => ({ ...prev, [id]: isCorrect }));
  };

  const getState = (id: string, value: string) => {
    if (!value) return "idle";
    return checked[id] ? "correct" : checked[id] === false ? "wrong" : "idle";
  };

  const stateClass = (state: string) => {
    if (state === "correct") return "border-primary bg-primary/5";
    if (state === "wrong") return "border-destructive bg-destructive/5";
    return "border-border bg-card";
  };

  return (
    <section className="space-y-4" aria-label="Extra grammar practice">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-2 flex items-center gap-2 text-foreground">
          <PencilLine className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Extra Practice</h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          Add one more round of practice with short answer drills, sentence building, and vocabulary recall.
        </p>
      </div>

      {typingPrompts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <SpellCheck className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Targeted answer drills</h3>
          </div>
          <div className="space-y-4">
            {typingPrompts.map((item, index) => {
              const current = typingAnswers[item.id] || "";
              const state = getState(item.id, current);

              return (
                <div key={item.id} className={`rounded-xl border p-4 ${stateClass(state)}`}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Drill {index + 1}</p>
                  <p className="mb-3 text-sm text-foreground">{item.prompt}</p>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <Input
                      value={current}
                      onChange={(event) => setTypingAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                      placeholder="Type your answer"
                    />
                    <Button type="button" onClick={() => checkAnswer(item.id, current, item.answer)}>
                      Check
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {state === "correct"
                      ? `Correct: ${item.answer}`
                      : state === "wrong"
                        ? `Try again. Correct answer: ${item.answer}`
                        : item.hint || "Focus on the grammar signal in the sentence."}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sentencePrompts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <Rows3 className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Sentence builder</h3>
          </div>
          <div className="space-y-4">
            {sentencePrompts.map((item, index) => {
              const current = sentenceAnswers[item.id] || "";
              const state = getState(item.id, current);

              return (
                <div key={item.id} className={`rounded-xl border p-4 ${stateClass(state)}`}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Build {index + 1}</p>
                  <p className="mb-2 text-sm text-muted-foreground">{item.scrambled}</p>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <Input
                      value={current}
                      onChange={(event) => setSentenceAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                      placeholder="Rewrite the full sentence"
                    />
                    <Button type="button" onClick={() => checkAnswer(item.id, current, item.answer)}>
                      Check
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {state === "correct"
                      ? `Correct: ${item.answer}`
                      : state === "wrong"
                        ? `Review word order. Correct sentence: ${item.answer}`
                        : "Keep the grammar frame and punctuation natural."}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {vocabPrompts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <BadgeCheck className="h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold">Grammar vocabulary recall</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {vocabPrompts.map((item) => {
              const current = vocabAnswers[item.id] || "";
              const state = getState(item.id, current);

              return (
                <div key={item.id} className={`rounded-xl border p-4 ${stateClass(state)}`}>
                  <p className="mb-2 text-sm font-medium text-foreground">{item.clue}</p>
                  <p className="mb-3 text-xs text-muted-foreground">{item.example}</p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={current}
                      onChange={(event) => setVocabAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                      placeholder="Type the grammar word"
                    />
                    <Button type="button" variant="secondary" onClick={() => checkAnswer(item.id, current, item.answer)}>
                      Check
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {state === "correct"
                      ? `Correct: ${item.answer}`
                      : state === "wrong"
                        ? `Answer: ${item.answer}`
                        : "Recall the exact grammar term or pattern word."}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default GrammarExtraPractice;