import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, Mail, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import AdSlot from "@/components/ads/AdSlot";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject || null,
        message: form.message || null,
      });
      await supabase.functions.invoke("send-contact-email", { body: form });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Liên Hệ Thầy Hải - HaiEduTech | Tư Vấn Khóa Học" description="Liên hệ Thầy Hải: 0962.823.800, contact@haiedutech.com. Tư vấn IELTS, HSK, TOEIC, du học, lập trình Python miễn phí qua Zalo, Facebook, LinkedIn." path="/contact" />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              {t("Liên hệ ", "Contact ")}
              <span className="text-gradient">{t("tư vấn", "Us")}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t("Để lại thông tin để thầy Hải tư vấn chương trình học phù hợp nhất cho bạn.", "Leave your details and Teacher Hai will advise the best learning program for you.")}
            </p>

            {/* Get in Touch social bar */}
            <div className="flex items-center gap-4 mb-10">
              {[
                { href: "mailto:contact@haiedutech.com", icon: Mail, label: "Email", color: "text-red-400" },
                { href: "https://github.com/HaiNguyen-python", icon: Github, label: "GitHub", color: "text-foreground" },
                { href: "https://www.linkedin.com/in/hainguyen2401/", icon: Linkedin, label: "LinkedIn", color: "text-blue-400" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                </a>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-8">
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
                  <button type="submit" disabled={sending} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all shadow-lg disabled:opacity-50">
                    <Send className="w-5 h-5" />
                    {sending ? t("Đang gửi...", "Sending...") : t("Gửi tin nhắn", "Send Message")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* AdSense — informational page, below contact form */}
          <AdSlot />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
