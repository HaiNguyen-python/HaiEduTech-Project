import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AssessmentTool from "@/components/AssessmentTool";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Workflow, BrainCircuit, ChevronRight, Trophy, BookOpen, ArrowRight, Sparkles, Bot, Briefcase, Cloud, Brain, Gamepad2, Settings2, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import CertCarousel from "@/components/CertCarousel";
import PythonReview from "@/components/PythonReview";
import PythonPathwayHub from "@/components/python/PythonPathwayHub";
import { programmingModules, allProgrammingModules } from "@/data/programmingLessonData";
import { pythonChallenges } from "@/data/pythonChallenges";
import { Progress } from "@/components/ui/progress";

const pillars = [
  {
    id: "python-pathway",
    icon: Code2,
    emoji: "💻",
    color: "from-fuchsia-500 to-purple-600",
    bgColor: "bg-fuchsia-500/8",
    borderColor: "border-fuchsia-500/20",
    accentColor: "text-fuchsia-600",
  },
  {
    id: "python",
    icon: Code2,
    emoji: "🐍",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/8",
    borderColor: "border-emerald-500/20",
    accentColor: "text-emerald-600",
  },
  {
    id: "software-eng",
    icon: Settings2,
    emoji: "⚙️",
    color: "from-slate-600 to-blue-700",
    bgColor: "bg-slate-500/8",
    borderColor: "border-slate-500/20",
    accentColor: "text-slate-700 dark:text-slate-300",
  },
  {
    id: "ai-foundation",
    icon: Bot,
    emoji: "🧠",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/8",
    borderColor: "border-rose-500/20",
    accentColor: "text-rose-600",
  },
  {
    id: "sql",
    icon: Database,
    emoji: "🗄️",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/8",
    borderColor: "border-violet-500/20",
    accentColor: "text-violet-600",
  },
  {
    id: "data-eng",
    icon: Workflow,
    emoji: "🔄",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/8",
    borderColor: "border-amber-500/20",
    accentColor: "text-amber-600",
  },
  {
    id: "ml",
    icon: BrainCircuit,
    emoji: "🤖",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-500/8",
    borderColor: "border-teal-500/20",
    accentColor: "text-teal-600",
  },
  {
    id: "cloud",
    icon: Cloud,
    emoji: "☁️",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/8",
    borderColor: "border-sky-500/20",
    accentColor: "text-sky-600",
  },
  {
    id: "deep-learning",
    icon: Brain,
    emoji: "🧠",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/8",
    borderColor: "border-indigo-500/20",
    accentColor: "text-indigo-600",
  },
  {
    id: "nlp",
    icon: Languages,
    emoji: "🗣️",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/8",
    borderColor: "border-cyan-500/20",
    accentColor: "text-cyan-600",
  },
  {
    id: "reinforcement-learning",
    icon: Gamepad2,
    emoji: "🤖",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/8",
    borderColor: "border-orange-500/20",
    accentColor: "text-orange-600",
  },
];

const Programming = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activePillar, setActivePillar] = useState(() => {
    const initial = searchParams.get("pillar");
    return initial && pillars.some(p => p.id === initial) ? initial : "python";
  });

  // Sync active pillar when ?pillar= changes (e.g. coming from Navbar link)
  useEffect(() => {
    const next = searchParams.get("pillar");
    if (next && pillars.some(p => p.id === next) && next !== activePillar) {
      setActivePillar(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const completedChallenges = pythonChallenges.filter(
    c => localStorage.getItem(`haiedu_challenge_${c.id}_passed`) === "1"
  ).length;
  const challengeProgress = (completedChallenges / pythonChallenges.length) * 100;

  const pillarData: Record<string, {
    title: string; titleEn: string; desc: string; descEn: string;
    modules: typeof programmingModules; challengeSection?: boolean;
    isPathway?: boolean;
  }> = {
    "python-pathway": {
      title: "Introduction to Programming", titleEn: "Introduction to Programming",
      desc: "Lộ trình lập trình từ cơ bản đến nâng cao bằng Python: 6 module, ~47 bài, có Pyodide playground chạy thật trong trình duyệt, quiz và badge 'Programming Certified'.",
      descEn: "Programming from Beginner → Mastery with Python: 6 modules, ~47 lessons, real in-browser Pyodide playground, quizzes, and 'Programming Certified' badges.",
      modules: [],
      isPathway: true,
    },
    python: {
      title: "Python", titleEn: "Python",
      desc: "Từ tư duy thuật toán cơ bản (Scratch) đến Python nâng cao, cấu trúc dữ liệu và dự án thực tế. Bao gồm 150 thử thách lập trình với IDE tích hợp.",
      descEn: "From basic algorithmic thinking (Scratch) to advanced Python, data structures and real projects. Includes 150 coding challenges with built-in IDE.",
      modules: allProgrammingModules.filter(m => m.course === "kids"),
      challengeSection: true,
    },
    "software-eng": {
      title: "Kỹ thuật phần mềm & Web", titleEn: "Software & Web Engineering",
      desc: "14 bài học chuẩn ngành 2026: 7 bài Software Engineering (SDLC/Agile, System Design, Git, Clean Code, Testing/TDD, CI/CD, Security + Patterns) và 7 bài Web Development (HTML semantic, CSS hiện đại, Flex/Grid, JavaScript, DOM, dự án full-stack mini, React Cơ Bản). Có Git Branching Simulator tương tác và mọi bài đều có hình minh họa AI.",
      descEn: "14 industry-grade lessons (2026): 7 Software Engineering (SDLC/Agile, System Design, Git, Clean Code, Testing/TDD, CI/CD, Security + Patterns) and 7 Web Development (semantic HTML, modern CSS, Flex/Grid, JavaScript, DOM, mini full-stack project, React Basics). Includes an interactive Git Branching Simulator and AI illustrations on every lesson.",
      modules: allProgrammingModules.filter(m => m.id === "se-foundations" || m.id === "web-dev-foundations"),
    },
    "ai-foundation": {
      title: "AI Foundation", titleEn: "AI Foundation",
      desc: "Nền tảng AI: Lịch sử, LLMs, Prompt Engineering, Ethics. Thực hành tối ưu hóa Prompt và xây dựng ứng dụng AI cơ bản.",
      descEn: "AI Fundamentals: History, LLMs, Prompt Engineering, Ethics. Practice Prompt optimization and build basic AI applications.",
      modules: allProgrammingModules.filter(m => m.id === "prog-ai-foundation" || (m.course === "data-ai" && m.id !== "se-foundations")),
    },
    sql: {
      title: "SQL & Database", titleEn: "SQL & Database",
      desc: "Nắm vững truy vấn, thiết kế cơ sở dữ liệu, JOIN, indexing và tối ưu hóa với PostgreSQL.",
      descEn: "Master queries, database design, JOINs, indexing and optimization with PostgreSQL.",
      modules: allProgrammingModules.filter(m => m.id === "prog-sql" || m.course === "sql"),
    },
    "data-eng": {
      title: "Data Engineering", titleEn: "Data Engineering",
      desc: "Xây dựng đường ống dữ liệu (ETL/ELT), xử lý dữ liệu lớn với Pandas và tự động hóa workflow.",
      descEn: "Build data pipelines (ETL/ELT), process big data with Pandas and automate workflows.",
      modules: allProgrammingModules.filter(m => m.id === "prog-data-pipeline" || m.course === "data-eng"),
    },
    ml: {
      title: "Machine Learning", titleEn: "Machine Learning",
      desc: "Regression, Classification, Clustering và các mô hình AI cơ bản với scikit-learn.",
      descEn: "Regression, Classification, Clustering and basic AI models with scikit-learn.",
      modules: allProgrammingModules.filter(m => m.id === "prog-ml" || m.course === "ml"),
    },
    cloud: {
      title: "Cloud Engineer", titleEn: "Cloud Engineer",
      desc: "Lộ trình Cloud Engineer chuyên nghiệp: nền tảng AWS/Azure/GCP, Compute & Storage, Networking & Bảo mật, Serverless, IaC (Terraform), CI/CD, Well-Architected Framework và FinOps tối ưu chi phí.",
      descEn: "Professional Cloud Engineer path: AWS/Azure/GCP fundamentals, Compute & Storage, Networking & Security, Serverless, IaC (Terraform), CI/CD, Well-Architected Framework and FinOps cost optimization.",
      modules: allProgrammingModules.filter(m => m.course === "cloud"),
    },
    "deep-learning": {
      title: "Deep Learning", titleEn: "Deep Learning",
      desc: "Mạng Neural, PyTorch, CNN cho Computer Vision, RNN/LSTM cho NLP, và Transformers/LLMs - công nghệ đứng sau ChatGPT. Yêu cầu: Python cơ bản + Đại số tuyến tính.",
      descEn: "Neural Networks, PyTorch, CNNs for Computer Vision, RNN/LSTMs for NLP, and Transformers/LLMs - the tech behind ChatGPT. Prerequisites: Python basics + Linear Algebra.",
      modules: allProgrammingModules.filter(m => m.course === "dl"),
    },
    nlp: {
      title: "Natural Language Processing", titleEn: "Natural Language Processing",
      desc: "6 bài học chuyên sâu: tokenization (Anh/Phần Lan/Trung), TF-IDF & Word Embeddings, Sentiment Analysis, RNN/LSTM, và Transformers/BERT/LLM 2026. Capstone: Finnish→English Sentiment Analyser. Mở khóa huy hiệu 'Linguistics Architect'.",
      descEn: "6 expert lessons: multilingual tokenization (EN/FI/ZH), TF-IDF & Word Embeddings, Sentiment Analysis, RNN/LSTMs, and Transformers/BERT/LLMs (2026). Capstone: a Finnish→English sentiment analyser. Unlocks the 'Linguistics Architect' badge.",
      modules: allProgrammingModules.filter(m => m.course === "nlp"),
    },
    "reinforcement-learning": {
      title: "Reinforcement Learning", titleEn: "Reinforcement Learning",
      desc: "Agent học từ phần thưởng: MDP, Q-Learning/DQN, Policy Gradients (PPO/SAC), ứng dụng robotics, xe tự lái và Game AI (AlphaGo, RLHF của ChatGPT). Yêu cầu: Python + xác suất cơ bản.",
      descEn: "Agents that learn from rewards: MDPs, Q-Learning/DQN, Policy Gradients (PPO/SAC), and applications in robotics, self-driving cars, and Game AI (AlphaGo, ChatGPT's RLHF). Prerequisites: Python + basic probability.",
      modules: allProgrammingModules.filter(m => m.course === "rl"),
    },
  };

  const active = pillarData[activePillar];
  const activePillarMeta = pillars.find(p => p.id === activePillar)!;

  const COURSE_LD = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Lập trình Python và AI",
    "description": "Lộ trình lập trình toàn diện: Python từ cơ bản (47 bài), SQL, Machine Learning, Data Engineering, Software Engineering. Code trực tiếp trên trình duyệt với Pyodide.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "HaiEduTech",
      "url": "https://haiedutech.com"
    },
    "inLanguage": "vi",
    "url": "https://haiedutech.com/programming"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Học Lập Trình Python, SQL, ML, AI Tiếng Việt | HaiEduTech" description="Lộ trình lập trình toàn diện: Python từ cơ bản (47 bài), SQL, Machine Learning, Data Engineering, Software Engineering. Code trực tiếp trên trình duyệt với Pyodide." path="/programming" jsonLd={COURSE_LD} />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Code2 className="w-3 h-3" /> Career Path
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 text-foreground leading-tight">
              Programming{" "}
              <span className="text-gradient">Career Path</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              6 core pillars taking you from beginner to data & cloud technology expert.
            </p>
          </motion.div>

          {/* 5 Pillar Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto mb-10">
            {pillars.map((p, i) => {
              const data = pillarData[p.id];
              const isActive = activePillar === p.id;
              const Icon = p.icon;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActivePillar(p.id)}
                  className={`relative rounded-xl p-4 text-left transition-all duration-300 border active:scale-[0.97] ${
                    isActive
                      ? `${p.bgColor} ${p.borderColor} shadow-md`
                      : "bg-card border-border hover:border-primary/20 hover:shadow-sm"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-display font-bold text-sm mb-1 ${isActive ? p.accentColor : "text-foreground"}`}>
                    {t(data.title, data.titleEn)}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {data.isPathway ? t("6 module · ~47 bài · Pyodide", "6 modules · ~47 lessons · Pyodide") : `${data.modules.length} ${t("module", "modules")} · ${data.modules.reduce((acc, m) => acc + m.lessons.length, 0)} ${t("bài", "lessons")}`}
                  </p>
                  {isActive && (
                    <motion.div
                      layoutId="pillar-indicator"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${p.color}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active Pillar Content */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Pillar header */}
                <div className={`rounded-xl p-6 mb-6 border ${activePillarMeta.bgColor} ${activePillarMeta.borderColor}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activePillarMeta.color} flex items-center justify-center text-white shrink-0`}>
                      <activePillarMeta.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-foreground mb-1">
                        {t(active.title, active.titleEn)}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(active.desc, active.descEn)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Python Pathway hub (full lesson grid + Pyodide) */}
                {active.isPathway && <PythonPathwayHub />}

                {/* Python Challenges Section */}
                {active.challengeSection && (
                  <Link
                    to="/python-challenges"
                    className={`group block rounded-xl p-5 mb-6 border ${activePillarMeta.borderColor} bg-gradient-to-r from-emerald-500/5 to-green-500/5 hover:shadow-md transition-all active:scale-[0.99]`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                            150 Python Challenges
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Built-in IDE · Auto-grading · AI Debug
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={challengeProgress} className="h-2 flex-1" />
                      <span className="text-xs font-bold text-primary whitespace-nowrap">
                        {completedChallenges}/{pythonChallenges.length}
                      </span>
                    </div>
                  </Link>
                )}

                {/* Interview Questions Section - for AI & Data roles */}
                {(activePillar === "ai-foundation" || activePillar === "data-eng" || activePillar === "ml") && (
                  <>
                    <Link
                      to="/programming/interview-questions"
                      className="group block rounded-xl p-5 mb-4 border border-primary/20 bg-gradient-to-r from-indigo-500/5 to-violet-500/5 hover:shadow-md transition-all active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              Interview Questions: AI & Data Engineer
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              100 real-world questions · Detailed answers · Code examples
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>

                    <Link
                      to="/programming/job-opportunities"
                      className="group block rounded-xl p-5 mb-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 hover:shadow-md transition-all active:scale-[0.99]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-lg">
                            🎯
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                              Job Opportunities - Find tech jobs in Finland 🇫🇮
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              60+ companies · Data / AI / Language Tech · Career page + Live LinkedIn jobs
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </>
                )}

                {/* Module Cards */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {active.modules.map((mod, j) => (
                    <Link
                      key={mod.id}
                      to={`/programming/${mod.id}`}
                      className="group glass-card rounded-xl p-5 hover:border-primary/30 transition-all hover:shadow-md active:scale-[0.98]"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: j * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-lg`}>
                            {mod.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                              {t(mod.title, mod.titleEn)}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {mod.lessons.length} {t("bài", "lessons")}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {t(mod.description, mod.descriptionEn)}
                        </p>
                        {/* Mini roadmap */}
                        <div className="flex items-center gap-1.5 mt-3">
                          {mod.lessons.map((_, li) => (
                            <div key={li} className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                          ))}
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Python Review */}
            <PythonReview />

            {/* Skill Assessment */}
            <div className="mb-10">
              <AssessmentTool preSelectedSubject="programming" inline />
            </div>

            {/* IT Certifications */}
            <div className="mt-12">
              <CertCarousel title="IT Certifications" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Programming;
