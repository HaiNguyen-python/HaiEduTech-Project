// SAT Expansion 6 - Reading strategy techniques + Punctuation deep-dive + Cross-text connections
import type { LanguageModule } from "./types";

export const satExpansionModules6: LanguageModule[] = [
  {
    id: "sat-reading-techniques",
    title: "Kỹ thuật Reading SAT chuyên sâu",
    titleEn: "Advanced SAT Reading Techniques",
    icon: "🧠",
    color: "from-rose-500 to-pink-600",
    description: "Predict-then-pick, paraphrase, và xử lý câu hỏi 'main purpose' và 'cross-text connections'.",
    descriptionEn: "Predict-then-pick, paraphrase, and handling 'main purpose' and 'cross-text connections' questions.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-predict-then-pick",
        title: "Kỹ thuật 'Đoán trước – Chọn sau'",
        titleEn: "The Predict-Then-Pick Technique",
        level: 4,
        difficulty: "intermediate",
        theory: "Đa số học sinh trượt bẫy SAT vì đọc 4 đáp án trước, rồi 'chọn cái nghe quen'. Kỹ thuật predict-then-pick đảo ngược: bạn ĐỌC ĐOẠN VĂN → ĐỌC CÂU HỎI → DỰ ĐOÁN câu trả lời bằng từ ngữ của riêng bạn → CHỈ SAU đó mới nhìn 4 đáp án. Đáp án đúng phải khớp với dự đoán của bạn về mặt ý nghĩa, không nhất thiết về mặt từ ngữ.\n\nVí dụ: 'The author mentions the 1969 moon landing primarily to ___'. Trước khi xem A/B/C/D, bạn nên dự đoán: 'để minh họa cho ý chính rằng công nghệ thay đổi nhanh'. Bây giờ tìm đáp án nói điều tương tự, dù dùng từ khác.",
        theoryEn: "Most students fall into SAT traps because they read the 4 choices first and 'pick what sounds familiar'. Predict-then-pick reverses the order: READ THE PASSAGE → READ THE QUESTION → PREDICT the answer in your own words → ONLY THEN look at the 4 choices. The correct answer must match your prediction in meaning, not necessarily in wording.\n\nExample: 'The author mentions the 1969 moon landing primarily to ___'. Before peeking at A/B/C/D, predict: 'to illustrate the main idea that technology changes fast'. Now find the choice that says this, even with different words.",
        proTips: [
          "Che 4 đáp án bằng tay (hoặc dùng Bluebook Annotate) trong 5 giây đầu để ép não dự đoán.",
          "Nếu không dự đoán nổi, đó là tín hiệu bạn chưa hiểu đoạn văn - đọc lại trước khi đoán mò.",
          "Đáp án đúng thường là paraphrase. Đáp án sai thường lặp nguyên văn từ trong đoạn ('word trap')."
        ],
        proTipsEn: [
          "Cover the 4 choices with your hand (or Bluebook Annotate) for the first 5 seconds to force prediction.",
          "If you can't predict, that's a signal you misread the passage - reread before guessing.",
          "Correct answers usually paraphrase. Wrong answers often repeat passage wording verbatim ('word trap')."
        ],
        vocabulary: [
          { word: "predict", partOfSpeech: "verb", meaning: "dự đoán", meaningEn: "to say what will happen", example: "Predict the answer before reading choices.", exampleEn: "Predict the answer before reading choices." },
          { word: "paraphrase", partOfSpeech: "verb", meaning: "diễn đạt lại", meaningEn: "to restate in different words", example: "The correct choice paraphrases the passage.", exampleEn: "The correct choice paraphrases the passage." },
          { word: "verbatim", partOfSpeech: "adverb", meaning: "nguyên văn", meaningEn: "word for word", example: "Avoid choices that quote the text verbatim.", exampleEn: "Avoid choices that quote the text verbatim." },
          { word: "trap answer", partOfSpeech: "noun", meaning: "đáp án bẫy", meaningEn: "a wrong choice that looks attractive", example: "SAT writers design trap answers carefully.", exampleEn: "SAT writers design trap answers carefully." },
          { word: "context clue", partOfSpeech: "noun", meaning: "manh mối ngữ cảnh", meaningEn: "a hint from surrounding words", example: "Underline one context clue per question.", exampleEn: "Underline one context clue per question." },
          { word: "infer", partOfSpeech: "verb", meaning: "suy luận", meaningEn: "to conclude from evidence", example: "We can infer the author disagrees.", exampleEn: "We can infer the author disagrees." },
          { word: "tone", partOfSpeech: "noun", meaning: "giọng điệu", meaningEn: "the author's attitude", example: "The tone is skeptical, not hostile.", exampleEn: "The tone is skeptical, not hostile." },
          { word: "main idea", partOfSpeech: "noun", meaning: "ý chính", meaningEn: "the central point", example: "Identify the main idea before answering.", exampleEn: "Identify the main idea before answering." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "Always ___ the answer in your own words before looking at the choices.", textEn: "Always ___ the answer in your own words before looking at the choices.", answer: "predict" },
              { text: "A choice that copies passage wording exactly is often a ___.", textEn: "A choice that copies passage wording exactly is often a ___.", answer: "trap" },
              { text: "The correct SAT answer usually ___ the passage in different words.", textEn: "The correct SAT answer usually ___ the passage in different words.", answer: "paraphrases" },
              { text: "If you can't predict, you don't fully understand the ___.", textEn: "If you can't predict, you don't fully understand the ___.", answer: "passage" }
            ]
          }
        ],
        quiz: [
          { question: "What is the FIRST step of predict-then-pick?", options: ["Read the 4 choices", "Read the passage and question", "Eliminate two choices", "Mark for review"], answer: 1, explanation: "You must understand the passage and question before predicting." },
          { question: "Why do correct SAT answers paraphrase rather than quote?", options: ["To save space", "To test deep comprehension, not memory", "To confuse students", "Because of copyright"], answer: 1, explanation: "SAT measures comprehension, not surface-level word matching." },
          { question: "If you cannot predict the answer, you should:", options: ["Guess randomly", "Reread the relevant lines", "Skip the question forever", "Pick the longest choice"], answer: 1, explanation: "Failure to predict means a comprehension gap - go back to the text." }
        ]
      }
    ]
  },
  {
    id: "sat-punctuation-deepdive",
    title: "Dấu câu SAT chuyên sâu",
    titleEn: "SAT Punctuation Deep-Dive",
    icon: "✒️",
    color: "from-amber-500 to-orange-600",
    description: "Comma, semicolon, colon, dash - 4 dấu chiếm phần lớn câu hỏi Boundaries.",
    descriptionEn: "Comma, semicolon, colon, dash - the 4 marks behind most Boundaries questions.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-punct-four-marks",
        title: "4 dấu câu cốt lõi: , ; : -",
        titleEn: "The 4 Core Punctuation Marks: , ; : -",
        level: 4,
        difficulty: "intermediate",
        theory: "Khoảng 70% câu hỏi 'Boundaries' của Digital SAT xoay quanh 4 dấu: comma, semicolon, colon, em dash. Quy tắc cốt lõi:\n\n1) SEMICOLON (;) nối 2 mệnh đề ĐỘC LẬP (mỗi vế đứng riêng vẫn thành câu). VD: 'She studied hard; she passed easily.'\n\n2) COLON (:) đứng sau 1 mệnh đề ĐỘC LẬP để giới thiệu danh sách / giải thích / câu trích. VD: 'He had one goal: graduate.'\n\n3) EM DASH (-) hoạt động như 'colon mềm' hoặc cặp dấu phẩy nhấn mạnh. Hai dấu - phải đi theo cặp khi chèn giữa câu.\n\n4) COMMA (,) KHÔNG được nối 2 mệnh đề độc lập (đây là 'comma splice'). Comma dùng để: liệt kê, ngăn mệnh đề phụ, sau từ giới thiệu, quanh phần phụ chú không thiết yếu.",
        theoryEn: "About 70% of Digital SAT 'Boundaries' questions revolve around 4 marks: comma, semicolon, colon, em dash. Core rules:\n\n1) SEMICOLON (;) joins 2 INDEPENDENT clauses (each side could stand alone). E.g. 'She studied hard; she passed easily.'\n\n2) COLON (:) follows an INDEPENDENT clause to introduce a list / explanation / quote. E.g. 'He had one goal: graduate.'\n\n3) EM DASH (-) works as a 'soft colon' or paired emphasis (like commas). Two dashes must come as a pair when inserting mid-sentence.\n\n4) COMMA (,) CANNOT join 2 independent clauses (this is a 'comma splice'). Use commas for: lists, dependent clauses, intro words, around non-essential info.",
        proTips: [
          "Test nhanh semicolon: thay ; bằng dấu chấm. Nếu vẫn ra 2 câu hoàn chỉnh → đúng.",
          "Trước colon BẮT BUỘC là mệnh đề độc lập; sau colon có thể là mệnh đề, danh sách hoặc cụm từ.",
          "Em dash thường có thể thay bằng cặp dấu phẩy hoặc dấu ngoặc đơn."
        ],
        proTipsEn: [
          "Quick semicolon test: replace ; with a period. If both sides remain complete sentences → correct.",
          "Before a colon you MUST have an independent clause; after the colon, anything goes (clause, list, phrase).",
          "An em dash can usually be swapped for paired commas or parentheses."
        ],
        vocabulary: [
          { word: "independent clause", partOfSpeech: "noun", meaning: "mệnh đề độc lập", meaningEn: "a complete thought with subject + verb", example: "'She runs' is an independent clause.", exampleEn: "'She runs' is an independent clause." },
          { word: "dependent clause", partOfSpeech: "noun", meaning: "mệnh đề phụ thuộc", meaningEn: "a clause that cannot stand alone", example: "'Because she runs' is a dependent clause.", exampleEn: "'Because she runs' is a dependent clause." },
          { word: "comma splice", partOfSpeech: "noun", meaning: "lỗi dùng dấu phẩy nối 2 mệnh đề", meaningEn: "joining 2 independent clauses with only a comma", example: "'I came, I saw' is a comma splice.", exampleEn: "'I came, I saw' is a comma splice." },
          { word: "non-essential", partOfSpeech: "adjective", meaning: "không thiết yếu", meaningEn: "removable without changing meaning", example: "Non-essential phrases need commas around them.", exampleEn: "Non-essential phrases need commas around them." },
          { word: "appositive", partOfSpeech: "noun", meaning: "đồng vị ngữ", meaningEn: "a noun phrase renaming another noun", example: "My friend, a doctor, lives nearby.", exampleEn: "My friend, a doctor, lives nearby." },
          { word: "introductory phrase", partOfSpeech: "noun", meaning: "cụm giới thiệu", meaningEn: "an opening phrase before the main clause", example: "After dinner, we left.", exampleEn: "After dinner, we left." },
          { word: "em dash", partOfSpeech: "noun", meaning: "dấu gạch dài", meaningEn: "the long dash -", example: "Use an em dash for emphasis.", exampleEn: "Use an em dash for emphasis." },
          { word: "semicolon", partOfSpeech: "noun", meaning: "dấu chấm phẩy", meaningEn: "the mark ;", example: "A semicolon links related sentences.", exampleEn: "A semicolon links related sentences." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn dấu câu đúng (, hoặc ; hoặc : hoặc -):",
            instructionEn: "Choose the correct punctuation (, or ; or : or -):",
            sentences: [
              { text: "She had three favorite subjects ___ math, biology, and history.", textEn: "She had three favorite subjects ___ math, biology, and history.", answer: ":" },
              { text: "He studied for hours ___ he still failed the test.", textEn: "He studied for hours ___ he still failed the test.", answer: ";" },
              { text: "After the meeting ___ we went out for coffee.", textEn: "After the meeting ___ we went out for coffee.", answer: "," },
              { text: "My brother ___ a software engineer ___ moved to Helsinki last year.", textEn: "My brother ___ a software engineer ___ moved to Helsinki last year.", answer: "-" }
            ]
          }
        ],
        quiz: [
          { question: "Which sentence is correctly punctuated?", options: ["I love coffee, I drink it daily.", "I love coffee; I drink it daily.", "I love coffee I drink it daily.", "I love coffee: I drink it daily."], answer: 1, explanation: "A semicolon correctly joins two independent clauses." },
          { question: "What MUST come before a colon?", options: ["A list", "An independent clause", "A dependent clause", "A noun phrase"], answer: 1, explanation: "Colons require a complete independent clause on the left side." },
          { question: "Which is a 'comma splice' error?", options: ["Tired but happy, she slept.", "She studied hard, she passed.", "After dinner, we left.", "My dog, a poodle, barks."], answer: 1, explanation: "'She studied hard, she passed' joins two independent clauses with only a comma." },
          { question: "Em dashes used mid-sentence must be:", options: ["Single", "Paired", "Followed by a comma", "Capitalized"], answer: 1, explanation: "When inserting non-essential info mid-sentence, em dashes come as a pair." }
        ]
      }
    ]
  },
  {
    id: "sat-cross-text-connections",
    title: "Cross-Text Connections (Digital SAT)",
    titleEn: "Cross-Text Connections (Digital SAT)",
    icon: "🔗",
    color: "from-violet-500 to-purple-600",
    description: "So sánh quan điểm 2 đoạn văn - dạng câu khó nhất của R&W.",
    descriptionEn: "Comparing viewpoints across 2 passages - the hardest R&W question type.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-cross-text-strategy",
        title: "Chiến lược Cross-Text trong 90 giây",
        titleEn: "Cross-Text Strategy in 90 Seconds",
        level: 5,
        difficulty: "advanced",
        theory: "Dạng Cross-Text Connections cho bạn 2 đoạn văn ngắn (Text 1 và Text 2) cùng chủ đề nhưng khác quan điểm. Câu hỏi điển hình: 'How would the author of Text 2 most likely respond to the underlined claim in Text 1?'\n\nQuy trình 4 bước (90 giây):\n1) Đọc Text 1 → tóm tắt quan điểm bằng 1 câu (vd: 'X tốt vì Y').\n2) Đọc Text 2 → tóm tắt: 'Đồng ý / Không đồng ý / Bổ sung / Phản bác'.\n3) Dự đoán phản ứng cụ thể của tác giả Text 2.\n4) Khớp với 4 đáp án - loại bỏ đáp án diễn đạt ngược chiều hoặc ngoài chủ đề.\n\nBẫy phổ biến: đáp án 'cùng chủ đề nhưng sai quan điểm' (ví dụ Text 2 đồng ý nhưng đáp án viết là phản đối). Luôn kiểm tra dấu hiệu ngôn ngữ: 'however', 'in contrast', 'similarly', 'extends this view'.",
        theoryEn: "Cross-Text Connections gives you 2 short passages (Text 1 and Text 2) on the same topic but with different viewpoints. Typical question: 'How would the author of Text 2 most likely respond to the underlined claim in Text 1?'\n\n4-step process (90 seconds):\n1) Read Text 1 → summarize the view in one sentence (e.g. 'X is good because Y').\n2) Read Text 2 → label it: 'Agrees / Disagrees / Adds nuance / Refutes'.\n3) Predict Text 2 author's specific reaction.\n4) Match against the 4 choices - eliminate wrong-direction or off-topic ones.\n\nCommon trap: a choice that's 'on topic but wrong stance' (e.g. Text 2 agrees but the answer says it disagrees). Always check for linguistic markers: 'however', 'in contrast', 'similarly', 'extends this view'.",
        proTips: [
          "Trong 5 giây đầu, chỉ tìm RELATIONSHIP: agree / disagree / qualify / extend.",
          "Đáp án có cụm 'while acknowledging that…' rất hay đúng vì thể hiện sắc thái.",
          "Nếu cả 2 text trung lập, dự đoán Text 2 'bổ sung góc nhìn' chứ không 'phản bác mạnh'."
        ],
        proTipsEn: [
          "In the first 5 seconds, identify only the RELATIONSHIP: agree / disagree / qualify / extend.",
          "Choices with 'while acknowledging that…' often win because they capture nuance.",
          "If both texts are neutral, predict Text 2 'adds a perspective' rather than 'strongly refutes'."
        ],
        vocabulary: [
          { word: "claim", partOfSpeech: "noun", meaning: "luận điểm", meaningEn: "an assertion or argument", example: "Text 1 makes a strong claim about climate.", exampleEn: "Text 1 makes a strong claim about climate." },
          { word: "refute", partOfSpeech: "verb", meaning: "bác bỏ", meaningEn: "to prove wrong", example: "Text 2 attempts to refute that claim.", exampleEn: "Text 2 attempts to refute that claim." },
          { word: "qualify", partOfSpeech: "verb", meaning: "bổ sung sắc thái", meaningEn: "to limit or modify a statement", example: "The author qualifies the original view.", exampleEn: "The author qualifies the original view." },
          { word: "extend", partOfSpeech: "verb", meaning: "mở rộng", meaningEn: "to develop further", example: "Text 2 extends Text 1's argument.", exampleEn: "Text 2 extends Text 1's argument." },
          { word: "concede", partOfSpeech: "verb", meaning: "thừa nhận", meaningEn: "to admit a point", example: "She concedes the data is incomplete.", exampleEn: "She concedes the data is incomplete." },
          { word: "viewpoint", partOfSpeech: "noun", meaning: "quan điểm", meaningEn: "a way of looking at something", example: "The two viewpoints differ sharply.", exampleEn: "The two viewpoints differ sharply." },
          { word: "nuance", partOfSpeech: "noun", meaning: "sắc thái", meaningEn: "a subtle distinction", example: "The answer captures a key nuance.", exampleEn: "The answer captures a key nuance." },
          { word: "stance", partOfSpeech: "noun", meaning: "lập trường", meaningEn: "a position on an issue", example: "Identify each author's stance first.", exampleEn: "Identify each author's stance first." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ thích hợp:",
            instructionEn: "Fill in the blank:",
            sentences: [
              { text: "If Text 2 partially agrees but adds limits, the author is said to ___ the claim.", textEn: "If Text 2 partially agrees but adds limits, the author is said to ___ the claim.", answer: "qualify" },
              { text: "A choice on the right topic but wrong direction is a classic ___ answer.", textEn: "A choice on the right topic but wrong direction is a classic ___ answer.", answer: "trap" },
              { text: "Words like 'however' and 'in contrast' signal ___ between the two texts.", textEn: "Words like 'however' and 'in contrast' signal ___ between the two texts.", answer: "disagreement" },
              { text: "Always identify each author's ___ before reading the answer choices.", textEn: "Always identify each author's ___ before reading the answer choices.", answer: "stance" }
            ]
          }
        ],
        quiz: [
          { question: "What is the FIRST thing to determine in a Cross-Text question?", options: ["The longest passage", "The relationship between the two texts", "The vocabulary level", "The publication date"], answer: 1, explanation: "Identifying agree/disagree/qualify/extend is the foundation." },
          { question: "Text 2 'qualifies' Text 1 means it:", options: ["Fully rejects Text 1", "Fully agrees with Text 1", "Agrees with limits or conditions", "Ignores Text 1"], answer: 2, explanation: "To qualify is to accept partially while adding nuance or conditions." },
          { question: "A trap answer in Cross-Text questions typically:", options: ["Uses unfamiliar words", "Is on topic but wrong stance", "Is too short", "Quotes Text 1 verbatim"], answer: 1, explanation: "Topic match + wrong direction is the most common SAT trap here." },
          { question: "Which phrase signals Text 2 EXTENDS Text 1's argument?", options: ["'In contrast,'", "'Building on this idea,'", "'However,'", "'Conversely,'"], answer: 1, explanation: "'Building on this idea' indicates the author adds to the same line of thinking." }
        ]
      }
    ]
  }
];
