// TOEIC Lectures Dashboard - Deep Business Blue Glassmorphism Design
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Filter, ArrowUpDown, Heart, Clock, Target,
  Headphones, FileText, BookType, Briefcase, Zap, Flame, ChevronRight,
  GraduationCap, TrendingUp, ArrowLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToeicLectureProgress } from "@/hooks/useToeicLectureProgress";
import { allToeicLectures, type ToeicLecture } from "@/data/toeicLecturesData";
import ToeicRoadmap from "@/components/toeic/ToeicRoadmap";

// Category filter configuration
const CATEGORY_FILTERS = [
  { key: "all", label: "All", labelVi: "Tất cả", icon: BookOpen },
  { key: "listening", label: "Listening (P1-4)", labelVi: "Nghe (P1-4)", icon: Headphones },
  { key: "reading", label: "Reading (P5-7)", labelVi: "Đọc (P5-7)", icon: FileText },
  { key: "grammar", label: "Grammar", labelVi: "Ngữ pháp", icon: BookType },
  { key: "business-vocab", label: "Business Vocab", labelVi: "Từ vựng KD", icon: Briefcase },
  { key: "speed-hacks", label: "Speed Hacks", labelVi: "Mẹo tốc độ", icon: Zap },
];

// Target score filter
const TARGET_SCORE_FILTERS = [
  { key: "all", label: "All Targets", labelVi: "Tất cả" },
  { key: "450+", label: "Target 450+", labelVi: "Mục tiêu 450+" },
  { key: "600+", label: "Target 650+", labelVi: "Mục tiêu 650+" },
  { key: "750+", label: "Target 800+", labelVi: "Mục tiêu 800+" },
  { key: "900+", label: "Target 900+", labelVi: "Mục tiêu 900+" },
];

const LEVEL_LABELS: Record<string, { label: string; labelVi: string; color: string }> = {
  foundation: { label: "Foundation", labelVi: "Nền tảng", color: "bg-emerald-50 text-emerald-700 border-emerald-300" },
  intermediate: { label: "Intermediate", labelVi: "Trung cấp", color: "bg-amber-50 text-amber-700 border-amber-300" },
  advanced: { label: "Advanced", labelVi: "Nâng cao", color: "bg-rose-50 text-rose-700 border-rose-300" },
};

const SCORE_COLORS: Record<string, string> = {
  "450+": "bg-emerald-50 text-emerald-700 border-emerald-300",
  "600+": "bg-sky-50 text-sky-700 border-sky-300",
  "750+": "bg-amber-50 text-amber-700 border-amber-300",
  "900+": "bg-rose-50 text-rose-700 border-rose-300",
};

// Color-coded Part badges: listening (blue), reading (orange)
const getPartBadgeColor = (part: string) => {
  const num = parseInt(part.replace(/\D/g, ""), 10);
  if (num >= 1 && num <= 4) return "bg-sky-50 text-sky-700 border-sky-300";
  if (num >= 5 && num <= 7) return "bg-orange-50 text-orange-700 border-orange-300";
  return "bg-slate-50 text-slate-700 border-slate-300";
};

const ToeicLectures = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");
  const [activeTarget, setActiveTarget] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const { completedIds, bookmarkedIds, toggleBookmark } = useToeicLectureProgress();
  const [showBookmarked, setShowBookmarked] = useState(false);

  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);
  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);

  // Filtered and sorted lectures
  const filtered = useMemo(() => {
    let result = [...allToeicLectures];

    if (activeCategory !== "all") result = result.filter(l => l.category === activeCategory);
    if (activeLevel !== "all") result = result.filter(l => l.level === activeLevel);
    if (activeTarget !== "all") result = result.filter(l => l.targetScore === activeTarget);
    if (showBookmarked) result = result.filter(l => bookmarkedSet.has(l.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.titleVi.toLowerCase().includes(q) ||
        l.parts.some(p => p.toLowerCase().includes(q)) ||
        l.description.toLowerCase().includes(q)
      );
    }

    if (sortOrder === "newest") result = result.filter(l => l.isNew).concat(result.filter(l => !l.isNew));
    if (sortOrder === "easy-first") {
      const order: Record<string, number> = { foundation: 0, intermediate: 1, advanced: 2 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    if (sortOrder === "hard-first") {
      const order: Record<string, number> = { foundation: 2, intermediate: 1, advanced: 0 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    return result;
  }, [activeCategory, activeLevel, activeTarget, searchQuery, sortOrder, showBookmarked, bookmarkedSet]);

  const progress = allToeicLectures.length > 0 ? Math.round((completedSet.size / allToeicLectures.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-sky-50 relative overflow-hidden">
      {/* Ambient corporate background - soft floating orbs + blueprint grid */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-sky-200/40 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-1/3 -right-32 w-[520px] h-[520px] rounded-full bg-blue-200/40 blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-200/30 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "4s" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%231e3a8a' stroke-width='0.6'/%3E%3C/svg%3E\")" }} />
      </div>

      <SEO title="Bài Giảng TOEIC Masterclass Parts 1-7 | HaiEduTech" description="Khóa TOEIC Masterclass: Skills & Strategies cho toàn bộ Parts 1-7. Bài giảng chuyên sâu, mẹo làm bài, từ vựng theo chủ đề công việc." path="/toeic-lectures" />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 mb-2">
          <Link to="/english/toeic" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại TOEIC", "Back to TOEIC")}
          </Link>
        </div>
        {/* Hero Section - Bright Corporate Glass */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/80 via-white/60 to-blue-100/80 rounded-3xl mx-4 border-2 border-white/80 shadow-xl shadow-sky-200/50" />
          {/* Shimmer overlay */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 mx-4 rounded-3xl pointer-events-none"
          />
          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-lg shadow-sky-400/40">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <Badge className="bg-white text-sky-700 border-2 border-sky-200 text-sm px-3 py-1 shadow-sm">
                  TOEIC Masterclass
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight bg-gradient-to-r from-slate-900 via-sky-800 to-blue-700 bg-clip-text text-transparent">
                {t("TOEIC Lectures for Skills", "TOEIC Lectures for Skills")}
              </h1>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                {t(
                  "Chiến lược làm bài Part 1-7, mẹo tốc độ và từ vựng kinh doanh - tất cả trong một nơi.",
                  "Part 1-7 strategies, speed hacks, and business vocabulary - all in one place."
                )}
              </p>
              {/* Progress bar */}
              <div className="rounded-2xl p-4 border-2 border-sky-200 max-w-md bg-white/80 backdrop-blur-md shadow-lg shadow-sky-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-sky-700 font-semibold">{t("Tiến độ học", "Learning Progress")}</span>
                  <span className="text-slate-900 font-bold">{completedSet.size}/{allToeicLectures.length} {t("bài", "lessons")}</span>
                </div>
                <Progress value={progress} className="h-2.5 bg-sky-100" />
              </div>
            </motion.div>
          </div>
        </section>


        {/* === Roadmap 4 chặng - sắp xếp dễ → khó === */}
        <ToeicRoadmap completedSet={completedSet} />

        {/* Divider */}
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t("Hoặc tra cứu nhanh theo bộ lọc", "Or quick-filter all lectures")}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
          </div>
        </div>

        {/* Filters */}
        <section className="container mx-auto px-4 py-2">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORY_FILTERS.map(f => {
              const Icon = f.icon;
              const isActive = activeCategory === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveCategory(f.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                    isActive
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-lg shadow-sky-300/50 scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700 hover:shadow-md"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Level + Target Score + Bookmark row */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={t("Tìm theo Part, chủ đề...", "Search by Part, topic...")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-sky-200"
              />
            </div>

            <Select value={activeLevel} onValueChange={setActiveLevel}>
              <SelectTrigger className="w-[150px] bg-white border-2 border-slate-200 text-slate-700 hover:border-sky-300">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("Cấp độ", "Level")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả", "All Levels")}</SelectItem>
                <SelectItem value="foundation">{t("Nền tảng", "Foundation")}</SelectItem>
                <SelectItem value="intermediate">{t("Trung cấp", "Intermediate")}</SelectItem>
                <SelectItem value="advanced">{t("Nâng cao", "Advanced")}</SelectItem>
              </SelectContent>
            </Select>

            {/* Target Score Filter */}
            <Select value={activeTarget} onValueChange={setActiveTarget}>
              <SelectTrigger className="w-[160px] bg-white border-2 border-slate-200 text-slate-700 hover:border-sky-300">
                <Target className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("Mục tiêu", "Target")} />
              </SelectTrigger>
              <SelectContent>
                {TARGET_SCORE_FILTERS.map(f => (
                  <SelectItem key={f.key} value={f.key}>{t(f.labelVi, f.label)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] bg-white border-2 border-slate-200 text-slate-700 hover:border-sky-300">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("Sắp xếp", "Sort")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">{t("Mặc định", "Default")}</SelectItem>
                <SelectItem value="newest">{t("Mới nhất", "Newest")}</SelectItem>
                <SelectItem value="easy-first">{t("Dễ → Khó", "Easy → Hard")}</SelectItem>
                <SelectItem value="hard-first">{t("Khó → Dễ", "Hard → Easy")}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showBookmarked ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={showBookmarked ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600 shadow-md shadow-rose-200" : "border-2 border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:text-rose-600"}
            >
              <Heart className={`w-4 h-4 mr-1.5 ${showBookmarked ? "fill-white" : ""}`} />
              {t("Đã lưu", "Saved")} ({bookmarkedSet.size})
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-sky-600" />
              <span className="font-semibold text-slate-700">{filtered.length}</span> {t("bài giảng", "lectures")}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">{completedSet.size}</span> {t("đã hoàn thành", "completed")}
            </span>
          </div>
        </section>

        {/* Lecture Grid */}
        <section className="container mx-auto px-4 pb-12">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
              <p className="text-lg text-slate-500">{t("Không tìm thấy bài giảng phù hợp.", "No matching lectures found.")}</p>
              <Button variant="outline" size="sm" className="mt-4 border-2 border-slate-200 bg-white text-slate-600" onClick={() => { setActiveCategory("all"); setActiveLevel("all"); setActiveTarget("all"); setSearchQuery(""); setShowBookmarked(false); }}>
                {t("Xóa bộ lọc", "Clear Filters")}
              </Button>
            </motion.div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((lecture, i) => (
                  <LectureCard
                    key={lecture.id}
                    lecture={lecture}
                    index={i}
                    isBookmarked={bookmarkedSet.has(lecture.id)}
                    isCompleted={completedSet.has(lecture.id)}
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

// Individual lecture card component - Glassmorphism style
interface LectureCardProps {
  lecture: ToeicLecture;
  index: number;
  isBookmarked: boolean;
  isCompleted: boolean;
  onToggleBookmark: () => void;
  t: (vi: string, en: string) => string;
}

const LectureCard = ({ lecture, index, isBookmarked, isCompleted, onToggleBookmark, t }: LectureCardProps) => {
  const levelInfo = LEVEL_LABELS[lecture.level];
  const scoreColor = SCORE_COLORS[lecture.targetScore] || "bg-blue-500/20 text-blue-300 border-blue-500/30";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/toeic-lectures/${lecture.id}`} className="group block h-full">
        <div className="relative h-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-5 transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-200/60">
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Shine overlay on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-sky-100/60 to-transparent skew-x-12" />

          {/* Part number - large & prominent */}
          <div className="relative flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{lecture.icon}</span>
              {lecture.parts.map(p => (
                <Badge key={p} variant="outline" className={`text-xs font-bold ${getPartBadgeColor(p)}`}>
                  {p}
                </Badge>
              ))}
              {lecture.isNew && (
                <Badge className="bg-red-50 text-red-700 border border-red-300 text-xs animate-pulse">
                  <Flame className="w-3 h-3 mr-1" /> HOT
                </Badge>
              )}
            </div>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(); }}
              className="p-1.5 rounded-full hover:bg-rose-50 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-rose-500 text-rose-500" : "text-slate-300"}`} />
            </button>
          </div>

          {/* Title */}
          <h3 className="relative text-lg font-semibold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors leading-tight" style={{ fontSize: "20px", lineHeight: "1.8" }}>
            {t(lecture.titleVi, lecture.title)}
          </h3>

          {/* Description */}
          <p className="relative text-sm text-slate-600 mb-4 line-clamp-2" style={{ lineHeight: "1.8" }}>
            {t(lecture.descriptionVi, lecture.description)}
          </p>

          {/* Bottom metadata */}
          <div className="relative flex items-center gap-2 flex-wrap mt-auto">
            <Badge variant="outline" className={`text-xs ${levelInfo.color}`}>
              {t(levelInfo.labelVi, levelInfo.label)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${scoreColor}`}>
              <Target className="w-3 h-3 mr-1" />
              {lecture.targetScore}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {lecture.duration}
            </div>
          </div>

          {/* Completed indicator */}
          {isCompleted && (
            <div className="absolute top-3 right-12 bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full border border-emerald-300 font-semibold">
              ✓ {t("Đã học", "Done")}
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 text-sky-600" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};


export default ToeicLectures;
