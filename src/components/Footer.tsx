/**
 * @file Footer.tsx
 * @description Global footer component for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import teacherWave from "@/assets/teacher-wave.webp";

const socialLinks = [
  { href: "mailto:contact@haiedutech.com", icon: Mail, label: "Email" },
  { href: "https://github.com/HaiNguyen-python", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/hainguyen2401/", icon: Linkedin, label: "LinkedIn" },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src={teacherWave}
                alt="HaiEduTech Teacher"
                className="w-[42px] h-[42px] rounded-full object-cover border-2 border-primary/20"
              />
              <span
                className="whitespace-nowrap"
                style={{
                  fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                  fontWeight: 600,
                  fontSize: "1.6rem",
                  lineHeight: 1,
                  letterSpacing: "0.005em",
                  background: "linear-gradient(90deg, #3B82F6, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                HaiEduTech
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer relative z-10"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">{t("Khóa học", "Courses")}</h4>
            <div className="space-y-2.5">
              <Link to="/english" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🇬🇧 {t("Tiếng Anh (IELTS · TOEIC)", "English (IELTS · TOEIC)")}</Link>
              <Link to="/chinese" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🇨🇳 {t("Tiếng Trung (HSK 1-6)", "Chinese (HSK 1-6)")}</Link>
              <Link to="/learn-vietnamese" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🇻🇳 {t("Tiếng Việt", "Vietnamese")}</Link>
              <Link to="/programming" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">💻 {t("Lập trình & AI", "Programming & AI")}</Link>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">{t("Công cụ", "Tools")}</h4>
            <div className="space-y-2.5">
              <Link to="/ai-grading" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🤖 {t("IELTS Smart Grading", "IELTS Smart Grading")}</Link>
              <Link to="/ielts-vocabulary" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">📖 {t("Từ vựng IELTS", "IELTS Vocabulary")}</Link>
              <Link to="/ielts-speaking-practice" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🎤 {t("Luyện nói IELTS", "IELTS Speaking")}</Link>
              <Link to="/global-scholarship" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">🎓 {t("Học bổng toàn cầu", "Global Scholarship")}</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">📊 {t("Bảng điều khiển", "Dashboard")}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">{t("Liên hệ", "Contact")}</h4>
            <div className="space-y-2.5">
              <a href="tel:+84962823800" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> 🇻🇳 +84 962 823 800
              </a>
              <a href="tel:+358408175366" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" /> 🇫🇮 +358 40 817 5366
              </a>
              <a href="mailto:contact@haiedutech.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> contact@haiedutech.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" /> {t("Phần Lan & Việt Nam", "Finland & Vietnam")}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a href="https://github.com/HaiNguyen-python" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/hainguyen2401/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
            <span>© {new Date().getFullYear()} HaiEduTech - {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}</span>
            <span className="text-muted-foreground/60">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</span>
          </div>
          <p className="text-[12px] text-muted-foreground/50 text-center">
            Copyright © {new Date().getFullYear()} HaiEduTech, ILC. All rights reserved. Developed by Teacher Hai.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
