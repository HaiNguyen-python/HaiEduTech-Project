// Multiple-choice quiz exercise component
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Props {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  forceEnglish?: boolean;
}

const QuizExercise = ({ questions, onComplete, forceEnglish = false }: Props) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
    onComplete?.(score, questions.length);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">✏️ {forceEnglish ? "Quiz" : t("Trắc nghiệm", "Quiz")}</h3>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-sm font-bold",
              score === questions.length ? "text-green-500" : score >= questions.length / 2 ? "text-yellow-500" : "text-destructive"
            )}>
              {score}/{questions.length} {forceEnglish ? "correct" : t("đúng", "correct")}
            </span>
            <button onClick={handleReset} className="text-sm text-primary hover:underline flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> {forceEnglish ? "Retry" : t("Làm lại", "Retry")}
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <motion.div
            key={qi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qi * 0.08 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-foreground">{qi + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const isCorrectOpt = q.answer === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(qi, oi)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm text-left transition-all border flex items-center gap-2",
                      submitted
                        ? isCorrectOpt
                          ? "border-green-500 bg-green-500/10 text-green-700"
                          : selected
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : "border-border text-muted-foreground"
                        : selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-secondary-foreground hover:border-primary/50 hover:bg-primary/5"
                    )}
                  >
                    {submitted && isCorrectOpt && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                    {submitted && selected && !isCorrectOpt && <XCircle className="w-3.5 h-3.5 shrink-0" />}
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-xs text-muted-foreground ml-1 mt-1">💬 {q.explanation}</p>
            )}
          </motion.div>
        ))}
      </div>

      {!submitted && Object.keys(answers).length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
        >
          {forceEnglish ? "Submit" : t("Nộp bài", "Submit")}
        </motion.button>
      )}
    </div>
  );
};

export default QuizExercise;
