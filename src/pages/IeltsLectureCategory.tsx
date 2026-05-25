// IELTS Lectures - Category page (Writing/Speaking/Grammar/Vocabulary/Tips)
// Dedicated route mirroring the Reading/Listening page format. Sorted easy → hard.
import { useMemo, useState, useCallback } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle, Clock, BookOpen, Pen, Mic, Search, Heart, Sparkles,
  ArrowLeft, Wrench, Lightbulb, BookOpenText, X, ChevronDown,
} from "lucide-react";
import { allIeltsLectures, PILLAR_META } from "@/data/ieltsLecturesData";

type CategoryKey = "writing" | "speaking" | "grammar" | "vocabulary" | "tips";

const VALID: CategoryKey[] = ["writing", "speaking", "grammar", "vocabulary", "tips"];

const LEVEL_ORDER: Record<string, number> = { foundation: 1, intermediate: 2, advanced: 3 };

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

const CATEGORY_META: Record<CategoryKey, {
  titleEn: string; titleVi: string;
  descEn: string; descVi: string;
  icon: typeof Pen;
  heroGradient: string;
  accent: string;
}> = {
  writing: {
    titleEn: "IELTS Writing Lectures", titleVi: "Bài giảng IELTS Writing",
    descEn: "Master Task 1 & Task 2 with structured frameworks, model phrases, and Teacher Hai's golden secrets.",
    descVi: "Chinh phục Task 1 & Task 2 với khung sườn rõ ràng, cụm mẫu và mẹo vàng của thầy Hải.",
    icon: Pen,
    heroGradient: "from-purple-500/15 via-background to-violet-500/10",
    accent: "text-purple-700 dark:text-purple-300",
  },
  speaking: {
    titleEn: "IELTS Speaking Lectures", titleVi: "Bài giảng IELTS Speaking",
    descEn: "From confident Part 1 answers to fluent Part 3 discussions - pronunciation, storytelling, and band-7+ frameworks.",
    descVi: "Từ Part 1 tự tin đến Part 3 trôi chảy - phát âm, kể chuyện và khung sườn band 7+.",
    icon: Mic,
    heroGradient: "from-rose-500/15 via-background to-pink-500/10",
    accent: "text-rose-700 dark:text-rose-300",
  },
  grammar: {
    titleEn: "IELTS Applied Grammar", titleVi: "Ngữ pháp IELTS Ứng dụng",
    descEn: "Complex grammatical structures that signal high band scores - inversion, conditionals, relative clauses, articles.",
    descVi: "Cấu trúc ngữ pháp phức tạp báo hiệu band cao - inversion, conditionals, relative clauses, articles.",
    icon: Wrench,
    heroGradient: "from-violet-500/15 via-background to-indigo-500/10",
    accent: "text-violet-700 dark:text-violet-300",
  },
  vocabulary: {
    titleEn: "IELTS Thematic Vocabulary", titleVi: "Từ vựng IELTS theo chủ đề",
    descEn: "Band 7.0+ vocabulary grouped by the most common IELTS topics, with collocations and ready-to-use templates.",
    descVi: "Từ vựng Band 7.0+ theo các chủ đề IELTS phổ biến, kèm collocations và mẫu câu sẵn dùng.",
    icon: BookOpenText,
    heroGradient: "from-teal-500/15 via-background to-emerald-500/10",
    accent: "text-teal-700 dark:text-teal-300",
  },
  tips: {
    titleEn: "IELTS Exam Tips & Hacks", titleVi: "Mẹo & Thủ thuật phòng thi IELTS",
    descEn: "Quick, actionable techniques for instant score improvement on test day - tested by Teacher Hai's top students.",
    descVi: "Kỹ thuật nhanh, thực tế để cải thiện điểm ngay trong phòng thi - được các học viên top của thầy Hải kiểm nghiệm.",
    icon: Lightbulb,
    heroGradient: "from-amber-500/15 via-background to-orange-500/10",
    accent: "text-amber-700 dark:text-amber-300",
  },
};

const getLectureCategory = (lecture: typeof allIeltsLectures[0]): string => {
  if (lecture.skill) return lecture.skill;
  if (lecture.pillar === "applied-grammar") return "grammar";
  if (lecture.pillar === "thematic-vocab") return "vocabulary";
  if (lecture.pillar === "tips-hacks") return "tips";
  return "";
};

const IeltsLectureCategory = () => {
  const { t } = useLanguage();
  const { category } = useParams<{ category: string }>();
  const { completedIds, bookmarkedIds, toggleBookmark } = useIeltsLectureProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | "foundation" | "intermediate" | "advanced">("all");
  const [sortBy, setSortBy] = useState<"easy" | "hard" | "newest">("easy");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({ task1: true, task2: true, part1: true, part2: true, part3: true, other: true });
  const toggleGroup = useCallback((key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  if (!category || !VALID.includes(category as CategoryKey)) {
    return <Navigate to="/ielts-lectures" replace />;
  }
  const catKey = category as CategoryKey;
  const meta = CATEGORY_META[catKey];
  const IconCmp = meta.icon;

  const handleBookmark = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(id);
  }, [toggleBookmark]);

  const allInCategory = useMemo(
    () => allIeltsLectures.filter(l => getLectureCategory(l) === catKey),
    [catKey]
  );

  const filtered = useMemo(() => {
    let results = [...allInCategory];
    if (levelFilter !== "all") {
      results = results.filter(l => l.level === levelFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.titleVi.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.descriptionVi.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case "easy":
        results.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
        break;
      case "hard":
        results.sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]);
        break;
      case "newest":
      default:
        results.reverse();
    }
    return results;
  }, [allInCategory, levelFilter, searchQuery, sortBy]);

  const totalCompleted = allInCategory.filter(l => completedIds.includes(l.id)).length;
  const totalLectures = allInCategory.length;
  const progressPercent = totalLectures > 0 ? Math.round((totalCompleted / totalLectures) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${meta.titleEn} | HaiEduTech`}
        description={meta.descEn}
        path={`/ielts-lectures/category/${catKey}`}
      />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className={`relative overflow-hidden bg-gradient-to-br ${meta.heroGradient} pt-8 pb-10`}>
          <div className="container mx-auto px-4 sm:px-6">
            <Link
              to="/ielts-lectures"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("Quay lại tất cả bài giảng", "Back to all lectures")}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-14 h-14 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm`}>
                  <IconCmp className={`w-7 h-7 ${meta.accent}`} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {t(meta.titleVi, meta.titleEn)}
                </h1>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {t(meta.descVi, meta.descEn)}
              </p>

              {/* Progress */}
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    {t("Tiến độ", "Progress")}
                  </span>
                  <span className={`text-sm font-bold ${meta.accent}`}>
                    {totalCompleted}/{totalLectures} ({progressPercent}%)
                  </span>
                </div>
                <Progress value={progressPercent} className="h-3" />
              </div>

            </motion.div>
          </div>
        </section>


        {/* Filters */}
        <section className="container mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
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
            <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as typeof levelFilter)}>
              <SelectTrigger className="w-[170px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("Tất cả trình độ", "All Levels")}</SelectItem>
                <SelectItem value="foundation">🟢 Band 5.0–6.0</SelectItem>
                <SelectItem value="intermediate">🟡 Band 6.0–7.0</SelectItem>
                <SelectItem value="advanced">🔴 Band 7.0+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-[170px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">{t("Dễ → Khó", "Easy → Hard")}</SelectItem>
                <SelectItem value="hard">{t("Khó → Dễ", "Hard → Easy")}</SelectItem>
                <SelectItem value="newest">{t("Mới nhất", "Newest")}</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground sm:ml-auto">
              {filtered.length} {t("bài giảng", "lectures")}
            </span>
          </div>
        </section>

        {/* Grid */}
        <section className="container mx-auto px-4 sm:px-6 pb-16">
          {(() => {
            const renderCard = (lecture: typeof filtered[0], idx: number, orderNumber: number | null) => {
              const isCompleted = completedIds.includes(lecture.id);
              const isBookmarked = bookmarkedIds.includes(lecture.id);
              const pillarMeta = PILLAR_META[lecture.pillar];
              return (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.4) }}
                >
                  <Link to={`/ielts-lectures/${lecture.id}`}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillarMeta.color}`} />
                      <CardContent className="p-5 pt-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {orderNumber !== null && (
                              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 ${meta.accent} text-xs font-bold`}>
                                {orderNumber}
                              </span>
                            )}
                            <span className="text-2xl">{lecture.icon}</span>
                            {isCompleted && (
                              <Badge variant="secondary" className="bg-green-500/15 text-green-600 text-[10px] gap-0.5 px-1.5 py-0">
                                <CheckCircle className="w-3 h-3" /> {t("Xong", "Done")}
                              </Badge>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleBookmark(e, lecture.id)}
                            className="p-1.5 rounded-full hover:bg-muted transition-colors"
                            aria-label="Bookmark"
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors ${
                                isBookmarked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-400"
                              }`}
                            />
                          </button>
                        </div>

                        <h3 className="text-[17px] font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {t(lecture.titleVi, lecture.title)}
                        </h3>
                        <p className="text-[13px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                          {t(lecture.descriptionVi, lecture.description)}
                        </p>

                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {lecture.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" /> {lecture.quiz.length} quiz
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${LEVEL_STYLE[lecture.level]}`}>
                            {t(LEVEL_LABELS[lecture.level].vi, LEVEL_LABELS[lecture.level].en)}
                          </Badge>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r ${pillarMeta.color} text-white`}>
                            {pillarMeta.icon} {t(pillarMeta.labelVi, pillarMeta.label)}
                          </span>
                        </div>

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
            };

            const renderGroup = (
              groupKey: string,
              titleVi: string,
              titleEn: string,
              icon: string,
              items: typeof filtered,
            ) => {
              const isOpen = openGroups[groupKey] !== false;
              return (
                <div key={groupKey} className="mb-6 last:mb-0">
                  <button
                    type="button"
                    onClick={() => toggleGroup(groupKey)}
                    className="w-full flex items-center gap-2 mb-4 p-3 rounded-xl bg-card hover:bg-muted/60 border border-border transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-2xl">{icon}</span>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground text-left">
                      {t(titleVi, titleEn)}
                    </h2>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {items.length} {t("bài", "lectures")}
                    </Badge>
                    <ChevronDown
                      className={`ml-auto w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`${groupKey}-content`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-1 pb-2">
                          {items.map((lec, i) => renderCard(lec, i, sortBy === "easy" ? i + 1 : null))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            };

            if (filtered.length === 0) {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-5">
                    <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t("Không tìm thấy bài giảng", "No lectures found")}
                  </h3>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setLevelFilter("all"); }} className="gap-2">
                    <X className="w-4 h-4" /> {t("Xóa bộ lọc", "Clear filters")}
                  </Button>
                </motion.div>
              );
            }

            if (catKey === "writing") {
              const task1 = filtered.filter(l => l.id.includes("task1") || /task\s*1/i.test(l.title));
              const others = filtered.filter(l => !task1.includes(l));
              return (
                <motion.div
                  key={`writing-grouped-${levelFilter}-${sortBy}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {task1.length > 0 && renderGroup("task1", "Writing Task 1", "Writing Task 1", "📊", task1)}
                  {others.length > 0 && renderGroup("task2", "Writing Task 2", "Writing Task 2", "✍️", others)}

                  {/* Sample Essays 8.0+ — styled to match group headers */}
                  <Link
                    to="/ielts-sample-essays"
                    className="group mb-6 flex items-center gap-3 w-full p-3 rounded-xl border-2 border-purple-500/40 bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-pink-500/10 hover:border-purple-500/70 hover:shadow-lg transition-all"
                  >
                    <span className="text-2xl">📚</span>
                    <div className="flex-1 text-left">
                      <div className="text-lg sm:text-xl font-bold text-foreground">
                        {t("Bài mẫu 8.0+ (Sample Essays)", "Sample Essays 8.0+")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t("Bộ sưu tập bài mẫu Band 8.0+ Task 1 & Task 2, kèm phân tích chi tiết của Thầy Hải.",
                           "Curated Band 8.0+ Task 1 & Task 2 model essays with Teacher Hai's deep analysis.")}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-purple-500/15 text-purple-700 dark:text-purple-300">
                      Band 8.0+
                    </Badge>
                    <ChevronDown className="w-5 h-5 -rotate-90 text-purple-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            }



            if (catKey === "speaking") {
              const matchPart = (l: typeof filtered[0], n: 1 | 2 | 3) => {
                const id = l.id.toLowerCase();
                const title = l.title.toLowerCase();
                if (id.includes(`part${n}`) || new RegExp(`part\\s*${n}`, "i").test(title)) return true;
                if (n === 2 && (id.includes("cue-card") || /cue\s*card/i.test(title))) return true;
                return false;
              };
              const part1 = filtered.filter(l => matchPart(l, 1));
              const part2 = filtered.filter(l => matchPart(l, 2));
              const part3 = filtered.filter(l => matchPart(l, 3));
              const other = filtered.filter(l => !part1.includes(l) && !part2.includes(l) && !part3.includes(l));
              return (
                <motion.div
                  key={`speaking-grouped-${levelFilter}-${sortBy}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {part1.length > 0 && renderGroup("part1", "Speaking Part 1", "Speaking Part 1", "🗣️", part1)}
                  {part2.length > 0 && renderGroup("part2", "Speaking Part 2 (Cue Card)", "Speaking Part 2 (Cue Card)", "🎴", part2)}
                  {part3.length > 0 && renderGroup("part3", "Speaking Part 3", "Speaking Part 3", "💭", part3)}
                  {other.length > 0 && renderGroup("other", "Kỹ năng chung", "General Skills", "🎯", other)}
                </motion.div>
              );
            }

            return (
              <motion.div
                key={`grid-${levelFilter}-${sortBy}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((lec, i) => renderCard(lec, i, sortBy === "easy" ? i + 1 : null))}
              </motion.div>
            );
          })()}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsLectureCategory;
