// Cambridge Journey Dashboard - Vibrant Dark Theme with Rainbow Glow
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, ArrowUpDown, Heart, Clock,
  Headphones, FileText, MessageSquare, BookType, ChevronRight, ChevronDown,
  GraduationCap, TrendingUp, Sparkles, Star, PlayCircle, CheckCircle2, Lock, SlidersHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { useLanguage } from "@/contexts/LanguageContext";
import { allCambridgeLectures, LEVEL_CONFIG, type CambridgeLecture, type CambridgeLevel, type CambridgeSkill } from "@/data/cambridgeLecturesData";

// Level filter tabs with vibrant emojis
const LEVEL_FILTERS: { key: string; label: string; labelVi: string; emoji: string }[] = [
  { key: "all", label: "All Levels", labelVi: "Tất cả", emoji: "🌈" },
  { key: "starters", label: "STARTERS", labelVi: "STARTERS", emoji: "🎨" },
  { key: "movers", label: "MOVERS", labelVi: "MOVERS", emoji: "🚀" },
  { key: "flyers", label: "FLYERS", labelVi: "FLYERS", emoji: "🦅" },
  { key: "ket", label: "KET", labelVi: "KET", emoji: "📝" },
  { key: "pet", label: "PET", labelVi: "PET", emoji: "🏆" },
];

// Skill filters with icons
const SKILL_FILTERS: { key: string; label: string; labelVi: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All Skills", labelVi: "Tất cả", icon: BookOpen },
  { key: "listening", label: "Listening", labelVi: "Nghe", icon: Headphones },
  { key: "reading-writing", label: "Reading & Writing", labelVi: "Đọc & Viết", icon: FileText },
  { key: "speaking", label: "Speaking", labelVi: "Nói", icon: MessageSquare },
  { key: "vocabulary", label: "Vocabulary", labelVi: "Từ vựng", icon: BookType },
];

// Skill icons map
const SKILL_ICONS: Record<CambridgeSkill, React.ComponentType<{ className?: string }>> = {
  listening: Headphones,
  "reading-writing": FileText,
  speaking: MessageSquare,
  vocabulary: BookType,
};

const CambridgeLectures = () => {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeSkill, setActiveSkill] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [bookmarked, setBookmarked] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("cambridge-bookmarked") || "[]")); }
    catch { return new Set(); }
  });
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("cambridge-bookmarked", JSON.stringify([...next]));
      return next;
    });
  };

  const completed = useMemo(() => {
    try { return new Set(JSON.parse(localStorage.getItem("cambridge-completed") || "[]")); }
    catch { return new Set<string>(); }
  }, []);

  // Filter & sort
  const filtered = useMemo(() => {
    let result = [...allCambridgeLectures];
    if (activeLevel !== "all") result = result.filter(l => l.level === activeLevel);
    if (activeSkill !== "all") result = result.filter(l => l.skill === activeSkill);
    if (showBookmarked) result = result.filter(l => bookmarked.has(l.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.titleVi.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.level.includes(q)
      );
    }
    if (sortOrder === "easy-first") {
      const order: Record<string, number> = { starters: 0, movers: 1, flyers: 2, ket: 3, pet: 4 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    if (sortOrder === "hard-first") {
      const order: Record<string, number> = { starters: 4, movers: 3, flyers: 2, ket: 1, pet: 0 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    return result;
  }, [activeLevel, activeSkill, searchQuery, sortOrder, showBookmarked, bookmarked]);

  // Per-level progress
  const levelCounts = useMemo(() => {
    const counts: Record<string, { total: number; done: number }> = {};
    for (const l of allCambridgeLectures) {
      if (!counts[l.level]) counts[l.level] = { total: 0, done: 0 };
      counts[l.level].total++;
      if (completed.has(l.id)) counts[l.level].done++;
    }
    return counts;
  }, [completed]);

  const progress = allCambridgeLectures.length > 0 ? Math.round((completed.size / allCambridgeLectures.length) * 100) : 0;

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(180deg, #FFF8E7 0%, #FFE5EC 25%, #E0F4FF 50%, #E8FFE0 75%, #FFF0F5 100%)" }}>
      <FloatingKidsDecor />
      <Navbar />
      <main className="pt-20 pb-8 relative z-10">
        {/* Hero Section - Bright & Cheerful for Kids */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FFE5EC 0%, #FFF8DC 30%, #E0F4FF 70%, #E8FFE0 100%)" }} />
          {/* Cheerful soft glow orbs */}
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-[#FF6B9D]/30 blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-[#FFD93D]/30 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-[#6BCB77]/25 blur-[90px] animate-pulse" style={{ animationDelay: "2s" }} />

          <div className="relative container mx-auto px-4 py-8 md:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FF6B9D] via-[#FFD93D] to-[#4D96FF] border-2 border-white shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-gradient-to-r from-[#FF6B9D] to-[#C780FA] text-white border-2 border-white shadow-md text-sm px-4 py-1.5 font-bold uppercase tracking-wider">
                  🌈 Cambridge Journey 🎈
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-tight" style={{ background: "linear-gradient(135deg, #FF6B9D 0%, #FF9F1C 35%, #6BCB77 70%, #4D96FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("Cambridge: Starters đến PET 🎓", "Cambridge: Starters to PET 🎓")}
              </h1>
              <p className="text-slate-700 mb-5 font-medium" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                {t(
                  "🎨 15 bài giảng vui nhộn với kỹ thuật tránh bẫy, công thức ghi điểm, và bài tập tương tác cho MỌI cấp độ Cambridge dành cho thiếu nhi! 🚀",
                  "🎨 15 fun strategic lessons with trap-avoidance techniques, scoring formulas, and interactive practice for EVERY Cambridge level for kids! 🚀"
                )}
              </p>

              {/* Overall progress */}
              <div className="rounded-2xl p-5 border-2 border-white max-w-md backdrop-blur-md bg-white/70 shadow-lg">
                <div className="flex justify-between text-sm mb-2.5">
                  <span className="text-[#7C3AED] font-bold">⭐ {t("Tiến độ tổng", "Overall Progress")}</span>
                  <span className="text-slate-800 font-bold">{completed.size}/{allCambridgeLectures.length} {t("bài", "lessons")}</span>
                </div>
                <Progress value={progress} className="h-3 bg-slate-200" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Level Progress Cards */}
        <section className="container mx-auto px-4 pt-4 pb-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
            {(["starters", "movers", "flyers", "ket", "pet"] as CambridgeLevel[]).map(level => {
              const cfg = LEVEL_CONFIG[level];
              const stats = levelCounts[level] || { total: 0, done: 0 };
              const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
              const isComplete = pct === 100 && stats.total > 0;
              return (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveLevel(activeLevel === level ? "all" : level)}
                  className={`relative p-4 rounded-2xl border-2 transition-all backdrop-blur-sm text-left shadow-md ${
                    activeLevel === level
                      ? "border-white bg-white/90"
                      : "border-white/60 bg-white/70 hover:bg-white/85"
                  }`}
                  style={isComplete ? { boxShadow: `0 0 20px ${cfg.glowColor}, 0 0 40px ${cfg.glowColor}` } : undefined}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: cfg.color }}>{cfg.label}</p>
                  <p className="text-lg font-bold text-slate-800">{stats.done}/{stats.total}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }} />
                  </div>
                  {isComplete && <span className="absolute -top-1 -right-1 text-lg">🌟</span>}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Filters Section */}
        <section className="container mx-auto px-4 pb-3">
          {/* Collapsible Filter Toggle */}
          <button
            onClick={() => setShowFilters(s => !s)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide bg-white/80 border-2 border-white text-slate-700 hover:bg-white shadow-sm transition-all mb-3"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {t("Bộ lọc", "Filters")}
            {(activeLevel !== "all" || activeSkill !== "all") && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-[#C780FA] text-white text-[10px]">
                {[activeLevel !== "all" ? 1 : 0, activeSkill !== "all" ? 1 : 0].reduce((a, b) => a + b, 0)}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-white/70 border-2 border-white shadow-sm mb-3 space-y-3">
                  {/* Level filter pills */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">{t("Cấp độ", "Level")}</p>
                    <div className="flex flex-wrap gap-2">
                      {LEVEL_FILTERS.map(f => {
                        const isActive = activeLevel === f.key;
                        const cfg = f.key !== "all" ? LEVEL_CONFIG[f.key as CambridgeLevel] : null;
                        return (
                          <button
                            key={f.key}
                            onClick={() => setActiveLevel(f.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border-2 shadow-sm ${
                              isActive
                                ? cfg
                                  ? `${cfg.bgClass} ${cfg.textClass} ${cfg.borderClass}`
                                  : "bg-white text-slate-800 border-slate-300"
                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                            }`}
                            style={isActive && cfg ? { boxShadow: `0 0 10px ${cfg.glowColor}` } : undefined}
                          >
                            <span className="text-sm">{f.emoji}</span>
                            {t(f.labelVi, f.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Skill filter pills */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">{t("Kỹ năng", "Skill")}</p>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_FILTERS.map(f => {
                        const Icon = f.icon;
                        const isActive = activeSkill === f.key;
                        return (
                          <button
                            key={f.key}
                            onClick={() => setActiveSkill(f.key)}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border-2 ${
                              isActive
                                ? "bg-[#C780FA]/30 text-[#7C3AED] border-[#C780FA]"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {t(f.labelVi, f.label)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search + Sort + Bookmark */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder={t("Tìm theo cấp độ, kỹ năng, chủ đề...", "Search by level, skill, topic...")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-white/80 border-2 border-white text-slate-800 placeholder:text-slate-400 text-base shadow-sm"
              />
            </div>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[170px] h-11 bg-white/80 border-2 border-white text-slate-700 shadow-sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("Sắp xếp", "Sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{t("Mặc định", "Default")}</SelectItem>
                <SelectItem value="easy-first">{t("Dễ → Khó", "Easy → Hard")}</SelectItem>
                <SelectItem value="hard-first">{t("Khó → Dễ", "Hard → Easy")}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showBookmarked ? "default" : "outline"}
              size="default"
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`h-11 ${showBookmarked ? "bg-rose-400 text-white border-rose-400 hover:bg-rose-500" : "bg-white/80 border-2 border-white text-slate-700 hover:bg-white shadow-sm"}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${showBookmarked ? "fill-white" : ""}`} />
              {t("Đã lưu", "Saved")} ({bookmarked.size})
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-5 text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {filtered.length} {t("bài giảng", "lectures")}</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {completed.size} {t("đã hoàn thành", "completed")}</span>
          </div>
        </section>


        {/* 🎯 Grouped Lectures - by Level → by Skill */}
        <section className="container mx-auto px-4 pb-8">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <BookOpen className="w-14 h-14 mx-auto text-[#334155] mb-4" />
              <p className="text-lg text-[#64748B]">{t("Không tìm thấy bài giảng phù hợp.", "No matching lectures found.")}</p>
              <Button variant="outline" size="sm" className="mt-4 border-white/10 text-[#64748B]" onClick={() => { setActiveLevel("all"); setActiveSkill("all"); setSearchQuery(""); setShowBookmarked(false); }}>
                {t("Xóa bộ lọc", "Clear Filters")}
              </Button>
            </motion.div>
          ) : (
            <GroupedLectureSections
              lectures={filtered}
              bookmarked={bookmarked}
              completed={completed as Set<string>}
              onToggleBookmark={toggleBookmark}
              t={t}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Card with vibrant glow borders and large typography
interface CambridgeCardProps {
  lecture: CambridgeLecture;
  index: number;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: () => void;
  t: (vi: string, en: string) => string;
}

const CambridgeCard = ({ lecture, index, isBookmarked, isCompleted, onToggleBookmark, t }: CambridgeCardProps) => {
  const levelCfg = LEVEL_CONFIG[lecture.level];
  const SkillIcon = SKILL_ICONS[lecture.skill];
  const [showTip, setShowTip] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <Link to={`/cambridge-lectures/${lecture.id}`} className="group block h-full">
        <div
          className="relative h-full rounded-2xl border backdrop-blur-xl p-6 transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "rgba(15,18,35,0.7)",
            borderColor: `${levelCfg.color}33`,
            boxShadow: `0 0 0 0 transparent`,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${levelCfg.glowColor}, 0 4px 20px rgba(0,0,0,0.3)`; (e.currentTarget as HTMLDivElement).style.borderColor = `${levelCfg.color}66`; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0 transparent"; (e.currentTarget as HTMLDivElement).style.borderColor = `${levelCfg.color}33`; }}
        >
          {/* Top gradient ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }} />

          {/* Header */}
          <div className="flex items-start justify-between mb-4 mt-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-3xl">{lecture.icon}</span>
              <Badge variant="outline" className={`text-xs font-black uppercase tracking-widest px-3 py-1 ${levelCfg.bgClass} ${levelCfg.textClass} ${levelCfg.borderClass}`}>
                {levelCfg.label}
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wide bg-white/[0.04] text-[#94A3B8] border-white/10 px-2.5 py-1">
                <SkillIcon className="w-3.5 h-3.5 mr-1" />
                {lecture.skill === "reading-writing" ? "R&W" : lecture.skill.charAt(0).toUpperCase() + lecture.skill.slice(1)}
              </Badge>
              {lecture.isNew && (
                <Badge className="bg-gradient-to-r from-[#FF6B6B]/30 to-[#F97316]/30 text-[#FCA5A5] border-[#FF6B6B]/40 text-xs font-bold animate-pulse">
                  ✨ NEW
                </Badge>
              )}
            </div>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(); }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-rose-400 text-rose-400" : "text-[#334155]"}`} />
            </button>
          </div>

          {/* Title - 22px */}
          <h3 className="font-bold text-white mb-2.5 group-hover:text-[#C4B5FD] transition-colors leading-snug" style={{ fontSize: "22px", lineHeight: "1.5" }}>
            {t(lecture.titleVi, lecture.title)}
          </h3>

          {/* Description - 18px */}
          <p className="text-[#94A3B8] mb-5 line-clamp-3" style={{ fontSize: "18px", lineHeight: "1.8" }}>
            {t(lecture.descriptionVi, lecture.description)}
          </p>

          {/* Teacher Hai's Secret Tip on hover */}
          <AnimatePresence>
            {showTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 overflow-hidden"
              >
                <p className="text-xs font-semibold text-amber-300 mb-1">🔑 Teacher Hai&apos;s Secret Tip:</p>
                <p className="text-sm text-amber-200/80 line-clamp-2">{t(lecture.secretTipVi, lecture.secretTip)}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom metadata */}
          <div className="flex items-center gap-3 flex-wrap mt-auto">
            <div className="flex items-center gap-1.5 text-sm text-[#475569]">
              <Clock className="w-4 h-4" />
              {lecture.duration}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#475569]">
              <Sparkles className="w-4 h-4" />
              {lecture.practiceSet.length} {t("bài tập", "exercises")}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#475569]">
              <Star className="w-4 h-4" />
              {lecture.quiz.length} quiz
            </div>
          </div>

          {/* Completed indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-14 bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 font-semibold">
              ✓ {t("Đã học", "Done")}
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-6 h-6 text-[#C4B5FD]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================
// GROUPED LECTURE SECTIONS - by Level → by Skill
// Lessons numbered for clear "what to learn first" guidance.
// ============================================================
const LEVEL_ORDER: CambridgeLevel[] = ["starters", "movers", "flyers", "ket", "pet"];
const SKILL_ORDER: { key: CambridgeSkill; labelVi: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "vocabulary", labelVi: "Từ vựng nền tảng", label: "Vocabulary Foundation", icon: BookType },
  { key: "listening", labelVi: "Nghe", label: "Listening", icon: Headphones },
  { key: "reading-writing", labelVi: "Đọc & Viết", label: "Reading & Writing", icon: FileText },
  { key: "speaking", labelVi: "Nói", label: "Speaking", icon: MessageSquare },
];

interface GroupedProps {
  lectures: CambridgeLecture[];
  bookmarked: Set<string>;
  completed: Set<string>;
  onToggleBookmark: (id: string) => void;
  t: (vi: string, en: string) => string;
}

const GroupedLectureSections = ({ lectures, bookmarked, completed, onToggleBookmark, t }: GroupedProps) => {
  // Group by level → skill
  const byLevel = useMemo(() => {
    const map: Record<string, CambridgeLecture[]> = {};
    for (const lec of lectures) {
      (map[lec.level] ||= []).push(lec);
    }
    return map;
  }, [lectures]);

  // Find the first uncompleted lesson across the whole pathway → "Start here"
  const startHereId = useMemo(() => {
    for (const lvl of LEVEL_ORDER) {
      for (const skill of SKILL_ORDER) {
        const lessons = (byLevel[lvl] || []).filter(l => l.skill === skill.key);
        for (const l of lessons) {
          if (!completed.has(l.id)) return l.id;
        }
      }
    }
    return null;
  }, [byLevel, completed]);

  const [openLevels, setOpenLevels] = useState<Set<string>>(() => {
    // Default: open the first level that has lectures
    for (const lvl of LEVEL_ORDER) {
      if ((byLevel[lvl] || []).length > 0) return new Set([lvl]);
    }
    return new Set();
  });

  const toggleLevel = (lvl: string) => {
    setOpenLevels(prev => {
      const next = new Set(prev);
      if (next.has(lvl)) next.delete(lvl); else next.add(lvl);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {LEVEL_ORDER.map((lvl) => {
        const levelLectures = byLevel[lvl] || [];
        if (levelLectures.length === 0) return null;
        const cfg = LEVEL_CONFIG[lvl];
        const doneCount = levelLectures.filter(l => completed.has(l.id)).length;
        const pct = Math.round((doneCount / levelLectures.length) * 100);
        const isOpen = openLevels.has(lvl);

        return (
          <motion.div
            key={lvl}
            layout
            className="rounded-2xl border-2 backdrop-blur-sm overflow-hidden shadow-lg"
            style={{
              background: "rgba(255,255,255,0.85)",
              borderColor: `${cfg.color}66`,
            }}
          >
            {/* Level header - clickable to expand/collapse */}
            <button
              onClick={() => toggleLevel(lvl)}
              className="w-full px-5 md:px-6 py-5 flex items-center gap-4 hover:bg-white/60 transition-colors text-left"
              style={{ background: `linear-gradient(90deg, ${cfg.gradientFrom}30, ${cfg.gradientTo}15)` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border-2 shadow-sm"
                style={{ background: `${cfg.color}30`, borderColor: cfg.color }}
              >
                {LEVEL_FILTERS.find(f => f.key === lvl)?.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">{cfg.label}</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${cfg.color}30`, color: cfg.color }}>
                    {levelLectures.length} {t("bài", "lessons")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-xs h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 tabular-nums">
                    {doneCount}/{levelLectures.length}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-slate-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Skill sub-sections */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-6 pb-6 pt-2 space-y-5">
                    {SKILL_ORDER.map((skill) => {
                      const skillLessons = levelLectures.filter(l => l.skill === skill.key);
                      if (skillLessons.length === 0) return null;
                      const SkillIcon = skill.icon;
                      const skillDone = skillLessons.filter(l => completed.has(l.id)).length;

                      return (
                        <div key={skill.key}>
                          {/* Skill heading */}
                          <div className="flex items-center gap-2.5 mb-3 pb-2 border-b-2 border-slate-200">
                            <div className="w-8 h-8 rounded-lg bg-[#C780FA]/20 border-2 border-[#C780FA]/40 flex items-center justify-center">
                              <SkillIcon className="w-4 h-4 text-[#7C3AED]" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                              {t(skill.labelVi, skill.label)}
                            </h3>
                            <span className="text-xs text-slate-500 tabular-nums ml-auto font-medium">
                              {skillDone}/{skillLessons.length}
                            </span>
                          </div>

                          {/* Numbered lesson list */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {skillLessons.map((lec, idx) => {
                              const isDone = completed.has(lec.id);
                              const isStart = lec.id === startHereId;
                              return (
                                <Link
                                  key={lec.id}
                                  to={`/cambridge-lectures/${lec.id}`}
                                  className="group relative flex items-start gap-3 px-3.5 py-3 rounded-xl bg-white border-2 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                                  style={{
                                    borderColor: cfg.color,
                                    boxShadow: `0 2px 0 ${cfg.color}, 0 4px 12px ${cfg.glowColor}40`,
                                    background: `linear-gradient(135deg, #fff 0%, ${cfg.color}10 100%)`,
                                  }}
                                >
                                  {/* Number / done badge */}
                                  <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                                      isDone
                                        ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-300"
                                        : "bg-gradient-to-br from-[#FFD93D] to-[#FF9F1C] text-white shadow-sm"
                                    }`}
                                  >
                                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : String(idx + 1).padStart(2, "0")}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                      {isStart && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#FF6B9D] to-[#C780FA] text-white animate-pulse">
                                          ★ {t("Bắt đầu", "Start")}
                                        </span>
                                      )}
                                      {lec.isNew && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF6B6B] text-white">
                                          NEW
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#7C3AED] transition-colors">
                                      {t(lec.titleVi, lec.title)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{lec.duration}</span>
                                      <span>•</span>
                                      <span>{lec.practiceSet.length} {t("BT", "ex")}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(lec.id); }}
                                    className="p-1 rounded hover:bg-rose-50 transition-colors shrink-0"
                                    aria-label="Bookmark"
                                  >
                                    <Heart className={`w-4 h-4 ${bookmarked.has(lec.id) ? "fill-rose-400 text-rose-400" : "text-slate-300"}`} />
                                  </button>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CambridgeLectures;
