// IELTS Reading & Listening Expansion 2 - 10 new lessons
import type { LanguageLesson } from "./types";

// ===== IELTS READING - 5 new lessons =====

export const ieltsReadingExpansion2Lessons: LanguageLesson[] = [
  {
    id: "ielts-reading-9",
    title: "Diagram & Flow-chart Completion",
    titleEn: "Diagram & Flow-chart Completion",
    level: 3,
    difficulty: "intermediate",
    theory: `**Diagram / Flow-chart Completion** yêu cầu điền nhãn vào sơ đồ hoặc lưu đồ dựa trên passage.

**Chiến lược:**
1. **Xác định loại sơ đồ** - linear flow-chart hay cyclical diagram
2. **Đọc nhãn đã cho** để định hướng vùng đọc trong passage
3. **Tìm sequence markers** - "firstly, then, subsequently, finally"
4. **Chú ý word limit** - câu trả lời thường 1-3 từ

**Lỗi thường gặp:**
- Viết quá số từ cho phép
- Không giữ đúng dạng từ (danh từ / động từ)
- Bỏ qua thứ tự các bước trong quy trình`,
    theoryEn: `**Diagram / Flow-chart Completion** requires labelling a diagram or flow-chart using information from the passage.

**Strategies:**
1. **Identify diagram type** - linear flow-chart or cyclical diagram
2. **Read existing labels** to locate the relevant section in the passage
3. **Look for sequence markers** - "firstly, then, subsequently, finally"
4. **Watch the word limit** - answers are typically 1-3 words

**Common mistakes:**
- Exceeding the word limit
- Not maintaining the correct word form (noun/verb)
- Ignoring the order of steps in the process`,
    proTips: [
      "Sơ đồ thường follow thứ tự trong passage - đọc lần lượt theo flow",
      "Dùng existing labels làm 'anchor' để tìm đoạn chứa câu trả lời",
      "Nếu đề cho 'NO MORE THAN TWO WORDS', 3 từ sẽ sai dù đúng nghĩa",
    ],
    proTipsEn: [
      "Diagrams usually follow passage order - read sequentially with the flow",
      "Use existing labels as anchors to locate answer sections",
      "If instructions say 'NO MORE THAN TWO WORDS', three words is wrong even if correct in meaning",
    ],
    vocabulary: [
      { word: "flow-chart", meaning: "lưu đồ", meaningEn: "a diagram of a sequence of steps", example: "Complete the flow-chart below.", partOfSpeech: "noun" },
      { word: "subsequently", meaning: "sau đó", meaningEn: "after that", example: "The mixture is subsequently heated to 200°C.", partOfSpeech: "adverb" },
      { word: "diagram", meaning: "sơ đồ", meaningEn: "a simplified drawing", example: "Label the diagram using words from the passage.", partOfSpeech: "noun" },
      { word: "process", meaning: "quy trình", meaningEn: "a series of actions", example: "The process involves five main stages.", partOfSpeech: "noun" },
      { word: "sequential", meaning: "tuần tự", meaningEn: "following in order", example: "Read the passage in sequential order.", partOfSpeech: "adjective" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp vào chỗ trống",
        instructionEn: "Fill in the blanks with appropriate words",
        sentences: [
          { text: "First, the raw material is ___ into smaller pieces.", textEn: "First, the raw material is ___ into smaller pieces.", answer: "cut", hint: "c_t" },
          { text: "The liquid is ___ heated to remove impurities.", textEn: "The liquid is ___ heated to remove impurities.", answer: "subsequently", hint: "s___________y" },
          { text: "In the final ___, the product is packaged for distribution.", textEn: "In the final ___, the product is packaged.", answer: "stage", hint: "s___e" },
          { text: "The flow-chart shows a ___ process with six steps.", textEn: "The flow-chart shows a ___ process.", answer: "linear", hint: "l____r" },
          { text: "Each ___ in the diagram represents one phase of production.", textEn: "Each ___ represents one phase.", answer: "label", hint: "l___l" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp các từ thành câu hoàn chỉnh",
        instructionEn: "Rearrange the words to form a complete sentence",
        items: [
          { scrambled: ["diagram", "the", "Complete", "below", "using", "passage", "the"], correct: "Complete the diagram below using the passage" },
          { scrambled: ["labels", "existing", "Use", "locate", "to", "answers"], correct: "Use existing labels to locate answers" },
          { scrambled: ["exceeding", "Avoid", "word", "the", "limit"], correct: "Avoid exceeding the word limit" },
          { scrambled: ["follows", "order", "passage", "The", "diagram", "the"], correct: "The diagram follows the passage order" },
        ],
      },
    ],
    quiz: [
      { question: "What should you do first with a flow-chart question?", options: ["Read the passage entirely", "Identify the diagram type and read existing labels", "Guess the answers", "Skip to the quiz"], answer: 1, explanation: "Identifying the type and reading labels helps you locate relevant passage sections." },
      { question: "If the word limit is 'TWO WORDS AND/OR A NUMBER', which is valid?", options: ["three main stages", "200 degrees", "cut into small pieces", "approximately five"], answer: 1, explanation: "'200 degrees' = one number + one word, within the limit." },
      { question: "Sequence markers like 'subsequently' help you:", options: ["Find the author's opinion", "Identify the order of steps", "Count paragraphs", "Choose headings"], answer: 1, explanation: "Sequence markers signal the order of events in a process." },
      { question: "Flow-chart answers usually appear in passage:", options: ["In random order", "In the same order as the diagram", "Only in the conclusion", "In footnotes"], answer: 1, explanation: "Diagrams and flow-charts typically follow passage order." },
      { question: "What form should your answer be in?", options: ["Always a verb", "Always a noun", "Matching the grammatical slot in the diagram", "A full sentence"], answer: 2, explanation: "Your answer must fit grammatically into the label position." },
    ],
  },
  {
    id: "ielts-reading-10",
    title: "Short-answer Questions",
    titleEn: "Short-answer Questions",
    level: 3,
    difficulty: "intermediate",
    theory: `**Short-answer Questions** yêu cầu trả lời ngắn gọn bằng từ lấy trực tiếp từ passage.

**Chiến lược:**
1. **Đọc câu hỏi trước** - xác định What, Who, Where, When, How
2. **Xác định keywords** trong câu hỏi để scan passage
3. **Trả lời đúng dạng từ** - câu hỏi "How many?" → số, "Where?" → địa điểm
4. **Copy chính xác từ passage** - không paraphrase

**Lỗi thường gặp:**
- Viết câu trả lời dài hơn word limit
- Đưa ra câu trả lời đúng nghĩa nhưng không nằm trong passage
- Sai dạng từ (viết hoa, số nhiều)`,
    theoryEn: `**Short-answer Questions** require brief answers using words directly from the passage.

**Strategies:**
1. **Read questions first** - identify What, Who, Where, When, How
2. **Identify keywords** in questions to scan the passage
3. **Match answer form** - "How many?" → number, "Where?" → place
4. **Copy exactly from the passage** - do not paraphrase

**Common mistakes:**
- Exceeding the word limit
- Giving a correct meaning but not using passage words
- Wrong word form (capitalisation, plurals)`,
    proTips: [
      "Question words cho bạn biết dạng câu trả lời: Who=người, When=thời gian",
      "Câu trả lời nằm theo thứ tự trong passage - question 1 trước question 2",
      "Không bao giờ thêm từ không có trong passage vào câu trả lời",
    ],
    proTipsEn: [
      "Question words tell you the answer type: Who=person, When=time",
      "Answers appear in passage order - question 1 before question 2",
      "Never add words not found in the passage",
    ],
    vocabulary: [
      { word: "locate", meaning: "xác định vị trí", meaningEn: "to find the position of", example: "Locate the relevant section in the passage.", partOfSpeech: "verb" },
      { word: "brief", meaning: "ngắn gọn", meaningEn: "short and concise", example: "Give a brief answer.", partOfSpeech: "adjective" },
      { word: "verbatim", meaning: "nguyên văn", meaningEn: "using exactly the same words", example: "Copy the answer verbatim from the text.", partOfSpeech: "adverb" },
      { word: "scan", meaning: "đọc lướt tìm", meaningEn: "to read quickly looking for specific info", example: "Scan the passage for key dates.", partOfSpeech: "verb" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp vào chỗ trống",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Short-answer questions require you to ___ words directly from the passage.", textEn: "Short-answer questions require you to ___ words directly.", answer: "copy", hint: "c__y" },
          { text: "The question word 'Where' tells you the answer is a ___.", textEn: "The question word 'Where' tells you the answer is a ___.", answer: "place", hint: "p___e" },
          { text: "Answers appear in the same ___ as in the passage.", textEn: "Answers appear in the same ___ as in the passage.", answer: "order", hint: "o___r" },
          { text: "You must not ___ the word limit given in the instructions.", textEn: "You must not ___ the word limit.", answer: "exceed", hint: "e___d" },
          { text: "Use ___ from the question to scan the passage quickly.", textEn: "Use ___ from the question to scan.", answer: "keywords", hint: "k______s" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["exactly", "Copy", "passage", "from", "words", "the"], correct: "Copy words exactly from the passage" },
          { scrambled: ["question", "Read", "the", "carefully", "first"], correct: "Read the question carefully first" },
          { scrambled: ["keywords", "Identify", "scan", "to", "the", "passage"], correct: "Identify keywords to scan the passage" },
        ],
      },
    ],
    quiz: [
      { question: "What must short answers be based on?", options: ["Your own knowledge", "Words from the passage", "General vocabulary", "The title only"], answer: 1, explanation: "Answers must use words directly from the passage." },
      { question: "'How many researchers participated?' - the answer should be:", options: ["A name", "A number", "A place", "A date"], answer: 1, explanation: "'How many' requires a numerical answer." },
      { question: "Can you paraphrase your answer?", options: ["Yes, always", "No, use passage words exactly", "Only for names", "Only if under word limit"], answer: 1, explanation: "Short-answer questions require verbatim words from the passage." },
      { question: "Answers in this question type follow:", options: ["Random order", "Passage order", "Alphabetical order", "Reverse order"], answer: 1, explanation: "Answers appear sequentially in the passage." },
      { question: "If the limit is 'ONE WORD ONLY', which is correct?", options: ["two words", "a short phrase", "one single word", "a full sentence"], answer: 2, explanation: "ONE WORD ONLY means exactly one word." },
    ],
  },
  {
    id: "ielts-reading-11",
    title: "Table Completion",
    titleEn: "Table Completion",
    level: 4,
    difficulty: "advanced",
    theory: `**Table Completion** yêu cầu điền thông tin còn thiếu vào bảng dựa trên passage.

**Chiến lược:**
1. **Đọc tiêu đề cột/hàng** - hiểu bảng đang so sánh điều gì
2. **Xác định pattern** - bảng thường so sánh, phân loại hoặc liệt kê
3. **Dùng thông tin đã có** trong bảng để locate đoạn cần đọc
4. **Chú ý word limit** và dạng từ phù hợp với cột

**Lỗi thường gặp:**
- Điền sai cột (nhầm category)
- Bỏ sót article hoặc preposition khi cần
- Không match dạng từ với các ô khác trong cùng cột`,
    theoryEn: `**Table Completion** requires filling in missing information in a table using the passage.

**Strategies:**
1. **Read column/row headers** - understand what the table compares
2. **Identify the pattern** - tables typically compare, classify, or list
3. **Use existing information** to locate the relevant passage section
4. **Watch word limits** and match word forms to the column

**Common mistakes:**
- Filling in the wrong column (mixing categories)
- Omitting articles or prepositions when needed
- Not matching word forms with other cells in the same column`,
    proTips: [
      "Bảng so sánh thường tương ứng với các đoạn liên tiếp trong passage",
      "Nếu cột chứa toàn danh từ, câu trả lời của bạn cũng phải là danh từ",
      "Đọc dọc theo cột trước khi điền - giữ nhất quán dạng từ",
    ],
    proTipsEn: [
      "Comparison tables typically correspond to consecutive passage paragraphs",
      "If a column contains only nouns, your answer must also be a noun",
      "Read down a column first before filling - maintain consistent word forms",
    ],
    vocabulary: [
      { word: "column", meaning: "cột", meaningEn: "a vertical section of a table", example: "Look at the column headers first.", partOfSpeech: "noun" },
      { word: "row", meaning: "hàng", meaningEn: "a horizontal section of a table", example: "Each row represents a different category.", partOfSpeech: "noun" },
      { word: "classify", meaning: "phân loại", meaningEn: "to arrange into groups", example: "The table classifies animals by habitat.", partOfSpeech: "verb" },
      { word: "corresponding", meaning: "tương ứng", meaningEn: "matching or equivalent", example: "Find the corresponding paragraph.", partOfSpeech: "adjective" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Read the column ___ to understand the table structure.", textEn: "Read the column ___ to understand the table.", answer: "headers", hint: "h_____s" },
          { text: "Each ___ in the table represents a different item or category.", textEn: "Each ___ represents a different item.", answer: "row", hint: "r_w" },
          { text: "Tables often ___ information into groups for comparison.", textEn: "Tables often ___ information into groups.", answer: "classify", hint: "c______y" },
          { text: "Use the ___ data in the table to locate answers in the passage.", textEn: "Use the ___ data to locate answers.", answer: "existing", hint: "e______g" },
          { text: "Match the ___ form of your answer with other cells in the column.", textEn: "Match the ___ form with other cells.", answer: "word", hint: "w__d" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["headers", "Read", "column", "and", "row", "first"], correct: "Read column and row headers first" },
          { scrambled: ["information", "existing", "Use", "locate", "to", "answers"], correct: "Use existing information to locate answers" },
          { scrambled: ["word", "the", "Match", "form", "consistently"], correct: "Match the word form consistently" },
        ],
      },
    ],
    quiz: [
      { question: "What should you read first in a table completion task?", options: ["The passage introduction", "Column and row headers", "The last paragraph", "The instructions only"], answer: 1, explanation: "Headers tell you what the table is organising." },
      { question: "If all cells in a column are nouns, your answer should be:", options: ["A verb", "An adjective", "A noun", "A full sentence"], answer: 2, explanation: "Maintain consistency with the column's word form." },
      { question: "Table rows typically correspond to:", options: ["Random passage sections", "Consecutive paragraphs or sections", "Only the introduction", "Footnotes"], answer: 1, explanation: "Information for table rows usually appears in order in the passage." },
      { question: "Which is a common mistake?", options: ["Reading headers", "Filling in the wrong column", "Checking word limits", "Scanning for keywords"], answer: 1, explanation: "Mixing up categories leads to wrong-column errors." },
      { question: "Word limit 'NO MORE THAN THREE WORDS' means:", options: ["Exactly three words", "Up to three words", "At least three words", "Three sentences"], answer: 1, explanation: "You can use one, two, or three words - but not more." },
    ],
  },
  {
    id: "ielts-reading-12",
    title: "List Selection",
    titleEn: "List Selection",
    level: 4,
    difficulty: "advanced",
    theory: `**List Selection** yêu cầu chọn mục đúng từ danh sách đã cho để trả lời câu hỏi.

**Chiến lược:**
1. **Đọc danh sách options trước** - hiểu các lựa chọn có gì
2. **Đọc câu hỏi/statement** - xác định thông tin cần tìm
3. **Scan passage** tìm đoạn liên quan đến mỗi statement
4. **So khớp meaning** - đáp án thường paraphrase, không copy nguyên văn

**Phân biệt với Matching Information:**
- List Selection: chọn từ danh sách cố định (A-F)
- Matching Information: match câu hỏi với đoạn văn (i-viii)`,
    theoryEn: `**List Selection** requires choosing correct items from a given list to answer questions.

**Strategies:**
1. **Read the options list first** - understand what choices exist
2. **Read each question/statement** - identify what info is needed
3. **Scan the passage** for sections related to each statement
4. **Match meaning** - answers are typically paraphrased, not verbatim

**Difference from Matching Information:**
- List Selection: choose from a fixed list (A-F)
- Matching Information: match questions to paragraphs (i-viii)`,
    proTips: [
      "Một option có thể được dùng nhiều lần - đọc kỹ instructions",
      "Loại trừ options rõ ràng sai để thu hẹp phạm vi",
      "Chú ý synonyms giữa list options và passage text",
    ],
    proTipsEn: [
      "An option may be used more than once - read instructions carefully",
      "Eliminate clearly wrong options to narrow the range",
      "Watch for synonyms between list options and passage text",
    ],
    vocabulary: [
      { word: "option", meaning: "lựa chọn", meaningEn: "a choice", example: "Select the correct option from the list.", partOfSpeech: "noun" },
      { word: "eliminate", meaning: "loại trừ", meaningEn: "to remove from consideration", example: "Eliminate answers that don't match.", partOfSpeech: "verb" },
      { word: "correspond", meaning: "tương ứng", meaningEn: "to match or relate to", example: "Each statement corresponds to one option.", partOfSpeech: "verb" },
      { word: "criterion", meaning: "tiêu chí", meaningEn: "a standard for judgement", example: "Select the option that meets the criterion.", partOfSpeech: "noun" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Read the ___ list before reading the passage.", textEn: "Read the ___ list before reading.", answer: "options", hint: "o_____s" },
          { text: "Each statement ___ to one item in the list.", textEn: "Each statement ___ to one item.", answer: "corresponds", hint: "c__________s" },
          { text: "___ clearly wrong answers to narrow your choices.", textEn: "___ clearly wrong answers.", answer: "Eliminate", hint: "E_______e" },
          { text: "Options may be ___ more than once.", textEn: "Options may be ___ more than once.", answer: "used", hint: "u__d" },
          { text: "Answers are often ___ rather than copied from the passage.", textEn: "Answers are often ___.", answer: "paraphrased", hint: "p__________d" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["the", "Read", "options", "list", "first"], correct: "Read the options list first" },
          { scrambled: ["wrong", "Eliminate", "clearly", "options", "quickly"], correct: "Eliminate clearly wrong options quickly" },
          { scrambled: ["can", "Options", "used", "be", "multiple", "times"], correct: "Options can be used multiple times" },
        ],
      },
    ],
    quiz: [
      { question: "In List Selection, what should you read first?", options: ["The passage", "The options list", "The title", "The conclusion"], answer: 1, explanation: "Reading options first helps you know what to look for." },
      { question: "Can one option be used for multiple questions?", options: ["Never", "Only if stated in instructions", "Always", "Only for the last question"], answer: 1, explanation: "Check instructions - some allow reuse, some don't." },
      { question: "Answers in List Selection are usually:", options: ["Verbatim copies", "Paraphrased versions of passage text", "Made up by the test taker", "Numbers only"], answer: 1, explanation: "Options paraphrase passage content rather than copying exactly." },
      { question: "How does List Selection differ from Matching Information?", options: ["They are identical", "List Selection uses a fixed list; Matching Information uses paragraphs", "List Selection is easier", "There is no difference"], answer: 1, explanation: "List Selection matches to list items; Matching Info matches to paragraphs." },
      { question: "A good strategy is to:", options: ["Read the passage three times", "Eliminate obviously wrong options first", "Answer randomly", "Only read the first paragraph"], answer: 1, explanation: "Elimination narrows choices and saves time." },
    ],
  },
  {
    id: "ielts-reading-13",
    title: "Passage-based Inference & Author Purpose",
    titleEn: "Inference & Author Purpose",
    level: 5,
    difficulty: "advanced",
    theory: `**Inference & Author Purpose** là dạng câu hỏi nâng cao yêu cầu suy luận từ passage.

**Chiến lược:**
1. **Inference (Suy luận):** Đáp án không được nói trực tiếp - phải "đọc giữa các dòng"
2. **Author Purpose:** Xác định tại sao tác giả viết đoạn/bài đó
3. **Tìm signpost language:** "This suggests that...", "It can be inferred..."
4. **Loại trừ đáp án quá cực đoan** - "always", "never" thường sai

**Mức Band 7.0+ cần:**
- Phân biệt fact vs opinion
- Nhận diện tone (neutral, critical, supportive)
- Hiểu implicit meaning (nghĩa ngầm)`,
    theoryEn: `**Inference & Author Purpose** are advanced question types requiring deduction from the passage.

**Strategies:**
1. **Inference:** The answer is not stated directly - you must "read between the lines"
2. **Author Purpose:** Determine why the author wrote that section/passage
3. **Find signpost language:** "This suggests that...", "It can be inferred..."
4. **Eliminate extreme answers** - "always", "never" are usually wrong

**Band 7.0+ requirements:**
- Distinguish fact vs opinion
- Identify tone (neutral, critical, supportive)
- Understand implicit meaning`,
    proTips: [
      "Đáp án inference đúng phải có evidence trong passage, dù không nói trực tiếp",
      "Author purpose thường liên quan đến: inform, persuade, compare, argue, describe",
      "Đáp án chứa 'always', 'never', 'all' thường là trap - quá tuyệt đối",
    ],
    proTipsEn: [
      "Correct inferences must have supporting evidence in the passage",
      "Author purpose usually relates to: inform, persuade, compare, argue, describe",
      "Answers containing 'always', 'never', 'all' are usually traps - too absolute",
    ],
    vocabulary: [
      { word: "inference", meaning: "suy luận", meaningEn: "a conclusion drawn from evidence", example: "What inference can be drawn from paragraph 3?", partOfSpeech: "noun" },
      { word: "imply", meaning: "ngụ ý", meaningEn: "to suggest without stating directly", example: "The author implies that the policy failed.", partOfSpeech: "verb" },
      { word: "tone", meaning: "giọng điệu", meaningEn: "the attitude expressed in writing", example: "The tone of the passage is critical.", partOfSpeech: "noun" },
      { word: "persuade", meaning: "thuyết phục", meaningEn: "to convince", example: "The author's purpose is to persuade readers.", partOfSpeech: "verb" },
      { word: "implicit", meaning: "ngầm, ẩn ý", meaningEn: "not directly expressed", example: "There is an implicit criticism of the system.", partOfSpeech: "adjective" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "An ___ is a conclusion drawn from evidence rather than stated directly.", textEn: "An ___ is a conclusion drawn from evidence.", answer: "inference", hint: "i________e" },
          { text: "The author ___ that renewable energy is the only viable solution.", textEn: "The author ___ that renewable energy is the only viable solution.", answer: "implies", hint: "i_____s" },
          { text: "The ___ of the passage is neutral and informative.", textEn: "The ___ of the passage is neutral.", answer: "tone", hint: "t__e" },
          { text: "Answers containing 'always' or 'never' are often too ___.", textEn: "Answers containing 'always' or 'never' are too ___.", answer: "extreme", hint: "e_____e" },
          { text: "The author's main ___ is to persuade readers to recycle more.", textEn: "The author's main ___ is to persuade.", answer: "purpose", hint: "p______e" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["between", "Read", "lines", "the", "for", "inferences"], correct: "Read between the lines for inferences" },
          { scrambled: ["extreme", "Eliminate", "options", "first", "answers"], correct: "Eliminate extreme answers options first" },
          { scrambled: ["purpose", "Identify", "author's", "the", "main"], correct: "Identify the author's main purpose" },
          { scrambled: ["fact", "Distinguish", "opinion", "from", "carefully"], correct: "Distinguish fact from opinion carefully" },
        ],
      },
    ],
    quiz: [
      { question: "An inference means:", options: ["A direct quote from the passage", "A conclusion supported by evidence but not stated explicitly", "A random guess", "The title of the passage"], answer: 1, explanation: "Inferences require reading between the lines with textual support." },
      { question: "Which word signals an extreme (likely wrong) answer?", options: ["Sometimes", "Often", "Always", "Usually"], answer: 2, explanation: "'Always' is absolute and rarely correct in IELTS reading." },
      { question: "Author purpose questions ask:", options: ["What the passage says", "Why the author wrote it", "How many words are used", "When it was written"], answer: 1, explanation: "Purpose questions focus on the writer's intention." },
      { question: "'The tone is critical' means the author is:", options: ["Supportive", "Expressing disapproval or negative evaluation", "Neutral", "Confused"], answer: 1, explanation: "A critical tone indicates negative judgement or evaluation." },
      { question: "For Band 7.0+, you need to identify:", options: ["Only main ideas", "Fact vs opinion and implicit meaning", "Just vocabulary", "The number of paragraphs"], answer: 1, explanation: "Higher bands require understanding implied meanings and distinguishing facts from opinions." },
    ],
  },
];

// ===== IELTS LISTENING - 5 new lessons =====

export const ieltsListeningExpansion2Lessons: LanguageLesson[] = [
  {
    id: "ielts-listening-7",
    title: "Form & Note Completion (Section 1)",
    titleEn: "Form & Note Completion",
    level: 2,
    difficulty: "beginner",
    theory: `**Form & Note Completion** là dạng phổ biến nhất ở Section 1 - điền thông tin vào form/note.

**Chiến lược:**
1. **Đọc form trước khi nghe** - dự đoán loại thông tin cần điền (tên, số, ngày)
2. **Chú ý spelling** - tên riêng thường được đánh vần letter by letter
3. **Nghe signpost phrases:** "Can I take your name?", "What's the address?"
4. **Viết nhanh** - dùng abbreviation rồi kiểm tra sau

**Loại thông tin thường gặp:**
- Names, addresses, phone numbers, dates
- Prices, times, reference numbers
- Simple descriptions (colour, size)`,
    theoryEn: `**Form & Note Completion** is the most common type in Section 1 - filling in forms or notes.

**Strategies:**
1. **Read the form before listening** - predict what info is needed (name, number, date)
2. **Pay attention to spelling** - proper nouns are often spelled out letter by letter
3. **Listen for signpost phrases:** "Can I take your name?", "What's the address?"
4. **Write quickly** - use abbreviations and check later

**Common information types:**
- Names, addresses, phone numbers, dates
- Prices, times, reference numbers
- Simple descriptions (colour, size)`,
    proTips: [
      "Section 1 luôn là cuộc hội thoại 2 người - thường về booking, inquiry, registration",
      "Nếu nghe đánh vần: viết từng chữ cái, đừng cố đoán cả từ",
      "Chú ý 'correction' - người nói thường sửa lại: 'No wait, it's actually...'",
    ],
    proTipsEn: [
      "Section 1 is always a two-person conversation - usually about booking, inquiry, registration",
      "When they spell: write each letter, don't try to guess the whole word",
      "Watch for corrections - speakers often self-correct: 'No wait, it's actually...'",
    ],
    vocabulary: [
      { word: "registration", meaning: "đăng ký", meaningEn: "the act of signing up", example: "Please complete the registration form.", partOfSpeech: "noun" },
      { word: "inquiry", meaning: "yêu cầu thông tin", meaningEn: "a request for information", example: "I'm calling to make an inquiry about the course.", partOfSpeech: "noun" },
      { word: "reference number", meaning: "số tham chiếu", meaningEn: "an identifying number", example: "Your reference number is BK2045.", partOfSpeech: "noun" },
      { word: "postcode", meaning: "mã bưu chính", meaningEn: "zip/postal code", example: "The postcode is SW1A 1AA.", partOfSpeech: "noun" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Please complete the ___ form with your personal details.", textEn: "Please complete the ___ form.", answer: "registration", hint: "r___________n" },
          { text: "Your ___ number is used to track your booking.", textEn: "Your ___ number is used to track your booking.", answer: "reference", hint: "r________e" },
          { text: "I'm calling to make an ___ about available courses.", textEn: "I'm calling to make an ___.", answer: "inquiry", hint: "i_____y" },
          { text: "Listen carefully when the speaker ___ their name letter by letter.", textEn: "Listen when the speaker ___ their name.", answer: "spells", hint: "s____s" },
          { text: "Section 1 is always a ___ between two people.", textEn: "Section 1 is always a ___.", answer: "conversation", hint: "c____________n" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["form", "Read", "the", "before", "listening"], correct: "Read the form before listening" },
          { scrambled: ["the", "for", "Listen", "spelling", "carefully"], correct: "Listen for the spelling carefully" },
          { scrambled: ["corrections", "for", "Watch", "speaker", "out"], correct: "Watch out for speaker corrections" },
        ],
      },
    ],
    quiz: [
      { question: "Section 1 is always:", options: ["A monologue", "A two-person conversation", "A group discussion", "A lecture"], answer: 1, explanation: "Section 1 is always a dialogue between two people." },
      { question: "When a speaker spells a name, you should:", options: ["Guess the word", "Write each letter as you hear it", "Wait until they finish", "Ignore it"], answer: 1, explanation: "Writing each letter prevents spelling errors." },
      { question: "Signpost phrases like 'Can I take your name?' indicate:", options: ["The end of the recording", "Information is about to be given", "A change of topic", "An error"], answer: 1, explanation: "These phrases signal that key information follows." },
      { question: "What should you watch for after an answer is given?", options: ["Background music", "Self-corrections by the speaker", "Silence", "Applause"], answer: 1, explanation: "Speakers often correct themselves: 'Actually, it's...'." },
      { question: "Common Section 1 topics include:", options: ["Academic lectures", "Booking, registration, and inquiries", "Scientific research", "Political debates"], answer: 1, explanation: "Section 1 covers everyday transactional scenarios." },
    ],
  },
  {
    id: "ielts-listening-8",
    title: "Signpost Language & Prediction",
    titleEn: "Signpost Language & Prediction Techniques",
    level: 3,
    difficulty: "intermediate",
    theory: `**Signpost Language** là các cụm từ báo hiệu giúp bạn dự đoán thông tin sắp nghe.

**Các loại Signpost:**
1. **Introduction:** "Today I'd like to talk about...", "The main focus is..."
2. **Sequence:** "Firstly...", "Moving on to...", "Finally..."
3. **Contrast:** "However...", "On the other hand...", "Although..."
4. **Emphasis:** "What's particularly important is...", "The key point here..."
5. **Examples:** "For instance...", "Take the case of...", "Such as..."

**Kỹ thuật Prediction:**
- Đọc câu hỏi trước → dự đoán loại câu trả lời
- Nghe signpost → biết khi nào answer sắp đến
- Dùng ngữ cảnh xung quanh gap để đoán word form`,
    theoryEn: `**Signpost Language** consists of signal phrases that help predict upcoming information.

**Types of Signposts:**
1. **Introduction:** "Today I'd like to talk about...", "The main focus is..."
2. **Sequence:** "Firstly...", "Moving on to...", "Finally..."
3. **Contrast:** "However...", "On the other hand...", "Although..."
4. **Emphasis:** "What's particularly important is...", "The key point here..."
5. **Examples:** "For instance...", "Take the case of...", "Such as..."

**Prediction Techniques:**
- Read questions first → predict answer type
- Hear signpost → know the answer is coming
- Use context around the gap to guess word form`,
    proTips: [
      "'However' và 'But' thường báo hiệu thông tin quan trọng tiếp theo",
      "Khi nghe 'The key point is...' - tập trung cao độ, answer thường ở ngay sau",
      "Prediction giúp bạn biết LOẠI từ cần nghe (noun, number, adjective)",
    ],
    proTipsEn: [
      "'However' and 'But' often signal important information ahead",
      "When you hear 'The key point is...' - focus hard, the answer usually follows",
      "Prediction helps you know the TYPE of word to listen for (noun, number, adjective)",
    ],
    vocabulary: [
      { word: "signpost", meaning: "dấu hiệu chỉ dẫn", meaningEn: "a signal indicating direction", example: "Listen for signpost language to follow the talk.", partOfSpeech: "noun" },
      { word: "predict", meaning: "dự đoán", meaningEn: "to guess in advance", example: "Try to predict the answer before listening.", partOfSpeech: "verb" },
      { word: "contrast", meaning: "tương phản", meaningEn: "a difference between two things", example: "'However' introduces a contrast.", partOfSpeech: "noun" },
      { word: "emphasis", meaning: "nhấn mạnh", meaningEn: "special importance given to something", example: "The speaker placed emphasis on sustainability.", partOfSpeech: "noun" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "'However' is a ___ word that introduces a contrasting idea.", textEn: "'However' is a ___ word.", answer: "signpost", hint: "s______t" },
          { text: "Before listening, try to ___ the type of answer needed.", textEn: "Before listening, try to ___ the answer type.", answer: "predict", hint: "p_____t" },
          { text: "'Moving on to...' signals a ___ to a new topic.", textEn: "'Moving on to...' signals a ___.", answer: "transition", hint: "t_________n" },
          { text: "'For instance' introduces an ___ to support the main point.", textEn: "'For instance' introduces an ___.", answer: "example", hint: "e_____e" },
          { text: "The phrase 'The key point is' adds ___ to what follows.", textEn: "The phrase adds ___.", answer: "emphasis", hint: "e______s" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["signpost", "Listen", "for", "language", "carefully"], correct: "Listen for signpost language carefully" },
          { scrambled: ["answers", "Predict", "before", "listening", "to", "audio"], correct: "Predict answers before listening to audio" },
          { scrambled: ["contrast", "signals", "However", "a", "often"], correct: "However often signals a contrast" },
        ],
      },
    ],
    quiz: [
      { question: "'On the other hand' signals:", options: ["Agreement", "A contrast", "An example", "A conclusion"], answer: 1, explanation: "'On the other hand' introduces an opposing idea." },
      { question: "Prediction means:", options: ["Listening twice", "Guessing the answer type before hearing it", "Writing slowly", "Skipping questions"], answer: 1, explanation: "Prediction helps you know what to listen for." },
      { question: "'What's particularly important is...' - you should:", options: ["Relax", "Focus intensely on what follows", "Skip ahead", "Write nothing"], answer: 1, explanation: "Emphasis phrases signal that key information is coming." },
      { question: "Sequence signposts include:", options: ["However, but", "Firstly, moving on to, finally", "For instance, such as", "In my opinion"], answer: 1, explanation: "These words indicate the order of points being made." },
      { question: "Why is prediction important?", options: ["It saves ink", "It reduces listening fatigue", "It tells you the word TYPE to listen for", "It replaces listening"], answer: 2, explanation: "Predicting the word form helps you catch the answer." },
    ],
  },
  {
    id: "ielts-listening-9",
    title: "Dealing with Distractors",
    titleEn: "Handling Distractors in Listening",
    level: 4,
    difficulty: "advanced",
    theory: `**Distractors** là thông tin sai được cố ý đưa vào để đánh lạc hướng.

**Cách nhận diện Distractor:**
1. **Self-correction:** "It's on Monday... no, sorry, Tuesday" → đáp án là Tuesday
2. **Negation:** "I thought it was expensive, but actually it's quite reasonable" → reasonable
3. **Multiple speakers:** Người A nói giá $50, người B sửa thành $45 → $45
4. **Conditional:** "If it rains, we'll meet indoors" - chưa chắc đã xảy ra

**Nguyên tắc vàng:**
- Đáp án CUỐI CÙNG sau khi sửa mới là đáp án đúng
- Chú ý "but", "actually", "in fact", "no wait" - thường intro đáp án thật
- Đừng vội chọn thông tin đầu tiên nghe được`,
    theoryEn: `**Distractors** are incorrect information deliberately included to mislead you.

**How to identify Distractors:**
1. **Self-correction:** "It's on Monday... no, sorry, Tuesday" → answer is Tuesday
2. **Negation:** "I thought it was expensive, but actually it's quite reasonable" → reasonable
3. **Multiple speakers:** Speaker A says $50, Speaker B corrects to $45 → $45
4. **Conditional:** "If it rains, we'll meet indoors" - may not happen

**Golden rules:**
- The FINAL answer after corrections is the correct one
- Watch for "but", "actually", "in fact", "no wait" - they often introduce the real answer
- Don't rush to select the first piece of information you hear`,
    proTips: [
      "Nếu đáp án đến quá dễ và quá sớm - rất có thể đó là distractor",
      "'Actually' và 'In fact' gần như luôn đi trước đáp án đúng",
      "Conditional (If...) thường KHÔNG phải đáp án vì chưa xác nhận",
    ],
    proTipsEn: [
      "If an answer comes too easily and too early - it's likely a distractor",
      "'Actually' and 'In fact' almost always precede the correct answer",
      "Conditional statements (If...) are usually NOT the answer as they're unconfirmed",
    ],
    vocabulary: [
      { word: "distractor", meaning: "yếu tố gây nhiễu", meaningEn: "information designed to mislead", example: "Be careful of distractors in Section 3.", partOfSpeech: "noun" },
      { word: "self-correction", meaning: "tự sửa lỗi", meaningEn: "correcting oneself", example: "The speaker made a self-correction mid-sentence.", partOfSpeech: "noun" },
      { word: "negation", meaning: "phủ định", meaningEn: "denial or contradiction", example: "Negation words change the meaning entirely.", partOfSpeech: "noun" },
      { word: "conditional", meaning: "có điều kiện", meaningEn: "dependent on a condition", example: "'If it rains' is a conditional statement.", partOfSpeech: "adjective" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "A ___ is false information designed to mislead test takers.", textEn: "A ___ is false information designed to mislead.", answer: "distractor", hint: "d_________r" },
          { text: "When a speaker says 'no, sorry', they are making a ___.", textEn: "When a speaker says 'no, sorry', they make a ___.", answer: "self-correction", hint: "s___-c________n" },
          { text: "The word 'actually' often introduces the ___ answer.", textEn: "'Actually' often introduces the ___ answer.", answer: "correct", hint: "c_____t" },
          { text: "___ statements with 'if' are usually not the final answer.", textEn: "___ statements with 'if' are usually not final.", answer: "Conditional", hint: "C__________l" },
          { text: "Don't rush to select the ___ piece of information you hear.", textEn: "Don't rush to select the ___ information.", answer: "first", hint: "f___t" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["answer", "The", "final", "is", "the", "correct", "one"], correct: "The final answer is the correct one" },
          { scrambled: ["for", "Watch", "self-corrections", "speakers'", "out"], correct: "Watch out for speakers' self-corrections" },
          { scrambled: ["first", "select", "Don't", "the", "answer", "heard"], correct: "Don't select the first answer heard" },
        ],
      },
    ],
    quiz: [
      { question: "'It's on Monday... no, Tuesday' - the answer is:", options: ["Monday", "Tuesday", "Both", "Neither"], answer: 1, explanation: "The corrected information (Tuesday) is the real answer." },
      { question: "Which word usually introduces the correct answer?", options: ["Maybe", "If", "Actually", "Perhaps"], answer: 2, explanation: "'Actually' typically precedes the corrected, true answer." },
      { question: "A conditional statement ('If it rains...') is:", options: ["Always the answer", "Never mentioned", "Usually NOT the answer", "The best answer"], answer: 2, explanation: "Conditionals are hypothetical and unconfirmed." },
      { question: "If an answer seems too easy and comes early:", options: ["It's definitely correct", "It's likely a distractor", "Write it immediately", "Ignore the rest"], answer: 1, explanation: "Easy early answers are often distractors to trap careless listeners." },
      { question: "Multiple speakers correcting each other means:", options: ["Both are right", "The first speaker is right", "The last corrected version is right", "Neither is right"], answer: 2, explanation: "The final corrected information is the intended answer." },
    ],
  },
  {
    id: "ielts-listening-10",
    title: "Sentence Completion in Listening",
    titleEn: "Sentence Completion Strategies",
    level: 3,
    difficulty: "intermediate",
    theory: `**Sentence Completion** yêu cầu nghe và điền từ để hoàn thành câu.

**Chiến lược:**
1. **Đọc câu trước khi nghe** - xác định vị trí gap và dự đoán word form
2. **Grammar clues:** Article (a/an) trước gap → noun; to + gap → verb
3. **Paraphrasing:** Câu trong đề thường paraphrase từ audio
4. **Word limit:** Tuân thủ nghiêm ngặt - "NO MORE THAN TWO WORDS"

**Mẹo quan trọng:**
- Gap ở cuối câu → thường là noun hoặc noun phrase
- Gap sau "very" hoặc "quite" → adjective
- Gap sau "to" → verb (infinitive)`,
    theoryEn: `**Sentence Completion** requires listening and filling in words to complete sentences.

**Strategies:**
1. **Read sentences before listening** - identify gap positions and predict word forms
2. **Grammar clues:** Article (a/an) before gap → noun; "to" + gap → verb
3. **Paraphrasing:** The written sentence often paraphrases the audio
4. **Word limit:** Follow strictly - "NO MORE THAN TWO WORDS"

**Key tips:**
- Gap at end of sentence → usually a noun or noun phrase
- Gap after "very" or "quite" → adjective
- Gap after "to" → verb (infinitive)`,
    proTips: [
      "Câu trong đề KHÔNG giống y chang audio - luôn có paraphrasing",
      "Dùng grammar context để thu hẹp loại từ cần nghe",
      "Nếu nghe được từ đúng nhưng vượt word limit - tìm phiên bản ngắn hơn",
    ],
    proTipsEn: [
      "Written sentences are NEVER identical to audio - there's always paraphrasing",
      "Use grammar context to narrow down the word type needed",
      "If you hear the right word but it exceeds the limit - look for a shorter version",
    ],
    vocabulary: [
      { word: "completion", meaning: "hoàn thành", meaningEn: "the act of finishing", example: "Sentence completion requires careful listening.", partOfSpeech: "noun" },
      { word: "paraphrase", meaning: "diễn đạt lại", meaningEn: "to restate in different words", example: "The question paraphrases the audio.", partOfSpeech: "verb" },
      { word: "infinitive", meaning: "nguyên mẫu (động từ)", meaningEn: "base form of a verb", example: "'To learn' is an infinitive.", partOfSpeech: "noun" },
      { word: "context", meaning: "ngữ cảnh", meaningEn: "the situation around something", example: "Use the sentence context to predict the answer.", partOfSpeech: "noun" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Read the ___ carefully before the audio starts.", textEn: "Read the ___ carefully before audio.", answer: "sentences", hint: "s________s" },
          { text: "A gap after 'a' or 'an' usually requires a ___.", textEn: "A gap after 'a' or 'an' requires a ___.", answer: "noun", hint: "n__n" },
          { text: "The written question ___ the words from the audio.", textEn: "The written question ___ the audio words.", answer: "paraphrases", hint: "p__________s" },
          { text: "Always check the ___ limit before writing your answer.", textEn: "Always check the ___ limit.", answer: "word", hint: "w__d" },
          { text: "A gap after 'to' usually requires a ___ in base form.", textEn: "A gap after 'to' requires a ___.", answer: "verb", hint: "v__b" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["before", "Read", "sentences", "listening", "the"], correct: "Read the sentences before listening" },
          { scrambled: ["grammar", "Use", "predict", "clues", "to", "answers"], correct: "Use grammar clues to predict answers" },
          { scrambled: ["limit", "the", "Follow", "word", "strictly"], correct: "Follow the word limit strictly" },
        ],
      },
    ],
    quiz: [
      { question: "Before listening, you should:", options: ["Close your eyes", "Read the sentences and predict answers", "Write random words", "Skip the instructions"], answer: 1, explanation: "Pre-reading helps you predict answer types." },
      { question: "A gap after 'an' likely needs:", options: ["A verb", "An adjective", "A noun starting with a vowel sound", "An adverb"], answer: 2, explanation: "'An' precedes nouns starting with a vowel sound." },
      { question: "Written questions compared to audio are:", options: ["Identical", "Paraphrased versions", "Completely different topics", "In different languages"], answer: 1, explanation: "Questions paraphrase what you hear." },
      { question: "If your answer exceeds the word limit:", options: ["It's still correct", "You lose marks", "Add it anyway", "The examiner ignores limits"], answer: 1, explanation: "Exceeding the word limit means a wrong answer." },
      { question: "A gap after 'very' likely needs:", options: ["A noun", "A verb", "An adjective", "A preposition"], answer: 2, explanation: "'Very' modifies adjectives: 'very important', 'very large'." },
    ],
  },
  {
    id: "ielts-listening-11",
    title: "Plan & Map Labelling (Advanced)",
    titleEn: "Advanced Plan & Map Labelling",
    level: 4,
    difficulty: "advanced",
    theory: `**Plan & Map Labelling nâng cao** xử lý các bản đồ phức tạp hơn với nhiều landmarks.

**Chiến lược nâng cao:**
1. **Xác định orientation** - North/South/East/West, entrance, main road
2. **Theo dõi movement words:** "go past", "turn left at", "opposite to", "adjacent to"
3. **Landmarks làm anchor:** "next to the library", "between X and Y"
4. **Multiple options:** Khi có nhiều label cần gán - đánh dấu đã dùng

**Từ vựng vị trí quan trọng:**
- Adjacent to = bên cạnh
- Opposite = đối diện  
- Beyond = phía bên kia
- At the far end = ở cuối xa nhất
- On the corner of = ở góc`,
    theoryEn: `**Advanced Plan & Map Labelling** handles more complex maps with multiple landmarks.

**Advanced strategies:**
1. **Identify orientation** - North/South/East/West, entrance, main road
2. **Track movement words:** "go past", "turn left at", "opposite to", "adjacent to"
3. **Use landmarks as anchors:** "next to the library", "between X and Y"
4. **Multiple options:** When assigning many labels - mark used ones

**Key position vocabulary:**
- Adjacent to = next to
- Opposite = facing across from
- Beyond = on the far side of
- At the far end = at the furthest point
- On the corner of = at the junction`,
    proTips: [
      "Bắt đầu từ entrance hoặc 'you are here' marker - follow hướng di chuyển",
      "Dùng bút chì đánh dấu trên map khi nghe - trace the route",
      "'Go past X' nghĩa là X ở bên cạnh đường đi, nhưng KHÔNG PHẢI đáp án",
    ],
    proTipsEn: [
      "Start from the entrance or 'you are here' marker - follow the movement",
      "Use pencil to mark on the map as you listen - trace the route",
      "'Go past X' means X is beside the path but is NOT the answer",
    ],
    vocabulary: [
      { word: "adjacent", meaning: "liền kề", meaningEn: "next to, beside", example: "The café is adjacent to the bookshop.", partOfSpeech: "adjective" },
      { word: "opposite", meaning: "đối diện", meaningEn: "facing, across from", example: "The bank is opposite the post office.", partOfSpeech: "preposition" },
      { word: "beyond", meaning: "phía bên kia", meaningEn: "on the far side of", example: "The park is beyond the bridge.", partOfSpeech: "preposition" },
      { word: "intersection", meaning: "ngã tư", meaningEn: "where two roads cross", example: "Turn right at the intersection.", partOfSpeech: "noun" },
      { word: "landmark", meaning: "mốc", meaningEn: "a recognizable feature", example: "Use the clock tower as a landmark.", partOfSpeech: "noun" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "The pharmacy is ___ to the supermarket.", textEn: "The pharmacy is ___ to the supermarket.", answer: "adjacent", hint: "a______t" },
          { text: "The school is ___ the hospital - directly across the road.", textEn: "The school is ___ the hospital.", answer: "opposite", hint: "o______e" },
          { text: "Walk ___ the library and the museum is on your left.", textEn: "Walk ___ the library.", answer: "past", hint: "p__t" },
          { text: "The garden is at the ___ end of the campus.", textEn: "The garden is at the ___ end.", answer: "far", hint: "f_r" },
          { text: "Turn left at the ___ where the two roads meet.", textEn: "Turn left at the ___.", answer: "intersection", hint: "i___________n" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu",
        instructionEn: "Rearrange to form a sentence",
        items: [
          { scrambled: ["from", "Start", "entrance", "the", "map", "the"], correct: "Start the map from the entrance" },
          { scrambled: ["landmarks", "Use", "navigate", "to", "the", "map"], correct: "Use landmarks to navigate the map" },
          { scrambled: ["route", "the", "Trace", "with", "pencil", "a"], correct: "Trace the route with a pencil" },
        ],
      },
    ],
    quiz: [
      { question: "'Adjacent to' means:", options: ["Far from", "Next to", "Above", "Behind"], answer: 1, explanation: "'Adjacent to' means right next to, beside." },
      { question: "Where should you start on a map?", options: ["The centre", "The entrance or 'you are here' point", "The top-right corner", "Anywhere"], answer: 1, explanation: "Starting from the entrance helps you follow the speaker's directions." },
      { question: "'Go past the library' means the library is:", options: ["The answer", "Something you walk by, not the answer", "Not on the map", "The final destination"], answer: 1, explanation: "'Go past' means the library is on your route but isn't the target location." },
      { question: "'At the far end' refers to:", options: ["The nearest point", "The furthest point of a space", "The middle", "The entrance"], answer: 1, explanation: "'Far end' is the point furthest from where you start." },
      { question: "When labelling a plan with many options, you should:", options: ["Use each label twice", "Mark used labels to avoid duplication", "Guess randomly", "Only label three items"], answer: 1, explanation: "Tracking used labels prevents confusion and errors." },
    ],
  },
];
