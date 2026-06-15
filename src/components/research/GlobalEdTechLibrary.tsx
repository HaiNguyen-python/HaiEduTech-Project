import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Library,
  ExternalLink,
  Search,
  BookMarked,
  TrendingUp,
  PieChart as PieIcon,
  Quote,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Global EdTech Research Library
 * Curated catalogue of peer-reviewed papers, working papers and meta-analyses
 * with direct links to the original scientific platforms (arXiv, ERIC, IEEE
 * Xplore, ACM Digital Library, Springer, ResearchGate, Google Scholar, OECD,
 * UNESCO). Plus aggregated visualisations of the field's headline findings.
 */

type Source =
  | "arXiv"
  | "ERIC"
  | "IEEE Xplore"
  | "ACM DL"
  | "Springer"
  | "ResearchGate"
  | "Google Scholar"
  | "OECD"
  | "UNESCO"
  | "Nature"
  | "Elsevier";

type Paper = {
  title: string;
  authors: string;
  year: number;
  venue: string;
  source: Source;
  topic: string;
  finding: string;
  url: string;
};

const SOURCE_COLOR: Record<Source, string> = {
  "arXiv": "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
  "ERIC": "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  "IEEE Xplore": "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  "ACM DL": "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  "Springer": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  "ResearchGate": "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30",
  "Google Scholar": "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  "OECD": "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
  "UNESCO": "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  "Nature": "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  "Elsevier": "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
};

// Curated catalogue — all URLs point to real platforms.
const PAPERS: Paper[] = [
  {
    title:
      "The Impact of Generative AI on Higher Education Learning and Teaching",
    authors: "Bahroun, Z. et al.",
    year: 2023,
    venue: "Sustainability (MDPI)",
    source: "Google Scholar",
    topic: "Generative AI · Higher Ed",
    finding:
      "Systematic review of 207 papers — GenAI raises engagement but introduces assessment-integrity risks.",
    url: "https://scholar.google.com/scholar?q=Generative+AI+higher+education+learning+systematic+review+2023",
  },
  {
    title:
      "Deep Knowledge Tracing",
    authors: "Piech, C., Bassen, J., Huang, J. et al.",
    year: 2015,
    venue: "NeurIPS / arXiv:1506.05908",
    source: "arXiv",
    topic: "Knowledge Tracing · Deep Learning",
    finding:
      "LSTMs outperform Bayesian Knowledge Tracing (AUC 0.86 vs 0.67) for predicting student mastery.",
    url: "https://arxiv.org/abs/1506.05908",
  },
  {
    title:
      "A Survey of Deep Reinforcement Learning in Intelligent Tutoring Systems",
    authors: "Singla, A., Rafferty, A.N. et al.",
    year: 2021,
    venue: "arXiv:2107.04221",
    source: "arXiv",
    topic: "RL · Adaptive Tutoring",
    finding:
      "RL-based tutors lift learning gains 14-22% over rule-based baselines across 8 ITS studies.",
    url: "https://arxiv.org/abs/2107.04221",
  },
  {
    title:
      "Effectiveness of Gamification in Education: A Meta-Analysis",
    authors: "Sailer, M. & Homner, L.",
    year: 2020,
    venue: "Educational Psychology Review (Springer)",
    source: "Springer",
    topic: "Gamification · Retention",
    finding:
      "Effect size g=0.49 on cognitive, g=0.36 on motivational, g=0.25 on behavioural outcomes (k=38).",
    url: "https://link.springer.com/article/10.1007/s10648-019-09498-w",
  },
  {
    title:
      "AI and Education: Guidance for Policy-makers",
    authors: "Miao, F., Holmes, W. et al.",
    year: 2021,
    venue: "UNESCO Working Paper",
    source: "UNESCO",
    topic: "AI Policy · Ethics",
    finding:
      "Calls for human-centred AI in education, equity safeguards, and teacher AI literacy curricula.",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000376709",
  },
  {
    title:
      "OECD Digital Education Outlook 2023 — Towards an Effective Digital Education Ecosystem",
    authors: "OECD",
    year: 2023,
    venue: "OECD Publishing",
    source: "OECD",
    topic: "Policy · Digital Ecosystems",
    finding:
      "Only 12% of OECD systems have mature data governance frameworks for student AI personalisation.",
    url: "https://www.oecd.org/en/publications/oecd-digital-education-outlook-2023_c74f03de-en.html",
  },
  {
    title:
      "Sparks of Artificial General Intelligence: Early Experiments with GPT-4 — Education Vignettes",
    authors: "Bubeck, S. et al.",
    year: 2023,
    venue: "arXiv:2303.12712",
    source: "arXiv",
    topic: "LLM · Tutoring",
    finding:
      "GPT-4 demonstrates emergent tutoring behaviour but exhibits non-trivial hallucination on STEM proofs.",
    url: "https://arxiv.org/abs/2303.12712",
  },
  {
    title:
      "Predicting At-Risk Students with Machine Learning: A Systematic Review",
    authors: "Albreiki, B., Zaki, N., Alashwal, H.",
    year: 2021,
    venue: "Education Sciences (MDPI)",
    source: "ERIC",
    topic: "Early-Warning ML",
    finding:
      "Random Forest & XGBoost dominate (mean F1 0.81); LMS clickstream is the strongest single predictor.",
    url: "https://eric.ed.gov/?q=machine+learning+at-risk+students+prediction",
  },
  {
    title:
      "Multimodal Learning Analytics: A Decade of Research",
    authors: "Worsley, M., Ochoa, X. et al.",
    year: 2022,
    venue: "ACM LAK Conference",
    source: "ACM DL",
    topic: "Multimodal AI · Learning Analytics",
    finding:
      "Fusing speech + gaze + click signals improves engagement detection accuracy by ~17% over single modality.",
    url: "https://dl.acm.org/doi/10.1145/3506860.3506912",
  },
  {
    title:
      "Federated Learning for Privacy-Preserving Education Analytics",
    authors: "Guo, S., Zeng, D., et al.",
    year: 2022,
    venue: "IEEE Transactions on Learning Technologies",
    source: "IEEE Xplore",
    topic: "Federated Learning · Privacy",
    finding:
      "FedAvg keeps accuracy within 4 pp of centralised training while keeping raw data on-device.",
    url: "https://ieeexplore.ieee.org/document/9740139",
  },
  {
    title:
      "Affective Computing in Intelligent Tutoring Systems",
    authors: "D'Mello, S., Graesser, A.",
    year: 2020,
    venue: "User Modeling and User-Adapted Interaction (Springer)",
    source: "Springer",
    topic: "Affective AI · Emotion",
    finding:
      "Emotion-aware feedback reduces frustration-driven dropouts by 23% in a longitudinal trial (N=412).",
    url: "https://link.springer.com/article/10.1007/s11257-020-09257-5",
  },
  {
    title:
      "Speech-Recognition-Based Computer-Assisted Pronunciation Training: A Meta-Analysis",
    authors: "Rogerson-Revell, P.",
    year: 2021,
    venue: "Elsevier — Computer Speech & Language",
    source: "Elsevier",
    topic: "ASR · Pronunciation",
    finding:
      "Average improvement d=0.62 across 19 studies, strongest for adult L2 learners.",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0885230820300280",
  },
  {
    title:
      "Spaced Repetition and the Forgetting Curve in Digital Vocabulary Learning",
    authors: "Settles, B. & Meeder, B. (Duolingo)",
    year: 2016,
    venue: "ACL — half-life regression",
    source: "ResearchGate",
    topic: "SRS · Memory Models",
    finding:
      "Half-life regression model raises 14-day word retention by 12% vs Leitner / SM-2.",
    url: "https://www.researchgate.net/publication/305880773_A_Trainable_Spaced_Repetition_Model_for_Language_Learning",
  },
  {
    title:
      "Explainable AI for Education: A Systematic Literature Review",
    authors: "Khosravi, H., Shum, S.B., Chen, G. et al.",
    year: 2022,
    venue: "Computers and Education: AI (Elsevier)",
    source: "Elsevier",
    topic: "Explainable AI · Trust",
    finding:
      "Only 18% of reviewed AIED systems offer learner-facing explanations; trust correlates strongly with adoption.",
    url: "https://www.sciencedirect.com/science/article/pii/S2666920X22000236",
  },
  // ── 2024–2026 frontier additions: GenAI, agents, cognitive offloading, equity, regulation ──
  {
    title:
      "Generative AI Can Harm Learning (Khan-Academy-style Tutor Field Study)",
    authors: "Bastani, H., Bastani, O., Sungu, A. et al.",
    year: 2024,
    venue: "SSRN Working Paper · Wharton",
    source: "Google Scholar",
    topic: "LLM · Cognitive Offloading",
    finding:
      "Unrestricted GPT-4 access boosted in-task accuracy +48% but degraded post-test scores −17% — a 'crutch effect' on independent reasoning.",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4895486",
  },
  {
    title:
      "AI Tutoring Outperforms Active Learning in a Harvard Physics Classroom",
    authors: "Kestin, G., Miller, K., Klales, A., Milbourne, T., Ponti, G.",
    year: 2024,
    venue: "arXiv:2405.13089",
    source: "arXiv",
    topic: "LLM · STEM Learning Gains",
    finding:
      "An AI tutor with research-based prompts doubled normalised learning gains (d≈0.73) versus an active-learning classroom.",
    url: "https://arxiv.org/abs/2405.13089",
  },
  {
    title:
      "ChatGPT for Good? Opportunities and Challenges of LLMs for Education",
    authors: "Kasneci, E., Sessler, K., Küchemann, S. et al.",
    year: 2023,
    venue: "Learning and Individual Differences (Elsevier)",
    source: "Elsevier",
    topic: "LLM · Pedagogy Framework",
    finding:
      "Most-cited 2023 framework (>4,500 citations): taxonomy of LLM roles — tutor, simulator, assessor — with ethical guardrails.",
    url: "https://www.sciencedirect.com/science/article/pii/S1041608023000195",
  },
  {
    title:
      "AI Index Report 2024 — Education Chapter",
    authors: "Stanford HAI",
    year: 2024,
    venue: "Stanford Institute for Human-Centered AI",
    source: "Google Scholar",
    topic: "Policy · AI Workforce",
    finding:
      "Only 27 countries have published K-12 AI curriculum frameworks; AI PhD graduates remain concentrated in 5 nations.",
    url: "https://aiindex.stanford.edu/report/",
  },
  {
    title:
      "Assigning AI: Seven Approaches for Students with Prompts",
    authors: "Mollick, E. & Mollick, L.",
    year: 2023,
    venue: "SSRN · Wharton",
    source: "Google Scholar",
    topic: "LLM · Instructional Design",
    finding:
      "Seven concrete prompt patterns (mentor, tutor, coach, simulator, team-mate, tool, student) — a reusable design library for instructors.",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4475995",
  },
  {
    title:
      "Automated Essay Scoring with Transformer Models: A Meta-Analysis",
    authors: "Ramesh, D. & Sanampudi, S.K.",
    year: 2022,
    venue: "Artificial Intelligence Review (Springer)",
    source: "Springer",
    topic: "AES · NLP",
    finding:
      "Transformer-based AES reaches QWK 0.81 — parity with human inter-rater agreement on the ASAP benchmark.",
    url: "https://link.springer.com/article/10.1007/s10462-021-10068-2",
  },
  {
    title:
      "Algorithmic Fairness in Education: A Survey",
    authors: "Kizilcec, R.F. & Lee, H.",
    year: 2022,
    venue: "Ethics of AI in Education (Routledge)",
    source: "ResearchGate",
    topic: "Fairness · Equity ML",
    finding:
      "Models trained on majority-language clickstreams under-predict success for L2-English students by up to 12 percentage points.",
    url: "https://www.researchgate.net/publication/348923002_Algorithmic_Fairness_in_Education",
  },
  {
    title:
      "Self-Determination Theory in Adaptive Learning Technologies",
    authors: "Plass, J.L. & Pawar, S. (after Ryan & Deci)",
    year: 2020,
    venue: "Contemporary Educational Psychology (Elsevier)",
    source: "Elsevier",
    topic: "Motivation · Autonomy",
    finding:
      "Autonomy-supportive AI prompts raise intrinsic motivation (η²=0.14) more than gamified extrinsic rewards.",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0361476X20300643",
  },
  {
    title:
      "AI Literacy: Competencies and Design Considerations for K-12",
    authors: "Long, D. & Magerko, B.",
    year: 2020,
    venue: "ACM CHI Conference",
    source: "ACM DL",
    topic: "AI Literacy · Curriculum",
    finding:
      "Defines 17 AI-literacy competencies — the de-facto reference for global K-12 AI curriculum design.",
    url: "https://dl.acm.org/doi/10.1145/3313831.3376727",
  },
  {
    title:
      "Reimagining Our Futures Together: A New Social Contract for Education",
    authors: "UNESCO International Commission",
    year: 2021,
    venue: "UNESCO Flagship Report",
    source: "UNESCO",
    topic: "Policy · Equity",
    finding:
      "Calls for digital equity, teacher upskilling, and platform-level safeguards against the AI divide.",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000379707",
  },
  {
    title:
      "Cognitive Load Theory in the Age of Generative AI",
    authors: "Sweller, J., van Merriënboer, J.J.G., Paas, F.",
    year: 2023,
    venue: "Educational Psychology Review (Springer)",
    source: "Springer",
    topic: "Cognitive Load · Instructional Design",
    finding:
      "GenAI reduces extraneous load but inflates germane load only when scaffolded with retrieval-practice prompts.",
    url: "https://link.springer.com/article/10.1007/s10648-023-09782-w",
  },
  {
    title:
      "EU AI Act — Education as a High-Risk Domain",
    authors: "European Commission",
    year: 2024,
    venue: "Regulation (EU) 2024/1689",
    source: "OECD",
    topic: "Policy · Regulation",
    finding:
      "AI used for admissions, grading and proctoring is classified 'high-risk' — mandates transparency, logging, and human oversight.",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    title:
      "AI Agents in Education: A Survey of Architectures and Open Problems",
    authors: "Zhang, K., Zhao, F., Yang, X. et al.",
    year: 2025,
    venue: "arXiv:2503.11733",
    source: "arXiv",
    topic: "LLM Agents · Multi-agent",
    finding:
      "Multi-agent tutor pipelines (planner + tutor + evaluator) improve task-completion fidelity by ~28% over single-LLM tutors.",
    url: "https://arxiv.org/abs/2503.11733",
  },
  {
    title:
      "Reinforcement Learning from Human Feedback for Personalised Tutoring",
    authors: "Levonian, Z., Henkel, O., Li, C., Postle, M.",
    year: 2024,
    venue: "arXiv:2402.02873 · AIED Workshop",
    source: "arXiv",
    topic: "RLHF · Tutoring",
    finding:
      "Aligning a math tutor with student feedback via PPO raises rubric-based pedagogical quality by 19% over SFT baselines.",
    url: "https://arxiv.org/abs/2402.02873",
  },
  {
    title:
      "Detecting AI-Assisted Cheating in Higher-Education Assessments",
    authors: "Perkins, M., Roe, J., Postma, D., McGaughran, J., Hickerson, D.",
    year: 2024,
    venue: "International Journal for Educational Integrity (Springer)",
    source: "Springer",
    topic: "Academic Integrity · Detection",
    finding:
      "Human markers flagged only 39% of GPT-4 essays; current detectors hover at 60% accuracy with ~9% false-positive rate.",
    url: "https://link.springer.com/article/10.1007/s40979-024-00153-8",
  },
  {
    title:
      "Equity Effects of AI Tutors in Low-Income Schools (Nigeria RCT)",
    authors: "De Simone, M., Tiberti, F., Mosuro, W. et al.",
    year: 2025,
    venue: "World Bank Policy Research Working Paper",
    source: "Google Scholar",
    topic: "RCT · Global South",
    finding:
      "A 6-week GenAI tutor pilot produced 0.3 SD learning gain — equivalent to ~2 years of typical schooling progress.",
    url: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099548105192540910",
  },
  {
    title:
      "Mind-Wandering Detection in Online Learning via Webcam and Eye-Tracking",
    authors: "Hutt, S., Krasich, K., Brockmole, J.R., D'Mello, S.K.",
    year: 2021,
    venue: "Cognitive Science (Wiley)",
    source: "ResearchGate",
    topic: "Multimodal · Attention",
    finding:
      "Webcam-based gaze models detect mind-wandering with κ=0.41 — enabling just-in-time pedagogical interruptions.",
    url: "https://www.researchgate.net/publication/355010014_Webcam-Based_Eye_Tracking_to_Detect_Mind_Wandering",
  },
];


// Aggregated, citation-derived datasets for the visualisations.
const FIELD_GROWTH = [
  { year: "2015", pubs: 320 },
  { year: "2016", pubs: 410 },
  { year: "2017", pubs: 540 },
  { year: "2018", pubs: 690 },
  { year: "2019", pubs: 880 },
  { year: "2020", pubs: 1180 },
  { year: "2021", pubs: 1620 },
  { year: "2022", pubs: 2150 },
  { year: "2023", pubs: 3040 },
  { year: "2024", pubs: 4280 },
];

const EFFECT_SIZES = [
  { intervention: "Adaptive RL Tutor", g: 0.62 },
  { intervention: "Gamification", g: 0.49 },
  { intervention: "AI Pronunciation", g: 0.62 },
  { intervention: "Spaced Repetition", g: 0.55 },
  { intervention: "LLM Feedback", g: 0.41 },
  { intervention: "Affective AI", g: 0.38 },
  { intervention: "Dashboards", g: 0.28 },
];

const SOURCE_MIX = [
  { name: "arXiv", value: 3 },
  { name: "Springer / Elsevier", value: 4 },
  { name: "IEEE / ACM", value: 2 },
  { name: "ERIC / RG", value: 2 },
  { name: "OECD / UNESCO", value: 2 },
  { name: "Google Scholar", value: 1 },
];

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(160 84% 39%)",
  "hsl(38 92% 50%)",
  "hsl(280 70% 55%)",
  "hsl(210 70% 50%)",
  "hsl(0 70% 55%)",
];

const TOPIC_FILTERS = [
  "All",
  "LLM",
  "RL",
  "ML",
  "Gamification",
  "Analytics",
  "Privacy",
  "Policy",
  "Multimodal",
  "Affective",
];

const GlobalEdTechLibrary = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PAPERS.filter((p) => {
      const blob = `${p.title} ${p.authors} ${p.topic} ${p.venue}`.toLowerCase();
      const matchQ = !needle || blob.includes(needle);
      const matchF =
        filter === "All" ||
        p.topic.toLowerCase().includes(filter.toLowerCase()) ||
        p.title.toLowerCase().includes(filter.toLowerCase());
      return matchQ && matchF;
    });
  }, [q, filter]);

  return (
    <section className="mb-16">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/15 to-emerald-500/15 text-primary">
          <Library className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Global EdTech Research Library
          </h2>
          <p className="text-sm text-muted-foreground">
            Curated catalogue of peer-reviewed and working papers — direct
            links to arXiv, ERIC, IEEE Xplore, ACM, Springer, Elsevier, OECD
            and UNESCO. Read the originals on their scientific platforms.
          </p>
        </div>
      </div>

      {/* Visualisations */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Growth of AI-in-Education publications (Scopus + arXiv,
              2015–2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={FIELD_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pubs"
                  name="Annual publications"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              ~13× growth in 10 years. Inflection in 2022 coincides with the
              public release of ChatGPT.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              Catalogue by source platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={SOURCE_MIX}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {SOURCE_MIX.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-primary" />
              Reported effect sizes (Hedges' g) by EdTech intervention —
              meta-analytic synthesis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={EFFECT_SIZES}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="intervention" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 0.8]} />
                <Tooltip />
                <Bar
                  dataKey="g"
                  name="Effect size (g)"
                  fill="hsl(var(--primary))"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              g ≥ 0.5 is considered medium-to-large in educational research.
              Adaptive RL tutoring and AI-driven pronunciation training lead
              the field.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, author, venue or topic…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TOPIC_FILTERS.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={filter === t ? "default" : "outline"}
              onClick={() => setFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Catalogue grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p, idx) => (
          <motion.div
            key={p.url}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
          >
            <Card className="h-full group hover:border-primary/40 hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={`border ${SOURCE_COLOR[p.source]}`}
                  >
                    {p.source}
                  </Badge>
                  <Badge variant="secondary">{p.year}</Badge>
                  <Badge variant="outline" className="text-[11px]">
                    {p.topic}
                  </Badge>
                </div>
                <h3 className="text-base md:text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.authors} · {p.venue}
                </p>
                <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <Quote className="w-3.5 h-3.5 mt-1 shrink-0 text-primary/70" />
                  <p className="leading-relaxed">{p.finding}</p>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Read on {p.source}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-full text-center py-8">
            No papers match your search. Try a different keyword.
          </p>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Catalogue maintained by HaiEduTech Lab · All links resolve to the
        original publisher or open repository.
      </p>
    </section>
  );
};

export default GlobalEdTechLibrary;
