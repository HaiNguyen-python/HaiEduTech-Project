// Grammar Expansion 3 — Advanced & High-Frequency Topics
// New modules: Inversion, Subjunctive & Unreal, Cleft Sentences, Participle Clauses,
// Phrasal Verbs, Question Forms & Tags, Linking & Discourse Markers, Word Order & Adverbs,
// Common Confusions (Confusing Pairs), Noun Clauses & Reported Questions.
import type { LanguageModule } from "./types";

export const grammarExpansionModules3: LanguageModule[] = [
  // ===== MODULE 10: INVERSION =====
  {
    id: "grammar-inversion",
    title: "Đảo ngữ (Inversion)",
    titleEn: "Inversion",
    icon: "🔄",
    color: "from-purple-500 to-fuchsia-600",
    description: "Đảo trợ động từ lên trước chủ ngữ để nhấn mạnh hoặc trang trọng hóa câu.",
    descriptionEn: "Move the auxiliary before the subject for emphasis or formality.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "inversion-negative-adverbials",
        title: "Đảo ngữ với trạng từ phủ định",
        titleEn: "Inversion with Negative Adverbials",
        level: 5,
        difficulty: "advanced",
        theory: `## Đảo ngữ với trạng từ phủ định

Khi đặt một trạng từ/cụm trạng từ mang nghĩa phủ định hoặc giới hạn ở **đầu câu**, ta phải đảo trợ động từ lên trước chủ ngữ — giống cấu trúc câu hỏi.

### Các cụm thường gặp
- **Never / Rarely / Seldom / Hardly ever**
- **No sooner ... than / Hardly ... when** (vừa mới ... thì)
- **Not only ... but also**
- **Not until / Only when / Only after**
- **Under no circumstances / On no account / At no time**
- **Little / Nowhere**

### Cấu trúc
**Negative adv + AUX + S + V**

### Ví dụ
- *Never **have I seen** such beauty.* (Chưa bao giờ tôi thấy vẻ đẹp như vậy.)
- *Rarely **does she complain**.*
- *No sooner **had I arrived** than the meeting started.*
- *Not only **did he apologise**, but he also paid for the damage.*
- *Under no circumstances **should you open** the door.*
- *Only after dinner **did we realise** the truth.*

### Lưu ý quan trọng
- Nếu không có trợ động từ sẵn, dùng **do/does/did** như câu hỏi.
- Đảo ngữ KHÔNG áp dụng khi trạng từ phủ định bổ nghĩa cho danh từ ('No student passed' — không đảo).`,
        theoryEn: `## Inversion with Negative Adverbials

When a negative or restrictive adverbial is placed at the **start of the sentence**, we invert the auxiliary and the subject — like a question.

### Common triggers
- Never / Rarely / Seldom / Hardly ever
- No sooner ... than / Hardly ... when
- Not only ... but also
- Not until / Only when / Only after
- Under no circumstances / On no account / At no time
- Little / Nowhere

### Structure
**Negative adv + AUX + S + V**

### Examples
- *Never have I seen such beauty.*
- *No sooner had I arrived than the meeting started.*
- *Not only did he apologise, but he also paid.*
- *Only after dinner did we realise the truth.*`,
        proTips: [
          "Nếu câu gốc không có trợ động từ, mượn do/does/did.",
          "'Not only ... but also' đảo ở mệnh đề ĐẦU; 'but also' giữ nguyên.",
          "Inversion làm câu trang trọng — phù hợp Writing Task 2 và Speaking Part 3."
        ],
        proTipsEn: [
          "If no auxiliary exists, borrow do/does/did.",
          "Invert the FIRST clause of 'Not only ... but also'; the second stays normal.",
          "Inversion adds formality — great for IELTS Writing Task 2 and Speaking Part 3."
        ],
        vocabulary: [
          { word: "scarcely", meaning: "hầu như không", example: "Scarcely had I sat down when the phone rang." },
          { word: "circumstance", meaning: "hoàn cảnh", example: "Under no circumstances should you lie." },
          { word: "seldom", meaning: "hiếm khi", example: "Seldom does he visit us." },
          { word: "sooner", meaning: "sớm hơn", example: "No sooner had he left than it rained." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Viết lại câu dùng đảo ngữ.",
            instructionEn: "Rewrite using inversion.",
            sentences: [
              { text: "I have never seen such a mess. → Never ___ I seen such a mess.", textEn: "Never ___ I seen such a mess.", answer: "have" },
              { text: "He had hardly entered when the bell rang. → Hardly ___ he entered when the bell rang.", textEn: "Hardly ___ he entered when the bell rang.", answer: "had" },
              { text: "She rarely complains. → Rarely ___ she complain.", textEn: "Rarely ___ she complain.", answer: "does" },
              { text: "We must not lower our guard at any time. → At no time ___ we lower our guard.", textEn: "At no time ___ we lower our guard.", answer: "must" },
              { text: "He realised the truth only later. → Only later ___ he realise the truth.", textEn: "Only later ___ he realise the truth.", answer: "did" }
            ]
          }
        ],
        quiz: [
          { question: "Choose the correct inversion: 'Never ___ such an event.'", options: ["I have witnessed", "have I witnessed", "did I witnessed", "I witnessed"], answer: 1, explanation: "Never + AUX (have) + S + V3." },
          { question: "'No sooner ___ than it started raining.'", options: ["had we arrived", "we had arrived", "did we arrived", "we arrive"], answer: 0, explanation: "No sooner + had + S + V3 ... than + past simple." },
          { question: "Which is correct?", options: ["Only after I finished, I left.", "Only after I finished did I leave.", "Only after did I finish I leave.", "Only I left after I finished."], answer: 1, explanation: "Only after + clause → invert in MAIN clause." },
          { question: "'Under no circumstances ___ the red button.'", options: ["you should press", "should you press", "you press should", "did you press"], answer: 1, explanation: "Negative phrase first → modal + S + V." }
        ]
      },
      {
        id: "inversion-conditionals",
        title: "Đảo ngữ trong câu điều kiện",
        titleEn: "Inversion in Conditionals",
        level: 5,
        difficulty: "advanced",
        theory: `## Đảo ngữ trong câu điều kiện (bỏ 'if')

Trong văn phong trang trọng, ta có thể bỏ 'if' và đảo trợ động từ lên trước chủ ngữ.

### Type 1 — với 'should'
- *If you **should need** help, call me.* → ***Should you need** help, call me.*

### Type 2 — với 'were'
- *If I **were** you, I would resign.* → ***Were I** you, I would resign.*
- *If she **were to** call, ...* → ***Were she to** call, ...*

### Type 3 — với 'had'
- *If I **had known**, I would have come.* → ***Had I known**, I would have come.*

### Lưu ý
- Dạng phủ định KHÔNG rút gọn: ***Had it not been** for ...* (KHÔNG: Hadn't it been for).
- Cấu trúc này phù hợp cho IELTS Writing Task 2 hoặc văn bản học thuật.`,
        theoryEn: `## Inversion in Conditionals (omitting 'if')

In formal English, we can omit 'if' and invert the auxiliary.

- Type 1 with 'should': **Should you need** help, call me.
- Type 2 with 'were': **Were I** you, I would resign.
- Type 3 with 'had': **Had I known**, I would have come.

Negatives are NOT contracted: *Had it not been for ...* (NOT 'Hadn't it been for').`,
        proTips: [
          "Đảo ngữ điều kiện = trang trọng — chỉ dùng văn viết hoặc thuyết trình.",
          "KHÔNG dùng dạng rút gọn 'hadn't / shouldn't' khi đảo.",
          "'Were it not for X' = 'If it weren't for X' — cấu trúc đẹp trong essay."
        ],
        proTipsEn: [
          "Inverted conditionals are formal — best in writing or presentations.",
          "Do NOT use contractions ('hadn't / shouldn't') after inversion.",
          "'Were it not for X' = 'If it weren't for X' — elegant in essays."
        ],
        vocabulary: [
          { word: "should", meaning: "(trợ từ giả định)", example: "Should you require help, contact us." },
          { word: "were it not for", meaning: "nếu không nhờ", example: "Were it not for her support, I would have failed." },
          { word: "had", meaning: "(trợ từ điều kiện 3)", example: "Had I known, I would have stayed." },
          { word: "otherwise", meaning: "nếu không thì", example: "Hurry up; otherwise, you will be late." }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại các từ thành câu đảo ngữ điều kiện đúng.",
            instructionEn: "Reorder into a correct inverted conditional.",
            items: [
              { scrambled: ["Had", "I", "known", "earlier,", "I", "would", "have", "called."], correct: "Had I known earlier, I would have called.", correctEn: "Had I known earlier, I would have called." },
              { scrambled: ["Were", "I", "in", "your", "shoes,", "I", "would", "accept."], correct: "Were I in your shoes, I would accept.", correctEn: "Were I in your shoes, I would accept." },
              { scrambled: ["Should", "you", "have", "questions,", "please", "ask."], correct: "Should you have questions, please ask.", correctEn: "Should you have questions, please ask." }
            ]
          }
        ],
        quiz: [
          { question: "Convert: 'If I had seen him, I would have spoken.'", options: ["Had I seen him, I would have spoken.", "Did I see him, I would have spoken.", "Have I seen him, I would have spoken.", "Were I seen him, I would have spoken."], answer: 0, explanation: "Type 3 → 'Had + S + V3'." },
          { question: "Which is acceptable formal English?", options: ["Hadn't it been for him, ...", "Had it not been for him, ...", "Had not it been for him, ...", "Did it not been for him, ..."], answer: 1, explanation: "No contractions after inversion." },
          { question: "'___ you require assistance, dial 0.'", options: ["Were", "Had", "Should", "Did"], answer: 2, explanation: "Type 1 inversion uses 'Should'." }
        ]
      }
    ]
  },

  // ===== MODULE 11: SUBJUNCTIVE & UNREAL =====
  {
    id: "grammar-subjunctive",
    title: "Thức giả định (Subjunctive)",
    titleEn: "Subjunctive Mood",
    icon: "🪄",
    color: "from-rose-500 to-pink-600",
    description: "Diễn đạt yêu cầu, đề nghị, mong muốn và tình huống không có thật.",
    descriptionEn: "Express requests, suggestions, wishes, and unreal situations.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "subjunctive-that-clauses",
        title: "Subjunctive trong mệnh đề 'that'",
        titleEn: "Subjunctive in 'that' Clauses",
        level: 4,
        difficulty: "advanced",
        theory: `## Subjunctive trong mệnh đề 'that'

Sau các động từ/tính từ chỉ đề nghị, yêu cầu, lệnh, cần thiết — mệnh đề 'that' dùng động từ ở dạng **NGUYÊN MẪU không 'to'** (base form), bất kể chủ ngữ là gì.

### Động từ kích hoạt
suggest, recommend, propose, insist, demand, request, require, urge, advise, ask, command, order, move

### Tính từ kích hoạt
*It is / was* + **essential / necessary / important / vital / crucial / imperative / desirable / advisable** + that ...

### Cấu trúc
**S + V/Adj + that + S + base verb**

### Ví dụ
- *The doctor recommended that he **stop** smoking.* (KHÔNG 'stops')
- *It is essential that she **be** on time.* (KHÔNG 'is')
- *I insist that he **apologise** immediately.*
- *They demanded that the policy **be reviewed**.* (passive: be + V3)

### Phủ định
- *We suggest that he **not attend** the meeting.* (KHÔNG: doesn't attend)`,
        theoryEn: `## Subjunctive in 'that' Clauses

After verbs/adjectives expressing suggestion, request, demand, or necessity, the verb in the 'that' clause is in **base form** regardless of subject.

### Trigger verbs
suggest, recommend, propose, insist, demand, request, require, urge, advise, ask, command, order

### Trigger adjectives
*It is/was* + essential / necessary / important / vital / crucial / imperative + that ...

### Examples
- *The doctor recommended that he stop smoking.*
- *It is essential that she be on time.*
- *They demanded that the policy be reviewed.*
- Negative: *We suggest that he not attend the meeting.*`,
        proTips: [
          "Đừng chia ngôi: 'that he be / she go / it have' — luôn nguyên mẫu.",
          "Phủ định: 'that S not + V' — KHÔNG dùng don't/doesn't.",
          "Văn phong Anh-Mỹ ưa subjunctive; Anh-Anh có thể dùng 'should + V' thay thế."
        ],
        proTipsEn: [
          "Do NOT conjugate: 'that he be / she go / it have' — always base form.",
          "Negative: 'that S not + V' — NOT don't/doesn't.",
          "American English prefers subjunctive; British English may use 'should + V' instead."
        ],
        vocabulary: [
          { word: "recommend", meaning: "đề xuất", example: "I recommend that you arrive early." },
          { word: "essential", meaning: "thiết yếu", example: "It is essential that he be informed." },
          { word: "insist", meaning: "khăng khăng", example: "She insisted that he apologise." },
          { word: "imperative", meaning: "rất cần thiết", example: "It is imperative that we act now." },
          { word: "propose", meaning: "đề nghị", example: "He proposed that the meeting be postponed." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chia động từ ở dạng subjunctive.",
            instructionEn: "Use the subjunctive form.",
            sentences: [
              { text: "I suggest that he ___ (be) more careful.", textEn: "I suggest that he ___ (be) more careful.", answer: "be" },
              { text: "It is essential that she ___ (arrive) on time.", textEn: "It is essential that she ___ (arrive) on time.", answer: "arrive" },
              { text: "The teacher demanded that we ___ (not talk) during the test.", textEn: "The teacher demanded that we ___ (not talk) during the test.", answer: "not talk" },
              { text: "He insisted that the report ___ (be) submitted today.", textEn: "He insisted that the report ___ (be) submitted today.", answer: "be" }
            ]
          }
        ],
        quiz: [
          { question: "Choose the correct subjunctive: 'I suggest he ___ a doctor.'", options: ["sees", "see", "saw", "seeing"], answer: 1, explanation: "Subjunctive uses base form regardless of subject." },
          { question: "'It is vital that the medicine ___ refrigerated.'", options: ["is", "be", "was", "being"], answer: 1, explanation: "After 'It is vital that' use base form 'be'." },
          { question: "Which is correct (negative subjunctive)?", options: ["We ask that he doesn't smoke here.", "We ask that he not smoke here.", "We ask that he not smokes here.", "We ask that he not to smoke here."], answer: 1, explanation: "Negative subjunctive = 'not + base form'." }
        ]
      },
      {
        id: "subjunctive-wish-if-only",
        title: "'Wish' và 'If only' — câu ước",
        titleEn: "'Wish' and 'If only' — Unreal Wishes",
        level: 4,
        difficulty: "intermediate",
        theory: `## 'Wish' và 'If only'

### 1. Ước ở hiện tại (trái với hiện tại)
**S + wish(es) / If only + S + V (past simple)**
- *I wish I **knew** the answer.* (Tôi ước mình biết câu trả lời.)
- *If only she **were** here.* (Dùng 'were' cho mọi ngôi — formal/correct.)

### 2. Ước ở quá khứ (trái với quá khứ — hối tiếc)
**S + wish + S + had + V3**
- *I wish I **had studied** harder.* (Tiếc là đã không học chăm.)
- *If only we **hadn't missed** the bus.*

### 3. Ước về tương lai (mong muốn thay đổi)
**S + wish + S + would + V**
- *I wish it **would stop** raining.*
- *I wish you **wouldn't interrupt** me.*

### Lưu ý
- KHÔNG dùng 'I wish I would ...' — vì bạn không thể yêu cầu chính mình.
- 'If only' nhấn mạnh hơn 'wish'; thường đứng đầu câu, có thể đứng độc lập.`,
        theoryEn: `## 'Wish' and 'If only'

### 1. Wish about NOW (unreal present)
**S + wish + S + past simple** — *I wish I knew the answer.* (Use 'were' for all persons.)

### 2. Wish about PAST (regret)
**S + wish + S + had + V3** — *I wish I had studied harder.*

### 3. Wish about FUTURE (annoyance / desire for change)
**S + wish + S + would + V** — *I wish it would stop raining.*

NOT used: *I wish I would ...* (you can't request yourself).`,
        proTips: [
          "'were' đúng cho mọi ngôi sau wish/if only (formal): 'I wish I were rich.'",
          "Hối tiếc quá khứ → had + V3.",
          "Khó chịu / muốn người khác thay đổi → would + V."
        ],
        proTipsEn: [
          "Use 'were' for all subjects after wish/if only (formal).",
          "Regret about past → had + V3.",
          "Annoyance / wanting change in others → would + V."
        ],
        vocabulary: [
          { word: "wish", meaning: "ước", example: "I wish I had more time." },
          { word: "regret", meaning: "hối tiếc", example: "I regret not going." },
          { word: "if only", meaning: "giá như", example: "If only I could fly!" },
          { word: "annoy", meaning: "làm phiền", example: "I wish you would stop tapping the desk." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu ước.",
            instructionEn: "Complete the wish sentences.",
            sentences: [
              { text: "I wish I ___ (can) speak French fluently.", textEn: "I wish I ___ (can) speak French fluently.", answer: "could" },
              { text: "If only I ___ (study) harder for the exam yesterday.", textEn: "If only I ___ (study) harder for the exam yesterday.", answer: "had studied" },
              { text: "I wish you ___ (not / drive) so fast — it scares me.", textEn: "I wish you ___ (not / drive) so fast.", answer: "wouldn't drive" },
              { text: "She wishes she ___ (be) taller.", textEn: "She wishes she ___ (be) taller.", answer: "were" }
            ]
          }
        ],
        quiz: [
          { question: "'I wish I ___ the truth earlier.' (regret)", options: ["knew", "had known", "would know", "know"], answer: 1, explanation: "Past regret → had + V3." },
          { question: "'I wish it ___ raining so I could go out.'", options: ["stops", "stopped", "would stop", "had stopped"], answer: 2, explanation: "Wishing for future change → would + V." },
          { question: "Most formal: 'If only she ___ here now.'", options: ["was", "is", "were", "be"], answer: 2, explanation: "'Were' is correct for all persons in unreal wishes." }
        ]
      }
    ]
  },

  // ===== MODULE 12: CLEFT SENTENCES =====
  {
    id: "grammar-cleft",
    title: "Câu chẻ (Cleft Sentences)",
    titleEn: "Cleft Sentences",
    icon: "✂️",
    color: "from-amber-500 to-orange-600",
    description: "Tách câu thành hai phần để nhấn mạnh thông tin cụ thể.",
    descriptionEn: "Split a sentence into two parts to emphasize specific information.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "cleft-it-was",
        title: "It-cleft & What-cleft (Pseudo-cleft)",
        titleEn: "It-cleft & What-cleft (Pseudo-cleft)",
        level: 4,
        difficulty: "advanced",
        theory: `## Câu chẻ — nhấn mạnh thông tin

### 1. It-cleft
**It + be + [phần nhấn mạnh] + that/who + phần còn lại**

- *John gave Mary the book yesterday.*
  - *It was **John** who gave Mary the book yesterday.* (nhấn mạnh chủ ngữ)
  - *It was **Mary** who(m) John gave the book to.* (nhấn mạnh tân ngữ gián tiếp)
  - *It was **the book** that John gave Mary yesterday.* (nhấn mạnh tân ngữ trực tiếp)
  - *It was **yesterday** that John gave Mary the book.* (nhấn mạnh thời gian)

### 2. What-cleft (Pseudo-cleft)
**What + S + V + be + [phần nhấn mạnh]**

- *I want **a hot coffee**.* → ***What I want is a hot coffee.***
- *She loves **dancing all night**.* → ***What she loves is dancing all night.***

### 3. All-cleft (nhấn mạnh độc nhất)
**All + S + V + be + [phần nhấn mạnh]**
- ***All I need is your support.*** (Tất cả những gì tôi cần là sự ủng hộ của bạn.)

### Lưu ý
- Trong It-cleft, dùng **was** với danh từ số ít/đếm được/người, **were** với số nhiều.
- What-cleft nhấn mạnh **vật/sự việc** (KHÔNG nhấn mạnh người trực tiếp).`,
        theoryEn: `## Cleft Sentences — emphasizing information

### 1. It-cleft
**It + be + [emphasized part] + that/who + rest**
- *It was John who gave Mary the book.*
- *It was the book that John gave Mary.*

### 2. What-cleft (Pseudo-cleft)
**What + S + V + be + [emphasized part]**
- *What I want is a hot coffee.*

### 3. All-cleft (uniqueness)
**All + S + V + be + [emphasized part]**
- *All I need is your support.*

Notes: 'was' for singular/people, 'were' for plural; What-cleft emphasizes things, not people directly.`,
        proTips: [
          "It-cleft phổ biến trong nói; What-cleft trang trọng hơn, hợp viết.",
          "All-cleft = mạnh nhất, ngụ ý 'chỉ duy nhất điều này'.",
          "Tránh lạm dụng — 1-2 cleft mỗi đoạn essay là đủ."
        ],
        proTipsEn: [
          "It-cleft is common in speech; What-cleft is more formal/written.",
          "All-cleft is the strongest; implies 'only this one thing'.",
          "Don't overuse — 1-2 clefts per essay paragraph is enough."
        ],
        vocabulary: [
          { word: "emphasize", meaning: "nhấn mạnh", example: "Cleft sentences emphasize information." },
          { word: "highlight", meaning: "làm nổi bật", example: "Use cleft to highlight the agent." },
          { word: "particular", meaning: "cụ thể", example: "It is this particular point that matters." },
          { word: "all", meaning: "tất cả (chỉ duy nhất)", example: "All I want is peace." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Viết lại bằng câu chẻ.",
            instructionEn: "Rewrite as cleft.",
            sentences: [
              { text: "Tom broke the window. → It was ___ broke the window.", textEn: "It was ___ broke the window.", answer: "Tom who" },
              { text: "I need rest most. → What I need most ___ rest.", textEn: "What I need most ___ rest.", answer: "is" },
              { text: "She gave me the gift. → It was the gift ___ she gave me.", textEn: "It was the gift ___ she gave me.", answer: "that" },
              { text: "I just want peace. → All ___ want is peace.", textEn: "All ___ want is peace.", answer: "I" }
            ]
          }
        ],
        quiz: [
          { question: "Identify the It-cleft: 'It was Susan who called.' What is emphasized?", options: ["the action of calling", "Susan (the subject)", "the time of calling", "nothing"], answer: 1, explanation: "It-cleft emphasizes whatever is between 'be' and 'who/that'." },
          { question: "Choose the correct what-cleft for 'I love your honesty.'", options: ["What I love is your honesty.", "What love I is your honesty.", "It is your honesty what I love.", "What is I love your honesty."], answer: 0, explanation: "What + S + V + be + emphasized part." },
          { question: "'All ___ wants is a quiet evening.'", options: ["she", "her", "hers", "she's"], answer: 0, explanation: "All + subject + V + be + emphasized." }
        ]
      }
    ]
  },

  // ===== MODULE 13: PARTICIPLE CLAUSES =====
  {
    id: "grammar-participle",
    title: "Mệnh đề phân từ (Participle Clauses)",
    titleEn: "Participle Clauses",
    icon: "🌿",
    color: "from-emerald-500 to-green-600",
    description: "Rút gọn mệnh đề bằng V-ing, V3/ed, having + V3 để câu gọn và trang trọng.",
    descriptionEn: "Reduce clauses with V-ing, V3/ed, having + V3 for concise, formal writing.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "participle-reduced-clauses",
        title: "Rút gọn mệnh đề bằng phân từ",
        titleEn: "Reducing Clauses with Participles",
        level: 4,
        difficulty: "advanced",
        theory: `## Mệnh đề phân từ

### 1. Present participle (V-ing) — chủ động / đồng thời
- *While he **was walking** home, he met an old friend.*
  → ***Walking** home, he met an old friend.*
- *Because she **felt** tired, she went to bed.*
  → ***Feeling** tired, she went to bed.*

### 2. Past participle (V3/ed) — bị động
- *The book, **which was written** by Orwell, is famous.*
  → *The book, **written** by Orwell, is famous.*
- *Because she **was injured** in the accident, she couldn't walk.*
  → ***Injured** in the accident, she couldn't walk.*

### 3. Perfect participle (Having + V3) — hành động xảy ra TRƯỚC
- *After he **had finished** dinner, he watched TV.*
  → ***Having finished** dinner, he watched TV.*
- *After he **had been warned**, he stayed away.*
  → ***Having been warned**, he stayed away.* (perfect passive)

### Quy tắc quan trọng
- **CÙNG chủ ngữ**: chủ ngữ của mệnh đề phân từ phải là chủ ngữ của mệnh đề chính.
- ❌ *Walking down the street, the rain started.* (rain không 'walk') — gọi là "dangling participle".
- ✅ *Walking down the street, **I** felt the rain start.*`,
        theoryEn: `## Participle Clauses

### 1. Present participle (V-ing) — active / simultaneous
*Walking home, he met a friend.*

### 2. Past participle (V3/ed) — passive
*Written by Orwell, the book is famous.*

### 3. Perfect participle (Having + V3) — earlier action
*Having finished dinner, he watched TV.*

### Key rule — same subject
The implied subject of the participle MUST be the subject of the main clause.
❌ *Walking down the street, the rain started.* (dangling)
✅ *Walking down the street, I felt the rain.*`,
        proTips: [
          "Dùng phân từ để câu gọn và sang — rất hợp Writing Task 1 (mô tả biểu đồ).",
          "Tránh 'dangling participle' — luôn kiểm tra ai là chủ ngữ thật.",
          "'Having + V3' = nhấn mạnh thứ tự thời gian; tránh nếu hai hành động xảy ra cùng lúc."
        ],
        proTipsEn: [
          "Participle clauses make writing concise — great for Writing Task 1.",
          "Avoid dangling participles — check the real subject.",
          "Use 'Having + V3' only when actions are sequential."
        ],
        vocabulary: [
          { word: "simultaneously", meaning: "đồng thời", example: "Listening and writing simultaneously is hard." },
          { word: "concise", meaning: "súc tích", example: "Participle clauses make writing concise." },
          { word: "dangling", meaning: "lủng lẳng (lỗi)", example: "Dangling participles are common errors." },
          { word: "imply", meaning: "ngụ ý", example: "The participle implies a subject." }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại để được mệnh đề phân từ đúng.",
            instructionEn: "Reorder into a correct participle clause.",
            items: [
              { scrambled: ["Having", "finished", "his", "homework,", "Tom", "went", "out."], correct: "Having finished his homework, Tom went out.", correctEn: "Having finished his homework, Tom went out." },
              { scrambled: ["Built", "in", "1985,", "the", "bridge", "is", "still", "strong."], correct: "Built in 1985, the bridge is still strong.", correctEn: "Built in 1985, the bridge is still strong." },
              { scrambled: ["Walking", "in", "the", "park,", "she", "saw", "a", "rabbit."], correct: "Walking in the park, she saw a rabbit.", correctEn: "Walking in the park, she saw a rabbit." }
            ]
          },
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn dạng phân từ đúng (V-ing / V3 / Having + V3).",
            instructionEn: "Choose the right participle form.",
            sentences: [
              { text: "___ (write) in 1948, the novel remains popular.", textEn: "___ (write) in 1948, the novel remains popular.", answer: "Written" },
              { text: "___ (finish) the project, she finally relaxed.", textEn: "___ (finish) the project, she finally relaxed.", answer: "Having finished" },
              { text: "___ (feel) hungry, the kids opened the fridge.", textEn: "___ (feel) hungry, the kids opened the fridge.", answer: "Feeling" }
            ]
          }
        ],
        quiz: [
          { question: "Which is a dangling participle?", options: ["Walking home, I felt cold.", "Walking home, the cold wind hit me.", "Having walked home, I felt tired.", "Built in 1985, the bridge stands."], answer: 1, explanation: "Cold wind doesn't walk → dangling." },
          { question: "Reduce: 'Because he was tired, he went to bed.'", options: ["Tired, he went to bed.", "Being tired, he went to bed.", "Tiring, he went to bed.", "Both A and B."], answer: 3, explanation: "Both 'Tired, ...' and 'Being tired, ...' are valid reductions." },
          { question: "'___ all the work, she took a holiday.'", options: ["Finishing", "Having finished", "Finished", "To finish"], answer: 1, explanation: "Sequential past action → Having + V3." }
        ]
      }
    ]
  },

  // ===== MODULE 14: PHRASAL VERBS =====
  {
    id: "grammar-phrasal-verbs",
    title: "Cụm động từ (Phrasal Verbs)",
    titleEn: "Phrasal Verbs",
    icon: "🧩",
    color: "from-indigo-500 to-violet-600",
    description: "Cấu trúc, vị trí tân ngữ và phrasal verbs thông dụng theo chủ đề.",
    descriptionEn: "Structure, object position, and common phrasal verbs by theme.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "phrasal-verbs-structure",
        title: "Cấu trúc & vị trí tân ngữ",
        titleEn: "Structure & Object Position",
        level: 3,
        difficulty: "intermediate",
        theory: `## Cấu trúc Phrasal Verb

Phrasal verb = **động từ + tiểu từ (particle)** — particle là giới từ hoặc trạng từ. Nghĩa thường KHÁC với nghĩa từng từ riêng lẻ.

### 4 loại chính

| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| 1. Tách được, có tân ngữ | Có thể đặt tân ngữ giữa hoặc sau particle | *turn off the light / turn the light off* |
| 2. Không tách được, có tân ngữ | Tân ngữ luôn sau particle | *look after the kids* (KHÔNG: look the kids after) |
| 3. Không có tân ngữ (nội động) | Không cần tân ngữ | *wake up, sit down* |
| 4. Ba phần (verb + particle + prep) | Tân ngữ luôn sau prep | *put up with sb / look forward to sth* |

### Quy tắc đại từ — RẤT QUAN TRỌNG
Khi tân ngữ là **đại từ** (it, him, her, them ...), với loại 1 (tách được) **PHẢI tách**:
- ✅ *Turn **it** off.* / *Pick **them** up.*
- ❌ *Turn off **it**.* / *Pick up **them**.*

### Một số phrasal verbs cực thông dụng
- **give up** = từ bỏ — *Don't give up!*
- **find out** = phát hiện — *I found out the truth.*
- **set up** = thành lập — *They set up a company.*
- **come across** = tình cờ thấy (không tách)
- **look forward to** = mong chờ (3 phần, +V-ing)`,
        theoryEn: `## Phrasal Verb Structure

Phrasal verb = **verb + particle**. Meaning is often different from individual words.

### 4 main types

| Type | Feature | Example |
|------|---------|---------|
| Separable + object | Object can go between or after | turn off the light / turn the light off |
| Inseparable + object | Object always after particle | look after the kids |
| Intransitive (no object) | No object | wake up, sit down |
| Three-part | Object after preposition | put up with sb / look forward to sth |

### Pronoun rule (CRITICAL)
With separable verbs, **pronoun objects MUST be between**:
- ✅ Turn it off. / Pick them up.
- ❌ Turn off it. / Pick up them.`,
        proTips: [
          "Học phrasal verb theo NHÓM CHỦ ĐỀ (sức khỏe, công việc, du lịch) hiệu quả hơn học rời.",
          "Đại từ tân ngữ LUÔN tách: 'turn it off', không 'turn off it'.",
          "Phrasal verb 3 phần luôn đi cùng nhau như cụm cố định: 'look forward to', 'put up with'."
        ],
        proTipsEn: [
          "Learn phrasal verbs by THEME (health, work, travel) — more effective than isolated lists.",
          "Pronoun objects ALWAYS go between: 'turn it off', not 'turn off it'.",
          "Three-part phrasal verbs are fixed chunks: 'look forward to', 'put up with'."
        ],
        vocabulary: [
          { word: "give up", meaning: "từ bỏ", example: "Never give up your dreams." },
          { word: "look after", meaning: "chăm sóc", example: "She looks after her grandmother." },
          { word: "put up with", meaning: "chịu đựng", example: "I can't put up with the noise." },
          { word: "find out", meaning: "phát hiện", example: "I want to find out the truth." },
          { word: "look forward to", meaning: "mong chờ", example: "I look forward to seeing you." },
          { word: "come across", meaning: "tình cờ thấy", example: "I came across an old photo." },
          { word: "set up", meaning: "thành lập", example: "They set up a charity." },
          { word: "turn down", meaning: "từ chối / vặn nhỏ", example: "He turned down the offer." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Sắp xếp lại đại từ đúng vị trí.",
            instructionEn: "Place the pronoun in the correct position.",
            sentences: [
              { text: "Please turn ___ off (the lights → them). → 'Please turn ___ off.'", textEn: "Please turn ___ off.", answer: "them" },
              { text: "I'll pick ___ up (the children → them) at 5 pm.", textEn: "I'll pick ___ up at 5 pm.", answer: "them" },
              { text: "We can't put up with ___ (the noise → it) any longer.", textEn: "We can't put up with ___ any longer.", answer: "it" }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct?", options: ["Turn off it.", "Turn it off.", "Off turn it.", "It turn off."], answer: 1, explanation: "Pronoun objects must go BETWEEN verb and particle." },
          { question: "'I look forward ___ you next week.'", options: ["see", "to see", "to seeing", "seeing"], answer: 2, explanation: "'look forward to' takes V-ing (to is preposition)." },
          { question: "'She looks after ___' — choose correct phrasing.", options: ["after them", "them after", "them", "for them"], answer: 0, explanation: "Inseparable: object stays AFTER particle." }
        ]
      },
      {
        id: "phrasal-verbs-themes",
        title: "Phrasal verbs theo chủ đề",
        titleEn: "Phrasal Verbs by Theme",
        level: 3,
        difficulty: "intermediate",
        theory: `## Phrasal verbs theo chủ đề (cốt lõi cho IELTS Speaking)

### 1. Quan hệ
- **get on (with) sb** = hợp / hoà thuận với ai
- **fall out (with) sb** = cãi nhau, bất hoà
- **make up** = làm lành
- **break up (with)** = chia tay
- **look up to** = ngưỡng mộ
- **look down on** = coi thường

### 2. Công việc & học tập
- **carry out** = thực hiện (a study, a plan)
- **take up** = bắt đầu (sở thích, công việc)
- **get ahead** = thăng tiến
- **fall behind** = tụt lại phía sau
- **catch up (with)** = bắt kịp
- **work out** = giải quyết / luyện tập

### 3. Sức khoẻ
- **come down with** = bị mắc bệnh
- **get over** = hồi phục sau (bệnh, cú sốc)
- **pass out** = ngất xỉu
- **cut down on** = giảm bớt (đường, caffeine)
- **give up** = bỏ (thuốc lá)

### 4. Du lịch
- **set off** = lên đường
- **check in / check out** = nhận/trả phòng
- **stop over** = dừng chân
- **get away** = đi nghỉ
- **see sb off** = tiễn ai

### 5. Tiền bạc
- **save up (for)** = dành dụm cho
- **run out of** = hết
- **pay back** = trả lại tiền
- **splash out (on)** = chi mạnh tay
- **rip off** = chặt chém / lừa giá`,
        theoryEn: `## Phrasal Verbs by Theme (essential for IELTS Speaking)

Same lists as Vietnamese version. Memorize 5-8 per theme and use in your Part 1/2 answers.`,
        proTips: [
          "Học 5-8 phrasal verb / chủ đề và viết 1 ví dụ riêng — nhớ lâu gấp 3.",
          "Trong Speaking, dùng 1-2 phrasal verb tự nhiên / câu trả lời để Lexical Resource +0.5.",
          "Tránh phrasal verb quá lóng (slangy) trong Writing học thuật."
        ],
        proTipsEn: [
          "Learn 5-8 phrasal verbs per theme and write your own example — 3× retention.",
          "In Speaking, use 1-2 natural phrasal verbs per answer — +0.5 Lexical Resource.",
          "Avoid overly slangy phrasal verbs in academic Writing."
        ],
        vocabulary: [
          { word: "get on with", meaning: "hợp với (ai)", example: "I get on well with my colleagues." },
          { word: "carry out", meaning: "thực hiện", example: "Scientists carried out the experiment." },
          { word: "come down with", meaning: "bị mắc (bệnh)", example: "I think I'm coming down with a cold." },
          { word: "set off", meaning: "lên đường", example: "We set off at dawn." },
          { word: "save up", meaning: "dành dụm", example: "She is saving up for a car." },
          { word: "cut down on", meaning: "giảm bớt", example: "I'm cutting down on sugar." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền phrasal verb phù hợp.",
            instructionEn: "Fill in the right phrasal verb.",
            sentences: [
              { text: "I'm ___ ___ ___ a holiday in Italy. (saving)", textEn: "I'm ___ ___ ___ a holiday in Italy.", answer: "saving up for" },
              { text: "She doesn't ___ ___ ___ her sister; they argue a lot.", textEn: "She doesn't ___ ___ ___ her sister.", answer: "get on with" },
              { text: "I need to ___ ___ ___ caffeine — too much coffee!", textEn: "I need to ___ ___ ___ caffeine.", answer: "cut down on" }
            ]
          }
        ],
        quiz: [
          { question: "'I have to ___ smoking for my health.'", options: ["give up", "give in", "give away", "give out"], answer: 0, explanation: "give up = quit (a habit)." },
          { question: "'She ___ a serious flu last week.'", options: ["got over", "came down with", "made up", "set off"], answer: 1, explanation: "come down with = catch (an illness)." },
          { question: "'The hotel staff ___ us very warmly.'", options: ["checked us in", "checked in us", "in checked us", "checked in"], answer: 0, explanation: "Separable + pronoun must go between." }
        ]
      }
    ]
  },

  // ===== MODULE 15: QUESTION FORMS & TAGS =====
  {
    id: "grammar-questions-tags",
    title: "Câu hỏi & Câu hỏi đuôi",
    titleEn: "Question Forms & Tag Questions",
    icon: "❓",
    color: "from-sky-500 to-blue-600",
    description: "Yes/No, WH-, indirect questions, và quy tắc tag questions.",
    descriptionEn: "Yes/No, WH-, indirect questions, and tag question rules.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "question-forms",
        title: "Các loại câu hỏi",
        titleEn: "Question Forms",
        level: 2,
        difficulty: "beginner",
        theory: `## Các loại câu hỏi trong tiếng Anh

### 1. Yes/No Question
**AUX + S + V?**
- *Do you like coffee?* / *Are you tired?* / *Have you eaten?*

### 2. WH- Question
**WH + AUX + S + V?**
- *Where do you live?* / *Why is she crying?*

### 3. WH- là chủ ngữ — KHÔNG đảo
**WH (subject) + V?**
- *Who **called** you?* (KHÔNG: Who did call you?)
- *What **happened**?*

### 4. Indirect / Embedded Question (gián tiếp)
Trong câu hỏi gián tiếp hoặc sau 'I wonder / Could you tell me ...', **KHÔNG đảo** trợ động từ và **KHÔNG dùng do/does/did**.

| Trực tiếp | Gián tiếp |
|-----------|-----------|
| Where does he live? | Could you tell me where **he lives**? |
| What time is it? | Do you know what time **it is**? |
| Did she call? | I wonder if/whether **she called**. |

### 5. Negative Question
- *Don't you like it?* (Bạn không thích nó sao?)
- *Why didn't you tell me?* (gợi sự ngạc nhiên/ trách)`,
        theoryEn: `## Question Forms

1. **Yes/No**: AUX + S + V?
2. **WH-**: WH + AUX + S + V?
3. **WH as subject** — NO inversion: *Who called you?*
4. **Indirect/embedded**: NO inversion, NO do/does/did:
   - Could you tell me where he lives? (NOT: where does he live)
   - I wonder if she called.
5. **Negative**: Don't you like it? (surprise/reproach)`,
        proTips: [
          "WH là chủ ngữ → KHÔNG dùng do/does/did.",
          "Câu hỏi gián tiếp = trật tự khẳng định: 'Could you tell me where it is?' KHÔNG 'where is it'.",
          "Yes/No → 'if' hoặc 'whether' khi đưa vào câu gián tiếp."
        ],
        proTipsEn: [
          "WH as subject → NO do/does/did.",
          "Indirect questions use STATEMENT order: 'where it is' NOT 'where is it'.",
          "Yes/No → 'if' or 'whether' when embedded."
        ],
        vocabulary: [
          { word: "wonder", meaning: "tự hỏi", example: "I wonder where she is." },
          { word: "embedded", meaning: "lồng ghép", example: "Embedded questions are polite." },
          { word: "polite", meaning: "lịch sự", example: "Indirect questions sound more polite." },
          { word: "whether", meaning: "có hay không", example: "I don't know whether to go or not." }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu hỏi gián tiếp.",
            instructionEn: "Reorder the indirect question.",
            items: [
              { scrambled: ["Could", "you", "tell", "me", "where", "the", "station", "is?"], correct: "Could you tell me where the station is?" },
              { scrambled: ["Do", "you", "know", "if", "she", "has", "arrived?"], correct: "Do you know if she has arrived?" },
              { scrambled: ["I", "wonder", "what", "time", "the", "shop", "opens."], correct: "I wonder what time the shop opens." }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct (indirect)?", options: ["Could you tell me where is the bank?", "Could you tell me where the bank is?", "Could you tell me where does the bank?", "Could you tell me where bank is?"], answer: 1, explanation: "Indirect = statement word order." },
          { question: "WH-as-subject question: 'Who ___ the cake?'", options: ["did eat", "ate", "did ate", "is eat"], answer: 1, explanation: "WH-subject → no auxiliary." },
          { question: "Embed: 'Did she leave?'", options: ["I wonder did she leave.", "I wonder if she left.", "I wonder if did she leave.", "I wonder she did leave."], answer: 1, explanation: "Yes/No → if/whether + statement order." }
        ]
      },
      {
        id: "tag-questions",
        title: "Câu hỏi đuôi (Tag Questions)",
        titleEn: "Tag Questions",
        level: 2,
        difficulty: "beginner",
        theory: `## Câu hỏi đuôi

### Quy tắc vàng — TRÁI DẤU
- **Câu khẳng định → đuôi phủ định**: *You are tired, **aren't you**?*
- **Câu phủ định → đuôi khẳng định**: *You don't smoke, **do you**?*

### Cách hình thành đuôi
1. Lấy **trợ động từ** (be / have / will / can / must / do/does/did) + **đại từ chủ ngữ** tương ứng.
2. Nếu câu chính có 'not' (kể cả never, hardly, scarcely) → đuôi khẳng định.

### Trường hợp đặc biệt
- *I am right, **aren't I**?* (KHÔNG: amn't I)
- *Let's go, **shall we**?*
- *Open the door, **will you**?* / *won't you?*
- *Nobody called, **did they**?* (nobody/somebody → they)
- *There is a problem, **isn't there**?* (there → there)
- *This/That is yours, **isn't it**?*

### Ngữ điệu
- **Đuôi xuống ↘** = chắc chắn, mong đồng ý: *It's a nice day, isn't it ↘?*
- **Đuôi lên ↗** = thật sự hỏi, không chắc: *You're coming, aren't you ↗?*`,
        theoryEn: `## Tag Questions

### Golden rule — opposite polarity
- Affirmative → negative tag: *You are tired, aren't you?*
- Negative → affirmative tag: *You don't smoke, do you?*

### Specials
- *I am right, aren't I?* (NOT amn't I)
- *Let's go, shall we?*
- *Open the door, will you?*
- *Nobody called, did they?*
- *There is a problem, isn't there?*

### Intonation
- Falling ↘ = expecting agreement.
- Rising ↗ = real question.`,
        proTips: [
          "Trợ động từ trong tag PHẢI khớp tense và person với câu chính.",
          "'I am' → đuôi 'aren't I'.",
          "Nobody / somebody / no one / everyone → đại từ 'they' trong tag."
        ],
        proTipsEn: [
          "Tag auxiliary MUST match tense and person of main clause.",
          "'I am' → tag 'aren't I'.",
          "Nobody / somebody → 'they' in tag."
        ],
        vocabulary: [
          { word: "tag", meaning: "đuôi (câu)", example: "Add a tag question at the end." },
          { word: "polarity", meaning: "tính trái dấu", example: "Tag has opposite polarity." },
          { word: "intonation", meaning: "ngữ điệu", example: "Falling intonation expects agreement." },
          { word: "agree", meaning: "đồng ý", example: "She nodded to agree." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Thêm câu hỏi đuôi đúng.",
            instructionEn: "Add the correct tag.",
            sentences: [
              { text: "She lives in Hanoi, ___?", textEn: "She lives in Hanoi, ___?", answer: "doesn't she" },
              { text: "You haven't met him, ___?", textEn: "You haven't met him, ___?", answer: "have you" },
              { text: "Let's start, ___?", textEn: "Let's start, ___?", answer: "shall we" },
              { text: "There aren't any cookies, ___?", textEn: "There aren't any cookies, ___?", answer: "are there" },
              { text: "I'm late, ___?", textEn: "I'm late, ___?", answer: "aren't I" }
            ]
          }
        ],
        quiz: [
          { question: "'You can swim, ___?'", options: ["can you", "can't you", "do you", "don't you"], answer: 1, explanation: "Affirmative + can → negative tag 'can't you'." },
          { question: "'Nobody knows the answer, ___?'", options: ["do they", "does he", "doesn't he", "did they"], answer: 0, explanation: "nobody = negative → positive tag with 'they'." },
          { question: "'Let's go for a walk, ___?'", options: ["will we", "shall we", "do we", "don't we"], answer: 1, explanation: "After 'Let's' → 'shall we'." }
        ]
      }
    ]
  },

  // ===== MODULE 16: LINKING WORDS =====
  {
    id: "grammar-linking-words",
    title: "Từ nối & Discourse Markers",
    titleEn: "Linking Words & Discourse Markers",
    icon: "🔗",
    color: "from-teal-500 to-emerald-600",
    description: "Liên từ, trạng từ liên kết và cụm chuyển ý cho Writing & Speaking.",
    descriptionEn: "Conjunctions, conjunctive adverbs, and transition phrases for Writing & Speaking.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "linking-words-overview",
        title: "Bảng từ nối theo chức năng",
        titleEn: "Linking Words by Function",
        level: 3,
        difficulty: "intermediate",
        theory: `## Bảng từ nối theo chức năng

### 1. Bổ sung (Addition)
- and, also, in addition, furthermore, moreover, besides, what's more
- *Furthermore, the data show a clear trend.*

### 2. Tương phản (Contrast)
- but, however, nevertheless, nonetheless, on the other hand, in contrast, whereas, while, although/though, despite/in spite of (+ N/V-ing)
- *Although it rained, we went out.* / *Despite the rain, we went out.*

### 3. Nguyên nhân (Cause)
- because (+ clause), since, as, due to / owing to (+ N), because of (+ N)
- *Due to heavy traffic, we were late.*

### 4. Kết quả (Result)
- so, therefore, thus, hence, consequently, as a result
- *He worked hard; therefore, he succeeded.*

### 5. Mục đích (Purpose)
- to / in order to / so as to (+ V), so that (+ clause)
- *She studied hard so that she could pass.*

### 6. Liệt kê (Sequencing)
- firstly, secondly, finally, then, afterwards, meanwhile, subsequently
- *Firstly, ... Secondly, ... Finally, ...*

### 7. Ví dụ & nhấn mạnh
- for example, for instance, such as, namely, in particular, especially
- in fact, indeed, clearly, undoubtedly

### 8. Tóm tắt & kết luận
- in conclusion, to sum up, overall, all in all, in short

### Lưu ý dấu câu
- **However**, **Therefore**, **Moreover** — khi đứng đầu câu, theo sau bằng dấu phẩy.
- **Although** + clause; **Despite/In spite of** + N/V-ing.`,
        theoryEn: `## Linking Words by Function

### Addition: and, also, in addition, furthermore, moreover, besides
### Contrast: but, however, nevertheless, on the other hand, whereas, although, despite + N/V-ing
### Cause: because, since, as, due to + N, because of + N
### Result: so, therefore, thus, hence, consequently, as a result
### Purpose: to / in order to + V, so that + clause
### Sequence: firstly, secondly, finally, meanwhile
### Examples: for example, for instance, such as, namely
### Summary: in conclusion, to sum up, overall

Punctuation: 'However', 'Therefore' followed by comma when sentence-initial.`,
        proTips: [
          "Đa dạng từ nối = +0.5 Cohesion. Đừng lặp 'and', 'but' liên tục.",
          "'Although' + clause; 'Despite' + danh từ / V-ing — đừng lẫn lộn.",
          "Dấu chấm phẩy ; trước 'however / therefore' khi nối hai mệnh đề độc lập."
        ],
        proTipsEn: [
          "Variety of linkers = +0.5 Cohesion. Don't overuse 'and' or 'but'.",
          "'Although' + clause; 'Despite' + noun/V-ing — don't confuse.",
          "Use semicolon ; before 'however / therefore' when joining two independent clauses."
        ],
        vocabulary: [
          { word: "furthermore", meaning: "hơn nữa", example: "Furthermore, costs are rising." },
          { word: "nevertheless", meaning: "tuy vậy", example: "It rained; nevertheless, we went out." },
          { word: "consequently", meaning: "do đó", example: "He overslept; consequently, he was late." },
          { word: "whereas", meaning: "trong khi (đối lập)", example: "He likes tea, whereas she likes coffee." },
          { word: "in spite of", meaning: "bất chấp", example: "In spite of the rain, we went hiking." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn từ nối phù hợp (although / despite / because / so).",
            instructionEn: "Choose the right linker.",
            sentences: [
              { text: "___ being tired, she finished the report.", textEn: "___ being tired, she finished the report.", answer: "Despite" },
              { text: "___ it was raining, we went hiking.", textEn: "___ it was raining, we went hiking.", answer: "Although" },
              { text: "He missed the bus ___ he overslept.", textEn: "He missed the bus ___ he overslept.", answer: "because" },
              { text: "It was late, ___ we went home.", textEn: "It was late, ___ we went home.", answer: "so" }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct?", options: ["Despite he was tired, ...", "Despite of being tired, ...", "Despite being tired, ...", "Although being tired, ..."], answer: 2, explanation: "'Despite' + N/V-ing." },
          { question: "Best for FORMAL writing (cause):", options: ["because", "due to", "since", "as"], answer: 1, explanation: "'Due to + N' is the most formal cause linker." },
          { question: "Punctuation: 'It rained ___ however ___ we went out.'", options: [", ,", "; ,", ". ,", "no punctuation"], answer: 1, explanation: "Semicolon + 'however' + comma joins two independent clauses." }
        ]
      }
    ]
  },

  // ===== MODULE 17: WORD ORDER & ADVERBS =====
  {
    id: "grammar-word-order",
    title: "Trật tự từ & Trạng từ",
    titleEn: "Word Order & Adverb Position",
    icon: "📐",
    color: "from-yellow-500 to-amber-600",
    description: "Vị trí trạng từ (manner, place, time) và trật tự tính từ trước danh từ.",
    descriptionEn: "Adverb positions (manner, place, time) and adjective order before nouns.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "adverb-position",
        title: "Vị trí trạng từ trong câu",
        titleEn: "Adverb Position",
        level: 3,
        difficulty: "intermediate",
        theory: `## Vị trí trạng từ

### 1. Trật tự cuối câu — MPT
**M**anner → **P**lace → **T**ime

*She sang **beautifully** (M) **at the concert** (P) **last night** (T).*

❌ *She sang last night beautifully at the concert.* (sai trật tự)

### 2. Trạng từ tần suất (frequency adverbs)
always, usually, often, sometimes, rarely, never, hardly ever

- **TRƯỚC động từ thường**: *She **always arrives** early.*
- **SAU động từ 'be'**: *She **is always** late.*
- **Giữa AUX và V chính**: *I have **never** seen it.* / *I will **always** love you.*

### 3. Trạng từ chỉ mức độ (very, quite, really, extremely)
- TRƯỚC tính từ / trạng từ khác: *She is **very** clever.* / *He runs **really** fast.*
- KHÔNG đặt trước động từ thường: ❌ *She very studies.*

### 4. Trạng từ nối (however, therefore, also)
- Đầu câu + dấu phẩy: *However, ...*
- Hoặc giữa câu giữa hai dấu phẩy: *He, however, disagreed.*`,
        theoryEn: `## Adverb Position

### 1. End-position order — MPT
**M**anner → **P**lace → **T**ime
*She sang beautifully at the concert last night.*

### 2. Frequency adverbs (always, often, never...)
- BEFORE main verb: *She always arrives early.*
- AFTER 'be': *She is always late.*
- BETWEEN aux + main: *I have never seen it.*

### 3. Degree (very, quite, really)
Before adjective/adverb only — NOT before plain verbs.

### 4. Conjunctive adverbs (however, therefore)
Sentence-initial + comma; or mid-sentence between two commas.`,
        proTips: [
          "Học thuộc M-P-T: Manner → Place → Time.",
          "Frequency adverbs trước V thường, sau 'be'.",
          "'Very' KHÔNG đặt trước động từ thường — sai 100%."
        ],
        proTipsEn: [
          "Memorize M-P-T order: Manner → Place → Time.",
          "Frequency adverbs go BEFORE main verb, AFTER 'be'.",
          "'Very' NEVER directly modifies a plain verb."
        ],
        vocabulary: [
          { word: "carefully", meaning: "cẩn thận", example: "She drove carefully." },
          { word: "frequently", meaning: "thường xuyên", example: "He travels frequently." },
          { word: "extremely", meaning: "cực kỳ", example: "It's extremely cold." },
          { word: "rarely", meaning: "hiếm khi", example: "She rarely complains." }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại theo trật tự M-P-T đúng.",
            instructionEn: "Reorder using M-P-T.",
            items: [
              { scrambled: ["He", "drove", "carefully", "to", "school", "this", "morning."], correct: "He drove carefully to school this morning." },
              { scrambled: ["They", "play", "tennis", "well", "in", "the", "park", "every", "Sunday."], correct: "They play tennis well in the park every Sunday." }
            ]
          },
          {
            type: "fill-in-blank" as const,
            instruction: "Đặt 'always' đúng vị trí.",
            instructionEn: "Place 'always' correctly.",
            sentences: [
              { text: "She ___ arrives ___ on time. (always)", textEn: "She ___ arrives ___ on time.", answer: "always" },
              { text: "He is ___ happy ___. (always)", textEn: "He is ___ happy ___.", answer: "always" },
              { text: "I have ___ wanted ___ to learn French. (always)", textEn: "I have ___ wanted ___ to learn French.", answer: "always" }
            ]
          }
        ],
        quiz: [
          { question: "Correct order:", options: ["He plays well football in the park.", "He plays football well in the park.", "He plays football in the park well.", "Well he plays football in the park."], answer: 1, explanation: "Verb + object + Manner + Place." },
          { question: "Where does 'never' go in: 'I have ___ been ___ to Paris ___'?", options: ["beginning", "between have and been", "after been", "end"], answer: 1, explanation: "Frequency adverb goes between AUX and main verb." },
          { question: "Which is INCORRECT?", options: ["She is very intelligent.", "He runs very quickly.", "She very studies.", "It is very important."], answer: 2, explanation: "'Very' cannot directly modify a plain verb." }
        ]
      },
      {
        id: "adjective-order",
        title: "Trật tự tính từ trước danh từ",
        titleEn: "Adjective Order",
        level: 3,
        difficulty: "intermediate",
        theory: `## Trật tự tính từ — OSASCOMP

Khi có nhiều tính từ đứng trước một danh từ, ta theo trật tự:

**O**pinion → **S**ize → **A**ge → **S**hape → **C**olour → **O**rigin → **M**aterial → **P**urpose → **N**oun

| Vị trí | Loại | Ví dụ |
|--------|------|-------|
| 1 | Opinion | beautiful, ugly, lovely, amazing |
| 2 | Size | big, small, tiny, huge |
| 3 | Age | old, new, young, ancient |
| 4 | Shape | round, square, flat |
| 5 | Colour | red, blue, dark |
| 6 | Origin | French, Asian, Vietnamese |
| 7 | Material | wooden, silk, plastic |
| 8 | Purpose | sleeping (bag), running (shoes) |

### Ví dụ
- *a **lovely** (opinion) **little** (size) **old** (age) **round** (shape) **black** (colour) **wooden** (material) **jewellery** (purpose) **box***
- *a **beautiful new red Italian sports car***

### Quy tắc thực dụng
- Trong giao tiếp, hiếm khi dùng quá 3-4 tính từ. Hai tính từ khác loại → KHÔNG cần dấu phẩy.
- Hai tính từ cùng loại (cùng opinion) → có thể dùng dấu phẩy hoặc 'and': *a kind, generous teacher / a kind and generous teacher.*`,
        theoryEn: `## Adjective Order — OSASCOMP

**O**pinion → **S**ize → **A**ge → **S**hape → **C**olour → **O**rigin → **M**aterial → **P**urpose → **N**oun

*a lovely little old round black wooden jewellery box*
*a beautiful new red Italian sports car*

In real speech, rarely use more than 3-4 adjectives. No comma between different categories.`,
        proTips: [
          "Học mnemonic: 'OSASCOMP'.",
          "Tối đa 3-4 tính từ trong câu nói tự nhiên.",
          "Cùng loại (2 opinions): dùng dấu phẩy hoặc 'and'."
        ],
        proTipsEn: [
          "Remember the mnemonic: OSASCOMP.",
          "Limit to 3-4 adjectives in natural speech.",
          "Same category (2 opinions): use comma or 'and'."
        ],
        vocabulary: [
          { word: "wooden", meaning: "bằng gỗ", example: "a wooden box" },
          { word: "ancient", meaning: "cổ", example: "an ancient temple" },
          { word: "rectangular", meaning: "hình chữ nhật", example: "a rectangular table" }
        ],
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp tính từ theo OSASCOMP.",
            instructionEn: "Order adjectives by OSASCOMP.",
            items: [
              { scrambled: ["a", "small", "old", "Japanese", "wooden", "table"], correct: "a small old Japanese wooden table" },
              { scrambled: ["a", "beautiful", "long", "red", "silk", "dress"], correct: "a beautiful long red silk dress" },
              { scrambled: ["an", "amazing", "new", "Italian", "sports", "car"], correct: "an amazing new Italian sports car" }
            ]
          }
        ],
        quiz: [
          { question: "Correct order:", options: ["a Japanese small old table", "a small old Japanese table", "an old small Japanese table", "a small Japanese old table"], answer: 1, explanation: "Size → Age → Origin → Noun." },
          { question: "Choose the right phrase:", options: ["a leather brown nice bag", "a nice brown leather bag", "a brown nice leather bag", "leather a nice brown bag"], answer: 1, explanation: "Opinion → Colour → Material → Noun." },
          { question: "OSASCOMP stands for:", options: ["Opinion-Size-Age-Shape-Colour-Origin-Material-Purpose", "Opinion-Style-Age-Size-Colour-Origin-Material-Purpose", "Origin-Size-Age-Shape-Colour-Opinion-Material-Purpose", "Opinion-Size-Age-Shape-Colour-Origin-Material-Position"], answer: 0, explanation: "OSASCOMP = Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose." }
        ]
      }
    ]
  },

  // ===== MODULE 18: COMMONLY CONFUSED PAIRS =====
  {
    id: "grammar-confusing-pairs",
    title: "Cặp từ dễ nhầm (Confusing Pairs)",
    titleEn: "Commonly Confused Pairs",
    icon: "⚖️",
    color: "from-red-500 to-rose-600",
    description: "Phân biệt các cặp từ ngữ pháp dễ nhầm: say/tell, make/do, fewer/less, etc.",
    descriptionEn: "Distinguish tricky grammar pairs: say/tell, make/do, fewer/less, etc.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "confusing-pairs-1",
        title: "Bộ 1: say/tell, make/do, fewer/less, much/many",
        titleEn: "Set 1: say/tell, make/do, fewer/less, much/many",
        level: 2,
        difficulty: "intermediate",
        theory: `## Cặp từ dễ nhầm — Bộ 1

### 1. say vs tell
- **say** + (to sb) + nội dung: *He **said** (to me) that he was tired.*
- **tell** + sb + nội dung (luôn cần tân ngữ người): *He **told me** that he was tired.*
- ❌ *He said me that ...* / *He told that ...*

### 2. make vs do
- **make** = tạo ra / sản xuất / kết quả: *make a cake, make a decision, make a noise, make a mistake, make money*
- **do** = thực hiện / hoạt động chung: *do homework, do the dishes, do exercise, do business, do well*

### 3. fewer vs less
- **fewer** + danh từ đếm được số nhiều: *fewer people, fewer cars*
- **less** + danh từ KHÔNG đếm được: *less water, less time*
- (Trong nói thông thường, 'less people' phổ biến nhưng KHÔNG chuẩn academic.)

### 4. much vs many
- **many** + đếm được số nhiều: *many books*
- **much** + KHÔNG đếm được: *much money*
- Trong câu khẳng định, dùng **a lot of / lots of** thay vì much/many: *I have **a lot of** friends.*`,
        theoryEn: `## Confusing Pairs — Set 1

### say vs tell
- say + (to sb) + content
- tell + sb + content (always needs personal object)
- ❌ He said me / He told that

### make vs do
- make = create/produce/result: cake, decision, mistake, money
- do = perform/activity: homework, exercise, business

### fewer vs less
- fewer + countable plural
- less + uncountable

### much vs many
- many + countable plural
- much + uncountable
- Affirmative → prefer 'a lot of'.`,
        proTips: [
          "tell LUÔN cần người: tell ME, tell HER.",
          "make → kết quả/sản phẩm; do → hoạt động.",
          "Đếm được → fewer/many; Không đếm được → less/much."
        ],
        proTipsEn: [
          "tell ALWAYS needs a person: tell ME, tell HER.",
          "make → product/result; do → activity.",
          "Countable → fewer/many; Uncountable → less/much."
        ],
        vocabulary: [
          { word: "make a decision", meaning: "đưa ra quyết định", example: "He made a tough decision." },
          { word: "do homework", meaning: "làm bài tập về nhà", example: "I do my homework every evening." },
          { word: "fewer people", meaning: "ít người hơn", example: "Fewer people came than expected." },
          { word: "much information", meaning: "nhiều thông tin", example: "I don't have much information." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền say / tell / make / do / fewer / less / much / many.",
            instructionEn: "Fill in the right word.",
            sentences: [
              { text: "She ___ me a funny story.", textEn: "She ___ me a funny story.", answer: "told" },
              { text: "Could you ___ a favour for me?", textEn: "Could you ___ a favour for me?", answer: "do" },
              { text: "I want to ___ a cup of tea.", textEn: "I want to ___ a cup of tea.", answer: "make" },
              { text: "There is ___ noise in this room. (uncountable)", textEn: "There is ___ noise in this room.", answer: "much" },
              { text: "We need ___ chairs for the meeting. (countable)", textEn: "We need ___ chairs for the meeting.", answer: "many" },
              { text: "Use ___ sugar — it's healthier. (uncountable)", textEn: "Use ___ sugar — it's healthier.", answer: "less" }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct?", options: ["He told that he was sorry.", "He said me he was sorry.", "He told me he was sorry.", "He said me sorry."], answer: 2, explanation: "tell + sb + content." },
          { question: "Choose make/do: ___ progress.", options: ["make", "do", "both possible"], answer: 0, explanation: "make progress (fixed collocation)." },
          { question: "Academic correct: '___ students passed than last year.'", options: ["Less", "Fewer", "Lesser", "Few"], answer: 1, explanation: "students = countable → fewer." }
        ]
      },
      {
        id: "confusing-pairs-2",
        title: "Bộ 2: since/for, during/while, used to/be used to, lie/lay",
        titleEn: "Set 2: since/for, during/while, used to/be used to, lie/lay",
        level: 3,
        difficulty: "intermediate",
        theory: `## Cặp từ dễ nhầm — Bộ 2

### 1. since vs for
- **since** + mốc thời gian: *since 2010 / since Monday / since I was a child*
- **for** + khoảng thời gian: *for 3 years / for two weeks*
- Cả hai đi với Present Perfect: *I have lived here **since** 2015 / **for** 9 years.*

### 2. during vs while
- **during** + DANH TỪ: *during the meeting, during summer*
- **while** + MỆNH ĐỀ (S+V): *while I was studying*

### 3. used to + V vs be used to + V-ing
- **used to + V (nguyên mẫu)** = từng (quá khứ, không còn): *I **used to** smoke.* (Tôi từng hút thuốc.)
- **be used to + V-ing / N** = quen với: *I **am used to** **getting** up early.* (Tôi quen với việc dậy sớm.)
- **get used to + V-ing** = đang dần quen: *I'm **getting used to** the noise.*

### 4. lie vs lay
- **lie / lay / lain** = nằm (KHÔNG có tân ngữ): *I **lie** down. / Yesterday I **lay** down.*
- **lay / laid / laid** = đặt (có tân ngữ): *Please **lay** the book on the table.*

### 5. its vs it's
- **its** = thuộc về nó (sở hữu): *The dog wagged **its** tail.*
- **it's** = it is / it has: ***It's** raining. / **It's** been ages.*`,
        theoryEn: `## Confusing Pairs — Set 2

### since (point) vs for (duration)
- since 2010 / for 9 years.

### during (+N) vs while (+clause)
- during the meeting / while I was studying.

### used to + V (past habit) vs be used to + V-ing (be accustomed)
- I used to smoke. / I am used to getting up early.

### lie/lay/lain (no object) vs lay/laid/laid (with object)
- I lie down. / Please lay the book on the table.

### its (possessive) vs it's (= it is/has)`,
        proTips: [
          "Mốc → since; Khoảng → for.",
          "during + N; while + S+V.",
          "used to + V (quá khứ) ≠ be used to + V-ing (quen)."
        ],
        proTipsEn: [
          "Point in time → since; Duration → for.",
          "during + N; while + clause.",
          "used to + V (past habit) ≠ be used to + V-ing (be accustomed)."
        ],
        vocabulary: [
          { word: "since", meaning: "kể từ (mốc)", example: "I have known her since 2018." },
          { word: "for", meaning: "trong (khoảng)", example: "I have known her for 6 years." },
          { word: "while", meaning: "trong khi (S+V)", example: "While she was cooking, I read." },
          { word: "during", meaning: "trong (N)", example: "During the meeting, he took notes." },
          { word: "used to", meaning: "đã từng", example: "I used to play piano." },
          { word: "be used to", meaning: "quen với", example: "I'm used to early mornings." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền since / for / during / while / used to / be used to.",
            instructionEn: "Fill in the right word/phrase.",
            sentences: [
              { text: "I have studied English ___ ten years.", textEn: "I have studied English ___ ten years.", answer: "for" },
              { text: "She has lived in Tokyo ___ 2019.", textEn: "She has lived in Tokyo ___ 2019.", answer: "since" },
              { text: "___ the lecture, my phone rang.", textEn: "___ the lecture, my phone rang.", answer: "During" },
              { text: "___ I was sleeping, the cat escaped.", textEn: "___ I was sleeping, the cat escaped.", answer: "While" },
              { text: "I ___ live in Hanoi, but now I'm in Saigon.", textEn: "I ___ live in Hanoi, but now I'm in Saigon.", answer: "used to" },
              { text: "I'm not ___ ___ ___ working night shifts yet.", textEn: "I'm not ___ ___ ___ working night shifts yet.", answer: "used to" }
            ]
          }
        ],
        quiz: [
          { question: "'I haven't seen him ___ Christmas.'", options: ["for", "since", "during", "while"], answer: 1, explanation: "Christmas = point in time → since." },
          { question: "'I lay/laid the keys on the table.' Past tense?", options: ["lay", "laid", "lain", "lied"], answer: 1, explanation: "lay/laid/laid = put down (transitive)." },
          { question: "'___ a great show!' (it's vs its)", options: ["Its", "It's", "Its'"], answer: 1, explanation: "It's = It is." }
        ]
      }
    ]
  },

  // ===== MODULE 19: NOUN CLAUSES =====
  {
    id: "grammar-noun-clauses",
    title: "Mệnh đề danh từ (Noun Clauses)",
    titleEn: "Noun Clauses",
    icon: "📦",
    color: "from-slate-500 to-gray-600",
    description: "Mệnh đề bắt đầu bằng that / wh- / whether / if làm chủ ngữ, tân ngữ, bổ ngữ.",
    descriptionEn: "Clauses starting with that / wh- / whether / if as subject, object, or complement.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "noun-clauses-overview",
        title: "Mệnh đề danh từ — chức năng & loại",
        titleEn: "Noun Clauses — Functions & Types",
        level: 4,
        difficulty: "advanced",
        theory: `## Mệnh đề danh từ

Một mệnh đề danh từ hoạt động như một danh từ trong câu — có thể làm **chủ ngữ**, **tân ngữ**, **bổ ngữ**, hoặc **tân ngữ của giới từ**.

### 1. Bắt đầu bằng 'that'
- **Tân ngữ**: *I know **that he is honest**.* ('that' có thể bỏ trong informal.)
- **Chủ ngữ**: ***That she lied** surprised everyone.* (rất trang trọng — thường dùng 'It' giả: *It surprised everyone that she lied.*)
- **Bổ ngữ**: *The truth is **that we lost**.*

### 2. Bắt đầu bằng wh- (what, who, where, when, why, how)
- *I don't know **what he wants**.*
- ***What you said** hurt me.*
- *Tell me **how it works**.*
- ⚠ Trật tự là KHẲNG ĐỊNH (S+V), KHÔNG phải câu hỏi: ❌ *I don't know **what does he want**.*

### 3. Bắt đầu bằng 'whether / if' (Yes/No)
- *I don't know **whether/if he will come**.*
- Sau giới từ, chỉ dùng 'whether': *It depends on **whether** he agrees.* (KHÔNG: on if)
- Trước 'or not' và trước to-infinitive, chỉ dùng 'whether': *I don't know **whether** to stay or leave.*

### Tóm tắt cấu trúc
| Loại | Bắt đầu | Lưu ý |
|------|---------|-------|
| That-clause | that + S+V | 'that' có thể bỏ khi làm tân ngữ |
| Wh-clause | what/who/where/... + S+V | KHÔNG đảo |
| Yes/No-clause | whether/if + S+V | sau giới từ chỉ 'whether' |`,
        theoryEn: `## Noun Clauses

A noun clause acts as a noun: subject, object, complement, or object of preposition.

### 1. that-clauses
- *I know that he is honest.* (object — 'that' optional informal)
- *That she lied surprised everyone.* (subject — formal)
- Pattern: *It surprised everyone that she lied.* (extraposition)

### 2. wh-clauses
- *I don't know what he wants.*
- Statement word order, NOT question.
- ❌ *I don't know what does he want.*

### 3. whether/if-clauses (Yes/No)
- After prepositions: only 'whether'.
- Before 'or not' and 'to-infinitive': only 'whether'.`,
        proTips: [
          "Wh-clause LUÔN có trật tự khẳng định (S+V), không đảo trợ động từ.",
          "Sau giới từ → bắt buộc 'whether' (không 'if').",
          "'It + verb + that-clause' là cách trang trọng để mở đầu (It is clear that ...)."
        ],
        proTipsEn: [
          "Wh-clauses ALWAYS use statement word order (S+V).",
          "After prepositions → must use 'whether' (not 'if').",
          "'It + verb + that-clause' is a formal way to open (It is clear that ...)."
        ],
        vocabulary: [
          { word: "whether", meaning: "có hay không", example: "I'm not sure whether to go." },
          { word: "depend on", meaning: "phụ thuộc vào", example: "It depends on whether he agrees." },
          { word: "extraposition", meaning: "đảo it lên đầu", example: "It is true that she left." },
          { word: "complement", meaning: "bổ ngữ", example: "The fact is that we lost." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền that / what / whether / if.",
            instructionEn: "Fill in: that / what / whether / if.",
            sentences: [
              { text: "I don't know ___ he is coming or not.", textEn: "I don't know ___ he is coming or not.", answer: "whether" },
              { text: "Tell me ___ you want for dinner.", textEn: "Tell me ___ you want for dinner.", answer: "what" },
              { text: "It is true ___ she won the prize.", textEn: "It is true ___ she won the prize.", answer: "that" },
              { text: "It depends on ___ we have time.", textEn: "It depends on ___ we have time.", answer: "whether" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp lại mệnh đề danh từ.",
            instructionEn: "Reorder noun clause.",
            items: [
              { scrambled: ["I", "don't", "know", "where", "she", "lives."], correct: "I don't know where she lives." },
              { scrambled: ["What", "he", "said", "is", "not", "true."], correct: "What he said is not true." },
              { scrambled: ["I", "wonder", "whether", "to", "accept", "the", "offer."], correct: "I wonder whether to accept the offer." }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct?", options: ["I don't know where does he live.", "I don't know where he lives.", "I don't know where lives he.", "I don't know where he live."], answer: 1, explanation: "Wh-clause uses statement order." },
          { question: "After preposition, use:", options: ["if", "whether", "both", "neither"], answer: 1, explanation: "After preposition → 'whether' only." },
          { question: "'___ surprised me was his calmness.'", options: ["That", "Which", "What", "If"], answer: 2, explanation: "'What' = the thing that → noun clause as subject." }
        ]
      }
    ]
  }
];
