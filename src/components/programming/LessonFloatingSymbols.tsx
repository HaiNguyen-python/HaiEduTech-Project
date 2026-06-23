import { useMemo } from "react";
import { motion } from "framer-motion";

// Symbol sets per pillar - keep playful, themed and rich. Particles cycle through
// these by repetition so you can request many more than the array length.
const PILLAR_SYMBOLS: Record<string, string[]> = {
  "python-pathway": [
    "🐍", "def", "print()", "import", "for", "if", "elif", "else", "while", "in",
    "list[]", "dict{}", "set()", "tuple()", "len()", "range()", "class", "self",
    "return", "lambda", "yield", "pip", "True", "False", "None", "with", "as",
    "try:", "except", ".append()", ".sort()", "f''", "input()", "int()", "str()",
    "0..n", "🧪", "🧠", "📦",
  ],
  python: [
    "🐍", "def", "print()", "import", "from", "for", "if", "while", "list[]",
    "dict{}", "set()", "range()", "lambda", "yield", "class", "self", "return",
    "True", "False", "None", "with", "as", "try:", "except", "raise", "f''",
    "input()", "int()", "str()", "float()", ".map()", ".filter()", "PEP8",
    "🐍", "🧪", "📦", "⚡",
  ],
  "software-eng": [
    "</>", "{}", "()", "[]", ";", "//", "git", "commit", "branch", "PR", "merge",
    "rebase", "SOLID", "DRY", "KISS", "TDD", "BDD", "Agile", "Scrum", "Kanban",
    "refactor", "OOP", "MVC", "CI/CD", "React", "useState", "useEffect", "props",
    "flex", "grid", "<html>", "</div>", "CSS", "tsc", "npm", "eslint", "prettier",
    "📦", "🚢", "🧪", "🔧", "🐛", "✅",
  ],
  "ai-foundation": [
    "🧠", "AI", "ML", "LLM", "GPT", "Claude", "Gemini", "tokens", "embedding",
    "vector", "RAG", "agent", "context", "prompt", "softmax", "ReLU", "∇", "Σ",
    "Q(s,a)", "loss", "epoch", "🤖", "✨", "🔮", "📈", "🎯",
  ],
  "prompt-engineering": [
    "✨", "🪄", "prompt", "role:", "system:", "user:", "assistant:", "JSON",
    "schema", "few-shot", "0-shot", "CoT", "ReAct", "tool_call", "temperature",
    "top_p", "stop", "\"You are…\"", "🧙", "🎭", "📝", "🔁", "🧩", "💡",
  ],
  sql: [
    "🗄️", "SELECT", "FROM", "WHERE", "JOIN", "GROUP BY", "ORDER BY", "HAVING",
    "LIMIT", "OFFSET", "INDEX", "PRIMARY KEY", "FOREIGN KEY", "COUNT()", "SUM()",
    "AVG()", "MAX()", "MIN()", "INNER", "LEFT", "RIGHT", "FULL", "DISTINCT",
    "UNION", "WITH", "CTE", "OVER()", "ROW_NUMBER()", "RANK()", "*", "NULL",
    "📊", "🗃️", "🔑",
  ],
  "data-eng": [
    "🔄", "ETL", "ELT", "Airflow", "Kafka", "Spark", "DAG", "pipeline", "schema",
    "Parquet", "Avro", "ORC", "S3", "GCS", "Snowflake", "BigQuery", "Redshift",
    "stream", "batch", "Pandas", "df", ".csv", ".json", "Iceberg", "dbt",
    "delta", "warehouse", "lake", "📦", "🚰", "⏱️",
  ],
  ml: [
    "🤖", "model.fit", "sklearn", "X_train", "y_pred", "accuracy", "precision",
    "recall", "loss", "ROC", "AUC", "F1", "k-NN", "SVM", "tree", "forest",
    "cluster", "regression", "MSE", "RMSE", "σ", "μ", "λ", "α", "📈", "📉",
    "🌲", "🎯",
  ],
  cloud: [
    "☁️", "AWS", "Azure", "GCP", "S3", "EC2", "λ Lambda", "IAM", "VPC", "ECS",
    "EKS", "RDS", "Terraform", "Pulumi", "k8s", "Docker", "Helm", "FinOps",
    "CDN", "Route53", "CloudFront", "🔑", "🌍", "🚀", "📡",
  ],
  "deep-learning": [
    "🧠", "PyTorch", "TensorFlow", "Keras", "CNN", "RNN", "LSTM", "GRU", "ReLU",
    "softmax", "sigmoid", "tanh", "tensor", "epoch", "batch", "∂L/∂w", "∇",
    "backprop", "GPU", "CUDA", "embedding", "transformer", "attention", "Adam",
    "SGD", "dropout", "🔥", "⚡",
  ],
  nlp: [
    "🗣️", "BERT", "GPT", "T5", "token", "[CLS]", "[SEP]", "[MASK]", "embedding",
    "TF-IDF", "BM25", "你好", "Hej", "Hello", "Xin chào", "Bonjour", "Hola",
    "n-gram", "vocab", "corpus", "lemma", "POS", "NER", "📚", "💬", "🌐",
  ],
  "reinforcement-learning": [
    "🎮", "state", "action", "reward", "π(s)", "Q(s,a)", "V(s)", "γ", "α",
    "ε-greedy", "agent", "env", "policy", "PPO", "DQN", "A2C", "SAC", "MDP",
    "Bellman", "rollout", "replay", "🏆", "🎯", "🕹️",
  ],
  cybersecurity: [
    "🛡️", "🔒", "🔑", "SQLi", "XSS", "CSRF", "SSRF", "RCE", "OWASP", "AuthN",
    "AuthZ", "JWT", "OAuth", "SAML", "hash", "salt", "CVE", "TLS", "mTLS",
    "MFA", "RBAC", "ABAC", "0day", "honeypot", "WAF", "🕵️", "🚨",
  ],
  edtech: [
    "🎓", "📚", "SM-2", "mastery", "spaced", "tutor", "lesson", "quiz", "rubric",
    "streak", "XP", "badge", "level up", "LMS", "SCORM", "xAPI", "adaptive",
    "ZPD", "Bloom", "✏️", "💡", "🏅", "🧠",
  ],
  "professional-projects": [
    "🚀", "MVP", "deploy", "GitHub", "README", "CV", "portfolio", "interview",
    "stack", "API", "ship it", "v1.0", "PR", "demo", "case study", "OKR",
    "✨", "🏗️", "🧰", "🎤",
  ],
};

const COLORS = [
  "hsl(var(--primary) / 0.55)",
  "hsl(var(--primary) / 0.40)",
  "hsl(var(--accent) / 0.50)",
  "hsl(var(--accent) / 0.36)",
  "hsl(217 91% 60% / 0.45)",
  "hsl(160 84% 39% / 0.45)",
  "hsl(var(--foreground) / 0.22)",
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
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  // Build a pool large enough for the requested count by repeating + shuffling.
  const pool: string[] = [];
  const reps = Math.max(1, Math.ceil(count / symbols.length));
  for (let r = 0; r < reps; r++) {
    const shuffled = [...symbols].sort(() => rand() - 0.5);
    pool.push(...shuffled);
  }
  const picks = pool.slice(0, count);
  return picks.map((symbol, i) => ({
    id: i,
    symbol,
    x: rand() * 100,
    y: rand() * 100,
    size: 14 + rand() * 24,
    duration: 14 + rand() * 18,
    delay: rand() * -24,
    color: COLORS[Math.floor(rand() * COLORS.length)],
    rotate: rand() * 360,
    driftX: (rand() - 0.5) * 160,
    driftY: (rand() - 0.5) * 130,
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
    () => generateParticles(symbols, count, `${pillarId || "default"}-${count}`),
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
