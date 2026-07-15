/**
 * @file TermsOfService.tsx
 * @description Terms of Service page for HaiEduTech.
 */
import { Helmet } from "react-helmet-async";
import { ScrollText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-display font-bold text-foreground mb-3">{title}</h2>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </section>
);

const TermsOfService = () => {
  const { t } = useLanguage();
  const updated = "15 July 2026";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Điều khoản dịch vụ · HaiEduTech", "Terms of Service · HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Điều khoản sử dụng nền tảng học tập HaiEduTech: tài khoản, quyền sở hữu trí tuệ, hành vi bị cấm.",
            "Terms for using the HaiEduTech learning platform: accounts, intellectual property, acceptable use."
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/terms" />
      </Helmet>
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-emerald-500/15 flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {t("Điều khoản dịch vụ", "Terms of Service")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("Cập nhật lần cuối", "Last updated")}: {updated}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {t(
              "Khi tạo tài khoản hoặc sử dụng HaiEduTech, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng không sử dụng dịch vụ.",
              "By creating an account or using HaiEduTech, you agree to the terms below. If you do not agree, please do not use the service."
            )}
          </p>

          <Section title={t("1. Tài khoản", "1. Accounts")}>
            <p>
              {t(
                "Bạn phải cung cấp thông tin trung thực khi đăng ký và có trách nhiệm bảo mật mật khẩu. Một người dùng chỉ tạo một tài khoản. Học sinh dưới 16 tuổi phải có sự đồng ý của cha mẹ/người giám hộ.",
                "You must provide truthful information when registering and are responsible for securing your password. Each person may create only one account. Learners under 16 need parent or guardian consent."
              )}
            </p>
          </Section>

          <Section title={t("2. Sử dụng được phép", "2. Acceptable use")}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("Chỉ dùng dịch vụ cho mục đích học tập cá nhân.", "Use the service for personal learning only.")}</li>
              <li>{t("Không đăng tải nội dung vi phạm pháp luật, xúc phạm, kỳ thị hoặc quấy rối.", "Do not post illegal, offensive, discriminatory, or harassing content.")}</li>
              <li>{t("Không cố gắng phá bảo mật, dò quét, hoặc tự động hoá lạm dụng.", "Do not attempt to break security, scan, or automate abusive access.")}</li>
              <li>{t("Không sao chép lại nội dung khoá học để phân phối thương mại.", "Do not reproduce course content for commercial distribution.")}</li>
            </ul>
          </Section>

          <Section title={t("3. Quyền sở hữu trí tuệ", "3. Intellectual property")}>
            <p>
              {t(
                "Toàn bộ khoá học, bài giảng, hình ảnh và mã nguồn thuộc bản quyền của HaiEduTech (© HaiEduTech, ILC). Bạn được cấp giấy phép cá nhân, không độc quyền, không chuyển nhượng để sử dụng dịch vụ. Nội dung bạn tạo (bài luận, ghi chú) vẫn thuộc về bạn; bạn cấp cho chúng tôi giấy phép giới hạn để hiển thị và chấm điểm.",
                "All courses, lessons, images and code are copyrighted by HaiEduTech (© HaiEduTech, ILC). You receive a personal, non-exclusive, non-transferable license to use the service. Content you create (essays, notes) remains yours; you grant us a limited license to display and grade it."
              )}
            </p>
          </Section>

          <Section title={t("4. Đăng ký trả phí", "4. Paid enrollment")}>
            <p>
              {t(
                "Học phí được thoả thuận trực tiếp qua kênh liên hệ. Chính sách hoàn tiền được nêu tại thời điểm đăng ký khoá học.",
                "Tuition is agreed directly through our contact channels. Refund policy is stated at enrollment time."
              )}
            </p>
          </Section>

          <Section title={t("5. Chấm dứt", "5. Termination")}>
            <p>
              {t(
                "Bạn có thể xoá tài khoản bất kỳ lúc nào tại tab Privacy & Data. Chúng tôi có thể đình chỉ tài khoản vi phạm điều khoản.",
                "You may delete your account at any time from the Privacy & Data tab. We may suspend accounts that violate these terms."
              )}
            </p>
          </Section>

          <Section title={t("6. Từ chối trách nhiệm", "6. Disclaimer")}>
            <p>
              {t(
                "Dịch vụ được cung cấp \"nguyên trạng\". Chúng tôi nỗ lực cao nhưng không đảm bảo dịch vụ luôn không lỗi. Điểm số AI mang tính tham khảo, không thay thế đánh giá chính thức của kỳ thi.",
                "The service is provided \"as is\". We work hard but do not guarantee an error-free service. AI scoring is indicative and does not replace official exam grading."
              )}
            </p>
          </Section>

          <Section title={t("7. Luật áp dụng", "7. Governing law")}>
            <p>
              {t(
                "Các điều khoản này chịu sự điều chỉnh của pháp luật Việt Nam. Đối với người dùng EU, các quyền không thể tước bỏ theo GDPR vẫn được bảo lưu.",
                "These terms are governed by the laws of Vietnam. For EU users, mandatory GDPR rights remain reserved."
              )}
            </p>
          </Section>

          <Section title={t("8. Liên hệ", "8. Contact")}>
            <p>
              <a className="text-primary hover:underline" href="mailto:contact@haiedutech.com">contact@haiedutech.com</a>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
