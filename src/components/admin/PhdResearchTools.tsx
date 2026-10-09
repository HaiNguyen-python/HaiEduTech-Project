import { useState } from "react";
import { Brain, FlaskConical, FileCheck2, Loader2, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { researchError } from "@/lib/phdResearch";
import { toast } from "sonner";

interface Props { context: string; proposal: string; onSave: (title: string, content: string, topic: string) => Promise<void> }
const modes = [
  { id: "synthesis", en: "Evidence synthesis & research gaps", vi: "Tổng hợp bằng chứng & khoảng trống", icon: Brain },
  { id: "design", en: "Study design & analysis plan", vi: "Thiết kế nghiên cứu & phân tích", icon: FlaskConical },
  { id: "proposal_review", en: "Proposal peer review", vi: "Phản biện đề cương", icon: FileCheck2 },
];

export default function PhdResearchTools({ context, proposal, onSave }: Props) {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState("synthesis");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const active = modes.find(m => m.id === mode) ?? modes[0];
  const run = async () => {
    setBusy(true); setError(""); setResult("");
    try {
      const { data, error: failure } = await supabase.functions.invoke("phd-research-ai", { body: { mode, content: input, context: mode === "proposal_review" ? proposal : context, language: lang === "vi" ? "vi" : "en" } });
      if (failure) throw failure;
      if (!data?.content) throw new Error(data?.error || "Empty AI response");
      setResult(data.content);
    } catch (e) { setError(await researchError(e)); }
    finally { setBusy(false); }
  };
  return <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
    <div className="space-y-5">
      <div className="flex gap-3 items-center"><active.icon className="h-6 w-6 text-primary" /><h3 className="text-lg font-semibold">{t("Phòng nghiên cứu AI", "AI research lab")}</h3></div>
      <div className="space-y-2"><Label>{t("Công cụ", "Research tool")}</Label><Select value={mode} onValueChange={v => { setMode(v); setResult(""); setError(""); }} disabled={busy}><SelectTrigger aria-label="Research tool"><SelectValue /></SelectTrigger><SelectContent>{modes.map(m => <SelectItem key={m.id} value={m.id}>{t(m.vi, m.en)}</SelectItem>)}</SelectContent></Select></div>
      <div className="space-y-2"><Label htmlFor="research-brief">{t("Câu hỏi / Bối cảnh nghiên cứu", "Research question / brief")}</Label><Textarea id="research-brief" rows={9} value={input} onChange={e => setInput(e.target.value)} placeholder={t("Đối tượng, can thiệp, biến cần đo, giới hạn nguồn lực…", "Population, intervention, outcomes, instruments, resource constraints…")} /></div>
      <Button onClick={run} disabled={busy || (!input.trim() && !(mode === "proposal_review" ? proposal.trim() : context.trim()))} className="gap-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <active.icon className="h-4 w-4" />}{busy ? t("Đang phân tích", "Analyzing") : t("Phân tích với AI", "Analyze with AI")}</Button>
      <div className="border-l-2 border-primary pl-4 text-sm text-muted-foreground">{t("Bản nháp AI cần được kiểm chứng. Nhật ký học tập không đo trực tiếp hoạt động não; cỡ mẫu cần giả định và phân tích lực thống kê.", "AI drafts require verification. Learning logs do not directly measure brain activity; sample sizes require assumptions and power analysis.")}</div>
    </div>
    <div className="min-w-0 border-l border-border lg:pl-8 space-y-4" aria-live="polite">
      <h3 className="font-semibold">{t("Bản phân tích", "Research analysis")}</h3>
      {error && <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</div>}
      {busy && <div className="flex items-center gap-3 py-12 text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" />{t("Đang xem xét phương pháp và bằng chứng…", "Reviewing methods and evidence…")}</div>}
      {!busy && !result && !error && <div className="py-12 text-muted-foreground text-sm">{t("Chưa có bản phân tích.", "No analysis yet.")}</div>}
      {result && <><div className="prose prose-sm dark:prose-invert max-w-none break-words text-sm leading-relaxed [&_h1]:text-xl [&_h2]:text-lg [&_h3]:text-base [&_h1]:mt-0 [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:my-3"><ReactMarkdown>{result}</ReactMarkdown></div><Button variant="outline" disabled={saving} className="gap-2" onClick={async () => { setSaving(true); try { await onSave(`${active.en}: ${input.slice(0, 100) || "Research review"}`, result, "Research Lab"); } finally { setSaving(false); } }}><Save className="w-4 h-4" />{t("Lưu vào sổ nghiên cứu", "Save to notebook")}</Button></>}
    </div>
  </div>;
}