/**
 * @file DailyFunFactWidget.tsx
 * @description Compact "Fun Fact of the Day" card for the English hub home page.
 * Rotates deterministically every 24 hours and links to the full module.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Calendar } from "lucide-react";
import { getDailyFunFact } from "@/data/englishFunFacts";
import { useLanguage } from "@/contexts/LanguageContext";

const DailyFunFactWidget = () => {
  const { t } = useLanguage();
  const fact = useMemo(() => getDailyFunFact(), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-10 relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.10] via-teal-500/[0.06] to-sky-500/[0.10] p-6 sm:p-7"
    >
      {/* Decorative blur blobs */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-12 w-56 h-56 rounded-full bg-teal-400/15 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row gap-5 items-start">
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
          {fact.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wide">
              <Sparkles className="w-3 h-3" />
              {t("Fun Fact của Ngày", "Fun Fact of the Day")}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-snug mb-1.5">
            {t(fact.headlineVi, fact.headline)}
          </h3>
          <p className="text-sm text-muted-foreground italic mb-3">
            {t(fact.hookVi, fact.hook)}
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {t(fact.revealVi, fact.reveal)}
          </p>

          <Link
            to="/english/fun-facts"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-amber-700 dark:text-amber-300 hover:gap-2.5 transition-all"
          >
            {t("Khám phá thêm Fun Facts", "Explore more Fun Facts")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyFunFactWidget;
