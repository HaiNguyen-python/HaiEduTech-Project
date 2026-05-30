/**
 * @file StrategyCard.tsx
 * @description Displays one SAT strategy card (steps + example + trap) inline
 * at the top of a lesson's theory section, helping students apply tested
 * techniques rather than re-learning from scratch.
 */
import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SatStrategyCard as TCard } from "@/data/satStrategyCards";

const StrategyCard = ({ card }: { card: TCard }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="not-prose my-6 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-violet-500/10 p-5 md:p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl" aria-hidden>{card.emoji}</span>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-bold">
            {t("Chiến lược của thầy Hải", "Mr. Hai's Strategy")}
          </div>
          <h3 className="text-base md:text-lg font-display font-bold text-foreground">
            {t(card.title.vi, card.title.en)}
          </h3>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {card.steps.map((s, i) => (
          <li key={i} className="flex items-start gap-2 text-[15px] leading-7 text-foreground/90">
            <ChevronRight className="w-4 h-4 mt-1 text-emerald-600 shrink-0" />
            <span>{t(s.vi, s.en)}</span>
          </li>
        ))}
      </ul>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-sky-700 dark:text-sky-300">
              {t("Ví dụ", "Example")}
            </span>
          </div>
          <p className="text-sm leading-6 text-foreground/90">{t(card.example.vi, card.example.en)}</p>
        </div>
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
              {t("Bẫy thường gặp", "Common trap")}
            </span>
          </div>
          <p className="text-sm leading-6 text-foreground/90">{t(card.trap.vi, card.trap.en)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StrategyCard;
