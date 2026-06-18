/**
 * @file EdTechWebService.tsx
 * @description Premium landing page for selling custom AI-powered EdTech
 * website development services to teachers. Includes a hero, feature grid,
 * two-tier pricing, and a validation-guarded consultation request form
 * that writes to the `service_requests` table in Supabase.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Fragment, useState, useEffect } from "react";
import onlineClassroomDemo from "@/assets/online-classroom-demo.jpg";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CofoundersTeam } from "@/components/edtech/CofoundersTeam";
import { AgencyLeadModal } from "@/components/edtech/AgencyLeadModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Bot,
  BarChart3,
  Mail,
  ShieldCheck,
  Check,
  Crown,
  Rocket,
  GraduationCap,
  Database,
  Zap,
  Send,
  Loader2,
  Monitor,
  ClipboardList,
  LayoutDashboard,
  Play,
  MessageCircle,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  X as XIcon,
  Search,
  Lock,
  Cloud,
  Cpu,
  Users,
  School,
  Building2,
  Globe,
  Lightbulb,
  TrendingUp,
  Smartphone,
  Code2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Award,
  Brain,
  BookOpen,
  Target,
  Trophy,
  Coins,
  Bomb,
  AlertTriangle,
  Bell,
  Activity,
  Gauge,
  Gamepad2,
  Medal,
  Star,
  UsersRound,
  Briefcase,
  Wallet,
  UserCog,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Strict client-side validation schema. Server-side RLS still applies.
const requestSchema = z.object({
  teacher_name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
  email: z.string().trim().email("Email không hợp lệ").max(255),
  phone: z
    .string()
    .trim()
    .min(8, "Số điện thoại quá ngắn")
    .max(20, "Số điện thoại quá dài")
    .regex(/^[0-9+\-\s().]+$/, "Số điện thoại không hợp lệ"),
  subject_taught: z.string().trim().max(120).optional().or(z.literal("")),
  selected_package: z.enum(["standard", "advanced", "enterprise"]),
  special_requirements: z
    .string()
    .trim()
    .max(1500)
    .optional()
    .or(z.literal("")),
});

type FormState = {
  teacher_name: string;
  email: string;
  phone: string;
  subject_taught: string;
  selected_package: "standard" | "advanced" | "enterprise";
  special_requirements: string;
};

const INITIAL: FormState = {
  teacher_name: "",
  email: "",
  phone: "",
  subject_taught: "",
  selected_package: "advanced",
  special_requirements: "",
};

const FEATURES = [
  {
    icon: GraduationCap,
    title: {
      vi: "Hệ thống Quản lý Học liệu (LMS)",
      en: "Learning Management System (LMS)",
    },
    desc: {
      vi: "Lưu trữ bài giảng & video khoá học bảo mật, giao bài - chấm điểm tự động, theo dõi tiến độ chi tiết theo từng học viên và từng kỹ năng.",
      en: "Securely store lessons & course videos, auto-grade assignments, and track each learner's progress skill by skill in real time.",
    },
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Bot,
    title: { vi: "Trợ lý AI Hỗ trợ Giảng dạy", en: "AI Teaching Assistant" },
    desc: {
      vi: "Chatbot AI (Perplexity / GPT) huấn luyện theo tài liệu riêng - giải thích từ vựng, sửa bài viết, trả lời học sinh 24/7 đúng phong cách giảng dạy của Thầy/Cô.",
      en: "An AI chatbot (Perplexity / GPT) trained on your own materials - explains vocabulary, corrects essays, and answers students 24/7 in your teaching voice.",
    },
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: BarChart3,
    title: { vi: "Báo cáo Dữ liệu Thông minh", en: "Smart Learning Analytics" },
    desc: {
      vi: "Biểu đồ tiến độ, phân tích hành vi học tập, dự đoán điểm thi và cảnh báo sớm học sinh học yếu để giáo viên can thiệp kịp thời.",
      en: "Progress dashboards, learning-behavior analytics, score prediction, and early warnings for struggling students so teachers can intervene in time.",
    },
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Brain,
    title: {
      vi: "Cá nhân hoá lộ trình bằng Reinforcement Learning",
      en: "RL-Powered Adaptive Learning Path",
    },
    desc: {
      vi: "Thuật toán RL tự điều chỉnh độ khó, thứ tự bài học và lượng bài tập theo từng học viên - giúp mỗi em học đúng vùng phát triển gần (ZPD).",
      en: "An RL engine auto-tunes difficulty, lesson order, and homework load per student - keeping every learner inside their Zone of Proximal Development.",
    },
    iconBg: "bg-fuchsia-500/10 text-fuchsia-600",
  },
  {
    icon: ClipboardList,
    title: {
      vi: "AI Smart Grading - Writing & Speaking",
      en: "AI Smart Grading - Writing & Speaking",
    },
    desc: {
      vi: "Chấm Writing theo rubric IELTS/TOEIC, chấm Speaking theo phát âm - ngữ điệu, kèm phản hồi chi tiết và đề xuất bài luyện riêng.",
      en: "Grades Writing on IELTS/TOEIC rubrics and Speaking on pronunciation & intonation, with detailed feedback and tailored practice suggestions.",
    },
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Mail,
    title: {
      vi: "Hạ tầng Email Tự động",
      en: "Automated Email Infrastructure",
    },
    desc: {
      vi: "Gửi OTP, hoá đơn, thông báo và nhắc lịch học chuyên nghiệp qua subdomain riêng - tăng độ tin cậy thương hiệu, giảm vào hộp spam.",
      en: "Send OTP, invoices, notifications and class reminders from your own subdomain - boosting brand trust and inbox deliverability.",
    },
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Monitor,
    title: {
      vi: "Giao diện Mobile-first & Tốc độ cao",
      en: "Mobile-first, Lightning-Fast UI",
    },
    desc: {
      vi: "Tối ưu cho điện thoại - nơi 80% học viên truy cập. Đạt PageSpeed 90+, hỗ trợ chế độ tối, tăng SEO và giảm tỉ lệ thoát trang.",
      en: "Optimized for phones - where 80% of learners are. Hits PageSpeed 90+, supports dark mode, improves SEO and lowers bounce rate.",
    },
    iconBg: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: MessageCircle,
    title: {
      vi: "Tích hợp Zalo OA & Cộng đồng học viên",
      en: "Zalo OA & Student Community",
    },
    desc: {
      vi: "Đẩy điểm danh, bài tập, kết quả thi về Zalo phụ huynh. Diễn đàn nội bộ hỏi-đáp giúp giữ chân học viên hiệu quả hơn.",
      en: "Push attendance, homework and exam results straight to parents on Zalo. An in-app forum keeps students engaged and retained.",
    },
    iconBg: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Search,
    title: {
      vi: "Tối ưu SEO & Hiện diện trên Google",
      en: "SEO & Google Visibility",
    },
    desc: {
      vi: "Schema.org Education, sitemap tự động, meta-tag chuẩn AI-search. Giúp khoá học của Thầy/Cô lên top Google khi phụ huynh tìm kiếm.",
      en: "Schema.org Education, auto sitemaps, AI-search-friendly meta tags - so your courses rank on Google when parents search locally.",
    },
    iconBg: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: {
      vi: "Bảo mật cấp cao & Tuân thủ GDPR",
      en: "Enterprise-grade Security & GDPR Compliance",
    },
    desc: {
      vi: "Mã hoá SSL/TLS 1.3, Row-Level Security, sao lưu tự động hằng ngày, chống tải xuống - watermark tài liệu. Tuân thủ Luật An ninh mạng Việt Nam.",
      en: "SSL/TLS 1.3 encryption, Row-Level Security, daily auto-backups, anti-download watermarks. Compliant with Vietnam's cybersecurity law.",
    },
    iconBg: "bg-slate-500/10 text-slate-600",
  },
  {
    icon: Play,
    title: {
      vi: "Lớp học Live & Phòng học ảo",
      en: "Live Classes & Virtual Classroom",
    },
    desc: {
      vi: "Tích hợp livestream HD, bảng trắng, điểm danh tự động, ghi hình lưu lại và phụ đề AI - dạy online như đang đứng lớp thật.",
      en: "HD livestream, whiteboard, auto attendance, session recording and AI subtitles - teach online just like in a real classroom.",
    },
    iconBg: "bg-teal-500/10 text-teal-600",
  },
  {
    icon: Wallet,
    title: {
      vi: "Thanh toán & Học phí tự động",
      en: "Automated Payments & Tuition",
    },
    desc: {
      vi: "Tích hợp VNPay / Momo / chuyển khoản, đối soát doanh thu, nhắc học phí qua email + Zalo, xuất hoá đơn điện tử theo lớp.",
      en: "VNPay / Momo / bank transfer integration, revenue reconciliation, tuition reminders via email + Zalo, and e-invoices per class.",
    },
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Award,
    title: {
      vi: "Chứng chỉ Hoàn thành tự động",
      en: "Auto-issued Certificates",
    },
    desc: {
      vi: "Sinh chứng chỉ PDF có chữ ký số, QR xác thực và mã chống làm giả ngay khi học viên hoàn thành khoá học.",
      en: "Auto-generate PDF certificates with digital signature, verification QR and anti-forgery codes the moment a learner finishes a course.",
    },
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Gamepad2,
    title: {
      vi: "Gamification giữ chân học viên",
      en: "Gamification That Retains Learners",
    },
    desc: {
      vi: "XP, streak, huy hiệu, bảng xếp hạng tuần và mini-game ôn từ vựng - tăng tỉ lệ hoàn thành bài tập trung bình +38%.",
      en: "XP, streaks, badges, weekly leaderboards and vocab mini-games - lifting average homework completion by +38%.",
    },
    iconBg: "bg-pink-500/10 text-pink-600",
  },
];

const PACKAGES = [
  {
    id: "standard" as const,
    name: { vi: "Gói Standard", en: "Standard Package" },
    tagline: { vi: "Khởi đầu chuyên nghiệp", en: "Professional kick-off" },
    priceFrom: { vi: "Liên hệ nhận báo giá", en: "Contact for a quote" },
    priceNote: {
      vi: "Trọn gói · Bàn giao trong 5-10 ngày",
      en: "All-inclusive · Delivered in 5-10 days",
    },
    monthly: {
      vi: "Tư vấn miễn phí · Báo giá chi tiết theo nhu cầu",
      en: "Free consultation · Custom quote on request",
    },
    highlight: false,
    icon: Rocket,
    bestFor: {
      vi: "Phù hợp cho lớp học cá nhân / nhóm dưới 50 học viên.",
      en: "Best for individual teachers or small groups under 50 learners.",
    },
    features: [
      {
        vi: "Website LMS responsive (mobile-first)",
        en: "Responsive LMS website (mobile-first)",
      },
      {
        vi: "Hệ thống quiz tự chấm điểm + lưu lịch sử",
        en: "Auto-graded quiz system with history",
      },
      {
        vi: "Quản lý học viên & phân lớp cơ bản",
        en: "Basic student & class management",
      },
      {
        vi: "Cài đặt tên miền (.com / .edu.vn / .vn)",
        en: "Custom domain setup (.com / .edu.vn / .vn)",
      },
      {
        vi: "Trang giới thiệu khóa học + form đăng ký",
        en: "Course landing page + signup form",
      },
      {
        vi: "Hỗ trợ kỹ thuật giờ hành chính (T2-T6)",
        en: "Tech support business hours (Mon-Fri)",
      },
      {
        vi: "Bàn giao mã nguồn & video hướng dẫn quản trị",
        en: "Full source code + admin training videos",
      },
    ],
  },
  {
    id: "advanced" as const,
    name: { vi: "Gói Advanced AI & Data", en: "Advanced AI & Data Package" },
    tagline: {
      vi: "Khuyên dùng cho lớp học hiện đại",
      en: "Recommended for modern classrooms",
    },
    priceFrom: { vi: "Liên hệ nhận báo giá", en: "Contact for a quote" },
    priceNote: {
      vi: "Trọn gói · Bàn giao trong 10-14 ngày",
      en: "All-inclusive · Delivered in 10-14 days",
    },
    monthly: {
      vi: "Tư vấn miễn phí · Báo giá chi tiết theo nhu cầu",
      en: "Free consultation · Custom quote on request",
    },
    highlight: true,
    icon: Crown,
    bestFor: {
      vi: "Phù hợp cho trung tâm / lớp học 50-500 học viên cần tự động hóa.",
      en: "Best for centers / classes of 50-500 learners that need automation.",
    },
    features: [
      {
        vi: "Toàn bộ tính năng của gói Standard",
        en: "Everything in Standard",
      },
      {
        vi: "AI Chatbot 24/7 huấn luyện theo tài liệu riêng",
        en: "24/7 AI Chatbot trained on your own materials",
      },
      {
        vi: "Dashboard Learning Analytics nâng cao",
        en: "Advanced Learning Analytics dashboard",
      },
      {
        vi: "Email subdomain (OTP, hóa đơn, nhắc lịch tự động)",
        en: "Email subdomain (OTP, invoices, auto reminders)",
      },
      {
        vi: "AI Smart Grading cho bài viết Writing & Speaking",
        en: "AI Smart Grading for Writing & Speaking",
      },
      {
        vi: "Tích hợp thanh toán (VNPay / Momo / chuyển khoản)",
        en: "Payment integration (VNPay / Momo / bank transfer)",
      },
      {
        vi: "Bảo trì ưu tiên 24/7 + cập nhật tính năng theo quý",
        en: "Priority 24/7 maintenance + quarterly feature updates",
      },
    ],
  },
  {
    id: "enterprise" as const,
    name: { vi: "Gói Enterprise", en: "Enterprise Package" },
    tagline: {
      vi: "Dành cho trường học & học viện",
      en: "For schools & academies",
    },
    priceFrom: { vi: "Liên hệ nhận báo giá", en: "Contact for a quote" },
    priceNote: {
      vi: "Tùy biến sâu · Bàn giao 3-6 tuần",
      en: "Deeply customized · Delivered in 3-6 weeks",
    },
    monthly: {
      vi: "Tư vấn miễn phí · Báo giá chi tiết theo nhu cầu",
      en: "Free consultation · Custom quote on request",
    },
    highlight: false,
    icon: Database,
    bestFor: {
      vi: "Phù hợp cho trường học / chuỗi trung tâm 500+ học viên.",
      en: "Best for schools / center networks with 500+ learners.",
    },
    features: [
      { vi: "Toàn bộ tính năng gói Advanced", en: "Everything in Advanced" },
      {
        vi: "Phân quyền nhiều cấp (Admin / Giáo viên / Phụ huynh / HS)",
        en: "Multi-level roles (Admin / Teacher / Parent / Student)",
      },
      {
        vi: "Cổng phụ huynh: xem điểm, học phí, lịch học theo thời gian thực",
        en: "Parent portal: real-time grades, tuition, and schedule",
      },
      {
        vi: "Tích hợp Google Sheets / Zalo OA / hệ thống điểm danh",
        en: "Integrations: Google Sheets / Zalo OA / attendance systems",
      },
      {
        vi: "Data Warehouse + BI dashboard riêng",
        en: "Dedicated Data Warehouse + BI dashboard",
      },
      {
        vi: "AI dự đoán học viên nghỉ học & tự gợi ý can thiệp",
        en: "AI dropout prediction with intervention suggestions",
      },
      {
        vi: "SLA cam kết uptime 99.9% · Hỗ trợ ưu tiên 24/7",
        en: "99.9% uptime SLA · Priority 24/7 support",
      },
    ],
  },
];

// ============================================================================
// Demo Carousel - multi-slide preview of the LMS the teacher will receive
// ============================================================================
const DEMO_SLIDES = [
  {
    id: "dashboard",
    title: { vi: "Smart Dashboard", en: "Smart Dashboard" },
    badge: { vi: "AI Tutor online", en: "AI Tutor online" },
    badgeColor: "emerald" as const,
  },
  {
    id: "ai-tutor",
    title: { vi: "AI Tutor 24/7", en: "AI Tutor 24/7" },
    badge: { vi: "Realtime chat", en: "Realtime chat" },
    badgeColor: "violet" as const,
  },
  {
    id: "classes",
    title: { vi: "Quản lý lớp học", en: "Class Management" },
    badge: { vi: "Live sync", en: "Live sync" },
    badgeColor: "primary" as const,
  },
  {
    id: "assignments",
    title: { vi: "Bài tập & Chấm điểm AI", en: "Assignments & AI Grading" },
    badge: { vi: "Auto grading", en: "Auto grading" },
    badgeColor: "rose" as const,
  },
  {
    id: "analytics",
    title: { vi: "Phân tích chuyên sâu", en: "Deep Analytics" },
    badge: { vi: "Insights AI", en: "AI Insights" },
    badgeColor: "sky" as const,
  },
  {
    id: "lessons",
    title: { vi: "Bài giảng tương tác", en: "Interactive Lessons" },
    badge: { vi: "Interactive · Multimedia", en: "Interactive · Multimedia" },
    badgeColor: "indigo" as const,
  },
  {
    id: "rl-lab",
    title: {
      vi: "RL · Cá nhân hoá lộ trình học",
      en: "RL · Adaptive Learning Path",
    },
    badge: { vi: "Adaptive Learning", en: "Adaptive Learning" },
    badgeColor: "teal" as const,
  },
  {
    id: "early-warning",
    title: {
      vi: "Cảnh báo sớm - Can thiệp giáo dục",
      en: "Early Warning - Education Intervention",
    },
    badge: { vi: "Early Intervention", en: "Early Intervention" },
    badgeColor: "rose" as const,
  },
  {
    id: "schedule-finance",
    title: {
      vi: "Lịch học & Học phí tự động",
      en: "Schedule & Tuition Automation",
    },
    badge: { vi: "Smart Operations", en: "Smart Operations" },
    badgeColor: "primary" as const,
  },
  {
    id: "parent-report",
    title: { vi: "Báo cáo phụ huynh", en: "Parent Reports" },
    badge: { vi: "Auto · Hàng tháng", en: "Auto · Monthly" },
    badgeColor: "amber" as const,
  },
  {
    id: "rubric-grading",
    title: {
      vi: "Chấm Writing theo Rubric AI",
      en: "AI Rubric Writing Grading",
    },
    badge: { vi: "IELTS Band Descriptors", en: "IELTS Band Descriptors" },
    badgeColor: "rose" as const,
  },
  {
    id: "speaking-grading",
    title: {
      vi: "Chấm Speaking · Phát âm AI",
      en: "AI Speaking & Pronunciation Grading",
    },
    badge: { vi: "Pronunciation scoring", en: "Pronunciation scoring" },
    badgeColor: "violet" as const,
  },
  {
    id: "live-class",
    title: {
      vi: "Phòng học Live · Theo dõi tập trung",
      en: "Live Class · Focus Monitoring",
    },
    badge: { vi: "Live · Engagement AI", en: "Live · Engagement AI" },
    badgeColor: "sky" as const,
  },
  {
    id: "mastery-map",
    title: { vi: "Bản đồ năng lực · Skill Mastery", en: "Skill Mastery Map" },
    badge: { vi: "Knowledge graph", en: "Knowledge graph" },
    badgeColor: "indigo" as const,
  },
  {
    id: "assignment-builder",
    title: {
      vi: "Giao bài theo lớp · Cá nhân hoá",
      en: "Personalized Assignment Builder",
    },
    badge: { vi: "Smart Assign", en: "Smart Assign" },
    badgeColor: "teal" as const,
  },
  {
    id: "gamification",
    title: {
      vi: "Gamification · Tăng động lực học",
      en: "Gamification · Boost Motivation",
    },
    badge: { vi: "XP · Streak · Badge", en: "XP · Streak · Badge" },
    badgeColor: "amber" as const,
  },
  {
    id: "hr-management",
    title: {
      vi: "Quản lý nhân sự & Cộng tác viên",
      en: "Staff & Contributor Management",
    },
    badge: { vi: "Staff · Payroll", en: "Staff · Payroll" },
    badgeColor: "violet" as const,
  },
];

const badgeStyles = {
  emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  violet: "bg-violet-500/10 text-violet-600 border-violet-500/30",
  primary: "bg-primary/10 text-primary border-primary/30",
  amber: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  rose: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  sky: "bg-sky-500/10 text-sky-600 border-sky-500/30",
  indigo: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
  teal: "bg-teal-500/10 text-teal-600 border-teal-500/30",
};

const DemoCarousel = () => {
  const { t, lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const total = DEMO_SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 5500);
    return () => clearInterval(t);
  }, [total]);

  const slide = DEMO_SLIDES[idx];
  const go = (n: number) => setIdx((n + total) % total);
  const badgeClass = badgeStyles[slide.badgeColor];

  return (
    <div className="relative rounded-2xl border-2 border-emerald-600/80 bg-card/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/25 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 sm:px-5 py-3 border-b border-border/60 bg-muted/40">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex-1 rounded-md bg-background/70 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground truncate border border-border/40">
          🔒 lop-hoc-cua-thay.edu.vn / {slide.id}
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground ml-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
          Live
        </div>
      </div>

      {/* Header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">
            {t("Hôm nay", "Today")} ·{" "}
            {new Date().toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US")}
          </div>
          <div className="text-lg sm:text-2xl font-semibold text-foreground mt-0.5">
            {t(slide.title.vi, slide.title.en)}
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${badgeClass}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />{" "}
          {t(slide.badge.vi, slide.badge.en)}
        </div>
      </div>

      {/* Slide content */}
      <div className="px-6 sm:px-8 pb-6 min-h-[420px] sm:min-h-[480px]">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {slide.id === "dashboard" && <SlideDashboard />}
          {slide.id === "ai-tutor" && <SlideAITutor />}
          {slide.id === "classes" && <SlideClasses />}
          {slide.id === "assignments" && <SlideAssignments />}
          {slide.id === "analytics" && <SlideAnalytics />}
          {slide.id === "lessons" && <SlideLessons />}
          {slide.id === "rl-lab" && <SlideRLLab />}
          {slide.id === "early-warning" && <SlideEarlyWarning />}
          {slide.id === "schedule-finance" && <SlideScheduleFinance />}
          {slide.id === "parent-report" && <SlideParentReport />}
          {slide.id === "rubric-grading" && <SlideRubricGrading />}
          {slide.id === "speaking-grading" && <SlideSpeakingGrading />}
          {slide.id === "live-class" && <SlideLiveClass />}
          {slide.id === "mastery-map" && <SlideMasteryMap />}
          {slide.id === "assignment-builder" && <SlideAssignmentBuilder />}
          {slide.id === "gamification" && <SlideGamification />}
          {slide.id === "hr-management" && <SlideHR />}
        </motion.div>
      </div>

      {/* Carousel controls */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-border/60 bg-muted/30">
        <button
          onClick={() => go(idx - 1)}
          aria-label={t("Trước", "Previous")}
          className="h-8 w-8 rounded-full border border-border/60 bg-background/70 hover:bg-background flex items-center justify-center text-foreground transition hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {DEMO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              aria-label={t(s.title.vi, s.title.en)}
              className={`h-2 rounded-full transition-all ${
                i === idx
                  ? "w-7 bg-gradient-to-r from-primary to-emerald-500"
                  : "w-2 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(idx + 1)}
          aria-label={t("Sau", "Next")}
          className="h-8 w-8 rounded-full border border-border/60 bg-background/70 hover:bg-background flex items-center justify-center text-foreground transition hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const SlideDashboard = () => {
  const { t } = useLanguage();
  return (
    <>
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {[
          {
            label: { vi: "Học viên", en: "Students" },
            value: "248",
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: { vi: "Bài đã chấm", en: "Graded" },
            value: "1.2k",
            icon: ClipboardList,
            color: "text-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            label: { vi: "AI replies", en: "AI replies" },
            value: "532",
            icon: Bot,
            color: "text-violet-600",
            bg: "bg-violet-500/10",
          },
        ].map((s) => (
          <div
            key={s.label.en}
            className="rounded-xl border border-border/60 bg-background/70 p-3"
          >
            <div
              className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-md ${s.bg}`}
            >
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div className="text-lg sm:text-xl font-bold text-foreground leading-none">
              {s.value}
            </div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5">
              {t(s.label.vi, s.label.en)}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[11px] sm:text-xs font-medium text-foreground">
            {t("Tiến độ học tập 7 ngày", "7-day learning progress")}
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 font-semibold">
            <TrendingUp className="h-3 w-3" /> +18%
          </div>
        </div>
        <div className="h-24 sm:h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { d: "M", v: 42 },
                { d: "T", v: 55 },
                { d: "W", v: 48 },
                { d: "T", v: 67 },
                { d: "F", v: 72 },
                { d: "S", v: 80 },
                { d: "S", v: 88 },
              ]}
            >
              <Line
                type="monotone"
                dataKey="v"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: "hsl(var(--primary))" }}
              />
              <XAxis
                dataKey="d"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

const SlideAITutor = () => {
  const { t } = useLanguage();
  const msgs = [
    {
      who: "student",
      text: {
        vi: "Thầy ơi, em chưa hiểu thì hiện tại hoàn thành dùng khi nào ạ?",
        en: "Teacher, when do we use the Present Perfect tense?",
      },
      time: "20:14",
    },
    {
      who: "ai",
      text: {
        vi: "Hi An! Present Perfect dùng cho hành động đã xảy ra nhưng còn liên quan đến hiện tại 👇\n• I have studied English for 3 years.\n• She has just finished her homework.",
        en: "Hi An! Present Perfect describes actions that happened but still connect to the present 👇\n• I have studied English for 3 years.\n• She has just finished her homework.",
      },
      time: "20:14",
    },
    {
      who: "student",
      text: {
        vi: "Cho em 1 bài tập nhanh được không thầy?",
        en: "Can I get a quick practice question, please?",
      },
      time: "20:15",
    },
    {
      who: "ai",
      text: {
        vi: "Đây nhé: 'I ___ (live) in Hà Nội since 2020.' → Trả lời rồi thầy chấm liền!",
        en: "Here: 'I ___ (live) in Hanoi since 2020.' → Answer and I'll grade it instantly!",
      },
      time: "20:15",
    },
  ];
  return (
    <div className="space-y-2.5">
      {msgs.map((m, i) => (
        <div
          key={i}
          className={`flex ${m.who === "ai" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] sm:text-xs leading-relaxed whitespace-pre-line ${
              m.who === "ai"
                ? "bg-gradient-to-br from-violet-500/15 to-primary/10 border border-violet-500/30 text-foreground rounded-bl-sm"
                : "bg-primary text-primary-foreground rounded-br-sm"
            }`}
          >
            {m.who === "ai" && (
              <div className="flex items-center gap-1 mb-1 text-[10px] font-semibold text-violet-600">
                <Bot className="h-3 w-3" /> AI Tutor
              </div>
            )}
            {t(m.text.vi, m.text.en)}
            <div
              className={`text-[9px] mt-1 ${m.who === "ai" ? "text-muted-foreground" : "text-primary-foreground/70"}`}
            >
              {m.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SlideClasses = () => {
  const { t } = useLanguage();
  const classes = [
    {
      name: {
        vi: "IELTS 6.5 - Ca tối T2-4-6",
        en: "IELTS 6.5 - Evening Mon/Wed/Fri",
      },
      students: 18,
      prog: 72,
      color: "from-primary to-emerald-500",
    },
    {
      name: { vi: "Tiếng Anh giao tiếp B1", en: "Conversational English B1" },
      students: 24,
      prog: 58,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: {
        vi: "Luyện thi THPT 2026",
        en: "National High School Exam Prep 2026",
      },
      students: 31,
      prog: 84,
      color: "from-amber-500 to-orange-500",
    },
    {
      name: { vi: "Tiếng Trung HSK 3", en: "Chinese HSK 3" },
      students: 12,
      prog: 41,
      color: "from-rose-500 to-pink-500",
    },
  ];
  return (
    <div className="space-y-2">
      {classes.map((c) => (
        <div
          key={c.name.en}
          className="rounded-xl border border-border/60 bg-background/70 p-3"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[11px] sm:text-xs font-semibold text-foreground truncate">
              {t(c.name.vi, c.name.en)}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0 ml-2">
              <Users className="h-3 w-3" /> {c.students}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${c.color}`}
              style={{ width: `${c.prog}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <div className="text-[10px] text-muted-foreground">
              {t("Tiến độ khoá học", "Course progress")}
            </div>
            <div className="text-[10px] font-bold text-foreground">
              {c.prog}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SlideParentReport = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border/60 bg-gradient-to-br from-emerald-500/10 to-primary/5 p-3.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
            NA
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground">
              {t(
                "Nguyễn Văn An · Lớp IELTS 6.5",
                "An Nguyen · IELTS 6.5 Class",
              )}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {t("Báo cáo tháng 5/2026", "May 2026 Report")}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              l: { vi: "Buổi học", en: "Sessions" },
              v: "12/12",
              i: Calendar,
              c: "text-emerald-600",
            },
            {
              l: { vi: "Điểm TB", en: "Avg Score" },
              v: "8.4",
              i: Award,
              c: "text-amber-600",
            },
            {
              l: { vi: "Bài tập", en: "Homework" },
              v: "96%",
              i: ClipboardList,
              c: "text-primary",
            },
          ].map((m) => (
            <div
              key={m.l.en}
              className="rounded-lg bg-background/80 border border-border/40 p-2 text-center"
            >
              <m.i className={`h-3.5 w-3.5 mx-auto mb-1 ${m.c}`} />
              <div className="text-sm font-bold text-foreground leading-none">
                {m.v}
              </div>
              <div className="text-[9px] text-muted-foreground mt-1">
                {t(m.l.vi, m.l.en)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
          <Mail className="h-3 w-3 text-primary" />{" "}
          {t("Nhận xét từ Thầy Hải", "Comments from Mr. Hai")}
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {t(
            "An tiến bộ rõ rệt ở kỹ năng Writing (Task 2 tăng 0.5 band). Cần luyện thêm Speaking Part 3 - đã giao 5 bài cho tuần tới ✨",
            "An has clearly improved in Writing (Task 2 up 0.5 band). Needs more Speaking Part 3 practice - 5 tasks assigned for next week ✨",
          )}
        </p>
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
        <span>
          📧 {t("Đã gửi tự động đến phụ huynh", "Auto-sent to parents")}
        </span>
        <span className="text-emerald-600 font-semibold">✓ 01/06/2026</span>
      </div>
    </div>
  );
};

const SlideAssignments = () => {
  const { t } = useLanguage();
  const stats = [
    {
      l: { vi: "Cần chấm", en: "To grade" },
      v: "12",
      c: "text-rose-600",
      bg: "bg-rose-500/10",
    },
    {
      l: { vi: "AI đã chấm", en: "AI graded" },
      v: "184",
      c: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      l: { vi: "Tiết kiệm", en: "Time saved" },
      v: "9.2h",
      c: "text-primary",
      bg: "bg-primary/10",
    },
  ];
  const rows = [
    {
      name: "Trần Minh Anh",
      task: "IELTS Writing Task 2 - Education",
      band: "7.0",
      color: "from-emerald-500 to-primary",
      status: { vi: "AI đã chấm", en: "AI graded" },
    },
    {
      name: "Lê Quang Huy",
      task: "Reading Practice Test 12",
      band: "8.5",
      color: "from-violet-500 to-fuchsia-500",
      status: { vi: "AI đã chấm", en: "AI graded" },
    },
    {
      name: "Phạm Thu Hà",
      task: "Speaking Part 2 - Hometown",
      band: "-",
      color: "from-amber-500 to-rose-500",
      status: { vi: "Chờ Thầy duyệt", en: "Awaiting teacher review" },
    },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.l.en}
            className={`rounded-xl border border-border/60 ${s.bg} p-3.5 text-center`}
          >
            <div
              className={`text-xl sm:text-2xl font-bold ${s.c} leading-none`}
            >
              {s.v}
            </div>
            <div className="text-[11px] text-muted-foreground mt-1.5">
              {t(s.l.vi, s.l.en)}
            </div>
          </div>
        ))}
      </div>
      {rows.map((r) => (
        <div
          key={r.name}
          className="rounded-xl border border-border/60 bg-background/70 p-3 flex items-center gap-3"
        >
          <div
            className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold`}
          >
            {r.name
              .split(" ")
              .map((w) => w[0])
              .slice(-2)
              .join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
              {r.task}
            </div>
            <div className="text-[11px] text-muted-foreground truncate">
              {r.name} · {t(r.status.vi, r.status.en)}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-bold text-foreground leading-none">
              {r.band}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Band</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SlideAnalytics = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border/60 bg-background/70 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs sm:text-sm font-semibold text-foreground">
            {t("Doanh thu 6 tháng gần nhất", "Revenue - last 6 months")}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold inline-flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +34%
          </div>
        </div>
        <div className="h-32 sm:h-36">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { m: "Dec", v: 18 },
                { m: "Jan", v: 24 },
                { m: "Feb", v: 22 },
                { m: "Mar", v: 31 },
                { m: "Apr", v: 38 },
                { m: "May", v: 48 },
              ]}
            >
              <Line
                type="monotone"
                dataKey="v"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "hsl(var(--primary))" }}
              />
              <XAxis
                dataKey="m"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
          <div className="text-[11px] text-muted-foreground mb-1">
            {t("Tỷ lệ hoàn thành", "Completion rate")}
          </div>
          <div className="text-2xl font-bold text-emerald-600 leading-none">
            92%
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-primary"
              style={{ width: "92%" }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
          <div className="text-[11px] text-muted-foreground mb-1">
            {t("Học viên quay lại", "Returning students")}
          </div>
          <div className="text-2xl font-bold text-primary leading-none">
            87%
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-violet-500"
              style={{ width: "87%" }}
            />
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("AI gợi ý:", "AI suggestion:")}
          </span>{" "}
          {t(
            "Lớp IELTS 6.5 ca tối đang có 3 học viên giảm tiến độ - nên gửi tin nhắn động viên trong 48h tới.",
            "The IELTS 6.5 evening class has 3 students slipping - send an encouragement message in the next 48 hours.",
          )}
        </div>
      </div>
    </div>
  );
};

const SlideLessons = () => {
  const { t } = useLanguage();
  const blocks = [
    {
      icon: Play,
      label: { vi: "Video HD", en: "HD Video" },
      v: "5:32",
      c: "from-rose-500 to-orange-500",
    },
    {
      icon: FileText,
      label: { vi: "Lý thuyết", en: "Theory" },
      v: { vi: "1.2k từ", en: "1.2k words" },
      c: "from-emerald-500 to-teal-500",
    },
    {
      icon: ClipboardList,
      label: { vi: "Bài tập", en: "Exercises" },
      v: { vi: "12 câu", en: "12 items" },
      c: "from-primary to-sky-500",
    },
    {
      icon: MessageCircle,
      label: { vi: "Hỏi AI", en: "Ask AI" },
      v: "24/7",
      c: "from-violet-500 to-fuchsia-500",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Bài 12 · IELTS Writing Task 2",
                  "Lesson 12 · IELTS Writing Task 2",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t("Chương 3 - Argument Essay", "Chapter 3 - Argument Essay")}
              </div>
            </div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 font-semibold">
            <Play className="h-3 w-3" /> {t("Học ngay", "Start now")}
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
            style={{ width: "62%" }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{t("Hoàn thành 62%", "62% complete")}</span>
          <span>{t("18 / 29 phút", "18 / 29 min")}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {blocks.map((b) => {
          const value = typeof b.v === "string" ? b.v : t(b.v.vi, b.v.en);
          return (
            <div
              key={b.label.en}
              className="rounded-xl border border-border/60 bg-background/70 p-3 flex items-center gap-2.5"
            >
              <div
                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${b.c} flex items-center justify-center text-white shrink-0`}
              >
                <b.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-muted-foreground">
                  {t(b.label.vi, b.label.en)}
                </div>
                <div className="text-xs sm:text-sm font-bold text-foreground truncate">
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("Tương tác cao:", "Highly interactive:")}
          </span>{" "}
          {t(
            "mỗi bài đều có flashcards, quiz trắc nghiệm, ghi âm luyện nói và AI chữa lỗi tức thì.",
            "every lesson includes flashcards, multiple-choice quizzes, speaking recordings and instant AI feedback.",
          )}
        </div>
      </div>
    </div>
  );
};

const SlideRLLab = () => {
  const { t } = useLanguage();
  const stats = [
    {
      l: { vi: "Engagement", en: "Engagement" },
      v: "84%",
      c: "text-emerald-600",
      w: "84%",
      bar: "from-emerald-500 to-teal-500",
    },
    {
      l: { vi: "Độ chính xác", en: "Accuracy" },
      v: "71%",
      c: "text-primary",
      w: "71%",
      bar: "from-primary to-sky-500",
    },
    {
      l: { vi: "Streak", en: "Streak" },
      v: { vi: "9 ngày", en: "9 days" },
      c: "text-amber-600",
      w: "90%",
      bar: "from-amber-500 to-orange-500",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-teal-500/40 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white">
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Học viên: Lê Quang Huy · IELTS 6.5",
                  "Student: Huy Le · IELTS 6.5",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t(
                  "RL Agent đang tối ưu lộ trình từng tuần",
                  "RL agent optimizing the weekly learning path",
                )}
              </div>
            </div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/30 font-semibold">
            <Activity className="h-3 w-3 animate-pulse" /> Live policy
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {stats.map((s) => {
            const val = typeof s.v === "string" ? s.v : t(s.v.vi, s.v.en);
            return (
              <div
                key={s.l.en}
                className="rounded-lg bg-background/70 border border-border/60 p-2"
              >
                <div className="text-[10px] text-muted-foreground">
                  {t(s.l.vi, s.l.en)}
                </div>
                <div className={`text-sm font-bold ${s.c} leading-none mt-0.5`}>
                  {val}
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${s.bar}`}
                    style={{ width: s.w }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
          <div className="text-[10px] text-emerald-700 font-semibold mb-1.5 flex items-center gap-1">
            <Trophy className="h-3 w-3" />{" "}
            {t("Tín hiệu Reward (+)", "Reward signals (+)")}
          </div>
          <ul className="space-y-1 text-[11px] text-foreground/85">
            <li>
              • {t("Hoàn thành bài đúng hạn", "Submit homework on time")}{" "}
              <span className="font-bold text-emerald-600">+8</span>
            </li>
            <li>
              • {t("Streak 7+ ngày", "Streak of 7+ days")}{" "}
              <span className="font-bold text-emerald-600">+5</span>
            </li>
            <li>
              • {t("Tự hỏi AI Tutor", "Ask the AI Tutor")}{" "}
              <span className="font-bold text-emerald-600">+3</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
          <div className="text-[10px] text-rose-700 font-semibold mb-1.5 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />{" "}
            {t("Tín hiệu Penalty (-)", "Penalty signals (-)")}
          </div>
          <ul className="space-y-1 text-[11px] text-foreground/85">
            <li>
              • {t("Bỏ buổi không báo", "Missed class without notice")}{" "}
              <span className="font-bold text-rose-600">-6</span>
            </li>
            <li>
              • {t("Quiz dưới 50%", "Quiz below 50%")}{" "}
              <span className="font-bold text-rose-600">-4</span>
            </li>
            <li>
              • {t("Im lặng > 5 ngày", "Inactive > 5 days")}{" "}
              <span className="font-bold text-rose-600">-5</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-teal-500/40 bg-gradient-to-r from-teal-500/10 to-emerald-500/5 p-3 flex items-start gap-2.5">
        <Target className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold text-teal-700">
            {t(
              "Hành động được RL đề xuất tuần này:",
              "This week's RL-recommended action:",
            )}
          </span>{" "}
          {t(
            "giảm độ khó Listening Part 3 xuống Band 6.0, tăng 2 buổi Speaking 1-1, gửi 1 voice note động viên từ Thầy.",
            "lower Listening Part 3 difficulty to Band 6.0, add 2 Speaking 1-on-1 sessions, send a voice note of encouragement from the teacher.",
          )}{" "}
          <span className="text-muted-foreground">
            →{" "}
            {t(
              "Dự báo lên Band 6.5 sau 3 tuần.",
              "Forecast to reach Band 6.5 in 3 weeks.",
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

const SlideEarlyWarning = () => {
  const { t } = useLanguage();
  const stats = [
    {
      l: { vi: "An toàn", en: "Safe" },
      v: "42",
      c: "text-emerald-600",
      bg: "bg-emerald-500/10",
      icon: ShieldCheck,
    },
    {
      l: { vi: "Cần chú ý", en: "Watch" },
      v: "7",
      c: "text-amber-600",
      bg: "bg-amber-500/10",
      icon: Bell,
    },
    {
      l: { vi: "Rủi ro cao", en: "High risk" },
      v: "3",
      c: "text-rose-600",
      bg: "bg-rose-500/10",
      icon: AlertTriangle,
    },
  ];
  const rows = [
    {
      name: "Phạm Thu Hà",
      level: { vi: "Rủi ro cao", en: "High risk" },
      color: "rose",
      signal: {
        vi: "Vắng 3 buổi liên tiếp · Quiz 38% · Không mở bài 7 ngày",
        en: "Missed 3 sessions in a row · Quiz 38% · No lesson opened in 7 days",
      },
      action: {
        vi: "Gọi điện phụ huynh + tặng 1 buổi 1-1 miễn phí",
        en: "Call parents + offer 1 free 1-on-1 session",
      },
      risk: 87,
    },
    {
      name: "Đỗ Minh Quân",
      level: { vi: "Cần chú ý", en: "Watch" },
      color: "amber",
      signal: {
        vi: "Streak giảm · Engagement -22% trong 2 tuần",
        en: "Streak dropping · Engagement -22% in 2 weeks",
      },
      action: {
        vi: "AI Tutor chủ động gửi tin nhắn động viên",
        en: "AI Tutor proactively sends an encouragement message",
      },
      risk: 54,
    },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.l.en}
            className={`rounded-xl border border-border/60 ${s.bg} p-3 text-center`}
          >
            <s.icon className={`h-4 w-4 ${s.c} mx-auto mb-1`} />
            <div
              className={`text-xl sm:text-2xl font-bold ${s.c} leading-none`}
            >
              {s.v}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {t(s.l.vi, s.l.en)}
            </div>
          </div>
        ))}
      </div>
      {rows.map((r) => {
        const colors =
          r.color === "rose"
            ? {
                border: "border-rose-500/40",
                bg: "bg-rose-500/5",
                chip: "bg-rose-500/15 text-rose-700 border-rose-500/30",
                bar: "bg-rose-500",
              }
            : {
                border: "border-amber-500/40",
                bg: "bg-amber-500/5",
                chip: "bg-amber-500/15 text-amber-700 border-amber-500/30",
                bar: "bg-amber-500",
              };
        return (
          <div
            key={r.name}
            className={`rounded-xl border ${colors.border} ${colors.bg} p-3`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {r.name}
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${colors.chip}`}
              >
                {t(r.level.vi, r.level.en)} · {r.risk}%
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mb-1.5">
              ⚠️ {t(r.signal.vi, r.signal.en)}
            </div>
            <div className="text-[11px] text-foreground flex items-start gap-1.5">
              <Sparkles className="h-3 w-3 text-primary mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold">
                  {t("AI đề xuất:", "AI suggests:")}
                </span>{" "}
                {t(r.action.vi, r.action.en)}
              </span>
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${colors.bar}`}
                style={{ width: `${r.risk}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SlideScheduleFinance = () => {
  const { t } = useLanguage();
  const items = [
    {
      tm: "19:00",
      c: { vi: "IELTS Speaking 1-1", en: "IELTS Speaking 1-on-1" },
      n: { vi: "Trần Minh Anh", en: "Anh Tran" },
      color: "from-emerald-500 to-teal-500",
    },
    {
      tm: "20:00",
      c: { vi: "TOEIC Listening · Lớp B2", en: "TOEIC Listening · B2 Class" },
      n: { vi: "12 học viên", en: "12 students" },
      color: "from-primary to-sky-500",
    },
    {
      tm: "21:00",
      c: { vi: "Tư vấn lộ trình du học", en: "Study Abroad Roadmap Consult" },
      n: { vi: "Nguyễn Khánh Linh", en: "Linh Nguyen" },
      color: "from-violet-500 to-fuchsia-500",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] text-muted-foreground font-medium">
              {t("Buổi hôm nay", "Today's sessions")}
            </div>
            <Calendar className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground leading-none">
            {t("5 lớp", "5 classes")}
          </div>
          <div className="text-[10px] text-emerald-600 mt-1.5 font-semibold">
            ✓ {t("Đã gửi nhắc lịch 18:30", "Reminders sent at 18:30")}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] text-muted-foreground font-medium">
              {t("Học phí tháng này", "Tuition this month")}
            </div>
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 leading-none">
            48.2M₫
          </div>
          <div className="text-[10px] text-emerald-700 mt-1.5 font-semibold">
            +34% {t("so với tháng trước", "vs last month")}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs sm:text-sm font-semibold text-foreground">
            {t("Lịch sắp tới", "Upcoming schedule")}
          </div>
          <span className="text-[10px] text-muted-foreground">
            {t(
              "Tự động đồng bộ Zoom · Google Calendar",
              "Auto-sync Zoom · Google Calendar",
            )}
          </span>
        </div>
        {items.map((s) => (
          <div
            key={s.c.en}
            className="flex items-center gap-3 py-2 border-t border-border/40 first:border-t-0"
          >
            <div
              className={`h-9 w-12 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}
            >
              {s.tm}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {t(s.c.vi, s.c.en)}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {t(s.n.vi, s.n.en)}
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-semibold shrink-0">
              {t("Đã xác nhận", "Confirmed")}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5">
        <Gauge className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("Tự động hoá:", "Automation:")}
          </span>{" "}
          {t(
            "nhắc đóng học phí, xuất biên lai PDF, gửi link Zoom, cảnh báo khi học viên trễ > 2 ngày - Thầy/Cô tập trung 100% vào giảng dạy.",
            "tuition reminders, PDF receipts, Zoom links, alerts when students are late > 2 days - you focus 100% on teaching.",
          )}
        </div>
      </div>
    </div>
  );
};

const SlideRubricGrading = () => {
  const { t } = useLanguage();
  const criteria = [
    {
      l: "Task Response",
      v: 7.0,
      c: "from-rose-500 to-orange-500",
      note: {
        vi: "Cover đủ ý, ví dụ rõ",
        en: "Covers all points, clear examples",
      },
    },
    {
      l: "Coherence",
      v: 7.5,
      c: "from-emerald-500 to-teal-500",
      note: { vi: "Linking từ đa dạng", en: "Diverse linking words" },
    },
    {
      l: "Lexical Resource",
      v: 6.5,
      c: "from-amber-500 to-orange-500",
      note: { vi: "Lặp từ 'good' 4 lần", en: "'good' repeated 4 times" },
    },
    {
      l: "Grammar Range",
      v: 7.0,
      c: "from-primary to-sky-500",
      note: {
        vi: "Câu phức tốt, vài lỗi nhỏ",
        en: "Good complex sentences, minor errors",
      },
    },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-500/10 via-orange-500/5 to-transparent p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Bài Writing Task 2 · Trần Minh Anh",
                  "Writing Task 2 · Anh Tran",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t("Đề:", "Prompt:")} "Online learning vs traditional classroom"
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-rose-600 leading-none">
              7.0
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              Overall Band
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {criteria.map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-border/60 bg-background/70 p-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold text-foreground">
                {s.l}
              </div>
              <div className="text-sm font-bold text-foreground">
                {s.v.toFixed(1)}
              </div>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${s.c}`}
                style={{ width: `${(s.v / 9) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-muted-foreground mt-1.5">
              {t(s.note.vi, s.note.en)}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("AI gợi ý sửa lỗi:", "AI fix suggestions:")}
          </span>{" "}
          {t(
            'thay "good" bằng "beneficial / advantageous", chuyển 2 câu đơn ở đoạn 2 thành câu ghép, bổ sung 1 ví dụ thực tế tại Việt Nam.',
            'replace "good" with "beneficial / advantageous", combine 2 simple sentences in paragraph 2 into a compound, add a real example from Vietnam.',
          )}{" "}
          <span className="text-muted-foreground">
            → {t("Có thể đạt Band 7.5.", "Could reach Band 7.5.")}
          </span>
        </div>
      </div>
    </div>
  );
};

const SlideSpeakingGrading = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-transparent p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                Speaking Part 2 · "Describe a hometown"
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t("Lê Quang Huy · ghi âm 1m48s", "Huy Le · 1m48s recording")}
              </div>
            </div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-500/10 text-violet-600 border border-violet-500/30 font-semibold">
            <Activity className="h-3 w-3 animate-pulse" /> AI scoring
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {[
            { l: "Fluency", v: "7.0" },
            { l: "Lexical", v: "6.5" },
            { l: "Grammar", v: "7.0" },
            { l: "Pronun.", v: "6.5" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-lg bg-background/70 border border-border/60 p-2 text-center"
            >
              <div className="text-base font-bold text-violet-600 leading-none">
                {s.v}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="text-[11px] text-muted-foreground mb-2 font-medium">
          {t(
            "Transcript có highlight phát âm",
            "Transcript with pronunciation highlights",
          )}
        </div>
        <div className="text-xs sm:text-sm leading-relaxed text-foreground">
          My hometown is{" "}
          <span className="bg-emerald-500/20 text-emerald-700 px-1 rounded">
            Hai Phong
          </span>
          , a port city in the
          <span
            className="bg-rose-500/25 text-rose-700 px-1 rounded mx-1"
            title={t("Sai âm /ˈnɔːrðərn/", "Mispronounced /ˈnɔːrðərn/")}
          >
            northern
          </span>
          part of{" "}
          <span className="bg-emerald-500/20 text-emerald-700 px-1 rounded">
            Vietnam
          </span>
          . It's
          <span
            className="bg-amber-500/25 text-amber-700 px-1 rounded mx-1"
            title={t("Trọng âm sai", "Wrong stress")}
          >
            famous
          </span>
          for its seafood and{" "}
          <span className="bg-emerald-500/20 text-emerald-700 px-1 rounded">
            friendly people
          </span>
          .
        </div>
        <div className="flex items-center gap-3 mt-2.5 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded bg-emerald-500/60" />{" "}
            {t("Chuẩn", "Correct")}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded bg-amber-500/70" />{" "}
            {t("Trọng âm", "Stress")}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded bg-rose-500/70" />{" "}
            {t("Sai âm", "Wrong sound")}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t(
              "Bài tập phát âm tự sinh:",
              "Auto-generated pronunciation drill:",
            )}
          </span>{" "}
          {t(
            "6 từ /θ/ /ð/ + 4 cụm trọng âm - học viên luyện lại trong 5 phút, AI chấm lại tự động.",
            "6 /θ/ /ð/ words + 4 stress clusters - student practices for 5 minutes and the AI re-grades automatically.",
          )}
        </div>
      </div>
    </div>
  );
};

const SlideLiveClass = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-sky-500/40 bg-gradient-to-br from-sky-500/10 via-primary/5 to-transparent p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-primary flex items-center justify-center text-white">
                <Monitor className="h-4 w-4" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-card animate-pulse" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Lớp IELTS 6.5 · Ca tối · LIVE",
                  "IELTS 6.5 · Evening Class · LIVE",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t(
                  "18 / 20 học viên có mặt · 42:18 đã trôi qua",
                  "18 / 20 students present · 42:18 elapsed",
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-emerald-600 leading-none">
              84%
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {t("Tập trung TB", "Avg focus")}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {[
          { n: "MA", f: 95, c: "emerald" },
          { n: "QH", f: 88, c: "emerald" },
          { n: "TH", f: 42, c: "rose" },
          { n: "KL", f: 76, c: "amber" },
          { n: "MQ", f: 91, c: "emerald" },
          { n: "NN", f: 58, c: "amber" },
          { n: "DT", f: 82, c: "emerald" },
          { n: "VL", f: 35, c: "rose" },
          { n: "HP", f: 89, c: "emerald" },
          { n: "BT", f: 71, c: "amber" },
          { n: "CK", f: 93, c: "emerald" },
          { n: "AT", f: 64, c: "amber" },
        ].map((s) => {
          const ring =
            s.c === "emerald"
              ? "ring-emerald-500/60 bg-emerald-500/15 text-emerald-700"
              : s.c === "amber"
                ? "ring-amber-500/60 bg-amber-500/15 text-amber-700"
                : "ring-rose-500/60 bg-rose-500/15 text-rose-700 animate-pulse";
          return (
            <div
              key={s.n}
              className={`aspect-square rounded-lg ring-2 ${ring} flex flex-col items-center justify-center`}
            >
              <div className="text-[10px] font-bold leading-none">{s.n}</div>
              <div className="text-[9px] mt-0.5 opacity-80">{s.f}%</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 flex items-start gap-2.5">
        <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("AI phát hiện:", "AI detected:")}
          </span>{" "}
          {t(
            "2 học viên (TH, VL) đang mất tập trung > 6 phút - gợi ý gọi tên ngẫu nhiên, hoặc gửi poll nhanh để kéo lại sự tham gia.",
            "2 students (TH, VL) lost focus for > 6 minutes - suggest a random cold-call or quick poll to re-engage.",
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          {
            l: { vi: "Tay giơ", en: "Hands raised" },
            v: "4",
            icon: HelpCircle,
            c: "text-primary",
            bg: "bg-primary/10",
          },
          {
            l: { vi: "Poll trả lời", en: "Poll answers" },
            v: "16 / 18",
            icon: Check,
            c: "text-emerald-600",
            bg: "bg-emerald-500/10",
          },
          {
            l: { vi: "Chat hỏi", en: "Chat questions" },
            v: "9",
            icon: MessageCircle,
            c: "text-violet-600",
            bg: "bg-violet-500/10",
          },
        ].map((s) => (
          <div
            key={s.l.en}
            className={`rounded-lg ${s.bg} border border-border/60 p-2.5`}
          >
            <s.icon className={`h-3.5 w-3.5 ${s.c}`} />
            <div className="text-sm font-bold text-foreground mt-1 leading-none">
              {s.v}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">
              {t(s.l.vi, s.l.en)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SlideMasteryMap = () => {
  const { t } = useLanguage();
  const rows = [
    { n: { vi: "Trần Anh", en: "Anh Tran" }, row: [85, 72, 65, 78, 55, 60] },
    { n: { vi: "Lê Huy", en: "Huy Le" }, row: [92, 88, 80, 75, 70, 82] },
    { n: { vi: "Phạm Hà", en: "Ha Pham" }, row: [45, 38, 52, 60, 35, 42] },
    { n: { vi: "Đỗ Quân", en: "Quan Do" }, row: [70, 65, 58, 72, 50, 55] },
    { n: { vi: "Ng. Linh", en: "Linh Ng." }, row: [88, 82, 78, 85, 75, 80] },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white">
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Skill Mastery · Lớp IELTS 6.5",
                  "Skill Mastery · IELTS 6.5 Class",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t(
                  "Cập nhật theo từng bài tập nộp lên",
                  "Updated with every submitted assignment",
                )}
              </div>
            </div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/30 font-semibold">
            {t("12 kỹ năng", "12 skills")}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="text-[11px] text-muted-foreground mb-2 font-medium">
          {t(
            "Heatmap mức độ thành thạo (xanh = vững, đỏ = yếu)",
            "Mastery heatmap (green = strong, red = weak)",
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 text-[9px]">
          <div></div>
          {["Skim", "Detail", "Para", "Vocab", "T/F", "Match"].map((h) => (
            <div
              key={h}
              className="text-center text-muted-foreground font-medium truncate"
            >
              {h}
            </div>
          ))}
          {rows.map((r) => (
            <Fragment key={r.n.en}>
              <div className="text-muted-foreground truncate text-[10px] flex items-center">
                {t(r.n.vi, r.n.en)}
              </div>
              {r.row.map((v, i) => {
                const bg =
                  v >= 75
                    ? "bg-emerald-500"
                    : v >= 60
                      ? "bg-amber-500"
                      : v >= 45
                        ? "bg-orange-500"
                        : "bg-rose-500";
                const op = 0.3 + (v / 100) * 0.7;
                return (
                  <div
                    key={`${r.n.en}-${i}`}
                    className={`aspect-square rounded ${bg} flex items-center justify-center text-white font-bold`}
                    style={{ opacity: op }}
                    title={`${t(r.n.vi, r.n.en)} · ${v}%`}
                  >
                    {v}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-3 flex items-start gap-2.5">
        <Target className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("AI khuyến nghị:", "AI recommends:")}
          </span>{" "}
          {t(
            'mở mini-lesson "True/False/Not Given" cho 3 học viên ô đỏ; Phạm Hà cần kèm 1-1 - yếu toàn diện ở Reading.',
            'open a "True/False/Not Given" mini-lesson for the 3 red students; Ha Pham needs 1-on-1 tutoring - weak across Reading.',
          )}
        </div>
      </div>
    </div>
  );
};

const SlideAssignmentBuilder = () => {
  const { t } = useLanguage();
  const cls = [
    {
      l: { vi: "Lớp IELTS 6.5", en: "IELTS 6.5 Class" },
      v: { vi: "20 HV", en: "20 students" },
      c: "from-primary to-sky-500",
    },
    {
      l: { vi: "Lớp IELTS 7.0", en: "IELTS 7.0 Class" },
      v: { vi: "15 HV", en: "15 students" },
      c: "from-emerald-500 to-teal-500",
    },
    {
      l: { vi: "Lớp 1-1 Premium", en: "1-on-1 Premium" },
      v: { vi: "12 HV", en: "12 students" },
      c: "from-violet-500 to-fuchsia-500",
    },
  ];
  const tiers = [
    {
      l: { vi: "Học viên yếu (<6.0)", en: "Weak students (<6.0)" },
      task: {
        vi: "Passage rút gọn · 8 câu · gợi ý từ vựng",
        en: "Short passage · 8 questions · vocab hints",
      },
      c: "rose",
      n: 9,
    },
    {
      l: { vi: "Học viên trung bình (6.0-6.5)", en: "Average (6.0-6.5)" },
      task: {
        vi: "Passage đầy đủ · 13 câu · không gợi ý",
        en: "Full passage · 13 questions · no hints",
      },
      c: "amber",
      n: 24,
    },
    {
      l: { vi: "Học viên khá (≥7.0)", en: "Strong (≥7.0)" },
      task: {
        vi: "Passage + bonus T/F/NG · 16 câu · giới hạn 20'",
        en: "Passage + bonus T/F/NG · 16 questions · 20-min limit",
      },
      c: "emerald",
      n: 14,
    },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border-2 border-teal-500/40 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white">
              <Send className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">
                {t(
                  "Giao bài: Reading Practice #18",
                  "Assign: Reading Practice #18",
                )}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t(
                  "Hạn nộp: Chủ nhật 21:00 · Tự động chấm",
                  "Due: Sunday 21:00 · Auto-graded",
                )}
              </div>
            </div>
          </div>
          <div className="text-[10px] inline-flex items-center gap-1 px-2 py-1 rounded-full bg-teal-500/15 text-teal-700 border border-teal-500/30 font-semibold">
            {t("3 lớp · 47 HV", "3 classes · 47 students")}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-1">
          {cls.map((s) => (
            <div
              key={s.l.en}
              className={`rounded-lg p-2 text-white bg-gradient-to-br ${s.c}`}
            >
              <div className="text-[10px] opacity-90">{t(s.l.vi, s.l.en)}</div>
              <div className="text-sm font-bold leading-none mt-1">
                {t(s.v.vi, s.v.en)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="text-[11px] text-muted-foreground mb-2 font-medium">
          {t(
            "Cá nhân hoá theo trình độ (AI tự chia đề)",
            "Personalized by level (AI splits the task)",
          )}
        </div>
        {tiers.map((r) => {
          const clss =
            r.c === "rose"
              ? "border-rose-500/30 bg-rose-500/5"
              : r.c === "amber"
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-emerald-500/30 bg-emerald-500/5";
          const chip =
            r.c === "rose"
              ? "bg-rose-500/15 text-rose-700"
              : r.c === "amber"
                ? "bg-amber-500/15 text-amber-700"
                : "bg-emerald-500/15 text-emerald-700";
          return (
            <div
              key={r.l.en}
              className={`rounded-lg border ${clss} p-2.5 flex items-center gap-2.5 mt-1.5 first:mt-0`}
            >
              <div
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${chip} shrink-0`}
              >
                {r.n} {t("HV", "stu")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-foreground">
                  {t(r.l.vi, r.l.en)}
                </div>
                <div className="text-[10px] text-muted-foreground truncate">
                  {t(r.task.vi, r.task.en)}
                </div>
              </div>
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-3 flex items-start gap-2.5">
        <Zap className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("Tiết kiệm 9.2h/tuần:", "Save 9.2h/week:")}
          </span>{" "}
          {t(
            "1 lần soạn → AI chia 3 cấp độ → gửi Zalo + email → chấm tự động → trả kết quả + lời nhận xét cá nhân hoá cho từng học viên.",
            "Author once → AI splits into 3 levels → send via Zalo + email → auto-grade → return personalized scores & feedback per student.",
          )}
        </div>
      </div>
    </div>
  );
};

const SlideGamification = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border-2 border-purple-300/40 dark:border-purple-500/30 bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-indigo-500/15 backdrop-blur p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
            {t("Cấp 5", "Level 5")}
          </div>
          <div className="text-sm font-black text-foreground mt-0.5">
            🧪 {t("Nhà khoa học", "Scientist")}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
              style={{ width: "68%" }}
            />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            1 240 / 1 800 XP
          </div>
        </div>
        <div className="rounded-xl border-2 border-orange-300/50 dark:border-orange-500/30 bg-gradient-to-br from-orange-500/15 via-red-500/10 to-amber-500/15 backdrop-blur p-3 flex flex-col justify-center items-center text-center">
          <div className="text-3xl">🔥</div>
          <div className="text-xl font-black text-orange-600 dark:text-orange-300 mt-1">
            12 <span className="text-sm font-bold">{t("ngày", "days")}</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {t("Chuỗi học liên tiếp", "Learning streak")}
          </div>
        </div>
        <div className="rounded-xl border-2 border-emerald-300/50 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-cyan-500/15 backdrop-blur p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3" /> {t("Nhiệm vụ", "Quests")}
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-300">
              <Check className="w-3.5 h-3.5" />{" "}
              <span className="line-through opacity-80">
                {t("Mở 1 bài học", "Open 1 lesson")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-300">
              <Check className="w-3.5 h-3.5" />{" "}
              <span className="line-through opacity-80">
                {t("Hoàn thành 1 quiz", "Finish 1 quiz")}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className="h-3.5 w-3.5 rounded-full border border-muted-foreground/40 inline-block" />{" "}
              {t("Kiếm 1 sao ⭐", "Earn 1 star ⭐")}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <div className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Medal className="h-3.5 w-3.5 text-amber-500" />{" "}
            {t("Huy chương & Thành tích", "Medals & Achievements")}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { emoji: "🚀", t: { vi: "Khởi động", en: "Lift-off" } },
              { emoji: "💬", t: { vi: "Chatbot Pro", en: "Chatbot Pro" } },
              { emoji: "📝", t: { vi: "Writer", en: "Writer" } },
              { emoji: "🎯", t: { vi: "Bullseye", en: "Bullseye" } },
              { emoji: "🔥", t: { vi: "Streak 7", en: "Streak 7" } },
              { emoji: "⭐", t: { vi: "Star Master", en: "Star Master" } },
            ].map((b) => (
              <div
                key={b.t.en}
                className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[10px] font-semibold text-amber-700"
              >
                <span>{b.emoji}</span> {t(b.t.vi, b.t.en)}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-background/70 p-3">
          <div className="text-[11px] font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <UsersRound className="h-3.5 w-3.5 text-primary" />{" "}
            {t("Bảng xếp hạng tuần", "Weekly Leaderboard")}
          </div>
          <div className="space-y-1.5">
            {[
              { n: "Trần Minh Anh", xp: 320, rank: 1 },
              { n: "Lê Quang Huy", xp: 285, rank: 2 },
              { n: "Phạm Thu Hà", xp: 240, rank: 3 },
            ].map((r) => (
              <div key={r.n} className="flex items-center gap-2 text-[11px]">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    r.rank === 1
                      ? "bg-amber-500 text-white"
                      : r.rank === 2
                        ? "bg-slate-400 text-white"
                        : "bg-orange-400 text-white"
                  }`}
                >
                  {r.rank}
                </span>
                <span className="flex-1 text-foreground truncate">{r.n}</span>
                <span className="font-bold text-primary">{r.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5">
        <Gamepad2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("Gamification tự động:", "Automatic gamification:")}
          </span>{" "}
          {t(
            "học viên kiếm XP qua bài học, quiz, streak hàng ngày - tăng tỉ lệ quay lại lên",
            "students earn XP through lessons, quizzes and daily streaks - boosting return rate by",
          )}{" "}
          <span className="font-bold text-emerald-600">+34%</span>{" "}
          {t("so với lớp học truyền thống.", "vs traditional classes.")}
        </div>
      </div>
    </div>
  );
};

const SlideHR = () => {
  const { t } = useLanguage();
  const roles = [
    {
      role: { vi: "Admin", en: "Admin" },
      name: "Nguyễn Văn Hải",
      icon: UserCog,
      c: "from-primary to-sky-500",
    },
    {
      role: { vi: "Giáo viên", en: "Teacher" },
      name: "Trần Thị Lan",
      icon: GraduationCap,
      c: "from-emerald-500 to-teal-500",
    },
    {
      role: { vi: "Trợ giảng", en: "Assistant" },
      name: "Lê Văn Minh",
      icon: UsersRound,
      c: "from-violet-500 to-fuchsia-500",
    },
  ];
  const reports = [
    {
      t: { vi: "Báo cáo chất lượng lớp học", en: "Class Quality Report" },
      st: { vi: "✓ Đã duyệt", en: "✓ Approved" },
      c: "text-emerald-600",
    },
    {
      t: { vi: "Đề xuất tăng lương Trợ giảng", en: "Assistant raise proposal" },
      st: { vi: "Chờ Admin", en: "Awaiting Admin" },
      c: "text-amber-600",
    },
    {
      t: {
        vi: "Kế hoạch tuyển thêm GV tháng 7",
        en: "July teacher hiring plan",
      },
      st: { vi: "Đang soạn", en: "Drafting" },
      c: "text-muted-foreground",
    },
  ];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2.5">
        {roles.map((s) => (
          <div
            key={s.name}
            className="rounded-xl border border-border/60 bg-background/70 p-3 text-center"
          >
            <div
              className={`h-9 w-9 rounded-full bg-gradient-to-br ${s.c} flex items-center justify-center text-white mx-auto mb-2`}
            >
              <s.icon className="h-4 w-4" />
            </div>
            <div className="text-[11px] font-semibold text-foreground">
              {t(s.role.vi, s.role.en)}
            </div>
            <div className="text-[10px] text-muted-foreground truncate mt-0.5">
              {s.name}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
          <div className="text-[11px] text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />{" "}
            {t("Chấm công tháng 6", "June Time Logs")}
          </div>
          <div className="space-y-2">
            {[
              { n: "Lê Văn Minh", h: "42h", s: "2.100K₫" },
              { n: "Phạm Thị Hoa", h: "38h", s: "1.900K₫" },
            ].map((r) => (
              <div
                key={r.n}
                className="flex items-center justify-between text-[11px]"
              >
                <span className="text-foreground font-medium">{r.n}</span>
                <span className="text-muted-foreground">{r.h}</span>
                <span className="font-bold text-emerald-600">{r.s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5">
          <div className="text-[11px] text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
            <Wallet className="h-3.5 w-3.5 text-emerald-600" />{" "}
            {t("Tổng quỹ lương", "Total payroll")}
          </div>
          <div className="text-2xl font-bold text-emerald-600 leading-none">
            4.8M₫
          </div>
          <div className="text-[10px] text-emerald-700 mt-1.5 font-semibold">
            {t(
              "Đã trả 2/3 nhân sự · Còn 1 pending",
              "Paid 2/3 staff · 1 pending",
            )}
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="text-[11px] text-muted-foreground mb-2 font-medium flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-primary" />{" "}
          {t("Báo cáo & Thưởng", "Reports & Bonuses")}
        </div>
        <div className="space-y-1.5">
          {reports.map((r) => (
            <div
              key={r.t.en}
              className="flex items-center justify-between text-[11px] px-2 py-1.5 rounded-lg bg-secondary/30"
            >
              <span className="text-foreground">{t(r.t.vi, r.t.en)}</span>
              <span className={`font-semibold ${r.c}`}>
                {t(r.st.vi, r.st.en)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3 flex items-start gap-2.5">
        <Sparkles className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
        <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
          <span className="font-semibold">
            {t("Quản lý nhân sự tích hợp:", "Integrated HR management:")}
          </span>{" "}
          {t(
            "phân quyền Admin / Giáo viên / Trợ giảng, chấm công tự động, tính lương theo giờ và thưởng KPI - tất cả trên 1 dashboard.",
            "Admin / Teacher / Assistant roles, auto time tracking, hourly payroll and KPI bonuses - all in one dashboard.",
          )}
        </div>
      </div>
    </div>
  );
};

const EdTechWebService = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = requestSchema.safeParse(form);
    if (!parsed.success) {
      const firstError =
        parsed.error.errors[0]?.message ??
        t(
          "Vui lòng kiểm tra lại thông tin",
          "Please check your information again",
        );
      toast.error(firstError);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("service_requests").insert({
        teacher_name: parsed.data.teacher_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject_taught: parsed.data.subject_taught || null,
        selected_package: parsed.data.selected_package,
        special_requirements: parsed.data.special_requirements || null,
      });
      if (error) throw error;
      toast.success(
        t(
          "✅ Đã gửi yêu cầu đến Admin của HaiEduTech! Thầy Hải sẽ liên hệ trực tiếp với quý Thầy/Cô trong vòng 24 giờ.",
          "✅ Your request has been sent to HaiEduTech Admin! Mr. Hai will contact you directly within 24 hours.",
        ),
      );
      setForm(INITIAL);
    } catch (err) {
      toast.error(
        t(
          "Có lỗi xảy ra. Vui lòng thử lại sau ít phút.",
          "Something went wrong. Please try again in a few minutes.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalPackage, setLeadModalPackage] = useState<string>("standard");
  const openLeadModal = (pkg: string = "standard") => {
    setLeadModalPackage(pkg);
    setLeadModalOpen(true);
  };
  const scrollToForm = () => {
    document
      .getElementById("consultation-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Layered ambient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_85%_70%,hsl(160_84%_39%/0.18),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:42px_42px]" />
        {/* Floating orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT - Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" />
                {t(
                  "Thiết kế Website Giáo dục - Made by HaiEduTech",
                  "EdTech Website Design - Made by HaiEduTech",
                )}
              </div>

              <h1 className="notranslate font-display font-bold tracking-tight text-foreground leading-[1.05] text-[2rem] sm:text-5xl lg:text-[3rem]">
                {lang === "vi" ? (
                  <>
                    <span className="block">Nâng cao chất lượng</span>
                    <span className="block">giảng dạy với</span>
                  </>
                ) : (
                  <>
                    <span className="block">Elevate your teaching</span>
                    <span className="block">with a</span>
                  </>
                )}
                <span className="mt-2 block bg-gradient-to-r from-primary via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Smart Learning &amp;
                </span>
                <span className="block bg-gradient-to-r from-primary via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Teaching System
                </span>
              </h1>

              <p className="notranslate mt-6 text-base sm:text-lg text-foreground/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {lang === "vi" ? (
                  <>
                    Giải pháp{" "}
                    <span className="font-bold text-foreground">
                      "tailor-made"
                    </span>{" "}
                    - thiết kế riêng hệ thống LMS theo từng nhu cầu giảng dạy,
                    kết hợp{" "}
                    <span className="font-bold text-foreground">
                      nhiều năm kinh nghiệm sư phạm &amp; Data/AI Engineering
                    </span>{" "}
                    của thầy Hải &amp; đội ngũ tại Phần Lan.
                  </>
                ) : (
                  <>
                    A truly{" "}
                    <span className="font-bold text-foreground">
                      "tailor-made"
                    </span>{" "}
                    LMS - custom-built for the way you teach, powered by{" "}
                    <span className="font-bold text-foreground">
                      many years of pedagogy &amp; Data/AI Engineering
                    </span>{" "}
                    experience from Mr. Hai &amp; team in Vietnam &amp; Finland.
                  </>
                )}
              </p>

              <ul className="mt-7 max-w-xl mx-auto lg:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 text-left text-[14.5px] sm:text-[15px]">
                {[
                  {
                    vi: "Tiết kiệm 8-10 giờ chấm bài mỗi tuần",
                    en: "Save 8-10 hours of grading every week",
                  },
                  {
                    vi: "Hệ thống AI độc quyền về can thiệp & hỗ trợ sớm trong giáo dục",
                    en: "Exclusive AI system for early educational intervention & support",
                  },
                  {
                    vi: "Hệ thống Smart Learning System trợ giảng học viên 24/7",
                    en: "24/7 Smart Learning System assistant",
                  },
                  {
                    vi: "Tự động nhắc lịch học, thu học phí & gửi hoá đơn",
                    en: "Auto class reminders, tuition collection & invoicing",
                  },
                  {
                    vi: "Báo cáo phụ huynh tự động hàng tháng",
                    en: "Automated monthly parent reports",
                  },
                  {
                    vi: "Quản lý nhiều lớp, nhiều khoá trên 1 dashboard duy nhất",
                    en: "Run many classes & courses from one dashboard",
                  },
                  {
                    vi: "Bảo mật tài liệu giảng dạy - chống tải xuống & sao chép trái phép",
                    en: "Protect your materials - block downloads & unauthorized copying",
                  },
                  {
                    vi: "Có thương hiệu riêng (domain & logo) - tăng uy tín chuyên nghiệp",
                    en: "Your own brand (domain & logo) - instant professional credibility",
                  },
                ].map((b) => (
                  <li
                    key={b.vi}
                    className="flex items-start gap-2 text-foreground/80 font-normal leading-snug"
                  >
                    <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
                      <Check
                        className="w-2.5 h-2.5 text-emerald-600"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span>{t(b.vi, b.en)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => openLeadModal("standard")}
                  className="bg-gradient-to-r from-primary to-emerald-500 hover:opacity-95 text-primary-foreground shadow-lg shadow-primary/30 h-12 px-8 text-base"
                >
                  <Send className="w-4 h-4" />
                  {t("Đăng Ký Tư Vấn Ngay", "Get a Free Consultation")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-2 border-emerald-500/70 hover:bg-emerald-500/10 text-foreground"
                  asChild
                >
                  <a href="#packages">
                    {t("Xem gói dịch vụ", "View service packages")}
                  </a>
                </Button>
              </div>

              {/* Trust badges - 2 hàng (grid 2 cột) để luôn hiển thị đầy đủ */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] sm:text-xs font-semibold text-foreground/85">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    {t(
                      "An toàn thông tin luôn được ưu tiên",
                      "Information security is always prioritized",
                    )}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Database className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>
                    {t(
                      "Cam kết vận hành hiệu quả",
                      "Performance guaranteed in production",
                    )}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>
                    {t(
                      "Bàn giao nhanh sau 5-10 ngày triển khai",
                      "Fast delivery after 5-10 days of deployment",
                    )}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>
                    {t(
                      "Tận tâm với từng sản phẩm giáo dục",
                      "Crafted with care for every educator",
                    )}
                  </span>
                </span>
              </div>
            </motion.div>

            {/* RIGHT - Live demo carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative lg:col-span-6 lg:sticky lg:top-24"
            >
              <div className="relative">
                <DemoCarousel />
              </div>

              {/* Mini feature strip below carousel */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  {
                    icon: Bot,
                    label: { vi: "AI Tutor 24/7", en: "AI Tutor 24/7" },
                    color: "text-violet-600",
                    bg: "bg-violet-500/10",
                  },
                  {
                    icon: ClipboardList,
                    label: { vi: "Chấm bài tự động", en: "Auto Grading" },
                    color: "text-rose-600",
                    bg: "bg-rose-500/10",
                  },
                  {
                    icon: TrendingUp,
                    label: { vi: "Phân tích chuyên sâu", en: "Deep Analytics" },
                    color: "text-primary",
                    bg: "bg-primary/10",
                  },
                  {
                    icon: Mail,
                    label: { vi: "Báo cáo phụ huynh", en: "Parent Reports" },
                    color: "text-emerald-600",
                    bg: "bg-emerald-500/10",
                  },
                ].map((f) => (
                  <div
                    key={f.label.en}
                    className="rounded-xl border border-border/60 bg-card/70 backdrop-blur p-2.5 flex items-center gap-2 hover:border-primary/40 hover:shadow-md transition"
                  >
                    <div
                      className={`h-8 w-8 rounded-lg ${f.bg} flex items-center justify-center shrink-0`}
                    >
                      <f.icon className={`h-4 w-4 ${f.color}`} />
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-foreground leading-tight">
                      {t(f.label.vi, f.label.en)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              {
                k: "15+",
                v: {
                  vi: "năm kinh nghiệm giảng dạy tại Việt Nam",
                  en: "years of teaching experience in Vietnam",
                },
                icon: GraduationCap,
                grad: "from-primary/20 to-primary/0",
              },
              {
                k: "3+",
                v: {
                  vi: "năm kinh nghiệm về lập trình tại Phần Lan",
                  en: "years of software engineering experience in Finland",
                },
                icon: Database,
                grad: "from-emerald-500/20 to-emerald-500/0",
              },
              {
                k: "✦",
                v: {
                  vi: "Tâm huyết với các sản phẩm Sư phạm & Công nghệ",
                  en: "Passionate about pedagogy & technology products",
                },
                icon: Sparkles,
                grad: "from-violet-500/20 to-violet-500/0",
              },
            ].map((s) => (
              <div
                key={s.v.en}
                className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur p-5 text-center sm:text-left hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.grad} pointer-events-none`}
                />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/80 border border-border/60">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground leading-none">
                      {s.k}
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug mt-1.5">
                      {t(s.v.vi, s.v.en)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-founders Team - introduces the agency's 3 co-founders */}
      <CofoundersTeam lang={lang as "vi" | "en"} />

      {/* Core Features */}
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t("Các tính năng cốt lõi của Website", "Core Website Features")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Mỗi website được thiết kế riêng - không phải template - để phục vụ đúng chương trình giảng dạy của bạn.",
                "Every website is custom-built - not a template - to fit exactly the way you teach.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title.vi}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full relative overflow-hidden border-2 border-emerald-500/40 hover:border-emerald-500/80 bg-card shadow-md hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4 ring-1 ring-emerald-500/20`}
                    >
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {t(f.title.vi, f.title.en)}
                    </h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {t(f.desc.vi, f.desc.en)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served - who we build for */}

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <Users className="w-3.5 h-3.5" />{" "}
              {t("Đối tượng phục vụ", "Who we serve")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Giải pháp may đo cho từng quy mô giáo dục",
                "Tailored solutions for every education scale",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Dù Thầy/Cô đang dạy 1-1 hay vận hành cả hệ thống trường học, chúng tôi đều có giải pháp phù hợp.",
                "Whether you teach 1-on-1 or run an entire school system, we have the right solution for you.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: { vi: "Giáo viên tự do", en: "Independent Teacher" },
                desc: {
                  vi: "Lớp luyện thi cá nhân 1-1 hoặc nhóm nhỏ < 50 học viên, cần website chuyên nghiệp để xây thương hiệu cá nhân.",
                  en: "1-on-1 or small classes under 50 learners, needing a professional website to build a personal brand.",
                },
                color: "from-blue-500/15 to-blue-500/5",
                ic: "text-blue-600 bg-blue-500/10",
              },
              {
                icon: School,
                title: { vi: "Trung tâm ngoại ngữ", en: "Language Centers" },
                desc: {
                  vi: "50-500 học viên, cần LMS, AI Tutor, quản lý lớp & học phí tự động - thay thế Google Form + Zalo thủ công.",
                  en: "50-500 learners needing LMS, AI Tutor, automated class & tuition management - replacing manual Google Forms + Zalo.",
                },
                color: "from-emerald-500/15 to-emerald-500/5",
                ic: "text-emerald-600 bg-emerald-500/10",
              },
              {
                icon: Building2,
                title: {
                  vi: "Trường học & Học viện",
                  en: "Schools & Academies",
                },
                desc: {
                  vi: "500+ học viên, cần phân quyền đa cấp, cổng phụ huynh, BI dashboard & tích hợp hệ thống điểm danh nội bộ.",
                  en: "500+ learners needing multi-level roles, parent portal, BI dashboards and internal attendance integration.",
                },
                color: "from-violet-500/15 to-violet-500/5",
                ic: "text-violet-600 bg-violet-500/10",
              },
              {
                icon: Globe,
                title: { vi: "EdTech Startup", en: "EdTech Startups" },
                desc: {
                  vi: "Đang xây sản phẩm SaaS giáo dục, cần MVP nhanh trong 14 ngày với hạ tầng AI/Data sẵn sàng mở rộng.",
                  en: "Building an EdTech SaaS - needing a fast 14-day MVP with scalable AI/Data infrastructure.",
                },
                color: "from-amber-500/15 to-amber-500/5",
                ic: "text-amber-600 bg-amber-500/10",
              },
            ].map((it, i) => (
              <motion.div
                key={it.title.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card
                  className={`h-full bg-gradient-to-br ${it.color} border-2 border-emerald-500/50 hover:border-emerald-500/80 transition-colors`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${it.ic} flex items-center justify-center mb-4`}
                    >
                      <it.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                      {t(it.title.vi, it.title.en)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(it.desc.vi, it.desc.en)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Security - credibility through transparent technology */}
      <section className="py-14 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <Cpu className="w-3.5 h-3.5" />{" "}
              {t("Công nghệ & Bảo mật", "Technology & Security")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Cùng kiến trúc với các sản phẩm Đại học Top Châu Âu",
                "Built on the same stack as top European University products",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Website của Thầy/Cô được xây trên đúng bộ công nghệ mà các startup EdTech Bắc Âu đang sử dụng - nhanh, bảo mật, dễ mở rộng.",
                "Your website runs on the same stack Nordic EdTech startups use today - fast, secure and easy to scale.",
              )}
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Code2,
                title: { vi: "Frontend hiện đại", en: "Modern Frontend" },
                items: {
                  vi: [
                    "React 18 + Vite (tải dưới 1 giây)",
                    "TailwindCSS - giao diện đồng nhất",
                    "Framer Motion - chuyển động mượt",
                    "Responsive 100% mobile & tablet",
                  ],
                  en: [
                    "React 18 + Vite (loads in under 1 second)",
                    "TailwindCSS - consistent UI system",
                    "Framer Motion - smooth animations",
                    "100% responsive on mobile & tablet",
                  ],
                },
                color: "from-blue-500/20 to-transparent",
                ic: "text-blue-600 bg-blue-500/10",
              },
              {
                icon: Database,
                title: { vi: "Backend & Dữ liệu", en: "Backend & Data" },
                items: {
                  vi: [
                    "Postgres + Row-Level Security",
                    "Edge Functions phục vụ toàn cầu",
                    "Realtime sync điểm số & chat",
                    "Backup tự động hằng ngày",
                  ],
                  en: [
                    "Postgres + Row-Level Security",
                    "Globally distributed Edge Functions",
                    "Realtime sync for scores & chat",
                    "Daily automated backups",
                  ],
                },
                color: "from-emerald-500/20 to-transparent",
                ic: "text-emerald-600 bg-emerald-500/10",
              },
              {
                icon: Bot,
                title: { vi: "AI & Tự động hoá", en: "AI & Automation" },
                items: {
                  vi: [
                    "Perplexity Sonar Pro / GPT-5 / Gemini 2.5",
                    "Pyodide chạy Python ngay trên trình duyệt",
                    "Web Speech API cho luyện nói",
                    "AI Smart Grading cho Writing/Speaking",
                  ],
                  en: [
                    "Perplexity Sonar Pro / GPT-5 / Gemini 2.5",
                    "Pyodide runs Python right in the browser",
                    "Web Speech API for speaking practice",
                    "AI Smart Grading for Writing/Speaking",
                  ],
                },
                color: "from-violet-500/20 to-transparent",
                ic: "text-violet-600 bg-violet-500/10",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={`h-full bg-gradient-to-br ${s.color} border-2 border-emerald-500/50 hover:border-emerald-500/80 transition-colors`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl ${s.ic} flex items-center justify-center mb-4`}
                    >
                      <s.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {t(s.title.vi, s.title.en)}
                    </h3>
                    <ul className="space-y-2">
                      {(lang === "vi" ? s.items.vi : s.items.en).map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{" "}
                          {it}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 max-w-4xl mx-auto rounded-2xl border-2 border-emerald-500/50 bg-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">
                {t(
                  "Cam kết bảo mật cấp Doanh nghiệp",
                  "Enterprise-grade Security Commitment",
                )}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "SSL/TLS 1.3 mặc định · Row-Level Security theo tài khoản · Audit log mọi truy cập admin · Tuân thủ Luật An ninh mạng Việt Nam & nguyên tắc GDPR. Dữ liệu đặt tại data center Singapore / Frankfurt theo lựa chọn của Thầy/Cô.",
                  "SSL/TLS 1.3 by default · Per-account Row-Level Security · Full audit log of admin access · Compliant with Vietnam Cybersecurity Law & GDPR principles. Data hosted in Singapore or Frankfurt data centers at your choice.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portfolio / Demo Showcase */}
      <PortfolioShowcase />

      {/* Measurable Results - concrete numbers build trust */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <BarChart3 className="w-3.5 h-3.5" />{" "}
              {t("Kết quả đo lường được", "Measurable Results")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Hiệu quả thực tế sau khi triển khai",
                "Real-world impact after deployment",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Dữ liệu trung bình ghi nhận từ các lớp học của Thầy Hải & các giáo viên đã sử dụng nền tảng HaiEduTech.",
                "Average data recorded from Mr. Hai's classes and teachers using the HaiEduTech platform.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                k: "-85%",
                v: {
                  vi: "thời gian chấm bài thủ công",
                  en: "less manual grading time",
                },
                c: "from-primary to-blue-400",
              },
              {
                k: "+42%",
                v: {
                  vi: "tỉ lệ học viên hoàn thành khóa",
                  en: "higher course completion rate",
                },
                c: "from-emerald-500 to-teal-400",
              },
              {
                k: "+3.1×",
                v: {
                  vi: "lượt tương tác ngoài giờ học (AI Tutor)",
                  en: "after-hours engagement (AI Tutor)",
                },
                c: "from-violet-500 to-fuchsia-400",
              },
              {
                k: "92%",
                v: {
                  vi: "phụ huynh đánh giá hài lòng",
                  en: "satisfied parents",
                },
                c: "from-amber-500 to-orange-400",
              },
            ].map((s) => (
              <div
                key={s.v.en}
                className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}
                >
                  {s.k}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
                  {t(s.v.vi, s.v.en)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process - transparent 5-step delivery flow */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <ClipboardList className="w-3.5 h-3.5" />{" "}
              {t("Quy trình minh bạch", "Transparent Process")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Lộ trình 5 bước · Bàn giao trong 7-14 ngày",
                "5-step roadmap · Delivered in 7-14 days",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Cam kết tiến độ rõ ràng. Quý Thầy/Cô được duyệt từng giai đoạn trước khi sang bước kế tiếp.",
                "Clear milestones. You approve each stage before we move to the next.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              {
                n: 1,
                t: { vi: "Tư vấn miễn phí", en: "Free Consultation" },
                d: {
                  vi: "Phỏng vấn 30 phút để hiểu lớp học & mục tiêu giảng dạy.",
                  en: "A 30-minute interview to understand your classes & teaching goals.",
                },
                icon: MessageCircle,
              },
              {
                n: 2,
                t: { vi: "Thiết kế UI/UX", en: "UI/UX Design" },
                d: {
                  vi: "Wireframe + mockup được duyệt trước khi viết code.",
                  en: "Wireframes + mockups approved before any code is written.",
                },
                icon: LayoutDashboard,
              },
              {
                n: 3,
                t: { vi: "Phát triển LMS", en: "LMS Development" },
                d: {
                  vi: "Xây dựng frontend + backend bảo mật, kiểm thử nội bộ.",
                  en: "Build secure frontend + backend, with internal QA.",
                },
                icon: Database,
              },
              {
                n: 4,
                t: {
                  vi: "Tích hợp AI & Domain",
                  en: "AI & Domain Integration",
                },
                d: {
                  vi: "Huấn luyện AI theo tài liệu riêng, cấu hình tên miền + email.",
                  en: "Train the AI on your materials, configure the domain + email.",
                },
                icon: Bot,
              },
              {
                n: 5,
                t: { vi: "Nghiệm thu & Đào tạo", en: "Handover & Training" },
                d: {
                  vi: "Bàn giao mã nguồn, video hướng dẫn quản trị 1-1.",
                  en: "Source code handover and 1-on-1 admin training videos.",
                },
                icon: GraduationCap,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-lg transition"
              >
                <div className="absolute -top-3 -left-3 w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground font-bold flex items-center justify-center shadow-md">
                  {step.n}
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 ml-auto">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">
                  {t(step.t.vi, step.t.en)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(step.d.vi, step.d.en)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - social proof from teachers */}
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />{" "}
              {t("Phản hồi từ giáo viên", "Teacher Feedback")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Các thầy cô nói gì về website do HaiEduTech xây dựng",
                "What teachers say about websites built by HaiEduTech",
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                name: "Cô Mai Anh",
                role: {
                  vi: "Giáo viên IELTS · Hà Nội",
                  en: "IELTS Teacher · Hanoi",
                },
                avatar: "MA",
                quote: {
                  vi: "Trước đây tôi mất gần 12 tiếng mỗi tuần để chấm Writing. Sau khi dùng AI Smart Grading của Thầy Hải, thời gian rút xuống còn 2 tiếng và học viên nhận feedback gần như tức thì.",
                  en: "I used to spend almost 12 hours a week grading Writing. After using Mr. Hai's AI Smart Grading, it dropped to just 2 hours and students get near-instant feedback.",
                },
                color: "from-primary to-blue-400",
              },
              {
                name: "Thầy Quốc Bảo",
                role: {
                  vi: "Chủ trung tâm tiếng Trung · TP.HCM",
                  en: "Chinese Center Owner · HCMC",
                },
                avatar: "QB",
                quote: {
                  vi: "Website chạy mượt cả trên điện thoại học viên cấp 2. Phụ huynh đặc biệt thích cổng xem điểm thời gian thực - đây là điểm khác biệt giúp trung tâm tôi tăng 30% học viên đăng ký mới.",
                  en: "The website runs smoothly even on middle-school students' phones. Parents love the real-time grade portal - this differentiator drove a 30% increase in new enrollments.",
                },
                color: "from-emerald-500 to-teal-400",
              },
              {
                name: "Cô Hồng Nhung",
                role: {
                  vi: "Giáo viên Hóa học THPT",
                  en: "High School Chemistry Teacher",
                },
                avatar: "HN",
                quote: {
                  vi: "Tôi không rành công nghệ nhưng video hướng dẫn quản trị 1-1 của Thầy Hải rất chi tiết. Sau 2 ngày là tôi tự đăng bài giảng và bài tập trắc nghiệm được rồi.",
                  en: "I'm not tech-savvy, but Mr. Hai's 1-on-1 admin training videos are very detailed. Within 2 days I was uploading lessons and quizzes on my own.",
                },
                color: "from-violet-500 to-fuchsia-400",
              },
            ].map((tm) => (
              <Card
                key={tm.name}
                className="h-full border-border/70 hover:shadow-xl transition"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-3 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1 italic">
                    “{t(tm.quote.vi, tm.quote.en)}”
                  </p>
                  <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${tm.color} text-white font-bold flex items-center justify-center shrink-0`}
                    >
                      {tm.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {tm.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(tm.role.vi, tm.role.en)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Technology - brand depth + engineering credibility */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" />
              {t("Quy trình & Công nghệ", "Process & Technology")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Sản phẩm vững chắc - xây bằng quy trình kỹ sư phần mềm chuẩn quốc tế",
                "Robust products - built with international-grade engineering practices",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              {t(
                "HaiEduTech không chỉ là một website. Đây là một sản phẩm phần mềm giáo dục được thiết kế, kiểm thử và vận hành theo đúng chuẩn của các công ty công nghệ hàng đầu - giúp Thầy/Cô yên tâm phục vụ học viên lâu dài.",
                "HaiEduTech is not just a website. It is an EdTech software product designed, tested and operated to the standards of top tech companies - so you can confidently serve your learners for the long run.",
              )}
            </p>
          </div>

          {/* 6-step development process */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-6 text-center">
              {t("Quy trình triển khai 6 bước minh bạch", "Our transparent 6-step delivery process")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  step: "01",
                  icon: MessageCircle,
                  title: { vi: "Lắng nghe & Tư vấn", en: "Discovery & Consulting" },
                  desc: {
                    vi: "Phỏng vấn 1-1 với Thầy/Cô để hiểu rõ mục tiêu giảng dạy, đối tượng học viên và quy trình vận hành hiện tại.",
                    en: "1-1 interview to deeply understand your teaching goals, learners and current operations.",
                  },
                  color: "from-sky-500 to-blue-600",
                },
                {
                  step: "02",
                  icon: LayoutDashboard,
                  title: { vi: "Thiết kế UX/UI & Wireframe", en: "UX/UI Design & Wireframes" },
                  desc: {
                    vi: "Thiết kế trên Figma, duyệt từng màn hình với Thầy/Cô trước khi viết bất kỳ dòng code nào - không phát sinh chi phí ẩn.",
                    en: "Figma-based design, screen-by-screen approval before any code is written - zero hidden costs.",
                  },
                  color: "from-violet-500 to-fuchsia-600",
                },
                {
                  step: "03",
                  icon: Code2,
                  title: { vi: "Phát triển Agile 2 tuần / sprint", en: "Agile Development - 2-week sprints" },
                  desc: {
                    vi: "Mỗi sprint bàn giao bản demo có thể dùng thật, Thầy/Cô góp ý liên tục - đảm bảo sản phẩm cuối đúng kỳ vọng.",
                    en: "Each sprint delivers a usable demo; you give continuous feedback - guaranteeing the final product matches your vision.",
                  },
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  step: "04",
                  icon: ShieldCheck,
                  title: { vi: "Kiểm thử & Bảo mật", en: "Testing & Security Audit" },
                  desc: {
                    vi: "Unit test, E2E test, kiểm tra OWASP Top 10, pen-test cơ bản và audit hiệu năng PageSpeed trước khi go-live.",
                    en: "Unit tests, E2E tests, OWASP Top 10 review, basic pen-testing and PageSpeed audit before go-live.",
                  },
                  color: "from-amber-500 to-orange-600",
                },
                {
                  step: "05",
                  icon: Rocket,
                  title: { vi: "Triển khai & Đào tạo", en: "Deployment & Training" },
                  desc: {
                    vi: "Cài đặt domain, SSL, email subdomain. Tặng kèm bộ video hướng dẫn quản trị + 2 buổi đào tạo trực tuyến 1-1.",
                    en: "Domain, SSL and email subdomain setup. Includes admin training videos + 2 live 1-1 onboarding sessions.",
                  },
                  color: "from-rose-500 to-pink-600",
                },
                {
                  step: "06",
                  icon: Activity,
                  title: { vi: "Vận hành & Tối ưu liên tục", en: "Operate & Continuously Optimize" },
                  desc: {
                    vi: "Giám sát uptime 24/7, sao lưu hằng ngày, báo cáo hiệu năng hằng tháng và cập nhật tính năng theo phản hồi thật.",
                    en: "24/7 uptime monitoring, daily backups, monthly performance reports and feature updates from real feedback.",
                  },
                  color: "from-indigo-500 to-primary",
                },
              ].map((p) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-border bg-card p-5 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-md`}>
                      <p.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold text-muted-foreground tracking-wider">
                          {p.step}
                        </span>
                        <span className="h-px flex-1 bg-border" />
                      </div>
                      <h4 className="font-display font-bold text-foreground text-base mb-1">
                        {t(p.title.vi, p.title.en)}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(p.desc.vi, p.desc.en)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2 text-center">
              {t("Tech Stack chuẩn doanh nghiệp", "Enterprise-grade Tech Stack")}
            </h3>
            <p className="text-center text-sm text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t(
                "Cùng bộ công nghệ mà Netflix, Airbnb, Notion và OpenAI đang sử dụng - đảm bảo hiệu năng, khả năng mở rộng và bảo trì dài hạn.",
                "The same technology stack trusted by Netflix, Airbnb, Notion and OpenAI - ensuring performance, scalability and long-term maintainability.",
              )}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { name: "React 18 + TypeScript", role: { vi: "Frontend", en: "Frontend" }, icon: Code2, color: "text-sky-600 bg-sky-500/10" },
                { name: "Tailwind CSS + shadcn/ui", role: { vi: "Design System", en: "Design System" }, icon: Sparkles, color: "text-cyan-600 bg-cyan-500/10" },
                { name: "Vite 5", role: { vi: "Build & HMR", en: "Build & HMR" }, icon: Zap, color: "text-amber-600 bg-amber-500/10" },
                { name: "Supabase (PostgreSQL)", role: { vi: "Database + Auth", en: "Database + Auth" }, icon: Database, color: "text-emerald-600 bg-emerald-500/10" },
                { name: "Edge Functions (Deno)", role: { vi: "Serverless API", en: "Serverless API" }, icon: Cloud, color: "text-violet-600 bg-violet-500/10" },
                { name: "Perplexity / OpenAI / Gemini", role: { vi: "AI Layer", en: "AI Layer" }, icon: Brain, color: "text-fuchsia-600 bg-fuchsia-500/10" },
                { name: "Row-Level Security + RLS", role: { vi: "Bảo mật dữ liệu", en: "Data Security" }, icon: Lock, color: "text-rose-600 bg-rose-500/10" },
                { name: "Vercel / Cloudflare CDN", role: { vi: "Hạ tầng toàn cầu", en: "Global Infrastructure" }, icon: Globe, color: "text-indigo-600 bg-indigo-500/10" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-md transition-all"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${tech.color}`}>
                    <tech.icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="font-bold text-sm text-foreground leading-tight">{tech.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(tech.role.vi, tech.role.en)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering principles - brand depth */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-6 text-center">
              {t("Triết lý kỹ thuật của HaiEduTech", "Our Engineering Principles")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Gauge,
                  title: { vi: "Hiệu năng đặt lên hàng đầu", en: "Performance-first" },
                  desc: {
                    vi: "PageSpeed 90+ trên cả mobile và desktop. Lazy-loading, code-splitting và CDN toàn cầu giúp trang tải dưới 2 giây ngay cả với 3G.",
                    en: "PageSpeed 90+ on mobile and desktop. Lazy-loading, code-splitting and a global CDN keep load times under 2s even on 3G.",
                  },
                  color: "from-amber-500 to-orange-600",
                },
                {
                  icon: ShieldCheck,
                  title: { vi: "Bảo mật từ thiết kế", en: "Security by design" },
                  desc: {
                    vi: "RLS theo từng dòng dữ liệu, mã hoá end-to-end cho dữ liệu nhạy cảm, sao lưu hằng ngày và tuân thủ Luật An ninh mạng Việt Nam.",
                    en: "Row-level security on every record, end-to-end encryption for sensitive data, daily backups and Vietnam cybersecurity-law compliance.",
                  },
                  color: "from-rose-500 to-red-600",
                },
                {
                  icon: TrendingUp,
                  title: { vi: "Mở rộng không giới hạn", en: "Scales without limits" },
                  desc: {
                    vi: "Kiến trúc serverless tự động mở rộng từ 10 đến 100,000 học viên mà không cần viết lại hệ thống - tiết kiệm chi phí dài hạn.",
                    en: "Serverless architecture auto-scales from 10 to 100,000 learners with zero rewrites - saving costs for the long run.",
                  },
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  icon: Users,
                  title: { vi: "Lấy người dùng làm trung tâm", en: "User-centered design" },
                  desc: {
                    vi: "Mọi tính năng đều được thử nghiệm với học viên thật, đo lường tỉ lệ hoàn thành và tinh chỉnh dựa trên dữ liệu thực tế.",
                    en: "Every feature is tested with real learners, completion rates are measured, and refinements are driven by actual data.",
                  },
                  color: "from-violet-500 to-fuchsia-600",
                },
                {
                  icon: FileText,
                  title: { vi: "Mã nguồn rõ ràng & tài liệu đầy đủ", en: "Clean code & full documentation" },
                  desc: {
                    vi: "Mỗi dự án bàn giao đi kèm tài liệu kiến trúc, sơ đồ ERD, hướng dẫn vận hành và video đào tạo - quý Thầy/Cô không bao giờ bị phụ thuộc.",
                    en: "Every project ships with architecture docs, ERD diagrams, ops manuals and training videos - you are never locked in.",
                  },
                  color: "from-sky-500 to-blue-600",
                },
                {
                  icon: Award,
                  title: { vi: "Cam kết chất lượng giáo dục", en: "Committed to educational quality" },
                  desc: {
                    vi: "Đội ngũ founder là thạc sĩ giáo dục & kỹ sư phần mềm - hiểu cả lớp học lẫn công nghệ, đảm bảo sản phẩm phục vụ đúng nhu cầu giảng dạy thực tế.",
                    en: "Our founders hold Master's degrees in education and software engineering - bridging the classroom and technology so the product truly serves teaching.",
                  },
                  color: "from-primary to-emerald-500",
                },
              ].map((pr) => (
                <motion.div
                  key={pr.title.en}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border bg-card p-5 hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pr.color} text-white flex items-center justify-center mb-3 shadow-md`}>
                    <pr.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-foreground text-base mb-1.5">
                    {t(pr.title.vi, pr.title.en)}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(pr.desc.vi, pr.desc.en)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee - risk reversal to remove final objections */}
      <section className="py-12 sm:py-16">

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-card to-primary/5 p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 text-center">
                <div className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-primary text-white items-center justify-center shadow-lg shadow-emerald-500/30">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {t("Cam kết HaiEduTech", "HaiEduTech Commitment")}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                  {t(
                    "Đồng hành tận tâm - bàn giao chuẩn chỉnh, hỗ trợ dài hạn cùng quý Thầy/Cô",
                    "Dedicated partnership - clean handover and long-term support for every teacher",
                  )}
                </h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>
                      {t(
                        "Bàn giao 100% mã nguồn - quý Thầy/Cô sở hữu vĩnh viễn, không khoá vendor.",
                        "Full source-code handover - you own it forever, no vendor lock-in.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>
                      {t(
                        "Bảo hành sửa lỗi miễn phí 6 tháng sau bàn giao.",
                        "Free 6-month bug-fix warranty after handover.",
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>
                      {t(
                        "Hợp đồng rõ ràng, xuất hoá đơn VAT, thanh toán theo 2 đợt (50/50).",
                        "Clear contract, VAT invoices, 50/50 two-stage payment.",
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="packages" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t("Bảng giá & Các gói dịch vụ", "Pricing & Service Packages")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Giá niêm yết minh bạch. Báo giá cuối cùng sẽ được điều chỉnh theo phạm vi và số lượng tính năng tuỳ biến thực tế của quý Thầy/Cô.",
                "Transparent list prices. Your final quote is adjusted to the actual scope and custom features you need.",
              )}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />{" "}
              {t(
                "Ưu đãi ra mắt: giảm 15% cho 10 giáo viên đầu tiên",
                "Launch offer: 15% off for the first 10 teachers",
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {PACKAGES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={
                  p.highlight
                    ? "relative rounded-2xl p-[2px] bg-gradient-to-br from-primary via-emerald-500 to-primary shadow-2xl shadow-primary/20 lg:-translate-y-2"
                    : "relative"
                }
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-xs font-bold px-3 py-1 shadow-md">
                    <Crown className="w-3 h-3" />{" "}
                    {t("Khuyên dùng", "Recommended")}
                  </div>
                )}
                <Card
                  className={`h-full flex flex-col ${p.highlight ? "bg-card" : ""}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          p.highlight
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {t(p.name.vi, p.name.en)}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {t(p.tagline.vi, p.tagline.en)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p
                        className={`text-2xl sm:text-3xl font-extrabold ${
                          p.highlight
                            ? "bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent"
                            : "text-foreground"
                        }`}
                      >
                        {t(p.priceFrom.vi, p.priceFrom.en)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(p.priceNote.vi, p.priceNote.en)}
                      </p>
                      <p className="text-xs text-foreground/80 mt-1 font-medium">
                        {t(p.monthly.vi, p.monthly.en)}
                      </p>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground italic">
                      {t(p.bestFor.vi, p.bestFor.en)}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {p.features.map((feat) => (
                        <li
                          key={feat.vi}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? "text-emerald-500" : "text-primary"}`}
                          />
                          <span>{t(feat.vi, feat.en)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        update("selected_package", p.id);
                        scrollToForm();
                      }}
                      className={`w-full mt-6 h-11 ${
                        p.highlight
                          ? "bg-gradient-to-r from-primary to-emerald-500 hover:opacity-95 text-primary-foreground"
                          : ""
                      }`}
                      variant={p.highlight ? "default" : "outline"}
                    >
                      {t(`Chọn ${p.name.vi}`, `Choose ${p.name.en}`)}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Feature comparison matrix between the two packages */}
          <ComparisonTable />
        </div>
      </section>

      {/* Pain Points → Solutions - speak directly to teacher's daily struggles */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50/40 via-background to-emerald-50/40 dark:from-rose-950/10 dark:to-emerald-950/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/5 px-3 py-1 text-xs font-semibold text-rose-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" />{" "}
              {t("Thấu hiểu giáo viên Việt", "Built for Vietnamese teachers")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Những nỗi đau giáo viên thường gặp - HaiEduTech giải quyết tận gốc",
                "The pain points teachers face - HaiEduTech solves them at the root",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Mỗi tính năng đều xuất phát từ chính trải nghiệm 15 năm đứng lớp của Thầy Hải.",
                "Every feature comes from Mr. Hai's own 15 years of classroom experience.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              {
                pain: {
                  vi: "Mất 8-12 giờ/tuần chấm bài Writing, Speaking thủ công",
                  en: "Losing 8-12 hours/week manually grading Writing & Speaking",
                },
                fix: {
                  vi: "AI Smart Grading chấm tự động theo rubric IELTS/TOEIC/HSK - feedback chi tiết trong 10 giây.",
                  en: "AI Smart Grading auto-scores against IELTS/TOEIC/HSK rubrics - detailed feedback in 10 seconds.",
                },
              },
              {
                pain: {
                  vi: "Học sinh quên bài, không ôn tập, mất gốc giữa khoá",
                  en: "Students forget lessons, stop reviewing, fall behind mid-course",
                },
                fix: {
                  vi: "Hệ thống SRS + AI Tutor 24/7 nhắc ôn từ vựng và giải đáp thắc mắc ngoài giờ học.",
                  en: "An SRS system + 24/7 AI Tutor prompts vocab review and answers questions after class.",
                },
              },
              {
                pain: {
                  vi: "Phụ huynh thiếu tin tưởng vì không nắm được tiến độ con",
                  en: "Parents lose trust because they can't see their child's progress",
                },
                fix: {
                  vi: "Báo cáo phụ huynh tự động hàng tháng qua email thương hiệu - tỉ lệ tái đăng ký +42%.",
                  en: "Automated monthly parent reports from your branded email - re-enrollment +42%.",
                },
              },
              {
                pain: {
                  vi: "Tài liệu giảng dạy bị copy, share lậu trên Zalo / Drive",
                  en: "Teaching materials get copied and shared illegally on Zalo / Drive",
                },
                fix: {
                  vi: "DRM video + watermark động theo từng học viên + chống tải xuống bằng JS obfuscation.",
                  en: "DRM video + per-student dynamic watermarks + anti-download via JS obfuscation.",
                },
              },
              {
                pain: {
                  vi: "Quản lý lịch học, học phí, hoá đơn rối loạn trên Excel",
                  en: "Schedules, tuition and invoices are a mess in Excel",
                },
                fix: {
                  vi: "Dashboard tích hợp VNPay/Momo, tự động đối soát và xuất hoá đơn VAT điện tử.",
                  en: "A dashboard with VNPay/Momo, auto reconciliation and electronic VAT invoices.",
                },
              },
              {
                pain: {
                  vi: "Phụ thuộc nền tảng Facebook/Zalo - mất học viên khi bị khoá",
                  en: "Dependent on Facebook/Zalo - risk losing students if the account is locked",
                },
                fix: {
                  vi: "Có domain & thương hiệu riêng (lop-thay-hai.com) - dữ liệu học viên 100% thuộc về Thầy/Cô.",
                  en: "Your own domain & brand (lop-thay-hai.com) - student data is 100% yours.",
                },
              },
            ].map((p) => (
              <div
                key={p.pain.vi}
                className="group rounded-2xl border-2 border-emerald-500/30 bg-card p-5 sm:p-6 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10 transition-all"
              >
                <div className="flex items-start gap-3 mb-3 pb-3 border-b border-dashed border-rose-300/50">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 font-bold text-sm">
                    !
                  </span>
                  <p className="text-sm sm:text-[15px] font-semibold text-foreground/90 leading-snug">
                    {t(p.pain.vi, p.pain.en)}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <p className="text-sm sm:text-[15px] text-foreground leading-relaxed">
                    <span className="font-bold text-emerald-700">
                      {t("Giải pháp:", "Solution:")}{" "}
                    </span>
                    {t(p.fix.vi, p.fix.en)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees - Build trust before FAQ */}
      <section className="py-14 sm:py-18">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />{" "}
              {t("5 Cam Kết Vàng", "5 Golden Commitments")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t(
                "Tận tâm với từng sản phẩm giáo dục & công nghệ",
                "Crafted with care for every educational & tech product",
              )}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Không hứa suông - mỗi cam kết đều được ghi rõ trong hợp đồng.",
                "No empty promises - every commitment is written into the contract.",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                t: { vi: "Hoàn tiền 100%", en: "100% Refund" },
                d: {
                  vi: "Trong 7 ngày nếu bản demo không đạt yêu cầu.",
                  en: "Within 7 days if the demo doesn't meet expectations.",
                },
              },
              {
                icon: Database,
                t: { vi: "Bàn giao mã nguồn", en: "Source Code Handover" },
                d: {
                  vi: "100% code + database thuộc sở hữu Thầy/Cô.",
                  en: "100% of the code + database belongs to you.",
                },
              },
              {
                icon: Clock,
                t: { vi: "Bảo hành 6 tháng", en: "6-Month Warranty" },
                d: {
                  vi: "Sửa lỗi miễn phí, hỗ trợ ưu tiên qua Zalo.",
                  en: "Free bug fixes and priority Zalo support.",
                },
              },
              {
                icon: FileText,
                t: { vi: "NDA bảo mật", en: "NDA Confidentiality" },
                d: {
                  vi: "Ký cam kết không tiết lộ dữ liệu lớp học.",
                  en: "Signed agreement not to disclose any class data.",
                },
              },
              {
                icon: Bot,
                t: { vi: "Hỗ trợ trọn đời", en: "Lifetime Support" },
                d: {
                  vi: "Cộng đồng giáo viên HaiEduTech miễn phí vĩnh viễn.",
                  en: "Free lifetime access to the HaiEduTech teachers' community.",
                },
              },
            ].map((g) => (
              <div
                key={g.t.en}
                className="rounded-2xl border-2 border-emerald-500/40 bg-card p-5 text-center hover:border-emerald-500/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/15 transition-all"
              >
                <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-primary/20 items-center justify-center mb-3">
                  <g.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                  {t(g.t.vi, g.t.en)}
                </h4>
                <p className="text-xs text-muted-foreground leading-snug">
                  {t(g.d.vi, g.d.en)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - expandable accordion */}
      <FaqSection />

      {/* Why us strip */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                t: { vi: "Bảo mật chuẩn EU", en: "EU-grade Security" },
                d: {
                  vi: "Hạ tầng cloud hiện đại, RLS & sao lưu tự động.",
                  en: "Modern cloud infrastructure with RLS and automated backups.",
                },
              },
              {
                icon: Zap,
                t: { vi: "Bàn giao nhanh", en: "Fast Delivery" },
                d: {
                  vi: "MVP có thể chạy trong 2-4 tuần tùy phạm vi.",
                  en: "Working MVP in 2-4 weeks depending on scope.",
                },
              },
              {
                icon: Database,
                t: { vi: "Sở hữu dữ liệu", en: "Data Ownership" },
                d: {
                  vi: "Toàn bộ dữ liệu lớp học thuộc về quý Thầy/Cô.",
                  en: "All class data fully belongs to you.",
                },
              },
            ].map((x) => (
              <div key={x.t.en} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <x.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {t(x.t.vi, x.t.en)}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t(x.d.vi, x.d.en)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section id="consultation-form" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                {t("Đăng ký tư vấn miễn phí", "Get a Free Consultation")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t(
                  "Điền thông tin bên dưới, Thầy Hải sẽ liên hệ tư vấn lộ trình & báo giá phù hợp trong vòng 24 giờ.",
                  "Fill in the form below and Mr. Hai will reach out with a tailored roadmap & quote within 24 hours.",
                )}
              </p>
            </div>
            <Card className="border-border/70 shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher_name">
                        {t("Họ và tên *", "Full name *")}
                      </Label>
                      <Input
                        id="teacher_name"
                        required
                        placeholder={t("Nguyễn Văn A", "Jane Doe")}
                        value={form.teacher_name}
                        onChange={(e) => update("teacher_name", e.target.value)}
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="teacher@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={255}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {t("Số điện thoại *", "Phone number *")}
                      </Label>
                      <Input
                        id="phone"
                        required
                        placeholder="09xx xxx xxx"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        maxLength={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject_taught">
                        {t(
                          "Môn / Lĩnh vực giảng dạy",
                          "Subject / teaching area",
                        )}
                      </Label>
                      <Input
                        id="subject_taught"
                        placeholder={t(
                          "Tiếng Anh, Toán, Hóa...",
                          "English, Math, Chemistry...",
                        )}
                        value={form.subject_taught}
                        onChange={(e) =>
                          update("subject_taught", e.target.value)
                        }
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selected_package">
                      {t("Gói dịch vụ quan tâm *", "Package of interest *")}
                    </Label>
                    <Select
                      value={form.selected_package}
                      onValueChange={(v) =>
                        update(
                          "selected_package",
                          v as FormState["selected_package"],
                        )
                      }
                    >
                      <SelectTrigger id="selected_package">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          {t(
                            "Gói Standard (Liên hệ báo giá)",
                            "Standard Package (Contact for quote)",
                          )}
                        </SelectItem>
                        <SelectItem value="advanced">
                          {t(
                            "Gói Advanced AI & Data (Liên hệ báo giá)",
                            "Advanced AI & Data Package (Contact for quote)",
                          )}
                        </SelectItem>
                        <SelectItem value="enterprise">
                          {t(
                            "Gói Enterprise (Liên hệ báo giá)",
                            "Enterprise Package (Contact for quote)",
                          )}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special_requirements">
                      {t(
                        "Yêu cầu đặc biệt (tùy chọn)",
                        "Special requirements (optional)",
                      )}
                    </Label>
                    <Textarea
                      id="special_requirements"
                      placeholder={t(
                        "Mô tả ngắn về lớp học, số học viên, tính năng mong muốn...",
                        "Briefly describe your class, number of learners, desired features...",
                      )}
                      rows={5}
                      value={form.special_requirements}
                      onChange={(e) =>
                        update("special_requirements", e.target.value)
                      }
                      maxLength={1500}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-gradient-to-r from-primary to-emerald-500 hover:opacity-95 text-primary-foreground text-base font-semibold"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />{" "}
                        {t("Đang gửi...", "Sending...")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />{" "}
                        {t("Gửi Yêu Cầu Đặt Hàng", "Submit Request")}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {t(
                      "Bằng việc gửi yêu cầu, quý Thầy/Cô đồng ý cho HaiEduTech liên hệ tư vấn qua email & điện thoại.",
                      "By submitting, you agree that HaiEduTech may contact you for consultation via email & phone.",
                    )}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <AgencyLeadModal
        open={leadModalOpen}
        onOpenChange={setLeadModalOpen}
        lang={lang as "vi" | "en"}
        defaultPackage={leadModalPackage}
      />

      <Footer />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Interactive Portfolio Showcase */
/* -------------------------------------------------------------------------- */

// Mock learning-progress series for the analytics dashboard tab
const PROGRESS_SERIES = [
  { day: "T2", students: 42, lessons: 18 },
  { day: "T3", students: 51, lessons: 22 },
  { day: "T4", students: 47, lessons: 25 },
  { day: "T5", students: 63, lessons: 31 },
  { day: "T6", students: 70, lessons: 36 },
  { day: "T7", students: 88, lessons: 42 },
  { day: "CN", students: 74, lessons: 39 },
];

// LMS app mockup - responsive layout (sidebar collapses on mobile, AI tutor inline)
const LmsMockup = () => {
  const menu = ["Khóa học", "Bài tập", "Lịch học", "Điểm số", "Cộng đồng"];
  const stats = [
    { l: "Tiến độ", v: "72%", c: "from-primary to-blue-400" },
    { l: "Đã làm", v: "9/12", c: "from-emerald-500 to-teal-400" },
    { l: "Điểm TB", v: "8.4", c: "from-amber-500 to-orange-400" },
  ];
  return (
    <div className="w-full rounded-3xl border border-border bg-gradient-to-br from-sky-50 via-white to-emerald-50 shadow-2xl overflow-hidden">
      {/* Top browser-style bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/80 border-b border-border backdrop-blur">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        <div className="ml-3 flex-1 max-w-md mx-auto rounded-md bg-secondary/60 px-3 py-1 text-[11px] text-muted-foreground text-center truncate">
          🔒 lop-thay-hai.haiedutech.com
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - light gradient */}
        <aside className="w-full md:w-52 lg:w-60 shrink-0 bg-gradient-to-b from-primary/95 to-emerald-500/90 text-white p-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">
              EduClass · Thầy Hải
            </span>
          </div>
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {menu.map((m, i) => (
              <div
                key={m}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-white text-primary shadow"
                    : "bg-white/10 text-white/90 hover:bg-white/20"
                }`}
              >
                {m}
              </div>
            ))}
          </div>
          <div className="hidden md:block mt-6 rounded-xl bg-white/15 backdrop-blur p-3 text-xs">
            <div className="font-semibold mb-1">🔥 Chuỗi học</div>
            <div className="text-white/90">12 ngày liên tiếp</div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 space-y-4">
          {/* Vivid video player */}
          <div className="aspect-video w-full rounded-2xl relative overflow-hidden shadow-lg border-2 border-emerald-500/60">
            <img
              src={onlineClassroomDemo}
              alt="Lớp học trực tuyến IELTS Reading cùng Thầy Hải"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1280}
              height={768}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />
            {/* Subtitle bubble */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur rounded-md px-2.5 py-1 text-[11px] font-bold text-foreground shadow-md">
              📖 IELTS Reading · Band 7.0+
            </div>
            <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-md px-2.5 py-1 text-[11px] font-extrabold shadow-md">
              ● LIVE · HD
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl ring-4 ring-white/50 hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-primary fill-primary translate-x-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur">
                <div className="h-full w-2/3 bg-gradient-to-r from-amber-300 to-emerald-300" />
              </div>
              <div className="flex justify-between text-[10px] text-white mt-1 font-bold drop-shadow">
                <span>16:12</span>
                <span>24:00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-sm sm:text-base">
              Bài 12 · IELTS Reading - Skimming &amp; Scanning
            </h4>
            <p className="text-muted-foreground text-xs mt-1">
              Giảng viên: Thầy Hải · 24 phút · 🏆 9.2 điểm trung bình
            </p>
          </div>

          {/* Colorful stat cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              {
                l: "Tiến độ",
                v: "72%",
                bg: "from-sky-100 to-sky-50",
                tx: "text-sky-700",
                border: "border-sky-200",
              },
              {
                l: "Đã làm",
                v: "9/12",
                bg: "from-emerald-100 to-emerald-50",
                tx: "text-emerald-700",
                border: "border-emerald-200",
              },
              {
                l: "Điểm TB",
                v: "8.4",
                bg: "from-amber-100 to-amber-50",
                tx: "text-amber-700",
                border: "border-amber-200",
              },
            ].map((s) => (
              <div
                key={s.l}
                className={`rounded-xl bg-gradient-to-br ${s.bg} border ${s.border} p-2.5 min-w-0`}
              >
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider truncate font-semibold">
                  {s.l}
                </div>
                <div className={`text-lg sm:text-xl font-extrabold ${s.tx}`}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          {/* AI Tutor - vivid card */}
          <div className="rounded-2xl bg-white border-2 border-primary/30 shadow-xl shadow-primary/10 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground">
                  AI Tutor · Mr. Hai Bot
                </div>
                <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online 24/7 · Trả lời ngay lập tức
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="rounded-2xl rounded-tl-sm bg-secondary/70 p-2.5 text-[11px] sm:text-xs text-foreground/90 leading-relaxed">
                🧑‍🎓 “Em chưa hiểu cụm <em>once in a blue moon</em>, thầy ơi.”
              </div>
              <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/15 p-2.5 text-[11px] sm:text-xs text-foreground leading-relaxed">
                🤖 Nghĩa là <strong>rất hiếm khi</strong>. Ví dụ:{" "}
                <em>I see him once in a blue moon.</em> - Tôi rất hiếm khi gặp
                anh ấy.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Assistant time-log & salary mockup
const AssistantMockup = () => (
  <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
    <div className="p-5 border-b border-border bg-gradient-to-r from-primary/5 to-emerald-500/5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            Bảng điều khiển Trợ giảng
          </h4>
          <p className="text-xs text-muted-foreground">
            Phiên làm việc · Hôm nay
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-lg bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Check-in
          </button>
          <button className="h-9 px-4 rounded-lg border border-border text-xs font-semibold text-foreground">
            Check-out
          </button>
        </div>
      </div>
    </div>
    <div className="p-5 grid grid-cols-3 gap-3">
      {[
        { l: "Giờ làm hôm nay", v: "6.5h", i: Clock, c: "text-primary" },
        {
          l: "Lương dự kiến",
          v: "325K₫",
          i: DollarSign,
          c: "text-emerald-500",
        },
        { l: "Báo cáo đã gửi", v: "3", i: FileText, c: "text-amber-500" },
      ].map((s) => (
        <div key={s.l} className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <s.i className={`w-3 h-3 ${s.c}`} /> {s.l}
          </div>
          <div className="text-lg font-bold text-foreground mt-1">{s.v}</div>
        </div>
      ))}
    </div>
    <div className="p-5 pt-0">
      <h5 className="text-xs font-semibold text-foreground mb-2">
        Nhật ký phiên gần đây
      </h5>
      <div className="rounded-lg border border-border overflow-hidden text-xs">
        {[
          { d: "06/06", in: "08:00", out: "12:00", h: "4.0h", s: "200K₫" },
          { d: "05/06", in: "13:30", out: "17:00", h: "3.5h", s: "175K₫" },
          { d: "04/06", in: "08:15", out: "11:45", h: "3.5h", s: "175K₫" },
        ].map((r, i) => (
          <div
            key={i}
            className={`grid grid-cols-5 px-3 py-2 ${
              i % 2 === 0 ? "bg-secondary/30" : "bg-background"
            } text-foreground`}
          >
            <span className="text-muted-foreground">{r.d}</span>
            <span>{r.in}</span>
            <span>{r.out}</span>
            <span className="font-medium">{r.h}</span>
            <span className="text-emerald-600 font-semibold text-right">
              {r.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Admin analytics dashboard mockup with mini recharts line
const AdminMockup = () => (
  <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
    <div className="p-5 border-b border-border flex items-center justify-between flex-wrap gap-2">
      <div>
        <h4 className="font-semibold text-foreground text-sm">
          Bảng Quản trị · Học viện
        </h4>
        <p className="text-xs text-muted-foreground">
          Dữ liệu cập nhật theo thời gian thực
        </p>
      </div>
      <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
        ● LIVE
      </span>
    </div>
    <div className="p-5 grid grid-cols-3 gap-3">
      {[
        { l: "Học viên", v: "1,284", d: "+12%", c: "text-primary" },
        { l: "Bài giảng", v: "367", d: "+8%", c: "text-emerald-500" },
        { l: "Quiz hoàn tất", v: "9,842", d: "+24%", c: "text-violet-500" },
      ].map((s) => (
        <div key={s.l} className="rounded-lg border border-border p-3">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {s.l}
          </div>
          <div className="text-xl font-bold text-foreground mt-1">{s.v}</div>
          <div className={`text-[10px] font-semibold ${s.c}`}>
            {s.d} tuần này
          </div>
        </div>
      ))}
    </div>
    <div className="p-5 pt-0">
      <h5 className="text-xs font-semibold text-foreground mb-2">
        Tiến độ học tập 7 ngày
      </h5>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={PROGRESS_SERIES}
            margin={{ top: 5, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="students"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="lessons"
              stroke="#10B981"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const PortfolioShowcase = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            {t(
              "Hệ Thống Tính Năng - Bản Demo Trực Quan",
              "Feature System - Visual Live Demo",
            )}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(
              "Khám phá những gì quý Thầy/Cô sẽ thực sự nhận được - lướt qua 17 màn hình demo của hệ thống.",
              "See exactly what you'll get - swipe through 17 demo screens of the system.",
            )}
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <DemoCarousel />
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Feature Comparison Matrix */
/* -------------------------------------------------------------------------- */

type Bi = { vi: string; en: string };
const COMPARISON_ROWS: Array<{
  feature: Bi;
  standard: { v: Bi; ok?: boolean };
  advanced: { v: Bi; ok?: boolean };
  enterprise: { v: Bi; ok?: boolean };
}> = [
  {
    feature: {
      vi: "Bảo mật & Lưu trữ video bài giảng",
      en: "Lesson Video Security & Storage",
    },
    standard: {
      v: {
        vi: "Nhúng cơ bản (YouTube/Vimeo)",
        en: "Basic embeds (YouTube/Vimeo)",
      },
    },
    advanced: {
      v: {
        vi: "Hosting bảo mật, chống tải xuống, watermark",
        en: "Secure hosting, anti-download, watermark",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "DRM cấp doanh nghiệp + CDN riêng + watermark động theo user",
        en: "Enterprise DRM + dedicated CDN + per-user dynamic watermark",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Tích hợp Trợ lý AI cho học sinh",
      en: "AI Assistant for Students",
    },
    standard: { v: { vi: "Không có", en: "Not included" } },
    advanced: {
      v: {
        vi: "Chatbot Perplexity/GPT huấn luyện theo tài liệu của Thầy/Cô",
        en: "Perplexity/GPT chatbot trained on your materials",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Multi-AI Agent (GPT-5 + Gemini + Claude) + RAG riêng từng môn",
        en: "Multi-AI Agent (GPT-5 + Gemini + Claude) + per-subject RAG",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Phân tích học tập (Learning Analytics)",
      en: "Learning Analytics",
    },
    standard: {
      v: { vi: "Biểu đồ tiến độ cơ bản", en: "Basic progress charts" },
    },
    advanced: {
      v: {
        vi: "AI cảnh báo học sinh yếu, metric hành vi chi tiết",
        en: "AI alerts for at-risk students, detailed behavior metrics",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Data Warehouse + BI dashboard riêng + AI dự đoán nghỉ học",
        en: "Data Warehouse + dedicated BI dashboard + AI dropout prediction",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Email tự động & Giao dịch",
      en: "Automated & Transactional Email",
    },
    standard: { v: { vi: "Thao tác thủ công", en: "Manual" } },
    advanced: {
      v: {
        vi: "Hóa đơn tự động, subdomain email thương hiệu riêng",
        en: "Auto invoices, branded email subdomain",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Email server riêng + workflow đa kịch bản (CRM-grade)",
        en: "Dedicated email server + multi-scenario workflows (CRM-grade)",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Chấm điểm tự động (quiz/bài tập)",
      en: "Auto Grading (quiz/assignments)",
    },
    standard: {
      v: { vi: "Trắc nghiệm tự động", en: "Auto multiple-choice grading" },
    },
    advanced: {
      v: {
        vi: "AI Smart Grading cho bài viết & nói",
        en: "AI Smart Grading for Writing & Speaking",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "AI Grading tùy biến theo rubric riêng + báo cáo PDF brand",
        en: "Custom-rubric AI grading + branded PDF reports",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Bảo trì & Cập nhật tính năng",
      en: "Maintenance & Feature Updates",
    },
    standard: { v: { vi: "Giờ hành chính", en: "Business hours" } },
    advanced: {
      v: {
        vi: "Ưu tiên + cập nhật tính năng theo quý",
        en: "Priority + quarterly feature updates",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "SLA 24/7 · Kỹ sư phụ trách riêng · cập nhật theo roadmap",
        en: "24/7 SLA · Dedicated engineer · roadmap-driven updates",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Tối ưu SEO & Hiệu năng trang",
      en: "SEO & Page Performance",
    },
    standard: {
      v: {
        vi: "Meta tags cơ bản, PageSpeed ~75",
        en: "Basic meta tags, PageSpeed ~75",
      },
    },
    advanced: {
      v: {
        vi: "Schema EducationalOrganization, PageSpeed 95+, sitemap động",
        en: "EducationalOrganization schema, PageSpeed 95+, dynamic sitemap",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Multi-site SEO, edge caching toàn cầu, A/B testing",
        en: "Multi-site SEO, global edge caching, A/B testing",
      },
      ok: true,
    },
  },
  {
    feature: { vi: "Cổng thanh toán học phí", en: "Tuition Payment Gateway" },
    standard: {
      v: { vi: "Chuyển khoản thủ công", en: "Manual bank transfer" },
    },
    advanced: {
      v: {
        vi: "VNPay / Momo / ZaloPay - đối soát tự động + xuất hóa đơn",
        en: "VNPay / Momo / ZaloPay - auto reconciliation + invoicing",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Đa cổng + Stripe/Paddle quốc tế + đối soát kế toán tự động",
        en: "Multi-gateway + international Stripe/Paddle + auto accounting reconciliation",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Phân quyền & Quản trị nhiều cấp",
      en: "Multi-level Roles & Administration",
    },
    standard: {
      v: { vi: "1 cấp Admin duy nhất", en: "Single Admin role only" },
    },
    advanced: {
      v: {
        vi: "Admin / Giáo viên / Trợ giảng / Phụ huynh / Học viên",
        en: "Admin / Teacher / Assistant / Parent / Student",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "RBAC tùy biến không giới hạn + SSO / SAML cho tổ chức",
        en: "Unlimited custom RBAC + SSO / SAML for organizations",
      },
      ok: true,
    },
  },
  {
    feature: {
      vi: "Sao lưu & Khôi phục dữ liệu",
      en: "Backup & Disaster Recovery",
    },
    standard: { v: { vi: "Thủ công theo yêu cầu", en: "Manual on request" } },
    advanced: {
      v: {
        vi: "Backup tự động hằng ngày, khôi phục 1-click theo mốc thời gian",
        en: "Daily auto backups, 1-click point-in-time restore",
      },
      ok: true,
    },
    enterprise: {
      v: {
        vi: "Backup đa vùng (multi-region) + DR plan + audit log",
        en: "Multi-region backups + DR plan + audit log",
      },
      ok: true,
    },
  },
];

const ComparisonTable = () => {
  const { t } = useLanguage();
  return (
    <div className="mt-14 max-w-6xl mx-auto">
      <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-2">
        {t(
          "Bảng So Sánh Tính Năng Giữa Các Gói",
          "Feature Comparison Across Packages",
        )}
      </h3>
      <p className="text-center text-sm text-muted-foreground mb-6">
        {t(
          "Minh bạch hoàn toàn - Quý Thầy/Cô nắm rõ giá trị của từng gói trước khi quyết định.",
          "Fully transparent - understand the value of each package before deciding.",
        )}
      </p>
      <div className="rounded-2xl border-2 border-emerald-600/60 bg-card shadow-sm overflow-x-auto">
        <Table className="min-w-[820px]">
          <TableHeader>
            <TableRow className="bg-secondary/40">
              <TableHead className="text-foreground font-semibold w-[32%]">
                {t("Tính năng hệ thống", "System Feature")}
              </TableHead>
              <TableHead className="text-foreground font-semibold text-center">
                {t("Gói Standard", "Standard Package")}
              </TableHead>
              <TableHead className="text-foreground font-semibold text-center">
                <span className="inline-flex items-center gap-1 text-primary">
                  <Crown className="w-3.5 h-3.5" />{" "}
                  {t("Gói Advanced AI & Data", "Advanced AI & Data Package")}
                </span>
              </TableHead>
              <TableHead className="text-foreground font-semibold text-center">
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <Database className="w-3.5 h-3.5" />{" "}
                  {t("Gói Enterprise", "Enterprise Package")}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMPARISON_ROWS.map((r, i) => (
              <TableRow
                key={r.feature.en}
                className={i % 2 === 0 ? "" : "bg-secondary/20"}
              >
                <TableCell className="font-medium text-sm text-foreground align-top py-4">
                  {t(r.feature.vi, r.feature.en)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground text-center align-top py-4">
                  <div className="flex items-start justify-center gap-1.5">
                    <XIcon className="w-3.5 h-3.5 text-muted-foreground/70 mt-0.5 shrink-0" />
                    <span>{t(r.standard.v.vi, r.standard.v.en)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground text-center align-top py-4">
                  <div className="flex items-start justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium">
                      {t(r.advanced.v.vi, r.advanced.v.en)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground text-center align-top py-4 bg-emerald-500/5">
                  <div className="flex items-start justify-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="font-semibold">
                      {t(r.enterprise.v.vi, r.enterprise.v.en)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* FAQ Section */
/* -------------------------------------------------------------------------- */

const FAQS: Array<{ q: Bi; a: Bi }> = [
  {
    q: {
      vi: "Tôi không biết gì về công nghệ, mã nguồn (Code) thì có quản lý website được không?",
      en: "I'm not technical. Can I still manage the website without coding?",
    },
    a: {
      vi: "Hoàn toàn được. Hệ thống được bàn giao kèm trang Admin trực quan 100% tiếng Việt, giúp Thầy/Cô đăng tải bài giảng và quản lý lớp học dễ dàng như dùng mạng xã hội mà không cần chạm vào một dòng code nào.",
      en: "Absolutely. You get an intuitive Admin dashboard so uploading lessons and managing classes feels as easy as using social media - no code required.",
    },
  },
  {
    q: {
      vi: "Chi phí duy trì website hàng năm gồm những gì và khoảng bao nhiêu?",
      en: "What are the annual maintenance costs and roughly how much?",
    },
    a: {
      vi: "Chi phí hàng năm chỉ gồm tiền gia hạn Tên miền (Domain) và Máy chủ lưu trữ (Hosting/Cloud). HaiEduTech cam kết tối ưu hạ tầng Server sạch giúp Thầy/Cô tiết kiệm tối đa ngân sách vận hành.",
      en: "Annual cost covers only domain renewal and hosting/cloud. HaiEduTech optimizes the infrastructure to keep operating costs minimal.",
    },
  },
  {
    q: {
      vi: "Tính năng Trợ lý AI hoạt động như thế nào, tôi có tự nạp kiến thức cho nó được không?",
      en: "How does the AI Assistant work? Can I load my own knowledge into it?",
    },
    a: {
      vi: "Được ạ. Trong gói Advanced, Trợ lý AI sẽ được cài đặt để đọc hiểu chính xác các bộ giáo trình, file tài liệu hoặc slide bài giảng của riêng Thầy/Cô, từ đó thay Thầy/Cô giải đáp thắc mắc cho học sinh chuẩn 100% theo phong cách sư phạm của mình.",
      en: "Yes. In the Advanced package, the AI Assistant is trained on your curriculum, documents, or slides so it can answer student questions in your teaching style.",
    },
  },
  {
    q: {
      vi: "Quy trình từ lúc đặt hàng đến khi website đi vào hoạt động mất bao lâu?",
      en: "How long does it take from order to launch?",
    },
    a: {
      vi: "Quy trình chuẩn gồm 4 bước: Tiếp nhận yêu cầu & Tư vấn giải pháp → Thiết kế giao diện Demo → Tích hợp Data/AI & Cấu hình tên miền → Nghiệm thu bàn giao & Hướng dẫn sử dụng. Toàn bộ thời gian triển khai gói gọn trong từ 7 đến 14 ngày làm việc.",
      en: "Standard process: Requirements & solution consulting → Demo UI design → Data/AI integration & domain setup → Handover & training. The full rollout fits within 7 to 14 working days.",
    },
  },
  {
    q: {
      vi: "Dữ liệu học viên và bài giảng có thuộc quyền sở hữu của tôi không?",
      en: "Do I fully own the student data and lesson content?",
    },
    a: {
      vi: "100% thuộc về Thầy/Cô. HaiEduTech bàn giao toàn bộ mã nguồn, cơ sở dữ liệu, tài khoản tên miền và Cloud đứng tên Thầy/Cô. Chúng tôi ký cam kết bảo mật (NDA) và không bao giờ truy cập dữ liệu khi chưa có sự cho phép.",
      en: "100% yours. We hand over all source code, database, domain and cloud accounts in your name. We sign an NDA and never access your data without permission.",
    },
  },
  {
    q: {
      vi: "Nếu sau này tôi muốn thêm tính năng mới (ví dụ: livestream, app mobile) thì có dễ mở rộng không?",
      en: "Can I easily add new features later (e.g. livestream, mobile app)?",
    },
    a: {
      vi: "Rất dễ. Hệ thống được xây trên kiến trúc microservices hiện đại (React + Supabase + Edge Functions), sẵn sàng tích hợp livestream (Agora, LiveKit), ứng dụng mobile (React Native), hay đồng bộ với Google Classroom / Microsoft Teams chỉ với chi phí mở rộng theo module.",
      en: "Very easy. The system uses a modern microservices architecture (React + Supabase + Edge Functions), ready to integrate livestream (Agora, LiveKit), mobile apps (React Native), or sync with Google Classroom / Microsoft Teams - modular pricing.",
    },
  },
  {
    q: {
      vi: "Website của tôi có chịu được lượng truy cập lớn vào giờ cao điểm (ví dụ kỳ thi) không?",
      en: "Can the website handle traffic spikes (e.g. during exams)?",
    },
    a: {
      vi: "Có. Hạ tầng dựa trên Cloud auto-scaling (Vercel Edge + Supabase Postgres), kiểm thử tải đến 10.000 người dùng đồng thời. Cam kết uptime 99.9% trên gói Advanced và Enterprise, có SLA bồi thường nếu vi phạm.",
      en: "Yes. Infrastructure runs on auto-scaling cloud (Vercel Edge + Supabase Postgres), load-tested up to 10,000 concurrent users. 99.9% uptime SLA on Advanced and Enterprise, with compensation if breached.",
    },
  },
  {
    q: {
      vi: "Tôi có được hỗ trợ đào tạo đội ngũ giáo viên sử dụng hệ thống không?",
      en: "Do I get training support for my teaching team?",
    },
    a: {
      vi: "Có ạ. Gói Standard tặng 2 buổi training 1-1 qua Zoom + video hướng dẫn riêng. Gói Advanced/Enterprise có thêm cẩm nang vận hành PDF, lớp đào tạo trực tiếp và 6 tháng hỗ trợ kỹ thuật ưu tiên qua Zalo.",
      en: "Yes. Standard includes 2 free 1-on-1 Zoom training sessions + dedicated videos. Advanced/Enterprise add a PDF operations handbook, in-person training and 6 months of priority Zalo support.",
    },
  },
  {
    q: {
      vi: "HaiEduTech khác gì so với việc tôi tự dùng Wordpress hoặc thuê freelancer?",
      en: "How is HaiEduTech different from WordPress or hiring a freelancer?",
    },
    a: {
      vi: "Khác biệt then chốt: (1) Đội ngũ thuần sư phạm + kỹ sư Data/AI tại Phần Lan, hiểu sâu nghiệp vụ giáo dục; (2) Bộ tính năng EdTech sẵn có (AI Tutor, LMS, Analytics) đã được kiểm chứng trên 5.000+ học viên thật của Thầy Hải; (3) Cam kết bảo hành 6 tháng + hoàn tiền 100% trong 7 ngày - điều mà freelancer hiếm khi đảm bảo.",
      en: "Key differences: (1) A pedagogy + Data/AI engineering team in Finland that deeply understands education; (2) Ready-made EdTech features (AI Tutor, LMS, Analytics) battle-tested on 5,000+ real students of Mr. Hai; (3) 6-month warranty + 100% refund in 7 days - something freelancers rarely offer.",
    },
  },
];

const FaqSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              {t("Giải Đáp Thắc Mắc Thường Gặp", "Frequently Asked Questions")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Những câu hỏi quan trọng nhất từ quý Thầy/Cô trước khi đặt hàng.",
                "The most important questions teachers ask before ordering.",
              )}
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-4 sm:px-5 shadow-sm data-[state=open]:border-primary/40 data-[state=open]:shadow-md transition"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                  <span className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {t(f.q.vi, f.q.en)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4">
                  {t(f.a.vi, f.a.en)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default EdTechWebService;
