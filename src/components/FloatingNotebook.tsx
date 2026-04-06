import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Plus, Save, X, Trash2, GripVertical, Bold, Italic, Underline, List, ListOrdered } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";

interface Notebook {
  id: string;
  title: string;
  content: string;
  subject: string;
  updated_at: string;
}

const SUBJECTS = ["general", "english", "chinese", "vietnamese", "programming", "finnish", "math"];

const FloatingNotebook = () => {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("general");
  const [saving, setSaving] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  // Draggable state
  const [position, setPosition] = useState({ x: 24, y: window.innerHeight - 640 });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Resizable state
  const [size, setSize] = useState({ width: 460, height: 600 });
  const resizing = useRef<null | "right" | "bottom" | "corner">(null);

  // Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExtension],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[280px] px-3 py-2 text-sm text-foreground",
      },
    },
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchNotebooks = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("student_notebooks")
      .select("id, title, content, subject, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    setNotebooks(data || []);
  }, [user]);

  useEffect(() => {
    if (user && open) fetchNotebooks();
  }, [user, open, fetchNotebooks]);

  const getContent = useCallback(() => {
    return editor?.getHTML() || "";
  }, [editor]);

  const handleNew = () => {
    setSelectedId(null);
    setTitle("");
    setSubject("general");
    editor?.commands.setContent("");
  };

  const handleSelect = (nb: Notebook) => {
    setSelectedId(nb.id);
    setTitle(nb.title);
    setSubject(nb.subject);
    // If old plain text content (no HTML tags), wrap in <p>
    const html = nb.content.includes("<") ? nb.content : `<p>${nb.content}</p>`;
    editor?.commands.setContent(html);
  };

  const handleSave = useCallback(async () => {
    if (!user || !title.trim()) return;
    const content = getContent();
    setSaving(true);
    try {
      if (selectedId) {
        await supabase.from("student_notebooks").update({ title, content, subject, updated_at: new Date().toISOString() }).eq("id", selectedId);
      } else {
        const { data } = await supabase.from("student_notebooks").insert({ user_id: user.id, title, content, subject }).select("id").single();
        if (data) setSelectedId(data.id);
      }
      fetchNotebooks();
      toast({ title: "Đã lưu ghi chú ✓" });
    } catch {
      toast({ title: "Lỗi khi lưu", variant: "destructive" });
    }
    setSaving(false);
  }, [user, selectedId, title, subject, getContent, fetchNotebooks, toast]);

  const handleDelete = async () => {
    if (!selectedId) return;
    await supabase.from("student_notebooks").delete().eq("id", selectedId);
    handleNew();
    fetchNotebooks();
    toast({ title: "Đã xóa ghi chú" });
  };

  // Auto-save after 5s of inactivity
  const editorContent = editor?.getHTML();
  useEffect(() => {
    if (!open || !user || !title.trim()) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave();
    }, 5000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [editorContent, title, subject, open, user, handleSave]);

  // Drag handlers
  const onDragStart = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  }, [position]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const maxX = window.innerWidth - 460;
      const maxY = window.innerHeight - 100;
      setPosition({
        x: Math.max(0, Math.min(maxX, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(maxY, e.clientY - dragOffset.current.y)),
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const wordCount = editor?.state.doc.textContent.trim()
    ? editor.state.doc.textContent.trim().split(/\s+/).length
    : 0;

  if (!user) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        whileTap={{ scale: 0.9 }}
        aria-label="Open notebook"
      >
        <BookOpen size={24} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 w-[460px] max-h-[600px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
            {/* Header with drag handle */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50 select-none"
              onMouseDown={onDragStart}
              style={{ cursor: "grab" }}
            >
              <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                <GripVertical size={14} className="text-muted-foreground" />
                <BookOpen size={16} /> Ghi chú nhanh
              </span>
              <div className="flex items-center gap-1">
                <button onClick={handleNew} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground" title="Tạo mới">
                  <Plus size={16} />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Note selector */}
            <div className="px-3 pt-2">
              <select
                value={selectedId || ""}
                onChange={(e) => {
                  const nb = notebooks.find(n => n.id === e.target.value);
                  nb ? handleSelect(nb) : handleNew();
                }}
                className="w-full text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
              >
                <option value="">+ Ghi chú mới</option>
                {notebooks.map(nb => (
                  <option key={nb.id} value={nb.id}>{nb.title || "Chưa có tiêu đề"}</option>
                ))}
              </select>
            </div>

            {/* Title + Subject */}
            <div className="px-3 pt-2 flex gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tiêu đề..."
                className="flex-1 text-sm border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
              />
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
              >
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Rich text toolbar */}
            <div className="px-3 pt-2 flex items-center gap-1 flex-wrap">
              {[
                { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
                { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
                { icon: Underline, action: () => editor?.chain().focus().toggleUnderline().run(), active: editor?.isActive("underline") },
                { icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
                { icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
              ].map(({ icon: Icon, action, active }, i) => (
                <button
                  key={i}
                  onClick={action}
                  className={`p-1.5 rounded-md text-xs transition-colors ${active ? "bg-primary/20 text-primary" : "hover:bg-accent text-muted-foreground"}`}
                  type="button"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className="px-3 pt-2 flex-1 min-h-0 overflow-auto">
              <div className="border border-border rounded-md bg-background h-[320px] overflow-auto">
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-border text-xs text-muted-foreground">
              <span>{wordCount} từ</span>
              <div className="flex items-center gap-2">
                {selectedId && (
                  <button onClick={handleDelete} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive" title="Xóa">
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving || !title.trim()}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium disabled:opacity-50"
                >
                  <Save size={14} />
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNotebook;
