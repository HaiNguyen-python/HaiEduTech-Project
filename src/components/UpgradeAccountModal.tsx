/**
 * @file UpgradeAccountModal.tsx
 * @description Premium upgrade modal with bank transfer info, VietQR, and Supabase ticket flow.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Copy, Check, X, ShieldCheck, Sparkles, Loader2, BadgeCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import qrImage from "@/assets/vietcombank-qr.png";

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

const UpgradeAccountModal = ({ open, onClose, user }: UpgradeAccountModalProps) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setTimeout(() => { setSuccess(false); setSubmitting(false); }, 300);
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
    const { error } = await supabase.from("user_subscriptions").upsert(
      {
        user_id: user.id,
        status: "pending_verification",
        plan: "premium",
        transfer_reference: transferRef,
        user_email: user.email ?? null,
        requested_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
    setSubmitting(false);
    if (error) {
      toast.error(t("Có lỗi xảy ra, thử lại", "Something went wrong"));
      return;
    }
    setSuccess(true);
    setTimeout(() => { onClose(); }, 2600);
  };

  const features = [
    { icon: "🎯", title: t("Full Exam Engine", "Full Exam Engine"), desc: t("Toàn bộ đề thi & chấm Smart", "All mock exams & Smart grading") },
    { icon: "👁️", title: t("AI Vision Sandbox", "AI Vision Sandbox"), desc: t("Thực hành Computer Vision tương tác", "Hands-on Computer Vision labs") },
    { icon: "🤖", title: t("Smart Feedback Coach", "Smart Feedback Coach"), desc: t("Phản hồi cá nhân hoá tức thì", "Instant personalised feedback") },
    { icon: "📚", title: t("Premium Lessons", "Premium Lessons"), desc: t("Bài học nâng cao độc quyền", "Exclusive advanced lessons") },
    { icon: "✍️", title: t("Smart Writing Grading", "Smart Writing Grading"), desc: t("Chấm Writing IELTS/TOEIC chi tiết", "Detailed IELTS/TOEIC writing grading") },
    { icon: "🗣️", title: t("Smart Speaking Coach", "Smart Speaking Coach"), desc: t("Luyện nói 24/7, chấm điểm & góp ý", "Practice speaking 24/7 with feedback") },
    { icon: "🧠", title: t("GenAI & Neural Net Labs", "GenAI & Neural Net Labs"), desc: t("Học Generative AI & mạng nơ-ron", "Learn Generative AI & neural networks") },
    { icon: "🏆", title: t("Priority Support", "Priority Support"), desc: t("Hỗ trợ ưu tiên từ Thầy Hải", "Priority support from Teacher Hai") },
    { icon: "🛡️", title: t("AI Ethics & Deepfake Lab", "AI Ethics & Deepfake Lab"), desc: t("Nhận biết deepfake & AI an toàn", "Spot deepfakes & stay AI-safe") },
    { icon: "🎖️", title: t("AI Academy Certificate", "AI Academy Certificate"), desc: t("Chứng chỉ tốt nghiệp AI Academy", "AI Academy graduation certificate") },
    { icon: "🎓", title: t("Scholarship Advisor", "Scholarship Advisor"), desc: t("Tư vấn học bổng cá nhân hoá", "Personalised scholarship advice") },
    { icon: "💼", title: t("Smart Career Roadmap", "Smart Career Roadmap"), desc: t("Lộ trình IT & lập trình", "IT & programming career roadmap") },
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
                  {t(
                    "Thầy Hải đang xác minh giao dịch của bạn. Tài khoản sẽ được nâng cấp ngay sau khi xác nhận.",
                    "Teacher Hai is verifying your transfer. Your account will be upgraded shortly.",
                  )}
                </p>
              </motion.div>
            ) : (
              <div className="px-5 sm:px-8 py-4 space-y-3">
                {/* Features grid */}
                <div>
                  <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {t("Đặc quyền Premium", "Premium Perks")}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {features.map((f) => (
                      <div key={f.title} className="flex items-start gap-2 p-2.5 rounded-md border border-border bg-secondary/40 hover:border-amber-500/40 transition">
                        <div className="text-xl leading-none mt-0.5">{f.icon}</div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-semibold text-foreground leading-tight">{f.title}</div>
                          <div className="text-[12px] text-muted-foreground leading-snug mt-1">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment block */}
                <div className="rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-foreground">
                      {t("Thông tin chuyển khoản", "Bank Transfer Details")}
                    </h3>
                  </div>

                  <div className="mb-2 px-3 py-1.5 rounded-lg bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300/60 dark:border-amber-700/40 text-xs font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300 shrink-0" />
                    {t(
                      "Đây là phí dành cho tài khoản Premium VĨNH VIỄN - đóng 1 lần, dùng trọn đời.",
                      "This is a fee for a LIFETIME Premium account - pay once, use forever.",
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
                        value="199.000đ"
                        copyable
                        copied={copied === "amount"}
                        onCopy={() => copy("199000", "amount")}
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
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface RowProps {
  label: string; value: string;
  copyable?: boolean; copied?: boolean; onCopy?: () => void;
  big?: boolean; mono?: boolean;
}
const Row = ({ label, value, copyable, copied, onCopy, big, mono }: RowProps) => (
  <div className="grid grid-cols-[110px_1fr_auto] items-center gap-2 py-1.5 border-b border-amber-200/50 dark:border-amber-800/30 last:border-0">
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <span className={`text-foreground break-all text-right ${big ? "text-sm sm:text-base font-extrabold tracking-wider" : "text-xs font-semibold"} ${mono ? "font-mono text-xs sm:text-sm" : ""}`}>
      {value}
    </span>
    {copyable ? (
      <button
        onClick={onCopy}
        className="p-1 rounded-md bg-white dark:bg-card border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition shrink-0"
        aria-label="Copy"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
      </button>
    ) : (
      <div className="w-[27px]" />
    )}
  </div>
);

export default UpgradeAccountModal;
