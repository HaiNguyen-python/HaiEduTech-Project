// Vietnamese grammar lessons - 40 lessons across 4 modules (10+ words, 5+ quizzes each)
import type { VietnameseModule } from "./types";

export const grammarModules: VietnameseModule[] = [
  {
    id: "vn-grammar-basics",
    title: "Ngữ pháp cơ bản",
    titleEn: "Basic Grammar",
    icon: "📝",
    color: "from-red-500 to-orange-500",
    description: "Cấu trúc câu, đại từ, và ngữ pháp cơ bản",
    descriptionEn: "Sentence structure, pronouns, and basic grammar",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-1",
        title: "Cấu trúc câu cơ bản",
        titleEn: "Basic Sentence Structure",
        level: "beginner",
        theory: `## Cấu trúc câu tiếng Việt\n\nTiếng Việt có cấu trúc **Chủ ngữ + Vị ngữ + Bổ ngữ** (SVO).\n\n### Ví dụ:\n- **Tôi** ăn cơm.\n- **Cô ấy** đọc sách.\n- **Chúng tôi** đi học.\n\n### Đặc điểm:\n- Không chia động từ theo ngôi\n- Không có mạo từ (a, an, the)\n- Tính từ đứng **sau** danh từ`,
        theoryEn: `## Vietnamese Sentence Structure\n\nVietnamese follows **Subject + Verb + Object** (SVO).\n\n### Examples:\n- **Tôi** ăn cơm. (I eat rice.)\n- **Cô ấy** đọc sách. (She reads books.)\n\n### Key Features:\n- Verbs don't conjugate\n- No articles\n- Adjectives come **after** nouns`,
        vocabulary: [
          { word: "tôi", meaning: "đại từ ngôi thứ nhất", meaningEn: "I / me", example: "Tôi là sinh viên.", exampleEn: "I am a student.", partOfSpeech: "pronoun" },
          { word: "ăn", meaning: "đưa thức ăn vào miệng", meaningEn: "to eat", example: "Tôi ăn phở mỗi sáng.", exampleEn: "I eat pho every morning.", partOfSpeech: "verb" },
          { word: "cơm", meaning: "gạo đã nấu chín", meaningEn: "rice (cooked)", example: "Cơm Việt Nam rất ngon.", exampleEn: "Vietnamese rice is delicious.", partOfSpeech: "noun" },
          { word: "đi", meaning: "di chuyển", meaningEn: "to go", example: "Chúng tôi đi chợ.", exampleEn: "We go to the market.", partOfSpeech: "verb" },
          { word: "cô ấy", meaning: "đại từ ngôi thứ ba nữ", meaningEn: "she / her", example: "Cô ấy là giáo viên.", exampleEn: "She is a teacher.", partOfSpeech: "pronoun" },
          { word: "đọc", meaning: "nhìn chữ và hiểu", meaningEn: "to read", example: "Tôi đọc báo mỗi sáng.", exampleEn: "I read the newspaper every morning.", partOfSpeech: "verb" },
          { word: "sách", meaning: "tập hợp trang giấy có chữ", meaningEn: "book", example: "Quyển sách này rất hay.", exampleEn: "This book is very good.", partOfSpeech: "noun" },
          { word: "học", meaning: "tiếp thu kiến thức", meaningEn: "to study / to learn", example: "Chúng tôi đi học mỗi ngày.", exampleEn: "We go to school every day.", partOfSpeech: "verb" },
          { word: "viết", meaning: "ghi chữ trên giấy", meaningEn: "to write", example: "Em viết bài tập.", exampleEn: "She writes homework.", partOfSpeech: "verb" },
          { word: "nhà", meaning: "nơi ở", meaningEn: "house / home", example: "Nhà tôi ở Hà Nội.", exampleEn: "My house is in Hanoi.", partOfSpeech: "noun" },
          { word: "làm", meaning: "thực hiện công việc", meaningEn: "to do / to work", example: "Tôi làm bài tập.", exampleEn: "I do homework.", partOfSpeech: "verb" },
          { word: "nói", meaning: "phát ra lời", meaningEn: "to speak / to say", example: "Cô ấy nói tiếng Việt.", exampleEn: "She speaks Vietnamese.", partOfSpeech: "verb" },
          { word: "nghe", meaning: "tiếp nhận âm thanh", meaningEn: "to listen / to hear", example: "Nghe nhạc mỗi tối.", exampleEn: "Listen to music every evening.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Cấu trúc câu cơ bản của tiếng Việt là gì?", questionEn: "What is the basic sentence structure?", options: ["SOV", "SVO", "VSO", "OVS"], answer: 1, explanation: "Tiếng Việt theo cấu trúc SVO.", explanationEn: "Vietnamese follows SVO order." },
          { question: "Tính từ đứng ở đâu?", questionEn: "Where do adjectives go?", options: ["Trước danh từ", "Sau danh từ", "Đầu câu", "Cuối câu"], answer: 1, explanation: "Tính từ đứng sau danh từ: 'nhà lớn'.", explanationEn: "After nouns: 'nhà lớn' (big house)." },
          { question: "Tiếng Việt có chia động từ theo ngôi không?", questionEn: "Does Vietnamese conjugate verbs?", options: ["Có", "Không", "Chỉ ngôi thứ nhất", "Chỉ quá khứ"], answer: 1, explanation: "Tiếng Việt không chia động từ.", explanationEn: "Vietnamese doesn't conjugate verbs." },
          { question: "'Nhà lớn' hay 'lớn nhà'?", questionEn: "'Nhà lớn' or 'lớn nhà'?", options: ["Nhà lớn", "Lớn nhà", "Cả hai đều đúng", "Cả hai đều sai"], answer: 0, explanation: "Tính từ đứng sau danh từ: nhà lớn.", explanationEn: "Adjective after noun: nhà lớn." },
          { question: "'Cô ấy đọc sách' có mấy thành phần chính?", questionEn: "How many main parts in 'Cô ấy đọc sách'?", options: ["2", "3", "4", "5"], answer: 1, explanation: "S (Cô ấy) + V (đọc) + O (sách) = 3.", explanationEn: "S + V + O = 3 parts." },
        ],
        proTips: ["Tính từ luôn đứng SAU danh từ!"],
        proTipsEn: ["Adjectives always come AFTER nouns!"],
      },
      {
        id: "vn-gram-2",
        title: "Hệ thống đại từ nhân xưng",
        titleEn: "Pronoun System",
        level: "beginner",
        theory: `## Đại từ nhân xưng\n\nTiếng Việt có hệ thống đại từ phong phú, thay đổi theo tuổi tác, giới tính, mối quan hệ.\n\n| Đại từ | Nghĩa | Dùng khi |\n|--------|--------|----------|\n| Tôi | I (formal) | Trang trọng |\n| Mình | I (casual) | Thân mật |\n| Anh | He/You (older male) | Nam lớn hơn |\n| Chị | She/You (older female) | Nữ lớn hơn |\n| Em | You (younger) | Nhỏ hơn |\n| Ông | Grandfather | Ông lớn tuổi |\n| Bà | Grandmother | Bà lớn tuổi |`,
        theoryEn: `## Pronoun System\n\nVietnamese has a rich pronoun system based on age, gender, and relationship.`,
        vocabulary: [
          { word: "anh", meaning: "đại từ cho nam lớn hơn", meaningEn: "older brother / you (older male)", example: "Anh ơi, cho tôi hỏi.", exampleEn: "Excuse me, sir.", partOfSpeech: "pronoun" },
          { word: "chị", meaning: "đại từ cho nữ lớn hơn", meaningEn: "older sister / you (older female)", example: "Chị có khỏe không?", exampleEn: "How are you, miss?", partOfSpeech: "pronoun" },
          { word: "em", meaning: "đại từ cho người nhỏ hơn", meaningEn: "younger sibling / you (younger)", example: "Em học lớp mấy?", exampleEn: "What grade are you in?", partOfSpeech: "pronoun" },
          { word: "ông", meaning: "ông, người nam lớn tuổi", meaningEn: "grandfather / elderly man", example: "Ông ấy rất tốt bụng.", exampleEn: "He (the old man) is very kind.", partOfSpeech: "pronoun" },
          { word: "bà", meaning: "bà, người nữ lớn tuổi", meaningEn: "grandmother / elderly woman", example: "Bà ấy nấu ăn rất ngon.", exampleEn: "She (grandma) cooks very well.", partOfSpeech: "pronoun" },
          { word: "mình", meaning: "đại từ thân mật", meaningEn: "I (casual) / oneself", example: "Mình đi ăn nhé!", exampleEn: "Let's go eat!", partOfSpeech: "pronoun" },
          { word: "chúng tôi", meaning: "đại từ số nhiều (không gồm người nghe)", meaningEn: "we (exclusive)", example: "Chúng tôi là học sinh.", exampleEn: "We are students.", partOfSpeech: "pronoun" },
          { word: "họ", meaning: "đại từ ngôi ba số nhiều", meaningEn: "they / them", example: "Họ đang làm việc.", exampleEn: "They are working.", partOfSpeech: "pronoun" },
          { word: "cô", meaning: "cô gái / cách gọi lịch sự", meaningEn: "miss / aunt (polite)", example: "Cô giáo rất tốt.", exampleEn: "The teacher is very nice.", partOfSpeech: "pronoun" },
          { word: "chú", meaning: "chú, nam nhỏ hơn bố", meaningEn: "uncle (younger than father)", example: "Chú ấy là bác sĩ.", exampleEn: "He (uncle) is a doctor.", partOfSpeech: "pronoun" },
        ],
        quiz: [
          { question: "Khi nói với nam lớn tuổi hơn, dùng đại từ gì?", questionEn: "Which pronoun for an older male?", options: ["Em", "Anh", "Chị", "Tôi"], answer: 1, explanation: "'Anh' dùng cho nam lớn tuổi hơn.", explanationEn: "'Anh' is for older males." },
          { question: "'Em' dùng khi nào?", questionEn: "When do you use 'Em'?", options: ["Người lớn hơn", "Người nhỏ hơn", "Chỉ nữ", "Chỉ nam"], answer: 1, explanation: "'Em' cho người nhỏ tuổi hơn, cả nam lẫn nữ.", explanationEn: "'Em' is for younger people, both male and female." },
          { question: "'Ông' dùng để gọi ai?", questionEn: "Who is 'ông' for?", options: ["Trẻ em", "Nam lớn tuổi / ông", "Nữ cùng tuổi", "Em nhỏ"], answer: 1, explanation: "'Ông' = nam lớn tuổi.", explanationEn: "'Ông' = elderly man / grandfather." },
          { question: "'Chúng tôi' khác 'chúng ta' thế nào?", questionEn: "Difference between 'chúng tôi' and 'chúng ta'?", options: ["Giống nhau", "'Chúng tôi' không gồm người nghe", "'Chúng ta' không gồm người nghe", "Không khác biệt"], answer: 1, explanation: "'Chúng tôi' = exclusive.", explanationEn: "'Chúng tôi' excludes listener." },
          { question: "Đại từ nào thân mật nhất?", questionEn: "Which pronoun is most casual?", options: ["Tôi", "Mình", "Ông", "Họ"], answer: 1, explanation: "'Mình' dùng thân mật.", explanationEn: "'Mình' is casual/intimate." },
        ],
      },
      {
        id: "vn-gram-3",
        title: "Câu hỏi Yes/No và câu hỏi có từ hỏi",
        titleEn: "Yes/No Questions & Wh-Questions",
        level: "beginner",
        theory: `## Câu hỏi tiếng Việt\n\n### Câu hỏi Yes/No:\nThêm **"không"**, **"chưa"**, hoặc **"à"** vào cuối câu.\n- Bạn khỏe **không**?\n- Bạn ăn cơm **chưa**?\n\n### Câu hỏi Wh-:\n- **Ai** = Who | **Gì** = What | **Ở đâu** = Where\n- **Khi nào** = When | **Tại sao** = Why | **Bao nhiêu** = How many`,
        theoryEn: `## Vietnamese Questions\n\n### Yes/No: Add "không", "chưa", or "à" at the end.\n### Wh-Questions: Ai (Who), Gì (What), Ở đâu (Where), Khi nào (When), Tại sao (Why)`,
        vocabulary: [
          { word: "không", meaning: "từ phủ định / từ hỏi", meaningEn: "no / question particle", example: "Bạn có khỏe không?", exampleEn: "Are you well?", partOfSpeech: "particle" },
          { word: "chưa", meaning: "chưa (thời gian)", meaningEn: "not yet / question about completion", example: "Ăn cơm chưa?", exampleEn: "Have you eaten yet?", partOfSpeech: "adverb" },
          { word: "ở đâu", meaning: "hỏi về nơi chốn", meaningEn: "where", example: "Bạn sống ở đâu?", exampleEn: "Where do you live?", partOfSpeech: "interrogative" },
          { word: "tại sao", meaning: "hỏi lý do", meaningEn: "why", example: "Tại sao bạn đến muộn?", exampleEn: "Why are you late?", partOfSpeech: "interrogative" },
          { word: "ai", meaning: "hỏi về người", meaningEn: "who", example: "Ai đang gọi điện?", exampleEn: "Who is calling?", partOfSpeech: "interrogative" },
          { word: "gì", meaning: "hỏi về vật/việc", meaningEn: "what", example: "Bạn muốn ăn gì?", exampleEn: "What do you want to eat?", partOfSpeech: "interrogative" },
          { word: "khi nào", meaning: "hỏi về thời gian", meaningEn: "when", example: "Khi nào bạn đi?", exampleEn: "When will you go?", partOfSpeech: "interrogative" },
          { word: "bao nhiêu", meaning: "hỏi về số lượng", meaningEn: "how many / how much", example: "Cái này bao nhiêu tiền?", exampleEn: "How much is this?", partOfSpeech: "interrogative" },
          { word: "thế nào", meaning: "hỏi về cách thức", meaningEn: "how", example: "Bạn khỏe thế nào?", exampleEn: "How are you?", partOfSpeech: "interrogative" },
          { word: "à", meaning: "từ hỏi cuối câu (nhẹ nhàng)", meaningEn: "question particle (gentle)", example: "Bạn đi à?", exampleEn: "You're going?", partOfSpeech: "particle" },
        ],
        quiz: [
          { question: "Để hỏi Yes/No, thêm gì vào cuối câu?", questionEn: "What to add for Yes/No questions?", options: ["Gì", "Không / Chưa", "Ai", "Sao"], answer: 1, explanation: "Thêm 'không' hoặc 'chưa'.", explanationEn: "Add 'không' or 'chưa' at the end." },
          { question: "'Bao nhiêu' hỏi về gì?", questionEn: "What does 'bao nhiêu' ask about?", options: ["Thời gian", "Nơi chốn", "Số lượng", "Lý do"], answer: 2, explanation: "'Bao nhiêu' hỏi về số lượng.", explanationEn: "'Bao nhiêu' asks about quantity." },
          { question: "'Bạn đi đâu?' hỏi về gì?", questionEn: "What does 'Bạn đi đâu?' ask?", options: ["Thời gian", "Nơi chốn", "Số lượng", "Lý do"], answer: 1, explanation: "'Đâu' = where.", explanationEn: "'Đâu' = where." },
          { question: "'Ăn cơm chưa?' là loại câu hỏi gì?", questionEn: "What type of question?", options: ["Wh-question", "Yes/No", "Câu cảm thán", "Câu mệnh lệnh"], answer: 1, explanation: "Yes/No vì dùng 'chưa'.", explanationEn: "Yes/No because of 'chưa'." },
          { question: "'Thế nào' hỏi về gì?", questionEn: "What does 'thế nào' ask about?", options: ["Người", "Nơi chốn", "Cách thức / trạng thái", "Thời gian"], answer: 2, explanation: "'Thế nào' = how.", explanationEn: "'Thế nào' = how." },
        ],
      },
      {
        id: "vn-gram-4",
        title: "Từ chỉ thời gian (đã, đang, sẽ)",
        titleEn: "Time Markers (Past, Present, Future)",
        level: "beginner",
        theory: `## Thì trong tiếng Việt\n\nTiếng Việt không chia động từ. Thay vào đó dùng **từ chỉ thời gian**.\n\n| Từ | Thì | Ví dụ |\n|----|-----|-------|\n| **đã** | Quá khứ | Tôi **đã** ăn rồi. |\n| **đang** | Hiện tại tiếp diễn | Tôi **đang** học. |\n| **sẽ** | Tương lai | Tôi **sẽ** đi. |\n| **vừa** | Vừa xong | Tôi **vừa** về. |\n| **sắp** | Sắp xảy ra | Trời **sắp** mưa. |`,
        theoryEn: `## Tenses in Vietnamese\n\nVietnamese doesn't conjugate verbs. Use **time markers**: đã (past), đang (present), sẽ (future), vừa (just), sắp (about to).`,
        vocabulary: [
          { word: "đã", meaning: "chỉ quá khứ", meaningEn: "already (past marker)", example: "Tôi đã ăn rồi.", exampleEn: "I already ate.", partOfSpeech: "adverb" },
          { word: "đang", meaning: "chỉ hiện tại tiếp diễn", meaningEn: "currently (present continuous)", example: "Tôi đang học bài.", exampleEn: "I am studying.", partOfSpeech: "adverb" },
          { word: "sẽ", meaning: "chỉ tương lai", meaningEn: "will (future marker)", example: "Ngày mai tôi sẽ đi.", exampleEn: "Tomorrow I will go.", partOfSpeech: "adverb" },
          { word: "sắp", meaning: "sắp xảy ra", meaningEn: "about to", example: "Trời sắp mưa.", exampleEn: "It's about to rain.", partOfSpeech: "adverb" },
          { word: "vừa", meaning: "vừa xong, gần đây", meaningEn: "just (recently)", example: "Tôi vừa về đến nhà.", exampleEn: "I just got home.", partOfSpeech: "adverb" },
          { word: "rồi", meaning: "đã xong", meaningEn: "already / finished", example: "Tôi ăn rồi.", exampleEn: "I already ate.", partOfSpeech: "particle" },
          { word: "hôm qua", meaning: "ngày trước hôm nay", meaningEn: "yesterday", example: "Hôm qua tôi đi chợ.", exampleEn: "Yesterday I went to the market.", partOfSpeech: "noun" },
          { word: "ngày mai", meaning: "ngày sau hôm nay", meaningEn: "tomorrow", example: "Ngày mai tôi sẽ đi.", exampleEn: "Tomorrow I will go.", partOfSpeech: "noun" },
          { word: "bây giờ", meaning: "lúc này", meaningEn: "now", example: "Bây giờ tôi đang bận.", exampleEn: "I'm busy now.", partOfSpeech: "adverb" },
          { word: "từng", meaning: "đã có kinh nghiệm", meaningEn: "ever / have experienced", example: "Tôi từng đến Huế.", exampleEn: "I have been to Hue.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Từ nào chỉ quá khứ?", questionEn: "Which word marks past tense?", options: ["đang", "sẽ", "đã", "sắp"], answer: 2, explanation: "'Đã' chỉ hành động đã xảy ra.", explanationEn: "'Đã' marks past actions." },
          { question: "'Tôi đang học' nghĩa là gì?", questionEn: "What does 'Tôi đang học' mean?", options: ["I studied", "I am studying", "I will study", "I want to study"], answer: 1, explanation: "'Đang' chỉ hành động đang diễn ra.", explanationEn: "'Đang' marks ongoing actions." },
          { question: "'Sắp' chỉ điều gì?", questionEn: "What does 'sắp' indicate?", options: ["Đã xảy ra", "Đang xảy ra", "Sắp xảy ra", "Không xảy ra"], answer: 2, explanation: "'Sắp' = about to happen.", explanationEn: "'Sắp' = about to." },
          { question: "'Tôi vừa về' nghĩa là gì?", questionEn: "What does 'Tôi vừa về' mean?", options: ["I will return", "I just returned", "I am returning", "I want to return"], answer: 1, explanation: "'Vừa' = just now.", explanationEn: "'Vừa' = just." },
          { question: "Từ nào chỉ kinh nghiệm trong quá khứ?", questionEn: "Which marks past experience?", options: ["sẽ", "đang", "từng", "sắp"], answer: 2, explanation: "'Từng' = đã có kinh nghiệm.", explanationEn: "'Từng' = have experienced." },
        ],
      },
      {
        id: "vn-gram-5",
        title: "Số đếm và loại từ",
        titleEn: "Numbers & Classifiers",
        level: "beginner",
        theory: `## Số đếm tiếng Việt\n\n### Số từ 1-10:\n1-một, 2-hai, 3-ba, 4-bốn, 5-năm, 6-sáu, 7-bảy, 8-tám, 9-chín, 10-mười\n\n### Loại từ (Classifiers):\n- **cái** – đồ vật | **con** – động vật\n- **người** – người | **quyển** – sách\n- **tờ** – giấy mỏng | **ly/cốc** – cốc`,
        theoryEn: `## Vietnamese Numbers & Classifiers\n\nNumbers 1-10: một, hai, ba, bốn, năm, sáu, bảy, tám, chín, mười\n\nClassifiers: cái (objects), con (animals), người (people), quyển (books)`,
        vocabulary: [
          { word: "cái", meaning: "loại từ cho đồ vật", meaningEn: "classifier for objects", example: "Hai cái ghế.", exampleEn: "Two chairs.", partOfSpeech: "classifier" },
          { word: "con", meaning: "loại từ cho động vật", meaningEn: "classifier for animals", example: "Ba con chó.", exampleEn: "Three dogs.", partOfSpeech: "classifier" },
          { word: "quyển", meaning: "loại từ cho sách", meaningEn: "classifier for books", example: "Một quyển sách.", exampleEn: "One book.", partOfSpeech: "classifier" },
          { word: "người", meaning: "loại từ cho người", meaningEn: "classifier for people", example: "Bốn người bạn.", exampleEn: "Four friends.", partOfSpeech: "classifier" },
          { word: "tờ", meaning: "loại từ cho giấy mỏng", meaningEn: "classifier for thin flat things", example: "Một tờ giấy.", exampleEn: "A piece of paper.", partOfSpeech: "classifier" },
          { word: "ly", meaning: "loại từ cho cốc", meaningEn: "classifier for glasses/cups", example: "Hai ly nước.", exampleEn: "Two glasses of water.", partOfSpeech: "classifier" },
          { word: "chiếc", meaning: "loại từ cho vật đơn lẻ", meaningEn: "classifier for single items", example: "Một chiếc xe.", exampleEn: "A car.", partOfSpeech: "classifier" },
          { word: "đôi", meaning: "loại từ cho cặp", meaningEn: "classifier for pairs", example: "Một đôi giày.", exampleEn: "A pair of shoes.", partOfSpeech: "classifier" },
          { word: "mười", meaning: "số 10", meaningEn: "ten", example: "Mười người bạn.", exampleEn: "Ten friends.", partOfSpeech: "numeral" },
          { word: "trăm", meaning: "số 100", meaningEn: "hundred", example: "Một trăm đồng.", exampleEn: "One hundred dong.", partOfSpeech: "numeral" },
        ],
        quiz: [
          { question: "Loại từ cho động vật là gì?", questionEn: "What classifier for animals?", options: ["cái", "con", "người", "quyển"], answer: 1, explanation: "'Con' là loại từ cho động vật.", explanationEn: "'Con' is the classifier for animals." },
          { question: "'Ba cái bàn' nghĩa là gì?", questionEn: "What does 'ba cái bàn' mean?", options: ["Two tables", "Three tables", "Four tables", "One table"], answer: 1, explanation: "Ba = 3, cái = classifier, bàn = table.", explanationEn: "Ba = 3, cái = classifier, bàn = table." },
          { question: "'Tờ' dùng cho gì?", questionEn: "What is 'tờ' used for?", options: ["Sách", "Giấy mỏng", "Động vật", "Người"], answer: 1, explanation: "'Tờ' cho vật mỏng phẳng.", explanationEn: "'Tờ' for thin flat objects." },
          { question: "'Một chiếc xe' nghĩa gì?", questionEn: "What does 'một chiếc xe' mean?", options: ["Two cars", "A car", "Many cars", "No car"], answer: 1, explanation: "'Chiếc' = loại từ cho vật đơn lẻ.", explanationEn: "'Chiếc' = single item classifier." },
          { question: "'Đôi' dùng cho gì?", questionEn: "What is 'đôi' used for?", options: ["Vật đơn lẻ", "Cặp đôi", "Nhóm 3", "Đồ ăn"], answer: 1, explanation: "'Đôi' = pair.", explanationEn: "'Đôi' = pair." },
        ],
      },
      {
        id: "vn-gram-21",
        title: "Động từ 'là' và 'có'",
        titleEn: "Verbs 'là' (to be) and 'có' (to have)",
        level: "beginner",
        theory: `## Động từ 'là' và 'có'\n\n### 'Là' = to be (identity):\n- Tôi **là** sinh viên.\n- Đây **là** nhà tôi.\n\n### 'Có' = to have / there is:\n- Tôi **có** 2 anh em.\n- **Có** ai ở nhà không?\n\n### Phủ định:\n- Tôi **không phải là** bác sĩ.\n- Tôi **không có** xe.`,
        theoryEn: `## Verbs 'là' and 'có'\n\n- **là** = to be (identity)\n- **có** = to have / there is\n- Negative: không phải là, không có`,
        vocabulary: [
          { word: "là", meaning: "động từ chỉ danh tính", meaningEn: "to be (identity)", example: "Anh ấy là giáo viên.", exampleEn: "He is a teacher.", partOfSpeech: "verb" },
          { word: "có", meaning: "sở hữu hoặc tồn tại", meaningEn: "to have / there is", example: "Tôi có một con mèo.", exampleEn: "I have a cat.", partOfSpeech: "verb" },
          { word: "không phải", meaning: "phủ định 'là'", meaningEn: "is not", example: "Đây không phải là nhà tôi.", exampleEn: "This is not my house.", partOfSpeech: "phrase" },
          { word: "đây", meaning: "nơi này / cái này", meaningEn: "here / this", example: "Đây là bạn tôi.", exampleEn: "This is my friend.", partOfSpeech: "pronoun" },
          { word: "sinh viên", meaning: "người học đại học", meaningEn: "university student", example: "Tôi là sinh viên năm 2.", exampleEn: "I'm a 2nd-year student.", partOfSpeech: "noun" },
          { word: "bác sĩ", meaning: "người chữa bệnh", meaningEn: "doctor", example: "Bố tôi là bác sĩ.", exampleEn: "My father is a doctor.", partOfSpeech: "noun" },
          { word: "giáo viên", meaning: "thầy cô giáo", meaningEn: "teacher", example: "Cô ấy là giáo viên.", exampleEn: "She is a teacher.", partOfSpeech: "noun" },
          { word: "mèo", meaning: "con mèo", meaningEn: "cat", example: "Con mèo rất dễ thương.", exampleEn: "The cat is very cute.", partOfSpeech: "noun" },
          { word: "xe", meaning: "phương tiện di chuyển", meaningEn: "vehicle / car", example: "Tôi không có xe.", exampleEn: "I don't have a car.", partOfSpeech: "noun" },
          { word: "nhà", meaning: "nơi ở", meaningEn: "house / home", example: "Nhà tôi rất đẹp.", exampleEn: "My house is very nice.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phủ định của 'là' dùng gì?", questionEn: "How to negate 'là'?", options: ["Không là", "Không phải là", "Chưa là", "Đừng là"], answer: 1, explanation: "'Không phải là' = is not.", explanationEn: "'Không phải là' = is not." },
          { question: "'Có ai không?' hỏi gì?", questionEn: "What does 'Có ai không?' ask?", options: ["What time", "Is anyone there?", "When", "Why"], answer: 1, explanation: "Hỏi có người nào không.", explanationEn: "Asks if anyone is there." },
          { question: "'Tôi là sinh viên' – 'là' nghĩa gì?", questionEn: "What does 'là' mean here?", options: ["have", "am / is", "go", "want"], answer: 1, explanation: "'Là' = to be.", explanationEn: "'Là' = to be." },
          { question: "'Có' trong 'Có wifi không?' nghĩa gì?", questionEn: "What does 'có' mean in 'Có wifi không?'?", options: ["Want", "Is there", "Need", "Like"], answer: 1, explanation: "'Có' = there is / is there.", explanationEn: "'Có' = there is." },
          { question: "'Không có' nghĩa là gì?", questionEn: "What does 'không có' mean?", options: ["Have", "Don't have", "Want", "Need"], answer: 1, explanation: "'Không có' = don't have.", explanationEn: "'Không có' = don't have." },
        ],
      },
      {
        id: "vn-gram-22",
        title: "Trạng từ chỉ tần suất",
        titleEn: "Frequency Adverbs",
        level: "beginner",
        theory: `## Trạng từ chỉ tần suất\n\n- **luôn luôn** = always\n- **thường / hay** = often/usually\n- **thỉnh thoảng** = sometimes\n- **hiếm khi** = rarely\n- **không bao giờ** = never\n\n### Vị trí: Đứng **trước** động từ.`,
        theoryEn: `## Frequency Adverbs\n\nPosition: Before the verb.`,
        vocabulary: [
          { word: "thường", meaning: "hay làm, nhiều lần", meaningEn: "often / usually", example: "Tôi thường uống trà.", exampleEn: "I usually drink tea.", partOfSpeech: "adverb" },
          { word: "thỉnh thoảng", meaning: "đôi khi", meaningEn: "sometimes", example: "Thỉnh thoảng tôi đi biển.", exampleEn: "Sometimes I go to the beach.", partOfSpeech: "adverb" },
          { word: "hiếm khi", meaning: "rất ít khi", meaningEn: "rarely", example: "Hiếm khi trời tuyết ở VN.", exampleEn: "It rarely snows in Vietnam.", partOfSpeech: "adverb" },
          { word: "luôn luôn", meaning: "lúc nào cũng", meaningEn: "always", example: "Tôi luôn luôn dậy sớm.", exampleEn: "I always wake up early.", partOfSpeech: "adverb" },
          { word: "hay", meaning: "thường xuyên", meaningEn: "often (colloquial)", example: "Tôi hay đi bộ.", exampleEn: "I often walk.", partOfSpeech: "adverb" },
          { word: "không bao giờ", meaning: "chẳng bao giờ", meaningEn: "never", example: "Tôi không bao giờ hút thuốc.", exampleEn: "I never smoke.", partOfSpeech: "adverb" },
          { word: "đôi khi", meaning: "thỉnh thoảng", meaningEn: "sometimes", example: "Đôi khi tôi nấu ăn.", exampleEn: "Sometimes I cook.", partOfSpeech: "adverb" },
          { word: "ít khi", meaning: "hiếm khi", meaningEn: "seldom", example: "Ít khi tôi ăn tối muộn.", exampleEn: "I seldom eat dinner late.", partOfSpeech: "adverb" },
          { word: "hàng ngày", meaning: "mỗi ngày", meaningEn: "daily", example: "Tôi tập thể dục hàng ngày.", exampleEn: "I exercise daily.", partOfSpeech: "adverb" },
          { word: "thường xuyên", meaning: "rất hay", meaningEn: "frequently", example: "Anh ấy thường xuyên đi công tác.", exampleEn: "He frequently travels for work.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Trạng từ tần suất đứng ở đâu?", questionEn: "Where do frequency adverbs go?", options: ["Sau động từ", "Trước động từ", "Cuối câu", "Đầu câu"], answer: 1, explanation: "Đứng trước động từ.", explanationEn: "Before the verb." },
          { question: "'Không bao giờ' nghĩa là gì?", questionEn: "What does 'không bao giờ' mean?", options: ["Always", "Sometimes", "Never", "Often"], answer: 2, explanation: "'Không bao giờ' = never.", explanationEn: "'Không bao giờ' = never." },
          { question: "'Hay' trong 'Tôi hay đi bộ' nghĩa gì?", questionEn: "What does 'hay' mean here?", options: ["Good", "Often", "Or", "Like"], answer: 1, explanation: "'Hay' = often (khẩu ngữ).", explanationEn: "'Hay' = often (colloquial)." },
          { question: "Từ nào chỉ mức thường xuyên cao nhất?", questionEn: "Which word has the highest frequency?", options: ["Thỉnh thoảng", "Hiếm khi", "Luôn luôn", "Đôi khi"], answer: 2, explanation: "'Luôn luôn' = always.", explanationEn: "'Luôn luôn' = always." },
          { question: "'Thỉnh thoảng' và 'đôi khi' khác nhau không?", questionEn: "Are they different?", options: ["Rất khác", "Gần giống nhau", "'Đôi khi' thường hơn", "'Thỉnh thoảng' hiếm hơn"], answer: 1, explanation: "Gần đồng nghĩa = sometimes.", explanationEn: "Nearly synonymous = sometimes." },
        ],
      },
      {
        id: "vn-gram-23",
        title: "Chỉ từ: này, kia, đó, đây",
        titleEn: "Demonstratives: this, that",
        level: "beginner",
        theory: `## Chỉ từ\n\n### Gần:\n- **đây** = here | **này** = this\n\n### Xa:\n- **đó / kia** = there/that | **đấy** = there (informal)\n\n### Vị trí: Đứng **sau** danh từ.`,
        theoryEn: `## Demonstratives\n\nNear: đây/này. Far: đó/kia. Position: AFTER the noun.`,
        vocabulary: [
          { word: "này", meaning: "chỉ vật gần", meaningEn: "this", example: "Cái này bao nhiêu?", exampleEn: "How much is this?", partOfSpeech: "demonstrative" },
          { word: "kia", meaning: "chỉ vật xa", meaningEn: "that (far)", example: "Ngọn núi kia cao lắm.", exampleEn: "That mountain is very tall.", partOfSpeech: "demonstrative" },
          { word: "đây", meaning: "nơi này", meaningEn: "here", example: "Tôi ở đây.", exampleEn: "I am here.", partOfSpeech: "adverb" },
          { word: "đó", meaning: "chỉ vật xa vừa", meaningEn: "that / there", example: "Cái đó đẹp.", exampleEn: "That one is beautiful.", partOfSpeech: "demonstrative" },
          { word: "đấy", meaning: "đó (thân mật)", meaningEn: "there (informal)", example: "Ai đấy?", exampleEn: "Who's there?", partOfSpeech: "demonstrative" },
          { word: "nơi", meaning: "chỗ, địa điểm", meaningEn: "place", example: "Nơi này rất đẹp.", exampleEn: "This place is very beautiful.", partOfSpeech: "noun" },
          { word: "bên", meaning: "phía", meaningEn: "side", example: "Bên này hay bên kia?", exampleEn: "This side or that side?", partOfSpeech: "noun" },
          { word: "phía", meaning: "hướng", meaningEn: "direction / side", example: "Phía đó có công viên.", exampleEn: "There's a park on that side.", partOfSpeech: "noun" },
          { word: "chỗ", meaning: "nơi, vị trí", meaningEn: "spot / place", example: "Chỗ này có ai ngồi không?", exampleEn: "Is anyone sitting here?", partOfSpeech: "noun" },
          { word: "gần", meaning: "không xa", meaningEn: "near / close", example: "Nhà tôi gần đây.", exampleEn: "My house is nearby.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Này' đứng ở đâu so với danh từ?", questionEn: "Where does 'này' go relative to noun?", options: ["Trước", "Sau", "Cả hai", "Tùy ý"], answer: 1, explanation: "Đứng sau: cái này, người này.", explanationEn: "After: cái này, người này." },
          { question: "'Đây' và 'đó' khác nhau thế nào?", questionEn: "How are 'đây' and 'đó' different?", options: ["Giống nhau", "'Đây' gần, 'đó' xa", "'Đó' gần, 'đây' xa", "Không khác"], answer: 1, explanation: "'Đây' = gần, 'đó' = xa hơn.", explanationEn: "'Đây' = near, 'đó' = far." },
          { question: "'Cái kia' nghĩa là gì?", questionEn: "What does 'cái kia' mean?", options: ["This one", "That one (far)", "Every one", "No one"], answer: 1, explanation: "'Kia' = xa.", explanationEn: "'Kia' = far away." },
          { question: "'Ai đấy?' nghĩa gì?", questionEn: "What does 'Ai đấy?' mean?", options: ["Where?", "Who's there?", "What?", "When?"], answer: 1, explanation: "'Đấy' = informal 'đó'.", explanationEn: "'Đấy' = informal 'there'." },
          { question: "Chỉ từ nào dùng cho vật ở gần nhất?", questionEn: "Which demonstrative for nearest things?", options: ["kia", "đó", "này / đây", "đấy"], answer: 2, explanation: "'Này/đây' = gần nhất.", explanationEn: "'Này/đây' = nearest." },
        ],
      },
      {
        id: "vn-gram-24",
        title: "Cách dùng 'rất', 'lắm', 'quá'",
        titleEn: "Degree Words: very, so, too",
        level: "beginner",
        theory: `## Từ chỉ mức độ: rất, lắm, quá, hơi, khá, cực kỳ

Người Việt dùng nhiều từ để nói **mức độ** của tính từ. Khác biệt chính là **vị trí** và **sắc thái**.

### Bảng so sánh nhanh

| Từ | Vị trí | Sắc thái | Ví dụ |
|----|--------|----------|-------|
| **rất** | TRƯỚC tính từ | trung tính, lịch sự | Cô ấy **rất** xinh. |
| **lắm** | SAU tính từ | thân mật, nhấn mạnh | Ngon **lắm**! |
| **quá** | SAU tính từ | cảm thán, bất ngờ | Nóng **quá**! |
| **hơi** | TRƯỚC tính từ | nhẹ, một chút | **Hơi** lạnh. |
| **khá** | TRƯỚC tính từ | tương đối | **Khá** tốt. |
| **cực kỳ** | TRƯỚC tính từ | rất mạnh | **Cực kỳ** khó. |

### Ví dụ minh họa

- Phở này **rất** ngon. *(This pho is very tasty.)*
- Phở này ngon **lắm**! *(This pho is sooo tasty - bạn bè nói với nhau)*
- Phở này ngon **quá**! *(Wow, so tasty! - cảm thán ngay khi nếm)*
- Hôm nay **hơi** mệt. *(I feel a bit tired today.)*
- Bài tập **khá** khó. *(The homework is fairly hard.)*
- Đề thi **cực kỳ** khó. *(The exam is extremely hard.)*

### Thang mức độ

**hơi** < **khá** < **rất / lắm / quá** < **cực kỳ / vô cùng**

### Lỗi thường gặp

- ❌ Cô ấy xinh **rất**. → ✅ Cô ấy **rất** xinh.
- ❌ **Lắm** ngon. → ✅ Ngon **lắm**.`,
        theoryEn: `## Degree Words: rất, lắm, quá, hơi, khá, cực kỳ

Vietnamese uses different words to express the **degree** of an adjective. The main differences are **position** and **nuance**.

### Quick comparison

| Word | Position | Nuance | Example |
|------|----------|--------|---------|
| **rất** | BEFORE adj | neutral, polite | Cô ấy **rất** xinh. (very pretty) |
| **lắm** | AFTER adj | casual, emphatic | Ngon **lắm**! (very tasty) |
| **quá** | AFTER adj | exclamatory, surprised | Nóng **quá**! (so hot!) |
| **hơi** | BEFORE adj | a little, mild | **Hơi** lạnh. (a bit cold) |
| **khá** | BEFORE adj | fairly, quite | **Khá** tốt. (quite good) |
| **cực kỳ** | BEFORE adj | extremely | **Cực kỳ** khó. (extremely hard) |

### Illustrative examples

- This pho is **rất** ngon (very tasty) — neutral, polite.
- This pho is ngon **lắm**! — casual, said to friends.
- This pho is ngon **quá**! — wow, said right after tasting.
- I'm **hơi** mệt today. (a bit tired)
- The homework is **khá** khó. (fairly hard)
- The test is **cực kỳ** khó. (extremely hard)

### Intensity scale

**hơi** < **khá** < **rất / lắm / quá** < **cực kỳ / vô cùng**

### Common mistakes

- ❌ Cô ấy xinh **rất**. → ✅ Cô ấy **rất** xinh.
- ❌ **Lắm** ngon. → ✅ Ngon **lắm**.`,
        vocabulary: [
          { word: "rất", meaning: "mức độ cao", meaningEn: "very", example: "Cô ấy rất xinh.", exampleEn: "She is very pretty.", partOfSpeech: "adverb" },
          { word: "lắm", meaning: "nhấn mạnh mức độ", meaningEn: "very (emphatic)", example: "Ngon lắm!", exampleEn: "Very delicious!", partOfSpeech: "adverb" },
          { word: "quá", meaning: "cảm thán", meaningEn: "so / too much", example: "Nóng quá!", exampleEn: "So hot!", partOfSpeech: "adverb" },
          { word: "cực kỳ", meaning: "rất rất", meaningEn: "extremely", example: "Cực kỳ khó.", exampleEn: "Extremely difficult.", partOfSpeech: "adverb" },
          { word: "hơi", meaning: "một chút", meaningEn: "a bit / slightly", example: "Hơi lạnh.", exampleEn: "A bit cold.", partOfSpeech: "adverb" },
          { word: "khá", meaning: "tương đối", meaningEn: "quite / fairly", example: "Khá tốt.", exampleEn: "Quite good.", partOfSpeech: "adverb" },
          { word: "xinh", meaning: "đẹp (nữ)", meaningEn: "pretty", example: "Cô ấy rất xinh.", exampleEn: "She is very pretty.", partOfSpeech: "adjective" },
          { word: "ngon", meaning: "có vị tốt", meaningEn: "delicious", example: "Món này ngon lắm!", exampleEn: "This dish is very delicious!", partOfSpeech: "adjective" },
          { word: "nóng", meaning: "nhiệt độ cao", meaningEn: "hot", example: "Trời nóng quá!", exampleEn: "It's so hot!", partOfSpeech: "adjective" },
          { word: "khó", meaning: "không dễ", meaningEn: "difficult", example: "Bài này khá khó.", exampleEn: "This exercise is quite hard.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Rất' đứng ở đâu?", questionEn: "Where does 'rất' go?", options: ["Sau tính từ", "Trước tính từ", "Cuối câu", "Đầu câu"], answer: 1, explanation: "Rất + tính từ: rất đẹp.", explanationEn: "Rất + adjective." },
          { question: "'Lắm' đứng ở đâu?", questionEn: "Where does 'lắm' go?", options: ["Trước tính từ", "Sau tính từ", "Đầu câu", "Giữa câu"], answer: 1, explanation: "Tính từ + lắm: ngon lắm.", explanationEn: "Adjective + lắm." },
          { question: "'Hơi' chỉ mức độ gì?", questionEn: "What level does 'hơi' indicate?", options: ["Rất cao", "Nhẹ / một chút", "Cực kỳ", "Trung bình"], answer: 1, explanation: "'Hơi' = a bit.", explanationEn: "'Hơi' = slightly." },
          { question: "Sắp xếp từ yếu đến mạnh: hơi, rất, cực kỳ", questionEn: "Order weak to strong:", options: ["rất, hơi, cực kỳ", "cực kỳ, rất, hơi", "hơi, rất, cực kỳ", "hơi, cực kỳ, rất"], answer: 2, explanation: "hơi < rất < cực kỳ.", explanationEn: "hơi < rất < cực kỳ." },
          { question: "'Quá' thể hiện cảm xúc gì?", questionEn: "What does 'quá' express?", options: ["Bình thường", "Cảm thán / ngạc nhiên", "Phủ định", "Câu hỏi"], answer: 1, explanation: "'Quá' = exclamatory.", explanationEn: "'Quá' = exclamatory." },
        ],
      },
      {
        id: "vn-gram-25",
        title: "Cách nói 'muốn', 'cần', 'phải'",
        titleEn: "Want, Need, Must",
        level: "beginner",
        theory: `## Động từ tình thái: muốn, cần, phải, nên, có thể, được

Động từ tình thái đứng **trước động từ chính** để diễn tả mong muốn, khả năng, nghĩa vụ.

**Cấu trúc**: Chủ ngữ + [tình thái] + Động từ chính

### Bảng nghĩa và mức độ

| Từ | Nghĩa | Mức độ | Ví dụ |
|----|-------|--------|-------|
| **muốn** | want | mong muốn | Tôi **muốn** ăn phở. |
| **thích** | like | sở thích | Tôi **thích** đọc sách. |
| **định** | plan to | dự định | Tôi **định** đi Đà Lạt. |
| **cần** | need | cần thiết | Tôi **cần** nghỉ ngơi. |
| **nên** | should | lời khuyên | Bạn **nên** uống nước. |
| **phải** | must / have to | bắt buộc | Tôi **phải** đi làm. |
| **có thể** | can / may | khả năng | Tôi **có thể** nói tiếng Việt. |
| **được** | allowed / can | sự cho phép | Ở đây **được** chụp ảnh không? |

### Ví dụ tình huống

- **Mong muốn**: "Tôi **muốn** học tiếng Việt."
- **Dự định**: "Cuối tuần này tôi **định** đi Hội An."
- **Khuyên nhủ**: "Trời lạnh, bạn **nên** mặc áo ấm."
- **Bắt buộc**: "Ở Việt Nam, người đi xe máy **phải** đội mũ bảo hiểm."
- **Khả năng**: "Tôi **có thể** đến lúc 7 giờ."
- **Xin phép**: "Em **được** vào không ạ?"

### Phủ định

- **không muốn / không thích / không cần / không nên / không phải / không thể**
- Ví dụ: Tôi **không thể** ăn cay. / Bạn **không nên** thức khuya.

### Mẹo phân biệt

- **nên** = lời khuyên nhẹ (should). **phải** = nghĩa vụ mạnh (must).
- **muốn** = ý muốn cá nhân. **định** = đã có kế hoạch.`,
        theoryEn: `## Modal Verbs: muốn, cần, phải, nên, có thể, được

Modal verbs go **before the main verb** to express desire, ability, or obligation.

**Structure**: Subject + [modal] + main verb

### Meanings & strength

| Word | Meaning | Strength | Example |
|------|---------|----------|---------|
| **muốn** | want | desire | Tôi **muốn** ăn phở. (I want to eat pho) |
| **thích** | like | preference | Tôi **thích** đọc sách. (I like reading) |
| **định** | plan to | intention | Tôi **định** đi Đà Lạt. (I plan to go to Da Lat) |
| **cần** | need | necessity | Tôi **cần** nghỉ ngơi. (I need to rest) |
| **nên** | should | advice | Bạn **nên** uống nước. (You should drink water) |
| **phải** | must / have to | strong obligation | Tôi **phải** đi làm. (I must go to work) |
| **có thể** | can / may | ability | Tôi **có thể** nói tiếng Việt. (I can speak Vietnamese) |
| **được** | be allowed | permission | Ở đây **được** chụp ảnh không? (Is photography allowed here?) |

### Situational examples

- Desire: "I **muốn** learn Vietnamese."
- Plan: "This weekend I **định** go to Hoi An."
- Advice: "It's cold, you **nên** wear a warm jacket."
- Obligation: "In Vietnam, motorbike riders **phải** wear a helmet."
- Ability: "I **có thể** arrive at 7."
- Permission: "May I (**được**) come in?"

### Negation

- **không muốn / không thích / không cần / không nên / không phải / không thể**
- Examples: Tôi **không thể** ăn cay. (I can't eat spicy) / Bạn **không nên** thức khuya. (You shouldn't stay up late)

### Tip

- **nên** = soft advice (should). **phải** = strong obligation (must).
- **muốn** = personal wish. **định** = planned intention.`,
        vocabulary: [
          { word: "muốn", meaning: "mong ước", meaningEn: "to want", example: "Tôi muốn đi du lịch.", exampleEn: "I want to travel.", partOfSpeech: "verb" },
          { word: "cần", meaning: "cần thiết", meaningEn: "to need", example: "Cần học bài.", exampleEn: "Need to study.", partOfSpeech: "verb" },
          { word: "phải", meaning: "bắt buộc", meaningEn: "must / have to", example: "Phải đúng giờ.", exampleEn: "Must be on time.", partOfSpeech: "verb" },
          { word: "có thể", meaning: "khả năng", meaningEn: "can / may", example: "Tôi có thể giúp bạn.", exampleEn: "I can help you.", partOfSpeech: "phrase" },
          { word: "nên", meaning: "khuyên nên", meaningEn: "should", example: "Bạn nên nghỉ ngơi.", exampleEn: "You should rest.", partOfSpeech: "verb" },
          { word: "được", meaning: "được phép", meaningEn: "allowed to / can", example: "Ở đây không được hút thuốc.", exampleEn: "Smoking is not allowed here.", partOfSpeech: "verb" },
          { word: "thích", meaning: "ưa thích", meaningEn: "to like", example: "Tôi thích ăn phở.", exampleEn: "I like to eat pho.", partOfSpeech: "verb" },
          { word: "định", meaning: "dự định", meaningEn: "to plan / intend", example: "Tôi định đi Đà Lạt.", exampleEn: "I plan to go to Da Lat.", partOfSpeech: "verb" },
          { word: "dám", meaning: "có can đảm", meaningEn: "to dare", example: "Ai dám nói?", exampleEn: "Who dares to speak?", partOfSpeech: "verb" },
          { word: "chịu", meaning: "chấp nhận", meaningEn: "to accept / endure", example: "Tôi không chịu được nóng.", exampleEn: "I can't stand the heat.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Phải' mang nghĩa gì?", questionEn: "What does 'phải' mean?", options: ["Want", "Can", "Must", "Should"], answer: 2, explanation: "'Phải' = must/have to.", explanationEn: "'Phải' = must." },
          { question: "'Nên' dùng khi nào?", questionEn: "When to use 'nên'?", options: ["Bắt buộc", "Khuyên nhủ", "Cấm", "Hỏi"], answer: 1, explanation: "'Nên' = should (khuyên nhủ).", explanationEn: "'Nên' = should (advice)." },
          { question: "'Có thể' nghĩa là gì?", questionEn: "What does 'có thể' mean?", options: ["Must", "Want", "Can / May", "Need"], answer: 2, explanation: "'Có thể' = can/may.", explanationEn: "'Có thể' = can/may." },
          { question: "'Định' trong 'Tôi định đi' nghĩa gì?", questionEn: "What does 'định' mean?", options: ["Must go", "Plan to go", "Can go", "Want to go"], answer: 1, explanation: "'Định' = plan/intend.", explanationEn: "'Định' = plan to." },
          { question: "Từ nào chỉ sự bắt buộc mạnh nhất?", questionEn: "Which word shows strongest obligation?", options: ["nên", "muốn", "phải", "có thể"], answer: 2, explanation: "'Phải' = bắt buộc.", explanationEn: "'Phải' = must (obligatory)." },
        ],
      },
    ],
  },
  {
    id: "vn-grammar-intermediate",
    title: "Ngữ pháp trung cấp",
    titleEn: "Intermediate Grammar",
    icon: "✍️",
    color: "from-orange-500 to-amber-500",
    description: "Cấu trúc nâng cao: so sánh, câu bị động, liên từ",
    descriptionEn: "Advanced structures: comparisons, passive voice, conjunctions",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-6", title: "Câu so sánh", titleEn: "Comparisons", level: "intermediate",
        theory: `## So sánh trong tiếng Việt

Có **3 loại so sánh** chính: ngang bằng, hơn (kém), và nhất.

### 1. So sánh ngang bằng — A **như / bằng** B

- Cô ấy đẹp **như** hoa. *(She is as beautiful as a flower.)*
- Anh tôi cao **bằng** tôi. *(My brother is as tall as me.)*
- Nhà này lớn **bằng** nhà kia. *(This house is as big as that one.)*

### 2. So sánh hơn — A **hơn** B / A **kém** B

- Anh ấy cao **hơn** tôi. *(He is taller than me.)*
- Phở Hà Nội ngon **hơn** phở Sài Gòn (theo tôi). *(Hanoi pho is tastier - in my opinion.)*
- Em **kém** anh 3 tuổi. *(I am 3 years younger than my brother.)*

**Thêm mức độ**: dùng **hơn nhiều** (much more), **hơn một chút** (a little more):
- Xe này đắt **hơn nhiều**. / Hôm nay nóng **hơn một chút**.

### 3. So sánh nhất — A + tính từ + **nhất**

- Đây là món ngon **nhất**. *(This is the most delicious dish.)*
- Hà Nội là thủ đô đẹp **nhất**. *(Hanoi is the most beautiful capital.)*
- Cô ấy hát hay **nhất** lớp. *(She sings the best in the class.)*

### Mẫu đối lập

| Cao - Thấp | Đắt - Rẻ | Giỏi - Kém |
|-----------|----------|------------|
| Anh cao **hơn** em. | Áo đắt **hơn** quần. | Tôi giỏi tiếng Anh **hơn** tiếng Pháp. |

### Lỗi thường gặp
- ❌ Anh ấy **hơn cao** tôi. → ✅ Anh ấy **cao hơn** tôi.
- ❌ Đây là **nhất ngon** món. → ✅ Đây là món **ngon nhất**.`,
        theoryEn: `## Comparisons in Vietnamese

There are **3 main types** of comparison: equal, more/less, and superlative.

### 1. Equal comparison — A **như / bằng** B

- Cô ấy đẹp **như** hoa. (She is as beautiful as a flower.)
- Anh tôi cao **bằng** tôi. (My brother is as tall as I am.)
- Nhà này lớn **bằng** nhà kia. (This house is as big as that one.)

### 2. More / less — A **hơn** B / A **kém** B

- Anh ấy cao **hơn** tôi. (He is taller than me.)
- Phở Hà Nội ngon **hơn** phở Sài Gòn. (Hanoi pho is tastier than Saigon pho.)
- Em **kém** anh 3 tuổi. (I'm 3 years younger than my brother.)

Add intensity with **hơn nhiều** (much more) or **hơn một chút** (a little more):
- Xe này đắt **hơn nhiều**. / Hôm nay nóng **hơn một chút**.

### 3. Superlative — A + adjective + **nhất**

- Đây là món ngon **nhất**. (This is the most delicious dish.)
- Hà Nội là thủ đô đẹp **nhất**. (Hanoi is the most beautiful capital.)
- Cô ấy hát hay **nhất** lớp. (She sings best in the class.)

### Common mistakes

- ❌ Anh ấy **hơn cao** tôi. → ✅ Anh ấy **cao hơn** tôi.
- ❌ Đây là **nhất ngon** món. → ✅ Đây là món **ngon nhất**.`,
        vocabulary: [
          { word: "hơn", meaning: "hơn (so sánh)", meaningEn: "more than", example: "Anh cao hơn em.", exampleEn: "He is taller than her.", partOfSpeech: "adverb" },
          { word: "nhất", meaning: "nhất (so sánh nhất)", meaningEn: "the most", example: "Đây là món ngon nhất.", exampleEn: "This is the most delicious dish.", partOfSpeech: "adverb" },
          { word: "như", meaning: "giống như", meaningEn: "like / as", example: "Cô ấy đẹp như hoa.", exampleEn: "She is beautiful like a flower.", partOfSpeech: "conjunction" },
          { word: "bằng", meaning: "bằng, ngang", meaningEn: "equal to", example: "Nhà này lớn bằng nhà kia.", exampleEn: "This house is as big as that one.", partOfSpeech: "preposition" },
          { word: "kém", meaning: "ít hơn", meaningEn: "less than", example: "Em kém anh 3 tuổi.", exampleEn: "She is 3 years younger.", partOfSpeech: "adverb" },
          { word: "cao", meaning: "chiều cao lớn", meaningEn: "tall / high", example: "Anh ấy rất cao.", exampleEn: "He is very tall.", partOfSpeech: "adjective" },
          { word: "thấp", meaning: "chiều cao nhỏ", meaningEn: "short / low", example: "Cây này thấp hơn.", exampleEn: "This tree is shorter.", partOfSpeech: "adjective" },
          { word: "giống", meaning: "tương tự", meaningEn: "similar / same", example: "Hai chị em giống nhau.", exampleEn: "The two sisters look alike.", partOfSpeech: "adjective" },
          { word: "khác", meaning: "không giống", meaningEn: "different", example: "Cái này khác cái kia.", exampleEn: "This one is different from that.", partOfSpeech: "adjective" },
          { word: "hơn nhiều", meaning: "hơn rất nhiều", meaningEn: "much more", example: "Xe này đắt hơn nhiều.", exampleEn: "This car is much more expensive.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Anh cao hơn tôi' dùng cấu trúc gì?", questionEn: "What structure?", options: ["So sánh bằng", "So sánh hơn", "So sánh nhất", "Phủ định"], answer: 1, explanation: "Dùng 'hơn' = so sánh hơn.", explanationEn: "Uses 'hơn' = comparative." },
          { question: "'Đẹp nhất' là loại so sánh gì?", questionEn: "What type of comparison?", options: ["Ngang bằng", "Hơn", "Nhất (superlative)", "Kém"], answer: 2, explanation: "'Nhất' = superlative.", explanationEn: "'Nhất' = superlative." },
          { question: "'Như' dùng trong so sánh gì?", questionEn: "What comparison uses 'như'?", options: ["Hơn", "Nhất", "Ngang bằng", "Kém"], answer: 2, explanation: "A như B = A giống B.", explanationEn: "A like B = equal comparison." },
          { question: "'Kém' nghĩa gì trong so sánh?", questionEn: "What does 'kém' mean?", options: ["More", "Equal", "Less than", "The most"], answer: 2, explanation: "'Kém' = less than.", explanationEn: "'Kém' = less than." },
          { question: "'Giống nhau' nghĩa là gì?", questionEn: "What does 'giống nhau' mean?", options: ["Different", "Similar / alike", "Better", "Worse"], answer: 1, explanation: "'Giống nhau' = similar.", explanationEn: "'Giống nhau' = similar." },
        ],
      },
      {
        id: "vn-gram-7", title: "Giới từ chỉ nơi chốn và thời gian", titleEn: "Prepositions of Place & Time", level: "intermediate",
        theory: `## Giới từ chỉ nơi chốn và thời gian

Giới từ đứng **trước danh từ** để chỉ vị trí hoặc thời điểm.

### 1. Giới từ chỉ nơi chốn

| Giới từ | Nghĩa | Ví dụ |
|--------|--------|-------|
| **ở** | at / in | Tôi **ở** Hà Nội. |
| **trên** | on / above | Sách **trên** bàn. |
| **dưới** | under / below | Mèo **dưới** ghế. |
| **trong** | inside | Nước **trong** ly. |
| **ngoài** | outside | Trẻ con chơi **ngoài** sân. |
| **bên cạnh** | next to | Bưu điện **bên cạnh** ngân hàng. |
| **giữa** | between / middle | Em ngồi **giữa** bố và mẹ. |
| **trước / sau** | in front of / behind | Đứng **trước** cửa. |

### 2. Giới từ chỉ thời gian

| Giới từ | Nghĩa | Ví dụ |
|--------|--------|-------|
| **vào** | at / on (time) | Họp **vào** lúc 8 giờ. / **Vào** thứ Hai. |
| **từ … đến** | from … to | Làm việc **từ** 9 **đến** 17 giờ. |
| **trước** | before | **Trước** khi ăn, rửa tay. |
| **sau** | after | **Sau** giờ học, em đi bơi. |
| **trong** | during / within | **Trong** 1 tuần. |

### Ví dụ minh họa

- Quyển sách **ở trên** bàn, **bên cạnh** ly cà phê.
- Tôi sống **ở** Hà Nội, **trong** một căn hộ nhỏ.
- Chúng tôi gặp nhau **vào** 7 giờ tối, **trước** quán cà phê.
- **Từ** thứ Hai **đến** thứ Sáu tôi đi làm.

### Lưu ý

- **trước / sau** dùng được cho cả nơi chốn và thời gian.
- Người Việt thường nói **ở trên / ở dưới / ở trong** (ghép **ở** + giới từ) để rõ nghĩa hơn.`,
        theoryEn: `## Prepositions of Place & Time

Prepositions go **before nouns** to indicate location or time.

### 1. Place prepositions

| Prep | Meaning | Example |
|------|---------|---------|
| **ở** | at / in | Tôi **ở** Hà Nội. (I'm in Hanoi) |
| **trên** | on / above | Sách **trên** bàn. (Book on the table) |
| **dưới** | under | Mèo **dưới** ghế. (Cat under the chair) |
| **trong** | inside | Nước **trong** ly. (Water in the glass) |
| **ngoài** | outside | Trẻ con chơi **ngoài** sân. (Kids play outside) |
| **bên cạnh** | next to | Bưu điện **bên cạnh** ngân hàng. |
| **giữa** | between | Em ngồi **giữa** bố và mẹ. |
| **trước / sau** | in front of / behind | Đứng **trước** cửa. |

### 2. Time prepositions

| Prep | Meaning | Example |
|------|---------|---------|
| **vào** | at / on | Họp **vào** lúc 8 giờ. / **Vào** thứ Hai. |
| **từ … đến** | from … to | **Từ** 9 **đến** 17 giờ. |
| **trước** | before | **Trước** khi ăn, rửa tay. |
| **sau** | after | **Sau** giờ học, em đi bơi. |
| **trong** | during | **Trong** 1 tuần. |

### Illustrative examples

- The book is **on** the table, **next to** the coffee cup.
- I live **in** Hanoi, **in** a small apartment.
- We meet **at** 7 PM, **in front of** the cafe.
- **From** Monday **to** Friday, I work.

### Notes

- **trước / sau** can refer to both place and time.
- Vietnamese often combines **ở** + preposition (ở trên, ở dưới, ở trong) for clarity.`,
        vocabulary: [
          { word: "trên", meaning: "phía trên", meaningEn: "on / above", example: "Sách trên bàn.", exampleEn: "Book on the table.", partOfSpeech: "preposition" },
          { word: "dưới", meaning: "phía dưới", meaningEn: "under / below", example: "Mèo dưới ghế.", exampleEn: "Cat under the chair.", partOfSpeech: "preposition" },
          { word: "trong", meaning: "bên trong", meaningEn: "inside", example: "Nước trong ly.", exampleEn: "Water in the glass.", partOfSpeech: "preposition" },
          { word: "bên cạnh", meaning: "ở cạnh", meaningEn: "beside", example: "Ngồi bên cạnh tôi.", exampleEn: "Sit beside me.", partOfSpeech: "preposition" },
          { word: "ở", meaning: "tại, nơi", meaningEn: "at / in (location)", example: "Tôi ở nhà.", exampleEn: "I'm at home.", partOfSpeech: "preposition" },
          { word: "ngoài", meaning: "bên ngoài", meaningEn: "outside", example: "Đi ra ngoài.", exampleEn: "Go outside.", partOfSpeech: "preposition" },
          { word: "trước", meaning: "phía trước / trước khi", meaningEn: "in front of / before", example: "Đứng trước cửa.", exampleEn: "Stand in front of the door.", partOfSpeech: "preposition" },
          { word: "sau", meaning: "phía sau / sau khi", meaningEn: "behind / after", example: "Sau giờ học.", exampleEn: "After class.", partOfSpeech: "preposition" },
          { word: "giữa", meaning: "ở chính giữa", meaningEn: "between / in the middle", example: "Ngồi giữa hai người.", exampleEn: "Sit between two people.", partOfSpeech: "preposition" },
          { word: "vào", meaning: "chỉ thời điểm", meaningEn: "at / on (time)", example: "Vào lúc 8 giờ.", exampleEn: "At 8 o'clock.", partOfSpeech: "preposition" },
        ],
        quiz: [
          { question: "'Sách trên bàn' – 'trên' nghĩa gì?", questionEn: "What does 'trên' mean?", options: ["Under", "On", "Inside", "Outside"], answer: 1, explanation: "'Trên' = on/above.", explanationEn: "'Trên' = on/above." },
          { question: "'Trong' nghĩa là gì?", questionEn: "What does 'trong' mean?", options: ["Outside", "Under", "Inside", "Beside"], answer: 2, explanation: "'Trong' = inside.", explanationEn: "'Trong' = inside." },
          { question: "'Giữa' dùng khi nào?", questionEn: "When to use 'giữa'?", options: ["Trên cao", "Ở giữa hai vật", "Bên ngoài", "Phía dưới"], answer: 1, explanation: "'Giữa' = between/middle.", explanationEn: "'Giữa' = between." },
          { question: "'Vào lúc 8 giờ' – 'vào' chỉ gì?", questionEn: "What does 'vào' indicate?", options: ["Nơi chốn", "Thời điểm", "Số lượng", "Mức độ"], answer: 1, explanation: "'Vào' chỉ thời gian.", explanationEn: "'Vào' marks time." },
          { question: "'Trước' có thể chỉ gì?", questionEn: "What can 'trước' indicate?", options: ["Chỉ nơi chốn", "Chỉ thời gian", "Cả nơi chốn lẫn thời gian", "Không chỉ gì"], answer: 2, explanation: "'Trước cửa' (place) và 'trước khi' (time).", explanationEn: "Both place and time." },
        ],
      },
      {
        id: "vn-gram-8", title: "Câu phủ định", titleEn: "Negative Sentences", level: "intermediate",
        theory: `## Câu phủ định trong tiếng Việt

Tiếng Việt có nhiều từ phủ định, mỗi từ có **sắc thái và vị trí** khác nhau.

### Bảng so sánh

| Từ | Sắc thái | Vị trí | Ví dụ |
|----|----------|--------|-------|
| **không** | phủ định trung tính | trước động từ | Tôi **không** biết. |
| **chưa** | chưa xảy ra (có thể sẽ) | trước động từ | Tôi **chưa** ăn cơm. |
| **chẳng** | phủ định mạnh, bực bội | trước động từ | Tôi **chẳng** quan tâm. |
| **chả** | giống 'chẳng' (khẩu ngữ Bắc) | trước động từ | Tôi **chả** thèm! |
| **đừng** | cấm / khuyên không làm | trước động từ | **Đừng** đi! |
| **chớ** | đừng (trang trọng / cổ) | trước động từ | **Chớ** vội tin. |
| **không phải** | phủ định danh tính | trước danh từ / cụm | Đây **không phải** sách tôi. |

### Ví dụ minh họa

- **không** vs **chưa**:
  - Tôi **không** ăn thịt. *(I don't eat meat - thói quen, không bao giờ.)*
  - Tôi **chưa** ăn cơm. *(I haven't eaten yet - sẽ ăn sau.)*
- **không** vs **không phải**:
  - Tôi **không** là bác sĩ. ❌ → ✅ Tôi **không phải** (là) bác sĩ.
  - Tôi **không** biết. ✅ (dùng với động từ)
- **đừng** (mệnh lệnh): "**Đừng** lo!" / "**Đừng** khóc nữa!"

### Phủ định kép — nhấn mạnh

- **chẳng … đâu / không … đâu**: "Tôi **chẳng** sợ **đâu**!" (I'm really not scared!)
- **chưa bao giờ**: "Tôi **chưa bao giờ** đến Pháp." (I've never been to France.)
- **không bao giờ**: "Tôi **không bao giờ** quên." (I'll never forget.)

### Lỗi thường gặp

- ❌ Tôi **không** sinh viên. → ✅ Tôi **không phải là** sinh viên.
- ❌ **Đừng** tôi đi. → ✅ **Đừng** đi! (đừng dùng với động từ, không kèm chủ ngữ rõ ràng)`,
        theoryEn: `## Negative Sentences

Vietnamese has several negation words, each with its own **nuance and position**.

### Comparison

| Word | Nuance | Position | Example |
|------|--------|----------|---------|
| **không** | neutral negation | before verb | Tôi **không** biết. (I don't know) |
| **chưa** | not yet (may happen) | before verb | Tôi **chưa** ăn cơm. (haven't eaten yet) |
| **chẳng** | strong, slightly grumpy | before verb | Tôi **chẳng** quan tâm. (I don't care) |
| **chả** | casual 'chẳng' (Northern) | before verb | Tôi **chả** thèm! |
| **đừng** | don't (command) | before verb | **Đừng** đi! (Don't go!) |
| **chớ** | formal 'đừng' | before verb | **Chớ** vội tin. |
| **không phải** | not (identity) | before noun | Đây **không phải** sách tôi. |

### Illustrative examples

- **không** vs **chưa**:
  - Tôi **không** ăn thịt. (I don't eat meat - habitual / never.)
  - Tôi **chưa** ăn cơm. (I haven't eaten yet - will eat later.)
- **không** vs **không phải**:
  - ❌ Tôi **không** là bác sĩ. → ✅ Tôi **không phải** là bác sĩ.
  - ✅ Tôi **không** biết. (use 'không' with verbs)
- **đừng** (imperative): "**Đừng** lo!" (Don't worry!) / "**Đừng** khóc nữa!"

### Emphatic double negation

- **chẳng … đâu**: "Tôi **chẳng** sợ **đâu**!" (I'm really not scared!)
- **chưa bao giờ**: "Tôi **chưa bao giờ** đến Pháp." (I've never been to France.)
- **không bao giờ**: "Tôi **không bao giờ** quên." (I'll never forget.)

### Common mistakes

- ❌ Tôi **không** sinh viên. → ✅ Tôi **không phải là** sinh viên.
- Use **đừng** only with verbs (imperative), without explicit subject.`,
        vocabulary: [
          { word: "không", meaning: "phủ định chung", meaningEn: "not / no", example: "Tôi không biết.", exampleEn: "I don't know.", partOfSpeech: "adverb" },
          { word: "chưa", meaning: "chưa xảy ra", meaningEn: "not yet", example: "Tôi chưa ăn.", exampleEn: "I haven't eaten yet.", partOfSpeech: "adverb" },
          { word: "đừng", meaning: "cấm, yêu cầu không làm", meaningEn: "don't (imperative)", example: "Đừng đi!", exampleEn: "Don't go!", partOfSpeech: "adverb" },
          { word: "chẳng", meaning: "phủ định mạnh", meaningEn: "not at all", example: "Tôi chẳng sợ.", exampleEn: "I'm not scared at all.", partOfSpeech: "adverb" },
          { word: "chả", meaning: "không (khẩu ngữ)", meaningEn: "not (colloquial)", example: "Tôi chả biết.", exampleEn: "I dunno.", partOfSpeech: "adverb" },
          { word: "không phải", meaning: "phủ định danh tính", meaningEn: "is not", example: "Đây không phải là sách tôi.", exampleEn: "This is not my book.", partOfSpeech: "phrase" },
          { word: "không bao giờ", meaning: "chẳng bao giờ", meaningEn: "never", example: "Tôi không bao giờ quên.", exampleEn: "I will never forget.", partOfSpeech: "phrase" },
          { word: "chớ", meaning: "đừng (trang trọng)", meaningEn: "do not (formal)", example: "Chớ có nói dối.", exampleEn: "Do not lie.", partOfSpeech: "adverb" },
          { word: "hết", meaning: "không còn nữa", meaningEn: "no more / all gone", example: "Hết rồi!", exampleEn: "All gone!", partOfSpeech: "adverb" },
          { word: "chưa bao giờ", meaning: "chưa từng", meaningEn: "have never", example: "Tôi chưa bao giờ đến Pháp.", exampleEn: "I have never been to France.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Chưa' khác 'không' thế nào?", questionEn: "How is 'chưa' different from 'không'?", options: ["Giống nhau", "'Chưa' = not yet", "'Chưa' mạnh hơn", "'Không' = not yet"], answer: 1, explanation: "'Chưa' ngụ ý có thể xảy ra.", explanationEn: "'Chưa' implies it may happen." },
          { question: "'Đừng' dùng khi nào?", questionEn: "When to use 'đừng'?", options: ["Mô tả", "Ra lệnh không làm", "Hỏi", "So sánh"], answer: 1, explanation: "'Đừng' = don't (imperative).", explanationEn: "'Đừng' = don't (command)." },
          { question: "'Chẳng' mạnh hơn 'không' không?", questionEn: "Is 'chẳng' stronger than 'không'?", options: ["Không", "Có, nhấn mạnh hơn", "Yếu hơn", "Giống nhau"], answer: 1, explanation: "'Chẳng' = not at all (emphatic).", explanationEn: "'Chẳng' is more emphatic." },
          { question: "'Chưa bao giờ' nghĩa gì?", questionEn: "What does 'chưa bao giờ' mean?", options: ["Always", "Sometimes", "Have never", "Will never"], answer: 2, explanation: "Have never (kinh nghiệm).", explanationEn: "Have never (experience)." },
          { question: "'Chớ' khác 'đừng' thế nào?", questionEn: "How is 'chớ' different from 'đừng'?", options: ["Giống nhau", "'Chớ' trang trọng hơn", "'Đừng' trang trọng hơn", "Khác nghĩa"], answer: 1, explanation: "'Chớ' = formal 'đừng'.", explanationEn: "'Chớ' = formal 'đừng'." },
        ],
      },
      {
        id: "vn-gram-9", title: "Liên từ và câu ghép", titleEn: "Conjunctions & Compound Sentences", level: "intermediate",
        theory: `## Liên từ và câu ghép

Liên từ nối các mệnh đề. Có 2 nhóm: **kết hợp** (đẳng lập) và **phụ thuộc** (chính-phụ).

### 1. Liên từ kết hợp

| Liên từ | Nghĩa | Ví dụ |
|--------|--------|-------|
| **và** | and | Tôi **và** bạn cùng đi. |
| **hoặc / hay** | or | Trà **hoặc** cà phê? / Đi **hay** ở? |
| **nhưng** | but | Rẻ **nhưng** tốt. |
| **tuy nhiên** | however (formal) | Trời mưa. **Tuy nhiên**, tôi vẫn đi. |

### 2. Cấu trúc tương quan (phụ thuộc)

| Cặp liên từ | Quan hệ | Ví dụ |
|------------|---------|-------|
| **Nếu … thì** | điều kiện - kết quả | **Nếu** rảnh **thì** tôi đến. |
| **Vì … nên** | nguyên nhân - kết quả | **Vì** mưa **nên** tôi ở nhà. |
| **Mặc dù … nhưng** | nhượng bộ | **Mặc dù** mệt **nhưng** tôi vẫn học. |
| **Càng … càng** | tương ứng tăng | **Càng** học **càng** giỏi. |
| **Không những … mà còn** | thêm vào | **Không những** giỏi **mà còn** đẹp. |

### Ví dụ tình huống

- Lựa chọn: "Bạn muốn uống trà **hay** cà phê?"
- Lý do: "**Vì** trời mưa to **nên** chúng tôi hoãn picnic."
- Tương phản: "Phở này rẻ **nhưng** rất ngon."
- Điều kiện: "**Nếu** ngày mai trời đẹp, **thì** mình đi biển nhé!"
- Nhượng bộ: "**Mặc dù** bận, **nhưng** anh ấy vẫn giúp tôi."

### Lưu ý
- **hay** = thân mật; **hoặc** = trang trọng hơn.
- Trong văn nói, người Việt thường bỏ vế "thì / nên" cho gọn: "Mưa, tôi ở nhà."`,
        theoryEn: `## Conjunctions & Compound Sentences

Conjunctions link clauses. Two groups: **coordinating** and **subordinating / correlative**.

### 1. Coordinating conjunctions

| Word | Meaning | Example |
|------|---------|---------|
| **và** | and | Tôi **và** bạn cùng đi. |
| **hoặc / hay** | or | Trà **hoặc** cà phê? / Đi **hay** ở? |
| **nhưng** | but | Rẻ **nhưng** tốt. (Cheap but good) |
| **tuy nhiên** | however (formal) | Trời mưa. **Tuy nhiên**, tôi vẫn đi. |

### 2. Correlative pairs (subordinating)

| Pair | Relation | Example |
|------|----------|---------|
| **Nếu … thì** | condition → result | **Nếu** rảnh **thì** tôi đến. (If free, I'll come) |
| **Vì … nên** | cause → result | **Vì** mưa **nên** tôi ở nhà. |
| **Mặc dù … nhưng** | concession | **Mặc dù** mệt **nhưng** tôi vẫn học. |
| **Càng … càng** | the more … the more | **Càng** học **càng** giỏi. |
| **Không những … mà còn** | not only … but also | **Không những** giỏi **mà còn** đẹp. |

### Situational examples

- Choice: "Tea **or** coffee?" (hay / hoặc)
- Reason: "**Because** of heavy rain, **so** we postponed the picnic."
- Contrast: "This pho is cheap **but** very tasty."
- Condition: "**If** tomorrow is nice, **then** let's go to the beach!"
- Concession: "**Although** busy, he still helped me."

### Notes
- **hay** is casual; **hoặc** is more formal.
- In speech, Vietnamese often drops 'thì / nên' for brevity: "Mưa, tôi ở nhà."`,
        vocabulary: [
          { word: "và", meaning: "liên từ kết hợp", meaningEn: "and", example: "Tôi và bạn đi chơi.", exampleEn: "You and I go out.", partOfSpeech: "conjunction" },
          { word: "nhưng", meaning: "liên từ tương phản", meaningEn: "but", example: "Rẻ nhưng tốt.", exampleEn: "Cheap but good.", partOfSpeech: "conjunction" },
          { word: "nếu", meaning: "điều kiện", meaningEn: "if", example: "Nếu rảnh, tôi sẽ đến.", exampleEn: "If I'm free, I'll come.", partOfSpeech: "conjunction" },
          { word: "vì", meaning: "nguyên nhân", meaningEn: "because", example: "Vì mưa nên tôi ở nhà.", exampleEn: "Because of rain, I stay home.", partOfSpeech: "conjunction" },
          { word: "hoặc", meaning: "lựa chọn", meaningEn: "or", example: "Trà hoặc cà phê?", exampleEn: "Tea or coffee?", partOfSpeech: "conjunction" },
          { word: "nên", meaning: "kết quả", meaningEn: "so / therefore", example: "Mệt nên tôi nghỉ.", exampleEn: "Tired so I rest.", partOfSpeech: "conjunction" },
          { word: "mặc dù", meaning: "tuy nhiên", meaningEn: "although", example: "Mặc dù mưa nhưng tôi vẫn đi.", exampleEn: "Although rainy, I still go.", partOfSpeech: "conjunction" },
          { word: "thì", meaning: "thì (kết quả)", meaningEn: "then", example: "Nếu bạn đi thì tôi cũng đi.", exampleEn: "If you go then I go too.", partOfSpeech: "conjunction" },
          { word: "hay", meaning: "hoặc (khẩu ngữ)", meaningEn: "or (casual)", example: "Đi hay ở?", exampleEn: "Go or stay?", partOfSpeech: "conjunction" },
          { word: "tuy nhiên", meaning: "nhưng (trang trọng)", meaningEn: "however", example: "Tuy nhiên, tôi không đồng ý.", exampleEn: "However, I disagree.", partOfSpeech: "conjunction" },
        ],
        quiz: [
          { question: "'Nếu…thì' là cấu trúc gì?", questionEn: "What structure?", options: ["So sánh", "Điều kiện", "Phủ định", "Câu hỏi"], answer: 1, explanation: "'Nếu…thì' = if…then.", explanationEn: "'Nếu…thì' = if…then." },
          { question: "'Vì…nên' diễn đạt gì?", questionEn: "What does 'vì…nên' express?", options: ["So sánh", "Nguyên nhân – kết quả", "Điều kiện", "Thời gian"], answer: 1, explanation: "Cause and effect.", explanationEn: "Cause and effect." },
          { question: "'Mặc dù…nhưng' diễn đạt gì?", questionEn: "What does 'mặc dù…nhưng' express?", options: ["Đồng ý", "Nhượng bộ / tương phản", "Thời gian", "So sánh"], answer: 1, explanation: "Concession / contrast.", explanationEn: "Concession." },
          { question: "'Hay' và 'hoặc' khác nhau thế nào?", questionEn: "Difference between 'hay' and 'hoặc'?", options: ["Khác nghĩa", "'Hay' thân mật hơn", "'Hoặc' thân mật hơn", "Giống nhau hoàn toàn"], answer: 1, explanation: "'Hay' = casual, 'hoặc' = formal.", explanationEn: "'Hay' is more casual." },
          { question: "'Tuy nhiên' tương đương từ nào?", questionEn: "'Tuy nhiên' equals?", options: ["Và", "Nhưng", "Vì", "Nếu"], answer: 1, explanation: "'Tuy nhiên' = however = nhưng.", explanationEn: "'Tuy nhiên' = however." },
        ],
      },
      {
        id: "vn-gram-10", title: "Câu bị động", titleEn: "Passive Voice", level: "intermediate",
        theory: `## Câu bị động: được và bị

Khác với tiếng Anh, tiếng Việt có **2 trợ từ bị động** dựa trên **sắc thái cảm xúc**.

### Cấu trúc

**Chủ ngữ + được / bị + (tác nhân) + động từ**

### So sánh nhanh

| Trợ từ | Sắc thái | Ví dụ |
|--------|----------|-------|
| **được** | tích cực, mong muốn | Tôi **được** thưởng. *(I was rewarded.)* |
| **bị** | tiêu cực, không mong muốn | Tôi **bị** mắng. *(I was scolded.)* |

### Ví dụ minh họa (cùng động từ, khác cảm xúc)

- Tôi **được** chọn làm trưởng nhóm. ✅ (tích cực)
- Tôi **bị** chọn làm trực nhật. ✅ (không thích)
- Em **được** mẹ khen. *(Praised by mom — vui.)*
- Em **bị** mẹ mắng. *(Scolded by mom — buồn.)*
- Anh ấy **được** mời dự tiệc. *(Invited — vinh dự.)*
- Anh ấy **bị** đuổi việc. *(Fired — tiêu cực.)*

### Có tác nhân — Có thể nêu rõ ai làm

- Bài tập **được cô giáo** chấm điểm cao.
- Em bé **bị chó** cắn.
- Tin này **được mọi người** quan tâm.

### Lưu ý văn hóa

- Cùng một sự việc nhưng người Việt chọn **được / bị** theo **cảm xúc**:
  - "Tôi **bị** béo lên 2 kg." (không vui)
  - "Tôi **được** tăng 2 kg." (đang cố tăng cân — vui)
- Trong tiếng Việt, câu bị động **ít dùng hơn** tiếng Anh. Thường chuyển sang câu chủ động cho tự nhiên.`,
        theoryEn: `## Passive Voice: được vs bị

Unlike English, Vietnamese has **two passive auxiliaries** chosen by **emotional connotation**.

### Structure

**Subject + được / bị + (agent) + verb**

### Quick comparison

| Auxiliary | Nuance | Example |
|-----------|--------|---------|
| **được** | positive, desired | Tôi **được** thưởng. (I was rewarded - positive) |
| **bị** | negative, undesired | Tôi **bị** mắng. (I was scolded - negative) |

### Illustrative examples (same verb, different feeling)

- Tôi **được** chọn làm trưởng nhóm. ✅ (positive)
- Tôi **bị** chọn làm trực nhật. ✅ (unwanted)
- Em **được** mẹ khen. (praised by mom — happy)
- Em **bị** mẹ mắng. (scolded by mom — sad)
- Anh ấy **được** mời dự tiệc. (invited — honor)
- Anh ấy **bị** đuổi việc. (fired — negative)

### Naming the agent

- Bài tập **được cô giáo** chấm điểm cao. (graded high by teacher)
- Em bé **bị chó** cắn. (bitten by a dog)
- Tin này **được mọi người** quan tâm. (this news is noticed by everyone)

### Cultural note

- Vietnamese chooses **được / bị** based on **emotion**:
  - "Tôi **bị** béo lên 2 kg." (gained 2 kg - unhappy)
  - "Tôi **được** tăng 2 kg." (gained 2 kg - happy, trying to gain weight)
- Passive is **less common** in Vietnamese than in English. Convert to active for natural style.`,
        vocabulary: [
          { word: "được", meaning: "bị động tích cực", meaningEn: "passive (positive)", example: "Tôi được thưởng.", exampleEn: "I was rewarded.", partOfSpeech: "auxiliary" },
          { word: "bị", meaning: "bị động tiêu cực", meaningEn: "passive (negative)", example: "Tôi bị mắng.", exampleEn: "I was scolded.", partOfSpeech: "auxiliary" },
          { word: "khen", meaning: "nói tốt về ai", meaningEn: "to praise", example: "Cô giáo khen em.", exampleEn: "Teacher praised her.", partOfSpeech: "verb" },
          { word: "phạt", meaning: "trừng phạt", meaningEn: "to punish", example: "Bạn bị phạt.", exampleEn: "You were punished.", partOfSpeech: "verb" },
          { word: "thưởng", meaning: "trao giải", meaningEn: "to reward", example: "Em được thưởng.", exampleEn: "She was rewarded.", partOfSpeech: "verb" },
          { word: "mắng", meaning: "la, rầy", meaningEn: "to scold", example: "Bị mẹ mắng.", exampleEn: "Scolded by mom.", partOfSpeech: "verb" },
          { word: "chọn", meaning: "lựa chọn", meaningEn: "to choose / select", example: "Tôi được chọn.", exampleEn: "I was selected.", partOfSpeech: "verb" },
          { word: "mời", meaning: "yêu cầu đến", meaningEn: "to invite", example: "Tôi được mời dự tiệc.", exampleEn: "I was invited to a party.", partOfSpeech: "verb" },
          { word: "đánh", meaning: "dùng tay/chân tấn công", meaningEn: "to hit", example: "Em bị đánh.", exampleEn: "He was hit.", partOfSpeech: "verb" },
          { word: "cắn", meaning: "dùng răng", meaningEn: "to bite", example: "Bị chó cắn.", exampleEn: "Bitten by a dog.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Được' dùng khi nào?", questionEn: "When is 'được' used?", options: ["Kết quả tiêu cực", "Kết quả tích cực", "Câu hỏi", "Phủ định"], answer: 1, explanation: "'Được' cho bị động tích cực.", explanationEn: "'Được' for positive passive." },
          { question: "'Bị' dùng khi nào?", questionEn: "When is 'bị' used?", options: ["Kết quả tốt", "Kết quả xấu", "Câu hỏi", "So sánh"], answer: 1, explanation: "'Bị' cho bị động tiêu cực.", explanationEn: "'Bị' for negative passive." },
          { question: "'Tôi được khen' nghĩa gì?", questionEn: "What does it mean?", options: ["I was scolded", "I was praised", "I was punished", "I was invited"], answer: 1, explanation: "'Được khen' = was praised (tích cực).", explanationEn: "'Được khen' = was praised." },
          { question: "'Bị chó cắn' – ai bị cắn?", questionEn: "Who was bitten?", options: ["Con chó", "Người nói", "Không ai", "Cả hai"], answer: 1, explanation: "Người (chủ ngữ ẩn) bị chó cắn.", explanationEn: "The person was bitten by the dog." },
          { question: "'Được mời' tích cực hay tiêu cực?", questionEn: "Positive or negative?", options: ["Tiêu cực", "Tích cực", "Trung tính", "Phụ thuộc ngữ cảnh"], answer: 1, explanation: "'Được' = tích cực.", explanationEn: "'Được' = positive." },
        ],
      },
      {
        id: "vn-gram-26", title: "Câu điều kiện", titleEn: "Conditional Sentences", level: "intermediate",
        theory: `## Câu điều kiện

Tiếng Việt diễn đạt điều kiện bằng **Nếu … thì**, không thay đổi động từ.

### 1. Điều kiện có thật (real)

Cấu trúc: **Nếu** + [điều kiện] + **thì** + [kết quả]

- **Nếu** trời đẹp, **thì** tôi đi dạo. *(If the weather is nice, I'll take a walk.)*
- **Nếu** bạn rảnh, gọi tôi nhé. *(If you're free, call me.)*
- **Nếu** học chăm, bạn sẽ giỏi. *(If you study hard, you'll be good.)*

### 2. Điều kiện không thật / tiếc nuối

Dùng **Giá mà / Giá như / Ước gì** + (đã / sẽ):

- **Giá mà** tôi biết sớm hơn! *(If only I had known earlier!)*
- **Ước gì** tôi giàu hơn. *(I wish I were richer.)*
- **Giả sử** bạn là giám đốc, bạn sẽ làm gì? *(Suppose you were the director, what would you do?)*

### 3. Điều kiện đặc biệt

| Cụm | Nghĩa | Ví dụ |
|-----|--------|-------|
| **Miễn là** | as long as | **Miễn là** bạn vui là được. |
| **Trừ khi** | unless | Tôi sẽ đi, **trừ khi** trời mưa. |
| **Lỡ … thì sao** | what if (worry) | **Lỡ** trời mưa **thì sao**? |
| **Hễ … là** | whenever | **Hễ** mùa đông **là** lạnh. |

### Ví dụ đời sống

- **Nếu** bạn đến Việt Nam, **thì** nhất định phải thử phở.
- **Giá mà** tôi nói tiếng Việt giỏi hơn.
- **Miễn là** an toàn, đi đường nào cũng được.
- **Hễ** Tết **là** cả nhà sum họp.

### Lưu ý

- Có thể bỏ **thì** trong câu nói: "Nếu rảnh, gọi tôi."
- Tiếng Việt **không chia động từ** theo điều kiện thực/giả như tiếng Anh.`,
        theoryEn: `## Conditional Sentences

Vietnamese expresses conditions with **Nếu … thì**, without changing verb forms.

### 1. Real conditions

Structure: **Nếu** + [condition] + **thì** + [result]

- **Nếu** trời đẹp, **thì** tôi đi dạo. (If the weather is nice, I'll take a walk.)
- **Nếu** bạn rảnh, gọi tôi nhé. (If you're free, call me.)
- **Nếu** học chăm, bạn sẽ giỏi. (If you study hard, you'll do well.)

### 2. Unreal / regret

Use **Giá mà / Giá như / Ước gì**:

- **Giá mà** tôi biết sớm hơn! (If only I had known earlier!)
- **Ước gì** tôi giàu hơn. (I wish I were richer.)
- **Giả sử** bạn là giám đốc, bạn sẽ làm gì? (Suppose you were the director, what would you do?)

### 3. Special conditions

| Phrase | Meaning | Example |
|--------|---------|---------|
| **Miễn là** | as long as | **Miễn là** bạn vui là được. |
| **Trừ khi** | unless | Tôi sẽ đi, **trừ khi** trời mưa. |
| **Lỡ … thì sao** | what if (worry) | **Lỡ** trời mưa **thì sao**? |
| **Hễ … là** | whenever | **Hễ** mùa đông **là** lạnh. |

### Everyday examples

- **If** you come to Vietnam, you must try pho.
- **If only** I spoke Vietnamese better.
- **As long as** it's safe, any route is fine.
- **Whenever** Tet comes, the whole family reunites.

### Notes

- 'thì' is often dropped in speech: "Nếu rảnh, gọi tôi."
- Vietnamese **does not conjugate** verbs based on real/unreal conditions like English.`,
        vocabulary: [
          { word: "giá mà", meaning: "ước gì", meaningEn: "if only", example: "Giá mà tôi biết sớm.", exampleEn: "If only I had known.", partOfSpeech: "conjunction" },
          { word: "giả sử", meaning: "nếu giả định", meaningEn: "suppose", example: "Giả sử bạn là giám đốc.", exampleEn: "Suppose you were the director.", partOfSpeech: "conjunction" },
          { word: "nếu", meaning: "điều kiện", meaningEn: "if", example: "Nếu trời đẹp thì tôi đi.", exampleEn: "If the weather is nice, I'll go.", partOfSpeech: "conjunction" },
          { word: "thì", meaning: "kết quả", meaningEn: "then", example: "Nếu rảnh thì gọi tôi.", exampleEn: "If free, then call me.", partOfSpeech: "conjunction" },
          { word: "miễn là", meaning: "với điều kiện", meaningEn: "as long as", example: "Miễn là bạn vui.", exampleEn: "As long as you're happy.", partOfSpeech: "conjunction" },
          { word: "trừ khi", meaning: "ngoại trừ khi", meaningEn: "unless", example: "Tôi sẽ đi, trừ khi mưa.", exampleEn: "I'll go, unless it rains.", partOfSpeech: "conjunction" },
          { word: "ước", meaning: "mong muốn", meaningEn: "to wish", example: "Tôi ước được đi du lịch.", exampleEn: "I wish I could travel.", partOfSpeech: "verb" },
          { word: "lỡ", meaning: "nếu chẳng may", meaningEn: "in case / what if", example: "Lỡ trời mưa thì sao?", exampleEn: "What if it rains?", partOfSpeech: "conjunction" },
          { word: "chắc", meaning: "có lẽ", meaningEn: "probably", example: "Nếu không đến, chắc bạn bận.", exampleEn: "If not coming, probably busy.", partOfSpeech: "adverb" },
          { word: "có lẽ", meaning: "phỏng đoán", meaningEn: "perhaps / maybe", example: "Có lẽ anh ấy sẽ đến.", exampleEn: "Perhaps he will come.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Giá mà' thể hiện điều gì?", questionEn: "What does 'giá mà' express?", options: ["Chắc chắn", "Tiếc nuối", "Vui mừng", "Tức giận"], answer: 1, explanation: "'Giá mà' = if only (regret).", explanationEn: "'Giá mà' = if only." },
          { question: "'Miễn là' nghĩa gì?", questionEn: "What does 'miễn là' mean?", options: ["Although", "As long as", "Because", "Before"], answer: 1, explanation: "'Miễn là' = as long as.", explanationEn: "'Miễn là' = as long as." },
          { question: "'Trừ khi' nghĩa gì?", questionEn: "What does 'trừ khi' mean?", options: ["If", "Unless", "Because", "Although"], answer: 1, explanation: "'Trừ khi' = unless.", explanationEn: "'Trừ khi' = unless." },
          { question: "'Lỡ' dùng khi nào?", questionEn: "When to use 'lỡ'?", options: ["Chắc chắn", "Giả định tiêu cực", "Quá khứ", "So sánh"], answer: 1, explanation: "'Lỡ' = in case / what if.", explanationEn: "'Lỡ' = what if (worry)." },
          { question: "Cấu trúc 'Nếu…thì' diễn đạt gì?", questionEn: "What does 'nếu…thì' express?", options: ["Nguyên nhân", "Điều kiện – kết quả", "So sánh", "Thời gian"], answer: 1, explanation: "Condition and result.", explanationEn: "Condition – result." },
        ],
      },
      {
        id: "vn-gram-27", title: "Cách dùng 'cho', 'để', 'mà'", titleEn: "Purpose Clauses: cho, để, mà", level: "intermediate",
        theory: `## Mệnh đề mục đích: cho, để, mà

Ba từ này đều liên quan đến **mục đích / lý do**, nhưng dùng khác nhau.

### 1. **để** = in order to (mục đích hành động)

Cấu trúc: [Hành động] + **để** + [mục đích]

- Tôi học tiếng Việt **để** đi du lịch.
- Cô ấy dậy sớm **để** tập thể dục.
- Anh ấy tiết kiệm tiền **để** mua nhà.
- **Để khỏi** quên, tôi ghi chú lại. *(So as not to forget…)*

### 2. **cho** = for / give (người hưởng lợi hoặc tặng)

- Mẹ nấu cơm **cho** cả nhà.
- Tôi mua quà **cho** em.
- Hát **cho** mọi người nghe.
- **Cho** tôi xin một ly nước. *(Give me a glass of water - lịch sự.)*

### 3. **mà** = nhiều nghĩa tùy ngữ cảnh

- Có gì **mà** sợ? *(What's there to fear? - tu từ.)*
- Cô ấy đẹp **mà** lại thông minh. *(Pretty but also smart - thêm vào.)*
- Đây là bài hát **mà** tôi thích. *(The song that I like - đại từ quan hệ.)*

### So sánh: để vs cho

| Câu | Nghĩa |
|-----|-------|
| Mua quà **để** tặng bạn. | mục đích: dùng quà để tặng |
| Mua quà **cho** bạn. | đối tượng: quà dành cho bạn |

### Ví dụ kết hợp

- Tôi học tiếng Việt **để** nói chuyện **cho** dễ dàng với người Việt.
- Anh ấy làm việc chăm chỉ **để** lo **cho** gia đình.

### Lưu ý
- **nhằm** = đồng nghĩa **để** nhưng trang trọng hơn (dùng trong văn viết).
  - Ví dụ: "**Nhằm** nâng cao chất lượng, công ty…"`,
        theoryEn: `## Purpose Clauses: cho, để, mà

These three words relate to **purpose / reason** but are used differently.

### 1. **để** = in order to (purpose of action)

Structure: [action] + **để** + [purpose]

- Tôi học tiếng Việt **để** đi du lịch. (I study Vietnamese to travel.)
- Cô ấy dậy sớm **để** tập thể dục. (She wakes up early to exercise.)
- Anh ấy tiết kiệm tiền **để** mua nhà. (He saves money to buy a house.)
- **Để khỏi** quên, tôi ghi chú lại. (So as not to forget, I take notes.)

### 2. **cho** = for / give (beneficiary or recipient)

- Mẹ nấu cơm **cho** cả nhà. (Mom cooks for the whole family.)
- Tôi mua quà **cho** em. (I buy a gift for my younger sibling.)
- Hát **cho** mọi người nghe. (Sing for everyone to hear.)
- **Cho** tôi xin một ly nước. (Please give me a glass of water.)

### 3. **mà** = multiple meanings by context

- Có gì **mà** sợ? (What's there to fear? - rhetorical)
- Cô ấy đẹp **mà** lại thông minh. (Pretty AND smart - additive)
- Đây là bài hát **mà** tôi thích. (The song that I like - relative)

### để vs cho comparison

| Sentence | Meaning |
|----------|---------|
| Mua quà **để** tặng bạn. | Purpose: to give as a gift |
| Mua quà **cho** bạn. | Recipient: the gift is for the friend |

### Combined examples

- Tôi học tiếng Việt **để** nói chuyện **cho** dễ dàng với người Việt.
- Anh ấy làm việc chăm chỉ **để** lo **cho** gia đình.

### Note
- **nhằm** = formal synonym of **để** used in writing.
  - Example: "**Nhằm** nâng cao chất lượng, công ty…" (To improve quality, the company…)`,
        vocabulary: [
          { word: "để", meaning: "nhằm mục đích", meaningEn: "in order to / to", example: "Học để tiến bộ.", exampleEn: "Study to improve.", partOfSpeech: "conjunction" },
          { word: "cho", meaning: "cho ai, vì ai", meaningEn: "for / give", example: "Mua cho em.", exampleEn: "Buy for younger sibling.", partOfSpeech: "preposition" },
          { word: "mà", meaning: "nhưng / để", meaningEn: "but / in order to", example: "Có gì mà sợ?", exampleEn: "What is there to fear?", partOfSpeech: "conjunction" },
          { word: "nhằm", meaning: "với mục đích", meaningEn: "with the aim of", example: "Nhằm cải thiện chất lượng.", exampleEn: "Aiming to improve quality.", partOfSpeech: "preposition" },
          { word: "vì", meaning: "bởi vì", meaningEn: "because / for", example: "Làm vì gia đình.", exampleEn: "Do it for family.", partOfSpeech: "conjunction" },
          { word: "tặng", meaning: "cho không", meaningEn: "to gift", example: "Tặng cho bạn.", exampleEn: "Give to friend.", partOfSpeech: "verb" },
          { word: "giúp", meaning: "hỗ trợ", meaningEn: "to help", example: "Giúp cho tôi.", exampleEn: "Help me.", partOfSpeech: "verb" },
          { word: "mục đích", meaning: "điều muốn đạt", meaningEn: "purpose / goal", example: "Mục đích là gì?", exampleEn: "What's the purpose?", partOfSpeech: "noun" },
          { word: "nhờ", meaning: "xin giúp", meaningEn: "to ask for help", example: "Nhờ bạn giúp.", exampleEn: "Ask a friend for help.", partOfSpeech: "verb" },
          { word: "khỏi", meaning: "tránh khỏi", meaningEn: "to avoid / from", example: "Để khỏi quên.", exampleEn: "So as not to forget.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Tôi học để thi' – 'để' nghĩa gì?", questionEn: "What does 'để' mean?", options: ["Because", "In order to", "But", "And"], answer: 1, explanation: "'Để' = in order to.", explanationEn: "'Để' = in order to." },
          { question: "'Mua cho mẹ' – 'cho' nghĩa gì?", questionEn: "What does 'cho' mean?", options: ["With", "For", "From", "To"], answer: 1, explanation: "'Cho' = for.", explanationEn: "'Cho' = for." },
          { question: "'Mà' trong 'Có gì mà sợ?' nghĩa gì?", questionEn: "What does 'mà' mean here?", options: ["But", "To (purpose)", "And", "Or"], answer: 1, explanation: "'Mà' = to / that (purpose context).", explanationEn: "'Mà' = to (rhetorical)." },
          { question: "'Nhằm' tương tự từ nào?", questionEn: "'Nhằm' is similar to?", options: ["Nhưng", "Để", "Và", "Hoặc"], answer: 1, explanation: "'Nhằm' ≈ 'để' (formal).", explanationEn: "'Nhằm' ≈ 'để' (formal)." },
          { question: "'Để khỏi quên' nghĩa gì?", questionEn: "What does it mean?", options: ["To remember", "So as not to forget", "To forget", "Already forgot"], answer: 1, explanation: "'Để khỏi' = so as not to.", explanationEn: "'Để khỏi' = so as not to." },
        ],
      },
      {
        id: "vn-gram-28", title: "Cách dùng 'bao giờ', 'bao lâu', 'mấy'", titleEn: "Time Questions", level: "intermediate",
        theory: `## Câu hỏi thời gian: bao giờ, bao lâu, mấy, khi nào

### 1. **bao giờ / khi nào** = When

**Vị trí thay đổi nghĩa!** Đây là điểm khó nhất.

| Vị trí | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| **Đầu câu** | tương lai (chưa xảy ra) | **Bao giờ** bạn về? *(When will you return?)* |
| **Cuối câu** | quá khứ (đã xảy ra) | Bạn về **bao giờ**? *(When did you return?)* |

Ví dụ thêm:
- **Khi nào** chúng ta đi? *(When are we leaving?)* — tương lai
- Chúng ta đi **khi nào**? *(When did we go?)* — quá khứ

### 2. **bao lâu** = How long (thời lượng)

- Bạn học tiếng Việt **bao lâu** rồi? *(How long have you been studying?)*
- Chuyến bay mất **bao lâu**? *(How long does the flight take?)*
- Còn **bao lâu** nữa thì đến? *(How much longer until we arrive?)*

### 3. **mấy** = How many (số nhỏ) / What (time)

- **Mấy** giờ rồi? *(What time is it?)*
- Bạn có **mấy** anh chị em? *(How many siblings?)*
- Hôm nay là thứ **mấy**? *(What day of the week?)*

**mấy vs bao nhiêu**:
- **mấy** = số nhỏ (thường < 10).
- **bao nhiêu** = số lớn / không xác định: "Cái này **bao nhiêu** tiền?"

### Từ thời gian thường dùng

| Quá khứ | Hiện tại | Tương lai |
|---------|----------|-----------|
| hôm qua, hôm kia, tuần trước | hôm nay, bây giờ | ngày mai, tuần sau, năm sau |

### Ví dụ tổng hợp

- **Bao giờ** bạn rảnh? — *Tuần sau tôi rảnh.*
- Bạn đến đây **bao giờ**? — *Hôm qua.*
- Bạn ở đây **bao lâu**? — *Khoảng 2 tuần.*
- **Mấy** giờ chúng ta gặp? — *3 giờ chiều.*`,
        theoryEn: `## Time Questions: bao giờ, bao lâu, mấy, khi nào

### 1. **bao giờ / khi nào** = When

**Position changes meaning!** This is the trickiest point.

| Position | Meaning | Example |
|----------|---------|---------|
| **Beginning** | future (not yet happened) | **Bao giờ** bạn về? (When will you return?) |
| **End** | past (already happened) | Bạn về **bao giờ**? (When did you return?) |

More examples:
- **Khi nào** chúng ta đi? (When are we leaving?) — future
- Chúng ta đi **khi nào**? (When did we go?) — past

### 2. **bao lâu** = How long (duration)

- Bạn học tiếng Việt **bao lâu** rồi? (How long have you studied?)
- Chuyến bay mất **bao lâu**? (How long is the flight?)
- Còn **bao lâu** nữa thì đến? (How much longer?)

### 3. **mấy** = How many (small) / What (time)

- **Mấy** giờ rồi? (What time is it?)
- Bạn có **mấy** anh chị em? (How many siblings?)
- Hôm nay là thứ **mấy**? (What day of the week?)

**mấy vs bao nhiêu**:
- **mấy** = small numbers (usually < 10).
- **bao nhiêu** = large / unknown numbers: "Cái này **bao nhiêu** tiền?" (How much is this?)

### Common time words

| Past | Present | Future |
|------|---------|--------|
| hôm qua (yesterday), tuần trước (last week) | hôm nay (today), bây giờ (now) | ngày mai (tomorrow), tuần sau (next week) |

### Mini dialogue practice

- **Bao giờ** bạn rảnh? — Tuần sau. (Next week.)
- Bạn đến đây **bao giờ**? — Hôm qua. (Yesterday.)
- Bạn ở đây **bao lâu**? — Khoảng 2 tuần.
- **Mấy** giờ chúng ta gặp? — 3 giờ chiều.`,
        vocabulary: [
          { word: "bao giờ", meaning: "khi nào", meaningEn: "when", example: "Bao giờ bạn về?", exampleEn: "When will you return?", partOfSpeech: "interrogative" },
          { word: "bao lâu", meaning: "thời gian bao lâu", meaningEn: "how long", example: "Đi bao lâu?", exampleEn: "How long is the trip?", partOfSpeech: "interrogative" },
          { word: "mấy", meaning: "hỏi số lượng nhỏ", meaningEn: "how many / what (time)", example: "Mấy giờ rồi?", exampleEn: "What time is it?", partOfSpeech: "interrogative" },
          { word: "giờ", meaning: "đơn vị thời gian", meaningEn: "hour / o'clock", example: "Bây giờ 3 giờ.", exampleEn: "It's 3 o'clock now.", partOfSpeech: "noun" },
          { word: "phút", meaning: "60 giây", meaningEn: "minute", example: "Chờ 5 phút.", exampleEn: "Wait 5 minutes.", partOfSpeech: "noun" },
          { word: "ngày", meaning: "24 giờ", meaningEn: "day", example: "Hôm nay ngày đẹp trời.", exampleEn: "Today is a nice day.", partOfSpeech: "noun" },
          { word: "tuần", meaning: "7 ngày", meaningEn: "week", example: "Tuần này bận.", exampleEn: "This week is busy.", partOfSpeech: "noun" },
          { word: "tháng", meaning: "30 ngày", meaningEn: "month", example: "Tháng 1 lạnh.", exampleEn: "January is cold.", partOfSpeech: "noun" },
          { word: "năm", meaning: "12 tháng", meaningEn: "year", example: "Năm nay 2026.", exampleEn: "This year is 2026.", partOfSpeech: "noun" },
          { word: "lúc", meaning: "thời điểm", meaningEn: "at (a moment)", example: "Lúc nào cũng vui.", exampleEn: "Always happy.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Bao giờ' ở đầu câu hỏi về?", questionEn: "'Bao giờ' at beginning asks about?", options: ["Quá khứ", "Tương lai", "Số lượng", "Nơi chốn"], answer: 1, explanation: "Đầu câu = tương lai.", explanationEn: "At beginning = future." },
          { question: "'Mấy giờ rồi?' hỏi gì?", questionEn: "What does it ask?", options: ["How many hours", "What time", "How long", "When"], answer: 1, explanation: "Hỏi giờ hiện tại.", explanationEn: "Asks current time." },
          { question: "'Bao lâu' hỏi về gì?", questionEn: "What does 'bao lâu' ask?", options: ["Nơi chốn", "Thời lượng", "Số lượng", "Lý do"], answer: 1, explanation: "'Bao lâu' = how long (duration).", explanationEn: "'Bao lâu' = duration." },
          { question: "'Bạn đi bao giờ?' hỏi về?", questionEn: "'Bạn đi bao giờ?' asks about?", options: ["Tương lai", "Quá khứ", "Nơi chốn", "Cách thức"], answer: 1, explanation: "Cuối câu = quá khứ.", explanationEn: "At end = past." },
          { question: "'Mấy' khác 'bao nhiêu' thế nào?", questionEn: "How do they differ?", options: ["Giống nhau", "'Mấy' cho số nhỏ", "'Bao nhiêu' cho số nhỏ", "Không khác"], answer: 1, explanation: "'Mấy' cho số nhỏ (thường <10).", explanationEn: "'Mấy' for small numbers." },
        ],
      },
      {
        id: "vn-gram-29", title: "Cấu trúc 'đã…rồi', 'mới…thôi'", titleEn: "Completion & Recency", level: "intermediate",
        theory: `## Cấu trúc hoàn thành: đã…rồi, mới…thôi, chưa…đâu, vẫn…

Các cấu trúc này thể hiện **trạng thái** của hành động (xong, vừa xong, chưa, đang tiếp).

### 1. **đã … rồi** = already (đã hoàn thành)

- Tôi **đã** ăn cơm **rồi**. *(I have already eaten.)*
- Anh ấy **đã** đi **rồi**. *(He has already left.)*
- Trong khẩu ngữ thường nói gọn: "Xong **rồi**!" / "Ăn cơm chưa? — Ăn **rồi**."

### 2. **mới … (thôi)** = just / only (vừa xảy ra hoặc số lượng ít)

- Tôi **mới** đến **thôi**. *(I just arrived.)*
- Em **mới** học có 2 tuần **thôi**. *(I've only been studying for 2 weeks.)*
- Anh ấy **mới** ra ngoài. *(He just stepped out.)*

### 3. **chưa … (đâu)** = not yet (emphatic)

- Tôi **chưa** ăn cơm. *(I haven't eaten yet.)*
- **Chưa** xong **đâu**! *(Not done yet! - mạnh hơn.)*
- Bạn đi chưa? — **Chưa**, đợi tôi chút. *(Not yet, wait a moment.)*

### 4. **vẫn / còn** = still / remaining

- Tôi **vẫn** ở đây. *(I'm still here.)*
- **Còn** ai chưa đến không? *(Anyone still not arrived?)*
- Trời **vẫn** mưa. *(It's still raining.)*

### 5. **hết** = all done / used up

- Ăn **hết** cơm rồi. *(All the rice is eaten.)*
- **Hết** tiền rồi! *(No money left!)*

### Bảng so sánh nhanh

| Trạng thái | Cấu trúc | Ví dụ |
|-----------|----------|-------|
| Hoàn thành | **đã … rồi** | Đã làm xong **rồi**. |
| Vừa xong | **mới … thôi** | **Mới** đến **thôi**. |
| Chưa xảy ra | **chưa … đâu** | **Chưa** đi **đâu**. |
| Tiếp diễn | **vẫn / còn** | **Vẫn** đang ngủ. |
| Hết / cạn | **hết** | Ăn **hết** rồi. |

### Ví dụ hội thoại

- A: Bạn ăn cơm chưa? — B: Ăn **rồi**.
- A: Làm xong chưa? — B: **Chưa đâu**, còn 10 phút nữa.
- A: Mưa nữa không? — B: **Vẫn** mưa, **hết** áo khoác rồi!`,
        theoryEn: `## Completion & Recency: đã…rồi, mới…thôi, chưa…đâu, vẫn…

These structures show the **state** of an action (done, just done, not yet, ongoing).

### 1. **đã … rồi** = already (completed)

- Tôi **đã** ăn cơm **rồi**. (I have already eaten.)
- Anh ấy **đã** đi **rồi**. (He has already left.)
- In speech often shortened: "Xong **rồi**!" / "Ăn cơm chưa? — Ăn **rồi**."

### 2. **mới … (thôi)** = just / only

- Tôi **mới** đến **thôi**. (I just arrived.)
- Em **mới** học có 2 tuần **thôi**. (Only 2 weeks of study so far.)
- Anh ấy **mới** ra ngoài. (He just stepped out.)

### 3. **chưa … (đâu)** = not yet (emphatic)

- Tôi **chưa** ăn cơm. (Not eaten yet.)
- **Chưa** xong **đâu**! (Really not done yet!)
- Bạn đi chưa? — **Chưa**, đợi tôi chút.

### 4. **vẫn / còn** = still / remaining

- Tôi **vẫn** ở đây. (I'm still here.)
- **Còn** ai chưa đến không? (Anyone still not arrived?)
- Trời **vẫn** mưa. (It's still raining.)

### 5. **hết** = all done / used up

- Ăn **hết** cơm rồi. (All rice eaten.)
- **Hết** tiền rồi! (Out of money!)

### Quick reference

| State | Structure | Example |
|-------|-----------|---------|
| Completed | **đã … rồi** | Đã làm xong **rồi**. |
| Just done | **mới … thôi** | **Mới** đến **thôi**. |
| Not yet | **chưa … đâu** | **Chưa** đi **đâu**. |
| Ongoing | **vẫn / còn** | **Vẫn** đang ngủ. |
| Used up | **hết** | Ăn **hết** rồi. |

### Mini dialogue

- A: Have you eaten? — B: Ăn **rồi**.
- A: Done yet? — B: **Chưa đâu**, 10 more minutes.
- A: Still raining? — B: **Vẫn** mưa, **hết** áo khoác rồi!`,
        vocabulary: [
          { word: "rồi", meaning: "đã xong", meaningEn: "already / done", example: "Xong rồi!", exampleEn: "Done!", partOfSpeech: "particle" },
          { word: "mới", meaning: "vừa mới", meaningEn: "just / recently", example: "Tôi mới biết.", exampleEn: "I just found out.", partOfSpeech: "adverb" },
          { word: "thôi", meaning: "chỉ vậy", meaningEn: "only / that's all", example: "Một cái thôi.", exampleEn: "Just one.", partOfSpeech: "particle" },
          { word: "đâu", meaning: "nhấn mạnh phủ định", meaningEn: "emphatic negation particle", example: "Chưa xong đâu!", exampleEn: "Not done yet!", partOfSpeech: "particle" },
          { word: "xong", meaning: "hoàn thành", meaningEn: "finished / done", example: "Làm xong rồi.", exampleEn: "Finished.", partOfSpeech: "verb" },
          { word: "hết", meaning: "tất cả đã xong", meaningEn: "all done / used up", example: "Ăn hết rồi.", exampleEn: "Eaten all of it.", partOfSpeech: "adverb" },
          { word: "còn", meaning: "vẫn còn", meaningEn: "still / remaining", example: "Còn ai không?", exampleEn: "Anyone left?", partOfSpeech: "adverb" },
          { word: "vẫn", meaning: "tiếp tục như trước", meaningEn: "still / yet", example: "Tôi vẫn ở đây.", exampleEn: "I'm still here.", partOfSpeech: "adverb" },
          { word: "cũng", meaning: "cũng vậy", meaningEn: "also / too", example: "Tôi cũng đi.", exampleEn: "I'll go too.", partOfSpeech: "adverb" },
          { word: "nữa", meaning: "thêm", meaningEn: "more / again", example: "Ăn nữa không?", exampleEn: "Eat more?", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Mới đến thôi' nghĩa là?", questionEn: "What does it mean?", options: ["Đến lâu rồi", "Vừa mới đến", "Chưa đến", "Sẽ đến"], answer: 1, explanation: "Vừa mới đến.", explanationEn: "Just arrived." },
          { question: "'Chưa xong đâu' – 'đâu' làm gì?", questionEn: "What does 'đâu' do?", options: ["Hỏi nơi chốn", "Nhấn mạnh phủ định", "Chỉ thời gian", "So sánh"], answer: 1, explanation: "'Đâu' nhấn mạnh 'chưa'.", explanationEn: "'Đâu' emphasizes negation." },
          { question: "'Rồi' trong 'Ăn rồi' nghĩa gì?", questionEn: "What does 'rồi' mean?", options: ["Will eat", "Already ate", "Eating now", "Want to eat"], answer: 1, explanation: "'Rồi' = already done.", explanationEn: "'Rồi' = already." },
          { question: "'Vẫn' chỉ điều gì?", questionEn: "What does 'vẫn' indicate?", options: ["Thay đổi", "Tiếp tục như trước", "Kết thúc", "Bắt đầu"], answer: 1, explanation: "'Vẫn' = still continuing.", explanationEn: "'Vẫn' = still." },
          { question: "'Hết' trong 'Ăn hết' nghĩa gì?", questionEn: "What does 'hết' mean?", options: ["A little", "All / used up", "More", "Half"], answer: 1, explanation: "'Hết' = all gone.", explanationEn: "'Hết' = all consumed." },
        ],
      },
      {
        id: "vn-gram-30", title: "Câu nhấn mạnh và đảo ngữ", titleEn: "Emphasis & Inversion", level: "intermediate",
        theory: `## Câu nhấn mạnh và đảo ngữ

Tiếng Việt có nhiều cách **nhấn mạnh** mà không cần thay đổi cấu trúc câu.

### 1. **chính** = exactly / oneself (nhấn mạnh chủ thể)

- **Chính** anh ấy đã nói thế. *(He himself said that.)*
- **Chính** tôi cũng không biết. *(I myself don't know either.)*
- Đây **chính** là người tôi tìm. *(This is exactly the person I'm looking for.)*

### 2. **thì** = topic marker (nhấn mạnh chủ đề)

- Tôi **thì** thích cà phê, còn bạn **thì** sao? *(As for me, I like coffee; how about you?)*
- Phở **thì** ngon, nhưng đắt. *(As for pho, it's tasty but expensive.)*

### 3. **mới** = only then / only when (nhấn mạnh điều kiện)

- Như vậy **mới** đúng. *(Only that way is correct.)*
- Có học, **mới** giỏi. *(Only by studying can you become good.)*

### 4. Ngữ khí từ nhấn mạnh

| Từ | Sắc thái | Ví dụ |
|----|----------|-------|
| **thật** | thực sự | Đẹp **thật**! *(Really beautiful!)* |
| **chứ** | tất nhiên | Đi **chứ**! *(Of course I'll go!)* |
| **đấy** | thật đấy | Tôi biết **đấy**. *(I know, you know.)* |
| **mà** | trấn an | Tôi biết **mà**. *(Trust me, I know.)* |
| **cơ** | bất bình / khẩn thiết (Bắc) | Tôi muốn cái này **cơ**. *(I really want this one.)* |
| **lại** | bất ngờ | Sao **lại** thế? *(How come?)* |

### 5. Đảo ngữ — đưa thành phần cần nhấn mạnh lên đầu

- Bình thường: Tôi yêu Hà Nội nhất.
- Nhấn mạnh: **Hà Nội**, tôi yêu nhất. / **Hà Nội mới là** nơi tôi yêu nhất.

### Ví dụ tổng hợp

- **Chính** thầy giáo **mới là** người dạy tôi điều đó.
- Sao **lại** quên **chứ**?
- Đẹp **thật đấy**, không phải đùa **đâu**!

### Lưu ý

- Nhiều ngữ khí từ chỉ dùng được trong **văn nói**.
- Đặt sai vị trí có thể đổi nghĩa hoàn toàn — hãy nghe người Việt dùng nhiều để cảm nhận.`,
        theoryEn: `## Emphasis & Inversion in Vietnamese

Vietnamese has many ways to **emphasize** without changing sentence structure.

### 1. **chính** = exactly / oneself

- **Chính** anh ấy đã nói thế. (He himself said that.)
- **Chính** tôi cũng không biết. (Even I don't know.)
- Đây **chính** là người tôi tìm. (This is exactly the person I'm looking for.)

### 2. **thì** = topic marker

- Tôi **thì** thích cà phê, còn bạn **thì** sao? (As for me, I like coffee; how about you?)
- Phở **thì** ngon, nhưng đắt. (As for pho, it's tasty but expensive.)

### 3. **mới** = only then / only when

- Như vậy **mới** đúng. (Only that way is correct.)
- Có học, **mới** giỏi. (Only by studying can you become good.)

### 4. Sentence-final emphasizers

| Particle | Nuance | Example |
|----------|--------|---------|
| **thật** | truly | Đẹp **thật**! (Really beautiful!) |
| **chứ** | of course | Đi **chứ**! (Of course I'll go!) |
| **đấy** | you know | Tôi biết **đấy**. |
| **mà** | reassurance | Tôi biết **mà**. (Trust me.) |
| **cơ** | insistence (North) | Tôi muốn cái này **cơ**. |
| **lại** | unexpected | Sao **lại** thế? (How come?) |

### 5. Inversion — front-shift the emphasized element

- Neutral: Tôi yêu Hà Nội nhất.
- Emphatic: **Hà Nội**, tôi yêu nhất. / **Hà Nội mới là** nơi tôi yêu nhất.

### Combined examples

- **Chính** thầy giáo **mới là** người dạy tôi điều đó.
- Sao **lại** quên **chứ**?
- Đẹp **thật đấy**, không phải đùa **đâu**!

### Notes

- Many particles are spoken-language only.
- Placement can change meaning — listen to native speakers a lot to develop a feel.`,
        vocabulary: [
          { word: "chính", meaning: "chính xác là", meaningEn: "exactly / oneself", example: "Chính anh ấy nói.", exampleEn: "He himself said it.", partOfSpeech: "adverb" },
          { word: "thì", meaning: "nhấn mạnh chủ đề", meaningEn: "topic marker / then", example: "Tôi thì thích cà phê.", exampleEn: "As for me, I like coffee.", partOfSpeech: "particle" },
          { word: "thật", meaning: "thực sự", meaningEn: "truly / really", example: "Đẹp thật!", exampleEn: "Truly beautiful!", partOfSpeech: "adverb" },
          { word: "chứ", meaning: "khẳng định", meaningEn: "certainly / of course", example: "Đi chứ!", exampleEn: "Of course I'll go!", partOfSpeech: "particle" },
          { word: "đấy", meaning: "nhấn mạnh", meaningEn: "you know / emphasis", example: "Tôi biết đấy.", exampleEn: "I know, you see.", partOfSpeech: "particle" },
          { word: "cơ", meaning: "nhấn mạnh (miền Bắc)", meaningEn: "emphasis (northern)", example: "Tôi muốn đi cơ.", exampleEn: "I really want to go.", partOfSpeech: "particle" },
          { word: "mà", meaning: "nhấn mạnh giải thích", meaningEn: "explanatory emphasis", example: "Tôi biết mà.", exampleEn: "I know (trust me).", partOfSpeech: "particle" },
          { word: "lại", meaning: "bất ngờ / thêm", meaningEn: "unexpectedly / again", example: "Sao lại thế?", exampleEn: "Why is that so?", partOfSpeech: "adverb" },
          { word: "mới", meaning: "nhấn mạnh đúng", meaningEn: "only then / truly", example: "Như vậy mới đúng.", exampleEn: "Only then is it correct.", partOfSpeech: "adverb" },
          { word: "đúng", meaning: "chính xác", meaningEn: "correct / right", example: "Đúng rồi!", exampleEn: "That's right!", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Chính tôi' nghĩa gì?", questionEn: "What does 'chính tôi' mean?", options: ["Not me", "I myself", "Someone else", "We"], answer: 1, explanation: "'Chính tôi' = I myself.", explanationEn: "'Chính tôi' = I myself." },
          { question: "'Thì' trong 'Tôi thì thích trà' làm gì?", questionEn: "What does 'thì' do?", options: ["So sánh", "Nhấn mạnh chủ đề", "Phủ định", "Hỏi"], answer: 1, explanation: "'Thì' = topic emphasis.", explanationEn: "'Thì' = topic marker." },
          { question: "'Đẹp thật!' là loại câu gì?", questionEn: "What type of sentence?", options: ["Câu hỏi", "Câu cảm thán", "Phủ định", "Bị động"], answer: 1, explanation: "Cảm thán + nhấn mạnh.", explanationEn: "Exclamatory + emphasis." },
          { question: "'Chứ' thể hiện gì?", questionEn: "What does 'chứ' express?", options: ["Nghi ngờ", "Khẳng định chắc chắn", "Phủ định", "Hỏi"], answer: 1, explanation: "'Chứ' = of course.", explanationEn: "'Chứ' = certainly." },
          { question: "'Mà' trong 'Tôi biết mà' nghĩa gì?", questionEn: "What does 'mà' mean?", options: ["But", "Trust me / I assure you", "And", "Or"], answer: 1, explanation: "'Mà' = reassurance.", explanationEn: "'Mà' = reassuring emphasis." },
        ],
      },
    ],
  },
  {
    id: "vn-grammar-advanced",
    title: "Ngữ pháp nâng cao",
    titleEn: "Advanced Grammar",
    icon: "🎓",
    color: "from-purple-500 to-pink-500",
    description: "Cấu trúc phức tạp: từ láy, thành ngữ, văn phong",
    descriptionEn: "Complex structures: reduplication, idioms, register",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-11", title: "Từ láy (Reduplication)", titleEn: "Reduplication Words", level: "advanced",
        theory: `## Từ láy (Reduplication)

Từ láy là **đặc trưng đẹp của tiếng Việt**, tạo nhạc điệu và sắc thái biểu cảm.

### 4 loại từ láy chính

| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Láy toàn phần** | lặp lại nguyên tiếng | xanh xanh, đỏ đỏ, vui vui |
| **Láy âm đầu** | lặp phụ âm đầu | **l**ấp **l**ánh, **l**ung **l**inh, **d**ịu **d**àng |
| **Láy vần** | lặp vần | l**úng** t**úng**, b**ối** r**ối**, l**ơ** th**ơ** |
| **Tượng thanh / tượng hình** | mô phỏng âm thanh / hình ảnh | róc rách, tí tách, lon ton |

### Ví dụ minh họa theo nhóm nghĩa

**🌟 Ánh sáng** — lấp lánh, lung linh, le lói, lờ mờ
- Sao trời **lấp lánh**. *(Stars are sparkling.)*
- Thành phố **lung linh** trong đêm. *(City is shimmering at night.)*

**💧 Âm thanh nước** — róc rách, tí tách, lộp bộp
- Suối chảy **róc rách**. *(Stream gurgles.)*
- Mưa rơi **tí tách** trên mái nhà. *(Rain pitters on the roof.)*

**🚶 Bước đi** — lon ton, lững thững, hối hả
- Em bé chạy **lon ton**. *(Baby toddles.)*
- Ông cụ đi **lững thững**. *(Old man strolls slowly.)*

**💭 Cảm xúc** — bối rối, lúng túng, hồi hộp
- Tôi **bối rối** không biết trả lời. *(I'm confused, don't know what to say.)*
- Cô ấy **lúng túng** khi gặp anh ấy. *(She got flustered seeing him.)*

**🎨 Màu sắc nhẹ** — xanh xanh, đỏ đỏ, vàng vàng
- Cánh đồng lúa **xanh xanh** trải dài. *(The slightly green rice field stretches out.)*

### Tác dụng của từ láy

- **Giảm nhẹ**: xanh → xanh xanh (hơi xanh, không quá đậm).
- **Tăng nhạc tính**: thơ ca, văn xuôi đẹp hơn.
- **Biểu cảm sinh động**: róc rách gợi hình ảnh nước chảy róc rách.

### Lưu ý

- Từ láy thường KHÔNG có nghĩa khi tách rời (vd: **róc**, **rách** đứng riêng không có nghĩa).
- Khi dùng từ láy, người Việt cảm thấy câu văn **mềm mại, có hồn** hơn nhiều.`,
        theoryEn: `## Reduplication (Từ láy)

Reduplication is a **signature beauty of Vietnamese**, creating rhythm and expressive nuance.

### 4 main types

| Type | Pattern | Examples |
|------|---------|----------|
| **Full reduplication** | repeat whole word | xanh xanh, đỏ đỏ, vui vui |
| **Initial consonant** | repeat initial consonant | **l**ấp **l**ánh, **l**ung **l**inh, **d**ịu **d**àng |
| **Rhyme** | repeat rhyme | l**úng** t**úng**, b**ối** r**ối** |
| **Onomatopoeia** | imitate sound/image | róc rách, tí tách, lon ton |

### Examples by theme

**🌟 Light** — lấp lánh, lung linh
- Sao trời **lấp lánh**. (Stars are sparkling.)
- Thành phố **lung linh** trong đêm. (City shimmers at night.)

**💧 Water sounds** — róc rách, tí tách
- Suối chảy **róc rách**. (Stream gurgles.)
- Mưa rơi **tí tách**. (Rain pitters down.)

**🚶 Walking** — lon ton, lững thững
- Em bé chạy **lon ton**. (Baby toddles.)
- Ông cụ đi **lững thững**. (Old man strolls.)

**💭 Feelings** — bối rối, lúng túng
- Tôi **bối rối**. (I'm confused.)
- Cô ấy **lúng túng**. (She's flustered.)

**🎨 Soft colors** — xanh xanh, đỏ đỏ
- Cánh đồng lúa **xanh xanh**. (The rice field is greenish.)

### Effects

- **Softening**: xanh → xanh xanh (a bit green, less intense).
- **Adds music**: makes poetry / prose more lyrical.
- **Vivid imagery**: róc rách evokes the sound of trickling water.

### Notes

- Reduplicated syllables often have NO meaning alone (e.g., **róc**, **rách** are meaningless apart).
- Native speakers feel reduplicated phrases are **softer and more soulful**.`,
        vocabulary: [
          { word: "lấp lánh", meaning: "sáng lung linh", meaningEn: "sparkling", example: "Sao trời lấp lánh.", exampleEn: "Stars are sparkling.", partOfSpeech: "adjective" },
          { word: "lúng túng", meaning: "bối rối", meaningEn: "flustered", example: "Anh ấy lúng túng.", exampleEn: "He was flustered.", partOfSpeech: "adjective" },
          { word: "róc rách", meaning: "tiếng nước chảy", meaningEn: "gurgling sound", example: "Suối chảy róc rách.", exampleEn: "Stream gurgles.", partOfSpeech: "adverb" },
          { word: "lon ton", meaning: "chạy bước nhỏ nhanh", meaningEn: "toddling", example: "Em bé chạy lon ton.", exampleEn: "Baby toddles.", partOfSpeech: "adverb" },
          { word: "xanh xanh", meaning: "hơi xanh", meaningEn: "greenish / slightly green", example: "Cánh đồng xanh xanh.", exampleEn: "The field is greenish.", partOfSpeech: "adjective" },
          { word: "đỏ đỏ", meaning: "hơi đỏ", meaningEn: "reddish", example: "Mặt đỏ đỏ.", exampleEn: "Face is reddish.", partOfSpeech: "adjective" },
          { word: "lung linh", meaning: "ánh sáng đẹp", meaningEn: "glistening / shimmering", example: "Thành phố lung linh.", exampleEn: "City is shimmering.", partOfSpeech: "adjective" },
          { word: "tí tách", meaning: "tiếng giọt nước", meaningEn: "dripping sound", example: "Mưa rơi tí tách.", exampleEn: "Rain drips.", partOfSpeech: "adverb" },
          { word: "bối rối", meaning: "không biết làm gì", meaningEn: "confused / bewildered", example: "Tôi bối rối.", exampleEn: "I'm confused.", partOfSpeech: "adjective" },
          { word: "dịu dàng", meaning: "nhẹ nhàng, hiền", meaningEn: "gentle / tender", example: "Cô ấy rất dịu dàng.", exampleEn: "She is very gentle.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Lấp lánh' là loại từ láy gì?", questionEn: "What type?", options: ["Toàn phần", "Âm đầu", "Vần", "Tượng thanh"], answer: 1, explanation: "Láy âm đầu 'l'.", explanationEn: "Initial consonant 'l'." },
          { question: "'Xanh xanh' là loại gì?", questionEn: "What type?", options: ["Toàn phần", "Âm đầu", "Vần", "Tượng thanh"], answer: 0, explanation: "Láy toàn phần (xanh + xanh).", explanationEn: "Full reduplication." },
          { question: "Từ láy có tác dụng gì?", questionEn: "What effect?", options: ["Phủ định", "Biểu cảm, sinh động", "Câu hỏi", "So sánh"], answer: 1, explanation: "Tạo sắc thái biểu cảm.", explanationEn: "Creates expressive nuance." },
          { question: "'Tí tách' mô phỏng âm gì?", questionEn: "What sound?", options: ["Gió thổi", "Nước nhỏ giọt", "Chim hót", "Xe chạy"], answer: 1, explanation: "Tiếng nước nhỏ giọt.", explanationEn: "Dripping water sound." },
          { question: "'Lúng túng' thuộc loại láy gì?", questionEn: "What type?", options: ["Toàn phần", "Âm đầu", "Vần", "Tượng thanh"], answer: 2, explanation: "Láy vần '-úng'.", explanationEn: "Rhyme reduplication '-úng'." },
        ],
      },
      {
        id: "vn-gram-12", title: "Thành ngữ thông dụng", titleEn: "Common Idioms", level: "advanced",
        theory: `## Thành ngữ Việt Nam thông dụng

Thành ngữ là **cụm từ cố định mang nghĩa bóng** (figurative), thường rút ra từ đời sống, văn hóa, nông nghiệp Việt Nam.

### Top 10 thành ngữ phổ biến

| Thành ngữ | Nghĩa bóng | Tình huống dùng |
|----------|-----------|----------------|
| 🐸 **Ếch ngồi đáy giếng** | Tầm nhìn hẹp, không biết thế giới rộng lớn | Khi ai đó tự cao mà thiếu hiểu biết |
| 🦆 **Nước đổ đầu vịt** | Nói mà không tiếp thu | Khi lời khuyên bị bỏ ngoài tai |
| 👟 **Đi guốc trong bụng** | Hiểu rõ tâm ý ai đó | Khi đoán đúng suy nghĩ người khác |
| 🍚 **Ăn cháo đá bát** | Vô ơn, phản bội ân nhân | Phê phán người vô ơn |
| 💧 **Uống nước nhớ nguồn** | Biết ơn cội nguồn | Tưởng nhớ ơn người đi trước |
| 🐮 **Đầu voi đuôi chuột** | Bắt đầu hoành tráng, kết thúc nhỏ bé | Việc làm dang dở |
| 🌧 **Mưa thuận gió hòa** | Thuận lợi, suôn sẻ | Chúc may mắn |
| 🌹 **Lá lành đùm lá rách** | Người khá giả giúp người khó khăn | Tinh thần tương thân |
| 🐯 **Trống đánh xuôi, kèn thổi ngược** | Không phối hợp, mỗi người một hướng | Khi tập thể không thống nhất |
| ⏳ **Có công mài sắt, có ngày nên kim** | Kiên trì sẽ thành công | Khuyến khích cố gắng |

### Ví dụ minh họa trong câu

- Đừng làm **ếch ngồi đáy giếng**, hãy đi du lịch để mở mang tầm mắt.
- Mẹ khuyên mãi nhưng **nước đổ đầu vịt**.
- Tôi **đi guốc trong bụng** bạn rồi, không cần giải thích.
- Người Việt luôn dạy con cháu **uống nước nhớ nguồn**.
- Cứ kiên trì, **có công mài sắt có ngày nên kim**.

### Mẹo học thành ngữ

1. **Hiểu hình ảnh** trước (ếch, vịt, guốc…) — rồi mới hiểu nghĩa bóng.
2. **Học theo chủ đề**: thành ngữ về biết ơn, kiên trì, cảnh báo…
3. **Dùng đúng tình huống** — dùng sai sẽ lố hoặc gây cười.
4. Đọc ca dao, tục ngữ Việt Nam để cảm nhận sâu hơn.`,
        theoryEn: `## Common Vietnamese Idioms

Idioms are **fixed phrases with figurative meaning**, often drawn from Vietnamese rural life and culture.

### Top 10 common idioms

| Idiom | Figurative meaning | When to use |
|-------|-------------------|-------------|
| 🐸 **Ếch ngồi đáy giếng** | Narrow worldview (frog in a well) | Someone proud but ignorant |
| 🦆 **Nước đổ đầu vịt** | Words don't sink in (water off a duck) | Advice ignored |
| 👟 **Đi guốc trong bụng** | Reading someone's mind | Guessing correctly |
| 🍚 **Ăn cháo đá bát** | Ingratitude, betrayal | Criticizing ungrateful person |
| 💧 **Uống nước nhớ nguồn** | Remember your roots | Honoring ancestors |
| 🐮 **Đầu voi đuôi chuột** | Grand start, tiny end | Unfinished work |
| 🌧 **Mưa thuận gió hòa** | Smooth and favorable | Wishing good luck |
| 🌹 **Lá lành đùm lá rách** | Better-off help the worse-off | Spirit of solidarity |
| 🐯 **Trống đánh xuôi, kèn thổi ngược** | No coordination | Group out of sync |
| ⏳ **Có công mài sắt, có ngày nên kim** | Patience pays off | Encouraging perseverance |

### Examples in sentences

- Don't be **ếch ngồi đáy giếng**, travel to broaden your mind.
- Mom keeps advising but it's **nước đổ đầu vịt**.
- I **đi guốc trong bụng** you - no need to explain.
- Vietnamese teach children to **uống nước nhớ nguồn**.
- Keep going - **có công mài sắt có ngày nên kim**.

### Tips for learning idioms

1. **Understand the image first** (frog, duck, clogs…) before the figurative meaning.
2. **Group by theme**: gratitude, patience, warnings…
3. **Use in the right situation** — misuse sounds awkward or comical.
4. Read Vietnamese folk poetry (ca dao, tục ngữ) for deeper feel.`,
        vocabulary: [
          { word: "thành ngữ", meaning: "cụm từ cố định", meaningEn: "idiom", example: "Tiếng Việt có nhiều thành ngữ.", exampleEn: "Vietnamese has many idioms.", partOfSpeech: "noun" },
          { word: "nghĩa bóng", meaning: "ý nghĩa ẩn dụ", meaningEn: "figurative meaning", example: "Câu này có nghĩa bóng.", exampleEn: "This has figurative meaning.", partOfSpeech: "noun" },
          { word: "ếch", meaning: "loài lưỡng cư", meaningEn: "frog", example: "Ếch ngồi đáy giếng.", exampleEn: "Frog in a well.", partOfSpeech: "noun" },
          { word: "giếng", meaning: "hố lấy nước", meaningEn: "well", example: "Đáy giếng tối.", exampleEn: "Bottom of the well is dark.", partOfSpeech: "noun" },
          { word: "vịt", meaning: "loài gia cầm", meaningEn: "duck", example: "Nước đổ đầu vịt.", exampleEn: "Water off a duck's head.", partOfSpeech: "noun" },
          { word: "guốc", meaning: "giày gỗ", meaningEn: "wooden clogs", example: "Đi guốc trong bụng.", exampleEn: "Know inside out.", partOfSpeech: "noun" },
          { word: "bát", meaning: "chén ăn cơm", meaningEn: "bowl", example: "Ăn cháo đá bát.", exampleEn: "Bite the hand that feeds.", partOfSpeech: "noun" },
          { word: "nguồn", meaning: "nơi phát sinh", meaningEn: "source / origin", example: "Uống nước nhớ nguồn.", exampleEn: "Remember the source.", partOfSpeech: "noun" },
          { word: "bụng", meaning: "phần giữa cơ thể", meaningEn: "belly / stomach", example: "Đi guốc trong bụng.", exampleEn: "Walk clogs in stomach.", partOfSpeech: "noun" },
          { word: "cháo", meaning: "cơm loãng", meaningEn: "porridge / congee", example: "Ăn cháo đá bát.", exampleEn: "Eat porridge, throw bowl.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ếch ngồi đáy giếng' nghĩa bóng?", questionEn: "Figurative meaning?", options: ["Thông minh", "Hẹp hòi", "Kiên nhẫn", "Lười"], answer: 1, explanation: "Tầm nhìn hạn hẹp.", explanationEn: "Narrow worldview." },
          { question: "'Nước đổ đầu vịt' nghĩa gì?", questionEn: "What does it mean?", options: ["Rất hiệu quả", "Vô ích, không tiếp thu", "Rất lạnh", "Rất nhanh"], answer: 1, explanation: "Nói mà không tiếp thu.", explanationEn: "Words have no effect." },
          { question: "'Đi guốc trong bụng' nghĩa gì?", questionEn: "Meaning?", options: ["Đi giày gỗ", "Hiểu rõ tâm ý ai", "Đau bụng", "Đi xa"], answer: 1, explanation: "Hiểu rõ suy nghĩ người khác.", explanationEn: "Know someone's thoughts." },
          { question: "'Ăn cháo đá bát' dạy gì?", questionEn: "What lesson?", options: ["Biết ơn", "Vô ơn", "Tiết kiệm", "Chăm chỉ"], answer: 1, explanation: "Vô ơn, phản bội.", explanationEn: "Ingratitude, betrayal." },
          { question: "'Uống nước nhớ nguồn' dạy gì?", questionEn: "What lesson?", options: ["Tiết kiệm nước", "Biết ơn cội nguồn", "Uống nhiều nước", "Bơi giỏi"], answer: 1, explanation: "Biết ơn người đi trước.", explanationEn: "Be grateful to predecessors." },
        ],
      },
      {
        id: "vn-gram-13", title: "Trợ từ và ngữ khí từ", titleEn: "Particles & Sentence-Final Words", level: "advanced",
        theory: `## Trợ từ và ngữ khí từ cuối câu

Ngữ khí từ là **gia vị của tiếng Việt** — thay đổi sắc thái câu mà không đổi nghĩa cơ bản.

### Bảng tổng hợp

| Từ | Sắc thái | Ví dụ |
|----|----------|-------|
| **ạ** | kính trọng (với người lớn) | Vâng **ạ**. / Em chào cô **ạ**. |
| **nhé** | thân mật, đề nghị (Bắc) | Đi ăn **nhé**! |
| **nha** | thân mật, đề nghị (Nam) | Đi ăn **nha**! |
| **đi** | thúc giục | Ăn **đi**! / Nhanh lên **đi**! |
| **nào** | rủ rê, cổ vũ | Đi **nào**! / Cố lên **nào**! |
| **chứ** | tất nhiên, khẳng định | Đi **chứ**! *(Of course!)* |
| **mà** | trấn an, giải thích | Tôi biết **mà**! *(Trust me!)* |
| **hả / hử** | hỏi lại, ngạc nhiên | Thật **hả**? |
| **đấy / đó** | nhấn mạnh, lưu ý | Tôi biết **đấy**. |
| **thôi** | dừng lại, chỉ vậy | Đủ rồi, dừng **thôi**! |
| **cơ** | đòi hỏi, không hài lòng (Bắc) | Tôi muốn cái kia **cơ**. |

### Cùng một câu — đổi sắc thái

Câu gốc: **"Đi ăn cơm."** (đi ăn cơm)

- Đi ăn cơm **đi**! — thúc giục
- Đi ăn cơm **nhé**! — đề nghị thân mật
- Đi ăn cơm **ạ**. — lễ phép với người lớn
- Đi ăn cơm **nào**! — cổ vũ rủ rê
- Đi ăn cơm **không**? — hỏi

### Ví dụ thực tế

- Em chào thầy **ạ**! *(Hello teacher - polite)*
- Mình đi xem phim **nhé**! *(Let's see a movie - friendly suggestion)*
- Cố lên **nào**! *(Come on, keep going!)*
- Đẹp **chứ**! *(Of course it's pretty!)*
- Tớ làm được **mà**! *(I can do it, trust me!)*

### Lưu ý quan trọng

- Ngữ khí từ thường **chỉ dùng trong văn nói**, hiếm xuất hiện trong văn viết trang trọng.
- **Ạ** rất quan trọng khi nói chuyện với người lớn tuổi — thiếu **ạ** có thể bị xem là vô lễ.
- Người Nam thường dùng **nha, nghen** thay cho **nhé** của người Bắc.`,
        theoryEn: `## Sentence-Final Particles

Particles are the **spices of Vietnamese** — they shift the tone of a sentence without changing the core meaning.

### Reference table

| Particle | Nuance | Example |
|----------|--------|---------|
| **ạ** | respectful (to elders) | Vâng **ạ**. (Yes, sir/ma'am.) |
| **nhé** | friendly suggestion (North) | Đi ăn **nhé**! (Let's eat!) |
| **nha** | friendly suggestion (South) | Đi ăn **nha**! |
| **đi** | urging | Ăn **đi**! (Eat!) |
| **nào** | inviting, cheering | Đi **nào**! (Come on, let's go!) |
| **chứ** | of course, affirmation | Đi **chứ**! (Of course I'll go!) |
| **mà** | reassurance | Tôi biết **mà**! (Trust me!) |
| **hả / hử** | echo question, surprise | Thật **hả**? (Really?) |
| **đấy / đó** | emphasis | Tôi biết **đấy**. |
| **thôi** | enough, just | Đủ rồi, dừng **thôi**! |
| **cơ** | insistence (North) | Tôi muốn cái kia **cơ**. |

### Same sentence — different tone

Base: **"Đi ăn cơm."** (Go eat.)

- Đi ăn cơm **đi**! — urging
- Đi ăn cơm **nhé**! — friendly suggestion
- Đi ăn cơm **ạ**. — polite to elder
- Đi ăn cơm **nào**! — cheering invitation
- Đi ăn cơm **không**? — question

### Real-life examples

- Em chào thầy **ạ**! (Hello teacher - polite)
- Mình đi xem phim **nhé**! (Let's see a movie!)
- Cố lên **nào**! (Come on, keep going!)
- Đẹp **chứ**! (Of course it's pretty!)
- Tớ làm được **mà**! (I can do it, trust me!)

### Important notes

- Particles are mostly used in **spoken language**, rare in formal writing.
- **Ạ** is essential when talking to elders — missing it can sound rude.
- Southerners often use **nha, nghen** instead of Northern **nhé**.`,
        vocabulary: [
          { word: "nhé", meaning: "thân mật, đề nghị", meaningEn: "friendly particle", example: "Đi ăn nhé!", exampleEn: "Let's eat!", partOfSpeech: "particle" },
          { word: "ạ", meaning: "kính trọng", meaningEn: "respectful particle", example: "Vâng ạ.", exampleEn: "Yes (respectfully).", partOfSpeech: "particle" },
          { word: "thôi", meaning: "dừng, đi thôi", meaningEn: "let's / enough", example: "Đi thôi!", exampleEn: "Let's go!", partOfSpeech: "particle" },
          { word: "mà", meaning: "giải thích", meaningEn: "explanatory particle", example: "Tôi biết mà.", exampleEn: "I know (trust me).", partOfSpeech: "particle" },
          { word: "hả", meaning: "ngạc nhiên", meaningEn: "surprise particle", example: "Thật hả?", exampleEn: "Really?", partOfSpeech: "particle" },
          { word: "đi", meaning: "thúc giục", meaningEn: "urging particle", example: "Ăn đi!", exampleEn: "Eat!", partOfSpeech: "particle" },
          { word: "nào", meaning: "rủ rê", meaningEn: "invitation particle", example: "Đi nào!", exampleEn: "Let's go!", partOfSpeech: "particle" },
          { word: "chứ", meaning: "khẳng định", meaningEn: "affirmative particle", example: "Đẹp chứ!", exampleEn: "Beautiful, right!", partOfSpeech: "particle" },
          { word: "sao", meaning: "ngạc nhiên, hỏi", meaningEn: "how come / why", example: "Sao vậy?", exampleEn: "How come?", partOfSpeech: "particle" },
          { word: "nha", meaning: "nhé (miền Nam)", meaningEn: "friendly (southern)", example: "Đi nha!", exampleEn: "Let's go! (southern)", partOfSpeech: "particle" },
        ],
        quiz: [
          { question: "'Ạ' thể hiện gì?", questionEn: "What does 'ạ' express?", options: ["Thân mật", "Kính trọng", "Ngạc nhiên", "Tức giận"], answer: 1, explanation: "Sự kính trọng.", explanationEn: "Respect." },
          { question: "'Nhé' thể hiện gì?", questionEn: "What does 'nhé' express?", options: ["Kính trọng", "Thân mật / đề nghị", "Tức giận", "Buồn"], answer: 1, explanation: "Thân mật.", explanationEn: "Friendly / suggestion." },
          { question: "'Hả' thể hiện gì?", questionEn: "What does 'hả' express?", options: ["Đồng ý", "Ngạc nhiên", "Kính trọng", "Buồn"], answer: 1, explanation: "'Hả' = surprise.", explanationEn: "'Hả' = surprise." },
          { question: "'Nha' là biến thể vùng nào?", questionEn: "Which region uses 'nha'?", options: ["Bắc", "Trung", "Nam", "Tất cả"], answer: 2, explanation: "'Nha' = miền Nam.", explanationEn: "'Nha' = southern variant." },
          { question: "'Đi' trong 'Ăn đi!' có tác dụng gì?", questionEn: "What does 'đi' do in 'Ăn đi!'?", options: ["Hỏi", "Thúc giục", "Phủ định", "So sánh"], answer: 1, explanation: "'Đi' = urging.", explanationEn: "'Đi' = urging particle." },
        ],
      },
      {
        id: "vn-gram-14", title: "Câu cảm thán và câu mệnh lệnh", titleEn: "Exclamatory & Imperative", level: "intermediate",
        theory: `## Câu cảm thán và câu mệnh lệnh

### 1. Câu cảm thán (Exclamatory)

Diễn tả cảm xúc mạnh: vui, buồn, ngạc nhiên, thán phục…

**Công thức phổ biến:**
- [Tính từ] + **quá / lắm / thật**!
- **Ôi / Chà / Trời ơi** + [câu]!

**Ví dụ:**
- Đẹp **quá**! / Đẹp **thật**! / Đẹp **lắm**!
- **Ôi**, nóng **quá**!
- **Trời ơi**, sợ **quá**!
- **Chà**, giỏi **thật**!

### 2. Câu mệnh lệnh (Imperative)

Yêu cầu, ra lệnh, khuyên nhủ.

**Công thức:**
- **Hãy** + V! *(Yêu cầu trang trọng)*
- V + **đi / nào**! *(Thúc giục thân mật)*
- **Đừng** + V! *(Cấm)*

**Ví dụ tích cực (khuyến khích):**
- **Hãy** cố gắng lên! *(Try hard!)*
- Ăn **đi**! / Đi học **đi**!
- Cố lên **nào**!

**Ví dụ phủ định (cấm):**
- **Đừng** lo! *(Don't worry!)*
- **Đừng** đi vào! *(Don't go in!)*
- **Chớ** vội tin. *(Don't be hasty - formal.)*

### Bảng tổng hợp

| Loại | Mục đích | Từ chính | Ví dụ |
|------|----------|----------|-------|
| Cảm thán | bộc lộ cảm xúc | quá, thật, lắm, ôi | Đẹp **quá**! |
| Mệnh lệnh + | yêu cầu làm | hãy, đi, nào | **Hãy** học chăm! |
| Mệnh lệnh − | cấm | đừng, chớ, không | **Đừng** khóc! |

### Mức độ lịch sự khi ra mệnh lệnh

Từ thân mật → trang trọng:
1. **Đi đi!** *(thân mật, ngắn gọn)*
2. **Hãy đi đi!** *(trung tính)*
3. **Anh hãy đi nhé!** *(thêm chủ ngữ + nhé — lịch sự hơn)*
4. **Xin anh vui lòng đi.** *(rất trang trọng)*

### Lưu ý

- **Đừng** + V (không có chủ ngữ) là cách phổ biến nhất.
- Thêm **nhé** sau câu mệnh lệnh để câu nhẹ nhàng hơn: "Đừng quên **nhé**!"`,
        theoryEn: `## Exclamatory & Imperative Sentences

### 1. Exclamatory sentences

Express strong emotion: joy, sadness, surprise, admiration…

**Common patterns:**
- [Adjective] + **quá / lắm / thật**!
- **Ôi / Chà / Trời ơi** + [sentence]!

**Examples:**
- Đẹp **quá**! / Đẹp **thật**! / Đẹp **lắm**! (So beautiful!)
- **Ôi**, nóng **quá**! (Oh, so hot!)
- **Trời ơi**, sợ **quá**! (Oh my god, so scary!)
- **Chà**, giỏi **thật**! (Wow, really talented!)

### 2. Imperative sentences

Commands, requests, advice.

**Patterns:**
- **Hãy** + V! (formal request)
- V + **đi / nào**! (informal urging)
- **Đừng** + V! (prohibition)

**Positive (encouraging) examples:**
- **Hãy** cố gắng lên! (Try hard!)
- Ăn **đi**! (Eat!) / Đi học **đi**! (Go study!)
- Cố lên **nào**! (Come on, keep going!)

**Negative (prohibition) examples:**
- **Đừng** lo! (Don't worry!)
- **Đừng** đi vào! (Don't go in!)
- **Chớ** vội tin. (Don't be hasty - formal.)

### Summary

| Type | Purpose | Markers | Example |
|------|---------|---------|---------|
| Exclamatory | express emotion | quá, thật, lắm, ôi | Đẹp **quá**! |
| Imperative + | request to do | hãy, đi, nào | **Hãy** học chăm! |
| Imperative − | prohibition | đừng, chớ | **Đừng** khóc! |

### Politeness scale for commands

From casual → formal:
1. **Đi đi!** (casual, brief)
2. **Hãy đi đi!** (neutral)
3. **Anh hãy đi nhé!** (with subject + nhé — softer)
4. **Xin anh vui lòng đi.** (very formal)

### Notes

- **Đừng** + V (no subject) is the most common form.
- Add **nhé** to soften commands: "Đừng quên **nhé**!"`,
        vocabulary: [
          { word: "quá", meaning: "rất, lắm (cảm thán)", meaningEn: "so / too much", example: "Nóng quá!", exampleEn: "So hot!", partOfSpeech: "adverb" },
          { word: "hãy", meaning: "yêu cầu làm", meaningEn: "please do", example: "Hãy cố gắng!", exampleEn: "Try hard!", partOfSpeech: "adverb" },
          { word: "thật", meaning: "thực sự", meaningEn: "truly", example: "Thật tuyệt!", exampleEn: "Truly wonderful!", partOfSpeech: "adverb" },
          { word: "ôi", meaning: "cảm thán", meaningEn: "oh (exclamation)", example: "Ôi, đẹp quá!", exampleEn: "Oh, so beautiful!", partOfSpeech: "interjection" },
          { word: "đừng", meaning: "cấm", meaningEn: "don't", example: "Đừng lo!", exampleEn: "Don't worry!", partOfSpeech: "adverb" },
          { word: "chà", meaning: "ngạc nhiên thán phục", meaningEn: "wow (admiration)", example: "Chà, giỏi quá!", exampleEn: "Wow, so talented!", partOfSpeech: "interjection" },
          { word: "trời ơi", meaning: "cảm thán mạnh", meaningEn: "oh my God", example: "Trời ơi, sợ quá!", exampleEn: "Oh my God, so scary!", partOfSpeech: "interjection" },
          { word: "nào", meaning: "rủ / thúc giục", meaningEn: "come on / let's", example: "Đi nào!", exampleEn: "Come on, let's go!", partOfSpeech: "particle" },
          { word: "lại đây", meaning: "đến đây", meaningEn: "come here", example: "Lại đây nào!", exampleEn: "Come here!", partOfSpeech: "phrase" },
          { word: "cẩn thận", meaning: "coi chừng", meaningEn: "be careful", example: "Cẩn thận nhé!", exampleEn: "Be careful!", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Đẹp quá!' là loại câu gì?", questionEn: "What type?", options: ["Câu hỏi", "Câu cảm thán", "Phủ định", "Bị động"], answer: 1, explanation: "Câu cảm thán.", explanationEn: "Exclamatory sentence." },
          { question: "'Hãy' dùng cho loại câu gì?", questionEn: "What type uses 'hãy'?", options: ["Câu hỏi", "Câu mệnh lệnh", "Câu cảm thán", "Câu bị động"], answer: 1, explanation: "'Hãy' = imperative.", explanationEn: "'Hãy' = imperative." },
          { question: "'Trời ơi' thể hiện gì?", questionEn: "What does it express?", options: ["Bình tĩnh", "Cảm xúc mạnh", "Hỏi", "So sánh"], answer: 1, explanation: "Cảm thán mạnh.", explanationEn: "Strong exclamation." },
          { question: "Sự khác biệt giữa 'hãy' và 'đừng'?", questionEn: "Difference?", options: ["Giống nhau", "'Hãy' yêu cầu làm, 'đừng' cấm", "Ngược lại", "Không khác"], answer: 1, explanation: "'Hãy' = do, 'đừng' = don't.", explanationEn: "'Hãy' = do, 'đừng' = don't." },
          { question: "'Đi' trong 'Ăn đi nào!' thể hiện gì?", questionEn: "What does 'đi' express?", options: ["Câu hỏi", "Thúc giục thân mật", "Phủ định", "Quá khứ"], answer: 1, explanation: "Thúc giục.", explanationEn: "Friendly urging." },
        ],
      },
      {
        id: "vn-gram-15", title: "Cấu trúc 'càng…càng' và 'vừa…vừa'", titleEn: "Correlative Structures", level: "advanced",
        theory: `## Cấu trúc tương quan (Correlative)

Đây là những **cặp liên từ** đi đôi với nhau để diễn tả các mối quan hệ phức tạp.

### 1. **càng … càng** — the more … the more

Diễn tả **mức độ tăng song song**.

- **Càng** học **càng** giỏi. *(The more you study, the better.)*
- **Càng** ăn **càng** ngon. *(The more I eat, the tastier.)*
- **Càng** lớn **càng** thông minh.
- Trời **càng** ngày **càng** lạnh. *(It gets colder day by day.)*

### 2. **vừa … vừa** — both … and (đồng thời)

Hai hành động **xảy ra cùng lúc** hoặc hai tính chất song song.

- **Vừa** hát **vừa** nhảy. *(Both singing and dancing.)*
- **Vừa** đi **vừa** ăn. *(Eating while walking.)*
- Cô ấy **vừa** xinh **vừa** giỏi. *(She's both pretty and smart.)*
- Trời **vừa** lạnh **vừa** ẩm.

### 3. **không những … mà còn** — not only … but also

Nhấn mạnh **thêm vào** một đặc điểm khác.

- Cô ấy **không những** thông minh **mà còn** chăm chỉ.
- Phở **không những** ngon **mà còn** rẻ.
- Anh ấy **không những** giỏi tiếng Anh **mà còn** biết tiếng Nhật.

### 4. **ngoài … ra (còn)** — besides … (also)

- **Ngoài** tiếng Việt **ra**, tôi **còn** biết tiếng Anh.
- **Ngoài** học **ra**, em **còn** chơi thể thao.

### 5. **chẳng những … mà** — biến thể trang trọng của 'không những … mà còn'

- **Chẳng những** không giúp **mà** còn phá. *(Not only didn't help but also ruined.)*

### Bảng tổng hợp

| Cặp | Quan hệ | Tiếng Anh |
|-----|---------|-----------|
| càng … càng | tăng song song | the more … the more |
| vừa … vừa | đồng thời | both … and |
| không những … mà còn | thêm vào | not only … but also |
| ngoài … ra (còn) | bổ sung | besides … (also) |
| chẳng những … mà | thêm (formal) | not only … but |

### Ví dụ tổng hợp

- **Càng** học tiếng Việt, tôi **càng** thấy thú vị.
- **Vừa** làm việc **vừa** nghe nhạc giúp tôi tập trung hơn.
- Hà Nội **không những** đẹp **mà còn** có lịch sử lâu đời.
- **Ngoài** phở **ra**, Việt Nam **còn** nổi tiếng với bún chả.

### Lỗi thường gặp
- ❌ **Càng** học giỏi. → ✅ **Càng** học **càng** giỏi. (phải có 2 vế)
- ❌ **Vừa** xinh, **rất** giỏi. → ✅ **Vừa** xinh **vừa** giỏi.`,
        theoryEn: `## Correlative Structures

These are **paired conjunctions** that express complex relationships.

### 1. **càng … càng** — the more … the more

Expresses **parallel increase**.

- **Càng** học **càng** giỏi. (The more you study, the better.)
- **Càng** ăn **càng** ngon. (The more I eat, the tastier.)
- **Càng** lớn **càng** thông minh.
- Trời **càng** ngày **càng** lạnh. (Colder day by day.)

### 2. **vừa … vừa** — both … and (simultaneously)

Two actions **at the same time** or two parallel qualities.

- **Vừa** hát **vừa** nhảy. (Singing and dancing.)
- **Vừa** đi **vừa** ăn. (Eating while walking.)
- Cô ấy **vừa** xinh **vừa** giỏi. (She's both pretty and smart.)
- Trời **vừa** lạnh **vừa** ẩm.

### 3. **không những … mà còn** — not only … but also

Emphasizes an **additional** feature.

- Cô ấy **không những** thông minh **mà còn** chăm chỉ.
- Phở **không những** ngon **mà còn** rẻ.
- Anh ấy **không những** giỏi tiếng Anh **mà còn** biết tiếng Nhật.

### 4. **ngoài … ra (còn)** — besides … (also)

- **Ngoài** tiếng Việt **ra**, tôi **còn** biết tiếng Anh.
- **Ngoài** học **ra**, em **còn** chơi thể thao.

### 5. **chẳng những … mà** — formal variant of 'không những … mà còn'

- **Chẳng những** không giúp **mà** còn phá. (Not only didn't help but ruined.)

### Reference

| Pair | Relation | English |
|------|----------|---------|
| càng … càng | parallel increase | the more … the more |
| vừa … vừa | simultaneous | both … and |
| không những … mà còn | additive | not only … but also |
| ngoài … ra (còn) | besides | besides … (also) |

### Combined examples

- **Càng** học tiếng Việt, tôi **càng** thấy thú vị.
- **Vừa** làm việc **vừa** nghe nhạc giúp tôi tập trung hơn.
- Hà Nội **không những** đẹp **mà còn** có lịch sử lâu đời.
- **Ngoài** phở **ra**, Việt Nam **còn** nổi tiếng với bún chả.

### Common mistakes
- ❌ **Càng** học giỏi. → ✅ **Càng** học **càng** giỏi. (need both halves)
- ❌ **Vừa** xinh, **rất** giỏi. → ✅ **Vừa** xinh **vừa** giỏi.`,
        vocabulary: [
          { word: "càng", meaning: "mức độ tăng", meaningEn: "the more (correlative)", example: "Càng học càng giỏi.", exampleEn: "The more you study, the better.", partOfSpeech: "adverb" },
          { word: "vừa", meaning: "cùng lúc", meaningEn: "simultaneously", example: "Vừa hát vừa nhảy.", exampleEn: "Singing and dancing.", partOfSpeech: "adverb" },
          { word: "không những", meaning: "không chỉ", meaningEn: "not only", example: "Không những giỏi mà còn đẹp.", exampleEn: "Not only smart but also beautiful.", partOfSpeech: "conjunction" },
          { word: "mà còn", meaning: "ngoài ra còn", meaningEn: "but also", example: "Giỏi mà còn khiêm tốn.", exampleEn: "Smart and also modest.", partOfSpeech: "conjunction" },
          { word: "vừa…vừa", meaning: "đồng thời", meaningEn: "both…and", example: "Vừa ăn vừa nói.", exampleEn: "Eating and talking.", partOfSpeech: "conjunction" },
          { word: "ngoài…ra", meaning: "thêm vào đó", meaningEn: "besides / in addition", example: "Ngoài học ra, tôi còn chơi thể thao.", exampleEn: "Besides studying, I play sports.", partOfSpeech: "conjunction" },
          { word: "chẳng những…mà", meaning: "không chỉ…mà", meaningEn: "not only…but", example: "Chẳng những không giúp mà còn phá.", exampleEn: "Not only didn't help but also ruined.", partOfSpeech: "conjunction" },
          { word: "khiêm tốn", meaning: "không khoe khoang", meaningEn: "modest / humble", example: "Anh ấy rất khiêm tốn.", exampleEn: "He is very modest.", partOfSpeech: "adjective" },
          { word: "giỏi", meaning: "tài năng", meaningEn: "talented / good at", example: "Cô ấy rất giỏi.", exampleEn: "She is very talented.", partOfSpeech: "adjective" },
          { word: "đồng thời", meaning: "cùng lúc", meaningEn: "simultaneously / at the same time", example: "Đồng thời làm hai việc.", exampleEn: "Do two things at once.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Càng học càng giỏi' nghĩa gì?", questionEn: "What does it mean?", options: ["Study less", "The more studying, the better", "Don't study", "Study enough"], answer: 1, explanation: "The more…the more.", explanationEn: "The more you study, the better." },
          { question: "'Vừa…vừa' diễn đạt gì?", questionEn: "What does 'vừa…vừa' express?", options: ["Lần lượt", "Đồng thời", "Phủ định", "So sánh"], answer: 1, explanation: "Hai hành động cùng lúc.", explanationEn: "Simultaneous actions." },
          { question: "'Không những…mà còn' nghĩa gì?", questionEn: "Meaning?", options: ["Either…or", "Not only…but also", "Neither…nor", "Both…and"], answer: 1, explanation: "Not only…but also.", explanationEn: "Not only…but also." },
          { question: "Cấu trúc nào diễn đạt 'càng…càng'?", questionEn: "Which expresses 'the more…the more'?", options: ["vừa…vừa", "không những…mà còn", "càng…càng", "ngoài…ra"], answer: 2, explanation: "'Càng…càng'.", explanationEn: "'Càng…càng'." },
          { question: "'Ngoài…ra' nghĩa gì?", questionEn: "What does 'ngoài…ra' mean?", options: ["Only", "Besides / in addition to", "Without", "Instead of"], answer: 1, explanation: "'Ngoài…ra' = besides.", explanationEn: "'Ngoài…ra' = besides." },
        ],
      },
      {
        id: "vn-gram-31", title: "Câu chẻ (Cleft sentences)", titleEn: "Cleft Sentences", level: "advanced",
        theory: `## Câu chẻ (Cleft sentences) — Nhấn mạnh

Câu chẻ giúp **nhấn mạnh** một thành phần bằng cách tách nó ra đầu câu, thường dùng cấu trúc **Chính … là …** hoặc **Đó / Đây là …**.

### 1. Cấu trúc **Chính + [thành phần nhấn] + là + [mệnh đề]**

- Câu thường: Anh ấy đã giúp tôi.
- Câu chẻ: **Chính anh ấy là** người đã giúp tôi. *(It was HE who helped me.)*

Thêm ví dụ:
- **Chính tôi** đã làm việc đó. *(I myself did it.)*
- **Chính Hà Nội** là quê hương của tôi.
- **Chính lúc đó** tôi nhận ra sự thật.

### 2. **Đó là / Đây là** — nhấn mạnh điều vừa nói

- **Đó là** lý do tôi không đi. *(That's the reason I didn't go.)*
- **Đây là** vấn đề chính. *(This is the main issue.)*
- **Đó chính là** điều tôi muốn nói. *(That's exactly what I want to say.)*

### 3. Câu chẻ về thời gian, nơi chốn, lý do

| Nhấn mạnh | Cấu trúc | Ví dụ |
|----------|----------|-------|
| Người | Chính + N + là người + V | **Chính cô ấy là người** dạy tôi. |
| Nơi chốn | Đây / Đó là nơi + V | **Đây là nơi** tôi sinh ra. |
| Thời gian | Đó là lúc + V | **Đó là lúc** tôi hiểu ra. |
| Lý do | Đó là lý do + V | **Đó là lý do** tôi đi. |
| Cách thức | Đó là cách + V | **Đó là cách** chúng tôi làm. |

### Ví dụ minh họa

- **Chính** tình yêu **là** điều quan trọng nhất.
- **Đây là** nơi tôi gặp cô ấy lần đầu.
- **Đó là lúc** mọi thứ thay đổi.
- **Đó là lý do** tại sao tôi học tiếng Việt.

### So sánh: câu thường vs câu chẻ

| Câu thường | Câu chẻ (nhấn mạnh) |
|-----------|---------------------|
| Tôi yêu Hà Nội. | **Chính Hà Nội** là nơi tôi yêu. |
| Hôm qua tôi gặp anh ấy. | **Đó là hôm qua** tôi mới gặp anh ấy. |
| Vì mưa nên tôi ở nhà. | **Đó là lý do** tôi ở nhà. |

### Lưu ý

- Câu chẻ làm cho câu **mạnh mẽ, rõ ràng** hơn — thường dùng trong tranh luận, làm rõ.
- Không lạm dụng — câu chẻ quá nhiều sẽ thấy gượng.`,
        theoryEn: `## Cleft Sentences for Emphasis

Cleft sentences **highlight** one element by moving it to the front, typically with **Chính … là …** or **Đó / Đây là …**.

### 1. **Chính + [emphasized] + là + [clause]**

- Plain: Anh ấy đã giúp tôi.
- Cleft: **Chính anh ấy là** người đã giúp tôi. (It was HE who helped me.)

More:
- **Chính tôi** đã làm việc đó. (I myself did it.)
- **Chính Hà Nội** là quê hương của tôi.
- **Chính lúc đó** tôi nhận ra sự thật.

### 2. **Đó là / Đây là** — emphasize a topic

- **Đó là** lý do tôi không đi. (That's the reason I didn't go.)
- **Đây là** vấn đề chính. (This is the main issue.)
- **Đó chính là** điều tôi muốn nói. (That's exactly what I want to say.)

### 3. Cleft by element type

| Emphasis | Structure | Example |
|----------|-----------|---------|
| Person | Chính + N + là người + V | **Chính cô ấy là người** dạy tôi. |
| Place | Đây / Đó là nơi + V | **Đây là nơi** tôi sinh ra. |
| Time | Đó là lúc + V | **Đó là lúc** tôi hiểu ra. |
| Reason | Đó là lý do + V | **Đó là lý do** tôi đi. |
| Manner | Đó là cách + V | **Đó là cách** chúng tôi làm. |

### Plain vs cleft

| Plain | Cleft |
|-------|-------|
| Tôi yêu Hà Nội. | **Chính Hà Nội** là nơi tôi yêu. |
| Hôm qua tôi gặp anh ấy. | **Đó là hôm qua** tôi mới gặp anh ấy. |
| Vì mưa nên tôi ở nhà. | **Đó là lý do** tôi ở nhà. |

### Notes

- Cleft sentences make statements **stronger and clearer** — useful in debate or clarification.
- Don't overuse — too many cleft sentences feel forced.`,
        vocabulary: [
          { word: "chính", meaning: "đúng là", meaningEn: "exactly / it is", example: "Chính bạn đã nói.", exampleEn: "It was YOU who said it.", partOfSpeech: "adverb" },
          { word: "đó là", meaning: "cái đó là", meaningEn: "that is", example: "Đó là lý do.", exampleEn: "That is the reason.", partOfSpeech: "phrase" },
          { word: "đây là", meaning: "cái này là", meaningEn: "this is", example: "Đây là sự thật.", exampleEn: "This is the truth.", partOfSpeech: "phrase" },
          { word: "lý do", meaning: "nguyên nhân", meaningEn: "reason", example: "Lý do tôi không đi.", exampleEn: "The reason I didn't go.", partOfSpeech: "noun" },
          { word: "sự thật", meaning: "điều thực tế", meaningEn: "truth", example: "Sự thật là gì?", exampleEn: "What is the truth?", partOfSpeech: "noun" },
          { word: "nơi", meaning: "chỗ, địa điểm", meaningEn: "place / where", example: "Đây là nơi tôi sinh ra.", exampleEn: "This is where I was born.", partOfSpeech: "noun" },
          { word: "người", meaning: "con người", meaningEn: "person / the one who", example: "Chính người đó đã giúp tôi.", exampleEn: "That's the person who helped me.", partOfSpeech: "noun" },
          { word: "vấn đề", meaning: "điều cần giải quyết", meaningEn: "problem / issue", example: "Đó là vấn đề chính.", exampleEn: "That's the main issue.", partOfSpeech: "noun" },
          { word: "điều", meaning: "sự việc", meaningEn: "thing / matter", example: "Điều quan trọng nhất.", exampleEn: "The most important thing.", partOfSpeech: "noun" },
          { word: "quan trọng", meaning: "có ý nghĩa lớn", meaningEn: "important", example: "Điều này rất quan trọng.", exampleEn: "This is very important.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Câu chẻ dùng để làm gì?", questionEn: "What are cleft sentences for?", options: ["Hỏi", "Nhấn mạnh", "Phủ định", "So sánh"], answer: 1, explanation: "Nhấn mạnh.", explanationEn: "To emphasize." },
          { question: "'Chính' trong câu chẻ đứng ở đâu?", questionEn: "Where does 'chính' go?", options: ["Cuối câu", "Trước danh từ cần nhấn mạnh", "Sau động từ", "Giữa câu"], answer: 1, explanation: "Trước thành phần nhấn mạnh.", explanationEn: "Before emphasized element." },
          { question: "'Đó là lý do tôi đi' – nhấn mạnh gì?", questionEn: "What's emphasized?", options: ["Hành động", "Lý do", "Thời gian", "Người"], answer: 1, explanation: "Nhấn mạnh lý do.", explanationEn: "Emphasis on reason." },
          { question: "Câu chẻ thường dùng cấu trúc gì?", questionEn: "Common structure?", options: ["Nếu…thì", "Chính…là / Đó là…", "Vì…nên", "Càng…càng"], answer: 1, explanation: "'Chính…là' hoặc 'Đó là…'.", explanationEn: "'Chính…là' or 'Đó là…'." },
          { question: "'Đây là nơi tôi sinh ra' nhấn mạnh gì?", questionEn: "What's emphasized?", options: ["Thời gian", "Nơi chốn", "Người", "Cách thức"], answer: 1, explanation: "Nhấn mạnh nơi chốn.", explanationEn: "Emphasizes place." },
        ],
      },
      {
        id: "vn-gram-32", title: "Hư từ trong tiếng Việt", titleEn: "Function Words", level: "advanced",
        theory: `## Hư từ (Function Words)

Hư từ là những từ **không mang nghĩa từ vựng riêng** nhưng giữ vai trò ngữ pháp quan trọng (chỉ quan hệ giữa các từ).

### Các nhóm hư từ chính

#### 1. Giới từ chỉ quan hệ

| Hư từ | Nghĩa | Ví dụ |
|------|--------|-------|
| **của** | sở hữu | Sách **của** tôi. |
| **với** | cùng | Đi **với** bạn. |
| **bởi / do** | bởi vì | Tai nạn **do** bất cẩn. |
| **về** | liên quan đến | Nói **về** Việt Nam. |
| **theo** | dựa theo | **Theo** tôi, đúng. |

#### 2. Giới từ chỉ phương hướng / nguồn gốc

- **từ** (from): **Từ** Hà Nội đến Huế.
- **đến / tới** (to): Đi **đến** trường.
- **qua** (through / via): Đi **qua** cầu.

#### 3. Liên từ

- **và, hoặc, nhưng** — đã học ở bài liên từ.

#### 4. Ngữ khí từ

- **ạ, nhé, đấy, mà** — đã học ở bài trợ từ.

### Ví dụ tổng hợp

- Cuốn sách **của** anh **về** lịch sử Việt Nam rất hay.
- **Theo** dự báo, ngày mai sẽ mưa.
- Tôi đi học **với** bạn **từ** 7 giờ sáng **đến** 5 giờ chiều.
- **Bởi** vì mưa to nên chúng tôi không ra ngoài.

### Phân biệt thực từ vs hư từ

| Loại | Có nghĩa từ vựng? | Ví dụ |
|------|-------------------|-------|
| **Thực từ** (content words) | có | nhà, ăn, đẹp, ba |
| **Hư từ** (function words) | không, chỉ có chức năng | của, và, mà, nhé |

### Tại sao quan trọng?

- Bỏ thực từ → câu mất nghĩa.
- Bỏ hư từ → câu **vẫn có thể đoán nghĩa** nhưng **không tự nhiên / không đúng ngữ pháp**.
  - VD: "Sách tôi" (thiếu **của**) → người Việt vẫn hiểu nhưng cảm thấy thiếu.
  - Đúng: "Sách **của** tôi."

### Lưu ý

- Hư từ thường **không thể dịch trực tiếp** sang tiếng Anh; phải hiểu chức năng ngữ pháp.
- Học hư từ qua **ví dụ thực tế** sẽ hiệu quả hơn học định nghĩa.`,
        theoryEn: `## Function Words (Hư từ)

Function words have **no lexical meaning of their own** but play essential grammatical roles (showing relations between words).

### Main groups

#### 1. Relational prepositions

| Word | Meaning | Example |
|------|---------|---------|
| **của** | of (possessive) | Sách **của** tôi. (My book) |
| **với** | with | Đi **với** bạn. (Go with you) |
| **bởi / do** | because of, by | Tai nạn **do** bất cẩn. |
| **về** | about | Nói **về** Việt Nam. |
| **theo** | according to | **Theo** tôi, đúng. (In my view) |

#### 2. Direction / source

- **từ** (from): **Từ** Hà Nội đến Huế.
- **đến / tới** (to): Đi **đến** trường.
- **qua** (through): Đi **qua** cầu.

#### 3. Conjunctions

- **và, hoặc, nhưng** — covered in the conjunctions lesson.

#### 4. Sentence particles

- **ạ, nhé, đấy, mà** — covered in the particles lesson.

### Combined examples

- Cuốn sách **của** anh **về** lịch sử Việt Nam rất hay.
- **Theo** dự báo, ngày mai sẽ mưa.
- Tôi đi học **với** bạn **từ** 7 giờ sáng **đến** 5 giờ chiều.
- **Bởi** vì mưa to nên chúng tôi không ra ngoài.

### Content vs function words

| Type | Has lexical meaning? | Examples |
|------|---------------------|----------|
| **Content words** | yes | nhà, ăn, đẹp, ba |
| **Function words** | no, grammatical role only | của, và, mà, nhé |

### Why important?

- Drop a content word → meaning is lost.
- Drop a function word → meaning is often still guessable but **unnatural / ungrammatical**.
  - "Sách tôi" (missing **của**) → understandable but feels incomplete.
  - Correct: "Sách **của** tôi."

### Notes

- Function words often **don't translate directly** to English; learn them by function.
- Learning from **real examples** is more effective than memorizing definitions.`,
        vocabulary: [
          { word: "của", meaning: "sở hữu", meaningEn: "of / possessive", example: "Sách của tôi.", exampleEn: "My book.", partOfSpeech: "preposition" },
          { word: "và", meaning: "kết hợp", meaningEn: "and", example: "Tôi và bạn.", exampleEn: "You and I.", partOfSpeech: "conjunction" },
          { word: "ở", meaning: "tại", meaningEn: "at / in", example: "Ở đây.", exampleEn: "Here.", partOfSpeech: "preposition" },
          { word: "với", meaning: "cùng", meaningEn: "with", example: "Đi với tôi.", exampleEn: "Go with me.", partOfSpeech: "preposition" },
          { word: "bởi", meaning: "do, vì", meaningEn: "by / because of", example: "Bởi vì mưa.", exampleEn: "Because of rain.", partOfSpeech: "preposition" },
          { word: "về", meaning: "liên quan đến", meaningEn: "about / regarding", example: "Nói về VN.", exampleEn: "Talk about VN.", partOfSpeech: "preposition" },
          { word: "đến", meaning: "tới", meaningEn: "to / until", example: "Đến trường.", exampleEn: "To school.", partOfSpeech: "preposition" },
          { word: "từ", meaning: "bắt đầu từ", meaningEn: "from / since", example: "Từ sáng đến tối.", exampleEn: "From morning to night.", partOfSpeech: "preposition" },
          { word: "theo", meaning: "dựa theo", meaningEn: "according to / follow", example: "Theo tôi biết.", exampleEn: "As far as I know.", partOfSpeech: "preposition" },
          { word: "do", meaning: "bởi, vì", meaningEn: "due to / by", example: "Do thời tiết xấu.", exampleEn: "Due to bad weather.", partOfSpeech: "preposition" },
        ],
        quiz: [
          { question: "'Của' thể hiện gì?", questionEn: "What does 'của' express?", options: ["Thời gian", "Sở hữu", "Nơi chốn", "So sánh"], answer: 1, explanation: "'Của' = possessive.", explanationEn: "'Của' = possessive." },
          { question: "'Với' nghĩa gì?", questionEn: "What does 'với' mean?", options: ["Without", "With", "From", "To"], answer: 1, explanation: "'Với' = with.", explanationEn: "'Với' = with." },
          { question: "Hư từ khác thực từ thế nào?", questionEn: "How do function words differ?", options: ["Mang nghĩa từ vựng", "Chỉ có chức năng ngữ pháp", "Đứng cuối câu", "Không quan trọng"], answer: 1, explanation: "Chỉ có chức năng ngữ pháp.", explanationEn: "Only grammatical function." },
          { question: "'Theo' trong 'Theo tôi' nghĩa gì?", questionEn: "What does 'theo' mean?", options: ["Follow me", "According to me", "From me", "To me"], answer: 1, explanation: "'Theo' = according to.", explanationEn: "'Theo' = according to." },
          { question: "'Do' trong 'Do mưa' nghĩa gì?", questionEn: "What does 'do' mean?", options: ["Despite", "Due to / Because of", "During", "After"], answer: 1, explanation: "'Do' = due to.", explanationEn: "'Do' = due to." },
        ],
      },
      {
        id: "vn-gram-33", title: "Cách dùng 'bao giờ cũng', 'lúc nào cũng'", titleEn: "Always Structures", level: "advanced",
        theory: `## Cấu trúc 'luôn / mọi' với 'cũng' — Diễn tả tính toàn bộ

Tiếng Việt diễn tả **"mọi / tất cả / luôn luôn"** bằng cách ghép **từ hỏi (ai, gì, đâu, bao giờ) + cũng**.

### Quy tắc tổng quát

**[Từ hỏi] + cũng + V** → mang nghĩa "tất cả / mọi…"

### Bảng các cấu trúc

| Cấu trúc | Nghĩa | Ví dụ |
|----------|--------|-------|
| **Ai cũng** | Everyone | **Ai cũng** thích phở. |
| **Gì cũng** | Anything / everything | **Gì cũng** được. |
| **Đâu cũng** | Everywhere | Quán cà phê **đâu cũng** có. |
| **Bao giờ cũng** | Always | Anh ấy **bao giờ cũng** đến đúng giờ. |
| **Lúc nào cũng** | Always | Cô ấy **lúc nào cũng** vui vẻ. |
| **Cái nào cũng** | Any one / all of them | **Cái nào cũng** đẹp. |
| **Bao nhiêu cũng** | Any amount | Bao nhiêu tiền **cũng được**. |

### Ví dụ minh họa

- **Ai cũng** biết Hà Nội là thủ đô. *(Everyone knows Hanoi is the capital.)*
- Tôi đói lắm, **gì cũng** ăn được. *(I'm so hungry, I can eat anything.)*
- Phở **đâu cũng** có ở Việt Nam. *(Pho is everywhere in Vietnam.)*
- Mẹ tôi **bao giờ cũng** dậy sớm. *(My mom always wakes up early.)*
- **Cái nào cũng** đẹp, khó chọn. *(All of them are pretty, hard to choose.)*

### Phủ định: thay 'cũng' bằng 'cũng không / chẳng'

- **Ai cũng không** đến. → Nobody came.
- **Gì cũng không** thích. → Doesn't like anything.
- **Đâu cũng không** có. → It's nowhere.

### Các từ liên quan

| Từ | Nghĩa | Ví dụ |
|----|-------|-------|
| **mỗi** | each (đếm từng cái) | **Mỗi** ngày một bài. |
| **mọi** | every (toàn bộ) | **Mọi** người đều biết. |
| **tất cả** | all | **Tất cả** đều đồng ý. |
| **bất cứ / bất kỳ** | any (nhấn mạnh) | **Bất cứ** lúc nào cũng được. |

### Ví dụ kết hợp

- **Bất cứ ai cũng** có thể học tiếng Việt.
- **Mỗi** ngày tôi học **một chút**, nên **lúc nào cũng** tiến bộ.
- **Tất cả** mọi người **đều** thích món này — **ai cũng** khen.

### Lưu ý

- Cấu trúc này rất phổ biến trong giao tiếp hàng ngày.
- Đừng quên **cũng** — bỏ đi sẽ thành câu hỏi: "Ai đến?" (Who came?) vs "**Ai cũng** đến" (Everyone came).`,
        theoryEn: `## 'Always / Every' Structures with cũng

Vietnamese expresses **"every / all / always"** by combining **a question word (ai, gì, đâu, bao giờ) + cũng**.

### General rule

**[Question word] + cũng + V** → means "all / every…"

### Reference table

| Pattern | Meaning | Example |
|---------|---------|---------|
| **Ai cũng** | Everyone | **Ai cũng** thích phở. |
| **Gì cũng** | Anything / everything | **Gì cũng** được. |
| **Đâu cũng** | Everywhere | Quán cà phê **đâu cũng** có. |
| **Bao giờ cũng** | Always | Anh ấy **bao giờ cũng** đến đúng giờ. |
| **Lúc nào cũng** | Always | Cô ấy **lúc nào cũng** vui vẻ. |
| **Cái nào cũng** | Any one / all | **Cái nào cũng** đẹp. |
| **Bao nhiêu cũng** | Any amount | Bao nhiêu tiền **cũng được**. |

### Examples

- **Everyone** knows Hanoi is the capital.
- I'm so hungry, I can eat **anything**.
- Pho is **everywhere** in Vietnam.
- My mom **always** wakes up early.
- **All of them** are pretty, hard to choose.

### Negative form: replace 'cũng' with 'cũng không / chẳng'

- **Ai cũng không** đến. → Nobody came.
- **Gì cũng không** thích. → Doesn't like anything.
- **Đâu cũng không** có. → It's nowhere.

### Related words

| Word | Meaning | Example |
|------|---------|---------|
| **mỗi** | each | **Mỗi** ngày một bài. (One lesson each day) |
| **mọi** | every | **Mọi** người đều biết. (Everyone knows) |
| **tất cả** | all | **Tất cả** đều đồng ý. (All agree) |
| **bất cứ / bất kỳ** | any (emphatic) | **Bất cứ** lúc nào cũng được. |

### Combined examples

- **Anyone** can learn Vietnamese.
- Each day I study a bit, so I'm **always** improving.
- All people like this dish — **everyone** praises it.

### Notes

- This structure is very common in everyday speech.
- Don't forget **cũng** — without it, it becomes a question: "Ai đến?" (Who came?) vs "**Ai cũng** đến" (Everyone came).`,
        vocabulary: [
          { word: "cũng", meaning: "cũng, luôn", meaningEn: "also / always (with question word)", example: "Ai cũng thích.", exampleEn: "Everyone likes it.", partOfSpeech: "adverb" },
          { word: "bao giờ cũng", meaning: "lúc nào cũng", meaningEn: "always", example: "Bao giờ cũng vậy.", exampleEn: "Always like that.", partOfSpeech: "phrase" },
          { word: "ai cũng", meaning: "mọi người đều", meaningEn: "everyone", example: "Ai cũng biết.", exampleEn: "Everyone knows.", partOfSpeech: "phrase" },
          { word: "gì cũng", meaning: "tất cả đều", meaningEn: "anything / everything", example: "Gì cũng được.", exampleEn: "Anything is fine.", partOfSpeech: "phrase" },
          { word: "đâu cũng", meaning: "mọi nơi đều", meaningEn: "everywhere", example: "Đâu cũng có.", exampleEn: "Available everywhere.", partOfSpeech: "phrase" },
          { word: "lúc nào", meaning: "thời điểm nào", meaningEn: "anytime", example: "Lúc nào cũng vui.", exampleEn: "Always happy.", partOfSpeech: "phrase" },
          { word: "bất cứ", meaning: "bất kỳ", meaningEn: "any (emphatic)", example: "Bất cứ lúc nào.", exampleEn: "At any time.", partOfSpeech: "determiner" },
          { word: "mỗi", meaning: "từng cái một", meaningEn: "each / every", example: "Mỗi ngày một bài.", exampleEn: "One lesson each day.", partOfSpeech: "determiner" },
          { word: "tất cả", meaning: "toàn bộ", meaningEn: "all / everyone", example: "Tất cả đều đồng ý.", exampleEn: "Everyone agrees.", partOfSpeech: "pronoun" },
          { word: "mọi", meaning: "tất cả (trước danh từ)", meaningEn: "every / all", example: "Mọi người ở đây.", exampleEn: "Everyone is here.", partOfSpeech: "determiner" },
        ],
        quiz: [
          { question: "'Ai cũng' nghĩa gì?", questionEn: "What does 'ai cũng' mean?", options: ["Nobody", "Everyone", "Someone", "Anyone"], answer: 1, explanation: "'Ai cũng' = everyone.", explanationEn: "'Ai cũng' = everyone." },
          { question: "'Gì cũng được' nghĩa gì?", questionEn: "Meaning?", options: ["Nothing works", "Anything is fine", "Something specific", "Nothing"], answer: 1, explanation: "Anything is OK.", explanationEn: "Anything is fine." },
          { question: "'Đâu cũng' nghĩa gì?", questionEn: "Meaning?", options: ["Nowhere", "Everywhere", "Somewhere", "Here"], answer: 1, explanation: "'Đâu cũng' = everywhere.", explanationEn: "'Đâu cũng' = everywhere." },
          { question: "Cấu trúc 'từ hỏi + cũng' nghĩa gì?", questionEn: "Pattern meaning?", options: ["Câu hỏi", "Tất cả / mọi", "Phủ định", "So sánh"], answer: 1, explanation: "Question word + cũng = all/every.", explanationEn: "Universal meaning." },
          { question: "'Bao giờ cũng' nghĩa gì?", questionEn: "Meaning?", options: ["Never", "Sometimes", "Always", "Rarely"], answer: 2, explanation: "'Bao giờ cũng' = always.", explanationEn: "'Bao giờ cũng' = always." },
        ],
      },
      {
        id: "vn-gram-34", title: "Văn phong trang trọng và thân mật", titleEn: "Formal vs Informal Register", level: "advanced",
        theory: `## Văn phong trang trọng và thân mật

Tiếng Việt có **2 thang văn phong** chính: trang trọng (formal) và thân mật (informal). Chọn sai văn phong có thể gây hiểu lầm hoặc bất lịch sự.

### So sánh từ vựng theo văn phong

| Ý nghĩa | Trang trọng | Trung tính | Thân mật | Lóng |
|---------|------------|-----------|----------|------|
| Yes | Vâng ạ / Dạ | Vâng | Ừ | Ờ / Ừm |
| No | Không ạ | Không | Không / Hông | Hổng / Hông |
| Thank you | Xin chân thành cảm ơn | Cảm ơn | Cảm ơn nhé | Tks |
| Please | Xin vui lòng | Vui lòng | Làm ơn | – |
| Hello | Kính chào quý vị | Xin chào | Chào bạn | Hi / Hey |
| I | Tôi / em (kính) | Tôi | Mình / Tớ | Tao |
| You | Anh / Chị / Quý vị | Bạn | Cậu | Mày |

### 1. Khi nào dùng TRANG TRỌNG?

- Thư từ, email công việc.
- Thuyết trình, phát biểu.
- Nói chuyện với người lớn tuổi, cấp trên, khách hàng.
- Hội nghị, lễ nghi.

**Ví dụ trang trọng:**
- **Kính gửi** quý khách hàng, công ty chúng tôi **xin chân thành cảm ơn** sự hợp tác.
- **Vâng ạ**, em đã hiểu rồi **ạ**.
- **Xin vui lòng** chờ trong giây lát.

### 2. Khi nào dùng THÂN MẬT?

- Bạn bè, gia đình thân thiết.
- Nhắn tin, mạng xã hội.
- Nói chuyện hàng ngày.

**Ví dụ thân mật:**
- **Ừ**, được rồi, mình đi **nhé**!
- **Cảm ơn cậu nhiều**!
- **Hi mọi người**, mình mới về Việt Nam!

### 3. Lỗi văn phong thường gặp

❌ Trong email gửi sếp: "**Ừ** em hiểu rồi." — quá thân mật!
✅ Sửa lại: "**Vâng ạ**, em đã hiểu **rồi ạ**."

❌ Nhắn tin với bạn thân: "**Kính chào quý vị**, mình rảnh." — quá trang trọng!
✅ Sửa lại: "**Hi cậu, tớ rảnh nha**!"

### 4. Mẹo chọn văn phong

- Quan sát đối phương dùng từ gì — dùng tương đương.
- Khi không chắc → dùng **trung tính** là an toàn nhất.
- Với người lớn tuổi → **luôn dùng "ạ"** ở cuối câu.
- Với người miền Nam → có thể dùng **"dạ"** thay "vâng".

### 5. Vai trò của các từ "ạ", "thưa", "kính"

- **ạ** — đặt cuối câu, thể hiện tôn trọng: "Vâng **ạ**."
- **thưa** — mở đầu khi nói với người lớn: "**Thưa** thầy, em xin phép…"
- **kính** — rất trang trọng: "**Kính gửi** Giám đốc."`,
        theoryEn: `## Formal vs Informal Register

Vietnamese has **two main registers**: formal and informal. Choosing the wrong one can cause misunderstanding or rudeness.

### Vocabulary by register

| Meaning | Formal | Neutral | Casual | Slang |
|---------|--------|---------|--------|-------|
| Yes | Vâng ạ / Dạ | Vâng | Ừ | Ờ / Ừm |
| No | Không ạ | Không | Không / Hông | Hổng |
| Thank you | Xin chân thành cảm ơn | Cảm ơn | Cảm ơn nhé | Tks |
| Please | Xin vui lòng | Vui lòng | Làm ơn | – |
| Hello | Kính chào quý vị | Xin chào | Chào bạn | Hi / Hey |
| I | Tôi / em (respectful) | Tôi | Mình / Tớ | Tao |
| You | Anh / Chị / Quý vị | Bạn | Cậu | Mày |

### 1. When to use FORMAL

- Letters, business emails.
- Presentations, public speeches.
- Speaking with elders, superiors, customers.
- Conferences, ceremonies.

**Formal examples:**
- **Kính gửi** quý khách hàng, công ty chúng tôi **xin chân thành cảm ơn** sự hợp tác.
- **Vâng ạ**, em đã hiểu rồi **ạ**.
- **Xin vui lòng** chờ trong giây lát.

### 2. When to use CASUAL

- Friends, close family.
- Texting, social media.
- Daily conversation.

**Casual examples:**
- **Ừ**, được rồi, mình đi **nhé**!
- **Cảm ơn cậu nhiều**!
- **Hi mọi người**, mình mới về Việt Nam!

### 3. Common register mistakes

❌ Email to boss: "**Ừ** em hiểu rồi." — too casual!
✅ Fix: "**Vâng ạ**, em đã hiểu **rồi ạ**."

❌ Text to close friend: "**Kính chào quý vị**, mình rảnh." — too formal!
✅ Fix: "**Hi cậu, tớ rảnh nha**!"

### 4. Tips

- Mirror the other person's word choices.
- When in doubt → use **neutral** (safest).
- With elders → **always end with "ạ"**.
- With Southerners → **"dạ"** instead of "vâng" is common.

### 5. Role of "ạ", "thưa", "kính"

- **ạ** — sentence end, shows respect: "Vâng **ạ**."
- **thưa** — opening when addressing elders: "**Thưa** thầy, em xin phép…"
- **kính** — very formal: "**Kính gửi** Giám đốc."`,
        vocabulary: [
          { word: "xin", meaning: "lịch sự, trang trọng", meaningEn: "please (formal)", example: "Xin mời ngồi.", exampleEn: "Please have a seat.", partOfSpeech: "verb" },
          { word: "vâng", meaning: "dạ, có (kính trọng)", meaningEn: "yes (respectful)", example: "Vâng ạ.", exampleEn: "Yes (respectfully).", partOfSpeech: "interjection" },
          { word: "dạ", meaning: "vâng (miền Nam)", meaningEn: "yes (southern, respectful)", example: "Dạ, em hiểu.", exampleEn: "Yes, I understand.", partOfSpeech: "interjection" },
          { word: "kính", meaning: "tôn kính", meaningEn: "respectfully", example: "Kính gửi ông.", exampleEn: "Dear Sir (formal).", partOfSpeech: "adverb" },
          { word: "ừ", meaning: "ừ (thân mật)", meaningEn: "yeah (casual)", example: "Ừ, được.", exampleEn: "Yeah, OK.", partOfSpeech: "interjection" },
          { word: "ok", meaning: "đồng ý (khẩu ngữ)", meaningEn: "OK (slang)", example: "OK luôn!", exampleEn: "OK then!", partOfSpeech: "interjection" },
          { word: "quý", meaning: "tôn quý", meaningEn: "honorable / esteemed", example: "Quý ông/bà.", exampleEn: "Ladies and gentlemen.", partOfSpeech: "adjective" },
          { word: "mời", meaning: "yêu cầu lịch sự", meaningEn: "to invite / please", example: "Mời anh uống nước.", exampleEn: "Please have some water.", partOfSpeech: "verb" },
          { word: "cảm ơn", meaning: "biết ơn", meaningEn: "thank you", example: "Cảm ơn nhiều.", exampleEn: "Thank you very much.", partOfSpeech: "phrase" },
          { word: "xin lỗi", meaning: "nói lỗi", meaningEn: "sorry / excuse me", example: "Xin lỗi anh.", exampleEn: "Sorry / Excuse me.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Xin' thường dùng trong ngữ cảnh nào?", questionEn: "When is 'xin' used?", options: ["Thân mật", "Trang trọng", "Tức giận", "Vui vẻ"], answer: 1, explanation: "'Xin' = formal.", explanationEn: "'Xin' = formal." },
          { question: "'Dạ' phổ biến ở vùng nào?", questionEn: "Where is 'dạ' common?", options: ["Bắc", "Trung", "Nam", "Tất cả"], answer: 2, explanation: "'Dạ' = miền Nam.", explanationEn: "'Dạ' = southern Vietnam." },
          { question: "'Ừ' là trang trọng hay thân mật?", questionEn: "Formal or informal?", options: ["Trang trọng", "Thân mật", "Cả hai", "Không xác định"], answer: 1, explanation: "'Ừ' = thân mật.", explanationEn: "'Ừ' = casual." },
          { question: "'Kính gửi' dùng ở đâu?", questionEn: "Where is 'kính gửi' used?", options: ["Tin nhắn bạn bè", "Thư / email trang trọng", "Nói chuyện hàng ngày", "Mạng xã hội"], answer: 1, explanation: "Thư trang trọng.", explanationEn: "Formal letters/emails." },
          { question: "Sự khác biệt giữa 'vâng' và 'ừ'?", questionEn: "Difference?", options: ["Giống nhau", "'Vâng' trang trọng, 'ừ' thân mật", "'Ừ' trang trọng", "Không khác"], answer: 1, explanation: "'Vâng' = formal, 'ừ' = casual.", explanationEn: "'Vâng' formal, 'ừ' casual." },
        ],
      },
      {
        id: "vn-gram-35", title: "Cách trích dẫn trực tiếp và gián tiếp", titleEn: "Direct & Indirect Speech", level: "advanced",
        theory: `## Trích dẫn\n\nTrực tiếp: dùng dấu ngoặc kép\nGián tiếp: dùng 'rằng' hoặc 'là'`,
        theoryEn: `## Direct & Indirect Speech\n\nDirect: quotation marks\nIndirect: use 'rằng' or 'là'`,
        vocabulary: [
          { word: "nói", meaning: "phát ngôn", meaningEn: "to say / to speak", example: "Anh ấy nói rằng sẽ đến.", exampleEn: "He said he would come.", partOfSpeech: "verb" },
          { word: "rằng", meaning: "giới thiệu lời nói gián tiếp", meaningEn: "that (indirect speech)", example: "Cô ấy nói rằng cô ấy bận.", exampleEn: "She said that she was busy.", partOfSpeech: "conjunction" },
          { word: "hỏi", meaning: "đặt câu hỏi", meaningEn: "to ask", example: "Bạn hỏi tôi ở đâu.", exampleEn: "You asked me where.", partOfSpeech: "verb" },
          { word: "kể", meaning: "thuật lại", meaningEn: "to tell / narrate", example: "Ông kể chuyện.", exampleEn: "Grandpa tells stories.", partOfSpeech: "verb" },
          { word: "bảo", meaning: "nói (thân mật)", meaningEn: "to tell (casual)", example: "Mẹ bảo đi học.", exampleEn: "Mom told me to go to school.", partOfSpeech: "verb" },
          { word: "trả lời", meaning: "đáp lại", meaningEn: "to answer / reply", example: "Tôi trả lời rằng đồng ý.", exampleEn: "I replied that I agreed.", partOfSpeech: "verb" },
          { word: "tuyên bố", meaning: "thông báo chính thức", meaningEn: "to declare", example: "Ông ấy tuyên bố nghỉ hưu.", exampleEn: "He declared retirement.", partOfSpeech: "verb" },
          { word: "giải thích", meaning: "làm rõ", meaningEn: "to explain", example: "Cô giáo giải thích bài.", exampleEn: "Teacher explains the lesson.", partOfSpeech: "verb" },
          { word: "đề nghị", meaning: "yêu cầu, gợi ý", meaningEn: "to suggest / propose", example: "Tôi đề nghị họp.", exampleEn: "I suggest a meeting.", partOfSpeech: "verb" },
          { word: "thừa nhận", meaning: "công nhận", meaningEn: "to admit / acknowledge", example: "Anh ấy thừa nhận sai.", exampleEn: "He admitted his mistake.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Rằng' dùng cho loại trích dẫn nào?", questionEn: "What type of speech uses 'rằng'?", options: ["Trực tiếp", "Gián tiếp", "Cả hai", "Không loại nào"], answer: 1, explanation: "'Rằng' = indirect speech.", explanationEn: "'Rằng' for indirect speech." },
          { question: "Trích dẫn trực tiếp dùng dấu gì?", questionEn: "What punctuation for direct?", options: ["Dấu chấm", "Dấu ngoặc kép", "Dấu phẩy", "Dấu hỏi"], answer: 1, explanation: "Dấu ngoặc kép \"…\".", explanationEn: "Quotation marks." },
          { question: "'Bảo' dùng trong ngữ cảnh nào?", questionEn: "When is 'bảo' used?", options: ["Trang trọng", "Thân mật", "Viết luận", "Bài diễn văn"], answer: 1, explanation: "'Bảo' = casual 'nói'.", explanationEn: "'Bảo' = casual 'say/tell'." },
          { question: "Chuyển: Cô ấy nói 'Tôi bận' → gián tiếp?", questionEn: "Convert to indirect?", options: ["Cô ấy nói tôi bận", "Cô ấy nói rằng cô ấy bận", "Cô ấy bận nói", "Tôi bận cô ấy nói"], answer: 1, explanation: "Đổi đại từ + thêm 'rằng'.", explanationEn: "Change pronoun + add 'rằng'." },
          { question: "'Kể' và 'nói' khác nhau thế nào?", questionEn: "How are they different?", options: ["Giống nhau", "'Kể' = thuật lại câu chuyện", "'Nói' = thuật lại câu chuyện", "Không khác"], answer: 1, explanation: "'Kể' = narrate a story.", explanationEn: "'Kể' = narrate/tell a story." },
        ],
      },
    ],
  },
  {
    id: "vn-grammar-practical",
    title: "Ngữ pháp ứng dụng",
    titleEn: "Practical Grammar",
    icon: "💬",
    color: "from-teal-500 to-cyan-500",
    description: "Giao tiếp hàng ngày: xin phép, hẹn hò, mua sắm",
    descriptionEn: "Daily communication: asking permission, dating, shopping",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-16", title: "Cách xin phép và từ chối", titleEn: "Asking Permission & Refusing", level: "beginner",
        theory: `## Xin phép & Từ chối lịch sự

### 1. Xin phép — từ thấp đến cao

| Mức độ | Mẫu câu | Ví dụ |
|--------|---------|-------|
| Thân mật | **… được không?** | Mượn bút **được không**? |
| Trung tính | **Cho tôi … nhé** | **Cho tôi** xem cái này **nhé**. |
| Lịch sự | **Tôi có thể … không?** | Tôi **có thể** vào **không**? |
| Trang trọng | **Xin phép …** | **Xin phép** anh, em ra ngoài một chút. |
| Rất trang trọng | **Xin được phép …** | **Xin được phép** trình bày ý kiến. |

### 2. Đồng ý / cho phép

- **Được**, mời bạn. *(Sure, please.)*
- **Vâng ạ**, không sao đâu.
- **Chắc chắn rồi**!
- **Cứ tự nhiên.** *(Please feel free.)*

### 3. Từ chối lịch sự

Cấu trúc: **Xin lỗi** + lý do + **(không thể) được**.

- **Xin lỗi**, tôi **không thể** giúp ngay bây giờ.
- **Rất tiếc**, hôm nay tôi bận quá.
- **Cảm ơn** lời mời, nhưng tôi đã có hẹn rồi.
- **Có lẽ lần sau** vậy nhé!

### 4. Hội thoại mẫu

**Tình huống**: Xin phép sếp về sớm.

> **Em**: Em chào anh ạ. **Em xin phép** anh cho em **về sớm** 30 phút được không ạ? Hôm nay em có hẹn khám bệnh.
>
> **Sếp**: **Được**, em cứ về đi. Nhớ hoàn thành công việc trước nhé.
>
> **Em**: **Vâng ạ, em cảm ơn** anh nhiều.

### Lỗi thường gặp

- ❌ Quá thẳng: "Tôi không đi!" → ✅ "**Xin lỗi**, hôm nay tôi không đi được."
- Đừng quên thêm **ạ** khi nói với người lớn tuổi / cấp trên.`,
        theoryEn: `## Asking Permission & Polite Refusal

### 1. Asking permission — from casual to formal

| Level | Pattern | Example |
|-------|---------|---------|
| Casual | **… được không?** | Mượn bút **được không**? (Can I borrow a pen?) |
| Neutral | **Cho tôi … nhé** | **Cho tôi** xem cái này **nhé**. |
| Polite | **Tôi có thể … không?** | Tôi **có thể** vào **không**? (May I come in?) |
| Formal | **Xin phép …** | **Xin phép** anh, em ra ngoài một chút. |
| Very formal | **Xin được phép …** | **Xin được phép** trình bày ý kiến. |

### 2. Granting / agreeing

- **Được**, mời bạn. (Sure, please.)
- **Vâng ạ**, không sao đâu.
- **Chắc chắn rồi**! (Of course!)
- **Cứ tự nhiên.** (Please feel free.)

### 3. Polite refusal

Structure: **Xin lỗi** + reason + **(không thể) được**.

- **Xin lỗi**, tôi **không thể** giúp ngay bây giờ.
- **Rất tiếc**, hôm nay tôi bận quá.
- **Cảm ơn** lời mời, nhưng tôi đã có hẹn rồi.
- **Có lẽ lần sau** vậy nhé!

### 4. Sample dialogue

**Situation**: Asking the boss to leave early.

> **Employee**: Hello sir. **May I** leave 30 minutes early today? I have a medical appointment.
>
> **Boss**: Sure, go ahead. Just finish your work first.
>
> **Employee**: **Yes, thank you** very much.

### Common mistakes

- ❌ Too blunt: "Tôi không đi!" → ✅ "**Xin lỗi**, hôm nay tôi không đi được."
- Don't forget **ạ** with elders / superiors.`,
        vocabulary: [
          { word: "cho phép", meaning: "đồng ý cho", meaningEn: "to allow / permit", example: "Cho phép tôi đi.", exampleEn: "Allow me to go.", partOfSpeech: "verb" },
          { word: "xin phép", meaning: "xin được phép", meaningEn: "to ask permission", example: "Xin phép ra ngoài.", exampleEn: "May I go outside?", partOfSpeech: "verb" },
          { word: "từ chối", meaning: "không đồng ý", meaningEn: "to refuse / decline", example: "Tôi từ chối lịch sự.", exampleEn: "I politely declined.", partOfSpeech: "verb" },
          { word: "đồng ý", meaning: "chấp nhận", meaningEn: "to agree", example: "Tôi đồng ý.", exampleEn: "I agree.", partOfSpeech: "verb" },
          { word: "được không", meaning: "có thể không?", meaningEn: "is it OK?", example: "Đi được không?", exampleEn: "Can I go?", partOfSpeech: "phrase" },
          { word: "xin lỗi", meaning: "nói lỗi", meaningEn: "sorry", example: "Xin lỗi, tôi không thể.", exampleEn: "Sorry, I can't.", partOfSpeech: "phrase" },
          { word: "cảm ơn", meaning: "biết ơn", meaningEn: "thank you", example: "Cảm ơn bạn.", exampleEn: "Thank you.", partOfSpeech: "phrase" },
          { word: "vui lòng", meaning: "xin hãy (trang trọng)", meaningEn: "please (formal)", example: "Vui lòng chờ.", exampleEn: "Please wait.", partOfSpeech: "adverb" },
          { word: "tiếc", meaning: "đáng buồn", meaningEn: "regret / sorry", example: "Rất tiếc, hết chỗ.", exampleEn: "Sorry, no seats left.", partOfSpeech: "adjective" },
          { word: "chắc chắn", meaning: "không nghi ngờ", meaningEn: "certainly / sure", example: "Chắc chắn rồi!", exampleEn: "Certainly!", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Cách xin phép lịch sự nhất?", questionEn: "Most polite way to ask?", options: ["Cho tôi đi!", "Tôi đi!", "Xin phép được đi ạ.", "Tôi muốn đi."], answer: 2, explanation: "'Xin phép…ạ' lịch sự nhất.", explanationEn: "'Xin phép…ạ' is most polite." },
          { question: "'Từ chối' nghĩa gì?", questionEn: "What does 'từ chối' mean?", options: ["Accept", "Refuse", "Ask", "Help"], answer: 1, explanation: "'Từ chối' = refuse.", explanationEn: "'Từ chối' = refuse." },
          { question: "'Được không?' dùng để làm gì?", questionEn: "What is 'được không?' for?", options: ["Ra lệnh", "Xin phép", "Phủ định", "Cảm thán"], answer: 1, explanation: "Hỏi xin phép.", explanationEn: "Asking permission." },
          { question: "Cách từ chối lịch sự?", questionEn: "Polite refusal?", options: ["Không!", "Xin lỗi, tôi không thể.", "Đi đi!", "Tôi không muốn."], answer: 1, explanation: "'Xin lỗi, tôi không thể.' = polite refusal.", explanationEn: "Polite refusal." },
          { question: "'Vui lòng' thuộc văn phong nào?", questionEn: "What register?", options: ["Thân mật", "Trang trọng", "Khẩu ngữ", "Lóng"], answer: 1, explanation: "'Vui lòng' = formal.", explanationEn: "'Vui lòng' = formal." },
        ],
      },
      {
        id: "vn-gram-17", title: "Giao tiếp mua sắm", titleEn: "Shopping Communication", level: "beginner",
        theory: `## Giao tiếp mua sắm tại Việt Nam

Mua sắm ở chợ Việt Nam thường có **mặc cả** (bargaining). Học mẫu câu sau sẽ giúp bạn mua được giá tốt!

### 1. Hỏi giá

- Cái này **bao nhiêu tiền**? *(How much is this?)*
- Cho hỏi **giá** sao ạ? *(May I ask the price?)*
- Cái này **bán thế nào**? *(How is this sold?)*

### 2. Phản ứng về giá

| Mục đích | Câu mẫu |
|----------|---------|
| Khen rẻ | **Rẻ thật!** / **Hợp lý đấy.** |
| Chê đắt | **Mắc quá!** (Nam) / **Đắt quá!** (Bắc) |
| Xin giảm giá | **Bớt cho em một ít được không?** / **Giảm chút đi chị!** |
| Trả giá | **Em trả … nhé?** / **Bán … được không?** |

### 3. Yêu cầu khác

- **Cho em thử** được không? *(Can I try it?)*
- **Có size khác không** ạ? *(Any other sizes?)*
- **Còn màu khác không**? *(Other colors?)*
- **Cho em xem cái kia** với. *(Show me that one too.)*

### 4. Thanh toán

- **Em trả tiền mặt** nhé. *(Cash payment.)*
- **Có chuyển khoản không** ạ? *(Bank transfer accepted?)*
- **Quẹt thẻ được không**? *(Can I pay by card?)*
- **Cho em xin hóa đơn** với. *(May I have a receipt?)*

### 5. Hội thoại mẫu — Mặc cả ở chợ

> **Khách**: Chị ơi, cái áo này **bao nhiêu tiền** vậy?
>
> **Người bán**: 250 ngàn em ạ.
>
> **Khách**: **Mắc quá** chị ơi, **bớt** chút đi! Em **trả 180 ngàn** nhé?
>
> **Người bán**: Thôi 220 đi em, đẹp lắm đấy.
>
> **Khách**: **200 ngàn** đi chị, em lấy luôn!
>
> **Người bán**: **Được rồi**, lấy đi!

### Mẹo mặc cả

1. **Trả giá bằng 50–70% giá ban đầu** ở chợ truyền thống.
2. **Mỉm cười, vui vẻ** — đừng tỏ ra quá quan tâm.
3. **Sẵn sàng đi** nếu giá không hợp lý — người bán thường gọi lại.
4. Ở **siêu thị, cửa hàng lớn**: KHÔNG mặc cả, giá đã niêm yết.

### Từ vựng vùng miền

| Bắc | Nam | Nghĩa |
|-----|-----|-------|
| đắt | mắc | expensive |
| ngàn (1 nghìn) | ngàn | thousand |
| trăm | trăm | hundred |
| bớt / giảm | bớt | discount |`,
        theoryEn: `## Shopping Communication in Vietnam

Shopping at Vietnamese markets often involves **bargaining**. These phrases will help you get a good price!

### 1. Asking the price

- Cái này **bao nhiêu tiền**? (How much is this?)
- Cho hỏi **giá** sao ạ? (May I ask the price?)
- Cái này **bán thế nào**? (How is this sold?)

### 2. Reacting to price

| Purpose | Phrase |
|---------|--------|
| Cheap | **Rẻ thật!** (Really cheap!) |
| Expensive | **Mắc quá!** (South) / **Đắt quá!** (North) |
| Ask discount | **Bớt cho em một ít được không?** |
| Counter-offer | **Em trả … nhé?** (I'll pay …) |

### 3. Other requests

- **Cho em thử** được không? (Can I try it on?)
- **Có size khác không** ạ?
- **Còn màu khác không**?
- **Cho em xem cái kia** với.

### 4. Payment

- **Em trả tiền mặt** nhé. (Cash.)
- **Có chuyển khoản không** ạ? (Bank transfer?)
- **Quẹt thẻ được không**? (Card?)
- **Cho em xin hóa đơn** với. (Receipt please.)

### 5. Sample dialogue — bargaining at a market

> **Customer**: How much is this shirt?
>
> **Seller**: 250 thousand VND.
>
> **Customer**: Too expensive! Discount a bit, I'll pay 180?
>
> **Seller**: 220, very pretty I promise.
>
> **Customer**: 200, I'll take it!
>
> **Seller**: OK, deal!

### Bargaining tips

1. **Counter at 50–70%** of the original price in traditional markets.
2. **Smile and be friendly** — don't seem too eager.
3. **Be willing to walk away** — sellers often call you back.
4. **No bargaining** in supermarkets / branded stores.

### Regional vocabulary

| North | South | Meaning |
|-------|-------|---------|
| đắt | mắc | expensive |
| ngàn (1 nghìn) | ngàn | thousand |
| bớt / giảm | bớt | discount |`,
        vocabulary: [
          { word: "bao nhiêu tiền", meaning: "hỏi giá", meaningEn: "how much?", example: "Cái này bao nhiêu tiền?", exampleEn: "How much is this?", partOfSpeech: "phrase" },
          { word: "mắc", meaning: "đắt (miền Nam)", meaningEn: "expensive (southern)", example: "Mắc quá!", exampleEn: "Too expensive!", partOfSpeech: "adjective" },
          { word: "đắt", meaning: "giá cao", meaningEn: "expensive", example: "Đắt quá, bớt đi.", exampleEn: "Too expensive, reduce please.", partOfSpeech: "adjective" },
          { word: "rẻ", meaning: "giá thấp", meaningEn: "cheap", example: "Rẻ hơn được không?", exampleEn: "Can it be cheaper?", partOfSpeech: "adjective" },
          { word: "bớt", meaning: "giảm giá", meaningEn: "to reduce / discount", example: "Bớt 10 ngàn đi.", exampleEn: "Reduce 10k please.", partOfSpeech: "verb" },
          { word: "mua", meaning: "trao đổi tiền lấy hàng", meaningEn: "to buy", example: "Tôi muốn mua.", exampleEn: "I want to buy.", partOfSpeech: "verb" },
          { word: "bán", meaning: "trao hàng lấy tiền", meaningEn: "to sell", example: "Bán cho tôi.", exampleEn: "Sell to me.", partOfSpeech: "verb" },
          { word: "trả", meaning: "đưa tiền", meaningEn: "to pay", example: "Trả tiền mặt.", exampleEn: "Pay cash.", partOfSpeech: "verb" },
          { word: "thử", meaning: "dùng thử", meaningEn: "to try", example: "Cho tôi thử.", exampleEn: "Let me try.", partOfSpeech: "verb" },
          { word: "size", meaning: "cỡ, kích thước", meaningEn: "size", example: "Size này vừa không?", exampleEn: "Does this size fit?", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Hỏi giá bằng tiếng Việt?", questionEn: "How to ask the price?", options: ["Bao nhiêu?", "Bao nhiêu tiền?", "Mấy?", "Sao?"], answer: 1, explanation: "'Bao nhiêu tiền?' = how much?", explanationEn: "'Bao nhiêu tiền?' = how much?" },
          { question: "'Bớt' nghĩa gì?", questionEn: "What does 'bớt' mean?", options: ["Tăng giá", "Giảm giá", "Mua thêm", "Trả lại"], answer: 1, explanation: "'Bớt' = reduce/discount.", explanationEn: "'Bớt' = discount." },
          { question: "'Mắc' là tiếng vùng nào?", questionEn: "Which region says 'mắc'?", options: ["Bắc", "Trung", "Nam", "Tất cả"], answer: 2, explanation: "'Mắc' = miền Nam, 'đắt' = miền Bắc.", explanationEn: "Southern = 'mắc', Northern = 'đắt'." },
          { question: "'Cho tôi thử' nghĩa gì?", questionEn: "What does it mean?", options: ["Give me", "Let me try", "Sell to me", "Return this"], answer: 1, explanation: "Xin thử (quần áo, đồ).", explanationEn: "Let me try (clothes, etc.)." },
          { question: "'Trả' trong mua sắm nghĩa gì?", questionEn: "What does 'trả' mean?", options: ["Buy", "Sell", "Pay", "Return"], answer: 2, explanation: "'Trả' = to pay.", explanationEn: "'Trả' = to pay." },
        ],
      },
      {
        id: "vn-gram-18", title: "Cách diễn đạt ý kiến", titleEn: "Expressing Opinions", level: "intermediate",
        theory: `## Cách diễn đạt ý kiến

Khi đưa ra ý kiến, người Việt thường **làm mềm** câu nói bằng các cụm "theo tôi", "tôi cho rằng" để tránh nghe áp đặt.

### 1. Mở đầu ý kiến — từ nhẹ đến mạnh

| Mức độ | Cụm từ | Ví dụ |
|--------|--------|-------|
| Nhẹ | **Theo tôi…** | **Theo tôi**, nên đi sớm. |
| Trung tính | **Tôi nghĩ là…** | **Tôi nghĩ** kế hoạch này hay. |
| Khẳng định hơn | **Tôi cho rằng…** | **Tôi cho rằng** đây là sai lầm. |
| Trang trọng | **Theo quan điểm của tôi…** | **Theo quan điểm của tôi**, … |
| Cá nhân | **Cá nhân tôi thì…** | **Cá nhân tôi**, tôi thích cái thứ hai. |

### 2. Đồng ý

- **Tôi đồng ý** với bạn.
- **Đúng vậy**! / **Chính xác**!
- **Bạn nói có lý.** *(You have a point.)*
- **Tôi cũng nghĩ thế.**
- **Tôi hoàn toàn ủng hộ** ý kiến này.

### 3. Không đồng ý lịch sự

Đừng nói thẳng "sai rồi!" — hãy bắt đầu bằng sự công nhận:

- **Tôi hiểu ý bạn, nhưng…** *(I see your point, but…)*
- **Có thể đúng, tuy nhiên…**
- **Tôi e rằng tôi không đồng ý.** *(I'm afraid I don't agree.)*
- **Xin lỗi**, tôi có ý kiến khác.
- **Tôi phản đối** vì… *(I oppose because…)*

### 4. Đề nghị / gợi ý

- **Hay là** chúng ta thử cách khác? *(How about trying another way?)*
- **Tôi đề xuất** phương án B.
- **Sao bạn không** thử nói chuyện với cô ấy?
- **Theo tôi nên** đi sớm hơn.

### 5. Hội thoại mẫu — Tranh luận lịch sự

> **A**: **Theo tôi**, chúng ta nên chọn phương án A.
>
> **B**: **Tôi hiểu ý bạn**, **nhưng** phương án B có vẻ tiết kiệm hơn. **Bạn nghĩ sao**?
>
> **A**: **Bạn nói có lý**. **Có thể** chúng ta kết hợp cả hai chăng?
>
> **B**: **Hay đấy**! **Tôi đồng ý**.

### Mẹo
- Người Việt rất coi trọng **giữ thể diện** (face) — tránh phản đối quá thẳng.
- Khi không chắc, dùng **"có thể", "có lẽ"** để câu mềm mại hơn.`,
        theoryEn: `## Expressing Opinions

When giving opinions, Vietnamese speakers **soften** statements with phrases like "theo tôi" or "tôi cho rằng" to avoid sounding pushy.

### 1. Opening an opinion — soft to strong

| Level | Phrase | Example |
|-------|--------|---------|
| Soft | **Theo tôi…** (In my opinion) | **Theo tôi**, nên đi sớm. |
| Neutral | **Tôi nghĩ là…** (I think) | **Tôi nghĩ** kế hoạch này hay. |
| Stronger | **Tôi cho rằng…** (I believe) | **Tôi cho rằng** đây là sai lầm. |
| Formal | **Theo quan điểm của tôi…** | … |
| Personal | **Cá nhân tôi thì…** | … |

### 2. Agreeing

- **Tôi đồng ý** với bạn. (I agree.)
- **Đúng vậy**! / **Chính xác**!
- **Bạn nói có lý.** (You have a point.)
- **Tôi cũng nghĩ thế.** (I think so too.)
- **Tôi hoàn toàn ủng hộ** ý kiến này.

### 3. Polite disagreement

Don't say "sai rồi!" (you're wrong) — start by acknowledging:

- **Tôi hiểu ý bạn, nhưng…** (I see your point, but…)
- **Có thể đúng, tuy nhiên…**
- **Tôi e rằng tôi không đồng ý.** (I'm afraid I don't agree.)
- **Xin lỗi**, tôi có ý kiến khác.
- **Tôi phản đối** vì… (I oppose because…)

### 4. Suggesting

- **Hay là** chúng ta thử cách khác? (How about another way?)
- **Tôi đề xuất** phương án B. (I propose option B.)
- **Sao bạn không** thử nói chuyện với cô ấy?
- **Theo tôi nên** đi sớm hơn.

### 5. Sample dialogue

> **A**: **In my opinion**, we should choose option A.
>
> **B**: **I see your point**, **but** option B seems cheaper. **What do you think**?
>
> **A**: **You have a point**. **Maybe** we can combine both?
>
> **B**: **Great idea**! **I agree**.

### Tip
- Vietnamese culture values **face-saving** — avoid blunt disagreement.
- Use **"có thể", "có lẽ"** (maybe, perhaps) to soften your tone.`,
        vocabulary: [
          { word: "nghĩ", meaning: "suy nghĩ", meaningEn: "to think", example: "Tôi nghĩ là đúng.", exampleEn: "I think it's correct.", partOfSpeech: "verb" },
          { word: "cho rằng", meaning: "tin rằng", meaningEn: "to believe / hold that", example: "Tôi cho rằng nên đi.", exampleEn: "I believe we should go.", partOfSpeech: "phrase" },
          { word: "theo tôi", meaning: "ý kiến cá nhân", meaningEn: "in my opinion", example: "Theo tôi, nên đợi.", exampleEn: "In my opinion, we should wait.", partOfSpeech: "phrase" },
          { word: "đồng ý", meaning: "cùng ý kiến", meaningEn: "to agree", example: "Tôi đồng ý với bạn.", exampleEn: "I agree with you.", partOfSpeech: "verb" },
          { word: "không đồng ý", meaning: "phản đối", meaningEn: "to disagree", example: "Tôi không đồng ý.", exampleEn: "I disagree.", partOfSpeech: "phrase" },
          { word: "ý kiến", meaning: "quan điểm", meaningEn: "opinion", example: "Ý kiến của bạn?", exampleEn: "Your opinion?", partOfSpeech: "noun" },
          { word: "nhận xét", meaning: "đánh giá", meaningEn: "to comment / remark", example: "Nhận xét của thầy.", exampleEn: "Teacher's comment.", partOfSpeech: "noun/verb" },
          { word: "phản đối", meaning: "chống lại", meaningEn: "to oppose / object", example: "Tôi phản đối kế hoạch.", exampleEn: "I oppose the plan.", partOfSpeech: "verb" },
          { word: "ủng hộ", meaning: "hỗ trợ", meaningEn: "to support", example: "Tôi ủng hộ ý tưởng.", exampleEn: "I support the idea.", partOfSpeech: "verb" },
          { word: "đánh giá", meaning: "xem xét giá trị", meaningEn: "to evaluate / assess", example: "Đánh giá tình hình.", exampleEn: "Assess the situation.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Theo tôi' nghĩa gì?", questionEn: "What does it mean?", options: ["Follow me", "In my opinion", "About me", "For me"], answer: 1, explanation: "'Theo tôi' = in my opinion.", explanationEn: "'Theo tôi' = in my opinion." },
          { question: "Cách nói ý kiến lịch sự?", questionEn: "Polite way to give opinion?", options: ["Sai rồi!", "Tôi cho rằng…", "Không đúng!", "Phải thế này!"], answer: 1, explanation: "'Tôi cho rằng…' = polite opinion.", explanationEn: "'Tôi cho rằng…' = polite." },
          { question: "'Phản đối' nghĩa gì?", questionEn: "What does 'phản đối' mean?", options: ["Support", "Oppose", "Agree", "Ask"], answer: 1, explanation: "'Phản đối' = oppose.", explanationEn: "'Phản đối' = oppose." },
          { question: "'Ủng hộ' nghĩa gì?", questionEn: "What does 'ủng hộ' mean?", options: ["Oppose", "Support", "Refuse", "Ignore"], answer: 1, explanation: "'Ủng hộ' = support.", explanationEn: "'Ủng hộ' = support." },
          { question: "'Đồng ý' trái nghĩa là gì?", questionEn: "Opposite of 'đồng ý'?", options: ["Cảm ơn", "Không đồng ý / Phản đối", "Xin lỗi", "Vui lòng"], answer: 1, explanation: "Trái nghĩa = không đồng ý.", explanationEn: "Opposite = disagree." },
        ],
      },
      {
        id: "vn-gram-19", title: "Cách mô tả ngoại hình và tính cách", titleEn: "Describing Appearance & Personality", level: "beginner",
        theory: `## Mô tả ngoại hình và tính cách

### 1. Mô tả ngoại hình (Appearance)

**Cấu trúc**: Chủ ngữ + (có / là) + tính từ

#### 📏 Vóc dáng
- **cao** (tall) ↔ **thấp** (short)
- **gầy / ốm** (thin) ↔ **mập / béo / đậm** (chubby)
- **cân đối** (well-proportioned) / **thon thả** (slender)

**Ví dụ**: Anh ấy **cao** và **gầy**. / Cô ấy có dáng người **thon thả**.

#### 👤 Khuôn mặt và đặc điểm
- **xinh đẹp / xinh** (pretty - female) / **đẹp trai** (handsome - male)
- **da trắng / da ngăm** (fair skin / tanned skin)
- **mắt to / mắt nhỏ / mắt một mí / mắt hai mí**
- **tóc dài / tóc ngắn / tóc xoăn / tóc thẳng**

**Ví dụ**: Cô ấy **xinh đẹp**, **mắt to** và **tóc dài đen**.

#### 👶 Tuổi tác
- **trẻ** (young) ↔ **già** (old) / **trung niên** (middle-aged)
- **trẻ trung** (youthful) / **đứng tuổi** (mature)

### 2. Mô tả tính cách (Personality)

| Tích cực | Tiêu cực |
|----------|----------|
| **vui vẻ** (cheerful) | **buồn / u sầu** (sad) |
| **hiền lành / dịu dàng** (gentle, kind) | **dữ dằn / cộc cằn** (harsh) |
| **thông minh** (smart) | **chậm hiểu** (slow) |
| **chăm chỉ / cần cù** (hardworking) | **lười** (lazy) |
| **trung thực / thật thà** (honest) | **gian dối** (dishonest) |
| **rộng rãi / hào phóng** (generous) | **keo kiệt / ki bo** (stingy) |
| **khiêm tốn** (humble) | **kiêu căng / tự cao** (arrogant) |
| **hài hước** (humorous) | **nhạt nhẽo** (dull) |

### 3. Mẫu câu hoàn chỉnh để mô tả người

> Đây là chị tôi. Chị ấy **cao khoảng 1m65**, **dáng người thon thả**, **tóc dài đen** và **mắt to**. Tính chị ấy **rất hiền và vui vẻ**, lúc nào cũng giúp đỡ mọi người. Chị ấy còn **rất thông minh và chăm chỉ** trong công việc.

### 4. Các từ chỉ mức độ

- **rất** + tính từ: rất đẹp, rất hiền.
- tính từ + **lắm**: đẹp lắm, hiền lắm.
- **hơi** + tính từ: hơi gầy, hơi nóng tính.

### 5. Lưu ý văn hóa

- Không nên nói **"mập / béo"** trực diện với người khác — có thể bị xem là khiếm nhã.
- Người Việt thường khen **"trẻ ra"** (looking younger) hoặc **"da đẹp"** (nice skin) khi gặp.
- **Hỏi tuổi** là bình thường nhưng tránh hỏi cân nặng.`,
        theoryEn: `## Describing Appearance & Personality

### 1. Appearance

**Structure**: Subject + (có / là) + adjective

#### 📏 Body
- **cao** (tall) ↔ **thấp** (short)
- **gầy / ốm** (thin) ↔ **mập / béo / đậm** (chubby)
- **cân đối** (well-proportioned) / **thon thả** (slender)

**Ex**: Anh ấy **cao** và **gầy**. / Cô ấy có dáng người **thon thả**.

#### 👤 Face & features
- **xinh đẹp / xinh** (pretty - female) / **đẹp trai** (handsome - male)
- **da trắng / da ngăm** (fair skin / tanned)
- **mắt to / mắt nhỏ / mắt một mí / mắt hai mí**
- **tóc dài / tóc ngắn / tóc xoăn / tóc thẳng**

**Ex**: She is pretty, has big eyes and long black hair.

#### 👶 Age
- **trẻ** (young) ↔ **già** (old) / **trung niên** (middle-aged)
- **trẻ trung** (youthful) / **đứng tuổi** (mature)

### 2. Personality

| Positive | Negative |
|----------|----------|
| **vui vẻ** (cheerful) | **buồn / u sầu** (sad) |
| **hiền lành / dịu dàng** (gentle) | **dữ dằn / cộc cằn** (harsh) |
| **thông minh** (smart) | **chậm hiểu** (slow) |
| **chăm chỉ / cần cù** (hardworking) | **lười** (lazy) |
| **trung thực / thật thà** (honest) | **gian dối** (dishonest) |
| **rộng rãi / hào phóng** (generous) | **keo kiệt / ki bo** (stingy) |
| **khiêm tốn** (humble) | **kiêu căng / tự cao** (arrogant) |
| **hài hước** (humorous) | **nhạt nhẽo** (dull) |

### 3. Full descriptive paragraph

> This is my older sister. She is about 1.65m tall, slim, with long black hair and big eyes. She is very gentle and cheerful, always helping others. She is also smart and hardworking at her job.

### 4. Degree modifiers

- **rất** + adj: rất đẹp (very pretty)
- adj + **lắm**: đẹp lắm
- **hơi** + adj: hơi gầy (a bit thin)

### 5. Cultural notes

- Avoid saying **"mập / béo"** directly to others — can be rude.
- Vietnamese often compliment **"trẻ ra"** (looking younger) or **"da đẹp"** (nice skin).
- Asking age is fine; asking weight is not.`,
        vocabulary: [
          { word: "cao", meaning: "chiều cao lớn", meaningEn: "tall", example: "Anh ấy rất cao.", exampleEn: "He is very tall.", partOfSpeech: "adjective" },
          { word: "thấp", meaning: "chiều cao nhỏ", meaningEn: "short", example: "Em bé còn thấp.", exampleEn: "The child is still short.", partOfSpeech: "adjective" },
          { word: "gầy", meaning: "không béo", meaningEn: "thin / slim", example: "Cô ấy rất gầy.", exampleEn: "She is very thin.", partOfSpeech: "adjective" },
          { word: "mập", meaning: "béo (miền Nam)", meaningEn: "chubby (southern)", example: "Em bé mập quá.", exampleEn: "The baby is so chubby.", partOfSpeech: "adjective" },
          { word: "vui vẻ", meaning: "hạnh phúc", meaningEn: "cheerful / happy", example: "Cô ấy luôn vui vẻ.", exampleEn: "She's always cheerful.", partOfSpeech: "adjective" },
          { word: "hiền lành", meaning: "tốt bụng, nhẹ nhàng", meaningEn: "gentle / kind", example: "Bà ấy rất hiền lành.", exampleEn: "She is very gentle.", partOfSpeech: "adjective" },
          { word: "thông minh", meaning: "giỏi, nhanh trí", meaningEn: "intelligent / smart", example: "Bạn ấy rất thông minh.", exampleEn: "He/she is very smart.", partOfSpeech: "adjective" },
          { word: "đẹp trai", meaning: "nam đẹp", meaningEn: "handsome", example: "Anh ấy đẹp trai.", exampleEn: "He is handsome.", partOfSpeech: "adjective" },
          { word: "xinh đẹp", meaning: "nữ đẹp", meaningEn: "beautiful / pretty", example: "Cô ấy xinh đẹp.", exampleEn: "She is beautiful.", partOfSpeech: "adjective" },
          { word: "chăm chỉ", meaning: "siêng năng", meaningEn: "hardworking / diligent", example: "Học sinh chăm chỉ.", exampleEn: "Hardworking student.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Gầy' nghĩa gì?", questionEn: "What does 'gầy' mean?", options: ["Fat", "Thin", "Tall", "Short"], answer: 1, explanation: "'Gầy' = thin/slim.", explanationEn: "'Gầy' = thin." },
          { question: "'Hiền lành' mô tả gì?", questionEn: "What does 'hiền lành' describe?", options: ["Ngoại hình", "Tính cách", "Tuổi tác", "Nghề nghiệp"], answer: 1, explanation: "Tính cách = gentle.", explanationEn: "Personality = gentle." },
          { question: "'Đẹp trai' dùng cho ai?", questionEn: "Who is 'đẹp trai' for?", options: ["Nữ", "Nam", "Cả hai", "Trẻ em"], answer: 1, explanation: "'Đẹp trai' = handsome (male).", explanationEn: "'Đẹp trai' = handsome (male)." },
          { question: "'Mập' là tiếng vùng nào?", questionEn: "Which region says 'mập'?", options: ["Bắc", "Trung", "Nam", "Tất cả"], answer: 2, explanation: "Nam = 'mập', Bắc = 'béo'.", explanationEn: "South = 'mập', North = 'béo'." },
          { question: "Tính từ mô tả tính cách tốt?", questionEn: "Which describes good personality?", options: ["Gầy", "Chăm chỉ", "Cao", "Thấp"], answer: 1, explanation: "'Chăm chỉ' = tính cách.", explanationEn: "'Chăm chỉ' = personality trait." },
        ],
      },
      {
        id: "vn-gram-20", title: "Cách nói về thói quen hàng ngày", titleEn: "Talking About Daily Routines", level: "beginner",
        theory: `## Nói về thói quen hàng ngày

### 1. Hoạt động trong ngày

#### 🌅 Buổi sáng (Morning)
- **dậy** (wake up) → **đánh răng, rửa mặt** (brush teeth, wash face)
- **tắm** (shower) → **ăn sáng** (breakfast)
- **đi làm / đi học** (go to work / school)

#### ☀️ Buổi trưa (Noon)
- **ăn trưa** (lunch) → **nghỉ trưa / ngủ trưa** (afternoon nap)

#### 🌆 Buổi chiều (Afternoon)
- **về nhà** (come home) → **tập thể dục** (exercise)
- **nấu cơm** (cook) → **ăn tối** (dinner)

#### 🌙 Buổi tối (Evening)
- **xem tivi / đọc sách** (TV / reading)
- **đi ngủ** (go to bed)

### 2. Cách diễn tả thói quen — Cấu trúc "thường"

**Chủ ngữ + thường + V + (vào / lúc + thời gian)**

- Tôi **thường dậy lúc 6 giờ**.
- Anh ấy **thường ăn sáng vào** lúc 7 giờ.
- Chúng tôi **thường tập thể dục vào** buổi chiều.

### 3. Từ chỉ tần suất (đứng TRƯỚC động từ)

| Từ | Nghĩa | Tần suất |
|----|-------|----------|
| **luôn luôn** | always | 100% |
| **thường / hay** | usually / often | 70-90% |
| **thỉnh thoảng** | sometimes | 30-50% |
| **hiếm khi** | rarely | 10% |
| **không bao giờ** | never | 0% |

**Ví dụ**:
- Tôi **luôn luôn** uống nước lọc.
- Cuối tuần tôi **thường** đi chơi với bạn.
- Tôi **thỉnh thoảng** đi xem phim.
- Tôi **hiếm khi** ăn đồ ngọt.
- Tôi **không bao giờ** thức quá 11 giờ đêm.

### 4. Đoạn văn mẫu — Một ngày của tôi

> Một ngày của tôi bắt đầu lúc 6 giờ sáng. Tôi **thường dậy** sớm để **tập thể dục** khoảng 30 phút. Sau đó tôi **đánh răng, tắm rồi ăn sáng** — thường là phở hoặc bánh mì. Lúc 8 giờ tôi **đi làm**. Buổi trưa tôi **ăn cơm văn phòng** và **nghỉ trưa** một chút. Chiều về, tôi **nấu cơm tối** rồi **xem phim** với gia đình. Tôi **thường đi ngủ** lúc 11 giờ.

### 5. Câu hỏi về thói quen

- Bạn **thường** dậy **lúc mấy giờ**? *(What time do you usually wake up?)*
- Bạn **có hay** đi tập thể dục không? *(Do you often exercise?)*
- Cuối tuần bạn **thường làm gì**? *(What do you usually do on weekends?)*

### Lưu ý văn hóa

- **Nghỉ trưa** (12h-13h30) là thói quen rất phổ biến ở Việt Nam — kể cả văn phòng.
- Người Việt thường ăn **3 bữa chính** + có thể thêm **bữa xế** (snack).
- **"Ăn cơm chưa?"** là câu chào hỏi phổ biến, không nhất thiết phải trả lời đầy đủ.`,
        theoryEn: `## Talking About Daily Routines

### 1. Daily activities

#### 🌅 Morning
- **dậy** (wake up) → **đánh răng, rửa mặt** (brush teeth, wash face)
- **tắm** (shower) → **ăn sáng** (breakfast)
- **đi làm / đi học** (go to work / school)

#### ☀️ Noon
- **ăn trưa** (lunch) → **nghỉ trưa / ngủ trưa** (afternoon nap)

#### 🌆 Afternoon
- **về nhà** (come home) → **tập thể dục** (exercise)
- **nấu cơm** (cook) → **ăn tối** (dinner)

#### 🌙 Evening
- **xem tivi / đọc sách** (TV / reading)
- **đi ngủ** (go to bed)

### 2. Habit structure with "thường"

**Subject + thường + V + (vào / lúc + time)**

- Tôi **thường dậy lúc 6 giờ**. (I usually wake up at 6.)
- Anh ấy **thường ăn sáng vào** lúc 7 giờ.
- Chúng tôi **thường tập thể dục vào** buổi chiều.

### 3. Frequency adverbs (placed BEFORE the verb)

| Word | Meaning | Frequency |
|------|---------|-----------|
| **luôn luôn** | always | 100% |
| **thường / hay** | usually / often | 70-90% |
| **thỉnh thoảng** | sometimes | 30-50% |
| **hiếm khi** | rarely | 10% |
| **không bao giờ** | never | 0% |

**Examples**:
- I **always** drink filtered water.
- I **usually** go out with friends on weekends.
- I **sometimes** watch movies.
- I **rarely** eat sweets.
- I **never** stay up past 11 PM.

### 4. Sample paragraph — My day

> My day starts at 6 AM. I **usually wake up** early to **exercise** for 30 minutes. Then I brush my teeth, shower, and have breakfast — usually pho or banh mi. At 8, I go to work. At noon, I have an office lunch and take a short nap. In the afternoon, I cook dinner and watch a movie with my family. I usually go to bed at 11.

### 5. Questions about routines

- What time do you usually wake up?
- Do you often exercise?
- What do you usually do on weekends?

### Cultural notes

- **Afternoon nap** (12-1:30 PM) is very common in Vietnam — even in offices.
- Vietnamese typically eat **3 main meals** + an optional **snack (bữa xế)**.
- **"Ăn cơm chưa?"** (Have you eaten?) is a common greeting — no need for a full answer.`,
        vocabulary: [
          { word: "dậy", meaning: "thức dậy", meaningEn: "to wake up / get up", example: "Tôi dậy lúc 6 giờ.", exampleEn: "I wake up at 6.", partOfSpeech: "verb" },
          { word: "ngủ", meaning: "nghỉ ngơi ban đêm", meaningEn: "to sleep", example: "Tôi ngủ lúc 10 giờ.", exampleEn: "I sleep at 10.", partOfSpeech: "verb" },
          { word: "ăn sáng", meaning: "bữa ăn buổi sáng", meaningEn: "to have breakfast", example: "Ăn sáng lúc 7 giờ.", exampleEn: "Breakfast at 7.", partOfSpeech: "verb phrase" },
          { word: "đi làm", meaning: "đi đến nơi làm việc", meaningEn: "to go to work", example: "Tôi đi làm lúc 8 giờ.", exampleEn: "I go to work at 8.", partOfSpeech: "verb phrase" },
          { word: "về nhà", meaning: "trở về nhà", meaningEn: "to go/come home", example: "Về nhà lúc 6 giờ.", exampleEn: "Come home at 6.", partOfSpeech: "verb phrase" },
          { word: "tắm", meaning: "rửa sạch cơ thể", meaningEn: "to shower / bathe", example: "Tắm mỗi ngày.", exampleEn: "Shower every day.", partOfSpeech: "verb" },
          { word: "nấu cơm", meaning: "chế biến bữa ăn", meaningEn: "to cook rice / prepare meal", example: "Mẹ nấu cơm tối.", exampleEn: "Mom cooks dinner.", partOfSpeech: "verb phrase" },
          { word: "tập thể dục", meaning: "vận động", meaningEn: "to exercise", example: "Tập thể dục buổi sáng.", exampleEn: "Exercise in the morning.", partOfSpeech: "verb phrase" },
          { word: "nghỉ trưa", meaning: "ngủ trưa", meaningEn: "to take a nap", example: "Nghỉ trưa 30 phút.", exampleEn: "Nap for 30 minutes.", partOfSpeech: "verb phrase" },
          { word: "xem tivi", meaning: "xem truyền hình", meaningEn: "to watch TV", example: "Xem tivi buổi tối.", exampleEn: "Watch TV at night.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Dậy' nghĩa gì?", questionEn: "What does 'dậy' mean?", options: ["Sleep", "Wake up", "Eat", "Go"], answer: 1, explanation: "'Dậy' = wake up.", explanationEn: "'Dậy' = wake up." },
          { question: "Thứ tự đúng của buổi sáng?", questionEn: "Correct morning order?", options: ["Ăn sáng → Dậy → Tắm", "Dậy → Tắm → Ăn sáng", "Tắm → Ngủ → Ăn", "Đi làm → Dậy → Ăn"], answer: 1, explanation: "Dậy → Tắm → Ăn sáng.", explanationEn: "Wake up → Shower → Breakfast." },
          { question: "'Nghỉ trưa' là gì?", questionEn: "What is 'nghỉ trưa'?", options: ["Morning exercise", "Afternoon nap", "Dinner", "Shopping"], answer: 1, explanation: "Ngủ trưa.", explanationEn: "Afternoon nap." },
          { question: "'Về nhà' nghĩa gì?", questionEn: "What does 'về nhà' mean?", options: ["Leave home", "Go home", "Build home", "Sell home"], answer: 1, explanation: "'Về nhà' = go/come home.", explanationEn: "'Về nhà' = go home." },
          { question: "Người VN thường 'nghỉ trưa' không?", questionEn: "Do Vietnamese take naps?", options: ["Không bao giờ", "Có, rất phổ biến", "Chỉ trẻ em", "Chỉ người già"], answer: 1, explanation: "Nghỉ trưa rất phổ biến ở VN.", explanationEn: "Very common in Vietnam." },
        ],
      },
      {
        id: "vn-gram-36", title: "Cách nói thời gian", titleEn: "Telling Time", level: "beginner",
        theory: `## Cách nói thời gian

### 1. Hỏi giờ

- **Mấy giờ rồi**? *(What time is it?)*
- **Bây giờ là mấy giờ**? *(What time is it now?)*
- **Mấy giờ chúng ta gặp**? *(What time shall we meet?)*

### 2. Cấu trúc trả lời

**[Số] giờ + [số] phút (+ buổi)**

| Giờ | Cách đọc | Tiếng Anh |
|-----|----------|-----------|
| 3:00 | (Đúng) **3 giờ** | 3 o'clock sharp |
| 3:15 | **3 giờ 15 (phút)** | 3:15 |
| 3:30 | **3 giờ rưỡi** / 3 giờ 30 | 3:30 (half past 3) |
| 3:45 | **4 giờ kém 15** / 3 giờ 45 | 3:45 (15 to 4) |
| 3:50 | **4 giờ kém 10** / 3 giờ 50 | 3:50 |

**Quan trọng**: **kém** = trước (to / minus)
- 8 giờ **kém** 15 = 7:45 (15 phút trước 8 giờ)

### 3. Buổi trong ngày

| Buổi | Khoảng giờ | Ví dụ |
|------|-----------|-------|
| **sáng** (morning) | 5h - 10h | 7 giờ **sáng** |
| **trưa** (noon) | 11h - 13h | 12 giờ **trưa** |
| **chiều** (afternoon) | 13h - 18h | 3 giờ **chiều** |
| **tối** (evening) | 18h - 22h | 8 giờ **tối** |
| **đêm** (night) | 22h - 5h | 11 giờ **đêm** |

**Lưu ý**: Người Việt dùng **giờ + buổi** thay vì AM/PM:
- 7 AM → **7 giờ sáng**
- 7 PM → **7 giờ tối**

### 4. Từ chỉ thời điểm xấp xỉ

- **đúng** + giờ → exactly: **Đúng** 9 giờ. *(Exactly 9.)*
- **khoảng** + giờ → about: **Khoảng** 5 giờ. *(About 5.)*
- **gần** + giờ → almost: **Gần** 10 giờ rồi.
- **hơn** + giờ → just past: **Hơn** 3 giờ rồi.

### 5. Hội thoại mẫu

> **A**: Xin lỗi, **mấy giờ rồi** ạ?
>
> **B**: **3 giờ rưỡi chiều**.
>
> **A**: Cảm ơn! **Mấy giờ** mình gặp nhau **tối nay**?
>
> **B**: **7 giờ tối** ở quán cà phê được không?
>
> **A**: **Được**! Hẹn gặp lúc **7 giờ tối**.

### 6. Đơn vị thời gian

| Đơn vị | Tiếng Anh | Đổi |
|--------|-----------|-----|
| **giây** | second | 1/60 phút |
| **phút** | minute | 60 giây |
| **giờ / tiếng** | hour | 60 phút |
| **ngày** | day | 24 giờ |
| **tuần** | week | 7 ngày |
| **tháng** | month | ~30 ngày |
| **năm** | year | 12 tháng |

### Lưu ý

- **giờ** (đồng hồ) vs **tiếng** (thời lượng):
  - "Bây giờ 3 **giờ**." *(It's 3 o'clock.)*
  - "Tôi đi mất 3 **tiếng**." *(It took me 3 hours.)*`,
        theoryEn: `## Telling Time

### 1. Asking for the time

- **Mấy giờ rồi**? (What time is it?)
- **Bây giờ là mấy giờ**? (What time is it now?)
- **Mấy giờ chúng ta gặp**? (What time shall we meet?)

### 2. Telling the time

**[Number] giờ + [number] phút (+ part of day)**

| Time | Vietnamese | English |
|------|-----------|---------|
| 3:00 | (Đúng) **3 giờ** | 3 o'clock sharp |
| 3:15 | **3 giờ 15 (phút)** | 3:15 |
| 3:30 | **3 giờ rưỡi** | half past 3 |
| 3:45 | **4 giờ kém 15** | 15 to 4 |
| 3:50 | **4 giờ kém 10** | 10 to 4 |

**Important**: **kém** = before (to / minus)
- 8 giờ **kém** 15 = 7:45 (15 minutes before 8)

### 3. Parts of the day

| Period | Hours | Example |
|--------|-------|---------|
| **sáng** (morning) | 5-10 | 7 giờ **sáng** (7 AM) |
| **trưa** (noon) | 11-13 | 12 giờ **trưa** |
| **chiều** (afternoon) | 13-18 | 3 giờ **chiều** (3 PM) |
| **tối** (evening) | 18-22 | 8 giờ **tối** (8 PM) |
| **đêm** (night) | 22-5 | 11 giờ **đêm** (11 PM) |

**Note**: Vietnamese uses **giờ + period** instead of AM/PM:
- 7 AM → **7 giờ sáng**
- 7 PM → **7 giờ tối**

### 4. Approximate time

- **đúng** + time → exactly: **Đúng** 9 giờ.
- **khoảng** + time → about: **Khoảng** 5 giờ.
- **gần** + time → almost: **Gần** 10 giờ rồi.
- **hơn** + time → just past: **Hơn** 3 giờ rồi.

### 5. Sample dialogue

> **A**: Excuse me, **what time is it**?
>
> **B**: **3:30 in the afternoon**.
>
> **A**: Thanks! **What time** shall we meet **tonight**?
>
> **B**: **7 PM** at the cafe?
>
> **A**: **OK**! See you at **7 PM**.

### 6. Time units

| Unit | English | Equivalent |
|------|---------|-----------|
| **giây** | second | 1/60 minute |
| **phút** | minute | 60 seconds |
| **giờ / tiếng** | hour | 60 minutes |
| **ngày** | day | 24 hours |
| **tuần** | week | 7 days |
| **tháng** | month | ~30 days |
| **năm** | year | 12 months |

### Note

- **giờ** (clock) vs **tiếng** (duration):
  - "Bây giờ 3 **giờ**." (It's 3 o'clock.)
  - "Tôi đi mất 3 **tiếng**." (It took me 3 hours.)`,
        vocabulary: [
          { word: "giờ", meaning: "đơn vị 60 phút", meaningEn: "hour / o'clock", example: "Bây giờ 3 giờ.", exampleEn: "It's 3 o'clock.", partOfSpeech: "noun" },
          { word: "phút", meaning: "đơn vị 60 giây", meaningEn: "minute", example: "5 phút nữa.", exampleEn: "5 more minutes.", partOfSpeech: "noun" },
          { word: "rưỡi", meaning: "nửa (30 phút)", meaningEn: "half (30 min)", example: "7 giờ rưỡi.", exampleEn: "7:30.", partOfSpeech: "noun" },
          { word: "kém", meaning: "thiếu (nói giờ)", meaningEn: "to (telling time)", example: "8 giờ kém 15.", exampleEn: "7:45 (15 to 8).", partOfSpeech: "preposition" },
          { word: "sáng", meaning: "buổi sáng", meaningEn: "morning (AM)", example: "7 giờ sáng.", exampleEn: "7 AM.", partOfSpeech: "noun" },
          { word: "chiều", meaning: "buổi chiều", meaningEn: "afternoon (PM)", example: "3 giờ chiều.", exampleEn: "3 PM.", partOfSpeech: "noun" },
          { word: "tối", meaning: "buổi tối", meaningEn: "evening / night", example: "8 giờ tối.", exampleEn: "8 PM.", partOfSpeech: "noun" },
          { word: "trưa", meaning: "giữa ngày", meaningEn: "noon / midday", example: "12 giờ trưa.", exampleEn: "12 noon.", partOfSpeech: "noun" },
          { word: "đúng", meaning: "chính xác", meaningEn: "exactly", example: "Đúng 9 giờ.", exampleEn: "Exactly 9 o'clock.", partOfSpeech: "adverb" },
          { word: "khoảng", meaning: "ước chừng", meaningEn: "about / around", example: "Khoảng 5 giờ.", exampleEn: "Around 5 o'clock.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'7 giờ rưỡi' là mấy giờ?", questionEn: "What time is '7 giờ rưỡi'?", options: ["7:00", "7:15", "7:30", "7:45"], answer: 2, explanation: "'Rưỡi' = 30 phút.", explanationEn: "'Rưỡi' = half = :30." },
          { question: "'8 giờ kém 15' là mấy giờ?", questionEn: "What time?", options: ["8:15", "7:45", "8:45", "7:15"], answer: 1, explanation: "'Kém 15' = thiếu 15 = 7:45.", explanationEn: "'Kém 15' = 15 to = 7:45." },
          { question: "'Sáng' chỉ thời gian nào?", questionEn: "What time of day?", options: ["Afternoon", "Morning", "Night", "Noon"], answer: 1, explanation: "'Sáng' = morning.", explanationEn: "'Sáng' = morning." },
          { question: "'Khoảng' nghĩa gì?", questionEn: "What does 'khoảng' mean?", options: ["Exactly", "About / around", "Before", "After"], answer: 1, explanation: "'Khoảng' = approximately.", explanationEn: "'Khoảng' = approximately." },
          { question: "'12 giờ trưa' là?", questionEn: "What is '12 giờ trưa'?", options: ["Midnight", "Noon", "6 PM", "6 AM"], answer: 1, explanation: "'Trưa' = noon.", explanationEn: "'Trưa' = noon." },
        ],
      },
      {
        id: "vn-gram-37", title: "Cách hẹn hò và đặt lịch", titleEn: "Making Appointments", level: "intermediate",
        theory: `## Hẹn hò và đặt lịch

### 1. Đề nghị hẹn gặp

- **Bạn rảnh không**? *(Are you free?)*
- **Mình hẹn nhau đi cà phê nhé**?
- **Cuối tuần này bạn có kế hoạch gì chưa**?
- **Hôm nào rảnh, mình gặp nhau** nha!
- **Bạn có thời gian không**?

### 2. Đặt thời gian, địa điểm

**Mẫu**: [Khi nào] + [ở đâu] + [làm gì]?

- **Mai 7 giờ tối** ở quán cà phê Highlands được không?
- **Cuối tuần** mình đi xem phim ở Vincom nhé?
- **Chủ nhật** cả nhà đi ăn lẩu nhé!

### 3. Đồng ý / Từ chối lịch hẹn

**Đồng ý:**
- **Được, mình rảnh.** *(OK, I'm free.)*
- **Hay quá, mình sẽ đến.**
- **OK, hẹn gặp lại nhé!**
- **Chốt nhé**! *(Deal!)*

**Từ chối lịch sự:**
- **Xin lỗi, hôm đó mình bận rồi.**
- **Tiếc quá, mình có hẹn rồi. Hẹn lần sau nhé?**
- **Cho mình kiểm tra lịch đã**, mình báo lại sau.

### 4. Đặt chỗ — Nhà hàng / Khách sạn

- **Cho em đặt bàn** cho 4 người, **lúc 7 giờ tối mai** ạ.
- **Em muốn đặt phòng** 2 đêm, từ thứ Sáu đến Chủ nhật.
- **Có thể xác nhận giúp em** được không ạ?

### 5. Thay đổi / Hủy lịch

**Dời lịch (postpone):**
- **Mình có thể dời lịch không**? Sang **tuần sau** được không?
- **Hẹn lại sau nhé**!

**Hủy lịch (cancel):**
- **Xin lỗi, mình phải hủy** vì có việc gấp.
- **Cho mình hủy** cuộc hẹn ngày mai được không?

### 6. Hội thoại mẫu — Hẹn cà phê

> **A**: Cuối tuần này bạn **có rảnh không**? Mình **hẹn cà phê** nha!
>
> **B**: **Thứ Bảy mình rảnh**. **Mấy giờ** vậy?
>
> **A**: **3 giờ chiều ở quán The Coffee House** nhé?
>
> **B**: **OK, chốt nha**! **Đến đúng giờ** đó!
>
> **A**: **Yên tâm**! Hẹn gặp **3 giờ thứ Bảy**!

### 7. Từ vựng quan trọng

| Việt | Anh |
|------|-----|
| **rảnh** | free |
| **bận** | busy |
| **đặt (chỗ / lịch)** | book / reserve |
| **xác nhận** | confirm |
| **hủy** | cancel |
| **dời / đổi lịch** | reschedule |
| **đúng giờ** | on time |
| **trễ / muộn** | late |
| **chốt** | confirm (slang) |

### Lưu ý văn hóa

- Người Việt thường **xác nhận lại** lịch hẹn 1 ngày trước.
- **Đến trễ 5-15 phút** thường được chấp nhận trong văn hóa thân mật. Trong công việc nên đến **đúng giờ**.
- Nếu cần hủy → **báo càng sớm càng tốt** để giữ uy tín.`,
        theoryEn: `## Making Appointments

### 1. Suggesting a meet-up

- **Bạn rảnh không**? (Are you free?)
- **Mình hẹn nhau đi cà phê nhé**? (Let's meet for coffee?)
- **Cuối tuần này bạn có kế hoạch gì chưa**?
- **Hôm nào rảnh, mình gặp nhau** nha!

### 2. Setting time & place

**Pattern**: [When] + [where] + [what]?

- **Mai 7 giờ tối** ở quán cà phê Highlands được không?
- **Cuối tuần** mình đi xem phim ở Vincom nhé?
- **Chủ nhật** cả nhà đi ăn lẩu nhé!

### 3. Accepting / refusing

**Accepting:**
- **Được, mình rảnh.** (OK, I'm free.)
- **Hay quá, mình sẽ đến.** (Great, I'll come.)
- **OK, hẹn gặp lại nhé!**
- **Chốt nhé**! (Deal!)

**Polite refusal:**
- **Xin lỗi, hôm đó mình bận rồi.**
- **Tiếc quá, mình có hẹn rồi. Hẹn lần sau nhé?**
- **Cho mình kiểm tra lịch đã**, mình báo lại sau.

### 4. Booking — restaurant / hotel

- **Cho em đặt bàn** cho 4 người, **lúc 7 giờ tối mai** ạ.
- **Em muốn đặt phòng** 2 đêm, từ thứ Sáu đến Chủ nhật.
- **Có thể xác nhận giúp em** được không ạ?

### 5. Reschedule / cancel

**Reschedule:**
- **Mình có thể dời lịch không**? Sang **tuần sau** được không?
- **Hẹn lại sau nhé**!

**Cancel:**
- **Xin lỗi, mình phải hủy** vì có việc gấp.
- **Cho mình hủy** cuộc hẹn ngày mai được không?

### 6. Sample dialogue — coffee meet-up

> **A**: Are you free this weekend? Let's grab coffee!
>
> **B**: I'm free Saturday. What time?
>
> **A**: 3 PM at The Coffee House?
>
> **B**: OK, deal! Be on time!
>
> **A**: Don't worry! See you Saturday at 3.

### 7. Key vocabulary

| Vietnamese | English |
|-----------|---------|
| **rảnh** | free |
| **bận** | busy |
| **đặt (chỗ / lịch)** | book / reserve |
| **xác nhận** | confirm |
| **hủy** | cancel |
| **dời / đổi lịch** | reschedule |
| **đúng giờ** | on time |
| **trễ / muộn** | late |
| **chốt** | confirm (slang) |

### Cultural notes

- Vietnamese often **reconfirm** appointments 1 day before.
- **5-15 min late** is acceptable casually. Work — be **on time**.
- If you must cancel, **notify ASAP** to keep trust.`,
        vocabulary: [
          { word: "hẹn", meaning: "đặt lịch gặp", meaningEn: "to make an appointment", example: "Hẹn gặp ngày mai.", exampleEn: "See you tomorrow.", partOfSpeech: "verb" },
          { word: "gặp", meaning: "thấy mặt nhau", meaningEn: "to meet", example: "Gặp nhau lúc 3 giờ.", exampleEn: "Meet at 3 o'clock.", partOfSpeech: "verb" },
          { word: "rảnh", meaning: "không bận", meaningEn: "free / available", example: "Bạn rảnh không?", exampleEn: "Are you free?", partOfSpeech: "adjective" },
          { word: "bận", meaning: "không rảnh", meaningEn: "busy", example: "Hôm nay tôi bận.", exampleEn: "I'm busy today.", partOfSpeech: "adjective" },
          { word: "đặt", meaning: "sắp xếp trước", meaningEn: "to book / reserve", example: "Đặt bàn nhà hàng.", exampleEn: "Reserve a restaurant table.", partOfSpeech: "verb" },
          { word: "hủy", meaning: "bỏ lịch hẹn", meaningEn: "to cancel", example: "Hủy lịch hẹn.", exampleEn: "Cancel the appointment.", partOfSpeech: "verb" },
          { word: "dời", meaning: "đổi thời gian", meaningEn: "to postpone / reschedule", example: "Dời lịch sang tuần sau.", exampleEn: "Reschedule to next week.", partOfSpeech: "verb" },
          { word: "đúng giờ", meaning: "không trễ", meaningEn: "on time / punctual", example: "Đến đúng giờ nhé!", exampleEn: "Come on time!", partOfSpeech: "phrase" },
          { word: "trễ", meaning: "muộn", meaningEn: "late", example: "Xin lỗi, tôi đến trễ.", exampleEn: "Sorry, I'm late.", partOfSpeech: "adjective" },
          { word: "sẵn sàng", meaning: "chuẩn bị xong", meaningEn: "ready", example: "Tôi sẵn sàng.", exampleEn: "I'm ready.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Rảnh' nghĩa gì?", questionEn: "What does 'rảnh' mean?", options: ["Busy", "Free / available", "Late", "Early"], answer: 1, explanation: "'Rảnh' = free.", explanationEn: "'Rảnh' = free/available." },
          { question: "Cách hỏi ai rảnh không?", questionEn: "How to ask if someone is free?", options: ["Bạn bận không?", "Bạn rảnh không?", "Bạn đi không?", "Bạn ở đâu?"], answer: 1, explanation: "'Rảnh không?' = are you free?", explanationEn: "'Rảnh không?' = are you free?" },
          { question: "'Dời' nghĩa gì?", questionEn: "What does 'dời' mean?", options: ["Cancel", "Reschedule", "Confirm", "Book"], answer: 1, explanation: "'Dời' = reschedule/postpone.", explanationEn: "'Dời' = reschedule." },
          { question: "'Đúng giờ' nghĩa gì?", questionEn: "What does 'đúng giờ' mean?", options: ["Early", "Late", "On time", "Anytime"], answer: 2, explanation: "'Đúng giờ' = on time.", explanationEn: "'Đúng giờ' = on time." },
          { question: "'Hủy' trái nghĩa với?", questionEn: "Opposite of 'hủy'?", options: ["Dời", "Đặt / Xác nhận", "Trễ", "Rảnh"], answer: 1, explanation: "'Hủy' ↔ 'Đặt/Xác nhận'.", explanationEn: "'Hủy' (cancel) ↔ 'Đặt' (book)." },
        ],
      },
      {
        id: "vn-gram-38", title: "Cách kể chuyện và thuật lại", titleEn: "Storytelling & Narration", level: "intermediate",
        theory: `## Kể chuyện và thuật lại sự việc

### 1. Từ nối chỉ thứ tự thời gian

Đây là **xương sống** của một câu chuyện logic.

| Vị trí | Từ nối | Ví dụ |
|--------|--------|-------|
| Mở đầu | **Đầu tiên / Trước hết** | **Đầu tiên**, tôi dậy lúc 6 giờ. |
| Tiếp theo | **Sau đó / Tiếp theo / Rồi** | **Sau đó**, tôi ăn sáng. |
| Cùng lúc | **Trong khi / Trong lúc** | **Trong khi** ăn, tôi đọc báo. |
| Đột ngột | **Bỗng nhiên / Đột nhiên** | **Bỗng nhiên** trời mưa. |
| Kết quả | **Kết quả là / Do đó** | **Kết quả là** tôi đi muộn. |
| Cuối | **Cuối cùng / Sau cùng** | **Cuối cùng**, tôi đến công ty. |
| Từ lúc đó | **Kể từ đó** | **Kể từ đó**, tôi luôn dậy sớm. |

### 2. Thì trong tiếng Việt khi kể chuyện

Tiếng Việt **không chia động từ**, chỉ thêm dấu hiệu thời gian:

- **đã** (past): Tôi **đã** đến.
- **đang** (present continuous): Tôi **đang** đi.
- **sẽ** (future): Tôi **sẽ** kể.
- **vừa** (just): Tôi **vừa** ăn xong.

### 3. Cấu trúc kể chuyện — 5W1H

Một câu chuyện hoàn chỉnh nên có:

- **Khi nào** (when): Hôm qua, năm ngoái, lúc tôi 10 tuổi…
- **Ở đâu** (where): Ở Hà Nội, tại nhà tôi…
- **Ai** (who): Tôi, mẹ tôi, một người lạ…
- **Cái gì** (what): chuyện xảy ra
- **Tại sao** (why): lý do
- **Như thế nào** (how): kết quả

### 4. Đoạn văn mẫu — Một kỷ niệm khó quên

> **Năm tôi 8 tuổi**, có một chuyện xảy ra mà tôi không bao giờ quên. **Hôm đó**, **đầu tiên** tôi và bạn đi học về như thường lệ. **Sau đó**, chúng tôi quyết định đi vòng qua công viên. **Trong khi** đang chơi, **bỗng nhiên** trời nổi gió rồi mưa rất to. Chúng tôi **vội vàng** chạy về nhà nhưng **không kịp**. **Kết quả là** hai đứa ướt như chuột lột! **Cuối cùng**, mẹ phải đến đón. **Kể từ đó**, tôi luôn mang theo ô khi ra đường.

### 5. Cụm từ làm chuyện sống động

| Cụm | Tác dụng |
|-----|----------|
| **Bỗng nhiên / Đột nhiên** | tạo bất ngờ |
| **May mà / May là** | nhấn mạnh sự may mắn |
| **Không ngờ** | thể hiện sự bất ngờ |
| **Thật là / Thật ra** | đánh giá |
| **Đến giờ tôi vẫn nhớ** | kết thúc cảm xúc |

### 6. Kể lại lời người khác

**Trực tiếp**: Mẹ nói: **"Con đi cẩn thận nhé!"**

**Gián tiếp**: Mẹ nói **rằng** tôi đi cẩn thận. / Mẹ **bảo** tôi đi cẩn thận.

### Mẹo kể chuyện hay

1. **Sắp xếp thứ tự thời gian** rõ ràng với từ nối.
2. **Tả cảm xúc** để chuyện có hồn: hồi hộp, buồn, vui…
3. **Dùng câu cảm thán** cho điểm nhấn: "Thật là tuyệt vời!"
4. **Kết bằng bài học hoặc cảm xúc** thay vì chỉ kết thúc sự kiện.`,
        theoryEn: `## Storytelling & Narration

### 1. Sequence connectors

These are the **backbone** of a logical story.

| Position | Connector | Example |
|----------|-----------|---------|
| Opening | **Đầu tiên / Trước hết** (first) | **Đầu tiên**, tôi dậy lúc 6 giờ. |
| Next | **Sau đó / Tiếp theo / Rồi** (then) | **Sau đó**, tôi ăn sáng. |
| Simultaneous | **Trong khi / Trong lúc** (while) | **Trong khi** ăn, tôi đọc báo. |
| Sudden | **Bỗng nhiên / Đột nhiên** (suddenly) | **Bỗng nhiên** trời mưa. |
| Result | **Kết quả là / Do đó** (as a result) | **Kết quả là** tôi đi muộn. |
| Final | **Cuối cùng / Sau cùng** (finally) | **Cuối cùng**, tôi đến công ty. |
| Since then | **Kể từ đó** | **Kể từ đó**, tôi luôn dậy sớm. |

### 2. Time markers (no verb conjugation)

Vietnamese does **not conjugate verbs**, only adds time markers:

- **đã** (past): Tôi **đã** đến.
- **đang** (present cont.): Tôi **đang** đi.
- **sẽ** (future): Tôi **sẽ** kể.
- **vừa** (just): Tôi **vừa** ăn xong.

### 3. 5W1H story structure

A complete story should include:

- **When**: Hôm qua, năm ngoái, lúc tôi 10 tuổi…
- **Where**: Ở Hà Nội, tại nhà tôi…
- **Who**: Tôi, mẹ tôi, một người lạ…
- **What**: what happened
- **Why**: reason
- **How**: outcome

### 4. Sample paragraph — An unforgettable memory

> When I was 8, something happened that I'll never forget. That day, **first** my friend and I went home from school as usual. **Then** we decided to detour through the park. **While** we were playing, **suddenly** the wind picked up and it rained heavily. We **hurried** home but **didn't make it in time**. **As a result**, we were both soaked! **Finally**, my mom had to pick us up. **Since then**, I always carry an umbrella.

### 5. Phrases that make stories vivid

| Phrase | Effect |
|--------|--------|
| **Bỗng nhiên / Đột nhiên** | sudden twist |
| **May mà / May là** | emphasize luck |
| **Không ngờ** | express surprise |
| **Thật là / Thật ra** | evaluation |
| **Đến giờ tôi vẫn nhớ** | emotional ending |

### 6. Reporting speech

**Direct**: Mẹ nói: **"Con đi cẩn thận nhé!"**

**Indirect**: Mẹ nói **rằng** tôi đi cẩn thận. / Mẹ **bảo** tôi đi cẩn thận.

### Tips for great storytelling

1. **Use clear sequence connectors**.
2. **Describe emotions** to give life: nervous, sad, happy…
3. **Add exclamatives** for highlights: "Thật là tuyệt vời!"
4. **End with a lesson or emotion**, not just the event.`,
        vocabulary: [
          { word: "đầu tiên", meaning: "bước thứ nhất", meaningEn: "first / firstly", example: "Đầu tiên, rửa tay.", exampleEn: "First, wash hands.", partOfSpeech: "adverb" },
          { word: "sau đó", meaning: "tiếp theo", meaningEn: "then / after that", example: "Sau đó, ăn cơm.", exampleEn: "Then, eat rice.", partOfSpeech: "adverb" },
          { word: "tiếp theo", meaning: "bước kế tiếp", meaningEn: "next", example: "Tiếp theo là gì?", exampleEn: "What's next?", partOfSpeech: "adverb" },
          { word: "cuối cùng", meaning: "bước sau cùng", meaningEn: "finally / lastly", example: "Cuối cùng, rửa bát.", exampleEn: "Finally, wash dishes.", partOfSpeech: "adverb" },
          { word: "trước hết", meaning: "đầu tiên (trang trọng)", meaningEn: "first of all", example: "Trước hết, cảm ơn.", exampleEn: "First of all, thank you.", partOfSpeech: "adverb" },
          { word: "lúc đó", meaning: "thời điểm đó", meaningEn: "at that time", example: "Lúc đó tôi 10 tuổi.", exampleEn: "At that time I was 10.", partOfSpeech: "phrase" },
          { word: "bỗng nhiên", meaning: "đột ngột", meaningEn: "suddenly", example: "Bỗng nhiên trời mưa.", exampleEn: "Suddenly it rained.", partOfSpeech: "adverb" },
          { word: "kết quả", meaning: "hệ quả", meaningEn: "result / as a result", example: "Kết quả là tôi đậu.", exampleEn: "As a result, I passed.", partOfSpeech: "noun" },
          { word: "trong khi", meaning: "cùng lúc đó", meaningEn: "while / during", example: "Trong khi ăn.", exampleEn: "While eating.", partOfSpeech: "conjunction" },
          { word: "kể từ đó", meaning: "từ lúc đó", meaningEn: "since then", example: "Kể từ đó, tôi thay đổi.", exampleEn: "Since then, I changed.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "Thứ tự đúng?", questionEn: "Correct order?", options: ["Cuối cùng → Đầu tiên", "Đầu tiên → Sau đó → Cuối cùng", "Tiếp theo → Đầu tiên", "Cuối cùng → Sau đó"], answer: 1, explanation: "Đầu tiên → Sau đó → Cuối cùng.", explanationEn: "First → Then → Finally." },
          { question: "'Bỗng nhiên' nghĩa gì?", questionEn: "What does 'bỗng nhiên' mean?", options: ["Slowly", "Suddenly", "Always", "Never"], answer: 1, explanation: "'Bỗng nhiên' = suddenly.", explanationEn: "'Bỗng nhiên' = suddenly." },
          { question: "'Trong khi' nghĩa gì?", questionEn: "What does 'trong khi' mean?", options: ["Before", "After", "While", "Until"], answer: 2, explanation: "'Trong khi' = while.", explanationEn: "'Trong khi' = while." },
          { question: "'Kể từ đó' chỉ gì?", questionEn: "What does 'kể từ đó' indicate?", options: ["Trước đó", "Từ lúc đó đến nay", "Sau này", "Bây giờ"], answer: 1, explanation: "'Kể từ đó' = since then.", explanationEn: "'Kể từ đó' = since then." },
          { question: "'Trước hết' dùng khi nào?", questionEn: "When to use 'trước hết'?", options: ["Cuối câu chuyện", "Đầu tiên (trang trọng)", "Giữa chuyện", "Kết thúc"], answer: 1, explanation: "Bước đầu tiên (formal).", explanationEn: "First step (formal)." },
        ],
      },
      {
        id: "vn-gram-39", title: "Cách nói về sức khỏe", titleEn: "Talking About Health", level: "beginner",
        theory: `## Nói về sức khỏe

### 1. Chào hỏi về sức khỏe

- **Bạn (có) khỏe không**? *(How are you / Are you well?)*
- **Dạo này thế nào**? *(How are things lately?)*
- **Sức khỏe sao rồi**?

**Trả lời:**
- **Cảm ơn, tôi khỏe.** / **Tôi vẫn khỏe.**
- **Bình thường thôi.** *(Just normal.)*
- **Tôi hơi mệt / hơi ốm.**

### 2. Diễn tả triệu chứng — "Tôi bị + …"

**Cấu trúc**: Tôi **bị** + [triệu chứng / bệnh]

| Triệu chứng | Việt | Anh |
|------------|------|-----|
| Đau đầu | Tôi **bị đau đầu**. | Headache |
| Đau bụng | Tôi **bị đau bụng**. | Stomachache |
| Sốt | Tôi **bị sốt** 38 độ. | Fever |
| Ho | Tôi **bị ho** nhiều. | Cough |
| Sổ mũi | Tôi **bị sổ mũi**. | Runny nose |
| Cảm | Tôi **bị cảm**. | Cold |
| Cúm | Tôi **bị cúm**. | Flu |
| Đau răng | Tôi **bị đau răng**. | Toothache |
| Tiêu chảy | Tôi **bị tiêu chảy**. | Diarrhea |
| Dị ứng | Tôi **bị dị ứng** với hải sản. | Allergy |

### 3. Các bộ phận cơ thể

- **đầu** (head), **mắt** (eye), **mũi** (nose), **tai** (ear), **miệng** (mouth)
- **cổ** (neck), **vai** (shoulder), **ngực** (chest), **lưng** (back)
- **bụng** (stomach), **tay** (hand), **chân** (leg)
- **răng** (tooth), **họng / cổ họng** (throat)

### 4. Đi khám bác sĩ — Hội thoại mẫu

> **Bác sĩ**: Chào em, em **bị làm sao**?
>
> **Bệnh nhân**: Chào bác sĩ, em **bị đau đầu** và **sốt** 2 ngày rồi ạ.
>
> **Bác sĩ**: Em có **ho** hay **sổ mũi** không?
>
> **Bệnh nhân**: Em **bị ho** và **đau họng** nữa ạ.
>
> **Bác sĩ**: Em **bị cảm cúm**. Tôi sẽ kê **đơn thuốc**. Em **nhớ uống đủ nước**, **nghỉ ngơi** nhiều, và **không ăn đồ lạnh** nhé!
>
> **Bệnh nhân**: **Vâng, em cảm ơn bác sĩ ạ**!

### 5. Khuyên về sức khỏe

- **Bạn nên** đi khám bác sĩ.
- **Bạn cần** nghỉ ngơi.
- **Bạn phải** uống thuốc đúng giờ.
- **Đừng** thức khuya.
- **Hãy** ăn nhiều rau xanh.

### 6. Từ vựng khám chữa bệnh

| Việt | Anh |
|------|-----|
| **bệnh viện** | hospital |
| **phòng khám** | clinic |
| **bác sĩ** | doctor |
| **y tá / điều dưỡng** | nurse |
| **thuốc** | medicine |
| **đơn thuốc** | prescription |
| **khám bệnh** | medical check-up |
| **xét nghiệm** | test |
| **mổ / phẫu thuật** | surgery |
| **bảo hiểm y tế** | health insurance |

### Mẹo văn hóa

- **"Bạn khỏe không?"** là **câu chào hỏi**, không phải hỏi thực sự — chỉ cần trả lời ngắn gọn "Cảm ơn, tôi khỏe".
- Khi bị ốm, người Việt thường **uống nước cam, ăn cháo** để hồi phục.
- Thuốc dân gian: **gừng + mật ong** trị cảm, **lá tía tô** giải cảm.`,
        theoryEn: `## Talking About Health

### 1. Health greetings

- **Bạn (có) khỏe không**? (How are you?)
- **Dạo này thế nào**? (How are things lately?)
- **Sức khỏe sao rồi**?

**Replies:**
- **Cảm ơn, tôi khỏe.** (Thanks, I'm well.)
- **Bình thường thôi.** (Just normal.)
- **Tôi hơi mệt / hơi ốm.** (A bit tired / sick.)

### 2. Symptoms — "Tôi bị + …"

**Structure**: Tôi **bị** + [symptom / illness]

| Symptom | Vietnamese | English |
|---------|-----------|---------|
| Headache | Tôi **bị đau đầu**. | Headache |
| Stomachache | Tôi **bị đau bụng**. | Stomachache |
| Fever | Tôi **bị sốt** 38 độ. | Fever |
| Cough | Tôi **bị ho** nhiều. | Cough |
| Runny nose | Tôi **bị sổ mũi**. | Runny nose |
| Cold | Tôi **bị cảm**. | Cold |
| Flu | Tôi **bị cúm**. | Flu |
| Toothache | Tôi **bị đau răng**. | Toothache |
| Diarrhea | Tôi **bị tiêu chảy**. | Diarrhea |
| Allergy | Tôi **bị dị ứng** với hải sản. | Allergy |

### 3. Body parts

- **đầu** (head), **mắt** (eye), **mũi** (nose), **tai** (ear), **miệng** (mouth)
- **cổ** (neck), **vai** (shoulder), **ngực** (chest), **lưng** (back)
- **bụng** (stomach), **tay** (hand), **chân** (leg)
- **răng** (tooth), **họng** (throat)

### 4. Doctor's visit — sample dialogue

> **Doctor**: Hi, what's wrong?
>
> **Patient**: Hi doctor, I've had a headache and fever for 2 days.
>
> **Doctor**: Any coughing or runny nose?
>
> **Patient**: Yes, cough and sore throat too.
>
> **Doctor**: You have the flu. I'll write a prescription. Drink plenty of water, rest a lot, and avoid cold food.
>
> **Patient**: Thank you, doctor!

### 5. Health advice

- **Bạn nên** đi khám bác sĩ. (You should see a doctor.)
- **Bạn cần** nghỉ ngơi.
- **Bạn phải** uống thuốc đúng giờ.
- **Đừng** thức khuya.
- **Hãy** ăn nhiều rau xanh.

### 6. Medical vocabulary

| Vietnamese | English |
|-----------|---------|
| **bệnh viện** | hospital |
| **phòng khám** | clinic |
| **bác sĩ** | doctor |
| **y tá / điều dưỡng** | nurse |
| **thuốc** | medicine |
| **đơn thuốc** | prescription |
| **khám bệnh** | check-up |
| **xét nghiệm** | test |
| **mổ / phẫu thuật** | surgery |
| **bảo hiểm y tế** | health insurance |

### Cultural tips

- **"Bạn khỏe không?"** is a **greeting**, not a real question — just reply briefly.
- When sick, Vietnamese often **drink orange juice, eat rice porridge (cháo)** to recover.
- Folk remedies: **ginger + honey** for cold; **perilla leaves (tía tô)** for fever.`,
        vocabulary: [
          { word: "khỏe", meaning: "sức khỏe tốt", meaningEn: "healthy / well", example: "Bạn khỏe không?", exampleEn: "Are you well?", partOfSpeech: "adjective" },
          { word: "ốm", meaning: "bị bệnh", meaningEn: "sick / ill", example: "Tôi bị ốm.", exampleEn: "I'm sick.", partOfSpeech: "adjective" },
          { word: "đau", meaning: "cảm giác đau", meaningEn: "pain / to hurt", example: "Đau đầu quá.", exampleEn: "Terrible headache.", partOfSpeech: "adjective/verb" },
          { word: "sốt", meaning: "nhiệt độ cao", meaningEn: "fever", example: "Em bị sốt.", exampleEn: "She has a fever.", partOfSpeech: "noun/verb" },
          { word: "ho", meaning: "ho (triệu chứng)", meaningEn: "to cough", example: "Ho nhiều ngày.", exampleEn: "Coughing for days.", partOfSpeech: "verb" },
          { word: "thuốc", meaning: "dược phẩm", meaningEn: "medicine", example: "Uống thuốc đi.", exampleEn: "Take the medicine.", partOfSpeech: "noun" },
          { word: "bệnh viện", meaning: "nơi chữa bệnh", meaningEn: "hospital", example: "Đi bệnh viện.", exampleEn: "Go to the hospital.", partOfSpeech: "noun" },
          { word: "bác sĩ", meaning: "người chữa bệnh", meaningEn: "doctor", example: "Khám bác sĩ.", exampleEn: "See a doctor.", partOfSpeech: "noun" },
          { word: "nghỉ ngơi", meaning: "không làm việc", meaningEn: "to rest", example: "Nên nghỉ ngơi.", exampleEn: "Should rest.", partOfSpeech: "verb" },
          { word: "khám", meaning: "kiểm tra sức khỏe", meaningEn: "to examine / check up", example: "Đi khám bệnh.", exampleEn: "Go for a check-up.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Bạn khỏe không?' dùng khi nào?", questionEn: "When to use?", options: ["Mua sắm", "Chào hỏi", "Xin lỗi", "Khen"], answer: 1, explanation: "Câu chào hỏi phổ biến.", explanationEn: "Common greeting." },
          { question: "'Ốm' nghĩa gì?", questionEn: "What does 'ốm' mean?", options: ["Healthy", "Sick", "Happy", "Tired"], answer: 1, explanation: "'Ốm' = sick.", explanationEn: "'Ốm' = sick." },
          { question: "'Sốt' là triệu chứng gì?", questionEn: "What symptom?", options: ["Đau bụng", "Nhiệt độ cao", "Ho", "Đau đầu"], answer: 1, explanation: "'Sốt' = fever.", explanationEn: "'Sốt' = fever." },
          { question: "Khi bị ốm nên làm gì?", questionEn: "What to do when sick?", options: ["Đi chơi", "Đi khám bác sĩ", "Đi làm", "Tập thể dục"], answer: 1, explanation: "Đi khám bác sĩ.", explanationEn: "See a doctor." },
          { question: "'Nghỉ ngơi' nghĩa gì?", questionEn: "What does 'nghỉ ngơi' mean?", options: ["Work hard", "Rest", "Exercise", "Study"], answer: 1, explanation: "'Nghỉ ngơi' = rest.", explanationEn: "'Nghỉ ngơi' = rest." },
        ],
      },
      {
        id: "vn-gram-40", title: "Cách nói về thời tiết", titleEn: "Talking About Weather", level: "beginner",
        theory: `## Nói về thời tiết

### 1. Hỏi về thời tiết

- **Hôm nay thời tiết thế nào**? *(How's the weather today?)*
- **Trời hôm nay ra sao**?
- **Mai trời nắng hay mưa**?
- **Có lạnh không**?

### 2. Mẫu câu trả lời — "Trời + tính từ"

**Cấu trúc**: **Trời** + [tính từ / hiện tượng]

| Câu | Tiếng Anh |
|-----|-----------|
| Trời **nắng đẹp**. | Sunny weather. |
| Trời **mưa to**. | Heavy rain. |
| Trời **nóng quá**! | So hot! |
| Trời **lạnh lắm**. | Very cold. |
| Trời **âm u / nhiều mây**. | Cloudy. |
| Trời **se lạnh**. | Slightly chilly. |
| Trời **oi bức**. | Stuffy / muggy. |
| Trời **gió to**. | Windy. |

### 3. Nhiệt độ

- Hôm nay **bao nhiêu độ**? *(What's the temperature?)*
- Khoảng **30 độ C** *(About 30°C)*.
- **Trời ấm** *(warm)* / **mát** *(cool)* / **rét** *(very cold)* / **buốt** *(freezing)*.

### 4. Mùa ở Việt Nam

Việt Nam có khí hậu khác nhau theo vùng:

**Miền Bắc** — 4 mùa rõ rệt:
- **Mùa xuân** (Spring, T1-T3): mát, ẩm.
- **Mùa hè** (Summer, T4-T6): nóng, mưa.
- **Mùa thu** (Autumn, T7-T9): mát, đẹp nhất năm.
- **Mùa đông** (Winter, T10-T12): lạnh, có khi rét.

**Miền Nam** — 2 mùa:
- **Mùa khô** (Dry, T11-T4): nắng nhiều.
- **Mùa mưa** (Rainy, T5-T10): mưa rào hàng ngày.

### 5. Hiện tượng thời tiết

| Từ | Nghĩa | Ví dụ |
|----|-------|-------|
| **mưa rào** | shower | **Mưa rào** buổi chiều. |
| **mưa phùn** | drizzle | Hà Nội có **mưa phùn**. |
| **mưa đá** | hail | Hiếm khi có **mưa đá**. |
| **bão** | storm / typhoon | **Bão số 5** đổ bộ. |
| **lũ lụt** | flood | **Lũ lụt** miền Trung. |
| **sương mù** | fog | **Sương mù** dày đặc. |
| **tuyết** | snow | **Tuyết rơi** ở Sapa. |
| **cầu vồng** | rainbow | **Cầu vồng** sau mưa. |

### 6. Dự báo thời tiết

- **Dự báo thời tiết** cho biết: ngày mai mưa to.
- **Có thể có bão** vào cuối tuần.
- **Trời sẽ chuyển lạnh** vào đêm.

### 7. Hội thoại mẫu

> **A**: **Hôm nay trời thế nào**?
>
> **B**: **Nắng đẹp** nhưng **hơi nóng**. Khoảng **32 độ**.
>
> **A**: **Mai sao**? Mình tính đi biển.
>
> **B**: **Dự báo nói mai có mưa rào** buổi chiều. Đi sớm thôi!
>
> **A**: **Cảm ơn nha**! Vậy mình đi từ 6 giờ sáng.

### 8. Tục ngữ về thời tiết

- **"Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm."** *(Dragonflies fly low → rain.)*
- **"Đêm tháng năm chưa nằm đã sáng."** *(May nights are very short.)*

### Lưu ý

- Khi gặp người Việt, **bình luận về thời tiết** là cách bắt chuyện rất tự nhiên.
- Người Bắc rất nhạy cảm với **"trở trời"** (weather change) — thường bị đau đầu, ốm khi giao mùa.`,
        theoryEn: `## Talking About Weather

### 1. Asking about weather

- **Hôm nay thời tiết thế nào**? (How's the weather today?)
- **Trời hôm nay ra sao**?
- **Mai trời nắng hay mưa**?
- **Có lạnh không**?

### 2. Reply pattern — "Trời + adjective"

**Structure**: **Trời** + [adjective / phenomenon]

| Sentence | English |
|----------|---------|
| Trời **nắng đẹp**. | Sunny. |
| Trời **mưa to**. | Heavy rain. |
| Trời **nóng quá**! | So hot! |
| Trời **lạnh lắm**. | Very cold. |
| Trời **âm u / nhiều mây**. | Cloudy. |
| Trời **se lạnh**. | Slightly chilly. |
| Trời **oi bức**. | Muggy. |
| Trời **gió to**. | Windy. |

### 3. Temperature

- Hôm nay **bao nhiêu độ**? (What's the temperature?)
- Khoảng **30 độ C**. (About 30°C.)
- **Trời ấm** (warm) / **mát** (cool) / **rét** (very cold) / **buốt** (freezing).

### 4. Seasons in Vietnam

Vietnam has different climates by region:

**North** — 4 distinct seasons:
- **Spring** (Jan-Mar): cool, humid.
- **Summer** (Apr-Jun): hot, rainy.
- **Autumn** (Jul-Sep): cool, the most beautiful season.
- **Winter** (Oct-Dec): cold, sometimes very cold.

**South** — 2 seasons:
- **Dry** (Nov-Apr): sunny.
- **Rainy** (May-Oct): daily showers.

### 5. Weather phenomena

| Word | Meaning | Example |
|------|---------|---------|
| **mưa rào** | shower | Afternoon shower. |
| **mưa phùn** | drizzle | Hanoi drizzle. |
| **mưa đá** | hail | Rare hail. |
| **bão** | storm / typhoon | Typhoon No. 5 making landfall. |
| **lũ lụt** | flood | Central Vietnam floods. |
| **sương mù** | fog | Heavy fog. |
| **tuyết** | snow | Snow in Sapa. |
| **cầu vồng** | rainbow | Rainbow after rain. |

### 6. Forecast

- **Forecast** says: heavy rain tomorrow.
- **A storm may come** at the weekend.
- **It will turn cold** overnight.

### 7. Sample dialogue

> **A**: How's the weather today?
>
> **B**: Sunny but a bit hot. About 32°C.
>
> **A**: What about tomorrow? I'm planning a beach trip.
>
> **B**: Forecast says afternoon showers. Go early!
>
> **A**: Thanks! I'll leave by 6 AM.

### 8. Weather proverbs

- **"Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm."** (Low-flying dragonflies → rain.)
- **"Đêm tháng năm chưa nằm đã sáng."** (May nights are very short.)

### Notes

- Commenting on the weather is a natural conversation starter in Vietnamese.
- Northern Vietnamese are sensitive to **"trở trời"** (weather changes) — often get headaches at the change of seasons.`,
        vocabulary: [
          { word: "nóng", meaning: "nhiệt độ cao", meaningEn: "hot", example: "Trời nóng quá!", exampleEn: "It's so hot!", partOfSpeech: "adjective" },
          { word: "lạnh", meaning: "nhiệt độ thấp", meaningEn: "cold", example: "Mùa đông lạnh.", exampleEn: "Winter is cold.", partOfSpeech: "adjective" },
          { word: "mưa", meaning: "nước từ trời", meaningEn: "rain / to rain", example: "Trời đang mưa.", exampleEn: "It's raining.", partOfSpeech: "noun/verb" },
          { word: "nắng", meaning: "ánh mặt trời", meaningEn: "sunny", example: "Hôm nay nắng đẹp.", exampleEn: "Today is sunny.", partOfSpeech: "adjective/noun" },
          { word: "gió", meaning: "không khí chuyển động", meaningEn: "wind", example: "Gió mạnh lắm.", exampleEn: "Very strong wind.", partOfSpeech: "noun" },
          { word: "mây", meaning: "hơi nước trên trời", meaningEn: "cloud", example: "Trời nhiều mây.", exampleEn: "Cloudy sky.", partOfSpeech: "noun" },
          { word: "ẩm", meaning: "độ ẩm cao", meaningEn: "humid", example: "Hà Nội rất ẩm.", exampleEn: "Hanoi is very humid.", partOfSpeech: "adjective" },
          { word: "bão", meaning: "gió mạnh mưa lớn", meaningEn: "storm / typhoon", example: "Sắp có bão.", exampleEn: "Storm coming.", partOfSpeech: "noun" },
          { word: "mùa", meaning: "thời kỳ trong năm", meaningEn: "season", example: "Mùa hè nóng.", exampleEn: "Summer is hot.", partOfSpeech: "noun" },
          { word: "dự báo", meaning: "nói trước", meaningEn: "forecast", example: "Dự báo thời tiết.", exampleEn: "Weather forecast.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "'Trời nóng quá!' nghĩa gì?", questionEn: "What does it mean?", options: ["It's cold!", "It's so hot!", "It's raining!", "It's windy!"], answer: 1, explanation: "'Nóng quá' = so hot.", explanationEn: "'Nóng quá' = so hot." },
          { question: "VN có mấy mùa chính?", questionEn: "How many main seasons?", options: ["1", "2", "3", "4"], answer: 1, explanation: "2 mùa: mưa và khô (miền Nam) hoặc 4 mùa (miền Bắc).", explanationEn: "2 in south, 4 in north." },
          { question: "'Ẩm' nghĩa gì?", questionEn: "What does 'ẩm' mean?", options: ["Dry", "Humid", "Cold", "Hot"], answer: 1, explanation: "'Ẩm' = humid.", explanationEn: "'Ẩm' = humid." },
          { question: "'Bão' là gì?", questionEn: "What is 'bão'?", options: ["Rain", "Snow", "Storm/Typhoon", "Fog"], answer: 2, explanation: "'Bão' = storm/typhoon.", explanationEn: "'Bão' = storm." },
          { question: "'Dự báo thời tiết' nghĩa gì?", questionEn: "Meaning?", options: ["Weather history", "Weather forecast", "Climate change", "Seasons"], answer: 1, explanation: "'Dự báo' = forecast.", explanationEn: "'Dự báo' = forecast." },
        ],
      },
    ],
  },
];

// Module: Thực hành giao tiếp nâng cao
export const advancedCommunicationModule: VietnameseModule = {
  id: "vn-gram-adv-comm",
  title: "Thực hành giao tiếp nâng cao",
  titleEn: "Advanced Communication Practice",
  icon: "🗣️",
  color: "from-violet-500 to-purple-600",
  description: "Giao tiếp tự tin trong mọi tình huống",
  descriptionEn: "Communicate confidently in any situation",
  category: "grammar",
  lessons: [
    {
      id: "adv-comm-1",
      title: "Thuyết trình & Phát biểu",
      titleEn: "Presentations & Public Speaking",
      level: "advanced",
      theory: `## Thuyết trình bằng tiếng Việt 🎤\n\nKhi thuyết trình, cần sử dụng:\n- **Câu mở đầu**: "Xin chào quý vị, hôm nay tôi xin trình bày về..."\n- **Chuyển ý**: "Tiếp theo, tôi muốn đề cập đến..."\n- **Kết luận**: "Tóm lại, chúng ta có thể thấy rằng..."\n- **Mời câu hỏi**: "Quý vị có câu hỏi nào không ạ?"`,
      theoryEn: `## Presenting in Vietnamese 🎤\n\nWhen presenting, use:\n- **Opening**: "Xin chào quý vị, hôm nay tôi xin trình bày về..."\n- **Transitions**: "Tiếp theo, tôi muốn đề cập đến..."\n- **Conclusion**: "Tóm lại, chúng ta có thể thấy rằng..."\n- **Q&A**: "Quý vị có câu hỏi nào không ạ?"`,
      vocabulary: [
        { word: "thuyết trình", meaning: "trình bày trước công chúng", meaningEn: "presentation", example: "Tôi có bài thuyết trình ngày mai.", exampleEn: "I have a presentation tomorrow.", partOfSpeech: "verb" },
        { word: "quý vị", meaning: "cách xưng hô trang trọng", meaningEn: "ladies and gentlemen", example: "Xin chào quý vị.", exampleEn: "Hello, ladies and gentlemen.", partOfSpeech: "noun" },
        { word: "trình bày", meaning: "nêu ra, giải thích", meaningEn: "to present / explain", example: "Anh ấy trình bày rất rõ ràng.", exampleEn: "He presented very clearly.", partOfSpeech: "verb" },
        { word: "đề cập", meaning: "nhắc đến", meaningEn: "to mention", example: "Tôi muốn đề cập đến vấn đề này.", exampleEn: "I want to mention this issue.", partOfSpeech: "verb" },
        { word: "tóm lại", meaning: "kết luận ngắn gọn", meaningEn: "in summary", example: "Tóm lại, dự án thành công.", exampleEn: "In summary, the project was successful.", partOfSpeech: "phrase" },
        { word: "biểu đồ", meaning: "hình vẽ thể hiện số liệu", meaningEn: "chart / diagram", example: "Hãy xem biểu đồ này.", exampleEn: "Please look at this chart.", partOfSpeech: "noun" },
        { word: "lập luận", meaning: "đưa ra lý lẽ", meaningEn: "to argue / argument", example: "Lập luận của cô ấy rất thuyết phục.", exampleEn: "Her argument was very convincing.", partOfSpeech: "noun" },
        { word: "thuyết phục", meaning: "làm cho tin theo", meaningEn: "to convince / persuasive", example: "Bài nói rất thuyết phục.", exampleEn: "The speech was very persuasive.", partOfSpeech: "adjective" },
        { word: "tự tin", meaning: "tin vào bản thân", meaningEn: "confident", example: "Hãy tự tin khi nói.", exampleEn: "Be confident when speaking.", partOfSpeech: "adjective" },
        { word: "kết luận", meaning: "phần cuối cùng", meaningEn: "conclusion", example: "Kết luận của báo cáo rất rõ.", exampleEn: "The report's conclusion was clear.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "'Quý vị' dùng trong ngữ cảnh nào?", questionEn: "When is 'quý vị' used?", options: ["Nói chuyện với bạn bè", "Thuyết trình trang trọng", "Nhắn tin", "Đi chợ"], answer: 1, explanation: "'Quý vị' là cách xưng hô trang trọng.", explanationEn: "'Quý vị' is a formal address." },
        { question: "'Tóm lại' đặt ở đâu trong bài nói?", questionEn: "Where does 'tóm lại' go?", options: ["Mở đầu", "Giữa bài", "Kết luận", "Tiêu đề"], answer: 2, explanation: "'Tóm lại' dùng khi kết luận.", explanationEn: "'Tóm lại' is used in the conclusion." },
        { question: "'Đề cập' nghĩa gì?", questionEn: "What does 'đề cập' mean?", options: ["Kết thúc", "Nhắc đến", "Từ chối", "Đồng ý"], answer: 1, explanation: "'Đề cập' = nhắc đến một vấn đề.", explanationEn: "'Đề cập' = to mention a topic." },
        { question: "'Lập luận' là gì?", questionEn: "What is 'lập luận'?", options: ["Câu hỏi", "Lý lẽ, chứng minh", "Lời chào", "Từ vựng"], answer: 1, explanation: "'Lập luận' = reasoning, argument.", explanationEn: "'Lập luận' = reasoning." },
        { question: "Câu nào mời đặt câu hỏi?", questionEn: "Which invites questions?", options: ["Tóm lại...", "Quý vị có câu hỏi nào không?", "Tiếp theo...", "Xin chào."], answer: 1, explanation: "Câu mời đặt câu hỏi sau thuyết trình.", explanationEn: "Inviting questions after a presentation." },
      ],
    },
    {
      id: "adv-comm-2",
      title: "Đàm phán & Thương lượng",
      titleEn: "Negotiation & Bargaining",
      level: "advanced",
      theory: `## Nghệ thuật đàm phán 🤝\n\n- **Đề xuất**: "Tôi đề nghị chúng ta..."\n- **Nhượng bộ**: "Tôi có thể đồng ý nếu..."\n- **Từ chối lịch sự**: "Rất tiếc, điều này khó thực hiện vì..."\n- **Thỏa thuận**: "Vậy chúng ta thống nhất rằng..."`,
      theoryEn: `## The Art of Negotiation 🤝\n\n- **Proposal**: "Tôi đề nghị chúng ta..."\n- **Concession**: "Tôi có thể đồng ý nếu..."\n- **Polite refusal**: "Rất tiếc, điều này khó thực hiện vì..."\n- **Agreement**: "Vậy chúng ta thống nhất rằng..."`,
      vocabulary: [
        { word: "đàm phán", meaning: "bàn bạc để đạt thỏa thuận", meaningEn: "negotiation", example: "Cuộc đàm phán kéo dài 3 giờ.", exampleEn: "The negotiation lasted 3 hours.", partOfSpeech: "noun" },
        { word: "đề nghị", meaning: "đưa ra yêu cầu", meaningEn: "to propose / suggest", example: "Tôi đề nghị giảm giá 10%.", exampleEn: "I propose a 10% discount.", partOfSpeech: "verb" },
        { word: "nhượng bộ", meaning: "chấp nhận một phần", meaningEn: "to concede", example: "Cả hai bên đều nhượng bộ.", exampleEn: "Both sides made concessions.", partOfSpeech: "verb" },
        { word: "thỏa thuận", meaning: "sự đồng ý chung", meaningEn: "agreement", example: "Chúng tôi đạt thỏa thuận.", exampleEn: "We reached an agreement.", partOfSpeech: "noun" },
        { word: "điều kiện", meaning: "yêu cầu cần đáp ứng", meaningEn: "condition", example: "Điều kiện này quá cao.", exampleEn: "This condition is too high.", partOfSpeech: "noun" },
        { word: "hợp đồng", meaning: "văn bản ràng buộc", meaningEn: "contract", example: "Ký hợp đồng ngày mai.", exampleEn: "Signing the contract tomorrow.", partOfSpeech: "noun" },
        { word: "lợi ích", meaning: "cái có lợi", meaningEn: "benefit", example: "Lợi ích cho cả hai bên.", exampleEn: "Benefits for both sides.", partOfSpeech: "noun" },
        { word: "thống nhất", meaning: "đồng ý chung", meaningEn: "to agree / unify", example: "Tất cả thống nhất phương án.", exampleEn: "Everyone agreed on the plan.", partOfSpeech: "verb" },
        { word: "chiến lược", meaning: "kế hoạch tổng thể", meaningEn: "strategy", example: "Chiến lược đàm phán hiệu quả.", exampleEn: "An effective negotiation strategy.", partOfSpeech: "noun" },
        { word: "đối tác", meaning: "bên cộng tác", meaningEn: "partner", example: "Đối tác rất hài lòng.", exampleEn: "The partner is very satisfied.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "'Nhượng bộ' nghĩa gì?", questionEn: "What does 'nhượng bộ' mean?", options: ["Thắng tuyệt đối", "Chấp nhận nhường", "Từ chối", "Hủy bỏ"], answer: 1, explanation: "Nhượng bộ = chấp nhận nhường một phần.", explanationEn: "Concede = accept to give in partially." },
        { question: "'Thỏa thuận' là gì?", questionEn: "What is 'thỏa thuận'?", options: ["Tranh cãi", "Sự đồng ý", "Từ chối", "Phản đối"], answer: 1, explanation: "'Thỏa thuận' = agreement.", explanationEn: "'Thỏa thuận' = agreement." },
        { question: "Câu nào thể hiện đề xuất?", questionEn: "Which shows a proposal?", options: ["Tôi từ chối.", "Tôi đề nghị...", "Tôi không biết.", "Rất tiếc."], answer: 1, explanation: "'Đề nghị' = to propose.", explanationEn: "'Đề nghị' = to propose." },
        { question: "'Đối tác' là ai?", questionEn: "Who is 'đối tác'?", options: ["Đối thủ", "Bên hợp tác", "Khách hàng", "Nhân viên"], answer: 1, explanation: "'Đối tác' = partner, collaborator.", explanationEn: "'Đối tác' = partner." },
        { question: "'Hợp đồng' là gì?", questionEn: "What is 'hợp đồng'?", options: ["Thư mời", "Văn bản ràng buộc pháp lý", "Email", "Báo cáo"], answer: 1, explanation: "'Hợp đồng' = contract.", explanationEn: "'Hợp đồng' = contract." },
      ],
    },
    {
      id: "adv-comm-3",
      title: "Viết Email & Thư trang trọng",
      titleEn: "Formal Email & Letter Writing",
      level: "advanced",
      theory: `## Email trang trọng tiếng Việt ✉️\n\n**Cấu trúc:**\n1. **Kính gửi**: Anh/Chị [Tên], Quý công ty...\n2. **Nội dung**: Trình bày mục đích rõ ràng\n3. **Kết thư**: "Trân trọng cảm ơn", "Kính thư"\n\n**Lưu ý**: Sử dụng kính ngữ, tránh viết tắt, dùng "ạ" khi cần.`,
      theoryEn: `## Formal Vietnamese Email ✉️\n\n**Structure:**\n1. **Greeting**: Kính gửi Anh/Chị [Name]...\n2. **Body**: State the purpose clearly\n3. **Closing**: "Trân trọng cảm ơn", "Kính thư"\n\n**Note**: Use honorifics, avoid abbreviations, use "ạ" when appropriate.`,
      vocabulary: [
        { word: "kính gửi", meaning: "lời chào trang trọng", meaningEn: "dear (formal)", example: "Kính gửi Giám đốc.", exampleEn: "Dear Director.", partOfSpeech: "phrase" },
        { word: "trân trọng", meaning: "tôn kính, quý trọng", meaningEn: "respectfully / sincerely", example: "Trân trọng cảm ơn.", exampleEn: "Sincerely thank you.", partOfSpeech: "adjective" },
        { word: "đính kèm", meaning: "gửi kèm theo", meaningEn: "to attach", example: "Tôi đính kèm tài liệu.", exampleEn: "I've attached the document.", partOfSpeech: "verb" },
        { word: "phúc đáp", meaning: "trả lời thư", meaningEn: "to reply (formal)", example: "Xin phúc đáp thư ngày 5/1.", exampleEn: "Replying to the letter dated Jan 5.", partOfSpeech: "verb" },
        { word: "tài liệu", meaning: "giấy tờ, văn bản", meaningEn: "document", example: "Tài liệu đã gửi qua email.", exampleEn: "Documents sent via email.", partOfSpeech: "noun" },
        { word: "kính thư", meaning: "lời kết thư trang trọng", meaningEn: "respectfully yours", example: "Kính thư, Nguyễn Văn A.", exampleEn: "Respectfully, Nguyen Van A.", partOfSpeech: "phrase" },
        { word: "xác nhận", meaning: "công nhận là đúng", meaningEn: "to confirm", example: "Xin xác nhận cuộc hẹn.", exampleEn: "Please confirm the appointment.", partOfSpeech: "verb" },
        { word: "thông báo", meaning: "cho biết tin", meaningEn: "to notify / announcement", example: "Xin thông báo lịch họp mới.", exampleEn: "Please be notified of the new schedule.", partOfSpeech: "verb" },
        { word: "đề xuất", meaning: "đưa ra ý kiến", meaningEn: "to propose", example: "Tôi đề xuất phương án B.", exampleEn: "I propose option B.", partOfSpeech: "verb" },
        { word: "hồi âm", meaning: "trả lời", meaningEn: "to respond", example: "Mong sớm nhận được hồi âm.", exampleEn: "Hoping for a prompt response.", partOfSpeech: "verb" },
      ],
      quiz: [
        { question: "'Kính gửi' dùng ở đâu?", questionEn: "Where is 'kính gửi' used?", options: ["Kết thư", "Đầu thư", "Giữa email", "Tiêu đề"], answer: 1, explanation: "'Kính gửi' là lời chào đầu thư.", explanationEn: "'Kính gửi' is the opening greeting." },
        { question: "'Đính kèm' nghĩa gì?", questionEn: "What does 'đính kèm' mean?", options: ["Xóa", "Gửi kèm", "In ra", "Lưu"], answer: 1, explanation: "'Đính kèm' = to attach.", explanationEn: "'Đính kèm' = to attach." },
        { question: "Kết thư trang trọng nào đúng?", questionEn: "Which formal closing is correct?", options: ["Bye!", "Trân trọng", "OK nhé", "Xong!"], answer: 1, explanation: "'Trân trọng' là cách kết thư lịch sự.", explanationEn: "'Trân trọng' is a polite closing." },
        { question: "'Phúc đáp' nghĩa gì?", questionEn: "What does 'phúc đáp' mean?", options: ["Gửi mới", "Trả lời thư", "Chuyển tiếp", "Xóa"], answer: 1, explanation: "'Phúc đáp' = reply formally.", explanationEn: "'Phúc đáp' = reply formally." },
        { question: "'Hồi âm' dùng khi nào?", questionEn: "When is 'hồi âm' used?", options: ["Khi gặp mặt", "Khi chờ phản hồi", "Khi chào tạm biệt", "Khi giới thiệu"], answer: 1, explanation: "'Hồi âm' = response, reply.", explanationEn: "'Hồi âm' = response." },
      ],
    },
    {
      id: "adv-comm-4",
      title: "Phỏng vấn xin việc",
      titleEn: "Job Interview Vietnamese",
      level: "advanced",
      theory: `## Phỏng vấn xin việc 💼\n\n**Câu hỏi phổ biến:**\n- "Bạn hãy giới thiệu về bản thân."\n- "Điểm mạnh và điểm yếu của bạn là gì?"\n- "Tại sao bạn muốn làm việc ở đây?"\n\n**Trả lời mẫu:**\n- "Tôi tên là..., tốt nghiệp ngành... Tôi có kinh nghiệm..."\n- "Điểm mạnh của tôi là sự cẩn thận và khả năng làm việc nhóm."`,
      theoryEn: `## Job Interview in Vietnamese 💼\n\n**Common questions:**\n- "Tell us about yourself."\n- "What are your strengths and weaknesses?"\n- "Why do you want to work here?"\n\n**Sample answers:**\n- "My name is..., I graduated in... I have experience in..."\n- "My strength is attention to detail and teamwork ability."`,
      vocabulary: [
        { word: "phỏng vấn", meaning: "cuộc hỏi đáp tuyển dụng", meaningEn: "interview", example: "Tôi có cuộc phỏng vấn lúc 9h.", exampleEn: "I have an interview at 9.", partOfSpeech: "noun" },
        { word: "ứng viên", meaning: "người xin việc", meaningEn: "candidate", example: "Ứng viên rất xuất sắc.", exampleEn: "The candidate was excellent.", partOfSpeech: "noun" },
        { word: "kinh nghiệm", meaning: "trải nghiệm làm việc", meaningEn: "experience", example: "Tôi có 3 năm kinh nghiệm.", exampleEn: "I have 3 years of experience.", partOfSpeech: "noun" },
        { word: "điểm mạnh", meaning: "thế mạnh", meaningEn: "strength", example: "Điểm mạnh là giao tiếp tốt.", exampleEn: "My strength is good communication.", partOfSpeech: "noun" },
        { word: "điểm yếu", meaning: "hạn chế", meaningEn: "weakness", example: "Điểm yếu là thiếu kiên nhẫn.", exampleEn: "My weakness is impatience.", partOfSpeech: "noun" },
        { word: "mức lương", meaning: "tiền lương", meaningEn: "salary", example: "Mức lương mong muốn là bao nhiêu?", exampleEn: "What is your expected salary?", partOfSpeech: "noun" },
        { word: "tuyển dụng", meaning: "chọn người làm việc", meaningEn: "recruitment", example: "Công ty đang tuyển dụng.", exampleEn: "The company is recruiting.", partOfSpeech: "noun" },
        { word: "hồ sơ", meaning: "giấy tờ ứng tuyển", meaningEn: "resume / portfolio", example: "Hồ sơ rất ấn tượng.", exampleEn: "The resume is impressive.", partOfSpeech: "noun" },
        { word: "kỹ năng", meaning: "khả năng thực hành", meaningEn: "skill", example: "Kỹ năng tin học tốt.", exampleEn: "Good IT skills.", partOfSpeech: "noun" },
        { word: "chuyên môn", meaning: "lĩnh vực chuyên sâu", meaningEn: "expertise / specialty", example: "Chuyên môn của tôi là marketing.", exampleEn: "My expertise is marketing.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "'Ứng viên' là ai?", questionEn: "Who is an 'ứng viên'?", options: ["Giám đốc", "Người xin việc", "Nhân viên cũ", "Khách hàng"], answer: 1, explanation: "'Ứng viên' = candidate, applicant.", explanationEn: "'Ứng viên' = candidate." },
        { question: "'Hồ sơ' bao gồm gì?", questionEn: "What does 'hồ sơ' include?", options: ["Sách giáo khoa", "CV, bằng cấp", "Hóa đơn", "Vé máy bay"], answer: 1, explanation: "'Hồ sơ' = portfolio of documents.", explanationEn: "'Hồ sơ' = resume/portfolio." },
        { question: "'Mức lương' là gì?", questionEn: "What is 'mức lương'?", options: ["Thời gian làm", "Tiền được trả", "Vị trí công việc", "Ngày nghỉ"], answer: 1, explanation: "'Mức lương' = salary level.", explanationEn: "'Mức lương' = salary level." },
        { question: "'Kỹ năng' nghĩa gì?", questionEn: "What does 'kỹ năng' mean?", options: ["Bằng cấp", "Khả năng thực hành", "Kiến thức lý thuyết", "Chứng chỉ"], answer: 1, explanation: "'Kỹ năng' = practical ability.", explanationEn: "'Kỹ năng' = skill." },
        { question: "Câu nào hỏi về điểm mạnh?", questionEn: "Which asks about strengths?", options: ["Bạn ở đâu?", "Điểm mạnh của bạn là gì?", "Bạn bao nhiêu tuổi?", "Lương bao nhiêu?"], answer: 1, explanation: "Hỏi về ưu điểm cá nhân.", explanationEn: "Asking about personal strengths." },
      ],
    },
    {
      id: "adv-comm-5",
      title: "Tranh luận & Bày tỏ quan điểm",
      titleEn: "Debating & Expressing Opinions",
      level: "advanced",
      theory: `## Tranh luận lịch sự 🗨️\n\n**Đồng ý:**\n- "Tôi hoàn toàn đồng ý với ý kiến đó."\n- "Đúng vậy, tôi cũng nghĩ như thế."\n\n**Không đồng ý:**\n- "Tôi xin phép có ý kiến khác..."\n- "Theo quan điểm của tôi thì..."\n\n**Nhấn mạnh:**\n- "Điều quan trọng nhất là..."\n- "Tôi muốn nhấn mạnh rằng..."`,
      theoryEn: `## Polite Debating 🗨️\n\n**Agreeing:**\n- "I completely agree with that opinion."\n- "That's right, I think so too."\n\n**Disagreeing:**\n- "With your permission, I have a different view..."\n- "From my perspective..."\n\n**Emphasizing:**\n- "The most important thing is..."\n- "I want to emphasize that..."`,
      vocabulary: [
        { word: "quan điểm", meaning: "cách nhìn, ý kiến", meaningEn: "viewpoint / perspective", example: "Quan điểm của bạn rất hay.", exampleEn: "Your viewpoint is excellent.", partOfSpeech: "noun" },
        { word: "đồng ý", meaning: "chấp thuận", meaningEn: "to agree", example: "Tôi đồng ý với bạn.", exampleEn: "I agree with you.", partOfSpeech: "verb" },
        { word: "phản đối", meaning: "không tán thành", meaningEn: "to oppose", example: "Nhiều người phản đối kế hoạch.", exampleEn: "Many opposed the plan.", partOfSpeech: "verb" },
        { word: "nhấn mạnh", meaning: "nói rõ, tô đậm", meaningEn: "to emphasize", example: "Tôi nhấn mạnh tầm quan trọng.", exampleEn: "I emphasize the importance.", partOfSpeech: "verb" },
        { word: "lý do", meaning: "nguyên nhân", meaningEn: "reason", example: "Lý do chính là chi phí.", exampleEn: "The main reason is the cost.", partOfSpeech: "noun" },
        { word: "bằng chứng", meaning: "minh chứng", meaningEn: "evidence", example: "Có bằng chứng rõ ràng.", exampleEn: "There is clear evidence.", partOfSpeech: "noun" },
        { word: "kết quả", meaning: "điều đạt được", meaningEn: "result", example: "Kết quả rất khả quan.", exampleEn: "The results are promising.", partOfSpeech: "noun" },
        { word: "giải pháp", meaning: "cách giải quyết", meaningEn: "solution", example: "Giải pháp này hiệu quả.", exampleEn: "This solution is effective.", partOfSpeech: "noun" },
        { word: "tranh luận", meaning: "bàn cãi về vấn đề", meaningEn: "to debate", example: "Họ tranh luận sôi nổi.", exampleEn: "They debated vigorously.", partOfSpeech: "verb" },
        { word: "thuyết phục", meaning: "làm cho đồng ý", meaningEn: "to persuade", example: "Anh ấy thuyết phục rất giỏi.", exampleEn: "He is very persuasive.", partOfSpeech: "verb" },
      ],
      quiz: [
        { question: "'Phản đối' nghĩa gì?", questionEn: "What does 'phản đối' mean?", options: ["Đồng ý", "Không tán thành", "Chấp nhận", "Ủng hộ"], answer: 1, explanation: "'Phản đối' = to oppose.", explanationEn: "'Phản đối' = to oppose." },
        { question: "Câu nào bày tỏ ý kiến khác biệt lịch sự?", questionEn: "Which politely disagrees?", options: ["Sai rồi!", "Tôi xin phép có ý kiến khác", "Không đúng!", "Vô lý!"], answer: 1, explanation: "Dùng 'xin phép' để lịch sự.", explanationEn: "Using 'xin phép' for politeness." },
        { question: "'Bằng chứng' là gì?", questionEn: "What is 'bằng chứng'?", options: ["Ý kiến", "Minh chứng cụ thể", "Cảm giác", "Đoán"], answer: 1, explanation: "'Bằng chứng' = evidence, proof.", explanationEn: "'Bằng chứng' = evidence." },
        { question: "'Nhấn mạnh' dùng để làm gì?", questionEn: "What is 'nhấn mạnh' used for?", options: ["Giấu đi", "Tô đậm ý quan trọng", "Bỏ qua", "Quên đi"], answer: 1, explanation: "'Nhấn mạnh' = emphasize.", explanationEn: "'Nhấn mạnh' = emphasize." },
        { question: "'Giải pháp' nghĩa gì?", questionEn: "What does 'giải pháp' mean?", options: ["Vấn đề", "Cách giải quyết", "Câu hỏi", "Kết quả"], answer: 1, explanation: "'Giải pháp' = solution.", explanationEn: "'Giải pháp' = solution." },
      ],
    },
  ],
};

// Merge into grammarModules
grammarModules.push(advancedCommunicationModule);
