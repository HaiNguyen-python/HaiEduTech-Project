/**
 * @file PrivacyPolicy.tsx
 * @description GDPR-compliant Privacy Policy page for HaiEduTech.
 */
import { Helmet } from "react-helmet-async";
import { ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-display font-bold text-foreground mb-3">{title}</h2>
    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  const updated = "15 July 2026";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("Chính sách bảo mật · HaiEduTech", "Privacy Policy · HaiEduTech")}</title>
        <meta
          name="description"
          content={t(
            "Cách HaiEduTech thu thập, xử lý và bảo vệ dữ liệu cá nhân của bạn theo GDPR.",
            "How HaiEduTech collects, processes and protects your personal data under GDPR."
          )}
        />
        <link rel="canonical" href="https://haiedutech.com/privacy" />
      </Helmet>
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-emerald-500/15 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {t("Chính sách bảo mật", "Privacy Policy")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {t("Cập nhật lần cuối", "Last updated")}: {updated}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {t(
              "HaiEduTech (\"chúng tôi\") cam kết bảo vệ dữ liệu cá nhân của bạn theo Quy định chung về bảo vệ dữ liệu của EU (GDPR) và luật pháp Việt Nam về an toàn thông tin. Chính sách này giải thích chúng tôi thu thập gì, vì sao, xử lý ở đâu, và bạn có quyền gì.",
              "HaiEduTech (\"we\") is committed to protecting your personal data in line with the EU General Data Protection Regulation (GDPR) and Vietnamese information-security law. This policy explains what we collect, why, where it is processed, and what rights you have."
            )}
          </p>

          <Section title={t("1. Dữ liệu chúng tôi thu thập", "1. Data we collect")}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("Tên và địa chỉ email khi bạn đăng ký tài khoản.", "Name and email address when you create an account.")}</li>
              <li>{t("Ảnh đại diện (nếu bạn tải lên hoặc đăng nhập bằng Google).", "Profile picture (if you upload one or sign in with Google).")}</li>
              <li>{t("Tiến độ học tập: bài học đã hoàn thành, điểm số, chuỗi ngày học.", "Learning progress: completed lessons, scores, study streaks.")}</li>
              <li>{t("Nội dung bạn gửi: bài luận, ghi chú, bài đăng Your Corner, tin nhắn chatbot.", "Content you submit: essays, notebooks, Your Corner posts, chatbot messages.")}</li>
              <li>{t("Ghi âm giọng nói cho phần Speaking Coach - xử lý trực tiếp trong trình duyệt, không lưu trên máy chủ.", "Voice recordings for the Speaking Coach - processed in-browser and not stored on our servers.")}</li>
              <li>{t("Metadata kỹ thuật: đường dẫn truy cập, thời gian trên trang, ngôn ngữ, thiết bị.", "Technical metadata: page path, time on page, language, device info.")}</li>
            </ul>
          </Section>

          <Section title={t("2. Vì sao chúng tôi thu thập", "2. Why we collect it")}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("Cá nhân hoá lộ trình học tập và đề xuất bài học phù hợp.", "Personalize learning paths and recommend suitable lessons.")}</li>
              <li>{t("Chấm điểm, đưa ra phản hồi và theo dõi tiến độ.", "Grade work, provide feedback, and track progress.")}</li>
              <li>{t("Bảo mật tài khoản và phát hiện gian lận.", "Secure your account and detect abuse.")}</li>
              <li>{t("Cải thiện hiệu năng, sửa lỗi và tối ưu bài giảng.", "Improve performance, fix bugs, and optimize lessons.")}</li>
            </ul>
            <p>
              {t(
                "Cơ sở pháp lý: (a) thực hiện hợp đồng dịch vụ với bạn, (b) sự đồng ý của bạn với cookie phân tích, (c) lợi ích chính đáng của chúng tôi trong việc bảo vệ và cải thiện dịch vụ.",
                "Legal basis: (a) performance of our service contract with you, (b) your consent for analytical cookies, (c) our legitimate interest in securing and improving the service."
              )}
            </p>
          </Section>

          <Section title={t("3. Nơi dữ liệu được xử lý", "3. Where data is processed")}>
            <p>
              {t(
                "Dữ liệu của bạn được lưu trên hạ tầng Supabase (đặt tại EU) do Lovable Cloud quản lý. Một số tính năng AI sử dụng Lovable AI Gateway và Perplexity - các nhà cung cấp này chỉ nhận nội dung bạn chủ động gửi (ví dụ: bài luận để chấm điểm), không nhận email/mật khẩu của bạn.",
                "Your data is stored on Supabase infrastructure (EU region) managed by Lovable Cloud. Some AI features route through the Lovable AI Gateway and Perplexity - these providers only receive content you actively submit (e.g. an essay to grade); they never receive your email or password."
              )}
            </p>
            <p>
              {t(
                "Chúng tôi không bán dữ liệu cho bên thứ ba và không chuyển dữ liệu sang các quốc gia không đảm bảo mức bảo vệ tương đương EU.",
                "We do not sell your data to third parties and do not transfer data to countries without equivalent EU-level protection."
              )}
            </p>
          </Section>

          <Section title={t("4. Cookie", "4. Cookies")}>
            <p>
              {t(
                "Chúng tôi dùng ba nhóm cookie: (a) thiết yếu (đăng nhập, bảo mật) - luôn bật, (b) chức năng (ngôn ngữ, theme, tiến độ tạm thời) - tuỳ chọn, (c) phân tích (thống kê ẩn danh về cách bạn dùng bài học) - tuỳ chọn. Bạn có thể thay đổi lựa chọn bất kỳ lúc nào qua banner cookie ở cuối trang.",
                "We use three cookie categories: (a) essential (login, security) - always on, (b) functional (language, theme, transient progress) - optional, (c) analytical (anonymized stats about lesson usage) - optional. You can change your choice at any time via the cookie banner at the bottom of the page."
              )}
            </p>
          </Section>

          <Section title={t("5. Thời gian lưu trữ", "5. Retention")}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("Hồ sơ và tiến độ học: lưu trong khi tài khoản còn hoạt động.", "Profile and learning progress: kept while your account is active.")}</li>
              <li>{t("Bài luận và ghi chú: đến khi bạn xoá hoặc yêu cầu xoá tài khoản.", "Essays and notes: until you delete them or request account deletion.")}</li>
              <li>{t("Log kỹ thuật: tối đa 12 tháng để phát hiện gian lận.", "Technical logs: up to 12 months for abuse detection.")}</li>
              <li>{t("Ghi âm Speaking Coach: không lưu (xử lý trực tiếp trong trình duyệt).", "Speaking Coach audio: not stored (browser-only processing).")}</li>
            </ul>
          </Section>

          <Section title={t("6. Quyền của bạn (GDPR Điều 15-22)", "6. Your rights (GDPR Art. 15-22)")}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("Quyền truy cập và xuất dữ liệu cá nhân của bạn (JSON).", "Right to access and export your personal data (JSON).")}</li>
              <li>{t("Quyền chỉnh sửa dữ liệu không chính xác.", "Right to rectify inaccurate data.")}</li>
              <li>{t("Quyền được lãng quên (xoá vĩnh viễn tài khoản và toàn bộ dữ liệu).", "Right to be forgotten (permanent account and data deletion).")}</li>
              <li>{t("Quyền hạn chế xử lý và phản đối xử lý.", "Right to restrict or object to processing.")}</li>
              <li>{t("Quyền rút lại đồng ý cho cookie phân tích bất kỳ lúc nào.", "Right to withdraw consent for analytical cookies at any time.")}</li>
            </ul>
            <p>
              {t(
                "Bạn có thể tự thực hiện quyền truy cập và quyền được lãng quên trong tab \"Privacy & Data\" trên Dashboard. Với các quyền còn lại, liên hệ ",
                "You can exercise the access and right-to-be-forgotten rights yourself in the \"Privacy & Data\" tab on the Dashboard. For the remaining rights, contact "
              )}
              <a className="text-primary hover:underline" href="mailto:contact@haiedutech.com">contact@haiedutech.com</a>.
            </p>
          </Section>

          <Section title={t("7. Bảo mật", "7. Security")}>
            <p>
              {t(
                "Toàn bộ lưu lượng đi qua HTTPS. Truy cập dữ liệu được bảo vệ bởi Row-Level Security ở lớp cơ sở dữ liệu: bạn chỉ có thể đọc/ghi dữ liệu của chính mình. Chúng tôi sanitize mọi nội dung do người dùng gửi bằng DOMPurify trước khi hiển thị để phòng chống XSS.",
                "All traffic is over HTTPS. Data access is enforced by database-level Row-Level Security: you can only read and write your own rows. All user-generated content is sanitized with DOMPurify before rendering to prevent XSS."
              )}
            </p>
          </Section>

          <Section title={t("8. Trẻ em", "8. Children")}>
            <p>
              {t(
                "Một số khoá học (ví dụ Cambridge YLE) dành cho học sinh dưới 16 tuổi. Trong trường hợp này, tài khoản phải được cha mẹ/người giám hộ tạo và giám sát.",
                "Some courses (e.g. Cambridge YLE) target learners under 16. In that case, the account must be created and supervised by a parent or guardian."
              )}
            </p>
          </Section>

          <Section title={t("9. Liên hệ", "9. Contact")}>
            <p>
              {t("Câu hỏi hoặc yêu cầu về quyền riêng tư: ", "Privacy questions or requests: ")}
              <a className="text-primary hover:underline" href="mailto:contact@haiedutech.com">contact@haiedutech.com</a>.
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
