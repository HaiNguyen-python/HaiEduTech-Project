/**
 * @file CookieConsentBanner.tsx
 * @description GDPR-compliant cookie banner. Bottom-fixed, glass card, brand
 * gradient accent. Offers Accept All / Reject Non-Essential / Manage Preferences.
 * Renders nothing once the user has made a choice.
 */
import { useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Settings2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const CookiePreferencesModal = lazy(() => import("./CookiePreferencesModal"));

const CookieConsentBanner = () => {
  const { t } = useLanguage();
  const { hasChoice, acceptAll, rejectNonEssential } = useCookieConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const visible = !hasChoice && !dismissed;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-live="polite"
            aria-label={t("Thông báo cookie", "Cookie notice")}
            className="fixed bottom-3 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-4 z-[70] w-auto sm:w-[min(680px,calc(100vw-32px))] rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-foreground mb-1">
                  {t("Chúng tôi tôn trọng quyền riêng tư của bạn", "We respect your privacy")}
                </h2>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {t(
                    "HaiEduTech dùng cookie thiết yếu để đăng nhập, và tùy chọn dùng cookie chức năng & phân tích để cải thiện trải nghiệm học. Bạn có thể thay đổi lựa chọn bất kỳ lúc nào.",
                    "HaiEduTech uses essential cookies to keep you signed in, and optional functional & analytical cookies to improve the learning experience. You can change your choice at any time."
                  )}{" "}
                  <Link to="/privacy" className="text-primary hover:underline font-medium">
                    {t("Chính sách bảo mật", "Privacy Policy")}
                  </Link>
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground text-xs font-bold hover:brightness-110 transition-all"
                  >
                    {t("Chấp nhận tất cả", "Accept All")}
                  </button>
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="px-3.5 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 transition-all"
                  >
                    {t("Chỉ cookie thiết yếu", "Reject Non-Essential")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-foreground text-xs font-semibold hover:bg-secondary transition-all"
                  >
                    <Settings2 className="w-3.5 h-3.5" /> {t("Tùy chỉnh", "Manage Preferences")}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label={t("Đóng", "Close")}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPrefs && (
        <Suspense fallback={null}>
          <CookiePreferencesModal onClose={() => setShowPrefs(false)} />
        </Suspense>
      )}
    </>
  );
};

export default CookieConsentBanner;
