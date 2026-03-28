// IELTS Lectures Dashboard — Grid card layout with pillar filtering and progress tracking
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, BookOpen, Filter, Headphones, Pen, Eye, Mic } from "lucide-react";
import { allIeltsLectures, PILLAR_META, PillarKey } from "@/data/ieltsLecturesData";

const COMPLETED_KEY = "ielts-lectures-completed";

const getCompletedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
  } catch { return []; }
};

const SKILL_ICONS: Record<string, React.ReactNode> = {
  listening: <Headphones className="w-4 h-4" />,
  reading: <Eye className="w-4 h-4" />,
  writing: <Pen className="w-4 h-4" />,
  speaking: <Mic className="w-4 h-4" />,
};

const LEVEL_STYLE: Record<string, string> = {
  foundation: "bg-green-500/15 text-green-700 dark:text-green-400",
  intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  advanced: "bg-red-500/15 text-red-700 dark:text-red-400",
};

const IeltsLectures = () => {
  const { t } = useLanguage();
  const [activePillar, setActivePillar] = useState<PillarKey | "all">("all");
  const [completedIds, setCompletedIds] = useState<string[]>(getCompletedIds());

  useEffect(() => {
    const handler = () => setCompletedIds(getCompletedIds());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const filtered = useMemo(() => {
    if (activePillar === "all") return allIeltsLectures;
    return allIeltsLectures.filter(l => l.pillar === activePillar);
  }, [activePillar]);

  const totalCompleted = completedIds.length;
  const totalLectures = allIeltsLectures.length;
  const progressPercent = totalLectures > 0 ? Math.round((totalCompleted / totalLectures) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-8 pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                📚 {t("Bài giảng IELTS", "IELTS Lectures for Skills")}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {t(
                  "Hệ thống bài giảng chuyên sâu với chiến lược từng bước, ví dụ thực tế và mẹo vàng từ Thầy Hải.",
                  "Comprehensive lecture system with step-by-step strategies, real examples, and Teacher Hai's golden secrets."
                )}
              </p>

              {/* Progress Tracker */}
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
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

        {/* Pillar Filters */}
        <section className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {t("Lọc theo chủ đề", "Filter by pillar")}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activePillar === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePillar("all")}
              className="rounded-full"
            >
              {t("Tất cả", "All")} ({allIeltsLectures.length})
            </Button>
            {(Object.keys(PILLAR_META) as PillarKey[]).map(key => {
              const meta = PILLAR_META[key];
              const count = allIeltsLectures.filter(l => l.pillar === key).length;
              return (
                <Button
                  key={key}
                  variant={activePillar === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActivePillar(key)}
                  className="rounded-full"
                >
                  {meta.icon} {t(meta.labelVi, meta.label)} ({count})
                </Button>
              );
            })}
          </div>
        </section>

        {/* Lecture Grid */}
        <section className="container mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((lecture, idx) => {
              const isCompleted = completedIds.includes(lecture.id);
              const pillarMeta = PILLAR_META[lecture.pillar];
              return (
                <motion.div
                  key={lecture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link to={`/ielts-lectures/${lecture.id}`}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                      {/* Pillar color accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillarMeta.color}`} />

                      <CardContent className="p-5 pt-6">
                        {/* Top row: icon + badges */}
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-3xl">{lecture.icon}</span>
                          <div className="flex items-center gap-1.5">
                            {isCompleted && (
                              <Badge variant="secondary" className="bg-green-500/15 text-green-600 text-xs gap-1">
                                <CheckCircle className="w-3 h-3" /> {t("Đã học", "Done")}
                              </Badge>
                            )}
                            <Badge variant="outline" className={`text-xs ${LEVEL_STYLE[lecture.level]}`}>
                              {lecture.level}
                            </Badge>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[18px] font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
                          {t(lecture.titleVi, lecture.title)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {t(lecture.descriptionVi, lecture.description)}
                        </p>

                        {/* Meta row */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {lecture.duration}
                          </span>
                          {lecture.skill && (
                            <span className="flex items-center gap-1 capitalize">
                              {SKILL_ICONS[lecture.skill]} {lecture.skill}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" /> {lecture.quiz.length} {t("câu hỏi", "questions")}
                          </span>
                        </div>

                        {/* Pillar tag */}
                        <div className="mt-3 pt-3 border-t border-border">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${pillarMeta.color} text-white`}>
                            {pillarMeta.icon} {t(pillarMeta.labelVi, pillarMeta.label)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              {t("Không có bài giảng nào trong mục này.", "No lectures in this category.")}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsLectures;
