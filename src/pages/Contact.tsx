import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Liên hệ ", "Contact ")}
              <span className="text-gradient">{t("tư vấn", "Us")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              {t("Để lại thông tin để thầy Hải tư vấn chương trình học phù hợp nhất cho bạn.", "Leave your details and Teacher Hai will advise the best learning program for you.")}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact info */}
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hainguyen240195@gmail.com" },
                  { icon: Phone, label: t("Điện thoại", "Phone"), value: "+358 XXX XXX" },
                  { icon: MapPin, label: t("Địa chỉ", "Location"), value: "Finland 🇫🇮" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-secondary">
                    <c.icon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="md:col-span-2 glass-card rounded-2xl p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{t("Đã gửi thành công!", "Sent successfully!")}</h3>
                    <p className="text-muted-foreground">{t("Thầy Hải sẽ liên hệ lại với bạn sớm nhất.", "Teacher Hai will contact you soon.")}</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
                      {t("Gửi tin nhắn khác", "Send another message")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Họ và tên", "Full Name")} *</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none" placeholder={t("Nguyễn Văn A", "Your name")} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">Email *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none" placeholder="email@example.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Số điện thoại", "Phone")}</label>
                        <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none" placeholder="0912 345 678" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Chương trình quan tâm", "Program of Interest")}</label>
                        <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:border-primary/50 focus:outline-none">
                          <option value="">{t("Chọn chương trình", "Select program")}</option>
                          <option>IELTS</option>
                          <option>TOEIC</option>
                          <option>Cambridge (Starters/Movers/Flyers/KET/PET)</option>
                          <option>{t("Luyện thi THPT Quốc gia", "National Exam Prep")}</option>
                          <option>HSK 1-6</option>
                          <option>{t("Tiếng Trung giao tiếp", "Conversational Chinese")}</option>
                          <option>{t("Nền tảng Công nghệ", "Tech Foundations")}</option>
                          <option>Data Engineering & AI</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">{t("Tin nhắn", "Message")}</label>
                      <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none resize-none" placeholder={t("Nhập câu hỏi hoặc yêu cầu tư vấn...", "Enter your question...")} />
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all shadow-lg">
                      <Send className="w-5 h-5" />
                      {t("Gửi tin nhắn", "Send Message")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
