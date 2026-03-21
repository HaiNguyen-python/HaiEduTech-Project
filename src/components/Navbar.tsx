import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, BookOpen, Languages, Code2, BarChart3, GraduationCap, Globe, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain },
    { to: "/english", label: t("Tiếng Anh", "English"), icon: BookOpen },
    { to: "/chinese", label: t("Tiếng Trung", "Chinese"), icon: Languages },
    { to: "/programming", label: t("Lập trình", "Programming"), icon: Code2 },
    { to: "/ai-grading", label: t("Chấm điểm AI", "AI Grading"), icon: Brain },
    { to: "/dashboard", label: t("Bảng điều khiển", "Dashboard"), icon: BarChart3 },
    { to: "/register", label: t("Đăng ký", "Register"), icon: UserPlus },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Hai<span className="text-primary">Edu</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === "vi" ? "EN" : "VI"}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLang(lang === "vi" ? "en" : "vi")}
            className="text-foreground p-2 text-sm font-medium"
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-foreground p-2"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((l) => {
                const Icon = l.icon;
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
