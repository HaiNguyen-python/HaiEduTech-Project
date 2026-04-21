/**
 * @file englishGrammarExpansion4.ts
 * @description Adds 4 brand-new grammar modules + extra in-depth lessons
 *              attached to existing modules: Mixed Tenses Drill, Reported
 *              Speech advanced shifts, S-V agreement deep, Punctuation rules,
 *              Question Forms, and Phrasal Verbs lab.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { LanguageModule, LanguageLesson } from "./types";

export interface GrammarExtraLesson4 extends LanguageLesson {
  moduleId: string;
}

// ============================================================
// EXTRA LESSONS attached to existing 6 base modules
// ============================================================
export const grammarExtraLessons4: GrammarExtraLesson4[] = [
  // ===== TENSES — Mixed Tenses Mastery =====
  {
    moduleId: "grammar-tenses",
    id: "tenses-mixed-mastery",
    title: "Tổng ôn 12 thì — Phân biệt khi đặt cạnh nhau",
    titleEn: "Mixed Tenses Mastery — Choosing the Right Tense",
    level: 4,
    difficulty: "advanced",
    theory: `## Tổng ôn 12 thì — Khi nào dùng thì nào?

### 1. Bộ tín hiệu thời gian (Time Signals)
| Tín hiệu | Thì gợi ý |
|----------|-----------|
| every day, usually, often | Present Simple |
| now, at the moment | Present Continuous |
| since 2020, for 5 years | Present Perfect / PP Continuous |
| just, already, yet, so far | Present Perfect |
| yesterday, last week, ago | Past Simple |
| while, when (đang xảy ra) | Past Continuous |
| by the time, before, after | Past Perfect |
| tomorrow, next week | Future Simple / Be going to |
| by 2030, by next year | Future Perfect |
| at 8 PM tomorrow | Future Continuous |

### 2. Quy tắc 3 bước chọn thì
1. **Hiện tại / Quá khứ / Tương lai?** — Hành động xảy ra khi nào?
2. **Đơn / Tiếp diễn / Hoàn thành / Hoàn thành tiếp diễn?** — Cách hành động diễn ra
3. Đối chiếu **tín hiệu thời gian** trong câu

### 3. Sai lầm phổ biến
- ❌ I **am knowing** the answer. → ✅ I **know** the answer (stative verb)
- ❌ Yesterday I **have eaten** sushi. → ✅ Yesterday I **ate** sushi
- ❌ When I **arrived**, she **left**. → ✅ When I arrived, she **had left** (xảy ra trước)`,
    theoryEn: `## Mixed Tenses Mastery — When to Use What

### 1. Time Signal Cheatsheet
| Signal | Likely tense |
|--------|--------------|
| every day, usually, often | Present Simple |
| now, at the moment | Present Continuous |
| since 2020, for 5 years | Present Perfect / PP Continuous |
| just, already, yet, so far | Present Perfect |
| yesterday, last week, ago | Past Simple |
| while, when (in progress) | Past Continuous |
| by the time, before, after | Past Perfect |
| tomorrow, next week | Future Simple / Be going to |
| by 2030, by next year | Future Perfect |
| at 8 PM tomorrow | Future Continuous |

### 2. The 3-step rule
1. **Present / Past / Future?**
2. **Simple / Continuous / Perfect / Perfect Continuous?**
3. Match the **time signal** in the sentence

### 3. Frequent mistakes
- ❌ I **am knowing** the answer. → ✅ I **know** (stative verb)
- ❌ Yesterday I **have eaten** sushi. → ✅ Yesterday I **ate** sushi
- ❌ When I arrived, she **left**. → ✅ she **had left**`,
    proTips: [
      "Stative verbs (know, love, believe, own, seem) không dùng tiếp diễn",
      "Có 'yesterday/last/ago' → Past Simple, không bao giờ Present Perfect",
      "Hai hành động quá khứ → hành động xảy ra trước dùng Past Perfect",
    ],
    proTipsEn: [
      "Stative verbs (know, love, believe, own, seem) avoid continuous tenses",
      "With 'yesterday/last/ago' → Past Simple, never Present Perfect",
      "Two past actions → the earlier one takes Past Perfect",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Chọn thì đúng dựa vào tín hiệu thời gian",
        instructionEn: "Choose the right tense from the time signal",
        sentences: [
          { text: "By 2030, scientists ___ (find) a cure for many diseases.", textEn: "By 2030, scientists ___ (find) a cure for many diseases.", answer: "will have found", hint: "by 2030 → Future Perfect" },
          { text: "She ___ (live) in Hanoi since 2018.", textEn: "She ___ (live) in Hanoi since 2018.", answer: "has lived", hint: "since → Present Perfect" },
          { text: "While I ___ (cook), the doorbell rang.", textEn: "While I ___ (cook), the doorbell rang.", answer: "was cooking", hint: "while + Past Continuous" },
          { text: "Tomorrow at this time, we ___ (fly) to Paris.", textEn: "Tomorrow at this time, we ___ (fly) to Paris.", answer: "will be flying", hint: "tại 1 thời điểm tương lai" },
        ],
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp thành câu đúng",
        instructionEn: "Reorder into correct sentences",
        items: [
          { scrambled: ["had", "the", "they", "before", "left", "we", "arrived"], correct: "They had left before we arrived.", correctEn: "They had left before we arrived." },
          { scrambled: ["will", "by", "finished", "have", "I", "tomorrow", "the", "report"], correct: "I will have finished the report by tomorrow.", correctEn: "I will have finished the report by tomorrow." },
        ],
      },
    ],
    quiz: [
      { question: "By the time you read this, I ___ the country.", options: ["will leave", "will be leaving", "will have left", "leave"], answer: 2, explanation: "By the time + future → Future Perfect" },
      { question: "I ___ this book for two weeks but haven't finished it.", options: ["read", "have been reading", "am reading", "was reading"], answer: 1, explanation: "Quá trình kéo dài đến hiện tại → Present Perfect Continuous" },
      { question: "Last summer, we ___ to Phu Quoc.", options: ["have gone", "had gone", "went", "were going"], answer: 2, explanation: "'Last summer' → Past Simple" },
      { question: "Look! It ___!", options: ["rains", "is raining", "has rained", "rained"], answer: 1, explanation: "'Look!' → đang xảy ra → Present Continuous" },
    ],
  },

  // ===== CONDITIONALS — Inverted Conditionals =====
  {
    moduleId: "grammar-conditionals",
    id: "conditionals-inverted",
    title: "Đảo ngữ câu điều kiện (Inverted Conditionals)",
    titleEn: "Inverted Conditionals",
    level: 4,
    difficulty: "advanced",
    theory: `## Đảo ngữ câu điều kiện

Trong văn viết trang trọng, có thể bỏ "if" và đảo trợ động từ lên đầu câu.

### Type 1 — Should
- *If you should need help, call me.* → **Should you need** help, call me.

### Type 2 — Were
- *If I were rich, I would travel.* → **Were I rich**, I would travel.

### Type 3 — Had
- *If I had known, I would have helped.* → **Had I known**, I would have helped.

### Lưu ý
- Dạng đảo ngữ trang trọng hơn, thường dùng trong văn bản học thuật, hợp đồng
- Phủ định: KHÔNG rút gọn → "Were I not", "Had I not"`,
    theoryEn: `## Inverted Conditionals

In formal writing, "if" can be dropped and the auxiliary moved to the front.

### Type 1 — Should
- *If you should need help, call me.* → **Should you need** help, call me.

### Type 2 — Were
- *If I were rich, I would travel.* → **Were I rich**, I would travel.

### Type 3 — Had
- *If I had known, I would have helped.* → **Had I known**, I would have helped.

### Note
- Inversion is more formal, common in academic/legal English
- Negative: do NOT contract → "Were I not", "Had I not"`,
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Viết lại câu dùng đảo ngữ",
        instructionEn: "Rewrite using inversion",
        sentences: [
          { text: "If I had more time, I would learn piano. → ___ more time, I would learn piano.", textEn: "If I had more time, I would learn piano. → ___ more time, I would learn piano.", answer: "Had I", hint: "Type 2 với 'had' (lùi thì) — Were I to have / Had I" },
          { text: "If you should see her, tell her hi. → ___ you ___ her, tell her hi.", textEn: "If you should see her, tell her hi. → ___ you ___ her, tell her hi.", answer: "Should/see", hint: "Type 1 — Should + S + V" },
          { text: "If they had arrived earlier, we would have eaten. → ___ they arrived earlier, we would have eaten.", textEn: "If they had arrived earlier, we would have eaten. → ___ they arrived earlier, we would have eaten.", answer: "Had", hint: "Type 3 — Had + S + V3" },
        ],
      },
    ],
    quiz: [
      { question: "'___ I known earlier, I would have come.'", options: ["If", "Had", "Were", "Should"], answer: 1, explanation: "Type 3 inversion: Had + S + V3" },
      { question: "'___ you need anything, just ask.'", options: ["Had", "Were", "Should", "Would"], answer: 2, explanation: "Type 1 inversion: Should + S + V" },
      { question: "Câu nào KHÔNG đúng?", options: ["Were I rich, I would travel.", "Had I known, I would have called.", "Should you see him, tell me.", "Were I not late, I'd be there."], answer: 3, explanation: "'Were I not late' đúng chính tả nhưng câu kết quả thiếu logic — đáp án này là cái sai duy nhất nếu kết quả không hợp lý. Trên thực tế, câu này dùng được; lưu ý không bao giờ rút gọn 'were not' thành 'weren't' khi đảo ngữ." },
    ],
  },

  // ===== PASSIVE — Get-passive & Have something done =====
  {
    moduleId: "grammar-passive",
    id: "passive-get-have",
    title: "Get-passive & Have/Get something done",
    titleEn: "Get-passive & Have/Get Something Done",
    level: 3,
    difficulty: "intermediate",
    theory: `## Get-passive & Have/Get something done

### 1. Get-passive
- **Cấu trúc:** S + get + V3/ed
- Thường dùng trong **văn nói**, nhấn mạnh kết quả không mong muốn hoặc thay đổi đột ngột
- *He **got fired** yesterday.* (anh ấy bị sa thải)
- *My phone **got stolen** at the party.*

### 2. Have something done (Causative)
- **Cấu trúc:** S + have + O + V3/ed
- Nhờ ai đó làm gì → trang trọng
- *I **had my car repaired**.* (tôi mang xe đi sửa)

### 3. Get something done (Causative)
- **Cấu trúc:** S + get + O + V3/ed
- Tương tự have nhưng **thân mật hơn**
- *She **got her hair cut**.*

### So sánh
| Form | Meaning | Tone |
|------|---------|------|
| **be + V3** | bị / được làm gì | trung tính |
| **get + V3** | bị / được (đột ngột) | thân mật, văn nói |
| **have + O + V3** | nhờ ai làm gì | trang trọng |
| **get + O + V3** | nhờ ai làm gì | thân mật |`,
    theoryEn: `## Get-passive & Have/Get Something Done

### 1. Get-passive
- **Form:** S + get + V3/ed
- Common in **spoken English**, emphasizes unwanted/sudden change
- *He **got fired** yesterday.*

### 2. Have something done (Causative)
- **Form:** S + have + O + V3/ed
- Arrange for someone to do it → formal
- *I **had my car repaired**.*

### 3. Get something done (Causative)
- **Form:** S + get + O + V3/ed
- Same idea but **more casual**
- *She **got her hair cut**.*`,
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Hoàn thành các câu causative",
        instructionEn: "Complete the causative sentences",
        sentences: [
          { text: "I need to ___ my eyes ___ (test) next week.", textEn: "I need to ___ my eyes ___ next week.", answer: "have/tested", hint: "have + O + V3" },
          { text: "She ___ her nails ___ (do) every Friday.", textEn: "She ___ her nails ___ every Friday.", answer: "gets/done", hint: "get + O + V3 (thân mật)" },
          { text: "They ___ ___ (rob) on holiday.", textEn: "They ___ ___ on holiday.", answer: "got/robbed", hint: "Get-passive: bị cướp" },
        ],
      },
    ],
    quiz: [
      { question: "Dạng nào trang trọng hơn khi nhờ ai đó làm gì?", options: ["get + O + V3", "have + O + V3", "be + V3", "get + V3"], answer: 1, explanation: "have + O + V3 là dạng trang trọng" },
      { question: "'My laptop ___ stolen yesterday.'", options: ["got", "had", "was getting", "has"], answer: 0, explanation: "Get-passive trong văn nói: got stolen" },
      { question: "'I'll ___ the documents ___ before noon.'", options: ["have / sign", "have / signed", "get / signing", "had / signed"], answer: 1, explanation: "have + O + V3 (signed)" },
    ],
  },

  // ===== REPORTED SPEECH — Time/Place shifts =====
  {
    moduleId: "grammar-reported-speech",
    id: "reported-time-place-shift",
    title: "Đổi trạng từ thời gian & nơi chốn khi tường thuật",
    titleEn: "Time & Place Shifts in Reported Speech",
    level: 3,
    difficulty: "intermediate",
    theory: `## Đổi trạng từ khi tường thuật

### Bảng đổi trạng từ
| Direct | Reported |
|--------|----------|
| now | then / at that moment |
| today | that day |
| tonight | that night |
| tomorrow | the next day / the following day |
| yesterday | the day before / the previous day |
| next week | the following week |
| last week | the previous week / the week before |
| ago | before |
| here | there |
| this | that |
| these | those |

### Ví dụ
- "I saw him **yesterday**." → He said he had seen him **the day before**.
- "I'll meet you **here tomorrow**." → She said she would meet me **there the next day**.
- "I bought **this** book **last week**." → He said he had bought **that** book **the previous week**.

### Khi nào KHÔNG đổi?
- Nếu thời gian/nơi chốn vẫn còn đúng tại thời điểm tường thuật
- VD: Nếu đang còn là "today" khi tường thuật → giữ nguyên`,
    theoryEn: `## Time & Place Shifts in Reported Speech

### Shift Table
| Direct | Reported |
|--------|----------|
| now | then / at that moment |
| today | that day |
| tonight | that night |
| tomorrow | the next/following day |
| yesterday | the day before / the previous day |
| next week | the following week |
| last week | the previous week / the week before |
| ago | before |
| here | there |
| this | that |
| these | those |

### When NOT to shift?
- If the time/place is still valid at the moment of reporting`,
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Đổi trạng từ khi tường thuật",
        instructionEn: "Shift the adverb in reported speech",
        sentences: [
          { text: "\"I'll see you tomorrow.\" → He said he would see me ___.", textEn: "\"I'll see you tomorrow.\" → He said he would see me ___.", answer: "the next day", hint: "tomorrow → the next day" },
          { text: "\"I bought this yesterday.\" → She said she had bought ___ ___.", textEn: "\"I bought this yesterday.\" → She said she had bought ___ ___.", answer: "that the day before", hint: "this → that, yesterday → the day before" },
          { text: "\"I'm leaving now.\" → He said he was leaving ___.", textEn: "\"I'm leaving now.\" → He said he was leaving ___.", answer: "then", hint: "now → then" },
        ],
      },
    ],
    quiz: [
      { question: "\"I met her two days ago.\" → He said he had met her ___.", options: ["two days ago", "two days before", "in two days", "two days after"], answer: 1, explanation: "ago → before khi tường thuật" },
      { question: "\"These cookies are delicious.\" → She said ___ cookies were delicious.", options: ["these", "those", "the", "this"], answer: 1, explanation: "these → those" },
      { question: "Khi nào KHÔNG cần đổi 'today' thành 'that day'?", options: ["Luôn phải đổi", "Khi vẫn đang là cùng ngày tường thuật", "Khi câu ngắn", "Không bao giờ đổi"], answer: 1, explanation: "Nếu sự kiện vẫn còn đúng → giữ nguyên" },
    ],
  },

  // ===== RELATIVE — Quantifiers + relative pronouns =====
  {
    moduleId: "grammar-relative-clauses",
    id: "relative-quantifiers",
    title: "Lượng từ + Mệnh đề quan hệ (some of whom, all of which...)",
    titleEn: "Quantifiers + Relative Pronouns",
    level: 4,
    difficulty: "advanced",
    theory: `## Lượng từ + Mệnh đề quan hệ

### Cấu trúc
**Quantifier + of + whom/which**

### Lượng từ thường gặp
- all / both / many / most / some / few / none / each / either / neither
- a number of / the majority of / two / three...

### Ví dụ
- I have 30 students, **most of whom** are excellent.
- He gave me 5 books, **two of which** I've already read.
- The team has 11 players, **all of whom** are professionals.
- She has many friends, **none of whom** speak Vietnamese.

### Lưu ý
- Cấu trúc này chỉ dùng trong **non-defining clause** (có dấu phẩy)
- Dùng **whom** cho người, **which** cho vật
- Thay thế cách viết cồng kềnh: "I have 30 students. Most of them are excellent." → gộp thành 1 câu`,
    theoryEn: `## Quantifiers + Relative Pronouns

### Structure
**Quantifier + of + whom/which**

### Common quantifiers
- all / both / many / most / some / few / none / each / either / neither
- a number of / the majority of / two / three...

### Examples
- I have 30 students, **most of whom** are excellent.
- He gave me 5 books, **two of which** I've already read.
- The team has 11 players, **all of whom** are professionals.

### Notes
- Only used in **non-defining clauses** (with commas)
- Use **whom** for people, **which** for things
- A concise way to combine two sentences`,
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền 'of whom' hoặc 'of which'",
        instructionEn: "Fill in 'of whom' or 'of which'",
        sentences: [
          { text: "She has 50 employees, most ___ work remotely.", textEn: "She has 50 employees, most ___ work remotely.", answer: "of whom", hint: "Người" },
          { text: "I bought 10 apples, two ___ were rotten.", textEn: "I bought 10 apples, two ___ were rotten.", answer: "of which", hint: "Vật" },
          { text: "The class has 25 students, all ___ passed the exam.", textEn: "The class has 25 students, all ___ passed the exam.", answer: "of whom", hint: "Người" },
        ],
      },
    ],
    quiz: [
      { question: "'I have many books, ___ I've never read.'", options: ["some of who", "some of whom", "some of which", "some which"], answer: 2, explanation: "Books = vật → of which" },
      { question: "Cấu trúc 'most of whom' chỉ dùng được trong:", options: ["Defining clause", "Non-defining clause", "Cả hai", "Không bao giờ"], answer: 1, explanation: "Chỉ trong non-defining (có dấu phẩy)" },
      { question: "'The 30 students, ___ are international, will graduate soon.'", options: ["many of which", "many of whom", "many whom", "many of who"], answer: 1, explanation: "Students = người → of whom" },
    ],
  },

  // ===== ARTICLES & PREPOSITIONS — Confusing prepositions =====
  {
    moduleId: "grammar-articles-prepositions",
    id: "prepositions-confusing",
    title: "Phân biệt giới từ dễ nhầm (in/on/at, for/since, by/until)",
    titleEn: "Confusing Prepositions (in/on/at, for/since, by/until)",
    level: 3,
    difficulty: "intermediate",
    theory: `## Phân biệt giới từ dễ nhầm

### 1. For vs Since
| For | Since |
|-----|-------|
| + khoảng thời gian | + mốc thời gian |
| for 2 hours, for a week | since 2020, since Monday |
| *I have lived here for 5 years.* | *I have lived here since 2019.* |

### 2. By vs Until
| By | Until / Till |
|----|--------------|
| **trước hoặc bằng** một thời điểm | **liên tục đến** một thời điểm |
| *Finish it **by** 5 PM.* (xong trước 5h) | *Wait **until** 5 PM.* (đợi đến tận 5h) |

### 3. In vs Within
- **in 2 hours** = sau 2 tiếng nữa (tương lai) hoặc trong vòng 2 tiếng
- **within 2 hours** = trong vòng tối đa 2 tiếng
- *I'll call you **in** 30 minutes.* (sau 30 phút)
- *Reply **within** 24 hours.* (không quá 24h)

### 4. Between vs Among
- **Between** + 2 đối tượng cụ thể: *between you and me*
- **Among** + 3+ đối tượng: *among friends*

### 5. Above vs Over
- **Above** = cao hơn (không tiếp xúc): *The sky above us*
- **Over** = bao trùm / phía trên (có thể tiếp xúc): *A blanket over the bed*`,
    theoryEn: `## Confusing Prepositions

### 1. For vs Since
| For | Since |
|-----|-------|
| + duration | + point in time |
| for 2 hours, for a week | since 2020, since Monday |

### 2. By vs Until
| By | Until / Till |
|----|--------------|
| **before or at** a point | **continuously up to** a point |
| Finish it **by** 5 PM. | Wait **until** 5 PM. |

### 3. In vs Within
- **in 30 minutes** = after 30 minutes
- **within 24 hours** = no more than 24 hours

### 4. Between vs Among
- **Between** + 2 specific items
- **Among** + 3+ items

### 5. Above vs Over
- **Above** = higher (no contact)
- **Over** = covering / on top of`,
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền giới từ phù hợp",
        instructionEn: "Fill in the correct preposition",
        sentences: [
          { text: "I have known him ___ 10 years.", textEn: "I have known him ___ 10 years.", answer: "for", hint: "khoảng thời gian → for" },
          { text: "She has worked here ___ 2018.", textEn: "She has worked here ___ 2018.", answer: "since", hint: "mốc thời gian → since" },
          { text: "Please submit the report ___ Friday.", textEn: "Please submit the report ___ Friday.", answer: "by", hint: "trước hoặc bằng → by" },
          { text: "We waited ___ 9 PM.", textEn: "We waited ___ 9 PM.", answer: "until", hint: "liên tục đến → until" },
          { text: "This is a secret ___ you and me.", textEn: "This is a secret ___ you and me.", answer: "between", hint: "2 đối tượng" },
        ],
      },
    ],
    quiz: [
      { question: "'I'll be there ___ 10 minutes.' (sau 10 phút nữa)", options: ["within", "in", "on", "at"], answer: 1, explanation: "in + khoảng thời gian = sau X" },
      { question: "'She has lived in Paris ___ five years.'", options: ["since", "for", "during", "from"], answer: 1, explanation: "for + duration" },
      { question: "'Submit the form ___ tomorrow.' (trước/bằng ngày mai)", options: ["until", "by", "till", "in"], answer: 1, explanation: "by + deadline" },
      { question: "'Discuss ___ your team members (4 người).'", options: ["between", "among", "amid", "in"], answer: 1, explanation: "3+ đối tượng → among" },
    ],
  },
];

// ============================================================
// NEW MODULES (4 brand-new grammar topics)
// ============================================================
export const grammarExpansionModules4: LanguageModule[] = [
  // ===== MODULE: Question Forms =====
  {
    id: "grammar-question-forms",
    title: "Câu hỏi (Question Forms)",
    titleEn: "Question Forms",
    icon: "❓",
    color: "from-cyan-500 to-blue-500",
    description: "Yes/No, Wh-, gián tiếp, đuôi (tag) và câu hỏi đảo ngữ",
    descriptionEn: "Yes/No, Wh-, indirect, tag and inverted questions",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "question-yes-no-wh",
        title: "Câu hỏi Yes/No & Wh-",
        titleEn: "Yes/No & Wh- Questions",
        level: 2,
        difficulty: "beginner",
        theory: `## Câu hỏi Yes/No & Wh-

### 1. Yes/No Questions
**(Aux) + S + V + ...?**
- Hiện tại đơn: **Do/Does** + S + V?
  - *Do you like coffee?*
- Quá khứ đơn: **Did** + S + V?
  - *Did she call you?*
- Be: **Am/Is/Are/Was/Were** + S?
  - *Are they ready?*

### 2. Wh- Questions
**Wh- + (Aux) + S + V + ...?**
- *What do you want?*
- *Where did he go?*
- *When will the bus arrive?*

### 3. Wh- làm chủ ngữ (KHÔNG dùng do/does/did)
- *Who called you?* (KHÔNG: Who did call you?)
- *What happened?*
- *Which book is yours?*

### 4. Bảng các từ Wh-
| Từ | Hỏi về |
|------|---------|
| What | sự vật, hành động |
| Where | nơi chốn |
| When | thời gian |
| Why | lý do |
| Who | người |
| Whom | người (tân ngữ — trang trọng) |
| Whose | sở hữu |
| Which | lựa chọn |
| How | cách thức |
| How many/much | số lượng |
| How long | khoảng thời gian |`,
        theoryEn: `## Yes/No & Wh- Questions

### 1. Yes/No Questions
**(Aux) + S + V + ...?**
- Present Simple: **Do/Does** + S + V?
- Past Simple: **Did** + S + V?
- Be: **Am/Is/Are/Was/Were** + S?

### 2. Wh- Questions
**Wh- + (Aux) + S + V + ...?**
- *What do you want?*
- *Where did he go?*

### 3. Wh- as subject (NO do/does/did)
- *Who called you?* (NOT: Who did call you?)
- *What happened?*

### 4. Wh- words
| Word | Asks about |
|------|------------|
| What | thing, action |
| Where | place |
| When | time |
| Why | reason |
| Who | person |
| Whose | possession |
| Which | choice |
| How | manner |`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Đặt câu hỏi cho phần in đậm",
            instructionEn: "Form a question for the underlined part",
            sentences: [
              { text: "She lives in **Hanoi**. → ___ does she live?", textEn: "She lives in **Hanoi**. → ___ does she live?", answer: "Where", hint: "Nơi chốn → Where" },
              { text: "**John** broke the window. → ___ broke the window?", textEn: "**John** broke the window. → ___ broke the window?", answer: "Who", hint: "Wh- làm chủ ngữ → KHÔNG dùng did" },
              { text: "He arrived **at 7 PM**. → ___ did he arrive?", textEn: "He arrived **at 7 PM**. → ___ did he arrive?", answer: "When", hint: "Thời gian" },
              { text: "She bought it **because it was on sale**. → ___ did she buy it?", textEn: "She bought it **because it was on sale**. → ___ did she buy it?", answer: "Why", hint: "Lý do" },
            ],
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp thành câu hỏi đúng",
            instructionEn: "Reorder into correct questions",
            items: [
              { scrambled: ["did", "you", "what", "yesterday", "do", "?"], correct: "What did you do yesterday?", correctEn: "What did you do yesterday?" },
              { scrambled: ["how", "books", "do", "have", "many", "you", "?"], correct: "How many books do you have?", correctEn: "How many books do you have?" },
            ],
          },
        ],
        quiz: [
          { question: "Choose the correct question:", options: ["Where you live?", "Where do you live?", "Where you do live?", "Where lives you?"], answer: 1, explanation: "Wh- + do + S + V" },
          { question: "'___ broke the vase?' (John broke it)", options: ["Who", "Who did", "Whom", "Whose"], answer: 0, explanation: "Wh- làm chủ ngữ → không dùng did" },
          { question: "Asking about duration:", options: ["How much", "How many", "How long", "How often"], answer: 2, explanation: "How long = bao lâu" },
        ],
      },
      {
        id: "question-tag",
        title: "Câu hỏi đuôi (Tag Questions)",
        titleEn: "Tag Questions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Câu hỏi đuôi (Tag Questions)

### Quy tắc vàng
- Câu khẳng định → đuôi **phủ định**
- Câu phủ định → đuôi **khẳng định**
- Đuôi luôn dùng **trợ động từ** + **đại từ chủ ngữ**

### Ví dụ
| Câu chính | Đuôi |
|-----------|------|
| She is a doctor, | **isn't she?** |
| You don't smoke, | **do you?** |
| They have finished, | **haven't they?** |
| He will come, | **won't he?** |
| We can swim, | **can't we?** |

### Trường hợp đặc biệt
- **I am ...** → đuôi: **aren't I?** (KHÔNG: amn't I)
- **Let's ...** → đuôi: **shall we?**
- **Imperative (mệnh lệnh)** → đuôi: **will you / won't you?**
- **Nobody/Nothing/Everyone** → coi là phủ định / số ít → đuôi với **they**
  - *Nobody called, **did they?***
  - *Everything is OK, **isn't it?***

### Ngữ điệu
- **Xuống giọng** ↘ ở đuôi → đã chắc chắn, chỉ xác nhận
- **Lên giọng** ↗ ở đuôi → thực sự đang hỏi, chưa chắc`,
        theoryEn: `## Tag Questions

### Golden rule
- Positive statement → **negative** tag
- Negative statement → **positive** tag
- Tag uses **auxiliary** + **subject pronoun**

### Examples
| Statement | Tag |
|-----------|-----|
| She is a doctor, | **isn't she?** |
| You don't smoke, | **do you?** |
| They have finished, | **haven't they?** |
| He will come, | **won't he?** |

### Special cases
- **I am ...** → tag: **aren't I?**
- **Let's ...** → tag: **shall we?**
- **Imperative** → tag: **will you / won't you?**
- **Nobody/Nothing/Everyone** → use **they/it**
  - *Nobody called, **did they?***`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền câu hỏi đuôi đúng",
            instructionEn: "Add the correct tag",
            sentences: [
              { text: "You are a teacher, ___?", textEn: "You are a teacher, ___?", answer: "aren't you", hint: "Khẳng định → đuôi phủ định" },
              { text: "She doesn't like coffee, ___?", textEn: "She doesn't like coffee, ___?", answer: "does she", hint: "Phủ định → đuôi khẳng định" },
              { text: "Let's go out, ___?", textEn: "Let's go out, ___?", answer: "shall we", hint: "Let's → shall we" },
              { text: "Nobody called, ___?", textEn: "Nobody called, ___?", answer: "did they", hint: "Nobody coi là phủ định, dùng they" },
              { text: "I am right, ___?", textEn: "I am right, ___?", answer: "aren't I", hint: "I am → aren't I" },
            ],
          },
        ],
        quiz: [
          { question: "'You can swim, ___?'", options: ["can you", "can't you", "do you", "don't you"], answer: 1, explanation: "Khẳng định → đuôi phủ định" },
          { question: "'Open the door, ___?'", options: ["do you", "don't you", "will you", "shall you"], answer: 2, explanation: "Mệnh lệnh → will you / won't you" },
          { question: "'Everyone is happy, ___?'", options: ["are they", "aren't they", "isn't he", "isn't it"], answer: 1, explanation: "Everyone + is → đuôi aren't they" },
        ],
      },
      {
        id: "question-indirect",
        title: "Câu hỏi gián tiếp (Indirect Questions)",
        titleEn: "Indirect Questions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Câu hỏi gián tiếp

Dùng để hỏi **lịch sự, trang trọng** hơn. Sau cụm dẫn → KHÔNG đảo ngữ, KHÔNG dùng do/does/did.

### Cụm dẫn thường gặp
- Could you tell me ...?
- Do you know ...?
- I wonder ...
- Would you mind telling me ...?
- I'd like to know ...

### Quy tắc
**Indirect = Statement word order**

| Direct | Indirect |
|--------|----------|
| Where is the bank? | Could you tell me **where the bank is**? |
| What time does it start? | Do you know **what time it starts**? |
| Did he call? | I wonder **if/whether he called**. |

### Lưu ý
- Yes/No questions → dùng **if / whether**
- Wh- questions → giữ từ Wh-
- KHÔNG dùng dấu hỏi nếu cụm dẫn là câu khẳng định ("I wonder where she is.")`,
        theoryEn: `## Indirect Questions

Used for **politeness/formality**. After the introducer → NO inversion, NO do/does/did.

### Common introducers
- Could you tell me ...?
- Do you know ...?
- I wonder ...

### Rule
**Indirect = Statement word order**

| Direct | Indirect |
|--------|----------|
| Where is the bank? | Could you tell me **where the bank is**? |
| Did he call? | I wonder **if/whether he called**. |

### Notes
- Yes/No → use **if / whether**
- Wh- → keep the Wh- word
- No question mark if introducer is a statement`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Đổi thành câu hỏi gián tiếp",
            instructionEn: "Convert to indirect questions",
            sentences: [
              { text: "Where is the station? → Could you tell me ___?", textEn: "Where is the station? → Could you tell me ___?", answer: "where the station is", hint: "KHÔNG đảo ngữ" },
              { text: "Does she speak English? → Do you know ___?", textEn: "Does she speak English? → Do you know ___?", answer: "if she speaks English", hint: "Yes/No → if + word order thường" },
              { text: "What time does the movie start? → I'd like to know ___.", textEn: "What time does the movie start? → I'd like to know ___.", answer: "what time the movie starts", hint: "Bỏ does, V chia bình thường" },
            ],
          },
        ],
        quiz: [
          { question: "'Could you tell me ___ ?'", options: ["where is the bank", "where the bank is", "where does the bank is", "the bank is where"], answer: 1, explanation: "Indirect = thứ tự câu kể: where + S + V" },
          { question: "Yes/No question khi đổi sang gián tiếp dùng:", options: ["that", "if/whether", "what", "do"], answer: 1, explanation: "if hoặc whether" },
          { question: "'Do you know what time ___?'", options: ["does it start", "it starts", "is it start", "starts it"], answer: 1, explanation: "Statement word order: it starts" },
        ],
      },
    ],
  },

  // ===== MODULE: Modals & Semi-modals =====
  {
    id: "grammar-modals-deep",
    title: "Động từ khuyết thiếu (Modals)",
    titleEn: "Modal Verbs Deep Dive",
    icon: "🎯",
    color: "from-amber-500 to-yellow-500",
    description: "Can, could, may, might, must, should, ought to, had better...",
    descriptionEn: "Can, could, may, might, must, should, ought to, had better...",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "modals-ability-permission",
        title: "Khả năng & Xin phép (Can/Could/May/Might)",
        titleEn: "Ability & Permission",
        level: 2,
        difficulty: "beginner",
        theory: `## Khả năng & Xin phép

### Can / Could (Khả năng)
- **Can** = có thể (hiện tại)
  - *I **can** swim.*
- **Could** = có thể (quá khứ) hoặc lịch sự
  - *When I was young, I **could** run fast.*
  - ***Could** you help me?* (lịch sự)

### May / Might (Xin phép, khả năng)
- **May** = có thể (trang trọng), xin phép trang trọng
  - ***May** I come in?*
  - *It **may** rain tonight.*
- **Might** = có thể (ít chắc chắn hơn may)
  - *He **might** be at home.*

### Mức độ chắc chắn
| Modal | % chắc chắn |
|-------|-------------|
| will | 100% |
| must | 95% (suy luận chắc) |
| should | 90% (kỳ vọng) |
| may | 50% |
| might / could | 30-40% |

### So sánh xin phép
| Form | Tone |
|------|------|
| Can I ...? | thân mật |
| Could I ...? | lịch sự |
| May I ...? | trang trọng |`,
        theoryEn: `## Ability & Permission

### Can / Could (Ability)
- **Can** = present ability
- **Could** = past ability or polite request

### May / Might (Permission, possibility)
- **May** = formal permission, possibility
- **Might** = less certain than may

### Certainty scale
| Modal | % certain |
|-------|-----------|
| will | 100% |
| must | 95% |
| should | 90% |
| may | 50% |
| might / could | 30-40% |`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn modal phù hợp",
            instructionEn: "Choose the right modal",
            sentences: [
              { text: "When I was a child, I ___ climb trees easily.", textEn: "When I was a child, I ___ climb trees easily.", answer: "could", hint: "Khả năng quá khứ → could" },
              { text: "___ I borrow your pen, please?", textEn: "___ I borrow your pen, please?", answer: "May", hint: "Xin phép trang trọng → May/Could" },
              { text: "It ___ rain later — bring an umbrella just in case.", textEn: "It ___ rain later — bring an umbrella just in case.", answer: "might", hint: "Khả năng không chắc → might/may" },
            ],
          },
        ],
        quiz: [
          { question: "Which is the most polite request?", options: ["Can I borrow it?", "Could I borrow it?", "May I borrow it?", "I borrow it?"], answer: 2, explanation: "May = trang trọng nhất" },
          { question: "'He ___ be at the office — I'm not sure.'", options: ["must", "might", "will", "can"], answer: 1, explanation: "Không chắc → might" },
          { question: "Which expresses the highest certainty?", options: ["might", "may", "must", "could"], answer: 2, explanation: "must = ~95%" },
        ],
      },
      {
        id: "modals-obligation-advice",
        title: "Bắt buộc & Khuyên bảo (Must/Have to/Should/Ought to)",
        titleEn: "Obligation & Advice",
        level: 3,
        difficulty: "intermediate",
        theory: `## Bắt buộc & Khuyên bảo

### Must vs Have to
| Must | Have to |
|------|---------|
| Bắt buộc nội tại / quy định | Bắt buộc bên ngoài |
| You **must** wear a helmet. (luật) | I **have to** work on Sunday. (sếp yêu cầu) |
| Không có dạng quá khứ — dùng "had to" | I **had to** leave early. |

### Mustn't vs Don't have to
- **mustn't** = CẤM (không được phép)
  - *You **mustn't** smoke here.*
- **don't have to** = KHÔNG cần thiết (tùy bạn)
  - *You **don't have to** come if you're busy.*

### Should / Ought to (Khuyên bảo)
- *You **should** see a doctor.* (= ought to see)
- *He **shouldn't** eat so much sugar.*

### Had better (cảnh báo mạnh)
- **had better + V (nguyên thể)** = nên (kèm hậu quả nếu không làm)
- *You **'d better hurry**, or you'll miss the train.*
- Phủ định: **'d better not** (KHÔNG: hadn't better)

### Suy luận với Must / Can't
- **must be** = chắc chắn là (95%)
  - *He's smiling. He **must be** happy.*
- **can't be** = không thể nào
  - *That **can't be** true.*`,
        theoryEn: `## Obligation & Advice

### Must vs Have to
| Must | Have to |
|------|---------|
| Internal/rule | External obligation |
| You **must** wear a helmet. | I **have to** work on Sunday. |
| No past form — use "had to" | I **had to** leave early. |

### Mustn't vs Don't have to
- **mustn't** = forbidden
- **don't have to** = not necessary

### Should / Ought to (Advice)
- *You **should** see a doctor.* (= ought to)

### Had better (strong warning)
- **had better + V** = had better
- *You **'d better hurry**, or you'll miss the train.*
- Negative: **'d better not** (NOT hadn't better)

### Deduction with Must / Can't
- **must be** = certainly (95%)
- **can't be** = impossible`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn modal phù hợp",
            instructionEn: "Choose the right modal",
            sentences: [
              { text: "You ___ smoke in the hospital. (cấm)", textEn: "You ___ smoke in the hospital. (forbidden)", answer: "mustn't", hint: "Cấm → mustn't" },
              { text: "You ___ pay if you don't want to. (không cần)", textEn: "You ___ pay if you don't want to. (not necessary)", answer: "don't have to", hint: "Không cần thiết → don't have to" },
              { text: "You ___ hurry, or you'll be late!", textEn: "You ___ hurry, or you'll be late!", answer: "had better", hint: "Cảnh báo mạnh → had better" },
              { text: "She has been working all day. She ___ be exhausted.", textEn: "She has been working all day. She ___ be exhausted.", answer: "must", hint: "Suy luận chắc chắn" },
            ],
          },
        ],
        quiz: [
          { question: "'Don't have to' means:", options: ["forbidden", "not necessary", "must", "should"], answer: 1, explanation: "Không cần thiết, có quyền chọn" },
          { question: "'You ___ touch the wires — they're live!'", options: ["don't have to", "mustn't", "shouldn't", "couldn't"], answer: 1, explanation: "Cấm tuyệt đối → mustn't" },
          { question: "Past form of 'must' for obligation:", options: ["musted", "had to", "must have", "should have"], answer: 1, explanation: "Must không có quá khứ → dùng had to" },
          { question: "'That ___ be John — he's in Tokyo!'", options: ["must", "can't", "shouldn't", "mustn't"], answer: 1, explanation: "Suy luận không thể → can't be" },
        ],
      },
    ],
  },

  // ===== MODULE: Subject-Verb Agreement =====
  {
    id: "grammar-sv-agreement",
    title: "Hòa hợp chủ ngữ - động từ",
    titleEn: "Subject-Verb Agreement",
    icon: "⚖️",
    color: "from-fuchsia-500 to-purple-500",
    description: "Quy tắc chia động từ theo chủ ngữ trong các trường hợp khó",
    descriptionEn: "Verb agreement rules including tricky cases",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "sv-agreement-rules",
        title: "Quy tắc hòa hợp cơ bản & nâng cao",
        titleEn: "Basic & Advanced Agreement Rules",
        level: 3,
        difficulty: "intermediate",
        theory: `## Hòa hợp chủ ngữ - động từ

### Quy tắc cơ bản
- Chủ ngữ **số ít** → động từ **số ít** (V-s/es)
- Chủ ngữ **số nhiều** → động từ **số nhiều** (V nguyên)

### Trường hợp khó

#### 1. Chủ ngữ + cụm bổ nghĩa
Động từ chia theo chủ ngữ chính, KHÔNG theo cụm xen giữa
- *The **box** of chocolates **is** on the table.* (box → is)
- *The **students**, along with the teacher, **are** here.* (students → are)

#### 2. Either/Neither/None of + N
- Either / Neither + N số ít → V số ít: *Neither answer **is** correct.*
- None of + N (không đếm được) → V số ít: *None of the water **is** clean.*
- None of + N số nhiều → V số nhiều (hoặc số ít trong trang trọng)

#### 3. Either ... or / Neither ... nor
Động từ chia theo **chủ ngữ gần nhất**
- *Either Tom or his brothers **are** coming.*
- *Neither the students nor the teacher **is** here.*

#### 4. There is / There are
Động từ chia theo danh từ phía sau
- *There **is** a book on the desk.*
- *There **are** many books on the desk.*

#### 5. Số tiền / Khoảng cách / Thời gian (số nhiều nhưng coi là 1 đơn vị)
- *Five dollars **is** a lot.* (1 món tiền)
- *Ten kilometers **is** far.*

#### 6. Tên môn học/môn thể thao kết thúc -s
- *Mathematics **is** my favorite subject.* (môn học)
- *Politics **is** complicated.*

#### 7. Family / Team / Government (collective nouns)
- Coi là 1 đơn vị → số ít: *The team **is** winning.*
- Coi là cá nhân riêng → số nhiều: *The team **are** wearing different colors.*

#### 8. Each / Every / Everyone / Somebody / Nobody → số ít
- *Everyone **is** invited.*
- *Each student **has** a desk.*`,
        theoryEn: `## Subject-Verb Agreement

### Basic
- Singular subject → singular verb
- Plural subject → plural verb

### Tricky cases

#### 1. Subject + modifier
Verb agrees with the head noun, NOT the intervening phrase
- *The **box** of chocolates **is** on the table.*

#### 2. Either/Neither/None of
- Either + singular → singular verb
- None of + uncountable → singular

#### 3. Either ... or / Neither ... nor
Verb agrees with the **nearest subject**

#### 4. There is / There are
Verb agrees with the noun after

#### 5. Money / Distance / Time as one unit → singular
- *Five dollars **is** a lot.*

#### 6. Subject ending in -s but singular
- Mathematics, politics, economics, news → singular

#### 7. Collective nouns (family, team)
- Singular if treated as one unit

#### 8. Indefinite pronouns → singular
- Each, every, everyone, somebody, nobody → singular`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chia động từ đúng (số ít/số nhiều)",
            instructionEn: "Use the correct verb form",
            sentences: [
              { text: "The box of cookies ___ (be) on the shelf.", textEn: "The box of cookies ___ (be) on the shelf.", answer: "is", hint: "Chủ ngữ chính: box (số ít)" },
              { text: "Neither the boys nor the girl ___ (have) finished.", textEn: "Neither the boys nor the girl ___ (have) finished.", answer: "has", hint: "Theo gần nhất: girl (số ít)" },
              { text: "There ___ (be) three apples in the bowl.", textEn: "There ___ (be) three apples in the bowl.", answer: "are", hint: "apples → are" },
              { text: "Mathematics ___ (be) my favorite subject.", textEn: "Mathematics ___ (be) my favorite subject.", answer: "is", hint: "Môn học → số ít" },
              { text: "Everyone in the room ___ (look) excited.", textEn: "Everyone in the room ___ (look) excited.", answer: "looks", hint: "Everyone → số ít" },
              { text: "Twenty dollars ___ (be) too much for that.", textEn: "Twenty dollars ___ (be) too much for that.", answer: "is", hint: "Tiền → 1 đơn vị" },
            ],
          },
        ],
        quiz: [
          { question: "'The number of students ___ increasing.'", options: ["are", "is", "have", "were"], answer: 1, explanation: "'The number of' → số ít (a number of → số nhiều)" },
          { question: "'Either Tom or his friends ___ wrong.'", options: ["is", "are", "has", "was"], answer: 1, explanation: "Theo chủ ngữ gần nhất: friends → are" },
          { question: "'Each of the boys ___ a bike.'", options: ["have", "has", "are having", "had"], answer: 1, explanation: "Each → số ít → has" },
          { question: "'The news ___ shocking.'", options: ["are", "is", "have been", "were"], answer: 1, explanation: "News kết thúc -s nhưng số ít" },
        ],
      },
    ],
  },

  // ===== MODULE: Punctuation =====
  {
    id: "grammar-punctuation",
    title: "Dấu câu (Punctuation)",
    titleEn: "Punctuation Essentials",
    icon: "✏️",
    color: "from-slate-500 to-gray-700",
    description: "Phẩy, chấm phẩy, hai chấm, gạch ngang và dấu nháy",
    descriptionEn: "Comma, semicolon, colon, dash and apostrophe rules",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "punctuation-comma-semicolon",
        title: "Dấu phẩy & Chấm phẩy",
        titleEn: "Comma & Semicolon",
        level: 3,
        difficulty: "intermediate",
        theory: `## Dấu phẩy (,) & Chấm phẩy (;)

### Dấu phẩy — Khi nào dùng?

#### 1. Liệt kê (3+ items)
- *I bought apples, oranges, and bananas.*
- "Oxford comma" trước **and** là tùy chọn nhưng nên dùng để tránh mơ hồ.

#### 2. Sau cụm trạng ngữ mở đầu
- *In the morning, I drink coffee.*
- *After finishing dinner, we watched a movie.*

#### 3. Trước liên từ kết hợp 2 mệnh đề độc lập (FANBOYS)
**For, And, Nor, But, Or, Yet, So**
- *I love coffee, but my sister prefers tea.*

#### 4. Bao quanh mệnh đề/cụm bổ sung (non-essential)
- *My brother, who lives in Hanoi, is a doctor.*
- *The Eiffel Tower, built in 1889, is iconic.*

#### 5. Sau từ chuyển ý
- *However, I disagree.*
- *Therefore, we must act.*

### Lỗi phổ biến: Comma Splice
- ❌ I went to the store, I bought milk.
- ✅ I went to the store**, and** I bought milk.
- ✅ I went to the store**;** I bought milk.
- ✅ I went to the store**.** I bought milk.

### Chấm phẩy (;)
Nối **2 mệnh đề độc lập** liên quan chặt chẽ
- *She loves Paris; he prefers London.*
- *Time is money; don't waste it.*

Trước các từ chuyển ý: **however, therefore, moreover, thus, furthermore**
- *I'm tired; **however**, I'll keep working.*`,
        theoryEn: `## Comma (,) & Semicolon (;)

### Comma — When to use

#### 1. Lists (3+ items)
- *I bought apples, oranges, and bananas.*

#### 2. After introductory phrases
- *In the morning, I drink coffee.*

#### 3. Before FANBOYS joining 2 independent clauses
**For, And, Nor, But, Or, Yet, So**

#### 4. Around non-essential clauses
- *My brother, who lives in Hanoi, is a doctor.*

#### 5. After transitional words
- *However, I disagree.*

### Common mistake: Comma Splice
- ❌ I went to the store, I bought milk.
- ✅ I went to the store**, and** I bought milk.
- ✅ I went to the store**;** I bought milk.

### Semicolon (;)
Joins **2 closely related independent clauses**
- *She loves Paris; he prefers London.*

Before transitional words: **however, therefore, moreover, thus**`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Sửa câu (thêm dấu hoặc đổi)",
            instructionEn: "Fix the punctuation",
            sentences: [
              { text: "I'm tired ___ I'll keep working. (Use semicolon + however)", textEn: "I'm tired ___ I'll keep working. (Use semicolon + however)", answer: "; however,", hint: "; + however + ," },
              { text: "After dinner ___ we watched a movie.", textEn: "After dinner ___ we watched a movie.", answer: ",", hint: "Sau cụm mở đầu → phẩy" },
              { text: "I love coffee ___ but my sister prefers tea.", textEn: "I love coffee ___ but my sister prefers tea.", answer: ",", hint: "FANBOYS giữa 2 mệnh đề → phẩy trước" },
            ],
          },
        ],
        quiz: [
          { question: "Câu nào ĐÚNG?", options: ["I'm hungry, I'll eat now.", "I'm hungry; I'll eat now.", "I'm hungry I'll eat now.", "I'm hungry, eat now."], answer: 1, explanation: "Comma splice → dùng ; thay vì ," },
          { question: "Khi nào dùng dấu phẩy trước 'and'?", options: ["Luôn luôn", "Trong danh sách 3+ (Oxford comma) hoặc nối 2 mệnh đề", "Không bao giờ", "Chỉ khi câu dài"], answer: 1, explanation: "Oxford comma + nối 2 independent clauses" },
          { question: "'My sister___ who lives in Tokyo___ is a chef.' Cần điền:", options: [", ,", "; ;", ": :", "— —"], answer: 0, explanation: "Mệnh đề bổ sung không xác định → phẩy 2 đầu" },
        ],
      },
      {
        id: "punctuation-apostrophe-colon",
        title: "Dấu nháy & Hai chấm",
        titleEn: "Apostrophe & Colon",
        level: 2,
        difficulty: "beginner",
        theory: `## Dấu nháy ('") & Hai chấm (:)

### Dấu nháy đơn (')

#### 1. Sở hữu cách
- **Số ít:** John**'s** car
- **Số nhiều có -s:** the boys**'** room
- **Số nhiều không -s:** children**'s** toys
- **Tên kết thúc -s:** James**'s** book (hoặc James**'**)

#### 2. Viết tắt
- it's = it is / it has
- they're = they are
- can't = cannot
- won't = will not

### Lỗi cực kỳ phổ biến: Its vs It's
- **Its** (sở hữu, KHÔNG có dấu nháy): *The dog wagged **its** tail.*
- **It's** (= it is / it has): ***It's** raining.*

### Dấu nháy kép (")
- Trích dẫn lời nói trực tiếp: *She said, **"I'm here."***
- Tên sách/bài hát (đôi khi dùng nghiêng thay): ***"Bohemian Rhapsody"** is a classic.*

### Dấu hai chấm (:)
Dùng để giới thiệu:

#### 1. Danh sách
- *I need three things: bread, milk, and eggs.*

#### 2. Lời giải thích / mở rộng
- *He had only one passion: music.*

#### 3. Trích dẫn dài
- *Hai said: "Education changes lives."*

#### 4. Giờ và tỷ lệ
- *3:30 PM*, *score 2:1*

### Lưu ý
- Trước dấu hai chấm phải là **mệnh đề hoàn chỉnh**
- ❌ I like: pizza, sushi, sushi.
- ✅ I like three foods: pizza, sushi, pho.`,
        theoryEn: `## Apostrophe (') & Colon (:)

### Apostrophe (')

#### 1. Possession
- **Singular:** John**'s** car
- **Plural with -s:** the boys**'** room
- **Plural without -s:** children**'s** toys

#### 2. Contractions
- it's = it is / it has
- they're = they are
- can't = cannot

### Common mistake: Its vs It's
- **Its** (possessive, NO apostrophe): *The dog wagged **its** tail.*
- **It's** (= it is / it has): ***It's** raining.*

### Colon (:)
Used to introduce:
1. Lists — *I need three things: bread, milk, and eggs.*
2. Explanations — *He had only one passion: music.*
3. Quotations
4. Time and ratios — *3:30 PM*

### Note
- Before a colon must be a **complete sentence**`,
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền 'its' hoặc 'it's'",
            instructionEn: "Fill in 'its' or 'it's'",
            sentences: [
              { text: "___ time to go home.", textEn: "___ time to go home.", answer: "It's", hint: "= It is → có dấu nháy" },
              { text: "The cat licked ___ paw.", textEn: "The cat licked ___ paw.", answer: "its", hint: "Sở hữu → KHÔNG dấu nháy" },
              { text: "I think ___ raining outside.", textEn: "I think ___ raining outside.", answer: "it's", hint: "= it is" },
            ],
          },
          {
            type: "fill-in-blank" as const,
            instruction: "Thêm dấu nháy đúng vị trí",
            instructionEn: "Add the apostrophe in the right place",
            sentences: [
              { text: "the childrens toys → ___", textEn: "the childrens toys → ___", answer: "the children's toys", hint: "children số nhiều không -s → 's" },
              { text: "the boys room (số nhiều) → ___", textEn: "the boys room (plural) → ___", answer: "the boys' room", hint: "số nhiều có -s → ' sau s" },
            ],
          },
        ],
        quiz: [
          { question: "Câu nào đúng?", options: ["The dog wagged it's tail.", "The dog wagged its tail.", "The dog wagged its' tail.", "The dog wagged its's tail."], answer: 1, explanation: "Sở hữu của it = its (KHÔNG dấu nháy)" },
          { question: "Cách viết đúng cho sở hữu của 'James':", options: ["Jame's", "James'", "James's", "Cả B và C đều chấp nhận"], answer: 3, explanation: "Cả James' và James's đều đúng" },
          { question: "Khi nào dùng dấu hai chấm (:)?", options: ["Sau bất kỳ động từ nào", "Trước danh sách hoặc giải thích sau câu hoàn chỉnh", "Thay cho dấu phẩy", "Trước liên từ"], answer: 1, explanation: "Sau câu hoàn chỉnh để giới thiệu danh sách/giải thích" },
        ],
      },
    ],
  },
];
