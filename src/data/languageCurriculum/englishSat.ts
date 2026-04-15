import type { LanguageModule } from "./types";

export const satModules: LanguageModule[] = [
  {
    id: "sat-reading-writing",
    title: "SAT Reading & Writing",
    titleEn: "SAT Reading & Writing",
    icon: "📖",
    color: "purple",
    description: "Chiến lược đọc hiểu và viết cho bài thi SAT Digital",
    descriptionEn: "Reading comprehension and writing strategies for the Digital SAT",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-rw-evidence-reading",
        title: "Evidence-Based Reading",
        titleEn: "Evidence-Based Reading",
        level: 3,
        difficulty: "intermediate",
        theory: `## Đọc hiểu dựa trên bằng chứng (Evidence-Based Reading)

Phần Reading của SAT yêu cầu bạn **đọc đoạn văn và trả lời câu hỏi dựa trên bằng chứng** có trong bài. Không suy đoán — mọi câu trả lời đều phải được hỗ trợ bởi thông tin trong đoạn văn.

### Chiến lược chính:
1. **Đọc câu hỏi trước** — biết mình cần tìm gì
2. **Xác định từ khóa** — tìm vị trí thông tin trong đoạn văn
3. **Loại trừ đáp án sai** — đáp án SAT thường có "bẫy" hấp dẫn
4. **Quay lại đoạn văn** — luôn kiểm chứng đáp án với văn bản gốc

### Các dạng câu hỏi phổ biến:
- **Main Idea**: Ý chính của đoạn văn
- **Detail**: Thông tin chi tiết cụ thể
- **Inference**: Suy luận logic từ thông tin đã cho
- **Purpose**: Mục đích của tác giả khi viết`,
        theoryEn: `## Evidence-Based Reading

The SAT Reading section requires you to **read passages and answer questions based on evidence** found in the text. No guessing — every answer must be supported by information in the passage.

### Key Strategies:
1. **Read questions first** — know what you're looking for
2. **Identify keywords** — locate information in the passage
3. **Eliminate wrong answers** — SAT answers often include attractive "traps"
4. **Go back to the passage** — always verify answers with the original text

### Common Question Types:
- **Main Idea**: Central point of the passage
- **Detail**: Specific factual information
- **Inference**: Logical conclusions from given information
- **Purpose**: Author's intent in writing`,
        proTips: [
          "Đừng bao giờ chọn đáp án chỉ vì nó 'nghe đúng' — phải có bằng chứng từ đoạn văn",
          "Đáp án đúng thường là paraphrase (diễn đạt lại) chứ không copy nguyên văn",
          "Nếu phân vân giữa 2 đáp án, chọn đáp án cụ thể hơn, ít cực đoan hơn",
        ],
        proTipsEn: [
          "Never choose an answer just because it 'sounds right' — evidence from the passage is required",
          "Correct answers are often paraphrases, not direct quotes",
          "When torn between 2 answers, choose the more specific, less extreme one",
        ],
        vocabulary: [
          { word: "evidence", meaning: "bằng chứng", example: "The evidence in the passage supports this conclusion.", partOfSpeech: "noun" },
          { word: "inference", meaning: "suy luận", example: "What inference can be drawn from paragraph 2?", partOfSpeech: "noun" },
          { word: "imply", meaning: "ngụ ý, ám chỉ", example: "The author implies that technology has both benefits and drawbacks.", partOfSpeech: "verb" },
          { word: "excerpt", meaning: "đoạn trích", example: "Read the following excerpt from the passage.", partOfSpeech: "noun" },
          { word: "undermine", meaning: "làm suy yếu", example: "This evidence undermines the opposing argument.", partOfSpeech: "verb" },
          { word: "substantiate", meaning: "chứng minh, chứng thực", example: "The data substantiates the researcher's hypothesis.", partOfSpeech: "verb" },
          { word: "corroborate", meaning: "xác nhận, củng cố", example: "Multiple sources corroborate this finding.", partOfSpeech: "verb" },
          { word: "assertion", meaning: "khẳng định", example: "The author's central assertion is supported by evidence.", partOfSpeech: "noun" },
          { word: "compelling", meaning: "thuyết phục", example: "She presented a compelling argument for reform.", partOfSpeech: "adjective" },
          { word: "nuance", meaning: "sắc thái", example: "The passage explores the nuances of the debate.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống:",
            instructionEn: "Fill in the blanks with the appropriate word:",
            sentences: [
              { text: "The scientist needed more ___ before publishing the results.", textEn: "The scientist needed more ___ before publishing the results.", answer: "evidence", hint: "bằng chứng" },
              { text: "We can ___ from the data that the trend is declining.", textEn: "We can ___ from the data that the trend is declining.", answer: "infer", hint: "suy luận" },
              { text: "The author's ___ that education improves society is well-supported.", textEn: "The author's ___ that education improves society is well-supported.", answer: "assertion", hint: "khẳng định" },
              { text: "Her argument was so ___ that everyone agreed.", textEn: "Her argument was so ___ that everyone agreed.", answer: "compelling", hint: "thuyết phục" },
              { text: "The article explores the ___ of modern technology.", textEn: "The article explores the ___ of modern technology.", answer: "nuances", hint: "sắc thái" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp các từ thành câu hoàn chỉnh:",
            instructionEn: "Reorder the words to form a complete sentence:",
            items: [
              { scrambled: ["evidence", "The", "supports", "the", "conclusion", "clearly"], correct: "The evidence clearly supports the conclusion.", correctEn: "The evidence clearly supports the conclusion." },
              { scrambled: ["can", "from", "What", "passage", "be", "inferred", "the", "?"], correct: "What can be inferred from the passage?", correctEn: "What can be inferred from the passage?" },
              { scrambled: ["undermines", "argument", "This", "the", "data", "opposing"], correct: "This data undermines the opposing argument.", correctEn: "This data undermines the opposing argument." },
            ],
          },
        ],
        quiz: [
          { question: "What is the most important strategy for SAT Reading?", options: ["Skim the entire passage quickly", "Find evidence in the passage for each answer", "Choose the longest answer", "Rely on background knowledge"], answer: 1, explanation: "SAT Reading requires every answer to be supported by evidence found in the passage." },
          { question: "What does an 'Inference' question require?", options: ["Find directly stated information", "Draw logical conclusions from given information", "Guess the author's intent", "Summarize the passage"], answer: 1, explanation: "Inference questions require you to draw logical conclusions from information in the passage." },
          { question: "What does 'corroborate' mean?", options: ["Deny", "Confirm or strengthen", "Analyze", "Compare"], answer: 1, explanation: "'Corroborate' means to confirm or strengthen with additional evidence." },
          { question: "When torn between 2 answers, which should you choose?", options: ["The longer answer", "The more extreme answer", "The more specific, less extreme answer", "The first one that comes to mind"], answer: 2, explanation: "Correct SAT answers tend to be specific and moderate, avoiding extreme words like 'always' or 'never'." },
          { question: "What is a common feature of correct SAT answers?", options: ["They copy text verbatim from the passage", "They paraphrase information from the passage", "They contain the most difficult vocabulary", "They are always the longest option"], answer: 1, explanation: "Correct SAT answers typically paraphrase original information using different wording." },
        ],
      },
      {
        id: "sat-rw-command-evidence",
        title: "Command of Evidence",
        titleEn: "Command of Evidence",
        level: 3,
        difficulty: "intermediate",
        theory: `## Kỹ năng Sử dụng Bằng chứng (Command of Evidence)

Dạng bài **Command of Evidence** yêu cầu bạn xác định đoạn trích cụ thể trong bài hỗ trợ cho câu trả lời trước đó, hoặc chọn bằng chứng tốt nhất cho một lập luận.

### 2 dạng chính:
1. **Textual Evidence**: Chọn đoạn trích hỗ trợ kết luận
2. **Quantitative Evidence**: Phân tích dữ liệu từ bảng/biểu đồ

### Kỹ thuật làm bài:
- Đọc câu hỏi liên kết (paired question) cùng lúc
- Kiểm tra từng lựa chọn trích dẫn — chỉ 1 đúng
- Với biểu đồ: đọc title, axes, legend trước khi phân tích dữ liệu`,
        theoryEn: `## Command of Evidence

**Command of Evidence** questions ask you to identify the specific excerpt that best supports a previous answer, or select the best evidence for a claim.

### 2 Main Types:
1. **Textual Evidence**: Choose quotes supporting a conclusion
2. **Quantitative Evidence**: Analyze data from tables/charts

### Techniques:
- Read paired questions together
- Check each citation option — only one is correct
- For charts: read title, axes, legend before analyzing data`,
        proTips: [
          "Paired questions: trả lời câu hỏi chính trước, sau đó tìm bằng chứng",
          "Bằng chứng tốt nhất là bằng chứng TRỰC TIẾP hỗ trợ — không gián tiếp",
        ],
        proTipsEn: [
          "Paired questions: answer the main question first, then find evidence",
          "Best evidence DIRECTLY supports the claim — not indirectly",
        ],
        vocabulary: [
          { word: "cite", meaning: "trích dẫn", example: "The student cited evidence from paragraph 3.", partOfSpeech: "verb" },
          { word: "bolster", meaning: "củng cố, tăng cường", example: "New data bolsters the original claim.", partOfSpeech: "verb" },
          { word: "refute", meaning: "bác bỏ", example: "The study refutes earlier findings about climate patterns.", partOfSpeech: "verb" },
          { word: "empirical", meaning: "thực nghiệm", example: "Empirical evidence is gathered through observation.", partOfSpeech: "adjective" },
          { word: "quantitative", meaning: "định lượng", example: "Quantitative data includes numbers and statistics.", partOfSpeech: "adjective" },
          { word: "qualitative", meaning: "định tính", example: "Qualitative research explores people's experiences.", partOfSpeech: "adjective" },
          { word: "hypothesis", meaning: "giả thuyết", example: "The hypothesis was tested through experiments.", partOfSpeech: "noun" },
          { word: "methodology", meaning: "phương pháp luận", example: "The research methodology was rigorous.", partOfSpeech: "noun" },
          { word: "credible", meaning: "đáng tin cậy", example: "Only credible sources should be used in academic work.", partOfSpeech: "adjective" },
          { word: "paradigm", meaning: "mô hình, khuôn mẫu", example: "This represents a paradigm shift in scientific thinking.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp vào chỗ trống:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "Please ___ the source of your information.", textEn: "Please ___ the source of your information.", answer: "cite", hint: "trích dẫn" },
              { text: "The new findings ___ the original theory.", textEn: "The new findings ___ the original theory.", answer: "bolster", hint: "củng cố" },
              { text: "The researcher's ___ was tested over three years.", textEn: "The researcher's ___ was tested over three years.", answer: "hypothesis", hint: "giả thuyết" },
              { text: "___ evidence relies on measurable data.", textEn: "___ evidence relies on measurable data.", answer: "Empirical", hint: "thực nghiệm" },
              { text: "The source must be ___ to be accepted.", textEn: "The source must be ___ to be accepted.", answer: "credible", hint: "đáng tin" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["evidence", "claim", "Which", "the", "best", "supports", "?"], correct: "Which evidence best supports the claim?", correctEn: "Which evidence best supports the claim?" },
              { scrambled: ["refuted", "was", "The", "by", "hypothesis", "data", "new"], correct: "The hypothesis was refuted by new data.", correctEn: "The hypothesis was refuted by new data." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'Command of Evidence' require?", options: ["Summarize the passage", "Select evidence supporting your answer", "Write a new paragraph", "Analyze grammar"], answer: 1, explanation: "Command of Evidence requires identifying the specific excerpt that supports your answer." },
          { question: "What does 'refute' mean?", options: ["Agree", "Disprove", "Summarize", "Expand"], answer: 1, explanation: "'Refute' means to disprove or prove something wrong." },
          { question: "How should you approach paired questions?", options: ["Skip the first question", "Answer the main question first, then find evidence", "Only answer the last question", "Guess both"], answer: 1, explanation: "Answering the main question first helps you know what evidence to look for." },
          { question: "What type of evidence is 'empirical evidence'?", options: ["Based on personal opinion", "Gathered through observation and experiments", "Only from textbooks", "Does not need verification"], answer: 1, explanation: "Empirical evidence is gathered through direct observation or experimentation." },
          { question: "What characterizes the best evidence on the SAT?", options: ["Indirectly related", "Directly supports the argument", "Contains difficult vocabulary", "Located at the end of the passage"], answer: 1, explanation: "The best evidence must directly support the claim — not indirectly or vaguely." },
        ],
      },
      {
        id: "sat-rw-words-context",
        title: "Words in Context",
        titleEn: "Words in Context",
        level: 4,
        difficulty: "advanced",
        theory: `## Từ vựng trong Ngữ cảnh (Words in Context)

SAT không kiểm tra từ vựng đơn lẻ mà kiểm tra cách bạn **hiểu nghĩa từ dựa vào ngữ cảnh**. Nhiều từ có nhiều nghĩa — bạn phải chọn nghĩa phù hợp nhất.

### Chiến lược:
1. **Đọc câu chứa từ** và 1-2 câu xung quanh
2. **Che từ gốc** và thử đoán nghĩa từ ngữ cảnh
3. **Thế từng đáp án vào** và kiểm tra logic
4. **Chú ý từ đa nghĩa**: "address" (địa chỉ vs. giải quyết), "novel" (tiểu thuyết vs. mới lạ)`,
        theoryEn: `## Words in Context

The SAT doesn't test vocabulary in isolation — it tests how you **understand word meaning from context**. Many words have multiple meanings; you must choose the most appropriate one.

### Strategies:
1. **Read the sentence** with the word and 1-2 surrounding sentences
2. **Cover the original word** and predict meaning from context
3. **Substitute each answer** and check logic
4. **Watch for polysemy**: "address" (location vs. deal with), "novel" (book vs. new)`,
        proTips: [
          "Thay thế từ gốc bằng từng đáp án — đáp án đúng không thay đổi ý nghĩa câu",
          "Từ quen thuộc thường được dùng với nghĩa ít phổ biến hơn trong SAT",
        ],
        proTipsEn: [
          "Replace the original word with each option — the correct one doesn't change sentence meaning",
          "Familiar words are often used with less common meanings on the SAT",
        ],
        vocabulary: [
          { word: "acute", meaning: "nhạy bén / cấp tính / nghiêm trọng", example: "She has an acute sense of observation.", partOfSpeech: "adjective" },
          { word: "address", meaning: "giải quyết (ngoài nghĩa 'địa chỉ')", example: "The committee will address the issue tomorrow.", partOfSpeech: "verb" },
          { word: "appreciate", meaning: "nhận thức, hiểu rõ (ngoài 'đánh giá cao')", example: "Few people appreciate the complexity of the problem.", partOfSpeech: "verb" },
          { word: "channel", meaning: "hướng, chuyển (ngoài 'kênh')", example: "She channeled her energy into creative work.", partOfSpeech: "verb" },
          { word: "check", meaning: "kiềm chế, ngăn cản (ngoài 'kiểm tra')", example: "The policy was designed to check inflation.", partOfSpeech: "verb" },
          { word: "currency", meaning: "sự phổ biến (ngoài 'tiền tệ')", example: "The idea gained currency among intellectuals.", partOfSpeech: "noun" },
          { word: "entertain", meaning: "xem xét (ngoài 'giải trí')", example: "She refused to entertain the possibility of failure.", partOfSpeech: "verb" },
          { word: "fashion", meaning: "tạo nên, hình thành (ngoài 'thời trang')", example: "He fashioned a solution from limited resources.", partOfSpeech: "verb" },
          { word: "gravity", meaning: "tính nghiêm trọng (ngoài 'trọng lực')", example: "The gravity of the situation was clear to everyone.", partOfSpeech: "noun" },
          { word: "qualify", meaning: "hạn chế, điều chỉnh (ngoài 'đạt chuẩn')", example: "She qualified her earlier statement with new data.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn nghĩa phù hợp nhất trong ngữ cảnh:",
            instructionEn: "Choose the most appropriate meaning in context:",
            sentences: [
              { text: "The doctor described the patient's condition as ___. (nghiêm trọng)", textEn: "The doctor described the patient's condition as ___.", answer: "acute", hint: "nhạy bén / cấp tính" },
              { text: "The government must ___ the rising cost of living. (giải quyết)", textEn: "The government must ___ the rising cost of living.", answer: "address", hint: "giải quyết" },
              { text: "He ___ his frustration into productive work. (chuyển hướng)", textEn: "He ___ his frustration into productive work.", answer: "channeled", hint: "hướng, chuyển" },
              { text: "The leader refused to ___ any objections. (xem xét)", textEn: "The leader refused to ___ any objections.", answer: "entertain", hint: "xem xét" },
              { text: "She ___ her statement after receiving new evidence. (điều chỉnh)", textEn: "She ___ her statement after receiving new evidence.", answer: "qualified", hint: "hạn chế, điều chỉnh" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["the", "appreciated", "Few", "complexity", "of", "problem", "the"], correct: "Few appreciated the complexity of the problem.", correctEn: "Few appreciated the complexity of the problem." },
              { scrambled: ["the", "gravity", "understood", "Everyone", "situation", "of", "the"], correct: "Everyone understood the gravity of the situation.", correctEn: "Everyone understood the gravity of the situation." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'address' mean in 'The mayor will address the concerns'?", options: ["Send mail to", "Deal with", "Provide a location", "Greet"], answer: 1, explanation: "'Address' here means to deal with or attend to (not a physical location)." },
          { question: "What is the most effective strategy for Words in Context?", options: ["Memorize the dictionary", "Substitute each option into the sentence and check logic", "Choose the most common meaning", "Ignore the context"], answer: 1, explanation: "Substitution helps you check which meaning fits best in the given context." },
          { question: "What does 'entertain' mean in 'entertain the idea'?", options: ["Amuse", "Consider or contemplate", "Reject", "Present"], answer: 1, explanation: "'Entertain an idea' means to consider or contemplate a possibility." },
          { question: "What does 'currency' mean in 'the idea gained currency'?", options: ["Money", "Widespread acceptance", "Value", "Speed"], answer: 1, explanation: "'Gain currency' means to become widely accepted or popular." },
          { question: "Why does the SAT use familiar words with uncommon meanings?", options: ["To trick students", "To test real contextual understanding", "Because there aren't enough new words", "To save time"], answer: 1, explanation: "The SAT tests the ability to infer meaning from context — a core reading comprehension skill." },
        ],
      },
      {
        id: "sat-rw-conventions",
        title: "Standard English Conventions",
        titleEn: "Standard English Conventions",
        level: 3,
        difficulty: "intermediate",
        theory: `## Quy tắc Tiếng Anh Chuẩn (Standard English Conventions)

Phần này kiểm tra **ngữ pháp, dấu câu và cấu trúc câu** theo chuẩn viết học thuật.

### Chủ đề thường gặp:
1. **Subject-Verb Agreement**: Chủ ngữ và động từ phải thống nhất số
2. **Pronoun-Antecedent Agreement**: Đại từ phải khớp với danh từ thay thế
3. **Punctuation**: Dấu phẩy, chấm phẩy, dấu hai chấm, gạch ngang
4. **Modifier Placement**: Trạng từ/tính từ phải đặt đúng vị trí
5. **Parallel Structure**: Các thành phần ngang hàng phải cùng cấu trúc
6. **Verb Tense Consistency**: Thì động từ nhất quán trong đoạn`,
        theoryEn: `## Standard English Conventions

This section tests **grammar, punctuation, and sentence structure** per academic writing standards.

### Common Topics:
1. **Subject-Verb Agreement**: Subject and verb must agree in number
2. **Pronoun-Antecedent Agreement**: Pronouns must match their antecedents
3. **Punctuation**: Commas, semicolons, colons, dashes
4. **Modifier Placement**: Modifiers must be placed correctly
5. **Parallel Structure**: Equal elements must use the same form
6. **Verb Tense Consistency**: Tenses must be consistent within a passage`,
        proTips: [
          "Tìm chủ ngữ thật — bỏ qua các cụm chèn giữa để tránh lỗi agreement",
          "Semicolon (;) chỉ nối 2 mệnh đề độc lập — không dùng trước 'because', 'although'",
          "Parallel structure: running, swimming, AND cycling (không phải 'to cycle')",
        ],
        proTipsEn: [
          "Find the real subject — skip intervening phrases to avoid agreement errors",
          "Semicolons (;) only join 2 independent clauses — not before 'because', 'although'",
          "Parallel structure: running, swimming, AND cycling (not 'to cycle')",
        ],
        vocabulary: [
          { word: "modifier", meaning: "bổ ngữ, từ bổ nghĩa", example: "A dangling modifier creates confusion in a sentence.", partOfSpeech: "noun" },
          { word: "clause", meaning: "mệnh đề", example: "An independent clause can stand alone as a sentence.", partOfSpeech: "noun" },
          { word: "antecedent", meaning: "tiền ngữ (từ được đại từ thay thế)", example: "The pronoun must agree with its antecedent.", partOfSpeech: "noun" },
          { word: "conjunction", meaning: "liên từ", example: "Coordinating conjunctions include and, but, or.", partOfSpeech: "noun" },
          { word: "semicolon", meaning: "dấu chấm phẩy", example: "Use a semicolon to join related independent clauses.", partOfSpeech: "noun" },
          { word: "appositive", meaning: "đồng vị ngữ", example: "An appositive renames a nearby noun.", partOfSpeech: "noun" },
          { word: "subordinate", meaning: "phụ thuộc", example: "A subordinate clause cannot stand alone.", partOfSpeech: "adjective" },
          { word: "concise", meaning: "ngắn gọn, súc tích", example: "Good writing is concise and clear.", partOfSpeech: "adjective" },
          { word: "redundant", meaning: "thừa, lặp lại", example: "'Free gift' is redundant because gifts are always free.", partOfSpeech: "adjective" },
          { word: "syntax", meaning: "cú pháp", example: "Proper syntax ensures sentences are grammatically correct.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn dạng đúng của động từ:",
            instructionEn: "Choose the correct verb form:",
            sentences: [
              { text: "The group of students ___ working on the project.", textEn: "The group of students ___ working on the project.", answer: "is", hint: "chủ ngữ là 'group' (số ít)" },
              { text: "Neither the teacher nor the students ___ the answer.", textEn: "Neither the teacher nor the students ___ the answer.", answer: "know", hint: "gần nhất là 'students' (số nhiều)" },
              { text: "Each of the candidates ___ prepared a speech.", textEn: "Each of the candidates ___ prepared a speech.", answer: "has", hint: "'each' luôn số ít" },
              { text: "The data from the experiments ___ the hypothesis.", textEn: "The data from the experiments ___ the hypothesis.", answer: "support", hint: "'data' là số nhiều" },
              { text: "Running, swimming, and ___ are great exercises.", textEn: "Running, swimming, and ___ are great exercises.", answer: "cycling", hint: "parallel structure" },
            ],
          },
        ],
        quiz: [
          { question: "Which sentence is grammatically correct?", options: ["The team are ready.", "The team is ready.", "The team were ready.", "The team have been ready."], answer: 1, explanation: "'Team' is a collective noun treated as singular in American English → use 'is'." },
          { question: "What is the purpose of a semicolon (;)?", options: ["Join a dependent clause to a main clause", "Join 2 related independent clauses", "Replace a comma", "End a question"], answer: 1, explanation: "A semicolon joins two related independent clauses without a conjunction." },
          { question: "When does a 'dangling modifier' error occur?", options: ["Using the wrong verb tense", "The modifier doesn't clearly refer to a noun", "Missing a comma", "Using the wrong pronoun"], answer: 1, explanation: "A dangling modifier occurs when it's unclear which noun the modifier is describing." },
          { question: "What does 'redundant' mean?", options: ["Lacking information", "Unnecessarily repetitive", "Grammatically incorrect", "Too short"], answer: 1, explanation: "'Redundant' means repeating information that is already clear or unnecessary." },
          { question: "What does parallel structure require?", options: ["Sentences must be equal in length", "Coordinate elements must use the same grammatical form", "Always use gerunds", "Sentences must have 3 parts"], answer: 1, explanation: "Parallel structure requires listed or compared elements to share the same grammatical form." },
        ],
      },
    ],
  },
  {
    id: "sat-advanced-vocab",
    title: "SAT Advanced Vocabulary",
    titleEn: "SAT Advanced Vocabulary",
    icon: "🎯",
    color: "indigo",
    description: "Từ vựng nâng cao thường xuất hiện trong bài thi SAT",
    descriptionEn: "Advanced vocabulary frequently appearing on the SAT",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-vocab-set1",
        title: "High-Frequency SAT Words – Set 1",
        titleEn: "High-Frequency SAT Words – Set 1",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ Vựng SAT Tần Suất Cao – Phần 1

Những từ này xuất hiện thường xuyên trong đề thi SAT. Nắm vững chúng giúp bạn hiểu đoạn văn nhanh hơn và trả lời chính xác hơn.

### Mẹo học từ vựng SAT:
- Học theo **ngữ cảnh**, không học đơn lẻ
- Tạo **flashcards** với câu ví dụ
- Sử dụng từ mới trong **viết và nói** hàng ngày
- Tìm **word families**: ambiguous → ambiguity → unambiguously`,
        theoryEn: `## High-Frequency SAT Words – Set 1

These words appear frequently on the SAT. Mastering them helps you understand passages faster and answer more accurately.

### SAT Vocabulary Tips:
- Learn in **context**, not isolation
- Create **flashcards** with example sentences
- Use new words in daily **writing and speaking**
- Find **word families**: ambiguous → ambiguity → unambiguously`,
        proTips: [
          "Mỗi ngày học 5 từ mới + ôn lại 10 từ cũ = 150 từ/tháng",
          "Dùng từ mới trong câu tự tạo — ghi nhớ sâu hơn 3 lần",
        ],
        proTipsEn: [
          "Learn 5 new words + review 10 old ones daily = 150 words/month",
          "Use new words in self-created sentences — 3x deeper retention",
        ],
        vocabulary: [
          { word: "ubiquitous", meaning: "có mặt khắp nơi", example: "Smartphones have become ubiquitous in modern society.", partOfSpeech: "adjective" },
          { word: "pragmatic", meaning: "thực dụng, thực tế", example: "She took a pragmatic approach to solving the problem.", partOfSpeech: "adjective" },
          { word: "ambiguous", meaning: "mơ hồ, không rõ ràng", example: "The instructions were ambiguous and confused everyone.", partOfSpeech: "adjective" },
          { word: "eloquent", meaning: "hùng biện, lưu loát", example: "Her eloquent speech moved the entire audience.", partOfSpeech: "adjective" },
          { word: "meticulous", meaning: "tỉ mỉ, cẩn thận", example: "He is meticulous about every detail in his work.", partOfSpeech: "adjective" },
          { word: "resilient", meaning: "kiên cường, có sức bật", example: "The community proved resilient after the natural disaster.", partOfSpeech: "adjective" },
          { word: "disparity", meaning: "sự chênh lệch", example: "There is a growing disparity between rich and poor.", partOfSpeech: "noun" },
          { word: "scrutinize", meaning: "xem xét kỹ lưỡng", example: "The committee scrutinized every proposal carefully.", partOfSpeech: "verb" },
          { word: "proliferate", meaning: "sinh sôi, lan rộng", example: "Social media platforms have proliferated over the past decade.", partOfSpeech: "verb" },
          { word: "advocate", meaning: "ủng hộ, vận động (v); người ủng hộ (n)", example: "She advocates for equal access to education.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ SAT phù hợp:",
            instructionEn: "Fill in with the appropriate SAT word:",
            sentences: [
              { text: "Wi-Fi has become ___ in coffee shops and airports.", textEn: "Wi-Fi has become ___ in coffee shops and airports.", answer: "ubiquitous", hint: "có mặt khắp nơi" },
              { text: "A ___ leader focuses on what works, not just ideals.", textEn: "A ___ leader focuses on what works, not just ideals.", answer: "pragmatic", hint: "thực dụng" },
              { text: "The ___ between urban and rural education needs attention.", textEn: "The ___ between urban and rural education needs attention.", answer: "disparity", hint: "sự chênh lệch" },
              { text: "Scientists ___ the data before publishing their findings.", textEn: "Scientists ___ the data before publishing their findings.", answer: "scrutinize", hint: "xem xét kỹ" },
              { text: "The ___ speaker received a standing ovation.", textEn: "The ___ speaker received a standing ovation.", answer: "eloquent", hint: "hùng biện" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại câu:",
            instructionEn: "Reorder the sentence:",
            items: [
              { scrambled: ["proved", "community", "after", "The", "resilient", "the", "disaster"], correct: "The community proved resilient after the disaster.", correctEn: "The community proved resilient after the disaster." },
              { scrambled: ["for", "advocates", "She", "equal", "education", "access", "to"], correct: "She advocates for equal access to education.", correctEn: "She advocates for equal access to education." },
            ],
          },
        ],
        quiz: [
          { question: "What does 'ubiquitous' mean?", options: ["Rare", "Found everywhere", "Expensive", "Complex"], answer: 1, explanation: "'Ubiquitous' means found everywhere, extremely widespread." },
          { question: "What kind of person does 'meticulous' describe?", options: ["Lazy", "Extremely careful and detail-oriented", "Short-tempered", "Indifferent"], answer: 1, explanation: "'Meticulous' describes someone who pays great attention to every small detail." },
          { question: "What does 'proliferate' mean?", options: ["Gradually decrease", "Disappear", "Spread or increase rapidly", "Be prohibited"], answer: 2, explanation: "'Proliferate' means to increase rapidly in number or spread widely." },
          { question: "Which word is a noun?", options: ["Pragmatic", "Eloquent", "Disparity", "Resilient"], answer: 2, explanation: "'Disparity' is a noun meaning a gap or difference. The others are adjectives." },
          { question: "What does 'scrutinize' mean?", options: ["Overlook", "Examine closely and thoroughly", "Destroy", "Create"], answer: 1, explanation: "'Scrutinize' means to examine or inspect something carefully and in detail." },
        ],
      },
      {
        id: "sat-vocab-set2",
        title: "High-Frequency SAT Words – Set 2",
        titleEn: "High-Frequency SAT Words – Set 2",
        level: 4,
        difficulty: "advanced",
        theory: `## Từ Vựng SAT Tần Suất Cao – Phần 2

Phần 2 bao gồm các từ nâng cao hơn, thường xuất hiện trong đoạn văn phức tạp về khoa học, xã hội và nghệ thuật.

### Kỹ thuật ghi nhớ nâng cao:
- **Etymology (gốc từ)**: Biết gốc Latin/Greek giúp đoán nghĩa từ mới
- **Association**: Liên kết từ mới với hình ảnh hoặc câu chuyện
- **Spaced Repetition**: Ôn lại theo chu kỳ 1-3-7-14 ngày`,
        theoryEn: `## High-Frequency SAT Words – Set 2

Set 2 includes more advanced words, frequently appearing in complex passages about science, society, and the arts.

### Advanced Memorization Techniques:
- **Etymology**: Knowing Latin/Greek roots helps predict new word meanings
- **Association**: Link new words to images or stories
- **Spaced Repetition**: Review on a 1-3-7-14 day cycle`,
        vocabulary: [
          { word: "ephemeral", meaning: "phù du, thoáng qua", example: "Social media fame is often ephemeral.", partOfSpeech: "adjective" },
          { word: "juxtapose", meaning: "đặt cạnh nhau để so sánh", example: "The artist juxtaposed old and new techniques.", partOfSpeech: "verb" },
          { word: "paradox", meaning: "nghịch lý", example: "It's a paradox that we have more information but less understanding.", partOfSpeech: "noun" },
          { word: "exacerbate", meaning: "làm trầm trọng hơn", example: "The drought exacerbated the food crisis.", partOfSpeech: "verb" },
          { word: "mitigate", meaning: "giảm nhẹ, xoa dịu", example: "New policies aim to mitigate the effects of climate change.", partOfSpeech: "verb" },
          { word: "unprecedented", meaning: "chưa từng có tiền lệ", example: "The pandemic caused unprecedented disruption.", partOfSpeech: "adjective" },
          { word: "candid", meaning: "thẳng thắn, bộc trực", example: "She gave a candid assessment of the situation.", partOfSpeech: "adjective" },
          { word: "catalyst", meaning: "chất xúc tác, tác nhân thúc đẩy", example: "The discovery was a catalyst for further research.", partOfSpeech: "noun" },
          { word: "digress", meaning: "lạc đề", example: "The speaker tended to digress from the main topic.", partOfSpeech: "verb" },
          { word: "vindicate", meaning: "minh oan, chứng minh đúng", example: "New evidence vindicated the accused scientist.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ SAT phù hợp:",
            instructionEn: "Fill in with the appropriate SAT word:",
            sentences: [
              { text: "Beauty is ___; it fades with time.", textEn: "Beauty is ___; it fades with time.", answer: "ephemeral", hint: "phù du" },
              { text: "Pollution will ___ the health problems in the city.", textEn: "Pollution will ___ the health problems in the city.", answer: "exacerbate", hint: "làm trầm trọng" },
              { text: "The government seeks to ___ the impact of inflation.", textEn: "The government seeks to ___ the impact of inflation.", answer: "mitigate", hint: "giảm nhẹ" },
              { text: "The invention served as a ___ for the industrial revolution.", textEn: "The invention served as a ___ for the industrial revolution.", answer: "catalyst", hint: "chất xúc tác" },
              { text: "The DNA evidence ___ the wrongly convicted man.", textEn: "The DNA evidence ___ the wrongly convicted man.", answer: "vindicated", hint: "minh oan" },
            ],
          },
        ],
        quiz: [
          { question: "What does 'ephemeral' describe?", options: ["Eternal", "Short-lived, fleeting", "Important", "Complex"], answer: 1, explanation: "'Ephemeral' means lasting only for a very short time." },
          { question: "What does 'juxtapose' mean?", options: ["Separate", "Place side by side for comparison", "Combine", "Oppose"], answer: 1, explanation: "'Juxtapose' means to place two things close together to highlight contrast or comparison." },
          { question: "What is the relationship between 'exacerbate' and 'mitigate'?", options: ["Synonyms", "Antonyms", "Unrelated", "Same part of speech but different meaning"], answer: 1, explanation: "'Exacerbate' (make worse) and 'mitigate' (make less severe) are antonyms." },
          { question: "What does 'unprecedented' mean?", options: ["Has happened before", "Never done or known before", "Predicted in advance", "Ordinary"], answer: 1, explanation: "'Unprecedented' means never having happened or existed before." },
          { question: "Which word means 'honest and straightforward'?", options: ["Digress", "Candid", "Ephemeral", "Paradox"], answer: 1, explanation: "'Candid' means truthful and straightforward; frank." },
        ],
      },
      {
        id: "sat-vocab-roots",
        title: "Roots, Prefixes & Suffixes",
        titleEn: "Roots, Prefixes & Suffixes",
        level: 3,
        difficulty: "intermediate",
        theory: `## Gốc từ, Tiền tố & Hậu tố (Roots, Prefixes & Suffixes)

Hiểu **word roots** (gốc từ Latin/Greek) giúp bạn đoán nghĩa của từ chưa biết — kỹ năng cực kỳ hữu ích trong SAT.

### Tiền tố phổ biến:
| Prefix | Nghĩa | Ví dụ |
|--------|--------|-------|
| anti- | chống | antisocial |
| bene- | tốt | beneficial |
| mal- | xấu | malfunction |
| mis- | sai | mislead |
| pre- | trước | predict |
| re- | lại | reconsider |

### Gốc từ phổ biến:
| Root | Nghĩa | Ví dụ |
|------|--------|-------|
| aud | nghe | audience |
| dict | nói | predict |
| graph | viết | biography |
| port | mang | transport |
| scrib | viết | describe |
| spec | nhìn | inspect |`,
        theoryEn: `## Roots, Prefixes & Suffixes

Understanding **word roots** (Latin/Greek origins) helps you guess meanings of unknown words — an extremely useful SAT skill.

### Common Prefixes:
| Prefix | Meaning | Example |
|--------|---------|---------|
| anti- | against | antisocial |
| bene- | good | beneficial |
| mal- | bad | malfunction |
| mis- | wrong | mislead |
| pre- | before | predict |
| re- | again | reconsider |

### Common Roots:
| Root | Meaning | Example |
|------|---------|---------|
| aud | hear | audience |
| dict | say | predict |
| graph | write | biography |
| port | carry | transport |
| scrib | write | describe |
| spec | look | inspect |`,
        vocabulary: [
          { word: "benevolent", meaning: "nhân từ (bene = tốt)", example: "The benevolent donor supported many charities.", partOfSpeech: "adjective" },
          { word: "malevolent", meaning: "ác ý (mal = xấu)", example: "The villain's malevolent plan was foiled.", partOfSpeech: "adjective" },
          { word: "circumscribe", meaning: "giới hạn (circum = xung quanh + scrib = viết)", example: "Laws circumscribe individual freedoms for the common good.", partOfSpeech: "verb" },
          { word: "retrospect", meaning: "nhìn lại (retro = quay lại + spec = nhìn)", example: "In retrospect, the decision was unwise.", partOfSpeech: "noun" },
          { word: "preclude", meaning: "ngăn cản trước (pre = trước + clud = đóng)", example: "Lack of funds precluded further research.", partOfSpeech: "verb" },
          { word: "transcend", meaning: "vượt qua (trans = qua + scend = leo)", example: "Great art transcends cultural boundaries.", partOfSpeech: "verb" },
          { word: "antipathy", meaning: "ác cảm (anti = chống + path = cảm xúc)", example: "He felt deep antipathy toward dishonesty.", partOfSpeech: "noun" },
          { word: "ambivalent", meaning: "mâu thuẫn (ambi = cả hai + val = giá trị)", example: "She felt ambivalent about moving abroad.", partOfSpeech: "adjective" },
          { word: "elucidate", meaning: "làm sáng tỏ (e = ra + luc = ánh sáng)", example: "The professor elucidated the complex theory.", partOfSpeech: "verb" },
          { word: "magnanimous", meaning: "rộng lượng (magn = lớn + anim = tâm hồn)", example: "The magnanimous leader forgave his opponents.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dựa vào gốc từ, điền từ phù hợp:",
            instructionEn: "Based on word roots, fill in the appropriate word:",
            sentences: [
              { text: "The ___ queen was loved by all her people. (bene = tốt)", textEn: "The ___ queen was loved by all her people.", answer: "benevolent", hint: "nhân từ" },
              { text: "In ___, I should have studied harder. (retro = quay lại, spec = nhìn)", textEn: "In ___, I should have studied harder.", answer: "retrospect", hint: "nhìn lại" },
              { text: "Music can ___ language barriers. (trans = qua)", textEn: "Music can ___ language barriers.", answer: "transcend", hint: "vượt qua" },
              { text: "She was ___ about accepting the job offer. (ambi = cả hai)", textEn: "She was ___ about accepting the job offer.", answer: "ambivalent", hint: "mâu thuẫn" },
              { text: "The teacher ___ the difficult concept for students. (luc = ánh sáng)", textEn: "The teacher ___ the difficult concept for students.", answer: "elucidated", hint: "làm sáng tỏ" },
            ],
          },
        ],
        quiz: [
          { question: "What does the prefix 'mal-' mean?", options: ["Good", "Bad", "Many", "Before"], answer: 1, explanation: "'Mal-' means bad or evil. Examples: malfunction, malevolent." },
          { question: "What does the root 'spec' mean?", options: ["Hear", "Write", "Look/See", "Carry"], answer: 2, explanation: "'Spec' means to look or see. Examples: inspect, spectacle, retrospect." },
          { question: "How do 'benevolent' and 'malevolent' differ?", options: ["Prefix: bene (good) vs mal (bad)", "Different suffixes", "Different roots", "Unrelated"], answer: 0, explanation: "Both share the root 'vol' (will) but differ in prefix: bene (good) → kind, mal (bad) → evil." },
          { question: "What does 'preclude' mean?", options: ["Include", "Prevent from happening", "Conclude", "Predict"], answer: 1, explanation: "'Pre-' (before) + 'clud' (close) → to prevent something from happening." },
          { question: "Why is learning word roots important for the SAT?", options: ["To write more beautifully", "To guess meanings of unknown words in passages", "To speak better", "It's not important"], answer: 1, explanation: "Knowing word roots helps you guess meanings of unfamiliar words — an essential SAT Reading skill." },
        ],
      },
    ],
  },
  {
    id: "sat-writing-language",
    title: "SAT Writing & Language",
    titleEn: "SAT Writing & Language",
    icon: "✍️",
    color: "teal",
    description: "Kỹ năng viết và ngôn ngữ cho bài thi SAT",
    descriptionEn: "Writing and language skills for the SAT exam",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-wl-expression-ideas",
        title: "Expression of Ideas",
        titleEn: "Expression of Ideas",
        level: 4,
        difficulty: "advanced",
        theory: `## Diễn đạt Ý tưởng (Expression of Ideas)

Phần Expression of Ideas kiểm tra khả năng **tổ chức, phát triển và truyền đạt ý tưởng** hiệu quả trong văn viết.

### 3 khía cạnh chính:
1. **Development**: Thêm, sửa hoặc giữ nguyên câu/đoạn để phát triển ý
2. **Organization**: Sắp xếp câu/đoạn theo trình tự logic
3. **Effective Language Use**: Chọn từ/cụm từ chính xác và súc tích

### Dạng câu hỏi:
- "Câu nào nên thêm vào sau câu 3?" (Development)
- "Vị trí tốt nhất cho đoạn [2] là ở đâu?" (Organization)
- "Từ/cụm từ nào thay thế phù hợp nhất?" (Effective Language)`,
        theoryEn: `## Expression of Ideas

Expression of Ideas tests your ability to **organize, develop, and convey ideas** effectively in writing.

### 3 Key Aspects:
1. **Development**: Add, revise, or retain sentences/paragraphs to develop ideas
2. **Organization**: Arrange sentences/paragraphs in logical order
3. **Effective Language Use**: Choose precise and concise words/phrases

### Question Types:
- "Which sentence should be added after sentence 3?" (Development)
- "Where should paragraph [2] be placed?" (Organization)
- "Which word/phrase best replaces the underlined portion?" (Effective Language)`,
        proTips: [
          "Đọc cả đoạn văn trước khi trả lời — hiểu big picture",
          "Câu thêm vào phải liên kết với câu trước VÀ câu sau",
          "Chọn đáp án ngắn gọn nhất mà vẫn đủ nghĩa — SAT ưu tiên conciseness",
        ],
        proTipsEn: [
          "Read the full paragraph before answering — understand the big picture",
          "Added sentences must connect to BOTH the preceding and following sentences",
          "Choose the most concise option that conveys full meaning — SAT values conciseness",
        ],
        vocabulary: [
          { word: "cohesion", meaning: "sự liên kết", example: "Good writing has strong cohesion between paragraphs.", partOfSpeech: "noun" },
          { word: "coherence", meaning: "sự mạch lạc", example: "The essay lacked coherence and was difficult to follow.", partOfSpeech: "noun" },
          { word: "transition", meaning: "sự chuyển tiếp", example: "Use transitions to connect your ideas smoothly.", partOfSpeech: "noun" },
          { word: "elaborate", meaning: "giải thích chi tiết", example: "Could you elaborate on your main argument?", partOfSpeech: "verb" },
          { word: "succinct", meaning: "ngắn gọn, súc tích", example: "Her presentation was succinct yet informative.", partOfSpeech: "adjective" },
          { word: "verbose", meaning: "dài dòng", example: "Avoid verbose writing; be concise instead.", partOfSpeech: "adjective" },
          { word: "synthesize", meaning: "tổng hợp", example: "The essay synthesizes ideas from multiple sources.", partOfSpeech: "verb" },
          { word: "articulate", meaning: "diễn đạt rõ ràng", example: "She articulated her position clearly.", partOfSpeech: "verb" },
          { word: "judiciously", meaning: "khôn ngoan, thận trọng", example: "Use evidence judiciously to support your claims.", partOfSpeech: "adverb" },
          { word: "pertinent", meaning: "thích hợp, liên quan", example: "Only include pertinent information in your essay.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "The essay needs better ___ between paragraphs.", textEn: "The essay needs better ___ between paragraphs.", answer: "transitions", hint: "chuyển tiếp" },
              { text: "Your answer is too ___; please be more concise.", textEn: "Your answer is too ___; please be more concise.", answer: "verbose", hint: "dài dòng" },
              { text: "She ___ her argument with clear examples.", textEn: "She ___ her argument with clear examples.", answer: "articulated", hint: "diễn đạt rõ" },
              { text: "Only include ___ details in your response.", textEn: "Only include ___ details in your response.", answer: "pertinent", hint: "thích hợp" },
              { text: "The conclusion should ___ all the key points.", textEn: "The conclusion should ___ all the key points.", answer: "synthesize", hint: "tổng hợp" },
            ],
          },
        ],
        quiz: [
          { question: "What type of writing does the SAT favor?", options: ["Verbose and complex", "Concise yet complete in meaning", "Using many difficult words", "The longer the sentence, the better"], answer: 1, explanation: "The SAT always favors conciseness — expressing ideas fully with the fewest words possible." },
          { question: "How do 'cohesion' and 'coherence' differ?", options: ["They mean the same thing", "Cohesion = sentence/paragraph links; Coherence = overall logical flow", "Coherence = correct grammar", "No difference"], answer: 1, explanation: "Cohesion is the linking between sentences/paragraphs (micro); coherence is overall logical flow (macro)." },
          { question: "Which word is the opposite of 'verbose'?", options: ["Eloquent", "Succinct", "Elaborate", "Articulate"], answer: 1, explanation: "'Verbose' (wordy) is the opposite of 'succinct' (brief and clear)." },
          { question: "When adding a sentence to a paragraph, what should you check?", options: ["Whether the sentence is long", "Whether it connects to both the preceding AND following sentences", "Whether it has difficult words", "Whether it contains examples"], answer: 1, explanation: "An added sentence must create a logical bridge between the sentence before and after it." },
          { question: "What does 'pertinent' mean?", options: ["Unimportant", "Relevant and directly applicable", "Complex", "Easy to understand"], answer: 1, explanation: "'Pertinent' means directly relevant or applicable to the matter at hand." },
        ],
      },
      {
        id: "sat-wl-rhetorical-synthesis",
        title: "Rhetorical Synthesis",
        titleEn: "Rhetorical Synthesis",
        level: 4,
        difficulty: "advanced",
        theory: `## Tổng hợp Tu từ (Rhetorical Synthesis)

Đây là dạng câu hỏi **mới trong Digital SAT**. Bạn được cho một số ghi chú (bullet points) và phải chọn câu tổng hợp thông tin theo yêu cầu cụ thể.

### Cách làm:
1. Đọc kỹ **yêu cầu** — nhấn mạnh/so sánh/tương phản?
2. Đọc qua các **ghi chú** — xác định thông tin liên quan
3. Kiểm tra mỗi đáp án:
   - Có bao gồm thông tin yêu cầu không?
   - Có chính xác với ghi chú không?
   - Có phù hợp với mục đích giao tiếp (purpose) không?`,
        theoryEn: `## Rhetorical Synthesis

This is a **new question type on the Digital SAT**. You're given notes (bullet points) and must choose the sentence that synthesizes information according to a specific purpose.

### Approach:
1. Read the **prompt** carefully — emphasize/compare/contrast?
2. Scan the **notes** — identify relevant information
3. Check each answer:
   - Does it include the required information?
   - Is it accurate per the notes?
   - Does it match the communication purpose?`,
        vocabulary: [
          { word: "rhetorical", meaning: "tu từ, liên quan đến nghệ thuật diễn đạt", example: "The rhetorical question was meant to provoke thought.", partOfSpeech: "adjective" },
          { word: "synthesis", meaning: "sự tổng hợp", example: "The paper is a synthesis of several research studies.", partOfSpeech: "noun" },
          { word: "emphasize", meaning: "nhấn mạnh", example: "The report emphasizes the need for immediate action.", partOfSpeech: "verb" },
          { word: "contrast", meaning: "tương phản", example: "The essay contrasts urban and rural lifestyles.", partOfSpeech: "verb" },
          { word: "convey", meaning: "truyền đạt", example: "The graph conveys the declining trend clearly.", partOfSpeech: "verb" },
          { word: "premise", meaning: "tiền đề", example: "The argument is based on a false premise.", partOfSpeech: "noun" },
          { word: "concession", meaning: "sự nhượng bộ", example: "The author makes a concession before presenting the main argument.", partOfSpeech: "noun" },
          { word: "rebut", meaning: "phản bác", example: "She rebutted every point in the opposing argument.", partOfSpeech: "verb" },
          { word: "substantive", meaning: "có thực chất, quan trọng", example: "We need substantive changes, not superficial ones.", partOfSpeech: "adjective" },
          { word: "pivotal", meaning: "then chốt, quan trọng", example: "This was a pivotal moment in the debate.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blanks:",
            sentences: [
              { text: "The essay is a ___ of ideas from three different authors.", textEn: "The essay is a ___ of ideas from three different authors.", answer: "synthesis", hint: "tổng hợp" },
              { text: "The speaker wanted to ___ the importance of education.", textEn: "The speaker wanted to ___ the importance of education.", answer: "emphasize", hint: "nhấn mạnh" },
              { text: "Her argument was based on a flawed ___.", textEn: "Her argument was based on a flawed ___.", answer: "premise", hint: "tiền đề" },
              { text: "This decision was ___ in shaping the company's future.", textEn: "This decision was ___ in shaping the company's future.", answer: "pivotal", hint: "then chốt" },
              { text: "Charts and graphs help ___ complex data visually.", textEn: "Charts and graphs help ___ complex data visually.", answer: "convey", hint: "truyền đạt" },
            ],
          },
        ],
        quiz: [
          { question: "What type of question is Rhetorical Synthesis?", options: ["Essay writing", "Combining information from notes to meet a specific purpose", "Grammar analysis", "Translation"], answer: 1, explanation: "Rhetorical Synthesis requires combining information from given notes to fulfill a specific communicative purpose." },
          { question: "What does 'premise' mean?", options: ["Conclusion", "A foundational assumption", "Evidence", "Rebuttal"], answer: 1, explanation: "'Premise' is a foundational assumption on which an argument is based." },
          { question: "What is the first step when tackling Rhetorical Synthesis?", options: ["Read the answer choices first", "Carefully read the purpose/prompt", "Guess the answer", "Skip the notes"], answer: 1, explanation: "Understanding the purpose helps you know which information to synthesize and how." },
          { question: "Which word is closest in meaning to 'pivotal'?", options: ["Minor", "Crucial", "Optional", "Ordinary"], answer: 1, explanation: "'Pivotal' (extremely important) is closest in meaning to 'crucial'." },
          { question: "What is a 'concession' in argumentation?", options: ["Full agreement", "Acknowledging a point before countering", "Rejecting everything", "Final conclusion"], answer: 1, explanation: "A concession is acknowledging an opponent's point before presenting your main argument." },
        ],
      },
      {
        id: "sat-wl-transitions",
        title: "Transitions & Flow",
        titleEn: "Transitions & Flow",
        level: 3,
        difficulty: "intermediate",
        theory: `## Từ nối & Mạch văn (Transitions & Flow)

Transitions (từ/cụm từ chuyển tiếp) giúp **kết nối ý tưởng** giữa các câu và đoạn văn, tạo dòng chảy mạch lạc cho bài viết.

### Phân loại Transitions:

| Mục đích | Từ nối |
|----------|--------|
| Thêm ý | Moreover, Furthermore, In addition |
| Tương phản | However, Nevertheless, On the other hand |
| Nguyên nhân | Therefore, Consequently, As a result |
| Ví dụ | For instance, Specifically, In particular |
| Kết luận | In conclusion, Ultimately, To sum up |
| Thời gian | Meanwhile, Subsequently, Previously |

### Cách chọn transition đúng:
1. Đọc câu TRƯỚC và SAU chỗ trống
2. Xác định **mối quan hệ logic** giữa 2 ý
3. Chọn transition phù hợp với mối quan hệ đó`,
        theoryEn: `## Transitions & Flow

Transitions help **connect ideas** between sentences and paragraphs, creating smooth flow in writing.

### Transition Categories:

| Purpose | Transitions |
|---------|------------|
| Addition | Moreover, Furthermore, In addition |
| Contrast | However, Nevertheless, On the other hand |
| Cause/Effect | Therefore, Consequently, As a result |
| Example | For instance, Specifically, In particular |
| Conclusion | In conclusion, Ultimately, To sum up |
| Time | Meanwhile, Subsequently, Previously |

### Choosing the Right Transition:
1. Read the sentence BEFORE and AFTER the blank
2. Identify the **logical relationship** between the two ideas
3. Choose the transition matching that relationship`,
        vocabulary: [
          { word: "moreover", meaning: "hơn nữa", example: "The plan is effective; moreover, it is cost-efficient.", partOfSpeech: "adverb" },
          { word: "nevertheless", meaning: "tuy nhiên, dù vậy", example: "The experiment failed; nevertheless, it provided valuable data.", partOfSpeech: "adverb" },
          { word: "consequently", meaning: "do đó, kết quả là", example: "He didn't study; consequently, he failed the exam.", partOfSpeech: "adverb" },
          { word: "conversely", meaning: "ngược lại", example: "In summer, days are long; conversely, in winter, they are short.", partOfSpeech: "adverb" },
          { word: "notwithstanding", meaning: "bất chấp, mặc dù", example: "Notwithstanding the challenges, the team succeeded.", partOfSpeech: "adverb" },
          { word: "subsequently", meaning: "sau đó", example: "She graduated in 2020 and subsequently joined a tech company.", partOfSpeech: "adverb" },
          { word: "likewise", meaning: "tương tự", example: "The first study showed positive results; likewise, the second confirmed them.", partOfSpeech: "adverb" },
          { word: "in light of", meaning: "dựa trên, xét đến", example: "In light of new evidence, the theory was revised.", partOfSpeech: "phrase" },
          { word: "albeit", meaning: "mặc dù", example: "The progress was slow, albeit steady.", partOfSpeech: "conjunction" },
          { word: "accordingly", meaning: "theo đó, phù hợp", example: "The budget was cut; accordingly, the project scope was reduced.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn từ nối phù hợp:",
            instructionEn: "Choose the appropriate transition:",
            sentences: [
              { text: "The research was inconclusive; ___, more studies are needed.", textEn: "The research was inconclusive; ___, more studies are needed.", answer: "consequently", hint: "do đó" },
              { text: "The economy grew rapidly; ___, poverty rates decreased.", textEn: "The economy grew rapidly; ___, poverty rates decreased.", answer: "accordingly", hint: "theo đó" },
              { text: "Sales dropped in Q1; ___, they recovered strongly in Q2.", textEn: "Sales dropped in Q1; ___, they recovered strongly in Q2.", answer: "nevertheless", hint: "tuy nhiên" },
              { text: "The plan is affordable; ___, it can be implemented quickly.", textEn: "The plan is affordable; ___, it can be implemented quickly.", answer: "moreover", hint: "hơn nữa" },
              { text: "She resigned in June and ___ moved to another city.", textEn: "She resigned in June and ___ moved to another city.", answer: "subsequently", hint: "sau đó" },
            ],
          },
        ],
        quiz: [
          { question: "Từ nối nào dùng để thêm ý?", options: ["However", "Nevertheless", "Moreover", "Consequently"], answer: 2, explanation: "'Moreover' (hơn nữa) dùng để thêm thông tin bổ sung cho ý trước." },
          { question: "Khi 2 câu có quan hệ tương phản, dùng từ nào?", options: ["Furthermore", "Therefore", "However", "Similarly"], answer: 2, explanation: "'However' dùng khi ý sau trái ngược hoặc bất ngờ so với ý trước." },
          { question: "'Consequently' diễn đạt quan hệ gì?", options: ["Thêm ý", "Tương phản", "Nguyên nhân - kết quả", "Ví dụ"], answer: 2, explanation: "'Consequently' (do đó) diễn đạt mối quan hệ nguyên nhân - kết quả." },
          { question: "'Albeit' có nghĩa giống từ nào?", options: ["Therefore", "Although", "Moreover", "Instead"], answer: 1, explanation: "'Albeit' nghĩa là 'mặc dù', tương tự 'although' nhưng thường dùng trước tính từ/trạng từ." },
          { question: "Bước đầu tiên khi chọn transition là gì?", options: ["Đọc đáp án trước", "Xác định quan hệ logic giữa 2 ý", "Chọn từ dài nhất", "Chọn từ quen thuộc nhất"], answer: 1, explanation: "Phải hiểu mối quan hệ logic giữa câu trước và câu sau mới chọn được transition đúng." },
        ],
      },
    ],
  },
];
