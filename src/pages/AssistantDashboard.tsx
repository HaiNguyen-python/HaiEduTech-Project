import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2, ShieldCheck, ClipboardList, Clock, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeTrackingWidget from "@/components/assistant/TimeTrackingWidget";
import MyTimeLogs from "@/components/assistant/MyTimeLogs";
import DailyReportForm from "@/components/assistant/DailyReportForm";
import MyBonuses from "@/components/assistant/MyBonuses";
import { toast } from "sonner";

// Assistant-only workspace. STRICT: never imports revenue/financial widgets.
const AssistantDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, isAssistant, isSuperAdmin } = useUserRole();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!isAssistant && !isSuperAdmin) {
      toast.error("403 — Bạn không có quyền truy cập", { description: "Khu vực dành cho Cộng tác viên." });
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, isAssistant, isSuperAdmin, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const today = new Date().toLocaleDateString("vi-VN", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {/* Hero card */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 p-6 sm:p-8 mb-6">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-background/80 border border-border/60 shadow-sm">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">HaiEduTech · Workspace</p>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-0.5">
                      Assistant Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{today}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 border border-border/60 text-xs font-medium text-muted-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Chuyên nghiệp · Minh bạch · Tận tâm
                </div>
              </div>
            </div>

            <Tabs defaultValue="work" className="space-y-6">
              <TabsList>
                <TabsTrigger value="work" className="gap-1.5">
                  <Clock className="w-4 h-4" /> Chấm công
                </TabsTrigger>
                <TabsTrigger value="report" className="gap-1.5">
                  <ClipboardList className="w-4 h-4" /> Báo cáo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="work" className="space-y-6">
                <TimeTrackingWidget userId={user.id} onChange={() => setRefreshKey((k) => k + 1)} />
                <MyBonuses userId={user.id} />
                <MyTimeLogs userId={user.id} refreshKey={refreshKey} />
              </TabsContent>

              <TabsContent value="report">
                <DailyReportForm userId={user.id} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssistantDashboard;
