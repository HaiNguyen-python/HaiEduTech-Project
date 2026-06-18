/**
 * Consultation modal that captures leads into the public.agency_leads table.
 * Used by all "Get a Free Consultation" CTAs on the EdTech Website Design page.
 */
import { useState } from "react";
import { z } from "zod";
import { Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  lang: "vi" | "en";
  defaultPackage?: string;
}

const tr = (lang: "vi" | "en", vi: string, en: string) => (lang === "vi" ? vi : en);

const schema = z.object({
  client_name: z.string().trim().min(2, "Name too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Phone too short").max(20),
  organization_or_school: z.string().trim().max(150).optional().or(z.literal("")),
  selected_package: z.string().max(60),
  notes: z.string().trim().max(1500).optional().or(z.literal("")),
});

export function AgencyLeadModal({ open, onOpenChange, lang, defaultPackage = "standard" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    client_name: "",
    email: "",
    phone: "",
    organization_or_school: "",
    selected_package: defaultPackage,
    notes: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message || tr(lang, "Vui lòng kiểm tra lại biểu mẫu", "Please check the form"));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("agency_leads").insert({
      client_name: parsed.data.client_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      organization_or_school: parsed.data.organization_or_school || null,
      selected_package: parsed.data.selected_package,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(tr(lang, "Không gửi được. Vui lòng thử lại.", "Could not submit. Please try again."));
      return;
    }
    toast.success(
      tr(lang, "Đã gửi! Đội ngũ sẽ liên hệ trong 24h.", "Sent! Our team will reach out within 24h."),
    );
    setForm({
      client_name: "",
      email: "",
      phone: "",
      organization_or_school: "",
      selected_package: defaultPackage,
      notes: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold w-fit mb-1">
            <Sparkles className="w-3 h-3" />
            {tr(lang, "Tư vấn miễn phí", "Free consultation")}
          </div>
          <DialogTitle className="text-xl sm:text-2xl">
            {tr(lang, "Đặt lịch tư vấn với đội ngũ", "Book a consultation with our team")}
          </DialogTitle>
          <DialogDescription>
            {tr(
              lang,
              "Điền thông tin - đội ngũ 3 co-founder sẽ phản hồi & tư vấn lộ trình trong 24 giờ.",
              "Fill in your info - our 3 co-founders will respond with a tailored roadmap within 24 hours.",
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="al-name">{tr(lang, "Họ và tên *", "Full name *")}</Label>
              <Input id="al-name" required value={form.client_name} onChange={(e) => update("client_name", e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-email">Email *</Label>
              <Input id="al-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-phone">{tr(lang, "Số điện thoại *", "Phone *")}</Label>
              <Input id="al-phone" required value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-org">{tr(lang, "Trường / Tổ chức", "School / Organization")}</Label>
              <Input id="al-org" value={form.organization_or_school} onChange={(e) => update("organization_or_school", e.target.value)} maxLength={150} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="al-pkg">{tr(lang, "Gói dịch vụ *", "Service package *")}</Label>
            <Select value={form.selected_package} onValueChange={(v) => update("selected_package", v)}>
              <SelectTrigger id="al-pkg"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">{tr(lang, "Standard - LMS cơ bản", "Standard - Core LMS")}</SelectItem>
                <SelectItem value="advanced">{tr(lang, "Advanced AI & Data", "Advanced AI & Data")}</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="custom">{tr(lang, "Tùy chỉnh / Chưa rõ", "Custom / Not sure")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="al-notes">{tr(lang, "Ghi chú", "Notes")}</Label>
            <Textarea id="al-notes" rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={1500}
              placeholder={tr(lang, "Mô tả ngắn về nhu cầu, số lượng học viên, tính năng mong muốn...", "Briefly describe your needs, learners, desired features...")} />
          </div>

          <Button type="submit" disabled={submitting}
            className="w-full h-11 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground font-semibold">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin mr-1.5" />{tr(lang, "Đang gửi...", "Sending...")}</>
              : <><Send className="w-4 h-4 mr-1.5" />{tr(lang, "Gửi yêu cầu tư vấn", "Send consultation request")}</>}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            {tr(lang, "Thông tin được bảo mật và chỉ dùng để liên hệ tư vấn.", "Your information is confidential and used only for consultation contact.")}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AgencyLeadModal;
