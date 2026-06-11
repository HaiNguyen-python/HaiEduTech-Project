// IELTS Sample Essays Hub - Filterable list of Band 7.0+ essays
import { useState, useMemo, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sampleEssays } from "@/data/ieltsSampleEssays";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Filter, FileText, BarChart3, PieChart, Table2, Map, Cog, TrendingUp, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";

const STAR_KEY = "ielts-sample-essay-stars";

// Chart type icon mapping
const chartIcons: Record<string, React.ReactNode> = {
  line: <TrendingUp className="w-4 h-4" />,
  bar: <BarChart3 className="w-4 h-4" />,
  pie: <PieChart className="w-4 h-4" />,
  table: <Table2 className="w-4 h-4" />,
  map: <Map className="w-4 h-4" />,
  process: <Cog className="w-4 h-4" />,
  mixed: <FileText className="w-4 h-4" />,
};

const IeltsSampleEssays = () => {
  const { t } = useLanguage();
  const [bandFilter, setBandFilter] = useState<"8.0+" | "7.0+">("8.0+");
  const [taskFilter, setTaskFilter] = useState<"all" | "1" | "2">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [subtypeFilter, setSubtypeFilter] = useState<string>("all");
  const [starredOnly, setStarredOnly] = useState(false);
  const [stars, setStars] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(STAR_KEY) || "[]")); } catch { return new Set(); }
  });
  useEffect(() => { localStorage.setItem(STAR_KEY, JSON.stringify([...stars])); }, [stars]);
  const toggleStar = useCallback((id: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setStars(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }, []);

  // Essays in currently selected band
  const essaysInBand = useMemo(
    () => sampleEssays.filter(e => (e.band ?? "8.0+") === bandFilter),
    [bandFilter]
  );

  // Get available subtypes based on task filter (within current band)
  const subtypes = useMemo(() => {
    if (taskFilter === "1") {
      const types = [...new Set(essaysInBand.filter(e => e.taskType === 1).map(e => e.chartType || ""))];
      return types.filter(Boolean);
    }
    if (taskFilter === "2") {
      const types = [...new Set(essaysInBand.filter(e => e.taskType === 2).map(e => e.essayType || ""))];
      return types.filter(Boolean);
    }
    return [];
  }, [taskFilter, essaysInBand]);

  // Filter essays
  const filtered = useMemo(() => {
    return essaysInBand.filter(essay => {
      if (starredOnly && !stars.has(essay.id)) return false;
      if (taskFilter !== "all" && essay.taskType !== Number(taskFilter)) return false;
      if (subtypeFilter !== "all") {
        if (essay.taskType === 1 && essay.chartType !== subtypeFilter) return false;
        if (essay.taskType === 2 && essay.essayType !== subtypeFilter) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return essay.topic.toLowerCase().includes(q) || essay.prompt.toLowerCase().includes(q);
      }
      return true;
    });
  }, [essaysInBand, taskFilter, subtypeFilter, searchQuery, starredOnly, stars]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IELTS Sample Essays Band 8.0+"
        description="Curated IELTS Writing Task 1 & Task 2 sample essays at Band 8.0+ with bilingual glossary, model structures, and practice exercises."
        path="/ielts-sample-essays"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "IELTS Sample Essays Band 8.0+",
          inLanguage: ["vi-VN", "en-US"],
          isPartOf: { "@type": "WebSite", name: "HaiEduTech", url: "https://haiedutech.com" },
        }}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            {t(`Bài Mẫu IELTS Band ${bandFilter}`, `IELTS Sample Essays Band ${bandFilter}`)}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {bandFilter === "7.0+"
              ? t(
                  "Bài mẫu Band 7.0+ với từ vựng và cấu trúc dễ hiểu, phù hợp cho bạn mới luyện viết và chưa quen đọc bài học thuật dài.",
                  "Band 7.0+ essays with clearer vocabulary and structures — ideal for beginners who feel overwhelmed by long academic models."
                )
              : t(
                  "Bộ sưu tập bài mẫu chất lượng cao với từ vựng học thuật, bảng chú giải song ngữ và bài tập ôn tập.",
                  "High-quality essay collection with academic vocabulary, bilingual glossary and review exercises."
                )}
          </p>
        </motion.div>

        {/* Band tabs */}
        <div className="flex justify-center mb-6">
          <Tabs value={bandFilter} onValueChange={(v) => { setBandFilter(v as "7.0+" | "8.0+"); setSubtypeFilter("all"); }}>
            <TabsList>
              <TabsTrigger value="7.0+">🌱 Band 7.0+ <span className="ml-1 text-xs opacity-70">({t("cơ bản", "easier")})</span></TabsTrigger>
              <TabsTrigger value="8.0+">🏆 Band 8.0+ <span className="ml-1 text-xs opacity-70">({t("nâng cao", "advanced")})</span></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Tabs value={taskFilter} onValueChange={(v) => { setTaskFilter(v as any); setSubtypeFilter("all"); }}>
            <TabsList>
              <TabsTrigger value="all">{t("Tất cả", "All")}</TabsTrigger>
              <TabsTrigger value="1">Task 1</TabsTrigger>
              <TabsTrigger value="2">Task 2</TabsTrigger>
            </TabsList>
          </Tabs>

          {subtypes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={subtypeFilter === "all" ? "default" : "outline"} onClick={() => setSubtypeFilter("all")}>
                {t("Tất cả", "All")}
              </Button>
              {subtypes.map(st => (
                <Button key={st} size="sm" variant={subtypeFilter === st ? "default" : "outline"} onClick={() => setSubtypeFilter(st)} className="capitalize">
                  {taskFilter === "1" && chartIcons[st]}
                  <span className="ml-1">{st}</span>
                </Button>
              ))}
            </div>
          )}

          <Button size="sm" variant={starredOnly ? "default" : "outline"} onClick={() => setStarredOnly(s => !s)} className="gap-1.5">
            <Star className={`w-4 h-4 ${starredOnly ? "fill-current" : ""}`} />
            {t("Đã đánh dấu", "Starred")} ({stars.size})
          </Button>

          <div className="relative md:ml-auto md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("Tìm theo chủ đề...", "Search by topic...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {t("bài mẫu", "essays")}
        </p>

        {/* Essay Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((essay, i) => (
              <motion.div
                key={essay.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/ielts-sample-essays/${essay.id}`} className="block relative">
                  <button
                    onClick={(e) => toggleStar(essay.id, e)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-amber-500/20 transition-colors"
                    aria-label={t("Đánh dấu", "Star")}
                  >
                    <Star className={`w-4 h-4 ${stars.has(essay.id) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                  </button>
                  <div className="glass-card rounded-xl p-5 h-full hover:shadow-lg hover:border-primary/30 transition-all group">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={essay.taskType === 1 ? "secondary" : "default"} className="text-xs">
                        Task {essay.taskType}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {essay.chartType || essay.essayType}
                      </Badge>
                      <Badge variant="outline" className="text-xs">Band {essay.band ?? "8.0+"}</Badge>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors capitalize mb-2 pr-8">
                      {essay.topic}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {essay.prompt.slice(0, 120)}...
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span>📖 {essay.glossary.length} {t("từ vựng", "terms")}</span>
                      <span>✍️ {essay.reviewExercise.items.length} {t("bài tập", "exercises")}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {t("Không tìm thấy bài mẫu phù hợp.", "No matching essays found.")}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default IeltsSampleEssays;
