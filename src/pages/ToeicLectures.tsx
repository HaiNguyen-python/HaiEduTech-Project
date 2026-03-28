// TOEIC Lectures Dashboard — Professional Business English Training Hub
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Filter, ArrowUpDown, Heart, Clock, Target,
  Headphones, FileText, BookType, Briefcase, Zap, Flame, ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToeicLectureProgress } from "@/hooks/useToeicLectureProgress";
import { allToeicLectures, type ToeicLecture } from "@/data/toeicLecturesData";

// Category filter configuration
const CATEGORY_FILTERS = [
  { key: "all", label: "All", labelVi: "Tất cả", icon: BookOpen },
  { key: "listening", label: "Listening (P1-4)", labelVi: "Nghe (P1-4)", icon: Headphones },
  { key: "reading", label: "Reading (P5-7)", labelVi: "Đọc (P5-7)", icon: FileText },
  { key: "grammar", label: "Grammar", labelVi: "Ngữ pháp", icon: BookType },
  { key: "business-vocab", label: "Business Vocab", labelVi: "Từ vựng KD", icon: Briefcase },
  { key: "speed-hacks", label: "Speed Hacks", labelVi: "Mẹo tốc độ", icon: Zap },
];

const LEVEL_LABELS: Record<string, { label: string; labelVi: string; color: string }> = {
  foundation: { label: "Foundation", labelVi: "Nền tảng", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  intermediate: { label: "Intermediate", labelVi: "Trung cấp", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  advanced: { label: "Advanced", labelVi: "Nâng cao", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
};

const SCORE_COLORS: Record<string, string> = {
  "450+": "bg-emerald-500/20 text-emerald-300",
  "600+": "bg-blue-500/20 text-blue-300",
  "750+": "bg-amber-500/20 text-amber-300",
  "900+": "bg-rose-500/20 text-rose-300",
};

const ToeicLectures = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const { completedIds, bookmarkedIds, toggleBookmark, markCompleted } = useToeicLectureProgress();
  const [showBookmarked, setShowBookmarked] = useState(false);

  const bookmarkedSet = useMemo(() => new Set(bookmarkedIds), [bookmarkedIds]);
  const completedSet = useMemo(() => new Set(completedIds), [completedIds]);

  // Filtered and sorted lectures
  const filtered = useMemo(() => {
    let result = [...allToeicLectures];

    if (activeCategory !== "all") result = result.filter(l => l.category === activeCategory);
    if (activeLevel !== "all") result = result.filter(l => l.level === activeLevel);
    if (showBookmarked) result = result.filter(l => bookmarkedIds.has(l.id));
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
      const order = { foundation: 0, intermediate: 1, advanced: 2 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    if (sortOrder === "hard-first") {
      const order = { foundation: 2, intermediate: 1, advanced: 0 };
      result.sort((a, b) => order[a.level] - order[b.level]);
    }
    return result;
  }, [activeCategory, activeLevel, searchQuery, sortOrder, showBookmarked, bookmarkedIds]);

  const progress = allToeicLectures.length > 0 ? Math.round((completedIds.size / allToeicLectures.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-900/60 to-indigo-950/80" />
          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <Briefcase className="w-7 h-7 text-blue-400" />
                </div>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-sm px-3 py-1">
                  TOEIC Masterclass
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">
                {t("TOEIC Lectures for Skills", "TOEIC Lectures for Skills")}
              </h1>
              <p className="text-lg text-blue-200/80 mb-6 leading-relaxed" style={{ fontSize: "20px", lineHeight: "1.8" }}>
                {t(
                  "Chiến lược làm bài Part 1-7, mẹo tốc độ và từ vựng kinh doanh — tất cả trong một nơi.",
                  "Part 1-7 strategies, speed hacks, and business vocabulary — all in one place."
                )}
              </p>
              {/* Progress bar */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 max-w-md">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-300">{t("Tiến độ học", "Learning Progress")}</span>
                  <span className="text-white font-semibold">{completedIds.size}/{allToeicLectures.length} {t("bài", "lessons")}</span>
                </div>
                <Progress value={progress} className="h-2.5 bg-white/10" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 py-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORY_FILTERS.map(f => {
              const Icon = f.icon;
              const isActive = activeCategory === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveCategory(f.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    isActive
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/10"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t(f.labelVi, f.label)}
                </button>
              );
            })}
          </div>

          {/* Search + Sort + Level + Bookmark row */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("Tìm theo Part, chủ đề...", "Search by Part, topic...")}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-foreground"
              />
            </div>

            <Select value={activeLevel} onValueChange={setActiveLevel}>
              <SelectTrigger className="w-[150px] bg-white/5 border-white/10">
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

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/10">
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
              className={showBookmarked ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "border-white/10 text-muted-foreground"}
            >
              <Heart className={`w-4 h-4 mr-1.5 ${showBookmarked ? "fill-rose-400" : ""}`} />
              {t("Đã lưu", "Saved")} ({bookmarkedIds.size})
            </Button>
          </div>
        </section>

        {/* Lecture Grid */}
        <section className="container mx-auto px-4 pb-12">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">{t("Không tìm thấy bài giảng phù hợp.", "No matching lectures found.")}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => { setActiveCategory("all"); setActiveLevel("all"); setSearchQuery(""); setShowBookmarked(false); }}>
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
                    isBookmarked={bookmarkedIds.has(lecture.id)}
                    isCompleted={completedIds.has(lecture.id)}
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

// Individual lecture card component
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
  const scoreColor = SCORE_COLORS[lecture.targetScore] || "bg-blue-500/20 text-blue-300";
  const categoryFilter = CATEGORY_FILTERS.find(f => f.key === lecture.category);
  const CategoryIcon = categoryFilter?.icon || BookOpen;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/toeic-lectures/${lecture.id}`}
        className="group block h-full"
      >
        <div className="relative h-full rounded-2xl border border-blue-500/15 bg-gradient-to-br from-slate-900/80 to-blue-950/40 p-5 transition-all hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
          {/* Top row: badges + bookmark */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{lecture.icon}</span>
              {lecture.parts.map(p => (
                <Badge key={p} variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/20">
                  {p}
                </Badge>
              ))}
              {lecture.isNew && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs animate-pulse">
                  <Flame className="w-3 h-3 mr-1" /> HOT
                </Badge>
              )}
            </div>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); onToggleBookmark(); }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-rose-400 text-rose-400" : "text-muted-foreground"}`} />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors leading-tight" style={{ fontSize: "20px", lineHeight: "1.8" }}>
            {t(lecture.titleVi, lecture.title)}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2" style={{ lineHeight: "1.8" }}>
            {t(lecture.descriptionVi, lecture.description)}
          </p>

          {/* Bottom metadata */}
          <div className="flex items-center gap-2 flex-wrap mt-auto">
            <Badge variant="outline" className={`text-xs ${levelInfo.color}`}>
              {t(levelInfo.labelVi, levelInfo.label)}
            </Badge>
            <Badge className={`text-xs ${scoreColor}`}>
              <Target className="w-3 h-3 mr-1" />
              {lecture.targetScore}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {lecture.duration}
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
            <ChevronRight className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToeicLectures;
