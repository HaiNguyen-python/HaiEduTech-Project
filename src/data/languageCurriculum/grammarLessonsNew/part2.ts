import type { LanguageLesson } from "../types";

/** Batch 2: Noun Clauses, Gerunds, Advanced Articles, Subject-Verb Agreement, Inversion. */
export const newGrammarLessonsPart2: Record<string, LanguageLesson[]> = {
  "grammar-noun-clauses": [
    {
      id: "noun-clause-that-whether",
      title: "Mệnh đề danh ngữ với that, whether và if",
      titleEn: "Noun clauses with that, whether and if",
      level: 3,
      difficulty: "intermediate",
      theory: `## Mệnh đề danh ngữ với that, whether, if

### 1. Quy tắc
Mệnh đề danh ngữ đóng vai trò như một danh từ: làm chủ ngữ, tân ngữ hoặc bổ ngữ.

### 2. Công thức
| Vai trò | Ví dụ |
| --- | --- |
| Tân ngữ | I believe **that the plan will work**. |
| Chủ ngữ | **That she passed the exam** surprised nobody. |
| Bổ ngữ | The problem is **that we have no budget**. |
| Câu hỏi gián tiếp | I wonder **whether the shop is open**. |

### 3. Khi nào dùng
- Trình bày quan điểm trong bài luận.
- Diễn đạt sự không chắc chắn bằng whether hoặc if.
- Tránh câu ngắn rời rạc khi nói.

### 4. Câu mẫu
- *It is clear that traffic has increased.* (Rõ ràng là giao thông đã tăng.)
- *Nobody knows whether the policy will change.* (Không ai biết chính sách có đổi hay không.)

### 5. Lỗi thường gặp
- Sai: *I asked whether does he agree.* Đúng: *I asked whether he agreed.*
- Sai: *Whether or not the rain, we will go.* Đúng: *Whether or not it rains, we will go.*

### 6. So sánh nhanh
That giới thiệu thông tin chắc chắn; whether và if giới thiệu hai khả năng.`,
      theoryEn: `## Noun clauses with that, whether and if

### 1. Rule
A noun clause works like a noun: it can be a subject, an object or a complement.

### 2. Form
| Role | Example |
| --- | --- |
| Object | I believe **that the plan will work**. |
| Subject | **That she passed the exam** surprised nobody. |
| Complement | The problem is **that we have no budget**. |
| Indirect question | I wonder **whether the shop is open**. |

### 3. When to use
- To present a viewpoint in an essay.
- To express uncertainty with whether or if.
- To avoid a series of short disconnected sentences.

### 4. Model sentences
- It is clear that traffic has increased.
- Nobody knows whether the policy will change.
- What matters is that the data are reliable.

### 5. Common mistakes
- Wrong: I asked whether does he agree. Right: I asked whether he agreed. Why: an indirect question keeps statement word order.
- Wrong: Whether or not the rain, we will go. Right: Whether or not it rains, we will go. Why: the clause needs a subject and verb.

### 6. Contrast box
That introduces certain information, while whether and if introduce two possibilities.`,
      proTips: [
        "Có thể bỏ that sau các động từ think, believe, say trong văn nói.",
        "Dùng whether, không dùng if, khi mệnh đề đi sau giới từ.",
        "Mệnh đề danh ngữ luôn giữ trật tự chủ ngữ trước động từ.",
      ],
      proTipsEn: [
        "You can drop that after think, believe and say in speech.",
        "Use whether, not if, after a preposition.",
        "A noun clause keeps statement word order at all times.",
      ],
      vocabulary: [
        { word: "clause", ipa: "/klɔːz/", meaning: "mệnh đề", meaningEn: "a group of words with a subject and verb", example: "This clause acts as the object.", exampleEn: "This clause acts as the object.", partOfSpeech: "noun" },
        { word: "uncertainty", ipa: "/ʌnˈsɜːtnti/", meaning: "sự không chắc chắn", meaningEn: "a lack of certainty", example: "Whether shows uncertainty.", exampleEn: "Whether shows uncertainty.", partOfSpeech: "noun" },
        { word: "reliable", ipa: "/rɪˈlaɪəbl/", meaning: "đáng tin cậy", meaningEn: "able to be trusted", example: "What matters is that the data are reliable.", exampleEn: "What matters is that the data are reliable.", partOfSpeech: "adjective" },
        { word: "policy", ipa: "/ˈpɒləsi/", meaning: "chính sách", meaningEn: "an official plan of action", example: "Nobody knows whether the policy will change.", exampleEn: "Nobody knows whether the policy will change.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền that, whether hoặc if.",
          instructionEn: "Complete each sentence with that, whether or if.",
          sentences: [
            { text: "The teacher explained ___ the deadline had moved.", textEn: "The teacher explained ___ the deadline had moved.", answer: "that" },
            { text: "We are not sure ___ the museum opens on Mondays.", textEn: "We are not sure ___ the museum opens on Mondays.", answer: "whether" },
            { text: "___ the results are accurate matters most.", textEn: "___ the results are accurate matters most.", answer: "Whether" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi trong mệnh đề danh ngữ.",
          instructionEn: "Correct the noun clause in each sentence.",
          items: [
            { wrong: "She asked whether was the office closed.", correct: "She asked whether the office was closed.", explanation: "Indirect questions keep statement word order." },
            { wrong: "We discussed about if the plan could work.", correct: "We discussed whether the plan could work.", explanation: "Discuss takes no preposition, and whether follows it." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu bằng mệnh đề danh ngữ.",
          instructionEn: "Rewrite each sentence with a noun clause.",
          items: [
            { prompt: "Is the library open? I want to know.", target: "I want to know whether the library is open.", cue: "whether" },
            { prompt: "The report is late. This annoys the manager.", target: "That the report is late annoys the manager.", cue: "That" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối mệnh đề với vai trò ngữ pháp.",
          instructionEn: "Match each clause with its grammatical role.",
          pairs: [
            { left: "that the price rose", right: "object of the verb admit" },
            { left: "whether he will join", right: "indirect question after ask" },
            { left: "that honesty matters", right: "subject of the sentence" },
          ],
        },
      ],
      quiz: [
        { question: "I doubt ___ the shop delivers on Sundays.", options: ["that", "what", "which", "who"], answer: 0, explanation: "That introduces the reported information." },
        { question: "We depend on ___ the weather stays dry.", options: ["if", "whether", "that", "what"], answer: 1, explanation: "After a preposition, use whether." },
        { question: "Which sentence is correct?", options: ["He asked whether I was busy.", "He asked whether was I busy.", "He asked whether do I busy.", "He asked whether am I busy."], answer: 0, explanation: "Statement order is required in an indirect question." },
        { question: "___ she resigned shocked her colleagues.", options: ["That", "What if", "Whether or", "If that"], answer: 0, explanation: "A That-clause can be the subject." },
        { question: "The truth is ___ nobody checked the figures.", options: ["that", "what", "whether", "which"], answer: 0, explanation: "A That-clause works as complement after be." },
        { question: "Nobody can predict ___ prices will fall.", options: ["that if", "whether", "what that", "which if"], answer: 1, explanation: "Whether expresses two possibilities." },
        { question: "Choose the natural spoken sentence.", options: ["I think the film starts at eight.", "I think that starts the film at eight.", "I think whether the film starts at eight.", "I think if starts the film at eight."], answer: 0, explanation: "That is often dropped after think." },
        { question: "It is obvious ___ the system needs an update.", options: ["that", "whether", "what", "if"], answer: 0, explanation: "It is obvious introduces certain information." },
        { question: "She wondered ___ to accept the offer.", options: ["that", "whether", "which that", "if that"], answer: 1, explanation: "Whether can be followed by an infinitive." },
        { question: "A noun clause can act as ___.", options: ["only an adverb", "subject, object or complement", "only a question tag", "only a preposition"], answer: 1, explanation: "It fills any noun position." },
      ],
    },
    {
      id: "noun-clause-wh-questions",
      title: "Mệnh đề danh ngữ với từ hỏi wh-",
      titleEn: "Noun clauses with wh-words",
      level: 4,
      difficulty: "advanced",
      theory: `## Mệnh đề danh ngữ với từ hỏi

### 1. Quy tắc
Sau các động từ như know, explain, understand, mệnh đề bắt đầu bằng **what, why, how, where, when, who** giữ trật tự **S + V**, không đảo ngữ.

### 2. Công thức
| Câu hỏi trực tiếp | Mệnh đề danh ngữ |
| --- | --- |
| Where does she live? | I do not know **where she lives**. |
| Why did they leave? | He explained **why they left**. |
| How much does it cost? | Tell me **how much it costs**. |

### 3. Khi nào dùng
- Hỏi lịch sự trong tình huống trang trọng.
- Viết câu chủ đề dạng phân tích trong bài luận.
- Tường thuật câu hỏi của người khác.

### 4. Câu mẫu
- *Researchers examine how cities manage waste.* (Nhà nghiên cứu xem xét cách các thành phố xử lý rác.)
- *Could you tell me when the train arrives?* (Bạn cho tôi biết tàu đến khi nào nhé?)

### 5. Lỗi thường gặp
- Sai: *I do not know where does he work.* Đúng: *I do not know where he works.*
- Sai: *Tell me what is your name?* Đúng: *Tell me what your name is.*

### 6. So sánh nhanh
Câu hỏi trực tiếp cần trợ động từ đảo lên trước; mệnh đề danh ngữ thì không.`,
      theoryEn: `## Noun clauses with wh-words

### 1. Rule
After verbs such as know, explain and understand, a clause beginning with **what, why, how, where, when or who** keeps **subject plus verb** order with no inversion.

### 2. Form
| Direct question | Noun clause |
| --- | --- |
| Where does she live? | I do not know **where she lives**. |
| Why did they leave? | He explained **why they left**. |
| How much does it cost? | Tell me **how much it costs**. |

### 3. When to use
- To ask politely in a formal situation.
- To write analytical topic sentences.
- To report somebody else's question.

### 4. Model sentences
- Researchers examine how cities manage waste.
- Could you tell me when the train arrives?
- Nobody explained why the fee increased.

### 5. Common mistakes
- Wrong: I do not know where does he work. Right: I do not know where he works. Why: no auxiliary inversion inside a noun clause.
- Wrong: Tell me what is your name? Right: Tell me what your name is. Why: the embedded clause is not a direct question.

### 6. Contrast box
A direct question inverts the auxiliary, but an embedded wh-clause does not.`,
      proTips: [
        "Bỏ do, does, did khi chuyển câu hỏi thành mệnh đề danh ngữ.",
        "Câu bắt đầu bằng Could you tell me kết thúc bằng dấu hỏi.",
        "Giữ thì lùi một bậc khi tường thuật trong quá khứ.",
      ],
      proTipsEn: [
        "Delete do, does and did when you embed a question.",
        "A request beginning with Could you tell me still ends with a question mark.",
        "Shift the tense back one step when reporting in the past.",
      ],
      vocabulary: [
        { word: "embedded", ipa: "/ɪmˈbedɪd/", meaning: "được lồng vào", meaningEn: "placed inside a larger structure", example: "An embedded question needs statement order.", exampleEn: "An embedded question needs statement order.", partOfSpeech: "adjective" },
        { word: "inversion", ipa: "/ɪnˈvɜːʃn/", meaning: "sự đảo ngữ", meaningEn: "putting the auxiliary before the subject", example: "Noun clauses avoid inversion.", exampleEn: "Noun clauses avoid inversion.", partOfSpeech: "noun" },
        { word: "examine", ipa: "/ɪɡˈzæmɪn/", meaning: "xem xét kỹ", meaningEn: "to look at closely", example: "The study examines how families save money.", exampleEn: "The study examines how families save money.", partOfSpeech: "verb" },
        { word: "polite", ipa: "/pəˈlaɪt/", meaning: "lịch sự", meaningEn: "showing good manners", example: "Embedded questions sound more polite.", exampleEn: "Embedded questions sound more polite.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Hoàn thành mệnh đề danh ngữ.",
          instructionEn: "Complete each embedded clause.",
          sentences: [
            { text: "Could you tell me where the bus stop ___?", textEn: "Could you tell me where the bus stop ___?", answer: "is" },
            { text: "I have no idea why the class ___ cancelled.", textEn: "I have no idea why the class ___ cancelled.", answer: "was" },
            { text: "The guide explained how the machine ___.", textEn: "The guide explained how the machine ___.", answer: "works" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi đảo ngữ trong mệnh đề.",
          instructionEn: "Fix the inversion error in each sentence.",
          items: [
            { wrong: "Do you know when does the museum close?", correct: "Do you know when the museum closes?", explanation: "The embedded clause takes statement order." },
            { wrong: "She asked me where did I buy the ticket.", correct: "She asked me where I had bought the ticket.", explanation: "Remove did and shift the tense back." },
          ],
        },
        {
          type: "transformation",
          instruction: "Chuyển câu hỏi thành mệnh đề danh ngữ.",
          instructionEn: "Turn each direct question into an embedded clause.",
          items: [
            { prompt: "How long does the course last?", target: "Could you tell me how long the course lasts?", cue: "Could you tell me" },
            { prompt: "Why did the price rise?", target: "Nobody explained why the price rose.", cue: "Nobody explained" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối câu hỏi với mệnh đề tương ứng.",
          instructionEn: "Match each question with its embedded version.",
          pairs: [
            { left: "Where is the exit?", right: "I wonder where the exit is" },
            { left: "Who wrote this note?", right: "Nobody knows who wrote this note" },
            { left: "When will they reply?", right: "She asked when they would reply" },
          ],
        },
      ],
      quiz: [
        { question: "I do not know where ___.", options: ["does she live", "she lives", "lives she", "she does live in"], answer: 1, explanation: "Embedded clauses keep statement order." },
        { question: "Could you tell me how much this coat ___?", options: ["cost", "costs", "does cost", "costing"], answer: 1, explanation: "The verb agrees with the singular subject." },
        { question: "He explained why the meeting ___ postponed.", options: ["was", "were", "did", "is being"], answer: 0, explanation: "Past reporting requires was." },
        { question: "Which sentence is correct?", options: ["Tell me what your address is.", "Tell me what is your address.", "Tell me what does your address.", "Tell me what your address does be."], answer: 0, explanation: "No inversion inside the clause." },
        { question: "Nobody understands how the system ___ so fast.", options: ["did fail", "failed", "does failed", "was fail"], answer: 1, explanation: "A simple past verb fits the clause." },
        { question: "She wondered who ___ the parcel.", options: ["had sent", "did send", "was send", "sending"], answer: 0, explanation: "Past perfect reports an earlier action." },
        { question: "Do you remember where ___ the keys?", options: ["did you put", "you put", "put you", "you did put them"], answer: 1, explanation: "Delete did in the embedded clause." },
        { question: "The report shows how families ___ their income.", options: ["spend", "spends", "spending", "to spend"], answer: 0, explanation: "Plural subject takes the base form." },
        { question: "Which question form is polite and correct?", options: ["Could you tell me when the shop opens?", "Could you tell me when does the shop open?", "Could you tell me when open the shop?", "Could you tell me when the shop open?"], answer: 0, explanation: "Statement order plus correct agreement." },
        { question: "An embedded wh-clause never uses ___.", options: ["a subject", "auxiliary inversion", "a main verb", "a wh-word"], answer: 1, explanation: "Inversion belongs to direct questions only." },
      ],
    },
  ],
  "grammar-gerunds": [
    {
      id: "gerund-preposition-patterns",
      title: "V-ing sau giới từ và cụm động từ cố định",
      titleEn: "V-ing after prepositions and fixed phrases",
      level: 3,
      difficulty: "intermediate",
      theory: `## V-ing sau giới từ

### 1. Quy tắc
Sau mọi giới từ, động từ phải ở dạng **V-ing**, kể cả trong cụm cố định như be good at, look forward to.

### 2. Công thức
| Cụm | Ví dụ |
| --- | --- |
| be good at | She is good at **solving** puzzles. |
| look forward to | We look forward to **hearing** from you. |
| instead of | He walked instead of **taking** a taxi. |
| succeed in | They succeeded in **cutting** costs. |
| be used to | I am used to **waking** up early. |

### 3. Khi nào dùng
- Viết email trang trọng với look forward to.
- Nói về sở thích và khả năng cá nhân.
- Diễn tả sự lựa chọn với instead of.

### 4. Câu mẫu
- *Thank you for helping me with the form.* (Cảm ơn vì đã giúp tôi điền đơn.)
- *She apologised for arriving late.* (Cô ấy xin lỗi vì đến muộn.)

### 5. Lỗi thường gặp
- Sai: *I look forward to hear from you.* Đúng: *I look forward to hearing from you.*
- Sai: *He is interested in learn Finnish.* Đúng: *He is interested in learning Finnish.*

### 6. So sánh nhanh
To trong look forward to là giới từ nên đi với V-ing; to trong want to là dấu hiệu nguyên mẫu.`,
      theoryEn: `## V-ing after prepositions

### 1. Rule
After any preposition, the verb takes the **V-ing** form, including in fixed phrases such as be good at and look forward to.

### 2. Form
| Phrase | Example |
| --- | --- |
| be good at | She is good at **solving** puzzles. |
| look forward to | We look forward to **hearing** from you. |
| instead of | He walked instead of **taking** a taxi. |
| succeed in | They succeeded in **cutting** costs. |
| be used to | I am used to **waking** up early. |

### 3. When to use
- To close a formal email with look forward to.
- To talk about personal skills and interests.
- To express a choice with instead of.

### 4. Model sentences
- Thank you for helping me with the form.
- She apologised for arriving late.
- The team insisted on checking every figure.

### 5. Common mistakes
- Wrong: I look forward to hear from you. Right: I look forward to hearing from you. Why: to here is a preposition.
- Wrong: He is interested in learn Finnish. Right: He is interested in learning Finnish. Why: in must be followed by V-ing.

### 6. Contrast box
The to in look forward to is a preposition and takes V-ing, while the to in want to marks an infinitive.`,
      proTips: [
        "Học cả cụm giới từ thay vì học riêng động từ.",
        "Nhớ nhóm khó: look forward to, be used to, object to, in addition to.",
        "Sau giới từ không bao giờ dùng động từ nguyên mẫu.",
      ],
      proTipsEn: [
        "Learn the whole preposition phrase, not the verb alone.",
        "Memorise the tricky group: look forward to, be used to, object to, in addition to.",
        "Never place a bare infinitive after a preposition.",
      ],
      vocabulary: [
        { word: "apologise", ipa: "/əˈpɒlədʒaɪz/", meaning: "xin lỗi", meaningEn: "to say sorry", example: "He apologised for arriving late.", exampleEn: "He apologised for arriving late.", partOfSpeech: "verb" },
        { word: "insist", ipa: "/ɪnˈsɪst/", meaning: "khăng khăng đòi", meaningEn: "to demand firmly", example: "They insisted on checking the data.", exampleEn: "They insisted on checking the data.", partOfSpeech: "verb" },
        { word: "succeed", ipa: "/səkˈsiːd/", meaning: "thành công", meaningEn: "to achieve a goal", example: "We succeeded in reducing waste.", exampleEn: "We succeeded in reducing waste.", partOfSpeech: "verb" },
        { word: "accustomed", ipa: "/əˈkʌstəmd/", meaning: "đã quen với", meaningEn: "used to something", example: "She is accustomed to working late.", exampleEn: "She is accustomed to working late.", partOfSpeech: "adjective" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền dạng V-ing đúng.",
          instructionEn: "Complete each sentence with the correct V-ing form.",
          sentences: [
            { text: "We look forward to ___ your reply.", textEn: "We look forward to ___ your reply.", answer: "receiving" },
            { text: "She is good at ___ complex charts.", textEn: "She is good at ___ complex charts.", answer: "reading" },
            { text: "He cycled instead of ___ the bus.", textEn: "He cycled instead of ___ the bus.", answer: "taking" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi sau giới từ.",
          instructionEn: "Correct the verb form after each preposition.",
          items: [
            { wrong: "Thank you for send the documents so quickly.", correct: "Thank you for sending the documents so quickly.", explanation: "For is a preposition and needs V-ing." },
            { wrong: "I am used to get up at six.", correct: "I am used to getting up at six.", explanation: "In be used to, the word to is a preposition." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu dùng cụm giới từ gợi ý.",
          instructionEn: "Rewrite each sentence with the cue phrase.",
          items: [
            { prompt: "She apologised because she forgot the meeting.", target: "She apologised for forgetting the meeting.", cue: "apologise for" },
            { prompt: "They managed to reduce the budget.", target: "They succeeded in reducing the budget.", cue: "succeed in" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối cụm với phần còn lại của câu.",
          instructionEn: "Match each phrase with its ending.",
          pairs: [
            { left: "She objected to", right: "changing the schedule again" },
            { left: "He is afraid of", right: "speaking in front of a crowd" },
            { left: "They insisted on", right: "paying for the repairs" },
          ],
        },
      ],
      quiz: [
        { question: "I look forward to ___ you next week.", options: ["meet", "meeting", "met", "to meet"], answer: 1, explanation: "To here is a preposition, so V-ing follows." },
        { question: "She is interested in ___ abroad.", options: ["study", "studying", "studied", "to study"], answer: 1, explanation: "In takes a V-ing form." },
        { question: "He apologised for ___ the wrong file.", options: ["send", "sending", "sent", "to send"], answer: 1, explanation: "For is a preposition." },
        { question: "Which sentence is correct?", options: ["We succeeded in finish the task.", "We succeeded in finishing the task.", "We succeeded to finishing the task.", "We succeeded finish the task."], answer: 1, explanation: "Succeed in plus V-ing." },
        { question: "They are used to ___ in cold weather.", options: ["run", "running", "ran", "to run"], answer: 1, explanation: "Be used to plus V-ing describes a habit." },
        { question: "Instead of ___, he wrote a long email.", options: ["call", "calling", "called", "to call"], answer: 1, explanation: "Instead of takes V-ing." },
        { question: "She objected to ___ the deadline.", options: ["move", "moving", "moved", "to move"], answer: 1, explanation: "Object to plus V-ing." },
        { question: "Thank you for ___ me with the form.", options: ["help", "helping", "helped", "to help"], answer: 1, explanation: "For needs a gerund." },
        { question: "Which to takes an infinitive, not a gerund?", options: ["look forward to", "be used to", "want to", "object to"], answer: 2, explanation: "Want to introduces an infinitive." },
        { question: "He is afraid of ___ his notes before the exam.", options: ["lose", "losing", "lost", "to lose"], answer: 1, explanation: "Afraid of plus V-ing." },
      ],
    },
  ],
  "grammar-articles-advanced": [
    {
      id: "articles-generic-abstract",
      title: "Mạo từ với danh từ trừu tượng và khái quát",
      titleEn: "Articles with abstract and generic nouns",
      level: 4,
      difficulty: "advanced",
      theory: `## Mạo từ với danh từ trừu tượng và khái quát

### 1. Quy tắc
Khi nói về khái niệm chung, danh từ không đếm được và danh từ số nhiều thường **không có mạo từ**; the chỉ xuất hiện khi phạm vi được xác định.

### 2. Công thức
| Trường hợp | Ví dụ |
| --- | --- |
| Khái niệm chung | **Education** shapes society. |
| Nhóm chung số nhiều | **Teenagers** need clear routines. |
| Phạm vi xác định | **The education** offered in this city is excellent. |
| Danh từ đơn khái quát | **The smartphone** changed daily life. |

### 3. Khi nào dùng
- Viết câu chủ đề trong bài luận học thuật.
- Nói về xu hướng xã hội và số liệu chung.
- Mô tả phát minh theo cách khái quát trang trọng.

### 4. Câu mẫu
- *Public transport reduces pollution.* (Giao thông công cộng giảm ô nhiễm.)
- *The pollution in this district has doubled.* (Mức ô nhiễm ở khu này đã tăng gấp đôi.)

### 5. Lỗi thường gặp
- Sai: *The technology has changed the education.* Đúng: *Technology has changed education.*
- Sai: *Governments should invest in the renewable energy.* Đúng: *Governments should invest in renewable energy.*

### 6. So sánh nhanh
Không mạo từ = khái niệm chung; the = phạm vi đã giới hạn bằng cụm bổ nghĩa.`,
      theoryEn: `## Articles with abstract and generic nouns

### 1. Rule
When you talk about a general concept, uncountable nouns and plural nouns usually take **no article**; the appears only when the reference is limited.

### 2. Form
| Case | Example |
| --- | --- |
| General concept | **Education** shapes society. |
| General plural group | **Teenagers** need clear routines. |
| Limited reference | **The education** offered in this city is excellent. |
| Generic singular | **The smartphone** changed daily life. |

### 3. When to use
- To write topic sentences in academic essays.
- To describe social trends and general statistics.
- To describe an invention in a formal generic way.

### 4. Model sentences
- Public transport reduces pollution.
- The pollution in this district has doubled.
- Children learn faster in small classes.

### 5. Common mistakes
- Wrong: The technology has changed the education. Right: Technology has changed education. Why: both nouns are general concepts here.
- Wrong: Governments should invest in the renewable energy. Right: Governments should invest in renewable energy. Why: the concept is unlimited.

### 6. Contrast box
No article marks a general concept, while the marks a reference already limited by a modifier.`,
      proTips: [
        "Nếu bỏ được cụm bổ nghĩa mà câu vẫn đúng, thường không cần the.",
        "Danh từ số nhiều khái quát không dùng the: Students need support.",
        "Dùng the + danh từ đơn khi nói về một phát minh như một loại.",
      ],
      proTipsEn: [
        "If the sentence still works without a limiting phrase, you usually need no the.",
        "General plural nouns take no article: Students need support.",
        "Use the plus a singular noun when you treat an invention as a class.",
      ],
      vocabulary: [
        { word: "abstract", ipa: "/ˈæbstrækt/", meaning: "trừu tượng", meaningEn: "existing as an idea, not a physical thing", example: "Freedom is an abstract noun.", exampleEn: "Freedom is an abstract noun.", partOfSpeech: "adjective" },
        { word: "generic", ipa: "/dʒəˈnerɪk/", meaning: "khái quát, chung loại", meaningEn: "referring to a whole class", example: "The tiger is endangered is a generic statement.", exampleEn: "The tiger is endangered is a generic statement.", partOfSpeech: "adjective" },
        { word: "pollution", ipa: "/pəˈluːʃn/", meaning: "sự ô nhiễm", meaningEn: "harmful substances in the environment", example: "Pollution affects public health.", exampleEn: "Pollution affects public health.", partOfSpeech: "noun" },
        { word: "modifier", ipa: "/ˈmɒdɪfaɪə/", meaning: "cụm bổ nghĩa", meaningEn: "a word or phrase that limits meaning", example: "A modifier can make a noun definite.", exampleEn: "A modifier can make a noun definite.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền the hoặc để trống bằng dấu gạch chéo khi không cần mạo từ.",
          instructionEn: "Write the where necessary, or write no article.",
          sentences: [
            { text: "___ honesty is valued in every workplace.", textEn: "___ honesty is valued in every workplace.", answer: "no article" },
            { text: "___ traffic in this district worsens every year.", textEn: "___ traffic in this district worsens every year.", answer: "The" },
            { text: "___ smartphone transformed the way we communicate.", textEn: "___ smartphone transformed the way we communicate.", answer: "The" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi mạo từ.",
          instructionEn: "Correct the article use in each sentence.",
          items: [
            { wrong: "The children learn faster when classes are small.", correct: "Children learn faster when classes are small.", explanation: "The plural noun is general here." },
            { wrong: "Investment in the education brings long-term growth.", correct: "Investment in education brings long-term growth.", explanation: "Education is an unlimited concept." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu để phạm vi trở nên xác định.",
          instructionEn: "Rewrite each sentence so the reference becomes definite.",
          items: [
            { prompt: "Air quality has improved.", target: "The air quality in the capital has improved.", cue: "in the capital" },
            { prompt: "Public spending increased.", target: "The public spending reported last year increased.", cue: "reported last year" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối câu với cách dùng mạo từ.",
          instructionEn: "Match each sentence with its article rule.",
          pairs: [
            { left: "Water freezes at zero degrees.", right: "general uncountable concept with no article" },
            { left: "The water in this bottle is warm.", right: "limited reference with the" },
            { left: "The bicycle changed urban travel.", right: "generic singular with the" },
          ],
        },
      ],
      quiz: [
        { question: "___ patience is essential for teachers.", options: ["The", "A", "An", "No article"], answer: 3, explanation: "An abstract concept takes no article." },
        { question: "___ noise from the building site woke everyone.", options: ["The", "A", "An", "No article"], answer: 0, explanation: "The modifier limits the noun." },
        { question: "Which sentence is correct?", options: ["Technology improves the healthcare.", "Technology improves healthcare.", "The technology improves the healthcare.", "A technology improves healthcare."], answer: 1, explanation: "Both nouns are general concepts." },
        { question: "___ telephone changed long-distance contact forever.", options: ["The", "A", "No article", "An"], answer: 0, explanation: "Generic singular inventions take the." },
        { question: "Governments should support ___ renewable energy.", options: ["the", "a", "an", "no article"], answer: 3, explanation: "The concept is unlimited." },
        { question: "___ students in my class come from six countries.", options: ["The", "A", "An", "No article"], answer: 0, explanation: "In my class limits the group." },
        { question: "___ happiness cannot be bought.", options: ["The", "A", "No article", "An"], answer: 2, explanation: "Abstract nouns are general." },
        { question: "Choose the correct academic sentence.", options: ["Children need routines.", "The children need the routines.", "A children need routines.", "Children need the routines."], answer: 0, explanation: "General plural plus general uncountable, no articles." },
        { question: "___ rice grown in this valley is famous.", options: ["The", "A", "An", "No article"], answer: 0, explanation: "Grown in this valley limits the noun." },
        { question: "No article is normally used with ___.", options: ["a limited reference", "a general plural or uncountable noun", "a generic singular invention", "a unique object"], answer: 1, explanation: "General plurals and uncountables take no article." },
      ],
    },
  ],
  "grammar-sv-agreement": [
    {
      id: "sv-agreement-tricky-subjects",
      title: "Chủ ngữ khó và sự hòa hợp động từ",
      titleEn: "Tricky subjects and verb agreement",
      level: 4,
      difficulty: "advanced",
      theory: `## Chủ ngữ khó và sự hòa hợp

### 1. Quy tắc
Động từ hòa hợp với **chủ ngữ chính**, không hòa hợp với danh từ gần nhất trong cụm bổ nghĩa.

### 2. Công thức
| Loại chủ ngữ | Động từ | Ví dụ |
| --- | --- | --- |
| each, every, either | số ít | Each of the answers **is** correct. |
| a number of | số nhiều | A number of students **have** applied. |
| the number of | số ít | The number of applicants **has** risen. |
| either A or B | theo B | Either the manager or the staff **are** waiting. |
| collective noun | tùy nghĩa | The team **is** strong. The team **are** arguing. |

### 3. Khi nào dùng
- Viết báo cáo số liệu chính xác.
- Trình bày quy định bằng each và every.
- Nói về nhóm người trong văn phong trang trọng.

### 4. Câu mẫu
- *The list of participants is on the wall.* (Danh sách người tham gia treo trên tường.)
- *Neither of the plans has been approved.* (Cả hai kế hoạch đều chưa được duyệt.)

### 5. Lỗi thường gặp
- Sai: *The box of books are heavy.* Đúng: *The box of books is heavy.*
- Sai: *A number of people is waiting.* Đúng: *A number of people are waiting.*

### 6. So sánh nhanh
A number of + số nhiều; the number of + số ít.`,
      theoryEn: `## Tricky subjects and verb agreement

### 1. Rule
The verb agrees with the **head subject**, not with the closest noun inside a modifying phrase.

### 2. Form
| Subject type | Verb | Example |
| --- | --- | --- |
| each, every, either | singular | Each of the answers **is** correct. |
| a number of | plural | A number of students **have** applied. |
| the number of | singular | The number of applicants **has** risen. |
| either A or B | agrees with B | Either the manager or the staff **are** waiting. |
| collective noun | depends on meaning | The team **is** strong. The team **are** arguing. |

### 3. When to use
- To report statistics accurately.
- To state rules with each and every.
- To describe groups of people in formal writing.

### 4. Model sentences
- The list of participants is on the wall.
- Neither of the plans has been approved.
- A number of volunteers arrive early every Saturday.

### 5. Common mistakes
- Wrong: The box of books are heavy. Right: The box of books is heavy. Why: box is the head noun.
- Wrong: A number of people is waiting. Right: A number of people are waiting. Why: a number of takes a plural verb.

### 6. Contrast box
A number of takes a plural verb, while the number of takes a singular verb.`,
      proTips: [
        "Gạch bỏ cụm of ... để tìm chủ ngữ chính rồi mới chọn động từ.",
        "Each và every luôn đi với động từ số ít.",
        "Với either A or B, động từ theo danh từ đứng gần động từ nhất.",
      ],
      proTipsEn: [
        "Cross out the of-phrase to find the head subject before choosing the verb.",
        "Each and every always take a singular verb.",
        "With either A or B, the verb agrees with the noun closest to it.",
      ],
      vocabulary: [
        { word: "agreement", ipa: "/əˈɡriːmənt/", meaning: "sự hòa hợp", meaningEn: "matching form between subject and verb", example: "Subject-verb agreement affects clarity.", exampleEn: "Subject-verb agreement affects clarity.", partOfSpeech: "noun" },
        { word: "collective", ipa: "/kəˈlektɪv/", meaning: "tập thể", meaningEn: "referring to a group as a unit", example: "Team is a collective noun.", exampleEn: "Team is a collective noun.", partOfSpeech: "adjective" },
        { word: "applicant", ipa: "/ˈæplɪkənt/", meaning: "người ứng tuyển", meaningEn: "a person who applies", example: "The number of applicants has risen.", exampleEn: "The number of applicants has risen.", partOfSpeech: "noun" },
        { word: "participant", ipa: "/pɑːˈtɪsɪpənt/", meaning: "người tham gia", meaningEn: "a person taking part", example: "The list of participants is complete.", exampleEn: "The list of participants is complete.", partOfSpeech: "noun" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền động từ đúng.",
          instructionEn: "Complete each sentence with the correct verb.",
          sentences: [
            { text: "The number of visitors ___ fallen since May.", textEn: "The number of visitors ___ fallen since May.", answer: "has" },
            { text: "A number of teachers ___ joined the workshop.", textEn: "A number of teachers ___ joined the workshop.", answer: "have" },
            { text: "Each of the rooms ___ its own key.", textEn: "Each of the rooms ___ its own key.", answer: "has" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi hòa hợp chủ ngữ và động từ.",
          instructionEn: "Correct the agreement error in each sentence.",
          items: [
            { wrong: "The collection of paintings are worth a fortune.", correct: "The collection of paintings is worth a fortune.", explanation: "Collection is the head noun." },
            { wrong: "Neither of the answers were accepted.", correct: "Neither of the answers was accepted.", explanation: "Neither takes a singular verb in formal writing." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu theo chủ ngữ gợi ý.",
          instructionEn: "Rewrite each sentence with the cue subject.",
          items: [
            { prompt: "Many students have registered already.", target: "A number of students have registered already.", cue: "A number of" },
            { prompt: "Fewer people apply each year.", target: "The number of applications has fallen each year.", cue: "The number of" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối chủ ngữ với dạng động từ đúng.",
          instructionEn: "Match each subject with the correct verb form.",
          pairs: [
            { left: "Every candidate", right: "receives a confirmation email" },
            { left: "A number of parents", right: "attend the meeting each term" },
            { left: "The number of complaints", right: "has dropped sharply" },
          ],
        },
      ],
      quiz: [
        { question: "The list of names ___ on the noticeboard.", options: ["are", "is", "were", "have"], answer: 1, explanation: "List is the singular head noun." },
        { question: "A number of buses ___ delayed this morning.", options: ["was", "were", "has", "is"], answer: 1, explanation: "A number of takes a plural verb." },
        { question: "Each of the students ___ a laptop.", options: ["have", "has", "are having", "were"], answer: 1, explanation: "Each is singular." },
        { question: "The number of accidents ___ decreased.", options: ["have", "has", "are", "were"], answer: 1, explanation: "The number of is singular." },
        { question: "Neither of the reports ___ been finished.", options: ["have", "has", "are", "were"], answer: 1, explanation: "Neither takes a singular verb formally." },
        { question: "Either the coach or the players ___ responsible.", options: ["is", "are", "was", "has"], answer: 1, explanation: "The verb agrees with the nearer plural noun." },
        { question: "Which sentence is correct?", options: ["The box of tools are missing.", "The box of tools is missing.", "The box of tools were missing.", "The box of tools have missing."], answer: 1, explanation: "Box is the head noun." },
        { question: "Every employee ___ a new badge next month.", options: ["receive", "receives", "are receiving", "have received"], answer: 1, explanation: "Every takes a singular verb." },
        { question: "The staff ___ still arguing about the schedule.", options: ["is", "are", "has", "was"], answer: 1, explanation: "Here staff acts as individual members." },
        { question: "To find the correct verb, first identify ___.", options: ["the nearest noun", "the head subject", "the object", "the adverb"], answer: 1, explanation: "Agreement follows the head subject." },
      ],
    },
  ],
  "grammar-inversion": [
    {
      id: "inversion-conditional-formal",
      title: "Đảo ngữ trong câu điều kiện trang trọng",
      titleEn: "Inversion in formal conditionals",
      level: 5,
      difficulty: "advanced",
      theory: `## Đảo ngữ trong câu điều kiện

### 1. Quy tắc
Bỏ if và đảo trợ động từ lên trước chủ ngữ để tạo giọng văn trang trọng.

### 2. Công thức
| Câu thường | Câu đảo ngữ |
| --- | --- |
| If you need help, call me. | **Should you need** help, call me. |
| If I were you, I would apply. | **Were I you**, I would apply. |
| If she had known, she would have replied. | **Had she known**, she would have replied. |

### 3. Khi nào dùng
- Viết thư trang trọng và email công việc.
- Nêu điều kiện trong hợp đồng hoặc thông báo.
- Nâng độ khó ngữ pháp trong IELTS Writing.

### 4. Câu mẫu
- *Should any problem arise, contact the office.* (Nếu có vấn đề, hãy liên hệ văn phòng.)
- *Had we booked earlier, we would have paid less.* (Nếu đặt sớm hơn, chúng tôi đã trả ít hơn.)

### 5. Lỗi thường gặp
- Sai: *Should you need help, please to call me.* Đúng: *Should you need help, please call me.*
- Sai: *Had I knew the answer, I would say it.* Đúng: *Had I known the answer, I would have said it.*

### 6. So sánh nhanh
Should = điều kiện có thể xảy ra; Were = giả định hiện tại; Had = giả định quá khứ.`,
      theoryEn: `## Inversion in conditional sentences

### 1. Rule
Delete if and move the auxiliary in front of the subject to create a formal tone.

### 2. Form
| Standard | Inverted |
| --- | --- |
| If you need help, call me. | **Should you need** help, call me. |
| If I were you, I would apply. | **Were I you**, I would apply. |
| If she had known, she would have replied. | **Had she known**, she would have replied. |

### 3. When to use
- In formal letters and business email.
- To state conditions in contracts and notices.
- To raise grammatical range in academic writing.

### 4. Model sentences
- Should any problem arise, contact the office.
- Had we booked earlier, we would have paid less.
- Were the council to approve the plan, work would begin in June.

### 5. Common mistakes
- Wrong: Should you need help, please to call me. Right: Should you need help, please call me. Why: the imperative takes a bare verb.
- Wrong: Had I knew the answer, I would say it. Right: Had I known the answer, I would have said it. Why: Had needs a past participle and a perfect result clause.

### 6. Contrast box
Should marks an open possibility, Were marks a present hypothesis, and Had marks a past hypothesis.`,
      proTips: [
        "Không dùng if khi đã đảo ngữ.",
        "Sau Had + S phải là V3, không phải quá khứ đơn.",
        "Were I to + V diễn tả giả định tương lai rất trang trọng.",
      ],
      proTipsEn: [
        "Never keep if once you invert the auxiliary.",
        "After Had plus subject, use the past participle, not the past simple.",
        "Were I to plus verb expresses a very formal future hypothesis.",
      ],
      vocabulary: [
        { word: "arise", ipa: "/əˈraɪz/", meaning: "phát sinh", meaningEn: "to happen or appear", example: "Should any problem arise, call us.", exampleEn: "Should any problem arise, call us.", partOfSpeech: "verb" },
        { word: "hypothesis", ipa: "/haɪˈpɒθəsɪs/", meaning: "giả thuyết", meaningEn: "an idea assumed for argument", example: "Were is used for a present hypothesis.", exampleEn: "Were is used for a present hypothesis.", partOfSpeech: "noun" },
        { word: "formal", ipa: "/ˈfɔːml/", meaning: "trang trọng", meaningEn: "suitable for official situations", example: "Inversion sounds formal.", exampleEn: "Inversion sounds formal.", partOfSpeech: "adjective" },
        { word: "approve", ipa: "/əˈpruːv/", meaning: "phê duyệt", meaningEn: "to accept officially", example: "Were the council to approve it, work would start.", exampleEn: "Were the council to approve it, work would start.", partOfSpeech: "verb" },
      ],
      exercises: [
        {
          type: "fill-in-blank",
          instruction: "Điền trợ động từ đảo ngữ.",
          instructionEn: "Complete each inverted conditional.",
          sentences: [
            { text: "___ you require assistance, our team is available.", textEn: "___ you require assistance, our team is available.", answer: "Should" },
            { text: "___ I in your position, I would negotiate the price.", textEn: "___ I in your position, I would negotiate the price.", answer: "Were" },
            { text: "___ they arrived on time, the meeting would have started.", textEn: "___ they arrived on time, the meeting would have started.", answer: "Had" },
          ],
        },
        {
          type: "error-correction",
          instruction: "Sửa lỗi đảo ngữ.",
          instructionEn: "Correct the inversion error in each sentence.",
          items: [
            { wrong: "If should you need a receipt, ask the cashier.", correct: "Should you need a receipt, ask the cashier.", explanation: "Inversion replaces if." },
            { wrong: "Had she saw the notice, she would have applied.", correct: "Had she seen the notice, she would have applied.", explanation: "Had requires a past participle." },
          ],
        },
        {
          type: "transformation",
          instruction: "Viết lại câu điều kiện bằng đảo ngữ.",
          instructionEn: "Rewrite each conditional using inversion.",
          items: [
            { prompt: "If you have any questions, email the office.", target: "Should you have any questions, email the office.", cue: "Should" },
            { prompt: "If the team had trained harder, they would have won.", target: "Had the team trained harder, they would have won.", cue: "Had" },
          ],
        },
        {
          type: "matching",
          instruction: "Nối dạng đảo ngữ với ý nghĩa.",
          instructionEn: "Match each inverted form with its meaning.",
          pairs: [
            { left: "Should you need help", right: "an open future possibility" },
            { left: "Were I the manager", right: "an unreal present situation" },
            { left: "Had we left earlier", right: "an unreal past situation" },
          ],
        },
      ],
      quiz: [
        { question: "___ you wish to cancel, please inform us in writing.", options: ["Should", "Had", "Were", "Would"], answer: 0, explanation: "Should marks an open possibility." },
        { question: "___ I richer, I would travel every summer.", options: ["Should", "Were", "Had", "Did"], answer: 1, explanation: "Were expresses a present hypothesis." },
        { question: "___ the driver noticed the sign, the accident would not have happened.", options: ["Should", "Were", "Had", "Would"], answer: 2, explanation: "Had plus V3 marks a past hypothesis." },
        { question: "Which sentence is correct?", options: ["Had I known, I would have called.", "Had I knew, I would have called.", "If had I known, I would have called.", "Had I know, I would call."], answer: 0, explanation: "Had plus past participle plus perfect result." },
        { question: "___ the results be delayed, candidates will be informed.", options: ["Should", "Were", "Had", "Do"], answer: 0, explanation: "Should plus bare infinitive is standard in notices." },
        { question: "Were she ___ accept the offer, she would move in July.", options: ["to", "for", "of", "by"], answer: 0, explanation: "Were plus to plus verb marks a formal future hypothesis." },
        { question: "In an inverted conditional, if is ___.", options: ["kept at the start", "deleted", "moved to the end", "replaced by that"], answer: 1, explanation: "Inversion replaces if entirely." },
        { question: "___ any delay occur, we will refund the fee.", options: ["Should", "Had", "Were", "Will"], answer: 0, explanation: "Should expresses a possible future event." },
        { question: "Had the shop opened earlier, we ___ the sale.", options: ["would catch", "would have caught", "will catch", "catch"], answer: 1, explanation: "A past hypothesis needs would have plus V3." },
        { question: "Which register does conditional inversion suit best?", options: ["casual chat", "formal writing", "text messages", "children's stories"], answer: 1, explanation: "It belongs to formal contexts." },
      ],
    },
  ],
};
