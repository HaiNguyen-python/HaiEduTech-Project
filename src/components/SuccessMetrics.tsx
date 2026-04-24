import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mic, PenTool, GraduationCap, Languages, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Signature Features section
 * Replaces the generic "Proven Results" stats with direct entry points
 * to the platform's most distinctive learning tools.
 */
const SuccessMetrics = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Mic,
      titleVi: "AI Speaking Coach Đa Ngôn Ngữ",
      titleEn: "Multilingual AI Speaking Coach",
      descVi: "Luyện phát âm Anh • Trung • Việt • Phần Lan với chấm điểm AI thời gian thực, IPA và Pinyin.",
      descEn: "Practice English • Chinese • Vietnamese • Finnish with real-time AI scoring, IPA and Pinyin.",
      gradient: "from-sky-500 via-blue-500 to-indigo-600",
      glow: "shadow-sky-500/30",
      links: [
        { to: "/speaking-coach/english", label: "EN", flag: "🇬🇧" },
        { to: "/speaking-coach/chinese", label: "ZH", flag: "🇨🇳" },
        { to: "/speaking-coach/vietnamese", label: "VI", flag: "🇻🇳" },
        { to: "/speaking-coach/finnish", label: "FI", flag: "🇫🇮" },
      ],
    },
    {
      icon: PenTool,
      titleVi: "IELTS Writing & Speaking",
      titleEn: "IELTS Writing & Speaking",
      descVi: "Chấm bài Writing chi tiết theo 4 tiêu chí, Speaking với live transcription và nâng cấp Band 7.5+.",
      descEn: "Detailed Writing scoring on 4 criteria, Speaking with live transcription and Band 7.5+ upgrades.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      glow: "shadow-emerald-500/30",
      links: [
        { to: "/ielts-writing-practice", label: t("Writing", "Writing"), flag: "✍️" },
        { to: "/ielts-speaking", label: t("Speaking", "Speaking"), flag: "🎙️" },
        { to: "/ai-grading", label: t("AI Grading", "AI Grading"), flag: "🤖" },
      ],
    },
    {
      icon: GraduationCap,
      titleVi: "Cambridge Lectures",
      titleEn: "Cambridge Lectures",
      descVi: "95 bài giảng chuyên sâu từ Starters đến PET, gồm chiến thuật và 10 đề thi mẫu.",
      descEn: "95 in-depth lectures from Starters to PET, with strategies and 10 mock exams.",
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      glow: "shadow-amber-500/30",
      links: [
        { to: "/cambridge-lectures", label: t("Bài giảng", "Lectures"), flag: "🎓" },
        { to: "/cambridge-test-prep", label: t("Luyện đề", "Test Prep"), flag: "📝" },
      ],
    },
    {
      icon: Languages,
      titleVi: "HSK Program 1–6",
      titleEn: "HSK Program 1–6",
      descVi: "1100+ từ vựng có Hanzi/Pinyin, hướng dẫn thi HSK & HSKK đầy đủ, bài giảng tương tác.",
      descEn: "1100+ vocabulary with Hanzi/Pinyin, full HSK & HSKK exam guides, interactive lessons.",
      gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
      glow: "shadow-rose-500/30",
      links: [
        { to: "/chinese/hsk-guide", label: t("Hướng dẫn HSK", "HSK Guide"), flag: "🎓" },
        { to: "/chinese", label: t("Khóa học", "Courses"), flag: "📚" },
      ],
    },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("Tính năng nổi bật", "Signature Features")}</span>
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Khám phá ", "Explore Our ")}
            <span className="text-gradient">{t("công cụ học tập độc đáo", "Unique Learning Tools")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Bốn hệ thống chủ lực giúp học viên HaiEduTech bứt phá nhanh chóng. Bấm vào để vào học ngay.",
              "Four flagship systems that help HaiEduTech learners break through fast. Tap to start learning."
            )}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-5 sm:gap-6 md:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleEn}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-7"
              >
                {/* Gradient halo */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
                />

                {/* Icon */}
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow}`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3 className="mb-2 font-display text-lg font-bold text-foreground sm:text-xl">
                  {t(feature.titleVi, feature.titleEn)}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-7 text-muted-foreground">
                  {t(feature.descVi, feature.descEn)}
                </p>

                {/* Quick links */}
                <div className="flex flex-wrap gap-2">
                  {feature.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground sm:text-sm"
                    >
                      <span aria-hidden>{link.flag}</span>
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
