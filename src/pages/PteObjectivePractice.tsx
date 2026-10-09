import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronRight, Headphones, ListChecks, RotateCcw, Volume2, XCircle } from "lucide-react";
import { toast } from "sonner";
import PteShell from "@/components/pte/PteShell";
import PteTimer from "@/components/pte/PteTimer";
import PteFilterBar, { DEFAULT_PTE_FILTERS, applyPteFilter, type PteFilterState } from "@/components/pte/PteFilterBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HIGHLIGHT_INCORRECT_ALL, MCQ_ALL, type PteHighlightIncorrect, type PteMcq } from "@/data/pteData";
import { usePteProgress } from "@/hooks/usePteProgress";
import { recordPteAttempt } from "@/lib/pteAttempts";
import { objectiveAccuracyToEstimate, scoreHighlightedWords, scoreMultipleAnswers, scoreSingleAnswer } from "@/lib/pteObjectiveScoring";

type Mode = "reading-single-answer" | "reading-multiple-answer" | "highlight-incorrect-words";

const MODES: { id: Mode; label: string }[] = [
  { id: "reading-single-answer", label: "Reading: Single Answer" },
  { id: "reading-multiple-answer", label: "Reading: Multiple Answers" },
  { id: "highlight-incorrect-words", label: "Listening: Highlight Incorrect Words" },
];

const PteObjectivePractice = () => {
  const [params] = useSearchParams();
  const requestedType = params.get("type");
  const [mode, setMode] = useState<Mode>(() => ["reading-single-answer", "reading-multiple-answer", "highlight-incorrect-words"].includes(requestedType ?? "") ? requestedType as Mode : "reading-single-answer");
  const [idx, setIdx] = useState(() => Math.max(0, (mode === "highlight-incorrect-words" ? HIGHLIGHT_INCORRECT_ALL : MCQ_ALL.filter(item => mode === "reading-single-answer" ? item.correctIndices.length === 1 : item.correctIndices.length > 1)).findIndex(item => item.id === params.get("item"))));
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [filters, setFilters] = useState<PteFilterState>(DEFAULT_PTE_FILTERS);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { recordCompletion } = usePteProgress();

  const mcqSource = useMemo(() => MCQ_ALL.filter(item => mode === "reading-single-answer" ? item.correctIndices.length === 1 : item.correctIndices.length > 1), [mode]);
  const highlightSource = HIGHLIGHT_INCORRECT_ALL;
  const filtered = useMemo<(PteMcq | PteHighlightIncorrect)[]>(() => {
    if (mode === "highlight-incorrect-words") {
      const matches = applyPteFilter(highlightSource, filters);
      return matches.length ? matches : highlightSource;
    }
    const matches = applyPteFilter(mcqSource, filters);
    return matches.length ? matches : mcqSource;
  }, [filters, highlightSource, mcqSource, mode]);
  const sourceLength = mode === "highlight-incorrect-words" ? highlightSource.length : mcqSource.length;
  const item = filtered[Math.min(idx, filtered.length - 1)];
  const isHighlight = mode === "highlight-incorrect-words";
  const mcq = isHighlight ? null : item as PteMcq;
  const highlight = isHighlight ? item as PteHighlightIncorrect : null;

  useEffect(() => {
    setSelected([]);
    setSubmitted(false);
    setPlaying(false);
    setPlayCount(0);
    setTimerKey(value => value + 1);
    window.speechSynthesis?.cancel();
  }, [mode, idx]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const result = useMemo(() => {
    if (!submitted) return null;
    if (highlight) return scoreHighlightedWords(selected, highlight.incorrectIndices);
    if (!mcq) return null;
    return mode === "reading-single-answer"
      ? scoreSingleAnswer(selected[0] ?? null, mcq.correctIndices[0])
      : scoreMultipleAnswers(selected, mcq.correctIndices);
  }, [highlight, mcq, mode, selected, submitted]);
  const estimate = result ? objectiveAccuracyToEstimate(result.accuracy) : null;

  const toggle = (index: number) => {
    if (submitted) return;
    if (mode === "reading-single-answer") setSelected([index]);
    else setSelected(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index]);
  };

  const playAudio = () => {
    if (!highlight || playCount >= 1 || playing) return;
    const utterance = new SpeechSynthesisUtterance(highlight.audioText);
    utterance.lang = highlight.accent ? `en-${highlight.accent === "UK" ? "GB" : highlight.accent}` : "en-US";
    utterance.rate = 0.9;
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => { setPlaying(false); setPlayCount(1); };
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const submit = () => {
    if (!selected.length) {
      toast.error(isHighlight ? "Select at least one word." : "Select an answer before submitting.");
      return;
    }
    const scored = highlight
      ? scoreHighlightedWords(selected, highlight.incorrectIndices)
      : mode === "reading-single-answer"
        ? scoreSingleAnswer(selected[0] ?? null, mcq?.correctIndices[0] ?? -1)
        : scoreMultipleAnswers(selected, mcq?.correctIndices ?? []);
    const score = objectiveAccuracyToEstimate(scored.accuracy);
    const itemId = item.id;
    const skill = isHighlight ? "listening" : "reading";
    setSubmitted(true);
    window.speechSynthesis?.cancel();
    recordCompletion(itemId, score);
    void recordPteAttempt({ skill, taskType: mode, itemId, score, accuracy: scored.accuracy, response: selected.join(","), mode: "timed" });
    toast.success(`Submitted - ${Math.round(scored.accuracy)}% accuracy`);
  };

  const reset = () => {
    setSelected([]);
    setSubmitted(false);
    setPlayCount(0);
    setTimerKey(value => value + 1);
  };

  const next = () => {
    if (idx < filtered.length - 1) setIdx(value => value + 1);
    else toast.success("You have completed this practice set.");
  };

  const correctIndices = highlight?.incorrectIndices ?? mcq?.correctIndices ?? [];

  return (
    <PteShell title="Objective Practice" subtitle="Reading and Listening tasks with exam-style scoring">
      {params.get("set") && <Link to={`/pte/mock/${params.get("set")}`} className="mb-4 inline-block text-sm font-semibold text-primary underline">Back to this practice set</Link>}
      <p className="mb-4 text-sm text-muted-foreground">Original practice with synthetic audio. Per-item timers are training targets, not official section deadlines.</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {MODES.map(entry => (
          <Button key={entry.id} variant={mode === entry.id ? "default" : "outline"} size="sm" onClick={() => { setMode(entry.id); setIdx(0); }}>
            {entry.id === "highlight-incorrect-words" ? <Headphones size={15} className="mr-2" /> : <ListChecks size={15} className="mr-2" />}
            {entry.label}
          </Button>
        ))}
      </div>

      <PteFilterBar value={filters} onChange={(value) => { setFilters(value); setIdx(0); }} resultCount={filtered.length} totalCount={sourceLength} />

      <section className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded bg-muted px-2 py-1 text-xs font-semibold text-primary">{MODES.find(entry => entry.id === mode)?.label} · {idx + 1}/{filtered.length}</span>
          <PteTimer seconds={isHighlight ? 120 : 90} label="Training target" running={!submitted} resetKey={timerKey} onComplete={() => toast.warning("Time is up.")} />
        </div>

        {mcq && (
          <>
            <p className="mb-4 rounded-lg border border-border bg-muted p-4 text-base leading-relaxed">{mcq.passage}</p>
            <h2 className="mb-3 text-lg font-bold">{mcq.question}</h2>
            {mode === "reading-multiple-answer" && <p className="mb-3 text-sm text-muted-foreground">Select all correct answers. An incorrect selection deducts one point, to a minimum of zero.</p>}
            {mode === "reading-single-answer" ? (
              <RadioGroup value={selected[0]?.toString()} onValueChange={value => toggle(Number(value))} className="gap-3">
                {mcq.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm">
                    <RadioGroupItem value={optionIndex.toString()} disabled={submitted} className="mt-0.5" />
                    <span className="flex-1">{option}</span>
                    {submitted && correctIndices.includes(optionIndex) && <CheckCircle2 size={18} className="text-primary" />}
                    {submitted && selected.includes(optionIndex) && !correctIndices.includes(optionIndex) && <XCircle size={18} className="text-destructive" />}
                  </label>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {mcq.options.map((option, optionIndex) => (
                  <label key={option} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm">
                    <Checkbox checked={selected.includes(optionIndex)} onCheckedChange={() => toggle(optionIndex)} disabled={submitted} className="mt-0.5" />
                    <span className="flex-1">{option}</span>
                    {submitted && correctIndices.includes(optionIndex) && <CheckCircle2 size={18} className="text-primary" />}
                    {submitted && selected.includes(optionIndex) && !correctIndices.includes(optionIndex) && <XCircle size={18} className="text-destructive" />}
                  </label>
                ))}
              </div>
            )}
          </>
        )}

        {highlight && (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-muted p-4">
              <Button size="sm" onClick={playAudio} disabled={playing || playCount >= 1 || submitted}>
                <Volume2 size={16} className="mr-2" /> {playing ? "Playing" : playCount ? "Played once" : "Play audio"}
              </Button>
              <p className="text-sm text-muted-foreground">The recording plays once. Select every word in the transcript that differs from what you hear.</p>
            </div>
            <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-4 text-base leading-8">
              {highlight.displayText.split(/\s+/).map((word, wordIndex) => {
                const chosen = selected.includes(wordIndex);
                const correct = correctIndices.includes(wordIndex);
                return (
                  <Button key={`${word}-${wordIndex}`} type="button" variant={chosen ? "default" : "outline"} size="sm" onClick={() => toggle(wordIndex)} disabled={submitted} className="h-auto px-2 py-1 text-base font-normal">
                    {word}
                    {submitted && correct && <CheckCircle2 size={14} className="ml-1" />}
                    {submitted && chosen && !correct && <XCircle size={14} className="ml-1" />}
                  </Button>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-5 flex justify-end gap-2">
          {!submitted ? <Button onClick={submit}>Submit</Button> : <>
            <Button variant="outline" onClick={reset}><RotateCcw size={14} className="mr-2" />Retry</Button>
            <Button onClick={next}>Next<ChevronRight size={14} className="ml-2" /></Button>
          </>}
        </div>
      </section>

      {submitted && result && estimate !== null && (
        <section className="mt-5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex flex-wrap items-baseline gap-3">
            <strong className="text-3xl text-primary">{Math.round(result.accuracy)}%</strong>
            <span className="font-semibold">{result.rawScore}/{result.maxScore} points</span>
            <span className="text-sm text-muted-foreground">HaiEduTech practice estimate: {estimate}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Correct selections: {result.correct}. Incorrect selections: {result.incorrect}. This is practice feedback, not an official Pearson score.</p>
          {highlight && <p className="mt-3 rounded-lg bg-muted p-3 text-sm"><strong>Recording transcript:</strong> {highlight.audioText}</p>}
        </section>
      )}
    </PteShell>
  );
};

export default PteObjectivePractice;