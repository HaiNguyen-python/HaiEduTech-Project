/**
 * @file nlpQuizI18n.ts
 * @description English translations for NLP Knowledge Check items.
 *   Keyed by the Vietnamese question string. The ProgrammingLesson renderer
 *   falls back to the VI text when a key is missing, so partial coverage is safe.
 */
export interface QuizEn {
  q: string;
  opts: string[];
  exp: string;
}

export const nlpQuizEn: Record<string, QuizEn> = {
  // --- NLP Production: RAG ---
  "RAG chủ yếu giải quyết vấn đề nào?": {
    q: "What problem does RAG primarily solve?",
    opts: ["Slow LLM responses", "Hallucination & knowledge cutoff", "Expensive tokens", "Poor UI design"],
    exp: "RAG injects fresh, relevant context into the prompt so the LLM does not have to guess or rely only on its training cutoff.",
  },
  "Vì sao thường dùng cosine similarity?": {
    q: "Why is cosine similarity commonly used?",
    opts: ["It is faster than dot product", "It ignores length and compares vector direction", "It is perfectly accurate", "It does not need normalization"],
    exp: "Cosine compares the direction of normalized vectors, reducing bias from longer or shorter chunks.",
  },
  "Overlap giữa các chunk dùng để?": {
    q: "What is overlap between chunks used for?",
    opts: ["Saving RAM", "Avoiding context loss around chunk boundaries", "Speeding up embeddings", "Beautifying the database"],
    exp: "A 10–20% overlap keeps sentences that cross boundaries intact in at least one chunk.",
  },
  "Lost-in-the-middle là hiện tượng?": {
    q: "What is the lost-in-the-middle effect?",
    opts: ["Embeddings drifting", "An LLM ignoring information in the middle of a long prompt", "A vector DB losing chunks", "A user disconnecting"],
    exp: "LLMs tend to attend more to the beginning and end of long contexts; re-ranking and shorter prompts help.",
  },
  "Bước nào KHÔNG thuộc pipeline RAG?": {
    q: "Which step is NOT part of a RAG pipeline?",
    opts: ["Embed query", "Vector search", "Backprop", "Augment prompt"],
    exp: "Backpropagation appears during training/fine-tuning; RAG is an inference-time pattern.",
  },

  // --- NLP Production: LoRA & PEFT ---
  "LoRA huấn luyện phần nào của model?": {
    q: "Which part of the model does LoRA train?",
    opts: ["All weights", "Only low-rank A and B matrices inserted into layers", "Only embeddings", "Only the output layer"],
    exp: "LoRA freezes the base weights and trains small rank-r adapters, which greatly reduces compute.",
  },
  "Khi nào chọn RAG thay vì fine-tune?": {
    q: "When should you choose RAG instead of fine-tuning?",
    opts: ["When you need new or frequently updated knowledge", "When you need a new writing style", "When you need strict JSON format", "All three"],
    exp: "New or fast-changing knowledge belongs in retrieval; stable style or format shifts may fit fine-tuning.",
  },
  "Catastrophic forgetting là gì?": {
    q: "What is catastrophic forgetting?",
    opts: ["A server forgetting data", "A model losing old skills after learning a new one", "A broken tokenizer", "GPU out-of-memory"],
    exp: "Over-aggressive fine-tuning can damage pre-existing capabilities, so regression tests are required.",
  },
  "Vì sao LoRA tiết kiệm GPU?": {
    q: "Why does LoRA save GPU resources?",
    opts: ["It disables the forward pass", "Only ~0.1% of parameters need gradients, so optimizer state is tiny", "It uses CPU only", "It does not need data"],
    exp: "Optimizer memory scales with trainable parameters; LoRA trains far fewer parameters than full fine-tuning.",
  },
  "Win-rate vs base nghĩa là?": {
    q: "What does win-rate vs base mean?",
    opts: ["Game win rate", "The percentage of comparisons where humans or an LLM judge prefer the new model over the base", "Inference speed", "Number of generated tokens"],
    exp: "Side-by-side preference comparisons reveal whether the tuned model is actually better.",
  },

  // --- NLP Production: Evaluation & Safety ---
  "Vì sao phải đảo vị trí A/B khi dùng LLM-as-judge?": {
    q: "Why swap A/B order when using an LLM-as-judge?",
    opts: ["For fun", "To reduce position bias", "To save tokens", "To increase speed"],
    exp: "Judges may prefer the first or last answer; swapping order and averaging reduces that bias.",
  },
  "Guardrail lớp 1 (input filter) chủ yếu để?": {
    q: "What is layer-1 guardrail input filtering mainly for?",
    opts: ["Speeding up the LLM", "Blocking PII and known jailbreaks before they reach the model", "Making the UI prettier", "Reducing cost"],
    exp: "The first layer blocks sensitive data and risky prompts before model execution.",
  },
  "Goodhart's Law cảnh báo điều gì?": {
    q: "What does Goodhart's Law warn about?",
    opts: ["Code slowing down over time", "When a metric becomes the target, it stops being a good metric", "GPU overheating", "LLMs running out of tokens"],
    exp: "Optimizing directly for a metric can damage real quality, so human spot-checks still matter.",
  },
  "Regression check trong release LLM nghĩa là?": {
    q: "What does a regression check mean in an LLM release?",
    opts: ["Testing ML regression", "Ensuring old tests still pass after the new version ships", "Linear regression", "User churn testing"],
    exp: "Regression checks make sure the new version does not break previously working skills.",
  },
  "Hallucination rate đo bằng benchmark nào tiêu biểu?": {
    q: "Which benchmark is commonly used to measure hallucination/truthfulness?",
    opts: ["MMLU", "TruthfulQA / FActScore", "HumanEval", "GSM8K"],
    exp: "TruthfulQA and FActScore focus on factuality and grounded truthfulness.",
  },

  // --- Lesson 1: Transformer foundations ---
  "Vì sao phải chia cho √d_k trong attention?": {
    q: "Why do we divide by √d_k inside attention?",
    opts: [
      "To make the code shorter",
      "To keep softmax variance stable and avoid vanishing gradients",
      "For ethical reasons",
      "It is not actually needed",
    ],
    exp: "Without scaling, large dot products saturate softmax and gradients collapse to ~0.",
  },
  "Positional encoding tồn tại để?": {
    q: "What is positional encoding for?",
    opts: [
      "To add more parameters",
      "To inject token order into an otherwise permutation-invariant model",
      "Data security",
      "GPU speed-up",
    ],
    exp: "Self-attention is order-agnostic; positional encoding supplies positional information.",
  },
  "Khi cần embedding cho semantic search, nên dùng họ nào?": {
    q: "Which family should you pick for semantic-search embeddings?",
    opts: ["Decoder-only", "Encoder-only such as BERT/E5", "RNN", "Markov chain"],
    exp: "Bidirectional encoders produce stronger semantic embeddings than one-way decoders.",
  },
  "Chinchilla scaling law nói gì?": {
    q: "What does the Chinchilla scaling law state?",
    opts: [
      "More parameters is always better",
      "Parameters and training tokens should grow proportionally to avoid wasting compute",
      "Unrelated to NLP",
      "Only applies to machine translation",
    ],
    exp: "DeepMind 2022 - many large models were under-trained because they lacked tokens.",
  },
  "Mô hình nào dưới đây là encoder-decoder?": {
    q: "Which of the following is an encoder-decoder model?",
    opts: ["BERT", "GPT-3", "T5", "LLaMA"],
    exp: "T5/BART/mT5 are encoder-decoder, ideal for seq2seq like translation and summarisation.",
  },

  // --- Lesson 2: Prompt engineering ---
  "Chain-of-Thought phù hợp nhất khi?": {
    q: "Chain-of-Thought is most useful when…",
    opts: [
      "Short translation tasks",
      "Problems requiring multi-step reasoning (math, logic)",
      "Writing poetry",
      "Binary classification",
    ],
    exp: "CoT helps the LLM externalise reasoning steps, reducing errors on logical tasks.",
  },
  "Cách nào chống prompt injection hiệu quả nhất?": {
    q: "What best defends against prompt injection?",
    opts: [
      "Trust the user",
      "Separate system/user, keyword-filter, validate output, sandbox execution",
      "Write a longer prompt",
      "Increase temperature",
    ],
    exp: "Defense-in-depth: layer separation + sanitisation + validation.",
  },
  "Vì sao kèm 1 ví dụ JSON mẫu lại tăng tỉ lệ parse-correct?": {
    q: "Why does including a sample JSON example improve parse-correct rates?",
    opts: [
      "The LLM understands the schema better from a concrete example",
      "It increases cost",
      "Due to RNG",
      "No reason",
    ],
    exp: "In-context learning: a concrete example shapes the output distribution more strongly than a description.",
  },
  "Anti-pattern nào dưới đây nên TRÁNH?": {
    q: "Which anti-pattern should you AVOID?",
    opts: [
      "Measuring prompts against a fixed eval set",
      "Saying 'be very accurate' without concrete constraints",
      "Providing a clear JSON schema",
      "Few-shot with hard cases included",
    ],
    exp: "Vague advice doesn't shift the output distribution.",
  },
  "ReAct kết hợp gì?": {
    q: "ReAct combines what?",
    opts: [
      "Reason + Action (tool calling)",
      "React framework + JS",
      "Recall + Action",
      "Random + Act",
    ],
    exp: "Interleaves Thought → Action (tool) → Observation, especially useful for agents.",
  },

  // --- Lesson 3: Embeddings & vector search ---
  "Vì sao cần normalize vector trước khi dùng cosine?": {
    q: "Why normalise vectors before using cosine similarity?",
    opts: [
      "So dot product = cosine, which is faster",
      "To make vectors look nicer",
      "Hardware requirement",
      "Not necessary",
    ],
    exp: "After normalisation, cos(A,B) = A·B - the expensive division is gone.",
  },
  "Chunk 50 token có vấn đề gì?": {
    q: "What's wrong with a 50-token chunk?",
    opts: [
      "Too long",
      "Too short - context is lost, top-k retrieval is fragmented",
      "No problem",
      "Wastes RAM",
    ],
    exp: "Tiny chunks lack context and force the LLM to stitch many fragments together.",
  },
  "Khi nào nên dùng hybrid search?": {
    q: "When should you use hybrid search?",
    opts: [
      "For proper nouns, product codes and rare words",
      "When the corpus has < 100 docs",
      "Never",
      "Only for English",
    ],
    exp: "BM25 catches exact terms that embeddings often miss.",
  },
  "HNSW chậm hơn Flat về tốc độ truy vấn?": {
    q: "Is HNSW slower than Flat for query speed?",
    opts: [
      "True",
      "False - HNSW is much faster at scale with ~98% recall",
      "Same",
      "Depends on GPU",
    ],
    exp: "HNSW is a hierarchical graph with log-time search.",
  },
  "Vì sao phải lưu model_version cùng vector?": {
    q: "Why store model_version alongside each vector?",
    opts: [
      "Pretty metadata",
      "When the encoder changes you must know which chunks need re-embedding",
      "RLS requirement",
      "Not needed",
    ],
    exp: "Vectors from different models live in different spaces and cannot be compared.",
  },

  // --- Lesson 4: Multilingual NLP ---
  "Vì sao 'dịch về EN rồi NLP' là pipeline yếu?": {
    q: "Why is 'translate to EN then run NLP' a weak pipeline?",
    opts: [
      "Cheaper",
      "It loses language-specific signal: tones (VI), suffixes (FI), segmentation (ZH)",
      "RLS violation",
      "No issue",
    ],
    exp: "Each language has unique phenomena - translation discards the signal.",
  },
  "Encoder nào phù hợp cho RAG đa ngôn ngữ context dài 8k?": {
    q: "Which encoder fits multilingual RAG with an 8k context?",
    opts: ["BERT-base", "BGE-M3", "Word2Vec", "TF-IDF"],
    exp: "BGE-M3 supports multilingual, multi-vector and long context.",
  },
  "Metric tốt nhất để đánh giá faithfulness của RAG là?": {
    q: "Best metric to evaluate RAG faithfulness?",
    opts: ["BLEU", "Accuracy", "LLM-judge faithfulness + citation overlap", "Loss"],
    exp: "RAG must measure 'is this hallucinated?' - judge model + citation check.",
  },
  "NFC vs NFD ảnh hưởng?": {
    q: "What's the impact of NFC vs NFD?",
    opts: [
      "Network speed",
      "The same character 'ế' has two byte-forms - string equality fails without normalisation",
      "RAM",
      "No impact",
    ],
    exp: "Normalise the whole pipeline to NFC so string equality works.",
  },
  "Mixed-script attack là?": {
    q: "What is a mixed-script attack?",
    opts: [
      "Font bug",
      "Using Cyrillic characters that look like Latin to bypass filters",
      "ASCII spam",
      "UTF-8 error",
    ],
    exp: "Use a Unicode confusables detector to block it.",
  },

  // --- Lesson 5: Evaluation ---
  "Vì sao BLEU phạt oan câu paraphrase đúng nghĩa?": {
    q: "Why does BLEU unfairly punish a correct paraphrase?",
    opts: [
      "BLEU measures n-gram overlap, not meaning",
      "BLEU is slow",
      "BLEU is language-biased",
      "No problem",
    ],
    exp: "BLEU only counts overlapping tokens - same meaning with different words scores 0.",
  },
  "Faithfulness đo gì?": {
    q: "What does faithfulness measure?",
    opts: [
      "Whether the sentence is fluent",
      "Whether the answer is supported by the source (no hallucination)",
      "Tokens per second",
      "Cost",
    ],
    exp: "Faithfulness = groundedness, different from fluency.",
  },
  "Bẫy 'position bias' của LLM-judge khắc phục bằng?": {
    q: "How do you neutralise the position-bias of an LLM judge?",
    opts: [
      "Change model",
      "Swap A/B order and average the scores",
      "Increase temperature",
      "Drop the judge",
    ],
    exp: "Symmetrising position removes systematic bias.",
  },
  "Nên tách dev/test vì?": {
    q: "Why split dev/test?",
    opts: [
      "Cleaner files",
      "To avoid leakage when tuning on test → over-reported results",
      "Save GPU",
      "Not important",
    ],
    exp: "Tuning on test = overfitting the eval set, hiding true performance.",
  },
  "Khi nào dùng task-specific metric (QWK, WER, EM/F1)?": {
    q: "When should you use task-specific metrics (QWK, WER, EM/F1)?",
    opts: [
      "When there is clear ground-truth and ordinal/exact scale",
      "Always",
      "Never",
      "Only for LLMs",
    ],
    exp: "Every task has a canonical metric - using it correctly avoids reaching for BLEU everywhere.",
  },
};
