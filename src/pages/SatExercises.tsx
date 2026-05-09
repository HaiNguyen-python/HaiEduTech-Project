/**
 * @file SatExercises.tsx
 * @description SAT Exercises hub - groups all SAT lessons into Math and Reading & Writing
 * tabs and links each lesson to the existing LanguageLessonView for interactive practice.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, BookOpen, ArrowLeft, ListChecks, Target, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { allEnglishModules, type LanguageModule } from "@/data/languageCurriculum";
import SatStarToggle from "@/components/sat/SatStarToggle";
import { useSatStarsCount } from "@/hooks/useSatStars";
import { Star } from "lucide-react";

const MATH_KEYWORDS = [
  "math",
  "algebra",
  "quadratic",
  "geometry",
  "stats",
  "data",
  "function",
  "linear",
  "graph",
  "equation",
  "number",
];

const isMathItem = (id: string, title: string) => {
  const s = (id + " " + title).toLowerCase();
  return MATH_KEYWORDS.some((k) => s.includes(k));
};

const SatExercises = () => {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState<"math" | "reading">("math");

  const satModules = useMemo<LanguageModule[]>(
    () => allEnglishModules.filter((m) => m.category === "sat"),
    []
  );
  const studiedCount = useSatStarsCount("sat:");

  const grouped = useMemo(() => {
    const math: { module: LanguageModule; lessons: LanguageModule["lessons"] }[] = [];
    const reading: { module: LanguageModule; lessons: LanguageModule["lessons"] }[] = [];
    for (const mod of satModules) {
      const isModMath = isMathItem(mod.id, mod.title + " " + mod.titleEn);
      const mathLessons = mod.lessons.filter((l) => isModMath || isMathItem(l.id, l.title + " " + l.titleEn));
      const readingLessons = mod.lessons.filter((l) => !mathLessons.includes(l));
      if (mathLessons.length) math.push({ module: mod, lessons: mathLessons });
      if (readingLessons.length) reading.push({ module: mod, lessons: readingLessons });
    }
    return { math, reading };
  }, [satModules]);

  const totalMath = grouped.math.reduce((s, g) => s + g.lessons.length, 0);
  const totalReading = grouped.reading.reduce((s, g) => s + g.lessons.length, 0);

  const renderGroup = (
    groups: { module: LanguageModule; lessons: LanguageModule["lessons"] }[],
    accent: string
  ) => (
    <div className="space-y-6">
      {groups.map((g, gi) => (
        <motion.div
          key={g.module.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.04 * gi }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center text-2xl shrink-0`}>
                    <span aria-hidden>{g.module.icon || "📘"}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg truncate">{lang === "vi" ? g.module.title : g.module.titleEn}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{lang === "vi" ? g.module.description : g.module.descriptionEn}</p>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {g.lessons.length} {t("bài", "lessons")}
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {g.lessons.map((l) => {
                  const exCount = l.exercises?.length || 0;
                  const qCount = l.quiz?.length || 0;
                  return (
                    <div
                      key={l.id}
                      className="group rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all p-3 flex items-start gap-3 relative"
                    >
                       <Link
                         to={`/english/learn/${g.module.id}/${l.id}`}
                         className="absolute inset-0 rounded-lg z-10"
                         aria-label={lang === "vi" ? l.title : l.titleEn}
                       />
                       <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors pointer-events-none">
                         <ListChecks className="w-4 h-4" />
                       </div>
                       <div className="min-w-0 flex-1 pointer-events-none">
                        <p className="text-sm font-semibold text-foreground truncate">{lang === "vi" ? l.title : l.titleEn}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">L{l.level}</Badge>
                          {exCount > 0 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {exCount} {t("bài tập", "exercises")}
                            </Badge>
                          )}
                          {qCount > 0 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {qCount} {t("câu quiz", "quiz Qs")}
                            </Badge>
                          )}
                          <SatStarToggle
                            storageKey={`sat:lesson:${g.module.id}:${l.id}`}
                            size="sm"
                            className="ml-auto z-10"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {groups.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          {t("Chưa có bài tập trong nhóm này.", "No exercises in this group yet.")}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link
            to="/english/sat"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại SAT Preparation", "Back to SAT Preparation")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t("Luyện tập SAT có cấu trúc", "Structured SAT Practice")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {t("SAT Exercises", "SAT Exercises")}
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl">
              {t(
                "Toàn bộ bài tập SAT được phân theo SAT Math và SAT Reading & Writing. Mỗi bài có lý thuyết, bài tập tương tác và quiz có giải thích.",
                "All SAT practice grouped into SAT Math and SAT Reading & Writing. Each lesson has theory, interactive drills and a quiz with explanations."
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-primary/10 text-primary border-primary/30">
                <Target className="w-3 h-3 mr-1" />
                {totalMath + totalReading} {t("bài luyện tập", "practice lessons")}
              </Badge>
              <Badge variant="outline">
                <Calculator className="w-3 h-3 mr-1" /> {totalMath} {t("bài Math", "Math")}
              </Badge>
              <Badge variant="outline">
                <BookOpen className="w-3 h-3 mr-1" /> {totalReading} {t("bài Reading & Writing", "Reading & Writing")}
              </Badge>
              <Badge className="bg-amber-400/15 text-amber-700 dark:text-amber-300 border-amber-400/40">
                <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-500" />
                {studiedCount} {t("đã đánh dấu đã học", "marked as studied")}
              </Badge>
            </div>
          </motion.div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "math" | "reading")} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="math" className="gap-2">
                <Calculator className="w-4 h-4" />
                {t("SAT Math", "SAT Math")}
              </TabsTrigger>
              <TabsTrigger value="reading" className="gap-2">
                <BookOpen className="w-4 h-4" />
                {t("SAT Reading", "SAT Reading")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="math">{renderGroup(grouped.math, "from-sky-500 to-indigo-600")}</TabsContent>
            <TabsContent value="reading">{renderGroup(grouped.reading, "from-emerald-500 to-teal-600")}</TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SatExercises;
