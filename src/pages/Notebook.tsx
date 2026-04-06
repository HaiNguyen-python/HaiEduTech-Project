/**
 * @file Notebook.tsx
 * @description Digital notebook for students to write and save notes. Teachers can view all.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect } from "react";
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
import { BookOpen, Plus, Save, Trash2, Edit, Eye, Clock, User, Search } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { format } from "date-fns";

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
          <Button onClick={() => { resetEditor(); setShowEditor(true); }} className="gap-2">
            <Plus className="w-4 h-4" /> Ghi chú mới
          </Button>
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
                          <p className="text-sm text-muted-foreground line-clamp-2">{note.content || "Chưa có nội dung"}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(note.updated_at), "dd/MM/yyyy HH:mm")}</span>
                            <span>{note.content.split(/\s+/).filter(Boolean).length} từ</span>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="icon" onClick={() => setViewNote(note)}><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(note)}><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(note.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
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
                            <p className="text-sm text-muted-foreground line-clamp-2">{note.content || "Chưa có nội dung"}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><User className="w-3 h-3" />{note.profile_name}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{format(new Date(note.updated_at), "dd/MM/yyyy HH:mm")}</span>
                              <span>{note.content.split(/\s+/).filter(Boolean).length} từ</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => setViewNote(note)}><Eye className="w-4 h-4" /></Button>
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
              <p className="text-xs text-muted-foreground mb-4">
                Cập nhật: {format(new Date(viewNote.updated_at), "dd/MM/yyyy HH:mm")} · {viewNote.content.split(/\s+/).filter(Boolean).length} từ
              </p>
              <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4 min-h-[200px]">
                {viewNote.content || "Chưa có nội dung"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Notebook;
