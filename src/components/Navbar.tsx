// HaiEduTech Navigation Bar
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Brain, BookOpen, Languages, Code2, GraduationCap,
  Globe, UserPlus, LogIn, ChevronDown, Cpu, LogOut, Library, Shield
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import teacherLogo from "@/assets/teacher-logo.png";
import teacherWave from "@/assets/teacher-wave.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user, isTeacher } = useUserRole();

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

  const englishSubs = [
    { to: "/english", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/english/cambridge", label: "🌟 Cambridge Starters–PET" },
    { to: "/english/ielts", label: t("🎯 Chương trình IELTS", "🎯 IELTS Program") },
    { to: "/ielts-writing-practice", label: t("✍️ Luyện viết IELTS", "✍️ IELTS Writing") },
    { to: "/ai-grading", label: t("📝 Chấm điểm IELTS", "📝 IELTS Grading") },
    { to: "/english/toeic", label: "💼 TOEIC" },
    { to: "/english/conversational", label: t("💬 Giao tiếp", "💬 Conversational") },
    { to: "/english/national-exam", label: t("🏫 Luyện thi THPT", "🏫 National Exam Prep") },
    { to: "/ai-grading", label: t("✍️ Chấm Điểm IELTS", "✍️ IELTS Grading") },
  ];
  const chineseSubs = [
    { to: "/chinese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/chinese/foundation", label: t("🏗️ Nền tảng", "🏗️ Foundation") },
    { to: "/chinese/hsk", label: "📊 HSK 1-6" },
    { to: "/chinese/conversational", label: t("💬 Giao tiếp", "💬 Conversational") },
  ];
  const programmingSubs = [
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
    ? [...baseLinks, { to: "/teacher-dashboard", label: t("Quản trị", "Admin"), icon: Shield }]
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
                <span className="text-xs lg:text-sm text-muted-foreground font-display font-medium italic tracking-[0.1em] truncate" style={{ fontVariant: "small-caps" }}>
                  The Unique Intersection of{" "}
                  <span className="font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[#10B981] bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>Language</span>
                  {" & "}
                  <span className="font-bold bg-gradient-to-r from-[#10B981] to-[hsl(var(--primary))] bg-clip-text text-transparent" style={{ fontFamily: "'Dancing Script', cursive" }}>Technology</span>
                </span>
              </div>

              {/* Auth + Lang on branding row (desktop only) */}
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <LogOut className="w-3.5 h-3.5" />
                      {t("Đăng Xuất", "Logout")}
                    </button>
                  </>
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
                <img src={teacherLogo} alt="HaiEduTech" className="w-7 h-7 rounded-md object-cover" />
                <span className="font-display font-bold text-sm text-foreground">
                  Hai<span className="text-primary">Edu</span><span className="text-muted-foreground text-xs font-normal">Tech</span>
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
                          className="absolute top-full left-0 mt-1 w-60 bg-card rounded-xl shadow-xl border border-border py-2 z-50"
                        >
                          {l.subs.map((sub, i) => (
                            <motion.div key={sub.to + sub.label}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.025, duration: 0.18 }}>
                              <Link to={sub.to} onClick={() => setDropdown(null)}
                                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors rounded-md mx-1">
                                {sub.label}
                              </Link>
                            </motion.div>
                          ))}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-[60px] z-40 bg-card/98 backdrop-blur-sm overflow-y-auto"
          >
            <div className="px-4 py-3 space-y-1 pb-20">
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = location.pathname === l.to;
                const isExpanded = mobileExpanded === l.key;
                return (
                  <div key={l.to}>
                    <div className="flex items-center">
                      <Link to={l.to} onClick={() => setOpen(false)}
                        className={`flex-1 flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                          active ? "text-primary bg-primary/10" : "text-foreground hover:bg-secondary"
                        }`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{l.label}</span>
                      </Link>
                      {l.subs && (
                        <button onClick={() => toggleMobileExpand(l.key!)}
                          className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {l.subs && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 pl-4 border-l-2 border-primary/20 space-y-0.5 py-1">
                              {l.subs.map((sub) => (
                                <Link key={sub.to + sub.label} to={sub.to} onClick={() => setOpen(false)}
                                  className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors">
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <div className="border-t border-border/50 pt-3 mt-3 space-y-1">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary">
                      Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setOpen(false); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-secondary">
                      <LogOut className="w-4 h-4" /> {t("Đăng Xuất", "Logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                      <LogIn className="w-4 h-4" /> {t("Đăng Nhập", "Login")}
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-sm font-medium border border-primary text-primary mt-1">
                      <UserPlus className="w-4 h-4" /> {t("Đăng Ký", "Sign Up")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer: mobile = branding only (48px), desktop = branding + nav (92px) */}
      {/* Spacer: mobile = branding+slogan (~60px), desktop = branding+nav (92px) */}
      <div className="h-[60px] md:h-12 lg:h-[92px]" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
