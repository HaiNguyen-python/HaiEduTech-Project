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

/** TikTok brand icon (lucide does not ship brand logos). */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83v-3.5a6.37 6.37 0 1 0 5.76 6.33V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
  </svg>
);

const socialLinks = [
  { href: "mailto:contact@haiedutech.com", icon: Mail, label: "Email" },
  { href: "https://github.com/HaiNguyen-python", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/hainguyen2401/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@haiedutech", icon: TikTokIcon, label: "TikTok" },
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
            <div className="flex items-center gap-6 sm:gap-7">
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
              <div className="flex items-center gap-4 pt-1">
                <a href="https://github.com/HaiNguyen-python" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/hainguyen2401/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://www.tiktok.com/@haiedutech" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="TikTok">
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
            <span>© {new Date().getFullYear()} HaiEduTech - {t("Kỹ sư · Nhà giáo dục · Gia sư đa ngôn ngữ", "Engineer · Educator · Multilingual Tutor")}</span>
            <span className="text-muted-foreground">{t("Học thông minh • Dẫn đầu kỷ nguyên số", "Learn Smart • Lead the Digital Era")}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t("Chính sách bảo mật", "Privacy Policy")}
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {t("Điều khoản dịch vụ", "Terms of Service")}
            </Link>
          </div>
          <p className="text-[12px] text-muted-foreground text-center">
            Copyright © {new Date().getFullYear()} HaiEduTech, ILC. All rights reserved. Developed by Teacher Hai.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
