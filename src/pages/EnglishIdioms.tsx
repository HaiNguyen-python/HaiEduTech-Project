/**
 * @file EnglishIdioms.tsx
 * @description "Idioms, Proverbs & Quotes" - interactive English Foundation
 * module. Browsable bilingual library + four engaging exercises:
 *   1. Meaning Match (English phrase ↔ Vietnamese meaning)
 *   2. Fill the Idiom (missing word in the phrase)
 *   3. Quick Quiz (literal trap vs. real meaning)
 *   4. Vietnamese Equivalent (English saying ↔ Vietnamese proverb)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Sparkles, BookOpen, Quote, Lightbulb, Filter,
  Shuffle, Volume2, Check, X, Trophy, RefreshCw, Flame, Star, Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { englishIdioms, IDIOM_THEMES, type IdiomEntry, type IdiomCategory } from "@/data/englishIdioms";

type Tab = "library" | "match" | "fill" | "quiz" | "equivalent";

const TABS: { key: Tab; labelEn: string; labelVi: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { key: "library",    labelEn: "Library",            labelVi: "Thư viện",         icon: BookOpen,  color: "from-amber-500 to-orange-500" },
  { key: "match",      labelEn: "Meaning Match",      labelVi: "Ghép nghĩa",       icon: Target,    color: "from-teal-500 to-emerald-500" },
  { key: "fill",       labelEn: "Fill the Idiom",     labelVi: "Điền từ còn thiếu", icon: Lightbulb, color: "from-sky-500 to-blue-500" },
  { key: "quiz",       labelEn: "Quick Quiz",         labelVi: "Trắc nghiệm",      icon: Sparkles,  color: "from-violet-500 to-fuchsia-500" },
  { key: "equivalent", labelEn: "VN Equivalent",      labelVi: "Tục ngữ tương đương", icon: Trophy, color: "from-rose-500 to-pink-500" },
];

const CATEGORY_META: Record<IdiomCategory, { labelEn: string; labelVi: string; emoji: string; chip: string }> = {
  idiom:   { labelEn: "Idiom",   labelVi: "Thành ngữ",    emoji: "🎭", chip: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40" },
  proverb: { labelEn: "Proverb", labelVi: "Tục ngữ",      emoji: "📜", chip: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/40" },
  quote:   { labelEn: "Quote",   labelVi: "Danh ngôn",    emoji: "💬", chip: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/40" },
};

// Deterministic shuffle (Fisher–Yates with sin-based RNG)
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.abs(Math.sin(seed * (i + 1) * 9301)) * 233280 % (i + 1) | 0;
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const speakEn = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
};

const EnglishIdioms = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [tab, setTab] = useState<Tab>("library");
  const [filterCategory, setFilterCategory] = useState<IdiomCategory | "all">("all");
  const [filterTheme, setFilterTheme] = useState<IdiomEntry["theme"] | "all">("all");
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const switchTab = (nextTab: Tab) => {
    setTab(nextTab);
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const filteredEntries = useMemo(() => {
    return englishIdioms.filter((e) =>
      (filterCategory === "all" || e.category === filterCategory) &&
      (filterTheme === "all" || e.theme === filterTheme),
    );
  }, [filterCategory, filterTheme]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t(
          "Thành ngữ, Tục ngữ & Danh ngôn Tiếng Anh | HaiEduTech",
          "English Idioms, Proverbs & Quotes | HaiEduTech",
        )}
        description={t(
          "Khám phá kho thành ngữ, tục ngữ và danh ngôn tiếng Anh kèm bài tập tương tác: ghép nghĩa, điền từ, trắc nghiệm và tìm tục ngữ Việt tương đương.",
          "Discover an interactive library of English idioms, proverbs and famous quotes with matching games, fill-in-blank, quizzes and Vietnamese-equivalent challenges.",
        )}
        path="/english/idioms"
      />
      <Navbar />

      <div className="pt-6 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/15 to-amber-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-4">
              <Quote className="w-4 h-4" /> {t("English Foundation", "English Foundation")}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-3">
              {t("Thành ngữ, Tục ngữ", "Idioms, Proverbs")}{" "}
              <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500 bg-clip-text text-transparent">
                & {t("Danh ngôn", "Quotes")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
              {t(
                "Học những câu nói hay nhất bằng tiếng Anh - kèm nghĩa thật, ví dụ thực tế và câu tục ngữ Việt tương đương. Sau khi đọc, hãy thử ngay 4 dạng bài tập tương tác để ghi nhớ lâu!",
                "Master the most beautiful English sayings - with real meanings, natural examples and Vietnamese equivalents. Then test yourself with 4 interactive exercises to make them stick!",
              )}
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur">
            {TABS.map((tabDef) => {
              const Icon = tabDef.icon;
              const isActive = tab === tabDef.key;
              return (
                <button
                  key={tabDef.key}
                  onClick={() => switchTab(tabDef.key)}
                  className={cn(
                    "flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    isActive
                      ? `bg-gradient-to-r ${tabDef.color} text-white shadow-md`
                      : "text-foreground/70 hover:bg-background hover:text-foreground",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t(tabDef.labelVi, tabDef.labelEn)}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div ref={contentRef} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {tab === "library" && (
                <LibraryView
                  entries={filteredEntries}
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  filterTheme={filterTheme}
                  setFilterTheme={setFilterTheme}
                  shuffleSeed={shuffleSeed}
                  setShuffleSeed={setShuffleSeed}
                  t={t}
                />
              )}
              {tab === "match" && <MatchExercise t={t} toast={toast} />}
              {tab === "fill" && <FillExercise t={t} toast={toast} />}
              {tab === "quiz" && <QuizExercise t={t} toast={toast} />}
              {tab === "equivalent" && <EquivalentExercise t={t} toast={toast} />}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ==================================================================== */
/*                              LIBRARY VIEW                            */
/* ==================================================================== */
interface LibraryViewProps {
  entries: IdiomEntry[];
  filterCategory: IdiomCategory | "all";
  setFilterCategory: (c: IdiomCategory | "all") => void;
  filterTheme: IdiomEntry["theme"] | "all";
  setFilterTheme: (th: IdiomEntry["theme"] | "all") => void;
  shuffleSeed: number;
  setShuffleSeed: (n: number) => void;
  t: (vi: string, en: string) => string;
}
const LEARNED_STORAGE_KEY = "haiedu_learned_idioms_v1";

const LibraryView = ({ entries, filterCategory, setFilterCategory, filterTheme, setFilterTheme, shuffleSeed, setShuffleSeed, t }: LibraryViewProps) => {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [learned, setLearned] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(LEARNED_STORAGE_KEY);
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch { return new Set(); }
  });
  const [showLearnedOnly, setShowLearnedOnly] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(LEARNED_STORAGE_KEY, JSON.stringify(Array.from(learned))); } catch { /* noop */ }
  }, [learned]);

  const toggle = (id: string) =>
    setRevealed((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const toggleLearned = (id: string) =>
    setLearned((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const baseDisplay = useMemo(() => shuffle(entries, shuffleSeed), [entries, shuffleSeed]);
  const display = useMemo(
    () => (showLearnedOnly ? baseDisplay.filter((e) => learned.has(e.id)) : baseDisplay),
    [baseDisplay, showLearnedOnly, learned],
  );
  const learnedCountInView = useMemo(
    () => baseDisplay.filter((e) => learned.has(e.id)).length,
    [baseDisplay, learned],
  );

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Filter className="w-4 h-4" />
          <span className="font-medium">{t("Lọc & xáo trộn", "Filter & shuffle")}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            {t(`Đã thuộc: ${learned.size}`, `Learned: ${learned.size}`)}
          </span>
          <button
            onClick={() => setShowLearnedOnly((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors",
              showLearnedOnly
                ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                : "bg-secondary border-border text-foreground hover:bg-amber-500/10 hover:border-amber-500/40",
            )}
            title={t("Chỉ hiện các từ đã đánh dấu sao", "Show only starred entries")}
          >
            <Star className={cn("w-3.5 h-3.5", showLearnedOnly && "fill-current")} />
            {showLearnedOnly
              ? t("Đang xem: Đã thuộc", "Viewing: Learned")
              : t(`Chỉ Đã thuộc (${learnedCountInView})`, `Only Learned (${learnedCountInView})`)}
          </button>
          <button
            onClick={() => setShuffleSeed(shuffleSeed + 1)}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-secondary hover:bg-primary/10 hover:border-primary/30 transition-colors text-xs font-medium text-foreground"
          >
            <Shuffle className="w-3.5 h-3.5" /> {t("Xáo trộn", "Shuffle")}
          </button>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {(["all", "idiom", "proverb", "quote"] as const).map((c) => {
            const isActive = filterCategory === c;
            const label = c === "all" ? t("Tất cả", "All") : t(CATEGORY_META[c].labelVi, CATEGORY_META[c].labelEn);
            const emoji = c === "all" ? "✨" : CATEGORY_META[c].emoji;
            return (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                  isActive
                    ? "bg-foreground text-background border-foreground shadow-md"
                    : "bg-secondary text-foreground border-border hover:border-primary/40",
                )}
              >
                <span className="mr-1.5">{emoji}</span>{label}
              </button>
            );
          })}
        </div>

        {/* Theme chips */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTheme("all")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
              filterTheme === "all"
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-background border-border text-muted-foreground hover:border-primary/30",
            )}
          >
            {t("Mọi chủ đề", "All themes")}
          </button>
          {IDIOM_THEMES.map((th) => {
            const isActive = filterTheme === th.key;
            return (
              <button
                key={th.key}
                onClick={() => setFilterTheme(th.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  isActive
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-background border-border text-muted-foreground hover:border-primary/30",
                )}
              >
                <span className="mr-1">{th.emoji}</span>
                {t(th.labelVi, th.labelEn)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards grid */}
      {display.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          {t("Không có kết quả với bộ lọc hiện tại.", "No entries match the current filters.")}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {display.map((entry, idx) => {
            const meta = CATEGORY_META[entry.category];
            const isOpen = revealed.has(entry.id);
            const isLearned = learned.has(entry.id);
            return (
              <motion.article
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.2) }}
                className={cn(
                  "rounded-2xl border bg-gradient-to-br from-background to-secondary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 flex flex-col relative",
                  isLearned ? "border-amber-500/60 ring-1 ring-amber-500/30" : "border-border/60",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleLearned(entry.id)}
                  aria-pressed={isLearned}
                  aria-label={isLearned ? t("Bỏ đánh dấu Đã thuộc", "Unmark as learned") : t("Đánh dấu Đã thuộc", "Mark as learned")}
                  title={isLearned ? t("Đã thuộc – nhấn để bỏ", "Learned – click to unmark") : t("Đánh dấu là Đã thuộc", "Mark as learned")}
                  className={cn(
                    "absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all z-10",
                    isLearned
                      ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                      : "bg-background/80 text-muted-foreground border-border hover:text-amber-500 hover:border-amber-500/60 hover:bg-amber-500/10",
                  )}
                >
                  <Star className={cn("w-4 h-4", isLearned && "fill-current")} />
                </button>
                <div className="flex items-start justify-between gap-3 mb-3 pr-12">
                  <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border", meta.chip)}>
                    <span>{meta.emoji}</span>
                    {meta.labelEn}
                  </span>
                  <span className="text-3xl leading-none">{entry.emoji}</span>
                </div>

                <p className="text-lg font-display font-bold text-foreground leading-snug mb-2">
                  "{entry.phrase}"
                </p>
                {entry.author && (
                  <p className="text-xs text-muted-foreground italic mb-2">- {entry.author}</p>
                )}
                <p className="text-xs text-muted-foreground italic mb-3">
                  {t("Dịch nghĩa đen:", "Literal:")} {entry.literalVi}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-xl bg-background/80 border border-border/60 p-3.5 mb-3 space-y-2.5 text-sm">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wide text-primary mb-1">{t("Ý nghĩa thật", "Real meaning")}</div>
                          <p className="text-foreground leading-relaxed">{t(entry.meaningVi, entry.meaningEn)}</p>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1">{t("Ví dụ", "Example")}</div>
                          <p className="text-foreground italic leading-relaxed">"{entry.exampleEn}"</p>
                          <p className="text-muted-foreground text-xs mt-1">{entry.exampleVi}</p>
                        </div>
                        {entry.vietnameseEquivalent && (
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400 mb-1">{t("Tương đương tiếng Việt", "Vietnamese equivalent")}</div>
                            <p className="text-foreground font-semibold">🇻🇳 {entry.vietnameseEquivalent}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => toggle(entry.id)}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                      isOpen
                        ? "bg-foreground/10 text-foreground hover:bg-foreground/15"
                        : "bg-foreground text-background hover:opacity-90 shadow-sm",
                    )}
                  >
                    {isOpen ? t("Ẩn chi tiết", "Hide details") : t("Xem ý nghĩa", "Reveal meaning")}
                  </button>
                  <button
                    onClick={() => speakEn(entry.phrase)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors text-foreground"
                    title={t("Nghe phát âm", "Listen")}
                    aria-label={t("Nghe phát âm", "Listen")}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ==================================================================== */
/*                        EXERCISE 1: MEANING MATCH                      */
/* ==================================================================== */
const MatchExercise = ({ t, toast }: { t: (vi: string, en: string) => string; toast: ReturnType<typeof useToast>["toast"] }) => {
  const [round, setRound] = useState(0);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<{ phrase: string; meaning: string } | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const pool = useMemo(() => shuffle(englishIdioms, round + 1).slice(0, 5), [round]);
  const meanings = useMemo(() => shuffle(pool.map((p) => ({ id: p.id, text: p.meaningVi })), round * 7 + 3), [pool, round]);

  useEffect(() => {
    if (selectedPhrase && selectedMeaning) {
      if (selectedPhrase === selectedMeaning) {
        setMatched((m) => new Set(m).add(selectedPhrase));
        setScore((s) => s + 10 + streak * 2);
        setStreak((s) => s + 1);
        toast({ title: t("Chính xác! +" + (10 + streak * 2), "Correct! +" + (10 + streak * 2)), description: t("Tiếp tục nào!", "Keep going!") });
      } else {
        setWrong({ phrase: selectedPhrase, meaning: selectedMeaning });
        setStreak(0);
        setTimeout(() => setWrong(null), 600);
      }
      setSelectedPhrase(null);
      setSelectedMeaning(null);
    }
  }, [selectedPhrase, selectedMeaning]); // eslint-disable-line react-hooks/exhaustive-deps

  const allDone = matched.size === pool.length;

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-teal-500/5 to-emerald-500/5 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-teal-500" /> {t("Ghép nghĩa", "Meaning Match")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("Chạm vào câu tiếng Anh, sau đó chạm nghĩa tiếng Việt đúng.", "Tap an English phrase, then tap its correct Vietnamese meaning.")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-bold">
            <Star className="w-4 h-4" /> {score}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-bold">
            <Flame className="w-4 h-4" /> {streak}
          </span>
          <button
            onClick={() => { setRound((r) => r + 1); setMatched(new Set()); setScore(0); setStreak(0); }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-background hover:bg-primary/10 hover:border-primary/40 text-sm font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> {t("Vòng mới", "New round")}
          </button>
        </div>
      </div>

      {allDone ? (
        <CompletionCard score={score} t={t} onReplay={() => { setRound((r) => r + 1); setMatched(new Set()); setScore(0); setStreak(0); }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">{t("Câu tiếng Anh", "English phrase")}</div>
            {pool.map((entry) => {
              const isMatched = matched.has(entry.id);
              const isSelected = selectedPhrase === entry.id;
              const isWrong = wrong?.phrase === entry.id;
              return (
                <button
                  key={entry.id}
                  disabled={isMatched}
                  onClick={() => setSelectedPhrase(isSelected ? null : entry.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-medium",
                    isMatched && "bg-emerald-500/15 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 line-through opacity-70",
                    !isMatched && isSelected && "bg-teal-500/15 border-teal-500 text-foreground scale-[1.02] shadow-md",
                    !isMatched && !isSelected && !isWrong && "bg-background border-border hover:border-teal-500/40",
                    isWrong && "bg-rose-500/15 border-rose-500 animate-pulse",
                  )}
                >
                  <span className="mr-2">{entry.emoji}</span>
                  "{entry.phrase}"
                </button>
              );
            })}
          </div>
          <div className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">{t("Nghĩa tiếng Việt", "Vietnamese meaning")}</div>
            {meanings.map((m) => {
              const isMatched = matched.has(m.id);
              const isSelected = selectedMeaning === m.id;
              const isWrong = wrong?.meaning === m.id;
              return (
                <button
                  key={m.id}
                  disabled={isMatched}
                  onClick={() => setSelectedMeaning(isSelected ? null : m.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm",
                    isMatched && "bg-emerald-500/15 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 line-through opacity-70",
                    !isMatched && isSelected && "bg-teal-500/15 border-teal-500 text-foreground scale-[1.02] shadow-md",
                    !isMatched && !isSelected && !isWrong && "bg-background border-border hover:border-teal-500/40",
                    isWrong && "bg-rose-500/15 border-rose-500 animate-pulse",
                  )}
                >
                  {m.text}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ==================================================================== */
/*                       EXERCISE 2: FILL THE IDIOM                      */
/* ==================================================================== */
const FillExercise = ({ t, toast }: { t: (vi: string, en: string) => string; toast: ReturnType<typeof useToast>["toast"] }) => {
  // Pre-build a pool of phrases we can confidently make a fill question from.
  // We mask the most "unique" content word (first noun-ish > 3 letters).
  const buildQuestion = (entry: IdiomEntry) => {
    const words = entry.phrase.replace(/[.!?",]/g, "").split(/\s+/);
    // Pick a "good" word: longest non-trivial word
    const stopwords = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "of", "is", "are", "was", "were", "it", "you", "we", "they", "he", "she", "your", "our", "have", "has", "had", "than", "that", "this", "these", "those", "with", "from", "by", "for", "be", "do", "does", "don't", "not", "no", "all", "any", "as", "can", "will"]);
    let target = words
      .filter((w) => w.length > 3 && !stopwords.has(w.toLowerCase()))
      .sort((a, b) => b.length - a.length)[0] ?? words[words.length - 1];
    // Strip apostrophes for cleaner answer
    const answer = target.replace(/['']/g, "");
    return { entry, answer, words, target };
  };

  const [round, setRound] = useState(0);
  const [questions] = useMemo(() => {
    const pool = shuffle(englishIdioms, round + 11).slice(0, 6).map(buildQuestion);
    return [pool] as const;
  }, [round]);

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [reveal, setReveal] = useState<"idle" | "right" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const submit = () => {
    if (!input.trim()) return;
    const ok = input.trim().toLowerCase() === q.answer.toLowerCase();
    if (ok) {
      setReveal("right");
      setScore((s) => s + 15 + streak * 3);
      setStreak((s) => s + 1);
      toast({ title: t("Tuyệt vời! +" + (15 + streak * 3), "Excellent! +" + (15 + streak * 3)), description: t("Bạn đã đoán đúng từ.", "You nailed the missing word.") });
    } else {
      setReveal("wrong");
      setStreak(0);
    }
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setInput("");
    setReveal("idle");
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setInput("");
    setReveal("idle");
    setScore(0);
    setStreak(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-gradient-to-br from-sky-500/5 to-blue-500/5 p-5 sm:p-8">
        <CompletionCard score={score} t={t} onReplay={restart} />
      </div>
    );
  }

  // Build masked sentence
  const masked = q.words.map((w, i) => (
    w.toLowerCase() === q.target.toLowerCase()
      ? <span key={i} className="inline-block min-w-[5ch] px-2 py-0.5 mx-1 rounded-md bg-amber-500/20 border-2 border-dashed border-amber-500 text-amber-700 dark:text-amber-300 font-bold tracking-widest">_____</span>
      : <span key={i}> {w}</span>
  ));

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-sky-500/5 to-blue-500/5 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-sky-500" /> {t("Điền từ còn thiếu", "Fill the Idiom")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("Đoán từ bị thiếu để hoàn thành thành ngữ.", "Guess the missing word to complete the saying.")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">{t("Câu", "Q")} {idx + 1}/{questions.length}</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-bold">
            <Star className="w-4 h-4" /> {score}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-bold">
            <Flame className="w-4 h-4" /> {streak}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-background/80 border border-border/60 p-5 sm:p-7 mb-5">
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
          {CATEGORY_META[q.entry.category].emoji} {t(CATEGORY_META[q.entry.category].labelVi, CATEGORY_META[q.entry.category].labelEn)} · {q.entry.emoji}
        </div>
        <p className="text-xl sm:text-2xl font-display font-bold text-foreground leading-relaxed">
          "{masked}"
        </p>
        <p className="text-sm text-muted-foreground mt-3 italic">
          💡 {t("Gợi ý nghĩa:", "Hint:")} {t(q.entry.meaningVi, q.entry.meaningEn)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); if (reveal !== "idle") setReveal("idle"); }}
          onKeyDown={(e) => { if (e.key === "Enter" && reveal === "idle") submit(); }}
          placeholder={t("Gõ từ còn thiếu…", "Type the missing word…")}
          disabled={reveal !== "idle"}
          className={cn(
            "flex-1 px-4 py-3 rounded-xl border-2 text-base font-semibold bg-background text-foreground transition-all",
            reveal === "idle" && "border-border focus:border-sky-500 outline-none",
            reveal === "right" && "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
            reveal === "wrong" && "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300",
          )}
          autoFocus
        />
        {reveal === "idle" ? (
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {t("Kiểm tra", "Check")}
          </button>
        ) : (
          <button
            onClick={next}
            className="px-6 py-3 rounded-xl bg-foreground text-background font-bold hover:opacity-90 shadow-md"
          >
            {t("Câu tiếp →", "Next →")}
          </button>
        )}
      </div>

      {reveal === "right" && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/40 p-4 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" /> {t("Chính xác!", "Correct!")} "{q.entry.phrase}"
        </div>
      )}
      {reveal === "wrong" && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/40 p-4 text-rose-700 dark:text-rose-300 text-sm font-semibold flex items-center gap-2">
          <X className="w-4 h-4" /> {t("Chưa đúng. Đáp án:", "Not quite. Answer:")} <span className="font-bold">"{q.answer}"</span>
        </div>
      )}
    </div>
  );
};

/* ==================================================================== */
/*                          EXERCISE 3: QUICK QUIZ                       */
/* ==================================================================== */
const QuizExercise = ({ t, toast }: { t: (vi: string, en: string) => string; toast: ReturnType<typeof useToast>["toast"] }) => {
  const [round, setRound] = useState(0);

  // For each correct entry, build 3 distractor meanings (literal trap + 2 others)
  const questions = useMemo(() => {
    const pool = shuffle(englishIdioms, round + 23).slice(0, 8);
    return pool.map((correct, qi) => {
      const distractors = shuffle(
        englishIdioms.filter((e) => e.id !== correct.id),
        round + qi * 5 + 2,
      ).slice(0, 2).map((d) => d.meaningVi);
      // Literal-trap option (use the literal translation as a wrong answer)
      const trap = correct.literalVi;
      const options = shuffle([correct.meaningVi, trap, ...distractors], round + qi * 11 + 7);
      return { correct, options, trapText: trap };
    });
  }, [round]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const handlePick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.correct.meaningVi) {
      const bonus = opt !== q.trapText ? 12 : 0;
      setScore((s) => s + bonus + streak * 3);
      setStreak((s) => s + 1);
      toast({ title: t("Đúng rồi! +" + (bonus + streak * 3), "Right! +" + (bonus + streak * 3)), description: t("Bạn không bị mắc bẫy nghĩa đen.", "You avoided the literal trap.") });
    } else {
      setStreak(0);
      if (opt === q.trapText) {
        toast({ title: t("Coi chừng nghĩa đen!", "Beware the literal trap!"), description: t("Đó là dịch từng chữ - không phải nghĩa thật.", "That's the word-for-word meaning - not the real one.") });
      }
    }
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setStreak(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 p-5 sm:p-8">
        <CompletionCard score={score} t={t} onReplay={restart} />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" /> {t("Trắc nghiệm cấp tốc", "Quick Quiz")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("Chọn nghĩa thật - coi chừng bẫy nghĩa đen!", "Pick the real meaning - beware the literal trap!")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">{t("Câu", "Q")} {idx + 1}/{questions.length}</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-bold">
            <Star className="w-4 h-4" /> {score}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-bold">
            <Flame className="w-4 h-4" /> {streak}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-background/80 border border-border/60 p-5 sm:p-7 mb-5">
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
          {CATEGORY_META[q.correct.category].emoji} {t(CATEGORY_META[q.correct.category].labelVi, CATEGORY_META[q.correct.category].labelEn)}
        </div>
        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-snug mb-2">
          {q.correct.emoji} "{q.correct.phrase}"
        </p>
        <button
          onClick={() => speakEn(q.correct.phrase)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" /> {t("Nghe", "Listen")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = opt === q.correct.meaningVi;
          const isPicked = picked === opt;
          const showResult = picked !== null;
          return (
            <button
              key={i}
              onClick={() => handlePick(opt)}
              disabled={!!picked}
              className={cn(
                "text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                !showResult && "bg-background border-border hover:border-violet-500/50 hover:bg-violet-500/5",
                showResult && isCorrect && "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300",
                showResult && isPicked && !isCorrect && "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300",
                showResult && !isPicked && !isCorrect && "bg-background border-border opacity-60",
              )}
            >
              <div className="flex items-start gap-2">
                <span className={cn(
                  "mt-0.5 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold border-2",
                  !showResult && "border-border text-muted-foreground",
                  showResult && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                  showResult && isPicked && !isCorrect && "border-rose-500 bg-rose-500 text-white",
                )}>
                  {showResult && isCorrect ? <Check className="w-3.5 h-3.5" /> :
                    showResult && isPicked && !isCorrect ? <X className="w-3.5 h-3.5" /> :
                    String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-foreground">
            <span className="font-bold">💡 {t("Ví dụ:", "Example:")}</span>{" "}
            <span className="italic">"{q.correct.exampleEn}"</span>
          </p>
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-xl bg-foreground text-background font-bold hover:opacity-90 shadow-md"
          >
            {idx + 1 >= questions.length ? t("Xem kết quả", "See result") : t("Câu tiếp →", "Next →")}
          </button>
        </div>
      )}
    </div>
  );
};

/* ==================================================================== */
/*                    EXERCISE 4: VIETNAMESE EQUIVALENT                  */
/* ==================================================================== */
const EquivalentExercise = ({ t, toast }: { t: (vi: string, en: string) => string; toast: ReturnType<typeof useToast>["toast"] }) => {
  const withEquivalent = useMemo(() => englishIdioms.filter((e) => !!e.vietnameseEquivalent), []);

  const [round, setRound] = useState(0);
  const questions = useMemo(() => {
    const pool = shuffle(withEquivalent, round + 41).slice(0, 6);
    return pool.map((correct, qi) => {
      const distractors = shuffle(
        withEquivalent.filter((e) => e.id !== correct.id),
        round + qi * 13 + 5,
      ).slice(0, 3).map((d) => d.vietnameseEquivalent!);
      const options = shuffle([correct.vietnameseEquivalent!, ...distractors], round + qi * 17 + 9);
      return { correct, options };
    });
  }, [round, withEquivalent]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const handlePick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.correct.vietnameseEquivalent) {
      setScore((s) => s + 14 + streak * 3);
      setStreak((s) => s + 1);
      toast({ title: t("Quá đỉnh! +" + (14 + streak * 3), "Brilliant! +" + (14 + streak * 3)), description: t("Đúng câu tục ngữ Việt tương đương.", "You found the matching Vietnamese saying.") });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setPicked(null);
    setScore(0);
    setStreak(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-gradient-to-br from-rose-500/5 to-pink-500/5 p-5 sm:p-8">
        <CompletionCard score={score} t={t} onReplay={restart} />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-rose-500/5 to-pink-500/5 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-rose-500" /> {t("Tục ngữ Việt tương đương", "Vietnamese Equivalent")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("Câu tiếng Anh nào tương ứng với câu tục ngữ Việt?", "Which Vietnamese saying matches this English phrase?")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">{t("Câu", "Q")} {idx + 1}/{questions.length}</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-bold">
            <Star className="w-4 h-4" /> {score}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-bold">
            <Flame className="w-4 h-4" /> {streak}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-background/80 border border-border/60 p-5 sm:p-7 mb-5">
        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
          🇬🇧 {t(CATEGORY_META[q.correct.category].labelVi, CATEGORY_META[q.correct.category].labelEn)}
        </div>
        <p className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-snug">
          {q.correct.emoji} "{q.correct.phrase}"
        </p>
        <p className="text-sm text-muted-foreground mt-3 italic">
          {t("Nghĩa:", "Meaning:")} {t(q.correct.meaningVi, q.correct.meaningEn)}
        </p>
      </div>

      <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
        🇻🇳 {t("Chọn câu tục ngữ Việt", "Pick the Vietnamese saying")}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          const isCorrect = opt === q.correct.vietnameseEquivalent;
          const isPicked = picked === opt;
          const showResult = picked !== null;
          return (
            <button
              key={i}
              onClick={() => handlePick(opt)}
              disabled={!!picked}
              className={cn(
                "text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold",
                !showResult && "bg-background border-border hover:border-rose-500/50 hover:bg-rose-500/5",
                showResult && isCorrect && "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300",
                showResult && isPicked && !isCorrect && "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300",
                showResult && !isPicked && !isCorrect && "bg-background border-border opacity-60",
              )}
            >
              <div className="flex items-start gap-2">
                <span className={cn(
                  "mt-0.5 w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold border-2 shrink-0",
                  !showResult && "border-border text-muted-foreground",
                  showResult && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                  showResult && isPicked && !isCorrect && "border-rose-500 bg-rose-500 text-white",
                )}>
                  {showResult && isCorrect ? <Check className="w-3.5 h-3.5" /> :
                    showResult && isPicked && !isCorrect ? <X className="w-3.5 h-3.5" /> :
                    String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-xl bg-foreground text-background font-bold hover:opacity-90 shadow-md"
          >
            {idx + 1 >= questions.length ? t("Xem kết quả", "See result") : t("Câu tiếp →", "Next →")}
          </button>
        </div>
      )}
    </div>
  );
};

/* ==================================================================== */
/*                          COMPLETION CARD                              */
/* ==================================================================== */
const CompletionCard = ({ score, onReplay, t }: { score: number; onReplay: () => void; t: (vi: string, en: string) => string }) => {
  const tier = score >= 100 ? "gold" : score >= 60 ? "silver" : "bronze";
  const meta = {
    gold:   { emoji: "🏆", titleVi: "Bậc thầy thành ngữ!", titleEn: "Idiom Master!", color: "from-amber-400 to-orange-500" },
    silver: { emoji: "🥈", titleVi: "Phong độ ổn định!",   titleEn: "Solid round!",   color: "from-slate-300 to-slate-500" },
    bronze: { emoji: "🌱", titleVi: "Khởi đầu tốt!",       titleEn: "Good start!",    color: "from-emerald-300 to-teal-500" },
  }[tier];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6"
    >
      <div className="text-6xl mb-3">{meta.emoji}</div>
      <h3 className={cn("text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2", meta.color)}>
        {t(meta.titleVi, meta.titleEn)}
      </h3>
      <p className="text-lg font-bold text-foreground mb-1">
        {t("Tổng điểm:", "Total score:")} <span className="text-amber-500">{score}</span>
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        {t("Hãy chơi lại để tăng điểm và mở khóa danh hiệu vàng 🏆", "Replay to chase a higher score and unlock the gold tier 🏆")}
      </p>
      <button
        onClick={onReplay}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-md hover:opacity-90"
      >
        <RefreshCw className="w-4 h-4" /> {t("Chơi lại", "Play again")}
      </button>
    </motion.div>
  );
};

export default EnglishIdioms;
