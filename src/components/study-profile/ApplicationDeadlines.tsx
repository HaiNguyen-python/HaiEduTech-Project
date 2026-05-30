/**
 * @file ApplicationDeadlines.tsx
 * @description Deadline tracker for university applications. CRUD UI backed by
 * the `application_deadlines` table. Color-coded by days remaining and supports
 * exporting selected items to an .ics (iCalendar) file.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Plus, Trash2, Pencil, AlertTriangle, Download, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Deadline {
  id: string;
  university: string;
  program: string | null;
  country: string | null;
  deadline_date: string;
  application_type: string | null;
  status: "planned" | "in_progress" | "submitted" | "accepted" | "rejected";
  priority: "low" | "normal" | "high";
  notes: string | null;
  link: string | null;
}

const EMPTY: Omit<Deadline, "id"> = {
  university: "", program: "", country: "", deadline_date: "",
  application_type: "Bachelor", status: "planned", priority: "normal", notes: "", link: "",
};

const STATUS_STYLE: Record<Deadline["status"], string> = {
  planned:     "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
  in_progress: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
  submitted:   "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  accepted:    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  rejected:    "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
};

function daysUntil(iso: string): number {
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

function urgencyColor(days: number, status: Deadline["status"]) {
  if (status === "submitted" || status === "accepted") return "border-l-emerald-500";
  if (status === "rejected") return "border-l-slate-500";
  if (days < 0)  return "border-l-rose-600";
  if (days <= 7) return "border-l-rose-500";
  if (days <= 30) return "border-l-amber-500";
  return "border-l-sky-500";
}

function toIcs(items: Deadline[]): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (iso: string) => {
    const d = new Date(iso);
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  };
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//HaiEduTech//Study Abroad//EN",
    ...items.flatMap(it => [
      "BEGIN:VEVENT",
      `UID:${it.id}@haiedutech`,
      `DTSTART;VALUE=DATE:${fmt(it.deadline_date)}`,
      `SUMMARY:${(it.application_type || "Application")} — ${it.university}`,
      `DESCRIPTION:${(it.program || "")}${it.link ? `\\n${it.link}` : ""}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export default function ApplicationDeadlines({ userId }: { userId: string | null }) {
  const { t } = useLanguage();
  const [items, setItems] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Deadline | null>(null);
  const [form, setForm] = useState({ ...EMPTY });

  const load = useCallback(async () => {
    if (!userId) { setItems([]); setLoading(false); return; }
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("application_deadlines")
      .select("*")
      .eq("user_id", userId)
      .order("deadline_date", { ascending: true });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setItems((data ?? []) as Deadline[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY }); setOpen(true); };
  const openEdit = (it: Deadline) => {
    setEditing(it);
    setForm({
      university: it.university, program: it.program || "", country: it.country || "",
      deadline_date: it.deadline_date, application_type: it.application_type || "Bachelor",
      status: it.status, priority: it.priority, notes: it.notes || "", link: it.link || "",
    });
    setOpen(true);
  };

  const save = async () => {
    if (!userId) { toast({ title: t("Đăng nhập trước", "Sign in first") }); return; }
    if (!form.university.trim() || !form.deadline_date) {
      toast({ title: t("Thiếu thông tin", "Missing fields"), variant: "destructive" });
      return;
    }
    const payload = { ...form, user_id: userId };
    if (editing) {
      const { error } = await (supabase as any).from("application_deadlines").update(payload).eq("id", editing.id);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const { error } = await (supabase as any).from("application_deadlines").insert(payload);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setOpen(false);
    await load();
    toast({ title: t("Đã lưu", "Saved") });
  };

  const remove = async (id: string) => {
    if (!confirm(t("Xoá deadline này?", "Delete this deadline?"))) return;
    const { error } = await (supabase as any).from("application_deadlines").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    setItems(prev => prev.filter(x => x.id !== id));
  };

  const toggleSubmitted = async (it: Deadline) => {
    const next: Deadline["status"] = it.status === "submitted" ? "planned" : "submitted";
    await (supabase as any).from("application_deadlines").update({ status: next }).eq("id", it.id);
    setItems(prev => prev.map(x => x.id === it.id ? { ...x, status: next } : x));
  };

  const exportIcs = () => {
    if (!items.length) return;
    const blob = new Blob([toIcs(items)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "haiedu-application-deadlines.ics"; a.click();
    URL.revokeObjectURL(url);
  };

  const upcoming = items.filter(i => daysUntil(i.deadline_date) >= 0 && i.status !== "submitted" && i.status !== "accepted");
  const urgent = upcoming.filter(i => daysUntil(i.deadline_date) <= 7);

  if (!userId) {
    return (
      <Card><CardContent className="p-8 text-center text-muted-foreground">
        {t("Đăng nhập để quản lý deadline nộp hồ sơ.", "Sign in to manage application deadlines.")}
      </CardContent></Card>
    );
  }

  return (
    <div className="space-y-4">
      {urgent.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
          <div>
            <div className="font-semibold text-rose-700 dark:text-rose-300">
              {urgent.length} {t("deadline trong 7 ngày tới!", "deadlines in the next 7 days!")}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {urgent.slice(0, 3).map(u => `${u.university} (${daysUntil(u.deadline_date)}d)`).join(" • ")}
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-sm text-muted-foreground">
          {items.length} {t("deadline • Sắp tới:", "deadlines • Upcoming:")} <b className="text-foreground">{upcoming.length}</b>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportIcs} disabled={!items.length} className="gap-1.5">
            <Download className="w-4 h-4" /> .ics
          </Button>
          <Button size="sm" onClick={openNew} className="gap-1.5"><Plus className="w-4 h-4" />{t("Thêm deadline", "Add deadline")}</Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">{t("Đang tải...", "Loading...")}</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="p-8 text-center">
          <CalendarClock className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-3">
            {t("Chưa có deadline nào. Hãy thêm trường đầu tiên!", "No deadlines yet. Add your first university!")}
          </p>
          <Button onClick={openNew} className="gap-1.5"><Plus className="w-4 h-4" />{t("Thêm ngay", "Add now")}</Button>
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {items.map(it => {
            const d = daysUntil(it.deadline_date);
            return (
              <motion.div key={it.id} layout
                className={`rounded-lg border bg-card border-l-4 ${urgencyColor(d, it.status)} p-3 flex items-start gap-3`}>
                <button onClick={() => toggleSubmitted(it)} className="mt-0.5 shrink-0"
                  aria-label={t("Đánh dấu hoàn tất", "Toggle submitted")}>
                  {it.status === "submitted" || it.status === "accepted"
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    : <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{it.university}</span>
                    {it.country && <Badge variant="outline" className="text-xs">{it.country}</Badge>}
                    <Badge className={`text-xs border ${STATUS_STYLE[it.status]}`}>{it.status}</Badge>
                    {it.priority === "high" && <Badge variant="destructive" className="text-xs">⚡ {t("Ưu tiên", "Priority")}</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {it.program} {it.application_type && `· ${it.application_type}`}
                  </div>
                  <div className="text-xs mt-1 flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {new Date(it.deadline_date).toLocaleDateString()}
                      <span className={d < 0 ? "text-rose-600" : d <= 7 ? "text-rose-500" : d <= 30 ? "text-amber-500" : "text-sky-500"}>
                        ({d < 0 ? `${Math.abs(d)}d ${t("trễ", "overdue")}` : `D-${d}`})
                      </span>
                    </span>
                    {it.link && (
                      <a href={it.link} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-0.5">
                        <ExternalLink className="w-3 h-3" /> {t("Trang web", "Site")}
                      </a>
                    )}
                  </div>
                  {it.notes && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{it.notes}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(it)} className="h-8 w-8"><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(it.id)} className="h-8 w-8 text-rose-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? t("Sửa deadline", "Edit deadline") : t("Thêm deadline", "Add deadline")}</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Input placeholder={t("Trường đại học *", "University *")} value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} />
            <Input placeholder={t("Chương trình (vd: MSc Data Science)", "Program (e.g. MSc Data Science)")} value={form.program} onChange={e => setForm({ ...form, program: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder={t("Quốc gia", "Country")} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              <Input type="date" value={form.deadline_date} onChange={e => setForm({ ...form, deadline_date: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={form.application_type} onValueChange={v => setForm({ ...form, application_type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Bachelor", "Master", "PhD", "Exchange", "Scholarship", "Other"].map(o =>
                    <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as Deadline["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.priority} onValueChange={v => setForm({ ...form, priority: v as Deadline["priority"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High ⚡</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input placeholder={t("Link trang nộp hồ sơ", "Application page URL")} value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
            <Textarea placeholder={t("Ghi chú (yêu cầu hồ sơ, GPA tối thiểu...)", "Notes (requirements, min GPA...)")} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>{t("Hủy", "Cancel")}</Button>
            <Button onClick={save}>{t("Lưu", "Save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
