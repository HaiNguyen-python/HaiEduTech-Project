/**
 * @file CambridgeYleVocabulary.tsx
 * @description Cambridge YLE Vocabulary practice — Starters → PET. Colourful,
 * playful UI for kids with a Mountain Climber gamification: each "mastered"
 * word lifts the climber up the mountain for the active level.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles, Trophy, Star, Search, ArrowLeft, Mountain, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CAMBRIDGE_KIDS_WORDS, CAMBRIDGE_LEVELS, type CambridgeKidsLevel } from "@/data/cambridgeKidsVocab";
import { CAMBRIDGE_KIDS_WORDS_EXPANSION } from "@/data/cambridgeKidsVocabExpansion";
import { toast } from "@/hooks/use-toast";

const ALL_WORDS = [...CAMBRIDGE_KIDS_WORDS, ...CAMBRIDGE_KIDS_WORDS_EXPANSION];

const LEVEL_THEME: Record<CambridgeKidsLevel, {
  color: string; bg: string; emoji: string; cefr: string; gradient: string;
}> = {
  Starters: { color: "#FF6B9D", bg: "#FFE5EC", emoji: "🎨", cefr: "A1", gradient: "linear-gradient(135deg, #FF6B9D, #FFB4C8)" },
  Movers:   { color: "#4D96FF", bg: "#E0F4FF", emoji: "🚀", cefr: "A1+", gradient: "linear-gradient(135deg, #4D96FF, #A0CDFF)" },
  Flyers:   { color: "#6BCB77", bg: "#E8FFE0", emoji: "🦅", cefr: "A2", gradient: "linear-gradient(135deg, #6BCB77, #B8F0BE)" },
  KET:      { color: "#C780FA", bg: "#F3E8FF", emoji: "📝", cefr: "A2 Key", gradient: "linear-gradient(135deg, #C780FA, #E2B8FF)" },
  PET:      { color: "#FF9F1C", bg: "#FFF4E0", emoji: "🏆", cefr: "B1", gradient: "linear-gradient(135deg, #FF9F1C, #FFD49A)" },
};

const STORAGE_KEY = "cambridge-yle-vocab-mastered-v1";

const readMastered = (): Set<string> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch { return new Set(); }
};

const speak = (word: string) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
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
  const { t } = useLanguage();
  const [level, setLevel] = useState<CambridgeKidsLevel>("Starters");
  const [search, setSearch] = useState("");
  const [mastered, setMastered] = useState<Set<string>>(readMastered);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...mastered])); } catch { /* noop */ }
  }, [mastered]);

  const wordsForLevel = useMemo(
    () => ALL_WORDS.filter(w => w.level === level),
    [level]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return wordsForLevel;
    return wordsForLevel.filter(w => w.word.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q));
  }, [wordsForLevel, search]);

  const masteredInLevel = useMemo(
    () => wordsForLevel.filter(w => mastered.has(`${w.level}:${w.word}`)).length,
    [wordsForLevel, mastered]
  );

  const toggleMaster = (level: CambridgeKidsLevel, word: string) => {
    const key = `${level}:${word}`;
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
        toast({
          title: t("🎉 Tuyệt vời!", "🎉 Awesome!"),
          description: t(`Bạn vừa leo lên 1 bước!`, `You climbed up one step!`),
        });
      }
      return next;
    });
  };

  const theme = LEVEL_THEME[level];

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FFF8E7 0%, #FFE5EC 25%, #E0F4FF 50%, #E8FFE0 75%, #FFF0F5 100%)" }}>
      <FloatingKidsDecor />
      <Navbar />
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

        {/* Mountain + Level tabs */}
        <section className="container mx-auto px-4 grid lg:grid-cols-[1fr_360px] gap-4 items-start">
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
                      background: active ? th.gradient : "rgba(255,255,255,0.85)",
                      color: active ? "#FFFFFF" : th.color,
                      borderColor: active ? "#FFFFFF" : th.color,
                      boxShadow: active ? `0 4px 14px ${th.color}55` : undefined,
                    }}
                  >
                    <span>{th.emoji}</span>
                    {lv}
                    <span className="px-2 py-0.5 rounded-full text-[10px]" style={{
                      background: active ? "rgba(255,255,255,0.3)" : `${th.color}22`,
                      color: active ? "#FFFFFF" : th.color,
                    }}>
                      {lvDone}/{lvWords.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative max-w-md mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={t("Tìm từ tiếng Anh hoặc nghĩa tiếng Việt...", "Search English or Vietnamese...")}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 h-11 bg-white/80 border-2 border-white"
              />
            </div>

            {/* Words grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((w, idx) => {
                  const key = `${w.level}:${w.word}`;
                  const isMastered = mastered.has(key);
                  return (
                    <motion.div
                      key={key}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, delay: Math.min(idx, 12) * 0.015 }}
                      whileHover={{ y: -3 }}
                      className="relative rounded-2xl p-3 border-2 shadow-md overflow-hidden"
                      style={{
                        borderColor: theme.color,
                        background: `linear-gradient(135deg, #fff 0%, ${theme.bg} 100%)`,
                        boxShadow: `0 2px 0 ${theme.color}, 0 6px 14px ${theme.color}33`,
                      }}
                    >
                      {isMastered && (
                        <div className="absolute top-2 right-2 text-[#10B981]">
                          <CheckCircle2 className="w-5 h-5 fill-[#D1FAE5]" />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="text-4xl drop-shadow">{w.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-slate-800 truncate">{w.word}</p>
                            <button
                              onClick={() => speak(w.word)}
                              className="p-1 rounded-full hover:bg-white"
                              style={{ color: theme.color }}
                              aria-label="Listen"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 truncate">{w.vi}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleMaster(w.level, w.word)}
                        className="mt-3 w-full text-xs font-bold uppercase tracking-wide rounded-xl py-2 transition-all flex items-center justify-center gap-1.5"
                        style={{
                          background: isMastered ? "#10B981" : `${theme.color}1A`,
                          color: isMastered ? "#FFFFFF" : theme.color,
                          border: `2px solid ${isMastered ? "#10B981" : theme.color}`,
                        }}
                      >
                        <Star className={`w-3.5 h-3.5 ${isMastered ? "fill-white" : ""}`} />
                        {isMastered ? t("Đã thuộc", "Mastered") : t("Đánh dấu thuộc", "Mark mastered")}
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
                  onClick={() => { if (confirm(t("Đặt lại tiến độ?", "Reset progress?"))) setMastered(new Set()); }}
                  className="mt-3 text-xs text-slate-500 hover:text-rose-600 w-full"
                >
                  {t("Đặt lại tiến độ", "Reset progress")}
                </Button>
              )}
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeYleVocabulary;
