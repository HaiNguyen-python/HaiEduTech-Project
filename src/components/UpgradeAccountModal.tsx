/**
 * @file UpgradeAccountModal.tsx
 * @description Premium upgrade modal with bank transfer info, VietQR, and Supabase ticket flow.
 */
import { PlanComparison } from "@/components/premium/ConversionBits";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Copy, Check, X, ShieldCheck, Sparkles, Loader2, BadgeCheck, KeyRound, CreditCard, Landmark, BookOpenCheck, BrainCircuit, Bot, Gamepad2, GraduationCap, Headphones, LibraryBig, Rocket, ScrollText, Trophy } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PREMIUM_PRICE_ID } from "@/lib/stripe";
import { PREMIUM_CHANGED_EVENT, usePremium } from "@/hooks/usePremium";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import qrImage from "@/assets/vietcombank-qr.png";
import cardPaymentBg from "@/assets/premium-card-payment-bg.jpg";
import bankTransferBg from "@/assets/premium-bank-transfer-bg.jpg";

interface UpgradeAccountModalProps {
  open: boolean;
  onClose: () => void;
  user: { id: string; email?: string | null } | null;
}

const BANK = {
  name: "Vietcombank",
  account: "1025536199",
  holder: "NGUYEN TRAN THANH HAI",
  branch: "Trụ sở CN Tân Bình",
};

const BANK_FI = {
  name: "Nordea",
  account: "FI09 1040 3500 5258 23",
  holder: "Nguyen Tran Thanh Hai",
};

const UpgradeAccountModal = ({ open, onClose, user }: UpgradeAccountModalProps) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState<"code" | "online" | "bank">("code");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const paymentOptionsRef = useRef<HTMLDivElement>(null);
  const premium = usePremium();
  const prefersReducedMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const autoplay = useMemo(() => Autoplay({ delay: 3200, stopOnInteraction: true, stopOnMouseEnter: true }), []);
  const returnUrl = useMemo(() => {
    const u = new URL(window.location.href);
    u.searchParams.set("checkout", "success");
    return `${u.toString()}&session_id={CHECKOUT_SESSION_ID}`;
  }, [open]);

  const redeem = async () => {
    if (!user) { toast.error(t("Vui lòng đăng nhập trước", "Please log in first")); return; }
    setSubmitting(true); setCodeError(null);
    const { data, error } = await supabase.functions.invoke("redeem-activation-code", { body: { code } });
    setSubmitting(false);
    if (error || !data?.ok) {
      let reason = "invalid_code";
      try { reason = (await (error as any)?.context?.json())?.error ?? reason; } catch { /* ignore */ }
      setCodeError(reason === "already_redeemed"
        ? t("Tài khoản này đã dùng mã kích hoạt rồi.", "This account has already used an activation code.")
        : t("Mã kích hoạt không đúng.", "Invalid activation code."));
      return;
    }
    window.dispatchEvent(new Event(PREMIUM_CHANGED_EVENT));
    toast.success(t("Đã kích hoạt Premium 12 tháng!", "Premium activated for 12 months!"));
    setSuccess(true);
    setTimeout(() => { onClose(); }, 2200);
  };

  // Build a unique transfer reference per student
  const transferRef = useMemo(() => {
    const handle = (user?.email?.split("@")[0] || user?.id?.slice(0, 8) || "GUEST")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
    return `HAIEDUTECH_UPGRADE_${handle}`;
  }, [user]);

  // Display-friendly transfer note example (always shows generic placeholder)
  const transferRefDisplay = "HAIEDUTECH_UPGRADE_TÊN CỦA BẠN";

  useEffect(() => {
    if (!open) {
      // Reset when fully closed
      setTimeout(() => { setSuccess(false); setSubmitting(false); setShowCheckout(false); setCode(""); setCodeError(null); }, 300);
    }
  }, [open]);

  const copy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success(t("Đã sao chép", "Copied"));
      setTimeout(() => setCopied(null), 1500);
    } catch {
      toast.error(t("Không thể sao chép", "Copy failed"));
    }
  };

  const handleConfirm = async () => {
    if (!user) {
      toast.error(t("Vui lòng đăng nhập trước", "Please log in first"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("user_subscriptions").insert({
      user_id: user.id,
      status: "pending_verification",
      plan: "premium",
      source: "bank",
      transfer_reference: transferRef,
      user_email: user.email ?? null,
      requested_at: new Date().toISOString(),
    });
    setSubmitting(false);
    if (error) {
      toast.error(t("Có lỗi xảy ra, thử lại", "Something went wrong"));
      return;
    }
    setSuccess(true);
    setTimeout(() => { onClose(); }, 2600);
  };

  const features = [
    { icon: BookOpenCheck, title: t("Mở mọi khóa học", "All Courses Unlocked"), desc: t("English, Trung, Phần Lan, Việt, Nhật, Lập trình", "English, Chinese, Finnish, Vietnamese, Japanese, Programming") },
    { icon: ScrollText, title: t("Trọn kho đề thi", "Full Mock Exam Library"), desc: t("125+ đề Cambridge, IELTS, TOEIC, THPT", "125+ Cambridge, IELTS, TOEIC, THPT exams") },
    { icon: Bot, title: t("AI chấm không giới hạn", "Unlimited AI Grading"), desc: t("Chấm Writing & Speaking band 7.5+ không giới hạn", "Unlimited Writing & Speaking grading, band 7.5+") },
    { icon: Trophy, title: t("Chứng chỉ hoàn thành", "Completion Certificates"), desc: t("Business, Academic, AI Academy - xác thực online", "Business, Academic, AI Academy - verifiable online") },
    { icon: BrainCircuit, title: t("Learning DNA & báo cáo", "Learning DNA & Reports"), desc: t("Radar kỹ năng + PDF báo cáo tiến bộ", "Skill radar + progress PDF reports") },
    { icon: Gamepad2, title: t("Trò chơi & bảng xếp hạng", "Games & Leaderboards"), desc: t("Game Center, Climber, Duel 1v1 toàn trang", "Game Center, Climber, site-wide Duel 1v1") },
    { icon: LibraryBig, title: t("Siêu từ điển & sổ tay", "Super Dictionary & Notebook"), desc: t("Từ điển, flashcard, Daily Word Mission đầy đủ", "Full dictionary, flashcards, Daily Word Mission") },
    { icon: GraduationCap, title: t("Học bổng & sự nghiệp", "Scholarship & Career Advisor"), desc: t("Tư vấn học bổng AI + lộ trình sự nghiệp", "AI scholarship advice + career roadmap") },
    { icon: Rocket, title: t("Nhận bài mới sớm nhất", "New Lessons First"), desc: t("Nhận bài học mới cập nhật hằng ngày", "Get brand-new lessons added daily") },
    { icon: Headphones, title: t("Hỗ trợ ưu tiên", "Priority Support"), desc: t("Hỗ trợ ưu tiên trực tiếp từ Thầy Hải", "Priority support directly from Teacher Hai") },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
          >
            {/* Premium header */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 px-5 sm:px-8 py-4 text-white">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Crown className="w-5 h-5 text-yellow-100" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-yellow-100/90 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> HaiEduTech Premium
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold leading-tight">
                  {t("Mở khoá Premium vĩnh viễn & Bứt phá việc học!", "Unlock Premium Features & Level Up Your Learning!")}
                  </h2>
                </div>
              </div>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="px-6 py-8 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <BadgeCheck className="w-9 h-9 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {t("Cảm ơn bạn! 🎉", "Thank you! 🎉")}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {tab === "bank"
                    ? t("Thầy Hải đang xác minh giao dịch của bạn. Tài khoản sẽ được nâng cấp ngay sau khi xác nhận.", "Teacher Hai is verifying your transfer. Your account will be upgraded shortly.")
                    : t("Tài khoản của bạn đã được mở khóa toàn bộ nội dung trong 12 tháng.", "Your account now has full access for 12 months.")}
                </p>
              </motion.div>
            ) : (
              <div className="px-5 sm:px-8 py-4 space-y-3">
                 <PlanComparison onChoosePremium={() => { setTab("online"); requestAnimationFrame(() => paymentOptionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })); }} />
                 {/* Premium perks carousel */}
                 <div className="rounded-lg border border-border bg-muted/25 p-3 sm:p-4">
                   <div className="mb-3 flex items-center justify-between gap-3">
                   <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {t("Đặc quyền Premium", "Premium Perks")}
                  </h3>
                   <span className="text-xs font-medium text-muted-foreground">{t("Tự động khám phá", "Auto explore")}</span>
                   </div>
                   <Carousel opts={{ align: "start", loop: true }} plugins={prefersReducedMotion ? [] : [autoplay]} className="px-9" aria-label={t("Đặc quyền Premium", "Premium perks")}>
                     <CarouselContent className="-ml-3">
                       {features.map((f) => (
                         <CarouselItem key={f.title} className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3">
                           <div className="flex h-full min-h-[116px] items-start gap-3 rounded-md border border-primary/20 bg-card p-3 shadow-sm transition hover:border-primary/50 hover:shadow-md">
                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><f.icon className="h-5 w-5" /></div>
                             <div className="min-w-0">
                               <div className="text-base font-bold leading-tight text-foreground">{f.title}</div>
                               <div className="mt-1.5 text-sm leading-snug text-muted-foreground">{f.desc}</div>
                             </div>
                           </div>
                         </CarouselItem>
                       ))}
                     </CarouselContent>
                     <CarouselPrevious className="left-0 border-primary/30 bg-card" aria-label={t("Đặc quyền trước", "Previous perk")} />
                     <CarouselNext className="right-0 border-primary/30 bg-card" aria-label={t("Đặc quyền tiếp theo", "Next perk")} />
                   </Carousel>
                </div>

                {premium.isPremium && !premium.isStaff && premium.expiresAt && (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-foreground">
                    {t("Premium của bạn còn hạn đến", "Your Premium is active until")} <strong>{new Date(premium.expiresAt).toLocaleDateString()}</strong>. {t("Thanh toán thêm sẽ cộng tiếp 12 tháng.", "Paying again adds another 12 months.")}
                  </div>
                )}
                <button
                  onClick={() => setTab("code")}
                  className={`w-full rounded-lg border border-dashed px-3 py-2 text-xs font-medium transition ${tab === "code" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
                >
                  {t("Học viên nội bộ - Dùng mã kích hoạt", "Internal student - Use activation code")}
                </button>

                {tab === "code" && (
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {t("Dành cho học viên nội bộ của thầy Hải. Nhập mã để mở khóa toàn bộ nội dung trong 12 tháng.", "For Teacher Hai's enrolled students. Enter your code to unlock everything for 12 months.")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input value={code} onChange={(e) => setCode(e.target.value)} maxLength={64}
                        onKeyDown={(e) => { if (e.key === "Enter" && code.trim()) redeem(); }}
                        placeholder={t("Nhập mã kích hoạt", "Enter activation code")}
                        className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                      <button onClick={redeem} disabled={submitting || !user || !code.trim()}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60 flex items-center justify-center gap-2">
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />} {t("Kích hoạt", "Activate")}
                      </button>
                    </div>
                    {codeError && <p className="text-sm font-medium text-destructive">{codeError}</p>}
                    <p className="text-xs text-muted-foreground">{t("Chưa có mã? Chọn Thanh toán online.", "No code? Choose Pay online.")}</p>
                  </div>
                )}

                 <div ref={paymentOptionsRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="tablist">
                  {([
                     { id: "online", icon: CreditCard, label: t("Card Payment", "Card Payment"), sub: "Only 19 EUR / year", image: cardPaymentBg },
                     { id: "bank", icon: Landmark, label: t("Bank Transfer", "Bank Transfer"), sub: "Only 19 EUR/ year (599k VND)", image: bankTransferBg },
                  ] as const).map((o) => (
                     <Button key={o.id} role="tab" aria-selected={tab === o.id} onClick={() => setTab(o.id)} variant="outline"
                       className={`group relative h-[168px] overflow-hidden whitespace-normal border-2 p-0 text-left ${tab === o.id ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}>
                       <img src={o.image} alt="" loading="lazy" width={1200} height={608} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                       <span className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20" />
                       <span className="relative mt-auto flex w-full flex-col items-start gap-1 p-4">
                         <span className="flex w-full items-center gap-2 text-base font-extrabold text-foreground"><o.icon className="h-5 w-5 text-primary" />{o.label}{tab === o.id && <BadgeCheck className="ml-auto h-5 w-5 text-primary" />}</span>
                         <span className="text-sm font-bold text-primary">{o.sub}</span>
                         {o.id === "online" ? <PaymentMethodMarks /> : <BankRegionMarks />}
                       </span>
                     </Button>
                  ))}
                </div>
                {tab === "online" && (
                  <div className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                    <PaymentTestModeBanner />
                    {!showCheckout ? (
                      <div className="text-center space-y-3 py-2">
                        <div className="text-3xl font-extrabold text-foreground">19 EUR <span className="text-base font-medium text-muted-foreground">/ {t("năm", "year")}</span></div>
                        <p className="text-sm text-muted-foreground">{t("Thanh toán 1 lần bằng thẻ, Apple Pay hoặc Google Pay. Mở khóa toàn bộ nội dung trong 12 tháng, không tự động gia hạn.", "One-time payment by card, Apple Pay or Google Pay. Full access for 12 months, no automatic renewal.")}</p>
                         <Button onClick={() => setShowCheckout(true)} disabled={!user} size="lg" className="w-full font-bold sm:w-auto">
                          {t("Tiếp tục thanh toán", "Continue to payment")}
                         </Button>
                      </div>
                    ) : (
                      <StripeEmbeddedCheckout priceId={PREMIUM_PRICE_ID} returnUrl={returnUrl} />
                    )}
                  </div>
                )}

                {tab === "bank" && (<>
                {/* Payment block */}
                <div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                     <VietnamMark />
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-foreground">
                      {t("Chuyển khoản tại Việt Nam", "Bank Transfer in Vietnam")}
                    </h3>
                    <span className="ml-auto rounded-full bg-amber-100 dark:bg-amber-900/40 px-2.5 py-1 text-xs font-bold text-amber-800 dark:text-amber-200">
                      599.000đ / {t("năm", "year")}
                    </span>
                  </div>

                  <div className="mb-2 px-3 py-1.5 rounded-lg bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300/60 dark:border-amber-700/40 text-xs font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 shrink-0" />
                    {t(
                      "Chuyển khoản trong nước (Việt Nam) - thầy Hải duyệt thủ công.",
                      "Domestic transfer (Vietnam) - approved manually by Teacher Hai.",
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-3 items-start">
                    {/* QR */}
                    <div className="mx-auto md:mx-0 bg-white rounded-xl p-1.5 shadow-sm border border-amber-200">
                      <img src={qrImage} alt="VietQR Vietcombank" className="w-[200px] h-auto rounded-md" loading="lazy" />
                      <div className="text-[10px] text-center text-muted-foreground mt-0.5 font-medium">
                        {t("Quét VietQR để chuyển nhanh", "Scan VietQR to pay")}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5">
                      <Row label={t("Ngân hàng", "Bank")} value={BANK.name} />
                      <Row
                        label={t("Số tài khoản", "Account No.")}
                        value={BANK.account}
                        copyable
                        copied={copied === "acc"}
                        onCopy={() => copy(BANK.account, "acc")}
                        big
                      />
                      <Row label={t("Chủ tài khoản", "Account Holder")} value={BANK.holder} />
                      <Row label={t("Chi nhánh", "Branch")} value={BANK.branch} />
                      <Row
                        label={t("Số tiền", "Amount")}
                        value="599.000đ"
                        copyable
                        copied={copied === "amount"}
                        onCopy={() => copy("599000", "amount")}
                        big
                      />
                      <Row
                        label={t("Nội dung CK", "Transfer Note")}
                        value={transferRefDisplay}
                        copyable
                        copied={copied === "ref"}
                        onCopy={() => copy(transferRef, "ref")}
                        mono
                      />
                    </div>
                  </div>
                </div>

                {/* Finland transfer block */}
                <div className="rounded-xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                     <EuropeMark />
                    <ShieldCheck className="w-5 h-5 text-sky-600" />
                    <h3 className="text-base font-bold text-foreground">
                      {t("Chuyển khoản tại Phần Lan", "Bank Transfer in Finland")}
                    </h3>
                    <span className="ml-auto rounded-full bg-sky-100 dark:bg-sky-900/40 px-2.5 py-1 text-xs font-bold text-sky-800 dark:text-sky-200">
                      19 EUR / {t("năm", "year")}
                    </span>
                  </div>

                  <div className="mb-2 px-3 py-1.5 rounded-lg bg-sky-100/70 dark:bg-sky-900/30 border border-sky-300/60 dark:border-sky-700/40 text-xs font-semibold text-sky-900 dark:text-sky-100 flex items-center gap-2">
                    <Landmark className="w-3.5 h-3.5 text-sky-600 dark:text-sky-300 shrink-0" />
                    {t(
                      "Chuyển khoản SEPA (Phần Lan) - thầy Hải duyệt thủ công.",
                      "SEPA transfer (Finland) - approved manually by Teacher Hai.",
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Row tone="sky" label={t("Ngân hàng", "Bank")} value={BANK_FI.name} />
                    <Row
                      tone="sky"
                      label="IBAN"
                      value={BANK_FI.account}
                      copyable
                      copied={copied === "iban"}
                      onCopy={() => copy(BANK_FI.account.replace(/\s/g, ""), "iban")}
                      big
                      mono
                    />
                    <Row tone="sky" label={t("Chủ tài khoản", "Account Holder")} value={BANK_FI.holder} />
                    <Row
                      tone="sky"
                      label={t("Số tiền", "Amount")}
                      value="19 EUR"
                      copyable
                      copied={copied === "amount-fi"}
                      onCopy={() => copy("19", "amount-fi")}
                      big
                    />
                    <Row
                      tone="sky"
                      label={t("Nội dung CK", "Transfer Note")}
                      value={transferRefDisplay}
                      copyable
                      copied={copied === "ref-fi"}
                      onCopy={() => copy(transferRef, "ref-fi")}
                      mono
                    />
                  </div>
                </div>

                {/* Confirm button */}
                <button
                  onClick={handleConfirm}
                  disabled={submitting || !user}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> {t("Đang gửi...", "Submitting...")}</>
                  ) : (
                    <><Check className="w-4 h-4" /> {t("Xác nhận đã chuyển khoản", "I Have Transferred")}</>
                  )}
                </button>
                {!user && (
                  <p className="text-xs text-center text-muted-foreground">
                    {t("Vui lòng đăng nhập để gửi xác nhận.", "Please log in to submit your confirmation.")}
                  </p>
                )}
                </>)}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PaymentMethodMarks = () => (
  <span className="mt-1 flex flex-wrap items-center gap-1.5" aria-label="Visa, Mastercard, Apple Pay, Google Pay">
    <span className="rounded bg-card px-2 py-1 text-xs font-black italic text-primary shadow-sm">VISA</span>
    <span className="flex items-center rounded bg-card px-2 py-1 shadow-sm">
      <span className="h-4 w-4 rounded-full bg-destructive" />
      <span className="-ml-1.5 h-4 w-4 rounded-full bg-accent" />
      <span className="ml-1 text-[10px] font-bold text-foreground">mastercard</span>
    </span>
    <span className="rounded bg-foreground px-2 py-1 text-[11px] font-bold text-background">Apple Pay</span>
    <span className="rounded bg-card px-2 py-1 text-[11px] font-bold text-foreground shadow-sm"><span className="text-primary">G</span> Pay</span>
  </span>
);

const VietnamMark = () => (
  <span className="relative inline-flex h-7 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-destructive shadow-sm" aria-label="Vietnam">
    <span className="text-sm text-accent">★</span>
  </span>
);

const EuropeMark = () => (
  <span className="relative inline-flex h-7 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-primary shadow-sm" aria-label="European Union">
    <span className="text-[9px] tracking-[1px] text-accent">✦✦✦</span>
  </span>
);

const BankRegionMarks = () => (
  <span className="mt-1 flex items-center gap-2">
    <span className="flex items-center gap-1 rounded bg-card px-2 py-1 text-[11px] font-bold text-foreground shadow-sm"><VietnamMark /> Vietnam</span>
    <span className="flex items-center gap-1 rounded bg-card px-2 py-1 text-[11px] font-bold text-foreground shadow-sm"><EuropeMark /> EU / SEPA</span>
  </span>
);

interface RowProps {
  label: string; value: string;
  copyable?: boolean; copied?: boolean; onCopy?: () => void;
  big?: boolean; mono?: boolean; tone?: "amber" | "sky";
}
const Row = ({ label, value, copyable, copied, onCopy, big, mono, tone = "amber" }: RowProps) => (
  <div className={`grid grid-cols-[110px_1fr_auto] items-center gap-2 py-1.5 border-b last:border-0 ${tone === "sky" ? "border-sky-200/50 dark:border-sky-800/30" : "border-amber-200/50 dark:border-amber-800/30"}`}>
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <span className={`text-foreground break-all text-right ${big ? "text-sm sm:text-base font-extrabold tracking-wider" : "text-xs font-semibold"} ${mono ? "font-mono text-xs sm:text-sm" : ""}`}>
      {value}
    </span>
    {copyable ? (
      <button
        onClick={onCopy}
        className={`p-1 rounded-md bg-white dark:bg-card border transition shrink-0 ${tone === "sky" ? "border-sky-300 dark:border-sky-700 hover:bg-sky-100 dark:hover:bg-sky-900/30" : "border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30"}`}
        aria-label="Copy"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className={`w-3.5 h-3.5 ${tone === "sky" ? "text-sky-700 dark:text-sky-400" : "text-amber-700 dark:text-amber-400"}`} />}
      </button>
    ) : (
      <div className="w-[27px]" />
    )}
  </div>
);

export default UpgradeAccountModal;
