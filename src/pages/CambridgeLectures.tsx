// Cambridge Journey Dashboard — Vibrant Dark Theme with Rainbow Glow
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, ArrowUpDown, Heart, Clock,
  Headphones, FileText, MessageSquare, BookType, ChevronRight,
  GraduationCap, TrendingUp, Sparkles, Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section — Vibrant Dark */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0A0E1A] to-[#0a1628]" />
          {/* Animated glow orbs */}
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-[#FF6B6B]/10 blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-[#4ECDC4]/10 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full bg-[#A78BFA]/8 blur-[90px] animate-pulse" style={{ animationDelay: "2s" }} />

          <div className="relative container mx-auto px-4 py-14 md:py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/20 via-[#4ECDC4]/20 to-[#A78BFA]/20 border border-white/10 backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8 text-[#C4B5FD]" />
                </div>
                <Badge className="bg-gradient-to-r from-[#FF6B6B]/20 to-[#A78BFA]/20 text-white border-white/20 text-sm px-4 py-1.5 font-bold uppercase tracking-wider">
                  Cambridge Journey
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight">
                {t("Cambridge: Starters đến PET", "Cambridge: Starters to PET")}
              </h1>
              <p className="text-[#94A3B8] mb-8" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                {t(
                  "15 bài giảng chiến lược với kỹ thuật tránh bẫy, công thức ghi điểm, và bài tập tương tác cho MỌI cấp độ Cambridge.",
                  "15 strategic lessons with trap-avoidance techniques, scoring formulas, and interactive practice for EVERY Cambridge level."
                )}
              </p>

              {/* Overall progress */}
              <div className="rounded-2xl p-5 border border-white/10 max-w-md backdrop-blur-md bg-white/[0.03]">
                <div className="flex justify-between text-sm mb-2.5">
                  <span className="text-[#C4B5FD] font-medium">{t("Tiến độ tổng", "Overall Progress")}</span>
                  <span className="text-white font-bold">{completed.size}/{allCambridgeLectures.length} {t("bài", "lessons")}</span>
                </div>
                <Progress value={progress} className="h-3 bg-white/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Level Progress Cards */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
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
                  className={`relative p-4 rounded-2xl border transition-all backdrop-blur-sm text-left ${
                    activeLevel === level
                      ? "border-white/30 bg-white/[0.08]"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
                  }`}
                  style={isComplete ? { boxShadow: `0 0 20px ${cfg.glowColor}, 0 0 40px ${cfg.glowColor}` } : undefined}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: cfg.color }}>{cfg.label}</p>
                  <p className="text-lg font-bold text-white">{stats.done}/{stats.total}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }} />
                  </div>
                  {isComplete && <span className="absolute -top-1 -right-1 text-lg">🌟</span>}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Filters Section */}
        <section className="container mx-auto px-4 pb-4">
          {/* Level filter pills */}
          <div className="flex flex-wrap gap-2.5 mb-4">
            {LEVEL_FILTERS.map(f => {
              const isActive = activeLevel === f.key;
              const cfg = f.key !== "all" ? LEVEL_CONFIG[f.key as CambridgeLevel] : null;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveLevel(f.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all border backdrop-blur-sm ${
                    isActive
                      ? cfg
                        ? `${cfg.bgClass} ${cfg.textClass} ${cfg.borderClass}`
                        : "bg-white/10 text-white border-white/20"
                      : "bg-white/[0.03] text-[#64748B] border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                  style={isActive && cfg ? { boxShadow: `0 0 12px ${cfg.glowColor}` } : undefined}
                >
                  <span className="text-base">{f.emoji}</span>
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Skill filter pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {SKILL_FILTERS.map(f => {
              const Icon = f.icon;
              const isActive = activeSkill === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveSkill(f.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-all border ${
                    isActive
                      ? "bg-[#A78BFA]/20 text-[#C4B5FD] border-[#A78BFA]/40"
                      : "bg-white/[0.02] text-[#475569] border-white/[0.06] hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Bookmark */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
              <Input
                placeholder={t("Tìm theo cấp độ, kỹ năng, chủ đề...", "Search by level, skill, topic...")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#475569] text-base"
              />
            </div>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[170px] h-11 bg-white/[0.04] border-white/[0.08] text-[#94A3B8]">
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
              className={`h-11 ${showBookmarked ? "bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30" : "border-white/[0.08] text-[#64748B] hover:bg-white/[0.06]"}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${showBookmarked ? "fill-rose-400" : ""}`} />
              {t("Đã lưu", "Saved")} ({bookmarked.size})
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-5 text-sm text-[#475569]">
            <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {filtered.length} {t("bài giảng", "lectures")}</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {completed.size} {t("đã hoàn thành", "completed")}</span>
          </div>
        </section>

        {/* Card Grid */}
        <section className="container mx-auto px-4 pb-16">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <BookOpen className="w-14 h-14 mx-auto text-[#334155] mb-4" />
              <p className="text-lg text-[#64748B]">{t("Không tìm thấy bài giảng phù hợp.", "No matching lectures found.")}</p>
              <Button variant="outline" size="sm" className="mt-4 border-white/10 text-[#64748B]" onClick={() => { setActiveLevel("all"); setActiveSkill("all"); setSearchQuery(""); setShowBookmarked(false); }}>
                {t("Xóa bộ lọc", "Clear Filters")}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((lecture, i) => (
                  <CambridgeCard
                    key={lecture.id}
                    lecture={lecture}
                    index={i}
                    isBookmarked={bookmarked.has(lecture.id)}
                    isCompleted={completed.has(lecture.id)}
                    onToggleBookmark={() => toggleBookmark(lecture.id)}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </div>
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

          {/* Title — 22px */}
          <h3 className="font-bold text-white mb-2.5 group-hover:text-[#C4B5FD] transition-colors leading-snug" style={{ fontSize: "22px", lineHeight: "1.5" }}>
            {t(lecture.titleVi, lecture.title)}
          </h3>

          {/* Description — 18px */}
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

export default CambridgeLectures;
