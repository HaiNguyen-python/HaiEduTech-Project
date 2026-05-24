/**
 * @file CambridgeYleVocabulary.tsx
 * @description Cambridge YLE Vocabulary practice — Starters → PET. Colourful,
 * playful UI for kids with a Mountain Climber gamification: each "mastered"
 * word lifts the climber up the mountain for the active level.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, Trophy, Star, Search, ArrowLeft, Mountain, CheckCircle2, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CAMBRIDGE_LEVELS, type CambridgeKidsLevel, type CambridgeKidsWord } from "@/data/cambridgeKidsVocab";
import { CAMBRIDGE_KIDS_WORDS_DEDUPED } from "@/data/cambridgeKidsVocabMaster";
import { getIpa } from "@/data/cambridgeKidsIpa";
import { getCategory, CATEGORY_META, CATEGORY_ORDER, type KidsCategory } from "@/data/cambridgeKidsCategories";
import { CATEGORY_BG } from "@/data/cambridgeKidsCategoryBg";
import { getPos, POS_LABEL } from "@/data/cambridgeKidsPos";
import KidsSpeechCheck from "@/components/KidsSpeechCheck";
import KidsChibiMascot from "@/components/KidsChibiMascot";
import KidsCategoryQuiz from "@/components/KidsCategoryQuiz";
import { CambridgeArcadeInner } from "@/pages/CambridgeArcade";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import { toast } from "@/hooks/use-toast";

const ALL_WORDS: CambridgeKidsWord[] = CAMBRIDGE_KIDS_WORDS_DEDUPED;
const MASTERY_SUBJECT = "cambridge-yle";

// Softer tints + STRONG borders for high visibility on white cards.
const LEVEL_THEME: Record<CambridgeKidsLevel, {
  color: string; border: string; soft: string; bg: string; emoji: string; cefr: string; gradient: string;
}> = {
  Starters: { color: "#EC4E89", border: "#D81B60", soft: "#FFF1F6", bg: "#FFE5EC", emoji: "🎨", cefr: "A1",     gradient: "linear-gradient(135deg, #FF6FA3, #FFB4C8)" },
  Movers:   { color: "#2D7FE0", border: "#1565C0", soft: "#F0F8FF", bg: "#E0F4FF", emoji: "🚀", cefr: "A1+",    gradient: "linear-gradient(135deg, #4D96FF, #A0CDFF)" },
  Flyers:   { color: "#1FA855", border: "#1B7A3E", soft: "#F1FFF1", bg: "#E8FFE0", emoji: "🦅", cefr: "A2",     gradient: "linear-gradient(135deg, #45C77D, #B8F0BE)" },
  KET:      { color: "#7B3FE4", border: "#5B21B6", soft: "#F8F1FF", bg: "#F3E8FF", emoji: "📝", cefr: "A2 Key", gradient: "linear-gradient(135deg, #A472F0, #DCC1F5)" },
  PET:      { color: "#E8841A", border: "#B45309", soft: "#FFF8EC", bg: "#FFF4E0", emoji: "🏆", cefr: "B1",     gradient: "linear-gradient(135deg, #FFA94D, #FFD49A)" },
};

const getExample = (w: CambridgeKidsWord) => ({
  en: w.example || `A ${w.word} can be amazing!`,
  vi: w.exampleVi || `${w.vi} thật tuyệt vời!`,
});

const speak = (text: string, opts?: { rate?: number; lang?: string }) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts?.lang ?? "en-US";
    u.rate = opts?.rate ?? 0.9;
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
};

// Render example with the target word (and simple inflections) bolded.
const renderBolded = (sentence: string, word: string) => {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match the word, optionally followed by s/es/ed/ing/'s
  const re = new RegExp(`\\b(${escaped}(?:s|es|ed|ing|'s)?)\\b`, "gi");
  const parts: Array<{ text: string; bold: boolean }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(sentence)) !== null) {
    if (m.index > last) parts.push({ text: sentence.slice(last, m.index), bold: false });
    parts.push({ text: m[0], bold: true });
    last = m.index + m[0].length;
  }
  if (last < sentence.length) parts.push({ text: sentence.slice(last), bold: false });
  if (parts.length === 0) return sentence;
  return parts.map((p, i) => p.bold
    ? <strong key={i} className="font-extrabold underline decoration-2 underline-offset-2">{p.text}</strong>
    : <span key={i}>{p.text}</span>);
};

const MountainClimber = ({ level, masteredCount, total }: { level: CambridgeKidsLevel; masteredCount: number; total: number }) => {
  const theme = LEVEL_THEME[level];
  const pct = total > 0 ? Math.min(100, (masteredCount / total) * 100) : 0;
  // Climber position: from bottom-left to peak (top)
  // Peak of triangle is around x=50%, y=8%. Base bottom-left around x=12%, y=92%.
  const t = pct / 100;
  const cx = 12 + (50 - 12) * t;
  const cy = 92 - (92 - 10) * t;

  const milestones = [25, 50, 75, 100];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-4 border-white shadow-xl"
      style={{ background: `linear-gradient(180deg, #BEE9FF 0%, ${theme.bg} 60%, #FFFFFF 100%)` }}>
      <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
        <Mountain className="w-5 h-5" style={{ color: theme.color }} />
        <span className="font-bold uppercase tracking-wider text-sm" style={{ color: theme.color }}>
          {level} Peak · {masteredCount}/{total}
        </span>
      </div>
      <div className="absolute top-3 right-4 z-10 text-2xl">{theme.emoji}</div>

      <svg viewBox="0 0 100 100" className="w-full h-56 md:h-64" preserveAspectRatio="none">
        {/* Sun */}
        <circle cx="82" cy="18" r="6" fill="#FFD93D" opacity="0.9" />
        {/* Back mountain */}
        <polygon points="0,100 30,40 60,100" fill="#A0CDFF" opacity="0.55" />
        <polygon points="40,100 70,30 100,100" fill="#7FB8F5" opacity="0.55" />
        {/* Main mountain */}
        <polygon points="10,95 50,8 90,95" fill={theme.color} opacity="0.85" />
        {/* Snow cap */}
        <polygon points="38,30 50,8 62,30 56,33 50,22 44,33" fill="#FFFFFF" />

        {/* Milestone flags */}
        {milestones.map((m) => {
          const tm = m / 100;
          const mx = 12 + (50 - 12) * tm;
          const my = 92 - (92 - 10) * tm;
          const reached = pct >= m;
          return (
            <g key={m}>
              <line x1={mx} y1={my} x2={mx} y2={my - 5} stroke="#3B3B3B" strokeWidth="0.5" />
              <polygon
                points={`${mx},${my - 5} ${mx + 4},${my - 3.5} ${mx},${my - 2}`}
                fill={reached ? "#FFD93D" : "#FFFFFF"}
                stroke="#3B3B3B"
                strokeWidth="0.3"
              />
            </g>
          );
        })}

        {/* Climbing path (dashed) */}
        <line x1="12" y1="92" x2="50" y2="10" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.7" />
      </svg>

      {/* Climber character */}
      <motion.div
        className="absolute text-3xl"
        initial={false}
        animate={{ left: `${cx}%`, top: `${cy}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        style={{ transform: "translate(-50%, -100%)" }}
      >
        🧗
      </motion.div>

      {/* Progress bar */}
      <div className="relative px-4 pb-4 pt-2 bg-white/70 backdrop-blur-sm">
        <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6 }}
            style={{ background: theme.gradient }}
          />
        </div>
        <p className="mt-2 text-xs font-bold text-slate-600 text-center">
          {pct >= 100 ? "🏔️ Bạn đã chinh phục đỉnh núi! / You conquered the peak!" :
           pct >= 75 ? "🔥 Gần tới đỉnh rồi! / Almost at the top!" :
           pct >= 50 ? "💪 Đã qua nửa đường! / Halfway there!" :
           pct >= 25 ? "🚀 Khởi đầu tuyệt vời! / Great start!" :
           "✨ Bắt đầu leo nào! / Let's start climbing!"}
        </p>
      </div>
    </div>
  );
};

const CambridgeYleVocabulary = () => {
  const { t, lang } = useLanguage();
  const [level, setLevel] = useState<CambridgeKidsLevel>("Starters");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"learn" | "practice">("learn");
  const [view, setView] = useState<"vocab" | "arcade">("vocab");
  const { mastered, toggle } = useMasteredVocab(MASTERY_SUBJECT);

  const wordsForLevel = useMemo(
    () => ALL_WORDS.filter(w => w.level === level),
    [level]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return wordsForLevel;
    return wordsForLevel.filter(w => w.word.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q));
  }, [wordsForLevel, search]);

  // Group filtered words by thematic category
  const grouped = useMemo(() => {
    const m = new Map<KidsCategory, CambridgeKidsWord[]>();
    for (const w of filtered) {
      const c = getCategory(w.word);
      if (!m.has(c)) m.set(c, []);
      m.get(c)!.push(w);
    }
    return CATEGORY_ORDER
      .filter(c => m.has(c))
      .map(c => ({ category: c, words: m.get(c)! }));
  }, [filtered]);

  const [openCats, setOpenCats] = useState<Set<string>>(new Set());
  const isSearching = search.trim().length > 0;
  const isOpen = (key: string) => isSearching ? true : openCats.has(key);
  const toggleCat = (key: string) => {
    setOpenCats(prev => {
      const n = new Set(prev);
      if (n.has(key)) n.delete(key); else n.add(key);
      return n;
    });
  };

  const masteredInLevel = useMemo(
    () => wordsForLevel.filter(w => mastered.has(`${w.level}:${w.word}`)).length,
    [wordsForLevel, mastered]
  );

  const toggleMaster = (level: CambridgeKidsLevel, word: string) => {
    const key = `${level}:${word}`;
    const wasMastered = mastered.has(key);
    toggle(key);
    if (!wasMastered) {
      toast({
        title: t("🎉 Tuyệt vời!", "🎉 Awesome!"),
        description: t(`Bạn vừa leo lên 1 bước!`, `You climbed up one step!`),
      });
    }
  };

  const theme = LEVEL_THEME[level];

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FEFCF7 0%, #FFF7FA 35%, #F4FAFF 70%, #F8FFF6 100%)" }}>
      <FloatingKidsDecor />
      <Navbar />
      <KidsChibiMascot lang={lang} />
      <main className="pt-16 pb-8 relative z-10">
        {/* Hero */}
        <section className="container mx-auto px-4 py-4">
          <Link to="/cambridge-lectures" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-2">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại Cambridge Lectures", "Back to Cambridge Lectures")}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="p-2.5 rounded-2xl border-2 border-white shadow-lg" style={{ background: "linear-gradient(135deg,#FF6B9D,#FFD93D,#6BCB77,#4D96FF,#C780FA)" }}>
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight" style={{ background: "linear-gradient(135deg, #FF6B9D 0%, #FF9F1C 35%, #6BCB77 70%, #4D96FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t("Từ vựng Cambridge YLE 🎈", "Cambridge YLE Vocabulary 🎈")}
              </h1>
              <p className="text-slate-700 font-medium text-base">
                {t("Học từ vựng vui nhộn từ Starters đến PET — đánh dấu \"đã thuộc\" để leo núi!",
                  "Learn fun vocabulary from Starters to PET — mark \"mastered\" to climb the mountain!")}
              </p>
            </div>
          </div>
        </section>

        {/* View toggle: Vocabulary vs Arcade */}
        <section className="container mx-auto px-4 mb-4">
          <div className="inline-flex p-1 rounded-2xl bg-white/80 border-2 border-white shadow-md gap-1">
            <button
              onClick={() => setView("vocab")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${view === "vocab" ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
            >
              📚 {t("Học từ vựng", "Learn Vocabulary")}
            </button>
            <button
              onClick={() => setView("arcade")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${view === "arcade" ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
            >
              🎪 {t("Arcade Mini-games", "Arcade Mini-games")}
            </button>
          </div>
        </section>

        {view === "arcade" ? (
          <section className="container mx-auto px-4 pb-8">
            <CambridgeArcadeInner embedded />
          </section>
        ) : (
        <section className="container mx-auto px-4 grid lg:grid-cols-[1fr_280px] gap-6 items-start max-w-[1500px]">
          {/* Level tabs */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {CAMBRIDGE_LEVELS.map(lv => {
                const th = LEVEL_THEME[lv];
                const active = lv === level;
                const lvWords = ALL_WORDS.filter(w => w.level === lv);
                const lvDone = lvWords.filter(w => mastered.has(`${lv}:${w.word}`)).length;
                return (
                  <button
                    key={lv}
                    onClick={() => setLevel(lv)}
                    className="px-4 py-2.5 rounded-2xl border-2 font-bold uppercase tracking-wide text-sm transition-all shadow-sm flex items-center gap-2"
                    style={{
                      background: active ? th.gradient : "#FFFFFF",
                      color: active ? "#1F2937" : "#475569",
                      borderColor: th.color,
                      boxShadow: active ? `0 3px 10px ${th.color}55` : undefined,
                    }}
                  >
                    <span>{th.emoji}</span>
                    {lv}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                      background: active ? "rgba(255,255,255,0.55)" : th.soft,
                      color: "#334155",
                    }}>
                      {lvDone}/{lvWords.length}
                    </span>
                  </button>
                );
              })}
            </div>


            {/* Grouped by thematic categories — collapsible */}
            <div className="space-y-4">
              {grouped.map(({ category, words }) => {
                const meta = CATEGORY_META[category];
                const catBg = CATEGORY_BG[category];
                const catKey = `${level}:${category}`;
                const open = isOpen(catKey);
                const doneInCat = words.filter(w => mastered.has(`${w.level}:${w.word}`)).length;
                return (
                  <div key={catKey} className="rounded-2xl bg-white/70 backdrop-blur-sm border-2 shadow-sm overflow-hidden"
                       style={{ borderColor: theme.border }}>
                    <button
                      type="button"
                      onClick={() => toggleCat(catKey)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white"
                      style={{ background: open ? catBg.tint : "transparent" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meta.emoji}</span>
                        <div>
                          <p className="font-bold text-slate-900 text-base">
                            {category} <span className="text-slate-500 font-medium">· {meta.vi}</span>
                          </p>
                          <p className="text-xs text-slate-600 font-semibold">
                            {doneInCat}/{words.length} {t("đã thuộc", "mastered")}
                          </p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
                                   style={{ color: theme.border }} />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="relative overflow-hidden" style={{ background: catBg.tint }}>
                            {/* Themed watermark illustration */}
                            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
                              {catBg.pattern.map((emoji, i) => {
                                const positions = [
                                  { top: "6%", left: "4%", size: "5rem", rot: -12, op: 0.10 },
                                  { top: "12%", right: "6%", size: "6rem", rot: 14, op: 0.09 },
                                  { bottom: "10%", left: "10%", size: "5.5rem", rot: 8, op: 0.10 },
                                  { bottom: "8%", right: "12%", size: "6.5rem", rot: -10, op: 0.08 },
                                  { top: "45%", left: "48%", size: "7rem", rot: 5, op: 0.07 },
                                ];
                                const p = positions[i % positions.length];
                                return (
                                  <span
                                    key={i}
                                    className="absolute"
                                    style={{
                                      top: p.top, left: (p as any).left, right: (p as any).right, bottom: (p as any).bottom,
                                      fontSize: p.size,
                                      transform: `rotate(${p.rot}deg)`,
                                      opacity: p.op,
                                      filter: "blur(0.3px)",
                                    }}
                                  >
                                    {emoji}
                                  </span>
                                );
                              })}
                            </div>
                            <div className="relative grid grid-cols-1 2xl:grid-cols-2 gap-8 md:gap-10 p-8 md:p-10">
                            {words.map((w, idx) => {
                              const key = `${w.level}:${w.word}`;
                              const isMastered = mastered.has(key);
                              const ex = getExample(w);
                              const ipa = getIpa(w.word);
                              const pos = getPos(w.word);
                              const posMeta = POS_LABEL[pos];
                              return (
                                <motion.div
                                  key={key}
                                  layout
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.18, delay: Math.min(idx, 10) * 0.012 }}
                                  whileHover={{ y: -3 }}
                                  className="relative rounded-2xl p-4 shadow-sm overflow-hidden bg-white"
                                  style={{
                                    border: `2.5px solid ${theme.border}`,
                                    boxShadow: `0 2px 0 ${theme.border}55, 0 6px 14px ${theme.border}33`,
                                  }}
                                >
                                  {isMastered && (
                                    <div className="absolute top-2 right-2 text-emerald-600">
                                      <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                                    </div>
                                  )}
                                  <div className="flex items-start gap-3">
                                    <div className="text-4xl drop-shadow shrink-0">{w.emoji}</div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-lg font-bold text-slate-900 break-words">{w.word}</p>
                                        <span
                                          className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
                                          style={{ background: `${posMeta.color}1A`, color: posMeta.color, border: `1px solid ${posMeta.color}55` }}
                                          title={`${posMeta.en} · ${posMeta.vi}`}
                                        >
                                          {pos}
                                        </span>
                                        <button
                                          onClick={() => speak(w.word)}
                                          className="p-1 rounded-full hover:bg-slate-100"
                                          style={{ color: theme.border }}
                                          aria-label="Listen"
                                        >
                                          <Volume2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                      {ipa && (
                                        <p className="text-xs font-mono text-slate-500 mt-0.5">/{ipa}/</p>
                                      )}
                                      <p className="text-sm text-slate-700 mt-0.5">{w.vi}</p>
                                    </div>
                                  </div>

                                  <KidsSpeechCheck word={w.word} accentColor={theme.border} />

                                  <div
                                    className="mt-3 rounded-xl px-3 py-2.5 text-[14px] leading-relaxed relative"
                                    style={{ background: theme.soft, borderLeft: `4px solid ${theme.border}` }}
                                  >
                                    <button
                                      onClick={() => speak(ex.en, { rate: 0.85 })}
                                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm"
                                      style={{ color: theme.border }}
                                      aria-label="Listen to example"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                    <p className="text-slate-900 font-semibold pr-7">
                                      <span className="font-bold mr-1" style={{ color: theme.border }}>EN ·</span>
                                      {renderBolded(ex.en, w.word)}
                                    </p>
                                    <p className="text-slate-700 mt-1 font-medium">
                                      <span className="font-bold mr-1" style={{ color: theme.border }}>VI ·</span>
                                      {ex.vi}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => toggleMaster(w.level, w.word)}
                                    className="mt-3 w-full text-xs font-bold uppercase tracking-wide rounded-xl py-2 transition-all flex items-center justify-center gap-1.5"
                                    style={{
                                      background: isMastered ? "#10B981" : "#FFFFFF",
                                      color: isMastered ? "#FFFFFF" : theme.border,
                                      border: `2px solid ${isMastered ? "#10B981" : theme.border}`,
                                    }}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${isMastered ? "fill-white" : ""}`} />
                                    {isMastered ? t("Đã xong! 🎉", "Done! 🎉") : t("Finish ⭐", "Finish ⭐")}
                                  </button>
                                </motion.div>
                              );
                            })}
                            </div>
                            <div className="px-6 md:px-7 pb-6">
                              <KidsCategoryQuiz
                                words={words}
                                accentColor={theme.border}
                                softColor={theme.soft}
                                lang={lang as "vi" | "en"}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                {t("Không tìm thấy từ nào.", "No words found.")}
              </div>
            )}
          </div>

          {/* Mountain panel (sticky on desktop) */}
          <aside className="lg:sticky lg:top-20">
            <MountainClimber level={level} masteredCount={masteredInLevel} total={wordsForLevel.length} />

            <div className="mt-3 p-4 rounded-2xl bg-white/80 border-2 border-white shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-[#FF9F1C]" />
                <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  {t("Bảng vinh danh", "Hall of Fame")}
                </p>
              </div>
              <div className="space-y-1.5">
                {CAMBRIDGE_LEVELS.map(lv => {
                  const th = LEVEL_THEME[lv];
                  const lvWords = ALL_WORDS.filter(w => w.level === lv);
                  const lvDone = lvWords.filter(w => mastered.has(`${lv}:${w.word}`)).length;
                  const pct = lvWords.length > 0 ? Math.round((lvDone / lvWords.length) * 100) : 0;
                  return (
                    <div key={lv} className="flex items-center gap-2">
                      <span className="text-base">{th.emoji}</span>
                      <span className="text-xs font-bold w-16" style={{ color: th.color }}>{lv}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full" style={{ width: `${pct}%`, background: th.gradient }} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 w-12 text-right">{lvDone}/{lvWords.length}</span>
                    </div>
                  );
                })}
              </div>
              {mastered.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (!confirm(t("Đặt lại tiến độ?", "Reset progress?"))) return;
                    [...mastered].forEach(k => toggle(k));
                  }}
                  className="mt-3 text-xs text-slate-500 hover:text-rose-600 w-full"
                >
                  {t("Đặt lại tiến độ", "Reset progress")}
                </Button>
              )}
            </div>

            {/* Student leaderboard */}
            <div className="mt-3">
              <VocabMasteryLeaderboard
                subject={MASTERY_SUBJECT}
                currentCount={mastered.size}
                label={t("🏆 BXH Cambridge YLE", "🏆 Cambridge YLE Ranking")}
              />
            </div>
          </aside>
        </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeYleVocabulary;
