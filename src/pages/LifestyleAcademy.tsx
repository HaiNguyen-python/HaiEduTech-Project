/**
 * @file LifestyleAcademy.tsx
 * @description Premium curriculum hub for lifestyle & soft skills.
 *              Six pillars: Smart Finance, Eloquence & Etiquette,
 *              Presence & Resilience, Physical Wellness, Self-Study Skills
 *              and Parties & Events. Includes filterable pillar grid, deep
 *              lesson catalogue grouped by pillar with collapsible sections,
 *              soft-skills radar, and a daily-reflection micro-coach widget.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  MessageSquareQuote,
  ShieldCheck,
  Activity,
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
  Target,
  Compass,
  Lightbulb,
  PartyPopper,
  CheckCircle2,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { LIFESTYLE_LESSONS, type LifestylePillarKey, type LifestyleLesson } from "@/data/lifestyleAcademyLessons";
import { getLessonImage } from "@/data/lifestyleLessonImages";
import LessonDialog from "@/components/lifestyle/LessonDialog";
import SoftSkillsRadar from "@/components/lifestyle/SoftSkillsRadar";
import { useLifestyleProgress, type LifestyleLessonResult } from "@/hooks/useLifestyleProgress";


// Pillar-specific styles used across cards for consistent theming.
const PILLAR_STYLES: Record<LifestylePillarKey, {
  border: string;
  borderStrong: string;
  bannerFrom: string;
  bannerTo: string;
  chipBg: string;
  emojis: string[];
}> = {
  finance: {
    border: "border-amber-300/70 dark:border-amber-500/40",
    borderStrong: "hover:border-amber-400 dark:hover:border-amber-400/70",
    bannerFrom: "from-amber-100 via-yellow-50 to-orange-100",
    bannerTo: "dark:from-amber-500/20 dark:via-yellow-500/10 dark:to-orange-500/20",
    chipBg: "bg-amber-50 dark:bg-amber-500/10",
    emojis: ["💰", "📈", "💎", "🏦"],
  },
  etiquette: {
    border: "border-emerald-300/70 dark:border-emerald-500/40",
    borderStrong: "hover:border-emerald-400 dark:hover:border-emerald-400/70",
    bannerFrom: "from-emerald-100 via-teal-50 to-cyan-100",
    bannerTo: "dark:from-emerald-500/20 dark:via-teal-500/10 dark:to-cyan-500/20",
    chipBg: "bg-emerald-50 dark:bg-emerald-500/10",
    emojis: ["💬", "🤝", "🌍", "🎓"],
  },
  presence: {
    border: "border-teal-300/70 dark:border-teal-500/40",
    borderStrong: "hover:border-teal-400 dark:hover:border-teal-400/70",
    bannerFrom: "from-teal-100 via-slate-50 to-emerald-100",
    bannerTo: "dark:from-teal-500/20 dark:via-slate-500/10 dark:to-emerald-500/20",
    chipBg: "bg-teal-50 dark:bg-teal-500/10",
    emojis: ["🧘", "🛡️", "🔥", "🎯"],
  },
  wellness: {
    border: "border-rose-300/70 dark:border-rose-500/40",
    borderStrong: "hover:border-rose-400 dark:hover:border-rose-400/70",
    bannerFrom: "from-rose-100 via-orange-50 to-amber-100",
    bannerTo: "dark:from-rose-500/20 dark:via-orange-500/10 dark:to-amber-500/20",
    chipBg: "bg-rose-50 dark:bg-rose-500/10",
    emojis: ["💪", "🥗", "😴", "🌿"],
  },
  selfstudy: {
    border: "border-indigo-300/70 dark:border-indigo-500/40",
    borderStrong: "hover:border-indigo-400 dark:hover:border-indigo-400/70",
    bannerFrom: "from-indigo-100 via-violet-50 to-sky-100",
    bannerTo: "dark:from-indigo-500/20 dark:via-violet-500/10 dark:to-sky-500/20",
    chipBg: "bg-indigo-50 dark:bg-indigo-500/10",
    emojis: ["📚", "🧠", "⏳", "🗂️"],
  },
  partying: {
    border: "border-pink-300/70 dark:border-pink-500/40",
    borderStrong: "hover:border-pink-400 dark:hover:border-pink-400/70",
    bannerFrom: "from-rose-100 via-pink-50 to-amber-100",
    bannerTo: "dark:from-rose-500/20 dark:via-pink-500/10 dark:to-amber-500/20",
    chipBg: "bg-pink-50 dark:bg-pink-500/10",
    emojis: ["🎉", "🥂", "💌", "🍽️"],
  },
};

// ─────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────
type PillarKey = LifestylePillarKey;

interface PillarHighlight {
  vi: string;
  en: string;
}

interface Pillar {
  key: PillarKey;
  iconBg: string;
  ring: string;
  accentText: string;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  sampleCourseVi: string;
  sampleCourseEn: string;
  highlights: PillarHighlight[];
  Icon: typeof Wallet;
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
      "Người trẻ dựng tài sản: Từ vi tiết kiệm tới đầu tư chỉ số",
    sampleCourseEn:
      "Youth Wealth Building: From Micro-savings to Index Investing",
    highlights: [
      { vi: "Quy tắc 6 hũ tiền", en: "The 6-Jar Rule" },
      { vi: "Lãi kép & thời gian", en: "Compound Interest & Time" },
      { vi: "Đầu tư chỉ số Bogleheads", en: "Bogleheads Index Investing" },
    ],
    Icon: Wallet,
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
      { vi: "Lắng nghe chủ động (HEAR)", en: "Active Listening (HEAR)" },
      { vi: "Giao tiếp phi bạo lực (NVC)", en: "Nonviolent Communication (NVC)" },
      { vi: "Bản đồ 8 chiều văn hoá", en: "8-Dimension Culture Map" },
    ],
    Icon: MessageSquareQuote,
  },
  {
    key: "presence",
    iconBg: "from-slate-500 via-teal-500 to-emerald-600",
    ring: "hover:ring-teal-400/40",
    accentText: "text-teal-600 dark:text-teal-400",
    titleVi: "Khí chất & Bản lĩnh",
    titleEn: "Presence & Resilience",
    taglineVi:
      "Toả sáng từ nội lực, vững chãi giữa bão táp.",
    taglineEn:
      "Radiate from within, stand steady in the storm.",
    sampleCourseVi:
      "Khí chất Stoic: Giọng nói, ngôn ngữ cơ thể & bản lĩnh nội tâm",
    sampleCourseEn:
      "Stoic Presence: Voice, Body Language & Inner Resilience",
    highlights: [
      { vi: "Điều tiết giọng nói 4P", en: "4-P Vocal Modulation" },
      { vi: "Tư duy Stoic & tái định khung CBT", en: "Stoic Mindset & CBT Reframing" },
      { vi: "Ma trận sức hút Warmth × Competence", en: "Warmth × Competence Charisma" },
    ],
    Icon: ShieldCheck,
  },
  {
    key: "wellness",
    iconBg: "from-rose-400 via-orange-400 to-amber-500",
    ring: "hover:ring-rose-400/40",
    accentText: "text-rose-600 dark:text-rose-400",
    titleVi: "Thân thể Khoẻ mạnh",
    titleEn: "Physical Wellness",
    taglineVi:
      "Thân thể là nền móng - không có nó, mọi ước mơ đều dừng lại.",
    taglineEn:
      "Your body is the foundation - without it, every dream stalls.",
    sampleCourseVi:
      "Nền tảng sức khoẻ bền vững: Ngủ, Vận động, Dinh dưỡng & Nghỉ ngơi",
    sampleCourseEn:
      "Sustainable Health Foundations: Sleep, Movement, Nutrition & Rest",
    highlights: [
      { vi: "Kiến trúc giấc ngủ 4 trụ cột", en: "4-Pillar Sleep Architecture" },
      { vi: "Zone 2 & VO2 max (Peter Attia)", en: "Zone 2 & VO2 max (Peter Attia)" },
      { vi: "7 loại nghỉ (Dalton-Smith)", en: "7 Types of Rest (Dalton-Smith)" },
    ],
    Icon: Activity,
  },
  {
    key: "selfstudy",
    iconBg: "from-indigo-500 via-violet-500 to-sky-500",
    ring: "hover:ring-indigo-400/40",
    accentText: "text-indigo-600 dark:text-indigo-400",
    titleVi: "Kỹ năng Tự học",
    titleEn: "Self-Study Skills",
    taglineVi: "Học đúng cách quan trọng hơn học nhiều giờ.",
    taglineEn: "Studying the right way beats studying more hours.",
    sampleCourseVi:
      "Hệ thống tự học: Ghi nhớ chủ động, lặp lại giãn cách & tập trung sâu",
    sampleCourseEn:
      "The Self-Study System: Active Recall, Spaced Repetition & Deep Focus",
    highlights: [
      { vi: "Nhớ lại chủ động & lặp lại giãn cách", en: "Active Recall & Spaced Repetition" },
      { vi: "Ghi chú Cornell & Feynman", en: "Cornell & Feynman Note-Taking" },
      { vi: "Tập trung sâu và chống trì hoãn", en: "Deep Focus & Anti-Procrastination" },
    ],
    Icon: Lightbulb,
  },
  {
    key: "partying",
    iconBg: "from-rose-400 via-pink-500 to-amber-400",
    ring: "hover:ring-pink-400/40",
    accentText: "text-pink-600 dark:text-pink-400",
    titleVi: "Tiệc tùng & Sự kiện",
    titleEn: "Parties & Events",
    taglineVi: "Tổ chức, tham dự và toả sáng trong mọi dịp gặp gỡ.",
    taglineEn: "Plan, attend and shine at every kind of gathering.",
    sampleCourseVi:
      "Nghệ thuật tiệc tùng: Tổ chức sự kiện, giao tiếp và nghi thức tiệc sang trọng",
    sampleCourseEn:
      "The Art of Gathering: Event Planning, Social Skills & Formal Dining Etiquette",
    highlights: [
      { vi: "Kế hoạch, ngân sách & kịch bản thời gian", en: "Planning, Budgets & Run of Show" },
      { vi: "Giới thiệu, trò chuyện & kết nối", en: "Introductions, Small Talk & Networking" },
      { vi: "Mã trang phục & nghi thức bàn tiệc", en: "Dress Codes & Table Manners" },
    ],
    Icon: PartyPopper,
  },
];

// Filter keys
type FilterKey = "all" | PillarKey;
const FILTERS: { key: FilterKey; labelVi: string; labelEn: string }[] = [
  { key: "all", labelVi: "Tất cả", labelEn: "All" },
  { key: "finance", labelVi: "Tài chính", labelEn: "Finance" },
  { key: "etiquette", labelVi: "Ứng xử", labelEn: "Etiquette" },
  { key: "presence", labelVi: "Khí chất & Bản lĩnh", labelEn: "Presence & Resilience" },
  { key: "wellness", labelVi: "Thân thể", labelEn: "Wellness" },
  { key: "selfstudy", labelVi: "Tự học", labelEn: "Self-Study" },
  { key: "partying", labelVi: "Tiệc tùng", labelEn: "Parties" },
];

/** Remembers which pillar groups the learner collapsed on the lessons list. */
const GROUPS_OPEN_KEY = "het:lifestyle-groups-open-v1";

// ─────────────────────────────────────────────────────────
// Micro-coach
// ─────────────────────────────────────────────────────────
type MoodKey = "overwhelmed" | "anxious" | "ready" | "unmotivated";

interface MoodPrescription {
  key: MoodKey;
  labelVi: string;
  labelEn: string;
  gradient: string;
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
    quoteVi: "Bạn không cần làm mọi thứ. Bạn chỉ cần làm điều tiếp theo - thật sự tốt.",
    quoteEn: "You do not need to do everything. Only the next thing - done well.",
    quoteAuthor: "Elisabeth Elliot",
    lessonPillar: "presence",
    lessonTitleVi: "Kỹ thuật 'một điều duy nhất' & tư duy Stoic",
    lessonTitleEn: "The 'One Thing' Technique & Stoic Mindset",
    lessonMinutes: 3,
    lessonMedium: "read",
  },
  {
    key: "anxious",
    labelVi: "Lo âu",
    labelEn: "Anxious",
    gradient: "from-teal-400/20 to-sky-400/20",
    Icon: Brain,
    quoteVi: "Chúng ta chịu đựng nhiều hơn trong tưởng tượng so với trong thực tế.",
    quoteEn: "We suffer more in imagination than in reality.",
    quoteAuthor: "Seneca",
    lessonPillar: "wellness",
    lessonTitleVi: "Physiological Sigh & Box Breathing 4-4-4-4",
    lessonTitleEn: "Physiological Sigh & Box Breathing 4-4-4-4",
    lessonMinutes: 3,
    lessonMedium: "audio",
  },
  {
    key: "ready",
    labelVi: "Sẵn sàng học",
    labelEn: "Ready to Learn",
    gradient: "from-emerald-400/20 to-lime-400/20",
    Icon: Zap,
    quoteVi: "Chất lượng đến từ chú tâm, không phải cường độ.",
    quoteEn: "Quality is the result of attention, not intensity.",
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
    quoteVi: "Kỷ luật là chọn điều bạn thực sự muốn - thay vì điều bạn muốn ngay lúc này.",
    quoteEn: "Discipline is choosing what you want most over what you want now.",
    quoteAuthor: "Abraham Lincoln",
    lessonPillar: "finance",
    lessonTitleVi: "Vì sao 'tôi tương lai' xứng đáng: sức mạnh lãi kép",
    lessonTitleEn: "Why 'Future You' Deserves It: Compound Interest 101",
    lessonMinutes: 3,
    lessonMedium: "audio",
  },
];

// ─────────────────────────────────────────────────────────
// Animations
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
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState<MoodKey>("ready");
  const { results, pillarScores, stats, saveResult } = useLifestyleProgress();

  // Scroll helper: filter by pillar then scroll to the deep-dive lessons section.
  const openPillarLessons = (key: PillarKey) => {
    setFilter(key);
    requestAnimationFrame(() => {
      document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // Read ?pillar=... from URL: filter and jump to lessons. If absent, reset to All.
  useEffect(() => {
    const p = searchParams.get("pillar") as FilterKey | null;
    if (p && FILTERS.some((f) => f.key === p)) {
      setFilter(p);
      requestAnimationFrame(() => {
        document.getElementById(p !== "all" ? "lessons" : "pillars")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      // No pillar param (e.g. clicked "Overview" or "Micro-Coach") → reset filter so
      // the user does not see stale filtering from a previous click.
      setFilter("all");
    }
  }, [searchParams]);

  // Handle hash-based navigation (e.g. #micro-coach) even when already on this page.
  useEffect(() => {
    const hash = location.hash?.replace(/^#/, "");
    if (!hash) return;
    // Delay so the target element exists after render.
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(id);
  }, [location.hash, location.key]);

  const activeMood = MOODS.find((m) => m.key === mood) ?? MOODS[2];
  const activePillarForLesson = PILLARS.find((p) => p.key === activeMood.lessonPillar)!;

  const filteredPillars = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PILLARS.filter((p) => {
      if (filter !== "all" && p.key !== filter) return false;
      if (!q) return true;
      const haystack = [
        p.titleVi, p.titleEn, p.taglineVi, p.taglineEn,
        p.sampleCourseVi, p.sampleCourseEn,
        ...p.highlights.flatMap((h) => [h.vi, h.en]),
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  const filteredLessons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LIFESTYLE_LESSONS.filter((l) => {
      if (filter !== "all" && l.pillar !== filter) return false;
      if (!q) return true;
      const haystack = [
        l.titleVi, l.titleEn, l.subtitleVi, l.subtitleEn,
        l.frameworkVi, l.frameworkEn,
        ...l.takeaways.flatMap((tk) => [tk.vi, tk.en]),
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  // ── Grouped view: only when showing everything (no pillar filter, no search),
  // so search results are never hidden inside a collapsed group.
  const grouped = filter === "all" && query.trim() === "";

  const groupedLessons = useMemo(
    () =>
      PILLARS.map((p) => ({
        pillar: p,
        lessons: LIFESTYLE_LESSONS.filter((l) => l.pillar === p.key),
      })).filter((g) => g.lessons.length > 0),
    [],
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(GROUPS_OPEN_KEY);
      if (raw) return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      /* ignore */
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(GROUPS_OPEN_KEY, JSON.stringify(openGroups));
    } catch {
      /* ignore */
    }
  }, [openGroups]);

  // First visit: all groups start collapsed so learners open what they need.
  const isGroupOpen = (key: PillarKey) => openGroups[key] === true;
  const toggleGroup = (key: PillarKey) =>
    setOpenGroups((prev) => ({ ...prev, [key]: prev[key] !== true }));
  const setAllGroups = (open: boolean) =>
    setOpenGroups(Object.fromEntries(PILLARS.map((p) => [p.key, open])));
  const allCollapsed = PILLARS.every((p) => openGroups[p.key] !== true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={t(
          "Lifestyle Academy - Tài chính, Ứng xử, Khí chất, Thân thể, Tự học & Tiệc",
          "Lifestyle Academy - Finance, Etiquette, Presence, Wellness, Self-Study & Parties",
        )}
        description={t(
          "Học viện lối sống HaiEduTech: 6 trụ cột cho công dân toàn cầu - tài chính thông minh, ứng xử tinh tế, khí chất bản lĩnh, thân thể khoẻ mạnh, kỹ năng tự học và nghi thức tiệc - sự kiện.",
          "HaiEduTech Lifestyle Academy: six pillars for global citizens - smart finance, elegant eloquence, inner presence, physical wellness, self-study skills, and party and event etiquette.",
        )}
        path="/lifestyle-academy"
      />
      <Navbar />

      <main>
        {/* ────────── Hero ────────── */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 pt-10 lg:pt-14">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-400/10" />

          <div className="container relative mx-auto px-4 py-5 md:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <Badge variant="outline" className="mb-4 border-emerald-400/50 bg-emerald-50/70 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {t("Chương trình cao cấp • Global Citizen", "Premium Program • Global Citizen")}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.18] tracking-tight text-slate-900 dark:text-slate-50">
                HaiEduTech{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                  Lifestyle Academy
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base md:text-lg leading-8 text-slate-700 dark:text-slate-300">
                {t(
                  "Vun bồi thói quen tài chính thông minh, phong thái giao tiếp tinh tế, khí chất - bản lĩnh nội tâm và thân thể khoẻ mạnh, cho công dân toàn cầu.",
                  "Cultivate smart financial habits, elegant eloquence, inner presence & resilience, and a truly healthy body - for global citizens.",
                )}
              </p>

              <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1 max-w-xl">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t(
                      "Tìm bài học: lãi kép, hơi thở, Stoic, giấc ngủ…",
                      "Search: compound interest, breathwork, Stoic, sleep…",
                    )}
                    className="pl-9 h-11 bg-white/80 backdrop-blur border-slate-200 dark:bg-slate-900/60 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {FILTERS.map((f) => {
                  const active = filter === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={[
                        "px-4 py-2 rounded-full text-sm font-medium transition-all border",
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

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5 max-w-xl">
                <StatChip value={`${LIFESTYLE_LESSONS.length}`} labelVi="Bài học chuyên sâu" labelEn="Deep lessons" />
                <StatChip value="6" labelVi="Trụ cột" labelEn="Pillars" />
                <StatChip value="7-12" labelVi="Phút / bài" labelEn="Min / lesson" />
              </div>
            </motion.div>
          </div>
        </section>


        {/* ────────── In-depth Lessons ────────── */}
        <section id="lessons" className="relative overflow-hidden border-y border-border/60 bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-950 dark:to-slate-900 scroll-mt-32">
          
          <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
            <div className="mb-8 max-w-2xl">
              <Badge variant="outline" className="mb-3 border-teal-400/50 bg-teal-50/70 text-teal-700 dark:border-teal-400/40 dark:bg-teal-500/10 dark:text-teal-300">
                <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
                {t("Bài học chuyên sâu", "In-depth Lessons")}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {t("Chương trình giảng dạy có chiều sâu", "A Curriculum With Real Depth")}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t(
                  "Mỗi bài học gồm khung tư duy, 4-5 điểm cốt lõi, câu hỏi phản chiếu và một bài tập cụ thể trong 7-14 ngày.",
                  "Every lesson ships with a named framework, 4-5 core takeaways, a reflection prompt, and a concrete 7-14 day drill.",
                )}
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                {t(
                  `${filteredLessons.length} / ${LIFESTYLE_LESSONS.length} bài hiển thị`,
                  `${filteredLessons.length} / ${LIFESTYLE_LESSONS.length} lessons showing`,
                )}
              </p>
            </div>

            <div className="mb-10">
              <SoftSkillsRadar pillarScores={pillarScores} stats={stats} />
            </div>

            {grouped ? (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAllGroups(allCollapsed)}
                  >
                    {allCollapsed
                      ? t("Mở tất cả", "Expand all")
                      : t("Thu gọn tất cả", "Collapse all")}
                  </Button>
                </div>

                <div className="space-y-8">
                  {groupedLessons.map((group) => (
                    <PillarLessonGroup
                      key={group.pillar.key}
                      pillar={group.pillar}
                      lessons={group.lessons}
                      open={isGroupOpen(group.pillar.key)}
                      onToggle={() => toggleGroup(group.pillar.key)}
                      results={results}
                      onQuizFinish={saveResult}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredLessons.map((lesson, i) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    index={i}
                    result={results[lesson.id]}
                    onQuizFinish={saveResult}
                  />
                ))}
                {filteredLessons.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-500 dark:text-slate-400">
                    {t("Không có bài học phù hợp với bộ lọc hiện tại.", "No lessons match the current filter.")}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ────────── Daily Reflection & Micro-Coach ────────── */}
        <section id="micro-coach" className="border-b border-border/60 bg-gradient-to-br from-slate-50 to-emerald-50/60 dark:from-slate-950 dark:to-slate-900 scroll-mt-32">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="mb-8 max-w-2xl">
              <Badge variant="outline" className="mb-3 border-amber-400/50 bg-amber-50/70 text-amber-700 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-300">
                {t("Nhật ký cảm xúc", "Daily Reflection")}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {t("Micro-Coach cho hôm nay", "Micro-Coach for Today")}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                {t(
                  "Chọn cảm xúc hiện tại - chúng tôi sẽ gợi ý một bài học 3 phút và một câu nhắc phù hợp.",
                  "Pick how you feel right now - we'll surface a 3-minute lesson and a fitting reminder.",
                )}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <Card className="border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
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
                          <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${m.gradient} ${active ? "opacity-100" : "opacity-0"} transition-opacity group-hover:opacity-70`} />
                          <div className="relative flex items-center gap-3">
                            <span className={["inline-flex h-9 w-9 items-center justify-center rounded-lg",
                              active ? "bg-white/80 text-emerald-600 dark:bg-slate-950/60 dark:text-emerald-400"
                                     : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"].join(" ")}>
                              <Icon className="h-4 w-4" />
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

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMood.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <Card className="relative overflow-hidden border-slate-200/80 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70">
                    <div aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeMood.gradient}`} />
                    <CardContent className="relative p-6 md:p-8">
                      <div className="mb-6">
                        <span aria-hidden className="mb-2 block text-4xl font-serif text-emerald-500/70 dark:text-emerald-400/60">&ldquo;</span>
                        <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                          {lang === "vi" ? activeMood.quoteVi : activeMood.quoteEn}
                        </blockquote>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">- {activeMood.quoteAuthor}</p>
                      </div>

                      <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${activePillarForLesson.iconBg} text-white shadow-lg shadow-emerald-500/20`}>
                            <activePillarForLesson.Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                              {t("Bài học được gợi ý", "Recommended lesson")}{" · "}
                              {lang === "vi" ? activePillarForLesson.titleVi : activePillarForLesson.titleEn}
                            </p>
                            <h3 className="mt-1 text-base md:text-lg font-semibold text-slate-900 dark:text-slate-50">
                              {lang === "vi" ? activeMood.lessonTitleVi : activeMood.lessonTitleEn}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />{activeMood.lessonMinutes} {t("phút", "min")}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                {activeMood.lessonMedium === "audio" ? (
                                  <><Headphones className="h-3.5 w-3.5" />{t("Nghe", "Audio")}</>
                                ) : (
                                  <><BookOpen className="h-3.5 w-3.5" />{t("Đọc", "Read")}</>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          onClick={() => {
                            setFilter(activeMood.lessonPillar);
                            document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {t("Bắt đầu bài học", "Start Lesson")}
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
        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-800 p-8 md:p-14 shadow-xl shadow-emerald-500/20 dark:border-emerald-500/30">
            <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {t(
                  "Trở thành phiên bản điềm tĩnh, tinh tế, vững vàng & khoẻ mạnh nhất của bạn.",
                  "Become the calmest, most graceful, most grounded, healthiest version of yourself.",
                )}
              </h2>
              <p className="mt-4 text-emerald-50/90 md:text-lg">
                {t(
                  "Mỗi ngày 3 phút. Mỗi tuần một thói quen. Sau một năm - một con người khác.",
                  "Three minutes a day. One habit a week. A different person a year from now.",
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                  <Link to="/dashboard">
                    {t("Vào bảng điều khiển học tập", "Go to my dashboard")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/contact">{t("Liên hệ tư vấn 1-1", "Book a 1-1 consult")}</Link>
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
interface StatChipProps { value: string; labelVi: string; labelEn: string; }
const StatChip = ({ value, labelVi, labelEn }: StatChipProps) => {
  const { t } = useLanguage();
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white/70 px-3 py-4 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
      <p className="text-xl md:text-2xl font-bold leading-tight text-slate-900 dark:text-slate-50">{value}</p>
      <p className="mt-1.5 text-[11px] uppercase leading-relaxed tracking-wider text-slate-500 dark:text-slate-400">{t(labelVi, labelEn)}</p>
    </div>
  );
};

/**
 * One collapsible pillar block on the "All" lessons list: a coloured header
 * band (icon, bilingual title, lesson + passed counts, chevron) plus the
 * lesson grid. Keeps pillar boundaries obvious when nothing is filtered.
 */
interface PillarLessonGroupProps {
  pillar: Pillar;
  lessons: LifestyleLesson[];
  open: boolean;
  onToggle: () => void;
  results: Record<string, LifestyleLessonResult>;
  onQuizFinish: (r: LifestyleLessonResult) => void;
}
const PillarLessonGroup = ({
  pillar, lessons, open, onToggle, results, onQuizFinish,
}: PillarLessonGroupProps) => {
  const { t, lang } = useLanguage();
  const styles = PILLAR_STYLES[pillar.key];
  const Icon = pillar.Icon;
  const passed = lessons.filter((l) => results[l.id]?.completed).length;
  const bodyId = `lesson-group-${pillar.key}`;

  return (
    <section className={`overflow-hidden rounded-2xl border-2 ${styles.border} ${styles.chipBg}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/60 dark:hover:bg-white/5 sm:px-5"
      >
        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.iconBg} text-white shadow-md`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-slate-900 dark:text-slate-50 sm:text-lg">
            {lang === "vi" ? pillar.titleVi : pillar.titleEn}
          </span>
          <span className={`mt-0.5 block text-sm font-medium ${pillar.accentText}`}>
            {lessons.length} {t("bài", "lessons")} · {passed}/{lessons.length}{" "}
            {t("đã đạt", "passed")}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/60 bg-white/70 px-4 py-5 dark:border-slate-800 dark:bg-slate-950/40 sm:px-5">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {lessons.map((lesson, i) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    index={i}
                    result={results[lesson.id]}
                    onQuizFinish={onQuizFinish}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface PillarCardProps { pillar: Pillar; onExplore: () => void; }
const PillarCard = ({ pillar, onExplore }: PillarCardProps) => {
  const { t, lang } = useLanguage();
  const Icon = pillar.Icon;
  const pillarLessonCount = LIFESTYLE_LESSONS.filter((l) => l.pillar === pillar.key).length;
  const pillarMinutes = LIFESTYLE_LESSONS
    .filter((l) => l.pillar === pillar.key)
    .reduce((sum, l) => sum + l.minutes, 0);

  return (
    <Card className={["group h-full overflow-hidden border-slate-200/80 bg-white/90 transition-shadow",
      "hover:shadow-xl hover:shadow-emerald-500/10 hover:ring-2", pillar.ring,
      "dark:border-slate-800 dark:bg-slate-900/70"].join(" ")}>
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${pillar.iconBg} text-white shadow-lg transition-transform group-hover:scale-105`}>
            <Icon className="h-6 w-6" />
          </span>
          <div className="text-right text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-200">{pillarLessonCount} {t("bài", "lessons")}</p>
            <p>{pillarMinutes} {t("phút", "min")}</p>
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

        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-3 dark:border-slate-700 dark:bg-slate-800/40">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
            {t("Khoá học tiêu biểu", "Sample course")}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
            {lang === "vi" ? pillar.sampleCourseVi : pillar.sampleCourseEn}
          </p>
        </div>

        <ul className="mt-4 space-y-1.5">
          {pillar.highlights.map((h) => (
            <li key={h.en} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span aria-hidden className={`mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br ${pillar.iconBg}`} />
              <span>{lang === "vi" ? h.vi : h.en}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex-1" />

        <Button
          onClick={onExplore}
          className="mt-4 justify-between border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:shadow-md hover:shadow-emerald-500/30"
        >
          <span className="font-semibold">{t("Xem tất cả bài học", "See all lessons")}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
};

// ─── Lesson card: opens the full lesson in a dialog ─────
interface LessonCardProps {
  lesson: LifestyleLesson;
  index: number;
  result?: LifestyleLessonResult;
  onQuizFinish: (result: LifestyleLessonResult) => void;
}
const LessonCard = ({ lesson, index, result, onQuizFinish }: LessonCardProps) => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const pillar = PILLARS.find((p) => p.key === lesson.pillar)!;
  const Icon = pillar.Icon;
  const MediumIcon = lesson.medium === "audio" ? Headphones : lesson.medium === "practice" ? Target : BookOpen;
  const levelLabel = {
    foundation: { vi: "Nền tảng", en: "Foundation" },
    intermediate: { vi: "Trung cấp", en: "Intermediate" },
    mastery: { vi: "Nâng cao", en: "Mastery" },
  }[lesson.level];

  const styles = PILLAR_STYLES[lesson.pillar];
  const image = getLessonImage(lesson.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.35, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        role="button"
        tabIndex={0}
        aria-label={lang === "vi" ? lesson.titleVi : lesson.titleEn}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={[
          "flex h-full cursor-pointer flex-col overflow-hidden border-2 bg-white/95 transition-all",
          "hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary",
          styles.border,
          styles.borderStrong,
          "dark:bg-slate-900/70",
        ].join(" ")}
      >
        {/* Lesson illustration (CDN image, emoji fallback) */}
        <div className={`relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-gradient-to-br ${styles.bannerFrom} ${styles.bannerTo}`}>
          {image ? (
            <img
              src={image}
              alt={lang === "vi" ? lesson.titleVi : lesson.titleEn}
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={576}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gap-3 text-3xl" aria-hidden>
              {(lesson.illustrationEmojis ?? styles.emojis).slice(0, 4).map((e, idx) => (
                <span key={idx}>{e}</span>
              ))}
            </div>
          )}
          <span className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-100 ${styles.chipBg} border border-slate-200/70 dark:border-slate-700 shadow-sm`}>
            {lang === "vi" ? levelLabel.vi : levelLabel.en}
          </span>
          {result?.completed ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              <CheckCircle2 className="h-3 w-3" />
              {t("Hoàn thành", "Done")}
            </span>
          ) : result ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              {t("Chưa đạt - làm lại", "Not passed - retry")}
            </span>
          ) : null}

        </div>

        <CardContent className="flex flex-1 flex-col p-6">
          <div className="flex items-start gap-3">
            <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.iconBg} text-white shadow-md`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className={pillar.accentText}>
                  {lang === "vi" ? pillar.titleVi : pillar.titleEn}
                </span>
                <span>·</span>
                <span>{lang === "vi" ? levelLabel.vi : levelLabel.en}</span>
              </div>
              <h3 className="mt-1 text-base md:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
                {lang === "vi" ? lesson.titleVi : lesson.titleEn}
              </h3>
            </div>
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === "vi" ? lesson.subtitleVi : lesson.subtitleEn}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />{lesson.minutes} {t("phút", "min")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MediumIcon className="h-3.5 w-3.5" />
              {lesson.medium === "audio" ? t("Nghe", "Audio") : lesson.medium === "practice" ? t("Thực hành", "Practice") : t("Đọc", "Read")}
            </span>
            {result && (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <ClipboardCheck className="h-3.5 w-3.5" />
                {result.score}/{result.maxScore}
              </span>
            )}
          </div>

          <div className="flex-1" />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="mt-4 w-full justify-between border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:shadow-md hover:shadow-emerald-500/30"
          >
            <span className="font-semibold">{t("Xem bài học & làm quiz", "Open lesson & quiz")}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <LessonDialog
        lesson={lesson}
        open={open}
        onOpenChange={setOpen}
        styles={styles}
        iconBg={pillar.iconBg}
        accentText={pillar.accentText}
        pillarTitle={lang === "vi" ? pillar.titleVi : pillar.titleEn}
        levelLabel={lang === "vi" ? levelLabel.vi : levelLabel.en}
        onQuizFinish={onQuizFinish}
        previousScore={result?.score}
      />
    </motion.div>
  );
};


export default LifestyleAcademy;
