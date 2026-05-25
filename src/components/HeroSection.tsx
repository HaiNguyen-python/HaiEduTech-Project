/**
 * @file HeroSection.tsx
 * @description Landing page hero section for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, Languages, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import FloatingParticles from "@/components/FloatingParticles";
import TechParticles from "@/components/TechParticles";
import TypingHeadline from "@/components/TypingHeadline";
import LearningJourneyTimeline from "@/components/LearningJourneyTimeline";
import FloatingChibi from "@/components/FloatingChibi";
import chibiRocket from "@/assets/chibi-rocket.png";
import heroBg from "@/assets/hero-bg.jpg";
import haiProfile from "@/assets/hai-profile.webp";

const HeroSection = () => {
  const { t } = useLanguage();
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // Spotlight follow cursor — desktop only, throttled via rAF
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;
    const el = spotlightRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsl(var(--primary) / 0.10), transparent 55%)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-8 sm:py-10 lg:min-h-[90vh]">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" width="1920" height="1080" fetchPriority="high" decoding="async" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
      </div>

      {/* EduTech canvas particles (desktop only) */}
      <TechParticles count={22} />

      {/* Spotlight follow cursor */}
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden />

      <FloatingParticles count={34} />

      {/* Aurora blobs */}
      <div className="absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl animate-aurora-drift sm:left-1/4 sm:top-1/4 sm:h-64 sm:w-64 sm:translate-x-0" />
      <div className="absolute bottom-20 right-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl animate-aurora-drift sm:bottom-1/3 sm:right-1/4 sm:h-80 sm:w-80" style={{ animationDelay: "4s", animationDuration: "26s" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center sm:mb-10"
          >
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-medium text-primary sm:px-5 sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span className="truncate">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[320px] shrink-0 sm:max-w-[360px]"
            >
              <div className="aspect-square overflow-hidden rounded-[1.75rem] border-4 border-primary/20 shadow-2xl shadow-primary/15 ring-1 ring-primary/10">
                <img src={haiProfile} alt="Teacher Hai" width="720" height="720" fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="mb-4 font-display text-3xl font-bold leading-[1.08] text-foreground sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block sm:inline">{t("Học ", "Learn ")}</span>
                <span className="block text-gradient sm:inline">{t("hiệu quả hơn", "more effectively")}</span>
                <span className="block sm:inline">{t(" cùng ", " with ")}</span>
                <span className="block text-gradient sm:inline">{t("Thầy Hải", "Teacher Hai")}</span>
              </h1>

              <div className="mb-4 text-center font-display text-lg font-semibold text-muted-foreground sm:text-xl lg:text-left">
                <span>{t("Chinh phục ", "Master ")}</span>
                <TypingHeadline
                  words={
                    t("vi", "en") === "vi"
                      ? ["IELTS", "TOEIC", "HSK", "AI", "Lập trình"]
                      : ["IELTS", "TOEIC", "HSK", "AI", "Coding"]
                  }
                />
              </div>

              <p className="mx-auto mb-6 max-w-md px-1 text-[15px] leading-7 text-muted-foreground sm:mb-8 sm:max-w-xl sm:px-0 sm:text-base md:text-lg lg:mx-0">
                {t(
                  "Chinh phục Tiếng Anh, Tiếng Trung và Lập trình cùng thầy Hải – Thạc sĩ Ngôn ngữ & Văn hóa Anh, Kỹ sư Dữ liệu & Trí tuệ nhân tạo tại Phần Lan.",
                  "Master English, Chinese and Programming with Teacher Hai – M.A. in English Language & Culture and a Data & AI Engineer in Finland."
                )}
              </p>


              <div className="mx-auto flex w-full max-w-sm flex-col gap-3 lg:mx-0">
                <Link
                  to="/english"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:brightness-110"
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>{t("Các khóa Tiếng Anh", "English Courses")}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <Link
                  to="/chinese"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-destructive/90 px-5 py-3 text-sm font-semibold text-destructive-foreground shadow-lg shadow-destructive/20 transition-all hover:brightness-110"
                >
                  <Languages className="h-4 w-4 shrink-0" />
                  <span>{t("Các khóa Tiếng Trung", "Chinese Courses")}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <Link
                  to="/programming"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:brightness-110"
                >
                  <Code2 className="h-4 w-4 shrink-0" />
                  <span>{t("Các khóa Lập trình", "Programming Courses")}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              </div>
            </motion.div>
          </div>

          <LearningJourneyTimeline />
        </div>
      </div>

      {/* Chibi decoration — bottom-right of hero */}
      <FloatingChibi src={chibiRocket} alt="" className="absolute right-[3%] bottom-[8%] z-20 opacity-90 hidden lg:block" size={110} delay={0.6} />
    </section>
  );
};

export default HeroSection;
