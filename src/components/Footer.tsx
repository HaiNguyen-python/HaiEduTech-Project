import { Brain, Mail, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">HaiEdu</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">{t("Khóa học", "Courses")}</h4>
            <div className="space-y-2">
              <Link to="/english" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Tiếng Anh", "English")}</Link>
              <Link to="/chinese" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Tiếng Trung", "Chinese")}</Link>
              <Link to="/programming" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Lập trình", "Programming")}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">{t("Công cụ", "Tools")}</h4>
            <div className="space-y-2">
              <Link to="/ai-grading" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Chấm điểm AI", "AI Grading")}</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Bảng điều khiển", "Dashboard")}</Link>
              <Link to="/register" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Đăng ký", "Register")}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">{t("Liên hệ", "Contact")}</h4>
            <div className="space-y-2">
              <a href="mailto:hainguyen240195@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href="https://github.com/Hai_Nguyen_Machine-Learning-Data-Analytics_Portforlio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://tienganhthayhai.flyer.us" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" /> Website
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Hai Nguyen — {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
