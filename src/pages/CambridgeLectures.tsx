// Cambridge Journey Dashboard — Vibrant Dark Theme with Rainbow Glow
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, ArrowUpDown, Heart, Clock,
  Headphones, FileText, MessageSquare, BookType, ChevronRight, ChevronDown,
  GraduationCap, TrendingUp, Sparkles, Star, PlayCircle, CheckCircle2, Lock
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

        {/* 📝 Cambridge Test Prep Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#F9A826]/20 to-[#FF6B6B]/20 border border-white/10">
              <GraduationCap className="w-6 h-6 text-[#F9A826]" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t("Đề thi thử Cambridge", "Cambridge Test Prep")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cambridgeMockExams.map((exam) => {
              const lvl = CAMBRIDGE_LEVEL_LABELS[exam.level];
              const bestRaw = localStorage.getItem(`cambridge-mock-best-${exam.id}`);
              const best = bestRaw ? Math.round((parseInt(bestRaw) / exam.totalQuestions) * 100) : null;
              return (
                <div key={exam.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.06] transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{lvl.emoji}</span>
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: `${lvl.color}20`, color: lvl.color }}>{lvl.label}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{t(exam.titleVi, exam.title)}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exam.duration}m</span>
                    <span>{exam.totalQuestions} {t("câu", "Qs")}</span>
                  </div>
                  {best !== null && (
                    <div className={`text-xs font-bold mb-2 ${best >= 80 ? "text-emerald-400" : best >= 60 ? "text-amber-400" : "text-red-400"}`}>
                      🏆 {t("Cao nhất", "Best")}: {best}%
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link to={`/cambridge-mock-exam/${exam.id}?mode=timed`} className="flex-1">
                      <Button size="sm" className="w-full text-xs bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:opacity-90">
                        <Clock className="w-3 h-3 mr-1" />{t("Có giờ", "Timed")}
                      </Button>
                    </Link>
                    <Link to={`/cambridge-mock-exam/${exam.id}?mode=untimed`} className="flex-1">
                      <Button size="sm" variant="outline" className="w-full text-xs border-white/20 text-[#94A3B8] hover:bg-white/10">
                        {t("Tự do", "Free")}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🎯 Grouped Lectures — by Level → by Skill */}
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

// ============================================================
// GROUPED LECTURE SECTIONS — by Level → by Skill
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
    <div className="space-y-6">
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
            className="rounded-2xl border backdrop-blur-sm overflow-hidden"
            style={{
              background: "rgba(15,18,35,0.5)",
              borderColor: `${cfg.color}33`,
            }}
          >
            {/* Level header — clickable to expand/collapse */}
            <button
              onClick={() => toggleLevel(lvl)}
              className="w-full px-5 md:px-6 py-5 flex items-center gap-4 hover:bg-white/[0.03] transition-colors text-left"
              style={{ background: `linear-gradient(90deg, ${cfg.gradientFrom}15, transparent)` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border"
                style={{ background: `${cfg.color}20`, borderColor: `${cfg.color}40` }}
              >
                {LEVEL_FILTERS.find(f => f.key === lvl)?.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold text-white">{cfg.label}</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${cfg.color}20`, color: cfg.color }}>
                    {levelLectures.length} {t("bài", "lessons")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 max-w-xs h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cfg.gradientFrom}, ${cfg.gradientTo})` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#94A3B8] tabular-nums">
                    {doneCount}/{levelLectures.length}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-6 h-6 text-[#94A3B8] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
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
                          <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-white/[0.06]">
                            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                              <SkillIcon className="w-4 h-4 text-[#C4B5FD]" />
                            </div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                              {t(skill.labelVi, skill.label)}
                            </h3>
                            <span className="text-xs text-[#64748B] tabular-nums ml-auto">
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
                                  className="group relative flex items-start gap-3 px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20 transition-all"
                                >
                                  {/* Number / done badge */}
                                  <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                                      isDone
                                        ? "bg-emerald-500/20 text-emerald-300"
                                        : "bg-white/[0.06] text-[#CBD5E1]"
                                    }`}
                                  >
                                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : String(idx + 1).padStart(2, "0")}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                      {isStart && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white animate-pulse">
                                          ★ {t("Bắt đầu", "Start")}
                                        </span>
                                      )}
                                      {lec.isNew && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF6B6B]/20 text-[#FCA5A5] border border-[#FF6B6B]/30">
                                          NEW
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#C4B5FD] transition-colors">
                                      {t(lec.titleVi, lec.title)}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#64748B]">
                                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{lec.duration}</span>
                                      <span>•</span>
                                      <span>{lec.practiceSet.length} {t("BT", "ex")}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(lec.id); }}
                                    className="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
                                    aria-label="Bookmark"
                                  >
                                    <Heart className={`w-4 h-4 ${bookmarked.has(lec.id) ? "fill-rose-400 text-rose-400" : "text-[#334155]"}`} />
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
