import { useEffect, useState } from "react";
import { ArrowRight, Save, Loader2, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { hasResearchBrief, type ResearchBrief } from "@/lib/phdResearchBrief";

export default function PhdResearchBriefEditor({ brief, onChange, onSave, onContinue }: { brief: ResearchBrief; onChange: (brief: ResearchBrief) => void; onSave: () => Promise<boolean>; onContinue: () => void }) {
  const { t } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { setDirty(false); }, []);
  const update = (key: keyof ResearchBrief, value: string) => { onChange({ ...brief, [key]: value }); setDirty(true); };
  const save = async (next = false) => {
    setSaving(true);
    try { if (await onSave()) { setDirty(false); if (next) onContinue(); } }
    finally { setSaving(false); }
  };
  return <section className="space-y-7">
    <div className="flex items-start gap-3 border-b border-border pb-5"><Microscope className="mt-1 size-6 text-primary" /><div><h3 className="text-xl font-semibold">{t("Hồ sơ nghiên cứu", "Research brief")}</h3><p className="mt-2 text-base leading-relaxed text-muted-foreground">{t("Xác định vấn đề, phạm vi và mục tiêu nghiên cứu.", "Define the problem, scope and purpose of your study.")}</p></div></div>
    <div className="space-y-5">
      <div className="space-y-2"><Label htmlFor="phd-topic">{t("Chủ đề nghiên cứu", "Research topic")} *</Label><Input id="phd-topic" className="text-base" value={brief.topic} maxLength={300} onChange={e => update("topic", e.target.value)} placeholder={t("Ví dụ: AI hỗ trợ học tập và khả năng ghi nhớ", "e.g. AI-supported learning and memory retention")} /></div>
      <div className="space-y-2"><Label htmlFor="phd-keywords">{t("Từ khóa", "Keywords")} *</Label><Input id="phd-keywords" className="text-base" value={brief.keywords} maxLength={600} onChange={e => update("keywords", e.target.value)} placeholder="adaptive learning, cognitive load, spaced repetition" /></div>
      <div className="space-y-2"><Label htmlFor="phd-problem">{t("Vấn đề muốn nghiên cứu", "Research problem")} *</Label><Textarea id="phd-problem" className="text-base leading-relaxed" rows={5} maxLength={3000} value={brief.problem} onChange={e => update("problem", e.target.value)} placeholder={t("Điều gì chưa rõ? Vì sao quan trọng? Bằng chứng nào còn thiếu?", "What remains unclear? Why does it matter? What evidence is missing?")} /></div>
      <div className="grid gap-5 xl:grid-cols-2"><div className="space-y-2"><Label htmlFor="phd-population">{t("Đối tượng & bối cảnh", "Population & setting")}</Label><Textarea id="phd-population" className="text-base" rows={3} maxLength={1200} value={brief.population} onChange={e => update("population", e.target.value)} /></div><div className="space-y-2"><Label htmlFor="phd-objective">{t("Mục tiêu & kết quả cần đo", "Objectives & outcomes")}</Label><Textarea id="phd-objective" className="text-base" rows={3} maxLength={1200} value={brief.objective} onChange={e => update("objective", e.target.value)} /></div></div>
      <div className="space-y-2"><Label htmlFor="phd-constraints">{t("Nguồn lực & giới hạn", "Resources & constraints")}</Label><Textarea id="phd-constraints" className="text-base" rows={3} maxLength={1200} value={brief.constraints} onChange={e => update("constraints", e.target.value)} placeholder={t("Thời gian, dữ liệu có sẵn, thiết bị, yêu cầu đạo đức…", "Time, available data, equipment, ethics requirements…")} /></div>
    </div>
    <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5"><Button onClick={() => save()} disabled={saving || !hasResearchBrief(brief)} variant="outline" className="gap-2">{saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}{t("Lưu hồ sơ", "Save brief")}</Button><Button onClick={() => save(true)} disabled={saving || !hasResearchBrief(brief)} className="gap-2">{t("Bắt đầu lộ trình", "Start guided research")}<ArrowRight className="size-4" /></Button>{dirty && <span className="text-sm text-muted-foreground">{t("Chưa lưu thay đổi", "Unsaved changes")}</span>}</div>
  </section>;
}