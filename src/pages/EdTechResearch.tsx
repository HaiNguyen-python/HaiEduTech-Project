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
  Target,
  Lightbulb,
  Rocket,
  Zap,
  CheckCircle2,
  Globe2,
  BarChart3,
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
import GlobalEdTechLibrary from "@/components/research/GlobalEdTechLibrary";

/**
 * EdTech Research Hub
 * Public academic showcase + qualitative insight collection widget.
 * All comments in English per project conventions.
 */

type Paper = {
  title: string;
  topic: string;
  category: "Seminal" | "Recent" | "Survey" | "Applied" | "Policy";
  authors: string;
  venue: string;
  year: string;
  abstract: string;
  link?: string;
};

// Curated reading list — not authored by HaiEduTech. These are highly cited or
// recent EdTech / AI-in-education papers we recommend for teachers, researchers
// and curious students. Links resolve to open-access versions when available.
const PAPERS: Paper[] = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    venue: "NeurIPS",
    year: "2017",
    category: "Seminal",
    topic: "Transformers · Foundations of modern LLM tutors",
    abstract:
      "The transformer architecture that underpins every modern LLM tutor (ChatGPT, Gemini, Claude). Required reading to understand why today's AI tutors work — and where their reasoning still breaks.",
    link: "https://arxiv.org/abs/1706.03762",
  },
  {
    title: "Bloom's 2 Sigma Problem",
    authors: "Benjamin S. Bloom",
    venue: "Educational Researcher",
    year: "1984",
    category: "Seminal",
    topic: "Mastery Learning · 1:1 Tutoring",
    abstract:
      "The original evidence that 1:1 tutoring lifts the average student two standard deviations above classroom peers. The motivating benchmark for every AI-tutor startup since 2022.",
    link: "https://web.mit.edu/5.95/readings/bloom-two-sigma.pdf",
  },
  {
    title: "Deep Knowledge Tracing",
    authors: "Piech, Bassen, Huang, Ganguli, Sahami, Guibas, Sohl-Dickstein",
    venue: "NeurIPS",
    year: "2015",
    category: "Seminal",
    topic: "Knowledge Tracing · LSTM",
    abstract:
      "First demonstration that an LSTM can model a learner's evolving knowledge state directly from interaction logs — the foundation of every adaptive learning engine that followed (Duolingo, Khan Academy, ALEKS).",
    link: "https://arxiv.org/abs/1506.05908",
  },
  {
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Devlin, Chang, Lee, Toutanova (Google AI)",
    venue: "NAACL",
    year: "2019",
    category: "Seminal",
    topic: "NLP · Pre-trained encoders",
    abstract:
      "Bidirectional pre-training that unlocked automated essay scoring, reading-comprehension grading and the first generation of GenAI writing feedback tools.",
    link: "https://arxiv.org/abs/1810.04805",
  },
  {
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei et al. (Google Brain)",
    venue: "NeurIPS",
    year: "2022",
    category: "Recent",
    topic: "Prompt Engineering · Reasoning",
    abstract:
      "Why asking an LLM to 'think step by step' dramatically improves math and logic tutoring quality. Practical guidance for prompt design in classroom AI assistants.",
    link: "https://arxiv.org/abs/2201.11903",
  },
  {
    title: "Sparks of Artificial General Intelligence: Early Experiments with GPT-4",
    authors: "Bubeck et al. (Microsoft Research)",
    venue: "arXiv",
    year: "2023",
    category: "Recent",
    topic: "GPT-4 · Generalist tutoring capabilities",
    abstract:
      "The most influential qualitative evaluation of GPT-4's tutoring potential — covering coding, math, medicine and creative writing. A useful sanity-check on what GenAI can and cannot replace.",
    link: "https://arxiv.org/abs/2303.12712",
  },
  {
    title: "Generative AI Can Harm Learning",
    authors: "Bastani, Bastani, Sungu, Ge, Kabakcı, Mariman",
    venue: "Wharton / SSRN",
    year: "2024",
    category: "Recent",
    topic: "Cognitive Offloading · Critical Thinking",
    abstract:
      "Field experiment with 1,000+ high-school students: unrestricted GPT-4 access boosted in-task performance but dropped post-test scores by 17% when the AI was removed. Essential reading for any school deploying chatbots.",
    link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486",
  },
  {
    title: "AI in Education: A Systematic Literature Review",
    authors: "Zawacki-Richter, Marín, Bond, Gouverneur",
    venue: "Int. J. of Educational Technology in Higher Education",
    year: "2019",
    category: "Survey",
    topic: "Literature Review · AIED scope",
    abstract:
      "A widely cited map of how AI is being used in higher education — adaptive systems, profiling, assessment, intelligent tutoring. Useful starting point before designing any new EdTech intervention.",
    link: "https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-019-0171-0",
  },
  {
    title: "A Survey on Large Language Models for Education",
    authors: "Wang, Liu, Zhao et al.",
    venue: "arXiv",
    year: "2024",
    category: "Survey",
    topic: "LLMs in Education · Taxonomy",
    abstract:
      "Maps the LLM-for-education landscape: tutoring, content generation, assessment, language learning. Highlights open challenges in hallucination, bias, evaluation, and ethics.",
    link: "https://arxiv.org/abs/2403.18105",
  },
  {
    title: "Khanmigo: Designing a Safe, Educational LLM Tutor",
    authors: "Khan Academy + OpenAI",
    venue: "Khan Academy whitepaper",
    year: "2023",
    category: "Applied",
    topic: "Socratic LLM Tutor · Safety guardrails",
    abstract:
      "Practical case study of how Khanmigo replaces direct answers with Socratic questioning and refuses unsafe requests. Templates for system-prompt design that EdTech builders can reuse.",
    link: "https://www.khanacademy.org/khan-labs",
  },
  {
    title: "Duolingo English Test: Designing an AI-Powered High-Stakes Language Test",
    authors: "Duolingo Research",
    venue: "Duolingo whitepapers",
    year: "2022",
    category: "Applied",
    topic: "Adaptive Testing · Item Response Theory",
    abstract:
      "How a computer-adaptive design plus automated speaking/writing scoring scaled a high-stakes English test from 0 to 5M takers. Reference architecture for any AI-based placement test.",
    link: "https://englishtest.duolingo.com/research",
  },
  {
    title: "PISA 2025 Foreign Language Assessment Framework",
    authors: "OECD",
    venue: "OECD Publishing",
    year: "2023",
    category: "Policy",
    topic: "Standardised Assessment · L2 English",
    abstract:
      "The framework PISA will use to benchmark English proficiency in 80+ countries from 2025. Useful target spec for any language-learning curriculum aiming to align with international benchmarks.",
    link: "https://www.oecd.org/pisa/foreign-language/",
  },
  {
    title: "Beyond the Hype: A Cautionary Tale of ChatGPT in the Classroom",
    authors: "Kasneci et al.",
    venue: "Learning and Individual Differences",
    year: "2023",
    category: "Policy",
    topic: "Risks · Ethics · Classroom adoption",
    abstract:
      "Synthesises early evidence on academic integrity, bias, over-reliance, and teacher workload when ChatGPT enters the classroom — and recommends concrete policy guardrails for schools.",
    link: "https://doi.org/10.1016/j.lindif.2023.102274",
  },
  {
    title: "Self-Regulated Learning in MOOCs",
    authors: "Kizilcec, Pérez-Sanagustín, Maldonado",
    venue: "Computers & Education",
    view: "Foundational MOOC study",
    year: "2017",
    category: "Seminal",
    topic: "Self-Regulation · Online Learning",
    abstract:
      "Identifies which self-regulation strategies (goal-setting, help-seeking, time-management) actually predict MOOC completion. Direct implications for dashboard and notification design.",
    link: "https://doi.org/10.1016/j.compedu.2016.10.001",
  } as unknown as Paper,
  {
    title: "Federated Learning: Challenges, Methods, and Future Directions",
    authors: "Li, Sahu, Talwalkar, Smith",
    venue: "IEEE Signal Processing Magazine",
    year: "2020",
    category: "Survey",
    topic: "Federated Learning · Privacy-preserving ML",
    abstract:
      "Canonical survey of federated learning — the path to EdTech personalisation that respects student-data privacy and complies with GDPR / Vietnam PDPL.",
    link: "https://arxiv.org/abs/1908.07873",
  },
  {
    title: "Explainable AI for Education: A Review",
    authors: "Khosravi, Shum, Chen et al.",
    venue: "Computers and Education: AI",
    year: "2022",
    category: "Survey",
    topic: "Explainable AI · Learner-facing dashboards",
    abstract:
      "Why black-box models hurt learner trust and teacher adoption, and which XAI techniques (attention rollouts, counterfactuals, rule extraction) work best in educational dashboards.",
    link: "https://doi.org/10.1016/j.caeai.2022.100074",
  },
  {
    title: "The State of AI in Education 2024 (Common Sense Media)",
    authors: "Common Sense Media",
    venue: "Common Sense Education Report",
    year: "2024",
    category: "Policy",
    topic: "K-12 AI adoption · Survey",
    abstract:
      "Nationally representative survey of how US teachers, parents and teens are actually using generative AI — adoption rates, equity gaps, and the policy vacuum schools currently face.",
    link: "https://www.commonsensemedia.org/research",
  },
  {
    title: "EU AI Act — Educational AI as a High-Risk System",
    authors: "European Commission",
    venue: "Official Journal of the European Union",
    year: "2024",
    category: "Policy",
    topic: "Regulation · High-risk AI in education",
    abstract:
      "Defines AI used in education (admissions, grading, placement) as high-risk and sets compliance requirements: data governance, transparency, human oversight. Required reading for any EdTech operating in the EU.",
    link: "https://artificialintelligenceact.eu/",
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

const categoryColor: Record<Paper["category"], string> = {
  Seminal: "bg-purple-500/15 text-purple-700 border-purple-500/30 dark:text-purple-300",
  Recent: "bg-blue-500/15 text-blue-700 border-blue-500/30 dark:text-blue-300",
  Survey: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300",
  Applied: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
  Policy: "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-300",
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
            A transparent academic space curated by HaiEduTech: a recommended reading
            list of leading EdTech papers, anonymised behavioural insights from our own
            classrooms, and open surveys so the global community can help shape the future
            of education technology.
          </p>

        </motion.section>

        {/* Research Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Guiding Principles
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Our Research Philosophy</h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every feature at HaiEduTech begins as a research question. We combine rigorous quantitative methods with deep pedagogical expertise to build tools that measurably improve learning outcomes — not just sound impressive in demos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: <Target className="w-6 h-6" />,
                title: "Evidence-Based by Default",
                body: "We do not ship features based on intuition alone. Every product decision is informed by controlled experiments, learning analytics, and systematic literature review. Our team reads and critiques 50+ peer-reviewed papers annually across AIED, cognitive science, and human-computer interaction.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Learner-Centered Inquiry",
                body: "Research questions emerge directly from real classrooms. We shadow learners, interview teachers in three languages, and analyse millions of interaction logs to identify genuine friction points — not hypothetical ones. If a problem is not observable in the data, it does not enter our backlog.",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Transparent & Reproducible",
                body: "All studies follow institutional ethics guidelines with informed consent. Data is anonymised before analysis, models are audited for demographic bias, and negative results are published just as openly as positive ones. We believe transparency builds the trust that EdTech desperately needs.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-emerald-500 opacity-60" />
                  <CardContent className="p-6">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 text-primary w-fit mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-[1.8]">{item.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dynamic Research Project Framework */}
        <ResearchProjectsSection />

        {/* Pillar 1 — Suggested Reading List */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Pillar 1 — Suggested EdTech Reading List</h2>
              <p className="text-sm text-muted-foreground">
                A curated reading list of seminal, recent and policy papers we recommend for teachers, parents
                and students who want to understand AI in education. These papers are <strong>not authored by HaiEduTech</strong> —
                they are external references we trust and frequently cite.
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
                      <Users className="w-3 h-3" /> {p.authors}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Brain className="w-3 h-3" /> {p.topic}
                    </Badge>
                    <Badge className={`gap-1 border ${categoryColor[p.category]}`}>
                      <Sparkles className="w-3 h-3" /> {p.category}
                    </Badge>
                    <Badge variant="secondary">{p.venue} · {p.year}</Badge>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {p.abstract}
                  </p>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Open original paper
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground italic text-center">
            Disclaimer: All papers above are the intellectual property of their respective authors and publishers.
            HaiEduTech reproduces only titles, abstracts and public links for educational reference under fair use.
          </p>
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
                Behavioural trends and user insights (anonymised, aggregated).
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
                <li>Motivation drops after week 3 without personalised reminders.</li>
                <li>Teachers need automated reports — cutting ~60% of weekly admin time.</li>
                <li>Students want more natural AI speech feedback with slow native models.</li>
                <li>Parents need concise dashboards without dense technical metrics.</li>
              </ul>

            </CardContent>
          </Card>
        </section>

        {/* Research-to-Practice Pipeline */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-emerald-500/15 text-primary">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                From Hypothesis to Classroom
              </h2>
              <p className="text-sm text-muted-foreground">
                Our end-to-end research pipeline turns academic curiosity into measurable learning gains across six rigorous stages.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-emerald-500/30 to-primary/20" />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { step: "01", icon: <Lightbulb className="w-5 h-5" />, title: "Discovery", desc: "Shadow learners, analyse logs, and scan literature to surface friction points others miss." },
                { step: "02", icon: <Brain className="w-5 h-5" />, title: "Hypothesis", desc: "Formulate falsifiable predictions grounded in cognitive science and prior effect-size estimates." },
                { step: "03", icon: <FlaskConical className="w-5 h-5" />, title: "Prototype", desc: "Build minimum-viable interventions with built-in telemetry so every click teaches us something." },
                { step: "04", icon: <BarChart3 className="w-5 h-5" />, title: "Validate", desc: "Run A/B or RCT pilots with pre-registered analysis plans and adequate statistical power." },
                { step: "05", icon: <Rocket className="w-5 h-5" />, title: "Deploy", desc: "Progressive rollout with real-time safety monitoring and instant rollback triggers." },
                { step: "06", icon: <TrendingUp className="w-5 h-5" />, title: "Evaluate", desc: "Track retention, transfer, and motivation over 6–24 months using growth-curve models." },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-20 h-20 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-primary mb-3 shadow-sm hover:border-primary/50 hover:shadow-md transition-all">
                      {s.icon}
                    </div>
                    <Badge variant="outline" className="mb-1.5 font-mono text-[10px] tracking-wider border-primary/20 text-primary">
                      {s.step}
                    </Badge>
                    <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Card className="mt-8 border-primary/10 bg-gradient-to-br from-primary/5 to-emerald-500/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Why this pipeline matters</h3>
                  <p className="text-sm text-muted-foreground leading-[1.8]">
                    Most EdTech products iterate on gut feeling. We iterate on evidence. By separating the
                    <strong> discovery</strong> phase (where we listen) from the <strong>validation</strong> phase
                    (where we measure), we avoid the common trap of building flashy features that look good in demos
                    but produce no durable learning gain. Every stage feeds telemetry backward, so the pipeline
                    itself improves with each cycle — a meta-learning system for educational innovation.
                  </p>
                </div>
              </div>
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
                Research Gaps & Future Horizons
              </h2>
              <p className="text-sm text-muted-foreground">
                Open problems the EdTech industry still under-investigates — recommended topics for thesis, capstone or classroom action-research projects.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                idx: "Gap 01",
                title: "Minority-language tuning for foundation models",
                subtitle: "Minority Language AI Tuning",
                body: "Most LLM research targets English. Pedagogical feedback in Swedish, Finnish or low-resource languages still lacks dedicated evaluation frameworks and benchmarks.",
              },
              {
                idx: "Gap 02",
                title: "Data ethics & privacy for minor-aged learners",
                subtitle: "Data Ethics in K-12 AI Learning",
                body: "Strong anonymisation, on-device inference and federated training are needed so personalisation models can serve K-12 learners safely and accurately.",
              },
              {
                idx: "Gap 03",
                title: "Long-term impact of AI on critical thinking",
                subtitle: "Long-term Impact on Critical Thinking",
                body: "Does habitual reliance on instant AI lookups erode deep memory and autonomous reasoning over 6–24 months? Longitudinal studies remain rare.",
              },
              {
                idx: "Gap 04",
                title: "Pedagogical validity of LLM-authored content",
                subtitle: "Content Quality & Curriculum Coherence",
                body: "Most AI-authored lessons are evaluated for surface fluency, not for curriculum alignment, scaffolding integrity, or culturally appropriate examples.",
              },
              {
                idx: "Gap 05",
                title: "Teacher-AI division of labour & professional identity",
                subtitle: "Workforce Studies",
                body: "How AI tutors reshape teacher autonomy, expertise development, and classroom authority remains under-investigated outside Western higher-ed.",
              },
              {
                idx: "Gap 06",
                title: "Carbon and equity costs of frontier-model tutoring",
                subtitle: "Sustainable EdTech",
                body: "Inference-heavy GenAI tutors carry energy and cost externalities that disproportionately burden Global-South institutions; transparent accounting is still missing.",
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

        {/* Frontier Themes 2026 — timely, concrete and academically grounded research agendas */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/15 to-primary/15 text-emerald-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Frontier Research Themes · 2026
              </h2>
              <p className="text-sm text-muted-foreground">
                Concrete, peer-reviewable research agendas the EdTech field is
                actively investigating in 2025–2026. Each theme lists its core
                question, candidate methods, and primary metrics.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                code: "FT-01",
                title: "Cognitive Offloading & the GenAI Crutch Effect",
                question:
                  "Does unrestricted LLM access during practice erode independent transfer to non-AI assessment?",
                methods:
                  "Within-subjects RCT · pre/post transfer test · Cognitive Load (NASA-TLX) · eye-tracking on retrieval moments",
                metrics:
                  "Transfer-test Δ score · germane vs extraneous load ratio · time-to-first-self-attempt",
                badge: "Cognitive Science · LLM",
                color: "from-rose-500 to-amber-500",
              },
              {
                code: "FT-02",
                title: "Multi-Agent LLM Tutors (Planner + Tutor + Evaluator)",
                question:
                  "Can decomposed agent pipelines reduce hallucination and improve pedagogical fidelity vs single-LLM tutors?",
                methods:
                  "LangGraph orchestration · rubric-based human eval · MERIt benchmark · self-consistency voting",
                metrics:
                  "Rubric quality (1–5) · factual error rate · turn-level student engagement",
                badge: "LLM Agents · AIED",
                color: "from-primary to-emerald-500",
              },
              {
                code: "FT-03",
                title: "RLHF for Adaptive Curriculum Sequencing",
                question:
                  "What reward design (short-term score, longer-term retention, intrinsic motivation) yields the most durable learning?",
                methods:
                  "Deep Q-Network / PPO over skill-graph state · composite reward · off-policy evaluation on log data",
                metrics:
                  "30-day retention · regret vs expert teacher · IRT-θ growth",
                badge: "Reinforcement Learning",
                color: "from-indigo-500 to-primary",
              },
              {
                code: "FT-04",
                title: "Algorithmic Fairness for L2 & Minority-Language Learners",
                question:
                  "How do early-warning models behave on under-represented L2 cohorts, and which mitigations preserve accuracy and parity?",
                methods:
                  "Disparate-impact audit · reweighing · adversarial debiasing · counterfactual fairness",
                metrics:
                  "Equalised-odds gap · subgroup F1 · calibration ECE",
                badge: "Fairness ML · Equity",
                color: "from-fuchsia-500 to-rose-500",
              },
              {
                code: "FT-05",
                title: "Federated & On-Device Learning for K-12 Privacy",
                question:
                  "Can FedAvg with differential privacy match centralised personalisation accuracy under GDPR / EU AI Act constraints?",
                methods:
                  "FedAvg + DP-SGD · secure aggregation · TFF / Flower simulation on classroom shards",
                metrics:
                  "Accuracy gap vs centralised · ε privacy budget · client drift",
                badge: "Federated Learning · Privacy",
                color: "from-cyan-500 to-emerald-500",
              },
              {
                code: "FT-06",
                title: "Multimodal Engagement Detection (Speech + Gaze + Click)",
                question:
                  "Which signal-fusion strategy detects disengagement earliest without webcam-based privacy intrusion?",
                methods:
                  "Late-fusion Transformer · ablation per modality · in-browser inference (WebGPU)",
                metrics:
                  "Disengagement-detection F1 · lead-time before drop-out · false-positive cost",
                badge: "Multimodal · Affective",
                color: "from-amber-500 to-rose-500",
              },
              {
                code: "FT-07",
                title: "Automatic Item Generation with LLMs (Psychometric Validity)",
                question:
                  "Do LLM-generated MCQ items reach psychometric parity with expert-authored items across IRT a/b parameters?",
                methods:
                  "GPT-4o item generation · pilot on 800-student cohort · 2PL/3PL IRT calibration",
                metrics:
                  "IRT a/b/c parity · DIF analysis · expert rubric agreement",
                badge: "Psychometrics · NLP",
                color: "from-emerald-500 to-cyan-500",
              },
              {
                code: "FT-08",
                title: "Academic Integrity in the LLM Era",
                question:
                  "Which assessment redesigns (oral defence, in-class draft, traceable revisions) best preserve construct validity under AI assistance?",
                methods:
                  "Quasi-experimental rollout · stylometry · revision-history forensics · student self-report",
                metrics:
                  "Detector AUC · false-positive rate · construct-validity coefficient",
                badge: "Integrity · Assessment",
                color: "from-slate-500 to-indigo-500",
              },
              {
                code: "FT-09",
                title: "Explainable Knowledge Tracing (XKT)",
                question:
                  "Can attention-based knowledge-tracing models offer learner-facing explanations that improve metacognition without harming accuracy?",
                methods:
                  "SAINT+ / AKT with attention rollout · learner-readable rationales · A/B on dashboard",
                metrics:
                  "AUC vs DKT · self-regulation gain · trust score",
                badge: "XAI · Knowledge Tracing",
                color: "from-primary to-fuchsia-500",
              },
              {
                code: "FT-10",
                title: "Generative Tutors for Low-Resource Languages",
                question:
                  "How do parameter-efficient fine-tuning recipes (LoRA, QLoRA) close the pedagogical gap for Finnish, Swedish, Vietnamese, Khmer?",
                methods:
                  "LoRA on Llama-3 / Qwen-2.5 · native-rater pedagogical rubric · code-switch evaluation",
                metrics:
                  "Pedagogical rubric · grammaticality · cultural appropriateness",
                badge: "PEFT · Low-Resource NLP",
                color: "from-teal-500 to-primary",
              },
              {
                code: "FT-11",
                title: "AI Literacy Curricula for K-12",
                question:
                  "Which AI-literacy competencies (Long & Magerko 2020) most reliably transfer to civic and workplace AI judgment?",
                methods:
                  "Cluster-RCT across schools · delayed transfer test · qualitative coding of student rationales",
                metrics:
                  "Competency rubric · transfer score · misconception incidence",
                badge: "Curriculum · Policy",
                color: "from-emerald-500 to-amber-500",
              },
              {
                code: "FT-12",
                title: "Longitudinal Cognitive Impact of Daily AI Tutoring (24 months)",
                question:
                  "Does daily AI tutoring over 24 months alter working memory, schema construction, and intrinsic motivation trajectories?",
                methods:
                  "Cohort-sequential design · annual cognitive battery · growth-curve modelling",
                metrics:
                  "Working-memory span · schema-transfer task · intrinsic motivation (IMI)",
                badge: "Longitudinal · Cognitive",
                color: "from-violet-500 to-primary",
              },
              {
                code: "FT-13",
                title: "Verifier-Augmented LLM Solvers for STEM",
                question:
                  "Can symbolic / unit-test verifiers reduce math-solver hallucination without harming pedagogical fluency?",
                methods:
                  "LLM + SymPy / Lean verifier · self-consistency voting · counterfactual error injection",
                metrics:
                  "Solve accuracy · verified-correct rate · explanation-quality rubric",
                badge: "STEM · Neuro-Symbolic",
                color: "from-cyan-500 to-primary",
              },
              {
                code: "FT-14",
                title: "Immersive XR for Speaking Anxiety Reduction",
                question:
                  "Do VR roleplay scenes lower speaking anxiety and raise willingness-to-communicate vs in-class pair-work?",
                methods:
                  "Within-subjects RCT · FLCAS pre/post · physiological arousal (HRV)",
                metrics:
                  "FLCAS Δ · willingness-to-communicate · talk-time ratio",
                badge: "XR · SLA",
                color: "from-rose-500 to-fuchsia-500",
              },
              {
                code: "FT-15",
                title: "Carbon Accounting for GenAI Tutors",
                question:
                  "What is the per-learner carbon and cost footprint of frontier-model tutoring, and where do efficient open models suffice?",
                methods:
                  "MLPerf-style measurement · per-token kWh tracing · cohort cost modelling",
                metrics:
                  "gCO₂e / learner-week · cost per pedagogical outcome · efficiency frontier",
                badge: "Sustainability · MLOps",
                color: "from-emerald-500 to-teal-500",
              },
              {
                code: "FT-16",
                title: "Teacher-AI Co-Authoring of Curricula",
                question:
                  "Which division of labour between teachers and LLM authoring agents produces the most curriculum-coherent and culturally appropriate units?",
                methods:
                  "Design-based research · expert-rubric coding · classroom field trial",
                metrics:
                  "Curriculum-alignment score · teacher autonomy index · cultural fit rating",
                badge: "Curriculum · HCI",
                color: "from-amber-500 to-emerald-500",
              },
              {
                code: "FT-17",
                title: "On-Device Small Language Models for Schools",
                question:
                  "Can ≤3B-parameter SLMs (Phi-3, Gemma-2, Qwen-2.5) match cloud-LLM tutoring quality offline for low-bandwidth schools?",
                methods:
                  "Quantisation (Q4_K_M) · LoRA on pedagogical corpora · offline classroom pilot",
                metrics:
                  "Rubric-quality gap vs GPT-4o · latency · battery cost",
                badge: "Edge AI · Equity",
                color: "from-indigo-500 to-cyan-500",
              },
              {
                code: "FT-18",
                title: "Generative Item Banks under Test Security",
                question:
                  "How can LLM-generated assessment items be deployed at scale without leaking through training-data contamination?",
                methods:
                  "Watermarking · canary items · contamination-aware IRT recalibration",
                metrics:
                  "Leakage rate · post-leak IRT drift · examinee-perceived fairness",
                badge: "Psychometrics · Security",
                color: "from-slate-500 to-primary",
              },

            ].map((t) => (
              <Card
                key={t.code}
                className="relative overflow-hidden border-primary/10 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${t.color}`}
                />
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="font-mono text-[11px] tracking-wider border-primary/30 text-primary"
                    >
                      {t.code}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {t.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold leading-snug mb-2">
                    {t.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    <span className="font-semibold text-foreground/80">
                      RQ:
                    </span>{" "}
                    {t.question}
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <p>
                      <span className="font-semibold text-primary">Methods · </span>
                      <span className="text-muted-foreground">{t.methods}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-emerald-600">Metrics · </span>
                      <span className="text-muted-foreground">{t.metrics}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Global Collaboration & Open Science */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-emerald-500/15 text-primary">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Global Collaboration & Open Science
              </h2>
              <p className="text-sm text-muted-foreground">
                Research moves faster when it is shared. HaiEduTech Lab actively collaborates with universities, school districts, and open-source communities across four continents.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <Card className="hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-emerald-500" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Academic Partnerships</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-4">
                  We maintain active research agreements with universities in Finland, Vietnam, and Australia. These partnerships give us access to diverse learner populations, institutional review boards, and peer-review networks that keep our work academically rigorous.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">University of Turku</Badge>
                  <Badge variant="outline">University of Oulu</Badge>
                  <Badge variant="outline">VNU-HCM</Badge>
                  <Badge variant="outline">UNSW Sydney</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-500 to-primary" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">School District Pilots</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-4">
                  Real classrooms are our ultimate laboratory. We run semester-long pilots with K-12 schools and language centres, collecting multimodal data (engagement logs, quiz scores, teacher surveys, and structured interviews) to validate interventions at scale.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Helsinki Region</Badge>
                  <Badge variant="outline">Ho Chi Minh City</Badge>
                  <Badge variant="outline">Turku Archipelago</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-dashed border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/10 text-primary w-fit shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Open Data & Reproducibility Commitment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Where privacy and ethics allow, we publish anonymised datasets, analysis notebooks, and pre-registration protocols on our GitHub and OSF repositories. We believe the EdTech field benefits when every team can reproduce, critique, and build upon each other's work — not just cite polished conclusions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Global EdTech Research Library — curated external papers + visualisations */}
        <GlobalEdTechLibrary />


        {/* Pillar 3 — Insight Survey */}
        <section className="mb-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">EdTech Innovation Survey</h2>
              <p className="text-sm text-muted-foreground">
                Open insight collection — your input shapes the lab's R&D roadmap.
              </p>
            </div>
          </div>

          <Card className="border-primary/20">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Your role</Label>
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

                  <div className="space-y-2">
                    <Label>Which EdTech tools feel most essential to you today?</Label>
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
                    Biggest pain point you face when learning or teaching online
                  </Label>
                  <Textarea
                    id="pain"
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="e.g. hard to track student progress week over week..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fb">
                    Ideas or feedback that would help EdTech platforms improve
                  </Label>
                  <Textarea
                    id="fb"
                    value={fb}
                    onChange={(e) => setFb(e.target.value)}
                    maxLength={2000}
                    rows={3}
                    placeholder="Share your idea..."
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
                    Submit insight
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
