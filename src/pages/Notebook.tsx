/**
 * @file Notebook.tsx
 * @description Digital notebook for students to write and save notes. Teachers can view all.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, Plus, Save, Trash2, Edit, Eye, Clock, User, Search, FileDown } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { format } from "date-fns";

const stripHtml = (html: string) => (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const sanitize = (html: string) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: ["p", "br", "hr", "strong", "em", "u", "b", "i", "ul", "ol", "li", "span", "div", "h1", "h2", "h3", "h4", "blockquote", "code", "pre"],
    ALLOWED_ATTR: ["class", "style"],
  });

interface Notebook {
  id: string;
  user_id: string;
  title: string;
  content: string;
  subject: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const SUBJECTS = [
  { value: "general", label: "📝 General" },
  { value: "english", label: "🇬🇧 English" },
  { value: "chinese", label: "🇨🇳 Chinese" },
  { value: "vietnamese", label: "🇻🇳 Vietnamese" },
  { value: "finnish", label: "🇫🇮 Finnish" },
  { value: "programming", label: "💻 Programming" },
  { value: "ielts", label: "📊 IELTS" },
  { value: "toeic", label: "📋 TOEIC" },
  { value: "cambridge", label: "🎓 Cambridge" },
];

const Notebook = () => {
  const { toast } = useToast();
  const { isTeacher } = useUserRole();
  const [user, setUser] = useState<any>(null);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [allNotebooks, setAllNotebooks] = useState<(Notebook & { profile_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("general");
  const [showEditor, setShowEditor] = useState(false);

  // View state
  const [viewNote, setViewNote] = useState<(Notebook & { profile_name?: string }) | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchNotebooks();
  }, [user]);

  useEffect(() => {
    if (user && isTeacher) fetchAllNotebooks();
  }, [user, isTeacher]);

  // Refetch when other parts of the app append to a notebook (e.g. PhrasePractice)
  useEffect(() => {
    if (!user) return;
    const handler = () => {
      fetchNotebooks();
      if (isTeacher) fetchAllNotebooks();
    };
    window.addEventListener("notebook:updated", handler as EventListener);
    return () => window.removeEventListener("notebook:updated", handler as EventListener);
  }, [user, isTeacher]);

  const fetchNotebooks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("student_notebooks")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    if (!error && data) setNotebooks(data);
    setLoading(false);
  };

  const fetchAllNotebooks = async () => {
    const { data, error } = await supabase
      .from("student_notebooks")
      .select("*")
      .order("updated_at", { ascending: false });
    if (!error && data) {
      // Fetch profile names
      const userIds = [...new Set(data.map((n: Notebook) => n.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);
      const profileMap = new Map(profiles?.map((p: any) => [p.id, p.full_name]) ?? []);
      setAllNotebooks(data.map((n: Notebook) => ({ ...n, profile_name: profileMap.get(n.user_id) || "Student" })));
    }
  };

  const resetEditor = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setSubject("general");
    setShowEditor(false);
  };

  const handleSave = async () => {
    if (!user) {
      toast({ title: "Vui lòng đăng nhập", description: "Bạn cần đăng nhập để sử dụng sổ tay", variant: "destructive" });
      return;
    }
    if (!title.trim()) {
      toast({ title: "Thiếu tiêu đề", description: "Vui lòng nhập tiêu đề cho ghi chú", variant: "destructive" });
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("student_notebooks")
        .update({ title: title.trim(), content, subject, updated_at: new Date().toISOString() })
        .eq("id", editingId);
      if (error) {
        toast({ title: "Lỗi", description: "Không thể cập nhật ghi chú", variant: "destructive" });
      } else {
        toast({ title: "Đã lưu ✅", description: "Ghi chú đã được cập nhật" });
        resetEditor();
        fetchNotebooks();
        if (isTeacher) fetchAllNotebooks();
      }
    } else {
      const { error } = await supabase
        .from("student_notebooks")
        .insert({ user_id: user.id, title: title.trim(), content, subject });
      if (error) {
        toast({ title: "Lỗi", description: "Không thể tạo ghi chú", variant: "destructive" });
      } else {
        toast({ title: "Đã tạo ✅", description: "Ghi chú mới đã được lưu" });
        resetEditor();
        fetchNotebooks();
        if (isTeacher) fetchAllNotebooks();
      }
    }
  };

  const handleEdit = (note: Notebook) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("student_notebooks").delete().eq("id", id);
    if (!error) {
      toast({ title: "Đã xóa", description: "Ghi chú đã được xóa" });
      fetchNotebooks();
      if (isTeacher) fetchAllNotebooks();
    }
  };

  const getSubjectLabel = (val: string) => SUBJECTS.find(s => s.value === val)?.label ?? val;

  const buildPdfStyles = () => `
  @page { size: A4; margin: 20mm 18mm 22mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Georgia', 'Segoe UI', serif; color: #1a1a2e; line-height: 1.75; font-size: 12pt; margin: 0; }
  .cover { height: 257mm; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; page-break-after: always; background: linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%); border-radius: 12px; padding: 40px; }
  .cover .logo { font-size: 14pt; letter-spacing: 4px; color: #10b981; font-weight: 700; margin-bottom: 24px; }
  .cover h1 { font-size: 38pt; background: linear-gradient(90deg, #3B82F6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 16px; line-height: 1.15; }
  .cover .subtitle { font-size: 14pt; color: #475569; font-style: italic; margin-bottom: 40px; }
  .cover .stats { display: flex; gap: 32px; margin-top: 20px; }
  .cover .stat { background: #fff; padding: 16px 24px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); min-width: 110px; }
  .cover .stat .num { font-size: 26pt; font-weight: 800; color: #1e40af; display: block; }
  .cover .stat .lbl { font-size: 9pt; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
  .cover .meta { margin-top: 40px; color: #64748b; font-size: 11pt; }
  .toc { page-break-after: always; }
  .toc h2 { color: #1e40af; border-bottom: 3px solid #10b981; padding-bottom: 10px; font-size: 22pt; }
  .toc ol { padding-left: 24px; }
  .toc li { padding: 6px 0; border-bottom: 1px dotted #cbd5e1; font-size: 12pt; }
  .toc li .ti { font-weight: 600; color: #0f172a; }
  .toc li .sub { color: #64748b; font-size: 10pt; margin-left: 6px; }
  .note { page-break-before: always; padding-top: 6px; }
  .note:first-of-type { page-break-before: auto; }
  .note h1 { color: #1e40af; border-bottom: 3px solid #10b981; padding-bottom: 8px; margin: 0 0 6px; font-size: 22pt; }
  .badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 3px 12px; border-radius: 14px; font-size: 9.5pt; margin-left: 8px; vertical-align: middle; font-family: 'Segoe UI', sans-serif; }
  .meta { font-size: 10pt; color: #64748b; margin-bottom: 20px; font-family: 'Segoe UI', sans-serif; }
  .meta strong { color: #0f172a; }
  .content { text-align: justify; }
  .content p { margin: 10px 0; }
  .content hr { border: none; border-top: 1.5px dashed #cbd5e1; margin: 18px 0; }
  .content strong { color: #0f172a; }
  .content blockquote { border-left: 4px solid #10b981; padding: 6px 14px; background: #f0fdf4; margin: 12px 0; color: #334155; font-style: italic; }
  .content code, .content pre { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; font-size: 10.5pt; }
  .footer { position: fixed; bottom: 8mm; left: 0; right: 0; text-align: center; font-size: 8.5pt; color: #94a3b8; font-family: 'Segoe UI', sans-serif; }
  @media print { .cover, .toc, .note { break-inside: avoid; } }
  `;

  const openPrintWindow = (innerHtml: string, title: string) => {
    const html = `<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>${title}</title><style>${buildPdfStyles()}</style></head><body>${innerHtml}<div class="footer">© ${new Date().getFullYear()} HaiEduTech · Sổ Tay Điện Tử · ${title}</div><script>window.addEventListener('load',()=>{setTimeout(()=>window.print(),400);});</script></body></html>`;
    const w = window.open("", "_blank");
    if (!w) {
      toast({ title: "Bị chặn popup", description: "Vui lòng cho phép popup để xuất PDF", variant: "destructive" });
      return;
    }
    w.document.write(html);
    w.document.close();
    toast({ title: "Đang tạo PDF 📄", description: "Chọn 'Save as PDF' trong hộp thoại in" });
  };

  const renderNoteBlock = (note: Notebook & { profile_name?: string }) => {
    const safeContent = sanitize(note.content || "<p><em>Chưa có nội dung</em></p>");
    const subjectLabel = getSubjectLabel(note.subject);
    const updated = format(new Date(note.updated_at), "dd/MM/yyyy HH:mm");
    const wordCount = stripHtml(note.content).split(/\s+/).filter(Boolean).length;
    const author = note.profile_name ? `<strong>Học sinh:</strong> ${note.profile_name} · ` : "";
    return `<section class="note"><h1>${note.title || "Không tiêu đề"} <span class="badge">${subjectLabel}</span></h1><div class="meta">${author}<strong>Cập nhật:</strong> ${updated} · <strong>${wordCount}</strong> từ</div><div class="content">${safeContent}</div></section>`;
  };

  const handleExportPDF = (note: Notebook & { profile_name?: string }) => {
    openPrintWindow(renderNoteBlock(note), note.title || "Notebook");
  };

  const handleExportAllPDF = () => {
    const notes = filterNotes(notebooks);
    if (notes.length === 0) {
      toast({ title: "Chưa có ghi chú", description: "Không có ghi chú nào để xuất", variant: "destructive" });
      return;
    }
    const totalWords = notes.reduce((s, n) => s + stripHtml(n.content).split(/\s+/).filter(Boolean).length, 0);
    const subjects = new Set(notes.map(n => n.subject)).size;
    const today = format(new Date(), "dd/MM/yyyy");
    const cover = `<section class="cover"><div class="logo">HAIEDUTECH</div><h1>Sổ Tay Học Tập</h1><div class="subtitle">"Học thông minh • Dẫn đầu kỷ nguyên số"</div><div class="stats"><div class="stat"><span class="num">${notes.length}</span><span class="lbl">Ghi chú</span></div><div class="stat"><span class="num">${totalWords.toLocaleString()}</span><span class="lbl">Từ</span></div><div class="stat"><span class="num">${subjects}</span><span class="lbl">Chủ đề</span></div></div><div class="meta">Xuất ngày ${today}</div></section>`;
    const toc = `<section class="toc"><h2>📑 Mục Lục</h2><ol>${notes.map(n => `<li><span class="ti">${n.title || "Không tiêu đề"}</span><span class="sub">— ${getSubjectLabel(n.subject)} · ${format(new Date(n.updated_at), "dd/MM/yyyy")}</span></li>`).join("")}</ol></section>`;
    const body = notes.map(renderNoteBlock).join("");
    openPrintWindow(cover + toc + body, `So-tay-${today.replace(/\//g, "-")}`);
  };


  const filterNotes = (notes: (Notebook & { profile_name?: string })[]) => {
    return notes.filter(n => {
      const matchSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = filterSubject === "all" || n.subject === filterSubject;
      return matchSearch && matchSubject;
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">📒 Sổ Tay Điện Tử</h1>
          <p className="text-muted-foreground mb-4">Vui lòng đăng nhập để sử dụng sổ tay ghi chú</p>
          <Button onClick={() => window.location.href = "/login"}>Đăng nhập</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              📒 Sổ Tay Điện Tử
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Ghi chú bài học, ý tưởng & bài viết của bạn</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportAllPDF} className="gap-2" title="Xuất toàn bộ sổ tay ra PDF">
              <FileDown className="w-4 h-4" /> Xuất tất cả PDF
            </Button>
            <Button onClick={() => { resetEditor(); setShowEditor(true); }} className="gap-2">
              <Plus className="w-4 h-4" /> Ghi chú mới
            </Button>
          </div>
        </div>

        {/* Editor */}
        {showEditor && (
          <Card className="mb-6 border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Edit className="w-5 h-5" />
                {editingId ? "Chỉnh sửa ghi chú" : "Tạo ghi chú mới"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Tiêu đề ghi chú..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="flex-1"
                />
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Viết nội dung ghi chú ở đây... Bạn có thể ghi chép bài học, viết bài luận, hay lưu ý tưởng."
                value={content}
                onChange={e => setContent(e.target.value)}
                className="min-h-[250px] font-mono text-sm"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{content.length} ký tự · {content.split(/\s+/).filter(Boolean).length} từ</p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetEditor}>Hủy</Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Lưu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="my-notes">
          <TabsList>
            <TabsTrigger value="my-notes">📝 Ghi chú của tôi ({notebooks.length})</TabsTrigger>
            {isTeacher && <TabsTrigger value="all-notes">👁️ Tất cả học sinh ({allNotebooks.length})</TabsTrigger>}
          </TabsList>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 my-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm ghi chú..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Lọc theo môn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả môn</SelectItem>
                {SUBJECTS.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="my-notes">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Đang tải...</div>
            ) : filterNotes(notebooks).length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên!</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {filterNotes(notebooks).map(note => (
                  <Card key={note.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{note.title || "Không tiêu đề"}</h3>
                            <Badge variant="secondary" className="text-xs shrink-0">{getSubjectLabel(note.subject)}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{stripHtml(note.content) || "Chưa có nội dung"}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(note.updated_at), "dd/MM/yyyy HH:mm")}</span>
                            <span>{stripHtml(note.content).split(/\s+/).filter(Boolean).length} từ</span>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="icon" onClick={() => setViewNote(note)} title="Xem"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleExportPDF(note)} title="Xuất PDF"><FileDown className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(note)} title="Sửa"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)} className="text-destructive hover:text-destructive" title="Xóa"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {isTeacher && (
            <TabsContent value="all-notes">
              {filterNotes(allNotebooks).length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Không có ghi chú nào</div>
              ) : (
                <div className="grid gap-3">
                  {filterNotes(allNotebooks).map(note => (
                    <Card key={note.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{note.title || "Không tiêu đề"}</h3>
                              <Badge variant="secondary" className="text-xs shrink-0">{getSubjectLabel(note.subject)}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{stripHtml(note.content) || "Chưa có nội dung"}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><User className="w-3 h-3" />{note.profile_name}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(note.updated_at), "dd/MM/yyyy HH:mm")}</span>
                              <span>{stripHtml(note.content).split(/\s+/).filter(Boolean).length} từ</span>
                            </div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button variant="ghost" size="icon" onClick={() => setViewNote(note)} title="Xem"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleExportPDF(note)} title="Xuất PDF"><FileDown className="w-4 h-4" /></Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* View dialog */}
      <Dialog open={!!viewNote} onOpenChange={() => setViewNote(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewNote?.title}
              <Badge variant="secondary">{getSubjectLabel(viewNote?.subject ?? "general")}</Badge>
            </DialogTitle>
          </DialogHeader>
          {viewNote && (
            <div>
              {(viewNote as any).profile_name && (
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                  <User className="w-3 h-3" /> {(viewNote as any).profile_name}
                </p>
              )}
              <div className="flex items-center justify-between mb-4 gap-2">
                <p className="text-xs text-muted-foreground">
                  Cập nhật: {format(new Date(viewNote.updated_at), "dd/MM/yyyy HH:mm")} · {stripHtml(viewNote.content).split(/\s+/).filter(Boolean).length} từ
                </p>
                <Button size="sm" variant="outline" onClick={() => handleExportPDF(viewNote)} className="gap-2 shrink-0">
                  <FileDown className="w-4 h-4" /> Xuất PDF
                </Button>
              </div>
              {viewNote.content ? (
                <div
                  className="text-sm leading-relaxed bg-muted/30 rounded-lg p-4 min-h-[200px] prose prose-sm max-w-none dark:prose-invert [&_hr]:my-3 [&_hr]:border-border [&_p]:my-1.5"
                  dangerouslySetInnerHTML={{ __html: sanitize(viewNote.content) }}
                />
              ) : (
                <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-4 min-h-[200px]">
                  Chưa có nội dung
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Notebook;
