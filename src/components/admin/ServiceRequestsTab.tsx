/**
 * Service Requests Tab — quản lý đơn đăng ký dịch vụ thiết kế web giáo dục.
 * Pulls from public.service_requests (RLS: staff only).
 */
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type Status = "new" | "contacted" | "quoted" | "won" | "lost";

interface RequestRow {
  id: string;
  teacher_name: string;
  email: string;
  phone: string;
  subject_taught: string | null;
  selected_package: string;
  special_requirements: string | null;
  status: Status;
  created_at: string;
}

const STATUS_LABEL: Record<Status, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  quoted: "Đã báo giá",
  won: "Chốt đơn",
  lost: "Huỷ",
};
const STATUS_COLOR: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  quoted: "bg-violet-100 text-violet-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-rose-100 text-rose-700",
};
const PACKAGE_LABEL: Record<string, string> = {
  standard: "Standard",
  advanced: "Advanced AI & Data",
  enterprise: "Enterprise",
};

export default function ServiceRequestsTab() {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | Status>("all");

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as RequestRow[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const setStatus = async (id: string, status: Status) => {
    const { error } = await (supabase as any)
      .from("service_requests")
      .update({ status })
      .eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Đã cập nhật trạng thái");
  };

  const remove = async (id: string) => {
    if (!confirm("Xoá đơn đăng ký này?")) return;
    const { error } = await (supabase as any)
      .from("service_requests")
      .delete()
      .eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Đã xoá");
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!needle) return true;
      return [r.teacher_name, r.email, r.phone, r.subject_taught ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [rows, q, filter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length, new: 0, contacted: 0, quoted: 0, won: 0, lost: 0 };
    rows.forEach((r) => { c[r.status] = (c[r.status] ?? 0) + 1; });
    return c;
  }, [rows]);

  return (
    <Card className="border-border/70">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle className="text-xl">Quản lý đơn đăng ký dịch vụ</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Yêu cầu từ trang Thiết kế Website Giáo dục (/dich-vu-web)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Tổng: {counts.all}</Badge>
            <Badge className="bg-blue-100 text-blue-700">Mới: {counts.new ?? 0}</Badge>
            <Button size="sm" variant="outline" onClick={fetchAll}>
              <RefreshCw className="w-3.5 h-3.5" /> Tải lại
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên, email, SĐT..."
              className="pl-8"
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
            <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin inline" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            Chưa có đơn đăng ký nào.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground">{r.teacher_name}</h4>
                      <Badge className={STATUS_COLOR[r.status]}>{STATUS_LABEL[r.status]}</Badge>
                      <Badge variant="outline">Gói: {PACKAGE_LABEL[r.selected_package] ?? r.selected_package}</Badge>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                      <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 hover:text-primary">
                        <Mail className="w-3.5 h-3.5" /> {r.email}
                      </a>
                      <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 hover:text-primary">
                        <Phone className="w-3.5 h-3.5" /> {r.phone}
                      </a>
                      {r.subject_taught && <span>· {r.subject_taught}</span>}
                      <span>· {new Date(r.created_at).toLocaleString("vi-VN")}</span>
                    </div>
                    {r.special_requirements && (
                      <p className="mt-2 text-sm text-foreground/85 whitespace-pre-wrap bg-secondary/40 rounded-md p-2.5">
                        {r.special_requirements}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select value={r.status} onValueChange={(v) => setStatus(r.id, v as Status)}>
                      <SelectTrigger className="w-[140px] h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
                          <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} title="Xoá">
                      <Trash2 className="w-4 h-4 text-rose-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
