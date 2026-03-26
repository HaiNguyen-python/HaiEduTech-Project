import { Brain, Mail, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { href: "mailto:hainguyen240195@gmail.com", icon: Mail, label: "Email" },
  { href: "https://github.com/HaiNguyen-python", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/hainguyen2401/", icon: Linkedin, label: "LinkedIn" },
];

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
              <span className="font-display text-foreground">
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent font-medium">HaiEdu</span>
                <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent font-bold">Tech</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</p>
            {/* Social bar */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
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
              <Link to="/ielts-vocabulary" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Từ vựng IELTS", "IELTS Vocabulary")}</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{t("Bảng điều khiển", "Dashboard")}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">{t("Liên hệ", "Contact")}</h4>
            <div className="space-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <s.icon className="w-4 h-4" /> {s.label}
                </a>
              ))}
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
