/**
 * @file MentorHub.tsx
 * @description Mentor Hub — static success stories from HaiEduTech alumni
 *   plus an inquiry form that emails Teacher Hai (contact_messages table).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Sparkles, GraduationCap, Quote, Send, Loader2, Mail, Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { MENTOR_STORIES } from "@/data/mentorStories";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const MentorHub = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    mentorId: "",
  });

  const countries = Array.from(new Set(MENTOR_STORIES.map((m) => m.country)));
  const filtered = filter === "all"
    ? MENTOR_STORIES
    : MENTOR_STORIES.filter((m) => m.country === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: t("Vui lòng điền đủ", "Please complete the form"),
        description: t("Tên, email và tin nhắn là bắt buộc.", "Name, email, and message are required."),
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const mentorTag = form.mentorId
        ? `[Mentor: ${MENTOR_STORIES.find((m) => m.id === form.mentorId)?.name || form.mentorId}] `
        : "";
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: `[Mentor Hub Inquiry] ${mentorTag}${form.subject.trim() || "General"}`,
        message: form.message.trim(),
      });
      if (error) throw error;
      toast({
        title: t("✅ Đã gửi tới Thầy Hải", "✅ Sent to Teacher Hai"),
        description: t("Thầy sẽ phản hồi qua email trong 24-48h.", "You'll get a reply within 24-48 hours."),
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "", mentorId: "" });
    } catch (err: any) {
      toast({
        title: t("Lỗi gửi", "Send failed"),
        description: err?.message || t("Thử lại sau.", "Please try again."),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t("Học từ những người đã đi trước", "Learn from those who've been there")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {t("Mentor Hub — Cộng đồng cựu học viên", "Mentor Hub — Alumni Community")}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Câu chuyện thành công từ học viên HaiEduTech đang theo học tại các trường top toàn cầu.",
                "Success stories from HaiEduTech students now at top global universities."
              )}
            </p>
          </motion.div>

          {/* Country filter */}
          <div className="flex gap-2 justify-center flex-wrap mb-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {t("Tất cả", "All")} ({MENTOR_STORIES.length})
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Stories grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {filtered.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full hover:shadow-xl hover:border-primary/40 transition-all">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                        {m.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base">{m.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{m.flag}</span>
                          <span className="truncate">{m.university}</span>
                        </div>
                        <div className="text-xs text-primary font-semibold">{m.program} · {m.yearStart}</div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">{t("Xuất phát: ", "From: ")}</span>
                      {t(m.fromVi, m.fromEn)}
                    </div>

                    <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                          {t(m.achievementVi, m.achievementEn)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted/30 p-3 mb-3 flex-1">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs italic leading-relaxed text-foreground">
                          {t(m.quoteVi, m.quoteEn)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {m.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full gap-1.5 mt-auto"
                      onClick={() => {
                        setForm((f) => ({
                          ...f,
                          mentorId: m.id,
                          subject: `${t("Hỏi về", "Question about")} ${m.name} (${m.university})`,
                        }));
                        document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {t("Hỏi mentor này", "Ask this mentor")}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Inquiry form */}
          <motion.div
            id="inquiry-form"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">
                      {t("Gửi câu hỏi tới Thầy Hải", "Send your question to Teacher Hai")}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {t("Thầy sẽ kết nối bạn với mentor phù hợp.", "Teacher Hai will connect you with the right mentor.")}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      {t("Họ và tên *", "Full name *")}
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nguyen Van A"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      {t("Email *", "Email *")}
                    </label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      {t("Số điện thoại", "Phone")}
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+84 ..."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      {t("Chủ đề", "Subject")}
                    </label>
                    <Input
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder={t("Tư vấn học bổng EDUFI", "EDUFI scholarship advice")}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                      {t("Câu hỏi của bạn *", "Your question *")}
                    </label>
                    <Textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t(
                        "Em đang phân vân giữa Aalto và Helsinki. GPA 3.4, IELTS 7.0. Mentor nào phù hợp tư vấn cho em?",
                        "I'm choosing between Aalto and Helsinki. GPA 3.4, IELTS 7.0. Which mentor fits my profile?"
                      )}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> contact@haiedutech.com</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 0962.823.800</span>
                    </div>
                    <Button type="submit" disabled={submitting} className="gap-2">
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {t("Gửi tới Thầy Hải", "Send to Teacher Hai")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentorHub;
