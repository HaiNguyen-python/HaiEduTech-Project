/**
 * @file EdTechWebService.tsx
 * @description Premium landing page for selling custom AI-powered EdTech
 * website development services to teachers. Includes a hero, feature grid,
 * two-tier pricing, and a validation-guarded consultation request form
 * that writes to the `service_requests` table in Supabase.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sparkles, Bot, BarChart3, Mail, ShieldCheck, Check, Crown, Rocket,
  GraduationCap, Database, Zap, Send, Loader2, Monitor, ClipboardList,
  LayoutDashboard, Play, MessageCircle, Clock, DollarSign, FileText,
  HelpCircle, X as XIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
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
];

const PACKAGES = [
  {
    id: "standard" as const,
    name: "Gói Standard",
    tagline: "Khởi đầu chuyên nghiệp",
    priceFrom: "Từ 8.000.000₫",
    priceNote: "Trọn gói · Bàn giao trong 7–10 ngày",
    monthly: "Bảo trì: 300K₫ / tháng",
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

const EdTechWebService = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

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
      toast.success(
        "Gửi yêu cầu thành công! Thầy Hải sẽ liên hệ tư vấn cho quý Thầy/Cô trong vòng 24 giờ.",
      );
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_80%_60%,hsl(var(--accent)/0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Dịch vụ Thiết kế Website – Made by HaiEduTech
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-tight">
              Nâng Tầm Lớp Học Với{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Website Giáo Dục Tích Hợp Data &amp; AI
              </span>{" "}
              Độc Quyền
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Giải pháp <strong className="text-foreground">tailor-made</strong> kết hợp{" "}
              <strong className="text-foreground">15 năm kinh nghiệm sư phạm</strong> của Thầy Hải và{" "}
              <strong className="text-foreground">3+ năm thực chiến Data Engineering &amp; AI tại Bắc Âu (Phần Lan)</strong>.
              Không dùng template – mỗi website được xây riêng cho lớp học của quý Thầy/Cô:{" "}
              <strong className="text-foreground">LMS bảo mật, AI Tutor 24/7, chấm bài tự động</strong>{" "}
              và dashboard đo lường hiệu quả học tập theo thời gian thực.
            </p>
            <ul className="mt-5 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-left text-sm">
              {[
                "Tiết kiệm 8–10 giờ chấm bài / tuần",
                "Tự động gửi điểm & nhắc lịch qua email",
                "AI giải đáp học viên ngoài giờ học",
                "Báo cáo phụ huynh tự động hàng tháng",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-foreground/90">
                  <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={scrollToForm}
                className="bg-gradient-to-r from-primary to-emerald-500 hover:opacity-95 text-primary-foreground shadow-lg shadow-primary/30 h-12 px-8 text-base"
              >
                <Send className="w-4 h-4" />
                Đăng Ký Tư Vấn Ngay
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <a href="#packages">Xem gói dịch vụ</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
              {[
                { k: "15+", v: "năm sư phạm" },
                { k: "3+", v: "năm Kỹ sư Dữ liệu & AI" },
                { k: "✦", v: "Kinh nghiệm liên ngành Sư phạm & Công nghệ" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-border bg-card/60 backdrop-blur px-3 py-3">
                  <div className="text-lg sm:text-xl font-bold text-foreground">{s.k}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Trust badges row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Bảo mật chuẩn EU
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <Database className="w-3.5 h-3.5 text-primary" /> Sở hữu 100% dữ liệu
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Bàn giao nhanh 7–14 ngày
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-3 py-1">
                <Bot className="w-3.5 h-3.5 text-violet-500" /> Luôn tận tâm với các sản phẩm giáo dục
              </span>
            </div>
          </motion.div>
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
              Dữ liệu trung bình ghi nhận từ các lớp học của Thầy Hải &amp; các giáo viên đã sử dụng nền tảng HaiEduTech.
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
                <div className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r ${s.c} bg-clip-text text-transparent`}>
                  {s.k}
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug">
                  {s.v}
                </div>
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
              { n: 1, t: "Tư vấn miễn phí", d: "Phỏng vấn 30 phút để hiểu lớp học & mục tiêu giảng dạy.", icon: MessageCircle },
              { n: 2, t: "Thiết kế UI/UX", d: "Wireframe + mockup được duyệt trước khi viết code.", icon: LayoutDashboard },
              { n: 3, t: "Phát triển LMS", d: "Xây dựng frontend + backend bảo mật, kiểm thử nội bộ.", icon: Database },
              { n: 4, t: "Tích hợp AI & Domain", d: "Huấn luyện AI theo tài liệu riêng, cấu hình tên miền + email.", icon: Bot },
              { n: 5, t: "Nghiệm thu & Đào tạo", d: "Bàn giao mã nguồn, video hướng dẫn quản trị 1-1.", icon: GraduationCap },
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
                  <p className="text-sm text-foreground leading-relaxed flex-1 italic">
                    “{t.quote}”
                  </p>
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
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Cam kết HaiEduTech
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3">
                  Hoàn tiền 100% nếu không hài lòng trong 7 ngày đầu nghiệm thu
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
              Giá niêm yết minh bạch. Báo giá cuối cùng sẽ được điều chỉnh theo phạm vi và
              số lượng tính năng tuỳ biến thực tế của quý Thầy/Cô.
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
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              p.highlight ? "text-emerald-500" : "text-primary"
                            }`}
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
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
                Đăng ký tư vấn miễn phí
              </h2>
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
                      onValueChange={(v) =>
                        update("selected_package", v as FormState["selected_package"])
                      }
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
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary via-violet-500 to-emerald-500 flex items-center justify-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.25),transparent_55%)]" />
            {/* Subtitle bubble */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-md px-2 py-1 text-[10px] font-semibold text-foreground shadow">
              📖 IELTS Reading · Band 7.0+
            </div>
            <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-md px-2 py-1 text-[10px] font-bold shadow">
              HD
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl ring-4 ring-white/40">
              <Play className="w-7 h-7 text-primary fill-primary translate-x-0.5" />
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-amber-300 to-emerald-300" />
              </div>
              <div className="flex justify-between text-[10px] text-white/90 mt-1 font-medium">
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
              { l: "Đã làm", v: "9/12", bg: "from-emerald-100 to-emerald-50", tx: "text-emerald-700", border: "border-emerald-200" },
              { l: "Điểm TB", v: "8.4", bg: "from-amber-100 to-amber-50", tx: "text-amber-700", border: "border-amber-200" },
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
                🤖 Nghĩa là <strong>rất hiếm khi</strong>. Ví dụ:{" "}
                <em>I see him once in a blue moon.</em> – Tôi rất hiếm khi gặp anh ấy.
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
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
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
}> = [
  {
    feature: "Bảo mật & Lưu trữ video bài giảng",
    standard: { v: "Nhúng cơ bản (YouTube/Vimeo)" },
    advanced: { v: "Hosting bảo mật, chống tải xuống, watermark", ok: true },
  },
  {
    feature: "Tích hợp Trợ lý AI cho học sinh",
    standard: { v: "Không có" },
    advanced: { v: "Chatbot Perplexity/GPT huấn luyện theo tài liệu của Thầy/Cô", ok: true },
  },
  {
    feature: "Phân tích học tập (Learning Analytics)",
    standard: { v: "Biểu đồ tiến độ cơ bản" },
    advanced: { v: "AI cảnh báo học sinh yếu, metric hành vi chi tiết", ok: true },
  },
  {
    feature: "Email tự động & Giao dịch",
    standard: { v: "Thao tác thủ công" },
    advanced: { v: "Hóa đơn tự động, subdomain email thương hiệu riêng", ok: true },
  },
  {
    feature: "Chấm điểm tự động (quiz/bài tập)",
    standard: { v: "Trắc nghiệm tự động" },
    advanced: { v: "AI Smart Grading cho bài viết & nói", ok: true },
  },
  {
    feature: "Bảo trì & Cập nhật tính năng",
    standard: { v: "Giờ hành chính" },
    advanced: { v: "Ưu tiên + cập nhật tính năng theo quý", ok: true },
  },
];

const ComparisonTable = () => (
  <div className="mt-14 max-w-5xl mx-auto">
    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-2">
      Bảng So Sánh Tính Năng Giữa Các Gói
    </h3>
    <p className="text-center text-sm text-muted-foreground mb-6">
      Minh bạch hoàn toàn – Quý Thầy/Cô nắm rõ giá trị của từng gói trước khi quyết định.
    </p>
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-x-auto">
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow className="bg-secondary/40">
            <TableHead className="text-foreground font-semibold w-[40%]">
              Tính năng hệ thống
            </TableHead>
            <TableHead className="text-foreground font-semibold text-center">
              Gói Standard
            </TableHead>
            <TableHead className="text-foreground font-semibold text-center">
              <span className="inline-flex items-center gap-1 text-primary">
                <Crown className="w-3.5 h-3.5" /> Gói Advanced AI &amp; Data
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {COMPARISON_ROWS.map((r, i) => (
            <TableRow key={r.feature} className={i % 2 === 0 ? "" : "bg-secondary/20"}>
              <TableCell className="font-medium text-sm text-foreground align-top py-4">
                {r.feature}
              </TableCell>
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
];

const FaqSection = () => (
  <section className="py-16 sm:py-20 bg-secondary/30">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">
            Giải Đáp Thắc Mắc Thường Gặp
          </h2>
          <p className="mt-3 text-muted-foreground">
            Những câu hỏi quan trọng nhất từ quý Thầy/Cô trước khi đặt hàng.
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

