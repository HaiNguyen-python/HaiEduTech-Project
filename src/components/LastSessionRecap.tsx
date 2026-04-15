import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PenTool, StickyNote, GraduationCap, Clock, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Activity {
  activity_type: string;
  activity_id: string | null;
  score: number | null;
  max_score: number | null;
  domain: string | null;
  created_at: string;
  metadata: any;
}

interface WritingAttempt {
  prompt: string;
  overall_score: number | null;
  task_type: number;
  word_count: number;
  created_at: string;
}

interface Notebook {
  title: string;
  subject: string;
  content: string;
  updated_at: string;
}

interface LectureProgress {
  lecture_id: string;
  completed_at: string | null;
  source: string;
}

const ACTIVITY_LABELS: Record<string, string> = {
  ielts_lecture_quiz: "IELTS Quiz",
  toeic_lecture_quiz: "TOEIC Quiz",
  cambridge_lecture_quiz: "Cambridge Quiz",
  language_quiz: "Language Quiz",
  python_challenge: "Python Challenge",
  vocab_mastery: "Vocab Mastery",
  writing_practice: "Writing Practice",
  speaking_practice: "Speaking Practice",
};

const DOMAIN_COLORS: Record<string, string> = {
  english: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  chinese: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  programming: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  vietnamese: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

function truncate(str: string, len: number) {
  if (!str) return "";
  const clean = str.replace(/<[^>]*>/g, "");
  return clean.length > len ? clean.slice(0, len) + "…" : clean;
}

export default function LastSessionRecap() {
  const [open, setOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [writings, setWritings] = useState<WritingAttempt[]>([]);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [lectures, setLectures] = useState<LectureProgress[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          sessionStorage.removeItem("recap_shown");
          return;
        }
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
          if (sessionStorage.getItem("recap_shown")) return;
          sessionStorage.setItem("recap_shown", "true");
          setLoading(true);

          const uid = session.user.id;

          const [actRes, writRes, noteRes, ieltsRes, toeicRes] = await Promise.all([
            supabase
              .from("student_activity_log")
              .select("activity_type, activity_id, score, max_score, domain, created_at, metadata")
              .eq("user_id", uid)
              .order("created_at", { ascending: false })
              .limit(10),
            supabase
              .from("writing_attempts")
              .select("prompt, overall_score, task_type, word_count, created_at")
              .eq("user_id", uid)
              .order("created_at", { ascending: false })
              .limit(3),
            supabase
              .from("student_notebooks")
              .select("title, subject, content, updated_at")
              .eq("user_id", uid)
              .order("updated_at", { ascending: false })
              .limit(3),
            supabase
              .from("ielts_lecture_progress")
              .select("lecture_id, completed_at")
              .eq("user_id", uid)
              .eq("is_completed", true)
              .order("completed_at", { ascending: false })
              .limit(5),
            supabase
              .from("toeic_lecture_progress")
              .select("lecture_id, completed_at")
              .eq("user_id", uid)
              .eq("is_completed", true)
              .order("completed_at", { ascending: false })
              .limit(5),
          ]);

          setActivities((actRes.data as Activity[]) || []);
          setWritings((writRes.data as WritingAttempt[]) || []);
          setNotebooks((noteRes.data as Notebook[]) || []);

          const lects: LectureProgress[] = [
            ...((ieltsRes.data || []).map((l: any) => ({ ...l, source: "IELTS" }))),
            ...((toeicRes.data || []).map((l: any) => ({ ...l, source: "TOEIC" }))),
          ].sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime()).slice(0, 5);
          setLectures(lects);

          setLoading(false);

          const hasData = (actRes.data?.length || 0) + (writRes.data?.length || 0) + (noteRes.data?.length || 0) + lects.length > 0;
          if (hasData) setOpen(true);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const totalItems = activities.length + writings.length + notebooks.length + lectures.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-primary" />
            Ôn lại buổi học trước
          </DialogTitle>
          <DialogDescription>
            Tổng kết {totalItems} hoạt động gần nhất của bạn. Hãy ôn lại trước khi bắt đầu bài mới!
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-6 h-6 border-3 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <Tabs defaultValue="activities" className="mt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activities" className="text-xs gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Bài tập
              </TabsTrigger>
              <TabsTrigger value="lectures" className="text-xs gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> Bài giảng
              </TabsTrigger>
              <TabsTrigger value="writing" className="text-xs gap-1">
                <PenTool className="w-3.5 h-3.5" /> Viết
              </TabsTrigger>
              <TabsTrigger value="notes" className="text-xs gap-1">
                <StickyNote className="w-3.5 h-3.5" /> Ghi chú
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-2 mt-3">
              {activities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa có hoạt động nào</p>
              ) : activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {ACTIVITY_LABELS[a.activity_type] || a.activity_type}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {a.domain && (
                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${DOMAIN_COLORS[a.domain] || ""}`}>
                          {a.domain}
                        </Badge>
                      )}
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {timeAgo(a.created_at)}
                      </span>
                    </div>
                  </div>
                  {a.score != null && (
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {a.score}/{a.max_score || "?"}
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="lectures" className="space-y-2 mt-3">
              {lectures.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa hoàn thành bài giảng nào</p>
              ) : lectures.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{l.lecture_id}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{l.source}</Badge>
                      {l.completed_at && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {timeAgo(l.completed_at)}
                        </span>
                      )}
                    </div>
                  </div>
                  <GraduationCap className="w-4 h-4 text-green-500" />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="writing" className="space-y-2 mt-3">
              {writings.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa có bài viết nào</p>
              ) : writings.map((w, i) => (
                <div key={i} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px]">Task {w.task_type}</Badge>
                    {w.overall_score != null && (
                      <span className="text-sm font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" /> {w.overall_score}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-1.5 text-muted-foreground">{truncate(w.prompt, 80)}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                    <span>{w.word_count} từ</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(w.created_at)}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="notes" className="space-y-2 mt-3">
              {notebooks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa có ghi chú nào</p>
              ) : notebooks.map((n, i) => (
                <div key={i} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{n.title || "Không tiêu đề"}</p>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{n.subject}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{truncate(n.content, 100)}</p>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> {timeAgo(n.updated_at)}
                  </span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={() => setOpen(false)} className="gap-2">
            🚀 Bắt đầu học!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
