import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { allGrammarModules } from "@/data/languageCurriculum";
import { BookOpen, Filter, Search, Target, Layers3, ArrowLeft, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import FloatingEnglishParticles from "@/components/FloatingEnglishParticles";
import EnglishHeroBanner from "@/components/EnglishHeroBanner";
import { getGrammarModuleVisual } from "@/lib/grammarModuleVisuals";

const EnglishGrammar = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLevel, setActiveLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [openLevels, setOpenLevels] = useState<Record<"beginner" | "intermediate" | "advanced", boolean>>({
    beginner: true,
    intermediate: false,
    advanced: false,
  });

  const toggleLevel = (levelKey: "beginner" | "intermediate" | "advanced") =>
    setOpenLevels((prev) => ({ ...prev, [levelKey]: !prev[levelKey] }));

  const levelMeta = {
    beginner: {
      label: t("Cơ bản", "Beginner"),
      description: t("Xây nền tảng: thì, mạo từ, cấu trúc cơ bản.", "Build the foundation: tenses, articles, and core sentence structures."),
    },
    intermediate: {
      label: t("Trung cấp", "Intermediate"),
      description: t("Mở rộng mẫu câu: điều kiện, câu bị động, mệnh đề quan hệ.", "Expand sentence patterns: conditionals, passive voice, and relative clauses."),
    },
    advanced: {
      label: t("Nâng cao", "Advanced"),
      description: t("Kiểm soát độ chính xác và sắc thái học thuật.", "Sharpen precision, complexity, and academic control."),
    },
  } as const;

  /** Curriculum-based placement: a module sits where it belongs in the learning path. */
  const moduleLevelMap: Record<string, keyof typeof levelMeta> = {
    "grammar-questions-tags": "beginner",
    "grammar-tenses": "beginner",
    "grammar-articles-prepositions": "beginner",
    "grammar-modals": "beginner",
    "grammar-comparisons": "beginner",
    "grammar-sentence-patterns": "beginner",
    "grammar-punctuation-boundaries": "beginner",
    "grammar-prepositions-patterns": "beginner",
  };

  const getModuleLevel = (module: typeof allGrammarModules[number]): keyof typeof levelMeta => {
    const mapped = moduleLevelMap[module.id];
    if (mapped) return mapped;

    const scoreMap = { beginner: 1, intermediate: 2, advanced: 3 } as const;
    const avg = module.lessons.reduce((sum, lesson) => sum + scoreMap[lesson.difficulty], 0) / module.lessons.length;

    if (avg <= 1.4) return "beginner";
    if (avg >= 2.4) return "advanced";
    return "intermediate";
  };

  const getModuleTrack = (moduleId: string) => {
    if (["grammar-tenses", "grammar-articles-prepositions", "grammar-articles-advanced", "grammar-sv-agreement-advanced"].includes(moduleId)) {
      return t("Nền tảng cốt lõi", "Core Foundation");
    }

    if (["grammar-conditionals", "grammar-modal-verbs", "grammar-passive", "grammar-reported-speech", "grammar-relative-clauses", "grammar-gerunds-infinitives"].includes(moduleId)) {
      return t("Mẫu câu trọng tâm", "High-Value Patterns");
    }

    return t("Độ chính xác nâng cao", "Advanced Accuracy");
  };

  const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 } as const;
  const sortLessons = (module: typeof allGrammarModules[number]) =>
    [...module.lessons].sort((a, b) => {
      const diff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      return diff !== 0 ? diff : a.level - b.level;
    });

  const sortModules = (modules: typeof allGrammarModules) =>
    [...modules].sort((a, b) => {
      const diff = difficultyOrder[getModuleLevel(a)] - difficultyOrder[getModuleLevel(b)];
      return diff !== 0 ? diff : a.titleEn.localeCompare(b.titleEn);
    });

  const groupedModules = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = allGrammarModules.filter((module) => {
      const moduleLevel = getModuleLevel(module);
      const haystack = [
        module.title,
        module.titleEn,
        module.description,
        module.descriptionEn,
        ...module.lessons.flatMap((lesson) => [lesson.title, lesson.titleEn]),
      ]
        .join(" ")
        .toLowerCase();

      const matchesLevel = activeLevel === "all" || moduleLevel === activeLevel;
      const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);

      return matchesLevel && matchesSearch;
    });

    return {
      beginner: sortModules(filtered.filter((module) => getModuleLevel(module) === "beginner")),
      intermediate: sortModules(filtered.filter((module) => getModuleLevel(module) === "intermediate")),
      advanced: sortModules(filtered.filter((module) => getModuleLevel(module) === "advanced")),
      total: filtered.length,
    };
  }, [activeLevel, searchTerm]);

  // Searching or filtering should reveal every group that still has results.
  useEffect(() => {
    const isFiltering = searchTerm.trim().length > 0 || activeLevel !== "all";
    if (!isFiltering) return;
    setOpenLevels({
      beginner: groupedModules.beginner.length > 0,
      intermediate: groupedModules.intermediate.length > 0,
      advanced: groupedModules.advanced.length > 0,
    });
  }, [searchTerm, activeLevel, groupedModules]);

  const totalLessons = allGrammarModules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const levelFilters: Array<{ key: "all" | keyof typeof levelMeta; label: string }> = [
    { key: "all", label: t("Tất cả", "All") },
    { key: "beginner", label: levelMeta.beginner.label },
    { key: "intermediate", label: levelMeta.intermediate.label },
    { key: "advanced", label: levelMeta.advanced.label },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Ngữ Pháp Tiếng Anh Toàn Diện - 30 Bài Học | HaiEduTech" description="9 module ngữ pháp tiếng Anh từ cơ bản đến nâng cao với 30 bài học: Tenses, Conditionals, Modal Verbs, Reported Speech, Passive Voice. Luyện tập tương tác." path="/english/grammar" />
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl relative z-10">
        <Link to="/english" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          {t("Quay lại Tiếng Anh", "Back to English")}
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 relative overflow-hidden rounded-3xl py-10 min-h-[240px]">
          <EnglishHeroBanner heightClass="h-full" opacity={28} />
          <FloatingEnglishParticles count={5} />
          <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            📖 {t("Ngữ pháp tiếng Anh", "English Grammar")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Kho ngữ pháp được sắp xếp theo lộ trình từ cơ bản đến nâng cao, giúp học sinh dễ chọn đúng chuyên đề cần học, ôn tập và luyện bài tập.",
              "A structured grammar library from basic to advanced, helping students quickly find the right topic to learn, review, and practice."
            )}
          </p>
          </div>
        </motion.div>


        <section className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Layers3 className="w-4 h-4 text-primary" />
              {t("Tổng quan chương trình", "Program overview")}
            </div>
            <p className="text-3xl font-bold">{allGrammarModules.length}</p>
            <p className="text-sm text-muted-foreground">{t("module ngữ pháp đã được phân nhóm rõ ràng", "grammar modules grouped into clear learning paths")}</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              {t("Khối lượng học tập", "Lesson volume")}
            </div>
            <p className="text-3xl font-bold">{totalLessons}</p>
            <p className="text-sm text-muted-foreground">{t("bài học có lý thuyết, bài tập tương tác và quiz", "lessons with theory, interactive practice, and quizzes")}</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Target className="w-4 h-4 text-primary" />
              {t("Cách học gợi ý", "Suggested approach")}
            </div>
            <p className="font-semibold mb-1">{t("Học theo nền tảng → mẫu câu → nâng cao", "Study foundation → patterns → advanced control")}</p>
            <p className="text-sm text-muted-foreground">{t("Giúp học sinh không bị học rời rạc và dễ ôn tập theo mục tiêu.", "This keeps grammar practice focused and easy to review by goal.")}</p>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-5 md:p-6 mb-8 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">{t("Tìm nhanh chuyên đề ngữ pháp", "Find the right grammar topic fast")}</h2>
              <p className="text-sm text-muted-foreground">{t("Lọc theo trình độ hoặc gõ tên bài học/chuyên đề để tìm nhanh hơn.", "Filter by level or search by lesson/topic name for faster navigation.")}</p>
            </div>
            <div className="relative w-full lg:max-w-sm">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("Ví dụ: tenses, passive, articles...", "Try: tenses, passive, articles...")}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {levelFilters.map((filter) => (
              <Button
                key={filter.key}
                type="button"
                variant={activeLevel === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLevel(filter.key)}
                className="gap-2"
              >
                <Filter className="w-3.5 h-3.5" />
                {filter.label}
              </Button>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          {(["beginner", "intermediate", "advanced"] as const).map((levelKey) => {
            const modules = groupedModules[levelKey];
            if (!modules.length) return null;

            const isOpen = openLevels[levelKey];

            return (
              <div key={levelKey} className="space-y-4">
                <button
                  type="button"
                  onClick={() => toggleLevel(levelKey)}
                  aria-expanded={isOpen}
                  aria-controls={`grammar-level-${levelKey}`}
                  className="w-full flex items-center justify-between gap-4 rounded-2xl border bg-card px-5 py-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="text-2xl font-bold">{levelMeta[levelKey].label}</h2>
                      <Badge variant="secondary">{modules.length} {t("chuyên đề", "topics")}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{levelMeta[levelKey].description}</p>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>

                <div
                  id={`grammar-level-${levelKey}`}
                  hidden={!isOpen}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {modules.map((mod, i) => (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/english/learn/${mod.id}`}
                        className="group block rounded-xl border bg-card hover:shadow-lg transition-shadow h-full overflow-hidden"
                      >
                        {(() => {
                          const visual = getGrammarModuleVisual(mod.id, mod.title, mod.titleEn);
                          return (
                            <div className="relative h-36 overflow-hidden bg-muted">
                              <img
                                src={visual.src}
                                alt={t(visual.altVi, visual.altEn)}
                                loading="lazy"
                                width={1152}
                                height={576}
                                className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/25 to-transparent" />
                              <div className={cn("absolute bottom-3 left-4 w-11 h-11 rounded-lg bg-gradient-to-br bg-card/90 backdrop-blur flex items-center justify-center text-2xl shadow-sm", mod.color)}>
                                {mod.icon}
                              </div>
                              <Badge variant="outline" className="absolute top-3 right-3 text-xs whitespace-nowrap bg-card/90 backdrop-blur">
                                {getModuleTrack(mod.id)}
                              </Badge>
                            </div>
                          );
                        })()}

                        <div className="p-6 pt-4">
                        <h3 className="font-bold text-lg mb-1">{t(mod.title, mod.titleEn)}</h3>

                        <p className="text-sm text-muted-foreground mb-4 min-h-[3.5rem]">
                          {t(mod.description, mod.descriptionEn)}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">{levelMeta[getModuleLevel(mod)].label}</Badge>
                          <Badge variant="secondary">{mod.lessons.length} {t("bài học", "lessons")}</Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            {t("Bài học tiêu biểu", "Featured lessons")}
                          </p>
                          <ul className="space-y-1.5 text-sm text-muted-foreground">
                            {sortLessons(mod).slice(0, 3).map((lesson) => (
                              <li key={lesson.id} className="flex items-start gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{t(lesson.title, lesson.titleEn)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {groupedModules.total === 0 && (
            <div className="rounded-xl border border-dashed bg-card p-8 text-center">
              <h2 className="text-xl font-bold mb-2">{t("Không tìm thấy chuyên đề phù hợp", "No matching grammar topic found")}</h2>
              <p className="text-muted-foreground">{t("Thử đổi từ khóa tìm kiếm hoặc chọn lại bộ lọc trình độ.", "Try a different keyword or switch the level filter.")}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EnglishGrammar;
