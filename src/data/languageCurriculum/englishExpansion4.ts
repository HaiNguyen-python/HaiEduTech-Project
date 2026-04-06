import type { LanguageModule } from "./types";

// TOEIC Expansion — 5 new lessons
const toeicExpansion4Modules: LanguageModule[] = [
  {
    id: "toeic-exp4-business-comm",
    title: "TOEIC Business Communication",
    titleEn: "TOEIC Business Communication",
    icon: "💼",
    color: "from-blue-500 to-blue-700",
    description: "Giao tiếp kinh doanh nâng cao cho TOEIC",
    descriptionEn: "Advanced business communication for TOEIC",
    category: "toeic",
    language: "english",
    lessons: [
      {
        id: "toeic-exp4-email",
        title: "Email Writing in Business",
        titleEn: "Email Writing in Business",
        level: 3,
        difficulty: "intermediate",
        theory: `# Business Email Writing for TOEIC

## Structure of a Professional Email
1. **Subject line** — Clear and specific
2. **Greeting** — Dear Mr./Ms. + Last name
3. **Opening** — State purpose immediately
4. **Body** — Details, organized in short paragraphs
5. **Closing** — Call to action or next steps
6. **Sign-off** — Best regards, Sincerely

## Common Phrases
- "I am writing to inquire about..."
- "Please find attached..."
- "I would appreciate it if you could..."
- "Do not hesitate to contact me if..."
- "I look forward to hearing from you."

## Tone
- Formal but not overly stiff
- Avoid contractions in very formal emails
- Use polite modals: would, could, might`,
        theoryEn: `# Business Email Writing for TOEIC

## Structure of a Professional Email
1. **Subject line** — Clear and specific
2. **Greeting** — Dear Mr./Ms. + Last name
3. **Opening** — State purpose immediately
4. **Body** — Details, organized in short paragraphs
5. **Closing** — Call to action or next steps
6. **Sign-off** — Best regards, Sincerely

## Common Phrases
- "I am writing to inquire about..."
- "Please find attached..."
- "I would appreciate it if you could..."
- "Do not hesitate to contact me if..."
- "I look forward to hearing from you."`,
        proTips: [
          "Luôn bắt đầu bằng mục đích chính của email",
          "Dùng bullet points cho danh sách dài",
        ],
        proTipsEn: [
          "Always start with the main purpose",
          "Use bullet points for long lists",
        ],
        vocabulary: [
          { word: "attachment", meaning: "tệp đính kèm", example: "Please see the attachment for details.", partOfSpeech: "noun" },
          { word: "inquiry", meaning: "yêu cầu thông tin", example: "Thank you for your inquiry.", partOfSpeech: "noun" },
          { word: "regarding", meaning: "liên quan đến", example: "I am writing regarding your order.", partOfSpeech: "preposition" },
          { word: "comply", meaning: "tuân thủ", example: "We must comply with the regulations.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống",
            instructionEn: "Fill in the blank with the appropriate word",
            sentences: [
              { text: "I am writing to ___ about the new policy.", textEn: "I am writing to ___ about the new policy.", answer: "inquire", hint: "ask formally" },
              { text: "Please find the report ___ to this email.", textEn: "Please find the report ___ to this email.", answer: "attached", hint: "file included" },
              { text: "We look forward to ___ from you soon.", textEn: "We look forward to ___ from you soon.", answer: "hearing", hint: "receiving a reply" },
            ],
          },
        ],
        quiz: [
          { question: "Which is the most appropriate email opening?", options: ["Hey, what's up?", "I am writing to inquire about...", "Listen, I need...", "Yo, check this out"], answer: 1, explanation: "'I am writing to inquire about...' is formal and professional." },
          { question: "What does 'Please find attached' mean?", options: ["Please look for the lost file", "The file is included with this email", "Please attach a file", "Find the attachment elsewhere"], answer: 1, explanation: "It means the file is included with the email." },
          { question: "Which sign-off is most formal?", options: ["Cheers", "Later", "Best regards", "XOXO"], answer: 2, explanation: "'Best regards' is the standard formal sign-off." },
        ],
      },
      {
        id: "toeic-exp4-meetings",
        title: "Meeting Vocabulary & Phrases",
        titleEn: "Meeting Vocabulary & Phrases",
        level: 3,
        difficulty: "intermediate",
        theory: `# Meeting Vocabulary for TOEIC

## Before the Meeting
- **agenda**: danh sách các mục thảo luận
- **minutes**: biên bản cuộc họp
- **chairperson**: người chủ trì

## During the Meeting
- "Let's get started." — Bắt đầu thôi.
- "Moving on to the next item..." — Chuyển sang mục tiếp theo...
- "Could you elaborate on that?" — Bạn có thể nói rõ hơn không?
- "I'd like to raise a point." — Tôi muốn nêu một ý kiến.

## After the Meeting
- "To summarize..." — Tóm lại...
- "The action items are..." — Các việc cần làm là...
- "Let's schedule a follow-up." — Hẹn họp lại.`,
        theoryEn: `# Meeting Vocabulary for TOEIC

## Before the Meeting
- **agenda**: list of discussion items
- **minutes**: meeting notes/record
- **chairperson**: person who leads the meeting

## During the Meeting
- "Let's get started."
- "Moving on to the next item..."
- "Could you elaborate on that?"
- "I'd like to raise a point."

## After the Meeting
- "To summarize..."
- "The action items are..."
- "Let's schedule a follow-up."`,
        vocabulary: [
          { word: "agenda", meaning: "chương trình nghị sự", example: "The agenda includes three items.", partOfSpeech: "noun" },
          { word: "minutes", meaning: "biên bản", example: "Who will take the minutes?", partOfSpeech: "noun" },
          { word: "adjourn", meaning: "tạm hoãn", example: "Let's adjourn the meeting until Friday.", partOfSpeech: "verb" },
          { word: "consensus", meaning: "sự đồng thuận", example: "We reached a consensus on the budget.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ đúng vào chỗ trống",
            instructionEn: "Fill in the correct word",
            sentences: [
              { text: "The ___ for today's meeting has five items.", textEn: "The ___ for today's meeting has five items.", answer: "agenda" },
              { text: "Could someone take the ___ please?", textEn: "Could someone take the ___ please?", answer: "minutes" },
              { text: "We need to reach a ___ before we proceed.", textEn: "We need to reach a ___ before we proceed.", answer: "consensus" },
            ],
          },
        ],
        quiz: [
          { question: "What are 'minutes' in a meeting context?", options: ["Units of time", "Written record of discussions", "Short breaks", "Agenda items"], answer: 1, explanation: "Minutes are the written record of what was discussed and decided." },
          { question: "'Let's adjourn the meeting' means:", options: ["Let's start the meeting", "Let's end/pause the meeting", "Let's extend the meeting", "Let's cancel the meeting"], answer: 1, explanation: "Adjourn means to temporarily end or pause a meeting." },
        ],
      },
      {
        id: "toeic-exp4-travel",
        title: "Travel & Business Trips",
        titleEn: "Travel & Business Trips",
        level: 2,
        difficulty: "intermediate",
        theory: `# Travel & Business Trips Vocabulary

## At the Airport
- **boarding pass**: thẻ lên máy bay
- **layover / stopover**: quá cảnh
- **carry-on luggage**: hành lý xách tay
- **customs declaration**: khai báo hải quan

## At the Hotel
- **check in / check out**: nhận phòng / trả phòng
- **reservation / booking**: đặt phòng
- **complimentary breakfast**: bữa sáng miễn phí
- **amenities**: tiện nghi

## Common Situations
- "I'd like to confirm my reservation."
- "Is there a shuttle service to the airport?"
- "Could you arrange a wake-up call for 6 AM?"`,
        theoryEn: `# Travel & Business Trips Vocabulary

## At the Airport
- **boarding pass**: document to board the plane
- **layover / stopover**: intermediate stop
- **carry-on luggage**: bags taken on the plane
- **customs declaration**: declaring goods at border

## At the Hotel
- **check in / check out**: arrive / leave hotel
- **reservation / booking**: pre-arranged stay
- **complimentary breakfast**: free breakfast
- **amenities**: facilities and services`,
        vocabulary: [
          { word: "itinerary", meaning: "lịch trình", example: "Here is your travel itinerary.", partOfSpeech: "noun" },
          { word: "reimbursement", meaning: "hoàn trả chi phí", example: "Submit receipts for reimbursement.", partOfSpeech: "noun" },
          { word: "accommodate", meaning: "đáp ứng, bố trí", example: "We can accommodate your request.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ phù hợp",
            instructionEn: "Fill in the appropriate word",
            sentences: [
              { text: "Please show your ___ at the gate.", textEn: "Please show your ___ at the gate.", answer: "boarding pass" },
              { text: "I'd like to ___ my reservation for tonight.", textEn: "I'd like to ___ my reservation for tonight.", answer: "confirm" },
              { text: "The hotel offers ___ breakfast for all guests.", textEn: "The hotel offers ___ breakfast for all guests.", answer: "complimentary" },
            ],
          },
        ],
        quiz: [
          { question: "A 'layover' is:", options: ["A type of hotel room", "A stop between flights", "Extra luggage", "A boarding document"], answer: 1, explanation: "A layover is a stop between connecting flights." },
          { question: "'Complimentary' means:", options: ["Expensive", "Required", "Free of charge", "Optional"], answer: 2, explanation: "'Complimentary' means provided free of charge." },
        ],
      },
      {
        id: "toeic-exp4-phone",
        title: "Phone Conversations",
        titleEn: "Phone Conversations",
        level: 3,
        difficulty: "intermediate",
        theory: `# Phone Conversations in Business

## Answering the Phone
- "Good morning, [Company Name], [Name] speaking."
- "How may I help you?"

## Making Requests
- "Could I speak to Mr. Lee, please?"
- "I'm calling regarding..."
- "Could you put me through to the sales department?"

## Taking Messages
- "I'm afraid he's not available. May I take a message?"
- "Could you ask her to call me back?"
- "I'll make sure he gets the message."

## Problems on the Line
- "I'm sorry, could you repeat that?"
- "The line is breaking up."
- "Could you speak a little louder?"`,
        theoryEn: `# Phone Conversations in Business

## Answering the Phone
- "Good morning, [Company Name], [Name] speaking."
- "How may I help you?"

## Making Requests
- "Could I speak to Mr. Lee, please?"
- "I'm calling regarding..."
- "Could you put me through to the sales department?"

## Taking Messages
- "I'm afraid he's not available. May I take a message?"
- "Could you ask her to call me back?"
- "I'll make sure he gets the message."`,
        vocabulary: [
          { word: "extension", meaning: "số nhánh", example: "Could you transfer me to extension 305?", partOfSpeech: "noun" },
          { word: "hold", meaning: "giữ máy", example: "Could you hold for a moment?", partOfSpeech: "verb" },
          { word: "transfer", meaning: "chuyển cuộc gọi", example: "I'll transfer you now.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu đúng thứ tự",
            instructionEn: "Rearrange the words in correct order",
            items: [
              { scrambled: ["speak", "Could", "to", "I", "please", "Ms. Chen"], correct: "Could I speak to Ms. Chen please" },
              { scrambled: ["take", "May", "a", "I", "message"], correct: "May I take a message" },
            ],
          },
        ],
        quiz: [
          { question: "Which is most professional when answering the phone?", options: ["Yeah, hello?", "Who is this?", "Good morning, ABC Corp, John speaking.", "Hey, what do you want?"], answer: 2, explanation: "State the company name and your name professionally." },
          { question: "'Put me through' means:", options: ["Hang up the phone", "Connect me to someone", "Leave a message", "Call back later"], answer: 1, explanation: "'Put me through' means to transfer/connect the call." },
        ],
      },
      {
        id: "toeic-exp4-negotiate",
        title: "Negotiations & Agreements",
        titleEn: "Negotiations & Agreements",
        level: 4,
        difficulty: "advanced",
        theory: `# Negotiations & Agreements

## Key Phrases for Negotiation
- "We'd like to propose..." — Chúng tôi muốn đề xuất...
- "That sounds reasonable." — Điều đó có vẻ hợp lý.
- "We're willing to compromise on..." — Chúng tôi sẵn sàng nhượng bộ về...
- "Could we meet halfway?" — Chúng ta có thể dung hòa không?

## Making Offers
- "We can offer a 10% discount if..."
- "Our best price would be..."
- "This is a one-time offer."

## Reaching Agreement
- "Let's shake on it." — Chốt thỏa thuận.
- "We have a deal." — Chúng ta đã đạt được thỏa thuận.
- "I'll have the contract drawn up." — Tôi sẽ soạn hợp đồng.

## Declining Politely
- "I'm afraid that won't work for us."
- "We'll need to reconsider."
- "Let me get back to you on that."`,
        theoryEn: `# Negotiations & Agreements

## Key Phrases for Negotiation
- "We'd like to propose..."
- "That sounds reasonable."
- "We're willing to compromise on..."
- "Could we meet halfway?"

## Making Offers & Reaching Agreement
- "We can offer a 10% discount if..."
- "Let's shake on it."
- "I'll have the contract drawn up."`,
        vocabulary: [
          { word: "compromise", meaning: "thỏa hiệp", example: "Both sides need to compromise.", partOfSpeech: "verb" },
          { word: "counteroffer", meaning: "lời đề nghị đáp lại", example: "They made a counteroffer of $5,000.", partOfSpeech: "noun" },
          { word: "terms", meaning: "điều khoản", example: "We need to agree on the terms.", partOfSpeech: "noun" },
          { word: "mutual", meaning: "lẫn nhau", example: "It was a mutual agreement.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ phù hợp",
            instructionEn: "Choose the correct word",
            sentences: [
              { text: "We're willing to ___ on the delivery date.", textEn: "We're willing to ___ on the delivery date.", answer: "compromise" },
              { text: "Let me review the ___ of the contract.", textEn: "Let me review the ___ of the contract.", answer: "terms" },
              { text: "They submitted a ___ that was more favorable.", textEn: "They submitted a ___ that was more favorable.", answer: "counteroffer" },
            ],
          },
        ],
        quiz: [
          { question: "'Meet halfway' means:", options: ["Meet at a location between two places", "Compromise with each side giving something", "Finish half the work", "Meet at noon"], answer: 1, explanation: "It means to compromise, with both sides making concessions." },
          { question: "Which phrase politely declines an offer?", options: ["No way!", "I'm afraid that won't work for us.", "Forget it.", "That's terrible."], answer: 1, explanation: "'I'm afraid that won't work for us' is a polite way to decline." },
        ],
      },
    ],
  },
];

// National Exam Expansion — 5 new lessons
const nationalExamExpansion4Modules: LanguageModule[] = [
  {
    id: "natexam-exp4-strategies",
    title: "National Exam Strategies",
    titleEn: "National Exam Strategies",
    icon: "🎯",
    color: "from-red-500 to-red-700",
    description: "Chiến lược làm bài thi THPT Quốc gia",
    descriptionEn: "Strategies for the National High School Exam",
    category: "national-exam",
    language: "english",
    lessons: [
      {
        id: "natexam-exp4-reading",
        title: "Reading Comprehension Strategies",
        titleEn: "Reading Comprehension Strategies",
        level: 3,
        difficulty: "intermediate",
        theory: `# Chiến lược Đọc hiểu THPT

## Bước 1: Đọc câu hỏi trước
- Xác định loại câu hỏi: main idea, detail, inference, vocabulary
- Gạch chân keywords trong câu hỏi

## Bước 2: Skimming
- Đọc lướt đoạn văn để nắm ý chính
- Chú ý câu đầu và câu cuối mỗi đoạn

## Bước 3: Scanning
- Tìm thông tin cụ thể dựa trên keywords
- Đọc kỹ câu chứa thông tin cần tìm

## Bước 4: Loại trừ đáp án
- Loại đáp án quá tuyệt đối (always, never)
- Loại đáp án mâu thuẫn với bài đọc
- Chọn đáp án gần nghĩa nhất`,
        theoryEn: `# Reading Comprehension Strategies

## Step 1: Read questions first
- Identify question types: main idea, detail, inference, vocabulary
- Underline keywords

## Step 2: Skimming — get the main idea
## Step 3: Scanning — find specific information
## Step 4: Elimination — remove wrong answers`,
        proTips: ["Đọc câu hỏi trước khi đọc bài", "Loại trừ đáp án sai thay vì tìm đáp án đúng"],
        proTipsEn: ["Read questions before the passage", "Eliminate wrong answers instead of finding the right one"],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền chiến lược đọc hiểu phù hợp",
            instructionEn: "Fill in the appropriate reading strategy",
            sentences: [
              { text: "To get the main idea quickly, use ___ technique.", textEn: "To get the main idea quickly, use ___ technique.", answer: "skimming" },
              { text: "To find specific details, use ___ technique.", textEn: "To find specific details, use ___ technique.", answer: "scanning" },
            ],
          },
        ],
        quiz: [
          { question: "What should you do FIRST when doing a reading comprehension task?", options: ["Read the whole passage carefully", "Read the questions first", "Translate every word", "Read the title only"], answer: 1, explanation: "Reading questions first helps you know what to look for." },
          { question: "Which words in answer choices are often 'red flags' (likely wrong)?", options: ["Sometimes, often", "Always, never", "Usually, generally", "Possibly, perhaps"], answer: 1, explanation: "Extreme words like 'always' and 'never' are often incorrect." },
        ],
      },
      {
        id: "natexam-exp4-errors",
        title: "Error Identification",
        titleEn: "Error Identification",
        level: 3,
        difficulty: "intermediate",
        theory: `# Nhận diện Lỗi sai (Error Identification)

## Các lỗi thường gặp

### 1. Subject-Verb Agreement
- ❌ The students **has** finished.
- ✅ The students **have** finished.

### 2. Word Form
- ❌ She is very **beauty**.
- ✅ She is very **beautiful**.

### 3. Tense Consistency
- ❌ He **goes** to school yesterday.
- ✅ He **went** to school yesterday.

### 4. Preposition Errors
- ❌ She is interested **on** music.
- ✅ She is interested **in** music.

### 5. Article Errors
- ❌ He is **a** honest man.
- ✅ He is **an** honest man.`,
        theoryEn: `# Error Identification

## Common Errors
1. Subject-Verb Agreement
2. Word Form (noun/verb/adj/adv confusion)
3. Tense Consistency
4. Preposition Errors
5. Article Errors`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Sửa lỗi sai trong câu (điền từ đúng)",
            instructionEn: "Fix the error (fill in the correct word)",
            sentences: [
              { text: "Everyone ___ ready for the exam. (is/are)", textEn: "Everyone ___ ready for the exam.", answer: "is", hint: "'Everyone' is singular" },
              { text: "She speaks English very ___. (good/well)", textEn: "She speaks English very ___.", answer: "well", hint: "Adverb modifies verb" },
              { text: "He is interested ___ learning Chinese. (in/on)", textEn: "He is interested ___ learning Chinese.", answer: "in", hint: "interested + preposition" },
            ],
          },
        ],
        quiz: [
          { question: "Find the error: 'Each of the students have their own book.'", options: ["Each", "have", "their", "book"], answer: 1, explanation: "'Each' is singular, so it should be 'has'." },
          { question: "Find the error: 'She plays piano very good.'", options: ["She", "plays", "very", "good"], answer: 3, explanation: "'Good' should be 'well' (adverb modifying the verb 'plays')." },
        ],
      },
      {
        id: "natexam-exp4-cloze",
        title: "Cloze Test Techniques",
        titleEn: "Cloze Test Techniques",
        level: 3,
        difficulty: "intermediate",
        theory: `# Kỹ thuật làm bài Cloze Test

## Cloze Test là gì?
Bài đọc có nhiều chỗ trống, mỗi chỗ có 4 đáp án.

## Chiến lược
1. **Đọc toàn bài trước** — hiểu ngữ cảnh chung
2. **Xác định loại từ** cần điền (noun/verb/adj/adv/preposition)
3. **Dùng ngữ cảnh** — đọc câu trước và sau chỗ trống
4. **Kiểm tra collocation** — từ nào đi cùng từ nào
5. **Kiểm tra grammar** — thì, chủ ngữ, etc.

## Mẹo
- Linking words: however, moreover, therefore, although
- Preposition collocations: depend ON, consist OF, result IN`,
        theoryEn: `# Cloze Test Techniques

1. Read the whole passage first
2. Identify the word type needed
3. Use surrounding context
4. Check collocations
5. Verify grammar`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ nối phù hợp",
            instructionEn: "Fill in the appropriate linking word",
            sentences: [
              { text: "He studied hard; ___, he passed the exam.", textEn: "He studied hard; ___, he passed the exam.", answer: "therefore", hint: "cause → result" },
              { text: "She was tired; ___, she continued working.", textEn: "She was tired; ___, she continued working.", answer: "however", hint: "contrast" },
            ],
          },
        ],
        quiz: [
          { question: "In a cloze test, what should you do FIRST?", options: ["Fill in the first blank", "Read the whole passage", "Look at the answers only", "Skip difficult blanks"], answer: 1, explanation: "Reading the whole passage first gives you context." },
          { question: "'He depends ___ his parents.' Choose the correct preposition:", options: ["in", "at", "on", "for"], answer: 2, explanation: "'Depend on' is the correct collocation." },
        ],
      },
      {
        id: "natexam-exp4-stress",
        title: "Stress & Intonation",
        titleEn: "Stress & Intonation",
        level: 2,
        difficulty: "beginner",
        theory: `# Trọng âm & Ngữ điệu

## Quy tắc trọng âm cơ bản

### Danh từ 2 âm tiết → trọng âm ở âm 1
- **RE**cord (n), **PRE**sent (n), **OB**ject (n)

### Động từ 2 âm tiết → trọng âm ở âm 2
- re**CORD** (v), pre**SENT** (v), ob**JECT** (v)

### Hậu tố ảnh hưởng trọng âm
- **-tion/-sion**: trọng âm ở âm trước: edu**CA**tion, de**CI**sion
- **-ic**: trọng âm ở âm trước: scien**TI**fic, rea**LIS**tic
- **-ity**: trọng âm ở âm trước: uni**VER**sity, ac**TI**vity
- **-ous**: không thay đổi: **DAN**gerous, **FA**mous

### Hậu tố giữ nguyên trọng âm
- **-ment, -ness, -ful, -less**: trọng âm không đổi`,
        theoryEn: `# Word Stress Rules

## 2-syllable nouns → stress on 1st syllable
## 2-syllable verbs → stress on 2nd syllable
## Suffixes affecting stress: -tion, -sion, -ic, -ity
## Suffixes NOT affecting stress: -ment, -ness, -ful, -less`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đánh dấu âm tiết được nhấn mạnh (1 hoặc 2)",
            instructionEn: "Mark the stressed syllable (1 or 2)",
            sentences: [
              { text: "The word 'present' (noun) has stress on syllable ___.", textEn: "The word 'present' (noun) has stress on syllable ___.", answer: "1" },
              { text: "The word 'record' (verb) has stress on syllable ___.", textEn: "The word 'record' (verb) has stress on syllable ___.", answer: "2" },
            ],
          },
        ],
        quiz: [
          { question: "Which word has stress on the SECOND syllable?", options: ["Student", "Teacher", "Begin", "Table"], answer: 2, explanation: "'Begin' is a verb — stress on the 2nd syllable: be-GIN." },
          { question: "The suffix '-tion' causes stress to fall on:", options: ["The first syllable", "The syllable before -tion", "The last syllable", "No change"], answer: 1, explanation: "Stress falls on the syllable immediately before '-tion'." },
        ],
      },
      {
        id: "natexam-exp4-vocab-context",
        title: "Vocabulary in Context",
        titleEn: "Vocabulary in Context",
        level: 3,
        difficulty: "intermediate",
        theory: `# Từ vựng theo Ngữ cảnh

## Chiến lược đoán nghĩa từ
1. **Context clues** — Dùng ngữ cảnh xung quanh
2. **Word parts** — Phân tích prefix, root, suffix
3. **Synonyms/Antonyms** — Tìm từ đồng/trái nghĩa gần đó

## Common Prefixes
- **un-, in-, im-, dis-**: not (unhappy, impossible)
- **re-**: again (rewrite, rebuild)
- **pre-**: before (preview, predict)
- **over-**: too much (overwork, overeat)

## Common Suffixes
- **-able/-ible**: can be done (readable, visible)
- **-ment**: noun form (development, agreement)
- **-ful**: full of (beautiful, careful)
- **-less**: without (homeless, careless)`,
        theoryEn: `# Vocabulary in Context

## Strategies for guessing meaning
1. Context clues
2. Word parts (prefix, root, suffix)
3. Nearby synonyms/antonyms`,
        vocabulary: [
          { word: "unprecedented", meaning: "chưa từng có", example: "The crisis was unprecedented.", partOfSpeech: "adjective" },
          { word: "abolish", meaning: "bãi bỏ", example: "They voted to abolish the old law.", partOfSpeech: "verb" },
          { word: "phenomenon", meaning: "hiện tượng", example: "Climate change is a global phenomenon.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đoán nghĩa từ dựa trên ngữ cảnh",
            instructionEn: "Guess the word meaning from context",
            sentences: [
              { text: "The prefix 'un-' in 'unhappy' means ___.", textEn: "The prefix 'un-' in 'unhappy' means ___.", answer: "not" },
              { text: "The suffix '-less' in 'careless' means ___.", textEn: "The suffix '-less' in 'careless' means ___.", answer: "without" },
            ],
          },
        ],
        quiz: [
          { question: "'Unprecedented' most likely means:", options: ["Very common", "Never happened before", "Expected", "Repeated"], answer: 1, explanation: "'Un-' (not) + 'precedent' (previous example) = never happened before." },
          { question: "The word 'rebuild' contains the prefix 're-' meaning:", options: ["Not", "Before", "Again", "Against"], answer: 2, explanation: "'Re-' means 'again', so 'rebuild' means to build again." },
        ],
      },
    ],
  },
];

// Cambridge Expansion — 5 new lessons
const cambridgeExpansion4Modules: LanguageModule[] = [
  {
    id: "cambridge-exp4-skills",
    title: "Cambridge Skills Practice",
    titleEn: "Cambridge Skills Practice",
    icon: "🏆",
    color: "from-purple-500 to-purple-700",
    description: "Luyện kỹ năng cho các kỳ thi Cambridge",
    descriptionEn: "Skills practice for Cambridge exams",
    category: "cambridge",
    language: "english",
    lessons: [
      {
        id: "cambridge-exp4-ket-writing",
        title: "KET Writing: Short Messages",
        titleEn: "KET Writing: Short Messages",
        level: 2,
        difficulty: "beginner",
        theory: `# KET Writing: Short Messages

## Task
Write a short message (25-35 words): note, email, or postcard.

## Structure
1. Include ALL three content points
2. Use appropriate greeting and sign-off
3. Keep it brief but complete

## Example
Task: Write a note to your friend. Say:
- where you are
- what you are doing
- when you will come home

**Answer**: Hi Tom, I'm at the library studying for my English test. I'll be home around 5 PM. See you later! Sarah`,
        theoryEn: `# KET Writing: Short Messages
Write 25-35 words covering all 3 content points.`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành tin nhắn ngắn",
            instructionEn: "Complete the short message",
            sentences: [
              { text: "Hi Maria, I'm at the ___. I'm buying some food for dinner.", textEn: "Hi Maria, I'm at the ___.", answer: "supermarket" },
              { text: "I'll be ___ in about 30 minutes.", textEn: "I'll be ___ in about 30 minutes.", answer: "home" },
            ],
          },
        ],
        quiz: [
          { question: "How many words should a KET short message have?", options: ["10-15", "25-35", "50-60", "100+"], answer: 1, explanation: "KET short messages should be 25-35 words." },
          { question: "What must you include in a KET writing task?", options: ["Only 1 content point", "All 3 content points", "Your full name and address", "A formal greeting"], answer: 1, explanation: "You must address all 3 content points given in the task." },
        ],
      },
      {
        id: "cambridge-exp4-pet-reading",
        title: "PET Reading: Matching",
        titleEn: "PET Reading: Matching",
        level: 3,
        difficulty: "intermediate",
        theory: `# PET Reading: Matching

## Task Type
Match descriptions of people to texts (e.g., book reviews, advertisements).

## Strategy
1. Read the descriptions of people and underline key needs
2. Scan texts for matching information
3. Look for paraphrases (same meaning, different words)
4. Be careful: some texts may partially match

## Key Skills
- **Paraphrasing recognition**: "enjoys outdoor activities" = "loves hiking and camping"
- **Elimination**: Cross out texts once matched
- **Detail focus**: One wrong detail = wrong match`,
        theoryEn: `# PET Reading: Matching
Match people to texts. Underline key needs, scan for paraphrases, eliminate used texts.`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Tìm từ đồng nghĩa (paraphrase)",
            instructionEn: "Find the paraphrase",
            sentences: [
              { text: "'Enjoys cooking' is paraphrased as 'likes to ___ meals'.", textEn: "'Enjoys cooking' is paraphrased as 'likes to ___ meals'.", answer: "prepare" },
              { text: "'Inexpensive' is another word for ___.", textEn: "'Inexpensive' is another word for ___.", answer: "cheap" },
            ],
          },
        ],
        quiz: [
          { question: "What is 'paraphrasing'?", options: ["Copying the exact words", "Saying the same thing in different words", "Translating to another language", "Summarizing a whole book"], answer: 1, explanation: "Paraphrasing means expressing the same meaning using different words." },
          { question: "In PET matching, you should:", options: ["Match based on one keyword only", "Read descriptions carefully and look for paraphrases", "Choose the first text that seems related", "Skip texts that are too long"], answer: 1, explanation: "Careful reading and identifying paraphrases is key." },
        ],
      },
      {
        id: "cambridge-exp4-movers-listening",
        title: "Movers Listening: Coloring & Writing",
        titleEn: "Movers Listening: Coloring & Writing",
        level: 1,
        difficulty: "beginner",
        theory: `# Movers Listening: Coloring & Writing

## Task
Listen and color objects or write words on a picture.

## Tips for Success
1. **Look at the picture carefully** before listening
2. **Know your colors**: red, blue, green, yellow, orange, purple, pink, brown, grey, black
3. **Listen for spelling** — the speaker will spell new words
4. **Listen twice** — use the first time to understand, second to check

## Common Instructions
- "Color the ball blue."
- "Write the word 'PARK' on the sign."
- "Draw a line from the cat to the tree."`,
        theoryEn: `# Movers Listening: Coloring & Writing
Listen and color objects or write words on a picture. Know your colors and listen for spelling.`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Nghe và viết màu đúng",
            instructionEn: "Listen and write the correct color",
            sentences: [
              { text: "The sky is usually ___.", textEn: "The sky is usually ___.", answer: "blue" },
              { text: "Bananas are ___.", textEn: "Bananas are ___.", answer: "yellow" },
              { text: "Grass is ___.", textEn: "Grass is ___.", answer: "green" },
            ],
          },
        ],
        quiz: [
          { question: "In Movers Listening, how many times do you hear the recording?", options: ["Once", "Twice", "Three times", "Four times"], answer: 1, explanation: "You hear the recording twice in Movers Listening." },
          { question: "What should you do BEFORE listening?", options: ["Close your eyes", "Look at the picture carefully", "Write your name", "Talk to your friend"], answer: 1, explanation: "Looking at the picture first helps you predict what you'll hear." },
        ],
      },
      {
        id: "cambridge-exp4-flyers-speaking",
        title: "Flyers Speaking: Tell a Story",
        titleEn: "Flyers Speaking: Tell a Story",
        level: 2,
        difficulty: "beginner",
        theory: `# Flyers Speaking: Tell a Story

## Task
Look at a series of pictures and tell a story.

## Structure
1. **Beginning**: Set the scene — who, where, when
2. **Middle**: What happened — use sequence words
3. **End**: How it ended — feelings, results

## Useful Language
- "One day..." / "Last Saturday..."
- "First... Then... After that... Finally..."
- "He/She decided to..."
- "They were happy because..."

## Tips
- Use PAST TENSE (went, saw, played)
- Describe what you SEE in each picture
- Add feelings: happy, surprised, scared, excited`,
        theoryEn: `# Flyers Speaking: Tell a Story
Look at pictures and narrate. Use past tense, sequence words, and describe feelings.`,
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp câu chuyện đúng thứ tự",
            instructionEn: "Put the story in correct order",
            items: [
              { scrambled: ["the", "went", "park", "They", "to"], correct: "They went to the park" },
              { scrambled: ["happy", "were", "They", "very"], correct: "They were very happy" },
            ],
          },
        ],
        quiz: [
          { question: "Which tense should you mainly use when telling a story about pictures?", options: ["Present simple", "Past simple", "Future simple", "Present continuous"], answer: 1, explanation: "Use past simple because you're telling a story about what happened." },
          { question: "Which sequence word comes LAST?", options: ["First", "Then", "After that", "Finally"], answer: 3, explanation: "'Finally' indicates the last event in a sequence." },
        ],
      },
      {
        id: "cambridge-exp4-starters-vocab",
        title: "Starters: Colors, Shapes & Toys",
        titleEn: "Starters: Colors, Shapes & Toys",
        level: 1,
        difficulty: "beginner",
        theory: `# Starters: Colors, Shapes & Toys

## Colors
red, blue, green, yellow, orange, purple, pink, brown, black, white, grey

## Shapes
- circle (hình tròn) — round like a ball
- square (hình vuông) — 4 equal sides
- triangle (hình tam giác) — 3 sides
- rectangle (hình chữ nhật) — like a door
- star (ngôi sao) — 5 points

## Toys
ball, doll, car, train, teddy bear, puzzle, kite, robot

## Sentences
- "My favourite toy is a ___."
- "It is ___ (color)."
- "It looks like a ___ (shape)."`,
        theoryEn: `# Starters: Colors, Shapes & Toys
Learn basic colors (11), shapes (5), and common toy names (8).`,
        vocabulary: [
          { word: "circle", meaning: "hình tròn", example: "The ball is a circle.", partOfSpeech: "noun" },
          { word: "square", meaning: "hình vuông", example: "The window is a square.", partOfSpeech: "noun" },
          { word: "triangle", meaning: "hình tam giác", example: "Draw a triangle.", partOfSpeech: "noun" },
          { word: "teddy bear", meaning: "gấu bông", example: "She loves her teddy bear.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền màu hoặc hình dạng đúng",
            instructionEn: "Fill in the correct color or shape",
            sentences: [
              { text: "A stop sign is ___.", textEn: "A stop sign is ___.", answer: "red" },
              { text: "A door is shaped like a ___.", textEn: "A door is shaped like a ___.", answer: "rectangle" },
              { text: "A pizza slice looks like a ___.", textEn: "A pizza slice looks like a ___.", answer: "triangle" },
            ],
          },
        ],
        quiz: [
          { question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], answer: 1, explanation: "A triangle has 3 sides." },
          { question: "Which shape has 4 EQUAL sides?", options: ["Rectangle", "Triangle", "Square", "Circle"], answer: 2, explanation: "A square has 4 equal sides." },
        ],
      },
    ],
  },
];

export const englishExpansion4Modules: LanguageModule[] = [
  ...toeicExpansion4Modules,
  ...nationalExamExpansion4Modules,
  ...cambridgeExpansion4Modules,
];
