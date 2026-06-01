// Admin Assignment Management Dashboard - /admin/assignments
// Multi-subject homework tracker for Teacher Hai.
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Eye, Trash2, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  buildAssignmentRows,
  formatAssignedTime,
  formatDeadline,
  totalRuntimeHours,
  SUBJECT_LABELS,
  type AssignmentRow,
  type Submission,
  type Assignment,
} from "@/lib/assignmentMetrics";
import { ASSIGNMENT_LESSON_CATALOG } from "@/lib/assignmentLessonCatalog";

type StatusFilter = "all" | "in_progress" | "completed" | "overdue";
type SubjectFilter = "all" | keyof typeof SUBJECT_LABELS;

interface StudentProfile {
  id: string;
  full_name: string | null;
}

interface ClassOption {
  id: string;
  class_name: string;
  subject_category: string;
}

interface ClassMember {
  class_id: string;
  user_id: string;
}

const STATUS_BADGE: Record<string, string> = {
  in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  overdue: "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_LABEL: Record<string, string> = {
  in_progress: "In progress",
  completed: "Completed",
  overdue: "Overdue",
};

function AccuracyRing({ value }: { value: number | null }) {
  if (value == null) {
    return <span className="text-xs text-slate-400">—</span>;
  }
  const pct = Math.max(0, Math.min(100, value));
  const stroke = pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="inline-flex items-center gap-2">
      <div
        className="h-9 w-9 rounded-full grid place-items-center text-[10px] font-semibold text-slate-700"
        style={{
          background: `conic-gradient(${stroke} ${pct * 3.6}deg, #f1f5f9 0)`,
        }}
      >
        <div className="h-7 w-7 rounded-full bg-white grid place-items-center">
          {Math.round(pct)}%
        </div>
      </div>
    </div>
  );
}

const AdminAssignments = () => {
  const { user, isTeacher, loading: roleLoading } = useUserRole();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);

  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const [createOpen, setCreateOpen] = useState(false);
  const [detailRow, setDetailRow] = useState<AssignmentRow | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: aData }, { data: sData }, { data: pData }] = await Promise.all([
      supabase.from("assignments").select("*").order("assigned_at", { ascending: false }),
      supabase.from("student_submissions").select("*"),
      supabase.from("profiles").select("id, full_name").order("full_name"),
    ]);
    setAssignments((aData as Assignment[]) ?? []);
    setSubmissions((sData as Submission[]) ?? []);
    // Dedupe students by id, then by normalized display name so duplicate
    // profiles (same person registered twice) don't appear in the picker.
    const rawProfiles = (pData as StudentProfile[]) ?? [];
    const byId = new Map<string, StudentProfile>();
    rawProfiles.forEach((p) => { if (!byId.has(p.id)) byId.set(p.id, p); });
    const seenNames = new Set<string>();
    const uniqueStudents: StudentProfile[] = [];
    Array.from(byId.values()).forEach((p) => {
      const key = (p.full_name ?? "").trim().toLowerCase();
      if (key && seenNames.has(key)) return; // skip duplicate display name
      if (key) seenNames.add(key);
      uniqueStudents.push(p);
    });
    setStudents(uniqueStudents);
    setLoading(false);
  };

  useEffect(() => {
    if (isTeacher) fetchAll();
  }, [isTeacher]);

  const rows = useMemo(
    () => buildAssignmentRows(assignments, submissions),
    [assignments, submissions],
  );

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (subjectFilter !== "all" && r.subject !== subjectFilter) return false;
      if (statusFilter !== "all" && r.derivedStatus !== statusFilter) return false;
      if (levelFilter !== "all" && (r.level ?? "") !== levelFilter) return false;
      return true;
    });
  }, [rows, subjectFilter, statusFilter, levelFilter]);

  const levels = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.level && set.add(r.level));
    return Array.from(set);
  }, [rows]);

  const activeCount = rows.filter((r) => r.derivedStatus !== "completed").length;
  const runtimeHours = totalRuntimeHours(submissions);

  if (roleLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isTeacher) return <Navigate to="/" replace />;

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this assignment? Submissions will be removed too.")) return;
    const { error } = await supabase.from("assignments").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Assignment deleted" });
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">Admin · LMS</p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-1">
              Assignment Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Multi-subject homework tracker for Teacher Hai
            </p>
          </div>
        </header>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MetricCard
            label="Assigned Tests"
            value={activeCount.toString()}
            hint="Active across all subjects"
          />
          <MetricCard
            label="Class Runtime / Study Hours"
            value={runtimeHours.toFixed(1)}
            hint="Total time logged by students"
          />
        </div>

        {/* Filter bar */}
        <div className="rounded-xl border border-slate-100 bg-white p-4 flex flex-wrap items-center gap-3">
          <Select value={subjectFilter} onValueChange={(v) => setSubjectFilter(v as SubjectFilter)}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {Object.entries(SUBJECT_LABELS).map(([v, label]) => (
                <SelectItem key={v} value={v}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
            <SelectTrigger className="w-[170px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {levels.map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto">
            <Button
              onClick={() => setCreateOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              <Plus className="h-4 w-4" />
              Assign an exercise
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-slate-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <th className="px-4 py-3 font-medium">No</th>
                  <th className="px-4 py-3 font-medium">Exercise name</th>
                  <th className="px-4 py-3 font-medium">Subject/Level</th>
                  <th className="px-4 py-3 font-medium">Accuracy</th>
                  <th className="px-4 py-3 font-medium">Teacher</th>
                  <th className="px-4 py-3 font-medium">Progress</th>
                  <th className="px-4 py-3 font-medium">Assignees</th>
                  <th className="px-4 py-3 font-medium">Assigned time</th>
                  <th className="px-4 py-3 font-medium">Deadline</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-slate-400">
                      <Loader2 className="h-5 w-5 animate-spin inline" />
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-slate-400">
                      No assignments match your filters. Click "Assign an exercise" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r, idx) => (
                    <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{r.title}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-700">
                          {SUBJECT_LABELS[r.subject] ?? r.subject}
                          {r.level ? ` · ${r.level}` : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3"><AccuracyRing value={r.averageAccuracy} /></td>
                      <td className="px-4 py-3 text-slate-600">{r.teacher_name ?? "Teacher Hai"}</td>
                      <td className="px-4 py-3 text-slate-700">{r.progressPct.toFixed(2)}%</td>
                      <td className="px-4 py-3 text-slate-700">{r.assigneesCount}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {formatAssignedTime(r.assigned_at)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {formatDeadline(r.deadline)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[r.derivedStatus]}`}
                        >
                          {STATUS_LABEL[r.derivedStatus]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setDetailRow(r)}
                            className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                            title="View progress"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="p-2 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <CreateAssignmentDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        students={students}
        teacherId={user.id}
        onCreated={() => {
          setCreateOpen(false);
          fetchAll();
        }}
      />

      <DetailSheet
        row={detailRow}
        students={students}
        onClose={() => setDetailRow(null)}
      />
    </div>
  );
};

function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

interface CreateProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  students: StudentProfile[];
  teacherId: string;
  onCreated: () => void;
}

function CreateAssignmentDialog({ open, onOpenChange, students, teacherId, onCreated }: CreateProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("english");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("platform_exercise");
  const [sourceRef, setSourceRef] = useState("");
  const [deadline, setDeadline] = useState("");
  const [targetClass, setTargetClass] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [studentQuery, setStudentQuery] = useState("");

  const toggleStudent = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const filteredStudents = useMemo(() => {
    const q = studentQuery.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => (s.full_name ?? "").toLowerCase().includes(q));
  }, [students, studentQuery]);

  const reset = () => {
    setTitle("");
    setSubject("english");
    setLevel("");
    setType("platform_exercise");
    setSourceRef("");
    setDeadline("");
    setTargetClass("");
    setSelected(new Set());
    setStudentQuery("");
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (selected.size === 0) {
      toast({ title: "Select at least one student", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const target_student_ids = Array.from(selected);

    const { data: created, error } = await supabase
      .from("assignments")
      .insert({
        title: title.trim(),
        subject,
        level: level || null,
        assignment_type: type,
        source_ref: sourceRef || null,
        teacher_id: teacherId,
        teacher_name: "Teacher Hai",
        target_class: targetClass || null,
        target_student_ids,
        deadline: deadline ? new Date(deadline).toISOString() : null,
      })
      .select("id")
      .single();

    if (error || !created) {
      setSubmitting(false);
      toast({ title: "Create failed", description: error?.message, variant: "destructive" });
      return;
    }

    // Seed an initial "assigned" submission row per student so progress = 0 displays meaningfully
    const rows = target_student_ids.map((sid) => ({
      assignment_id: created.id,
      student_id: sid,
      status: "assigned" as const,
    }));
    await supabase.from("student_submissions").insert(rows);

    setSubmitting(false);
    reset();
    toast({ title: "Assignment created", description: `${target_student_ids.length} student(s) notified.` });
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign a new exercise</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Subject first — drives lesson catalog below */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Subject</Label>
              <Select
                value={subject}
                onValueChange={(v) => {
                  setSubject(v);
                  // Reset lesson-dependent fields when subject changes
                  setTitle("");
                  setSourceRef("");
                  setLevel("");
                }}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(SUBJECT_LABELS).map(([v, label]) => (
                    <SelectItem key={v} value={v}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Level (optional)</Label>
              <Input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="A2, B1, HSK3..." />
            </div>
          </div>

          {/* Lesson picker — searchable dropdown seeded from the platform catalog */}
          <div>
            <Label>Exercise / Lesson name (chọn từ thư viện)</Label>
            <Select
              value={
                (ASSIGNMENT_LESSON_CATALOG[subject] ?? []).find((l) => l.title === title)?.id ?? ""
              }
              onValueChange={(lessonId) => {
                const lesson = (ASSIGNMENT_LESSON_CATALOG[subject] ?? []).find((l) => l.id === lessonId);
                if (lesson) {
                  setTitle(lesson.title);
                  setSourceRef(lesson.route);
                  if (lesson.level) setLevel(lesson.level);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an existing lesson..." />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {(ASSIGNMENT_LESSON_CATALOG[subject] ?? []).length === 0 ? (
                  <div className="px-3 py-2 text-sm text-slate-400">
                    No lessons cataloged for this subject.
                  </div>
                ) : (
                  (ASSIGNMENT_LESSON_CATALOG[subject] ?? []).map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Or type a custom test name"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Assignment type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform_exercise">Platform exercise</SelectItem>
                  <SelectItem value="custom_quiz">Custom quiz</SelectItem>
                  <SelectItem value="coding_project">Coding project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Source ref / link (auto-filled)</Label>
              <Input
                value={sourceRef}
                onChange={(e) => setSourceRef(e.target.value)}
                placeholder="/ielts/speaking/..."
              />
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Target class (optional)</Label>
              <Input value={targetClass} onChange={(e) => setTargetClass(e.target.value)} placeholder="PET Friday 7pm" />
            </div>
            <div>
              <Label>Deadline</Label>
              <Input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Students ({selected.size} selected)</Label>
            <Input
              value={studentQuery}
              onChange={(e) => setStudentQuery(e.target.value)}
              placeholder="Search by name..."
              className="mb-2"
            />
            <div className="max-h-52 overflow-y-auto rounded-md border border-slate-100 divide-y divide-slate-50">
              {filteredStudents.length === 0 ? (
                <p className="p-3 text-sm text-slate-400">No students found.</p>
              ) : filteredStudents.map((s) => (
                <label key={s.id} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.has(s.id)}
                    onChange={() => toggleStudent(s.id)}
                  />
                  <span>{s.full_name || s.id.slice(0, 8)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting} className="bg-slate-900 hover:bg-slate-800 text-white">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DetailSheet({
  row,
  students,
  onClose,
}: {
  row: AssignmentRow | null;
  students: StudentProfile[];
  onClose: () => void;
}) {
  const nameOf = (id: string) =>
    students.find((s) => s.id === id)?.full_name || id.slice(0, 8);

  return (
    <Sheet open={!!row} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{row?.title}</SheetTitle>
        </SheetHeader>
        {row && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Field label="Subject" value={SUBJECT_LABELS[row.subject] ?? row.subject} />
              <Field label="Level" value={row.level || "—"} />
              <Field label="Assigned" value={formatAssignedTime(row.assigned_at)} />
              <Field label="Deadline" value={formatDeadline(row.deadline)} />
              <Field label="Progress" value={`${row.progressPct.toFixed(2)}%`} />
              <Field label="Avg accuracy" value={row.averageAccuracy != null ? `${Math.round(row.averageAccuracy)}%` : "—"} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                Students ({row.assigneesCount})
              </p>
              <div className="rounded-lg border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Student</th>
                      <th className="px-3 py-2 text-left font-medium">Status</th>
                      <th className="px-3 py-2 text-left font-medium">Accuracy</th>
                      <th className="px-3 py-2 text-left font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.target_student_ids.map((sid) => {
                      const sub = row.submissions.find((x) => x.student_id === sid);
                      const status = sub?.status ?? "assigned";
                      return (
                        <tr key={sid} className="border-t border-slate-50">
                          <td className="px-3 py-2">{nameOf(sid)}</td>
                          <td className="px-3 py-2 text-slate-600">{status}</td>
                          <td className="px-3 py-2 text-slate-600">
                            {sub?.accuracy != null ? `${Math.round(Number(sub.accuracy))}%` : "—"}
                          </td>
                          <td className="px-3 py-2 text-slate-600">
                            {sub?.time_spent_seconds ? `${Math.round(sub.time_spent_seconds / 60)}m` : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-slate-900">{value}</p>
    </div>
  );
}

export default AdminAssignments;
