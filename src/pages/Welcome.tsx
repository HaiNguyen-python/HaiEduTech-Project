/**
 * @file Welcome.tsx
 * @description Splash welcome screen shown on first visit per session, then redirects to home.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import logo from "@/assets/teacher-logo.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const AUTO_REDIRECT_MS = 3500;

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    sessionStorage.setItem("haiedu_welcomed", "1");
    const timer = setTimeout(() => navigate("/home", { replace: true }), AUTO_REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  const enterNow = () => navigate("/home", { replace: true });

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10" />
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/40"
          style={{ left: `${15 + i * 13}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, bounce: 0.5 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-500 blur-2xl opacity-40 rounded-full" />
            <img
              src={logo}
              alt="HaiEduTech logo"
              className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </motion.div>

        {/* Welcome */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl font-bold mb-3"
        >
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] bg-clip-text text-transparent">
            {t("Chào mừng đến với HaiEduTech", "Welcome to HaiEduTech")}
          </span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-base sm:text-xl text-muted-foreground font-medium mb-2"
        >
          {t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-sm text-muted-foreground/70 mb-10"
        >
          {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}
        </motion.p>

        {/* Enter button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          onClick={enterNow}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          {t("Vào trang chính", "Enter Site")}
        </motion.button>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_REDIRECT_MS / 1000, ease: "linear" }}
          className="mt-8 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full mx-auto max-w-xs"
        />
      </div>
    </div>
  );
};

export default Welcome;
