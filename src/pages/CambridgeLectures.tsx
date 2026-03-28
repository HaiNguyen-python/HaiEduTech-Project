// Cambridge Journey: From Starters to PET — Rainbow-themed Dashboard
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, ArrowUpDown, Heart, Clock,
  Headphones, FileText, MessageSquare, BookType, ChevronRight,
  GraduationCap, TrendingUp, Star, Sparkles
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

// Level filter tabs
const LEVEL_FILTERS: { key: string; label: string; labelVi: string; emoji: string }[] = [
  { key: "all", label: "All Levels", labelVi: "Tất cả", emoji: "🌈" },
  { key: "starters", label: "Starters", labelVi: "Starters", emoji: "🎨" },
  { key: "movers", label: "Movers", labelVi: "Movers", emoji: "🚀" },
  { key: "flyers", label: "Flyers", labelVi: "Flyers", emoji: "🦅" },
  { key: "ket", label: "KET", labelVi: "KET", emoji: "📝" },
  { key: "pet", label: "PET", labelVi: "PET", emoji: "🎓" },
];

// Skill filter
const SKILL_FILTERS: { key: string; label: string; labelVi: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All Skills", labelVi: "Tất cả kỹ năng", icon: BookOpen },
  { key: "listening", label: "Listening", labelVi: "Nghe", icon: Headphones },
  { key: "reading-writing", label: "Reading & Writing", labelVi: "Đọc & Viết", icon: FileText },
  { key: "speaking", label: "Speaking", labelVi: "Nói", icon: MessageSquare },
  { key: "vocabulary", label: "Vocabulary", labelVi: "Từ vựng", icon: BookType },
];

const CambridgeLectures = () => {
  const { t } = useLanguage();
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeSkill, setActiveSkill] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [bookmarked, setBookmarked] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("cambridge-bookmarked") || "[]"));
    } catch { return new Set(); }
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

  const progress = allCambridgeLectures.length > 0 ? Math.round((completed.size / allCambridgeLectures.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1a1040] to-[#0F172A]">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero — Rainbow gradient header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#3B82F6]/10 to-[#22C55E]/10" />
          {/* Fun sparkle decorations */}
          <div className="absolute top-8 right-12 text-4xl opacity-40 animate-pulse">✨</div>
          <div className="absolute bottom-6 left-16 text-3xl opacity-30 animate-bounce">⭐</div>
          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#EF4444]/20 via-[#3B82F6]/20 to-[#22C55E]/20 border border-white/10 backdrop-blur-sm">
                  <GraduationCap className="w-7 h-7 text-[#A78BFA]" />
                </div>
                <Badge className="bg-[#A855F7]/20 text-[#C4B5FD] border-[#A855F7]/30 text-sm px-3 py-1">
                  Cambridge Journey
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {t("Cambridge: Từ Starters đến PET", "Cambridge: From Starters to PET")}
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6 leading-relaxed" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                {t(
                  "Chiến lược thi, mẹo tránh bẫy, và bài luyện tập tương tác cho mọi cấp độ Cambridge.",
                  "Exam strategies, trap-avoidance tips, and interactive practice for every Cambridge level."
                )}
              </p>
              {/* Progress bar */}
              <div className="rounded-xl p-4 border border-white/10 max-w-md backdrop-blur-md bg-white/[0.03]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#C4B5FD]">{t("Tiến độ học", "Learning Progress")}</span>
                  <span className="text-white font-semibold">{completed.size}/{allCambridgeLectures.length} {t("bài", "lessons")}</span>
                </div>
                <Progress value={progress} className="h-2.5 bg-white/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Level filter tabs — Rainbow palette */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {LEVEL_FILTERS.map(f => {
              const isActive = activeLevel === f.key;
              const cfg = f.key !== "all" ? LEVEL_CONFIG[f.key as CambridgeLevel] : null;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveLevel(f.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border backdrop-blur-sm ${
                    isActive
                      ? cfg
                        ? `${cfg.bgClass} ${cfg.textClass} ${cfg.borderClass} shadow-lg`
                        : "bg-white/10 text-white border-white/20 shadow-lg"
                      : "bg-white/[0.04] text-[#94A3B8] border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{f.emoji}</span>
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Skill filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SKILL_FILTERS.map(f => {
              const Icon = f.icon;
              const isActive = activeSkill === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveSkill(f.key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    isActive
                      ? "bg-[#A855F7]/20 text-[#C4B5FD] border-[#A855F7]/40"
                      : "bg-white/[0.04] text-[#64748B] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Bookmark row */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <Input
                placeholder={t("Tìm theo cấp độ, chủ đề...", "Search by level, topic...")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/[0.04] border-white/10 text-white placeholder:text-[#64748B]"
              />
            </div>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] bg-white/[0.04] border-white/10 text-[#CBD5E1]">
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
              size="sm"
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={showBookmarked ? "bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30" : "border-white/10 text-[#94A3B8] hover:bg-white/[0.08]"}
            >
              <Heart className={`w-4 h-4 mr-1.5 ${showBookmarked ? "fill-rose-400" : ""}`} />
              {t("Đã lưu", "Saved")} ({bookmarked.size})
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4 text-sm text-[#64748B]">
            <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {filtered.length} {t("bài giảng", "lectures")}</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> {completed.size} {t("đã hoàn thành", "completed")}</span>
          </div>
        </section>

        {/* Card Grid */}
        <section className="container mx-auto px-4 pb-12">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto text-[#475569] mb-4" />
              <p className="text-lg text-[#94A3B8]">{t("Không tìm thấy bài giảng phù hợp.", "No matching lectures found.")}</p>
              <Button variant="outline" size="sm" className="mt-4 border-white/10 text-[#94A3B8]" onClick={() => { setActiveLevel("all"); setActiveSkill("all"); setSearchQuery(""); setShowBookmarked(false); }}>
                {t("Xóa bộ lọc", "Clear Filters")}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

// Card component with rainbow-coded level badge
interface CambridgeCardProps {
  lecture: CambridgeLecture;
  index: number;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: () => void;
  t: (vi: string, en: string) => string;
}

const SKILL_ICONS: Record<CambridgeSkill, React.ComponentType<{ className?: string }>> = {
  listening: Headphones,
  "reading-writing": FileText,
  speaking: MessageSquare,
  vocabulary: BookType,
};

const CambridgeCard = ({ lecture, index, isBookmarked, isCompleted, onToggleBookmark, t }: CambridgeCardProps) => {
  const levelCfg = LEVEL_CONFIG[lecture.level];
  const SkillIcon = SKILL_ICONS[lecture.skill];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link to={`/cambridge-lectures/${lecture.id}`} className="group block h-full">
        <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#1E1B3A]/60 backdrop-blur-xl p-5 transition-all hover:shadow-xl hover:-translate-y-1"
          style={{ borderColor: `${levelCfg.color}22` }}
        >
          {/* Level ribbon accent */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${levelCfg.gradientFrom}, ${levelCfg.gradientTo})` }} />

          {/* Header row */}
          <div className="flex items-start justify-between mb-3 mt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{lecture.icon}</span>
              <Badge variant="outline" className={`text-xs font-bold ${levelCfg.bgClass} ${levelCfg.textClass} ${levelCfg.borderClass}`}>
                {levelCfg.label}
              </Badge>
              <Badge variant="outline" className="text-xs bg-white/5 text-[#94A3B8] border-white/10">
                <SkillIcon className="w-3 h-3 mr-1" />
                {lecture.skill === "reading-writing" ? "R&W" : lecture.skill.charAt(0).toUpperCase() + lecture.skill.slice(1)}
              </Badge>
            </div>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(); }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-rose-400 text-rose-400" : "text-[#475569]"}`} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#C4B5FD] transition-colors leading-tight" style={{ fontSize: "20px", lineHeight: "1.8" }}>
            {t(lecture.titleVi, lecture.title)}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2" style={{ lineHeight: "1.8" }}>
            {t(lecture.descriptionVi, lecture.description)}
          </p>

          {/* Bottom metadata */}
          <div className="flex items-center gap-2 flex-wrap mt-auto">
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <Clock className="w-3.5 h-3.5" />
              {lecture.duration}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <Sparkles className="w-3.5 h-3.5" />
              {lecture.practiceSet.length} {t("bài tập", "exercises")}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#64748B]">
              <Star className="w-3.5 h-3.5" />
              {lecture.quiz.length} {t("câu quiz", "quiz Q")}
            </div>
          </div>

          {/* Completed indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-12 bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">
              ✓ {t("Đã học", "Done")}
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 text-[#C4B5FD]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CambridgeLectures;
