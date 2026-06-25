/**
 * Lesson-aware typing snippet bank.
 *
 * Maps keywords appearing in a lesson title (or module title) to a curated
 * ladder of code snippets ordered Easy -> Hard. CodeTypingRace uses this to
 * give learners drills that directly reinforce the topic they just studied
 * (e.g. a "Random Forest" lesson surfaces sklearn RandomForest snippets, not
 * generic print() drills).
 */
export interface TopicSnippets {
  /** Lowercase keywords / phrases that must appear in the lesson or module title. */
  match: string[];
  /** Programming language label (drives syntax label + Tab indent behaviour). */
  language: string;
  /** Snippet ladder, easiest first. Each entry should stay under ~180 chars. */
  snippets: string[];
}

export const TOPIC_SNIPPETS: TopicSnippets[] = [
  // ───── Machine Learning ─────────────────────────────────────────────
  {
    match: ["random forest", "rừng ngẫu nhiên"],
    language: "python",
    snippets: [
      "from sklearn.ensemble import RandomForestClassifier",
      "clf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)",
      "clf = RandomForestClassifier(n_estimators=200, max_depth=8, random_state=42)\nclf.fit(X_train, y_train)\nprint(clf.score(X_test, y_test))",
      "import pandas as pd\nimp = pd.Series(clf.feature_importances_, index=X.columns)\nprint(imp.sort_values(ascending=False).head(10))",
      "from sklearn.model_selection import cross_val_score\nscores = cross_val_score(clf, X, y, cv=5, scoring='f1')\nprint(scores.mean(), scores.std())",
    ],
  },
  {
    match: ["decision tree", "cây quyết định"],
    language: "python",
    snippets: [
      "from sklearn.tree import DecisionTreeClassifier",
      "tree = DecisionTreeClassifier(max_depth=4)\ntree.fit(X_train, y_train)",
      "tree = DecisionTreeClassifier(criterion='gini', max_depth=6, min_samples_leaf=20)\ntree.fit(X_train, y_train)\nprint(tree.score(X_test, y_test))",
      "from sklearn.tree import export_text\nprint(export_text(tree, feature_names=list(X.columns)))",
    ],
  },
  {
    match: ["k-means", "kmeans", "k means", "clustering", "phân cụm"],
    language: "python",
    snippets: [
      "from sklearn.cluster import KMeans",
      "km = KMeans(n_clusters=3, random_state=0)\nkm.fit(X)",
      "km = KMeans(n_clusters=4, n_init=10, random_state=42)\nlabels = km.fit_predict(X)\nprint(km.inertia_)",
      "import numpy as np\ninertias = [KMeans(k, n_init=10).fit(X).inertia_ for k in range(2, 9)]\nprint(np.argmin(np.diff(inertias)) + 3)",
    ],
  },
  {
    match: ["linear regression", "hồi quy tuyến"],
    language: "python",
    snippets: [
      "from sklearn.linear_model import LinearRegression",
      "model = LinearRegression()\nmodel.fit(X_train, y_train)\nprint(model.coef_, model.intercept_)",
      "from sklearn.metrics import mean_squared_error\npred = model.predict(X_test)\nprint(mean_squared_error(y_test, pred, squared=False))",
    ],
  },
  {
    match: ["logistic regression", "hồi quy logistic"],
    language: "python",
    snippets: [
      "from sklearn.linear_model import LogisticRegression",
      "clf = LogisticRegression(max_iter=500)\nclf.fit(X_train, y_train)",
      "from sklearn.metrics import classification_report\npred = clf.predict(X_test)\nprint(classification_report(y_test, pred))",
    ],
  },
  {
    match: ["feature engineering", "feature eng"],
    language: "python",
    snippets: [
      "df['age_bin'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 99])",
      "df['log_income'] = np.log1p(df['income'])\ndf['is_weekend'] = df['day'].isin(['Sat', 'Sun'])",
      "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X)",
    ],
  },
  {
    match: ["mlops", "model deployment", "model serving"],
    language: "python",
    snippets: [
      "import joblib\njoblib.dump(model, 'model.pkl')",
      "from fastapi import FastAPI\napp = FastAPI()\n\n@app.post('/predict')\ndef predict(x: list[float]):\n    return {'y': float(model.predict([x])[0])}",
      "import mlflow\nwith mlflow.start_run():\n    mlflow.log_param('depth', 6)\n    mlflow.log_metric('f1', 0.87)\n    mlflow.sklearn.log_model(model, 'rf')",
    ],
  },

  // ───── Deep Learning ────────────────────────────────────────────────
  {
    match: ["neural network", "perceptron", "mạng nơ"],
    language: "python",
    snippets: [
      "import torch.nn as nn\nlayer = nn.Linear(10, 1)",
      "import torch\nx = torch.randn(4, 10)\ny = torch.sigmoid(layer(x))\nprint(y.shape)",
      "model = nn.Sequential(\n    nn.Linear(784, 128),\n    nn.ReLU(),\n    nn.Linear(128, 10),\n)",
    ],
  },
  {
    match: ["cnn", "convolutional"],
    language: "python",
    snippets: [
      "import torch.nn as nn\nconv = nn.Conv2d(3, 16, kernel_size=3, padding=1)",
      "model = nn.Sequential(\n    nn.Conv2d(3, 32, 3, padding=1),\n    nn.ReLU(),\n    nn.MaxPool2d(2),\n)",
    ],
  },
  {
    match: ["rnn", "lstm", "gru"],
    language: "python",
    snippets: [
      "import torch.nn as nn\nrnn = nn.LSTM(input_size=64, hidden_size=128, batch_first=True)",
      "out, (h, c) = rnn(torch.randn(8, 20, 64))\nprint(out.shape, h.shape)",
    ],
  },
  {
    match: ["transformer", "attention"],
    language: "python",
    snippets: [
      "import torch\nq = k = v = torch.randn(1, 4, 8)\nattn = torch.softmax(q @ k.transpose(-2, -1) / 8**0.5, dim=-1)\nprint((attn @ v).shape)",
      "from transformers import AutoTokenizer, AutoModel\ntok = AutoTokenizer.from_pretrained('bert-base-uncased')\nmodel = AutoModel.from_pretrained('bert-base-uncased')",
    ],
  },
  {
    match: ["activation", "relu", "softmax", "sigmoid"],
    language: "python",
    snippets: [
      "import torch\nx = torch.tensor([-1.0, 0.0, 2.0])\nprint(torch.relu(x))",
      "import torch\nlogits = torch.tensor([2.0, 1.0, 0.1])\nprint(torch.softmax(logits, dim=0))",
    ],
  },

  // ───── NLP ──────────────────────────────────────────────────────────
  {
    match: ["tokeniz", "bpe", "wordpiece"],
    language: "python",
    snippets: [
      "text = 'Hello, HaiEduTech!'\nprint(text.lower().split())",
      "from transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained('bert-base-uncased')\nprint(tok.tokenize('Tokenization is fun!'))",
    ],
  },
  {
    match: ["embedding", "word2vec", "glove"],
    language: "python",
    snippets: [
      "import torch.nn as nn\nemb = nn.Embedding(num_embeddings=10000, embedding_dim=128)",
      "import numpy as np\na = np.array([1.0, 2.0, 3.0])\nb = np.array([2.0, 3.0, 4.0])\ncos = a @ b / (np.linalg.norm(a) * np.linalg.norm(b))\nprint(cos)",
    ],
  },
  {
    match: ["prompt engineering", "prompt design", "llm prompt"],
    language: "python",
    snippets: [
      "prompt = 'Summarize the article in 3 bullets:'",
      "system = 'You are a helpful tutor.'\nuser = 'Explain gradient descent in one paragraph.'",
      "messages = [\n    {'role': 'system', 'content': 'You are a strict grader.'},\n    {'role': 'user', 'content': 'Score this essay 1-10:'},\n]",
    ],
  },

  // ───── Data Engineering / Pandas ────────────────────────────────────
  {
    match: ["pandas", "dataframe"],
    language: "python",
    snippets: [
      "import pandas as pd\ndf = pd.read_csv('data.csv')",
      "df.head()\ndf.info()\ndf.describe()",
      "df['profit'] = df['revenue'] - df['cost']\ndf.groupby('region')['profit'].sum().sort_values(ascending=False)",
      "df = df.dropna(subset=['email']).drop_duplicates(subset=['user_id'])",
    ],
  },
  {
    match: ["etl", "pipeline", "data cleaning"],
    language: "python",
    snippets: [
      "import pandas as pd\nraw = pd.read_csv('raw.csv')",
      "clean = raw.dropna().assign(ts=pd.to_datetime(raw['ts']))",
      "clean.to_parquet('clean.parquet', index=False)",
    ],
  },
  {
    match: ["airflow", "orchestration", "dag"],
    language: "python",
    snippets: [
      "from airflow import DAG\nfrom datetime import datetime",
      "with DAG('etl', start_date=datetime(2026, 1, 1), schedule='@daily') as dag:\n    pass",
    ],
  },
  {
    match: ["spark"],
    language: "python",
    snippets: [
      "from pyspark.sql import SparkSession\nspark = SparkSession.builder.appName('demo').getOrCreate()",
      "df = spark.read.parquet('s3://bucket/events/')\ndf.groupBy('country').count().show()",
    ],
  },

  // ───── SQL ──────────────────────────────────────────────────────────
  {
    match: ["select", "where", "filter"],
    language: "sql",
    snippets: [
      "SELECT * FROM users LIMIT 10;",
      "SELECT name, email FROM users WHERE active = TRUE;",
      "SELECT name, score\nFROM students\nWHERE score >= 80\nORDER BY score DESC;",
    ],
  },
  {
    match: ["join"],
    language: "sql",
    snippets: [
      "SELECT u.name, o.total\nFROM users u\nJOIN orders o ON o.user_id = u.id;",
      "SELECT u.name, COUNT(o.id) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.name;",
    ],
  },
  {
    match: ["group by", "aggregate"],
    language: "sql",
    snippets: [
      "SELECT region, COUNT(*) FROM sales GROUP BY region;",
      "SELECT region, SUM(amount) AS total\nFROM sales\nGROUP BY region\nHAVING SUM(amount) > 1000\nORDER BY total DESC;",
    ],
  },
  {
    match: ["window function", "window func", "row_number", "rank"],
    language: "sql",
    snippets: [
      "SELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rk\nFROM employees;",
      "SELECT user_id, event_at,\n  LAG(event_at) OVER (PARTITION BY user_id ORDER BY event_at) AS prev\nFROM events;",
    ],
  },
  {
    match: ["index", "optimization", "query plan"],
    language: "sql",
    snippets: [
      "CREATE INDEX idx_users_email ON users(email);",
      "EXPLAIN ANALYZE\nSELECT * FROM orders WHERE user_id = 42;",
    ],
  },

  // ───── Web / API / Software Engineering ─────────────────────────────
  {
    match: ["rest", "api", "fastapi"],
    language: "python",
    snippets: [
      "from fastapi import FastAPI\napp = FastAPI()",
      "@app.get('/health')\ndef health():\n    return {'status': 'ok'}",
      "@app.get('/users/{user_id}')\ndef get_user(user_id: int):\n    return {'id': user_id, 'name': 'Hai'}",
    ],
  },
  {
    match: ["graphql"],
    language: "javascript",
    snippets: [
      "const query = `query { user(id: 1) { name email } }`;",
      "const res = await fetch('/graphql', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ query }),\n});",
    ],
  },
  {
    match: ["git", "branching", "version control"],
    language: "bash",
    snippets: [
      "git status",
      "git checkout -b feature/login",
      "git add .\ngit commit -m 'feat: add login form'\ngit push -u origin feature/login",
    ],
  },
  {
    match: ["docker", "container"],
    language: "bash",
    snippets: [
      "docker ps",
      "docker build -t haiedu-web .",
      "docker run -d -p 8080:80 --name web haiedu-web",
    ],
  },
  {
    match: ["kubernetes", "k8s"],
    language: "bash",
    snippets: [
      "kubectl get pods",
      "kubectl apply -f deployment.yaml\nkubectl rollout status deployment/web",
    ],
  },
  {
    match: ["testing", "pytest", "unit test"],
    language: "python",
    snippets: [
      "def test_sum():\n    assert 1 + 1 == 2",
      "import pytest\n\n@pytest.fixture\ndef user():\n    return {'id': 1, 'name': 'Hai'}\n\ndef test_user(user):\n    assert user['id'] == 1",
    ],
  },
  {
    match: ["ci/cd", "cicd", "github action"],
    language: "bash",
    snippets: [
      "name: ci\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest",
    ],
  },
  {
    match: ["clean code", "code review", "best practice"],
    language: "python",
    snippets: [
      "def total_price(items: list[float], tax: float) -> float:\n    return round(sum(items) * (1 + tax), 2)",
      "if not user.is_active:\n    raise PermissionError('User is disabled')",
    ],
  },
  {
    match: ["debug", "debugging", "logging"],
    language: "python",
    snippets: [
      "import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info('Starting job')",
      "import pdb; pdb.set_trace()",
    ],
  },
  {
    match: ["observability", "monitor", "metric"],
    language: "python",
    snippets: [
      "from prometheus_client import Counter\nrequests = Counter('http_requests_total', 'Total requests')",
      "requests.inc()\nprint(requests._value.get())",
    ],
  },

  // ───── Cloud / Security ─────────────────────────────────────────────
  {
    match: ["aws", "s3", "ec2"],
    language: "python",
    snippets: [
      "import boto3\ns3 = boto3.client('s3')",
      "s3.upload_file('local.txt', 'my-bucket', 'remote.txt')",
    ],
  },
  {
    match: ["serverless", "lambda"],
    language: "javascript",
    snippets: [
      "export const handler = async (event) => {\n  return { statusCode: 200, body: 'ok' };\n};",
    ],
  },
  {
    match: ["cybersecurity", "security", "owasp", "xss", "sql injection"],
    language: "python",
    snippets: [
      "import bcrypt\nhashed = bcrypt.hashpw(b'pass123', bcrypt.gensalt())",
      "from html import escape\nsafe = escape('<script>alert(1)</script>')\nprint(safe)",
      "cur.execute('SELECT * FROM users WHERE id = %s', (user_id,))",
    ],
  },

  // ───── Reinforcement Learning ───────────────────────────────────────
  {
    match: ["reinforcement", "q-learning", "qlearning", "policy gradient", "bellman"],
    language: "python",
    snippets: [
      "import numpy as np\nQ = np.zeros((5, 2))",
      "Q[s, a] = Q[s, a] + 0.1 * (r + 0.9 * Q[s_next].max() - Q[s, a])",
    ],
  },

  // ───── Python fundamentals ──────────────────────────────────────────
  {
    match: ["list comprehension", "comprehension"],
    language: "python",
    snippets: [
      "squares = [n * n for n in range(10)]",
      "evens = [n for n in range(20) if n % 2 == 0]",
      "matrix = [[r * c for c in range(4)] for r in range(4)]",
    ],
  },
  {
    match: ["dictionary", "dict"],
    language: "python",
    snippets: [
      "user = {'name': 'Hai', 'age': 30}",
      "for k, v in user.items():\n    print(k, '->', v)",
    ],
  },
  {
    match: ["recursion", "đệ quy"],
    language: "python",
    snippets: [
      "def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)",
      "def fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)",
    ],
  },
  {
    match: ["regex", "regular expression"],
    language: "python",
    snippets: [
      "import re\nprint(re.findall(r'\\d+', 'abc 123 def 45'))",
      "import re\nemail = 'hai@haiedutech.com'\nprint(bool(re.match(r'^[\\w.]+@[\\w.]+\\.[a-z]{2,}$', email)))",
    ],
  },
  {
    match: ["async", "asyncio", "await"],
    language: "python",
    snippets: [
      "import asyncio\nasync def main():\n    print('hi')\n\nasyncio.run(main())",
      "import asyncio\nasync def fetch(i):\n    await asyncio.sleep(0.1)\n    return i\n\nasyncio.run(asyncio.gather(*[fetch(i) for i in range(3)]))",
    ],
  },
  {
    match: ["class", "oop", "object"],
    language: "python",
    snippets: [
      "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f'{self.name} says woof!'",
    ],
  },
];

/**
 * Find the best topic match for a lesson by scanning the title (and module title)
 * for any of the registered keywords. Returns null if no topic matches.
 */
export function resolveTopicSnippets(
  lessonTitle = "",
  moduleTitle = "",
): TopicSnippets | null {
  const hay = `${lessonTitle} ${moduleTitle}`.toLowerCase();
  let best: TopicSnippets | null = null;
  let bestLen = 0;
  for (const t of TOPIC_SNIPPETS) {
    for (const kw of t.match) {
      if (hay.includes(kw) && kw.length > bestLen) {
        best = t;
        bestLen = kw.length;
      }
    }
  }
  return best;
}
