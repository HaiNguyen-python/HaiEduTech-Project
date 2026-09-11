/**
 * @file ContentStudioTab.tsx
 * @description Admin Content Studio: author, preview and publish articles,
 * structured lessons and downloadable resources.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Copy, Eye, FileDown, FileText, GraduationCap, Loader2, Pencil, Plus, RefreshCw, Save,
  Search, Send, Trash2, Sparkles, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  KIND_LABEL, LEVEL_OPTIONS, SUBJECT_OPTIONS, emptyArticleDraft, emptyLessonDraft,
  emptyResourceDraft, slugify, uniqueSlug, validateForPublish,
  type ContentDraft, type ContentItem, type ContentKind, type ContentStatus,
  type ContentVisibility,
} from "@/lib/contentStudio";
import ArticleEditor from "./ArticleEditor";
import LessonBuilder from "./LessonBuilder";
import ResourceUploader from "./ResourceUploader";
import ContentPreview from "./ContentPreview";

const KIND_ICON: Record<ContentKind, typeof FileText> = {
  article: FileText,
  lesson: GraduationCap,
  resource: FileDown,
};

export default function ContentStudioTab() {
  const { t, lang } = useLanguage();
  const [rows, setRows] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [kindFilter, setKindFilter] = useState<"all" | ContentKind>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ContentStatus>("all");

  const [draft, setDraft] = useState<ContentDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const kindName = (kind: ContentKind) => (lang === "vi" ? KIND_LABEL[kind].vi : KIND_LABEL[kind].en);

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("content_items")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as ContentItem[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (kindFilter !== "all" && r.kind !== kindFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        r.title.toLowerCase().includes(needle) ||
        (r.title_en ?? "").toLowerCase().includes(needle) ||
        r.slug.includes(needle) ||
        (r.tags ?? []).some((tag) => tag.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, kindFilter, statusFilter]);

  const patch = (p: Partial<ContentDraft>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const startNew = (kind: ContentKind) => {
    setDraft(
      kind === "article" ? emptyArticleDraft() : kind === "lesson" ? emptyLessonDraft() : emptyResourceDraft(),
    );
    setAiTopic("");
  };

  const startEdit = (row: ContentItem) => {
    setDraft({ ...row });
    setAiTopic("");
  };

  const duplicate = (row: ContentItem) => {
    setDraft({
      ...row,
      id: undefined,
      title: `${row.title} (copy)`,
      slug: "",
      status: "draft",
    });
  };

  const save = async (nextStatus?: ContentStatus) => {
    if (!draft) return;
    const status = nextStatus ?? draft.status;
    if (!draft.title.trim()) {
      toast.error(t("Vui lòng nhập tiêu đề.", "Please enter a title."));
      return;
    }
    if (status === "published") {
      const issues = validateForPublish({ ...draft, status });
      if (issues.length > 0) {
        toast.error(lang === "vi" ? issues[0].vi : issues[0].en);
        return;
      }
    }
    setSaving(true);
    try {
      const slug = draft.slug?.trim()
        ? slugify(draft.slug)
        : await uniqueSlug(draft.title_en || draft.title, draft.id);
      const payload: Record<string, unknown> = {
        kind: draft.kind,
        title: draft.title.trim(),
        title_en: draft.title_en?.trim() || null,
        slug,
        summary: draft.summary?.trim() || null,
        summary_en: draft.summary_en?.trim() || null,
        cover_url: draft.cover_url || null,
        body: draft.body ?? {},
        subject: draft.subject || null,
        level: draft.level || null,
        tags: draft.tags ?? [],
        visibility: draft.visibility,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (draft.id) {
        const { error } = await (supabase as any)
          .from("content_items").update(payload).eq("id", draft.id);
        if (error) throw error;
      } else {
        const { data: auth } = await supabase.auth.getUser();
        const { data, error } = await (supabase as any)
          .from("content_items")
          .insert({ ...payload, created_by: auth?.user?.id ?? null })
          .select("id")
          .single();
        if (error) throw error;
        setDraft((d) => (d ? { ...d, id: data.id, slug, status } : d));
      }
      setDraft((d) => (d ? { ...d, slug, status } : d));
      toast.success(
        status === "published"
          ? t("Đã đăng nội dung", "Content published")
          : t("Đã lưu bản nháp", "Draft saved"),
      );
      await fetchAll();
    } catch (e: any) {
      toast.error(e?.message || t("Lưu thất bại", "Save failed"));
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (row: ContentItem, status: ContentStatus) => {
    if (status === "published") {
      const issues = validateForPublish(row as ContentDraft);
      if (issues.length > 0) {
        toast.error(lang === "vi" ? issues[0].vi : issues[0].en);
        return;
      }
    }
    const { error } = await (supabase as any)
      .from("content_items")
      .update({ status, published_at: status === "published" ? new Date().toISOString() : null })
      .eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(status === "published" ? t("Đã đăng", "Published") : t("Đã ẩn", "Unpublished"));
    fetchAll();
  };

  const remove = async (row: ContentItem) => {
    if (!window.confirm(t("Xoá nội dung này?", "Delete this content?"))) return;
    const { error } = await (supabase as any).from("content_items").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success(t("Đã xoá", "Deleted"));
    if (draft?.id === row.id) setDraft(null);
    fetchAll();
  };

  const generateDraft = async () => {
    if (!draft) return;
    if (!aiTopic.trim()) {
      toast.error(t("Nhập chủ đề để AI soạn nháp.", "Enter a topic for the AI draft."));
      return;
    }
    setAiBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content-draft", {
        body: {
          kind: draft.kind,
          topic: aiTopic.trim(),
          subject: draft.subject || "English",
          level: draft.level || "All levels",
        },
      });
      if (error) throw error;
      if (!data?.draft) throw new Error(data?.error || "empty draft");
      const d = data.draft;
      patch({
        title: draft.title || d.title || "",
        title_en: draft.title_en || d.title_en || "",
        summary: d.summary ?? draft.summary,
        summary_en: d.summary_en ?? draft.summary_en,
        tags: (d.tags ?? draft.tags ?? []).slice(0, 8),
        body: d.body ?? draft.body,
      });
      toast.success(t("AI đã soạn bản nháp", "AI draft ready"));
    } catch (e: any) {
      toast.error(e?.message || t("AI soạn nháp thất bại", "AI draft failed"));
    } finally {
      setAiBusy(false);
    }
  };

  /* ------------------------------------------------------------ editor ---- */
  if (draft) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {draft.id
              ? `${t("Chỉnh sửa", "Edit")} ${kindName(draft.kind)}`
              : `${t("Tạo mới", "New")} ${kindName(draft.kind)}`}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" onClick={() => setDraft(null)}>
              <X className="mr-1 h-4 w-4" />{t("Đóng", "Close")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)}>
              <Eye className="mr-1 h-4 w-4" />{t("Xem trước", "Preview")}
            </Button>
            <Button variant="outline" size="sm" disabled={saving} onClick={() => save("draft")}>
              {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
              {t("Lưu nháp", "Save draft")}
            </Button>
            <Button size="sm" disabled={saving} onClick={() => save("published")}>
              <Send className="mr-1 h-4 w-4" />{t("Đăng", "Publish")}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t("Thông tin chung", "Basics")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cs-title">{t("Tiêu đề (Tiếng Việt)", "Title (Vietnamese)")}</Label>
              <Input id="cs-title" value={draft.title}
                onChange={(e) => patch({ title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cs-title-en">{t("Tiêu đề (English)", "Title (English)")}</Label>
              <Input id="cs-title-en" value={draft.title_en ?? ""}
                onChange={(e) => patch({ title_en: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cs-slug">{t("Đường dẫn (slug)", "Slug")}</Label>
              <Input id="cs-slug" value={draft.slug}
                placeholder={t("tự động tạo nếu để trống", "auto-generated when empty")}
                onChange={(e) => patch({ slug: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cs-tags">{t("Thẻ (phân cách bởi dấu phẩy)", "Tags (comma separated)")}</Label>
              <Input id="cs-tags" value={(draft.tags ?? []).join(", ")}
                onChange={(e) =>
                  patch({
                    tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12),
                  })
                } />
            </div>
            <div className="space-y-2">
              <Label>{t("Môn / chủ đề", "Subject")}</Label>
              <Select value={draft.subject ?? "none"}
                onValueChange={(v) => patch({ subject: v === "none" ? null : v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("Không chọn", "None")}</SelectItem>
                  {SUBJECT_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("Trình độ", "Level")}</Label>
              <Select value={draft.level ?? "none"}
                onValueChange={(v) => patch({ level: v === "none" ? null : v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("Không chọn", "None")}</SelectItem>
                  {LEVEL_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("Ai được xem", "Who can see it")}</Label>
              <Select value={draft.visibility}
                onValueChange={(v) => patch({ visibility: v as ContentVisibility })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">{t("Công khai (mọi người)", "Public (everyone)")}</SelectItem>
                  <SelectItem value="students">{t("Chỉ học sinh đã đăng nhập", "Signed-in students only")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {draft.kind !== "resource" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-primary" />
                {t("Soạn nháp bằng AI", "AI draft")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea rows={2} value={aiTopic} onChange={(e) => setAiTopic(e.target.value)}
                placeholder={t(
                  "Ví dụ: Cách viết mở bài IELTS Writing Task 2",
                  "Example: How to write an IELTS Writing Task 2 introduction",
                )} />
              <Button type="button" size="sm" variant="outline" disabled={aiBusy} onClick={generateDraft}>
                {aiBusy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Sparkles className="mr-1 h-4 w-4" />}
                {t("Tạo bản nháp", "Generate draft")}
              </Button>
              <p className="text-xs text-muted-foreground">
                {t(
                  "AI chỉ tạo bản nháp. Hãy đọc lại và chỉnh sửa trước khi đăng.",
                  "AI only creates a draft. Review and edit it before publishing.",
                )}
              </p>
            </CardContent>
          </Card>
        )}

        {draft.kind === "article" && <ArticleEditor draft={draft} onChange={patch} />}
        {draft.kind === "lesson" && <LessonBuilder draft={draft} onChange={patch} />}
        {draft.kind === "resource" && <ResourceUploader draft={draft} onChange={patch} />}

        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("Xem trước như học sinh", "Preview as a student")}</DialogTitle>
            </DialogHeader>
            <ContentPreview draft={draft} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  /* -------------------------------------------------------------- list ---- */
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">{t("Trung tâm nội dung", "Content Studio")}</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => startNew("article")}>
            <Plus className="mr-1 h-4 w-4" />{t("Bài viết", "Article")}
          </Button>
          <Button size="sm" variant="outline" onClick={() => startNew("lesson")}>
            <Plus className="mr-1 h-4 w-4" />{t("Bài giảng", "Lesson")}
          </Button>
          <Button size="sm" variant="outline" onClick={() => startNew("resource")}>
            <Plus className="mr-1 h-4 w-4" />{t("Tài liệu", "Resource")}
          </Button>
          <Button size="sm" variant="ghost" onClick={fetchAll} aria-label={t("Tải lại", "Refresh")}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_160px_160px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={t("Tìm theo tiêu đề, slug, thẻ...", "Search title, slug, tags...")} />
        </div>
        <Select value={kindFilter} onValueChange={(v) => setKindFilter(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("Tất cả loại", "All kinds")}</SelectItem>
            <SelectItem value="article">{kindName("article")}</SelectItem>
            <SelectItem value="lesson">{kindName("lesson")}</SelectItem>
            <SelectItem value="resource">{kindName("resource")}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("Tất cả trạng thái", "All statuses")}</SelectItem>
            <SelectItem value="draft">{t("Nháp", "Draft")}</SelectItem>
            <SelectItem value="published">{t("Đã đăng", "Published")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 p-6 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("Đang tải...", "Loading...")}
        </div>
      ) : filtered.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-8 text-center text-muted-foreground">
          {t("Chưa có nội dung nào.", "No content yet.")}
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((row) => {
            const Icon = KIND_ICON[row.kind];
            return (
              <Card key={row.id}>
                <CardContent className="flex flex-wrap items-center gap-3 p-4">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-medium leading-snug">{row.title}</p>
                    <p className="break-words text-xs text-muted-foreground">/{row.slug}</p>
                  </div>
                  <Badge variant="secondary">{kindName(row.kind)}</Badge>
                  <Badge variant={row.status === "published" ? "default" : "outline"}>
                    {row.status === "published" ? t("Đã đăng", "Published") : t("Nháp", "Draft")}
                  </Badge>
                  <Badge variant="outline">
                    {row.visibility === "public" ? t("Công khai", "Public") : t("Học sinh", "Students")}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" aria-label={t("Sửa", "Edit")} onClick={() => startEdit(row)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label={t("Nhân bản", "Duplicate")} onClick={() => duplicate(row)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    {row.status === "published" ? (
                      <Button size="sm" variant="outline" onClick={() => setStatus(row, "draft")}>
                        {t("Ẩn", "Unpublish")}
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setStatus(row, "published")}>
                        {t("Đăng", "Publish")}
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" aria-label={t("Xoá", "Delete")} onClick={() => remove(row)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
