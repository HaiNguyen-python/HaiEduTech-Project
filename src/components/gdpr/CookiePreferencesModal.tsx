/**
 * @file CookiePreferencesModal.tsx
 * @description Granular consent modal: users toggle Functional and Analytical
 * cookies. Essential is always on (required for login/security).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";

interface Props {
  onClose: () => void;
}

const CookiePreferencesModal = ({ onClose }: Props) => {
  const { t } = useLanguage();
  const { choice, save } = useCookieConsent();
  const [functional, setFunctional] = useState<boolean>(choice?.functional ?? true);
  const [analytical, setAnalytical] = useState<boolean>(choice?.analytical ?? false);

  const handleSave = () => {
    save({ functional, analytical });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-display font-bold text-foreground">
              {t("Tùy chỉnh cookie", "Cookie Preferences")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("Đóng", "Close")}
            className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Essential - always on */}
          <div className="rounded-xl border border-border bg-secondary/40 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">
                  {t("Cookie thiết yếu", "Essential Cookies")}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t(
                    "Cần thiết cho đăng nhập, bảo mật và các chức năng cốt lõi. Không thể tắt.",
                    "Required for login, security, and core functionality. Cannot be disabled."
                  )}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 whitespace-nowrap">
                {t("Luôn bật", "Always On")}
              </span>
            </div>
          </div>

          {/* Functional */}
          <label className="flex items-start justify-between gap-4 rounded-xl border border-border p-4 cursor-pointer hover:bg-secondary/30 transition">
            <div>
              <p className="text-sm font-bold text-foreground">
                {t("Cookie chức năng", "Functional Cookies")}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t(
                  "Lưu tiến độ học, ngôn ngữ, chủ đề giao diện và các tùy chọn cá nhân.",
                  "Save learning progress, language, theme and personalization preferences."
                )}
              </p>
            </div>
            <input
              type="checkbox"
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
              className="w-5 h-5 mt-1 accent-primary cursor-pointer flex-shrink-0"
            />
          </label>

          {/* Analytical */}
          <label className="flex items-start justify-between gap-4 rounded-xl border border-border p-4 cursor-pointer hover:bg-secondary/30 transition">
            <div>
              <p className="text-sm font-bold text-foreground">
                {t("Cookie phân tích", "Analytical Cookies")}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t(
                  "Giúp chúng tôi hiểu cách bạn dùng ứng dụng để tối ưu bài học. Dữ liệu ẩn danh.",
                  "Help us understand how you use the app so we can optimize lessons. Anonymized data."
                )}
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytical}
              onChange={(e) => setAnalytical(e.target.checked)}
              className="w-5 h-5 mt-1 accent-primary cursor-pointer flex-shrink-0"
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-foreground text-sm font-semibold hover:bg-secondary transition"
          >
            {t("Huỷ", "Cancel")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-sm font-bold hover:brightness-110 transition"
          >
            {t("Lưu lựa chọn", "Save Preferences")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CookiePreferencesModal;
