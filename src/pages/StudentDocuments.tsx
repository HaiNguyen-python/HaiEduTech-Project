/**
 * @file StudentDocuments.tsx
 * @description Private document vault — categorized file manager backed by Supabase Storage.
 */
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FolderLock, Upload, FileText, Image as ImageIcon, FileType2,
  Trash2, Pencil, Download, Eye, Loader2, Plus, ShieldCheck, FileWarning,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_FILES_PER_USER = 50;
const ALLOWED_MIME = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "image/jpeg",
  "image/png",
];

type StatusTag = "draft" | "final" | "verified";
type Category = "transcripts" | "identity" | "language" | "drafts" | "other";

interface DocRow {
  id: string;
  user_id: string;
  category: Category;
  display_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number;
  status: StatusTag;
  created_at: string;
}

const STATUS_STYLE: Record<StatusTag, string> = {
  draft: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  final: "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30",
  verified: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
};

const StudentDocuments = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [pendingCategory, setPendingCategory] = useState<Category>("transcripts");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [renameTarget, setRenameTarget] = useState<DocRow | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const CATEGORIES: { id: Category; label: string; icon: typeof FileText; gradient: string }[] = [
    { id: "transcripts", label: t("Bảng điểm", "Academic Transcripts"), icon: FileText, gradient: "from-sky-500 to-indigo-600" },
    { id: "identity", label: t("Giấy tờ tùy thân", "Identity Docs"), icon: ShieldCheck, gradient: "from-violet-500 to-fuchsia-600" },
    { id: "language", label: t("Chứng chỉ ngôn ngữ", "Language Certificates"), icon: FileType2, gradient: "from-emerald-500 to-teal-600" },
    { id: "drafts", label: t("Bản nháp", "Application Drafts"), icon: Pencil, gradient: "from-amber-500 to-orange-600" },
    { id: "other", label: t("Khác", "Other"), icon: FileWarning, gradient: "from-slate-500 to-zinc-600" },
  ];

  // Auth + initial load
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data.user) {
        navigate("/login?redirect=/study-abroad/documents");
        return;
      }
      setUserId(data.user.id);
      await fetchDocs(data.user.id);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const fetchDocs = async (uid: string) => {
    const { data, error } = await supabase
      .from("student_documents")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: t("Lỗi tải hồ sơ", "Failed to load documents"), description: error.message, variant: "destructive" });
      return;
    }
    setDocs((data as DocRow[]) || []);
  };

  const triggerUpload = (cat: Category) => {
    setPendingCategory(cat);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !userId) return;

    if (!ALLOWED_MIME.includes(file.type)) {
      toast({ title: t("Định dạng không hỗ trợ", "Unsupported file type"), description: "PDF, DOCX, JPG, PNG only.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast({ title: t("File quá lớn", "File too large"), description: t("Tối đa 10MB", "Max 10MB"), variant: "destructive" });
      return;
    }
    if (docs.length >= MAX_FILES_PER_USER) {
      toast({ title: t("Đã đầy", "Limit reached"), description: t(`Tối đa ${MAX_FILES_PER_USER} files`, `Max ${MAX_FILES_PER_USER} files`), variant: "destructive" });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    // Fake progress for UX (Supabase JS doesn't expose real progress for small uploads)
    const tick = setInterval(() => setUploadProgress((p) => Math.min(p + 8, 90)), 120);

    try {
      const safeName = file.name.replace(/[^\w.\-]/g, "_");
      const path = `${userId}/${pendingCategory}/${Date.now()}_${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("student-documents")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("student_documents").insert({
        user_id: userId,
        category: pendingCategory,
        display_name: file.name,
        storage_path: path,
        mime_type: file.type,
        size_bytes: file.size,
        status: "draft",
      });
      if (insErr) throw insErr;

      setUploadProgress(100);
      toast({ title: t("Tải lên thành công", "Uploaded"), description: file.name });
      await fetchDocs(userId);
    } catch (err: any) {
      toast({ title: t("Lỗi tải lên", "Upload failed"), description: err.message, variant: "destructive" });
    } finally {
      clearInterval(tick);
      setTimeout(() => { setUploading(false); setUploadProgress(0); }, 400);
    }
  };

  const handleDelete = async (doc: DocRow) => {
    if (!confirm(t(`Xoá "${doc.display_name}"?`, `Delete "${doc.display_name}"?`))) return;
    const { error: sErr } = await supabase.storage.from("student-documents").remove([doc.storage_path]);
    if (sErr) {
      toast({ title: t("Lỗi", "Error"), description: sErr.message, variant: "destructive" });
      return;
    }
    await supabase.from("student_documents").delete().eq("id", doc.id);
    setDocs((d) => d.filter((x) => x.id !== doc.id));
    toast({ title: t("Đã xoá", "Deleted") });
  };

  const handleRename = async () => {
    if (!renameTarget || !renameValue.trim()) return;
    const { error } = await supabase
      .from("student_documents")
      .update({ display_name: renameValue.trim() })
      .eq("id", renameTarget.id);
    if (error) {
      toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      return;
    }
    setDocs((d) => d.map((x) => (x.id === renameTarget.id ? { ...x, display_name: renameValue.trim() } : x)));
    setRenameTarget(null);
  };

  const handleStatus = async (doc: DocRow, status: StatusTag) => {
    const { error } = await supabase.from("student_documents").update({ status }).eq("id", doc.id);
    if (error) {
      toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      return;
    }
    setDocs((d) => d.map((x) => (x.id === doc.id ? { ...x, status } : x)));
  };

  const openFile = useCallback(async (doc: DocRow) => {
    const { data, error } = await supabase.storage
      .from("student-documents")
      .createSignedUrl(doc.storage_path, 60);
    if (error || !data?.signedUrl) {
      toast({ title: t("Lỗi", "Error"), description: error?.message, variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }, [t]);

  const downloadFile = useCallback(async (doc: DocRow) => {
    const { data, error } = await supabase.storage
      .from("student-documents")
      .createSignedUrl(doc.storage_path, 60, { download: doc.display_name });
    if (error || !data?.signedUrl) {
      toast({ title: t("Lỗi", "Error"), description: error?.message, variant: "destructive" });
      return;
    }
    window.location.href = data.signedUrl;
  }, [t]);

  const filtered = activeCategory === "all" ? docs : docs.filter((d) => d.category === activeCategory);

  const fileIcon = (mime: string | null) => {
    if (!mime) return FileText;
    if (mime.startsWith("image/")) return ImageIcon;
    if (mime.includes("pdf")) return FileText;
    return FileType2;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <FolderLock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{t("Hồ sơ của tôi", "My Documents")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("Riêng tư & bảo mật. Chỉ bạn mới thấy file của mình.", "Private & secure — only you can see your files.")}
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {docs.length}/{MAX_FILES_PER_USER} {t("file • Tối đa 10MB/file", "files • Max 10MB/file")}
            </div>
          </motion.div>

          {/* Categories grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`p-3 rounded-xl border text-left transition-all ${activeCategory === "all" ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"}`}
            >
              <div className="text-xs font-semibold mb-1">{t("Tất cả", "All")}</div>
              <div className="text-2xl font-bold">{docs.length}</div>
            </button>
            {CATEGORIES.map((c) => {
              const count = docs.filter((d) => d.category === c.id).length;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${activeCategory === c.id ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"}`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs font-semibold leading-tight mb-1">{c.label}</div>
                  <div className="text-lg font-bold">{count}</div>
                </button>
              );
            })}
          </div>

          {/* Upload bar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm font-semibold mb-1">{t("Tải lên hồ sơ mới", "Upload new document")}</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX, JPG, PNG • Max 10MB</div>
                </div>
                <Select value={pendingCategory} onValueChange={(v) => setPendingCategory(v as Category)}>
                  <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={() => triggerUpload(pendingCategory)} disabled={uploading} className="gap-2">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {t("Tải lên", "Upload")}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {uploading && (
                <div className="mt-3">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{uploadProgress}%</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File list */}
          {loading ? (
            <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-16 text-center">
                <FolderLock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">{t("Chưa có file nào trong mục này", "No files in this category yet")}</p>
                <Button variant="outline" className="mt-4 gap-2" onClick={() => triggerUpload(activeCategory === "all" ? "transcripts" : activeCategory)}>
                  <Plus className="w-4 h-4" />
                  {t("Tải lên file đầu tiên", "Upload your first file")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((doc) => {
                const Icon = fileIcon(doc.mime_type);
                const cat = CATEGORIES.find((c) => c.id === doc.category);
                return (
                  <motion.div key={doc.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="hover:border-primary/40 transition-colors">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat?.gradient || "from-slate-500 to-zinc-600"} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-[160px]">
                            <div className="font-semibold text-sm truncate">{doc.display_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {(doc.size_bytes / 1024).toFixed(0)} KB • {new Date(doc.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <Select value={doc.status} onValueChange={(v) => handleStatus(doc, v as StatusTag)}>
                            <SelectTrigger className="w-[120px] h-8">
                              <Badge variant="outline" className={`${STATUS_STYLE[doc.status]} text-xs border`}>
                                {doc.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="final">Final</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => openFile(doc)} title={t("Xem", "View")}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => downloadFile(doc)} title={t("Tải xuống", "Download")}>
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => { setRenameTarget(doc); setRenameValue(doc.display_name); }} title={t("Đổi tên", "Rename")}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDelete(doc)} title={t("Xoá", "Delete")}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!renameTarget} onOpenChange={(o) => !o && setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{t("Đổi tên file", "Rename file")}</DialogTitle></DialogHeader>
          <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>{t("Huỷ", "Cancel")}</Button>
            <Button onClick={handleRename}>{t("Lưu", "Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default StudentDocuments;
