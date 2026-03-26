import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, IELTS_CATEGORIES, CEFR_LEVELS, type IeltsWord } from "@/data/ieltsVocabData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WORDS_PER_PAGE = 24;

// Level color mapping
const levelColors: Record<string, string> = {
  A1: "bg-green-500/20 text-green-400",
  A2: "bg-emerald-500/20 text-emerald-400",
  B1: "bg-blue-500/20 text-blue-400",
  B2: "bg-indigo-500/20 text-indigo-400",
  C1: "bg-purple-500/20 text-purple-400",
  C2: "bg-rose-500/20 text-rose-400",
};

// Text-to-Speech helper
const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
};

// Flashcard component
const Flashcard = ({ word, isVi }: { word: IeltsWord; isVi: boolean }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer perspective-1000 h-56"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-3">
          <h3 className="text-2xl font-bold text-foreground">{word.word}</h3>
          <p className="text-sm text-muted-foreground font-mono">{word.ipa}</p>
          <Badge className={levelColors[word.level]}>{word.level}</Badge>
          <button
            onClick={(e) => { e.stopPropagation(); speak(word.word); }}
            className="mt-2 p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl border border-border bg-card p-5 flex flex-col justify-center gap-2"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-sm font-semibold text-foreground">{word.definition.en}</p>
          <p className="text-sm text-primary">{word.definition.vi}</p>
          <p className="text-xs text-muted-foreground italic mt-2">"{word.example}"</p>
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </div>
      </motion.div>
    </div>
  );
};

const IeltsVocabulary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard">("list");
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("ielts_mastered");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch { return new Set<string>(); }
  });
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);

  const toggleMastered = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      localStorage.setItem("ielts_mastered", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let words = ieltsVocabData;
    if (search) {
      const q = search.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.definition.en.toLowerCase().includes(q) ||
        w.definition.vi.toLowerCase().includes(q)
      );
    }
    if (levelFilter !== "all") words = words.filter(w => w.level === levelFilter);
    if (categoryFilter !== "all") words = words.filter(w => w.category === categoryFilter);
    if (showMasteredOnly) words = words.filter(w => !mastered.has(w.word));
    return words;
  }, [search, levelFilter, categoryFilter, showMasteredOnly, mastered]);

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);

  // Reset page when filters change
  useMemo(() => setPage(1), [search, levelFilter, categoryFilter, showMasteredOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                IELTS Vocabulary <span className="text-gradient">{t("Ngân hàng từ vựng", "Word Bank")}</span>
              </h1>
              <p className="text-muted-foreground">
                {t(
                  `${ieltsVocabData.length} từ vựng thiết yếu — Lọc, học flashcard, nghe phát âm`,
                  `${ieltsVocabData.length} essential words — Filter, flashcard mode, pronunciation`
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                <span className="text-muted-foreground">{t("Đã thuộc", "Mastered")}: <strong className="text-primary">{mastered.size}</strong></span>
                <span className="text-muted-foreground">{t("Cần ôn", "Need Review")}: <strong className="text-orange-400">{ieltsVocabData.length - mastered.size}</strong></span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t("Tìm từ vựng...", "Search words...")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm"
                />
              </div>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none"
              >
                <option value="all">{t("Tất cả cấp độ", "All Levels")}</option>
                {CEFR_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[200px]"
              >
                <option value="all">{t("Tất cả chủ đề", "All Topics")}</option>
                {IELTS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Button
                variant={showMasteredOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMasteredOnly(!showMasteredOnly)}
                className="gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                {t("Cần ôn", "Need Review")}
              </Button>
              <Tabs value={viewMode} onValueChange={v => setViewMode(v as any)} className="ml-auto">
                <TabsList>
                  <TabsTrigger value="list"><List className="w-4 h-4" /></TabsTrigger>
                  <TabsTrigger value="flashcard"><Layers className="w-4 h-4" /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

            {/* Word grid */}
            {viewMode === "flashcard" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {paginated.map(w => (
                    <motion.div key={w.word + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Flashcard word={w} isVi={true} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {paginated.map(w => (
                  <div key={w.word + w.category} className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{w.word}</h3>
                        <p className="text-xs text-muted-foreground font-mono">{w.ipa}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => speak(w.word)} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                          <Volume2 className="w-4 h-4 text-primary" />
                        </button>
                        <button onClick={() => toggleMastered(w.word)} className="p-1.5 rounded-lg hover:bg-yellow-500/10 transition-colors">
                          <Star className={`w-4 h-4 ${mastered.has(w.word) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={levelColors[w.level] + " text-xs"}>{w.level}</Badge>
                      <Badge variant="outline" className="text-xs">{w.category}</Badge>
                    </div>
                    <p className="text-sm text-foreground">{w.definition.en}</p>
                    <p className="text-sm text-primary">{w.definition.vi}</p>
                    <p className="text-xs text-muted-foreground italic mt-2 line-clamp-2">"{w.example}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IeltsVocabulary;
