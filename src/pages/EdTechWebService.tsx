/**
 * @file EdTechWebService.tsx
 * @description Premium landing page for selling custom AI-powered EdTech
 * website development services to teachers. Includes a hero, feature grid,
 * two-tier pricing, and a validation-guarded consultation request form
 * that writes to the `service_requests` table in Supabase.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect } from "react";
import onlineClassroomDemo from "@/assets/online-classroom-demo.jpg";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";

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
  special_requirements: z.string().trim().max(1500).optional().or(z.literal("")),
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
    title: "Hệ thống Quản lý Học liệu (LMS)",
    desc: "Tự động lưu trữ bài giảng, video khóa học bảo mật, chấm điểm tự động và theo dõi tiến độ chi tiết theo từng học viên.",
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Bot,
    title: "Trợ lý AI Hỗ trợ Giảng dạy",
    desc: "Tích hợp chatbot AI (Perplexity / GPT) tự động giải thích từ vựng, sửa bài viết, trả lời học sinh 24/7 dựa trên tài liệu của giáo viên.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Báo cáo Dữ liệu Thông minh",
    desc: "Biểu đồ tiến độ, phân tích hành vi học tập và tự động cảnh báo học sinh học yếu để giáo viên can thiệp kịp thời.",
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Mail,
    title: "Hạ tầng Email Tự động",
    desc: "Gửi OTP, hóa đơn, thông báo và nhắc nhở học tập chuyên nghiệp qua subdomain riêng – tăng độ tin cậy thương hiệu.",
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Monitor,
    title: "Giao diện Mobile-first & Tốc độ cao",
    desc: "Tối ưu hiển thị trên điện thoại – nơi 80% học viên truy cập. Đạt điểm Google PageSpeed 90+ giúp SEO tốt và giảm tỉ lệ thoát trang.",
    color: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: MessageCircle,
    title: "Tích hợp Zalo OA & Cộng đồng học viên",
    desc: "Tự động đẩy thông báo điểm danh, bài tập về Zalo phụ huynh. Tạo diễn đàn nội bộ để học viên hỏi-đáp, nâng cao tỉ lệ giữ chân lớp học.",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Search,
    title: "Tối ưu SEO & Hiện diện trên Google",
    desc: "Schema.org Education, sitemap tự động, meta tags chuẩn AI-search. Giúp khóa học của Thầy/Cô lên top Google khi phụ huynh tìm kiếm địa phương.",
    color: "from-indigo-500/20 to-indigo-500/5",
    iconBg: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: Lock,
    title: "Bảo mật cấp Ngân hàng & Tuân thủ GDPR",
    desc: "Mã hóa SSL/TLS 1.3, Row-Level Security cho dữ liệu học viên, sao lưu tự động hằng ngày. Hoàn toàn tuân thủ Luật An ninh mạng Việt Nam.",
    color: "from-slate-500/20 to-slate-500/5",
    iconBg: "bg-slate-500/10 text-slate-600",
  },
];

const PACKAGES = [
  {
    id: "standard" as const,
    name: "Gói Standard",
    tagline: "Khởi đầu chuyên nghiệp",
    priceFrom: "Từ 8.000.000₫",
    priceNote: "Trọn gói · Bàn giao trong 5–10 ngày",
    monthly: "Bảo trì: 300k/tháng",
    highlight: false,
    icon: Rocket,
    bestFor: "Phù hợp cho lớp học cá nhân / nhóm dưới 50 học viên.",
    features: [
      "Website LMS responsive (mobile-first)",
      "Hệ thống quiz tự chấm điểm + lưu lịch sử",
      "Quản lý học viên & phân lớp cơ bản",
      "Cài đặt tên miền (.com / .edu.vn / .vn)",
      "Trang giới thiệu khóa học + form đăng ký",
      "Hỗ trợ kỹ thuật giờ hành chính (T2–T6)",
      "Bàn giao mã nguồn & video hướng dẫn quản trị",
    ],
  },
  {
    id: "advanced" as const,
    name: "Gói Advanced AI & Data",
    tagline: "Khuyên dùng cho lớp học hiện đại",
    priceFrom: "Từ 18.000.000₫",
    priceNote: "Trọn gói · Bàn giao trong 10–14 ngày",
    monthly: "Bảo trì + AI Token: 800K₫ / tháng",
    highlight: true,
    icon: Crown,
    bestFor: "Phù hợp cho trung tâm / lớp học 50–500 học viên cần tự động hóa.",
    features: [
      "Toàn bộ tính năng của gói Standard",
      "AI Chatbot 24/7 huấn luyện theo tài liệu riêng",
      "Dashboard Learning Analytics nâng cao",
      "Email subdomain (OTP, hóa đơn, nhắc lịch tự động)",
      "AI Smart Grading cho bài viết Writing & Speaking",
      "Tích hợp thanh toán (VNPay / Momo / chuyển khoản)",
      "Bảo trì ưu tiên 24/7 + cập nhật tính năng theo quý",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Gói Enterprise",
    tagline: "Dành cho trường học & học viện",
    priceFrom: "Từ 45.000.000₫",
    priceNote: "Tùy biến sâu · Bàn giao 3–6 tuần",
    monthly: "Bảo trì + Cloud + AI: thỏa thuận theo SLA",
    highlight: false,
    icon: Database,
    bestFor: "Phù hợp cho trường học / chuỗi trung tâm 500+ học viên.",
    features: [
      "Toàn bộ tính năng gói Advanced",
      "Phân quyền nhiều cấp (Admin / Giáo viên / Phụ huynh / HS)",
      "Cổng phụ huynh: xem điểm, học phí, lịch học theo thời gian thực",
      "Tích hợp Google Sheets / Zalo OA / hệ thống điểm danh",
      "Data Warehouse + BI dashboard riêng",
      "AI dự đoán học viên nghỉ học & tự gợi ý can thiệp",
      "SLA cam kết uptime 99.9% · Hỗ trợ ưu tiên 24/7",
    ],
  },
];

// ============================================================================
// Demo Carousel — multi-slide preview of the LMS the teacher will receive
// ============================================================================
const DEMO_SLIDES = [
  {
    id: "dashboard",
    title: "Smart Dashboard",
    badge: "AI Tutor online",
    badgeColor: "emerald" as const,
  },
  {
    id: "ai-tutor",
    title: "AI Tutor 24/7",
    badge: "Realtime chat",
    badgeColor: "violet" as const,
  },
  {
    id: "classes",
    title: "Quản lý lớp học",
    badge: "Live sync",
    badgeColor: "primary" as const,
  },
  {
    id: "assignments",
    title: "Bài tập & Chấm điểm AI",
    badge: "Auto grading",
    badgeColor: "rose" as const,
  },
  {
    id: "analytics",
    title: "Phân tích chuyên sâu",
    badge: "Insights AI",
    badgeColor: "sky" as const,
  },
  {
    id: "parent-report",
    title: "Báo cáo phụ huynh",
    badge: "Auto · Hàng tháng",
    badgeColor: "amber" as const,
  },
];

const badgeStyles = {
  emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  violet: "bg-violet-500/10 text-violet-600 border-violet-500/30",
  primary: "bg-primary/10 text-primary border-primary/30",
  amber: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  rose: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  sky: "bg-sky-500/10 text-sky-600 border-sky-500/30",
};

const DemoCarousel = () => {
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
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live
        </div>
      </div>

      {/* Header */}
      <div className="px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Hôm nay · {new Date().toLocaleDateString("vi-VN")}</div>
          <div className="text-lg sm:text-2xl font-semibold text-foreground mt-0.5">{slide.title}</div>
        </div>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${badgeClass}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" /> {slide.badge}
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
          {slide.id === "parent-report" && <SlideParentReport />}
        </motion.div>
      </div>

      {/* Carousel controls */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-t border-border/60 bg-muted/30">
        <button
          onClick={() => go(idx - 1)}
          aria-label="Trước"
          className="h-8 w-8 rounded-full border border-border/60 bg-background/70 hover:bg-background flex items-center justify-center text-foreground transition hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {DEMO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIdx(i)}
              aria-label={s.title}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-7 bg-gradient-to-r from-primary to-emerald-500" : "w-2 bg-border hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(idx + 1)}
          aria-label="Sau"
          className="h-8 w-8 rounded-full border border-border/60 bg-background/70 hover:bg-background flex items-center justify-center text-foreground transition hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const SlideDashboard = () => (
  <>
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
      {[
        { label: "Học viên", value: "248", icon: Users, color: "text-primary", bg: "bg-primary/10" },
        { label: "Bài đã chấm", value: "1.2k", icon: ClipboardList, color: "text-emerald-600", bg: "bg-emerald-500/10" },
        { label: "AI replies", value: "532", icon: Bot, color: "text-violet-600", bg: "bg-violet-500/10" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl border border-border/60 bg-background/70 p-3">
          <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-md ${s.bg}`}>
            <s.icon className={`h-4 w-4 ${s.color}`} />
          </div>
          <div className="text-lg sm:text-xl font-bold text-foreground leading-none">{s.value}</div>
          <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1.5">{s.label}</div>
        </div>
      ))}
    </div>
    <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[11px] sm:text-xs font-medium text-foreground">Tiến độ học tập 7 ngày</div>
        <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-600 font-semibold">
          <TrendingUp className="h-3 w-3" /> +18%
        </div>
      </div>
      <div className="h-24 sm:h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[{d:"T2",v:42},{d:"T3",v:55},{d:"T4",v:48},{d:"T5",v:67},{d:"T6",v:72},{d:"T7",v:80},{d:"CN",v:88}]}>
            <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 2.5, fill: "hsl(var(--primary))" }} />
            <XAxis dataKey="d" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>
);

const SlideAITutor = () => (
  <div className="space-y-2.5">
    {[
      { who: "student", text: "Thầy ơi, em chưa hiểu thì hiện tại hoàn thành dùng khi nào ạ?", time: "20:14" },
      { who: "ai", text: "Hi An! Present Perfect dùng cho hành động đã xảy ra nhưng còn liên quan đến hiện tại 👇\n• I have studied English for 3 years.\n• She has just finished her homework.", time: "20:14" },
      { who: "student", text: "Cho em 1 bài tập nhanh được không thầy?", time: "20:15" },
      { who: "ai", text: "Đây nhé: 'I ___ (live) in Hà Nội since 2020.' → Trả lời rồi thầy chấm liền!", time: "20:15" },
    ].map((m, i) => (
      <div key={i} className={`flex ${m.who === "ai" ? "justify-start" : "justify-end"}`}>
        <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11px] sm:text-xs leading-relaxed whitespace-pre-line ${
          m.who === "ai"
            ? "bg-gradient-to-br from-violet-500/15 to-primary/10 border border-violet-500/30 text-foreground rounded-bl-sm"
            : "bg-primary text-primary-foreground rounded-br-sm"
        }`}>
          {m.who === "ai" && (
            <div className="flex items-center gap-1 mb-1 text-[10px] font-semibold text-violet-600">
              <Bot className="h-3 w-3" /> AI Tutor
            </div>
          )}
          {m.text}
          <div className={`text-[9px] mt-1 ${m.who === "ai" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>{m.time}</div>
        </div>
      </div>
    ))}
  </div>
);

const SlideClasses = () => (
  <div className="space-y-2">
    {[
      { name: "IELTS 6.5 — Ca tối T2-4-6", students: 18, prog: 72, color: "from-primary to-emerald-500" },
      { name: "Tiếng Anh giao tiếp B1", students: 24, prog: 58, color: "from-violet-500 to-fuchsia-500" },
      { name: "Luyện thi THPT 2026", students: 31, prog: 84, color: "from-amber-500 to-orange-500" },
      { name: "Tiếng Trung HSK 3", students: 12, prog: 41, color: "from-rose-500 to-pink-500" },
    ].map((c) => (
      <div key={c.name} className="rounded-xl border border-border/60 bg-background/70 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[11px] sm:text-xs font-semibold text-foreground truncate">{c.name}</div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0 ml-2">
            <Users className="h-3 w-3" /> {c.students}
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.prog}%` }} />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <div className="text-[10px] text-muted-foreground">Tiến độ khoá học</div>
          <div className="text-[10px] font-bold text-foreground">{c.prog}%</div>
        </div>
      </div>
    ))}
  </div>
);

const SlideParentReport = () => (
  <div className="space-y-3">
    <div className="rounded-xl border border-border/60 bg-gradient-to-br from-emerald-500/10 to-primary/5 p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white text-xs font-bold">NA</div>
        <div>
          <div className="text-xs font-semibold text-foreground">Nguyễn Văn An · Lớp IELTS 6.5</div>
          <div className="text-[10px] text-muted-foreground">Báo cáo tháng 5/2026</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Buổi học", v: "12/12", i: Calendar, c: "text-emerald-600" },
          { l: "Điểm TB", v: "8.4", i: Award, c: "text-amber-600" },
          { l: "Bài tập", v: "96%", i: ClipboardList, c: "text-primary" },
        ].map((m) => (
          <div key={m.l} className="rounded-lg bg-background/80 border border-border/40 p-2 text-center">
            <m.i className={`h-3.5 w-3.5 mx-auto mb-1 ${m.c}`} />
            <div className="text-sm font-bold text-foreground leading-none">{m.v}</div>
            <div className="text-[9px] text-muted-foreground mt-1">{m.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="rounded-xl border border-border/60 bg-background/70 p-3">
      <div className="text-[11px] font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
        <Mail className="h-3 w-3 text-primary" /> Nhận xét từ Thầy Hải
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        An tiến bộ rõ rệt ở kỹ năng Writing (Task 2 tăng 0.5 band). Cần luyện thêm Speaking Part 3 — đã giao 5 bài cho tuần tới ✨
      </p>
    </div>
    <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
      <span>📧 Đã gửi tự động đến phụ huynh</span>
      <span className="text-emerald-600 font-semibold">✓ 01/06/2026</span>
    </div>
  </div>
);

const SlideAssignments = () => (
  <div className="space-y-3">
    <div className="grid grid-cols-3 gap-3">
      {[
        { l: "Cần chấm", v: "12", c: "text-rose-600", bg: "bg-rose-500/10" },
        { l: "AI đã chấm", v: "184", c: "text-emerald-600", bg: "bg-emerald-500/10" },
        { l: "Tiết kiệm", v: "9.2h", c: "text-primary", bg: "bg-primary/10" },
      ].map((s) => (
        <div key={s.l} className={`rounded-xl border border-border/60 ${s.bg} p-3.5 text-center`}>
          <div className={`text-xl sm:text-2xl font-bold ${s.c} leading-none`}>{s.v}</div>
          <div className="text-[11px] text-muted-foreground mt-1.5">{s.l}</div>
        </div>
      ))}
    </div>
    {[
      { name: "Trần Minh Anh", task: "IELTS Writing Task 2 — Education", band: "7.0", color: "from-emerald-500 to-primary", status: "AI đã chấm" },
      { name: "Lê Quang Huy", task: "Reading Practice Test 12", band: "8.5", color: "from-violet-500 to-fuchsia-500", status: "AI đã chấm" },
      { name: "Phạm Thu Hà", task: "Speaking Part 2 — Hometown", band: "—", color: "from-amber-500 to-rose-500", status: "Chờ Thầy duyệt" },
    ].map((r) => (
      <div key={r.name} className="rounded-xl border border-border/60 bg-background/70 p-3 flex items-center gap-3">
        <div className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center text-white text-xs font-bold`}>
          {r.name.split(" ").map((w) => w[0]).slice(-2).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm font-semibold text-foreground truncate">{r.task}</div>
          <div className="text-[11px] text-muted-foreground truncate">{r.name} · {r.status}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-base font-bold text-foreground leading-none">{r.band}</div>
          <div className="text-[10px] text-muted-foreground mt-1">Band</div>
        </div>
      </div>
    ))}
  </div>
);

const SlideAnalytics = () => (
  <div className="space-y-3">
    <div className="rounded-xl border border-border/60 bg-background/70 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs sm:text-sm font-semibold text-foreground">Doanh thu 6 tháng gần nhất</div>
        <div className="text-[11px] text-emerald-600 font-semibold inline-flex items-center gap-1">
          <TrendingUp className="h-3 w-3" /> +34%
        </div>
      </div>
      <div className="h-32 sm:h-36">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[{m:"T12",v:18},{m:"T1",v:24},{m:"T2",v:22},{m:"T3",v:31},{m:"T4",v:38},{m:"T5",v:48}]}>
            <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
            <XAxis dataKey="m" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
        <div className="text-[11px] text-muted-foreground mb-1">Tỷ lệ hoàn thành</div>
        <div className="text-2xl font-bold text-emerald-600 leading-none">92%</div>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-primary" style={{ width: "92%" }} />
        </div>
      </div>
      <div className="rounded-xl border border-border/60 bg-background/70 p-3.5">
        <div className="text-[11px] text-muted-foreground mb-1">Học viên quay lại</div>
        <div className="text-2xl font-bold text-primary leading-none">87%</div>
        <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-violet-500" style={{ width: "87%" }} />
        </div>
      </div>
    </div>
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5">
      <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-[11px] sm:text-xs text-foreground leading-relaxed">
        <span className="font-semibold">AI gợi ý:</span> Lớp IELTS 6.5 ca tối đang có 3 học viên giảm tiến độ — nên gửi tin nhắn động viên trong 48h tới.
      </div>
    </div>
  </div>
);



const EdTechWebService = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = requestSchema.safeParse(form);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Vui lòng kiểm tra lại thông tin";
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
      toast.success("✅ Đã gửi yêu cầu đến Admin của HaiEduTech! Thầy Hải sẽ liên hệ trực tiếp với quý Thầy/Cô trong vòng 24 giờ.");
      setForm(INITIAL);
    } catch (err) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau ít phút.");
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" });
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
            {/* LEFT — Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6 shadow-sm">
                <Sparkles className="w-4 h-4" />
                Thiết kế Website Giáo dục – Made by HaiEduTech
              </div>

              <h1 className="notranslate font-display font-bold tracking-tight text-foreground leading-[1.05] text-[2rem] sm:text-5xl lg:text-[3rem]">
                <span className="block">Nâng cao chất lượng</span>
                <span className="block">giảng dạy với</span>
                <span className="mt-2 block bg-gradient-to-r from-primary via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Smart Learning &amp;
                </span>
                <span className="block bg-gradient-to-r from-primary via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Teaching System
                </span>
              </h1>


              <p className="notranslate mt-6 text-base sm:text-lg text-foreground/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Giải pháp <span className="font-bold text-foreground">"tailor-made"</span> – thiết kế riêng hệ thống
                LMS theo từng nhu cầu giảng dạy, kết hợp{" "}
                <span className="font-bold text-foreground">15 năm kinh nghiệm sư phạm</span> của Thầy Hải tại Việt
                Nam &amp; Phần Lan và{" "}
                <span className="font-bold text-foreground">3+ năm Data Engineering &amp; AI</span> tại Phần Lan.
              </p>

              <ul className="mt-7 max-w-xl mx-auto lg:mx-0 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 text-left text-[14.5px] sm:text-[15px]">
                {[
                  "Tiết kiệm 8–10 giờ chấm bài mỗi tuần",
                  "Không còn nỗi lo học sinh nghỉ học không báo trước",
                  "AI Tutor trợ giảng học viên ngoài giờ – hết áp lực trả lời tin nhắn 24/7",
                  "Tự động nhắc lịch học, thu học phí & gửi hoá đơn",
                  "Báo cáo phụ huynh tự động hàng tháng – tăng tỉ lệ tái đăng ký",
                  "Quản lý nhiều lớp, nhiều khoá trên 1 dashboard duy nhất",
                  "Bảo mật tài liệu giảng dạy – chống tải xuống & sao chép trái phép",
                  "Có thương hiệu riêng (domain & logo) – tăng uy tín chuyên nghiệp",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-foreground/80 font-normal leading-snug">
                    <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30">
                      <Check className="w-2.5 h-2.5 text-emerald-600" strokeWidth={2.5} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-primary to-emerald-500 hover:opacity-95 text-primary-foreground shadow-lg shadow-primary/30 h-12 px-8 text-base"
                >
                  <Send className="w-4 h-4" />
                  Đăng Ký Tư Vấn Ngay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-2 border-emerald-500/70 hover:bg-emerald-500/10 text-foreground"
                  asChild
                >
                  <a href="#packages">Xem gói dịch vụ</a>
                </Button>
              </div>

              {/* Trust badges – 2 hàng (grid 2 cột) để luôn hiển thị đầy đủ */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px] sm:text-xs font-semibold text-foreground/85">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Hợp đồng rõ ràng, thanh toán theo 2 đợt (50/50)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Database className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Cam kết vận hành hiệu quả</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Bàn giao 5–10 ngày</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border-2 border-emerald-600/80 px-3 py-1.5 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>Tận tâm với từng sản phẩm giáo dục</span>
                </span>
              </div>
            </motion.div>

            {/* RIGHT — Live demo carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative lg:col-span-6 lg:sticky lg:top-24"
            >

              <div className="relative">
                <DemoCarousel />

                {/* Floating badge — top left (anchored to carousel) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:flex absolute -left-4 -top-5 lg:-left-6 lg:-top-6 items-center gap-2.5 rounded-2xl border-2 border-violet-500/40 bg-card/95 backdrop-blur px-3.5 py-2 shadow-2xl z-10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                    <Bot className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-tight">AI Tutor 24/7</div>
                    <div className="text-[11px] text-muted-foreground">Trả lời tức thì</div>
                  </div>
                </motion.div>

                {/* Floating badge — bottom right (anchored to carousel) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="hidden md:flex absolute -right-4 -bottom-5 lg:-right-6 lg:-bottom-6 items-center gap-2.5 rounded-2xl border-2 border-emerald-500/40 bg-card/95 backdrop-blur px-3.5 py-2 shadow-2xl z-10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-tight">SSL · RLS</div>
                    <div className="text-[11px] text-muted-foreground">Bảo mật nâng cao</div>
                  </div>
                </motion.div>
              </div>


              {/* Mini feature strip below carousel */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { icon: Bot, label: "AI Tutor 24/7", color: "text-violet-600", bg: "bg-violet-500/10" },
                  { icon: ClipboardList, label: "Chấm bài tự động", color: "text-rose-600", bg: "bg-rose-500/10" },
                  { icon: TrendingUp, label: "Phân tích chuyên sâu", color: "text-primary", bg: "bg-primary/10" },
                  { icon: Mail, label: "Báo cáo phụ huynh", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                ].map((f) => (
                  <div key={f.label} className="rounded-xl border border-border/60 bg-card/70 backdrop-blur p-2.5 flex items-center gap-2 hover:border-primary/40 hover:shadow-md transition">
                    <div className={`h-8 w-8 rounded-lg ${f.bg} flex items-center justify-center shrink-0`}>
                      <f.icon className={`h-4 w-4 ${f.color}`} />
                    </div>
                    <div className="text-[11px] sm:text-xs font-semibold text-foreground leading-tight">{f.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>


          {/* Stats row */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              {
                k: "\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a015+",
                v: "năm kinh nghiệm giảng dạy tại Việt Nam",
                icon: GraduationCap,
                grad: "from-primary/20 to-primary/0",
              },
              {
                k: "\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 3+",
                v: "năm kinh nghiệm về lập trình tại Phần Lan",
                icon: Database,
                grad: "from-emerald-500/20 to-emerald-500/0",
              },
              {
                k: "\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0✦",
                v: "Tâm huyết với các sản phẩm Sư phạm & Công nghệ",
                icon: Sparkles,
                grad: "from-violet-500/20 to-violet-500/0",
              },
            ].map((s) => (
              <div
                key={s.v}
                className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur p-5 text-center sm:text-left hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.grad} pointer-events-none`} />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/80 border border-border/60">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground leading-none">{s.k}</div>
                    <div className="text-xs text-muted-foreground leading-snug mt-1.5">{s.v}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* Core Features */}
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Các tính năng cốt lõi của Website
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mỗi website được thiết kế riêng – không phải template – để phục vụ đúng chương trình giảng dạy của bạn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`h-full relative overflow-hidden border-border/70 bg-gradient-to-br ${f.color}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served — who we build for */}

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Users className="w-3.5 h-3.5" /> Đối tượng phục vụ
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Giải pháp may đo cho từng quy mô giáo dục
            </h2>
            <p className="mt-3 text-muted-foreground">
              Dù Thầy/Cô đang dạy 1-1 hay vận hành cả hệ thống trường học, chúng tôi đều có giải pháp phù hợp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: GraduationCap,
                title: "Giáo viên tự do",
                desc: "Lớp luyện thi cá nhân 1-1 hoặc nhóm nhỏ < 50 học viên, cần website chuyên nghiệp để xây thương hiệu cá nhân.",
                color: "from-blue-500/15 to-blue-500/5",
                ic: "text-blue-600 bg-blue-500/10",
              },
              {
                icon: School,
                title: "Trung tâm ngoại ngữ",
                desc: "50–500 học viên, cần LMS, AI Tutor, quản lý lớp & học phí tự động – thay thế Google Form + Zalo thủ công.",
                color: "from-emerald-500/15 to-emerald-500/5",
                ic: "text-emerald-600 bg-emerald-500/10",
              },
              {
                icon: Building2,
                title: "Trường học & Học viện",
                desc: "500+ học viên, cần phân quyền đa cấp, cổng phụ huynh, BI dashboard & tích hợp hệ thống điểm danh nội bộ.",
                color: "from-violet-500/15 to-violet-500/5",
                ic: "text-violet-600 bg-violet-500/10",
              },
              {
                icon: Globe,
                title: "EdTech Startup",
                desc: "Đang xây sản phẩm SaaS giáo dục, cần MVP nhanh trong 14 ngày với hạ tầng AI/Data sẵn sàng mở rộng.",
                color: "from-amber-500/15 to-amber-500/5",
                ic: "text-amber-600 bg-amber-500/10",
              },
            ].map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`h-full bg-gradient-to-br ${it.color} border-border/70`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${it.ic} flex items-center justify-center mb-4`}>
                      <it.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{it.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack & Security — credibility through transparent technology */}
      <section className="py-14 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <Cpu className="w-3.5 h-3.5" /> Công nghệ & Bảo mật
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Cùng kiến trúc với các sản phẩm Đại học Top Châu Âu
            </h2>
            <p className="mt-3 text-muted-foreground">
              Website của Thầy/Cô được xây trên đúng bộ công nghệ mà các startup EdTech Bắc Âu đang sử dụng – nhanh, bảo
              mật, dễ mở rộng.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Code2,
                title: "Frontend hiện đại",
                items: [
                  "React 18 + Vite (tải dưới 1 giây)",
                  "TailwindCSS – giao diện đồng nhất",
                  "Framer Motion – chuyển động mượt",
                  "Responsive 100% mobile & tablet",
                ],
                color: "from-blue-500/20 to-transparent",
                ic: "text-blue-600 bg-blue-500/10",
              },
              {
                icon: Database,
                title: "Backend & Data",
                items: [
                  "Postgres + Row-Level Security",
                  "Edge Functions phục vụ toàn cầu",
                  "Realtime sync điểm số & chat",
                  "Backup tự động hằng ngày",
                ],
                color: "from-emerald-500/20 to-transparent",
                ic: "text-emerald-600 bg-emerald-500/10",
              },
              {
                icon: Bot,
                title: "AI & Automation",
                items: [
                  "Perplexity Sonar Pro / GPT-5 / Gemini 2.5",
                  "Pyodide chạy Python ngay trên trình duyệt",
                  "Web Speech API cho luyện nói",
                  "AI Smart Grading cho Writing/Speaking",
                ],
                color: "from-violet-500/20 to-transparent",
                ic: "text-violet-600 bg-violet-500/10",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full bg-gradient-to-br ${s.color} border-border/70`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${s.ic} flex items-center justify-center mb-4`}>
                      <s.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {it}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Cam kết bảo mật cấp Doanh nghiệp</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                SSL/TLS 1.3 mặc định · Row-Level Security theo tài khoản · Audit log mọi truy cập admin · Tuân thủ Luật
                An ninh mạng Việt Nam & nguyên tắc GDPR. Dữ liệu đặt tại data center Singapore / Frankfurt theo lựa chọn
                của Thầy/Cô.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Portfolio / Demo Showcase */}
      <PortfolioShowcase />

      {/* Measurable Results — concrete numbers build trust */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <BarChart3 className="w-3.5 h-3.5" /> Kết quả đo lường được
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Hiệu quả thực tế sau khi triển khai
            </h2>
            <p className="mt-3 text-muted-foreground">
              Dữ liệu trung bình ghi nhận từ các lớp học của Thầy Hải &amp; các giáo viên đã sử dụng nền tảng
              HaiEduTech.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { k: "−85%", v: "thời gian chấm bài thủ công", c: "from-primary to-blue-400" },
              { k: "+42%", v: "tỉ lệ học viên hoàn thành khóa", c: "from-emerald-500 to-teal-400" },
              { k: "+3.1×", v: "lượt tương tác ngoài giờ học (AI Tutor)", c: "from-violet-500 to-fuchsia-400" },
              { k: "92%", v: "phụ huynh đánh giá hài lòng", c: "from-amber-500 to-orange-400" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm hover:shadow-md transition"
              >
                <div
                  className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}
                >
                  {s.k}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — transparent 5-step delivery flow */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <ClipboardList className="w-3.5 h-3.5" /> Quy trình minh bạch
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Lộ trình 5 bước · Bàn giao trong 7–14 ngày
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cam kết tiến độ rõ ràng. Quý Thầy/Cô được duyệt từng giai đoạn trước khi sang bước kế tiếp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              {
                n: 1,
                t: "Tư vấn miễn phí",
                d: "Phỏng vấn 30 phút để hiểu lớp học & mục tiêu giảng dạy.",
                icon: MessageCircle,
              },
              {
                n: 2,
                t: "Thiết kế UI/UX",
                d: "Wireframe + mockup được duyệt trước khi viết code.",
                icon: LayoutDashboard,
              },
              { n: 3, t: "Phát triển LMS", d: "Xây dựng frontend + backend bảo mật, kiểm thử nội bộ.", icon: Database },
              {
                n: 4,
                t: "Tích hợp AI & Domain",
                d: "Huấn luyện AI theo tài liệu riêng, cấu hình tên miền + email.",
                icon: Bot,
              },
              {
                n: 5,
                t: "Nghiệm thu & Đào tạo",
                d: "Bàn giao mã nguồn, video hướng dẫn quản trị 1-1.",
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
                <h3 className="font-semibold text-foreground mb-1.5">{step.t}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — social proof from teachers */}
      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-semibold text-amber-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Phản hồi từ giáo viên
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Các thầy cô nói gì về website do HaiEduTech xây dựng
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                name: "Cô Mai Anh",
                role: "Giáo viên IELTS · Hà Nội",
                avatar: "MA",
                quote:
                  "Trước đây tôi mất gần 12 tiếng mỗi tuần để chấm Writing. Sau khi dùng AI Smart Grading của Thầy Hải, thời gian rút xuống còn 2 tiếng và học viên nhận feedback gần như tức thì.",
                color: "from-primary to-blue-400",
              },
              {
                name: "Thầy Quốc Bảo",
                role: "Chủ trung tâm tiếng Trung · TP.HCM",
                avatar: "QB",
                quote:
                  "Website chạy mượt cả trên điện thoại học viên cấp 2. Phụ huynh đặc biệt thích cổng xem điểm thời gian thực — đây là điểm khác biệt giúp trung tâm tôi tăng 30% học viên đăng ký mới.",
                color: "from-emerald-500 to-teal-400",
              },
              {
                name: "Cô Hồng Nhung",
                role: "Giáo viên Hóa học THPT",
                avatar: "HN",
                quote:
                  "Tôi không rành công nghệ nhưng video hướng dẫn quản trị 1-1 của Thầy Hải rất chi tiết. Sau 2 ngày là tôi tự đăng bài giảng và bài tập trắc nghiệm được rồi.",
                color: "from-violet-500 to-fuchsia-400",
              },
            ].map((t) => (
              <Card key={t.name} className="h-full border-border/70 hover:shadow-xl transition">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-3 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1 italic">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} text-white font-bold flex items-center justify-center shrink-0`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee — risk reversal to remove final objections */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 via-card to-primary/5 p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1 text-center">
                <div className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-primary text-white items-center justify-center shadow-lg shadow-emerald-500/30">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-600">Cam kết HaiEduTech</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                  Đồng hành tận tâm – bàn giao chuẩn chỉnh, hỗ trợ dài hạn cùng quý Thầy/Cô
                </h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>Bàn giao 100% mã nguồn – quý Thầy/Cô sở hữu vĩnh viễn, không khoá vendor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>Bảo hành sửa lỗi miễn phí 6 tháng sau bàn giao.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>Hợp đồng rõ ràng, xuất hoá đơn VAT, thanh toán theo 2 đợt (50/50).</span>
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
              Bảng giá &amp; Các gói dịch vụ
            </h2>
            <p className="mt-3 text-muted-foreground">
              Giá niêm yết minh bạch. Báo giá cuối cùng sẽ được điều chỉnh theo phạm vi và số lượng tính năng tuỳ biến
              thực tế của quý Thầy/Cô.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Ưu đãi ra mắt: giảm 15% cho 10 giáo viên đầu tiên
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
                    <Crown className="w-3 h-3" /> Khuyên dùng
                  </div>
                )}
                <Card className={`h-full flex flex-col ${p.highlight ? "bg-card" : ""}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          p.highlight ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
                        }`}
                      >
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{p.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{p.tagline}</p>
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
                        {p.priceFrom}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{p.priceNote}</p>
                      <p className="text-xs text-foreground/80 mt-1 font-medium">{p.monthly}</p>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground italic">{p.bestFor}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1">
                      {p.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm text-foreground">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlight ? "text-emerald-500" : "text-primary"}`}
                          />
                          <span>{feat}</span>
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
                      Chọn {p.name}
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

      {/* Pain Points → Solutions — speak directly to teacher's daily struggles */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50/40 via-background to-emerald-50/40 dark:from-rose-950/10 dark:to-emerald-950/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/5 px-3 py-1 text-xs font-semibold text-rose-600 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Thấu hiểu giáo viên Việt
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Những nỗi đau giáo viên thường gặp – HaiEduTech giải quyết tận gốc
            </h2>
            <p className="mt-3 text-muted-foreground">
              Mỗi tính năng đều xuất phát từ chính trải nghiệm 15 năm đứng lớp của Thầy Hải.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              {
                pain: "Mất 8–12 giờ/tuần chấm bài Writing, Speaking thủ công",
                fix: "AI Smart Grading chấm tự động theo rubric IELTS/TOEIC/HSK – feedback chi tiết trong 10 giây.",
              },
              {
                pain: "Học sinh quên bài, không ôn tập, mất gốc giữa khoá",
                fix: "Hệ thống SRS + AI Tutor 24/7 nhắc ôn từ vựng và giải đáp thắc mắc ngoài giờ học.",
              },
              {
                pain: "Phụ huynh thiếu tin tưởng vì không nắm được tiến độ con",
                fix: "Báo cáo phụ huynh tự động hàng tháng qua email thương hiệu – tỉ lệ tái đăng ký +42%.",
              },
              {
                pain: "Tài liệu giảng dạy bị copy, share lậu trên Zalo / Drive",
                fix: "DRM video + watermark động theo từng học viên + chống tải xuống bằng JS obfuscation.",
              },
              {
                pain: "Quản lý lịch học, học phí, hoá đơn rối loạn trên Excel",
                fix: "Dashboard tích hợp VNPay/Momo, tự động đối soát và xuất hoá đơn VAT điện tử.",
              },
              {
                pain: "Phụ thuộc nền tảng Facebook/Zalo – mất học viên khi bị khoá",
                fix: "Có domain & thương hiệu riêng (lop-thay-hai.com) – dữ liệu học viên 100% thuộc về Thầy/Cô.",
              },
            ].map((p) => (
              <div
                key={p.pain}
                className="group rounded-2xl border-2 border-emerald-500/30 bg-card p-5 sm:p-6 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/10 transition-all"
              >
                <div className="flex items-start gap-3 mb-3 pb-3 border-b border-dashed border-rose-300/50">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 font-bold text-sm">
                    !
                  </span>
                  <p className="text-sm sm:text-[15px] font-semibold text-foreground/90 leading-snug">
                    {p.pain}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <p className="text-sm sm:text-[15px] text-foreground leading-relaxed">
                    <span className="font-bold text-emerald-700">Giải pháp: </span>
                    {p.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees — Build trust before FAQ */}
      <section className="py-14 sm:py-18">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> 5 Cam Kết Vàng
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
              Tận tâm bằng giấy trắng mực đen
            </h2>
            <p className="mt-3 text-muted-foreground">
              Không hứa suông – mỗi cam kết đều được ghi rõ trong hợp đồng.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[
              { icon: ShieldCheck, t: "Hoàn tiền 100%", d: "Trong 7 ngày nếu bản demo không đạt yêu cầu." },
              { icon: Database, t: "Bàn giao mã nguồn", d: "100% code + database thuộc sở hữu Thầy/Cô." },
              { icon: Clock, t: "Bảo hành 6 tháng", d: "Sửa lỗi miễn phí, hỗ trợ ưu tiên qua Zalo." },
              { icon: FileText, t: "NDA bảo mật", d: "Ký cam kết không tiết lộ dữ liệu lớp học." },
              { icon: Bot, t: "Hỗ trợ trọn đời", d: "Cộng đồng giáo viên HaiEduTech miễn phí vĩnh viễn." },
            ].map((g) => (
              <div
                key={g.t}
                className="rounded-2xl border-2 border-emerald-500/40 bg-card p-5 text-center hover:border-emerald-500/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/15 transition-all"
              >
                <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-primary/20 items-center justify-center mb-3">
                  <g.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-foreground text-sm sm:text-base mb-1.5">{g.t}</h4>
                <p className="text-xs text-muted-foreground leading-snug">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — expandable accordion */}
      <FaqSection />


      {/* Why us strip */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, t: "Bảo mật chuẩn EU", d: "Hạ tầng cloud hiện đại, RLS & sao lưu tự động." },
              { icon: Zap, t: "Bàn giao nhanh", d: "MVP có thể chạy trong 2–4 tuần tùy phạm vi." },
              { icon: Database, t: "Sở hữu dữ liệu", d: "Toàn bộ dữ liệu lớp học thuộc về quý Thầy/Cô." },
            ].map((x) => (
              <div key={x.t} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <x.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{x.t}</h4>
                  <p className="text-sm text-muted-foreground">{x.d}</p>
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
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">Đăng ký tư vấn miễn phí</h2>
              <p className="mt-3 text-muted-foreground">
                Điền thông tin bên dưới, Thầy Hải sẽ liên hệ tư vấn lộ trình & báo giá phù hợp trong vòng 24 giờ.
              </p>
            </div>
            <Card className="border-border/70 shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher_name">Họ và tên *</Label>
                      <Input
                        id="teacher_name"
                        required
                        placeholder="Nguyễn Văn A"
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
                      <Label htmlFor="phone">Số điện thoại *</Label>
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
                      <Label htmlFor="subject_taught">Môn / Lĩnh vực giảng dạy</Label>
                      <Input
                        id="subject_taught"
                        placeholder="Tiếng Anh, Toán, Hóa..."
                        value={form.subject_taught}
                        onChange={(e) => update("subject_taught", e.target.value)}
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selected_package">Gói dịch vụ quan tâm *</Label>
                    <Select
                      value={form.selected_package}
                      onValueChange={(v) => update("selected_package", v as FormState["selected_package"])}
                    >
                      <SelectTrigger id="selected_package">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Gói Standard (từ 8.000.000₫)</SelectItem>
                        <SelectItem value="advanced">Gói Advanced AI &amp; Data (từ 18.000.000₫)</SelectItem>
                        <SelectItem value="enterprise">Gói Enterprise (từ 45.000.000₫)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special_requirements">Yêu cầu đặc biệt (tùy chọn)</Label>
                    <Textarea
                      id="special_requirements"
                      placeholder="Mô tả ngắn về lớp học, số học viên, tính năng mong muốn..."
                      rows={5}
                      value={form.special_requirements}
                      onChange={(e) => update("special_requirements", e.target.value)}
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
                        <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Gửi Yêu Cầu Đặt Hàng
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Bằng việc gửi yêu cầu, quý Thầy/Cô đồng ý cho HaiEduTech liên hệ tư vấn qua email & điện thoại.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Interactive Portfolio Showcase                                              */
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

// LMS app mockup — responsive layout (sidebar collapses on mobile, AI tutor inline)
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
        {/* Sidebar — light gradient */}
        <aside className="w-full md:w-52 lg:w-60 shrink-0 bg-gradient-to-b from-primary/95 to-emerald-500/90 text-white p-4">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sm whitespace-nowrap">EduClass · Thầy Hải</span>
          </div>
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            {menu.map((m, i) => (
              <div
                key={m}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  i === 0 ? "bg-white text-primary shadow" : "bg-white/10 text-white/90 hover:bg-white/20"
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
              Bài 12 · IELTS Reading – Skimming &amp; Scanning
            </h4>
            <p className="text-muted-foreground text-xs mt-1">
              Giảng viên: Thầy Hải · 24 phút · 🏆 9.2 điểm trung bình
            </p>
          </div>

          {/* Colorful stat cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { l: "Tiến độ", v: "72%", bg: "from-sky-100 to-sky-50", tx: "text-sky-700", border: "border-sky-200" },
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
              <div key={s.l} className={`rounded-xl bg-gradient-to-br ${s.bg} border ${s.border} p-2.5 min-w-0`}>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider truncate font-semibold">
                  {s.l}
                </div>
                <div className={`text-lg sm:text-xl font-extrabold ${s.tx}`}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* AI Tutor — vivid card */}
          <div className="rounded-2xl bg-white border-2 border-primary/30 shadow-xl shadow-primary/10 p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground">AI Tutor · Mr. Hai Bot</div>
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
                🤖 Nghĩa là <strong>rất hiếm khi</strong>. Ví dụ: <em>I see him once in a blue moon.</em> – Tôi rất hiếm
                khi gặp anh ấy.
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
          <h4 className="font-semibold text-foreground text-sm">Bảng điều khiển Trợ giảng</h4>
          <p className="text-xs text-muted-foreground">Phiên làm việc · Hôm nay</p>
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
        { l: "Lương dự kiến", v: "325K₫", i: DollarSign, c: "text-emerald-500" },
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
      <h5 className="text-xs font-semibold text-foreground mb-2">Nhật ký phiên gần đây</h5>
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
            <span className="text-emerald-600 font-semibold text-right">{r.s}</span>
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
        <h4 className="font-semibold text-foreground text-sm">Bảng Quản trị · Học viện</h4>
        <p className="text-xs text-muted-foreground">Dữ liệu cập nhật theo thời gian thực</p>
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
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
          <div className="text-xl font-bold text-foreground mt-1">{s.v}</div>
          <div className={`text-[10px] font-semibold ${s.c}`}>{s.d} tuần này</div>
        </div>
      ))}
    </div>
    <div className="p-5 pt-0">
      <h5 className="text-xs font-semibold text-foreground mb-2">Tiến độ học tập 7 ngày</h5>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PROGRESS_SERIES} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="lessons" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const PortfolioShowcase = () => {
  const tabs = [
    { id: "lms", label: "Giao diện Học viên (LMS)", icon: Monitor, body: <LmsMockup /> },
    { id: "assistant", label: "Chấm công & Trợ lý", icon: ClipboardList, body: <AssistantMockup /> },
    { id: "admin", label: "Admin Tổng (Analytics)", icon: LayoutDashboard, body: <AdminMockup /> },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            Hệ Thống Tính Năng – Bản Demo Trực Quan
          </h2>
          <p className="mt-3 text-muted-foreground">
            Khám phá những gì quý Thầy/Cô sẽ thực sự nhận được – từ giao diện học viên đến bảng quản trị.
          </p>
        </div>
        <Tabs defaultValue="lms" className="max-w-5xl mx-auto">
          <TabsList className="w-full h-auto flex flex-wrap justify-center gap-2 bg-secondary/40 p-2 rounded-xl">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="gap-2 px-4 py-2.5 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-500 data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((t) => (
            <TabsContent key={t.id} value={t.id} className="mt-8">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {t.body}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* Feature Comparison Matrix                                                   */
/* -------------------------------------------------------------------------- */

const COMPARISON_ROWS: Array<{
  feature: string;
  standard: { v: string; ok?: boolean };
  advanced: { v: string; ok?: boolean };
  enterprise: { v: string; ok?: boolean };
}> = [
  {
    feature: "Bảo mật & Lưu trữ video bài giảng",
    standard: { v: "Nhúng cơ bản (YouTube/Vimeo)" },
    advanced: { v: "Hosting bảo mật, chống tải xuống, watermark", ok: true },
    enterprise: { v: "DRM cấp doanh nghiệp + CDN riêng + watermark động theo user", ok: true },
  },
  {
    feature: "Tích hợp Trợ lý AI cho học sinh",
    standard: { v: "Không có" },
    advanced: { v: "Chatbot Perplexity/GPT huấn luyện theo tài liệu của Thầy/Cô", ok: true },
    enterprise: { v: "Multi-AI Agent (GPT-5 + Gemini + Claude) + RAG riêng từng môn", ok: true },
  },
  {
    feature: "Phân tích học tập (Learning Analytics)",
    standard: { v: "Biểu đồ tiến độ cơ bản" },
    advanced: { v: "AI cảnh báo học sinh yếu, metric hành vi chi tiết", ok: true },
    enterprise: { v: "Data Warehouse + BI dashboard riêng + AI dự đoán nghỉ học", ok: true },
  },
  {
    feature: "Email tự động & Giao dịch",
    standard: { v: "Thao tác thủ công" },
    advanced: { v: "Hóa đơn tự động, subdomain email thương hiệu riêng", ok: true },
    enterprise: { v: "Email server riêng + workflow đa kịch bản (CRM-grade)", ok: true },
  },
  {
    feature: "Chấm điểm tự động (quiz/bài tập)",
    standard: { v: "Trắc nghiệm tự động" },
    advanced: { v: "AI Smart Grading cho bài viết & nói", ok: true },
    enterprise: { v: "AI Grading tùy biến theo rubric riêng + báo cáo PDF brand", ok: true },
  },
  {
    feature: "Bảo trì & Cập nhật tính năng",
    standard: { v: "Giờ hành chính" },
    advanced: { v: "Ưu tiên + cập nhật tính năng theo quý", ok: true },
    enterprise: { v: "SLA 24/7 · Kỹ sư phụ trách riêng · cập nhật theo roadmap", ok: true },
  },
  {
    feature: "Tối ưu SEO & Hiệu năng trang",
    standard: { v: "Meta tags cơ bản, PageSpeed ~75" },
    advanced: { v: "Schema EducationalOrganization, PageSpeed 95+, sitemap động", ok: true },
    enterprise: { v: "Multi-site SEO, edge caching toàn cầu, A/B testing", ok: true },
  },
  {
    feature: "Cổng thanh toán học phí",
    standard: { v: "Chuyển khoản thủ công" },
    advanced: { v: "VNPay / Momo / ZaloPay – đối soát tự động + xuất hóa đơn", ok: true },
    enterprise: { v: "Đa cổng + Stripe/Paddle quốc tế + đối soát kế toán tự động", ok: true },
  },
  {
    feature: "Phân quyền & Quản trị nhiều cấp",
    standard: { v: "1 cấp Admin duy nhất" },
    advanced: { v: "Admin / Giáo viên / Trợ giảng / Phụ huynh / Học viên", ok: true },
    enterprise: { v: "RBAC tùy biến không giới hạn + SSO / SAML cho tổ chức", ok: true },
  },
  {
    feature: "Sao lưu & Khôi phục dữ liệu",
    standard: { v: "Thủ công theo yêu cầu" },
    advanced: { v: "Backup tự động hằng ngày, khôi phục 1-click theo mốc thời gian", ok: true },
    enterprise: { v: "Backup đa vùng (multi-region) + DR plan + audit log", ok: true },
  },
];

const ComparisonTable = () => (
  <div className="mt-14 max-w-6xl mx-auto">
    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-2">
      Bảng So Sánh Tính Năng Giữa Các Gói
    </h3>
    <p className="text-center text-sm text-muted-foreground mb-6">
      Minh bạch hoàn toàn – Quý Thầy/Cô nắm rõ giá trị của từng gói trước khi quyết định.
    </p>
    <div className="rounded-2xl border-2 border-emerald-600/60 bg-card shadow-sm overflow-x-auto">
      <Table className="min-w-[820px]">
        <TableHeader>
          <TableRow className="bg-secondary/40">
            <TableHead className="text-foreground font-semibold w-[32%]">Tính năng hệ thống</TableHead>
            <TableHead className="text-foreground font-semibold text-center">Gói Standard</TableHead>
            <TableHead className="text-foreground font-semibold text-center">
              <span className="inline-flex items-center gap-1 text-primary">
                <Crown className="w-3.5 h-3.5" /> Gói Advanced AI &amp; Data
              </span>
            </TableHead>
            <TableHead className="text-foreground font-semibold text-center">
              <span className="inline-flex items-center gap-1 text-emerald-700">
                <Database className="w-3.5 h-3.5" /> Gói Enterprise
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMPARISON_ROWS.map((r, i) => (
            <TableRow key={r.feature} className={i % 2 === 0 ? "" : "bg-secondary/20"}>
              <TableCell className="font-medium text-sm text-foreground align-top py-4">{r.feature}</TableCell>
              <TableCell className="text-sm text-muted-foreground text-center align-top py-4">
                <div className="flex items-start justify-center gap-1.5">
                  <XIcon className="w-3.5 h-3.5 text-muted-foreground/70 mt-0.5 shrink-0" />
                  <span>{r.standard.v}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-foreground text-center align-top py-4">
                <div className="flex items-start justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="font-medium">{r.advanced.v}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-foreground text-center align-top py-4 bg-emerald-500/5">
                <div className="flex items-start justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="font-semibold">{r.enterprise.v}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* FAQ Section                                                                 */
/* -------------------------------------------------------------------------- */

const FAQS = [
  {
    q: "Tôi không biết gì về công nghệ, mã nguồn (Code) thì có quản lý website được không?",
    a: "Hoàn toàn được. Hệ thống được bàn giao kèm trang Admin trực quan 100% tiếng Việt, giúp Thầy/Cô đăng tải bài giảng và quản lý lớp học dễ dàng như dùng mạng xã hội mà không cần chạm vào một dòng code nào.",
  },
  {
    q: "Chi phí duy trì website hàng năm gồm những gì và khoảng bao nhiêu?",
    a: "Chi phí hàng năm chỉ gồm tiền gia hạn Tên miền (Domain) và Máy chủ lưu trữ (Hosting/Cloud). HaiEduTech cam kết tối ưu hạ tầng Server sạch giúp Thầy/Cô tiết kiệm tối đa ngân sách vận hành.",
  },
  {
    q: "Tính năng Trợ lý AI hoạt động như thế nào, tôi có tự nạp kiến thức cho nó được không?",
    a: "Được ạ. Trong gói Advanced, Trợ lý AI sẽ được cài đặt để đọc hiểu chính xác các bộ giáo trình, file tài liệu hoặc slide bài giảng của riêng Thầy/Cô, từ đó thay Thầy/Cô giải đáp thắc mắc cho học sinh chuẩn 100% theo phong cách sư phạm của mình.",
  },
  {
    q: "Quy trình từ lúc đặt hàng đến khi website đi vào hoạt động mất bao lâu?",
    a: "Quy trình chuẩn gồm 4 bước: Tiếp nhận yêu cầu & Tư vấn giải pháp → Thiết kế giao diện Demo → Tích hợp Data/AI & Cấu hình tên miền → Nghiệm thu bàn giao & Hướng dẫn sử dụng. Toàn bộ thời gian triển khai gói gọn trong từ 7 đến 14 ngày làm việc.",
  },
  {
    q: "Dữ liệu học viên và bài giảng có thuộc quyền sở hữu của tôi không?",
    a: "100% thuộc về Thầy/Cô. HaiEduTech bàn giao toàn bộ mã nguồn, cơ sở dữ liệu, tài khoản tên miền và Cloud đứng tên Thầy/Cô. Chúng tôi ký cam kết bảo mật (NDA) và không bao giờ truy cập dữ liệu khi chưa có sự cho phép.",
  },
  {
    q: "Nếu sau này tôi muốn thêm tính năng mới (ví dụ: livestream, app mobile) thì có dễ mở rộng không?",
    a: "Rất dễ. Hệ thống được xây trên kiến trúc microservices hiện đại (React + Supabase + Edge Functions), sẵn sàng tích hợp livestream (Agora, LiveKit), ứng dụng mobile (React Native), hay đồng bộ với Google Classroom / Microsoft Teams chỉ với chi phí mở rộng theo module.",
  },
  {
    q: "Website của tôi có chịu được lượng truy cập lớn vào giờ cao điểm (ví dụ kỳ thi) không?",
    a: "Có. Hạ tầng dựa trên Cloud auto-scaling (Vercel Edge + Supabase Postgres), kiểm thử tải đến 10.000 người dùng đồng thời. Cam kết uptime 99.9% trên gói Advanced và Enterprise, có SLA bồi thường nếu vi phạm.",
  },
  {
    q: "Tôi có được hỗ trợ đào tạo đội ngũ giáo viên sử dụng hệ thống không?",
    a: "Có ạ. Gói Standard tặng 2 buổi training 1-1 qua Zoom + video hướng dẫn riêng. Gói Advanced/Enterprise có thêm cẩm nang vận hành PDF, lớp đào tạo trực tiếp và 6 tháng hỗ trợ kỹ thuật ưu tiên qua Zalo.",
  },
  {
    q: "HaiEduTech khác gì so với việc tôi tự dùng Wordpress hoặc thuê freelancer?",
    a: "Khác biệt then chốt: (1) Đội ngũ thuần sư phạm + kỹ sư Data/AI tại Phần Lan, hiểu sâu nghiệp vụ giáo dục; (2) Bộ tính năng EdTech sẵn có (AI Tutor, LMS, Analytics) đã được kiểm chứng trên 5.000+ học viên thật của Thầy Hải; (3) Cam kết bảo hành 6 tháng + hoàn tiền 100% trong 7 ngày – điều mà freelancer hiếm khi đảm bảo.",
  },
];

const FaqSection = () => (
  <section className="py-16 sm:py-20 bg-secondary/30">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">Giải Đáp Thắc Mắc Thường Gặp</h2>
          <p className="mt-3 text-muted-foreground">Những câu hỏi quan trọng nhất từ quý Thầy/Cô trước khi đặt hàng.</p>
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
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default EdTechWebService;
