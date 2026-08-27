// Interactive fill-in-the-blank exercise component
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { pickEnglishGrammarCopy } from "@/lib/englishGrammarCopy";

interface Sentence {
  text: string;
  textEn: string;
  answer: string;
  /** One answer per gap when the sentence has more than one ___ marker. */
  answers?: string[];
  hint?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  sentences: Sentence[];
  /** Clickable words students can drop into the gaps. */
  wordBank?: string[];
  forceEnglish?: boolean;
}

const norm = (value: string) => value.replace(/\s+/g, " ").trim().toLowerCase();

/** Unique key for a single gap so a sentence can hold several inputs. */
const gapKey = (sentenceIdx: number, gapIdx: number) => `${sentenceIdx}:${gapIdx}`;

const answersOf = (sentence: Sentence) =>
  sentence.answers && sentence.answers.length > 0 ? sentence.answers : [sentence.answer];

const FillInBlankExercise = ({ instruction, instructionEn, sentences, wordBank, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [activeGap, setActiveGap] = useState<string>(gapKey(0, 0));

  const bank = (wordBank || []).filter(Boolean);

  /** Every gap in reading order - drives chip placement and the score. */
  const gapOrder = sentences.flatMap((sentence, idx) =>
    answersOf(sentence).map((_, gapIdx) => gapKey(idx, gapIdx))
  );

  const usedCounts = new Map<string, number>();
  Object.values(answers).forEach((value) => {
    const key = norm(value || "");
    if (key) usedCounts.set(key, (usedCounts.get(key) || 0) + 1);
  });

  /** Dim a chip once it sits in a gap - it stays clickable because answers may repeat. */
  const isChipUsed = (word: string) => (usedCounts.get(norm(word)) || 0) > 0;

  const firstEmptyGap = () => gapOrder.find((key) => !(answers[key] || "").trim()) || gapOrder[0];

  const pickWord = (word: string) => {
    if (submitted) return;
    const target = (answers[activeGap] || "").trim() ? firstEmptyGap() : activeGap;
    setAnswers((prev) => ({ ...prev, [target]: word }));
    const next = gapOrder[Math.min(gapOrder.indexOf(target) + 1, gapOrder.length - 1)];
    setActiveGap(next);
  };

  const clearGap = (key: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [key]: "" }));
    setActiveGap(key);
  };

  const handleChange = (key: string, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowHints({});
    setActiveGap(gapKey(0, 0));
  };

  const toggleHint = (idx: number) => {
    setShowHints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const isGapCorrect = (sentenceIdx: number, gapIdx: number, expected: string) =>
    norm(answers[gapKey(sentenceIdx, gapIdx)] || "") === norm(expected);

  // A sentence counts as correct only when every one of its gaps is right.
  const score = sentences.reduce(
    (acc, sentence, idx) =>
      acc + (answersOf(sentence).every((expected, gapIdx) => isGapCorrect(idx, gapIdx, expected)) ? 1 : 0),
    0
  );

  const renderGapInput = (sentenceIdx: number, gapIdx: number, expected: string) => {
    const key = gapKey(sentenceIdx, gapIdx);
    const value = answers[key] || "";
    const isCorrect = isGapCorrect(sentenceIdx, gapIdx, expected);

    return (
      <span key={key} className="relative inline-flex items-center mx-1 my-1">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(key, e.target.value)}
          onFocus={() => setActiveGap(key)}
          disabled={submitted}
          placeholder="..."
          className={cn(
            "w-36 px-3 py-1.5 rounded-lg border text-sm font-medium text-center transition-all outline-none",
            submitted
              ? isCorrect
                ? "border-green-500 bg-green-500/10 text-green-700"
                : "border-destructive bg-destructive/10 text-destructive"
              : activeGap === key
                ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
                : "border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          )}
        />
        {!submitted && value.trim() && (
          <button
            type="button"
            onClick={() => clearGap(key)}
            aria-label={forceEnglish ? "Clear this gap" : t("Xoá ô này", "Clear this gap")}
            className="absolute -right-4 text-xs text-muted-foreground hover:text-destructive"
          >
            ✕
          </button>
        )}
        {submitted && (
          <span className="absolute -right-5">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-destructive" />
            )}
          </span>
        )}
      </span>
    );
  };

  const renderSentence = (s: Sentence, idx: number) => {
    const displayText = forceEnglish ? (s.textEn || s.text) : t(s.text, s.textEn);
    const expected = answersOf(s);
    // Split on every gap marker so a sentence may carry two or more inputs.
    const parts = displayText.split(/_{2,}/);
    const allCorrect = expected.every((value, gapIdx) => isGapCorrect(idx, gapIdx, value));

    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.08 }}
        className="glass-card rounded-xl p-4 space-y-2"
      >
        <div className="flex items-center gap-1 flex-wrap text-sm text-foreground leading-relaxed">
          <span className="font-medium text-muted-foreground w-6">{idx + 1}.</span>
          {parts.map((part, partIdx) => (
            <span key={`part-${partIdx}`} className="inline-flex items-center flex-wrap">
              {part && <span>{part}</span>}
              {partIdx < parts.length - 1 && expected[partIdx] !== undefined
                ? renderGapInput(idx, partIdx, expected[partIdx])
                : null}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-8 flex-wrap">
          {pickEnglishGrammarCopy(s.hint, undefined, "Hint") && !submitted && (
            <button
              onClick={() => toggleHint(idx)}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3" />
              {showHints[idx]
                ? pickEnglishGrammarCopy(s.hint, undefined, "Focus on the grammar clue.")
                : (forceEnglish ? "Hint" : t("Gợi ý", "Hint"))}
            </button>
          )}
          {submitted && !allCorrect && (
            <span className="text-xs text-muted-foreground">
              ✅ {forceEnglish ? "Answer" : t("Đáp án", "Answer")}:{" "}
              <span className="font-bold text-primary">{expected.join(" / ")}</span>
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  // Separate passage from instruction if present
  const rawInstruction = forceEnglish ? instructionEn : t(instruction, instructionEn);
  const [titlePart, ...passageParts] = rawInstruction.split("\n\nPassage:");
  const passage = passageParts.length > 0 ? passageParts.join("\n\nPassage:").trim() : null;

  const wordBankPanel = bank.length > 0 && (
    <div
      className={cn(
        "rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2 transition-opacity",
        submitted && "opacity-60"
      )}
    >
      <div className="text-xs uppercase tracking-wider font-semibold text-primary">
        🧰 {forceEnglish ? "Word bank" : t("Ngân hàng từ", "Word bank")}
      </div>
      <p className="text-xs text-muted-foreground">
        {forceEnglish
          ? "Tap a word to put it into the selected gap."
          : t("Bấm vào một từ để điền vào ô đang chọn.", "Tap a word to put it into the selected gap.")}
      </p>
      <div className="flex flex-wrap gap-2">
        {bank.map((word, i) => {
          const used = isChipUsed(word);
          return (
            <button
              key={`${word}-${i}`}
              type="button"
              onClick={() => pickWord(word)}
              disabled={submitted}
              className={cn(
                "px-3 py-1.5 rounded-full border text-sm font-medium transition-all",
                used
                  ? "border-border bg-muted text-muted-foreground"
                  : "border-primary/40 bg-background text-foreground hover:border-primary hover:bg-primary/10"
              )}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="font-semibold text-foreground text-[15px] leading-7 whitespace-pre-line flex-1 min-w-0 bg-muted/40 border border-border rounded-lg p-4">
          <span className="mr-2">✍️</span>{titlePart.trim()}
        </div>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-sm font-bold",
              score === sentences.length ? "text-green-500" : score >= sentences.length / 2 ? "text-yellow-500" : "text-destructive"
            )}>
              {score}/{sentences.length} {forceEnglish ? "correct" : t("đúng", "correct")}
            </span>
            <button onClick={handleReset} className="text-sm text-primary hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {forceEnglish ? "Retry" : t("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      {passage ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 rounded-xl border border-border bg-muted/40 p-6 text-[17px] text-foreground leading-8 font-medium whitespace-pre-line">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/60">
              <span className="font-semibold text-primary text-xs uppercase tracking-wider">📖 Passage</span>
            </div>
            <div className="not-italic">{passage}</div>
          </div>
          <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-4 lg:max-h-[85vh] lg:overflow-y-auto lg:pr-2">
            {wordBankPanel}
            <div className="text-xs uppercase tracking-wider font-semibold text-primary px-1">📝 Questions</div>
            {sentences.map((s, i) => renderSentence(s, i))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {wordBankPanel}
          {sentences.map((s, i) => renderSentence(s, i))}
        </div>
      )}

      {!submitted && Object.keys(answers).length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          {forceEnglish ? "Check Answers" : t("Kiểm tra", "Check Answers")}
        </motion.button>
      )}
    </div>
  );
};

export default FillInBlankExercise;
