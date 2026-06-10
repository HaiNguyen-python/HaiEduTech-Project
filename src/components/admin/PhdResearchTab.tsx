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
  Save, Plus, Trash2, ExternalLink, Download, Tag, Star
} from "lucide-react";
import { scoreProposal, buildProposalDocxBlob } from "@/lib/phdProposalScore";

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

const DEFAULT_TOPICS = [
  "AI Tutors & LLM",
  "Adaptive Learning",
  "Learning Analytics",
  "Gamification & Motivation",
  "Equity & Access",
  "Assessment & Grading",
  "Multimodal Learning",
  "General",
];

const PhdResearchTab = () => {
  const { language } = useLanguage();
  const isVi = language === "vi";
  const t = (vi: string, en: string) => (isVi ? vi : en);

  const [userId, setUserId] = useState<string | null>(null);
  const [notes, setNotes] = useState<NoteRow[]>([]);
  const [citations, setCitations] = useState<CitationRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);

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
  const [proposalTitle, setProposalTitle] = useState("PhD Proposal - EdTech");
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
        supabase.from("phd_research_notes").select("*").order("updated_at", { ascending: false }),
        supabase.from("phd_research_citations").select("*").order("created_at", { ascending: false }),
      ]);
      if (!n.error) setNotes((n.data || []) as NoteRow[]);
      if (!c.error) setCitations((c.data || []) as CitationRow[]);
      setLoadingData(false);
    })();
  }, []);

  // ===== Literature =====
  const runLitSearch = useCallback(async () => {
    if (!litQuery.trim()) return;
    setLitLoading(true);
    setLitResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "literature", query: litQuery, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      setLitResult({ content: data.content || "", citations: data.citations || [] });
    } catch (e) {
      toast.error(t("Lỗi khi tìm tài liệu", "Literature search failed"));
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
        tags: ["lit-review"],
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
    setRqLoading(true);
    setRqResult("");
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "rq", topic: rqTopic, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      setRqResult(data.content || "");
    } catch {
      toast.error(t("Lỗi khi sinh RQ", "RQ generation failed"));
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
    setPolishLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("phd-research-ai", {
        body: { mode: "note_polish", content: editingNote.content, language: isVi ? "vi" : "en" },
      });
      if (error) throw error;
      setEditingNote({ ...editingNote, content: data.content || editingNote.content });
      toast.success(t("Đã làm gọn note", "Note polished"));
    } catch {
      toast.error(t("Lỗi AI", "AI error"));
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

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-indigo-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <GraduationCap className="w-6 h-6 text-violet-600" />
            🎓 PhD Research (EdTech) — Workspace cá nhân
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t(
              "Workspace nghiên cứu PhD ngành EdTech — chỉ bạn xem được. Bao gồm tìm tài liệu (AI), notebook, sinh câu hỏi nghiên cứu, và proposal builder.",
              "Personal PhD (EdTech) research workspace — only you can see it. Includes AI literature search, notebook, RQ generator, and proposal builder.",
            )}
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="literature" className="space-y-4">
        <ScrollArea className="w-full">
          <TabsList className="w-max">
            <TabsTrigger value="literature" className="gap-1.5">
              <Search className="w-3.5 h-3.5" /> Literature
            </TabsTrigger>
            <TabsTrigger value="notebook" className="gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Notebook ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="rq" className="gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> RQ Generator
            </TabsTrigger>
            <TabsTrigger value="citations" className="gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Citations ({citations.length})
            </TabsTrigger>
            <TabsTrigger value="proposal" className="gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Proposal
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        {/* LITERATURE */}
        <TabsContent value="literature">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" /> AI Literature Review (Perplexity · academic mode)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                              className="text-violet-600 hover:underline flex items-center gap-1"
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
                    {t("Lưu vào Citations", "Save to Citations")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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
            <Card className="mb-3 border-violet-500/40">
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
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-violet-600" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.length === 0 && !editingNote && (
              <p className="text-muted-foreground text-sm italic">
                {t("Chưa có note. Tạo note mới hoặc lưu kết quả từ RQ Generator.", "No notes yet. Create one or save from RQ Generator.")}
              </p>
            )}
            {notes.map((n) => (
              <Card key={n.id} className="hover:border-violet-500/40 transition-colors">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm break-words">{n.title}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-[10px]">{n.topic}</Badge>
                        <span className="text-[11px] text-amber-600">
                          {"⭐".repeat(n.importance)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditingNote(n)} title={t("Sửa", "Edit")}>
                        <FileText className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteNote(n.id)} title={t("Xóa", "Delete")}>
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-wrap">{n.content}</div>
                  {n.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {n.tags.map((tg) => (
                        <span key={tg} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Research Question + Hypothesis Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
            </CardContent>
          </Card>
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
                      <p className="text-[11px] text-muted-foreground">
                        {c.authors && `${c.authors} · `}
                        {c.year && `${c.year} · `}
                        {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {c.source_url && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => window.open(c.source_url!, "_blank")}
                          title={t("Mở nguồn", "Open source")}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => deleteCitation(c.id)}>
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Proposal Builder + Health Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                    <span className="text-sm font-semibold">Health Score</span>
                    <span
                      className={`text-2xl font-bold ${
                        proposalScore.total >= 80
                          ? "text-emerald-600"
                          : proposalScore.total >= 50
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {proposalScore.total}/100
                    </span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    {proposalScore.checks.map((ch) => (
                      <li key={ch.key} className="flex items-center gap-2">
                        <span className={ch.pass ? "text-emerald-600" : "text-red-500"}>
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
                  <p className="text-[11px] text-muted-foreground">
                    {t(
                      "💡 Mục tiêu Health Score ≥ 80 trước khi gửi cho supervisor.",
                      "💡 Aim for Health Score ≥ 80 before sending to a supervisor.",
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PhdResearchTab;
