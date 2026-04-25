// Natural Language Processing curriculum - 6 expert-level lessons (English long-read).
// Bridges Deep Learning (RNN/Transformers) and applied Software Engineering.
// Audience: students who finished Python basics and want to understand how
// search engines, voice assistants, and LLMs actually read human text in 2026.
import type { ExtendedProgrammingModule } from "./types";

export const nlpModules: ExtendedProgrammingModule[] = [
  {
    id: "nlp-foundations",
    title: "Natural Language Processing",
    titleEn: "Natural Language Processing",
    icon: "🗣️",
    color: "from-cyan-500 to-blue-600",
    description: "How computers read, write, and understand human language - from tokens to LLMs.",
    descriptionEn: "How computers read, write, and understand human language - from tokens to LLMs.",
    course: "nlp",
    lessons: [
      // ========================================================================
      // Lesson 1 - Introduction to NLP
      // ========================================================================
      {
        id: "nlp-1",
        title: "Introduction to NLP",
        titleEn: "Introduction to NLP",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - Comfort with Python (lists, dicts, list-comprehensions). No linguistics background required.

## 1. What is NLP?

**Natural Language Processing (NLP)** is the branch of AI that teaches machines to read, write, and reason about *human* language - the messy kind, full of slang, sarcasm, and grammar that breaks its own rules. NLP powers Google Search, Gmail's autocomplete, Siri, ChatGPT, real-time translation, spam filters, and the AI Speaking Coach you are using on **HaiEduTech** right now.

Formally, NLP sits at the intersection of three fields:

\`\`\`mermaid
graph LR
    L[Linguistics<br/>How language works] --> N
    C[Computer Science<br/>Algorithms & data] --> N
    M[Machine Learning<br/>Patterns from data] --> N
    N((NLP))
\`\`\`

## 2. Why is human language hard for computers?

Computers are great at numbers and rigid grammars (Python, SQL). Human language breaks every rule a programmer would expect:

| Challenge | Example | Why it's hard |
|---|---|---|
| **Ambiguity** | *"I saw the man with the telescope."* | Did I use the telescope, or did the man have one? |
| **Context** | *"It's freezing."* | A complaint, a fact, or a hint to close the window? |
| **Morphology** | Finnish *"taloissanikin"* = *"in my houses too"* | One word = 5 English words glued together. |
| **No spaces** | Chinese *"我喜欢学习"* | Where does each "word" start and end? |
| **Sarcasm & idioms** | *"Great, another Monday."* | Surface-positive, real sentiment negative. |
| **Code-switching** | *"Tao đi học bài rồi vibing chill."* | Mixes Vietnamese + English in one sentence. |

> 🎯 **Key insight** - NLP is not just *parsing English*. It is teaching a model to handle **every** human language with all its quirks. Finnish, Chinese, and Vietnamese are excellent stress-tests precisely because they break the assumptions an English-only system makes.

## 3. The classical NLP pipeline

Before LLMs, every NLP system followed roughly the same five-stage pipeline. You still see it inside modern systems - it just runs *under* a neural network now.

\`\`\`mermaid
graph LR
    A["Raw text<br/>(Hello, world!)"] --> B[Preprocessing<br/>tokenize, clean]
    B --> C[Linguistic features<br/>POS, lemma, syntax]
    C --> D[Vector representation<br/>BoW, TF-IDF, embeddings]
    D --> E[Model<br/>classifier, RNN, Transformer]
    E --> F[Output<br/>label, translation, answer]
\`\`\`

## 4. Two waves of NLP

| Era | Approach | Strengths | Weaknesses |
|---|---|---|---|
| **Symbolic (1950s–2000s)** | Hand-written grammar rules, dictionaries | Transparent, controllable | Brittle, can't scale to every language |
| **Statistical (2000s–2017)** | Count words, n-grams, logistic regression | Robust to noise | Misses long-range meaning |
| **Neural (2018+)** | Word embeddings, RNNs, **Transformers, LLMs** | Captures context, multilingual | Huge compute, opaque, can hallucinate |

The 2017 paper *"Attention Is All You Need"* (Transformers) is the inflection point. Everything you call "AI" today - ChatGPT, Gemini, Claude, Copilot - is a Transformer trained on terabytes of text.

## 5. Real-world use case - How Google Search reads your query

When you type *"best phở near me open now"*, Google does NOT do a literal string match. Behind the scenes:

1. **Tokenize** - split into ["best", "phở", "near", "me", "open", "now"].
2. **Normalize** - lowercase, handle the diacritic *ở*.
3. **Embed** - convert each word into a 768-dimensional vector that captures *meaning*.
4. **Intent classify** - recognise this as a *local restaurant search*.
5. **Entity extract** - *phở* = cuisine, *near me* = location, *open now* = filter.
6. **Rank** - combine semantic similarity with location and opening hours.

That entire flow is NLP. We will build simplified versions of every step in this module.

## 6. What you will build in this module

| Lesson | Skill | Output |
|---|---|---|
| 1 | **Foundations** (this lesson) | Mental model + Python warm-up |
| 2 | **Preprocessing** | Tokenizer that handles English, Finnish, and Chinese |
| 3 | **Representation** | TF-IDF + Word2Vec semantic search |
| 4 | **Sentiment Analysis** | Classify product / lesson reviews 👍 / 👎 |
| 5 | **Sequence Modeling** | LSTM that finishes a sentence |
| 6 | **Transformers & LLMs** | Fine-tune BERT, prompt a 2026 LLM |

> 🏆 **Capstone** - At the end of Lesson 6 you will build a *Finnish-to-English sentiment analyser* that demonstrates every concept in one notebook.

## 7. Key Concept

> 🎯 **Key Concept** - NLP turns **unstructured text** (human messy language) into **structured signals** (numbers, labels, vectors) that downstream code can act on. Every NLP system is some variant of *text → tokens → vectors → model → answer*.`,
        theoryEn: "",
        code: `# A 60-second taste of NLP using only the Python standard library.
# We classify a movie review as positive / negative using a hand-crafted lexicon.
# This is exactly how the FIRST generation of sentiment systems worked in the 1990s.
import re
from collections import Counter

POSITIVE_LEXICON = {"great", "love", "amazing", "excellent", "awesome", "good", "fantastic"}
NEGATIVE_LEXICON = {"bad", "boring", "awful", "terrible", "hate", "worst", "poor"}

def tokenize(text: str) -> list[str]:
    """Lowercase + extract word characters only. Strips punctuation and emojis."""
    return re.findall(r"[a-z\\u00C0-\\u1EF9]+", text.lower())

def naive_sentiment(text: str) -> str:
    tokens = tokenize(text)
    counts = Counter(tokens)
    pos_hits = sum(counts[w] for w in POSITIVE_LEXICON if w in counts)
    neg_hits = sum(counts[w] for w in NEGATIVE_LEXICON if w in counts)
    if pos_hits > neg_hits:
        return "positive"
    if neg_hits > pos_hits:
        return "negative"
    return "neutral"

# Try it on three reviews
reviews = [
    "Teacher Hai's lesson was AMAZING - I love how clearly he explains tokenization.",
    "The chatbot was boring and the answers were terrible.",
    "It exists. I have no opinion.",
]
for r in reviews:
    print(f"{naive_sentiment(r):>8} | {r}")

# Why this is naive:
#   - "not bad" → counts as negative because of "bad"
#   - "It is not great" → still counts as positive
#   - Cannot generalise to a word it has never seen ("phenomenal", "lit")
# Lessons 2-6 fix every one of these problems with real NLP techniques.`,
        codeLanguage: "python",
        exercise: "Run the snippet on the 3 sample reviews. Then add the sentence *\"This is not bad at all.\"* - explain why the naive lexicon fails on negation, and propose **two** rules you could add to fix it (without using machine learning yet).",
        exerciseEn: "",
        quiz: [
          {
            question: "Which problem makes Chinese text uniquely difficult for traditional NLP pipelines?",
            options: [
              "Chinese has no vowels",
              "Chinese has no whitespace between words, so tokenization itself is a learned task",
              "Chinese only uses one character per sentence",
              "Chinese is read right-to-left",
            ],
            answer: 1,
            explanation: "Languages like English use spaces as natural word boundaries. Chinese (and Japanese, Thai) write characters continuously - '我喜欢学习' has 4 'words' but no spaces, so a Chinese tokenizer must use a dictionary or a learned segmenter (e.g., jieba).",
          },
          {
            question: "Why do we say modern NLP is 'neural'?",
            options: [
              "Because it requires brain implants",
              "Because models learn dense vector representations of text via neural networks (embeddings, Transformers)",
              "Because it only runs on biological hardware",
              "Because it ignores statistics entirely",
            ],
            answer: 1,
            explanation: "From 2018 onwards, the dominant approach has been training neural networks (mostly Transformers) on huge text corpora to produce contextual word embeddings. ChatGPT, Gemini, and BERT are all neural NLP systems.",
          },
          {
            question: "Which classical NLP pipeline stage is responsible for converting tokens into numbers a model can consume?",
            options: ["Preprocessing", "Linguistic features", "Vector representation", "Output decoding"],
            answer: 2,
            explanation: "Models can only read numbers. The 'representation' stage (Bag-of-Words, TF-IDF, word embeddings) is what turns the discrete tokens into vectors. We build it in Lesson 3.",
          },
        ],
      },

      // ========================================================================
      // Lesson 2 - Text Preprocessing (with Finnish & Chinese examples)
      // ========================================================================
      {
        id: "nlp-2",
        title: "Text Preprocessing",
        titleEn: "Text Preprocessing",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - Lesson 1 (Introduction to NLP) and Python list comprehensions.

## 1. Why preprocess at all?

Raw human text is hostile to a model: capitalisation, punctuation, emojis, typos, HTML tags, two ways to spell *colour/color*, Vietnamese diacritics, Finnish vowel harmony. **Preprocessing** is the first defence: we standardise text into clean, predictable tokens before any learning happens.

\`\`\`mermaid
graph LR
    A["Hi! I'm loving NLP 🚀"] --> T[Tokenize]
    T --> N[Normalize<br/>lowercase, strip]
    N --> S[Stop-words<br/>remove the/a/is]
    S --> L[Lemmatize<br/>loving → love]
    L --> O["love nlp"]
\`\`\`

## 2. Tokenization - splitting text into atoms

A **token** is the smallest unit a model sees. For English this is *usually* a word, but the right strategy depends on the language.

| Language | Strategy | Library | Why |
|---|---|---|---|
| English | Whitespace + punctuation | \`nltk.word_tokenize\` | Words are space-separated. |
| **Finnish** | Whitespace, but lemmatize hard | \`spacy "fi_core_news_sm"\` or **Voikko** | Heavy inflection: *taloissani* → *talo* (house). |
| **Chinese** | **Word segmentation** (no spaces!) | \`jieba\` | *"我喜欢学习NLP"* must be split into *我 / 喜欢 / 学习 / NLP*. |
| Vietnamese | Whitespace + multi-syllable joiner | \`underthesea\` | *"học sinh"* (student) is **one** word, not two. |
| Modern LLMs | **Subword (BPE / SentencePiece)** | \`tiktoken\`, \`tokenizers\` | Splits *unhappiness* → *un*, *happi*, *ness* - works for every language and every typo. |

> 🇫🇮 **Finnish challenge - Consonant Gradation** - Finnish nouns change *inside* the word as they decline:
> *katu* (street) → *kadulla* (on the street). The \`t\` becomes a \`d\`. A naive splitter would treat these as two unrelated words. A real Finnish tokenizer (or a subword tokenizer) lets the model recognise the shared root.

> 🇨🇳 **Chinese challenge - Word segmentation** - *"上海大学城书店"* could mean *"Shanghai University Town Bookstore"* or *"Shanghai University City Bookstore"*. \`jieba\` uses a dictionary + statistical model to pick the most likely split.

## 3. Normalization - collapsing surface forms

Same meaning, many spellings:

\`\`\`text
"USA" → "usa"
"Don't" → "do not"
"☕️" → "coffee"   (optional)
"phở" → keep diacritic for VI; strip it only if your downstream model is ASCII-only
\`\`\`

Common normalization steps: **lowercase**, **Unicode NFC**, expand contractions, strip URLs/HTML, and handle emojis (delete or convert to text).

## 4. Stop-word removal - the boring 100 words

A handful of words (*the, a, is, of, và, không, ja, että*) appear in almost every sentence and carry **almost no signal** for tasks like topic classification. Removing them shrinks the vocabulary and speeds up training.

> ⚠️ **Trap** - Do **not** remove stop-words for **sentiment** or **machine translation** tasks. *"This is **not** good"* and *"This is good"* differ by exactly one stop-word. NLTK's default list strips *not* - disaster.

## 5. Stemming vs Lemmatization - getting to the root

Both reduce *running, ran, runs* to the root *run*. The difference matters:

| | Stemming | Lemmatization |
|---|---|---|
| How | Chops suffixes with rules (Porter, Snowball) | Looks the word up in a dictionary, considers POS |
| Speed | Very fast | Slower (needs a model) |
| Accuracy | Aggressive, often produces non-words (*studi*) | Returns real words (*study*) |
| Best for | Search indexing, info retrieval | Anything user-facing, multilingual NLP |

> 🇫🇮 Lemmatization is **essential** for Finnish: *taloissanikin* (in my houses too) lemmatizes to *talo*. Without it, your model sees thousands of "different" words that all mean the same thing.

## 6. Putting it all together

\`\`\`mermaid
graph TD
    R[Raw review:<br/>'I LOVED Teacher Hai's<br/>NLP lesson!! 🚀'] --> P1[Lowercase + strip punct]
    P1 --> P2["i loved teacher hai's nlp lesson"]
    P2 --> T[Tokenize]
    T --> P3["[i, loved, teacher, hai's, nlp, lesson]"]
    P3 --> S[Stop-word filter<br/>remove 'i']
    S --> L[Lemmatize<br/>loved → love]
    L --> P4["[love, teacher, hai's, nlp, lesson]"]
\`\`\`

## 7. Key Concept

> 🎯 **Key Concept** - Preprocessing is **task-dependent and language-dependent**. The right pipeline for **English topic classification** is the wrong pipeline for **Finnish translation** or **Chinese sentiment**. Modern subword tokenizers (used by every LLM) sidestep most of these problems by working below the word level.`,
        theoryEn: "",
        code: `# A multilingual preprocessing pipeline using NLTK + a tiny demo of jieba (Chinese).
# Install (run once in a notebook):  pip install nltk jieba
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Download data the first time
for pkg in ["punkt", "punkt_tab", "stopwords", "wordnet"]:
    try:
        nltk.data.find(pkg)
    except LookupError:
        nltk.download(pkg, quiet=True)

EN_STOPS = set(stopwords.words("english")) - {"not", "no", "never"}  # keep negations!
lemmatizer = WordNetLemmatizer()

def preprocess_english(text: str) -> list[str]:
    """Lowercase → strip URLs/punct → tokenize → drop stop-words → lemmatize."""
    text = text.lower()
    text = re.sub(r"http\\S+", " ", text)              # remove URLs
    text = re.sub(r"[^a-z\\s']", " ", text)            # keep apostrophes for don't, it's
    tokens = word_tokenize(text)
    tokens = [t for t in tokens if t not in EN_STOPS and len(t) > 1]
    tokens = [lemmatizer.lemmatize(t, pos="v") for t in tokens]   # verb-form lemmas
    return tokens

review = "I was LOVING Teacher Hai's NLP lessons!! Visit https://haiedutech.com for more 🚀"
print("English  :", preprocess_english(review))
# → ['love', 'teacher', 'hai', "'s", 'nlp', 'lesson', 'visit', 'haiedutech.com']

# ------------------------------------------------------------------
# Chinese segmentation - the killer demo. Spaces don't exist in Chinese.
# ------------------------------------------------------------------
import jieba
chinese = "我喜欢在HaiEduTech学习自然语言处理"
print("Chinese  :", list(jieba.cut(chinese)))
# → ['我', '喜欢', '在', 'HaiEduTech', '学习', '自然语言', '处理']

# ------------------------------------------------------------------
# Finnish - heavy morphology. Without a lemmatizer, every inflected form
# looks like a brand-new word to the model.
# ------------------------------------------------------------------
finnish_words = ["talo", "talossa", "taloissanikin"]   # house, in the house, in my houses too
print("Finnish (raw)        :", finnish_words)
# A real Finnish lemmatizer (spaCy + fi_core_news_sm or Voikko) would map all three to 'talo'.`,
        codeLanguage: "python",
        exercise: "Modify `preprocess_english` to **also strip emojis**. Then run it on a multilingual sentence: *\"Học NLP cùng Teacher Hai is amazing 🚀\"*. Explain in 2 sentences why an English-only pipeline mangles Vietnamese diacritics - and what you would change to handle both.",
        exerciseEn: "",
        quiz: [
          {
            question: "Which preprocessing step would silently destroy a sentiment-analysis dataset?",
            options: [
              "Lowercasing",
              "Removing the default English stop-word list, which includes 'not' and 'no'",
              "Removing URLs",
              "Lemmatizing verbs",
            ],
            answer: 1,
            explanation: "Default stop-word lists usually include negations. 'I do not like this' becomes 'like this' after stop-word removal - flipping the label. Always curate the stop-word list per task.",
          },
          {
            question: "Why is `jieba` (or a similar segmenter) mandatory for Chinese NLP?",
            options: [
              "Chinese characters are too small to read",
              "Chinese text contains no whitespace, so a model needs help finding word boundaries",
              "Chinese is encoded in EBCDIC",
              "Chinese has no nouns",
            ],
            answer: 1,
            explanation: "Whitespace tokenization works for English; for Chinese it would treat the entire sentence as one token. Tools like jieba use a dictionary plus a statistical model to segment characters into words.",
          },
          {
            question: "What is the main advantage of lemmatization over stemming for Finnish?",
            options: [
              "It's faster",
              "It returns real dictionary words and unifies the many inflected forms (taloissani, talossa → talo)",
              "It removes diacritics automatically",
              "It only works for English",
            ],
            answer: 1,
            explanation: "Stemming chops suffixes with rules and often produces non-words. Finnish has dozens of inflected forms per noun; only a dictionary-based lemmatizer can collapse them to one root for the model to learn from.",
          },
        ],
      },

      // ========================================================================
      // Lesson 3 - Text Representation
      // ========================================================================
      {
        id: "nlp-3",
        title: "Text Representation: BoW, TF-IDF & Embeddings",
        titleEn: "Text Representation: BoW, TF-IDF & Embeddings",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - Lesson 2 (Preprocessing) and basic NumPy / vectors.

## 1. The core problem

A neural network only understands **numbers**. Lesson 2 gave us clean tokens; this lesson turns tokens into **vectors** that capture *meaning*. Three families dominate, in increasing order of cleverness:

\`\`\`mermaid
graph LR
    BoW[Bag of Words<br/>counts] --> TFIDF[TF-IDF<br/>weighted counts]
    TFIDF --> EMB[Word Embeddings<br/>Word2Vec, GloVe, BERT]
\`\`\`

## 2. Bag of Words (BoW) - the "hello world" of text vectors

Build a vocabulary of every unique token in the corpus, then represent each document as a vector of **counts**.

\`\`\`text
Doc1: "I love NLP"
Doc2: "I love Finnish"

Vocabulary:  [I, love, NLP, Finnish]
Doc1 vector: [1, 1, 1, 0]
Doc2 vector: [1, 1, 0, 1]
\`\`\`

| ✅ Pros | ❌ Cons |
|---|---|
| Trivial to implement | Ignores word order ("dog bites man" = "man bites dog") |
| Works with classical ML (logistic regression, SVM) | Vectors get huge and sparse (vocab can hit 100k+) |
| Great baseline | "love" and "adore" are completely unrelated |

## 3. TF-IDF - the smart count

**TF-IDF** = *Term Frequency × Inverse Document Frequency*. It down-weights words that appear everywhere ("the", "is") and boosts words that are rare-but-meaningful ("transformer", "lemmatize").

The formula in plain text: $tfidf(t, d) = tf(t, d) \\times \\log(N / df(t))$, where $tf$ counts how often term $t$ appears in document $d$, $N$ is the total number of documents, and $df$ counts how many documents contain $t$.

> 🎯 **Intuition** - A word that appears in *every* document is worthless for telling documents apart. A word that appears in only *one* is a strong fingerprint. TF-IDF rewards the second.

TF-IDF is still the **default baseline in 2026** for tasks like search ranking, FAQ matching, and small-data classification. It is hard to beat without a lot of data.

## 4. Word embeddings - geometry of meaning

BoW and TF-IDF give every word an **independent** dimension. *"king"* and *"queen"* are as unrelated as *"king"* and *"banana"*. **Word embeddings** instead place each word at a point in a low-dimensional space (typically 100-300 dimensions) where **distance = semantic similarity**.

\`\`\`text
king − man + woman ≈ queen
Helsinki − Finland + Vietnam ≈ Hanoi
\`\`\`

| Model | Year | Idea |
|---|---|---|
| **Word2Vec** (Google) | 2013 | Predict surrounding words from a centre word (Skip-gram), or vice versa (CBOW). |
| **GloVe** (Stanford) | 2014 | Factorise the global word co-occurrence matrix. |
| **FastText** (Facebook) | 2016 | Word2Vec + character n-grams. Robust to typos and morphology. **Excellent for Finnish.** |
| **BERT / contextual** | 2018+ | The vector for "bank" depends on the sentence ("river bank" vs "JP Morgan bank"). |

\`\`\`mermaid
graph TD
    A[king] -.short distance.-> B[queen]
    A -.short distance.-> C[prince]
    A -.long distance.-> D[banana]
    B -.short distance.-> E[princess]
\`\`\`

## 5. Real-world use case - Semantic search on HaiEduTech

The Global Search bar (Cmd/Ctrl+K) on this very site uses TF-IDF + cosine similarity to match your query against ~500 lessons. A 2026 upgrade path is to switch to **OpenAI \`text-embedding-3-small\`** or **Google \`text-embedding-004\`**: pre-compute one 1536-d vector per lesson, store it in **pgvector**, and the search query gets the same treatment. Cosine distance ranks the results.

## 6. Choosing a representation in 2026

| Situation | Use |
|---|---|
| Small dataset (<10k docs), need explainable | **TF-IDF + Logistic Regression** |
| Need semantic similarity, large corpus | **Sentence embeddings** (\`sentence-transformers\`, OpenAI, Cohere) |
| Multilingual app | **Multilingual-E5** or **LaBSE** (works across 100+ languages) |
| Inside an LLM | The model's own learned **subword embeddings** |

## 7. Key Concept

> 🎯 **Key Concept** - Going from **BoW → TF-IDF → embeddings** is a journey from *counting words* to *measuring meaning*. Modern systems still use all three: TF-IDF for fast filtering, embeddings for ranking, LLMs for generation.`,
        theoryEn: "",
        code: `# Compare BoW, TF-IDF, and a small Word2Vec embedding on 4 mini-documents.
# pip install scikit-learn gensim
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec

corpus = [
    "Teacher Hai teaches NLP and Python",
    "Teacher Hai teaches IELTS speaking",
    "I love studying machine learning",
    "Machine learning is the future of AI",
]

# 1. Bag of Words --------------------------------------------------------
bow = CountVectorizer()
X_bow = bow.fit_transform(corpus)
print("Vocab :", bow.get_feature_names_out())
print("BoW   :\\n", X_bow.toarray())

# 2. TF-IDF --------------------------------------------------------------
tfidf = TfidfVectorizer()
X_tfidf = tfidf.fit_transform(corpus)
sim = cosine_similarity(X_tfidf[0], X_tfidf)[0]
print("\\nTF-IDF cosine similarity (Doc 0 vs others):", sim.round(3))
# Expect: Doc0 most similar to Doc1 (both about Teacher Hai)

# 3. Word2Vec ------------------------------------------------------------
sentences = [s.lower().split() for s in corpus]
w2v = Word2Vec(sentences, vector_size=50, window=3, min_count=1, epochs=200, sg=1)
print("\\nWord2Vec - words most similar to 'nlp':")
print(w2v.wv.most_similar("nlp", topn=3))

# 4. Vector arithmetic - the famous king − man + woman demo
# (works only with a much larger pre-trained model, e.g. Google News)
# from gensim.downloader import load
# big_w2v = load("word2vec-google-news-300")
# print(big_w2v.most_similar(positive=["king", "woman"], negative=["man"], topn=1))`,
        codeLanguage: "python",
        exercise: "Add a 5th document to the corpus: *\"Python is a great language for AI.\"* Re-run the TF-IDF block and explain (a) which document it is now most similar to and (b) why TF-IDF down-weights the word *is* even though it appears in many sentences.",
        exerciseEn: "",
        quiz: [
          {
            question: "What does the IDF (Inverse Document Frequency) part of TF-IDF accomplish?",
            options: [
              "It boosts very common words",
              "It penalises words that appear in many documents and rewards rare, distinctive ones",
              "It removes stop-words automatically",
              "It converts text to lowercase",
            ],
            answer: 1,
            explanation: "IDF = log(N / df). A word in every document has IDF ≈ 0 and contributes nothing. A word in 1 of 1000 documents has a large IDF and dominates that document's signature.",
          },
          {
            question: "Why are word embeddings considered an upgrade over Bag of Words?",
            options: [
              "They use less memory than BoW",
              "They place semantically related words close together in vector space, capturing meaning",
              "They eliminate the need for tokenization",
              "They only work for English",
            ],
            answer: 1,
            explanation: "BoW gives each word an independent dimension. Embeddings learn from co-occurrence patterns so that 'king' and 'queen' end up nearby, enabling semantic search and analogies.",
          },
          {
            question: "Which representation would you pick for a multilingual semantic search across English, Finnish, and Vietnamese?",
            options: [
              "Bag of Words on each language separately",
              "Stemming + cosine similarity",
              "A multilingual sentence embedding model (e.g. multilingual-E5, LaBSE)",
              "ASCII Hex encoding",
            ],
            answer: 2,
            explanation: "Multilingual sentence embeddings map sentences from 100+ languages into a shared vector space, so a Finnish query can retrieve a Vietnamese answer if the meaning matches.",
          },
        ],
      },

      // ========================================================================
      // Lesson 4 - Sentiment Analysis
      // ========================================================================
      {
        id: "nlp-4",
        title: "Sentiment Analysis",
        titleEn: "Sentiment Analysis",
        level: 4,
        difficulty: "intermediate",
        theory: `> 💡 **Prerequisites** - Lesson 3 (Text Representation) and basic scikit-learn.

## 1. What problem are we solving?

**Sentiment Analysis** asks one of NLP's most commercially valuable questions: *"Is the writer happy, angry, or neutral?"* Applications you use every day:

- Amazon / Shopee surfaces 1-star vs 5-star reviews automatically.
- HaiEduTech could flag negative lesson feedback for the teacher to review.
- Twitter / X tracks brand sentiment in real time.
- The PTE essay grader on this site uses sentiment + style cues.

Sentiment is usually framed as **classification**: input = text, output = label (\`positive | negative | neutral\`) or a 1-5 star score.

## 2. Three generations of sentiment analysis

| Era | Method | Example | Accuracy on movie reviews |
|---|---|---|---|
| 1990s | **Lexicon look-up** (count positive vs negative words) | VADER, AFINN | ~70% |
| 2000s-2010s | **TF-IDF + Logistic Regression** | scikit-learn | ~85% |
| 2018+ | **Transformer fine-tune** (BERT, RoBERTa) | Hugging Face | ~95%+ |
| 2024+ | **Zero-shot LLM prompting** (GPT-5, Gemini) | "Classify this review:" | ~93% (no training data!) |

\`\`\`mermaid
graph LR
    R[Review text] --> P[Preprocess]
    P --> V[TF-IDF vector]
    V --> M[Logistic Regression]
    M --> O[positive / negative]
\`\`\`

## 3. Why the naive approach breaks

Lesson 1 showed a lexicon classifier. Real sentences fool it:

- *"This is **not** great."* - positive lexicon hit, real sentiment negative.
- *"The phone is light, but the battery dies in 2 hours."* - mixed.
- *"Sure, the lectures are 'free'."* - sarcasm.
- *"Phim hay ghê!"* - Vietnamese, lexicon doesn't speak it.

Modern systems handle these by learning patterns from labelled data - they discover *negation*, *contrast*, and *irony* from millions of examples instead of from rules.

## 4. Building a real classifier - the recipe

\`\`\`mermaid
graph TD
    D[Labelled dataset<br/>review + label] --> S[Train / test split]
    S --> P[Preprocess + TF-IDF]
    P --> M[Train Logistic Regression]
    M --> E[Evaluate: accuracy, F1, confusion matrix]
    E --> D2{Good enough?}
    D2 -- No --> P2[Tune: ngram_range, regularisation, more data]
    P2 --> M
    D2 -- Yes --> Deploy
\`\`\`

## 5. Metrics that matter

For balanced datasets, **accuracy** is fine. For imbalanced ones (e.g. 95% positive reviews), accuracy lies. Use:

- **Precision** - of the reviews you called negative, how many actually were?
- **Recall** - of the truly negative reviews, how many did you catch?
- **F1** - harmonic mean of the two. Good single number.
- **Confusion matrix** - visualise the mistakes per class.

## 6. Real-world use case - How HaiEduTech could grade lesson feedback

\`student_activity_log\` already stores feedback strings. A pipeline:

1. Fetch every \`activity_type = 'lesson_feedback'\` row.
2. Run a sentiment classifier (TF-IDF for speed, BERT for accuracy).
3. Aggregate per lesson → flag any lesson with >20% negative feedback.
4. Surface the alert in the Teacher Admin dashboard.

Teacher Hai then knows *exactly* which lesson to revise - closing the human-in-the-loop feedback we already use for the RL system.

## 7. Key Concept

> 🎯 **Key Concept** - Sentiment analysis is **supervised classification** on text. The pipeline is always *clean → vectorise → train → evaluate*. The huge leaps (lexicon → ML → BERT → LLM) are about *which vector you use* and *which model consumes it*. The framework stays the same.`,
        theoryEn: "",
        code: `# Train a real sentiment classifier on a tiny dataset of HaiEduTech-style reviews.
# pip install scikit-learn pandas
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# 1. Mini labelled dataset (in real life: thousands of rows from your DB)
data = pd.DataFrame({
    "text": [
        "Teacher Hai's NLP lesson is amazing, super clear!",
        "I love the visual diagrams and the Python examples.",
        "The IELTS roadmap helped me jump from 5.5 to 7.0.",
        "Excellent explanations, easy to follow.",
        "Best EdTech site I've used.",
        "The lesson was confusing and the audio was too quiet.",
        "Boring, slow, and full of typos.",
        "I hated the quiz - questions were ambiguous.",
        "Terrible UX, the chatbot kept crashing.",
        "Worst experience, would not recommend.",
    ],
    "label": ["pos"] * 5 + ["neg"] * 5,
})

X_train, X_test, y_train, y_test = train_test_split(
    data["text"], data["label"], test_size=0.3, random_state=42, stratify=data["label"]
)

# 2. Pipeline: TF-IDF (1- and 2-grams) → Logistic Regression
clf = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), min_df=1, lowercase=True)),
    ("model", LogisticRegression(max_iter=1000, C=1.0)),
])
clf.fit(X_train, y_train)

# 3. Evaluate
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred))

# 4. Try it on brand-new sentences
new_reviews = [
    "I am not happy with this lesson.",                # negation - tricky
    "Phenomenal teacher, learned so much!",
    "The course was OK, nothing special.",
]
print("\\nPredictions:")
for r, p in zip(new_reviews, clf.predict(new_reviews)):
    print(f"  {p:>3} | {r}")

# Notice how the bigram (1,2) helps capture 'not happy' as a negative signal.
# Swap LogisticRegression for LinearSVC or a fine-tuned BERT for production.`,
        codeLanguage: "python",
        exercise: "Add 3 more **mixed/sarcastic** reviews to the dataset (e.g. *\"Sure, the audio is 'great'.\"*) and re-train. Report whether bigrams alone are enough to handle sarcasm, and propose **one** richer feature you could add (hint: think about quotation marks or contrast conjunctions).",
        exerciseEn: "",
        quiz: [
          {
            question: "Why is accuracy a misleading metric for a sentiment dataset that is 95% positive?",
            options: [
              "Accuracy is always misleading",
              "A trivial 'always predict positive' model would score 95% but catch zero negatives - F1 / recall reveal the failure",
              "Accuracy ignores the test set",
              "Accuracy only works for regression",
            ],
            answer: 1,
            explanation: "On imbalanced data, accuracy rewards the majority class. F1 (or per-class recall) shows whether the model can actually find the minority cases that you usually care about (negative reviews to address).",
          },
          {
            question: "Which preprocessing change is most likely to *hurt* a sentiment classifier?",
            options: [
              "Adding bigrams",
              "Removing the words 'not', 'no', 'never' as stop-words",
              "Lowercasing",
              "Stripping URLs",
            ],
            answer: 1,
            explanation: "Negations flip sentiment. If the model never sees 'not' it cannot distinguish 'I like it' from 'I do not like it'. Always keep negations in sentiment pipelines.",
          },
          {
            question: "Which 2026 approach can perform sentiment analysis with NO training data at all?",
            options: [
              "Hand-written if/else rules",
              "Bag of Words + Logistic Regression",
              "Zero-shot prompting of a large language model (GPT, Gemini, Claude)",
              "A larger lexicon",
            ],
            answer: 2,
            explanation: "Modern LLMs can be prompted: 'Classify the sentiment of this review as positive, negative, or neutral.' They reach ~93% accuracy on common benchmarks without seeing a single labelled example.",
          },
        ],
      },

      // ========================================================================
      // Lesson 5 - Sequence Modeling: RNN & LSTM
      // ========================================================================
      {
        id: "nlp-5",
        title: "Sequence Modeling: RNNs & LSTMs",
        titleEn: "Sequence Modeling: RNNs & LSTMs",
        level: 4,
        difficulty: "advanced",
        theory: `> 💡 **Prerequisites** - Deep Learning Lessons 1-2 (neural networks, PyTorch) and NLP Lesson 3 (embeddings).

## 1. Why a sequence model?

A logistic regression on TF-IDF treats *"dog bites man"* and *"man bites dog"* as identical. For tasks where **order matters** - translation, summarisation, voice assistants, autocomplete - we need a model that reads text **left-to-right** and remembers what came before.

\`\`\`mermaid
graph LR
    X1[Word 1] --> H1[h1]
    X2[Word 2] --> H2[h2]
    X3[Word 3] --> H3[h3]
    H1 --> H2
    H2 --> H3
    H3 --> Y[Output]
\`\`\`

This is the **Recurrent Neural Network (RNN)** idea: at every step, the network's hidden state $h_t$ depends on the new input $x_t$ **and** the previous hidden state $h_{t-1}$.

## 2. Vanilla RNN - the math in one line

$$h_t = \\tanh(W_{xh} x_t + W_{hh} h_{t-1} + b)$$

The same weight matrix is reused at every timestep - that is what makes it "recurrent" and what lets it process sentences of any length.

> 🇫🇮 **Why this matters for Finnish** - Finnish word order is much freer than English. Sentence-level meaning often comes from agreement features spread across the whole sentence. A model that *remembers* prior words handles this far better than a bag-of-words.

## 3. The vanishing gradient problem

Vanilla RNNs work for ~10-token sequences. Beyond that the gradients shrink to zero during backprop and the network forgets the start of the sentence. Two famous fixes:

| Architecture | Year | Idea |
|---|---|---|
| **LSTM** (Long Short-Term Memory) | 1997 | Adds a separate **cell state** plus three gates (forget / input / output) that control what to remember. |
| **GRU** (Gated Recurrent Unit) | 2014 | Simplification of LSTM with two gates. Faster, slightly fewer parameters. |

\`\`\`mermaid
graph TD
    X[x_t] --> F[Forget gate σ]
    X --> I[Input gate σ]
    X --> O[Output gate σ]
    H[h_{t-1}] --> F
    H --> I
    H --> O
    F --> C[Cell state c_t]
    I --> C
    C --> O
    O --> H2[h_t]
\`\`\`

The **gates** are tiny sigmoid networks that output a number in [0, 1] - they decide *how much* of the cell state to keep, add, or expose. With this, LSTMs reliably handle 100+ token sequences.

## 4. What can you build with an RNN/LSTM?

| Task | I/O shape | Example |
|---|---|---|
| **Many-to-one** | Sequence → label | Sentiment of a review |
| **Many-to-many (same length)** | Sequence → sequence | POS tagging, named entity recognition |
| **Encoder-Decoder** | Sequence → sequence (different length) | Translation, summarisation |
| **One-to-many** | Single seed → sequence | Text generation, music generation |

The classic 2014 **Sequence-to-Sequence** paper (Sutskever et al.) used two LSTMs - one as encoder, one as decoder - to do English → French translation. It powered Google Translate from 2016 to 2018.

## 5. Why LSTMs lost the crown in 2017

LSTMs read **strictly left-to-right** (or right-to-left). Each step depends on the previous one, so they cannot be parallelised across the sentence. Training is slow on long documents, and they still struggle with very long-range dependencies.

The **Transformer** (Lesson 6) replaced sequential recurrence with **attention**: every word looks at every other word in **one parallel step**. Modern speech recognition, translation, and chat assistants all use Transformers. LSTMs remain useful for **edge devices** (small models, low latency, no GPU) and **streaming** scenarios.

## 6. Real-world use case - Predictive text on your phone

When you start typing "good mor…", your phone suggests "morning". That suggestion is generated by a tiny LSTM (or, on newer phones, a small Transformer) trained on your past messages. The model is small (a few MB), runs on-device for privacy, and predicts one token at a time.

## 7. Key Concept

> 🎯 **Key Concept** - RNNs and LSTMs were the workhorse of NLP from 2014-2017. They process tokens **sequentially**, carrying a hidden state forward. **LSTMs add gates** to fight vanishing gradients and remember longer context. They are still excellent for small, low-latency on-device tasks, but Transformers (Lesson 6) won the cloud.`,
        theoryEn: "",
        code: `# A character-level LSTM that learns to continue a sentence.
# We train on a tiny corpus and let the model 'dream' the next 100 characters.
# pip install torch
import torch
import torch.nn as nn

# 1. Tiny corpus -------------------------------------------------------
text = (
    "teacher hai teaches python and nlp on haiedutech. "
    "students learn ielts speaking, hsk vocabulary, and finnish basics. "
    "the platform makes learning fun and effective. "
) * 10

# 2. Char-level vocabulary --------------------------------------------
chars = sorted(set(text))
stoi = {c: i for i, c in enumerate(chars)}
itos = {i: c for c, i in stoi.items()}
vocab_size = len(chars)
data = torch.tensor([stoi[c] for c in text], dtype=torch.long)

# 3. Model: embedding → LSTM → linear projection ---------------------
class CharLSTM(nn.Module):
    def __init__(self, vocab_size, emb_dim=32, hidden=64):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, emb_dim)
        self.lstm = nn.LSTM(emb_dim, hidden, batch_first=True)
        self.fc = nn.Linear(hidden, vocab_size)

    def forward(self, x, hidden=None):
        x = self.embed(x)
        out, hidden = self.lstm(x, hidden)
        return self.fc(out), hidden

model = CharLSTM(vocab_size)
optim = torch.optim.Adam(model.parameters(), lr=3e-3)
loss_fn = nn.CrossEntropyLoss()

# 4. Train: predict next character from the previous 50 ---------------
SEQ = 50
for epoch in range(800):
    i = torch.randint(0, len(data) - SEQ - 1, (1,)).item()
    x = data[i : i + SEQ].unsqueeze(0)
    y = data[i + 1 : i + SEQ + 1]
    logits, _ = model(x)
    loss = loss_fn(logits.squeeze(0), y)
    optim.zero_grad(); loss.backward(); optim.step()
    if epoch % 200 == 0:
        print(f"epoch {epoch:4d} | loss {loss.item():.3f}")

# 5. Generate -----------------------------------------------------------
def sample(seed: str, n: int = 100) -> str:
    model.eval()
    out = seed
    x = torch.tensor([[stoi[c] for c in seed]])
    hidden = None
    for _ in range(n):
        logits, hidden = model(x[:, -1:], hidden)
        probs = torch.softmax(logits[0, -1], dim=-1)
        nxt = torch.multinomial(probs, 1).item()
        out += itos[nxt]
        x = torch.cat([x, torch.tensor([[nxt]])], dim=1)
    return out

print("\\nSeed: 'teacher hai '")
print(sample("teacher hai ", 80))`,
        codeLanguage: "python",
        exercise: "Replace the `nn.LSTM` with `nn.GRU` and re-train for the same number of epochs. Compare the final loss and the quality of generated text (qualitatively). Then explain in 2-3 sentences why GRUs train faster than LSTMs for the same problem.",
        exerciseEn: "",
        quiz: [
          {
            question: "Why does a vanilla RNN struggle with long sentences?",
            options: [
              "It runs out of memory",
              "Gradients shrink (or explode) when backpropagated through many timesteps, so early tokens are forgotten",
              "Vanilla RNNs only accept 10 tokens by design",
              "It cannot read non-English text",
            ],
            answer: 1,
            explanation: "Repeated multiplication by the same recurrent weight matrix during backprop drives gradients toward 0 (vanishing) or infinity (exploding). LSTMs/GRUs use gating to give gradients an unobstructed highway through the cell state.",
          },
          {
            question: "Which gate decides what information to discard from an LSTM cell state?",
            options: ["Input gate", "Output gate", "Forget gate", "Tanh gate"],
            answer: 2,
            explanation: "The forget gate outputs values in [0,1] that multiply the previous cell state - 0 wipes information, 1 keeps it. The input gate decides what *new* info to add; the output gate decides what to expose as the hidden state.",
          },
          {
            question: "What is the main reason Transformers (Lesson 6) replaced LSTMs for large-scale NLP?",
            options: [
              "Transformers use less memory",
              "Transformers process all tokens in parallel via self-attention, so they train much faster on GPUs",
              "Transformers do not need any training data",
              "LSTMs cannot handle English",
            ],
            answer: 1,
            explanation: "LSTMs are inherently sequential - token t depends on token t-1. Transformers compute attention across all tokens simultaneously, which is what makes training huge models on huge corpora practical.",
          },
        ],
      },

      // ========================================================================
      // Lesson 6 - Modern NLP: Transformers, BERT & LLMs
      // ========================================================================
      {
        id: "nlp-6",
        title: "Transformers, BERT & Large Language Models",
        titleEn: "Transformers, BERT & Large Language Models",
        level: 5,
        difficulty: "advanced",
        theory: `> 💡 **Prerequisites** - Lessons 1-5 of this module and Deep Learning Lessons 1-2.

## 1. The 2017 inflection point

In June 2017 a Google team published *"Attention Is All You Need"*. They threw away recurrence and convolutions and replaced them with **self-attention**. The result - the **Transformer** - became the foundation of every modern LLM: BERT (2018), GPT-2 (2019), GPT-3 (2020), ChatGPT (2022), GPT-5 / Gemini 2.5 / Claude 4 (2025-2026).

\`\`\`mermaid
graph TD
    Input[Input tokens] --> Embed[Token + position embeddings]
    Embed --> SA[Self-Attention]
    SA --> FF[Feed-Forward]
    FF --> Add[Add & LayerNorm]
    Add --> SA2[Self-Attention<br/>repeat N times]
    SA2 --> Out[Output]
\`\`\`

## 2. Self-attention in plain English

Imagine reading the sentence *"The animal didn't cross the street because it was too tired."* When your eyes hit *"it"*, you instantly look back at *"animal"* - not at *"street"*. Self-attention is exactly this: at every position, the model computes a weighted sum of **all other positions**, where the weights say "how much should this token pay attention to that token?".

For each token the model produces three vectors:

- **Query (Q)** - "what am I looking for?"
- **Key (K)** - "what do I represent?"
- **Value (V)** - "what information do I carry?"

The attention weight from token A to token B is $\\text{softmax}(Q_A \\cdot K_B / \\sqrt{d})$, and the output for A is the weighted sum of all $V$s.

> 🎯 **Why it changed everything** - All these dot products run **in parallel** on a GPU. LSTMs had to wait for token t-1 before computing token t. Transformers do the whole sentence at once. That is how 100-billion-parameter models became practical.

## 3. The two flavours of Transformer

| Family | Architecture | Trained to | Famous example |
|---|---|---|---|
| **Encoder-only** | Bidirectional self-attention | Predict masked words | **BERT** - best for *understanding* (classification, NER, search) |
| **Decoder-only** | Causal self-attention (no peeking ahead) | Predict the next word | **GPT, Llama, Gemini, Claude** - best for *generation* |
| **Encoder-decoder** | Both halves | Map input seq → output seq | **T5, BART** - translation, summarisation |

## 4. BERT and the pre-train / fine-tune recipe

BERT pioneered the **two-stage** pattern that still dominates:

1. **Pre-training** (done once, by a big lab) - Read the entire English Wikipedia + 11k books, predict masked-out words. The model learns grammar, world knowledge, and word meaning *for free*.
2. **Fine-tuning** (done by you, in minutes) - Add a tiny classification head on top of BERT and train on **your** small labelled dataset (sentiment, intent, support ticket category, …). You typically need only a few thousand examples to beat any classical model.

\`\`\`mermaid
graph LR
    Wiki[Wikipedia + Books] -->|months on TPUs| BERT[Pre-trained BERT]
    BERT -->|hours on 1 GPU| FT[Fine-tuned for sentiment]
    FT --> Prod[Production classifier]
\`\`\`

## 5. Large Language Models in 2026

Modern LLMs (GPT-5, Gemini 2.5, Claude 4, Llama 4) are **decoder-only Transformers** with 70B–2T parameters. Three superpowers:

1. **In-context learning** - solve new tasks by showing 0-3 examples in the prompt. No training needed.
2. **Tool use** - call APIs, browse, run code, query databases (the **agentic** pattern).
3. **Multimodal** - Gemini 2.5 reads text + images + audio + video in one shot.

The **lifecycle** of a 2026 LLM:

\`\`\`mermaid
graph TD
    A[Pre-training<br/>trillions of tokens] --> B[Supervised Fine-Tuning<br/>SFT on quality demos]
    B --> C[RLHF / DPO<br/>align to human preference]
    C --> D[Safety + Red-team]
    D --> E[Deployed model<br/>API / on-device]
\`\`\`

> 🇻🇳 **Vietnamese context** - Open models like *Vistral-7B*, *PhoGPT*, and *VinaLLaMA* are LLMs **fine-tuned on Vietnamese data**. They are how a startup builds a chatbot that speaks natural Vietnamese without re-training a 100B-parameter model from scratch.

## 6. Real-world use case - How HaiEduTech's AI Speaking Coach works

The Speaking Coach you can use in the IELTS section is a **Transformer pipeline**:

1. **Speech-to-text** - *Whisper* (OpenAI's encoder-decoder Transformer) transcribes your audio.
2. **Pronunciation scoring** - A *Wav2Vec2* model compares phoneme alignment.
3. **Grammar feedback** - A small fine-tuned BERT (or a Lovable AI Gateway call to *gemini-2.5-flash*) flags mistakes.
4. **Band score & coaching tips** - A prompted LLM produces structured JSON feedback.

Every box in that flow is a Transformer.

## 7. 🏆 Capstone - Finnish-to-English Sentiment Analyser

Combine **all 6 lessons** into one notebook:

1. Tokenize Finnish input (Lesson 2 - handle morphology).
2. Embed it with a multilingual model like \`xlm-roberta-base\` (Lesson 3).
3. Fine-tune a sentiment head on a tiny Finnish review dataset (Lesson 4).
4. Compare against an LSTM baseline (Lesson 5).
5. Wrap the whole thing in a one-line Hugging Face \`pipeline()\` and demo it (Lesson 6).
6. **Save your code snippets to your HaiEduTech Smart Notebook** to grow your personal NLP library.

Earn the **🎓 Linguistics Architect** badge by completing this capstone.

## 8. Key Concept

> 🎯 **Key Concept** - The Transformer's superpower is **parallel self-attention**: every token attends to every other token in one shot. Pre-train once on the internet, fine-tune on your tiny dataset, or just **prompt** the model. This pattern (BERT → GPT → ChatGPT → Gemini → Claude) is the entire roadmap of NLP from 2018 to 2026.`,
        theoryEn: "",
        code: `# Three lines of modern NLP - fine-tune-free, multilingual, 2026-style.
# pip install transformers torch
from transformers import pipeline

# 1. Sentiment analysis on English + Finnish + Vietnamese (zero-shot, multilingual model)
sentiment = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-xlm-roberta-base-sentiment",
)
samples = [
    "Teacher Hai's NLP module is the best content on HaiEduTech!",   # English
    "Tämä oppitunti oli erinomainen!",                                # Finnish
    "Bài học này dở quá, không hiểu gì cả.",                          # Vietnamese
]
for s in samples:
    print(sentiment(s)[0], "<-", s)

# 2. Translation with a multilingual encoder-decoder Transformer
translator = pipeline("translation", model="Helsinki-NLP/opus-mt-fi-en")
print("\\n", translator("Opettaja Hai opettaa luonnollisen kielen käsittelyä."))

# 3. Generative LLM - a small open model running locally
gen = pipeline("text-generation", model="distilgpt2", max_new_tokens=40)
print("\\n", gen("In 2026, the most exciting NLP application is")[0]["generated_text"])

# Production tip:
#   For real apps, call an API (OpenAI / Gemini / Anthropic / Lovable AI Gateway)
#   instead of running a 70B model yourself. The Lovable AI Gateway in this very
#   project lets you call google/gemini-2.5-flash without managing a single server.`,
        codeLanguage: "python",
        exercise: "🏆 **Capstone challenge** - In your own notebook, replace the `cardiffnlp/twitter-xlm-roberta-base-sentiment` model with a model fine-tuned for **Finnish** sentiment (search Hugging Face for `finnish sentiment`). Run the same 3 sample sentences. Report which model performs better on the Finnish line **and** explain why a multilingual model can sometimes beat a language-specific one.",
        exerciseEn: "",
        quiz: [
          {
            question: "What is the core innovation of the Transformer architecture (2017)?",
            options: [
              "It uses LSTMs more efficiently",
              "Self-attention lets every token attend to every other token in parallel - no recurrence required",
              "It uses convolutions like a CNN",
              "It eliminates the need for training data",
            ],
            answer: 1,
            explanation: "Removing recurrence enabled massive parallelism on GPUs, which in turn made it economical to scale models to 100B+ parameters and train on trillions of tokens. That is the lineage from BERT to GPT-5.",
          },
          {
            question: "Which Transformer family is best suited for *text generation* (chatbots, autocomplete, code)?",
            options: [
              "Encoder-only (BERT-style)",
              "Decoder-only (GPT-style) with causal self-attention",
              "Convolutional Transformer",
              "RNN-Transformer hybrid",
            ],
            answer: 1,
            explanation: "Decoder-only models predict the next token from the previous tokens (causal masking) - exactly what generation needs. BERT-style encoders are bidirectional and better for understanding tasks like classification or search.",
          },
          {
            question: "What does 'fine-tuning' a pre-trained Transformer mean in practice?",
            options: [
              "Re-training the model from scratch on your data",
              "Continuing training on a small task-specific dataset (often with a tiny new head) for a few epochs",
              "Editing the model's source code",
              "Compressing the model to run on a phone",
            ],
            answer: 1,
            explanation: "The expensive pre-training has already learned grammar and world knowledge. Fine-tuning nudges the weights with your labelled data so the model excels at your specific task - usually in hours on a single GPU.",
          },
        ],
      },
    ],
  },
];
