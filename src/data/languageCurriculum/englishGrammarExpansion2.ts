// Grammar Expansion 2 - Articles/Determiners, S-V Agreement, Punctuation
import type { LanguageModule } from "./types";

export const grammarExpansionModules2: LanguageModule[] = [
  {
    id: "grammar-articles-advanced",
    title: "Mạo từ, Lượng từ & Determiners (Nâng cao)",
    titleEn: "Articles, Quantifiers & Determiners (Advanced)",
    icon: "📰",
    color: "from-cyan-500 to-blue-600",
    description: "a/an/the với danh từ trừu tượng; much/many/few/little; no vs none.",
    descriptionEn: "a/an/the with abstract nouns; much/many/few/little; no vs none.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "grammar-articles-abstract",
        title: "Mạo từ với danh từ trừu tượng và đặc biệt",
        titleEn: "Articles with Abstract & Special Nouns",
        level: 4,
        difficulty: "intermediate",
        theory: "Danh từ trừu tượng (love, education, advice, information) thường KHÔNG có mạo từ khi nói chung chung: 'Education is important.' Nhưng có 'the' khi xác định cụ thể: 'The education she received was excellent.'\n\nDùng 'a/an' khi danh từ trừu tượng đi kèm tính từ chỉ một loại cụ thể: 'a deep love for music', 'an excellent education'.\n\nCác danh từ không đếm được (advice, information, news, equipment, furniture, luggage) KHÔNG đi với 'a/an' và KHÔNG có dạng số nhiều: 'I need some advice' (KHÔNG: an advice / advices).\n\nTên riêng: KHÔNG có 'the' với hầu hết tên người, thành phố, quốc gia (Vietnam, Tokyo) - NHƯNG có 'the' với một số trường hợp đặc biệt (the United States, the Philippines, the Netherlands, the Alps, the Pacific).",
        theoryEn: "Abstract nouns (love, education, advice, information) usually take NO article when general: 'Education is important.' But take 'the' when made specific: 'The education she received was excellent.'\n\nUse 'a/an' when an abstract noun is described by an adjective making it 'one kind of': 'a deep love for music', 'an excellent education'.\n\nUncountable nouns (advice, information, news, equipment, furniture, luggage) take NO 'a/an' and have NO plural: 'I need some advice' (NOT: an advice / advices).\n\nProper nouns: NO 'the' with most names of people, cities, countries (Vietnam, Tokyo) - BUT use 'the' for special cases (the United States, the Philippines, the Netherlands, the Alps, the Pacific).",
        proTips: [
          "Nói chung về một khái niệm trừu tượng → KHÔNG mạo từ.",
          "advice/information/news LUÔN số ít, dùng some/much/a piece of.",
          "the + tên có 'States/Kingdom/Republic/Federation' → đa phần đúng."
        ],
        proTipsEn: [
          "Speaking generally about an abstract concept → NO article.",
          "advice/information/news are ALWAYS singular; use some/much/a piece of.",
          "the + names containing 'States/Kingdom/Republic/Federation' → usually correct."
        ],
        vocabulary: [
          { word: "advice", partOfSpeech: "noun (uncountable)", meaning: "lời khuyên", meaningEn: "guidance", example: "She gave me some useful advice.", exampleEn: "She gave me some useful advice." },
          { word: "information", partOfSpeech: "noun (uncountable)", meaning: "thông tin", meaningEn: "facts", example: "I need more information about the course.", exampleEn: "I need more information about the course." },
          { word: "equipment", partOfSpeech: "noun (uncountable)", meaning: "thiết bị", meaningEn: "tools/gear", example: "The lab equipment is expensive.", exampleEn: "The lab equipment is expensive." },
          { word: "furniture", partOfSpeech: "noun (uncountable)", meaning: "đồ nội thất", meaningEn: "movable items in a home", example: "The new furniture arrived today.", exampleEn: "The new furniture arrived today." },
          { word: "luggage", partOfSpeech: "noun (uncountable)", meaning: "hành lý", meaningEn: "bags for travel", example: "Leave your luggage at reception.", exampleEn: "Leave your luggage at reception." },
          { word: "news", partOfSpeech: "noun (uncountable)", meaning: "tin tức", meaningEn: "current events", example: "The news is on at six.", exampleEn: "The news is on at six." },
          { word: "research", partOfSpeech: "noun (uncountable)", meaning: "nghiên cứu", meaningEn: "scholarly investigation", example: "Her research is widely cited.", exampleEn: "Her research is widely cited." },
          { word: "feedback", partOfSpeech: "noun (uncountable)", meaning: "phản hồi", meaningEn: "responses to one's work", example: "Please give honest feedback.", exampleEn: "Please give honest feedback." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền 'a', 'an', 'the' hoặc '-' (không cần mạo từ):",
            instructionEn: "Fill with 'a', 'an', 'the', or '-' (no article):",
            sentences: [
              { text: "___ honesty is the best policy.", textEn: "___ honesty is the best policy.", answer: "-" },
              { text: "She gave me ___ excellent piece of advice.", textEn: "She gave me ___ excellent piece of advice.", answer: "an" },
              { text: "He has ___ deep love for jazz music.", textEn: "He has ___ deep love for jazz music.", answer: "a" },
              { text: "I visited ___ Netherlands last summer.", textEn: "I visited ___ Netherlands last summer.", answer: "the" }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct?", options: ["I need an advice.", "I need advices.", "I need some advice.", "I need a advice."], answer: 2, explanation: "Advice is uncountable; use 'some advice'." },
          { question: "Which sentence is correct?", options: ["Education is important.", "The education is important in general.", "An education is important everywhere.", "Educations are important."], answer: 0, explanation: "General concept → no article." },
          { question: "Which country takes 'the'?", options: ["Japan", "Vietnam", "Philippines", "Brazil"], answer: 2, explanation: "'The Philippines' (plural archipelago name)." }
        ]
      },
      {
        id: "grammar-quantifiers",
        title: "Lượng từ: much, many, few, little, no, none",
        titleEn: "Quantifiers: much, many, few, little, no, none",
        level: 3,
        difficulty: "intermediate",
        theory: "Với danh từ ĐẾM ĐƯỢC số nhiều: many, few, a few, several, a number of.\nVới danh từ KHÔNG ĐẾM được: much, little, a little, a great deal of, an amount of.\nVới cả hai loại: some, any, no, a lot of, plenty of, most, all.\n\nKhác biệt then chốt:\n• 'few' = rất ít (mang nghĩa tiêu cực): 'Few students passed.'\n• 'a few' = một vài (tích cực): 'A few students passed - the teacher was pleased.'\n• 'little' = rất ít (tiêu cực, không đếm): 'There is little hope.'\n• 'a little' = một chút (tích cực): 'There is a little hope.'\n\n'no' đứng trước danh từ: 'There are no books.' 'none' đứng một mình hoặc 'none of': 'I have none.' / 'None of the books are mine.'",
        theoryEn: "Countable plural nouns: many, few, a few, several, a number of.\nUncountable nouns: much, little, a little, a great deal of, an amount of.\nBoth: some, any, no, a lot of, plenty of, most, all.\n\nKey distinctions:\n• 'few' = very few (negative): 'Few students passed.'\n• 'a few' = some (positive): 'A few students passed - the teacher was pleased.'\n• 'little' = very little (negative, uncountable): 'There is little hope.'\n• 'a little' = some (positive): 'There is a little hope.'\n\n'no' precedes a noun: 'There are no books.' 'none' stands alone or as 'none of': 'I have none.' / 'None of the books are mine.'",
        proTips: [
          "'much' thường dùng trong câu phủ định/nghi vấn; trong câu khẳng định ưu tiên 'a lot of'.",
          "'fewer' đi với đếm được, 'less' đi với không đếm được.",
          "'none of' + đếm được số nhiều có thể chia 'are' (informal) hoặc 'is' (formal)."
        ],
        proTipsEn: [
          "'much' is mainly for negatives/questions; affirmative sentences prefer 'a lot of'.",
          "'fewer' for countable, 'less' for uncountable.",
          "'none of' + plural countable can take 'are' (informal) or 'is' (formal)."
        ],
        vocabulary: [
          { word: "few", partOfSpeech: "quantifier", meaning: "ít (tiêu cực)", meaningEn: "very few", example: "Few people understood the lecture.", exampleEn: "Few people understood the lecture." },
          { word: "a few", partOfSpeech: "quantifier", meaning: "một vài (tích cực)", meaningEn: "some", example: "A few friends came to help.", exampleEn: "A few friends came to help." },
          { word: "little", partOfSpeech: "quantifier", meaning: "rất ít (không đếm)", meaningEn: "very little", example: "There is little time left.", exampleEn: "There is little time left." },
          { word: "a little", partOfSpeech: "quantifier", meaning: "một chút", meaningEn: "some", example: "Add a little salt.", exampleEn: "Add a little salt." },
          { word: "several", partOfSpeech: "quantifier", meaning: "vài", meaningEn: "more than two but not many", example: "Several students raised questions.", exampleEn: "Several students raised questions." },
          { word: "fewer", partOfSpeech: "quantifier", meaning: "ít hơn (đếm được)", meaningEn: "comparative of few", example: "Fewer cars use this road now.", exampleEn: "Fewer cars use this road now." },
          { word: "less", partOfSpeech: "quantifier", meaning: "ít hơn (không đếm)", meaningEn: "comparative of little", example: "We use less water in winter.", exampleEn: "We use less water in winter." },
          { word: "none", partOfSpeech: "pronoun", meaning: "không cái nào", meaningEn: "not any", example: "None of the answers were correct.", exampleEn: "None of the answers were correct." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền lượng từ phù hợp:",
            instructionEn: "Fill with the correct quantifier:",
            sentences: [
              { text: "There are ___ apples left in the basket - only two.", textEn: "There are ___ apples left in the basket - only two.", answer: "few" },
              { text: "Don't worry, we still have ___ time.", textEn: "Don't worry, we still have ___ time.", answer: "a little" },
              { text: "She made ___ mistakes than last semester.", textEn: "She made ___ mistakes than last semester.", answer: "fewer" },
              { text: "___ of the students passed without studying.", textEn: "___ of the students passed without studying.", answer: "None" }
            ]
          }
        ],
        quiz: [
          { question: "Which is correct with 'water'?", options: ["fewer water", "less water", "few water", "many water"], answer: 1, explanation: "Water is uncountable → 'less'." },
          { question: "'Few students attended' suggests:", options: ["a positive amount", "a disappointingly small number", "exactly five", "many students"], answer: 1, explanation: "'Few' (without 'a') is negative." },
          { question: "Choose the correct sentence:", options: ["There are no any books.", "There aren't no books.", "There are no books.", "There no books."], answer: 2, explanation: "'No' goes directly before the noun." }
        ]
      }
    ]
  },
  {
    id: "grammar-sv-agreement-advanced",
    title: "Sự hòa hợp Chủ – Vị (Nâng cao)",
    titleEn: "Subject-Verb Agreement (Advanced)",
    icon: "🤝",
    color: "from-rose-500 to-red-600",
    description: "Collective nouns, either/neither, indefinite pronouns, 'one of the…'.",
    descriptionEn: "Collective nouns, either/neither, indefinite pronouns, 'one of the…'.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "grammar-sv-tricky",
        title: "Các trường hợp Subject-Verb gây nhầm lẫn",
        titleEn: "Tricky Subject-Verb Agreement Cases",
        level: 4,
        difficulty: "intermediate",
        theory: "1) Collective nouns (team, family, committee, government) - coi như SỐ ÍT khi nói về tập thể như khối thống nhất (US English luôn số ít): 'The team is winning.' Nhưng UK English có thể dùng số nhiều khi nhấn mạnh các thành viên: 'The team are arguing among themselves.'\n\n2) Either/Neither (đứng riêng) → SỐ ÍT: 'Either is acceptable.' Khi đi với 'or/nor': động từ chia theo CHỦ NGỮ GẦN NHẤT: 'Neither the manager nor the workers are happy.'\n\n3) Indefinite pronouns SỐ ÍT: everyone, everybody, someone, anyone, no one, nobody, each, every, either, neither → 'Everyone is here.'\nIndefinite pronouns SỐ NHIỀU: both, few, many, several → 'Both are correct.'\nVỪA số ít/nhiều theo danh từ phía sau: some, all, none, most, any → 'Most of the cake is gone' / 'Most of the students are here.'\n\n4) 'One of the + N (số nhiều) + V' → động từ SỐ ÍT (chủ ngữ là 'one'): 'One of the books is missing.' Nhưng 'One of the students who study hard…' → 'study' chia theo 'students'.",
        theoryEn: "1) Collective nouns (team, family, committee, government) - treated as SINGULAR when seen as one unit (US always singular): 'The team is winning.' UK can use plural to emphasise members: 'The team are arguing.'\n\n2) Either/Neither (alone) → SINGULAR: 'Either is acceptable.' With 'or/nor': verb agrees with the NEAREST subject: 'Neither the manager nor the workers are happy.'\n\n3) SINGULAR indefinite pronouns: everyone, everybody, someone, anyone, no one, nobody, each, every, either, neither → 'Everyone is here.'\nPLURAL indefinite pronouns: both, few, many, several → 'Both are correct.'\nVARIABLE (depends on the noun after 'of'): some, all, none, most, any → 'Most of the cake is gone' / 'Most of the students are here.'\n\n4) 'One of the + plural N + V' → verb is SINGULAR (subject is 'one'): 'One of the books is missing.' But 'One of the students who study hard…' → 'study' agrees with 'students'.",
        proTips: [
          "Bỏ qua cụm 'of the …' giữa chủ ngữ và động từ để xác định chủ ngữ thật.",
          "'A number of' = nhiều → động từ SỐ NHIỀU; 'The number of' = con số → SỐ ÍT.",
          "Tiền/khoảng cách/thời gian dạng đại lượng → SỐ ÍT: 'Ten dollars is enough.'"
        ],
        proTipsEn: [
          "Skip the 'of the …' phrase to find the real subject.",
          "'A number of' = many → PLURAL verb; 'The number of' = the count → SINGULAR.",
          "Money/distance/time as a quantity → SINGULAR: 'Ten dollars is enough.'"
        ],
        vocabulary: [
          { word: "collective noun", partOfSpeech: "term", meaning: "danh từ tập hợp", meaningEn: "noun referring to a group", example: "Family, team, and committee are collective nouns.", exampleEn: "Family, team, and committee are collective nouns." },
          { word: "indefinite pronoun", partOfSpeech: "term", meaning: "đại từ bất định", meaningEn: "non-specific pronoun", example: "Everyone is an indefinite pronoun.", exampleEn: "Everyone is an indefinite pronoun." },
          { word: "agreement", partOfSpeech: "noun", meaning: "sự hòa hợp", meaningEn: "matching subject and verb", example: "Subject-verb agreement matters in formal writing.", exampleEn: "Subject-verb agreement matters in formal writing." },
          { word: "compound subject", partOfSpeech: "term", meaning: "chủ ngữ phức", meaningEn: "two or more subjects joined", example: "Bread and butter is a common compound subject.", exampleEn: "Bread and butter is a common compound subject." },
          { word: "nearest", partOfSpeech: "adjective", meaning: "gần nhất", meaningEn: "closest", example: "With 'or', the verb matches the nearest subject.", exampleEn: "With 'or', the verb matches the nearest subject." },
          { word: "plural", partOfSpeech: "adjective", meaning: "số nhiều", meaningEn: "more than one", example: "'Are' is the plural verb.", exampleEn: "'Are' is the plural verb." },
          { word: "singular", partOfSpeech: "adjective", meaning: "số ít", meaningEn: "only one", example: "'Each' takes a singular verb.", exampleEn: "'Each' takes a singular verb." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chia động từ 'be' đúng (is/are/was/were):",
            instructionEn: "Choose the correct form of 'be' (is/are/was/were):",
            sentences: [
              { text: "Everyone in the class ___ ready for the test.", textEn: "Everyone in the class ___ ready for the test.", answer: "is" },
              { text: "Neither the teacher nor the students ___ available.", textEn: "Neither the teacher nor the students ___ available.", answer: "are" },
              { text: "One of the windows ___ broken.", textEn: "One of the windows ___ broken.", answer: "is" },
              { text: "A number of complaints ___ been received.", textEn: "A number of complaints ___ been received.", answer: "have" }
            ]
          }
        ],
        quiz: [
          { question: "Choose the correct sentence:", options: ["Each of the players were ready.", "Each of the players was ready.", "Each of the players are ready.", "Each players was ready."], answer: 1, explanation: "'Each' is singular → 'was'." },
          { question: "'The number of applicants ___ rising.' Choose:", options: ["are", "is", "have", "were"], answer: 1, explanation: "'The number' is singular." },
          { question: "'Neither the cat nor the dogs ___ in the yard.' Choose:", options: ["is", "was", "are", "has"], answer: 2, explanation: "Verb agrees with the nearest subject 'dogs' (plural)." }
        ]
      }
    ]
  },
  {
    id: "grammar-punctuation-boundaries",
    title: "Dấu câu & Ranh giới câu",
    titleEn: "Punctuation & Sentence Boundaries",
    icon: "✍️",
    color: "from-fuchsia-500 to-purple-600",
    description: "Comma splice, semicolon, colon, dash, run-on sentences.",
    descriptionEn: "Comma splice, semicolon, colon, dash, run-on sentences.",
    category: "grammar",
    language: "english",
    lessons: [
      {
        id: "grammar-comma-splice",
        title: "Comma Splice & Run-on: Cách sửa",
        titleEn: "Comma Splice & Run-on: How to Fix",
        level: 4,
        difficulty: "intermediate",
        theory: "Một CÂU ĐỘC LẬP (independent clause) có chủ ngữ + động từ và đứng riêng được. Hai câu độc lập KHÔNG được nối với nhau bằng MỘT DẤU PHẨY (lỗi 'comma splice') hoặc bằng KHÔNG GÌ CẢ (lỗi 'run-on').\n\nSAI: 'I love coffee, I drink it daily.' (comma splice)\nSAI: 'I love coffee I drink it daily.' (run-on)\n\nNĂM CÁCH SỬA:\n1. Tách thành hai câu: 'I love coffee. I drink it daily.'\n2. Dùng semicolon (;): 'I love coffee; I drink it daily.'\n3. Thêm coordinating conjunction (FANBOYS - for/and/nor/but/or/yet/so) sau dấu phẩy: 'I love coffee, so I drink it daily.'\n4. Biến một vế thành mệnh đề phụ: 'Because I love coffee, I drink it daily.'\n5. Dùng dấu hai chấm khi vế hai GIẢI THÍCH vế một: 'I love coffee: it's my morning ritual.'",
        theoryEn: "An INDEPENDENT clause has a subject + verb and stands alone. Two independent clauses must NOT be joined by ONE COMMA (a 'comma splice') or by NOTHING ('run-on').\n\nWRONG: 'I love coffee, I drink it daily.' (comma splice)\nWRONG: 'I love coffee I drink it daily.' (run-on)\n\nFIVE FIXES:\n1. Split into two sentences: 'I love coffee. I drink it daily.'\n2. Use a semicolon: 'I love coffee; I drink it daily.'\n3. Add a coordinating conjunction (FANBOYS) after the comma: 'I love coffee, so I drink it daily.'\n4. Make one clause subordinate: 'Because I love coffee, I drink it daily.'\n5. Use a colon when the second clause EXPLAINS the first: 'I love coffee: it's my morning ritual.'",
        proTips: [
          "FANBOYS = For, And, Nor, But, Or, Yet, So (chỉ những từ này mới được dùng sau dấu phẩy nối hai mệnh đề độc lập).",
          "However/therefore/moreover KHÔNG phải FANBOYS - phải dùng semicolon: 'I was tired; however, I kept working.'",
          "Dấu colon (:) chỉ dùng sau một mệnh đề độc lập hoàn chỉnh."
        ],
        proTipsEn: [
          "FANBOYS = For, And, Nor, But, Or, Yet, So (only these can join two independent clauses after a comma).",
          "However/therefore/moreover are NOT FANBOYS - use a semicolon: 'I was tired; however, I kept working.'",
          "A colon (:) must follow a complete independent clause."
        ],
        vocabulary: [
          { word: "independent clause", partOfSpeech: "term", meaning: "mệnh đề độc lập", meaningEn: "clause that can stand alone", example: "'She runs' is an independent clause.", exampleEn: "'She runs' is an independent clause." },
          { word: "comma splice", partOfSpeech: "term", meaning: "lỗi nối câu bằng dấu phẩy", meaningEn: "joining two clauses with only a comma", example: "Comma splice: 'I came, I saw.'", exampleEn: "Comma splice: 'I came, I saw.'" },
          { word: "run-on", partOfSpeech: "term", meaning: "câu chạy lan", meaningEn: "two clauses with no punctuation", example: "Run-on: 'I came I saw.'", exampleEn: "Run-on: 'I came I saw.'" },
          { word: "semicolon", partOfSpeech: "noun", meaning: "dấu chấm phẩy (;)", meaningEn: "the ';' punctuation mark", example: "A semicolon links related clauses.", exampleEn: "A semicolon links related clauses." },
          { word: "colon", partOfSpeech: "noun", meaning: "dấu hai chấm (:)", meaningEn: "the ':' punctuation mark", example: "Use a colon before a list or explanation.", exampleEn: "Use a colon before a list or explanation." },
          { word: "coordinating conjunction", partOfSpeech: "term", meaning: "liên từ kết hợp", meaningEn: "FANBOYS-type conjunction", example: "'But' is a coordinating conjunction.", exampleEn: "'But' is a coordinating conjunction." },
          { word: "subordinate clause", partOfSpeech: "term", meaning: "mệnh đề phụ", meaningEn: "clause that depends on a main clause", example: "'Because I'm tired' is a subordinate clause.", exampleEn: "'Because I'm tired' is a subordinate clause." },
          { word: "dash", partOfSpeech: "noun", meaning: "dấu gạch ngang (-)", meaningEn: "the '-' punctuation mark", example: "Dashes set off dramatic asides - like this one.", exampleEn: "Dashes set off dramatic asides - like this one." }
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dấu câu phù hợp (. ; , so):",
            instructionEn: "Choose the correct punctuation (. ; , so):",
            sentences: [
              { text: "The rain stopped ___ the children went outside to play.", textEn: "The rain stopped ___ the children went outside to play.", answer: ";" },
              { text: "She studied hard ___ she passed the exam easily.", textEn: "She studied hard ___ she passed the exam easily.", answer: ", so" },
              { text: "Bring three items ___ a notebook, a pen, and your textbook.", textEn: "Bring three items ___ a notebook, a pen, and your textbook.", answer: ":" },
              { text: "He was hungry ___ however, he refused to eat.", textEn: "He was hungry ___ however, he refused to eat.", answer: ";" }
            ]
          }
        ],
        quiz: [
          { question: "Which sentence has a comma splice?", options: ["I came, and I saw.", "I came, I saw.", "I came; I saw.", "I came. I saw."], answer: 1, explanation: "Two independent clauses joined only by a comma." },
          { question: "Which is FANBOYS?", options: ["however", "therefore", "but", "moreover"], answer: 2, explanation: "'But' is a coordinating conjunction (FANBOYS)." },
          { question: "A colon should follow:", options: ["any clause", "a complete independent clause", "a single word", "a comma"], answer: 1, explanation: "Colons require a complete independent clause before them." }
        ]
      }
    ]
  }
];
