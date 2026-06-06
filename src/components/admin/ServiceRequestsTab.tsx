/**
 * @file ServiceRequestsTab.tsx
 * @description Admin tab that lists incoming EdTech website service requests
 * and lets staff update the workflow status (new / contacted / completed).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Briefcase, Mail, Phone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Status = "new" | "contacted" | "completed";

interface ServiceRequest {
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
  completed: "Hoàn tất",
};

const STATUS_VARIANT: Record<Status, "default" | "secondary" | "outline"> = {
  new: "default",
  contacted: "secondary",
  completed: "outline",
};

const PACKAGE_LABEL: Record<string, string> = {
  standard: "Standard",
  advanced: "Advanced AI & Data",
};

const ServiceRequestsTab = () => {
  const [rows, setRows] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Không tải được danh sách đơn đặt hàng");
    } else {
      setRows((data || []) as ServiceRequest[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: Status) => {
    const prev = rows;
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    const { error } = await supabase
      .from("service_requests")
      .update({ status })
      .eq("id", id);
    if (error) {
      setRows(prev);
      toast.error("Cập nhật trạng thái thất bại");
    } else {
      toast.success("Đã cập nhật trạng thái");
    }
  };

  const counts = {
    new: rows.filter((r) => r.status === "new").length,
    contacted: rows.filter((r) => r.status === "contacted").length,
    completed: rows.filter((r) => r.status === "completed").length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Đơn Đặt Hàng Web EdTech
          </CardTitle>
          <div className="mt-2 flex gap-2 flex-wrap">
            <Badge variant="default">Mới: {counts.new}</Badge>
            <Badge variant="secondary">Đã liên hệ: {counts.contacted}</Badge>
            <Badge variant="outline">Hoàn tất: {counts.completed}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Tải lại
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Chưa có đơn đặt hàng nào.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Môn dạy</TableHead>
                  <TableHead>Gói</TableHead>
                  <TableHead>Yêu cầu</TableHead>
                  <TableHead className="w-[160px]">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("vi-VN", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{r.teacher_name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-xs">
                        <a href={`mailto:${r.email}`} className="flex items-center gap-1 text-primary hover:underline">
                          <Mail className="w-3 h-3" /> {r.email}
                        </a>
                        <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-foreground hover:underline">
                          <Phone className="w-3 h-3" /> {r.phone}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{r.subject_taught || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={r.selected_package === "advanced" ? "default" : "secondary"}>
                        {PACKAGE_LABEL[r.selected_package] || r.selected_package}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[260px]">
                      <div className="line-clamp-3 whitespace-pre-wrap">
                        {r.special_requirements || "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={r.status}
                        onValueChange={(v) => updateStatus(r.id, v as Status)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue>
                            <Badge variant={STATUS_VARIANT[r.status]} className="font-normal">
                              {STATUS_LABEL[r.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Mới</SelectItem>
                          <SelectItem value="contacted">Đã liên hệ</SelectItem>
                          <SelectItem value="completed">Hoàn tất</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceRequestsTab;
