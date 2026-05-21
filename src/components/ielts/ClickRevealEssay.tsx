/**
 * @file ClickRevealEssay.tsx
 * @description Reveals a sample essay paragraph-by-paragraph. Each paragraph
 *   gets a section label (Introduction / Overview / Body / Conclusion) and a
 *   distinct brush-style background so students can clearly distinguish the
 *   function of each part. Bold lexical-resource keywords remain highlighted.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  essayBody: string;
  taskType: 1 | 2;
}

const renderWithBold = (s: string) =>
  s.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-primary font-bold underline decoration-primary/40 decoration-2 underline-offset-2">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

// Brush-style background variants per paragraph role - each has a distinct hue
const BRUSH_STYLES = [
  // Introduction - sky/blue brush
  "bg-gradient-to-br from-sky-500/15 via-sky-400/8 to-transparent border-l-4 border-sky-500/70",
  // Overview / Body 1 - emerald brush
  "bg-gradient-to-br from-emerald-500/15 via-emerald-400/8 to-transparent border-l-4 border-emerald-500/70",
  // Body 2 - amber brush
  "bg-gradient-to-br from-amber-500/15 via-amber-400/8 to-transparent border-l-4 border-amber-500/70",
  // Body 3 / Conclusion - rose brush
  "bg-gradient-to-br from-rose-500/15 via-rose-400/8 to-transparent border-l-4 border-rose-500/70",
  // Extra - violet brush
  "bg-gradient-to-br from-violet-500/15 via-violet-400/8 to-transparent border-l-4 border-violet-500/70",
];

const LABEL_COLORS = [
  "text-sky-600 dark:text-sky-400",
  "text-emerald-600 dark:text-emerald-400",
  "text-amber-600 dark:text-amber-400",
  "text-rose-600 dark:text-rose-400",
  "text-violet-600 dark:text-violet-400",
];

const buildLabels = (count: number, taskType: 1 | 2, t: (vi: string, en: string) => string): string[] => {
  const labels: string[] = [];
  if (taskType === 1) {
    // Task 1: Introduction, Overall, Body 1, Body 2, ...
    for (let i = 0; i < count; i++) {
      if (i === 0) labels.push(t("Giới thiệu", "Introduction"));
      else if (i === 1) labels.push(t("Tổng quan", "Overall"));
      else labels.push(`${t("Thân bài", "Body")} ${i - 1}`);
    }
  } else {
    // Task 2: Introduction, Body 1, Body 2, ..., Conclusion
    for (let i = 0; i < count; i++) {
      if (i === 0) labels.push(t("Giới thiệu", "Introduction"));
      else if (i === count - 1) labels.push(t("Kết luận", "Conclusion"));
      else labels.push(`${t("Thân bài", "Body")} ${i}`);
    }
  }
  return labels;
};

const ClickRevealEssay = ({ essayBody, taskType }: Props) => {
  const { t } = useLanguage();

  const paragraphs = useMemo(
    () => essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean),
    [essayBody]
  );
  const labels = useMemo(() => buildLabels(paragraphs.length, taskType, t), [paragraphs.length, taskType, t]);

  const [shown, setShown] = useState(0);
  const isDone = shown >= paragraphs.length;
  const nextLabel = !isDone ? labels[shown] : "";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          onClick={() => setShown(s => Math.min(s + 1, paragraphs.length))}
          disabled={isDone}
          className="bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold"
        >
          <MousePointerClick className="w-4 h-4 mr-1" />
          {isDone ? t("Đã hiện đủ", "All shown") : nextLabel}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShown(paragraphs.length)}
          disabled={isDone}
        >
          <Eye className="w-4 h-4 mr-1" /> {t("Hiện tất cả", "Show all")}
        </Button>
        {shown > 0 && (
          <Button size="sm" variant="ghost" onClick={() => setShown(0)}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> {t("Làm lại", "Reset")}
          </Button>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          {shown}/{paragraphs.length} {t("đoạn", "paragraphs")}
        </span>
      </div>

      <div className="space-y-4 min-h-[80px]">
        {shown === 0 ? (
          <p className="italic text-muted-foreground text-sm">
            {t(
              "Nhấn nút để hiện từng phần của bài viết.",
              "Click the button to reveal each part of the essay."
            )}
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {paragraphs.slice(0, shown).map((p, i) => {
              const brush = BRUSH_STYLES[i % BRUSH_STYLES.length];
              const labelColor = LABEL_COLORS[i % LABEL_COLORS.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-xl p-4 md:p-5 ${brush}`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${labelColor}`}>
                    {labels[i]}
                  </p>
                  <p className="text-foreground leading-[2] text-[15px] font-['Georgia',_'Merriweather',_serif]">
                    {renderWithBold(p)}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ClickRevealEssay;
