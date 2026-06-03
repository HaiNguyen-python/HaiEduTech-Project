import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Loader2, UserPlus, UserMinus, Search, ChevronDown, Users } from "lucide-react";
import { toast } from "sonner";

interface ProfileRow {
  id: string;
  full_name: string | null;
  created_at: string;
  isAssistant: boolean;
}

const AssistantUserTable = () => {
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    // Fetch all profiles + roles in two queries (RLS allows teachers to read user_roles)
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, full_name, created_at").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const roleMap = new Map<string, Set<string>>();
    for (const r of roles || []) {
      const s = roleMap.get((r as any).user_id) || new Set<string>();
      s.add((r as any).role);
      roleMap.set((r as any).user_id, s);
    }
    // Exclude super admins (admin/teacher) from this list
    const list: ProfileRow[] = (profiles || [])
      .filter((p: any) => {
        const s = roleMap.get(p.id) || new Set();
        return !s.has("admin") && !s.has("teacher");
      })
      .map((p: any) => ({
        id: p.id,
        full_name: p.full_name,
        created_at: p.created_at,
        isAssistant: (roleMap.get(p.id) || new Set()).has("assistant"),
      }));
    setRows(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const appoint = async (userId: string) => {
    setBusy(userId);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "assistant" });
    if (error) { setBusy(null); toast.error("Bổ nhiệm thất bại", { description: error.message }); return; }
    // Notify the appointed user so they see it on the bell + can jump to /assistant
    await supabase.from("assignment_notifications").insert({
      user_id: userId,
      title: "Bạn đã được bổ nhiệm làm Cộng tác viên 🎉",
      body: "Chào mừng bạn đến với đội ngũ CTV của HaiEduTech! Truy cập khu vực Cộng tác viên để bắt đầu chấm công và gửi báo cáo hằng ngày.",
      route: "/assistant",
    });
    setBusy(null);
    toast.success("Đã bổ nhiệm CTV!", { description: "Đã gửi thông báo tới tài khoản này." });
    load();
  };

  const revoke = async (userId: string) => {
    setBusy(userId);
    const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "assistant");
    if (error) { setBusy(null); toast.error("Thu hồi thất bại", { description: error.message }); return; }
    await supabase.from("assignment_notifications").insert({
      user_id: userId,
      title: "Quyền Cộng tác viên đã được thu hồi",
      body: "Tài khoản của bạn không còn quyền truy cập khu vực Cộng tác viên. Mọi thắc mắc vui lòng liên hệ thầy Hải.",
      route: "/dashboard",
    });
    setBusy(null);
    toast.success("Đã thu hồi quyền CTV");
    load();
  };

  const filtered = rows.filter((r) => (r.full_name || "").toLowerCase().includes(q.toLowerCase()));

  return (
    <Card>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between gap-3 flex-wrap">
            <CollapsibleTrigger className="flex items-center gap-2 group text-left hover:text-primary transition-colors">
              <Users className="w-4 h-4 text-primary" />
              <span>Danh sách học viên & Cộng tác viên</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-normal">
                {rows.length}
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            {open && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo tên..."
                  className="pl-8 h-9 text-sm"
                />
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            ) : (
              <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Ngày đăng ký</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.full_name || <span className="text-muted-foreground italic">Chưa đặt tên</span>}</TableCell>
                        <TableCell>
                          {r.isAssistant ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">CTV</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">Student</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell className="text-right">
                          {r.isAssistant ? (
                            <Button size="sm" variant="outline" disabled={busy === r.id} onClick={() => revoke(r.id)} className="gap-1.5">
                              <UserMinus className="w-3.5 h-3.5" /> Thu hồi CTV
                            </Button>
                          ) : (
                            <Button size="sm" disabled={busy === r.id} onClick={() => appoint(r.id)} className="gap-1.5">
                              <UserPlus className="w-3.5 h-3.5" /> Bổ nhiệm CTV
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="text-center text-sm text-muted-foreground py-6">Không có dữ liệu</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default AssistantUserTable;
