import type { ExtendedProgrammingModule } from "./types";

/**
 * NLP Production & Modern LLMs (2026) - extra lessons that complement
 * nlpLessons.ts and nlpExpansion.ts. Heavy on ASCII diagrams, tables, and
 * visual analogies so the concepts are easy to grasp without external images.
 */
export const nlpProductionModules: ExtendedProgrammingModule[] = [
  {
    id: "nlp-production",
    title: "NLP Production & Modern LLMs (2026)",
    titleEn: "NLP Production & Modern LLMs (2026)",
    icon: "🚀",
    color: "from-cyan-500 to-blue-700",
    description:
      "Đưa NLP từ notebook ra production: RAG, fine-tuning LoRA, đánh giá LLM, đa ngôn ngữ và an toàn.",
    descriptionEn:
      "Take NLP from notebook to production: RAG, LoRA fine-tuning, LLM evaluation, multilingual & safety.",
    course: "nlp",
    lessons: [
      {
        id: "nlp-13",
        title: "RAG - Retrieval-Augmented Generation từ A→Z",
        titleEn: "RAG - Retrieval-Augmented Generation End-to-End",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🧠 Vì sao cần RAG?

LLM (GPT, Gemini, Llama) bị **2 căn bệnh kinh điển**:

| Bệnh | Triệu chứng | Hậu quả |
|------|-------------|---------|
| **Hallucination** | Bịa thông tin nghe rất thuyết phục | Sai sự thật, mất uy tín |
| **Knowledge cutoff** | Không biết tin sau ngày training | Trả lời lỗi thời |

**RAG (Retrieval-Augmented Generation)** chữa cả hai: trước khi trả lời, LLM **đi tra cứu** trong kho tài liệu của bạn (PDF công ty, wiki, database) rồi mới trả lời.

## 2. 🗺️ Sơ đồ kiến trúc RAG

\`\`\`
                 ┌─────────────────────────────┐
   Câu hỏi  ───▶ │ 1. Embed query (vector 768d) │
                 └──────────────┬──────────────┘
                                ▼
                 ┌─────────────────────────────┐
                 │ 2. Vector DB (pgvector,     │
                 │    Pinecone, Chroma)        │
                 │   → top-k đoạn liên quan    │
                 └──────────────┬──────────────┘
                                ▼
                 ┌─────────────────────────────┐
                 │ 3. Prompt =                 │
                 │  "Dùng đoạn sau để trả lời" │
                 │  + top-k chunks + question  │
                 └──────────────┬──────────────┘
                                ▼
                 ┌─────────────────────────────┐
                 │ 4. LLM (GPT-5, Gemini 2.5)  │
                 │   sinh câu trả lời + cite   │
                 └──────────────┬──────────────┘
                                ▼
                          ✅ Câu trả lời
\`\`\`

## 3. ✂️ Chunking - chia tài liệu thành miếng

| Chiến lược | Cách làm | Khi dùng |
|------------|----------|----------|
| **Fixed-size** | Cắt mỗi 500 token | Văn bản đồng đều |
| **Sentence-based** | Cắt theo câu, gom đến 500 token | Bài viết tự nhiên |
| **Semantic** | Cắt khi chủ đề đổi (embedding distance) | Tài liệu dài, đa chủ đề |
| **Recursive** | Đoạn → câu → từ (LangChain) | Mặc định an toàn |

**Overlap 10–20%** giữa các chunk để không cắt mất ngữ cảnh.

## 4. 📐 Vector similarity - tại sao dùng cosine?

\`\`\`
   query  ●─────────►
            \\  góc nhỏ → cosine ≈ 1 → liên quan
             \\
              ●  doc A   (giống nhất)
              ●  doc B   (góc lớn → cosine thấp → bỏ)
\`\`\`

Cosine bỏ qua **độ dài** vector, chỉ quan tâm **hướng** → tốt khi văn bản dài ngắn khác nhau.

## 5. ⚠️ Bẫy production hay gặp

- **Chunk quá lớn** → nhồi nhét, LLM bỏ qua giữa (lost-in-the-middle).
- **Không re-rank** top-50 → top-5 → chất lượng kém.
- **Không cite nguồn** → người dùng không kiểm tra được.
- **Quên multilingual embedding** → tiếng Việt query không match doc tiếng Anh.
`,
        theoryEn: `RAG fixes hallucination & knowledge cutoff by retrieving relevant chunks from a vector DB and stuffing them into the prompt. Pipeline: embed → vector search → augment prompt → LLM → cite.

Chunking strategies: fixed-size, sentence-based, semantic, recursive (10–20% overlap). Cosine similarity wins because it ignores vector length. Common production traps: chunks too big (lost-in-the-middle), no re-ranking, no citations, monolingual embeddings.`,
        code: `# Mini-RAG không cần thư viện ngoài (toy demo)
import numpy as np

docs = [
    "HaiEduTech dùng SM-2 cho spaced repetition.",
    "Bài thi YKI A2 có 4 kỹ năng: nghe, nói, đọc, viết.",
    "IELTS Writing Task 2 yêu cầu tối thiểu 250 từ.",
]

def fake_embed(text: str) -> np.ndarray:
    # demo: vector từ tần suất chữ cái - thật thì dùng OpenAI / Gemini embedding
    v = np.zeros(26)
    for c in text.lower():
        if "a" <= c <= "z":
            v[ord(c) - ord("a")] += 1
    n = np.linalg.norm(v)
    return v / n if n else v

def cosine(a, b):
    return float(np.dot(a, b))

doc_vecs = [fake_embed(d) for d in docs]

def rag(query: str, k: int = 2) -> str:
    q = fake_embed(query)
    scored = sorted(
        zip(docs, doc_vecs),
        key=lambda x: cosine(q, x[1]),
        reverse=True,
    )[:k]
    context = "\\n".join(f"- {d}" for d, _ in scored)
    return f"PROMPT:\\nDùng các đoạn sau để trả lời:\\n{context}\\n\\nCâu hỏi: {query}"

print(rag("YKI cần thi mấy kỹ năng?"))`,
        codeLanguage: "python",
        exercise:
          "Thêm hàm cite() trả về danh sách (doc_index, score) cho top-k để hiển thị cite trong UI.",
        exerciseEn:
          "Add cite() returning (doc_index, score) for the top-k chunks so the UI can show citations.",
        quiz: [
          { question: "RAG chủ yếu giải quyết vấn đề nào?", options: ["LLM chậm", "Hallucination & knowledge cutoff", "Token đắt", "UI xấu"], answer: 1, explanation: "RAG đưa context tươi vào prompt nên LLM không phải bịa và không bị giới hạn cutoff." },
          { question: "Vì sao thường dùng cosine similarity?", options: ["Tính nhanh hơn dot product", "Bỏ qua độ dài, chỉ so hướng vector", "Chính xác tuyệt đối", "Không cần normalize"], answer: 1, explanation: "Cosine = dot product của 2 vector đã normalize → so HƯỚNG, không bị thiên vị bởi chunk dài hay ngắn." },
          { question: "Overlap giữa các chunk dùng để?", options: ["Tiết kiệm RAM", "Tránh cắt mất ngữ cảnh quanh đường biên", "Tăng tốc embedding", "Làm đẹp DB"], answer: 1, explanation: "10–20% overlap giúp câu nằm vắt qua biên vẫn còn nguyên trong ít nhất 1 chunk." },
          { question: "Lost-in-the-middle là hiện tượng?", options: ["Embedding bị lệch", "LLM bỏ qua thông tin ở giữa prompt dài", "Vector DB mất chunk", "User mất kết nối"], answer: 1, explanation: "LLM chú ý nhiều đến đầu và cuối context → chunk ở giữa dễ bị bỏ qua. Re-rank và prompt ngắn giúp khắc phục." },
          { question: "Bước nào KHÔNG thuộc pipeline RAG?", options: ["Embed query", "Vector search", "Backprop", "Augment prompt"], answer: 2, explanation: "Backprop chỉ xuất hiện khi fine-tune; RAG là inference-only." },
        ],
      },
      {
        id: "nlp-14",
        title: "Fine-tuning LLM với LoRA & PEFT",
        titleEn: "Fine-tuning LLMs with LoRA & PEFT",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🤔 Khi nào fine-tune, khi nào RAG?

| Tình huống | Chọn gì | Vì sao |
|------------|---------|--------|
| Cần kiến thức mới (PDF công ty) | **RAG** | Rẻ, cập nhật nhanh |
| Cần **giọng văn** riêng (brand) | **Fine-tune** | Style ngấm vào weight |
| Cần **format JSON** cố định | **Fine-tune (LoRA)** | Tin cậy hơn prompt |
| Cần kỹ năng mới (chấm essay) | Cả hai | RAG cho dữ liệu, FT cho rubric |

## 2. 🪶 LoRA là gì? (Low-Rank Adaptation)

LLM có **70B tham số** - fine-tune full = đốt tiền. **LoRA** chỉ huấn luyện **2 ma trận nhỏ A, B** chèn cạnh layer gốc:

\`\`\`
            ┌─────────────┐
   x ──────▶│ W (frozen)  │──────┐
            │ 70B params  │      ▼
            └─────────────┘     (+) ─▶ y
                                 ▲
            ┌──────┐   ┌──────┐  │
   x ──────▶│  A   │──▶│  B   │──┘    (chỉ A,B được train)
            │ d×r  │   │ r×d  │
            └──────┘   └──────┘
                  rank r = 8 hoặc 16
\`\`\`

→ Chỉ ~0.1% tham số được học, tiết kiệm **100×–1000×** chi phí GPU.

## 3. 📦 Quy trình PEFT thực tế (HuggingFace)

1. Chuẩn bị dataset \`{"instruction", "input", "output"}\` (≥ 500 mẫu chất lượng).
2. Tải base model + tokenizer.
3. Khởi tạo \`LoraConfig(r=8, alpha=16, target_modules=["q_proj","v_proj"])\`.
4. \`Trainer.train()\` trên 1 GPU (24GB là đủ cho model 7B với QLoRA).
5. Lưu **adapter** ~50MB, merge khi deploy.

## 4. ⚖️ Đánh giá sau fine-tune

- **Held-out eval**: 10% dataset không cho thấy lúc train.
- **Win-rate vs base**: con người (hoặc GPT-judge) chọn câu trả lời nào hay hơn.
- **Regression check**: bài test cũ vẫn pass - tránh "catastrophic forgetting".

## 5. ⚠️ Bẫy

- Dataset bẩn → model học cách... sai.
- Học quá lâu → overfit, mất khả năng generalize.
- Quên evaluation set → không biết tốt hơn hay tệ hơn.
`,
        theoryEn: `Decide RAG vs fine-tuning by need: new facts → RAG; new style/format/skill → fine-tune.

LoRA freezes the base model and trains tiny rank-r matrices (A,B) inserted beside each linear layer - only ~0.1% of params, 100–1000× cheaper. Pipeline (PEFT): curate ≥500 instruction/output samples → load base → LoraConfig(r=8) → Trainer → save 50MB adapter. Evaluate with held-out set, win-rate vs base, and regression checks to avoid catastrophic forgetting.`,
        code: `# Skeleton fine-tune LoRA với HuggingFace PEFT
# (chỉ minh hoạ - chạy thật cần GPU)
from typing import List, Dict

def build_dataset() -> List[Dict]:
    return [
        {"instruction": "Dịch sang tiếng Anh", "input": "Tôi yêu Phần Lan", "output": "I love Finland"},
        {"instruction": "Tóm tắt 1 câu",      "input": "RAG kết hợp retriever và generator...", "output": "RAG = retriever + LLM."},
    ]

def lora_config():
    return {
        "r": 8,
        "alpha": 16,
        "target_modules": ["q_proj", "v_proj"],
        "dropout": 0.05,
        "task_type": "CAUSAL_LM",
    }

def estimate_cost(num_samples: int, epochs: int = 3, gpu_per_hour: float = 0.6) -> float:
    # rất thô: 1k samples ≈ 0.5h trên A100
    hours = (num_samples / 1000) * 0.5 * epochs
    return round(hours * gpu_per_hour, 2)

ds = build_dataset()
print("samples:", len(ds))
print("LoRA  :", lora_config())
print(f"~Chi phí 5,000 samples x 3 epoch = {estimate_cost(5000)} USD")`,
        codeLanguage: "python",
        exercise:
          "Viết hàm check_dataset(ds) cảnh báo nếu < 200 mẫu, hoặc output trống, hoặc trùng lặp >20%.",
        exerciseEn:
          "Write check_dataset(ds) that warns if <200 samples, empty outputs, or >20% duplicates.",
        quiz: [
          { question: "LoRA huấn luyện phần nào của model?", options: ["Toàn bộ weight", "Chỉ 2 ma trận A, B rank thấp chèn vào", "Chỉ embedding", "Chỉ output layer"], answer: 1, explanation: "Freeze W, train A (d×r) và B (r×d) với r nhỏ → tiết kiệm cực lớn." },
          { question: "Khi nào chọn RAG thay vì fine-tune?", options: ["Cần thêm kiến thức mới, cập nhật thường xuyên", "Cần đổi giọng văn", "Cần format JSON tuyệt đối", "Cả 3"], answer: 0, explanation: "Kiến thức mới/đổi nhanh → RAG. Style/format ổn định → fine-tune." },
          { question: "Catastrophic forgetting là gì?", options: ["Server quên dữ liệu", "Model mất kỹ năng cũ sau khi học kỹ năng mới", "Tokenizer hỏng", "GPU hết RAM"], answer: 1, explanation: "Fine-tune quá đà làm trôi kiến thức tiền-training - nên giữ regression test." },
          { question: "Vì sao LoRA tiết kiệm GPU?", options: ["Tắt forward pass", "Chỉ ~0.1% param cần gradient nên optimizer state nhỏ", "Dùng CPU", "Không cần dataset"], answer: 1, explanation: "Memory cho optimizer (Adam) ~ số param trainable → giảm 100×–1000×." },
          { question: "Win-rate vs base nghĩa là?", options: ["Tỉ lệ trận thắng game", "% lần con người/GPT-judge chọn output của model mới hay hơn base", "Tốc độ inference", "Số token sinh ra"], answer: 1, explanation: "So sánh trực tiếp output để đo cải thiện thực." },
        ],
      },
      {
        id: "nlp-15",
        title: "Đánh giá & An toàn LLM (Evals, Guardrails)",
        titleEn: "LLM Evaluation & Safety (Evals, Guardrails)",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 📏 Không đo → không cải thiện

LLM không có \`accuracy\` duy nhất như classifier. Phải đo **nhiều chiều**:

| Chiều | Cách đo | Công cụ |
|-------|---------|---------|
| **Đúng đáp án** | Exact match, F1 | SQuAD, HellaSwag |
| **Chất lượng tự do** | LLM-as-judge | GPT-4 judge, MT-Bench |
| **Trung thực** | Hallucination rate | TruthfulQA, FActScore |
| **An toàn** | % chặn được prompt độc | RealToxicityPrompts |
| **Tốc độ/giá** | Tokens/s, $/1k token | Benchmark riêng |

## 2. 🧑‍⚖️ LLM-as-Judge (mô hình chấm mô hình)

\`\`\`
   ┌────────────┐      ┌────────────┐      ┌────────────┐
   │  Model A   │      │   Judge    │      │  Model B   │
   │  reply  ──▶│   ──▶│ (GPT-5)   ◀── ── │  reply     │
   └────────────┘      │ "Cái nào   │      └────────────┘
                       │  hay hơn?" │
                       └─────┬──────┘
                             ▼
                  A wins / B wins / tie
\`\`\`

**Mẹo**: đảo vị trí A/B để khử position bias; cho rubric rõ ràng.

## 3. 🛡️ Guardrails - 4 lớp bảo vệ

\`\`\`
   User ▶ ┌──────────────┐ ▶ ┌─────────┐ ▶ ┌──────────────┐ ▶ User
          │ 1. Input     │   │  LLM    │   │ 3. Output    │
          │   filter     │   │         │   │   filter     │
          │ (PII, jailb.)│   │         │   │ (toxic, PII) │
          └──────────────┘   └─────────┘   └──────────────┘
                  ▲                                  │
                  └──── 4. Log & monitor ◀──────────┘
            2. System prompt ràng buộc vai trò
\`\`\`

- **Lớp 1**: chặn PII (số CMND, thẻ tín dụng) và jailbreak nổi tiếng.
- **Lớp 2**: system prompt ngắn, rõ vai trò + "từ chối nếu ngoài phạm vi".
- **Lớp 3**: regex/classifier kiểm output trước khi gửi user.
- **Lớp 4**: log full request/response để audit.

## 4. 🎯 Quy trình eval khi ra phiên bản mới

1. **Golden set** 100–500 prompt được chuyên gia chấm sẵn.
2. Chạy A/B với version cũ → tính win-rate.
3. Regression: bài cũ vẫn pass ≥ 95%.
4. Safety: 0% lọt prompt cấm trong test set.
5. Chỉ deploy khi cả 3 điều kiện thoả.

## 5. ⚠️ Bẫy

- **Goodhart's Law**: tối ưu metric → hỏng chất lượng thật. Phải có human spot-check.
- **Judge bias**: GPT-4 thiên vị câu dài → cần rubric chống.
- **Train-test leak**: prompt eval lọt vào training → điểm ảo.
`,
        theoryEn: `LLMs need multi-axis evaluation: accuracy (exact/F1), quality (LLM-as-judge), truthfulness (TruthfulQA), safety (toxicity), and speed/cost.

LLM-as-judge: a stronger LLM ranks A vs B with a rubric - swap positions to kill position bias. Guardrails = 4 layers: input filter (PII, jailbreak) → system prompt → output filter → logs/monitor.

Release checklist: golden set 100–500 prompts, A/B win-rate vs old, regression ≥95%, 0 safety leaks. Watch out for Goodhart's law, judge bias toward long answers, and train-test leakage.`,
        code: `# LLM-as-judge tối giản
from dataclasses import dataclass
import random

@dataclass
class Reply:
    model: str
    text: str

def fake_judge(q: str, a: Reply, b: Reply) -> str:
    # Thật: gọi GPT-5 với rubric. Demo: ưu tiên câu trả lời có "vì"
    score_a = ("vì" in a.text.lower()) + len(a.text) / 200
    score_b = ("vì" in b.text.lower()) + len(b.text) / 200
    if abs(score_a - score_b) < 0.05:
        return "tie"
    return a.model if score_a > score_b else b.model

questions = [
    "Vì sao bầu trời màu xanh?",
    "Spaced repetition là gì?",
]
results = {"A": 0, "B": 0, "tie": 0}
for q in questions:
    a = Reply("A", "Vì ánh sáng xanh tán xạ mạnh trong khí quyển.")
    b = Reply("B", "Tại vì xanh.")
    # đảo vị trí để khử position bias
    pairs = [(a, b), (b, a)]
    random.shuffle(pairs)
    for x, y in pairs:
        winner = fake_judge(q, x, y)
        if winner == "tie": results["tie"] += 1
        else: results[winner] += 1

print(results)`,
        codeLanguage: "python",
        exercise:
          "Thêm guardrail chặn input chứa số 16 chữ số (thẻ tín dụng) - trả lời 'Tôi không xử lý dữ liệu nhạy cảm.'",
        exerciseEn:
          "Add a guardrail blocking inputs that contain a 16-digit number (credit card) - reply 'I cannot process sensitive data.'",
        quiz: [
          { question: "Vì sao phải đảo vị trí A/B khi dùng LLM-as-judge?", options: ["Cho vui", "Khử position bias", "Tiết kiệm token", "Tăng tốc"], answer: 1, explanation: "Judge có thể thiên vị vị trí đầu/cuối - đảo và lấy trung bình." },
          { question: "Guardrail lớp 1 (input filter) chủ yếu để?", options: ["Tăng tốc LLM", "Chặn PII và jailbreak nổi tiếng trước khi vào model", "Đẹp UI", "Giảm $"], answer: 1, explanation: "Lớp đầu chặn dữ liệu nhạy cảm và prompt nguy hiểm." },
          { question: "Goodhart's Law cảnh báo điều gì?", options: ["Code chậm dần", "Khi metric trở thành mục tiêu, nó không còn là metric tốt", "GPU nóng", "LLM hết token"], answer: 1, explanation: "Tối ưu thẳng vào metric dễ làm hỏng chất lượng thật → cần human spot-check." },
          { question: "Regression check trong release LLM nghĩa là?", options: ["Test ML regression", "Bài test cũ vẫn pass sau khi ra version mới", "Hồi quy tuyến tính", "Test thoái lui người dùng"], answer: 1, explanation: "Đảm bảo version mới không phá kỹ năng cũ." },
          { question: "Hallucination rate đo bằng benchmark nào tiêu biểu?", options: ["MMLU", "TruthfulQA / FActScore", "HumanEval", "GSM8K"], answer: 1, explanation: "TruthfulQA & FActScore tập trung vào trung thực sự thật." },
        ],
      },
    ],
  },
];
