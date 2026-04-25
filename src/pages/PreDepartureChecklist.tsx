/**
 * @file PreDepartureChecklist.tsx
 * @description Interactive pre-departure checklist for Finland, China, UK, USA.
 *   Backed by `pre_departure_progress` table - requires authentication.
 */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane, CheckCircle2, Circle, Loader2, Clock, RotateCcw,
  FileText, Home, Wallet, Backpack, Heart, GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  PRE_DEPARTURE_CHECKLISTS,
  getCategoryLabel,
  type ChecklistCategory,
  type CountryChecklist,
} from "@/data/preDepartureChecklist";

const CATEGORY_ICON: Record<ChecklistCategory, typeof FileText> = {
  visa: FileText,
  accommodation: Home,
  finance: Wallet,
  packing: Backpack,
  health: Heart,
  academic: GraduationCap,
};

const CATEGORY_COLOR: Record<ChecklistCategory, string> = {
  visa: "from-blue-500 to-indigo-600",
  accommodation: "from-emerald-500 to-teal-600",
  finance: "from-amber-500 to-orange-600",
  packing: "from-violet-500 to-purple-600",
  health: "from-rose-500 to-pink-600",
  academic: "from-sky-500 to-cyan-600",
};

const PreDepartureChecklist = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [country, setCountry] = useState<CountryChecklist["code"]>("finland");
  const [doneKeys, setDoneKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const current = PRE_DEPARTURE_CHECKLISTS.find((c) => c.code === country)!;

  // Auth + load progress per country
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!data.user) {
        navigate("/login?redirect=/study-abroad/checklist");
        return;
      }
      setUserId(data.user.id);
      await loadProgress(data.user.id, country);
      setLoading(false);
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Reload progress when country changes
  useEffect(() => {
    if (userId) loadProgress(userId, country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, userId]);

  const loadProgress = async (uid: string, code: string) => {
    const { data, error } = await supabase
      .from("pre_departure_progress")
      .select("task_key, is_done")
      .eq("user_id", uid)
      .eq("country", code);
    if (error) {
      toast({ title: t("Lỗi tải", "Failed to load"), description: error.message, variant: "destructive" });
      return;
    }
    const done = new Set<string>();
    (data || []).forEach((r: any) => { if (r.is_done) done.add(r.task_key); });
    setDoneKeys(done);
  };

  const toggle = async (key: string) => {
    if (!userId) return;
    const wasDone = doneKeys.has(key);
    const next = new Set(doneKeys);
    if (wasDone) next.delete(key); else next.add(key);
    setDoneKeys(next);
    setUpdating(key);

    const { error } = await supabase
      .from("pre_departure_progress")
      .upsert(
        {
          user_id: userId,
          country,
          task_key: key,
          is_done: !wasDone,
          completed_at: !wasDone ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,country,task_key" }
      );
    setUpdating(null);
    if (error) {
      // Revert on failure
      setDoneKeys(doneKeys);
      toast({ title: t("Lỗi lưu", "Save failed"), description: error.message, variant: "destructive" });
    }
  };

  const handleResetCountry = async () => {
    if (!userId) return;
    if (!confirm(t(`Đặt lại tiến độ cho ${current.nameVi}?`, `Reset progress for ${current.nameEn}?`))) return;
    const { error } = await supabase
      .from("pre_departure_progress")
      .delete()
      .eq("user_id", userId)
      .eq("country", country);
    if (error) {
      toast({ title: t("Lỗi", "Error"), description: error.message, variant: "destructive" });
      return;
    }
    setDoneKeys(new Set());
    toast({ title: t("Đã đặt lại", "Progress reset") });
  };

  const groups = useMemo(() => {
    const map = new Map<ChecklistCategory, typeof current.tasks>();
    current.tasks.forEach((tk) => {
      if (!map.has(tk.category)) map.set(tk.category, []);
      map.get(tk.category)!.push(tk);
    });
    return Array.from(map.entries());
  }, [current]);

  const total = current.tasks.length;
  const done = current.tasks.filter((t) => doneKeys.has(t.key)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${current.accentClass} flex items-center justify-center shadow-lg`}>
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {t("Pre-Departure Checklist", "Pre-Departure Checklist")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("Lộ trình chi tiết trước khi bay du học.", "Detailed roadmap before your study abroad flight.")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Country tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {PRE_DEPARTURE_CHECKLISTS.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  country === c.code
                    ? `bg-gradient-to-r ${c.accentClass} text-white shadow-lg`
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-lg">{c.flag}</span>
                {t(c.nameVi, c.nameEn)}
              </button>
            ))}
          </div>

          {/* Progress card */}
          <Card className="mb-6 border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <span className="text-2xl">{current.flag}</span>
                    {t(current.nameVi, current.nameEn)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {done} / {total} {t("nhiệm vụ hoàn thành", "tasks complete")}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-extrabold text-primary">{pct}%</div>
                  <Button size="sm" variant="outline" onClick={handleResetCountry} className="gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t("Đặt lại", "Reset")}
                  </Button>
                </div>
              </div>
              <Progress value={pct} className="h-2" />
              {pct === 100 && (
                <div className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {t("Sẵn sàng bay! Chúc bạn thành công 🎉", "Ready to fly! Best of luck 🎉")}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Task groups by category */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {groups.map(([cat, tasks]) => {
                const Icon = CATEGORY_ICON[cat];
                const label = getCategoryLabel(cat);
                const catDone = tasks.filter((tk) => doneKeys.has(tk.key)).length;
                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border/60">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${CATEGORY_COLOR[cat]} flex items-center justify-center shadow`}>
                            <Icon className="w-4.5 h-4.5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm">{t(label.vi, label.en)}</div>
                            <div className="text-xs text-muted-foreground">{catDone}/{tasks.length}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {tasks.map((tk) => {
                            const isDone = doneKeys.has(tk.key);
                            const isUpdating = updating === tk.key;
                            return (
                              <button
                                key={tk.key}
                                onClick={() => !isUpdating && toggle(tk.key)}
                                disabled={isUpdating}
                                className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-all ${
                                  isDone
                                    ? "bg-emerald-500/10 border border-emerald-500/30"
                                    : "bg-muted/30 border border-transparent hover:border-primary/30 hover:bg-muted/50"
                                }`}
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  {isUpdating ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                  ) : isDone ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className={`font-semibold text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                    {t(tk.titleVi, tk.titleEn)}
                                  </div>
                                  {(tk.descVi || tk.descEn) && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {t(tk.descVi || "", tk.descEn || "")}
                                    </div>
                                  )}
                                  {typeof tk.daysBeforeDeparture === "number" && (
                                    <Badge variant="outline" className="mt-1.5 text-[10px] gap-1">
                                      <Clock className="w-2.5 h-2.5" />
                                      {tk.daysBeforeDeparture > 0
                                        ? t(`~${tk.daysBeforeDeparture} ngày trước bay`, `~${tk.daysBeforeDeparture} days before`)
                                        : t("Sau khi tới", "After arrival")}
                                    </Badge>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreDepartureChecklist;
