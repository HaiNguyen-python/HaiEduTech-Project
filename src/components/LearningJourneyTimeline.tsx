/**
 * @file LearningJourneyTimeline.tsx
 * @description Timeline học tập của thầy Hải với chibi du hành theo trục thời gian.
 * Chibi tự động di chuyển vô hạn dọc trục thời gian, mỗi mốc có icon + thông tin.
 */
import { motion } from "framer-motion";
import { GraduationCap, Code2, BookOpen, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import chibiTraveler from "@/assets/teacher-hai-chibi-traveler.png";

const LearningJourneyTimeline = () => {
  const { t } = useLanguage();

  const milestones = [
    {
      icon: GraduationCap,
      value: t("Cử nhân", "B.A."),
      label: t("TEFL – Giảng dạy Tiếng Anh", "TEFL – Teaching English"),
      place: t("ĐH Sư phạm TP.HCM", "HCMC University of Education"),
      year: "2018",
      flag: "🇻🇳",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: GraduationCap,
      value: t("Thạc sĩ", "M.A."),
      label: t("Ngôn ngữ & Văn hóa Anh", "English Language & Culture"),
      place: t("ĐH Đông Phần Lan", "University of Eastern Finland"),
      year: "2020",
      flag: "🇫🇮",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: Code2,
      value: t("Kỹ sư", "Engineer"),
      label: t("Dữ Liệu & Trí Tuệ Nhân Tạo", "Data & AI"),
      place: t("ĐH Khoa học Ứng dụng Turku", "Turku University of Applied Sciences"),
      year: "2026",
      flag: "🇫🇮",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      icon: GraduationCap,
      value: t("Thạc sĩ", "M.A."),
      label: t("Công nghệ Ngôn ngữ", "Language Technology"),
      place: t("ĐH Helsinki", "University of Helsinki"),
      year: t("Đang học", "Current"),
      flag: "🇫🇮",
      color: "from-indigo-500 to-violet-500",
    },
    {
      icon: BookOpen,
      value: "15+",
      label: t("Năm kinh nghiệm giảng dạy", "Years Teaching Experience"),
      place: t("Việt Nam – Phần Lan", "Vietnam – Finland"),
      year: t("Từ 2011", "Since 2011"),
      flag: "🇻🇳🇫🇮",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mx-auto mt-12 max-w-6xl pb-20 sm:pb-0"
    >
      <div className="glass-card rounded-3xl px-4 py-8 sm:px-8 sm:py-10 relative overflow-hidden">
        {/* Section header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t("Hành trình học tập của Thầy Hải", "Teacher Hai's Learning Journey")}
          </div>
          <p className="text-sm text-muted-foreground">
            {t("Du hành cùng thầy qua các cột mốc tri thức", "Travel with teacher across knowledge milestones")}
          </p>
        </div>

        {/* DESKTOP: Horizontal timeline */}
        <div className="hidden lg:block relative px-8 pt-8 pb-4">
          {/* Track line with gradient */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-emerald-400 via-sky-400 via-indigo-400 via-violet-400 to-amber-400 rounded-full opacity-60" />
          {/* Dashed overlay for path effect */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-white/40 dark:border-white/20" />

          {/* Chibi traveler — animated infinite loop */}
          <motion.div
            className="absolute top-1/2 -translate-y-[calc(50%+60px)] z-30 pointer-events-none"
            initial={{ left: "3%" }}
            animate={{ left: ["3%", "97%", "3%"] }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={chibiTraveler}
                alt={t("Chibi thầy Hải du hành", "Teacher Hai chibi traveling")}
                width={80}
                height={80}
                loading="lazy"
                className="w-20 h-20 drop-shadow-[0_8px_16px_hsl(var(--primary)/0.3)]"
              />
            </motion.div>
            {/* Sparkle trail */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-yellow-400 text-xl"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Milestone nodes */}
          <div className="relative grid grid-cols-5 gap-2">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex flex-col items-center group"
                >
                  {/* Year badge above */}
                  <div className="mb-3 px-2.5 py-0.5 rounded-full bg-background border border-border text-[11px] font-bold text-primary shadow-sm">
                    {m.year}
                  </div>
                  {/* Node circle */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg ring-4 ring-background z-10 cursor-pointer`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <span className="absolute -top-1 -right-1 text-base">{m.flag}</span>
                  </motion.div>
                  {/* Info card */}
                  <div className="mt-4 text-center px-1">
                    <div className="font-display text-base font-bold text-foreground">{m.value}</div>
                    <div className="mt-0.5 text-[11px] font-medium leading-4 text-foreground/85 line-clamp-2">{m.label}</div>
                    <div className="mt-0.5 text-[10px] leading-3 text-muted-foreground line-clamp-2">{m.place}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* MOBILE/TABLET: Vertical timeline */}
        <div className="lg:hidden relative pl-16 pr-2">
          {/* Vertical track */}
          <div className="absolute left-8 top-2 bottom-2 w-1.5 bg-gradient-to-b from-emerald-400 via-sky-400 via-indigo-400 via-violet-400 to-amber-400 rounded-full opacity-60" />

          {/* Chibi vertical traveler */}
          <motion.div
            className="absolute left-8 -translate-x-[calc(50%+30px)] z-30 pointer-events-none"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "95%", "0%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={chibiTraveler}
                alt={t("Chibi thầy Hải", "Teacher Hai chibi")}
                width={64}
                height={64}
                loading="lazy"
                className="w-16 h-16 drop-shadow-[0_4px_12px_hsl(var(--primary)/0.3)]"
              />
            </motion.div>
          </motion.div>

          {/* Milestones */}
          <div className="space-y-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="relative flex items-start gap-4"
                >
                  {/* Node */}
                  <div className={`absolute -left-[42px] w-12 h-12 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg ring-4 ring-background z-10`}>
                    <Icon className="w-5 h-5 text-white" />
                    <span className="absolute -top-1 -right-1 text-sm">{m.flag}</span>
                  </div>
                  {/* Card */}
                  <div className="flex-1 bg-card/60 border border-border rounded-xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-base font-bold text-foreground">{m.value}</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">{m.year}</span>
                    </div>
                    <div className="text-[12px] font-medium text-foreground/85">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{m.place}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningJourneyTimeline;
