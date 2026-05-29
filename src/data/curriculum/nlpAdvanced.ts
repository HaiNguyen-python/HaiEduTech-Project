import type { ExtendedProgrammingModule } from "./types";

/**
 * NLP Advanced — practitioner-grade reinforcement module covering modern
 * LLM-era NLP: prompt engineering, embeddings + vector search, multilingual
 * pipelines, and production NLP system design.
 *
 * Heavy ASCII diagrams + comparison tables act as "illustrations" inside the
 * markdown theory renderer (which doesn't render <img>).
 */
export const nlpAdvancedModules: ExtendedProgrammingModule[] = [
  {
    id: "nlp-advanced-2026",
    title: "NLP Nâng cao (2026) — LLM, Embeddings & Production",
    titleEn: "Advanced NLP (2026) — LLMs, Embeddings & Production",
    icon: "🧠",
    color: "from-cyan-500 to-blue-600",
    description:
      "4 bài chuyên sâu: kiến trúc Transformer trực quan, prompt engineering có kỷ luật, embeddings + vector search, và thiết kế hệ NLP production đa ngôn ngữ.",
    descriptionEn:
      "4 deep lessons: a visual Transformer walkthrough, disciplined prompt engineering, embeddings + vector search, and multilingual NLP system design for production.",
    course: "nlp",
    lessons: [
      {
        id: "nlp-adv-1",
        title: "Transformer trực quan — 'Attention is all you need' (giải mã)",
        titleEn: "Transformer Visualized — Decoding 'Attention is all you need'",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🎯 Vì sao Transformer thắng RNN?

RNN xử lý token tuần tự → chậm + quên token xa.
Transformer xử lý **song song** + mỗi token **nhìn thẳng** tới mọi token khác qua *attention*.

\`\`\`
   RNN (tuần tự):       t1 → t2 → t3 → t4 → t5     (mất ngữ cảnh xa)
   Transformer:         t1 ⇄ t2 ⇄ t3 ⇄ t4 ⇄ t5     (mọi token nhìn nhau)
\`\`\`

## 2. 🔭 Sơ đồ một block Transformer

\`\`\`
   Input tokens
        │
        ▼
   ┌─────────────────────────────────────────────┐
   │  Embedding + Positional Encoding (sin/cos)  │
   └─────────────────────────────────────────────┘
        │
        ▼
   ┌─────────────────────────────────────────────┐
   │   Multi-Head Self-Attention                 │
   │   ─────────────────────────                 │
   │   Q = X·Wq    K = X·Wk    V = X·Wv          │
   │   Attn(Q,K,V) = softmax(QKᵀ/√d_k) · V       │
   │   (chạy h=8 head song song rồi nối lại)     │
   └─────────────────────────────────────────────┘
        │ + residual + LayerNorm
        ▼
   ┌─────────────────────────────────────────────┐
   │   Feed-Forward (2 lớp Linear + GELU)        │
   └─────────────────────────────────────────────┘
        │ + residual + LayerNorm
        ▼
     Output → next block (×N, thường N=12..96)
\`\`\`

## 3. 🧮 Self-attention bằng số (ví dụ tí hon)

Câu: \`"the cat sat"\` → 3 token. Mỗi token có vector d=4.

\`\`\`
   Q (3×4) · Kᵀ (4×3)  →  điểm số (3×3)
   ─────────────────────────────────────
            the    cat    sat
     the    8.1    5.2    1.3
     cat    5.2    9.0    6.4   ← "cat" chú ý mạnh tới "sat"
     sat    1.3    6.4    8.7

   softmax mỗi hàng → trọng số → nhân với V → vector mới giàu ngữ cảnh
\`\`\`

## 4. 🏛️ 3 họ kiến trúc — chọn đúng cho bài toán

| Họ | Ví dụ | Mạnh ở | Không nên dùng cho |
|----|-------|--------|--------------------|
| **Encoder-only** | BERT, RoBERTa, mBERT | Phân loại, NER, retrieval embedding | Sinh văn bản dài |
| **Decoder-only** | GPT, LLaMA, Mistral | Sinh văn bản, chat, code | Embedding chất lượng cao |
| **Encoder-Decoder** | T5, BART, mT5 | Dịch, tóm tắt, seq2seq | Latency thấp cực đại |

## 5. 📏 Bậc thang kích cỡ & "scaling law"

| Mô hình | Tham số | Năm |
|---------|---------|-----|
| BERT-base | 110M | 2018 |
| GPT-2 | 1.5B | 2019 |
| GPT-3 | 175B | 2020 |
| LLaMA-3 70B | 70B | 2024 |
| Mixtral 8x22B (MoE active ≈ 39B) | ~141B total | 2024 |

Quy luật Chinchilla: nhân đôi tham số → cần ~nhân đôi token huấn luyện để không lãng phí compute.

## 6. ⚠️ Bẫy thường gặp

- Quên positional encoding → mọi hoán vị câu cho cùng output.
- Không chia \`√d_k\` → softmax bão hoà, gradient biến mất.
- Dùng decoder-only để làm semantic search → embedding kém hơn encoder chuyên dụng.
`,
        theoryEn: `Transformers process tokens in parallel via self-attention (Q·Kᵀ/√d_k → softmax → V), with positional encoding to keep order. Three architecture families: encoder-only (BERT, classification/retrieval), decoder-only (GPT/LLaMA, generation), encoder-decoder (T5, seq2seq). Chinchilla scaling: double parameters ⇒ roughly double training tokens.`,
        code: `import numpy as np

def softmax(x, axis=-1):
    x = x - x.max(axis=axis, keepdims=True)
    e = np.exp(x)
    return e / e.sum(axis=axis, keepdims=True)

def scaled_dot_product_attention(Q, K, V):
    d_k = Q.shape[-1]
    scores = Q @ K.T / np.sqrt(d_k)
    weights = softmax(scores, axis=-1)
    return weights @ V, weights

# Tiny demo: 3 tokens, dim 4
rng = np.random.default_rng(0)
X = rng.normal(size=(3, 4))
Wq, Wk, Wv = (rng.normal(size=(4, 4)) for _ in range(3))
Q, K, V = X @ Wq, X @ Wk, X @ Wv
out, w = scaled_dot_product_attention(Q, K, V)
print("attention weights:\\n", w.round(2))
print("output shape:", out.shape)`,
        codeLanguage: "python",
        exercise:
          "Mở rộng hàm thành multi-head attention với h=2 head bằng cách chia chiều cuối làm đôi, chạy attention độc lập rồi nối kết quả lại.",
        exerciseEn:
          "Extend the function to multi-head attention with h=2 by splitting the last dim, running attention per head independently, then concatenating.",
        quiz: [
          { question: "Vì sao phải chia cho √d_k trong attention?", options: ["Để code ngắn hơn", "Để giữ phương sai softmax ổn định, tránh gradient triệt tiêu", "Vì lý do đạo đức", "Không thật sự cần"], answer: 1, explanation: "Không scale → tích vô hướng lớn → softmax bão hoà → gradient ≈ 0." },
          { question: "Positional encoding tồn tại để?", options: ["Tăng tham số", "Đưa thông tin thứ tự token vào mô hình vốn permutation-invariant", "Bảo mật dữ liệu", "Tăng tốc GPU"], answer: 1, explanation: "Self-attention không biết thứ tự — positional encoding cấp thông tin vị trí." },
          { question: "Khi cần embedding cho semantic search, nên dùng họ nào?", options: ["Decoder-only", "Encoder-only như BERT/E5", "RNN", "Markov chain"], answer: 1, explanation: "Encoder bidirectional cho embedding ngữ nghĩa mạnh hơn decoder one-way." },
          { question: "Chinchilla scaling law nói gì?", options: ["Càng nhiều tham số luôn tốt hơn", "Tham số và token huấn luyện nên tăng tương xứng để không lãng phí compute", "Không liên quan", "Chỉ áp dụng cho dịch máy"], answer: 1, explanation: "DeepMind 2022 — nhiều model lớn từng under-trained vì thiếu token." },
          { question: "Mô hình nào dưới đây là encoder-decoder?", options: ["BERT", "GPT-3", "T5", "LLaMA"], answer: 2, explanation: "T5/BART/mT5 là encoder-decoder, lý tưởng cho seq2seq như dịch và tóm tắt." },
        ],
      },
      {
        id: "nlp-adv-2",
        title: "Prompt Engineering có kỷ luật — biến LLM thành công cụ tin cậy",
        titleEn: "Disciplined Prompt Engineering — Making LLMs Reliable Tools",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🧭 Mô hình mental: "LLM là intern siêu thông minh nhưng hay quên"

Bạn phải nói rõ: **vai trò → bối cảnh → nhiệm vụ → định dạng đầu ra → ví dụ → giới hạn**.

\`\`\`
   ┌──────────────────────────────────────────────────┐
   │  PROMPT SKELETON                                 │
   │  ───────────────                                 │
   │  [ROLE]      Bạn là chuyên gia luật giáo dục VN. │
   │  [CONTEXT]   Người dùng là phụ huynh, lớp 3.     │
   │  [TASK]      Giải thích quy định mới về…         │
   │  [FORMAT]    JSON: {summary, bullets[], risks[]} │
   │  [EXAMPLES]  (1–2 cặp input → output mẫu)        │
   │  [GUARDRAIL] Nếu không chắc, trả "unknown".      │
   └──────────────────────────────────────────────────┘
\`\`\`

## 2. 🧪 4 kỹ thuật cốt lõi

| Kỹ thuật | Khi nào dùng | Ví dụ ngắn |
|----------|--------------|-----------|
| **Zero-shot** | Task đơn giản, LLM mạnh | "Dịch sang tiếng Anh: …" |
| **Few-shot** | Task có pattern lạ | Cho 2–5 ví dụ input → output |
| **Chain-of-Thought** | Toán, logic nhiều bước | "Hãy suy luận từng bước trước khi trả lời" |
| **ReAct** (Reason+Act) | Cần gọi tool/search | Xen kẽ "Thought → Action → Observation" |

## 3. 📦 JSON-mode & structured output

Yêu cầu LLM trả JSON đúng schema → parse ổn định trong code.

\`\`\`
   System: "Trả về JSON đúng schema:
            {action: 'pass'|'fail', score: 0-10, reasons: string[]}"
   User:   "Bài luận: ..."
\`\`\`

Mẹo: kèm 1 ví dụ JSON hợp lệ → tỉ lệ schema-correct tăng từ ~78% lên ~98%.

## 4. 🛡️ Guardrails & chống "ảo giác"

- **Bắt buộc trích nguồn**: "Mỗi claim phải kèm citation từ đoạn context."
- **Ngưỡng tự tin**: "Nếu confidence < 0.7, trả 'I don't know'."
- **Input sanitization**: lọc prompt injection ("ignore previous instructions…").
- **Output validation**: regex/JSON schema, fallback nếu parse fail.

## 5. 📊 Đo lường prompt — đừng tin cảm tính

\`\`\`
   eval_set = [(input_1, gold_1), ..., (input_50, gold_50)]
   score(prompt_v) = mean(metric(LLM(prompt_v, x), gold))  for x in eval_set
\`\`\`

Quy trình: viết v1 → chạy eval → đọc 10 fail case → sửa thành v2 → so sánh **trên cùng eval set**.

## 6. ⚠️ Anti-pattern

- "Hãy thật chính xác và đừng sai" → vô nghĩa, không thay đổi xác suất.
- Prompt 4000 token cho task 1 dòng → tăng cost, giảm latency, dễ mất focus.
- Few-shot toàn ví dụ "dễ" → LLM học sai distribution.
`,
        theoryEn: `Treat the LLM as a smart intern with amnesia: specify role → context → task → output format → examples → guardrails. Pick zero-shot, few-shot, CoT, or ReAct by task shape. Use JSON-mode for structured output (an example example raises schema-correct rate from ~78% to ~98%). Add guardrails (citations, confidence thresholds, injection filtering) and always evaluate prompts on a fixed eval set rather than vibes.`,
        code: `# Pure-Python prompt builder + JSON-safe parser (works against any LLM SDK)
import json, re
from textwrap import dedent

def build_prompt(role: str, task: str, schema: dict, examples: list[tuple[str, dict]]):
    parts = [f"[ROLE] {role}", f"[TASK] {task}",
             f"[OUTPUT] Trả JSON đúng schema: {json.dumps(schema, ensure_ascii=False)}"]
    for i, (inp, out) in enumerate(examples, 1):
        parts.append(f"[EXAMPLE {i} INPUT] {inp}")
        parts.append(f"[EXAMPLE {i} OUTPUT] {json.dumps(out, ensure_ascii=False)}")
    parts.append("[GUARDRAIL] Nếu không chắc field nào, đặt giá trị null và liệt kê trong 'unknown'.")
    return "\\n".join(parts)

def safe_json(text: str):
    """Bóc JSON khỏi text dù LLM bọc ```json ... ``` hay thêm văn bản phụ."""
    m = re.search(r"\\{[\\s\\S]*\\}", text)
    if not m: return None
    try: return json.loads(m.group(0))
    except json.JSONDecodeError: return None

prompt = build_prompt(
    role="Giáo viên IELTS chấm Task 2.",
    task="Cho điểm 0–9 và 3 lý do.",
    schema={"score": "number", "reasons": ["string"], "unknown": ["string"]},
    examples=[("Essay rất hay", {"score": 8, "reasons": ["coherent", "lexical range", "few errors"], "unknown": []})],
)
print(prompt[:300], "...")
print("parsed:", safe_json('Đây là kết quả: \`\`\`json {"score": 7, "reasons":["ok"], "unknown":[]} \`\`\`'))`,
        codeLanguage: "python",
        exercise:
          "Thêm hàm grade_prompt(prompt_text, eval_set, llm_fn) trả về dict {accuracy, schema_valid_rate, avg_latency_ms}.",
        exerciseEn:
          "Add grade_prompt(prompt_text, eval_set, llm_fn) returning {accuracy, schema_valid_rate, avg_latency_ms}.",
        quiz: [
          { question: "Chain-of-Thought phù hợp nhất khi?", options: ["Task dịch ngắn", "Bài cần lập luận nhiều bước (toán, logic)", "Sinh thơ", "Phân loại 2 lớp"], answer: 1, explanation: "CoT giúp LLM tách bước suy luận, giảm sai khi cần logic." },
          { question: "Cách nào chống prompt injection hiệu quả nhất?", options: ["Tin tưởng user", "Tách rõ system / user, lọc keyword, validate output, chạy trong sandbox", "Viết prompt dài hơn", "Tăng temperature"], answer: 1, explanation: "Defense-in-depth: tách layer + sanitize + validate." },
          { question: "Vì sao kèm 1 ví dụ JSON mẫu lại tăng tỉ lệ parse-correct?", options: ["LLM hiểu schema rõ hơn qua ví dụ cụ thể", "Tăng cost", "Vì RNG", "Không có lý do"], answer: 0, explanation: "In-context learning: ví dụ định hình phân phối output mạnh hơn mô tả." },
          { question: "Anti-pattern nào dưới đây nên TRÁNH?", options: ["Đo prompt trên eval set cố định", "Câu 'hãy thật chính xác' mà không có ràng buộc cụ thể", "Cho schema JSON rõ ràng", "Few-shot có cả case khó"], answer: 1, explanation: "Lời khuyên mơ hồ không thay đổi phân phối output." },
          { question: "ReAct kết hợp gì?", options: ["Reason + Action (gọi tool)", "React framework + JS", "Recall + Action", "Random + Act"], answer: 0, explanation: "Xen kẽ Thought → Action (tool) → Observation, đặc biệt hữu ích cho agent." },
        ],
      },
      {
        id: "nlp-adv-3",
        title: "Embeddings & Vector Search — bộ não bán-cấu-trúc của LLM apps",
        titleEn: "Embeddings & Vector Search — The Semi-Structured Brain of LLM Apps",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🎯 Embedding là gì?

Hàm \`encode(text) → vector ∈ ℝ^d\` (d ~ 384..3072) sao cho 2 đoạn có nghĩa gần nhau → vector gần nhau (cosine cao).

\`\`\`
   "I love coding"   →  [0.12, -0.04, ..., 0.31]   ┐
                                                   │  cos ≈ 0.91
   "Lập trình tuyệt vời" → [0.10, -0.05, ..., 0.29]┘

   "I love coding"   vs   "Mèo của tôi tên Tom"   →  cos ≈ 0.07
\`\`\`

## 2. 🗂️ Pipeline RAG kinh điển

\`\`\`
   ┌─────────────────────────────────────────────────────────────┐
   │  INGEST (1 lần / theo CDC)                                  │
   │  ────────                                                   │
   │  docs ─▶ chunk (300–800 tok, overlap 50)                    │
   │       ─▶ embed (encoder)                                    │
   │       ─▶ upsert(vector_db, metadata={src, page, lang})      │
   └─────────────────────────────────────────────────────────────┘
                              │
   ┌─────────────────────────────────────────────────────────────┐
   │  QUERY (mỗi request)                                        │
   │  ───────                                                    │
   │  question ─▶ embed ─▶ ANN search (top-k=8)                  │
   │           ─▶ rerank (cross-encoder, top-3)                  │
   │           ─▶ prompt = system + context + question           │
   │           ─▶ LLM ─▶ answer + citations                      │
   └─────────────────────────────────────────────────────────────┘
\`\`\`

## 3. 🧮 Cosine vs Dot vs L2 — chọn metric

| Metric | Công thức | Khi dùng |
|--------|-----------|----------|
| **Cosine** | A·B / (‖A‖‖B‖) | Mặc định cho text embedding (đã normalize) |
| **Dot** | A·B | Khi embedding chưa normalize và độ dài mang nghĩa |
| **L2** | ‖A − B‖ | Vision, một số embedding học theo khoảng cách Euclid |

Nếu vector đã normalize (‖v‖=1) → cosine và dot tương đương; dot nhanh hơn.

## 4. ⚡ ANN — không ai brute-force ở quy mô triệu vector

| Index | Ý tưởng | Recall | Tốc độ |
|-------|---------|--------|--------|
| **Flat** | So sánh tất cả | 100% | Chậm (O(N)) |
| **IVF** | Chia cụm, chỉ tìm trong cụm gần | ~95% | Nhanh |
| **HNSW** | Đồ thị "small-world" nhiều tầng | ~98% | Rất nhanh, mặc định của Pinecone/pgvector |
| **PQ** | Nén vector → bytes | ~90% | Tiết kiệm RAM |

## 5. 🧩 Chunking — quyết định 80% chất lượng RAG

- **Quá ngắn (<100 tok)**: mất ngữ cảnh, top-k rời rạc.
- **Quá dài (>1500 tok)**: 1 chunk nuốt nhiều chủ đề → embedding mờ.
- **Sweet spot**: 300–800 token + overlap 10–15% + chia theo **heading/đoạn**, không cắt giữa câu.

## 6. ⚠️ Bẫy production

- Embed query bằng model A nhưng docs bằng model B → cosine vô nghĩa.
- Không lưu \`model_version\` cùng vector → đổi model = phải re-index toàn bộ.
- Thiếu **rerank** → top-1 thường nhiễu, đặc biệt với câu hỏi đa ngôn ngữ.
- Bỏ qua **hybrid search** (BM25 + vector) → tệ với truy vấn chứa mã sản phẩm, tên riêng.
`,
        theoryEn: `Embeddings map text to high-dim vectors so semantic neighbors are close in cosine. RAG = ingest (chunk → embed → upsert) + query (embed → ANN top-k → rerank → LLM with citations). Default to cosine for normalized text embeddings; ANN indexes (HNSW, IVF, PQ) replace brute-force at scale. Chunk to 300–800 tokens with overlap on natural boundaries. Production traps: mismatched embedding models for query vs docs, no model_version metadata, missing rerank, missing hybrid (BM25+vector) search.`,
        code: `import numpy as np

def normalize(x): return x / (np.linalg.norm(x, axis=-1, keepdims=True) + 1e-9)

def fake_embed(text: str, dim=64, seed=42):
    """Toy hash embedding — replace with a real encoder (e.g. text-embedding-3-small)."""
    rng = np.random.default_rng(abs(hash(text)) % (2**32))
    return normalize(rng.normal(size=dim))

corpus = [
    "Python is a programming language.",
    "Mèo nhà tôi rất dễ thương.",
    "Transformers power modern NLP.",
    "Học lập trình giúp tư duy logic.",
    "Vector databases store embeddings.",
]
vecs = np.stack([fake_embed(t) for t in corpus])

def search(query: str, k=3):
    q = fake_embed(query)
    sims = vecs @ q                          # cosine vì đã normalize
    idx = np.argsort(-sims)[:k]
    return [(corpus[i], float(sims[i])) for i in idx]

for hit, score in search("teach me coding"):
    print(f"{score:+.3f}  {hit}")`,
        codeLanguage: "python",
        exercise:
          "Thêm hàm chunk_text(text, size=400, overlap=50) chia văn bản theo từ, không cắt giữa câu (giữ ranh giới dấu '.'/'\\n').",
        exerciseEn:
          "Add chunk_text(text, size=400, overlap=50) splitting by words while preserving sentence/paragraph boundaries.",
        quiz: [
          { question: "Vì sao cần normalize vector trước khi dùng cosine?", options: ["Để dot product = cosine, tính nhanh hơn", "Để vector đẹp hơn", "Bắt buộc bởi hardware", "Không cần thiết"], answer: 0, explanation: "Sau normalize, cos(A,B) = A·B → bỏ phép chia tốn kém." },
          { question: "Chunk 50 token có vấn đề gì?", options: ["Quá dài", "Quá ngắn, mất ngữ cảnh, top-k rời rạc", "Không có vấn đề", "Tốn RAM"], answer: 1, explanation: "Chunk quá nhỏ → embedding thiếu ngữ cảnh và LLM phải ghép nhiều mảnh." },
          { question: "Khi nào nên dùng hybrid search?", options: ["Khi có tên riêng, mã sản phẩm, từ hiếm", "Khi corpus < 100 doc", "Không bao giờ", "Chỉ với tiếng Anh"], answer: 0, explanation: "BM25 bắt từ chính xác mà embedding hay miss." },
          { question: "HNSW chậm hơn Flat về tốc độ truy vấn?", options: ["Đúng", "Sai — HNSW nhanh hơn nhiều ở quy mô lớn với recall ~98%", "Bằng nhau", "Tùy GPU"], answer: 1, explanation: "HNSW là đồ thị nhiều tầng, log-time tìm kiếm." },
          { question: "Vì sao phải lưu model_version cùng vector?", options: ["Đẹp metadata", "Khi đổi encoder phải biết chunk nào cần re-embed", "Yêu cầu RLS", "Không cần"], answer: 1, explanation: "Vector của model khác nhau không cùng không gian — không so sánh được." },
        ],
      },
      {
        id: "nlp-adv-4",
        title: "Multilingual NLP Production — pipeline thật cho EN / VI / FI / ZH",
        titleEn: "Multilingual NLP in Production — A Real Pipeline for EN / VI / FI / ZH",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 🌐 Đa ngôn ngữ không phải "dịch rồi xử lý EN"

Pipeline "dịch về EN rồi NLP" mất dấu thanh (VI), mất hậu tố (FI), mất phân từ (ZH). Sản xuất nghiêm túc cần xử lý **tại ngôn ngữ gốc**.

## 2. 🧱 Kiến trúc tham chiếu (HaiEduTech style)

\`\`\`
   ┌────────────────────────────────────────────────────────────┐
   │  REQUEST (text bất kỳ ngôn ngữ)                            │
   └───────────────┬────────────────────────────────────────────┘
                   ▼
            ┌──────────────┐
            │ Lang Detect  │  (fastText lid.176 — 99% accuracy)
            └──────┬───────┘
                   ▼
        ┌───────────────────────┐
        │  Normalize per-lang   │  VI: NFC + tone; FI: lowercase ä/ö;
        │                       │  ZH: HanziConv giản↔phồn; EN: contractions
        └──────┬────────────────┘
               ▼
        ┌────────────────────────────────────────────┐
        │  Tokenize / segment per-lang               │
        │  EN: spaCy   VI: underthesea   FI: voikko  │
        │  ZH: jieba / pkuseg                        │
        └──────┬─────────────────────────────────────┘
               ▼
   ┌─────────────────────────────────────────────────┐
   │  Multilingual Encoder (XLM-R / mE5 / LaBSE)     │
   │  → embedding 768d trong CÙNG không gian         │
   └──────┬──────────────────────────────────────────┘
          ▼
   ┌─────────────────────────────────────────────────┐
   │  Task heads: classify / NER / search / grade    │
   └─────────────────────────────────────────────────┘
\`\`\`

## 3. 🔠 Tokenizer hỗn loạn — bảng tham chiếu

| Ngôn ngữ | Đặc thù | Tokenizer khuyên dùng |
|----------|---------|------------------------|
| **EN** | Khoảng trắng tách từ | spaCy, tiktoken |
| **VI** | Từ ghép ("học sinh"), 6 thanh | underthesea, VnCoreNLP |
| **FI** | 15 case, agglutination | voikko + lemmatizer |
| **ZH** | Không khoảng trắng | jieba, pkuseg, HanLP |
| **JA** | 3 hệ chữ + không khoảng trắng | MeCab, SudachiPy |

## 4. 🧠 Encoder đa ngôn ngữ — chọn đúng

| Mô hình | Mạnh ở | Nhược |
|---------|--------|-------|
| **XLM-R** | 100 ngôn ngữ, NER/classify | Embedding semantic chưa tối ưu |
| **mE5-large** | Retrieval đa ngôn ngữ, RAG | Cần GPU để serve |
| **LaBSE** | Bitext mining, song ngữ | Hơi cũ, không tốt nhất 2026 |
| **BGE-M3** | Multilingual + multi-vector + long context (8k) | Mới, cần test kỹ |

## 5. 📏 Đánh giá — không có "BLEU duy nhất" cho mọi task

| Task | Metric khuyên dùng |
|------|--------------------|
| Dịch máy | BLEU + COMET (model-based, sát người) |
| Tóm tắt | ROUGE-L + BERTScore |
| QA / RAG | Exact match + F1 + Faithfulness LLM-judge |
| Classify | macro-F1 (không phải accuracy nếu lệch lớp) |
| Speaking grading | WER + custom rubric (đã dùng trong app) |

## 6. ⚠️ Bẫy production thực chiến

- **Mojibake**: file CSV không UTF-8 → dấu tiếng Việt thành \`?�\`. Luôn ép \`encoding="utf-8"\`.
- **NFC vs NFD**: "ế" có 2 cách biểu diễn → so sánh string fail. Chuẩn hoá NFC toàn pipeline.
- **Mixed-script attack**: "раypal" (chữ Cyrillic) qua mọi filter → cần Unicode confusables detector.
- **Code-switching**: 1 câu trộn VI + EN → lang-detect câu ngắn sai → bỏ qua hoặc dùng segment-level detect.
- **Latency budget**: encoder 768d trên CPU = ~30ms/câu; ≥ 100 req/s cần batch + GPU hoặc quantize INT8.
`,
        theoryEn: `Don't "translate to English first" — you lose Vietnamese tones, Finnish suffixes, Chinese segmentation. A real multilingual pipeline: detect → per-language normalize (NFC, ä/ö, simplified/traditional) → per-language tokenize (spaCy / underthesea / voikko / jieba) → shared multilingual encoder (XLM-R, mE5, BGE-M3) → task heads. Pick metrics per task (COMET for MT, BERTScore for summarization, faithfulness judges for RAG, macro-F1 for imbalanced classify). Watch for mojibake, NFC vs NFD, mixed-script attacks, code-switching, and CPU latency budgets.`,
        code: `# Minimal multilingual normalize + lang-detect-by-script (no external deps)
import unicodedata, re

SCRIPT_HINTS = [
    ("zh", re.compile(r"[\\u4e00-\\u9fff]")),
    ("ja", re.compile(r"[\\u3040-\\u30ff]")),
    ("ko", re.compile(r"[\\uac00-\\ud7af]")),
    ("vi", re.compile(r"[ăâđêôơưĂÂĐÊÔƠƯ]|[áàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]", re.I)),
    ("fi", re.compile(r"[äöÄÖ]")),
]

def normalize(text: str) -> str:
    return unicodedata.normalize("NFC", text).strip()

def detect_lang(text: str) -> str:
    t = normalize(text)
    for code, rx in SCRIPT_HINTS:
        if rx.search(t): return code
    return "en"  # fallback

samples = [
    "Học sinh chăm chỉ là học sinh tốt.",
    "Sinä olet rakas ystäväni.",
    "我喜欢学习中文。",
    "Embeddings power modern NLP.",
]
for s in samples:
    print(f"[{detect_lang(s):>2}] {normalize(s)}")`,
        codeLanguage: "python",
        exercise:
          "Mở rộng detect_lang trả về dict {lang, confidence, mixed_script: bool} — đặt mixed_script=True nếu phát hiện ≥2 script trong cùng câu.",
        exerciseEn:
          "Extend detect_lang to return {lang, confidence, mixed_script: bool} — set mixed_script=True when ≥2 scripts appear in one sentence.",
        quiz: [
          { question: "Vì sao 'dịch về EN rồi NLP' là pipeline yếu?", options: ["Rẻ hơn", "Mất thông tin đặc thù: thanh điệu (VI), hậu tố (FI), phân từ (ZH)", "Vi phạm RLS", "Không có vấn đề"], answer: 1, explanation: "Mỗi ngôn ngữ có hiện tượng riêng — dịch làm mất tín hiệu." },
          { question: "Encoder nào phù hợp cho RAG đa ngôn ngữ context dài 8k?", options: ["BERT-base", "BGE-M3", "Word2Vec", "TF-IDF"], answer: 1, explanation: "BGE-M3 hỗ trợ đa ngôn ngữ, multi-vector và context dài." },
          { question: "Metric tốt nhất để đánh giá faithfulness của RAG là?", options: ["BLEU", "Accuracy", "LLM-judge faithfulness + citation overlap", "Loss"], answer: 2, explanation: "RAG cần đo 'có bịa không' — judge model + kiểm tra trích nguồn." },
          { question: "NFC vs NFD ảnh hưởng?", options: ["Tốc độ mạng", "Cùng ký tự 'ế' có 2 byte-form → so sánh string thất bại nếu không chuẩn hoá", "RAM", "Không ảnh hưởng"], answer: 1, explanation: "Phải NFC toàn pipeline để string equality hoạt động." },
          { question: "Mixed-script attack là?", options: ["Bug font", "Dùng ký tự Cyrillic trông giống Latin để vượt filter", "Spam ASCII", "Lỗi UTF-8"], answer: 1, explanation: "Cần Unicode confusables detector để chặn." },
        ],
      },
    ],
  },
];
