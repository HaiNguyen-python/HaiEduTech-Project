import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar as CalendarIcon, Clock, Users, Link as LinkIcon, Plus, List, LayoutGrid,
  Edit, Trash2, AlertTriangle, ChevronLeft, ChevronRight, MapPin, Video,
} from "lucide-react";

// ===== Types & subject palette =====
type ClassSchedule = {
  id: string;
  class_name: string;
  subject: string;
  description: string | null;
  start_time: string;
  end_time: string;
  recurring: string;
  recurring_days: number[] | null;
  platform_link: string | null;
  location: string | null;
  max_students: number;
  status: string;
  color: string | null;
};

const SUBJECT_OPTIONS = [
  { value: "english", label: "English", chip: "bg-blue-500/15 text-blue-700 border-blue-500/30 dark:text-blue-300", dot: "bg-blue-500" },
  { value: "chinese", label: "Chinese", chip: "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-300", dot: "bg-rose-500" },
  { value: "finnish", label: "Finnish", chip: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300", dot: "bg-emerald-500" },
  { value: "programming", label: "Programming", chip: "bg-purple-500/15 text-purple-700 border-purple-500/30 dark:text-purple-300", dot: "bg-purple-500" },
  { value: "ielts", label: "IELTS", chip: "bg-indigo-500/15 text-indigo-700 border-indigo-500/30 dark:text-indigo-300", dot: "bg-indigo-500" },
  { value: "toeic", label: "TOEIC", chip: "bg-cyan-500/15 text-cyan-700 border-cyan-500/30 dark:text-cyan-300", dot: "bg-cyan-500" },
  { value: "pte", label: "PTE", chip: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300", dot: "bg-amber-500" },
  { value: "other", label: "Other", chip: "bg-slate-500/15 text-slate-700 border-slate-500/30 dark:text-slate-300", dot: "bg-slate-500" },
];

const subjectMeta = (s: string) => SUBJECT_OPTIONS.find((o) => o.value === s) ?? SUBJECT_OPTIONS[7];

// ===== Helpers for week view =====
const startOfWeek = (d: Date) => {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Monday-first
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - day);
  return date;
};

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const fmtDate = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

const overlaps = (a: ClassSchedule, b: ClassSchedule) =>
  a.id !== b.id &&
  new Date(a.start_time) < new Date(b.end_time) &&
  new Date(b.start_time) < new Date(a.end_time);

// Empty form state
const emptyForm = {
  class_name: "",
  subject: "english",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  start_hm: "18:00",
  end_hm: "19:30",
  recurring: "none",
  recurring_days: [] as number[],
  platform_link: "",
  location: "",
  max_students: 20,
};

// ===== Main component =====
export default function ClassScheduleManager() {
  const { user, isTeacher } = useUserRole();
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"week" | "list">("week");
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date()));
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [openSheet, setOpenSheet] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Fetch all schedules + realtime sync
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("class_schedules")
      .select("*")
      .order("start_time", { ascending: true });
    if (error) {
      toast({ title: "Failed to load schedules", description: error.message, variant: "destructive" });
    } else {
      setSchedules(data as ClassSchedule[]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchSchedules();
    // Realtime subscription so multiple admins stay in sync
    const ch = supabase
      .channel("class_schedules_admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "class_schedules" }, () => fetchSchedules())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [fetchSchedules]);

  // ===== Conflict detection =====
  const conflictMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (let i = 0; i < schedules.length; i++) {
      for (let j = i + 1; j < schedules.length; j++) {
        if (overlaps(schedules[i], schedules[j])) {
          map[schedules[i].id] = true;
          map[schedules[j].id] = true;
        }
      }
    }
    return map;
  }, [schedules]);

  // ===== Filtered list =====
  const filtered = useMemo(() => {
    return schedules.filter((s) => {
      if (filterSubject !== "all" && s.subject !== filterSubject) return false;
      if (filterStatus !== "all" && s.status !== filterStatus) return false;
      return true;
    });
  }, [schedules, filterSubject, filterStatus]);

  // ===== Submit (create / update) =====
  const handleSubmit = async () => {
    if (!user) return;
    if (!form.class_name.trim()) {
      toast({ title: "Class name is required", variant: "destructive" });
      return;
    }
    const start = new Date(`${form.date}T${form.start_hm}:00`).toISOString();
    const end = new Date(`${form.date}T${form.end_hm}:00`).toISOString();
    if (new Date(end) <= new Date(start)) {
      toast({ title: "End time must be after start time", variant: "destructive" });
      return;
    }
    const payload = {
      class_name: form.class_name.trim(),
      subject: form.subject,
      description: form.description.trim() || null,
      start_time: start,
      end_time: end,
      recurring: form.recurring,
      recurring_days: form.recurring_days,
      platform_link: form.platform_link.trim() || null,
      location: form.location.trim() || null,
      max_students: Number(form.max_students) || 20,
      color: subjectMeta(form.subject).dot,
      status: "upcoming",
      created_by: user.id,
    };
    if (editingId) {
      const { error } = await supabase.from("class_schedules").update(payload).eq("id", editingId);
      if (error) return toast({ title: "Update failed", description: error.message, variant: "destructive" });
      toast({ title: "Class updated" });
    } else {
      const { error } = await supabase.from("class_schedules").insert(payload);
      if (error) return toast({ title: "Create failed", description: error.message, variant: "destructive" });
      toast({ title: "Class created" });
    }
    setOpenSheet(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (s: ClassSchedule) => {
    const d = new Date(s.start_time);
    const e = new Date(s.end_time);
    setEditingId(s.id);
    setForm({
      class_name: s.class_name,
      subject: s.subject,
      description: s.description ?? "",
      date: d.toISOString().slice(0, 10),
      start_hm: d.toTimeString().slice(0, 5),
      end_hm: e.toTimeString().slice(0, 5),
      recurring: s.recurring,
      recurring_days: s.recurring_days ?? [],
      platform_link: s.platform_link ?? "",
      location: s.location ?? "",
      max_students: s.max_students,
    });
    setOpenSheet(true);
  };

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpenSheet(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("class_schedules").delete().eq("id", deleteId);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else toast({ title: "Class deleted" });
    setDeleteId(null);
  };

  // ===== Drag & Drop reschedule =====
  const handleDrop = async (targetDate: Date) => {
    if (!draggingId) return;
    const cls = schedules.find((s) => s.id === draggingId);
    if (!cls) return;
    const start = new Date(cls.start_time);
    const end = new Date(cls.end_time);
    const duration = end.getTime() - start.getTime();
    const newStart = new Date(targetDate);
    newStart.setHours(start.getHours(), start.getMinutes(), 0, 0);
    const newEnd = new Date(newStart.getTime() + duration);
    const { error } = await supabase
      .from("class_schedules")
      .update({ start_time: newStart.toISOString(), end_time: newEnd.toISOString() })
      .eq("id", draggingId);
    if (error) toast({ title: "Reschedule failed", description: error.message, variant: "destructive" });
    else toast({ title: "Class rescheduled" });
    setDraggingId(null);
  };

  // ===== Derived: weekly grid =====
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const classesForDay = (d: Date) =>
    filtered
      .filter((c) => sameDay(new Date(c.start_time), d))
      .sort((a, b) => +new Date(a.start_time) - +new Date(b.start_time));

  if (!isTeacher) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          You need teacher or admin role to manage schedules.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <Button size="sm" variant={view === "week" ? "default" : "ghost"} onClick={() => setView("week")} className="gap-1.5">
              <LayoutGrid className="w-4 h-4" /> Week
            </Button>
            <Button size="sm" variant={view === "list" ? "default" : "ghost"} onClick={() => setView("list")} className="gap-1.5">
              <List className="w-4 h-4" /> List
            </Button>
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {SUBJECT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={startCreate} className="gap-1.5"><Plus className="w-4 h-4" /> Add Class</Button>
      </div>

      {/* ===== Subject legend ===== */}
      <div className="flex flex-wrap gap-2 text-xs">
        {SUBJECT_OPTIONS.map((o) => (
          <span key={o.value} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border ${o.chip}`}>
            <span className={`w-2 h-2 rounded-full ${o.dot}`} /> {o.label}
          </span>
        ))}
      </div>

      {/* ===== Week view ===== */}
      {view === "week" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-primary" />
              {fmtDate(weekStart)} — {fmtDate(addDays(weekStart, 6))}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" onClick={() => setWeekStart(addDays(weekStart, -7))}><ChevronLeft className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => setWeekStart(startOfWeek(new Date()))}>Today</Button>
              <Button size="sm" variant="ghost" onClick={() => setWeekStart(addDays(weekStart, 7))}><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[900px] grid grid-cols-7 gap-2">
              {weekDays.map((d) => {
                const today = sameDay(d, new Date());
                const items = classesForDay(d);
                return (
                  <div
                    key={d.toISOString()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(d)}
                    className={`rounded-lg border ${today ? "border-primary/60 bg-primary/5" : "border-border bg-card"} min-h-[260px] p-2 flex flex-col gap-2`}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {d.toLocaleDateString(undefined, { weekday: "short" })}
                      </div>
                      <div className={`text-sm font-bold ${today ? "text-primary" : ""}`}>{d.getDate()}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <AnimatePresence>
                        {items.map((c) => {
                          const meta = subjectMeta(c.subject);
                          const isConflict = conflictMap[c.id];
                          return (
                            <motion.div
                              key={c.id}
                              draggable
                              onDragStart={() => setDraggingId(c.id)}
                              onDragEnd={() => setDraggingId(null)}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => startEdit(c)}
                              className={`group cursor-pointer rounded-md border-l-4 px-2 py-1.5 text-xs shadow-sm bg-background hover:shadow-md transition-all ${
                                isConflict ? "border-red-500 ring-1 ring-red-500/40 bg-red-500/5" : ""
                              }`}
                              style={!isConflict ? { borderLeftColor: `hsl(var(--primary))` } : undefined}
                            >
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                                <span className="font-semibold truncate">{c.class_name}</span>
                                {isConflict && <AlertTriangle className="w-3 h-3 text-red-500 ml-auto" />}
                              </div>
                              <div className="text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {fmtTime(c.start_time)}–{fmtTime(c.end_time)}
                              </div>
                              {c.location && (
                                <div className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3" /> <span className="truncate">{c.location}</span>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===== List view ===== */}
      {view === "list" && (
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-muted-foreground">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No classes yet. Click "Add Class" to create one.</div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map((c) => {
                  const meta = subjectMeta(c.subject);
                  const isConflict = conflictMap[c.id];
                  return (
                    <div key={c.id} className={`p-4 flex flex-wrap items-center gap-3 hover:bg-muted/40 transition-colors ${isConflict ? "bg-red-500/5" : ""}`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
                      <div className="flex-1 min-w-[240px]">
                        <div className="font-semibold flex items-center gap-2">
                          {c.class_name}
                          {isConflict && (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="w-3 h-3" /> Conflict
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {new Date(c.start_time).toLocaleDateString()}</span>
                          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {fmtTime(c.start_time)}–{fmtTime(c.end_time)}</span>
                          <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> Max {c.max_students}</span>
                          {c.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</span>}
                          {c.platform_link && (
                            <a href={c.platform_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                              <Video className="w-3 h-3" /> Link
                            </a>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className={meta.chip}>{meta.label}</Badge>
                      <Badge variant="secondary">{c.status}</Badge>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" onClick={() => startEdit(c)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => setDeleteId(c.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ===== Quick Add / Edit drawer ===== */}
      <Sheet open={openSheet} onOpenChange={(o) => { setOpenSheet(o); if (!o) { setEditingId(null); setForm(emptyForm); } }}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? "Edit Class" : "Add New Class"}</SheetTitle>
            <SheetDescription>Fill in the details. Conflicts will be flagged automatically.</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label>Class Name</Label>
              <Input value={form.class_name} onChange={(e) => setForm({ ...form, class_name: e.target.value })} placeholder="e.g. PTE Intensive 79+" />
            </div>
            <div className="space-y-1.5">
              <Label>Subject</Label>
              <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SUBJECT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5 col-span-1">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label>Start</Label>
                <Input type="time" value={form.start_hm} onChange={(e) => setForm({ ...form, start_hm: e.target.value })} />
              </div>
              <div className="space-y-1.5 col-span-1">
                <Label>End</Label>
                <Input type="time" value={form.end_hm} onChange={(e) => setForm({ ...form, end_hm: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Recurrence</Label>
              <Select value={form.recurring} onValueChange={(v) => setForm({ ...form, recurring: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">One-off</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
              {form.recurring === "weekly" && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
                    const active = form.recurring_days.includes(i);
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          const next = active ? form.recurring_days.filter((x) => x !== i) : [...form.recurring_days, i];
                          setForm({ ...form, recurring_days: next });
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs border transition-colors ${
                          active ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-muted"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Platform Link (Google Meet / Zoom / URL)</Label>
              <Input value={form.platform_link} onChange={(e) => setForm({ ...form, platform_link: e.target.value })} placeholder="https://meet.google.com/..." />
            </div>
            <div className="space-y-1.5">
              <Label>Location / Room</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Online or Room A2" />
            </div>
            <div className="space-y-1.5">
              <Label>Max Students</Label>
              <Input type="number" min={1} value={form.max_students} onChange={(e) => setForm({ ...form, max_students: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short notes for students…" />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} className="flex-1">{editingId ? "Save changes" : "Create class"}</Button>
              <Button variant="outline" onClick={() => setOpenSheet(false)}>Cancel</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ===== Delete confirmation ===== */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this class?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
