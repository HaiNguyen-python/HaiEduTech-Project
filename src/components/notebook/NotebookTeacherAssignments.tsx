/**
 * Teacher mode inside the floating notebook: create a class, enroll students,
 * assign homework and see who already ticked it - without leaving the notebook.
 *
 * Writes go through `@/lib/teacherAssignmentActions`, the same helpers the
 * admin pages use, so both surfaces behave identically.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Loader2, Plus, Users, Trash2, ChevronDown, ChevronRight, Pencil,
  CalendarClock, AlertTriangle, CheckCircle2, Circle, Send,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchAllRows } from "@/lib/adminData";
import { dedupeStudentProfiles, fetchAllProfiles } from "@/lib/adminStudents";
import { SUBJECT_LABELS, buildAssignmentRows, formatDeadline, type Assignment, type Submission } from "@/lib/assignmentMetrics";
import { ASSIGNMENT_LESSON_CATALOG } from "@/lib/assignmentLessonCatalog";
import {
  createAssignment, createClass, deleteAssignment, deleteClass, renameClass, updateClassMembers,
} from "@/lib/teacherAssignmentActions";

interface ClassRow { id: string; class_name: string; subject_category: string }
interface MemberRow { class_id: string; user_id: string }
interface ProfileRow { id: string; full_name: string | null; created_at?: string | null }

type Section = "assign" | "classes" | "track";

const NotebookTeacherAssignments = ({ teacherId }: { teacherId: string }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [students, setStudents] = useState<ProfileRow[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [section, setSection] = useState<Section>("assign");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, m, p, a, s] = await Promise.all([
        fetchAllRows<ClassRow>((from, to) =>
          supabase.from("classes").select("id, class_name, subject_category").order("class_name").range(from, to)),
        fetchAllRows<MemberRow>((from, to) =>
          supabase.from("class_members").select("class_id, user_id").range(from, to)),
        fetchAllProfiles(),
        fetchAllRows<Assignment>((from, to) =>
          supabase.from("assignments").select("*").order("assigned_at", { ascending: false }).range(from, to)),
        fetchAllRows<Submission>((from, to) =>
          supabase.from("student_submissions").select("*").range(from, to)),
      ]);
      setClasses(c);
      setMembers(m);
      setStudents(dedupeStudentProfiles(p).students as ProfileRow[]);
      setAssignments(a);
      setSubmissions(s);
    } catch (e) {
      toast({
        title: "Không tải được dữ liệu lớp / bài tập",
        description: e instanceof Error ? e.message : undefined,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  // A student ticking a task updates this panel without a manual reload.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => load(), 800);
    };
    const channel = supabase
      .channel(`notebook_teacher_${teacherId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "student_submissions" }, schedule)
      .on("postgres_changes", { event: "*", schema: "public", table: "assignments" }, schedule)
      .subscribe();
    return () => {
      if (timer) clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [teacherId, load]);

  const studentName = useCallback(
    (id: string) => students.find((s) => s.id === id)?.full_name || id.slice(0, 8),
    [students],
  );

  const memberIdsOf = useCallback(
    (classId: string) => members.filter((m) => m.class_id === classId).map((m) => m.user_id),
    [members],
  );

  const rows = useMemo(() => buildAssignmentRows(assignments, submissions), [assignments, submissions]);
  const myRows = useMemo(
    () => rows.filter((r) => !r.teacher_id || r.teacher_id === teacherId).slice(0, 40),
    [rows, teacherId],
  );

  if (loading) {
    return <div className="p-6 grid place-items-center text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /></div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5" role="tablist" aria-label="Chế độ giáo viên">
        {([
          { key: "assign" as const, label: "Giao bài" },
          { key: "classes" as const, label: "Lớp học" },
          { key: "track" as const, label: "Theo dõi" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={section === key}
            onClick={() => setSection(key)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${
              section === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {section === "assign" && (
        <AssignForm
          teacherId={teacherId}
          classes={classes}
          students={students}
          memberIdsOf={memberIdsOf}
          onDone={load}
        />
      )}

      {section === "classes" && (
        <ClassesPanel
          teacherId={teacherId}
          classes={classes}
          students={students}
          memberIdsOf={memberIdsOf}
          onChanged={load}
        />
      )}

      {section === "track" && (
        <TrackPanel rows={myRows} studentName={studentName} onChanged={load} />
      )}
    </div>
  );
};

/* ------------------------------- Assign form ------------------------------ */

interface PickerProps {
  classes: ClassRow[];
  students: ProfileRow[];
  memberIdsOf: (classId: string) => string[];
}

function StudentPicker({
  students, selected, onToggle,
}: { students: ProfileRow[]; selected: Set<string>; onToggle: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => (s.full_name ?? "").toLowerCase().includes(q));
  }, [students, query]);

  return (
    <div className="space-y-1.5">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm học viên theo tên..."
        aria-label="Tìm học viên"
        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
      />
      <p className="text-[11px] text-muted-foreground">Đã chọn {selected.size} học viên</p>
      <div className="max-h-44 overflow-y-auto rounded-md border border-border divide-y divide-border/60">
        {filtered.length === 0 ? (
          <p className="p-2 text-xs text-muted-foreground">Không tìm thấy học viên.</p>
        ) : filtered.map((s) => (
          <label key={s.id} className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-muted/60">
            <input
              type="checkbox"
              checked={selected.has(s.id)}
              onChange={() => onToggle(s.id)}
              className="h-4 w-4 accent-emerald-600"
            />
            <span className="truncate">{s.full_name || s.id.slice(0, 8)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AssignForm({
  teacherId, classes, students, memberIdsOf, onDone,
}: PickerProps & { teacherId: string; onDone: () => void }) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("english");
  const [title, setTitle] = useState("");
  const [sourceRef, setSourceRef] = useState("");
  const [level, setLevel] = useState("");
  const [deadline, setDeadline] = useState("");
  const [classId, setClassId] = useState("none");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const lessons = ASSIGNMENT_LESSON_CATALOG[subject] ?? [];

  const toggle = (id: string) => {
    setSelected((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const pickClass = (id: string) => {
    setClassId(id);
    if (id === "none") return;
    const ids = memberIdsOf(id);
    setSelected(new Set(ids));
    if (ids.length === 0) {
      toast({
        title: "Lớp này chưa có học viên",
        description: "Thêm học viên ở mục Lớp học, hoặc chọn từng em bên dưới.",
        variant: "destructive",
      });
    }
  };

  const submit = async () => {
    setSaving(true);
    try {
      const res = await createAssignment({
        title,
        subject,
        level,
        sourceRef,
        deadline: deadline || null,
        teacherId,
        targetClassName: classes.find((c) => c.id === classId)?.class_name ?? null,
        studentIds: Array.from(selected),
      });
      if (res.notifyError) {
        toast({
          title: "Đã giao bài, nhưng chưa gửi được thông báo",
          description: res.notifyError,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Đã giao bài tập",
          description: `${res.assigned} học viên · ${res.notified} thông báo đã gửi.`,
        });
      }
      setTitle(""); setSourceRef(""); setLevel(""); setDeadline("");
      setClassId("none"); setSelected(new Set());
      onDone();
    } catch (e) {
      toast({
        title: "Chưa giao được bài",
        description: e instanceof Error ? e.message : undefined,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm";

  return (
    <div className="space-y-2.5">
      <div>
        <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="nb-subject">Môn</label>
        <select
          id="nb-subject"
          className={inputCls}
          value={subject}
          onChange={(e) => { setSubject(e.target.value); setTitle(""); setSourceRef(""); setLevel(""); }}
        >
          {Object.entries(SUBJECT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      <div>
        <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="nb-lesson">Chọn bài từ thư viện</label>
        <select
          id="nb-lesson"
          className={inputCls}
          value={lessons.find((l) => l.title === title)?.id ?? ""}
          onChange={(e) => {
            const lesson = lessons.find((l) => l.id === e.target.value);
            if (lesson) {
              setTitle(lesson.title);
              setSourceRef(lesson.route);
              if (lesson.level) setLevel(lesson.level);
            }
          }}
        >
          <option value="">-- Chọn bài học --</option>
          {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
        </select>
        <input
          className={`${inputCls} mt-1.5`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hoặc tự nhập tên bài tập"
          aria-label="Tên bài tập"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="nb-level">Trình độ</label>
          <input id="nb-level" className={inputCls} value={level} onChange={(e) => setLevel(e.target.value)} placeholder="A2, HSK3..." />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="nb-deadline">Hạn chót</label>
          <input id="nb-deadline" type="date" className={inputCls} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="nb-class">Giao cho lớp</label>
        <select id="nb-class" className={inputCls} value={classId} onChange={(e) => pickClass(e.target.value)}>
          <option value="none">Không theo lớp - chọn từng học viên</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.class_name} · {memberIdsOf(c.id).length} học viên
            </option>
          ))}
        </select>
      </div>

      <StudentPicker students={students} selected={selected} onToggle={toggle} />

      <button
        onClick={submit}
        disabled={saving || !title.trim() || selected.size === 0}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Giao bài cho {selected.size} học viên
      </button>
    </div>
  );
}

/* ------------------------------ Classes panel ----------------------------- */

function ClassesPanel({
  teacherId, classes, students, memberIdsOf, onChanged,
}: PickerProps & { teacherId: string; onChanged: () => void }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("english");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [savingMembers, setSavingMembers] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState("");
  const [renameSubject, setRenameSubject] = useState("english");
  const [savingRename, setSavingRename] = useState(false);

  const openEditor = (classId: string) => {
    if (editingId === classId) { setEditingId(null); return; }
    setEditingId(classId);
    setSelected(new Set(memberIdsOf(classId)));
  };

  const startRename = (c: ClassRow) => {
    if (renamingId === c.id) { setRenamingId(null); return; }
    setRenamingId(c.id);
    setRenameName(c.class_name);
    setRenameSubject(c.subject_category);
  };

  const saveRename = async (c: ClassRow) => {
    setSavingRename(true);
    try {
      const res = await renameClass(c.id, {
        className: renameName,
        subject: renameSubject,
        previousName: c.class_name,
      });
      toast({
        title: "Đã đổi tên lớp",
        description: res.assignmentsUpdated > 0
          ? `Cập nhật ${res.assignmentsUpdated} bài tập theo tên mới.`
          : renameName.trim(),
      });
      setRenamingId(null);
      onChanged();
    } catch (e) {
      toast({ title: "Chưa đổi được tên lớp", description: e instanceof Error ? e.message : undefined, variant: "destructive" });
      onChanged();
    } finally {
      setSavingRename(false);
    }
  };

  const removeClass = async (c: ClassRow) => {
    if (!confirm(`Xoá lớp "${c.class_name}"? Danh sách thành viên cũng bị xoá.`)) return;
    try {
      await deleteClass(c.id);
      toast({ title: "Đã xoá lớp" });
      setEditingId(null);
      setRenamingId(null);
      onChanged();
    } catch (e) {
      toast({ title: "Chưa xoá được lớp", description: e instanceof Error ? e.message : undefined, variant: "destructive" });
    }
  };

  const create = async () => {
    setCreating(true);
    try {
      await createClass({ className: name, subject, createdBy: teacherId });
      toast({ title: "Đã tạo lớp", description: name.trim() });
      setName("");
      onChanged();
    } catch (e) {
      toast({ title: "Chưa tạo được lớp", description: e instanceof Error ? e.message : undefined, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  const saveMembers = async (classId: string) => {
    setSavingMembers(true);
    try {
      const res = await updateClassMembers(classId, memberIdsOf(classId), selected);
      toast({ title: "Đã cập nhật thành viên", description: `Thêm ${res.added} · bớt ${res.removed}` });
      setEditingId(null);
      onChanged();
    } catch (e) {
      toast({ title: "Chưa lưu được thành viên", description: e instanceof Error ? e.message : undefined, variant: "destructive" });
      onChanged(); // reload so the list reflects reality
    } finally {
      setSavingMembers(false);
    }
  };

  const inputCls = "w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm";

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-border p-2.5 space-y-2">
        <p className="text-xs font-semibold text-foreground">Tạo lớp mới</p>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên lớp, ví dụ: IELTS tối T3-T5" aria-label="Tên lớp" />
        <select className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Môn của lớp">
          {Object.entries(SUBJECT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <button
          onClick={create}
          disabled={creating || !name.trim()}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Tạo lớp
        </button>
      </div>

      {classes.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-3">Chưa có lớp nào.</p>
      ) : (
        <ul className="space-y-1.5">
          {classes.map((c) => (
            <li key={c.id} className="rounded-md border border-border">
              <div className="flex items-center gap-1 px-2.5 py-2">
                <button
                  onClick={() => openEditor(c.id)}
                  aria-expanded={editingId === c.id}
                  className="flex flex-1 min-w-0 items-center gap-2 text-left"
                >
                  {editingId === c.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium truncate">{c.class_name}</span>
                    <span className="block text-[11px] text-muted-foreground">
                      {SUBJECT_LABELS[c.subject_category] ?? c.subject_category}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Users size={12} /> {memberIdsOf(c.id).length}
                  </span>
                </button>
                <button
                  onClick={() => startRename(c)}
                  aria-label={`Đổi tên lớp ${c.class_name}`}
                  aria-expanded={renamingId === c.id}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-primary"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => removeClass(c)}
                  aria-label={`Xoá lớp ${c.class_name}`}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {renamingId === c.id && (
                <div className="border-t border-border p-2.5 space-y-2">
                  <label className="text-[11px] font-semibold text-muted-foreground" htmlFor={`rename-${c.id}`}>Tên lớp mới</label>
                  <input
                    id={`rename-${c.id}`}
                    className={inputCls}
                    value={renameName}
                    onChange={(e) => setRenameName(e.target.value)}
                  />
                  <select
                    className={inputCls}
                    value={renameSubject}
                    onChange={(e) => setRenameSubject(e.target.value)}
                    aria-label="Môn của lớp"
                  >
                    {Object.entries(SUBJECT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveRename(c)}
                      disabled={savingRename || !renameName.trim()}
                      className="flex-1 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                    >
                      {savingRename ? "Đang lưu..." : "Lưu tên lớp"}
                    </button>
                    <button
                      onClick={() => setRenamingId(null)}
                      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground"
                    >
                      Huỷ
                    </button>
                  </div>
                </div>
              )}

              {editingId === c.id && (
                <div className="border-t border-border p-2.5 space-y-2">
                  <StudentPicker
                    students={students}
                    selected={selected}
                    onToggle={(id) => setSelected((cur) => {
                      const next = new Set(cur);
                      if (next.has(id)) next.delete(id); else next.add(id);
                      return next;
                    })}
                  />
                  <button
                    onClick={() => saveMembers(c.id)}
                    disabled={savingMembers}
                    className="w-full rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {savingMembers ? "Đang lưu..." : "Lưu thành viên"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------- Track panel ------------------------------ */

function TrackPanel({
  rows, studentName, onChanged,
}: {
  rows: ReturnType<typeof buildAssignmentRows>;
  studentName: (id: string) => string;
  onChanged: () => void;
}) {
  const { toast } = useToast();
  const [openId, setOpenId] = useState<string | null>(null);

  const remove = async (id: string, title: string) => {
    if (!confirm(`Xoá bài tập "${title}"? Tiến độ của học viên cũng bị xoá.`)) return;
    try {
      await deleteAssignment(id);
      toast({ title: "Đã xoá bài tập" });
      onChanged();
    } catch (e) {
      toast({ title: "Chưa xoá được", description: e instanceof Error ? e.message : undefined, variant: "destructive" });
    }
  };

  if (rows.length === 0) {
    return <p className="text-xs text-muted-foreground text-center py-4">Chưa giao bài tập nào.</p>;
  }

  return (
    <ul className="space-y-1.5">
      {rows.map((r) => {
        const done = (r.target_student_ids ?? []).filter((sid) =>
          r.submissions.some((s) => s.student_id === sid && s.status === "completed"));
        const notDone = (r.target_student_ids ?? []).filter((sid) => !done.includes(sid));
        const pct = Math.round(r.progressPct);
        const overdue = r.derivedStatus === "overdue";
        return (
          <li key={r.id} className={`rounded-md border px-2.5 py-2 ${overdue ? "border-rose-200 bg-rose-50/40" : "border-border"}`}>
            <div className="flex items-start gap-2">
              <button
                onClick={() => setOpenId(openId === r.id ? null : r.id)}
                aria-expanded={openId === r.id}
                className="flex-1 min-w-0 text-left"
              >
                <span className="block text-sm font-medium break-words">{r.title}</span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="rounded-full border border-border px-1.5 py-0.5">
                    {SUBJECT_LABELS[r.subject] ?? r.subject}{r.level ? ` · ${r.level}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1"><CalendarClock size={11} /> {formatDeadline(r.deadline)}</span>
                  {overdue && <span className="inline-flex items-center gap-1 text-rose-600 font-medium"><AlertTriangle size={11} /> Quá hạn</span>}
                </span>
                <span className="mt-1.5 block text-[11px] font-medium text-foreground">
                  Đã làm {done.length}/{r.assigneesCount} ({pct}%)
                </span>
                <span className="mt-1 block h-1.5 rounded-full bg-border overflow-hidden">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                </span>
              </button>
              <button
                onClick={() => remove(r.id, r.title)}
                aria-label={`Xoá bài tập ${r.title}`}
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {openId === r.id && (
              <div className="mt-2 border-t border-border pt-2 grid gap-2 text-[11px]">
                <div>
                  <p className="font-semibold text-emerald-700 mb-1">Đã làm ({done.length})</p>
                  {done.length === 0 ? <p className="text-muted-foreground">Chưa có ai.</p> : (
                    <ul className="space-y-0.5">
                      {done.map((sid) => (
                        <li key={sid} className="inline-flex items-center gap-1 text-foreground">
                          <CheckCircle2 size={11} className="text-emerald-600" /> {studentName(sid)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground mb-1">Chưa làm ({notDone.length})</p>
                  {notDone.length === 0 ? <p className="text-emerald-700">Cả lớp đã hoàn thành!</p> : (
                    <ul className="space-y-0.5">
                      {notDone.map((sid) => (
                        <li key={sid} className="inline-flex items-center gap-1 text-muted-foreground">
                          <Circle size={11} /> {studentName(sid)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default NotebookTeacherAssignments;
