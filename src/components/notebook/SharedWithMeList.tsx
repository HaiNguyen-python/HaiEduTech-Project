/**
 * @file SharedWithMeList.tsx
 * @description Read-only list of notebook notes other people (usually the
 * teacher) shared with the current user. Supports live refresh, preview,
 * hiding, and saving an editable copy.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, Copy, Eye, EyeOff, Pencil, RefreshCw, Share2, User } from "lucide-react";
import SharedNoteEditor from "@/components/notebook/SharedNoteEditor";
import {
  fetchSharedWithMe,
  hideSharedNotebook,
  saveSharedCopy,
  type SharedNotebook,
} from "@/lib/notebookShareService";

const stripHtml = (html: string) =>
  (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

interface Props {
  /** Compact layout for the floating widget. */
  compact?: boolean;
}

const SharedWithMeList = ({ compact = false }: Props) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<SharedNotebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [openNote, setOpenNote] = useState<SharedNotebook | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setNotes(await fetchSharedWithMe());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    // Live refresh while a teacher is presenting.
    const id = window.setInterval(load, 20000);
    return () => window.clearInterval(id);
  }, [load]);

  const handleHide = async (note: SharedNotebook) => {
    const err = await hideSharedNotebook(note.share_id);
    if (err) {
      toast({ title: "Lỗi", description: err, variant: "destructive" });
      return;
    }
    setNotes((prev) => prev.filter((n) => n.share_id !== note.share_id));
    toast({ title: "Đã ẩn", description: "Ghi chú được chia sẻ đã ẩn khỏi danh sách" });
  };

  const handleCopy = async (note: SharedNotebook) => {
    const err = await saveSharedCopy(note);
    if (err) {
      toast({ title: "Lỗi", description: err, variant: "destructive" });
      return;
    }
    toast({ title: "Đã lưu bản sao ✅", description: "Bạn có thể chỉnh sửa trong ghi chú của mình" });
  };

  if (loading && notes.length === 0) {
    return <div className="py-8 text-center text-sm text-muted-foreground">Đang tải...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="py-8 text-center">
        <Share2 className="w-10 h-10 mx-auto mb-2 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">
          Chưa có ai chia sẻ ghi chú cho bạn.
        </p>
      </div>
    );
  }

  if (openNote) {
    return (
      <SharedNoteEditor
        note={openNote}
        compact={compact}
        onBack={() => {
          setOpenNote(null);
          load();
        }}
      />
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">{notes.length} ghi chú được chia sẻ</p>
        <Button size="sm" variant="ghost" onClick={load} className="gap-1 h-7 text-xs">
          <RefreshCw className="w-3 h-3" /> Làm mới
        </Button>
      </div>

      <div className="grid gap-2">
        {notes.map((note) => (
          <Card key={note.share_id} className="hover:shadow-md transition-shadow">
            <CardContent className={compact ? "p-2.5" : "p-4"}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate text-sm">{note.title || "Không tiêu đề"}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0">{note.subject}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {stripHtml(note.content) || "Chưa có nội dung"}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{note.owner_name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(note.updated_at).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant={note.can_edit ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOpenNote(note)}
                    className="gap-1 h-8"
                    title={note.can_edit ? "Mở & chỉnh sửa" : "Mở (chỉ xem)"}
                  >
                    {note.can_edit ? <Pencil className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                    {note.can_edit ? "Mở & sửa" : "Mở"}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(note)} title="Lưu bản sao">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleHide(note)} title="Ẩn">
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </>
  );
};

export default SharedWithMeList;
