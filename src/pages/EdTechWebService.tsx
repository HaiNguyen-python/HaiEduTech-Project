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
  selected_package: z.enum(["standard", "advanced"]),
  special_requirements: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = {
  teacher_name: string;
  email: string;
  phone: string;
  subject_taught: string;
  selected_package: "standard" | "advanced";
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
];

const PACKAGES = [
  {
    id: "standard" as const,
    name: "Gói Standard",
    tagline: "Khởi đầu chuyên nghiệp",
    priceNote: "Liên hệ báo giá",
    highlight: false,
    icon: Rocket,
    features: [
      "Website LMS cốt lõi (responsive)",
      "Hệ thống bài quiz tự động chấm điểm",
      "Thiết lập tên miền (custom domain)",
      "Quản lý học viên & nhóm lớp cơ bản",
      "Hỗ trợ kỹ thuật trong giờ hành chính",
      "Bàn giao mã nguồn & tài liệu hướng dẫn",
    ],
  },
  {
    id: "advanced" as const,
    name: "Gói Advanced AI & Data",
    tagline: "Khuyên dùng cho lớp học hiện đại",
    priceNote: "Tư vấn theo nhu cầu",
    highlight: true,
    icon: Crown,
    features: [
      "Tất cả tính năng của gói Standard",
      "Tích hợp AI Chatbot trả lời học sinh 24/7",
      "Dashboard Learning Analytics nâng cao",
      "Email subdomain tự động (OTP, nhắc lịch, hóa đơn)",
      "AI Smart Grading cho bài viết / nói",
      "Bảo trì ưu tiên & cập nhật tính năng theo quý",
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
              Dịch Vụ Web EdTech – Made by HaiEduTech
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-tight">
              Nâng Tầm Lớp Học Với{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Website Giáo Dục Tích Hợp Data &amp; AI
              </span>{" "}
              Độc Quyền
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Giải pháp tailor-made kết hợp <strong className="text-foreground">15 năm kinh nghiệm sư phạm</strong>{" "}
              của Thầy Hải và chuyên môn{" "}
              <strong className="text-foreground">Data Engineering &amp; AI từ Bắc Âu (Phần Lan)</strong>.
              Dành riêng cho giáo viên muốn dạy học hiện đại, tự động hóa và đo lường được hiệu quả.
            </p>
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
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
              {[
                { k: "15+", v: "năm sư phạm" },
                { k: "AI-Native", v: "ngay từ đầu" },
                { k: "24h", v: "phản hồi tư vấn" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl border border-border bg-card/60 backdrop-blur px-3 py-3">
                  <div className="text-lg sm:text-xl font-bold text-foreground">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
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

      {/* Pricing */}
      <section id="packages" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-foreground">Các gói dịch vụ</h2>
            <p className="mt-3 text-muted-foreground">
              Lựa chọn gói phù hợp với quy mô lớp học của bạn. Báo giá chi tiết sẽ được gửi sau khi tư vấn.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PACKAGES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={
                  p.highlight
                    ? "relative rounded-2xl p-[2px] bg-gradient-to-br from-primary via-emerald-500 to-primary shadow-2xl shadow-primary/20"
                    : "relative"
                }
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-xs font-bold px-3 py-1 shadow-md">
                    <Crown className="w-3 h-3" /> Khuyên dùng
                  </div>
                )}
                <Card className={`h-full ${p.highlight ? "bg-card" : ""}`}>
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
                    <p className="mt-4 text-2xl font-bold text-foreground">{p.priceNote}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
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
                      onValueChange={(v) => update("selected_package", v as "standard" | "advanced")}
                    >
                      <SelectTrigger id="selected_package">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Gói Standard</SelectItem>
                        <SelectItem value="advanced">Gói Advanced AI &amp; Data (Khuyên dùng)</SelectItem>
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

export default EdTechWebService;
