// SAT Expansion Module Set 2: Grammar Mastery, High-Frequency Vocabulary,
// Punctuation & Mechanics, Essay & Argument Analysis
import type { LanguageModule } from "./types";

export const satExpansionModules2: LanguageModule[] = [
  // ============================================================
  // MODULE 1: SAT Grammar Mastery
  // ============================================================
  {
    id: "sat-grammar-mastery",
    title: "SAT Grammar Mastery",
    titleEn: "SAT Grammar Mastery",
    icon: "📐",
    color: "purple",
    description: "Làm chủ các điểm ngữ pháp xuất hiện thường xuyên trong SAT Writing & Language.",
    descriptionEn: "Master the grammar rules most frequently tested in SAT Writing & Language.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sva-traps",
        title: "Bẫy Hòa hợp Chủ-Vị (Subject-Verb Agreement Traps)",
        titleEn: "Subject-Verb Agreement Traps",
        level: 4,
        difficulty: "advanced",
        theory:
          "SAT thường giấu chủ ngữ thật sau các cụm giới từ, mệnh đề quan hệ, hoặc danh từ tập hợp (collective nouns). Quy tắc cốt lõi: động từ phải hòa hợp với CHỦ NGỮ THẬT, không phải danh từ gần nó nhất.\n\n**1. Cụm chen giữa (Intervening phrases):** 'The box of chocolates IS on the table.' (chủ ngữ là 'box', không phải 'chocolates').\n\n**2. Danh từ tập hợp (Collective nouns):** team, family, committee, jury - thường dùng số ít trong SAT: 'The committee HAS decided.'\n\n**3. Đại từ bất định (Indefinite pronouns):** everyone, anyone, each, neither, either → SỐ ÍT. 'Each of the students IS responsible.'\n\n**4. 'Either... or' / 'Neither... nor':** động từ chia theo CHỦ NGỮ GẦN HƠN. 'Neither the teacher nor the students ARE here.'",
        theoryEn:
          "The SAT often hides the true subject behind prepositional phrases, relative clauses, or collective nouns. Core rule: the verb must agree with the TRUE subject, not the nearest noun.\n\n**1. Intervening phrases:** 'The box of chocolates IS on the table.' (subject = 'box').\n\n**2. Collective nouns:** team, family, committee, jury - usually singular on the SAT.\n\n**3. Indefinite pronouns:** everyone, anyone, each, neither, either → SINGULAR.\n\n**4. 'Either... or' / 'Neither... nor':** verb agrees with the CLOSER subject.",
        proTips: [
          "Gạch chéo cụm giới từ chen giữa để lộ chủ ngữ thật.",
          "Danh từ tập hợp = số ít trên SAT (99% trường hợp).",
          "Each / Every / One of → luôn số ít.",
        ],
        proTipsEn: [
          "Cross out intervening prepositional phrases to expose the real subject.",
          "Collective nouns = singular on SAT (99% of the time).",
          "Each / Every / One of → always singular.",
        ],
        vocabulary: [
          { word: "agreement", ipa: "/əˈɡriːmənt/", meaning: "sự hòa hợp", meaningEn: "harmony in form", example: "Subject-verb agreement is essential.", exampleEn: "Subject-verb agreement is essential.", partOfSpeech: "noun" },
          { word: "intervening", ipa: "/ˌɪntərˈviːnɪŋ/", meaning: "chen vào giữa", meaningEn: "coming between", example: "Ignore the intervening phrase.", exampleEn: "Ignore the intervening phrase.", partOfSpeech: "adjective" },
          { word: "collective", ipa: "/kəˈlektɪv/", meaning: "tập hợp", meaningEn: "denoting a group", example: "Team is a collective noun.", exampleEn: "Team is a collective noun.", partOfSpeech: "adjective" },
          { word: "indefinite", ipa: "/ɪnˈdefɪnət/", meaning: "không xác định", meaningEn: "not specific", example: "'Everyone' is an indefinite pronoun.", exampleEn: "'Everyone' is an indefinite pronoun.", partOfSpeech: "adjective" },
          { word: "compound", ipa: "/ˈkɒmpaʊnd/", meaning: "ghép, kép", meaningEn: "made of two parts", example: "A compound subject takes a plural verb.", exampleEn: "A compound subject takes a plural verb.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dạng động từ đúng (is/are/has/have).",
            instructionEn: "Fill in the correct verb form (is/are/has/have).",
            sentences: [
              { text: "The list of items ___ on the desk.", textEn: "The list of items ___ on the desk.", answer: "is", hint: "Chủ ngữ là 'list'." },
              { text: "Each of the players ___ practiced hard.", textEn: "Each of the players ___ practiced hard.", answer: "has", hint: "'Each' = số ít." },
              { text: "Neither the manager nor the employees ___ aware.", textEn: "Neither the manager nor the employees ___ aware.", answer: "are", hint: "Theo chủ ngữ gần hơn." },
              { text: "The committee ___ reached a decision.", textEn: "The committee ___ reached a decision.", answer: "has", hint: "Danh từ tập hợp = số ít." },
              { text: "Everyone in the classes ___ a textbook.", textEn: "Everyone in the classes ___ a textbook.", answer: "has", hint: "'Everyone' = số ít." },
            ],
          },
        ],
        quiz: [
          {
            question: "Choose the correct sentence:",
            options: [
              "The bouquet of roses are beautiful.",
              "The bouquet of roses is beautiful.",
              "The bouquet of roses were beautiful.",
              "The bouquet of roses have been beautiful.",
            ],
            answer: 1,
            explanation: "'Bouquet' is the singular subject; 'of roses' is an intervening phrase.",
          },
          {
            question: "Which is correct?",
            options: [
              "Neither the coach nor the players is ready.",
              "Neither the coach nor the players are ready.",
              "Neither the coach nor the players was ready.",
              "Neither the coach nor the players has been ready.",
            ],
            answer: 1,
            explanation: "With 'neither...nor', the verb agrees with the closer subject ('players' = plural).",
          },
          {
            question: "Pick the correct version:",
            options: [
              "Each of the students have a laptop.",
              "Each of the students has a laptop.",
              "Each of the students are having a laptop.",
              "Each of the students were having a laptop.",
            ],
            answer: 1,
            explanation: "'Each' is always singular.",
          },
        ],
      },
      {
        id: "pronoun-clarity",
        title: "Đại từ: Rõ nghĩa & Hòa hợp (Pronoun Clarity & Agreement)",
        titleEn: "Pronoun Clarity & Agreement",
        level: 4,
        difficulty: "advanced",
        theory:
          "SAT kiểm tra 3 lỗi đại từ chính:\n\n**1. Antecedent mơ hồ:** 'When Sara met Lisa, she smiled' → 'she' chỉ ai? SAT sẽ chấm điểm phương án viết lại rõ ràng.\n\n**2. Hòa hợp về số:** 'A student should bring THEIR book' → SAT chấp nhận 'their' singular hoặc viết lại 'Students should bring THEIR books.'\n\n**3. Who vs Whom:** Who = chủ ngữ; Whom = tân ngữ. Mẹo: thay he/him → he = who, him = whom.\n\n**4. That vs Which:**\n- That: mệnh đề xác định, KHÔNG dấu phẩy.\n- Which: mệnh đề bổ sung, CÓ dấu phẩy.\n'The book that I read was great.' / 'The book, which I read yesterday, was great.'",
        theoryEn:
          "The SAT tests three pronoun errors:\n\n**1. Ambiguous antecedent:** 'When Sara met Lisa, she smiled' - who is 'she'?\n\n**2. Number agreement:** 'A student should bring their book' - modern SAT accepts singular 'they' or rewrite plural.\n\n**3. Who vs Whom:** Trick: replace with he/him → he = who, him = whom.\n\n**4. That vs Which:**\n- That = restrictive (no comma).\n- Which = nonrestrictive (with commas).",
        proTips: [
          "Mỗi đại từ cần MỘT antecedent rõ ràng - nếu có hai danh từ phù hợp, viết lại.",
          "Mẹo who/whom: thay thế bằng he/him.",
          "That = không phẩy. Which = có phẩy.",
        ],
        proTipsEn: [
          "Each pronoun needs ONE clear antecedent.",
          "Who/Whom trick: replace with he/him.",
          "That = no comma. Which = with comma.",
        ],
        vocabulary: [
          { word: "antecedent", ipa: "/ˌæntɪˈsiːdənt/", meaning: "danh từ tiền ngữ", meaningEn: "noun a pronoun refers to", example: "The pronoun must match its antecedent.", exampleEn: "The pronoun must match its antecedent.", partOfSpeech: "noun" },
          { word: "ambiguous", ipa: "/æmˈbɪɡjuəs/", meaning: "mơ hồ", meaningEn: "unclear in meaning", example: "The reference is ambiguous.", exampleEn: "The reference is ambiguous.", partOfSpeech: "adjective" },
          { word: "restrictive", ipa: "/rɪˈstrɪktɪv/", meaning: "xác định, hạn chế", meaningEn: "essential to meaning", example: "Restrictive clauses use 'that'.", exampleEn: "Restrictive clauses use 'that'.", partOfSpeech: "adjective" },
          { word: "nonrestrictive", ipa: "/ˌnɒnrɪˈstrɪktɪv/", meaning: "không xác định", meaningEn: "extra information", example: "Nonrestrictive clauses use 'which'.", exampleEn: "Nonrestrictive clauses use 'which'.", partOfSpeech: "adjective" },
          { word: "referent", ipa: "/ˈrefərənt/", meaning: "đối tượng được nhắc đến", meaningEn: "the thing referred to", example: "The referent must be clear.", exampleEn: "The referent must be clear.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền who / whom / that / which.",
            instructionEn: "Fill in who / whom / that / which.",
            sentences: [
              { text: "The student ___ won the prize is my friend.", textEn: "The student ___ won the prize is my friend.", answer: "who", hint: "Chủ ngữ của 'won'." },
              { text: "To ___ should I address the letter?", textEn: "To ___ should I address the letter?", answer: "whom", hint: "Tân ngữ của giới từ 'to'." },
              { text: "The book ___ I borrowed is overdue.", textEn: "The book ___ I borrowed is overdue.", answer: "that", hint: "Mệnh đề xác định, không phẩy." },
              { text: "My laptop, ___ I bought last year, is broken.", textEn: "My laptop, ___ I bought last year, is broken.", answer: "which", hint: "Có dấu phẩy = nonrestrictive." },
              { text: "The teacher ___ I admire most just retired.", textEn: "The teacher ___ I admire most just retired.", answer: "whom", hint: "Tân ngữ của 'admire'." },
            ],
          },
        ],
        quiz: [
          {
            question: "Choose the clearest sentence:",
            options: [
              "When Tom called Mike, he was angry.",
              "Tom was angry when he called Mike.",
              "He called Mike when he was angry.",
              "Tom called Mike when he was angry.",
            ],
            answer: 1,
            explanation: "Option B eliminates the ambiguity about who 'he' refers to.",
          },
          {
            question: "Which sentence is correct?",
            options: [
              "The man who I saw was tall.",
              "The man whom I saw was tall.",
              "The man which I saw was tall.",
              "The man what I saw was tall.",
            ],
            answer: 1,
            explanation: "'Whom' is the object of 'saw' (I saw him → whom).",
          },
          {
            question: "Pick the correct punctuation:",
            options: [
              "My car which is red is fast.",
              "My car, which is red, is fast.",
              "My car that is red, is fast.",
              "My car, that is red, is fast.",
            ],
            answer: 1,
            explanation: "Nonrestrictive 'which' clauses require commas on both sides.",
          },
        ],
      },
      {
        id: "modifier-placement",
        title: "Vị trí Bổ ngữ (Modifier Placement)",
        titleEn: "Modifier Placement",
        level: 4,
        difficulty: "advanced",
        theory:
          "**Bổ ngữ treo (Dangling modifier):** Cụm bổ ngữ mở đầu câu phải bổ nghĩa cho CHỦ NGỮ ngay sau dấu phẩy.\n\n❌ 'Walking down the street, the trees were beautiful.' (cây không thể đi bộ!)\n✅ 'Walking down the street, I saw beautiful trees.'\n\n**Bổ ngữ sai vị trí (Misplaced modifier):** Đặt bổ ngữ gần từ nó bổ nghĩa.\n\n❌ 'She almost drove her kids to school every day.' (gần như lái = chưa lái lần nào!)\n✅ 'She drove her kids to school almost every day.'\n\n**Quy tắc vàng SAT:** Sau cụm phân từ mở đầu (Walking, Having seen, To succeed...), CHỦ NGỮ TIẾP THEO phải là người/vật đang thực hiện hành động đó.",
        theoryEn:
          "**Dangling modifier:** An opening modifier phrase must modify the SUBJECT right after the comma.\n\n❌ 'Walking down the street, the trees were beautiful.' (Trees can't walk!)\n✅ 'Walking down the street, I saw beautiful trees.'\n\n**Misplaced modifier:** Place modifiers near the words they modify.\n\n**SAT golden rule:** After an opening participial phrase (Walking, Having seen, To succeed...), the next SUBJECT must be the doer.",
        proTips: [
          "Sau dấu phẩy mở đầu, hỏi: 'Ai đang làm hành động này?' - đó phải là chủ ngữ.",
          "Almost / only / just đặt ngay TRƯỚC từ chúng bổ nghĩa.",
          "Khi thấy '-ing' mở đầu câu, kiểm tra ngay chủ ngữ tiếp theo.",
        ],
        proTipsEn: [
          "After an opening comma, ask: 'Who is doing this?' - that must be the subject.",
          "Almost / only / just go right BEFORE the word they modify.",
          "Always check the subject after an '-ing' opener.",
        ],
        vocabulary: [
          { word: "modifier", ipa: "/ˈmɒdɪfaɪər/", meaning: "bổ ngữ", meaningEn: "word/phrase that modifies", example: "Place the modifier carefully.", exampleEn: "Place the modifier carefully.", partOfSpeech: "noun" },
          { word: "dangling", ipa: "/ˈdæŋɡlɪŋ/", meaning: "treo lơ lửng", meaningEn: "hanging without connection", example: "Avoid dangling modifiers.", exampleEn: "Avoid dangling modifiers.", partOfSpeech: "adjective" },
          { word: "misplaced", ipa: "/ˌmɪsˈpleɪst/", meaning: "đặt sai vị trí", meaningEn: "in the wrong place", example: "A misplaced modifier confuses readers.", exampleEn: "A misplaced modifier confuses readers.", partOfSpeech: "adjective" },
          { word: "participle", ipa: "/ˈpɑːrtɪsɪpl/", meaning: "phân từ", meaningEn: "verb form ending in -ing/-ed", example: "Walking is a participle.", exampleEn: "Walking is a participle.", partOfSpeech: "noun" },
          { word: "clarity", ipa: "/ˈklærəti/", meaning: "sự rõ ràng", meaningEn: "clearness", example: "Clarity is essential in writing.", exampleEn: "Clarity is essential in writing.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp lại từ thành câu đúng (không có bổ ngữ treo).",
            instructionEn: "Reorder the words to form a correct sentence (no dangling modifier).",
            items: [
              { scrambled: ["Running", "to", "the", "bus", "Tom", "tripped"], correct: "Running to the bus Tom tripped", correctEn: "While running to the bus, Tom tripped." },
              { scrambled: ["After", "studying", "all", "night", "she", "passed"], correct: "After studying all night she passed", correctEn: "After studying all night, she passed." },
              { scrambled: ["The", "dog", "barked", "loudly", "at", "the", "stranger"], correct: "The dog barked loudly at the stranger", correctEn: "The dog barked loudly at the stranger." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which sentence has NO dangling modifier?",
            options: [
              "Walking to school, the rain started.",
              "Walking to school, I got caught in the rain.",
              "Walking to school, the umbrella broke.",
              "Walking to school, my backpack got wet.",
            ],
            answer: 1,
            explanation: "'I' is the one walking - the modifier matches the subject.",
          },
          {
            question: "Pick the best version:",
            options: [
              "She only eats vegetables on Mondays.",
              "She eats only vegetables on Mondays.",
              "Only she eats vegetables on Mondays.",
              "She eats vegetables only on Mondays.",
            ],
            answer: 3,
            explanation: "If the meaning is 'Mondays are the only days', 'only' belongs before 'on Mondays'.",
          },
          {
            question: "Which is correct?",
            options: [
              "Having finished the test, the room felt quiet.",
              "Having finished the test, the students relaxed.",
              "Having finished the test, the desks were empty.",
              "Having finished the test, time passed quickly.",
            ],
            answer: 1,
            explanation: "'The students' did the finishing - modifier matches subject.",
          },
        ],
      },
      {
        id: "parallel-structure",
        title: "Cấu trúc Song song (Parallel Structure)",
        titleEn: "Parallel Structure",
        level: 4,
        difficulty: "advanced",
        theory:
          "Khi liệt kê hoặc so sánh, các phần phải có CÙNG DẠNG NGỮ PHÁP.\n\n**1. Trong danh sách:**\n❌ 'I like swimming, hiking, and to bike.'\n✅ 'I like swimming, hiking, and biking.'\n\n**2. So sánh:**\n❌ 'Reading is more fun than to watch TV.'\n✅ 'Reading is more fun than watching TV.'\n\n**3. Liên từ tương quan (Correlative conjunctions): both...and / either...or / neither...nor / not only...but also**\nDạng sau từ thứ nhất phải GIỐNG dạng sau từ thứ hai.\n❌ 'She is not only smart but also works hard.'\n✅ 'She is not only smart but also hardworking.'\n\n**4. Giới từ song song:**\n❌ 'I'm interested in art and history.' (OK)\n❌ 'I succeeded by working hard and luck.'\n✅ 'I succeeded by working hard and by being lucky.'",
        theoryEn:
          "When listing or comparing, items must share the SAME GRAMMATICAL FORM.\n\n**1. In lists:** Match -ing with -ing, infinitive with infinitive.\n\n**2. Comparisons:** Match nouns with nouns, gerunds with gerunds.\n\n**3. Correlative conjunctions:** both...and / either...or / not only...but also - what follows each must mirror the other.\n\n**4. Parallel prepositions:** repeat the preposition for clarity.",
        proTips: [
          "Đếm các mục trong danh sách - tất cả phải cùng loại từ.",
          "Sau 'not only' đến đâu thì sau 'but also' đến đó.",
          "So sánh giữa danh từ với danh từ, hành động với hành động.",
        ],
        proTipsEn: [
          "Count items in a list - all must be the same word class.",
          "Whatever follows 'not only' must mirror what follows 'but also'.",
          "Compare noun to noun, action to action.",
        ],
        vocabulary: [
          { word: "parallel", ipa: "/ˈpærəlel/", meaning: "song song", meaningEn: "matching in form", example: "Use parallel structure.", exampleEn: "Use parallel structure.", partOfSpeech: "adjective" },
          { word: "correlative", ipa: "/kəˈrelətɪv/", meaning: "tương quan", meaningEn: "paired", example: "'Either...or' is correlative.", exampleEn: "'Either...or' is correlative.", partOfSpeech: "adjective" },
          { word: "gerund", ipa: "/ˈdʒerənd/", meaning: "danh động từ", meaningEn: "-ing noun form", example: "'Swimming' is a gerund.", exampleEn: "'Swimming' is a gerund.", partOfSpeech: "noun" },
          { word: "infinitive", ipa: "/ɪnˈfɪnətɪv/", meaning: "động từ nguyên thể", meaningEn: "to + verb", example: "'To swim' is an infinitive.", exampleEn: "'To swim' is an infinitive.", partOfSpeech: "noun" },
          { word: "consistency", ipa: "/kənˈsɪstənsi/", meaning: "tính nhất quán", meaningEn: "uniformity", example: "Maintain consistency in lists.", exampleEn: "Maintain consistency in lists.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dạng từ song song chính xác.",
            instructionEn: "Fill in the parallel form.",
            sentences: [
              { text: "She likes reading, writing, and ___ (paint).", textEn: "She likes reading, writing, and ___ (paint).", answer: "painting", hint: "Song song với reading, writing." },
              { text: "He is not only intelligent but also ___ (kind).", textEn: "He is not only intelligent but also ___ (kind).", answer: "kind", hint: "Tính từ + tính từ." },
              { text: "I prefer hiking to ___ (swim).", textEn: "I prefer hiking to ___ (swim).", answer: "swimming", hint: "Gerund + gerund." },
              { text: "The plan is both efficient and ___ (cost).", textEn: "The plan is both efficient and ___ (cost).", answer: "cost-effective", hint: "Tính từ song song." },
              { text: "She came to learn, to grow, and ___ (succeed).", textEn: "She came to learn, to grow, and ___ (succeed).", answer: "to succeed", hint: "Lặp lại to-infinitive." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is parallel?",
            options: [
              "I enjoy hiking, swimming, and to bike.",
              "I enjoy to hike, swimming, and biking.",
              "I enjoy hiking, swimming, and biking.",
              "I enjoy hike, swim, and bike.",
            ],
            answer: 2,
            explanation: "All three are gerunds (-ing forms).",
          },
          {
            question: "Pick the correct version:",
            options: [
              "He is not only a teacher but also writes books.",
              "He is not only a teacher but also a writer.",
              "He not only teaches but also a writer.",
              "Not only he teaches but also writes.",
            ],
            answer: 1,
            explanation: "'A teacher' (noun) parallels 'a writer' (noun).",
          },
          {
            question: "Which sentence is parallel?",
            options: [
              "She came to study, to learn, and gaining experience.",
              "She came to study, learning, and to gain experience.",
              "She came to study, to learn, and to gain experience.",
              "She came studying, learning, and to gain experience.",
            ],
            answer: 2,
            explanation: "All three are infinitives ('to + verb').",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 2: SAT High-Frequency Vocabulary Expansion
  // ============================================================
  {
    id: "sat-vocab-expansion",
    title: "Mở rộng Từ vựng SAT Tần suất Cao",
    titleEn: "SAT High-Frequency Vocabulary Expansion",
    icon: "📚",
    color: "indigo",
    description: "Bổ sung 80+ từ vựng SAT thường xuất hiện theo nhóm: Verbs, Adjectives, Nouns, Transitions.",
    descriptionEn: "Add 80+ frequently tested SAT words grouped by Verbs, Adjectives, Nouns, and Transitions.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-academic-verbs",
        title: "Động từ Học thuật (Academic Verbs)",
        titleEn: "Academic Verbs",
        level: 4,
        difficulty: "advanced",
        theory:
          "Động từ học thuật là 'xương sống' của bài đọc SAT. Nhận diện sắc thái sẽ giúp xác định ý đồ tác giả (author's purpose).\n\n**Nhóm tích cực:** advocate, corroborate, endorse, substantiate.\n**Nhóm tiêu cực:** refute, undermine, denounce, repudiate.\n**Nhóm trung lập/phân tích:** scrutinize, postulate, infer, juxtapose.\n\nKhi gặp câu hỏi 'The author primarily seeks to ___', đáp án thường là một động từ học thuật như 'analyze', 'critique', 'illustrate', 'reconcile'.",
        theoryEn:
          "Academic verbs are the backbone of SAT reading. Recognizing tone helps identify the author's purpose.\n\n**Positive:** advocate, corroborate, endorse, substantiate.\n**Negative:** refute, undermine, denounce, repudiate.\n**Neutral/analytical:** scrutinize, postulate, infer, juxtapose.",
        proTips: [
          "Khi đọc passage, gạch chân động từ chính của câu chủ đề.",
          "Học theo cặp đối nghĩa: corroborate ↔ refute.",
          "Một động từ = một sắc thái: tích cực, tiêu cực, hay trung lập?",
        ],
        proTipsEn: [
          "While reading, underline the main verb of each topic sentence.",
          "Learn antonym pairs: corroborate ↔ refute.",
          "Tag each verb: positive, negative, or neutral?",
        ],
        vocabulary: [
          { word: "scrutinize", ipa: "/ˈskruːtənaɪz/", meaning: "xem xét kỹ lưỡng", meaningEn: "examine carefully", example: "Scientists scrutinize the data.", exampleEn: "Scientists scrutinize the data.", partOfSpeech: "verb" },
          { word: "advocate", ipa: "/ˈædvəkeɪt/", meaning: "ủng hộ, biện hộ", meaningEn: "publicly support", example: "She advocates for reform.", exampleEn: "She advocates for reform.", partOfSpeech: "verb" },
          { word: "refute", ipa: "/rɪˈfjuːt/", meaning: "bác bỏ", meaningEn: "prove wrong", example: "He refuted the claim.", exampleEn: "He refuted the claim.", partOfSpeech: "verb" },
          { word: "corroborate", ipa: "/kəˈrɒbəreɪt/", meaning: "xác nhận", meaningEn: "confirm with evidence", example: "Witnesses corroborated the story.", exampleEn: "Witnesses corroborated the story.", partOfSpeech: "verb" },
          { word: "undermine", ipa: "/ˌʌndərˈmaɪn/", meaning: "làm suy yếu", meaningEn: "weaken gradually", example: "Doubts undermined his confidence.", exampleEn: "Doubts undermined his confidence.", partOfSpeech: "verb" },
          { word: "postulate", ipa: "/ˈpɒstʃəleɪt/", meaning: "đưa ra giả định", meaningEn: "suggest as true", example: "Newton postulated gravity.", exampleEn: "Newton postulated gravity.", partOfSpeech: "verb" },
          { word: "denounce", ipa: "/dɪˈnaʊns/", meaning: "tố cáo", meaningEn: "publicly condemn", example: "Leaders denounced the violence.", exampleEn: "Leaders denounced the violence.", partOfSpeech: "verb" },
          { word: "endorse", ipa: "/ɪnˈdɔːrs/", meaning: "tán thành", meaningEn: "publicly approve", example: "The senator endorsed the bill.", exampleEn: "The senator endorsed the bill.", partOfSpeech: "verb" },
          { word: "infer", ipa: "/ɪnˈfɜːr/", meaning: "suy luận", meaningEn: "deduce from evidence", example: "We can infer from the passage.", exampleEn: "We can infer from the passage.", partOfSpeech: "verb" },
          { word: "juxtapose", ipa: "/ˈdʒʌkstəpoʊz/", meaning: "đặt cạnh để so sánh", meaningEn: "place side by side", example: "The author juxtaposes wealth and poverty.", exampleEn: "The author juxtaposes wealth and poverty.", partOfSpeech: "verb" },
          { word: "substantiate", ipa: "/səbˈstænʃieɪt/", meaning: "chứng minh", meaningEn: "support with evidence", example: "Data substantiates her claim.", exampleEn: "Data substantiates her claim.", partOfSpeech: "verb" },
          { word: "repudiate", ipa: "/rɪˈpjuːdieɪt/", meaning: "phủ nhận, từ chối", meaningEn: "reject completely", example: "He repudiated the rumors.", exampleEn: "He repudiated the rumors.", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền động từ thích hợp.",
            instructionEn: "Fill in the appropriate verb.",
            sentences: [
              { text: "The new evidence ___ the prosecution's theory.", textEn: "The new evidence ___ the prosecution's theory.", answer: "corroborates", hint: "Xác nhận = ?" },
              { text: "Critics ___ the policy as unjust.", textEn: "Critics ___ the policy as unjust.", answer: "denounced", hint: "Tố cáo = ?" },
              { text: "From the data, we can ___ a clear trend.", textEn: "From the data, we can ___ a clear trend.", answer: "infer", hint: "Suy luận = ?" },
              { text: "Activists ___ for stricter regulations.", textEn: "Activists ___ for stricter regulations.", answer: "advocate", hint: "Ủng hộ = ?" },
              { text: "New findings ___ the old theory.", textEn: "New findings ___ the old theory.", answer: "refute", hint: "Bác bỏ = ?" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which word means 'to weaken'?",
            options: ["endorse", "undermine", "corroborate", "advocate"],
            answer: 1,
            explanation: "'Undermine' = weaken gradually.",
          },
          {
            question: "Which is closest in meaning to 'examine carefully'?",
            options: ["scrutinize", "denounce", "postulate", "refute"],
            answer: 0,
            explanation: "'Scrutinize' means to examine in detail.",
          },
          {
            question: "Choose the antonym of 'corroborate':",
            options: ["substantiate", "endorse", "refute", "advocate"],
            answer: 2,
            explanation: "'Refute' = prove wrong, opposite of 'corroborate' (confirm).",
          },
        ],
      },
      {
        id: "sat-descriptive-adjectives",
        title: "Tính từ Mô tả (Descriptive Adjectives)",
        titleEn: "Descriptive Adjectives",
        level: 4,
        difficulty: "advanced",
        theory:
          "SAT thường hỏi về 'tone' (giọng văn) - tính từ giúp bạn xác định nhanh.\n\n**Tích cực:** pragmatic, meticulous, judicious, astute.\n**Tiêu cực:** ambiguous, ephemeral, dubious, superfluous.\n**Trung lập/phân tích:** inherent, nuanced, paradoxical, intrinsic.\n\nMẹo: nếu câu hỏi yêu cầu 'tone of the passage', loại bỏ ngay các đáp án có tính từ cực đoan (ecstatic, contemptuous) - SAT hiếm khi chọn các tính từ quá mạnh.",
        theoryEn:
          "The SAT often asks about tone - adjectives help you decide fast.\n\n**Positive:** pragmatic, meticulous, judicious, astute.\n**Negative:** ambiguous, ephemeral, dubious, superfluous.\n**Neutral/analytical:** inherent, nuanced, paradoxical, intrinsic.",
        proTips: [
          "SAT tránh tone cực đoan - chọn tone vừa phải.",
          "Học 5 cặp đối nghĩa: pragmatic ↔ idealistic, meticulous ↔ careless.",
          "Gạch chân tính từ chính trong câu chủ đề khi đọc.",
        ],
        proTipsEn: [
          "SAT avoids extreme tones - pick moderate ones.",
          "Learn 5 antonym pairs.",
          "Underline key adjectives in topic sentences.",
        ],
        vocabulary: [
          { word: "ambiguous", ipa: "/æmˈbɪɡjuəs/", meaning: "mơ hồ, đa nghĩa", meaningEn: "having multiple meanings", example: "The ending is ambiguous.", exampleEn: "The ending is ambiguous.", partOfSpeech: "adjective" },
          { word: "pragmatic", ipa: "/præɡˈmætɪk/", meaning: "thực tế, thực dụng", meaningEn: "practical", example: "She took a pragmatic approach.", exampleEn: "She took a pragmatic approach.", partOfSpeech: "adjective" },
          { word: "meticulous", ipa: "/məˈtɪkjələs/", meaning: "tỉ mỉ", meaningEn: "very careful", example: "He is meticulous about details.", exampleEn: "He is meticulous about details.", partOfSpeech: "adjective" },
          { word: "ephemeral", ipa: "/ɪˈfemərəl/", meaning: "ngắn ngủi", meaningEn: "lasting briefly", example: "Fame can be ephemeral.", exampleEn: "Fame can be ephemeral.", partOfSpeech: "adjective" },
          { word: "judicious", ipa: "/dʒuːˈdɪʃəs/", meaning: "sáng suốt", meaningEn: "showing good judgment", example: "A judicious choice.", exampleEn: "A judicious choice.", partOfSpeech: "adjective" },
          { word: "dubious", ipa: "/ˈduːbiəs/", meaning: "đáng nghi", meaningEn: "doubtful", example: "His claim is dubious.", exampleEn: "His claim is dubious.", partOfSpeech: "adjective" },
          { word: "astute", ipa: "/əˈstuːt/", meaning: "sắc sảo", meaningEn: "sharp-witted", example: "An astute observer.", exampleEn: "An astute observer.", partOfSpeech: "adjective" },
          { word: "superfluous", ipa: "/suːˈpɜːrfluəs/", meaning: "thừa, không cần thiết", meaningEn: "unnecessary", example: "Cut superfluous words.", exampleEn: "Cut superfluous words.", partOfSpeech: "adjective" },
          { word: "inherent", ipa: "/ɪnˈhɪərənt/", meaning: "vốn có", meaningEn: "existing as natural part", example: "Risk is inherent in life.", exampleEn: "Risk is inherent in life.", partOfSpeech: "adjective" },
          { word: "nuanced", ipa: "/ˈnuːɑːnst/", meaning: "tinh tế, đa sắc thái", meaningEn: "with subtle distinctions", example: "A nuanced argument.", exampleEn: "A nuanced argument.", partOfSpeech: "adjective" },
          { word: "paradoxical", ipa: "/ˌpærəˈdɒksɪkl/", meaning: "nghịch lý", meaningEn: "self-contradictory", example: "A paradoxical statement.", exampleEn: "A paradoxical statement.", partOfSpeech: "adjective" },
          { word: "intrinsic", ipa: "/ɪnˈtrɪnzɪk/", meaning: "thực chất, bản chất", meaningEn: "belonging naturally", example: "Intrinsic value.", exampleEn: "Intrinsic value.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền tính từ thích hợp.",
            instructionEn: "Fill in the appropriate adjective.",
            sentences: [
              { text: "Her ___ approach focuses on real results.", textEn: "Her ___ approach focuses on real results.", answer: "pragmatic", hint: "Thực tế = ?" },
              { text: "The poem's ___ meaning invites multiple readings.", textEn: "The poem's ___ meaning invites multiple readings.", answer: "ambiguous", hint: "Đa nghĩa = ?" },
              { text: "He is ___ in checking every line of code.", textEn: "He is ___ in checking every line of code.", answer: "meticulous", hint: "Tỉ mỉ = ?" },
              { text: "Trends in fashion are often ___.", textEn: "Trends in fashion are often ___.", answer: "ephemeral", hint: "Ngắn ngủi = ?" },
              { text: "The teacher offered a ___ analysis of the issue.", textEn: "The teacher offered a ___ analysis of the issue.", answer: "nuanced", hint: "Tinh tế = ?" },
            ],
          },
        ],
        quiz: [
          {
            question: "Which means 'lasting only briefly'?",
            options: ["intrinsic", "ephemeral", "judicious", "astute"],
            answer: 1,
            explanation: "'Ephemeral' = short-lived.",
          },
          {
            question: "Which adjective best describes a 'doubtful' claim?",
            options: ["nuanced", "pragmatic", "dubious", "meticulous"],
            answer: 2,
            explanation: "'Dubious' = doubtful.",
          },
          {
            question: "Pick the antonym of 'superfluous':",
            options: ["essential", "ephemeral", "ambiguous", "paradoxical"],
            answer: 0,
            explanation: "'Essential' is the opposite of 'superfluous' (unnecessary).",
          },
        ],
      },
      {
        id: "sat-abstract-nouns",
        title: "Danh từ Trừu tượng (Abstract Nouns)",
        titleEn: "Abstract Nouns",
        level: 4,
        difficulty: "advanced",
        theory:
          "Danh từ trừu tượng xuất hiện trong các đoạn văn khoa học xã hội và lập luận. Hiểu chúng giúp nắm bắt 'main idea' nhanh hơn.\n\n**Khái niệm:** paradigm, dichotomy, hypothesis, premise.\n**Sự kiện/hiện tượng:** anomaly, phenomenon, paradox, juxtaposition.\n**Đặc điểm:** integrity, austerity, autonomy, ambiguity.",
        theoryEn:
          "Abstract nouns appear in social-science and argumentative passages. Knowing them speeds up grasping the main idea.",
        proTips: [
          "Khi gặp danh từ trừu tượng trong câu chủ đề, đó thường là 'main idea'.",
          "Học theo cụm: 'shift in paradigm', 'false dichotomy', 'central premise'.",
        ],
        proTipsEn: [
          "Abstract nouns in topic sentences usually signal the main idea.",
          "Learn collocations: 'shift in paradigm', 'false dichotomy'.",
        ],
        vocabulary: [
          { word: "paradigm", ipa: "/ˈpærədaɪm/", meaning: "khuôn mẫu, mô hình", meaningEn: "typical example/model", example: "A paradigm shift in science.", exampleEn: "A paradigm shift in science.", partOfSpeech: "noun" },
          { word: "dichotomy", ipa: "/daɪˈkɒtəmi/", meaning: "sự phân đôi đối lập", meaningEn: "division between two opposites", example: "The good/evil dichotomy.", exampleEn: "The good/evil dichotomy.", partOfSpeech: "noun" },
          { word: "conjecture", ipa: "/kənˈdʒektʃər/", meaning: "phỏng đoán", meaningEn: "opinion based on guess", example: "His theory is mere conjecture.", exampleEn: "His theory is mere conjecture.", partOfSpeech: "noun" },
          { word: "anomaly", ipa: "/əˈnɒməli/", meaning: "điều bất thường", meaningEn: "deviation from norm", example: "An anomaly in the data.", exampleEn: "An anomaly in the data.", partOfSpeech: "noun" },
          { word: "premise", ipa: "/ˈpremɪs/", meaning: "tiền đề", meaningEn: "basis of argument", example: "The premise of the book.", exampleEn: "The premise of the book.", partOfSpeech: "noun" },
          { word: "paradox", ipa: "/ˈpærədɒks/", meaning: "nghịch lý", meaningEn: "contradictory truth", example: "A paradox of choice.", exampleEn: "A paradox of choice.", partOfSpeech: "noun" },
          { word: "integrity", ipa: "/ɪnˈteɡrəti/", meaning: "sự liêm chính", meaningEn: "honesty + wholeness", example: "A leader of integrity.", exampleEn: "A leader of integrity.", partOfSpeech: "noun" },
          { word: "autonomy", ipa: "/ɔːˈtɒnəmi/", meaning: "quyền tự trị", meaningEn: "independence", example: "Workers want more autonomy.", exampleEn: "Workers want more autonomy.", partOfSpeech: "noun" },
          { word: "hypothesis", ipa: "/haɪˈpɒθəsɪs/", meaning: "giả thuyết", meaningEn: "proposed explanation", example: "Test the hypothesis.", exampleEn: "Test the hypothesis.", partOfSpeech: "noun" },
          { word: "phenomenon", ipa: "/fəˈnɒmɪnən/", meaning: "hiện tượng", meaningEn: "observable fact", example: "A natural phenomenon.", exampleEn: "A natural phenomenon.", partOfSpeech: "noun" },
          { word: "ambiguity", ipa: "/ˌæmbɪˈɡjuːəti/", meaning: "sự mơ hồ", meaningEn: "doubleness of meaning", example: "Avoid ambiguity in writing.", exampleEn: "Avoid ambiguity in writing.", partOfSpeech: "noun" },
          { word: "austerity", ipa: "/ɔːˈsterəti/", meaning: "sự khắc khổ, thắt lưng buộc bụng", meaningEn: "strict economic measures", example: "Austerity policies.", exampleEn: "Austerity policies.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền danh từ thích hợp.",
            instructionEn: "Fill in the appropriate noun.",
            sentences: [
              { text: "The discovery caused a ___ shift in physics.", textEn: "The discovery caused a ___ shift in physics.", answer: "paradigm", hint: "Khuôn mẫu = ?" },
              { text: "His argument rests on a flawed ___.", textEn: "His argument rests on a flawed ___.", answer: "premise", hint: "Tiền đề = ?" },
              { text: "Scientists noticed an ___ in the readings.", textEn: "Scientists noticed an ___ in the readings.", answer: "anomaly", hint: "Bất thường = ?" },
              { text: "Workers demanded more ___ over their schedules.", textEn: "Workers demanded more ___ over their schedules.", answer: "autonomy", hint: "Tự chủ = ?" },
              { text: "The ___ of the poem invites multiple interpretations.", textEn: "The ___ of the poem invites multiple interpretations.", answer: "ambiguity", hint: "Mơ hồ = ?" },
            ],
          },
        ],
        quiz: [
          {
            question: "What is a 'paradigm'?",
            options: ["a contradiction", "a model or pattern", "a guess", "a measurement"],
            answer: 1,
            explanation: "A paradigm is a typical model or framework.",
          },
          {
            question: "Which noun means 'an unexpected deviation'?",
            options: ["premise", "phenomenon", "anomaly", "integrity"],
            answer: 2,
            explanation: "'Anomaly' = something irregular.",
          },
          {
            question: "Which best fits: 'Her argument was based on the false ___ that all swans are white'?",
            options: ["paradox", "premise", "phenomenon", "autonomy"],
            answer: 1,
            explanation: "A premise is the foundational assumption of an argument.",
          },
        ],
      },
      {
        id: "sat-transition-tone",
        title: "Từ nối & Sắc thái (Transition & Tone Words)",
        titleEn: "Transition & Tone Words",
        level: 4,
        difficulty: "advanced",
        theory:
          "Từ nối là 'kim chỉ nam' của SAT Reading & Writing. Chúng cho biết hướng đi của câu/đoạn.\n\n**Đối lập:** however, nevertheless, notwithstanding, albeit.\n**Bổ sung:** moreover, furthermore, henceforth, likewise.\n**Nguyên nhân/Kết quả:** consequently, thus, hence, therefore.\n**Sắc thái nghi vấn:** ostensibly, supposedly, allegedly, presumably.\n\nKhi SAT yêu cầu chọn từ nối, hãy hỏi: 'Câu này CÙNG HƯỚNG hay NGƯỢC HƯỚNG với câu trước?'",
        theoryEn:
          "Transitions are signposts in SAT Reading & Writing - they show the direction of ideas.\n\n**Contrast:** however, nevertheless, notwithstanding, albeit.\n**Addition:** moreover, furthermore, henceforth, likewise.\n**Cause/Effect:** consequently, thus, hence, therefore.\n**Skeptical tone:** ostensibly, supposedly, allegedly, presumably.",
        proTips: [
          "Trước khi chọn transition, vẽ mũi tên: → cùng hướng, ↔ ngược hướng.",
          "'Ostensibly' = bề ngoài có vẻ nhưng thực ra... (gợi ý phản đề sau đó).",
          "Notwithstanding = mặc dù - mạnh và trang trọng hơn 'although'.",
        ],
        proTipsEn: [
          "Draw an arrow before choosing: → same direction, ↔ contrast.",
          "'Ostensibly' hints at a coming reversal.",
          "'Notwithstanding' is a formal 'although'.",
        ],
        vocabulary: [
          { word: "notwithstanding", ipa: "/ˌnɒtwɪθˈstændɪŋ/", meaning: "mặc dù", meaningEn: "in spite of", example: "Notwithstanding the rain, we went.", exampleEn: "Notwithstanding the rain, we went.", partOfSpeech: "preposition" },
          { word: "albeit", ipa: "/ɔːlˈbiːɪt/", meaning: "mặc dù (trang trọng)", meaningEn: "although", example: "He agreed, albeit reluctantly.", exampleEn: "He agreed, albeit reluctantly.", partOfSpeech: "conjunction" },
          { word: "henceforth", ipa: "/ˌhensˈfɔːrθ/", meaning: "từ nay về sau", meaningEn: "from this time on", example: "Henceforth, all meetings are virtual.", exampleEn: "Henceforth, all meetings are virtual.", partOfSpeech: "adverb" },
          { word: "ostensibly", ipa: "/ɒˈstensəbli/", meaning: "bề ngoài có vẻ", meaningEn: "apparently", example: "Ostensibly polite, but secretly hostile.", exampleEn: "Ostensibly polite, but secretly hostile.", partOfSpeech: "adverb" },
          { word: "moreover", ipa: "/mɔːrˈoʊvər/", meaning: "hơn nữa", meaningEn: "in addition", example: "It's cheap; moreover, it works well.", exampleEn: "It's cheap; moreover, it works well.", partOfSpeech: "adverb" },
          { word: "consequently", ipa: "/ˈkɒnsəkwəntli/", meaning: "do đó", meaningEn: "as a result", example: "He missed the train; consequently, he was late.", exampleEn: "He missed the train; consequently, he was late.", partOfSpeech: "adverb" },
          { word: "nevertheless", ipa: "/ˌnevərðəˈles/", meaning: "tuy nhiên", meaningEn: "in spite of that", example: "It's hard; nevertheless, I'll try.", exampleEn: "It's hard; nevertheless, I'll try.", partOfSpeech: "adverb" },
          { word: "furthermore", ipa: "/ˌfɜːrðərˈmɔːr/", meaning: "thêm nữa", meaningEn: "additionally", example: "It's safe; furthermore, it's fast.", exampleEn: "It's safe; furthermore, it's fast.", partOfSpeech: "adverb" },
          { word: "presumably", ipa: "/prɪˈzuːməbli/", meaning: "có lẽ", meaningEn: "probably", example: "Presumably, she'll arrive soon.", exampleEn: "Presumably, she'll arrive soon.", partOfSpeech: "adverb" },
          { word: "allegedly", ipa: "/əˈledʒɪdli/", meaning: "được cho là", meaningEn: "reportedly", example: "He allegedly stole the money.", exampleEn: "He allegedly stole the money.", partOfSpeech: "adverb" },
          { word: "likewise", ipa: "/ˈlaɪkwaɪz/", meaning: "tương tự", meaningEn: "similarly", example: "She works hard; likewise, her brother does.", exampleEn: "She works hard; likewise, her brother does.", partOfSpeech: "adverb" },
          { word: "thereby", ipa: "/ˌðerˈbaɪ/", meaning: "qua đó", meaningEn: "by that means", example: "He saved time, thereby finishing early.", exampleEn: "He saved time, thereby finishing early.", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền từ nối thích hợp.",
            instructionEn: "Fill in the appropriate transition.",
            sentences: [
              { text: "The plan is risky; ___, it offers high rewards.", textEn: "The plan is risky; ___, it offers high rewards.", answer: "nevertheless", hint: "Tương phản." },
              { text: "She studied hard; ___, she passed easily.", textEn: "She studied hard; ___, she passed easily.", answer: "consequently", hint: "Kết quả." },
              { text: "The product is affordable; ___, it's durable.", textEn: "The product is affordable; ___, it's durable.", answer: "moreover", hint: "Bổ sung." },
              { text: "___ the obstacles, the team succeeded.", textEn: "___ the obstacles, the team succeeded.", answer: "Notwithstanding", hint: "Mặc dù (trang trọng)." },
              { text: "He spoke ___ on behalf of the group, but had hidden motives.", textEn: "He spoke ___ on behalf of the group, but had hidden motives.", answer: "ostensibly", hint: "Bề ngoài có vẻ." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which transition shows CONTRAST?",
            options: ["moreover", "consequently", "nevertheless", "likewise"],
            answer: 2,
            explanation: "'Nevertheless' signals contrast.",
          },
          {
            question: "What does 'ostensibly' suggest?",
            options: ["definitely true", "appearing true but possibly not", "extremely false", "scientifically proven"],
            answer: 1,
            explanation: "'Ostensibly' = apparently, often hinting at hidden truth.",
          },
          {
            question: "Which word means 'from now on'?",
            options: ["thereby", "henceforth", "presumably", "albeit"],
            answer: 1,
            explanation: "'Henceforth' = from this time forward.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 3: SAT Punctuation & Mechanics
  // ============================================================
  {
    id: "sat-punctuation",
    title: "Dấu câu & Cơ chế (Punctuation & Mechanics)",
    titleEn: "SAT Punctuation & Mechanics",
    icon: "✏️",
    color: "violet",
    description: "Quy tắc dấu phẩy, chấm phẩy, hai chấm, dấu nháy đơn, gạch ngang - kiểu câu hỏi hay xuất hiện nhất trên SAT Writing.",
    descriptionEn: "Master commas, semicolons, colons, apostrophes, and dashes - the most-tested SAT Writing topics.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "comma-semicolon-colon",
        title: "Dấu phẩy, Chấm phẩy & Hai chấm",
        titleEn: "Commas, Semicolons & Colons",
        level: 4,
        difficulty: "advanced",
        theory:
          "**1. Dấu phẩy (,):**\n- Trước liên từ FANBOYS nối hai mệnh đề độc lập: 'I ran, and I won.'\n- Sau cụm mở đầu: 'After the game, we ate.'\n- Liệt kê: 'apples, bananas, and grapes.'\n- Cô lập thông tin nonrestrictive: 'My brother, who lives in NY, called.'\n\n**2. Chấm phẩy (;):**\n- Nối HAI MỆNH ĐỀ ĐỘC LẬP có liên hệ chặt: 'It rained; we stayed inside.'\n- Phân cách các mục đã chứa dấu phẩy: 'Paris, France; Tokyo, Japan; Hanoi, Vietnam.'\n\n**3. Hai chấm (:):**\n- Sau MỘT MỆNH ĐỀ ĐỘC LẬP để giới thiệu danh sách/giải thích/trích dẫn: 'I need three things: time, money, and effort.'\n- KHÔNG dùng sau giới từ hay động từ chính: ❌ 'I need: A, B, C.'",
        theoryEn:
          "**Commas:** before FANBOYS connecting clauses, after intro phrases, in lists, around nonrestrictive info.\n\n**Semicolons:** join two independent clauses; separate items containing commas.\n\n**Colons:** introduce list/explanation after a complete clause.",
        proTips: [
          "Chấm phẩy = dấu chấm yếu - hai bên phải đứng độc lập.",
          "Trước hai chấm phải là MỘT CÂU HOÀN CHỈNH.",
          "Comma splice (nối hai mệnh đề chỉ bằng dấu phẩy) = SAI.",
        ],
        proTipsEn: [
          "Semicolon = weak period - both sides must stand alone.",
          "Before a colon must be a COMPLETE sentence.",
          "Comma splice = WRONG.",
        ],
        vocabulary: [
          { word: "clause", ipa: "/klɔːz/", meaning: "mệnh đề", meaningEn: "subject + verb unit", example: "An independent clause.", exampleEn: "An independent clause.", partOfSpeech: "noun" },
          { word: "splice", ipa: "/splaɪs/", meaning: "nối, ghép", meaningEn: "join together", example: "A comma splice is an error.", exampleEn: "A comma splice is an error.", partOfSpeech: "noun" },
          { word: "punctuation", ipa: "/ˌpʌŋktʃuˈeɪʃn/", meaning: "dấu câu", meaningEn: "marks in writing", example: "Use proper punctuation.", exampleEn: "Use proper punctuation.", partOfSpeech: "noun" },
          { word: "independent", ipa: "/ˌɪndɪˈpendənt/", meaning: "độc lập", meaningEn: "able to stand alone", example: "An independent clause.", exampleEn: "An independent clause.", partOfSpeech: "adjective" },
          { word: "introductory", ipa: "/ˌɪntrəˈdʌktəri/", meaning: "mở đầu", meaningEn: "at the beginning", example: "Use a comma after introductory phrases.", exampleEn: "Use a comma after introductory phrases.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dấu câu thích hợp (, hoặc ; hoặc :).",
            instructionEn: "Fill in the correct punctuation (, ; or :).",
            sentences: [
              { text: "I love three sports___ soccer, tennis, and swimming.", textEn: "I love three sports___ soccer, tennis, and swimming.", answer: ":", hint: "Giới thiệu danh sách sau câu hoàn chỉnh." },
              { text: "It was raining___ so we stayed home.", textEn: "It was raining___ so we stayed home.", answer: ",", hint: "Trước FANBOYS." },
              { text: "She studied hard___ she passed easily.", textEn: "She studied hard___ she passed easily.", answer: ";", hint: "Hai mệnh đề độc lập." },
              { text: "After the meeting___ we went for coffee.", textEn: "After the meeting___ we went for coffee.", answer: ",", hint: "Sau cụm mở đầu." },
              { text: "We visited Paris, France___ Tokyo, Japan___ and Hanoi, Vietnam.", textEn: "We visited Paris, France___ Tokyo, Japan___ and Hanoi, Vietnam.", answer: ";", hint: "Phân cách mục có chứa phẩy." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is correct?",
            options: [
              "I was tired, I went to bed.",
              "I was tired; I went to bed.",
              "I was tired: I went to bed.",
              "I was tired I went to bed.",
            ],
            answer: 1,
            explanation: "Two independent clauses → semicolon.",
          },
          {
            question: "Pick the correct sentence:",
            options: [
              "She bought: apples, oranges, and pears.",
              "She bought; apples, oranges, and pears.",
              "She bought apples, oranges, and pears.",
              "She bought apples; oranges; and pears.",
            ],
            answer: 2,
            explanation: "No punctuation needed before a list flowing from a verb.",
          },
          {
            question: "Which is correct?",
            options: [
              "The reason is simple, she works harder.",
              "The reason is simple; she works harder.",
              "The reason is simple: she works harder.",
              "The reason is simple she works harder.",
            ],
            answer: 2,
            explanation: "Colon introduces an explanation after a complete clause.",
          },
        ],
      },
      {
        id: "apostrophe-possessive",
        title: "Dấu nháy đơn & Sở hữu cách",
        titleEn: "Apostrophes & Possessives",
        level: 4,
        difficulty: "advanced",
        theory:
          "**1. Sở hữu danh từ số ít:** thêm 's: 'the dog's bone'.\n\n**2. Sở hữu danh từ số nhiều có 's':** chỉ thêm dấu nháy: 'the students' books'.\n\n**3. Sở hữu danh từ số nhiều bất quy tắc:** thêm 's: 'children's toys', 'women's rights'.\n\n**4. Đại từ sở hữu KHÔNG có dấu nháy:** its, his, hers, theirs, yours, ours.\n\n**5. Phân biệt:**\n- It's = it is / it has\n- Its = of it (sở hữu)\n- They're = they are\n- Their = of them\n- There = ở đó\n- You're = you are\n- Your = of you\n- Whose = sở hữu\n- Who's = who is",
        theoryEn:
          "**Singular possessive:** add 's. **Plural ending in s:** add only '. **Irregular plural:** add 's. **Possessive pronouns** (its, his, hers, theirs) take NO apostrophe.\n\nDistinguish: it's/its, they're/their/there, you're/your, whose/who's.",
        proTips: [
          "ITS = sở hữu, IT'S = it is. Test: thay 'it is' xem có hợp không.",
          "Đại từ sở hữu KHÔNG BAO GIỜ có nháy: hers, ours, theirs, its.",
          "Tên kết thúc bằng s: thường vẫn thêm 's (James's book) - SAT chấp nhận cả hai.",
        ],
        proTipsEn: [
          "ITS = possessive, IT'S = it is. Substitute 'it is' to test.",
          "Possessive pronouns NEVER take apostrophes.",
          "Names ending in s usually still add 's.",
        ],
        vocabulary: [
          { word: "possessive", ipa: "/pəˈzesɪv/", meaning: "sở hữu cách", meaningEn: "showing ownership", example: "Use possessive form.", exampleEn: "Use possessive form.", partOfSpeech: "adjective" },
          { word: "apostrophe", ipa: "/əˈpɒstrəfi/", meaning: "dấu nháy đơn", meaningEn: "the mark '", example: "Add an apostrophe.", exampleEn: "Add an apostrophe.", partOfSpeech: "noun" },
          { word: "contraction", ipa: "/kənˈtrækʃn/", meaning: "dạng rút gọn", meaningEn: "shortened form", example: "It's is a contraction.", exampleEn: "It's is a contraction.", partOfSpeech: "noun" },
          { word: "plural", ipa: "/ˈplʊrəl/", meaning: "số nhiều", meaningEn: "more than one", example: "Cats is a plural noun.", exampleEn: "Cats is a plural noun.", partOfSpeech: "adjective" },
          { word: "irregular", ipa: "/ɪˈreɡjələr/", meaning: "bất quy tắc", meaningEn: "not following rules", example: "Children is an irregular plural.", exampleEn: "Children is an irregular plural.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền dạng đúng (its / it's / their / they're / there / your / you're).",
            instructionEn: "Fill in the correct form.",
            sentences: [
              { text: "The dog wagged ___ tail.", textEn: "The dog wagged ___ tail.", answer: "its", hint: "Sở hữu - không nháy." },
              { text: "___ going to rain tomorrow.", textEn: "___ going to rain tomorrow.", answer: "It's", hint: "It is = ?" },
              { text: "The students forgot ___ books.", textEn: "The students forgot ___ books.", answer: "their", hint: "Sở hữu của họ." },
              { text: "___ welcome to join us.", textEn: "___ welcome to join us.", answer: "You're", hint: "You are = ?" },
              { text: "Put the box over ___.", textEn: "Put the box over ___.", answer: "there", hint: "Ở đó." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is correct?",
            options: [
              "The cat licked it's paw.",
              "The cat licked its paw.",
              "The cat licked its' paw.",
              "The cat licked it paw.",
            ],
            answer: 1,
            explanation: "'Its' (no apostrophe) is the possessive form.",
          },
          {
            question: "Pick the correct possessive:",
            options: [
              "the childrens' toys",
              "the children's toys",
              "the childrens's toys",
              "the children toys",
            ],
            answer: 1,
            explanation: "'Children' is irregular plural → add 's.",
          },
          {
            question: "Which sentence is correct?",
            options: [
              "Their going to the park.",
              "There going to the park.",
              "They're going to the park.",
              "Theyre going to the park.",
            ],
            answer: 2,
            explanation: "'They're' = 'they are'.",
          },
        ],
      },
      {
        id: "dashes-parentheses",
        title: "Gạch ngang & Ngoặc đơn",
        titleEn: "Dashes & Parentheses",
        level: 4,
        difficulty: "advanced",
        theory:
          "**1. Gạch ngang dài (-) cô lập thông tin nonessential:** \n'My brother - who lives in NY - called.'\n→ Có thể thay bằng dấu phẩy hoặc ngoặc đơn.\n\n**Quy tắc cặp:** Hai dấu phải KHỚP NHAU - nếu mở bằng gạch ngang, đóng bằng gạch ngang. KHÔNG trộn '- , -' hoặc ', - ,'.\n\n**2. Ngoặc đơn ( ):** thông tin phụ, ít quan trọng hơn dấu phẩy.\n'The author (a Nobel laureate) gave a speech.'\n\n**3. Gạch ngang đơn để giới thiệu:**\n'I have one goal - to win.'\n→ Tương đương dấu hai chấm.\n\n**SAT thường gài bẫy:** trộn dấu mở/đóng khác loại. Luôn kiểm tra cặp đối xứng.",
        theoryEn:
          "**Em-dashes (-)** isolate nonessential info - must be PAIRED (- ... -), not mixed with commas.\n\n**Parentheses ( )** add subordinate info.\n\n**Single dash** can introduce, like a colon.\n\nSAT trap: mismatched opening/closing punctuation.",
        proTips: [
          "Mở bằng gạch ngang → đóng bằng gạch ngang. Không trộn.",
          "Ngoặc đơn = thầm thì (whisper); gạch ngang = nhấn mạnh (shout).",
          "Một gạch ngang đơn = colon thay thế.",
        ],
        proTipsEn: [
          "Match dashes with dashes - never mix.",
          "Parentheses whisper; dashes shout.",
          "Single dash can replace a colon.",
        ],
        vocabulary: [
          { word: "nonessential", ipa: "/ˌnɒnɪˈsenʃl/", meaning: "không thiết yếu", meaningEn: "not necessary", example: "Nonessential info uses dashes.", exampleEn: "Nonessential info uses dashes.", partOfSpeech: "adjective" },
          { word: "parentheses", ipa: "/pəˈrenθəsiːz/", meaning: "dấu ngoặc đơn", meaningEn: "the marks ( )", example: "Add notes in parentheses.", exampleEn: "Add notes in parentheses.", partOfSpeech: "noun" },
          { word: "isolate", ipa: "/ˈaɪsəleɪt/", meaning: "tách biệt", meaningEn: "set apart", example: "Dashes isolate phrases.", exampleEn: "Dashes isolate phrases.", partOfSpeech: "verb" },
          { word: "subordinate", ipa: "/səˈbɔːrdənət/", meaning: "phụ thuộc", meaningEn: "less important", example: "Subordinate information.", exampleEn: "Subordinate information.", partOfSpeech: "adjective" },
          { word: "emphasis", ipa: "/ˈemfəsɪs/", meaning: "sự nhấn mạnh", meaningEn: "stress on something", example: "Place emphasis on key words.", exampleEn: "Place emphasis on key words.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Chọn dấu câu đúng để hoàn thành cặp (-, , hoặc )).",
            instructionEn: "Choose the correct punctuation to complete the pair.",
            sentences: [
              { text: "The book - a bestseller in 2020 ___ won three awards.", textEn: "The book - a bestseller in 2020 ___ won three awards.", answer: "-", hint: "Mở bằng gạch ngang → đóng bằng gạch ngang." },
              { text: "My friend, an artist ___ paints landscapes.", textEn: "My friend, an artist ___ paints landscapes.", answer: ",", hint: "Mở bằng phẩy → đóng bằng phẩy." },
              { text: "The result (after months of work ___ surprised everyone.", textEn: "The result (after months of work ___ surprised everyone.", answer: ")", hint: "Mở ngoặc → đóng ngoặc." },
              { text: "I have one wish - to travel the world ___", textEn: "I have one wish - to travel the world ___", answer: ".", hint: "Gạch ngang đơn không cần đóng cặp." },
              { text: "She - despite the obstacles ___ never gave up.", textEn: "She - despite the obstacles ___ never gave up.", answer: "-", hint: "Cặp gạch ngang." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is correctly punctuated?",
            options: [
              "The plan - though risky, was approved.",
              "The plan, though risky - was approved.",
              "The plan - though risky - was approved.",
              "The plan, though risky, - was approved.",
            ],
            answer: 2,
            explanation: "Dashes must be paired - both sides match.",
          },
          {
            question: "Choose the correct sentence:",
            options: [
              "The author (a Nobel laureate, gave a speech.",
              "The author (a Nobel laureate) gave a speech.",
              "The author a Nobel laureate) gave a speech.",
              "The author - a Nobel laureate) gave a speech.",
            ],
            answer: 1,
            explanation: "Parentheses must come in pairs.",
          },
          {
            question: "Which best uses a single dash?",
            options: [
              "I want - only one thing - peace.",
              "I want one thing - peace.",
              "I want, one thing - peace.",
              "I want one thing, peace -.",
            ],
            answer: 1,
            explanation: "A single dash can introduce information like a colon.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 4: SAT Essay & Argument Analysis
  // ============================================================
  {
    id: "sat-essay-analysis",
    title: "Phân tích Bài luận & Lập luận",
    titleEn: "SAT Essay & Argument Analysis",
    icon: "🎯",
    color: "fuchsia",
    description: "Nắm vững kỹ năng phân tích mục đích tác giả, biện pháp tu từ, và cấu trúc lập luận có bằng chứng.",
    descriptionEn: "Master analyzing author's purpose, rhetorical devices, and evidence-based argumentation.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "authors-purpose-tone",
        title: "Mục đích & Giọng văn của Tác giả",
        titleEn: "Author's Purpose & Tone",
        level: 4,
        difficulty: "advanced",
        theory:
          "**Mục đích tác giả (Purpose)** thường rơi vào 4 nhóm: \n- **Inform** (thông tin): trình bày sự thật, dữ liệu.\n- **Persuade** (thuyết phục): muốn người đọc đồng ý.\n- **Analyze** (phân tích): chia nhỏ để hiểu.\n- **Critique** (phê bình): đánh giá ưu/nhược.\n\n**Giọng văn (Tone)** thể hiện qua TỪ NGỮ:\n- Tích cực: optimistic, admiring, enthusiastic.\n- Tiêu cực: skeptical, critical, dismissive.\n- Trung lập: objective, analytical, descriptive.\n- Cảm xúc: nostalgic, melancholic, hopeful.\n\n**Mẹo SAT:** loại các đáp án có tone CỰC ĐOAN (furious, ecstatic) - tác giả học thuật hiếm khi dùng tone này.",
        theoryEn:
          "**Purpose** usually falls into Inform / Persuade / Analyze / Critique.\n\n**Tone** is revealed through WORD CHOICE.\n\n**SAT trick:** eliminate extreme tones (furious, ecstatic).",
        proTips: [
          "Đọc câu đầu và câu cuối - chúng tiết lộ purpose.",
          "Gạch chân tính từ và trạng từ để xác định tone.",
          "Loại các đáp án 'too strong' hoặc 'too weak'.",
        ],
        proTipsEn: [
          "Read the first and last sentences - they reveal purpose.",
          "Underline adjectives/adverbs to find tone.",
          "Eliminate too-strong or too-weak options.",
        ],
        vocabulary: [
          { word: "tone", ipa: "/toʊn/", meaning: "giọng văn", meaningEn: "attitude in writing", example: "The tone is sarcastic.", exampleEn: "The tone is sarcastic.", partOfSpeech: "noun" },
          { word: "objective", ipa: "/əbˈdʒektɪv/", meaning: "khách quan", meaningEn: "without bias", example: "Maintain an objective tone.", exampleEn: "Maintain an objective tone.", partOfSpeech: "adjective" },
          { word: "skeptical", ipa: "/ˈskeptɪkl/", meaning: "hoài nghi", meaningEn: "doubtful", example: "He is skeptical of the claim.", exampleEn: "He is skeptical of the claim.", partOfSpeech: "adjective" },
          { word: "critique", ipa: "/krɪˈtiːk/", meaning: "phê bình", meaningEn: "critical evaluation", example: "She wrote a critique of the film.", exampleEn: "She wrote a critique of the film.", partOfSpeech: "noun" },
          { word: "rhetoric", ipa: "/ˈretərɪk/", meaning: "thuật hùng biện", meaningEn: "art of persuasion", example: "Political rhetoric.", exampleEn: "Political rhetoric.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Đọc câu và xác định tone (objective / skeptical / admiring / critical).",
            instructionEn: "Identify the tone (objective / skeptical / admiring / critical).",
            sentences: [
              { text: "'The data clearly shows a 15% increase.' - tone: ___", textEn: "'The data clearly shows a 15% increase.' - tone: ___", answer: "objective", hint: "Trình bày sự thật." },
              { text: "'Such an unfounded claim deserves scrutiny.' - tone: ___", textEn: "'Such an unfounded claim deserves scrutiny.' - tone: ___", answer: "skeptical", hint: "Nghi ngờ." },
              { text: "'Her brilliant insight transformed the field.' - tone: ___", textEn: "'Her brilliant insight transformed the field.' - tone: ___", answer: "admiring", hint: "Khen ngợi." },
              { text: "'The policy is poorly designed and inefficient.' - tone: ___", textEn: "'The policy is poorly designed and inefficient.' - tone: ___", answer: "critical", hint: "Phê phán." },
              { text: "'The study was conducted over five years.' - tone: ___", textEn: "'The study was conducted over five years.' - tone: ___", answer: "objective", hint: "Trung lập." },
            ],
          },
        ],
        quiz: [
          {
            question: "What is the primary purpose of a passage that lists statistics about climate change?",
            options: ["entertain", "inform", "persuade", "critique"],
            answer: 1,
            explanation: "Listing statistics → inform.",
          },
          {
            question: "Which tone fits: 'It is naive to believe such a flawed theory'?",
            options: ["admiring", "objective", "dismissive", "nostalgic"],
            answer: 2,
            explanation: "Calling something 'naive' and 'flawed' = dismissive.",
          },
          {
            question: "An author who 'critiques' a book typically:",
            options: ["promotes it", "evaluates strengths and weaknesses", "ignores it", "rewrites it"],
            answer: 1,
            explanation: "Critique = balanced evaluation.",
          },
        ],
      },
      {
        id: "rhetorical-devices",
        title: "Biện pháp Tu từ (Rhetorical Devices)",
        titleEn: "Rhetorical Devices",
        level: 5,
        difficulty: "advanced",
        theory:
          "**Bộ ba kinh điển của Aristotle:**\n- **Ethos:** uy tín tác giả ('As a doctor with 20 years of experience...').\n- **Pathos:** cảm xúc ('Imagine your child suffering...').\n- **Logos:** logic + bằng chứng ('Studies show 80% of...').\n\n**Các biện pháp khác:**\n- **Analogy:** so sánh để giải thích ('The brain is like a computer.').\n- **Repetition:** lặp lại để nhấn mạnh ('We will fight. We will win. We will prevail.').\n- **Rhetorical question:** câu hỏi tu từ không cần trả lời.\n- **Parallelism:** cấu trúc song song.\n- **Anecdote:** câu chuyện ngắn minh họa.\n\nKhi SAT hỏi 'The author uses X primarily to...', nhận diện biện pháp → suy ra MỤC ĐÍCH.",
        theoryEn:
          "**Aristotle's triad:** Ethos (credibility), Pathos (emotion), Logos (logic).\n\n**Other devices:** analogy, repetition, rhetorical question, parallelism, anecdote.",
        proTips: [
          "Ethos = WHO says it. Pathos = HOW you feel. Logos = WHAT proves it.",
          "Câu hỏi tu từ thường nhằm tạo sự đồng cảm.",
          "Anecdote thường ở đầu/cuối để 'hook' người đọc.",
        ],
        proTipsEn: [
          "Ethos = WHO. Pathos = FEELING. Logos = PROOF.",
          "Rhetorical questions build empathy.",
          "Anecdotes hook the reader at the start/end.",
        ],
        vocabulary: [
          { word: "ethos", ipa: "/ˈiːθɒs/", meaning: "uy tín, đạo đức", meaningEn: "credibility appeal", example: "Doctors use ethos.", exampleEn: "Doctors use ethos.", partOfSpeech: "noun" },
          { word: "pathos", ipa: "/ˈpeɪθɒs/", meaning: "cảm xúc", meaningEn: "emotional appeal", example: "Charity ads use pathos.", exampleEn: "Charity ads use pathos.", partOfSpeech: "noun" },
          { word: "logos", ipa: "/ˈloʊɡɒs/", meaning: "logic", meaningEn: "logical appeal", example: "Scientists use logos.", exampleEn: "Scientists use logos.", partOfSpeech: "noun" },
          { word: "analogy", ipa: "/əˈnælədʒi/", meaning: "phép loại suy", meaningEn: "comparison to explain", example: "An analogy clarifies ideas.", exampleEn: "An analogy clarifies ideas.", partOfSpeech: "noun" },
          { word: "anecdote", ipa: "/ˈænɪkdoʊt/", meaning: "giai thoại ngắn", meaningEn: "short story", example: "She opened with an anecdote.", exampleEn: "She opened with an anecdote.", partOfSpeech: "noun" },
          { word: "rhetorical", ipa: "/rɪˈtɔːrɪkl/", meaning: "có tính tu từ", meaningEn: "for effect, not answer", example: "A rhetorical question.", exampleEn: "A rhetorical question.", partOfSpeech: "adjective" },
          { word: "appeal", ipa: "/əˈpiːl/", meaning: "lời kêu gọi", meaningEn: "request to feel/believe", example: "An emotional appeal.", exampleEn: "An emotional appeal.", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Xác định biện pháp tu từ (ethos / pathos / logos / analogy / anecdote).",
            instructionEn: "Identify the rhetorical device.",
            sentences: [
              { text: "'As a 30-year cardiologist, I urge you...' - ___", textEn: "'As a 30-year cardiologist, I urge you...' - ___", answer: "ethos", hint: "Uy tín." },
              { text: "'Imagine the agony of a starving child.' - ___", textEn: "'Imagine the agony of a starving child.' - ___", answer: "pathos", hint: "Cảm xúc." },
              { text: "'Data from 50 studies confirm that...' - ___", textEn: "'Data from 50 studies confirm that...' - ___", answer: "logos", hint: "Logic + dữ liệu." },
              { text: "'The mind is a garden - what you plant grows.' - ___", textEn: "'The mind is a garden - what you plant grows.' - ___", answer: "analogy", hint: "So sánh." },
              { text: "'I once met a boy who taught me everything about courage...' - ___", textEn: "'I once met a boy who taught me everything about courage...' - ___", answer: "anecdote", hint: "Câu chuyện minh họa." },
            ],
          },
        ],
        quiz: [
          {
            question: "Which rhetorical appeal uses statistics?",
            options: ["ethos", "pathos", "logos", "analogy"],
            answer: 2,
            explanation: "Statistics = logical proof = logos.",
          },
          {
            question: "What does 'ethos' rely on?",
            options: ["emotion", "data", "speaker's credibility", "humor"],
            answer: 2,
            explanation: "Ethos appeals to the speaker's authority.",
          },
          {
            question: "An author opens with a personal story to:",
            options: [
              "list statistics",
              "establish authority through ethos and engage with anecdote",
              "confuse the reader",
              "prove a mathematical formula",
            ],
            answer: 1,
            explanation: "Personal stories build connection and credibility.",
          },
        ],
      },
      {
        id: "evidence-argumentation",
        title: "Lập luận có Bằng chứng (Evidence-Based Argumentation)",
        titleEn: "Evidence-Based Argumentation",
        level: 5,
        difficulty: "advanced",
        theory:
          "**Cấu trúc lập luận chuẩn (Claim - Evidence - Reasoning):**\n\n1. **Claim:** quan điểm/kết luận. ('School should start later.')\n2. **Evidence:** dữ liệu/trích dẫn ủng hộ. ('A 2019 study showed 75%...')\n3. **Reasoning:** giải thích vì sao bằng chứng ủng hộ claim. ('Because more sleep = better focus.')\n\n**SAT Reading 'Command of Evidence' questions:**\n- Câu hỏi 1: chọn câu trả lời đúng.\n- Câu hỏi 2: chọn ĐOẠN VĂN cung cấp bằng chứng tốt nhất cho câu trả lời ở câu 1.\n→ Cả hai câu phải KHỚP NHAU. Nếu không, một trong hai sai.\n\n**Phân biệt:**\n- Strong evidence: cụ thể, có nguồn, có số liệu.\n- Weak evidence: chung chung, mang tính cảm tính, anecdotal.\n\n**Mẹo:** SAT thưởng câu trả lời CHẶT CHẼ và CÓ BẰNG CHỨNG, không thưởng cảm xúc.",
        theoryEn:
          "**Standard structure:** Claim → Evidence → Reasoning.\n\n**SAT 'Command of Evidence' pairs:** Q1 picks an answer; Q2 picks the BEST line as evidence. They must MATCH.\n\n**Strong evidence:** specific, sourced, quantitative.",
        proTips: [
          "Trong câu hỏi 'paired evidence', làm Q2 trước nếu Q1 khó.",
          "Loại bằng chứng quá chung chung hoặc không liên quan trực tiếp.",
          "Reasoning là cầu nối - luôn hỏi: 'TẠI SAO bằng chứng này ủng hộ claim?'",
        ],
        proTipsEn: [
          "On paired evidence questions, do Q2 first if Q1 is hard.",
          "Eliminate evidence that is too general or off-topic.",
          "Reasoning is the bridge - always ask 'WHY does this evidence support the claim?'",
        ],
        vocabulary: [
          { word: "claim", ipa: "/kleɪm/", meaning: "luận điểm", meaningEn: "main point argued", example: "State your claim clearly.", exampleEn: "State your claim clearly.", partOfSpeech: "noun" },
          { word: "evidence", ipa: "/ˈevɪdəns/", meaning: "bằng chứng", meaningEn: "supporting facts", example: "Provide evidence.", exampleEn: "Provide evidence.", partOfSpeech: "noun" },
          { word: "reasoning", ipa: "/ˈriːzənɪŋ/", meaning: "lập luận", meaningEn: "logical thinking", example: "Show your reasoning.", exampleEn: "Show your reasoning.", partOfSpeech: "noun" },
          { word: "rebuttal", ipa: "/rɪˈbʌtl/", meaning: "phản biện", meaningEn: "counterargument", example: "Prepare a rebuttal.", exampleEn: "Prepare a rebuttal.", partOfSpeech: "noun" },
          { word: "concession", ipa: "/kənˈseʃn/", meaning: "sự nhượng bộ", meaningEn: "acknowledging opponent", example: "A concession strengthens arguments.", exampleEn: "A concession strengthens arguments.", partOfSpeech: "noun" },
          { word: "fallacy", ipa: "/ˈfæləsi/", meaning: "ngụy biện", meaningEn: "logical error", example: "Avoid logical fallacies.", exampleEn: "Avoid logical fallacies.", partOfSpeech: "noun" },
          { word: "anecdotal", ipa: "/ˌænɪkˈdoʊtl/", meaning: "thuộc giai thoại", meaningEn: "based on personal account", example: "Anecdotal evidence is weak.", exampleEn: "Anecdotal evidence is weak.", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp Claim - Evidence - Reasoning đúng thứ tự.",
            instructionEn: "Order Claim - Evidence - Reasoning correctly.",
            items: [
              {
                scrambled: ["Schools", "should", "start", "later", "studies", "show", "teen", "sleep", "needs"],
                correct: "Schools should start later studies show teen sleep needs",
                correctEn: "Claim: Schools should start later. Evidence: Studies show teen sleep needs increase. Reasoning: Later starts align with biology.",
              },
              {
                scrambled: ["Evidence", "supports", "the", "claim", "through", "data"],
                correct: "Evidence supports the claim through data",
                correctEn: "Evidence supports the claim through data.",
              },
            ],
          },
        ],
        quiz: [
          {
            question: "Which is the STRONGEST evidence?",
            options: [
              "I think people are happier in summer.",
              "My friend felt happy last summer.",
              "A 2022 survey of 5,000 adults found 68% report higher mood in summer.",
              "Summer is the best season.",
            ],
            answer: 2,
            explanation: "Specific, sourced, quantitative = strongest.",
          },
          {
            question: "In 'Command of Evidence' paired questions, Q2 asks you to:",
            options: [
              "guess randomly",
              "pick the line that BEST supports your Q1 answer",
              "find a synonym",
              "summarize the passage",
            ],
            answer: 1,
            explanation: "Q2 must directly support Q1.",
          },
          {
            question: "What is a 'rebuttal'?",
            options: [
              "the main claim",
              "supporting evidence",
              "a counterargument addressing opposing views",
              "a list of facts",
            ],
            answer: 2,
            explanation: "A rebuttal answers an opposing argument.",
          },
        ],
      },
    ],
  },
];
