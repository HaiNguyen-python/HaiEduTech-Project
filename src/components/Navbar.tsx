/**
 * @file Navbar.tsx
 * @description Main navigation bar for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Brain, BookOpen, Languages, Code2, GraduationCap,
  Globe, UserPlus, Heart, LogIn, ChevronDown, ChevronRight, Cpu, LogOut, Library, Shield,
  FileText, PenTool, Map, MessageSquare, Award, School, Swords, User, LayoutDashboard, Newspaper,
  FolderLock, Compass, Briefcase, Trophy, Sparkles, Bot, Database, Workflow, Cloud, Network, Gamepad2, MessagesSquare, Target, Settings2, Flame, Music, Quote, Mic2, Crown, BookType, Blocks, Rocket, Users, Plane, ClipboardCheck, FlaskConical
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useStreak } from "@/hooks/useStreak";
import { useDisplayName } from "@/hooks/useDisplayName";
import teacherLogo from "@/assets/teacher-logo.webp";
import teacherWave from "@/assets/teacher-wave.webp";
import robotIconImg from "@/assets/ai-chibi-robot.png";
import GlobalSearch from "@/components/GlobalSearch";
import NotificationBell from "@/components/NotificationBell";
import UpgradeAccountModal from "@/components/UpgradeAccountModal";

// Small robot image wrapper for menu icon
const RobotIcon = ({ className }: { className?: string }) => (
  <img src={robotIconImg} alt="" className={`${className || ""} object-contain`} />
);

// Sub-item with optional icon and nested children
interface SubItem {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SubItem[];
  groupLabel?: string;
  divider?: boolean;
  header?: boolean;
}

// Per-subject hover color identity for desktop dropdowns.
// All class strings are full literals so Tailwind can safelist them.
interface SubjectColor {
  trigger: string;      // top-level menu trigger hover
  rowHover: string;     // nested group row hover
  rowActive: string;    // nested group row while its flyout is open
  childHover: string;   // link hover inside panels
  icon: string;         // icon tint inside panels
  header: string;       // flyout group header label
  accent: string;       // left accent bar on hover
}
const SUBJECT_COLORS: Record<string, SubjectColor> = {
  home: {
    trigger: "hover:text-teal-600 hover:bg-teal-500/10",
    rowHover: "hover:text-teal-600 hover:bg-teal-500/10",
    rowActive: "text-teal-600 bg-teal-500/10",
    childHover: "hover:text-teal-600 hover:bg-teal-500/10",
    icon: "text-teal-500/80",
    header: "text-teal-600",
    accent: "hover:border-teal-500",
  },
  about: {
    trigger: "hover:text-orange-600 hover:bg-orange-500/10",
    rowHover: "hover:text-orange-600 hover:bg-orange-500/10",
    rowActive: "text-orange-600 bg-orange-500/10",
    childHover: "hover:text-orange-600 hover:bg-orange-500/10",
    icon: "text-orange-500/80",
    header: "text-orange-600",
    accent: "hover:border-orange-500",
  },
  en: {
    trigger: "hover:text-blue-600 hover:bg-blue-500/10",
    rowHover: "hover:text-blue-600 hover:bg-blue-500/10",
    rowActive: "text-blue-600 bg-blue-500/10",
    childHover: "hover:text-blue-600 hover:bg-blue-500/10",
    icon: "text-blue-500/80",
    header: "text-blue-600",
    accent: "hover:border-blue-500",
  },
  vn: {
    trigger: "hover:text-amber-600 hover:bg-amber-500/10",
    rowHover: "hover:text-amber-600 hover:bg-amber-500/10",
    rowActive: "text-amber-600 bg-amber-500/10",
    childHover: "hover:text-amber-600 hover:bg-amber-500/10",
    icon: "text-amber-500/80",
    header: "text-amber-600",
    accent: "hover:border-amber-500",
  },
  cn: {
    trigger: "hover:text-red-600 hover:bg-red-500/10",
    rowHover: "hover:text-red-600 hover:bg-red-500/10",
    rowActive: "text-red-600 bg-red-500/10",
    childHover: "hover:text-red-600 hover:bg-red-500/10",
    icon: "text-red-500/80",
    header: "text-red-600",
    accent: "hover:border-red-500",
  },
  jp: {
    trigger: "hover:text-rose-600 hover:bg-rose-500/10",
    rowHover: "hover:text-rose-600 hover:bg-rose-500/10",
    rowActive: "text-rose-600 bg-rose-500/10",
    childHover: "hover:text-rose-600 hover:bg-rose-500/10",
    icon: "text-rose-500/80",
    header: "text-rose-600",
    accent: "hover:border-rose-500",
  },
  fi: {
    trigger: "hover:text-cyan-600 hover:bg-cyan-500/10",
    rowHover: "hover:text-cyan-600 hover:bg-cyan-500/10",
    rowActive: "text-cyan-600 bg-cyan-500/10",
    childHover: "hover:text-cyan-600 hover:bg-cyan-500/10",
    icon: "text-cyan-500/80",
    header: "text-cyan-600",
    accent: "hover:border-cyan-500",
  },
  sv: {
    trigger: "hover:text-indigo-600 hover:bg-indigo-500/10",
    rowHover: "hover:text-indigo-600 hover:bg-indigo-500/10",
    rowActive: "text-indigo-600 bg-indigo-500/10",
    childHover: "hover:text-indigo-600 hover:bg-indigo-500/10",
    icon: "text-indigo-500/80",
    header: "text-indigo-600",
    accent: "hover:border-indigo-500",
  },
  prog: {
    trigger: "hover:text-emerald-600 hover:bg-emerald-500/10",
    rowHover: "hover:text-emerald-600 hover:bg-emerald-500/10",
    rowActive: "text-emerald-600 bg-emerald-500/10",
    childHover: "hover:text-emerald-600 hover:bg-emerald-500/10",
    icon: "text-emerald-500/80",
    header: "text-emerald-600",
    accent: "hover:border-emerald-500",
  },
  lifestyle: {
    trigger: "hover:text-violet-600 hover:bg-violet-500/10",
    rowHover: "hover:text-violet-600 hover:bg-violet-500/10",
    rowActive: "text-violet-600 bg-violet-500/10",
    childHover: "hover:text-violet-600 hover:bg-violet-500/10",
    icon: "text-violet-500/80",
    header: "text-violet-600",
    accent: "hover:border-violet-500",
  },
  yc: {
    trigger: "hover:text-pink-600 hover:bg-pink-500/10",
    rowHover: "hover:text-pink-600 hover:bg-pink-500/10",
    rowActive: "text-pink-600 bg-pink-500/10",
    childHover: "hover:text-pink-600 hover:bg-pink-500/10",
    icon: "text-pink-500/80",
    header: "text-pink-600",
    accent: "hover:border-pink-500",
  },
};
const DEFAULT_SUBJECT_COLOR: SubjectColor = {
  trigger: "hover:text-foreground hover:bg-secondary",
  rowHover: "hover:text-foreground hover:bg-secondary/80",
  rowActive: "text-primary bg-primary/10",
  childHover: "hover:text-primary hover:bg-primary/5",
  icon: "text-primary/70",
  header: "text-primary",
  accent: "hover:border-primary",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  // Smart flyout placement: flyouts render with position:fixed at viewport
  // coordinates so they escape the scrollable panel's clipping box, flipping
  // upward / leftward when they would overflow. maxH caps the flyout to the
  // space actually available on the chosen side.
  const [flyoutPos, setFlyoutPos] = useState<{
    up: boolean; left: boolean; maxH: number;
    top?: number; bottom?: number; leftPx?: number; rightPx?: number;
  }>({ up: false, left: false, maxH: 480 });
  // `scrolled` state removed: it was unused and forced a Navbar re-render on every
  // scroll event, which caused noticeable flicker on long pages with heavy SVG
  // content (e.g. Mermaid diagrams in lessons).
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeSubmenuAnchorRef = useRef<HTMLElement | null>(null);
  const { user, isTeacher, isPureAssistant } = useUserRole();
  const isAdminRoute = location.pathname === "/admin-dashboard" || location.pathname.startsWith("/admin/");
  const { streak } = useStreak(!isAdminRoute);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Display name comes from the saved profile first (see useDisplayName),
  // so a student renaming themselves in Dashboard shows up everywhere.
  const displayName = useDisplayName(user, "User");

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll listener removed - see comment near `scrolled` state above.

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // IELTS nested sub-items with dedicated icons
   const ieltsSkillsPracticeChildren: SubItem[] = [
    { to: "/ielts-writing-practice", label: t("Luyện viết", "Writing Practice"), icon: PenTool },
    { to: "/ielts-speaking-practice", label: t("Luyện nói", "Speaking Practice"), icon: MessageSquare },
    { to: "/ielts-reading-practice", label: t("Luyện đọc", "Reading Practice"), icon: BookOpen },
    { to: "/ielts-listening-practice", label: t("Luyện nghe", "Listening Practice"), icon: Mic2 },
  ];
   const ieltsChildren: SubItem[] = [
    // 📚 Học & Ôn
    { to: "#h-study", label: t("Học & Ôn", "Study & Review"), header: true },
    { to: "/english/ielts", label: t("Tổng quan & Lộ trình", "Overview & Roadmap"), icon: Map },
    { to: "/ielts-lectures", label: t("Bài giảng IELTS", "IELTS Lectures"), icon: BookOpen },
    // 📖 Từ vựng
    { to: "#h-vocab", label: t("Từ vựng", "Vocabulary"), header: true },
    { to: "/ielts-vocabulary", label: t("Từ vựng IELTS", "IELTS Vocabulary"), icon: BookOpen },
    // ✍️ Luyện tập & Chấm
    { to: "#h-practice", label: t("Luyện tập & Chấm điểm", "Practice & Grading"), header: true },
    { to: "/ielts-skills-practice", label: t("IELTS Skills Practice", "IELTS Skills Practice"), icon: PenTool },
    // 📊 Đánh giá & Tiến độ
    { to: "#h-analysis", label: t("Đánh giá & Tiến độ", "Progress & Analysis"), header: true },
    { to: "/ielts-performance", label: t("Your IELTS Performance", "Your IELTS Performance"), icon: ClipboardCheck },
  ];



  // National Exam nested sub-items
  const nationalExamChildren: SubItem[] = [
    { to: "/national-exam/essential-review", label: t("Ngữ pháp & Từ vựng cốt lõi", "Essential Grammar & Vocabulary"), icon: BookOpen },
    { to: "/national-exam", label: t("Phòng luyện thi TN THPT", "Exam Practice Room"), icon: FileText },
  ];

  const englishSubs: SubItem[] = [
    { to: "/english", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/placement-test?subject=english", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
    { to: "#en-div1", label: "", divider: true },
    // Cambridge exam groups first
    { to: "#en-foundation-group", label: t("📖 Cambridge Starters -> PET", "📖 Cambridge Starters -> PET"), groupLabel: "en-foundation", children: [
      { to: "/cambridge-lectures", label: t("🎓 Cambridge Test Prep", "🎓 Cambridge Test Prep") },
      { to: "/cambridge-yle-vocabulary", label: t("🌈 Cambridge YLE Vocabulary & Games", "🌈 Cambridge YLE Vocabulary & Games") },
      { to: "/cambridge-speaking-practice", label: t("🎤 Cambridge Speaking Practice", "🎤 Cambridge Speaking Practice") },
    ] },

    // IELTS - promoted to top-level so all 10 IELTS items are reachable in one hover
    { to: "#ielts-group", label: t("🎯 Cambridge IELTS", "🎯 Cambridge IELTS"), groupLabel: "ielts", children: ieltsChildren },
    // English Essentials and Advanced English
    { to: "/english/essentials", label: t("💎 Tinh hoa Anh ngữ", "💎 Foundational English") },
    { to: "#en-advanced-group", label: t("🚀 Tiếng Anh Nâng cao", "🚀 Advanced English"), groupLabel: "en-advanced", children: [
      { to: "/english/business", label: t("💼 Tiếng Anh Thương mại", "💼 Business English") },
      { to: "/english/academic", label: t("🎓 Tiếng Anh Học thuật", "🎓 Academic English") },
      { to: "/specialized-language?lang=english", label: t("🧠 Tiếng Anh Chuyên ngành", "🧠 Specialized English") },
    ] },
    // Combined: international exams + national exam under one group
    { to: "#en-other-exams-group", label: t("🌐 Các kỳ thi tiếng Anh khác", "🌐 Other English Exams"), groupLabel: "en-other-exams", children: [
      { to: "/toeic", label: "TOEIC", icon: BookOpen },
      { to: "/pte", label: "PTE Academic", icon: Target },
      { to: "/english/sat", label: "SAT", icon: PenTool },
      { to: "#en-other-exams-div", label: "", divider: true },
      ...nationalExamChildren,
    ] },
    { to: "#en-div2", label: "", divider: true },
    // Combined: fun facts + songs under one group
    { to: "#en-fun-group", label: t("✨ Bài học tiếng Anh vui", "✨ Fun English Lessons"), groupLabel: "en-fun", children: [
      { to: "/english/fun-facts", label: t("✨ Fun Facts tiếng Anh", "✨ English Fun Facts") },
      { to: "/songs/english", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    ] },
    // Combined: speaking coach + presentation studio under one group
    { to: "#en-speaking-group", label: t("🎙️ Luyện nói", "🎙️ Speaking Studio"), groupLabel: "en-speaking", children: [
      { to: "/speaking-coach/english", label: t("🎙️ Speaking Coach", "🎙️ Speaking Coach") },
      { to: "/presentation-studio", label: t("🎤 Presentation & Public Speaking", "🎤 Presentation & Public Speaking") },
    ] },
  ];
  const chineseSubs: SubItem[] = [
    { to: "/chinese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/placement-test?subject=chinese", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
    { to: "#cn-hsk-group", label: t("🎓 Lộ trình HSK", "🎓 HSK Program"), groupLabel: "cn-hsk", children: [
      { to: "/chinese/hsk-guide", label: t("🎓 HSK Exam Guide", "🎓 HSK Exam Guide") },
      { to: "/chinese/hsk-grammar", label: t("📐 HSK Grammar", "📐 HSK Grammar") },
      { to: "/chinese/hsk/vocabulary", label: t("📖 HSK Vocabulary", "📖 HSK Vocabulary") },
      { to: "/chinese/hsk/test", label: t("📝 HSK Test (Đề thi thử)", "📝 HSK Test (Mock Exams)") },
      { to: "/chinese/hskk", label: t("🎙️ HSKK Speaking (Beta)", "🎙️ HSKK Speaking (Beta)") },
    ] },
    { to: "#cn-foundation-skills-group", label: t("🈶 Kỹ năng nền tảng", "🈶 Foundation Skills"), groupLabel: "cn-foundation-skills", children: [
      { to: "/chinese/pronunciation", label: t("🔊 Phát âm Pinyin", "🔊 Pinyin Pronunciation") },
      { to: "/chinese/strokes", label: t("✍️ Hướng dẫn nét bút", "✍️ Stroke Order Guide") },
      { to: "/chinese/tone-drill", label: t("🎯 Tone Drill 四声训练", "🎯 Tone Drill 四声训练") },
    ] },
    { to: "#cn-foundation-group", label: t("🧱 Communication Program", "🧱 Communication Program"), groupLabel: "cn-foundation", children: [
      { to: "/chinese/conversational/curriculum", label: t("🎯 Chương trình Tương tác", "🎯 Interactive Curriculum") },
      { to: "/chinese/culture", label: t("🎎 Văn hóa Giao tiếp", "🎎 Communication Culture") },
      { to: "/chinese/reading", label: t("📖 Luyện đọc", "📖 Reading Practice") },
      { to: "/chinese/listening", label: t("🎧 Luyện nghe", "🎧 Listening Practice") },
    ] },
    { to: "#cn-practice-group", label: t("🎯 Luyện tập & Giải trí", "🎯 Practice & Fun"), groupLabel: "cn-practice", children: [
      { to: "/chinese/arcade", label: t("🎮 Chinese Arcade Hub", "🎮 Chinese Arcade Hub") },
      { to: "/songs/chinese", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
      { to: "/speaking-coach/chinese", label: t("🎙️ Speaking Coach", "🎙️ Speaking Coach") },
      { to: "/specialized-language?lang=chinese", label: t("🧠 Tiếng Trung Chuyên ngành", "🧠 Specialized Chinese") },
    ] },
  ];
  const vietnameseSubs: SubItem[] = [
    { to: "/learn-vietnamese", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/placement-test?subject=vietnamese", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
    { to: "#vn-div1", label: "", divider: true },
    { to: "#vn-curriculum-group", label: t("📚 Chương trình học", "📚 Curriculum"), groupLabel: "vn-curriculum", children: [
      { to: "/learn-vietnamese?tab=language", label: t("📝 Ngữ pháp Tiếng Việt", "📝 Vietnamese Grammar") },
      { to: "/learn-vietnamese/vocabulary", label: t("📖 Từ vựng Tiếng Việt", "📖 Vietnamese Vocabulary") },
      { to: "/learn-vietnamese?tab=history", label: t("📜 Lịch sử & Văn hóa Việt Nam", "📜 Vietnamese History & Culture") },
      { to: "/learn-vietnamese/national-anthem", label: t("⭐ Quốc ca Việt Nam", "⭐ Vietnamese National Anthem") },
    ] },
    { to: "#vn-culture-group", label: t("🎎 Văn hóa & Đời sống", "🎎 Culture & Lifestyle"), groupLabel: "vn-culture", children: [
      { to: "/learn-vietnamese/cuisine", label: t("🍜 Ẩm thực Việt Nam", "🍜 Vietnamese Cuisine") },
      { to: "/learn-vietnamese/regions", label: t("🗺️ Du lịch & Vùng miền", "🗺️ Travel & Regions") },
      { to: "/learn-vietnamese/culture", label: t("🎭 Văn hóa & Phong tục", "🎭 Culture & Customs") },
      { to: "/learn-vietnamese/films", label: t("🎬 Phim & Hội thoại", "🎬 Films & Conversations") },
    ] },
    { to: "#vn-practice-group", label: t("🎯 Luyện tập & Tương tác", "🎯 Practice & Interactive"), groupLabel: "vn-practice", children: [
      { to: "/learn-vietnamese?tab=game", label: t("🎮 Trò chơi", "🎮 Games") },
      { to: "/learn-vietnamese/arcade", label: t("🕹️ Vietnamese Arcade Hub", "🕹️ Vietnamese Arcade Hub") },
      { to: "/learn-vietnamese/daily", label: t("📅 Daily Vietnamese", "📅 Daily Vietnamese") },
      { to: "/learn-vietnamese/phrasebook", label: t("💬 Phrasebook tình huống", "💬 Situational Phrasebook") },
    ] },
    { to: "#vn-foreigners-group", label: t("🌏 Cho người học đặc biệt", "🌏 For Special Learners"), groupLabel: "vn-foreigners", children: [
      { to: "/learn-vietnamese/for-foreigners", label: t("🌏 Vietnamese for Foreigners", "🌏 Vietnamese for Foreigners") },
      { to: "/learn-vietnamese/kids-overseas", label: t("👨‍👩‍👧 Cho trẻ Việt kiều", "👨‍👩‍👧 For Overseas Vietnamese Kids") },
    ] },
    { to: "#vn-div2", label: "", divider: true },
    { to: "/songs/vietnamese", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
    { to: "/speaking-coach/vietnamese", label: t("🎙️ Speaking Coach", "🎙️ Speaking Coach") },
    { to: "/specialized-language?lang=vietnamese", label: t("🧠 Tiếng Việt Chuyên ngành", "🧠 Specialized Vietnamese") },
  ];
  const finnishSubs: SubItem[] = [
    { to: "/finnish", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/placement-test?subject=finnish", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
    { to: "#fi-path-group", label: t("🎓 Lộ trình A1-B1", "🎓 Study Path A1-B1"), groupLabel: "fi-path", children: [
      { to: "/finnish/beginner", label: t("🌱 Người mới (A1–A2)", "🌱 Beginner (A1–A2)") },
      { to: "/finnish/yki-dashboard", label: t("❄️ YKI A2 Dashboard", "❄️ YKI A2 Dashboard") },
      { to: "/finnish/yki-b1", label: t("🎯 YKI B1 Dashboard", "🎯 YKI B1 Dashboard") },
    ] },
    { to: "/finnish-vocabulary", label: t("📚 Từ vựng tiếng Phần Lan A1–B1", "📚 Finnish Vocabulary A1–B1") },
    { to: "/finnish/life-in-finland", label: t("🇫🇮 Cuộc sống ở Phần Lan", "🇫🇮 Life in Finland") },
    { to: "#fi-practice-group", label: t("🎯 Luyện tập & Giải trí", "🎯 Practice & Fun"), groupLabel: "fi-practice", children: [
      { to: "/finnish/arcade", label: t("🕹️ Finnish Arcade Hub", "🕹️ Finnish Arcade Hub") },
      { to: "/songs/finnish", label: t("🎵 Học qua bài hát", "🎵 Learn through Songs") },
      { to: "/speaking-coach/finnish", label: t("🎙️ Speaking Coach", "🎙️ Speaking Coach") },
      { to: "/specialized-language?lang=finnish", label: t("🧠 Tiếng Phần Lan Chuyên ngành", "🧠 Specialized Finnish") },
    ] },
  ];
  const swedishSubs: SubItem[] = [
    { to: "/swedish", label: t("📚 Tổng quan", "📚 Overview") },
    { to: "/placement-test?subject=swedish", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
    { to: "#sv-path-group", label: t("🎓 Lộ trình A1-B1", "🎓 Study Path A1-B1"), groupLabel: "sv-path", children: [
      { to: "/swedish/beginner", label: t("🌱 Người mới A1", "🌱 Swedish Beginner A1") },
      { to: "/swedish/yki-a2", label: t("❄️ Swedish YKI A2", "❄️ Swedish YKI A2") },
      { to: "/swedish/yki-b1", label: t("🎯 Swedish YKI B1", "🎯 Swedish YKI B1") },
    ] },
    { to: "/swedish/svenskfinland", label: t("🇸🇪 Sống bằng tiếng Thụy Điển ở Phần Lan", "🇸🇪 Life in Swedish-speaking Finland") },
    { to: "#sv-learning-group", label: t("📚 Học tập & Kỹ năng", "📚 Learning & Skills"), groupLabel: "sv-learning", children: [
      { to: "/swedish/vocabulary", label: t("📚 Swedish Vocabulary A1–B1", "📚 Swedish Vocabulary A1–B1") },
      { to: "/swedish/curriculum", label: t("📖 Interactive Curriculum", "📖 Interactive Curriculum") },
      { to: "/swedish/skills", label: t("🧪 Skills Lab - Nghe · Đọc · Viết · Nói A1-B1", "🧪 Skills Lab") },
      { to: "/speaking-coach/swedish", label: t("🗣️ Speaking Coach", "🗣️ Speaking Coach") },
    ] },
  ];
  const programmingSubs: SubItem[] = [
    { to: "/programming", label: t("Tổng quan", "Overview"), icon: Compass },
    { to: "/placement-test?subject=programming", label: t("Placement Test & Personalization", "Placement Test & Personalization"), icon: ClipboardCheck },
    { to: "#prog-foundation-group", label: t("Lộ trình Cơ bản", "Foundation Track"), icon: Blocks, groupLabel: "prog-foundation", children: [
      { to: "/programming?pillar=python-pathway", label: t("Introduction to Programming", "Introduction to Programming"), icon: Code2 },
      { to: "/python-challenges", label: t("150 Thử thách Python", "150 Python Challenges"), icon: Trophy },
      { to: "/programming/basic/dsa", label: t("Cấu trúc dữ liệu & Giải thuật", "Data Structures & Algorithms"), icon: Network },
    ] },
    { to: "#prog-ai-data-group", label: t("AI & Data Engineering", "AI & Data Engineering"), icon: Brain, groupLabel: "prog-ai-data", children: [
      { to: "/programming/ai-academy", label: t("AI Academy", "AI Academy"), icon: Bot },
      { to: "/programming/prog-ai-foundation", label: t("AI Foundation", "AI Foundation"), icon: Brain },
      { to: "/programming/prog-prompt-engineering", label: t("Prompt Engineering ✍️", "Prompt Engineering ✍️"), icon: Sparkles },
      { to: "/programming/prog-ml", label: t("Machine Learning", "Machine Learning"), icon: Bot },
      { to: "/programming/dl-foundations", label: t("Deep Learning", "Deep Learning"), icon: Network },
      { to: "/programming/reinforcement-learning", label: t("Reinforcement Learning", "Reinforcement Learning"), icon: Gamepad2 },
      { to: "/programming/nlp", label: t("NLP - Xử lý Ngôn ngữ", "NLP - Language Processing"), icon: Languages },
      { to: "#div-ai", label: "", divider: true },
      { to: "/programming/prog-sql", label: t("SQL & Database", "SQL & Database"), icon: Database },
      { to: "/programming/prog-data-pipeline", label: t("Data Engineer", "Data Engineer"), icon: Workflow },
      { to: "/programming/cloud-fundamentals", label: t("Cloud Engineer", "Cloud Engineer"), icon: Cloud },
    ] },
    { to: "#prog-software-web-group", label: t("Phần mềm, Web & Bảo mật", "Software, Web & Security"), icon: Code2, groupLabel: "prog-software-web", children: [
      { to: "/programming/software-eng", label: t("Software & Web Engineering", "Software & Web Engineering"), icon: Code2 },
      { to: "/programming/se-foundations/se-git", label: t("Git Branching Simulator", "Git Branching Simulator"), icon: Workflow },
      { to: "/programming/software-eng-interview", label: t("Software Engineer Interview", "Software Engineer Interview"), icon: MessagesSquare },
      { to: "/programming/cybersecurity", label: t("Cybersecurity", "Cybersecurity"), icon: Shield },
    ] },
    { to: "#prog-edtech-group", label: t("EdTech", "EdTech"), icon: GraduationCap, groupLabel: "prog-edtech", children: [
      { to: "/programming/edtech", label: t("📚 EdTech Lessons", "📚 EdTech Lessons"), icon: GraduationCap },
      { to: "/edtech-research", label: t("🔬 EdTech Research", "🔬 EdTech Research"), icon: FlaskConical },
      { to: "/dich-vu-web", label: t("🎨 EdTech Design", "🎨 EdTech Design"), icon: PenTool },
    ] },
    
    { to: "#prog-startup-group", label: t("Startup", "Startup"), icon: Rocket, groupLabel: "prog-startup", children: [
      { to: "/programming/startup", label: t("Tổng quan Startup Tech", "Startup Tech Overview"), icon: Compass },
      { to: "/programming/startup/roadmap", label: t("Lộ trình Founder 0→1", "Founder Roadmap 0→1"), icon: Sparkles },
      { to: "/programming/startup-1-founder/su-1-1", label: t("Bài học Startup (30)", "Startup Lessons (30)"), icon: GraduationCap },
      { to: "/programming/startup/case-studies", label: t("Case Studies VN & Global", "Case Studies VN & Global"), icon: Trophy },
      { to: "/programming/startup/toolkit", label: t("Startup Toolkit", "Startup Toolkit"), icon: Workflow },
      { to: "/programming/startup/pitch-simulator", label: t("Pitch Simulator (AI Investor)", "Pitch Simulator (AI Investor)"), icon: MessagesSquare },
    ] },
    { to: "#prog-career-group", label: t("Sự nghiệp & Dự án", "Career & Projects"), icon: Rocket, groupLabel: "prog-career", children: [
      { to: "/programming/career-roadmap", label: t("Career Roadmap", "Career Roadmap"), icon: Sparkles },
      { to: "/programming/interview-questions", label: t("Câu hỏi Phỏng vấn", "Interview Questions"), icon: MessagesSquare },
      { to: "/programming/job-opportunities", label: t("Cơ hội Việc làm 🇫🇮", "Job Opportunities 🇫🇮"), icon: Target },
      { to: "/programming?pillar=professional-projects", label: t("Dự án Chuyên nghiệp", "Professional Projects"), icon: Rocket },
    ] },
    { to: "/programming/arcade", label: t("Tech & Code Game Hub", "Tech & Code Game Hub"), icon: Gamepad2 },
  ];

  const studyAbroadSubs: SubItem[] = [
    { to: "/study-abroad", label: t("🌍 Tổng quan", "🌍 Overview"), icon: Compass },
    { to: "/global-scholarship", label: t("💰 Global Scholarship", "💰 Global Scholarship"), icon: Newspaper },
    { to: "/study-abroad/documents", label: t("📁 Hồ sơ của tôi", "📁 My Documents"), icon: FolderLock },
    { to: "/study-abroad/motivation-letter", label: t("✍️ Motivation Letter + LoR", "✍️ Motivation Letter + LoR"), icon: FileText },
    { to: "/study-abroad/cv", label: t("📄 CV Builder", "📄 CV Builder"), icon: FileText },
    { to: "/study-abroad/sat", label: t("📝 SAT Roadmap", "📝 SAT Roadmap"), icon: GraduationCap },
    { to: "/study-abroad/phd", label: t("🎓 PhD Pathway", "🎓 PhD Pathway"), icon: GraduationCap },
    { to: "/study-abroad/mentor-hub", label: t("👥 Mentor Hub", "👥 Mentor Hub"), icon: Users },
    { to: "/study-abroad/checklist", label: t("✈️ Pre-Departure", "✈️ Pre-Departure"), icon: Plane },
  ];

  const baseLinks = [
    { to: "/", label: t("Trang chủ", "Home"), icon: GraduationCap, key: "home" },
    { to: "/about", label: t("Giới thiệu", "About"), icon: Brain, key: "about" },
    { to: "/english", label: t("Tiếng Anh", "English"), icon: BookOpen, subs: englishSubs, key: "en" },
    { to: "/learn-vietnamese", label: t("Tiếng Việt", "Vietnamese"), icon: Globe, subs: vietnameseSubs, key: "vn" },
    { to: "/chinese", label: t("Tiếng Trung", "Chinese"), icon: Languages, subs: chineseSubs, key: "cn" },
    { to: "/japanese", label: t("Tiếng Nhật", "Japanese"), icon: Globe, subs: [
      { to: "/japanese", label: t("🌸 Tổng quan Tiếng Nhật", "🌸 Japanese Overview") },
      { to: "/placement-test?subject=japanese", label: t("📝 Placement Test & Personalization", "📝 Placement Test & Personalization") },
      { to: "#ja-learning-group", label: t("📚 Chương trình học", "📚 Learning Program"), groupLabel: "ja-learning", children: [
        { to: "/japanese?tab=kana", label: t("🈶 Hiragana & Katakana", "🈶 Hiragana & Katakana") },
        { to: "/japanese?tab=greetings", label: t("💬 Chào hỏi & Giao tiếp", "💬 Greetings & Conversation") },
        { to: "/japanese?tab=numbers", label: t("🔢 Số đếm & Thời gian", "🔢 Numbers & Time") },
        { to: "/japanese?tab=grammar", label: t("✍️ Ngữ pháp N5", "✍️ N5 Grammar") },
      ] },
      { to: "#ja-vocab-group", label: t("📖 Từ vựng & Kanji", "📖 Vocabulary & Kanji"), groupLabel: "ja-vocab", children: [
        { to: "/japanese?tab=vocab", label: t("📖 Từ vựng theo chủ đề", "📖 Vocabulary by Topic") },
        { to: "/japanese?tab=kanji", label: t("🈴 Kanji theo nhóm", "🈴 Kanji by Group") },
        { to: "/japanese?tab=flashcards", label: t("🃏 Flashcard", "🃏 Flashcards") },
        { to: "/japanese?tab=quest", label: t("✨ Word Quest", "✨ Word Quest") },
        { to: "/japanese?tab=mission", label: t("🎯 Nhiệm vụ hằng ngày", "🎯 Daily Mission") },
      ] },
      { to: "#ja-grammar-group", label: t("🔀 Ngữ pháp nâng cao", "🔀 Advanced Grammar"), groupLabel: "ja-grammar", children: [
        { to: "/japanese?tab=verbs", label: t("🔀 Chia động từ", "🔀 Verb Trainer") },
        { to: "/japanese?tab=counters", label: t("🔢 Lượng từ", "🔢 Counters") },
        { to: "/japanese?tab=keigo", label: t("🎓 Kính ngữ", "🎓 Keigo Lab") },
      ] },
      { to: "#ja-skills-group", label: t("🎯 Luyện 4 kỹ năng", "🎯 Four Skills Practice"), groupLabel: "ja-skills", children: [
        { to: "/japanese?tab=dialogues", label: t("🗣️ Hội thoại tình huống", "🗣️ Situational Dialogues") },
        { to: "/japanese?tab=reading", label: t("📖 Luyện đọc", "📖 Reading Lab") },
        { to: "/japanese?tab=listening", label: t("🎧 Luyện nghe", "🎧 Listening") },
        { to: "/japanese?tab=dictation", label: t("⌨️ Chính tả kana", "⌨️ Kana Dictation") },
        { to: "/japanese?tab=speaking", label: t("🎤 Speaking Coach", "🎤 Speaking Coach") },
      ] },
      { to: "#ja-tests-group", label: t("📝 Kiểm tra & Văn hoá", "📝 Tests & Culture"), groupLabel: "ja-tests", children: [
        { to: "/japanese?tab=quiz", label: t("🧠 Ôn tập & Kiểm tra", "🧠 Review & Quiz") },
        { to: "/japanese?tab=jlpt", label: t("📝 Đề JLPT", "📝 JLPT Tests") },
        { to: "/japanese?tab=culture", label: t("🎎 Văn hoá & Du học", "🎎 Culture & Study Abroad") },
      ] },

    ], key: "jp" },
    { to: "/finnish", label: t("Tiếng Phần Lan", "Finnish"), icon: Globe, subs: finnishSubs, key: "fi" },
    { to: "/swedish", label: t("Tiếng Thụy Điển", "Swedish"), icon: Globe, subs: swedishSubs, key: "sv" },
    { to: "/programming", label: t("Lập Trình", "Programming"), icon: Code2, subs: programmingSubs, key: "prog" },
    { to: "/lifestyle-academy", label: t("Lifestyle", "Lifestyle"), icon: Heart, subs: [
      { to: "/lifestyle-academy", label: t("🌿 Tổng quan Lifestyle Academy", "🌿 Lifestyle Academy Overview") },
      
      { to: "/lifestyle-academy?pillar=finance", label: t("💰 Tài chính Thông minh", "💰 Smart Finance") },
      { to: "/lifestyle-academy?pillar=etiquette", label: t("💬 Nghệ thuật Ứng xử", "💬 Eloquence & Etiquette") },
      { to: "/lifestyle-academy?pillar=presence", label: t("🌟 Khí chất & Bản lĩnh", "🌟 Presence & Resilience") },
      { to: "/lifestyle-academy?pillar=wellness", label: t("💪 Thân thể Khoẻ mạnh", "💪 Physical Wellness") },
      { to: "/lifestyle-academy#micro-coach", label: t("🧘 Micro-Coach hôm nay", "🧘 Micro-Coach for Today") },
    ], key: "lifestyle" },

    // Study Abroad and standalone EdTech entries are hidden — EdTech is now nested inside Programming.
    { to: "/your-corner", label: t("Your Corner", "Your Corner"), icon: Users, key: "yc" },
  ];

  // Dashboard and Admin entries are intentionally omitted from the main menu —
  // they are accessible from the user dropdown after login to keep the navbar clean.
  const navLinks = user && isPureAssistant
    ? [...baseLinks, { to: "/assistant", label: t("CTV", "Assistant"), icon: Shield, key: "assistant" }]
    : baseLinks;


  // Hover bridge + intent debounce: opening is instant, closing is delayed
  // (~350ms) so the cursor can travel through the small gap between the
  // trigger and the dropdown without prematurely dismissing the menu.
  const HOVER_CLOSE_DELAY = 550;

  const clearMenuCloseTimers = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
  };

  const updateFlyoutPosition = (anchor: HTMLElement) => {
    const rect = anchor.getBoundingClientRect();
    const viewportPadding = 12;
    const flyoutWidth = 240;
    // Lift the flyout above the hovered row so long menus do not sit too low
    // on the screen; still clamped inside the viewport below.
    const lift = 52;
    const anchorTop = Math.max(viewportPadding, rect.top - lift);
    const availableBelow = window.innerHeight - anchorTop - viewportPadding;
    const availableAbove = rect.bottom - viewportPadding;
    const openUpward = availableBelow < 320 && availableAbove > availableBelow;
    const openLeft = rect.right + flyoutWidth + viewportPadding > window.innerWidth;
    const availableHeight = openUpward ? availableAbove : availableBelow;

    setFlyoutPos({
      up: openUpward,
      left: openLeft,
      maxH: Math.max(180, Math.floor(availableHeight)),
      top: openUpward ? undefined : Math.round(anchorTop),
      bottom: openUpward ? Math.max(viewportPadding, Math.round(window.innerHeight - rect.bottom)) : undefined,
      leftPx: openLeft ? undefined : Math.min(Math.round(rect.right - 10), window.innerWidth - flyoutWidth - viewportPadding),
      rightPx: openLeft ? Math.max(viewportPadding, Math.round(window.innerWidth - rect.left - 10)) : undefined,
    });
  };

  useEffect(() => {
    if (!activeSubmenu) return;

    const reposition = () => {
      const anchor = activeSubmenuAnchorRef.current;
      if (!anchor || !document.body.contains(anchor)) {
        setActiveSubmenu(null);
        return;
      }
      updateFlyoutPosition(anchor);
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [activeSubmenu]);

  const handleMouseEnter = (key: string) => {
    clearMenuCloseTimers();
    // If the user moves to a different parent item, switch instantly and
    // also clear any pending submenu-close timer to avoid stale state.
    if (dropdown !== key) setActiveSubmenu(null);
    setDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdown(null);
      setActiveSubmenu(null);
      activeSubmenuAnchorRef.current = null;
    }, HOVER_CLOSE_DELAY);
  };

  const toggleMobileExpand = (key: string) => {
    setMobileExpanded(prev => prev === key ? null : key);
  };

  return (
    <header className="site-header flex flex-col">
      {/* Row 1: Branding - fixed on all devices.
          `translateZ(0)` + `will-change: transform` promotes this fixed bar to
          its own GPU compositor layer so scrolling heavy content (Mermaid SVGs,
          long lessons) doesn't repaint the navbar on every frame - fixes the
          flicker reported at the bottom of long pages. */}
      <div
        className="w-full z-[60] bg-card border-b border-border fixed top-0"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Mobile/tablet: flex-col layout; Desktop: single row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:h-12">
            {/* Row 1a: Logo + hamburger (mobile/tablet) or Logo + slogan + auth (desktop) */}
            <div className="flex items-center justify-between h-12 lg:flex-1 min-w-0">
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
                {/* Brand name - Space Grotesk + emerald with shimmer sweep & sparkle */}
                <span className="relative inline-flex items-center">
                  <span
                    className="brand-shimmer whitespace-nowrap"
                    style={{
                      fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                      lineHeight: 1,
                      letterSpacing: "0.005em",
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale",
                    }}
                  >
                    HaiEduTech
                  </span>
                  <Sparkles
                    className="brand-sparkle absolute -top-1 -right-3 w-3 h-3 text-amber-400"
                    style={{ filter: "drop-shadow(0 0 4px rgba(251,191,36,0.7))" }}
                  />
                </span>
              </Link>

              {/* Slogan centered between logo and auth - with periodic ripple */}
              <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-3 relative group/slogan">
                <div className="flex flex-col items-center relative overflow-hidden">
                  <span
                    className="slogan-text relative text-[11px] lg:text-xs uppercase font-semibold tracking-[0.18em] truncate"
                    style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 }}
                  >
                    <span style={{ color: "#1A1A1A" }}>THE UNIQUE INTERSECTION OF </span>
                    <span style={{ color: "#10B981" }}>LANGUAGE</span>
                    <span style={{ color: "#1A1A1A" }}> & </span>
                    <span style={{ color: "#10B981" }}>TECHNOLOGY</span>
                    {/* Ripple overlay - CSS-only, hardware-accelerated */}
                    <span className="slogan-ripple" aria-hidden="true" />
                  </span>
                  {/* Elegant underline */}
                  <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" />
                </div>
                {/* Mascot speech bubble on hover */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/slogan:opacity-100 transition-opacity duration-300 pointer-events-none z-[100]">
                  <div className="bg-card border border-border rounded-lg px-3 py-1 shadow-lg text-[10px] font-medium text-foreground whitespace-nowrap">
                    🎓 The core foundation of your learning!
                  </div>
                </div>
              </div>

              {/* Auth + Lang on branding row (desktop only) */}
              <div className="hidden lg:flex items-center gap-1.5 shrink-0">
                {user ? (
                  <>
                  {!isAdminRoute && <NotificationBell />}
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <User className="w-3.5 h-3.5" />
                      Hello, {displayName.split(" ")[0]}
                      {streak > 0 && (
                        <span title={t(`Chuỗi ${streak} ngày liên tục`, `${streak}-day streak`)}
                          className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-[10px] font-bold">
                          <Flame className="w-3 h-3" />{streak}
                        </span>
                      )}
                      <ChevronDown className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute right-0 top-full mt-1 w-52 bg-card border border-border rounded-xl shadow-lg z-[100] py-1 overflow-hidden"
                        >
                          <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                          </Link>
                          <Link to="/my-path" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                            <Map className="w-3.5 h-3.5" /> {t("Lộ trình của tôi", "My Learning Path")}
                          </Link>

                          {isTeacher && (
                            <Link to="/admin-dashboard" onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary hover:bg-secondary transition-colors">
                              <Shield className="w-3.5 h-3.5" /> {t("Quản trị", "Admin")}
                            </Link>
                          )}

                          <button onClick={() => { setUpgradeOpen(true); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors">
                            <Crown className="w-3.5 h-3.5" /> {t("Nâng Cấp Tài Khoản", "Upgrade Account")}
                          </button>
                          <div className="border-t border-border my-1" />
                          <button onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                            <LogOut className="w-3.5 h-3.5" /> {t("Đăng Xuất", "Logout")}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                <GlobalSearch variant="icon" />
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                  aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  {lang === "vi" ? "EN" : "VI"}
                </button>
              </div>

              {/* Mobile: lang + hamburger - same row as logo */}
              <div className="flex items-center gap-1 lg:hidden">
                <GlobalSearch variant="icon" />
                {user && !isAdminRoute && <NotificationBell />}
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label={lang === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  <Globe className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="text-foreground p-2 rounded-md hover:bg-secondary transition-colors">
                  {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Row 1b: Slogan on mobile - separate row, smaller text, centered */}
            <div className="lg:hidden text-center pb-1.5 -mt-1">
              <span
                className="text-[8px] sm:text-[10px] uppercase font-semibold tracking-[0.15em]"
                style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 }}
              >
                <span style={{ color: "#1A1A1A" }}>THE UNIQUE INTERSECTION OF </span>
                <span style={{ color: "#10B981" }}>LANGUAGE</span>
                <span style={{ color: "#1A1A1A" }}> & </span>
                <span style={{ color: "#10B981" }}>TECHNOLOGY</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Navigation - always sticky below Row 1 (desktop only).
          GPU layer promotion mirrors Row 1 to prevent scroll-time repaint flicker. */}
      <nav
        className="w-full fixed top-12 z-50 bg-card border-b border-border hidden lg:block"
        style={{ transform: "translateZ(0)", willChange: "transform" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-11 gap-0.5">

            {navLinks.map((l) => {
              const active = location.pathname === l.to;
              const sc = SUBJECT_COLORS[(l as { key?: string }).key ?? ""] ?? DEFAULT_SUBJECT_COLOR;
              if (l.subs) {
                return (
                  <div key={l.to} className="relative" onMouseEnter={() => handleMouseEnter(l.key!)} onMouseLeave={handleMouseLeave}>
                    <Link to={l.to}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        active ? "text-primary bg-primary/10" : `text-muted-foreground ${sc.trigger}`
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
                          // Invisible "hover bridge" via pt-2 + ::before pseudo-element keeps the
                          // pointer inside a hoverable region while traveling from the trigger.
                          // Re-entering the panel cancels the close timer (intent-based hover).
                          onMouseEnter={() => {
                            clearMenuCloseTimers();
                          }}
                          onMouseLeave={handleMouseLeave}
                          className="absolute top-full left-0 pt-1 w-64 z-50 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-5"
                        >
                          {/* Panel scrolls inside itself instead of being clipped below the viewport.
                              Scrolling closes any open flyout since it is position:fixed and would
                              otherwise detach from its parent row. */}
                          <div
                            className="bg-card rounded-lg shadow-xl border border-border py-2 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain nav-scroll"
                          >
                          {l.subs.map((sub, i) => {
                            // Nested group with children (IELTS Program)
                            if (sub.children) {
                              return (
                                <div
                                  key={sub.groupLabel}
                                  className="relative"
                                  onMouseEnter={(e) => {
                                    clearMenuCloseTimers();
                                    activeSubmenuAnchorRef.current = e.currentTarget;
                                    updateFlyoutPosition(e.currentTarget);
                                    setActiveSubmenu(sub.groupLabel!);
                                  }}
                                  onMouseLeave={() => {
                                    submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), HOVER_CLOSE_DELAY);
                                  }}
                                >
                                  <motion.div
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.025, duration: 0.18 }}
                                  >
                                    <div className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium cursor-pointer rounded-md mx-1 border-l-2 border-transparent transition-colors ${sc.accent} ${
                                      activeSubmenu === sub.groupLabel ? sc.rowActive : `text-muted-foreground ${sc.rowHover}`
                                    }`}>
                                      <span className="flex items-center gap-2.5">
                                        {sub.icon && <sub.icon className={`w-4 h-4 ${sc.icon}`} />}
                                        <span>{sub.label}</span>
                                      </span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </div>
                                  </motion.div>

                                  {/* Nested flyout sub-menu */}
                                  {createPortal(
                                    <AnimatePresence>
                                    {activeSubmenu === sub.groupLabel && (
                                      <motion.div
                                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -6, scale: 0.97 }}
                                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                        // Horizontal hover bridge so the cursor can
                                        // travel from the parent row into the flyout without escaping.
                                        onMouseEnter={() => {
                                          clearMenuCloseTimers();
                                        }}
                                        onMouseLeave={() => {
                                          submenuTimeoutRef.current = setTimeout(() => setActiveSubmenu(null), HOVER_CLOSE_DELAY);
                                          handleMouseLeave();
                                        }}
                                        // position:fixed escapes the scrollable panel's clipping box;
                                        // pl-2/pr-2 keeps an 8px hover bridge to the parent row.
                                        className={`fixed w-60 z-[80] ${flyoutPos.left ? "pr-4" : "pl-4"}`}
                                        style={{
                                          top: flyoutPos.top,
                                          bottom: flyoutPos.bottom,
                                          left: flyoutPos.leftPx,
                                          right: flyoutPos.rightPx,
                                        }}
                                      >
                                        <div
                                          className="bg-card rounded-lg shadow-xl border border-border py-2 overflow-y-auto overscroll-contain nav-scroll"
                                          style={{ maxHeight: flyoutPos.maxH }}
                                        >
                                        {/* Group header (hidden if children already have section headers) */}
                                        {!sub.children.some(c => c.header) && (
                                          <div className="px-4 py-1.5 mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${sc.header}`}>
                                            {sub.groupLabel === "ielts" ? "Cambridge IELTS"
                                                : sub.groupLabel === "national-exam" ? t("Luyện thi THPT", "National Exam Prep")
                                                : sub.groupLabel === "en-foundation" ? t("Cambridge Starters -> PET", "Cambridge Starters -> PET")
                                                : sub.groupLabel === "en-exams" ? t("Luyện thi Quốc tế", "International Exams")
                                                : sub.groupLabel === "en-other-exams" ? t("Các kỳ thi tiếng Anh khác", "Other English Exams")
                                                : sub.groupLabel === "en-fun" ? t("Bài học tiếng Anh vui", "Fun English Lessons")
                                                : sub.groupLabel === "en-speaking" ? t("Luyện nói", "Speaking Coach")
                                                : sub.groupLabel === "en-tools" ? t("Công cụ AI & Học vui", "AI Tools & Fun Learning")
                                                : sub.groupLabel === "prog-foundation" ? t("Lộ trình Cơ bản", "Foundation Track")
                                                : sub.groupLabel === "prog-ai-data" ? "AI & Data Engineering"
                                                : sub.groupLabel === "prog-software-web" ? t("Phần mềm, Web & Bảo mật", "Software, Web & Security")
                                                : sub.groupLabel === "prog-career" ? t("Sự nghiệp & Dự án", "Career & Projects")
                                                : sub.groupLabel === "cn-hsk" ? t("Lộ trình HSK", "HSK Program")
                                                : sub.groupLabel === "cn-conv" ? t("Giao tiếp & Tương tác", "Conversational")
                                                : sub.groupLabel === "cn-foundation-skills" ? t("Kỹ năng nền tảng", "Foundation Skills")
                                                : sub.groupLabel === "cn-practice" ? t("Luyện tập & Giải trí", "Practice & Fun")
                                                : sub.groupLabel === "fi-path" ? t("Lộ trình A1-B1", "Study Path A1-B1")
                                                : sub.groupLabel === "fi-practice" ? t("Luyện tập & Giải trí", "Practice & Fun")
                                                : sub.groupLabel === "sv-path" ? t("Lộ trình A1-B1", "Study Path A1-B1")
                                                : sub.groupLabel === "sv-learning" ? t("Học tập & Kỹ năng", "Learning & Skills")
                                                : sub.groupLabel === "ja-learning" ? t("Chương trình học", "Learning Program")
                                                : sub.groupLabel === "ja-vocab" ? t("Từ vựng & Kanji", "Vocabulary & Kanji")
                                                : sub.groupLabel === "ja-grammar" ? t("Ngữ pháp nâng cao", "Advanced Grammar")
                                                : sub.groupLabel === "ja-skills" ? t("Luyện 4 kỹ năng", "Four Skills Practice")
                                                : sub.groupLabel === "ja-tests" ? t("Kiểm tra & Văn hoá", "Tests & Culture")
                                                : sub.groupLabel === "vn-curriculum" ? t("Chương trình học", "Curriculum")
                                                : sub.groupLabel === "vn-practice" ? t("Luyện tập & Tương tác", "Practice & Interactive")
                                                : sub.groupLabel === "ielts-skills" ? t("IELTS Skills Practice", "IELTS Skills Practice")
                                                : sub.label}
                                            </span>
                                          </div>
                                        )}
                                        {sub.children.map((child, ci) => {
                                          if (child.divider) {
                                            return <div key={child.to} className="my-1.5 mx-3 h-px bg-border" />;
                                          }
                                          if (child.header) {
                                            return (
                                              <div key={child.to} className="px-4 pt-2 pb-1 mt-1 first:mt-0">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${sc.header}`}>
                                                  {child.label}
                                                </span>
                                              </div>
                                            );
                                          }
                                          const ChildIcon = child.icon;
                                          return (
                                            <motion.div
                                              key={child.to}
                                              initial={{ opacity: 0, x: -6 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: ci * 0.04, duration: 0.16 }}
                                            >
                                              <Link
                                                to={child.to}
                                                onClick={() => { setDropdown(null); setActiveSubmenu(null); }}
                                                className={`flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground ${sc.childHover} transition-colors rounded-md mx-1 border-l-2 border-transparent ${sc.accent}`}
                                              >
                                                {ChildIcon && <ChildIcon className={`w-4 h-4 ${sc.icon}`} />}
                                                <span>{child.label}</span>
                                              </Link>
                                            </motion.div>
                                          );
                                        })}
                                        </div>
                                      </motion.div>
                                    )}
                                    </AnimatePresence>,
                                    document.body
                                  )}
                                </div>
                              );
                            }

                            // Divider
                            if (sub.divider) {
                              return <div key={sub.to + i} className="my-1.5 mx-3 h-px bg-border" />;
                            }

                            // Regular sub-item
                            const SubIcon = sub.icon;
                            return (
                              <motion.div key={sub.to + sub.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.025, duration: 0.18 }}>
                                <Link to={sub.to} onClick={() => setDropdown(null)}
                                  className={`flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground ${sc.childHover} transition-colors rounded-md mx-1 border-l-2 border-transparent ${sc.accent}`}>
                                  {SubIcon && <SubIcon className={`w-4 h-4 ${sc.icon}`} />}
                                  <span>{sub.label}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={l.to} to={l.to}
                  className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    active ? "text-primary bg-primary/10" : `text-muted-foreground ${sc.trigger}`
                  }`}>
                  {l.label}
                </Link>
              );
            })}



          </div>
        </div>
      </nav>

      {/* Mobile menu - fullscreen overlay below branding */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay backdrop for closing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-[60] bg-foreground/30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed inset-y-0 right-0 z-[70] w-[88%] max-w-sm bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Close button header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
                <span className="font-display text-lg font-bold text-[#1A1A1A] tracking-wide">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-[#1A1A1A]" />
                </button>
              </div>

              {/* Navigation items */}
              <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navLinks.map((l) => {
                  const Icon = l.icon ?? Globe;
                  const active = location.pathname === l.to;
                  const isExpanded = mobileExpanded === l.key;
                  return (
                    <div key={l.to}>
                      {/* Parent menu item */}
                      <div className="flex items-center">
                        <Link to={l.to} onClick={() => setOpen(false)}
                          className={`flex-1 flex items-center gap-3.5 px-4 py-4 rounded-xl text-base font-bold transition-all ${
                            active
                              ? "text-primary bg-primary/10"
                              : "text-[#1A1A1A] hover:bg-gray-100"
                          }`}>
                          <Icon className={`w-5 h-5 shrink-0 ${active ? "text-primary" : "text-[#4B5563]"}`} />
                          <span>{l.label}</span>
                        </Link>
                        {l.subs && (
                          <button onClick={() => toggleMobileExpand(l.key!)}
                            className="p-4 text-[#4B5563] hover:text-[#1A1A1A] transition-colors rounded-xl hover:bg-gray-100">
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ease-out ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>

                      {/* Separator between major sections */}
                      {!l.subs && <div className="mx-3 border-b border-gray-200 my-1" />}

                      {/* Sub-items */}
                      {l.subs && (
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="ml-5 pl-4 border-l-[3px] border-primary/30 space-y-0.5 py-2">
                                {l.subs.map((sub) => {
                                  // Nested group (IELTS / THPT) in mobile
                                  if (sub.children) {
                                    const isSubOpen = mobileSubExpanded === sub.groupLabel;
                                    return (
                                      <div key={sub.groupLabel}>
                                        <button
                                          onClick={() => setMobileSubExpanded(prev => prev === sub.groupLabel ? null : sub.groupLabel!)}
                                          className={`w-full flex items-center justify-between px-4 py-3.5 text-base font-bold rounded-xl transition-all ${
                                            isSubOpen
                                              ? "text-primary bg-primary/10"
                                              : "text-[#1A1A1A] hover:text-primary hover:bg-gray-50"
                                          }`}
                                        >
                                          <span>{sub.label}</span>
                                          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ease-out ${isSubOpen ? "rotate-90" : ""}`} />
                                        </button>
                                        <AnimatePresence>
                                          {isSubOpen && (
                                            <motion.div
                                              initial={{ opacity: 0, height: 0 }}
                                              animate={{ opacity: 1, height: "auto" }}
                                              exit={{ opacity: 0, height: 0 }}
                                              transition={{ duration: 0.2 }}
                                              className="overflow-hidden"
                                            >
                                              <div className="ml-3 pl-3 border-l-[3px] border-accent/40 space-y-0.5 py-2">
                                                {sub.children.map((child) => {
                                                  if (child.divider) {
                                                    return <div key={child.to} className="my-1.5 mx-3 h-px bg-border" />;
                                                  }
                                                  if (child.header) {
                                                    return (
                                                      <div key={child.to} className="px-4 pt-2 pb-1">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary/70">
                                                          {child.label}
                                                        </span>
                                                      </div>
                                                    );
                                                  }
                                                  const ChildIcon = child.icon;
                                                  const childActive = location.pathname === child.to;
                                                  return (
                                                    <Link
                                                      key={child.to}
                                                      to={child.to}
                                                      onClick={() => setOpen(false)}
                                                      className={`flex items-center gap-3 px-4 py-3.5 text-[15px] rounded-xl transition-all ${
                                                        childActive
                                                          ? "text-primary bg-primary/10 font-bold"
                                                          : "text-muted-foreground font-medium hover:text-primary hover:bg-secondary/50"
                                                      }`}
                                                    >
                                                      {ChildIcon && <ChildIcon className={`w-5 h-5 ${childActive ? "text-primary" : "text-primary/60"}`} />}
                                                      <span>{child.label}</span>
                                                    </Link>
                                                  );
                                                })}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    );
                                  }
                                  // Regular sub-item
                                  const subActive = location.pathname === sub.to;
                                  return (
                                    <Link key={sub.to + sub.label} to={sub.to} onClick={() => setOpen(false)}
                                      className={`block px-4 py-3.5 text-[15px] rounded-xl transition-all ${
                                        subActive
                                          ? "text-primary bg-primary/10 font-bold"
                                          : "text-[#4B5563] font-medium hover:text-primary hover:bg-gray-50"
                                      }`}>
                                      {sub.label}
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Separator after expanded section */}
                              <div className="mx-3 border-b border-gray-200 my-1" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sticky auth buttons at bottom */}
              <div className="sticky bottom-0 px-4 py-5 border-t border-border bg-background space-y-3">
                {user ? (
                  <>
                    <div className="text-center text-sm font-medium text-foreground mb-2 flex items-center justify-center gap-2">
                      <User className="w-4 h-4 inline" />
                      Hello, {displayName}
                      {streak > 0 && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-xs font-bold">
                          <Flame className="w-3.5 h-3.5" />{streak}
                        </span>
                      )}
                    </div>
                    <Link to={isTeacher ? "/admin-dashboard" : "/dashboard"} onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all">
                      {isTeacher ? <><Shield className="w-5 h-5" /> {t("Quản trị", "Admin")}</> : <><LayoutDashboard className="w-5 h-5" /> Dashboard</>}
                    </Link>
                    <Link to="/my-path" onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl text-sm font-bold text-primary border border-primary/40 bg-primary/10 hover:bg-primary/20 transition-all">
                      <Map className="w-5 h-5" /> {t("Lộ trình của tôi", "My Learning Path")}
                    </Link>

                    <button onClick={() => { setUpgradeOpen(true); setOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-amber-600 dark:text-amber-400 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all">
                      <Crown className="w-5 h-5" /> {t("Nâng Cấp Tài Khoản", "Upgrade Account")}
                    </button>
                    <button onClick={() => { handleLogout(); setOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all">
                      <LogOut className="w-5 h-5" /> {t("Đăng Xuất", "Logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg transition-all">
                      <LogIn className="w-5 h-5" /> {t("Đăng Nhập", "Login")}
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-[15px] font-bold border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                      <UserPlus className="w-5 h-5" /> {t("Đăng Ký", "Sign Up")}
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer: mobile = branding only (48px), desktop = branding + nav (92px) */}
      {/* Spacer: mobile = branding+slogan (~60px), desktop = branding+nav (92px) */}
      <div className="h-[60px] lg:h-[92px]" aria-hidden="true" />

      {/* Premium upgrade modal */}
      <UpgradeAccountModal
        open={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        user={user ? { id: user.id, email: user.email } : null}
      />
    </header>
  );
};

export default Navbar;
