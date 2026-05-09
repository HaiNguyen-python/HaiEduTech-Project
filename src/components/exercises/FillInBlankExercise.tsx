// Interactive fill-in-the-blank exercise component
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { pickEnglishGrammarCopy } from "@/lib/englishGrammarCopy";

interface Sentence {
  text: string;
  textEn: string;
  answer: string;
  hint?: string;
}

interface Props {
  instruction: string;
  instructionEn: string;
  sentences: Sentence[];
  forceEnglish?: boolean;
}

const FillInBlankExercise = ({ instruction, instructionEn, sentences, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const handleChange = (idx: number, value: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [idx]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowHints({});
  };

  const toggleHint = (idx: number) => {
    setShowHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const score = sentences.reduce(
    (acc, s, i) => acc + (answers[i]?.trim().toLowerCase() === s.answer.toLowerCase() ? 1 : 0),
    0
  );

  // Render sentence with blank replaced by input
  const renderSentence = (s: Sentence, idx: number) => {
    const displayText = forceEnglish ? (s.textEn || s.text) : t(s.text, s.textEn);
    const parts = displayText.split("___");
    const userAnswer = answers[idx] || "";
    const isCorrect = userAnswer.trim().toLowerCase() === s.answer.toLowerCase();

    return (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.08 }}
        className="glass-card rounded-xl p-4 space-y-2"
      >
        <div className="flex items-center gap-2 flex-wrap text-sm text-foreground leading-relaxed">
          <span className="font-medium text-muted-foreground w-6">{idx + 1}.</span>
          <span>{parts[0]}</span>
          <div className="relative inline-flex items-center">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleChange(idx, e.target.value)}
              disabled={submitted}
              placeholder="..."
              className={cn(
                "w-36 px-3 py-1.5 rounded-lg border text-sm font-medium text-center transition-all outline-none",
                submitted
                  ? isCorrect
                    ? "border-green-500 bg-green-500/10 text-green-700"
                    : "border-destructive bg-destructive/10 text-destructive"
                  : "border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              )}
            />
            {submitted && (
              <span className="absolute -right-6">
                {isCorrect ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </span>
            )}
          </div>
          {parts[1] && <span>{parts[1]}</span>}
        </div>

        <div className="flex items-center gap-3 ml-8">
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
          {submitted && !isCorrect && (
            <span className="text-xs text-muted-foreground">
              ✅ {forceEnglish ? "Answer" : t("Đáp án", "Answer")}: <span className="font-bold text-primary">{s.answer}</span>
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
            <div className="text-xs uppercase tracking-wider font-semibold text-primary px-1">📝 Questions</div>
            {sentences.map((s, i) => renderSentence(s, i))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
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
