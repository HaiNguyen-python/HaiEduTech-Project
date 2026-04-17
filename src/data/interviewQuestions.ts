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
];
