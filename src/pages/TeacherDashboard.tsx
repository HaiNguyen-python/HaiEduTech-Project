import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Users, BookOpen, Code2, TrendingUp, Loader2, Sparkles, Library, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TeacherAdmin from "@/pages/TeacherAdmin";

interface Stats {
  totalStudents: number;
  totalLessons: number;
  englishLessons: number;
  chineseLessons: number;
  programmingLessons: number;
}

const TeacherDashboard = () => {
  const { t } = useLanguage();
  const { user, isTeacher, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0, totalLessons: 0, englishLessons: 0, chineseLessons: 0, programmingLessons: 0,
  });
  const [students, setStudents] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!roleLoading && !isTeacher) {
      navigate("/", { replace: true });
    }
  }, [roleLoading, isTeacher, navigate]);

  useEffect(() => {
    if (!isTeacher) return;
    const fetchData = async () => {
      // Fetch lesson stats
      const { data: lessons } = await supabase.from("generated_lessons").select("subject");
      const all = lessons || [];
      setStats({
        totalStudents: 0,
        totalLessons: all.length,
        englishLessons: all.filter(l => l.subject === "english").length,
        chineseLessons: all.filter(l => l.subject === "chinese").length,
        programmingLessons: all.filter(l => l.subject === "programming").length,
      });

      // Fetch student profiles
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, created_at");
      setStudents(profiles || []);
      setStats(prev => ({ ...prev, totalStudents: (profiles || []).length }));
      setLoadingData(false);
    };
    fetchData();
  }, [isTeacher]);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isTeacher) return null;

  const statCards = [
    { label: t("Tổng học sinh", "Total Students"), value: stats.totalStudents, icon: Users, color: "text-sky-500" },
    { label: t("Tổng bài học AI", "Total AI Lessons"), value: stats.totalLessons, icon: BookOpen, color: "text-emerald-500" },
    { label: t("Tiếng Anh", "English"), value: stats.englishLessons, icon: BookOpen, color: "text-amber-500" },
    { label: t("Tiếng Trung", "Chinese"), value: stats.chineseLessons, icon: Library, color: "text-rose-500" },
    { label: t("Lập trình", "Programming"), value: stats.programmingLessons, icon: Code2, color: "text-violet-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  {t("Bảng điều khiển Giáo viên", "Teacher Dashboard")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t("Quản lý nội dung và theo dõi học sinh", "Manage content and track students")}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {statCards.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                        <span className="text-xs text-muted-foreground">{s.label}</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground tabular-nums">
                        {loadingData ? "—" : s.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="generate" className="gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Soạn bài AI", "AI Lesson Generator")}
                </TabsTrigger>
                <TabsTrigger value="students" className="gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {t("Danh sách học sinh", "Student List")}
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {t("Thống kê", "Analytics")}
                </TabsTrigger>
              </TabsList>

              {/* Generate Tab - Embed TeacherAdmin */}
              <TabsContent value="generate">
                <TeacherAdminEmbed />
              </TabsContent>

              {/* Students Tab */}
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("Học sinh đã đăng ký", "Registered Students")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingData ? (
                      <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
                    ) : students.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4">{t("Chưa có học sinh nào", "No students yet")}</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>{t("Họ tên", "Full Name")}</TableHead>
                            <TableHead>{t("Ngày đăng ký", "Registered")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((s, i) => (
                            <TableRow key={s.id}>
                              <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                              <TableCell className="font-medium">{s.full_name || t("Chưa đặt tên", "Unnamed")}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {new Date(s.created_at).toLocaleDateString("vi-VN")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("Thống kê tổng quan", "Overview Analytics")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: t("Tiếng Anh", "English"), count: stats.englishLessons, pct: stats.totalLessons ? Math.round((stats.englishLessons / stats.totalLessons) * 100) : 0, color: "bg-amber-500" },
                        { label: t("Tiếng Trung", "Chinese"), count: stats.chineseLessons, pct: stats.totalLessons ? Math.round((stats.chineseLessons / stats.totalLessons) * 100) : 0, color: "bg-rose-500" },
                        { label: t("Lập trình", "Programming"), count: stats.programmingLessons, pct: stats.totalLessons ? Math.round((stats.programmingLessons / stats.totalLessons) * 100) : 0, color: "bg-violet-500" },
                      ].map(item => (
                        <div key={item.label} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{item.label}</span>
                            <span className="text-muted-foreground">{item.count} {t("bài", "lessons")}</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                          </div>
                          <p className="text-xs text-muted-foreground">{item.pct}% {t("tổng số", "of total")}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/** Embedded version of TeacherAdmin without Navbar/Footer */
const TeacherAdminEmbed = () => {
  const { t } = useLanguage();
  // Re-use the TeacherAdmin page content but stripped of layout
  return (
    <div className="space-y-6">
      <TeacherAdmin embedded />
    </div>
  );
};

export default TeacherDashboard;
