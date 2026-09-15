import type { LanguageLesson } from "../types";

/** Batch 1: Cleft Sentences, Participle Clauses, Linking Words. */
export const newGrammarLessonsPart1: Record<string, LanguageLesson[]> = {
  "grammar-cleft": [
    {
      id: "cleft-it-focus-practice",
      title: "It-cleft nhấn mạnh người, vật, thời gian và địa điểm",
      titleEn: "It-cleft: focusing people, things, time and place",
      level: 4,
      difficulty: "advanced",
      theory: `## It-cleft: đưa thông tin quan trọng lên trước

### 1. Quy tắc
Dùng **It + be + phần nhấn mạnh + that/who + phần còn lại** để làm nổi bật một thành phần trong câu.

### 2. Công thức
| Nhấn mạnh | Mẫu câu |
| --- | --- |
| Người | It was **my teacher** who corrected my essay. |
| Vật | It was **the deadline** that worried the whole team. |
| Thời gian | It was **in 2019** that she moved to Helsinki. |
| Địa điểm | It is **at the library** that we usually study. |

### 3. Khi nào dùng
- Khi muốn sửa lại một thông tin bị hiểu sai.
- Khi muốn nêu bật nguyên nhân thật sự trong bài viết học thuật.
- Khi muốn tạo nhịp mạnh cho câu mở đầu đoạn.

### 4. Câu mẫu
- *It was the rain that ruined our plan.* (Chính cơn mưa đã làm hỏng kế hoạch.)
- *It is teamwork that makes the difference.* (Chính tinh thần đồng đội tạo nên khác biệt.)

### 5. Lỗi thường gặp
- Sai: *It was because of he.* Đúng: *It was because of him that we left early.*
- Sai: *It were my parents who helped me.* Đúng: *It was my parents who helped me.*

### 6. So sánh nhanh
It-cleft nhấn mạnh **một cụm cụ thể**, còn What-cleft nhấn mạnh **toàn bộ nội dung sự việc**.`,
      theoryEn: `## It-cleft: putting the key information first

### 1. Rule
Use **It + be + focus + that/who + the rest of the clause** to spotlight one part of a sentence.

### 2. Form
| Focus | Model |
| --- | --- |
| Person | It was **my teacher** who corrected my essay. |
| Thing | It was **the deadline** that worried the whole team. |
| Time | It was **in 2019** that she moved to Helsinki. |
| Place | It is **at the library** that we usually study. |

### 3. When to use
- To correct information the listener has misunderstood.
- To highlight the real cause in academic writing.
- To open a paragraph with a strong, controlled rhythm.

### 4. Model sentences
- It was the rain that ruined our plan.
- It is teamwork that makes the difference.
- It was only last night that he told me the truth.

### 5. Common mistakes
- Wrong: It was because of he. Right: It was because of him that we left early. Why: a preposition needs an object pronoun.
- Wrong: It were my parents who helped me. Right: It was my parents who helped me. Why: the verb agrees with the dummy subject it.

### 6. Contrast box
It-cleft highlights **one specific phrase**, while a What-cleft highlights **the whole idea** of the clause.`,
      proTips: [
        "Luôn giữ It + was/is, không đổi theo số nhiều của phần nhấn mạnh.",
        "Dùng who cho người, that cho vật, thời gian và địa điểm.",
        "Không nhấn mạnh động từ chính bằng It-cleft, hãy dùng What-cleft.",
      ],
      proTipsEn: [
        "Keep It + was/is fixed; it never agrees with the focused phrase.",
        "Use who for people and that for things, time and place.",
        "Never focus a main verb with an It-cleft; use a What-cleft instead.",
      ],
      vocabulary: [
        { word: "focus", ipa: "/ˈfəʊkəs/", meaning: "phần được nhấn mạnh", meaningEn: "the emphasised part of a sentence", example: "The focus of this cleft is the time phrase.", exampleEn: "The focus of this cleft is the time phrase.", partOfSpeech: "noun" },
        { word: "deadline", ipa: "/ˈdedlaɪn/", meaning: "thời hạn cuối", meaningEn: "the final time limit", example: "It was the deadline that pushed us to finish.", exampleEn: "It was the deadline that pushed us to finish.", partOfSpeech: "noun" },
        { word: "highlight", ipa: "/ˈhaɪlaɪt/", meaning: "làm nổi bật", meaningEn: "to make something stand out", example: "Cleft sentences highlight one key idea.", exampleEn: "Cleft sentences highlight one key idea.", partOfSpeech: "verb" },
        { word: "misunderstanding", ipa: "/ˌmɪsʌndəˈstændɪŋ/", meaning: "sự hiểu sai", meaningEn: "a wrong interpretation", example: "A cleft can clear up a misunderstanding quickly.", exampleEn: "A cleft can clear up a misunderstanding quickly.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Hoàn thành câu chẻ It-cleft.",
          instructionEn: "Complete each It-cleft sentence.",
          sentences: [
            { text: "It was my sister ___ paid for the tickets.", textEn: "It was my sister ___ paid for the tickets.", answer: "who" },
            { text: "It ___ the noise that kept the baby awake.", textEn: "It ___ the noise that kept the baby awake.", answer: "was" },
            { text: "It is in Turku ___ my cousin studies engineering.", textEn: "It is in Turku ___ my cousin studies engineering.", answer: "that" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi trong câu chẻ.",
          instructionEn: "Correct the mistake in each cleft sentence.",
          items: [
            { wrong: "It were the students who complained about the timetable.", correct: "It was the students who complained about the timetable.", explanation: "The verb stays singular after the dummy subject it." },
            { wrong: "It was yesterday when I sent the application.", correct: "It was yesterday that I sent the application.", explanation: "Time focus in an It-cleft takes that, not when." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng It-cleft, nhấn mạnh phần in trong gợi ý.",
          instructionEn: "Rewrite each sentence as an It-cleft, focusing the cue.",
          items: [
            { prompt: "My uncle repaired the roof.", target: "It was my uncle who repaired the roof.", cue: "my uncle" },
            { prompt: "We met at the train station.", target: "It was at the train station that we met.", cue: "at the train station" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối phần nhấn mạnh với từ nối đúng.",
          instructionEn: "Match each focused phrase with the correct linker.",
          pairs: [
            { left: "It was my mentor", right: "who reviewed my draft" },
            { left: "It was the storm", right: "that delayed the flight" },
            { left: "It is on Sundays", right: "that the market opens early" },
          ],
        },
      ],
      quiz: [
        { question: "It ___ my neighbour who found my lost keys.", options: ["were", "was", "are", "be"], answer: 1, explanation: "The verb after the dummy subject it stays singular: was." },
        { question: "It was the price ___ shocked every customer.", options: ["who", "that", "whom", "what"], answer: 1, explanation: "Use that when the focus is a thing." },
        { question: "It was in Da Nang ___ they opened the first branch.", options: ["when", "which", "that", "where"], answer: 2, explanation: "Place focus in an It-cleft is followed by that." },
        { question: "Which sentence emphasises the time correctly?", options: ["It was last week that he resigned.", "It was last week when he resigned.", "It is last week that he resigned.", "It were last week that he resigned."], answer: 0, explanation: "Past time focus uses was plus that." },
        { question: "It was ___ who encouraged me to apply.", options: ["she", "her", "hers", "herself"], answer: 0, explanation: "A subject pronoun is standard before who in formal writing." },
        { question: "Choose the correct cleft for focusing my laptop.", options: ["It was my laptop that broke down.", "It was my laptop who broke down.", "It were my laptop that broke down.", "It is my laptop broke down."], answer: 0, explanation: "A thing takes that, and the verb is was." },
        { question: "It was because of the traffic ___ we arrived late.", options: ["what", "that", "who", "when"], answer: 1, explanation: "A reason phrase is followed by that." },
        { question: "Which cleft sentence is grammatical?", options: ["It was he told me the news.", "It was he who told me the news.", "It was him who tell me the news.", "It were he who told me the news."], answer: 1, explanation: "Keep who plus a past verb after the focused person." },
        { question: "It is ___ students that the scholarship supports.", options: ["talent", "talented", "talents", "talently"], answer: 1, explanation: "An adjective is needed before the noun students." },
        { question: "What does an It-cleft mainly do?", options: ["It shortens a clause.", "It emphasises one part of the sentence.", "It changes tense.", "It adds a question tag."], answer: 1, explanation: "The structure exists to spotlight one element." },
      ],
    },
    {
      id: "cleft-what-all-writing",
      title: "What-cleft và All-cleft trong bài viết",
      titleEn: "What-cleft and All-cleft in writing",
      level: 5,
      difficulty: "advanced",
      theory: `## What-cleft và All-cleft

### 1. Quy tắc
**What + S + V + be + phần nhấn mạnh** dùng để nhấn mạnh sự việc hoặc mong muốn. **All + S + V + be + phần nhấn mạnh** nhấn mạnh tính duy nhất.

### 2. Công thức
| Mẫu | Ví dụ |
| --- | --- |
| What-cleft | What surprised me was his calm reaction. |
| What + need | What we need is a clear timetable. |
| All-cleft | All I want is a quiet weekend. |

### 3. Khi nào dùng
- Mở đoạn thân bài trong IELTS Writing Task 2 để nêu ý chính.
- Nhấn mạnh giải pháp sau khi mô tả vấn đề.
- Diễn đạt mong muốn duy nhất trong văn nói tự nhiên.

### 4. Câu mẫu
- *What the city needs is better public transport.* (Điều thành phố cần là giao thông công cộng tốt hơn.)
- *All the team asked for was more time.* (Tất cả những gì cả nhóm xin là thêm thời gian.)

### 5. Lỗi thường gặp
- Sai: *What I need are a new phone.* Đúng: *What I need is a new phone.*
- Sai: *All what I want is rest.* Đúng: *All I want is rest.*

### 6. So sánh nhanh
What-cleft mở rộng ý, All-cleft thu hẹp ý về một điều duy nhất.`,
      theoryEn: `## What-cleft and All-cleft

### 1. Rule
Use **What + S + V + be + focus** to emphasise an event or a need, and **All + S + V + be + focus** to stress that nothing else matters.

### 2. Form
| Pattern | Example |
| --- | --- |
| What-cleft | What surprised me was his calm reaction. |
| What plus need | What we need is a clear timetable. |
| All-cleft | All I want is a quiet weekend. |

### 3. When to use
- To open a body paragraph and state the main idea.
- To stress the solution after describing a problem.
- To express one single wish in natural speech.

### 4. Model sentences
- What the city needs is better public transport.
- All the team asked for was more time.
- What impressed the examiner was her clear structure.

### 5. Common mistakes
- Wrong: What I need are a new phone. Right: What I need is a new phone. Why: the What-clause counts as singular.
- Wrong: All what I want is rest. Right: All I want is rest. Why: All already works as the subject.

### 6. Contrast box
A What-cleft opens the idea out, while an All-cleft narrows it down to one thing only.`,
      proTips: [
        "Mệnh đề What luôn đi với động từ số ít is hoặc was.",
        "Không viết All what, chỉ viết All + S + V.",
        "Dùng What-cleft để mở đoạn, tránh lặp cấu trúc trong cùng đoạn.",
      ],
      proTipsEn: [
        "A What-clause always takes the singular verb is or was.",
        "Never write All what; use All plus subject and verb.",
        "Use a What-cleft to open a paragraph, and avoid repeating it in the same paragraph.",
      ],
      vocabulary: [
        { word: "emphasis", ipa: "/ˈemfəsɪs/", meaning: "sự nhấn mạnh", meaningEn: "special importance given to something", example: "The writer puts emphasis on the solution.", exampleEn: "The writer puts emphasis on the solution.", partOfSpeech: "noun" },
        { word: "solution", ipa: "/səˈluːʃn/", meaning: "giải pháp", meaningEn: "a way of solving a problem", example: "What the report suggests is a practical solution.", exampleEn: "What the report suggests is a practical solution.", partOfSpeech: "noun" },
        { word: "priority", ipa: "/praɪˈɒrəti/", meaning: "điều ưu tiên", meaningEn: "something more important than others", example: "All the manager wants is a clear priority list.", exampleEn: "All the manager wants is a clear priority list.", partOfSpeech: "noun" },
        { word: "reaction", ipa: "/riˈækʃn/", meaning: "phản ứng", meaningEn: "the way somebody responds", example: "What surprised us was her calm reaction.", exampleEn: "What surprised us was her calm reaction.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền từ đúng vào câu What-cleft hoặc All-cleft.",
          instructionEn: "Complete each What-cleft or All-cleft sentence.",
          sentences: [
            { text: "___ the students want is clearer feedback.", textEn: "___ the students want is clearer feedback.", answer: "What" },
            { text: "All I asked for ___ a short break.", textEn: "All I asked for ___ a short break.", answer: "was" },
            { text: "What worries the residents ___ the rising rent.", textEn: "What worries the residents ___ the rising rent.", answer: "is" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi trong câu nhấn mạnh.",
          instructionEn: "Correct the mistake in each emphatic sentence.",
          items: [
            { wrong: "All what the driver needed was a map.", correct: "All the driver needed was a map.", explanation: "All is already the subject, so what is unnecessary." },
            { wrong: "What the workers demand are safer equipment.", correct: "What the workers demand is safer equipment.", explanation: "The What-clause takes a singular verb." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng cấu trúc trong gợi ý.",
          instructionEn: "Rewrite each sentence using the cue structure.",
          items: [
            { prompt: "The village needs a new bridge.", target: "What the village needs is a new bridge.", cue: "What" },
            { prompt: "I only want your honest opinion.", target: "All I want is your honest opinion.", cue: "All" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối nửa câu bên trái với nửa câu bên phải.",
          instructionEn: "Match each sentence opening with its ending.",
          pairs: [
            { left: "What the report recommends", right: "is stricter recycling rules" },
            { left: "All the parents expected", right: "was an honest explanation" },
            { left: "What annoyed the audience", right: "was the constant noise" },
          ],
        },
      ],
      quiz: [
        { question: "What the country needs ___ long-term investment.", options: ["are", "is", "were", "be"], answer: 1, explanation: "A What-clause is treated as singular." },
        { question: "___ I remember is his kind smile.", options: ["All that what", "All what", "All", "All which"], answer: 2, explanation: "All alone introduces the clause." },
        { question: "Which sentence is correct?", options: ["What impressed me were her notes.", "What impressed me was her notes.", "What impressed me are her notes.", "What impressed me being her notes."], answer: 1, explanation: "Keep the singular verb was after the What-clause." },
        { question: "All the class wanted ___ a short revision session.", options: ["was", "were", "are", "have"], answer: 0, explanation: "All plus a singular idea takes was." },
        { question: "Choose the natural academic opening.", options: ["What governments should do is invest in education.", "What should governments do is invest in education.", "What governments should do are invest in education.", "What do governments should is invest in education."], answer: 0, explanation: "Statement word order plus a singular verb is required." },
        { question: "What the patient described ___ a sharp pain.", options: ["was", "were", "are", "did"], answer: 0, explanation: "The clause is singular, so was fits." },
        { question: "Which one uses an All-cleft correctly?", options: ["All he did was apologise.", "All he did was apologised.", "All what he did was apologise.", "All he did were apologise."], answer: 0, explanation: "After All plus do, the bare infinitive follows was." },
        { question: "What makes this essay strong ___ its clear structure.", options: ["is", "are", "were", "being"], answer: 0, explanation: "The subject is a singular What-clause." },
        { question: "A What-cleft is most useful for ___.", options: ["adding a question tag", "stating the main idea with emphasis", "shortening a relative clause", "reporting speech"], answer: 1, explanation: "It foregrounds the writer's main point." },
        { question: "All the volunteers received ___ a certificate.", options: ["was", "were", "is", "are"], answer: 0, explanation: "All-cleft keeps was before the single focused item." },
      ],
    },
  ],
  "grammar-participle": [
    {
      id: "participle-present-reduction",
      title: "Rút gọn mệnh đề bằng phân từ hiện tại",
      titleEn: "Reducing clauses with present participles",
      level: 4,
      difficulty: "advanced",
      theory: `## Rút gọn mệnh đề với phân từ hiện tại

### 1. Quy tắc
Khi hai mệnh đề cùng chủ ngữ và mệnh đề phụ mang nghĩa chủ động, bỏ chủ ngữ và đổi động từ sang dạng **V-ing**.

### 2. Công thức
| Câu đầy đủ | Câu rút gọn |
| --- | --- |
| Because she felt tired, she went home. | Feeling tired, she went home. |
| While he waited for the bus, he read a book. | Waiting for the bus, he read a book. |
| As the price rises, demand falls. | Rising in price, the product loses buyers. |

### 3. Khi nào dùng
- Diễn tả nguyên nhân hoặc thời gian một cách ngắn gọn.
- Viết câu mở đoạn linh hoạt trong IELTS Writing.
- Tránh lặp lại chủ ngữ nhiều lần.

### 4. Câu mẫu
- *Living abroad, students learn to manage money.* (Sống ở nước ngoài, sinh viên học cách quản lý tiền.)
- *Working part time, she still finished the course.* (Vừa làm thêm, cô ấy vẫn hoàn thành khóa học.)

### 5. Lỗi thường gặp
- Sai: *Walking home, the rain started.* Đúng: *Walking home, I felt the rain start.*
- Sai: *Being tired, the film was boring.* Đúng: *Being tired, I found the film boring.*

### 6. So sánh nhanh
Phân từ hiện tại mang nghĩa **chủ động**, phân từ quá khứ mang nghĩa **bị động**.`,
      theoryEn: `## Reducing clauses with present participles

### 1. Rule
When two clauses share the same subject and the subordinate clause is active, delete the subject and change the verb to **V-ing**.

### 2. Form
| Full clause | Reduced clause |
| --- | --- |
| Because she felt tired, she went home. | Feeling tired, she went home. |
| While he waited for the bus, he read a book. | Waiting for the bus, he read a book. |
| Since it stands near the river, the house floods. | Standing near the river, the house floods. |

### 3. When to use
- To express cause or time economically.
- To vary paragraph openings in academic writing.
- To avoid repeating the same subject twice.

### 4. Model sentences
- Living abroad, students learn to manage money.
- Working part time, she still finished the course.
- Not knowing the answer, he asked for help.

### 5. Common mistakes
- Wrong: Walking home, the rain started. Right: Walking home, I felt the rain start. Why: the participle must describe the main subject.
- Wrong: Being tired, the film was boring. Right: Being tired, I found the film boring. Why: a film cannot be tired.

### 6. Contrast box
A present participle carries an **active** meaning, while a past participle carries a **passive** one.`,
      proTips: [
        "Kiểm tra chủ ngữ chính có thực hiện hành động V-ing hay không.",
        "Đặt Not trước V-ing để tạo nghĩa phủ định.",
        "Giữ dấu phẩy sau cụm phân từ mở đầu câu.",
      ],
      proTipsEn: [
        "Check that the main subject really performs the V-ing action.",
        "Put Not before the V-ing form to make it negative.",
        "Keep the comma after an opening participle phrase.",
      ],
      vocabulary: [
        { word: "reduce", ipa: "/rɪˈdjuːs/", meaning: "rút gọn", meaningEn: "to make shorter or smaller", example: "You can reduce the clause to a participle phrase.", exampleEn: "You can reduce the clause to a participle phrase.", partOfSpeech: "verb" },
        { word: "simultaneous", ipa: "/ˌsɪmlˈteɪniəs/", meaning: "xảy ra đồng thời", meaningEn: "happening at the same time", example: "The participle shows simultaneous actions.", exampleEn: "The participle shows simultaneous actions.", partOfSpeech: "adjective" },
        { word: "dangling", ipa: "/ˈdæŋɡlɪŋ/", meaning: "lơ lửng, sai chủ ngữ", meaningEn: "left without a logical subject", example: "Avoid a dangling participle in formal writing.", exampleEn: "Avoid a dangling participle in formal writing.", partOfSpeech: "adjective" },
        { word: "concise", ipa: "/kənˈsaɪs/", meaning: "ngắn gọn, súc tích", meaningEn: "short and clear", example: "Participle clauses keep sentences concise.", exampleEn: "Participle clauses keep sentences concise.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền dạng phân từ hiện tại đúng.",
          instructionEn: "Complete each sentence with the correct present participle.",
          sentences: [
            { text: "___ near the airport, the family hears planes all day.", textEn: "___ near the airport, the family hears planes all day.", answer: "Living" },
            { text: "___ what to say, the candidate paused for a moment.", textEn: "___ what to say, the candidate paused for a moment.", answer: "Not knowing" },
            { text: "___ hard all winter, the farmers finally rested.", textEn: "___ hard all winter, the farmers finally rested.", answer: "Working" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi chủ ngữ lơ lửng.",
          instructionEn: "Fix the dangling participle in each sentence.",
          items: [
            { wrong: "Running to the station, my bag fell open.", correct: "Running to the station, I felt my bag fall open.", explanation: "The participle must describe the main subject." },
            { wrong: "Reading the report, the mistakes were obvious to me.", correct: "Reading the report, I found the mistakes obvious.", explanation: "Mistakes cannot read the report." },
          ],
        },
        {
          type: "transformation",
          instruction: "Rút gọn mệnh đề bằng phân từ hiện tại.",
          instructionEn: "Reduce each clause using a present participle.",
          items: [
            { prompt: "Because he lacked experience, he asked a mentor for help.", target: "Lacking experience, he asked a mentor for help.", cue: "Lacking" },
            { prompt: "While she travelled around Asia, she kept a diary.", target: "Travelling around Asia, she kept a diary.", cue: "Travelling" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cụm phân từ với mệnh đề chính hợp lý.",
          instructionEn: "Match each participle phrase with a logical main clause.",
          pairs: [
            { left: "Feeling nervous", right: "the speaker took a deep breath" },
            { left: "Having no umbrella", right: "we waited under the roof" },
            { left: "Standing on the hill", right: "the tower can be seen for miles" },
          ],
        },
      ],
      quiz: [
        { question: "___ in a small town, she knows every neighbour.", options: ["Grow up", "Growing up", "Grown up", "To grow up"], answer: 1, explanation: "An active reduced clause uses V-ing." },
        { question: "Which sentence has no dangling participle?", options: ["Opening the door, a cold wind hit me.", "Opening the door, I felt a cold wind.", "Opening the door, the wind was cold.", "Opening the door, cold wind blew inside."], answer: 1, explanation: "Only I can open the door." },
        { question: "___ the answer, the student stayed silent.", options: ["Not knowing", "Not know", "No knowing", "Don't knowing"], answer: 0, explanation: "Negation goes before the participle." },
        { question: "Because they lived far away, they moved closer. Which reduction is right?", options: ["Living far away, they moved closer.", "Lived far away, they moved closer.", "To live far away, they moved closer.", "Live far away, they moved closer."], answer: 0, explanation: "Active clause reduces to V-ing." },
        { question: "___ the results, the team celebrated all evening.", options: ["Seeing", "Seen", "To see", "See"], answer: 0, explanation: "The team performs the action, so use V-ing." },
        { question: "What punctuation follows an opening participle phrase?", options: ["a colon", "a comma", "a semicolon", "no punctuation"], answer: 1, explanation: "A comma separates it from the main clause." },
        { question: "___ every weekend, he improved his speaking quickly.", options: ["Practising", "Practised", "Practise", "To practise"], answer: 0, explanation: "The subject actively practises." },
        { question: "Choose the concise version of While I waited, I checked my notes.", options: ["Waiting, I checked my notes.", "Waited, I checked my notes.", "Wait, I checked my notes.", "To wait, I checked my notes."], answer: 0, explanation: "Simultaneous active action becomes V-ing." },
        { question: "A present participle clause mainly expresses ___.", options: ["a passive result", "an active cause or time", "a future plan", "a polite request"], answer: 1, explanation: "It compresses reason or time in the active voice." },
        { question: "___ on a hill, the school enjoys a wide view.", options: ["Standing", "Stood", "Stand", "To stand"], answer: 0, explanation: "The school stands there, so the meaning is active." },
      ],
    },
    {
      id: "participle-past-perfect-forms",
      title: "Phân từ quá khứ và phân từ hoàn thành",
      titleEn: "Past participles and perfect participles",
      level: 5,
      difficulty: "advanced",
      theory: `## Phân từ quá khứ và phân từ hoàn thành

### 1. Quy tắc
Dùng **V3/V-ed** khi mệnh đề mang nghĩa bị động, và **Having + V3** khi hành động xảy ra trước hành động chính.

### 2. Công thức
| Ý nghĩa | Mẫu câu |
| --- | --- |
| Bị động | Built in 1890, the bridge still carries traffic. |
| Hoàn thành chủ động | Having finished the test, she left the room. |
| Hoàn thành bị động | Having been warned, they drove slowly. |

### 3. Khi nào dùng
- Nêu thông tin nền về nguồn gốc hoặc điều kiện của sự vật.
- Sắp xếp thứ tự thời gian rõ ràng trong đoạn văn.
- Rút gọn câu bị động dài để câu gọn hơn.

### 4. Câu mẫu
- *Written in simple English, the guide helps beginners.* (Được viết bằng tiếng Anh đơn giản, cuốn sách giúp người mới học.)
- *Having lost his passport, he went to the embassy.* (Sau khi mất hộ chiếu, anh ấy đến đại sứ quán.)

### 5. Lỗi thường gặp
- Sai: *Having finished, the report was sent by me.* Đúng: *Having finished the report, I sent it.*
- Sai: *Build in 1890, the bridge is old.* Đúng: *Built in 1890, the bridge is old.*

### 6. So sánh nhanh
V-ing = chủ động cùng lúc; V3 = bị động; Having + V3 = xảy ra trước.`,
      theoryEn: `## Past participles and perfect participles

### 1. Rule
Use **V3 or V-ed** when the reduced clause is passive, and **Having + V3** when the action happens before the main action.

### 2. Form
| Meaning | Model |
| --- | --- |
| Passive | Built in 1890, the bridge still carries traffic. |
| Perfect active | Having finished the test, she left the room. |
| Perfect passive | Having been warned, they drove slowly. |

### 3. When to use
- To give background about the origin or condition of a thing.
- To order events clearly inside a paragraph.
- To shorten long passive clauses.

### 4. Model sentences
- Written in simple English, the guide helps beginners.
- Having lost his passport, he went to the embassy.
- Having been repaired, the machine works perfectly again.

### 5. Common mistakes
- Wrong: Having finished, the report was sent by me. Right: Having finished the report, I sent it. Why: the participle needs the same subject as the main clause.
- Wrong: Build in 1890, the bridge is old. Right: Built in 1890, the bridge is old. Why: passive meaning needs the third form.

### 6. Contrast box
V-ing marks a simultaneous active action, V3 marks a passive one, and Having plus V3 marks an earlier action.`,
      proTips: [
        "Nếu chủ ngữ nhận hành động, chọn V3 thay vì V-ing.",
        "Having + V3 luôn nhấn mạnh hành động xảy ra trước.",
        "Dùng Having been + V3 cho nghĩa bị động hoàn thành.",
      ],
      proTipsEn: [
        "If the subject receives the action, choose V3 instead of V-ing.",
        "Having plus V3 always marks the earlier action.",
        "Use Having been plus V3 for a completed passive meaning.",
      ],
      vocabulary: [
        { word: "background", ipa: "/ˈbækɡraʊnd/", meaning: "thông tin nền", meaningEn: "supporting information", example: "The participle adds background about the building.", exampleEn: "The participle adds background about the building.", partOfSpeech: "noun" },
        { word: "sequence", ipa: "/ˈsiːkwəns/", meaning: "trình tự", meaningEn: "the order of events", example: "Having plus V3 clarifies the sequence.", exampleEn: "Having plus V3 clarifies the sequence.", partOfSpeech: "noun" },
        { word: "restore", ipa: "/rɪˈstɔː/", meaning: "phục hồi, tu sửa", meaningEn: "to bring something back to good condition", example: "Restored last year, the theatre looks new.", exampleEn: "Restored last year, the theatre looks new.", partOfSpeech: "verb" },
        { word: "warn", ipa: "/wɔːn/", meaning: "cảnh báo", meaningEn: "to tell somebody about a danger", example: "Having been warned, the driver slowed down.", exampleEn: "Having been warned, the driver slowed down.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền dạng phân từ đúng.",
          instructionEn: "Complete each sentence with the correct participle form.",
          sentences: [
            { text: "___ in 1902, the museum keeps its original doors.", textEn: "___ in 1902, the museum keeps its original doors.", answer: "Built" },
            { text: "___ the dishes, my brother started his homework.", textEn: "___ the dishes, my brother started his homework.", answer: "Having washed" },
            { text: "___ by heavy rain, the match was postponed.", textEn: "___ by heavy rain, the match was postponed.", answer: "Interrupted" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi dạng phân từ.",
          instructionEn: "Correct the participle form in each sentence.",
          items: [
            { wrong: "Publish last month, the novel sold out quickly.", correct: "Published last month, the novel sold out quickly.", explanation: "Passive meaning needs the third form of the verb." },
            { wrong: "Having warned about the storm, the hikers turned back.", correct: "Having been warned about the storm, the hikers turned back.", explanation: "The hikers received the warning, so the passive form is required." },
          ],
        },
        {
          type: "transformation",
          instruction: "Rút gọn câu bằng phân từ quá khứ hoặc phân từ hoàn thành.",
          instructionEn: "Reduce each sentence with a past or perfect participle.",
          items: [
            { prompt: "After she had signed the contract, she felt relieved.", target: "Having signed the contract, she felt relieved.", cue: "Having" },
            { prompt: "The letter was written in French, so few staff understood it.", target: "Written in French, the letter confused most staff.", cue: "Written" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối dạng phân từ với ý nghĩa của nó.",
          instructionEn: "Match each participle form with its meaning.",
          pairs: [
            { left: "Repairing the roof", right: "active action at the same time" },
            { left: "Repaired last week", right: "passive background information" },
            { left: "Having repaired the roof", right: "action completed before the main verb" },
          ],
        },
      ],
      quiz: [
        { question: "___ in 1975, the factory closed ten years later.", options: ["Opening", "Opened", "Having open", "Open"], answer: 1, explanation: "Passive background uses the past participle." },
        { question: "___ his keys, he could not enter the flat.", options: ["Having lost", "Having losing", "Losing had", "Have lost"], answer: 0, explanation: "Having plus V3 shows the earlier action." },
        { question: "___ by the coach, the players trained harder.", options: ["Encouraging", "Encouraged", "Encourage", "To encourage"], answer: 1, explanation: "The players received the encouragement." },
        { question: "Which sentence is passive and complete?", options: ["Damaged in the flood, the shop reopened in May.", "Damaging in the flood, the shop reopened in May.", "Having damage in the flood, the shop reopened.", "Damage in the flood, the shop reopened."], answer: 0, explanation: "The shop was damaged, so V3 fits." },
        { question: "___ been told the rules, the visitors waited quietly.", options: ["Have", "Having", "Has", "Had been"], answer: 1, explanation: "Having been plus V3 is the perfect passive participle." },
        { question: "Which form shows an action that happened first?", options: ["Reading the email", "Read the email", "Having read the email", "To read the email"], answer: 2, explanation: "Having plus V3 marks the earlier event." },
        { question: "___ carefully, the instructions are easy to follow.", options: ["Writing", "Written", "Having write", "Write"], answer: 1, explanation: "Instructions are written by somebody, so the meaning is passive." },
        { question: "Having finished the exam, ___.", options: ["the papers were collected", "she went for lunch", "it was lunch time", "there was relief"], answer: 1, explanation: "The subject of the participle and main clause must match." },
        { question: "___ in three languages, the sign helps every tourist.", options: ["Printed", "Printing", "Print", "To print"], answer: 0, explanation: "The sign receives the printing." },
        { question: "Having been repaired, the lift ___ again.", options: ["works", "working", "to work", "worked being"], answer: 0, explanation: "The main clause needs a finite verb." },
      ],
    },
  ],
  "grammar-linking-words": [
    {
      id: "linking-contrast-concession",
      title: "Liên từ đối lập và nhượng bộ",
      titleEn: "Linkers of contrast and concession",
      level: 3,
      difficulty: "intermediate",
      theory: `## Liên từ đối lập và nhượng bộ

### 1. Quy tắc
Mỗi từ nối có vị trí ngữ pháp riêng: **although** đi với mệnh đề, **despite** đi với danh từ hoặc V-ing, **however** đứng đầu câu mới.

### 2. Công thức
| Từ nối | Theo sau là | Ví dụ |
| --- | --- | --- |
| although, though | S + V | Although it rained, we walked home. |
| despite, in spite of | noun / V-ing | Despite the rain, we walked home. |
| however, nevertheless | câu mới | It rained. However, we walked home. |
| whereas, while | mệnh đề so sánh | Cities are noisy, whereas villages are quiet. |

### 3. Khi nào dùng
- Nêu hai mặt của một vấn đề trong bài luận.
- Thừa nhận ý kiến trái chiều rồi bảo vệ quan điểm.
- So sánh hai nhóm dữ liệu trong Writing Task 1.

### 4. Câu mẫu
- *Despite the high price, the course attracts many learners.* (Dù học phí cao, khóa học vẫn hút nhiều người học.)
- *Online classes save time; however, they reduce interaction.* (Học trực tuyến tiết kiệm thời gian, tuy nhiên lại giảm tương tác.)

### 5. Lỗi thường gặp
- Sai: *Despite it was late, we kept working.* Đúng: *Although it was late, we kept working.*
- Sai: *Although the traffic, we arrived on time.* Đúng: *Despite the traffic, we arrived on time.*

### 6. So sánh nhanh
Although + mệnh đề, Despite + danh từ, However + câu độc lập.`,
      theoryEn: `## Linkers of contrast and concession

### 1. Rule
Each linker has its own grammar: **although** takes a clause, **despite** takes a noun or V-ing, and **however** opens a new sentence.

### 2. Form
| Linker | Followed by | Example |
| --- | --- | --- |
| although, though | subject plus verb | Although it rained, we walked home. |
| despite, in spite of | noun or V-ing | Despite the rain, we walked home. |
| however, nevertheless | a new sentence | It rained. However, we walked home. |
| whereas, while | a contrasting clause | Cities are noisy, whereas villages are quiet. |

### 3. When to use
- To present both sides of an argument in an essay.
- To concede an opposing view before defending your own.
- To compare two data groups in a report.

### 4. Model sentences
- Despite the high price, the course attracts many learners.
- Online classes save time; however, they reduce interaction.
- While rural areas lost residents, urban areas grew steadily.

### 5. Common mistakes
- Wrong: Despite it was late, we kept working. Right: Although it was late, we kept working. Why: despite cannot take a clause.
- Wrong: Although the traffic, we arrived on time. Right: Despite the traffic, we arrived on time. Why: although needs a subject and verb.

### 6. Contrast box
Although takes a clause, despite takes a noun phrase, and however introduces an independent sentence.`,
      proTips: [
        "Thêm the fact that sau despite nếu muốn dùng mệnh đề: despite the fact that it rained.",
        "Đặt dấu phẩy sau however khi mở đầu câu.",
        "Whereas dùng để so sánh, không dùng để nhượng bộ.",
      ],
      proTipsEn: [
        "Add the fact that after despite if you need a clause: despite the fact that it rained.",
        "Put a comma after however when it opens a sentence.",
        "Use whereas for comparison, not for concession.",
      ],
      vocabulary: [
        { word: "concession", ipa: "/kənˈseʃn/", meaning: "sự nhượng bộ", meaningEn: "accepting part of an opposing idea", example: "Although introduces a concession.", exampleEn: "Although introduces a concession.", partOfSpeech: "noun" },
        { word: "contrast", ipa: "/ˈkɒntrɑːst/", meaning: "sự đối lập", meaningEn: "a clear difference", example: "Whereas signals a contrast between two groups.", exampleEn: "Whereas signals a contrast between two groups.", partOfSpeech: "noun" },
        { word: "nevertheless", ipa: "/ˌnevəðəˈles/", meaning: "tuy vậy", meaningEn: "in spite of that", example: "The plan is costly; nevertheless, it works.", exampleEn: "The plan is costly; nevertheless, it works.", partOfSpeech: "adverb" },
        { word: "interaction", ipa: "/ˌɪntərˈækʃn/", meaning: "sự tương tác", meaningEn: "communication between people", example: "Online lessons limit real interaction.", exampleEn: "Online lessons limit real interaction.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Chọn từ nối đúng cho mỗi câu.",
          instructionEn: "Complete each sentence with the correct linker.",
          sentences: [
            { text: "___ the cold weather, the market stayed busy.", textEn: "___ the cold weather, the market stayed busy.", answer: "Despite" },
            { text: "___ the tickets were expensive, the concert sold out.", textEn: "___ the tickets were expensive, the concert sold out.", answer: "Although" },
            { text: "The app is free; ___, it shows many adverts.", textEn: "The app is free; ___, it shows many adverts.", answer: "however" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi dùng từ nối.",
          instructionEn: "Correct the linker in each sentence.",
          items: [
            { wrong: "Despite he practised daily, his score stayed the same.", correct: "Although he practised daily, his score stayed the same.", explanation: "Despite cannot be followed by a clause." },
            { wrong: "Although the heavy snow, the buses ran normally.", correct: "Despite the heavy snow, the buses ran normally.", explanation: "Although needs a subject and a verb." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng từ nối trong gợi ý.",
          instructionEn: "Rewrite each sentence with the cue linker.",
          items: [
            { prompt: "Although the road was narrow, the driver stayed calm.", target: "Despite the narrow road, the driver stayed calm.", cue: "Despite" },
            { prompt: "Despite her busy schedule, she joined the club.", target: "Although her schedule was busy, she joined the club.", cue: "Although" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối từ nối với cấu trúc theo sau.",
          instructionEn: "Match each linker with the structure that follows it.",
          pairs: [
            { left: "although", right: "a full clause with subject and verb" },
            { left: "in spite of", right: "a noun phrase or V-ing form" },
            { left: "nevertheless", right: "a new independent sentence" },
            { left: "whereas", right: "a clause that compares two groups" },
          ],
        },
      ],
      quiz: [
        { question: "___ the long queue, the visitors waited patiently.", options: ["Although", "Despite", "However", "Whereas"], answer: 1, explanation: "A noun phrase follows despite." },
        { question: "___ the machine was old, it still worked well.", options: ["Despite", "In spite of", "Although", "Nevertheless"], answer: 2, explanation: "A clause follows although." },
        { question: "Sales fell in March; ___, profits stayed stable.", options: ["although", "despite", "however", "whereas"], answer: 2, explanation: "However opens a new sentence after a semicolon." },
        { question: "Which sentence is correct?", options: ["Despite of the noise, she slept.", "Despite the noise, she slept.", "Despite she heard noise, she slept.", "Despite that noise she slept."], answer: 1, explanation: "Despite takes a noun phrase with no of." },
        { question: "Urban areas expanded, ___ rural areas shrank.", options: ["whereas", "despite", "although of", "moreover"], answer: 0, explanation: "Whereas compares two contrasting facts." },
        { question: "___ the fact that fees rose, enrolment increased.", options: ["Although", "Despite", "However", "Whereas"], answer: 1, explanation: "Despite the fact that allows a clause." },
        { question: "Choose the correct punctuation.", options: ["However the plan failed.", "However, the plan failed.", "However; the plan failed.", "However the plan, failed."], answer: 1, explanation: "A comma follows however at the start of a sentence." },
        { question: "___ working overtime, he missed the deadline.", options: ["Although", "Despite", "However", "While he"], answer: 1, explanation: "Despite can be followed by a V-ing form." },
        { question: "Which linker concedes an opposing view?", options: ["moreover", "therefore", "although", "in addition"], answer: 2, explanation: "Although introduces a concession." },
        { question: "The design is simple; nevertheless, it ___ very effective.", options: ["is", "being", "to be", "been"], answer: 0, explanation: "The second clause needs a finite verb." },
      ],
    },
    {
      id: "linking-speaking-fillers",
      title: "Cụm chuyển ý tự nhiên khi nói",
      titleEn: "Natural discourse markers for speaking",
      level: 2,
      difficulty: "intermediate",
      theory: `## Cụm chuyển ý khi nói

### 1. Quy tắc
Trong hội thoại, từ nối giúp người nghe theo dõi ý và cho người nói thời gian suy nghĩ, nhưng phải dùng vừa đủ.

### 2. Công thức
| Chức năng | Cụm thường dùng |
| --- | --- |
| Mở đầu ý kiến | To be honest, Personally speaking |
| Thêm ý | On top of that, What is more |
| Nêu ví dụ | For instance, Take my school as an example |
| Chuyển hướng | Having said that, Then again |
| Kết luận | All in all, So overall |

### 3. Khi nào dùng
- Trong IELTS Speaking Part 2 để nối các ý dài.
- Khi cần thời gian suy nghĩ mà vẫn giữ nhịp nói.
- Khi muốn nhấn mạnh quan điểm cá nhân.

### 4. Câu mẫu
- *To be honest, I rarely watch television these days.* (Thật ra, gần đây tôi ít xem tivi.)
- *Having said that, weekend films are still fun.* (Tuy vậy, phim cuối tuần vẫn thú vị.)

### 5. Lỗi thường gặp
- Sai: *In addition of that, I like reading.* Đúng: *On top of that, I like reading.*
- Sai: Lặp lại and then quá nhiều lần trong một câu trả lời.

### 6. So sánh nhanh
Cụm nói tự nhiên như On top of that thuộc văn nói; Moreover và Furthermore thuộc văn viết học thuật.`,
      theoryEn: `## Discourse markers for speaking

### 1. Rule
In conversation, markers help the listener follow your ideas and give you thinking time, but they must be used in moderation.

### 2. Form
| Function | Common phrases |
| --- | --- |
| Opening an opinion | To be honest, Personally speaking |
| Adding a point | On top of that, What is more |
| Giving an example | For instance, Take my school as an example |
| Shifting direction | Having said that, Then again |
| Concluding | All in all, So overall |

### 3. When to use
- In a long speaking turn to connect several ideas.
- When you need thinking time but want to keep your rhythm.
- When you want to signal a personal viewpoint.

### 4. Model sentences
- To be honest, I rarely watch television these days.
- Having said that, weekend films are still fun.
- All in all, I would recommend the course to beginners.

### 5. Common mistakes
- Wrong: In addition of that, I like reading. Right: On top of that, I like reading. Why: in addition takes to, not of.
- Wrong: Repeating and then in every sentence of one answer. Right: Vary markers so speech sounds natural.

### 6. Contrast box
Spoken markers such as On top of that sound natural in conversation, whereas Moreover and Furthermore belong to academic writing.`,
      proTips: [
        "Chọn 5 cụm quen tay và luyện thật thuộc thay vì nhớ 20 cụm.",
        "Không dùng Firstly, Secondly liên tục trong phần nói tự do.",
        "Đặt cụm chuyển ý ở đầu câu và ngừng nhẹ sau đó.",
      ],
      proTipsEn: [
        "Master five reliable markers instead of memorising twenty.",
        "Avoid Firstly and Secondly in every free speaking answer.",
        "Place the marker at the start of the sentence and pause briefly after it.",
      ],
      vocabulary: [
        { word: "marker", ipa: "/ˈmɑːkə/", meaning: "cụm chuyển ý", meaningEn: "a phrase that signals the next idea", example: "A clear marker helps the examiner follow you.", exampleEn: "A clear marker helps the examiner follow you.", partOfSpeech: "noun" },
        { word: "fluency", ipa: "/ˈfluːənsi/", meaning: "sự lưu loát", meaningEn: "the ability to speak smoothly", example: "Good markers support fluency.", exampleEn: "Good markers support fluency.", partOfSpeech: "noun" },
        { word: "honestly", ipa: "/ˈɒnɪstli/", meaning: "thật lòng mà nói", meaningEn: "in a truthful way", example: "Honestly, I prefer travelling by train.", exampleEn: "Honestly, I prefer travelling by train.", partOfSpeech: "adverb" },
        { word: "overall", ipa: "/ˌəʊvərˈɔːl/", meaning: "nhìn chung", meaningEn: "considering everything", example: "Overall, the trip was worth the cost.", exampleEn: "Overall, the trip was worth the cost.", partOfSpeech: "adverb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền cụm chuyển ý phù hợp.",
          instructionEn: "Complete each answer with a suitable marker.",
          sentences: [
            { text: "___ honest, I have never tried winter swimming.", textEn: "___ honest, I have never tried winter swimming.", answer: "To be" },
            { text: "The city is lively. ___ top of that, rent is still reasonable.", textEn: "The city is lively. ___ top of that, rent is still reasonable.", answer: "On" },
            { text: "___ in all, I would choose the evening class.", textEn: "___ in all, I would choose the evening class.", answer: "All" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa cách dùng cụm chuyển ý.",
          instructionEn: "Correct the discourse marker in each answer.",
          items: [
            { wrong: "In addition of that, my brother plays badminton.", correct: "In addition to that, my brother plays badminton.", explanation: "In addition is followed by to." },
            { wrong: "Have said that, I still enjoy team sports.", correct: "Having said that, I still enjoy team sports.", explanation: "The fixed phrase begins with Having." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu nói tự nhiên hơn bằng cụm gợi ý.",
          instructionEn: "Rewrite each answer using the cue marker.",
          items: [
            { prompt: "I like cooking. I also enjoy baking bread.", target: "I like cooking. On top of that, I enjoy baking bread.", cue: "On top of that" },
            { prompt: "The film was slow. It had beautiful music though.", target: "The film was slow. Having said that, the music was beautiful.", cue: "Having said that" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cụm chuyển ý với chức năng của nó.",
          instructionEn: "Match each marker with its function.",
          pairs: [
            { left: "To be honest", right: "introducing a personal opinion" },
            { left: "For instance", right: "giving a specific example" },
            { left: "Then again", right: "shifting to the other side" },
            { left: "All in all", right: "summing up an answer" },
          ],
        },
      ],
      quiz: [
        { question: "___ honest, I prefer quiet cafes.", options: ["To be", "For being", "By be", "In be"], answer: 0, explanation: "The fixed phrase is To be honest." },
        { question: "Which marker adds an extra point in speech?", options: ["Then again", "On top of that", "All in all", "For instance"], answer: 1, explanation: "On top of that introduces an additional idea." },
        { question: "___ said that, the price is still high for students.", options: ["Have", "Having", "Has", "Had"], answer: 1, explanation: "Having said that is a fixed phrase." },
        { question: "Which phrase best introduces an example?", options: ["For instance", "Nevertheless", "All in all", "To be honest"], answer: 0, explanation: "For instance signals an example." },
        { question: "In addition ___ that, the club offers free lessons.", options: ["of", "to", "for", "with"], answer: 1, explanation: "In addition is followed by to." },
        { question: "Which marker sums up a long answer?", options: ["Overall", "For example", "Then again", "Personally speaking"], answer: 0, explanation: "Overall signals a conclusion." },
        { question: "Which is most natural in a spoken answer?", options: ["Moreover, my sister studies design.", "On top of that, my sister studies design.", "Furthermore my sister studies design.", "Additionally of that, my sister studies design."], answer: 1, explanation: "On top of that suits conversation." },
        { question: "___ again, working from home saves travel time.", options: ["Then", "That", "There", "Though"], answer: 0, explanation: "Then again shifts to another viewpoint." },
        { question: "How many markers should one short answer contain?", options: ["as many as possible", "one or two well placed", "none at all", "only formal written ones"], answer: 1, explanation: "Too many markers sound unnatural." },
        { question: "Personally ___, I would choose the earlier flight.", options: ["speaking", "speak", "spoken", "to speak"], answer: 0, explanation: "The fixed phrase is Personally speaking." },
      ],
    },
  ],
};
