// Vietnamese grammar lessons — 40 lessons across 4 modules (10 per module)
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
        ],
        quiz: [
          { question: "Cấu trúc câu cơ bản của tiếng Việt là gì?", questionEn: "What is the basic sentence structure?", options: ["SOV", "SVO", "VSO", "OVS"], answer: 1, explanation: "Tiếng Việt theo cấu trúc SVO.", explanationEn: "Vietnamese follows SVO order." },
          { question: "Tính từ đứng ở đâu?", questionEn: "Where do adjectives go?", options: ["Trước danh từ", "Sau danh từ", "Đầu câu", "Cuối câu"], answer: 1, explanation: "Tính từ đứng sau danh từ: 'nhà lớn'.", explanationEn: "After nouns: 'nhà lớn' (big house)." },
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
        ],
        quiz: [
          { question: "Khi nói với nam lớn tuổi hơn, dùng đại từ gì?", questionEn: "Which pronoun for an older male?", options: ["Em", "Anh", "Chị", "Tôi"], answer: 1, explanation: "'Anh' dùng cho nam lớn tuổi hơn.", explanationEn: "'Anh' is for older males." },
          { question: "'Em' dùng khi nào?", questionEn: "When do you use 'Em'?", options: ["Người lớn hơn", "Người nhỏ hơn", "Chỉ nữ", "Chỉ nam"], answer: 1, explanation: "'Em' cho người nhỏ tuổi hơn, cả nam lẫn nữ.", explanationEn: "'Em' is for younger people, both male and female." },
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
        ],
        quiz: [
          { question: "Để hỏi Yes/No, thêm gì vào cuối câu?", questionEn: "What to add for Yes/No questions?", options: ["Gì", "Không / Chưa", "Ai", "Sao"], answer: 1, explanation: "Thêm 'không' hoặc 'chưa'.", explanationEn: "Add 'không' or 'chưa' at the end." },
          { question: "'Bao nhiêu' hỏi về gì?", questionEn: "What does 'bao nhiêu' ask about?", options: ["Thời gian", "Nơi chốn", "Số lượng", "Lý do"], answer: 2, explanation: "'Bao nhiêu' hỏi về số lượng.", explanationEn: "'Bao nhiêu' asks about quantity." },
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
        ],
        quiz: [
          { question: "Từ nào chỉ quá khứ?", questionEn: "Which word marks past tense?", options: ["đang", "sẽ", "đã", "sắp"], answer: 2, explanation: "'Đã' chỉ hành động đã xảy ra.", explanationEn: "'Đã' marks past actions." },
          { question: "'Tôi đang học' nghĩa là gì?", questionEn: "What does 'Tôi đang học' mean?", options: ["I studied", "I am studying", "I will study", "I want to study"], answer: 1, explanation: "'Đang' chỉ hành động đang diễn ra.", explanationEn: "'Đang' marks ongoing actions." },
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
        ],
        quiz: [
          { question: "Loại từ cho động vật là gì?", questionEn: "What classifier for animals?", options: ["cái", "con", "người", "quyển"], answer: 1, explanation: "'Con' là loại từ cho động vật.", explanationEn: "'Con' is the classifier for animals." },
          { question: "'Ba cái bàn' nghĩa là gì?", questionEn: "What does 'ba cái bàn' mean?", options: ["Two tables", "Three tables", "Four tables", "One table"], answer: 1, explanation: "Ba = 3, cái = classifier, bàn = table.", explanationEn: "Ba = 3, cái = classifier, bàn = table." },
        ],
      },
      // NEW LESSONS 6-10 for basic grammar
      {
        id: "vn-gram-21",
        title: "Động từ 'là' và 'có'",
        titleEn: "Verbs 'là' (to be) and 'có' (to have)",
        level: "beginner",
        theory: `## Động từ 'là' và 'có'\n\n### 'Là' = to be (identity):\n- Tôi **là** sinh viên. (I am a student.)\n- Đây **là** nhà tôi. (This is my house.)\n\n### 'Có' = to have / there is:\n- Tôi **có** 2 anh em. (I have 2 siblings.)\n- **Có** ai ở nhà không? (Is anyone home?)\n- Ở đây **có** wifi. (There is wifi here.)\n\n### Phủ định:\n- Tôi **không phải là** bác sĩ. (I am not a doctor.)\n- Tôi **không có** xe. (I don't have a car.)`,
        theoryEn: `## Verbs 'là' and 'có'\n\n- **là** = to be (identity): Tôi là sinh viên.\n- **có** = to have / there is: Tôi có 2 anh em.\n- Negative: không phải là (am not), không có (don't have)`,
        vocabulary: [
          { word: "là", meaning: "động từ chỉ danh tính", meaningEn: "to be (identity)", example: "Anh ấy là giáo viên.", exampleEn: "He is a teacher.", partOfSpeech: "verb" },
          { word: "có", meaning: "sở hữu hoặc tồn tại", meaningEn: "to have / there is", example: "Tôi có một con mèo.", exampleEn: "I have a cat.", partOfSpeech: "verb" },
          { word: "không phải", meaning: "phủ định 'là'", meaningEn: "is not", example: "Đây không phải là nhà tôi.", exampleEn: "This is not my house.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "Phủ định của 'là' dùng gì?", questionEn: "How to negate 'là'?", options: ["Không là", "Không phải là", "Chưa là", "Đừng là"], answer: 1, explanation: "'Không phải là' = is not.", explanationEn: "'Không phải là' = is not." },
          { question: "'Có ai không?' hỏi gì?", questionEn: "What does 'Có ai không?' ask?", options: ["What", "Is anyone there?", "When", "Why"], answer: 1, explanation: "Hỏi có người nào không.", explanationEn: "Asks if anyone is there." },
        ],
      },
      {
        id: "vn-gram-22",
        title: "Trạng từ chỉ tần suất",
        titleEn: "Frequency Adverbs",
        level: "beginner",
        theory: `## Trạng từ chỉ tần suất\n\n- **luôn luôn / lúc nào cũng** = always: Tôi luôn dậy sớm.\n- **thường / hay** = often/usually: Tôi thường đi bộ.\n- **thỉnh thoảng / đôi khi** = sometimes: Thỉnh thoảng tôi ăn phở.\n- **hiếm khi / ít khi** = rarely: Anh ấy hiếm khi đi muộn.\n- **không bao giờ** = never: Tôi không bao giờ hút thuốc.\n\n### Vị trí: Đứng **trước** động từ.`,
        theoryEn: `## Frequency Adverbs\n\nluôn (always), thường (often), thỉnh thoảng (sometimes), hiếm khi (rarely), không bao giờ (never)\n\nPosition: Before the verb.`,
        vocabulary: [
          { word: "thường", meaning: "hay làm, nhiều lần", meaningEn: "often / usually", example: "Tôi thường uống trà.", exampleEn: "I usually drink tea.", partOfSpeech: "adverb" },
          { word: "thỉnh thoảng", meaning: "đôi khi", meaningEn: "sometimes", example: "Thỉnh thoảng tôi đi biển.", exampleEn: "Sometimes I go to the beach.", partOfSpeech: "adverb" },
          { word: "hiếm khi", meaning: "rất ít khi", meaningEn: "rarely", example: "Hiếm khi trời tuyết ở VN.", exampleEn: "It rarely snows in Vietnam.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Trạng từ tần suất đứng ở đâu?", questionEn: "Where do frequency adverbs go?", options: ["Sau động từ", "Trước động từ", "Cuối câu", "Đầu câu"], answer: 1, explanation: "Đứng trước động từ.", explanationEn: "Before the verb." },
        ],
      },
      {
        id: "vn-gram-23",
        title: "Chỉ từ: này, kia, đó, đây",
        titleEn: "Demonstratives: this, that",
        level: "beginner",
        theory: `## Chỉ từ\n\n### Gần:\n- **đây** = here: Tôi ở **đây**.\n- **này** = this: Cái **này** đẹp.\n\n### Xa:\n- **đó / kia** = there/that: Cái **đó** đắt. / Nhà **kia** lớn.\n- **đấy** = there (informal): Ai **đấy**?\n\n### Vị trí: Đứng **sau** danh từ:\n- Người **này** = this person\n- Nhà **kia** = that house\n- Con chó **đó** = that dog`,
        theoryEn: `## Demonstratives\n\n- đây/này = here/this (near)\n- đó/kia = there/that (far)\n- Position: AFTER the noun: người này (this person), nhà kia (that house)`,
        vocabulary: [
          { word: "này", meaning: "chỉ vật gần", meaningEn: "this", example: "Cái này bao nhiêu?", exampleEn: "How much is this?", partOfSpeech: "demonstrative" },
          { word: "kia", meaning: "chỉ vật xa", meaningEn: "that (far)", example: "Ngọn núi kia cao lắm.", exampleEn: "That mountain is very tall.", partOfSpeech: "demonstrative" },
          { word: "đây", meaning: "nơi này", meaningEn: "here", example: "Tôi ở đây.", exampleEn: "I am here.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Này' đứng ở đâu so với danh từ?", questionEn: "Where does 'này' go relative to noun?", options: ["Trước", "Sau", "Cả hai", "Tùy ý"], answer: 1, explanation: "Đứng sau: cái này, người này.", explanationEn: "After: cái này, người này." },
        ],
      },
      {
        id: "vn-gram-24",
        title: "Cách dùng 'rất', 'lắm', 'quá'",
        titleEn: "Degree Words: very, so, too",
        level: "beginner",
        theory: `## Từ chỉ mức độ\n\n### 'Rất' = very (trước tính từ):\n- **Rất** đẹp. (Very beautiful.)\n\n### 'Lắm' = very (cuối câu):\n- Đẹp **lắm**! (Very beautiful!)\n\n### 'Quá' = too/so (cuối, cảm thán):\n- Đẹp **quá**! (So beautiful!)\n\n### So sánh:\n| Từ | Vị trí | Sắc thái |\n|----|--------|----------|\n| rất | Trước TT | Trung tính |\n| lắm | Sau TT | Nhấn mạnh |\n| quá | Sau TT | Cảm thán |`,
        theoryEn: `## Degree Words\n\n- **rất** (very) – before adjective: rất đẹp\n- **lắm** (very) – after adjective: đẹp lắm\n- **quá** (so/too) – after adjective: đẹp quá`,
        vocabulary: [
          { word: "rất", meaning: "mức độ cao", meaningEn: "very", example: "Cô ấy rất xinh.", exampleEn: "She is very pretty.", partOfSpeech: "adverb" },
          { word: "lắm", meaning: "nhấn mạnh mức độ", meaningEn: "very (emphatic)", example: "Ngon lắm!", exampleEn: "Very delicious!", partOfSpeech: "adverb" },
          { word: "quá", meaning: "cảm thán", meaningEn: "so / too much", example: "Nóng quá!", exampleEn: "So hot!", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Rất' đứng ở đâu?", questionEn: "Where does 'rất' go?", options: ["Sau tính từ", "Trước tính từ", "Cuối câu", "Đầu câu"], answer: 1, explanation: "Rất + tính từ: rất đẹp.", explanationEn: "Rất + adjective: rất đẹp." },
        ],
      },
      {
        id: "vn-gram-25",
        title: "Cách nói 'muốn', 'cần', 'phải'",
        titleEn: "Want, Need, Must",
        level: "beginner",
        theory: `## Động từ tình thái\n\n### Muốn = want:\n- Tôi **muốn** ăn phở. (I want to eat pho.)\n\n### Cần = need:\n- Tôi **cần** mua sách. (I need to buy books.)\n\n### Phải = must:\n- Bạn **phải** đi học. (You must go to school.)\n\n### Nên = should:\n- Bạn **nên** nghỉ ngơi. (You should rest.)\n\n### Có thể = can:\n- Tôi **có thể** nói tiếng Việt. (I can speak Vietnamese.)`,
        theoryEn: `## Modal Verbs\n\n- muốn (want), cần (need), phải (must), nên (should), có thể (can)\n- Structure: Subject + modal + verb`,
        vocabulary: [
          { word: "muốn", meaning: "mong ước", meaningEn: "to want", example: "Tôi muốn đi du lịch.", exampleEn: "I want to travel.", partOfSpeech: "verb" },
          { word: "cần", meaning: "cần thiết", meaningEn: "to need", example: "Cần học bài.", exampleEn: "Need to study.", partOfSpeech: "verb" },
          { word: "phải", meaning: "bắt buộc", meaningEn: "must / have to", example: "Phải đúng giờ.", exampleEn: "Must be on time.", partOfSpeech: "verb" },
          { word: "có thể", meaning: "khả năng", meaningEn: "can / may", example: "Tôi có thể giúp bạn.", exampleEn: "I can help you.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Phải' mang nghĩa gì?", questionEn: "What does 'phải' mean?", options: ["Want", "Can", "Must", "Should"], answer: 2, explanation: "'Phải' = must/have to.", explanationEn: "'Phải' = must." },
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
        theory: `## Câu so sánh\n\n### So sánh ngang bằng: A **như** B / A **bằng** B\n### So sánh hơn: A **hơn** B\n### So sánh nhất: A **nhất**`,
        theoryEn: `## Comparisons\n\nEqual: A **như** B / A **bằng** B\nMore: A **hơn** B\nMost: A **nhất**`,
        vocabulary: [
          { word: "hơn", meaning: "hơn (so sánh)", meaningEn: "more than", example: "Anh cao hơn em.", exampleEn: "He is taller than her.", partOfSpeech: "adverb" },
          { word: "nhất", meaning: "nhất (so sánh nhất)", meaningEn: "the most", example: "Đây là món ngon nhất.", exampleEn: "This is the most delicious dish.", partOfSpeech: "adverb" },
          { word: "như", meaning: "giống như", meaningEn: "like / as", example: "Cô ấy đẹp như hoa.", exampleEn: "She is beautiful like a flower.", partOfSpeech: "conjunction" },
          { word: "bằng", meaning: "bằng, ngang", meaningEn: "equal to", example: "Nhà này lớn bằng nhà kia.", exampleEn: "This house is as big as that one.", partOfSpeech: "preposition" },
        ],
        quiz: [
          { question: "'Anh cao hơn tôi' dùng cấu trúc gì?", questionEn: "What structure?", options: ["So sánh bằng", "So sánh hơn", "So sánh nhất", "Câu phủ định"], answer: 1, explanation: "Dùng 'hơn' = so sánh hơn.", explanationEn: "Uses 'hơn' = comparative." },
        ],
      },
      {
        id: "vn-gram-7", title: "Giới từ chỉ nơi chốn và thời gian", titleEn: "Prepositions of Place & Time", level: "intermediate",
        theory: `## Giới từ\n\n### Nơi chốn:\n- **ở** = at/in | **trên** = on | **dưới** = under\n- **trong** = in | **ngoài** = outside | **bên cạnh** = beside\n\n### Thời gian:\n- **vào** = at/on | **từ…đến** = from…to\n- **trước** = before | **sau** = after`,
        theoryEn: `## Prepositions\n\nPlace: ở (at), trên (on), dưới (under), trong (in), ngoài (outside)\nTime: vào (at), từ…đến (from…to), trước (before), sau (after)`,
        vocabulary: [
          { word: "trên", meaning: "phía trên", meaningEn: "on / above", example: "Sách trên bàn.", exampleEn: "Book on the table.", partOfSpeech: "preposition" },
          { word: "dưới", meaning: "phía dưới", meaningEn: "under / below", example: "Mèo dưới ghế.", exampleEn: "Cat under the chair.", partOfSpeech: "preposition" },
          { word: "trong", meaning: "bên trong", meaningEn: "inside", example: "Nước trong ly.", exampleEn: "Water in the glass.", partOfSpeech: "preposition" },
          { word: "bên cạnh", meaning: "ở cạnh", meaningEn: "beside", example: "Ngồi bên cạnh tôi.", exampleEn: "Sit beside me.", partOfSpeech: "preposition" },
        ],
        quiz: [
          { question: "'Sách trên bàn' – 'trên' nghĩa gì?", questionEn: "What does 'trên' mean?", options: ["Under", "On", "Inside", "Outside"], answer: 1, explanation: "'Trên' = on/above.", explanationEn: "'Trên' = on/above." },
        ],
      },
      {
        id: "vn-gram-8", title: "Câu phủ định", titleEn: "Negative Sentences", level: "intermediate",
        theory: `## Câu phủ định\n\n- **không** – phủ định chung: Tôi **không** thích.\n- **chưa** – chưa xảy ra: Tôi **chưa** ăn.\n- **chẳng** – nhấn mạnh: Tôi **chẳng** biết gì.\n- **đừng** – cấm: **Đừng** nói!\n- **không bao giờ** – never`,
        theoryEn: `## Negative Sentences\n\nkhông (not), chưa (not yet), chẳng (not at all), đừng (don't), không bao giờ (never)`,
        vocabulary: [
          { word: "không", meaning: "phủ định chung", meaningEn: "not / no", example: "Tôi không biết.", exampleEn: "I don't know.", partOfSpeech: "adverb" },
          { word: "chưa", meaning: "chưa xảy ra", meaningEn: "not yet", example: "Tôi chưa ăn.", exampleEn: "I haven't eaten yet.", partOfSpeech: "adverb" },
          { word: "đừng", meaning: "cấm, yêu cầu không làm", meaningEn: "don't (imperative)", example: "Đừng đi!", exampleEn: "Don't go!", partOfSpeech: "adverb" },
          { word: "chẳng", meaning: "phủ định mạnh", meaningEn: "not at all", example: "Tôi chẳng sợ.", exampleEn: "I'm not scared at all.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Chưa' khác 'không' thế nào?", questionEn: "How is 'chưa' different from 'không'?", options: ["Giống nhau", "'Chưa' = not yet, ngụ ý có thể xảy ra", "'Chưa' mạnh hơn", "'Không' = not yet"], answer: 1, explanation: "'Chưa' ngụ ý có thể xảy ra trong tương lai.", explanationEn: "'Chưa' implies it may happen." },
        ],
      },
      {
        id: "vn-gram-9", title: "Liên từ và câu ghép", titleEn: "Conjunctions & Compound Sentences", level: "intermediate",
        theory: `## Liên từ\n\n### Kết hợp: **và** (and), **hoặc** (or), **nhưng** (but)\n### Phụ thuộc: **vì** (because), **nên** (so), **nếu…thì** (if…then), **mặc dù…nhưng** (although…but)`,
        theoryEn: `## Conjunctions\n\nCoordinating: và (and), hoặc (or), nhưng (but)\nSubordinating: vì (because), nên (so), nếu…thì (if…then)`,
        vocabulary: [
          { word: "và", meaning: "liên từ kết hợp", meaningEn: "and", example: "Tôi và bạn đi chơi.", exampleEn: "You and I go out.", partOfSpeech: "conjunction" },
          { word: "nhưng", meaning: "liên từ tương phản", meaningEn: "but", example: "Rẻ nhưng tốt.", exampleEn: "Cheap but good.", partOfSpeech: "conjunction" },
          { word: "nếu", meaning: "điều kiện", meaningEn: "if", example: "Nếu rảnh, tôi sẽ đến.", exampleEn: "If I'm free, I'll come.", partOfSpeech: "conjunction" },
          { word: "vì", meaning: "nguyên nhân", meaningEn: "because", example: "Vì mưa nên tôi ở nhà.", exampleEn: "Because of rain, I stay home.", partOfSpeech: "conjunction" },
        ],
        quiz: [
          { question: "'Nếu…thì' là cấu trúc gì?", questionEn: "What structure is 'nếu…thì'?", options: ["So sánh", "Điều kiện", "Phủ định", "Câu hỏi"], answer: 1, explanation: "'Nếu…thì' = if…then.", explanationEn: "'Nếu…thì' = if…then." },
        ],
      },
      {
        id: "vn-gram-10", title: "Câu bị động", titleEn: "Passive Voice", level: "intermediate",
        theory: `## Câu bị động\n\n- **được** (positive) / **bị** (negative)\n- Cấu trúc: Chủ ngữ + được/bị + (tác nhân) + động từ\n- Tôi **được** khen. (I was praised.) – tích cực\n- Tôi **bị** phạt. (I was punished.) – tiêu cực`,
        theoryEn: `## Passive Voice\n\n- **được** = passive (positive result)\n- **bị** = passive (negative result)\nStructure: Subject + được/bị + verb`,
        vocabulary: [
          { word: "được", meaning: "bị động tích cực", meaningEn: "passive (positive)", example: "Tôi được thưởng.", exampleEn: "I was rewarded.", partOfSpeech: "auxiliary" },
          { word: "bị", meaning: "bị động tiêu cực", meaningEn: "passive (negative)", example: "Tôi bị mắng.", exampleEn: "I was scolded.", partOfSpeech: "auxiliary" },
          { word: "khen", meaning: "nói tốt về ai", meaningEn: "to praise", example: "Cô giáo khen em.", exampleEn: "Teacher praised her.", partOfSpeech: "verb" },
          { word: "phạt", meaning: "trừng phạt", meaningEn: "to punish", example: "Bạn bị phạt.", exampleEn: "You were punished.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Được' dùng khi nào?", questionEn: "When is 'được' used?", options: ["Kết quả tiêu cực", "Kết quả tích cực", "Câu hỏi", "Phủ định"], answer: 1, explanation: "'Được' cho bị động tích cực.", explanationEn: "'Được' for positive passive." },
        ],
      },
      // NEW LESSONS for intermediate grammar
      {
        id: "vn-gram-26", title: "Câu điều kiện", titleEn: "Conditional Sentences", level: "intermediate",
        theory: `## Câu điều kiện\n\n### Điều kiện có thể xảy ra:\n- **Nếu** trời đẹp **thì** tôi đi chơi.\n\n### Điều kiện không có thật:\n- **Giá mà / Giả sử** tôi giàu **thì** tôi mua nhà.\n- **Nếu** hôm qua tôi biết **thì** tôi **đã** đến.\n\n### Lưu ý:\n- 'Thì' có thể bỏ: Nếu rảnh, tôi đi.\n- 'Giá mà' = if only (regret)`,
        theoryEn: `## Conditional Sentences\n\n- Real: Nếu…thì (If…then)\n- Unreal: Giá mà / Giả sử (If only / Suppose)\n- 'thì' is often omitted`,
        vocabulary: [
          { word: "giá mà", meaning: "ước gì", meaningEn: "if only", example: "Giá mà tôi biết sớm.", exampleEn: "If only I had known.", partOfSpeech: "conjunction" },
          { word: "giả sử", meaning: "nếu giả định", meaningEn: "suppose / assume", example: "Giả sử bạn là giám đốc.", exampleEn: "Suppose you were the director.", partOfSpeech: "conjunction" },
        ],
        quiz: [
          { question: "'Giá mà' thể hiện điều gì?", questionEn: "What does 'giá mà' express?", options: ["Chắc chắn", "Tiếc nuối", "Vui mừng", "Tức giận"], answer: 1, explanation: "'Giá mà' = if only, thể hiện tiếc nuối.", explanationEn: "'Giá mà' = if only, expressing regret." },
        ],
      },
      {
        id: "vn-gram-27", title: "Cách dùng 'cho', 'để', 'mà'", titleEn: "Purpose Clauses: cho, để, mà", level: "intermediate",
        theory: `## Mệnh đề mục đích\n\n### 'Để' = in order to:\n- Tôi học **để** thi. (I study to take the exam.)\n\n### 'Cho' = for / so that:\n- Làm **cho** nhanh! (Do it quickly!)\n- Mua **cho** mẹ. (Buy for mom.)\n\n### 'Mà' = but / in order to (context):\n- Có gì **mà** sợ? (What is there to fear?)\n- Đi **mà** học. (Go and learn.)`,
        theoryEn: `## Purpose Clauses\n\n- để = in order to: Tôi học để thi.\n- cho = for / so that: Mua cho mẹ.\n- mà = but / purpose (contextual)`,
        vocabulary: [
          { word: "để", meaning: "nhằm mục đích", meaningEn: "in order to / to", example: "Học để tiến bộ.", exampleEn: "Study to improve.", partOfSpeech: "conjunction" },
          { word: "cho", meaning: "cho ai, vì ai", meaningEn: "for / give", example: "Mua cho em.", exampleEn: "Buy for younger sibling.", partOfSpeech: "preposition" },
        ],
        quiz: [
          { question: "'Tôi học để thi' – 'để' nghĩa gì?", questionEn: "What does 'để' mean here?", options: ["Because", "In order to", "But", "And"], answer: 1, explanation: "'Để' = in order to.", explanationEn: "'Để' = in order to." },
        ],
      },
      {
        id: "vn-gram-28", title: "Cách dùng 'bao giờ', 'bao lâu', 'mấy'", titleEn: "Time Questions: when, how long, how many", level: "intermediate",
        theory: `## Câu hỏi thời gian\n\n### Bao giờ = when:\n- **Bao giờ** bạn đi? (When will you go?)\n- Bạn đi **bao giờ**? (When did you go?) – quá khứ\n\n### Bao lâu = how long:\n- Bạn ở đây **bao lâu**? (How long are you here?)\n\n### Mấy = how many (small numbers):\n- **Mấy** giờ rồi? (What time is it?)\n- Bạn có **mấy** anh em? (How many siblings?)`,
        theoryEn: `## Time Questions\n\n- Bao giờ (when) – position changes meaning\n- Bao lâu (how long)\n- Mấy (how many – small number, what time)`,
        vocabulary: [
          { word: "bao giờ", meaning: "khi nào", meaningEn: "when", example: "Bao giờ bạn về?", exampleEn: "When will you return?", partOfSpeech: "interrogative" },
          { word: "bao lâu", meaning: "thời gian bao lâu", meaningEn: "how long", example: "Đi bao lâu?", exampleEn: "How long is the trip?", partOfSpeech: "interrogative" },
          { word: "mấy", meaning: "hỏi số lượng nhỏ", meaningEn: "how many / what (time)", example: "Mấy giờ rồi?", exampleEn: "What time is it?", partOfSpeech: "interrogative" },
        ],
        quiz: [
          { question: "'Bao giờ' ở đầu câu hỏi về?", questionEn: "'Bao giờ' at beginning asks about?", options: ["Quá khứ", "Tương lai", "Số lượng", "Nơi chốn"], answer: 1, explanation: "Đầu câu = tương lai: Bao giờ bạn đi?", explanationEn: "At beginning = future." },
        ],
      },
      {
        id: "vn-gram-29", title: "Cấu trúc 'đã…rồi', 'mới…thôi'", titleEn: "Completion & Recency", level: "intermediate",
        theory: `## Cấu trúc hoàn thành\n\n### Đã…rồi = already done:\n- Tôi **đã** ăn **rồi**. (I already ate.)\n- Anh ấy **đã** đi **rồi**. (He already left.)\n\n### Mới…thôi = just recently:\n- Tôi **mới** đến **thôi**. (I just arrived.)\n- **Mới** 5 giờ **thôi**. (It's only 5 o'clock.)\n\n### Chưa…đâu = not yet (emphatic):\n- **Chưa** xong **đâu**. (Not finished yet.)`,
        theoryEn: `## Completion & Recency\n\n- đã…rồi = already: Tôi đã ăn rồi.\n- mới…thôi = just / only: Tôi mới đến thôi.\n- chưa…đâu = not yet (emphatic)`,
        vocabulary: [
          { word: "rồi", meaning: "đã xong", meaningEn: "already / done", example: "Xong rồi!", exampleEn: "Done!", partOfSpeech: "particle" },
          { word: "mới", meaning: "vừa mới", meaningEn: "just / recently", example: "Tôi mới biết.", exampleEn: "I just found out.", partOfSpeech: "adverb" },
          { word: "thôi", meaning: "chỉ vậy", meaningEn: "only / that's all", example: "Một cái thôi.", exampleEn: "Just one.", partOfSpeech: "particle" },
        ],
        quiz: [
          { question: "'Mới đến thôi' nghĩa là?", questionEn: "What does it mean?", options: ["Đến lâu rồi", "Vừa mới đến", "Chưa đến", "Sẽ đến"], answer: 1, explanation: "Vừa mới đến.", explanationEn: "Just arrived." },
        ],
      },
      {
        id: "vn-gram-30", title: "Câu nhấn mạnh và đảo ngữ", titleEn: "Emphasis & Inversion", level: "intermediate",
        theory: `## Nhấn mạnh trong tiếng Việt\n\n### Dùng 'chính':\n- **Chính** tôi làm điều đó. (I myself did it.)\n\n### Dùng 'là…đấy/đó':\n- Tôi **là** học sinh **đấy**. (I am a student, you know.)\n\n### Đảo vị ngữ lên đầu:\n- **Đẹp thật!** (Truly beautiful!)\n- **Lạ quá!** (So strange!)\n\n### Dùng 'thì' để nhấn:\n- Tôi **thì** không đồng ý. (As for me, I disagree.)`,
        theoryEn: `## Emphasis & Inversion\n\n- chính = oneself: Chính tôi làm.\n- Predicate fronting: Đẹp thật!\n- thì for topic emphasis: Tôi thì không đồng ý.`,
        vocabulary: [
          { word: "chính", meaning: "chính xác là", meaningEn: "exactly / oneself", example: "Chính anh ấy nói.", exampleEn: "He himself said it.", partOfSpeech: "adverb" },
          { word: "thì", meaning: "nhấn mạnh chủ đề", meaningEn: "topic marker / then", example: "Tôi thì thích cà phê.", exampleEn: "As for me, I like coffee.", partOfSpeech: "particle" },
        ],
        quiz: [
          { question: "'Chính tôi' nghĩa gì?", questionEn: "What does 'chính tôi' mean?", options: ["Not me", "I myself", "Someone else", "We"], answer: 1, explanation: "'Chính tôi' = I myself.", explanationEn: "'Chính tôi' = I myself." },
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
        theory: `## Từ láy\n\n### Các loại:\n1. **Láy toàn phần**: xanh xanh, đỏ đỏ\n2. **Láy âm đầu**: lấp lánh, lung linh\n3. **Láy vần**: lúng túng, bối rối\n4. **Láy tượng thanh**: róc rách, tí tách\n\n### Tác dụng: Tạo sắc thái biểu cảm, giảm nhẹ hoặc nhấn mạnh.`,
        theoryEn: `## Reduplication\n\nTypes: Full (xanh xanh), Initial consonant (lấp lánh), Rhyme (lúng túng), Onomatopoeia (róc rách)`,
        vocabulary: [
          { word: "lấp lánh", meaning: "sáng lung linh", meaningEn: "sparkling", example: "Sao trời lấp lánh.", exampleEn: "Stars are sparkling.", partOfSpeech: "adjective" },
          { word: "lúng túng", meaning: "bối rối", meaningEn: "flustered", example: "Anh ấy lúng túng.", exampleEn: "He was flustered.", partOfSpeech: "adjective" },
          { word: "róc rách", meaning: "tiếng nước chảy", meaningEn: "gurgling sound", example: "Suối chảy róc rách.", exampleEn: "Stream gurgles.", partOfSpeech: "adverb" },
          { word: "lon ton", meaning: "chạy bước nhỏ nhanh", meaningEn: "toddling", example: "Em bé chạy lon ton.", exampleEn: "Baby toddles.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Lấp lánh' là loại từ láy gì?", questionEn: "What type?", options: ["Láy toàn phần", "Láy âm đầu", "Láy vần", "Láy tượng thanh"], answer: 1, explanation: "Láy âm đầu 'l'.", explanationEn: "Initial consonant reduplication." },
        ],
      },
      {
        id: "vn-gram-12", title: "Thành ngữ thông dụng", titleEn: "Common Idioms", level: "advanced",
        theory: `## Thành ngữ Việt Nam\n\n1. **Nước đổ đầu vịt** – Water off a duck's back\n2. **Đi guốc trong bụng** – Know someone inside out\n3. **Ếch ngồi đáy giếng** – Frog in a well (narrow-minded)\n4. **Ăn cháo đá bát** – Bite the hand that feeds\n5. **Uống nước nhớ nguồn** – Remember the source`,
        theoryEn: `## Vietnamese Idioms\n\nFixed expressions with figurative meanings.`,
        vocabulary: [
          { word: "thành ngữ", meaning: "cụm từ cố định", meaningEn: "idiom", example: "Tiếng Việt có nhiều thành ngữ.", exampleEn: "Vietnamese has many idioms.", partOfSpeech: "noun" },
          { word: "nghĩa bóng", meaning: "ý nghĩa ẩn dụ", meaningEn: "figurative meaning", example: "Câu này có nghĩa bóng.", exampleEn: "This has figurative meaning.", partOfSpeech: "noun" },
          { word: "ếch", meaning: "loài lưỡng cư", meaningEn: "frog", example: "Ếch ngồi đáy giếng.", exampleEn: "Frog in a well.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ếch ngồi đáy giếng' nghĩa bóng?", questionEn: "Figurative meaning?", options: ["Thông minh", "Hẹp hòi", "Kiên nhẫn", "Lười"], answer: 1, explanation: "Người có tầm nhìn hạn hẹp.", explanationEn: "Narrow worldview." },
        ],
      },
      {
        id: "vn-gram-13", title: "Trợ từ và ngữ khí từ", titleEn: "Particles & Sentence-Final Words", level: "advanced",
        theory: `## Trợ từ & Ngữ khí từ\n\n- **nhé** – thân mật | **ạ** – kính trọng\n- **đấy** – nhấn mạnh | **thôi** – dừng lại\n- **mà** – giải thích | **chứ** – khẳng định\n- **hả** – ngạc nhiên`,
        theoryEn: `## Sentence-Final Particles\n\nnhé (friendly), ạ (respectful), đấy (emphasis), thôi (let's/stop), mà (explanatory), chứ (affirmative)`,
        vocabulary: [
          { word: "nhé", meaning: "thân mật, đề nghị", meaningEn: "friendly particle", example: "Đi ăn nhé!", exampleEn: "Let's eat!", partOfSpeech: "particle" },
          { word: "ạ", meaning: "kính trọng", meaningEn: "respectful particle", example: "Vâng ạ.", exampleEn: "Yes (respectfully).", partOfSpeech: "particle" },
          { word: "thôi", meaning: "dừng, đi thôi", meaningEn: "let's / enough", example: "Đi thôi!", exampleEn: "Let's go!", partOfSpeech: "particle" },
          { word: "mà", meaning: "giải thích", meaningEn: "explanatory particle", example: "Tôi biết mà.", exampleEn: "I know (trust me).", partOfSpeech: "particle" },
        ],
        quiz: [
          { question: "'Ạ' thể hiện gì?", questionEn: "What does 'ạ' express?", options: ["Thân mật", "Kính trọng", "Ngạc nhiên", "Tức giận"], answer: 1, explanation: "Sự kính trọng.", explanationEn: "Respect." },
        ],
      },
      {
        id: "vn-gram-14", title: "Câu cảm thán và câu mệnh lệnh", titleEn: "Exclamatory & Imperative", level: "intermediate",
        theory: `## Câu cảm thán: **quá** (so), **thật** (truly), **ôi** (oh)\n## Câu mệnh lệnh: **hãy** (do), **đừng** (don't), **đi** (go ahead)`,
        theoryEn: `## Exclamatory: quá, thật, ôi\n## Imperative: hãy, đừng, đi`,
        vocabulary: [
          { word: "quá", meaning: "rất, lắm", meaningEn: "so / too much", example: "Nóng quá!", exampleEn: "So hot!", partOfSpeech: "adverb" },
          { word: "hãy", meaning: "yêu cầu", meaningEn: "please do", example: "Hãy cố gắng!", exampleEn: "Try hard!", partOfSpeech: "adverb" },
          { word: "thật", meaning: "thực sự", meaningEn: "truly", example: "Thật tuyệt!", exampleEn: "Truly wonderful!", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Đẹp quá!' là loại câu gì?", questionEn: "What type?", options: ["Câu hỏi", "Câu cảm thán", "Câu phủ định", "Câu bị động"], answer: 1, explanation: "Câu cảm thán với 'quá'.", explanationEn: "Exclamatory with 'quá'." },
        ],
      },
      {
        id: "vn-gram-15", title: "Cấu trúc 'càng…càng' và 'vừa…vừa'", titleEn: "Correlative Structures", level: "advanced",
        theory: `## Cấu trúc tương quan\n\n- **càng…càng** = the more…the more\n- **vừa…vừa** = both…and / while\n- **không những…mà còn** = not only…but also`,
        theoryEn: `## Correlative Structures\n\ncàng…càng, vừa…vừa, không những…mà còn`,
        vocabulary: [
          { word: "càng", meaning: "mức độ tăng", meaningEn: "the more (correlative)", example: "Càng học càng giỏi.", exampleEn: "The more you study, the better.", partOfSpeech: "adverb" },
          { word: "vừa", meaning: "cùng lúc", meaningEn: "simultaneously", example: "Vừa hát vừa nhảy.", exampleEn: "Singing and dancing.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Càng học càng giỏi' nghĩa gì?", questionEn: "What does it mean?", options: ["Học ít", "Càng học nhiều càng giỏi", "Không cần học", "Học vừa đủ"], answer: 1, explanation: "The more you study, the better.", explanationEn: "The more you study, the better." },
        ],
      },
      // NEW advanced grammar lessons
      {
        id: "vn-gram-31", title: "Câu chẻ (Cleft sentences)", titleEn: "Cleft Sentences", level: "advanced",
        theory: `## Câu chẻ\n\nNhấn mạnh một thành phần bằng cách tách ra:\n\n- **Chính** anh ấy **là** người đã giúp tôi.\n- **Là** tôi **mới** nói điều đó.\n- **Đó là** lý do tôi không đi.\n\n### Cấu trúc:\n- Chính + danh từ + là + mệnh đề\n- Đó/Đây + là + danh từ/mệnh đề`,
        theoryEn: `## Cleft Sentences\n\nEmphasize by splitting: Chính anh ấy là người giúp tôi. (It was HE who helped me.)`,
        vocabulary: [
          { word: "chính", meaning: "đúng là", meaningEn: "exactly / it is", example: "Chính bạn đã nói.", exampleEn: "It was YOU who said it.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Câu chẻ dùng để làm gì?", questionEn: "What are cleft sentences for?", options: ["Hỏi", "Nhấn mạnh", "Phủ định", "So sánh"], answer: 1, explanation: "Nhấn mạnh một thành phần.", explanationEn: "To emphasize a component." },
        ],
      },
      {
        id: "vn-gram-32", title: "Hư từ trong tiếng Việt", titleEn: "Function Words", level: "advanced",
        theory: `## Hư từ\n\nHư từ không có nghĩa từ vựng riêng, chỉ có chức năng ngữ pháp.\n\n### Các loại:\n- **Giới từ**: ở, trong, trên, với, về\n- **Liên từ**: và, nhưng, hoặc, vì, nên\n- **Trợ từ**: à, ư, nhỉ, nhé, ạ\n- **Phó từ**: đã, đang, sẽ, rất, không\n- **Từ tình thái**: chắc, hình như, có lẽ`,
        theoryEn: `## Function Words\n\nWords without lexical meaning, serving grammatical functions: prepositions, conjunctions, particles, adverbs, modal words.`,
        vocabulary: [
          { word: "chắc", meaning: "có lẽ, chắc chắn", meaningEn: "probably / certainly", example: "Chắc trời sẽ mưa.", exampleEn: "It will probably rain.", partOfSpeech: "adverb" },
          { word: "hình như", meaning: "có vẻ như", meaningEn: "it seems like", example: "Hình như anh ấy đến rồi.", exampleEn: "It seems he arrived.", partOfSpeech: "adverb" },
          { word: "có lẽ", meaning: "có thể", meaningEn: "perhaps / maybe", example: "Có lẽ tôi sai.", exampleEn: "Perhaps I'm wrong.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Hình như' thể hiện gì?", questionEn: "What does 'hình như' express?", options: ["Chắc chắn", "Phỏng đoán", "Phủ định", "Mệnh lệnh"], answer: 1, explanation: "Phỏng đoán, không chắc chắn.", explanationEn: "Guessing, uncertainty." },
        ],
      },
      {
        id: "vn-gram-33", title: "Câu ghép phức tạp", titleEn: "Complex Compound Sentences", level: "advanced",
        theory: `## Câu ghép phức tạp\n\n### Mặc dù…nhưng…vẫn:\n- **Mặc dù** mệt **nhưng** tôi **vẫn** làm việc.\n\n### Không những…mà…còn…nữa:\n- **Không những** giỏi **mà** còn **chăm** nữa.\n\n### Vì…nên…cho nên…mà:\n- **Vì** trời mưa **nên** đường trơn **cho nên** tôi đi chậm.\n\n### Nếu…thì…còn nếu…thì:\n- **Nếu** rảnh **thì** đi, **còn nếu** bận **thì** ở nhà.`,
        theoryEn: `## Complex Compound Sentences\n\nCombining multiple clauses with correlative conjunctions for nuanced expression.`,
        vocabulary: [
          { word: "mặc dù", meaning: "dù rằng", meaningEn: "although", example: "Mặc dù mệt nhưng vui.", exampleEn: "Although tired, still happy.", partOfSpeech: "conjunction" },
          { word: "vẫn", meaning: "tiếp tục", meaningEn: "still", example: "Tôi vẫn đi.", exampleEn: "I still go.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "'Mặc dù…nhưng' tương đương?", questionEn: "English equivalent?", options: ["Because…so", "Although…but", "If…then", "Not only…but"], answer: 1, explanation: "Although…but.", explanationEn: "Although…but." },
        ],
      },
      {
        id: "vn-gram-34", title: "Phương ngữ: Bắc, Trung, Nam", titleEn: "Regional Dialects", level: "advanced",
        theory: `## Ba phương ngữ chính\n\n| Đặc điểm | Bắc | Trung | Nam |\n|-----------|-----|-------|-----|\n| Đại từ ngôi 1 | Tớ, tôi | Tui | Tui, tao |\n| Bố/Mẹ | Bố, mẹ | Ba, mạ | Ba, má |\n| Ốm | Bệnh | Bệnh | Ốm = gầy |\n| Đâu | Đâu | Mô | Đâu |\n| Gì | Gì | Chi | Gì |\n\n### Phát âm khác:\n- Bắc: phân biệt tr/ch, s/x, r/d\n- Nam: tr=ch, s=x, r=d (hợp nhất)`,
        theoryEn: `## Three Main Dialects\n\nNorthern, Central, Southern Vietnamese differ in vocabulary, pronunciation, and tone realization.`,
        vocabulary: [
          { word: "mô", meaning: "ở đâu (Trung)", meaningEn: "where (Central dialect)", example: "Đi mô đó?", exampleEn: "Where are you going?", partOfSpeech: "interrogative" },
          { word: "chi", meaning: "gì (Trung)", meaningEn: "what (Central dialect)", example: "Làm chi?", exampleEn: "What for?", partOfSpeech: "interrogative" },
          { word: "má", meaning: "mẹ (Nam)", meaningEn: "mother (Southern)", example: "Má ơi!", exampleEn: "Mom!", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Mô' ở miền Trung nghĩa gì?", questionEn: "What does 'mô' mean in Central?", options: ["Gì", "Ai", "Ở đâu", "Khi nào"], answer: 2, explanation: "'Mô' = đâu/ở đâu.", explanationEn: "'Mô' = where." },
        ],
      },
      {
        id: "vn-gram-35", title: "Cách diễn đạt ước muốn và giả định", titleEn: "Wishes & Hypotheticals", level: "advanced",
        theory: `## Ước muốn & Giả định\n\n### Ước muốn:\n- **Ước gì** tôi bay được. (I wish I could fly.)\n- **Giá mà** ngày xưa tôi học chăm hơn.\n\n### Giả định:\n- **Nếu** tôi **là** bạn, tôi **sẽ** không làm vậy.\n- **Giả sử** không có Internet **thì** sao?\n\n### Hối tiếc:\n- **Lẽ ra** tôi **nên** đi. (I should have gone.)\n- **Đáng lẽ** tôi **phải** nói. (I should have said it.)`,
        theoryEn: `## Wishes & Hypotheticals\n\n- Ước gì (I wish), Giá mà (If only)\n- Lẽ ra / Đáng lẽ (should have)`,
        vocabulary: [
          { word: "ước gì", meaning: "mong muốn", meaningEn: "I wish", example: "Ước gì tôi giàu.", exampleEn: "I wish I were rich.", partOfSpeech: "phrase" },
          { word: "lẽ ra", meaning: "đáng lẽ phải", meaningEn: "should have", example: "Lẽ ra tôi nên đi.", exampleEn: "I should have gone.", partOfSpeech: "phrase" },
          { word: "đáng lẽ", meaning: "lẽ ra phải", meaningEn: "supposed to", example: "Đáng lẽ bạn phải biết.", exampleEn: "You were supposed to know.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Lẽ ra' diễn tả gì?", questionEn: "What does 'lẽ ra' express?", options: ["Vui mừng", "Hối tiếc", "Ngạc nhiên", "Đồng ý"], answer: 1, explanation: "Hối tiếc về điều đã không làm.", explanationEn: "Regret about something not done." },
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
    description: "Ngữ pháp trong giao tiếp hàng ngày và văn viết",
    descriptionEn: "Grammar in daily conversation and writing",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-16", title: "Cách nói lịch sự & xã giao", titleEn: "Polite & Social Language", level: "intermediate",
        theory: `## Lịch sự trong tiếng Việt\n\n- **Xin lỗi** – Sorry | **Cảm ơn** – Thank you\n- **Vui lòng** – Please | **Dạ / Vâng** – Yes (respectful)\n- Thêm **ạ** cuối câu | Dùng **quý** + danh từ`,
        theoryEn: `## Politeness in Vietnamese\n\nXin lỗi (Sorry), Cảm ơn (Thank you), Vui lòng (Please), add ạ for respect`,
        vocabulary: [
          { word: "xin lỗi", meaning: "xin tha lỗi", meaningEn: "sorry / excuse me", example: "Xin lỗi, cho tôi hỏi.", exampleEn: "Excuse me, may I ask.", partOfSpeech: "phrase" },
          { word: "cảm ơn", meaning: "tỏ lòng biết ơn", meaningEn: "thank you", example: "Cảm ơn bạn nhiều.", exampleEn: "Thank you very much.", partOfSpeech: "phrase" },
          { word: "vui lòng", meaning: "xin hãy", meaningEn: "please", example: "Vui lòng đợi.", exampleEn: "Please wait.", partOfSpeech: "adverb" },
        ],
        quiz: [
          { question: "Cách nói 'Thank you' lịch sự nhất?", questionEn: "Most polite 'Thank you'?", options: ["Cảm ơn", "Cảm ơn ạ", "OK", "Được"], answer: 1, explanation: "Thêm 'ạ' để kính trọng.", explanationEn: "Add 'ạ' for respect." },
        ],
      },
      {
        id: "vn-gram-17", title: "Mệnh đề quan hệ (mà)", titleEn: "Relative Clauses", level: "advanced",
        theory: `## Mệnh đề quan hệ\n\nDùng **"mà"** hoặc bỏ:\n- Cuốn sách **mà** tôi đọc rất hay.\n- Cuốn sách tôi đọc rất hay. (tự nhiên hơn)`,
        theoryEn: `## Relative Clauses\n\nUse "mà" (that/which) or omit it (more natural in speech).`,
        vocabulary: [
          { word: "mà", meaning: "từ nối mệnh đề quan hệ", meaningEn: "that / which / whom", example: "Người mà tôi yêu.", exampleEn: "The person whom I love.", partOfSpeech: "conjunction" },
        ],
        quiz: [
          { question: "'Mà' có thể bỏ không?", questionEn: "Can 'mà' be omitted?", options: ["Không bao giờ", "Có, trong văn nói", "Chỉ câu hỏi", "Chỉ với danh từ"], answer: 1, explanation: "Thường bỏ trong văn nói.", explanationEn: "Often omitted in speech." },
        ],
      },
      {
        id: "vn-gram-18", title: "Thanh điệu và chính tả", titleEn: "Tones & Spelling", level: "beginner",
        theory: `## 6 Thanh điệu\n\n| Thanh | Ký hiệu | Ví dụ |\n|-------|---------|-------|\n| Ngang | (none) | ma |\n| Sắc | ´ | má |\n| Huyền | \` | mà |\n| Hỏi | ̉ | mả |\n| Ngã | ~ | mã |\n| Nặng | ̣ | mạ |`,
        theoryEn: `## 6 Vietnamese Tones\n\nLevel (ma), Rising (má), Falling (mà), Questioning (mả), Broken (mã), Heavy (mạ)`,
        vocabulary: [
          { word: "thanh điệu", meaning: "cao độ giọng nói", meaningEn: "tone", example: "Tiếng Việt có 6 thanh điệu.", exampleEn: "Vietnamese has 6 tones.", partOfSpeech: "noun" },
          { word: "dấu", meaning: "ký hiệu trên chữ", meaningEn: "diacritical mark", example: "Dấu sắc là dấu chéo lên.", exampleEn: "Acute accent goes up.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Tiếng Việt có mấy thanh?", questionEn: "How many tones?", options: ["4", "5", "6", "7"], answer: 2, explanation: "6 thanh điệu.", explanationEn: "6 tones." },
          { question: "'Má' và 'mà' khác gì?", questionEn: "How differ?", options: ["Phụ âm", "Thanh điệu", "Nguyên âm", "Giống nhau"], answer: 1, explanation: "Thanh sắc vs huyền.", explanationEn: "Rising vs falling tone." },
        ],
      },
      {
        id: "vn-gram-19", title: "Từ nối văn viết", titleEn: "Written Connectors", level: "advanced",
        theory: `## Từ nối văn viết\n\n- **Thứ nhất** – Firstly | **Hơn nữa** – Moreover\n- **Tuy nhiên** – However | **Tóm lại** – In summary\n- **Do đó** – Therefore | **Ngược lại** – On the contrary`,
        theoryEn: `## Written Connectors\n\nThứ nhất (Firstly), Hơn nữa (Moreover), Tuy nhiên (However), Tóm lại (In summary), Do đó (Therefore)`,
        vocabulary: [
          { word: "tuy nhiên", meaning: "nhưng", meaningEn: "however", example: "Tuy nhiên, vấn đề vẫn còn.", exampleEn: "However, the problem remains.", partOfSpeech: "conjunction" },
          { word: "hơn nữa", meaning: "thêm vào đó", meaningEn: "moreover", example: "Hơn nữa, giá hợp lý.", exampleEn: "Moreover, the price is reasonable.", partOfSpeech: "conjunction" },
          { word: "tóm lại", meaning: "kết luận", meaningEn: "in summary", example: "Tóm lại, thành công.", exampleEn: "In summary, success.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Tuy nhiên' tương đương?", questionEn: "English equivalent?", options: ["Therefore", "However", "Moreover", "Finally"], answer: 1, explanation: "'Tuy nhiên' = However.", explanationEn: "'Tuy nhiên' = However." },
        ],
      },
      {
        id: "vn-gram-20", title: "Phân biệt văn nói và văn viết", titleEn: "Spoken vs Written Vietnamese", level: "advanced",
        theory: `## Văn nói vs Văn viết\n\n| Đặc điểm | Văn nói | Văn viết |\n|-----------|---------|----------|\n| Đại từ | tao, mày | tôi, anh/chị |\n| Từ nối | với lại, rồi | hơn nữa, do đó |\n| Câu | Ngắn, bỏ chủ ngữ | Đầy đủ |`,
        theoryEn: `## Spoken vs Written\n\nSpoken: informal pronouns, short sentences, fillers\nWritten: formal pronouns, complete sentences, connectors`,
        vocabulary: [
          { word: "văn nói", meaning: "ngôn ngữ hàng ngày", meaningEn: "spoken language", example: "Văn nói tự nhiên hơn.", exampleEn: "Spoken is more natural.", partOfSpeech: "noun" },
          { word: "văn viết", meaning: "ngôn ngữ chính thức", meaningEn: "written language", example: "Văn viết trang trọng hơn.", exampleEn: "Written is more formal.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Tao', 'mày' thuộc loại nào?", questionEn: "Which register?", options: ["Văn viết", "Văn nói", "Cả hai", "Kính ngữ"], answer: 1, explanation: "Đại từ văn nói thân mật.", explanationEn: "Informal spoken pronouns." },
        ],
      },
      // NEW practical grammar lessons
      {
        id: "vn-gram-36", title: "Cách đưa ra lời khuyên", titleEn: "Giving Advice", level: "intermediate",
        theory: `## Đưa ra lời khuyên\n\n### Nhẹ nhàng:\n- Bạn **nên** nghỉ ngơi. (You should rest.)\n- **Theo tôi**, bạn nên…\n\n### Mạnh hơn:\n- Bạn **phải** đi bác sĩ. (You must see a doctor.)\n- **Tốt nhất là** đừng đi. (It's best not to go.)\n\n### Gợi ý:\n- **Hay là** mình đi ăn? (How about we go eat?)\n- **Sao bạn không** thử? (Why don't you try?)`,
        theoryEn: `## Giving Advice\n\nGentle: nên (should), Theo tôi (In my opinion)\nStrong: phải (must), Tốt nhất là (It's best to)\nSuggesting: Hay là (How about), Sao không (Why not)`,
        vocabulary: [
          { word: "nên", meaning: "khuyên", meaningEn: "should", example: "Bạn nên học.", exampleEn: "You should study.", partOfSpeech: "adverb" },
          { word: "tốt nhất", meaning: "lựa chọn tốt nhất", meaningEn: "it's best to", example: "Tốt nhất là đi sớm.", exampleEn: "It's best to go early.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Hay là' dùng để?", questionEn: "What is 'hay là' for?", options: ["Phủ định", "Gợi ý", "Phàn nàn", "Mệnh lệnh"], answer: 1, explanation: "Gợi ý: Hay là đi ăn?", explanationEn: "Suggesting: How about eating?" },
        ],
      },
      {
        id: "vn-gram-37", title: "Cách tường thuật (lời nói gián tiếp)", titleEn: "Reported Speech", level: "advanced",
        theory: `## Lời nói gián tiếp\n\n### Trực tiếp:\n- Anh ấy nói: "Tôi sẽ đi."\n\n### Gián tiếp:\n- Anh ấy nói **(rằng/là)** anh ấy sẽ đi.\n\n### Thay đổi đại từ:\n- "Tôi" → anh ấy/cô ấy\n- "Bạn" → tôi\n\n### Lưu ý:\n- Tiếng Việt **không thay đổi thì** như tiếng Anh\n- 'Rằng' hoặc 'là' thường bỏ trong văn nói`,
        theoryEn: `## Reported Speech\n\nDirect: Anh ấy nói: "Tôi sẽ đi."\nIndirect: Anh ấy nói (rằng) anh ấy sẽ đi.\nNote: Vietnamese does NOT change tenses in reported speech.`,
        vocabulary: [
          { word: "rằng", meaning: "rằng, là", meaningEn: "that (reported speech)", example: "Cô ấy nói rằng cô ấy vui.", exampleEn: "She said that she was happy.", partOfSpeech: "conjunction" },
          { word: "tường thuật", meaning: "kể lại", meaningEn: "to report / narrate", example: "Tường thuật lại câu chuyện.", exampleEn: "Narrate the story.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Tiếng Việt có thay đổi thì trong lời gián tiếp?", questionEn: "Does VN change tenses in reported speech?", options: ["Có", "Không", "Đôi khi", "Luôn luôn"], answer: 1, explanation: "Không thay đổi thì.", explanationEn: "No tense changes." },
        ],
      },
      {
        id: "vn-gram-38", title: "Cách diễn đạt so sánh đặc biệt", titleEn: "Special Comparisons", level: "intermediate",
        theory: `## So sánh đặc biệt\n\n### Không…bằng (not as…as):\n- Tôi **không** cao **bằng** anh. (I'm not as tall as him.)\n\n### Gần bằng / Gần như:\n- **Gần** bằng anh ấy. (Almost as tall as him.)\n\n### So sánh kép:\n- **Càng** ngày **càng** đẹp. (More and more beautiful.)\n\n### So sánh ví von:\n- Đẹp **như** tiên. (Beautiful like a fairy.)\n- Nhanh **như** gió. (Fast as wind.)`,
        theoryEn: `## Special Comparisons\n\nkhông…bằng (not as…as), gần bằng (almost as), càng ngày càng (more and more), đẹp như (beautiful like)`,
        vocabulary: [
          { word: "gần bằng", meaning: "gần ngang", meaningEn: "almost as", example: "Gần bằng anh rồi.", exampleEn: "Almost as tall as him.", partOfSpeech: "phrase" },
          { word: "càng ngày", meaning: "ngày qua ngày", meaningEn: "day by day / more and more", example: "Càng ngày càng giỏi.", exampleEn: "Better and better.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Không…bằng' nghĩa gì?", questionEn: "What does it mean?", options: ["More than", "Not as…as", "The most", "Equal"], answer: 1, explanation: "Not as…as.", explanationEn: "Not as…as." },
        ],
      },
      {
        id: "vn-gram-39", title: "Cách viết email và tin nhắn", titleEn: "Email & Text Writing", level: "intermediate",
        theory: `## Email tiếng Việt\n\n### Mở đầu:\n- **Kính gửi** Anh/Chị [tên] (Dear Mr./Ms.)\n- **Thân gửi** [tên] (Dear – informal)\n\n### Nội dung:\n- Tôi viết để… (I'm writing to…)\n- Về vấn đề… (Regarding…)\n\n### Kết thúc:\n- **Trân trọng** (Sincerely)\n- **Thân mến** (Best regards)\n\n### Tin nhắn (SMS/chat):\n- Viết tắt: k (không), dc (được), r (rồi)\n- Emoji phổ biến, bỏ dấu phổ biến`,
        theoryEn: `## Vietnamese Email & Text\n\nFormal: Kính gửi (Dear), Trân trọng (Sincerely)\nInformal text: k (no), dc (OK), r (already)`,
        vocabulary: [
          { word: "kính gửi", meaning: "lời chào trang trọng", meaningEn: "dear / respectful greeting", example: "Kính gửi Giám đốc.", exampleEn: "Dear Director.", partOfSpeech: "phrase" },
          { word: "trân trọng", meaning: "kết thúc trang trọng", meaningEn: "sincerely / respectfully", example: "Trân trọng, Nguyễn Văn A.", exampleEn: "Sincerely, Nguyen Van A.", partOfSpeech: "phrase" },
        ],
        quiz: [
          { question: "'Trân trọng' dùng khi nào?", questionEn: "When to use 'Trân trọng'?", options: ["Mở đầu", "Kết thúc email formal", "Tin nhắn", "Chat"], answer: 1, explanation: "Kết thúc email trang trọng.", explanationEn: "Formal email closing." },
        ],
      },
      {
        id: "vn-gram-40", title: "Lỗi ngữ pháp phổ biến", titleEn: "Common Grammar Mistakes", level: "intermediate",
        theory: `## Lỗi phổ biến\n\n### 1. Nhầm 'được' và 'bị':\n- ❌ Tôi bị khen. → ✅ Tôi **được** khen.\n\n### 2. Thiếu loại từ:\n- ❌ Ba bàn → ✅ Ba **cái** bàn.\n\n### 3. Nhầm 'rất' và 'lắm':\n- ❌ Đẹp rất → ✅ **Rất** đẹp / Đẹp **lắm**.\n\n### 4. Sai trật tự tính từ:\n- ❌ Lớn nhà → ✅ Nhà **lớn**.\n\n### 5. Dùng sai 'không' và 'chưa':\n- ❌ Tôi không ăn (= never eat) ≠ Tôi chưa ăn (= haven't yet)`,
        theoryEn: `## Common Mistakes\n\n1. Mixing được/bị (positive/negative passive)\n2. Missing classifiers\n3. Wrong position of rất/lắm\n4. Wrong adjective order\n5. Confusing không/chưa`,
        vocabulary: [
          { word: "lỗi", meaning: "sai sót", meaningEn: "mistake / error", example: "Sửa lỗi ngữ pháp.", exampleEn: "Fix grammar errors.", partOfSpeech: "noun" },
          { word: "trật tự", meaning: "thứ tự sắp xếp", meaningEn: "word order", example: "Trật tự từ rất quan trọng.", exampleEn: "Word order is very important.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ba bàn' sai ở đâu?", questionEn: "What's wrong with 'ba bàn'?", options: ["Thiếu động từ", "Thiếu loại từ", "Sai số", "Không sai"], answer: 1, explanation: "Thiếu loại từ: ba CÁI bàn.", explanationEn: "Missing classifier: ba CÁI bàn." },
        ],
      },
    ],
  },
];
