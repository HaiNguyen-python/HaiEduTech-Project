import { useMemo, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronRight, BookOpen, GraduationCap, Languages, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { allProgrammingModules } from "@/data/programmingLessonData";

type PillarKey = "nlp" | "edtech";

const PILLAR_META: Record<PillarKey, {
  title: string; titleEn: string;
  desc: string; descEn: string;
  icon: typeof Languages;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}> = {
  nlp: {
    title: "Natural Language Processing",
    titleEn: "Natural Language Processing",
    desc: "Chuyên sâu NLP 2026: tokenization đa ngôn ngữ, embeddings & vector search, Transformers/BERT/LLMs, RAG, LoRA và đánh giá an toàn. Capstone: Finnish→English Sentiment Analyser.",
    descEn: "Deep NLP 2026: multilingual tokenization, embeddings & vector search, Transformers/BERT/LLMs, RAG, LoRA, and evaluation & safety. Capstone: Finnish→English sentiment analyser.",
    icon: Languages,
    emoji: "🗣️",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/8",
    borderColor: "border-cyan-500/20",
    accentColor: "text-cyan-600",
  },
  edtech: {
    title: "EdTech",
    titleEn: "EdTech",
    desc: "Xây dựng sản phẩm giáo dục số: khoa học học tập, Spaced Repetition (SM-2), adaptive mastery, AI Tutor (RAG), auto-grading, analytics & A/B test sư phạm — nền tảng đứng sau HaiEduTech.",
    descEn: "Build digital learning products: learning science, Spaced Repetition (SM-2), adaptive mastery, AI tutors (RAG), auto-grading, analytics & pedagogical A/B tests — the very stack powering HaiEduTech.",
    icon: GraduationCap,
    emoji: "🎓",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/8",
    borderColor: "border-pink-500/20",
    accentColor: "text-pink-600",
  },
};

const PillarHub = () => {
  const { pillarId } = useParams<{ pillarId: string }>();
  const { t, lang } = useLanguage();

  const isValidPillar = pillarId === "nlp" || pillarId === "edtech";
  if (!isValidPillar) {
    return <Navigate to="/programming" replace />;
  }

  const pillar = pillarId as PillarKey;
  const meta = PILLAR_META[pillar];
  const Icon = meta.icon;

  const modules = useMemo(
    () => allProgrammingModules.filter(m => m.course === pillar),
    [pillar]
  );

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(modules.map(m => m.id))
  );

  const toggleModule = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${meta.titleEn} Curriculum | HaiEduTech`}
        description={meta.descEn}
        path={`/programming/${pillar}`}
      />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto mb-4">
            <Link
              to="/programming"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t("Tất cả chuyên ngành", "All pillars")}
            </Link>
          </div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-7xl mx-auto rounded-2xl p-6 sm:p-8 mb-8 border ${meta.bgColor} ${meta.borderColor}`}
          >
            <div className="flex items-start gap-4 flex-wrap">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shrink-0`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-[260px]">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur text-[10px] font-bold mb-2">
                  <Sparkles className="w-3 h-3" /> {meta.emoji} {t("CHUYÊN NGÀNH", "PILLAR")}
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2 leading-tight">
                  {t(meta.title, meta.titleEn)}
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                  {t(meta.desc, meta.descEn)}
                </p>
                <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {modules.length} {t("module", "modules")}
                  </span>
                  <span>·</span>
                  <span>{totalLessons} {t("bài học", "lessons")}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Left sidebar: lesson tree */}
            <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              <div className="glass-card rounded-xl p-4">
                <h2 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${meta.accentColor}`} />
                  {t("Danh sách bài học", "Lesson directory")}
                </h2>
                <nav className="space-y-2">
                  {modules.map((m) => {
                    const isOpen = openModules.has(m.id);
                    return (
                      <div key={m.id} className="border border-border/60 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleModule(m.id)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-muted/40 hover:bg-muted transition-colors text-left"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <span className={`w-6 h-6 rounded-md bg-gradient-to-br ${m.color} flex items-center justify-center text-[11px] shrink-0`}>
                              {m.icon}
                            </span>
                            <span className="font-display font-semibold text-xs text-foreground truncate">
                              {t(m.title, m.titleEn)}
                            </span>
                          </span>
                          {isOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <ol className="py-1">
                            {m.lessons.map((l, idx) => (
                              <li key={l.id}>
                                <Link
                                  to={`/programming/${m.id}/${l.id}`}
                                  className="group flex items-start gap-2 px-3 py-1.5 text-[12px] text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
                                >
                                  <span className="text-[10px] font-mono text-muted-foreground/70 mt-0.5 w-5 shrink-0">
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  <span className="flex-1 line-clamp-2 group-hover:text-primary transition-colors">
                                    {t(l.title, l.titleEn)}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right content: module cards */}
            <div>
              <div className="grid sm:grid-cols-2 gap-4">
                {modules.map((mod, j) => (
                  <Link
                    key={mod.id}
                    to={`/programming/${mod.id}`}
                    className="group glass-card rounded-xl p-5 hover:border-primary/30 transition-all hover:shadow-md active:scale-[0.98]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-lg shrink-0`}>
                          {mod.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                            {t(mod.title, mod.titleEn)}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {mod.lessons.length} {t("bài", "lessons")}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {t(mod.description, mod.descriptionEn)}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {mod.lessons.slice(0, 3).map((l) => (
                          <li key={l.id} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                            <span className="text-primary/60 mt-0.5">•</span>
                            <span className="line-clamp-1">{t(l.title, l.titleEn)}</span>
                          </li>
                        ))}
                        {mod.lessons.length > 3 && (
                          <li className="text-[11px] text-primary/80 font-medium">
                            +{mod.lessons.length - 3} {t("bài khác", "more lessons")}
                          </li>
                        )}
                      </ul>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PillarHub;
