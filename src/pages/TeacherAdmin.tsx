import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle, XCircle, BookOpen, Code2, Languages, Trash2, Search, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SUBJECTS = [
  { id: "english", label: "Tiếng Anh", labelEn: "English", icon: BookOpen, color: "text-sky-500" },
  { id: "chinese", label: "Tiếng Trung", labelEn: "Chinese", icon: Languages, color: "text-red-500" },
  { id: "programming", label: "Lập trình Python", labelEn: "Python Programming", icon: Code2, color: "text-green-500" },
];

const CATEGORIES: Record<string, { id: string; label: string; labelEn: string }[]> = {
  english: [
    { id: "grammar", label: "Ngữ pháp", labelEn: "Grammar" },
    { id: "vocabulary", label: "Từ vựng", labelEn: "Vocabulary" },
    { id: "reading", label: "Đọc hiểu", labelEn: "Reading" },
    { id: "fill-blank", label: "Điền vào chỗ trống", labelEn: "Fill in the Blank" },
    { id: "reorder", label: "Sắp xếp câu", labelEn: "Reorder Sentences" },
    { id: "dialogue", label: "Hội thoại thực tế", labelEn: "Real Dialogues" },
  ],
  chinese: [
    { id: "grammar", label: "Ngữ pháp", labelEn: "Grammar" },
    { id: "vocabulary", label: "Từ vựng", labelEn: "Vocabulary" },
    { id: "reading", label: "Đọc hiểu", labelEn: "Reading" },
    { id: "fill-blank", label: "Điền vào chỗ trống", labelEn: "Fill in the Blank" },
    { id: "reorder", label: "Sắp xếp câu", labelEn: "Reorder Sentences" },
    { id: "dialogue", label: "Hội thoại thực tế", labelEn: "Real Dialogues" },
  ],
  programming: [
    { id: "concept", label: "Kiến thức", labelEn: "Concepts" },
    { id: "fix-bug", label: "Tìm lỗi (Fix Bug)", labelEn: "Fix Bug" },
    { id: "mini-project", label: "Dự án nhỏ", labelEn: "Mini Project" },
  ],
};

const LEVELS: Record<string, { id: string; label: string }[]> = {
  english: [
    { id: "A1", label: "A1 - Beginner" },
    { id: "A2", label: "A2 - Elementary" },
    { id: "B1", label: "B1 - Intermediate" },
    { id: "B2", label: "B2 - Upper Intermediate" },
    { id: "C1", label: "C1 - Advanced" },
  ],
  chinese: [
    { id: "HSK1", label: "HSK 1" },
    { id: "HSK2", label: "HSK 2" },
    { id: "HSK3", label: "HSK 3" },
    { id: "HSK4", label: "HSK 4" },
    { id: "HSK5", label: "HSK 5" },
    { id: "HSK6", label: "HSK 6" },
  ],
  programming: [
    { id: "beginner", label: "Cơ bản" },
    { id: "intermediate", label: "Trung cấp" },
    { id: "advanced", label: "Nâng cao" },
  ],
};

interface GenerationJob {
  index: number;
  status: "pending" | "running" | "done" | "error";
  title?: string;
  error?: string;
}

interface DuplicateGroup {
  title: string;
  lessons: any[];
}

// Simple trigram similarity for client-side duplicate detection
function trigramSimilarity(a: string, b: string): number {
  if (!a || !b) return 0;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\s]/g, "").trim();
  const na = norm(a);
  const nb = norm(b);
  if (na === nb) return 1;
  const tg = (s: string): Set<string> => {
    const t = new Set<string>();
    for (let i = 0; i <= s.length - 3; i++) t.add(s.substring(i, i + 3));
    return t;
  };
  const ta = tg(na);
  const tb = tg(nb);
  if (ta.size === 0 || tb.size === 0) return 0;
  let overlap = 0;
  for (const t of ta) if (tb.has(t)) overlap++;
  return (2 * overlap) / (ta.size + tb.size);
}

const TeacherAdmin = ({ embedded = false }: { embedded?: boolean }) => {
  const { t } = useLanguage();
  const [subject, setSubject] = useState("english");
  const [category, setCategory] = useState("grammar");
  const [level, setLevel] = useState("B1");
  const [batchSize, setBatchSize] = useState(10);
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentLessons, setRecentLessons] = useState<any[]>([]);

  // Duplicate management
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [scanningDuplicates, setScanningDuplicates] = useState(false);
  const [deletingDuplicates, setDeletingDuplicates] = useState(false);

  const completedCount = jobs.filter(j => j.status === "done").length;
  const errorCount = jobs.filter(j => j.status === "error").length;
  const progressPercent = jobs.length > 0 ? (completedCount / jobs.length) * 100 : 0;

  const generateBatch = async () => {
    setIsGenerating(true);
    const newJobs: GenerationJob[] = Array.from({ length: batchSize }, (_, i) => ({
      index: i,
      status: "pending" as const,
    }));
    setJobs(newJobs);

    const { data: { user } } = await supabase.auth.getUser();

    for (let i = 0; i < batchSize; i++) {
      setJobs(prev => prev.map((j, idx) => idx === i ? { ...j, status: "running" } : j));

      try {
        const { data, error } = await supabase.functions.invoke("generate-and-store-lesson", {
          body: { subject, category, level, userId: user?.id },
        });

        if (error) throw error;

        setJobs(prev => prev.map((j, idx) =>
          idx === i ? { ...j, status: "done", title: data?.title || `Bài ${i + 1}` } : j
        ));
        setRecentLessons(prev => [data, ...prev]);
      } catch (e: any) {
        console.error(`Lesson ${i + 1} failed:`, e);
        setJobs(prev => prev.map((j, idx) =>
          idx === i ? { ...j, status: "error", error: e.message } : j
        ));
      }

      if (i < batchSize - 1) {
        await new Promise(r => setTimeout(r, 1500));
      }
    }

    setIsGenerating(false);
    toast.success(t(`Đã tạo xong ${completedCount} bài học!`, `Generated ${completedCount} lessons!`));
  };

  const deleteLesson = async (id: string) => {
    const { error } = await supabase.from("generated_lessons").delete().eq("id", id);
    if (!error) {
      setRecentLessons(prev => prev.filter(l => l.id !== id));
      toast.success(t("Đã xóa", "Deleted"));
    }
  };

  // Scan for duplicates
  const scanDuplicates = async () => {
    setScanningDuplicates(true);
    setDuplicateGroups([]);

    const { data: allLessons, error } = await supabase
      .from("generated_lessons")
      .select("id, title, subject, category, level, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: true });

    if (error || !allLessons) {
      setScanningDuplicates(false);
      toast.error(t("Lỗi khi quét", "Scan error"));
      return;
    }

    // Group by similarity
    const used = new Set<string>();
    const groups: DuplicateGroup[] = [];

    for (let i = 0; i < allLessons.length; i++) {
      if (used.has(allLessons[i].id)) continue;
      const similar = [allLessons[i]];
      for (let j = i + 1; j < allLessons.length; j++) {
        if (used.has(allLessons[j].id)) continue;
        if (allLessons[i].subject !== allLessons[j].subject) continue;
        if (trigramSimilarity(allLessons[i].title, allLessons[j].title) > 0.7) {
          similar.push(allLessons[j]);
          used.add(allLessons[j].id);
        }
      }
      if (similar.length > 1) {
        used.add(allLessons[i].id);
        groups.push({ title: allLessons[i].title, lessons: similar });
      }
    }

    setDuplicateGroups(groups);
    setScanningDuplicates(false);

    if (groups.length === 0) {
      toast.success(t("Không tìm thấy bài trùng lặp!", "No duplicates found!"));
    } else {
      toast.info(t(`Tìm thấy ${groups.length} nhóm trùng lặp`, `Found ${groups.length} duplicate groups`));
    }
  };

  // Delete all duplicates (keep the oldest in each group)
  const deleteAllDuplicates = async () => {
    setDeletingDuplicates(true);
    let deleted = 0;

    for (const group of duplicateGroups) {
      // Keep the first (oldest), delete the rest
      const toDelete = group.lessons.slice(1).map(l => l.id);
      for (const id of toDelete) {
        const { error } = await supabase.from("generated_lessons").delete().eq("id", id);
        if (!error) deleted++;
      }
    }

    setDeletingDuplicates(false);
    setDuplicateGroups([]);
    toast.success(t(`Đã xóa ${deleted} bài trùng lặp!`, `Deleted ${deleted} duplicate lessons!`));
  };

  const content = (
    <>
      {!embedded && (
        <>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" /> {t("Quản trị Nội dung", "Content Management")}
          </div>
          <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
            {t("Soạn bài tự động với AI", "Auto-generate Lessons with AI")}
          </h1>
          <p className="text-muted-foreground mb-8">
            {t("Tạo hàng loạt bài học và bài tập bằng Perplexity AI. Nội dung được lưu vào kho học liệu và hiển thị cho học sinh.", "Batch generate lessons and exercises using Perplexity AI. Content is saved to the library and displayed to students.")}
          </p>
        </>
      )}

      {/* Config */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-foreground mb-4">{t("Cấu hình", "Configuration")}</h2>

        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("Môn học", "Subject")}</label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(s => (
              <button key={s.id} onClick={() => { setSubject(s.id); setCategory(CATEGORIES[s.id][0].id); setLevel(LEVELS[s.id][0].id); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${subject === s.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                <s.icon className="w-4 h-4" />
                {t(s.label, s.labelEn)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("Loại bài", "Category")}</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES[subject]?.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${category === c.id ? "bg-primary/10 text-primary font-medium border border-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {t(c.label, c.labelEn)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("Cấp độ", "Level")}</label>
          <div className="flex flex-wrap gap-2">
            {LEVELS[subject]?.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${level === l.id ? "bg-primary/10 text-primary font-medium border border-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-2 block">{t("Số lượng bài", "Number of lessons")}</label>
          <div className="flex items-center gap-3">
            {[1, 3, 5, 10, 20].map(n => (
              <button key={n} onClick={() => setBatchSize(n)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${batchSize === n ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generateBatch} disabled={isGenerating}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:brightness-110 transition-all disabled:opacity-50 active:scale-[0.97]">
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {isGenerating
            ? t(`Đang tạo... (${completedCount}/${batchSize})`, `Generating... (${completedCount}/${batchSize})`)
            : t(`Tạo ${batchSize} bài học mới`, `Generate ${batchSize} New Lessons`)}
        </button>
      </div>

      {/* Progress */}
      {jobs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">{t("Tiến trình tạo bài", "Generation Progress")}</h3>
            <span className="text-sm text-primary font-semibold">
              {completedCount}/{jobs.length} {t("hoàn thành", "complete")}
              {errorCount > 0 && <span className="text-destructive ml-2">({errorCount} {t("lỗi", "errors")})</span>}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {jobs.map((job, i) => (
              <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs ${
                job.status === "done" ? "bg-green-500/10 text-green-600" :
                job.status === "error" ? "bg-destructive/10 text-destructive" :
                job.status === "running" ? "bg-primary/10 text-primary" :
                "bg-secondary text-muted-foreground"
              }`}>
                {job.status === "done" && <CheckCircle className="w-3 h-3" />}
                {job.status === "error" && <XCircle className="w-3 h-3" />}
                {job.status === "running" && <Loader2 className="w-3 h-3 animate-spin" />}
                {job.status === "pending" && <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />}
                <span className="truncate">{job.title || `Bài ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Duplicate Management */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            {t("Quản lý bài trùng lặp", "Duplicate Management")}
          </h3>
          <button onClick={scanDuplicates} disabled={scanningDuplicates}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-all disabled:opacity-50 active:scale-[0.97]">
            {scanningDuplicates ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {t("Quét bài trùng", "Scan Duplicates")}
          </button>
        </div>

        {duplicateGroups.length > 0 && (
          <>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {duplicateGroups.map((group, gi) => (
                <div key={gi} className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-1">
                    {t("Nhóm", "Group")} {gi + 1}: "{group.title}" ({group.lessons.length} {t("bài", "lessons")})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {group.lessons.map((l, li) => (
                      <span key={l.id} className={`text-xs px-2 py-0.5 rounded-full ${li === 0 ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                        {li === 0 ? t("Giữ lại", "Keep") : t("Trùng", "Dup")} • {l.subject}/{l.category}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all active:scale-[0.97]">
                  <Trash2 className="w-4 h-4" />
                  {t(`Xóa ${duplicateGroups.reduce((s, g) => s + g.lessons.length - 1, 0)} bài trùng`, `Delete ${duplicateGroups.reduce((s, g) => s + g.lessons.length - 1, 0)} duplicates`)}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("Xác nhận xóa bài trùng lặp?", "Confirm delete duplicates?")}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t(
                      "Hệ thống sẽ giữ lại bài cũ nhất trong mỗi nhóm và xóa các bài còn lại. Hành động này không thể hoàn tác.",
                      "The system will keep the oldest lesson in each group and delete the rest. This action cannot be undone."
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("Hủy", "Cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllDuplicates} disabled={deletingDuplicates}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {deletingDuplicates ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {t("Xóa tất cả bài trùng", "Delete all duplicates")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}

        {!scanningDuplicates && duplicateGroups.length === 0 && (
          <p className="text-sm text-muted-foreground">
            {t("Nhấn 'Quét bài trùng' để tìm các bài học có nội dung tương tự nhau.", "Click 'Scan Duplicates' to find lessons with similar content.")}
          </p>
        )}
      </div>

      {/* Recent generated lessons */}
      {recentLessons.length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">{t("Bài học vừa tạo", "Recently Generated")}</h3>
          <div className="space-y-2">
            {recentLessons.map(lesson => (
              <div key={lesson.id} className="flex items-center justify-between px-4 py-3 bg-secondary rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {lesson.subject} • {lesson.category} • {lesson.level}
                  </p>
                </div>
                <button onClick={() => deleteLesson(lesson.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0 ml-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  if (embedded) return <div>{content}</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {content}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherAdmin;
