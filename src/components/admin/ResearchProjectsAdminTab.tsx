import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Loader2,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  FlaskConical,
  Power,
  PowerOff,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

/**
 * Admin tab — manage research projects and review per-project responses.
 * Allows Teacher Hai to add new topics, toggle active state, and export CSV.
 */

type ResearchProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  is_active: boolean;
  created_at: string;
};

type SurveyResponse = {
  id: string;
  project_id: string;
  user_role: string;
  answers: Record<string, any>;
  created_at: string;
};

const CATEGORIES = [
  "Language Learning",
  "AI Assistant",
  "Data Analytics",
  "Pedagogy",
  "Behavioural Science",
  "General",
];

const ResearchProjectsAdminTab = () => {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewProject, setViewProject] = useState<ResearchProject | null>(null);

  // New project form state
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Language Learning");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const [p, r] = await Promise.all([
      supabase
        .from("research_projects")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("research_survey_responses")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2000),
    ]);
    if (p.error) toast.error("Không tải được đề tài.");
    else setProjects(p.data ?? []);
    if (r.error) toast.error("Không tải được phản hồi.");
    else
      setResponses(
        (r.data ?? []).map((x: any) => ({
          ...x,
          answers: x.answers ?? {},
        }))
      );
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const countByProject = useMemo(() => {
    const m: Record<string, number> = {};
    responses.forEach((r) => {
      m[r.project_id] = (m[r.project_id] ?? 0) + 1;
    });
    return m;
  }, [responses]);

  const createProject = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề.");
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("research_projects").insert({
      title: title.trim(),
      description: description.trim(),
      category,
    });
    setCreating(false);
    if (error) {
      toast.error("Tạo đề tài thất bại.");
      return;
    }
    toast.success("Đã tạo đề tài mới ✨");
    setTitle("");
    setDescription("");
    setCategory("Language Learning");
    setShowForm(false);
    load();
  };

  const toggleActive = async (p: ResearchProject) => {
    const { error } = await supabase
      .from("research_projects")
      .update({ is_active: !p.is_active })
      .eq("id", p.id);
    if (error) {
      toast.error("Cập nhật thất bại.");
      return;
    }
    load();
  };

  const deleteProject = async (p: ResearchProject) => {
    if (
      !confirm(
        `Xoá đề tài "${p.title}"? Mọi phản hồi liên quan cũng sẽ bị xoá.`
      )
    )
      return;
    const { error } = await supabase
      .from("research_projects")
      .delete()
      .eq("id", p.id);
    if (error) toast.error("Xoá thất bại.");
    else {
      toast.success("Đã xoá đề tài.");
      load();
    }
  };

  // CSV export for a specific project
  const downloadCSV = (project: ResearchProject) => {
    const rows = responses.filter((r) => r.project_id === project.id);
    if (rows.length === 0) {
      toast.info("Đề tài này chưa có phản hồi.");
      return;
    }
    // Collect all answer keys
    const keys = new Set<string>();
    rows.forEach((r) => Object.keys(r.answers ?? {}).forEach((k) => keys.add(k)));
    const answerKeys = Array.from(keys);
    const header = ["id", "created_at", "user_role", ...answerKeys];
    const lines = rows.map((r) =>
      [
        r.id,
        r.created_at,
        r.user_role,
        ...answerKeys.map((k) => {
          const v = (r.answers ?? {})[k];
          if (v == null) return "";
          if (Array.isArray(v)) return v.join(" | ");
          if (typeof v === "object") return JSON.stringify(v);
          return String(v);
        }),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""').replace(/\n/g, " ")}"`)
        .join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research_${project.category.replace(/\s+/g, "_")}_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewResponses = useMemo(
    () =>
      viewProject
        ? responses.filter((r) => r.project_id === viewProject.id)
        : [],
    [viewProject, responses]
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FlaskConical className="w-5 h-5 text-primary" />
              EdTech Research Management
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={load} className="gap-1.5">
                <RefreshCw className="w-4 h-4" /> Reload
              </Button>
              <Button
                size="sm"
                onClick={() => setShowForm((s) => !s)}
                className="gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add New Research Project
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showForm && (
            <Card className="border-primary/40 bg-primary/5">
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tên đề tài nghiên cứu"
                    maxLength={300}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tóm tắt mục tiêu, phạm vi, phương pháp..."
                    rows={3}
                    maxLength={1500}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowForm(false)}
                  >
                    Huỷ
                  </Button>
                  <Button size="sm" disabled={creating} onClick={createProject}>
                    {creating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Tạo đề tài"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[760px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Đề tài</TableHead>
                  <TableHead className="w-[140px]">Category</TableHead>
                  <TableHead className="w-[100px] text-center">Phản hồi</TableHead>
                  <TableHead className="w-[110px]">Trạng thái</TableHead>
                  <TableHead className="w-[260px] text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      <Loader2 className="w-5 h-5 animate-spin inline" />
                    </TableCell>
                  </TableRow>
                ) : projects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-10"
                    >
                      Chưa có đề tài nào.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium">{p.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2 max-w-md">
                          {p.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{p.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {countByProject[p.id] ?? 0}
                      </TableCell>
                      <TableCell>
                        {p.is_active ? (
                          <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/30 border dark:text-emerald-300">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Hidden</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => setViewProject(p)}
                          >
                            <Eye className="w-3.5 h-3.5" /> Xem
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => downloadCSV(p)}
                          >
                            <Download className="w-3.5 h-3.5" /> CSV
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1"
                            onClick={() => toggleActive(p)}
                          >
                            {p.is_active ? (
                              <PowerOff className="w-3.5 h-3.5" />
                            ) : (
                              <Power className="w-3.5 h-3.5" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-destructive"
                            onClick={() => deleteProject(p)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Per-project responses viewer */}
      <Dialog
        open={!!viewProject}
        onOpenChange={(o) => !o && setViewProject(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base md:text-lg">
                  Responses · {viewProject.title}
                </DialogTitle>
              </DialogHeader>
              <div className="text-xs text-muted-foreground mb-2">
                Tổng: {viewResponses.length} phản hồi
              </div>
              <div className="space-y-3">
                {viewResponses.length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-10">
                    Chưa có phản hồi nào.
                  </div>
                )}
                {viewResponses.map((r) => (
                  <Card key={r.id}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{r.user_role}</Badge>
                        <span>{new Date(r.created_at).toLocaleString("vi-VN")}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                        {Object.entries(r.answers ?? {}).map(([k, v]) => (
                          <div key={k} className="break-words">
                            <span className="text-muted-foreground">{k}:</span>{" "}
                            <span className="font-medium">
                              {Array.isArray(v)
                                ? v.join(", ")
                                : typeof v === "object"
                                ? JSON.stringify(v)
                                : String(v)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  size="sm"
                  onClick={() => downloadCSV(viewProject)}
                  className="gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download CSV
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchProjectsAdminTab;
