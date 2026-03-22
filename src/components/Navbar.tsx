import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, BookOpen, Languages, Code2, BarChart3, GraduationCap, Globe, UserPlus, LogIn, ChevronDown, Cpu, Sparkles, LogOut, Library, BookMarked, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import teacherLogo from "@/assets/teacher-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
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
  ];
  const chineseSubs = [
    { to: "/chinese", label: t("Tổng quan", "Overview") },
    { to: "/chinese#foundation", label: t("Nền tảng", "Foundation") },
    { to: "/chinese#hsk", label: "HSK 1-6" },
    { to: "/chinese#conversation", label: t("Giao tiếp", "Conversational") },
  ];
  const programmingSubs = [
    { to: "/programming", label: t("Tổng quan", "Overview") },
    { to: "/programming/prog-scratch", label: t("Scratch & Thuật toán", "Scratch & Algorithms") },
    { to: "/programming/prog-python-basic", label: t("Python cơ bản", "Python Basics") },
    { to: "/programming/prog-data-structures", label: t("Cấu trúc dữ liệu", "Data Structures") },
    { to: "/programming/prog-pygame", label: t("Game & Web", "Games & Web") },
    { to: "/python-challenges", label: t("🏆 150 Thử thách Python", "🏆 150 Python Challenges") },
    { to: "/programming/prog-sql", label: "SQL & Database" },
    { to: "/programming/prog-data-pipeline", label: "Data Pipeline" },
    { to: "/programming/prog-ml", label: "Machine Learning" },
  ];

  const navLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain },
    { to: "/english", label: t("Học Tiếng Anh", "Learn English"), icon: BookOpen, subs: englishSubs, key: "en" },
    { to: "/chinese", label: t("Học Tiếng Trung", "Learn Chinese"), icon: Languages, subs: chineseSubs, key: "cn" },
    { to: "/programming", label: t("Học Lập trình", "Learn Programming"), icon: Code2, subs: programmingSubs, key: "prog" },
    { to: "/smart-resources", label: t("Kho Học Liệu", "Smart Library"), icon: Library },
    { to: "/lesson-library", label: t("Bài Học AI", "AI Lessons"), icon: BookMarked },
    { to: "/ai-grading", label: t("Chấm Điểm IELTS", "IELTS Grading"), icon: Brain },
    { to: "/teacher-admin", label: t("Soạn bài", "Admin"), icon: Settings },
    { to: "/contact", label: t("Liên hệ", "Contact"), icon: UserPlus },
  ];

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setDropdown(null), 150);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={teacherLogo} alt="HaiEdu" className="w-9 h-9 rounded-lg object-cover" />
            <span className="font-display font-bold text-lg text-foreground">
              Hai<span className="text-primary">Edu</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((l) => {
              const active = location.pathname === l.to;
              if (l.subs) {
                return (
                  <div key={l.to} className="relative" onMouseEnter={() => handleMouseEnter(l.key!)} onMouseLeave={handleMouseLeave}>
                    <Link
                      to={l.to}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                    >
                      {l.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === l.key ? "rotate-180" : ""}`} />
                    </Link>
                    <AnimatePresence>
                      {dropdown === l.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl shadow-xl border border-border py-2 z-50"
                        >
                          {l.subs.map((sub) => (
                            <Link key={sub.to + sub.label} to={sub.to} onClick={() => setDropdown(null)}
                              className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={l.to} to={l.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Auth + Lang */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <LogOut className="w-4 h-4" />
                  {t("Đăng Xuất", "Logout")}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:brightness-110 transition-all">
                  <LogIn className="w-4 h-4" />
                  {t("Đăng Nhập", "Login")}
                </Link>
                <Link to="/signup" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium border border-primary text-primary hover:bg-primary/10 transition-all">
                  <UserPlus className="w-4 h-4" />
                  {t("Đăng Ký", "Sign Up")}
                </Link>
              </>
            )}
            <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Globe className="w-4 h-4" />
              {lang === "vi" ? "EN" : "VI"}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className="text-foreground p-2 text-sm font-medium">
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground p-2">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-card border-t border-border">
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((l) => {
                  const Icon = l.icon;
                  const active = location.pathname === l.to;
                  return (
                    <div key={l.to}>
                      <Link to={l.to} onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                        <Icon className="w-4 h-4" />
                        {l.label}
                      </Link>
                      {l.subs && (
                        <div className="ml-10 space-y-1 mt-1">
                          {l.subs.map((sub) => (
                            <Link key={sub.to + sub.label} to={sub.to} onClick={() => setOpen(false)} className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                    <Link to="/signup" onClick={() => setOpen(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium border border-primary text-primary">
                      <UserPlus className="w-4 h-4" /> {t("Đăng Ký", "Sign Up")}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Slogan bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-center gap-4">
          <BookOpen className="w-5 h-5 text-primary shrink-0" />
          <span className="font-display font-semibold text-lg text-foreground italic">
            "The Unique Intersection of Language & Technology"
          </span>
          <Cpu className="w-5 h-5 text-primary shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
