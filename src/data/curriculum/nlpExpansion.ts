// NLP Curriculum Expansion - 6 additional advanced lessons that extend the
// 6 core lessons in `nlpLessons.ts`. Together they form a 12-lesson NLP
// pathway from foundations to production AI agents.
//
// Every lesson is authored to render beautifully:
//   - Rich Mermaid diagrams (auto-rendered as SVG by TheorySections)
//   - Comparison tables, callout blocks, code examples
//   - Auto-triggers AI Deep-Dive (with cute infographic illustrations) on
//     first view via the existing programming_theory_cache pipeline.
import type { ExtendedProgrammingModule } from "./types";

export const nlpExpansionModules: ExtendedProgrammingModule[] = [
  {
    id: "nlp-advanced",
    title: "NLP Advanced & Production",
    titleEn: "NLP Advanced & Production",
    icon: "🚀",
    color: "from-fuchsia-500 to-purple-600",
    description: "From research notebook to real product - NER, RAG, speech, vector DBs, and AI agents.",
    descriptionEn: "From research notebook to real product - NER, RAG, speech, vector DBs, and AI agents.",
    course: "nlp",
    lessons: [
      // =====================================================================
      // Lesson 7 - Named Entity Recognition (NER) & Information Extraction
      // =====================================================================
      {
        id: "nlp-7",
        title: "Named Entity Recognition & Information Extraction",
        titleEn: "Named Entity Recognition & Information Extraction",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - NLP Lessons 1-3 (preprocessing, embeddings) and basic spaCy usage.

## 1. What is NER?

**Named Entity Recognition (NER)** is the NLP task of locating and classifying *named things* in text - people, organisations, locations, dates, money, products, lesson titles, anything you care about. It is the **first step** of almost every information-extraction pipeline: search, knowledge graphs, customer-support routing, medical-record mining, resume parsing.

\`\`\`mermaid
flowchart LR
    A[Raw text] --> B[NER model]
    B --> C[Entities]
    C --> D[Knowledge graph]
    C --> E[Search index]
    C --> F[Analytics]
\`\`\`

> 🎯 **Example** - *"Teacher Hai will hold the IELTS Masterclass at HaiEduTech HQ on **Sat 26 April 2026**, tickets cost **350,000 VND**."*
> NER tags: \`Teacher Hai\` = PERSON, \`IELTS Masterclass\` = EVENT, \`HaiEduTech HQ\` = LOCATION, \`Sat 26 April 2026\` = DATE, \`350,000 VND\` = MONEY.

## 2. The standard entity types

| Tag | Meaning | Example |
|---|---|---|
| **PERSON** | Names of people | *Teacher Hai, Ada Lovelace* |
| **ORG** | Organisations, companies, agencies | *HaiEduTech, Cambridge, OpenAI* |
| **LOC / GPE** | Locations, countries, cities | *Helsinki, Vietnam, Hà Nội* |
| **DATE / TIME** | Absolute or relative time | *26 April 2026, ngày mai, last week* |
| **MONEY** | Currency amounts | *$50, 350.000 VND, €100* |
| **PRODUCT** | Tools, devices, software | *iPhone 17, Gemini 2.5* |
| **EVENT** | Named events | *World Cup 2026, Tết Nguyên Đán* |

Custom domains add their own labels: \`COURSE\`, \`SKILL\`, \`SCHOLARSHIP\`, \`LANGUAGE\` - exactly the entities HaiEduTech cares about.

## 3. How NER is trained - the BIO scheme

Token-level classification with **B-I-O** tags ("Beginning / Inside / Outside an entity"):

\`\`\`text
Teacher  Hai  will  attend  IELTS  Masterclass  in  Helsinki  .
B-PER    I-PER O    O       B-EVT  I-EVT        O   B-LOC     O
\`\`\`

A sequence model (BiLSTM or, today, a fine-tuned **BERT/RoBERTa**) reads the sentence and predicts a BIO tag for each token. Decoding stitches consecutive \`B-X\` + \`I-X\` tokens back into one entity.

\`\`\`text
Tokens → Embeddings → BiLSTM or BERT → BIO tag per token → Span decoder → Entity list
\`\`\`

## 4. Three generations of NER

| Era | Approach | Strengths | Weaknesses |
|---|---|---|---|
| **Rule-based** (1990s) | Regex + gazetteers | Transparent, zero training data | Brittle, language-specific |
| **CRF + features** (2000s) | Conditional Random Fields | Statistically robust | Hand-crafted features |
| **BiLSTM-CRF** (2015) | Embeddings + sequence model | Learns features automatically | Needs labelled data |
| **BERT fine-tune** (2019+) | Contextual embeddings + linear head | SOTA, multilingual | Compute-heavy |
| **LLM zero/few-shot** (2024+) | Prompt: *"Extract people, orgs, …"* | Zero training data, any schema | Can hallucinate, slower |

## 5. Multilingual NER traps

> 🇻🇳 **Vietnamese** - *"Hà Nội"* must be detected as **one** entity, not two tokens. Use \`underthesea\` or a fine-tuned XLM-RoBERTa.
>
> 🇫🇮 **Finnish** - *"Helsingissä"* (in Helsinki) → the model must know that the inflected form still refers to the city. A subword tokenizer + multilingual model handles this naturally.
>
> 🇨🇳 **Chinese** - Person names like *"李雷"* have no capital-letter cue. Models rely entirely on context.

## 6. Real-world use case - Auto-tagging student documents

When a student uploads a transcript to **HaiEduTech Student Documents**, an NER pipeline can:

1. Extract \`SCHOOL\`, \`DATE\`, \`GPA\`, \`COURSE_NAME\`.
2. Pre-fill the *student_profiles* form so they don't retype.
3. Surface a *missing field* warning if the document lacks a required entity.
4. Index entities in pgvector so semantic search finds *"all students with a CS degree before 2024"*.

## 7. Information extraction beyond NER

NER is one slice of **Information Extraction (IE)**:

| Task | Question it answers |
|---|---|
| **NER** | What things are mentioned? |
| **Relation extraction** | How are two entities related? (*Hai* - *founded* - *HaiEduTech*) |
| **Event extraction** | What happened, when, who participated? |
| **Coreference resolution** | Does *"he"* refer to *"Teacher Hai"* or *"the student"*? |
| **Slot filling** | Populate a structured template from messy text. |

A modern IE system stacks NER + relation extraction + coref into a single Transformer (e.g., **REBEL**, **DeepKE**) that outputs a knowledge graph in one pass.

## 8. Key Concept

> 🎯 **Key Concept** - NER turns **unstructured text → structured records**. It is the bridge between human writing and SQL/JSON the rest of your stack can query. Modern systems use a fine-tuned multilingual Transformer or a prompted LLM with a JSON schema.`,
        theoryEn: "",
        code: `# Two flavours of NER in one notebook:
# (a) Classical: spaCy pre-trained pipeline (offline, free, fast)
# (b) Modern:    Hugging Face Transformer (multilingual, more accurate)
# pip install spacy transformers torch
# python -m spacy download en_core_web_sm

# ---------- (a) spaCy ----------
import spacy
nlp = spacy.load("en_core_web_sm")
text = (
    "Teacher Hai will host an IELTS Masterclass at HaiEduTech HQ in Hanoi "
    "on Saturday 26 April 2026. Tickets cost 350,000 VND."
)
doc = nlp(text)
print("spaCy entities:")
for ent in doc.ents:
    print(f"  {ent.text:<25} -> {ent.label_}")

# Expected output:
#   Teacher Hai               -> PERSON
#   IELTS Masterclass         -> EVENT (or WORK_OF_ART for older models)
#   HaiEduTech HQ             -> ORG
#   Hanoi                     -> GPE
#   Saturday 26 April 2026    -> DATE
#   350,000 VND               -> MONEY

# ---------- (b) Hugging Face Transformer (multilingual) ----------
from transformers import pipeline
ner = pipeline(
    "ner",
    model="Davlan/xlm-roberta-base-ner-hrl",  # 10 high-resource languages incl. EN, FI, ZH
    aggregation_strategy="simple",            # merge B- + I- tokens automatically
)
multilingual = [
    "Opettaja Hai opettaa Helsingin yliopistossa tammikuussa 2026.",  # Finnish
    "李老师将在上海大学举办NLP讲座。",                                   # Chinese
    "Thầy Hải sẽ giảng dạy tại Đại học Bách Khoa Hà Nội.",            # Vietnamese
]
print("\\nMultilingual entities:")
for s in multilingual:
    ents = ner(s)
    print(f"\\n  {s}")
    for e in ents:
        print(f"    {e['word']:<20} -> {e['entity_group']:<6} (score {e['score']:.2f})")

# ---------- Bonus: zero-shot LLM-style extraction with a JSON schema ----------
# In production you'd POST this to your Lovable AI Gateway edge function:
#   model = "google/gemini-2.5-flash"
#   prompt = "Extract entities as JSON with keys: people, orgs, locations, dates, money."
# The LLM returns a parseable dict - no labelled data required.`,
        codeLanguage: "python",
        exercise: "Run the spaCy block on a paragraph from your **own CV / resume**. Identify any entities the model **misses** or **mis-labels** (e.g. Vietnamese university names, dates in *dd/mm/yyyy*). Suggest two ways to fix it: (1) which model you would swap to, and (2) one rule-based post-processor you could add as a safety net.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does the BIO tag scheme encode?",
            options: [
              "Whether a token is **B**eginning, **I**nside, or **O**utside an entity span",
              "Bayesian Inference Output for each token",
              "The biological gender of the token",
              "Backward-Indexed Order of words",
            ],
            answer: 0,
            explanation: "BIO tagging frames NER as token-level classification. B-PER marks the first token of a person, I-PER continues it, O is non-entity. A decoder stitches contiguous B+I tokens into a single entity span.",
          },
          {
            question: "Why is NER on Chinese harder than on English?",
            options: [
              "Chinese has no nouns",
              "Chinese names lack the capital-letter cue English provides, so the model must rely entirely on context",
              "Chinese is right-to-left",
              "Chinese only has one entity type",
            ],
            answer: 1,
            explanation: "English uses capitalisation as a strong hint that something is a name. Chinese has no capitalisation, so an NER model has to learn purely from surrounding context and character n-grams - which is why a contextual model like BERT is essential.",
          },
          {
            question: "Which 2026 approach lets you do NER on a brand-new entity type without ANY labelled data?",
            options: [
              "Rule-based regex",
              "BiLSTM-CRF",
              "Zero-shot prompting of an LLM with a JSON schema (\"extract products and their prices\")",
              "Hidden Markov Models",
            ],
            answer: 2,
            explanation: "Modern LLMs can be told to return entities matching any schema (people, products, lab-test names, …) without a single training example. Accuracy is lower than a fine-tuned BERT but you get instant coverage of new domains.",
          },
        ],
      },

      // =====================================================================
      // Lesson 8 - Topic Modeling & Clustering
      // =====================================================================
      {
        id: "nlp-8",
        title: "Topic Modeling & Clustering",
        titleEn: "Topic Modeling & Clustering",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - NLP Lesson 3 (TF-IDF, embeddings) and basic scikit-learn.

## 1. What problem does topic modeling solve?

You have **10,000 untagged lesson-feedback messages**. No human will read them all. **Topic modeling** discovers the *latent themes* automatically: maybe 60% complain about audio quality, 25% praise the visuals, 10% ask about pricing. It is **unsupervised** - no labels needed.

\`\`\`mermaid
flowchart LR
    D[10k documents] --> V[Vectorize]
    V --> T[Topic model]
    T --> C1[Topic 1: audio]
    T --> C2[Topic 2: visuals]
    T --> C3[Topic 3: pricing]
\`\`\`

## 2. Two classical approaches

### LDA - Latent Dirichlet Allocation (2003)

LDA assumes every document is a **mixture of topics**, and every topic is a **distribution over words**. The model jointly infers both. Best for *long* documents (news articles, papers).

| Topic | Top words |
|---|---|
| Topic 1 | *teacher, lesson, helpful, clear, explain* |
| Topic 2 | *audio, sound, microphone, hear, quiet* |
| Topic 3 | *price, cost, expensive, refund, payment* |

### NMF - Non-negative Matrix Factorization

Factorises the TF-IDF matrix \`X ≈ W · H\`, where W = document-topic weights, H = topic-word weights. Faster than LDA on small corpora and often produces more interpretable topics.

## 3. The 2024+ approach - embedding + cluster

Pre-trained sentence embeddings + clustering crushes classical methods on **short texts** (tweets, reviews, chat messages):

\`\`\`text
Documents → Sentence embeddings e.g. all-MiniLM → UMAP reduce to 5-D → HDBSCAN density clusters → c-TF-IDF label each cluster
\`\`\`

This is the **BERTopic** recipe (2022). It handles multilingual data, gives you a coherent label per cluster, and runs in seconds on a laptop.

## 4. Hard vs soft clustering

| | Hard clustering | Soft / mixture |
|---|---|---|
| Output | One topic per document | Probability per topic |
| Algorithms | K-Means, HDBSCAN | LDA, Gaussian Mixture |
| When | "Bucket every ticket" | "Show me the dominant 3 themes" |

## 5. Choosing K (number of topics)

The hardest hyperparameter. Tools:

- **Coherence score** (gensim) - semantic agreement of top words. Higher is better.
- **Elbow plot** of inertia (K-Means).
- **HDBSCAN** - picks K automatically based on density, no guessing required.

> ⚠️ **Trap** - Asking for too many topics fragments meaningful clusters; too few collapses everything into "general feedback". Start with √(N/2) and tune from coherence.

## 6. Real-world use case - HaiEduTech feedback dashboard

Inputs: every \`student_activity_log\` row where \`activity_type = 'lesson_feedback'\`.
Pipeline:

1. Embed each feedback with **multilingual-E5** (handles VI + EN + ZH + FI in one model).
2. **UMAP → HDBSCAN** to cluster.
3. **c-TF-IDF** to label each cluster ("audio quality", "pace too fast", …).
4. Push counts to the **Teacher Admin** dashboard with a stacked-bar chart.
5. Trigger an alert when a cluster grows >20% week-over-week.

Teacher Hai sees *exactly* which lesson is generating new complaints - without reading 10k messages.

## 7. Dimensionality reduction is half the magic

| Method | Year | Strength |
|---|---|---|
| **PCA** | 1901 | Linear, fast, interpretable axes |
| **t-SNE** | 2008 | Beautiful 2-D plots, slow, distorts global geometry |
| **UMAP** | 2018 | Fast, preserves both local + global structure - default in 2026 |

For *clustering* always use UMAP **before** the cluster algorithm - high-dim distances are notoriously misleading (the *curse of dimensionality*).

## 8. Key Concept

> 🎯 **Key Concept** - Topic modeling answers *"what is this corpus about?"* without labels. The 2026 stack is **sentence embeddings → UMAP → HDBSCAN → c-TF-IDF labels**. Use LDA only for long classical documents; use BERTopic for everything modern, short, and multilingual.`,
        theoryEn: "",
        code: `# Modern topic modeling with BERTopic - works in any language out of the box.
# pip install bertopic sentence-transformers umap-learn hdbscan
from bertopic import BERTopic
from sentence_transformers import SentenceTransformer

# 1. Toy corpus mixing 3 hidden themes (audio, visuals, pricing)
docs = [
    "The audio was too quiet, I could barely hear Teacher Hai.",
    "Microphone kept cutting out during the IELTS lesson.",
    "Sound quality is poor, please use a better mic.",
    "I love the visual diagrams and the colourful examples!",
    "The slide animations make the concepts so easy to grasp.",
    "Beautiful illustrations, especially in the NLP module.",
    "The course is too expensive for a student budget.",
    "Can you offer a discount or scholarship for the Pro plan?",
    "350,000 VND is steep - are there cheaper options?",
    # multilingual stress test:
    "Ääni oli aivan liian hiljainen tunnilla.",          # Finnish: audio complaint
    "Hình minh họa rất đẹp và dễ hiểu, cảm ơn Thầy Hải!", # Vietnamese: visuals praise
]

# 2. Use a multilingual embedding model so VI/FI/EN cluster correctly
embedder = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# 3. Fit BERTopic
topic_model = BERTopic(
    embedding_model=embedder,
    min_topic_size=2,          # tiny corpus - relax the default
    language="multilingual",
    verbose=False,
)
topics, probs = topic_model.fit_transform(docs)

# 4. Inspect
print("Topic assignments:")
for d, t in zip(docs, topics):
    print(f"  topic={t:>2} | {d[:60]}")

print("\\nTopic representations:")
for tid in set(topics):
    if tid == -1:
        continue  # -1 = noise / outliers from HDBSCAN
    words = topic_model.get_topic(tid)[:5]
    print(f"  Topic {tid}: ", ", ".join(w for w, _ in words))

# Expected: ~3 clusters auto-discovered
# Topic 0 -> audio / quiet / microphone
# Topic 1 -> visuals / diagrams / illustrations
# Topic 2 -> price / discount / expensive
# Notice: the Finnish & Vietnamese docs land in the right English cluster
# because the multilingual embedding model speaks all three languages.`,
        codeLanguage: "python",
        exercise: "Add 3 more documents about a 4th theme (e.g. *\"the chatbot is amazing!\"*). Re-fit BERTopic. Did it discover a new topic, or merge it with an existing cluster? If it merged, propose **two** ways to encourage the model to split (hint: tweak `min_topic_size` or use a different embedding model).",
        exerciseEn: "",
        quiz: [
          {
            question: "Why do we apply UMAP before clustering high-dimensional embeddings?",
            options: [
              "To make the data prettier",
              "To shrink memory usage",
              "Because distances in 100+ dimensions become meaningless (curse of dimensionality), so UMAP gives the cluster algorithm a usable geometry",
              "Because clustering algorithms refuse vectors larger than 50-D",
            ],
            answer: 2,
            explanation: "In hundreds of dimensions, all points become roughly equidistant - clustering breaks. UMAP collapses the embeddings to 5-15 dimensions while preserving both local neighbourhoods and global structure, then HDBSCAN/K-Means can find real clusters.",
          },
          {
            question: "Which scenario favours BERTopic over classical LDA?",
            options: [
              "1000-page legal documents in English",
              "Short multilingual customer reviews (10-30 words each)",
              "A single 100-word essay",
              "Audio recordings",
            ],
            answer: 1,
            explanation: "LDA needs long documents with rich word co-occurrence. Short multilingual texts (tweets, reviews, chat) are exactly where embedding-based BERTopic shines - embeddings capture meaning even from a single sentence.",
          },
          {
            question: "What does HDBSCAN's `-1` cluster label mean?",
            options: [
              "The first cluster",
              "Noise / outlier - points that did not fit any dense cluster",
              "An error",
              "The largest cluster",
            ],
            answer: 1,
            explanation: "HDBSCAN refuses to force ambiguous points into a cluster. They get label -1 and are surfaced as 'noise', which is honest behaviour and prevents fake topics being created from a handful of unrelated docs.",
          },
        ],
      },

      // =====================================================================
      // Lesson 9 - Question Answering, Search & RAG
      // =====================================================================
      {
        id: "nlp-9",
        title: "Question Answering, Semantic Search & RAG",
        titleEn: "Question Answering, Semantic Search & RAG",
        level: 5,
        difficulty: "advanced",
        theory: `> 💡 **Prerequisites** - NLP Lessons 3 & 6 (embeddings, Transformers).

## 1. The big idea - RAG

**RAG** = *Retrieval-Augmented Generation*. An LLM is fluent but knows nothing about *your* private data. RAG fixes that by **fetching relevant snippets** from your knowledge base and pasting them into the prompt right before the LLM answers.

\`\`\`text
User question → Embed query → Vector DB search → Top-k chunks → Prompt with context → LLM → Grounded answer
\`\`\`

> 🎯 **Why it matters** - RAG is how every modern AI assistant (HaiEduTech's *Mr. Hai* chatbot, Notion AI, Perplexity, GitHub Copilot Chat) avoids making up facts about your own documents.

## 2. Three flavours of question answering

| Flavour | Input | Model | Example |
|---|---|---|---|
| **Extractive QA** | Question + context paragraph | BERT-style with start/end head | SQuAD: pick the answer span from the paragraph |
| **Open-domain QA** | Question only | Retriever + reader | "When was Helsinki founded?" → search Wikipedia |
| **Generative QA / RAG** | Question + retrieved chunks | LLM | ChatGPT with file uploads, Mr. Hai chatbot |

## 3. The full RAG pipeline - step by step

\`\`\`mermaid
flowchart TD
    Doc[Source documents<br/>PDFs, lessons, FAQs] --> Chunk[Chunk into 200-500 token pieces]
    Chunk --> Embed[Embed each chunk]
    Embed --> Store[Vector DB<br/>pgvector / Pinecone / Weaviate]
    Q[User question] --> EQ[Embed question]
    EQ --> Search[Cosine similarity search]
    Store --> Search
    Search --> Top[Top-k chunks]
    Top --> Prompt[Build prompt:<br/>system + chunks + question]
    Prompt --> LLM[LLM generation]
    LLM --> Cite[Answer + citations]
\`\`\`

### 3.1 Chunking - the underrated step
- **Too small** (50 tokens): loses context, retrieval quality drops.
- **Too large** (2000 tokens): wastes the LLM's attention budget.
- **Sweet spot** in 2026: ~300 tokens with 50-token overlap, split on paragraph boundaries.

### 3.2 Embedding model choices

| Model | Use when |
|---|---|
| **OpenAI text-embedding-3-small** | English, fast, cheap |
| **Cohere embed-multilingual-v3** | Multilingual, paid |
| **multilingual-E5-large** | Multilingual, free, self-hosted |
| **BGE-M3** | SOTA open-source, 100+ languages |

### 3.3 Re-ranking - the quality boost most teams skip

After vector search returns 50 candidates, run a **cross-encoder** (e.g. \`bge-reranker-v2-m3\`) on the (query, chunk) pairs. It is slower but dramatically more accurate. Keep the top 5 for the LLM.

\`\`\`text
Query → Vector search 50 chunks → Cross-encoder rerank → Top 5 chunks
\`\`\`

## 4. Hybrid search - best of both worlds

Pure semantic search misses exact keywords (product codes, error messages, names). **Hybrid** combines:

- **BM25 / TF-IDF** - exact lexical matches.
- **Dense embeddings** - semantic similarity.
- **Reciprocal Rank Fusion** - merge the two ranked lists.

Most production RAG systems use hybrid. Lone vector search is rarely best.

## 5. Real-world use case - Mr. Hai chatbot on HaiEduTech

The chatbot answers *"How do I improve my IELTS Speaking Band 5.5 → 7.0?"* using RAG:

1. **Chunk** every lesson, blog post, and IELTS rubric in the platform.
2. **Embed** with multilingual-E5 → store in **Supabase pgvector**.
3. On a question, **embed it** and run \`SELECT … ORDER BY embedding <=> query_embedding LIMIT 8\`.
4. **Re-rank** with a cross-encoder.
5. Build a system prompt: *"You are Mr. Hai. Use ONLY the snippets below. Cite source URLs."*
6. Stream the answer with the **Lovable AI Gateway** (\`google/gemini-3-flash-preview\`).

The result: a chatbot that **never hallucinates** because every fact is grounded in a HaiEduTech lesson - and the citations are clickable.

## 6. Evaluation - RAGAS metrics

Don't ship blind. Measure:

| Metric | Question it answers |
|---|---|
| **Context precision** | Are the retrieved chunks relevant? |
| **Context recall** | Did we miss any relevant chunk? |
| **Faithfulness** | Does the answer stay grounded in the chunks? |
| **Answer relevance** | Does the answer actually answer the question? |

Tools: **ragas**, **TruLens**, **promptfoo**.

## 7. Key Concept

> 🎯 **Key Concept** - RAG = *"give the LLM open-book test"*. You **retrieve** facts from your private data and **augment** the prompt before **generation**. Quality depends 80% on retrieval (chunking, embeddings, re-ranking, hybrid) and 20% on the LLM. Measure with RAGAS, not vibes.`,
        theoryEn: "",
        code: `# Một pipeline RAG (Retrieval Augmented Generation) 50 dòng bạn có thể chạy ngay hôm nay.
# Công nghệ sử dụng: sentence-transformers + FAISS (nhẹ) + Lovable AI Gateway.
# Cài đặt các thư viện cần thiết: pip install sentence-transformers faiss-cpu requests
import os # Thư viện để tương tác với hệ điều hành, ví dụ lấy biến môi trường.
import faiss # Thư viện FAISS để tìm kiếm vector hiệu quả.
import numpy as np # Thư viện NumPy để làm việc với mảng số.
import requests # Thư viện để gửi các yêu cầu HTTP (ví dụ: gọi API).
from sentence_transformers import SentenceTransformer # Thư viện để tạo vector nhúng (embeddings) từ văn bản.

# ---------- 1. Cơ sở tri thức nhỏ (trong thực tế: hàng nghìn đoạn bài học) ----------
# docs là danh sách các đoạn văn bản (tài liệu) đóng vai trò là cơ sở tri thức.
docs = [
    "HaiEduTech offers IELTS Speaking practice with continuous live transcription.",
    "The Mountain Climber gamification rewards every IELTS lesson completed.",
    "PTE Hub tracks Speaking, Writing, Reading, Listening progress as 4 rings.",
    "YKI Finnish Prep covers A2 vocabulary across 550+ themed words.",
    "HSK Vocabulary Bank includes 1100+ words from HSK1 to HSK6.",
    "Founder Mr. Hai has 15+ years teaching experience and a Master's in Linguistics.",
]

# ---------- 2. Nhúng (Embed) + lập chỉ mục (index) ----------
# Khởi tạo mô hình SentenceTransformer để chuyển văn bản thành vector số.
# Đầu vào: Tên mô hình đã được huấn luyện.
embed = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
# Chuyển đổi các tài liệu trong 'docs' thành các vector nhúng.
# normalize_embeddings=True: Chuẩn hóa các vector về độ dài đơn vị (giúp tính toán cosine similarity dễ hơn).
# astype("float32"): Chuyển đổi kiểu dữ liệu của vector sang float32, phù hợp với FAISS.
# Đầu vào: Danh sách các tài liệu (docs).
# Đầu ra: Một ma trận (matrix) các vector nhúng.
mat = embed.encode(docs, normalize_embeddings=True).astype("float32")
# Tạo một chỉ mục FAISS kiểu IndexFlatIP (Inner Product) để lưu trữ và tìm kiếm vector.
# mat.shape[1]: Lấy kích thước (số chiều) của vector nhúng.
# inner-product = cosine since we normalised: Tích vô hướng (inner product) tương đương với cosine similarity khi các vector đã được chuẩn hóa.
# Đầu vào: Kích thước của vector.
# Đầu ra: Một đối tượng chỉ mục FAISS.
index = faiss.IndexFlatIP(mat.shape[1])
# Thêm các vector nhúng vào chỉ mục FAISS để có thể tìm kiếm sau này.
# Đầu vào: Ma trận các vector nhúng.
index.add(mat)

# Định nghĩa hàm retrieve để tìm kiếm các tài liệu liên quan đến một câu hỏi.
# Đầu vào:
#   - question (str): Câu hỏi của người dùng.
#   - k (int): Số lượng tài liệu liên quan nhất muốn lấy (mặc định là 3).
# Đầu ra:
#   - list[str]: Danh sách các đoạn văn bản (tài liệu) liên quan.
def retrieve(question: str, k: int = 3) -> list[str]:
    # Chuyển đổi câu hỏi thành vector nhúng, tương tự như cách làm với các tài liệu.
    q = embed.encode([question], normalize_embeddings=True).astype("float32")
    # Tìm kiếm các vector gần nhất trong chỉ mục FAISS.
    # _: Khoảng cách (score) đến các vector tìm được (không dùng ở đây).
    # ids: Chỉ số (index) của các tài liệu tìm được trong danh sách 'docs'.
    # Đầu vào: Vector câu hỏi và số lượng kết quả k.
    # Đầu ra: Khoảng cách và chỉ số của các tài liệu phù hợp.
    _, ids = index.search(q, k)
    # Trả về danh sách các đoạn văn bản tương ứng với các chỉ số tìm được.
    return [docs[i] for i in ids[0]]

# ---------- 3. Xây dựng prompt + hỏi LLM thông qua Lovable AI Gateway ----------
# Lấy khóa API từ biến môi trường LOVABLE_API_KEY.
# Nếu không có, sử dụng giá trị mặc định "PUT_YOUR_KEY_HERE".
LOVABLE_API_KEY = os.environ.get("LOVABLE_API_KEY", "PUT_YOUR_KEY_HERE")
# Định nghĩa hàm ask để gửi câu hỏi đến mô hình ngôn ngữ lớn (LLM) thông qua Lovable AI Gateway.
# Đầu vào:
#   - question (str): Câu hỏi của người dùng.
# Đầu ra:
#   - str: Câu trả lời từ LLM.
def ask(question: str) -> str:
    # Lấy các đoạn tài liệu liên quan đến câu hỏi.
    # Đầu vào: Câu hỏi và số lượng tài liệu k=3.
    # Đầu ra: Danh sách các đoạn văn bản liên quan.
    chunks = retrieve(question, k=3)
    # Tạo chuỗi ngữ cảnh (context) từ các đoạn tài liệu đã lấy được.
    # Mỗi đoạn được đánh số thứ tự và phân tách bằng "\\n---\\n".
    # Đầu vào: Danh sách các đoạn văn bản.
    # Đầu ra: Một chuỗi chứa tất cả các đoạn văn bản đã định dạng.
    context = "\\\\n---\\\\n".join(f"[Source {i+1}] {c}" for i, c in enumerate(chunks))
    # Định nghĩa vai trò của hệ thống (system prompt) cho LLM.
    # Hướng dẫn LLM trả lời dựa trên các nguồn cung cấp và trích dẫn nguồn.
    system = (
        "You are Mr. Hai, the HaiEduTech tutor. "
        "Answer ONLY using the sources below. Cite them as [Source N]."
    )
    # Định nghĩa câu hỏi của người dùng (user prompt) bao gồm cả ngữ cảnh và câu hỏi gốc.
    user = f"Sources:\\\\n{context}\\\\n\\\\nQuestion: {question}"
    # Gửi yêu cầu POST đến API của Lovable AI Gateway.
    # Đầu vào:
    #   - URL của API.
    #   - Headers chứa khóa API và kiểu nội dung.
    #   - JSON payload chứa thông tin về mô hình, vai trò và nội dung tin nhắn.
    #   - timeout: Thời gian chờ tối đa cho phản hồi.
    # Đầu ra: Đối tượng phản hồi từ API.
    r = requests.post(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        headers={"Authorization": f"Bearer {LOVABLE_API_KEY}", "Content-Type": "application/json"},
        json={
            "model": "google/gemini-3-flash-preview", # Tên mô hình LLM sẽ sử dụng.
            "messages": [ # Danh sách các tin nhắn trong cuộc hội thoại.
                {"role": "system", "content": system}, # Tin nhắn từ hệ thống.
                {"role": "user", "content": user}, # Tin nhắn từ người dùng.
            ],
        },
        timeout=30,
    )
    # Trích xuất nội dung câu trả lời từ phản hồi JSON của API.
    # Đầu ra: Chuỗi câu trả lời từ LLM.
    return r.json()["choices"][0]["message"]["content"]

# ---------- 4. Thử nghiệm ----------
# Lặp qua một danh sách các câu hỏi mẫu để kiểm tra pipeline.
for q in [
    "How does HaiEduTech track PTE progress?",
    "What is the Mountain Climber feature?",
    "Who is Teacher Hai?",
]:
    # In câu hỏi.
    print("Q:", q)
    # Gọi hàm ask để lấy câu trả lời từ LLM và in ra.
    print("A:", ask(q))
    # In dấu phân cách giữa các câu hỏi.
    print("---")

# Kết quả mong đợi: mọi câu trả lời đều trích dẫn [Source N] và dựa trên các tài liệu đã cung cấp ở trên.
# Để sẵn sàng cho môi trường sản xuất, có thể thay thế FAISS bằng Supabase pgvector.`,
        codeLanguage: "python",
        exercise: "Add a **re-ranker** step between `retrieve` and the LLM. Use `sentence-transformers/CrossEncoder` (e.g. `cross-encoder/ms-marco-MiniLM-L-6-v2`) to score the top-10 chunks and keep only the top-3. Compare answer quality before vs after. In 2-3 sentences, explain *why* a cross-encoder beats a bi-encoder for ranking even though it's slower.",
        exerciseEn: "",
        quiz: [
          {
            question: "What problem does RAG primarily solve for LLM-powered chatbots?",
            options: [
              "It makes the LLM run faster",
              "It grounds answers in your private data so the LLM cannot hallucinate facts it was never trained on",
              "It removes the need for a database",
              "It replaces the LLM with a search engine",
            ],
            answer: 1,
            explanation: "An LLM only knows what it saw during training (and even then unreliably). RAG fetches relevant snippets from YOUR docs and puts them in the prompt, so the model paraphrases facts that actually exist - with citations.",
          },
          {
            question: "Why is hybrid search (BM25 + dense embeddings) usually better than pure vector search?",
            options: [
              "It's faster",
              "BM25 catches exact-match keywords (product codes, names, error strings) that semantic embeddings often miss",
              "Vector search is broken",
              "Hybrid uses less memory",
            ],
            answer: 1,
            explanation: "Embeddings excel at meaning ('how do I sleep better?' ↔ 'tips for insomnia') but can miss precise tokens like 'ERR_PAGE_NOT_FOUND' or 'SKU-29841'. BM25 nails exact matches. Reciprocal Rank Fusion combines both lists for the best of both worlds.",
          },
          {
            question: "Which RAGAS metric tells you if the LLM stayed faithful to the retrieved chunks (no hallucination)?",
            options: ["Context precision", "Context recall", "Faithfulness", "Answer relevance"],
            answer: 2,
            explanation: "Faithfulness scores how many claims in the answer are supported by the retrieved chunks. Low faithfulness = the model is making things up. The other three measure retrieval quality and answer-question alignment.",
          },
        ],
      },

      // =====================================================================
      // Lesson 10 - Speech: STT, TTS & Voice Pipelines
      // =====================================================================
      {
        id: "nlp-10",
        title: "Speech Processing: STT, TTS & Voice Assistants",
        titleEn: "Speech Processing: STT, TTS & Voice Assistants",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - NLP Lessons 5-6 (sequence models, Transformers).

## 1. Two halves of the voice stack

| Direction | Task | Famous model |
|---|---|---|
| Audio → text | **Speech-to-Text (STT / ASR)** | OpenAI **Whisper**, Google USM |
| Text → audio | **Text-to-Speech (TTS)** | ElevenLabs, OpenAI tts-1, Google Wavenet |

Combine them and you get a **voice assistant**: Siri, Alexa, Google Assistant - and HaiEduTech's **AI Speaking Coach**.

\`\`\`text
Microphone → Speech-to-Text → Understand intent → LLM / business logic → Text-to-Speech → Speaker
\`\`\`

## 2. How modern STT works (Whisper-style)

1. Audio is sampled at 16 kHz.
2. Convert to a **log-Mel spectrogram** (a 2-D image of frequency × time).
3. Pass it through an **encoder-decoder Transformer** trained on 680k+ hours of multilingual audio.
4. Decode tokens, including timestamps and language detection - in one shot.

\`\`\`text
Raw audio 16 kHz waveform → Log-Mel spectrogram → Transformer encoder → Transformer decoder → Text + timestamps + language
\`\`\`

> 🎯 **Why Whisper changed everything** - One open-source model handles **99 languages**, accents, background noise, code-switching, even singing - with no per-language tuning. It was the GPT moment of speech recognition.

## 3. How modern TTS works (neural)

1. Text → **phonemes** (smallest sound units).
2. **Acoustic model** (Tacotron 2, FastSpeech 2) predicts the spectrogram.
3. **Vocoder** (HiFi-GAN, WaveNet) turns the spectrogram into a waveform.
4. Optional: **voice cloning** conditions on a 30-second sample to mimic a specific speaker.

| Era | Tech | Quality |
|---|---|---|
| Concatenative (1990s) | Stitch recorded fragments | Robotic |
| Statistical parametric (2000s) | HMMs + vocoders | Smooth but flat |
| **Neural (2017+)** | Tacotron + WaveNet | Indistinguishable from human in good conditions |
| **Diffusion (2024+)** | Audio diffusion + flow-matching | Real-time, expressive, multilingual |

## 4. Edge of the field - multimodal end-to-end

GPT-4o, Gemini 2.5 Live, and the **Realtime APIs** skip the middle steps: audio in → audio out by **one** Transformer. Latency drops from 2-3 s (cascaded) to 200-300 ms (end-to-end), and emotional cues (laughter, sighs) are preserved.

\`\`\`mermaid
flowchart LR
    Mic[Microphone] --> M[Multimodal LLM<br/>audio in, audio out]
    M --> Spk[Speaker]
\`\`\`

## 5. Real-world use case - HaiEduTech AI Speaking Coach

When you click **🎤** in the IELTS Speaking module:

1. The browser captures audio with the **Web Speech API**.
2. **Whisper-large-v3** (via an edge function) transcribes it with timestamps.
3. A **Wav2Vec2** model scores phoneme-level pronunciation against the target.
4. Lovable AI (\`google/gemini-2.5-flash\`) returns structured JSON: *band score, fluency comment, 3 fix-it tips*.
5. The fix-it tips are spoken back via the **finnish-tts** edge function (or browser TTS for English).

Five different speech & language models, one fluid experience.

## 6. The Vietnamese / Finnish challenge

| Language | Pitfall | Fix |
|---|---|---|
| **Vietnamese** | 6 tones - *má* (mother) vs *mả* (grave) sound similar to a Western model | Use a tone-aware model (PhoWhisper, VinaSTT) |
| **Finnish** | Long compound words (*"taloissanikin"*), vowel harmony | Whisper-large handles this well; smaller models struggle |
| **Chinese** | Homophones (*shī* = poem / lion / wet) | Context model + LM rescoring |

## 7. Privacy & latency

| Where it runs | Latency | Privacy | Best for |
|---|---|---|---|
| **Cloud** (OpenAI, Google) | 200-500 ms | Audio leaves the device | Best quality |
| **On-device** (Whisper.cpp, MLX) | 50-300 ms | Audio never leaves | Sensitive, offline |
| **Hybrid** | 100-300 ms | Wake-word on device, content in cloud | Most assistants |

## 8. Key Concept

> 🎯 **Key Concept** - Speech AI = **STT (audio → text) ↔ TTS (text → audio)**, with an LLM in the middle for assistants. **Whisper killed per-language ASR engines** in 2022; **end-to-end multimodal LLMs** are killing the cascaded pipeline in 2025-2026. Always test on YOUR target language - accents and tones matter.`,
        theoryEn: "",
        code: `# Run Whisper locally to transcribe an audio file in any language.
# pip install openai-whisper soundfile
# (whisper will fetch the model the first time you run it, ~1.5 GB for 'medium')
import whisper

# 1. Load a model. 'tiny' (39M) is laptop-friendly; 'medium' (769M) is the sweet
# spot for accuracy; 'large-v3' (1550M) is SOTA but needs a GPU for real-time.
model = whisper.load_model("base")   # 74 MB - fast and good enough for a demo

# 2. Transcribe - Whisper auto-detects the language
result = model.transcribe(
    "your_audio.wav",                # provide a 16 kHz mono WAV file
    language=None,                   # None = auto-detect
    task="transcribe",               # or "translate" → English
    word_timestamps=True,            # nice-to-have for highlighting
)

print("Detected language:", result["language"])
print("Full transcript :", result["text"])

# 3. Per-segment timestamps (great for subtitles or pronunciation feedback)
for seg in result["segments"]:
    print(f"  [{seg['start']:6.2f} → {seg['end']:6.2f}] {seg['text']}")

# ---------- TTS via the OpenAI API (or the Lovable AI Gateway) ----------
# pip install openai
# from openai import OpenAI
# client = OpenAI()
# speech = client.audio.speech.create(
#     model="tts-1",
#     voice="alloy",       # or 'nova', 'shimmer', …
#     input="Xin chào! Tôi là Thầy Hải.",
# )
# speech.stream_to_file("greeting.mp3")

# ---------- End-to-end voice loop (sketch) ----------
# def voice_assistant_turn(audio_in_path: str) -> str:
#     transcript = model.transcribe(audio_in_path)["text"]
#     answer = call_llm(transcript)             # your business logic
#     synthesize(answer, "answer.mp3")          # TTS
#     return "answer.mp3"
# This is exactly the loop the HaiEduTech Speaking Coach runs every turn.`,
        codeLanguage: "python",
        exercise: "Record a 10-second clip of yourself reading the IELTS Cue Card *\"Describe a teacher who influenced you.\"* in **English**, then in **Vietnamese**. Run Whisper *base* and *medium* on both. Report (a) which language was harder, (b) any tone/diacritic mistakes the model makes, and (c) one practical fix you would add (hint: post-process with a Vietnamese spell-checker, or swap to PhoWhisper).",
        exerciseEn: "",
        quiz: [
          {
            question: "How does Whisper internally represent the audio before the Transformer reads it?",
            options: [
              "Raw WAV samples",
              "MIDI notes",
              "A log-Mel spectrogram (frequency vs time, like an image)",
              "ASCII text",
            ],
            answer: 2,
            explanation: "Whisper converts the waveform to a log-Mel spectrogram - essentially a picture of the audio. The Transformer encoder then treats this image as a sequence of tokens, which is why one architecture handles 99 languages.",
          },
          {
            question: "Why are end-to-end multimodal LLMs (GPT-4o, Gemini Live) replacing the cascaded STT → LLM → TTS pipeline?",
            options: [
              "They are cheaper to train",
              "They cut latency from seconds to ~200 ms and preserve emotional cues like laughter and intonation",
              "They eliminate the need for microphones",
              "They only work in English",
            ],
            answer: 1,
            explanation: "Cascaded pipelines lose information at every conversion step and add latency. End-to-end models keep the audio representation throughout, so they sound natural in real time and react to vocal nuance.",
          },
          {
            question: "Which Vietnamese feature is most likely to trip up a generic STT model?",
            options: [
              "The Latin alphabet",
              "The 6 lexical tones - they change word meaning but western models often ignore them",
              "Vietnamese has no consonants",
              "Vietnamese is read right-to-left",
            ],
            answer: 1,
            explanation: "Tones are *phonemic* in Vietnamese: *má* / *mà* / *mả* / *mã* / *mạ* are different words. A model trained mainly on tone-less languages will hear them as the same syllable. Use PhoWhisper or VinaSTT for production-grade Vietnamese ASR.",
          },
        ],
      },

      // =====================================================================
      // Lesson 11 - Vector Databases & Embedding Stores
      // =====================================================================
      {
        id: "nlp-11",
        title: "Vector Databases & Embedding Stores",
        titleEn: "Vector Databases & Embedding Stores",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - NLP Lessons 3 & 9 (embeddings, RAG) and basic SQL.

## 1. Why a *vector* database?

A traditional SQL row stores scalars (name, price, date). An NLP system also wants to store **dense vectors** - the 384-, 768-, or 1536-dimensional embeddings produced by Lessons 3 / 6 / 9. The query is no longer *"WHERE name = ?"* but *"give me the rows whose embedding is **closest to this query embedding**"*.

\`\`\`mermaid
flowchart LR
    T[Texts / docs] --> E[Embedding model]
    E --> V[Vector DB]
    Q[Query text] --> EQ[Embed query]
    EQ --> S[ANN search]
    V --> S
    S --> R[Top-k similar items]
\`\`\`

## 2. The math - distance metrics

| Metric | Formula (intuition) | When |
|---|---|---|
| **Cosine similarity** | $\\cos(\\theta) = \\frac{a \\cdot b}{\\|a\\|\\|b\\|}$ | Default for text embeddings |
| **Dot product** | $a \\cdot b$ | When vectors are normalised (faster) |
| **L2 / Euclidean** | $\\|a - b\\|_2$ | Image embeddings, geometric data |

If you normalise embeddings to unit length, **cosine, dot product, and L2 give the same ranking** - pick the fastest your DB supports.

## 3. Approximate Nearest Neighbour (ANN)

Brute-force "compare query to every row" works at 10k vectors and dies at 10M. **ANN** indexes trade a tiny accuracy loss for massive speed-up:

| Algorithm | Idea | Library |
|---|---|---|
| **HNSW** (Hierarchical Navigable Small World) | Multi-layer graph, navigate down | FAISS, pgvector, Qdrant, Weaviate |
| **IVF** (Inverted File) | Cluster vectors first, search a few clusters | FAISS |
| **PQ** (Product Quantization) | Compress vectors 32× | Pinecone, FAISS |
| **DiskANN** | Optimised for SSD-resident indexes | Microsoft, used by Bing |

\`\`\`text
Query vector → HNSW layer 1 coarse jumps → Layer 2 refine → Layer 3 local search → Top-k neighbours
\`\`\`

## 4. The 2026 vector DB landscape

| Option | Best for | Hosting |
|---|---|---|
| **pgvector** (Postgres extension) | Already using Postgres? Add vectors with one extension. **Default for HaiEduTech.** | Self / Supabase / Neon |
| **Qdrant** | Open-source, fast HNSW, great filters | Self / cloud |
| **Pinecone** | Fully managed, zero ops | Cloud only |
| **Weaviate** | Multi-modal (text + images), built-in vectorizer | Self / cloud |
| **Milvus** | Web-scale (billions of vectors) | Self / cloud |
| **Chroma** | Tiny, embedded, Python-first | Local / self |

> 🎯 **Recommendation for HaiEduTech** - Use **pgvector** on the existing Supabase Postgres. Same backups, same auth, same SQL, no new operational surface.

## 5. Schema example with pgvector

\`\`\`sql
-- Thiết lập ban đầu (chỉ chạy một lần)

-- Tạo extension 'vector' nếu nó chưa tồn tại.
-- Extension này cần thiết để làm việc với kiểu dữ liệu vector (nhúng/embeddings).
CREATE EXTENSION IF NOT EXISTS vector;

-- Lưu trữ mỗi đoạn bài học (lesson chunk) cùng với vector nhúng 1536 chiều của nó.
-- Vector nhúng này được tạo bằng mô hình 'text-embedding-3-small' của OpenAI.
CREATE TABLE lesson_chunks (
  -- ID duy nhất cho mỗi đoạn, tự động tạo.
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ID của bài học mà đoạn này thuộc về.
  lesson_id   text NOT NULL,
  -- ID của module mà bài học này thuộc về.
  module_id   text NOT NULL,
  -- Nội dung văn bản của đoạn bài học.
  chunk_text  text NOT NULL,
  -- Vector nhúng 1536 chiều của chunk_text.
  embedding   vector(1536) NOT NULL,
  -- Thời gian tạo bản ghi, mặc định là thời gian hiện tại.
  created_at  timestamptz DEFAULT now()
);

-- Tạo chỉ mục HNSW (Hierarchical Navigable Small Worlds) để tìm kiếm cosine nhanh.
-- Chỉ mục này giúp tăng tốc độ tìm kiếm các vector tương tự nhau.
CREATE INDEX ON lesson_chunks
  -- Sử dụng chỉ mục HNSW trên cột 'embedding' với phép toán so sánh cosine.
  USING hnsw (embedding vector_cosine_ops)
  -- Các tham số cấu hình cho chỉ mục HNSW:
  -- m: số lượng cạnh tối đa cho mỗi nút trong biểu đồ.
  -- ef_construction: kích thước danh sách tìm kiếm trong quá trình xây dựng chỉ mục.
  WITH (m = 16, ef_construction = 64);

-- Truy vấn: tìm 5 đoạn bài học gần nhất với vector nhúng của câu hỏi.

-- Chọn ID, nội dung đoạn văn bản và tính toán độ tương đồng cosine.
-- Độ tương đồng được tính bằng 1 - (khoảng cách cosine).
SELECT id, chunk_text, 1 - (embedding <=> \$1::vector) AS similarity
FROM lesson_chunks
-- Lọc theo module_id để chỉ tìm kiếm trong một module cụ thể.
WHERE module_id = 'nlp-foundations'         -- bộ lọc siêu dữ liệu
-- Sắp xếp kết quả theo khoảng cách cosine tăng dần (gần nhất lên đầu).
ORDER BY embedding <=> \$1::vector
-- Giới hạn kết quả trả về chỉ 5 đoạn gần nhất.
LIMIT 5;
-- Đầu vào: \$1 là vector nhúng của câu hỏi.
-- Đầu ra: 5 đoạn văn bản (chunk_text) có nội dung liên quan nhất đến câu hỏi, cùng với ID và độ tương đồng.
\`\`\`

The \`<=>\` operator is **cosine distance**; smaller is better.

## 6. Filters + vectors - the killer feature

Real queries combine semantic search with metadata: *"top 5 chunks about transformers, only from lessons published after 2024 and tagged 'beginner'"*. pgvector lets you express this as plain SQL - that is why combining a vector store with your existing OLTP DB beats dropping a separate Pinecone instance.

## 7. Operational gotchas

| Problem | Fix |
|---|---|
| **Recompute on model swap** - embeddings from \`text-embedding-3-small\` ≠ those from \`text-embedding-3-large\`. | Version your embedding column, batch re-embed when you upgrade. |
| **Index build time** balloons past 10M rows. | Use IVF or sharded HNSW; build offline. |
| **High dimensionality** wastes RAM. | Quantize (PQ) or pick a smaller model (e.g. 384-d MiniLM). |
| **Stale embeddings** when the source text changes. | Track \`source_hash\` and re-embed on diff. |

## 8. Key Concept

> 🎯 **Key Concept** - A **vector database** stores embeddings and answers *"give me the most similar items"* in milliseconds. **HNSW + cosine** is the 2026 default. **pgvector** is the most pragmatic choice if you already run Postgres - same backups, same SQL, same auth. Combine vectors + metadata filters in one query for production-grade RAG.`,
        theoryEn: "",
        code: `# Two demos in one file:
# (a) Embedded vector store with FAISS - zero infra, runs in a notebook.
# (b) Production-style call to Supabase pgvector - what HaiEduTech actually uses.
# pip install sentence-transformers faiss-cpu psycopg2-binary
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

# ---------- (a) FAISS - local in-memory ----------
embed = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")  # 384-d

corpus = [
    "Transformers replaced LSTMs for most NLP tasks in 2017.",
    "BERT is an encoder-only Transformer pre-trained on masked language modelling.",
    "GPT models are decoder-only and generate text autoregressively.",
    "Whisper transcribes 99 languages from a log-Mel spectrogram.",
    "pgvector adds vector indexes to Postgres - perfect for RAG on Supabase.",
    "Cosine similarity ranks documents by angle, ignoring magnitude.",
]
mat = embed.encode(corpus, normalize_embeddings=True).astype("float32")

# HNSW index - fast, sub-linear search
index = faiss.IndexHNSWFlat(mat.shape[1], 32)   # 32 = M (graph degree)
index.hnsw.efConstruction = 64
index.add(mat)

def search(query: str, k: int = 3):
    q = embed.encode([query], normalize_embeddings=True).astype("float32")
    sims, ids = index.search(q, k)
    for sim, i in zip(sims[0], ids[0]):
        print(f"  sim={sim:.3f} | {corpus[i]}")

print("Q: How do modern speech recognition models work?")
search("How do modern speech recognition models work?")

print("\\nQ: Where can I store embeddings in Postgres?")
search("Where can I store embeddings in Postgres?")

# ---------- (b) Supabase pgvector - what production looks like ----------
# import psycopg2
# conn = psycopg2.connect(os.environ["DATABASE_URL"])
# cur = conn.cursor()
#
# # Insert
# cur.execute(
#     "INSERT INTO lesson_chunks (lesson_id, module_id, chunk_text, embedding) "
#     "VALUES (%s, %s, %s, %s)",
#     ("nlp-11", "nlp-advanced", chunk, embedding.tolist()),
# )
#
# # Search (cosine, with metadata filter)
# cur.execute(
#     "SELECT lesson_id, chunk_text, 1 - (embedding <=> %s::vector) AS sim "
#     "FROM lesson_chunks "
#     "WHERE module_id = %s "
#     "ORDER BY embedding <=> %s::vector "
#     "LIMIT 5",
#     (q.tolist(), "nlp-advanced", q.tolist()),
# )
# for row in cur.fetchall():
#     print(row)
#
# Same SQL, same auth, same backups. No new database to operate.`,
        codeLanguage: "python",
        exercise: "Modify the FAISS demo so the index is **persistent**: write it to disk with `faiss.write_index(index, 'demo.index')` and load it back. Then add **filtering**: only return results from documents that contain the word *\"Postgres\"*. Compare the result-set sizes and explain in 2-3 sentences why doing the filter **after** retrieval (post-filter) can be slower than a true metadata filter inside a vector DB like pgvector or Qdrant.",
        exerciseEn: "",
        quiz: [
          {
            question: "Why do we use ANN (Approximate Nearest Neighbour) algorithms like HNSW instead of brute-force search?",
            options: [
              "Brute force returns wrong answers",
              "Brute force is O(N) per query - fine for 10k vectors but unusable at 10M+; HNSW gives sub-linear search with negligible accuracy loss",
              "ANN uses less memory always",
              "Brute force only works on integers",
            ],
            answer: 1,
            explanation: "Brute-force vector search compares the query against every row, scaling linearly. HNSW builds a multi-layer graph that lets the search 'jump' close to the answer in O(log N) steps, trading ~1-2% recall for 100×+ speed.",
          },
          {
            question: "Which vector DB choice usually has the lowest operational cost for a team already running Postgres?",
            options: [
              "Pinecone (managed cloud)",
              "Standalone Milvus cluster",
              "pgvector - a Postgres extension that adds vector types and HNSW indexes to your existing DB",
              "Writing your own ANN library",
            ],
            answer: 2,
            explanation: "pgvector reuses your existing Postgres backups, auth, monitoring, and SQL skills. You add ONE extension and gain vector search - no new service, no extra failure mode. That's why HaiEduTech runs RAG on Supabase pgvector.",
          },
          {
            question: "If you switch from `text-embedding-3-small` (1536-d) to `text-embedding-3-large` (3072-d), what must you do to your existing vector DB?",
            options: [
              "Nothing - embeddings are interchangeable",
              "Re-embed and re-index every row, because vectors from different models are NOT comparable",
              "Convert dimensions with PCA",
              "Just append the new dimensions as zeros",
            ],
            answer: 1,
            explanation: "Different embedding models live in different vector spaces - distances are meaningless across them. Always version your embedding column (or table), batch re-embed every row when you upgrade, and only flip queries to the new column once it is fully populated.",
          },
        ],
      },

      // =====================================================================
      // Lesson 12 - AI Agents, Tool Use & Production NLP
      // =====================================================================
      {
        id: "nlp-12",
        title: "AI Agents, Tool Use & Production NLP",
        titleEn: "AI Agents, Tool Use & Production NLP",
        level: 5,
        difficulty: "advanced",
        theory: `> 💡 **Prerequisites** - All previous NLP lessons, plus an LLM API key (Lovable AI Gateway is fine).

## 1. From chatbot to agent

A **chatbot** answers a question. An **agent** *takes actions*: searches the web, calls APIs, runs code, queries databases, books a flight, replies to email - looping until the goal is reached.

\`\`\`mermaid
flowchart TD
    G[User goal] --> P[LLM plans]
    P --> T[Pick tool]
    T --> Call[Execute tool]
    Call --> O[Observation]
    O --> P2{Goal reached?}
    P2 -- No --> P
    P2 -- Yes --> A[Answer]
\`\`\`

The pattern is **ReAct** (*Reason + Act*): the LLM thinks one step ahead, picks a tool, observes the result, and decides what to do next. Repeat until the answer is good enough.

## 2. Tool calling - the standard interface

Every modern LLM API (OpenAI, Anthropic, Google, Lovable AI Gateway) supports **structured tool calling**:

\`\`\`json
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "search_lessons",
        "description": "Search HaiEduTech lessons by query.",
        "parameters": {
          "type": "object",
          "properties": {
            "query":  { "type": "string" },
            "limit":  { "type": "integer", "default": 5 }
          },
          "required": ["query"]
        }
      }
    }
  ]
}
\`\`\`

The model returns a JSON object naming the tool and arguments. **Your code** executes the tool, sends the result back, and the model continues. No more parsing brittle prose.

## 3. Anatomy of an agent

\`\`\`mermaid
flowchart LR
    M[Memory<br/>short + long term] --> L[LLM core]
    L --> T[Tools<br/>search, code, SQL, APIs]
    L --> P[Planner<br/>decompose goal]
    L --> R[Reflector<br/>self-critique]
    T --> O[Observations]
    O --> M
\`\`\`

| Component | Purpose | Example |
|---|---|---|
| **LLM core** | Reasoning engine | gemini-2.5-pro, gpt-5 |
| **Tools** | Hands & eyes | web_search, run_python, query_db, send_email |
| **Memory** | Past interactions, long-term facts | Vector DB + recent message buffer |
| **Planner** | Break goal into steps | Plan-and-Execute, Tree-of-Thoughts |
| **Reflector** | Critique own answer | Reflexion, self-consistency |

## 4. Popular agent frameworks (2026)

| Framework | Style | Strength |
|---|---|---|
| **LangGraph** | Stateful graph of nodes/edges | Production-grade, debuggable |
| **CrewAI** | Multiple role-playing agents collaborate | Easy multi-agent orchestration |
| **OpenAI Agents SDK** | Typed Python, native tool calling | Tight OpenAI integration |
| **Pydantic AI** | Type-safe agents | Validated I/O, clean Python |
| **Build it yourself** | 100 lines of Python + a while-loop | Full control, no lock-in |

> 🎯 **Reality check** - Agents are *fragile*. A 95% step-success rate × 5 steps = 77% end-to-end. Always: (a) set max_steps, (b) cache tool results, (c) add a human-in-the-loop checkpoint for irreversible actions.

## 5. Production NLP checklist

Even the smartest model will fail in production without these guardrails:

| Layer | What to do | Tool |
|---|---|---|
| **Prompt** | Versioned templates, few-shot examples | Promptfoo, Langfuse |
| **Retrieval** | Hybrid search + re-ranker | pgvector, BM25, BGE-reranker |
| **Validation** | Pydantic / Zod schemas on tool I/O | Pydantic AI, Instructor |
| **Safety** | Moderation, PII redaction, jailbreak detection | OpenAI moderation, Llama Guard 3 |
| **Eval** | Offline benchmarks + online A/B | RAGAS, TruLens |
| **Cost** | Per-request token budget, model fallback chain | LiteLLM, Helicone |
| **Latency** | Cache, stream, route easy queries to cheap model | Redis, model cascading |
| **Observability** | Trace every prompt + tool call | Langfuse, Arize, Weights & Biases |

## 6. Real-world use case - A HaiEduTech "Study Coach" agent

Goal: *"Plan a 4-week IELTS Speaking improvement schedule for me."*

\`\`\`mermaid
flowchart TD
    G[User goal] --> A[Agent]
    A -->|tool: get_user_profile| DB[(Supabase)]
    A -->|tool: search_lessons| VDB[(pgvector)]
    A -->|tool: get_calendar| Cal[Calendar API]
    A -->|tool: write_plan| File[Write to notebook]
    A --> Ans[Personalised plan + citations]
\`\`\`

The agent:
1. Pulls the user's current band and weak skills from \`student_profiles\`.
2. RAGs the IELTS Speaking lectures for relevant tips.
3. Checks the calendar for free 30-minute slots.
4. Writes the plan to **Smart Notebook** with deep links to each lesson.
5. Logs every tool call to \`api_usage_log\` for cost tracking.

A single edge function on Lovable Cloud, ~200 lines of code, wired to the existing tables.

## 7. Ethics & safety in 2026

| Risk | Mitigation |
|---|---|
| **Hallucinated citations** | Force the model to quote source URLs verbatim; verify with regex |
| **Prompt injection** | Treat retrieved content as untrusted; use system-prompt sandwiching |
| **Bias amplification** | Audit outputs across demographics; add counterfactual tests |
| **Privacy leakage** | Redact PII before logging; use on-device models for sensitive data |
| **Over-reliance** | Always show the source; let users edit before sending |

> 📝 **Note** - The EU AI Act (2025) and Vietnam's AI Decree (2026) both require **transparency** about AI involvement. Any HaiEduTech feature using an agent should label itself clearly: *"Generated by AI - please verify."*

## 8. 🏆 Final Capstone - Build your own NLP agent

Combine **everything** from Lessons 1-12 into one agent:

1. **Tokenize** user input (Lesson 2).
2. **Classify intent** with a fine-tuned classifier (Lesson 4).
3. **RAG** over your knowledge base (Lesson 9).
4. **Call tools** (Lesson 12) for actions you cannot do with text alone.
5. **Speak the answer** with TTS (Lesson 10).
6. **Save the conversation** as embeddings in pgvector (Lesson 11) for memory.

Earn the **🤖 NLP Master Architect** badge by shipping this on Lovable Cloud and adding it to your portfolio.

## 9. Key Concept

> 🎯 **Key Concept** - An **agent** = LLM + **tools** + **memory** + **loop**. Production NLP is 10% model and 90% engineering: prompts, retrieval, validation, safety, observability, cost, latency. Master those layers and you ship products users trust.`,
        theoryEn: "",
        code: `# Một agent tối thiểu, có thể chạy được chỉ với khoảng 50 dòng code sử dụng Lovable AI Gateway.
# Agent này có thể trả lời câu hỏi và gọi hai công cụ: tìm kiếm web (được mô phỏng) và một máy tính.

# Nhập các thư viện cần thiết.
import os # Thư viện để tương tác với hệ điều hành, ví dụ đọc biến môi trường.
import json # Thư viện để làm việc với dữ liệu JSON (chuyển đổi giữa chuỗi và đối tượng Python).
import requests # Thư viện để gửi các yêu cầu HTTP (ví dụ: gọi API).

# Lấy khóa API từ biến môi trường hoặc sử dụng giá trị mặc định.
# LOVABLE_API_KEY là khóa xác thực để truy cập Lovable AI Gateway.
LOVABLE_API_KEY = os.environ.get("LOVABLE_API_KEY", "PUT_YOUR_KEY_HERE")
# GATEWAY là URL của Lovable AI Gateway API endpoint.
GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions"

# ---------- 1. Định nghĩa các công cụ (tools) ----------
# TOOLS là một danh sách các công cụ mà AI agent có thể sử dụng.
# Mỗi công cụ được định nghĩa với tên, mô tả và các tham số đầu vào.
TOOLS = [
    {
        "type": "function", # Loại công cụ là một hàm.
        "function": {
            "name": "calculator", # Tên của công cụ.
            "description": "Evaluate a Python arithmetic expression and return the number.", # Mô tả công cụ.
            "parameters": { # Định nghĩa các tham số đầu vào của công cụ.
                "type": "object", # Tham số là một đối tượng.
                "properties": {"expression": {"type": "string"}}, # Có một thuộc tính 'expression' kiểu chuỗi.
                "required": ["expression"], # Tham số 'expression' là bắt buộc.
            },
        },
    },
    {
        "type": "function", # Loại công cụ là một hàm.
        "function": {
            "name": "search_haiedutech", # Tên của công cụ.
            "description": "Search HaiEduTech lessons. Returns a list of titles.", # Mô tả công cụ.
            "parameters": { # Định nghĩa các tham số đầu vào của công cụ.
                "type": "object", # Tham số là một đối tượng.
                "properties": {"query": {"type": "string"}}, # Có một thuộc tính 'query' kiểu chuỗi.
                "required": ["query"], # Tham số 'query' là bắt buộc.
            },
        },
    },
]

# ---------- 2. Triển khai các công cụ (trong thực tế: gọi pgvector / API) ----------
# Hàm calculator: nhận một biểu thức chuỗi và trả về kết quả tính toán.
# Đầu vào: expression (chuỗi) - biểu thức toán học.
# Đầu ra: chuỗi kết quả của biểu thức hoặc thông báo lỗi.
def calculator(expression: str) -> str:
    try:
        # KHÔNG BAO GIỜ sử dụng eval() trong môi trường sản phẩm mà không có sandbox bảo mật.
        # Ở đây, chúng ta giới hạn eval chỉ có thể truy cập các hàm tích hợp và không có biến cục bộ/toàn cục.
        return str(eval(expression, {"__builtins__": {}}, {}))
    except Exception as e:
        # Bắt lỗi nếu biểu thức không hợp lệ.
        return f"error: {e}"

# Hàm search_haiedutech: mô phỏng việc tìm kiếm các bài học của HaiEduTech.
# Đầu vào: query (chuỗi) - từ khóa tìm kiếm.
# Đầu ra: chuỗi JSON chứa danh sách các tiêu đề bài học.
def search_haiedutech(query: str) -> str:
    # Đây là một hàm mô phỏng - trong thực tế, nó sẽ được thay thế bằng một cuộc gọi RAG (Retrieval Augmented Generation)
    # sử dụng pgvector hoặc một API tìm kiếm thực tế.
    return json.dumps([
        "IELTS Speaking Roadmap",
        "PTE Hub progress rings",
        "AI Speaking Coach",
    ])

# Ánh xạ tên công cụ với hàm thực thi tương ứng.
# TOOL_FNS là một từ điển giúp gọi đúng hàm khi AI yêu cầu sử dụng một công cụ.
TOOL_FNS = {"calculator": calculator, "search_haiedutech": search_haiedutech}

# ---------- 3. Vòng lặp của agent ----------
# Hàm agent: thực hiện vòng lặp tương tác với AI Gateway để đạt được mục tiêu.
# Đầu vào:
#   - goal (chuỗi): Mục tiêu hoặc câu hỏi của người dùng.
#   - max_steps (số nguyên): Số bước tối đa mà agent sẽ thực hiện.
# Đầu ra: chuỗi câu trả lời cuối cùng từ AI hoặc thông báo nếu đạt đến max_steps.
def agent(goal: str, max_steps: int = 5) -> str:
    # Khởi tạo danh sách tin nhắn hội thoại.
    # Tin nhắn hệ thống định nghĩa vai trò của AI.
    # Tin nhắn người dùng chứa mục tiêu ban đầu.
    messages = [
        {"role": "system", "content": "You are a HaiEduTech study assistant. "
            "Use tools when helpful. Always end with a clear final answer."},
        {"role": "user", "content": goal},
    ]
    # Bắt đầu vòng lặp để xử lý các bước của agent.
    for step in range(max_steps):
        # Gửi yêu cầu POST đến Lovable AI Gateway.
        # Đầu vào:
        #   - GATEWAY: URL của API.
        #   - headers: Chứa khóa xác thực và loại nội dung.
        #   - json: Dữ liệu gửi đi dưới dạng JSON, bao gồm model, tin nhắn, công cụ và cách chọn công cụ.
        #   - timeout: Thời gian chờ tối đa cho yêu cầu.
        r = requests.post(
            GATEWAY,
            headers={"Authorization": f"Bearer {LOVABLE_API_KEY}",
                     "Content-Type": "application/json"},
            json={
                "model": "google/gemini-3-flash-preview", # Model AI được sử dụng.
                "messages": messages, # Lịch sử hội thoại.
                "tools": TOOLS, # Danh sách các công cụ có sẵn.
                "tool_choice": "auto", # Cho phép AI tự động chọn công cụ nếu cần.
            },
            timeout=30,
        ).json() # Chuyển đổi phản hồi JSON thành đối tượng Python.

        # Lấy tin nhắn phản hồi từ AI.
        msg = r["choices"][0]["message"]
        # Thêm tin nhắn của AI vào lịch sử hội thoại.
        messages.append(msg)

        # Kiểm tra xem model có muốn gọi công cụ nào không.
        # tool_calls sẽ là một danh sách nếu AI muốn gọi công cụ, nếu không sẽ là None hoặc rỗng.
        tool_calls = msg.get("tool_calls") or []
        if not tool_calls:
            # Nếu không có cuộc gọi công cụ nào, nghĩa là AI đã đưa ra câu trả lời cuối cùng.
            # Đầu ra: nội dung của tin nhắn AI.
            return msg.get("content", "(empty)")

        # Lặp qua từng cuộc gọi công cụ mà AI yêu cầu.
        for call in tool_calls:
            name = call["function"]["name"] # Tên của công cụ cần gọi.
            # Phân tích cú pháp các đối số của công cụ từ chuỗi JSON.
            args = json.loads(call["function"]["arguments"] or "{}")
            # Gọi hàm công cụ tương ứng và lưu kết quả.
            # Đầu vào: các đối số được giải nén từ 'args'.
            result = TOOL_FNS[name](**args)
            # In ra thông tin về bước hiện tại, công cụ được gọi và kết quả.
            print(f"  step {step}: {name}({args}) -> {result[:80]}")
            # Thêm kết quả của công cụ vào lịch sử hội thoại dưới dạng tin nhắn "tool".
            messages.append({
                "role": "tool", # Vai trò là công cụ.
                "tool_call_id": call["id"], # ID của cuộc gọi công cụ.
                "content": str(result), # Nội dung là kết quả của công cụ.
            })
    # Nếu vòng lặp kết thúc mà không có câu trả lời cuối cùng, nghĩa là đã đạt đến số bước tối đa.
    # Đầu ra: thông báo lỗi.
    return "Reached max_steps without a final answer."

# ---------- 4. Thử nghiệm ----------
# Gọi hàm agent với một câu hỏi kết hợp cả tính toán và tìm kiếm.
# Đầu vào: "What is 17 * 23 + 4? And which HaiEduTech lessons cover IELTS Speaking?"
print(agent("What is 17 * 23 + 4? And which HaiEduTech lessons cover IELTS Speaking?"))

# Hành vi mong đợi:
#   bước 0: AI gọi công cụ calculator với biểu thức "17*23+4" và nhận kết quả là 395.
#   bước 1: AI gọi công cụ search_haiedutech với truy vấn "IELTS Speaking" và nhận danh sách các bài học.
#   bước 2: AI tổng hợp cả hai kết quả và đưa ra câu trả lời cuối cùng.
# Đầu ra mong đợi: Một câu trả lời tổng hợp từ AI.
`,
        codeLanguage: "python",
        exercise: "🏆 **Capstone challenge** - Add a **third tool** named `save_to_notebook(title: str, content: str)` that appends a row to your Smart Notebook (mock it with a Python list for now). Ask the agent: *\"Plan my IELTS Speaking practice for tomorrow and save it to my notebook.\"* Confirm the agent calls all three tools in the right order. Then write 3 sentences on **what could go wrong** in production (cost, prompt injection, infinite loops) and how you would mitigate each.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does the **ReAct** pattern stand for in modern AI agents?",
            options: [
              "React.js + Active",
              "**Reason + Act** - the LLM alternates between thinking out loud and calling tools, looping until done",
              "Real-time Actuator",
              "Recursive Abstract Calling Tree",
            ],
            answer: 1,
            explanation: "ReAct (Yao et al., 2022) interleaves a 'thought' step (LLM reasoning) with an 'action' step (tool call), then observes the result and reasons again. It is the foundation of nearly every modern agent framework.",
          },
          {
            question: "Why is structured tool calling preferred over parsing prose for agent actions?",
            options: [
              "It uses fewer tokens",
              "It returns a typed JSON object - your code can reliably extract the function name and arguments without brittle string parsing",
              "It eliminates the need for an LLM",
              "It only works with OpenAI",
            ],
            answer: 1,
            explanation: "Tool calling has the model emit a strict JSON schema describing the function and arguments. The application validates and executes it directly, eliminating regex hacks and prompt-injection failure modes that come with parsing prose.",
          },
          {
            question: "If each agent step succeeds 95% of the time, what is the end-to-end success rate over 5 chained steps?",
            options: [
              "95%",
              "Roughly 77% (0.95^5)",
              "100% - the agent will retry",
              "5%",
            ],
            answer: 1,
            explanation: "Independent step probabilities multiply: 0.95^5 ≈ 0.77. This is why agents need max_step caps, tool-result caching, validation guardrails, and a human-in-the-loop for irreversible actions.",
          },
        ],
      },
    ],
  },
];
