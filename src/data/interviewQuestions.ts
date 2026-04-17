/**
 * @file interviewQuestions.ts
 * @description Curated interview questions for AI Engineer & Data Engineer roles.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type InterviewRole = "ai-engineer" | "data-engineer";
export type InterviewDifficulty = "Junior" | "Mid" | "Senior";

export interface InterviewQuestion {
  id: string;
  role: InterviewRole;
  category: string;
  difficulty: InterviewDifficulty;
  question: string;
  answer: string;
  keyPoints: string[];
  tldr?: string;
  pitfalls?: string[];
  interviewTip?: string;
  codeExample?: { language: string; code: string };
  tags?: string[];
}

export const interviewCategories: Record<InterviewRole, string[]> = {
  "ai-engineer": [
    "LLMs & Prompt Engineering",
    "Machine Learning Fundamentals",
    "Deep Learning & Neural Networks",
    "AI System Design & Ethics",
  ],
  "data-engineer": [
    "SQL & Databases",
    "Data Pipelines & ETL",
    "Big Data & Cloud",
    "System Design",
  ],
};

export const interviewQuestions: InterviewQuestion[] = [
  // ============================================================
  // AI ENGINEER — LLMs & Prompt Engineering
  // ============================================================
  {
    id: "ai-llm-1",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Junior",
    question: "What is a Large Language Model (LLM) and how does it work at a high level?",
    answer:
      "An LLM is a neural network (typically a Transformer) trained on massive text corpora to predict the next token given prior context. It learns statistical patterns of language and world knowledge implicitly through self-supervised learning. At inference time, it generates text autoregressively — sampling one token at a time conditioned on the prompt and previously generated tokens.",
    keyPoints: [
      "Transformer architecture with self-attention",
      "Self-supervised pretraining on next-token prediction",
      "Autoregressive generation at inference",
      "Tokens (subwords via BPE/SentencePiece), not words",
      "Examples: GPT-4, Claude, Gemini, Llama",
    ],
    tags: ["LLM", "fundamentals"],
  },
  {
    id: "ai-llm-2",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "Explain Retrieval-Augmented Generation (RAG). When should you use it instead of fine-tuning?",
    answer:
      "RAG combines a retriever (often a vector database) with a generator (LLM). At query time, the system embeds the user query, retrieves the top-k most relevant chunks from a knowledge base, and injects them into the prompt as context. The LLM then generates a grounded answer. Use RAG when knowledge changes frequently, when you need citations/traceability, or when the corpus is too large to fit in context. Use fine-tuning when you need to teach style, format, or domain-specific behavior that prompting alone cannot achieve.",
    keyPoints: [
      "Pipeline: chunk → embed → store → retrieve → augment → generate",
      "Reduces hallucinations by grounding in source documents",
      "Cheaper and faster to update than fine-tuning",
      "Fine-tune for behavior; RAG for knowledge",
      "Hybrid search (BM25 + vector) often outperforms pure vector",
    ],
    codeExample: {
      language: "python",
      code: `from sentence_transformers import SentenceTransformer
import numpy as np

embedder = SentenceTransformer("all-MiniLM-L6-v2")
docs = ["Paris is the capital of France.", "Python was created by Guido."]
doc_vecs = embedder.encode(docs)

def retrieve(query, k=2):
    q_vec = embedder.encode([query])[0]
    scores = doc_vecs @ q_vec
    top = np.argsort(scores)[::-1][:k]
    return [docs[i] for i in top]

context = "\\n".join(retrieve("Who created Python?"))
prompt = f"Context:\\n{context}\\n\\nAnswer the question using only the context."`,
    },
    tags: ["RAG", "vector-db", "embeddings"],
  },
  {
    id: "ai-llm-3",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "What causes LLM hallucinations and what are practical mitigation strategies?",
    answer:
      "Hallucinations are confident but factually incorrect outputs. Causes include: training data gaps, optimization for fluency rather than truthfulness, lossy compression of knowledge into weights, and insufficient grounding context. Mitigations: (1) RAG with authoritative sources, (2) lower temperature, (3) chain-of-thought + self-consistency, (4) explicit instructions to say 'I don't know', (5) post-generation verification with a separate model or rule check, (6) constrained decoding for structured outputs.",
    keyPoints: [
      "Use RAG to ground answers",
      "Set temperature low (0–0.3) for factual tasks",
      "Add 'If unsure, say I don't know' to system prompt",
      "Verify with a second LLM call (LLM-as-judge)",
      "Use JSON mode / schema validation for structured outputs",
    ],
    tags: ["hallucination", "reliability"],
  },
  {
    id: "ai-llm-4",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Senior",
    question: "How do you decide between prompt engineering, RAG, and fine-tuning for a production use case?",
    answer:
      "Decision framework based on: (1) task type — behavior/style → fine-tune, knowledge → RAG, simple reformulation → prompt; (2) data freshness — dynamic → RAG, static → fine-tune; (3) cost & latency budget — prompt is cheapest; (4) traceability — RAG provides citations; (5) data volume — fine-tune needs ~hundreds to thousands of examples. Typical progression: start with prompt engineering → add RAG when knowledge gaps appear → fine-tune only when prompting hits a quality ceiling. Often combined: fine-tuned model + RAG context.",
    keyPoints: [
      "Always start with prompt engineering (cheapest, fastest)",
      "Add RAG for knowledge-intensive or citation-required tasks",
      "Fine-tune for consistent style, format, or domain tone",
      "PEFT methods (LoRA, QLoRA) reduce fine-tune cost dramatically",
      "Evaluate with held-out test set + human review",
    ],
    tags: ["architecture", "decision-making"],
  },
  {
    id: "ai-llm-5",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "What is the context window and how do you handle inputs that exceed it?",
    answer:
      "The context window is the maximum number of tokens a model can process in a single forward pass (e.g., GPT-4o ~128K, Claude 3.5 ~200K, Gemini 1.5 ~2M). Exceeding it causes truncation or errors. Strategies: (1) chunking + RAG, (2) hierarchical summarization (summarize chunks, then summarize summaries), (3) sliding window with overlap, (4) map-reduce pattern, (5) use a long-context model, (6) extract only relevant sections via a cheap pre-filter.",
    keyPoints: [
      "Tokens ≠ words (~0.75 words per token in English)",
      "Long context costs more and is slower",
      "RAG > stuffing the entire corpus into context",
      "Position bias: models often pay more attention to start/end ('lost in the middle')",
      "Token counting libraries: tiktoken (OpenAI), tokenizer (HF)",
    ],
    tags: ["context-window", "tokens"],
  },
  {
    id: "ai-llm-6",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Senior",
    question: "Explain Chain-of-Thought (CoT) prompting and when it helps vs. hurts.",
    answer:
      "CoT prompting asks the model to produce intermediate reasoning steps before the final answer (e.g., 'Let's think step by step'). It significantly improves performance on multi-step reasoning tasks (math, logic, planning) by allocating more compute per token and surfacing errors. However, it increases latency and cost, can amplify confidently-wrong reasoning, and provides little benefit on simple lookup tasks. Variants: zero-shot CoT, few-shot CoT, self-consistency (sample multiple chains, majority vote), and Tree-of-Thoughts for search-based reasoning.",
    keyPoints: [
      "Helps: math, logic, multi-hop QA, planning",
      "Hurts: simple classification, latency-critical paths",
      "Self-consistency: sample N chains, take majority answer",
      "Recent reasoning models (o1, DeepSeek-R1) train CoT into weights",
      "Hide CoT from end users; show only the final answer",
    ],
    tags: ["CoT", "reasoning"],
  },
  // ============================================================
  // AI ENGINEER — Machine Learning Fundamentals
  // ============================================================
  {
    id: "ai-ml-1",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Junior",
    question: "Explain overfitting and underfitting. How do you detect and address each?",
    answer:
      "Overfitting: model memorizes training data and fails on new data — high train accuracy, low validation accuracy. Underfitting: model is too simple to capture patterns — low accuracy on both. Detect via train/validation gap. Address overfitting with: more data, regularization (L1/L2, dropout), early stopping, simpler model, data augmentation. Address underfitting with: bigger model, more features, longer training, less regularization.",
    keyPoints: [
      "Plot train vs validation loss curves",
      "Overfit signal: train ↓ but val ↑",
      "Underfit signal: both high",
      "Cross-validation for small datasets",
      "Regularization adds penalty on weights",
    ],
    tags: ["overfitting", "regularization"],
  },
  {
    id: "ai-ml-2",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "Explain the bias-variance tradeoff.",
    answer:
      "Total error = bias² + variance + irreducible noise. Bias is error from oversimplified assumptions (underfitting); variance is sensitivity to small fluctuations in training data (overfitting). High-bias models (linear regression on nonlinear data) underfit; high-variance models (deep trees) overfit. The goal is to find the sweet spot. Techniques like ensembling (bagging reduces variance, boosting reduces bias) and regularization help navigate this tradeoff.",
    keyPoints: [
      "Bias = wrong assumptions, Variance = noise sensitivity",
      "More complex model → less bias, more variance",
      "Bagging (Random Forest) → reduces variance",
      "Boosting (XGBoost) → reduces bias",
      "More data primarily reduces variance",
    ],
    tags: ["bias-variance"],
  },
  {
    id: "ai-ml-3",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "Which evaluation metrics would you use for an imbalanced classification problem (e.g., fraud detection)?",
    answer:
      "Accuracy is misleading on imbalanced data (99% accuracy by predicting 'no fraud' always). Better metrics: Precision (of predicted positives, how many are correct), Recall (of actual positives, how many we caught), F1 (harmonic mean), PR-AUC (area under precision-recall curve, more informative than ROC-AUC for rare positives), and confusion matrix. The choice depends on cost: fraud detection prioritizes recall (don't miss fraud); spam filter prioritizes precision (don't flag legit mail).",
    keyPoints: [
      "Avoid plain accuracy",
      "Precision-Recall curve > ROC for rare classes",
      "F1 balances precision and recall",
      "Choose threshold based on business cost matrix",
      "Techniques: SMOTE, class weights, focal loss",
    ],
    tags: ["metrics", "imbalanced"],
  },
  {
    id: "ai-ml-4",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Senior",
    question: "How do you prevent data leakage in an ML pipeline?",
    answer:
      "Data leakage = information from outside the training set sneaks into the model, causing inflated metrics that don't generalize. Common sources: (1) fitting scalers/encoders on full dataset before split, (2) including target-derived features (e.g., 'days_until_churn'), (3) temporal leakage (using future data in past predictions), (4) target encoding without out-of-fold computation, (5) duplicate samples across train/test. Prevention: split first, then preprocess inside CV folds; use time-based splits for temporal data; audit features for target dependence; use sklearn Pipeline to enforce fit-on-train-only.",
    keyPoints: [
      "Always split BEFORE preprocessing",
      "Use sklearn Pipeline + cross_val_score",
      "Time series → forward-chaining CV, never random",
      "Check for duplicates between train/test",
      "Suspicious sign: validation accuracy too good to be true",
    ],
    codeExample: {
      language: "python",
      code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# CORRECT: scaler fits only on train fold
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression()),
])
scores = cross_val_score(pipe, X, y, cv=5)`,
    },
    tags: ["data-leakage", "best-practices"],
  },
  {
    id: "ai-ml-5",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "What is cross-validation and why is k-fold preferred over a single train/test split?",
    answer:
      "Cross-validation rotates the held-out fold across the dataset to get a more robust estimate of model performance. k-fold splits data into k parts, trains on k-1 and tests on 1, repeating k times and averaging. Benefits: reduces variance of the performance estimate, uses all data for both training and validation, exposes overfitting, and provides confidence intervals. Variants: stratified k-fold (preserves class ratios), group k-fold (no group leakage), time-series split (forward chaining for temporal data).",
    keyPoints: [
      "Typical k=5 or k=10",
      "Stratified k-fold for classification",
      "Group k-fold when samples cluster (same user/patient)",
      "Time series: never random — use TimeSeriesSplit",
      "Nested CV for hyperparameter tuning + evaluation",
    ],
    tags: ["cross-validation"],
  },
  // ============================================================
  // AI ENGINEER — Deep Learning & Neural Networks
  // ============================================================
  {
    id: "ai-dl-1",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Mid",
    question: "Explain the Transformer architecture. Why did it replace RNNs for most NLP tasks?",
    answer:
      "Transformers process all tokens in parallel using self-attention, where each token computes weighted relationships with every other token. Architecture: input embeddings + positional encoding → stack of (multi-head self-attention + feed-forward) blocks with residual connections and layer norm. Advantages over RNNs: (1) parallel training (much faster on GPUs), (2) better long-range dependencies (no vanishing gradients across sequence), (3) more interpretable (attention weights), (4) scales gracefully to billions of parameters.",
    keyPoints: [
      "Self-attention: Q, K, V matrices; attention = softmax(QK^T / √d) V",
      "Multi-head: parallel attention with different learned projections",
      "Positional encoding compensates for parallel (order-free) processing",
      "Encoder-only (BERT), Decoder-only (GPT), Encoder-Decoder (T5)",
      "Quadratic cost in sequence length — hence long-context research",
    ],
    tags: ["transformer", "attention"],
  },
  {
    id: "ai-dl-2",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Junior",
    question: "What is backpropagation in a neural network?",
    answer:
      "Backpropagation is the algorithm that computes gradients of the loss with respect to every parameter via the chain rule, propagating from the output layer backward to the input. Combined with an optimizer (SGD, Adam), it updates weights to minimize loss. Steps: (1) forward pass computes prediction and loss, (2) backward pass computes gradients layer by layer, (3) optimizer applies updates: w := w − lr · ∂L/∂w.",
    keyPoints: [
      "Chain rule of calculus applied layer by layer",
      "Requires differentiable operations",
      "Frameworks (PyTorch, TF) auto-compute via autograd",
      "Vanishing/exploding gradients in deep networks → solved by ReLU, residual connections, normalization",
      "Learning rate is the most important hyperparameter",
    ],
    tags: ["backprop", "training"],
  },
  {
    id: "ai-dl-3",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Senior",
    question: "Compare optimizers: SGD, Momentum, Adam. When would you choose each?",
    answer:
      "SGD: pure stochastic gradient descent — simple, well-understood generalization, but slow and sensitive to learning rate. Momentum: accumulates velocity to dampen oscillations and accelerate in consistent directions. Adam: adaptive per-parameter learning rates via running estimates of first (mean) and second (variance) moments — converges fast on most problems with little tuning. Choose: Adam/AdamW as default for deep learning; SGD+Momentum for vision tasks where it often generalizes better at scale; LAMB/LARS for very large batches; Lion for memory-constrained large models.",
    keyPoints: [
      "AdamW = Adam + decoupled weight decay (preferred for transformers)",
      "Learning rate warmup helps stability for large models",
      "Cosine schedule is a common default",
      "SGD often generalizes better but needs careful tuning",
      "Gradient clipping prevents explosions in RNNs/LLMs",
    ],
    tags: ["optimizers"],
  },
  {
    id: "ai-dl-4",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Mid",
    question: "What is transfer learning and how does it apply to modern AI?",
    answer:
      "Transfer learning reuses a model pretrained on a large general dataset and adapts it to a specific downstream task. In vision: take a CNN pretrained on ImageNet, replace the final layer, fine-tune on your dataset. In NLP: take a pretrained Transformer (BERT, Llama), add a task head or fine-tune. Benefits: dramatically less data and compute needed, better performance on small datasets. Modern variants: full fine-tuning, head-only tuning, parameter-efficient methods (LoRA, adapters, prompt tuning).",
    keyPoints: [
      "Pretrained model = feature extractor",
      "Lower learning rate when fine-tuning (avoid catastrophic forgetting)",
      "LoRA: trains tiny low-rank matrices, freezes base — 100× cheaper",
      "Foundation models = pretrained models reused everywhere",
      "Domain adaptation = transfer when source/target distributions differ",
    ],
    tags: ["transfer-learning", "fine-tuning"],
  },
  // ============================================================
  // AI ENGINEER — System Design & Ethics
  // ============================================================
  {
    id: "ai-sys-1",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "Design a production RAG system serving 1000 QPS over a 10M-document corpus.",
    answer:
      "Architecture: (1) Ingestion pipeline — chunk documents (500–1000 tokens with overlap), embed with a strong model (e.g., text-embedding-3-large), store vectors + metadata in a managed vector DB (Pinecone, Weaviate, pgvector). (2) Query path — embed query, hybrid search (BM25 + ANN), rerank top 50 → top 5 with a cross-encoder, build prompt, stream LLM response. (3) Infra — separate stateless API tier behind a load balancer, auto-scaling LLM workers (or managed API), Redis cache for embedding+answer cache (high cache-hit on hot queries). (4) Observability — log queries, retrieved chunks, latencies, faithfulness scores. (5) Cost controls — quantized embeddings, batched inference, smaller cheaper LLM for easy queries (router pattern).",
    keyPoints: [
      "Chunking strategy is the #1 quality lever",
      "Hybrid retrieval (BM25 + vector) outperforms pure vector",
      "Reranking with cross-encoder dramatically improves precision",
      "Cache embeddings AND answers (semantic cache)",
      "Latency budget: retrieval ~50ms, generation streaming ~first token <1s",
    ],
    tags: ["system-design", "RAG"],
  },
  {
    id: "ai-sys-2",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Mid",
    question: "How do you evaluate an LLM application beyond accuracy?",
    answer:
      "LLM apps need multi-dimensional eval: (1) Task quality — exact match, ROUGE/BLEU for summarization, LLM-as-judge for open-ended; (2) Faithfulness — does the answer follow from retrieved context (RAGAS, TruLens); (3) Safety — toxicity, jailbreak resistance, PII leaks; (4) Latency — p50, p95, time-to-first-token; (5) Cost — tokens per request × price; (6) User signals — thumbs up/down, edit-rate, session length. Build a 'golden set' of 50–500 representative examples + automated evals on every code change (CI for prompts).",
    keyPoints: [
      "LLM-as-judge for scalable eval (use stronger model)",
      "RAGAS metrics: faithfulness, answer relevance, context precision",
      "Always include a golden set + regression tests",
      "Track quality drift in production via online metrics",
      "Human-in-the-loop sampling for high-stakes outputs",
    ],
    tags: ["evaluation", "monitoring"],
  },
  {
    id: "ai-sys-3",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Mid",
    question: "What is bias in ML models and how do you mitigate it?",
    answer:
      "Bias = systematic, unfair outcomes for certain groups (gender, race, age, geography). Sources: biased training data (historical hiring data favoring men), biased labels (annotator bias), biased features (zip code as proxy for race), biased optimization (majority-class dominance). Mitigations: (1) audit training data composition, (2) fairness metrics (demographic parity, equal opportunity, equalized odds), (3) re-sampling or re-weighting underrepresented groups, (4) adversarial debiasing, (5) post-hoc threshold adjustment per group, (6) document with model cards and datasheets.",
    keyPoints: [
      "There is no single 'fairness' definition — pick based on context",
      "Removing protected attribute alone doesn't fix bias (proxies remain)",
      "Continuous monitoring in production for fairness drift",
      "Diverse review teams catch issues a homogeneous team misses",
      "EU AI Act and similar regulations now enforce this",
    ],
    tags: ["ethics", "bias", "fairness"],
  },
  {
    id: "ai-sys-4",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "How do you reduce LLM inference latency and cost in production?",
    answer:
      "Latency: (1) stream tokens — first token arrives in <1s; (2) smaller distilled models for simple queries (router pattern: cheap model classifies, hard queries escalate); (3) speculative decoding — small model drafts, large model verifies; (4) prompt caching (Anthropic, OpenAI); (5) reduce output tokens with stop sequences and concise instructions; (6) batch concurrent requests on self-hosted models. Cost: (1) cache responses (exact + semantic); (2) shorter prompts via summary memory; (3) move from premium to mid-tier model where quality allows; (4) quantization (int8/int4) for self-hosted; (5) negotiate volume pricing or use open-weight models with vLLM/TGI.",
    keyPoints: [
      "Streaming hides total latency from users",
      "Router: cheap classifier picks model size",
      "Semantic cache catches paraphrased repeat queries",
      "vLLM, TGI, TensorRT-LLM for self-hosted throughput",
      "Measure cost per successful task, not per token",
    ],
    tags: ["performance", "cost-optimization"],
  },

  // ============================================================
  // DATA ENGINEER — SQL & Databases
  // ============================================================
  {
    id: "de-sql-1",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Junior",
    question: "Explain the difference between INNER, LEFT, RIGHT, and FULL OUTER JOIN.",
    answer:
      "INNER JOIN returns rows with matching keys in both tables. LEFT JOIN returns all rows from the left table plus matched rows from the right (NULL for missing). RIGHT JOIN is the mirror: all rows from the right plus matches. FULL OUTER JOIN returns all rows from both, with NULLs where there's no match. Use INNER for strict intersection, LEFT for 'keep all customers, even those without orders', FULL OUTER for reconciliation/diff between two datasets.",
    keyPoints: [
      "INNER = intersection",
      "LEFT/RIGHT = one full side + matches",
      "FULL OUTER = union of all rows",
      "CROSS JOIN = Cartesian product (be careful)",
      "Always specify ON condition; missing it = accidental Cartesian",
    ],
    codeExample: {
      language: "sql",
      code: `-- All customers with their order count (0 if none)
SELECT c.id, c.name, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;`,
    },
    tags: ["SQL", "joins"],
  },
  {
    id: "de-sql-2",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Mid",
    question: "What is a database index, and what are the tradeoffs?",
    answer:
      "An index is a separate data structure (typically a B-tree) that maps column values to row locations, enabling fast lookups, range scans, and ORDER BY without full table scans. Tradeoffs: (1) faster reads, slower writes (every INSERT/UPDATE/DELETE updates indexes); (2) extra storage; (3) only helpful when selectivity is high — indexing a boolean is usually pointless. Types: B-tree (default, range queries), Hash (equality only), GIN/GiST (full-text, JSON, geospatial), partial (subset of rows), covering (includes extra columns to avoid table lookup).",
    keyPoints: [
      "Index columns used in WHERE, JOIN, ORDER BY",
      "Composite index column order matters: most selective first",
      "Use EXPLAIN ANALYZE to verify the planner picks your index",
      "Too many indexes hurt write throughput",
      "Partial index for sparse predicates (WHERE status = 'active')",
    ],
    tags: ["indexing", "performance"],
  },
  {
    id: "de-sql-3",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Mid",
    question: "Explain SQL window functions and give a real use case.",
    answer:
      "Window functions perform calculations across a set of rows ('window') related to the current row, without collapsing them like GROUP BY does. Syntax: function() OVER (PARTITION BY ... ORDER BY ... ROWS ...). Common functions: ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD, SUM/AVG (running totals), NTILE. Real use cases: deduplication (ROW_NUMBER per key, keep row 1), running totals, month-over-month growth (LAG), top-N per category, sessionization in event data.",
    keyPoints: [
      "Window functions don't reduce row count",
      "PARTITION BY = group, ORDER BY = sort within group",
      "ROW_NUMBER for dedup, RANK for ties",
      "LAG/LEAD for time-series comparisons",
      "Frame clause (ROWS BETWEEN) controls running window scope",
    ],
    codeExample: {
      language: "sql",
      code: `-- Keep only the latest order per customer
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY created_at DESC
    ) AS rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;`,
    },
    tags: ["window-functions", "SQL"],
  },
  {
    id: "de-sql-4",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Senior",
    question: "Explain database normalization vs. denormalization. When do you choose each?",
    answer:
      "Normalization splits data into related tables to eliminate redundancy and update anomalies (1NF: atomic columns; 2NF: no partial dependencies; 3NF: no transitive dependencies). Best for OLTP workloads with frequent writes. Denormalization deliberately duplicates data to speed up reads at the cost of storage and write complexity — best for OLAP/analytics where joins on huge tables are expensive. Star schema (denormalized fact + small dim tables) is the standard analytics pattern. Modern lakehouses often denormalize for performance and re-derive via incremental ETL.",
    keyPoints: [
      "OLTP → normalized (3NF)",
      "OLAP / data warehouse → denormalized (star/snowflake)",
      "Denormalization trades storage for query speed",
      "Materialized views = controlled denormalization",
      "Update anomalies: same fact stored in two places drifting apart",
    ],
    tags: ["normalization", "data-modeling"],
  },
  {
    id: "de-sql-5",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Mid",
    question: "How do you find and fix duplicate rows in a SQL table?",
    answer:
      "Find duplicates by grouping on the natural key and counting: SELECT key_cols, COUNT(*) FROM t GROUP BY key_cols HAVING COUNT(*) > 1. To delete duplicates while keeping one: use ROW_NUMBER() in a CTE and delete rows where rn > 1, or DELETE USING with self-join on ctid (Postgres). Prevention is better: add a UNIQUE constraint or use INSERT ... ON CONFLICT DO NOTHING / MERGE. For bulk deduplication in pipelines, use SELECT DISTINCT ON (Postgres) or QUALIFY ROW_NUMBER() = 1 (Snowflake/BigQuery).",
    keyPoints: [
      "Define what 'duplicate' means (which columns are the key)",
      "Use ROW_NUMBER OVER (PARTITION BY key ORDER BY tiebreaker)",
      "Add UNIQUE constraint to prevent recurrence",
      "MERGE / UPSERT for idempotent loading",
      "Always backup or use a transaction before bulk DELETE",
    ],
    codeExample: {
      language: "sql",
      code: `-- Delete duplicates keeping the most recent row
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (
    PARTITION BY email ORDER BY created_at DESC
  ) AS rn
  FROM users
)
DELETE FROM users WHERE id IN (SELECT id FROM ranked WHERE rn > 1);`,
    },
    tags: ["SQL", "dedup"],
  },
  {
    id: "de-sql-6",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Senior",
    question: "ACID properties — explain each and give an example of why they matter.",
    answer:
      "Atomicity: a transaction is all-or-nothing (bank transfer either debits AND credits, or neither). Consistency: transactions move the DB from one valid state to another, respecting constraints (FK, CHECK). Isolation: concurrent transactions don't see each other's intermediate state, configurable via isolation levels (Read Committed, Repeatable Read, Serializable). Durability: committed data survives crashes (via WAL/redo log). Without ACID you get phantom reads, double-spending, partial updates, and corruption. NoSQL/distributed systems often relax some properties (BASE) for scale.",
    keyPoints: [
      "Higher isolation = more locks = lower concurrency",
      "Read Committed is the most common default",
      "Serializable prevents anomalies but can deadlock",
      "Optimistic concurrency (version columns) avoids locks",
      "Distributed transactions are hard — prefer idempotency + retries",
    ],
    tags: ["ACID", "transactions"],
  },

  // ============================================================
  // DATA ENGINEER — Data Pipelines & ETL
  // ============================================================
  {
    id: "de-pipe-1",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Junior",
    question: "What is the difference between ETL and ELT?",
    answer:
      "ETL (Extract-Transform-Load): transform data before loading into the warehouse, often using a separate processing engine (Spark, Informatica). ELT (Extract-Load-Transform): load raw data first into a powerful warehouse (Snowflake, BigQuery, Redshift), then transform with SQL (often via dbt). ELT is the modern default because cloud warehouses are cheap and elastic; it preserves raw data for re-processing and enables analyst self-service. ETL still wins when sources are huge and you want to filter early to reduce storage.",
    keyPoints: [
      "Modern stack = ELT + dbt + cloud warehouse",
      "ELT preserves raw data for re-runs",
      "ETL pre-aggregates to save warehouse cost",
      "Reverse ETL = warehouse → operational systems",
      "Tools: Fivetran/Airbyte (EL), dbt (T)",
    ],
    tags: ["ETL", "ELT"],
  },
  {
    id: "de-pipe-2",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Mid",
    question: "What is idempotency in data pipelines and why is it critical?",
    answer:
      "An operation is idempotent if running it multiple times produces the same result as running it once. Critical because pipelines retry on failure, schedules can backfill, and partial writes happen. Patterns: (1) MERGE / UPSERT instead of INSERT, (2) delete-then-insert per partition, (3) use deterministic primary keys, (4) write to staging then swap, (5) checkpoint + exactly-once semantics in streaming. Without idempotency, retries cause duplicates, double-counted revenue, and silent data corruption.",
    keyPoints: [
      "Retry-safe = idempotent",
      "Partition-overwrite is the simplest pattern in batch",
      "MERGE in SQL warehouses = idempotent upsert",
      "Append-only + dedup downstream is also valid",
      "Streaming: use Kafka offsets + transactional sinks",
    ],
    codeExample: {
      language: "sql",
      code: `-- Idempotent daily load: replace one partition
DELETE FROM fact_orders WHERE event_date = '2025-01-15';
INSERT INTO fact_orders
SELECT * FROM staging_orders WHERE event_date = '2025-01-15';`,
    },
    tags: ["idempotency", "reliability"],
  },
  {
    id: "de-pipe-3",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Mid",
    question: "Explain Apache Airflow concepts: DAG, Task, Operator, Scheduler.",
    answer:
      "Airflow orchestrates pipelines as code. DAG (Directed Acyclic Graph): a Python file defining tasks and their dependencies, with a schedule. Task: a single unit of work, an instance of an Operator. Operator: a template for what to do (BashOperator, PythonOperator, KubernetesPodOperator, SnowflakeOperator). Scheduler: continuously parses DAGs, triggers task instances when dependencies and schedule align, and queues them on workers (Celery, Kubernetes, Local). Webserver provides UI; Metadata DB stores state.",
    keyPoints: [
      "DAGs are Python — version-controlled, testable",
      "Tasks should be idempotent and atomic",
      "Use XCom only for small metadata, not data payloads",
      "Sensors wait for external conditions (file, table)",
      "Alternatives: Prefect, Dagster, Mage",
    ],
    tags: ["Airflow", "orchestration"],
  },
  {
    id: "de-pipe-4",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Senior",
    question: "Compare batch and stream processing. How do you decide which to use?",
    answer:
      "Batch: process bounded data on a schedule (hourly, daily) — simple, cheap, easy to backfill, high throughput, high latency. Stream: process unbounded data continuously as events arrive — low latency (seconds), more complex (windowing, watermarks, state management), exactly-once is hard. Choose stream when business value depends on freshness < minutes (fraud detection, real-time dashboards, alerting). Choose batch otherwise. Modern systems use both (Lambda/Kappa architecture) or hybrid micro-batch (Spark Structured Streaming, Flink).",
    keyPoints: [
      "Batch: simple, cheap, high latency",
      "Stream: complex, expensive, low latency",
      "Most analytics still batch; ops + ML serving often stream",
      "Kafka is the de facto streaming backbone",
      "Watch for late/out-of-order events: watermarks + windows",
    ],
    tags: ["batch", "streaming"],
  },
  {
    id: "de-pipe-5",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Senior",
    question: "How do you implement and enforce data quality in a pipeline?",
    answer:
      "Layered approach: (1) Schema enforcement at ingestion (Avro/Protobuf/JSON Schema). (2) In-pipeline assertions: row count vs expected, null rate, uniqueness, referential integrity, value ranges — using Great Expectations, dbt tests, or Soda. (3) Data contracts between producers and consumers (versioned, breaking-change alerts). (4) Quality gates: fail the pipeline if critical checks fail, quarantine bad rows, alert on warnings. (5) Observability: track freshness, volume, distribution drift over time (Monte Carlo, Datadog). (6) Lineage so you can trace 'who broke this' quickly.",
    keyPoints: [
      "Tests in CI: dbt test, Great Expectations",
      "Quarantine bad rows; don't silently drop",
      "Alert on schema drift from upstream",
      "SLA / freshness monitors on critical tables",
      "Data contracts shift left — catch issues at the source",
    ],
    tags: ["data-quality"],
  },

  // ============================================================
  // DATA ENGINEER — Big Data & Cloud
  // ============================================================
  {
    id: "de-bd-1",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Mid",
    question: "Explain how Apache Spark works and why it's faster than Hadoop MapReduce.",
    answer:
      "Spark is a distributed compute engine using a driver + executors model. The driver builds a DAG of transformations on RDDs/DataFrames, optimizes it (Catalyst optimizer for DataFrames), and ships tasks to executors that process partitions in parallel. Faster than MapReduce because: (1) keeps data in memory between stages instead of writing to disk, (2) lazy evaluation lets the optimizer fuse operations, (3) richer API (joins, windows, ML) avoids hand-written multi-job pipelines, (4) Tungsten engine + columnar formats (Parquet) accelerate computation.",
    keyPoints: [
      "Lazy evaluation — actions trigger execution",
      "DataFrames > RDDs (Catalyst optimizer)",
      "Wide vs narrow transformations (shuffle = expensive)",
      "Partitioning controls parallelism and skew",
      "PySpark, Scala, SQL all compile to the same plan",
    ],
    tags: ["Spark", "big-data"],
  },
  {
    id: "de-bd-2",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Senior",
    question: "What is data partitioning in a data lake? How do you choose the partition key?",
    answer:
      "Partitioning splits a large dataset into subdirectories based on one or more columns (e.g., s3://bucket/events/year=2025/month=01/day=15/). Query engines (Athena, Spark, Trino) prune partitions that don't match the WHERE clause, dramatically reducing scanned data and cost. Choose a key that: (1) is frequently filtered on (almost always a date), (2) has manageable cardinality (avoid millions of tiny partitions — the 'small files problem'), (3) distributes data evenly. Common choice: event_date. Avoid: high-cardinality columns like user_id alone, low-selectivity columns like country (when 90% is one country).",
    keyPoints: [
      "Date partitioning is the default for time-series data",
      "Small files = high overhead — compact regularly",
      "Bucketing complements partitioning for joins",
      "Iceberg/Delta/Hudi handle partition evolution gracefully",
      "Always test partition pruning with EXPLAIN",
    ],
    tags: ["partitioning", "data-lake"],
  },
  {
    id: "de-bd-3",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Mid",
    question: "Data Warehouse vs Data Lake vs Lakehouse — what's the difference?",
    answer:
      "Data Warehouse: structured, schema-on-write, optimized for SQL analytics (Snowflake, BigQuery, Redshift). High performance and governance, higher cost, less flexibility for unstructured data. Data Lake: cheap object storage (S3, GCS) holding raw files in any format (Parquet, JSON, images), schema-on-read. Flexible and cheap but easy to become a 'data swamp' without governance. Lakehouse: combines both — open table formats (Delta, Iceberg, Hudi) on object storage providing ACID transactions, schema evolution, time travel, and high-performance SQL while preserving lake economics. The current consensus architecture for new builds.",
    keyPoints: [
      "Warehouse = managed, structured, expensive",
      "Lake = cheap, raw, flexible, risky without governance",
      "Lakehouse = best of both via open table formats",
      "Iceberg, Delta Lake, Hudi are the three major lakehouse formats",
      "Databricks, Snowflake (with Iceberg), and DuckDB all compete here",
    ],
    tags: ["lakehouse", "architecture"],
  },
  {
    id: "de-bd-4",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Senior",
    question: "How do you optimize cost on a cloud data warehouse like Snowflake or BigQuery?",
    answer:
      "Compute: (1) right-size warehouses, auto-suspend aggressively (Snowflake), (2) use slot reservations vs on-demand (BigQuery) based on workload, (3) separate workloads into dedicated warehouses to avoid contention. Storage: (1) drop unused tables, (2) tier cold data (Snowflake long-term storage, BQ long-term pricing kicks in automatically), (3) compress with Parquet + clustering. Query: (1) avoid SELECT * — column pruning, (2) partition + cluster on filter columns, (3) materialize expensive repeated CTEs, (4) cache results, (5) approximate functions (APPROX_COUNT_DISTINCT) when exactness isn't required. Governance: (1) tag queries by team for chargeback, (2) alert on query cost > threshold, (3) review top-cost queries weekly.",
    keyPoints: [
      "Top 10 expensive queries usually = 80% of cost",
      "Auto-suspend / on-demand pricing > always-on",
      "Cluster keys are the cheapest perf win in Snowflake/BQ",
      "Use staging environments with dev-sized data",
      "FinOps tooling: SELECT.STAR, Bluesky, native usage views",
    ],
    tags: ["cost-optimization", "cloud"],
  },

  // ============================================================
  // DATA ENGINEER — System Design
  // ============================================================
  {
    id: "de-sys-1",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "Design an end-to-end pipeline that ingests clickstream data and powers both a real-time dashboard and daily ML training.",
    answer:
      "Ingestion: web/app sends events to a collector (Snowplow, Segment) → Kafka topic 'events.raw'. Real-time path: Flink/Spark Structured Streaming consumes Kafka, enriches, aggregates per minute, writes to a low-latency store (ClickHouse, Pinot, or materialized views in Snowflake) feeding the dashboard. Batch path: Kafka Connect sinks raw events to S3 in Parquet partitioned by event_date/hour. dbt + Spark on the lakehouse builds curated fact/dim tables nightly; ML feature store (Feast) materializes features for training. Schema registry enforces contracts; data quality checks (Great Expectations) gate downstream consumers; observability (Datadog, Monte Carlo) tracks freshness, volume, lineage.",
    keyPoints: [
      "Kafka as the single source of truth for events",
      "Lambda-style: stream for fresh, batch for accurate",
      "Schema registry prevents producer-consumer drift",
      "Feature store reuses features across models",
      "Lineage + alerting non-negotiable in production",
    ],
    tags: ["system-design", "streaming"],
  },
  {
    id: "de-sys-2",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Mid",
    question: "What is Change Data Capture (CDC) and when do you use it?",
    answer:
      "CDC captures row-level changes (insert, update, delete) from a source database and streams them downstream, usually by reading the database's transaction log (Postgres WAL, MySQL binlog). Tools: Debezium (open source), Fivetran, AWS DMS. Use when: (1) you need near-real-time replication of an OLTP DB into your warehouse, (2) you need to track historical changes (audit, SCD Type 2), (3) you need to feed downstream search/cache without polling, (4) you want to avoid load on the source from full table scans. Alternative: incremental ETL via updated_at column — simpler but misses deletes and lags more.",
    keyPoints: [
      "Log-based CDC > query-based polling",
      "Debezium + Kafka Connect = standard open-source stack",
      "Captures DELETEs (polling can't)",
      "Watch out for schema changes — handle them gracefully",
      "Initial snapshot + ongoing stream is the typical pattern",
    ],
    tags: ["CDC", "replication"],
  },
  {
    id: "de-sys-3",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Mid",
    question: "What is data lineage and why is it important?",
    answer:
      "Data lineage tracks the flow of data from source through transformations to consumers — which tables/columns feed which dashboards/models. It enables: (1) impact analysis ('if I change this column, what breaks?'), (2) root cause analysis ('this dashboard is wrong — which upstream changed?'), (3) compliance (GDPR — where does PII live?), (4) onboarding new engineers. Tools: dbt docs (column-level for SQL transformations), OpenLineage standard, commercial (Atlan, Collibra, Alation, Monte Carlo). Critical for any pipeline beyond a handful of tables.",
    keyPoints: [
      "Column-level lineage > table-level for impact analysis",
      "OpenLineage = open standard, integrations with Airflow/Spark/dbt",
      "Auto-generated > manually documented (always stale)",
      "Pairs naturally with a data catalog",
      "Required for regulated industries (finance, health)",
    ],
    tags: ["lineage", "governance"],
  },
  {
    id: "de-sys-4",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "How do you monitor a production data platform and what alerts would you set up?",
    answer:
      "Three layers: (1) Infrastructure — job success/failure, runtime, resource utilization, queue depth. (2) Data quality — freshness (last update timestamp), volume (row count vs 7-day baseline ±X%), schema (column added/dropped), distribution drift (mean/null-rate/unique-count). (3) Business — KPI sanity checks (revenue not 0, DAU not negative). Alerts: page on-call only for revenue-impacting failures; everything else goes to a triage channel. Use anomaly detection (not static thresholds) for volume/freshness on hundreds of tables. Dashboards: pipeline health, cost trends, top failures. Tools: Datadog, Monte Carlo, Bigeye, native warehouse monitors, plus Airflow's built-in SLA misses.",
    keyPoints: [
      "Don't alert on warnings — only actionable failures",
      "Anomaly detection > static thresholds at scale",
      "Track freshness, volume, schema, distribution",
      "Runbooks in alert payload — every alert should be actionable",
      "Post-mortems for every Sev-1 → improve detection",
    ],
    tags: ["monitoring", "observability"],
  },
  // ============================================================
  // AI ENGINEER — Expanded set (LLMs)
  // ============================================================
  {
    id: "ai-llm-ext-1",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Junior",
    question: "What is the difference between zero-shot, one-shot, and few-shot prompting?",
    tldr: "It's about how many examples you give the model in the prompt: 0, 1, or a handful.",
    answer:
      "Zero-shot prompting asks the model to perform a task with only an instruction and no examples. One-shot includes a single demonstration. Few-shot includes 2-10 demonstrations that establish the pattern (input → output) you want the model to follow. More examples generally improve consistency on structured tasks (classification, formatting, extraction) but consume more tokens and can bias the model toward the example distribution.",
    keyPoints: [
      "Zero-shot: instruction only, smallest prompt",
      "Few-shot: pattern demonstration, better for structured output",
      "Diverse, representative examples > many similar examples",
      "Place hardest example last (recency bias helps)",
      "Modern frontier models often match few-shot quality with zero-shot + clear instructions",
    ],
    pitfalls: [
      "Using examples that all share an irrelevant pattern → model copies it",
      "Too many examples → context bloat and higher cost/latency",
      "Forgetting to separate examples from the real query clearly",
    ],
    interviewTip: "Mention that for newer models, well-written zero-shot with chain-of-thought often beats poorly-chosen few-shot.",
    tags: ["prompting", "fundamentals"],
  },
  {
    id: "ai-llm-ext-2",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "Explain temperature, top-p, and top-k sampling. When would you tune each?",
    tldr: "Three knobs that control randomness vs determinism in token sampling.",
    answer:
      "After the model produces a probability distribution over the next token, sampling parameters reshape it. Temperature scales the logits before softmax — low (0-0.3) = deterministic, high (>1) = creative/random. Top-k restricts sampling to the k most probable tokens. Top-p (nucleus) keeps the smallest set of tokens whose cumulative probability ≥ p (e.g. 0.9), adapting set size to the distribution's shape. Use low temperature + low top-p for extraction/classification/code; higher values for brainstorming/creative writing.",
    keyPoints: [
      "Temperature 0 = greedy (most likely token every step)",
      "Top-p adapts to distribution; top-k is fixed cutoff",
      "Combine temperature with top-p, not usually with top-k",
      "Set temperature=0 for reproducibility in tests/evals",
      "Frequency/presence penalties reduce repetition",
    ],
    pitfalls: [
      "Setting temperature high AND top-p=1 → incoherent output",
      "Expecting determinism with temp=0 across providers (numerics may still vary)",
      "Tuning sampling instead of fixing a bad prompt",
    ],
    interviewTip: "Give a concrete pairing: 'For JSON extraction I use temp=0, top-p=1; for ideation temp=0.8, top-p=0.95.'",
    codeExample: {
      language: "python",
      code: `# OpenAI-style call
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.0,        # deterministic
    top_p=1.0,
    frequency_penalty=0.0,
    seed=42                 # for reproducibility
)`,
    },
    tags: ["sampling", "decoding"],
  },
  {
    id: "ai-llm-ext-3",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "What is function calling / tool use, and how does it work under the hood?",
    tldr: "The model outputs a structured request to call a function, your code runs it, and you feed the result back.",
    answer:
      "You provide the model with JSON schemas of available tools. The model decides whether to answer directly or emit a structured tool_call (function name + arguments JSON). Your application validates and executes the call, then returns the result as a tool message. The model uses that observation to produce the final answer or chain another call. This is the foundation of agents and is more reliable than parsing free-text instructions.",
    keyPoints: [
      "Schema-driven: JSON Schema describes each tool",
      "Model is fine-tuned to emit valid tool calls",
      "Multi-turn loop: call → observe → reason → answer",
      "Use 'required' and enums to constrain arguments",
      "Always validate arguments server-side — never trust raw output",
    ],
    pitfalls: [
      "Exposing dangerous tools (shell, SQL writes) without sandboxing",
      "Too many tools (>20) → model confusion; group or route first",
      "Forgetting to handle tool errors and feed them back",
    ],
    interviewTip: "Mention guardrails: timeouts, allowlists, and idempotency keys for any tool that mutates state.",
    codeExample: {
      language: "python",
      code: `tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}]
resp = client.chat.completions.create(
    model="gpt-4o", messages=msgs, tools=tools, tool_choice="auto"
)`,
    },
    tags: ["tools", "agents"],
  },
  {
    id: "ai-llm-ext-4",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Mid",
    question: "How do you make an LLM return strict, valid JSON?",
    tldr: "Use the provider's structured-output / JSON mode with a schema, plus validation and retries.",
    answer:
      "Three layers of defense: (1) Use the provider's structured output feature (OpenAI response_format with json_schema, Anthropic tools, or constrained decoding libraries like Outlines/Instructor) which guarantees syntactic validity. (2) Provide an explicit JSON Schema with required fields, types, and enums. (3) Always parse and validate with Pydantic/Zod and implement a single retry that includes the parse error in the prompt. Avoid hand-prompting 'reply only with JSON' — it fails at scale.",
    keyPoints: [
      "Prefer native structured-output APIs over prompt tricks",
      "Validate with Pydantic/Zod — never trust the model",
      "Retry with the validation error appended to the prompt",
      "Set temperature=0 for extraction tasks",
      "For local models use grammar-constrained decoding (llama.cpp GBNF, Outlines)",
    ],
    pitfalls: [
      "Markdown code fences leaking into JSON",
      "Forgetting to handle nested optional fields",
      "Schema too strict → model can't produce valid output for edge cases",
    ],
    interviewTip: "Show you know the difference between JSON mode (valid JSON, any shape) and JSON schema mode (matches your schema).",
    tags: ["structured-output", "JSON"],
  },
  {
    id: "ai-llm-ext-5",
    role: "ai-engineer",
    category: "LLMs & Prompt Engineering",
    difficulty: "Senior",
    question: "How do you reduce LLM token costs in production without hurting quality?",
    tldr: "Smaller models, shorter context, caching, batching, and routing.",
    answer:
      "A layered strategy: (1) Model routing — cheap model (Haiku/4o-mini) for easy queries, escalate to flagship only when needed via a classifier or confidence check. (2) Prompt compression — remove boilerplate, use concise system prompts, summarize chat history beyond N turns. (3) Prompt caching (Anthropic, OpenAI) for static prefixes like long system prompts and RAG context. (4) Semantic cache for repeated queries (embedding similarity > 0.95). (5) Batch async requests where latency permits. (6) Cap max_tokens. (7) Distill expensive prompts into a fine-tuned smaller model when volume justifies.",
    keyPoints: [
      "Routing can cut costs 5-10x with minimal quality loss",
      "Prompt caching gives 90% discount on repeated prefixes",
      "Semantic cache for FAQ-style traffic",
      "Track $/request and tokens/request as first-class metrics",
      "Output tokens cost 3-5x input — cap aggressively",
    ],
    pitfalls: [
      "Caching responses for personalized prompts → leaking other users' data",
      "Routing classifier itself becoming expensive",
      "Compressing system prompts so much that behavior degrades silently",
    ],
    interviewTip: "Quote a real number: 'We cut spend 70% by routing 80% of traffic to a smaller model and adding prompt caching.'",
    tags: ["cost", "optimization", "production"],
  },

  // AI ENGINEER — ML Fundamentals (extended)
  {
    id: "ai-ml-ext-1",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Junior",
    question: "What is k-fold cross-validation and why is it better than a single train/test split?",
    tldr: "Split data into k folds, train k times rotating which fold is held out, average the scores.",
    answer:
      "k-fold CV partitions the dataset into k equal folds. For each of k iterations, one fold is the validation set and the remaining k-1 folds are used for training. The final metric is the mean (and std) across folds. This gives a more reliable estimate of generalization than a single split because every example is used for both training and validation, and the variance of the estimate decreases. Common values: k=5 or 10. Use stratified k-fold for classification to preserve class proportions; use TimeSeriesSplit for temporal data.",
    keyPoints: [
      "Reduces variance of performance estimate",
      "Stratified k-fold preserves class balance",
      "TimeSeriesSplit avoids future-leakage for time series",
      "k=5 is a good cost/quality default",
      "Report mean ± std, not just mean",
    ],
    pitfalls: [
      "Doing feature engineering on full data before splitting → leakage",
      "Using vanilla k-fold on time series (looks at the future)",
      "Tuning hyperparams on the same folds you report — need nested CV",
    ],
    interviewTip: "Mention nested CV for unbiased hyperparameter tuning, and that it's expensive so most teams use a held-out test set.",
    codeExample: {
      language: "python",
      code: `from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.linear_model import LogisticRegression

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(LogisticRegression(), X, y, cv=cv, scoring="f1")
print(f"F1: {scores.mean():.3f} ± {scores.std():.3f}")`,
    },
    tags: ["evaluation", "cross-validation"],
  },
  {
    id: "ai-ml-ext-2",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "How do you handle class imbalance in classification?",
    tldr: "Resample, reweight, or change the metric/threshold — and never just rely on accuracy.",
    answer:
      "Approaches: (1) Resampling — oversample minority (SMOTE) or undersample majority. SMOTE works for tabular but can hurt text/image. (2) Class weights — pass class_weight='balanced' to penalize errors on the minority class more. (3) Threshold tuning — pick a probability threshold using precision-recall trade-off, not the default 0.5. (4) Use proper metrics: PR-AUC, F1, recall@k instead of accuracy. (5) Anomaly-detection framing for extreme imbalance (fraud, defects). (6) Collect more minority data when feasible.",
    keyPoints: [
      "Accuracy is misleading on imbalanced data",
      "PR-AUC > ROC-AUC for highly imbalanced positives",
      "Class weights are simpler and safer than SMOTE in most cases",
      "Apply resampling only on training data, never on validation",
      "Calibrate probabilities (Platt/Isotonic) after resampling",
    ],
    pitfalls: [
      "SMOTE applied before train/test split → optimistic metrics",
      "Reporting only accuracy on a 99/1 split (a constant predictor wins)",
      "Forgetting to recalibrate after class weighting",
    ],
    interviewTip: "Always ask the interviewer: 'What's the cost of a false positive vs false negative?' before picking a metric.",
    tags: ["imbalanced", "classification"],
  },
  {
    id: "ai-ml-ext-3",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "Explain L1 vs L2 regularization. When would you choose each?",
    tldr: "L1 (Lasso) adds |w| → sparse weights (feature selection). L2 (Ridge) adds w² → small but non-zero weights.",
    answer:
      "Both shrink weights to fight overfitting by adding a penalty to the loss. L1 has a non-differentiable corner at 0, which drives many weights exactly to zero — performing implicit feature selection and yielding sparse, interpretable models. L2 shrinks all weights smoothly toward zero and handles correlated features more gracefully. ElasticNet combines both. Choose L1 when you suspect many irrelevant features and want a sparse model; L2 when features are mostly informative and correlated; ElasticNet when unsure.",
    keyPoints: [
      "L1 → sparse, L2 → small dense weights",
      "L2 has a closed-form solution (Ridge regression)",
      "L1 unstable with correlated features (picks one arbitrarily)",
      "Always standardize features before regularization",
      "Tune lambda/alpha via cross-validation",
    ],
    pitfalls: [
      "Forgetting to scale features → penalty hits large-scale features harder",
      "Using L1 with highly correlated predictors → unstable selection",
      "Not regularizing the bias term — usually you should NOT penalize bias",
    ],
    interviewTip: "Draw the L1 diamond vs L2 circle constraint regions — interviewers love the geometric intuition.",
    tags: ["regularization", "linear-models"],
  },
  {
    id: "ai-ml-ext-4",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Mid",
    question: "What's the difference between SGD, Momentum, RMSProp, and Adam?",
    tldr: "Variants of gradient descent that differ in how they use past gradients to set step direction and size.",
    answer:
      "SGD updates weights by -lr * grad. Momentum adds a velocity term (exponential moving average of gradients) that smooths updates and accelerates in consistent directions. RMSProp scales each parameter's step by the inverse of a moving average of squared gradients — adapting per-parameter learning rates. Adam combines momentum (1st moment) and RMSProp (2nd moment) with bias correction; it's the de-facto default. AdamW decouples weight decay from the gradient update and generally generalizes better than Adam.",
    keyPoints: [
      "SGD + momentum often generalizes best for vision (with proper tuning)",
      "Adam is robust default; AdamW preferred for transformers",
      "Adaptive optimizers can hurt generalization vs SGD",
      "Always pair with a learning rate schedule (warmup + cosine)",
      "Gradient clipping (norm 1.0) helps stability for RNN/LLM training",
    ],
    pitfalls: [
      "Using Adam's default lr=1e-3 for transformers (use 1e-4 to 5e-5)",
      "No warmup → loss explodes early in training",
      "Confusing weight decay in Adam with L2 regularization (they differ)",
    ],
    interviewTip: "Mention you'd start with AdamW + linear warmup + cosine decay for any transformer task.",
    tags: ["optimization", "training"],
  },
  {
    id: "ai-ml-ext-5",
    role: "ai-engineer",
    category: "Machine Learning Fundamentals",
    difficulty: "Senior",
    question: "Walk through a feature engineering process for a tabular ML problem.",
    tldr: "Understand the data → create informative features → handle leakage → validate impact.",
    answer:
      "Step 1: EDA — distributions, missingness, target correlation. Step 2: cleaning — impute (median for numeric, 'missing' category for categorical), cap outliers (winsorize). Step 3: encode — one-hot for low-cardinality, target/frequency encoding for high-cardinality (with out-of-fold to prevent leakage). Step 4: derive — ratios, differences, time-since-event, aggregations over groups (mean target by user_id over last 30 days). Step 5: interactions — manually for known business logic, automatically via gradient boosters. Step 6: validate each feature group's lift via ablation. Step 7: lock the pipeline (feature store / sklearn Pipeline) so train and serve match exactly.",
    keyPoints: [
      "Out-of-fold target encoding to prevent leakage",
      "Time-aware features for time series (no future info)",
      "Use Pipeline + ColumnTransformer to avoid train/serve skew",
      "Track feature importance and drop low-value features",
      "Feature store (Feast/Tecton) for reuse across models",
    ],
    pitfalls: [
      "Computing aggregates on the full dataset before splitting → leakage",
      "Encoding categories seen only in training and crashing on serve",
      "Adding 1000s of weak features that increase variance more than signal",
    ],
    interviewTip: "Emphasize that 80% of model lift in tabular comes from features, not algorithm choice.",
    tags: ["feature-engineering", "tabular"],
  },

  // AI ENGINEER — Deep Learning (extended)
  {
    id: "ai-dl-ext-1",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Junior",
    question: "What is Dropout and why does it work?",
    tldr: "Randomly zero out neurons during training to prevent co-adaptation and reduce overfitting.",
    answer:
      "Dropout randomly sets a fraction p of activations to zero during each training forward pass, then scales remaining activations by 1/(1-p) so expected magnitudes match. At inference, all neurons are active. This forces the network to develop redundant representations and not over-rely on any single neuron — acting as an implicit ensemble of subnetworks. Typical p: 0.1-0.5 (higher in fully-connected, lower in conv). For transformers, dropout is often used inside attention and FFN blocks.",
    keyPoints: [
      "Active only during training, off at inference",
      "Approximates ensembling exponentially many subnetworks",
      "Use lower rates with BatchNorm to avoid interaction issues",
      "Modern large models often need less dropout (data is the regularizer)",
      "Variants: SpatialDropout (CV), DropPath/Stochastic Depth (transformers/ResNets)",
    ],
    pitfalls: [
      "Forgetting model.eval() in PyTorch → dropout active during validation",
      "Stacking high-rate dropout with strong weight decay → underfitting",
      "Using dropout with very small batches makes training noisy",
    ],
    interviewTip: "Mention that in transformer fine-tuning, dropout=0.1 is the standard default.",
    tags: ["regularization", "neural-networks"],
  },
  {
    id: "ai-dl-ext-2",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Mid",
    question: "Explain Batch Normalization vs Layer Normalization. When is each used?",
    tldr: "BatchNorm normalizes across the batch dimension (great for CNNs); LayerNorm normalizes across features per sample (default in transformers).",
    answer:
      "BatchNorm computes mean/variance per feature across the batch and uses them to normalize, then applies learnable scale/shift. It depends on batch statistics, which is problematic for small batches, RNNs, and variable-length sequences. LayerNorm normalizes across the feature dimension within each example, making it batch-size independent and ideal for sequences. Transformers use LayerNorm (or RMSNorm in newer architectures like Llama). CNNs typically use BatchNorm. GroupNorm is a middle ground for small-batch vision tasks.",
    keyPoints: [
      "BatchNorm: depends on batch, has train/eval mode difference",
      "LayerNorm: per-sample, no batch dependency",
      "RMSNorm: drops the mean centering, faster — used in Llama, Mistral",
      "Pre-norm vs post-norm in transformers — pre-norm trains more stably",
      "BN reduces internal covariate shift and acts as a slight regularizer",
    ],
    pitfalls: [
      "BatchNorm with batch_size=1 → variance is 0, NaNs",
      "Forgetting to switch to eval mode → uses noisy batch stats at inference",
      "Mixing BatchNorm with gradient accumulation incorrectly",
    ],
    interviewTip: "Mention RMSNorm and the pre-norm vs post-norm debate — signals you've read modern transformer papers.",
    tags: ["normalization", "transformers"],
  },
  {
    id: "ai-dl-ext-3",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Senior",
    question: "Compare CNNs, RNNs, and Transformers. Why have transformers largely replaced RNNs?",
    tldr: "CNNs exploit locality, RNNs process sequentially, Transformers attend globally in parallel — winning on scale.",
    answer:
      "CNNs use shared local kernels — great for spatial data (images, audio spectrograms). RNNs/LSTMs process tokens one at a time, maintaining a hidden state — modeled long sequences before transformers but suffer from sequential computation (no parallelism), vanishing gradients on long contexts, and limited effective receptive field. Transformers replace recurrence with self-attention: every token directly attends to every other token, enabling full parallel training and arbitrary-distance dependencies. Combined with their favorable scaling laws, this made transformers dominate NLP and increasingly vision (ViT) and audio.",
    keyPoints: [
      "Self-attention is O(n²) in sequence length — cost grows fast",
      "Transformers parallelize across tokens; RNNs cannot",
      "Positional encodings replace recurrence's implicit order",
      "Hybrid models (Mamba, RWKV) revisit linear-time recurrence for long context",
      "CNNs still win on small data and edge inference",
    ],
    pitfalls: [
      "Claiming transformers are 'always better' — they need lots of data",
      "Ignoring O(n²) attention cost for long documents",
      "Forgetting positional encoding when implementing attention from scratch",
    ],
    interviewTip: "Mention FlashAttention and KV-cache to show you understand inference optimization too.",
    tags: ["transformers", "architecture"],
  },
  {
    id: "ai-dl-ext-4",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Senior",
    question: "What is transfer learning and how do you decide between feature extraction, fine-tuning, and LoRA?",
    tldr: "Reuse a pretrained model. Freeze for tiny data, full fine-tune for lots of data, LoRA for efficient adaptation.",
    answer:
      "Transfer learning leverages a model pretrained on a large corpus (ImageNet, web text) and adapts it to your task. Three regimes: (1) Feature extraction — freeze the backbone, train only a new head. Best for very small datasets and when distribution is similar. (2) Full fine-tuning — unfreeze all weights, train with a small learning rate (often layer-wise discriminative LRs). Best for large in-domain data. (3) Parameter-efficient fine-tuning (PEFT) like LoRA — inject low-rank trainable adapters while freezing the base. Trains <1% of parameters, fits on a single GPU, is composable (swap LoRAs per task), and approaches full-FT quality on most tasks.",
    keyPoints: [
      "Smaller LR for pretrained layers (e.g. 10x smaller than head)",
      "LoRA: rank 8-64 typical; QLoRA quantizes base to 4-bit",
      "Catastrophic forgetting risk with full fine-tune on small data",
      "Adapter swapping enables multi-tenant model serving",
      "Always evaluate vs zero-shot baseline — sometimes prompting wins",
    ],
    pitfalls: [
      "Fine-tuning a 70B model on 100 examples → overfit + waste",
      "Forgetting to merge LoRA weights for inference if latency matters",
      "Mixing instruction-tuned base with raw fine-tuning data → quality regression",
    ],
    interviewTip: "Mention QLoRA — it lets you fine-tune 70B models on a single 48GB GPU and is the go-to for cost-conscious teams.",
    tags: ["transfer-learning", "fine-tuning", "LoRA"],
  },
  {
    id: "ai-dl-ext-5",
    role: "ai-engineer",
    category: "Deep Learning & Neural Networks",
    difficulty: "Mid",
    question: "What is a learning rate schedule and why does warmup help transformer training?",
    tldr: "A schedule changes LR over training. Warmup ramps LR up gradually so unstable early gradients don't blow up.",
    answer:
      "A learning rate schedule adjusts LR over steps/epochs. Common schedules: step decay, cosine annealing, exponential, and one-cycle. Warmup linearly ramps LR from ~0 to the peak over the first few hundred to few thousand steps. Transformers benefit because (a) Adam's adaptive moments are unreliable in the first few steps when statistics are noisy, (b) LayerNorm parameters need time to adapt, and (c) without warmup the loss often diverges. After warmup, cosine decay to a small final LR is standard.",
    keyPoints: [
      "Warmup: 1-10% of total steps is typical",
      "Cosine decay generally beats step decay for LLMs",
      "One-cycle policy works well for vision",
      "Always log LR alongside loss in your training dashboard",
      "Restart schedules (SGDR) help when training plateaus",
    ],
    pitfalls: [
      "Skipping warmup with Adam on transformers → NaN loss",
      "Using a schedule longer than the actual run (LR never reaches min)",
      "Re-initializing optimizer when resuming → loses Adam's moments",
    ],
    interviewTip: "Quote a setup: 'AdamW, lr=2e-4, linear warmup over 500 steps, cosine decay to 1e-5, weight decay 0.01.'",
    tags: ["training", "scheduling"],
  },

  // AI ENGINEER — System Design (extended)
  {
    id: "ai-sys-ext-1",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Mid",
    question: "How do you detect and respond to model drift in production?",
    tldr: "Monitor input distribution, output distribution, and ground-truth performance — alert on shifts.",
    answer:
      "Three drift types to monitor: (1) Data drift — input feature distributions change (PSI, KS test, KL divergence vs training reference). (2) Concept drift — relationship between X and y changes (the world moved on). Detect via lagged ground truth or proxy metrics. (3) Prediction drift — output distribution changes (often the first signal you can compute without labels). Respond with: alerting on drift score thresholds, triggering retraining pipelines, A/B testing the retrained model, rolling back if metrics regress, and shadow-deploying new candidates before promotion.",
    keyPoints: [
      "PSI > 0.2 → significant drift on tabular features",
      "Prediction drift is label-free and fast to compute",
      "Schedule retraining (weekly/monthly) AND trigger on drift",
      "Tools: Evidently, WhyLabs, Arize, Fiddler",
      "Always keep a frozen reference dataset for comparison",
    ],
    pitfalls: [
      "Alerting on drift without checking actual metric impact (noisy)",
      "Retraining on drifted data that includes a temporary anomaly",
      "No ground truth feedback loop → blind to concept drift",
    ],
    interviewTip: "Mention shadow deployment: run the new model in parallel without serving its predictions, compare for a week.",
    tags: ["mlops", "monitoring", "drift"],
  },
  {
    id: "ai-sys-ext-2",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "Design an end-to-end MLOps pipeline. What are the key components?",
    tldr: "Data → features → training → registry → deployment → monitoring → feedback, all reproducible and CI-driven.",
    answer:
      "Components: (1) Data versioning (DVC, LakeFS, Delta Lake) — every training run pinned to a snapshot. (2) Feature store (Feast/Tecton) for train/serve consistency. (3) Experiment tracking (MLflow, W&B) — params, metrics, artifacts. (4) Training orchestration (Airflow/Kubeflow/Vertex/SageMaker Pipelines). (5) Model registry — versioned, staged (dev → staging → prod) with approval gates. (6) CI/CD — automated tests on PRs (data validation, model quality, latency). (7) Serving (KServe, BentoML, vLLM, Triton) with autoscaling. (8) Monitoring — drift, performance, cost. (9) Feedback collection back into training data. (10) IaC (Terraform) for the whole stack.",
    keyPoints: [
      "Reproducibility = data version + code version + env + seed",
      "Test data quality, model quality, AND inference contract in CI",
      "Canary or shadow deploy → never big-bang releases",
      "Feature store eliminates train/serve skew",
      "Document model cards: intended use, training data, limitations",
    ],
    pitfalls: [
      "Manual deployment → no rollback story",
      "Training in notebooks → not reproducible",
      "Storing models on a single engineer's laptop or random S3 bucket",
    ],
    interviewTip: "Draw the pipeline as a diagram on the whiteboard — interviewers want to see you think in systems, not just models.",
    tags: ["mlops", "system-design"],
  },
  {
    id: "ai-sys-ext-3",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "How do you A/B test an ML model in production?",
    tldr: "Randomly assign users to control/treatment, run long enough for statistical power, compare a primary metric.",
    answer:
      "Split traffic at user/session level (not request level — same user must see consistent model). Define one primary success metric upfront (revenue, CTR, retention) plus 2-3 guardrails (latency, error rate, fairness). Compute required sample size from baseline rate, MDE, alpha=0.05, power=0.8. Run until pre-registered duration and sample reached — don't peek and stop early (inflates false positives). Use sequential testing (always-valid p-values) or CUPED variance reduction if you must monitor continuously. Analyze with two-sample test or regression with controls. Watch for SRM (sample ratio mismatch) — a sign of bucketing bug.",
    keyPoints: [
      "Hash user_id → bucket assignment for stickiness",
      "One primary metric + guardrails; pre-register before launch",
      "SRM check first: are buckets actually 50/50?",
      "Multi-armed bandits for fast iteration; A/B for high-stakes decisions",
      "Holdout (1-5%) running indefinitely measures cumulative product impact",
    ],
    pitfalls: [
      "Stopping early when results 'look significant' → false positives",
      "Different feature flags creating overlapping experiments",
      "Reporting a 0.3% lift that's within noise — needs power analysis",
    ],
    interviewTip: "Mention CUPED — it can cut required sample size 50% by adjusting for pre-experiment metric variance.",
    tags: ["ab-testing", "experimentation"],
  },
  {
    id: "ai-sys-ext-4",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "How do you serve LLMs efficiently at scale?",
    tldr: "Use a dedicated inference engine (vLLM, TGI, TensorRT-LLM) with continuous batching, KV cache, and quantization.",
    answer:
      "Key techniques: (1) Continuous batching — schedule new requests into a running batch instead of waiting for the slowest one (PagedAttention in vLLM). 5-10x throughput vs naive batching. (2) KV cache reuse — cache attention keys/values across decoding steps; share prefixes across requests via prefix caching. (3) Quantization — INT8/FP8/INT4 weights cut memory and boost throughput with small quality loss (AWQ, GPTQ, FP8). (4) Tensor/pipeline parallelism for models too big for one GPU. (5) Speculative decoding — small draft model proposes tokens, big model verifies in one pass. (6) Autoscaling on queue depth and time-to-first-token. (7) Separate prefill (compute-bound) from decode (memory-bound) workloads.",
    keyPoints: [
      "vLLM / TGI / TensorRT-LLM are the standard engines",
      "Prefix caching huge win for chat with long system prompts",
      "FP8 on H100 ~2x throughput vs FP16 with minimal quality loss",
      "Track TTFT (time-to-first-token) and TPOT (time-per-output-token)",
      "Speculative decoding cuts latency 2-3x for code/structured tasks",
    ],
    pitfalls: [
      "Serving with vanilla HuggingFace generate() in production → 10x slower",
      "Quantizing and skipping eval → silent quality regression",
      "Co-locating prefill and decode causes head-of-line blocking",
    ],
    interviewTip: "Name a real engine and a metric: 'We use vLLM, hit 3000 tokens/sec/GPU, TTFT p95 < 400ms.'",
    tags: ["inference", "llm", "serving"],
  },
  {
    id: "ai-sys-ext-5",
    role: "ai-engineer",
    category: "AI System Design & Ethics",
    difficulty: "Senior",
    question: "How do you evaluate an LLM application beyond just 'looks good'?",
    tldr: "Build an eval set, define metrics (rule-based + LLM-as-judge + human), run on every change.",
    answer:
      "(1) Build a diverse eval set of 100-1000 representative inputs covering happy paths, edge cases, and known failure modes. Version it. (2) Define metrics: deterministic checks (regex, schema validation, exact-match for facts), embedding similarity for semantic, LLM-as-judge with a strong rubric for subjective quality, and human review for the top quintile. (3) Compute pass-rate per category, not just overall. (4) Run evals in CI — block PRs that regress >X%. (5) For RAG, evaluate retrieval (recall@k, MRR) and generation (faithfulness, answer relevance) separately — RAGAS is a good framework. (6) Track win-rate vs the previous version in pairwise comparisons. (7) Continuously add real production failures to the eval set.",
    keyPoints: [
      "Eval set is your most valuable asset — invest in it",
      "Per-category metrics surface failures hidden in averages",
      "LLM-as-judge needs its own rubric eval to avoid bias",
      "Pairwise > absolute for subjective tasks",
      "Frameworks: Promptfoo, Braintrust, LangSmith, RAGAS",
    ],
    pitfalls: [
      "Vibes-based eval → silent regressions on every prompt change",
      "Same model as judge as generator → self-preference bias",
      "Evaluating only on synthetic data, not real user inputs",
    ],
    interviewTip: "Say: 'Before any prompt change ships, it must pass our eval suite with no regression on critical categories.'",
    tags: ["evaluation", "llm", "production"],
  },

  // ============================================================
  // DATA ENGINEER — Expanded set (SQL)
  // ============================================================
  {
    id: "de-sql-ext-1",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Junior",
    question: "Explain the difference between WHERE and HAVING.",
    tldr: "WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
    answer:
      "WHERE applies to individual rows before any GROUP BY happens — you cannot reference aggregate functions in WHERE. HAVING applies to grouped results after aggregation, so you can filter on SUM/COUNT/AVG. Logical execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. For performance, push filters into WHERE whenever possible because they reduce the rows the engine has to group.",
    keyPoints: [
      "WHERE: row-level, before grouping",
      "HAVING: group-level, after aggregation",
      "Filter as early as possible (in WHERE) for performance",
      "You can use window functions in WHERE only via a subquery/CTE",
      "Both can use indexes, but HAVING typically can't",
    ],
    pitfalls: [
      "Putting an aggregate in WHERE → SQL error",
      "Filtering on grouped column in HAVING when WHERE would be faster",
      "Forgetting GROUP BY when using HAVING",
    ],
    interviewTip: "If asked 'where would you put country = US' in a sales-by-country query, the answer is WHERE — never HAVING.",
    codeExample: {
      language: "sql",
      code: `SELECT country, SUM(amount) AS total
FROM orders
WHERE order_date >= '2024-01-01'   -- filter rows first
GROUP BY country
HAVING SUM(amount) > 100000;        -- filter groups after`,
    },
    tags: ["sql", "fundamentals"],
  },
  {
    id: "de-sql-ext-2",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Mid",
    question: "When would you use a CTE vs a subquery vs a temporary table?",
    tldr: "CTE for readability and recursion; subquery for one-off inline use; temp table for reuse and indexing.",
    answer:
      "CTEs (WITH clauses) improve readability by naming intermediate result sets and are required for recursive queries. In modern engines (Postgres 12+, Snowflake, BigQuery) they're typically inlined and have no perf penalty; older engines may materialize them. Subqueries are convenient inline but become unreadable when nested. Temporary tables persist for the session, can be indexed, support statistics, and are best when the same intermediate result is referenced multiple times or is large enough to benefit from optimization. Choose temp tables in long ETL scripts; CTEs in analytical queries; subqueries for simple one-liners.",
    keyPoints: [
      "Recursive CTEs are the only way to query trees/hierarchies in SQL",
      "Temp tables hold statistics → planner makes better choices",
      "CTEs referenced N times in a single query may execute N times (engine-dependent)",
      "Use MATERIALIZED CTEs in Postgres to force materialization",
      "Lateral joins are an alternative to correlated subqueries with better perf",
    ],
    pitfalls: [
      "Assuming CTEs are always materialized (engine-dependent!)",
      "Nesting subqueries 5 levels deep → unreadable, hard to debug",
      "Creating temp tables in high-concurrency OLTP without cleanup",
    ],
    interviewTip: "Mention WITH RECURSIVE for tree traversal — interviewers love seeing you reach for it on org-chart problems.",
    tags: ["sql", "cte", "optimization"],
  },
  {
    id: "de-sql-ext-3",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Mid",
    question: "What is a materialized view and how does it differ from a regular view?",
    tldr: "A regular view is a saved query (recomputed each time); a materialized view stores the result physically.",
    answer:
      "A regular VIEW is a stored SELECT statement — every time you query it, the underlying SQL runs. A MATERIALIZED VIEW stores the precomputed results on disk like a table, trading freshness for speed. You refresh it on a schedule (REFRESH MATERIALIZED VIEW), incrementally if the engine supports it, or via triggers. Use cases: expensive aggregations queried frequently, dashboard backends, denormalized lookups. Trade-offs: stale data between refreshes, storage cost, refresh latency. Snowflake's dynamic tables and BigQuery's materialized views support automatic incremental refresh.",
    keyPoints: [
      "View = logical, MV = physical/cached",
      "Refresh strategies: complete vs incremental, manual vs scheduled",
      "Indexes can be built on MVs in Postgres",
      "Concurrent refresh in Postgres avoids blocking reads",
      "Modern equivalents: dbt incremental models, Snowflake dynamic tables",
    ],
    pitfalls: [
      "Forgetting to refresh → stale dashboards",
      "Full refresh on huge MVs → long downtime; use incremental",
      "Building MVs on top of MVs → fragile dependency chains",
    ],
    interviewTip: "Mention dbt incremental models as the modern equivalent in the warehouse world — shows you know current tooling.",
    tags: ["sql", "materialized-view", "performance"],
  },
  {
    id: "de-sql-ext-4",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Senior",
    question: "How do you diagnose and fix a slow SQL query?",
    tldr: "EXPLAIN ANALYZE → find the expensive operator → fix with index, rewrite, or stats refresh.",
    answer:
      "Process: (1) Run EXPLAIN (ANALYZE, BUFFERS) — actual vs estimated rows reveal stale stats. (2) Identify the dominant cost: full table scan, nested loop on huge sets, hash spill to disk, expensive sort. (3) Common fixes: add covering index for filter+join columns, rewrite correlated subquery as JOIN, replace SELECT * with needed columns, partition large tables by date, use EXISTS instead of IN for big lists, push aggregations down. (4) Update statistics (ANALYZE/VACUUM in Postgres). (5) Consider materialization (CTE → temp table). (6) For warehouses, check clustering/sort keys and pruning effectiveness.",
    keyPoints: [
      "Estimated vs actual row mismatch → run ANALYZE",
      "Sequential scan isn't always bad (small tables, high selectivity)",
      "Indexes hurt writes — measure both sides",
      "Composite index column order matters (most selective first or filter-first)",
      "Warehouse queries: check pruning, clustering, partition filter pushdown",
    ],
    pitfalls: [
      "Adding indexes blindly → write amplification, larger backups",
      "EXPLAIN without ANALYZE → only shows estimates, not actuals",
      "Ignoring TOAST/large columns inflating I/O",
    ],
    interviewTip: "Walk through a concrete past optimization: 'I cut a 90s query to 2s by adding a (user_id, created_at) covering index.'",
    tags: ["sql", "performance", "optimization"],
  },
  {
    id: "de-sql-ext-5",
    role: "data-engineer",
    category: "SQL & Databases",
    difficulty: "Senior",
    question: "Explain ACID vs BASE. When would you choose a NoSQL store?",
    tldr: "ACID = strong consistency for transactions (RDBMS). BASE = eventual consistency for scale (many NoSQL).",
    answer:
      "ACID (Atomicity, Consistency, Isolation, Durability) guarantees transactional correctness — Postgres, MySQL, SQL Server. BASE (Basically Available, Soft state, Eventually consistent) trades immediate consistency for availability and partition tolerance — Cassandra, DynamoDB. CAP theorem: under network partition you must choose consistency or availability. Use ACID for money, inventory, anything where reading stale data is unacceptable. Use NoSQL when: massive horizontal scale needed (>TB writes/day), schema is genuinely flexible (events, documents), single-key lookup dominates (DynamoDB, Redis), or graph traversals are core (Neo4j). Many systems are now hybrid: Spanner/CockroachDB give ACID at scale; DynamoDB added transactions.",
    keyPoints: [
      "ACID transactions need coordination → harder to scale horizontally",
      "Eventual consistency requires conflict resolution strategy",
      "Pick storage by access pattern, not hype",
      "NewSQL (Spanner, CockroachDB) bridges the gap",
      "Document DBs ≠ schema-less in practice — you still need a schema mentally",
    ],
    pitfalls: [
      "Choosing MongoDB for relational workloads → painful joins",
      "Choosing Postgres for time-series at petabyte scale → use a TSDB",
      "Ignoring eventual consistency → read-after-write bugs",
    ],
    interviewTip: "Say: 'I match the store to the access pattern. For OLTP I default to Postgres; I only reach for NoSQL with a concrete reason.'",
    tags: ["acid", "nosql", "architecture"],
  },

  // DATA ENGINEER — Pipelines (extended)
  {
    id: "de-pipe-ext-1",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Mid",
    question: "What does it mean for a pipeline to be idempotent and why does it matter?",
    tldr: "Running the same task multiple times produces the same result — critical for safe retries.",
    answer:
      "An idempotent task can be re-run without causing duplicates, double-counting, or side effects. This matters because pipelines fail constantly (network, OOM, upstream delays) and orchestrators retry them. If your task isn't idempotent, retries corrupt the data. Implementation patterns: (1) Overwrite-by-partition — wipe the date partition then write fresh (most common in batch). (2) MERGE/UPSERT keyed on a natural or hash key. (3) Use deterministic IDs (hash of business keys + event time) to dedupe. (4) Store a processed-watermark and skip already-handled inputs. (5) Two-phase commit / staging table → atomic swap.",
    keyPoints: [
      "Overwrite-by-partition is the most idempotent batch pattern",
      "MERGE solves upserts in modern warehouses",
      "Deterministic surrogate keys enable dedup downstream",
      "Always test: run task twice, assert identical output",
      "Combine with at-least-once delivery for end-to-end correctness",
    ],
    pitfalls: [
      "INSERT-only without dedup → duplicates on retry",
      "Using 'now()' inside the task — non-deterministic",
      "Side effects (sending emails) inside otherwise-idempotent tasks",
    ],
    interviewTip: "Say: 'Every Airflow task I write is idempotent — partition overwrite is my default pattern.'",
    codeExample: {
      language: "sql",
      code: `-- Idempotent partition overwrite (BigQuery/Snowflake style)
DELETE FROM events WHERE event_date = '2024-04-15';
INSERT INTO events
SELECT * FROM staging.events_raw
WHERE event_date = '2024-04-15';`,
    },
    tags: ["idempotency", "pipelines", "reliability"],
  },
  {
    id: "de-pipe-ext-2",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Mid",
    question: "How do you handle schema evolution in a data pipeline?",
    tldr: "Use a format that supports schema evolution (Parquet/Avro/Delta), version your contracts, and add columns additively.",
    answer:
      "Strategy: (1) Use formats with native schema evolution — Avro, Parquet, Delta Lake, Iceberg. (2) Prefer additive changes (add nullable columns) — never reorder or rename in place. (3) For breaking changes, version the table (events_v2) and migrate consumers gradually. (4) Enforce schemas at ingestion with a schema registry (Confluent, Glue) — reject malformed records to a DLQ. (5) Use data contracts: producers commit to schema + SLAs; CI rejects breaking PRs. (6) For renames/type changes, do expand-migrate-contract: add new column, dual-write, backfill, switch readers, drop old. (7) Document changes in CHANGELOG; alert downstream owners.",
    keyPoints: [
      "Additive (add nullable) = safe; rename/drop = breaking",
      "Schema registry prevents bad data at the source",
      "Delta/Iceberg provide ALTER TABLE without rewriting all data",
      "Data contracts shift quality left, to producers",
      "Version-major bumps for breaking changes (events_v2)",
    ],
    pitfalls: [
      "Renaming a column in production → all downstream queries break",
      "Implicit type coercion (string → int) silently dropping bad rows",
      "No schema registry → garbage data lands in the lake",
    ],
    interviewTip: "Bring up data contracts and the expand-migrate-contract pattern — both are hot topics in modern data eng.",
    tags: ["schema-evolution", "data-contracts"],
  },
  {
    id: "de-pipe-ext-3",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Mid",
    question: "How do you backfill a pipeline for historical data?",
    tldr: "Run the same idempotent task across past partitions in parallel-bounded batches.",
    answer:
      "Backfill plan: (1) Confirm the task is idempotent. (2) Decide scope — date range, specific entities. (3) Estimate cost (rows × per-task cost) and plan in chunks (e.g. month at a time) so a failure doesn't restart everything. (4) Throttle concurrency to protect upstream sources and downstream consumers (e.g. max 5 concurrent days in Airflow). (5) Run in a separate environment or off-peak hours if shared resources. (6) Monitor — log rows processed per partition, validate counts vs source. (7) Validate downstream consumers see the new data correctly. In Airflow, use `airflow dags backfill` with --max-active-runs; in dbt, use `--vars 'start_date: ...'` with incremental models.",
    keyPoints: [
      "Idempotency is non-negotiable for backfills",
      "Throttle to avoid hammering APIs/warehouse",
      "Backfill window in chunks → resumable on failure",
      "Validate row counts and key business metrics post-backfill",
      "Communicate to downstream teams before starting",
    ],
    pitfalls: [
      "Backfilling a non-idempotent task → duplicates everywhere",
      "Backfilling 3 years in one DAG run → no recovery point",
      "Forgetting to disable downstream alerts during the backfill",
    ],
    interviewTip: "Mention 'backfill DAG' as a separate, throttled instance of the production DAG — shows operational maturity.",
    tags: ["backfill", "operations"],
  },
  {
    id: "de-pipe-ext-4",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Senior",
    question: "What is a Dead Letter Queue (DLQ) and how do you operate one?",
    tldr: "A holding area for messages that failed processing, so the main pipeline isn't blocked.",
    answer:
      "A DLQ stores messages/records that couldn't be processed after N retries — bad schema, parse error, business-rule failure. The main consumer continues; failed records don't block the queue or get silently dropped. Operating a DLQ: (1) Always include error reason and original payload. (2) Alert on DLQ depth and rate of arrivals. (3) Provide tooling to replay (after fix) or manually correct then re-emit. (4) Set TTL — old messages either get processed or expire. (5) Monitor DLQ-to-main ratio as a quality KPI. (6) Build dashboards by error type to find systemic issues fast.",
    keyPoints: [
      "Decouples failures from happy path",
      "Always log original payload + reason + timestamp",
      "Alert on rate AND depth",
      "Replay tooling is mandatory — DLQs without replay are graveyards",
      "Common in Kafka, SQS, RabbitMQ, Pub/Sub",
    ],
    pitfalls: [
      "DLQ growing forever and never inspected",
      "No metadata → impossible to debug or replay",
      "Same poison message sent back to main repeatedly without circuit breaker",
    ],
    interviewTip: "Mention you'd page on-call when DLQ rate exceeds 1% of throughput — a concrete operational threshold.",
    tags: ["dlq", "messaging", "reliability"],
  },
  {
    id: "de-pipe-ext-5",
    role: "data-engineer",
    category: "Data Pipelines & ETL",
    difficulty: "Senior",
    question: "How do you design SLAs and SLOs for data pipelines?",
    tldr: "SLA = promise to consumers; SLO = internal target you measure; SLI = the actual metric.",
    answer:
      "SLI (Service Level Indicator) is what you measure — e.g. 'data freshness = max(now - max(updated_at))', 'pipeline success rate'. SLO is the internal target — e.g. '99% of days, daily_sales table fresh by 8am'. SLA is the contractual or social promise to consumers (often slightly looser than SLO). Process: (1) Talk to consumers — what's their workflow, what breaks them? (2) Define 2-3 SLIs per critical dataset (freshness, completeness, accuracy). (3) Set SLO with error budget. (4) Instrument and dashboard. (5) When error budget is burned, freeze risky changes until restored. (6) Quarterly review with consumers.",
    keyPoints: [
      "SLI < SLO < SLA (each looser than the next)",
      "Error budget = (1 - SLO) — quantifies risk capacity",
      "Freshness, completeness, accuracy are the big three SLIs",
      "Dashboards must show SLO compliance at a glance",
      "Review and renegotiate quarterly with consumers",
    ],
    pitfalls: [
      "Setting 99.99% SLO without measuring current state → impossible to hit",
      "No error budget policy → no consequences for missing SLOs",
      "SLOs that no one consumes → wasted instrumentation",
    ],
    interviewTip: "Mention error budget policy: 'When we burn 50% of monthly budget, we freeze risky changes' — shows SRE maturity.",
    tags: ["sla", "slo", "reliability"],
  },

  // DATA ENGINEER — Big Data (extended)
  {
    id: "de-bd-ext-1",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Mid",
    question: "Explain shuffle vs broadcast join in Spark. When would you use each?",
    tldr: "Shuffle join repartitions both sides by key (expensive). Broadcast sends a small table to every executor (cheap if it fits).",
    answer:
      "Shuffle (sort-merge or shuffle-hash) join repartitions both DataFrames by the join key across the cluster — heavy network and disk I/O. Broadcast hash join ships a small dataset to every executor's memory and joins locally with the partitioned big side — eliminates shuffle. Use broadcast when one side is small (default threshold spark.sql.autoBroadcastJoinThreshold = 10 MB; tune to ~100 MB). Force with broadcast(df). For two huge tables, you can't broadcast — instead pre-bucket on the join key, use Adaptive Query Execution (AQE) which auto-converts to broadcast at runtime when stats reveal it's small, or pre-aggregate one side.",
    keyPoints: [
      "Broadcast eliminates shuffle but uses memory on every executor",
      "AQE in Spark 3+ converts shuffle joins to broadcast at runtime",
      "Bucketing both tables on the join key avoids shuffle for repeated joins",
      "Skewed keys ruin shuffle joins — use salting or AQE skew join",
      "Always check the physical plan with explain()",
    ],
    pitfalls: [
      "Broadcasting a table that's too big → OOM on executors",
      "Joining on highly-skewed keys without skew handling → one stuck task",
      "Disabling AQE in modern Spark — usually a regression",
    ],
    interviewTip: "Mention skew join handling and AQE — both signal modern Spark experience.",
    codeExample: {
      language: "python",
      code: `from pyspark.sql.functions import broadcast

big = spark.table("events")        # 1 TB
small = spark.table("countries")    # 5 MB
joined = big.join(broadcast(small), "country_code", "left")`,
    },
    tags: ["spark", "joins", "performance"],
  },
  {
    id: "de-bd-ext-2",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Mid",
    question: "What is partitioning vs clustering in a data warehouse, and how do you choose partition keys?",
    tldr: "Partition splits files by a coarse key (date) for pruning; clustering sorts within partitions for skipping.",
    answer:
      "Partitioning splits a table into separate physical files/folders by a low-cardinality column — usually a date (event_date, ingestion_date). Queries with WHERE on the partition column skip whole partitions (pruning). Clustering (BigQuery) / sort keys (Redshift) / Z-ordering (Delta) sort data within partitions on additional columns, enabling block-level skipping. Partition rules: (1) Cardinality 100-10,000 — too many = small files & metadata overhead; too few = poor pruning. (2) Always include in WHERE clause queries. (3) Avoid high-cardinality columns (user_id) — use clustering instead.",
    keyPoints: [
      "Partition for pruning, cluster for skipping within partition",
      "Date is the most common and usually best partition key",
      "Too many small partitions → metadata cost dominates",
      "Cluster on join/filter keys with high cardinality",
      "Re-cluster periodically (Snowflake auto, Delta OPTIMIZE)",
    ],
    pitfalls: [
      "Partitioning on user_id with millions of users → file explosion",
      "Querying without the partition filter → full scan",
      "Forgetting to compact small files in streaming pipelines",
    ],
    interviewTip: "Bring up the small-files problem — every senior data eng has been burned by it.",
    tags: ["partitioning", "warehouse", "performance"],
  },
  {
    id: "de-bd-ext-3",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Senior",
    question: "Compare Delta Lake, Apache Iceberg, and Apache Hudi.",
    tldr: "All three add ACID transactions, time travel, and schema evolution to data lakes. Differences are in maturity, ecosystem, and write patterns.",
    answer:
      "Delta Lake (Databricks, OSS): tightest integration with Spark, mature DML, strong on batch with Auto Loader for streaming. Default in Databricks. Iceberg (Apache, originated at Netflix): truly engine-agnostic — Spark, Trino, Flink, Snowflake, BigQuery, DuckDB read it. Best for multi-engine architectures. Strong hidden partitioning. Hudi (originated at Uber): built for incremental upserts and CDC ingestion, with COW (copy-on-write) and MOR (merge-on-read) table types. Best for high-velocity streaming inserts. All support: ACID, time travel, schema evolution, partition evolution. Iceberg is winning the 'open lakehouse' battle in 2024-2025; Delta still dominant in Databricks shops.",
    keyPoints: [
      "All three: ACID + time travel + schema evolution",
      "Iceberg: most engine-agnostic, fastest growing",
      "Delta: best Spark/Databricks integration",
      "Hudi: best for streaming upserts (CDC)",
      "Snowflake, BigQuery, Redshift now read Iceberg externally",
    ],
    pitfalls: [
      "Choosing based on hype without checking your engine support",
      "Mixing formats in the same lake → operational pain",
      "Forgetting to compact / OPTIMIZE / VACUUM regularly",
    ],
    interviewTip: "Say: 'I'd default to Iceberg today for greenfield because of multi-engine portability, Delta if we're a Databricks shop.'",
    tags: ["lakehouse", "delta", "iceberg", "hudi"],
  },
  {
    id: "de-bd-ext-4",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Senior",
    question: "How do you optimize cloud data warehouse costs (Snowflake/BigQuery)?",
    tldr: "Right-size compute, prune scans, kill bad queries, use materialized layers, and chargeback by team.",
    answer:
      "(1) Right-size warehouses/slots — most teams run 2x what they need. Use auto-suspend (60s idle) and auto-resume. (2) Reduce bytes scanned — partition + cluster, SELECT only needed columns, push filters early. BigQuery charges per TB scanned. (3) Set query/timeout limits and cost guards (BigQuery max bytes billed, Snowflake resource monitors). (4) Materialize expensive aggregations (dbt incremental, materialized views, Snowflake dynamic tables). (5) Separate workloads by warehouse/reservation — don't let an analyst's bad query starve production. (6) Chargeback: tag queries by team/job, send weekly cost reports. (7) Periodic query audits — top 10 by cost almost always reveal easy wins.",
    keyPoints: [
      "Auto-suspend + right-sizing = biggest quick wins",
      "Partition pruning is the highest-leverage optimization",
      "Resource monitors / cost caps prevent blowups",
      "Workload isolation prevents noisy neighbors",
      "Chargeback creates incentives — costs drop when teams see them",
    ],
    pitfalls: [
      "Always-on XL warehouse for a job that runs 5 minutes/hour",
      "SELECT * on petabyte tables in dashboards",
      "No cost caps → one bad recursive CTE costs $10k overnight",
    ],
    interviewTip: "Quote a real win: 'I cut Snowflake spend 40% by adding auto-suspend and tightening 3 dbt models.'",
    tags: ["cost", "warehouse", "snowflake", "bigquery"],
  },
  {
    id: "de-bd-ext-5",
    role: "data-engineer",
    category: "Big Data & Cloud",
    difficulty: "Senior",
    question: "Explain exactly-once semantics in streaming. How is it actually achieved?",
    tldr: "Combine idempotent producers, transactional writes, and consumer offset commits in the same atomic unit.",
    answer:
      "Exactly-once doesn't mean 'each message physically delivered once' — it means 'each message has exactly-once effect on the output state.' Achieved via: (1) Idempotent producer (Kafka's enable.idempotence=true) — dedup retries by producer ID + sequence number. (2) Transactional writes — producer writes to output topic AND commits consumer offsets atomically. (3) On the read side, consumers in 'read_committed' mode only see committed messages. Flink achieves it via two-phase commit checkpoints to sinks that support it (Kafka, Iceberg). For sinks without transactions, achieve effectively-once by writing with deterministic keys + downstream dedup (UPSERT on primary key).",
    keyPoints: [
      "Exactly-once = exactly-once effect, not exactly-once delivery",
      "Kafka EOS: idempotent producer + transactions + read_committed",
      "Flink: two-phase commit with checkpoint barriers",
      "If sink isn't transactional → use deterministic keys + UPSERT",
      "Trade-off: lower throughput, higher latency than at-least-once",
    ],
    pitfalls: [
      "Claiming EOS without verifying the sink supports transactions",
      "Mixing transactional and non-transactional consumers on the same topic",
      "Long transactions blocking compaction",
    ],
    interviewTip: "Say: 'In practice I aim for at-least-once + idempotent sink, which gives effectively-once with much less complexity.'",
    tags: ["streaming", "kafka", "flink", "exactly-once"],
  },

  // DATA ENGINEER — System Design (extended)
  {
    id: "de-sys-ext-1",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Mid",
    question: "Compare star schema vs snowflake schema. Which would you pick for a BI workload?",
    tldr: "Star = one fact + denormalized dimensions (fast, simple). Snowflake = normalized dimensions (less storage, more joins).",
    answer:
      "Star schema: a central fact table (events, orders) joined to dimension tables (customer, product, date) that are denormalized — each dim is one wide flat table. Snowflake schema normalizes dimensions further (product → category → department as separate tables). Star is the standard for analytics: fewer joins, simpler queries, faster on columnar warehouses where storage is cheap. Snowflake saves storage and enforces consistency but adds join complexity. Modern columnar warehouses (BigQuery, Snowflake, Redshift) compress denormalized data extremely well, so storage savings are minor — pick star for nearly all BI use cases.",
    keyPoints: [
      "Star = denormalized dims, snowflake = normalized dims",
      "Star: fewer joins, faster queries, simpler for BI tools",
      "Modern warehouses compress denormalized data well",
      "Conformed dimensions enable cross-fact analysis",
      "Galaxy schema = multiple facts sharing dimensions",
    ],
    pitfalls: [
      "Snowflaking everything → tableau-killer query plans",
      "Forgetting a date dimension table — most underrated dim",
      "Inconsistent grain in fact table → wrong aggregations",
    ],
    interviewTip: "Always ask: 'What's the grain of the fact table?' first. Senior interviewers expect this.",
    tags: ["modeling", "star-schema", "warehouse"],
  },
  {
    id: "de-sys-ext-2",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "Explain Slowly Changing Dimensions (SCD) Type 1, 2, and 3.",
    tldr: "Type 1 overwrites; Type 2 keeps full history with versioned rows; Type 3 keeps limited history in extra columns.",
    answer:
      "SCD Type 1: overwrite the dimension on change. Loses history. Simplest. Use when history doesn't matter (typo fixes). Type 2: insert a new row per change with effective_from/effective_to dates and an is_current flag (or a surrogate key). Preserves full history — facts join to the version valid at the event time. Most common for analytics. Type 3: add 'previous_value' column(s) — preserves only the last N changes. Rarely used. Type 4 (less common): split rapidly-changing attributes into a mini-dimension. Type 6 = 1+2+3 hybrid. Modern implementations: dbt snapshots automate SCD2; Iceberg/Delta time travel lets you query 'as of' a timestamp without explicit SCD2.",
    keyPoints: [
      "SCD2 is the workhorse for historical analytics",
      "Use surrogate keys with SCD2 (natural key changes break things)",
      "dbt snapshots = SCD2 in one config",
      "Time travel in lakehouse formats reduces SCD2 boilerplate",
      "Always join facts on surrogate key valid at event time",
    ],
    pitfalls: [
      "Joining facts to current dim row → wrong historical attribution",
      "SCD2 on a dimension that changes 1000x/day → row explosion",
      "Forgetting to handle late-arriving facts (back-dating)",
    ],
    interviewTip: "Mention dbt snapshots — they're the de-facto modern way to implement SCD2 in a warehouse.",
    tags: ["scd", "modeling", "dimensional"],
  },
  {
    id: "de-sys-ext-3",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "What is Change Data Capture (CDC) and how does it compare to batch ingestion?",
    tldr: "CDC streams every insert/update/delete from a source DB in near-real-time, vs batch which pulls snapshots periodically.",
    answer:
      "CDC reads the database transaction log (Postgres WAL, MySQL binlog, Oracle redo) and emits each row change as an event — typically into Kafka. Tools: Debezium, AWS DMS, Fivetran, Airbyte. Benefits over batch: (1) Near-real-time freshness (seconds vs hours). (2) No load on source from heavy SELECT queries. (3) Captures deletes (batch often misses them). (4) Lower volume than snapshots after initial load. Trade-offs: more operational complexity, must handle schema changes, ordering guarantees per key only, exactly-once requires careful sink design. Common pattern: CDC into Kafka → stream processor → upsert into Iceberg/Delta with MERGE.",
    keyPoints: [
      "Reads DB log, doesn't query the DB itself",
      "Captures deletes — batch SELECTs cannot",
      "Per-key ordering is guaranteed; global ordering is not",
      "Initial snapshot + ongoing log-based replication",
      "MERGE on the sink to apply CDC stream into a table",
    ],
    pitfalls: [
      "Not handling DDL changes → consumers break",
      "Replication slot fills disk if consumer is down (Postgres)",
      "Assuming global ordering across keys",
    ],
    interviewTip: "Mention Debezium and the typical 'CDC → Kafka → Iceberg MERGE' lakehouse pattern — it's the modern standard.",
    tags: ["cdc", "debezium", "streaming"],
  },
  {
    id: "de-sys-ext-4",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "How would you design data lineage for a large data platform?",
    tldr: "Capture column-level dependencies automatically from query logs / ETL DAGs, store in a graph, expose via UI and APIs.",
    answer:
      "Components: (1) Collectors — parse SQL from warehouses (Snowflake query history, BigQuery audit logs), DAG metadata from Airflow, models from dbt. Use sqlglot/sqllineage for column-level parsing. (2) Storage — graph DB (Neo4j) or specialized catalog (DataHub, OpenLineage, Atlan, Collibra). (3) Standards — emit OpenLineage events from every job. (4) UI — table/column upstream and downstream views, impact analysis. (5) Use cases: impact analysis before changes ('who breaks if I drop this column?'), incident triage ('what dashboards depend on this failed job?'), regulatory (PII flow tracking), cost attribution.",
    keyPoints: [
      "Column-level lineage > table-level for impact analysis",
      "OpenLineage is the emerging open standard",
      "DataHub and OpenMetadata are leading open-source catalogs",
      "Automate collection — manual lineage rots immediately",
      "Integrate with on-call: link incidents to lineage automatically",
    ],
    pitfalls: [
      "Manually documenting lineage → outdated within a week",
      "Table-level only → can't answer 'is this column used downstream?'",
      "Lineage UI no one uses — invest in workflows that surface it",
    ],
    interviewTip: "Mention sqlglot for column-level parsing and OpenLineage as the standard — shows current tooling knowledge.",
    tags: ["lineage", "catalog", "governance"],
  },
  {
    id: "de-sys-ext-5",
    role: "data-engineer",
    category: "System Design",
    difficulty: "Senior",
    question: "What are data contracts and why are they important?",
    tldr: "Producer-owned, versioned schemas + SLAs that downstream teams depend on, enforced in CI.",
    answer:
      "Data contracts shift data quality 'left' — to the producer (the application or upstream service) instead of fixing problems downstream. A contract specifies: schema (fields, types, nullability), semantics (what each field means), SLAs (freshness, completeness), ownership, and change policy (versioning, deprecation window). Enforced via: schema registry rejecting non-conforming events at ingestion, CI checks on producer PRs, and tests on the consumer side. Benefits: stops the 'analytics engineer fixes upstream bugs forever' anti-pattern, makes data a true product, enables stable downstream investments. Tools: Confluent Schema Registry, Avro/Protobuf, dbt source contracts, custom registries.",
    keyPoints: [
      "Producer owns the contract, not the consumer",
      "Versioning + deprecation window for breaking changes",
      "CI rejects breaking schema changes pre-merge",
      "Pairs naturally with event-driven architectures",
      "Treat data like APIs — backward compatibility matters",
    ],
    pitfalls: [
      "Imposing contracts top-down without producer buy-in → ignored",
      "Contracts without enforcement → just documentation that rots",
      "Over-specifying → slows producer iteration",
    ],
    interviewTip: "Frame it: 'Data contracts make data a product. Producers ship a versioned API; consumers depend on it like any other service.'",
    tags: ["data-contracts", "quality", "architecture"],
  },
];
