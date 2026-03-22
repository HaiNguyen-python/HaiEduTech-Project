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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const englishSubs = [
    { to: "/english", label: t("Tổng quan", "Overview") },
    { to: "/english#starters", label: "Starters - Movers - Flyers" },
    { to: "/english#ket-pet", label: "KET / PET" },
    { to: "/english#ielts", label: "IELTS" },
    { to: "/english#toeic", label: "TOEIC" },
    { to: "/english#conversation", label: t("Giao tiếp", "Conversational") },
    { to: "/english#thpt", label: t("Luyện thi THPT", "National Exam Prep") },
    { to: "/ai-grading", label: t("✍️ Chấm Điểm IELTS", "✍️ IELTS Grading") },
  ];
  const chineseSubs = [
    { to: "/chinese", label: t("Tổng quan", "Overview") },
    { to: "/chinese#foundation", label: t("Nền tảng", "Foundation") },
    { to: "/chinese#hsk", label: "HSK 1-6" },
    { to: "/chinese#conversation", label: t("Giao tiếp", "Conversational") },
  ];
  const programmingSubs = [
    { to: "/programming", label: t("Tổng quan", "Overview") },
    { to: "/python-challenges", label: t("🏆 150 Thử thách Python", "🏆 150 Python Challenges") },
    { to: "/programming/prog-scratch", label: t("🧩 Scratch & Thuật toán", "🧩 Scratch & Algorithms") },
    { to: "/programming/prog-python-basic", label: t("🐍 Python cơ bản", "🐍 Python Basics") },
    { to: "/programming/prog-data-structures", label: t("🏗️ Cấu trúc dữ liệu", "🏗️ Data Structures") },
    { to: "/programming/prog-pygame", label: t("🎮 Game & Web", "🎮 Games & Web") },
    { to: "/programming/prog-sql", label: "🗄️ SQL & Database" },
    { to: "/programming/prog-data-pipeline", label: "🔄 Data Pipeline" },
    { to: "/programming/prog-ml", label: "🤖 Machine Learning" },
  ];

  const baseLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain },
    { to: "/english", label: t("Học Tiếng Anh", "Learn English"), icon: BookOpen, subs: englishSubs, key: "en" },
    { to: "/chinese", label: t("Học Tiếng Trung", "Learn Chinese"), icon: Languages, subs: chineseSubs, key: "cn" },
    { to: "/programming", label: t("Học Lập trình", "Learn Programming"), icon: Code2, subs: programmingSubs, key: "prog" },
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
      {/* Row 1: Branding — scrolls away */}
      <div
        className={`w-full z-50 bg-card border-b border-border transition-all duration-300 ${
          scrolled ? "fixed -top-12 opacity-0 pointer-events-none" : "fixed top-0"
        }`}
      >
        <div className="container mx-auto px-6 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={teacherLogo} alt="HaiEdu" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-display font-bold text-lg text-foreground">
              Hai<span className="text-primary">Edu</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-primary/60" />
            <span className="text-sm text-muted-foreground italic font-light tracking-wide">
              The Unique Intersection of Language & Technology
            </span>
            <Cpu className="w-4 h-4 text-primary/60" />
          </div>

          {/* Auth + Lang on branding row */}
          <div className="hidden lg:flex items-center gap-1.5">
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

          {/* Mobile: lang + hamburger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className="text-foreground p-2">
              <Globe className="w-4 h-4" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground p-2">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation — always sticky */}
      <nav
        className={`w-full fixed z-50 bg-card/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
          scrolled ? "top-0 shadow-sm" : "top-12"
        }`}
      >
        <div className="container mx-auto px-6">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-center h-11 gap-0.5">
            {/* Show logo in nav row when scrolled */}
            {scrolled && (
              <Link to="/" className="flex items-center gap-2 mr-4 pr-4 border-r border-border/50">
                <img src={teacherLogo} alt="HaiEdu" className="w-7 h-7 rounded-md object-cover" />
                <span className="font-display font-bold text-sm text-foreground">
                  Hai<span className="text-primary">Edu</span>
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

          {/* Mobile: show nothing in nav row, menu is in mobile drawer */}
          <div className="lg:hidden h-0" />
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-card border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
                {navLinks.map((l) => {
                  const Icon = l.icon;
                  const active = location.pathname === l.to;
                  const isExpanded = mobileExpanded === l.key;
                  return (
                    <div key={l.to}>
                      <div className="flex items-center">
                        <Link to={l.to} onClick={() => setOpen(false)}
                          className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                            active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                          }`}>
                          <Icon className="w-4 h-4" />
                          {l.label}
                        </Link>
                        {l.subs && (
                          <button onClick={() => toggleMobileExpand(l.key!)}
                            className="p-2.5 text-muted-foreground hover:text-foreground transition-colors">
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
                                    className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors">
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

                <div className="border-t border-border/50 pt-3 mt-3">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
                        Dashboard
                      </Link>
                      <button onClick={() => { handleLogout(); setOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
                        <LogOut className="w-4 h-4" /> {t("Đăng Xuất", "Logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium bg-primary text-primary-foreground">
                        <LogIn className="w-4 h-4" /> {t("Đăng Nhập", "Login")}
                      </Link>
                      <Link to="/signup" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium border border-primary text-primary mt-1">
                        <UserPlus className="w-4 h-4" /> {t("Đăng Ký", "Sign Up")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer: branding (48px) + nav (44px) = 92px → pt-24 (96px) */}
      <div className="h-[92px]" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
