/**
 * @file ieltsLecturesExpansion4.ts
 * @description Wave 4 - 9 new IELTS lectures across Listening / Reading /
 * Writing / Speaking + Tips, Thematic Vocab and Applied Grammar.
 * Each lecture: 4 strategy steps, 2-3 mistakes, 4-5 vocab highlights and
 * 5 quiz questions (the global padder also enforces ≥5).
 *
 * @copyright 2026 HaiEduTech
 */
import type { IeltsLecture } from "./ieltsLecturesData";

export const ieltsLecturesExpansion4: IeltsLecture[] = [
  // ============================================================
  // 1. LISTENING - Section 1 Form Completion
  // ============================================================
  {
    id: "listening-section1-form-completion",
    title: "Listening Section 1 - Form Completion Mastery",
    titleVi: "Listening Section 1 - Làm chủ điền form",
    pillar: "skill-based",
    skill: "listening",
    icon: "📋",
    duration: "16 min",
    level: "foundation",
    description:
      "Section 1 is the easiest 10 marks of the entire test - yet thousands of Vietnamese candidates lose 2-3 marks here on names, numbers and addresses. This lecture gives you a bullet-proof routine.",
    descriptionVi:
      "Section 1 là 10 điểm dễ nhất cả bài thi - nhưng hàng nghìn thí sinh Việt Nam vẫn mất 2-3 điểm vì tên, số và địa chỉ. Bài này cho bạn quy trình chống mất điểm.",
    strategySteps: [
      { step: 1, title: "Predict the word-type for EVERY blank", titleVi: "Đoán loại từ cho TỪNG chỗ trống", description: "Before audio plays, write N (name), # (number), £ (price), @ (address) next to each blank. This narrows your listening focus.", descriptionVi: "Trước khi audio chạy, ghi N (tên), # (số), £ (giá), @ (địa chỉ) cạnh mỗi chỗ trống để khoanh vùng vùng nghe." },
      { step: 2, title: "Spell every name in your head", titleVi: "Đánh vần MỌI tên trong đầu", description: "Names are spelt letter-by-letter. Practise the IPA of B/V, M/N, G/J - the 4 most-confused English letters for Vietnamese ears.", descriptionVi: "Tên được đọc từng chữ cái. Luyện IPA của B/V, M/N, G/J - 4 cặp dễ nhầm nhất với người Việt." },
      { step: 3, title: "Trust the SECOND number", titleVi: "Tin con số THỨ HAI", description: "Speakers often correct themselves: 'It's 0207… sorry, 0208 5567.' The corrected number is the answer. Always wait for the pause before writing.", descriptionVi: "Người nói thường tự sửa: '0207… à 0208 5567.' Số sửa lại mới là đáp án. Đợi pause rồi mới viết." },
      { step: 4, title: "Re-write capitals at the end", titleVi: "Viết hoa lại ở cuối", description: "While listening you write lowercase for speed. In the last 30 seconds, capitalise proper nouns and check 'Street' vs 'St.' - mis-spellings are marked wrong.", descriptionVi: "Khi nghe viết thường cho nhanh. 30 giây cuối, viết hoa danh từ riêng và kiểm tra 'Street' vs 'St.' - sai chính tả là sai." },
    ],
    practicalExamples: [
      { context: "Booking a hotel room", contextVi: "Đặt phòng khách sạn", example: "Reception: 'That's room 1-7-double-2, sir.'", answer: "1722", explanation: "‘double-2’ = '22'. Always merge doubles immediately." },
      { context: "Spelling a Vietnamese surname", contextVi: "Đánh vần họ Việt", example: "'My surname is NGUYEN - N-G-U-Y-E-N.'", answer: "Nguyen", explanation: "Capitalise the first letter only; never type it as 'NGUYEN'." },
    ],
    mistakesToAvoid: [
      { mistake: "Writing the FIRST number you hear", mistakeVi: "Viết NGAY con số đầu nghe được", why: "Section 1 is famous for self-correction. The second number is almost always the answer.", whyVi: "Section 1 nổi tiếng vì self-correction. Số thứ hai gần như luôn là đáp án." },
      { mistake: "Forgetting capital letters on names/places", mistakeVi: "Quên viết hoa tên người/nơi", why: "ielts.org marks ‘london’ wrong even if the sound is correct.", whyVi: "ielts.org chấm ‘london’ là SAI dù bạn nghe đúng." },
    ],
    goldenSecret:
      "In Section 1, your PEN is the enemy. Listen first, write only after the speaker pauses - that pause is the test designer telling you ‘OK, the number is locked in now’.",
    goldenSecretVi:
      "Ở Section 1, CÂY BÚT là kẻ thù. Nghe trước, đợi người nói pause rồi mới viết - pause đó là dấu hiệu ‘số đã chốt’.",
    vocabHighlights: [
      { word: "double / triple", definition: "Used when reading numbers: '22' = 'double-two'.", definitionVi: "Dùng khi đọc số: '22' = 'double-two'.", example: "My code is double-four, triple-seven.", band: "5.0+" },
      { word: "postcode", definition: "UK ZIP-like code mixing letters and numbers.", definitionVi: "Mã bưu chính Anh, gồm cả chữ và số.", example: "The postcode is SW1A 1AA.", band: "5.5+" },
      { word: "to spell out", definition: "To say each letter individually.", definitionVi: "Đọc từng chữ cái.", example: "Could you spell out your surname, please?", band: "5.5+" },
      { word: "deposit", definition: "A first payment to reserve something.", definitionVi: "Tiền cọc.", example: "A £50 deposit secures the booking.", band: "6.0+" },
      { word: "to confirm", definition: "To officially agree something is correct.", definitionVi: "Xác nhận.", example: "I'll send an email to confirm your details.", band: "6.0+" },
    ],
    quiz: [
      { question: "What is the FIRST thing you should do before the audio plays?", options: ["Re-read the title", "Mark word-type next to each blank", "Translate every word", "Pre-write 'C' for guesses"], answer: 1, explanation: "Marking word-types (N, #, £, @) narrows your listening focus." },
      { question: "Speaker says: 'It's 0207… sorry, 0208 5567.' Correct answer is:", options: ["02075567", "02085567", "0207 0208", "5567"], answer: 1, explanation: "Trust the corrected number - Section 1's classic self-correction trap." },
      { question: "Which pair of letters is MOST confusing for Vietnamese ears?", options: ["A vs E", "B vs V", "T vs D", "L vs R"], answer: 1, explanation: "/b/ and /v/ share lip movement; drilling them prevents many spelling errors." },
      { question: "'Double-four, triple-seven' is written as:", options: ["4477", "447777", "44777", "447"], answer: 2, explanation: "double = ×2, triple = ×3 → 44 + 777 = 44777." },
      { question: "If you spell ‘london’ all-lowercase but pronunciation is perfect, the answer is:", options: ["Accepted", "Half a mark", "Wrong - proper nouns need a capital", "Examiner's choice"], answer: 2, explanation: "Proper nouns MUST start with a capital letter on the answer sheet." },
    ],
    cheatSheetPoints: [
      "Predict word-type before audio: N / # / £ / @",
      "Drill IPA pairs B/V, M/N, G/J for clean spelling",
      "Always trust the SECOND number after a self-correction",
      "Capitalise proper nouns in the final 30-second check",
      "Never write 'St.' if you heard 'Street' - write it in full",
    ],
  },

  // ============================================================
  // 2. READING - Matching Headings Pro
  // ============================================================
  {
    id: "reading-matching-headings-pro",
    title: "Reading - Matching Headings PRO Framework",
    titleVi: "Reading - Khung PRO cho Matching Headings",
    pillar: "skill-based",
    skill: "reading",
    icon: "🧩",
    duration: "20 min",
    level: "intermediate",
    description:
      "Matching Headings is the #1 score-killer for Band 6.0 → 7.0 candidates because it tests MAIN IDEA, not vocabulary. The PRO framework (Predict-Read-Overlap) cuts your error rate by half.",
    descriptionVi:
      "Matching Headings là kỹ năng ‘ăn mòn’ điểm 6.0 → 7.0 vì nó kiểm tra Ý CHÍNH, không phải từ vựng. Khung PRO (Predict-Read-Overlap) giảm sai một nửa.",
    strategySteps: [
      { step: 1, title: "PREDICT - paraphrase every heading", titleVi: "PREDICT - paraphrase mọi heading", description: "Underline the keyword in each heading and rewrite it in 4 words next to the option. This forces YOU to control the language, not the test.", descriptionVi: "Gạch chân keyword mỗi heading, viết lại 4 chữ ngắn gọn. Bạn kiểm soát ngôn ngữ, không phải đề." },
      { step: 2, title: "READ topic + last sentence only", titleVi: "READ câu chủ đề + câu cuối", description: "80 % of paragraph main ideas live in sentence 1 or sentence n. Reading the middle wastes 4-5 minutes per passage.", descriptionVi: "80% ý chính nằm ở câu 1 hoặc câu cuối. Đọc giữa là phí 4-5 phút mỗi bài." },
      { step: 3, title: "OVERLAP - match by IDEA not WORD", titleVi: "OVERLAP - khớp Ý chứ không phải TỪ", description: "If a heading and paragraph share an exact word, it's usually a trap (‘word-bait’). Look for IDEA overlap.", descriptionVi: "Nếu heading và đoạn có từ giống y, thường là bẫy ‘word-bait’. Khớp Ý mới đúng." },
      { step: 4, title: "Cross out used headings IMMEDIATELY", titleVi: "Gạch heading đã dùng NGAY", description: "Each heading is used once. Crossing out shrinks the choice pool and prevents double-matching.", descriptionVi: "Mỗi heading dùng đúng 1 lần. Gạch ngay để thu hẹp lựa chọn và tránh trùng." },
    ],
    practicalExamples: [
      { context: "Paragraph about coral bleaching", contextVi: "Đoạn về tẩy trắng san hô", example: "Heading A: 'Economic impact of warming oceans' | Para starts: 'Reefs in Thailand have lost 60 % of tourism revenue…'", answer: "Match A", explanation: "Same IDEA (economic loss from warming), different words." },
      { context: "Word-bait trap", contextVi: "Bẫy word-bait", example: "Heading B: 'The role of bacteria' | Para: 'Although bacteria were once blamed, scientists now point to algae…'", answer: "DO NOT match B", explanation: "Word ‘bacteria’ appears but the IDEA is the opposite." },
    ],
    mistakesToAvoid: [
      { mistake: "Matching the first heading you see a keyword for", mistakeVi: "Khớp ngay heading có từ giống", why: "Keyword overlap is the most common trap in this question type.", whyVi: "Trùng từ là bẫy phổ biến nhất của dạng này." },
      { mistake: "Reading every paragraph in full", mistakeVi: "Đọc kỹ từng đoạn", why: "There isn't time. Use topic + concluding sentence first; dive deeper only if undecided.", whyVi: "Không đủ thời gian. Dùng câu chủ đề + câu cuối trước; chỉ đọc sâu khi do dự." },
    ],
    goldenSecret:
      "Headings test the IDEA the writer wanted you to leave with - usually the LAST sentence of the paragraph. When in doubt, choose the heading that best summarises the final sentence.",
    goldenSecretVi:
      "Heading kiểm tra Ý mà tác giả muốn bạn nhớ - thường ở câu CUỐI đoạn. Khi do dự, hãy chọn heading tóm tắt được câu cuối.",
    vocabHighlights: [
      { word: "to encapsulate", definition: "To summarise the essence of something.", definitionVi: "Tóm gọn bản chất.", example: "The phrase encapsulates the writer's main argument.", band: "7.0+" },
      { word: "central thesis", definition: "The main claim of a text.", definitionVi: "Luận điểm trung tâm.", example: "Identify the central thesis before matching headings.", band: "7.0+" },
      { word: "to underscore", definition: "To emphasise.", definitionVi: "Nhấn mạnh.", example: "The data underscore the urgency of action.", band: "7.0+" },
      { word: "concluding sentence", definition: "The final sentence summarising a paragraph.", definitionVi: "Câu kết đoạn.", example: "The concluding sentence usually states the writer's take-away.", band: "6.5+" },
    ],
    quiz: [
      { question: "What does the 'P' in PRO stand for?", options: ["Paraphrase", "Predict", "Pause", "Plan"], answer: 1, explanation: "PREDICT - paraphrase every heading before reading the passage." },
      { question: "Which two sentences carry 80 % of a paragraph's main idea?", options: ["Sentence 2 + 3", "Topic + concluding", "Topic + middle", "Concluding + footnote"], answer: 1, explanation: "Topic sentence (first) + concluding sentence (last)." },
      { question: "A keyword matches BOTH a heading and a paragraph. You should:", options: ["Match instantly", "Suspect a trap and check the idea", "Skip the question", "Mark two headings"], answer: 1, explanation: "Word-bait is the #1 trap; always verify idea overlap." },
      { question: "After picking a heading, you should immediately:", options: ["Read every paragraph again", "Cross out the used heading", "Switch to the next passage", "Translate into Vietnamese"], answer: 1, explanation: "Crossing-out shrinks options and prevents double-matching." },
      { question: "When undecided, choose the heading that best summarises:", options: ["The longest sentence", "The final sentence", "Random middle line", "The first word"], answer: 1, explanation: "The final sentence usually carries the writer's take-away idea." },
    ],
    cheatSheetPoints: [
      "PREDICT - paraphrase every heading in ≤4 words",
      "Read TOPIC + CONCLUDING sentences only",
      "Match by IDEA, never by repeated word",
      "Cross out used headings to shrink the pool",
      "When stuck, the concluding sentence wins",
    ],
  },

  // ============================================================
  // 3. WRITING - Task 1 Bar Chart PRO
  // ============================================================
  {
    id: "writing-task1-bar-chart-pro",
    title: "Writing Task 1 - Bar Chart PRO Template",
    titleVi: "Writing Task 1 - Mẫu PRO cho Bar Chart",
    pillar: "skill-based",
    skill: "writing",
    icon: "📊",
    duration: "22 min",
    level: "intermediate",
    description:
      "Bar charts appear in ~35 % of Task 1 exams. Most candidates list every bar (data-dump). The PRO template (Paraphrase-Overview-Group-Numbers) guarantees Band 7.0 structure in 18 minutes.",
    descriptionVi:
      "Bar chart xuất hiện ~35% đề Task 1. Đa số thí sinh liệt kê từng cột (data-dump). Mẫu PRO (Paraphrase-Overview-Group-Numbers) đảm bảo cấu trúc Band 7.0 trong 18 phút.",
    strategySteps: [
      { step: 1, title: "Paraphrase the prompt in ONE sentence", titleVi: "Paraphrase đề trong 1 câu", description: "Replace 'shows' → 'illustrates / compares', 'in 2020' → 'over the period', and the data type (e.g. percentage → proportion).", descriptionVi: "Thay 'shows' → 'illustrates / compares', 'in 2020' → 'over the period', 'percentage' → 'proportion'." },
      { step: 2, title: "Write a 2-feature OVERVIEW", titleVi: "Viết Overview 2 đặc điểm", description: "Mention ① the highest/lowest category and ② the overall trend (rise, fall, fluctuation). NO numbers in the overview.", descriptionVi: "Nêu ① cao nhất/thấp nhất và ② xu hướng chung. KHÔNG đưa số vào Overview." },
      { step: 3, title: "GROUP bars (high vs low) for paragraphs", titleVi: "GROUP các cột (cao vs thấp)", description: "Body 1 = top group; Body 2 = bottom group. Examiner sees you can categorise → Coherence 7.", descriptionVi: "Body 1 = nhóm cao; Body 2 = nhóm thấp. Giám khảo thấy bạn biết phân loại → Coherence 7." },
      { step: 4, title: "NUMBERS in supporting role only", titleVi: "Số chỉ để hỗ trợ", description: "Quote 2 numbers per body paragraph max. Use percentages with adjectives: 'a substantial 64 %'.", descriptionVi: "Mỗi body chỉ cần 2 con số. Dùng % với tính từ: 'a substantial 64 %'." },
    ],
    practicalExamples: [
      { context: "Bar chart comparing fast-food consumption in 4 countries", contextVi: "Bar chart tiêu thụ thức ăn nhanh 4 nước", example: "Overview: 'Overall, the United States dominated fast-food consumption, whereas the four Asian nations recorded considerably lower figures.'", answer: "Top-tier overview", explanation: "Two features (highest + grouping) and zero numbers - exactly what Band 7 wants." },
      { context: "Grouping sentence", contextVi: "Câu phân nhóm", example: "'The two Western countries - the US and the UK - consumed roughly twice as much as their Asian counterparts.'", answer: "Strong grouping", explanation: "‘Twice as much’ + grouping = high-level comparison." },
    ],
    mistakesToAvoid: [
      { mistake: "Listing every single bar with its number", mistakeVi: "Liệt kê từng cột với từng con số", why: "Examiner sees no selection of key features → max Task Achievement 5.", whyVi: "Giám khảo thấy bạn không chọn lọc → trần TA 5." },
      { mistake: "Putting numbers in the overview", mistakeVi: "Đưa số vào Overview", why: "Overview is for trends, not data. Numbers belong to body paragraphs.", whyVi: "Overview để nêu xu hướng, không phải data. Số để cho body." },
    ],
    goldenSecret:
      "An examiner can mark Task 1 in 90 seconds. They scan: prompt-paraphrase, overview, 2 grouped bodies. Hit those 4 spots cleanly and you guarantee Band 7 Task Achievement.",
    goldenSecretVi:
      "Giám khảo chấm Task 1 trong 90 giây. Họ scan: paraphrase đề, overview, 2 body theo nhóm. Đánh trúng 4 chỗ này = chắc TA 7.0.",
    vocabHighlights: [
      { word: "to dominate", definition: "To be the largest / most important.", definitionVi: "Chiếm vị trí lớn nhất.", example: "China dominated steel exports throughout the decade.", band: "7.0+" },
      { word: "counterpart", definition: "An equivalent in another group.", definitionVi: "Đối tượng tương đương ở nhóm khác.", example: "Asian nations lagged behind their Western counterparts.", band: "7.0+" },
      { word: "substantially", definition: "By a large amount.", definitionVi: "Đáng kể.", example: "Sales rose substantially after the launch.", band: "7.0+" },
      { word: "marginally", definition: "By a very small amount.", definitionVi: "Rất nhẹ.", example: "Demand fell marginally in Q3.", band: "7.0+" },
      { word: "in stark contrast", definition: "Used to introduce a strong opposite.", definitionVi: "Trái ngược hoàn toàn.", example: "In stark contrast, Japan's figure halved.", band: "7.5+" },
    ],
    quiz: [
      { question: "What does the 'O' in the PRO template stand for?", options: ["Outline", "Overview", "Organise", "Opinion"], answer: 1, explanation: "Overview = 2 macro features WITHOUT numbers." },
      { question: "How many features must the Overview contain?", options: ["1", "2", "3", "5"], answer: 1, explanation: "Two features (highest/lowest + overall trend) is the Band-7 minimum." },
      { question: "How many numbers should a body paragraph contain?", options: ["Every number on the chart", "Max 2", "Zero", "Exactly 5"], answer: 1, explanation: "Two supporting figures per body - quality, not quantity." },
      { question: "Putting numbers in the Overview leads to:", options: ["Band 7", "Band 6 cap", "Bonus mark", "Better cohesion"], answer: 1, explanation: "Numbers belong to body paragraphs; overview is for macro trends." },
      { question: "Choosing top vs bottom GROUPS demonstrates:", options: ["Vocabulary range", "Grammar", "Categorisation skill → Coherence 7", "Spelling"], answer: 2, explanation: "Grouping signals coherence and selection of key features." },
    ],
    cheatSheetPoints: [
      "PRO: Paraphrase – Overview – Group – Numbers",
      "Overview = 2 features, ZERO numbers",
      "Group bars into high vs low for body paragraphs",
      "Max 2 numbers per body paragraph",
      "Use ‘substantially / marginally / in stark contrast’ for variety",
    ],
  },

  // ============================================================
  // 4. WRITING - Task 2 Problem-Solution
  // ============================================================
  {
    id: "writing-task2-problem-solution",
    title: "Task 2 - Problem & Solution Essay Blueprint",
    titleVi: "Task 2 - Blueprint cho bài Problem & Solution",
    pillar: "skill-based",
    skill: "writing",
    icon: "🛠️",
    duration: "24 min",
    level: "intermediate",
    description:
      "‘Problem-Solution’ questions appear in 1 in 5 Task 2 exams. The 1-Problem-1-Solution-1-Result blueprint produces a focused, Band-7 essay even under time pressure.",
    descriptionVi:
      "Đề ‘Problem-Solution’ xuất hiện 1/5 lần Task 2. Blueprint 1 Problem - 1 Solution - 1 Result giúp viết bài tập trung, đạt Band 7 dù bị áp lực thời gian.",
    strategySteps: [
      { step: 1, title: "Identify the SINGLE root cause", titleVi: "Tìm 1 nguyên nhân GỐC", description: "Don't list 4 problems. Pick the deepest one and develop it for 80 words.", descriptionVi: "Đừng kể 4 vấn đề. Chọn 1 gốc nhất và phát triển ~80 từ." },
      { step: 2, title: "Match ONE concrete solution to it", titleVi: "Chọn 1 giải pháp CỤ THỂ tương ứng", description: "Solution must directly attack the cause, not a symptom. Avoid vague verbs like ‘raise awareness’ alone.", descriptionVi: "Giải pháp phải đánh đúng nguyên nhân, không chỉ triệu chứng. Tránh động từ chung chung kiểu ‘raise awareness’." },
      { step: 3, title: "Predict the measurable RESULT", titleVi: "Dự đoán KẾT QUẢ đo được", description: "End the body with the impact: 'fewer cars on the road, leading to a 20 % drop in CO₂.'", descriptionVi: "Kết body bằng tác động: 'ít xe trên đường, giúp giảm 20% CO₂.'" },
      { step: 4, title: "Conclusion = restate cause-solution link", titleVi: "Conclusion = nhắc lại liên kết nguyên nhân-giải pháp", description: "One sentence linking root cause → solution → result. No new ideas.", descriptionVi: "1 câu nối nguyên nhân gốc → giải pháp → kết quả. Không thêm ý mới." },
    ],
    practicalExamples: [
      { context: "Topic: urban traffic", contextVi: "Chủ đề: giao thông đô thị", example: "Cause: private car dependency. Solution: congestion-charge zone + protected cycle lanes. Result: London reduced inner-city traffic by 30 % within 2 years.", answer: "Strong PSR chain", explanation: "Real-world data + measurable result = Band 7.5 Task Achievement." },
      { context: "Topic: childhood obesity", contextVi: "Chủ đề: béo phì trẻ em", example: "Cause: sugary drinks in schools. Solution: ban vending machines + free water stations. Result: Mexico's school ban cut intake by 40 % in 18 months.", answer: "Concrete fix", explanation: "Specific policy + measurable outcome beats vague ‘educate parents’." },
    ],
    mistakesToAvoid: [
      { mistake: "Listing 3 problems and 3 solutions", mistakeVi: "Liệt kê 3 vấn đề và 3 giải pháp", why: "Each idea gets 30 words → no depth → max Task Response 5.", whyVi: "Mỗi ý chỉ 30 chữ → không sâu → trần TR 5." },
      { mistake: "Solution that doesn't match the cause", mistakeVi: "Giải pháp không khớp nguyên nhân", why: "Examiner marks weak coherence; the essay reads disjointed.", whyVi: "Giám khảo trừ coherence; bài đọc rời rạc." },
      { mistake: "No measurable outcome", mistakeVi: "Không có kết quả đo được", why: "Outcomes prove your solution works - without them, ideas feel speculative.", whyVi: "Outcome chứng minh giải pháp hiệu quả - thiếu nó, ý tưởng nghe suy đoán." },
    ],
    goldenSecret:
      "Examiners reward DEPTH over breadth. One root cause + one targeted fix + one measurable outcome beats four shallow ideas every time.",
    goldenSecretVi:
      "Giám khảo thưởng độ SÂU hơn độ rộng. 1 nguyên nhân gốc + 1 giải pháp đúng đích + 1 kết quả đo được thắng 4 ý hời hợt mọi lúc.",
    vocabHighlights: [
      { word: "to stem from", definition: "To be caused by.", definitionVi: "Bắt nguồn từ.", example: "Obesity stems from sedentary lifestyles.", band: "7.0+" },
      { word: "to mitigate", definition: "To make less severe.", definitionVi: "Giảm nhẹ.", example: "Carbon taxes mitigate air pollution.", band: "7.0+" },
      { word: "tangible outcome", definition: "A real, measurable result.", definitionVi: "Kết quả thấy được, đo được.", example: "The reform delivered tangible outcomes within a year.", band: "7.5+" },
      { word: "to alleviate", definition: "To ease a problem.", definitionVi: "Làm dịu.", example: "Cycle lanes can alleviate congestion.", band: "7.5+" },
      { word: "root cause", definition: "The original underlying source.", definitionVi: "Nguyên nhân gốc rễ.", example: "We must tackle the root cause, not the symptoms.", band: "7.0+" },
    ],
    quiz: [
      { question: "How many root causes should the body explore?", options: ["1", "2", "3", "4"], answer: 0, explanation: "Depth over breadth - pick the deepest cause and develop it fully." },
      { question: "A good Task 2 problem-solution essay ends each body with:", options: ["A rhetorical question", "A measurable result", "An idiom", "A second problem"], answer: 1, explanation: "Measurable results show your solution actually works." },
      { question: "Which phrase belongs in this essay type?", options: ["Once upon a time", "To stem from", "Long story short", "By the way"], answer: 1, explanation: "‘Stem from’ signals root-cause analysis - academic register." },
      { question: "The conclusion should contain:", options: ["A brand-new idea", "Just keywords", "A restatement of the cause-solution link", "A joke"], answer: 2, explanation: "Conclusions wrap up; they never introduce new ideas." },
      { question: "Listing 3 shallow problems leads to:", options: ["Higher Lexical Resource", "Lower Task Response", "Higher coherence", "Bonus mark"], answer: 1, explanation: "Each idea gets too few words - Task Response is capped at 5." },
    ],
    cheatSheetPoints: [
      "Pick 1 root cause, not 3 surface symptoms",
      "Solution must directly attack the cause",
      "End every body with a measurable result",
      "Use ‘stem from / mitigate / alleviate / tangible outcome’",
      "Conclusion = restate cause→solution→result link",
    ],
  },

  // ============================================================
  // 5. SPEAKING - Part 2 Personal Stories
  // ============================================================
  {
    id: "speaking-part2-personal-stories",
    title: "Speaking Part 2 - Personal Stories That Earn 7.5",
    titleVi: "Speaking Part 2 - Kể chuyện cá nhân chuẩn 7.5",
    pillar: "skill-based",
    skill: "speaking",
    icon: "🎙️",
    duration: "20 min",
    level: "advanced",
    description:
      "Examiners are humans: they remember STORIES, not lists. Use the 5-Sense Story Loop to turn any cue card into a vivid, 2-minute personal narrative that hits Band 7.5 Fluency & Lexical Resource.",
    descriptionVi:
      "Giám khảo cũng là con người: họ nhớ CHUYỆN, không nhớ danh sách. Dùng vòng lặp 5-Sense Story Loop biến mọi cue card thành câu chuyện cá nhân 2 phút sống động, ăn 7.5 Fluency & Lexical Resource.",
    strategySteps: [
      { step: 1, title: "Anchor the story with a TIME + PLACE", titleVi: "Neo chuyện bằng THỜI GIAN + ĐỊA ĐIỂM", description: "Open with ‘Back in the summer of 2019, I was wandering through the old quarter of Hanoi…’ - instantly cinematic.", descriptionVi: "Mở: ‘Hè 2019, tôi đang lang thang phố cổ Hà Nội…’ - bật ngay chế độ điện ảnh." },
      { step: 2, title: "Trigger ALL 5 senses (1 sentence each)", titleVi: "Kích hoạt CẢ 5 giác quan (mỗi cái 1 câu)", description: "Sight, sound, smell, taste, touch. Five rich sentences = 25 advanced collocations.", descriptionVi: "Thị, thính, khứu, vị, xúc. 5 câu giàu chi tiết = 25 collocation cao cấp." },
      { step: 3, title: "Add an EMOTIONAL TWIST", titleVi: "Thêm một CÚ TWIST cảm xúc", description: "What surprised you? Pivot with: ‘What I didn't expect was…’. Twists are unforgettable.", descriptionVi: "Có gì bất ngờ? Xoay: ‘Điều tôi không ngờ là…’. Twist khiến giám khảo nhớ mãi." },
      { step: 4, title: "Close with REFLECTION → future link", titleVi: "Đóng bằng REFLECTION nối tương lai", description: "End: ‘Ever since, I've made a habit of…’. This naturally flows into Part 3.", descriptionVi: "Kết: ‘Từ đó, tôi có thói quen…’. Mượt sang Part 3." },
    ],
    practicalExamples: [
      { context: "Cue card: Describe a memorable meal", contextVi: "Cue card: Bữa ăn đáng nhớ", example: "‘Back in winter 2022, I huddled around a steaming pot of pho on a freezing Hanoi night. The broth glistened with star anise; the scent hit me before the bowl did. What I didn't expect was the chef - my grandmother - sneaking in a slice of orange peel, her secret family twist…’", answer: "Sensory + twist + reflection", explanation: "Time anchor + 4 senses + twist + emotional close = effortless 2-minute answer." },
      { context: "Cue card: A piece of technology you love", contextVi: "Cue card: Công nghệ bạn yêu thích", example: "‘Three months ago, my noise-cancelling headphones literally saved my sanity on a screaming 10-hour flight to Helsinki. The instant the cushions sealed my ears, the cabin roar melted into pure silence…’", answer: "Vivid scene", explanation: "Specific time + tactile detail + emotion → Band 7.5 fluency." },
    ],
    mistakesToAvoid: [
      { mistake: "Reading the cue-card points like a checklist", mistakeVi: "Đọc các gạch đầu dòng cue card như checklist", why: "Robotic delivery caps fluency at Band 6.", whyVi: "Nói máy móc trần Fluency 6." },
      { mistake: "Using generic adjectives (‘very nice’, ‘good’)", mistakeVi: "Dùng tính từ chung (‘rất hay’, ‘tốt’)", why: "Examiners count Band-7 vocabulary; generic words trigger Band-5 lexical resource.", whyVi: "Giám khảo đếm từ Band 7; từ chung kéo LR về Band 5." },
    ],
    goldenSecret:
      "Examiners listen to ~50 candidates a week. A story with sensory detail and an emotional twist is the only thing they'll remember - and remembrance equals high marks.",
    goldenSecretVi:
      "Giám khảo nghe ~50 thí sinh/tuần. Câu chuyện có chi tiết giác quan + twist cảm xúc là thứ DUY NHẤT họ nhớ - nhớ = điểm cao.",
    vocabHighlights: [
      { word: "to glisten", definition: "To shine with reflected light.", definitionVi: "Lấp lánh.", example: "The broth glistened with star anise.", band: "7.5+" },
      { word: "huddle around", definition: "To gather closely.", definitionVi: "Quây quần.", example: "We huddled around the fire pit.", band: "7.0+" },
      { word: "vividly", definition: "Clearly and intensely.", definitionVi: "Sống động.", example: "I vividly remember that summer.", band: "7.0+" },
      { word: "to pivot", definition: "To shift direction.", definitionVi: "Xoay hướng.", example: "Let me pivot to the emotional side of the story.", band: "7.5+" },
      { word: "fond memory", definition: "A pleasant recollection.", definitionVi: "Kỷ niệm đẹp.", example: "It's one of my fondest memories.", band: "6.5+" },
    ],
    quiz: [
      { question: "How many senses should the 5-Sense Loop trigger?", options: ["2", "3", "5", "All 7"], answer: 2, explanation: "Sight, sound, smell, taste, touch = 5 rich detail sentences." },
      { question: "The emotional twist starts with which phrase?", options: ["‘In conclusion…’", "‘What I didn't expect was…’", "‘To begin with…’", "‘In my opinion…’"], answer: 1, explanation: "Twist pivots from expected → surprise, making the story memorable." },
      { question: "A good opening for Part 2 includes:", options: ["Just the topic word", "Time + place anchor", "An idiom only", "Reading the cue card aloud"], answer: 1, explanation: "Time + place instantly creates a cinematic scene." },
      { question: "Generic words like ‘nice’ cap Lexical Resource at:", options: ["Band 5", "Band 7", "Band 8", "Band 9"], answer: 0, explanation: "Examiners count Band-7 vocab; generic words signal Band-5 lexical resource." },
      { question: "Closing with ‘Ever since, I've…’ helps you:", options: ["Run out of time", "Bridge into Part 3", "Sound nervous", "Avoid grammar"], answer: 1, explanation: "Reflection + future link is the smoothest segue into Part 3 questions." },
    ],
    cheatSheetPoints: [
      "Open with TIME + PLACE anchor",
      "Hit ALL 5 senses, 1 sentence each",
      "Add an emotional twist: ‘What I didn't expect was…’",
      "Close with ‘Ever since, I've…’ reflection",
      "Swap generic adjectives for Band-7 verbs: glisten, huddle, pivot",
    ],
  },

  // ============================================================
  // 6. TIPS - Coherence & Cohesion 7.0 Toolkit
  // ============================================================
  {
    id: "tips-coherence-cohesion-toolkit",
    title: "Coherence & Cohesion - The Band 7 Toolkit",
    titleVi: "Coherence & Cohesion - Bộ công cụ Band 7",
    pillar: "tips-hacks",
    icon: "🔗",
    duration: "14 min",
    level: "intermediate",
    description:
      "Coherence & Cohesion is 25 % of your Writing score yet most candidates only know ‘firstly / secondly / in conclusion’. This toolkit unlocks 12 advanced devices examiners love.",
    descriptionVi:
      "Coherence & Cohesion chiếm 25% điểm Writing nhưng đa số thí sinh chỉ biết ‘firstly / secondly / in conclusion’. Bộ công cụ này mở khóa 12 thiết bị nối cao cấp giám khảo mê.",
    strategySteps: [
      { step: 1, title: "Use REFERENCE chains (this / these / such)", titleVi: "Dùng chuỗi REFERENCE (this / these / such)", description: "Replace nouns in sentence 2 with ‘this trend / these measures’ - proves you can track ideas without repeating words.", descriptionVi: "Câu 2 thay danh từ bằng ‘this trend / these measures’ - chứng tỏ bạn nối ý mà không lặp từ." },
      { step: 2, title: "Use SUBSTITUTION (do so / one)", titleVi: "Dùng SUBSTITUTION (do so / one)", description: "‘Many countries are banning plastic; Vietnam plans to do so by 2030.’ - Band 7 cohesion in one move.", descriptionVi: "‘Many countries are banning plastic; Vietnam plans to do so by 2030.’ - cohesion Band 7 trong 1 chiêu." },
      { step: 3, title: "Use LOGICAL connectors beyond ‘however’", titleVi: "Dùng nối logic xa hơn ‘however’", description: "Add ‘conversely / by the same token / on a related note / that said’.", descriptionVi: "Thêm ‘conversely / by the same token / on a related note / that said’." },
      { step: 4, title: "ELLIPSIS for sentence rhythm", titleVi: "Dùng ELLIPSIS để câu nhịp nhàng", description: "‘Some support the policy; others, not at all.’ - omitting ‘do’ shows native-like control.", descriptionVi: "‘Some support the policy; others, not at all.’ - bỏ ‘do’ thể hiện kiểm soát như bản xứ." },
    ],
    practicalExamples: [
      { context: "Reference chain", contextVi: "Chuỗi reference", example: "‘Plastic waste pollutes oceans. This problem now threatens 800 marine species.’", answer: "‘This problem’ refers back without repetition", explanation: "Examiner sees clear linking; word ‘pollution’ isn't repeated." },
      { context: "Substitution", contextVi: "Substitution", example: "‘The UK introduced congestion charges in 2003; Singapore had done so 30 years earlier.’", answer: "‘done so’ replaces ‘introduced congestion charges’", explanation: "Avoids repetition + signals Band 7+ cohesion." },
    ],
    mistakesToAvoid: [
      { mistake: "Starting every paragraph with ‘Firstly / Secondly / Finally’", mistakeVi: "Mở mỗi đoạn bằng ‘Firstly / Secondly / Finally’", why: "Examiner sees mechanical linking → caps cohesion at Band 5.", whyVi: "Giám khảo thấy nối máy móc → trần cohesion 5." },
      { mistake: "Over-using ‘however’ in every paragraph", mistakeVi: "Lạm dụng ‘however’ ở mỗi đoạn", why: "Lexical monotony - Band 7 needs variety.", whyVi: "Lặp từ vựng - Band 7 cần đa dạng." },
    ],
    goldenSecret:
      "Band 7 cohesion is INVISIBLE. The examiner doesn't see ‘Firstly’ flashing in neon - they feel the essay flow. Substitution, reference and ellipsis create that invisible glue.",
    goldenSecretVi:
      "Cohesion Band 7 là VÔ HÌNH. Giám khảo không thấy ‘Firstly’ nhấp nháy - họ CẢM thấy bài trôi mượt. Substitution, reference và ellipsis tạo keo dán vô hình đó.",
    vocabHighlights: [
      { word: "conversely", definition: "Used to introduce a contrasting idea.", definitionVi: "Ngược lại.", example: "Conversely, urban regions saw a decline.", band: "7.0+" },
      { word: "by the same token", definition: "Similarly / in the same way.", definitionVi: "Cùng lý do đó.", example: "By the same token, smaller firms also benefit.", band: "7.5+" },
      { word: "that said", definition: "Used to soften a previous strong point.", definitionVi: "Tuy nhiên / nói vậy nhưng.", example: "That said, the policy is not without its critics.", band: "7.5+" },
      { word: "on a related note", definition: "To introduce a connected idea.", definitionVi: "Liên quan đến điều đó.", example: "On a related note, the data also reveal…", band: "7.5+" },
    ],
    quiz: [
      { question: "Coherence & Cohesion is what % of your Writing score?", options: ["10 %", "25 %", "33 %", "50 %"], answer: 1, explanation: "One of the four equally-weighted criteria → 25 %." },
      { question: "Which device replaces a noun phrase to avoid repetition?", options: ["Idiom", "Reference (this / these / such)", "Phrasal verb", "Exclamation"], answer: 1, explanation: "Reference chains track ideas without repeating words." },
      { question: "‘Vietnam plans to do so by 2030.’ - which device?", options: ["Ellipsis", "Substitution", "Synonymy", "Repetition"], answer: 1, explanation: "‘Do so’ substitutes for the earlier verb phrase." },
      { question: "Mechanical ‘Firstly / Secondly / Finally’ caps cohesion at:", options: ["Band 7", "Band 5", "Band 9", "Band 8"], answer: 1, explanation: "Over-mechanical connectors signal a Band 5 cohesion profile." },
      { question: "Which connector signals SOFTENED contrast?", options: ["However", "That said", "Therefore", "Moreover"], answer: 1, explanation: "‘That said’ politely concedes while contrasting - Band 7.5 register." },
    ],
    cheatSheetPoints: [
      "Build REFERENCE chains: this / these / such",
      "Use SUBSTITUTION: do so / one",
      "Replace ‘however’ with conversely / that said",
      "Use ELLIPSIS for native-like rhythm",
      "Band 7 cohesion is INVISIBLE, not flashing connectors",
    ],
  },

  // ============================================================
  // 7. TIPS - Pronunciation Stress Hack
  // ============================================================
  {
    id: "tips-pronunciation-word-stress",
    title: "Speaking - The Word-Stress Hack for Instant Band 7",
    titleVi: "Speaking - Chiêu trọng âm đẩy ngay Band 7",
    pillar: "tips-hacks",
    icon: "🎵",
    duration: "12 min",
    level: "foundation",
    description:
      "Vietnamese is syllable-timed; English is stress-timed. Get word stress wrong on key nouns and examiners stop understanding. Master 4 stress rules and jump from Band 6 → 7 in pronunciation.",
    descriptionVi:
      "Tiếng Việt theo nhịp âm tiết; tiếng Anh theo nhịp trọng âm. Sai trọng âm danh từ chính = giám khảo không hiểu. Nắm 4 quy tắc dưới đây để nhảy Band 6 → 7 phát âm.",
    strategySteps: [
      { step: 1, title: "RULE 1 - Two-syllable nouns: stress 1st", titleVi: "QUY TẮC 1 - Danh từ 2 âm tiết: nhấn 1", description: "TAble, DOCtor, MARket. Vietnamese learners often flatten them.", descriptionVi: "TAble, DOCtor, MARket. Người Việt hay đọc đều." },
      { step: 2, title: "RULE 2 - Two-syllable verbs: stress 2nd", titleVi: "QUY TẮC 2 - Động từ 2 âm tiết: nhấn 2", description: "reLAX, deCIDE, perMIT. Same spelling, different stress: ‘a PERmit’ (noun) vs ‘to perMIT’ (verb).", descriptionVi: "reLAX, deCIDE, perMIT. Cùng từ, khác trọng âm: ‘a PERmit’ (noun) vs ‘to perMIT’ (verb)." },
      { step: 3, title: "RULE 3 - Words ending -tion / -sion: stress before", titleVi: "QUY TẮC 3 - Từ kết -tion / -sion: nhấn ngay trước", description: "eduCAtion, deCIsion, opPORtunity (also -ity).", descriptionVi: "eduCAtion, deCIsion, opPORtunity (cả -ity)." },
      { step: 4, title: "RULE 4 - Compound nouns: stress 1st part", titleVi: "QUY TẮC 4 - Danh từ ghép: nhấn phần 1", description: "GREENhouse, BLACKboard, BOOKshop.", descriptionVi: "GREENhouse, BLACKboard, BOOKshop." },
    ],
    practicalExamples: [
      { context: "Same spelling, different word class", contextVi: "Cùng chữ, khác loại từ", example: "‘She gave him a PREsent.’ vs ‘He will preSENT the report.’", answer: "Stress shifts noun→verb", explanation: "Failing to shift stress confuses listeners and signals Band 5 pronunciation." },
      { context: "Common -tion error", contextVi: "Lỗi -tion phổ biến", example: "‘EDUcation’ ❌ → ‘eduCAtion’ ✅", answer: "Stress before -tion", explanation: "Rule 3: -tion endings always stress the syllable immediately before." },
    ],
    mistakesToAvoid: [
      { mistake: "Pronouncing every syllable equally (Vietnamese rhythm)", mistakeVi: "Đọc đều mọi âm tiết (nhịp tiếng Việt)", why: "English ears expect a strong-weak rhythm; equal stress sounds robotic and unintelligible.", whyVi: "Tai bản xứ cần nhịp mạnh-yếu; đọc đều nghe máy móc, khó hiểu." },
      { mistake: "Adding stress on -ed / -s endings", mistakeVi: "Nhấn vào -ed / -s", why: "Inflections are NEVER stressed in English - they're weak.", whyVi: "Đuôi -ed / -s không bao giờ nhấn trong tiếng Anh." },
    ],
    goldenSecret:
      "On test day, mentally CLAP the stress of every multi-syllable noun you say. Clap-able stress = clear speech = Band 7 pronunciation.",
    goldenSecretVi:
      "Ngày thi, hãy NHẪM VỖ TAY vào trọng âm mỗi danh từ nhiều âm tiết bạn nói. Vỗ được = nói rõ = phát âm Band 7.",
    vocabHighlights: [
      { word: "stress-timed", definition: "A language whose rhythm comes from stressed syllables.", definitionVi: "Ngôn ngữ có nhịp dựa trên trọng âm.", example: "English is stress-timed; Vietnamese is syllable-timed.", band: "7.0+" },
      { word: "intonation", definition: "The rise and fall of voice pitch.", definitionVi: "Ngữ điệu.", example: "Use rising intonation for yes/no questions.", band: "7.0+" },
      { word: "phoneme", definition: "The smallest unit of sound.", definitionVi: "Âm vị.", example: "/θ/ is a phoneme missing from Vietnamese.", band: "7.0+" },
      { word: "schwa", definition: "The weak /ə/ vowel sound.", definitionVi: "Âm yếu /ə/.", example: "‘banana’ has two schwas: bə-NA-nə.", band: "7.5+" },
    ],
    quiz: [
      { question: "Where is the stress in the noun ‘record’?", options: ["RE-cord", "re-CORD", "Both equal", "No stress"], answer: 0, explanation: "Two-syllable noun → stress on syllable 1." },
      { question: "Where is the stress in the verb ‘record’?", options: ["RE-cord", "re-CORD", "No stress", "Both"], answer: 1, explanation: "Two-syllable verb → stress on syllable 2." },
      { question: "Words ending in -tion stress the syllable…", options: ["At the end (-tion)", "Two before -tion", "Immediately BEFORE -tion", "On the first syllable"], answer: 2, explanation: "Rule 3 - stress falls one syllable before -tion / -sion." },
      { question: "Equal stress on every syllable signals:", options: ["Band 9 fluency", "Vietnamese rhythm - caps pronunciation at Band 5", "Native UK accent", "Strong vocabulary"], answer: 1, explanation: "Flat rhythm is the #1 Vietnamese-learner pronunciation issue." },
      { question: "Compound noun ‘greenhouse’ is stressed on:", options: ["First part (GREEN)", "Second part (house)", "Both equally", "Last syllable"], answer: 0, explanation: "Compound nouns are stressed on the first element." },
    ],
    cheatSheetPoints: [
      "2-syll NOUN → stress 1 (TAble)",
      "2-syll VERB → stress 2 (reLAX)",
      "-tion / -sion / -ity → stress syllable BEFORE",
      "Compound noun → stress 1st part (GREENhouse)",
      "Mentally CLAP stress when speaking on test day",
    ],
  },

  // ============================================================
  // 8. THEMATIC VOCAB - Environment Band 7
  // ============================================================
  {
    id: "vocab-environment-band7",
    title: "Environment - Band 7 Topic Vocabulary",
    titleVi: "Môi trường - Từ vựng chủ đề Band 7",
    pillar: "thematic-vocab",
    icon: "🌱",
    duration: "18 min",
    level: "intermediate",
    description:
      "Environment is the most-asked Task 2 topic of the last 5 years. These 12 collocations + 4 advanced verbs let you write or speak about it with Band-7 lexical resource.",
    descriptionVi:
      "Môi trường là đề Task 2 được hỏi nhiều nhất 5 năm qua. 12 collocation + 4 động từ cao cấp dưới đây giúp bạn viết/nói chủ đề này ở mức Band 7.",
    strategySteps: [
      { step: 1, title: "Replace ‘pollution’ with specific nouns", titleVi: "Thay ‘pollution’ bằng danh từ cụ thể", description: "‘Air pollution’ → ‘particulate matter’, ‘carbon emissions’, ‘airborne pollutants’.", descriptionVi: "‘Air pollution’ → ‘particulate matter’, ‘carbon emissions’, ‘airborne pollutants’." },
      { step: 2, title: "Use 3 hot collocations per essay", titleVi: "Dùng 3 collocation nóng mỗi bài", description: "‘Mitigate climate change’, ‘curb emissions’, ‘depleting natural resources’.", descriptionVi: "‘Mitigate climate change’, ‘curb emissions’, ‘depleting natural resources’." },
      { step: 3, title: "Pair a verb + cause/effect noun", titleVi: "Ghép động từ + danh từ nhân/quả", description: "‘Stem from rampant deforestation’, ‘exacerbate water scarcity’.", descriptionVi: "‘Stem from rampant deforestation’, ‘exacerbate water scarcity’." },
      { step: 4, title: "Cite an institution to sound credible", titleVi: "Trích dẫn tổ chức để tăng uy tín", description: "‘According to the UN’s IPCC report…’ raises Task Response by signalling depth of knowledge.", descriptionVi: "‘According to the UN’s IPCC report…’ tăng Task Response vì cho thấy chiều sâu kiến thức." },
    ],
    practicalExamples: [
      { context: "Topic: plastic pollution", contextVi: "Chủ đề: ô nhiễm nhựa", example: "‘Mounting plastic waste is choking marine ecosystems and exacerbating the climate crisis.’", answer: "3 Band-7 collocations in one line", explanation: "‘Mounting waste’, ‘choking ecosystems’, ‘exacerbating crisis’ → instant Band 7 LR." },
      { context: "Topic: renewable energy", contextVi: "Chủ đề: năng lượng tái tạo", example: "‘Governments should incentivise solar adoption to phase out fossil-fuel dependence.’", answer: "Policy-flavoured vocab", explanation: "‘Incentivise’, ‘phase out’, ‘fossil-fuel dependence’ are essay-friendly collocations." },
    ],
    mistakesToAvoid: [
      { mistake: "Repeating ‘the environment’ 8 times", mistakeVi: "Lặp ‘the environment’ 8 lần", why: "Lexical monotony caps LR at Band 5.", whyVi: "Lặp từ trần LR 5." },
      { mistake: "Memorising long Band-9 chunks and forcing them", mistakeVi: "Học vẹt cụm Band 9 và nhồi vào", why: "Examiners detect template language; it lowers Task Response.", whyVi: "Giám khảo phát hiện học vẹt; giảm Task Response." },
    ],
    goldenSecret:
      "You don't need 50 environment words. Master 12 collocations and 4 verbs, then RECYCLE them with different nouns. Depth beats breadth.",
    goldenSecretVi:
      "Không cần 50 từ môi trường. Nắm 12 collocation + 4 verb rồi TÁI SỬ DỤNG với danh từ khác nhau. Sâu thắng rộng.",
    vocabHighlights: [
      { word: "to mitigate climate change", definition: "To reduce the severity of climate change.", definitionVi: "Giảm nhẹ biến đổi khí hậu.", example: "Reforestation can mitigate climate change.", band: "7.0+" },
      { word: "to curb emissions", definition: "To restrain greenhouse gases.", definitionVi: "Hạn chế khí thải.", example: "Carbon taxes curb emissions effectively.", band: "7.0+" },
      { word: "depleting natural resources", definition: "Reducing finite resources.", definitionVi: "Cạn kiệt tài nguyên thiên nhiên.", example: "Over-fishing is depleting natural resources.", band: "7.0+" },
      { word: "particulate matter (PM2.5)", definition: "Tiny airborne pollutants.", definitionVi: "Bụi mịn.", example: "Hanoi's PM2.5 levels often exceed WHO limits.", band: "7.5+" },
      { word: "to phase out", definition: "To gradually remove.", definitionVi: "Loại bỏ dần.", example: "The EU plans to phase out diesel cars by 2035.", band: "7.0+" },
      { word: "carbon footprint", definition: "Total greenhouse gases caused by an activity.", definitionVi: "Dấu chân carbon.", example: "Eating less meat shrinks your carbon footprint.", band: "7.0+" },
    ],
    quiz: [
      { question: "Choose the Band-7 alternative to ‘pollution’:", options: ["Bad air", "Particulate matter", "Smelly stuff", "Gas"], answer: 1, explanation: "‘Particulate matter’ is specific and academic." },
      { question: "‘___ emissions’ - best verb:", options: ["See", "Curb", "Watch", "Like"], answer: 1, explanation: "‘Curb emissions’ is a high-frequency Band-7 collocation." },
      { question: "‘Phase out’ means:", options: ["Speed up", "Gradually remove", "Multiply", "Double"], answer: 1, explanation: "Used for policies retiring fossil fuels, plastics, etc." },
      { question: "Repeating ‘the environment’ 8 times caps:", options: ["Grammar", "Lexical Resource at Band 5", "Pronunciation", "Coherence at 9"], answer: 1, explanation: "Lexical monotony = LR Band 5 ceiling." },
      { question: "Citing the UN's IPCC report mainly boosts which criterion?", options: ["Pronunciation", "Task Response", "Spelling", "Punctuation"], answer: 1, explanation: "Authoritative evidence increases depth → Task Response." },
    ],
    cheatSheetPoints: [
      "Replace ‘pollution’ with ‘particulate matter / airborne pollutants’",
      "3 hot collocations per essay: mitigate / curb / deplete",
      "Pair verb + cause noun: ‘stem from rampant deforestation’",
      "Cite IPCC / UNEP / WHO once → Task Response boost",
      "Recycle 12 collocations across nouns - depth beats breadth",
    ],
  },

  // ============================================================
  // 9. APPLIED GRAMMAR - Mixed Conditionals
  // ============================================================
  {
    id: "grammar-mixed-conditionals",
    title: "Applied Grammar - Mixed Conditionals That Wow Examiners",
    titleVi: "Ngữ pháp ứng dụng - Mixed Conditionals khiến giám khảo trầm trồ",
    pillar: "applied-grammar",
    icon: "🧠",
    duration: "16 min",
    level: "advanced",
    description:
      "One correct mixed conditional = an examiner mentally ticks ‘Band 7+ Grammar Range’. Learn the 2 patterns and exactly when to deploy them in Writing & Speaking.",
    descriptionVi:
      "Một câu mixed conditional đúng = giám khảo tick ngay ‘Grammar Range Band 7+’. Học 2 cấu trúc và biết tung ra lúc nào trong Writing & Speaking.",
    strategySteps: [
      { step: 1, title: "Pattern A - Past condition → Present result", titleVi: "Mẫu A - Điều kiện QUÁ KHỨ → Kết quả HIỆN TẠI", description: "If + had + V3, would + V₀. ‘If governments had acted in 2000, the climate crisis wouldn't be so dire today.’", descriptionVi: "If + had + V3, would + V₀. ‘If governments had acted in 2000, the climate crisis wouldn't be so dire today.’" },
      { step: 2, title: "Pattern B - Present condition → Past result", titleVi: "Mẫu B - Điều kiện HIỆN TẠI → Kết quả QUÁ KHỨ", description: "If + V₂, would have + V3. ‘If I were a fluent speaker, I would have passed the IELTS last year.’", descriptionVi: "If + V₂, would have + V3. ‘If I were a fluent speaker, I would have passed the IELTS last year.’" },
      { step: 3, title: "Deploy in OPINION essays for nuance", titleVi: "Tung ra trong bài Opinion để nâng tinh tế", description: "Mixed conditionals show CAUSE-EFFECT across time - perfect for Task 2 social issues.", descriptionVi: "Mixed conditional cho thấy nhân-quả XUYÊN THỜI GIAN - hợp Task 2 xã hội." },
      { step: 4, title: "Use ONCE per essay/speaking turn", titleVi: "Dùng MỘT LẦN/bài hoặc lượt nói", description: "Over-use looks template-y. One precise mixed conditional is enough to trigger Band 7 grammar.", descriptionVi: "Lạm dụng trông học vẹt. Một câu đúng đủ kích hoạt Grammar Band 7." },
    ],
    practicalExamples: [
      { context: "Task 2: environment", contextVi: "Task 2: môi trường", example: "‘If world leaders had ratified Kyoto in 1997, our cities would be far cleaner today.’", answer: "Past condition → present result", explanation: "Past failure (didn't ratify) explains current pollution - perfect cause-effect arc." },
      { context: "Speaking Part 3", contextVi: "Speaking Part 3", example: "‘If I weren't so introverted, I would have joined a debate club back in school.’", answer: "Present trait → past missed opportunity", explanation: "Shows nuanced self-reflection - Band 7.5+ trigger." },
    ],
    mistakesToAvoid: [
      { mistake: "Mixing tenses randomly (‘If I would knew…’)", mistakeVi: "Trộn thì tùy hứng (‘If I would knew…’)", why: "Examiner flags it as a grammar error - costs you the band you tried to claim.", whyVi: "Giám khảo đánh dấu lỗi grammar - mất đúng band bạn muốn lấy." },
      { mistake: "Using ‘would’ in BOTH clauses", mistakeVi: "Dùng ‘would’ trong CẢ HAI mệnh đề", why: "‘If’ clause never takes ‘would’ in real conditionals; it takes past tense.", whyVi: "Mệnh đề ‘if’ không bao giờ dùng ‘would’ trong điều kiện thật; phải past tense." },
    ],
    goldenSecret:
      "One mixed conditional, perfectly placed at the end of your opinion paragraph, is worth 100 simple ‘When I was a child…’ sentences. Quality over quantity.",
    goldenSecretVi:
      "Một câu mixed conditional đặt đúng cuối đoạn opinion bằng 100 câu ‘When I was a child…’. Chất hơn lượng.",
    vocabHighlights: [
      { word: "to ratify", definition: "To officially approve (a treaty/agreement).", definitionVi: "Phê chuẩn (hiệp ước).", example: "If Congress had ratified the protocol…", band: "7.0+" },
      { word: "dire", definition: "Extremely serious.", definitionVi: "Vô cùng nghiêm trọng.", example: "The consequences would be dire.", band: "7.0+" },
      { word: "nuanced", definition: "Showing subtle distinctions.", definitionVi: "Tinh tế, nhiều sắc thái.", example: "Mixed conditionals add a nuanced view.", band: "7.5+" },
      { word: "in hindsight", definition: "Looking back with knowledge gained.", definitionVi: "Nhìn lại.", example: "In hindsight, the decision was premature.", band: "7.0+" },
    ],
    quiz: [
      { question: "Mixed Conditional Pattern A connects:", options: ["Past condition → past result", "Past condition → present result", "Present condition → present result", "Future condition → future result"], answer: 1, explanation: "‘If + had + V3, would + V₀’ - past cause, present consequence." },
      { question: "Choose the correct sentence:", options: ["If I would know, I tell you.", "If I had studied harder, I would be a doctor now.", "If I am you, I would have gone.", "If I will go, I would call."], answer: 1, explanation: "Past condition (had studied) → present result (would be) ✓." },
      { question: "Why limit mixed conditionals to ONE per essay?", options: ["They're banned at Band 7", "Over-use looks template-y", "They cause spelling errors", "They lose marks"], answer: 1, explanation: "Examiners reward variety; one precise example is enough." },
      { question: "Pattern B is ‘If + V₂, would have + V3.’ It connects:", options: ["Present trait → missed PAST opportunity", "Future plan → past habit", "Past cause → present result", "Two future events"], answer: 0, explanation: "Present condition → past consequence - nuanced self-reflection." },
      { question: "What is wrong with ‘If I would know, I would tell you.’?", options: ["Nothing", "‘Would’ in the if-clause is incorrect", "Spelling", "Punctuation"], answer: 1, explanation: "The if-clause uses past tense, never ‘would’." },
    ],
    cheatSheetPoints: [
      "Pattern A: If + had + V3, would + V₀ (past→present)",
      "Pattern B: If + V₂, would have + V3 (present→past)",
      "NEVER put ‘would’ in the if-clause",
      "Use ONCE per essay or speaking turn - quality beats quantity",
      "Best slot: end of opinion paragraph or Part 3 reflection",
    ],
  },
];
