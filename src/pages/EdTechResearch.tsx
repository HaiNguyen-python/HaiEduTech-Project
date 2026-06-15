import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  FlaskConical,
  FileText,
  Sparkles,
  Brain,
  TrendingUp,
  Users,
  GraduationCap,
  Send,
  Loader2,
  BookOpen,
  Microscope,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import ResearchProjectsSection from "@/components/research/ResearchProjectsSection";

/**
 * EdTech Research Hub
 * Public academic showcase + qualitative insight collection widget.
 * All comments in English per project conventions.
 */

type Paper = {
  title: string;
  topic: string;
  status: "Preprint" | "Ongoing" | "Published";
  abstract: string;
  year: string;
};

const PAPERS: Paper[] = [
  {
    title:
      "Machine Learning for Early-Warning Detection of At-Risk Learners",
    topic: "Learning Analytics · Early-Warning ML",
    status: "Preprint",
    year: "2026",
    abstract:
      "A gradient-boosting classifier fuses behavioural signals (logins, streaks, vocabulary accuracy) to predict the probability of disengagement within 14 days, enabling timely teacher intervention.",
  },
  {
    title:
      "Optimising LLM Feedback Loops for Language Pedagogy",
    topic: "LLM Pedagogy · Human-in-the-loop",
    status: "Ongoing",
    year: "2026",
    abstract:
      "End-of-lesson micro-surveys feed a lightweight RLHF pipeline that progressively improves prompt fit. The paper proposes an evaluation framework for small-cohort language classrooms.",
  },
  {
    title:
      "Reinforcement Learning for Adaptive English Curriculum Personalisation",
    topic: "Adaptive Learning · Deep RL",
    status: "Preprint",
    year: "2026",
    abstract:
      "An agent selects the next lesson conditioned on a skill profile, using a composite reward that blends short-term scores and longer-term retention, benchmarked against a linear baseline.",
  },
];

// Aggregated behavioural insight dataset (anonymised, illustrative).
const RETENTION = [
  { week: "W1", retention: 100 },
  { week: "W2", retention: 78 },
  { week: "W3", retention: 64 },
  { week: "W4", retention: 55 },
  { week: "W6", retention: 49 },
  { week: "W8", retention: 44 },
  { week: "W12", retention: 41 },
];

const AI_INTERACTIONS = [
  { feature: "AI Chat", sessions: 4820 },
  { feature: "AI Grading", sessions: 3110 },
  { feature: "Speaking Coach", sessions: 2640 },
  { feature: "Dictation", sessions: 1980 },
  { feature: "Notebook", sessions: 1520 },
];

const TOOL_OPTIONS = [
  "AI chatbot for error correction",
  "Progress tracking dashboard",
  "Automated attendance / payroll",
  "Gamified practice exercises",
  "Multimodal speaking coach",
  "RL-based adaptive curriculum",
];

const ROLE_OPTIONS = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "parent", label: "Parent" },
];

const insightSchema = z.object({
  user_role: z.enum(["student", "teacher", "parent"]),
  preferred_tools: z.array(z.string()).max(10),
  pain_points: z.string().trim().max(2000).optional().nullable(),
  feedback: z.string().trim().max(2000).optional().nullable(),
});

const statusColor: Record<Paper["status"], string> = {
  Preprint: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300",
  Ongoing: "bg-blue-500/15 text-blue-700 border-blue-500/30 dark:text-blue-300",
  Published: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
};


const EdTechResearch = () => {
  const [role, setRole] = useState<string>("");
  const [tools, setTools] = useState<string[]>([]);
  const [pain, setPain] = useState("");
  const [fb, setFb] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleTool = (tool: string) => {
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const parsed = insightSchema.safeParse({
      user_role: role,
      preferred_tools: tools,
      pain_points: pain || null,
      feedback: fb || null,
    });
    if (!parsed.success) {
      toast.error("Please select your role before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("edtech_research_insights")
        .insert({
          user_role: parsed.data.user_role,
          preferred_tools: parsed.data.preferred_tools,
          pain_points: parsed.data.pain_points,
          feedback: parsed.data.feedback,
        });
      if (error) throw error;

      toast.success(
        "Thanks for your contribution — HaiEduTech Lab values every insight that shapes EdTech research."
      );
      // Safely clear the form lock state after success
      setRole("");
      setTools([]);
      setPain("");
      setFb("");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>EdTech Research Hub | HaiEduTech</title>
        <meta
          name="description"
          content="Academic research hub by HaiEduTech: machine learning for early-warning, LLM feedback loops and reinforcement-learning curriculum personalisation."
        />
        <link rel="canonical" href="https://haiedutech.com/edtech-research" />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" />
            Academic Portfolio · HaiEduTech Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            EdTech Research
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A transparent academic space: active research papers, anonymised
            behavioural insights, and open surveys so the global community can
            help shape the future of education technology.
          </p>

        </motion.section>

        {/* Dynamic Research Project Framework */}
        <ResearchProjectsSection />

        {/* Pillar 1 — Papers */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Pillar 1 — Published & Ongoing Papers</h2>
              <p className="text-sm text-muted-foreground">
                Các bài nghiên cứu và tiểu luận của Hai Nguyen
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {PAPERS.map((p) => (
              <Card
                key={p.title}
                className="group hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="gap-1">
                      <Users className="w-3 h-3" /> Author: Hai Nguyen
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Brain className="w-3 h-3" /> Topic: {p.topic}
                    </Badge>
                    <Badge className={`gap-1 border ${statusColor[p.status]}`}>
                      <Sparkles className="w-3 h-3" /> {p.status}
                    </Badge>
                    <Badge variant="secondary">{p.year}</Badge>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {p.abstract}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Working paper · DOI pending</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pillar 2 — Insights & Trends */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Pillar 2 — EdTech User Insights & Trends</h2>
              <p className="text-sm text-muted-foreground">
                Xu hướng & thấu hiểu người dùng (anonymised, aggregated)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Active learners / month", value: "1,240", hint: "+18% MoM" },
              { label: "AI tutor sessions", value: "14.3K", hint: "Avg 6.2 min" },
              { label: "Week-4 retention", value: "55%", hint: "Baseline 32%" },
            ].map((kpi) => (
              <Card key={kpi.label}>
                <CardContent className="p-5">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {kpi.label}
                  </div>
                  <div className="text-3xl font-bold mt-1">{kpi.value}</div>
                  <div className="text-xs text-emerald-600 mt-1">{kpi.hint}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-primary" />
                  Student retention curve (12 weeks)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={RETENTION}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="retention"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  AI tutor interactions by feature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={AI_INTERACTIONS}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="feature" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 border-dashed">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-2">Top user pain points (qualitative)</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
                <li>Khó duy trì động lực sau tuần thứ 3 nếu không có nhắc nhở cá nhân hoá.</li>
                <li>Giáo viên cần báo cáo tự động để giảm 60% thời gian tổng hợp tiến độ.</li>
                <li>Học sinh muốn AI sửa lỗi nói tự nhiên hơn, kèm phát âm mẫu chậm.</li>
                <li>Phụ huynh cần dashboard ngắn gọn, không quá nhiều chỉ số kỹ thuật.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Research Gaps & Future Horizons */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-emerald-500/15 text-primary">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Khoảng Trống Nghiên Cứu & Định Hướng Tương Lai
              </h2>
              <p className="text-sm text-muted-foreground">
                Research Gaps · những chủ đề ngành EdTech vẫn còn thiếu và HaiEduTech Lab đang chủ động theo đuổi.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                idx: "Gap 01",
                title: "Bản địa hoá mô hình AI cho ngôn ngữ ít phổ biến",
                subtitle: "Minority Language AI Tuning",
                body: "Đa số nghiên cứu LLM hiện nay tập trung vào tiếng Anh. Cách các mô hình lớn xử lý phản hồi sư phạm cho tiếng Thụy Điển hoặc tiếng Phần Lan dành cho người Việt vẫn còn rất hạn chế và cần khung đánh giá riêng.",
              },
              {
                idx: "Gap 02",
                title: "Đạo đức dữ liệu & quyền riêng tư của học sinh nhỏ tuổi",
                subtitle: "Data Ethics in K-12 AI Learning",
                body: "Cần các giải pháp ẩn danh hoá (anonymization) dữ liệu hành vi đủ mạnh nhưng vẫn đảm bảo thuật toán AI Academy (lớp 6–12) dự đoán lộ trình học cá nhân chính xác và an toàn.",
              },
              {
                idx: "Gap 03",
                title: "Tác động dài hạn của AI lên Tư duy phản biện",
                subtitle: "Long-term Impact on Critical Thinking",
                body: "Đánh giá xem việc lạm dụng tra cứu từ điển và trả lời AI tức thời có làm giảm khả năng ghi nhớ sâu và tư duy ngôn ngữ chủ động của học viên trong 6–24 tháng hay không.",
              },
            ].map((g) => (
              <Card
                key={g.idx}
                className="relative overflow-hidden border-primary/15 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-emerald-500" />
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] tracking-wider border-primary/30 text-primary"
                    >
                      {g.idx}
                    </Badge>
                    <Microscope className="w-4 h-4 text-emerald-500/70" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold leading-snug">
                    {g.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wide text-primary/80 mt-1 mb-3">
                    {g.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {g.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pillar 3 — Insight Survey */}
        <section className="mb-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">EdTech Innovation Survey</h2>
              <p className="text-sm text-muted-foreground">
                Cỗ máy thu thập insight — đóng góp của bạn định hình lộ trình R&D.
              </p>
            </div>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Vai trò của bạn trên hệ thống</Label>
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

                  <div className="space-y-2">
                    <Label>Công cụ EdTech nào bạn thấy cần thiết nhất hiện nay?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {TOOL_OPTIONS.map((tool) => (
                        <label
                          key={tool}
                          className="flex items-start gap-2 p-2 rounded-md border bg-card/40 hover:bg-secondary/40 cursor-pointer transition-colors"
                        >
                          <Checkbox
                            checked={tools.includes(tool)}
                            onCheckedChange={() => toggleTool(tool)}
                          />
                          <span className="text-sm leading-snug">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pain">
                    Nỗi đau lớn nhất (Pain point) bạn gặp phải khi học hoặc dạy trực tuyến là gì?
                  </Label>
                  <Textarea
                    id="pain"
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="Ví dụ: khó theo dõi tiến độ học sinh hằng tuần..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fb">
                    Ý tưởng hoặc Feedback đóng góp để HaiEduTech cải thiện nền tảng
                  </Label>
                  <Textarea
                    id="fb"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="Chia sẻ ý tưởng của bạn..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="gap-2 bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:opacity-95"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Gửi insight
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EdTechResearch;
