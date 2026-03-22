import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: "",
    level: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const programs = [
    { value: "english-cambridge", label: t("Tiếng Anh – Cambridge (Starters–PET)", "English – Cambridge (Starters–PET)") },
    { value: "english-ielts", label: t("Tiếng Anh – Luyện thi IELTS", "English – IELTS Preparation") },
    { value: "english-toeic", label: t("Tiếng Anh – TOEIC", "English – TOEIC") },
    { value: "english-highschool", label: t("Tiếng Anh – Luyện thi THPT Quốc gia", "English – National High School Exam") },
    { value: "chinese-elementary", label: t("Tiếng Trung – Sơ cấp", "Chinese – Elementary") },
    { value: "chinese-hsk", label: t("Tiếng Trung – Luyện thi HSK", "Chinese – HSK Preparation") },
    { value: "chinese-conversation", label: t("Tiếng Trung – Giao tiếp", "Chinese – Conversational") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.program) {
      toast({
        title: t("Vui lòng điền đầy đủ thông tin", "Please fill in all required fields"),
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: t("Đăng ký thành công!", "Registration successful!"),
      description: t("Chúng tôi sẽ liên hệ bạn sớm nhất.", "We will contact you shortly."),
    });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-6 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {t("Cảm ơn bạn đã đăng ký!", "Thank you for registering!")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t(
                "Chúng tôi đã nhận được thông tin đăng ký của bạn. Thầy Hải sẽ liên hệ bạn trong thời gian sớm nhất để tư vấn chi tiết.",
                "We have received your registration. Teacher Hai will contact you shortly for detailed consultation."
              )}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all"
            >
              {t("Đăng ký thêm", "Register another")}
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <UserPlus className="w-3 h-3" /> {t("Đăng ký khóa học", "Course Registration")}
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Đăng ký ", "Register for ")}
              <span className="text-gradient">{t("khóa học", "a course")}</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              {t(
                "Điền thông tin bên dưới để đăng ký tham gia các chương trình học Tiếng Anh hoặc Tiếng Trung. Thầy Hải sẽ liên hệ tư vấn cho bạn.",
                "Fill in the form below to register for English or Chinese programs. Teacher Hai will contact you for consultation."
              )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Họ và tên", "Full Name")} <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("Nguyễn Văn A", "John Doe")}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Số điện thoại", "Phone Number")} <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={20}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Chương trình học", "Program")} <span className="text-destructive">*</span>
                </label>
                <select
                  value={form.program}
                  onChange={(e) => updateField("program", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">{t("-- Chọn chương trình --", "-- Select program --")}</option>
                  {programs.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Trình độ hiện tại", "Current Level")}
                </label>
                <input
                  type="text"
                  value={form.level}
                  onChange={(e) => updateField("level", e.target.value)}
                  placeholder={t("Ví dụ: Mới bắt đầu, IELTS 5.0, HSK 2...", "E.g., Beginner, IELTS 5.0, HSK 2...")}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {t("Ghi chú thêm", "Additional Notes")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t("Mục tiêu học tập, thời gian mong muốn...", "Learning goals, preferred schedule...")}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  maxLength={1000}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
                {t("Gửi đăng ký", "Submit Registration")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
