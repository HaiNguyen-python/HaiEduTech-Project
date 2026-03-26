// HaiEduTech Navigation Bar with nested mega-menu for IELTS
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Brain, BookOpen, Languages, Code2, GraduationCap,
  Globe, UserPlus, LogIn, ChevronDown, ChevronRight, Cpu, LogOut, Library, Shield,
  FileText, PenTool, Map, MessageSquare, Award, School, Swords, User, LayoutDashboard
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import teacherLogo from "@/assets/teacher-logo.png";
import teacherWave from "@/assets/teacher-wave.png";

// Sub-item with optional icon and nested children
interface SubItem {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SubItem[];
  groupLabel?: string;
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
    { to: "/english/ielts", label: t("Tổng quan & Lộ trình", "Overview & Roadmap"), icon: Map },
    { to: "/ielts-vocabulary", label: t("Từ vựng IELTS", "IELTS Vocabulary"), icon: BookOpen },
    { to: "/vocab-arena", label: t("Vocab Arena", "Vocab Arena"), icon: Swords },
    { to: "/ielts-sample-essays", label: t("Bài mẫu 8.0+", "Sample Essays 8.0+"), icon: FileText },
    { to: "/ielts-writing-practice", label: t("Luyện viết", "Writing Practice"), icon: PenTool },
    { to: "/ielts-speaking-practice", label: t("Luyện nói", "Speaking Practice"), icon: MessageSquare },
    { to: "/ai-grading", label: t("Chấm điểm", "Grading Portal"), icon: Cpu },
  ];

  // National Exam nested sub-items
  const nationalExamChildren: SubItem[] = [
    { to: "/english/national-exam", label: t("Khóa luyện thi TN THPT", "National Exam Course"), icon: BookOpen },
    { to: "/national-exam", label: t("Phòng luyện thi TN THPT", "Exam Practice Room"), icon: FileText },
  ];

  const englishSubs: SubItem[] = [
    { to: "/english", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/english/cambridge", label: "🌟 Cambridge Starters–PET" },
    { to: "#ielts-group", label: t("🎯 IELTS Program", "🎯 IELTS Program"), groupLabel: "ielts", children: ieltsChildren },
    { to: "/english/toeic", label: "💼 TOEIC" },
    { to: "/english/conversational", label: t("💬 Giao tiếp", "💬 Conversational") },
    { to: "#national-exam-group", label: t("🏫 Luyện thi THPT", "🏫 National Exam Prep"), groupLabel: "national-exam", children: nationalExamChildren },
  ];
  const chineseSubs: SubItem[] = [
    { to: "/chinese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/chinese/foundation", label: t("🏗️ Nền tảng", "🏗️ Foundation") },
    { to: "/chinese/hsk", label: "📊 HSK 1-6" },
    { to: "/chinese/hsk/vocabulary", label: t("📖 HSK Vocabulary", "📖 HSK Vocabulary") },
    { to: "/chinese/conversational", label: t("💬 Giao tiếp", "💬 Conversational") },
    { to: "/chinese/conversational/curriculum", label: t("🎯 Chương trình Tương tác", "🎯 Interactive Curriculum") },
  ];
  const programmingSubs: SubItem[] = [
    { to: "/programming", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/python-challenges", label: t("🏆 150 Thử thách Python", "🏆 150 Python Challenges") },
    { to: "/programming/prog-ai-foundation", label: "🧠 AI Foundation" },
    { to: "/programming/prog-sql", label: "🗄️ SQL & Database" },
    { to: "/programming/prog-data-pipeline", label: "🔄 Data Engineer" },
    { to: "/programming/prog-ml", label: "🤖 Machine Learning Engineer" },
  ];

  const baseLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain },
    { to: "/english", label: t("Học Tiếng Anh", "Learn English"), icon: BookOpen, subs: englishSubs, key: "en" },
    { to: "/chinese", label: t("Học Tiếng Trung", "Learn Chinese"), icon: Languages, subs: chineseSubs, key: "cn" },
    { to: "/programming", label: t("Học Lập Trình", "Learn Programming"), icon: Code2, subs: programmingSubs, key: "prog" },
    { to: "/ai-library", label: t("Thư Viện", "Library"), icon: Library },
    { to: "/contact", label: t("Liên hệ", "Contact"), icon: UserPlus },
  ];

  const navLinks = isTeacher
    ? [...baseLinks, { to: "/admin-dashboard", label: t("Quản trị", "Admin"), icon: Shield }]
    : baseLinks;

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdown(null), 150);
  };

  const toggleMobileExpand = (key: string) => {
    setMobileExpanded(prev => prev === key ? null : key);
  };

  return (
    <header className="flex flex-col">
      {/* Row 1: Branding — fixed on all devices */}
      <div
        className={`w-full z-50 bg-card border-b border-border transition-all duration-300 fixed ${
          scrolled ? "lg:-top-12 lg:opacity-0 lg:pointer-events-none top-0" : "top-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile: flex-col layout; Desktop: single row */}
          <div className="flex flex-col md:flex-row md:items-center md:h-12">
            {/* Row 1a: Logo + hamburger (mobile) or Logo + slogan + auth (desktop) */}
            <div className="flex items-center justify-between h-12 md:flex-1 min-w-0">
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
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-display text-lg whitespace-nowrap tracking-wider"
                >
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent font-medium">
                    HaiEdu
                  </span>
                  <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-bold">
                    Tech
                  </span>
                </motion.span>
              </Link>

              {/* Slogan centered between logo and auth */}
              <div className="hidden md:flex items-center justify-center flex-1 min-w-0 mx-3">
                <span className="text-sm lg:text-base text-foreground font-display font-extrabold tracking-[0.08em] truncate" style={{ fontVariant: "small-caps" }}>
                  The Unique Intersection of{" "}
                  <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(160,84%,39%)] bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>Language</span>
                  {" & "}
                  <span className="bg-gradient-to-r from-[hsl(160,84%,39%)] to-[hsl(var(--primary))] bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>Technology</span>
                </span>
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
                      <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-xl shadow-lg z-50 py-1 overflow-hidden"
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
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  {lang === "vi" ? "EN" : "VI"}
                </button>
              </div>

              {/* Mobile: lang + hamburger — same row as logo */}
              <div className="flex items-center gap-1 md:hidden">
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(!open)} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Row 1b: Slogan on mobile — separate row, smaller text, centered */}
            <div className="md:hidden text-center pb-1.5 -mt-1">
              <span className="text-[11px] text-muted-foreground/70 italic font-light tracking-wide">
                Học thông minh • Dẫn đầu kỷ nguyên số
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation — always sticky (desktop only) */}
      <nav
        className={`w-full fixed z-50 bg-card/95 backdrop-blur-md border-b border-border transition-all duration-300 hidden lg:block ${
          scrolled ? "top-0 shadow-sm" : "top-12"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-11 gap-0.5">
            {/* Show logo in nav row when scrolled */}
            {scrolled && (
              <Link to="/" className="flex items-center gap-2 mr-4 pr-4 border-r border-border/50">
                <img src={teacherWave} alt="HaiEduTech" className="w-7 h-7 rounded-full object-cover border border-primary/20" />
                <span className="font-display text-sm whitespace-nowrap tracking-wider">
                  <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent font-medium">HaiEdu</span>
                  <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-bold">Tech</span>
                </span>
              </Link>
            )}
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
                          className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl shadow-xl border border-border py-2 z-50"
                        >
                          {l.subs.map((sub, i) => {
                            // Nested group with children (IELTS Program)
                            if (sub.children) {
                              return (
                                <div
                                  key={sub.groupLabel}
                                  className="relative"
                                  onMouseEnter={() => {
                                    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                                    setActiveSubmenu(sub.groupLabel!);
                                  }}
                                  onMouseLeave={() => {
                                    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), 120);
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
                                      <span>{sub.label}</span>
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
                                        className="absolute left-full top-0 ml-1 w-56 bg-card rounded-xl shadow-xl border border-border py-2 z-50"
                                      >
                                        {/* Group header */}
                                        <div className="px-4 py-1.5 mb-1">
                                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                            {sub.groupLabel === "ielts" ? "IELTS Program" : t("Luyện thi THPT", "National Exam Prep")}
                                          </span>
                                        </div>
                                        {sub.children.map((child, ci) => {
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
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            }

                            // Regular sub-item
                            return (
                              <motion.div key={sub.to + sub.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.025, duration: 0.18 }}>
                                <Link to={sub.to} onClick={() => setDropdown(null)}
                                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors rounded-md mx-1">
                                  {sub.label}
                                </Link>
                              </motion.div>
                            );
                          })}
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

            {/* Show auth in nav row when scrolled */}
            {scrolled && (
              <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-border/50">
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">Dashboard</Link>
                    <button onClick={handleLogout} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:brightness-110">
                      <LogIn className="w-3.5 h-3.5" />{t("Đăng Nhập", "Login")}
                    </Link>
                  </>
                )}
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                  className="px-2 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <Globe className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu — fullscreen overlay below branding */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-[60] bg-foreground/30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed inset-y-0 right-0 z-[70] w-[88%] max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col"
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
                                                          : "text-[#4B5563] font-medium hover:text-primary hover:bg-gray-50"
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
              <div className="sticky bottom-0 px-4 py-5 border-t border-gray-200 bg-white space-y-3">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all">
                      Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-[15px] font-semibold text-[#4B5563] hover:text-[#1A1A1A] hover:bg-gray-100 transition-all">
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
      <div className="h-[60px] md:h-12 lg:h-[92px]" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
