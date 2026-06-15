import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import {
  FlaskConical,
  Loader2,
  Send,
  ArrowRight,
  ClipboardList,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  getProjectConfig,
  type ProjectConfig,
  type SurveyQuestion,
} from "@/data/researchProjectConfigs";

/**
 * Research Project Framework
 * Lists active research projects from `research_projects`.
 * Each project opens a dialog with two tabs:
 *  - Project-specific survey (writes to `research_survey_responses`)
 *  - Project-specific data visualisations
 * All comments in English per project conventions.
 */

type ResearchProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
};

const ROLE_OPTIONS = [
  { value: "student", label: "Học sinh" },
  { value: "teacher", label: "Giáo viên" },
  { value: "parent", label: "Phụ huynh" },
  { value: "general", label: "Khác" },
];

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(142 71% 45%)",
  "hsl(38 92% 50%)",
  "hsl(280 65% 60%)",
  "hsl(0 84% 60%)",
];

export const ResearchProjectsSection = () => {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<ResearchProject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("research_projects")
        .select("id,title,description,category,created_at")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (!error) setProjects(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-emerald-500/15 text-primary">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Research Projects · Đề tài đang triển khai</h2>
          <p className="text-sm text-muted-foreground">
            Chọn đề tài để tham gia khảo sát chuyên biệt và xem trực quan hoá dữ liệu.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có đề tài nào được kích hoạt.
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
                <CardContent className="p-5 md:p-6 flex flex-col h-full">
                  <Badge variant="outline" className="self-start mb-3">
                    {p.category}
                  </Badge>
                  <h3 className="text-lg md:text-xl font-semibold leading-snug mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.description}
                  </p>
                  <Button
                    onClick={() => setActiveProject(p)}
                    className="mt-4 self-start gap-2 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:opacity-95"
                  >
                    Xem chi tiết & tham gia khảo sát
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <ProjectDetailDialog
        project={activeProject}
        onOpenChange={(open) => !open && setActiveProject(null)}
      />
    </section>
  );
};

const ProjectDetailDialog = ({
  project,
  onOpenChange,
}: {
  project: ResearchProject | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const config = useMemo<ProjectConfig | null>(
    () =>
      project
        ? getProjectConfig({
            title: project.title,
            description: project.description,
            category: project.category,
          })
        : null,
    [project]
  );

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {project && config && (
          <>
            <DialogHeader>
              <Badge variant="outline" className="self-start mb-1">
                {project.category}
              </Badge>
              <DialogTitle className="text-lg md:text-xl leading-snug">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="survey" className="mt-2">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="survey" className="gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Tham gia khảo sát
                </TabsTrigger>
                <TabsTrigger value="viz" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Trực quan hoá dữ liệu
                </TabsTrigger>
              </TabsList>

              <TabsContent value="survey" className="mt-4">
                <SurveyForm
                  projectId={project.id}
                  config={config}
                  onSubmitted={() => onOpenChange(false)}
                />
              </TabsContent>

              <TabsContent value="viz" className="mt-4">
                <VizPanel config={config} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const SurveyForm = ({
  projectId,
  config,
  onSubmitted,
}: {
  projectId: string;
  config: ProjectConfig;
  onSubmitted: () => void;
}) => {
  const [role, setRole] = useState("");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (key: string, value: string) => {
    setAnswers((prev) => {
      const arr: string[] = Array.isArray(prev[key]) ? prev[key] : [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!role) {
      toast.error("Vui lòng chọn vai trò của bạn.");
      return;
    }
    // Validate required questions
    for (const q of config.questions) {
      if (
        (q.type === "radio" || q.type === "select") &&
        q.required &&
        !answers[q.key]
      ) {
        toast.error(`Vui lòng trả lời: ${q.label}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("research_survey_responses")
        .insert({
          project_id: projectId,
          user_role: role,
          answers,
        });
      if (error) throw error;
      toast.success(
        "Cảm ơn bạn đã đóng góp insight cho đề tài nghiên cứu này! 🌿"
      );
      onSubmitted();
    } catch (err) {
      console.error(err);
      toast.error("Gửi thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="font-semibold">{config.surveyTitle}</h3>
        {config.surveyIntro && (
          <p className="text-xs text-muted-foreground mt-1">
            {config.surveyIntro}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Vai trò của bạn *</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Chọn vai trò..." />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {config.questions.map((q) => (
        <QuestionField
          key={q.key}
          q={q}
          value={answers[q.key]}
          onChange={(v) => setAnswer(q.key, v)}
          onToggle={(v) => toggleMulti(q.key, v)}
        />
      ))}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          className="gap-2 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:opacity-95"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Gửi phản hồi
        </Button>
      </div>
    </form>
  );
};

const QuestionField = ({
  q,
  value,
  onChange,
  onToggle,
}: {
  q: SurveyQuestion;
  value: any;
  onChange: (v: any) => void;
  onToggle: (v: string) => void;
}) => {
  if (q.type === "select") {
    return (
      <div className="space-y-2">
        <Label>{q.label}{q.required && " *"}</Label>
        <Select value={value ?? ""} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn..." />
          </SelectTrigger>
          <SelectContent>
            {q.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
  if (q.type === "radio") {
    return (
      <div className="space-y-2">
        <Label>{q.label}{q.required && " *"}</Label>
        <RadioGroup value={value ?? ""} onValueChange={onChange} className="space-y-1.5">
          {q.options.map((o) => (
            <div key={o.value} className="flex items-center gap-2">
              <RadioGroupItem value={o.value} id={`${q.key}-${o.value}`} />
              <Label htmlFor={`${q.key}-${o.value}`} className="font-normal cursor-pointer">
                {o.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }
  if (q.type === "checkbox") {
    const arr: string[] = Array.isArray(value) ? value : [];
    return (
      <div className="space-y-2">
        <Label>{q.label}</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {q.options.map((o) => (
            <label
              key={o.value}
              className="flex items-start gap-2 p-2 rounded-md border bg-card/40 hover:bg-secondary/40 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={arr.includes(o.value)}
                onCheckedChange={() => onToggle(o.value)}
              />
              <span className="text-sm leading-snug">{o.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  if (q.type === "scale") {
    return (
      <div className="space-y-2">
        <Label>{q.label}</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-20">{q.minLabel}</span>
          <div className="flex gap-1 flex-1 justify-center">
            {Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i).map((n) => {
              const selected = value === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => onChange(n)}
                  className={`w-9 h-9 rounded-full border text-sm font-medium transition-all ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary scale-110"
                      : "bg-background hover:bg-secondary"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-muted-foreground w-20 text-right">{q.maxLabel}</span>
        </div>
      </div>
    );
  }
  if (q.type === "slider") {
    const v = typeof value === "number" ? value : q.min;
    return (
      <div className="space-y-2">
        <Label>{q.label}</Label>
        <input
          type="range"
          min={q.min}
          max={q.max}
          step={q.step ?? 1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{q.min}{q.unit ?? ""}</span>
          <span className="font-semibold text-primary">{v}{q.unit ?? ""}</span>
          <span>{q.max}{q.unit ?? ""}</span>
        </div>
      </div>
    );
  }
  if (q.type === "number") {
    return (
      <div className="space-y-2">
        <Label>{q.label}</Label>
        <Input
          type="number"
          value={value ?? ""}
          min={q.min}
          max={q.max}
          placeholder={q.placeholder}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>
    );
  }
  // textarea
  return (
    <div className="space-y-2">
      <Label>{q.label}</Label>
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        maxLength={q.maxLength}
        rows={3}
      />
    </div>
  );
};


const VizPanel = ({ config }: { config: ProjectConfig }) => {
  if (config.charts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-sm text-muted-foreground text-center">
          Chưa có biểu đồ trực quan cho đề tài này.
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {config.charts.map((chart, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="text-sm font-semibold mb-3">{chart.title}</div>
              <ResponsiveContainer width="100%" height={220}>
                {chart.kind === "bar" ? (
                  <BarChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar
                      dataKey={chart.dataKey}
                      fill="hsl(var(--primary))"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                ) : chart.kind === "line" ? (
                  <LineChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={chart.dataKey}
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                ) : (
                  <PieChart>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Pie
                      data={chart.data}
                      dataKey={chart.dataKey}
                      nameKey={chart.nameKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={{ fontSize: 10 }}
                    >
                      {chart.data.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Insight nổi bật
          </div>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
            {config.insights.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchProjectsSection;
