/**
 * IELTS Task 2 — Idea Practice
 *
 * Helps learners brainstorm and develop ideas for Writing Task 2 essays.
 * Left pane: filterable bank of essay prompts grouped by topic category.
 * Right pane: when a topic is selected we surface:
 *  - 2-3 perspectives (Agree/Disagree, Advantages/Disadvantages,
 *    Causes/Solutions, etc.)
 *  - Each perspective lists pre-built ideas with REASON + EXAMPLE
 *    and Band 7+ collocations so students can copy the structure.
 *  - Suggested thesis sentences for the introduction.
 *  - A free-text "Your Own Idea" notepad that auto-saves to localStorage
 *    so students can practise building their personal idea bank.
 */
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb, Sparkles, BookOpen, Save, Check, RotateCcw,
  ChevronRight, Target, MessageSquare, Download,
} from "lucide-react";
import { openWritingPdf } from "@/lib/writingPdfExport";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  IELTS_IDEA_TOPICS,
  IDEA_CATEGORIES,
  type IeltsIdeaTopic,
  type IdeaCategory,
} from "@/data/ieltsIdeaBank";

const STORAGE_PREFIX = "ielts-idea-notes:";

const IdeaPractice = () => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<IdeaCategory | "all">("all");
  const [selected, setSelected] = useState<IeltsIdeaTopic | null>(null);
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return IELTS_IDEA_TOPICS;
    return IELTS_IDEA_TOPICS.filter((topic) => topic.category === activeCategory);
  }, [activeCategory]);

  // Load saved notes when topic changes
  useEffect(() => {
    if (!selected) {
      setNotes("");
      return;
    }
    const stored = localStorage.getItem(STORAGE_PREFIX + selected.id);
    setNotes(stored || "");
    setSaved(false);
  }, [selected]);

  const handleSaveNotes = () => {
    if (!selected) return;
    localStorage.setItem(STORAGE_PREFIX + selected.id, notes);
    setSaved(true);
    toast.success(t("Đã lưu ý tưởng của bạn", "Your ideas have been saved"));
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportPdf = () => {
    if (!selected) return;
    openWritingPdf({
      title: "IELTS Writing Task 2 - Idea Bank",
      subtitle: selected.type.replace(/-/g, " ").toUpperCase(),
      sections: [
        {
          heading: "Prompt",
          kind: "text",
          text: lang === "vi" ? selected.promptVi : selected.prompt,
        },
        ...selected.sides.map((side) => ({
          heading: `Ideas: ${lang === "vi" ? side.labelVi : side.label}`,
          kind: "list" as const,
          items: side.ideas.map(
            (idea, i) =>
              `${i + 1}. ${idea.point} | Reason: ${idea.reason} | Example: ${idea.example}${
                idea.collocations && idea.collocations.length
                  ? ` | Collocations: ${idea.collocations.join(", ")}`
                  : ""
              }`,
          ),
        })),
        {
          heading: "Suggested Band 7+ thesis sentences",
          kind: "list" as const,
          items: selected.thesisOptions || [],
        },
        { heading: "Your own ideas", kind: "text" as const, text: notes },
      ],
      fileName: "ielts-idea-bank-task2",
    });
  };

  const handleReset = () => {
    if (!selected) return;
    localStorage.removeItem(STORAGE_PREFIX + selected.id);
    setNotes("");
    toast.info(t("Đã xóa ghi chú", "Notes cleared"));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6">
      {/* LEFT — Topic Bank */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {t("Ngân hàng đề luyện ý", "Idea Topic Bank")}
            </CardTitle>
            <Badge variant="secondary" className="rounded-full">
              {filtered.length} {t("đề", "topics")}
            </Badge>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mt-3 max-h-32 overflow-y-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              {t("Tất cả", "All")}
            </button>
            {IDEA_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted border-border"
                }`}
              >
                {cat.icon} {lang === "vi" ? cat.labelVi : cat.label}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((topic) => {
            const cat = IDEA_CATEGORIES.find((c) => c.id === topic.category);
            const isActive = selected?.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelected(topic)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {cat?.icon} {topic.type.replace(/-/g, " ")}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-sm leading-relaxed line-clamp-3">
                  {lang === "vi" ? topic.promptVi : topic.prompt}
                </p>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* RIGHT — Idea Builder */}
      <Card className="border-2 border-dashed">
        {!selected ? (
          <CardContent className="flex flex-col items-center justify-center min-h-[500px] text-center p-8">
            <Lightbulb className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground max-w-md">
              {t(
                "Chọn một đề Task 2 ở bên trái để khám phá ý tưởng theo nhiều góc nhìn và luyện phát triển ý của riêng bạn.",
                "Pick a Task 2 prompt on the left to explore brainstormed ideas from multiple perspectives and practise building your own."
              )}
            </p>
          </CardContent>
        ) : (
          <CardContent className="p-5 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-5"
              >
                {/* Prompt */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary" />
                    <Badge variant="default" className="rounded-full text-[10px]">
                      {selected.type.replace(/-/g, " ").toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed font-medium">
                    {lang === "vi" ? selected.promptVi : selected.prompt}
                  </p>
                </div>

                {/* Perspectives */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    {t("Ý tưởng theo từng góc nhìn", "Ideas by Perspective")}
                  </h3>

                  {selected.sides.map((side, sideIdx) => (
                    <div
                      key={sideIdx}
                      className="rounded-lg border bg-card overflow-hidden"
                    >
                      <div className="px-4 py-2 bg-muted/40 border-b">
                        <h4 className="font-semibold text-sm">
                          {lang === "vi" ? side.labelVi : side.label}
                        </h4>
                      </div>
                      <div className="p-3 space-y-3">
                        {side.ideas.map((idea, ideaIdx) => (
                          <div
                            key={ideaIdx}
                            className="p-3 rounded-md bg-muted/30 border border-border/60"
                          >
                            <p className="text-sm font-semibold mb-1.5 flex items-start gap-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex-shrink-0">
                                {ideaIdx + 1}
                              </span>
                              {idea.point}
                            </p>
                            <p className="text-xs text-muted-foreground mb-1">
                              <span className="font-medium text-foreground/80">
                                {t("Lý do: ", "Reason: ")}
                              </span>
                              {idea.reason}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <span className="font-medium text-foreground/80">
                                {t("Ví dụ: ", "Example: ")}
                              </span>
                              {idea.example}
                            </p>
                            {idea.collocations && idea.collocations.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {idea.collocations.map((c) => (
                                  <Badge
                                    key={c}
                                    variant="outline"
                                    className="text-[10px] font-normal"
                                  >
                                    {c}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thesis suggestions */}
                {selected.thesisOptions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      {t("Gợi ý câu thesis Band 7+", "Suggested Band 7+ thesis sentences")}
                    </h3>
                    <div className="space-y-2">
                      {selected.thesisOptions.map((opt, idx) => (
                        <div
                          key={idx}
                          className="p-3 text-sm rounded-md bg-emerald-500/5 border border-emerald-500/20 leading-relaxed"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* User notes */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-violet-500" />
                    {t(
                      "Ý tưởng của riêng bạn (tự động lưu trên thiết bị)",
                      "Your own ideas (auto-saved on this device)"
                    )}
                  </h3>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t(
                      "Viết ý tưởng riêng theo công thức: Quan điểm — Lý do — Ví dụ. Mỗi đoạn 2-3 dòng để dùng cho thân bài...",
                      "Write your own ideas using the formula: Point — Reason — Example. 2-3 lines each to deploy in your body paragraphs..."
                    )}
                    rows={6}
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveNotes} size="sm" className="gap-2">
                      {saved ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saved ? t("Đã lưu", "Saved") : t("Lưu ý tưởng", "Save ideas")}
                    </Button>
                    <Button
                      onClick={handleReset}
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t("Xóa", "Reset")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default IdeaPractice;
