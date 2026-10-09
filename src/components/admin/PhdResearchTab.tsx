/**
 * @file PhdResearchTab.tsx
 * @description Teacher/admin-only PhD Research (EdTech) workspace.
 * Tabs: Literature Review (Perplexity), Research Notebook (DB-backed),
 * RQ Generator (Perplexity), Proposal Builder (reuses phdProposalScore).
 * Notes + citations persist in phd_research_notes / phd_research_citations
 * with strict per-user RLS.
 */
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import {
  GraduationCap, Search, BookOpen, Lightbulb, FileText, Sparkles, Loader2,
  Save, Plus, Trash2, ExternalLink, Download, Tag, ListChecks, Brain, FlaskConical, ShieldCheck
} from "lucide-react";
import { scoreProposal, buildProposalDocxBlob } from "@/lib/phdProposalScore";
import PhdRoadmapChecklist from "./PhdRoadmapChecklist";
import PhdResearchTools from "./PhdResearchTools";
import PhdEvidenceMatrix from "./PhdEvidenceMatrix";
import { RESEARCH_TOPICS, safeResearchUrl, researchError } from "@/lib/phdResearch";

interface NoteRow {
  id: string;
  topic: string;
  title: string;
  content: string;
  tags: string[];
  importance: number;
  updated_at: string;
}
interface CitationRow {
  id: string;
  topic: string;
  title: string;
  authors: string | null;
  year: number | null;
  source_url: string | null;
  summary: string | null;
  tags: string[];
  created_at: string;
}

const DEFAULT_TOPICS = RESEARCH_TOPICS;

const PhdResearchTab = () => {
  const { lang, t } = useLanguage();
  const isVi = lang === "vi";

  const [userId, setUserId] = useState<string | null>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [citations, setCitations] = useState<CitationRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [dataError, setDataError] = useState("");
  const [aiError, setAiError] = useState("");
  const [noteQuery, setNoteQuery] = useState("");

  // Literature review state
  const [litQuery, setLitQuery] = useState("");
  const [litResult, setLitResult] = useState<{ content: string; citations: string[] } | null>(null);
  const [litLoading, setLitLoading] = useState(false);

  // RQ generator
  const [rqTopic, setRqTopic] = useState("");
  const [rqResult, setRqResult] = useState("");
  const [rqLoading, setRqLoading] = useState(false);

  // Notebook editor
  const [editingNote, setEditingNote] = useState<Partial<NoteRow> | null>(null);
  const [polishLoading, setPolishLoading] = useState(false);

  // Proposal builder
  const [proposalTitle, setProposalTitle] = useState("PhD Proposal - EdTech & Neuroscience");
  const [proposalText, setProposalText] = useState("");

  // Load
  useEffect(() => {
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        setLoadingData(false);
        return;
      }
      setUserId(auth.user.id);
      const [n, c] = await Promise.all([
        supabase.from("phd_research_notes").select("*").eq("user_id", auth.user.id).order("updated_at", { ascending: false }),
        supabase.from("phd_research_citations").select("*").eq("user_id", auth.user.id).order("created_at", { ascending: false }),
      ]);
      if (n.error || c.error) setDataError(n.error?.message || c.error?.message || "Unable to load research");
       if (!n.error) {
         setNotes((n.data || []) as NoteRow[]);
         const latest = n.data?.find(row => row.topic === "Proposal");
         if (latest) { setProposalTitle(latest.title); setProposalText(latest.content); }
       }
      if (!c.error) setCitations((c.data || []) as CitationRow[]);
      setLoadingData(false);
    })();
  }, []);

  // ===== Literature =====
  const runLitSearch = useCallback(async () => {
    if (!litQuery.trim()) return;
    setAiError("");
    setLitLoading(true);
    setLitResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "literature", query: litQuery, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      if (!data?.content) throw new Error(data?.error || "Empty AI response");
      setLitResult({ content: data.content || "", citations: data.citations || [] });
    } catch (e) {
      setAiError(await researchError(e));
    } finally {
      setLitLoading(false);
    }
  }, [litQuery, isVi]);

  const saveLitAsCitation = useCallback(async () => {
    if (!userId || !litResult) return;
    const { data, error } = await supabase
      .from("phd_research_citations")
      .insert({
        user_id: userId,
        topic: "Literature Review",
        title: litQuery.slice(0, 200),
        summary: litResult.content,
        source_url: litResult.citations[0] || null,
        tags: ["lit-review", "ai-summary", "verification-needed"],
      })
      .select()
      .single();
    if (error) {
      toast.error(t("Lưu thất bại", "Save failed"));
      return;
    }
    setCitations((s) => [data as CitationRow, ...s]);
    toast.success(t("Đã lưu vào Citations", "Saved to Citations"));
  }, [userId, litResult, litQuery, t]);

  // ===== RQ generator =====
  const runRqGen = useCallback(async () => {
    if (!rqTopic.trim()) return;
    setAiError("");
    setRqLoading(true);
    setRqResult("");
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "rq", topic: rqTopic, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      if (!data?.content) throw new Error(data?.error || "Empty AI response");
      setRqResult(data.content || "");
    } catch (e) {
      setAiError(await researchError(e));
    } finally {
      setRqLoading(false);
    }
  }, [rqTopic, isVi, t]);

  const saveRqAsNote = useCallback(async () => {
    if (!userId || !rqResult) return;
    const { data, error } = await supabase
      .from("phd_research_notes")
      .insert({
        user_id: userId,
        topic: "Research Questions",
        title: rqTopic.slice(0, 200),
        content: rqResult,
        tags: ["rq", "hypothesis"],
        importance: 4,
      })
      .select()
      .single();
    if (error) return toast.error(t("Lưu thất bại", "Save failed"));
    setNotes((s) => [data as NoteRow, ...s]);
    toast.success(t("Đã lưu vào Notebook", "Saved to Notebook"));
  }, [userId, rqResult, rqTopic, t]);

  // ===== Notebook =====
  const newNote = () =>
    setEditingNote({
      topic: DEFAULT_TOPICS[0],
      title: "",
      content: "",
      tags: [],
      importance: 3,
    });

  const saveNote = useCallback(async () => {
    if (!editingNote || !userId) return;
    if (!editingNote.title?.trim()) {
      return toast.error(t("Cần tiêu đề", "Title required"));
    }
    const payload = {
      user_id: userId,
      topic: editingNote.topic || "General",
      title: editingNote.title,
      content: editingNote.content || "",
      tags: editingNote.tags || [],
      importance: editingNote.importance ?? 3,
    };
    if (editingNote.id) {
      const { data, error } = await supabase
        .from("phd_research_notes")
        .update(payload)
        .eq("id", editingNote.id)
        .select()
        .single();
      if (error) return toast.error(t("Lưu thất bại", "Save failed"));
      setNotes((s) => s.map((n) => (n.id === data.id ? (data as NoteRow) : n)));
    } else {
      const { data, error } = await supabase.from("phd_research_notes").insert(payload).select().single();
      if (error) return toast.error(t("Lưu thất bại", "Save failed"));
      setNotes((s) => [data as NoteRow, ...s]);
    }
    setEditingNote(null);
    toast.success(t("Đã lưu note", "Note saved"));
  }, [editingNote, userId, t]);

  const deleteNote = useCallback(
    async (id: string) => {
      if (!confirm(t("Xóa note này?", "Delete this note?"))) return;
      const { error } = await supabase.from("phd_research_notes").delete().eq("id", id);
      if (error) return toast.error(t("Xóa thất bại", "Delete failed"));
      setNotes((s) => s.filter((n) => n.id !== id));
      toast.success(t("Đã xóa", "Deleted"));
    },
    [t],
  );

  const polishCurrentNote = useCallback(async () => {
    if (!editingNote?.content?.trim()) return;
    setAiError("");
    setPolishLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "note_polish", content: editingNote.content, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      if (!data?.content) throw new Error(data?.error || "Empty AI response");
      setEditingNote({ ...editingNote, content: data.content || editingNote.content });
      toast.success(t("Đã làm gọn note", "Note polished"));
    } catch (e) {
      setAiError(await researchError(e));
    } finally {
      setPolishLoading(false);
    }
  }, [editingNote, isVi, t]);

  const deleteCitation = useCallback(
    async (id: string) => {
      if (!confirm(t("Xóa citation?", "Delete citation?"))) return;
      const { error } = await supabase.from("phd_research_citations").delete().eq("id", id);
      if (error) return toast.error(t("Xóa thất bại", "Delete failed"));
      setCitations((s) => s.filter((c) => c.id !== id));
    },
    [t],
  );

  // Export notebook markdown
  const exportNotebook = useCallback(() => {
    const md = notes
      .map(
        (n) =>
          `# ${n.title}\n\n_${n.topic} · importance ${n.importance}/5 · ${new Date(n.updated_at).toLocaleDateString()}_\n\n${n.content}\n\n${n.tags.length ? `**Tags:** ${n.tags.join(", ")}\n` : ""}---\n`,
      )
      .join("\n");
    const blob = new Blob([`# PhD Research Notebook (EdTech)\n\n${md}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `phd-notebook-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [notes]);

  // ===== Proposal builder =====
  const proposalScore = useMemo(() => scoreProposal(proposalText), [proposalText]);
  const exportProposalDocx = useCallback(() => {
    const blob = buildProposalDocxBlob(proposalTitle, proposalText);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${proposalTitle.replace(/\s+/g, "_")}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }, [proposalTitle, proposalText]);

  const researchContext = useMemo(() => citations.slice(0, 12).map(c => `SOURCE: ${c.title}
AUTHORS/YEAR: ${c.authors ?? "unknown"}, ${c.year ?? "unknown"}
URL: ${c.source_url ?? "none"}
EVIDENCE: ${(c.summary ?? "").slice(0, 1800)}`).join("

").slice(0, 28000), [citations]);
  const filteredNotes = notes.filter(n => `${n.title} ${n.topic} ${n.content} ${n.tags.join(" ")}`.toLowerCase().includes(noteQuery.toLowerCase()));
  const saveLabNote = async (title: string, content: string, topic: string) => {
    if (!userId) return;
    const { data, error } = await supabase.from("phd_research_notes").insert({ user_id: userId, title, content, topic, tags: ["ai-draft", "verification-needed"], importance: 4 }).select().single();
    if (error) { toast.error(error.message); return; }
    setNotes(current => [data as NoteRow, ...current]); toast.success(t("Đã lưu bản phân tích", "Analysis saved"));
  };
  const saveEvidence = async (entry: Partial<CitationRow>) => {
    if (!userId || !entry.title?.trim()) return false;
    const payload = { user_id: userId, title: entry.title.trim(), topic: entry.topic || "General", authors: entry.authors || null, year: entry.year ?? null, source_url: safeResearchUrl(entry.source_url) || null, summary: entry.summary || "", tags: entry.tags || [] };
    const response = entry.id ? await supabase.from("phd_research_citations").update(payload).eq("id", entry.id).eq("user_id", userId).select().single() : await supabase.from("phd_research_citations").insert(payload).select().single();
    if (response.error) { toast.error(response.error.message); return false; }
    setCitations(current => entry.id ? current.map(c => c.id === entry.id ? response.data as CitationRow : c) : [response.data as CitationRow, ...current]);
    toast.success(t("Đã lưu tài liệu", "Source saved")); return true;
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <header className="border-b border-border pb-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3"><div className="bg-primary/10 p-3 rounded-md"><Brain className="w-7 h-7 text-primary" /></div><div><div className="flex items-center gap-2 text-sm text-muted-foreground mb-1"><ShieldCheck className="w-4 h-4" />{t("Không gian nghiên cứu cá nhân", "Private research workspace")}</div><h2 className="text-2xl font-bold">PhD Research</h2><p className="text-base text-muted-foreground mt-1">EdTech & Neuroscience</p></div></div>
          <div className="flex gap-6 border-l border-border pl-6"><div><div className="text-2xl font-semibold tabular-nums">{citations.length}</div><div className="text-sm text-muted-foreground">{t("Tài liệu", "Sources")}</div></div><div><div className="text-2xl font-semibold tabular-nums">{notes.length}</div><div className="text-sm text-muted-foreground">{t("Ghi chú", "Notes")}</div></div></div>
        </div>
      </header>
      {dataError && <div role="alert" className="border border-destructive/30 rounded-md p-4 text-destructive">{dataError}</div>}
      {aiError && <div role="alert" className="border border-destructive/30 rounded-md p-4 text-destructive">{aiError}</div>}
      <Tabs value={activeTab} onValueChange={v => { setActiveTab(v); setAiError(""); }} className="space-y-6">
        <div className="overflow-x-auto border-b border-border pb-2">
          <TabsList className="w-max h-auto bg-muted/40 p-1 gap-1">
            <TabsTrigger value="roadmap" className="gap-2 py-2.5"><ListChecks className="w-4 h-4" />{t("Lộ trình", "Roadmap")}</TabsTrigger>
            <TabsTrigger value="literature" className="gap-2 py-2.5"><Search className="w-4 h-4" />{t("Tìm tài liệu", "Literature")}</TabsTrigger>
            <TabsTrigger value="evidence" className="gap-2 py-2.5"><Tag className="w-4 h-4" />{t("Bằng chứng", "Evidence matrix")}</TabsTrigger>
            <TabsTrigger value="lab" className="gap-2 py-2.5"><FlaskConical className="w-4 h-4" />{t("Nghiên cứu AI", "AI research lab")}</TabsTrigger>
            <TabsTrigger value="notebook" className="gap-2 py-2.5"><BookOpen className="w-4 h-4" />{t("Sổ nghiên cứu", "Notebook")}</TabsTrigger>
            <TabsTrigger value="rq" className="gap-2 py-2.5"><Lightbulb className="w-4 h-4" />{t("Câu hỏi nghiên cứu", "Research questions")}</TabsTrigger>
            <TabsTrigger value="citations" className="gap-2 py-2.5"><Tag className="w-4 h-4" />{t("Thư viện nguồn", "Source library")}</TabsTrigger>
            <TabsTrigger value="proposal" className="gap-2 py-2.5"><FileText className="w-4 h-4" />{t("Đề cương", "Proposal")}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="evidence"><PhdEvidenceMatrix citations={citations} onSave={saveEvidence} /></TabsContent>
        <TabsContent value="lab"><PhdResearchTools context={researchContext} proposal={proposalText} onSave={saveLabNote} /></TabsContent>

        {/* ROADMAP */}
        <TabsContent value="roadmap">
          <PhdRoadmapChecklist userId={userId} />
        </TabsContent>

        {/* LITERATURE */}
        <TabsContent value="literature">
          <section className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> {t("Tìm tài liệu học thuật", "Academic literature search")}
              </CardTitle>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={litQuery}
                  onChange={(e) => setLitQuery(e.target.value)}
                  placeholder={t(
                    "VD: LLM tutor for second language learners 2023+",
                    "e.g. LLM tutor for second language learners 2023+",
                  )}
                  onKeyDown={(e) => e.key === "Enter" && runLitSearch()}
                />
                <Button onClick={runLitSearch} disabled={litLoading || !litQuery.trim()}>
                  {litLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  <span className="ml-1.5">{t("Tìm", "Search")}</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{t("Tóm tắt AI chưa phải tài liệu đã xác minh. Kiểm tra tác giả, năm, DOI và toàn văn trước khi trích dẫn.", "AI summaries are not verified bibliographic records. Check authors, year, DOI and full text before citing.")}</p>
              {litResult && (
                <div className="rounded-lg border border-border bg-card/50 p-4 space-y-3">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{DOMPurify.sanitize(litResult.content)}</ReactMarkdown>
                  </div>
                  {litResult.citations.length > 0 && (
                    <div className="border-t border-border pt-3">
                      <p className="text-xs font-semibold mb-2">{t("Nguồn", "Sources")}:</p>
                      <ul className="space-y-1">
                        {litResult.citations.slice(0, 10).map((u, i) => (
                          <li key={i} className="text-xs">
                            <a
                              href={u}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {u.length > 80 ? u.slice(0, 80) + "..." : u}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button size="sm" onClick={saveLitAsCitation}>
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    {t("Lưu bản tổng hợp", "Save synthesis draft")}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </TabsContent>

        {/* NOTEBOOK */}
        <TabsContent value="notebook">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">{t("Sổ ghi chú nghiên cứu", "Research Notebook")}</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportNotebook} disabled={!notes.length}>
                <Download className="w-3.5 h-3.5 mr-1.5" />
                {t("Export Markdown", "Export Markdown")}
              </Button>
              <Button size="sm" onClick={newNote}>
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                {t("Note mới", "New Note")}
              </Button>
            </div>
          </div>

          {editingNote && (
            <Card className="mb-3 border-primary/30">
              <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    placeholder={t("Tiêu đề", "Title")}
                    value={editingNote.title || ""}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                  />
                  <Select
                    value={editingNote.topic}
                    onValueChange={(v) => setEditingNote({ ...editingNote, topic: v })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {DEFAULT_TOPICS.map((tp) => (
                        <SelectItem key={tp} value={tp}>{tp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={String(editingNote.importance ?? 3)}
                    onValueChange={(v) => setEditingNote({ ...editingNote, importance: Number(v) })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {"⭐".repeat(n)} ({n}/5)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder={t("Tags (phẩy)", "Tags (comma-separated)")}
                  value={(editingNote.tags || []).join(", ")}
                  onChange={(e) =>
                    setEditingNote({
                      ...editingNote,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
                <Textarea
                  rows={10}
                  placeholder={t("Nội dung (Markdown hỗ trợ)", "Content (Markdown supported)")}
                  value={editingNote.content || ""}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={saveNote}>
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    {t("Lưu", "Save")}
                  </Button>
                  <Button variant="outline" onClick={polishCurrentNote} disabled={polishLoading}>
                    {polishLoading ? (
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
                    )}
                    {t("AI làm gọn", "AI Polish")}
                  </Button>
                  <Button variant="ghost" onClick={() => setEditingNote(null)}>
                    {t("Hủy", "Cancel")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Input className="mb-4" aria-label="Search research notes" value={noteQuery} onChange={e => setNoteQuery(e.target.value)} placeholder={t("Tìm ghi chú, chủ đề, tags…", "Search notes, topics, tags…")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.length === 0 && !editingNote && (
              <p className="text-muted-foreground text-sm italic">
                {t("Chưa có note. Tạo note mới hoặc lưu kết quả từ RQ Generator.", "No notes yet. Create one or save from RQ Generator.")}
              </p>
            )}
            {filteredNotes.map((n) => (
              <Card key={n.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm break-words">{n.title}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{n.topic}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {"⭐".repeat(n.importance)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingNote(n); if (n.topic === "Proposal") { setProposalTitle(n.title); setProposalText(n.content); } }} title={t("Sửa", "Edit")}>
                        <FileText className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteNote(n.id)} title={t("Xóa", "Delete")}>
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-wrap">{n.content}</div>
                  {n.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {n.tags.map((tg) => (
                        <span key={tg} className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* RQ GENERATOR */}
        <TabsContent value="rq">
          <section className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" /> Research Question + Hypothesis Generator
              </CardTitle>
            </div>
            <div className="space-y-4">
              <Textarea
                rows={3}
                placeholder={t(
                  "Mô tả ý tưởng (đối tượng, can thiệp, đầu ra). VD: 'LLM hints cá nhân hóa cải thiện IELTS Writing cho học sinh B1 VN'",
                  "Describe your idea (population, intervention, outcome).",
                )}
                value={rqTopic}
                onChange={(e) => setRqTopic(e.target.value)}
              />
              <Button onClick={runRqGen} disabled={rqLoading || !rqTopic.trim()}>
                {rqLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Sparkles className="w-4 h-4 mr-1.5" />}
                {t("Sinh 3 RQ + H1/H0", "Generate 3 RQs + H1/H0")}
              </Button>
              {rqResult && (
                <div className="rounded-lg border border-border bg-card/50 p-4 space-y-3">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{DOMPurify.sanitize(rqResult)}</ReactMarkdown>
                  </div>
                  <Button size="sm" onClick={saveRqAsNote}>
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    {t("Lưu vào Notebook", "Save to Notebook")}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </TabsContent>

        {/* CITATIONS */}
        <TabsContent value="citations">
          <div className="space-y-3">
            {citations.length === 0 && (
              <p className="text-muted-foreground text-sm italic">
                {t("Chưa có citation. Tìm trong tab Literature rồi nhấn 'Lưu vào Citations'.", "No citations yet. Search in the Literature tab and click 'Save to Citations'.")}
              </p>
            )}
            {citations.map((c) => (
              <Card key={c.id}>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm break-words">{c.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {c.authors && `${c.authors} · `}
                        {c.year && `${c.year} · `}
                        {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {safeResearchUrl(c.source_url) && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => { const url = safeResearchUrl(c.source_url); if (url) window.open(url, "_blank", "noopener,noreferrer"); }}
                          title={t("Mở nguồn", "Open source")}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => deleteCitation(c.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  {c.summary && (
                    <div className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-6">
                      {c.summary}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* PROPOSAL */}
        <TabsContent value="proposal">
          <section className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> {t("Đề cương & kiểm tra cấu trúc", "Proposal & structure check")}
              </CardTitle>
            </div>
            <div className="space-y-4">
              <Input
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                placeholder={t("Tiêu đề proposal", "Proposal title")}
              />
              <Textarea
                rows={18}
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                placeholder={t(
                  "Viết proposal (Markdown). Health Score sẽ check độ dài, RQ, methodology, citations (Author, YYYY)...",
                  "Write your proposal (Markdown). Health Score checks length, RQ, methodology, citations (Author, YYYY)...",
                )}
                className="font-mono text-sm"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">{t("Điểm cấu trúc tham khảo", "Structure heuristic")}</span>
                    <span
                      className={`text-2xl font-bold ${
                        proposalScore.total >= 80
                          ? "text-primary"
                          : proposalScore.total >= 50
                          ? "text-muted-foreground"
                          : "text-destructive"
                      }`}
                    >
                      {proposalScore.total}/100
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    {proposalScore.checks.map((ch) => (
                      <li key={ch.key} className="flex items-center gap-2">
                        <span className={ch.pass ? "text-primary" : "text-destructive"}>
                          {ch.pass ? "✓" : "✗"}
                        </span>
                        <span>{isVi ? ch.labelVi : ch.labelEn}</span>
                        {(isVi ? ch.detailVi : ch.detailEn) && (
                          <span className="text-muted-foreground">
                            ({isVi ? ch.detailVi : ch.detailEn})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border p-3 bg-muted/30 space-y-2">
                  <p className="text-sm font-semibold">
                    {t("Export & Save", "Export & Save")}
                  </p>
                  <Button size="sm" onClick={exportProposalDocx} disabled={!proposalText.trim()}>
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    {t("Tải .doc", "Download .doc")}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      if (!userId || !proposalText.trim()) return;
                      const { error } = await supabase.from("phd_research_notes").insert({
                        user_id: userId,
                        topic: "Proposal",
                        title: proposalTitle,
                        content: proposalText,
                        tags: ["proposal", `score-${proposalScore.total}`],
                        importance: 5,
                      });
                      if (error) return toast.error(t("Lưu thất bại", "Save failed"));
                      toast.success(t("Đã snapshot proposal", "Proposal snapshotted"));
                      const { data } = await supabase
                        .from("phd_research_notes")
                        .select("*")
                        .order("updated_at", { ascending: false });
                      setNotes((data || []) as NoteRow[]);
                    }}
                  >
                    <Save className="w-3.5 h-3.5 mr-1.5" />
                    {t("Snapshot vào Notebook", "Snapshot to Notebook")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "Điểm này chỉ kiểm tra cấu trúc, không đánh giá chất lượng khoa học. Dùng phản biện AI và ý kiến người hướng dẫn trước khi nộp.",
                      "This score checks structure only, not scientific quality. Use AI peer review and supervisor feedback before submission.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PhdResearchTab;
