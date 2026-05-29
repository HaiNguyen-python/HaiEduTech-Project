import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Phone, Mail, MessageCircle, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AccessDeniedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AccessDeniedModal = ({ open, onOpenChange }: AccessDeniedModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center items-center">
          {/* Locked icon badge */}
          <div className="mx-auto mb-2 w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
            <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <DialogTitle className="text-xl">
            {t("Yêu cầu cấp quyền truy cập", "Premium Course Access Required")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t(
              "Chương trình tương tác này dành riêng cho học sinh đã đăng ký. Để mở khóa tính năng này, vui lòng liên hệ trực tiếp với Thầy Hải.",
              "This interactive curriculum is reserved for enrolled students. To unlock this feature, please contact Teacher Hai directly."
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Benefits preview */}
        <div className="my-4 p-3 rounded-lg bg-muted/50 border">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">{t("Bạn sẽ được:", "You'll get:")}</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ {t("38 bài học tương tác đầy đủ", "38 full interactive lessons")}</li>
            <li>✓ {t("AI Roleplay luyện nói 1-1", "1-on-1 AI Roleplay speaking practice")}</li>
            <li>✓ {t("Bài tập nghe & từ vựng thực tế", "Real-world listening & vocabulary exercises")}</li>
            <li>✓ {t("Huy hiệu Topic Master cho mỗi chủ đề", "Topic Master badges for each topic")}</li>
          </ul>
        </div>

        {/* Contact buttons */}
        <div className="space-y-2">
          <Button
            className="w-full gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => window.open("https://zalo.me/0962823800", "_blank")}
          >
            <Phone className="w-4 h-4" />
            Zalo / {t("Điện thoại", "Phone")}: 0962.823.800
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => window.open("mailto:hainguyen240195@gmail.com?subject=Đăng ký khóa Conversational English", "_blank")}
          >
            <Mail className="w-4 h-4" />
            hainguyen240195@gmail.com
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => window.open("https://m.me/hainguyen240195", "_blank")}
          >
            <MessageCircle className="w-4 h-4" />
            Facebook Messenger
          </Button>
        </div>

        <p className="text-[11px] text-center text-muted-foreground mt-2">
          {t(
            "Thầy Hải sẽ cấp quyền truy cập cho bạn trong vòng 24 giờ sau khi xác nhận đăng ký.",
            "Teacher Hai will grant your access within 24 hours after confirming enrollment."
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AccessDeniedModal;
