// Learn Vietnamese main page with language, history, folklore, and game sections
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, GraduationCap, Clock, Scroll, Sparkles,
  ChevronRight, Flower2, Star, Globe, Gamepad2, BookMarked,
  Crown, Swords, Shield, Mountain, Landmark, Flag, Scale,
  BookText, Users, Drum, Flame, Castle, Pen, Ship, Anchor,
  Heart, MapPin, Trophy, Rocket, Wifi, HandshakeIcon,
  Lightbulb, TrendingUp, Activity, GraduationCap as GradCap,
  Utensils, Target, type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HistoryTimeline from "@/components/HistoryTimeline";
import GameHub from "@/components/games/GameHub";
import FolkloreCardGrid from "@/components/FolkloreCardGrid";
import {
  vietnameseLanguageModules,
  historyMonths,
  folkloreItems,
} from "@/data/vietnameseCurriculumData";

// Icon mapping for each history lesson
const lessonIconMap: Record<string, LucideIcon> = {
  // Month 1: Early Kingdoms
  "hist-1-1": Crown,        // Hung Kings legend
  "hist-1-2": Castle,       // Co Loa citadel
  "hist-1-3": Shield,       // Trung Sisters
  "hist-1-4": Shield,       // Lady Trieu
  "hist-1-5": Anchor,       // Bach Dang battle
  "hist-1-6": Flag,         // Van Xuan
  "hist-1-7": Flame,        // Khuc Thua Du autonomy
  "hist-1-8": Swords,       // Dinh Bo Linh unification
  "hist-1-9": Drum,         // Dong Son bronze drums
  "hist-1-10": Flame,       // Mai Thuc Loan & Phung Hung
  // Month 2: Golden Dynasties
  "hist-2-1": Landmark,     // Ly - Thang Long
  "hist-2-2": Pen,          // Ly Thuong Kiet - poem
  "hist-2-3": Swords,       // Tran vs Mongols
  "hist-2-4": Mountain,     // Le Loi - Lam Son
  "hist-2-5": Scale,        // Le Thanh Tong - laws
  "hist-2-6": Trophy,       // Tran Hung Dao
  "hist-2-7": Lightbulb,    // Ho Quy Ly reforms
  "hist-2-8": GraduationCap, // Van Mieu
  "hist-2-9": Ship,         // Trinh-Nguyen division
  "hist-2-10": BookText,    // Ho Guom legend
  // Month 3: Modern History
  "hist-3-1": Swords,       // Quang Trung
  "hist-3-2": Castle,       // Nguyen & France
  "hist-3-3": Flag,         // Ho Chi Minh independence
  "hist-3-4": Mountain,     // Dien Bien Phu
  "hist-3-5": Flag,         // Reunification 1975
  "hist-3-6": Shield,       // Can Vuong
  "hist-3-7": Ship,         // Phan Boi Chau Dong Du
  "hist-3-8": Flame,        // Phong trao Xo Viet Nghe Tinh
  "hist-3-9": Star,         // Cach mang Thang Tam
  "hist-3-10": Swords,      // Chien dich HCM 1975
  // Month 4: Contemporary Vietnam
  "hist-4-1": TrendingUp,   // Doi Moi 1986
  "hist-4-2": Globe,        // ASEAN & WTO
  "hist-4-3": Wifi,         // Digital era
  "hist-4-4": HandshakeIcon, // VN on world stage
  "hist-4-5": Target,       // Challenges & future
  "hist-4-6": TrendingUp,   // Post-Doi Moi economy
  "hist-4-7": Activity,     // COVID response
  "hist-4-8": GraduationCap, // Education & PISA
  "hist-4-9": Utensils,     // Vietnamese culture global
  "hist-4-10": Rocket,      // Vision 2045
};

const Vietnamese = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const validTabs = ["language", "history", "folklore", "game"];
  const [activeTab, setActiveTab] = useState(
    tabFromUrl && validTabs.includes(tabFromUrl) ? tabFromUrl : "language"
  );

  // Sync tab when URL query param changes
  useEffect(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Language programs summary
  const programs = [
    {
      icon: "📝",
      title: t("Ngữ pháp", "Grammar"),
      desc: t("Cấu trúc câu, đại từ, thì, giới từ", "Sentence structure, pronouns, tenses, prepositions"),
      color: "from-red-500 to-orange-500",
      modules: vietnameseLanguageModules.filter((m) => m.category === "grammar"),
    },
    {
      icon: "📖",
      title: t("Từ vựng", "Vocabulary"),
      desc: t("Từ vựng theo chủ đề: ẩm thực, gia đình, du lịch", "Thematic vocabulary: cuisine, family, travel"),
      color: "from-yellow-500 to-red-500",
      modules: vietnameseLanguageModules.filter((m) => m.category === "vocabulary"),
    },
    {
      icon: "📚",
      title: t("Đọc hiểu", "Reading"),
      desc: t("Đọc và phân tích văn bản tiếng Việt", "Read and analyze Vietnamese texts"),
      color: "from-blue-500 to-indigo-500",
      modules: vietnameseLanguageModules.filter((m) => m.category === "reading"),
    },
    {
      icon: "🌾",
      title: t("Ca Dao & Tục Ngữ", "Folklore & Proverbs"),
      desc: t("Học ngữ pháp qua ca dao, tục ngữ dân gian", "Learn grammar naturally through folk poetry"),
      color: "from-green-600 to-emerald-500",
      modules: vietnameseLanguageModules.filter((m) => m.category === "folklore"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-6 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Flower2 className="w-8 h-8 text-red-500" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t("Học Tiếng Việt", "Learn Vietnamese")}
              </h1>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t(
                "Khám phá ngôn ngữ, lịch sử và văn hóa Việt Nam qua chương trình học tương tác",
                "Explore Vietnamese language, history, and culture through an interactive curriculum"
              )}
            </p>
          </motion.div>
        </section>

        {/* Two featured module entry cards */}
        <section className="container mx-auto px-6 mb-10">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Folklore Library Card */}
            <Link to="/learn-vietnamese/folklore">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-amber-900/20 to-red-900/20 p-6 hover:shadow-2xl transition-all hover:scale-[1.02] min-h-[200px] flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">📖</div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookMarked className="w-6 h-6 text-amber-500" />
                    <Badge variant="outline" className="text-amber-500 border-amber-500/50">{t("Mới", "New")}</Badge>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {t("Kho tàng Truyện cổ tích Việt Nam", "Vietnamese Folklore Treasury")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Sơn Tinh Thủy Tinh, Thánh Gióng, Tấm Cám... Đọc truyện, nghe kể chuyện và học bài học cuộc sống.",
                      "Son Tinh Thuy Tinh, Saint Giong, Tam Cam... Read stories, listen to narration, and learn life lessons."
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary font-medium mt-4">
                  {t("Khám phá ngay", "Explore now")} <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>

            {/* Vietnamese for Foreigners Card */}
            <Link to="/learn-vietnamese/for-foreigners">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-6 hover:shadow-2xl transition-all hover:scale-[1.02] min-h-[200px] flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">🌏</div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-6 h-6 text-blue-500" />
                    <Badge variant="outline" className="text-blue-500 border-blue-500/50">{t("Mới", "New")}</Badge>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {t("Tiếng Việt cho Người Nước Ngoài", "Vietnamese for Foreigners")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Chương trình song ngữ Việt-Anh dành cho người nước ngoài bắt đầu từ con số 0. Giao tiếp, thanh điệu, ẩm thực.",
                      "A bilingual Vietnamese-English course for international learners starting from zero. Communication, tones, cuisine."
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary font-medium mt-4">
                  {t("Bắt đầu học", "Start learning")} <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* Main Tabs */}
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-10">
              <TabsTrigger value="language" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <BookOpen className="w-4 h-4" />
                {t("Ngôn ngữ", "Language")}
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Scroll className="w-4 h-4" />
                {t("Lịch sử", "History")}
              </TabsTrigger>
              <TabsTrigger value="folklore" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4" />
                {t("Ca Dao", "Folklore")}
              </TabsTrigger>
              <TabsTrigger value="game" className="flex items-center gap-1.5 text-xs sm:text-sm">
                <Gamepad2 className="w-4 h-4" />
                {t("Trò chơi", "Game")}
              </TabsTrigger>
            </TabsList>

            {/* =================== LANGUAGE TAB =================== */}
            <TabsContent value="language">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {programs.map((prog, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{prog.icon}</span>
                      <h3 className="text-lg font-bold text-foreground">{prog.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{prog.desc}</p>
                    {prog.modules.map((mod) => (
                      <Link
                        key={mod.id}
                        to={`/learn-vietnamese/module/${mod.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span>{mod.icon}</span>
                          <span className="text-sm font-medium text-foreground">
                            {t(mod.title, mod.titleEn)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {mod.lessons.length} {t("bài", "lessons")}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* =================== HISTORY TAB =================== */}
            <TabsContent value="history">
              <div className="mb-10">
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {t("Dòng thời gian Lịch sử Việt Nam", "Vietnamese History Timeline")}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("Nhấn vào một sự kiện để xem chi tiết", "Click an event to see details")}
                </p>
                <HistoryTimeline />
              </div>

              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                {t("Các thời kỳ lịch sử", "Historical Periods")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {historyMonths.map((month, idx) => (
                  <motion.div
                    key={month.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className={`bg-gradient-to-r ${month.color} p-4`}>
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-2xl">{month.icon}</span>
                        <h3 className="font-bold text-white">{t(month.title, month.titleEn)}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t(month.description, month.descriptionEn)}
                      </p>
                      {month.lessons.map((lesson) => {
                        const LessonIcon = lessonIconMap[lesson.id] || BookOpen;
                        return (
                          <Link
                            key={lesson.id}
                            to={`/learn-vietnamese/history/${lesson.id}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors mb-2"
                          >
                            <div className="flex items-center gap-2.5">
                              <LessonIcon className="w-4 h-4 text-primary shrink-0" />
                              <span className="text-sm font-medium text-foreground">
                                {t(lesson.title, lesson.titleEn)}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* =================== FOLKLORE TAB =================== */}
            <TabsContent value="folklore">
              <FolkloreCardGrid items={folkloreItems} />
            </TabsContent>

            {/* =================== GAME TAB =================== */}
            <TabsContent value="game">
              <GameHub />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vietnamese;
