/**
 * Testimonials manager: lets staff curate the real student results shown in
 * the home page "Student Results Wall". Real entries only - nothing is
 * auto-generated.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type TestimonialRow = {
  id: string;
  student_name: string;
  course: string;
  score: string;
  score_label: string;
  quote_vi: string;
  quote_en: string;
  avatar_url: string | null;
  certificate_code: string | null;
  display_order: number;
  is_published: boolean;
};

type FormState = Omit<TestimonialRow, "id" | "avatar_url"> & { avatar_url: string | null };

const emptyForm: FormState = {
  student_name: "",
  course: "",
  score: "",
  score_label: "",
  quote_vi: "",
  quote_en: "",
  avatar_url: null,
  certificate_code: null,
  display_order: 0,
  is_published: true,
};

const TestimonialsTab = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [rows, setRows] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [codeStatus, setCodeStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (!error && data) setRows(data as TestimonialRow[]);
    else if (error) toast({ title: t("Không tải được dữ liệu", "Could not load data"), variant: "destructive" });
    setLoading(false);
  }, [t, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  // Check the certificate code exists so the "Verified" badge never points at
  // a dead verification page.
  useEffect(() => {
    const code = (form.certificate_code || "").trim();
    if (!code) {
      setCodeStatus("idle");
      return;
    }
    let cancelled = false;
    setCodeStatus("checking");
    supabase
      .from("certificates")
      .select("code")
      .eq("code", code)
      .limit(1)
      .then(({ data, error }) => {
        if (cancelled) return;
        setCodeStatus(!error && data && data.length > 0 ? "valid" : "invalid");
      });
    return () => {
      cancelled = true;
    };
  }, [form.certificate_code]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setAvatarFile(null);
    setCodeStatus("idle");
    if (fileRef.current) fileRef.current.value = "";
  };

  const startEdit = (row: TestimonialRow) => {
    setEditingId(row.id);
    setForm({
      student_name: row.student_name,
      course: row.course,
      score: row.score,
      score_label: row.score_label,
      quote_vi: row.quote_vi,
      quote_en: row.quote_en,
      avatar_url: row.avatar_url,
      certificate_code: row.certificate_code,
      display_order: row.display_order,
      is_published: row.is_published,
    });
    setAvatarFile(null);
    if (fileRef.current) fileRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (row: TestimonialRow) => {
    if (!window.confirm(t(`Xóa kết quả của "${row.student_name}"?`, `Delete the result for "${row.student_name}"?`)))
      return;
    const { error } = await supabase.from("testimonials").delete().eq("id", row.id);
    if (error) toast({ title: t("Xóa thất bại", "Delete failed"), variant: "destructive" });
    else {
      toast({ title: t("Đã xóa", "Deleted") });
      if (editingId === row.id) resetForm();
      void load();
    }
  };

  const togglePublished = async (row: TestimonialRow) => {
    const { error } = await supabase.from("testimonials").update({ is_published: !row.is_published }).eq("id", row.id);
    if (error) toast({ title: t("Cập nhật thất bại", "Update failed"), variant: "destructive" });
    else void load();
  };

  const save = async () => {
    if (!form.student_name.trim()) {
      toast({ title: t("Cần nhập tên học viên", "Student name is required"), variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      let avatarUrl = form.avatar_url;
      if (avatarFile) {
        const ext = (avatarFile.name.split(".").pop() || "jpg").toLowerCase();
        const path = `testimonials/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("marketing-images")
          .upload(path, avatarFile, { cacheControl: "3600", upsert: false });
        if (upErr) throw new Error(t("Không tải được ảnh", "Could not upload the image"));
        avatarUrl = supabase.storage.from("marketing-images").getPublicUrl(path).data.publicUrl;
      }

      const payload = {
        student_name: form.student_name.trim(),
        course: form.course.trim(),
        score: form.score.trim(),
        score_label: form.score_label.trim(),
        quote_vi: form.quote_vi.trim(),
        quote_en: form.quote_en.trim(),
        avatar_url: avatarUrl,
        certificate_code: (form.certificate_code || "").trim() || null,
        display_order: Number.isFinite(form.display_order) ? form.display_order : 0,
        is_published: form.is_published,
      };

      const { error } = editingId
        ? await supabase.from("testimonials").update(payload).eq("id", editingId)
        : await supabase.from("testimonials").insert(payload);
      if (error) throw error;
      toast({
        title: editingId
          ? t("Đã cập nhật kết quả", "Result updated")
          : t("Đã thêm kết quả - sẽ hiện trên trang chủ nếu đang bật", "Result added - it appears on the home page when published"),
      });
      resetForm();
      void load();
    } catch (e) {
      toast({
        title: t("Lưu thất bại", "Save failed"),
        description: e instanceof Error ? e.message : String(e),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const codeBadge = () => {
    if (codeStatus === "checking")
      return (
        <Badge variant="secondary" className="gap-1">
          <Loader2 className="h-3 w-3 animate-spin" /> {t("Đang kiểm tra", "Checking")}
        </Badge>
      );
    if (codeStatus === "valid")
      return (
        <Badge className="gap-1 bg-emerald-600">
          <BadgeCheck className="h-3 w-3" /> {t("Mã chứng chỉ tồn tại", "Certificate exists")}
        </Badge>
      );
    if (codeStatus === "invalid")
      return (
        <Badge variant="destructive" className="gap-1">
          {t("Không tìm thấy mã này", "Code not found")}
        </Badge>
      );
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? t("Sửa kết quả học viên", "Edit student result") : t("Thêm kết quả học viên", "Add a student result")}
          </CardTitle>
          <CardDescription>
            {t(
              "Chỉ nhập kết quả thật. Kết quả đang bật sẽ hiện trong mục Kết quả học viên trên trang chủ.",
              "Enter real results only. Published entries appear in the home page Student Results Wall.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="t-name">{t("Tên học viên (hoặc tên viết tắt)", "Student name (or initials)")}</Label>
              <Input
                id="t-name"
                value={form.student_name}
                onChange={(e) => set("student_name", e.target.value)}
                placeholder={t("VD: Nguyễn Minh A.", "e.g. Minh Anh N.")}
                maxLength={80}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-course">{t("Khóa học", "Course")}</Label>
              <Input
                id="t-course"
                value={form.course}
                onChange={(e) => set("course", e.target.value)}
                placeholder={t("VD: IELTS Writing 7.0+", "e.g. IELTS Writing 7.0+")}
                maxLength={120}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-score">{t("Kết quả nổi bật", "Highlight score")}</Label>
              <Input
                id="t-score"
                value={form.score}
                onChange={(e) => set("score", e.target.value)}
                placeholder={t("VD: 7.5", "e.g. 7.5")}
                maxLength={40}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-score-label">{t("Nhãn kết quả", "Score label")}</Label>
              <Input
                id="t-score-label"
                value={form.score_label}
                onChange={(e) => set("score_label", e.target.value)}
                placeholder={t("VD: IELTS Overall", "e.g. IELTS Overall")}
                maxLength={80}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="t-quote-vi">{t("Nhận xét (tiếng Việt)", "Quote (Vietnamese)")}</Label>
              <Textarea
                id="t-quote-vi"
                value={form.quote_vi}
                onChange={(e) => set("quote_vi", e.target.value)}
                rows={3}
                maxLength={600}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-quote-en">{t("Nhận xét (tiếng Anh)", "Quote (English)")}</Label>
              <Textarea
                id="t-quote-en"
                value={form.quote_en}
                onChange={(e) => set("quote_en", e.target.value)}
                rows={3}
                maxLength={600}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="t-cert">{t("Mã chứng chỉ (tùy chọn)", "Certificate code (optional)")}</Label>
              <Input
                id="t-cert"
                value={form.certificate_code || ""}
                onChange={(e) => set("certificate_code", e.target.value)}
                placeholder="HE-XXXX-XXXX"
              />
              <div className="min-h-6">{codeBadge()}</div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-order">{t("Thứ tự hiển thị", "Display order")}</Label>
              <Input
                id="t-order"
                type="number"
                value={form.display_order}
                onChange={(e) => set("display_order", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="t-avatar">{t("Ảnh học viên (tùy chọn)", "Student photo (optional)")}</Label>
              <Input
                id="t-avatar"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
              {form.avatar_url && !avatarFile && (
                <img
                  src={form.avatar_url}
                  alt=""
                  className="h-12 w-12 rounded-full border border-border object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.is_published} onCheckedChange={(v) => set("is_published", v)} />
              {t("Hiện trên trang chủ", "Show on the home page")}
            </label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetForm} disabled={saving}>
                {t("Nhập lại", "Reset")}
              </Button>
              <Button onClick={save} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingId ? t("Lưu thay đổi", "Save changes") : t("Thêm kết quả", "Add result")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("Danh sách kết quả", "Saved results")} ({rows.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> {t("Đang tải", "Loading")}
            </div>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {t(
                "Chưa có kết quả nào. Hãy thêm kết quả thật đầu tiên - mục trên trang chủ sẽ tự xuất hiện.",
                "No results yet. Add the first real one - the home page section appears automatically.",
              )}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((row) => (
                <li key={row.id} className="flex flex-wrap items-center gap-3 py-3">
                  {row.avatar_url ? (
                    <img src={row.avatar_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-bold text-primary">
                      {row.student_name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{row.student_name}</span>
                      {row.score && <span className="text-sm font-bold text-primary">{row.score}</span>}
                      {!row.is_published && (
                        <Badge variant="outline">{t("Đang ẩn", "Hidden")}</Badge>
                      )}
                      {row.certificate_code && (
                        <Badge variant="outline" className="gap-1">
                          <BadgeCheck className="h-3 w-3" /> {row.certificate_code}
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{row.course}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(row)} aria-label={t("Sửa", "Edit")}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => togglePublished(row)} aria-label={t("Bật/tắt hiển thị", "Toggle visibility")}>
                      <BadgeCheck className={`h-4 w-4 ${row.is_published ? "text-emerald-600" : "text-muted-foreground"}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => remove(row)} aria-label={t("Xóa", "Delete")}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsTab;
