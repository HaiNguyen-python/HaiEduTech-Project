import { useMemo } from "react";
import { motion } from "framer-motion";

// Symbol sets per pillar - keep playful, themed and short
const PILLAR_SYMBOLS: Record<string, string[]> = {
  "python-pathway": [
    "🐍", "def", "print()", "import", "for", "if", "list[]", "dict{}", "len()",
    "range()", "class", "self", "return", "lambda", "pip", "True", "None", "len",
  ],
  python: [
    "🐍", "def", "print()", "import", "for", "if", "while", "list[]", "dict{}",
    "set()", "range()", "lambda", "yield", "class", "self", "return", "True", "None",
  ],
  "software-eng": [
    "</>", "{}", "git", "commit", "branch", "PR", "merge", "SOLID", "TDD",
    "Agile", "refactor", "OOP", "CI/CD", "React", "useState", "props", "flex", "grid",
    "<html>", "CSS",
  ],
  "ai-foundation": [
    "🧠", "AI", "LLM", "GPT", "Claude", "Gemini", "tokens", "embedding",
    "vector", "RAG", "agent", "context", "🤖", "✨",
  ],
  "prompt-engineering": [
    "✨", "🪄", "prompt", "role:", "system:", "user:", "JSON", "few-shot",
    "CoT", "0-shot", "schema", "“You are…”", "tool_call", "temperature", "🧙",
  ],
  sql: [
    "🗄️", "SELECT", "FROM", "WHERE", "JOIN", "GROUP BY", "ORDER BY",
    "INDEX", "PRIMARY KEY", "COUNT()", "AVG()", "INNER", "LEFT", "DISTINCT", "*",
  ],
  "data-eng": [
    "🔄", "ETL", "ELT", "Airflow", "Kafka", "Spark", "DAG", "pipeline",
    "Parquet", "S3", "stream", "batch", "Pandas", "df", ".csv", ".json",
  ],
  ml: [
    "🤖", "model.fit", "sklearn", "X_train", "y_pred", "accuracy", "loss",
    "ROC", "F1", "k-NN", "SVM", "tree", "cluster", "regression", "σ",
  ],
  cloud: [
    "☁️", "AWS", "Azure", "GCP", "S3", "EC2", "λ Lambda", "IAM", "VPC",
    "Terraform", "k8s", "Docker", "FinOps", "CDN", "🔑",
  ],
  "deep-learning": [
    "🧠", "PyTorch", "CNN", "RNN", "LSTM", "ReLU", "softmax", "tensor",
    "epoch", "∂L/∂w", "∇", "backprop", "GPU", "embedding", "transformer",
  ],
  nlp: [
    "🗣️", "BERT", "GPT", "token", "[CLS]", "[SEP]", "embedding", "TF-IDF",
    "你好", "Hej", "Hello", "Xin chào", "n-gram", "vocab", "corpus",
  ],
  "reinforcement-learning": [
    "🎮", "state", "action", "reward", "π(s)", "Q(s,a)", "γ", "ε-greedy",
    "agent", "env", "policy", "PPO", "DQN", "MDP", "🏆",
  ],
  cybersecurity: [
    "🛡️", "🔒", "🔑", "SQLi", "XSS", "CSRF", "OWASP", "AuthN", "AuthZ",
    "JWT", "hash", "CVE", "TLS", "MFA", "RBAC", "0day",
  ],
  edtech: [
    "🎓", "📚", "SM-2", "mastery", "spaced", "tutor", "lesson", "quiz",
    "streak", "XP", "badge", "level up", "✏️", "💡",
  ],
  "professional-projects": [
    "🚀", "MVP", "deploy", "GitHub", "README", "CV", "portfolio",
    "stack", "API", "ship it", "v1.0", "PR", "demo", "✨",
  ],
};

const COLORS = [
  "hsl(var(--primary) / 0.52)",
  "hsl(var(--primary) / 0.38)",
  "hsl(var(--accent) / 0.48)",
  "hsl(var(--accent) / 0.34)",
  "hsl(var(--foreground) / 0.24)",
];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
  driftX: number;
  driftY: number;
}

function generateParticles(symbols: string[], count: number, seed: string): Particle[] {
  // Deterministic-ish shuffle per pillar so symbols feel stable per lesson
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  const shuffled = [...symbols].sort(() => rand() - 0.5);
  const picks = shuffled.slice(0, Math.min(count, shuffled.length));
  return picks.map((symbol, i) => ({
    id: i,
    symbol,
    x: rand() * 100,
    y: rand() * 100,
    size: 18 + rand() * 22,
    duration: 16 + rand() * 16,
    delay: rand() * -22,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    rotate: rand() * 360,
    driftX: (rand() - 0.5) * 140,
    driftY: (rand() - 0.5) * 110,
  }));
}

interface Props {
  pillarId?: string | null;
  count?: number;
  className?: string;
}

/**
 * Themed floating background symbols for a programming pillar.
 * Renders inside a relatively-positioned parent (fills with absolute inset-0).
 */
const LessonFloatingSymbols = ({ pillarId, count = 22, className = "" }: Props) => {
  const symbols = (pillarId && PILLAR_SYMBOLS[pillarId]) || PILLAR_SYMBOLS["python"];
  const particles = useMemo(
    () => generateParticles(symbols, count, pillarId || "default"),
    [symbols, count, pillarId]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none font-mono font-bold whitespace-nowrap drop-shadow-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: "0 6px 22px hsl(var(--primary) / 0.22)",
            willChange: "transform",
          }}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.5, p.driftX * 0.3, 0],
            y: [0, p.driftY, -p.driftY * 0.4, p.driftY * 0.7, 0],
            rotate: [p.rotate, p.rotate + 18, p.rotate - 12, p.rotate + 8, p.rotate],
            scale: [1, 1.06, 0.95, 1.03, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
};

export default LessonFloatingSymbols;
