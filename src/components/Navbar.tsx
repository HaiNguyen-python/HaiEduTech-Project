/**
 * @file Navbar.tsx
 * @description Main navigation bar for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Brain, BookOpen, Languages, Code2, GraduationCap,
  Globe, UserPlus, Heart, LogIn, ChevronDown, ChevronRight, Cpu, LogOut, Library, Shield,
  FileText, PenTool, Map, MessageSquare, Award, School, Swords, User, LayoutDashboard, Newspaper,
  FolderLock, Compass, Briefcase, Trophy, Sparkles, Bot, Database, Workflow, Cloud, Network, Gamepad2, MessagesSquare, Target, Settings2, Flame, Music, Quote, Mic2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useStreak } from "@/hooks/useStreak";
import teacherLogo from "@/assets/teacher-logo.webp";
import teacherWave from "@/assets/teacher-wave.webp";
import GlobalSearch from "@/components/GlobalSearch";

// Sub-item with optional icon and nested children
interface SubItem {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SubItem[];
  groupLabel?: string;
  divider?: boolean;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user, isTeacher } = useUserRole();
  const { streak } = useStreak();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Get display name from user metadata or email
  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split("@")[0]
    || "User";

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // IELTS nested sub-items with dedicated icons
   const ieltsChildren: SubItem[] = [
    // Học & Ôn
    { to: "/english/ielts", label: t("Tổng quan & Lộ trình", "Overview & Roadmap"), icon: Map },
    { to: "/ielts-lectures", label: t("Bài giảng IELTS", "IELTS Lectures"), icon: BookOpen },
    { to: "/english/learn/ielts-reading", label: t("Luyện đọc", "Reading Practice"), icon: BookOpen },
    { to: "/english/learn/ielts-listening", label: t("Luyện nghe", "Listening Practice"), icon: BookOpen },
    // Divider
    { to: "#div1", label: "", divider: true },
    // Từ vựng
    { to: "/ielts-vocabulary", label: t("Từ vựng IELTS", "IELTS Vocabulary"), icon: BookOpen },
    { to: "/vocab-arena", label: t("Vocab Arena", "Vocab Arena"), icon: Swords },
    // Divider
    { to: "#div2", label: "", divider: true },
    // Luyện tập & Chấm điểm
    { to: "/ielts-writing-practice", label: t("Luyện viết", "Writing Practice"), icon: PenTool },
    { to: "/ielts-speaking-practice", label: t("Luyện nói", "Speaking Practice"), icon: MessageSquare },
    { to: "/ielts-sample-essays", label: t("Bài mẫu 8.0+", "Sample Essays 8.0+"), icon: FileText },
    { to: "/ai-grading", label: t("Chấm điểm", "Grading Portal"), icon: Cpu },
  ];

  // National Exam nested sub-items
  const nationalExamChildren: SubItem[] = [
    { to: "/english/national-exam", label: t("Khóa luyện thi TN THPT", "National Exam Course"), icon: BookOpen },
    { to: "/national-exam", label: t("Phòng luyện thi TN THPT", "Exam Practice Room"), icon: FileText },
  ];

  const englishSubs: SubItem[] = [
    { to: "/english", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "#en-div1", label: "", divider: true },
    // Foundation (everyday English)
    { to: "#en-foundation-group", label: t("📖 Nền tảng Anh ngữ", "📖 English Foundation"), groupLabel: "en-foundation", children: [
      { to: "/english/grammar", label: t("Ngữ pháp", "Grammar"), icon: BookOpen },
      { to: "/english/pronunciation", label: t("Phát âm & Ngữ điệu", "Pronunciation & Intonation"), icon: Mic2 },
      { to: "/english/conversational", label: t("Giao tiếp", "Conversational"), icon: MessageSquare },
      { to: "/english/idioms", label: t("Thành ngữ & Danh ngôn", "Idioms & Quotes"), icon: Quote },
      { to: "/cambridge-lectures", label: t("Bài giảng Cambridge", "Cambridge Lectures"), icon: BookOpen },
    ] },
    // IELTS - promoted to top-level so all 10 IELTS items are reachable in one hover
    { to: "#ielts-group", label: t("🎯 IELTS Program", "🎯 IELTS Program"), groupLabel: "ielts", children: ieltsChildren, icon: Target },
    // Other international exams (TOEIC / PTE / SAT)
    { to: "#en-exams-group", label: t("🌐 Luyện thi Quốc tế khác", "🌐 Other International Exams"), groupLabel: "en-exams", children: [
      { to: "/toeic-lectures", label: t("Bài giảng TOEIC", "TOEIC Lectures"), icon: BookOpen },
      { to: "/toeic-vocabulary", label: t("Từ vựng TOEIC", "TOEIC Vocabulary"), icon: Library },
      { to: "#en-exams-div", label: "", divider: true },
      { to: "/pte", label: "PTE Academic", icon: Target },
      { to: "/english/sat", label: "SAT", icon: PenTool },
    ] },
    // Vietnamese national exam
    { to: "#national-exam-group", label: t("🏫 Luyện thi THPT", "🏫 National Exam Prep"), groupLabel: "national-exam", children: nationalExamChildren },
    { to: "#en-div2", label: "", divider: true },
    { to: "/english/fun-facts", label: t("✨ Fun Facts tiếng Anh", "✨ English Fun Facts") },
    { to: "/songs/english", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    { to: "/speaking-coach/english", label: t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach") },
    { to: "/specialized-language?lang=english", label: t("🧠 AI Ngôn ngữ Chuyên ngành", "🧠 AI Specialized Language") },
  ];
  const chineseSubs: SubItem[] = [
    { to: "/chinese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "#cn-div1", label: "", divider: true },
    { to: "#cn-hsk-group", label: t("🎓 Lộ trình HSK", "🎓 HSK Program"), groupLabel: "cn-hsk", children: [
      { to: "/chinese/hsk", label: "📊 HSK 1-6" },
      { to: "/chinese/hsk-guide", label: t("🎓 HSK Exam Guide", "🎓 HSK Exam Guide") },
      { to: "/chinese/hsk/vocabulary", label: t("📖 HSK Vocabulary", "📖 HSK Vocabulary") },
      { to: "/chinese/hsk/vocabulary?tab=radicals", label: t("🀄 214 Bộ thủ Khang Hi", "🀄 214 Kangxi Radicals") },
    ] },
    { to: "#cn-conv-group", label: t("💬 Giao tiếp & Tương tác", "💬 Conversational"), groupLabel: "cn-conv", children: [
      { to: "/chinese/conversational/curriculum", label: t("🎯 Chương trình Tương tác", "🎯 Interactive Curriculum") },
      { to: "/chinese/culture", label: t("🎎 Văn hóa Giao tiếp", "🎎 Communication Culture") },
    ] },
    { to: "#cn-div2", label: "", divider: true },
    { to: "/songs/chinese", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    { to: "/speaking-coach/chinese", label: t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach") },
    { to: "/specialized-language?lang=chinese", label: t("🧠 AI Ngôn ngữ Chuyên ngành", "🧠 AI Specialized Language") },
  ];
  const vietnameseSubs: SubItem[] = [
    { to: "/learn-vietnamese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "#vn-div1", label: "", divider: true },
    { to: "#vn-curriculum-group", label: t("📚 Chương trình học", "📚 Curriculum"), groupLabel: "vn-curriculum", children: [
      { to: "/learn-vietnamese?tab=language", label: t("📝 Ngữ pháp & Từ vựng", "📝 Grammar & Vocabulary") },
      { to: "/learn-vietnamese?tab=history", label: t("📜 Lịch sử & Văn hóa", "📜 History & Culture") },
      { to: "/learn-vietnamese/national-anthem", label: t("⭐ Quốc ca Việt Nam", "⭐ National Anthem") },
    ] },
    { to: "#vn-culture-group", label: t("🎎 Văn hóa & Đời sống", "🎎 Culture & Lifestyle"), groupLabel: "vn-culture", children: [
      { to: "/learn-vietnamese/cuisine", label: t("🍜 Ẩm thực Việt Nam", "🍜 Vietnamese Cuisine") },
      { to: "/learn-vietnamese/regions", label: t("🗺️ Du lịch & Vùng miền", "🗺️ Travel & Regions") },
      { to: "/learn-vietnamese/culture", label: t("🎭 Văn hóa & Phong tục", "🎭 Culture & Customs") },
      { to: "/learn-vietnamese/films", label: t("🎬 Phim & Hội thoại", "🎬 Films & Conversations") },
    ] },
    { to: "#vn-practice-group", label: t("🎯 Luyện tập & Tương tác", "🎯 Practice & Interactive"), groupLabel: "vn-practice", children: [
      { to: "/learn-vietnamese?tab=game", label: t("🎮 Trò chơi", "🎮 Games") },
      { to: "/learn-vietnamese/daily", label: t("📅 Daily Vietnamese", "📅 Daily Vietnamese") },
      { to: "/learn-vietnamese/phrasebook", label: t("💬 Phrasebook tình huống", "💬 Situational Phrasebook") },
    ] },
    { to: "#vn-foreigners-group", label: t("🌏 Cho người học đặc biệt", "🌏 For Special Learners"), groupLabel: "vn-foreigners", children: [
      { to: "/learn-vietnamese/for-foreigners", label: t("🌏 Vietnamese for Foreigners", "🌏 Vietnamese for Foreigners") },
      { to: "/learn-vietnamese/kids-overseas", label: t("👨‍👩‍👧 Cho trẻ Việt kiều", "👨‍👩‍👧 For Overseas Vietnamese Kids") },
    ] },
    { to: "#vn-div2", label: "", divider: true },
    { to: "/songs/vietnamese", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    { to: "/speaking-coach/vietnamese", label: t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach") },
    { to: "/specialized-language?lang=vietnamese", label: t("🧠 AI Ngôn ngữ Chuyên ngành", "🧠 AI Specialized Language") },
  ];
  const finnishSubs: SubItem[] = [
    { to: "/finnish", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "#fi-div1", label: "", divider: true },
    { to: "/finnish/beginner", label: t("🌱 Người mới (A1–A2)", "🌱 Beginner (A1–A2)") },
    { to: "/finnish/yki-dashboard", label: t("❄️ YKI A2 Dashboard", "❄️ YKI A2 Dashboard") },
    { to: "/finnish/yki-b1", label: t("🎯 YKI B1 Dashboard", "🎯 YKI B1 Dashboard") },
    { to: "/finnish/life-in-finland", label: t("🇫🇮 Cuộc sống ở Phần Lan", "🇫🇮 Life in Finland") },
    { to: "#fi-div2", label: "", divider: true },
    { to: "/songs/finnish", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    { to: "/speaking-coach/finnish", label: t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach") },
    { to: "/specialized-language?lang=finnish", label: t("🧠 AI Ngôn ngữ Chuyên ngành", "🧠 AI Specialized Language") },
  ];
  const programmingSubs: SubItem[] = [
    { to: "/programming", label: t("Tổng quan", "Overview"), icon: Library },
    { to: "#prog-foundation-group", label: t("Lộ trình Cơ bản", "Foundation Track"), icon: GraduationCap, groupLabel: "prog-foundation", children: [
      { to: "/programming?pillar=python-pathway", label: t("Introduction to Programming", "Introduction to Programming"), icon: Code2 },
      { to: "/python-challenges", label: t("150 Thử thách Python", "150 Python Challenges"), icon: Trophy },
    ] },
    { to: "#prog-ai-data-group", label: t("AI & Data Engineering", "AI & Data Engineering"), icon: Sparkles, groupLabel: "prog-ai-data", children: [
      { to: "/programming/prog-ai-foundation", label: t("AI Foundation", "AI Foundation"), icon: Brain },
      { to: "/programming/prog-ml", label: t("Machine Learning", "Machine Learning"), icon: Bot },
      { to: "/programming/dl-foundations", label: t("Deep Learning", "Deep Learning"), icon: Network },
      { to: "/programming/reinforcement-learning", label: t("Reinforcement Learning", "Reinforcement Learning"), icon: Gamepad2 },
      { to: "#div-ai", label: "", divider: true },
      { to: "/programming/prog-sql", label: t("SQL & Database", "SQL & Database"), icon: Database },
      { to: "/programming/prog-data-pipeline", label: t("Data Engineer", "Data Engineer"), icon: Workflow },
      { to: "/programming/cloud-fundamentals", label: t("Cloud Engineer", "Cloud Engineer"), icon: Cloud },
    ] },
    { to: "#prog-software-web-group", label: t("Software & Web Engineering", "Software & Web Engineering"), icon: Settings2, groupLabel: "prog-software-web", children: [
      { to: "/programming?pillar=software-eng", label: t("Software & Web Engineering", "Software & Web Engineering"), icon: Settings2 },
      { to: "/programming/se-foundations/se-git", label: t("Git Branching Simulator", "Git Branching Simulator"), icon: Workflow },
      { to: "/programming/software-eng-interview", label: t("Software Engineer Interview", "Software Engineer Interview"), icon: MessagesSquare },
    ] },
    { to: "#prog-career-group", label: t("Sự nghiệp", "Career"), icon: Briefcase, groupLabel: "prog-career", children: [
      { to: "/programming/interview-questions", label: t("Câu hỏi Phỏng vấn", "Interview Questions"), icon: MessagesSquare },
      { to: "/programming/job-opportunities", label: t("Cơ hội Việc làm 🇫🇮", "Job Opportunities 🇫🇮"), icon: Target },
    ] },
  ];

  const studyAbroadSubs: SubItem[] = [
    { to: "/study-abroad", label: t("🌍 Tổng quan", "🌍 Overview"), icon: Compass },
    { to: "/global-scholarship", label: t("💰 Global Scholarship", "💰 Global Scholarship"), icon: Newspaper },
    { to: "/study-abroad/documents", label: t("📁 Hồ sơ của tôi", "📁 My Documents"), icon: FolderLock },
    { to: "/study-abroad/motivation-letter", label: t("✍️ Motivation Letter", "✍️ Motivation Letter"), icon: FileText },
    { to: "/study-abroad/sat", label: t("🧭 Lộ trình SAT", "🧭 SAT Roadmap"), icon: Compass },
    { to: "/study-abroad/phd", label: t("🎓 PhD Pathway", "🎓 PhD Pathway"), icon: GraduationCap },
  ];

  const baseLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain },
    { to: "/english", label: t("Học Tiếng Anh", "Learn English"), icon: BookOpen, subs: englishSubs, key: "en" },
    { to: "/chinese", label: t("Học Tiếng Trung", "Learn Chinese"), icon: Languages, subs: chineseSubs, key: "cn" },
    { to: "/learn-vietnamese", label: t("Học Tiếng Việt", "Learn Vietnamese"), icon: Globe, subs: vietnameseSubs, key: "vn" },
    { to: "/finnish", label: t("Học Tiếng Phần Lan", "Learn Finnish"), icon: Languages, subs: finnishSubs, key: "fi" },
    { to: "/programming", label: t("Học Lập Trình", "Learn Programming"), icon: Code2, subs: programmingSubs, key: "prog" },
    { to: "/study-abroad", label: t("Du Học", "Study Abroad"), icon: Briefcase, subs: studyAbroadSubs, key: "abroad" },
    { to: "/for-vietnamese-children", label: t("Vì Trẻ Em VN", "For Vietnamese Children"), icon: Heart },
  ];

  const navLinks = user
    ? isTeacher
      ? [...baseLinks, { to: "/dashboard", label: t("Dashboard", "Dashboard"), icon: LayoutDashboard }, { to: "/admin-dashboard", label: t("Quản trị", "Admin"), icon: Shield }]
      : [...baseLinks, { to: "/dashboard", label: t("Dashboard", "Dashboard"), icon: LayoutDashboard }]
    : baseLinks;

  // Hover bridge + intent debounce: opening is instant, closing is delayed
  // (~350ms) so the cursor can travel through the small gap between the
  // trigger and the dropdown without prematurely dismissing the menu.
  const HOVER_CLOSE_DELAY = 350;

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    // If the user moves to a different parent item, switch instantly and
    // also clear any pending submenu-close timer to avoid stale state.
    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
    if (dropdown !== key) setActiveSubmenu(null);
    setDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdown(null);
      setActiveSubmenu(null);
    }, HOVER_CLOSE_DELAY);
  };

  const toggleMobileExpand = (key: string) => {
    setMobileExpanded(prev => prev === key ? null : key);
  };

  return (
    <header className="flex flex-col">
      {/* Row 1: Branding - fixed on all devices */}
      <div
        className="w-full z-[60] bg-card border-b border-border fixed top-0"
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile/tablet: flex-col layout; Desktop: single row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:h-12">
            {/* Row 1a: Logo + hamburger (mobile/tablet) or Logo + slogan + auth (desktop) */}
            <div className="flex items-center justify-between h-12 lg:flex-1 min-w-0">
              <Link to="/" className="flex items-center gap-2 shrink-0 group">
                {/* Smiling teacher waving hello with gentle rocking animation */}
                <motion.img
                  src={teacherWave}
                  alt="HaiEduTech Teacher"
                  className="w-[42px] h-[42px] rounded-full object-cover border-2 border-primary/20"
                  animate={{
                    rotate: [0, -2, 2, -1.5, 1.5, 0],
                    scale: [1, 1.02, 1, 1.01, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 10,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                {/* Brand name - Space Grotesk + emerald with shimmer sweep & sparkle */}
                <span className="relative inline-flex items-center">
                  <span
                    className="brand-shimmer whitespace-nowrap"
                    style={{
                      fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                      lineHeight: 1,
                      letterSpacing: "0.005em",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    HaiEduTech
                  </span>
                  <Sparkles
                    className="brand-sparkle absolute -top-1 -right-3 w-3 h-3 text-amber-400"
                    style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.7))" }}
                  />
                </span>
              </Link>

              {/* Slogan centered between logo and auth - with periodic ripple */}
              <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-3 relative group/slogan">
                <div className="flex flex-col items-center relative overflow-hidden">
                  <span
                    className="slogan-text relative text-[11px] lg:text-xs uppercase font-semibold tracking-[0.18em] truncate"
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 }}
                  >
                    <span style={{ color: "#1A1A1A" }}>THE UNIQUE INTERSECTION OF </span>
                    <span style={{ color: "#10B981" }}>LANGUAGE</span>
                    <span style={{ color: "#1A1A1A" }}> & </span>
                    <span style={{ color: "#10B981" }}>TECHNOLOGY</span>
                    {/* Ripple overlay - CSS-only, hardware-accelerated */}
                    <span className="slogan-ripple" aria-hidden="true" />
                  </span>
                  {/* Elegant underline */}
                  <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" />
                </div>
                {/* Mascot speech bubble on hover */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/slogan:opacity-100 transition-opacity duration-300 pointer-events-none z-[100]">
                  <div className="bg-card border border-border rounded-lg px-3 py-1 shadow-lg text-[10px] font-medium text-foreground whitespace-nowrap">
                    🎓 The core foundation of your learning!
                  </div>
                </div>
              </div>

              {/* Auth + Lang on branding row (desktop only) */}
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                {user ? (
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      Hello, {displayName.split(" ")[0]}
                      {streak > 0 && (
                        <span title={t(`Chuỗi ${streak} ngày liên tục`, `${streak}-day streak`)}
                          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-[10px] font-bold">
                          <Flame className="w-3 h-3" />{streak}
                        </span>
                      )}
                      <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-lg z-[100] py-1 overflow-hidden"
                        >
                          <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                          </Link>
                          <div className="border-t border-border my-1" />
                          <button onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="w-3.5 h-3.5" /> {t("Đăng Xuất", "Logout")}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:brightness-110 transition-all">
                      <LogIn className="w-3.5 h-3.5" />
                      {t("Đăng Nhập", "Login")}
                    </Link>
                    <Link to="/signup" className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium border border-primary text-primary hover:bg-primary/10 transition-all">
                      <UserPlus className="w-3.5 h-3.5" />
                      {t("Đăng Ký", "Sign Up")}
                    </Link>
                  </>
                )}
                <GlobalSearch variant="icon" />
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  {lang === "vi" ? "EN" : "VI"}
                </button>
              </div>

              {/* Mobile: lang + hamburger - same row as logo */}
              <div className="flex items-center gap-1 lg:hidden">
                <GlobalSearch variant="icon" />
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(!open)} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Row 1b: Slogan on mobile - separate row, smaller text, centered */}
            <div className="lg:hidden text-center pb-1.5 -mt-1">
              <span
                className="text-[8px] sm:text-[10px] uppercase font-semibold tracking-[0.15em]"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 }}
              >
                <span style={{ color: "#1A1A1A" }}>THE UNIQUE INTERSECTION OF </span>
                <span style={{ color: "#10B981" }}>LANGUAGE</span>
                <span style={{ color: "#1A1A1A" }}> & </span>
                <span style={{ color: "#10B981" }}>TECHNOLOGY</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation - always sticky below Row 1 (desktop only) */}
      <nav
        className="w-full fixed top-12 z-50 bg-card border-b border-border hidden lg:block"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-11 gap-0.5">

            {navLinks.map((l) => {
              const active = location.pathname === l.to;
              if (l.subs) {
                return (
                  <div key={l.to} className="relative" onMouseEnter={() => handleMouseEnter(l.key!)} onMouseLeave={handleMouseLeave}>
                    <Link to={l.to}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}>
                      {l.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown === l.key ? "rotate-180" : ""}`} />
                    </Link>
                    <AnimatePresence>
                      {dropdown === l.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          // Invisible "hover bridge" via pt-2 + ::before pseudo-element keeps the
                          // pointer inside a hoverable region while traveling from the trigger.
                          // Re-entering the panel cancels the close timer (intent-based hover).
                          onMouseEnter={() => {
                            if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                          }}
                          onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-0 pt-2 w-64 z-50 before:content-[''] before:absolute before:-top-2 before:left-0 before:right-0 before:h-3"
                        >
                          <div className="bg-card rounded-xl shadow-xl border border-border py-2">
                          {l.subs.map((sub, i) => {
                            // Nested group with children (IELTS Program)
                            if (sub.children) {
                              return (
                                <div
                                  key={sub.groupLabel}
                                  className="relative"
                                  onMouseEnter={() => {
                                    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                                    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                                    setActiveSubmenu(sub.groupLabel!);
                                  }}
                                  onMouseLeave={() => {
                                    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), HOVER_CLOSE_DELAY);
                                  }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.025, duration: 0.18 }}
                                  >
                                    <div className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium cursor-pointer rounded-md mx-1 transition-colors ${
                                      activeSubmenu === sub.groupLabel ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                                    }`}>
                                      <span className="flex items-center gap-2.5">
                                        {sub.icon && <sub.icon className="w-4 h-4 text-primary/70" />}
                                        <span>{sub.label}</span>
                                      </span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </div>
                                  </motion.div>

                                  {/* Nested flyout sub-menu */}
                                  <AnimatePresence>
                                    {activeSubmenu === sub.groupLabel && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -6, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                        // Horizontal hover bridge (pl-2 + ::before) so the cursor can
                                        // travel from the parent row into the flyout without escaping.
                                        onMouseEnter={() => {
                                          if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                                          if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                                        }}
                                        className="absolute left-full top-0 pl-2 w-56 z-50 before:content-[''] before:absolute before:top-0 before:bottom-0 before:-left-2 before:w-3"
                                      >
                                        <div className="bg-card rounded-xl shadow-xl border border-border py-2">
                                        {/* Group header */}
                                        <div className="px-4 py-1.5 mb-1">
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                            {sub.groupLabel === "ielts" ? "IELTS Program"
                                              : sub.groupLabel === "national-exam" ? t("Luyện thi THPT", "National Exam Prep")
                                              : sub.groupLabel === "en-foundation" ? t("Nền tảng Anh ngữ", "English Foundation")
                                              : sub.groupLabel === "en-exams" ? t("Luyện thi Quốc tế", "International Exams")
                                              : sub.groupLabel === "prog-foundation" ? t("Lộ trình Cơ bản", "Foundation Track")
                                              : sub.groupLabel === "prog-ai-data" ? "AI & Data Engineering"
                                              : sub.groupLabel === "prog-software-web" ? "Software & Web Engineering"
                                              : sub.groupLabel === "prog-career" ? t("Sự nghiệp", "Career")
                                              : sub.groupLabel === "cn-hsk" ? t("Lộ trình HSK", "HSK Program")
                                              : sub.groupLabel === "cn-conv" ? t("Giao tiếp & Tương tác", "Conversational")
                                              : sub.groupLabel === "vn-curriculum" ? t("Chương trình học", "Curriculum")
                                              : sub.groupLabel === "vn-practice" ? t("Luyện tập & Tương tác", "Practice & Interactive")
                                              : sub.label}
                                          </span>
                                        </div>
                                        {sub.children.map((child, ci) => {
                                          if (child.divider) {
                                            return <div key={child.to} className="my-1.5 mx-3 h-px bg-border" />;
                                          }
                                          const ChildIcon = child.icon;
                                          return (
                                            <motion.div
                                              key={child.to}
                                              initial={{ opacity: 0, x: -6 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: ci * 0.04, duration: 0.16 }}
                                            >
                                              <Link
                                                to={child.to}
                                                onClick={() => { setDropdown(null); setActiveSubmenu(null); }}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-md mx-1"
                                              >
                                                {ChildIcon && <ChildIcon className="w-4 h-4 text-primary/70" />}
                                                <span>{child.label}</span>
                                              </Link>
                                            </motion.div>
                                          );
                                        })}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            }

                            // Divider
                            if (sub.divider) {
                              return <div key={sub.to + i} className="my-1.5 mx-3 h-px bg-border" />;
                            }

                            // Regular sub-item
                            const SubIcon = sub.icon;
                            return (
                              <motion.div key={sub.to + sub.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.025, duration: 0.18 }}>
                                <Link to={sub.to} onClick={() => setDropdown(null)}
                                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors rounded-md mx-1">
                                  {SubIcon && <SubIcon className="w-4 h-4 text-primary/70" />}
                                  <span>{sub.label}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={l.to} to={l.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}>
                  {l.label}
                </Link>
              );
            })}



          </div>
        </div>
      </nav>

      {/* Mobile menu - fullscreen overlay below branding */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed inset-y-0 right-0 z-[70] w-[88%] max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Close button header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
                <span className="font-display text-lg font-bold text-[#1A1A1A] tracking-wide">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-[#1A1A1A]" />
                </button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navLinks.map((l) => {
                  const Icon = l.icon;
                  const active = location.pathname === l.to;
                  const isExpanded = mobileExpanded === l.key;
                  return (
                    <div key={l.to}>
                      {/* Parent menu item */}
                      <div className="flex items-center">
                        <Link to={l.to} onClick={() => setOpen(false)}
                          className={`flex-1 flex items-center gap-3.5 px-4 py-4 rounded-xl text-base font-bold transition-all ${
                            active
                              ? "text-primary bg-primary/10"
                              : "text-[#1A1A1A] hover:bg-gray-100"
                          }`}>
                          <Icon className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-[#4B5563]"}`} />
                          <span>{l.label}</span>
                        </Link>
                        {l.subs && (
                          <button onClick={() => toggleMobileExpand(l.key!)}
                            className="p-4 text-[#4B5563] hover:text-[#1A1A1A] transition-colors rounded-xl hover:bg-gray-100">
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ease-out ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>

                      {/* Separator between major sections */}
                      {!l.subs && <div className="mx-3 border-b border-gray-200 my-1" />}

                      {/* Sub-items */}
                      {l.subs && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-5 pl-4 border-l-[3px] border-primary/30 space-y-0.5 py-2">
                                {l.subs.map((sub) => {
                                  // Nested group (IELTS / THPT) in mobile
                                  if (sub.children) {
                                    const isSubOpen = mobileSubExpanded === sub.groupLabel;
                                    return (
                                      <div key={sub.groupLabel}>
                                        <button
                                          onClick={() => setMobileSubExpanded(prev => prev === sub.groupLabel ? null : sub.groupLabel!)}
                                          className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-all ${
                                            isSubOpen
                                              ? "text-primary bg-primary/10"
                                              : "text-[#1A1A1A] hover:text-primary hover:bg-gray-50"
                                          }`}
                                        >
                                          <span>{sub.label}</span>
                                          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ease-out ${isSubOpen ? "rotate-90" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                          {isSubOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: "auto" }}
                                              exit={{ opacity: 0, height: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="ml-3 pl-3 border-l-[3px] border-accent/40 space-y-0.5 py-2">
                                                {sub.children.map((child) => {
                                                  if (child.divider) {
                                                    return <div key={child.to} className="my-1.5 mx-3 h-px bg-border" />;
                                                  }
                                                  const ChildIcon = child.icon;
                                                  const childActive = location.pathname === child.to;
                                                  return (
                                                    <Link
                                                      key={child.to}
                                                      to={child.to}
                                                      onClick={() => setOpen(false)}
                                                      className={`flex items-center gap-3 px-4 py-3.5 text-[15px] rounded-xl transition-all ${
                                                        childActive
                                                          ? "text-primary bg-primary/10 font-bold"
                                                          : "text-muted-foreground font-medium hover:text-primary hover:bg-secondary/50"
                                                      }`}
                                                    >
                                                      {ChildIcon && <ChildIcon className={`w-5 h-5 ${childActive ? "text-primary" : "text-primary/60"}`} />}
                                                      <span>{child.label}</span>
                                                    </Link>
                                                  );
                                                })}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }
                                  // Regular sub-item
                                  const subActive = location.pathname === sub.to;
                                  return (
                                    <Link key={sub.to + sub.label} to={sub.to} onClick={() => setOpen(false)}
                                      className={`block px-4 py-3.5 text-[15px] rounded-xl transition-all ${
                                        subActive
                                          ? "text-primary bg-primary/10 font-bold"
                                          : "text-[#4B5563] font-medium hover:text-primary hover:bg-gray-50"
                                      }`}>
                                      {sub.label}
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Separator after expanded section */}
                              <div className="mx-3 border-b border-gray-200 my-1" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sticky auth buttons at bottom */}
              <div className="sticky bottom-0 px-4 py-5 border-t border-border bg-background space-y-3">
                {user ? (
                  <>
                    <div className="text-center text-sm font-medium text-foreground mb-2 flex items-center justify-center gap-2">
                      <User className="w-4 h-4 inline" />
                      Hello, {displayName}
                      {streak > 0 && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-xs font-bold">
                          <Flame className="w-3.5 h-3.5" />{streak}
                        </span>
                      )}
                    </div>
                    <Link to="/dashboard" onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all">
                      <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all">
                      <LogOut className="w-5 h-5" /> {t("Đăng Xuất", "Logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all">
                      <LogIn className="w-5 h-5" /> {t("Đăng Nhập", "Login")}
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-[15px] font-bold border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                      <UserPlus className="w-5 h-5" /> {t("Đăng Ký", "Sign Up")}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer: mobile = branding only (48px), desktop = branding + nav (92px) */}
      {/* Spacer: mobile = branding+slogan (~60px), desktop = branding+nav (92px) */}
      <div className="h-[60px] lg:h-[92px]" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
