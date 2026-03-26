import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, UserCheck, UserX, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const COURSE_ID = "conversational-english";

interface StudentAccess {
  userId: string;
  fullName: string;
  email: string;
  hasAccess: boolean;
}

const CourseAccessManager = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<StudentAccess[]>([]);
  const [filtered, setFiltered] = useState<StudentAccess[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  // Fetch all students + their access status
  useEffect(() => {
    const fetchData = async () => {
      // Get all profiles
      const { data: profiles } = await supabase.from("profiles").select("id, full_name");

      // Get all access records for this course
      const { data: accessRecords } = await supabase
        .from("course_access" as any)
        .select("user_id")
        .eq("course_id", COURSE_ID);

      const accessSet = new Set((accessRecords || []).map((r: any) => r.user_id));

      // Get auth user emails - we'll use profiles + user_roles to identify students
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // Build student list (exclude teachers from the toggle list but show them as always-access)
      const teacherSet = new Set(
        (roleData || []).filter((r: any) => r.role === "teacher" || r.role === "admin").map((r: any) => r.user_id)
      );

      const list: StudentAccess[] = (profiles || []).map((p: any) => ({
        userId: p.id,
        fullName: p.full_name || "Unknown",
        email: "", // We'll show name-based since we can't query auth.users
        hasAccess: teacherSet.has(p.id) || accessSet.has(p.id),
      }));

      // Sort: students with access first, then alphabetical
      list.sort((a, b) => {
        if (a.hasAccess !== b.hasAccess) return a.hasAccess ? -1 : 1;
        return a.fullName.localeCompare(b.fullName);
      });

      setStudents(list);
      setFiltered(list);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filter by search
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(students);
    } else {
      const q = search.toLowerCase();
      setFiltered(students.filter(s => s.fullName.toLowerCase().includes(q)));
    }
  }, [search, students]);

  const toggleAccess = async (student: StudentAccess) => {
    setToggling(student.userId);
    try {
      if (student.hasAccess) {
        // Revoke access
        await supabase
          .from("course_access" as any)
          .delete()
          .eq("user_id", student.userId)
          .eq("course_id", COURSE_ID);

        toast.success(t(`Đã tắt quyền truy cập cho ${student.fullName}`, `Access revoked for ${student.fullName}`));
      } else {
        // Grant access
        const { data: { user } } = await supabase.auth.getUser();
        await supabase
          .from("course_access" as any)
          .insert({ user_id: student.userId, course_id: COURSE_ID, granted_by: user?.id });

        toast.success(t(`Đã cấp quyền truy cập cho ${student.fullName}`, `Access granted for ${student.fullName}`));
      }

      // Update local state
      setStudents(prev =>
        prev.map(s => s.userId === student.userId ? { ...s, hasAccess: !s.hasAccess } : s)
      );
    } catch (err) {
      toast.error(t("Có lỗi xảy ra", "An error occurred"));
    }
    setToggling(null);
  };

  const accessCount = students.filter(s => s.hasAccess).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          {t("Quản lý Quyền truy cập Khóa học", "Course Access Management")}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("Conversational English — Bật/tắt quyền truy cập chương trình tương tác cho từng học sinh", "Conversational English — Toggle interactive curriculum access for each student")}
        </p>
      </CardHeader>
      <CardContent>
        {/* Search + stats */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("Tìm học sinh...", "Search students...")}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            <UserCheck className="w-3 h-3 mr-1" />
            {accessCount} {t("đã cấp quyền", "granted")}
          </Badge>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Học sinh", "Student")}</TableHead>
                  <TableHead className="text-center">{t("Trạng thái", "Status")}</TableHead>
                  <TableHead className="text-right">{t("Quyền truy cập", "Access")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(student => (
                  <TableRow key={student.userId}>
                    <TableCell className="font-medium">{student.fullName}</TableCell>
                    <TableCell className="text-center">
                      {student.hasAccess ? (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px]">
                          <UserCheck className="w-3 h-3 mr-1" />
                          {t("Đã cấp quyền", "Granted")}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px]">
                          <UserX className="w-3 h-3 mr-1" />
                          {t("Chưa có quyền", "No access")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {toggling === student.userId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Switch
                            checked={student.hasAccess}
                            onCheckedChange={() => toggleAccess(student)}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      {t("Không tìm thấy học sinh", "No students found")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseAccessManager;
