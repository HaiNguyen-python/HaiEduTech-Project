import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Plus, Save, X, Trash2, GripVertical, Bold, Italic, Underline, List, ListOrdered, ListChecks, Palette, RotateCcw, Highlighter, SwatchBook, ExternalLink, Download, Maximize2, Minimize2, PenLine, FileText, Share2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// Underline is bundled in StarterKit v3, no separate import needed
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import NotebookWhiteboard from "@/components/notebook/NotebookWhiteboard";
import ShareNotebookDialog from "@/components/notebook/ShareNotebookDialog";
import SharedWithMeList from "@/components/notebook/SharedWithMeList";



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
  // Reactive tick so the auto-save effect actually runs when the user types.
  // (editor.getHTML() is NOT a React state — without this bump, the effect
  // would never re-fire and the note silently never auto-saves.)
  const [editorTick, setEditorTick] = useState(0);

  const theme = NOTEBOOK_THEMES[themeIndex];
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  const defaultSize = { width: 460, height: 600 };
  // Remember the panel size per device so a teacher who works on a big board
  // does not have to re-enlarge the notebook every session.
  const [size, setSize] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("notebook-size") || "null");
      if (raw && typeof raw.width === "number" && typeof raw.height === "number") {
        return {
          width: clamp(raw.width, 360, window.innerWidth - 20),
          height: clamp(raw.height, 360, window.innerHeight - 40),
        };
      }
    } catch { /* ignore */ }
    return defaultSize;
  });
  const [position, setPosition] = useState(() => getDefaultPosition(defaultSize.width, defaultSize.height));
  const [maximized, setMaximized] = useState(() => localStorage.getItem("notebook-maximized") === "1");
  // "notes" = rich text editor, "board" = live whiteboard, "shared" = notes others shared with me.
  const [tab, setTab] = useState<"notes" | "board" | "shared">("notes");
  const [shareOpen, setShareOpen] = useState(false);

  const preMaximize = useRef<{ size: { width: number; height: number }; position: { x: number; y: number } } | null>(null);

  useEffect(() => {
    localStorage.setItem("notebook-size", JSON.stringify(size));
  }, [size]);
  useEffect(() => {
    localStorage.setItem("notebook-maximized", maximized ? "1" : "0");
  }, [maximized]);

  // Draggable state
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Resizable state
  const resizing = useRef<null | "right" | "bottom" | "corner" | "left" | "top">(null);
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, left: 0, top: 0 });


  // Editor font size (px), remembered per device for accessibility.
  const [fontSize, setFontSize] = useState<number>(() => {
    const raw = Number(localStorage.getItem("notebook-font-size"));
    return raw >= 12 && raw <= 32 ? raw : 14;
  });
  useEffect(() => {
    localStorage.setItem("notebook-font-size", String(fontSize));
  }, [fontSize]);

  // Tiptap editor — onUpdate triggers a React re-render so auto-save fires.
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TaskList,
      TaskItem.configure({ nested: true }),
      // Whiteboard drawings are inserted as inline images.
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[280px] px-3 py-2 text-foreground notebook-editor",
      },
    },
    onUpdate: () => setEditorTick((t) => t + 1),
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
      const isOpen = !!detail?.open;
      setChatbotOpen(isOpen);
      if (isOpen) setOpen(false);
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
  // Lock to prevent concurrent saves creating duplicate INSERTs while the
  // user types quickly (the first INSERT hasn't returned a selectedId yet).
  const savingRef = useRef(false);

  // localStorage draft mirror — protects against tab close / crash before
  // the 2.5s debounce fires, and against the "no title yet" silent-skip case.
  const draftKey = useCallback(
    (id: string | null) => `notebook-draft-${user?.id || "anon"}-${id ?? "new"}`,
    [user]
  );
  const writeDraft = useCallback(
    (id: string | null, payload: { title: string; subject: string; content: string }) => {
      try {
        const stripped = payload.content.replace(/<[^>]*>/g, "").trim();
        if (!payload.title.trim() && !stripped) {
          localStorage.removeItem(draftKey(id));
          return;
        }
        localStorage.setItem(draftKey(id), JSON.stringify({ ...payload, savedAt: Date.now() }));
      } catch { /* quota / disabled — ignore */ }
    },
    [draftKey]
  );
  const clearDraft = useCallback((id: string | null) => {
    try { localStorage.removeItem(draftKey(id)); } catch { /* ignore */ }
  }, [draftKey]);

  const listSnapshotKey = useCallback(
    () => `notebook-snapshot-${user?.id || "anon"}`,
    [user]
  );

  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [fromSnapshot, setFromSnapshot] = useState(false);

  const fetchNotebooks = useCallback(async () => {
    if (!user) return;
    setListLoading(true);
    const { fetchUserNotebooks } = await import("@/lib/notebookService");
    const res = await fetchUserNotebooks(user.id);
    setNotebooks(res.rows as unknown as Notebook[]);
    setFromSnapshot(res.fromSnapshot);
    setListError(res.error);
    setListLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && open) {
      // Seed from snapshot immediately so the user sees existing notes
      // while the server query is in flight.
      import("@/lib/notebookService").then(({ readSnapshot }) => {
        const snap = readSnapshot(user.id);
        if (snap && snap.length) setNotebooks(snap as unknown as Notebook[]);
      });
      fetchNotebooks();
    }
  }, [user, open, fetchNotebooks]);


  // Auto-open the most recently updated note when the panel opens with nothing selected.
  // Prevents the "my notes are gone!" experience - students used to see a blank "Ghi chú mới"
  // by default even though their saved notes were still safe in the dropdown.
  const userCreatingNew = useRef(false);
  useEffect(() => {
    if (!open || !editor || selectedId || notebooks.length === 0) return;
    if (userCreatingNew.current) return;
    handleSelect(notebooks[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editor, notebooks, selectedId]);

  const getContent = useCallback(() => {
    return editor?.getHTML() || "";
  }, [editor]);

  const handleNew = () => {
    // Cancel any pending auto-save so it doesn't fire against the new blank state.
    if (autoSaveTimer.current) { clearTimeout(autoSaveTimer.current); autoSaveTimer.current = null; }
    userCreatingNew.current = true;
    setSelectedId(null);
    setTitle("");
    setSubject("general");
    skipNextAutoSave.current = true;
    editor?.commands.setContent("");
    lastSyncedUpdatedAt.current = null;
    setTimeout(() => {
      const titleInput = document.querySelector('input[placeholder^="Tiêu đề"]') as HTMLInputElement | null;
      titleInput?.focus();
    }, 50);
  };

  const handleSelect = (nb: Notebook) => {
    // Cancel any pending auto-save belonging to the previously-open note.
    if (autoSaveTimer.current) { clearTimeout(autoSaveTimer.current); autoSaveTimer.current = null; }
    userCreatingNew.current = false;
    setSelectedId(nb.id);
    setTitle(nb.title);
    setSubject(nb.subject);
    let html = nb.content.includes("<") ? nb.content : `<p>${nb.content}</p>`;
    // If a local draft exists for this note AND it was saved more recently
    // than the server's updated_at, restore the draft so unsaved edits are
    // never lost (e.g. closed tab before debounce fired).
    try {
      const raw = localStorage.getItem(draftKey(nb.id));
      if (raw) {
        const draft = JSON.parse(raw) as { title: string; subject: string; content: string; savedAt: number };
        const remoteTime = new Date(nb.updated_at).getTime();
        if (draft && draft.savedAt && draft.savedAt > remoteTime + 1000) {
          html = draft.content || html;
          if (draft.title) setTitle(draft.title);
          if (draft.subject) setSubject(draft.subject);
          toast({ title: "Đã khôi phục bản nháp chưa lưu của ghi chú này" });
        }
      }
    } catch { /* ignore */ }
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
    if (!user) return;
    if (savingRef.current) return; // prevent concurrent inserts → duplicates
    const content = getContent();
    const stripped = content.replace(/<[^>]*>/g, "").trim();
    // Auto-generate a title so notes without a manual title still persist.
    // (Previously, no title meant silent skip → users lost their typing.)
    let effectiveTitle = title.trim();
    if (!effectiveTitle) {
      if (!stripped) return; // truly empty — nothing to save
      effectiveTitle = `Ghi chú ${new Date().toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}`;
      setTitle(effectiveTitle);
    }
    // Safety: never let an empty editor overwrite an existing saved note.
    if (selectedId && stripped.length < 2) return;

    savingRef.current = true;
    setSaving(true);
    try {
      if (selectedId) {
        const { data: remote } = await supabase
          .from("student_notebooks")
          .select("id, content, updated_at")
          .eq("id", selectedId)
          .maybeSingle();
        if (remote && lastSyncedUpdatedAt.current && remote.updated_at && remote.updated_at > lastSyncedUpdatedAt.current) {
          skipNextAutoSave.current = true;
          const html = remote.content.includes("<") ? remote.content : `<p>${remote.content}</p>`;
          editor?.commands.setContent(html);
          lastSyncedUpdatedAt.current = remote.updated_at;
          toast({ title: "Đã đồng bộ phiên bản mới hơn từ server" });
        } else {
          const nowIso = new Date().toISOString();
          const { data: updated, error } = await supabase
            .from("student_notebooks")
            .update({ title: effectiveTitle, content, subject, updated_at: nowIso })
            .eq("id", selectedId)
            .select("updated_at")
            .single();
          if (error) throw error;
          lastSyncedUpdatedAt.current = updated?.updated_at ?? nowIso;
          clearDraft(selectedId);
        }
      } else {
        const { data, error } = await supabase
          .from("student_notebooks")
          .insert({ user_id: user.id, title: effectiveTitle, content, subject })
          .select("id, updated_at")
          .single();
        if (error) throw error;
        if (data) {
          clearDraft(null); // remove the "new" draft now that it has an id
          setSelectedId(data.id);
          lastSyncedUpdatedAt.current = data.updated_at;
        }
      }
      fetchNotebooks();
    } catch (err) {
      console.error("Notebook save failed:", err);
      toast({ title: "Lỗi khi lưu — bản nháp đã được giữ trên thiết bị", variant: "destructive" });
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [user, selectedId, title, subject, getContent, fetchNotebooks, toast, editor, clearDraft]);

  const handleDelete = async () => {
    if (!selectedId) return;
    const deletedId = selectedId;
    await supabase.from("student_notebooks").delete().eq("id", deletedId);
    const { pruneSnapshot } = await import("@/lib/notebookService");
    if (user?.id) pruneSnapshot(user.id, deletedId);
    handleNew();
    fetchNotebooks();
    toast({ title: "Đã xóa ghi chú" });
  };

  // Export current note as a beautifully formatted PDF.
  const handleExportPdf = useCallback(async () => {
    if (!title.trim() && !getContent().trim()) {
      toast({ title: "Ghi chú trống", variant: "destructive" });
      return;
    }
    try {
      const [{ default: jsPDF }, html2canvasMod] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const html2canvas = (html2canvasMod as any).default || html2canvasMod;

      // Build a styled offscreen container for rendering.
      const wrap = document.createElement("div");
      // Content is rendered at the exact width of the A4 text column so the
      // PDF keeps real page margins on every side.
      const WRAP_W = 666; // CSS px == 499.5pt text column (A4 minus 48pt sides)
      wrap.style.cssText = `
        position: fixed; left: -10000px; top: 0;
        width: ${WRAP_W}px; padding: 0; background: #ffffff;
        font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
        color: #0f172a; line-height: 1.7; box-sizing: border-box;
      `;
      const today = new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" });
      const subjLabel = (subject || "general").replace(/\b\w/g, (c) => c.toUpperCase());
      wrap.innerHTML = `
        <div data-pdf-block style="border-bottom: 3px solid #3B82F6; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <div style="font-size:11px; font-weight:700; letter-spacing:2px; color:#3B82F6; text-transform:uppercase;">HaiEduTech · Sổ tay học sinh</div>
            <div style="font-size:11px; color:#64748b;">${today}</div>
          </div>
          <h1 style="font-size:26px; font-weight:800; margin:6px 0 4px; color:#0f172a;">${(title || "Ghi chú không tiêu đề").replace(/[<>]/g, "")}</h1>
          <div style="display:inline-block; font-size:11px; font-weight:600; padding:3px 10px; border-radius:999px; background:linear-gradient(90deg,#3B82F6,#10B981); color:#fff;">${subjLabel}</div>
        </div>
        <div id="pdf-body" style="font-size:${Math.min(18, Math.max(13, fontSize))}px;">${getContent() || "<p><em>Chưa có nội dung</em></p>"}</div>
      `;
      // Keep body blocks readable and prevent tight lists in the PDF.
      const body = wrap.querySelector("#pdf-body") as HTMLElement | null;
      if (body) {
        body.querySelectorAll<HTMLElement>("p, li, h1, h2, h3, h4, blockquote").forEach((el) => {
          el.style.margin = el.tagName === "LI" ? "2px 0" : "0 0 10px";
          el.style.lineHeight = "1.65";
        });
        body.querySelectorAll<HTMLElement>("ul, ol").forEach((el) => {
          el.style.margin = "0 0 12px";
          el.style.paddingLeft = "22px";
        });
        body.querySelectorAll<HTMLElement>("img").forEach((el) => {
          el.style.maxWidth = "100%";
          el.style.height = "auto";
        });
      }
      document.body.appendChild(wrap);
      try {
        const canvas = await html2canvas(wrap, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const pdf = new jsPDF({ unit: "pt", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const MX = 48;    // left/right margin (pt)
        const MTOP = 44;  // top margin (pt)
        const MBOT = 66;  // bottom margin (pt): footer line + page number live here
        const contentPtW = pageW - MX * 2;
        const cssToPt = contentPtW / WRAP_W;     // CSS px -> PDF pt
        const pxPerCss = canvas.width / WRAP_W;  // canvas px per CSS px
        const pageCssH = (pageH - MTOP - MBOT) / cssToPt; // usable CSS px per page

        // Collect safe break offsets (bottom of every top-level block) so a
        // page break never cuts through a line of text.
        const wrapTop = wrap.getBoundingClientRect().top;
        const breaks: number[] = [];
        const collect = (el: Element) => {
          const r = el.getBoundingClientRect();
          breaks.push(r.bottom - wrapTop);
        };
        wrap.querySelectorAll(":scope > [data-pdf-block]").forEach(collect);
        if (body) {
          body.querySelectorAll(":scope > *").forEach((child) => {
            collect(child);
            // List items are also valid break points.
            child.querySelectorAll(":scope > li").forEach(collect);
          });
        }
        const totalCss = wrap.scrollHeight;
        const sorted = Array.from(new Set(breaks.filter((b) => b > 0 && b < totalCss))).sort((a, b) => a - b);

        let start = 0;
        let page = 0;
        const GAP = 6; // small breathing space after each break
        while (start < totalCss - 1) {
          const limit = start + pageCssH;
          let end = totalCss;
          if (limit < totalCss) {
            const candidates = sorted.filter((b) => b > start + 40 && b <= limit);
            end = candidates.length ? candidates[candidates.length - 1] + GAP : limit;
          }
          const sy = Math.round(start * pxPerCss);
          const sh = Math.min(Math.round((end - start) * pxPerCss), canvas.height - sy);
          if (sh <= 0) break;
          const slice = document.createElement("canvas");
          slice.width = canvas.width;
          slice.height = sh;
          const ctx = slice.getContext("2d");
          if (!ctx) break;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, slice.width, slice.height);
          ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);
          if (page > 0) pdf.addPage();
          pdf.addImage(
            slice.toDataURL("image/jpeg", 0.95),
            "JPEG",
            MX,
            MTOP,
            contentPtW,
            (sh / pxPerCss) * cssToPt,
          );
          page += 1;
          start = end;
        }
        // Footer band (brand line + page number) drawn as real vector text on
        // every page, so it never gets cut by pagination.
        const total = pdf.getNumberOfPages();
        for (let i = 1; i <= total; i += 1) {
          pdf.setPage(i);
          pdf.setDrawColor(226, 232, 240);
          pdf.setLineWidth(0.6);
          pdf.line(MX, pageH - 46, pageW - MX, pageH - 46);
          pdf.setFontSize(8);
          pdf.setTextColor(148, 163, 184);
          pdf.text(`© ${new Date().getFullYear()} HaiEduTech · haiedutech.com`, MX, pageH - 33);
          pdf.text("Xuat tu So tay hoc sinh", pageW - MX, pageH - 33, { align: "right" });
          pdf.setFontSize(9);
          pdf.text(`${i} / ${total}`, pageW / 2, pageH - 18, { align: "center" });
        }
        const fname = (title || "ghi-chu").replace(/[^\p{L}\p{N}\-_ ]+/gu, "").trim().replace(/\s+/g, "-").slice(0, 60) || "ghi-chu";
        pdf.save(`${fname}.pdf`);
        toast({ title: "Đã xuất PDF ✓" });
      } finally {
        document.body.removeChild(wrap);
      }

    } catch (err) {
      console.error("PDF export error:", err);
      toast({ title: "Lỗi xuất PDF", variant: "destructive" });
    }
  }, [title, subject, getContent, toast, fontSize]);

  // Auto-save after a short pause (sync-safe). editorTick ensures the
  // effect actually re-fires on every keystroke.
  // ALSO mirrors every change to localStorage immediately so a tab close,
  // network blip or quick close before debounce never loses typing.
  useEffect(() => {
    if (!open || !user) return;
    if (skipNextAutoSave.current) {
      skipNextAutoSave.current = false;
      return;
    }
    // Immediate local mirror (never debounced — this is the safety net).
    writeDraft(selectedId, { title, subject, content: getContent() });
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleSave();
    }, 500);
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current); };
  }, [editorTick, title, subject, open, user, selectedId, handleSave, writeDraft, getContent]);

  // On panel open / login, restore any unsaved draft (typed content that
  // never made it to the server because the user closed the tab).
  const draftRestoredRef = useRef(false);
  useEffect(() => {
    if (!open || !user || !editor || draftRestoredRef.current) return;
    // Wait until the saved-notes list has finished loading so we can compare
    // the draft against the server state.
    if (listLoading) return;
    try {
      const raw = localStorage.getItem(draftKey(null));
      if (!raw) {
        draftRestoredRef.current = true;
        return;
      }
      const draft = JSON.parse(raw) as { title: string; subject: string; content: string };
      const stripped = (draft.content || "").replace(/<[^>]*>/g, "").trim();
      // Only restore a "new" draft when it actually has meaningful content.
      if (stripped.length < 3 && !draft.title?.trim()) {
        draftRestoredRef.current = true;
        return;
      }
      // If this draft was already promoted to a saved note (same content),
      // don't restore it as a duplicate "new" note.
      const alreadySaved = notebooks.some(
        (nb) => (nb.content || "").replace(/<[^>]*>/g, "").trim() === stripped
      );
      if (alreadySaved) {
        clearDraft(null);
        draftRestoredRef.current = true;
        return;
      }
      // Restore the unsaved draft even when other saved notes exist — losing
      // typed content was the top complaint. It is promoted to the server by
      // the auto-save effect right after this.
      userCreatingNew.current = true;
      setSelectedId(null);
      setTitle(draft.title || "");
      setSubject(draft.subject || "general");
      editor.commands.setContent(draft.content || "");
      lastSyncedUpdatedAt.current = null;
      draftRestoredRef.current = true;
      toast({ title: "Đã khôi phục bản nháp chưa lưu" });
      // Promote immediately so a page reset can never lose it again.
      setTimeout(() => { void handleSave(); }, 100);
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user, editor, draftKey, toast, listLoading, notebooks, clearDraft]);



  // Flush-save on panel close so quick edits (< debounce window) survive.
  const handleClosePanel = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    if (user) {
      handleSave();
    }
    setOpen(false);
  }, [user, handleSave]);

  // Flush on tab close / hide. localStorage mirror is already up-to-date,
  // and we kick off a final server save fire-and-forget.
  useEffect(() => {
    if (!open) return;
    const flush = () => {
      writeDraft(selectedId, { title, subject, content: getContent() });
      if (autoSaveTimer.current) { clearTimeout(autoSaveTimer.current); autoSaveTimer.current = null; }
      if (user) void handleSave();
    };
    const onVis = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [open, user, selectedId, title, subject, getContent, handleSave, writeDraft]);

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

  // Resize handlers - any edge/corner, capped only by the viewport so the
  // notebook can be stretched to almost full screen for teaching.
  const onResizeStart = useCallback(
    (edge: "right" | "bottom" | "corner" | "left" | "top") => (e: React.MouseEvent | React.TouchEvent) => {
      resizing.current = edge;
      const point = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
      resizeStart.current = {
        x: point.clientX,
        y: point.clientY,
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
      };
      setMaximized(false);
      e.preventDefault();
      e.stopPropagation();
    },
    [size, position],
  );

  // Insert a whiteboard drawing into the current note as an inline image, then
  // jump back to the note tab so the teacher sees where it landed.
  const handleInsertDrawing = useCallback(
    (dataUrl: string) => {
      if (!editor || !dataUrl) return;
      editor.chain().focus().setImage({ src: dataUrl, alt: "Bảng trắng" }).run();
      setEditorTick((t) => t + 1);
      setTab("notes");
      toast({ title: "Đã chèn bản vẽ vào ghi chú" });
    },
    [editor, toast],
  );

  // Reset position
  const handleResetPosition = useCallback(() => {
    setPosition(getDefaultPosition(size.width, size.height));
  }, [size]);

  // Maximize / restore the panel.
  const toggleMaximize = useCallback(() => {
    if (maximized) {
      const prev = preMaximize.current;
      if (prev) {
        setSize(prev.size);
        setPosition({
          x: clamp(prev.position.x, 10, Math.max(10, window.innerWidth - prev.size.width)),
          y: clamp(prev.position.y, 10, Math.max(10, window.innerHeight - 80)),
        });
      }
      setMaximized(false);
      return;
    }
    preMaximize.current = { size, position };
    setSize({ width: window.innerWidth - 32, height: window.innerHeight - 80 });
    setPosition({ x: 16, y: 56 });
    setMaximized(true);
  }, [maximized, size, position]);

  // Keep the maximized panel glued to the viewport when the window changes.
  useEffect(() => {
    if (!maximized) return;
    const onWinResize = () => {
      setSize({ width: window.innerWidth - 32, height: window.innerHeight - 80 });
      setPosition({ x: 16, y: 56 });
    };
    onWinResize();
    window.addEventListener("resize", onWinResize);
    return () => window.removeEventListener("resize", onWinResize);
  }, [maximized]);

  useEffect(() => {
    const onMove = (clientX: number, clientY: number) => {
      if (dragging.current) {
        setPosition({
          x: clamp(clientX - dragOffset.current.x, 0, Math.max(0, window.innerWidth - size.width)),
          y: clamp(clientY - dragOffset.current.y, 10, Math.max(10, window.innerHeight - 100)),
        });
      }
      if (resizing.current) {
        const edge = resizing.current;
        const start = resizeStart.current;
        const maxW = window.innerWidth - 20;
        const maxH = window.innerHeight - 40;
        let width = size.width;
        let height = size.height;
        let x = position.x;
        let y = position.y;

        if (edge === "right" || edge === "corner") {
          width = clamp(clientX - start.left, 360, maxW);
        } else if (edge === "left") {
          const right = start.left + start.width;
          width = clamp(right - clientX, 360, maxW);
          x = right - width;
        }
        if (edge === "bottom" || edge === "corner") {
          height = clamp(clientY - start.top, 320, maxH);
        } else if (edge === "top") {
          const bottom = start.top + start.height;
          height = clamp(bottom - clientY, 320, maxH);
          y = bottom - height;
        }

        setSize({ width, height });
        if (x !== position.x || y !== position.y) setPosition({ x: Math.max(0, x), y: Math.max(0, y) });
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
  if (chatbotOpen && !open) return null;

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-16 z-[80] w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform sm:bottom-6 sm:right-20 sm:w-14 sm:h-14"
        whileTap={{ scale: 0.9 }}
        aria-label="Open notebook"
      >
        <BookOpen size={22} />
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
            className="fixed z-[80] rounded-xl shadow-2xl flex flex-col overflow-hidden"
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
                <button
                  onClick={toggleMaximize}
                  className="p-1.5 rounded-md hover:bg-black/10"
                  title={maximized ? "Thu nhỏ" : "Phóng to toàn màn hình"}
                  style={{ color: theme.text }}
                >
                  {maximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={handleNew} className="p-1.5 rounded-md hover:bg-black/10" title="Tạo mới" style={{ color: theme.text }}>
                  <Plus size={16} />
                </button>
                <button onClick={handleClosePanel} className="p-1.5 rounded-md hover:bg-black/10" style={{ color: theme.text }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Tabs: rich text notes, live whiteboard, notes shared with me */}
            <div className="px-3 pt-2 flex items-center gap-1">
              {([
                { key: "notes" as const, label: "Ghi chú", Icon: FileText },
                { key: "board" as const, label: "Bảng trắng", Icon: PenLine },
                { key: "shared" as const, label: "Được chia sẻ", Icon: Users },
              ]).map(({ key, label, Icon }) => (

                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    tab === key ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground"
                  }`}
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {/* Saved notes selector - compact dropdown */}
            <div className="px-3 pt-2 flex items-center gap-2">
              <select
                value={selectedId || ""}
                onChange={(e) => {
                  const nb = notebooks.find(n => n.id === e.target.value);
                  if (nb) handleSelect(nb);
                  else handleNew();
                }}
                className="flex-1 text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground"
              >
                <option value="">
                  {listLoading
                    ? "⏳ Đang tải ghi chú..."
                    : `📝 Ghi chú mới (${notebooks.length} đã lưu${fromSnapshot ? " · bản tạm" : ""})`}
                </option>
                {notebooks.map(nb => (
                  <option key={nb.id} value={nb.id}>
                    {nb.title || "(Chưa có tiêu đề)"} - {new Date(nb.updated_at).toLocaleDateString("vi-VN")}
                  </option>
                ))}
              </select>
              {listError && (
                <button
                  onClick={() => fetchNotebooks()}
                  className="text-[10px] px-2 py-1 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20"
                  title={listError}
                >
                  Tải lại
                </button>
              )}

              <Link
                to="/notebook"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-black/10 text-muted-foreground"
                title="Mở Sổ Tay đầy đủ"
              >
                <ExternalLink size={14} />
              </Link>
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
            <div className={`px-3 pt-2 flex items-center gap-1 flex-wrap ${tab === "notes" ? "" : "hidden"}`}>
              {[
                { icon: Bold, action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive("bold") },
                { icon: Italic, action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive("italic") },
                { icon: Underline, action: () => editor?.chain().focus().toggleUnderline().run(), active: editor?.isActive("underline") },
                { icon: List, action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive("bulletList") },
                { icon: ListOrdered, action: () => editor?.chain().focus().toggleOrderedList().run(), active: editor?.isActive("orderedList") },
                { icon: ListChecks, action: () => editor?.chain().focus().toggleTaskList().run(), active: editor?.isActive("taskList") },
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

              {/* Font size control */}
              <div className="flex items-center gap-1 ml-auto rounded-md px-1" style={{ border: `1px solid ${theme.border}` }}>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                  disabled={fontSize <= 12}
                  className="px-1.5 py-0.5 rounded text-xs hover:bg-primary/10 disabled:opacity-40"
                  title="Giảm cỡ chữ"
                  style={{ color: theme.text }}
                >
                  A-
                </button>
                <span className="text-[10px] tabular-nums" style={{ color: theme.text, opacity: 0.7 }}>{fontSize}</span>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(32, s + 2))}
                  disabled={fontSize >= 32}
                  className="px-1.5 py-0.5 rounded text-sm font-semibold hover:bg-primary/10 disabled:opacity-40"
                  title="Tăng cỡ chữ"
                  style={{ color: theme.text }}
                >
                  A+
                </button>
              </div>
            </div>

            {/* Editor / Whiteboard */}
            {tab === "notes" ? (
              <div className="px-3 pt-2 flex-1 min-h-0 overflow-auto">
                <div
                  className="rounded-md h-full overflow-auto"
                  style={{ backgroundColor: theme.editorBg, border: `1px solid ${theme.border}`, fontSize: `${fontSize}px` }}
                >
                  <EditorContent editor={editor} />
                </div>
              </div>
            ) : (
              <div className="px-3 pt-2 flex-1 min-h-0">
                <NotebookWhiteboard onInsert={handleInsertDrawing} />
              </div>
            )}


            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-2 text-xs" style={{ borderTop: `1px solid ${theme.border}`, color: theme.text, opacity: 0.7 }}>
              <span>{wordCount} từ</span>
              <div className="flex items-center gap-2">
                <button onClick={handleExportPdf} disabled={!title.trim()} className="p-1.5 rounded-md hover:bg-primary/10 text-primary disabled:opacity-40" title="Xuất PDF">
                  <Download size={14} />
                </button>
                {selectedId && (
                  <button onClick={handleDelete} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive" title="Xóa">
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
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
