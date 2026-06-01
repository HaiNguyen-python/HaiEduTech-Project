// Admin Class Management - /admin/classes
// Create classes and manage student enrollment for group-based assignments.
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Loader2, Users, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { SUBJECT_LABELS } from "@/lib/assignmentMetrics";

interface ClassRow { id: string; class_name: string; subject_category: string; created_at: string; }
interface MemberRow { id: string; class_id: string; user_id: string; }
interface ProfileRow { id: string; full_name: string | null; }

const AdminClasses = () => {
  const { user, isTeacher, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [students, setStudents] = useState<ProfileRow[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRow | null>(null);

  // Form state for create dialog
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("english");

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: c }, { data: m }, { data: p }] = await Promise.all([
      supabase.from("classes").select("*").order("created_at", { ascending: false }),
      supabase.from("class_members").select("id, class_id, user_id"),
      supabase.from("profiles").select("id, full_name").order("full_name"),
    ]);
    setClasses((c as ClassRow[]) ?? []);
    setMembers((m as MemberRow[]) ?? []);
    // Dedupe by name
    const seen = new Set<string>();
    const dedup: ProfileRow[] = [];
    ((p as ProfileRow[]) ?? []).forEach((s) => {
      const k = (s.full_name ?? "").trim().toLowerCase();
      if (k && seen.has(k)) return;
      if (k) seen.add(k);
      dedup.push(s);
    });
    setStudents(dedup);
    setLoading(false);
  };

  useEffect(() => { if (isTeacher) fetchAll(); }, [isTeacher]);

  const countFor = (classId: string) => members.filter((m) => m.class_id === classId).length;

  const handleCreate = async () => {
    if (!name.trim()) { toast({ title: "Class name required", variant: "destructive" }); return; }
    const { error } = await supabase.from("classes").insert({
      class_name: name.trim(),
      subject_category: subject,
      created_by: user!.id,
    });
    if (error) { toast({ title: "Create failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Class created" });
    setName(""); setSubject("english"); setCreateOpen(false);
    fetchAll();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this class? Memberships will be removed.")) return;
    const { error } = await supabase.from("classes").delete().eq("id", id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Class deleted" });
    fetchAll();
  };

  if (roleLoading) {
    return <div className="min-h-screen grid place-items-center bg-white"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!isTeacher) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">Admin · LMS</p>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-1">Class Management</h1>
            <p className="text-sm text-slate-500 mt-1">Group your students into classes for batch assignments.</p>
          </div>
          <Button onClick={() => setCreateOpen(true)} className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-4 w-4" /> Create New Class
          </Button>
        </header>

        <div className="rounded-xl border border-slate-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <th className="px-4 py-3 font-medium">Class name</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">Students</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400"><Loader2 className="h-5 w-5 animate-spin inline" /></td></tr>
                ) : classes.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">No classes yet. Click "Create New Class" to start.</td></tr>
                ) : classes.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{c.class_name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-700">
                        {SUBJECT_LABELS[c.subject_category] ?? c.subject_category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5 text-slate-400" />{countFor(c.id)}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setEditingClass(c)} className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors" title="Edit members">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="p-2 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create New Class</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Class name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="AI Academy - Sat Morning" />
            </div>
            <div>
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(SUBJECT_LABELS).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} className="bg-slate-900 hover:bg-slate-800 text-white">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {editingClass && (
        <EditMembersDialog
          klass={editingClass}
          students={students}
          currentMemberIds={new Set(members.filter((m) => m.class_id === editingClass.id).map((m) => m.user_id))}
          onClose={() => setEditingClass(null)}
          onSaved={() => { setEditingClass(null); fetchAll(); }}
        />
      )}
    </div>
  );
};

function EditMembersDialog({
  klass, students, currentMemberIds, onClose, onSaved,
}: {
  klass: ClassRow;
  students: ProfileRow[];
  currentMemberIds: Set<string>;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [selected, setSelected] = useState<Set<string>>(new Set(currentMemberIds));
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => (s.full_name ?? "").toLowerCase().includes(q));
  }, [students, query]);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const handleSave = async () => {
    setSaving(true);
    const toAdd = Array.from(selected).filter((id) => !currentMemberIds.has(id));
    const toRemove = Array.from(currentMemberIds).filter((id) => !selected.has(id));

    if (toRemove.length > 0) {
      await supabase.from("class_members").delete()
        .eq("class_id", klass.id).in("user_id", toRemove);
    }
    if (toAdd.length > 0) {
      await supabase.from("class_members").insert(
        toAdd.map((uid) => ({ class_id: klass.id, user_id: uid }))
      );
    }
    setSaving(false);
    toast({ title: "Members updated", description: `${selected.size} student(s) in class.` });
    onSaved();
  };

  return (
    <Dialog open onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit members — {klass.class_name}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students by name..." />
          <p className="text-xs text-slate-500">{selected.size} selected</p>
          <div className="max-h-72 overflow-y-auto rounded-md border border-slate-100 divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <p className="p-3 text-sm text-slate-400">No students found.</p>
            ) : filtered.map((s) => (
              <label key={s.id} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} />
                <span>{s.full_name || s.id.slice(0, 8)}</span>
              </label>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving} className="bg-slate-900 hover:bg-slate-800 text-white">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save members"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AdminClasses;
