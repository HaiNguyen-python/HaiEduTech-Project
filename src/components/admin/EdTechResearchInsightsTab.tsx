import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Loader2, Search, FlaskConical, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Admin tab — aggregated view of EdTech Innovation Survey responses.
 * Allows Teacher Hai to read, filter and export raw insight inputs.
 */

type Insight = {
  id: string;
  user_role: string;
  preferred_tools: string[] | null;
  pain_points: string | null;
  feedback: string | null;
  contact_email: string | null;
  created_at: string;
};

const roleLabel: Record<string, string> = {
  student: "Học sinh",
  teacher: "Giáo viên",
  parent: "Phụ huynh",
};

const EdTechResearchInsightsTab = () => {
  const [rows, setRows] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("edtech_research_insights")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error("Không tải được dữ liệu insight.");
    } else {
      setRows(
        (data ?? []).map((r: any) => ({
          ...r,
          preferred_tools: Array.isArray(r.preferred_tools)
            ? r.preferred_tools
            : [],
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [
        r.user_role,
        r.pain_points ?? "",
        r.feedback ?? "",
        (r.preferred_tools ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [rows, q]);

  const stats = useMemo(() => {
    const byRole: Record<string, number> = {};
    const byTool: Record<string, number> = {};
    rows.forEach((r) => {
      byRole[r.user_role] = (byRole[r.user_role] ?? 0) + 1;
      (r.preferred_tools ?? []).forEach((t) => {
        byTool[t] = (byTool[t] ?? 0) + 1;
      });
    });
    return { byRole, byTool };
  }, [rows]);

  const downloadCSV = () => {
    const header = [
      "id",
      "created_at",
      "user_role",
      "preferred_tools",
      "pain_points",
      "feedback",
    ];
    const lines = filtered.map((r) =>
      [
        r.id,
        r.created_at,
        r.user_role,
        (r.preferred_tools ?? []).join(" | "),
        (r.pain_points ?? "").replace(/\n/g, " "),
        (r.feedback ?? "").replace(/\n/g, " "),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edtech_research_insights_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FlaskConical className="w-5 h-5 text-primary" />
            EdTech Research Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-md bg-secondary/40 border">
              <div className="text-xs text-muted-foreground">Tổng phản hồi</div>
              <div className="text-2xl font-bold">{rows.length}</div>
            </div>
            <div className="p-3 rounded-md bg-secondary/40 border">
              <div className="text-xs text-muted-foreground">Theo vai trò</div>
              <div className="text-sm flex flex-wrap gap-1.5 mt-1">
                {Object.entries(stats.byRole).map(([k, v]) => (
                  <Badge key={k} variant="outline">
                    {roleLabel[k] ?? k}: {v}
                  </Badge>
                ))}
                {Object.keys(stats.byRole).length === 0 && (
                  <span className="text-muted-foreground text-xs">Chưa có dữ liệu</span>
                )}
              </div>
            </div>
            <div className="p-3 rounded-md bg-secondary/40 border">
              <div className="text-xs text-muted-foreground">Công cụ được chọn nhiều</div>
              <div className="text-sm flex flex-wrap gap-1.5 mt-1">
                {Object.entries(stats.byTool)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([k, v]) => (
                    <Badge key={k} variant="secondary">
                      {k} · {v}
                    </Badge>
                  ))}
                {Object.keys(stats.byTool).length === 0 && (
                  <span className="text-muted-foreground text-xs">Chưa có dữ liệu</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm theo nội dung, vai trò, công cụ..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm" onClick={load} className="gap-1.5">
              <RefreshCw className="w-4 h-4" /> Reload
            </Button>
            <Button size="sm" onClick={downloadCSV} className="gap-1.5">
              <Download className="w-4 h-4" /> CSV
            </Button>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">Thời gian</TableHead>
                  <TableHead className="w-[110px]">Vai trò</TableHead>
                  <TableHead>Công cụ ưu tiên</TableHead>
                  <TableHead>Pain point</TableHead>
                  <TableHead>Feedback</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <Loader2 className="w-5 h-5 animate-spin inline" />
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-10"
                    >
                      Chưa có insight phù hợp.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {roleLabel[r.user_role] ?? r.user_role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(r.preferred_tools ?? []).map((t) => (
                            <Badge key={t} variant="secondary" className="text-[10px]">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[260px] whitespace-pre-wrap text-sm">
                        {r.pain_points || <span className="text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="max-w-[260px] whitespace-pre-wrap text-sm">
                        {r.feedback || <span className="text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EdTechResearchInsightsTab;
