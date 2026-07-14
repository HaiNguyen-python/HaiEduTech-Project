/**
 * @file LifestyleAcademy.tsx
 * @description Premium curriculum hub for soft skills — smart finance,
 *              eloquence & etiquette, grace & presence, and mental
 *              resilience. Includes a filterable pillar grid and an
 *              interactive daily-reflection micro-coach widget.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  MessageSquareQuote,
  Compass,
  Anchor,
  Search,
  Sparkles,
  Clock,
  Play,
  BookOpen,
  Headphones,
  ArrowRight,
  Heart,
  Brain,
  Zap,
  Flame,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

// ─────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────
type PillarKey = "finance" | "etiquette" | "grace" | "resilience";

interface PillarHighlight {
  vi: string;
  en: string;
}

interface Pillar {
  key: PillarKey;
  iconBg: string;              // Tailwind gradient classes for the icon tile
  ring: string;                // Focus/hover ring color for the card
  accentText: string;          // Accent text color
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  sampleCourseVi: string;
  sampleCourseEn: string;
  highlights: PillarHighlight[];
  Icon: typeof Wallet;
  lessons: number;
  minutes: number;
}

const PILLARS: Pillar[] = [
  {
    key: "finance",
    iconBg: "from-amber-400 to-yellow-500",
    ring: "hover:ring-amber-400/40",
    accentText: "text-amber-600 dark:text-amber-400",
    titleVi: "Tài chính Thông minh",
    titleEn: "Smart Finance",
    taglineVi: "Xây tài sản từ thói quen nhỏ mỗi ngày.",
    taglineEn: "Build wealth through small, daily habits.",
    sampleCourseVi:
      "Người trẻ dựng tài sản: Từ vi tiết kiệm tới tài sản rủi ro thấp",
    sampleCourseEn:
      "Youth Wealth Building: From Micro-savings to Low-risk Assets",
    highlights: [
      { vi: "Quy tắc 6 hũ tiền", en: "The 6-Jar Rule" },
      { vi: "Lãi kép & thời gian", en: "Compound Interest" },
      { vi: "Tránh bẫy tiêu dùng", en: "Avoiding Consumptive Traps" },
    ],
    Icon: Wallet,
    lessons: 18,
    minutes: 210,
  },
  {
    key: "etiquette",
    iconBg: "from-emerald-400 to-teal-500",
    ring: "hover:ring-emerald-400/40",
    accentText: "text-emerald-600 dark:text-emerald-400",
    titleVi: "Nghệ thuật Ứng xử",
    titleEn: "Eloquence & Etiquette",
    taglineVi: "Nói ít, nghe nhiều, tạo ảnh hưởng lớn.",
    taglineEn: "Speak less, listen deeper, influence more.",
    sampleCourseVi:
      "Giao tiếp tạo ảnh hưởng & phép lịch sự toàn cầu",
    sampleCourseEn:
      "High-impact Communication & Global Etiquette",
    highlights: [
      { vi: "Đặt giới hạn duyên dáng", en: "Elegant Boundaries" },
      { vi: "Lắng nghe chủ động", en: "Active Listening" },
      { vi: "Nhạy văn hoá", en: "Cultural Fluency" },
    ],
    Icon: MessageSquareQuote,
    lessons: 22,
    minutes: 260,
  },
  {
    key: "grace",
    iconBg: "from-teal-400 to-emerald-600",
    ring: "hover:ring-teal-400/40",
    accentText: "text-teal-600 dark:text-teal-400",
    titleVi: "Khí chất & Thần thái",
    titleEn: "Grace & Presence",
    taglineVi: "Toả sáng bằng nội lực, không phô trương.",
    taglineEn: "Radiate from within — no performance required.",
    sampleCourseVi:
      "Mở khoá khí chất & ngôn ngữ cơ thể tự tin",
    sampleCourseEn:
      "Unlocking Inner Grace & Confident Body Language",
    highlights: [
      { vi: "Điều tiết giọng nói", en: "Vocal Modulation" },
      { vi: "Tư thế & động tác", en: "Posture Dynamics" },
      { vi: "Xây dựng sức hút", en: "Charisma Building" },
    ],
    Icon: Compass,
    lessons: 16,
    minutes: 180,
  },
  {
    key: "resilience",
    iconBg: "from-slate-500 to-slate-700",
    ring: "hover:ring-slate-400/40",
    accentText: "text-slate-700 dark:text-slate-200",
    titleVi: "Bản lĩnh Tinh thần",
    titleEn: "Mental Resilience",
    taglineVi: "Bình tĩnh giữa bão, vững chãi giữa đám đông.",
    taglineEn: "Calm in the storm, steady in the crowd.",
    sampleCourseVi:
      "Tư duy Stoic: Vượt áp lực bạn bè & khó khăn du học",
    sampleCourseEn:
      "Stoic Mindset: Navigating Peer Pressure & Hardships Abroad",
    highlights: [
      { vi: "Tái định khung nhận thức", en: "Cognitive Reframing" },
      { vi: "Tự trắc ẩn", en: "Self-compassion" },
      { vi: "Giữ vững gốc rễ", en: "Staying Grounded" },
    ],
    Icon: Anchor,
    lessons: 20,
    minutes: 240,
  },
];

// Filter category keys (aligned with pillars + "all")
type FilterKey = "all" | PillarKey;
const FILTERS: { key: FilterKey; labelVi: string; labelEn: string }[] = [
  { key: "all", labelVi: "Tất cả", labelEn: "All" },
  { key: "finance", labelVi: "Tài chính", labelEn: "Finance" },
  { key: "etiquette", labelVi: "Ứng xử", labelEn: "Etiquette" },
  { key: "grace", labelVi: "Khí chất", labelEn: "Grace" },
  { key: "resilience", labelVi: "Bản lĩnh", labelEn: "Resilience" },
];

// ─────────────────────────────────────────────────────────
// Micro-coach — mental states + reflection prescriptions
// ─────────────────────────────────────────────────────────
type MoodKey = "overwhelmed" | "anxious" | "ready" | "unmotivated";

interface MoodPrescription {
  key: MoodKey;
  labelVi: string;
  labelEn: string;
  gradient: string;             // pill background gradient
  Icon: typeof Heart;
  quoteVi: string;
  quoteEn: string;
  quoteAuthor: string;
  lessonPillar: PillarKey;
  lessonTitleVi: string;
  lessonTitleEn: string;
  lessonMinutes: number;
  lessonMedium: "read" | "audio";
}

const MOODS: MoodPrescription[] = [
  {
    key: "overwhelmed",
    labelVi: "Quá tải",
    labelEn: "Overwhelmed",
    gradient: "from-amber-400/20 to-rose-400/20",
    Icon: Flame,
    quoteVi:
      "Bạn không cần làm mọi thứ. Bạn chỉ cần làm điều tiếp theo — thật sự tốt.",
    quoteEn:
      "You do not need to do everything. Only the next thing — done well.",
    quoteAuthor: "Elisabeth Elliot",
    lessonPillar: "resilience",
    lessonTitleVi: "Kỹ thuật 'một điều duy nhất' để thoát quá tải",
    lessonTitleEn: "The 'One Thing' Technique for Overload",
    lessonMinutes: 3,
    lessonMedium: "read",
  },
  {
    key: "anxious",
    labelVi: "Lo âu",
    labelEn: "Anxious",
    gradient: "from-teal-400/20 to-sky-400/20",
    Icon: Brain,
    quoteVi:
      "Chúng ta chịu đựng nhiều hơn trong tưởng tượng so với trong thực tế.",
    quoteEn:
      "We suffer more in imagination than in reality.",
    quoteAuthor: "Seneca",
    lessonPillar: "resilience",
    lessonTitleVi: "Box Breathing 4-4-4-4 & tái định khung 90 giây",
    lessonTitleEn: "Box Breathing 4-4-4-4 & 90-second Reframing",
    lessonMinutes: 3,
    lessonMedium: "audio",
  },
  {
    key: "ready",
    labelVi: "Sẵn sàng học",
    labelEn: "Ready to Learn",
    gradient: "from-emerald-400/20 to-lime-400/20",
    Icon: Zap,
    quoteVi:
      "Chất lượng đến từ chú tâm, không phải cường độ.",
    quoteEn:
      "Quality is the result of attention, not intensity.",
    quoteAuthor: "Cal Newport",
    lessonPillar: "etiquette",
    lessonTitleVi: "3 công thức mở đầu cuộc trò chuyện tạo ấn tượng",
    lessonTitleEn: "3 Opening Formulas That Land a First Impression",
    lessonMinutes: 3,
    lessonMedium: "read",
  },
  {
    key: "unmotivated",
    labelVi: "Mất động lực",
    labelEn: "Unmotivated",
    gradient: "from-slate-400/20 to-amber-400/20",
    Icon: Heart,
    quoteVi:
      "Kỷ luật là chọn điều bạn thực sự muốn — thay vì điều bạn muốn ngay lúc này.",
    quoteEn:
      "Discipline is choosing what you want most over what you want now.",
    quoteAuthor: "Abraham Lincoln",
    lessonPillar: "finance",
    lessonTitleVi: "Vì sao 'tôi tương lai' xứng đáng: sức mạnh lãi kép",
    lessonTitleEn: "Why 'Future You' Deserves It: Compound Interest 101",
    lessonMinutes: 3,
    lessonMedium: "audio",
  },
];

// ─────────────────────────────────────────────────────────
// Small helpers
// ─────────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
  }),
};

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const LifestyleAcademy = () => {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState<MoodKey>("ready");

  const activeMood = MOODS.find((m) => m.key === mood) ?? MOODS[2];
  const activePillarForLesson = PILLARS.find(
    (p) => p.key === activeMood.lessonPillar,
  )!;

  const filteredPillars = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PILLARS.filter((p) => {
      if (filter !== "all" && p.key !== filter) return false;
      if (!q) return true;
      const haystack = [
        p.titleVi, p.titleEn, p.taglineVi, p.taglineEn,
        p.sampleCourseVi, p.sampleCourseEn,
        ...p.highlights.flatMap((h) => [h.vi, h.en]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={t(
          "HaiEduTech Lifestyle Academy — Tài chính, Ứng xử, Khí chất & Bản lĩnh",
          "HaiEduTech Lifestyle Academy — Finance, Etiquette, Grace & Resilience",
        )}
        description={t(
          "Học viện lối sống HaiEduTech: 4 trụ cột phát triển bản thân — tài chính thông minh, ứng xử tinh tế, khí chất và bản lĩnh tinh thần cho công dân toàn cầu.",
          "HaiEduTech Lifestyle Academy: four pillars for global citizens — smart finance, elegant eloquence, undeniable presence, and unbreakable mental resilience.",
        )}
        path="/lifestyle-academy"
      />
      <Navbar />

      <main>
        {/* ────────── Hero ────────── */}
        <section
          className="relative overflow-hidden border-b border-border/60
                     bg-gradient-to-br from-emerald-50 via-white to-amber-50
                     dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
        >
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full
                       bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full
                       bg-amber-300/25 blur-3xl dark:bg-amber-400/10"
          />

          <div className="container relative mx-auto px-4 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <Badge
                variant="outline"
                className="mb-4 border-emerald-400/50 bg-emerald-50/70 text-emerald-700
                           dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {t("Chương trình cao cấp • Global Citizen", "Premium Program • Global Citizen")}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
                             text-slate-900 dark:text-slate-50">
                HaiEduTech{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500
                                 bg-clip-text text-transparent">
                  Lifestyle Academy
                </span>
              </h1>

              <p className="mt-5 text-lg md:text-xl leading-relaxed
                            text-slate-700 dark:text-slate-300 max-w-2xl">
                {t(
                  "Vun bồi thói quen tài chính thông minh, phong thái giao tiếp tinh tế, khí chất chinh phục và bản lĩnh tinh thần không thể lay chuyển — cho công dân toàn cầu.",
                  "Cultivating smart financial habits, elegant eloquence, undeniable presence, and unbreakable mental resilience for global citizens.",
                )}
              </p>

              {/* Search + category selector */}
              <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1 max-w-xl">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2
                                     h-4 w-4 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(
                      "Tìm bài học: lãi kép, giao tiếp, thần thái…",
                      "Search: compound interest, communication, presence…",
                    )}
                    className="pl-9 h-11 bg-white/80 backdrop-blur border-slate-200
                               dark:bg-slate-900/60 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {FILTERS.map((f) => {
                  const active = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={[
                        "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                        "border",
                        active
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-sm shadow-emerald-500/25"
                          : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white dark:bg-slate-800/60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
                      ].join(" ")}
                    >
                      {lang === "vi" ? f.labelVi : f.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
                <StatChip value="76+" labelVi="Bài học" labelEn="Lessons" />
                <StatChip value="4" labelVi="Trụ cột" labelEn="Pillars" />
                <StatChip value="3-15" labelVi="Phút / bài" labelEn="Min / lesson" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────── 4 Core Pillars ────────── */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight
                             text-slate-900 dark:text-slate-50">
                {t("4 Trụ cột cốt lõi", "The 4 Core Pillars")}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
                {t(
                  "Bộ khung phát triển toàn diện — chọn trụ cột phù hợp với hành trình hiện tại của bạn.",
                  "A holistic growth framework — choose the pillar that fits where you are now.",
                )}
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {filteredPillars.length} / {PILLARS.length}{" "}
              {t("hiển thị", "showing")}
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filteredPillars.map((p, i) => (
                <motion.div
                  key={p.key}
                  layout
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 8 }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <PillarCard pillar={p} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredPillars.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400">
                {t(
                  "Không tìm thấy trụ cột phù hợp với từ khoá này.",
                  "No pillar matches this search.",
                )}
              </div>
            )}
          </div>
        </section>

        {/* ────────── Daily Reflection & Micro-Coach ────────── */}
        <section
          className="border-y border-border/60
                     bg-gradient-to-br from-slate-50 to-emerald-50/60
                     dark:from-slate-950 dark:to-slate-900"
        >
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="mb-8 max-w-2xl">
              <Badge
                variant="outline"
                className="mb-3 border-amber-400/50 bg-amber-50/70 text-amber-700
                           dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-300"
              >
                {t("Nhật ký cảm xúc", "Daily Reflection")}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight
                             text-slate-900 dark:text-slate-50">
                {t("Micro-Coach cho hôm nay", "Micro-Coach for Today")}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t(
                  "Chọn cảm xúc hiện tại — chúng tôi sẽ gợi ý một bài học 3 phút và một câu nhắc phù hợp.",
                  "Pick how you feel right now — we'll surface a 3-minute lesson and a fitting reminder.",
                )}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              {/* Mood chips */}
              <Card
                className="border-slate-200/80 bg-white/80 backdrop-blur
                           dark:border-slate-800 dark:bg-slate-900/60"
              >
                <CardContent className="p-5">
                  <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {t("Cảm xúc hiện tại của bạn:", "How do you feel right now?")}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {MOODS.map((m) => {
                      const active = m.key === mood;
                      const Icon = m.Icon;
                      return (
                        <button
                          key={m.key}
                          onClick={() => setMood(m.key)}
                          className={[
                            "group relative overflow-hidden rounded-xl border p-4 text-left transition-all",
                            active
                              ? "border-emerald-400 shadow-sm shadow-emerald-500/20 dark:border-emerald-500"
                              : "border-slate-200 hover:border-emerald-300 dark:border-slate-700 dark:hover:border-emerald-500/50",
                          ].join(" ")}
                        >
                          <div
                            aria-hidden
                            className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-${active ? "100" : "0"} transition-opacity group-hover:opacity-70`}
                          />
                          <div className="relative flex items-center gap-3">
                            <span
                              className={[
                                "inline-flex h-9 w-9 items-center justify-center rounded-lg",
                                active
                                  ? "bg-white/80 text-emerald-600 dark:bg-slate-950/60 dark:text-emerald-400"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                              ].join(" ")}
                            >
                              <Icon className="h-4.5 w-4.5" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {lang === "vi" ? m.labelVi : m.labelEn}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {lang === "vi" ? m.labelEn : m.labelVi}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Prescription card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMood.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <Card
                    className="relative overflow-hidden border-slate-200/80 bg-white/90
                               dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeMood.gradient}`}
                    />
                    <CardContent className="relative p-6 md:p-8">
                      {/* Quote */}
                      <div className="mb-6">
                        <span
                          aria-hidden
                          className="mb-2 block text-4xl font-serif text-emerald-500/70 dark:text-emerald-400/60"
                        >
                          &ldquo;
                        </span>
                        <blockquote className="text-lg md:text-xl font-medium leading-relaxed
                                               text-slate-800 dark:text-slate-100">
                          {lang === "vi" ? activeMood.quoteVi : activeMood.quoteEn}
                        </blockquote>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          — {activeMood.quoteAuthor}
                        </p>
                      </div>

                      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent
                                      dark:via-slate-700" />

                      {/* Recommended lesson */}
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <span
                            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center
                                        rounded-xl bg-gradient-to-br ${activePillarForLesson.iconBg}
                                        text-white shadow-lg shadow-emerald-500/20`}
                          >
                            <activePillarForLesson.Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-xs uppercase tracking-wider font-semibold
                                          text-slate-500 dark:text-slate-400">
                              {t("Bài học được gợi ý", "Recommended lesson")}
                              {" · "}
                              {lang === "vi"
                                ? activePillarForLesson.titleVi
                                : activePillarForLesson.titleEn}
                            </p>
                            <h3 className="mt-1 text-base md:text-lg font-semibold
                                           text-slate-900 dark:text-slate-50">
                              {lang === "vi"
                                ? activeMood.lessonTitleVi
                                : activeMood.lessonTitleEn}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs
                                            text-slate-500 dark:text-slate-400">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {activeMood.lessonMinutes} {t("phút", "min")}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                {activeMood.lessonMedium === "audio" ? (
                                  <>
                                    <Headphones className="h-3.5 w-3.5" />
                                    {t("Nghe", "Audio")}
                                  </>
                                ) : (
                                  <>
                                    <BookOpen className="h-3.5 w-3.5" />
                                    {t("Đọc", "Read")}
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          asChild
                          size="lg"
                          className="bg-gradient-to-r from-emerald-500 to-teal-500
                                     text-white shadow-lg shadow-emerald-500/20
                                     hover:from-emerald-600 hover:to-teal-600"
                        >
                          <Link to="/lifestyle-academy">
                            <Play className="mr-2 h-4 w-4" />
                            {t("Bắt đầu bài học", "Start Lesson")}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ────────── Closing CTA ────────── */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div
            className="relative overflow-hidden rounded-3xl border border-emerald-200/60
                       bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-800 p-8 md:p-14
                       shadow-xl shadow-emerald-500/20
                       dark:border-emerald-500/30"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full
                         bg-amber-300/30 blur-3xl"
            />
            <div className="relative max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {t(
                  "Trở thành phiên bản điềm tĩnh, tinh tế & vững vàng nhất của bạn.",
                  "Become the calmest, most graceful, most grounded version of yourself.",
                )}
              </h2>
              <p className="mt-4 text-emerald-50/90 md:text-lg">
                {t(
                  "Mỗi ngày 3 phút. Mỗi tuần một thói quen. Sau một năm — một con người khác.",
                  "Three minutes a day. One habit a week. A different person a year from now.",
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50"
                >
                  <Link to="/dashboard">
                    {t("Vào bảng điều khiển học tập", "Go to my dashboard")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link to="/contact">
                    {t("Liên hệ tư vấn 1-1", "Book a 1-1 consult")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────
interface StatChipProps {
  value: string;
  labelVi: string;
  labelEn: string;
}
const StatChip = ({ value, labelVi, labelEn }: StatChipProps) => {
  const { t } = useLanguage();
  return (
    <div
      className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2.5 text-center backdrop-blur
                 dark:border-slate-800 dark:bg-slate-900/50"
    >
      <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50">
        {value}
      </p>
      <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {t(labelVi, labelEn)}
      </p>
    </div>
  );
};

interface PillarCardProps {
  pillar: Pillar;
}
const PillarCard = ({ pillar }: PillarCardProps) => {
  const { t, lang } = useLanguage();
  const Icon = pillar.Icon;
  return (
    <Card
      className={[
        "group h-full overflow-hidden border-slate-200/80 bg-white/90 transition-shadow",
        "hover:shadow-xl hover:shadow-emerald-500/10 hover:ring-2",
        pillar.ring,
        "dark:border-slate-800 dark:bg-slate-900/70",
      ].join(" ")}
    >
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl
                        bg-gradient-to-br ${pillar.iconBg}
                        text-white shadow-lg transition-transform group-hover:scale-105`}
          >
            <Icon className="h-6 w-6" />
          </span>
          <div className="text-right text-[11px] uppercase tracking-wider
                          text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              {pillar.lessons} {t("bài", "lessons")}
            </p>
            <p>{pillar.minutes} {t("phút", "min")}</p>
          </div>
        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-50">
          {lang === "vi" ? pillar.titleVi : pillar.titleEn}
        </h3>
        <p className={`mt-1 text-sm font-medium ${pillar.accentText}`}>
          {lang === "vi" ? pillar.titleEn : pillar.titleVi}
        </p>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {lang === "vi" ? pillar.taglineVi : pillar.taglineEn}
        </p>

        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-3
                        dark:border-slate-700 dark:bg-slate-800/40">
          <p className="text-[11px] uppercase tracking-wider font-semibold
                        text-slate-500 dark:text-slate-400">
            {t("Khoá học tiêu biểu", "Sample course")}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
            {lang === "vi" ? pillar.sampleCourseVi : pillar.sampleCourseEn}
          </p>
        </div>

        <ul className="mt-4 space-y-1.5">
          {pillar.highlights.map((h) => (
            <li
              key={h.en}
              className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
            >
              <span
                aria-hidden
                className={`mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br ${pillar.iconBg}`}
              />
              <span>{lang === "vi" ? h.vi : h.en}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex-1" />

        <Button
          asChild
          variant="ghost"
          className="mt-4 -mx-2 justify-between text-slate-700 hover:bg-slate-100
                     dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Link to="/lifestyle-academy">
            <span>{t("Khám phá trụ cột", "Explore pillar")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LifestyleAcademy;
