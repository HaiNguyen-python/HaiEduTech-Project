/**
 * @file MotivationLetterDrafts.tsx
 * @description CRUD + AI polish for motivation letter drafts. Saved to motivation_letter_drafts table.
 */
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, FileEdit, Save, Trash2, Sparkles, Loader2, Wand2, Copy, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Draft {
  id: string;
  title: string;
  target_school: string | null;
  target_program: string | null;
  content: string;
  word_count: number;
  ai_suggestions: any;
  ai_polished_at: string | null;
  updated_at: string;
}

interface PolishSuggestions {
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  structure_feedback: string;
  tone_feedback: string;
  vocabulary_upgrades: { from: string; to: string }[];
  action_items: string[];
  improved_opening: string;
}

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const MotivationLetterDrafts = ({ userId }: { userId: string | null }) => {
  const { t } = useLanguage();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [school, setSchool] = useState("");
  const [program, setProgram] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [polishing, setPolishing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<PolishSuggestions | null>(null);
  const dirtyRef = useRef(false);

  const active = drafts.find((d) => d.id === activeId) || null;
  const wordCount = countWords(content);

  const loadDrafts = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data } = await supabase
      .from("motivation_letter_drafts")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });
    setDrafts((data || []) as Draft[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => { loadDrafts(); }, [loadDrafts]);

  // Load active draft into editor
  useEffect(() => {
    if (active) {
      setTitle(active.title);
      setSchool(active.target_school || "");
      setProgram(active.target_program || "");
      setContent(active.content);
      dirtyRef.current = false;
    }
  }, [active?.id]);

  const newDraft = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("motivation_letter_drafts")
      .insert({ user_id: userId, title: t("Bản nháp mới", "New Draft"), content: "" })
      .select()
      .single();
    if (error) { toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" }); return; }
    setDrafts((prev) => [data as Draft, ...prev]);
    setActiveId(data.id);
  };

  const saveDraft = async () => {
    if (!active || !userId) return;
    setSaving(true);
    const { error } = await supabase
      .from("motivation_letter_drafts")
      .update({
        title: title.trim() || t("Bản nháp mới", "New Draft"),
        target_school: school.trim() || null,
        target_program: program.trim() || null,
        content,
        word_count: wordCount,
      })
      .eq("id", active.id);
    setSaving(false);
    if (error) { toast({ title: t("Lỗi lưu", "Save failed"), description: error.message, variant: "destructive" }); return; }
    dirtyRef.current = false;
    toast({ title: t("Đã lưu", "Saved"), description: t(`${wordCount} từ`, `${wordCount} words`) });
    loadDrafts();
  };

  const deleteDraft = async (id: string) => {
    if (!confirm(t("Xóa bản nháp này?", "Delete this draft?"))) return;
    await supabase.from("motivation_letter_drafts").delete().eq("id", id);
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const polish = async () => {
    if (!active) return;
    if (wordCount < 50) {
      toast({ title: t("Cần ≥ 50 từ", "Need ≥ 50 words"), description: t("Hãy viết thêm trước khi xin AI gợi ý.", "Write more before requesting AI feedback."), variant: "destructive" });
      return;
    }
    if (dirtyRef.current) await saveDraft();
    setPolishing(true);
    try {
      const { data, error } = await supabase.functions.invoke("polish-motivation-letter", {
        body: { content, title, target_school: school, target_program: program },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setCurrentSuggestions(data.suggestions);
      setShowSuggestions(true);
      // Save suggestions back
      await supabase
        .from("motivation_letter_drafts")
        .update({ ai_suggestions: data.suggestions, ai_polished_at: new Date().toISOString() })
        .eq("id", active.id);
      loadDrafts();
    } catch (e: any) {
      toast({ title: t("AI lỗi", "AI failed"), description: e.message, variant: "destructive" });
    } finally {
      setPolishing(false);
    }
  };

  const onChange = (setter: (v: string) => void) => (v: string) => { setter(v); dirtyRef.current = true; };

  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
      {/* Drafts list */}
      <Card>
        <CardContent className="p-3">
          <Button onClick={newDraft} className="w-full gap-2 mb-3" size="sm">
            <Plus className="w-4 h-4" /> {t("Bản nháp mới", "New Draft")}
          </Button>
          <ScrollArea className="h-[420px] pr-2">
            {drafts.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground py-8">
                <FileEdit className="w-8 h-8 mx-auto mb-2 opacity-40" />
                {t("Chưa có bản nháp nào", "No drafts yet")}
              </div>
            ) : (
              <div className="space-y-1.5">
                {drafts.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveId(d.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${
                      activeId === d.id ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold truncate">{d.title}</div>
                    {d.target_school && <div className="text-muted-foreground truncate">{d.target_school}</div>}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-muted-foreground">{d.word_count} {t("từ", "words")}</span>
                      {d.ai_polished_at && <Sparkles className="w-3 h-3 text-amber-500" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardContent className="p-4">
          {!active ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileEdit className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">{t("Chọn bản nháp hoặc tạo mới để bắt đầu", "Pick a draft or create a new one to start")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                <Input
                  placeholder={t("Tiêu đề bản nháp", "Draft title")}
                  value={title}
                  onChange={(e) => onChange(setTitle)(e.target.value)}
                  className="font-semibold"
                />
                <Input
                  placeholder={t("Trường đích (vd: Aalto)", "Target school (e.g. Aalto)")}
                  value={school}
                  onChange={(e) => onChange(setSchool)(e.target.value)}
                />
                <Input
                  placeholder={t("Chương trình (vd: MSc Data Science)", "Program (e.g. MSc Data Science)")}
                  value={program}
                  onChange={(e) => onChange(setProgram)(e.target.value)}
                />
              </div>
              <Textarea
                value={content}
                onChange={(e) => onChange(setContent)(e.target.value)}
                placeholder={t(
                  "Bắt đầu viết Motivation Letter của bạn ở đây... (mở đầu bằng câu chuyện cá nhân, kết nối với chương trình mục tiêu, nêu rõ động lực và đóng góp tương lai)",
                  "Start writing your Motivation Letter here... (open with a personal hook, connect to the target program, articulate your motivation and future contribution)"
                )}
                className="min-h-[320px] font-serif text-[15px] leading-relaxed"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{wordCount} {t("từ", "words")}</Badge>
                  {wordCount >= 400 && wordCount <= 800 && <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 border">{t("Độ dài tốt", "Good length")}</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  {active.ai_polished_at && (
                    <Button size="sm" variant="outline" onClick={() => { setCurrentSuggestions(active.ai_suggestions); setShowSuggestions(true); }} className="gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {t("Xem gợi ý AI", "View AI Suggestions")}
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={polish} disabled={polishing} className="gap-1.5">
                    {polishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                    {t("AI Đánh giá & Cải thiện", "AI Polish")}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => deleteDraft(active.id)} className="gap-1.5 text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="sm" onClick={saveDraft} disabled={saving} className="gap-1.5">
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {t("Lưu", "Save")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* AI suggestions dialog */}
      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              {t("Gợi ý cải thiện từ AI", "AI Polish Suggestions")}
            </DialogTitle>
          </DialogHeader>
          {currentSuggestions && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    {currentSuggestions.overall_score}/100
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t("Điểm chất lượng tổng", "Overall Quality Score")}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="font-semibold text-sm text-emerald-700 dark:text-emerald-400 mb-2">✨ {t("Điểm mạnh", "Strengths")}</div>
                  <ul className="space-y-1 text-sm">
                    {currentSuggestions.strengths.map((s, i) => <li key={i} className="flex gap-2"><span>•</span><span>{s}</span></li>)}
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20">
                  <div className="font-semibold text-sm text-rose-700 dark:text-rose-400 mb-2">⚠️ {t("Cần cải thiện", "Weaknesses")}</div>
                  <ul className="space-y-1 text-sm">
                    {currentSuggestions.weaknesses.map((w, i) => <li key={i} className="flex gap-2"><span>•</span><span>{w}</span></li>)}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border/60">
                <div className="font-semibold text-sm mb-1">📐 {t("Cấu trúc", "Structure")}</div>
                <p className="text-sm text-muted-foreground">{currentSuggestions.structure_feedback}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/60">
                <div className="font-semibold text-sm mb-1">🎭 {t("Giọng văn", "Tone")}</div>
                <p className="text-sm text-muted-foreground">{currentSuggestions.tone_feedback}</p>
              </div>

              {currentSuggestions.vocabulary_upgrades?.length > 0 && (
                <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
                  <div className="font-semibold text-sm text-violet-700 dark:text-violet-400 mb-2">📚 {t("Nâng cấp từ vựng", "Vocabulary Upgrades")}</div>
                  <div className="space-y-1 text-sm">
                    {currentSuggestions.vocabulary_upgrades.map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">{v.from}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="font-semibold text-violet-700 dark:text-violet-400">{v.to}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="font-semibold text-sm mb-2">🎯 {t("Hành động ưu tiên", "Priority Actions")}</div>
                <ol className="space-y-1.5 text-sm list-decimal list-inside">
                  {currentSuggestions.action_items.map((a, i) => <li key={i}>{a}</li>)}
                </ol>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-br from-sky-500/10 to-indigo-500/10 border border-sky-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-sm">💡 {t("Mở đầu mẫu cải tiến", "Improved Opening")}</div>
                  <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(currentSuggestions.improved_opening); toast({ title: t("Đã copy", "Copied") }); }} className="gap-1 h-7">
                    <Copy className="w-3 h-3" /> {t("Copy", "Copy")}
                  </Button>
                </div>
                <p className="text-sm font-serif italic">{currentSuggestions.improved_opening}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MotivationLetterDrafts;
