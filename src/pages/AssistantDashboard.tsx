import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useUserRole } from "@/hooks/useUserRole";
import { Loader2, ShieldCheck, ClipboardList, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeTrackingWidget from "@/components/assistant/TimeTrackingWidget";
import MyTimeLogs from "@/components/assistant/MyTimeLogs";
import DailyReportForm from "@/components/assistant/DailyReportForm";
import { toast } from "sonner";

// Assistant-only admin dashboard.
// STRICT: never imports any revenue/financial widgets.
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Bảng điều khiển Cộng tác viên
                </h1>
                <p className="text-sm text-muted-foreground">Assistant Workspace · HaiEduTech</p>
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
