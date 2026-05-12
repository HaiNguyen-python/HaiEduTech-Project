// IELTS Lectures Dashboard - Advanced filtering, search, sort, bookmarks, and responsive grid
import { useState, useMemo, useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIeltsLectureProgress } from "@/hooks/useIeltsLectureProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  BookOpen,
  Headphones,
  Pen,
  Eye,
  Mic,
  Search,
  Heart,
  Flame,
  Sparkles,
  BookMarked,
  SlidersHorizontal,
  X,
  GraduationCap,
  Wrench,
  Lightbulb,
  BookOpenText,
} from "lucide-react";
import { allIeltsLectures, PILLAR_META, PillarKey } from "@/data/ieltsLecturesData";

// Storage is now handled by useIeltsLectureProgress hook (database + localStorage fallback)

// Skill filter categories with icons (Listening, Reading, Writing & Speaking moved into Lectures CTA cards above)
const SKILL_FILTERS = [
  { key: "all", label: "All", labelVi: "Tất cả", icon: BookOpen },
  { key: "grammar", label: "Grammar", labelVi: "Ngữ pháp", icon: Wrench },
  { key: "vocabulary", label: "Vocabulary", labelVi: "Từ vựng", icon: BookOpenText },
  { key: "tips", label: "Exam Tips", labelVi: "Mẹo thi", icon: Lightbulb },
] as const;

// Lectures shown in main grid exclude the four skill-based groups (Reading/Listening/Writing/Speaking
// each live in their own CTA card above to keep the grid focused on Grammar/Vocab/Tips).
const SKILL_CARD_KEYS = new Set(["listening", "reading", "writing", "speaking"]);
const gridLectures = allIeltsLectures.filter(l => !l.skill || !SKILL_CARD_KEYS.has(l.skill));
const readingLectureCount = allIeltsLectures.filter(l => l.skill === "reading").length;
const listeningLectureCount = allIeltsLectures.filter(l => l.skill === "listening").length;
const writingLectureCount = allIeltsLectures.filter(l => l.skill === "writing").length;
const speakingLectureCount = allIeltsLectures.filter(l => l.skill === "speaking").length;

type SkillFilterKey = typeof SKILL_FILTERS[number]["key"];
type SortKey = "newest" | "popular" | "easy" | "hard";
type LevelFilter = "all" | "foundation" | "intermediate" | "advanced";

// Map difficulty levels for sorting
const LEVEL_ORDER = { foundation: 1, intermediate: 2, advanced: 3 };

const LEVEL_STYLE: Record<string, string> = {
  foundation: "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/20",
  intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20",
};

const LEVEL_LABELS: Record<string, { en: string; vi: string }> = {
  foundation: { en: "Band 5.0–6.0", vi: "Band 5.0–6.0" },
  intermediate: { en: "Band 6.0–7.0", vi: "Band 6.0–7.0" },
  advanced: { en: "Band 7.0+", vi: "Band 7.0+" },
};

// Determine which filter category a lecture belongs to
const getLectureFilterCategory = (lecture: typeof allIeltsLectures[0]): string => {
  if (lecture.skill) return lecture.skill;
  if (lecture.pillar === "applied-grammar") return "grammar";
  if (lecture.pillar === "thematic-vocab") return "vocabulary";
  if (lecture.pillar === "tips-hacks") return "tips";
  return "all";
};

// Check if lecture is "new" (simulated: last 3 lectures added)
const NEW_LECTURE_IDS = new Set(
  allIeltsLectures.slice(-6).map(l => l.id)
);

const IeltsLectures = () => {
  const { t } = useLanguage();
  const { completedIds, bookmarkedIds, toggleBookmark } = useIeltsLectureProgress();
  const [activeSkill, setActiveSkill] = useState<SkillFilterKey>("all");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const handleBookmark = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(id);
  }, [toggleBookmark]);

  const filtered = useMemo(() => {
    let results = [...gridLectures];

    // Bookmarks filter
    if (showBookmarksOnly) {
      results = results.filter(l => bookmarkedIds.includes(l.id));
    }

    // Skill/category filter
    if (activeSkill !== "all") {
      results = results.filter(l => getLectureFilterCategory(l) === activeSkill);
    }

    // Level filter
    if (levelFilter !== "all") {
      results = results.filter(l => l.level === levelFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.titleVi.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.descriptionVi.toLowerCase().includes(q) ||
        (l.skill && l.skill.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "popular":
        results.sort((a, b) => b.quiz.length - a.quiz.length);
        break;
      case "easy":
        results.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
        break;
      case "hard":
        results.sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);
        break;
      case "newest":
      default:
        // Keep original order (newest last becomes first via reverse)
        results.reverse();
        break;
    }

    return results;
  }, [activeSkill, levelFilter, searchQuery, sortBy, showBookmarksOnly, bookmarkedIds]);

  const totalCompleted = completedIds.length;
  const totalLectures = gridLectures.length;
  const progressPercent = totalLectures > 0 ? Math.round((totalCompleted / totalLectures) * 100) : 0;

  const activeFiltersCount = [
    activeSkill !== "all" ? 1 : 0,
    levelFilter !== "all" ? 1 : 0,
    searchQuery.trim() ? 1 : 0,
    showBookmarksOnly ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const clearAllFilters = () => {
    setActiveSkill("all");
    setLevelFilter("all");
    setSearchQuery("");
    setShowBookmarksOnly(false);
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="Bài Giảng IELTS Skills: Listening, Reading, Writing, Speaking | HaiEduTech" description="95+ bài giảng IELTS chuyên sâu theo 4 trụ cột: Skill-Based, Tips & Hacks, Thematic Vocab, Test Prep. Mẹo vàng của Thầy Hải, Band 5.0 đến 7.0+." path="/ielts-lectures" />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-background to-accent/8 pt-8 pb-10">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                📚 {t("Bài giảng IELTS", "IELTS Lectures for Skills")}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {t(
                  "Hệ thống bài giảng chuyên sâu với chiến lược từng bước, ví dụ thực tế và mẹo vàng từ Thầy Hải.",
                  "Comprehensive lecture system with step-by-step strategies, real examples, and Teacher Hai's golden secrets."
                )}
              </p>

              {/* Progress Tracker */}
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    {t("Tiến độ học tập", "Learning Progress")}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {totalCompleted}/{totalLectures} ({progressPercent}%)
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Practice Modules CTA: Reading & Listening lessons */}
        <section className="container mx-auto px-4 sm:px-6 -mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/english/learn/ielts-reading" className="group">
              <Card className="h-full border-l-4 border-l-blue-500 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {t("Luyện Đọc IELTS", "IELTS Reading Practice")}
                      </h3>
                      <Badge variant="secondary" className="text-[10px]">{t("Bài giảng + Bài tập", "Lectures + Practice")}</Badge>
                      <Badge className="text-[10px] bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30" variant="outline">
                        {readingLectureCount} {t("bài giảng", "lectures")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(
                        "Bộ bài tập Reading với passage dài chuẩn IELTS Academic: T/F/NG, MCQ, fill-in-blank.",
                        "Long-passage Reading exercises (IELTS Academic standard): T/F/NG, MCQ, fill-in-blank."
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link to="/english/learn/ielts-listening" className="group">
              <Card className="h-full border-l-4 border-l-emerald-500 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {t("Luyện Nghe IELTS", "IELTS Listening Practice")}
                      </h3>
                      <Badge variant="secondary" className="text-[10px]">{t("Bài giảng + Bài tập", "Lectures + Practice")}</Badge>
                      <Badge className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" variant="outline">
                        {listeningLectureCount} {t("bài giảng", "lectures")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(
                        "Bài tập Listening Section 1–4: dictation, MCQ, điền từ — mô phỏng đề thi thật.",
                        "Listening Sections 1–4: dictation, MCQ, fill-in — real exam simulation."
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 sm:px-6 py-5">
          {/* Skill Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SKILL_FILTERS.map(({ key, label, labelVi, icon: Icon }) => {
              const count = key === "all"
                ? gridLectures.length
                : gridLectures.filter(l => getLectureFilterCategory(l) === key).length;
              return (
                <Button
                  key={key}
                  variant={activeSkill === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSkill(key)}
                  className="rounded-full gap-1.5 text-xs sm:text-sm"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t(labelVi, label)}
                  <span className="text-[10px] opacity-70">({count})</span>
                </Button>
              );
            })}
          </div>

          {/* Search, Sort, Level Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("Tìm kiếm bài giảng...", "Search lectures...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-8 h-9 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Level Filter */}
            <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as LevelFilter)}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder={t("Trình độ", "Level")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả trình độ", "All Levels")}</SelectItem>
                <SelectItem value="foundation">🟢 Band 5.0–6.0</SelectItem>
                <SelectItem value="intermediate">🟡 Band 6.0–7.0</SelectItem>
                <SelectItem value="advanced">🔴 Band 7.0+</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
              <SelectTrigger className="w-[155px] h-9 text-sm">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t("Mới nhất", "Newest")}</SelectItem>
                <SelectItem value="popular">{t("Phổ biến", "Most Popular")}</SelectItem>
                <SelectItem value="easy">{t("Dễ → Khó", "Easy → Hard")}</SelectItem>
                <SelectItem value="hard">{t("Khó → Dễ", "Hard → Easy")}</SelectItem>
              </SelectContent>
            </Select>

            {/* Bookmarks Toggle */}
            <Button
              variant={showBookmarksOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className="rounded-full gap-1.5 h-9 shrink-0"
            >
              <BookMarked className="w-3.5 h-3.5" />
              {t("Đã lưu", "Saved")}
              {bookmarkedIds.length > 0 && (
                <span className="text-[10px] opacity-70">({bookmarkedIds.length})</span>
              )}
            </Button>
          </div>

          {/* Active filters indicator */}
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center gap-2 mt-3"
            >
              <span className="text-xs text-muted-foreground">
                {filtered.length} {t("kết quả", "results")}
              </span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground">
                <X className="w-3 h-3 mr-1" /> {t("Xóa bộ lọc", "Clear filters")}
              </Button>
            </motion.div>
          )}
        </section>

        {/* Lecture Grid */}
        <section className="container mx-auto px-4 sm:px-6 pb-16">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`grid-${activeSkill}-${levelFilter}-${sortBy}-${searchQuery}-${showBookmarksOnly}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((lecture, idx) => {
                  const isCompleted = completedIds.includes(lecture.id);
                  const isBookmarked = bookmarkedIds.includes(lecture.id);
                  const isNew = NEW_LECTURE_IDS.has(lecture.id);
                  const pillarMeta = PILLAR_META[lecture.pillar];
                  const category = getLectureFilterCategory(lecture);
                  const skillFilter = SKILL_FILTERS.find(f => f.key === category);
                  const SkillIcon = skillFilter?.icon || BookOpen;

                  return (
                    <motion.div
                      key={lecture.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                    >
                      <Link to={`/ielts-lectures/${lecture.id}`}>
                        <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                          {/* Pillar color accent */}
                          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillarMeta.color}`} />

                          <CardContent className="p-5 pt-5">
                            {/* Top row: icon + badges */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{lecture.icon}</span>
                                {/* Hot / New badges */}
                                {isNew && (
                                  <Badge className="bg-red-500/90 text-white border-0 text-[10px] px-1.5 py-0 gap-0.5 font-bold">
                                    <Flame className="w-3 h-3" /> HOT
                                  </Badge>
                                )}
                                {isCompleted && (
                                  <Badge variant="secondary" className="bg-green-500/15 text-green-600 text-[10px] gap-0.5 px-1.5 py-0">
                                    <CheckCircle className="w-3 h-3" /> {t("Xong", "Done")}
                                  </Badge>
                                )}
                              </div>
                              {/* Bookmark button */}
                              <button
                                onClick={(e) => handleBookmark(e, lecture.id)}
                                className="p-1.5 rounded-full hover:bg-muted transition-colors"
                                aria-label="Bookmark"
                              >
                                <Heart
                                  className={`w-4 h-4 transition-colors ${
                                    isBookmarked
                                      ? "fill-red-500 text-red-500"
                                      : "text-muted-foreground hover:text-red-400"
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Title */}
                            <h3 className="text-[17px] font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                              {t(lecture.titleVi, lecture.title)}
                            </h3>

                            {/* Description */}
                            <p className="text-[13px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                              {t(lecture.descriptionVi, lecture.description)}
                            </p>

                            {/* Meta row */}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {lecture.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <SkillIcon className="w-3.5 h-3.5" />
                                {t(
                                  skillFilter?.labelVi || "",
                                  skillFilter?.label || ""
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> {lecture.quiz.length} quiz
                              </span>
                            </div>

                            {/* Bottom row: Level badge + Pillar tag */}
                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${LEVEL_STYLE[lecture.level]}`}>
                                {t(LEVEL_LABELS[lecture.level].vi, LEVEL_LABELS[lecture.level].en)}
                              </Badge>
                              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${pillarMeta.color} text-white`}>
                                {pillarMeta.icon} {t(pillarMeta.labelVi, pillarMeta.label)}
                              </span>
                            </div>

                            {/* Progress indicator for started lessons */}
                            {isCompleted && (
                              <div className="mt-3">
                                <Progress value={100} className="h-1.5" />
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-5">
                  <Search className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("Không tìm thấy bài giảng", "No lectures found")}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 max-w-md">
                  {t(
                    "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm bài giảng.",
                    "Try adjusting your filters or search terms to find more lectures."
                  )}
                </p>
                <Button variant="outline" onClick={clearAllFilters} className="gap-2">
                  <X className="w-4 h-4" /> {t("Xóa tất cả bộ lọc", "Clear all filters")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsLectures;
