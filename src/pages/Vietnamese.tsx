// Learn Vietnamese main page with language, history, folklore, and game sections
import { useState, useEffect, useRef } from "react";
import vietnameseCultureBanner from "@/assets/vietnamese-culture-banner.jpg";
import vietnamFlag from "@/assets/vietnam-flag.png";
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
  const tabsRef = useRef<HTMLDivElement>(null);

  // Sync tab when URL query param changes and scroll to tabs
  useEffect(() => {
    if (tabFromUrl && validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
      // Scroll to tabs section when navigating via URL
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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
        {/* Hero with illustration banner */}
        <section className="container mx-auto px-6 text-center mb-4">
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

        {/* Illustrated banner - matching reference design */}
        <section className="w-full mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[1600px] mx-auto rounded-3xl overflow-hidden shadow-xl"
          >
            <img src={vietnameseCultureBanner} alt="Vietnamese culture illustration" width={1920} height={1080} className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Top-right cluster */}
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring" }} className="absolute top-[8%] right-[30%] bg-white/90 text-foreground text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.5s ease-in-out infinite" }}>{t("Phát âm", "Pronunciation")}</motion.span>
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: "spring" }} className="absolute top-[6%] right-[22%] bg-white/90 text-foreground text-sm md:text-base font-bold px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 4s ease-in-out 0.3s infinite" }}>{t("Giao tiếp", "Communication")}</motion.span>
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, type: "spring" }} className="absolute top-[4%] right-[15%] bg-white/90 text-foreground text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 3s ease-in-out 0.5s infinite" }}>{t("Văn hóa", "Culture")}</motion.span>
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring" }} className="absolute top-[12%] right-[26%] bg-white/90 text-foreground text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 3.8s ease-in-out 0.2s infinite" }}>{t("Phát tiếp", "Fluency")}</motion.span>
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, type: "spring" }} className="absolute top-[10%] right-[18%] bg-white/90 text-foreground text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 4.2s ease-in-out 0.4s infinite" }}>{t("Giao triệp", "Interaction")}</motion.span>
            <motion.span initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, type: "spring" }} className="absolute top-[5%] right-[10%] bg-white/90 text-foreground text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 3.6s ease-in-out 0.7s infinite" }}>{t("Tiết kiệm", "Efficient")}</motion.span>

            {/* Left side */}
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, type: "spring" }} className="absolute top-[38%] left-[2%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 4s ease-in-out 0.2s infinite" }}>{t("Thánh Gióng", "Saint Giong")}</motion.span>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45, type: "spring" }} className="absolute top-[55%] left-[8%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.5s ease-in-out 0.4s infinite" }}>{t("Tấm Cám", "Tam Cam")}</motion.span>

            {/* Center labels */}
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring" }} className="absolute top-[42%] left-[28%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.8s ease-in-out 0.3s infinite" }}>{t("Chữ & Dấu Việt", "Vietnamese Script")}</motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }} className="absolute top-[35%] left-[50%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 4.2s ease-in-out 0.5s infinite" }}>{t("Học qua mùa rồi", "Seasonal learning")}</motion.span>

            {/* Right side */}
            <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, type: "spring" }} className="absolute top-[30%] right-[20%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.5s ease-in-out 0.2s infinite" }}>{t("Rồng", "Dragon")}</motion.span>
            <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, type: "spring" }} className="absolute top-[28%] right-[3%] text-foreground text-base md:text-xl font-bold drop-shadow-lg" style={{ animation: "float 4s ease-in-out infinite" }}>{t("Lịch Sử & Ca Dao", "History & Folk Songs")}</motion.span>
            <motion.span initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, type: "spring" }} className="absolute top-[35%] right-[2%] bg-white/90 text-foreground text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 3.2s ease-in-out 0.4s infinite" }}>{t("Khuê Văn Các", "Temple of Literature")}</motion.span>
            <motion.span initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, type: "spring" }} className="absolute top-[40%] right-[5%] bg-white/90 text-foreground text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 3.8s ease-in-out 0.6s infinite" }}>{t("Trò chơi", "Games")}</motion.span>
            <motion.span initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, type: "spring" }} className="absolute top-[40%] right-[0%] bg-white/90 text-foreground text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full shadow-md" style={{ animation: "float 4.5s ease-in-out 0.3s infinite" }}>{t("Áo dài", "Ao Dai")}</motion.span>

            {/* Right text cluster */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, type: "spring" }} className="absolute top-[48%] right-[2%] text-right space-y-0.5 pointer-events-none" style={{ animation: "float 4s ease-in-out 0.5s infinite" }}>
              <p className="text-foreground/80 text-[9px] md:text-[11px] italic">{t("Văn Hóa cổn", "Ancient culture")}</p>
              <p className="text-foreground/80 text-[9px] md:text-[11px]">{t("Chu Hương trẻ", "Young heritage")}</p>
              <p className="text-foreground/90 text-[10px] md:text-xs font-medium">{t("Ca Dao & Tục Ngữ", "Folk Songs & Proverbs")}</p>
              <p className="text-foreground/80 text-[9px] md:text-[11px]">{t("Học pháp dân gian", "Folk pedagogy")}</p>
              <p className="text-foreground/80 text-[9px] md:text-[11px]">{t("Văn học dân gian", "Folk literature")}</p>
            </motion.div>

            {/* Bottom-right labels */}
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: "spring" }} className="absolute bottom-[28%] right-[8%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.6s ease-in-out 0.7s infinite" }}>{t("Cờ tướng", "Chinese Chess")}</motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, type: "spring" }} className="absolute bottom-[22%] right-[15%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 4s ease-in-out 0.5s infinite" }}>{t("Văn học dân gian", "Folk Literature")}</motion.span>
            <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, type: "spring" }} className="absolute bottom-[18%] right-[2%] bg-white/90 text-foreground text-xs md:text-sm font-medium px-3 py-1.5 rounded-full shadow-md" style={{ animation: "float 3.4s ease-in-out 0.8s infinite" }}>{t("Học qua trò chơi", "Learn through games")}</motion.span>

            {/* Bottom CTA cards */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex flex-wrap gap-4 md:gap-6 max-w-4xl">
                <Link to="/learn-vietnamese/folklore" className="block">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }} whileHover={{ scale: 1.03, y: -3 }} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
                    <h3 className="font-bold text-foreground text-sm md:text-base mb-2">{t("Kho tàng Truyện cổ tích", "Folklore Treasury")}</h3>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-full px-4">{t("Khám phá ngay", "Explore now")}</Button>
                  </motion.div>
                </Link>
                <Link to="/learn-vietnamese/for-foreigners" className="block">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: "spring" }} whileHover={{ scale: 1.03, y: -3 }} className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
                    <h3 className="font-bold text-foreground text-sm md:text-base mb-2">{t("Ngôn ngữ & Từ vựng", "Language & Vocabulary")}</h3>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-full px-4">{t("Bắt đầu học", "Start learning")}</Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main Tabs */}
        <div ref={tabsRef} className="container mx-auto px-6">
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
