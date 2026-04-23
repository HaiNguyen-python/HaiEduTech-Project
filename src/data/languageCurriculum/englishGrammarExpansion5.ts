import type { LanguageModule } from "./types";

export const grammarExpansionModules5: LanguageModule[] = [
  {
    id: "grammar-prepositions-patterns",
    title: "Giới từ & cụm đi kèm",
    titleEn: "Prepositions & Fixed Patterns",
    icon: "🧭",
    color: "from-cyan-500 to-blue-600",
    description: "Nắm chắc giới từ chỉ thời gian, nơi chốn và các cụm đi kèm phổ biến.",
    descriptionEn: "Master time/place prepositions and high-frequency dependent patterns.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "prepositions-time-place",
        title: "Giới từ thời gian & nơi chốn",
        titleEn: "Prepositions of Time & Place",
        level: 2,
        difficulty: "beginner",
        theory: `## Giới từ thời gian & nơi chốn

### 1. Giới từ thời gian
- **at**: giờ cụ thể, thời điểm chính xác → *at 7 o'clock, at noon*
- **on**: ngày, ngày trong tuần, ngày cụ thể → *on Monday, on 12 May*
- **in**: tháng, năm, mùa, khoảng thời gian dài → *in July, in 2026, in winter*

### 2. Giới từ nơi chốn
- **at**: điểm cụ thể → *at the bus stop, at school*
- **on**: trên bề mặt → *on the table, on the wall*
- **in**: bên trong không gian khép kín → *in the room, in Hanoi*

### 3. Quy tắc nhanh
- Nơi càng **cụ thể** → càng dễ dùng **at**
- Có cảm giác **bề mặt / tiếp xúc** → thường là **on**
- Có cảm giác **bao quanh / ở trong** → thường là **in**

### Lỗi thường gặp
- ❌ *in Monday* → ✅ *on Monday*
- ❌ *at the morning* → ✅ *in the morning*
- ❌ *in the bus stop* → ✅ *at the bus stop*`,
        theoryEn: `## Prepositions of Time & Place

### 1. Time prepositions
- **at**: exact times and specific moments → *at 7 o'clock, at noon*
- **on**: days and specific dates → *on Monday, on 12 May*
- **in**: months, years, seasons, and longer periods → *in July, in 2026, in winter*

### 2. Place prepositions
- **at**: a specific point → *at the bus stop, at school*
- **on**: a surface → *on the table, on the wall*
- **in**: inside an enclosed space or area → *in the room, in Hanoi*

### 3. Quick decision rule
- The more **point-like** the location is, the more likely **at** is correct.
- If the idea is **surface contact**, use **on**.
- If the idea is **inside / surrounded by**, use **in**.

### Common errors
- ❌ *in Monday* → ✅ *on Monday*
- ❌ *at the morning* → ✅ *in the morning*
- ❌ *in the bus stop* → ✅ *at the bus stop*`,
        proTips: [
          "Use at for exact clock time, on for calendar days, and in for longer periods.",
          "Ask: Is it a point, a surface, or an enclosed area?",
          "Do not translate Vietnamese word by word; choose the preposition from the English image."
        ],
        proTipsEn: [
          "Use at for exact clock time, on for calendar days, and in for longer periods.",
          "Ask: Is it a point, a surface, or an enclosed area?",
          "Do not translate from Vietnamese word by word; choose from the English meaning."
        ],
        vocabulary: [
          { word: "surface", meaning: "bề mặt", example: "The keys are on the surface of the desk.", partOfSpeech: "noun" },
          { word: "enclosed", meaning: "khép kín", example: "The children are in an enclosed garden.", partOfSpeech: "adjective" },
          { word: "specific", meaning: "cụ thể", example: "Please give me a specific time.", partOfSpeech: "adjective" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền giới từ đúng",
            instructionEn: "Fill in the correct preposition",
            sentences: [
              { text: "The class starts ___ 8:30.", textEn: "The class starts ___ 8:30.", answer: "at", hint: "Exact time" },
              { text: "We met ___ Friday evening.", textEn: "We met ___ Friday evening.", answer: "on", hint: "Day" },
              { text: "She was born ___ 2012.", textEn: "She was born ___ 2012.", answer: "in", hint: "Year" },
              { text: "Your bag is ___ the chair.", textEn: "Your bag is ___ the chair.", answer: "on", hint: "Surface" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu đúng",
            instructionEn: "Reorder the sentence correctly",
            items: [
              { scrambled: ["The", "students", "are", "in", "the", "library"], correct: "The students are in the library.", correctEn: "The students are in the library." },
              { scrambled: ["We", "have", "a", "meeting", "at", "9", "tomorrow"], correct: "We have a meeting at 9 tomorrow.", correctEn: "We have a meeting at 9 tomorrow." }
            ]
          }
        ],
        quiz: [
          { question: "Which sentence is correct?", options: ["I was born on 2008.", "I was born in 2008.", "I was born at 2008.", "I was born by 2008."], answer: 1, explanation: "Use in with years." },
          { question: "Choose the correct phrase:", options: ["at Monday", "on Monday", "in Monday", "by Monday"], answer: 1, explanation: "Use on with days." },
          { question: "Where are the glasses? They are ___ the table.", options: ["in", "at", "on", "to"], answer: 2, explanation: "A table is treated as a surface, so use on." }
        ]
      },
      {
        id: "dependent-prepositions",
        title: "Cụm tính từ/động từ đi với giới từ",
        titleEn: "Dependent Prepositions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Cụm đi với giới từ cố định

### 1. Ý chính
Nhiều động từ, tính từ và danh từ trong tiếng Anh đi với một giới từ **cố định**. Không thể chọn giới từ theo cảm giác đơn thuần.

### 2. Cụm động từ phổ biến
- **depend on**
- **belong to**
- **listen to**
- **apologise for**
- **suffer from**
- **focus on**

### 3. Cụm tính từ phổ biến
- **afraid of**
- **interested in**
- **good at**
- **responsible for**
- **similar to**
- **famous for**

### 4. Chiến lược học
- Học theo **cụm hoàn chỉnh**, không học từng từ rời
- Tạo ví dụ cá nhân cho mỗi cụm
- Ghi chú các cặp dễ nhầm như **good at / good for**, **angry with / angry about**

### Cặp dễ nhầm
- **good at** + skill → *good at maths*
- **good for** + benefit → *good for your health*`,
        theoryEn: `## Dependent Prepositions

### 1. Core idea
Many English verbs, adjectives, and nouns are followed by a **fixed preposition**. You usually cannot choose the preposition freely.

### 2. Common verb + preposition patterns
- **depend on**
- **belong to**
- **listen to**
- **apologise for**
- **suffer from**
- **focus on**

### 3. Common adjective + preposition patterns
- **afraid of**
- **interested in**
- **good at**
- **responsible for**
- **similar to**
- **famous for**

### 4. Study strategy
- Learn the **full chunk**, not just the main word.
- Build one personal example for each pattern.
- Watch confusing pairs such as **good at / good for** and **angry with / angry about**.

### Confusing pairs
- **good at** + skill → *good at maths*
- **good for** + benefit → *good for your health*`,
        proTips: [
          "Memorize a pattern as one unit: interested in, not interested + ???.",
          "If you keep making the same error, build one personal sentence and review it daily.",
          "Use quiz explanations to notice meaning differences between similar patterns."
        ],
        proTipsEn: [
          "Memorize a pattern as one chunk: interested in, not interested + ???.",
          "If you repeat the same error, build one personal sentence and review it daily.",
          "Use meaning to choose the preposition, not translation alone."
        ],
        vocabulary: [
          { word: "depend on", meaning: "phụ thuộc vào", example: "Success depends on daily effort.", partOfSpeech: "verb phrase" },
          { word: "responsible for", meaning: "chịu trách nhiệm về", example: "She is responsible for the final report.", partOfSpeech: "adjective phrase" },
          { word: "similar to", meaning: "tương tự như", example: "This design is similar to the old one.", partOfSpeech: "adjective phrase" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành cụm giới từ đúng",
            instructionEn: "Complete the correct prepositional pattern",
            sentences: [
              { text: "I am interested ___ linguistics.", textEn: "I am interested ___ linguistics.", answer: "in", hint: "interested in" },
              { text: "The result depends ___ your preparation.", textEn: "The result depends ___ your preparation.", answer: "on", hint: "depend on" },
              { text: "He apologised ___ being late.", textEn: "He apologised ___ being late.", answer: "for", hint: "apologise for" },
              { text: "She is very good ___ explaining grammar.", textEn: "She is very good ___ explaining grammar.", answer: "at", hint: "good at + skill" }
            ]
          }
        ],
        quiz: [
          { question: "Choose the correct phrase:", options: ["interested on music", "interested in music", "interested at music", "interested for music"], answer: 1, explanation: "The correct fixed pattern is interested in." },
          { question: "Which sentence is correct?", options: ["This medicine is good at your health.", "This medicine is good for your health.", "This medicine is good on your health.", "This medicine is good to your health."], answer: 1, explanation: "good for expresses benefit." },
          { question: "They are responsible ___ customer support.", options: ["in", "at", "for", "with"], answer: 2, explanation: "The fixed pattern is responsible for." }
        ]
      }
    ]
  },
  {
    id: "grammar-sentence-patterns",
    title: "Mẫu câu & song song cấu trúc",
    titleEn: "Sentence Patterns & Parallel Structure",
    icon: "🧱",
    color: "from-emerald-500 to-teal-600",
    description: "Xây câu rõ ràng hơn với mẫu câu cơ bản và cấu trúc song song chính xác.",
    descriptionEn: "Build clearer sentences with core sentence patterns and accurate parallel structure.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "sentence-patterns-core",
        title: "Mẫu câu nền tảng",
        titleEn: "Core Sentence Patterns",
        level: 2,
        difficulty: "beginner",
        theory: `## Mẫu câu nền tảng

### 1. Vì sao cần học mẫu câu?
Một câu đúng ngữ pháp không chỉ cần đúng từ loại mà còn cần **đúng khung câu**. Khi biết khung câu, bạn viết nhanh hơn và ít lỗi hơn.

### 2. Các mẫu câu thường gặp
- **SV**: *Birds fly.*
- **SVC**: *She is happy.*
- **SVO**: *They study English.*
- **SVOO**: *He gave me a book.*
- **SVOC**: *We found the lesson useful.*

### 3. Cách nhận diện nhanh
- Nếu động từ **không cần tân ngữ** → SV
- Nếu động từ nối như **be, seem, become** → thường là SVC
- Nếu có **hai đối tượng** → thường là SVOO
- Nếu có tân ngữ + thông tin mô tả tân ngữ → SVOC

### 4. Lỗi phổ biến
- ❌ *She explained me the rule.*
- ✅ *She explained the rule to me.*

- ❌ *They made him to stay.*
- ✅ *They made him stay.*`,
        theoryEn: `## Core Sentence Patterns

### 1. Why sentence patterns matter
A correct sentence needs more than the right words. It also needs the **right sentence frame**. When you know the frame, writing becomes faster and more accurate.

### 2. High-frequency patterns
- **SV**: *Birds fly.*
- **SVC**: *She is happy.*
- **SVO**: *They study English.*
- **SVOO**: *He gave me a book.*
- **SVOC**: *We found the lesson useful.*

### 3. Fast recognition guide
- If the verb does **not** need an object, the pattern is often SV.
- Linking verbs such as **be, seem, become** usually create SVC.
- Two objects usually signal SVOO.
- An object plus extra information describing that object often creates SVOC.

### 4. Common errors
- ❌ *She explained me the rule.*
- ✅ *She explained the rule to me.*

- ❌ *They made him to stay.*
- ✅ *They made him stay.*`,
        proTips: [
          "Ask what each verb needs: no object, one object, two objects, or a complement.",
          "Memorize difficult verbs with their full pattern, e.g. explain something to someone.",
          "When editing your writing, underline the verb first and test its sentence frame."
        ],
        proTipsEn: [
          "Ask what each verb needs: no object, one object, two objects, or a complement.",
          "Memorize difficult verbs with their full pattern, such as explain something to someone.",
          "When editing, underline the main verb first and test its frame."
        ],
        vocabulary: [
          { word: "linking verb", meaning: "động từ nối", example: "A linking verb connects the subject to extra information.", partOfSpeech: "noun" },
          { word: "complement", meaning: "bổ ngữ", example: "The adjective happy is a complement in 'She is happy.'", partOfSpeech: "noun" },
          { word: "object", meaning: "tân ngữ", example: "English is the object in 'They study English.'", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền cấu trúc đúng",
            instructionEn: "Complete the correct pattern",
            sentences: [
              { text: "The teacher explained the rule ___ us.", textEn: "The teacher explained the rule ___ us.", answer: "to", hint: "explain something to someone" },
              { text: "They made him ___ after class.", textEn: "They made him ___ after class.", answer: "stay", hint: "make + object + bare infinitive" },
              { text: "She seems ___ today.", textEn: "She seems ___ today.", answer: "tired", hint: "linking verb + complement" }
            ]
          }
        ],
        quiz: [
          { question: "Which sentence follows the correct pattern?", options: ["She explained me the answer.", "She explained the answer to me.", "She explained to me the answerly.", "She explained me to answer."], answer: 1, explanation: "Explain takes the pattern explain something to someone." },
          { question: "Which pattern is used in 'He gave me a book'?", options: ["SV", "SVC", "SVO", "SVOO"], answer: 3, explanation: "There are two objects: me and a book." },
          { question: "Choose the correct sentence:", options: ["They made her to wait.", "They made her wait.", "They made her waiting.", "They made to her wait."], answer: 1, explanation: "make + object + bare infinitive." }
        ]
      },
      {
        id: "parallel-structure",
        title: "Cấu trúc song song",
        titleEn: "Parallel Structure",
        level: 3,
        difficulty: "intermediate",
        theory: `## Cấu trúc song song

### 1. Khái niệm
Khi liệt kê, so sánh hoặc nối các ý ngang hàng, các phần đó phải có **cùng dạng ngữ pháp**.

### 2. Ví dụ đúng
- *She likes **reading, writing, and speaking**.*
- *The course is **useful, practical, and inspiring**.*
- *He wants **to study abroad, to improve his English, and to build confidence**.*

### 3. Ví dụ sai
- ❌ *She likes **reading, to write, and speaking**.*
- ❌ *The plan is **clear, practicality, and inspiring**.*

### 4. Khi nào cần chú ý nhất?
- Danh sách có từ **and / or**
- Cấu trúc so sánh
- Tiêu đề, bullet points, essay thesis statements

### 5. Mẹo kiểm tra
Che từng phần trong danh sách và tự hỏi: chúng có cùng loại từ, cùng dạng verb, cùng nhịp câu không?`,
        theoryEn: `## Parallel Structure

### 1. Core idea
When you list, compare, or connect ideas of equal importance, those parts should use the **same grammatical form**.

### 2. Correct models
- *She likes **reading, writing, and speaking**.*
- *The course is **useful, practical, and inspiring**.*
- *He wants **to study abroad, to improve his English, and to build confidence**.*

### 3. Incorrect models
- ❌ *She likes **reading, to write, and speaking**.*
- ❌ *The plan is **clear, practicality, and inspiring**.*

### 4. Where learners often miss it
- Lists with **and / or**
- Comparisons
- Headings, bullet points, and thesis statements

### 5. Editing tip
Hide each item in the list and ask: do they share the same word class, verb form, and rhythm?`,
        proTips: [
          "If the first item starts with -ing, the others usually should too.",
          "Parallel structure improves clarity and also makes writing sound more professional.",
          "In IELTS essays, parallel thesis points are easier for the examiner to follow."
        ],
        proTipsEn: [
          "If the first item uses an -ing form, the others usually should as well.",
          "Parallel structure improves clarity and makes writing sound more professional.",
          "In essays, parallel main points are easier for the reader to follow."
        ],
        vocabulary: [
          { word: "parallel", meaning: "song song", example: "The sentence needs a parallel structure.", partOfSpeech: "adjective" },
          { word: "list", meaning: "danh sách", example: "Check each item in the list carefully.", partOfSpeech: "noun" },
          { word: "rhythm", meaning: "nhịp câu", example: "Parallel forms create a smoother rhythm.", partOfSpeech: "noun" }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành để câu song song",
            instructionEn: "Complete the sentence so it is parallel",
            sentences: [
              { text: "She enjoys reading, swimming, and ___ (dance).", textEn: "She enjoys reading, swimming, and ___ (dance).", answer: "dancing", hint: "Keep the -ing pattern" },
              { text: "The app is simple, useful, and ___.", textEn: "The app is simple, useful, and ___.", answer: "reliable", hint: "Use an adjective" },
              { text: "He wants to travel, to work, and to ___.", textEn: "He wants to travel, to work, and to ___.", answer: "learn", hint: "Keep the infinitive pattern" }
            ]
          }
        ],
        quiz: [
          { question: "Which sentence is parallel?", options: ["She likes reading, to write, and speaking.", "She likes reading, writing, and speaking.", "She likes read, writing, and speaks.", "She likes to reading, writing, and speaking."], answer: 1, explanation: "All three items use the same -ing form." },
          { question: "Choose the best completion: 'The training was clear, practical, and ___." , options: ["inspiration", "inspiring", "inspire", "inspiredly"], answer: 1, explanation: "The sentence needs another adjective." },
          { question: "Why is parallel structure important?", options: ["It makes sentences longer.", "It helps grammar match across equal ideas.", "It removes every preposition.", "It changes all verbs to past tense."], answer: 1, explanation: "Parallel structure keeps equal ideas in matching grammar forms." }
        ]
      }
    ]
  }
];