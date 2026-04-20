import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Plus, Save, X, Trash2, GripVertical, Bold, Italic, Underline, List, ListOrdered, Palette, RotateCcw, Highlighter, SwatchBook, FileText } from "lucide-react";

/**
 * Pre-built note templates for Software Engineering students.
 * Each template seeds the editor with a structured outline so learners can
 * focus on the content instead of formatting.
 */
const NOTE_TEMPLATES: { id: string; label: string; subject: string; title: string; html: string }[] = [
  {
    id: "se-case-study",
    label: "📘 Case Study (SE)",
    subject: "programming",
    title: "Case Study — [Project Name]",
    html: `<h3>🎯 Context</h3><p>Briefly describe the company, product, and the problem being solved.</p><h3>👥 Team & Stack</h3><ul><li>Team size: </li><li>Tech stack: </li><li>Methodology (Agile/Scrum/Waterfall): </li></ul><h3>🧩 Challenge</h3><p>What technical or business challenge did the team face?</p><h3>🛠️ Solution</h3><ol><li>Approach taken</li><li>Key trade-offs</li><li>Tools / patterns used</li></ol><h3>📊 Outcome</h3><ul><li>Quantitative result (latency, revenue, MAU…)</li><li>Lessons learned</li></ul><h3>🔁 Reflection</h3><p>What would you do differently next time?</p>`,
  },
  {
    id: "se-project-doc",
    label: "📐 Project Documentation",
    subject: "programming",
    title: "Project Documentation — [Project Name]",
    html: `<h2>1. Overview</h2><p>One-paragraph description of the project, target users, and value proposition.</p><h2>2. Goals & Non-Goals</h2><ul><li><strong>Goals:</strong> </li><li><strong>Non-goals:</strong> </li></ul><h2>3. Architecture</h2><p>High-level diagram description (Monolith / Microservices / Serverless). Include components and data flow.</p><h2>4. Tech Stack</h2><table><thead><tr><th>Layer</th><th>Technology</th><th>Why</th></tr></thead><tbody><tr><td>Frontend</td><td></td><td></td></tr><tr><td>Backend</td><td></td><td></td></tr><tr><td>Database</td><td></td><td></td></tr><tr><td>Infra / CI-CD</td><td></td><td></td></tr></tbody></table><h2>5. API Contracts</h2><p>List the main endpoints, request/response schema, and auth rules.</p><h2>6. Risks & Mitigations</h2><ul><li>Risk: → Mitigation: </li></ul><h2>7. Milestones</h2><ol><li>MVP</li><li>Beta</li><li>GA</li></ol>`,
  },
  {
    id: "se-code-review",
    label: "🔍 Code Review Checklist",
    subject: "programming",
    title: "Code Review — [PR Title]",
    html: `<h3>✅ Functionality</h3><ul><li>Does the code do what the PR description says?</li><li>Edge cases handled?</li></ul><h3>🧹 Clean Code (SOLID)</h3><ul><li>Single Responsibility respected?</li><li>Naming clear, no dead code?</li></ul><h3>🧪 Tests</h3><ul><li>Unit tests added/updated?</li><li>Test coverage acceptable?</li></ul><h3>🔐 Security</h3><ul><li>Input validated? (OWASP Top 10)</li><li>Secrets not hard-coded?</li></ul><h3>📝 Comments / Suggestions</h3><p>—</p>`,
  },
];
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";

interface Notebook {
  id: string;
  title: string;
  content: string;
  subject: string;
  updated_at: string;
}

const SUBJECTS = ["general", "english", "chinese", "vietnamese", "programming", "finnish", "math"];

const COLOR_PRESETS = [
  { label: "Đen", value: "#000000" },
  { label: "Đỏ", value: "#dc2626" },
  { label: "Xanh dương", value: "#2563eb" },
  { label: "Xanh lá", value: "#16a34a" },
  { label: "Cam", value: "#ea580c" },
  { label: "Tím", value: "#9333ea" },
  { label: "Hồng", value: "#db2777" },
  { label: "Vàng", value: "#ca8a04" },
];

const HIGHLIGHT_PRESETS = [
  { label: "Vàng", value: "#fef08a" },
  { label: "Xanh lá", value: "#bbf7d0" },
  { label: "Hồng", value: "#fecdd3" },
  { label: "Cam", value: "#fed7aa" },
  { label: "Xanh dương", value: "#bfdbfe" },
  { label: "Tím", value: "#e9d5ff" },
];

interface NotebookTheme {
  name: string;
  bg: string;
  headerBg: string;
  border: string;
  text: string;
  editorBg: string;
}

const NOTEBOOK_THEMES: NotebookTheme[] = [
  { name: "Mặc định", bg: "hsl(var(--card))", headerBg: "hsl(var(--muted) / 0.5)", border: "hsl(var(--border))", text: "hsl(var(--foreground))", editorBg: "hsl(var(--background))" },
  { name: "Kem", bg: "#fdf6e3", headerBg: "#f5e6c8", border: "#d4a574", text: "#3c2a14", editorBg: "#fefbf3" },
  { name: "Tối", bg: "#1e1e2e", headerBg: "#2a2a3e", border: "#444466", text: "#e0e0e0", editorBg: "#181825" },
  { name: "Xanh", bg: "#ecfdf5", headerBg: "#d1fae5", border: "#6ee7b7", text: "#064e3b", editorBg: "#f0fdf4" },
  { name: "Hồng", bg: "#fdf2f8", headerBg: "#fce7f3", border: "#f9a8d4", text: "#831843", editorBg: "#fef7fb" },
  { name: "Xanh dương", bg: "#eff6ff", headerBg: "#dbeafe", border: "#93c5fd", text: "#1e3a5f", editorBg: "#f0f7ff" },
];

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const getDefaultPosition = (width: number, height: number) => ({
  x: clamp(window.innerWidth - width - 24, 10, window.innerWidth - width),
  y: clamp(window.innerHeight - height - 60, 60, window.innerHeight - 100),
});

const FloatingNotebook = () => {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("general");
  const [saving, setSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = NOTEBOOK_THEMES[themeIndex];
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  const defaultSize = { width: 460, height: 600 };
  const [size, setSize] = useState(defaultSize);
  const [position, setPosition] = useState(() => getDefaultPosition(defaultSize.width, defaultSize.height));

  // Draggable state
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Resizable state
  const resizing = useRef<null | "right" | "bottom" | "corner">(null);

  // Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit, UnderlineExtension, TextStyle, Color, Highlight.configure({ multicolor: true })],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[280px] px-3 py-2 text-sm text-foreground notebook-editor",
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

  // Listen for chatbot open/close to hide notebook button (avoid overlap with chat input)
  const [chatbotOpen, setChatbotOpen] = useState(false);
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setChatbotOpen(!!detail?.open);
    };
    window.addEventListener("chatbot:toggle", handler as EventListener);
    return () => window.removeEventListener("chatbot:toggle", handler as EventListener);
  }, []);

  // Re-clamp position when opening
  useEffect(() => {
    if (open) {
      setPosition(prev => ({
        x: clamp(prev.x, 10, window.innerWidth - size.width),
        y: clamp(prev.y, 10, window.innerHeight - 100),
      }));
    }
  }, [open, size]);

  // Track the last server-synced updated_at for the currently open note,
  // so auto-save never overwrites newer content (e.g. appended by PhrasePractice).
  const lastSyncedUpdatedAt = useRef<string | null>(null);
  const skipNextAutoSave = useRef(false);

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
    lastSyncedUpdatedAt.current = null;
  };

  const handleSelect = (nb: Notebook) => {
    setSelectedId(nb.id);
    setTitle(nb.title);
    setSubject(nb.subject);
    const html = nb.content.includes("<") ? nb.content : `<p>${nb.content}</p>`;
    skipNextAutoSave.current = true;
    editor?.commands.setContent(html);
    lastSyncedUpdatedAt.current = nb.updated_at;
  };

  // Reload selected note from server (used when notebook:updated event fires).
  const reloadSelectedNote = useCallback(async (noteId: string) => {
    const { data, error } = await supabase
      .from("student_notebooks")
      .select("id, title, content, subject, updated_at")
      .eq("id", noteId)
      .maybeSingle();
    if (error || !data) return;
    skipNextAutoSave.current = true;
    const html = data.content.includes("<") ? data.content : `<p>${data.content}</p>`;
    editor?.commands.setContent(html);
    setTitle(data.title);
    setSubject(data.subject);
    lastSyncedUpdatedAt.current = data.updated_at;
  }, [editor]);

  // Listen for external notebook updates (e.g. PhrasePractice append).
  useEffect(() => {
    const handler = async (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      // Always refresh the list so new notes appear in the selector.
      await fetchNotebooks();
      // If the updated note is the one currently open, reload its content.
      if (selectedId && detail.noteId && detail.noteId === selectedId) {
        await reloadSelectedNote(selectedId);
      }
    };
    window.addEventListener("notebook:updated", handler as EventListener);
    return () => window.removeEventListener("notebook:updated", handler as EventListener);
  }, [selectedId, fetchNotebooks, reloadSelectedNote]);

  const handleSave = useCallback(async () => {
    if (!user || !title.trim()) return;
    const content = getContent();
    setSaving(true);
    try {
      if (selectedId) {
        // Sync-safe save: refuse to overwrite if remote is newer than what we last synced.
        const { data: remote } = await supabase
          .from("student_notebooks")
          .select("id, content, updated_at")
          .eq("id", selectedId)
          .maybeSingle();
        if (remote && lastSyncedUpdatedAt.current && remote.updated_at && remote.updated_at > lastSyncedUpdatedAt.current) {
          // Newer version exists on server — pull it instead of overwriting.
          skipNextAutoSave.current = true;
          const html = remote.content.includes("<") ? remote.content : `<p>${remote.content}</p>`;
          editor?.commands.setContent(html);
          lastSyncedUpdatedAt.current = remote.updated_at;
          toast({ title: "Đã đồng bộ phiên bản mới hơn từ server" });
        } else {
          const nowIso = new Date().toISOString();
          const { data: updated } = await supabase
            .from("student_notebooks")
            .update({ title, content, subject, updated_at: nowIso })
            .eq("id", selectedId)
            .select("updated_at")
            .single();
          lastSyncedUpdatedAt.current = updated?.updated_at ?? nowIso;
        }
      } else {
        const { data } = await supabase.from("student_notebooks").insert({ user_id: user.id, title, content, subject }).select("id, updated_at").single();
        if (data) {
          setSelectedId(data.id);
          lastSyncedUpdatedAt.current = data.updated_at;
        }
      }
      fetchNotebooks();
      toast({ title: "Đã lưu ghi chú ✓" });
    } catch {
      toast({ title: "Lỗi khi lưu", variant: "destructive" });
    }
    setSaving(false);
  }, [user, selectedId, title, subject, getContent, fetchNotebooks, toast, editor]);

  const handleDelete = async () => {
    if (!selectedId) return;
    await supabase.from("student_notebooks").delete().eq("id", selectedId);
    handleNew();
    fetchNotebooks();
    toast({ title: "Đã xóa ghi chú" });
  };

  // Auto-save after 5s of inactivity (sync-safe).
  const editorContent = editor?.getHTML();
  useEffect(() => {
    if (!open || !user || !title.trim()) return;
    // Skip the auto-save tick that follows a programmatic content sync from server.
    if (skipNextAutoSave.current) {
      skipNextAutoSave.current = false;
      return;
    }
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave();
    }, 5000);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [editorContent, title, subject, open, user, handleSave]);

  // Drag handlers (mouse)
  const onDragStart = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  }, [position]);

  // Drag handlers (touch)
  const onTouchDragStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragging.current = true;
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  }, [position]);

  // Resize handlers
  const onResizeStart = useCallback((edge: "right" | "bottom" | "corner") => (e: React.MouseEvent | React.TouchEvent) => {
    resizing.current = edge;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Reset position
  const handleResetPosition = useCallback(() => {
    setPosition(getDefaultPosition(size.width, size.height));
  }, [size]);

  useEffect(() => {
    const onMove = (clientX: number, clientY: number) => {
      if (dragging.current) {
        setPosition({
          x: clamp(clientX - dragOffset.current.x, 0, window.innerWidth - size.width),
          y: clamp(clientY - dragOffset.current.y, 10, window.innerHeight - 100),
        });
      }
      if (resizing.current) {
        const newWidth = resizing.current !== "bottom" ? clamp(clientX - position.x, 360, 800) : size.width;
        const newHeight = resizing.current !== "right" ? clamp(clientY - position.y, 400, 900) : size.height;
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (dragging.current || resizing.current) {
        e.preventDefault(); // prevent scroll while dragging
      }
      const touch = e.touches[0];
      onMove(touch.clientX, touch.clientY);
    };

    const onUp = () => {
      dragging.current = false;
      resizing.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [position, size]);

  const wordCount = editor?.state.doc.textContent.trim()
    ? editor.state.doc.textContent.trim().split(/\s+/).length
    : 0;

  if (!user) return null;

  return (
    <>
      {/* Floating button — hidden when chatbot is open to avoid overlap */}
      {!chatbotOpen && (
        <motion.button
          onClick={() => setOpen(!open)}
          className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          whileTap={{ scale: 0.9 }}
          aria-label="Open notebook"
        >
          <BookOpen size={24} />
        </motion.button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 rounded-xl shadow-2xl flex flex-col overflow-hidden"
            style={{ left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px`, height: `${size.height}px`, backgroundColor: theme.bg, borderColor: theme.border, border: `1px solid ${theme.border}`, color: theme.text }}
          >
            {/* Header with drag handle */}
            <div
              className="flex items-center justify-between px-4 py-3 select-none"
              onMouseDown={onDragStart}
              onTouchStart={onTouchDragStart}
              style={{ cursor: "grab", touchAction: "none", backgroundColor: theme.headerBg, borderBottom: `1px solid ${theme.border}` }}
            >
              <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                <GripVertical size={14} className="text-muted-foreground" />
                <BookOpen size={16} /> Ghi chú nhanh
              </span>
              <div className="flex items-center gap-1">
                {/* Theme switcher */}
                <div className="relative">
                  <button onClick={() => setShowThemePicker(!showThemePicker)} className="p-1.5 rounded-md hover:bg-black/10" title="Đổi giao diện" style={{ color: theme.text }}>
                    <SwatchBook size={14} />
                  </button>
                  {showThemePicker && (
                    <div className="absolute top-8 right-0 z-20 bg-white border rounded-lg shadow-lg p-2 flex flex-col gap-1 w-[130px]">
                      {NOTEBOOK_THEMES.map((t, i) => (
                        <button
                          key={t.name}
                          onClick={() => { setThemeIndex(i); setShowThemePicker(false); }}
                          className={`text-xs px-2 py-1.5 rounded text-left flex items-center gap-2 hover:bg-gray-100 ${i === themeIndex ? "font-bold" : ""}`}
                        >
                          <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: t.bg, borderColor: t.border }} />
                          {t.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={handleResetPosition} className="p-1.5 rounded-md hover:bg-black/10" title="Reset vị trí" style={{ color: theme.text }}>
                  <RotateCcw size={14} />
                </button>
                <button onClick={handleNew} className="p-1.5 rounded-md hover:bg-black/10" title="Tạo mới" style={{ color: theme.text }}>
                  <Plus size={16} />
                </button>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-md hover:bg-black/10" style={{ color: theme.text }}>
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
              {/* Color picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className={`p-1.5 rounded-md text-xs transition-colors ${showColorPicker ? "bg-primary/20 text-primary" : "hover:bg-accent text-muted-foreground"}`}
                  type="button"
                >
                  <Palette size={14} />
                </button>
                {showColorPicker && (
                  <div className="absolute top-8 left-0 z-10 bg-card border border-border rounded-lg shadow-lg p-2 flex flex-wrap gap-1.5 w-[160px]">
                    {COLOR_PRESETS.map(c => (
                      <button
                        key={c.value}
                        onClick={() => { editor?.chain().focus().setColor(c.value).run(); setShowColorPicker(false); }}
                        className="w-6 h-6 rounded-full border border-border hover:scale-125 transition-transform"
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                        type="button"
                      />
                    ))}
                    <button
                      onClick={() => { editor?.chain().focus().unsetColor().run(); setShowColorPicker(false); }}
                      className="w-6 h-6 rounded-full border border-border hover:scale-125 transition-transform flex items-center justify-center text-[8px] text-muted-foreground bg-background"
                      title="Mặc định"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              {/* Highlight picker */}
              <div className="relative">
                <button
                  onClick={() => { setShowHighlightPicker(!showHighlightPicker); setShowColorPicker(false); }}
                  className={`p-1.5 rounded-md text-xs transition-colors ${showHighlightPicker || editor?.isActive("highlight") ? "bg-primary/20 text-primary" : "hover:bg-black/10"}`}
                  type="button"
                  style={{ color: editor?.isActive("highlight") ? undefined : theme.text }}
                >
                  <Highlighter size={14} />
                </button>
                {showHighlightPicker && (
                  <div className="absolute top-8 left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-wrap gap-1.5 w-[160px]">
                    {HIGHLIGHT_PRESETS.map(c => (
                      <button
                        key={c.value}
                        onClick={() => { editor?.chain().focus().toggleHighlight({ color: c.value }).run(); setShowHighlightPicker(false); }}
                        className="w-6 h-6 rounded-full border border-gray-300 hover:scale-125 transition-transform"
                        style={{ backgroundColor: c.value }}
                        title={c.label}
                        type="button"
                      />
                    ))}
                    <button
                      onClick={() => { editor?.chain().focus().unsetHighlight().run(); setShowHighlightPicker(false); }}
                      className="w-6 h-6 rounded-full border border-gray-300 hover:scale-125 transition-transform flex items-center justify-center text-[8px] text-gray-500 bg-white"
                      title="Xóa highlight"
                      type="button"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="px-3 pt-2 flex-1 min-h-0 overflow-auto">
              <div className="rounded-md h-full overflow-auto" style={{ backgroundColor: theme.editorBg, border: `1px solid ${theme.border}` }}>
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-2 text-xs" style={{ borderTop: `1px solid ${theme.border}`, color: theme.text, opacity: 0.7 }}>
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

            {/* Resize handles */}
            <div onMouseDown={onResizeStart("right")} onTouchStart={onResizeStart("right")} className="absolute top-0 right-0 w-1 h-full cursor-e-resize hover:bg-primary/20 transition-colors" style={{ touchAction: "none" }} />
            <div onMouseDown={onResizeStart("bottom")} onTouchStart={onResizeStart("bottom")} className="absolute bottom-0 left-0 h-1 w-full cursor-s-resize hover:bg-primary/20 transition-colors" style={{ touchAction: "none" }} />
            <div onMouseDown={onResizeStart("corner")} onTouchStart={onResizeStart("corner")} className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize flex items-center justify-center text-muted-foreground hover:text-primary" style={{ touchAction: "none" }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><path d="M7 1v6H1" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNotebook;
