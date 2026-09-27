import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Send, CheckCircle, UserPlus, Loader2, CreditCard, ArrowLeft, Landmark, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { getStripeEnvironment } from "@/lib/stripe";
import { tuitionBySubject, EUR_TO_VND } from "@/components/courses/CourseTuitionSection";
import { CourseBankTransfer } from "@/components/courses/CourseBankTransfer";
import { PaymentMethodMarks, BankRegionMarks } from "@/components/UpgradeAccountModal";
import cardPaymentBg from "@/assets/premium-card-payment-bg.jpg";
import bankTransferBg from "@/assets/premium-bank-transfer-bg.jpg";

const COURSES = Object.fromEntries(
  Object.values(tuitionBySubject).flat().map((course) => [course.key, course]),
) as Record<string, (typeof tuitionBySubject)["english"][number]>;

const registrationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(20).regex(/^[+()\d\s.-]+$/),
  email: z.union([z.literal(""), z.string().trim().email().max(255)]),
  program: z.string().trim().min(1).max(100),
  level: z.string().trim().max(100),
  message: z.string().trim().max(1000),
});

const Register = () => {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const key = params.get("course");
  const selectedCourse = key && Object.prototype.hasOwnProperty.call(COURSES, key) ? key : null;
  const course = selectedCourse ? COURSES[selectedCourse] : null;
  const classType = params.get("class") === "private" ? "private" : "group";
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "checking" | "paid" | "pending" | "error">("idle");
  const [payMethod, setPayMethod] = useState<"card" | "bank" | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthenticated(Boolean(data.user)));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setAuthenticated(Boolean(session?.user)));
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId || params.get("checkout") !== "success" || !selectedCourse) return;
    setPaymentStatus("checking");
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("verify-checkout-session", { body: { sessionId, environment: getStripeEnvironment() } });
        if (error) throw error;
        setPaymentStatus(data?.activated && data?.course && data?.priceId === `class_${selectedCourse}_${classType}` ? "paid" : "pending");
      } catch { setPaymentStatus("error"); }
    })();
    // Keep session ID for retry on refresh when payment confirmation is delayed.
  }, [params, selectedCourse, classType]);
  const returnUrl = useMemo(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("checkout", "success");
    url.searchParams.delete("session_id");
    return `${url.toString()}&session_id={CHECKOUT_SESSION_ID}`;
  }, [selectedCourse, classType]);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: selectedCourse ? `course:${selectedCourse}` : "",
    programOther: "",
    level: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailNotificationSent, setEmailNotificationSent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (selectedCourse) setForm((current) => ({ ...current, program: `course:${selectedCourse}` }));
  }, [selectedCourse]);

  const programs = [
    ...Object.entries(COURSES).map(([value, c]) => ({ value: `course:${value}`, label: t(c.nameVi, c.nameEn) })),
    { value: "english-cambridge", label: t("Tiếng Anh – Cambridge (Starters–PET)", "English – Cambridge (Starters–PET)") },
    { value: "english-ielts", label: t("Tiếng Anh – Luyện thi IELTS", "English – IELTS Preparation") },
    { value: "english-toeic", label: t("Tiếng Anh – TOEIC", "English – TOEIC") },
    { value: "english-highschool", label: t("Tiếng Anh – Luyện thi THPT Quốc gia", "English – National High School Exam") },
    { value: "chinese-elementary", label: t("Tiếng Trung – Sơ cấp", "Chinese – Elementary") },
    { value: "chinese-hsk", label: t("Tiếng Trung – Luyện thi HSK", "Chinese – HSK Preparation") },
    { value: "chinese-conversation", label: t("Tiếng Trung – Giao tiếp", "Chinese – Conversational") },
    { value: "programming", label: t("Lập trình / AI / Data", "Programming / AI / Data") },
    { value: "other", label: t("Khác (tự điền)", "Other (please specify)") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProgram = form.program === "other" ? form.programOther : form.program;
    const parsed = registrationSchema.safeParse({
      name: form.name,
      phone: form.phone,
      email: form.email,
      program: selectedProgram,
      level: form.level,
      message: form.message,
    });

    if (!parsed.success) {
      toast({
        title: t("Vui lòng kiểm tra lại thông tin", "Please check your information"),
        description: t(
          "Họ tên, số điện thoại và chương trình là bắt buộc. Email và độ dài các nội dung phải hợp lệ.",
          "Name, phone number and program are required. Please also check the email and field lengths.",
        ),
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const clean = parsed.data;
      const programLabel =
        form.program === "other"
          ? clean.program
          : programs.find((p) => p.value === form.program)?.label || form.program;
      const courseLabel = selectedCourse && form.program === `course:${selectedCourse}`
        ? `${programLabel} - ${classType === "private" ? "1-1" : t("Lớp nhóm", "Group class")}`
        : programLabel;
      const { error: insertError } = await supabase.from("course_registrations").insert({
        name: clean.name,
        phone: clean.phone,
        email: clean.email || null,
        program: courseLabel,
        level: clean.level || null,
        message: clean.message || null,
      });
      if (insertError) throw insertError;

      const submittedAt = new Date().toLocaleString("vi-VN", {
        dateStyle: "short",
        timeStyle: "short",
      });

      let notificationSent = false;
      try {
        const { data: emailResult, error: emailError } = await supabase.functions.invoke("send-contact-email", {
          body: {
            type: "course_registration",
            idempotencyKey: `course-registration-${clean.phone}-${Date.now()}`,
            name: clean.name,
            email: clean.email || undefined,
            phone: clean.phone,
            subject: `[Đăng ký khóa học] ${courseLabel}`,
            program: courseLabel,
            level: clean.level || undefined,
            message: clean.message || undefined,
            submittedAt,
          },
        });
        notificationSent = !emailError && emailResult?.success === true;
      } catch (emailError) {
        console.error("Registration email notification failed:", emailError);
      }

      setEmailNotificationSent(notificationSent);
      setSubmitted(true);
      toast({
        title: notificationSent
          ? t("Đăng ký thành công!", "Registration successful!")
          : t("Đã lưu đăng ký", "Registration saved"),
        description: notificationSent
          ? t("Chúng tôi sẽ liên hệ bạn sớm nhất.", "We will contact you shortly.")
          : t(
              "Email thông báo đang tạm gián đoạn, nhưng thông tin của bạn đã được lưu và không cần gửi lại.",
              "Email notification is temporarily unavailable, but your details were saved and you do not need to resubmit.",
            ),
        variant: notificationSent ? "default" : "destructive",
      });
    } catch (err: unknown) {
      const description = err instanceof Error ? err.message : "";
      toast({
        title: t("Có lỗi xảy ra", "Something went wrong"),
        description,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };


  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const subjectPath = selectedCourse ? `/${String(selectedCourse).split("_")[0]}` : "/";
  const goBack = () => {
    if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) navigate(-1);
    else navigate(subjectPath);
  };
  const backButton = (
    <Button type="button" variant="ghost" size="sm" onClick={goBack} className="mb-4 -ml-3 gap-2 text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> {t("Quay lại", "Back")}
    </Button>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-5xl mx-auto px-5 sm:px-8"
          >
            <div className="text-left">{backButton}</div>
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
             <h2 className="text-center text-2xl font-display font-bold text-foreground mb-2">
              {t("Cảm ơn bạn đã đăng ký!", "Thank you for registering!")}
            </h2>
             <p className="mx-auto max-w-xl text-center text-muted-foreground mb-8">
              {emailNotificationSent
                ? t(
                    "Chúng tôi đã nhận được thông tin đăng ký của bạn. Thầy Hải sẽ liên hệ bạn trong thời gian sớm nhất để tư vấn chi tiết.",
                    "We have received your registration. Teacher Hai will contact you shortly for detailed consultation.",
                  )
                : t(
                    "Thông tin đăng ký của bạn đã được lưu. Email thông báo đang tạm gián đoạn; bạn không cần gửi lại biểu mẫu.",
                    "Your registration has been saved. Email notification is temporarily unavailable; you do not need to submit the form again.",
                  )}
            </p>
             {course && <div className="mb-8 border-t border-border pt-7 text-left">
               <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                 <div>
                   <h3 className="text-xl font-display font-bold text-foreground">{t("Thanh toán khóa học", "Pay for the course")}</h3>
                   <p className="mt-1 text-sm text-muted-foreground">{t(course.nameVi, course.nameEn)} · {classType === "private" ? "1-1" : t("Lớp nhóm", "Group class")}</p>
                 </div>
                 <p className="font-display text-2xl font-bold text-foreground">{course.groupPrice * (classType === "private" ? 3 : 1)} EUR</p>
               </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="tablist">
                  {([
                    {
                      id: "card" as const,
                      icon: CreditCard,
                      label: t("Card Payment", "Card Payment"),
                      sub: t(
                        `${course.groupPrice * (classType === "private" ? 3 : 1)} EUR · ${new Intl.NumberFormat("vi-VN").format(course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND)}₫ / khóa`,
                        `${course.groupPrice * (classType === "private" ? 3 : 1)} EUR · ${new Intl.NumberFormat("vi-VN").format(course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND)}₫ / course`,
                      ),
                      image: cardPaymentBg,
                    },
                    {
                      id: "bank" as const,
                      icon: Landmark,
                      label: t("Bank Transfer", "Bank Transfer"),
                      sub: t(
                        `${course.groupPrice * (classType === "private" ? 3 : 1)} EUR · ${new Intl.NumberFormat("vi-VN").format(course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND)}₫ / khóa`,
                        `${course.groupPrice * (classType === "private" ? 3 : 1)} EUR · ${new Intl.NumberFormat("vi-VN").format(course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND)}₫ / course`,
                      ),
                      image: bankTransferBg,
                    },
                  ]).map((o) => (
                    <Button key={o.id} role="tab" aria-selected={payMethod === o.id}
                      onClick={() => setPayMethod(payMethod === o.id ? null : o.id)}
                      variant="outline"
                      className={`group relative h-[168px] overflow-hidden whitespace-normal border-2 p-0 text-left ${payMethod === o.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}>
                      <img src={o.image} alt="" loading="lazy" width={1200} height={608} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                      <span className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20" />
                      <span className="relative mt-auto flex w-full flex-col items-start gap-1 p-4">
                        <span className="flex w-full items-center gap-2 text-base font-extrabold text-foreground"><o.icon className="h-5 w-5 text-primary" />{o.label}{payMethod === o.id && <BadgeCheck className="ml-auto h-5 w-5 text-primary" />}</span>
                        <span className="text-sm font-bold text-primary">{o.sub}</span>
                        {o.id === "card" ? <PaymentMethodMarks /> : <BankRegionMarks />}
                      </span>
                    </Button>
                  ))}
                </div>
                {payMethod === "card" && (
                  <div className="mt-3 rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                    <PaymentTestModeBanner />
                    {!authenticated ? <Button asChild className="w-full"><Link to={`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`}>{t("Đăng nhập để thanh toán", "Sign in to pay")}</Link></Button>
                      : <div className="min-w-0"><StripeEmbeddedCheckout key={`${selectedCourse}-${classType}`} priceId={`class_${selectedCourse}_${classType}`} returnUrl={returnUrl} /></div>}
                  </div>
                )}
                {payMethod === "bank" && (
                  <div className="mt-3">
                    {paymentStatus === "paid" ? <p className="text-sm font-semibold text-primary">{t("Thanh toán đã được xác nhận.", "Payment confirmed.")}</p> : <CourseBankTransfer
                      eur={course.groupPrice * (classType === "private" ? 3 : 1)}
                      vnd={course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND}
                      reference={`${course.nameEn}_${form.name.trim().replace(/\s+/g, " ")}`}
                    />}
                  </div>
                )}
            </div>}
             <div className="text-center"><Button
              onClick={() => setSubmitted(false)}
              size="lg"
            >
              {t("Đăng ký thêm", "Register another")}
             </Button></div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
            {backButton}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <UserPlus className="w-3 h-3" /> {t("Đăng ký khóa học", "Course Registration")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Đăng ký ", "Register for ")}
              <span className="text-gradient">{t("khóa học", "a course")}</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Điền thông tin bên dưới để đăng ký khóa học. Thầy Hải sẽ liên hệ tư vấn cho bạn.",
                "Fill in the form below to register for a course. Teacher Hai will contact you for consultation."
              )}
            </p>
            {course && <div className="mb-7 border-y border-border bg-muted/30 py-5">
              <p className="font-display text-xl font-bold text-foreground">{t(course.nameVi, course.nameEn)}</p>
              <p className="text-sm text-muted-foreground">12 tuần / 12 weeks · 24 buổi - 36 giờ</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant={classType === "group" ? "default" : "outline"} onClick={() => { const next = new URLSearchParams(params); next.set("class", "group"); next.delete("checkout"); next.delete("session_id"); setParams(next); setPaymentStatus("idle"); }}>Lớp nhóm / Group · {course.groupPrice} EUR</Button>
                <Button type="button" variant={classType === "private" ? "default" : "outline"} onClick={() => { const next = new URLSearchParams(params); next.set("class", "private"); next.delete("checkout"); next.delete("session_id"); setParams(next); setPaymentStatus("idle"); }}>Kèm 1-1 · {course.groupPrice * 3} EUR</Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">≈ {new Intl.NumberFormat("vi-VN").format(course.groupPrice * (classType === "private" ? 3 : 1) * EUR_TO_VND)}₫</p>
            </div>}
            {paymentStatus === "paid" && <p role="status" className="mb-5 font-semibold text-primary">{t("Đã nhận thanh toán. Thầy Hải sẽ liên hệ để xếp lớp.", "Payment received. Teacher Hai will contact you about scheduling.")}</p>}
            {(paymentStatus === "pending" || paymentStatus === "error") && <p role="status" className="mb-5 text-destructive">{t("Chưa xác nhận được thanh toán. Hãy liên hệ thầy Hải trước khi thử thanh toán lại.", "Payment is not confirmed. Contact Teacher Hai before trying to pay again.")}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Họ và tên", "Full Name")} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("Nguyễn Văn A", "John Doe")}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Số điện thoại", "Phone Number")} <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Chương trình học", "Program")} <span className="text-destructive">*</span>
                </label>
                <select
                  value={form.program}
                  onChange={(e) => {
                    updateField("program", e.target.value);
                    const nextCourse = e.target.value.startsWith("course:") ? e.target.value.slice(7) : "";
                    const next = new URLSearchParams(params);
                    if (nextCourse && Object.prototype.hasOwnProperty.call(COURSES, nextCourse)) next.set("course", nextCourse);
                    else next.delete("course");
                    next.delete("checkout"); next.delete("session_id");
                    setParams(next); setPaymentStatus("idle");
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">{t("-- Chọn chương trình --", "-- Select program --")}</option>
                  {programs.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                {form.program === "other" && (
                  <input
                    type="text"
                    value={form.programOther}
                    onChange={(e) => updateField("programOther", e.target.value)}
                    placeholder={t("Nhập tên khóa học bạn muốn đăng ký...", "Enter the course you want to register for...")}
                    className="mt-2 w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    maxLength={200}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Trình độ hiện tại", "Current Level")}
                </label>
                <input
                  type="text"
                  value={form.level}
                  onChange={(e) => updateField("level", e.target.value)}
                  placeholder={t("Ví dụ: Mới bắt đầu, IELTS 5.0, HSK 2...", "E.g., Beginner, IELTS 5.0, HSK 2...")}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Ghi chú thêm", "Additional Notes")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t("Mục tiêu học tập, thời gian mong muốn...", "Learning goals, preferred schedule...")}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  maxLength={1000}
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full gap-2 shadow-lg shadow-primary/20"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {submitting ? t("Đang gửi...", "Sending...") : t("Gửi đăng ký", "Submit Registration")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
