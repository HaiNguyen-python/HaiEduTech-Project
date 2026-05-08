// Chinese HSK Curriculum: HSK 1-6 with Pinyin, Hanzi, Grammar, Reading
import type { LanguageModule } from "./types";

export const hskModules: LanguageModule[] = [
  {
    id: "hsk1-basics",
    title: "HSK 1: Cơ bản",
    titleEn: "HSK 1: Basics",
    icon: "🀄",
    color: "from-red-500/20 to-rose-500/20",
    description: "150 từ vựng cơ bản, Pinyin và câu đơn giản",
    descriptionEn: "150 basic words, Pinyin and simple sentences",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk1-1",
        title: "Chào hỏi & Giới thiệu",
        titleEn: "Greetings & Introductions",
        level: 1,
        difficulty: "beginner",
        theory: "**Chào hỏi cơ bản:**\n\n你好 (nǐ hǎo) - Xin chào\n你好吗？(nǐ hǎo ma?) - Bạn khỏe không?\n我很好 (wǒ hěn hǎo) - Tôi rất khỏe\n谢谢 (xiè xie) - Cảm ơn\n不客气 (bú kè qi) - Không có gì\n再见 (zài jiàn) - Tạm biệt\n\n**Giới thiệu bản thân:**\n我叫... (wǒ jiào...) - Tôi tên là...\n我是... (wǒ shì...) - Tôi là...\n你叫什么名字？(nǐ jiào shén me míng zi?) - Bạn tên gì?\n\n**Thanh điệu (Tones):**\n- 1st tone (ˉ): cao bằng → māo (猫 con mèo)\n- 2nd tone (ˊ): đi lên → máng (忙 bận)\n- 3rd tone (ˇ): xuống rồi lên → mǎi (买 mua)\n- 4th tone (ˋ): đi xuống mạnh → mài (卖 bán)\n- Neutral tone: nhẹ, ngắn → ma (吗 hỏi)",
        theoryEn: "**Basic Greetings:**\n你好 (nǐ hǎo) - Hello\n谢谢 (xiè xie) - Thank you\n再见 (zài jiàn) - Goodbye\n\n**Self Introduction:**\n我叫... (wǒ jiào...) - My name is...\n我是... (wǒ shì...) - I am...\n\n**4 Tones + Neutral tone explained**",
        vocabulary: [
          { word: "你好", pinyin: "nǐ hǎo", meaning: "xin chào", example: "你好！我是小明。", partOfSpeech: "interjection" },
          { word: "谢谢", pinyin: "xiè xie", meaning: "cảm ơn", example: "谢谢你的帮助！", partOfSpeech: "interjection" },
          { word: "再见", pinyin: "zài jiàn", meaning: "tạm biệt", example: "再见！明天见！", partOfSpeech: "interjection" },
          { word: "叫", pinyin: "jiào", meaning: "gọi là, tên là", example: "我叫安娜。", partOfSpeech: "verb" },
          { word: "是", pinyin: "shì", meaning: "là", example: "我是学生。", partOfSpeech: "verb" },
          { word: "名字", pinyin: "míng zi", meaning: "tên", example: "你叫什么名字？", partOfSpeech: "noun" },
          { word: "什么", pinyin: "shén me", meaning: "cái gì", example: "这是什么？", partOfSpeech: "pronoun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền Pinyin hoặc chữ Hán phù hợp",
            instructionEn: "Fill in appropriate Pinyin or Hanzi",
            sentences: [
              { text: "Xin chào = ___ (Hanzi)", textEn: "Hello = ___ (Hanzi)", answer: "你好", hint: "nǐ hǎo" },
              { text: "谢谢 = ___ (nghĩa tiếng Việt)", textEn: "谢谢 = ___ (meaning)", answer: "cảm ơn" },
              { text: "Tạm biệt = ___ (Hanzi)", textEn: "Goodbye = ___ (Hanzi)", answer: "再见", hint: "zài jiàn" },
              { text: "我___ 小明。(tên là)", textEn: "我___ 小明。(name is)", answer: "叫", hint: "jiào" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu tiếng Trung đúng",
            instructionEn: "Arrange into correct Chinese sentence",
            items: [
              { scrambled: ["什么", "你", "名字", "叫", "？"], correct: "你叫什么名字？", correctEn: "What is your name?" },
              { scrambled: ["学生", "是", "我"], correct: "我是学生", correctEn: "I am a student" },
            ],
          },
        ],
        quiz: [
          { question: "你好 đọc là gì?", options: ["nǐ hǎo", "ní háo", "nì hào", "ní hǎo"], answer: 0, explanation: "你好 = nǐ hǎo, thanh 3 + thanh 3 (nhưng 你 biến thành thanh 2 khi đứng trước thanh 3)." },
          { question: "'我叫安娜' nghĩa là?", options: ["Tôi thích Anna", "Tôi tên Anna", "Tôi là giáo viên", "Tôi gặp Anna"], answer: 1, explanation: "我叫 = tôi tên là. 我叫安娜 = Tôi tên là Anna." },
          { question: "Thanh 4 (ˋ) có đặc điểm gì?", options: ["Cao bằng", "Đi lên", "Xuống rồi lên", "Đi xuống mạnh"], answer: 3, explanation: "Thanh 4 (ˋ) đi xuống mạnh và dứt khoát, ví dụ: mài (卖 = bán)." },
        ],
      },
      {
        id: "hsk1-2",
        title: "Số đếm & Ngày tháng",
        titleEn: "Numbers & Dates",
        level: 1,
        difficulty: "beginner",
        theory: "**Số đếm 1-100:**\n\n一 (yī) = 1 | 二 (èr) = 2 | 三 (sān) = 3\n四 (sì) = 4 | 五 (wǔ) = 5 | 六 (liù) = 6\n七 (qī) = 7 | 八 (bā) = 8 | 九 (jiǔ) = 9\n十 (shí) = 10\n\n**Quy tắc:**\n- 11 = 十一 (shí yī)\n- 20 = 二十 (èr shí)\n- 35 = 三十五 (sān shí wǔ)\n- 100 = 一百 (yì bǎi)\n\n**Ngày tháng:**\n- 年 (nián) = năm → 2024年\n- 月 (yuè) = tháng → 三月 = tháng 3\n- 日/号 (rì/hào) = ngày → 五号 = ngày 5\n- 星期 (xīng qī) = thứ → 星期一 = thứ Hai\n\n**Hỏi ngày:**\n- 今天几号？(jīn tiān jǐ hào?) = Hôm nay ngày mấy?\n- 今天星期几？(jīn tiān xīng qī jǐ?) = Hôm nay thứ mấy?",
        theoryEn: "**Numbers 1-100:**\n一(1) 二(2) 三(3) 四(4) 五(5) 六(6) 七(7) 八(8) 九(9) 十(10)\n\n**Dates:**\n年(year) 月(month) 日/号(day) 星期(weekday)",
        vocabulary: [
          { word: "一", pinyin: "yī", meaning: "một", example: "我有一个朋友。", partOfSpeech: "number" },
          { word: "十", pinyin: "shí", meaning: "mười", example: "他十岁了。", partOfSpeech: "number" },
          { word: "年", pinyin: "nián", meaning: "năm", example: "2024年", partOfSpeech: "noun" },
          { word: "月", pinyin: "yuè", meaning: "tháng", example: "三月很美。", partOfSpeech: "noun" },
          { word: "号", pinyin: "hào", meaning: "ngày (khẩu ngữ)", example: "今天五号。", partOfSpeech: "noun" },
          { word: "星期", pinyin: "xīng qī", meaning: "tuần/thứ", example: "星期一我很忙。", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Viết số bằng chữ Hán",
            instructionEn: "Write numbers in Chinese characters",
            sentences: [
              { text: "15 = ___", textEn: "15 = ___", answer: "十五", hint: "shí wǔ" },
              { text: "28 = ___", textEn: "28 = ___", answer: "二十八", hint: "èr shí bā" },
              { text: "Thứ Ba = ___", textEn: "Tuesday = ___", answer: "星期二", hint: "xīng qī èr" },
              { text: "Tháng 7 = ___", textEn: "July = ___", answer: "七月", hint: "qī yuè" },
            ],
          },
        ],
        quiz: [
          { question: "三十五 là số mấy?", options: ["25", "35", "53", "305"], answer: 1, explanation: "三十五 = 3×10 + 5 = 35." },
          { question: "星期天 nghĩa là?", options: ["Thứ Hai", "Thứ Sáu", "Chủ Nhật", "Thứ Bảy"], answer: 2, explanation: "星期天 (xīng qī tiān) = Chủ Nhật. Cũng có thể viết 星期日." },
        ],
      },
      {
        id: "hsk1-3",
        title: "Gia đình & Nghề nghiệp",
        titleEn: "Family & Occupations",
        level: 1,
        difficulty: "beginner",
        theory: "**Gia đình (家人 jiā rén):**\n\n爸爸 (bà ba) = bố | 妈妈 (mā ma) = mẹ\n哥哥 (gē ge) = anh trai | 姐姐 (jiě jie) = chị gái\n弟弟 (dì di) = em trai | 妹妹 (mèi mei) = em gái\n爷爷 (yé ye) = ông nội | 奶奶 (nǎi nai) = bà nội\n\n**Nghề nghiệp (工作 gōng zuò):**\n\n老师 (lǎo shī) = giáo viên\n学生 (xué shēng) = học sinh\n医生 (yī shēng) = bác sĩ\n工人 (gōng rén) = công nhân\n\n**Cấu trúc:**\n- 我爸爸是老师。= Bố tôi là giáo viên.\n- 你做什么工作？= Bạn làm nghề gì?\n- 我家有四口人。= Gia đình tôi có 4 người.\n- 量词: 口 (khẩu) dùng cho thành viên gia đình, 个 (gè) dùng chung",
        theoryEn: "**Family:** 爸爸(dad) 妈妈(mom) 哥哥(brother) 姐姐(sister)\n**Jobs:** 老师(teacher) 学生(student) 医生(doctor)\n**Patterns:** 我爸爸是..., 你做什么工作？",
        vocabulary: [
          { word: "爸爸", pinyin: "bà ba", meaning: "bố", example: "我爸爸是医生。", partOfSpeech: "noun" },
          { word: "妈妈", pinyin: "mā ma", meaning: "mẹ", example: "我妈妈很漂亮。", partOfSpeech: "noun" },
          { word: "老师", pinyin: "lǎo shī", meaning: "giáo viên", example: "王老师很好。", partOfSpeech: "noun" },
          { word: "学生", pinyin: "xué shēng", meaning: "học sinh", example: "我是学生。", partOfSpeech: "noun" },
          { word: "医生", pinyin: "yī shēng", meaning: "bác sĩ", example: "她是医生。", partOfSpeech: "noun" },
          { word: "工作", pinyin: "gōng zuò", meaning: "công việc", example: "你做什么工作？", partOfSpeech: "noun/verb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Điền chữ Hán phù hợp",
            instructionEn: "Fill in appropriate Chinese characters",
            sentences: [
              { text: "Giáo viên = ___ (Hanzi)", textEn: "Teacher = ___", answer: "老师", hint: "lǎo shī" },
              { text: "我___是医生。(bố)", textEn: "My ___ is a doctor.", answer: "爸爸", hint: "bà ba" },
              { text: "你做什么___？(công việc)", textEn: "What ___ do you do?", answer: "工作", hint: "gōng zuò" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu tiếng Trung đúng",
            instructionEn: "Arrange into correct Chinese sentence",
            items: [
              { scrambled: ["四", "有", "我家", "口", "人"], correct: "我家有四口人", correctEn: "My family has 4 people" },
              { scrambled: ["是", "我爸爸", "老师"], correct: "我爸爸是老师", correctEn: "My father is a teacher" },
            ],
          },
        ],
        quiz: [
          { question: "妈妈 đọc là gì?", options: ["mā ma", "mà mà", "mǎ ma", "má ma"], answer: 0, explanation: "妈妈 = mā ma, cả hai âm đều thanh 1 (cao bằng)." },
          { question: "'我家有四口人' nghĩa là?", options: ["Tôi có 4 bạn", "Gia đình tôi có 4 người", "Tôi 4 tuổi", "Tôi ở phòng 4"], answer: 1, explanation: "我家 = nhà tôi, 有 = có, 四口人 = 4 người (口 = lượng từ cho người trong gia đình)." },
        ],
      },
    ],
  },
  {
    id: "hsk2-grammar",
    title: "HSK 2: Ngữ pháp",
    titleEn: "HSK 2: Grammar",
    icon: "📖",
    color: "from-orange-500/20 to-amber-500/20",
    description: "Ngữ pháp HSK 2: bổ ngữ, so sánh, liên từ",
    descriptionEn: "HSK 2 Grammar: complements, comparisons, conjunctions",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk2-gram-1",
        title: "了 (le) - Hoàn thành & Thay đổi",
        titleEn: "了 (le) - Completion & Change",
        level: 2,
        difficulty: "intermediate",
        theory: "**了 (le)** là một trong những hư từ quan trọng nhất.\n\n**1. 了 sau động từ - Hoàn thành (Perfective):**\n表示动作完成\n- 我**吃了**饭。= Tôi **đã ăn** cơm.\n- 他**买了**一本书。= Anh ấy **đã mua** một cuốn sách.\n\n**2. 了 cuối câu - Thay đổi trạng thái (Change of state):**\n表示新情况\n- 下雨**了**。= **Bắt đầu** mưa rồi.\n- 他高**了**。= Anh ấy **đã** cao **rồi**.\n\n**3. Phủ định - KHÔNG dùng 了:**\n用没有\n- 我**没有**吃饭。(KHÔNG phải ~~我不吃了饭~~)\n- 他**没**买书。\n\n**Lưu ý:**\n- 了 ≠ quá khứ đơn thuần (Past tense)\n- 了 nhấn mạnh sự HOÀN THÀNH hoặc THAY ĐỔI\n- Có thể dùng ở tương lai: 明天我吃了饭去学校。",
        theoryEn: "**了 (le)** has two main uses:\n1. After verb - completion: 我吃了饭 (I have eaten)\n2. End of sentence - change of state: 下雨了 (It started raining)\n\nNegative: Use 没有, NOT 了",
        vocabulary: [
          { word: "吃", pinyin: "chī", meaning: "ăn", example: "我吃了早饭。", partOfSpeech: "verb" },
          { word: "买", pinyin: "mǎi", meaning: "mua", example: "她买了一件衣服。", partOfSpeech: "verb" },
          { word: "没有", pinyin: "méi yǒu", meaning: "không có / chưa", example: "我没有去过中国。", partOfSpeech: "adverb" },
          { word: "已经", pinyin: "yǐ jīng", meaning: "đã (rồi)", example: "他已经走了。", partOfSpeech: "adverb" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Thêm 了 vào đúng vị trí hoặc dùng 没有",
            instructionEn: "Add 了 or use 没有 correctly",
            sentences: [
              { text: "我吃___饭。(đã ăn xong)", textEn: "I have eaten (add 了)", answer: "了" },
              { text: "下雨___。(bắt đầu mưa rồi)", textEn: "It started raining (add 了)", answer: "了" },
              { text: "他___买书。(chưa mua - phủ định)", textEn: "He hasn't bought a book (negative)", answer: "没有" },
            ],
          },
        ],
        quiz: [
          { question: "了 sau động từ biểu thị gì?", options: ["Quá khứ", "Hoàn thành hành động", "Tương lai", "Phủ định"], answer: 1, explanation: "了 sau động từ biểu thị hành động ĐÃ HOÀN THÀNH, không phải đơn thuần 'quá khứ'." },
          { question: "Phủ định của '我吃了饭' là gì?", options: ["我不吃了饭", "我没有吃饭", "我吃不了饭", "我没了吃饭"], answer: 1, explanation: "Phủ định dùng 没有: 我没有吃饭。Bỏ 了 khi dùng 没有." },
        ],
      },
      {
        id: "hsk2-gram-2",
        title: "比 (bǐ) - So sánh",
        titleEn: "比 (bǐ) - Comparisons",
        level: 2,
        difficulty: "intermediate",
        theory: "**Cấu trúc so sánh với 比 (bǐ):**\n\n**A 比 B + Adj:**\n- 他**比**我高。= Anh ấy cao **hơn** tôi.\n- 北京**比**河内大。= Bắc Kinh lớn **hơn** Hà Nội.\n\n**A 比 B + Adj + 多了/得多:**\n- 他比我高**多了**。= Anh ấy cao hơn tôi **nhiều**.\n\n**Phủ định: A 没有 B + Adj:**\n- 我**没有**他高。= Tôi **không** cao **bằng** anh ấy.\n\n**Bằng nhau: A 跟 B 一样 + Adj:**\n- 我**跟**他**一样**高。= Tôi cao **bằng** anh ấy.\n\n⚠️ **Lưu ý:** KHÔNG nói ~~他比我很高~~ (không dùng 很 với 比)",
        theoryEn: "**Comparison with 比:**\nA 比 B + Adj = A is more... than B\nA 没有 B + Adj = A is not as... as B\nA 跟 B 一样 + Adj = A is as... as B",
        vocabulary: [
          { word: "比", pinyin: "bǐ", meaning: "so sánh, hơn", example: "他比我高。", partOfSpeech: "preposition" },
          { word: "一样", pinyin: "yí yàng", meaning: "giống nhau, bằng nhau", example: "我们一样大。", partOfSpeech: "adjective" },
          { word: "高", pinyin: "gāo", meaning: "cao", example: "他很高。", partOfSpeech: "adjective" },
          { word: "大", pinyin: "dà", meaning: "lớn, to", example: "北京很大。", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành câu so sánh",
            instructionEn: "Complete comparison sentences",
            sentences: [
              { text: "他___我高。(hơn)", textEn: "He is taller ___ me.", answer: "比", hint: "bǐ" },
              { text: "我___他一样大。(bằng)", textEn: "I am as old ___ him.", answer: "跟", hint: "gēn" },
              { text: "我没有他___。(cao)", textEn: "I'm not as ___ as him.", answer: "高", hint: "gāo" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp câu so sánh",
            instructionEn: "Arrange comparison sentences",
            items: [
              { scrambled: ["高", "比", "他", "我"], correct: "他比我高", correctEn: "He is taller than me" },
              { scrambled: ["一样", "我们", "大"], correct: "我们一样大", correctEn: "We are the same age" },
            ],
          },
        ],
        quiz: [
          { question: "Câu nào đúng?", options: ["他比我很高", "他比我高", "他比我是高", "他很比我高"], answer: 1, explanation: "KHÔNG dùng 很 với 比. Đúng: 他比我高 (không cần 很)." },
          { question: "'我没有他高' nghĩa là?", options: ["Tôi cao hơn anh ấy", "Tôi không cao bằng anh ấy", "Tôi và anh ấy cao bằng nhau", "Anh ấy không cao"], answer: 1, explanation: "没有...高 = không cao bằng. 我没有他高 = Tôi không cao bằng anh ấy." },
        ],
      },
    ],
  },
  {
    id: "hsk3-grammar",
    title: "HSK 3: Ngữ pháp nâng cao",
    titleEn: "HSK 3: Advanced Grammar",
    icon: "📚",
    color: "from-green-500/20 to-emerald-500/20",
    description: "Bổ ngữ, 把 câu, mệnh đề quan hệ",
    descriptionEn: "Complements, 把 sentences, relative clauses",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk3-gram-1",
        title: "把 (bǎ) - Câu chữ Bả",
        titleEn: "把 (bǎ) - Disposal Construction",
        level: 3,
        difficulty: "intermediate",
        theory: "**Cấu trúc 把:**\nS + 把 + O + V + Complement\n\n**Ý nghĩa:** Nhấn mạnh tác động của hành động lên đối tượng.\n\n**Ví dụ:**\n- 请你**把**门**关上**。= Xin hãy **đóng** cửa **lại**.\n- 我**把**作业**做完了**。= Tôi **đã làm xong** bài tập.\n- 他**把**杯子**打破了**。= Anh ấy **đã làm vỡ** cái cốc.\n\n**Quy tắc:**\n1. Tân ngữ sau 把 phải XÁC ĐỊNH (specific)\n   ✅ 把那本书放在桌子上 (cuốn sách đó - xác định)\n   ❌ 把一本书放在桌子上 (một cuốn sách - không xác định)\n2. Động từ phải có BỔ NGỮ kết quả/phương hướng\n   ❌ 把门关 (thiếu bổ ngữ)\n   ✅ 把门关上 (关上 = đóng lại)\n3. Phủ định: 别/不要/没有 đặt TRƯỚC 把\n   - 别把书弄丢了。= Đừng làm mất sách.",
        theoryEn: "**把 construction:** S + 把 + O + V + Complement\nEmphasizes the effect of an action on an object.\n\nRules:\n1. Object must be specific\n2. Verb needs a complement\n3. Negation goes BEFORE 把",
        vocabulary: [
          { word: "把", pinyin: "bǎ", meaning: "(giới từ chỉ đối tượng)", example: "请你把窗户打开。", partOfSpeech: "preposition" },
          { word: "关上", pinyin: "guān shàng", meaning: "đóng lại", example: "把门关上。", partOfSpeech: "verb" },
          { word: "放", pinyin: "fàng", meaning: "đặt, để", example: "把书放在桌子上。", partOfSpeech: "verb" },
          { word: "打开", pinyin: "dǎ kāi", meaning: "mở ra", example: "请把窗户打开。", partOfSpeech: "verb" },
        ],
        exercises: [
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp thành câu 把 đúng",
            instructionEn: "Arrange into correct 把 sentence",
            items: [
              { scrambled: ["关上", "把", "请", "门"], correct: "请把门关上", correctEn: "Please close the door" },
              { scrambled: ["做完了", "我", "把", "作业"], correct: "我把作业做完了", correctEn: "I finished the homework" },
            ],
          },
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành câu 把",
            instructionEn: "Complete 把 sentences",
            sentences: [
              { text: "请你___门关上。", textEn: "Please close the door.", answer: "把" },
              { text: "他把杯子___了。(làm vỡ)", textEn: "He broke the cup.", answer: "打破" },
            ],
          },
        ],
        quiz: [
          { question: "Tân ngữ sau 把 phải là?", options: ["Bất kỳ danh từ nào", "Danh từ xác định (specific)", "Danh từ không xác định", "Đại từ"], answer: 1, explanation: "Tân ngữ sau 把 phải XÁC ĐỊNH. Ví dụ: 把那本书 (cuốn sách đó), không phải 把一本书." },
          { question: "Phủ định với 把 đặt ở đâu?", options: ["Sau 把", "Sau động từ", "Trước 把", "Cuối câu"], answer: 2, explanation: "不/没有/别 đặt TRƯỚC 把: 别把书弄丢了 = Đừng làm mất sách." },
        ],
      },
    ],
  },
  {
    id: "hsk4-reading",
    title: "HSK 4: Đọc hiểu",
    titleEn: "HSK 4: Reading Comprehension",
    icon: "📰",
    color: "from-blue-500/20 to-indigo-500/20",
    description: "Đọc hiểu văn bản HSK 4 với 1200 từ",
    descriptionEn: "HSK 4 reading with 1200-word vocabulary",
    category: "hsk",
    language: "chinese",
    lessons: [
      {
        id: "hsk4-read-1",
        title: "Đoạn văn về Văn hóa",
        titleEn: "Cultural Reading Passages",
        level: 4,
        difficulty: "advanced",
        theory: "**Đọc hiểu HSK 4** yêu cầu hiểu đoạn văn 200-300 chữ.\n\n**Chủ đề thường gặp:**\n- 文化 (wén huà) - Văn hóa\n- 历史 (lì shǐ) - Lịch sử\n- 科技 (kē jì) - Khoa học công nghệ\n- 社会 (shè huì) - Xã hội\n\n**Chiến lược đọc:**\n1. Đọc tiêu đề trước\n2. Xác định từ khóa trong câu hỏi\n3. Tìm đoạn chứa thông tin\n4. Chú ý các từ nối: 但是, 然而, 因此, 所以\n\n**Đoạn văn mẫu:**\n中国的春节是最重要的传统节日。每年农历一月一日，人们会回家和家人团聚。过年的时候，大家一起吃年夜饭，放鞭炮，还要给孩子们发红包。春节不只是一个节日，更是中国人表达亲情和祝福的重要时刻。\n\n(Tết Nguyên Đán là ngày lễ truyền thống quan trọng nhất của Trung Quốc...)",
        theoryEn: "**HSK 4 Reading** requires understanding 200-300 character passages.\n\n**Common topics:** Culture, History, Technology, Society\n\n**Reading strategy:**\n1. Read title first\n2. Identify keywords in questions\n3. Locate relevant paragraph\n4. Watch for connectors: 但是, 因此, 所以",
        vocabulary: [
          { word: "春节", pinyin: "chūn jié", meaning: "Tết Nguyên Đán", example: "春节是中国最重要的节日。", partOfSpeech: "noun" },
          { word: "传统", pinyin: "chuán tǒng", meaning: "truyền thống", example: "这是传统文化。", partOfSpeech: "noun/adj" },
          { word: "团聚", pinyin: "tuán jù", meaning: "đoàn tụ", example: "一家人团聚在一起。", partOfSpeech: "verb" },
          { word: "红包", pinyin: "hóng bāo", meaning: "lì xì, bao đỏ", example: "给孩子发红包。", partOfSpeech: "noun" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Dựa trên đoạn văn sau, trả lời câu hỏi:\n\nPassage: '春节是中国最重要的传统节日。每年春节，一家人团聚在一起，吃团圆饭，看春晚。过年的时候，大人给孩子们发红包，祝他们新年快乐。'",
            instructionEn: "Based on the passage below, answer the questions:\n\nPassage: '春节是中国最重要的传统节日。每年春节，一家人团聚在一起，吃团圆饭，看春晚。过年的时候，大人给孩子们发红包，祝他们新年快乐。' (Spring Festival is China's most important traditional holiday. Every year, families reunite, eat reunion dinner, and watch the Spring Gala. During New Year, adults give children red envelopes and wish them a happy new year.)",
            sentences: [
              { text: "中国最重要的传统节日是___。", textEn: "The most important festival is ___.", answer: "春节", hint: "chūn jié" },
              { text: "过年的时候，大人给孩子们发___。", textEn: "During New Year, adults give children ___.", answer: "红包", hint: "hóng bāo" },
            ],
          },
        ],
        quiz: [
          { question: "春节 là ngày lễ gì?", options: ["Tết Trung Thu", "Tết Nguyên Đán", "Tết Đoan Ngọ", "Ngày Quốc Khánh"], answer: 1, explanation: "春节 (chūn jié) = Tết Nguyên Đán, ngày lễ truyền thống quan trọng nhất của Trung Quốc." },
          { question: "红包 nghĩa là gì?", options: ["Quà tặng", "Lì xì/bao đỏ", "Thiệp chúc", "Pháo hoa"], answer: 1, explanation: "红包 = bao đỏ (lì xì), phong tục tặng tiền cho trẻ em dịp Tết." },
        ],
      },
    ],
  },
];

export const chineseConvModules: LanguageModule[] = [
  {
    id: "cn-conv-daily",
    title: "Giao tiếp hàng ngày",
    titleEn: "Daily Conversations",
    icon: "💬",
    color: "from-pink-500/20 to-rose-500/20",
    description: "Hội thoại thực tế trong cuộc sống hàng ngày",
    descriptionEn: "Real-life daily conversations",
    category: "chinese-conv",
    language: "chinese",
    lessons: [
      {
        id: "cn-conv-1",
        title: "Mua sắm & Trả giá",
        titleEn: "Shopping & Bargaining",
        level: 2,
        difficulty: "beginner",
        theory: "**Hội thoại mua sắm:**\n\n**Hỏi giá:**\n- 这个多少钱？(zhè ge duō shao qián?) = Cái này bao nhiêu tiền?\n- 太贵了！(tài guì le!) = Đắt quá!\n- 能便宜一点吗？(néng pián yi yì diǎn ma?) = Có thể rẻ hơn không?\n\n**Trả giá:**\n- 最低多少钱？(zuì dī duō shao qián?) = Giá thấp nhất bao nhiêu?\n- 打折吗？(dǎ zhé ma?) = Có giảm giá không?\n- 买两个能便宜吗？= Mua 2 cái có rẻ hơn không?\n\n**Thanh toán:**\n- 可以用微信支付吗？= Có thể dùng WeChat Pay không?\n- 给你一百块。= Đây, một trăm đồng.\n- 找你二十块。= Thối cho bạn 20 đồng.\n\n**Hội thoại mẫu:**\nA: 这件衣服多少钱？\nB: 两百块。\nA: 太贵了，能便宜一点吗？\nB: 一百五，最低价。\nA: 好的，我买了。",
        theoryEn: "**Shopping dialogues:**\n- 多少钱？= How much?\n- 太贵了！= Too expensive!\n- 能便宜一点吗？= Can it be cheaper?\n- 打折吗？= Any discount?",
        vocabulary: [
          { word: "多少钱", pinyin: "duō shao qián", meaning: "bao nhiêu tiền", example: "这个多少钱？", partOfSpeech: "phrase" },
          { word: "贵", pinyin: "guì", meaning: "đắt", example: "太贵了！", partOfSpeech: "adjective" },
          { word: "便宜", pinyin: "pián yi", meaning: "rẻ", example: "这个很便宜。", partOfSpeech: "adjective" },
          { word: "打折", pinyin: "dǎ zhé", meaning: "giảm giá", example: "打八折。(giảm 20%)", partOfSpeech: "verb" },
          { word: "块", pinyin: "kuài", meaning: "đồng (tiền)", example: "一百块。", partOfSpeech: "measure word" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành hội thoại mua sắm",
            instructionEn: "Complete shopping dialogues",
            sentences: [
              { text: "这个___钱？(bao nhiêu)", textEn: "How much is this?", answer: "多少", hint: "duō shao" },
              { text: "太___了！(đắt)", textEn: "Too expensive!", answer: "贵", hint: "guì" },
              { text: "能___一点吗？(rẻ hơn)", textEn: "Can it be cheaper?", answer: "便宜", hint: "pián yi" },
            ],
          },
          {
            type: "sentence-reorder",
            instruction: "Sắp xếp hội thoại đúng thứ tự",
            instructionEn: "Arrange dialogue in correct order",
            items: [
              { scrambled: ["多少钱", "这件衣服", "？"], correct: "这件衣服多少钱？", correctEn: "How much is this clothing?" },
              { scrambled: ["吗", "便宜一点", "能", "？"], correct: "能便宜一点吗？", correctEn: "Can it be cheaper?" },
            ],
          },
        ],
        quiz: [
          { question: "打八折 nghĩa là giảm bao nhiêu?", options: ["8%", "20%", "80%", "18%"], answer: 1, explanation: "打八折 = giữ 80%, tức GIẢM 20%. Cách tính: 10 - 8 = 2 → giảm 20%." },
          { question: "'找你二十块' nghĩa là?", options: ["Tìm bạn 20 đồng", "Thối cho bạn 20 đồng", "Cho bạn 20 đồng", "Mượn 20 đồng"], answer: 1, explanation: "找 trong ngữ cảnh thanh toán = thối tiền. 找你二十块 = Thối cho bạn 20 đồng." },
        ],
      },
      {
        id: "cn-conv-2",
        title: "Đi nhà hàng & Gọi món",
        titleEn: "Restaurant & Ordering Food",
        level: 2,
        difficulty: "beginner",
        theory: "**Hội thoại nhà hàng:**\n\n**Đặt bàn:**\n- 有位子吗？(yǒu wèi zi ma?) = Có chỗ không?\n- 我们两个人。= Chúng tôi 2 người.\n- 请给我菜单。= Cho tôi xem thực đơn.\n\n**Gọi món:**\n- 我要一碗米饭。= Tôi muốn một bát cơm.\n- 不要太辣。= Đừng quá cay.\n- 有什么推荐的？= Có gì hay ho giới thiệu không?\n\n**Thanh toán:**\n- 买单 (mǎi dān) = tính tiền\n- AA制 (AA zhì) = chia tiền\n\n**Món ăn phổ biến:**\n- 米饭 (mǐ fàn) = cơm\n- 面条 (miàn tiáo) = mì\n- 饺子 (jiǎo zi) = sủi cảo\n- 炒菜 (chǎo cài) = rau xào\n- 汤 (tāng) = canh",
        theoryEn: "**Restaurant dialogues:**\n- 有位子吗？= Any seats?\n- 请给我菜单。= Menu please.\n- 买单！= Bill please!\n\n**Common dishes:** 米饭(rice) 面条(noodles) 饺子(dumplings)",
        vocabulary: [
          { word: "菜单", pinyin: "cài dān", meaning: "thực đơn", example: "请给我菜单。", partOfSpeech: "noun" },
          { word: "米饭", pinyin: "mǐ fàn", meaning: "cơm", example: "来一碗米饭。", partOfSpeech: "noun" },
          { word: "辣", pinyin: "là", meaning: "cay", example: "不要太辣。", partOfSpeech: "adjective" },
          { word: "买单", pinyin: "mǎi dān", meaning: "tính tiền", example: "服务员，买单！", partOfSpeech: "verb" },
          { word: "好吃", pinyin: "hǎo chī", meaning: "ngon", example: "这个很好吃！", partOfSpeech: "adjective" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Hoàn thành hội thoại nhà hàng",
            instructionEn: "Complete restaurant dialogues",
            sentences: [
              { text: "请给我___。(thực đơn)", textEn: "Please give me the ___.", answer: "菜单", hint: "cài dān" },
              { text: "不要太___。(cay)", textEn: "Not too ___.", answer: "辣", hint: "là" },
              { text: "服务员，___！(tính tiền)", textEn: "Waiter, ___!", answer: "买单", hint: "mǎi dān" },
            ],
          },
        ],
        quiz: [
          { question: "饺子 là món gì?", options: ["Mì", "Sủi cảo", "Cơm", "Canh"], answer: 1, explanation: "饺子 (jiǎo zi) = sủi cảo, món ăn truyền thống của Trung Quốc." },
          { question: "'好吃' nghĩa là?", options: ["Đẹp", "Ngon", "Tốt", "Vui"], answer: 1, explanation: "好吃 (hǎo chī) = ngon. 好 = tốt + 吃 = ăn → ăn ngon." },
        ],
      },
    ],
  },
];
