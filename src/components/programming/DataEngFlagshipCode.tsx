import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2, BookOpen, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CodeBlock from "@/components/CodeBlock";
import { dataEngFlagshipProjects } from "@/data/dataEngFlagshipCode";

/**
 * 10 flagship Data Engineering project code samples for read-along practice.
 * Each card shows what the learner will take away, then a richly commented
 * code block. Cards are collapsed by default to keep the page short.
 */
const DataEngFlagshipCode = () => {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(dataEngFlagshipProjects[0]?.id ?? null);

  return (
    <section className="mb-10">
      <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 p-5 sm:p-6 mb-5">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              {t("📖 10 dự án Data Engineering lớn - đọc code có bình luận",
                 "📖 10 Flagship Data Engineering Projects - Annotated Code")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {t(
                "Tổng hợp mẫu code thực chiến của các công ty lớn (Airbnb, Netflix, Uber, Spotify, Databricks...). Mỗi block đều có bình luận chi tiết bằng tiếng Việt để bạn hiểu vì sao code được viết như vậy, chứ không chỉ copy-paste.",
                "Real-world code patterns from companies like Airbnb, Netflix, Uber, Spotify and Databricks. Every snippet is heavily commented so you understand the WHY, not just the HOW.",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dataEngFlagshipProjects.map((p, i) => {
          const isOpen = openId === p.id;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.25), duration: 0.3 }}
              className="glass-card rounded-xl border border-border/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : p.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl shrink-0">
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      #{i + 1}
                    </span>
                    <h3 className="font-display font-bold text-foreground text-base leading-snug">
                      {t(p.title, p.titleEn)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{p.company}</span>
                    <span className="mx-1">•</span>
                    <span>{p.stack.slice(0, 3).join(" · ")}</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-border/60"
                  >
                    <div className="p-4 sm:p-5 space-y-4">
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5">
                        <div className="flex items-center gap-1.5 mb-2 text-amber-700 dark:text-amber-300 font-semibold text-sm">
                          <Lightbulb className="w-4 h-4" />
                          {t("Bạn sẽ học được", "What you will learn")}
                        </div>
                        <ul className="space-y-1.5 text-sm text-foreground/85">
                          {p.whatYouLearn.map((point, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-600 shrink-0">▸</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <CodeBlock code={p.code} language={p.language} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default DataEngFlagshipCode;
