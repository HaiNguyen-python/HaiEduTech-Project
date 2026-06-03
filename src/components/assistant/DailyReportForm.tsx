import { useState, useCallback, DragEvent, ChangeEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MAX_FILE_MB = 5;
const MAX_FILES = 8;

interface Props {
  userId: string;
  onSubmitted?: () => void;
}

const DailyReportForm = ({ userId, onSubmitted }: Props) => {
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const valid: File[] = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) {
        toast.error(`${f.name} không phải ảnh`);
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${f.name} > ${MAX_FILE_MB}MB`);
        continue;
      }
      valid.push(f);
    }
    setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES));
  }, []);

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!summary.trim()) {
      toast.error("Vui lòng nhập nội dung công việc");
      return;
    }
    setSubmitting(true);

    // 1. Upload screenshots to storage
    const uploadedPaths: string[] = [];
    for (const f of files) {
      const path = `${userId}/${Date.now()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error } = await supabase.storage.from("report-attachments").upload(path, f, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) {
        toast.error(`Upload thất bại: ${f.name}`, { description: error.message });
        setSubmitting(false);
        return;
      }
      uploadedPaths.push(path);
    }

    // 2. Insert report row
    const { error: insErr } = await supabase.from("daily_reports").insert({
      user_id: userId,
      work_summary: summary.trim(),
      feedback: feedback.trim() || null,
      screenshot_urls: uploadedPaths,
    });

    if (insErr) {
      setSubmitting(false);
      toast.error("Gửi báo cáo thất bại", { description: insErr.message });
      return;
    }

    // 3. Notify all super admins via SECURITY DEFINER RPC.
    //    Assistants don't have RLS access to list admin user_ids directly,
    //    so we delegate the fan-out insert to the server.
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .maybeSingle();
      const name = (profile as any)?.full_name?.trim() || "CTV";
      const preview = summary.trim().slice(0, 140);
      await supabase.rpc("notify_super_admins" as any, {
        p_title: `📩 Báo cáo mới từ ${name}`,
        p_body: preview + (summary.trim().length > 140 ? "…" : ""),
        p_route: "/admin-dashboard?tab=assistants",
      });
    } catch {
      // Non-blocking: report saved even if notify fails.
    }

    setSubmitting(false);
    toast.success("Gửi báo cáo thành công!");
    setSummary("");
    setFeedback("");
    setFiles([]);
    onSubmitted?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Báo Cáo Công Việc / Daily Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Nội dung công việc hôm nay <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={5}
            placeholder="Hôm nay em đã làm những gì..."
            maxLength={4000}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Feedback đóng góp & ý kiến cải thiện hệ thống
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            placeholder="Góp ý cải tiến, đề xuất tính năng, lỗi gặp phải..."
            maxLength={2000}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Ảnh đính kèm (screenshots, bug...) — tối đa {MAX_FILES} ảnh, {MAX_FILE_MB}MB/ảnh
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-border bg-secondary/30"
            }`}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Kéo thả ảnh vào đây hoặc</p>
            <label className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:brightness-110">
              <ImageIcon className="w-4 h-4" /> Chọn ảnh
              <input type="file" multiple accept="image/*" className="hidden" onChange={onPick} />
            </label>
          </div>

          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {files.map((f, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-border bg-secondary">
                  <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-24 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label="Remove file"
                    className="absolute top-1 right-1 p-1 rounded-full bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-muted-foreground px-1 truncate">{f.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={submitting} size="lg" className="w-full gap-2">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Gửi Báo Cáo
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyReportForm;
