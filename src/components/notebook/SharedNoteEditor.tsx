/**
 * @file SharedNoteEditor.tsx
 * @description Opens a notebook note that was shared with the current user.
 * With edit rights the note is fully editable and auto-saved back to the owner's
 * note (everyone sees the change). Without edit rights it opens read-only with
 * an option to save an editable private copy.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Bold, Copy, Eye, Highlighter, Italic, List, ListChecks, Loader2, Pencil, Save,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchSharedWithMe,
  saveSharedCopy,
  updateSharedNotebook,
  type SharedNotebook,
} from "@/lib/notebookShareService";

interface Props {
  note: SharedNotebook;
  onBack: () => void;
  /** Compact layout for the floating widget. */
  compact?: boolean;
}

const SharedNoteEditor = ({ note, onBack, compact = false }: Props) => {
  const { toast } = useToast();
  const canEdit = !!note.can_edit;
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const typingRef = useRef(false);
  const saveTimer = useRef<number | null>(null);
  const remoteRef = useRef(note.content || "");

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Image.configure({ inline: false }),
      ],
      content: note.content || "",
      editable: canEdit,
      editorProps: {
        attributes: {
          class: `prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[240px] ${
            compact ? "text-sm" : "text-base"
          } [&_img]:max-w-full`,
        },
      },
      onUpdate: ({ editor: e }) => {
        if (!canEdit) return;
        typingRef.current = true;
        const html = e.getHTML();
        if (saveTimer.current) window.clearTimeout(saveTimer.current);
        setStatus("saving");
        saveTimer.current = window.setTimeout(async () => {
          const err = await updateSharedNotebook(note.notebook_id, { content: html });
          remoteRef.current = html;
          typingRef.current = false;
          if (err) {
            setStatus("idle");
            toast({ title: "Không lưu được", description: err, variant: "destructive" });
          } else {
            setStatus("saved");
          }
        }, 600);
      },
    },
    [note.notebook_id, canEdit],
  );

  // Realtime: any edit by the owner or another editor lands here instantly.
  useEffect(() => {
    if (!editor) return;
    const channel = supabase
      .channel(`shared-note-live-${note.notebook_id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "student_notebooks", filter: `id=eq.${note.notebook_id}` },
        (payload) => {
          if (typingRef.current) return;
          const incoming = ((payload.new as { content?: string })?.content) || "";
          if (incoming === remoteRef.current || incoming === editor.getHTML()) return;
          remoteRef.current = incoming;
          editor.commands.setContent(incoming, { emitUpdate: false } as never);
        },
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [editor, note.notebook_id]);

  // Polling fallback in case the realtime socket drops.
  useEffect(() => {
    const id = window.setInterval(async () => {
      if (typingRef.current || !editor) return;
      const list = await fetchSharedWithMe();
      const fresh = list.find((n) => n.notebook_id === note.notebook_id);
      if (!fresh) return;
      const incoming = fresh.content || "";
      if (incoming !== remoteRef.current && incoming !== editor.getHTML()) {
        remoteRef.current = incoming;
        editor.commands.setContent(incoming, { emitUpdate: false } as never);
      }
    }, 12000);
    return () => window.clearInterval(id);
  }, [editor, note.notebook_id]);

  useEffect(() => () => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
  }, []);

  const handleSaveNow = async () => {
    if (!editor || !canEdit) return;
    setStatus("saving");
    const err = await updateSharedNotebook(note.notebook_id, { content: editor.getHTML() });
    setStatus(err ? "idle" : "saved");
    toast(
      err
        ? { title: "Không lưu được", description: err, variant: "destructive" }
        : { title: "Đã lưu ✅", description: "Mọi người cùng thấy thay đổi này" },
    );
  };

  const handleCopy = async () => {
    const err = await saveSharedCopy({
      ...note,
      content: editor?.getHTML() || note.content,
    });
    toast(
      err
        ? { title: "Lỗi", description: err, variant: "destructive" }
        : { title: "Đã lưu bản sao ✅", description: "Bản riêng nằm trong ghi chú của bạn" },
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="ghost" onClick={onBack} className="gap-1 h-8">
          <ArrowLeft className="w-4 h-4" /> Danh sách
        </Button>
        <span className="font-semibold truncate max-w-[240px]">{note.title || "Ghi chú"}</span>
        <Badge variant="secondary" className="text-xs">{note.subject}</Badge>
        <Badge className={`text-xs gap-1 ${canEdit ? "" : "bg-muted text-muted-foreground"}`}>
          {canEdit ? <Pencil className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {canEdit ? "Có thể sửa" : "Chỉ xem"}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground">
        {note.owner_name} chia sẻ ·{" "}
        {canEdit
          ? "bạn sửa trực tiếp, mọi người cùng thấy thay đổi này"
          : "ghi chú chỉ đọc - lưu bản sao nếu bạn muốn tự sửa"}
      </p>

      {canEdit && editor && (
        <div className="flex flex-wrap items-center gap-1 border border-border rounded-md p-1">
          <Button size="icon" variant={editor.isActive("bold") ? "default" : "ghost"} className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleBold().run()} title="Đậm">
            <Bold className="w-4 h-4" />
          </Button>
          <Button size="icon" variant={editor.isActive("italic") ? "default" : "ghost"} className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleItalic().run()} title="Nghiêng">
            <Italic className="w-4 h-4" />
          </Button>
          <Button size="icon" variant={editor.isActive("highlight") ? "default" : "ghost"} className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#fde68a" }).run()} title="Bôi vàng">
            <Highlighter className="w-4 h-4" />
          </Button>
          <Button size="icon" variant={editor.isActive("bulletList") ? "default" : "ghost"} className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleBulletList().run()} title="Danh sách">
            <List className="w-4 h-4" />
          </Button>
          <Button size="icon" variant={editor.isActive("taskList") ? "default" : "ghost"} className="h-8 w-8"
            onClick={() => editor.chain().focus().toggleTaskList().run()} title="Việc cần làm">
            <ListChecks className="w-4 h-4" />
          </Button>
          <span className="ml-auto text-xs text-muted-foreground pr-1 flex items-center gap-1">
            {status === "saving" && <><Loader2 className="w-3 h-3 animate-spin" /> Đang lưu...</>}
            {status === "saved" && "Đã lưu"}
          </span>
        </div>
      )}

      <div
        className={`rounded-md border border-border p-3 overflow-y-auto ${
          compact ? "max-h-[45vh]" : "max-h-[60vh]"
        } ${canEdit ? "bg-background" : "bg-muted/30"}`}
      >
        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
          <Copy className="w-4 h-4" /> Lưu bản sao
        </Button>
        {canEdit && (
          <Button size="sm" onClick={handleSaveNow} className="gap-2">
            <Save className="w-4 h-4" /> Lưu ngay
          </Button>
        )}
      </div>
    </div>
  );
};

export default SharedNoteEditor;
