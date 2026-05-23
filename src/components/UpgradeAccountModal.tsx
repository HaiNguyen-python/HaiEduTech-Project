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

  // Display-friendly transfer note example
  const transferRefDisplay = useMemo(() => {
    const handle = (user?.email?.split("@")[0] || user?.id?.slice(0, 8) || "TenCuaBan")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
    return `HAIEDUTECH_UPGRADE_${handle}`;
  }, [user]);

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
    { icon: "🎯", title: t("Full Exam Engine", "Full Exam Engine"), desc: t("Truy cập toàn bộ đề thi & chấm điểm AI", "Unlock all mock exams & AI grading") },
    { icon: "🎮", title: t("Interactive Games", "Interactive Games"), desc: t("Trò chơi học tập không giới hạn", "Unlimited learning mini-games") },
    { icon: "🤖", title: t("AI Feedback Coach", "AI Feedback Coach"), desc: t("Phản hồi cá nhân hoá từ AI", "Personalised AI feedback") },
    { icon: "📚", title: t("Premium Lessons", "Premium Lessons"), desc: t("Bài học nâng cao độc quyền", "Exclusive advanced lessons") },
    { icon: "✍️", title: t("AI Writing Grading", "AI Writing Grading"), desc: t("Chấm bài viết IELTS/TOEIC bằng AI chi tiết", "Detailed AI grading for IELTS/TOEIC writing") },
    { icon: "🗣️", title: t("AI Speaking Coach", "AI Speaking Coach"), desc: t("Luyện nói với AI 24/7, nhận điểm & góp ý", "Practice speaking with AI 24/7, get scores & feedback") },
    { icon: "📊", title: t("Progress Analytics", "Progress Analytics"), desc: t("Báo cáo tiến độ học tập trực quan", "Visual learning progress reports") },
    { icon: "🏆", title: t("Priority Support", "Priority Support"), desc: t("Hỗ trợ ưu tiên từ Thầy Hải & đội ngũ", "Priority support from Teacher Hai & team") },
    { icon: "📖", title: t("Downloadable Resources", "Downloadable Resources"), desc: t("Tài liệu PDF, bảng từ vựng & mẫu bài luận", "PDF materials, vocab sheets & essay templates") },
    { icon: "🔥", title: t("Study Streaks & Badges", "Study Streaks & Badges"), desc: t("Theo dõi chuỗi ngày học & nhận huy hiệu", "Track study streaks & earn achievement badges") },
    { icon: "🎓", title: t("Scholarship Advisor", "Scholarship Advisor"), desc: t("Tư vấn học bổng du học cá nhân hoá", "Personalised study-abroad scholarship advice") },
    { icon: "💼", title: t("Career Roadmap AI", "Career Roadmap AI"), desc: t("Lộ trình nghề nghiệp IT & lập trình AI", "AI-powered IT & programming career roadmap") },
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
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-card border border-border shadow-2xl"
          >
            {/* Premium header */}
            <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 px-5 sm:px-8 py-6 text-white">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Crown className="w-6 h-6 text-yellow-100" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-yellow-100/90 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> HaiEduTech Premium
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold leading-tight">
                    {t("Mở khoá Premium & Bứt phá việc học!", "Unlock Premium Features & Level Up Your Learning!")}
                  </h2>
                </div>
              </div>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="px-6 py-12 text-center"
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
              <div className="px-5 sm:px-8 py-6 space-y-6">
                {/* Features grid */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {t("Đặc quyền Premium", "Premium Perks")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f) => (
                      <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-secondary/40 hover:border-amber-500/40 transition">
                        <div className="text-2xl">{f.icon}</div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground">{f.title}</div>
                          <div className="text-xs text-muted-foreground">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Note: detailed features will be added later */}
                </div>

                {/* Payment block */}
                <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold text-foreground">
                      {t("Thông tin chuyển khoản", "Bank Transfer Details")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 items-start">
                    {/* QR */}
                    <div className="mx-auto md:mx-0 bg-white rounded-xl p-2 shadow-sm border border-amber-200">
                      <img src={qrImage} alt="VietQR Vietcombank" className="w-52 h-auto rounded-md" loading="lazy" />
                      <div className="text-[10px] text-center text-muted-foreground mt-1 font-medium">
                        {t("Quét VietQR để chuyển nhanh", "Scan VietQR to pay")}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2.5">
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
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm sm:text-base shadow-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
  <div className="flex items-center justify-between gap-3 py-1.5 border-b border-amber-200/50 dark:border-amber-800/30 last:border-0">
    <span className="text-xs font-medium text-muted-foreground shrink-0">{label}</span>
    <div className="flex items-center gap-2 min-w-0">
      <span className={`text-foreground truncate ${big ? "text-base sm:text-lg font-extrabold tracking-wider" : "text-sm font-semibold"} ${mono ? "font-mono text-xs sm:text-sm" : ""}`}>
        {value}
      </span>
      {copyable && (
        <button
          onClick={onCopy}
          className="p-1.5 rounded-md bg-white dark:bg-card border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition shrink-0"
          aria-label="Copy"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />}
        </button>
      )}
    </div>
  </div>
);

export default UpgradeAccountModal;
