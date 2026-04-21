/**
 * @file WritingDraftsPanel.tsx
 * @description List + manage saved IELTS Writing drafts so students can resume unfinished essays.
 */
import { useEffect, useState, useCallback } from "react";
import { FileEdit, Trash2, Loader2, ChevronDown, ChevronUp, FolderOpen, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

export interface WritingDraft {
  id: string;
  task_type: number;
  sub_type: string | null;
  prompt: string;
  prompt_meta: Record<string, unknown>;
  essay: string;
  word_count: number;
  title: string;
  time_left_seconds: number | null;
  updated_at: string;
}

interface Props {
  onResume: (draft: WritingDraft) => void;
  reloadKey?: number;
}

const WritingDraftsPanel = ({ onResume, reloadKey }: Props) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<WritingDraft[]>([]);
  const [authed, setAuthed] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthed(false);
      setDrafts([]);
      setLoading(false);
      return;
    }
    setAuthed(true);
    const { data, error } = await supabase
      .from("writing_drafts")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(20);
    if (!error && data) setDrafts(data as unknown as WritingDraft[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load, reloadKey]);

  const handleDelete = async (id: string) => {
    if (!confirm(t("Xoá bản nháp này?", "Delete this draft?"))) return;
    const { error } = await supabase.from("writing_drafts").delete().eq("id", id);
    if (error) {
      toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      return;
    }
    setDrafts(d => d.filter(x => x.id !== id));
    toast({ title: t("Đã xoá bản nháp", "Draft deleted") });
  };

  const formatRelative = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return t("vừa xong", "just now");
    if (mins < 60) return t(`${mins} phút trước`, `${mins} min ago`);
    const hours = Math.floor(mins / 60);
    if (hours < 24) return t(`${hours} giờ trước`, `${hours}h ago`);
    const days = Math.floor(hours / 24);
    return t(`${days} ngày trước`, `${days}d ago`);
  };

  if (!authed && !loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> {t("Bản nháp đã lưu", "Saved Drafts")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {t("Đăng nhập để lưu và tiếp tục viết bài còn dang dở.", "Sign in to save drafts and resume unfinished essays later.")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <button
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors rounded-t-lg"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-base font-semibold flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-primary" />
          {t("Bản nháp đã lưu", "Saved Drafts")}
          {drafts.length > 0 && (
            <Badge variant="secondary" className="ml-1">{drafts.length}</Badge>
          )}
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <CardContent className="pt-0">
          {loading ? (
            <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : drafts.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              {t("Chưa có bản nháp nào. Bấm \"Lưu nháp\" trong trình soạn thảo để lưu bài đang viết.", "No drafts yet. Click \"Save Draft\" in the editor to save your work in progress.")}
            </p>
          ) : (
            <ul className="space-y-2">
              {drafts.map(d => (
                <li key={d.id} className="border rounded-lg p-3 hover:border-primary/40 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{d.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{d.prompt}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0">
                      Task {d.task_type}{d.sub_type ? ` · ${d.sub_type}` : ""}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-2">
                      <span>{d.word_count} {t("từ", "words")}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatRelative(d.updated_at)}</span>
                    </span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => onResume(d)}>
                        <FileEdit className="w-3.5 h-3.5 mr-1" />{t("Tiếp tục", "Resume")}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive hover:text-destructive" onClick={() => handleDelete(d.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default WritingDraftsPanel;
