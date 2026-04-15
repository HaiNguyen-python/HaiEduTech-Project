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
          { question: "Chiến lược nào quan trọng nhất khi làm SAT Reading?", options: ["Đọc nhanh toàn bộ bài", "Tìm bằng chứng trong đoạn văn cho mỗi đáp án", "Chọn đáp án dài nhất", "Dựa vào kiến thức nền"], answer: 1, explanation: "SAT Reading yêu cầu mọi đáp án phải được hỗ trợ bởi bằng chứng trong đoạn văn." },
          { question: "Câu hỏi 'Inference' yêu cầu gì?", options: ["Tìm thông tin trực tiếp", "Suy luận logic từ thông tin đã cho", "Đoán ý tác giả", "Tóm tắt đoạn văn"], answer: 1, explanation: "Inference questions yêu cầu bạn rút ra kết luận logic từ thông tin có trong đoạn văn." },
          { question: "'Corroborate' có nghĩa là gì?", options: ["Phủ nhận", "Xác nhận, củng cố", "Phân tích", "So sánh"], answer: 1, explanation: "'Corroborate' nghĩa là xác nhận hoặc củng cố bằng bằng chứng bổ sung." },
          { question: "Khi phân vân giữa 2 đáp án, nên chọn đáp án nào?", options: ["Đáp án dài hơn", "Đáp án cực đoan hơn", "Đáp án cụ thể và ít cực đoan hơn", "Đáp án đầu tiên nghĩ đến"], answer: 2, explanation: "Đáp án SAT đúng thường cụ thể, chừng mực, tránh từ cực đoan như 'always', 'never'." },
          { question: "Đáp án đúng trong SAT thường có đặc điểm gì?", options: ["Copy nguyên văn từ đoạn văn", "Là paraphrase (diễn đạt lại) của thông tin trong bài", "Chứa từ vựng khó nhất", "Luôn là đáp án dài nhất"], answer: 1, explanation: "Đáp án đúng SAT thường diễn đạt lại (paraphrase) thông tin gốc bằng từ ngữ khác." },
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
          { question: "Dạng 'Command of Evidence' yêu cầu gì?", options: ["Tóm tắt đoạn văn", "Chọn bằng chứng hỗ trợ câu trả lời", "Viết đoạn văn mới", "Phân tích ngữ pháp"], answer: 1, explanation: "Command of Evidence yêu cầu xác định đoạn trích cụ thể hỗ trợ câu trả lời." },
          { question: "'Refute' có nghĩa là gì?", options: ["Đồng ý", "Bác bỏ", "Tóm tắt", "Mở rộng"], answer: 1, explanation: "'Refute' nghĩa là bác bỏ, chứng minh điều gì đó sai." },
          { question: "Khi gặp paired questions, nên làm thế nào?", options: ["Bỏ qua câu đầu", "Trả lời câu chính trước, rồi tìm bằng chứng", "Chỉ trả lời câu cuối", "Đoán cả hai"], answer: 1, explanation: "Trả lời câu hỏi chính trước giúp bạn biết cần tìm bằng chứng cho điều gì." },
          { question: "'Empirical evidence' là loại bằng chứng nào?", options: ["Dựa trên ý kiến cá nhân", "Thu thập qua quan sát và thực nghiệm", "Chỉ từ sách giáo khoa", "Không cần kiểm chứng"], answer: 1, explanation: "Empirical evidence là bằng chứng thu được qua quan sát trực tiếp hoặc thí nghiệm." },
          { question: "Bằng chứng tốt nhất trong SAT có đặc điểm gì?", options: ["Gián tiếp liên quan", "Trực tiếp hỗ trợ lập luận", "Chứa nhiều từ khó", "Nằm ở cuối đoạn văn"], answer: 1, explanation: "Bằng chứng tốt nhất phải trực tiếp hỗ trợ claim — không gián tiếp hay mơ hồ." },
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
          { question: "'Address' trong câu 'The mayor will address the concerns' có nghĩa gì?", options: ["Gửi thư đến", "Giải quyết", "Cung cấp địa chỉ", "Chào hỏi"], answer: 1, explanation: "'Address' ở đây nghĩa là giải quyết, đề cập đến (deal with)." },
          { question: "Chiến lược nào hiệu quả nhất cho Words in Context?", options: ["Học thuộc từ điển", "Thay thế từng đáp án vào câu và kiểm tra logic", "Chọn nghĩa phổ biến nhất", "Bỏ qua ngữ cảnh"], answer: 1, explanation: "Thay thế (substitution) giúp bạn kiểm tra nghĩa nào phù hợp nhất trong ngữ cảnh." },
          { question: "'Entertain' trong 'entertain the idea' nghĩa là gì?", options: ["Giải trí", "Xem xét, cân nhắc", "Từ chối", "Trình bày"], answer: 1, explanation: "'Entertain an idea' nghĩa là xem xét, cân nhắc một ý tưởng." },
          { question: "'Currency' trong 'the idea gained currency' nghĩa là gì?", options: ["Tiền tệ", "Sự phổ biến, được chấp nhận rộng rãi", "Giá trị", "Tốc độ"], answer: 1, explanation: "'Gain currency' nghĩa là trở nên phổ biến, được nhiều người chấp nhận." },
          { question: "Tại sao SAT hay dùng từ quen thuộc với nghĩa lạ?", options: ["Để gây khó học sinh", "Để kiểm tra khả năng hiểu ngữ cảnh thực sự", "Vì thiếu từ mới", "Để tiết kiệm thời gian"], answer: 1, explanation: "SAT muốn kiểm tra khả năng suy luận nghĩa từ ngữ cảnh — kỹ năng đọc hiểu thực sự." },
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
          { question: "Câu nào đúng ngữ pháp?", options: ["The team are ready.", "The team is ready.", "The team were ready.", "The team have been ready."], answer: 1, explanation: "'Team' là danh từ tập hợp số ít trong American English → dùng 'is'." },
          { question: "Semicolon (;) dùng để làm gì?", options: ["Nối mệnh đề phụ với mệnh đề chính", "Nối 2 mệnh đề độc lập có liên quan", "Thay thế dấu phẩy", "Kết thúc câu hỏi"], answer: 1, explanation: "Semicolon nối 2 mệnh đề độc lập có liên quan về nghĩa mà không cần liên từ." },
          { question: "Lỗi 'dangling modifier' xảy ra khi nào?", options: ["Dùng sai thì động từ", "Từ bổ nghĩa không rõ bổ nghĩa cho danh từ nào", "Thiếu dấu phẩy", "Dùng sai đại từ"], answer: 1, explanation: "Dangling modifier xảy ra khi modifier không rõ ràng bổ nghĩa cho đối tượng nào trong câu." },
          { question: "'Redundant' có nghĩa là gì?", options: ["Thiếu thông tin", "Thừa, lặp lại không cần thiết", "Sai ngữ pháp", "Quá ngắn"], answer: 1, explanation: "'Redundant' nghĩa là thừa, lặp lại thông tin đã rõ ràng." },
          { question: "Parallel structure yêu cầu gì?", options: ["Câu phải dài bằng nhau", "Các thành phần ngang hàng phải cùng dạng ngữ pháp", "Luôn dùng danh động từ", "Câu phải có 3 phần"], answer: 1, explanation: "Parallel structure đòi hỏi các phần tử liệt kê hoặc so sánh có cùng cấu trúc ngữ pháp." },
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
          { question: "'Ubiquitous' có nghĩa là gì?", options: ["Hiếm hoi", "Có mặt khắp nơi", "Đắt đỏ", "Phức tạp"], answer: 1, explanation: "'Ubiquitous' nghĩa là có mặt ở khắp mọi nơi, rất phổ biến." },
          { question: "'Meticulous' mô tả người như thế nào?", options: ["Lười biếng", "Tỉ mỉ, cẩn thận từng chi tiết", "Nóng nảy", "Lãnh đạm"], answer: 1, explanation: "'Meticulous' mô tả người rất cẩn thận, chú ý đến từng chi tiết nhỏ." },
          { question: "'Proliferate' có nghĩa gì?", options: ["Giảm dần", "Biến mất", "Sinh sôi, lan rộng", "Bị cấm"], answer: 2, explanation: "'Proliferate' nghĩa là tăng nhanh về số lượng, lan rộng." },
          { question: "Từ nào là danh từ?", options: ["Pragmatic", "Eloquent", "Disparity", "Resilient"], answer: 2, explanation: "'Disparity' là danh từ, nghĩa là sự chênh lệch. Các từ còn lại là tính từ." },
          { question: "'Scrutinize' có nghĩa là gì?", options: ["Bỏ qua", "Xem xét kỹ lưỡng", "Phá hủy", "Tạo ra"], answer: 1, explanation: "'Scrutinize' nghĩa là kiểm tra, xem xét một cách kỹ lưỡng và chi tiết." },
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
          { question: "'Ephemeral' mô tả điều gì?", options: ["Vĩnh cửu", "Thoáng qua, không lâu dài", "Quan trọng", "Phức tạp"], answer: 1, explanation: "'Ephemeral' nghĩa là phù du, chỉ tồn tại trong thời gian ngắn." },
          { question: "'Juxtapose' có nghĩa là gì?", options: ["Tách rời", "Đặt cạnh nhau để so sánh", "Kết hợp", "Đối lập"], answer: 1, explanation: "'Juxtapose' nghĩa là đặt hai thứ cạnh nhau để tạo sự tương phản hoặc so sánh." },
          { question: "'Exacerbate' và 'mitigate' có quan hệ gì?", options: ["Đồng nghĩa", "Trái nghĩa", "Không liên quan", "Cùng từ loại nhưng khác nghĩa"], answer: 1, explanation: "'Exacerbate' (làm tệ hơn) và 'mitigate' (làm giảm nhẹ) là cặp trái nghĩa." },
          { question: "'Unprecedented' có nghĩa là gì?", options: ["Đã xảy ra trước đó", "Chưa từng có tiền lệ", "Được dự đoán trước", "Bình thường"], answer: 1, explanation: "'Unprecedented' nghĩa là chưa từng xảy ra trước đây, hoàn toàn mới." },
          { question: "Từ nào có nghĩa 'thẳng thắn'?", options: ["Digress", "Candid", "Ephemeral", "Paradox"], answer: 1, explanation: "'Candid' nghĩa là thẳng thắn, bộc trực, nói thẳng suy nghĩ." },
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
          { question: "Tiền tố 'mal-' có nghĩa gì?", options: ["Tốt", "Xấu", "Nhiều", "Trước"], answer: 1, explanation: "'Mal-' có nghĩa là xấu, sai. Ví dụ: malfunction (trục trặc), malevolent (ác ý)." },
          { question: "Gốc từ 'spec' có nghĩa gì?", options: ["Nghe", "Viết", "Nhìn", "Mang"], answer: 2, explanation: "'Spec' nghĩa là nhìn. Ví dụ: inspect (kiểm tra), spectacle (cảnh tượng), retrospect (nhìn lại)." },
          { question: "'Benevolent' và 'malevolent' khác nhau ở đâu?", options: ["Tiền tố: bene (tốt) vs mal (xấu)", "Hậu tố khác nhau", "Gốc từ khác nhau", "Không liên quan"], answer: 0, explanation: "Cả hai đều có gốc 'vol' (ý chí) nhưng tiền tố khác: bene (tốt) → nhân từ, mal (xấu) → ác ý." },
          { question: "'Preclude' có nghĩa gì?", options: ["Bao gồm", "Ngăn cản trước", "Kết luận", "Dự đoán"], answer: 1, explanation: "'Pre-' (trước) + 'clud' (đóng) → ngăn cản, không cho phép xảy ra." },
          { question: "Tại sao học gốc từ quan trọng cho SAT?", options: ["Để viết đẹp hơn", "Để đoán nghĩa từ chưa biết trong đoạn văn", "Để nói hay hơn", "Không quan trọng"], answer: 1, explanation: "Biết gốc từ giúp bạn đoán nghĩa từ mới gặp — kỹ năng thiết yếu trong SAT Reading." },
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
          { question: "SAT ưu tiên kiểu viết nào?", options: ["Dài dòng, phức tạp", "Ngắn gọn, súc tích nhưng đủ nghĩa", "Dùng nhiều từ khó", "Câu càng dài càng tốt"], answer: 1, explanation: "SAT luôn ưu tiên conciseness — diễn đạt đầy đủ ý với ít từ nhất có thể." },
          { question: "'Cohesion' và 'coherence' khác gì nhau?", options: ["Cùng nghĩa", "Cohesion = liên kết câu/đoạn; Coherence = mạch lạc tổng thể", "Coherence = ngữ pháp đúng", "Không khác nhau"], answer: 1, explanation: "Cohesion là sự liên kết giữa các câu/đoạn (micro), coherence là sự mạch lạc tổng thể (macro)." },
          { question: "'Verbose' có nghĩa đối lập với từ nào?", options: ["Eloquent", "Succinct", "Elaborate", "Articulate"], answer: 1, explanation: "'Verbose' (dài dòng) trái nghĩa với 'succinct' (ngắn gọn, súc tích)." },
          { question: "Khi thêm câu vào đoạn văn, cần kiểm tra gì?", options: ["Câu có dài không", "Câu liên kết với câu trước VÀ câu sau", "Câu có từ khó không", "Câu có ví dụ không"], answer: 1, explanation: "Câu thêm vào phải tạo cầu nối logic giữa câu trước và câu sau nó." },
          { question: "'Pertinent' có nghĩa là gì?", options: ["Không quan trọng", "Thích hợp, liên quan trực tiếp", "Phức tạp", "Dễ hiểu"], answer: 1, explanation: "'Pertinent' nghĩa là thích hợp, liên quan trực tiếp đến vấn đề đang bàn." },
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
          { question: "Rhetorical Synthesis là dạng câu hỏi gì?", options: ["Viết bài luận", "Tổng hợp thông tin từ ghi chú theo yêu cầu cụ thể", "Phân tích ngữ pháp", "Dịch thuật"], answer: 1, explanation: "Rhetorical Synthesis yêu cầu tổng hợp thông tin từ các ghi chú cho sẵn theo mục đích giao tiếp cụ thể." },
          { question: "'Premise' có nghĩa là gì?", options: ["Kết luận", "Tiền đề, giả định ban đầu", "Bằng chứng", "Phản bác"], answer: 1, explanation: "'Premise' là tiền đề — giả định ban đầu mà lập luận dựa trên." },
          { question: "Khi làm Rhetorical Synthesis, bước đầu tiên là gì?", options: ["Đọc đáp án trước", "Đọc kỹ yêu cầu (purpose)", "Đoán đáp án", "Bỏ qua ghi chú"], answer: 1, explanation: "Hiểu rõ purpose (mục đích) giúp bạn biết cần tổng hợp thông tin nào và theo cách nào." },
          { question: "'Pivotal' có nghĩa tương tự từ nào?", options: ["Minor", "Crucial", "Optional", "Ordinary"], answer: 1, explanation: "'Pivotal' (then chốt) tương tự 'crucial' (rất quan trọng)." },
          { question: "'Concession' trong lập luận là gì?", options: ["Đồng ý hoàn toàn", "Nhượng bộ một điểm trước khi phản bác", "Bác bỏ tất cả", "Kết luận cuối cùng"], answer: 1, explanation: "Concession là việc thừa nhận một điểm của đối phương trước khi đưa ra lập luận chính." },
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
