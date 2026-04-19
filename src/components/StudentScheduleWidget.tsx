import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, Bell, BellOff, Video, MapPin, Users } from "lucide-react";

// Subject palette must mirror the admin manager
const SUBJECT_DOTS: Record<string, { dot: string; label: string }> = {
  english: { dot: "bg-blue-500", label: "English" },
  chinese: { dot: "bg-rose-500", label: "Chinese" },
  finnish: { dot: "bg-emerald-500", label: "Finnish" },
  programming: { dot: "bg-purple-500", label: "Programming" },
  ielts: { dot: "bg-indigo-500", label: "IELTS" },
  toeic: { dot: "bg-cyan-500", label: "TOEIC" },
  pte: { dot: "bg-amber-500", label: "PTE" },
  other: { dot: "bg-slate-500", label: "Other" },
};

type ClassSchedule = {
  id: string;
  class_name: string;
  subject: string;
  start_time: string;
  end_time: string;
  platform_link: string | null;
  location: string | null;
  max_students: number;
  description: string | null;
};

const fmtDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

export default function StudentScheduleWidget({ userId }: { userId?: string | null }) {
  const { toast } = useToast();
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [reminders, setReminders] = useState<Set<string>>(new Set());
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Refresh "now" each minute so the Join button activates on schedule
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Load upcoming classes (next 14 days)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const since = new Date();
      since.setHours(0, 0, 0, 0);
      const until = new Date();
      until.setDate(until.getDate() + 14);
      const { data } = await supabase
        .from("class_schedules")
        .select("id,class_name,subject,start_time,end_time,platform_link,location,max_students,description")
        .gte("end_time", since.toISOString())
        .lte("start_time", until.toISOString())
        .order("start_time", { ascending: true });
      setClasses((data ?? []) as ClassSchedule[]);
      setLoading(false);
    };
    load();
    const ch = supabase
      .channel("student_schedule_view")
      .on("postgres_changes", { event: "*", schema: "public", table: "class_schedules" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  // Load this user's reminders
  useEffect(() => {
    if (!userId) { setReminders(new Set()); return; }
    supabase
      .from("class_reminders")
      .select("class_id")
      .eq("user_id", userId)
      .then(({ data }) => setReminders(new Set((data ?? []).map((r: any) => r.class_id as string))));
  }, [userId]);

  // Schedule browser notifications for reminders 5 minutes before start
  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const timers: number[] = [];
    classes.forEach((c) => {
      if (!reminders.has(c.id)) return;
      const fireAt = new Date(c.start_time).getTime() - 5 * 60_000;
      const delay = fireAt - Date.now();
      if (delay > 0 && delay < 24 * 3600_000) {
        const id = window.setTimeout(() => {
          if (Notification.permission === "granted") {
            new Notification("Class starting soon", {
              body: `${c.class_name} starts in 5 minutes.`,
              icon: "/favicon.ico",
            });
          }
        }, delay);
        timers.push(id);
      }
    });
    return () => { timers.forEach(clearTimeout); };
  }, [classes, reminders]);

  const toggleReminder = async (cls: ClassSchedule) => {
    if (!userId) {
      toast({ title: "Please sign in to set reminders", variant: "destructive" });
      return;
    }
    if (reminders.has(cls.id)) {
      await supabase.from("class_reminders").delete().eq("user_id", userId).eq("class_id", cls.id);
      const next = new Set(reminders); next.delete(cls.id); setReminders(next);
      toast({ title: "Reminder removed" });
    } else {
      // Ask permission for browser notifications
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }
      await supabase.from("class_reminders").insert({ user_id: userId, class_id: cls.id });
      const next = new Set(reminders); next.add(cls.id); setReminders(next);
      toast({ title: "Reminder set", description: "We'll notify you 5 minutes before the class." });
    }
  };

  const upcoming = useMemo(() => classes.filter((c) => new Date(c.end_time) >= now).slice(0, 8), [classes, now]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">Loading schedule…</CardContent>
      </Card>
    );
  }

  if (upcoming.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary" /> Class Schedule</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No upcoming classes scheduled. Check back soon!</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" /> Class Schedule
          <Badge variant="secondary" className="ml-2">{upcoming.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcoming.map((c) => {
          const meta = SUBJECT_DOTS[c.subject] ?? SUBJECT_DOTS.other;
          const start = new Date(c.start_time);
          const end = new Date(c.end_time);
          const minutesToStart = Math.round((start.getTime() - now.getTime()) / 60_000);
          const isJoinable = minutesToStart <= 5 && now < end;
          const reminded = reminders.has(c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-3 flex flex-wrap items-center gap-3"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${meta.dot}`} />
              <div className="flex-1 min-w-[200px]">
                <div className="font-semibold">{c.class_name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {fmtDateLong(c.start_time)}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {fmtTime(c.start_time)}–{fmtTime(c.end_time)}</span>
                  {c.location && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.location}</span>}
                  <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> Max {c.max_students}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">{meta.label}</Badge>
              <Button
                size="sm"
                variant={reminded ? "secondary" : "outline"}
                onClick={() => toggleReminder(c)}
                className="gap-1.5"
              >
                {reminded ? <BellOff className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
                {reminded ? "Reminding" : "Remind me"}
              </Button>
              <Button
                size="sm"
                disabled={!isJoinable || !c.platform_link}
                onClick={() => c.platform_link && window.open(c.platform_link, "_blank", "noopener")}
                className="gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                {isJoinable ? "Join Now" : minutesToStart > 0 ? `In ${minutesToStart}m` : "Ended"}
              </Button>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
