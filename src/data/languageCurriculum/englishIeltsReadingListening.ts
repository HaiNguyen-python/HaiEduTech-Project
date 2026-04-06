// IELTS Reading & Listening Expansion — 11 new lessons
import type { LanguageLesson } from "./types";

// ===== IELTS READING — 6 new lessons =====

export const ieltsReadingExpansionLessons: LanguageLesson[] = [
  {
    id: "ielts-reading-3",
    title: "Matching Headings",
    titleEn: "Matching Headings",
    level: 3,
    difficulty: "intermediate",
    theory: `**Matching Headings** yêu cầu bạn chọn tiêu đề phù hợp nhất cho mỗi đoạn văn trong bài đọc.

**Chiến lược:**
1. **Đọc danh sách headings trước** — gạch chân từ khóa chính
2. **Đọc đoạn đầu và cuối** mỗi paragraph để nắm main idea
3. **Loại trừ heading rõ ràng sai** — thu hẹp lựa chọn
4. **Phân biệt main idea vs. detail** — heading phản ánh ý chính, không phải chi tiết

**Lỗi thường gặp:**
- Chọn heading chỉ khớp với 1 câu thay vì cả đoạn
- Nhầm lẫn giữa heading quá chung và heading quá cụ thể
- Bị "trap" bởi từ đồng nghĩa xuất hiện ở heading sai`,
    theoryEn: `**Matching Headings** requires you to select the most appropriate heading for each paragraph in the reading passage.

**Strategies:**
1. **Read the headings list first** — underline key words
2. **Read the first and last sentences** of each paragraph to grasp the main idea
3. **Eliminate clearly wrong headings** — narrow down choices
4. **Distinguish main idea vs. detail** — headings reflect main ideas, not details

**Common mistakes:**
- Choosing a heading that matches only one sentence rather than the whole paragraph
- Confusing overly general headings with overly specific ones
- Being trapped by synonyms appearing in wrong headings`,
    proTips: [
      "Bắt đầu từ đoạn dễ nhất — loại trừ heading đã dùng sẽ giúp đoạn khó hơn",
      "Topic sentence thường nằm ở câu đầu hoặc câu cuối đoạn",
      "Heading đúng thường paraphrase ý chính, không copy nguyên văn từ passage",
    ],
    proTipsEn: [
      "Start from the easiest paragraph — eliminating used headings helps with harder ones",
      "Topic sentences are usually the first or last sentence of a paragraph",
      "Correct headings typically paraphrase the main idea, not copy words verbatim",
    ],
    vocabulary: [
      { word: "heading", meaning: "tiêu đề", meaningEn: "a title or caption", example: "Choose the correct heading for each paragraph.", partOfSpeech: "noun" },
      { word: "main idea", meaning: "ý chính", meaningEn: "the central point", example: "The main idea is stated in the first sentence.", partOfSpeech: "noun" },
      { word: "paraphrase", meaning: "diễn đạt lại", meaningEn: "to restate in different words", example: "The heading paraphrases the paragraph's topic.", partOfSpeech: "verb" },
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp vào chỗ trống",
        instructionEn: "Fill in the blanks with appropriate words",
        sentences: [
          { text: "The ___ of a paragraph reflects its main idea, not a specific detail.", textEn: "The ___ of a paragraph reflects its main idea, not a specific detail.", answer: "heading", hint: "tiêu đề" },
          { text: "You should read the ___ and last sentences of each paragraph first.", textEn: "You should read the ___ and last sentences of each paragraph first.", answer: "first", hint: "đầu tiên" },
          { text: "A correct heading usually ___ the main idea using different words.", textEn: "A correct heading usually ___ the main idea using different words.", answer: "paraphrases", hint: "diễn đạt lại" },
          { text: "Start with the ___ paragraph to build confidence.", textEn: "Start with the ___ paragraph to build confidence.", answer: "easiest", hint: "dễ nhất" },
          { text: "Eliminate headings that are too ___ or too specific.", textEn: "Eliminate headings that are too ___ or too specific.", answer: "general", hint: "chung chung" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp các bước thành chiến lược đúng",
        instructionEn: "Reorder the steps into the correct strategy",
        items: [
          { scrambled: ["headings", "Read", "the", "list", "first"], correct: "Read the headings list first" },
          { scrambled: ["main", "Identify", "idea", "the", "of", "each", "paragraph"], correct: "Identify the main idea of each paragraph" },
          { scrambled: ["wrong", "Eliminate", "clearly", "headings"], correct: "Eliminate clearly wrong headings" },
        ],
      },
    ],
    quiz: [
      { question: "What should you read first in a Matching Headings task?", options: ["The entire passage", "The headings list", "The questions after the passage", "The conclusion only"], answer: 1, explanation: "Reading headings first helps you know what to look for in each paragraph." },
      { question: "A correct heading typically does what?", options: ["Copies exact words from the passage", "Paraphrases the main idea", "Describes one detail", "Uses the longest phrase"], answer: 1, explanation: "Headings paraphrase the paragraph's main idea using synonyms." },
      { question: "Why should you start with the easiest paragraph?", options: ["It saves time", "Eliminating used headings narrows choices for harder ones", "Examiners put easy ones first", "It doesn't matter"], answer: 1, explanation: "Each heading used reduces options, making harder paragraphs easier." },
      { question: "What's a common trap in Matching Headings?", options: ["Headings being too short", "Synonyms appearing in wrong headings", "All headings being similar", "No headings matching"], answer: 1, explanation: "Test writers place synonyms in distractors to mislead candidates." },
      { question: "The topic sentence is usually found where?", options: ["In the middle of the paragraph", "At the first or last sentence", "In the second sentence only", "In footnotes"], answer: 1, explanation: "Academic writing typically places the topic sentence at the beginning or end." },
    ],
  },
  {
    id: "ielts-reading-4",
    title: "Sentence Completion",
    titleEn: "Sentence Completion",
    level: 3,
    difficulty: "intermediate",
    theory: `**Sentence Completion** yêu cầu hoàn thành câu bằng từ lấy trực tiếp từ bài đọc.

**Quy tắc vàng:**
1. **Đọc kỹ word limit** — "NO MORE THAN TWO WORDS" nghĩa là 1 hoặc 2 từ
2. **Giữ nguyên dạng từ** trong passage — không đổi thì, số ít/nhiều
3. **Tìm vị trí thông tin** — câu hỏi thường theo thứ tự trong bài đọc
4. **Chú ý grammar** — đáp án phải đúng ngữ pháp trong câu hoàn chỉnh

**Bẫy thường gặp:**
- Viết quá số từ cho phép
- Thay đổi dạng từ (ví dụ: viết "increasing" thay vì "increased")
- Copy từ sai vị trí trong passage`,
    theoryEn: `**Sentence Completion** requires completing sentences using words taken directly from the reading passage.

**Golden rules:**
1. **Read the word limit carefully** — "NO MORE THAN TWO WORDS" means 1 or 2 words
2. **Keep the exact word form** from the passage — don't change tense or singular/plural
3. **Locate information sequentially** — questions usually follow passage order
4. **Check grammar** — the answer must be grammatically correct in the complete sentence

**Common traps:**
- Exceeding the word limit
- Changing word forms (e.g., writing "increasing" instead of "increased")
- Copying words from the wrong location`,
    proTips: [
      "Gạch chân key words trong câu hỏi trước khi tìm trong passage",
      "Đáp án luôn là từ nguyên văn từ passage — không bao giờ cần tự nghĩ từ",
      "Kiểm tra lại số từ trước khi viết đáp án cuối cùng",
    ],
    proTipsEn: [
      "Underline key words in the question before scanning the passage",
      "Answers are always verbatim from the passage — never make up words",
      "Double-check word count before writing your final answer",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Hoàn thành câu với từ thích hợp",
        instructionEn: "Complete the sentences with appropriate words",
        sentences: [
          { text: "In Sentence Completion, answers must be taken ___ from the passage.", textEn: "In Sentence Completion, answers must be taken ___ from the passage.", answer: "directly", hint: "trực tiếp" },
          { text: "You must not exceed the ___ limit specified in the instructions.", textEn: "You must not exceed the ___ limit specified in the instructions.", answer: "word", hint: "từ" },
          { text: "Questions usually follow the ___ order of the passage.", textEn: "Questions usually follow the ___ order of the passage.", answer: "sequential", hint: "tuần tự" },
          { text: "Always keep the exact word ___ from the original text.", textEn: "Always keep the exact word ___ from the original text.", answer: "form", hint: "dạng" },
          { text: "Underline ___ words in the question to help locate information.", textEn: "Underline ___ words in the question to help locate information.", answer: "key", hint: "chìa khóa" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại câu cho đúng",
        instructionEn: "Reorder the words to form correct sentences",
        items: [
          { scrambled: ["the", "Read", "word", "limit", "carefully"], correct: "Read the word limit carefully" },
          { scrambled: ["from", "answers", "Copy", "the", "passage", "exactly"], correct: "Copy answers from the passage exactly" },
          { scrambled: ["grammar", "Check", "the", "of", "completed", "sentence", "the"], correct: "Check the grammar of the completed sentence" },
        ],
      },
    ],
    quiz: [
      { question: "'NO MORE THAN TWO WORDS' means you can write:", options: ["Exactly two words", "One or two words", "Two or three words", "Any number of words"], answer: 1, explanation: "'No more than' means the maximum is two, so one word is also acceptable." },
      { question: "Where do answers come from?", options: ["Your own knowledge", "Directly from the passage", "The question itself", "A dictionary"], answer: 1, explanation: "Answers must be copied verbatim from the reading passage." },
      { question: "Questions in Sentence Completion usually follow:", options: ["Random order", "Reverse order", "The order of the passage", "Alphabetical order"], answer: 2, explanation: "Questions typically follow the sequential order of information in the passage." },
      { question: "What should you do with key words in the question?", options: ["Ignore them", "Underline them", "Replace them", "Memorize them"], answer: 1, explanation: "Underlining key words helps you scan the passage efficiently." },
      { question: "Can you change the word form of the answer?", options: ["Yes, always", "No, never", "Only for verbs", "Only for nouns"], answer: 1, explanation: "You must use the exact form as it appears in the passage." },
    ],
  },
  {
    id: "ielts-reading-5",
    title: "Summary Completion",
    titleEn: "Summary Completion",
    level: 3,
    difficulty: "advanced",
    theory: `**Summary Completion** có 2 dạng:
1. **Chọn từ trong passage** (giống Sentence Completion)
2. **Chọn từ trong danh sách** (word list)

**Chiến lược cho từng dạng:**

**Dạng 1 — Từ passage:**
- Xác định đoạn văn liên quan (summary thường tóm tắt 1-3 đoạn)
- Tìm từ đồng nghĩa giữa summary và passage
- Đáp án theo thứ tự trong passage

**Dạng 2 — Word list:**
- Đọc summary trước, đoán loại từ cần điền (noun/verb/adjective)
- Loại trừ từ không phù hợp về ngữ pháp
- Kiểm tra nghĩa trong context`,
    theoryEn: `**Summary Completion** has 2 types:
1. **Words from the passage** (similar to Sentence Completion)
2. **Words from a word list**

**Strategies for each type:**

**Type 1 — From passage:**
- Identify the relevant paragraph(s) (summary usually covers 1-3 paragraphs)
- Find synonyms between the summary and passage
- Answers follow passage order

**Type 2 — Word list:**
- Read the summary first, predict word type needed (noun/verb/adjective)
- Eliminate grammatically unsuitable words
- Check meaning in context`,
    proTips: [
      "Summary thường cover 2-3 đoạn liên tiếp — xác định phạm vi trước",
      "Với word list, loại trừ bằng grammar trước (noun slot → chỉ xét nouns)",
      "Đọc toàn bộ summary trước khi điền — context giúp đoán đáp án",
    ],
    proTipsEn: [
      "Summaries usually cover 2-3 consecutive paragraphs — identify the scope first",
      "With word lists, eliminate by grammar first (noun slot → only consider nouns)",
      "Read the entire summary before filling — context helps predict answers",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in with appropriate words",
        sentences: [
          { text: "A summary typically covers ___ to three consecutive paragraphs.", textEn: "A summary typically covers ___ to three consecutive paragraphs.", answer: "two", hint: "số" },
          { text: "Identify ___ between the summary and the passage to locate answers.", textEn: "Identify ___ between the summary and the passage to locate answers.", answer: "synonyms", hint: "từ đồng nghĩa" },
          { text: "For word list tasks, first determine the ___ of speech needed.", textEn: "For word list tasks, first determine the ___ of speech needed.", answer: "part", hint: "từ loại" },
          { text: "Read the ___ summary before attempting to fill any gaps.", textEn: "Read the ___ summary before attempting to fill any gaps.", answer: "entire", hint: "toàn bộ" },
          { text: "Answers from the passage must follow the ___ order of information.", textEn: "Answers from the passage must follow the ___ order of information.", answer: "sequential", hint: "tuần tự" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp bước làm bài đúng thứ tự",
        instructionEn: "Put the steps in the correct order",
        items: [
          { scrambled: ["summary", "Read", "the", "entire", "first"], correct: "Read the entire summary first" },
          { scrambled: ["relevant", "Identify", "the", "paragraphs"], correct: "Identify the relevant paragraphs" },
          { scrambled: ["synonyms", "Find", "keywords", "and"], correct: "Find keywords and synonyms" },
          { scrambled: ["grammar", "by", "Eliminate", "wrong", "options"], correct: "Eliminate wrong options by grammar" },
        ],
      },
    ],
    quiz: [
      { question: "How many types of Summary Completion exist?", options: ["One", "Two", "Three", "Four"], answer: 1, explanation: "There are two types: words from passage and words from a word list." },
      { question: "In word list tasks, what should you check first?", options: ["Word length", "Part of speech", "Spelling", "Pronunciation"], answer: 1, explanation: "Determining part of speech helps eliminate unsuitable options quickly." },
      { question: "A summary usually covers how many paragraphs?", options: ["The entire passage", "1-3 consecutive paragraphs", "Only the introduction", "Random paragraphs"], answer: 1, explanation: "Summaries typically cover 2-3 consecutive paragraphs from the passage." },
      { question: "What helps you locate answers in the passage?", options: ["Page numbers", "Synonyms and paraphrases", "Font size", "Paragraph length"], answer: 1, explanation: "Test writers use synonyms and paraphrases to test comprehension." },
      { question: "Should you fill gaps in order or randomly?", options: ["Always randomly", "In order — context from earlier gaps helps", "Skip to the last gap", "It doesn't matter"], answer: 1, explanation: "Filling in order lets you use context from completed gaps." },
    ],
  },
  {
    id: "ielts-reading-6",
    title: "Multiple Choice Reading",
    titleEn: "Multiple Choice in Reading",
    level: 3,
    difficulty: "intermediate",
    theory: `**Multiple Choice** trong IELTS Reading có 2 dạng:
1. **Chọn 1 đáp án đúng** (A, B, C, D)
2. **Chọn nhiều đáp án** (ví dụ: chọn 2 trong 5)

**Chiến lược POE (Process of Elimination):**
1. Đọc câu hỏi + gạch chân key words
2. Locate đoạn chứa thông tin trong passage
3. Loại trừ đáp án sai:
   - **Too extreme** — "always", "never", "all" thường sai
   - **Not mentioned** — thông tin không có trong passage
   - **Partially correct** — đúng một phần nhưng thiếu/sai phần còn lại
4. Đáp án đúng = paraphrase ý trong passage`,
    theoryEn: `**Multiple Choice** in IELTS Reading has 2 formats:
1. **Choose one correct answer** (A, B, C, D)
2. **Choose multiple answers** (e.g., choose 2 from 5)

**POE Strategy (Process of Elimination):**
1. Read the question + underline key words
2. Locate the relevant section in the passage
3. Eliminate wrong answers:
   - **Too extreme** — "always", "never", "all" are usually wrong
   - **Not mentioned** — information not in the passage
   - **Partially correct** — partly right but missing/wrong in other parts
4. Correct answer = paraphrase of passage content`,
    proTips: [
      "Đáp án chứa 'always', 'never', 'all' thường là bẫy — quá tuyệt đối",
      "Đáp án đúng hiếm khi copy nguyên văn — tìm paraphrase",
      "Với dạng chọn nhiều, mỗi đáp án đúng nằm ở đoạn khác nhau",
    ],
    proTipsEn: [
      "Options with 'always', 'never', 'all' are usually traps — too absolute",
      "Correct answers rarely copy verbatim — look for paraphrases",
      "For multiple-answer questions, each correct answer is in a different paragraph",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the appropriate words",
        sentences: [
          { text: "POE stands for Process of ___.", textEn: "POE stands for Process of ___.", answer: "Elimination", hint: "loại trừ" },
          { text: "Options with words like 'always' or '___' are usually traps.", textEn: "Options with words like 'always' or '___' are usually traps.", answer: "never", hint: "không bao giờ" },
          { text: "The correct answer usually ___ the original text.", textEn: "The correct answer usually ___ the original text.", answer: "paraphrases", hint: "diễn đạt lại" },
          { text: "A ___ correct option is right in part but wrong overall.", textEn: "A ___ correct option is right in part but wrong overall.", answer: "partially", hint: "một phần" },
          { text: "Always ___ key words in the question stem.", textEn: "Always ___ key words in the question stem.", answer: "underline", hint: "gạch chân" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp chiến lược POE đúng thứ tự",
        instructionEn: "Order the POE strategy correctly",
        items: [
          { scrambled: ["question", "Read", "the", "carefully"], correct: "Read the question carefully" },
          { scrambled: ["information", "the", "Locate", "in", "passage", "the"], correct: "Locate the information in the passage" },
          { scrambled: ["wrong", "Eliminate", "answers"], correct: "Eliminate wrong answers" },
        ],
      },
    ],
    quiz: [
      { question: "What does POE stand for?", options: ["Point of Entry", "Process of Elimination", "Power of Example", "Proof of Evidence"], answer: 1, explanation: "POE = Process of Elimination — systematically removing wrong answers." },
      { question: "Which word in an option usually signals a trap?", options: ["Sometimes", "Often", "Always", "Usually"], answer: 2, explanation: "Absolute words like 'always' are too extreme and usually incorrect." },
      { question: "A 'partially correct' answer is:", options: ["Completely wrong", "Right in part but wrong overall", "The best answer", "Not mentioned in the passage"], answer: 1, explanation: "It contains some truth but is incomplete or distorted." },
      { question: "How does the correct answer relate to the passage?", options: ["It copies exact words", "It paraphrases the content", "It adds new information", "It contradicts the passage"], answer: 1, explanation: "Correct answers paraphrase passage content using synonyms." },
      { question: "For 'choose 2 from 5' questions, correct answers are usually:", options: ["In the same paragraph", "In different paragraphs", "In the conclusion only", "Not in the passage"], answer: 1, explanation: "Each correct answer typically comes from a different part of the passage." },
    ],
  },
  {
    id: "ielts-reading-7",
    title: "Matching Information",
    titleEn: "Matching Information to Paragraphs",
    level: 4,
    difficulty: "advanced",
    theory: `**Matching Information** yêu cầu tìm đoạn văn chứa thông tin cụ thể.

**Khác biệt với Matching Headings:**
- Matching Headings = tìm **ý chính** của đoạn
- Matching Information = tìm **chi tiết cụ thể** trong đoạn

**Chiến lược:**
1. Đọc các statements — gạch chân key words
2. **Không đọc theo thứ tự** — statements KHÔNG theo thứ tự passage
3. **Một đoạn có thể dùng nhiều lần** (nếu đề cho phép)
4. Scan từng đoạn tìm synonyms/paraphrases của key words
5. Đoạn dài thường chứa nhiều thông tin hơn — ưu tiên check`,
    theoryEn: `**Matching Information** requires finding paragraphs that contain specific information.

**Difference from Matching Headings:**
- Matching Headings = finding the **main idea** of a paragraph
- Matching Information = finding **specific details** within a paragraph

**Strategies:**
1. Read the statements — underline key words
2. **Don't read in order** — statements do NOT follow passage order
3. **A paragraph may be used more than once** (if instructions allow)
4. Scan each paragraph for synonyms/paraphrases of key words
5. Longer paragraphs usually contain more information — prioritize checking them`,
    proTips: [
      "Statements KHÔNG theo thứ tự passage — đừng giả định thứ tự",
      "Đọc kỹ instructions: 'NB: You may use any letter more than once'",
      "Tập trung vào specific details, không phải main idea",
    ],
    proTipsEn: [
      "Statements do NOT follow passage order — don't assume sequence",
      "Read instructions carefully: 'NB: You may use any letter more than once'",
      "Focus on specific details, not main ideas",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in appropriately",
        sentences: [
          { text: "Matching Information focuses on specific ___, not main ideas.", textEn: "Matching Information focuses on specific ___, not main ideas.", answer: "details", hint: "chi tiết" },
          { text: "Statements do NOT follow the ___ of the passage.", textEn: "Statements do NOT follow the ___ of the passage.", answer: "order", hint: "thứ tự" },
          { text: "A paragraph may be used more than ___ if instructions allow.", textEn: "A paragraph may be used more than ___ if instructions allow.", answer: "once", hint: "một lần" },
          { text: "Scan paragraphs for ___ of key words from statements.", textEn: "Scan paragraphs for ___ of key words from statements.", answer: "synonyms", hint: "từ đồng nghĩa" },
          { text: "___ paragraphs usually contain more information to check.", textEn: "___ paragraphs usually contain more information to check.", answer: "Longer", hint: "dài hơn" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp lại bước làm bài",
        instructionEn: "Reorder the steps",
        items: [
          { scrambled: ["statements", "Read", "all", "the", "first"], correct: "Read all the statements first" },
          { scrambled: ["key", "Underline", "words", "in", "each", "statement"], correct: "Underline key words in each statement" },
          { scrambled: ["each", "Scan", "paragraph", "for", "matching", "details"], correct: "Scan each paragraph for matching details" },
        ],
      },
    ],
    quiz: [
      { question: "How is Matching Information different from Matching Headings?", options: ["They are the same", "MI focuses on details, MH on main ideas", "MI is easier", "MH uses a word list"], answer: 1, explanation: "Matching Information looks for specific details; Matching Headings looks for main ideas." },
      { question: "Do statements follow the passage order?", options: ["Always", "Never", "Not necessarily", "Only in Academic"], answer: 2, explanation: "Statements can appear in any order relative to the passage." },
      { question: "Can a paragraph be used more than once?", options: ["Never", "Always", "Only if instructions say so", "Only for the last question"], answer: 2, explanation: "Check the instructions — 'NB' notes often allow reuse." },
      { question: "What should you underline in statements?", options: ["Every word", "Key words only", "Conjunctions", "Articles"], answer: 1, explanation: "Key words help you scan for matching information in paragraphs." },
      { question: "Which paragraphs should you check first?", options: ["The shortest ones", "The longest ones", "Only the first one", "Only the last one"], answer: 1, explanation: "Longer paragraphs contain more details and are more likely to match." },
    ],
  },
  {
    id: "ielts-reading-8",
    title: "Yes / No / Not Given",
    titleEn: "Yes / No / Not Given",
    level: 4,
    difficulty: "advanced",
    theory: `**Yes/No/Not Given (YNNG)** kiểm tra quan điểm/ý kiến của tác giả.

**Phân biệt với True/False/Not Given:**
- T/F/NG = kiểm tra **facts** (sự thật)
- Y/N/NG = kiểm tra **opinions/claims** (quan điểm/nhận định)

**Cách phân biệt:**
- **YES** = tác giả **đồng ý** với statement
- **NO** = tác giả **không đồng ý** / phản bác statement
- **NOT GIVEN** = tác giả **không đề cập** đến vấn đề này

**Bẫy phổ biến:**
- Nhầm "tác giả trích dẫn ý kiến người khác" với "ý kiến của tác giả"
- Thông tin có trong passage nhưng không liên quan đến statement → NOT GIVEN
- Statement đúng theo kiến thức chung nhưng tác giả không nói → NOT GIVEN`,
    theoryEn: `**Yes/No/Not Given (YNNG)** tests the writer's opinions or claims.

**Difference from True/False/Not Given:**
- T/F/NG = tests **facts**
- Y/N/NG = tests **opinions/claims**

**How to distinguish:**
- **YES** = the writer **agrees** with the statement
- **NO** = the writer **disagrees** / contradicts the statement
- **NOT GIVEN** = the writer **doesn't mention** this issue

**Common traps:**
- Confusing "the author quotes someone else's opinion" with "the author's opinion"
- Information exists in the passage but is unrelated to the statement → NOT GIVEN
- Statement is true in general knowledge but the author doesn't say it → NOT GIVEN`,
    proTips: [
      "Tìm opinion markers: 'I believe', 'The author argues', 'It is claimed that'",
      "NOT GIVEN không có nghĩa là sai — chỉ là tác giả không đề cập",
      "Đọc kỹ xem ý kiến thuộc về tác giả hay người được trích dẫn",
    ],
    proTipsEn: [
      "Look for opinion markers: 'I believe', 'The author argues', 'It is claimed that'",
      "NOT GIVEN doesn't mean false — it just means the author doesn't address it",
      "Check carefully whether the opinion belongs to the author or a quoted source",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in appropriately",
        sentences: [
          { text: "Y/N/NG tests the writer's ___, not facts.", textEn: "Y/N/NG tests the writer's ___, not facts.", answer: "opinions", hint: "quan điểm" },
          { text: "YES means the author ___ with the statement.", textEn: "YES means the author ___ with the statement.", answer: "agrees", hint: "đồng ý" },
          { text: "NOT GIVEN means the author doesn't ___ the issue.", textEn: "NOT GIVEN means the author doesn't ___ the issue.", answer: "mention", hint: "đề cập" },
          { text: "Look for ___ markers like 'I believe' or 'It is argued'.", textEn: "Look for ___ markers like 'I believe' or 'It is argued'.", answer: "opinion", hint: "quan điểm" },
          { text: "T/F/NG checks facts while Y/N/NG checks ___.", textEn: "T/F/NG checks facts while Y/N/NG checks ___.", answer: "claims", hint: "nhận định" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp câu đúng",
        instructionEn: "Reorder correctly",
        items: [
          { scrambled: ["opinions", "YNNG", "tests", "the", "author's"], correct: "YNNG tests the author's opinions" },
          { scrambled: ["doesn't", "GIVEN", "NOT", "mean", "false"], correct: "NOT GIVEN doesn't mean false" },
          { scrambled: ["for", "Look", "opinion", "markers", "in", "the", "text"], correct: "Look for opinion markers in the text" },
        ],
      },
    ],
    quiz: [
      { question: "Y/N/NG tests what?", options: ["Facts", "Opinions and claims", "Vocabulary", "Grammar"], answer: 1, explanation: "Y/N/NG specifically tests the writer's opinions or claims." },
      { question: "What does NOT GIVEN mean?", options: ["The statement is false", "The author disagrees", "The author doesn't address it", "The passage is unclear"], answer: 2, explanation: "NOT GIVEN means the writer simply doesn't discuss the topic." },
      { question: "Which phrase is an opinion marker?", options: ["In 2020", "According to data", "The author argues that", "The table shows"], answer: 2, explanation: "'The author argues that' signals an opinion rather than a fact." },
      { question: "If a statement is generally true but the author doesn't say it:", options: ["YES", "NO", "NOT GIVEN", "TRUE"], answer: 2, explanation: "If the author doesn't express this view, it's NOT GIVEN regardless of general truth." },
      { question: "How is Y/N/NG different from T/F/NG?", options: ["They are identical", "Y/N/NG is for opinions, T/F/NG for facts", "Y/N/NG is harder", "T/F/NG has more options"], answer: 1, explanation: "The key difference is opinions (YNNG) vs. factual information (TFNG)." },
    ],
  },
];

// ===== IELTS LISTENING — 5 new lessons =====

export const ieltsListeningExpansionLessons: LanguageLesson[] = [
  {
    id: "ielts-listening-2",
    title: "Section 3: Thảo luận Học thuật",
    titleEn: "Section 3: Academic Discussion",
    level: 3,
    difficulty: "intermediate",
    theory: `**Section 3** là cuộc thảo luận giữa 2-4 người trong bối cảnh học thuật (tutorial, seminar).

**Đặc điểm:**
- Nhiều người nói — cần phân biệt giọng
- Nội dung học thuật — nghiên cứu, project, assignment
- Câu hỏi phức tạp hơn Section 1 & 2
- Thường có: Multiple Choice, Matching, Labelling

**Chiến lược:**
1. **Đọc câu hỏi trước** khi nghe — gạch chân key words
2. **Xác định người nói** — ai đang nói rất quan trọng
3. **Chú ý opinion language** — "I think", "In my view", "I agree/disagree"
4. **Nghe signpost words** — "however", "on the other hand", "actually"
5. **Cẩn thận với self-correction** — người nói có thể đổi ý giữa chừng`,
    theoryEn: `**Section 3** is a discussion between 2-4 people in an academic context (tutorial, seminar).

**Characteristics:**
- Multiple speakers — need to distinguish voices
- Academic content — research, projects, assignments
- More complex questions than Sections 1 & 2
- Common question types: Multiple Choice, Matching, Labelling

**Strategies:**
1. **Read questions before listening** — underline key words
2. **Identify speakers** — knowing who is speaking is crucial
3. **Listen for opinion language** — "I think", "In my view", "I agree/disagree"
4. **Listen for signpost words** — "however", "on the other hand", "actually"
5. **Watch for self-correction** — speakers may change their mind mid-sentence`,
    proTips: [
      "Khi 2 người tranh luận, đáp án thường là ý kiến cuối cùng (sau self-correction)",
      "Section 3 hay dùng distractor: ý kiến ban đầu bị phản bác → đáp án là ý sau",
      "Ghi chú nhanh tên người nói + ý chính để không bị lẫn",
    ],
    proTipsEn: [
      "When 2 people debate, the answer is usually the final opinion (after self-correction)",
      "Section 3 often uses distractors: initial opinions get refuted → the answer follows",
      "Take quick notes on speaker names + key points to avoid confusion",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ thích hợp",
        instructionEn: "Fill in the blanks",
        sentences: [
          { text: "Section 3 involves ___ to four speakers in an academic setting.", textEn: "Section 3 involves ___ to four speakers in an academic setting.", answer: "two", hint: "số" },
          { text: "Listen for ___ language like 'I think' and 'In my view'.", textEn: "Listen for ___ language like 'I think' and 'In my view'.", answer: "opinion", hint: "quan điểm" },
          { text: "Speakers may ___ themselves mid-sentence, changing the answer.", textEn: "Speakers may ___ themselves mid-sentence, changing the answer.", answer: "correct", hint: "sửa" },
          { text: "Signpost words like 'however' signal a change in ___.", textEn: "Signpost words like 'however' signal a change in ___.", answer: "direction", hint: "hướng" },
          { text: "Always read the ___ before the audio begins.", textEn: "Always read the ___ before the audio begins.", answer: "questions", hint: "câu hỏi" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp chiến lược nghe Section 3",
        instructionEn: "Order the Section 3 listening strategy",
        items: [
          { scrambled: ["questions", "Read", "the", "before", "listening"], correct: "Read the questions before listening" },
          { scrambled: ["speakers", "Identify", "the", "different"], correct: "Identify the different speakers" },
          { scrambled: ["for", "Listen", "self-correction", "and", "signposts"], correct: "Listen for self-correction and signposts" },
        ],
      },
    ],
    quiz: [
      { question: "How many speakers are in Section 3?", options: ["1", "2-4", "5+", "Exactly 2"], answer: 1, explanation: "Section 3 features a discussion between 2-4 speakers." },
      { question: "What's a common distractor technique in Section 3?", options: ["Background noise", "Initial opinion gets changed later", "Speaking too fast", "Using slang"], answer: 1, explanation: "Speakers often state an opinion then change it — the final opinion is usually correct." },
      { question: "What does 'however' signal?", options: ["Agreement", "A change in direction", "The end of the recording", "A new topic"], answer: 1, explanation: "'However' is a signpost word indicating contrast or change." },
      { question: "Why is identifying speakers important?", options: ["For fun", "Questions may ask what a specific person said", "To count them", "It's not important"], answer: 1, explanation: "Questions often ask about specific speakers' opinions or contributions." },
      { question: "When should you read the questions?", options: ["After listening", "During the introduction", "Before the audio starts", "Never"], answer: 2, explanation: "Use the preparation time before each section to read and underline key words." },
    ],
  },
  {
    id: "ielts-listening-3",
    title: "Section 4: Bài giảng Học thuật",
    titleEn: "Section 4: Academic Lecture",
    level: 4,
    difficulty: "advanced",
    theory: `**Section 4** là phần khó nhất — một bài giảng học thuật dài, chỉ 1 người nói, không dừng giữa chừng.

**Đặc điểm:**
- Monologue dài (~5 phút)
- Chủ đề học thuật đa dạng (khoa học, lịch sử, xã hội)
- Không có pause giữa bài — phải theo dõi liên tục
- Dạng câu hỏi phổ biến: Note/Form Completion, Sentence Completion

**Chiến lược Note Completion:**
1. Đọc notes trước — đoán loại từ cần điền
2. Sử dụng layout (headings, bullets) để theo dõi vị trí
3. Viết tắt khi ghi — quay lại check spelling sau
4. Nghe lecture structure: introduction → main points → conclusion`,
    theoryEn: `**Section 4** is the hardest — a long academic lecture, single speaker, no pauses.

**Characteristics:**
- Long monologue (~5 minutes)
- Diverse academic topics (science, history, society)
- No mid-section pause — must follow continuously
- Common question types: Note/Form Completion, Sentence Completion

**Note Completion strategy:**
1. Read notes beforehand — predict word types needed
2. Use the layout (headings, bullets) to track your position
3. Use abbreviations when writing — check spelling later
4. Listen for lecture structure: introduction → main points → conclusion`,
    proTips: [
      "Section 4 KHÔNG có pause — phải tập trung 100% suốt 5 phút",
      "Nếu miss 1 câu, bỏ qua ngay — đừng để miss thêm câu sau",
      "Academic vocabulary thường được giải thích ngay sau khi xuất hiện",
    ],
    proTipsEn: [
      "Section 4 has NO pause — maintain 100% focus for 5 minutes",
      "If you miss one answer, move on immediately — don't lose the next one",
      "Academic vocabulary is usually explained right after it appears",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in appropriately",
        sentences: [
          { text: "Section 4 is a ___ by a single speaker.", textEn: "Section 4 is a ___ by a single speaker.", answer: "monologue", hint: "độc thoại" },
          { text: "There is no ___ in the middle of Section 4.", textEn: "There is no ___ in the middle of Section 4.", answer: "pause", hint: "dừng" },
          { text: "Use the note ___ (headings, bullets) to track your position.", textEn: "Use the note ___ (headings, bullets) to track your position.", answer: "layout", hint: "bố cục" },
          { text: "If you miss an answer, ___ on to the next one immediately.", textEn: "If you miss an answer, ___ on to the next one immediately.", answer: "move", hint: "di chuyển" },
          { text: "Academic terms are usually ___ right after they appear.", textEn: "Academic terms are usually ___ right after they appear.", answer: "explained", hint: "giải thích" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp chiến lược nghe Section 4",
        instructionEn: "Order the Section 4 strategy",
        items: [
          { scrambled: ["notes", "Read", "the", "before", "audio", "the", "starts"], correct: "Read the notes before the audio starts" },
          { scrambled: ["word", "Predict", "types", "the", "needed"], correct: "Predict the word types needed" },
          { scrambled: ["on", "Move", "if", "miss", "you", "an", "answer"], correct: "Move on if you miss an answer" },
        ],
      },
    ],
    quiz: [
      { question: "What makes Section 4 the hardest?", options: ["Multiple speakers", "No pause and continuous monologue", "It's the shortest", "Only yes/no questions"], answer: 1, explanation: "A continuous monologue with no pause demands sustained concentration." },
      { question: "What should you do if you miss an answer?", options: ["Rewind", "Move on immediately", "Guess and write nothing", "Stop listening"], answer: 1, explanation: "Moving on prevents you from missing subsequent answers." },
      { question: "Note Completion requires you to:", options: ["Write full sentences", "Fill in missing words in notes", "Create your own notes", "Summarize the lecture"], answer: 1, explanation: "You fill gaps in pre-written notes using words from the audio." },
      { question: "How long is a typical Section 4 recording?", options: ["1 minute", "About 5 minutes", "10 minutes", "30 seconds"], answer: 1, explanation: "Section 4 monologues typically last around 5 minutes." },
      { question: "When academic vocabulary appears, what usually follows?", options: ["A question", "An explanation of the term", "Silence", "Music"], answer: 1, explanation: "Speakers typically define or explain academic terms right after introducing them." },
    ],
  },
  {
    id: "ielts-listening-4",
    title: "Map & Diagram Labelling",
    titleEn: "Map & Diagram Labelling",
    level: 3,
    difficulty: "intermediate",
    theory: `**Map/Diagram Labelling** yêu cầu gán nhãn cho các vị trí trên bản đồ hoặc sơ đồ.

**Chiến lược:**
1. **Xem kỹ map/diagram** trong thời gian chuẩn bị
2. **Xác định orientation** — Bắc/Nam/Đông/Tây, trên/dưới/trái/phải
3. **Tìm starting point** — thường được nêu rõ: "Starting from the entrance..."
4. **Nghe direction language:**
   - "opposite to", "next to", "between X and Y"
   - "on the left/right", "at the corner of"
   - "go straight", "turn left/right"
5. **Di chuyển theo hướng dẫn** — dùng bút chỉ trên map

**Từ vựng chỉ hướng quan trọng:**
- adjacent to = bên cạnh
- at the far end = ở cuối
- in the center = ở giữa`,
    theoryEn: `**Map/Diagram Labelling** requires labelling locations on a map or diagram.

**Strategies:**
1. **Study the map/diagram carefully** during preparation time
2. **Identify orientation** — North/South/East/West, top/bottom/left/right
3. **Find the starting point** — usually stated: "Starting from the entrance..."
4. **Listen for direction language:**
   - "opposite to", "next to", "between X and Y"
   - "on the left/right", "at the corner of"
   - "go straight", "turn left/right"
5. **Follow directions on the map** — use your pen to trace the path

**Key direction vocabulary:**
- adjacent to = next to
- at the far end = at the furthest point
- in the center = in the middle`,
    proTips: [
      "Dùng bút chỉ theo hướng dẫn trên map — giúp không bị lạc",
      "Xác định các landmark đã có tên trên map trước — dùng làm mốc",
      "Direction language thường đi theo thứ tự câu hỏi",
    ],
    proTipsEn: [
      "Trace directions with your pen on the map — helps you stay oriented",
      "Identify pre-labelled landmarks on the map first — use as reference points",
      "Direction language usually follows the question order",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ chỉ hướng phù hợp",
        instructionEn: "Fill in appropriate direction words",
        sentences: [
          { text: "The library is ___ to the cafeteria.", textEn: "The library is ___ to the cafeteria.", answer: "adjacent", hint: "bên cạnh" },
          { text: "The lab is at the ___ end of the corridor.", textEn: "The lab is at the ___ end of the corridor.", answer: "far", hint: "cuối" },
          { text: "The office is ___ the bookshop and the bank.", textEn: "The office is ___ the bookshop and the bank.", answer: "between", hint: "giữa" },
          { text: "Turn ___ at the first junction to reach the parking lot.", textEn: "Turn ___ at the first junction to reach the parking lot.", answer: "left", hint: "trái" },
          { text: "The garden is ___ to the main building.", textEn: "The garden is ___ to the main building.", answer: "opposite", hint: "đối diện" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp bước làm bài Map Labelling",
        instructionEn: "Order the Map Labelling steps",
        items: [
          { scrambled: ["map", "Study", "the", "during", "preparation", "time"], correct: "Study the map during preparation time" },
          { scrambled: ["Identify", "the", "starting", "point"], correct: "Identify the starting point" },
          { scrambled: ["directions", "Follow", "with", "your", "pen"], correct: "Follow directions with your pen" },
        ],
      },
    ],
    quiz: [
      { question: "What should you do first with a map question?", options: ["Start writing answers", "Study the map during prep time", "Listen immediately", "Close your eyes"], answer: 1, explanation: "Use preparation time to familiarize yourself with the map layout." },
      { question: "'Adjacent to' means:", options: ["Far from", "Next to", "Above", "Below"], answer: 1, explanation: "'Adjacent to' means next to or beside." },
      { question: "How should you follow directions on the map?", options: ["Mentally", "With your pen tracing the path", "By memorizing everything", "By looking away"], answer: 1, explanation: "Using your pen to trace directions helps you stay oriented." },
      { question: "What are landmarks on the map used for?", options: ["Decoration", "Reference points for navigation", "Distraction", "Nothing"], answer: 1, explanation: "Pre-labelled landmarks serve as reference points to locate new labels." },
      { question: "'At the far end' means:", options: ["At the entrance", "At the closest point", "At the furthest point", "In the middle"], answer: 2, explanation: "'At the far end' indicates the most distant point from the reference." },
    ],
  },
  {
    id: "ielts-listening-5",
    title: "Multiple Choice trong Listening",
    titleEn: "Multiple Choice in Listening",
    level: 3,
    difficulty: "intermediate",
    theory: `**Multiple Choice** trong Listening đặc biệt khó vì bạn chỉ nghe 1 lần.

**Dạng câu hỏi:**
1. Chọn 1 đáp án (A, B, C)
2. Chọn nhiều đáp án (chọn 2 trong 5)

**Chiến lược xử lý Distractors:**
- **Trap 1**: Nghe thấy từ trong option → KHÔNG có nghĩa là đáp án đúng
- **Trap 2**: Thông tin đúng nhưng trả lời câu hỏi khác
- **Trap 3**: Self-correction — "Well, actually, I meant..."

**Quy trình làm bài:**
1. Đọc câu hỏi + options trong prep time
2. Gạch chân key words trong MỖI option
3. Khi nghe, đánh dấu ✓ hoặc ✗ bên cạnh mỗi option
4. Chọn đáp án sau khi nghe hết câu hỏi đó`,
    theoryEn: `**Multiple Choice** in Listening is particularly challenging because you only hear it once.

**Question formats:**
1. Choose 1 answer (A, B, C)
2. Choose multiple answers (choose 2 from 5)

**Handling Distractors:**
- **Trap 1**: Hearing a word from an option → does NOT mean it's correct
- **Trap 2**: Information is true but answers a different question
- **Trap 3**: Self-correction — "Well, actually, I meant..."

**Process:**
1. Read questions + options during prep time
2. Underline key words in EACH option
3. While listening, mark ✓ or ✗ next to each option
4. Choose the answer after hearing the complete segment`,
    proTips: [
      "Nghe thấy exact words từ option ≠ đáp án đúng — thường là distractor",
      "Đánh dấu ✓/✗ bên cạnh mỗi option khi nghe — giúp loại trừ nhanh",
      "Chờ nghe hết ý rồi mới chọn — đừng vội chọn khi mới nghe key word",
    ],
    proTipsEn: [
      "Hearing exact words from an option ≠ correct answer — often a distractor",
      "Mark ✓/✗ next to each option while listening — helps eliminate quickly",
      "Wait until the full idea is expressed before choosing — don't rush at key words",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in appropriately",
        sentences: [
          { text: "Hearing exact words from an option does not ___ it's correct.", textEn: "Hearing exact words from an option does not ___ it's correct.", answer: "mean", hint: "nghĩa là" },
          { text: "Mark ✓ or ✗ next to each ___ while listening.", textEn: "Mark ✓ or ✗ next to each ___ while listening.", answer: "option", hint: "lựa chọn" },
          { text: "Self-correction often starts with phrases like 'Well, ___...'", textEn: "Self-correction often starts with phrases like 'Well, ___...'", answer: "actually", hint: "thực ra" },
          { text: "Don't ___ an answer before hearing the complete idea.", textEn: "Don't ___ an answer before hearing the complete idea.", answer: "choose", hint: "chọn" },
          { text: "A ___ is a wrong option designed to mislead listeners.", textEn: "A ___ is a wrong option designed to mislead listeners.", answer: "distractor", hint: "phương án nhiễu" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp quy trình làm MCQ Listening",
        instructionEn: "Order the MCQ Listening process",
        items: [
          { scrambled: ["Read", "and", "options", "questions", "first"], correct: "Read questions and options first" },
          { scrambled: ["key", "Underline", "words", "each", "in", "option"], correct: "Underline key words in each option" },
          { scrambled: ["Mark", "options", "while", "listening"], correct: "Mark options while listening" },
        ],
      },
    ],
    quiz: [
      { question: "Hearing an exact word from an option means:", options: ["It's always correct", "It's never correct", "It might be a distractor", "You should skip it"], answer: 2, explanation: "Exact words are often planted as distractors — verify with full context." },
      { question: "What should you do during prep time?", options: ["Relax", "Read questions and underline key words", "Write answers", "Talk to the examiner"], answer: 1, explanation: "Use preparation time to read questions and options, underlining key words." },
      { question: "What is self-correction?", options: ["Correcting spelling", "A speaker changing their mind mid-sentence", "Fixing the audio", "Repeating a question"], answer: 1, explanation: "Speakers may say something then correct themselves — the correction is usually the answer." },
      { question: "When should you finalize your answer?", options: ["As soon as you hear a keyword", "After hearing the complete idea", "Before listening", "After the exam"], answer: 1, explanation: "Wait for the full context before committing to an answer." },
      { question: "What does marking ✓/✗ help with?", options: ["Making the paper neat", "Quick elimination of wrong options", "Nothing useful", "Impressing the examiner"], answer: 1, explanation: "Marking helps you visually track which options are supported or refuted." },
    ],
  },
  {
    id: "ielts-listening-6",
    title: "Matching & Classification",
    titleEn: "Matching & Classification",
    level: 4,
    difficulty: "advanced",
    theory: `**Matching & Classification** yêu cầu nối thông tin hoặc phân loại items vào categories.

**Dạng phổ biến:**
1. **Matching**: Nối people ↔ opinions, facts ↔ categories
2. **Classification**: Phân loại items vào 2-3 groups

**Chiến lược:**
1. **Đọc kỹ categories trước** — hiểu rõ từng nhóm
2. **Dự đoán synonyms** — categories thường được diễn đạt khác trong audio
3. **Nghe opinion markers** — "According to X", "X believes that"
4. **Ghi chú nhanh** — viết tắt category (A/B/C) cạnh mỗi item
5. **Chú ý chuyển đổi người nói** — mỗi người có thể đại diện 1 category

**Lỗi phổ biến:**
- Nhầm ý kiến giữa các người nói
- Gán thông tin cho sai category vì nghe từ quen`,
    theoryEn: `**Matching & Classification** requires connecting information or categorizing items into groups.

**Common formats:**
1. **Matching**: Connect people ↔ opinions, facts ↔ categories
2. **Classification**: Sort items into 2-3 groups

**Strategies:**
1. **Read categories carefully first** — understand each group
2. **Predict synonyms** — categories are often paraphrased in audio
3. **Listen for opinion markers** — "According to X", "X believes that"
4. **Take quick notes** — write abbreviated category (A/B/C) next to each item
5. **Track speaker changes** — each person may represent a category

**Common mistakes:**
- Confusing opinions between speakers
- Assigning information to wrong category due to familiar words`,
    proTips: [
      "Viết tắt categories (A, B, C) cạnh items — nhanh hơn viết cả từ",
      "Một category có thể dùng nhiều lần — đừng giả định mỗi cái dùng 1 lần",
      "Nghe signpost: 'On the other hand' = chuyển sang category khác",
    ],
    proTipsEn: [
      "Abbreviate categories (A, B, C) next to items — faster than writing full words",
      "A category may be used multiple times — don't assume each is used once",
      "Listen for signposts: 'On the other hand' = switching to a different category",
    ],
    exercises: [
      {
        type: "fill-in-blank",
        instruction: "Điền từ phù hợp",
        instructionEn: "Fill in appropriately",
        sentences: [
          { text: "Classification tasks require sorting items into ___ or three groups.", textEn: "Classification tasks require sorting items into ___ or three groups.", answer: "two", hint: "số" },
          { text: "Write ___ category labels next to each item for speed.", textEn: "Write ___ category labels next to each item for speed.", answer: "abbreviated", hint: "viết tắt" },
          { text: "'According to X' is an ___ marker that identifies the speaker.", textEn: "'According to X' is an ___ marker that identifies the speaker.", answer: "opinion", hint: "quan điểm" },
          { text: "A category may be used ___ than once.", textEn: "A category may be used ___ than once.", answer: "more", hint: "nhiều hơn" },
          { text: "Track speaker ___ to avoid confusing opinions.", textEn: "Track speaker ___ to avoid confusing opinions.", answer: "changes", hint: "thay đổi" },
        ],
      },
      {
        type: "sentence-reorder",
        instruction: "Sắp xếp bước làm bài Matching",
        instructionEn: "Order the Matching strategy",
        items: [
          { scrambled: ["Read", "categories", "the", "first"], correct: "Read the categories first" },
          { scrambled: ["Predict", "synonyms", "for", "each", "category"], correct: "Predict synonyms for each category" },
          { scrambled: ["notes", "Take", "quick", "while", "listening"], correct: "Take quick notes while listening" },
        ],
      },
    ],
    quiz: [
      { question: "What are the two main formats?", options: ["Matching and Classification", "True/False and MCQ", "Fill-in and Reorder", "Map and Diagram"], answer: 0, explanation: "Matching connects items to options; Classification sorts items into groups." },
      { question: "Can a category be used more than once?", options: ["Never", "Yes, often", "Only in Section 4", "Only if there are 3+ categories"], answer: 1, explanation: "Categories can be reused unless instructions say otherwise." },
      { question: "What helps distinguish speakers' opinions?", options: ["Voice pitch only", "Opinion markers like 'X believes that'", "Background music", "Question numbers"], answer: 1, explanation: "Phrases like 'According to X' help attribute opinions to the right person." },
      { question: "Why should you abbreviate category labels?", options: ["To save paper", "For speed during listening", "The examiner requires it", "To confuse yourself"], answer: 1, explanation: "Abbreviated notes are faster, letting you keep up with the audio." },
      { question: "'On the other hand' usually signals:", options: ["Agreement", "A switch to a different category", "The end of the section", "A repetition"], answer: 1, explanation: "This signpost indicates a contrast or shift to another category." },
    ],
  },
];
