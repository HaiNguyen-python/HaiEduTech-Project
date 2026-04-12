// IELTS Reading & Listening Expansion 3 — 12 new lessons
import type { LanguageLesson } from "./types";

// ===== IELTS READING — 6 new lessons =====

export const ieltsReadingExpansion3Lessons: LanguageLesson[] = [
  {
    id: "ielts-reading-14",
    title: "Multiple Choice — Author's Purpose",
    titleEn: "Multiple Choice — Author's Purpose",
    level: 3,
    difficulty: "advanced",
    theory: `**Multiple Choice — Author's Purpose** yêu cầu bạn xác định mục đích của tác giả khi viết một đoạn hoặc cả bài.

**Chiến lược:**
1. **Đọc câu hỏi kỹ** — "Why does the author...?", "What is the author's purpose...?"
2. **Phân biệt fact vs opinion** — tác giả đang inform, persuade, hay entertain?
3. **Tìm từ khóa thái độ** — "interestingly", "unfortunately", "surprisingly" cho thấy quan điểm
4. **Loại trừ đáp án quá cực đoan** — tác giả academic thường trung lập

**Lỗi thường gặp:**
- Nhầm lẫn giữa "purpose of the paragraph" và "topic of the paragraph"
- Chọn đáp án phản ánh ý kiến CỦA BẠN thay vì của tác giả
- Không phân biệt được giữa inform và persuade`,
    theoryEn: `**Multiple Choice — Author's Purpose** requires identifying why the author wrote a section or the entire passage.

**Strategies:**
1. **Read the question carefully** — "Why does the author...?", "What is the author's purpose...?"
2. **Distinguish fact vs opinion** — is the author informing, persuading, or entertaining?
3. **Look for attitude markers** — "interestingly", "unfortunately" reveal viewpoint
4. **Eliminate extreme answers** — academic authors tend to be neutral

**Common mistakes:**
- Confusing "purpose of the paragraph" with "topic of the paragraph"
- Choosing answers reflecting YOUR opinion rather than the author's
- Not distinguishing between informing and persuading`,
    proTips: [
      "Purpose ≠ Topic: topic = WHAT, purpose = WHY",
      "Từ signpost như 'however', 'despite this' cho thấy tác giả đang phản biện",
      "Nếu tác giả dùng nhiều statistics → purpose likely = inform/support argument",
    ],
    proTipsEn: [
      "Purpose ≠ Topic: topic = WHAT, purpose = WHY",
      "Signpost words like 'however', 'despite this' show counter-argument",
      "If the author uses many statistics → purpose likely = inform/support argument",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp vào chỗ trống",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "The author's ___ is to inform readers about climate change effects.", textEn: "", answer: "purpose", hint: "mục đích" },
          { text: "Words like 'surprisingly' and 'remarkably' indicate the author's ___.", textEn: "", answer: "attitude", hint: "thái độ" },
          { text: "When an author uses data and research, the purpose is usually to ___ an argument.", textEn: "", answer: "support", hint: "hỗ trợ" },
        ],
      },
    ],
    quiz: [
      { question: "Khi câu hỏi hỏi 'What is the author's purpose?', bạn cần tìm gì?", options: ["Chủ đề chính", "Lý do tác giả viết đoạn đó", "Ý kiến của bạn", "Từ vựng khó"], answer: 1, explanation: "Author's purpose = WHY the author wrote it, not WHAT it's about." },
      { question: "Từ 'unfortunately' trong bài cho thấy tác giả đang:", options: ["Trung lập hoàn toàn", "Thể hiện sự tiếc nuối/quan điểm tiêu cực", "Vui mừng", "Không có ý kiến"], answer: 1, explanation: "'Unfortunately' là attitude marker cho thấy tác giả có quan điểm." },
      { question: "Tác giả dùng nhiều số liệu thống kê thường có mục đích:", options: ["Giải trí người đọc", "Thuyết phục hoặc cung cấp bằng chứng", "Kể chuyện cười", "Mô tả cảm xúc"], answer: 1, explanation: "Statistics thường dùng để support arguments hoặc inform." },
      { question: "Phân biệt 'inform' và 'persuade' dựa vào:", options: ["Độ dài bài viết", "Tác giả có đưa ý kiến và khuyến khích hành động không", "Số từ vựng khó", "Số đoạn văn"], answer: 1, explanation: "Persuade = có ý kiến + call to action. Inform = trình bày sự thật trung lập." },
      { question: "Khi tác giả viết 'It is essential that...', purpose là gì?", options: ["Describing", "Persuading/recommending", "Narrating", "Defining"], answer: 1, explanation: "'It is essential that' shows the author is making a recommendation/persuading." },
    ],
  },
  {
    id: "ielts-reading-15",
    title: "Paragraph Information Matching",
    titleEn: "Paragraph Information Matching",
    level: 3,
    difficulty: "advanced",
    theory: `**Paragraph Information Matching** yêu cầu nối thông tin với đoạn văn chứa nó.

**Chiến lược:**
1. **Đọc câu hỏi trước, gạch chân key words**
2. **Scan từng đoạn** tìm paraphrase của key words
3. **Một đoạn có thể dùng nhiều lần** hoặc không dùng
4. **Chú ý đoạn nào chứa examples, statistics, definitions**

**Lỗi thường gặp:**
- Nghĩ rằng mỗi đoạn chỉ dùng 1 lần (sai — có thể dùng nhiều lần)
- Tìm exact words thay vì synonyms
- Không đọc hết cả đoạn, chỉ đọc câu đầu`,
    theoryEn: `**Paragraph Information Matching** requires matching information to the paragraph containing it.

**Strategies:**
1. **Read questions first, underline key words**
2. **Scan each paragraph** for paraphrases of key words
3. **A paragraph may be used more than once** or not at all
4. **Note paragraphs with examples, statistics, definitions**

**Common mistakes:**
- Thinking each paragraph is used only once (wrong — can be reused)
- Looking for exact words instead of synonyms
- Not reading the full paragraph, only the first sentence`,
    proTips: [
      "Đánh dấu mỗi đoạn bằng 1-2 keywords tóm tắt nội dung chính",
      "Thông tin thường được paraphrase — 'children' → 'young people'",
      "Bắt đầu từ câu hỏi có keywords đặc biệt nhất (tên riêng, số liệu)",
    ],
    proTipsEn: [
      "Label each paragraph with 1-2 summary keywords",
      "Information is often paraphrased — 'children' → 'young people'",
      "Start with questions containing the most distinctive keywords",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "In Paragraph Information Matching, a paragraph may be used ___ than once.", textEn: "", answer: "more", hint: "nhiều hơn" },
          { text: "Instead of looking for exact words, look for ___ (synonyms).", textEn: "", answer: "paraphrases", hint: "cách diễn đạt khác" },
          { text: "Start with questions that have the most ___ keywords.", textEn: "", answer: "distinctive", hint: "đặc biệt" },
        ],
      },
    ],
    quiz: [
      { question: "Trong Paragraph Information Matching, mỗi đoạn có thể được dùng:", options: ["Chỉ 1 lần", "Nhiều lần hoặc không lần nào", "Chính xác 2 lần", "Luôn luôn"], answer: 1, explanation: "Paragraphs can be used more than once or not at all." },
      { question: "Bạn nên bắt đầu từ câu hỏi nào?", options: ["Câu hỏi đầu tiên", "Câu hỏi có keywords đặc biệt nhất", "Câu hỏi cuối cùng", "Bất kỳ câu nào"], answer: 1, explanation: "Starting with distinctive keywords makes scanning easier." },
      { question: "Nếu câu hỏi nói 'a comparison between two methods', bạn tìm:", options: ["Từ 'comparison' trong đoạn", "Đoạn nào so sánh hai phương pháp", "Từ 'method' chính xác", "Đoạn đầu tiên"], answer: 1, explanation: "Look for paraphrased comparisons, not exact words." },
    ],
  },
  {
    id: "ielts-reading-16",
    title: "Yes/No/Not Given — Advanced",
    titleEn: "Yes/No/Not Given — Advanced",
    level: 3,
    difficulty: "advanced",
    theory: `**Yes/No/Not Given — Advanced** tập trung vào các trường hợp khó phân biệt, đặc biệt giữa NO và NOT GIVEN.

**Chiến lược nâng cao:**
1. **NO vs NOT GIVEN**: NO = bài viết nói NGƯỢC LẠI. NOT GIVEN = bài viết KHÔNG ĐỀ CẬP
2. **Cẩn thận với absolute words**: 'always', 'never', 'all' — thường là NO
3. **Qualifier words**: 'most', 'some', 'often' — dễ bị nhầm
4. **Implicit vs explicit**: nếu phải SUY LUẬN quá nhiều → có thể là NOT GIVEN

**Lỗi thường gặp:**
- Dùng kiến thức riêng thay vì thông tin trong bài
- Nhầm giữa 'not mentioned at all' và 'partially mentioned'
- Kết luận vội vàng khi chỉ tìm thấy keyword`,
    theoryEn: `**Yes/No/Not Given — Advanced** focuses on difficult cases, especially distinguishing NO from NOT GIVEN.

**Advanced strategies:**
1. **NO vs NOT GIVEN**: NO = passage says the OPPOSITE. NOT GIVEN = passage doesn't MENTION it
2. **Watch absolute words**: 'always', 'never', 'all' — often NO
3. **Qualifier words**: 'most', 'some', 'often' — easily confused
4. **Implicit vs explicit**: if you need too much inference → likely NOT GIVEN`,
    proTips: [
      "Nếu bạn phải tưởng tượng hoặc suy luận quá nhiều → NOT GIVEN",
      "YES = câu hỏi và đoạn văn agree. NO = contradict. NOT GIVEN = no info",
      "Đọc cả đoạn chứa keyword, không chỉ 1 câu",
    ],
    proTipsEn: [
      "If you need to imagine or infer too much → NOT GIVEN",
      "YES = statement and passage agree. NO = contradict. NOT GIVEN = no info",
      "Read the whole paragraph with the keyword, not just one sentence",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền YES, NO hoặc NOT GIVEN",
        instructionEn: "Fill in YES, NO or NOT GIVEN",
        sentences: [
          { text: "If the passage says the opposite of the statement, the answer is ___.", textEn: "", answer: "NO", hint: "" },
          { text: "If the passage doesn't mention the topic at all, the answer is ___.", textEn: "", answer: "NOT GIVEN", hint: "" },
          { text: "If the passage agrees with the statement, the answer is ___.", textEn: "", answer: "YES", hint: "" },
        ],
      },
    ],
    quiz: [
      { question: "Statement: 'All students passed the exam.' Passage: 'Most students passed.' → Answer:", options: ["YES", "NO", "NOT GIVEN"], answer: 1, explanation: "'All' vs 'Most' — the passage contradicts 'all' so it's NO." },
      { question: "Statement: 'The study was conducted in France.' Passage nói về study nhưng không đề cập location:", options: ["YES", "NO", "NOT GIVEN"], answer: 2, explanation: "Location not mentioned → NOT GIVEN." },
      { question: "Khi nào bạn chọn NOT GIVEN?", options: ["Khi bài nói ngược lại", "Khi bài không đề cập thông tin đó", "Khi bài đồng ý", "Khi bạn không biết"], answer: 1, explanation: "NOT GIVEN = passage doesn't address the topic." },
      { question: "Absolute words ('always', 'never') thường dẫn đến đáp án:", options: ["YES", "NO", "NOT GIVEN"], answer: 1, explanation: "Absolute claims are often contradicted in academic texts." },
    ],
  },
  {
    id: "ielts-reading-17",
    title: "Short Answer Questions",
    titleEn: "Short Answer Questions",
    level: 3,
    difficulty: "intermediate",
    theory: `**Short Answer Questions** yêu cầu trả lời bằng 1-3 từ lấy trực tiếp từ passage.

**Chiến lược:**
1. **Đọc word limit kỹ** — "NO MORE THAN THREE WORDS" hoặc "ONE WORD ONLY"
2. **Câu trả lời luôn nằm trong passage** — copy exact words
3. **Câu hỏi theo thứ tự passage** — dùng để locate thông tin
4. **Trả lời đúng grammatically** — nếu cần noun, viết noun

**Lỗi thường gặp:**
- Viết quá số từ cho phép
- Paraphrase thay vì copy từ passage
- Không kiểm tra word limit trước khi viết`,
    theoryEn: `**Short Answer Questions** require answers of 1-3 words taken directly from the passage.

**Strategies:**
1. **Read word limit carefully** — "NO MORE THAN THREE WORDS" or "ONE WORD ONLY"
2. **Answers are always in the passage** — copy exact words
3. **Questions follow passage order** — use this to locate information
4. **Answer grammatically** — if a noun is needed, write a noun`,
    proTips: [
      "LUÔN kiểm tra word limit — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' cho phép '2 words + 1 number'",
      "Câu hỏi Wh- cho biết loại từ cần: What → noun, When → time, Where → place",
      "Không thêm articles (a, the) trừ khi chúng là phần của đáp án trong passage",
    ],
    proTipsEn: [
      "ALWAYS check word limit — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' allows '2 words + 1 number'",
      "Wh- questions tell you word type: What → noun, When → time, Where → place",
      "Don't add articles unless they're part of the answer in the passage",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "Short answer questions require words taken ___ from the passage.", textEn: "", answer: "directly", hint: "trực tiếp" },
          { text: "The word limit tells you the ___ number of words you can write.", textEn: "", answer: "maximum", hint: "tối đa" },
          { text: "'What' questions usually need a ___ as the answer.", textEn: "", answer: "noun", hint: "danh từ" },
        ],
      },
    ],
    quiz: [
      { question: "'NO MORE THAN THREE WORDS' nghĩa là bạn có thể viết:", options: ["Chính xác 3 từ", "1, 2, hoặc 3 từ", "Ít nhất 3 từ", "Bao nhiêu cũng được"], answer: 1, explanation: "NO MORE THAN 3 = you can write 1, 2, or 3 words." },
      { question: "Câu trả lời short answer lấy từ đâu?", options: ["Kiến thức riêng", "Trực tiếp từ passage", "Tưởng tượng", "Từ câu hỏi"], answer: 1, explanation: "Answers must be copied directly from the passage." },
      { question: "Câu hỏi 'Where did the research take place?' cần đáp án loại:", options: ["Thời gian", "Địa điểm", "Người", "Số"], answer: 1, explanation: "'Where' questions need a place/location answer." },
    ],
  },
  {
    id: "ielts-reading-18",
    title: "Skimming & Scanning — Speed Reading",
    titleEn: "Skimming & Scanning — Speed Reading",
    level: 3,
    difficulty: "intermediate",
    theory: `**Skimming & Scanning** là hai kỹ năng đọc nhanh cốt lõi cho IELTS Reading.

**Skimming (đọc lướt):**
- Đọc nhanh để nắm ý chính (main idea)
- Đọc tiêu đề, câu đầu/cuối mỗi đoạn
- Dùng cho: Matching Headings, overall comprehension

**Scanning (quét):**
- Tìm thông tin cụ thể (tên, số, ngày)
- Di mắt nhanh qua đoạn tìm keyword
- Dùng cho: Short answers, sentence completion, T/F/NG

**Kết hợp:**
1. Skim toàn bộ passage (2-3 phút)
2. Đọc câu hỏi, gạch key words
3. Scan passage tìm key words
4. Đọc kỹ vùng có key words`,
    theoryEn: `**Skimming & Scanning** are two core speed reading skills for IELTS Reading.

**Skimming:**
- Read quickly for main idea
- Read titles, first/last sentences of each paragraph
- Used for: Matching Headings, overall comprehension

**Scanning:**
- Find specific information (names, numbers, dates)
- Move eyes quickly to find keywords
- Used for: Short answers, sentence completion, T/F/NG`,
    proTips: [
      "Skim TRƯỚC (2-3 phút), scan SAU khi có câu hỏi cụ thể",
      "Khi scanning, tìm capital letters (tên riêng), numbers, dates trước",
      "Không cần hiểu mọi từ — focus vào main ideas và key details",
    ],
    proTipsEn: [
      "Skim FIRST (2-3 min), scan AFTER you have specific questions",
      "When scanning, look for capital letters, numbers, dates first",
      "You don't need to understand every word — focus on main ideas and key details",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền Skimming hoặc Scanning",
        instructionEn: "Fill in Skimming or Scanning",
        sentences: [
          { text: "Reading quickly for the main idea is called ___.", textEn: "", answer: "skimming", hint: "" },
          { text: "Looking for a specific name or number is called ___.", textEn: "", answer: "scanning", hint: "" },
          { text: "___ is best for Matching Headings questions.", textEn: "", answer: "Skimming", hint: "" },
        ],
      },
    ],
    quiz: [
      { question: "Skimming dùng để:", options: ["Tìm tên riêng", "Nắm ý chính", "Tìm số liệu", "Đọc từng từ"], answer: 1, explanation: "Skimming = reading quickly for the main idea." },
      { question: "Khi scanning, bạn tìm:", options: ["Main idea", "Keywords cụ thể", "Grammar rules", "Writing style"], answer: 1, explanation: "Scanning = looking for specific keywords." },
      { question: "Bạn nên skim passage trong bao lâu?", options: ["10 giây", "2-3 phút", "10 phút", "Không cần skim"], answer: 1, explanation: "2-3 minutes of skimming gives you a good overview." },
      { question: "Matching Headings cần kỹ năng nào nhất?", options: ["Scanning", "Skimming", "Cả hai bằng nhau", "Không cần kỹ năng đặc biệt"], answer: 1, explanation: "Matching Headings requires understanding main ideas = skimming." },
    ],
  },
  {
    id: "ielts-reading-19",
    title: "Classification Questions",
    titleEn: "Classification Questions",
    level: 3,
    difficulty: "advanced",
    theory: `**Classification** yêu cầu phân loại thông tin theo các nhóm cho sẵn (theories, people, time periods).

**Chiến lược:**
1. **Hiểu categories** — thường là tên người, theories, hoặc time periods
2. **Scan bài tìm tên category** — lập danh sách ý chính của mỗi category
3. **Match statements** với đúng category dựa trên passage
4. **Cẩn thận với overlapping info** — một statement có thể liên quan nhiều categories

**Lỗi thường gặp:**
- Nhầm lẫn ý kiến của các nhà nghiên cứu khác nhau
- Không đọc đủ context xung quanh tên người
- Gán statement cho category dựa trên logic thay vì passage`,
    theoryEn: `**Classification** requires categorising information into given groups (theories, people, time periods).

**Strategies:**
1. **Understand categories** — usually names, theories, or time periods
2. **Scan for category names** — list main points for each
3. **Match statements** to the correct category based on the passage
4. **Watch for overlapping info** — a statement may seem related to multiple categories`,
    proTips: [
      "Highlight hoặc underline mỗi lần category name xuất hiện trong passage",
      "Đọc 2-3 câu quanh mỗi category name để hiểu context",
      "Categories thường xuất hiện theo thứ tự trong passage",
    ],
    proTipsEn: [
      "Highlight each time a category name appears in the passage",
      "Read 2-3 sentences around each category name for context",
      "Categories usually appear in passage order",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "Classification questions require you to ___ information into groups.", textEn: "", answer: "categorise", hint: "phân loại" },
          { text: "Categories are often names of ___, theories, or time periods.", textEn: "", answer: "people", hint: "người" },
          { text: "Always base your answer on the ___, not your own knowledge.", textEn: "", answer: "passage", hint: "đoạn văn" },
        ],
      },
    ],
    quiz: [
      { question: "Classification questions thường có categories là:", options: ["Từ vựng", "Tên người, lý thuyết, hoặc giai đoạn", "Số liệu", "Câu hỏi"], answer: 1, explanation: "Categories are usually people, theories, or time periods." },
      { question: "Khi giải classification, bạn nên:", options: ["Dùng kiến thức riêng", "Dựa hoàn toàn vào passage", "Đoán ngẫu nhiên", "Bỏ qua"], answer: 1, explanation: "Always base answers on the passage, not general knowledge." },
      { question: "Nếu statement liên quan đến 'Dr. Smith's theory', bạn tìm:", options: ["Tên 'Dr. Smith' trong passage", "Từ 'theory' bất kỳ", "Đoạn cuối cùng", "Tiêu đề bài"], answer: 0, explanation: "Scan for the specific name 'Dr. Smith' in the passage." },
    ],
  },
];

// ===== IELTS LISTENING — 6 new lessons =====

export const ieltsListeningExpansion3Lessons: LanguageLesson[] = [
  {
    id: "ielts-listening-12",
    title: "Section 1 — Form Completion Mastery",
    titleEn: "Section 1 — Form Completion Mastery",
    level: 3,
    difficulty: "beginner",
    theory: `**Section 1 Form Completion** là phần dễ nhất nhưng cần chính xác tuyệt đối.

**Chiến lược:**
1. **Đọc form trước khi nghe** — dự đoán loại thông tin cần (tên, số, địa chỉ)
2. **Chú ý spelling** — tên riêng thường được đánh vần
3. **Số điện thoại** — viết từng nhóm số, kiểm tra lại
4. **Dates** — nghe ngày, tháng, năm riêng biệt

**Word limit thường gặp:**
- ONE WORD AND/OR A NUMBER
- NO MORE THAN TWO WORDS

**Lỗi thường gặp:**
- Viết sai chính tả tên riêng
- Nhầm số teen/ty (13/30, 14/40)
- Bỏ qua thông tin khi đang viết câu trước`,
    theoryEn: `**Section 1 Form Completion** is the easiest but requires absolute accuracy.

**Strategies:**
1. **Read the form before listening** — predict information types (names, numbers, addresses)
2. **Watch spelling** — proper nouns are often spelled out
3. **Phone numbers** — write in groups, double-check
4. **Dates** — listen for day, month, year separately`,
    proTips: [
      "Tên riêng luôn được đánh vần — nghe kỹ từng chữ cái",
      "Postcodes thường có cả letter và number: SW1 4PQ",
      "Nếu miss 1 câu, KHÔNG quay lại — tiếp tục câu tiếp theo",
    ],
    proTipsEn: [
      "Proper nouns are always spelled out — listen carefully to each letter",
      "Postcodes often have both letters and numbers",
      "If you miss one answer, DON'T go back — continue to the next",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "Section 1 is always a ___ between two people.", textEn: "", answer: "conversation", hint: "cuộc trò chuyện" },
          { text: "Proper nouns are usually ___ out letter by letter.", textEn: "", answer: "spelled", hint: "đánh vần" },
          { text: "If you miss an answer, don't ___ — move to the next question.", textEn: "", answer: "panic", hint: "hoảng" },
        ],
      },
    ],
    quiz: [
      { question: "Section 1 listening thường là:", options: ["Bài giảng đại học", "Hội thoại giữa 2 người", "Monologue", "Bài phát biểu"], answer: 1, explanation: "Section 1 is always a conversation between two people." },
      { question: "Khi nghe số điện thoại, bạn nên:", options: ["Viết toàn bộ 1 lần", "Viết từng nhóm số", "Chỉ nhớ trong đầu", "Bỏ qua"], answer: 1, explanation: "Write numbers in groups to ensure accuracy." },
      { question: "'Double 7' nghĩa là:", options: ["7", "77", "14", "27"], answer: 1, explanation: "'Double 7' means 77 — two sevens." },
      { question: "Nếu bạn miss 1 câu trả lời, bạn nên:", options: ["Quay lại tìm", "Dừng lại suy nghĩ", "Tiếp tục câu tiếp theo", "Bỏ cuộc"], answer: 2, explanation: "Never go back — you'll miss more answers. Move forward." },
    ],
  },
  {
    id: "ielts-listening-13",
    title: "Section 2 — Map & Plan Labelling",
    titleEn: "Section 2 — Map & Plan Labelling",
    level: 3,
    difficulty: "intermediate",
    theory: `**Map & Plan Labelling** yêu cầu nghe và gắn nhãn vị trí trên bản đồ hoặc sơ đồ.

**Chiến lược:**
1. **Xem map trước** — xác định orientation (north, south, entrance, exit)
2. **Tìm điểm bắt đầu** — "starting from the entrance..."
3. **Nghe direction words** — left, right, opposite, next to, between, behind
4. **Theo dõi movement** — speaker di chuyển qua map theo thứ tự

**Direction vocabulary quan trọng:**
- on the left/right of
- opposite / facing
- at the end of / at the corner of
- between X and Y
- in the centre / in the middle`,
    theoryEn: `**Map & Plan Labelling** requires listening and labelling locations on a map or plan.

**Strategies:**
1. **Look at the map first** — identify orientation
2. **Find the starting point** — "starting from the entrance..."
3. **Listen for direction words** — left, right, opposite, next to
4. **Follow the movement** — the speaker moves through the map in order`,
    proTips: [
      "Dùng ngón tay theo dõi trên map khi nghe — di chuyển theo speaker",
      "Nếu speaker nói 'on your left', đó là LEFT từ góc nhìn ENTRANCE",
      "Labels thường đi theo thứ tự speaker di chuyển qua map",
    ],
    proTipsEn: [
      "Use your finger to trace the map as you listen",
      "If the speaker says 'on your left', it's from the ENTRANCE perspective",
      "Labels usually follow the order the speaker moves through the map",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ chỉ hướng phù hợp",
        instructionEn: "Fill in the appropriate direction word",
        sentences: [
          { text: "The café is ___ the library (= facing it across the path).", textEn: "", answer: "opposite", hint: "đối diện" },
          { text: "The shop is ___ the bank and the post office.", textEn: "", answer: "between", hint: "giữa" },
          { text: "Turn right and the exit is at the ___ of the corridor.", textEn: "", answer: "end", hint: "cuối" },
        ],
      },
    ],
    quiz: [
      { question: "Khi giải Map Labelling, điều đầu tiên cần làm:", options: ["Bắt đầu nghe ngay", "Xem map và xác định orientation", "Đọc đáp án", "Viết tên các vị trí"], answer: 1, explanation: "Always look at the map first to understand the layout." },
      { question: "'Opposite the entrance' nghĩa là:", options: ["Bên cạnh cửa vào", "Đối diện cửa vào", "Phía sau cửa vào", "Phía trên cửa vào"], answer: 1, explanation: "'Opposite' means facing, on the other side." },
      { question: "Bạn nên dùng gì để theo dõi trên map?", options: ["Mắt nhìn 1 điểm", "Ngón tay di chuyển theo speaker", "Không cần nhìn map", "Chỉ đọc nhãn"], answer: 1, explanation: "Moving your finger helps track the speaker's movement." },
    ],
  },
  {
    id: "ielts-listening-14",
    title: "Section 3 — Academic Discussion",
    titleEn: "Section 3 — Academic Discussion",
    level: 3,
    difficulty: "advanced",
    theory: `**Section 3** là hội thoại giữa 2-4 người trong bối cảnh học thuật (tutorial, study group).

**Chiến lược:**
1. **Phân biệt speakers** — ai nói gì? Student A vs Student B vs Tutor
2. **Nghe opinion markers** — "I think", "I agree", "I'm not sure about that"
3. **Chú ý thay đổi ý kiến** — speakers thường agree/disagree/change their mind
4. **Academic vocabulary** — research, methodology, hypothesis, findings, conclusion

**Câu hỏi thường gặp:**
- Multiple choice (opinions/attitudes)
- Matching speakers to opinions
- Summary completion`,
    theoryEn: `**Section 3** is a conversation between 2-4 people in an academic context.

**Strategies:**
1. **Distinguish speakers** — who says what?
2. **Listen for opinion markers** — "I think", "I agree"
3. **Note opinion changes** — speakers often change their mind
4. **Academic vocabulary** — research, methodology, hypothesis`,
    proTips: [
      "Section 3 thường có traps: speaker A nói ý kiến → speaker B phản đối → speaker A đồng ý đổi ý",
      "Chú ý tone of voice — giọng ngần ngại = not sure, giọng mạnh mẽ = confident",
      "Tutor/professor thường tóm tắt ý kiến cuối cùng — đó thường là đáp án",
    ],
    proTipsEn: [
      "Section 3 has traps: A states opinion → B disagrees → A changes mind",
      "Note tone of voice — hesitant = unsure, strong = confident",
      "The tutor often summarises the final view — that's usually the answer",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "Section 3 involves a conversation in an ___ context.", textEn: "", answer: "academic", hint: "học thuật" },
          { text: "'I'm not sure about that' is an opinion ___ showing uncertainty.", textEn: "", answer: "marker", hint: "dấu hiệu" },
          { text: "When speakers change their mind, focus on their ___ opinion.", textEn: "", answer: "final", hint: "cuối cùng" },
        ],
      },
    ],
    quiz: [
      { question: "Section 3 listening là về:", options: ["Cuộc trò chuyện xã giao", "Thảo luận học thuật", "Tin tức", "Giải trí"], answer: 1, explanation: "Section 3 is always an academic discussion." },
      { question: "Khi 2 speakers tranh luận, đáp án thường là:", options: ["Ý kiến đầu tiên", "Ý kiến cuối cùng/thống nhất", "Ý kiến của bạn", "Không ai đúng"], answer: 1, explanation: "The final/agreed opinion is usually the answer." },
      { question: "'I agree with you' cho thấy speaker đang:", options: ["Phản đối", "Đồng ý", "Hỏi câu hỏi", "Đổi chủ đề"], answer: 1, explanation: "'I agree' clearly shows agreement." },
    ],
  },
  {
    id: "ielts-listening-15",
    title: "Section 4 — Lecture Note-taking",
    titleEn: "Section 4 — Lecture Note-taking",
    level: 3,
    difficulty: "advanced",
    theory: `**Section 4** là bài giảng/monologue học thuật — phần KHÓ NHẤT vì chỉ nghe 1 lần và không có break.

**Chiến lược:**
1. **Đọc trước tất cả câu hỏi** trong thời gian cho phép
2. **Dự đoán loại từ cần điền** — noun? number? adjective?
3. **Nghe signpost language** — "Firstly...", "Moving on to...", "In conclusion..."
4. **Keywords xung quanh gap** giúp locate vị trí trong bài giảng
5. **Viết nhanh — dùng abbreviations** nếu cần

**Signpost language quan trọng:**
- Topic shift: "Now let's look at...", "Turning to..."
- Addition: "Furthermore...", "In addition..."
- Contrast: "However...", "On the other hand..."
- Summary: "To sum up...", "In conclusion..."`,
    theoryEn: `**Section 4** is an academic lecture/monologue — the HARDEST section with no break.

**Strategies:**
1. **Read ALL questions** during preview time
2. **Predict word type** — noun? number? adjective?
3. **Listen for signpost language** — signals topic changes
4. **Keywords around gaps** help locate your position
5. **Write quickly — use abbreviations** if needed`,
    proTips: [
      "Section 4 KHÔNG có break giữa chừng — đọc tất cả câu hỏi trước khi bài giảng bắt đầu",
      "Signpost phrases là 'GPS' của bạn — chúng cho biết speaker đang ở đâu trong bài giảng",
      "Nếu miss câu, đặt dấu X và tiếp tục — đoán sau khi kết thúc",
    ],
    proTipsEn: [
      "Section 4 has NO break — read all questions before the lecture starts",
      "Signpost phrases are your GPS — they tell you where in the lecture you are",
      "If you miss an answer, mark X and move on — guess at the end",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "Section 4 is a ___ — only one speaker.", textEn: "", answer: "monologue", hint: "độc thoại" },
          { text: "'Moving on to...' is a ___ phrase that signals a topic change.", textEn: "", answer: "signpost", hint: "chỉ dẫn" },
          { text: "Section 4 has no ___ between questions.", textEn: "", answer: "break", hint: "nghỉ" },
        ],
      },
    ],
    quiz: [
      { question: "Section 4 khác các section khác vì:", options: ["Có 2 speakers", "Không có break và chỉ 1 speaker", "Dễ hơn", "Ngắn hơn"], answer: 1, explanation: "Section 4 is a monologue with no break." },
      { question: "'Now let's turn to the second factor...' là:", options: ["Câu hỏi", "Signpost language", "Đáp án", "Kết luận"], answer: 1, explanation: "This signpost phrase indicates a topic change." },
      { question: "Nếu bạn miss câu 35, bạn nên:", options: ["Dừng lại tìm", "Quay lại nghe", "Đánh dấu X và tiếp tục câu 36", "Bỏ cuộc"], answer: 2, explanation: "Mark it and continue — you can guess later." },
      { question: "Trước khi Section 4 bắt đầu, bạn nên:", options: ["Thư giãn", "Đọc tất cả câu hỏi", "Chỉ đọc câu hỏi đầu", "Viết đáp án trước"], answer: 1, explanation: "Read ALL questions since there's no break during the section." },
    ],
  },
  {
    id: "ielts-listening-16",
    title: "Distractor Recognition",
    titleEn: "Distractor Recognition",
    level: 3,
    difficulty: "advanced",
    theory: `**Distractors** là thông tin sai được thiết kế để đánh lừa bạn trong IELTS Listening.

**Các loại distractor phổ biến:**
1. **Self-correction**: "The meeting is on Monday... sorry, I mean Tuesday"
2. **Negation**: "I thought it was expensive but it was actually quite cheap"
3. **Changed opinion**: "I was going to take the bus, but actually I'll drive"
4. **Multiple options mentioned**: "We could go to the beach or the park... let's go to the park"
5. **Numbers changed**: "It's 15... no wait, 50 dollars"

**Chiến lược:**
- LUÔN đợi speaker kết thúc ý trước khi viết đáp án
- Chú ý "but", "actually", "sorry", "I mean", "no wait"
- Đáp án đúng thường là thông tin CUỐI CÙNG được xác nhận`,
    theoryEn: `**Distractors** are wrong information designed to trick you in IELTS Listening.

**Common distractor types:**
1. **Self-correction**: "The meeting is on Monday... sorry, I mean Tuesday"
2. **Negation**: "I thought it was expensive but actually it was cheap"
3. **Changed opinion**: mentions option A then chooses option B
4. **Multiple options**: lists several then confirms one
5. **Number changes**: gives one number then corrects it`,
    proTips: [
      "Keywords cảnh báo distractor: 'but', 'actually', 'sorry', 'I mean', 'no wait', 'on second thought'",
      "Nếu nghe 2 đáp án cho 1 câu → đáp án SAU 'but/actually' thường đúng",
      "Trong MC, nếu nghe tất cả options → chờ speaker xác nhận option nào",
    ],
    proTipsEn: [
      "Distractor alert words: 'but', 'actually', 'sorry', 'I mean', 'on second thought'",
      "If you hear 2 answers for 1 question → the answer AFTER 'but/actually' is usually correct",
      "In MC, if you hear all options mentioned → wait for confirmation",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate word",
        sentences: [
          { text: "A distractor is wrong information designed to ___ you.", textEn: "", answer: "trick", hint: "đánh lừa" },
          { text: "After 'actually' or 'I mean', the ___ answer usually follows.", textEn: "", answer: "correct", hint: "đúng" },
          { text: "Self-correction happens when a speaker ___ what they just said.", textEn: "", answer: "changes", hint: "thay đổi" },
        ],
      },
    ],
    quiz: [
      { question: "'It costs 15 dollars... no sorry, 50 dollars.' Đáp án là:", options: ["15 dollars", "50 dollars", "65 dollars", "Không biết"], answer: 1, explanation: "After 'no sorry', the corrected answer (50) is correct." },
      { question: "Từ nào cảnh báo có distractor?", options: ["And", "Also", "Actually", "Then"], answer: 2, explanation: "'Actually' often introduces a correction/change." },
      { question: "'I was thinking of the bus, but I'll take the train.' → Speaker chọn:", options: ["Bus", "Train", "Cả hai", "Không chọn"], answer: 1, explanation: "After 'but', the speaker confirms 'train'." },
      { question: "Khi nghe tất cả MC options được nói đến, bạn nên:", options: ["Chọn option đầu tiên", "Chọn option cuối cùng", "Chờ speaker xác nhận", "Chọn ngẫu nhiên"], answer: 2, explanation: "Wait for confirmation — the speaker will indicate their choice." },
    ],
  },
  {
    id: "ielts-listening-17",
    title: "Connective Listening — Following Arguments",
    titleEn: "Connective Listening — Following Arguments",
    level: 3,
    difficulty: "advanced",
    theory: `**Connective Listening** là kỹ năng theo dõi chuỗi lập luận trong IELTS Listening Sections 3 & 4.

**Discourse markers quan trọng:**
- **Addition**: moreover, furthermore, in addition, also
- **Contrast**: however, nevertheless, on the other hand, although
- **Cause/Effect**: therefore, consequently, as a result, because
- **Example**: for instance, such as, namely, to illustrate
- **Sequence**: firstly, then, subsequently, finally
- **Summary**: overall, to conclude, in summary, essentially

**Chiến lược:**
1. Discourse markers = roadmap cho nội dung tiếp theo
2. "However" = chuẩn bị nghe ý trái ngược
3. "For example" = minh họa cho ý trước đó
4. "Therefore" = kết luận từ ý trước`,
    theoryEn: `**Connective Listening** is the skill of following argument chains in IELTS Listening.

**Key discourse markers:**
- **Addition**: moreover, furthermore, in addition
- **Contrast**: however, nevertheless, on the other hand
- **Cause/Effect**: therefore, consequently, as a result
- **Example**: for instance, such as, to illustrate
- **Sequence**: firstly, then, subsequently, finally
- **Summary**: overall, to conclude, in summary`,
    proTips: [
      "Discourse markers cho bạn biết LOẠI thông tin tiếp theo sẽ là gì",
      "'However' = prepare for opposite info. 'Therefore' = prepare for conclusion",
      "Ghi chú discourse markers khi nghe giúp theo dõi cấu trúc bài giảng",
    ],
    proTipsEn: [
      "Discourse markers tell you what TYPE of information comes next",
      "'However' = prepare for opposite. 'Therefore' = prepare for conclusion",
      "Noting discourse markers while listening helps track lecture structure",
    ],
    exercises: [
      {
        type: "fill-in-blank" as const,
        instruction: "Điền discourse marker phù hợp",
        instructionEn: "Fill in the appropriate discourse marker",
        sentences: [
          { text: "The results were positive. ___, more research is needed.", textEn: "", answer: "However", hint: "tuy nhiên" },
          { text: "The population grew rapidly. ___, housing demand increased.", textEn: "", answer: "Therefore", hint: "do đó" },
          { text: "There are many benefits. ___, it improves concentration.", textEn: "", answer: "For instance", hint: "ví dụ" },
        ],
      },
    ],
    quiz: [
      { question: "'However' báo hiệu thông tin tiếp theo sẽ:", options: ["Giống ý trước", "Trái ngược ý trước", "Ví dụ cho ý trước", "Kết luận"], answer: 1, explanation: "'However' signals contrasting information." },
      { question: "'Therefore' báo hiệu:", options: ["Ví dụ", "Tương phản", "Kết quả/Kết luận", "Thêm thông tin"], answer: 2, explanation: "'Therefore' signals a conclusion or result." },
      { question: "Discourse markers giúp bạn:", options: ["Học từ vựng mới", "Theo dõi cấu trúc lập luận", "Viết nhanh hơn", "Nghe to hơn"], answer: 1, explanation: "Discourse markers help you follow the argument structure." },
      { question: "'Furthermore' thuộc nhóm:", options: ["Contrast", "Addition", "Example", "Summary"], answer: 1, explanation: "'Furthermore' adds more information = addition." },
    ],
  },
];
