/**
 * @file EnglishFunFacts.tsx
 * @description Interactive "English Fun Fact" module — masonry grid, category
 * filters, flip-card reveal, share-to-clipboard, daily fact widget, and
 * reaction buttons (🤯 / 😂 / 🔥) persisted in localStorage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Sparkles, Share2, Check, ArrowLeft, MessageCircle, Filter, Shuffle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import DailyFunFactWidget from "@/components/english/DailyFunFactWidget";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  englishFunFacts,
  FUN_FACT_CATEGORIES,
  type FunFact,
  type FunFactCategory,
} from "@/data/englishFunFacts";

const REACTIONS = [
  { key: "mind", emoji: "🤯", labelEn: "Mind blown", labelVi: "Sửng sốt" },
  { key: "lol",  emoji: "😂", labelEn: "Hilarious",  labelVi: "Hài hước" },
  { key: "fire", emoji: "🔥", labelEn: "Fire",       labelVi: "Đỉnh" },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];
type ReactionStore = Record<string, Record<ReactionKey, number>>;
type UserVotes = Record<string, ReactionKey>;

const STORAGE_REACTIONS = "haiedu_funfact_reactions_v1";
const STORAGE_VOTES = "haiedu_funfact_votes_v1";

const safeRead = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const EnglishFunFacts = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [activeCategory, setActiveCategory] = useState<FunFactCategory | "all">("all");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [reactions, setReactions] = useState<ReactionStore>(() => safeRead(STORAGE_REACTIONS, {}));
  const [userVotes, setUserVotes] = useState<UserVotes>(() => safeRead(STORAGE_VOTES, {}));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Persist reactions & votes
  useEffect(() => {
    localStorage.setItem(STORAGE_REACTIONS, JSON.stringify(reactions));
  }, [reactions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_VOTES, JSON.stringify(userVotes));
  }, [userVotes]);

  // Seed initial baseline reactions for a livelier feel (only first visit)
  useEffect(() => {
    if (Object.keys(reactions).length > 0) return;
    const seeded: ReactionStore = {};
    englishFunFacts.forEach((f, i) => {
      seeded[f.id] = {
        mind: 12 + ((i * 7) % 30),
        lol:  8  + ((i * 5) % 22),
        fire: 15 + ((i * 11) % 28),
      };
    });
    setReactions(seeded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter + optional shuffle
  const visibleFacts = useMemo(() => {
    const base =
      activeCategory === "all"
        ? englishFunFacts
        : englishFunFacts.filter((f) => f.category === activeCategory);
    if (shuffleSeed === 0) return base;
    // Deterministic shuffle based on seed (stable per click)
    const arr = [...base];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.abs(Math.sin(shuffleSeed * (i + 1)) * 10_000) % (i + 1) | 0;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [activeCategory, shuffleSeed]);

  const toggleFlip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleReact = (factId: string, key: ReactionKey) => {
    setReactions((prev) => {
      const current = prev[factId] ?? { mind: 0, lol: 0, fire: 0 };
      const previousVote = userVotes[factId];
      const next = { ...current };
      if (previousVote === key) {
        // Toggle off
        next[key] = Math.max(0, next[key] - 1);
        setUserVotes((v) => {
          const copy = { ...v };
          delete copy[factId];
          return copy;
        });
      } else {
        if (previousVote) next[previousVote] = Math.max(0, next[previousVote] - 1);
        next[key] = next[key] + 1;
        setUserVotes((v) => ({ ...v, [factId]: key }));
      }
      return { ...prev, [factId]: next };
    });
  };

  const handleShare = async (fact: FunFact) => {
    const text = `${fact.emoji} ${t(fact.headlineVi, fact.headline)}\n\n${t(fact.revealVi, fact.reveal)}\n\n— ${t("Khám phá thêm tại", "Discover more at")} https://haiedutech.com/english/fun-facts`;
    try {
      if (navigator.share) {
        await navigator.share({ title: t(fact.headlineVi, fact.headline), text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopiedId(fact.id);
      toast({
        title: t("Đã sao chép!", "Copied!"),
        description: t("Fact đã sẵn sàng để chia sẻ với bạn bè.", "The fact is ready to share with friends."),
      });
      setTimeout(() => setCopiedId((c) => (c === fact.id ? null : c)), 2000);
    } catch {
      // User cancelled share — silent
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="English Fun Facts | Curious Things About English | HaiEduTech"
        description="Khám phá những điều thú vị về tiếng Anh: nguồn gốc từ vựng, logic kỳ lạ, idioms hài hước và những lỗi vui người Việt thường gặp. Học mà chơi cùng HaiEduTech."
        path="/english/fun-facts"
      />
      <Navbar />

      <div className="pt-6 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Back link */}
          <Link
            to="/english"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Tiếng Anh", "Back to English Hub")}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-teal-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> {t("Khám phá Tiếng Anh", "English Discovery")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-3">
              English <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-teal-500 bg-clip-text text-transparent">Fun Facts</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              {t(
                "Những điều kỳ lạ, thú vị và hài hước về tiếng Anh — học mà cười, cười mà nhớ.",
                "The strange, surprising and hilarious side of English — learn while you smile, smile while you remember.",
              )}
            </p>
          </motion.div>

          {/* Daily Fact widget */}
          <DailyFunFactWidget />

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">{t("Lọc theo chuyên mục", "Filter by category")}</span>
              <button
                onClick={() => setShuffleSeed((s) => s + 1)}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-secondary hover:bg-primary/10 hover:border-primary/30 transition-colors text-xs font-medium text-foreground"
                title={t("Xáo trộn", "Shuffle")}
              >
                <Shuffle className="w-3.5 h-3.5" />
                {t("Xáo trộn", "Shuffle")}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                  activeCategory === "all"
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-secondary text-foreground border-border hover:border-primary/40",
                )}
              >
                ✨ {t("Tất cả", "All")} · {englishFunFacts.length}
              </button>
              {FUN_FACT_CATEGORIES.map((cat) => {
                const count = englishFunFacts.filter((f) => f.category === cat.key).length;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                      isActive
                        ? "bg-foreground text-background border-foreground shadow-md"
                        : "bg-secondary text-foreground border-border hover:border-primary/40",
                    )}
                  >
                    <span className="mr-1.5">{cat.emoji}</span>
                    {t(cat.labelVi, cat.labelEn)}
                    <span className={cn(
                      "ml-2 text-[10px] px-1.5 py-0.5 rounded-full",
                      isActive ? "bg-background/20 text-background" : "bg-foreground/10 text-muted-foreground",
                    )}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Masonry / Responsive grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            <AnimatePresence mode="popLayout">
              {visibleFacts.map((fact, idx) => {
                const meta = FUN_FACT_CATEGORIES.find((c) => c.key === fact.category)!;
                const isFlipped = flipped.has(fact.id);
                const factReactions = reactions[fact.id] ?? { mind: 0, lol: 0, fire: 0 };
                const userVote = userVotes[fact.id];
                const isCopied = copiedId === fact.id;

                return (
                  <motion.article
                    key={fact.id}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.32, delay: Math.min(idx * 0.03, 0.25) }}
                    className={cn(
                      "mb-5 break-inside-avoid rounded-2xl border bg-gradient-to-br backdrop-blur-sm overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all",
                      meta.gradient,
                      "border-border/60",
                    )}
                  >
                    {/* Card head */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/60 backdrop-blur text-[11px] font-bold uppercase tracking-wide text-foreground/80 border border-border/50">
                          <span>{meta.emoji}</span>
                          {meta.tag}
                        </span>
                        <div className="text-3xl sm:text-4xl leading-none drop-shadow-sm">{fact.emoji}</div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-snug mb-2">
                        {t(fact.headlineVi, fact.headline)}
                      </h3>
                      <p className="text-sm text-muted-foreground italic mb-4">
                        {t(fact.hookVi, fact.hook)}
                      </p>

                      {/* Reveal area (animated height) */}
                      <AnimatePresence initial={false}>
                        {isFlipped && (
                          <motion.div
                            key="reveal"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-xl bg-background/55 backdrop-blur border border-border/50 p-4 mb-4">
                              <p className="text-sm text-foreground leading-relaxed">
                                {t(fact.revealVi, fact.reveal)}
                              </p>
                              {(fact.example || fact.exampleVi) && (
                                <p className="mt-3 text-xs font-mono text-foreground/80 bg-foreground/[0.04] rounded-md px-3 py-2 border border-border/40">
                                  <Lightbulb className="inline w-3 h-3 mr-1 text-amber-500" />
                                  {t(fact.exampleVi ?? fact.example ?? "", fact.example ?? fact.exampleVi ?? "")}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action row */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFlip(fact.id)}
                          className={cn(
                            "flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                            isFlipped
                              ? "bg-foreground/10 text-foreground hover:bg-foreground/15"
                              : "bg-foreground text-background hover:opacity-90 shadow-md",
                          )}
                        >
                          {isFlipped
                            ? t("Ẩn đáp án", "Hide answer")
                            : t("Khám phá", "Reveal")}
                        </button>
                        <button
                          onClick={() => handleShare(fact)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background/60 backdrop-blur hover:bg-primary/10 hover:border-primary/40 transition-colors text-foreground"
                          title={t("Chia sẻ", "Share this fact")}
                          aria-label={t("Chia sẻ", "Share this fact")}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Share2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Reactions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          {REACTIONS.map((r) => {
                            const isVoted = userVote === r.key;
                            return (
                              <button
                                key={r.key}
                                onClick={() => handleReact(fact.id, r.key)}
                                className={cn(
                                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border",
                                  isVoted
                                    ? "bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300 scale-105"
                                    : "bg-background/60 border-border/60 text-foreground/80 hover:bg-foreground/5 hover:scale-105",
                                )}
                                title={t(r.labelVi, r.labelEn)}
                                aria-label={t(r.labelVi, r.labelEn)}
                              >
                                <span className="text-sm leading-none">{r.emoji}</span>
                                <span>{factReactions[r.key]}</span>
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {Object.values(factReactions).reduce((a, b) => a + b, 0)} {t("phản ứng", "reactions")}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {visibleFacts.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              {t("Chưa có fact nào trong chuyên mục này.", "No facts in this category yet.")}
            </div>
          )}

          {/* Contribute CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-teal-500/[0.05] to-amber-500/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-foreground mb-1">
                {t(
                  "Bạn biết một fact tiếng Anh thú vị?",
                  "Found a cool English fact?",
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Hãy chia sẻ với Thầy Hải — fact của bạn có thể sẽ xuất hiện ở đây cho hàng ngàn học viên khác cùng học hỏi!",
                  "Tell Teacher Hai — your fact might appear here for thousands of students to learn from!",
                )}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 shadow-md transition-opacity shrink-0"
            >
              {t("Gửi cho Thầy Hải", "Tell Teacher Hai")}
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EnglishFunFacts;
