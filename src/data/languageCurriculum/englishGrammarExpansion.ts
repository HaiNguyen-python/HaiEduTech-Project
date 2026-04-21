import type { LanguageModule, LanguageLesson } from "./types";

// Extra lessons to inject into existing grammar modules
export interface GrammarExtraLesson extends LanguageLesson {
  moduleId: string;
}

export const grammarExtraLessons: GrammarExtraLesson[] = [
  // ===== TENSES EXTRAS =====
  {
    moduleId: "grammar-tenses",
    id: "tenses-perfect-continuous",
    title: "Present Perfect Continuous vs Past Perfect",
    titleEn: "Present Perfect Continuous vs Past Perfect",
    level: 4,
    difficulty: "advanced",
    theory: `## Present Perfect Continuous vs Past Perfect

### 1. Present Perfect Continuous (Hiện tại hoàn thành tiếp diễn)
- **Cấu trúc:** S + have/has + been + V-ing
- **Dùng khi:** nhấn mạnh **quá trình** kéo dài đến hiện tại
- VD: *I **have been waiting** for you for 2 hours.*
- VD: *She **has been working** here since 2020.*

### 2. Past Perfect (Quá khứ hoàn thành)
- **Cấu trúc:** S + had + V3/ed
- **Dùng khi:** hành động xảy ra **trước** một hành động khác trong quá khứ
- VD: *When I arrived, she **had already left**.*
- VD: *They **had finished** dinner before the movie started.*

### So sánh quan trọng
| Thì | Trọng tâm | Ví dụ |
|-----|-----------|-------|
| Present Perfect Continuous | Quá trình đang tiếp diễn | I have been reading this book (vẫn đang đọc) |
| Present Perfect Simple | Kết quả | I have read this book (đã đọc xong) |
| Past Perfect | Trước một mốc quá khứ | I had read the book before the exam |

### Lưu ý
- Không dùng Perfect Continuous với stative verbs: know, believe, want, own...
- Past Perfect thường đi với: before, after, by the time, already, just`,
    theoryEn: `## Present Perfect Continuous vs Past Perfect

### 1. Present Perfect Continuous
- **Structure:** S + have/has + been + V-ing
- **Usage:** emphasizes the **duration/process** continuing to the present
- E.g.: *I **have been waiting** for you for 2 hours.*

### 2. Past Perfect
- **Structure:** S + had + V3/ed
- **Usage:** action that happened **before** another past action
- E.g.: *When I arrived, she **had already left**.*

### Key Differences
| Tense | Focus | Example |
|-------|-------|---------|
| Present Perfect Continuous | Ongoing process | I have been reading this book |
| Present Perfect Simple | Result | I have read this book |
| Past Perfect | Before a past point | I had read the book before the exam |`,
    proTips: [
      "Dùng 'for' + khoảng thời gian, 'since' + mốc thời gian với Present Perfect Continuous",
      "Past Perfect = 'the past of the past' — luôn có 2 mốc thời gian",
      "Stative verbs (know, like, own) KHÔNG dùng ở dạng Continuous"
    ],
    proTipsEn: [
      "Use 'for' + duration, 'since' + point in time with Present Perfect Continuous",
      "Past Perfect = 'the past of the past' — always involves 2 time references",
      "Stative verbs (know, like, own) do NOT use Continuous form"
    ],
    vocabulary: [
      { word: "duration", meaning: "khoảng thời gian", example: "The duration of the course is 3 months." },
      { word: "ongoing", meaning: "đang diễn ra", example: "The project is ongoing." },
      { word: "prior to", meaning: "trước khi", example: "Prior to the meeting, he had prepared notes." },
      { word: "by the time", meaning: "cho đến khi", example: "By the time she arrived, we had left." },
      { word: "lately", meaning: "gần đây", example: "I have been feeling tired lately." },
      { word: "throughout", meaning: "suốt, xuyên suốt", example: "She had worked throughout the night." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền thì đúng vào chỗ trống",
        instructionEn: "Fill in the correct tense",
        sentences: [
          { text: "She ___ (wait) for 3 hours before he arrived.", textEn: "She ___ (wait) for 3 hours before he arrived.", answer: "had been waiting", hint: "Hành động kéo dài trước mốc quá khứ" },
          { text: "I ___ (study) English since 2018.", textEn: "I ___ (study) English since 2018.", answer: "have been studying", hint: "Quá trình kéo dài đến hiện tại" },
          { text: "By the time we got there, the show ___ (start).", textEn: "By the time we got there, the show ___ (start).", answer: "had started", hint: "Trước mốc quá khứ" },
          { text: "They ___ (live) here for 10 years.", textEn: "They ___ (live) here for 10 years.", answer: "have been living", hint: "Vẫn đang sống" },
          { text: "She ___ (already/finish) her homework when I called.", textEn: "She ___ (already/finish) her homework when I called.", answer: "had already finished", hint: "Hoàn thành trước mốc quá khứ" },
          { text: "He ___ (work) all day, so he is very tired now.", textEn: "He ___ (work) all day, so he is very tired now.", answer: "has been working", hint: "Quá trình → kết quả hiện tại" },
          { text: "We ___ (never/see) such a beautiful place before that trip.", textEn: "We ___ (never/see) such a beautiful place before that trip.", answer: "had never seen", hint: "Kinh nghiệm trước mốc quá khứ" },
          { text: "It ___ (rain) since morning.", textEn: "It ___ (rain) since morning.", answer: "has been raining", hint: "Kéo dài từ sáng đến giờ" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu đúng",
        instructionEn: "Reorder the sentence correctly",
        items: [
          { scrambled: ["been", "I", "have", "for", "waiting", "hours", "two"], correct: "I have been waiting for two hours" },
          { scrambled: ["had", "the", "she", "before", "left", "I", "arrived"], correct: "she had left before I arrived" },
          { scrambled: ["has", "working", "he", "been", "morning", "since"], correct: "he has been working since morning" },
          { scrambled: ["finished", "had", "they", "already", "dinner", "the"], correct: "they had already finished the dinner" },
          { scrambled: ["been", "it", "has", "all", "raining", "day"], correct: "it has been raining all day" }
        ]
      }
    ],
    quiz: [
      { question: "Choose the correct sentence:", options: ["I have been knowing him for years.", "I have known him for years.", "I had been knowing him for years.", "I am knowing him for years."], answer: 1, explanation: "'Know' is a stative verb, not used in Continuous form." },
      { question: "'By the time she arrived, he ___ the report.'", options: ["has finished", "had finished", "have been finishing", "finished"], answer: 1, explanation: "Past Perfect because the action was completed before the past moment 'she arrived'." },
      { question: "'We ___ for 3 hours when the bus finally came.' Choose the correct answer:", options: ["have been waiting", "had been waiting", "waited", "are waiting"], answer: 1, explanation: "Past Perfect Continuous: a process continuing up to a past moment." },
      { question: "Which sentence uses Present Perfect Continuous correctly?", options: ["She has been reading since 2 PM.", "She has been owning this car for 5 years.", "I have been believing in you.", "They have been seeming happy."], answer: 0, explanation: "Only 'read' is an action verb usable in Continuous. Own, believe, seem are stative verbs." },
      { question: "'I ___ English for 5 years.' — emphasizing the ongoing process:", options: ["study", "have studied", "have been studying", "had studied"], answer: 2, explanation: "Present Perfect Continuous emphasizes an ongoing process up to the present." }
    ]
  },
  {
    moduleId: "grammar-tenses",
    id: "tenses-future-perfect",
    title: "Future Perfect & Future Perfect Continuous",
    titleEn: "Future Perfect & Future Perfect Continuous",
    level: 4,
    difficulty: "advanced",
    theory: `## Future Perfect & Future Perfect Continuous

### 1. Future Perfect (Tương lai hoàn thành)
- **Cấu trúc:** S + will have + V3/ed
- **Dùng khi:** hành động sẽ hoàn thành **trước** một mốc tương lai
- VD: *By 2026, I **will have graduated** from university.*
- VD: *She **will have finished** the project by Friday.*

### 2. Future Perfect Continuous (Tương lai hoàn thành tiếp diễn)
- **Cấu trúc:** S + will have been + V-ing
- **Dùng khi:** nhấn mạnh **thời gian kéo dài** đến một mốc tương lai
- VD: *By next month, I **will have been working** here for 5 years.*

### Dấu hiệu
- by + thời gian tương lai: by 2030, by next week, by the time...
- for + khoảng thời gian (với Continuous)`,
    theoryEn: `## Future Perfect & Future Perfect Continuous

### 1. Future Perfect
- **Structure:** S + will have + V3/ed
- **Usage:** action completed **before** a future point
- E.g.: *By 2026, I **will have graduated**.*

### 2. Future Perfect Continuous
- **Structure:** S + will have been + V-ing
- **Usage:** emphasizes **duration** up to a future point
- E.g.: *By next month, I **will have been working** here for 5 years.*`,
    proTips: [
      "'By + mốc tương lai' là dấu hiệu của Future Perfect",
      "Future Perfect Continuous nhấn mạnh quá trình, Future Perfect nhấn mạnh kết quả",
      "Trong mệnh đề 'by the time + S + V', dùng thì hiện tại đơn cho mệnh đề phụ"
    ],
    proTipsEn: [
      "'By + future time' signals Future Perfect",
      "Future Perfect Continuous = process, Future Perfect = result",
      "In 'by the time + S + V' clauses, use present simple in the subordinate clause"
    ],
    vocabulary: [
      { word: "by then", meaning: "đến lúc đó", example: "By then, we will have moved to a new house." },
      { word: "accomplish", meaning: "hoàn thành, đạt được", example: "She will have accomplished her goals by 30." },
      { word: "milestone", meaning: "cột mốc", example: "Graduating is an important milestone." },
      { word: "anticipate", meaning: "dự đoán, mong đợi", example: "We anticipate that they will have finished." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Chia động từ ở thì Future Perfect hoặc Future Perfect Continuous",
        instructionEn: "Use Future Perfect or Future Perfect Continuous",
        sentences: [
          { text: "By 2030, scientists ___ (discover) a cure.", textEn: "By 2030, scientists ___ (discover) a cure.", answer: "will have discovered", hint: "Kết quả trước mốc tương lai" },
          { text: "By next year, I ___ (learn) English for 10 years.", textEn: "By next year, I ___ (learn) English for 10 years.", answer: "will have been learning", hint: "Nhấn mạnh thời gian kéo dài" },
          { text: "She ___ (finish) the book by tonight.", textEn: "She ___ (finish) the book by tonight.", answer: "will have finished", hint: "Hoàn thành trước tối nay" },
          { text: "By the time you arrive, we ___ (wait) for 2 hours.", textEn: "By the time you arrive, we ___ (wait) for 2 hours.", answer: "will have been waiting", hint: "Quá trình kéo dài" },
          { text: "They ___ (build) the bridge by December.", textEn: "They ___ (build) the bridge by December.", answer: "will have built", hint: "Hoàn thành trước tháng 12" },
          { text: "By Friday, he ___ (work) on this project for a month.", textEn: "By Friday, he ___ (work) on this project for a month.", answer: "will have been working", hint: "Nhấn mạnh thời gian" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp thành câu hoàn chỉnh",
        instructionEn: "Arrange into a complete sentence",
        items: [
          { scrambled: ["will", "graduated", "by", "have", "she", "June"], correct: "she will have graduated by June" },
          { scrambled: ["have", "working", "will", "been", "I", "years", "for", "ten"], correct: "I will have been working for ten years" },
          { scrambled: ["finished", "they", "have", "will", "the", "project"], correct: "they will have finished the project" },
          { scrambled: ["been", "will", "have", "waiting", "we", "hours", "for", "two"], correct: "we will have been waiting for two hours" }
        ]
      }
    ],
    quiz: [
      { question: "'By 2030, they ___ the new hospital.'", options: ["will build", "will have built", "will have been building", "are building"], answer: 1, explanation: "Future Perfect: completed before the future point 2030." },
      { question: "Which sentence emphasizes the process/duration?", options: ["I will have read 5 books.", "I will have been reading for 3 hours.", "I will read a book.", "I read books."], answer: 1, explanation: "Future Perfect Continuous emphasizes duration/process." },
      { question: "'By the time you ___, I will have left.' Fill in correctly:", options: ["will arrive", "arrive", "arrived", "have arrived"], answer: 1, explanation: "The subordinate clause with 'by the time' uses present simple." },
      { question: "What does Future Perfect Continuous emphasize?", options: ["Result", "Duration/ongoing process", "Repeated actions", "Facts"], answer: 1, explanation: "Future Perfect Continuous always emphasizes duration up to a future point." },
      { question: "'She ___ here for 20 years by next month.'", options: ["works", "will work", "will have been working", "has worked"], answer: 2, explanation: "An ongoing process up to a future point → Future Perfect Continuous." }
    ]
  },
  // ===== CONDITIONALS EXTRA =====
  {
    moduleId: "grammar-conditionals",
    id: "conditionals-wish",
    title: "Wish & If only",
    titleEn: "Wish & If only",
    level: 4,
    difficulty: "advanced",
    theory: `## Wish & If only — Câu ước

### 1. Ước ở hiện tại (không có thật)
- **Cấu trúc:** S + wish/if only + S + V2/ed (past simple)
- VD: *I **wish** I **were** taller.* (Ước gì tôi cao hơn)
- VD: *If only I **had** more time.* (Giá mà tôi có nhiều thời gian hơn)

### 2. Ước ở quá khứ (hối tiếc)
- **Cấu trúc:** S + wish/if only + S + had + V3/ed (past perfect)
- VD: *I **wish** I **had studied** harder.* (Ước gì tôi đã học chăm hơn)
- VD: *If only she **hadn't left** so early.* (Giá mà cô ấy đã không đi sớm)

### 3. Ước về tương lai (mong muốn thay đổi)
- **Cấu trúc:** S + wish + S + would + V
- VD: *I **wish** it **would stop** raining.* (Ước gì trời ngừng mưa)
- ⚠️ Không dùng "I wish I would" — dùng "I wish I could"

### Lưu ý quan trọng
- "wish + were" (không dùng "was" trong formal English)
- "If only" = "I wish" nhưng mạnh hơn, thể hiện cảm xúc hơn`,
    theoryEn: `## Wish & If only

### 1. Wish about the present (unreal)
- **Structure:** S + wish/if only + S + V2/ed
- E.g.: *I **wish** I **were** taller.*

### 2. Wish about the past (regret)
- **Structure:** S + wish/if only + S + had + V3/ed
- E.g.: *I **wish** I **had studied** harder.*

### 3. Wish about the future (desire for change)
- **Structure:** S + wish + S + would + V
- E.g.: *I **wish** it **would stop** raining.*
- ⚠️ Don't use "I wish I would" — use "I wish I could"`,
    proTips: [
      "Wish + were (KHÔNG phải 'was') trong formal English",
      "If only = I wish nhưng cảm xúc mạnh hơn",
      "Wish about past = hối tiếc → had + V3",
      "KHÔNG dùng 'I wish I would' → dùng 'I wish I could'"
    ],
    proTipsEn: [
      "Wish + were (NOT 'was') in formal English",
      "If only = I wish but more emotional",
      "Wish about past = regret → had + V3",
      "DON'T use 'I wish I would' → use 'I wish I could'"
    ],
    vocabulary: [
      { word: "regret", meaning: "hối tiếc", example: "I regret not studying harder." },
      { word: "longing", meaning: "khao khát", example: "She felt a deep longing for home." },
      { word: "hindsight", meaning: "nhìn lại", example: "In hindsight, I should have listened." },
      { word: "if only", meaning: "giá mà", example: "If only I had more money!" },
      { word: "unrealistic", meaning: "không thực tế", example: "His wishes were unrealistic." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Hoàn thành câu ước",
        instructionEn: "Complete the wish sentence",
        sentences: [
          { text: "I wish I ___ (be) rich.", textEn: "I wish I ___ (be) rich.", answer: "were", hint: "Ước ở hiện tại → V2" },
          { text: "If only she ___ (not/leave) yesterday.", textEn: "If only she ___ (not/leave) yesterday.", answer: "hadn't left", hint: "Ước ở quá khứ → had V3" },
          { text: "I wish it ___ (stop) raining.", textEn: "I wish it ___ (stop) raining.", answer: "would stop", hint: "Ước tương lai → would V" },
          { text: "She wishes she ___ (study) medicine.", textEn: "She wishes she ___ (study) medicine.", answer: "had studied", hint: "Hối tiếc quá khứ" },
          { text: "If only I ___ (can) fly!", textEn: "If only I ___ (can) fly!", answer: "could", hint: "Ước hiện tại với modal" },
          { text: "I wish you ___ (not/be) so noisy.", textEn: "I wish you ___ (not/be) so noisy.", answer: "weren't", hint: "Ước hiện tại" },
          { text: "He wishes he ___ (take) that job offer last year.", textEn: "He wishes he ___ (take) that job offer last year.", answer: "had taken", hint: "Hối tiếc quá khứ" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu ước",
        instructionEn: "Arrange the wish sentence",
        items: [
          { scrambled: ["wish", "I", "taller", "were", "I"], correct: "I wish I were taller" },
          { scrambled: ["only", "if", "studied", "had", "I", "harder"], correct: "if only I had studied harder" },
          { scrambled: ["wishes", "she", "could", "she", "sing"], correct: "she wishes she could sing" },
          { scrambled: ["wish", "would", "I", "stop", "it", "raining"], correct: "I wish it would stop raining" }
        ]
      }
    ],
    quiz: [
      { question: "'I wish I ___ taller.' (present wish)", options: ["am", "was", "were", "be"], answer: 2, explanation: "Wish + were (formal) for present wishes." },
      { question: "'If only she ___ that email.' (past regret)", options: ["didn't send", "hadn't sent", "doesn't send", "won't send"], answer: 1, explanation: "Wish about the past → had + V3/ed." },
      { question: "Which sentence is WRONG?", options: ["I wish I would be smarter.", "I wish I were smarter.", "If only I could fly.", "I wish it would rain."], answer: 0, explanation: "'I wish I would' is incorrect. Use 'I wish I were' or 'I wish I could'." },
      { question: "'He wishes he ___ the exam.' (regret about not passing)", options: ["passes", "passed", "had passed", "would pass"], answer: 2, explanation: "Past regret → had + V3." },
      { question: "How is 'If only' different from 'I wish'?", options: ["Exactly the same", "If only is stronger and more emotional", "If only is used only for the past", "If only is used with will"], answer: 1, explanation: "If only = I wish but expresses stronger emotion." }
    ]
  },
  // ===== PASSIVE EXTRA =====
  {
    moduleId: "grammar-passive",
    id: "passive-causative",
    title: "Causative Have/Get",
    titleEn: "Causative Have/Get",
    level: 4,
    difficulty: "advanced",
    theory: `## Causative Have/Get — Thể sai khiến

### 1. Have something done
- **Cấu trúc:** S + have + O (vật) + V3/ed
- **Nghĩa:** nhờ/thuê ai đó làm gì
- VD: *I **had** my hair **cut** yesterday.* (Tôi đi cắt tóc — nhờ thợ cắt)
- VD: *She **had** her car **repaired**.* (Cô ấy mang xe đi sửa)

### 2. Get something done
- **Cấu trúc:** S + get + O (vật) + V3/ed
- **Nghĩa:** tương tự "have sth done" (informal hơn)
- VD: *I **got** my phone **fixed**.* (Tôi mang điện thoại đi sửa)

### 3. Have someone do / Get someone to do
- **Have sb do sth:** *I **had** him **check** the report.*
- **Get sb to do sth:** *I **got** him **to check** the report.*

### Phân biệt
| Cấu trúc | Nghĩa | Ví dụ |
|-----------|-------|-------|
| I cut my hair | Tự cắt | I cut my hair myself |
| I had my hair cut | Nhờ thợ cắt | I went to the barber |
| I got my hair cut | Nhờ thợ cắt (informal) | Same as above |`,
    theoryEn: `## Causative Have/Get

### 1. Have something done
- **Structure:** S + have + O (thing) + V3/ed
- **Meaning:** arrange for someone else to do something
- E.g.: *I **had** my hair **cut**.*

### 2. Get something done
- Same meaning, more informal
- E.g.: *I **got** my phone **fixed**.*

### 3. Have someone do / Get someone to do
- *I **had** him **check** the report.*
- *I **got** him **to check** the report.*`,
    proTips: [
      "Have sth done ≠ tự làm → nhờ người khác",
      "Get sb TO do (có 'to') ≠ Have sb do (không 'to')",
      "Causative cũng dùng ở các thì khác: had had sth done, will have sth done"
    ],
    proTipsEn: [
      "Have sth done ≠ do it yourself → someone else does it",
      "Get sb TO do (with 'to') ≠ Have sb do (no 'to')",
      "Causative works in all tenses: had had sth done, will have sth done"
    ],
    vocabulary: [
      { word: "repair", meaning: "sửa chữa", example: "I had my watch repaired." },
      { word: "install", meaning: "lắp đặt", example: "We got the AC installed." },
      { word: "deliver", meaning: "giao hàng", example: "I had the package delivered." },
      { word: "service", meaning: "bảo dưỡng", example: "She gets her car serviced every year." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Hoàn thành câu Causative",
        instructionEn: "Complete the causative sentence",
        sentences: [
          { text: "I ___ my car ___ last week. (have/wash)", textEn: "I ___ my car ___ last week. (have/wash)", answer: "had washed", hint: "have + O + V3" },
          { text: "She ___ her nails ___ every month. (get/do)", textEn: "She ___ her nails ___ every month. (get/do)", answer: "gets done", hint: "get + O + V3" },
          { text: "We need to ___ the roof ___. (have/fix)", textEn: "We need to ___ the roof ___. (have/fix)", answer: "have fixed", hint: "have + O + V3" },
          { text: "He ___ his assistant ___ the report. (have/prepare)", textEn: "He ___ his assistant ___ the report. (have/prepare)", answer: "had prepare", hint: "have + sb + V(bare)" },
          { text: "I'll ___ someone ___ the windows. (get/clean)", textEn: "I'll ___ someone ___ the windows. (get/clean)", answer: "get to clean", hint: "get + sb + to V" },
          { text: "They ___ their house ___ last summer. (have/paint)", textEn: "They ___ their house ___ last summer. (have/paint)", answer: "had painted", hint: "have + O + V3" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu causative",
        instructionEn: "Arrange the causative sentence",
        items: [
          { scrambled: ["had", "I", "repaired", "my", "car"], correct: "I had my car repaired" },
          { scrambled: ["gets", "she", "done", "her", "nails"], correct: "she gets her nails done" },
          { scrambled: ["got", "to", "I", "him", "help", "me"], correct: "I got him to help me" },
          { scrambled: ["have", "we", "the", "will", "delivered", "package"], correct: "we will have the package delivered" }
        ]
      }
    ],
    quiz: [
      { question: "'I ___ my hair cut.' — Correct form:", options: ["have", "had", "got", "All are correct"], answer: 3, explanation: "Have, had (past), and got are all correct in causative structures." },
      { question: "'I had my friend ___ me.'", options: ["help", "to help", "helped", "helping"], answer: 0, explanation: "Have + sb + V(bare infinitive)." },
      { question: "'I got my friend ___ me.'", options: ["help", "to help", "helped", "helping"], answer: 1, explanation: "Get + sb + TO + V(infinitive)." },
      { question: "'I cut my hair' nghĩa là:", options: ["Tôi nhờ thợ cắt tóc", "Tôi tự cắt tóc", "Tóc tôi bị cắt", "Tôi sẽ cắt tóc"], answer: 1, explanation: "Không có causative → tự làm." },
      { question: "Câu nào đúng?", options: ["I had repaired my car.", "I had my car repaired.", "I had my car repair.", "I had my car repairing."], answer: 1, explanation: "Causative: have + O + V3/ed." }
    ]
  },
  // ===== REPORTED SPEECH EXTRA =====
  {
    moduleId: "grammar-reported-speech",
    id: "reported-questions",
    title: "Câu hỏi tường thuật",
    titleEn: "Reported Questions",
    level: 3,
    difficulty: "intermediate",
    theory: `## Reported Questions — Câu hỏi tường thuật

### 1. Yes/No Questions
- **Trực tiếp:** "Do you like coffee?"
- **Tường thuật:** She asked (me) **if/whether** I liked coffee.
- **Cấu trúc:** S + asked + if/whether + S + V(lùi thì)

### 2. Wh-Questions
- **Trực tiếp:** "Where do you live?"
- **Tường thuật:** He asked (me) **where** I lived.
- **Cấu trúc:** S + asked + Wh-word + S + V(lùi thì)

### Lưu ý quan trọng
- Câu hỏi tường thuật = **câu khẳng định** (KHÔNG đảo ngữ)
- ❌ He asked where did I live.
- ✅ He asked where I lived.
- Đổi đại từ, trạng từ thời gian tương tự reported statements`,
    theoryEn: `## Reported Questions

### 1. Yes/No Questions
- Direct: "Do you like coffee?"
- Reported: She asked if/whether I liked coffee.

### 2. Wh-Questions
- Direct: "Where do you live?"
- Reported: He asked where I lived.

### Key Rule
- Reported questions use **statement word order** (NOT question order)
- ❌ He asked where did I live.
- ✅ He asked where I lived.`,
    proTips: [
      "Câu hỏi tường thuật KHÔNG đảo ngữ — dùng trật tự câu khẳng định",
      "Yes/No → dùng if hoặc whether",
      "Wh-questions → giữ nguyên từ hỏi, bỏ do/does/did"
    ],
    proTipsEn: [
      "Reported questions use STATEMENT order — no inversion",
      "Yes/No → use if or whether",
      "Wh-questions → keep the question word, drop do/does/did"
    ],
    vocabulary: [
      { word: "inquire", meaning: "hỏi thăm", example: "She inquired about the schedule." },
      { word: "wonder", meaning: "tự hỏi", example: "I wondered where he had gone." },
      { word: "whether", meaning: "liệu... hay không", example: "He asked whether I was coming." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Chuyển sang câu hỏi tường thuật",
        instructionEn: "Convert to reported questions",
        sentences: [
          { text: "\"Are you happy?\" → She asked me ___ I ___ happy.", textEn: "\"Are you happy?\" → She asked me ___ I ___ happy.", answer: "if was", hint: "Yes/No → if + S + V lùi thì" },
          { text: "\"Where do you work?\" → He asked me ___ I ___.", textEn: "\"Where do you work?\" → He asked me ___ I ___.", answer: "where worked", hint: "Wh + S + V lùi thì" },
          { text: "\"Have you finished?\" → She asked ___ I ___ finished.", textEn: "\"Have you finished?\" → She asked ___ I ___ finished.", answer: "if had", hint: "have → had" },
          { text: "\"What time does the train leave?\" → He asked ___ the train ___.", textEn: "\"What time does the train leave?\" → He asked ___ the train ___.", answer: "what time left", hint: "does leave → left" },
          { text: "\"Will you come tomorrow?\" → She asked ___ I ___ come the next day.", textEn: "\"Will you come tomorrow?\" → She asked ___ I ___ come the next day.", answer: "if would", hint: "will → would" },
          { text: "\"Why did you leave early?\" → He asked ___ I ___ left early.", textEn: "\"Why did you leave early?\" → He asked ___ I ___ left early.", answer: "why had", hint: "did leave → had left" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu hỏi tường thuật",
        instructionEn: "Arrange the reported question",
        items: [
          { scrambled: ["asked", "she", "if", "liked", "I", "coffee"], correct: "she asked if I liked coffee" },
          { scrambled: ["asked", "he", "where", "lived", "I"], correct: "he asked where I lived" },
          { scrambled: ["wondered", "I", "whether", "coming", "was", "he"], correct: "I wondered whether he was coming" },
          { scrambled: ["asked", "they", "what", "wanted", "I"], correct: "they asked what I wanted" }
        ]
      }
    ],
    quiz: [
      { question: "'\"Do you speak English?\" → She asked ___'", options: ["if I speak English.", "if I spoke English.", "do I speak English.", "if did I speak English."], answer: 1, explanation: "Lùi thì: speak → spoke. Trật tự câu khẳng định." },
      { question: "Which sentence is WRONG?", options: ["He asked where I lived.", "He asked where did I live.", "He asked if I was ready.", "She asked what time it was."], answer: 1, explanation: "Reported question KHÔNG đảo ngữ: 'where did I live' → sai." },
      { question: "'\"What are you doing?\" → She asked ___'", options: ["what I was doing.", "what was I doing.", "what am I doing.", "what I am doing."], answer: 0, explanation: "Lùi thì + trật tự khẳng định." },
      { question: "Yes/No question tường thuật dùng:", options: ["that", "what", "if/whether", "which"], answer: 2, explanation: "Yes/No → if hoặc whether." },
      { question: "'\"Will you help me?\" → He asked ___'", options: ["if I would help him.", "will I help him.", "if I will help him.", "would I help him."], answer: 0, explanation: "will → would, you → I, me → him." }
    ]
  },
  // ===== RELATIVE CLAUSES EXTRA =====
  {
    moduleId: "grammar-relative-clauses",
    id: "relative-prepositions",
    title: "Mệnh đề quan hệ với giới từ",
    titleEn: "Relative Clauses with Prepositions",
    level: 4,
    difficulty: "advanced",
    theory: `## Relative Clauses with Prepositions

### Cách 1: Giới từ cuối mệnh đề (informal)
- *The man **who/that** I spoke **to** is my teacher.*
- *The chair **which/that** she sat **on** was broken.*

### Cách 2: Giới từ trước đại từ quan hệ (formal)
- *The man **to whom** I spoke is my teacher.*
- *The chair **on which** she sat was broken.*

### Lưu ý
- Sau giới từ: dùng **whom** (người), **which** (vật)
- ❌ Không dùng "that" sau giới từ: ~~to that~~ → to whom/which
- ❌ Không dùng "who" sau giới từ: ~~to who~~ → to whom

### Ví dụ nâng cao
- *The topic **about which** we discussed was interesting.* (formal)
- *The topic **(that/which)** we talked **about** was interesting.* (informal)`,
    theoryEn: `## Relative Clauses with Prepositions

### Style 1: Preposition at end (informal)
- *The man **who** I spoke **to** is my teacher.*

### Style 2: Preposition before pronoun (formal)
- *The man **to whom** I spoke is my teacher.*

### Rules
- After preposition: use **whom** (people), **which** (things)
- ❌ Never use "that" after a preposition
- ❌ Never use "who" after a preposition → use "whom"`,
    proTips: [
      "Formal: preposition + whom/which. Informal: whom/which/that... preposition cuối.",
      "KHÔNG dùng 'that' sau giới từ",
      "whom = object form → dùng sau giới từ cho người"
    ],
    proTipsEn: [
      "Formal: preposition + whom/which. Informal: ...preposition at end.",
      "NEVER use 'that' after a preposition",
      "whom = object form → used after prepositions for people"
    ],
    vocabulary: [
      { word: "formal", meaning: "trang trọng", example: "The letter was written in a formal tone." },
      { word: "informal", meaning: "thân mật", example: "The conversation was informal." },
      { word: "whom", meaning: "ai (tân ngữ)", example: "To whom did you speak?" }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền đại từ quan hệ + giới từ phù hợp",
        instructionEn: "Fill in the correct relative pronoun with preposition",
        sentences: [
          { text: "The woman ___ ___ I work is very kind. (formal)", textEn: "The woman ___ ___ I work is very kind. (formal)", answer: "with whom", hint: "Giới từ + whom (formal)" },
          { text: "The hotel ___ ___ we stayed was excellent. (formal)", textEn: "The hotel ___ ___ we stayed was excellent. (formal)", answer: "in which", hint: "Giới từ + which (formal)" },
          { text: "That's the reason ___ ___ he left. (formal)", textEn: "That's the reason ___ ___ he left. (formal)", answer: "for which", hint: "for + which" },
          { text: "The pen ___ I wrote ___ is blue. (informal)", textEn: "The pen ___ I wrote ___ is blue. (informal)", answer: "that with", hint: "Informal: that... preposition cuối" },
          { text: "The person ___ ___ I sent the email didn't reply. (formal)", textEn: "The person ___ ___ I sent the email didn't reply. (formal)", answer: "to whom", hint: "to + whom" },
          { text: "The bridge ___ ___ they walked was very old. (formal)", textEn: "The bridge ___ ___ they walked was very old. (formal)", answer: "across which", hint: "across + which" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu có mệnh đề quan hệ + giới từ",
        instructionEn: "Arrange the sentence with relative clause + preposition",
        items: [
          { scrambled: ["whom", "to", "the", "spoke", "I", "man", "is", "kind"], correct: "the man to whom I spoke is kind" },
          { scrambled: ["which", "in", "stayed", "we", "the", "hotel", "was", "nice"], correct: "the hotel in which we stayed was nice" },
          { scrambled: ["the", "about", "topic", "which", "discussed", "we", "was", "important"], correct: "the topic about which we discussed was important" },
          { scrambled: ["whom", "with", "works", "she", "the", "person", "is", "friendly"], correct: "the person with whom she works is friendly" }
        ]
      }
    ],
    quiz: [
      { question: "'The man ___ I spoke is kind.' (formal)", options: ["to who", "to that", "to whom", "whom to"], answer: 2, explanation: "Formal: preposition + whom cho người." },
      { question: "Which sentence is WRONG?", options: ["The chair on which she sat.", "The chair to that she sat.", "The chair which she sat on.", "The chair that she sat on."], answer: 1, explanation: "Không dùng 'that' sau giới từ." },
      { question: "'The reason ___ he left is unclear.' (formal)", options: ["for which", "for that", "which for", "to which"], answer: 0, explanation: "for which = the reason." },
      { question: "Formal style đặt giới từ ở đâu?", options: ["Cuối mệnh đề", "Trước đại từ quan hệ", "Sau động từ", "Trước chủ ngữ"], answer: 1, explanation: "Formal: giới từ + whom/which." },
      { question: "'in which' tương đương:", options: ["that... in", "which... in", "where", "Tất cả đều đúng"], answer: 3, explanation: "in which = where = that...in = which...in." }
    ]
  },
  // ===== ARTICLES EXTRA =====
  {
    moduleId: "grammar-articles-prepositions",
    id: "articles-zero",
    title: "Zero Article & Special Cases",
    titleEn: "Zero Article & Special Cases",
    level: 3,
    difficulty: "intermediate",
    theory: `## Zero Article & Special Cases

### Zero Article (Không dùng mạo từ)
1. **Danh từ số nhiều chung chung:** *Dogs are loyal animals.*
2. **Danh từ không đếm được chung chung:** *Water is essential for life.*
3. **Tên riêng:** *Vietnam, John, Christmas*
4. **Bữa ăn:** *breakfast, lunch, dinner*
5. **Môn học/thể thao:** *Math, football, chess*
6. **Phương tiện đi lại (by + ...):** *by bus, by plane, by car*

### Special Cases
- **The + nhạc cụ:** *play the piano, the guitar*
- **The + tính từ = nhóm người:** *the rich, the poor, the elderly*
- **The + đại dương/sông/sa mạc:** *the Pacific, the Nile, the Sahara*
- **Ø + hồ/núi đơn:** *Lake Baikal, Mount Everest*
- **The + quốc gia có Republic/Kingdom/States:** *the UK, the USA, the Philippines*`,
    theoryEn: `## Zero Article & Special Cases

### Zero Article (No article)
1. Plural nouns (general): *Dogs are loyal.*
2. Uncountable nouns (general): *Water is essential.*
3. Proper nouns: *Vietnam, John*
4. Meals: *breakfast, lunch, dinner*
5. Subjects/sports: *Math, football*
6. Transport (by + ...): *by bus, by plane*

### Special Cases
- The + instruments: *play the piano*
- The + adj = group: *the rich, the poor*
- The + oceans/rivers/deserts: *the Pacific, the Nile*
- Ø + single lakes/mountains: *Lake Baikal, Mount Everest*`,
    proTips: [
      "Chung chung = không mạo từ. Cụ thể = the.",
      "By + phương tiện = KHÔNG mạo từ (by bus, by car)",
      "The + nhạc cụ: play THE piano, play THE guitar"
    ],
    proTipsEn: [
      "General = no article. Specific = the.",
      "By + transport = NO article (by bus, by car)",
      "The + instruments: play THE piano"
    ],
    vocabulary: [
      { word: "essential", meaning: "thiết yếu", example: "Sleep is essential for health." },
      { word: "in general", meaning: "nói chung", example: "In general, cats are independent." },
      { word: "specific", meaning: "cụ thể", example: "I need a specific book." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền a/an/the hoặc Ø (không mạo từ)",
        instructionEn: "Fill in a/an/the or Ø (no article)",
        sentences: [
          { text: "___ dogs are loyal animals.", textEn: "___ dogs are loyal animals.", answer: "Ø", hint: "Chung chung → không mạo từ" },
          { text: "She plays ___ piano every day.", textEn: "She plays ___ piano every day.", answer: "the", hint: "The + nhạc cụ" },
          { text: "We went to school by ___ bus.", textEn: "We went to school by ___ bus.", answer: "Ø", hint: "By + phương tiện → không mạo từ" },
          { text: "___ rich should help ___ poor.", textEn: "___ rich should help ___ poor.", answer: "The The", hint: "The + tính từ = nhóm người" },
          { text: "I visited ___ Mount Fuji last year.", textEn: "I visited ___ Mount Fuji last year.", answer: "Ø", hint: "Núi đơn → không mạo từ" },
          { text: "___ Nile is the longest river in Africa.", textEn: "___ Nile is the longest river in Africa.", answer: "The", hint: "The + sông" },
          { text: "What did you have for ___ breakfast?", textEn: "What did you have for ___ breakfast?", answer: "Ø", hint: "Bữa ăn → không mạo từ" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu",
        instructionEn: "Arrange the sentence",
        items: [
          { scrambled: ["is", "water", "essential", "for", "life"], correct: "water is essential for life" },
          { scrambled: ["plays", "she", "the", "piano", "beautifully"], correct: "she plays the piano beautifully" },
          { scrambled: ["the", "should", "help", "rich", "the", "poor"], correct: "the rich should help the poor" },
          { scrambled: ["by", "go", "I", "bus", "to", "work"], correct: "I go to work by bus" }
        ]
      }
    ],
    quiz: [
      { question: "'___ water is essential.' — Điền:", options: ["A", "An", "The", "Ø (không mạo từ)"], answer: 3, explanation: "Danh từ không đếm được, nói chung → không mạo từ." },
      { question: "'She plays ___ guitar.'", options: ["a", "an", "the", "Ø"], answer: 2, explanation: "The + nhạc cụ." },
      { question: "'We traveled by ___ train.'", options: ["a", "the", "an", "Ø"], answer: 3, explanation: "By + phương tiện → không mạo từ." },
      { question: "'___ Philippines is in Southeast Asia.'", options: ["A", "The", "An", "Ø"], answer: 1, explanation: "The + quốc gia có nhiều đảo/Republic/States." },
      { question: "Câu nào đúng?", options: ["I had the breakfast at 7.", "I had breakfast at 7.", "I had a breakfast at 7.", "I had an breakfast at 7."], answer: 1, explanation: "Bữa ăn → không mạo từ." }
    ]
  },
  // ===== ARTICLES/PREPOSITIONS EXTRA =====
  {
    moduleId: "grammar-articles-prepositions",
    id: "articles-phrasal-verbs",
    title: "Phrasal Verbs & Dependent Prepositions",
    titleEn: "Phrasal Verbs & Dependent Prepositions",
    level: 4,
    difficulty: "advanced",
    theory: `## Phrasal Verbs & Dependent Prepositions

### Phrasal Verbs phổ biến
| Phrasal Verb | Nghĩa | Ví dụ |
|-------------|-------|-------|
| look after | chăm sóc | She looks after her grandma. |
| give up | từ bỏ | Don't give up your dream! |
| turn on/off | bật/tắt | Turn off the light. |
| pick up | đón, nhặt | I'll pick you up at 5. |
| put off | hoãn lại | They put off the meeting. |
| come across | tình cờ gặp | I came across an old photo. |
| run out of | hết | We ran out of milk. |
| get along with | hòa thuận | Do you get along with your neighbors? |

### Dependent Prepositions
| Cụm từ | Giới từ | Ví dụ |
|--------|---------|-------|
| interested **in** | in | I'm interested in art. |
| afraid **of** | of | She's afraid of spiders. |
| good **at** | at | He's good at math. |
| depend **on** | on | It depends on the weather. |
| apologize **for** | for | I apologize for being late. |
| belong **to** | to | This book belongs to me. |
| succeed **in** | in | She succeeded in passing the exam. |`,
    theoryEn: `## Phrasal Verbs & Dependent Prepositions

### Common Phrasal Verbs
| Phrasal Verb | Meaning | Example |
|-------------|---------|---------|
| look after | take care of | She looks after her grandma. |
| give up | stop trying | Don't give up! |
| turn on/off | switch on/off | Turn off the light. |
| pick up | collect | I'll pick you up at 5. |

### Dependent Prepositions
- interested **in**, afraid **of**, good **at**, depend **on**, apologize **for**`,
    proTips: [
      "Phrasal verbs có thể tách được (separable) hoặc không tách (inseparable)",
      "Separable: Turn off the light = Turn the light off",
      "Inseparable: Look after ≠ Look the baby after",
      "Dependent prepositions: phải học thuộc — không có quy tắc chung"
    ],
    proTipsEn: [
      "Phrasal verbs can be separable or inseparable",
      "Separable: Turn off the light = Turn the light off",
      "Inseparable: Look after ≠ Look the baby after",
      "Dependent prepositions: must be memorized — no general rule"
    ],
    vocabulary: [
      { word: "give up", meaning: "từ bỏ", example: "Never give up on your dreams." },
      { word: "look after", meaning: "chăm sóc", example: "Can you look after my cat?" },
      { word: "come across", meaning: "tình cờ gặp", example: "I came across a rare book." },
      { word: "run out of", meaning: "hết, cạn", example: "We've run out of sugar." },
      { word: "get along with", meaning: "hòa hợp với", example: "She gets along with everyone." }
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền phrasal verb hoặc giới từ phù hợp",
        instructionEn: "Fill in the correct phrasal verb or preposition",
        sentences: [
          { text: "She's very good ___ cooking.", textEn: "She's very good ___ cooking.", answer: "at", hint: "good + ?" },
          { text: "Don't ___ ___! Keep trying.", textEn: "Don't ___ ___! Keep trying.", answer: "give up", hint: "Từ bỏ" },
          { text: "I'm interested ___ learning Japanese.", textEn: "I'm interested ___ learning Japanese.", answer: "in", hint: "interested + ?" },
          { text: "Can you ___ ___ the children while I'm out?", textEn: "Can you ___ ___ the children while I'm out?", answer: "look after", hint: "Chăm sóc" },
          { text: "It depends ___ the weather.", textEn: "It depends ___ the weather.", answer: "on", hint: "depend + ?" },
          { text: "We've ___ ___ ___ milk.", textEn: "We've ___ ___ ___ milk.", answer: "run out of", hint: "Hết, cạn" },
          { text: "I apologize ___ the delay.", textEn: "I apologize ___ the delay.", answer: "for", hint: "apologize + ?" },
          { text: "She ___ ___ an old friend at the mall.", textEn: "She ___ ___ an old friend at the mall.", answer: "came across", hint: "Tình cờ gặp" }
        ]
      },
      {
        type: "sentence-reorder" as const,
        instruction: "Sắp xếp câu có phrasal verb",
        instructionEn: "Arrange the sentence with phrasal verb",
        items: [
          { scrambled: ["up", "don't", "give", "your", "dreams", "on"], correct: "don't give up on your dreams" },
          { scrambled: ["looks", "she", "after", "her", "grandmother"], correct: "she looks after her grandmother" },
          { scrambled: ["ran", "we", "out", "of", "sugar"], correct: "we ran out of sugar" },
          { scrambled: ["along", "gets", "he", "with", "everyone"], correct: "he gets along with everyone" },
          { scrambled: ["across", "came", "I", "photo", "an", "old"], correct: "I came across an old photo" }
        ]
      }
    ],
    quiz: [
      { question: "'I'm interested ___ art.'", options: ["at", "on", "in", "for"], answer: 2, explanation: "interested IN." },
      { question: "'Don't give ___!' nghĩa là:", options: ["Đừng cho đi", "Đừng từ bỏ", "Đừng cho lại", "Đừng bỏ đi"], answer: 1, explanation: "give up = từ bỏ." },
      { question: "'look after' là phrasal verb:", options: ["Tách được (separable)", "Không tách được (inseparable)", "Cả hai đều được", "Không phải phrasal verb"], answer: 1, explanation: "look after = inseparable, không thể tách." },
      { question: "'She's afraid ___ spiders.'", options: ["at", "of", "in", "for"], answer: 1, explanation: "afraid OF." },
      { question: "'We ran ___ ___ milk.'", options: ["out of", "out in", "off of", "up of"], answer: 0, explanation: "run out of = hết." }
    ]
  }
];

// ===== 3 NEW MODULES =====
export const grammarExpansionModules: LanguageModule[] = [
  // ===== MODULE: MODALS =====
  {
    id: "grammar-modals",
    title: "Động từ khuyết thiếu",
    titleEn: "Modal Verbs",
    icon: "🔑",
    color: "from-amber-500 to-orange-500",
    description: "Can, could, may, might, must, should và cách dùng",
    descriptionEn: "Can, could, may, might, must, should and their usage",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "modals-basic",
        title: "Modal Verbs cơ bản",
        titleEn: "Basic Modal Verbs",
        level: 2,
        difficulty: "beginner",
        theory: `## Modal Verbs — Động từ khuyết thiếu cơ bản

### Đặc điểm chung
- Không chia (không thêm s/es/ed/ing)
- Theo sau bởi V(nguyên mẫu): can **go**, must **study**
- Phủ định: modal + not (can't, mustn't, shouldn't)

### Các Modal cơ bản

| Modal | Nghĩa | Ví dụ |
|-------|-------|-------|
| **can** | có thể (khả năng) | I can swim. |
| **could** | có thể (quá khứ/lịch sự) | Could you help me? |
| **may** | có thể (xin phép/khả năng) | May I come in? |
| **might** | có thể (ít chắc chắn) | It might rain. |
| **must** | phải (bắt buộc) | You must wear a seatbelt. |
| **should** | nên | You should study harder. |
| **will** | sẽ (tương lai/ý chí) | I will help you. |
| **shall** | sẽ (đề nghị, formal) | Shall we go? |`,
        theoryEn: `## Basic Modal Verbs

### Key Features
- No conjugation (no s/es/ed/ing)
- Followed by bare infinitive: can **go**, must **study**
- Negative: modal + not (can't, mustn't, shouldn't)

### Common Modals
| Modal | Meaning | Example |
|-------|---------|---------|
| can | ability | I can swim. |
| could | past ability/polite | Could you help me? |
| may | permission/possibility | May I come in? |
| might | possibility (less certain) | It might rain. |
| must | obligation | You must wear a seatbelt. |
| should | advice | You should study harder. |`,
        proTips: [
          "Can = khả năng hiện tại, Could = khả năng quá khứ hoặc lịch sự",
          "Must = bắt buộc (ngoại lực), Should = nên (lời khuyên)",
          "May vs Might: May chắc chắn hơn Might"
        ],
        proTipsEn: [
          "Can = present ability, Could = past ability or politeness",
          "Must = external obligation, Should = advice",
          "May vs Might: May is more certain than Might"
        ],
        vocabulary: [
          { word: "ability", meaning: "khả năng", example: "She has the ability to sing well." },
          { word: "obligation", meaning: "nghĩa vụ", example: "It's your obligation to follow the rules." },
          { word: "permission", meaning: "sự cho phép", example: "You need permission to enter." },
          { word: "prohibition", meaning: "sự cấm", example: "There is a prohibition on smoking here." },
          { word: "advice", meaning: "lời khuyên", example: "She gave me good advice." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền modal verb phù hợp",
            instructionEn: "Fill in the appropriate modal verb",
            sentences: [
              { text: "You ___ wear a helmet when riding a motorcycle. (bắt buộc)", textEn: "You ___ wear a helmet. (obligation)", answer: "must", hint: "Bắt buộc" },
              { text: "___ I borrow your pen? (xin phép, lịch sự)", textEn: "___ I borrow your pen? (polite request)", answer: "May", hint: "Xin phép lịch sự" },
              { text: "She ___ speak three languages. (khả năng)", textEn: "She ___ speak three languages. (ability)", answer: "can", hint: "Khả năng" },
              { text: "It ___ rain tomorrow. (không chắc chắn)", textEn: "It ___ rain tomorrow. (uncertain)", answer: "might", hint: "Ít chắc chắn" },
              { text: "You ___ eat more vegetables. (lời khuyên)", textEn: "You ___ eat more vegetables. (advice)", answer: "should", hint: "Lời khuyên" },
              { text: "___ you swim when you were 5? (khả năng quá khứ)", textEn: "___ you swim when you were 5? (past ability)", answer: "Could", hint: "Khả năng quá khứ" },
              { text: "You ___ park here. It's illegal. (cấm)", textEn: "You ___ park here. It's illegal. (prohibition)", answer: "mustn't", hint: "Cấm" },
              { text: "___ we start the meeting? (đề nghị)", textEn: "___ we start the meeting? (suggestion)", answer: "Shall", hint: "Đề nghị formal" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu với modal verb",
            instructionEn: "Arrange the sentence with modal verb",
            items: [
              { scrambled: ["can", "she", "languages", "speak", "three"], correct: "she can speak three languages" },
              { scrambled: ["must", "you", "a", "wear", "seatbelt"], correct: "you must wear a seatbelt" },
              { scrambled: ["should", "you", "harder", "study"], correct: "you should study harder" },
              { scrambled: ["might", "it", "rain", "tomorrow"], correct: "it might rain tomorrow" },
              { scrambled: ["may", "come", "I", "in"], correct: "may I come in" }
            ]
          }
        ],
        quiz: [
          { question: "'You ___ smoke here.' (cấm)", options: ["mustn't", "shouldn't", "can't", "don't have to"], answer: 0, explanation: "mustn't = cấm (prohibition)." },
          { question: "'___ you help me?' — lịch sự nhất:", options: ["Can", "Will", "Could", "Do"], answer: 2, explanation: "Could là cách hỏi lịch sự nhất." },
          { question: "Must vs Should:", options: ["Giống nhau", "Must mạnh hơn Should", "Should mạnh hơn Must", "Không liên quan"], answer: 1, explanation: "Must = bắt buộc, Should = nên (nhẹ hơn)." },
          { question: "'She ___ swim when she was 3.'", options: ["can", "could", "may", "must"], answer: 1, explanation: "Could = khả năng trong quá khứ." },
          { question: "Câu nào đúng?", options: ["She can to swim.", "She can swim.", "She can swimming.", "She cans swim."], answer: 1, explanation: "Modal + V(bare infinitive), không chia." }
        ]
      },
      {
        id: "modals-advanced",
        title: "Modal Verbs nâng cao",
        titleEn: "Advanced Modal Verbs",
        level: 4,
        difficulty: "advanced",
        theory: `## Modal Verbs nâng cao — Suy đoán & Quá khứ

### 1. Modals of Deduction (Suy đoán)
| Modal | Mức chắc chắn | Ví dụ |
|-------|---------------|-------|
| must | rất chắc (95%) | She must be at home. (Chắc hẳn cô ấy ở nhà) |
| may/might | có thể (50%) | He might be busy. (Có thể anh ấy bận) |
| can't | không thể (phủ định mạnh) | That can't be true! (Không thể đúng!) |

### 2. Modal + have + V3 (Suy đoán về quá khứ)
- **must have V3:** chắc hẳn đã... → *He must have forgotten.* (Chắc hẳn anh ấy đã quên)
- **may/might have V3:** có thể đã... → *She might have left.* (Có thể cô ấy đã đi)
- **can't have V3:** không thể đã... → *He can't have said that!* (Không thể anh ấy đã nói vậy!)
- **should have V3:** lẽ ra nên đã... → *You should have told me.* (Lẽ ra bạn nên nói)
- **needn't have V3:** không cần phải đã... → *You needn't have hurried.* (Không cần vội)

### 3. Must vs Have to
- **Must:** bắt buộc (cá nhân, nội tại) → *I must study.* (Tôi phải học — tự ý thức)
- **Have to:** bắt buộc (ngoại lực, quy định) → *I have to wear a uniform.* (Tôi phải mặc đồng phục — quy định)
- **Mustn't:** KHÔNG ĐƯỢC → *You mustn't lie.*
- **Don't have to:** KHÔNG CẦN → *You don't have to come.* (Không cần đến)`,
        theoryEn: `## Advanced Modal Verbs — Deduction & Past Modals

### 1. Modals of Deduction
| Modal | Certainty | Example |
|-------|-----------|---------|
| must | very sure (95%) | She must be at home. |
| may/might | possible (50%) | He might be busy. |
| can't | impossible (strong negative) | That can't be true! |

### 2. Modal + have + V3 (Past Deduction)
- must have V3: *He must have forgotten.*
- might have V3: *She might have left.*
- can't have V3: *He can't have said that!*
- should have V3: *You should have told me.* (regret)

### 3. Must vs Have to
- Must: internal obligation | Have to: external obligation
- Mustn't: prohibition | Don't have to: no obligation`,
        proTips: [
          "must have V3 = chắc hẳn đã... (suy đoán quá khứ, rất chắc)",
          "should have V3 = lẽ ra nên... (hối tiếc)",
          "mustn't ≠ don't have to: mustn't = CẤM, don't have to = KHÔNG CẦN"
        ],
        proTipsEn: [
          "must have V3 = surely did (past deduction, very certain)",
          "should have V3 = should have done (regret)",
          "mustn't ≠ don't have to: mustn't = FORBIDDEN, don't have to = NOT NECESSARY"
        ],
        vocabulary: [
          { word: "deduction", meaning: "suy đoán", example: "Based on the evidence, my deduction is..." },
          { word: "obligation", meaning: "nghĩa vụ", example: "You have an obligation to help." },
          { word: "prohibition", meaning: "sự cấm đoán", example: "The prohibition of smoking in public." },
          { word: "necessity", meaning: "sự cần thiết", example: "There's no necessity to rush." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền modal + have V3 hoặc modal phù hợp",
            instructionEn: "Fill in the correct modal (+ have V3)",
            sentences: [
              { text: "She's not here. She ___ ___ left early. (chắc hẳn)", textEn: "She's not here. She ___ ___ left early. (very sure)", answer: "must have", hint: "Suy đoán rất chắc" },
              { text: "You ___ ___ told me! I was worried. (lẽ ra nên)", textEn: "You ___ ___ told me! (should have)", answer: "should have", hint: "Hối tiếc" },
              { text: "He ___ ___ done it. He was with me all day. (không thể)", textEn: "He ___ ___ done it. He was with me. (impossible)", answer: "can't have", hint: "Không thể đã" },
              { text: "You ___ smoke here. It's forbidden. (cấm)", textEn: "You ___ smoke here. Forbidden. (prohibition)", answer: "mustn't", hint: "Cấm" },
              { text: "You ___ ___ ___ come. It's optional. (không cần)", textEn: "You ___ ___ ___ come. Optional. (not necessary)", answer: "don't have to", hint: "Không cần" },
              { text: "She ___ ___ forgotten. Let me call her. (có thể đã)", textEn: "She ___ ___ forgotten. (possible, past)", answer: "might have", hint: "Có thể đã" },
              { text: "He ___ be the new teacher. He looks very young. (chắc hẳn không)", textEn: "He ___ be the new teacher. He looks young. (surely not)", answer: "can't", hint: "Chắc hẳn không" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu với modal nâng cao",
            instructionEn: "Arrange the advanced modal sentence",
            items: [
              { scrambled: ["have", "must", "forgotten", "she"], correct: "she must have forgotten" },
              { scrambled: ["have", "should", "told", "you", "me"], correct: "you should have told me" },
              { scrambled: ["have", "can't", "done", "he", "it"], correct: "he can't have done it" },
              { scrambled: ["have", "to", "don't", "you", "come"], correct: "you don't have to come" },
              { scrambled: ["have", "might", "left", "they", "already"], correct: "they might have left already" }
            ]
          }
        ],
        quiz: [
          { question: "'She's not answering. She ___ be busy.'", options: ["can", "must", "should", "will"], answer: 1, explanation: "must = suy đoán rất chắc (95%)." },
          { question: "'You ___ have told me earlier!' (hối tiếc)", options: ["must", "should", "can", "might"], answer: 1, explanation: "should have V3 = lẽ ra nên." },
          { question: "'mustn't' vs 'don't have to':", options: ["Giống nhau", "mustn't = cấm, don't have to = không cần", "mustn't = không cần, don't have to = cấm", "Không liên quan"], answer: 1, explanation: "mustn't = prohibition, don't have to = not necessary." },
          { question: "'He ___ have stolen the money. He's honest.'", options: ["must", "might", "can't", "should"], answer: 2, explanation: "can't have V3 = chắc hẳn không đã." },
          { question: "'You ___ have hurried. The meeting was cancelled.'", options: ["mustn't", "needn't", "can't", "shouldn't"], answer: 1, explanation: "needn't have V3 = không cần phải đã (đã làm nhưng không cần thiết)." }
        ]
      }
    ]
  },
  // ===== MODULE: GERUNDS & INFINITIVES =====
  {
    id: "grammar-gerunds",
    title: "Danh động từ & Động từ nguyên mẫu",
    titleEn: "Gerunds & Infinitives",
    icon: "🔄",
    color: "from-teal-500 to-emerald-500",
    description: "V-ing vs To V — khi nào dùng gì?",
    descriptionEn: "V-ing vs To V — when to use which?",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "gerunds-basic",
        title: "V-ing vs To V cơ bản",
        titleEn: "Basic Gerunds vs Infinitives",
        level: 2,
        difficulty: "beginner",
        theory: `## Gerunds vs Infinitives — V-ing vs To V

### Gerund (V-ing) — Danh động từ
Dùng sau:
1. **Động từ:** enjoy, finish, avoid, mind, suggest, keep, practice, consider, deny, admit, imagine
2. **Giới từ:** interested in, good at, tired of, look forward to
3. **Làm chủ ngữ:** *Swimming is fun.*

### Infinitive (To V) — Động từ nguyên mẫu
Dùng sau:
1. **Động từ:** want, need, decide, hope, plan, promise, agree, refuse, offer, learn, expect, afford
2. **Tính từ:** happy to, easy to, difficult to, ready to
3. **Mục đích:** *I study hard **to pass** the exam.*

### Cả hai đều được (nghĩa giống nhau)
- like, love, hate, prefer, start, begin, continue
- *I like **swimming**. = I like **to swim**.*

### Cả hai đều được (nghĩa KHÁC nhau)
| Cấu trúc | Nghĩa |
|-----------|-------|
| stop V-ing | ngừng làm gì | *Stop talking!* |
| stop to V | dừng lại để làm gì | *He stopped to rest.* |
| remember V-ing | nhớ đã làm | *I remember locking the door.* |
| remember to V | nhớ phải làm | *Remember to lock the door!* |
| try V-ing | thử làm | *Try adding salt.* |
| try to V | cố gắng làm | *Try to finish on time.* |`,
        theoryEn: `## Gerunds vs Infinitives

### Gerund (V-ing)
After verbs: enjoy, finish, avoid, mind, suggest, keep, practice, consider
After prepositions: interested in, good at, tired of
As subject: *Swimming is fun.*

### Infinitive (To V)
After verbs: want, need, decide, hope, plan, promise, agree, refuse, offer
After adjectives: happy to, easy to, difficult to
Purpose: *I study hard to pass the exam.*

### Both (same meaning): like, love, hate, start, begin, continue
### Both (different meaning): stop, remember, try, forget`,
        proTips: [
          "MEGA TIP: enjoy/finish/avoid/mind → V-ing | want/need/decide/hope → to V",
          "stop V-ing = ngừng. stop to V = dừng lại để...",
          "remember V-ing = nhớ đã làm. remember to V = nhớ phải làm.",
          "'look forward to' + V-ing (KHÔNG phải to V)"
        ],
        proTipsEn: [
          "MEGA TIP: enjoy/finish/avoid/mind → V-ing | want/need/decide/hope → to V",
          "stop V-ing = stop doing. stop to V = stop in order to...",
          "remember V-ing = remember past action. remember to V = remember to do.",
          "'look forward to' + V-ing (NOT to V)"
        ],
        vocabulary: [
          { word: "avoid", meaning: "tránh", example: "Avoid eating too much sugar." },
          { word: "consider", meaning: "cân nhắc", example: "She considered moving abroad." },
          { word: "refuse", meaning: "từ chối", example: "He refused to help." },
          { word: "afford", meaning: "có khả năng chi trả", example: "I can't afford to buy a car." },
          { word: "deny", meaning: "phủ nhận", example: "He denied stealing the money." },
          { word: "offer", meaning: "đề nghị", example: "She offered to help." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền V-ing hoặc To V",
            instructionEn: "Fill in V-ing or To V",
            sentences: [
              { text: "I enjoy ___ (read) books.", textEn: "I enjoy ___ (read) books.", answer: "reading", hint: "enjoy + V-ing" },
              { text: "She decided ___ (study) abroad.", textEn: "She decided ___ (study) abroad.", answer: "to study", hint: "decide + to V" },
              { text: "He avoided ___ (answer) the question.", textEn: "He avoided ___ (answer) the question.", answer: "answering", hint: "avoid + V-ing" },
              { text: "We hope ___ (see) you soon.", textEn: "We hope ___ (see) you soon.", answer: "to see", hint: "hope + to V" },
              { text: "She keeps ___ (talk) in class.", textEn: "She keeps ___ (talk) in class.", answer: "talking", hint: "keep + V-ing" },
              { text: "I can't afford ___ (buy) a new phone.", textEn: "I can't afford ___ (buy) a new phone.", answer: "to buy", hint: "afford + to V" },
              { text: "He suggested ___ (go) to the park.", textEn: "He suggested ___ (go) to the park.", answer: "going", hint: "suggest + V-ing" },
              { text: "I'm looking forward to ___ (meet) you.", textEn: "I'm looking forward to ___ (meet) you.", answer: "meeting", hint: "look forward to + V-ing" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu",
            instructionEn: "Arrange the sentence",
            items: [
              { scrambled: ["enjoy", "I", "reading", "books"], correct: "I enjoy reading books" },
              { scrambled: ["decided", "she", "to", "study", "abroad"], correct: "she decided to study abroad" },
              { scrambled: ["avoids", "he", "eating", "junk", "food"], correct: "he avoids eating junk food" },
              { scrambled: ["forward", "looking", "am", "I", "to", "meeting", "you"], correct: "I am looking forward to meeting you" },
              { scrambled: ["promised", "they", "to", "come", "early"], correct: "they promised to come early" }
            ]
          }
        ],
        quiz: [
          { question: "'I enjoy ___ music.'", options: ["listen", "to listen", "listening", "listened"], answer: 2, explanation: "enjoy + V-ing." },
          { question: "'She decided ___ a doctor.'", options: ["becoming", "to become", "become", "became"], answer: 1, explanation: "decide + to V." },
          { question: "'Stop ___!' (ngừng nói)", options: ["to talk", "talking", "talk", "talked"], answer: 1, explanation: "stop + V-ing = ngừng làm gì." },
          { question: "'I remember ___ the door.' (nhớ đã khóa)", options: ["to lock", "locking", "lock", "locked"], answer: 1, explanation: "remember + V-ing = nhớ đã làm." },
          { question: "'look forward to' đi với:", options: ["V-ing", "To V", "V bare", "V3"], answer: 0, explanation: "'to' ở đây là giới từ → V-ing." }
        ]
      },
      {
        id: "gerunds-advanced",
        title: "Gerunds & Infinitives nâng cao",
        titleEn: "Advanced Gerunds & Infinitives",
        level: 4,
        difficulty: "advanced",
        theory: `## Gerunds & Infinitives — Nâng cao

### Verbs with different meanings
| Verb | + V-ing | + To V |
|------|---------|--------|
| **stop** | ngừng (I stopped smoking) | dừng để (I stopped to smoke) |
| **remember** | nhớ đã (I remember meeting her) | nhớ phải (Remember to call me) |
| **forget** | quên đã (I'll never forget visiting Paris) | quên phải (Don't forget to lock) |
| **try** | thử (Try pressing this button) | cố gắng (Try to be on time) |
| **regret** | tiếc đã (I regret telling her) | tiếc phải (I regret to inform you) |
| **go on** | tiếp tục cùng việc (go on talking) | chuyển sang (go on to discuss) |

### V + O + To V
- want sb to do, ask sb to do, tell sb to do, advise sb to do, allow sb to do
- *I want **you to come**.* 
- *She asked **him to help**.*

### V + O + V(bare)
- make sb do, let sb do, have sb do (causative)
- *She **made** him **clean** the room.*
- *Let me **help** you.*

### Passive: V + to be + V3
- *He wants **to be promoted**.*
- *She expects **to be invited**.*`,
        theoryEn: `## Advanced Gerunds & Infinitives

### Verbs with different meanings (V-ing vs To V)
stop, remember, forget, try, regret, go on — each has different meaning with V-ing vs To V

### V + O + To V
want/ask/tell/advise/allow sb to do

### V + O + V(bare)
make/let/have sb do

### Passive: V + to be + V3
He wants to be promoted.`,
        proTips: [
          "regret + V-ing = tiếc đã làm. regret + to V = tiếc phải (formal thông báo)",
          "make/let + O + V(bare): She made him clean (KHÔNG có 'to')",
          "Passive infinitive: to be V3 — He wants to be promoted"
        ],
        proTipsEn: [
          "regret + V-ing = regret past action. regret + to V = regret to inform (formal)",
          "make/let + O + V(bare): She made him clean (NO 'to')",
          "Passive infinitive: to be V3 — He wants to be promoted"
        ],
        vocabulary: [
          { word: "regret", meaning: "hối tiếc", example: "I regret saying that." },
          { word: "recall", meaning: "nhớ lại", example: "I don't recall meeting him." },
          { word: "permit", meaning: "cho phép", example: "They don't permit smoking here." },
          { word: "persuade", meaning: "thuyết phục", example: "She persuaded me to go." },
          { word: "urge", meaning: "thúc giục", example: "They urged us to leave." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Chọn V-ing hay To V (chú ý nghĩa)",
            instructionEn: "Choose V-ing or To V (pay attention to meaning)",
            sentences: [
              { text: "I regret ___ (tell) her the truth. She was hurt. (tiếc đã)", textEn: "I regret ___ (tell) her. She was hurt. (regret past action)", answer: "telling", hint: "regret + V-ing = tiếc đã làm" },
              { text: "I regret ___ (inform) you that you failed. (tiếc phải)", textEn: "I regret ___ (inform) you that you failed. (formal)", answer: "to inform", hint: "regret + to V = formal thông báo" },
              { text: "She made him ___ (apologize).", textEn: "She made him ___ (apologize).", answer: "apologize", hint: "make + O + V bare" },
              { text: "He forgot ___ (buy) milk. (quên phải mua)", textEn: "He forgot ___ (buy) milk. (forgot to do)", answer: "to buy", hint: "forget + to V = quên phải" },
              { text: "I'll never forget ___ (visit) Tokyo. (nhớ mãi)", textEn: "I'll never forget ___ (visit) Tokyo. (memorable)", answer: "visiting", hint: "forget + V-ing = kỷ niệm" },
              { text: "Let me ___ (help) you.", textEn: "Let me ___ (help) you.", answer: "help", hint: "let + O + V bare" },
              { text: "He wants ___ ___ ___ (promote). (passive)", textEn: "He wants ___ ___ ___ (promote). (passive)", answer: "to be promoted", hint: "Passive infinitive" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu",
            instructionEn: "Arrange the sentence",
            items: [
              { scrambled: ["made", "she", "him", "the", "clean", "room"], correct: "she made him clean the room" },
              { scrambled: ["me", "let", "you", "help"], correct: "let me help you" },
              { scrambled: ["wants", "he", "to", "be", "promoted"], correct: "he wants to be promoted" },
              { scrambled: ["told", "she", "me", "to", "wait"], correct: "she told me to wait" }
            ]
          }
        ],
        quiz: [
          { question: "'I stopped ___ a break.' (dừng lại để nghỉ)", options: ["taking", "to take", "take", "taken"], answer: 1, explanation: "stop + to V = dừng lại để làm gì." },
          { question: "'She made him ___ the dishes.'", options: ["washing", "to wash", "wash", "washed"], answer: 2, explanation: "make + O + V(bare)." },
          { question: "'I regret ___ you that the position is filled.' (formal)", options: ["telling", "to tell", "tell", "told"], answer: 1, explanation: "regret + to V = formal thông báo buồn." },
          { question: "'He wants ___ promoted.'", options: ["to be", "being", "be", "been"], answer: 0, explanation: "want + to be + V3 (passive infinitive)." },
          { question: "'I'll never forget ___ Paris.' (kỷ niệm đẹp)", options: ["to visit", "visiting", "visit", "visited"], answer: 1, explanation: "forget + V-ing = kỷ niệm, nhớ mãi." }
        ]
      }
    ]
  },
  // ===== MODULE: COMPARISONS & INVERSIONS =====
  {
    id: "grammar-comparisons",
    title: "So sánh & Đảo ngữ",
    titleEn: "Comparisons & Inversions",
    icon: "⚖️",
    color: "from-purple-500 to-pink-500",
    description: "So sánh hơn, nhất và các cấu trúc đảo ngữ",
    descriptionEn: "Comparative, superlative and inversion patterns",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "comparisons-basic",
        title: "So sánh hơn & So sánh nhất",
        titleEn: "Comparative & Superlative",
        level: 2,
        difficulty: "beginner",
        theory: `## Comparative & Superlative — So sánh

### 1. So sánh hơn (Comparative)
**Tính từ ngắn:** adj + ER + than
- *She is **taller than** me.*
- *This book is **cheaper than** that one.*

**Tính từ dài:** MORE + adj + than
- *This movie is **more interesting than** the book.*

### 2. So sánh nhất (Superlative)
**Tính từ ngắn:** THE + adj + EST
- *She is **the tallest** in the class.*

**Tính từ dài:** THE MOST + adj
- *This is **the most beautiful** place I've ever seen.*

### 3. So sánh bằng (Equal)
- **As + adj + as:** *She is **as tall as** her brother.*
- **Not as/so + adj + as:** *He is **not as smart as** his sister.*

### 4. Bất quy tắc
| Gốc | Comparative | Superlative |
|------|------------|-------------|
| good | better | the best |
| bad | worse | the worst |
| far | farther/further | the farthest/furthest |
| many/much | more | the most |
| little | less | the least |`,
        theoryEn: `## Comparative & Superlative

### Comparative: adj-ER than / MORE adj than
### Superlative: THE adj-EST / THE MOST adj
### Equal: as adj as / not as adj as
### Irregular: good→better→best, bad→worse→worst`,
        proTips: [
          "1-2 âm tiết → -er/-est. 3+ âm tiết → more/most",
          "good → better → best (BẤT QUY TẮC, phải nhớ)",
          "Double letters: big → bigger, hot → hotter",
          "farther = khoảng cách vật lý. further = thêm nữa (abstract)"
        ],
        proTipsEn: [
          "1-2 syllables → -er/-est. 3+ syllables → more/most",
          "good → better → best (IRREGULAR, must memorize)",
          "Double letters: big → bigger, hot → hotter",
          "farther = physical distance. further = additional (abstract)"
        ],
        vocabulary: [
          { word: "comparison", meaning: "sự so sánh", example: "Make a comparison between the two." },
          { word: "superior", meaning: "vượt trội", example: "This product is superior to the other." },
          { word: "inferior", meaning: "kém hơn", example: "The quality is inferior." },
          { word: "equal", meaning: "bằng, ngang", example: "All people are created equal." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Điền dạng so sánh đúng",
            instructionEn: "Fill in the correct comparative/superlative form",
            sentences: [
              { text: "She is ___ (tall) than her brother.", textEn: "She is ___ (tall) than her brother.", answer: "taller", hint: "Tính từ ngắn + er" },
              { text: "This is ___ (beautiful) place I've ever visited.", textEn: "This is ___ (beautiful) place I've ever visited.", answer: "the most beautiful", hint: "Tính từ dài → the most" },
              { text: "He runs ___ (fast) than me.", textEn: "He runs ___ (fast) than me.", answer: "faster", hint: "Tính từ ngắn + er" },
              { text: "This exam was ___ (bad) than the last one.", textEn: "This exam was ___ (bad) than the last one.", answer: "worse", hint: "bad → worse (bất quy tắc)" },
              { text: "She is ___ (good) student in the class.", textEn: "She is ___ (good) student in the class.", answer: "the best", hint: "good → best" },
              { text: "My house is ___ (not/big) ___ yours.", textEn: "My house is ___ (not/big) ___ yours.", answer: "not as big as", hint: "So sánh bằng phủ định" },
              { text: "He is ___ (intelligent) person I know.", textEn: "He is ___ (intelligent) person I know.", answer: "the most intelligent", hint: "Tính từ dài → the most" },
              { text: "This road is ___ (narrow) than that one.", textEn: "This road is ___ (narrow) than that one.", answer: "narrower", hint: "narrow → narrower" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu so sánh",
            instructionEn: "Arrange the comparative sentence",
            items: [
              { scrambled: ["taller", "she", "than", "is", "me"], correct: "she is taller than me" },
              { scrambled: ["the", "is", "this", "most", "beautiful", "place"], correct: "this is the most beautiful place" },
              { scrambled: ["as", "not", "he", "is", "tall", "as", "his", "brother"], correct: "he is not as tall as his brother" },
              { scrambled: ["better", "is", "this", "than", "that", "one"], correct: "this is better than that one" },
              { scrambled: ["the", "she", "best", "is", "student"], correct: "she is the best student" }
            ]
          }
        ],
        quiz: [
          { question: "'good' → comparative:", options: ["gooder", "more good", "better", "best"], answer: 2, explanation: "good → better (bất quy tắc)." },
          { question: "'She is ___ girl in class.'", options: ["the tallest", "the most tall", "taller", "tallest"], answer: 0, explanation: "Superlative: the + adj-est." },
          { question: "'not as...as' dùng để:", options: ["So sánh hơn", "So sánh nhất", "So sánh bằng (phủ định)", "So sánh kép"], answer: 2, explanation: "not as...as = so sánh bằng dạng phủ định." },
          { question: "'This is ___ expensive than I thought.'", options: ["more", "most", "the most", "many"], answer: 0, explanation: "expensive = tính từ dài → more...than." },
          { question: "Chọn câu ĐÚNG:", options: ["She is more taller than me.", "She is taller than me.", "She is the taller than me.", "She is taller as me."], answer: 1, explanation: "adj-er + than (KHÔNG dùng more + adj-er)." }
        ]
      },
      {
        id: "comparisons-double",
        title: "So sánh kép & So sánh bội",
        titleEn: "Double & Multiple Comparisons",
        level: 3,
        difficulty: "intermediate",
        theory: `## So sánh kép & So sánh bội

### 1. So sánh kép (Double Comparative)
- **Cấu trúc:** The + comparative, the + comparative
- **Nghĩa:** Càng... càng...
- *The harder you study, the better your results.*
- *The more expensive it is, the better the quality.*

### 2. So sánh bội (Multiple)
- **twice/three times as...as**
- *This house is **twice as expensive as** that one.*
- *He earns **three times as much as** me.*

### 3. Cấu trúc đặc biệt
- **the same as:** *My bag is **the same as** yours.*
- **similar to:** *This is **similar to** that.*
- **different from:** *English is **different from** Vietnamese.*
- **prefer A to B:** *I **prefer** tea **to** coffee.*
- **would rather V than V:** *I **would rather walk than drive**.*`,
        theoryEn: `## Double & Multiple Comparisons

### Double Comparative: The + comp, the + comp = The more...the better
### Multiple: twice/three times as...as
### Special: the same as, similar to, different from, prefer A to B, would rather V than V`,
        proTips: [
          "The + comparative, the + comparative = càng...càng...",
          "different FROM (KHÔNG phải different than/to trong BE)",
          "prefer A TO B (KHÔNG phải prefer A than B)",
          "would rather + V(bare) + than + V(bare)"
        ],
        proTipsEn: [
          "The + comparative, the + comparative = the more...the more",
          "different FROM (not different than in formal BE)",
          "prefer A TO B (not prefer A than B)",
          "would rather + V(bare) + than + V(bare)"
        ],
        vocabulary: [
          { word: "double", meaning: "gấp đôi", example: "The price has doubled." },
          { word: "triple", meaning: "gấp ba", example: "Sales have tripled." },
          { word: "similar", meaning: "tương tự", example: "The two paintings are similar." },
          { word: "identical", meaning: "giống hệt", example: "The twins look identical." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu so sánh",
            instructionEn: "Complete the comparison",
            sentences: [
              { text: "The harder you work, ___ ___ you earn.", textEn: "The harder you work, ___ ___ you earn.", answer: "the more", hint: "Càng...càng..." },
              { text: "This house is ___ ___ expensive ___ that one.", textEn: "This house is ___ ___ expensive ___ that one.", answer: "twice as as", hint: "Gấp đôi" },
              { text: "English is different ___ Vietnamese.", textEn: "English is different ___ Vietnamese.", answer: "from", hint: "different + ?" },
              { text: "I prefer tea ___ coffee.", textEn: "I prefer tea ___ coffee.", answer: "to", hint: "prefer A + ?" },
              { text: "I would rather ___ (walk) than ___ (drive).", textEn: "I would rather ___ (walk) than ___ (drive).", answer: "walk drive", hint: "would rather V than V" },
              { text: "The more you practice, ___ ___ it becomes.", textEn: "The more you practice, ___ ___ it becomes.", answer: "the easier", hint: "Càng...càng..." }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu so sánh kép",
            instructionEn: "Arrange the double comparison",
            items: [
              { scrambled: ["the", "harder", "study", "you", "the", "better", "results", "your"], correct: "the harder you study the better your results" },
              { scrambled: ["twice", "is", "this", "expensive", "as", "as", "that"], correct: "this is twice as expensive as that" },
              { scrambled: ["rather", "I", "would", "walk", "than", "drive"], correct: "I would rather walk than drive" },
              { scrambled: ["prefer", "I", "tea", "to", "coffee"], correct: "I prefer tea to coffee" }
            ]
          }
        ],
        quiz: [
          { question: "'The more you practice, ___.'", options: ["the better you get", "you get the better", "the best you get", "better you get"], answer: 0, explanation: "The + comparative, the + comparative." },
          { question: "'I prefer A ___ B.'", options: ["than", "to", "from", "as"], answer: 1, explanation: "prefer A TO B." },
          { question: "'different ___':", options: ["than", "to", "from", "as"], answer: 2, explanation: "different FROM." },
          { question: "'twice as expensive as' nghĩa là:", options: ["Đắt gấp đôi", "Rẻ gấp đôi", "Đắt nhất", "Giống nhau"], answer: 0, explanation: "twice as...as = gấp đôi." },
          { question: "'I would rather ___ than ___.'", options: ["walking / driving", "walk / drive", "to walk / to drive", "walked / drove"], answer: 1, explanation: "would rather + V bare + than + V bare." }
        ]
      },
      {
        id: "inversions",
        title: "Đảo ngữ",
        titleEn: "Inversion Patterns",
        level: 5,
        difficulty: "advanced",
        theory: `## Inversion — Đảo ngữ

### Khi nào đảo ngữ?
Đảo trợ động từ lên trước chủ ngữ để nhấn mạnh.

### 1. Phủ định đầu câu
| Cụm từ | Ví dụ |
|--------|-------|
| Never | **Never have** I seen such beauty. |
| Rarely | **Rarely does** he arrive on time. |
| Seldom | **Seldom do** they eat out. |
| Hardly...when | **Hardly had** I sat down **when** the phone rang. |
| No sooner...than | **No sooner had** she left **than** it started raining. |
| Not only...but also | **Not only does** he sing, **but** he also dances. |
| Under no circumstances | **Under no circumstances should** you open this door. |

### 2. Only + trạng từ/giới từ
- *Only then **did** I realize my mistake.*
- *Only after finishing **could** she relax.*
- *Only by working hard **can** you succeed.*

### 3. So/Such...that
- *So beautiful **was** the sunset that we stopped to watch.*
- *Such **was** his anger that he couldn't speak.*

### 4. Câu điều kiện (bỏ if)
- If I had known → **Had I known**, I would have helped.
- If she were here → **Were she here**, she would agree.
- If he should call → **Should he call**, tell him I'm busy.`,
        theoryEn: `## Inversion Patterns

### 1. Negative adverbs at the start
Never have I..., Rarely does he..., Hardly had I...when, No sooner had...than, Not only...but also

### 2. Only + adverb/preposition
Only then did I..., Only after..., Only by...

### 3. So/Such...that (formal)
So beautiful was the sunset that...

### 4. Conditional inversion (drop "if")
Had I known..., Were she here..., Should he call...`,
        proTips: [
          "Đảo ngữ = đưa trợ động từ lên TRƯỚC chủ ngữ",
          "Hardly...when / No sooner...than: mệnh đề đầu dùng Past Perfect",
          "Not only...but also: đảo ngữ ở mệnh đề đầu, mệnh đề sau bình thường",
          "Conditional: Had I = If I had, Were she = If she were, Should he = If he should"
        ],
        proTipsEn: [
          "Inversion = auxiliary verb BEFORE subject",
          "Hardly...when / No sooner...than: first clause uses Past Perfect",
          "Not only...but also: invert FIRST clause only",
          "Conditional: Had I = If I had, Were she = If she were"
        ],
        vocabulary: [
          { word: "rarely", meaning: "hiếm khi", example: "Rarely does he complain." },
          { word: "seldom", meaning: "ít khi", example: "Seldom do they eat out." },
          { word: "scarcely", meaning: "hầu như không", example: "Scarcely had I arrived when it started raining." },
          { word: "under no circumstances", meaning: "trong mọi trường hợp đều không", example: "Under no circumstances should you cheat." },
          { word: "emphasis", meaning: "sự nhấn mạnh", example: "The emphasis is on quality." }
        ],
        exercises: [
          {
            type: "fill-in-blank" as const,
            instruction: "Hoàn thành câu đảo ngữ",
            instructionEn: "Complete the inverted sentence",
            sentences: [
              { text: "Never ___ I ___ such a beautiful place. (see)", textEn: "Never ___ I ___ such a beautiful place.", answer: "have seen", hint: "Never + have + S + V3" },
              { text: "Hardly ___ she ___ down when the phone rang.", textEn: "Hardly ___ she ___ down when the phone rang.", answer: "had sat", hint: "Hardly + had + S + V3" },
              { text: "Not only ___ he sing, but he also dances.", textEn: "Not only ___ he sing, but he also dances.", answer: "does", hint: "Not only + does + S + V" },
              { text: "Only then ___ I ___ my mistake.", textEn: "Only then ___ I ___ my mistake.", answer: "did realize", hint: "Only then + did + S + V" },
              { text: "___ I known, I would have helped. (If I had known)", textEn: "___ I known, I would have helped.", answer: "Had", hint: "Bỏ if → Had + S + V3" },
              { text: "___ she here, she would agree. (If she were)", textEn: "___ she here, she would agree.", answer: "Were", hint: "Bỏ if → Were + S" },
              { text: "No sooner ___ she left ___ it started raining.", textEn: "No sooner ___ she left ___ it started raining.", answer: "had than", hint: "No sooner + had...than" }
            ]
          },
          {
            type: "sentence-reorder" as const,
            instruction: "Sắp xếp câu đảo ngữ",
            instructionEn: "Arrange the inverted sentence",
            items: [
              { scrambled: ["never", "have", "I", "seen", "such", "beauty"], correct: "never have I seen such beauty" },
              { scrambled: ["only", "then", "did", "I", "realize", "my", "mistake"], correct: "only then did I realize my mistake" },
              { scrambled: ["had", "I", "known", "I", "would", "have", "helped"], correct: "had I known I would have helped" },
              { scrambled: ["not", "only", "does", "he", "sing", "but", "he", "also", "dances"], correct: "not only does he sing but he also dances" },
              { scrambled: ["rarely", "does", "she", "arrive", "on", "time"], correct: "rarely does she arrive on time" }
            ]
          }
        ],
        quiz: [
          { question: "'Never ___ I seen such beauty.'", options: ["did", "have", "do", "was"], answer: 1, explanation: "Never + have + S + V3 (Present Perfect)." },
          { question: "'Hardly had she sat down ___ the phone rang.'", options: ["than", "when", "that", "then"], answer: 1, explanation: "Hardly...when (No sooner...than)." },
          { question: "'Had I known' = ?", options: ["If I know", "If I knew", "If I had known", "If I have known"], answer: 2, explanation: "Had I known = If I had known (Conditional 3)." },
          { question: "Đảo ngữ dùng để:", options: ["Đặt câu hỏi", "Nhấn mạnh", "Phủ định", "So sánh"], answer: 1, explanation: "Đảo ngữ = nhấn mạnh (emphasis)." },
          { question: "'Not only ___ he play guitar, but he also sings.'", options: ["do", "does", "did", "is"], answer: 1, explanation: "Not only + does + S + V (hiện tại)." }
        ]
      }
    ]
  }
];
