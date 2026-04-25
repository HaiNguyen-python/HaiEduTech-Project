import type { LanguageModule } from "./types";

export const grammarModules: LanguageModule[] = [
  // ===== MODULE 1: TENSES =====
  {
    id: "grammar-tenses",
    title: "Các thì trong tiếng Anh",
    titleEn: "English Tenses",
    icon: "⏰",
    color: "from-blue-500 to-cyan-500",
    description: "Nắm vững 12 thì cơ bản trong tiếng Anh",
    descriptionEn: "Master the 12 basic English tenses",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "tenses-present",
        title: "Thì hiện tại",
        titleEn: "Present Tenses",
        level: 2,
        difficulty: "beginner",
        theory: `## Các thì hiện tại

### 1. Present Simple (Hiện tại đơn)
- **Cấu trúc:** S + V(s/es) + O
- **Dùng khi:** thói quen, sự thật chung, lịch trình
- VD: *She **goes** to school every day.*

### 2. Present Continuous (Hiện tại tiếp diễn)
- **Cấu trúc:** S + am/is/are + V-ing + O
- **Dùng khi:** hành động đang diễn ra, kế hoạch tương lai gần
- VD: *They **are studying** English now.*

### 3. Present Perfect (Hiện tại hoàn thành)
- **Cấu trúc:** S + have/has + V3/ed + O
- **Dùng khi:** hành động đã hoàn thành, kinh nghiệm, kết quả ở hiện tại
- VD: *I **have visited** Paris twice.*

### Dấu hiệu nhận biết
| Thì | Dấu hiệu |
|-----|-----------|
| Simple | always, usually, every day, often |
| Continuous | now, at the moment, right now |
| Perfect | already, yet, just, ever, never, since, for |`,
        theoryEn: `## Present Tenses

### 1. Present Simple
- **Structure:** S + V(s/es) + O
- **Usage:** habits, general truths, schedules
- E.g.: *She **goes** to school every day.*

### 2. Present Continuous
- **Structure:** S + am/is/are + V-ing + O
- **Usage:** actions happening now, near future plans
- E.g.: *They **are studying** English now.*

### 3. Present Perfect
- **Structure:** S + have/has + V3/ed + O
- **Usage:** completed actions, experiences, results in present
- E.g.: *I **have visited** Paris twice.*

### Signal Words
| Tense | Keywords |
|-------|----------|
| Simple | always, usually, every day, often |
| Continuous | now, at the moment, right now |
| Perfect | already, yet, just, ever, never, since, for |`,
        proTips: [
          "Stative verbs (know, love, believe) không dùng ở thì tiếp diễn",
          "Since + mốc thời gian, For + khoảng thời gian",
        ],
        proTipsEn: [
          "Stative verbs (know, love, believe) are not used in continuous tenses",
          "Since + point in time, For + duration",
        ],
        vocabulary: [
          { word: "habit", meaning: "thói quen", example: "Reading is a good habit.", partOfSpeech: "noun" },
          { word: "currently", meaning: "hiện tại", example: "She is currently working from home.", partOfSpeech: "adverb" },
          { word: "recently", meaning: "gần đây", example: "I have recently changed my job.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền đúng dạng động từ vào chỗ trống",
            instructionEn: "Fill in the correct verb form",
            sentences: [
              { text: "She ___ (go) to school every morning.", textEn: "She ___ (go) to school every morning.", answer: "goes", hint: "Present Simple - thói quen" },
              { text: "They ___ (study) English right now.", textEn: "They ___ (study) English right now.", answer: "are studying", hint: "Present Continuous - đang xảy ra" },
              { text: "I ___ (visit) Japan three times.", textEn: "I ___ (visit) Japan three times.", answer: "have visited", hint: "Present Perfect - kinh nghiệm" },
              { text: "He ___ (not/like) coffee.", textEn: "He ___ (not/like) coffee.", answer: "doesn't like", hint: "Present Simple - sở thích" },
            ],
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp các từ thành câu hoàn chỉnh",
            instructionEn: "Reorder the words to form correct sentences",
            items: [
              { scrambled: ["always", "she", "breakfast", "eats", "at 7"], correct: "She always eats breakfast at 7.", correctEn: "She always eats breakfast at 7." },
              { scrambled: ["have", "I", "finished", "already", "homework", "my"], correct: "I have already finished my homework.", correctEn: "I have already finished my homework." },
            ],
          },
        ],
        quiz: [
          { question: "Choose the correct sentence:", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She is go to school every day."], answer: 1, explanation: "Present Simple: 3rd person singular adds -s/-es" },
          { question: "'I ___ (live) here since 2010.' - Choose the correct answer:", options: ["live", "am living", "have lived", "lived"], answer: 2, explanation: "Since + point in time → Present Perfect" },
          { question: "Which verb is NOT used in continuous tenses?", options: ["run", "swim", "believe", "cook"], answer: 2, explanation: "'Believe' is a stative verb, not used in continuous tenses" },
        ],
      },
      {
        id: "tenses-past",
        title: "Thì quá khứ",
        titleEn: "Past Tenses",
        level: 2,
        difficulty: "beginner",
        theory: `## Các thì quá khứ

### 1. Past Simple (Quá khứ đơn)
- **Cấu trúc:** S + V2/ed + O
- **Dùng khi:** hành động đã hoàn thành trong quá khứ
- VD: *I **went** to the park yesterday.*

### 2. Past Continuous (Quá khứ tiếp diễn)
- **Cấu trúc:** S + was/were + V-ing + O
- **Dùng khi:** hành động đang diễn ra tại một thời điểm trong quá khứ
- VD: *She **was reading** when I called.*

### 3. Past Perfect (Quá khứ hoàn thành)
- **Cấu trúc:** S + had + V3/ed + O
- **Dùng khi:** hành động xảy ra trước một hành động khác trong quá khứ
- VD: *He **had left** before I arrived.*`,
        theoryEn: `## Past Tenses

### 1. Past Simple
- **Structure:** S + V2/ed + O
- **Usage:** completed actions in the past
- E.g.: *I **went** to the park yesterday.*

### 2. Past Continuous
- **Structure:** S + was/were + V-ing + O
- **Usage:** action in progress at a past moment
- E.g.: *She **was reading** when I called.*

### 3. Past Perfect
- **Structure:** S + had + V3/ed + O
- **Usage:** action before another past action
- E.g.: *He **had left** before I arrived.*`,
        proTips: [
          "Past Simple + while + Past Continuous: 2 hành động xảy ra đồng thời",
          "Past Perfect thường đi cùng 'before', 'after', 'by the time'",
        ],
        proTipsEn: [
          "Past Simple + while + Past Continuous: 2 simultaneous actions",
          "Past Perfect often goes with 'before', 'after', 'by the time'",
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chia động từ ở thì quá khứ phù hợp",
            instructionEn: "Use the correct past tense",
            sentences: [
              { text: "I ___ (see) that movie last week.", textEn: "I ___ (see) that movie last week.", answer: "saw", hint: "Past Simple" },
              { text: "She ___ (cook) when the phone rang.", textEn: "She ___ (cook) when the phone rang.", answer: "was cooking", hint: "Past Continuous - bị gián đoạn" },
              { text: "They ___ (already/finish) dinner before we arrived.", textEn: "They ___ (already/finish) dinner before we arrived.", answer: "had already finished", hint: "Past Perfect - xảy ra trước" },
            ],
          },
        ],
        quiz: [
          { question: "While I ___ (walk), it started to rain.", options: ["walked", "was walking", "had walked", "am walking"], answer: 1, explanation: "While + Past Continuous: an ongoing action that gets interrupted" },
          { question: "By the time she arrived, he ___.", options: ["left", "has left", "had left", "was leaving"], answer: 2, explanation: "By the time + Past Simple → Past Perfect for the earlier action" },
          { question: "'Yesterday' is a signal word for which tense?", options: ["Present Perfect", "Past Simple", "Past Continuous", "Future Simple"], answer: 1, explanation: "'Yesterday' is a clear signal for Past Simple" },
        ],
      },
      {
        id: "tenses-future",
        title: "Thì tương lai",
        titleEn: "Future Tenses",
        level: 2,
        difficulty: "intermediate",
        theory: `## Các thì tương lai

### 1. Future Simple (Tương lai đơn)
- **Cấu trúc:** S + will + V + O
- **Dùng khi:** dự đoán, quyết định tức thời, lời hứa
- VD: *I **will help** you with that.*

### 2. Be going to
- **Cấu trúc:** S + am/is/are + going to + V + O
- **Dùng khi:** kế hoạch đã định, dự đoán có căn cứ
- VD: *It **is going to** rain - look at those clouds!*

### 3. Future Continuous
- **Cấu trúc:** S + will be + V-ing
- **Dùng khi:** hành động sẽ đang diễn ra tại một thời điểm tương lai
- VD: *At 8 PM, I **will be watching** TV.*

### So sánh Will vs Going to
| Will | Going to |
|------|----------|
| Quyết định tức thời | Kế hoạch đã lên |
| Dự đoán chung | Dự đoán có bằng chứng |
| Lời hứa, đề nghị | Ý định đã có sẵn |`,
        theoryEn: `## Future Tenses

### 1. Future Simple
- **Structure:** S + will + V + O
- **Usage:** predictions, instant decisions, promises
- E.g.: *I **will help** you with that.*

### 2. Be going to
- **Structure:** S + am/is/are + going to + V + O
- **Usage:** planned actions, evidence-based predictions
- E.g.: *It **is going to** rain - look at those clouds!*

### 3. Future Continuous
- **Structure:** S + will be + V-ing
- **Usage:** action in progress at a future moment
- E.g.: *At 8 PM, I **will be watching** TV.*

### Will vs Going to
| Will | Going to |
|------|----------|
| Instant decisions | Pre-planned |
| General predictions | Evidence-based predictions |
| Promises, offers | Existing intentions |`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn will hoặc be going to",
            instructionEn: "Choose will or be going to",
            sentences: [
              { text: "Look out! The vase ___ fall!", textEn: "Look out! The vase ___ fall!", answer: "is going to", hint: "Dự đoán có bằng chứng" },
              { text: "Don't worry, I ___ help you.", textEn: "Don't worry, I ___ help you.", answer: "will", hint: "Quyết định tức thời" },
              { text: "She ___ study medicine next year. She's already enrolled.", textEn: "She ___ study medicine next year. She's already enrolled.", answer: "is going to", hint: "Kế hoạch đã định" },
            ],
          },
        ],
        quiz: [
          { question: "'I promise I ___ be late.' - Choose the correct answer:", options: ["am not going to", "won't", "am not", "don't"], answer: 1, explanation: "Promises → use 'will' (won't = will not)" },
          { question: "When do we use 'be going to'?", options: ["Instant decisions", "Promises", "Pre-planned actions", "General truths"], answer: 2, explanation: "'Be going to' is used for pre-planned actions" },
          { question: "This time tomorrow, I ___ on the beach.", options: ["will lie", "will be lying", "am going to lie", "lie"], answer: 1, explanation: "An action in progress at a future time → Future Continuous" },
        ],
      },
    ],
  },

  // ===== MODULE 2: CONDITIONALS =====
  {
    id: "grammar-conditionals",
    title: "Câu điều kiện",
    titleEn: "Conditionals",
    icon: "🔀",
    color: "from-purple-500 to-pink-500",
    description: "Học cách dùng câu điều kiện loại 0-3 và mixed",
    descriptionEn: "Learn conditional types 0-3 and mixed conditionals",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "conditionals-basic",
        title: "Câu điều kiện loại 0, 1, 2",
        titleEn: "Conditionals Type 0, 1, 2",
        level: 3,
        difficulty: "intermediate",
        theory: `## Câu điều kiện loại 0, 1, 2

### Type 0: Sự thật chung
- **If + S + V (hiện tại), S + V (hiện tại)**
- VD: *If you heat water to 100°C, it **boils**.*

### Type 1: Điều kiện có thể xảy ra (tương lai)
- **If + S + V (hiện tại), S + will + V**
- VD: *If it **rains**, I **will stay** home.*

### Type 2: Điều kiện không có thật (hiện tại)
- **If + S + V (quá khứ), S + would + V**
- VD: *If I **were** you, I **would study** harder.*

> 💡 Lưu ý: Trong Type 2, luôn dùng "were" cho tất cả các ngôi (If I were, If he were...)`,
        theoryEn: `## Conditionals Type 0, 1, 2

### Type 0: General truths
- **If + S + V (present), S + V (present)**
- E.g.: *If you heat water to 100°C, it **boils**.*

### Type 1: Real/possible condition (future)
- **If + S + V (present), S + will + V**
- E.g.: *If it **rains**, I **will stay** home.*

### Type 2: Unreal condition (present)
- **If + S + V (past), S + would + V**
- E.g.: *If I **were** you, I **would study** harder.*

> 💡 Note: In Type 2, always use "were" for all subjects (If I were, If he were...)`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chia động từ cho phù hợp với loại câu điều kiện",
            instructionEn: "Use the correct verb form for the conditional type",
            sentences: [
              { text: "If you ___ (mix) red and blue, you get purple.", textEn: "If you ___ (mix) red and blue, you get purple.", answer: "mix", hint: "Type 0 - sự thật" },
              { text: "If she ___ (study) hard, she will pass.", textEn: "If she ___ (study) hard, she will pass.", answer: "studies", hint: "Type 1 - có thể xảy ra" },
              { text: "If I ___ (be) rich, I would travel the world.", textEn: "If I ___ (be) rich, I would travel the world.", answer: "were", hint: "Type 2 - không có thật" },
            ],
          },
        ],
        quiz: [
          { question: "If I ___ you, I would apologize.", options: ["am", "was", "were", "be"], answer: 2, explanation: "Type 2: always use 'were' for all subjects" },
          { question: "Which tense is used in the IF clause of Type 1?", options: ["Past Simple", "Present Simple", "Future Simple", "Present Perfect"], answer: 1, explanation: "If + Present Simple, S + will + V" },
          { question: "If water reaches 0°C, it ___.", options: ["will freeze", "would freeze", "freezes", "froze"], answer: 2, explanation: "Type 0: general truths → both clauses use Present Simple" },
        ],
      },
      {
        id: "conditionals-advanced",
        title: "Câu điều kiện loại 3 & Mixed",
        titleEn: "Conditionals Type 3 & Mixed",
        level: 4,
        difficulty: "advanced",
        theory: `## Câu điều kiện loại 3 & Mixed

### Type 3: Điều kiện không có thật (quá khứ)
- **If + S + had + V3, S + would have + V3**
- VD: *If I **had known**, I **would have helped**.*
- Diễn tả sự tiếc nuối về quá khứ

### Mixed Conditionals

#### Mix 1: Quá khứ → Hiện tại
- **If + S + had + V3, S + would + V**
- VD: *If I **had studied** harder, I **would be** a doctor now.*

#### Mix 2: Hiện tại → Quá khứ
- **If + S + V (past), S + would have + V3**
- VD: *If she **were** braver, she **would have spoken** up.*`,
        theoryEn: `## Conditionals Type 3 & Mixed

### Type 3: Unreal condition (past)
- **If + S + had + V3, S + would have + V3**
- E.g.: *If I **had known**, I **would have helped**.*
- Expresses regret about the past

### Mixed Conditionals

#### Mix 1: Past → Present
- **If + S + had + V3, S + would + V**
- E.g.: *If I **had studied** harder, I **would be** a doctor now.*

#### Mix 2: Present → Past
- **If + S + V (past), S + would have + V3**
- E.g.: *If she **were** braver, she **would have spoken** up.*`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu điều kiện loại 3 hoặc Mixed",
            instructionEn: "Complete Type 3 or Mixed conditionals",
            sentences: [
              { text: "If I ___ (know) about the party, I would have come.", textEn: "If I ___ (know) about the party, I would have come.", answer: "had known", hint: "Type 3 - quá khứ không có thật" },
              { text: "If she had saved money, she ___ (be) rich now.", textEn: "If she had saved money, she ___ (be) rich now.", answer: "would be", hint: "Mixed: quá khứ → hiện tại" },
            ],
          },
        ],
        quiz: [
          { question: "If he had studied, he ___ the exam.", options: ["will pass", "would pass", "would have passed", "passes"], answer: 2, explanation: "Type 3: If + had V3, would have V3" },
          { question: "What structure does 'Past → Present' mixed conditional use?", options: ["If + V2, would + V", "If + had V3, would + V", "If + V1, will + V", "If + had V3, would have V3"], answer: 1, explanation: "Past condition (had V3) affecting present result (would V)" },
          { question: "If I ___ harder last year, I would have a better job now.", options: ["worked", "had worked", "have worked", "work"], answer: 1, explanation: "Mixed: If + had V3 (past), would V (present)" },
        ],
      },
    ],
  },

  // ===== MODULE 3: PASSIVE VOICE =====
  {
    id: "grammar-passive",
    title: "Câu bị động",
    titleEn: "Passive Voice",
    icon: "🔄",
    color: "from-emerald-500 to-teal-500",
    description: "Chuyển đổi câu chủ động sang bị động ở mọi thì",
    descriptionEn: "Transform active to passive voice across all tenses",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "passive-basic",
        title: "Câu bị động cơ bản",
        titleEn: "Basic Passive Voice",
        level: 2,
        difficulty: "beginner",
        theory: `## Câu bị động cơ bản

### Công thức chung
**S + be + V3/ed (+ by + Agent)**

### Chuyển đổi qua các thì
| Thì | Chủ động | Bị động |
|-----|---------|---------|
| Present Simple | He **writes** letters. | Letters **are written** by him. |
| Past Simple | She **painted** the wall. | The wall **was painted** by her. |
| Present Perfect | They **have built** a bridge. | A bridge **has been built**. |
| Future Simple | We **will finish** it. | It **will be finished**. |
| Present Continuous | She **is making** a cake. | A cake **is being made**. |

### Khi nào dùng bị động?
1. Không biết/không quan trọng ai thực hiện hành động
2. Muốn nhấn mạnh đối tượng chịu tác động
3. Trong văn bản khoa học, tin tức, quy trình`,
        theoryEn: `## Basic Passive Voice

### General Formula
**S + be + V3/ed (+ by + Agent)**

### Passive across tenses
| Tense | Active | Passive |
|-------|--------|---------|
| Present Simple | He **writes** letters. | Letters **are written** by him. |
| Past Simple | She **painted** the wall. | The wall **was painted** by her. |
| Present Perfect | They **have built** a bridge. | A bridge **has been built**. |
| Future Simple | We **will finish** it. | It **will be finished**. |
| Present Continuous | She **is making** a cake. | A cake **is being made**. |

### When to use passive?
1. Unknown/unimportant agent
2. Emphasize the object
3. Scientific, news, process writing`,
        exercises: [
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp thành câu bị động đúng",
            instructionEn: "Reorder into correct passive sentences",
            items: [
              { scrambled: ["was", "the", "letter", "written", "by", "Tom"], correct: "The letter was written by Tom.", correctEn: "The letter was written by Tom." },
              { scrambled: ["are", "these", "books", "sold", "worldwide"], correct: "These books are sold worldwide.", correctEn: "These books are sold worldwide." },
            ],
          },
          {
            type: "fill-in-blank" as const,
            instruction: "Chuyển câu chủ động sang bị động",
            instructionEn: "Change active to passive voice",
            sentences: [
              { text: "Active: Someone stole my bike. → Passive: My bike ___.", textEn: "Active: Someone stole my bike. → Passive: My bike ___.", answer: "was stolen", hint: "Past Simple passive" },
              { text: "Active: They build houses here. → Passive: Houses ___ here.", textEn: "Active: They build houses here. → Passive: Houses ___ here.", answer: "are built", hint: "Present Simple passive" },
            ],
          },
        ],
        quiz: [
          { question: "Convert to passive: 'They have repaired the car.'", options: ["The car has been repaired.", "The car have been repaired.", "The car was repaired.", "The car is repaired."], answer: 0, explanation: "Present Perfect passive: has/have been + V3" },
          { question: "Which sentence is correct?", options: ["The cake is being make.", "The cake is being made.", "The cake is been made.", "The cake being is made."], answer: 1, explanation: "Present Continuous passive: is/are being + V3" },
          { question: "When should you use passive voice?", options: ["To emphasize the subject", "To emphasize the object/receiver of the action", "When the sentence is too short", "When writing casual emails"], answer: 1, explanation: "Passive voice emphasizes the object/receiver of the action" },
        ],
      },
      {
        id: "passive-advanced",
        title: "Bị động nâng cao & Causative",
        titleEn: "Advanced Passive & Causative",
        level: 4,
        difficulty: "advanced",
        theory: `## Bị động nâng cao & Causative

### Bị động với động từ tường thuật
- *People say that he is rich.* → **It is said that he is rich.** / **He is said to be rich.**
- Các động từ: say, believe, think, report, consider, expect

### Bị động với động từ có 2 tân ngữ
- *She gave me a book.*
  → **I was given a book.** (nhấn mạnh người nhận)
  → **A book was given to me.** (nhấn mạnh vật)

### Causative (Thể sai khiến)
- **have/get + O + V3** → nhờ ai đó làm gì
- VD: *I **had my hair cut** yesterday.* (Tôi đi cắt tóc)
- VD: *She **got her car repaired**.* (Cô ấy cho sửa xe)`,
        theoryEn: `## Advanced Passive & Causative

### Passive with reporting verbs
- *People say that he is rich.* → **It is said that he is rich.** / **He is said to be rich.**
- Verbs: say, believe, think, report, consider, expect

### Passive with two objects
- *She gave me a book.*
  → **I was given a book.** (emphasize receiver)
  → **A book was given to me.** (emphasize object)

### Causative
- **have/get + O + V3** → arrange for someone to do something
- E.g.: *I **had my hair cut** yesterday.*
- E.g.: *She **got her car repaired**.*`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu bị động nâng cao",
            instructionEn: "Complete the advanced passive sentences",
            sentences: [
              { text: "People believe that she is innocent. → She ___ to be innocent.", textEn: "People believe that she is innocent. → She ___ to be innocent.", answer: "is believed", hint: "Bị động với reporting verb" },
              { text: "I need to fix my phone. → I need to ___ my phone ___.", textEn: "I need to fix my phone. → I need to ___ my phone ___.", answer: "get/fixed", hint: "Causative: get + O + V3" },
            ],
          },
        ],
        quiz: [
          { question: "'It is reported that the economy is improving.' - What structure is this?", options: ["Causative", "Passive with reporting verb", "Mixed conditional", "Relative clause"], answer: 1, explanation: "It + be + V3 (reporting verb) + that clause" },
          { question: "'I had my car washed.' means:", options: ["I washed my car", "I had someone wash my car", "My car broke down", "I am washing my car"], answer: 1, explanation: "Causative: have + O + V3 = arrange for someone to do something" },
          { question: "Convert to passive: 'They gave her a prize.'", options: ["A prize was gave to her.", "She was given a prize.", "Her was given a prize.", "A prize given to her."], answer: 1, explanation: "Passive with two objects - emphasizing the receiver" },
        ],
      },
    ],
  },

  // ===== MODULE 4: REPORTED SPEECH =====
  {
    id: "grammar-reported-speech",
    title: "Câu tường thuật",
    titleEn: "Reported Speech",
    icon: "💬",
    color: "from-orange-500 to-amber-500",
    description: "Chuyển lời nói trực tiếp sang gián tiếp",
    descriptionEn: "Convert direct to indirect speech",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "reported-statements",
        title: "Tường thuật câu trần thuật & câu hỏi",
        titleEn: "Reported Statements & Questions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Câu tường thuật: Trần thuật & Câu hỏi

### Câu trần thuật
- **S + said (that) + S + V (lùi thì)**
- VD: "I am tired." → He said (that) he **was** tired.

### Bảng lùi thì
| Direct | Reported |
|--------|----------|
| Present Simple → | Past Simple |
| Present Continuous → | Past Continuous |
| Present Perfect → | Past Perfect |
| Past Simple → | Past Perfect |
| will → | would |
| can → | could |

### Câu hỏi Yes/No
- **S + asked + if/whether + S + V (lùi thì)**
- "Do you like coffee?" → She asked **if I liked** coffee.

### Câu hỏi Wh-
- **S + asked + Wh- + S + V (lùi thì)** (không đảo ngữ)
- "Where do you live?" → He asked **where I lived**.`,
        theoryEn: `## Reported Speech: Statements & Questions

### Statements
- **S + said (that) + S + V (backshift)**
- E.g.: "I am tired." → He said (that) he **was** tired.

### Backshift Table
| Direct | Reported |
|--------|----------|
| Present Simple → | Past Simple |
| Present Continuous → | Past Continuous |
| Present Perfect → | Past Perfect |
| Past Simple → | Past Perfect |
| will → | would |
| can → | could |

### Yes/No Questions
- **S + asked + if/whether + S + V (backshift)**
- "Do you like coffee?" → She asked **if I liked** coffee.

### Wh- Questions
- **S + asked + Wh- + S + V (backshift)** (no inversion)
- "Where do you live?" → He asked **where I lived**.`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chuyển sang câu tường thuật",
            instructionEn: "Convert to reported speech",
            sentences: [
              { text: "\"I love this song.\" → She said she ___ that song.", textEn: "\"I love this song.\" → She said she ___ that song.", answer: "loved", hint: "Present Simple → Past Simple" },
              { text: "\"Are you coming?\" → He asked ___ I was coming.", textEn: "\"Are you coming?\" → He asked ___ I was coming.", answer: "if", hint: "Yes/No question → if/whether" },
              { text: "\"Where did you go?\" → She asked where I ___.", textEn: "\"Where did you go?\" → She asked where I ___.", answer: "had gone", hint: "Past Simple → Past Perfect" },
            ],
          },
        ],
        quiz: [
          { question: "\"I will call you.\" → He said he ___ call me.", options: ["will", "would", "can", "could"], answer: 1, explanation: "will → would khi lùi thì" },
          { question: "\"Do you speak English?\" → She asked ___.", options: ["do I speak English", "if I spoke English", "that I spoke English", "whether do I speak English"], answer: 1, explanation: "Yes/No → asked if/whether + S + V (không đảo)" },
          { question: "Câu tường thuật KHÔNG lùi thì khi:", options: ["Lời nói vẫn đúng ở hiện tại", "Người nói là nam", "Câu ngắn", "Dùng 'tell' thay 'say'"], answer: 0, explanation: "Nếu sự thật vẫn đúng, có thể không lùi thì" },
        ],
      },
      {
        id: "reported-commands",
        title: "Tường thuật mệnh lệnh & đề nghị",
        titleEn: "Reported Commands & Requests",
        level: 3,
        difficulty: "intermediate",
        theory: `## Tường thuật mệnh lệnh & đề nghị

### Câu mệnh lệnh
- **S + told/ordered + O + (not) to + V**
- "Sit down!" → The teacher **told** us **to sit** down.
- "Don't run!" → She **told** him **not to run**.

### Câu đề nghị / yêu cầu
- **S + asked + O + (not) to + V**
- "Please help me." → He **asked** me **to help** him.
- "Could you open the door?" → She **asked** me **to open** the door.

### Câu khuyên
- **S + advised + O + (not) to + V**
- "You should study more." → He **advised** me **to study** more.

### Lời đề xuất
- **S + suggested + V-ing / that + S + (should) + V**
- "Let's go!" → She **suggested going** / **suggested that we go**.`,
        theoryEn: `## Reported Commands & Requests

### Commands
- **S + told/ordered + O + (not) to + V**
- "Sit down!" → The teacher **told** us **to sit** down.
- "Don't run!" → She **told** him **not to run**.

### Requests
- **S + asked + O + (not) to + V**
- "Please help me." → He **asked** me **to help** him.

### Advice
- **S + advised + O + (not) to + V**
- "You should study more." → He **advised** me **to study** more.

### Suggestions
- **S + suggested + V-ing / that + S + (should) + V**
- "Let's go!" → She **suggested going** / **suggested that we go**.`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chuyển sang câu tường thuật dạng mệnh lệnh/đề nghị",
            instructionEn: "Convert to reported commands/requests",
            sentences: [
              { text: "\"Close the door!\" → She told me ___ the door.", textEn: "\"Close the door!\" → She told me ___ the door.", answer: "to close", hint: "told + O + to V" },
              { text: "\"Don't be late.\" → He told us ___ late.", textEn: "\"Don't be late.\" → He told us ___ late.", answer: "not to be", hint: "told + O + not to V" },
              { text: "\"Let's go swimming.\" → She suggested ___.", textEn: "\"Let's go swimming.\" → She suggested ___.", answer: "going swimming", hint: "suggested + V-ing" },
            ],
          },
        ],
        quiz: [
          { question: "\"Please wait here.\" → She asked me ___.", options: ["wait here", "to wait there", "waiting there", "waited there"], answer: 1, explanation: "asked + O + to V; here → there" },
          { question: "\"Don't touch that!\" → He told her ___.", options: ["to not touch that", "not to touch that", "don't touch that", "not touching that"], answer: 1, explanation: "told + O + not to V" },
          { question: "\"Let's have lunch.\" → He suggested ___.", options: ["to have lunch", "having lunch", "have lunch", "had lunch"], answer: 1, explanation: "suggested + V-ing" },
        ],
      },
    ],
  },

  // ===== MODULE 5: RELATIVE CLAUSES =====
  {
    id: "grammar-relative-clauses",
    title: "Mệnh đề quan hệ",
    titleEn: "Relative Clauses",
    icon: "🔗",
    color: "from-indigo-500 to-violet-500",
    description: "Sử dụng who, which, that, whose, where, when",
    descriptionEn: "Using who, which, that, whose, where, when",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "relative-defining",
        title: "Mệnh đề quan hệ xác định",
        titleEn: "Defining Relative Clauses",
        level: 3,
        difficulty: "intermediate",
        theory: `## Mệnh đề quan hệ xác định (Defining)

Dùng để xác định danh từ đứng trước, **không có dấu phẩy**.

### Đại từ quan hệ
| Đại từ | Thay thế cho | Ví dụ |
|--------|-------------|-------|
| **who** | người (chủ ngữ) | The man **who** called you is my boss. |
| **whom** | người (tân ngữ) | The girl **whom** I met is kind. |
| **which** | vật | The book **which** I bought is great. |
| **that** | người/vật | The car **that** he drives is new. |
| **whose** | sở hữu | The boy **whose** father is a doctor won. |
| **where** | nơi chốn | The city **where** I was born is small. |
| **when** | thời gian | I remember the day **when** we met. |

### Lược bỏ đại từ quan hệ
- Có thể lược bỏ **who/whom/which/that** khi chúng làm **tân ngữ**
- VD: The book ~~which~~ I bought → The book I bought ✓`,
        theoryEn: `## Defining Relative Clauses

Used to identify the noun before them, **no commas**.

### Relative Pronouns
| Pronoun | Replaces | Example |
|---------|----------|---------|
| **who** | person (subject) | The man **who** called you is my boss. |
| **whom** | person (object) | The girl **whom** I met is kind. |
| **which** | thing | The book **which** I bought is great. |
| **that** | person/thing | The car **that** he drives is new. |
| **whose** | possession | The boy **whose** father is a doctor won. |
| **where** | place | The city **where** I was born is small. |
| **when** | time | I remember the day **when** we met. |

### Omitting relative pronouns
- Can omit **who/whom/which/that** when they are the **object**
- E.g.: The book ~~which~~ I bought → The book I bought ✓`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền đại từ quan hệ phù hợp",
            instructionEn: "Fill in the correct relative pronoun",
            sentences: [
              { text: "The woman ___ lives next door is a teacher.", textEn: "The woman ___ lives next door is a teacher.", answer: "who", hint: "person - subject" },
              { text: "The movie ___ we watched was boring.", textEn: "The movie ___ we watched was boring.", answer: "which", hint: "thing - object (or that)" },
              { text: "The man ___ car is red is my uncle.", textEn: "The man ___ car is red is my uncle.", answer: "whose", hint: "possession" },
              { text: "The restaurant ___ we had dinner was expensive.", textEn: "The restaurant ___ we had dinner was expensive.", answer: "where", hint: "place" },
            ],
          },
        ],
        quiz: [
          { question: "Choose the correct sentence:", options: ["The boy who his father is rich.", "The boy whose father is rich.", "The boy who's father is rich.", "The boy whom father is rich."], answer: 1, explanation: "Use 'whose' to show possession." },
          { question: "When can we omit a relative pronoun?", options: ["When it is the subject", "When it is the object", "When we use 'whose'", "Never"], answer: 1, explanation: "We can omit the pronoun only when it functions as the object in the relative clause." },
          { question: "'That' cannot be used after:", options: ["a noun for a person", "a noun for a thing", "a comma in a non-defining clause", "a superlative"], answer: 2, explanation: "'That' is not used in non-defining relative clauses with commas." },
        ],
      },
      {
        id: "relative-nondefining",
        title: "Mệnh đề quan hệ không xác định",
        titleEn: "Non-defining Relative Clauses",
        level: 3,
        difficulty: "intermediate",
        theory: `## Mệnh đề quan hệ không xác định (Non-defining)

Bổ sung thông tin phụ, **có dấu phẩy**, không thể dùng **that**.

### Cấu trúc
- *My sister, **who** lives in Paris, is a chef.*
- *This book, **which** I bought yesterday, is amazing.*

### So sánh
| Defining | Non-defining |
|----------|-------------|
| Không dấu phẩy | Có dấu phẩy |
| Dùng được that | KHÔNG dùng that |
| Bỏ → câu mất nghĩa | Bỏ → câu vẫn đúng |
| Có thể lược bỏ đại từ (tân ngữ) | KHÔNG lược bỏ |`,
        theoryEn: `## Non-defining Relative Clauses

Add extra information, **with commas**, cannot use **that**.

### Structure
- *My sister, **who** lives in Paris, is a chef.*
- *This book, **which** I bought yesterday, is amazing.*

### Comparison
| Defining | Non-defining |
|----------|-------------|
| No commas | With commas |
| Can use that | CANNOT use that |
| Remove → sentence loses meaning | Remove → sentence still OK |
| Can omit pronoun (object) | CANNOT omit |`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền who hoặc which (non-defining clause)",
            instructionEn: "Fill in who or which (non-defining clause)",
            sentences: [
              { text: "My brother, ___ is 25, works at Google.", textEn: "My brother, ___ is 25, works at Google.", answer: "who", hint: "person" },
              { text: "The Eiffel Tower, ___ is in Paris, attracts millions of visitors.", textEn: "The Eiffel Tower, ___ is in Paris, attracts millions of visitors.", answer: "which", hint: "thing - do not use that" },
            ],
          },
        ],
        quiz: [
          { question: "'Paris, ___ is the capital of France, is beautiful.'", options: ["that", "which", "where", "whom"], answer: 1, explanation: "In a non-defining clause, use 'which', not 'that'." },
          { question: "Which sentence contains a non-defining clause?", options: ["The man who called is my boss.", "My father, who is 60, still works.", "I know the girl that sings.", "Anyone who is late will be punished."], answer: 1, explanation: "The commas show that the clause is non-defining." },
          { question: "Can a non-defining clause use 'that'?", options: ["Yes", "No", "Only for things", "Only for people"], answer: 1, explanation: "Never use 'that' in a non-defining relative clause." },
        ],
      },
      {
        id: "relative-reduced",
        title: "Rút gọn mệnh đề quan hệ",
        titleEn: "Reduced Relative Clauses",
        level: 4,
        difficulty: "advanced",
        theory: `## Rút gọn mệnh đề quan hệ

### 1. Rút gọn chủ động → V-ing
- The man **who is standing** there → The man **standing** there
- Students **who study** hard → Students **studying** hard

### 2. Rút gọn bị động → V3/ed
- The book **which was written** by Hai → The book **written** by Hai
- Letters **that were sent** yesterday → Letters **sent** yesterday

### 3. Rút gọn với to-infinitive
- The first person **who arrived** → The first person **to arrive**
- Dùng sau: the first, the last, the only, ordinal numbers

### Lưu ý
- Chỉ rút gọn khi đại từ quan hệ là **chủ ngữ** của mệnh đề
- Không rút gọn khi đại từ là tân ngữ`,
        theoryEn: `## Reduced Relative Clauses

### 1. Active reduction → V-ing
- The man **who is standing** there → The man **standing** there
- Students **who study** hard → Students **studying** hard

### 2. Passive reduction → V3/ed
- The book **which was written** by Hai → The book **written** by Hai
- Letters **that were sent** yesterday → Letters **sent** yesterday

### 3. Reduction with to-infinitive
- The first person **who arrived** → The first person **to arrive**
- Used after: the first, the last, the only, ordinal numbers

### Note
- Only reduce when relative pronoun is the **subject**
- Cannot reduce when it's the object`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Reduce the relative clause",
            instructionEn: "Reduce the relative clause",
            sentences: [
              { text: "The boy who is playing guitar → The boy ___ guitar.", textEn: "The boy who is playing guitar → The boy ___ guitar.", answer: "playing", hint: "active clause → V-ing" },
              { text: "The car which was made in Japan → The car ___ in Japan.", textEn: "The car which was made in Japan → The car ___ in Japan.", answer: "made", hint: "passive clause → past participle" },
              { text: "He was the last person who left. → He was the last person ___.", textEn: "He was the last person who left. → He was the last person ___.", answer: "to leave", hint: "the last → to + verb" },
            ],
          },
        ],
        quiz: [
          { question: "Reduce the sentence: 'The woman who is sitting there is my mom.'", options: ["The woman sat there is my mom.", "The woman sitting there is my mom.", "The woman to sit there is my mom.", "The woman sit there is my mom."], answer: 1, explanation: "Active clause → V-ing: 'who is sitting' becomes 'sitting'." },
          { question: "Reduce the phrase: 'The letter which was written by her.'", options: ["The letter writing by her", "The letter wrote by her", "The letter written by her", "The letter to write by her"], answer: 2, explanation: "Passive clause → past participle: 'which was written' becomes 'written'." },
          { question: "When do we use a to-infinitive in a reduced relative clause?", options: ["After any noun referring to a person", "After the first / last / only and ordinal expressions", "Whenever the clause is passive", "Whenever there is a comma"], answer: 1, explanation: "Use 'to + verb' after expressions like 'the first', 'the last', 'the only', and ordinal numbers." },
        ],
      },
    ],
  },

  // ===== MODULE 6: ARTICLES & PREPOSITIONS =====
  {
    id: "grammar-articles-prepositions",
    title: "Mạo từ & Giới từ",
    titleEn: "Articles & Prepositions",
    icon: "📝",
    color: "from-rose-500 to-red-500",
    description: "Sử dụng đúng a/an/the và các giới từ phổ biến",
    descriptionEn: "Correct usage of a/an/the and common prepositions",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "articles-usage",
        title: "Mạo từ A, An, The",
        titleEn: "Articles A, An, The",
        level: 2,
        difficulty: "beginner",
        theory: `## Mạo từ A, An, The

### A / An (Mạo từ không xác định)
- Dùng cho danh từ **số ít, đếm được, chưa xác định**
- **A** + phụ âm: a book, a dog, a university (phát âm /juː/)
- **An** + nguyên âm: an apple, an hour (h câm)

### The (Mạo từ xác định)
Dùng khi:
1. Đã nhắc đến trước đó: *I saw **a** dog. **The** dog was big.*
2. Duy nhất: *the sun, the moon, the Earth*
3. So sánh nhất: *the tallest, the best*
4. Tên riêng đặc biệt: *the USA, the Mekong River*

### Không dùng mạo từ (Zero Article)
1. Danh từ số nhiều / không đếm được (nói chung): *Cats are cute. Water is essential.*
2. Tên người, thành phố: *Hanoi, Vietnam, John*
3. Bữa ăn, thể thao: *breakfast, football*
4. Ngôn ngữ: *English, Vietnamese*`,
        theoryEn: `## Articles A, An, The

### A / An (Indefinite article)
- For **singular, countable, unspecified** nouns
- **A** + consonant sound: a book, a dog, a university (/juː/)
- **An** + vowel sound: an apple, an hour (silent h)

### The (Definite article)
Used when:
1. Previously mentioned: *I saw **a** dog. **The** dog was big.*
2. Unique: *the sun, the moon, the Earth*
3. Superlatives: *the tallest, the best*
4. Certain proper nouns: *the USA, the Mekong River*

### Zero Article
1. Plural/uncountable in general: *Cats are cute. Water is essential.*
2. Names, cities: *Hanoi, Vietnam, John*
3. Meals, sports: *breakfast, football*
4. Languages: *English, Vietnamese*`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền a, an, the hoặc bỏ trống (–)",
            instructionEn: "Fill in a, an, the or leave blank (–)",
            sentences: [
              { text: "I saw ___ elephant at the zoo.", textEn: "I saw ___ elephant at the zoo.", answer: "an", hint: "Elephant bắt đầu bằng nguyên âm" },
              { text: "___ sun rises in the east.", textEn: "___ sun rises in the east.", answer: "The", hint: "Duy nhất" },
              { text: "She plays ___ piano very well.", textEn: "She plays ___ piano very well.", answer: "the", hint: "Nhạc cụ dùng the" },
              { text: "___ water is essential for life.", textEn: "___ water is essential for life.", answer: "–", hint: "Nói chung → zero article" },
            ],
          },
        ],
        quiz: [
          { question: "Chọn đáp án đúng: '___ honest man'", options: ["A honest man", "An honest man", "The honest man", "Honest man"], answer: 1, explanation: "'Honest' có h câm → bắt đầu bằng nguyên âm → an" },
          { question: "Khi nào KHÔNG dùng mạo từ?", options: ["Trước danh từ đã xác định", "Trước so sánh nhất", "Trước tên ngôn ngữ nói chung", "Trước danh từ duy nhất"], answer: 2, explanation: "Ngôn ngữ nói chung: English, not the English" },
          { question: "'I need ___ umbrella.' - Đáp án?", options: ["a", "an", "the", "–"], answer: 1, explanation: "Umbrella bắt đầu bằng nguyên âm /ʌ/ → an" },
        ],
      },
      {
        id: "prepositions-common",
        title: "Giới từ phổ biến",
        titleEn: "Common Prepositions",
        level: 2,
        difficulty: "intermediate",
        theory: `## Giới từ phổ biến

### Giới từ chỉ thời gian
| Giới từ | Dùng với | Ví dụ |
|---------|---------|-------|
| **at** | giờ, thời điểm | at 7 AM, at noon, at night |
| **on** | ngày, thứ | on Monday, on Jan 1st |
| **in** | tháng, năm, mùa, buổi | in May, in 2024, in the morning |

### Giới từ chỉ nơi chốn
| Giới từ | Dùng với | Ví dụ |
|---------|---------|-------|
| **at** | địa điểm cụ thể | at school, at the airport |
| **on** | bề mặt | on the table, on the wall |
| **in** | bên trong | in the room, in Vietnam |

### Các cụm giới từ phổ biến
- **depend on** (phụ thuộc vào)
- **interested in** (quan tâm đến)
- **good at** (giỏi về)
- **afraid of** (sợ)
- **listen to** (nghe)
- **look for** (tìm kiếm)
- **look after** (chăm sóc)`,
        theoryEn: `## Common Prepositions

### Time Prepositions
| Preposition | Used with | Example |
|------------|-----------|---------|
| **at** | time, moments | at 7 AM, at noon, at night |
| **on** | days, dates | on Monday, on Jan 1st |
| **in** | months, years, seasons, parts of day | in May, in 2024, in the morning |

### Place Prepositions
| Preposition | Used with | Example |
|------------|-----------|---------|
| **at** | specific points | at school, at the airport |
| **on** | surfaces | on the table, on the wall |
| **in** | enclosed spaces | in the room, in Vietnam |

### Common Prepositional Phrases
- **depend on** - **interested in** - **good at**
- **afraid of** - **listen to** - **look for** - **look after**`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền giới từ đúng",
            instructionEn: "Fill in the correct preposition",
            sentences: [
              { text: "I wake up ___ 6 AM every day.", textEn: "I wake up ___ 6 AM every day.", answer: "at", hint: "Giờ → at" },
              { text: "She was born ___ March.", textEn: "She was born ___ March.", answer: "in", hint: "Tháng → in" },
              { text: "The keys are ___ the table.", textEn: "The keys are ___ the table.", answer: "on", hint: "Bề mặt → on" },
              { text: "He is very good ___ math.", textEn: "He is very good ___ math.", answer: "at", hint: "good at = giỏi về" },
            ],
          },
        ],
        quiz: [
          { question: "'I arrived ___ Monday morning.' - Chọn đúng:", options: ["in", "at", "on", "by"], answer: 2, explanation: "Ngày/thứ → on (on Monday)" },
          { question: "'She is interested ___ science.'", options: ["on", "at", "in", "of"], answer: 2, explanation: "interested IN = quan tâm đến" },
          { question: "'at night' nhưng 'in the morning' - tại sao?", options: ["Không có lý do, phải học thuộc", "Night là thời điểm cụ thể, morning là khoảng thời gian", "At dùng cho tối, in dùng cho sáng", "Cả hai đều đúng nếu đổi chỗ"], answer: 1, explanation: "'Night' được coi là thời điểm, còn 'morning/afternoon/evening' là khoảng thời gian → in" },
        ],
      },
    ],
  },
];
