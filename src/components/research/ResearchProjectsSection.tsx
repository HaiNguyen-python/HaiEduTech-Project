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
  Users,
  RefreshCw,
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
 *  - Project-specific visualisations (synthetic baseline + LIVE aggregation
 *    of community responses, refreshed every time the tab is opened or the
 *    user submits a new answer).
 * All copy and comments are in English.
 */

type ResearchProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
};

const ROLE_OPTIONS = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher / Educator" },
  { value: "researcher", label: "Researcher" },
  { value: "engineer", label: "EdTech Engineer / PM" },
  { value: "parent", label: "Parent" },
  { value: "general", label: "Other" },
];

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(142 71% 45%)",
  "hsl(38 92% 50%)",
  "hsl(280 65% 60%)",
  "hsl(0 84% 60%)",
  "hsl(190 80% 50%)",
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
          <h2 className="text-2xl font-bold">Research Projects · Active Studies</h2>
          <p className="text-sm text-muted-foreground">
            Choose a topic to take its dedicated survey and watch community responses
            visualise in real time alongside the synthetic baseline.
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
            No active research projects yet.
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
                    View details & take the survey
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

  // Bumped after each successful submission so the live viz refetches.
  const [refreshKey, setRefreshKey] = useState(0);

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
                  Take the survey
                </TabsTrigger>
                <TabsTrigger value="viz" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Data visualisation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="survey" className="mt-4">
                <SurveyForm
                  projectId={project.id}
                  config={config}
                  onSubmitted={() => setRefreshKey((k) => k + 1)}
                />
              </TabsContent>

              <TabsContent value="viz" className="mt-4">
                <VizPanel
                  projectId={project.id}
                  config={config}
                  refreshKey={refreshKey}
                />
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
      toast.error("Please select your role.");
      return;
    }
    for (const q of config.questions) {
      if (
        (q.type === "radio" || q.type === "select") &&
        q.required &&
        !answers[q.key]
      ) {
        toast.error(`Please answer: ${q.label}`);
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
        "Thanks for contributing to this research topic! Your response is now in the live data."
      );
      // Refresh live aggregation; keep the dialog open so the user can switch to the viz tab.
      onSubmitted();
      setAnswers({});
      setRole("");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
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
        <Label htmlFor="role">Your role *</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select your role..." />
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
          Submit response
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
            <SelectValue placeholder="Choose..." />
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

/**
 * Build live response charts directly from `research_survey_responses`.
 * For every categorical / scale question we produce a distribution chart so
 * the visualisation updates the moment a new participant submits.
 */
type LiveChart = {
  question: string;
  kind: "bar" | "pie";
  data: Array<{ name: string; value: number }>;
};

const buildLiveCharts = (
  config: ProjectConfig,
  responses: Array<{ user_role: string; answers: Record<string, any> }>
): { charts: LiveChart[]; roleBreakdown: LiveChart } => {
  const charts: LiveChart[] = [];

  for (const q of config.questions) {
    if (q.type === "radio" || q.type === "select") {
      const counts = new Map<string, number>();
      for (const r of responses) {
        const v = r.answers?.[q.key];
        if (typeof v === "string" && v) counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      if (counts.size === 0) continue;
      const labelMap = new Map(q.options.map((o) => [o.value, o.label]));
      charts.push({
        question: q.label,
        kind: "pie",
        data: Array.from(counts.entries()).map(([k, v]) => ({
          name: labelMap.get(k) ?? k,
          value: v,
        })),
      });
    } else if (q.type === "checkbox") {
      const counts = new Map<string, number>();
      for (const r of responses) {
        const arr = r.answers?.[q.key];
        if (Array.isArray(arr)) {
          for (const v of arr) {
            if (typeof v === "string") counts.set(v, (counts.get(v) ?? 0) + 1);
          }
        }
      }
      if (counts.size === 0) continue;
      const labelMap = new Map(q.options.map((o) => [o.value, o.label]));
      charts.push({
        question: q.label,
        kind: "bar",
        data: Array.from(counts.entries()).map(([k, v]) => ({
          name: labelMap.get(k) ?? k,
          value: v,
        })),
      });
    } else if (q.type === "scale" || q.type === "slider" || q.type === "number") {
      const counts = new Map<number, number>();
      for (const r of responses) {
        const v = r.answers?.[q.key];
        if (typeof v === "number") counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      if (counts.size === 0) continue;
      const sorted = Array.from(counts.entries()).sort((a, b) => a[0] - b[0]);
      charts.push({
        question: q.label,
        kind: "bar",
        data: sorted.map(([k, v]) => ({ name: String(k), value: v })),
      });
    }
  }

  const roleCounts = new Map<string, number>();
  for (const r of responses) {
    if (r.user_role) {
      roleCounts.set(r.user_role, (roleCounts.get(r.user_role) ?? 0) + 1);
    }
  }
  const roleLabel = new Map(ROLE_OPTIONS.map((o) => [o.value, o.label]));
  const roleBreakdown: LiveChart = {
    question: "Respondent roles",
    kind: "pie",
    data: Array.from(roleCounts.entries()).map(([k, v]) => ({
      name: roleLabel.get(k) ?? k,
      value: v,
    })),
  };

  return { charts, roleBreakdown };
};

const VizPanel = ({
  projectId,
  config,
  refreshKey,
}: {
  projectId: string;
  config: ProjectConfig;
  refreshKey: number;
}) => {
  const [responses, setResponses] = useState<
    Array<{ user_role: string; answers: Record<string, any> }>
  >([]);
  const [loadingResp, setLoadingResp] = useState(true);

  const loadResponses = async () => {
    setLoadingResp(true);
    const { data, error } = await supabase
      .from("research_survey_responses")
      .select("user_role,answers")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (!error) {
      setResponses(
        (data ?? []).map((r: any) => ({
          user_role: r.user_role ?? "",
          answers: (r.answers ?? {}) as Record<string, any>,
        }))
      );
    }
    setLoadingResp(false);
  };

  useEffect(() => {
    loadResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, refreshKey]);

  const { charts: liveCharts, roleBreakdown } = useMemo(
    () => buildLiveCharts(config, responses),
    [config, responses]
  );

  return (
    <div className="space-y-6">
      {/* Live community responses — appears as soon as data is submitted. */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold">
              Live community responses · n = {responses.length}
            </h4>
          </div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={loadResponses}
            className="gap-1.5 h-8"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingResp ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {responses.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-sm text-muted-foreground text-center">
              Be the first to contribute — submit the survey and your answer will
              appear here instantly.
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            <LiveChartCard chart={roleBreakdown} />
            {liveCharts.map((c, i) => (
              <LiveChartCard key={i} chart={c} />
            ))}
          </div>
        )}
      </section>

      {/* Synthetic baseline reference charts. */}
      {config.charts.length > 0 && (
        <section>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
            Baseline (synthetic reference data)
          </h4>
          <div className="grid lg:grid-cols-2 gap-4">
            {config.charts.map((chart, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="text-sm font-semibold mb-3">{chart.title}</div>
                  <ResponsiveContainer width="100%" height={240}>
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
                    ) : chart.kind === "groupedBar" ? (
                      <BarChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        {chart.series.map((s) => (
                          <Bar
                            key={s.key}
                            dataKey={s.key}
                            name={s.label}
                            fill={s.color ?? "hsl(var(--primary))"}
                            radius={[6, 6, 0, 0]}
                          />
                        ))}
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
                    ) : chart.kind === "multiLine" ? (
                      <LineChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey={chart.xKey} tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: 11 }} />
                        {chart.series.map((s) => (
                          <Line
                            key={s.key}
                            type="monotone"
                            dataKey={s.key}
                            name={s.label}
                            stroke={s.color ?? "hsl(var(--primary))"}
                            strokeWidth={2.5}
                            dot={{ r: 2 }}
                          />
                        ))}
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
                          outerRadius={75}
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
        </section>
      )}

      <Card className="border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Key insights
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

const LiveChartCard = ({ chart }: { chart: LiveChart }) => {
  if (chart.data.length === 0) return null;
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-semibold mb-3">{chart.question}</div>
        <ResponsiveContainer width="100%" height={220}>
          {chart.kind === "pie" ? (
            <PieChart>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Pie
                data={chart.data}
                dataKey="value"
                nameKey="name"
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
          ) : (
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResearchProjectsSection;
