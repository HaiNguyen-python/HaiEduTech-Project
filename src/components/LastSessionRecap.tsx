import { useState, useEffect, useCallback } from "react";
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
import { BookOpen, PenTool, StickyNote, GraduationCap, Clock, Star, Trophy, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  vocab_mastered: "Vocab Mastered",
  vocab_mastered_group: "Từ vựng đã thuộc",
  speaking_coach_group: "Speaking Coach",
  writing_practice: "Writing Practice",

  speaking_practice: "Speaking Practice",
  conv_chinese: "Hội thoại Tiếng Trung",
  conv_chinese_exercise: "Bài tập Tiếng Trung",
  conv_english: "Hội thoại Tiếng Anh",
  conv_english_exercise: "Bài tập Tiếng Anh",
  thpt_exam: "Thi thử THPT",
  ielts_writing: "IELTS Writing",
  ielts_speaking: "IELTS Speaking",
  ielts_vocab: "IELTS Vocab",
  hsk_vocab: "HSK Vocab",
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

// Convert lecture slug ids like "ielts-band-7-task-1" → "IELTS Band 7 Task 1"
function prettyLectureId(id: string) {
  if (!id) return "(unknown)";
  return id
    .replace(/[-_]+/g, " ")
    .replace(/\b([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/\bIelts\b/g, "IELTS")
    .replace(/\bToeic\b/g, "TOEIC")
    .replace(/\bHsk\b/g, "HSK")
    .replace(/\bYki\b/g, "YKI");
}

// Encouragement quotes — international audience, English-only.
const ENCOURAGEMENTS: string[] = [
  "Every expert was once a beginner. Take your first step today!",
  "Small daily progress compounds into life-changing results.",
  "The journey of a thousand miles begins with a single lesson.",
  "Learn smart. Lead the digital era. Your future starts now.",
  "15 minutes a day will surprise you in a year. Let's go!",
  "Mr. Hai believes in you. Open your first lesson and shine. ✨",
  "Mistakes are proof you're learning. Embrace them, then grow.",
  "Consistency beats intensity. Show up — that's already a win.",
  "One lecture today equals one band higher tomorrow.",
  "You don't have to be great to start, but you have to start to be great.",
  "Dream big. Study smart. The world is waiting for your story.",
  "Knowledge is the passport to your future. Pack it well today.",
];

const EMPTY_HINTS: Record<string, { titleEn: string; href: string; cta: string }> = {
  activities: { titleEn: "No exercises yet", href: "/ielts", cta: "Start an exercise" },
  lectures: { titleEn: "No lectures completed yet", href: "/ielts/lectures", cta: "Open a lecture" },
  writing: { titleEn: "No writing submissions yet", href: "/ielts/writing", cta: "Write something" },
  notes: { titleEn: "No notes yet", href: "/dashboard", cta: "Open Notebook" },
};

function pickEncouragement(seed = 0) {
  // Rotate by day so each session feels fresh but stable within a tab switch
  const day = Math.floor(Date.now() / 86_400_000);
  return ENCOURAGEMENTS[(day + seed) % ENCOURAGEMENTS.length];
}

function EncouragementEmpty({ tab, onClose }: { tab: keyof typeof EMPTY_HINTS; onClose: () => void }) {
  const hint = EMPTY_HINTS[tab];
  const quote = pickEncouragement(Object.keys(EMPTY_HINTS).indexOf(tab));
  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 p-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-white shadow-md">
        <Sparkles className="h-6 w-6" />
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{hint.titleEn}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground italic">
        "{quote}"
      </p>
      <Button asChild size="sm" className="mt-4 gap-1.5" onClick={onClose}>
        <Link to={hint.href}>
          <Rocket className="h-3.5 w-3.5" />
          {hint.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
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
              .limit(50),
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

          const HIDDEN_TYPES = new Set([
            "session_heartbeat",
            "daily_login",
            "page_view",
            "page_visit",
          ]);
          const rawVisible = ((actRes.data as Activity[]) || []).filter(
            (activity) =>
              !HIDDEN_TYPES.has(activity.activity_type) &&
              (activity.score != null || activity.activity_id != null)
          );

          // Gom các bản ghi "vocab_mastered" lại theo (domain + subject) và
          // gom các phiên "speaking_coach_*" theo ngôn ngữ — tránh việc
          // hiển thị mỗi lần luyện speaking mỗi dòng, làm ngập popup Ôn lại.
          const vocabGroups = new Map<string, { count: number; latest: Activity; subjects: Set<string> }>();
          const speakingGroups = new Map<string, { count: number; latest: Activity; totalScore: number; totalMax: number }>();
          const nonGrouped: Activity[] = [];
          for (const a of rawVisible) {
            const isVocab = a.activity_type === "vocab_mastered" || a.activity_type === "vocab_mastery";
            const isSpeaking = a.activity_type.startsWith("speaking_coach_");
            if (isVocab) {
              const subject = (a.metadata?.subject as string) || a.domain || "vocab";
              const key = `${a.domain || "?"}::${subject}`;
              const g = vocabGroups.get(key);
              if (g) {
                g.count += 1;
                g.subjects.add(subject);
                if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
              } else {
                vocabGroups.set(key, { count: 1, latest: a, subjects: new Set([subject]) });
              }
            } else if (isSpeaking) {
              const key = a.activity_type;
              const g = speakingGroups.get(key);
              if (g) {
                g.count += 1;
                g.totalScore += a.score || 0;
                g.totalMax += a.max_score || 10;
                if (new Date(a.created_at) > new Date(g.latest.created_at)) g.latest = a;
              } else {
                speakingGroups.set(key, { count: 1, latest: a, totalScore: a.score || 0, totalMax: a.max_score || 10 });
              }
            } else {
              nonGrouped.push(a);
            }
          }
          const vocabSummary: Activity[] = Array.from(vocabGroups.values()).map((g) => ({
            ...g.latest,
            activity_type: "vocab_mastered_group",
            activity_id: `${Array.from(g.subjects).join(", ")} · +${g.count} từ đã thuộc`,
            score: g.count,
            max_score: g.count,
            metadata: { ...(g.latest.metadata || {}), grouped: true, count: g.count },
          }));
          const speakingSummary: Activity[] = Array.from(speakingGroups.entries()).map(([key, g]) => {
            const langLabel = key.replace("speaking_coach_", "");
            return {
              ...g.latest,
              activity_type: "speaking_coach_group",
              activity_id: `Speaking Coach · ${langLabel} · ${g.count} lượt luyện`,
              score: g.totalScore,
              max_score: g.totalMax,
              metadata: { ...(g.latest.metadata || {}), grouped: true, count: g.count, language: langLabel },
            };
          });

          const visibleActivities = [...vocabSummary, ...speakingSummary, ...nonGrouped]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 10);


          setActivities(visibleActivities);
          setWritings((writRes.data as WritingAttempt[]) || []);
          setNotebooks((noteRes.data as Notebook[]) || []);

          const lects: LectureProgress[] = [
            ...((ieltsRes.data || []).map((l: any) => ({ ...l, source: "IELTS" }))),
            ...((toeicRes.data || []).map((l: any) => ({ ...l, source: "TOEIC" }))),
          ].sort((a, b) => new Date(b.completed_at || 0).getTime() - new Date(a.completed_at || 0).getTime()).slice(0, 5);
          setLectures(lects);

          setLoading(false);

          // Always open the recap dialog on first login of the session, even if there's no data yet -
          // an empty-state message is friendlier than the popup silently failing to appear.
          setOpen(true);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // Lightweight refetch of notebooks when external append happens.
  useEffect(() => {
    const handler = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data } = await supabase
        .from("student_notebooks")
        .select("title, subject, content, updated_at")
        .eq("user_id", session.user.id)
        .order("updated_at", { ascending: false })
        .limit(3);
      if (data) setNotebooks(data as Notebook[]);
    };
    window.addEventListener("notebook:updated", handler as EventListener);
    return () => window.removeEventListener("notebook:updated", handler as EventListener);
  }, []);

  const totalItems = activities.length + writings.length + notebooks.length + lectures.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-primary" />
            {totalItems > 0 ? "Ôn lại buổi học trước" : "Welcome to HaiEduTech!"}
          </DialogTitle>
          <DialogDescription>
            {totalItems > 0
              ? `Tổng kết ${totalItems} hoạt động gần nhất của bạn. Hãy ôn lại trước khi bắt đầu bài mới!`
              : pickEncouragement()}
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
                <EncouragementEmpty tab="activities" onClose={() => setOpen(false)} />
              ) : activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {ACTIVITY_LABELS[a.activity_type] ||
                        prettyLectureId(a.activity_type)}
                    </p>
                    {a.activity_id && (
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {prettyLectureId(a.activity_id)}
                      </p>
                    )}
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
                      {a.activity_type === "vocab_mastered_group"
                        ? `+${a.score}`
                        : a.activity_type === "speaking_coach_group"
                          ? `${a.metadata?.count || 1} lượt`
                          : `${a.score}/${a.max_score || "?"}`}
                    </div>
                  )}

                </div>
              ))}
            </TabsContent>

            <TabsContent value="lectures" className="space-y-2 mt-3">
              {lectures.length === 0 ? (
                <EncouragementEmpty tab="lectures" onClose={() => setOpen(false)} />
              ) : lectures.map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{prettyLectureId(l.lecture_id)}</p>
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
                <EncouragementEmpty tab="writing" onClose={() => setOpen(false)} />
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
                <EncouragementEmpty tab="notes" onClose={() => setOpen(false)} />
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
