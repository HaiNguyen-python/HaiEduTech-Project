/**
 * @file ClickRevealEssay.tsx
 * @description Renders a sample essay one sentence at a time. The teacher /
 *   student clicks to reveal the next sentence, useful for live lessons.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  essayBody: string;
}

interface Token {
  paragraphIdx: number;
  raw: string;
}

const splitSentences = (text: string): string[] => {
  const matches = text.match(/[^.!?]+[.!?]+(?:["')\]]+)?(?=\s|$)/g);
  return matches ? matches.map(s => s.trim()).filter(Boolean) : [text.trim()];
};

const renderWithBold = (s: string) =>
  s.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-primary font-semibold">{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

const ClickRevealEssay = ({ essayBody }: Props) => {
  const { t } = useLanguage();

  const tokens: Token[] = useMemo(() => {
    const paragraphs = essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    const out: Token[] = [];
    paragraphs.forEach((para, pIdx) => {
      splitSentences(para).forEach(s => out.push({ paragraphIdx: pIdx, raw: s }));
    });
    return out;
  }, [essayBody]);

  const [shown, setShown] = useState(0);

  const grouped = useMemo(() => {
    const visible = tokens.slice(0, shown);
    const byPara: Record<number, string[]> = {};
    visible.forEach(tok => {
      if (!byPara[tok.paragraphIdx]) byPara[tok.paragraphIdx] = [];
      byPara[tok.paragraphIdx].push(tok.raw);
    });
    return Object.entries(byPara)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, sents]) => sents.join(" "));
  }, [tokens, shown]);

  const isDone = shown >= tokens.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          onClick={() => setShown(s => Math.min(s + 1, tokens.length))}
          disabled={isDone}
          className="bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold"
        >
          <MousePointerClick className="w-4 h-4 mr-1" />
          {shown === 0
            ? t("Hiện câu đầu tiên", "Reveal first sentence")
            : t("Hiện câu tiếp theo", "Reveal next sentence")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShown(tokens.length)}
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
          {shown}/{tokens.length} {t("câu", "sentences")}
        </span>
      </div>

      <div className="text-foreground leading-[2] text-[15px] font-['Georgia',_'Merriweather',_serif] min-h-[80px]">
        {grouped.length === 0 ? (
          <p className="italic text-muted-foreground text-sm">
            {t(
              "Nhấn 'Hiện câu đầu tiên' để bắt đầu giảng từng câu.",
              "Click 'Reveal first sentence' to start sentence-by-sentence teaching."
            )}
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {grouped.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-4 last:mb-0"
              >
                {renderWithBold(p)}
              </motion.p>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ClickRevealEssay;
