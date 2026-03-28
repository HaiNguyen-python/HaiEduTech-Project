// Finnish Language Program landing page with Nordic clean aesthetic
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, GraduationCap, ChevronRight, Globe,
  Languages, Snowflake, Home, Briefcase, Heart, Bus, ShoppingCart,
  PenTool, Mic, BookText, Headphones, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import finnishBg from "@/assets/finnish-nordic-bg.jpg";
import { finnishVocabModules, finnishLessonModules, finnishMockExamModules } from "@/data/finnishCurriculum";

const pillarIconMap: Record<string, LucideIcon> = {
  "vocabulary": BookOpen,
  "lessons": GraduationCap,
  "mock-exams": PenTool,
};

const Finnish = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");

  const allModules = [...finnishVocabModules, ...finnishLessonModules, ...finnishMockExamModules];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28">
        {/* Hero Section with Nordic landscape */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={finnishBg} alt="Finnish landscape" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#003580]/70 via-[#003580]/50 to-background" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">🇫🇮</span>
                <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1 backdrop-blur-sm">
                  YKI Prep — Level A2
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {t("Luyện thi YKI Tiếng Phần Lan", "YKI Finnish Prep: Level A2")}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
                {t(
                  "Chương trình luyện thi YKI A2 toàn diện — Từ vựng, Ngữ pháp, và Thi thử 4 kỹ năng. Thiết kế theo chuẩn Perustaso.",
                  "Comprehensive YKI A2 preparation — Vocabulary, Grammar, and Mock Exams across 4 skills. Designed for the Perustaso level."
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/finnish/yki-dashboard">
                  <Button size="lg" className="bg-white text-[#003580] hover:bg-white/90 font-semibold gap-2">
                    <Snowflake className="w-5 h-5" />
                    {t("Bắt đầu học", "Start Learning")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="container mx-auto px-4 sm:px-6 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-xl mx-auto grid grid-cols-2 h-12 mb-8">
              <TabsTrigger value="overview" className="text-sm font-medium">
                📋 {t("Tổng quan", "Overview")}
              </TabsTrigger>
              <TabsTrigger value="modules" className="text-sm font-medium">
                📚 {t("Các Module", "Modules")}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {/* Pillar 1: Vocabulary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border-2 border-[#003580]/20 bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl">
                      📖
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">YKI Vocabulary</h3>
                      <p className="text-sm text-muted-foreground">A1 – A2 Focus</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {t(
                      "5 chủ đề từ vựng thiết yếu: Nhà ở, Công việc, Sức khỏe, Giao thông, Mua sắm. Bao gồm Puhekieli (tiếng nói) so với Kirjakieli (tiếng viết).",
                      "5 thematic vocab lists: Home, Work, Health, Transport, Shopping. Includes Puhekieli (spoken) vs Kirjakieli (written) forms."
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["🏠 Home", "💼 Work", "🏥 Health", "🚌 Transport", "🛒 Food"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Pillar 2: Lessons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border-2 border-[#003580]/20 bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xl">
                      🎓
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">YKI A2 Lessons</h3>
                      <p className="text-sm text-muted-foreground">{t("Học kỹ năng", "Skill-building")}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {t(
                      "Ngữ pháp tương tác: Sijat paikalliset, Astevaihtelu (KPT), Thì quá khứ. Chiến lược nói: Bưu điện, Bệnh viện, Phỏng vấn.",
                      "Interactive grammar: Local Cases, Consonant Gradation (KPT), Past Tenses. Speaking strategies: Post Office, Doctor, Job Interview."
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["📍 Cases", "🔄 KPT", "⏪ Past", "🗣️ Speaking"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Pillar 3: Mock Exams */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border-2 border-[#003580]/20 bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl">
                      📝
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">YKI Mock Exams</h3>
                      <p className="text-sm text-muted-foreground">4 Skills</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {t(
                      "Thi thử đầy đủ 4 kỹ năng: Đọc hiểu, Nghe hiểu, Viết, Nói. Mô phỏng áp lực phòng thi YKI thực tế.",
                      "Full 4-skill mock exams: Reading, Listening, Writing, Speaking. Simulates real YKI test pressure."
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["📖 Reading", "🎧 Listening", "✍️ Writing", "🎤 Speaking"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* CTA to Dashboard */}
              <div className="text-center">
                <Link to="/finnish/yki-dashboard">
                  <Button size="lg" className="gap-2 font-semibold">
                    {t("Vào Dashboard học tập", "Go to Learning Dashboard")}
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules">
              <div className="space-y-8">
                {/* Vocabulary Modules */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    📖 YKI Vocabulary (A1–A2)
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {finnishVocabModules.map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={`/finnish/yki-dashboard?module=${mod.id}`}>
                          <div className="rounded-xl border border-[#003580]/15 bg-card/80 backdrop-blur-sm p-5 hover:shadow-md hover:border-[#003580]/30 transition-all group">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{mod.icon}</span>
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-[#003580] transition-colors">{mod.titleEn}</h3>
                                <p className="text-xs text-muted-foreground">{mod.title}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{mod.descriptionEn}</p>
                            <div className="mt-3 flex items-center gap-2 text-xs text-[#003580]">
                              <Badge variant="outline" className="border-[#003580]/30 text-[#003580]">
                                {mod.lessons.length} {mod.lessons.length === 1 ? "lesson" : "lessons"}
                              </Badge>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Lesson Modules */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    🎓 YKI A2 Lessons
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {finnishLessonModules.map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={`/finnish/yki-dashboard?module=${mod.id}`}>
                          <div className="rounded-xl border border-[#003580]/15 bg-card/80 backdrop-blur-sm p-5 hover:shadow-md hover:border-[#003580]/30 transition-all group">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{mod.icon}</span>
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-[#003580] transition-colors">{mod.titleEn}</h3>
                                <p className="text-xs text-muted-foreground">{mod.title}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{mod.descriptionEn}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Mock Exam Modules */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    📝 YKI Mock Exams
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {finnishMockExamModules.map((mod, i) => (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link to={`/finnish/yki-dashboard?module=${mod.id}`}>
                          <div className="rounded-xl border border-[#003580]/15 bg-card/80 backdrop-blur-sm p-5 hover:shadow-md hover:border-[#003580]/30 transition-all group">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{mod.icon}</span>
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-[#003580] transition-colors">{mod.titleEn}</h3>
                                <p className="text-xs text-muted-foreground">{mod.title}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{mod.descriptionEn}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Finnish;
