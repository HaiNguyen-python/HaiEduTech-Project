import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForgotPassword = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({
        title: t("Có lỗi xảy ra", "Something went wrong"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSent(true);
      toast({
        title: t("Đã gửi email!", "Email sent!"),
        description: t(
          "Hãy kiểm tra hộp thư của bạn để đặt lại mật khẩu.",
          "Please check your inbox to reset your password.",
        ),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <KeyRound className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold text-foreground">
                {t("Quên mật khẩu?", "Forgot password?")}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t(
                  "Nhập email tài khoản, chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu.",
                  "Enter your email and we'll send you a reset link.",
                )}
              </p>
            </div>

            {sent ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <p className="text-foreground">
                  {t(
                    "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu trong vài phút.",
                    "If that email exists, you'll receive reset instructions shortly.",
                  )}
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("Quay lại đăng nhập", "Back to login")}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    {t("Email", "Email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                      placeholder="student@haiedu.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading
                    ? t("Đang gửi...", "Sending...")
                    : t("Gửi liên kết đặt lại", "Send reset link")}
                </button>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t("Quay lại đăng nhập", "Back to login")}
                </Link>
              </form>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
